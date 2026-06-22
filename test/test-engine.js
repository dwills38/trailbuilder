'use strict';
/* ENGINE RULES — each compatibility rule fires (and only fires) when it should. */
var H = require('./test-harness.js');
var U = require('./test-util.js');
var C = U.C, B = U.B, test = H.test, eq = H.eq, some = H.some;
var chk = function(map){ return C.checkBuild(B(map)); };

test('empty build -> no issues', function(){
  var r = C.checkBuild({}); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

test('29-only frame rejects a 27.5 front (fork) -> error', function(){
  some(chk({frame:'fr-megatower', fork:'fk-zeb-275'}).errors, 'wheel');
});
test('mullet (29 front + 27.5 rear) is allowed on a mullet-capable frame', function(){
  eq(chk({frame:'fr-madonna', fork:'fk-zeb', frontWheel:'fw-reserve', rearWheel:'rw-dt275', frontTire:'ti-assegai-29', rearTire:'ti-dhr-275'}).errors.length, 0);
});
test('mullet is rejected on a 29-only frame', function(){
  some(chk({frame:'fr-megatower', fork:'fk-zeb', frontWheel:'fw-reserve', rearWheel:'rw-dt275', frontTire:'ti-assegai-29', rearTire:'ti-dhr-275'}).errors, 'Unsupported wheel setup');
});
test('SuperBoost frame + Boost rear wheel -> rear axle error', function(){
  some(chk({frame:'fr-enduro', rearWheel:'rw-reserve'}).errors, 'Rear axle');
});
test('SuperBoost frame + SuperBoost wheel -> ok', function(){
  eq(chk({frame:'fr-enduro', rearWheel:'rw-roval'}).errors.length, 0);
});
test('Shimano cassette on XD wheel -> freehub error', function(){
  some(chk({cassette:'ca-xt', rearWheel:'rw-roval'}).errors, 'Freehub');
});
test('SRAM shifter + Shimano derailleur -> system mismatch', function(){
  some(chk({shifter:'sft-gx-m', derailleur:'dr-xt'}).errors, 'Drivetrain mismatch');
});
test('Transmission derailleur needs a UDH frame', function(){
  some(chk({frame:'fr-strive', derailleur:'dr-gx-t'}).errors, 'UDH');
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
  some(chk({frame:'fr-megatower', shock:'sh-genie-oem'}).errors, 'OEM');
});
test('package-only frame + a different (but fitting) shock -> warning, not error', function(){
  var r = chk({frame:'fr-enduro', shock:'sh-floatx-60'});
  eq(r.errors.length, 0); some(r.warnings, 'package-only');
});
test('over-travel fork (180 on a 170-rated frame) -> warning', function(){
  some(chk({frame:'fr-strive', fork:'fk-38-180'}).warnings, 'Fork travel');
});
