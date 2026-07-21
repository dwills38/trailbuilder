/* ==========================================================================
   service-log.js — garage service log ("the rider's own maintenance
   notebook") pure logic (docs/PRODUCT-IDEAS-2026-07-19.md §3; committed
   feature slate, docs/MISSION.md).

   Three pure functions, unit-testable in Node:

   - normalizeServiceEvent(): raw form input -> a clean insert payload or a
     single friendly error. Enforces the honest minimum: a non-empty "what
     was done", a real past-or-today date (a log records what happened, not
     a plan), and at least one target (a garage build or a catalog part).

   - serviceLogModel(): the fetched rows -> display rows with the target
     resolved to a human label — build names via the caller-supplied name
     map, part ids through the injected canonicalId()/byId()/nameOf() (the
     same resolution the inventory list uses). A row whose build was deleted
     (schema sets build_id null, never cascades) is labeled honestly rather
     than dropped: the notebook survives the bike.

   - renderServiceLogHtml(): the model -> an HTML fragment for the
     click-opened dialog. Every dynamic string goes through the injected
     esc(). No schedule/interval claims anywhere — the sheet renders only
     what the rider wrote.

   NOTHING here feeds or alters checkBuild, and nothing fetches: data access
   lives in src/account.js. Deps are dependency-injected like
   src/build-sheet.js / src/facets.js, so there is no load-order coupling
   and Node tests can pass compat.js's real exports.
   ========================================================================== */

/** @typedef {import('./types.js').Part} Part */

/**
 * @typedef {Object} ServiceLogDeps
 * @property {function((string|null|undefined)):(string|null|undefined)} canonicalId
 * @property {function((string|null|undefined)):(Part|null)} byId
 * @property {function(Part):string} nameOf
 */

/**
 * A row as fetched from the service_events table (src/account.js
 * listServiceEvents). Snake_case mirrors the DB columns on purpose.
 * @typedef {Object} ServiceEventRow
 * @property {string} id
 * @property {?string} build_id
 * @property {?string} part_id
 * @property {string} done_on    ISO date (YYYY-MM-DD)
 * @property {string} title
 * @property {?string} note
 * @property {string} created_at
 */

/**
 * @typedef {Object} ServiceLogEntry
 * @property {string} id
 * @property {string} dateLabel    the done_on ISO date, verbatim
 * @property {string} title
 * @property {string} note         '' when none
 * @property {string} targetLabel  build name / part name / honest fallback
 * @property {('build'|'part'|'gone')} targetKind  gone = build since deleted
 * @property {?string} buildId
 * @property {?string} partId      canonicalized when the part resolves
 */

var SVC_TITLE_MAX = 120;
var SVC_NOTE_MAX = 2000;

/** Strict YYYY-MM-DD with a real calendar check (no Date-parse timezone
 *  surprises; 2026-02-30 must fail).
 *  @param {string} s @returns {boolean} */
function svcValidDate(s){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  var y = +s.slice(0,4), m = +s.slice(5,7), d = +s.slice(8,10);
  if(m < 1 || m > 12 || d < 1) return false;
  var days = [31, (y%4===0 && y%100!==0) || y%400===0 ? 29 : 28, 31,30,31,30,31,31,30,31,30,31];
  return d <= days[m-1];
}

/**
 * Validate + clean a service-event form. `todayStr` is injected (ISO
 * YYYY-MM-DD) so this stays pure and testable — the app passes the real
 * today. Returns {ok:true, event} with the insert payload account.js's
 * addServiceEvent takes, or {ok:false, error} with one friendly message.
 * @param {{title?:string, note?:string, dateStr?:string, buildId?:(string|null), partId?:(string|null)}} raw
 * @param {string} todayStr
 * @returns {({ok:true, event:{build_id:?string, part_id:?string, done_on:string, title:string, note:?string}}|{ok:false, error:string})}
 */
function normalizeServiceEvent(raw, todayStr){
  raw = raw || {};
  var title = String(raw.title == null ? '' : raw.title).replace(/\s+/g, ' ').trim();
  var note = String(raw.note == null ? '' : raw.note).trim();
  var dateStr = String(raw.dateStr == null ? '' : raw.dateStr).trim();
  var buildId = raw.buildId || null;
  var partId = raw.partId || null;

  if(!buildId && !partId) return { ok: false, error: 'Pick a build or a part to log this against.' };
  if(!title) return { ok: false, error: 'Say what was done (e.g. "fork lowers service").' };
  if(title.length > SVC_TITLE_MAX) return { ok: false, error: 'Keep "what was done" under ' + SVC_TITLE_MAX + ' characters — details go in the note.' };
  if(note.length > SVC_NOTE_MAX) return { ok: false, error: 'That note is too long (' + SVC_NOTE_MAX + ' characters max).' };
  if(!svcValidDate(dateStr)) return { ok: false, error: 'Enter the service date as YYYY-MM-DD.' };
  // A log records what happened. ISO date strings compare correctly as strings.
  if(dateStr > todayStr) return { ok: false, error: 'That date is in the future — the log records service already done.' };

  return { ok: true, event: {
    build_id: buildId, part_id: partId, done_on: dateStr,
    title: title, note: note || null
  } };
}

