/* ==========================================================================
   range-filters.js — the generic, catalog-agnostic building blocks behind
   index.html's SUBFILTERS (discrete chip rows) and RANGEFILTERS (dual-ended
   slider rows) tables: distinct-value/bounds scanning, a preferred-order
   sort, the float-epsilon-safe range predicate, and the AND-composition loop
   that decides whether a part survives every engaged filter axis. Extracted
   per tools/CODE-QUALITY-AUDIT-2026-07-16.md H-3 — the week's headline
   filter feature (shipped, then revised twice more) had zero test coverage
   because all of this lived only in index.html's inline <script>.

   Every function here is pure and catalog-agnostic: `parts` is passed in
   (never read off a global PARTS), so a filter regression can be pinned with
   a handful of synthetic fixture parts instead of depending on live catalog
   rows drifting under it. Shared contract with every SUBFILTERS/RANGEFILTERS
   descriptor in index.html: an axis a part doesn't carry, or a part outside
   the axis's own cat, always PASSES (match() returns true) — an axis only
   ever narrows the parts it actually describes.
   ========================================================================== */

/** Distinct values of `get(p)` across `parts` passing `pred(p)`, in first-seen
 * catalog order, skipping null/undefined.
 * @param {Array<*>} parts @param {function(*):boolean} pred @param {function(*):*} get
 * @returns {Array<*>} */
function distinctVals(parts, pred, get){
  /** @type {Object.<string, number>} */ var seen = {};
  /** @type {Array<*>} */ var out = [];
  parts.forEach(function(p){
    if(pred(p)){
      var v = get(p);
      if(v != null && !seen[v]){ seen[v] = 1; out.push(v); }
    }
  });
  return out;
}

/** min/max over an axis's catalog values, for a RANGEFILTERS row's slider
 * bounds — null when no part carries the field (nothing worth a slider).
 * @param {Array<*>} parts @param {function(*):boolean} pred @param {function(*):*} get
 * @returns {?{lo:number, hi:number}} */
function numBoundsOf(parts, pred, get){
  var vals = distinctVals(parts, pred, get);
  if(!vals.length) return null;
  return { lo: Math.min.apply(null, vals), hi: Math.max.apply(null, vals) };
}

/** @param {number} a @param {number} b */
function numAsc(a, b){ return a - b; }

/** Sort a value list by a preferred key order; values absent from `order`
 * keep catalog order, placed after every ordered value.
 * @param {Array<*>} vals @param {Array<*>} order @returns {Array<*>} */
function inOrder(vals, order){
  return vals.slice().sort(function(a, b){
    var ia = order.indexOf(a), ib = order.indexOf(b);
    return (ia < 0 ? order.length : ia) - (ib < 0 ? order.length : ib);
  });
}

/** Dual-ended range check with an optional float-safety epsilon (real catalog
 * values like shock stroke/tire width land on half-step or hundredth-step
 * numbers that a strict >=/<= can miss at the boundary). `value` must already
 * be known non-null — callers check the axis's own null/out-of-scope
 * pass-through first.
 * @param {number} value @param {number} lo @param {number} hi @param {number} [eps]
 * @returns {boolean} */
function rangeMatch(value, lo, hi, eps){
  eps = eps || 0;
  return value >= lo - eps && value <= hi + eps;
}

/** AND-composition of every engaged SUBFILTERS row against one part. Each
 * descriptor is `{id, match(p,v)}`; state maps id -> 'all' | a raw value. An
 * untouched ('all') axis is a no-op; match() itself decides whether an
 * out-of-scope/unknown-valued part passes (the descriptor's own convention).
 * @param {Array<{id:string, match:function(*, *):boolean}>} subfilters
 * @param {Object.<string,string>} state @param {*} part @returns {boolean} */
function subFiltersMatch(subfilters, state, part){
  for(var i = 0; i < subfilters.length; i++){
    var sf = subfilters[i], sv = state[sf.id];
    if(sv !== 'all' && !sf.match(part, sv)) return false;
  }
  return true;
}

/** AND-composition of every engaged RANGEFILTERS row against one part. Each
 * descriptor is `{id, match(p,lo,hi)}`; state maps id -> {lo,hi} | absent. An
 * absent entry (slider never touched) is a no-op.
 * @param {Array<{id:string, match:function(*, number, number):boolean}>} rangefilters
 * @param {Object.<string,{lo:number,hi:number}>} state @param {*} part @returns {boolean} */
function rangeFiltersMatch(rangefilters, state, part){
  for(var i = 0; i < rangefilters.length; i++){
    var rf = rangefilters[i], rv = state[rf.id];
    if(rv && !rf.match(part, rv.lo, rv.hi)) return false;
  }
  return true;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { distinctVals:distinctVals, numBoundsOf:numBoundsOf, numAsc:numAsc,
    inOrder:inOrder, rangeMatch:rangeMatch,
    subFiltersMatch:subFiltersMatch, rangeFiltersMatch:rangeFiltersMatch };
}
