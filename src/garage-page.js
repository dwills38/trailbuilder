/* ==========================================================================
   garage-page.js — the pure model + renderers behind garage.html.

   THE GARAGE IS A PAGE, NOT A MODAL (Douglas, 2026-07-24)
   Saved builds used to live in a click-opened dialog (#garageModal) and the
   inventory in an in-page view (#inventoryPage), reached by two separate
   header buttons. They are one place — the rider's own stuff — so they became
   one page, laid out the way he asked for it:

       ┌──────────────────────┬──────────────────────┐
       │ saved + completed    │ inventory            │
       │ builds               ├──────────────────────┤
       │                      │ service log          │
       └──────────────────────┴──────────────────────┘

   WHAT IS IN HERE, AND WHY
   Everything that can be decided WITHOUT a DOM: folding Supabase rows into
   display rows, and rendering those rows to an escaped HTML fragment. The page
   keeps the click wiring (it owns the handlers and the async data access). This
   is the src/build-sheet.js / src/owned-vs-buy.js pattern: deps are injected,
   nothing is imported, and the result is unit-testable with no browser.

   Injection also makes replication cheap. Nothing below knows it is looking at
   the MTB catalog — `byId`, `nameOf`, `catLabel`, `canonicalId`, `checkBuild`
   and `buildTotals` all arrive as arguments, so a BuildMyBMX garage would pass
   that page's own engine and never fork this file. (No other builder has
   accounts wired today; that is a separate job, not a limitation of this file.)

   HONESTY RULES THIS FILE KEEPS
   · A build's verdict is `checkBuild`'s own count, described as conflicts /
     things to check — never "all compatible" (CLAUDE.md's standing wording).
   · An inventory id the catalog no longer knows is shown AS the raw id and
     counted, never dropped and never renamed to something plausible.
   · Weight is only summed from parts that HAVE a weight; a build with a
     weightless part reports its weight as partial, not as a smaller number.

   HARD RULE 2 (no pop-ups): this file returns strings. It opens nothing,
   appends nothing, and schedules nothing.
   ========================================================================== */

/* ---- Saved builds -------------------------------------------------------- */

/**
 * @typedef {Object} GarageBuildRow
 * @property {string} id           the builds-table row id
 * @property {string} name         the rider's name for it (never blank — see below)
 * @property {boolean} done        status === 'completed'
 * @property {'ok'|'warn'|'error'|'unknown'} tone   verdict severity for the dot
 * @property {string} verdictLabel human-readable verdict summary
 * @property {number} price        sum/bundle price in USD
 * @property {number} weight       grams, 0 when nothing weighable is in it
 * @property {number} partCount    filled slots
 */

/** The label a build with no name gets. One constant so the page, the diff
 *  picker and the service-log target picker all say the same thing. */
var GARAGE_UNTITLED = 'Untitled build';

/**
 * Fold saved-build rows into display rows.
 *
 * `deps.sanitizeShare` is the SAME sanitizer share links go through, so a row
 * written by an older catalog resolves its retired ids and drops anything that
 * no longer belongs in its slot — a saved build can never smuggle a part into
 * the wrong slot just because it was stored, not pasted.
 *
 * A row whose payload cannot be resolved at all is still listed (the rider
 * saved it; hiding it would be a lie) with tone 'unknown'.
 *
 * @param {Array<{id:string,name?:string,status?:string,data?:any}>} rows
 * @param {{sanitizeShare:Function, byId:Function, checkBuild:Function, buildTotals:Function}} deps
 * @returns {GarageBuildRow[]}
 */
