'use strict';
/* VERDICT AUDIT (2026-07-09) — regression cases from tools/VERDICT-AUDIT-2026-07-09.md.
   All tests here are PERMANENT GUARDS — properties that must always hold (curated
   presets are internally compatible; real clashes are always flagged; the engine
   never hands out a silent false "fits"; and Finding 1's native-mount conflation
   stays fixed). These protect the whole catalog as it grows.
     * Finding 1 (forks whose `maxRotorF` held the native post-mount size, not the
       true adapter max) was FIXED on 2026-07-09 — see PERMANENT GUARD 4 below. The
       original TRIP-WIRES that pinned the wrong state were removed when the fix
       landed and replaced with the regression guard.
   Run with `npm test`. See the audit doc for the full write-up. */
/** @typedef {import('../src/types.js').ForkPart} ForkPart */
/** @typedef {import('../src/types.js').CompatResult} CompatResult */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
/** @param {Object.<string, string>} map @returns {CompatResult} */
var chk = function(map){ return C.checkBuild(B(map)); };
/** @param {string} id @returns {ForkPart} */
var fork = function(id){ return /** @type {ForkPart} */ (part(id)); };
/** does result `r` carry a verdict with this ruleId in `kind` ('errors'|'warnings')?
 * @param {CompatResult} r @param {'errors'|'warnings'} kind @param {string} ruleId @returns {boolean} */
function has(r, kind, ruleId){ return r[kind].some(function(v){ return v.ruleId === ruleId; }); }

/* ===========================================================================
   PERMANENT GUARD 1 — every curated preset is internally compatible.
   A groupset/wheelset/brakeset/cockpitset is a hand-picked sub-build; running
   its own fills through checkBuild must raise no error and no warning. (If a
   future preset mixes, say, an XD cassette with a MicroSpline wheel, this trips.)
   ======================================================================== */
test('every curated preset is internally conflict-free', function(){
  var presets = /** @type {Array<{id: string, brand: string, model: string, fills: Object.<string, string>}>} */ (
    C.PARTS.filter(function(p){ return 'fills' in p && !!p.fills; }));
  ok(presets.length > 0, 'expected some presets in the catalog');
  presets.forEach(function(pr){
    /** @type {Object.<string, any>} */ var build = {};
    Object.keys(pr.fills).forEach(function(s){ build[s] = part(pr.fills[s]); });
    var r = C.checkBuild(build);
    eq(r.errors.length, 0, pr.id + ' preset fills raise an ERROR: ' + r.errors.join(' | '));
    eq(r.warnings.length, 0, pr.id + ' preset fills raise a WARNING: ' + r.warnings.join(' | '));
  });
});

/* ===========================================================================
   PERMANENT GUARD 2 — real clashes must always be flagged (no false "fits").
   The single verdict this product must never give is a silent green on a build
   that won't go together. Each case below is a genuine incompatibility.
   ======================================================================== */
test('mullet-only frame rejects a full 29 build', function(){
  some(chk({ frame: 'fr-ibis-hd6', frontTire: 'ti-maxxis-assegai-29-25-exop-mg', rearTire: 'ti-maxxis-assegai-29-25-dh-mg' }).errors, 'Unsupported wheel setup');
});
test('XD-driver rear wheel + MicroSpline cassette -> freehub error (via hub+rim path)', function(){
  ok(has(chk({ frame: 'fr-raaw-jibb', rearHub: 'rh-dtswiss-350-boost148-xd', rearRim: 'rm-dtswiss-ex511-29', cassette: 'ca-shimano-xt-m8100-1051' }), 'errors', 'freehub'));
});
test('SRAM Transmission derailleur on a kit-less non-UDH frame -> udh error', function(){
  // Fixture re-pointed 2026-07-10: the Jibb V1 gained a sourced udhRetrofitKit
  // (dossier rule 4 review), so it now correctly WARNS instead - the hard-error
  // guard needs a frame whose maker documents no kit.
  ok(has(chk({ frame: 'fr-kona-process-153', derailleur: 'dr-sram-gx-transmission' }), 'errors', 'udh'));
});
test('SRAM Transmission derailleur on a kit-covered non-UDH frame -> udh WARNING with the kit fix, no error', function(){
  var r = chk({ frame: 'fr-raaw-jibb', derailleur: 'dr-sram-gx-transmission' });
  ok(!has(r, 'errors', 'udh'));
  ok(has(r, 'warnings', 'udh'));
});
test('52T cassette + NX (50T) derailleur -> cassette-capacity error', function(){
  ok(has(chk({ cassette: 'ca-sram-xg1275', derailleur: 'dr-sram-nx-eagle' }), 'errors', 'cassette-capacity'));
});
test('AXS shifter + cable derailleur (same system) -> actuation error', function(){
  ok(has(chk({ shifter: 'sft-sram-gx-eagle-axs', derailleur: 'dr-sram-gx-eagle' }), 'errors', 'actuation'));
});
test('Center-Lock rotor on a 6-bolt front hub -> interface error (no adapter this way)', function(){
  ok(has(chk({ fork: 'fk-rockshox-zeb-ultimate-29-170', frontWheel: 'fw-reserve-30-hd-29', frontRotor: 'ro-shimano-rtmt800-203-cl' }), 'errors', 'front-rotor-interface'));
});
test('single-crown tapered fork on a straight-dc DH frame -> steerer error', function(){
  ok(has(chk({ frame: 'fr-commencal-supreme-dh-v5', fork: 'fk-rockshox-zeb-ultimate-29-170' }), 'errors', 'steerer'));
});
test('rear shock on a hardtail frame -> hardtail-shock error', function(){
  ok(has(chk({ frame: 'fr-commencal-meta-ht-v3', shock: 'sh-rockshox-super-deluxe-ultimate-230x65' }), 'errors', 'hardtail-shock'));
});

