'use strict';
/* =============================================================================
   GRAVEL COMPATIBILITY ENGINE — checkGravelBuild  (OFF-LIVE)
   -----------------------------------------------------------------------------
   *** LOADED BY NOTHING THE SITE SERVES. *** No page references this file until
   Douglas's gravel go-live word (CLAUDE.md hard rule 3). Data: data/gravel.js
   (GRAVEL_PARTS, validated by src/schema-gravel.js); design basis:
   data/GRAVEL-MODEL.md + data/ROAD-GRAVEL-COMPAT-ANALYSIS.md +
   data/ROAD-GRAVEL-SHARED-STANDARDS.md.

   ARCHITECTURE NOTE (for the coordinator's road/gravel reconciliation):
   ROAD-GRAVEL-COMPAT-ANALYSIS.md §3 recommends ONE shared drop-bar engine
   serving both pages — road and gravel share every rule family, differing only
   in data. This module was commissioned as the GRAVEL round while the road
   round runs in parallel; to make the later merge mechanical rather than a
   rewrite, every ruleId below is the **`rg-*` id the shared analysis doc
   assigns** (rg = road+gravel), the vocab tokens are the shared-standards
   doc's tokens verbatim, and no rule here encodes anything gravel-only that
   the doc marks shared. If the road engine lands with the same ids, the two
   modules' rule bodies should be line-comparable; divergences are recorded
   inline with a "GRAVEL-SPECIFIC:" tag.

   ENGINE SEAM (the compat-bmx.js pattern, Douglas-approved for BMX 2026-07-13):
   own GROUPS/SLOTS/VOCAB + own ruleIds over a vocab DISJOINT from MTB
   (700c/650b not 29/275; flat-mount not PM/FM; hg-road/xdr/n3w never the MTB
   freehub tokens — the src/schema.js:88 "road expansion must SPLIT, not
   conflate" mandate), reusing compat.js's proven Verdict/verdictKey primitives
   (shared, never copied). A future page loads compat.js first, then this file.

   THE BAR (identical to the MTB engine): a false "won't fit" OR a false
   "fits" is worse than a missing rule. Every rule below either (a) rests on a
   definitional standards fact, (b) is a WARNING/INFO that cannot false-block,
   or (c) lands DORMANT behind an explicit sourced field no row carries yet
   (frame maxRotorR, frame udh, fork maxTire, rim-brake tokens, freehub
   adapter tiers) — see the per-rule notes. Points the analysis doc marks
   [MECHANIC REVIEW] stay on their safe half here and are flagged inline.

   Deliberately NOT rules (decided, not forgotten):
   - Suspension-fork travel vs frame: Douglas's confirmed GRAVEL-MODEL §2 lean —
     gravel frames publish no rated fork-travel max, so ANY threshold would be
     invented. `fork.travel`/`fork.suspension` stay display data. No rule.
   - Freehub adapter tiers (HG-L2 direction, 1.85mm HG spacer, N3W AC21 ring):
     analysis R5 [MECHANIC REVIEW]. Only the definitional exact-match ERROR
     ships; the adapter WARNINGs land when sourced + mechanic-cleared. Today's
     catalog carries no hg-l2 or legacy-Campagnolo rows, so nothing is masked.
   - FD numeric capacity vs chainring difference (analysis R16's fuzzy half):
     needs per-FD sourced tooth-diff caps AND a ring-pair field cranks don't
     carry — dormant by data shape; only the definitional 1x-control half ships.
   - Cross-brand hydraulic brifter↔caliper matching (Shimano lever on SRAM
     caliper etc.): real-world advice exists but no manufacturer compatibility
     doc was fetched this round — flagged for the mechanic review, NOT coded
     (the `leverPair` data field records the maker pairing for a future rule).
   - Gear range / tubeless / bar flare / pedal cleat style: display-only
     (analysis §1c) — never verdicts.

   This module is DATA-AGNOSTIC: it never reads a catalog, only the build map
   it is handed, so engine and data ship/split independently.
   ========================================================================== */

/* Shared verdict primitives: in Node (tests/CLI) via require; in a future
   browser page both files load as classic scripts and compat.js's top-level
   declarations are globals (compat.js must load first — the bmx.html rule). */
/** @type {{Verdict: new (ruleId: string, slots: string[], msg: string, fix?: {kind: string, name: string}) => any, verdictKey: (v: any) => string}} */
var _gravelShared = (typeof module !== 'undefined' && module.exports)
  ? require('./compat.js')
  : /** @type {any} */ (globalThis);
var GravelVerdict = _gravelShared.Verdict;
var gravelVerdictKey = _gravelShared.verdictKey;

/* ---- Vocab (ROAD-GRAVEL-SHARED-STANDARDS §2/§4 tokens, narrowed to the
        values data/gravel.js actually ships — the schema-gravel.js discipline.
        Documentation + future-validator reference; the engine compares values,
        it never gates on this table). Tokens are DISJOINT from MTB VOCAB by
        design — never reuse an MTB token whose meaning differs (hg-road ≠ the
        MTB 'HG'; flat-mount ≠ the MTB 'FM'). ------------------------------- */