function garageBuildsModel(rows, deps) {
  return (rows || []).map(function (row) {
    /** @type {GarageBuildRow} */
    var out = {
      id: String(row.id),
      name: (row.name || '').trim() || GARAGE_UNTITLED,
      done: row.status === 'completed',
      tone: 'unknown', verdictLabel: 'Could not read this build',
      price: 0, weight: 0, partCount: 0
    };
    try {
      var data = row.data || {};
      var clean = deps.sanitizeShare(data.b || {}, data.p || {});
      /** @type {Record<string,any>} */
      var resolved = {};
      Object.keys(clean.build).forEach(function (k) { resolved[k] = deps.byId(clean.build[k]); });
      out.partCount = Object.keys(clean.build).length;

      var v = deps.checkBuild(resolved);
      if (v.errors.length) {
        out.tone = 'error';
        out.verdictLabel = v.errors.length + (v.errors.length === 1 ? ' conflict' : ' conflicts');
      } else if (v.warnings.length) {
        out.tone = 'warn';
        out.verdictLabel = v.warnings.length + ' to check';
      } else {
        out.tone = 'ok';
        out.verdictLabel = 'No conflicts found';
      }

      var t = deps.buildTotals(resolved, clean.presetBy);
      out.price = t.price || 0;
      out.weight = t.weight || 0;
    } catch (e) { /* keep the 'unknown' row — see above */ }
    return out;
  });
}

/**
 * Render the saved-builds card body.
 *
 * @param {GarageBuildRow[]} model
 * @param {{esc:Function, money:Function}} fmt
 * @param {{serviceLog?:boolean}} [opts] serviceLog: the service_events table
 *   exists (feature-detected), so per-build 🔧 buttons are real
 * @returns {string}
 */
function renderGarageBuildsHtml(model, fmt, opts) {
  var o = opts || {};
  if (!model.length) {
    return '<div class="gempty">No saved builds yet. Build a bike in the builder, '
      + 'then use “⭑ Save to garage”.</div>';
  }
  var inProgress = model.filter(function (b) { return !b.done; });
  var completed = model.filter(function (b) { return b.done; });

  /** @param {GarageBuildRow} b @returns {string} */
  function rowHtml(b) {
    var bits = [fmt.money(b.price)];
    if (b.weight) bits.push((b.weight / 1000).toFixed(2) + ' kg');
    bits.push(b.partCount + (b.partCount === 1 ? ' part' : ' parts'));
    return '<div class="grow" data-build="' + fmt.esc(b.id) + '">'
      + '<div class="gmain">'
      + '<div class="gname">' + fmt.esc(b.name) + '</div>'
      + '<div class="gmeta"><span class="gdot gdot-' + b.tone + '" aria-hidden="true"></span>'
      + fmt.esc(b.verdictLabel) + ' · ' + bits.join(' · ') + '</div>'
      + '</div>'
      + '<div class="gacts">'
      + '<button data-a="load" data-id="' + fmt.esc(b.id) + '">Open in builder</button>'
      + '<button data-a="rename" data-id="' + fmt.esc(b.id) + '">Rename</button>'
      + '<button data-a="toggle" data-id="' + fmt.esc(b.id) + '">' + (b.done ? 'Reopen' : 'Mark complete') + '</button>'
      + (o.serviceLog ? '<button data-a="svc" data-id="' + fmt.esc(b.id) + '">🔧 Service</button>' : '')
      + '<button class="del" data-a="del" data-id="' + fmt.esc(b.id) + '">Delete</button>'
      + '</div></div>';
  }

  var html = '';
  html += '<h3 class="grg-sub">In progress <span class="grg-count">' + inProgress.length + '</span></h3>';
  html += inProgress.length
    ? '<div class="glist">' + inProgress.map(rowHtml).join('') + '</div>'
    : '<div class="gempty">Nothing in progress.</div>';
  html += '<h3 class="grg-sub">Completed <span class="grg-count">' + completed.length + '</span></h3>';
  html += completed.length
    ? '<div class="glist">' + completed.map(rowHtml).join('') + '</div>'
    : '<div class="gempty">No builds marked complete yet.</div>';
  return html;
}

/* ---- Inventory ----------------------------------------------------------- */

/**
 * @typedef {Object} InventoryRow
 * @property {string} rowId    inventory-table row id
 * @property {string} partId   canonical catalog id (or the stored id if unknown)
 * @property {number} qty
 * @property {boolean} known   does the live catalog still have this part?
 * @property {string} name     part name, or the raw id when unknown
 * @property {string} meta     category (+ weight) line, or the honest unknown note
 * @property {number|null} price  MSRP, null when unknown
 */

