'use strict';
/* =============================================================================
   BMX COMPATIBILITY ENGINE — checkBmxBuild  (OFF-LIVE)
   -----------------------------------------------------------------------------
   *** NOT LOADED BY THE LIVE APP. *** index.html does not reference this file;
   nothing here reaches buildmymtb.com until Douglas's explicit go-live word
   (CLAUDE.md hard rule 3 — the site may later split per type, e.g. buildmybmx).

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

/* Shared verdict primitives: in Node (tests/CLI) via require; in a future
   browser page both files load as classic scripts and compat.js's top-level
   declarations are globals. */
/** @type {{Verdict: new (ruleId: string, slots: string[], msg: string, fix?: {kind: string, name: string}) => any, verdictKey: (v: any) => string}} */
var _mtbShared = (typeof module !== 'undefined' && module.exports)
  ? require('./compat.js')
  : /** @type {any} */ (globalThis);
var BmxVerdict = _mtbShared.Verdict;
var bmxVerdictKey = _mtbShared.verdictKey;

/* ---- Vocab (analysis-doc section 4-BMX, reconciled with the data/bmx.js
        field conventions; documentation + future-validator reference — the
        engine itself compares values, it never gates on this table) -------- */
var BMX_VOCAB = {
  wheel:       ['20', '24', '18', '16', '26'],     // 20 standard; 24 cruiser; 18/16 junior; 26 trails-cruiser niche
  bbShell:     ['mid', 'spanish', 'american', 'euro'],
  /* crank spindles: 19mm (modern freestyle default), 22mm (Profile/Primo HD),
     24mm, 30mm (Profile Elite AL — VERIFIED on profileracing.com 2026-07-11,
     a real value the analysis doc's draft list missed), 48-spline legacy. */
  spindle:     ['19mm', '22mm', '24mm', '30mm', '48-spline'],
  crankPieces: ['1-piece', '2-piece', '3-piece'],
  axle:        ['10mm', '14mm'],                   // 3/8in and 10mm are ONE token (analysis-doc Q8 lean, PROVISIONAL)
  driverType:  ['cassette', 'freecoaster', 'freewheel'],   // 'freewheel' = legacy thread-on, vocab-only until sourced rows exist (Q5 lean)
  chainPitch:  ['1/8', '3/32'],                    // data/bmx.js field name: `pitch`
  /* 'disc' added 2026-07-17 (depth-4, coordinator-authorized): a rotor + caliper mount on
     modern race BMX (Redline Proline Flight / Chase RSP5.0-Edge class) - post/flat-mount,
     structurally unrelated to u-brake bosses or v-brake posts. DO NOT CONFLATE: a disc frame
     cannot take a u-brake or v-brake caliper and vice versa - the existing bmx-rear-brake-mount
     / bmx-front-brake-mount exact-match rules already enforce this once the token exists; no
     rule changes needed, only the vocab widen + data. */
  brakeMount:  ['u-brake', 'v-brake', 'caliper', 'disc', 'none'],  // frame/fork bosses AND brake type share the token set
  headTube:    ['integrated-1-1/8', 'mid', 'threaded'],    // display-only per the analysis doc's Q9 lean (PROVISIONAL) — no headset rule fires
  seatSystem:  ['pivotal', 'standard'],
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
  if(rBrake && frame && frame.rearBrakeMount && rBrake.mount !== frame.rearBrakeMount){
    if(frame.rearBrakeMount === 'none')
      err('bmx-rear-brake-mount', ['rearBrake', 'frame'], 'Brakeless-only frame: ' + bmxNameOf(frame) + ' has no rear brake bosses - the ' + bmxNameOf(rBrake) + ' has nowhere to mount.');
    else
      err('bmx-rear-brake-mount', ['rearBrake', 'frame'], 'Rear brake mismatch: ' + bmxNameOf(rBrake) + ' is a ' + rBrake.mount + ' and ' + bmxNameOf(frame) + ' has ' + frame.rearBrakeMount + ' bosses.');
  }
  if(fBrake && fork && fork.brakeMount && fBrake.mount !== fork.brakeMount){
    if(fork.brakeMount === 'none')
      err('bmx-front-brake-mount', ['frontBrake', 'fork'], 'Brakeless fork: ' + bmxNameOf(fork) + ' has no brake bosses - the ' + bmxNameOf(fBrake) + ' has nowhere to mount.');
    else
      err('bmx-front-brake-mount', ['frontBrake', 'fork'], 'Front brake mismatch: ' + bmxNameOf(fBrake) + ' is a ' + fBrake.mount + ' and ' + bmxNameOf(fork) + ' has ' + fork.brakeMount + ' bosses.');
  }
  if(!rBrake && frame && frame.rearBrakeMount === 'none')
    info('bmx-brakeless', ['frame'], 'Brakeless by design: ' + bmxNameOf(frame) + ' ships with no rear brake bosses - a brakeless build is this frame\'s intended, complete configuration.');

  /* BMX-Q7. Pivotal seat vs post system. Definitional ERROR (a pivotal seat
        bolts onto a pivotal post's serrated head; a standard rail seat clamps
        a railed head - neither mounts the other way). PROVISIONAL: modeled as
        a real rule per section 2b's "arguably a real small rule", awaiting
        Douglas/mechanic confirmation on Q7. */
  if(seat && post && seat.system && post.system && seat.system !== post.system)
    err('bmx-seat-system', ['seat', 'seatpost'], 'Seat/post mismatch: ' + bmxNameOf(seat) + ' is a ' + seat.system + ' seat and ' + bmxNameOf(post) + ' is a ' + post.system + ' post - pivotal and standard (railed) systems do not interchange.');

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
    verdictKey: bmxVerdictKey
  };
}
