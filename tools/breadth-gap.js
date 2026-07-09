#!/usr/bin/env node
'use strict';
/* =============================================================================
   BREADTH-GAP - read-only report generator.

   For every frame in the catalog, and for every OTHER category that has at
   least one checkBuild rule comparing a field directly against `frame`, this
   counts how many catalog options / distinct brands survive with ZERO
   errors, and flags every (frame x category) pair that collapses to 0 or 1
   surviving brand - the actual bottleneck field is read off the error's
   ruleId, not guessed.

   Method: for each frame + candidate part, run checkBuild on the MINIMAL
   build {frame, <slot>: candidate} - nothing else filled. With only two
   slots populated, the only rules that can possibly fire are ones that
   compare those two slots to each other, so every error this produces
   attributes cleanly to the frame<->candidate pair; there is no cross-talk
   from a third part that isn't in the build. "Compatible" = zero ERRORS
   for that pair. Warnings (e.g. "exceeds rated max", "needs a shim") still
   leave the part usable - CLAUDE.md's own error/warning split ("errors =
   won't fit; warnings = works but check") - so they are tracked separately
   and never subtracted from the compatible count.

   Only categories with a frame-direct ERROR rule are tested (see CHECKS).
   Categories with no such rule (handlebar/stem/grips/saddle/pedal/shifter/
   cassette/chain/crankset) or only a FORK-direct or WARNING-only rule
   (frontBrake, frontRotor, rearRotor) are out of scope for a *frame*
   breadth report - seeing those never collapses under a frame swap alone,
   which is itself useful to state plainly rather than silently omit (see
   the "Excluded categories" section of the generated doc).

   This script never imports or edits compat.js/schema.js data - it only
   calls the exported checkBuild/byId helpers already used by the test
   suite (see test/test-util.js). Read-only; touches no catalog file.

   Usage:
     node tools/breadth-gap.js              print the Markdown report
     node tools/breadth-gap.js > tools/BREADTH-GAP.md
   ========================================================================== */

var path = require('path');
var C = require(path.join(__dirname, '..', 'src', 'compat.js'));
var PARTS = C.PARTS, checkBuild = C.checkBuild, nameOf = C.nameOf;

/** @param {any[]} arr @returns {any[]} */
function uniq(arr){ return arr.filter(function(v, i, a){ return a.indexOf(v) === i; }); }
/** @param {string} cat @returns {any[]} */
function byCat(cat){ return PARTS.filter(function(p){ return p.cat === cat; }); }

var frames = byCat('frame');

// Only ruleIds that can actually land in `errors` for the checks below (see
// each CHECKS comment for which rules were verified reachable with only
// {frame, candidate} filled - warning-only rules like fork-travel or
// shock-stroke-short never appear here because they never push to `errors`).
var RULE_FIELD = {
  'wheel-config': 'wheelConfigs',
  'steerer': 'headset (steerer)',
  'shock-size': 'shockEye × shockStroke',
  'shock-mount': 'shockMount',
  'shock-stroke-over': 'shockStroke (too long for this eye size)',
  'hardtail-shock': 'suspension:hardtail (no shock mount at all)',
  'oem-shock': 'bundledShock / OEM-only forFrames',
  'rear-axle': 'rearAxle',
  'udh': 'udh',
  'rear-brake-mount': 'brakeMount',
  'dropper-diameter': 'seatTube'
};
/** @param {string} ruleId @returns {string} */
function fieldFor(ruleId){ return RULE_FIELD[ruleId] || ruleId; }

// key: report label. cat: catalog category to draw candidates from.
// slot: build slot key the candidate is placed into for checkBuild.
var CHECKS = [
  { key: 'fork',       label: 'Fork',              cat: 'fork',       slot: 'fork' },
  { key: 'shock',      label: 'Rear shock',         cat: 'shock',      slot: 'shock' },
  { key: 'frontwheel', label: 'Front wheel',        cat: 'frontwheel', slot: 'frontWheel' },
  { key: 'rearwheel',  label: 'Rear wheel',         cat: 'rearwheel',  slot: 'rearWheel' },
  { key: 'tire-front', label: 'Front tire',         cat: 'tire',       slot: 'frontTire' },
  { key: 'tire-rear',  label: 'Rear tire',          cat: 'tire',       slot: 'rearTire' },
  { key: 'derailleur', label: 'Rear derailleur',    cat: 'derailleur', slot: 'derailleur' },
  { key: 'brake-rear', label: 'Rear brake',         cat: 'brake',      slot: 'rearBrake' },
  { key: 'dropper',    label: 'Dropper post',       cat: 'dropper',    slot: 'dropper' }
];

