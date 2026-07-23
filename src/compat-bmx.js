'use strict';
/* =============================================================================
   BMX COMPATIBILITY ENGINE — checkBmxBuild  (LIVE since 2026-07-17)
   -----------------------------------------------------------------------------
   *** LOADED ONLY BY bmx.html ("BuildMyBMX"), a separate root page. *** index.html
   still does not reference this file — the MTB app's own behavior is untouched.
   Wired live on Douglas's explicit go-live word (CLAUDE.md hard rule 3).

   ARCHITECTURE (Douglas's sign-off, 2026-07-13 — data/DJ-BMX-COMPAT-ANALYSIS.md
   section 3, Option b): BMX is structurally alien to MTB (BB shells, drivers,
   1/8in chain, pegs, gyro, U-brake bosses share NOTHING with the MTB ruleIds),
   so it gets its OWN small engine + GROUPS/SLOTS/VOCAB here, while REUSING the
   proven verdict primitives from src/compat.js (the Verdict constructor +
   verdictKey — shared, never copied). Verdict shape, {errors,warnings,infos}
   return, and the dormant-rule discipline are identical to checkBuild's.

   THE BAR (same as the MTB engine): a false "won't fit" OR a false "fits" is
   worse than a missing rule. Every rule below either (a) rests on a
   definitional standards fact (press-fit shell diameters, peg bores, driver
   body types), (b) is a WARNING/INFO that cannot false-block, or (c) lands
   DORMANT behind an explicit sourced field no row carries yet (gyro tabs,
   dual-cable brakes, tire clearance) — see the per-rule notes. Provisional
   severities adopted from the analysis doc's section 5 leans (Q4-Q10) are
   marked PROVISIONAL and await the mechanic review.

   Data lives in data/bmx.js (BMX_PARTS — also off-live). This module is
   deliberately DATA-AGNOSTIC: it never reads a catalog, only the build map it
   is handed, so the two files can ship/split independently.
   ========================================================================== */

/* Shared verdict primitives: in Node (tests/CLI) via require; in the browser
   src/verdict-core.js loads as a classic <script> BEFORE this file and its
   top-level declarations are globals. Load order is load-bearing - the two
   reads below happen at PARSE TIME, so a verdict-core.js tag placed after this
   one yields undefined and every BMX verdict silently vanishes.

   Sourced from verdict-core.js, NOT compat.js (2026-07-23): these primitives
   are all this engine ever wanted, and bmx.html no longer loads the ~7 MB MTB
   catalog to reach them. compat.js still re-exports them for older callers. */
/** @type {{Verdict: new (ruleId: string, slots: string[], msg: string, fix?: {kind: string, name: string}) => any, verdictKey: (v: any) => string}} */
var _mtbShared = (typeof module !== 'undefined' && module.exports)
  ? require('./verdict-core.js')
  : /** @type {any} */ (globalThis);
var BmxVerdict = _mtbShared.Verdict;
var bmxVerdictKey = _mtbShared.verdictKey;

/* ---- Vocab (analysis-doc section 4-BMX, reconciled with the data/bmx.js
        field conventions; documentation + future-validator reference — the
        engine itself compares values, it never gates on this table) -------- */
