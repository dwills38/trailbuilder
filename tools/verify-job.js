#!/usr/bin/env node
'use strict';
/* =============================================================================
   VERIFY-JOB — resumable, interruptible verification job runner.
   -----------------------------------------------------------------------------
   This is the STATE MANAGER only. It has no web access and no verification
   logic — the logic lives in tools/VERIFY-PROTOCOL.md so any AI model (or
   human) can resume the same job across sessions with no code changes.

   State lives in tools/verification-job.json (committed to git). Every write
   is atomic (temp file + rename). Every part is an independent unit of work;
   the runner is stateless between invocations, so an interrupt at ANY point
   (Ctrl+C, usage limit, crash) loses at most the in-flight part, which is
   marked InProgress and picked up on resume.

   Statuses: Pending | InProgress | Verified | Failed | Skipped
     - Verified: specs confirmed against a manufacturer page (see protocol)
     - Failed:   transient problem (fetch error, conflicting sources) — retryable
     - Skipped:  cannot meet the verification bar (e.g. maker publishes no
                 weight) — a POLICY outcome, not an error; note says why
     - InProgress: crash marker; `next` re-offers these first

   Commands (run from anywhere; state + catalog resolve relative to this file):
     node tools/verify-job.js init            build/merge queue from the catalog
     node tools/verify-job.js status          batch summary + what's next
     node tools/verify-job.js next [n]        print next n work orders (default: batchSize)
     node tools/verify-job.js next --by-source [n]
                                               same queue, grouped into n source-page batches
                                               (default 30) instead of n parts - visit one page,
                                               clear every queued part that cites it. Parts with
                                               no known source each stay their own singleton group.
     node tools/verify-job.js price-basis [n] the priceBasis backfill backlog (verified rows
                                               missing priceBasis - see VERIFY-PROTOCOL.md), grouped
                                               by source and sorted largest-first (default 30
                                               groups). Read-only report, no job-state involved:
                                               the backlog isn't part of the Pending/Verified queue
                                               (verified rows are already 'Verified' in state) so
                                               this is computed live from the catalog every run.
     node tools/verify-job.js start <id>      mark a part InProgress
     node tools/verify-job.js complete <id> <Verified|Failed|Skipped> [--source url] [--error msg] [--note msg] [--force]
     node tools/verify-job.js reset --failed | --skipped | <id> [--force]
     node tools/verify-job.js retry           list Failed parts + the retry command
     node tools/verify-job.js report          final report (totals, success rate, failures)

   Idempotency guarantees:
     - init merges: existing statuses are preserved; new catalog parts join as
       Pending; parts removed from the catalog are TOMBSTONED (history kept,
       excluded from queue/counts); state keyed by a retired id migrates to the
       current id via the ALIASES map (ids are append-only - see src/compat.js).
     - A part that is verified:true in the CATALOG is auto-promoted to Verified
       in state (the catalog is the source of truth; no duplicate work).
     - `complete` REFUSES to change a Verified part unless --force is given.
   ========================================================================== */

var fs = require('fs');
var path = require('path');
var C = require(path.join(__dirname, '..', 'src', 'compat.js'));

var STATE_FILE = path.join(__dirname, 'verification-job.json');
var PRESET_CATS = ['groupset', 'wheelset', 'brakeset', 'cockpitset']; // kits derive verified-ness from their fills — never queued
var CAT_ORDER = ['frame', 'tire', 'frontwheel', 'rearwheel', 'shock', 'fork',
  'handlebar', 'stem', 'grips', 'dropper', 'saddle', 'pedal',
  'brake', 'rotor', 'shifter', 'derailleur', 'cassette', 'chain', 'crankset'];

function now() { return new Date().toISOString(); }

function workUnits() { // catalog parts that are units of work, in category-priority order
  var byCat = {};
  C.PARTS.forEach(function (p) { if (PRESET_CATS.indexOf(p.cat) < 0) { (byCat[p.cat] = byCat[p.cat] || []).push(p); } });
  var out = [];
  CAT_ORDER.forEach(function (cat) { (byCat[cat] || []).forEach(function (p) { out.push(p); }); });
  Object.keys(byCat).forEach(function (cat) { if (CAT_ORDER.indexOf(cat) < 0) { byCat[cat].forEach(function (p) { out.push(p); }); } }); // future categories
  return out;
}

function blankState() {
  return { version: 1, created: now(), updated: now(), batchSize: 25, lastCompleted: null, currentCategory: null, queue: [], parts: {} };
}

function load() {
  if (!fs.existsSync(STATE_FILE)) return null;
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function save(state) { // atomic: write temp, then rename over the old file
  state.updated = now();
  var tmp = STATE_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 1));
  fs.renameSync(tmp, STATE_FILE);
}

