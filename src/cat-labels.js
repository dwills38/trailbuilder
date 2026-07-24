/* ==========================================================================
   cat-labels.js — the rider-facing name for a catalog category key.

   Display only. `cat` values are the schema's machine tokens ('frontwheel',
   'bb', 'pedal'); this is the ONE place that turns them into the words a rider
   reads ("Front Wheel", "Bottom Bracket", "Pedals"). It feeds nothing in
   checkBuild and never affects a verdict.

   WHY IT IS ITS OWN FILE (2026-07-24)
   The map lived inline in index.html. garage.html (the garage/inventory/service
   page split out of index.html's modal + inventory view) renders inventory rows
   that need the same words. Copying the map would mean two lists that drift the
   first time a category is added — the exact failure src/page-shell.js exists to
   prevent for the chrome. It does NOT belong in src/compat.js (an engine file:
   no display strings) nor in src/ui-common.js (shared with KitBuilder, whose
   catalog has entirely different categories).

   Plain browser JS, classic <script>, no build step — the project convention.
   ========================================================================== */

/** cat key -> rider-facing label. A key that is absent falls through to the raw
 *  token via tbCatLabel(), which is honest: an unlabelled new category shows its
 *  real name rather than a guess.
 *  @type {Record<string,string>} */
var TB_CAT_LABEL = {
  frame: 'Frame', fork: 'Fork', shock: 'Rear Shock',
  frontwheel: 'Front Wheel', rearwheel: 'Rear Wheel',
  fronthub: 'Front Hub', rearhub: 'Rear Hub', rim: 'Rim',
  tire: 'Tires', shifter: 'Shifter', derailleur: 'Derailleur',
  cassette: 'Cassette', chain: 'Chain', crankset: 'Crankset',
  brake: 'Brake', rotor: 'Rotor', handlebar: 'Handlebar', stem: 'Stem',
  grips: 'Grips', dropper: 'Dropper', saddle: 'Saddle', pedal: 'Pedals',
  bb: 'Bottom Bracket', headset: 'Headset',
  cog: 'Single-Speed Cog', seatpost: 'Seatpost',
  groupset: 'Groupset', wheelset: 'Wheelset', brakeset: 'Brake set',
  cockpitset: 'Cockpit kit', completebike: 'Complete Bike'
};

/** @param {string} c @returns {string} */
function tbCatLabel(c) { return TB_CAT_LABEL[c] || c; }

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TB_CAT_LABEL: TB_CAT_LABEL, tbCatLabel: tbCatLabel };
}
