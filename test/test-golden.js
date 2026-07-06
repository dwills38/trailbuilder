'use strict';
/* GOLDEN BUILDS — whole, realistic bikes that must validate clean, plus a
   known-bad build that must fail. These mirror the app's demo buttons, so the
   demos are tested too. If a future edit breaks a real bike, this catches it. */
var U = require('./test-util.js');
var C = U.C, B = U.B, eq = U.eq;
/** @param {Object.<string, string>} map */
var chk = function(map){ return C.checkBuild(B(map)); };

var GOOD = { frame:'fr-megatower', fork:'fk-zeb', shock:'sh-sdu-230625', frontWheel:'fw-reserve', rearWheel:'rw-reserve',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt', pedals:'pd-oneup-al' };

var DEAL = { frame:'fr-enduro', shock:'sh-vivid-oem', fork:'fk-zeb', frontWheel:'fw-roval', rearWheel:'rw-roval',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup-349', saddle:'sa-volt', pedals:'pd-mallet-e' };

var MADONNA = { frame:'fr-madonna', fork:'fk-zeb', shock:'sh-sd-trun', frontWheel:'fw-reserve', rearWheel:'rw-reserve',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt', pedals:'pd-atlas' };

var CLASH = { frame:'fr-enduro', fork:'fk-zeb-275', shock:'sh-sd-trun', frontWheel:'fw-i9', rearWheel:'rw-i9',
  frontTire:'ti-assegai-29', rearTire:'ti-assegai-29', shifter:'sft-gx-t', derailleur:'dr-gx-t', cassette:'ca-xt', chain:'ch-flattop', crankset:'cr-x0t',
  frontBrake:'bk-xt', rearBrake:'bk-xt', frontRotor:'ro-cl-203', rearRotor:'ro-cl-203',
  handlebar:'hb-pnw', stem:'st-apex', grips:'gr-oneup', dropper:'dp-pnw', saddle:'sa-volt', pedals:'pd-stamp7' };

test('golden: Santa Cruz Megatower trail build is fully compatible', function(){
  var r = chk(GOOD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: Specialized Enduro + its package shock is compatible', function(){
  var r = chk(DEAL); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: RAAW Madonna build is fully compatible', function(){
  var r = chk(MADONNA); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('known-bad: the deliberate clash build reports 7 errors', function(){
  // After sourcing real frame specs (Enduro = Boost 148 + UDH + 205x60 trunnion),
  // the rear-axle, not-UDH and shock-mount clashes disappeared; what remains:
  // front wheel size, drivetrain system, rotor interface x2, dropper diameter,
  // bar/stem clamp, shock size (205x65 in a 205x60 frame).
  eq(chk(CLASH).errors.length, 7);
});

var XT = { frame:'fr-megatower', fork:'fk-zeb', shock:'sh-sdu-230625', frontWheel:'fw-i9', rearWheel:'rw-i9', frontTire:'ti-assegai-29', rearTire:'ti-assegai-29',
  shifter:'sft-xt', derailleur:'dr-xt', cassette:'ca-xt', chain:'ch-shimano', crankset:'cr-xt',
  frontBrake:'bk-xt', rearBrake:'bk-xt', frontRotor:'ro-6b-203', rearRotor:'ro-6b-203',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt', pedals:'pd-xt' };
var SLX = { frame:'fr-megatower', fork:'fk-zeb', shock:'sh-sdu-230625', frontWheel:'fw-i9', rearWheel:'rw-i9', frontTire:'ti-assegai-29', rearTire:'ti-assegai-29',
  shifter:'sft-slx', derailleur:'dr-slx', cassette:'ca-slx', chain:'ch-shimano', crankset:'cr-rf',
  frontBrake:'bk-slx', rearBrake:'bk-slx', frontRotor:'ro-6b-203', rearRotor:'ro-6b-203',
  handlebar:'hb-pnw', stem:'st-pnw', grips:'gr-pnw', dropper:'dp-oneup', saddle:'sa-ergon', pedals:'pd-chester' };
var SPIRE_T = { frame:'fr-spire', fork:'fk-zeb', shock:'sh-sd-trun', frontWheel:'fw-reserve', rearWheel:'rw-reserve', frontTire:'ti-assegai-29', rearTire:'ti-assegai-29',
  shifter:'sft-gx-t', derailleur:'dr-gx-t', cassette:'ca-sram-t', chain:'ch-flattop', crankset:'cr-x0t',
  frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt', pedals:'pd-speciale' };

test('golden: Shimano XT build (Micro Spline, 6-bolt) is fully compatible', function(){
  var r = chk(XT); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: Shimano SLX build is fully compatible', function(){
  var r = chk(SLX); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: Transition Spire + SRAM Transmission (UDH) is fully compatible', function(){
  // (Moved off the Madonna: the stock V2.2 is NOT UDH - RAAW sells a retrofit
  // seatstay kit for Transmission, so the bare frame must reject udh-direct.)
  var r = chk(SPIRE_T); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

var MULLET = { frame:'fr-capra', fork:'fk-zeb', shock:'sh-sd-air', frontWheel:'fw-reserve', rearWheel:'rw-dt275',
  frontTire:'ti-assegai-29', rearTire:'ti-dhr-275', shifter:'sft-xt', derailleur:'dr-xt', cassette:'ca-xt', chain:'ch-shimano', crankset:'cr-xt',
  frontBrake:'bk-xt', rearBrake:'bk-xt', frontRotor:'ro-6b-203', rearRotor:'ro-cl-203',
  handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup', dropper:'dp-oneup', saddle:'sa-volt', pedals:'pd-chester' };
test('golden: mullet (29 front / 27.5 rear) on a mullet-capable frame is fully compatible', function(){
  var r = chk(MULLET); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

test('golden: every demo build fills every required slot (complete builds)', function(){
  var required = C.SLOTS.filter(function(s){ return !s.optional; });
  [GOOD, DEAL, MADONNA, MULLET].forEach(function(bld){
    var m = /** @type {Object.<string, string>} */ (bld);
    required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
  });
});
