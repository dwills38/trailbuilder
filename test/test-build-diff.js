'use strict';
/* BUILD DIFF (src/build-diff.js, committed feature slate) — the garage-pair
   diff's pure model + renderer. The model must classify part changes
   added/removed/swapped exactly by slot + part id, pass buildTotals through
   untouched (deltas derived, never recomputed), and diff verdicts BY
   verdictKey with messages verbatim (String(v)) — the same identity contract
   the dots use. The renderer must escape every dynamic string and keep the
   honest framing: "only in" set-membership wording, a hedged no-difference
   sentence, the app's sample-data disclosure verbatim, never "All
   compatible". */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
var BD = require('../src/build-diff.js');

/** The real engine pieces, injected the same way index.html injects them. */
var DEPS = {
  SLOTS: C.SLOTS,
  checkBuild: C.checkBuild, buildTotals: C.buildTotals,
  verdictKey: C.verdictKey
};

/* Same helper shapes the app injects (tbMoney / index.html's grams). */
/** @param {number} n */
function money(n){ return '$' + (n || 0).toLocaleString(); }
/** @param {number} g */
function grams(g){ return g.toLocaleString() + ' g (' + (g / 1000).toFixed(2) + ' kg)'; }
var HELPERS = { esc: C.esc, money: money, grams: grams };

/**
 * @param {Object.<string, string>} mapA @param {Object.<string, string>} mapB
 * @param {Object.<string, string>} [pbA] @param {Object.<string, string>} [pbB]
 */
function model(mapA, mapB, pbA, pbB){
  return BD.buildDiffModel(
    { res: B(mapA), presetBy: pbA || {}, label: 'Build A' },
    { res: B(mapB), presetBy: pbB || {}, label: 'Build B' },
    DEPS);
}

/* The tested golden Megatower build (test-golden.js GOOD) — complete + clean. */
/** @type {Object.<string, string>} */
var GOOD = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };

/** @param {Object.<string, string>} base @param {Object.<string, (string|null)>} patch */
function vary(base, patch){
  /** @type {Object.<string, string>} */ var o = {};
  Object.keys(base).forEach(function(k){ o[k] = base[k]; });
  Object.keys(patch).forEach(function(k){
    var v = patch[k];
    if(v == null){ delete o[k]; } else { o[k] = v; }
  });
  return o;
}

