/* ==========================================================================
   upgrade-optimizer.js — Upgrade Optimizer ("where is the cheapest weight on
   MY bike?") pure logic (committed feature slate, docs/MISSION.md; the
   build-diff.js pattern: pure model + renderer, deps injected, zero engine
   changes, click-opened UI only).

   For each filled slot of the rider's current build, every same-category
   catalog part is considered as a swap candidate and ranked by COST PER GRAM
   SAVED (candidate MSRP ÷ grams lighter than the current part) — ascending,
   so the cheapest weight savings lead. Two hard framings, both load-bearing:

   HONEST MATH ONLY. A ranking row exists only when BOTH weights are real:
   the current part and the candidate must be ✓ Verified (the verification
   bar checks interfaces AND weight against a manufacturer/measured source —
   tools/VERIFY-PROTOCOL.md), and both must carry a numeric weight. A
   sample-weight candidate is EXCLUDED and counted in a disclosed tally,
   never silently ranked; a slot whose CURRENT part has no verified weight
   is listed as not-rankable with the reason spelled out, because "you'd
   save N g" against a guessed baseline is a fabricated number. Prices are
   MSRP (`price`) per the pricing policy — `streetPrice` is display-only
   SALE labeling elsewhere in the app and NEVER a ranking basis here.

   UNBIASED. The ranking is pure $/gram arithmetic over the whole catalog.
   No brand weighting, no editorial ordering: ties break by larger saving
   first, then part id (lexicographic — a neutral, deterministic key).

   Compatibility-gated: every candidate is judged through upgrade.js's
   upgradePlacementDiff (the Upgrade Advisor's tested swap semantics — the
   slot and its mutex partners are cleared from the baseline first, verdicts
   diffed BY verdictKey), injected as deps.placementDiff so the semantics
   are never forked. A swap that would add a NEW ERROR is excluded (counted,
   disclosed). A swap that adds only warnings stays ranked, flagged 'w' with
   the engine's warning messages verbatim — same tiering as the yellow dot.

   Candidates must be buyable new: `status:'recalled'` rows are never
   suggested and `status:'discontinued'` rows are excluded too (the $/g math
   rests on paying MSRP for a new part); both fall in a disclosed count.
   Presets/kits and complete bikes are out of scope (no slot has their
   category) — this ranks single-part swaps only.

   NOTHING here feeds or alters checkBuild — this file only calls the
   engine (through the injected placementDiff). Deps are dependency-injected
   like src/build-diff.js and src/upgrade.js, so there is no load-order
   coupling and Node tests can pass compat.js's real exports.
   ========================================================================== */

/** @typedef {import('./types.js').Part} Part */
/** @typedef {import('./types.js').Build} Build */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').Verdict} Verdict */
/** @typedef {import('./types.js').CompatResult} CompatResult */

/**
 * @typedef {Object} UpgradeOptimizerDeps
 * @property {Part[]} PARTS
 * @property {Slot[]} SLOTS
 * @property {function(Part|null|undefined):boolean} partVerified
 * @property {function(Part|null|undefined):(number|null)} partWeight
 * @property {function(Part, string, Build, *):{newErrors: Verdict[], newWarnings: Verdict[], after: CompatResult}} placementDiff
 *   upgrade.js's upgradePlacementDiff, injected so the Upgrade Advisor's
 *   swap semantics are reused, never re-implemented. It reads checkBuild /
 *   verdictKey / SLOTS / altSlotsOf off the deps object it is handed — pass
 *   THIS deps object through (the fields below exist for that reason).
 * @property {function(Build):CompatResult} checkBuild
 * @property {function(Verdict):string} verdictKey
 * @property {function(string):string[]} altSlotsOf
 * @property {function((string|null|undefined)):(Part|null)} byId
 * @property {function(*):string} priceBasisLabel      src/pricing.js — price-provenance wording
 * @property {function(*):boolean} priceMsrpConfirmed  src/pricing.js — true only for a confirmed MSRP
 */

/**
 * @typedef {Object} UpgradeOptimizerPartRef
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {number} weight   verified grams (rows only exist when real)
 */

