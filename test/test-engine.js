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
  some(chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-275-170'}).errors, 'wheel');
});
test('mullet (29 front + 27.5 rear) is allowed on a mullet-capable frame', function(){
  eq(chk({frame:'fr-yt-capra-core4', fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-dtswiss-e-1900-275', frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt'}).errors.length, 0);
});
test('mullet is rejected on a 29-only frame', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-dtswiss-e-1900-275', frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt'}).errors, 'Unsupported wheel setup');
});

/* Rule 1 frameless guard (REVIEW.md #18): a reverse mullet satisfies no
   config in the model or reality, even before a frame is picked. */
test('frameless reverse-mullet (27.5 front / 29 rear) -> error', function(){
  some(chk({fork:'fk-rockshox-zeb-ultimate-275-170', rearWheel:'rw-dtswiss-ex-1700-29'}).errors, 'matches no configuration');
});
test('frameless legit mullet-in-progress (29 front / 27.5 rear) stays silent', function(){
  eq(chk({fork:'fk-rockshox-zeb-ultimate-29-170', rearWheel:'rw-dtswiss-e-1900-275'}).errors.length, 0);
});
test('frameless matching pair (29/29) stays silent', function(){
  eq(chk({fork:'fk-rockshox-zeb-ultimate-29-170', rearWheel:'rw-dtswiss-ex-1700-29'}).errors.length, 0);
});
test('SuperBoost frame + Boost rear wheel -> rear axle error', function(){
  some(chk({frame:'fr-pivot-firebird', rearWheel:'rw-reserve-30-hd-29'}).errors, 'Rear axle');
});
test('SuperBoost frame + SuperBoost wheel -> ok', function(){
  eq(chk({frame:'fr-pivot-firebird', rearWheel:'rw-industrynine-enduro-s-29-157'}).errors.length, 0);
});
test('Shimano cassette on XD wheel -> freehub error', function(){
  some(chk({cassette:'ca-shimano-xt-m8100-1051', rearWheel:'rw-roval-traverse-hd-29'}).errors, 'Freehub');
});
test('SRAM shifter + Shimano derailleur -> system mismatch', function(){
  some(chk({shifter:'sft-sram-gx-eagle', derailleur:'dr-shimano-xt-m8100-sgs'}).errors, 'Drivetrain mismatch');
});

/* Rule 3b — actuation (REVIEW.md #1). Cable vs wireless share system:'sram-eagle',
   so before the actuation field this pairing passed totally clean. */
