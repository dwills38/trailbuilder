/* ==========================================================================
   build-diff.js — build diff ("what changed between these two builds") pure
   logic (committed feature slate, docs/MISSION.md; the build-sheet.js
   pattern: pure model + renderer, deps injected, zero engine changes).

   Two pure functions, unit-testable in Node:

   - buildDiffModel(): folds TWO resolved builds (A = baseline, B = compared)
     into a plain data model — per-slot changes classified added / removed /
     swapped (B relative to A; identical picks just count as unchanged),
     buildTotals for both sides plus signed price/weight deltas, and the
     verdict delta: checkBuild runs on both sides and each class
     (errors/warnings/infos) is diffed BY verdictKey — never message text,
     the same identity contract the dots use — into only-in-A / only-in-B
     lists (messages verbatim via String(v)) plus a shared count.

   - renderBuildDiffHtml(): the model → a self-contained escaped HTML
     fragment for the click-opened diff dialog. All dynamic text goes
     through the injected esc(); the sample-data disclosure is the app's
     own sentence, unchanged.

   NOTHING here feeds or alters checkBuild — this file only calls the
   engine. Deps (SLOTS, checkBuild, buildTotals, verdictKey) are
   dependency-injected like src/build-sheet.js and src/facets.js, so there
   is no load-order coupling and Node tests can pass compat.js's real
   exports.
   ========================================================================== */

/** @typedef {import('./types.js').Part} Part */
/** @typedef {import('./types.js').Build} Build */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').Verdict} Verdict */
/** @typedef {import('./types.js').CompatResult} CompatResult */
/** @typedef {import('./types.js').Totals} Totals */
/** @typedef {import('./types.js').PresetBy} PresetBy */

/**
 * One side of the diff — the same {res, presetBy, label} shape the app's
 * compare modal already resolves a garage row (or the current build) into.
 * @typedef {Object} BuildDiffSide
 * @property {Build} res        resolved build (slotKey -> Part object)
 * @property {PresetBy} presetBy
 * @property {string} label     display name ("Current build", the saved name)
 */

/**
 * @typedef {Object} BuildDiffDeps
 * @property {Slot[]} SLOTS
 * @property {function(Build):CompatResult} checkBuild
 * @property {function(Build, PresetBy):Totals} buildTotals
 * @property {function(Verdict):string} verdictKey
 */

/**
 * @typedef {Object} BuildDiffPartRef
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {number|null} weight   the part's own stored weight (null = sample gap)
 */

/**
 * @typedef {Object} BuildDiffChange
 * @property {string} slotKey
 * @property {string} slotLabel
 * @property {('added'|'removed'|'swapped')} kind   B relative to A
 * @property {BuildDiffPartRef|null} a
 * @property {BuildDiffPartRef|null} b
 */

/**
 * One verdict class (errors, warnings or infos) diffed by verdictKey.
 * Messages are checkBuild's own, verbatim (String(v)) — never reworded.
 * @typedef {Object} BuildDiffClassDiff
 * @property {string[]} onlyA   fire in A but not B
 * @property {string[]} onlyB   fire in B but not A
 * @property {number} shared    fire identically in both
 */

/**
 * @typedef {Object} BuildDiffModel
 * @property {{a:string, b:string}} labels
 * @property {BuildDiffChange[]} changes        SLOTS order; identical picks excluded
 * @property {{added:number, removed:number, swapped:number, unchanged:number}} counts
 * @property {{a:Totals, b:Totals, priceDelta:number, weightDelta:(number|null), weightApprox:boolean}} totals
 * @property {{errors:BuildDiffClassDiff, warnings:BuildDiffClassDiff, infos:BuildDiffClassDiff}} verdicts
 */

/**
 * @param {Part} p
 * @returns {BuildDiffPartRef}
 */
function _bdRef(p){
  return { id: p.id, brand: p.brand, model: p.model,
    price: (typeof p.price === 'number' ? p.price : 0),
    weight: (typeof p.weight === 'number' ? p.weight : null) };
}

/**
 * Diff one verdict class by verdictKey (the dots' identity contract — two
 * different conflicts can share byte-identical message text).
 * @param {Verdict[]} aList
 * @param {Verdict[]} bList
 * @param {function(Verdict):string} verdictKey
 * @returns {BuildDiffClassDiff}
 */