/* ===========================================================================
   PERMANENT GUARD 3 — legit real-world builds must stay clean (no false "won't fit").
   ======================================================================== */
test('GX AXS shifter+derailleur runs a mechanical-Eagle cassette+chain -> no drivetrain error', function(){
  var r = chk({ shifter: 'sft-sram-gx-eagle-axs', derailleur: 'dr-sram-gx-eagle-axs', cassette: 'ca-sram-xg1275', chain: 'ch-sram-gx-eagle' });
  ok(!has(r, 'errors', 'drivetrain-system'));
  ok(!has(r, 'errors', 'drivetrain-speeds'));
  ok(!has(r, 'errors', 'actuation'));
});
test('mullet build on a mullet-capable frame -> no wheel-config error', function(){
  ok(!has(chk({ frame: 'fr-privateer-161-g2', frontTire: 'ti-maxxis-assegai-29-25-exop-mg', rearTire: 'ti-maxxis-assegai-275-25-dh-mg' }), 'errors', 'wheel-config'));
});

/* ===========================================================================
   PERMANENT GUARD 4 — Finding 1 stays FIXED (no regression to the native-mount
   conflation). The Marzocchi Bomber Z1/Z2 and Manitou Mattoc Pro forks once
   stored their NATIVE post-mount size in `maxRotorF` (160/180), so rule 10 falsely
   warned that a STANDARD front rotor exceeded the fork's max. The fix (2026-07-09,
   see tools/VERDICT-AUDIT-2026-07-09.md #1) raised `maxRotorF` to the true adapter
   max (203) and moved the native mount to `minRotorF`. These guards catch a
   re-introduction. (The original trip-wires that PINNED the wrong state were
   deleted here when the fix landed, per their own instructions.)
   ======================================================================== */