/**
 * Fetched rows -> display entries, optionally filtered to one target.
 * `buildNames` maps build uuid -> current garage name (from listBuilds).
 * Rows arrive already sorted (listServiceEvents orders by done_on desc,
 * created_at desc) but this re-sorts identically so the model never depends
 * on the transport. Filter: {buildId} keeps that build's rows;
 * {partId} keeps rows whose canonical part id matches (so a retired id
 * logged pre-rename still shows under the renamed part).
 * @param {ServiceEventRow[]} rows
 * @param {Object.<string,string>} buildNames
 * @param {ServiceLogDeps} deps
 * @param {{buildId?:string, partId?:string}} [filter]
 * @returns {ServiceLogEntry[]}
 */
function serviceLogModel(rows, buildNames, deps, filter){
  var wantBuild = filter && filter.buildId || null;
  var wantPart = (filter && filter.partId ? deps.canonicalId(filter.partId) : null) || null;
  /** @type {ServiceLogEntry[]} */
  var out = [];
  (rows || []).forEach(function(r){
    if(!r || !r.id) return;
    var canon = (r.part_id ? deps.canonicalId(r.part_id) : null) || null;
    if(wantBuild && r.build_id !== wantBuild) return;
    if(wantPart && canon !== wantPart) return;
    /** @type {ServiceLogEntry} */
    var e = {
      id: r.id,
      dateLabel: r.done_on || '',
      title: r.title || '',
      note: r.note || '',
      targetLabel: '', targetKind: 'gone',
      buildId: r.build_id || null,
      partId: canon
    };
    if(r.build_id){
      e.targetKind = 'build';
      e.targetLabel = buildNames && buildNames[r.build_id] || 'Untitled build';
    } else if(canon){
      var p = deps.byId(canon);
      e.targetKind = 'part';
      e.targetLabel = p ? deps.nameOf(p) : canon;   // an id that left the catalog still shows, honestly raw
    } else {
      e.targetKind = 'gone';
      e.targetLabel = 'a build you’ve since deleted';
    }
    out.push(e);
  });
  out.sort(function(a, b){
    if(a.dateLabel !== b.dateLabel) return a.dateLabel < b.dateLabel ? 1 : -1;
    return 0;   // same service date: keep transport order (created_at desc)
  });
  return out;
}

/**
 * Model -> the dialog's list fragment. Injected esc() wraps EVERY dynamic
 * string. `showTarget` off (per-build / per-part views) hides the redundant
 * target line; on (all-history view) shows it.
 * @param {ServiceLogEntry[]} entries
 * @param {{esc:function(string):string}} helpers
 * @param {{showTarget?:boolean}} [opts]
 * @returns {string}
 */
function renderServiceLogHtml(entries, helpers, opts){
  var esc = helpers.esc;
  var showTarget = !opts || opts.showTarget !== false;
  if(!entries || !entries.length){
    return '<div class="gempty">No service records yet. Log the first one below — e.g. “new chain” or “fork lowers service”.</div>';
  }
  var h = '';
  entries.forEach(function(e){
    h += '<div class="svc-row" data-id="' + esc(e.id) + '">' +
           '<div class="svc-main">' +
             '<div class="svc-title"><span class="svc-date">' + esc(e.dateLabel) + '</span> ' + esc(e.title) + '</div>' +
             (showTarget ? '<div class="svc-target' + (e.targetKind === 'gone' ? ' svc-gone' : '') + '">' + esc(e.targetLabel) + '</div>' : '') +
             (e.note ? '<div class="svc-note">' + esc(e.note) + '</div>' : '') +
           '</div>' +
           '<div class="gacts"><button type="button" data-a="del" data-id="' + esc(e.id) + '">Remove</button></div>' +
         '</div>';
  });
  return h;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SVC_TITLE_MAX: SVC_TITLE_MAX, SVC_NOTE_MAX: SVC_NOTE_MAX,
    svcValidDate: svcValidDate,
    normalizeServiceEvent: normalizeServiceEvent,
    serviceLogModel: serviceLogModel,
    renderServiceLogHtml: renderServiceLogHtml
  };
}