var BMX_VOCAB = {
  wheel:       ['20', '24', '18', '16', '26'],     // 20 standard; 24 cruiser; 18/16 junior; 26 trails-cruiser niche
  /* 'bb86'/'bb30'/'pf30' added vocab-race (2026-07-23): real BMX RACE press-fit
     BB shells used on Pro-size race frames, distinct from the four freestyle/
     old-school shells. LUX BMX's own BB-type guide (help.luxbmx.com/en-US/bb-type)
     states pro-sized race frames use BB86 "employed by a lot of the major brands,"
     with others "utilising the BB30 type, or PF30," while Euro (threaded) is for
     "Expert XL and smaller" youth frames. All three are exact-match shells for the
     bmx-bb-shell rule (a BB86 bearing set does not press into a PF30/BB30 bore),
     same as the existing four. NOTE: some current race rows (e.g. the GT Speed
     Series Pro) were entered as 'spanish' as the nearest press-fit token before
     these existed — re-tokenizing those rows is a DATA task for the follow-up
     catalog chip, NOT this vocab pass (this chip adds no data rows). */
  bbShell:     ['mid', 'spanish', 'american', 'euro', 'bb86', 'bb30', 'pf30'],
  /* crank spindles: 19mm (modern freestyle default), 22mm (Profile/Primo HD),
     24mm, 30mm (Profile Elite AL — VERIFIED on profileracing.com 2026-07-11,
     a real value the analysis doc's draft list missed), 48-spline legacy. */
  spindle:     ['19mm', '22mm', '24mm', '30mm', '48-spline'],
  crankPieces: ['1-piece', '2-piece', '3-piece'],
  /* '15mm'/'20mm' added vocab-race (2026-07-23, coordinator-authorized BMX-race
     go-live): real BMX RACE axle standards beyond the 3/8in(10mm)/14mm freestyle
     pair. Modern disc race runs a 15mm thru-axle (Redline Project 79 put a 15mm
     axle in the REAR "for 20% more stiffness"); 20mm race hubs are a long-standing
     option (Profile Elite 20mm front hub). Both are DIRECTLY documented by the
     conversion-kit products that step them down to 3/8in: Profile Racing's
     "HUB AXLE CONVERSION KIT - 15mm/20mm dropout to 3/8in bolt"
     (profileracing.com/product/hub-axle-conversion-kit-15mm20mm-38/) and Speedline/
     Supercross's "20mm to 3/8in" and "15mm - 3/8in" Pro Frame Adapter axle kits
     (supercrossbmx.com). 3/8in and 10mm stay ONE token (analysis-doc Q8 lean).
     The bmx-axle rule below reads these numerically (hub vs dropout, direction-
     aware) — the adapter direction is exactly these kits. Peg bores stay 10/14
     only (schema-bmx.js LOCAL_VOCAB.pegAxle), never widened by this. */
  axle:        ['10mm', '14mm', '15mm', '20mm'],
  driverType:  ['cassette', 'freecoaster', 'freewheel'],   // 'freewheel' = legacy thread-on, vocab-only until sourced rows exist (Q5 lean)
  chainPitch:  ['1/8', '3/32'],                    // data/bmx.js field name: `pitch`
  /* 'disc' added 2026-07-17 (depth-4, coordinator-authorized): a rotor + caliper mount on
     modern race BMX (Redline Proline Flight / Chase RSP5.0-Edge class) - post/flat-mount,
     structurally unrelated to u-brake bosses or v-brake posts. DO NOT CONFLATE: a disc frame
     cannot take a u-brake or v-brake caliper and vice versa - the existing bmx-rear-brake-mount
     / bmx-front-brake-mount exact-match rules already enforce this once the token exists; no
     rule changes needed, only the vocab widen + data. */
  brakeMount:  ['u-brake', 'v-brake', 'caliper', 'disc', 'none'],  // frame/fork bosses AND brake type share the token set
  headTube:    ['integrated-1-1/8', 'mid', 'threaded', 'integrated-1', 'integrated-tapered-1-1/8-1.5', 'threadless-1-1/8'],    // display-only per the analysis doc's Q9 lean (PROVISIONAL) — no headset rule fires
  // 'threadless-1-1/8' added vocab-race (2026-07-23): the plain NON-integrated
  // 1-1/8" threadless "external cup" (EC/Ahead) headset — a real, common standard
  // on budget FREESTYLE completes that the integrated/mid/threaded set lacked (the
  // gap bmx-breadth-7 hit on Diamondback + Elite). Distinct from 'integrated-1-1/8'
  // (bearings drop straight into a machined head tube, no cups) and from 'mid'
  // (semi-integrated): here two cups PRESS into a plain (non-machined) head tube
  // and the bearings sit in the cups. Sourced: the Diamondback Grind ships an
  // "FSA 1-1/8in threadless" headset and Diamondback's own DBX002 SKU is a
  // "Threadless - External Cup (EC)" 1-1/8in unit; retail tech pages (Dan's Comp
  // "BMX Headset Types," Planet BMX / Porkchop "1-1/8in Threadless" categories)
  // treat it as its own standing class. Head-tube fact + fork-steerer + standalone
  // headset fit all share this token, same as every other headTube value.
  // 'integrated-1' and 'integrated-tapered-1-1/8-1.5' added vocab-tier1 (2026-07-22) —
  // real, maker-sourced integrated head tube classes distinct from the existing plain
  // 'integrated-1-1/8' token, both directly FETCHED off Speedline Parts' own product
  // pages (supercrossbmx.com, the brand's authorized storefront): the "1\" Mini Headsets"
  // page states this bore is "typically used on Micro, Mini, Junior, Expert, or Any Campy
  // Style Integrated Frame you wish to use a 1\" Fork and Stem on" (bare 1in, no taper);
  // the "Tapered Sealed Bearing Integrated BMX Racing Headset" page states verbatim
  // "designed to work with all 'Campy' style integrated headtube frames that taper from
  // 1 1/8\" on the top to 1.5\" on the bottom" (a genuinely wider class than the plain
  // 1-1/8in token — never conflated).
  seatSystem:  ['pivotal', 'standard', 'stealth'],
  // 'stealth' added vocab-tier1 (2026-07-22) — the Kink/Mission one-bolt mechanism: no
  // top slotted patch on the seat, the anchoring bolt threads from the bottom through a
  // Stealth-specific post (a long Allen wrench can still reach a Pivotal post from the
  // top instead, just less conveniently). Kink's own product page states verbatim
  // "System | Stealth" (a named third system, distinct from Pivotal) AND "You can also
  // use traditional Pivotal seats with Stealth seat posts"; Mission's own Carrier Stealth
  // seat page confirms the reverse too. See the bmx-seat-system rule below for how the
  // real cross-compatibility with 'pivotal' is modeled — a plain exact-match would
  // false-error a fit that actually works both directions.
  clamp:       ['22.2mm', '25.4mm'],               // BMX bar clamp: 22.2 standard, 25.4 "oversized" — display-only per section 2b (no clamp rule)
  side:        ['RHD', 'LHD', 'both']              // hub drive side — rider preference, display-only
};

