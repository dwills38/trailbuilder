/* =============================================================================
   TrailBuilder - SHARED VERDICT / DISPLAY PRIMITIVES
   -----------------------------------------------------------------------------
   The handful of leaf helpers that EVERY builder page shares, split out of
   src/compat.js (2026-07-23) so the non-MTB pages stop paying for the MTB
   catalog to get them.

   WHY THIS FILE EXISTS: src/compat.js is ~7 MB raw / ~1.5 MB gzipped, and all
   but a sliver of that is the MTB `PARTS` catalog. bmx.html, road.html and
   gravel.html used to load the whole thing to reach three functions, so a BMX
   visitor downloaded 5,000+ mountain-bike rows they can never see. Those pages
   now load THIS file instead; index.html loads this file AND compat.js.

   THE ONE RULE HERE: every symbol must be a pure LEAF - no catalog reads, no
   dependency on anything in compat.js - because this file loads FIRST and must
   stand alone. Nothing else belongs here; a helper that needs PARTS or the
   engine stays in compat.js.

   DUAL BROWSER/NODE CONSUMPTION (load order is load-bearing):
     · browser - a classic <script> whose top-level declarations become globals.
       It MUST be tagged BEFORE src/compat.js, src/compat-bmx.js and
       src/compat-road.js, because those read the primitives off globalThis at
       PARSE TIME (see each engine's `_mtbShared`/`_mtbSharedRoad`).
     · node - require('./verdict-core.js'). compat.js also RE-EXPORTS all four
       symbols, so the long-standing require('./compat.js').Verdict surface the
       tests and tools use keeps working unchanged.

   Exactly ONE definition of each symbol lives here. Never copy Verdict: the
   dots and the build-diff dedup key on verdictKey/instanceof identity, and a
   second constructor would silently break both.
   ========================================================================== */

/** @typedef {import('./types.js').Verdict} VerdictShape */

/* ---- Structured verdicts ------------------------------------------------- */
/* (DATA-MODEL-REVIEW 5.1-18): every finding carries a stable ruleId + the slot
   keys involved, replacing string identity. The REVIEW.md #4/#13 maskings were
   BYTE-IDENTICAL STRINGS raised by different conflicts; the dots now diff on
   verdictKey (ruleId+slots+msg), which cannot collide across different slot
   sets. msg stays the display string (and toString), so the UI/report code
   keeps interpolating verdicts unchanged. `fix` is reserved for the "fits with
   adapter X" tier - adapter facts are properties of standards PAIRS and belong
   in a future engine-side table, never on parts. */
/** @constructor @param {string} ruleId @param {string[]} slots @param {string} msg @param {{kind: string, name: string}} [fix] */
function Verdict(ruleId, slots, msg, fix){ this.ruleId=ruleId; this.slots=slots; this.msg=msg; this.fix=fix; }
Verdict.prototype.toString = function(){ return this.msg; };

/** Identity for conflict diffing. @param {VerdictShape} v @returns {string} */
function verdictKey(v){ return v.ruleId+'|'+v.slots.join('+')+'|'+v.msg; }

/* ---- Shared display helpers ---------------------------------------------- */
/** Escape a value for safe interpolation into HTML (element AND attribute text).
 * @param {*} s @returns {string} */
function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Uniform in-place Fisher-Yates shuffle. `arr.sort(() => Math.random() - 0.5)`
 * is NOT uniform (comparator-sort shuffles are engine-dependent and biased
 * toward certain orderings), which would quietly reintroduce the exact
 * catalog-ordering bias this exists to remove. Returns the same array
 * (mutated) for convenient chaining. `rng` defaults to Math.random; pass a
 * seeded generator (e.g. mulberry32, which stays in compat.js next to the
 * sample-build generator that needs it) for deterministic tests.
 * @template T @param {T[]} arr @param {function(): number} [rng] @returns {T[]} */
function fisherYatesShuffle(arr, rng){
  var rand = rng || Math.random;
  for(var i = arr.length - 1; i > 0; i--){
    var j = Math.floor(rand() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

/* ---- Export for Node tests/tools (ignored by the browser) ---------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Verdict:Verdict, verdictKey:verdictKey, esc:esc, fisherYatesShuffle:fisherYatesShuffle };
}