var GRAVEL_VOCAB = {
  wheel:       ['700c', '650b'],
  frontAxle:   ['12x100', 'lefty-proprietary'],   // lefty = Cannondale single-sided (a real proprietary fitment)
  rearAxle:    ['12x142'],
  steerer:     ['tapered'],
  freehub:     ['hg-road', 'hg-l2', 'micro-spline-road', 'xdr', 'n3w'],  // hg-l2 vocab-only until a row exists
  rotorMount:  ['center-lock', '6-bolt'],
  brakeMount:  ['flat-mount'],                    // post-mount adapter tier dormant until a token/row exists
  chainStd:    ['hg', 'flattop', 'campag'],       // data/gravel.js stores this in chain.system
  actuation:   ['mechanical', 'di2-wired', 'axs-wireless'],
  system:      ['shimano-grx-12', 'shimano-grx-11', 'sram-xplr-12', 'sram-xplr-13',
                'sram-axs-road', 'sram-apex-mech-12', 'campag-ekar-13'],
  chainrings:  ['1x', '2x'],
  clamp:       ['31.8'],                          // 35 joins when a row ships it
  seatpost:    ['27.2', '31.6']
};

/* Chain standard per drivetrain system — engine-side pair data (the MTB
   adapter-fact convention: never a part field). Sources: SRAM XPLR support
   article (Flattop across AXS road/XPLR/Apex — also stated on the fetched
   RD-APX-1-D1 page note in data/gravel.js), Shimano road/GRX = HG chains
   (productinfo.shimano.com compatibility handbook), Campagnolo Ekar = its own
   13s chain (Bikerumor N3W teardown). All cited in the three basis docs. */
/** @type {Object.<string, string>} */
var GRAVEL_CHAIN_STD = {
  'shimano-grx-12': 'hg', 'shimano-grx-11': 'hg',
  'sram-xplr-12': 'flattop', 'sram-xplr-13': 'flattop',
  'sram-axs-road': 'flattop', 'sram-apex-mech-12': 'flattop',
  'campag-ekar-13': 'campag'
};

/* Human labels for vocab tokens (messages only). Fallback = the token. */
/** @type {Object.<string, string>} */
var GRAVEL_LABELS = {
  '700c': '700c', '650b': '650B',
  '12x100': '12x100mm thru-axle', '12x142': '12x142mm thru-axle',
  'lefty-proprietary': 'Lefty single-sided (proprietary)',
  'flat-mount': 'flat mount', 'center-lock': 'Center-Lock', '6-bolt': '6-bolt',
  'hg-road': 'Shimano road HG', 'hg-l2': 'Shimano HG L2',
  'micro-spline-road': 'Micro Spline Road', 'xdr': 'SRAM XDR', 'n3w': 'Campagnolo N3W',
  'hg': 'Shimano HG', 'flattop': 'SRAM Flattop', 'campag': 'Campagnolo',
  'mechanical': 'mechanical', 'di2-wired': 'Di2 (wired)', 'axs-wireless': 'AXS (wireless)',
  'tapered': 'tapered',
  'shimano-grx-12': 'Shimano GRX 12-speed', 'shimano-grx-11': 'Shimano GRX 11-speed',
  'sram-xplr-12': 'SRAM XPLR 12-speed', 'sram-xplr-13': 'SRAM XPLR 13-speed',
  'sram-axs-road': 'SRAM AXS road', 'sram-apex-mech-12': 'SRAM Apex mechanical 12-speed',
  'campag-ekar-13': 'Campagnolo Ekar 13-speed'
};
/** @param {any} t @returns {string} */
function gL(t){ return (t != null && GRAVEL_LABELS[t]) || String(t); }

/* ---- Groups / slots (ROAD-MODEL §2 slot set + the gravel deltas: optional
        dropper — Douglas's confirmed GRAVEL-MODEL §6-3 decision — and bartape.
        frontDerailleur is optional (1x is the gravel norm — the DJ
        drops-the-derailleur pattern); bb/headset are their own optional
        single-slot groups (the live MTB buildTotals reason); pedals optional
        (bikes sell without them — MTB precedent). Rotors stay REQUIRED:
        Douglas's disc-only-v1 lean means every gravel build brakes on discs. */
/** @type {Array<{key: string, label: string, slots: Array<{key: string, label: string, cat: string, optional?: boolean}>}>} */
var GRAVEL_GROUPS = [
  { key:'frame', label:'Frame', slots:[ {key:'frame', label:'Frame', cat:'frame'} ] },
  { key:'fork', label:'Fork', slots:[ {key:'fork', label:'Fork', cat:'fork'} ] },
  { key:'wheels', label:'Wheels', slots:[
      {key:'frontWheel', label:'Front Wheel', cat:'frontwheel'},
      {key:'rearWheel', label:'Rear Wheel', cat:'rearwheel'} ] },
  { key:'tires', label:'Tires', slots:[
      {key:'frontTire', label:'Front Tire', cat:'tire'},
      {key:'rearTire', label:'Rear Tire', cat:'tire'} ] },
  { key:'drivetrain', label:'Drivetrain', slots:[
      {key:'shifter', label:'Shifters (brifter pair)', cat:'shifter'},
      {key:'frontDerailleur', label:'Front Derailleur', cat:'derailleur', optional:true},
      {key:'rearDerailleur', label:'Rear Derailleur', cat:'derailleur'},
      {key:'cassette', label:'Cassette', cat:'cassette'},
      {key:'chain', label:'Chain', cat:'chain'},
      {key:'crankset', label:'Crankset', cat:'crankset'} ] },
  { key:'bb', label:'Bottom Bracket', slots:[ {key:'bb', label:'Bottom Bracket', cat:'bb', optional:true} ] },
  { key:'headset', label:'Headset', slots:[ {key:'headset', label:'Headset', cat:'headset', optional:true} ] },
  { key:'brakes', label:'Brakes', slots:[
      {key:'frontBrake', label:'Front Brake Caliper', cat:'brake'},
      {key:'rearBrake', label:'Rear Brake Caliper', cat:'brake'},
      {key:'frontRotor', label:'Front Rotor', cat:'rotor'},
      {key:'rearRotor', label:'Rear Rotor', cat:'rotor'} ] },
  { key:'cockpit', label:'Cockpit', slots:[
      {key:'handlebar', label:'Handlebar', cat:'handlebar'},
      {key:'stem', label:'Stem', cat:'stem'},
      {key:'bartape', label:'Bar Tape', cat:'bartape', optional:true} ] },
  { key:'seat', label:'Seat', slots:[
      {key:'seatpost', label:'Seatpost', cat:'seatpost'},
      {key:'dropper', label:'Dropper Post', cat:'dropper', optional:true},
      {key:'saddle', label:'Saddle', cat:'saddle'} ] },
  { key:'pedals', label:'Pedals', slots:[ {key:'pedals', label:'Pedals', cat:'pedal', optional:true} ] }
];
/** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */
var GRAVEL_SLOTS = GRAVEL_GROUPS.reduce(function(a, g){
  return a.concat(g.slots.map(function(s){ return Object.assign({group: g.key}, s); }));
}, /** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */ ([]));

