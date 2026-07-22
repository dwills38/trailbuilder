'use strict';
/* =============================================================================
   ROAD + GRAVEL COMPATIBILITY ENGINE — checkRoadBuild  (LIVE)
   -----------------------------------------------------------------------------
   *** LIVE: served by road.html (2026-07-20) AND gravel.html (2026-07-21),
   each on Douglas's flip word. *** index.html and bmx.html still never
   reference this file — the MTB/BMX apps are untouched by it.
   Data: data/road.js + data/gravel.js (both live with their pages).

   ARCHITECTURE (data/ROAD-GRAVEL-COMPAT-ANALYSIS.md §3, Option b): ONE shared
   engine serves BOTH future pages (BuildMyRoadBike + BuildMyGravelBike) —
   road and gravel are one mechanical domain (drop-bar disc bikes) whose every
   fit rule is the same rule over different data ranges (§2: no rule is
   road-only or gravel-only). The engine gets its OWN GROUPS/SLOTS/VOCAB over
   a vocab DISJOINT from the MTB tokens (road HG ≠ MTB HG — src/schema.js:88's
   split mandate; flat-mount ≠ the MTB PM/FM tokens), while REUSING the proven
   verdict primitives from src/compat.js (Verdict + verdictKey — shared, never
   copied; the exact compat-bmx.js seam).

   THE BAR (same as the MTB + BMX engines): a false "won't fit" OR a false
   "fits" is worse than a missing rule. Every rule below either (a) rests on a
   definitional standards fact with the source cited at the rule, (b) is a
   WARNING/INFO that cannot false-block, or (c) lands DORMANT behind an
   explicit sourced field (the live MTB rule-18 template) — see per-rule
   notes. Fuzzy thresholds the analysis doc marks [MECHANIC REVIEW] are NOT
   implemented as verdicts; they are recorded at the rule as deferred.
   This week's lesson is applied in-engine: NOTHING is inferred from a stock
   part (the Roscoe-rotor / Cannondale-UDH class of bug) — absence of a field
   means UNKNOWN and stays silent (or an honest INFO), never a verdict.

   DATA-AGNOSTIC like compat-bmx.js: this module never reads a catalog, only
   the build map it is handed, so it serves both datasets (and both pages)
   unchanged. Where data/road.js and data/gravel.js encode the same fact in
   different shapes, the engine reads BOTH:
     - frame clearance: road `maxTire` (number) OR gravel `maxTireByWheel`
       (map keyed by wheel size);
     - fork `wheel`: road string OR gravel array (a gravel fork supports both
       700c and 650b);
   Both catalogs state tire width in MM (the analysis doc's unit trap is
   between road/gravel and the inch-based MTB catalog — never cross-compare).
   ========================================================================== */

/* Shared verdict primitives: in Node (tests/CLI) via require; in a future
   browser page both files load as classic scripts and compat.js's top-level
   declarations are globals (compat.js must load first, the bmx.html pattern). */
/** @type {{Verdict: new (ruleId: string, slots: string[], msg: string, fix?: {kind: string, name: string}) => any, verdictKey: (v: any) => string}} */
var _mtbSharedRoad = (typeof module !== 'undefined' && module.exports)
  ? require('./compat.js')
  : /** @type {any} */ (globalThis);
var RoadVerdict = _mtbSharedRoad.Verdict;
var roadVerdictKey = _mtbSharedRoad.verdictKey;

/* ---- Vocab (documentation + future-validator reference — the engine itself
        compares values, it never gates on this table). Union of the tokens
        src/schema-road.js and src/schema-gravel.js accept today; every token
        whose meaning differs from an MTB token is a NEW value, never a reused
        MTB one (the false-green discipline; ROAD-MODEL.md §4). ------------- */
var ROAD_VOCAB = {
  wheel:        ['700c', '650b'],                          // NOT the MTB 29/275/26/24
  freehub:      ['hg-road', 'hg-l2', 'micro-spline-road', 'xdr', 'n3w', 'campag-11'],  // NOT the MTB HG/XD/MicroSpline
  /* brakeSystem granularities differ by category (schema-road.js note):
     frame/fork/caliper carry disc-flat/disc-post/rim-caliper; brifters carry
     disc-hydraulic/disc-mechanical/rim; wheels carry the coarse disc/rim.
     Rule R17 compares only the disc-vs-rim CLASS, never raw tokens. */
  brakeSystem:  ['disc-flat', 'disc-post', 'rim-caliper', 'disc-hydraulic', 'disc-mechanical', 'rim', 'disc'],
  brakeMount:   ['flat-mount', 'post-mount'],              // road/gravel meaning — NOT the MTB PM/FM tokens
  rearAxle:     ['12x142', 'qr130', 'qr135'],
  frontAxle:    ['12x100', 'qr100'],
  steerer:      ['tapered', 'straight-1-1-8',
                 // Proprietary non-round steerer SYSTEMS (Douglas-ruled 2026-07-21) — one
                 // token per system, NEVER one shared 'proprietary' token: the rg-steerer /
                 // rg-headset-steerer checks are exact-match, so a shared token would let a
                 // Cannondale Delta fork "fit" a Giant OverDrive frame (false fits). Per-system
                 // tokens make same-system pairs fit and everything else error, truthfully,
                 // with zero engine changes. Precedent: gravel's 'lefty-proprietary' axle.
                 'cannondale-delta',   // Cannondale "Delta" 1-1/8→1-1/4 non-round (SuperSix EVO)
                 'overdrive-aero'],    // Giant D-shaped "OverDrive Aero" (TCR/Defy/Propel)
  system:       ['shimano-road-12', 'shimano-road-11', 'shimano-grx-12', 'shimano-grx-11',
                 'sram-axs-road', 'sram-xplr-12', 'sram-xplr-13', 'sram-apex-mech-12',
                 /* 'sram-rival22-11' ADDED road-depth-1 wave (2026-07-22): SRAM Rival 22, a
                    real, still-listed (sram.com/en/sram/road/series/sram-rival) 2x11
                    mechanical road groupset PRE-DATING Flattop — its own model pages
                    (RD-RIV-B1/FD-RIV-B1/FC-RIV-2X11-A1/CS-PG-1130/CN-1170-A1) describe a
                    standard HG-compatible 11-speed chain interface, a genuinely distinct
                    system from sram-apex-mech-12 (T-Type/Flattop, 12-speed) — never conflate. */
                 'sram-rival22-11',
                 'campag-ekar-13', 'campag-12', 'campag-11'],
  actuation:    ['mechanical', 'di2-wired', 'axs-wireless'],   // the road SPLIT of MTB's cable/electronic
  actuationBrake: ['hydraulic', 'mechanical'],             // caliper-side axis, distinct from shifter actuation
  chainStd:     ['hg', 'flattop', 'campag'],               // chain `system` field carries these, not a systemRoad token
  bbShell:      ['bsa-road', 'bb86', 'bb386evo', 'bbright', 'pf30', 't47-road', 'italian',
                 'bb90-road', 'bb30a'],   // 'pf86' retired 2026-07-21 — merged into 'bb86' (same physical 86.5mm press-fit shell, two spellings; see schema-road.js's header note)
  crankBb:      ['dub', 'dub-wide', '24mm-road', '30mm', 'ultra-torque'],
  seatpostDia:  ['27.2', '30.9', '31.6'],
  clamp:        ['31.8', '35'],
  fdMount:      ['braze-on', 'band', 'none'],              // 'none' = 1x-only frame (no FD provision)
  rdMount:      ['std-hanger', 'udh-fullmount'],
  chainrings:   ['1x', '2x']
};