/* The GX drivetrain a la carte (test-pricing.js) + its kit id. */
var GXM = { shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle' };

test('model: identical builds — zero changes, zero deltas, no verdict differences', function(){
  var m = model(GOOD, GOOD);
  eq(m.changes.length, 0);
  eq(m.counts.added + m.counts.removed + m.counts.swapped, 0);
  eq(m.counts.unchanged, Object.keys(GOOD).length);
  eq(m.totals.priceDelta, 0);
  eq(m.totals.weightDelta, 0);
  /** @type {Array.<'errors'|'warnings'|'infos'>} */ (['errors','warnings','infos']).forEach(function(cls){
    eq(m.verdicts[cls].onlyA.length, 0, cls + ' onlyA must be empty');
    eq(m.verdicts[cls].onlyB.length, 0, cls + ' onlyB must be empty');
  });
  // shared counts mirror what checkBuild actually reports for the build
  var r = C.checkBuild(B(GOOD));
  eq(m.verdicts.errors.shared, r.errors.length);
  eq(m.verdicts.warnings.shared, r.warnings.length);
  eq(m.verdicts.infos.shared, r.infos.length);
});

test('model: a part present only in B is "added", and the deltas are that part', function(){
  var a = vary(GOOD, { pedals: null });
  var m = model(a, GOOD);
  eq(m.changes.length, 1);
  var c = m.changes[0];
  eq(c.slotKey, 'pedals');
  eq(c.kind, 'added');
  eq(c.a, null);
  eq(c.b && c.b.id, 'pd-oneup-aluminum');
  var p = part('pd-oneup-aluminum');
  eq(m.totals.priceDelta, p.price);
  eq(m.totals.weightDelta, p.weight);
});

test('model: the reverse direction is "removed" with negative deltas', function(){
  var b = vary(GOOD, { pedals: null });
  var m = model(GOOD, b);
  eq(m.changes.length, 1);
  eq(m.changes[0].kind, 'removed');
  eq(m.changes[0].b, null);
  var p = part('pd-oneup-aluminum');
  eq(m.totals.priceDelta, -p.price);
  eq(m.totals.weightDelta, -(p.weight || 0));
});

test('model: same slot, different id is "swapped" with both refs carried', function(){
  var b = vary(GOOD, { fork: 'fk-rockshox-zeb-ultimate-275-170' });
  var m = model(GOOD, b);
  eq(m.changes.length, 1);
  var c = m.changes[0];
  eq(c.kind, 'swapped');
  eq(c.a && c.a.id, 'fk-rockshox-zeb-ultimate-29-170');
  eq(c.b && c.b.id, 'fk-rockshox-zeb-ultimate-275-170');
  eq(m.counts.swapped, 1);
  eq(m.counts.unchanged, Object.keys(GOOD).length - 1);
});

test('model: totals are buildTotals passthrough and deltas derive from them', function(){
  var b = vary(GOOD, { fork: 'fk-rockshox-zeb-ultimate-275-170' });
  var m = model(GOOD, b);
  var tA = C.buildTotals(B(GOOD), {}), tB = C.buildTotals(B(b), {});
  eq(m.totals.a.price, tA.price); eq(m.totals.b.price, tB.price);
  eq(m.totals.priceDelta, tB.price - tA.price);
  eq(m.totals.weightDelta, tB.weight - tA.weight);
  eq(m.totals.weightApprox, !!(tA.missingWeight || tB.missingWeight));
});

test('model: presetBy is honored per side — same parts, kit-priced side differs', function(){
  var sum = C.buildTotals(B(GXM), {}).price;
  var m = model(GXM, GXM, {}, { drivetrain: 'gs-sram-gx-eagle' });
  eq(m.changes.length, 0, 'identical parts must show no slot changes');
  eq(m.totals.b.price, 545, 'B side billed at the kit price');
  eq(m.totals.priceDelta, 545 - sum);
});

test('model: verdict differences land in onlyB verbatim when B introduces a conflict', function(){
  var b = vary(GOOD, { fork: 'fk-rockshox-zeb-ultimate-275-170' });
  var m = model(GOOD, b);
  var rB = C.checkBuild(B(b));
  ok(rB.errors.length > 0, 'fixture must actually conflict');
  eq(m.verdicts.errors.onlyA.length, 0);
  eq(m.verdicts.errors.onlyB.length, rB.errors.length);
  rB.errors.forEach(function(v){
    ok(m.verdicts.errors.onlyB.indexOf(String(v)) >= 0, 'verbatim error present: ' + String(v));
  });
});

test('model: the same conflict on both sides is shared, not listed as a difference', function(){
  var bad = vary(GOOD, { fork: 'fk-rockshox-zeb-ultimate-275-170' });
  var m = model(bad, bad);
  var r = C.checkBuild(B(bad));
  eq(m.verdicts.errors.onlyA.length, 0);
  eq(m.verdicts.errors.onlyB.length, 0);
  eq(m.verdicts.errors.shared, r.errors.length);
});

test('model: weight delta is null (never a fabricated number) when a side has no weights at all', function(){
  // A build whose only part carries no weight sums to weight 0.
  var noW = C.PARTS.filter(function(p){ return typeof p.weight !== 'number'; })[0];
  if(!noW) return;   // catalog fully weighted — nothing to prove
  /** @type {Object.<string, string>} */ var lone = {};
  var slot = C.SLOTS.filter(function(s){ return s.cat === noW.cat; })[0];
  if(!slot) return;
  lone[slot.key] = noW.id;
  var m = model(lone, GOOD);
  eq(m.totals.weightDelta, null, 'no delta against a weightless side');
});

test('model: changes come out in SLOTS order', function(){
  var b = vary(GOOD, { pedals: null, fork: 'fk-rockshox-zeb-ultimate-275-170', grips: null });
  var m = model(GOOD, b);
  var order = C.SLOTS.map(function(s){ return s.key; });
  for(var i = 1; i < m.changes.length; i++){
    ok(order.indexOf(m.changes[i-1].slotKey) < order.indexOf(m.changes[i].slotKey),
      'changes must follow SLOTS order');
  }
});

/* ---- renderer ----------------------------------------------------------- */

test('render: hostile strings are escaped, never raw HTML', function(){
  /** @type {any} */
  var hostile = {
    labels: { a: '<script>alert(1)</script>', b: '"B" & <b>bold</b>' },
    changes: [{ slotKey:'frame', slotLabel:'Frame', kind:'swapped',
      a: { id:'x', brand:'<img src=x onerror=alert(1)>', model:'M', price:1, weight:1 },
      b: { id:'y', brand:'B', model:'<svg onload=alert(1)>', price:2, weight:2 } }],
    counts: { added:0, removed:0, swapped:1, unchanged:0 },
    totals: { a:{price:1, weight:1, missingWeight:false}, b:{price:2, weight:2, missingWeight:false},
      priceDelta:1, weightDelta:1, weightApprox:false },
    verdicts: {
      errors:   { onlyA: ['<img src=x onerror=alert(1)>'], onlyB: [], shared: 0 },
      warnings: { onlyA: [], onlyB: [], shared: 0 },
      infos:    { onlyA: [], onlyB: [], shared: 0 } }
  };
  var html = BD.renderBuildDiffHtml(hostile, HELPERS);
  eq(html.indexOf('<script>'), -1, 'raw script tag must never appear');
  eq(html.indexOf('<img'), -1, 'raw img tag must never appear');
  eq(html.indexOf('<svg'), -1, 'raw svg tag must never appear');
  ok(html.indexOf('&lt;script&gt;alert(1)&lt;/script&gt;') >= 0, 'escaped label present');
  ok(html.indexOf('&lt;img src=x onerror=alert(1)&gt;') >= 0, 'escaped verdict present');
});

test('render: a real diff carries both labels, the changed slot, signed deltas and the disclosure', function(){
  var b = vary(GOOD, { fork: 'fk-rockshox-zeb-ultimate-275-170' });
  var m = model(GOOD, b);
  var html = BD.renderBuildDiffHtml(m, HELPERS);
  ok(html.indexOf('Build A') >= 0 && html.indexOf('Build B') >= 0, 'both labels shown');
  ok(html.indexOf('swapped') >= 0, 'swap badge shown');
  ok(html.indexOf('ZEB') >= 0, 'part names shown');
  var d = m.totals.priceDelta;
  var expected = d === 0 ? 'no change' : (d > 0 ? '+' : '-') + money(Math.abs(d));
  ok(html.indexOf(C.esc(expected)) >= 0, 'signed price delta present: ' + expected);
  ok(html.indexOf('Specs are illustrative sample data unless a part shows ✓ Verified in the app.') >= 0, 'app disclosure verbatim');
  eq(html.indexOf('All compatible'), -1, 'must never overclaim');
});

test('render: verdict differences list verbatim messages under the right side', function(){
  var b = vary(GOOD, { fork: 'fk-rockshox-zeb-ultimate-275-170' });
  var m = model(GOOD, b);
  var html = BD.renderBuildDiffHtml(m, HELPERS);
  ok(html.indexOf('Only in Build B:') >= 0, 'onlyB heading present');
  // The onlyA heading appears exactly when some class has onlyA items (here
  // the rule-20c advisory names the fork, so it differs per side — real).
  var anyA = /** @type {Array.<'errors'|'warnings'|'infos'>} */ (['errors','warnings','infos']).some(function(cls){
    return m.verdicts[cls].onlyA.length > 0;
  });
  eq(html.indexOf('Only in Build A:') >= 0, anyA, 'onlyA section presence matches the model');
  m.verdicts.errors.onlyB.forEach(function(msg){
    ok(html.indexOf('✗ ' + C.esc(msg)) >= 0, 'error listed verbatim with glyph');
  });
});

test('render: identical builds get the hedged no-difference sentences', function(){
  var m = model(GOOD, GOOD);
  var html = BD.renderBuildDiffHtml(m, HELPERS);
  ok(html.indexOf('No part differences') >= 0, 'no-part-diff sentence present');
  ok(html.indexOf('No verdict differences') >= 0, 'no-verdict-diff sentence present');
  ok(html.indexOf('among the dimensions we check') >= 0, 'stays hedged, never a guarantee');
});

test('render: a weightless-side delta shows a dash, an approximate delta is hedged with ±', function(){
  /** @type {any} */
  var base = {
    labels: { a:'A', b:'B' }, changes: [], counts: { added:0, removed:0, swapped:0, unchanged:1 },
    totals: { a:{price:1, weight:0, missingWeight:true}, b:{price:2, weight:100, missingWeight:false},
      priceDelta:1, weightDelta:null, weightApprox:true },
    verdicts: { errors:{onlyA:[],onlyB:[],shared:0}, warnings:{onlyA:[],onlyB:[],shared:0}, infos:{onlyA:[],onlyB:[],shared:0} }
  };
  var html = BD.renderBuildDiffHtml(base, HELPERS);
  ok(html.indexOf('—') >= 0, 'null weight delta shows a dash');
  /** @type {any} */
  var approx = JSON.parse(JSON.stringify(base));
  approx.totals.weightDelta = 50; approx.totals.weightApprox = true;
  var html2 = BD.renderBuildDiffHtml(approx, HELPERS);
  ok(html2.indexOf('±') >= 0, 'approximate delta carries the ± hedge');
  ok(html2.indexOf('+50 g') >= 0, 'signed weight delta present');
});

test('render: shared findings are counted, not hidden silently', function(){
  var bad = vary(GOOD, { fork: 'fk-rockshox-zeb-ultimate-275-170' });
  var mBoth = model(bad, vary(bad, { pedals: null }));
  var shared = mBoth.verdicts.errors.shared + mBoth.verdicts.warnings.shared + mBoth.verdicts.infos.shared;
  if(!shared) return;   // fixture didn't produce a shared finding alongside a diff — nothing to prove
  var anyOnly = /** @type {Array.<'errors'|'warnings'|'infos'>} */ (['errors','warnings','infos']).some(function(cls){
    return mBoth.verdicts[cls].onlyA.length > 0 || mBoth.verdicts[cls].onlyB.length > 0;
  });
  if(!anyOnly) return;
  var html = BD.renderBuildDiffHtml(mBoth, HELPERS);
  ok(html.indexOf('shared by both builds (not listed)') >= 0, 'shared count disclosed');
});