/* Is this slot required for a "complete" gravel build? UI-completeness only —
   never a fit verdict (the compat.js slotRequired contract). One dynamic drop:
   a picked DROPPER fills the seat-tube role, so the rigid seatpost slot stops
   being required (a dropper-equipped Checkpoint/Grizl is a complete bike —
   GRAVEL-MODEL §2). Everything else is static optionality. */
/** @param {{key?: string, optional?: boolean}} slot @param {Object.<string, any>} [build] @returns {boolean} */
function gravelSlotRequired(slot, build){
  if(slot.optional) return false;
  if(slot.key === 'seatpost' && build && build.dropper) return false;
  return true;
}

/* Input honesty guard (the compat.js resolveBuild lesson): a build of id
   STRINGS would trip no rule — every field read is undefined — and return a
   silent false all-clear. This engine holds no catalog; strings are rejected. */
/** @param {Object.<string, any>|null|undefined} build @returns {Object.<string, any>} */
function resolveGravelBuild(build){
  /** @type {Object.<string, any>} */ var out = {};
  var src = build || {};
  Object.keys(src).forEach(function(k){
    var v = src[k];
    if(typeof v === 'string') throw new TypeError('gravel build.' + k + ' is a string ("' + v + '") - pass part objects, not ids (this engine holds no catalog to resolve them).');
    if(v) out[k] = v;
  });
  return out;
}

/** @param {any} p @returns {string} */
function gNameOf(p){ return p ? (p.brand + ' ' + p.model) : ''; }

/* =============================================================================
   checkGravelBuild(build) -> { errors, warnings, infos } of shared Verdicts.
   build: slotKey (see GRAVEL_SLOTS) -> part object in data/gravel.js's field
   conventions. Rules R1–R20 of ROAD-GRAVEL-COMPAT-ANALYSIS.md §1, gravel data
   ranges. Tire widths are MILLIMETRES throughout (the doc's unit trap: MTB is
   inches — this engine never sees an MTB tire).
   ========================================================================== */
