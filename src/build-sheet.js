/* ==========================================================================
   build-sheet.js — printable build sheet ("hand your build to a shop") pure
   logic (docs/PRODUCT-IDEAS-2026-07-19.md §5; committed feature slate,
   docs/MISSION.md).

   Two pure functions, unit-testable in Node:

   - buildSheetModel(): folds the CURRENT build into a plain data model —
     per-group part rows (with kit/bundle attribution exactly like
     buildTotals: a group billed as a preset shows the kit price once and
     marks its rows "in kit"), the verified flag per row, the required/filled
     completeness count, buildTotals' price/weight, and checkBuild's verdicts
     VERBATIM (String(v) of each structured verdict — never reworded, so the
     sheet can never overclaim beyond the engine).

   - renderBuildSheetHtml(): the model → a self-contained HTML fragment for
     the click-opened sheet dialog AND the print-only root (index.html's
     @media print rules show only that root). All dynamic text goes through
     the injected esc(); the sample-data disclosure is the app's own wording,
     unchanged.

   NOTHING here feeds or alters checkBuild — this file only calls the
   engine. Deps (GROUPS, SLOTS, checkBuild, buildTotals, bundleActive, byId,
   partVerified, partWeight, slotRequired, effectiveWheel,
   wheelPositionFilled) are dependency-injected like src/facets.js and
   src/upgrade.js, so there is no load-order coupling and Node tests can
   pass compat.js's real exports.
   ========================================================================== */

/** @typedef {import('./types.js').Part} Part */
/** @typedef {import('./types.js').Build} Build */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').Group} Group */
/** @typedef {import('./types.js').CompatResult} CompatResult */
/** @typedef {import('./types.js').Totals} Totals */
/** @typedef {import('./types.js').PresetBy} PresetBy */
/** @typedef {import('./types.js').EffectiveWheel} EffectiveWheel */

/**
 * @typedef {Object} BuildSheetDeps
 * @property {Group[]} GROUPS
 * @property {Slot[]} SLOTS
 * @property {function(Build):CompatResult} checkBuild
 * @property {function(Build, PresetBy):Totals} buildTotals
 * @property {function(Group, Build, PresetBy):boolean} bundleActive
 * @property {function((string|null|undefined)):(Part|null)} byId
 * @property {function((Part|null|undefined)):boolean} partVerified
 * @property {function(Part):(number|null)} partWeight
 * @property {function(Slot, (Part|null|undefined), (EffectiveWheel|null)):boolean} slotRequired
 * @property {function(Build, ('front'|'rear')):(EffectiveWheel|null)} effectiveWheel
 * @property {function(Build, string):boolean} wheelPositionFilled
 */

/**
 * @typedef {Object} BuildSheetRow
 * @property {string} slotKey
 * @property {string} slotLabel
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {number|null} weight   the part's own stored weight (null = sample gap)
 * @property {boolean} verified
 * @property {boolean} inBundle     true = billed inside the group's kit price
 */

/**
 * @typedef {Object} BuildSheetGroup
 * @property {string} key
 * @property {string} label
 * @property {{brand:string, model:string, price:number}|null} bundle
 * @property {BuildSheetRow[]} rows
 */

/**
 * @typedef {Object} BuildSheetModel
 * @property {BuildSheetGroup[]} groups   only groups with at least one picked part
 * @property {{filled:number, required:number}} counts
 * @property {Totals} totals
 * @property {{kind:('err'|'warn'|'ok'), text:string}} headline
 * @property {string[]} errors    checkBuild messages, verbatim
 * @property {string[]} warnings  checkBuild messages, verbatim
 * @property {string[]} infos     checkBuild messages, verbatim
 * @property {number} verifiedCount  rows whose part is ✓ verified
 * @property {number} partCount      total picked rows
 */

/**
 * Fold the current (resolved) build into the sheet's plain data model.
 * `res` is a resolved build (slotKey -> Part object), same shape the app's
 * resolved() feeds checkBuild.
 * @param {Build} res
 * @param {PresetBy} presetBy
 * @param {BuildSheetDeps} deps
 * @returns {BuildSheetModel}
 */
