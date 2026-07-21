'use strict';
/* BUILD SHEET (src/build-sheet.js, feature slate §5) — the printable sheet's
   pure model + renderer. The model must report EXACTLY what the engine and
   totals report (verdicts verbatim via String(v), buildTotals passthrough,
   bundle attribution identical to bundleActive) and the renderer must escape
   every dynamic string and keep the app's honest framing — the all-clear
   stays "No conflicts found", the sample-data disclosure is the app's own
   sentence, and nothing on the sheet overclaims beyond the engine. */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
var BS = require('../src/build-sheet.js');

/** The real engine pieces, injected the same way index.html injects them. */
var DEPS = {
  GROUPS: C.GROUPS, SLOTS: C.SLOTS,
  checkBuild: C.checkBuild, buildTotals: C.buildTotals, bundleActive: C.bundleActive,
  byId: C.byId, partVerified: C.partVerified, partWeight: C.partWeight,
  slotRequired: C.slotRequired, effectiveWheel: C.effectiveWheel,
  wheelPositionFilled: C.wheelPositionFilled
};

/* Same helper shapes the app injects (tbMoney / index.html's grams). */
/** @param {number} n */
function money(n){ return '$' + (n || 0).toLocaleString(); }
/** @param {number} g */
function grams(g){ return g.toLocaleString() + ' g (' + (g / 1000).toFixed(2) + ' kg / ' + (g / 453.592).toFixed(2) + ' lb)'; }
var HELPERS = { esc: C.esc, money: money, grams: grams };
var META = { shareUrl: 'https://buildmymtb.com/#b=frame:fr-x', generated: '2026-07-20' };

/** @param {Object.<string, string>} map @param {Object.<string, string>} [presetBy] */
function model(map, presetBy){ return BS.buildSheetModel(B(map), presetBy || {}, DEPS); }

/* The tested golden Megatower build (test-golden.js GOOD) — complete + clean. */
/** @type {Object.<string, string>} */
var GOOD = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };

/* The GX drivetrain a la carte (test-pricing.js) + its kit id. */
var GXM = { shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle' };

test('model: a clean complete build — ok headline, verbatim-empty verdicts, complete count', function(){
  var m = model(GOOD);
  eq(m.headline.kind, 'ok');
  eq(m.headline.text, '✓ No conflicts found');   // byte-identical to the app's modal — never "All compatible"
  eq(m.errors.length, 0); eq(m.warnings.length, 0);
  eq(m.counts.filled, m.counts.required, 'golden build must count as complete');
  eq(m.partCount, Object.keys(GOOD).length);
});

test('model: totals are buildTotals passthrough, never recomputed', function(){
  var m = model(GOOD);
  var t = C.buildTotals(B(GOOD), {});
  eq(m.totals.price, t.price); eq(m.totals.weight, t.weight); eq(m.totals.missingWeight, t.missingWeight);
});

test('model: every picked part appears exactly once, with partVerified truth per row', function(){
  var m = model(GOOD);
  /** @type {Object.<string, boolean>} */
  var seen = {};
  m.groups.forEach(function(g){ g.rows.forEach(function(r){
    ok(!seen[r.slotKey], 'slot listed twice: ' + r.slotKey);
    seen[r.slotKey] = true;
    eq(r.verified, C.partVerified(part(GOOD[r.slotKey])), 'verified flag for ' + r.slotKey);
  }); });
  Object.keys(GOOD).forEach(function(k){ ok(seen[k], 'missing slot row: ' + k); });
});

test('model: groups with nothing picked are omitted', function(){
  var m = model({ frame:'fr-santacruz-megatower-cc' });
  eq(m.groups.length, 1);
  eq(m.groups[0].rows[0].slotKey, 'frame');
  ok(m.counts.filled < m.counts.required, 'a frame-only build is incomplete');
});

test('model: an active kit marks its rows in-bundle and carries the kit price once', function(){
  var m = model(GXM, { drivetrain:'gs-sram-gx-eagle' });
  var dt = m.groups.filter(function(g){ return g.key === 'drivetrain'; })[0];
  ok(dt, 'drivetrain group present');
  ok(dt.bundle, 'bundle attributed');
  eq(dt.bundle && dt.bundle.price, 545);
  dt.rows.forEach(function(r){ eq(r.inBundle, true, r.slotKey + ' must be in-bundle'); });
  eq(m.totals.price, 545, 'sheet total is the kit price (buildTotals passthrough)');
});

test('model: without the preset the same rows are a la carte', function(){
  var m = model(GXM);
  var dt = m.groups.filter(function(g){ return g.key === 'drivetrain'; })[0];
  eq(dt.bundle, null);
  dt.rows.forEach(function(r){ eq(r.inBundle, false); });
});

test('model: verdicts are checkBuild strings VERBATIM (a conflicted build)', function(){
  // 27.5 fork on a 29-only frame — the tested wheel-size clash shape.
  var bad = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-275-170' };
  var m = model(bad);
  var r = C.checkBuild(B(bad));
  ok(r.errors.length > 0, 'fixture must actually conflict');
  eq(m.errors.length, r.errors.length);
  r.errors.forEach(function(v, i){ eq(m.errors[i], String(v), 'error ' + i + ' must be verbatim'); });
  eq(m.headline.kind, 'err');
  ok(m.headline.text.indexOf(String(r.errors.length)) >= 0, 'headline carries the count');
});

test('model: wheels built from hub+rim count as filled (wheelPositionFilled path)', function(){
  var split = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5',
    frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29', rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29',
    frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
    frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-shimano-rtmt800-203-cl', rearRotor:'ro-shimano-rtmt800-203-cl',
    handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };
  var m = model(split);
  eq(m.counts.filled, m.counts.required, 'split-wheel golden build must count as complete');
});