test('mechanical trigger + AXS (wireless) derailleur, same system -> actuation error', function(){
  some(chk({shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle-axs'}).errors, 'Actuation mismatch');
});
test('AXS controller + mechanical derailleur -> actuation error (reverse direction)', function(){
  some(chk({shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-eagle'}).errors, 'Actuation mismatch');
});
test('AXS Eagle drivetrain sharing Eagle cassette/chain stays clean (no system-vocab split)', function(){
  eq(chk({shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-eagle-axs', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle'}).errors.length, 0);
});

/* Rule 3c — T-Type chainring (REVIEW.md #2). SRAM-documented hard incompatibility,
   one-directional: Flattop chain needs a T-Type ring; T-Type ring runs Eagle chains fine. */
test('Transmission Flattop chain + non-T-Type crank -> chainring error', function(){
  some(chk({chain:'ch-sram-gx-flattop', crankset:'cr-shimano-xt-m8100'}).errors, 'Chainring mismatch');
});
test('Transmission Flattop chain + T-Type crank -> clean', function(){
  eq(chk({chain:'ch-sram-gx-flattop', crankset:'cr-sram-x0-transmission'}).errors.length, 0);
});
test('T-Type crank + Eagle chain -> clean (backward-compatible per SRAM, no reverse error)', function(){
  eq(chk({chain:'ch-sram-gx-eagle', crankset:'cr-sram-x0-transmission'}).errors.length, 0);
});
test('armset-only crank (ringStd null) + Flattop chain -> info, not a false red', function(){
  // eeWings ship without a ring; current 8-bolt arms pair with SRAM T-Type
  // rings (canecreek.com), so erroring them was a false "won't fit" (REVIEW.md
  // / DATA-MODEL-REVIEW 5.1-6 - the fabricated ringStd made this fire).
  var r = chk({chain:'ch-sram-gx-flattop', crankset:'cr-canecreek-eewings-allmountain'});
  eq(r.errors.length, 0);
  some(r.infos, 'sold without a chainring');
});
test('Transmission derailleur needs a UDH frame', function(){
  some(chk({frame:'fr-kona-process-153', derailleur:'dr-sram-gx-transmission'}).errors, 'UDH');
});
test('Transmission derailleur is fine on a UDH frame', function(){
  eq(chk({frame:'fr-santacruz-megatower-cc', derailleur:'dr-sram-gx-transmission'}).errors.length, 0);
});
test('cassette bigger than derailleur capacity -> error', function(){
  some(chk({cassette:'ca-sram-xg1275', derailleur:'dr-shimano-xt-m8100-sgs'}).errors, 'Cassette too big');
});
test('Center Lock rotor on a 6-bolt front hub -> interface error', function(){
  some(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-reserve-30-hd-29', frontRotor:'ro-shimano-rtmt800-203-cl'}).errors, 'rotor interface');
});

/* Rule 9 direction (REVIEW.md #10): 6-bolt-on-Center-Lock is an everyday
   adapter fix (Shimano SM-RTAD05, one-piece rotors); the reverse has no
   adapter. The adapter rides on the verdict as the first structured `fix`. */
test('6-bolt rotor on a Center Lock hub -> adapter warning with a structured fix, not a red', function(){
  var r = chk({frontWheel:'fw-dtswiss-ex-1700-29', frontRotor:'ro-sram-hs2-200-6b'});
  eq(r.errors.length, 0);
  some(r.warnings, 'Center Lock adapter');
  var w = r.warnings.filter(function(v){ return v.ruleId === 'front-rotor-interface'; })[0];
  eq(w && w.fix && w.fix.kind, 'adapter');
  eq(w && w.fix && w.fix.name, 'Shimano SM-RTAD05');
});
test('6-bolt rotor on a Center Lock REAR hub -> same adapter warning', function(){
  var r = chk({rearWheel:'rw-dtswiss-e-1900-275', rearRotor:'ro-sram-hs2-200-6b'});
  eq(r.errors.length, 0); some(r.warnings, 'Center Lock adapter');
});

/* Rule 10 minimum (REVIEW.md #3). The ZEB/Domain have a 200mm-native post mount
   (sram.com); adapters only space the caliper UP, so a 180 rotor is unmountable. */
test('180mm rotor on a ZEB (200mm minimum) -> error, not silence', function(){
  some(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontRotor:'ro-sram-hs2-180-6b'}).errors, 'rotor too small');
});
test('200mm rotor on a ZEB meets the minimum -> clean', function(){
  eq(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontRotor:'ro-sram-hs2-200-6b'}).errors.length, 0);
});
test('min-rotor rule stays dormant on forks without a sourced minRotorF', function(){
  eq(chk({fork:'fk-fox-36-factory-29-160', frontRotor:'ro-sram-hs2-180-6b'}).errors.length, 0);
});
test('bar/stem clamp mismatch (35 vs 31.8) -> error', function(){
  some(chk({handlebar:'hb-pnw-range-318', stem:'st-renthal-apex-35'}).errors, 'clamp');
});

/* Rule 19 — shifter mounting vs brake lever integration (REVIEW.md #5). The
   I-Spec EV XT shifter has no bar clamp of its own; on MatchMaker (SRAM) levers
   it attaches to nothing as specced. Warning (band SKUs / adapters exist). */
test('I-Spec EV shifter + MatchMaker (SRAM) brakes -> mount warning, not silence', function(){
  var r = chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc'});
  eq(r.errors.length, 0); some(r.warnings, 'Shifter mount');
});
test('I-Spec EV shifter + I-Spec EV brakes -> silent', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120'}).warnings.length, 0);
});
test('one matching lever is enough (mixed brakes) -> silent', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-sram-code-rsc', rearBrake:'bk-shimano-xt-m8120'}).warnings.length, 0);
});
test('I-Spec EV shifter + I-Spec B levers (Saint) -> mount warning (generations do not mate)', function(){
  var r = chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-shimano-saint-m820', rearBrake:'bk-shimano-saint-m820'});
  eq(r.errors.length, 0); some(r.warnings, 'Shifter mount');
});
test('I-Spec EV shifter + Hayes Dominion (multi-standard Peacemaker clamp) -> silent', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-hayes-dominion-a4', rearBrake:'bk-hayes-dominion-a4'}).warnings.length, 0);
});
test('shifter-mount rule stays dormant when the brakes are untagged', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-hope-tech-4-v4', rearBrake:'bk-hope-tech-4-v4'}).warnings.length, 0);
});
test('AXS pod shifter (own clamp) never triggers the mount warning', function(){
  eq(chk({shifter:'sft-sram-gx-transmission', frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc'}).warnings.length, 0);
});
/* Rule 16 hardtail guard — no catalog hardtail exists yet (the suspension
   discriminator UNBLOCKS entering them), so these drive it with a synthetic
   one, exactly like the dormant rule-18 tests below. */
/** @returns {FramePart} */
function hardtail(){
  var f = /** @type {any} */ (Object.assign({}, part('fr-raaw-madonna-v3')));
  delete f.shockEye; delete f.shockStroke; delete f.shockMount; delete f.travel; delete f.bundledShock;
  f.suspension = 'hardtail';
  return /** @type {FramePart} */ (f);
}
test('hardtail frame + a shock -> one clean hardtail error, never "undefinedxundefined"', function(){
  var bld = B({shock:'sh-rockshox-super-deluxe-ultimate-230x65'});
  bld.frame = hardtail();
  var r = C.checkBuild(bld);
  some(r.errors, 'Hardtail');
  eq(r.errors.filter(function(e){ return String(e).indexOf('undefined') >= 0; }).length, 0, 'no undefined leaked');
});
test('hardtail frame without a shock -> silent (no shock-fit noise)', function(){
  /** @type {import('../src/types.js').Build} */ var bld = {};
  bld.frame = hardtail();
  eq(C.checkBuild(bld).errors.length, 0);
});
/* Rule 13 direction (REVIEW.md #9): bigger post in a smaller tube = physically
   impossible; smaller post in a bigger tube = everyday reducing-shim build. */
test('dropper bigger than the seat tube -> error (impossible direction)', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-oneup-v3-349-210'}).errors, 'Dropper too big');
});
test('smaller dropper in a bigger seat tube -> shim warning, not a false red', function(){
  var r = chk({frame:'fr-specialized-enduro-sworks', dropper:'dp-oneup-v3-316-210'});
  eq(r.errors.length, 0); some(r.warnings, 'reducing shim');
});
test('exact-diameter dropper -> silent', function(){
  var r = chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-oneup-v3-316-210'});
  eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('trunnion shock on a standard-mount frame -> mount error', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-super-deluxe-205x65-trun'}).errors, 'mount');
});

/* Rule 16 stroke direction (REVIEW.md #8). Fit is set by eye-to-eye + mount;
   makers sell the same 230 body in 57.5/60/62.5/65 strokes and RockShox
   supports stroke-spacer reduction, so a SHORTER stroke bolts in with less
   travel (warning), while a LONGER stroke can over-rotate the linkage (error). */
test('shorter-stroke shock, matching eye+mount -> quantified warning, not a false red', function(){
  // Megatower runs 230x62.5; the Float X 230x60 gives ~158mm instead of 165mm.
  var r = chk({frame:'fr-santacruz-megatower-cc', shock:'sh-fox-float-x-230x60'});
  eq(r.errors.length, 0); some(r.warnings, '~158mm');
});
test('longer-stroke shock, matching eye -> error (over-rotation direction)', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-vivid-ultimate-230x65'}).errors, 'stroke too long');
});
test('eye-to-eye mismatch stays an error regardless of stroke', function(){
  some(chk({frame:'fr-yt-capra-core4', shock:'sh-rockshox-super-deluxe-ultimate-205x60-trun'}).errors, 'Shock size mismatch');
});
test('OEM shock cannot go on the wrong frame -> error', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-vivid-ultimate-oem-205x60-trun'}).errors, 'OEM');
});
test('OEM shock with NO frame picked -> info, not a red (rule 4 frameless convention, REVIEW.md #17)', function(){
  var r = chk({shock:'sh-rockshox-vivid-ultimate-oem-205x60-trun', fork:'fk-rockshox-zeb-ultimate-29-170'});
  eq(r.errors.length, 0); some(r.infos, 'OEM-only');
});
test('package-only frame + a different (but fitting) shock -> warning, not error', function(){
  var r = chk({frame:'fr-specialized-enduro-sworks', shock:'sh-rockshox-super-deluxe-ultimate-205x60-trun'});
  eq(r.errors.length, 0); some(r.warnings, 'package-only');
});
test('over-travel fork (180 on a 170-rated frame) -> warning', function(){
  some(chk({frame:'fr-canyon-strive-cfr', fork:'fk-fox-38-factory-29-180'}).warnings, 'Fork travel');
});

/* Rule 18 — rear tire vs FRAME clearance. Dormant on the current catalog (no
   frame declares maxTire), so these drive it with a cloned frame that does. */
test('rear tire wider than the frame max -> clearance warning (frame.maxTire set)', function(){
  var bld = B({frame:'fr-raaw-madonna-v22'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, bld.frame, {maxTire:2.5}));
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.6}));
  some(C.checkBuild(bld).warnings, 'frame max');
});
test('rear tire within the frame max -> no clearance warning', function(){
  var bld = B({frame:'fr-raaw-madonna-v22'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, bld.frame, {maxTire:2.6}));
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.5}));
  eq(C.checkBuild(bld).warnings.filter(function(w){ return String(w).indexOf('frame max')>=0; }).length, 0);
});
test('frame clearance rule stays dormant when the frame declares no maxTire', function(){
  var bld = B({frame:'fr-yt-capra-core4'});   // no sourced maxTire on the Capra (yet)
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:3.0}));  // absurdly wide, still silent
  eq(C.checkBuild(bld).warnings.filter(function(w){ return String(w).indexOf('frame max')>=0; }).length, 0);
});
test('frame clearance rule is ACTIVE on sourced frames (Madonna 2.6in + 2.6in tire is fine)', function(){
  var bld = B({frame:'fr-raaw-madonna-v22'});
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.8}));
  some(C.checkBuild(bld).warnings, 'frame max');   // 2.8 > sourced 2.6 -> warns
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.5}));
  eq(C.checkBuild(bld).warnings.filter(function(w){ return String(w).indexOf('frame max')>=0; }).length, 0);
});
