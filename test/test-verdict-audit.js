'use strict';
/* VERDICT AUDIT (2026-07-09) — regression cases from tools/VERDICT-AUDIT-2026-07-09.md.
   Two kinds of tests live here:
     * PERMANENT GUARDS — properties that must always hold (curated presets are
       internally compatible; real clashes are always flagged; the engine never
       hands out a silent false "fits"). These protect the whole catalog as it grows.
     * TRIP-WIRES — they PIN a currently-WRONG verdict caused by bad data (Finding 1:
       forks whose `maxRotorF` holds the native post-mount size, not the true max).
       They are green today because the bug is live; when the catalog is corrected
       they FAIL ON PURPOSE, pointing whoever fixed the data back here to delete them.
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
test('SRAM Transmission derailleur on a non-UDH frame -> udh error', function(){
  ok(has(chk({ frame: 'fr-raaw-jibb', derailleur: 'dr-sram-gx-transmission' }), 'errors', 'udh'));
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
   TRIP-WIRES — Finding 1 (KNOWN WRONG VERDICT, pending a data fix).
   These forks store the fork's NATIVE post-mount size in `maxRotorF` instead of
   its true adapter maximum, so rule 10 falsely warns that a STANDARD front rotor
   exceeds the fork's max. The asserts below pin that wrong state.

   >>> WHEN THE CATALOG IS FIXED (maxRotorF raised to the real max, e.g. 203, and
   >>> the native size moved to minRotorF), THESE TESTS WILL FAIL. That is the
   >>> intended signal: delete this whole block — the false warning is gone.
   See tools/VERDICT-AUDIT-2026-07-09.md #1.
   ======================================================================== */
test('[KNOWN-BAD DATA] Bomber Z2 maxRotorF is the native 160mm, not the real 203mm max', function(){
  eq(fork('fk-marzocchi-bomber-z2-29-140').maxRotorF, 160,
    'If this failed, the data was fixed — delete the Finding-1 trip-wire block.');
});
test('[KNOWN-BAD VERDICT] Bomber Z2 + standard 180mm front rotor wrongly warns (rule 10)', function(){
  // Real world: the Z2 has a 160mm post mount and accepts 203mm with a standard
  // adapter, so a 180mm rotor fits fine. The engine currently warns because the
  // catalog capped maxRotorF at the native 160mm.
  ok(has(chk({ fork: 'fk-marzocchi-bomber-z2-29-140', frontWheel: 'fw-reserve-30-hd-29', frontRotor: 'ro-sram-hs2-180-6b' }), 'warnings', 'front-rotor-max'),
    'Expected the (currently-wrong) front-rotor-max warning; if it is gone, the data was fixed — delete this block.');
});
test('[KNOWN-BAD DATA] Manitou Mattoc Pro maxRotorF is the native 160mm, not its real max', function(){
  eq(fork('fk-manitou-mattoc-pro-29-140').maxRotorF, 160,
    'If this failed, the data was fixed — delete the Finding-1 trip-wire block.');
});
test('[KNOWN-BAD DATA] Bomber Z1 (160mm) maxRotorF is the native 180mm, not the real 203mm max', function(){
  eq(fork('fk-marzocchi-bomber-z1-29-160').maxRotorF, 180,
    'If this failed, the data was fixed — delete the Finding-1 trip-wire block.');
});
test('[KNOWN-BAD VERDICT] Bomber Z1 + standard 203mm front rotor wrongly warns (rule 10)', function(){
  ok(has(chk({ fork: 'fk-marzocchi-bomber-z1-29-160', frontWheel: 'fw-reserve-30-hd-29', frontRotor: 'ro-hayes-dseries-203-6b' }), 'warnings', 'front-rotor-max'),
    'Expected the (currently-wrong) front-rotor-max warning; if it is gone, the data was fixed — delete this block.');
});