/**
 * Fold inventory rows into display rows, grouped by category then name.
 *
 * Ids resolve through `canonicalId` FIRST, so a part the catalog renamed still
 * matches its row (the append-only id convention's whole point). An id that
 * resolves to nothing is kept, marked unknown, and counted — the rider owns
 * something; we just no longer have a row for it.
 *
 * @param {Array<{id:string, part_id:string, qty?:number}>} rows
 * @param {{canonicalId:Function, byId:Function, nameOf:Function, catLabel:Function}} deps
 * @returns {{rows:InventoryRow[], unknownCount:number, totalUnits:number}}
 */
function inventoryModel(rows, deps) {
  var out = (rows || []).map(function (r) {
    var cid = deps.canonicalId(r.part_id);
    var p = deps.byId(cid);
    var qty = typeof r.qty === 'number' && r.qty > 0 ? r.qty : 1;
    return {
      rowId: String(r.id),
      partId: p ? cid : String(r.part_id),
      qty: qty,
      known: !!p,
      name: p ? deps.nameOf(p) : String(r.part_id),
      meta: p
        ? (deps.catLabel(p.cat) + (typeof p.weight === 'number' ? ' · ' + p.weight + ' g' : ''))
        : 'Not in the current catalog — kept as you saved it',
      price: p && typeof p.price === 'number' ? p.price : null,
      _cat: p ? deps.catLabel(p.cat) : '￿'   // unknown rows sort last
    };
  });
  out.sort(function (a, b) {
    return a._cat.localeCompare(b._cat) || a.name.localeCompare(b.name);
  });
  var unknown = 0, units = 0;
  out.forEach(function (r) { if (!r.known) unknown++; units += r.qty; delete r._cat; });
  return { rows: /** @type {InventoryRow[]} */ (out), unknownCount: unknown, totalUnits: units };
}

/**
 * Render the inventory card body.
 *
 * @param {{rows:InventoryRow[], unknownCount:number, totalUnits:number}} model
 * @param {{esc:Function, money:Function}} fmt
 * @param {{serviceLog?:boolean}} [opts]
 * @returns {string}
 */
function renderInventoryHtml(model, fmt, opts) {
  var o = opts || {};
  if (!model.rows.length) {
    return '<div class="gempty">No parts yet. In the builder, use '
      + '“🧰 Add this build’s parts to inventory” from the ⋯ menu.</div>';
  }
  var html = '<div class="invlist">';
  model.rows.forEach(function (r) {
    html += '<div class="grow' + (r.known ? '' : ' unknown') + '">'
      + '<div class="gmain">'
      + '<div class="gname">' + fmt.esc(r.name) + '</div>'
      + '<div class="gmeta">' + fmt.esc(r.meta) + '</div>'
      + '</div>'
      + (r.price === null ? '' : '<div class="gprice">' + fmt.money(r.price) + '</div>')
      + '<div class="qty"><button class="btn" data-a="dec" data-id="' + fmt.esc(r.rowId) + '"'
      + ' aria-label="One fewer ' + fmt.esc(r.name) + '">−</button>'
      + '<span>' + r.qty + '</span>'
      + '<button class="btn" data-a="inc" data-id="' + fmt.esc(r.rowId) + '"'
      + ' aria-label="One more ' + fmt.esc(r.name) + '">+</button></div>'
      + '<div class="gacts">'
      + (o.serviceLog && r.known
          ? '<button data-a="svc" data-id="' + fmt.esc(r.partId) + '" data-label="' + fmt.esc(r.name) + '">🔧 Service</button>'
          : '')
      + '<button class="del" data-a="del" data-id="' + fmt.esc(r.rowId) + '">Remove</button>'
      + '</div></div>';
  });
  html += '</div>';
  if (model.unknownCount) {
    html += '<p class="grg-note">' + model.unknownCount
      + (model.unknownCount === 1 ? ' part is' : ' parts are')
      + ' no longer in the catalog. They are listed exactly as you saved them —'
      + ' we have not guessed a replacement.</p>';
  }
  return html;
}

