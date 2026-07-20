'use strict';
/* Recall watcher (Feature slate #4, 2026-07-20) — the pure join between the
   recall-watchdog corpus (tools/recalls/RECALL-LOG.md) and a rider's owned
   parts. Proves the join logic itself (lookup, ordering, no-match) and that
   every entry in RECALL_NOTES still points at a part id that actually exists
   in the live catalog — a hand-maintained table can silently drift stale as
   the catalog changes ids. */
var RN = require('../src/recall-notes.js');
var C = require('../src/compat.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

test('every RECALL_NOTES part id exists in the live catalog', function(){
  RN.RECALL_NOTES.forEach(function(note){
    note.partIds.forEach(function(id){
      ok(C.byId(id), 'recall note ' + note.recallId + ' points at missing part id ' + id);
    });
  });
});

test('recallNoteForPartId finds a known recalled part', function(){
  var note = RN.recallNoteForPartId('fr-transition-tr11-alloy');
  if(!note) throw new Error('expected a recall note for the TR11 Alloy frame');
  eq(note.recallId, 'RCL-12');
  ok(note.scopeNote.indexOf('TBC48') !== -1, 'scope note should carry the serial-range caveat');
});

test('the RCL-12 complete bike is covered, not just the frame (ledger names both)', function(){
  var note = RN.recallNoteForPartId('cb-transition-tr11-alloy-gx');
  if(!note) throw new Error('expected the TR11 Alloy GX complete bike to carry RCL-12');
  eq(note.recallId, 'RCL-12');
});

test('recallNoteForPartId returns null for an unrecalled part and for empty input', function(){
  eq(RN.recallNoteForPartId('fr-raaw-madonna-v3'), null);
  eq(RN.recallNoteForPartId(''), null);
  eq(RN.recallNoteForPartId(undefined), null);
});

test('recallNoticesForOwnedParts joins only owned ids that have a note, preserving input order', function(){
  var hits = RN.recallNoticesForOwnedParts([
    'gr-race-face-atlas',            // not recalled
    'fr-transition-tr11-alloy',      // recalled
    'ti-maxxis-minion-dhf-29-24-3c-maxxgrip-exo' // not recalled
  ]);
  eq(hits.length, 1);
  eq(hits[0].partId, 'fr-transition-tr11-alloy');
  eq(hits[0].note.recallId, 'RCL-12');
});

test('recallNoticesForOwnedParts returns empty for an empty or all-clean inventory', function(){
  eq(RN.recallNoticesForOwnedParts([]).length, 0);
  eq(RN.recallNoticesForOwnedParts(['gr-race-face-atlas']).length, 0);
});
