/* ==========================================================================
   owned-vs-buy.js — Owned-vs-to-buy planner ("what's left to buy for this
   build?") pure logic (docs/PRODUCT-IDEAS-2026-07-19.md §11; committed
   feature slate, docs/MISSION.md; the build-diff.js pattern: pure model +
   renderer, deps injected, zero engine changes, click-opened UI only).

   For a signed-in rider with an inventory, fold the CURRENT build into a
   per-slot owned / to-buy split and an honest remaining-cost subtotal — the
   real number a phased upgrade project runs on. Framings, all load-bearing:

   MATCHED BY PART, NOT CONDITION. A slot counts as "owned" only on an EXACT
   catalog-id match between the picked part and the inventory, resolved
   through canonicalId (append-only ids: a retired id logged pre-rename
   still matches its renamed part). The planner knows the catalog row, not
   the physical part's wear — the renderer says so and never claims more.

   QUANTITY-HONEST. Owning one of a part covers ONE slot. A build that uses
   the same part in two slots (same brake front + rear) against qty 1 marks
   the first slot (SLOTS order) owned and the second to-buy with the reason
   spelled out — never a silent double-count.

   OWNED ALTERNATIVES, COMPAT-GATED. For a to-buy slot, other inventory
   parts of that slot's category are suggested ONLY after being judged
   through upgrade.js's upgradePlacementDiff (the Upgrade Advisor's tested
   swap semantics — the slot and its mutex partners cleared from the
   baseline first, verdicts diffed BY verdictKey), injected as
   deps.placementDiff so the semantics are never forked. A swap that would
   add a NEW ERROR is excluded (counted, disclosed); warning-only stays
   suggested, flagged 'w' with the engine's messages verbatim (the yellow-
   dot tier). No suggestion ever claims compatibility beyond the dimensions
   the engine checks.

   HONEST MSRP MATH. The to-buy subtotal sums each remaining part's own
   MSRP (`price` — sample data unless ✓ Verified; streetPrice never feeds
   it, per the pricing policy). Kit/bundle pricing is NOT applied — a
   partially-owned kit can't be bought partially at the kit price — and the
   renderer discloses the gap whenever the build's own total is billing a
   bundle.

   NOTHING here feeds or alters checkBuild — this file only calls the
   engine (through the injected placementDiff and buildTotals). Deps are
   dependency-injected like src/build-diff.js and src/upgrade-optimizer.js,
   so there is no load-order coupling and Node tests can pass compat.js's
   real exports. Data access (listInventory) lives in src/account.js.
   ========================================================================== */

/** @typedef {import('./types.js').Part} Part */
/** @typedef {import('./types.js').Build} Build */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').Verdict} Verdict */
/** @typedef {import('./types.js').CompatResult} CompatResult */
/** @typedef {import('./types.js').Totals} Totals */
/** @typedef {import('./types.js').PresetBy} PresetBy */

/**
 * @typedef {Object} OwnedVsBuyDeps
 * @property {Slot[]} SLOTS
 * @property {function(Build, PresetBy):Totals} buildTotals
 * @property {function((string|null|undefined)):(Part|null)} byId
 * @property {function((string|null|undefined)):(string|null|undefined)} canonicalId
 * @property {function(Part, string, Build, *):{newErrors: Verdict[], newWarnings: Verdict[], after: CompatResult}} placementDiff
 *   upgrade.js's upgradePlacementDiff, injected so the Upgrade Advisor's
 *   swap semantics are reused, never re-implemented. It reads checkBuild /
 *   verdictKey / SLOTS / altSlotsOf off the deps object it is handed — pass
 *   THIS deps object through (the fields below exist for that reason).
 * @property {function(Build):CompatResult} checkBuild
 * @property {function(Verdict):string} verdictKey
 * @property {function(string):string[]} altSlotsOf
 */

/**
 * An inventory part suggested for a to-buy slot. `qty` is how many of it
 * remain UNCLAIMED by exact matches elsewhere in this build (never 0 —
 * fully-claimed parts are not suggested). Warnings are the engine's own
 * new-warning messages, verbatim.
 * @typedef {Object} OwnedVsBuyAlt
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {('g'|'w')} state   'w' = fits but adds warning(s) (yellow-dot tier)
 * @property {string[]} warnings
 * @property {number} qty
 */

/**
 * One filled slot of the build. `qtyShort` (to-buy rows only): the picked
 * part IS in the inventory, but every owned unit is already counted for an
 * earlier slot of this same build.
 * @typedef {Object} OwnedVsBuyRow
 * @property {string} slotKey
 * @property {string} slotLabel
 * @property {{id:string, brand:string, model:string, price:number}} part
 * @property {boolean} owned
 * @property {boolean} qtyShort
 * @property {OwnedVsBuyAlt[]} alternatives   to-buy rows only (else empty)
 */