/* ---- Recall notices ------------------------------------------------------ */

/**
 * Render the recall banners for owned parts.
 *
 * Same content the inventory view carried before the page split, as a string
 * instead of appended nodes. Empty string when there is nothing to say — the
 * page must NOT render an "all clear" banner: the ledger only knows about
 * recalls it has a citation for, and silence is not proof of safety.
 *
 * @param {Array<{partId:string, note:{hazard:string,scopeNote:string,remedy:string,sourceUrl:string,sourceLabel:string}}>} notices
 * @param {{esc:Function, byId:Function, nameOf:Function}} deps
 * @returns {string}
 */
function renderRecallBannersHtml(notices, deps) {
  return (notices || []).map(function (hit) {
    var p = deps.byId(hit.partId);
    return '<div class="recall-banner">'
      + '<div class="rb-head">⚠ Recall notice for a part in your garage</div>'
      + '<div><span class="rb-part">' + deps.esc(p ? deps.nameOf(p) : hit.partId) + '</span> — '
      + deps.esc(hit.note.hazard) + '</div>'
      + '<div class="rb-scope">' + deps.esc(hit.note.scopeNote) + '</div>'
      + '<div>Remedy: ' + deps.esc(hit.note.remedy) + ' — <a href="' + deps.esc(hit.note.sourceUrl)
      + '" target="_blank" rel="noopener">' + deps.esc(hit.note.sourceLabel) + '</a></div>'
      + '</div>';
  }).join('');
}

/* ---- Service-log target picker ------------------------------------------- */

/**
 * The options for "what did you service?" — every saved build, then every
 * KNOWN owned part. Unknown inventory ids are deliberately not offered: a
 * service record keyed to an id the catalog cannot resolve would render as a
 * raw slug forever.
 *
 * @param {GarageBuildRow[]} builds
 * @param {InventoryRow[]} invRows
 * @returns {Array<{value:string,label:string,kind:'build'|'part',id:string}>}
 */
function serviceTargetOptions(builds, invRows) {
  /** @type {Array<{value:string,label:string,kind:'build'|'part',id:string}>} */
  var out = [];
  (builds || []).forEach(function (b) {
    out.push({ value: 'build:' + b.id, label: b.name, kind: 'build', id: b.id });
  });
  /** @type {Record<string,boolean>} */
  var seen = {};
  (invRows || []).forEach(function (r) {
    if (!r.known || seen[r.partId]) return;
    seen[r.partId] = true;
    out.push({ value: 'part:' + r.partId, label: r.name, kind: 'part', id: r.partId });
  });
  return out;
}

/** Render the target <select>'s options.
 * @param {Array<{value:string,label:string,kind:string}>} options
 * @param {{esc:Function}} fmt
 * @returns {string} */
function renderServiceTargetOptionsHtml(options, fmt) {
  if (!options.length) {
    return '<option value="">Save a build or add a part first</option>';
  }
  var builds = options.filter(function (o) { return o.kind === 'build'; });
  var parts = options.filter(function (o) { return o.kind === 'part'; });
  /** @param {{value:string,label:string}} o @returns {string} */
  var opt = function (o) {
    return '<option value="' + fmt.esc(o.value) + '">' + fmt.esc(o.label) + '</option>';
  };
  return (builds.length ? '<optgroup label="Builds">' + builds.map(opt).join('') + '</optgroup>' : '')
    + (parts.length ? '<optgroup label="Parts you own">' + parts.map(opt).join('') + '</optgroup>' : '');
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GARAGE_UNTITLED: GARAGE_UNTITLED,
    garageBuildsModel: garageBuildsModel,
    renderGarageBuildsHtml: renderGarageBuildsHtml,
    inventoryModel: inventoryModel,
    renderInventoryHtml: renderInventoryHtml,
    renderRecallBannersHtml: renderRecallBannersHtml,
    serviceTargetOptions: serviceTargetOptions,
    renderServiceTargetOptionsHtml: renderServiceTargetOptionsHtml
  };
}
