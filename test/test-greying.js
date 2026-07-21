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
test('XDR rear wheel with an XD cassette picked -> YELLOW (rule 6c spacer direction), no longer red', function(){
  // Pre-6c the exact-match freehub error dotted the two verified WTB CZR i30
  // XDR rears red against every cataloged cassette (bias-audit 2026-07-12 #2).
  var c = C.compatOf(part('rw-wtb-czr-i30-29-xdr'), B({cassette:'ca-sram-xg1275'}));
  eq(c.state, 'w'); some([c.reason], '1.85mm spacer');
});
test('XDR rear wheel with a MicroSpline cassette picked stays RED (spacer path is XD-only)', function(){
  eq(stateOf({cassette:'ca-shimano-xt-m8100-1051'}, 'rw-wtb-czr-i30-29-xdr'), 'r');
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
  var c = C.compatOf(part('ro-sram-hs2-220-6b'), B({fork:'fk-marzocchi-bomber-z1-29-160', frame:'fr-yeti-sb160'}));
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
  // XT brakeset carries 203mm rotors; the Neuron CF's rear max is 180 -> a genuine
  // 23mm-over rotor-max warning (NOT the Meta SX V5's 200 max - that 3mm gap is the
  // SRAM-200/Shimano-203 same-class case the rotor-class tolerance now waves through).
  var c = C.compatOf(part('bs-shimano-xt-m8120'), B({frame:'fr-canyon-neuron-cf'}));
  eq(c.state, 'w'); some([c.reason], 'exceeds the frame max');
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
/* Rule 6b dots (integrated-cassette wheels): before the 2026-07-10 correction
   the LG1r rows carried freehub:XD/HG, so the first pairing below dotted a
   FALSE GREEN - the built-in-cassette wheel physically takes no cassette. */
test('rule 6b dot: every cassette previews RED once an integrated-cassette wheel is picked', function(){
  eq(stateOf({rearWheel:'rw-ethirteen-lg1r-29-150-xd'}, 'ca-sram-xg1275'), 'r');   // the killed false green (XD-on-"XD")
  eq(stateOf({rearWheel:'rw-ethirteen-lg1r-275-150-hg'}, 'ca-sram-pg1230'), 'r');  // and on the ex-HG duplicate row
});
test('rule 6b dot: the integrated-cassette wheel previews RED into a build with a cassette picked', function(){
  eq(stateOf({cassette:'ca-sram-xg1275'}, 'rw-ethirteen-lg1r-29-150-xd'), 'r');
});
test('rule 6b dot: the integrated-cassette wheel previews GREEN into a cassette-less build (the info never dots)', function(){
  eq(stateOf({frontWheel:'fw-ethirteen-lg1r-29'}, 'rw-ethirteen-lg1r-29-150-xd'), 'g');
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
/* Rule 20 (headset category) dots: cup mismatch is red where the frame carries
   sourced S.H.I.S. data, matching cups are green, and a frame WITHOUT the data
   keeps every headset green (dormant - a missing rule beats a wrong one). */
test('headset dot: IS-cup headset on a ZS-head-tube frame is red, matching cups green', function(){
  var c = C.compatOf(part('hs-canecreek-40-is41-is52'), B({frame:'fr-giant-reign-advanced'}));
  eq(c.state, 'r'); some([c.reason], 'cup mismatch');
  eq(stateOf({frame:'fr-giant-reign-advanced'}, 'hs-canecreek-40-zs44-zs56'), 'g');
});
test('headset dot: any headset stays green on a frame without sourced head-tube data', function(){
  eq(stateOf({frame:'fr-santacruz-megatower-cc'}, 'hs-canecreek-40-is41-is52'), 'g');
});
test('headset dot: tapered headset is red against a dual-crown (straight) fork', function(){
  eq(stateOf({fork:'fk-rockshox-boxxer-ultimate-29-200'}, 'hs-canecreek-hellbender-70-zs56-zs56'), 'r');
});
/* GX Eagle AXS cassette-picker dots (regression pin, 2026-07-14). A SRAM Eagle
   AXS drivetrain (electronic XD-driver Eagle, hanger-mount - DISTINCT from Eagle
   Transmission/T-Type) takes SRAM Eagle (XG/PG-12xx) cassettes. Picking the GX
   Eagle AXS controller + GX Eagle AXS derailleur must leave those Eagle cassettes
   GREEN at pick time - the exact surface a "no compatible cassettes" report is
   about. The rule-3a AXS exemption + one-system + freehub rules below combine to
   the right answer; these pin the DOT (compatOf), which the checkBuild-level guard
   in test-verdict-audit.js does not cover. Every state here was verified against
   the live engine. */
test('GX Eagle AXS controller + AXS derailleur: matching Eagle cassettes dot GREEN', function(){
  var bld = {shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-eagle-axs'};
  eq(stateOf(bld, 'ca-sram-xg1275'), 'g');   // XG-1275 Eagle 10-52, XD - the natural GX AXS cassette
  eq(stateOf(bld, 'ca-sram-xg1295'), 'g');   // XG-1295 X01 Eagle 10-52, XD
  eq(stateOf(bld, 'ca-sram-pg1230'), 'g');   // PG-1230 NX Eagle 11-50, HG driver
});
test('GX Eagle AXS drivetrain: a Transmission or Shimano cassette honestly stays RED', function(){
  var bld = {shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-eagle-axs'};
  eq(stateOf(bld, 'ca-sram-xs1275'), 'r');            // Transmission (T-Type) cassette - different system
  eq(stateOf(bld, 'ca-shimano-xt-m8100-1051'), 'r');  // Shimano 12 - different system
});
test('AXS cross-compat: an Eagle AXS controller + Transmission derailleur takes Transmission cassettes, not Eagle', function(){
  // SRAM documents that an Eagle AXS controller drives a Transmission derailleur;
  // the cassette must then match the DERAILLEUR (Transmission), so the Eagle cassette
  // is the honest red here and the Transmission one is green.
  var bld = {shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-transmission'};
  eq(stateOf(bld, 'ca-sram-xs1275'), 'g');   // Transmission cassette matches the Transmission mech
  eq(stateOf(bld, 'ca-sram-xg1275'), 'r');   // Eagle cassette does not
});
test('GX Eagle AXS + a MicroSpline rear wheel: the Eagle XD cassette dots RED (freehub, correct)', function(){
  // This is the real-world path to "every cassette looks incompatible": an
  // incompatible rear wheel already in the build. It is an honest freehub red,
  // not an engine fault - the fix is a matching (XD/HG) wheel, not a rule change.
  eq(stateOf({shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-eagle-axs', rearWheel:'rw-industrynine-enduro-s-29'}, 'ca-sram-xg1275'), 'r');
});
