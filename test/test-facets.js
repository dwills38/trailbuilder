'use strict';
/* FILTER-FACET DERIVATIONS (2026-07-16 slider/filter feature) — pins the
   BB-shell family grouping, drivetrain actuation resolution, frame travel
   facets, and the four complete-bike facets that read through `fills`.
   Full rationale lives in src/facets.js's own header; this suite pins
   behavior, including the "never synthesize a third bucket" rule for
   single-speed complete bikes and the hardtail=0 convention. Uses a small
   synthetic byId lookup (dependency-injected, not compat.js's real one) so
   this suite has no coupling to live catalog rows. */
var F = require('../src/facets.js');
var eq = require('./test-util.js').eq;

/* ---- fixtures: a tiny synthetic parts table + byId lookup ---------------- */
/** @type {Object.<string, any>} */
var FIXTURES = {
  'fr-full':   { id:'fr-full', cat:'frame', suspension:'full', travel:150, maxForkTravel:160, designForkTravel:155, material:'carbon' },
  'fr-ht':     { id:'fr-ht', cat:'frame', suspension:'hardtail', maxForkTravel:120 },
  'fr-nodfd':  { id:'fr-nodfd', cat:'frame', suspension:'full', travel:140, maxForkTravel:150 },   // no designForkTravel
  'fk-1':      { id:'fk-1', cat:'fork', travel:160 },
  'sft-cable': { id:'sft-cable', cat:'shifter', actuation:'cable' },
  'dr-axs':    { id:'dr-axs', cat:'derailleur', actuation:'electronic' },
  'ca-1':      { id:'ca-1', cat:'cassette' }
};
/** @param {string} id */
function byId(id){ return FIXTURES[id] || null; }

var cbFull = { cat:'completebike', fills:{ frame:'fr-full', fork:'fk-1', shifter:'sft-cable', derailleur:'dr-axs' } };
var cbHardtail = { cat:'completebike', fills:{ frame:'fr-ht', fork:'fk-1' } };
var cbNoDrivetrain = { cat:'completebike', fills:{ frame:'fr-full', fork:'fk-1' } };   // e.g. single-speed, no shifter/derailleur fill
var cbBadFrame = { cat:'completebike', fills:{ frame:'nope', fork:'fk-1' } };

/* ---- bbFamily() ----------------------------------------------------------- */
test('bbFamily groups known shells into threaded/pressfit', function(){
  eq(F.bbFamily('BSA73'), 'threaded');
  eq(F.bbFamily('T47'), 'threaded');
  eq(F.bbFamily('PF92'), 'pressfit');
});
test('bbFamily falls through to the raw shell for an unmapped value (never crashes)', function(){
  eq(F.bbFamily('BB90'), 'BB90');
});

/* ---- actuationOf() --------------------------------------------------------- */
test('actuationOf reads a shifter/derailleur\'s own field directly', function(){
  eq(F.actuationOf({ cat:'shifter', actuation:'cable' }, byId), 'cable');
  eq(F.actuationOf({ cat:'derailleur', actuation:'electronic' }, byId), 'electronic');
});
test('actuationOf resolves a groupset preset through its shifter/derailleur fill', function(){
  eq(F.actuationOf({ cat:'groupset', fills:{ shifter:'sft-cable' } }, byId), 'cable');
  eq(F.actuationOf({ cat:'groupset', fills:{ derailleur:'dr-axs' } }, byId), 'electronic');
});
test('actuationOf returns null for agnostic cats and unresolvable fills', function(){
  eq(F.actuationOf({ cat:'cassette' }, byId), null);
  eq(F.actuationOf({ cat:'groupset', fills:{} }, byId), null);
  eq(F.actuationOf({ cat:'groupset', fills:{ shifter:'nope' } }, byId), null);
});

/* ---- complete-bike facets: cbMaterialOf/cbActuationOf/cbFrontTravelOf/cbRearTravelOf ---- */
test('cbMaterialOf reads the frame fill\'s material', function(){
  eq(F.cbMaterialOf({ cat:'completebike', fills:{ frame:'fr-full' } }, byId), 'carbon');
});
test('cbMaterialOf/cbActuationOf/cbFrontTravelOf/cbRearTravelOf all return null for a non-completebike or a bike with no fills', function(){
  eq(F.cbMaterialOf({ cat:'frame' }, byId), null);
  eq(F.cbActuationOf({ cat:'completebike' }, byId), null);
  eq(F.cbFrontTravelOf({ cat:'completebike' }, byId), null);
  eq(F.cbRearTravelOf({ cat:'completebike' }, byId), null);
});
test('cbActuationOf resolves through the frame\'s shifter/derailleur fills', function(){
  eq(F.cbActuationOf(cbFull, byId), 'cable');
});
test('cbActuationOf returns null (never a synthesized third bucket) when neither shifter nor derailleur fill exists', function(){
  eq(F.cbActuationOf(cbNoDrivetrain, byId), null);
});
test('cbFrontTravelOf reads the fork fill\'s travel', function(){
  eq(F.cbFrontTravelOf(cbFull, byId), 160);
});
test('cbRearTravelOf reads the frame fill\'s travel for a full-suspension bike', function(){
  eq(F.cbRearTravelOf(cbFull, byId), 150);
});
test('cbRearTravelOf reports 0 (not null) for a hardtail bike — stays visibly matched by a 0-inclusive range', function(){
  eq(F.cbRearTravelOf(cbHardtail, byId), 0);
});
test('cbRearTravelOf/cbMaterialOf/cbActuationOf/cbFrontTravelOf return null when the frame fill id doesn\'t resolve', function(){
  eq(F.cbRearTravelOf(cbBadFrame, byId), null);
  eq(F.cbMaterialOf(cbBadFrame, byId), null);
});

/* ---- frameRearTravelOf() / frameForkTravelOf() (bare frame, Frames tab) --- */
test('frameRearTravelOf reads a full-suspension frame\'s own travel', function(){
  eq(F.frameRearTravelOf(FIXTURES['fr-full']), 150);
});
test('frameRearTravelOf reports 0 for a hardtail frame', function(){
  eq(F.frameRearTravelOf(FIXTURES['fr-ht']), 0);
});
test('frameRearTravelOf returns null for a non-frame part', function(){
  eq(F.frameRearTravelOf(FIXTURES['fk-1']), null);
});
test('frameForkTravelOf prefers designForkTravel when present', function(){
  eq(F.frameForkTravelOf(FIXTURES['fr-full']), 155);
});
test('frameForkTravelOf falls back to maxForkTravel when designForkTravel is absent', function(){
  eq(F.frameForkTravelOf(FIXTURES['fr-nodfd']), 150);
  eq(F.frameForkTravelOf(FIXTURES['fr-ht']), 120);
});
test('frameForkTravelOf returns null for a non-frame part', function(){
  eq(F.frameForkTravelOf(FIXTURES['fk-1']), null);
});
