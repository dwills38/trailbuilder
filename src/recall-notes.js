/* ==========================================================================
   recall-notes.js — pure join between the recall-watchdog corpus
   (tools/recalls/RECALL-LOG.md) and a rider's owned parts (garage/
   inventory). Read-only: this module records recall facts already
   researched and cited in the ledger, it does not fetch or judge anything
   itself, and it never touches the compat engine or catalog rows.

   Scope: only recalls the ledger marked CONFIRMED MATCH or NAME MATCH,
   GENERATION UNCONFIRMED against a part id that is actually live in the
   MTB catalog today (src/compat.js — the only catalog this app serves;
   CLAUDE.md keeps BMX/road/gravel/striders/emtb off-live). A ledger entry
   against an off-live catalog (e.g. RCL-9's data/road.js hit) has no live
   part id and so is not listed here — nothing to join against yet.

   Honest framing (recall-watchdog INDEX.md rule 2 + PROTOCOL.md): a recall
   scopes specific serial/production ranges, not every unit of a model ever
   sold. `scopeNote` carries that caveat verbatim into the UI so a rider
   isn't told "your bike is recalled" when only a subset of serials are.

   Adding an entry: only after a new RCL-n ledger entry reaches CONFIRMED
   MATCH or NAME MATCH on a part id that exists in the current live
   catalog (verify with byId() first — a ledger entry can predate a catalog
   rename/retirement). This module is intentionally NOT auto-derived from
   the ledger (the ledger's prose isn't structured data); keep the two in
   sync by hand whenever the ledger changes a live-catalog verdict.
   ========================================================================== */

/**
 * @typedef {Object} RecallNote
 * @property {string} recallId - stable RCL-n id from tools/recalls/RECALL-LOG.md
 * @property {string[]} partIds - live catalog part ids this note applies to
 * @property {string} confidence - 'CONFIRMED MATCH' | 'NAME MATCH, GENERATION UNCONFIRMED'
 * @property {string} hazard - one-line hazard description (paraphrased, ledger discipline)
 * @property {string} scopeNote - the serial/date-range caveat, honest-framing rule
 * @property {string} remedy - one-line remedy description
 * @property {string} sourceLabel - human label for the citation
 * @property {string} sourceUrl - the regulator/manufacturer source URL
 */

/** @type {RecallNote[]} */
var RECALL_NOTES = [
  {
    recallId: 'RCL-12',
    partIds: ['fr-transition-tr11-alloy'],
    confidence: 'CONFIRMED MATCH',
    hazard: 'Chainstay yoke weld may not have been heated sufficiently during welding, which can lead to poor weld penetration and premature failure.',
    scopeNote: 'Scoped to frames with serial numbers TBC4801XXX, TBC4802XXX, or TBC4803XXX — not every TR11 Alloy ever sold. Check your frame’s serial number against those ranges before assuming this applies to your bike.',
    remedy: 'Free replacement chainstay from Transition Bikes; affected owners were instructed to stop riding until replaced.',
    sourceLabel: 'Transition Bikes manufacturer recall notice, July 2023 (quoted via Pinkbike after the notice page was retired)',
    sourceUrl: 'https://www.pinkbike.com/news/transition-issues-voluntary-recall-of-tr11-alloy-frames.html'
  }
];

/** @param {string} [partId] @returns {?RecallNote} */
function recallNoteForPartId(partId){
  if(!partId) return null;
  for(var i = 0; i < RECALL_NOTES.length; i++){
    if(RECALL_NOTES[i].partIds.indexOf(partId) !== -1) return RECALL_NOTES[i];
  }
  return null;
}

/**
 * Join a list of owned part ids (already canonicalized) against the recall
 * notes. Returns one entry per owned part id that has a note, in input order.
 * @param {string[]} partIds
 * @returns {Array<{partId:string, note:RecallNote}>}
 */
function recallNoticesForOwnedParts(partIds){
  /** @type {Array<{partId:string, note:RecallNote}>} */
  var out = [];
  (partIds || []).forEach(function(id){
    var note = recallNoteForPartId(id);
    if(note) out.push({ partId: id, note: note });
  });
  return out;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RECALL_NOTES:RECALL_NOTES, recallNoteForPartId:recallNoteForPartId, recallNoticesForOwnedParts:recallNoticesForOwnedParts };
}