function _bdDiffClass(aList, bList, verdictKey){
  var aKeys = aList.map(verdictKey), bKeys = bList.map(verdictKey);
  return {
    onlyA: aList.filter(function(v, i){ return bKeys.indexOf(aKeys[i]) < 0; }).map(String),
    onlyB: bList.filter(function(v, i){ return aKeys.indexOf(bKeys[i]) < 0; }).map(String),
    shared: aKeys.filter(function(k){ return bKeys.indexOf(k) >= 0; }).length
  };
}

/**
 * Fold two resolved builds into the diff's plain data model. Direction is
 * A -> B: "added" = picked in B only, "removed" = picked in A only.
 * @param {BuildDiffSide} a
 * @param {BuildDiffSide} b
 * @param {BuildDiffDeps} deps
 * @returns {BuildDiffModel}
 */
function buildDiffModel(a, b, deps){
  var rA = deps.checkBuild(a.res), rB = deps.checkBuild(b.res);
  var tA = deps.buildTotals(a.res, a.presetBy || {});
  var tB = deps.buildTotals(b.res, b.presetBy || {});

  /** @type {BuildDiffChange[]} */
  var changes = [];
  var counts = { added: 0, removed: 0, swapped: 0, unchanged: 0 };
  deps.SLOTS.forEach(function(s){
    var pA = a.res[s.key], pB = b.res[s.key];
    if(!pA && !pB) return;
    if(pA && pB && pA.id === pB.id){ counts.unchanged++; return; }
    /** @type {('added'|'removed'|'swapped')} */
    var kind = !pA ? 'added' : !pB ? 'removed' : 'swapped';
    counts[kind]++;
    changes.push({ slotKey: s.key, slotLabel: s.label, kind: kind,
      a: pA ? _bdRef(pA) : null, b: pB ? _bdRef(pB) : null });
  });

  // Weight delta only when BOTH sides have a weight at all; a side whose
  // parts carry no weights sums to 0 and a "delta" against it would be a
  // fabricated number. weightApprox flags any sample gap on either side
  // (buildTotals' own missingWeight), so the renderer can hedge the delta.
  var weightDelta = (tA.weight && tB.weight) ? (tB.weight - tA.weight) : null;

  return {
    labels: { a: a.label, b: b.label },
    changes: changes,
    counts: counts,
    totals: { a: tA, b: tB,
      priceDelta: tB.price - tA.price,
      weightDelta: weightDelta,
      weightApprox: !!(tA.missingWeight || tB.missingWeight) },
    verdicts: {
      errors:   _bdDiffClass(rA.errors,   rB.errors,   deps.verdictKey),
      warnings: _bdDiffClass(rA.warnings, rB.warnings, deps.verdictKey),
      infos:    _bdDiffClass(rA.infos,    rB.infos,    deps.verdictKey)
    }
  };
}

/**
 * Helpers the renderer borrows from the app (one tested source of truth —
 * esc/money/grams are never re-implemented here).
 * @typedef {Object} BuildDiffHelpers
 * @property {function(*):string} esc
 * @property {function(number):string} money
 * @property {function(number):string} grams
 */

/**
 * The model → the diff dialog's HTML fragment. Every dynamic string is
 * escaped via helpers.esc.
 * @param {BuildDiffModel} model
 * @param {BuildDiffHelpers} helpers
 * @returns {string}
 */