/* SRAM AXS road/XPLR family — the R13 controller-exemption set. SRAM documents
   Rival/Force/RED AXS road parts as cross-compatible ("all AXS controllers")
   and XPLR as part of that ecosystem:
   https://support.sram.com/hc/en-us/articles/6043277756187 (Rival/Force/RED cross-compat)
   https://support.sram.com/hc/en-us/articles/6014226075035 (XPLR cross-compat)
   Both fetched for data/ROAD-GRAVEL-COMPAT-ANALYSIS.md §1b R13. */
var ROAD_SRAM_AXS_SYSTEMS = ['sram-axs-road', 'sram-xplr-12', 'sram-xplr-13'];

/* Chain standard demanded by each drivetrain system (rule R15). Sources:
   - SRAM road/XPLR (incl. mechanical Apex): Flattop is the documented road
     chain family — the fetched sram.com model pages for RD-APX-1-D1 /
     CS-XG-1251-D1 / CS-XG-1271-D1 state "Flattop-chain compatible", and SRAM
     treats "road Flattop chain" as its own width standard distinct from Eagle
     (support.sram.com, fetched — analysis doc §1b R15).
   - Shimano road/GRX: HG chains per productinfo.shimano.com C-charts /
     Compatibility PDF (fetched — analysis doc source list).
   - Campagnolo: its own chain standard; the fetched Campagnolo 12s/11s chain
     technical manual mandates Campagnolo-only pairing
     (campagnolo.com Technical manual_11s_12s_chain, fetched 2026-07-18). */
/** @type {Object.<string, string>} */
var ROAD_SYSTEM_CHAIN = {
  'shimano-road-12': 'hg', 'shimano-road-11': 'hg',
  'shimano-grx-12': 'hg', 'shimano-grx-11': 'hg',
  'sram-axs-road': 'flattop', 'sram-xplr-12': 'flattop', 'sram-xplr-13': 'flattop',
  'sram-apex-mech-12': 'flattop',
  'sram-rival22-11': 'hg',
  'campag-ekar-13': 'campag', 'campag-12': 'campag', 'campag-11': 'campag'
};

/* ---- Groups / slots (ROAD-MODEL.md §2). frontDerailleur / rotors are
        DYNAMICALLY required (roadSlotRequired below): a 1x build has no FD
        (the DJ drops-the-derailleur precedent) and a rim-brake build has no
        rotors — the §1d completeness table. bb/headset/cockpit/bartape/
        dropper/pedals are statically optional (live MTB precedent). --------- */
/** @typedef {{key: string, label: string, cat: string, optional?: boolean}} RoadSlotDef */
/** @type {Array<{key: string, label: string, slots: RoadSlotDef[]}>} */
var ROAD_GROUPS = [
  { key:'frame', label:'Frame', slots:[ {key:'frame', label:'Frame', cat:'frame'} ] },
  { key:'fork', label:'Fork', slots:[ {key:'fork', label:'Fork', cat:'fork'} ] },
  { key:'headset', label:'Headset', slots:[ {key:'headset', label:'Headset', cat:'headset', optional:true} ] },
  { key:'wheels', label:'Wheels', slots:[
      {key:'frontWheel', label:'Front Wheel', cat:'frontwheel'},
      {key:'rearWheel', label:'Rear Wheel', cat:'rearwheel'} ] },
  { key:'tires', label:'Tires', slots:[
      {key:'frontTire', label:'Front Tire', cat:'tire'},
      {key:'rearTire', label:'Rear Tire', cat:'tire'} ] },
  { key:'drivetrain', label:'Drivetrain', slots:[
      /* one shifter slot = the L+R brifter pair (ROAD-MODEL.md §2 lean —
         brifters are bought as pairs; the one-tire-category convention) */
      {key:'shifter', label:'Shifter/Brake Levers', cat:'shifter'},
      {key:'frontDerailleur', label:'Front Derailleur', cat:'frontderailleur'},   // required only on a 2x crank (roadSlotRequired)
      {key:'rearDerailleur', label:'Rear Derailleur', cat:'rearderailleur'},
      {key:'cassette', label:'Cassette', cat:'cassette'},
      {key:'chain', label:'Chain', cat:'chain'},
      {key:'crankset', label:'Crankset', cat:'crankset'} ] },
  /* bb: its own optional single-slot group (the live MTB bb/headset pattern —
     buildTotals must not skip it as an unbundled group slot; the rg-bb
     advisory info nudges until one is picked) */
  { key:'bb', label:'Bottom Bracket', slots:[ {key:'bb', label:'Bottom Bracket', cat:'bb', optional:true} ] },
  { key:'brakes', label:'Brakes', slots:[
      {key:'frontBrake', label:'Front Caliper', cat:'brake'},
      {key:'rearBrake', label:'Rear Caliper', cat:'brake'},
      {key:'frontRotor', label:'Front Rotor', cat:'rotor'},   // dropped on a rim-brake frame (roadSlotRequired)
      {key:'rearRotor', label:'Rear Rotor', cat:'rotor'} ] },
  { key:'cockpit', label:'Cockpit', slots:[
      {key:'handlebar', label:'Handlebar', cat:'handlebar'},   // not required when a one-piece cockpit is picked
      {key:'stem', label:'Stem', cat:'stem'},
      {key:'cockpit', label:'One-piece Cockpit', cat:'cockpit', optional:true},
      {key:'bartape', label:'Bar Tape', cat:'bartape', optional:true} ] },
  { key:'seat', label:'Seat', slots:[
      {key:'seatpost', label:'Seatpost', cat:'seatpost'},
      {key:'dropper', label:'Dropper Post', cat:'dropper', optional:true},   // gravel-only pick; never required
      {key:'saddle', label:'Saddle', cat:'saddle'} ] },
  { key:'pedals', label:'Pedals', slots:[ {key:'pedals', label:'Pedals', cat:'pedal', optional:true} ] }
];
/** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */
var ROAD_SLOTS = ROAD_GROUPS.reduce(function(a, g){
  return a.concat(g.slots.map(function(s){ return Object.assign({group: g.key}, s); }));
}, /** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */ ([]));

/* Is this slot required for a "complete" road/gravel build? UI-completeness
   only — never a fit verdict (the compat.js slotRequired contract). The
   §1d data-driven drops:
   - frontDerailleur: required ONLY when the picked crankset is 2x (inverted
     requiredness, the DJ cog/seatpost pattern — a 1x or crankless build never
     blocks on it, and a 2x build without an FD is genuinely incomplete);
   - frontRotor/rearRotor: dropped on a rim-brake frame (no rotors exist);
     required otherwise, incl. the no-frame default (disc-only v1 data);
   - handlebar/stem: dropped when a one-piece cockpit fills both roles;
   - seatpost: dropped when a (gravel) dropper fills the seat-tube role — a
     dropper-equipped gravel build is complete (src/compat-gravel.js's own
     round-1 drop, adopted for shared-engine parity).
   NOTE: ROAD-MODEL.md §2 stars fd/rotors as statically optional while the
   analysis doc §1d specifies these data-driven drops; §1d is implemented
   (flagged as an open question in this round's report). */