test('Bomber Z2 + standard 180mm front rotor fits clean (no false front-rotor-max)', function(){
  var r = chk({ fork: 'fk-marzocchi-bomber-z2-29-140', frontWheel: 'fw-reserve-30-hd-29', frontRotor: 'ro-sram-hs2-180-6b' });
  ok(!has(r, 'warnings', 'front-rotor-max'), 'a 180mm rotor must not warn on a Z2 (203mm adapter max)');
  ok(!has(r, 'errors', 'front-rotor-min'), 'a 180mm rotor is above the Z2 160mm native mount');
});
test('Bomber Z1 + standard 203mm front rotor fits clean (no false front-rotor-max)', function(){
  ok(!has(chk({ fork: 'fk-marzocchi-bomber-z1-29-160', frontWheel: 'fw-reserve-30-hd-29', frontRotor: 'ro-hayes-dseries-203-6b' }), 'warnings', 'front-rotor-max'),
    'a 203mm rotor must not warn on a Z1 (203mm adapter max)');
});
test('Manitou Mattoc Pro + standard 180mm front rotor fits clean (no false front-rotor-max)', function(){
  ok(!has(chk({ fork: 'fk-manitou-mattoc-pro-29-140', frontWheel: 'fw-reserve-30-hd-29', frontRotor: 'ro-sram-hs2-180-6b' }), 'warnings', 'front-rotor-max'),
    'a 180mm rotor must not warn on a Mattoc Pro (203mm adapter max)');
});
test('the corrected forks carry a minRotorF equal to their native post mount', function(){
  eq(fork('fk-marzocchi-bomber-z2-29-140').minRotorF, 160, 'Z2 native mount');
  eq(fork('fk-marzocchi-bomber-z2-29-140').maxRotorF, 203, 'Z2 adapter max');
  eq(fork('fk-manitou-mattoc-pro-29-140').minRotorF, 160, 'Mattoc native mount');
  eq(fork('fk-manitou-mattoc-pro-29-140').maxRotorF, 203, 'Mattoc adapter max');
  eq(fork('fk-marzocchi-bomber-z1-29-160').minRotorF, 180, 'Z1 native mount');
  eq(fork('fk-marzocchi-bomber-z1-29-160').maxRotorF, 203, 'Z1 adapter max');
});

/* ===========================================================================
   PERMANENT GUARD 5 — SECOND-PASS (2026-07-09). The deeper re-audit
   (tools/VERDICT-AUDIT-2-2026-07-09.md) found NO false-green, but it stress-
   tested the catalog's newer, faster-grown regions that the first pass did not
   cover: all three rear-axle standards (Boost148 / SuperBoost157 / 150x12), the
   microSHIFT / Box budget drivetrains, XC flat-mount brakes, and the correct
   builds in each. These guards pin that coverage so a future catalog edit can't
   silently regress it. No existing case above was modified. */

/* --- real clashes in the newer regions must ERROR (no false "fits") --- */
test('150x12 rear wheel on a SuperBoost157 DH frame -> rear-axle error (150 != 157)', function(){
  ok(has(chk({ frame: 'fr-commencal-supreme-dh-v5', rearWheel: 'rw-dtswiss-fr-1500-29-150' }), 'errors', 'rear-axle'));
});
test('Boost148 rear wheel on a SuperBoost157 DH frame -> rear-axle error', function(){
  ok(has(chk({ frame: 'fr-commencal-supreme-dh-v5', rearWheel: 'rw-dtswiss-ex-1700-29' }), 'errors', 'rear-axle'));
});
test('SuperBoost157 rear wheel on a 150x12 DH frame (YT Tues) -> rear-axle error', function(){
  ok(has(chk({ frame: 'fr-yt-tues-cf-29', rearWheel: 'rw-dtswiss-fr-1500-29-157' }), 'errors', 'rear-axle'));
});
test('microSHIFT Advent shifter + Box Prime 9 derailleur -> drivetrain-system error', function(){
  ok(has(chk({ shifter: 'sft-microshift-advent-m9295', derailleur: 'dr-box-three-prime-9' }), 'errors', 'drivetrain-system'));
});
test('Box Prime 9 shifter + SRAM Eagle derailleur -> drivetrain-system error', function(){
  ok(has(chk({ shifter: 'sft-box-three-prime-9', derailleur: 'dr-sram-gx-eagle' }), 'errors', 'drivetrain-system'));
});
test('flat-mount XC caliper on a post-mount fork -> front-brake-mount error', function(){
  ok(has(chk({ fork: 'fk-rockshox-zeb-ultimate-29-170', frontBrake: 'bk-shimano-xtr-m9110-fm' }), 'errors', 'front-brake-mount'));
});

/* --- and the correct builds in those regions must stay clean (no false "won't fit") --- */
test('a complete same-system microSHIFT Advent X group is conflict-free', function(){
  var r = chk({ shifter: 'sft-microshift-advent-x-m9605', derailleur: 'dr-microshift-advent-x-m6205', cassette: 'ca-microshift-advent-x-h104-1148', chain: 'ch-kmc-x10' });
  eq(r.errors.length, 0, 'Advent X group errors: ' + r.errors.join(' | '));
});
test('a SuperBoost157 rear wheel on the SuperBoost157 Supreme DH V5 -> no rear-axle error', function(){
  ok(!has(chk({ frame: 'fr-commencal-supreme-dh-v5', rearWheel: 'rw-dtswiss-fr-1500-29-157' }), 'errors', 'rear-axle'));
});