function renderBuildDiffHtml(model, helpers){
  var esc = helpers.esc, money = helpers.money, grams = helpers.grams;
  /** @param {number} d @param {function(number):string} fmt */
  function signed(d, fmt){ return d === 0 ? 'no change' : (d > 0 ? '+' : '-') + fmt(Math.abs(d)); }

  var h = '';
  h += '<div class="bd-cols"><span class="bd-col-a">' + esc(model.labels.a) + '</span>'
     + '<span class="bd-arrow">→</span>'
     + '<span class="bd-col-b">' + esc(model.labels.b) + '</span></div>';

  var totalChanged = model.counts.added + model.counts.removed + model.counts.swapped;
  if(!totalChanged){
    h += '<p class="bd-same">No part differences — both builds pick the same parts'
       + (model.counts.unchanged ? ' (' + model.counts.unchanged + ' filled slot' + (model.counts.unchanged > 1 ? 's' : '') + ')' : '') + '.</p>';
  } else {
    h += '<p class="bd-summary">' + totalChanged + ' difference' + (totalChanged > 1 ? 's' : '')
       + ' (' + model.counts.added + ' added, ' + model.counts.removed + ' removed, ' + model.counts.swapped + ' swapped)'
       + ' · ' + model.counts.unchanged + ' slot' + (model.counts.unchanged === 1 ? '' : 's') + ' unchanged</p>';
    h += '<table class="bd-table"><thead><tr>'
       + '<th scope="col">Slot</th>'
       + '<th scope="col">' + esc(model.labels.a) + '</th>'
       + '<th scope="col">' + esc(model.labels.b) + '</th>'
       + '</tr></thead><tbody>';
    model.changes.forEach(function(c){
      h += '<tr class="bd-' + c.kind + '">'
         + '<td>' + esc(c.slotLabel) + ' <span class="bd-kind bd-kind-' + c.kind + '">' + c.kind + '</span></td>'
         + '<td>' + (c.a ? esc(c.a.brand + ' ' + c.a.model) : '<span class="bd-none">—</span>') + '</td>'
         + '<td>' + (c.b ? esc(c.b.brand + ' ' + c.b.model) : '<span class="bd-none">—</span>') + '</td>'
         + '</tr>';
    });
    h += '</tbody></table>';
  }

  h += '<div class="bd-totals">';
  h += '<div class="bd-trow"><span class="bd-k">Sample price</span>'
     + '<span>' + esc(money(model.totals.a.price)) + '</span>'
     + '<span>' + esc(money(model.totals.b.price)) + '</span>'
     + '<span class="bd-delta">' + esc(signed(model.totals.priceDelta, money)) + '</span></div>';
  h += '<div class="bd-trow"><span class="bd-k">Est. weight</span>'
     + '<span>' + (model.totals.a.weight ? esc(grams(model.totals.a.weight)) + (model.totals.a.missingWeight ? ' +' : '') : '—') + '</span>'
     + '<span>' + (model.totals.b.weight ? esc(grams(model.totals.b.weight)) + (model.totals.b.missingWeight ? ' +' : '') : '—') + '</span>'
     + '<span class="bd-delta">' + (model.totals.weightDelta != null
        ? esc(signed(model.totals.weightDelta, function(g){ return g.toLocaleString() + ' g'; }))
          + (model.totals.weightApprox ? ' <span class="bd-approx" title="Some parts carry no weight data — the delta is incomplete">±</span>' : '')
        : '—') + '</span></div>';
  h += '</div>';

  // Verdict delta — checkBuild's own messages, verbatim, grouped by which
  // build they fire in. "Only in" framing states set membership and nothing
  // more (no causality claim, no all-clear guarantee).
  h += '<div class="bd-verdicts"><h3>Compatibility check — what differs</h3>';
  var anyV = false;
  /** @type {Array.<{cls:('errors'|'warnings'|'infos'), glyph:string, css:string}>} */
  var CLASSES = [
    { cls: 'errors',   glyph: '✗', css: 'bd-err'  },
    { cls: 'warnings', glyph: '⚠', css: 'bd-warn' },
    { cls: 'infos',    glyph: 'i', css: 'bd-info' }
  ];
  ['onlyA', 'onlyB'].forEach(function(side){
    /** @type {string[]} */
    var items = [];
    CLASSES.forEach(function(c){
      model.verdicts[c.cls][/** @type {('onlyA'|'onlyB')} */(side)].forEach(function(msg){
        items.push('<li class="' + c.css + '">' + c.glyph + ' ' + esc(msg) + '</li>');
      });
    });
    if(!items.length) return;
    anyV = true;
    h += '<p class="bd-vside">Only in ' + esc(side === 'onlyA' ? model.labels.a : model.labels.b) + ':</p>';
    h += '<ul class="bd-vlist">' + items.join('') + '</ul>';
  });
  var sharedTotal = model.verdicts.errors.shared + model.verdicts.warnings.shared + model.verdicts.infos.shared;
  if(!anyV){
    h += '<p class="bd-vnone">No verdict differences — the compatibility check reports the same '
       + (sharedTotal ? 'findings' : 'all-clear') + ' for both (among the dimensions we check).</p>';
  } else if(sharedTotal){
    h += '<p class="bd-vshared">' + sharedTotal + ' finding' + (sharedTotal > 1 ? 's' : '') + ' shared by both builds (not listed).</p>';
  }
  h += '</div>';

  // The app's own sample-data framing, verbatim — do not reword, the honesty
  // bar is load-bearing.
  h += '<p class="bd-disclosure">Specs are illustrative sample data unless a part shows ✓ Verified in the app.</p>';
  return h;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildDiffModel: buildDiffModel, renderBuildDiffHtml: renderBuildDiffHtml };
}