/** @param {{key: string, optional?: boolean}} slot @param {Object.<string, any>|null|undefined} build @returns {boolean} */
function roadSlotRequired(slot, build){
  if(slot.optional) return false;
  var b = build || {};
  if(slot.key === 'frontDerailleur')
    return !!(b.crankset && b.crankset.chainrings === '2x');
  if(slot.key === 'frontRotor' || slot.key === 'rearRotor')
    return !(b.frame && typeof b.frame.brakeSystem === 'string' && b.frame.brakeSystem.indexOf('rim') === 0);
  if((slot.key === 'handlebar' || slot.key === 'stem') && b.cockpit) return false;
  if(slot.key === 'seatpost' && b.dropper) return false;
  return true;
}

/* Input honesty guard (the compat.js resolveBuild lesson, via compat-bmx.js):
   a build of id STRINGS would trip no rule at all — every field read is
   undefined — and return a silent false all-clear. This engine holds no
   catalog, so strings are simply rejected. */
/** @param {Object.<string, any>|null|undefined} build @returns {Object.<string, any>} */
function resolveRoadBuild(build){
  /** @type {Object.<string, any>} */ var out = {};
  var src = build || {};
  Object.keys(src).forEach(function(k){
    var v = src[k];
    if(typeof v === 'string') throw new TypeError('road build.' + k + ' is a string ("' + v + '") - pass part objects, not ids (this engine holds no catalog to resolve them).');
    if(v) out[k] = v;
  });
  return out;
}

/** @param {any} p @returns {string} */
function roadNameOf(p){ return p ? (p.brand + ' ' + p.model) : ''; }

/** The frame's max tire width (mm) for a given wheel size — reads BOTH data
 *  shapes: road `maxTire` (number, single-size frames) and gravel
 *  `maxTireByWheel` (map keyed '700c'/'650b'). Returns null when the maker
 *  published no figure for that size (rule stays dormant — never guessed).
 *  @param {any} frame @param {string|null} wheelSize @returns {number|null} */
function roadFrameMaxTire(frame, wheelSize){
  if(!frame) return null;
  if(frame.maxTireByWheel && wheelSize != null && typeof frame.maxTireByWheel[wheelSize] === 'number')
    return frame.maxTireByWheel[wheelSize];
  if(typeof frame.maxTire === 'number' && !frame.maxTireByWheel) return frame.maxTire;
  return null;
}

/** Does this fork support this wheel size? Fork `wheel` is a string
 *  (data/road.js) or an array (data/gravel.js — dual-size gravel forks).
 *  @param {any} fork @param {string} size @returns {boolean} */
function roadForkTakesWheel(fork, size){
  if(!fork || fork.wheel == null) return true;   // no declared size = unknown, stays silent
  if(Array.isArray(fork.wheel)) return fork.wheel.indexOf(size) >= 0;
  return fork.wheel === size;
}

/** disc-vs-rim CLASS of a brakeSystem token (rule R17 compares classes only —
 *  the per-category token granularities must never be cross-compared raw).
 *  @param {any} v @returns {'disc'|'rim'|null} */
function roadBrakeClass(v){
  if(typeof v !== 'string') return null;
  if(v.indexOf('disc') === 0) return 'disc';
  if(v.indexOf('rim') === 0) return 'rim';
  return null;
}

/* =============================================================================
   checkRoadBuild(build) -> { errors, warnings, infos } of shared Verdicts.
   build: slotKey (see ROAD_SLOTS) -> part object from data/road.js /
   data/gravel.js field conventions. Rules R1..R20 of
   data/ROAD-GRAVEL-COMPAT-ANALYSIS.md §1 — each rule cites its source and
   states its activation/dormancy. Errors = won't fit; warnings = works but
   check; infos = notes.
   ========================================================================== */
