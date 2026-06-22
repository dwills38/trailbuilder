'use strict';
/* PRICING + WEIGHT — bundle (groupset/wheelset/etc.) pricing replaces the sum of
   components only while the group exactly matches the kit; weights add up. */
var H = require('./test-harness.js');
var U = require('./test-util.js');
var C = U.C, B = U.B, test = H.test, eq = H.eq, ok = H.ok;
function totals(map, presetBy){ return C.buildTotals(B(map), presetBy || {}); }

var GXM = { shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx' };
var GXM_SUM = 45 + 135 + 215 + 30 + 175;   // 600 a la carte
var GXM_KIT = 545;                          // gs-gx-m bundle price

test('a single component weight is counted', function(){
  eq(totals({ fork:'fk-zeb' }).weight, 2150);
});
test('a la carte drivetrain sums component prices', function(){
  eq(totals(GXM).price, GXM_SUM);
});
test('groupset bundle price replaces the component sum', function(){
  eq(totals(GXM, { drivetrain:'gs-gx-m' }).price, GXM_KIT);
});
test('bundle is cheaper than a la carte (sanity)', function(){
  ok(totals(GXM, { drivetrain:'gs-gx-m' }).price < totals(GXM).price);
});
test('swapping one part breaks the bundle (reverts to a la carte)', function(){
  var swapped = Object.assign({}, GXM, { crankset:'cr-x0t' }); // not the kit's crank
  eq(totals(swapped, { drivetrain:'gs-gx-m' }).price, 45 + 135 + 215 + 30 + 330);
});
test('removing a part from a bundled group breaks the bundle', function(){
  var partial = { shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle' };
  eq(totals(partial, { drivetrain:'gs-gx-m' }).price, 45 + 135 + 215 + 30);
});
test('bundleActive is true only when every fill matches', function(){
  var wheels = C.GROUPS.filter(function(g){ return g.key === 'wheels'; })[0];
  ok(C.bundleActive(wheels, B({ frontWheel:'fw-reserve', rearWheel:'rw-reserve' }), { wheels:'ws-reserve' }));
  ok(!C.bundleActive(wheels, B({ frontWheel:'fw-reserve', rearWheel:'rw-i9' }), { wheels:'ws-reserve' }));
});
test('bundle weight uses the kit weight when active', function(){
  eq(totals(GXM, { drivetrain:'gs-gx-m' }).weight, C.byId('gs-gx-m').weight);
});
test('a complete build totals positive price and weight, nothing missing', function(){
  var map = { frame:'fr-megatower', fork:'fk-zeb', shock:'sh-sd-air', frontWheel:'fw-reserve', rearWheel:'rw-reserve',
    frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx',
    frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
    handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt' };
  var t = totals(map);
  ok(t.price > 0 && t.weight > 0);
  eq(t.missingWeight, false);
});