/**
 * @typedef {Object} OwnedVsBuyModel
 * @property {boolean} empty            no filled slots at all
 * @property {number} inventoryCount    distinct inventory parts that resolve to a live catalog row
 * @property {number} unknownOwned      inventory ids that no longer match any catalog part
 * @property {number} altExcluded       (slot, owned part) pairs not suggested: the swap would add a new error
 * @property {OwnedVsBuyRow[]} rows     SLOTS order, filled slots only
 * @property {{owned:number, toBuy:number}} counts
 * @property {{build:Totals, ownedValue:number, toBuy:number, kitGap:boolean}} totals
 *   ownedValue / toBuy sum the rows' own MSRPs; kitGap = the build's total
 *   is billing at least one bundle, so these per-part sums don't add up to it.
 */

/** @param {Part} p @returns {number} */
function _ovbPrice(p){ return typeof p.price === 'number' ? p.price : 0; }

/**
 * Fold the current (resolved) build + the rider's inventory into the
 * planner's plain data model. `ownedQty` maps inventory part ids (raw, as
 * stored — possibly retired) to quantity owned; ids are resolved through
 * canonicalId and merged, so an aliased row and its canonical twin combine
 * instead of double-counting.
 * @param {Build} res
 * @param {PresetBy} presetBy
 * @param {Object.<string, number>} ownedQty
 * @param {OwnedVsBuyDeps} deps
 * @returns {OwnedVsBuyModel}
 */