/** @param {Object.<string, any>|null|undefined} build @returns {{errors: any[], warnings: any[], infos: any[]}} */
function checkRoadBuild(build){
  /** @type {any[]} */ var errors = [];
  /** @type {any[]} */ var warnings = [];
  /** @type {any[]} */ var infos = [];
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function err(ruleId, slots, msg){ errors.push(new RoadVerdict(ruleId, slots, msg)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg @param {{kind: string, name: string}} [fix] */
  function warn(ruleId, slots, msg, fix){ warnings.push(new RoadVerdict(ruleId, slots, msg, fix)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function info(ruleId, slots, msg){ infos.push(new RoadVerdict(ruleId, slots, msg)); }

  var b = resolveRoadBuild(build);
  var frame = b.frame, fork = b.fork, hset = b.headset,
      fW = b.frontWheel, rW = b.rearWheel, fTire = b.frontTire, rTire = b.rearTire,
      shifter = b.shifter, fd = b.frontDerailleur, rd = b.rearDerailleur,
      cassette = b.cassette, chain = b.chain, crankset = b.crankset, bb = b.bb,
      fBrake = b.frontBrake, rBrake = b.rearBrake, fRotor = b.frontRotor, rRotor = b.rearRotor,
      bar = b.handlebar, stem = b.stem, cockpit = b.cockpit,
      seatpost = b.seatpost, dropper = b.dropper;

  /* R1. Wheel size — every size-carrying part must agree on ONE size (700c or
        650b; no road/gravel analogue of the MTB mullet config exists as a
        maker-sold standard, so a mixed pair is definitional non-fit), the fork
        must support that size, and a frame must list it in wheelSizes.
        Definitional; ERROR. Own ruleId over the disjoint vocab — never the
        MTB wheel-config ruleId. */
  /** @type {Array<[string, string, string]>} */ var ws = [];
  if(fW && fW.wheel != null) ws.push(['Front wheel', fW.wheel, 'frontWheel']);
  if(rW && rW.wheel != null) ws.push(['Rear wheel', rW.wheel, 'rearWheel']);
  if(fTire && fTire.wheel != null) ws.push(['Front tire', fTire.wheel, 'frontTire']);
  if(rTire && rTire.wheel != null) ws.push(['Rear tire', rTire.wheel, 'rearTire']);
  /** @type {string|null} */ var buildSize = null;
  if(ws.length){
    var wsSizes = ws.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(wsSizes.length > 1)
      err('rg-wheel-size', ws.map(function(x){ return x[2]; }),
        'Wheel size mismatch: ' + ws.map(function(x){ return x[0] + ' = ' + x[1]; }).join(', ') + '. A road or gravel build runs one wheel size end to end.');
    else buildSize = wsSizes[0];
  }
  if(buildSize && fork && fork.wheel != null && !roadForkTakesWheel(fork, buildSize))
    err('rg-wheel-size', ['fork'].concat(ws.map(function(x){ return x[2]; })),
      'Wheel size mismatch: ' + roadNameOf(fork) + ' is a ' + (Array.isArray(fork.wheel) ? fork.wheel.join('/') : fork.wheel) + ' fork but the build is ' + buildSize + '.');
  if(buildSize && frame && Array.isArray(frame.wheelSizes) && frame.wheelSizes.indexOf(buildSize) < 0)
    err('rg-wheel-size', ['frame'].concat(ws.map(function(x){ return x[2]; })),
      'Unsupported wheel size: ' + roadNameOf(frame) + ' supports ' + frame.wheelSizes.join(' / ') + ', but this build is ' + buildSize + '.');
  /* frame+fork with no wheels/tires yet: a size-disjoint pair can already be
     rejected (a 700c-only fork cannot serve a 650b-only frame). */
  if(!buildSize && frame && fork && Array.isArray(frame.wheelSizes) && fork.wheel != null){
    var forkSizes = Array.isArray(fork.wheel) ? fork.wheel : [fork.wheel];
    var anyShared = frame.wheelSizes.some(function(/** @type {string} */ s){ return forkSizes.indexOf(s) >= 0; });
    if(!anyShared)
      err('rg-wheel-size', ['frame', 'fork'],
        'Wheel size mismatch: ' + roadNameOf(frame) + ' supports ' + frame.wheelSizes.join(' / ') + ' but ' + roadNameOf(fork) + ' is a ' + forkSizes.join('/') + ' fork.');
  }

  /* R2/R3. Axles — exact-match thru-axle/QR specs (12x100/12x142 the disc
        standard; definitional). ERROR. Same SHAPE as the MTB axle rules over
        the disjoint road axle vocab. */
  if(fork && fW && fW.hub != null && fork.axle != null && fork.axle !== fW.hub)
    err('rg-front-axle', ['fork', 'frontWheel'], 'Front axle mismatch: ' + roadNameOf(fork) + ' takes a ' + fork.axle + ' hub but ' + roadNameOf(fW) + ' is ' + fW.hub + '.');
  if(frame && rW && rW.hub != null && frame.rearAxle != null && frame.rearAxle !== rW.hub)
    err('rg-rear-axle', ['frame', 'rearWheel'], 'Rear axle mismatch: ' + roadNameOf(frame) + ' takes a ' + frame.rearAxle + ' hub but ' + roadNameOf(rW) + ' is ' + rW.hub + '.');

  /* R4. Steerer — fork vs frame head tube, and headset vs fork. Exact-match
        over ['tapered','straight-1-1-8'] (definitional: a tapered steerer
        does not enter a straight 1-1/8 head tube; the reducer-cup direction
        for a straight fork in a tapered frame is real but stays an honest
        ERROR pending the mechanic review — no adapter tier is claimed
        without a documented product, and no catalog row can currently
        produce the pairing). ERROR. */
  if(frame && fork && frame.steerer != null && fork.steerer != null && frame.steerer !== fork.steerer)
    err('rg-steerer', ['frame', 'fork'], 'Steerer mismatch: ' + roadNameOf(fork) + ' has a ' + fork.steerer + ' steerer but ' + roadNameOf(frame) + ' takes ' + frame.steerer + '.');
  if(hset && fork && hset.steerer != null && fork.steerer != null && hset.steerer !== fork.steerer)
    err('rg-headset-steerer', ['headset', 'fork'], 'Headset steerer mismatch: ' + roadNameOf(hset) + ' accepts a ' + hset.steerer + ' steerer but ' + roadNameOf(fork) + ' is ' + fork.steerer + '.');
  /* Proprietary-steerer integrated-headset info (coordinator, 2026-07-21 —
     post-wave-audit M1 resolution): for the per-system non-round steerers
     (cannondale-delta / overdrive-aero) NO complete aftermarket headset SKU
     exists — the maker services these via bearing kits only (oem-posts-1
     wave researched both: Cannondale sells Delta service parts, not a
     complete headset; Giant's OverDrive Aero has aftermarket bearing kits
     only, and this catalog's "complete headsets only" rule excludes those).
     The rg-headset-steerer mismatch ERRORS above stay — a standard headset
     genuinely does not fit these steerers, and downgrading a true won't-fit
     would be a false-fits change. This info fires on the matched OEM
     frame+fork pair with no headset picked, so the rider understands why
     every cataloged headset shows red rather than reading it as a catalog
     gap. */
  if(frame && fork && !hset && frame.steerer != null && frame.steerer === fork.steerer &&
     (frame.steerer === 'cannondale-delta' || frame.steerer === 'overdrive-aero'))
    info('rg-headset-proprietary', ['frame', 'fork'], roadNameOf(frame) + ' uses the maker\'s own integrated headset for its proprietary steerer (serviced via bearing kits); aftermarket complete headsets do not fit, so no cataloged headset will show as compatible.');

  /* R5. Freehub body vs cassette — the highest-value drop-bar rule (Shimano
        12-speed freehub guide + SRAM XDR + Campagnolo N3W, all fetched for
        the analysis doc). The exact-match ERROR side ships active
        (definitional). ONE adapter tier ships, because the maker documents
        the adapter as a stocked product: a classic Campagnolo ED-body
        ("campag-11") cassette mounts an N3W wheel with Campagnolo's own
        AC21-N3W adapter ring + longer lockring (campagnolo.com sells AC21-N3W;
        fetched via the cs-campagnolo-record-1029 verification —
        campagnolo.com CCSSUPERRECORD12S page + the Bikerumor N3W teardown
        cited in the analysis doc). The REVERSE (an N3W-native 9/10T cassette
        on the longer ED body) has no adapter and stays the ERROR.
        HG-L2 DUAL-BODY FIT (Shimano C-731 compatibility chart,
        productinfo.shimano.com, fetched verbatim 2026-07-20): the chart's
        matrix marks "HG spline L2 (ROAD 12-speed dedicated)" ✔ for the
        ROAD 12-speed cassette CLASS — all tiers (Dura-Ace/Ultegra/105),
        not Dura-Ace only (the bike.shimano.com article's "Dura-Ace only"
        wording predates the Ultegra/105 12s launches) — and the same
        cassettes also ✔ on "HG spline L" (our 'hg-road'). So a Shimano
        ROAD 12-speed cassette fits BOTH bodies natively — no adapter, no
        caveat — whichever of the two tokens its row carries; the pairing
        is SILENT. The class gate is deliberately narrow: BOTH tokens must
        be in {hg-road, hg-l2} (a road-12 row mis-tokened e.g. 'xdr' keeps
        the error rather than gaining a false "fits"), and non-road-12
        cassettes on an L2 wheel keep the exact-match ERROR — C-731 calls
        L2 "ROAD 12-speed dedicated", so an 11-speed cassette on hg-l2 is
        a true won't-fit. The HG 1.85mm-spacer tier stays [MECHANIC REVIEW]
        and is deliberately NOT softened here (a wrong adapter claim is a
        false "fits"). */
  if(cassette && rW && cassette.freehub != null && rW.freehub != null && cassette.freehub !== rW.freehub){
    var hgRoadBodies = ['hg-road', 'hg-l2'];
    if(cassette.system === 'shimano-road-12' && cassette.speeds === 12
       && hgRoadBodies.indexOf(cassette.freehub) >= 0 && hgRoadBodies.indexOf(rW.freehub) >= 0){
      /* silent — C-731 dual-body fit, see the rule note above */
    }
    else if(cassette.freehub === 'campag-11' && rW.freehub === 'n3w')
      warn('rg-freehub', ['cassette', 'rearWheel'],
        'Freehub adapter needed: ' + roadNameOf(cassette) + ' fits Campagnolo\'s classic ED freehub body, and ' + roadNameOf(rW) + ' has the shorter N3W body - Campagnolo\'s AC21-N3W adapter ring (with its longer lockring) mounts it.',
        {kind: 'adapter', name: 'Campagnolo AC21-N3W adapter'});
    else
      err('rg-freehub', ['cassette', 'rearWheel'],
        'Freehub mismatch: ' + roadNameOf(cassette) + ' needs a ' + cassette.freehub + ' freehub body but ' + roadNameOf(rW) + ' has a ' + rW.freehub + ' body.');
  }

  /* R6. Cassette range vs rear-derailleur capacity — maker-published max
        low sprocket (e.g. the fetched SRAM XPLR pages: 12sp 10-44 / 13sp
        10-46 only; Campagnolo Record "11 to 34 teeth"). Exceeding a
        maker-stated max cog = ERROR. Total-capacity math stays out
        ([MECHANIC REVIEW] — no RD row carries a total-capacity figure). */
  if(cassette && rd && typeof cassette.maxCog === 'number' && typeof rd.maxCog === 'number' && cassette.maxCog > rd.maxCog)
    err('rg-rd-capacity', ['cassette', 'rearDerailleur'], 'Cassette too big: ' + cassette.maxCog + 'T cassette exceeds the ' + roadNameOf(rd) + ' max of ' + rd.maxCog + 'T.');

  /* R7. Rotor interface vs hub — byte-for-byte the MTB rule 9 (disc road/
        gravel hubs use the same two interfaces; analysis doc calls it
        IDENTICAL). DIRECTION-AWARE: a Center-Lock rotor cannot bolt to a
        6-bolt hub (ERROR); a 6-bolt rotor mounts a Center-Lock hub with a
        documented one-piece-rotor adapter (Shimano SM-RTAD05) -> adapter-tier
        WARNING with the structured fix (adapter facts are engine-side pair
        data, never part fields — the compat.js convention). */
  /** @param {any} rotor @param {any} wheel @param {string} rotorSlot @param {string} wheelSlot @param {string} endLabel */
  function rotorMountCheck(rotor, wheel, rotorSlot, wheelSlot, endLabel){
    if(!rotor || !wheel || rotor.mount == null || wheel.rotorMount == null || rotor.mount === wheel.rotorMount) return;
    if(rotor.mount === 'center-lock' && wheel.rotorMount === '6-bolt')
      err('rg-rotor-mount', [rotorSlot, wheelSlot], endLabel + ' rotor mismatch: a Center Lock rotor cannot bolt to ' + roadNameOf(wheel) + '\'s 6-bolt hub.');
    else if(rotor.mount === '6-bolt' && wheel.rotorMount === 'center-lock')
      warn('rg-rotor-mount', [rotorSlot, wheelSlot], endLabel + ' rotor: 6-bolt rotor on a Center Lock hub needs a Center Lock adapter (e.g. Shimano SM-RTAD05; fits one-piece rotors only).', {kind: 'adapter', name: 'Shimano SM-RTAD05'});
    else
      err('rg-rotor-mount', [rotorSlot, wheelSlot], endLabel + ' rotor mismatch: ' + roadNameOf(rotor) + ' is ' + rotor.mount + ' and ' + roadNameOf(wheel) + '\'s hub is ' + wheel.rotorMount + '.');
  }
  rotorMountCheck(fRotor, fW, 'frontRotor', 'frontWheel', 'Front');
  rotorMountCheck(rRotor, rW, 'rearRotor', 'rearWheel', 'Rear');

  /* R8. Rotor size vs sourced fork/frame max — fires ONLY off a part-carried
        maxRotorF/maxRotorR (the rule-18 template; the doc's [MECHANIC REVIEW]
        rejected a hard 140/160 flat-mount default cap because proprietary
        >160 mounts exist — a default would false-block them). WARNING tier
        (the doc's lean; matches the MTB rule-10 oversize warning). Every
        current fork row carries a sourced/convention maxRotorF (160, or the
        Fairlight Cempa's fetched 180); no frame row carries maxRotorR yet, so
        the frame side is dormant. */
  if(fRotor && fork && typeof fork.maxRotorF === 'number' && typeof fRotor.size === 'number' && fRotor.size > fork.maxRotorF)
    warn('rg-rotor-size', ['frontRotor', 'fork'], 'Front rotor size: ' + fRotor.size + 'mm exceeds ' + roadNameOf(fork) + '\'s ' + fork.maxRotorF + 'mm flat-mount max.');
  if(rRotor && frame && typeof frame.maxRotorR === 'number' && typeof rRotor.size === 'number' && rRotor.size > frame.maxRotorR)
    warn('rg-rotor-size', ['rearRotor', 'frame'], 'Rear rotor size: ' + rRotor.size + 'mm exceeds ' + roadNameOf(frame) + '\'s ' + frame.maxRotorR + 'mm max.');

  /* R9. Tire clearance — dormant-until-sourced everywhere (the rule-18
        template): fires only off a maker-published max on the specific frame
        (maxTire / per-size maxTireByWheel), fork (maxTire), or rim (maxTire).
        WARNING tier: the live MTB engine ships frame clearance as a warning
        (rear-tire-frame) and clearance is a rub/mud-room fact, not an
        assembly impossibility — the analysis doc's ERROR lean for the frame
        side is flagged to the mechanic review rather than adopted (severity
        divergence recorded in this round's report). Units: mm on both
        catalogs (never compare against the inch-based MTB data). 14c-shape
        minimum (wheel.minTire) lands dormant — no row carries it. */
  /* ruleIds mirror src/compat-gravel.js's split exactly (rg-tire-clearance =
     frame, rg-tire-fork = fork crown, rg-tire-rim = rim) so the coordinator's
     road/gravel reconciliation is line-comparable. */
  /** @param {any} tire @param {number|null} max @param {string} ruleId @param {string} tireSlot @param {string} hostSlot @param {any} host @param {string} what */
  function tireClearanceCheck(tire, max, ruleId, tireSlot, hostSlot, host, what){
    if(tire && host && typeof max === 'number' && typeof tire.width === 'number' && tire.width > max)
      warn(ruleId, [tireSlot, hostSlot], 'Tire clearance: ' + tire.width + 'mm tire is wider than ' + roadNameOf(host) + '\'s ' + max + 'mm ' + what + ' max.');
  }
  tireClearanceCheck(rTire, roadFrameMaxTire(frame, rTire && rTire.wheel), 'rg-tire-clearance', 'rearTire', 'frame', frame, 'frame');
  tireClearanceCheck(fTire, (fork && typeof fork.maxTire === 'number') ? fork.maxTire : null, 'rg-tire-fork', 'frontTire', 'fork', fork, 'fork');
  tireClearanceCheck(fTire, (fW && typeof fW.maxTire === 'number') ? fW.maxTire : null, 'rg-tire-rim', 'frontTire', 'frontWheel', fW, 'rim');
  tireClearanceCheck(rTire, (rW && typeof rW.maxTire === 'number') ? rW.maxTire : null, 'rg-tire-rim', 'rearTire', 'rearWheel', rW, 'rim');
  if(fTire && fW && typeof fW.minTire === 'number' && typeof fTire.width === 'number' && fTire.width < fW.minTire)
    warn('rg-tire-rim-min', ['frontTire', 'frontWheel'], 'Front tire width: ' + fTire.width + 'mm is below the wheel maker\'s recommended minimum of ' + fW.minTire + 'mm for this rim.');
  if(rTire && rW && typeof rW.minTire === 'number' && typeof rTire.width === 'number' && rTire.width < rW.minTire)
    warn('rg-tire-rim-min', ['rearTire', 'rearWheel'], 'Rear tire width: ' + rTire.width + 'mm is below the wheel maker\'s recommended minimum of ' + rW.minTire + 'mm for this rim.');

  /* R10. Bar/stem clamp — exact-match 31.8/35 (definitional). ERROR.
        Naturally N/A for a one-piece cockpit (it has no clamp fields, so
        nothing fires on it). */
  if(bar && stem && bar.clamp != null && stem.clamp != null && bar.clamp !== stem.clamp)
    err('rg-bar-clamp', ['handlebar', 'stem'], 'Clamp mismatch: ' + roadNameOf(bar) + ' is ' + bar.clamp + 'mm but ' + roadNameOf(stem) + ' clamps ' + stem.clamp + 'mm.');

  /* R11. BB shell vs frame + BB spindle vs crank — the MTB rule-7 pattern
        over the road shell zoo: with a purchasable BB picked, both of its
        interfaces are exact definitional checks; with none picked, an
        advisory INFO nudges (the BB is genuinely sold separately on
        framesets). ERROR / INFO. */
  if(bb && frame && bb.shell != null && frame.bb != null && bb.shell !== frame.bb)
    err('rg-bb-shell', ['bb', 'frame'], 'BB shell mismatch: ' + roadNameOf(bb) + ' fits a ' + bb.shell + ' shell but ' + roadNameOf(frame) + ' has a ' + frame.bb + ' shell.');
  if(bb && crankset && bb.spindle != null && crankset.bb != null && bb.spindle !== crankset.bb)
    err('rg-bb-spindle', ['bb', 'crankset'], 'BB spindle mismatch: ' + roadNameOf(bb) + ' takes a ' + bb.spindle + ' spindle but ' + roadNameOf(crankset) + ' runs a ' + crankset.bb + ' spindle.');
  if(!bb && crankset && frame && crankset.bb != null && frame.bb != null)
    info('rg-bb-advisory', ['crankset', 'frame'], 'Bottom bracket: ' + roadNameOf(crankset) + ' has a ' + crankset.bb + ' spindle - pick the matching ' + frame.bb + '-shell / ' + crankset.bb + ' bottom bracket for this frame (sold separately).');

  /* R12. Seatpost (and gravel dropper) vs frame — DIRECTION-AWARE, the MTB
        rule-13 physics + shim doctrine, plus the proprietary/aero-post LOCK:
        - a proprietary post fits ONLY the frames its maker made it for
          (forFrames — the OEM-shock pattern); any other frame = ERROR;
        - a proprietary-post frame takes no generic round post = ERROR
          (definitional: the aero/D-shape bore is not a round 27.2/30.9/31.6);
        - round-vs-round: bigger post in a smaller bore = ERROR; smaller post
          in a bigger bore = reducing-shim WARNING (shop-approved practice —
          the MTB rule-13 doctrine, Problem Solvers/Wolf Tooth shims). */
  /** @param {any} post @param {string} postSlot @param {string} label */
  function postCheck(post, postSlot, label){
    if(!post || !frame) return;
    if(post.proprietary === true){
      if(Array.isArray(post.forFrames) && post.forFrames.indexOf(frame.id) >= 0) return;
      err('rg-seatpost', [postSlot, 'frame'], label + ' mismatch: ' + roadNameOf(post) + ' is a proprietary post made for specific frames, and ' + roadNameOf(frame) + ' is not one of them.');
      return;
    }
    if(frame.seatpost === 'proprietary'){
      if(post.diameter != null)
        err('rg-seatpost', [postSlot, 'frame'], label + ' mismatch: ' + roadNameOf(frame) + ' takes only its own proprietary (aero/D-shaped) post - a round ' + post.diameter + 'mm post does not fit.');
      return;
    }
    var frameDia = parseFloat(frame.seatpost), postDia = parseFloat(post.diameter);
    if(isNaN(frameDia) || isNaN(postDia)) return;
    if(postDia > frameDia)
      err('rg-seatpost', [postSlot, 'frame'], label + ' too big: ' + roadNameOf(frame) + '\'s seat tube is ' + frame.seatpost + 'mm but ' + roadNameOf(post) + ' is ' + post.diameter + 'mm - a bigger post cannot fit a smaller tube.');
    else if(postDia < frameDia)
      warn('rg-seatpost', [postSlot, 'frame'], label + ' shim needed: a ' + post.diameter + 'mm post in a ' + frame.seatpost + 'mm seat tube works with a ' + frame.seatpost + '-to-' + post.diameter + 'mm reducing shim (sold separately).', {kind: 'adapter', name: frame.seatpost + '-to-' + post.diameter + 'mm seatpost shim'});
  }
  postCheck(seatpost, 'seatpost', 'Seatpost');
  postCheck(dropper, 'dropper', 'Dropper');

  /* R13. Drivetrain: one system + one speed. Systems set = shifter + both
        derailleurs + cassette. The CHAIN is out of the system set (its
        `system` field carries the chainStd axis — rule R15 owns it) and the
        CRANKSET is out of both sets (SRAM's own model pages list the XPLR
        cranks as "12/13-speed" dual-rated — counting a single stored number
        would false-red a genuine SRAM pairing; the MTB engine's M1 lesson).
        R13a AXS-controller exemption: SRAM documents ALL AXS road/XPLR
        controllers as driving all AXS road/XPLR derailleurs (support.sram.com
        6043277756187 + 6014226075035, fetched) — a wireless shifter in a SRAM
        AXS road family is exempt from the one-system set, but stays an honest
        error on a non-SRAM system. */
  /** @type {Array<[string, any, string]>} */ var dt = [];
  if(shifter) dt.push(['Shifter', shifter, 'shifter']);
  if(fd) dt.push(['Front derailleur', fd, 'frontDerailleur']);
  if(rd) dt.push(['Rear derailleur', rd, 'rearDerailleur']);
  if(cassette) dt.push(['Cassette', cassette, 'cassette']);
  if(dt.length > 1){
    var axsCtrl = !!(shifter && shifter.actuation === 'axs-wireless' && ROAD_SRAM_AXS_SYSTEMS.indexOf(shifter.system) >= 0);
    var dtSys = axsCtrl ? dt.filter(function(x){ return x[1] !== shifter; }) : dt;
    var systems = dtSys.map(function(x){ return x[1].system; }).filter(function(v, i, a){ return v != null && a.indexOf(v) === i; });
    /* the SRAM AXS cross-compat also spans the road/XPLR system tokens
       themselves for the CONTROLLER only — mech vs cassette must still agree,
       EXCEPT that SRAM's XPLR pages document 12sp XPLR mechs on AXS road
       cranks/controllers; mech-vs-cassette stays one-system (a 13sp XPLR mech
       over a 12sp road cassette is caught by the speed check anyway). */
    if(systems.length > 1)
      err('rg-drivetrain-system', dtSys.map(function(x){ return x[2]; }),
        'Drivetrain mismatch: ' + dtSys.map(function(x){ return x[0] + ' = ' + x[1].system; }).join(', ') + '. Shifter, derailleurs and cassette must be one system.');
    else if(axsCtrl && systems.length === 1 && ROAD_SRAM_AXS_SYSTEMS.indexOf(systems[0]) < 0)
      err('rg-drivetrain-system', dt.map(function(x){ return x[2]; }),
        'Drivetrain mismatch: ' + dt.map(function(x){ return x[0] + ' = ' + x[1].system; }).join(', ') + '. A SRAM AXS controller only drives SRAM AXS derailleurs.');
    /* One speed count. The AXS CONTROLLER leaves the speed set too (same
       exemption, same sources): SRAM documents all AXS road/XPLR controllers
       driving all AXS road/XPLR derailleurs — the brifter is a speed-agnostic
       wireless button, and a 13sp-labeled XPLR lever over a 12sp XPLR mech is
       a SRAM-documented pairing (counting it would be a false "won't fit";
       src/compat-gravel.js round 1 exempts it identically). The chain joins
       the speed set ONLY when it is speed-defined by its maker: Campagnolo's
       chain manual mandates 12s chains for 12s drivetrains only (fetched
       PDF), and Shimano's C-charts pair HG chains per speed count — but SRAM
       documents ONE Flattop family across its 12sp road and 13sp XPLR
       groups, so a flattop chain is width-defined and stays out (counting it
       would false-red a genuine SRAM-documented pairing — the MTB engine's
       M1 lesson, road edition). */
    /** @type {Array<[string, any, string]>} */ var dtSpeed = dtSys.slice();
    if(chain && typeof chain.speeds === 'number' && chain.system !== 'flattop') dtSpeed.push(['Chain', chain, 'chain']);
    var speeds = dtSpeed.map(function(x){ return x[1].speeds; }).filter(function(v, i, a){ return v != null && a.indexOf(v) === i; });
    if(speeds.length > 1)
      err('rg-drivetrain-speeds', dtSpeed.map(function(x){ return x[2]; }),
        'Speed mismatch: ' + dtSpeed.map(function(x){ return x[0] + ' ' + x[1].speeds + 's'; }).join(', ') + '. The drivetrain must share one speed count.');
  }

  /* R14. Actuation — mechanical vs Di2-wired vs AXS-wireless are three
        mutually incompatible control worlds (a Di2 lever cannot drive an AXS
        mech, a mechanical lever cannot drive either electronic mech; the
        road split of the MTB cable/electronic axis). Exact-match ERROR
        between the shifter and each derailleur. */
  if(shifter && rd && shifter.actuation != null && rd.actuation != null && shifter.actuation !== rd.actuation)
    err('rg-actuation', ['shifter', 'rearDerailleur'], 'Actuation mismatch: ' + roadNameOf(shifter) + ' is ' + shifter.actuation + ' but ' + roadNameOf(rd) + ' is ' + rd.actuation + '. Mechanical, Di2-wired and AXS-wireless controls do not interchange.');
  if(shifter && fd && shifter.actuation != null && fd.actuation != null && shifter.actuation !== fd.actuation)
    err('rg-actuation', ['shifter', 'frontDerailleur'], 'Actuation mismatch: ' + roadNameOf(shifter) + ' is ' + shifter.actuation + ' but ' + roadNameOf(fd) + ' is ' + fd.actuation + '. Mechanical, Di2-wired and AXS-wireless controls do not interchange.');

  /* R15. Chain standard vs system — a chain's `system` is its width standard
        (hg / flattop / campag), and each drivetrain system demands one (the
        ROAD_SYSTEM_CHAIN table above, sources there). ERROR — definitional
        given the system. Reference part order: cassette, then rear
        derailleur, then shifter (first geared part carrying a system). */
  var chainRef = cassette || rd || shifter;
  if(chain && chain.system != null && chainRef && chainRef.system != null){
    var wantStd = ROAD_SYSTEM_CHAIN[chainRef.system];
    if(wantStd && chain.system !== wantStd)
      err('rg-chain-std', ['chain', cassette ? 'cassette' : (rd ? 'rearDerailleur' : 'shifter')],
        'Chain mismatch: a ' + chainRef.system + ' drivetrain runs a ' + wantStd + ' chain, but ' + roadNameOf(chain) + ' is ' + chain.system + '.');
  }

  /* R16. 2x front end. Three teeth, in confidence order:
        16a (ERROR, definitional): a 1x control (frontShift:false — no left
        shift mechanism exists in the lever) cannot run a 2x crank.
        16b (ERROR, definitional): a frame with NO front-derailleur provision
        (frontDerailleurMount:'none' — sourced per frame) gives an FD nowhere
        to mount (the BMX bossless-frame pattern). Braze-on vs band matching
        is deliberately NOT checked — band-clamp adapters for braze-on FDs
        are a real stocked class and no current row carries 'band', so an
        exact-match would guess ([MECHANIC REVIEW]).
        16c (WARNING, data-gated): chainring tooth difference vs the FD's
        maker-published capacity — fires only when the FD row carries
        capacity/maxChainringDiff AND the crank's ring pair parses ('48/35').
        WARNING tier per the doc's lean (capacity numbers are maker-specific
        and the current figures are sample-grade — [MECHANIC REVIEW]). */
  if(crankset && crankset.chainrings === '2x' && shifter && shifter.frontShift === false)
    err('rg-2x-control', ['shifter', 'crankset'], '1x control on a 2x crank: ' + roadNameOf(shifter) + ' has no front-shift mechanism, so it cannot run ' + roadNameOf(crankset) + '\'s two chainrings.');
  if(fd && frame && frame.frontDerailleurMount === 'none')
    err('rg-fd-mount', ['frontDerailleur', 'frame'], 'No front-derailleur mount: ' + roadNameOf(frame) + ' has no front-derailleur provision (1x-only frame) - the ' + roadNameOf(fd) + ' has nowhere to mount.');
  if(fd && crankset && crankset.chainrings === '2x'){
    var fdCap = typeof fd.capacity === 'number' ? fd.capacity : (typeof fd.maxChainringDiff === 'number' ? fd.maxChainringDiff : null);
    var ringPair = typeof crankset.ring === 'string' ? crankset.ring.split('/') : [];
    if(fdCap != null && ringPair.length === 2){
      var ringDiff = Math.abs(parseInt(ringPair[0], 10) - parseInt(ringPair[1], 10));
      if(isFinite(ringDiff) && ringDiff > fdCap)
        warn('rg-fd-capacity', ['frontDerailleur', 'crankset'], 'Front derailleur capacity: ' + roadNameOf(crankset) + '\'s ' + crankset.ring + ' rings are ' + ringDiff + 'T apart, over the ' + roadNameOf(fd) + '\'s ' + fdCap + 'T capacity.');
    }
  }

  /* R17. Rim-brake vs disc consistency — brakeSystem must be one CLASS
        (disc or rim) end to end; a rim wheel on a disc build (or any mix)
        is a hard non-fit. Compares CLASSES only via roadBrakeClass — the
        per-category token granularities (disc-flat vs disc-hydraulic vs
        disc) are never cross-compared raw (schema-road.js's own warning).
        ERROR. With the disc-only v1 data this is a guard: it fires only if
        a stray rim part enters, exactly as the analysis doc intends. */
  /** @type {Array<[string, 'disc'|'rim', string]>} */ var bs = [];
  /** @param {any} p @param {string} label @param {string} slot */
  function pushBrakeClass(p, label, slot){
    var c = p && roadBrakeClass(p.brakeSystem);
    if(c) bs.push([label, c, slot]);
  }
  pushBrakeClass(frame, 'Frame', 'frame');
  pushBrakeClass(fork, 'Fork', 'fork');
  pushBrakeClass(shifter, 'Levers', 'shifter');
  pushBrakeClass(fW, 'Front wheel', 'frontWheel');
  pushBrakeClass(rW, 'Rear wheel', 'rearWheel');
  pushBrakeClass(fBrake, 'Front brake', 'frontBrake');
  pushBrakeClass(rBrake, 'Rear brake', 'rearBrake');
  if(bs.length > 1){
    var classes = bs.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(classes.length > 1)
      err('rg-brake-system', bs.map(function(x){ return x[2]; }),
        'Brake system mismatch: ' + bs.map(function(x){ return x[0] + ' = ' + x[1]; }).join(', ') + '. Disc and rim-brake parts do not mix on one build.');
  }

  /* R18. Brake mount: caliper vs frame/fork — flat-mount is the road/gravel
        disc standard (Shimano-designed; CrankSmith + bicycles.stackexchange
        fetched for the analysis doc) and a post-mount caliper does not bolt
        to a flat-mount frame as built. Exact-match ERROR. The post-to-flat
        adapter tier the doc mentions is deliberately NOT claimed ("rarely
        pays off" is not a documented fits-with-adapter fact; [MECHANIC
        REVIEW]) — and no current row carries 'post-mount', so both
        directions are dormant-but-correct today. */
  if(rBrake && frame && rBrake.mount != null && frame.brakeMount != null && rBrake.mount !== frame.brakeMount)
    err('rg-brake-mount', ['rearBrake', 'frame'], 'Rear brake mount mismatch: ' + roadNameOf(rBrake) + ' is ' + rBrake.mount + ' and ' + roadNameOf(frame) + ' takes ' + frame.brakeMount + ' calipers.');
  if(fBrake && fork && fBrake.mount != null && fork.brakeMount != null && fBrake.mount !== fork.brakeMount)
    err('rg-brake-mount', ['frontBrake', 'fork'], 'Front brake mount mismatch: ' + roadNameOf(fBrake) + ' is ' + fBrake.mount + ' and ' + roadNameOf(fork) + ' takes ' + fork.brakeMount + ' calipers.');

  /* R19. Brifter/caliper coupling — on a drop bar the brake lever and shifter
        are ONE SKU, so the levers' brake system must be able to actuate the
        calipers. Only the DEFINITIONAL direction ships (the doc's explicit
        lean): a HYDRAULIC caliper behind a non-hydraulic lever has no fluid
        column to drive it — ERROR. The reverse (cable caliper on a hydraulic
        lever) and mechanical-disc lever/caliper matching are [MECHANIC
        REVIEW] and stay silent. Rim-lever-vs-disc-caliper mixes are already
        R17's class error. */
  /** @param {any} caliper @param {string} slot @param {string} endLabel */
  function brifterBrakeCheck(caliper, slot, endLabel){
    if(!caliper || !shifter || caliper.actuation !== 'hydraulic') return;
    if(typeof shifter.brakeSystem === 'string' && roadBrakeClass(shifter.brakeSystem) === 'disc' && shifter.brakeSystem !== 'disc-hydraulic')
      err('rg-brifter-brake', ['shifter', slot], endLabel + ' brake mismatch: ' + roadNameOf(caliper) + ' is hydraulic but ' + roadNameOf(shifter) + ' is a ' + shifter.brakeSystem + ' lever - a cable lever cannot drive a hydraulic caliper.');
  }
  brifterBrakeCheck(fBrake, 'frontBrake', 'Front');
  brifterBrakeCheck(rBrake, 'rearBrake', 'Rear');

  /* R20. SRAM full-mount (UDH) rear derailleur vs frame — the 13sp XPLR E1
        RDs bolt to a UDH dropout with no hanger ("Requires frame with UDH
        interface" on the fetched RD-FRC-1E-E1 / RD-RED-1E-E1 pages); the
        direct analogue of the live MTB rule 4. HONESTY TIERS, because no
        road/gravel frame row carries a udh field yet and inferring UDH
        absence would repeat this week's Cannondale-UDH bug:
        - frame.udh === false (sourced) -> ERROR;
        - frame.udh === true -> silent;
        - frame present, udh UNKNOWN -> INFO (the requirement is definitional
          and worth surfacing, but the frame's compatibility is unrecorded —
          an info cannot false-block);
        - no frame -> INFO (the MTB rule-4 frameless convention). */
  if(rd && rd.mount === 'udh-fullmount'){
    if(frame && frame.udh === false)
      err('rg-xplr-udh', ['frame', 'rearDerailleur'], 'Frame not UDH: ' + roadNameOf(rd) + ' is a hangerless full-mount derailleur that bolts only to a UDH dropout, and ' + roadNameOf(frame) + ' has a standard hanger.');
    else if(frame && frame.udh !== true)
      info('rg-xplr-udh', ['frame', 'rearDerailleur'], 'Check UDH: ' + roadNameOf(rd) + ' mounts only a UDH dropout, and ' + roadNameOf(frame) + '\'s UDH compatibility is not recorded in this catalog - confirm it on the maker\'s page.');
    else if(!frame)
      info('rg-xplr-udh', ['rearDerailleur'], 'Heads-up: ' + roadNameOf(rd) + ' is a hangerless full-mount derailleur and needs a UDH-compatible frame.');
  }

  return { errors: errors, warnings: warnings, infos: infos };
}

/* Price/weight totals — road/gravel has no bundle presets yet, so this is a
   plain sum (same {price, weight, missingWeight} shape as the MTB
   buildTotals / bmxBuildTotals). */
/** @param {Object.<string, any>|null|undefined} build @returns {{price: number, weight: number, missingWeight: boolean}} */
function roadBuildTotals(build){
  var b = resolveRoadBuild(build);
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
    ROAD_VOCAB: ROAD_VOCAB, ROAD_GROUPS: ROAD_GROUPS, ROAD_SLOTS: ROAD_SLOTS,
    ROAD_SYSTEM_CHAIN: ROAD_SYSTEM_CHAIN, ROAD_SRAM_AXS_SYSTEMS: ROAD_SRAM_AXS_SYSTEMS,
    roadSlotRequired: roadSlotRequired, checkRoadBuild: checkRoadBuild,
    roadBuildTotals: roadBuildTotals, roadFrameMaxTire: roadFrameMaxTire,
    roadForkTakesWheel: roadForkTakesWheel, roadBrakeClass: roadBrakeClass,
    verdictKey: roadVerdictKey
  };
}
