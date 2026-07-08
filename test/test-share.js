'use strict';
/* SHARE-LINK SANITIZER — sanitizeShare() is what readHash() and the
   build-comparison paste box feed a decoded "#b=" payload through. The payload
   is attacker-/rot-controlled input (stale links, hand-edited links, links from
   newer app versions), so every entry must be proven before it enters the
   build: the id must resolve (through canonicalId), the slot must exist, and
   the part's CATEGORY must match the slot — otherwise checkBuild is handed a
   part whose fields the rules never expected and emits nonsense verdicts
   ("Steerer mismatch: Fork is undefined…") instead of the bad entry being
   dropped. Presets get the matching guard: a preset only bills the group it
   actually belongs to (REVIEW.md #25). */
var U = require('./test-util.js');
var C = U.C, eq = U.eq, ok = U.ok, part = U.part;

/* ---- the slot-category guard (the correctness bug this file pins) -------- */
test('a wrong-category part id in a build slot is DROPPED, not loaded', function(){
  // a real, valid tire id — but claimed to be the fork
  var out = C.sanitizeShare({ fork: 'ti-maxxis-assegai-29-25-exop-mg' }, {});
  ok(!('fork' in out.build), 'tire id must not load into the fork slot');
  eq(Object.keys(out.build).length, 0);
});
test('a wrong-slot part of the SAME group is dropped too (front wheel in the rear-wheel slot)', function(){
  var out = C.sanitizeShare({ rearWheel: 'fw-dtswiss-ex-1700-29' }, {});
  ok(!('rearWheel' in out.build), 'cat frontwheel must not load into the rearwheel slot');
});
test('a right-category part id loads', function(){
  var out = C.sanitizeShare({
    fork: 'fk-rockshox-zeb-ultimate-29-170',
    frontTire: 'ti-maxxis-assegai-29-25-exop-mg',
    rearTire: 'ti-maxxis-assegai-29-25-exop-mg'   // both tire slots accept cat 'tire'
  }, {});
  eq(out.build.fork, 'fk-rockshox-zeb-ultimate-29-170');
  eq(out.build.frontTire, 'ti-maxxis-assegai-29-25-exop-mg');
  eq(out.build.rearTire, 'ti-maxxis-assegai-29-25-exop-mg');
});
test('a mixed link keeps the good entries and drops only the bad one', function(){
  var out = C.sanitizeShare({
    fork: 'ti-maxxis-assegai-29-25-exop-mg',        // wrong category — dropped
    frame: 'fr-raaw-madonna-v32'                    // fine — kept
  }, {});
  eq(out.build.frame, 'fr-raaw-madonna-v32');
  ok(!('fork' in out.build));
});

/* ---- id resolution + tolerance ------------------------------------------- */
test('a retired id resolves through canonicalId and then passes the category guard', function(){
  var out = C.sanitizeShare({ frontTire: 'ti-kryp-29' }, {});
  eq(out.build.frontTire, C.canonicalId('ti-kryp-29'), 'alias resolves to the canonical id');
  eq(part(out.build.frontTire).cat, 'tire');
});
test('unknown part ids and unknown slot keys are dropped without crashing', function(){
  var out = C.sanitizeShare({ fork: 'fk-does-not-exist', frameSize: 'L', garbage: /** @type {*} */ (42) }, {});
  eq(Object.keys(out.build).length, 0);
});
test('null/undefined payloads yield an empty result, not a crash', function(){
  var out = C.sanitizeShare(null, undefined);
  eq(Object.keys(out.build).length, 0);
  eq(Object.keys(out.presetBy).length, 0);
});

/* ---- the preset-group guard (REVIEW.md #25, was already in the app) ------ */
test('a preset only loads into the group it belongs to', function(){
  var out = C.sanitizeShare({}, {
    drivetrain: 'gs-sram-gx-eagle',      // groupset in the drivetrain group — kept
    wheels: 'gs-sram-gx-eagle',          // groupset claimed as a wheelset — dropped
    frame: 'gs-sram-gx-eagle',           // group with no preset at all — dropped
    nonsense: 'gs-sram-gx-eagle'         // unknown group key — dropped
  });
  eq(out.presetBy.drivetrain, 'gs-sram-gx-eagle');
  eq(Object.keys(out.presetBy).length, 1);
});
