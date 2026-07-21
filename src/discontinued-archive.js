/* ==========================================================================
   discontinued-archive.js — discontinued-parts archive ("what's gone, and
   what replaced it") pure logic (committed feature slate, docs/MISSION.md;
   the build-sheet.js pattern: pure model + renderer, deps injected, zero
   engine changes).

   Two pure functions, unit-testable in Node:

   - discontinuedArchiveModel(): one or more catalog sources -> a plain data
     model of every row carrying status:'discontinued' (recalled parts are
     NOT listed here — recalls have their own surface, src/recall-notes.js;
     absent status = current, also excluded). Each row resolves its
     `supersededBy` pointer WITHIN ITS OWN SOURCE to a successor
     {id, name, status}, so a chained lifecycle (V2.2 -> V3 -> V3.2, itself
     discontinued) is visible. A pointer that doesn't resolve in its source
     is kept raw — shown honestly as an id, never dropped, never resolved
     against another catalog.

   - renderDiscontinuedArchiveHtml(): the model -> a self-contained escaped
     HTML fragment for the click-opened archive dialog. All dynamic text
     goes through the injected esc(); "No recorded successor" states what
     OUR data records, never that no successor exists; the sample-data
     disclosure is the app's own sentence, unchanged.

   The module is CATALOG-AGNOSTIC on purpose: sources are injected as
   {label, parts} and nothing here touches PARTS, BMX_PARTS or any other
   global — each page wires only the catalog(s) it already loads (index.html
   must never load the BMX or e-MTB data; hard rules 1 & 3). NOTHING here
   feeds or alters checkBuild or any other engine.
   ========================================================================== */

/**
 * The minimal structural shape the archive reads off a catalog row — every
 * catalog's parts (MTB Part, BMX, kit, ...) satisfy it.
 * @typedef {Object} ArchivePartLike
 * @property {string} id
 * @property {string} cat
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {number} [modelYear]
 * @property {string} [gen]
 * @property {string} [status]        absent = current
 * @property {string} [supersededBy]  id of the newer generation, same catalog
 * @property {boolean} [verified]
 */

/**
 * One injected catalog source.
 * @typedef {Object} ArchiveSource
 * @property {string} label                 display name ("Mountain", "BMX", ...)
 * @property {ArchivePartLike[]} parts      the whole catalog array
 */

/**
 * @typedef {Object} ArchiveSuccessor
 * @property {string} id
 * @property {string} name    brand + model
 * @property {('current'|'discontinued'|'recalled')} status   absent on the row = current
 */

/**
 * @typedef {Object} ArchiveRow
 * @property {string} id
 * @property {string} cat
 * @property {string} name             brand + model
 * @property {?number} modelYear
 * @property {?string} gen
 * @property {number} price            the stored (last listed) MSRP, sample unless verified
 * @property {boolean} verified
 * @property {?string} supersededBy    the raw pointer, kept even when resolved
 * @property {?ArchiveSuccessor} successor   null = pointer absent OR unresolvable in this source
 */

/**
 * @typedef {Object} ArchiveCatGroup
 * @property {string} cat
 * @property {ArchiveRow[]} rows
 */

/**
 * @typedef {Object} ArchiveSourceModel
 * @property {string} label
 * @property {number} count
 * @property {ArchiveCatGroup[]} cats   first-appearance order of the source catalog
 */

/**
 * @typedef {Object} ArchiveModel
 * @property {number} total
 * @property {ArchiveSourceModel[]} sources
 */

/**
 * Fold the injected catalog source(s) into the archive's plain data model.
 * @param {ArchiveSource[]} sources
 * @returns {ArchiveModel}
 */
