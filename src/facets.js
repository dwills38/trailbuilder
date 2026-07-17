/* ==========================================================================
   facets.js — pure per-part / complete-bike filter-facet derivations backing
   several SUBFILTERS/RANGEFILTERS rows in index.html (BB shell family,
   drivetrain actuation, frame rear/fork travel, and the four complete-bike
   facets that read through a bike's `fills`). Display/filter-only, like
   every SUBFILTERS/RANGEFILTERS axis in this project — NOTHING here feeds
   checkBuild. Extracted per tools/CODE-QUALITY-AUDIT-2026-07-16.md H-3 (the
   week's headline filter feature shipped with zero test coverage because
   this logic lived only in index.html's inline <script>).

   Convention shared with every other axis: a fill that doesn't resolve, or a
   part outside the facet's own cat, returns null — null always PASSES an
   engaged filter chip (the axis has no opinion on that part), never hides it
   and never invents a bucket. cbActuationOf in particular must NOT synthesize
   a third "no drivetrain" bucket for single-speed bikes (Douglas 2026-07-16):
   they simply return null and sit outside whichever chip (Electronic /
   Mechanical) is engaged.

   `byId` is passed explicitly rather than read off a global, so this file has
   no load-order dependency on compat.js and can be pinned in Node with a
   plain lookup function — the same dependency-injection shape test-util.js's
   B()/part() already use for compat.js's real byId. ========================================================================== */

/** @type {Object.<string,'threaded'|'pressfit'>} */
var BB_FAMILY = { BSA68:'threaded', BSA73:'threaded', BSA83:'threaded', T47:'threaded',
                  PF92:'pressfit', PF107:'pressfit', PF865:'pressfit' };
/** Bottom-bracket shells grouped into the two families riders actually shop
 * by. An unmapped shell falls through to its own bucket (never crash, never
 * silently drop). @param {string} shell @returns {string} */
function bbFamily(shell){ return BB_FAMILY[shell] || shell; }

/** A drivetrain part's electronic/mechanical nature: shifters & derailleurs
 * carry `actuation` directly; a groupset preset inherits it from its
 * shifter/derailleur fill; cassette/chain/crankset (and everything else) are
 * agnostic -> null -> pass.
 * @param {*} p @param {function(string):*} byId @returns {?string} */
function actuationOf(p, byId){
  if(p.cat==='shifter' || p.cat==='derailleur') return p.actuation || null;
  if(p.cat==='groupset' && p.fills){
    var src = byId(p.fills.shifter) || byId(p.fills.derailleur);
    return src ? (src.actuation || null) : null;
  }
  return null;
}

/** @param {*} p @param {function(string):*} byId @returns {?string} */
function cbMaterialOf(p, byId){
  if(p.cat!=='completebike' || !p.fills) return null;
  var fr = byId(p.fills.frame);
  return fr ? (fr.material || null) : null;
}
/** @param {*} p @param {function(string):*} byId @returns {?string} */
function cbActuationOf(p, byId){
  if(p.cat!=='completebike' || !p.fills) return null;
  var src = byId(p.fills.shifter) || byId(p.fills.derailleur);
  return src ? (src.actuation || null) : null;
}
/** @param {*} p @param {function(string):*} byId @returns {?number} */
function cbFrontTravelOf(p, byId){
  if(p.cat!=='completebike' || !p.fills) return null;
  var fk = byId(p.fills.fork);
  return (fk && typeof fk.travel==='number') ? fk.travel : null;
}
/** Rear travel reads the FRAME fill's travel (the shock's own stroke isn't
 * the wheel-path travel figure); a hardtail frame carries no `travel` field
 * at all (schema forbids it) and reads as the frame fact "0mm rear travel",
 * not an unknown — so this is the one facet that reports a real number
 * instead of null for a resolvable frame, precisely so a 0-inclusive range
 * keeps hardtails visibly matched rather than silently excluded.
 * @param {*} p @param {function(string):*} byId @returns {?number} */
function cbRearTravelOf(p, byId){
  if(p.cat!=='completebike' || !p.fills) return null;
  var fr = byId(p.fills.frame);
  if(!fr) return null;
  if(fr.suspension==='hardtail') return 0;
  return typeof fr.travel==='number' ? fr.travel : null;
}
/** Same hardtail=0 convention as cbRearTravelOf, applied directly to a bare
 * frame part (Frames tab) instead of via a complete bike's frame fill.
 * @param {*} p @returns {?number} */
function frameRearTravelOf(p){
  if(p.cat!=='frame') return null;
  if(p.suspension==='hardtail') return 0;
  return typeof p.travel==='number' ? p.travel : null;
}
/** The frame's RECOMMENDED fork travel: designForkTravel (maker-stated
 * design intent, sourced on a subset of frames) wins when present; every
 * frame carries maxForkTravel (maker-rated max, schema-required) as the
 * honest fallback. Never invents a value.
 * @param {*} p @returns {?number} */
function frameForkTravelOf(p){
  if(p.cat!=='frame') return null;
  if(typeof p.designForkTravel==='number') return p.designForkTravel;
  return typeof p.maxForkTravel==='number' ? p.maxForkTravel : null;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BB_FAMILY:BB_FAMILY, bbFamily:bbFamily, actuationOf:actuationOf,
    cbMaterialOf:cbMaterialOf, cbActuationOf:cbActuationOf,
    cbFrontTravelOf:cbFrontTravelOf, cbRearTravelOf:cbRearTravelOf,
    frameRearTravelOf:frameRearTravelOf, frameForkTravelOf:frameForkTravelOf };
}
