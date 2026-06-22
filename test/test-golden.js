'use strict';
/* GOLDEN BUILDS — whole, realistic bikes that must validate clean, plus a
   known-bad build that must fail. These mirror the app's demo buttons, so the
   demos are tested too. If a future edit breaks a real bike, this catches it. */
var H = require('./test-harness.js');
var U = require('./test-util.js');
var C = U.C, B = U.B, test = H.test, eq = H.eq;
/** @param {Object.<string, string>} map */
var chk = function(map){ return C.checkBuild(B(map)); };

var GOOD = { frame:'fr-megatower', fork:'fk-zeb', shock:'sh-sd-air', frontWheel:'fw-reserve', rearWheel:'rw-reserve',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt' };

var DEAL = { frame:'fr-enduro', shock:'sh-genie-oem', fork:'fk-zeb', frontWheel:'fw-roval', rearWheel:'rw-roval',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup-349', saddle:'sa-volt' };

var MADONNA = { frame:'fr-madonna', fork:'fk-zeb', shock:'sh-sd-trun', frontWheel:'fw-reserve', rearWheel:'rw-reserve',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt' };

var CLASH = { frame:'fr-enduro', fork:'fk-zeb-275', shock:'sh-sd-trun', frontWheel:'fw-i9', rearWheel:'rw-i9',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-t', derailleur:'dr-gx-t', cassette:'ca-xt', chain:'ch-flattop', crankset:'cr-x0t',
  frontBrake:'bk-xt', rearBrake:'bk-xt', frontRotor:'ro-cl-203', rearRotor:'ro-cl-203',
  handlebar:'hb-pnw', stem:'st-apex', grips:'gr-oneup', dropper:'dp-pnw', saddle:'sa-volt' };

test('golden: Santa Cruz Megatower trail build is fully compatible', function(){
  var r = chk(GOOD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: Specialized Enduro + its package shock is compatible', function(){
  var r = chk(DEAL); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: RAAW Madonna build is fully compatible', function(){
  var r = chk(MADONNA); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('known-bad: the deliberate clash build reports 10 errors', function(){
  eq(chk(CLASH).errors.length, 10);
});

var XT = { frame:'fr-megatower', fork:'fk-zeb', shock:'sh-sd-air', frontWheel:'fw-i9', rearWheel:'rw-i9', frontTire:'ti-assegai-29', rearTire:'ti-assegai-29',
  shifter:'sft-xt', derailleur:'dr-xt', cassette:'ca-xt', chain:'ch-shimano', crankset:'cr-xt',
  frontBrake:'bk-xt', rearBrake:'bk-xt', frontRotor:'ro-6b-203', rearRotor:'ro-6b-203',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt' };
var SLX = { frame:'fr-megatower', fork:'fk-zeb', shock:'sh-sd-air', frontWheel:'fw-i9', rearWheel:'rw-i9', frontTire:'ti-assegai-29', rearTire:'ti-assegai-29',
  shifter:'sft-slx', derailleur:'dr-slx', cassette:'ca-slx', chain:'ch-shimano', crankset:'cr-rf',
  frontBrake:'bk-slx', rearBrake:'bk-slx', frontRotor:'ro-6b-203', rearRotor:'ro-6b-203',
  handlebar:'hb-pnw', stem:'st-pnw', grips:'gr-pnw', dropper:'dp-oneup', saddle:'sa-ergon' };
var MADONNA_T = { frame:'fr-madonna', fork:'fk-zeb', shock:'sh-sd-trun', frontWheel:'fw-reserve', rearWheel:'rw-reserve', frontTire:'ti-assegai-29', rearTire:'ti-assegai-29',
  shifter:'sft-gx-t', derailleur:'dr-gx-t', cassette:'ca-sram-t', chain:'ch-flattop', crankset:'cr-x0t',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt' };

test('golden: Shimano XT build (Micro Spline, 6-bolt) is fully compatible', function(){
  var r = chk(XT); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: Shimano SLX build is fully compatible', function(){
  var r = chk(SLX); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: RAAW Madonna + SRAM Transmission (UDH) is fully compatible', function(){
  var r = chk(MADONNA_T); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

var MULLET = { frame:'fr-madonna', fork:'fk-zeb', shock:'sh-sd-trun', frontWheel:'fw-reserve', rearWheel:'rw-dt275',
  frontTire:'ti-assegai-29', rearTire:'ti-dhr-275', shifter:'sft-xt', derailleur:'dr-xt', cassette:'ca-xt', chain:'ch-shimano', crankset:'cr-xt',
  frontBrake:'bk-xt', rearBrake:'bk-xt', frontRotor:'ro-6b-203', rearRotor:'ro-cl-203',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt' };
test('golden: mullet (29 front / 27.5 rear) on a mullet-capable frame is fully compatible', function(){
  var r = chk(MULLET); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