/* Merge the live catalog into state. Never downgrades work already done. */
function sync(state) {
  // Ids are append-only (see ALIASES in src/compat.js): state keyed by a retired
  // id migrates to the current id, PRESERVING its status/history.
  Object.keys(state.parts).forEach(function (old) {
    var cur = C.ALIASES && C.ALIASES[old];
    if (!cur) return;
    if (!state.parts[cur]) { state.parts[cur] = state.parts[old]; }
    delete state.parts[old];
  });
  if (state.lastCompleted && C.ALIASES && C.ALIASES[state.lastCompleted]) state.lastCompleted = C.ALIASES[state.lastCompleted];
  var seen = {};
  workUnits().forEach(function (p) {
    seen[p.id] = true;
    if (!state.parts[p.id]) {
      state.parts[p.id] = { cat: p.cat, status: 'Pending', updated: now(), error: null, source: null, note: null };
    }
    var s = state.parts[p.id];
    s.cat = p.cat;
    if (s.tombstoned) { delete s.tombstoned; s.updated = now(); } // id came back
    if (p.verified === true && s.status !== 'Verified') { // catalog is source of truth
      s.status = 'Verified'; s.source = p.source || null; s.error = null; s.updated = now();
      s.note = s.note || 'auto-promoted: already verified in catalog';
    }
    if (p.verified !== true && s.status === 'Verified') { // flag vanished — surface it, don't hide it
      s.status = 'Pending'; s.note = 'WARNING: catalog lost verified flag - recheck'; s.updated = now();
    }
  });
  // Dropped from the catalog: TOMBSTONE, never delete — the state is the grind's
  // institutional memory (who verified what, why a part was skipped). Tombstoned
  // parts leave the queue and the counts but keep their history.
  Object.keys(state.parts).forEach(function (id) {
    var s = state.parts[id];
    if (!seen[id] && !s.tombstoned) { s.tombstoned = now(); s.updated = now(); }
  });
  rebuildQueue(state);
}

/* Resolve a user-supplied (possibly retired) id to the state key it lives under. */
function resolveId(state, id) {
  if (id && !state.parts[id] && C.ALIASES && C.ALIASES[id] && state.parts[C.ALIASES[id]]) return C.ALIASES[id];
  return id;
}

/* Group a list of catalog parts by their `source` field (largest group first).
   A part with no source field is its own singleton group (source: null) - there
   is nothing to batch it with. Pure/stateless: callers decide which population
   (the Pending queue, the priceBasis backlog, ...) to pass in. */
function groupBySource(parts) {
  var bySrc = {}, order = [];
  parts.forEach(function (p) {
    var key = p.source || ('__none__:' + p.id);
    if (!bySrc[key]) { bySrc[key] = { source: p.source || null, parts: [] }; order.push(key); }
    bySrc[key].parts.push(p);
  });
  var groups = order.map(function (k) { return bySrc[k]; });
  groups.sort(function (a, b) { return b.parts.length - a.parts.length; });
  return groups;
}

function rebuildQueue(state) { // queue = remaining work: InProgress first (crash recovery), then Pending
  var inProg = [], pending = [];
  workUnits().forEach(function (p) {
    var s = state.parts[p.id];
    if (!s) return;
    if (s.status === 'InProgress') inProg.push(p.id);
    else if (s.status === 'Pending') pending.push(p.id);
  });
  state.queue = inProg.concat(pending);
  state.currentCategory = state.queue.length ? state.parts[state.queue[0]].cat : null;
}

function counts(state) {
  var c = { Pending: 0, InProgress: 0, Verified: 0, Failed: 0, Skipped: 0, Tombstoned: 0, total: 0 };
  Object.keys(state.parts).forEach(function (id) {
    if (state.parts[id].tombstoned) { c.Tombstoned++; return; } // retired ids: history only
    c[state.parts[id].status]++; c.total++;
  });
  c.processed = c.Verified + c.Failed + c.Skipped;
  c.pct = c.total ? Math.round(c.processed / c.total * 100) : 0;
  return c;
}

function summary(state) {
  var c = counts(state);
  console.log('=== verification job summary ===');
  console.log('Verified   ' + c.Verified);
  console.log('Failed     ' + c.Failed);
  console.log('Skipped    ' + c.Skipped);
  console.log('InProgress ' + c.InProgress);
  console.log('Remaining  ' + (c.Pending + c.InProgress) + ' (queue)');
  console.log('Progress   ' + c.processed + '/' + c.total + ' processed (~' + c.pct + '% complete)');
  if (c.Tombstoned) console.log('Tombstoned ' + c.Tombstoned + ' (retired ids - history kept, not counted)');
  console.log('Current category: ' + (state.currentCategory || '(done)') + '   Last completed: ' + (state.lastCompleted || '(none)'));
  if (state.queue.length) console.log('Next up: ' + state.queue.slice(0, 5).join(', ') + (state.queue.length > 5 ? ' ... (+' + (state.queue.length - 5) + ')' : ''));
}

