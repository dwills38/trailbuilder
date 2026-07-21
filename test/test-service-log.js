'use strict';
/* SERVICE LOG (src/service-log.js, feature slate #2) — the garage maintenance
   notebook's pure logic. The normalizer must reject anything that would make
   the log dishonest (future dates, empty titles, no target) with ONE friendly
   message; the model must resolve targets exactly the way the inventory list
   does (canonicalId -> byId -> nameOf) and keep a deleted build's history with
   an honest label; the renderer must escape every dynamic string and never
   claim a maintenance schedule. Pure logic only — no network, no Supabase. */
var U = require('./test-util.js');
var C = U.C, eq = U.eq, ok = U.ok;
var SL = require('../src/service-log.js');

/** The same deps index.html injects — compat.js's real exports. */
var DEPS = { canonicalId: C.canonicalId, byId: C.byId, nameOf: C.nameOf };
var HELPERS = { esc: C.esc };
var TODAY = '2026-07-21';

/** A valid raw form, field-overridable.
 *  @param {Object.<string, any>} [over] @returns {any} */
function raw(over){
  /** @type {Object.<string, any>} */
  var base = { title: 'Fork lowers service', note: '', dateStr: '2026-07-01', buildId: null, partId: 'ch-sram-gx-eagle' };
  Object.keys(over || {}).forEach(function(k){ base[k] = (over || {})[k]; });
  return base;
}

/** normalizeServiceEvent, result untyped so tests can poke both union arms.
 *  @param {any} r @param {string} today @returns {any} */
function norm(r, today){ return SL.normalizeServiceEvent(r, today); }

/* ---------------- normalizeServiceEvent ---------------- */

test('normalize: a clean part-targeted event passes and trims', function(){
  var r = norm(raw({ title: '  new   chain  ', note: '  waxed  ' }), TODAY);
  ok(r.ok, 'should pass');
  eq(r.event.title, 'new chain');            // collapsed + trimmed
  eq(r.event.note, 'waxed');
  eq(r.event.done_on, '2026-07-01');
  eq(r.event.part_id, 'ch-sram-gx-eagle');
  eq(r.event.build_id, null);
});

test('normalize: build-targeted event passes; empty note becomes null', function(){
  var r = norm(raw({ buildId: 'a-uuid', partId: null }), TODAY);
  ok(r.ok);
  eq(r.event.build_id, 'a-uuid');
  eq(r.event.part_id, null);
  eq(r.event.note, null);
});

test('normalize: no target at all is rejected first', function(){
  var r = norm(raw({ buildId: null, partId: null }), TODAY);
  ok(!r.ok);
  ok(/build or a part/.test(r.error), 'names the missing target');
});

test('normalize: empty / whitespace-only title rejected', function(){
  ok(!norm(raw({ title: '' }), TODAY).ok);
  ok(!norm(raw({ title: '   ' }), TODAY).ok);
});

test('normalize: over-length title and note rejected at the documented caps', function(){
  var longT = new Array(SL.SVC_TITLE_MAX + 2).join('x');   // MAX+1 chars
  ok(!norm(raw({ title: longT }), TODAY).ok);
  ok(norm(raw({ title: new Array(SL.SVC_TITLE_MAX + 1).join('x') }), TODAY).ok, 'exactly MAX passes');
  var longN = new Array(SL.SVC_NOTE_MAX + 2).join('y');
  ok(!norm(raw({ note: longN }), TODAY).ok);
});

test('normalize: date must be a real past-or-today YYYY-MM-DD', function(){
  ok(!norm(raw({ dateStr: '' }), TODAY).ok);
  ok(!norm(raw({ dateStr: '21/07/2026' }), TODAY).ok);
  ok(!norm(raw({ dateStr: '2026-02-30' }), TODAY).ok, 'impossible calendar date');
  ok(!norm(raw({ dateStr: '2026-13-01' }), TODAY).ok, 'month 13');
  ok(!norm(raw({ dateStr: '2026-07-22' }), TODAY).ok, 'tomorrow is a plan, not a log');
  ok(norm(raw({ dateStr: TODAY }), TODAY).ok, 'today passes');
  ok(norm(raw({ dateStr: '2024-02-29' }), TODAY).ok, 'real leap day passes');
});

test('svcValidDate: leap-year century rule', function(){
  ok(SL.svcValidDate('2000-02-29'), '2000 is a leap year (÷400)');
  ok(!SL.svcValidDate('1900-02-29'), '1900 is not (÷100, not ÷400)');
});

/* ---------------- serviceLogModel ---------------- */

/** A DB-shaped service_events row, field-overridable.
 *  @param {Object.<string, any>} [over] @returns {any} */
function row(over){
  /** @type {Object.<string, any>} */
  var base = { id: 'e1', build_id: null, part_id: null, done_on: '2026-07-01',
               title: 'Service', note: null, created_at: '2026-07-01T10:00:00Z' };
  Object.keys(over || {}).forEach(function(k){ base[k] = (over || {})[k]; });
  return base;
}
var NAMES = { 'b-1': 'Park bike', 'b-2': 'Race build' };

