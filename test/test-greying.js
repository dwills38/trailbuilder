'use strict';
/* DOT / CONFLICT PREDICATE — the compatibility dot the catalog shows
   (g = no conflicts, r = won't fit, n = nothing selected yet). */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, some = U.some;
/** @param {Object.<string, string>} buildMap @param {string} id */
var stateOf = function(buildMap, id){ return C.compatOf(part(id), B(buildMap)).state; };

test('empty build -> neutral dots', function(){
  eq(C.compatOf(part('sh-sd-air'), {}).state, 'n');
});
test('Megatower: a fitting shock is green', function(){
  eq(stateOf({frame:'fr-megatower'}, 'sh-sdu-230625'), 'g');
});
test('Megatower: a trunnion shock is red', function(){
  eq(stateOf({frame:'fr-megatower'}, 'sh-sd-trun'), 'r');
});
test('Megatower: a wrong-size shock is red', function(){
  eq(stateOf({frame:'fr-megatower'}, 'sh-floatx-60'), 'r');
});
test('Enduro: a fitting (package) shock stays green', function(){
  eq(stateOf({frame:'fr-enduro'}, 'sh-sdu-2056'), 'g');
});
test('Enduro: its own OEM shock is green', function(){
  eq(stateOf({frame:'fr-enduro'}, 'sh-vivid-oem'), 'g');
});
test('Enduro: a wrong-size shock is red', function(){
  eq(stateOf({frame:'fr-enduro'}, 'sh-sd-air'), 'r');
});
test('shared-cat rotor that fits front OR rear -> green', function(){
  eq(stateOf({frontWheel:'fw-reserve', rearWheel:'rw-dt'}, 'ro-cl-203'), 'g');
});
test('Center Lock rotor with two 6-bolt wheels -> red', function(){
  eq(stateOf({frontWheel:'fw-reserve', rearWheel:'rw-reserve'}, 'ro-cl-203'), 'r');
});
test('groupset preset red on a non-UDH frame', function(){
  eq(stateOf({frame:'fr-process'}, 'gs-gx-t'), 'r');
});
test('groupset preset green on a UDH frame', function(){
  eq(stateOf({frame:'fr-megatower'}, 'gs-gx-t'), 'g');
});
test('a red dot carries an explanatory reason', function(){
  var c = C.compatOf(part('sh-sd-trun'), B({frame:'fr-megatower'}));
  eq(c.state, 'r'); some([c.reason], 'Shock');
});
/* REVIEW.md #4 — the preset path must clear the slots it fills BEFORE computing
   the baseline, or a pre-existing byte-identical error string masks the preset's
   own conflict. This fired at the worst moment: the user's wheel doesn't fit,
   they browse wheelset kits to fix it, and every incompatible kit showed green. */
test('preset dot: incompatible wheelset is RED even when the same error already exists', function(){
  // fr-firebird is SuperBoost 157; the Boost rw-dt already in the build raises the
  // byte-identical rear-axle error that the Boost ws-reserve kit would add.
  var c = C.compatOf(part('ws-reserve'), B({frame:'fr-firebird', rearWheel:'rw-dt'}));
  eq(c.state, 'r'); some([c.reason], 'Rear axle');
});
test('preset dot: masking via a KEPT part (XD cassette + MicroSpline kit) is also red', function(){
  // Here the pre-existing freehub error comes from the cassette x the OLD wheel;
  // the preset's own wheels re-create it byte-identically (string names only the
  // cassette), so the un-cleared baseline filtered it as "not new".
  eq(C.compatOf(part('ws-i9'), B({cassette:'ca-sram-e', rearWheel:'rw-cb'})).state, 'r');
});
test('preset dot: a kit that REPLACES the offending part and fixes the conflict is green', function(){
  // MicroSpline cassette vs XD wheel -> freehub error; the MicroSpline ws-i9 kit
  // resolves it. The cleared baseline must not count the old wheel's error
  // against the preset.
  eq(C.compatOf(part('ws-i9'), B({frame:'fr-megatower', cassette:'ca-xt', rearWheel:'rw-reserve'})).state, 'g');
});
test('a preset that swaps one conflict for another is RED, not green', function(){
  // Base build has a drivetrain-system mismatch (SRAM shifter + Shimano derailleur).
  // Applying the SRAM Eagle groupset fixes that mismatch but its XD cassette clashes
  // with the MicroSpline rear wheel -> a NEW conflict. Error COUNT is unchanged, so a
  // count-based dot would wrongly show green; the honest verdict is red.
  var bld = B({ rearWheel:'rw-i9', shifter:'sft-gx-m', derailleur:'dr-xt' });
  var c = C.compatOf(part('gs-gx-m'), bld);
  eq(c.state, 'r'); some([c.reason], 'Freehub');
});