/**
 * One ranked swap. `price` is the candidate's MSRP — what you would pay for
 * the new part (any bundle pricing on the current build reverts when a
 * bundled part is swapped; the old part is yours to keep or sell).
 * @typedef {Object} UpgradeOptimizerRow
 * @property {string} slotKey
 * @property {string} slotLabel
 * @property {UpgradeOptimizerPartRef} current
 * @property {UpgradeOptimizerPartRef} candidate
 * @property {number} gramsSaved     current.weight - candidate.weight (> 0)
 * @property {number} price          candidate MSRP (USD)
 * @property {number} costPerGram    price / gramsSaved — the ranking key
 * @property {('g'|'w')} state       'w' = fits but adds warning(s) (yellow-dot tier)
 * @property {string[]} warnings     the engine's new-warning messages, verbatim
 * @property {string} priceNote        candidate price-provenance wording (priceBasisLabel) —
 *   a ✓ Verified SPEC does not imply a confirmed MSRP (Douglas's 2026-07-22 ruling); the $/g
 *   math still runs on `price` either way, this only marks the row honestly.
 * @property {boolean} priceConfirmed  true only when the candidate's MSRP is confirmed
 */

/**
 * A filled slot the optimizer cannot honestly rank.
 * @typedef {Object} UpgradeOptimizerSlotNote
 * @property {string} slotKey
 * @property {string} slotLabel
 * @property {string} currentName   brand + model of the part sitting there
 */

/**
 * Disclosed exclusion tallies across every rankable slot — the "never a
 * silent cap" ledger. sampleWeight = candidate not ✓ Verified (or no numeric
 * weight); addsError = the swap would introduce a new compatibility error;
 * notLighter = candidate is not strictly lighter than the current part;
 * notBuyable = discontinued/recalled; noPrice = no positive MSRP to rank on.
 * @typedef {Object} UpgradeOptimizerExcluded
 * @property {number} sampleWeight
 * @property {number} addsError
 * @property {number} notLighter
 * @property {number} notBuyable
 * @property {number} noPrice
 */

/**
 * @typedef {Object} UpgradeOptimizerModel
 * @property {boolean} empty                       no filled slots at all
 * @property {UpgradeOptimizerRow[]} rows          globally ranked, ascending costPerGram
 * @property {UpgradeOptimizerSlotNote[]} slotNotes
 * @property {UpgradeOptimizerExcluded} excluded
 * @property {number} rankableSlots                filled slots whose current part has a verified weight
 */

/** @param {Part} p @returns {UpgradeOptimizerPartRef} */
function _uoRef(p){
  return { id: p.id, brand: p.brand, model: p.model,
    weight: (typeof p.weight === 'number' ? p.weight : 0) };
}

/**
 * Fold the current build + the whole catalog into the ranked model.
 * Pure: neither `build` nor any part object is mutated.
 * @param {Build} build   resolved build (slotKey -> Part object)
 * @param {UpgradeOptimizerDeps} deps
 * @returns {UpgradeOptimizerModel}
 */