function discontinuedArchiveModel(sources){
  var total = 0;
  /** @type {ArchiveSourceModel[]} */
  var out = (sources || []).map(function(src){
    var parts = src.parts || [];

    // Successor lookup is scoped to THIS source only — a pointer must never
    // resolve into a different catalog's id space.
    /** @type {Object.<string, ArchivePartLike>} */
    var byId = {};
    parts.forEach(function(p){ if(p && p.id) byId[p.id] = p; });

    // Group discontinued rows by category, categories in the order the
    // catalog itself introduces them (each catalog's canonical ordering).
    /** @type {string[]} */
    var catOrder = [];
    /** @type {Object.<string, ArchiveRow[]>} */
    var byCat = {};
    parts.forEach(function(p){
      if(!p || p.status !== 'discontinued') return;
      var ptr = (typeof p.supersededBy === 'string' && p.supersededBy) ? p.supersededBy : null;
      var succ = ptr ? byId[ptr] : null;
      /** @type {ArchiveRow} */
      var row = {
        id: p.id, cat: p.cat,
        name: p.brand + ' ' + p.model,
        modelYear: (typeof p.modelYear === 'number' ? p.modelYear : null),
        gen: (typeof p.gen === 'string' && p.gen ? p.gen : null),
        price: (typeof p.price === 'number' ? p.price : 0),
        verified: p.verified === true,
        supersededBy: ptr,
        successor: succ ? {
          id: succ.id,
          name: succ.brand + ' ' + succ.model,
          status: /** @type {ArchiveSuccessor['status']} */(
            succ.status === 'discontinued' || succ.status === 'recalled' ? succ.status : 'current')
        } : null
      };
      if(!(p.cat in byCat)){ byCat[p.cat] = []; catOrder.push(p.cat); }
      byCat[p.cat].push(row);
    });

    /** @type {ArchiveCatGroup[]} */
    var cats = catOrder.map(function(cat){
      var rows = byCat[cat];
      rows.sort(function(a, b){
        if(a.name !== b.name) return a.name < b.name ? -1 : 1;
        // same brand+model: older model year first (the archive reads
        // chronologically); a year-less row sorts after dated ones
        var ya = a.modelYear == null ? Infinity : a.modelYear;
        var yb = b.modelYear == null ? Infinity : b.modelYear;
        if(ya !== yb) return ya < yb ? -1 : 1;
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
      return { cat: cat, rows: rows };
    });

    var count = cats.reduce(function(n, g){ return n + g.rows.length; }, 0);
    total += count;
    return { label: src.label, count: count, cats: cats };
  });
  return { total: total, sources: out };
}

/**
 * Helpers the renderer borrows from the app (one tested source of truth —
 * esc/money/catLabel are never re-implemented here). catLabel is optional:
 * pages without a category-label map fall back to the raw cat key.
 * @typedef {Object} ArchiveHelpers
 * @property {function(*):string} esc
 * @property {function(number):string} money
 * @property {function(string):string} [catLabel]
 */

/**
 * The model → the archive dialog's HTML fragment. Every dynamic string is
 * escaped via helpers.esc.
 * @param {ArchiveModel} model
 * @param {ArchiveHelpers} helpers
 * @returns {string}
 */
function renderDiscontinuedArchiveHtml(model, helpers){
  var esc = helpers.esc, money = helpers.money;
  var catLabel = helpers.catLabel || function(/** @type {string} */ c){ return c; };

  if(!model.total){
    return '<div class="gempty">No discontinued parts on record in this catalog.</div>';
  }

  var multi = model.sources.length > 1;
  var h = '<p class="da-summary">' + model.total + ' discontinued part' + (model.total === 1 ? '' : 's')
        + ' on record' + (multi ? ' across ' + model.sources.length + ' catalogs' : '') + '.</p>';

  model.sources.forEach(function(src){
    if(!src.count && !multi) return;
    if(multi) h += '<h3 class="da-source">' + esc(src.label) + ' <span class="da-count">' + src.count + '</span></h3>';
    src.cats.forEach(function(g){
      h += '<h4 class="da-cat">' + esc(catLabel(g.cat)) + ' <span class="da-count">' + g.rows.length + '</span></h4>';
      h += '<div class="da-list">';
      g.rows.forEach(function(r){
        h += '<div class="da-row">'
           + '<div class="da-main"><span class="da-name">' + esc(r.name) + '</span>'
           + (r.modelYear != null ? ' <span class="da-year">' + esc(String(r.modelYear)) + '</span>' : '')
           + (r.verified ? ' <span class="da-verified" title="Specs checked against the manufacturer">✓ Verified</span>' : '')
           + '<span class="da-price">' + esc(money(r.price)) + ' <span class="da-pricenote">last listed</span></span>'
           + '</div>';
        if(r.successor){
          // A successor that is itself out of the line-up says so — a chained
          // lifecycle (V2.2 -> V3 -> V3.2) should read honestly at every link.
          h += '<div class="da-succ">Superseded by <b>' + esc(r.successor.name) + '</b>'
             + (r.successor.status === 'discontinued' ? ' <span class="da-succ-note">(also discontinued)</span>' : '')
             + (r.successor.status === 'recalled' ? ' <span class="da-succ-note">(recalled)</span>' : '')
             + '</div>';
        } else if(r.supersededBy){
          // The pointer exists but its id isn't in this catalog — show the raw
          // fact rather than hiding it or guessing a name.
          h += '<div class="da-succ">Superseded by <code>' + esc(r.supersededBy) + '</code> <span class="da-succ-note">(not in this catalog)</span></div>';
        } else {
          // States what our data records — NOT a claim that no successor exists.
          h += '<div class="da-succ da-succ-none">No recorded successor.</div>';
        }
        h += '</div>';
      });
      h += '</div>';
    });
  });

  // The app's own sample-data framing, verbatim — do not reword, the honesty
  // bar is load-bearing.
  h += '<p class="da-disclosure">Specs are illustrative sample data unless a part shows ✓ Verified in the app.</p>';
  return h;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    discontinuedArchiveModel: discontinuedArchiveModel,
    renderDiscontinuedArchiveHtml: renderDiscontinuedArchiveHtml
  };
}
