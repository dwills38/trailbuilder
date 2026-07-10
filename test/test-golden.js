'use strict';
/* GOLDEN BUILDS — whole, realistic bikes that must validate clean, plus a
   known-bad build that must fail. These mirror the app's demo buttons, so the
   demos are tested too. If a future edit breaks a real bike, this catches it. */
var U = require('./test-util.js');
var C = U.C, B = U.B, eq = U.eq;
/** @param {Object.<string, string>} map */
var chk = function(map){ return C.checkBuild(B(map)); };

var GOOD = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };

// Enduro S-Works is a real 31.6mm seat tube, so DEAL runs a 31.6mm dropper (exact match,
// clean). Was a 34.9mm post, which was only clean against the old, wrong 34.9 seat tube;
// on the corrected 31.6 tube a 34.9 post is genuinely too big (dropper-diameter error).
var DEAL = { frame:'fr-specialized-enduro-sworks', shock:'sh-rockshox-vivid-ultimate-oem-205x60-trun', fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-roval-traverse-hd-29', rearWheel:'rw-roval-traverse-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-crankbrothers-mallet-enduro' };

var MADONNA = { frame:'fr-raaw-madonna-v22', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-205x65-trun', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-raceface-atlas' };

var CLASH = { frame:'fr-specialized-enduro-sworks', fork:'fk-rockshox-zeb-ultimate-275-170', shock:'sh-rockshox-super-deluxe-205x65-trun', frontWheel:'fw-industrynine-enduro-s-29', rearWheel:'rw-industrynine-enduro-s-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-transmission', derailleur:'dr-sram-gx-transmission', cassette:'ca-shimano-xt-m8100-1051', chain:'ch-sram-gx-flattop', crankset:'cr-sram-x0-transmission',
  frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-shimano-rtmt800-203-cl', rearRotor:'ro-shimano-rtmt800-203-cl',
  handlebar:'hb-pnw-range-318', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-pnw-loam-309-175', saddle:'sa-wtb-volt', pedals:'pd-crankbrothers-stamp-7-large' };

test('golden: Santa Cruz Megatower trail build is fully compatible', function(){
  var r = chk(GOOD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: Specialized Enduro + its package shock is compatible', function(){
  var r = chk(DEAL); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: RAAW Madonna build is fully compatible', function(){
  var r = chk(MADONNA); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

// Same bike as GOOD, but the wheels are built from separate hub+rim parts
// instead of a complete wheelset (DT Swiss 350 hubs + EX 511 rims) - proves
// the build-your-own-wheel path resolves through every rule GOOD exercises.
// DT Swiss 350 hubs are Center Lock, so the rotors swap to a CL model
// (vs GOOD's 6-bolt Reserve wheels) - otherwise this would correctly warn
// on the CL-adapter rule, which isn't what this test is proving.
var GOOD_SPLIT_WHEELS = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5',
  frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29', rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-shimano-rtmt800-203-cl', rearRotor:'ro-shimano-rtmt800-203-cl',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };
test('golden: same Megatower build, wheels built from hub+rim instead of a complete wheelset', function(){
  var r = chk(GOOD_SPLIT_WHEELS); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('known-bad: the deliberate clash build reports 6 errors + the shim warning', function(){
  // After sourcing real frame specs (Enduro = Boost 148 + UDH + 205x60 trunnion),
  // the rear-axle, not-UDH and shock-mount clashes disappeared; what remains:
  // front wheel size, drivetrain system, rotor interface x2, bar/stem clamp,
  // shock stroke too long (205x65 in a 205x60 frame - the over-rotation
  // direction stays an error under the REVIEW #8 split). The 30.9-in-31.6
  // dropper is the shimable direction, a WARNING since the REVIEW #9 split.
  var r = chk(CLASH);
  eq(r.errors.length, 6);
  U.some(r.warnings, 'reducing shim');
});

var XT = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-industrynine-enduro-s-29', rearWheel:'rw-industrynine-enduro-s-29', frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg',
  shifter:'sft-shimano-xt-m8100', derailleur:'dr-shimano-xt-m8100-sgs', cassette:'ca-shimano-xt-m8100-1051', chain:'ch-shimano-xt-m8100', crankset:'cr-shimano-xt-m8100',
  frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-hayes-dseries-203-6b', rearRotor:'ro-hayes-dseries-203-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-shimano-xt-m8120' };
var SLX = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-industrynine-enduro-s-29', rearWheel:'rw-industrynine-enduro-s-29', frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg',
  shifter:'sft-shimano-slx-m7100', derailleur:'dr-shimano-slx-m7100-sgs', cassette:'ca-shimano-slx-m7100-1051', chain:'ch-shimano-xt-m8100', crankset:'cr-raceface-aeffect-r',
  frontBrake:'bk-shimano-slx-m7120', rearBrake:'bk-shimano-slx-m7120', frontRotor:'ro-hayes-dseries-203-6b', rearRotor:'ro-hayes-dseries-203-6b',
  handlebar:'hb-pnw-range-318', stem:'st-pnw-range-318', grips:'gr-pnw-loam', dropper:'dp-oneup-v3-316-210', saddle:'sa-ergon-sm-enduro', pedals:'pd-raceface-chester' };
var SPIRE_T = { frame:'fr-transition-spire-alloy', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-205x65-trun', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29', frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg',
  shifter:'sft-sram-gx-transmission', derailleur:'dr-sram-gx-transmission', cassette:'ca-sram-xs1275', chain:'ch-sram-gx-flattop', crankset:'cr-sram-x0-transmission',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-time-speciale-12-large' };

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

var MULLET = { frame:'fr-yt-capra-core4', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x65', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-dtswiss-e-1900-275',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt', shifter:'sft-shimano-xt-m8100', derailleur:'dr-shimano-xt-m8100-sgs', cassette:'ca-shimano-xt-m8100-1051', chain:'ch-shimano-xt-m8100', crankset:'cr-shimano-xt-m8100',
  frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-hayes-dseries-203-6b', rearRotor:'ro-shimano-rtmt800-203-cl',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-raceface-chester' };
test('golden: mullet (29 front / 27.5 rear) on a mullet-capable frame is fully compatible', function(){
  var r = chk(MULLET); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

/* REVIEW.md #7 — the SRAM-cassette mullet trap. Before the XD 27.5 rear wheel
   existed, NO error-free SRAM-cassette build was possible on the mullet-only
   frames (Meta SX / HD6): all SRAM cassettes are XD/HG and the only 27.5 rear
   wheel was MicroSpline. The Meta SX ships stock with SRAM - the red was a
   false claim about the real world. This build must stay green forever. */
var META_T = { frame:'fr-commencal-meta-sx-v5', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-vivid-ultimate-230x65', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-dtswiss-e-1900-275-xd',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt', shifter:'sft-sram-gx-transmission', derailleur:'dr-sram-gx-transmission', cassette:'ca-sram-xs1275', chain:'ch-sram-gx-flattop', crankset:'cr-sram-x0-transmission',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-centerline-180-cl',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-349-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };
test('golden: SRAM Transmission mullet on the Meta SX (XD 27.5 rear) is fully compatible', function(){
  var r = chk(META_T); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

test('golden: every demo build fills every required slot (complete builds)', function(){
  [GOOD, DEAL, MADONNA, MULLET].forEach(function(bld){
    var m = /** @type {Object.<string, string>} */ (bld);
    // requiredness is frame-aware (slotRequired) — for these full-sus
    // non-DH builds it must equal the old !optional rule, except altOf slots
    // (frontHub/frontRim/rearHub/rearRim), which are never independently
    // required — only their altOf target (frontWheel/rearWheel) counts.
    var frame = C.byId(m.frame);
    var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
    eq(required.length, C.SLOTS.filter(function(s){ return !s.optional && !s.altOf; }).length,
       'an enduro full-sus frame must not change requiredness');
    required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
  });
});

/* The first complete DOWNHILL build (2026-07-08): Supreme DH V5 + BoxXer
   dual-crown + Vivid DH 250x75 + FR 1500 DH wheels (20x110 / 12x157) + DH
   casing tires + the X01 DH 7-speed group. Locks the discipline-expansion
   vocab (20x110, straight-dc, sram-dh-7, SuperBoost157, PF107) together end-to-end.
   (Rear axle corrected 2026-07-08 to native SuperBoost157 - see the frame row desc.)
   No dropper - the DH frame exempts it (slotRequired). Must stay green. */
var DH_BUILD = { frame:'fr-commencal-supreme-dh-v5', fork:'fk-rockshox-boxxer-ultimate-29-200', shock:'sh-rockshox-vivid-ultimate-dh-250x75',
  frontWheel:'fw-dtswiss-fr-1500-29', rearWheel:'rw-dtswiss-fr-1500-29-157',
  frontTire:'ti-maxxis-assegai-29-25-dh-mg', rearTire:'ti-maxxis-assegai-29-25-dh-mg',
  shifter:'sft-sram-x01-dh', derailleur:'dr-sram-x01-dh', cassette:'ca-sram-xg795', chain:'ch-sram-pc-xx1', crankset:'cr-sram-x01-dh',
  frontBrake:'bk-sram-maven-ultimate', rearBrake:'bk-sram-maven-ultimate', frontRotor:'ro-sram-hs2-220-6b', rearRotor:'ro-sram-hs2-220-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', saddle:'sa-wtb-volt', pedals:'pd-oneup-composite' };
test('golden: a complete DH race build (dual-crown, 7-speed, no dropper) is fully compatible', function(){
  var r = chk(DH_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the DH build fills every required slot (dropper exempt via slotRequired)', function(){
  var m = /** @type {Object.<string, string>} */ (DH_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  eq(required.some(function(s){ return s.key==='dropper'; }), false, 'dropper must be exempt on a DH frame');
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* The first complete FULL-27.5 DH build (2026-07-08, pass 4): FRS (the only
   275-config DH frame) + BoXXer 27.5 dual-crown + Vivid DH 250x75 + Synthesis
   DH 27.5 front (20x110) + FR 1500 27.5 rear (12x150) + 27.5 DH-casing
   Assegai + the X01 DH 7-speed group. Locks the 275 wheelConfig into the DH
   vocab chain; rotors are 200mm (the FRS maxRotorR is 203). Must stay green. */
var DH_275_BUILD = { frame:'fr-commencal-frs', fork:'fk-rockshox-boxxer-ultimate-275-200', shock:'sh-rockshox-vivid-ultimate-dh-250x75',
  frontWheel:'fw-crankbrothers-synthesis-dh11-275', rearWheel:'rw-dtswiss-fr-1500-275-150',
  frontTire:'ti-maxxis-assegai-275-25-dh-mg', rearTire:'ti-maxxis-assegai-275-25-dh-mg',
  shifter:'sft-sram-x01-dh', derailleur:'dr-sram-x01-dh', cassette:'ca-sram-xg795', chain:'ch-sram-pc-xx1', crankset:'cr-sram-x01-dh',
  frontBrake:'bk-sram-maven-ultimate', rearBrake:'bk-sram-maven-ultimate', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', saddle:'sa-wtb-volt', pedals:'pd-oneup-composite' };
test('golden: a complete FULL-27.5 DH park build (FRS) is fully compatible', function(){
  var r = chk(DH_275_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the 27.5 DH build fills every required slot', function(){
  var m = /** @type {Object.<string, string>} */ (DH_275_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* The first complete XC HARDTAIL race build (2026-07-08): Exceed CF (flat-mount
   rear, no shock) + SID 120 + Micro Spline wheel + verified Aspen tires + XTR
   with an FM rear caliper + 30.9 dropper. Locks the hardtail machinery (no
   shock block, shock slot exempt) + the FM vocab end-to-end. Must stay green. */
var XC_BUILD = { frame:'fr-canyon-exceed-cf', fork:'fk-rockshox-sid-ultimate-29-120',
  frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-ex-1700-29-ms',
  frontTire:'ti-maxxis-aspen-29-24-exo-dual', rearTire:'ti-maxxis-aspen-29-24-exo-dual',
  shifter:'sft-shimano-xtr-m9100', derailleur:'dr-shimano-xtr-m9100-sgs', cassette:'ca-shimano-xtr-m9100-1051', chain:'ch-shimano-xtr-m9100', crankset:'cr-shimano-xtr-m9100',
  frontBrake:'bk-shimano-xtr-m9120', rearBrake:'bk-shimano-xtr-m9110-fm', frontRotor:'ro-shimano-rtmt800-180-cl', rearRotor:'ro-shimano-rtmt800-180-cl',
  handlebar:'hb-oneup-carbon-35', stem:'st-oneup-stem-35', grips:'gr-oneup-lockon', dropper:'dp-fox-transfer-factory-309-180', saddle:'sa-wtb-volt', pedals:'pd-crankbrothers-mallet-enduro' };
test('golden: a complete XC hardtail race build (flat-mount rear, no shock) is fully compatible', function(){
  var r = chk(XC_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the XC hardtail fills every required slot (shock exempt via slotRequired)', function(){
  var m = /** @type {Object.<string, string>} */ (XC_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  eq(required.some(function(s){ return s.key==='shock'; }), false, 'shock must be exempt on a hardtail');
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* The first complete XC FULL-SUSPENSION race build (2026-07-08, pass 4;
   pass 5 moved it onto the verified Synthesis XCT 11 wheels - 6-bolt hubs,
   so rotors went 6-bolt too, incl. the new 160mm 6-bolt rear): Lux World Cup
   (the first flat-mount FULL-SUS frame, 160mm rear max) + SID 120 + SIDLuxe
   210x50 + verified Racing Ray front / Racing Ralph rear (Schwalbe's
   front/rear-specific XC pairing) + XTR with the FM rear caliper + 30.9
   dropper. Must stay green. */
var XC_FS_BUILD = { frame:'fr-canyon-lux-world-cup-cf', fork:'fk-rockshox-sid-ultimate-29-120', shock:'sh-rockshox-sidluxe-ultimate-210x50',
  frontWheel:'fw-crankbrothers-synthesis-xct11-29', rearWheel:'rw-crankbrothers-synthesis-xct11-29-ms',
  frontTire:'ti-schwalbe-racing-ray-29-235-sr-as', rearTire:'ti-schwalbe-racing-ralph-29-235-sr-as',
  shifter:'sft-shimano-xtr-m9100', derailleur:'dr-shimano-xtr-m9100-sgs', cassette:'ca-shimano-xtr-m9100-1051', chain:'ch-shimano-xtr-m9100', crankset:'cr-shimano-xtr-m9100',
  frontBrake:'bk-shimano-xtr-m9120', rearBrake:'bk-shimano-xtr-m9110-fm', frontRotor:'ro-sram-hs2-180-6b', rearRotor:'ro-sram-centerline-160-6b',
  handlebar:'hb-oneup-carbon-35', stem:'st-oneup-stem-35', grips:'gr-oneup-lockon', dropper:'dp-fox-transfer-factory-309-180', saddle:'sa-wtb-volt', pedals:'pd-crankbrothers-mallet-enduro' };
test('golden: a complete XC full-suspension race build (flat-mount rear, 210x50) is fully compatible', function(){
  var r = chk(XC_FS_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the XC full-sus build fills every required slot', function(){
  var m = /** @type {Object.<string, string>} */ (XC_FS_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* The first complete TRAIL build (2026-07-08, pass 4): Stumpjumper 15 +
   Fox 36 160 + Super Deluxe 210x55 + Turbine SL (XD) + DHR II 2.4s + GX
   Eagle + XT 4-piston w/ 200mm 6-bolt rotors + a 34.9 dropper (the
   Stumpjumper seat tube). Backs the UI's Trail demo button. Must stay green. */
var TRAIL_BUILD = { frame:'fr-specialized-stumpjumper-15', fork:'fk-fox-36-factory-29-160', shock:'sh-rockshox-super-deluxe-ultimate-210x55',
  frontWheel:'fw-raceface-turbine-sl-29', rearWheel:'rw-raceface-turbine-sl-29',
  frontTire:'ti-maxxis-minion-dhr-ii-29-24-exop-mt', rearTire:'ti-maxxis-minion-dhr-ii-29-24-exop-mt',
  shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-fox-transfer-factory-349-180', saddle:'sa-wtb-volt', pedals:'pd-oneup-composite' };
test('golden: a complete TRAIL build (Stumpjumper 15, 210x55) is fully compatible', function(){
  var r = chk(TRAIL_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the trail build fills every required slot', function(){
  var m = /** @type {Object.<string, string>} */ (TRAIL_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* The first complete full-27.5 ENDURO build (catalog-expand-9, 2026-07-08):
   Commencal Clash V3 (full 27.5, not DH) + ZEB 27.5 170 + Super Deluxe Ultimate
   230x65 std + DT Swiss E 1900 27.5 front/rear (XD) + two in-catalog 27.5
   enduro-casing tires + SRAM GX Transmission (UDH). Everything needed already
   existed in-catalog before this frame landed - no new shock/wheel/fork rows
   were needed. Must stay green. */
var CLASH_V3_BUILD = { frame:'fr-commencal-clash-v3', fork:'fk-rockshox-zeb-ultimate-275-170', shock:'sh-rockshox-super-deluxe-ultimate-230x65',
  frontWheel:'fw-dtswiss-e-1900-275', rearWheel:'rw-dtswiss-e-1900-275-xd',
  frontTire:'ti-maxxis-assegai-275-25-exop-mg', rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt',
  shifter:'sft-sram-gx-transmission', derailleur:'dr-sram-gx-transmission', cassette:'ca-sram-xs1275', chain:'ch-sram-gx-flattop', crankset:'cr-sram-x0-transmission',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-shimano-rtmt800-203-cl', rearRotor:'ro-shimano-rtmt800-203-cl',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-349-210', saddle:'sa-wtb-volt', pedals:'pd-crankbrothers-mallet-enduro' };
test('golden: a complete full-27.5 ENDURO build (Clash V3) is fully compatible', function(){
  var r = chk(CLASH_V3_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the Clash V3 build fills every required slot', function(){
  var m = /** @type {Object.<string, string>} */ (CLASH_V3_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* Second complete TRAIL build (catalog-expand-9, 2026-07-08): Commencal Meta
   TR V4 shares its 210x55 std shock size and 34.9 seatpost with the existing
   Stumpjumper 15 TRAIL_BUILD, so the same fork/wheel/tire/drivetrain/dropper
   selection carries over unchanged onto the new frame. Must stay green. */
var META_TR_BUILD = { frame:'fr-commencal-meta-tr-v4', fork:'fk-fox-36-factory-29-160', shock:'sh-rockshox-super-deluxe-ultimate-210x55',
  frontWheel:'fw-raceface-turbine-sl-29', rearWheel:'rw-raceface-turbine-sl-29',
  frontTire:'ti-maxxis-minion-dhr-ii-29-24-exop-mt', rearTire:'ti-maxxis-minion-dhr-ii-29-24-exop-mt',
  shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-fox-transfer-factory-349-180', saddle:'sa-wtb-volt', pedals:'pd-oneup-composite' };
test('golden: a complete TRAIL build (Meta TR V4, 210x55) is fully compatible', function(){
  var r = chk(META_TR_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the Meta TR V4 build fills every required slot', function(){
  var m = /** @type {Object.<string, string>} */ (META_TR_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* catalog-expand-A: RAAW Madonna R - a concurrent sibling to the V3.2 (165mm
   rear vs 160), sold side by side per RAAW's own comparison page. Shares the
   205x65 trunnion shock size already in-catalog. Must stay green. */
var MADONNA_R_BUILD = { frame:'fr-raaw-madonna-r', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-205x65-trun',
  frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg',
  shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-raceface-atlas' };
test('golden: a complete RAAW Madonna R build (165mm, 205x65 trunnion) is fully compatible', function(){
  var r = chk(MADONNA_R_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the Madonna R build fills every required slot', function(){
  var m = /** @type {Object.<string, string>} */ (MADONNA_R_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* catalog-expand-A: Canyon Grand Canyon AL - the first BUDGET alloy trail
   hardtail (Exceed CF/Scale RC SL are both XC race carbon). Center Lock hub
   interface per the fetched spec (Center Lock rotors, not 6-bolt). Must stay
   green. */
var GRAND_CANYON_BUILD = { frame:'fr-canyon-grand-canyon-al', fork:'fk-rockshox-sid-ultimate-29-120',
  frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-ex-1700-29-ms',
  frontTire:'ti-maxxis-aspen-29-24-exo-dual', rearTire:'ti-maxxis-aspen-29-24-exo-dual',
  shifter:'sft-shimano-xt-m8100', derailleur:'dr-shimano-xt-m8100-sgs', cassette:'ca-shimano-xt-m8100-1051', chain:'ch-shimano-xt-m8100', crankset:'cr-shimano-xt-m8100',
  frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-shimano-rtmt800-180-cl', rearRotor:'ro-shimano-rtmt800-180-cl',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-composite' };
test('golden: a complete Canyon Grand Canyon AL hardtail build (Center Lock) is fully compatible', function(){
  var r = chk(GRAND_CANYON_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the Grand Canyon AL build fills every required slot (shock exempt via slotRequired)', function(){
  var m = /** @type {Object.<string, string>} */ (GRAND_CANYON_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  eq(required.some(function(s){ return s.key==='shock'; }), false, 'shock must be exempt on a hardtail');
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

/* catalog-expand-A: Öhlins DH38 m.2 as a drop-in alternative to the RockShox
   BoXXer on the Supreme DH V5 - the DH fork brand choice was RockShox/Fox/
   Marzocchi only before this pass. Must stay green. */
var DH38_BUILD = Object.assign({}, DH_BUILD, { fork:'fk-ohlins-dh38-m2-29-200', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b' });
test('golden: the Öhlins DH38 m.2 fork drop-in on the DH build is fully compatible', function(){
  var r = chk(DH38_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

/* First complete MULLET DH build (catalog-expand-9, 2026-07-08): Supreme DH
   V5.2 running 29 front / 27.5 rear - previously impossible, since every
   SuperBoost157 rear wheel in-catalog was 29in-only (a real 0-brand gap
   across five DH frames: Firebird, Supreme DH V5/V5.2, Sender CFR, V10 8).
   Exercises the new rw-dtswiss-fr-1500-275-157 rear wheel + the new Ohlins
   TTX22 250x75 shock together. Must stay green. */
var MULLET_DH_BUILD = { frame:'fr-commencal-supreme-dh-v52', fork:'fk-rockshox-boxxer-ultimate-29-200', shock:'sh-ohlins-ttx22-m2-250x75',
  frontWheel:'fw-dtswiss-fr-1500-29', rearWheel:'rw-dtswiss-fr-1500-275-157',
  frontTire:'ti-maxxis-assegai-29-25-dh-mg', rearTire:'ti-maxxis-assegai-275-25-dh-mg',
  shifter:'sft-sram-x01-dh', derailleur:'dr-sram-x01-dh', cassette:'ca-sram-xg795', chain:'ch-sram-pc-xx1', crankset:'cr-sram-x01-dh',
  frontBrake:'bk-sram-maven-ultimate', rearBrake:'bk-sram-maven-ultimate', frontRotor:'ro-sram-hs2-220-6b', rearRotor:'ro-sram-hs2-220-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', saddle:'sa-wtb-volt', pedals:'pd-oneup-composite' };
test('golden: a complete MULLET DH build (Supreme DH V5.2, 29 front/27.5 rear) is fully compatible', function(){
  var r = chk(MULLET_DH_BUILD); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('golden: the mullet DH build fills every required slot (dropper exempt via slotRequired)', function(){
  var m = /** @type {Object.<string, string>} */ (MULLET_DH_BUILD);
  var frame = C.byId(m.frame);
  var required = C.SLOTS.filter(function(s){ return C.slotRequired(s, frame); });
  eq(required.some(function(s){ return s.key==='dropper'; }), false, 'dropper must be exempt on a DH frame');
  required.forEach(function(s){ eq(!!m[s.key], true, 'missing required slot '+s.key); });
});

test('slotRequired: hardtail frame exempts the shock slot (completeness only)', function(){
  var frame = /** @type {any} */ (Object.assign({}, C.byId('fr-santacruz-megatower-cc'), { suspension:'hardtail' }));
  delete frame.shockEye; delete frame.shockStroke; delete frame.shockMount; delete frame.travel; delete frame.bundledShock;
  var shockSlot = C.SLOTS.filter(function(s){ return s.key==='shock'; })[0];
  var dropperSlot = C.SLOTS.filter(function(s){ return s.key==='dropper'; })[0];
  eq(C.slotRequired(shockSlot, frame), false, 'hardtail: shock not required');
  eq(C.slotRequired(dropperSlot, frame), true, 'hardtail: dropper still required');
});
test('slotRequired: DH-discipline frame exempts the dropper slot (completeness only)', function(){
  var frame = /** @type {any} */ (Object.assign({}, C.byId('fr-santacruz-megatower-cc'), { disciplines:['dh'] }));
  var shockSlot = C.SLOTS.filter(function(s){ return s.key==='shock'; })[0];
  var dropperSlot = C.SLOTS.filter(function(s){ return s.key==='dropper'; })[0];
  eq(C.slotRequired(dropperSlot, frame), false, 'DH: dropper not required');
  eq(C.slotRequired(shockSlot, frame), true, 'DH full-sus: shock still required');
});
test('slotRequired: no frame chosen = universal default (all non-optional, non-altOf required)', function(){
  C.SLOTS.forEach(function(s){ eq(C.slotRequired(s, null), !s.optional && !s.altOf, s.key); });
});
test('slotRequired: integrated-cassette rear wheel exempts the cassette slot (completeness only)', function(){
  var cassetteSlot = C.SLOTS.filter(function(s){ return s.key==='cassette'; })[0];
  var lg1r = /** @type {any} */ (C.byId('rw-ethirteen-lg1r-29-150-xd'));
  var normal = /** @type {any} */ (C.byId('rw-dtswiss-ex-1700-29'));
  eq(C.slotRequired(cassetteSlot, null, lg1r), false, 'integrated wheel: cassette not required');
  eq(C.slotRequired(cassetteSlot, null, normal), true, 'normal wheel: cassette still required');
  eq(C.slotRequired(cassetteSlot, null), true, 'no wheel passed (2-arg callers keep the universal default)');
});
