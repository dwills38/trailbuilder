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

/* Rule 3 — budget wide-range 1x systems (microSHIFT Advent X/Advent, Box Prime 9,
   Shimano CUES LinkGlide) added 2026-07-09. Each is its OWN cable-pull standard;
   a coherent group is clean, and any cross-brand pairing must be an honest error. */
test('microSHIFT Advent X 10s group (shifter/derailleur/cassette/chain) -> clean', function(){
  eq(chk({shifter:'sft-microshift-advent-x-m9605', derailleur:'dr-microshift-advent-x-m6205', cassette:'ca-microshift-advent-x-h104-1148', chain:'ch-kmc-x10'}).errors.length, 0);
});
test('microSHIFT Advent 9s group -> clean', function(){
  eq(chk({shifter:'sft-microshift-advent-m9295', derailleur:'dr-microshift-advent-m6195l', cassette:'ca-microshift-advent-h093-1146', chain:'ch-kmc-x9'}).errors.length, 0);
});
test('Box Prime 9 group (Box One shifter + Box Three mech/cassette/chain, one system) -> clean', function(){
  eq(chk({shifter:'sft-box-one-prime-9', derailleur:'dr-box-three-prime-9', cassette:'ca-box-three-prime-9-1150', chain:'ch-box-three-prime-9-126'}).errors.length, 0);
});
test('Shimano CUES LinkGlide 11s group -> clean', function(){
  eq(chk({shifter:'sft-shimano-cues-u6000-11', derailleur:'dr-shimano-cues-u6000-11-gs', cassette:'ca-shimano-cues-lg700-1150', chain:'ch-shimano-cues-lg500'}).errors.length, 0);
});
test('microSHIFT shifter + Box Prime 9 derailleur (both 9s, different pull) -> system mismatch', function(){
  some(chk({shifter:'sft-microshift-advent-m9295', derailleur:'dr-box-three-prime-9'}).errors, 'Drivetrain mismatch');
});
test('microSHIFT Advent X shifter + Shimano 12s derailleur -> system mismatch (not a false green)', function(){
  some(chk({shifter:'sft-microshift-advent-x-m9605', derailleur:'dr-shimano-xt-m8100-sgs'}).errors, 'Drivetrain mismatch');
});
test('Box Prime 9 cassette on a Shimano MicroSpline wheel -> freehub error (HG cassette)', function(){
  some(chk({cassette:'ca-box-three-prime-9-1150', rearWheel:'rw-industrynine-enduro-s-29'}).errors, 'Freehub');
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

/* Dormant sourced-data rules (REVIEW.md #14/#21/#22) - no catalog part carries
   the fields yet, so each is driven synthetically (the rule-18 template) and
   proven dormant on real parts. */
test('under-forking warns when the frame declares a sourced minForkTravel', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-propain-spindrift-cf'), {minForkTravel:170}));
  some(C.checkBuild(bld).warnings, 'Under-forked');
});
test('under-forking stays dormant without minForkTravel (high-pivot frames would false-fire on a heuristic)', function(){
  // Dreadnought: 154mm travel, commonly forked at 170+ - a 160 fork must stay silent.
  eq(chk({frame:'fr-forbidden-dreadnought', fork:'fk-fox-36-factory-29-160'}).warnings.length, 0);
});
test('coil shock warns when the frame is maker-stated NOT coil-compatible', function(){
  var bld = B({shock:'sh-ext-storia-v3-230x65'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-yt-capra-core4'), {coilApproved:false}));
  some(C.checkBuild(bld).warnings, 'not coil-compatible');
});
test('air shock stays silent on a not-coil-compatible frame; coil stays silent when approval is unknown', function(){
  var bld = B({shock:'sh-rockshox-super-deluxe-ultimate-230x65'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-yt-capra-core4'), {coilApproved:false}));
  eq(C.checkBuild(bld).warnings.length, 0);
  eq(chk({frame:'fr-yt-capra-core4', shock:'sh-ext-storia-v3-230x65'}).warnings.length, 0);   // no field -> dormant
});
test('front tire wider than the fork chassis max -> warning (fork.maxTire set)', function(){
  var bld = B({frontTire:'ti-maxxis-assegai-29-25-exop-mg'});
  bld.fork = /** @type {import('../src/types.js').ForkPart} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {maxTire:2.4}));
  some(C.checkBuild(bld).warnings, 'chassis max');
});
test('fork tire clearance stays dormant without a sourced fork.maxTire', function(){
  eq(chk({fork:'fk-fox-36-factory-29-160', frontTire:'ti-maxxis-assegai-29-25-exop-mg'}).warnings.length, 0);
});

/* REVIEW.md #23 near-term tier: no frame-size concept yet, so a long-drop post
   gets an INFO nudge toward the maker's insertion calculator - never a verdict. */
test('long-drop dropper (>=200mm) with a frame -> insertion info, zero errors/warnings', function(){
  var r = chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-oneup-v3-316-210'});
  eq(r.errors.length, 0); eq(r.warnings.length, 0);
  some(r.infos, 'insertion');
});
test('short-drop dropper -> no insertion info', function(){
  eq(chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-rockshox-reverb-axs-316-170'}).infos.filter(function(i){ return String(i).indexOf('insertion')>=0; }).length, 0);
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

/* REVIEW.md #16: with the verified Big Betty 29x2.6 in the catalog, rules 14
   and 18 are finally triggerable by REAL part combinations - these pin that
   they can actually fire outside synthetic probes. */
test('REVIEW #16: rule 14 fires with real parts (2.6in tire on a 2.5in-max rim)', function(){
  some(chk({frontTire:'ti-schwalbe-big-betty-29-26-sg-as', frontWheel:'fw-dtswiss-ex-1700-29'}).warnings, 'wider than the front wheel');
});
test('REVIEW #16: rule 18 fires with real parts (2.6in rear tire vs the Slash 2.5in frame max)', function(){
  some(chk({frame:'fr-trek-slash', rearTire:'ti-schwalbe-big-betty-29-26-sg-as', rearWheel:'rw-reserve-30-hd-29'}).warnings, 'frame max');
});
test('REVIEW #16: the 2.6in tire is fine on 2.6in-clearance parts (no false warning)', function(){
  var r = chk({frame:'fr-raaw-madonna-v3', rearTire:'ti-schwalbe-big-betty-29-26-sg-as', rearWheel:'rw-reserve-30-hd-29'});
  eq(r.warnings.length, 0);
});

/* REVIEW.md #15: rules 2-front/8/11 are dead code TODAY - every catalog part
   is Boost110/PM/tapered and the validator rejects anything else, so no
   constructible build can fire them. The single-valued vocabs are deliberate
   (they widen only when a real part needs it), but the checks must stay
   correct for that day - synthetic probes pin each one. */
test('front-axle check fires on a synthetic non-Boost fork (dead rule pinned)', function(){
  var bld = B({frontWheel:'fw-reserve-30-hd-29'});
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {axle:'20x110'}));
  some(C.checkBuild(bld).errors, 'Front axle mismatch');
});
test('brake-mount checks fire on synthetic flat-mount brakes (dead rule pinned)', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160', frame:'fr-santacruz-megatower-cc'});
  bld.frontBrake = /** @type {any} */ (Object.assign({}, part('bk-sram-code-rsc'), {mount:'FM'}));
  bld.rearBrake = /** @type {any} */ (Object.assign({}, part('bk-sram-code-rsc'), {mount:'FM'}));
  var r = C.checkBuild(bld);
  some(r.errors, 'Front brake mount mismatch');
  some(r.errors, 'Rear brake mount mismatch');
});
test('steerer check fires on a synthetic straight-steerer fork (dead rule pinned)', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc'});
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {steerer:'straight'}));
  some(C.checkBuild(bld).errors, 'Steerer mismatch');
});
test('a dual-crown (straight-dc) fork on a tapered frame fires rule 11', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc'});   // headset: tapered
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {steerer:'straight-dc'}));
  some(C.checkBuild(bld).errors, 'Steerer mismatch');
});
test('a tapered fork on a straight-dc (DH) frame fires rule 11 the other way', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160'});     // steerer: tapered
  bld.frame = /** @type {any} */ (Object.assign({}, part('fr-santacruz-megatower-cc'), {headset:'straight-dc'}));
  some(C.checkBuild(bld).errors, 'Steerer mismatch');
});
test('rule 3 rejects mixing a 7-speed DH shifter with a 12-speed derailleur', function(){
  var bld = B({derailleur:'dr-sram-gx-eagle'});   // sram-eagle 12s
  bld.shifter = /** @type {any} */ (Object.assign({}, part('sft-sram-gx-eagle'), {system:'sram-dh-7', speeds:7}));
  var r = C.checkBuild(bld);
  some(r.errors, 'system', 'mixing sram-dh-7 with sram-eagle must error');
});
test('a matched straight-dc pair (dual-crown fork on a DH frame) is silent on rule 11', function(){
  var bld = /** @type {any} */ ({
    frame: Object.assign({}, part('fr-santacruz-megatower-cc'), {headset:'straight-dc'}),
    fork:  Object.assign({}, part('fk-fox-36-factory-29-160'), {steerer:'straight-dc'})
  });
  var msgs = C.checkBuild(bld).errors.map(String).filter(function(m){ return m.indexOf('Steerer')>=0; });
  eq(msgs.length, 0, 'no steerer error for a matched dual-crown pair');
});

