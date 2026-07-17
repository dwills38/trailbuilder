/* ==========================================================================
   pricing.js — the complete-bike MSRP save/sale basis (Douglas's 2026-07-16
   pricing ruling, tools/BIAS-AUDIT-2026-07-16.md finding #1, fixed in
   aa0c08c): the headline price and the "save" figure ALWAYS come from MSRP
   (`price`), never `streetPrice` — a recorded sale must not inflate the save
   badge or the best-value ranking. `streetPrice`, when present, is shown
   ONLY as an explicitly-labeled "Sale" line, never substituted as the basis.

   Extracted per tools/CODE-QUALITY-AUDIT-2026-07-16.md H-2: this exact
   arithmetic used to live twice, inline, inside index.html's <script>
   (bikeCardEl's card total and renderCompleteBikeBlock's build-panel total)
   where no test could reach it. One shared function now backs both call
   sites, so the two can't drift and a future edit can't quietly reintroduce
   `p.streetPrice || p.price` as the basis.
   ========================================================================== */

/** Save/sale basis for a complete bike against a computed parts total.
 * @param {{price:number, streetPrice?:number}} bike
 * @param {number} partsTotal - the à-la-carte total (buildTotals(bike.fills).price)
 * @returns {{headline:number, save:number, sale:?number}}
 *   headline: the MSRP, always the comparison/display basis.
 *   save: partsTotal - MSRP (may be <= 0; callers decide whether to show it).
 *   sale: bike.streetPrice if present, else null — display-only, never a basis. */
function completeBikeSaveBasis(bike, partsTotal){
  return {
    headline: bike.price,
    save: partsTotal - bike.price,
    sale: (bike.streetPrice != null) ? bike.streetPrice : null
  };
}

/* MSRP-only sort comparators: both read `.price`, never `.streetPrice`, so a
   recorded sale can never float a bike above a cheaper-MSRP one under
   "Price: low to high"/"high to low". Operate on bare Parts (no wrapper
   object) — callers add their own stable-order tiebreak. */
/** @param {{price?:number}} a @param {{price?:number}} b */
function msrpCompareAsc(a, b){ return (a.price||0) - (b.price||0); }
/** @param {{price?:number}} a @param {{price?:number}} b */
function msrpCompareDesc(a, b){ return (b.price||0) - (a.price||0); }

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { completeBikeSaveBasis:completeBikeSaveBasis,
    msrpCompareAsc:msrpCompareAsc, msrpCompareDesc:msrpCompareDesc };
}