/** @param {Object.<string, any>|null|undefined} build @returns {{errors: any[], warnings: any[], infos: any[]}} */
function checkGravelBuild(build){
  /** @type {any[]} */ var errors = [];
  /** @type {any[]} */ var warnings = [];
  /** @type {any[]} */ var infos = [];
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function err(ruleId, slots, msg){ errors.push(new GravelVerdict(ruleId, slots, msg)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg @param {{kind: string, name: string}} [fix] */
  function warn(ruleId, slots, msg, fix){ warnings.push(new GravelVerdict(ruleId, slots, msg, fix)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function info(ruleId, slots, msg){ infos.push(new GravelVerdict(ruleId, slots, msg)); }

  var b = resolveGravelBuild(build);
  var frame = b.frame, fork = b.fork, fWheel = b.frontWheel, rWheel = b.rearWheel,
      fTire = b.frontTire, rTire = b.rearTire, shifter = b.shifter, fd = b.frontDerailleur,
      rd = b.rearDerailleur, cassette = b.cassette, chain = b.chain, crankset = b.crankset,
      bb = b.bb, hset = b.headset, fBrake = b.frontBrake, rBrake = b.rearBrake,
      fRotor = b.frontRotor, rRotor = b.rearRotor, bar = b.handlebar, stem = b.stem,
      seatpost = b.seatpost, dropper = b.dropper;

  /* R1. rg-wheel-size — matched 700c OR 650B pair, end to end. Definitional
        ERROR (GRAVEL-MODEL §1-2: a frame commonly supports both sizes but a
        build runs a MATCHED pair — drop-bar bikes never mullet). Frame
        declares wheelSizes[] and the fork wheel[] (both commonly support
        both); wheels/tires each declare one size. */
  /** @type {Array<[string, string, string]>} */ var ws = [];
  if(fWheel && fWheel.wheel) ws.push(['Front wheel', fWheel.wheel, 'frontWheel']);
  if(rWheel && rWheel.wheel) ws.push(['Rear wheel', rWheel.wheel, 'rearWheel']);
  if(fTire && fTire.wheel) ws.push(['Front tire', fTire.wheel, 'frontTire']);
  if(rTire && rTire.wheel) ws.push(['Rear tire', rTire.wheel, 'rearTire']);
  var wsSizes = ws.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
  if(wsSizes.length > 1){
    err('rg-wheel-size', ws.map(function(x){ return x[2]; }),
      'Wheel size mismatch: ' + ws.map(function(x){ return x[0] + ' = ' + gL(x[1]); }).join(', ') + '. A gravel build runs one matched wheel size end to end (700c or 650B).');
  } else if(wsSizes.length === 1){
    var wsz = wsSizes[0];
    if(frame && Array.isArray(frame.wheelSizes) && frame.wheelSizes.indexOf(wsz) < 0)
      err('rg-wheel-size', ['frame'].concat(ws.map(function(x){ return x[2]; })),
        'Unsupported wheel size: ' + gNameOf(frame) + ' supports ' + frame.wheelSizes.map(gL).join(' / ') + ', but this build is ' + gL(wsz) + '.');
    if(fork && Array.isArray(fork.wheel) && fork.wheel.indexOf(wsz) < 0)
      err('rg-wheel-size', ['fork'].concat(ws.map(function(x){ return x[2]; })),
        'Unsupported wheel size: ' + gNameOf(fork) + ' takes ' + fork.wheel.map(gL).join(' / ') + ', but this build is ' + gL(wsz) + '.');
  }

  /* R2/R3. rg-front-axle / rg-rear-axle — exact-match thru-axle standards.
        Definitional ERROR. The Lefty's proprietary axle honestly errors
        against every generic hub (a real single-sided fitment). */
  if(fork && fWheel && fWheel.hub != null && fork.axle !== fWheel.hub)
    err('rg-front-axle', ['fork', 'frontWheel'], 'Front axle mismatch: ' + gNameOf(fork) + ' is ' + gL(fork.axle) + ' but ' + gNameOf(fWheel) + '\'s hub is ' + gL(fWheel.hub) + '.');
  if(frame && rWheel && rWheel.hub != null && frame.rearAxle !== rWheel.hub)
    err('rg-rear-axle', ['frame', 'rearWheel'], 'Rear axle mismatch: ' + gNameOf(frame) + ' is ' + gL(frame.rearAxle) + ' but ' + gNameOf(rWheel) + '\'s hub is ' + gL(rWheel.hub) + '.');

  /* R4. rg-steerer — fork steerer vs frame; rg-headset-steerer — headset vs
        fork (the MTB rule 11/20a split, so each conflict anchors its own
        slots). Exact-match ERROR; today's vocab is all 'tapered' so both are
        armed-but-silent until a straight-steerer row ships. Cup-vs-head-tube
        S.H.I.S. (MTB 20b) is DORMANT: gravel frames carry no head-tube codes. */
  if(fork && frame && frame.steerer != null && fork.steerer !== frame.steerer)
    err('rg-steerer', ['fork', 'frame'], 'Steerer mismatch: ' + gNameOf(fork) + ' has a ' + gL(fork.steerer) + ' steerer but ' + gNameOf(frame) + '\'s head tube takes ' + gL(frame.steerer) + '.');
  if(hset && fork && hset.steerer != null && hset.steerer !== fork.steerer)
    err('rg-headset-steerer', ['headset', 'fork'], 'Headset steerer mismatch: ' + gNameOf(hset) + ' accepts a ' + gL(hset.steerer) + ' steerer but ' + gNameOf(fork) + ' is ' + gL(fork.steerer) + '.');

  /* R5. rg-freehub — cassette body vs rear-wheel driver. Exact-match ERROR
        (the definitional, safe-to-ship half of analysis R5). The documented
        adapter tiers (HG-L2 direction-awareness, the 1.85mm HG spacer, the
        N3W AC21 ring for legacy Campagnolo cassettes) are [MECHANIC REVIEW]
        and land DORMANT: no current row carries hg-l2 or a legacy-Campagnolo
        cassette, so the exact-match error masks no documented interchange. */
  if(cassette && rWheel && rWheel.freehub != null && cassette.freehub !== rWheel.freehub)
    err('rg-freehub', ['cassette', 'rearWheel'], 'Freehub mismatch: ' + gNameOf(cassette) + ' needs a ' + gL(cassette.freehub) + ' freehub body, but ' + gNameOf(rWheel) + ' has ' + gL(rWheel.freehub) + '.');

  /* R6. rg-rd-capacity — cassette max cog vs the rear derailleur's
        maker-stated max. ERROR on exceed (the analysis lean: maker-stated
        caps are hard). Total-capacity math stays DORMANT ([MECHANIC REVIEW] —
        needs per-RD sourced totals). Fires only off a present rd.maxCog. */
  if(cassette && rd && typeof rd.maxCog === 'number' && typeof cassette.maxCog === 'number' && cassette.maxCog > rd.maxCog)
    err('rg-rd-capacity', ['cassette', 'rearDerailleur'], 'Cassette too big: ' + cassette.maxCog + 'T exceeds ' + gNameOf(rd) + '\'s maker-stated maximum of ' + rd.maxCog + 'T.');

  /* R7. rg-rotor-mount — rotor interface vs hub, direction-aware (byte-for-
        byte the MTB rule-9 logic over the same two interfaces — the analysis
        doc's prime shared-helper candidate; flagged for the coordinator's
        reconciliation rather than reaching into MTB internals from here).
        Center-Lock rotor on a 6-bolt hub = ERROR (no adapter exists);
        6-bolt rotor on a Center-Lock hub = WARNING with the named adapter. */
  /** @param {any} rotor @param {any} wheel @param {string} rotorSlot @param {string} wheelSlot @param {string} end */
  function rotorMountCheck(rotor, wheel, rotorSlot, wheelSlot, end){
    if(!rotor || !wheel || rotor.mount == null || wheel.rotorMount == null || rotor.mount === wheel.rotorMount) return;
    if(rotor.mount === 'center-lock' && wheel.rotorMount === '6-bolt')
      err('rg-rotor-mount', [rotorSlot, wheelSlot], end + ' rotor interface mismatch: ' + gL(rotor.mount) + ' rotor on a ' + gL(wheel.rotorMount) + ' hub - no adapter exists for this direction.');
    else if(rotor.mount === '6-bolt' && wheel.rotorMount === 'center-lock')
      warn('rg-rotor-mount', [rotorSlot, wheelSlot], end + ' rotor: ' + gNameOf(rotor) + ' is 6-bolt and ' + gNameOf(wheel) + '\'s hub is Center-Lock - it works with a Center-Lock-to-6-bolt adapter (sold separately).', {kind: 'adapter', name: 'Shimano SM-RTAD05'});
    else
      err('rg-rotor-mount', [rotorSlot, wheelSlot], end + ' rotor interface mismatch: ' + gL(rotor.mount) + ' rotor on a ' + gL(wheel.rotorMount) + ' hub.');
  }
  rotorMountCheck(fRotor, fWheel, 'frontRotor', 'frontWheel', 'Front');
  rotorMountCheck(rRotor, rWheel, 'rearRotor', 'rearWheel', 'Rear');

  /* R8. rg-rotor-size — rotor vs a SOURCED per-part max only (the analysis
        lean: a hard flat-mount 140/160 default cap would false-block
        proprietary big-rotor bikes — sourced-per-fork/frame or silent).
        WARNING tier, matching the live MTB rule 10. Front side is live
        (every gravel fork row carries maxRotorF); the frame side is DORMANT
        until a frame row carries a sourced maxRotorR (none does yet). */
  if(fRotor && fork && typeof fork.maxRotorF === 'number' && typeof fRotor.size === 'number' && fRotor.size > fork.maxRotorF)
    warn('rg-rotor-size', ['frontRotor', 'fork'], 'Front rotor over max: ' + fRotor.size + 'mm exceeds ' + gNameOf(fork) + '\'s stated maximum of ' + fork.maxRotorF + 'mm.');
  if(rRotor && frame && typeof frame.maxRotorR === 'number' && typeof rRotor.size === 'number' && rRotor.size > frame.maxRotorR)
    warn('rg-rotor-size', ['rearRotor', 'frame'], 'Rear rotor over max: ' + rRotor.size + 'mm exceeds ' + gNameOf(frame) + '\'s stated maximum of ' + frame.maxRotorR + 'mm.');

  /* R9. rg-tire-clearance — REAR tire width (mm) vs the frame's maker-
        published clearance for the tire's wheel size (the maxTireByWheel map,
        Douglas's confirmed GRAVEL-MODEL §6-1 shape). WARNING tier: the
        analysis doc leaned ERROR, but the live MTB rule 18 — the template
        this rule is built on — ships the same maker-published-clearance
        check as a WARNING (measured widths vary by rim); adopted the proven
        precedent, severity flagged for the mechanic review. Fires only off a
        published number for that size (a frame that publishes only 700c
        stays honest-silent about 650B). GRAVEL-SPECIFIC data note: the
        front tire's chassis limit is the FORK crown, and no gravel fork row
        publishes a maxTire — that side is DORMANT (rg-tire-fork below), not
        silently folded into the frame number.
        rg-tire-rim — tire vs the wheel's published rim max (both ends, live:
        wheel rows carry maxTire). WARNING. */
  if(rTire && frame && frame.maxTireByWheel && typeof rTire.width === 'number' && rTire.wheel != null){
    var frMax = frame.maxTireByWheel[rTire.wheel];
    if(typeof frMax === 'number' && rTire.width > frMax)
      warn('rg-tire-clearance', ['rearTire', 'frame'], 'Tire clearance: ' + rTire.width + 'mm tire is wider than ' + gNameOf(frame) + '\'s published ' + gL(rTire.wheel) + ' max of ' + frMax + 'mm.');
  }
  /** @param {any} tire @param {any} host @param {string} tireSlot @param {string} hostSlot @param {string} what */
  function tireHostCheck(tire, host, tireSlot, hostSlot, what){
    if(tire && host && typeof host.maxTire === 'number' && typeof tire.width === 'number' && tire.width > host.maxTire)
      warn(what === 'fork' ? 'rg-tire-fork' : 'rg-tire-rim', [tireSlot, hostSlot], 'Tire clearance: ' + tire.width + 'mm tire is wider than ' + gNameOf(host) + '\'s published ' + host.maxTire + 'mm ' + what + ' max.');
  }
  tireHostCheck(fTire, fork, 'frontTire', 'fork', 'fork');       // DORMANT until a fork row carries maxTire
  tireHostCheck(fTire, fWheel, 'frontTire', 'frontWheel', 'rim');
  tireHostCheck(rTire, rWheel, 'rearTire', 'rearWheel', 'rim');

  /* R10. rg-bar-clamp — bar clamp vs stem clamp. Definitional ERROR. When an
        integrated one-piece cockpit category ships, it has no clamp axis and
        this rule simply never sees it (both fields absent = silent). */
  if(bar && stem && bar.clamp != null && stem.clamp != null && bar.clamp !== stem.clamp)
    err('rg-bar-clamp', ['handlebar', 'stem'], 'Bar/stem clamp mismatch: ' + gNameOf(bar) + ' is ' + bar.clamp + 'mm but ' + gNameOf(stem) + ' clamps ' + stem.clamp + 'mm.');

  /* R11. rg-bb-shell / rg-bb-spindle — via a PURCHASABLE BB row, the MTB
        rule-7 pattern: both of a picked BB's interfaces are exact
        definitional checks over the road shell zoo. With no BB picked, an
        advisory INFO nudges (the slot is optional — completeness never
        blocks on it). */
  if(bb && frame && bb.shell !== frame.bb)
    err('rg-bb-shell', ['bb', 'frame'], 'BB shell mismatch: ' + gNameOf(bb) + ' fits a ' + gL(bb.shell) + ' shell but ' + gNameOf(frame) + ' has a ' + gL(frame.bb) + ' shell.');
  if(bb && crankset && bb.spindle !== crankset.bb)
    err('rg-bb-spindle', ['bb', 'crankset'], 'BB spindle mismatch: ' + gNameOf(bb) + ' takes a ' + gL(bb.spindle) + ' spindle but ' + gNameOf(crankset) + ' runs ' + gL(crankset.bb) + '.');
  if(!bb && crankset && frame)
    info('rg-bb-advisory', ['crankset', 'frame'], 'Bottom bracket: ' + gNameOf(crankset) + ' has a ' + gL(crankset.bb) + ' spindle - pick the ' + gL(frame.bb) + '-shell bottom bracket that takes it (sold separately).');

  /* R12. rg-seatpost — post/dropper diameter vs the frame's seat-tube bore,
        direction-aware (the MTB rule 13/13c logic): a bigger post cannot
        enter a smaller tube (ERROR); a smaller post runs on a reducing shim
        (WARNING). Diameters are string tokens ('27.2'/'31.6') compared
        numerically. Aero/proprietary-post locks land when a proprietary row
        ships (no such row yet — dormant by data). */
  /** @param {any} post @param {string} postSlot @param {string} postLabel */
  function postCheck(post, postSlot, postLabel){
    if(!post || !frame || post.diameter == null || frame.seatpost == null) return;
    var pd = parseFloat(post.diameter), fdD = parseFloat(frame.seatpost);
    if(isNaN(pd) || isNaN(fdD) || pd === fdD) return;
    if(pd > fdD)
      err('rg-seatpost', [postSlot, 'frame'], postLabel + ' too big: ' + gNameOf(frame) + '\'s seat tube is ' + frame.seatpost + 'mm but ' + gNameOf(post) + ' is ' + post.diameter + 'mm - a bigger post cannot fit a smaller tube.');
    else
      warn('rg-seatpost', [postSlot, 'frame'], postLabel + ': ' + gNameOf(post) + ' is ' + post.diameter + 'mm in a ' + frame.seatpost + 'mm seat tube - it works with a ' + post.diameter + '-to-' + frame.seatpost + 'mm reducing shim (sold separately).', {kind: 'adapter', name: post.diameter + '-to-' + frame.seatpost + 'mm seatpost shim'});
  }
  postCheck(seatpost, 'seatpost', 'Seatpost');
  postCheck(dropper, 'dropper', 'Dropper');

  /* R13. rg-drivetrain-system / rg-drivetrain-speeds — one system + one speed
        count across shifter / front derailleur / rear derailleur / cassette.
        The CHAIN is excluded from BOTH pools on purpose:
        - system: data/gravel.js stores the chain's WIDTH STANDARD
          (hg/flattop/campag) in chain.system, not a group token — R15 below
          is the chain's whole check (folding it in here would compare
          disjoint vocabularies, the false-error generator the MTB engine's
          M1 review caught).
        - speeds: chains are width-defined; Shimano/Campagnolo chains are
          speed-specific but SRAM documents Flattop across groups
          ([MECHANIC REVIEW] — a chain-speed check lands only after the
          per-standard chain matrix is mechanic-cleared; the MTB engine
          excludes the chain for the identical reason).
        The CRANKSET is also excluded ([MECHANIC REVIEW]): SRAM publishes its
        XPLR cranks as 12/13-speed spanning, so a crank-speed check would
        false-red documented combinations; the crank's real interfaces are
        R11 (spindle) and R15/R16 (ring standard, 1x/2x).
        AXS-controller exemption (the fetched SRAM cross-compat articles, via
        the analysis doc R13): ALL SRAM AXS road/XPLR controllers drive ALL
        SRAM AXS road/XPLR derailleurs — an axs-wireless SRAM shifter leaves
        both pools; its real constraint is R14 actuation. The exemption never
        crosses to a non-SRAM system: an AXS controller on a Shimano/Campag
        drivetrain stays an honest error. */
  /** @type {Array<[string, any, string]>} */
  var dt = [];
  if(shifter) dt.push(['Shifter', shifter, 'shifter']);
  if(fd) dt.push(['Front derailleur', fd, 'frontDerailleur']);
  if(rd) dt.push(['Rear derailleur', rd, 'rearDerailleur']);
  if(cassette) dt.push(['Cassette', cassette, 'cassette']);
  if(dt.length > 1){
    var axsCtrl = !!(shifter && shifter.actuation === 'axs-wireless' && typeof shifter.system === 'string' && shifter.system.indexOf('sram-') === 0);
    var dtSys = axsCtrl ? dt.filter(function(x){ return x[1] !== shifter; }) : dt;
    var systems = dtSys.map(function(x){ return x[1].system; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(systems.length > 1)
      err('rg-drivetrain-system', dtSys.map(function(x){ return x[2]; }), 'Drivetrain mismatch: ' + dtSys.map(function(x){ return x[0] + ' = ' + gL(x[1].system); }).join(', ') + '. Shifters, derailleurs and cassette must be one system.');
    else if(axsCtrl && systems.length === 1 && String(systems[0]).indexOf('sram-') !== 0)
      err('rg-drivetrain-system', dt.map(function(x){ return x[2]; }), 'Drivetrain mismatch: ' + dt.map(function(x){ return x[0] + ' = ' + gL(x[1].system); }).join(', ') + '. A SRAM AXS controller only drives SRAM AXS derailleurs.');
    var dtSpeed = axsCtrl ? dt.filter(function(x){ return x[1] !== shifter; }) : dt;
    var speeds = dtSpeed.map(function(x){ return x[1].speeds; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(speeds.length > 1)
      err('rg-drivetrain-speeds', dtSpeed.map(function(x){ return x[2]; }), 'Speed mismatch: ' + dtSpeed.map(function(x){ return x[0] + ' ' + x[1].speeds + 's'; }).join(', ') + '. The geared parts must share one speed count.');
  }

  /* R14. rg-actuation — mechanical vs Di2-wired vs AXS-wireless are three
        mutually exclusive worlds (the road split of the MTB cable/electronic
        rule): a lever of one world cannot drive a mech of another. ERROR,
        checked shifter-vs-each-derailleur. */
  /** @param {any} mech @param {string} mechSlot @param {string} mechLabel */
  function actuationCheck(mech, mechSlot, mechLabel){
    if(shifter && mech && shifter.actuation != null && mech.actuation != null && shifter.actuation !== mech.actuation)
      err('rg-actuation', ['shifter', mechSlot], 'Actuation mismatch: ' + gNameOf(shifter) + ' is ' + gL(shifter.actuation) + ' but the ' + mechLabel + ' (' + gNameOf(mech) + ') is ' + gL(mech.actuation) + ' - no adapter exists across actuation worlds.');
  }
  actuationCheck(rd, 'rearDerailleur', 'rear derailleur');
  actuationCheck(fd, 'frontDerailleur', 'front derailleur');

  /* R15. rg-chain-std — the chain's width standard (hg/flattop/campag, stored
        in chain.system) must match the drivetrain system's documented chain
        (the GRAVEL_CHAIN_STD table above — engine-side pair data). ERROR;
        definitional given the system. Keyed off the rear derailleur (the
        part that meshes the chain), falling back to the cassette. */
  var chainRef = rd || cassette;
  if(chain && chain.system != null && chainRef && chainRef.system != null){
    var wantStd = GRAVEL_CHAIN_STD[chainRef.system];
    if(wantStd && chain.system !== wantStd)
      err('rg-chain-std', ['chain', rd ? 'rearDerailleur' : 'cassette'], 'Chain standard mismatch: ' + gL(chainRef.system) + ' runs a ' + gL(wantStd) + ' chain, but ' + gNameOf(chain) + ' is ' + gL(chain.system) + '.');
  }

  /* R16. rg-2x-system / rg-fd-mount / rg-fd-advisory — the definitional 1x/2x
        halves only (the analysis lean; numeric FD tooth-capacity stays
        DORMANT until sourced per-FD and mechanic-cleared):
        - a 1x control (frontShift:false) cannot shift a 2x crank -> ERROR;
        - a front derailleur with a 1x control has nothing to actuate -> ERROR;
        - a front derailleur on a frame with NO FD mount (frontDerailleurMount
          'none' — a maker-stated frame fact) has nowhere to bolt -> ERROR;
        - a 2x crank with no FD picked -> advisory INFO (the FD slot is
          optional so completeness stays quiet; the nudge is honest). */
  if(shifter && crankset && shifter.frontShift === false && crankset.chainrings === '2x')
    err('rg-2x-system', ['shifter', 'crankset'], '1x control on a 2x crank: ' + gNameOf(shifter) + ' has no left-hand shift, so ' + gNameOf(crankset) + '\'s two chainrings cannot be shifted.');
  if(shifter && fd && shifter.frontShift === false)
    err('rg-2x-system', ['shifter', 'frontDerailleur'], 'No front shifter: ' + gNameOf(shifter) + ' has no left-hand shift, so the ' + gNameOf(fd) + ' front derailleur cannot be actuated.');
  if(fd && frame && frame.frontDerailleurMount === 'none')
    err('rg-fd-mount', ['frontDerailleur', 'frame'], '1x-only frame: ' + gNameOf(frame) + ' has no front-derailleur mount - the ' + gNameOf(fd) + ' has nowhere to bolt.');
  if(!fd && crankset && crankset.chainrings === '2x' && shifter && shifter.frontShift === true)
    info('rg-fd-advisory', ['crankset', 'shifter'], '2x crankset: ' + gNameOf(crankset) + ' runs two chainrings - pick a front derailleur to shift them.');

  /* R17. rg-brake-system — disc vs rim end-to-end consistency guard. Today's
        vocab is disc-only (Douglas's disc-only-v1 lean), and the disc tokens
        deliberately differ in granularity per category (frame 'disc-flat',
        wheel 'disc', brifter 'disc-hydraulic') — so the check classifies by
        FAMILY (disc vs rim), never exact tokens (an exact-match here would
        false-red every legitimate build). ARMED-DORMANT: it can only fire
        once a rim-family row ships, but a stray rim part then cannot
        false-green. */
  /** @param {any} v @returns {string|null} */
  function brakeFamily(v){
    if(v == null) return null;
    var s = String(v);
    if(s.indexOf('disc') === 0) return 'disc';
    if(s.indexOf('rim') === 0) return 'rim';
    return null;
  }
  /** @type {Array<[string, string, string]>} */ var bf = [];
  [['Frame', frame, 'frame'], ['Fork', fork, 'fork'], ['Front wheel', fWheel, 'frontWheel'],
   ['Rear wheel', rWheel, 'rearWheel'], ['Shifters', shifter, 'shifter'],
   ['Front brake', fBrake, 'frontBrake'], ['Rear brake', rBrake, 'rearBrake']].forEach(function(x){
    var fam = x[1] ? brakeFamily(x[1].brakeSystem) : null;
    if(fam) bf.push([/** @type {string} */ (x[0]), fam, /** @type {string} */ (x[2])]);
  });
  var bfFams = bf.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
  if(bfFams.length > 1)
    err('rg-brake-system', bf.map(function(x){ return x[2]; }),
      'Brake system mismatch: ' + bf.map(function(x){ return x[0] + ' = ' + x[1]; }).join(', ') + '. Disc and rim-brake parts cannot mix in one build.');

  /* R18. rg-brake-mount — caliper mount vs frame (rear) / fork (front).
        Exact-match ERROR over the road/gravel mount vocab (flat-mount today;
        NEVER the MTB PM/FM tokens — a colliding token would be a false-green
        generator). The post-mount-to-flat-mount adapter tier lands as a
        sourced WARNING when a post-mount row ships (dormant by vocab). */
  if(fBrake && fork && fork.brakeMount != null && fBrake.mount !== fork.brakeMount)
    err('rg-brake-mount', ['frontBrake', 'fork'], 'Front brake mount mismatch: ' + gNameOf(fBrake) + ' is ' + gL(fBrake.mount) + ' but ' + gNameOf(fork) + ' takes ' + gL(fork.brakeMount) + '.');
  if(rBrake && frame && frame.brakeMount != null && rBrake.mount !== frame.brakeMount)
    err('rg-brake-mount', ['rearBrake', 'frame'], 'Rear brake mount mismatch: ' + gNameOf(rBrake) + ' is ' + gL(rBrake.mount) + ' but ' + gNameOf(frame) + ' takes ' + gL(frame.brakeMount) + '.');

  /* R19. rg-brifter-brake — the brifter IS the brake lever, so its brake
        system must be able to drive the picked calipers. Definitional half
        only (the analysis lean): a hydraulic caliper needs a hydraulic
        brifter and a cable-actuated caliper needs a mechanical-brake
        brifter — neither converts. Cross-brand hydraulic pairing (mineral
        oil vs DOT, lever ratios) is [MECHANIC REVIEW] and deliberately NOT
        checked — no manufacturer doc fetched; the caliper rows' `leverPair`
        field records the maker pairing for that future rule. */
  /** @param {any} cal @param {string} calSlot @param {string} end */
  function brifterBrakeCheck(cal, calSlot, end){
    if(!shifter || !cal || cal.actuation == null || shifter.brakeSystem == null) return;
    var levHydraulic = String(shifter.brakeSystem).indexOf('hydraulic') >= 0;
    if(cal.actuation === 'hydraulic' && !levHydraulic)
      err('rg-brifter-brake', ['shifter', calSlot], end + ' brake mismatch: ' + gNameOf(cal) + ' is a hydraulic caliper but ' + gNameOf(shifter) + ' is not a hydraulic-brake lever - a cable lever cannot push fluid.');
    else if(cal.actuation === 'mechanical' && levHydraulic)
      err('rg-brifter-brake', ['shifter', calSlot], end + ' brake mismatch: ' + gNameOf(cal) + ' is a cable-actuated caliper but ' + gNameOf(shifter) + ' is a hydraulic lever with no cable to pull.');
  }
  brifterBrakeCheck(fBrake, 'frontBrake', 'Front');
  brifterBrakeCheck(rBrake, 'rearBrake', 'Rear');

  /* R20. rg-xplr-udh — a UDH full-mount rear derailleur (13-speed XPLR E1,
        maker-stated on the fetched SRAM pages in data/gravel.js) bolts only
        to a UDH dropout. The direct analog of the live MTB rule 4, with the
        rule-18 dormancy discipline on the frame side: gravel frame rows
        carry no udh field yet, and absence means UNKNOWN — firing an error
        on every unknown frame would false-block real UDH frames (the
        Checkpoint Gen 3 is one). So:
        - frame.udh === false (explicit, sourced)  -> ERROR (dormant today);
        - frame present, udh unknown               -> INFO (honest nudge,
          never blocks);
        - no frame picked                          -> INFO (the MTB rule-4
          frameless convention).
        ACTIVATION: add optional `udh` to schema-gravel.js + sourced rows. */
  if(rd && rd.mount === 'udh-fullmount'){
    if(frame && frame.udh === false)
      err('rg-xplr-udh', ['rearDerailleur', 'frame'], 'Frame not UDH: ' + gNameOf(rd) + ' is a full-mount (UDH) derailleur, but ' + gNameOf(frame) + ' has a standard hanger (maker-stated).');
    else if(frame && frame.udh == null)
      info('rg-xplr-udh', ['rearDerailleur', 'frame'], 'UDH required: ' + gNameOf(rd) + ' mounts only on a UDH dropout - confirm ' + gNameOf(frame) + ' has one (its UDH status is not yet recorded here).');
    else if(!frame)
      info('rg-xplr-udh', ['rearDerailleur'], 'UDH required: ' + gNameOf(rd) + ' is a full-mount derailleur - it needs a frame with a UDH dropout.');
  }

  return { errors: errors, warnings: warnings, infos: infos };
}

/* Price/weight totals — the gravel catalog has no bundle presets, so this is
   a plain sum (same {price, weight, missingWeight} shape as the MTB
   buildTotals / bmxBuildTotals). */
/** @param {Object.<string, any>|null|undefined} build @returns {{price: number, weight: number, missingWeight: boolean}} */
function gravelBuildTotals(build){
  var b = resolveGravelBuild(build);
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
    GRAVEL_VOCAB: GRAVEL_VOCAB, GRAVEL_GROUPS: GRAVEL_GROUPS, GRAVEL_SLOTS: GRAVEL_SLOTS,
    GRAVEL_CHAIN_STD: GRAVEL_CHAIN_STD,
    gravelSlotRequired: gravelSlotRequired, checkGravelBuild: checkGravelBuild,
    gravelBuildTotals: gravelBuildTotals,
    verdictKey: gravelVerdictKey
  };
}