/* ---- Groups / slots (structured like compat.js's GROUPS; brakeless / peg-less
        / gyro-less are real complete builds, so those slots are OPTIONAL —
        Douglas's explicit 2026-07-13 decision: the engine must NEVER require a
        brake on these types) -------------------------------------------------- */
/** @type {Array<{key: string, label: string, slots: Array<{key: string, label: string, cat: string, optional?: boolean}>}>} */
var BMX_GROUPS = [
  { key:'frame', label:'Frame', slots:[ {key:'frame', label:'Frame', cat:'frame'} ] },
  { key:'fork', label:'Fork', slots:[ {key:'fork', label:'Fork', cat:'fork'} ] },
  /* frames near-universally ship/keep a headset — optional, like the MTB headset slot */
  { key:'headset', label:'Headset', slots:[ {key:'headset', label:'Headset', cat:'headset', optional:true} ] },
  { key:'drive', label:'Drive', slots:[
      {key:'cranks', label:'Cranks', cat:'cranks'},
      /* BB optional: completeness never blocks on it — the bmx-bb advisory info
         nudges until one is picked (the MTB rule-7 pattern) */
      {key:'bb', label:'Bottom Bracket', cat:'bb', optional:true},
      {key:'sprocket', label:'Sprocket', cat:'sprocket'},
      {key:'chain', label:'Chain', cat:'chain'},
      /* rear cog optional: cassette/freecoaster hubs SHIP with a driver cog
         (data/bmx.js hubs carry driverTeeth) — an aftermarket cog is a swap,
         not a required pick (the integrated-cassette slotRequired pattern) */
      {key:'rearCog', label:'Rear Cog', cat:'rearCog', optional:true} ] },
  { key:'wheels', label:'Wheels', slots:[
      {key:'frontWheel', label:'Front Wheel', cat:'frontWheel'},
      {key:'rearWheel', label:'Rear Wheel / Hub', cat:'rearWheel'} ] },
  { key:'tires', label:'Tires', slots:[
      {key:'frontTire', label:'Front Tire', cat:'tire'},
      {key:'rearTire', label:'Rear Tire', cat:'tire'} ] },
  /* BRAKELESS IS A VALID COMPLETE BUILD (decision 3, 2026-07-13): every brake
     slot — and the gyro that only exists to serve a rear brake — is optional. */
  { key:'brakes', label:'Brakes', slots:[
      {key:'frontBrake', label:'Front Brake', cat:'brake', optional:true},
      {key:'rearBrake', label:'Rear Brake', cat:'brake', optional:true},
      {key:'gyro', label:'Gyro / Detangler', cat:'gyro', optional:true} ] },
  { key:'pegs', label:'Pegs', slots:[
      {key:'pegsFront', label:'Front Pegs', cat:'pegs', optional:true},
      {key:'pegsRear', label:'Rear Pegs', cat:'pegs', optional:true} ] },
  { key:'cockpit', label:'Cockpit', slots:[
      {key:'handlebar', label:'Handlebar', cat:'handlebar'},
      {key:'stem', label:'Stem', cat:'stem'},
      {key:'grips', label:'Grips', cat:'grips', optional:true} ] },
  { key:'seat', label:'Seat', slots:[
      {key:'seat', label:'Seat', cat:'seat'},
      {key:'seatpost', label:'Seatpost', cat:'seatpost'} ] },
  { key:'pedals', label:'Pedals', slots:[ {key:'pedals', label:'Pedals', cat:'pedals'} ] }
];
/** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */
var BMX_SLOTS = BMX_GROUPS.reduce(function(a, g){
  return a.concat(g.slots.map(function(s){ return Object.assign({group: g.key}, s); }));
}, /** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */ ([]));

/* ---- legacy id aliases -----------------------------------------------------
   Same APPEND-ONLY contract as the MTB catalog (DATA-MODEL-REVIEW.md §3.1,
   mirrored here verbatim): a BMX id is never renamed or reused. When a row
   must be retired, the old id RETIRES into this map (old -> current) instead
   of being deleted, and every id-shaped input this builder reads resolves
   through canonicalBmxId first — same single-hop, no-chaining contract as
   compat.js's ALIASES/canonicalId (test/test-ids.js's last 4 cases, mirrored
   for BMX by test/test-bmx-aliases.js).

   Kept here rather than in data/bmx.js on purpose, even though the ids named
   below are catalog facts: this table is a pure string->string map that never
   reads BMX_PARTS (canonicalBmxId doesn't either), so it costs this file
   nothing to hold it, and it keeps the whole alias contract — table +
   resolver — in one place the way compat.js keeps ALIASES next to
   canonicalId. data/bmx.js and this file stay ship/split-independent per this
   file's header.

   SEEDED 2026-07-2x with the 3 BMX id removals that predate this mechanism
   (PROJECT-LOG 2026-07-21 requires ALIASES for any removal from here on;
   these three are grandfathered in by this seed since no mechanism existed
   yet when they happened):
     - catalog/bmx-hygiene-1 (2026-07-20) split the single generic Colony
       Rick/Guardian bar rows into 2 real rise/width variants each and
       removed the 2 generic ids outright (commit b6b25f3). Nearest-variant
       picks below: both new Rick rows share the old row's guessed rise (8in)
       but only rick-93-29 shares its width (29in) exactly, so width (the
       dimension the old guess got right) breaks the tie; the two Guardian
       rows both match the old width (29in) exactly, so rise breaks the tie
       there instead (8in guess vs 8.8in, closer than the 9.4in sibling).
     - the 2026-07-17 preflight audit deduped bmx-gr-odyssey-keyboard into
       bmx-gr-odyssey-aaronross — both rows were the same real product (the
       Odyssey Keyboard v1 Grip, Aaron Ross's signature colorway); aaronross
       is the one re-fetched against shop.odysseybmx.com and kept. */