/* REVIEW.md 5b/#27: the SuperBoost-frame + Boost-crank NON-rule is deliberate
   and verified correct (commonly ridden; a naive chainline rule would be a
   false red - see the coverage roadmap's documented rejection). This pin stops
   a future session from "helpfully" adding it. chainline is display-only bait. */
test('SuperBoost frame + Boost-chainline crank stays clean (deliberate non-rule, pinned)', function(){
  eq(chk({frame:'fr-pivot-firebird', crankset:'cr-sram-gx-eagle'}).errors.length, 0);
});

/* Build-your-own-wheel (fronthub/rearhub/rim): effectiveWheel() must make a
   hub+rim pair behave IDENTICALLY to the complete wheel it mirrors, for every
   rule that reads front/rear wheel fields. The DT Swiss EX 1700 platform pins
   this - fh-dtswiss-350-boost110 + rm-dtswiss-ex511-29 carry the exact same
   hub/rotorMount/wheel/intWidth/maxTire as fw-dtswiss-ex-1700-29, and likewise
   for the rear hub + rim vs rw-dtswiss-ex-1700-29. */
test('hub+rim vs complete wheel: identical verdicts on a clean build', function(){
  var combined = chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170',
    frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-ex-1700-29',
    cassette:'ca-sram-xg1275'});
  var split = chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170',
    frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29',
    rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29',
    cassette:'ca-sram-xg1275'});
  eq(split.errors.length, combined.errors.length, 'same error count');
  eq(split.warnings.length, combined.warnings.length, 'same warning count');
  eq(combined.errors.length, 0, 'sanity: the combined build itself is clean');
});
test('hub+rim: wheel-size rule fires the same way as the complete wheel (29-only frame + 27.5 rim)', function(){
  var viaWheel = chk({frame:'fr-santacruz-megatower-cc', frontWheel:'fw-dtswiss-e-1900-275'});
  var bld = B({frame:'fr-santacruz-megatower-cc', frontHub:'fh-dtswiss-350-boost110'});
  bld.frontRim = /** @type {any} */ (Object.assign({}, part('rm-dtswiss-ex511-29'), {wheel:'275'}));
  var viaHubRim = C.checkBuild(bld);
  some(viaWheel.errors, 'wheel');
  some(viaHubRim.errors, 'wheel');
  eq(viaHubRim.errors.length, viaWheel.errors.length, 'hub+rim raises the same wheel-size error as the complete wheel');
});
test('hub+rim: front axle mismatch fires via the hub (fork vs fronthub.hub)', function(){
  var bld = B({frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29'});
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {axle:'20x110'}));
  some(C.checkBuild(bld).errors, 'Front axle');
});
test('hub+rim: rear axle mismatch fires via the hub (frame vs rearhub.hub)', function(){
  some(chk({frame:'fr-pivot-firebird', rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29'}).errors, 'Rear axle');
});
test('hub+rim: freehub mismatch fires via the rear hub (cassette vs rearhub.freehub)', function(){
  some(chk({cassette:'ca-shimano-xt-m8100-1051', rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29'}).errors, 'Freehub');
});
test('hub+rim: rotor interface fires via the hub (Center Lock rotor vs the fronthub\'s 6-bolt rotorMount)', function(){
  some(chk({frontRotor:'ro-shimano-rtmt800-203-cl', frontHub:'fh-hope-pro5-boost110', frontRim:'rm-hope-fortus30-29'}).errors, 'rotor interface');
});
test('hub+rim: tire clearance fires via the rim (tire.width vs rim.maxTire)', function(){
  some(chk({frontTire:'ti-schwalbe-big-betty-29-26-sg-as', frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29'}).warnings, 'wider than the front wheel');
});
test('hub+rim: a half-filled side (hub only, no rim) is treated as no wheel yet, not a false green', function(){
  var r = chk({frame:'fr-santacruz-megatower-cc', frontHub:'fh-dtswiss-350-boost110'});
  eq(r.errors.length, 0, 'no wheel-size verdict should fire on an incomplete pair');
});
test('mutual completeness: wheelPositionFilled treats hub+rim as satisfying the frontWheel/rearWheel position', function(){
  var bld = B({frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29'});
  eq(C.wheelPositionFilled(bld, 'frontWheel'), true);
  eq(C.wheelPositionFilled(B({frontHub:'fh-dtswiss-350-boost110'}), 'frontWheel'), false, 'hub alone is not enough');
  eq(C.wheelPositionFilled(B({frontWheel:'fw-dtswiss-ex-1700-29'}), 'frontWheel'), true, 'the complete wheel still satisfies it directly');
  eq(C.wheelPositionFilled({}, 'shock'), false, 'a slot with no alternates just reduces to !!build[key]');
});