function buildSheetModel(res, presetBy, deps){
  presetBy = presetBy || {};
  var r = deps.checkBuild(res);
  var t = deps.buildTotals(res, presetBy);
  /** @type {BuildSheetGroup[]} */
  var groups = [];
  var verifiedCount = 0, partCount = 0;
  deps.GROUPS.forEach(function(g){
    var bundle = (g.preset && deps.bundleActive(g, res, presetBy)) ? deps.byId(presetBy[g.key]) : null;
    /** @type {BuildSheetRow[]} */
    var rows = [];
    g.slots.forEach(function(s){
      var p = res[s.key];
      if(!p) return;
      var ver = deps.partVerified(p);
      if(ver) verifiedCount++;
      partCount++;
      rows.push({
        slotKey: s.key, slotLabel: s.label, id: p.id,
        brand: p.brand, model: p.model,
        price: (typeof p.price === 'number' ? p.price : 0),
        weight: (typeof p.weight === 'number' ? p.weight : null),
        verified: ver, inBundle: !!bundle
      });
    });
    if(!rows.length) return;
    groups.push({
      key: g.key, label: g.label,
      bundle: bundle ? {brand:bundle.brand, model:bundle.model, price:(bundle.price||0)} : null,
      rows: rows
    });
  });
  // Completeness — the same tested pieces the build panel's "N of M" line
  // uses: slotRequired for the denominator, wheelPositionFilled for the
  // numerator (so a wheel built from hub+rim counts as filled).
  var eRW = deps.effectiveWheel(res, 'rear');
  var required = deps.SLOTS.filter(function(s){ return deps.slotRequired(s, res.frame, eRW); });
  var filled = required.filter(function(s){ return deps.wheelPositionFilled(res, s.key); }).length;
  // Headline: byte-identical wording to the app's complete-build modal — the
  // all-clear stays "No conflicts found", never "All compatible" (it means no
  // conflict among the dimensions we check, not a guarantee).
  var headline = r.errors.length
    ? {kind:/** @type {'err'} */('err'), text:'✗ '+r.errors.length+' problem'+(r.errors.length>1?'s':'')}
    : r.warnings.length
      ? {kind:/** @type {'warn'} */('warn'), text:'⚠ '+r.warnings.length+' thing'+(r.warnings.length>1?'s':'')+' to check'}
      : {kind:/** @type {'ok'} */('ok'), text:'✓ No conflicts found'};
  return {
    groups: groups,
    counts: {filled: filled, required: required.length},
    totals: t,
    headline: headline,
    errors: r.errors.map(String), warnings: r.warnings.map(String), infos: r.infos.map(String),
    verifiedCount: verifiedCount, partCount: partCount
  };
}

/**
 * Helpers the renderer borrows from the app (one tested source of truth —
 * esc/money/grams are never re-implemented here).
 * @typedef {Object} BuildSheetHelpers
 * @property {function(*):string} esc
 * @property {function(number):string} money
 * @property {function(number):string} grams
 */

/**
 * Per-render metadata the app supplies at open time (the pure model carries
 * no clock and no URL).
 * @typedef {Object} BuildSheetMeta
 * @property {string} shareUrl   the '#b=' share link that reopens this build
 * @property {string} generated  display date, e.g. '2026-07-20'
 */

/**
 * The model → the sheet's HTML fragment (dialog body + print root share it).
 * Every dynamic string is escaped via helpers.esc.
 * @param {BuildSheetModel} model
 * @param {BuildSheetMeta} meta
 * @param {BuildSheetHelpers} helpers
 * @returns {string}
 */