var EXCLUDED = [
  ['Front brake', 'brake', 'rule 8 checks it against the FORK\'s brakeMount, never the frame - a fork-choice axis, not a frame one.'],
  ['Front rotor', 'rotor', 'rule 10\'s frame-adjacent-ish check is fork-side (front-rotor-max) and is a WARNING, not an error; rule 9\'s mount check is vs the front wheel, not the frame.'],
  ['Rear rotor', 'rotor', 'rule 10 (rear-rotor-max) is a WARNING, not an error - a rotor "too big for the frame" still fits, it is just flagged for review; rule 9\'s mount check is vs the rear wheel, not the frame.'],
  ['Crankset', 'crankset', 'rule 7 (bb-advisory) is an INFO note only - it never blocks a build, so no crankset can ever collapse against a frame.'],
  ['Shifter / Cassette / Chain', 'shifter, cassette, chain', 'no checkBuild rule compares any of these directly to a frame field.'],
  ['Handlebar / Stem / Grips / Saddle / Pedals', 'handlebar, stem, grips, saddle, pedal', 'no checkBuild rule compares any of these to a frame field at all - frame choice never constrains them.']
];

var rows = [];
CHECKS.forEach(function(check){
  var candidates = byCat(check.cat);
  var totalBrands = uniq(candidates.map(function(p){ return p.brand; }));
  frames.forEach(function(frame){
    var compatible = [], warnedCount = 0, failReasons = {};
    candidates.forEach(function(part){
      var build = { frame: frame };
      build[check.slot] = part;
      var res = checkBuild(build);
      if(res.errors.length === 0){
        compatible.push(part);
        if(res.warnings.length) warnedCount++;
      } else {
        res.errors.forEach(function(e){ failReasons[e.ruleId] = (failReasons[e.ruleId] || 0) + 1; });
      }
    });
    var compatBrands = uniq(compatible.map(function(p){ return p.brand; })).sort();
    rows.push({
      frame: frame, check: check,
      total: candidates.length, totalBrands: totalBrands.length,
      compatCount: compatible.length, compatBrands: compatBrands.length,
      compatBrandNames: compatBrands,
      warnedCount: warnedCount,
      failReasons: failReasons
    });
  });
});

/** Context for a flagged row that's structurally expected, not a catalog gap.
 * @param {any} r @returns {string} */
function contextNote(r){
  var frame = r.frame, key = r.check.key;
  if(key === 'shock' && frame.suspension === 'hardtail')
    return 'expected - hardtail, no shock mount by design, not a catalog gap';
  if(key === 'dropper' && (frame.disciplines || []).indexOf('dh') >= 0)
    return 'dropper slot is optional on DH-discipline frames (schema) - still a real fit constraint if one is fitted';
  return '';
}

var flagged = rows.filter(function(r){ return r.compatBrands <= 1; });
flagged.forEach(function(r){ r.note = contextNote(r); });
flagged.sort(function(a, b){
  if(a.compatBrands !== b.compatBrands) return a.compatBrands - b.compatBrands;
  var af = a.total - a.compatCount, bf = b.total - b.compatCount;
  if(bf !== af) return bf - af;
  if(b.totalBrands !== a.totalBrands) return b.totalBrands - a.totalBrands;
  var an = nameOf(a.frame), bn = nameOf(b.frame);
  return an < bn ? -1 : an > bn ? 1 : (a.check.key < b.check.key ? -1 : 1);
});

var realGaps = flagged.filter(function(r){ return !r.note; });
var expected = flagged.filter(function(r){ return r.note; });

// ---- render Markdown -------------------------------------------------------
var out = [];
function line(s){ out.push(s === undefined ? '' : s); }
function reasonsStr(failReasons){
  return Object.keys(failReasons).sort(function(a, b){ return failReasons[b] - failReasons[a]; })
    .map(function(rid){ return fieldFor(rid) + ' (' + failReasons[rid] + ')'; }).join('; ');
}

