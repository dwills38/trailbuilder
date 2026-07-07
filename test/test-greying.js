'use strict';
/* DOT / CONFLICT PREDICATE — the compatibility dot the catalog shows
   (g = no conflicts, w = fits but adds a warning, r = won't fit,
   n = nothing selected yet). */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
/** @param {Object.<string, string>} buildMap @param {string} id */
var stateOf = function(buildMap, id){ return C.compatOf(part(id), B(buildMap)).state; };

test('empty build -> neutral dots', function(){
  eq(C.compatOf(part('sh-rockshox-super-deluxe-ultimate-230x65'), {}).state, 'n');
});
test('Megatower: a fitting shock is green', function(){
  eq(stateOf({frame:'fr-santacruz-megatower-cc'}, 'sh-rockshox-super-deluxe-ultimate-230x62p5'), 'g');
});
test('Megatower: a trunnion shock is red', function(){
  eq(stateOf({frame:'fr-santacruz-megatower-cc'}, 'sh-rockshox-super-deluxe-205x65-trun'), 'r');
});
test('Megatower: a longer-stroke shock is red', function(){
  eq(stateOf({frame:'fr-santacruz-megatower-cc'}, 'sh-rockshox-super-deluxe-ultimate-230x65'), 'r');
});
test('Megatower: a shorter-stroke same-eye shock is YELLOW - bolts in with less travel (REVIEW #8)', function(){
  var c = C.compatOf(part('sh-fox-float-x-230x60'), B({frame:'fr-santacruz-megatower-cc'}));
  eq(c.state, 'w'); some([c.reason], 'Shorter-stroke');
});
test('Enduro: a fitting non-package shock is YELLOW (package-only warning), not green', function(){
  // The Enduro is sold frame+shock only; a different (fitting) shock raises the
  // rule-17 package-only WARNING. Pre-REVIEW-#6 the dot ignored warnings and
  // showed this as a clean green fit.
  var c = C.compatOf(part('sh-rockshox-super-deluxe-ultimate-205x60-trun'), B({frame:'fr-specialized-enduro-sworks'}));
  eq(c.state, 'w'); some([c.reason], 'package-only');
});
test('Enduro: its own OEM shock is green', function(){
  eq(stateOf({frame:'fr-specialized-enduro-sworks'}, 'sh-rockshox-vivid-ultimate-oem-205x60-trun'), 'g');
});
test('Enduro: a wrong-size shock is red', function(){
  eq(stateOf({frame:'fr-specialized-enduro-sworks'}, 'sh-rockshox-super-deluxe-ultimate-230x65'), 'r');
});
test('shared-cat rotor that fits front OR rear -> green', function(){
  eq(stateOf({frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-dtswiss-ex-1700-29'}, 'ro-shimano-rtmt800-203-cl'), 'g');
});
test('Center Lock rotor with two 6-bolt wheels -> red', function(){
  eq(stateOf({frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29'}, 'ro-shimano-rtmt800-203-cl'), 'r');
});
test('6-bolt rotor with two Center Lock wheels -> YELLOW (adapter direction, REVIEW #10)', function(){
  var c = C.compatOf(part('ro-sram-hs2-200-6b'), B({frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-ex-1700-29'}));
  eq(c.state, 'w'); some([c.reason], 'adapter');
});
test('OEM shock with no frame picked -> green dot + info, not red (REVIEW #17)', function(){
  eq(stateOf({fork:'fk-rockshox-zeb-ultimate-29-170'}, 'sh-rockshox-vivid-ultimate-oem-205x60-trun'), 'g');
});
test('groupset preset red on a non-UDH frame', function(){
  eq(stateOf({frame:'fr-kona-process-153'}, 'gs-sram-gx-transmission'), 'r');
});
test('groupset preset green on a UDH frame', function(){
  eq(stateOf({frame:'fr-santacruz-megatower-cc'}, 'gs-sram-gx-transmission'), 'g');
});
test('a red dot carries an explanatory reason', function(){
  var c = C.compatOf(part('sh-rockshox-super-deluxe-205x65-trun'), B({frame:'fr-santacruz-megatower-cc'}));
  eq(c.state, 'r'); some([c.reason], 'Shock');
});
/* REVIEW.md #4 — the preset path must clear the slots it fills BEFORE computing
   the baseline, or a pre-existing byte-identical error string masks the preset's
   own conflict. This fired at the worst moment: the user's wheel doesn't fit,
   they browse wheelset kits to fix it, and every incompatible kit showed green. */
test('preset dot: incompatible wheelset is RED even when the same error already exists', function(){
  // The Firebird frame is SuperBoost 157; the Boost DT rear wheel already in the
  // build raises the byte-identical rear-axle error the Boost Reserve kit would add.
  var c = C.compatOf(part('ws-reserve-30-hd-29'), B({frame:'fr-pivot-firebird', rearWheel:'rw-dtswiss-ex-1700-29'}));
  eq(c.state, 'r'); some([c.reason], 'Rear axle');
});
test('preset dot: masking via a KEPT part (XD cassette + MicroSpline kit) is also red', function(){
  // Here the pre-existing freehub error comes from the cassette x the OLD wheel;
  // the preset's own wheels re-create it byte-identically (string names only the
  // cassette), so the un-cleared baseline filtered it as "not new".
  eq(C.compatOf(part('ws-industrynine-enduro-s-29'), B({cassette:'ca-sram-xg1275', rearWheel:'rw-crankbrothers-synthesis-enduro-29'})).state, 'r');
});
test('preset dot: a kit that REPLACES the offending part and fixes the conflict is green', function(){
  // MicroSpline cassette vs XD wheel -> freehub error; the MicroSpline I9 kit
  // resolves it. The cleared baseline must not count the old wheel's error
  // against the preset.
  eq(C.compatOf(part('ws-industrynine-enduro-s-29'), B({frame:'fr-santacruz-megatower-cc', cassette:'ca-shimano-xt-m8100-1051', rearWheel:'rw-reserve-30-hd-29'})).state, 'g');
});
test('REVIEW #13 regression: a 29in REAR tire on a mullet-only frame is a new conflict, even though the 29in rear wheel already raised the byte-identical message', function(){
  // With string identity this was masked (same "Unsupported wheel setup" text
  // before and after); verdictKey includes the slots involved, so the tire's
  // participation makes it a distinct conflict.
  var bld = B({frame:'fr-commencal-meta-sx-v5', rearWheel:'rw-dtswiss-ex-1700-29'});
  var r = C.conflictReason(part('ti-maxxis-assegai-29-25-exop-mg'), 'rearTire', bld);
  ok(r !== null, 'rear placement must surface the conflict');
  some([r], 'Unsupported wheel setup');
});
/* REVIEW.md #6 — the dot layer used to diff ERRORS only, so every warning-class
   rule (over-max rotor, over-travel fork, shifter clamp...) rendered as a green
   "fits" at pick time. A part/preset that adds a new warning (but no error) now
   dots YELLOW with the warning as its reason. */
test('oversize rotor (220 vs 203-max fork AND frame) is YELLOW at pick time, not green', function(){
  // Both rotor slots must be constrained: with only a fork, the rear placement
  // is unconstrained and the dot legitimately reports that clean best placement.
  var c = C.compatOf(part('ro-sram-hs2-220-6b'), B({fork:'fk-manitou-mezzer-pro-29-170', frame:'fr-yeti-sb160'}));
  eq(c.state, 'w'); some([c.reason], 'exceeds the fork max');
});
test('over-travel fork (180 on a 170-rated frame) is YELLOW at pick time', function(){
  var c = C.compatOf(part('fk-fox-38-factory-29-180'), B({frame:'fr-canyon-strive-cfr'}));
  eq(c.state, 'w'); some([c.reason], 'Fork travel');
});
test('lever-integrated shifter with mismatched brake levers is YELLOW at pick time', function(){
  var c = C.compatOf(part('sft-shimano-xt-m8100'), B({frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc'}));
  eq(c.state, 'w'); some([c.reason], 'Shifter mount');
});
test('preset dot: a kit that adds a new warning (no error) is YELLOW', function(){
  // XT brakeset carries 203mm rotors; the Lyrik's max is 200 -> rotor-max warning.
  var c = C.compatOf(part('bs-shimano-xt-m8120'), B({fork:'fk-rockshox-lyrik-ultimate-29-160'}));
  eq(c.state, 'w'); some([c.reason], 'exceeds the fork max');
});
test('a pre-existing warning does not turn an unrelated part yellow', function(){
  // Build already warns (over-travel fork); a fitting shock adds nothing new.
  eq(stateOf({frame:'fr-canyon-strive-cfr', fork:'fk-fox-38-factory-29-180'}, 'sh-rockshox-vivid-ultimate-230x65'), 'g');
});
test('REVIEW #9: a smaller (shimable) dropper is YELLOW; a bigger one stays red', function(){
  var c = C.compatOf(part('dp-pnw-loam-309-175'), B({frame:'fr-santacruz-megatower-cc'}));   // 30.9 in 31.6
  eq(c.state, 'w'); some([c.reason], 'shim');
  eq(stateOf({frame:'fr-canyon-strive-cfr'}, 'dp-oneup-v3-316-210'), 'r');                   // 31.6 in 30.9
});
test('REVIEW #7: on a mullet frame + SRAM cassette, the XD 27.5 rear wheel is green (the MicroSpline one stays honestly red)', function(){
  var bld = {frame:'fr-commencal-meta-sx-v5', cassette:'ca-sram-xs1275'};
  eq(stateOf(bld, 'rw-dtswiss-e-1900-275-xd'), 'g');
  eq(stateOf(bld, 'rw-dtswiss-e-1900-275'), 'r');   // freehub mismatch is real for THIS config
});
test('a preset that swaps one conflict for another is RED, not green', function(){
  // Base build has a drivetrain-system mismatch (SRAM shifter + Shimano derailleur).
  // Applying the SRAM Eagle groupset fixes that mismatch but its XD cassette clashes
  // with the MicroSpline rear wheel -> a NEW conflict. Error COUNT is unchanged, so a
  // count-based dot would wrongly show green; the honest verdict is red.
  var bld = B({ rearWheel:'rw-industrynine-enduro-s-29', shifter:'sft-sram-gx-eagle', derailleur:'dr-shimano-xt-m8100-sgs' });
  var c = C.compatOf(part('gs-sram-gx-eagle'), bld);
  eq(c.state, 'r'); some([c.reason], 'Freehub');
});