function ownedVsBuyModel(res, presetBy, ownedQty, deps){
  presetBy = presetBy || {};
  ownedQty = ownedQty || {};

  // Inventory → canonical catalog ids. An id that no longer resolves (a
  // tombstoned row that left the catalog) is counted, not silently dropped.
  /** @type {Object.<string, number>} */ var inv = {};
  var unknownOwned = 0, inventoryCount = 0;
  Object.keys(ownedQty).forEach(function(raw){
    var q = Math.floor(Number(ownedQty[raw]));
    if(!isFinite(q) || q < 1) return;
    var p = deps.byId(deps.canonicalId(raw));
    if(!p){ unknownOwned++; return; }
    if(!inv[p.id]) inventoryCount++;
    inv[p.id] = (inv[p.id] || 0) + q;
  });

  // Pass 1 — exact-match allocation in SLOTS order: each owned unit covers
  // at most one slot (the quantity-honest rule).
  /** @type {Object.<string, number>} */ var remaining = {};
  Object.keys(inv).forEach(function(id){ remaining[id] = inv[id]; });
  /** @type {OwnedVsBuyRow[]} */ var rows = [];
  deps.SLOTS.forEach(function(s){
    var p = res[s.key];
    if(!p) return;
    var cid = deps.canonicalId(p.id) || p.id;
    var owned = (remaining[cid] || 0) > 0;
    if(owned) remaining[cid]--;
    rows.push({
      slotKey: s.key, slotLabel: s.label,
      part: { id: p.id, brand: p.brand, model: p.model, price: _ovbPrice(p) },
      owned: owned,
      qtyShort: !owned && !!inv[cid],
      alternatives: []
    });
  });

  // Pass 2 — owned alternatives for to-buy slots, after ALL exact matches
  // have claimed their units. Candidates: same category as the slot, units
  // left unclaimed, judged as the swap through the injected placementDiff.
  var invIds = Object.keys(inv).sort();   // lexicographic — neutral, deterministic
  var altExcluded = 0;
  /** @type {Object.<string, string>} */ var slotCat = {};
  deps.SLOTS.forEach(function(s){ slotCat[s.key] = s.cat; });
  rows.forEach(function(row){
    if(row.owned) return;
    invIds.forEach(function(id){
      if((remaining[id] || 0) < 1) return;
      if(id === (deps.canonicalId(row.part.id) || row.part.id)) return;   // qty-short exact match, not an alternative
      var cand = deps.byId(id);
      if(!cand || cand.cat !== slotCat[row.slotKey]) return;
      var d = deps.placementDiff(cand, row.slotKey, res, deps);
      if(d.newErrors.length){ altExcluded++; return; }
      row.alternatives.push({
        id: cand.id, brand: cand.brand, model: cand.model,
        state: d.newWarnings.length ? 'w' : 'g',
        warnings: d.newWarnings.map(String),
        qty: remaining[id]
      });
    });
    row.alternatives.sort(function(a, b){
      if(a.state !== b.state) return a.state === 'g' ? -1 : 1;   // clean fits first
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  });

  var t = deps.buildTotals(res, presetBy);
  var sumAll = 0, ownedValue = 0, toBuy = 0, nOwned = 0, nBuy = 0;
  rows.forEach(function(r){
    sumAll += r.part.price;
    if(r.owned){ ownedValue += r.part.price; nOwned++; }
    else { toBuy += r.part.price; nBuy++; }
  });

  return {
    empty: rows.length === 0,
    inventoryCount: inventoryCount,
    unknownOwned: unknownOwned,
    altExcluded: altExcluded,
    rows: rows,
    counts: { owned: nOwned, toBuy: nBuy },
    totals: { build: t, ownedValue: ownedValue, toBuy: toBuy, kitGap: sumAll !== t.price }
  };
}

/**
 * Helpers the renderer borrows from the app (one tested source of truth —
 * esc/money are never re-implemented here).
 * @typedef {Object} OwnedVsBuyHelpers
 * @property {function(*):string} esc
 * @property {function(number):string} money
 */

/**
 * The model → the planner dialog's HTML fragment. Every dynamic string is
 * escaped via helpers.esc. The framing rules live here: matched-by-part
 * wording, the hedged no-new-conflicts sentence (never a compatibility
 * guarantee), and the app's sample-data disclosure verbatim.
 * @param {OwnedVsBuyModel} model
 * @param {OwnedVsBuyHelpers} helpers
 * @returns {string}
 */
function renderOwnedVsBuyHtml(model, helpers){
  var esc = helpers.esc, money = helpers.money;
  if(model.empty){
    return '<div class="gempty">Pick some parts first — the planner compares your build against the parts you own.</div>';
  }
  var h = '';
  if(model.inventoryCount === 0){
    h += '<p class="ovb-note">Your inventory is empty, so every part below is to-buy. Add parts you own from any part’s card, or “＋ Add current build’s parts” on the inventory page.</p>';
  }
  var total = model.counts.owned + model.counts.toBuy;
  h += '<p class="ovb-summary">You own <b>' + model.counts.owned + '</b> of the <b>' + total + '</b> part' + (total === 1 ? '' : 's')
     + ' in this build — matched by catalog part, not condition.</p>';

  h += '<table class="ovb-table"><thead><tr>'
     + '<th scope="col">Slot</th><th scope="col">Part</th>'
     + '<th scope="col">Status</th><th scope="col" class="ovb-num">MSRP</th>'
     + '</tr></thead><tbody>';
  model.rows.forEach(function(r){
    h += '<tr class="' + (r.owned ? 'ovb-r-owned' : 'ovb-r-buy') + '">'
       + '<td>' + esc(r.slotLabel) + '</td>'
       + '<td>' + esc(r.part.brand + ' ' + r.part.model) + '</td>'
       + '<td>' + (r.owned
           ? '<span class="ovb-owned">✓ owned</span>'
           : '<span class="ovb-buy">to buy</span>'
             + (r.qtyShort ? '<div class="ovb-qty">you own this part, but every owned unit is already counted for another slot of this build</div>' : ''))
       + '</td>'
       + '<td class="ovb-num">' + esc(money(r.part.price)) + '</td>'
       + '</tr>';
    if(!r.owned && r.alternatives.length){
      h += '<tr class="ovb-alts"><td colspan="4"><span class="ovb-alts-label">Also in your inventory for this slot:</span><ul>';
      r.alternatives.forEach(function(a){
        h += '<li class="' + (a.state === 'g' ? 'ovb-alt-g' : 'ovb-alt-w') + '">'
           + esc(a.brand + ' ' + a.model) + (a.qty > 1 ? ' ×' + a.qty : '')
           + (a.state === 'g'
              ? ' — adds no new conflicts here (among the dimensions we check)'
              : a.warnings.map(function(w){ return ' — ⚠ ' + esc(w); }).join(''))
           + '</li>';
      });
      h += '</ul></td></tr>';
    }
  });
  h += '</tbody><tfoot>';
  h += '<tr class="ovb-totals"><th colspan="3" scope="row">Covered by parts you own</th>'
     + '<td class="ovb-num">' + esc(money(model.totals.ownedValue)) + '</td></tr>';
  h += '<tr class="ovb-totals ovb-left"><th colspan="3" scope="row">Left to buy ('
     + model.counts.toBuy + ' part' + (model.counts.toBuy === 1 ? '' : 's') + ', at each part’s own MSRP)</th>'
     + '<td class="ovb-num">' + esc(money(model.totals.toBuy)) + '</td></tr>';
  h += '</tfoot></table>';

  if(model.totals.kitGap){
    h += '<p class="ovb-note">This build’s total is billing a kit/bundle price, which these per-part sums don’t apply — a partially-owned kit can’t be bought partially at the kit price, so the to-buy subtotal counts each remaining part at its own MSRP.</p>';
  }
  if(model.altExcluded){
    h += '<p class="ovb-note">' + model.altExcluded + ' owned part–slot pairing' + (model.altExcluded === 1 ? ' was' : 's were')
       + ' not suggested because the swap would add a compatibility conflict.</p>';
  }
  if(model.unknownOwned){
    h += '<p class="ovb-note">' + model.unknownOwned + ' inventory item' + (model.unknownOwned === 1 ? '' : 's')
       + ' no longer match' + (model.unknownOwned === 1 ? 'es' : '') + ' any catalog part and couldn’t be compared.</p>';
  }

  // The honesty framing, load-bearing — do not reword: matched-by-part, and
  // the app's own sample-data disclosure verbatim.
  h += '<p class="ovb-disclosure">Owned matches are by catalog part id, not condition — check wear before reusing a part.</p>';
  h += '<p class="ovb-disclosure">Specs are illustrative sample data unless a part shows ✓ Verified in the app.</p>';
  return h;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ownedVsBuyModel: ownedVsBuyModel, renderOwnedVsBuyHtml: renderOwnedVsBuyHtml };
}