line('# BREADTH-GAP.md - catalog fit-collapse map');
line();
line('Auto-generated by `node tools/breadth-gap.js > tools/BREADTH-GAP.md`. Read-only');
line('analysis - no catalog/engine file is touched by the script or by running it.');
line('Regenerate any time after a catalog change; do not hand-edit this file.');
line();
line('**' + frames.length + ' frames** x **' + CHECKS.length + ' checked categories** = ' + rows.length + ' (frame, category) pairs evaluated.');
line();
line('## Method');
line();
line('For each (frame, category) pair, every candidate part in that category is');
line('placed alone with the frame into `checkBuild({frame, <slot>: candidate})` -');
line('no other slot is filled. With only two slots populated, the only rules that');
line('can fire are ones comparing those two slots directly, so every error here is');
line('attributable to the frame<->candidate pair specifically (see src/compat.js\'s');
line('`checkBuild`). **Compatible = zero errors.** Warnings (e.g. "exceeds rated');
line('max", "needs a shim") still leave the part usable per this project\'s own');
line('error/warning split, so they never subtract from the compatible count - a');
line('separate warned-count is reported alongside.');
line();
line('A pair is **flagged** when 0 or 1 distinct brands remain compatible.');
line();
line('## Excluded categories');
line();
line('These have no checkBuild rule that compares them directly to a *frame* field');
line('(the constraint, if any, runs through the fork or another part instead, or the');
line('rule is a warning, or there is no rule at all) - a frame swap alone can never');
line('collapse them, so they are out of scope for this report:');
line();
line('| Category | cat value(s) | Why excluded |');
line('|---|---|---|');
EXCLUDED.forEach(function(e){ line('| ' + e[0] + ' | `' + e[1] + '` | ' + e[2] + ' |'); });
line();
line('## Summary');
line();
line('- **' + flagged.length + '** of ' + rows.length + ' pairs flagged (collapsed to 0 or 1 compatible brand).');
line('- **' + realGaps.length + '** are real catalog-breadth gaps worth targeting with new parts.');
line('- **' + expected.length + '** are structurally expected (hardtail shock slot, optional DH dropper slot) - not catalog gaps.');
line();
var byCheckSummary = CHECKS.map(function(check){
  var these = rows.filter(function(r){ return r.check.key === check.key; });
  var zero = these.filter(function(r){ return r.compatBrands === 0; }).length;
  var one = these.filter(function(r){ return r.compatBrands === 1; }).length;
  var ok = these.length - zero - one;
  return { check: check, zero: zero, one: one, ok: ok, totalBrands: these[0] ? these[0].totalBrands : 0, totalOptions: these[0] ? these[0].total : 0 };
});
line('### By category (across all ' + frames.length + ' frames)');
line();
line('| Category | Catalog brands / options | Frames -> 0 compat. brands | Frames -> 1 compat. brand | Frames -> 2+ (fine) |');
line('|---|---|---|---|---|');
byCheckSummary.forEach(function(s){
  line('| ' + s.check.label + ' | ' + s.totalBrands + ' brands / ' + s.totalOptions + ' options | ' + s.zero + ' | ' + s.one + ' | ' + s.ok + ' |');
});
line();
line('## Ranked flagged pairs (biggest collapses first)');
line();
line('Ranked by: fewest compatible brands first, then most options knocked out,');
line('then widest catalog category (a collapse in a deep category is a bigger real');
line('miss than one in a shallow one). "Note" marks rows that are structurally');
line('expected rather than an actual gap.');
line();
line('| # | Frame | Category | Blocking field(s) (fail count) | Compatible brands | Compatible / total options | Note |');
line('|---|---|---|---|---|---|---|');
flagged.forEach(function(r, i){
  var brandsStr = r.compatBrands === 0 ? '(none)' : r.compatBrandNames.join(', ');
  line('| ' + (i + 1) + ' | ' + nameOf(r.frame) + ' | ' + r.check.label + ' | ' + reasonsStr(r.failReasons) +
    ' | ' + r.compatBrands + ' / ' + r.totalBrands + ' - ' + brandsStr + ' | ' + r.compatCount + ' / ' + r.total + ' | ' + (r.note || '') + ' |');
});
line();
line('## Notes');
line();
line('- "Compatible brands" / "options" denominators are catalog-wide totals for that');
line('  category (' + CHECKS.map(function(c){ var cand = byCat(c.cat); return c.label + '=' + uniq(cand.map(function(p){return p.brand;})).length + 'br/' + cand.length + 'opt'; }).join(', ') + ').');
line('- A warned-but-compatible part (e.g. a shorter-stroke shock, a tire past a');
line('  frame\'s published max) still counts toward the compatible total above -');
line('  it fits, it just carries a caveat. Per-row warned counts are omitted from');
line('  the table for space; rerun with a candidate/frame pair through the app or');
line('  `compatOf`/`placementDiff` to see the specific warning text.');
line('- This report is a snapshot of the CURRENT catalog\'s breadth, not a fit-engine');
line('  audit - a 0/1-brand row means "add more parts in this bracket", not "the rule');
line('  is wrong". Cross-check against tools/DATA-ENTRY-TEMPLATE.md before adding rows.');
line();

console.log(out.join('\n'));
