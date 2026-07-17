/* ==========================================================================
   format-sizes.js — renders a frame's `sizes` map ({S:{seatTubeLen,
   maxInsert},...}) as a readable "S: 380 mm seat tube · M: 410 mm seat tube"
   line for the part-detail modal, replacing a raw JSON.stringify dump.
   Generic over whatever keys a given size carries (varies per frame) rather
   than assuming seatTubeLen/maxInsert are both present.

   Landed in index.html (9a58087) after tools/CODE-QUALITY-AUDIT-2026-07-16.md
   was branched, so the audit filed it UNAUDITED (U-1) rather than reviewing
   it — that finding recommended exactly this: move it out of the inline
   <script> into a small pure/tested module, same as the audit's H-2/H-3 fix.

   `esc` (HTML-escaping) is passed explicitly rather than read off a global —
   this file has no load-order dependency on compat.js, and every value here
   is interpolated by the caller, so escaping the hostile case is still
   pinned in Node without loading a DOM. ========================================================================== */

/** @type {Object.<string,string>} */
var SIZE_FIELD_LABELS = { seatTubeLen:'seat tube', maxInsert:'max insert' };

/** @param {Object.<string, Object.<string, number>>} sizes
 * @param {function(string):string} esc
 * @returns {string} */
function formatSizes(sizes, esc){
  return Object.keys(sizes).map(function(sz){
    var fields = sizes[sz] || {};
    var bits = Object.keys(fields).map(function(k){
      return fields[k] + ' mm ' + (SIZE_FIELD_LABELS[k] || k);
    });
    return esc(sz) + ': ' + esc(bits.join(', '));
  }).join(' · ');
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SIZE_FIELD_LABELS:SIZE_FIELD_LABELS, formatSizes:formatSizes };
}
