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

/* ==========================================================================
   PRICE PROVENANCE WORDING (Douglas's 2026-07-22 ruling: "make it so verified
   means the pricing was verified too").

   Before the ruling, one "✓ Verified" badge covered the SPEC only — a row
   could be verified against the maker's page and still carry a sample PRICE,
   and nothing in the UI said so. These functions are the honest wording layer:
   every surface that shows the badge now states which of the three cases a
   row's price is in.

     price: MSRP confirmed      priceBasis:'msrp-confirmed'
     a disclosed exception      the other five tokens — a REAL price that
                                honestly isn't a current maker MSRP, each
                                naming its own reason
     price: sample              no priceBasis (the honest default, and still
                                most verified rows until the backfill runs)

   Rules these obey:
     - never claim more than the data says. A verified row without a
       priceBasis says "sample", not "MSRP" — silence is not confirmation.
     - the schema guarantees a basis only ever rides on a verified row, so an
       unverified row always lands on the sample wording.
     - plain text, no markup: every caller escapes it and drops it into a
       title=/detail line. It must never become a popup (hard rule 2) — these
       ride existing hover titles and click-opened cards only.
   ========================================================================== */

/** Human wording for a row's price provenance — the tooltip/detail phrase.
 * Takes `*` (the schema.js validatePart idiom) rather than a narrow shape: it
 * is called on whole catalog rows from five different catalogs, and on a
 * malformed/unknown row it must still return honest wording rather than throw
 * inside a render loop. An unrecognized basis degrades to the SAMPLE wording —
 * understate, never overclaim.
 * @param {*} p a catalog row (only `priceBasis` is read)
 * @returns {string} a plain-text phrase, always non-empty. */
function priceBasisLabel(p){
  switch(p && p.priceBasis){
    case 'msrp-confirmed':
      return 'price: MSRP confirmed against the manufacturer';
    case 'discontinued-no-msrp':
      return 'price: not a current MSRP — discontinued, the maker no longer publishes one';
    case 'oe-only-no-msrp':
      return 'price: not an MSRP — OE-only part, never sold separately at a consumer price';
    case 'regional-conversion':
      return 'price: converted from the maker\'s non-USD price — not a US MSRP';
    case 'bundle-split-estimate':
      return 'price: an estimated split of a bundled SKU — the maker prices only the combined part';
    case 'pair-split-estimate':
      return 'price: an estimated split of the wheelset\'s pair MSRP — the maker prices only the pair';
    case 'third-party-listed':
      return 'price: no maker price exists — shown price is from a third-party listing';
    default:
      /* Deliberately short and contrastive: this phrase sits INSIDE a badge
         title that has just said the SPEC was checked against the manufacturer
         ("Spec checked against the manufacturer on 2026-07-16 (price: sample —
          not verified)"). Spelling it out again as "not checked against the
         manufacturer" made the sentence read as a contradiction. */
      return 'price: sample — not verified';
  }
}

/** Aggregate wording for a GROUP of rows shown under one badge — the catalog's
 * family cards ("✓ Verified" over every size of a fork platform), where a
 * single tooltip speaks for several parts that can each have a different
 * basis. Uniform group => that group's phrase; mixed => say it varies rather
 * than pick a winner (reporting the best basis would overclaim for the rest).
 * @param {any[]|null|undefined} parts
 * @returns {string} a plain-text phrase, always non-empty. */
function priceBasisSummary(parts){
  var list = (parts || []).filter(Boolean);
  if(!list.length) return priceBasisLabel(null);
  /** @type {Object.<string, boolean>} */ var seen = {};
  list.forEach(function(p){ seen[(p && p.priceBasis) || ''] = true; });
  var keys = Object.keys(seen);
  if(keys.length === 1) return priceBasisLabel({ priceBasis: keys[0] || undefined });
  return 'price basis varies by variant — open one to see it';
}

/** True only when a row's price is a confirmed maker MSRP. The four exception
 * tokens are deliberately FALSE here: they are disclosed real prices, not
 * confirmed MSRPs, and a caller asking "is the price confirmed?" must not get
 * a yes for them.
 * @param {*} p a catalog row (only `priceBasis` is read) @returns {boolean} */
function priceMsrpConfirmed(p){ return !!p && p.priceBasis === 'msrp-confirmed'; }

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { completeBikeSaveBasis:completeBikeSaveBasis,
    msrpCompareAsc:msrpCompareAsc, msrpCompareDesc:msrpCompareDesc,
    priceBasisLabel:priceBasisLabel, priceBasisSummary:priceBasisSummary,
    priceMsrpConfirmed:priceMsrpConfirmed };
}