test('model: build target resolves to the garage name', function(){
  var m = SL.serviceLogModel([row({ build_id: 'b-1' })], NAMES, DEPS);
  eq(m.length, 1);
  eq(m[0].targetKind, 'build');
  eq(m[0].targetLabel, 'Park bike');
});

test('model: part target resolves through canonicalId -> byId -> nameOf', function(){
  var m = SL.serviceLogModel([row({ part_id: 'ch-sram-gx-eagle' })], {}, DEPS);
  eq(m[0].targetKind, 'part');
  eq(m[0].targetLabel, C.nameOf(C.byId('ch-sram-gx-eagle')));
});

test('model: a part id that left the catalog shows raw, never dropped', function(){
  var m = SL.serviceLogModel([row({ part_id: 'zz-not-a-real-part-id' })], {}, DEPS);
  eq(m.length, 1, 'the record survives');
  eq(m[0].targetKind, 'part');
  eq(m[0].targetLabel, 'zz-not-a-real-part-id');
});

test('model: a deleted build (both targets null) keeps the record with an honest label', function(){
  var m = SL.serviceLogModel([row({})], NAMES, DEPS);
  eq(m.length, 1, 'the notebook survives the bike');
  eq(m[0].targetKind, 'gone');
  ok(/since deleted/.test(m[0].targetLabel));
});

test('model: sorts by service date desc; same date keeps transport order', function(){
  var m = SL.serviceLogModel([
    row({ id: 'old', done_on: '2026-05-01' }),
    row({ id: 'new', done_on: '2026-07-10' }),
    row({ id: 'mid-a', done_on: '2026-06-01' }),
    row({ id: 'mid-b', done_on: '2026-06-01' })
  ], NAMES, DEPS);
  eq(m.map(function(e){ return e.id; }).join(','), 'new,mid-a,mid-b,old');
});

test('model: buildId filter keeps only that build', function(){
  var m = SL.serviceLogModel([
    row({ id: 'a', build_id: 'b-1' }), row({ id: 'b', build_id: 'b-2' }), row({ id: 'c', part_id: 'ch-sram-gx-eagle' })
  ], NAMES, DEPS, { buildId: 'b-1' });
  eq(m.map(function(e){ return e.id; }).join(','), 'a');
});

test('model: partId filter matches through canonicalId (retired ids still show)', function(){
  var retired = Object.keys(C.ALIASES)[0];
  if(retired){
    var canon = C.canonicalId(retired) || '';
    var m = SL.serviceLogModel([row({ id: 'r', part_id: retired })], {}, DEPS, { partId: canon });
    eq(m.length, 1, 'a pre-rename log entry shows under the renamed part');
    eq(m[0].partId, canon);
  }
  var m2 = SL.serviceLogModel([
    row({ id: 'x', part_id: 'ch-sram-gx-eagle' }), row({ id: 'y', part_id: 'ca-sram-xg1275' })
  ], {}, DEPS, { partId: 'ch-sram-gx-eagle' });
  eq(m2.map(function(e){ return e.id; }).join(','), 'x');
});

test('model: malformed rows (no id) are skipped, not crashed on', function(){
  var m = SL.serviceLogModel(/** @type {any[]} */ ([null, {}, row({ build_id: 'b-1' })]), NAMES, DEPS);
  eq(m.length, 1);
});

/* ---------------- renderServiceLogHtml ---------------- */

test('render: empty state invites the first record and claims no schedule', function(){
  var h = SL.renderServiceLogHtml([], HELPERS);
  ok(/No service records yet/.test(h));
  ok(!/schedule|interval|due/i.test(h), 'a notebook, never a maintenance-schedule claim');
});

test('render: hostile strings are escaped everywhere', function(){
  var m = SL.serviceLogModel([row({
    id: 'e<img src=x onerror=alert(1)>',
    title: '<script>alert(1)</script>',
    note: '"><b>bold</b>',
    build_id: 'b-x'
  })], { 'b-x': '<i>evil name</i>' }, DEPS);
  var h = SL.renderServiceLogHtml(m, HELPERS);
  ok(h.indexOf('<script>') === -1, 'title escaped');
  ok(h.indexOf('<b>') === -1, 'note escaped');
  ok(h.indexOf('<i>') === -1, 'build name escaped');
  ok(h.indexOf('<img') === -1, 'id escaped in attributes');
  ok(/&lt;script&gt;/.test(h), 'escaped, not stripped');
});

test('render: showTarget:false hides the target line (per-build / per-part views)', function(){
  var m = SL.serviceLogModel([row({ build_id: 'b-1' })], NAMES, DEPS);
  ok(/Park bike/.test(SL.renderServiceLogHtml(m, HELPERS)), 'all-history view shows it');
  ok(!/Park bike/.test(SL.renderServiceLogHtml(m, HELPERS, { showTarget: false })));
});

test('render: every entry carries its Remove control and date + title', function(){
  var m = SL.serviceLogModel([row({ build_id: 'b-1', title: 'New chain' })], NAMES, DEPS);
  var h = SL.renderServiceLogHtml(m, HELPERS);
  ok(/data-a="del"/.test(h));
  ok(/2026-07-01/.test(h));
  ok(/New chain/.test(h));
});