/** @type {Object.<string, string>} */
var BMX_ALIASES = {
  'bmx-hb-colony-rick': 'bmx-hb-colony-rick-93-29',
  'bmx-hb-colony-guardian': 'bmx-hb-colony-guardian-88-29',
  'bmx-gr-odyssey-keyboard': 'bmx-gr-odyssey-aaronross'
};
/** @param {string|null|undefined} id @returns {string|null|undefined} */
function canonicalBmxId(id){ return (id && Object.prototype.hasOwnProperty.call(BMX_ALIASES, id)) ? BMX_ALIASES[id] : id; }

/* Is this slot required for a "complete" BMX build? UI-completeness only —
   never a fit verdict (mirrors compat.js's slotRequired contract). BMX needs
   no frame-dependent drops: the optionality is static (brakes/gyro/pegs/bb/
   rearCog/headset/grips), and brakes are never required by design. */
/** @param {{optional?: boolean}} slot @returns {boolean} */
function bmxSlotRequired(slot){
  return !slot.optional;
}

/* Input honesty guard (the compat.js resolveBuild lesson, minus the catalog
   coupling): a build of id STRINGS would trip no rule at all — every field
   read is undefined — and return a silent false all-clear. This engine holds
   no catalog, so strings are simply rejected. */
/** @param {Object.<string, any>|null|undefined} build @returns {Object.<string, any>} */
function resolveBmxBuild(build){
  /** @type {Object.<string, any>} */ var out = {};
  var src = build || {};
  Object.keys(src).forEach(function(k){
    var v = src[k];
    if(typeof v === 'string') throw new TypeError('bmx build.' + k + ' is a string ("' + v + '") - pass part objects, not ids (this engine holds no catalog to resolve them).');
    if(v) out[k] = v;
  });
  return out;
}

/** @param {any} p @returns {string} */
function bmxNameOf(p){ return p ? (p.brand + ' ' + p.model) : ''; }

/* =============================================================================
   checkBmxBuild(build) -> { errors, warnings, infos } of shared Verdicts.
   build: slotKey (see BMX_SLOTS) -> part object from data/bmx.js's field
   conventions. Rules BMX-1..BMX-8 of data/DJ-BMX-COMPAT-ANALYSIS.md section 2a;
   BMX-9 (headset) is display-only per the Q9 lean, and gear ratio is the
   display-only helper below (Q10) — neither ever produces a verdict.
   ========================================================================== */