function upgradeOptimizerModel(build, deps){
  /** @type {Build} */ var bld = build || {};
  /** @type {UpgradeOptimizerRow[]} */ var rows = [];
  /** @type {UpgradeOptimizerSlotNote[]} */ var slotNotes = [];
  /** @type {UpgradeOptimizerExcluded} */
  var excluded = { sampleWeight: 0, addsError: 0, notLighter: 0, notBuyable: 0, noPrice: 0 };
  var rankableSlots = 0;

  var filledKeys = deps.SLOTS.filter(function(s){ return !!bld[s.key]; });
  if(!filledKeys.length){
    return { empty: true, rows: [], slotNotes: [], excluded: excluded, rankableSlots: 0 };
  }

  filledKeys.forEach(function(s){
    var cur = /** @type {Part} */ (bld[s.key]);
    // Presets/complete bikes never sit in a slot (slots hold single parts),
    // but guard anyway: a fills-part has no single honest weight to beat.
    var curW = ('fills' in cur && cur.fills) ? null
             : (typeof cur.weight === 'number' ? cur.weight : null);
    if(!deps.partVerified(cur) || curW === null){
      slotNotes.push({ slotKey: s.key, slotLabel: s.label,
        currentName: cur.brand + ' ' + cur.model });
      return;   // savings vs a sample-weight baseline would be a guess — never rank it
    }
    var cw = curW;   // non-null local: tsc's narrowing doesn't survive into the closure below
    rankableSlots++;

    deps.PARTS.forEach(function(cand){
      if(cand.cat !== s.cat) return;                 // wrong category for this slot
      if('fills' in cand && cand.fills) return;      // kits/bikes: out of scope
      if(cand.id === cur.id) return;                 // the part already fitted
      if(cand.status === 'recalled' || cand.status === 'discontinued'){ excluded.notBuyable++; return; }
      if(!deps.partVerified(cand) || typeof cand.weight !== 'number'){ excluded.sampleWeight++; return; }
      var saved = cw - cand.weight;
      if(saved <= 0){ excluded.notLighter++; return; }
      if(typeof cand.price !== 'number' || cand.price <= 0){ excluded.noPrice++; return; }
      var d = deps.placementDiff(cand, s.key, bld, deps);
      if(d.newErrors.length){ excluded.addsError++; return; }
      rows.push({
        slotKey: s.key, slotLabel: s.label,
        current: _uoRef(cur), candidate: _uoRef(cand),
        gramsSaved: saved, price: cand.price,
        costPerGram: cand.price / saved,
        state: d.newWarnings.length ? 'w' : 'g',
        warnings: d.newWarnings.map(String),
        priceNote: deps.priceBasisLabel(cand), priceConfirmed: deps.priceMsrpConfirmed(cand)
      });
    });
  });

  // Pure-math ordering, brand-blind: cheapest $/g first; ties to the bigger
  // saving, then part id — a neutral, deterministic key (never brand order).
  rows.sort(function(a, b){
    if(a.costPerGram !== b.costPerGram) return a.costPerGram - b.costPerGram;
    if(a.gramsSaved !== b.gramsSaved) return b.gramsSaved - a.gramsSaved;
    return a.candidate.id < b.candidate.id ? -1 : a.candidate.id > b.candidate.id ? 1 : 0;
  });

  return { empty: false, rows: rows, slotNotes: slotNotes,
    excluded: excluded, rankableSlots: rankableSlots };
}

/**
 * Helpers the renderer borrows from the app (one tested source of truth).
 * @typedef {Object} UpgradeOptimizerHelpers
 * @property {function(*):string} esc
 * @property {function(number):string} money
 */

/** $/g for display. Below half a cent per gram the two-decimal render would
 * show "$0.00/g" — a free-weight overclaim — so it floors at "<$0.01/g".
 * @param {number} c @returns {string} */
function _uoPerGram(c){
  return (c >= 0.005 ? '$' + c.toFixed(2) : '<$0.01') + '/g';
}

/**
 * The model → the click-opened dialog's HTML fragment. Every dynamic string
 * is escaped via helpers.esc. `limit` caps the DISPLAYED rows; the remainder
 * is always disclosed (no silent cap).
 * @param {UpgradeOptimizerModel} model
 * @param {{limit?: number}} opts
 * @param {UpgradeOptimizerHelpers} helpers
 * @returns {string}
 */
