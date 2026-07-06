'use strict';
/* ENGINE RULES — each compatibility rule fires (and only fires) when it should. */
/** @typedef {import('../src/types.js').FramePart} FramePart */
/** @typedef {import('../src/types.js').TirePart} TirePart */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, some = U.some;
/** @param {Object.<string, string>} map */
var chk = function(map){ return C.checkBuild(B(map)); };

test('empty build -> no issues', function(){
  var r = C.checkBuild({}); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

test('29-only frame rejects a 27.5 front (fork) -> error', function(){
  some(chk({frame:'fr-megatower', fork:'fk-zeb-275'}).errors, 'wheel');
});
test('mullet (29 front + 27.5 rear) is allowed on a mullet-capable frame', function(){
  eq(chk({frame:'fr-capra', fork:'fk-zeb', frontWheel:'fw-reserve', rearWheel:'rw-dt275', frontTire:'ti-assegai-29', rearTire:'ti-dhr-275'}).errors.length, 0);
});
test('mullet is rejected on a 29-only frame', function(){
  some(chk({frame:'fr-megatower', fork:'fk-zeb', frontWheel:'fw-reserve', rearWheel:'rw-dt275', frontTire:'ti-assegai-29', rearTire:'ti-dhr-275'}).errors, 'Unsupported wheel setup');
});
test('SuperBoost frame + Boost rear wheel -> rear axle error', function(){
  some(chk({frame:'fr-firebird', rearWheel:'rw-reserve'}).errors, 'Rear axle');
});
test('SuperBoost frame + SuperBoost wheel -> ok', function(){
  eq(chk({frame:'fr-firebird', rearWheel:'rw-i9-157'}).errors.length, 0);
});
test('Shimano cassette on XD wheel -> freehub error', function(){
  some(chk({cassette:'ca-xt', rearWheel:'rw-roval'}).errors, 'Freehub');
});
test('SRAM shifter + Shimano derailleur -> system mismatch', function(){
  some(chk({shifter:'sft-gx-m', derailleur:'dr-xt'}).errors, 'Drivetrain mismatch');
});

/* Rule 3b — actuation (REVIEW.md #1). Cable vs wireless share system:'sram-eagle',
   so before the actuation field this pairing passed totally clean. */
test('mechanical trigger + AXS (wireless) derailleur, same system -> actuation error', function(){
  some(chk({shifter:'sft-gx-m', derailleur:'dr-gx-axs'}).errors, 'Actuation mismatch');
});
test('AXS controller + mechanical derailleur -> actuation error (reverse direction)', function(){
  some(chk({shifter:'sft-gx-axs', derailleur:'dr-gx-m'}).errors, 'Actuation mismatch');
});
test('AXS Eagle drivetrain sharing Eagle cassette/chain stays clean (no system-vocab split)', function(){
  eq(chk({shifter:'sft-gx-axs', derailleur:'dr-gx-axs', cassette:'ca-sram-e', chain:'ch-eagle'}).errors.length, 0);
});

/* Rule 3c — T-Type chainring (REVIEW.md #2). SRAM-documented hard incompatibility,
   one-directional: Flattop chain needs a T-Type ring; T-Type ring runs Eagle chains fine. */
test('Transmission Flattop chain + non-T-Type crank -> chainring error', function(){
  some(chk({chain:'ch-flattop', crankset:'cr-xt'}).errors, 'Chainring mismatch');
});
test('Transmission Flattop chain + T-Type crank -> clean', function(){
  eq(chk({chain:'ch-flattop', crankset:'cr-x0t'}).errors.length, 0);
});
test('T-Type crank + Eagle chain -> clean (backward-compatible per SRAM, no reverse error)', function(){
  eq(chk({chain:'ch-eagle', crankset:'cr-x0t'}).errors.length, 0);
});
test('Transmission derailleur needs a UDH frame', function(){
  some(chk({frame:'fr-process', derailleur:'dr-gx-t'}).errors, 'UDH');
});
test('Transmission derailleur is fine on a UDH frame', function(){
  eq(chk({frame:'fr-megatower', derailleur:'dr-gx-t'}).errors.length, 0);
});
test('cassette bigger than derailleur capacity -> error', function(){
  some(chk({cassette:'ca-sram-e', derailleur:'dr-xt'}).errors, 'Cassette too big');
});
test('Center Lock rotor on a 6-bolt front hub -> interface error', function(){
  some(chk({fork:'fk-zeb', frontWheel:'fw-reserve', frontRotor:'ro-cl-203'}).errors, 'rotor interface');
});
test('bar/stem clamp mismatch (35 vs 31.8) -> error', function(){
  some(chk({handlebar:'hb-pnw', stem:'st-apex'}).errors, 'clamp');
});
test('dropper diameter mismatch (31.6 in a 34.9 frame) -> error', function(){
  some(chk({frame:'fr-enduro', dropper:'dp-oneup'}).errors, 'Dropper diameter');
});
test('trunnion shock on a standard-mount frame -> mount error', function(){
  some(chk({frame:'fr-megatower', shock:'sh-sd-trun'}).errors, 'mount');
});
test('OEM shock cannot go on the wrong frame -> error', function(){
  some(chk({frame:'fr-megatower', shock:'sh-vivid-oem'}).errors, 'OEM');
});
test('package-only frame + a different (but fitting) shock -> warning, not error', function(){
  var r = chk({frame:'fr-enduro', shock:'sh-sdu-2056'});
  eq(r.errors.length, 0); some(r.warnings, 'package-only');
});
test('over-travel fork (180 on a 170-rated frame) -> warning', function(){
  some(chk({frame:'fr-strive', fork:'fk-38-180'}).warnings, 'Fork travel');
});

/* Rule 18 — rear tire vs FRAME clearance. Dormant on the current catalog (no
   frame declares maxTire), so these drive it with a cloned frame that does. */
test('rear tire wider than the frame max -> clearance warning (frame.maxTire set)', function(){
  var bld = B({frame:'fr-madonna'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, bld.frame, {maxTire:2.5}));
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-assegai-29'), {width:2.6}));
  some(C.checkBuild(bld).warnings, 'frame max');
});
test('rear tire within the frame max -> no clearance warning', function(){
  var bld = B({frame:'fr-madonna'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, bld.frame, {maxTire:2.6}));
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-assegai-29'), {width:2.5}));
  eq(C.checkBuild(bld).warnings.filter(function(w){ return w.indexOf('frame max')>=0; }).length, 0);
});
test('frame clearance rule stays dormant when the frame declares no maxTire', function(){
  var bld = B({frame:'fr-capra'});   // no sourced maxTire on the Capra (yet)
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-assegai-29'), {width:3.0}));  // absurdly wide, still silent
  eq(C.checkBuild(bld).warnings.filter(function(w){ return w.indexOf('frame max')>=0; }).length, 0);
});
test('frame clearance rule is ACTIVE on sourced frames (Madonna 2.6in + 2.6in tire is fine)', function(){
  var bld = B({frame:'fr-madonna'});
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-assegai-29'), {width:2.8}));
  some(C.checkBuild(bld).warnings, 'frame max');   // 2.8 > sourced 2.6 -> warns
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-assegai-29'), {width:2.5}));
  eq(C.checkBuild(bld).warnings.filter(function(w){ return w.indexOf('frame max')>=0; }).length, 0);
});