function renderBuildSheetHtml(model, meta, helpers){
  var esc = helpers.esc, money = helpers.money, grams = helpers.grams;
  var h = '';
  // divs, not <header>/<footer> — index.html styles those ELEMENTS globally
  // (sticky site banner / page footer), and the fragment must not inherit that.
  h += '<div class="bs-head">';
  h += '<div class="bs-title-row"><span class="bs-logo">🚵 BuildMyMTB</span><span class="bs-doc">Build sheet</span></div>';
  h += '<div class="bs-meta-row"><span>Generated '+esc(meta.generated)+'</span>'
     + '<span class="bs-verdict bs-verdict-'+model.headline.kind+'">'+esc(model.headline.text)+'</span></div>';
  h += '</div>';

  h += '<table class="bs-table"><thead><tr>'
     + '<th scope="col">Slot</th><th scope="col">Part</th>'
     + '<th scope="col" class="bs-num">Price</th><th scope="col" class="bs-num">Weight</th>'
     + '</tr></thead><tbody>';
  model.groups.forEach(function(g){
    h += '<tr class="bs-group"><th colspan="4" scope="colgroup">'+esc(g.label)
       + (g.bundle ? ' <span class="bs-kit">KIT · '+esc(g.bundle.brand+' '+g.bundle.model)+' · '+esc(money(g.bundle.price))+'</span>' : '')
       + '</th></tr>';
    g.rows.forEach(function(row){
      h += '<tr><td>'+esc(row.slotLabel)+'</td>'
         + '<td>'+esc(row.brand+' '+row.model)
         + (row.verified ? ' <span class="bs-ver" title="Verified against the manufacturer">✓ verified</span>' : '')
         + '</td>'
         + '<td class="bs-num">'+(row.inBundle ? 'in kit' : esc(money(row.price)))+'</td>'
         + '<td class="bs-num">'+(row.inBundle ? '—' : (row.weight!=null ? esc(row.weight.toLocaleString())+' g' : '—'))+'</td>'
         + '</tr>';
    });
  });
  h += '</tbody><tfoot>';
  h += '<tr class="bs-totals"><th colspan="2" scope="row">Sample total · '
     + esc(model.counts.filled+' of '+model.counts.required+' required parts chosen')+'</th>'
     + '<td class="bs-num">'+esc(money(model.totals.price))+'</td>'
     + '<td class="bs-num">'+(model.totals.weight ? esc(grams(model.totals.weight))+(model.totals.missingWeight?' +':'') : '—')+'</td>'
     + '</tr>';
  h += '</tfoot></table>';

  h += '<div class="bs-conflicts"><h3>Compatibility check</h3>';
  // The all-clear tracks errors+warnings only — infos are notes, not
  // conflicts (same distinction the app's report panel draws) — and stays
  // the hedged sentence, never a guarantee.
  if(!model.errors.length && !model.warnings.length){
    h += '<p class="bs-ok">✓ No conflicts found (among the dimensions we check — some makers publish no spec data).</p>';
  }
  if(model.errors.length || model.warnings.length || model.infos.length){
    h += '<ul class="bs-verdicts">';
    model.errors.forEach(function(m){ h += '<li class="bs-err">✗ '+esc(m)+'</li>'; });
    model.warnings.forEach(function(m){ h += '<li class="bs-warn">⚠ '+esc(m)+'</li>'; });
    model.infos.forEach(function(m){ h += '<li class="bs-info">i '+esc(m)+'</li>'; });
    h += '</ul>';
  }
  h += '</div>';

  h += '<div class="bs-foot">';
  h += '<p class="bs-share">Reopen this exact build: <span class="bs-url">'+esc(meta.shareUrl)+'</span></p>';
  // The app's own sample-data framing, verbatim (spec-card modal + honesty
  // strip) — do not reword, the honesty bar is load-bearing.
  h += '<p class="bs-disclosure">Specs are illustrative sample data unless a part shows ✓ Verified in the app.</p>';
  h += '<p class="bs-disclosure">Prototype · ✓ = verified vs manufacturer · the rest is sample data · '
     + esc(model.verifiedCount+' of '+model.partCount)+' picked parts verified</p>';
  h += '</div>';
  return h;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildSheetModel: buildSheetModel, renderBuildSheetHtml: renderBuildSheetHtml };
}
