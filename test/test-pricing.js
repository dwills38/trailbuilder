'use strict';
/* PRICING + WEIGHT — bundle (groupset/wheelset/etc.) pricing replaces the sum of
   components only while the group exactly matches the kit; weights add up. */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok;
/** @param {Object.<string, string>} map @param {Object.<string, string>} [presetBy] */
function totals(map, presetBy){ return C.buildTotals(B(map), presetBy || {}); }

var GXM = { shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle' };
var GXM_SUM = 55 + 150 + 255 + 45 + 175;   // 680 a la carte (component prices corrected 2026-07-11, drivetrain component audit)
var GXM_KIT = 645;                          // gs-sram-gx-eagle bundle price

test('a single component weight is counted', function(){
  eq(totals({ fork:'fk-rockshox-zeb-ultimate-29-170' }).weight, 2150);
});
test('a la carte drivetrain sums component prices', function(){
  eq(totals(GXM).price, GXM_SUM);
});
test('groupset bundle price replaces the component sum', function(){
  eq(totals(GXM, { drivetrain:'gs-sram-gx-eagle' }).price, GXM_KIT);
});
test('bundle is cheaper than a la carte (sanity)', function(){
  ok(totals(GXM, { drivetrain:'gs-sram-gx-eagle' }).price < totals(GXM).price);
});
test('swapping one part breaks the bundle (reverts to a la carte)', function(){
  var swapped = Object.assign({}, GXM, { crankset:'cr-sram-x0-transmission' }); // not the kit's crank
  eq(totals(swapped, { drivetrain:'gs-sram-gx-eagle' }).price, 55 + 150 + 255 + 45 + 330);
});
test('removing a part from a bundled group breaks the bundle', function(){
  var partial = { shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle' };
  eq(totals(partial, { drivetrain:'gs-sram-gx-eagle' }).price, 55 + 150 + 255 + 45);
});
test('bundleActive is true only when every fill matches', function(){
  var wheels = C.GROUPS.filter(function(g){ return g.key === 'wheels'; })[0];
  ok(C.bundleActive(wheels, B({ frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29' }), { wheels:'ws-reserve-30-hd-29' }));
  ok(!C.bundleActive(wheels, B({ frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-industrynine-enduro-s-29' }), { wheels:'ws-reserve-30-hd-29' }));
});
test('REVIEW #25: a preset from the WRONG group never activates (share-link corruption guard)', function(){
  // A drivetrain groupset shoved under the wheels group key (reachable via a
  // crafted/corrupted share link before readHash was hardened) used to bill
  // the wheels group as the $645 kit, double-count the drivetrain and never
  // count the wheels. bundleActive now requires preset.cat === group.preset.cat.
  var wheels = C.GROUPS.filter(function(g){ return g.key === 'wheels'; })[0];
  ok(!C.bundleActive(wheels, B(GXM), { wheels:'gs-sram-gx-eagle' }));
  var t = totals(Object.assign({}, GXM, { frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29' }), { wheels:'gs-sram-gx-eagle' });
  eq(t.price, GXM_SUM + 800 + 900);   // everything a la carte; nothing double-counted or dropped
});
test('bundle weight is DERIVED from the fills when the kit is active', function(){
  // kits never store a weight (a stored figure drifts into physically
  // impossible bundles - REVIEW.md #12); the bundle weighs what its parts weigh
  var sum = 122 + 290 + 450 + 244 + 621;   // shifter+derailleur+cassette+chain+crank
  eq(totals(GXM, { drivetrain:'gs-sram-gx-eagle' }).weight, sum);
  eq(C.partWeight(part('gs-sram-gx-eagle')), sum);
});
test('partWeight: component uses its own figure, kit derives, unknown is null', function(){
  eq(C.partWeight(part('fk-rockshox-zeb-ultimate-29-170')), 2150);
  eq(C.partWeight(null), null);
  eq(C.partWeight(/** @type {any} */({ id:'x', cat:'groupset', brand:'B', model:'M', price:0, fills:{} })), null);
});
test('no preset stores a weight (always derived)', function(){
  C.PARTS.forEach(function(p){
    if('fills' in p && p.fills) ok(!('weight' in p), p.id + ' stores a weight');
  });
});
test('a complete build totals positive price and weight, nothing missing', function(){
  var map = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
    frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
    frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
    handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt' };
  var t = totals(map);
  ok(t.price > 0 && t.weight > 0);
  eq(t.missingWeight, false);
});