/* ---- renderer ----------------------------------------------------------- */

test('render: hostile part strings are escaped, never raw HTML', function(){
  /** @type {any} */
  var hostile = {
    groups: [{ key:'g', label:'<b>Group</b>', bundle:{brand:'<i>K</i>', model:'"kit"', price:5},
      rows: [{ slotKey:'frame', slotLabel:'<Frame>', id:'x', brand:'<script>alert(1)</script>', model:'M&M', price:1, weight:100, verified:true, inBundle:false }] }],
    counts: {filled:1, required:2},
    totals: {price:1, weight:100, missingWeight:false},
    headline: {kind:'ok', text:'✓ No conflicts found'},
    errors: ['<img src=x onerror=alert(1)>'], warnings: [], infos: [],
    verifiedCount: 1, partCount: 1
  };
  var html = BS.renderBuildSheetHtml(hostile, { shareUrl:'https://x/#b="><script>', generated:'<2026>' }, HELPERS);
  eq(html.indexOf('<script>'), -1, 'raw script tag must never appear');
  eq(html.indexOf('<img'), -1, 'raw img tag must never appear');
  ok(html.indexOf('&lt;script&gt;alert(1)&lt;/script&gt;') >= 0, 'escaped brand present');
  ok(html.indexOf('&lt;img src=x onerror=alert(1)&gt;') >= 0, 'escaped verdict present');
  ok(html.indexOf('&lt;2026&gt;') >= 0, 'generated date escaped');
});

test('render: the real golden sheet carries rows, totals, count line, share link and the honest framing', function(){
  var m = model(GOOD);
  var html = BS.renderBuildSheetHtml(m, META, HELPERS);
  ok(html.indexOf('Santa Cruz Megatower') >= 0 || html.indexOf('Megatower') >= 0, 'frame row present');
  ok(html.indexOf(C.esc(money(m.totals.price))) >= 0, 'sample total present');
  ok(html.indexOf(m.counts.filled + ' of ' + m.counts.required + ' required parts chosen') >= 0, 'count line present');
  ok(html.indexOf(C.esc(META.shareUrl)) >= 0, 'share link printed');
  ok(html.indexOf('Specs are illustrative sample data unless a part shows ✓ Verified in the app.') >= 0, 'app disclosure verbatim');
  ok(html.indexOf('Prototype · ✓ = verified vs manufacturer · the rest is sample data') >= 0, 'honesty-strip framing verbatim');
  ok(html.indexOf('Sample total') >= 0, 'total stays labeled Sample');
  eq(html.indexOf('All compatible'), -1, 'must never overclaim');
});

test('render: an all-clear sheet uses the hedged no-conflicts sentence, with infos still listed as notes', function(){
  var m = model(GOOD);
  var html = BS.renderBuildSheetHtml(m, META, HELPERS);
  ok(html.indexOf('No conflicts found (among the dimensions we check') >= 0);
  m.infos.forEach(function(i){ ok(html.indexOf(C.esc(i)) >= 0, 'info listed verbatim'); });
});

test('render: conflicted sheet lists every verdict with its severity glyph', function(){
  var bad = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-275-170' };
  var m = model(bad);
  var html = BS.renderBuildSheetHtml(m, META, HELPERS);
  m.errors.forEach(function(e){ ok(html.indexOf('✗ ' + C.esc(e)) >= 0, 'error listed verbatim'); });
  eq(html.indexOf('No conflicts found ('), -1, 'no all-clear on a conflicted sheet');
});

test('render: kit rows read "in kit" and the kit line carries the bundle price', function(){
  var m = model(GXM, { drivetrain:'gs-sram-gx-eagle' });
  var html = BS.renderBuildSheetHtml(m, META, HELPERS);
  ok(html.indexOf('in kit') >= 0);
  ok(html.indexOf('KIT ·') >= 0);
  ok(html.indexOf(C.esc(money(545))) >= 0, 'kit price shown');
});

test('render: verified rows carry the ✓ badge, unverified rows do not', function(){
  var m = model({ frontTire:'ti-maxxis-assegai-29-25-exop-mg' });   // whole tire category is verified
  var html = BS.renderBuildSheetHtml(m, META, HELPERS);
  ok(html.indexOf('✓ verified') >= 0, 'verified tire badged');
  var m2Rows = model({ grips:'gr-oneup-lockon' });
  if(!C.partVerified(part('gr-oneup-lockon'))){
    eq(BS.renderBuildSheetHtml(m2Rows, META, HELPERS).indexOf('✓ verified'), -1, 'unverified part unbadged');
  }
});

test('render: missing weights degrade honestly (— on the row, + suffix on the total)', function(){
  /** @type {any} */
  var m = {
    groups: [{ key:'g', label:'G', bundle:null,
      rows: [{ slotKey:'frame', slotLabel:'Frame', id:'x', brand:'B', model:'M', price:100, weight:null, verified:false, inBundle:false }] }],
    counts: {filled:1, required:20},
    totals: {price:100, weight:2000, missingWeight:true},
    headline: {kind:'ok', text:'✓ No conflicts found'},
    errors: [], warnings: [], infos: [], verifiedCount: 0, partCount: 1
  };
  var html = BS.renderBuildSheetHtml(m, META, HELPERS);
  ok(html.indexOf('—') >= 0, 'weightless row shows a dash');
  ok(html.indexOf(C.esc(grams(2000)) + ' +') >= 0, 'total carries the missing-weight + suffix');
});