function renderUpgradeOptimizerHtml(model, opts, helpers){
  var esc = helpers.esc, money = helpers.money;
  var limit = (opts && typeof opts.limit === 'number' && opts.limit > 0) ? opts.limit : 20;
  var h = '';

  if(model.empty){
    return '<p class="uo-empty">Pick some parts first — the optimizer ranks swaps against your current build.</p>';
  }

  if(model.rows.length){
    var shown = model.rows.slice(0, limit);
    h += '<p class="uo-summary">' + model.rows.length + ' honest upgrade candidate' + (model.rows.length === 1 ? '' : 's')
       + ' across ' + model.rankableSlots + ' slot' + (model.rankableSlots === 1 ? '' : 's')
       + ', ranked by cost per gram saved (cheapest weight first).</p>';
    h += '<table class="uo-table"><thead><tr>'
       + '<th scope="col">#</th>'
       + '<th scope="col">Slot</th>'
       + '<th scope="col">Swap</th>'
       + '<th scope="col">Saves</th>'
       + '<th scope="col">MSRP</th>'
       + '<th scope="col">$ / g</th>'
       + '</tr></thead><tbody>';
    shown.forEach(function(r, i){
      h += '<tr class="uo-' + r.state + '">'
         + '<td class="uo-rank">' + (i + 1) + '</td>'
         + '<td>' + esc(r.slotLabel) + '</td>'
         + '<td class="uo-swap">' + esc(r.current.brand + ' ' + r.current.model)
           + ' <span class="uo-arrow">→</span> <b>' + esc(r.candidate.brand + ' ' + r.candidate.model) + '</b>'
           + (r.warnings.length
              ? '<div class="uo-warn">' + r.warnings.map(function(w){ return '⚠ ' + esc(w); }).join('<br>') + '</div>'
              : '')
         + '</td>'
         + '<td class="uo-num">' + r.gramsSaved.toLocaleString() + ' g</td>'
         + '<td class="uo-num">' + esc(money(r.price))
           + (r.priceConfirmed ? '' : ' <span class="uo-pnote" title="' + esc(r.priceNote) + '">†</span>')
         + '</td>'
         + '<td class="uo-num uo-cpg">' + esc(_uoPerGram(r.costPerGram)) + '</td>'
         + '</tr>';
    });
    h += '</tbody></table>';
    if(model.rows.length > shown.length){
      h += '<p class="uo-more">…and ' + (model.rows.length - shown.length)
         + ' more (showing the top ' + shown.length + ' — the ranking continues in the same math).</p>';
    }
    // A ✓ Verified SPEC is not the same claim as a confirmed MSRP (Douglas's
    // 2026-07-22 ruling) — the ranking still runs on `price` either way, this
    // just discloses which ranked candidates' prices are sample data.
    var samplePriced = model.rows.filter(function(r){ return !r.priceConfirmed; }).length;
    if(samplePriced){
      h += '<p class="uo-pricenote">† ' + samplePriced + ' of ' + model.rows.length
         + ' ranked candidate price' + (model.rows.length === 1 ? '' : 's')
         + (samplePriced === 1 ? ' is' : ' are') + ' sample data, not a confirmed manufacturer MSRP.</p>';
    }
  } else {
    h += '<p class="uo-none">No honestly rankable upgrades found for this build — a swap is ranked only when '
       + 'both weights are ✓ Verified, the candidate is lighter, and it adds no compatibility error. '
       + 'The tallies below say what was set aside and why.</p>';
  }

  // Slots we refuse to rank — the reason spelled out, never silently skipped.
  if(model.slotNotes.length){
    h += '<div class="uo-notes"><h3>Not rankable</h3><ul>';
    model.slotNotes.forEach(function(n){
      h += '<li>' + esc(n.slotLabel) + ' — your current ' + esc(n.currentName)
         + ' has no ✓ Verified weight, so a savings figure against it would be a guess.</li>';
    });
    h += '</ul></div>';
  }

  // The exclusion ledger — every set-aside candidate counted, none silent.
  var ex = model.excluded;
  /** @type {string[]} */ var exBits = [];
  if(ex.sampleWeight) exBits.push(ex.sampleWeight + ' without a ✓ Verified weight (never silently ranked)');
  if(ex.addsError) exBits.push(ex.addsError + ' that would add a compatibility error');
  if(ex.notLighter) exBits.push(ex.notLighter + ' not lighter than your current part');
  if(ex.notBuyable) exBits.push(ex.notBuyable + ' discontinued or recalled (not buyable new at MSRP)');
  if(ex.noPrice) exBits.push(ex.noPrice + ' without a usable MSRP');
  if(exBits.length){
    h += '<p class="uo-excluded">Set aside from the ranking: ' + exBits.join(' · ') + '.</p>';
  }

  h += '<p class="uo-method">Ranking is pure price-per-gram arithmetic over the whole catalog — no brand is favored. '
     + 'Prices are MSRP (what you’d pay for the new part); sale prices never affect the ranking, and any bundle '
     + 'pricing on your current build reverts when a bundled part is swapped. Swaps are fit-checked against your '
     + 'current build among the dimensions we check — ⚠ rows fit but add a warning worth reading.</p>';
  // The app's own sample-data framing, verbatim — do not reword.
  h += '<p class="uo-disclosure">Specs are illustrative sample data unless a part shows ✓ Verified in the app.</p>';
  return h;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { upgradeOptimizerModel: upgradeOptimizerModel,
    renderUpgradeOptimizerHtml: renderUpgradeOptimizerHtml };
}