function requireState() {
  var state = load();
  if (!state) { console.error('No job state. Run: node tools/verify-job.js init'); process.exit(1); }
  sync(state); // resume-on-startup: always reconcile with the catalog first
  return state;
}

function arg(flag) { var i = process.argv.indexOf(flag); return i >= 0 ? (process.argv[i + 1] || true) : null; }
function has(flag) { return process.argv.indexOf(flag) >= 0; }

var cmd = process.argv[2];

if (cmd === 'init') {
  var state = load() || blankState();
  sync(state);
  save(state);
  console.log('Job state ' + (fs.existsSync(STATE_FILE) ? 'updated' : 'created') + ' at ' + path.relative(process.cwd(), STATE_FILE));
  summary(state);

} else if (cmd === 'status') {
  var state = requireState();
  save(state);
  summary(state);

} else if (cmd === 'next' && has('--by-source')) {
  var state = requireState();
  var numArgs = process.argv.slice(3).filter(function (a) { return /^\d+$/.test(a); });
  var n = numArgs.length ? parseInt(numArgs[0], 10) : 30;
  if (!state.queue.length) { console.log('Queue is empty - job complete. Run: node tools/verify-job.js report'); process.exit(0); }
  var groups = groupBySource(state.queue.map(function (id) { return C.byId(id); }));
  var top = groups.slice(0, n);
  var topRows = top.reduce(function (sum, g) { return sum + g.parts.length; }, 0);
  console.log(state.queue.length + ' queued part(s) grouped into ' + groups.length + ' source batch(es). Showing top ' + top.length + ' (' + topRows + ' part(s), ' + (top.length) + ' page visit(s)):');
  top.forEach(function (g, i) {
    console.log('\n[' + (i + 1) + '] ' + (g.source || '(no known source - verify from scratch)') + '  (' + g.parts.length + ' part' + (g.parts.length === 1 ? '' : 's') + ')');
    g.parts.forEach(function (p) {
      console.log('  ' + p.id + '  ' + p.brand + ' ' + p.model + ' (' + p.cat + ')' + (state.parts[p.id].status === 'InProgress' ? '  ** was InProgress - resume this first **' : ''));
    });
  });
  save(state);

} else if (cmd === 'next') {
  var state = requireState();
  var n = parseInt(process.argv[3], 10) || state.batchSize;
  var ids = state.queue.slice(0, n);
  if (!ids.length) { console.log('Queue is empty - job complete. Run: node tools/verify-job.js report'); process.exit(0); }
  console.log('Next ' + ids.length + ' work orders (see tools/VERIFY-PROTOCOL.md for the verification bar):');
  ids.forEach(function (id) {
    var p = C.byId(id);
    console.log('\n[' + id + '] ' + p.brand + ' ' + p.model + ' (' + p.cat + ')' + (state.parts[id].status === 'InProgress' ? '  ** was InProgress - resume this first **' : ''));
    console.log('  current: ' + JSON.stringify(p));
  });
  save(state);

} else if (cmd === 'price-basis') {
  var n = parseInt(process.argv[3], 10) || 30;
  var backlog = C.PARTS.filter(function (p) { return p.verified === true && p.priceBasis == null; });
  if (!backlog.length) { console.log('priceBasis backlog is empty - every verified row states its price basis.'); process.exit(0); }
  var groups = groupBySource(backlog);
  var top = groups.slice(0, n);
  var topRows = top.reduce(function (sum, g) { return sum + g.parts.length; }, 0);
  console.log('priceBasis backlog: ' + backlog.length + ' verified row(s) lacking priceBasis, across ' + groups.length + ' distinct source(s).');
  console.log('Top ' + top.length + ' source(s) cover ' + topRows + ' row(s) (' + Math.round(topRows / backlog.length * 100) + '% of the backlog) in ' + top.length + ' page visit(s) instead of ' + topRows + '.');
  top.forEach(function (g, i) {
    console.log('\n[' + (i + 1) + '] ' + (g.source || '(no source on file)') + '  (' + g.parts.length + ' row' + (g.parts.length === 1 ? '' : 's') + ')');
    g.parts.forEach(function (p) { console.log('  ' + p.id + '  ' + p.brand + ' ' + p.model + ' (' + p.cat + ')'); });
  });

} else if (cmd === 'start') {
  var state = requireState();
  var id = resolveId(state, process.argv[3]);
  if (!id || !state.parts[id]) { console.error('Unknown part id: ' + id); process.exit(1); }
  if (state.parts[id].status === 'Verified' && !has('--force')) { console.error(id + ' is already Verified - refusing without --force.'); process.exit(1); }
  state.parts[id].status = 'InProgress'; state.parts[id].updated = now();
  rebuildQueue(state); save(state);
  console.log(id + ' -> InProgress');

} else if (cmd === 'complete') {
  var state = requireState();
  var id = resolveId(state, process.argv[3]), status = process.argv[4];
  if (!id || !state.parts[id]) { console.error('Unknown part id: ' + id); process.exit(1); }
  if (['Verified', 'Failed', 'Skipped'].indexOf(status) < 0) { console.error('Status must be Verified | Failed | Skipped'); process.exit(1); }
  var prev = state.parts[id].status;
  if (prev === 'Verified' && !has('--force')) { console.error(id + ' is already Verified - refusing to change without --force.'); process.exit(1); }
  var s = state.parts[id];
  s.status = status; s.updated = now();
  s.error = arg('--error') || null;
  s.note = arg('--note') || s.note;
  s.source = arg('--source') || s.source;
  state.lastCompleted = id;
  rebuildQueue(state); save(state);
  console.log(id + ': ' + prev + ' -> ' + status);
  var c = counts(state);
  console.log('Progress: ' + c.processed + '/' + c.total + ' (~' + c.pct + '%), ' + (c.Pending + c.InProgress) + ' remaining');

} else if (cmd === 'reset') {
  var state = requireState();
  var target = process.argv[3];
  var ids = [];
  if (target === '--failed') ids = Object.keys(state.parts).filter(function (id) { return state.parts[id].status === 'Failed' && !state.parts[id].tombstoned; });
  else if (target === '--skipped') ids = Object.keys(state.parts).filter(function (id) { return state.parts[id].status === 'Skipped' && !state.parts[id].tombstoned; });
  else if (target && state.parts[resolveId(state, target)]) ids = [resolveId(state, target)];
  else { console.error('Usage: reset --failed | --skipped | <part-id> [--force]'); process.exit(1); }
  var blocked = ids.filter(function (id) { return state.parts[id].status === 'Verified' && !has('--force'); });
  if (blocked.length) { console.error('Refusing to reset Verified parts without --force: ' + blocked.join(', ')); process.exit(1); }
  ids.forEach(function (id) { state.parts[id].status = 'Pending'; state.parts[id].error = null; state.parts[id].updated = now(); });
  rebuildQueue(state); save(state);
  console.log('Reset to Pending: ' + (ids.join(', ') || '(none)'));

} else if (cmd === 'retry') {
  var state = requireState();
  var failed = Object.keys(state.parts).filter(function (id) { return state.parts[id].status === 'Failed' && !state.parts[id].tombstoned; });
  if (!failed.length) { console.log('No failed parts.'); process.exit(0); }
  console.log('Failed parts (' + failed.length + '):');
  failed.forEach(function (id) { console.log('  ' + id + '  - ' + (state.parts[id].error || '(no error recorded)')); });
  console.log('\nRetry command:  node tools/verify-job.js reset --failed');

} else if (cmd === 'report') {
  var state = requireState();
  save(state);
  var c = counts(state);
  console.log('=== verification job report ===');
  console.log('Total parts        ' + c.total);
  console.log('Total processed    ' + c.processed + ' (' + c.pct + '%)');
  console.log('  Verified         ' + c.Verified);
  console.log('  Skipped (policy) ' + c.Skipped);
  console.log('  Failed           ' + c.Failed);
  console.log('Success rate       ' + (c.processed ? Math.round(c.Verified / c.processed * 100) : 0) + '% of processed');
  var failed = Object.keys(state.parts).filter(function (id) { return state.parts[id].status === 'Failed' && !state.parts[id].tombstoned; });
  if (failed.length) {
    console.log('\nFailed items:');
    failed.forEach(function (id) { console.log('  ' + id + '  - ' + (state.parts[id].error || '(no error recorded)')); });
    console.log('\nRetry command:  node tools/verify-job.js reset --failed');
  }
  var skipped = Object.keys(state.parts).filter(function (id) { return state.parts[id].status === 'Skipped' && !state.parts[id].tombstoned; });
  if (skipped.length) {
    console.log('\nSkipped (policy - e.g. manufacturer publishes no weight):');
    skipped.forEach(function (id) { console.log('  ' + id + '  - ' + (state.parts[id].note || '(no reason recorded)')); });
  }

} else {
  console.log('Usage: node tools/verify-job.js <init|status|next|next --by-source|price-basis|start|complete|reset|retry|report>');
  console.log('See the header of this file and tools/VERIFY-PROTOCOL.md for details.');
  process.exit(cmd ? 1 : 0);
}