/** @param {Object.<string, any>|null|undefined} build @returns {{errors: any[], warnings: any[], infos: any[]}} */
function checkBmxBuild(build){
  /** @type {any[]} */ var errors = [];
  /** @type {any[]} */ var warnings = [];
  /** @type {any[]} */ var infos = [];
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function err(ruleId, slots, msg){ errors.push(new BmxVerdict(ruleId, slots, msg)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg @param {{kind: string, name: string}} [fix] */
  function warn(ruleId, slots, msg, fix){ warnings.push(new BmxVerdict(ruleId, slots, msg, fix)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function info(ruleId, slots, msg){ infos.push(new BmxVerdict(ruleId, slots, msg)); }

  var b = resolveBmxBuild(build);
  var frame = b.frame, fork = b.fork, cranks = b.cranks, bb = b.bb, sprocket = b.sprocket,
      chain = b.chain, rearCog = b.rearCog, fWheel = b.frontWheel, rWheel = b.rearWheel,
      fTire = b.frontTire, rTire = b.rearTire, fBrake = b.frontBrake, rBrake = b.rearBrake,
      gyro = b.gyro, pegsF = b.pegsFront, pegsR = b.pegsRear, seat = b.seat, post = b.seatpost;

  /* BMX-7. Wheel size — frame/fork/front wheel/tires must agree (rear "wheel"
        rows in data/bmx.js are HUBS and carry no wheelSize, so the rear side is
        checked via the tire). Definitional; ERROR. Same SHAPE as the MTB
        wheel-config rule, deliberately a different ruleId over a disjoint
        vocab (never reuse an MTB ruleId here — analysis doc section 2). */
  /** @type {Array<[string, string, string]>} */ var ws = [];
  if(frame && frame.wheelSize) ws.push(['Frame', frame.wheelSize, 'frame']);
  if(fork && fork.wheelSize) ws.push(['Fork', fork.wheelSize, 'fork']);
  if(fWheel && fWheel.wheelSize) ws.push(['Front wheel', fWheel.wheelSize, 'frontWheel']);
  if(fTire && fTire.wheelSize) ws.push(['Front tire', fTire.wheelSize, 'frontTire']);
  if(rTire && rTire.wheelSize) ws.push(['Rear tire', rTire.wheelSize, 'rearTire']);
  if(ws.length > 1){
    var wsSizes = ws.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(wsSizes.length > 1)
      err('bmx-wheel-size', ws.map(function(x){ return x[2]; }),
        'Wheel size mismatch: ' + ws.map(function(x){ return x[0] + ' = ' + x[1] + 'in'; }).join(', ') + '. A BMX is built around one wheel size end to end.');
  }

  /* BMX-1. BB shell x spindle — via a PURCHASABLE BB row, the MTB rule-7
        philosophy: with a real BB picked, both of its interfaces are exact
        definitional checks (a Mid bearing set does not press into a Spanish
        shell; a 19mm-bore bearing does not take a 22mm spindle). With no BB
        picked, an advisory INFO nudges. This deliberately AVOIDS the
        [MECHANIC REVIEW] shell x spindle bearing-kit matrix the analysis doc
        flagged — servability is proven by a purchasable kit row, never
        guessed from a matrix, so no false error is possible. */
  if(bb && frame && bb.shell !== frame.bbShell)
    err('bmx-bb-shell', ['bb', 'frame'], 'BB shell mismatch: ' + bmxNameOf(bb) + ' fits a ' + bb.shell + ' shell but ' + bmxNameOf(frame) + ' has a ' + frame.bbShell + ' shell.');
  if(bb && cranks && bb.spindleFit !== cranks.spindle)
    err('bmx-bb-spindle', ['bb', 'cranks'], 'BB spindle mismatch: ' + bmxNameOf(bb) + ' takes a ' + bb.spindleFit + ' spindle but ' + bmxNameOf(cranks) + ' runs a ' + cranks.spindle + ' spindle.');
  if(!bb && cranks && frame)
    info('bmx-bb-advisory', ['cranks', 'frame'], 'Bottom bracket: ' + bmxNameOf(cranks) + ' has a ' + cranks.spindle + ' spindle - pick the matching ' + frame.bbShell + '-shell / ' + cranks.spindle + ' bearing kit for this frame (BMX BBs are sold as shell+spindle-specific kits).');

  /* BMX-2. Crank piece-count vs frame shell. Definitional (Sheldon Brown BB
        standards; universal BMX practice): a 1-piece (Ashtabula) crank is one
        forged unit that only threads through a wide AMERICAN shell — ERROR in
        any other shell. A 3-piece crank in an American shell is an everyday
        CONVERSION-BB build (American-to-19/22mm conversion BBs are a real
        stocked product class) — adapter-tier WARNING, suppressed when the
        picked BB is itself the american-shell conversion kit (the build
        already contains the fix; rule BMX-1 checks its two interfaces). */
  if(cranks && frame){
    if(cranks.pieces === '1-piece' && frame.bbShell !== 'american')
      err('bmx-crank-pieces', ['cranks', 'frame'], 'Crank/BB mismatch: ' + bmxNameOf(cranks) + ' is a one-piece (Ashtabula) crank, which fits only an American bottom-bracket shell - ' + bmxNameOf(frame) + ' has a ' + frame.bbShell + ' shell.');
    else if(cranks.pieces === '3-piece' && frame.bbShell === 'american' && !(bb && bb.shell === 'american'))
      warn('bmx-crank-pieces', ['cranks', 'frame'], 'Conversion BB needed: ' + bmxNameOf(frame) + ' has an old-school American shell and ' + bmxNameOf(cranks) + ' is a 3-piece crank - it works with an American-shell conversion BB for its ' + cranks.spindle + ' spindle (sold separately).', {kind: 'adapter', name: 'American-to-' + cranks.spindle + ' conversion BB'});
  }

  /* BMX-3. Chain pitch — sprocket, rear cog and chain share a width class
        (1/8in near-universal; 3/32in race). WARNING (runs but poorly) —
        PROVISIONAL severity per the analysis doc's Q6 lean, mechanic review
        pending. Mirrors the MTB engine's new ss-chain-width rule in shape. */
  /** @type {Array<[string, string, string]>} */ var cp = [];
  if(sprocket && sprocket.pitch) cp.push(['Sprocket', sprocket.pitch, 'sprocket']);
  if(rearCog && rearCog.pitch) cp.push(['Rear cog', rearCog.pitch, 'rearCog']);
  if(chain && chain.pitch) cp.push(['Chain', chain.pitch, 'chain']);
  if(cp.length > 1){
    var cpWidths = cp.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(cpWidths.length > 1)
      warn('bmx-chain-pitch', cp.map(function(x){ return x[2]; }),
        'Chain width mismatch: ' + cp.map(function(x){ return x[0] + ' = ' + x[1] + 'in'; }).join(', ') + '. Sprocket, cog and chain should share one width class (1/8in or 3/32in) - a mixed stack runs but skips and wears fast.');
  }

  /* BMX-3b. Cog body vs hub driver type. ERROR: freecoaster cogs are
        body-specific and do not interchange with cassette drivers (maker-
        documented on the Profile freecoaster cog product note). Plus the Q5
        freecoaster INFO — a rider-preference note, never a conflict. */
  if(rearCog && rWheel && rearCog.fitsDriver && rWheel.driverType && rearCog.fitsDriver !== rWheel.driverType)
    err('bmx-cog-driver', ['rearCog', 'rearWheel'], 'Cog/driver mismatch: ' + bmxNameOf(rearCog) + ' fits a ' + rearCog.fitsDriver + ' driver but ' + bmxNameOf(rWheel) + ' is a ' + rWheel.driverType + ' hub - driver cogs are body-specific.');
  if(rWheel && rWheel.driverType === 'freecoaster')
    info('bmx-freecoaster', ['rearWheel'], 'Freecoaster hub: ' + bmxNameOf(rWheel) + ' lets the bike roll backward without the cranks turning (street preference) - a cassette hub engages instantly. Preference, not a fit issue.');

  /* BMX-4. Peg bore vs axle diameter — direction-aware, the MTB rotor-rule
        pattern: a 10mm-bore peg does NOT slide over a 14mm axle (ERROR,
        definitional); a 14mm-bore peg on a 10mm axle runs on a reducer sleeve
        - many pegs ship one (data field reducerIncluded) -> INFO when
        included, adapter-tier WARNING when sold separately. */
  /** @param {any} peg @param {any} wheel @param {string} pegSlot @param {string} wheelSlot @param {string} endLabel */
  function pegCheck(peg, wheel, pegSlot, wheelSlot, endLabel){
    if(!peg || !wheel || !peg.axleFit || !wheel.axle || peg.axleFit === wheel.axle) return;
    var pegMm = parseInt(peg.axleFit, 10), axleMm = parseInt(wheel.axle, 10);
    if(pegMm < axleMm){
      err('bmx-peg-axle', [pegSlot, wheelSlot], endLabel + ' peg mismatch: ' + bmxNameOf(peg) + ' has a ' + peg.axleFit + ' bore and the ' + endLabel.toLowerCase() + ' axle is ' + wheel.axle + ' - a smaller-bore peg cannot slide over a bigger axle.');
    } else if(peg.reducerIncluded === true){
      info('bmx-peg-axle', [pegSlot, wheelSlot], endLabel + ' peg: ' + bmxNameOf(peg) + ' (' + peg.axleFit + ') fits the ' + wheel.axle + ' axle using the reducer sleeve included with the pegs.');
    } else {
      warn('bmx-peg-axle', [pegSlot, wheelSlot], endLabel + ' peg: ' + bmxNameOf(peg) + ' has a ' + peg.axleFit + ' bore and the ' + endLabel.toLowerCase() + ' axle is ' + wheel.axle + ' - it works with a ' + peg.axleFit + '-to-' + wheel.axle + ' reducer sleeve (sold separately).', {kind: 'adapter', name: peg.axleFit + '-to-' + wheel.axle + ' peg reducer sleeve'});
    }
  }
  pegCheck(pegsF, fWheel, 'pegsFront', 'frontWheel', 'Front');
  pegCheck(pegsR, rWheel, 'pegsRear', 'rearWheel', 'Rear');

  /* BMX-9. Axle diameter — wheel HUB axle vs frame/fork DROPOUT slot. Race adds
        15mm/20mm to the freestyle 10mm(3/8in)/14mm pair, so wheel<->frame/fork
        axle matching becomes a real fork-in-the-road that the freestyle-only
        catalog never exercised (a 10mm bolt-on hub does NOT drop into a 20mm race
        fork without a conversion axle; a 20mm hub axle physically will NOT enter
        a 10mm dropout). Direction-aware, the peg-rule / MTB-rotor pattern:
          - hub axle FATTER than the dropout slot -> ERROR (no adapter widens a slot).
          - hub axle THINNER than the dropout slot -> adapter-tier WARNING carrying a
            structured fix: a step-down conversion axle fills the gap. These are the
            exact real products - Profile Racing's "15mm/20mm dropout to 3/8in" hub
            axle conversion kit and Speedline/Supercross's "20mm->3/8in" &
            "15mm->3/8in" Pro Frame Adapter axle kits.
          - equal -> silent.
        Every freestyle build is 10/10 front + 14/14 rear (matched end to end), so
        this stays SILENT across the entire freestyle catalog - purely additive, it
        can never change a freestyle verdict. ERROR/WARNING only, never a false block:
        the one hard-error direction (fat axle in a narrow slot) is physically
        impossible to assemble. */
  /** @param {any} host @param {any} wheel @param {string} hostSlot @param {string} wheelSlot @param {string} hostAxleField @param {string} endLabel */
  function axleCheck(host, wheel, hostSlot, wheelSlot, hostAxleField, endLabel){
    if(!host || !wheel) return;
    var hostAxle = host[hostAxleField], hubAxle = wheel.axle;
    if(!hostAxle || !hubAxle || hostAxle === hubAxle) return;
    var hostMm = parseInt(hostAxle, 10), hubMm = parseInt(hubAxle, 10);
    if(isNaN(hostMm) || isNaN(hubMm)) return;
    if(hubMm > hostMm){
      err('bmx-axle', [wheelSlot, hostSlot], endLabel + ' axle mismatch: ' + bmxNameOf(wheel) + ' has a ' + hubAxle + ' axle but ' + bmxNameOf(host) + ' has ' + hostAxle + ' dropouts - a fatter axle will not fit the dropout slot.');
    } else {
      warn('bmx-axle', [wheelSlot, hostSlot], endLabel + ' axle: ' + bmxNameOf(wheel) + ' has a ' + hubAxle + ' axle and ' + bmxNameOf(host) + ' has ' + hostAxle + ' dropouts - it runs with a ' + hostAxle + '-to-' + hubAxle + ' conversion axle (sold separately).', {kind: 'adapter', name: hostAxle + '-to-' + hubAxle + ' conversion axle'});
    }
  }
  axleCheck(fork, fWheel, 'fork', 'frontWheel', 'axle', 'Front');
  axleCheck(frame, rWheel, 'frame', 'rearWheel', 'rearAxle', 'Rear');

  /* BMX-5. Gyro/detangler preconditions. The tabs and dual-cable checks land
        DORMANT (rule-18 template): they fire only on an EXPLICIT sourced
        false (frame.gyroTabs === false / brake.dualCable === false) — absence
        means unknown and stays silent, because "no tabs" asserted without a
        source would be a false "won't fit" (gyro tabs are near-universal on
        freestyle frames). ACTIVATION: a fetched maker page stating the frame
        has no rotor/gyro provision, or a brake documented single-cable-only.
        The brakeless info is live: a gyro only exists to serve a rear brake. */
  if(gyro && frame && frame.gyroTabs === false)
    err('bmx-gyro-tabs', ['gyro', 'frame'], 'Gyro needs tabs: ' + bmxNameOf(frame) + ' has no gyro/rotor tab provision (maker-stated) - the ' + bmxNameOf(gyro) + ' has nowhere to mount.');
  if(gyro && rBrake && rBrake.dualCable === false)
    err('bmx-gyro-cable', ['gyro', 'rearBrake'], 'Gyro needs dual cables: ' + bmxNameOf(rBrake) + ' is a single-cable brake (maker-stated) - a gyro requires the dual upper/lower cable setup.');
  if(gyro && !rBrake)
    info('bmx-gyro-brakeless', ['gyro'], 'Gyro without a rear brake: the ' + bmxNameOf(gyro) + ' only de-tangles a rear brake cable - a brakeless build does not need it.');

  /* BMX-6. Brake type vs frame/fork bosses. Definitional ERROR: a U-brake
        bolts to U-brake bosses, a V-brake to V-bosses, and a bossless
        ('none') frame/fork is brakeless-only as built. The brakeless INFO
        marks a bossless frame with no brake picked as by-design (never a
        completeness nag — decision 3). */
  /* mount-type wording: 'u-brake'/'v-brake' bolt to frame/fork BOSSES, but
     'disc' is a rotor + caliper post/flat MOUNT, not a boss - saying "disc
     bosses" is inaccurate (message-polish fix, 2026-07-17 preflight audit). */
  /** @param {string} m @returns {string} */
  function mountPhrase(m){ return m === 'disc' ? 'a disc mount' : m + ' bosses'; }
  if(rBrake && frame && frame.rearBrakeMount && rBrake.mount !== frame.rearBrakeMount){
    if(frame.rearBrakeMount === 'none')
      err('bmx-rear-brake-mount', ['rearBrake', 'frame'], 'Brakeless-only frame: ' + bmxNameOf(frame) + ' has no rear brake bosses - the ' + bmxNameOf(rBrake) + ' has nowhere to mount.');
    else
      err('bmx-rear-brake-mount', ['rearBrake', 'frame'], 'Rear brake mismatch: ' + bmxNameOf(rBrake) + ' is a ' + rBrake.mount + ' and ' + bmxNameOf(frame) + ' has ' + mountPhrase(frame.rearBrakeMount) + '.');
  }
  if(fBrake && fork && fork.brakeMount && fBrake.mount !== fork.brakeMount){
    if(fork.brakeMount === 'none')
      err('bmx-front-brake-mount', ['frontBrake', 'fork'], 'Brakeless fork: ' + bmxNameOf(fork) + ' has no brake bosses - the ' + bmxNameOf(fBrake) + ' has nowhere to mount.');
    else
      err('bmx-front-brake-mount', ['frontBrake', 'fork'], 'Front brake mismatch: ' + bmxNameOf(fBrake) + ' is a ' + fBrake.mount + ' and ' + bmxNameOf(fork) + ' has ' + mountPhrase(fork.brakeMount) + '.');
  }
  if(!rBrake && frame && frame.rearBrakeMount === 'none')
    info('bmx-brakeless', ['frame'], 'Brakeless by design: ' + bmxNameOf(frame) + ' ships with no rear brake bosses - a brakeless build is this frame\'s intended, complete configuration.');

  /* BMX-Q7. Pivotal seat vs post system. Definitional ERROR (a pivotal seat
        bolts onto a pivotal post's serrated head; a standard rail seat clamps
        a railed head - neither mounts the other way). PROVISIONAL: modeled as
        a real rule per section 2b's "arguably a real small rule", awaiting
        Douglas/mechanic confirmation on Q7.
        vocab-tier1 (2026-07-22) 'stealth' <-> 'pivotal' CROSS-COMPATIBLE, both
        directions: Kink's own Stealth seat post page states verbatim "You can also
        use traditional Pivotal seats with Stealth seat posts", and Mission's own
        Carrier Stealth seat page confirms the reverse too - "works with both Pivotal
        and Stealth seat posts (Pivotal posts require a long Allen wrench, so Stealth
        posts are recommended for easiest installation)" - a real fit either way, just
        a tool-length convenience difference, not a hard incompatibility. 'standard'
        (railed) stays genuinely incompatible with both - a railed seat has no
        serrated head for either pivotal-style post to bolt into. */
  if(seat && post && seat.system && post.system && seat.system !== post.system){
    var pivotalStealthCross = (seat.system === 'stealth' && post.system === 'pivotal') ||
                               (seat.system === 'pivotal' && post.system === 'stealth');
    if(!pivotalStealthCross)
      err('bmx-seat-system', ['seat', 'seatpost'], 'Seat/post mismatch: ' + bmxNameOf(seat) + ' is a ' + seat.system + ' seat and ' + bmxNameOf(post) + ' is a ' + post.system + ' post - these systems do not interchange.');
  }

  /* BMX-8. Tire width vs rim / frame / fork clearance — DORMANT (rule-18
        template): fires only off a maker-published maxTire field, which no
        data/bmx.js row carries yet. ACTIVATION: sourced clearance statements
        per frame/fork/rim. WARNING tier (clearance, not assembly). */
  /** @param {any} tire @param {any} host @param {string} tireSlot @param {string} hostSlot @param {string} what */
  function tireCheck(tire, host, tireSlot, hostSlot, what){
    if(tire && host && typeof host.maxTire === 'number' && typeof tire.width === 'number' && tire.width > host.maxTire)
      warn('bmx-tire-clearance', [tireSlot, hostSlot], 'Tire clearance: ' + tire.width + 'in tire is wider than ' + bmxNameOf(host) + '\'s ' + host.maxTire + 'in ' + what + ' max.');
  }
  tireCheck(fTire, fork, 'frontTire', 'fork', 'fork');
  tireCheck(fTire, fWheel, 'frontTire', 'frontWheel', 'rim');
  tireCheck(rTire, frame, 'rearTire', 'frame', 'frame');
  tireCheck(rTire, rWheel, 'rearTire', 'rearWheel', 'rim');

  return { errors: errors, warnings: warnings, infos: infos };
}

/* =============================================================================
   DISPLAY-ONLY helpers (analysis-doc section 2b + Q10): computed numbers shown
   like price/weight totals. They NEVER feed checkBmxBuild — every gear ratio
   "fits"; it is tuning, not compatibility.
   ========================================================================== */

/* Gear ratio + rollout. Cog teeth come from an explicit rear-cog pick or the
   hub's shipped driver (driverTeeth); rollout uses the NOMINAL wheel size in
   inches (the BMX convention — actual tire diameter varies an inch or so).
   Returns null until sprocket + cog teeth are both known. */
/** @param {Object.<string, any>|null|undefined} build @returns {{ratio: number, rollout: number|null, sprocketTeeth: number, cogTeeth: number}|null} */
function bmxGearInfo(build){
  var b = resolveBmxBuild(build);
  var sprocket = b.sprocket, rearCog = b.rearCog, rWheel = b.rearWheel;
  var st = sprocket && typeof sprocket.teeth === 'number' ? sprocket.teeth : null;
  var ct = rearCog && typeof rearCog.teeth === 'number' ? rearCog.teeth
         : (rWheel && typeof rWheel.driverTeeth === 'number' ? rWheel.driverTeeth : null);
  if(st == null || ct == null || ct === 0) return null;
  var ratio = st / ct;
  var sizeSource = (b.frame && b.frame.wheelSize) || (b.frontWheel && b.frontWheel.wheelSize) || (b.rearTire && b.rearTire.wheelSize) || null;
  var dia = sizeSource ? parseFloat(sizeSource) : NaN;
  return {
    ratio: Math.round(ratio * 100) / 100,
    rollout: isNaN(dia) ? null : Math.round(dia * ratio * Math.PI * 10) / 10,   // inches per crank revolution
    sprocketTeeth: st,
    cogTeeth: ct
  };
}

/* Price/weight totals — BMX has no bundle presets, so this is a plain sum
   (same {price, weight, missingWeight} shape as the MTB buildTotals). */
/** @param {Object.<string, any>|null|undefined} build @returns {{price: number, weight: number, missingWeight: boolean}} */
function bmxBuildTotals(build){
  var b = resolveBmxBuild(build);
  var price = 0, weight = 0, missing = false;
  Object.keys(b).forEach(function(k){
    var p = b[k];
    if(typeof p.price === 'number') price += p.price;
    if(typeof p.weight === 'number') weight += p.weight; else missing = true;
  });
  return { price: Math.round(price * 100) / 100, weight: weight, missingWeight: missing };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BMX_VOCAB: BMX_VOCAB, BMX_GROUPS: BMX_GROUPS, BMX_SLOTS: BMX_SLOTS,
    bmxSlotRequired: bmxSlotRequired, checkBmxBuild: checkBmxBuild,
    bmxGearInfo: bmxGearInfo, bmxBuildTotals: bmxBuildTotals,
    verdictKey: bmxVerdictKey,
    BMX_ALIASES: BMX_ALIASES, canonicalBmxId: canonicalBmxId
  };
}
