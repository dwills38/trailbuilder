'use strict';
/* =============================================================================
   TrailBuilder — shared JSDoc type definitions (TYPE-CHECKING ONLY, no runtime
   code; this module exports nothing useful and is never require()d at runtime).
   -----------------------------------------------------------------------------
   These types MIRROR schema.js, which is the runtime source of truth for "valid
   data". When you add or change a field in schema.js's SCHEMA/VOCAB, update the
   matching variant below so `npm run typecheck` and the validator stay in
   agreement.

   `Part` is a DISCRIMINATED UNION keyed by `cat`: each category has its own
   variant with its required fields. Switching on `part.cat` (see specSummary) or
   reading a typed build slot (see Build) narrows to the exact variant, so the
   engine gets precise field types and tsc rejects, say, a fork carrying a frame
   field or a part missing a required one.
   ========================================================================== */

/** Bike + Rider Kit categories. The kit categories (helmet…eyewear) are a flat
 * string union — cheap for tsc — so `Slot.cat` covers kit slots too. The kit
 * OBJECT variants live in a SEPARATE `KitPart` union (see the bottom of this file),
 * NOT folded into `Part`, to keep compat.js's ~3000-row PARTS literal under tsc's
 * union-complexity ceiling. @typedef {'frame'|'fork'|'shock'|'frontwheel'|'rearwheel'|'fronthub'|'rearhub'|'rim'|'tire'|'shifter'|'derailleur'|'cassette'|'chain'|'crankset'|'cog'|'seatpost'|'bb'|'headset'|'brake'|'rotor'|'handlebar'|'stem'|'grips'|'dropper'|'saddle'|'pedal'|'groupset'|'wheelset'|'brakeset'|'cockpitset'|'completebike'|'helmet'|'shoes'|'jersey'|'shorts'|'pants'|'gloves'|'kneepad'|'elbowpad'|'bodyarmor'|'neckbrace'|'shinguard'|'eyewear'} Category */

/* ---- vocabularies (mirror VOCAB in schema.js) ---------------------------- */
/** @typedef {'29'|'275'|'26'|'24'} WheelSize */
/** @typedef {'29'|'275'|'mullet'|'26'|'24'} WheelConfig */
/** @typedef {'Boost148'|'SuperBoost157'|'142x12'|'150x12'|'10x135-bolt'} RearAxle */
/** @typedef {'Boost110'|'20x110'|'20x110-nonboost'|'15x100'} FrontAxle */
/** Wheel/hub-side driver interface. 'integrated' = the driver IS a built-in
 * cassette (e*thirteen LG1r DH rear), so no separate cassette mounts - legal
 * on rearwheel/rearhub rows only, never on a cassette (schema cross-rule;
 * CassetteFreehub mirrors that restriction for tsc).
 * 'XDR' = the road/gravel-length SRAM driver body (1.85mm longer than XD) -
 * a real WTB CZR-hub option, distinct from 'XD' (needs a spacer to seat an
 * MTB/XD cassette), never conflate the two.
 * 'single-speed' = a dedicated single-speed driver / thread-on cog interface
 * (DJ; takes ONE cog, no cassette) - wheel/hub-side only, like 'integrated'.
 * @typedef {'XD'|'MicroSpline'|'HG'|'integrated'|'XDR'|'single-speed'} Freehub */
/** @typedef {'XD'|'MicroSpline'|'HG'} CassetteFreehub */
/** @typedef {'sixbolt'|'CL'} RotorMount */
/** @typedef {'std'|'trunnion'} ShockMount */
/** @typedef {'tapered'|'straight-dc'} SteererFit */
/** @typedef {'BSA73'|'PF92'|'T47'|'PF107'|'BSA83'|'BSA68'|'PF865'} FrameBb */
/** @typedef {'DUB'|'24mm'|'30mm'|'p3'} CrankBb */
/** @typedef {'PM'|'FM'} BrakeMount */
/** @typedef {'sram-eagle'|'sram-transmission'|'shimano-12'|'shimano-linkglide'|'shimano-11'|'shimano-10'|'sram-11'|'sram-dh-7'|'microshift-advent'|'microshift-advent-x'|'box-prime-9'} DriveSystem */
/** @typedef {'cable'|'electronic'} Actuation */
/** @typedef {'t-type'|'standard-12'} RingStd */
/** @typedef {'ispec-ev'|'ispec-ii'|'ispec-b'|'matchmaker'|'band'|'pod'} ShifterClamp */
/** @typedef {'ispec-ev'|'ispec-ii'|'ispec-b'|'matchmaker'} LeverClamp */
/** @typedef {'hanger'|'udh-direct'} DerailMount */
/** @typedef {'air'|'coil'} Spring */
/** @typedef {'alu'|'carbon'|'steel'|'ti'|'carbon-alloy'} Material */
/** @typedef {'ZS44/28.6'|'ZS56/28.6'|'ZS56/40'|'IS41/28.6'|'IS42/28.6'|'IS52/40'|'EC34/28.6'|'EC44/40'|'ZS49/28.6'|'EC49/40'} HeadTube */
/** @typedef {'flat'|'clip'|'hybrid'} PedalStyle */
/** @typedef {'exo'|'exo-plus'|'doubledown'|'dh'|'trail'|'enduro'|'downhill'|'super-race'|'super-ground'|'super-trail'|'super-gravity'|'super-downhill'|'protection'|'hardwall'|'prowall'|'tcs-light-sg2'|'tcs-tough-sg1'|'tcs-tough'|'atc'|'aec'|'agc'|'xc-race'|'gravity-shield'|'grid-trail'|'grid-gravity'|'grid'|'control'|'trc'|'grc'|'xcc'|'enduro-core'|'synthesis'|'gravity-core'|'gxe-core'|'dh-core'|'wire-bead'|'folding-tlr'|'inner-strength'|'core-strength'|'high-output'|'super-tough'|'durable'|'ultra-durable'|'light-and-supple'|'light-trail'|'tough'|'tr'|'emc'|'eps'|'eps-tlr'|'exo-btb'|'flux-gr'|'flux-am'|'flux-gr-radial'|'hardskin'|'sideskin'|'gravity-pro'|'trail-pro'|'ksct'} Casing */
/** @typedef {'dual'|'3c-maxxterra'|'3c-maxxgrip'|'maxxspeed'|'maxxterra'|'3c-maxxspeed'|'endurance'|'soft'|'supersoft'|'blackchili'|'addix'|'addix-speed'|'addix-speedgrip'|'addix-soft'|'addix-ultra-soft'|'smartgrip'|'smartgrip-gravity'|'4c-graphene'|'graphene-silica'|'tritec'|'dual-layer'|'grip3s'|'grip3'|'magix'|'magix-mh'|'magix-ms'|'magix-dh'|'gripton-t7'|'gripton-t9'|'gripton-t5'|'soft-50'|'medium-60'|'single-60a'|'tackee'|'top40'|'mpc'|'dcc'|'tm-speed'|'tm-grip'|'triple-compound'|'zsg-natural'|'grip'|'grip-plus'|'fast'|'62a-51a'|'56a-48a'|'grip-compound'|'dtc'|'mopo'|'momentum'|'race-ripost-enduro'|'race-ripost-gravity'|'race-ripost-xc'|'bi-compound'} Compound */
/** @typedef {'xc'|'trail'|'enduro'|'dh'|'dj'} Discipline */
/** @typedef {'full'|'hardtail'} Suspension */
/** The mechanical drivetrain discriminator (2026-07-13 DJ pass): absence =
 * geared. See schema.js's driveMode vocab note. @typedef {'single-speed'} DriveMode */
/** Single-speed width class shared by ring / cog / chain. @typedef {'1/8'|'3/32'} ChainWidth */
/** Single-speed chain-tensioning dropout style; only 'vertical' feeds a
 * verdict (the ss-tension info). @typedef {'horizontal'|'sliding'|'ecc-bb'|'vertical'} DropoutType */
/** @typedef {'manufacturer'|'manufacturer-doc'|'measured'|'retailer'} SourceType */
/** @typedef {'current'|'discontinued'|'recalled'} PartStatus */
/** @typedef {'battery'|'charger'|'spring'|'rotor'|'mounting-hardware'} SoldWithout */

/** Per-size frame data (sizes are a sub-object, not variant rows — schema.js).
 * @typedef {Object.<string, {seatTubeLen?: number, maxInsert?: number}>} FrameSizes */

/**
 * Fields every part shares. `weight` and the provenance fields are optional
 * (absence of provenance means "unverified" — see schema.js). The flat-SKU
 * identity kit (family/gen/modelYear/mfgPn) is optional in schema and
 * template-mandatory for new rows (tools/DATA-ENTRY-TEMPLATE.md).
 * @typedef {Object} CommonFields
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {number} [weight]
 * @property {string} [desc]
 * @property {boolean} [verified]
 * @property {string} [lastChecked]
 * @property {string} [source]
 * @property {string} [family]     generation-agnostic platform slug ('rockshox-zeb')
 * @property {string} [gen]        maker's generation code ('B1', 'V3.2') — free string
 * @property {number} [modelYear]
 * @property {string} [mfgPn]      manufacturer part number / model code
 * @property {Discipline[]} [disciplines]  filter/annotation only — NEVER feeds checkBuild; absence = universal
 * @property {SourceType} [sourceType]     absent = manufacturer; 'measured' is weight-only (see schema.js)
 * @property {string} [weightSource]       URL of the measured-weight source (required when sourceType:'measured')
 * @property {string} [archiveUrl]         snapshot of the source page (source rot is real)
 * @property {PartStatus} [status]         absent = current
 * @property {string} [supersededBy]       id of the newer generation (id-validated)
 * @property {SoldWithout[]} [soldWithout] what the quoted weight/price excludes
 * @property {string} [image]              product photo URL — Phase 2, display-only, NEVER feeds checkBuild
 * @property {string[]} [colors]           hex codes ('#1f6f4a') — display-only, NEVER feeds checkBuild
 * @property {RetailerLink[]} [retailerLinks] display-only, NEVER feeds checkBuild
 */

/** @typedef {Object} RetailerLink
 * @property {string} label
 * @property {string} url
 */

/* Frame is itself a discriminated union on `suspension` (mirrors the schema.js
   cross-rule): a full-sus frame REQUIRES the shock block; a hardtail cannot
   carry any of it, so tsc rejects reading frame.shockEye without narrowing. */
/** @typedef {Object} FrameShared
 * @property {WheelConfig[]} wheelConfigs
 * @property {RearAxle} rearAxle
 * @property {SteererFit} headset
 * @property {FrameBb} bb
 * @property {number} seatTube
 * @property {BrakeMount} brakeMount
 * @property {number} maxRotorR
 * @property {number} [minRotorR]  frame native post-mount rotor floor (rule 10b errors below; dormant until maker-sourced)
 * @property {number} maxForkTravel
 * @property {number} [minForkTravel]  maker-published approved-fork floor (dormant until sourced)
 * @property {boolean} [forkTravelHard]  true = the cited source states the fork range as a HARD compatibility limit -> rule 12/12b error outside it; absent = recommendation language -> warning (C4)
 * @property {number} [designForkTravel]  maker-STATED design fork travel (rule 12c warns >20mm below; dormant until sourced)
 * @property {boolean} [coilApproved]  false = maker states NOT coil-compatible (absence = unknown)
 * @property {DriveMode} [driveMode]  absence = geared; 'single-speed' drops the geared-drivetrain + brake slots from slotRequired (2026-07-13 DJ pass)
 * @property {DropoutType} [dropoutType]  single-speed chain-tensioning style; 'vertical' + single-speed => ss-tension info (dormant until sourced)
 * @property {'dropper'|'rigid'} [defaultSeatpost]  unify-seatpost override for the Seatpost rail's default sub-chip; absent = discipline heuristic (defaultSeatpostCat). UI/tie-break ONLY — never feeds checkBuild or completeness
 * @property {boolean} [noStockDropper]  true = this SPECIFIC frame's maker-published stock/OE spec ships without a dropper post (rigid post only), sourced per-row (e.g. XC race hardtails). Feeds slotRequired completeness ONLY, alongside the blanket dh-discipline exemption; absence = dropper assumed standard equipment
 * @property {boolean} udh
 * @property {string} [udhRetrofitKit]  maker-documented UDH retrofit kit name (rule 4 warns with a structured fix instead of erroring; dormant until sourced)
 * @property {boolean} frameOnly
 * @property {number} [maxTire]
 * @property {Material} [material]  filter/annotation ONLY (disciplines contract) — never feeds checkBuild; absence = unknown
 * @property {FrameSizes} [sizes]
 * @property {HeadTube} [headTubeUpper]   SHIS capture field — rule 11 still consumes `headset`
 * @property {HeadTube} [headTubeLower]
 */
/** @typedef {CommonFields & FrameShared & {cat: 'frame', suspension: 'full', shockEye: number, shockStroke: number, shockMount: ShockMount, travel: number, bundledShock?: (string|null)}} FullSusFramePart */
/** @typedef {CommonFields & FrameShared & {cat: 'frame', suspension: 'hardtail'}} HardtailFramePart */
/** @typedef {FullSusFramePart|HardtailFramePart} FramePart */
/** @typedef {CommonFields & {cat: 'fork', wheel: WheelSize, travel: number, axle: FrontAxle, steerer: SteererFit, brakeMount: BrakeMount, maxRotorF: number, minRotorF?: number, maxTire?: number}} ForkPart */
/** @typedef {CommonFields & {cat: 'shock', eye: number, stroke: number, mount: ShockMount, spring: Spring, oemOnly?: boolean, forFrames?: string[]}} ShockPart */
/** @typedef {CommonFields & {cat: 'frontwheel', wheel: WheelSize, hub: FrontAxle, rotorMount: RotorMount, intWidth: number, maxTire: number, minTire?: number}} FrontWheelPart */
/** @typedef {CommonFields & {cat: 'rearwheel', wheel: WheelSize, hub: RearAxle, freehub: Freehub, rotorMount: RotorMount, intWidth: number, maxTire: number, minTire?: number}} RearWheelPart */
/** @typedef {CommonFields & {cat: 'fronthub', hub: FrontAxle, rotorMount: RotorMount}} FrontHubPart */
/** @typedef {CommonFields & {cat: 'rearhub', hub: RearAxle, freehub: Freehub, rotorMount: RotorMount}} RearHubPart */
/** @typedef {CommonFields & {cat: 'rim', wheel: WheelSize, intWidth: number, maxTire: number, minTire?: number}} RimPart */
/** @typedef {CommonFields & {cat: 'tire', wheel: WheelSize, width: number, casing?: Casing, compound?: Compound}} TirePart */
/** @typedef {CommonFields & {cat: 'shifter', system: DriveSystem, speeds: number, actuation: Actuation, clampType?: ShifterClamp}} ShifterPart */
/** @typedef {CommonFields & {cat: 'derailleur', system: DriveSystem, speeds: number, actuation: Actuation, maxCog: number, mount: DerailMount}} DerailleurPart */
/** @typedef {CommonFields & {cat: 'cassette', system: DriveSystem, speeds: number, freehub: CassetteFreehub, minCog: number, maxCog: number}} CassettePart */
/** @typedef {CommonFields & {cat: 'chain', system?: DriveSystem, speeds?: number, chainWidth?: ChainWidth, halfLink?: boolean}} ChainPart  geared (system+speeds) OR single-speed (chainWidth) - schema cross-rule enforces one identity */
/** @typedef {CommonFields & {cat: 'crankset', bb: CrankBb, ring?: number, ringStd?: (RingStd|null), speeds?: number, chainline?: number, chainWidth?: ChainWidth}} CranksetPart  geared cranks must carry speeds+ringStd (schema cross-rule); single-speed cranks carry chainWidth */
/** @typedef {CommonFields & {cat: 'cog', teeth: number, chainWidth: ChainWidth}} CogPart  single-speed rear cog (no live slot yet - joins GROUPS when DJ goes live) */
/** @typedef {CommonFields & {cat: 'seatpost', diameter: number}} SeatpostPart  rigid post (DJ; no live slot yet) */
/** @typedef {CommonFields & {cat: 'bb', shell: FrameBb, spindle: CrankBb}} BbPart  the bottom bracket itself: shell = frame standard, spindle = crank bore (rule 7 exact checks) */
/** @typedef {CommonFields & {cat: 'headset', upper: HeadTube, lower: HeadTube, steerer: SteererFit}} HeadsetPart  complete headset: upper/lower assembly S.H.I.S. codes + the steerer it accepts (rule 20a exact vs fork.steerer; rule 20b compares bore tokens vs frame.headTubeUpper/Lower) */
/** @typedef {CommonFields & {cat: 'brake', mount: BrakeMount, pistons: number, maxRotor?: number, leverAccepts?: LeverClamp[]}} BrakePart  maxRotor = the CALIPER's own maker-stated rotor ceiling (rule 8b errors above; real on flat-mount calipers, dormant/absent on post-mount) */
/** @typedef {CommonFields & {cat: 'rotor', size: number, mount: RotorMount}} RotorPart */
/** @typedef {CommonFields & {cat: 'handlebar', clamp: number, width?: number, rise?: number, material?: Material}} HandlebarPart */
/** @typedef {CommonFields & {cat: 'stem', clamp: number, length?: number}} StemPart */
/** @typedef {CommonFields & {cat: 'grips'}} GripsPart */
/** @typedef {CommonFields & {cat: 'dropper', diameter: number, drop: number}} DropperPart */
/** @typedef {CommonFields & {cat: 'saddle'}} SaddlePart */
/** @typedef {CommonFields & {cat: 'pedal', style: PedalStyle}} PedalPart */
/** @typedef {CommonFields & {cat: 'groupset', fills: Object.<string, string>, assembled?: boolean}} GroupsetPart */
/** @typedef {CommonFields & {cat: 'wheelset', fills: Object.<string, string>}} WheelsetPart */
/** @typedef {CommonFields & {cat: 'brakeset', fills: Object.<string, string>}} BrakesetPart */
/** @typedef {CommonFields & {cat: 'cockpitset', fills: Object.<string, string>}} CockpitsetPart */
/** A whole-build preset (Complete Bikes, 2026-07-15): fills spans every build
 * slot the bike ships from the factory. Deliberately NOT attached to a GROUPS
 * entry (see compat.js GROUPS comment) - price is always the list MSRP;
 * streetPrice is an optional lower current/sale figure shown as the headline
 * when present (COMPLETE-BIKES-SCOPE.md decision #3).
 * @typedef {CommonFields & {cat: 'completebike', fills: Object.<string, string>, streetPrice?: number}} CompleteBikePart */

/** A drivetrain component (the four parts that share `system` + `speeds`).
 * @typedef {ShifterPart|DerailleurPart|CassettePart|ChainPart} DrivetrainPart */

/* ---- Rider Kit (Kit Builder, 2026-07-14) — mirrors schema.js's kit SCHEMA/VOCAB.
   Kit parts live in src/kit.js's KIT_PARTS (a separate catalog), never in
   compat.js's PARTS, and kit NEVER feeds checkBuild (decisions #3 + #4). --------- */
/** @typedef {'half-shell'|'full-face'|'convertible'} HelmetType */
/** @typedef {'flat'|'clipless'} SoleType */
/** @typedef {'lace'|'boa'|'velcro'|'ratchet'} ShoeClosure */
/** @typedef {'glasses'|'goggles'} EyewearType */
/** @typedef {'short'|'long'} Sleeve */
/** @typedef {'back'|'chest'|'chest-back'} ArmorCoverage */
/** Real published safety standards — fetched-source-only (a cross-rule restricts which
 * a category may carry). @typedef {'cpsc'|'en1078'|'astm-f1952'|'ansi-z87'|'en166'|'en1621-1-l1'|'en1621-1-l2'|'en1621-2-l1'|'en1621-2-l2'|'en1621-3'} ProtectionCert */
/** Helmet rotational-impact system — a different axis from ProtectionCert; absence =
 * UNKNOWN, never "none". [EXPERT REVIEW] pending. @typedef {'mips'|'wavecel'|'spin'|'360-turbine'|'koroyd'|'rheon'} Rotational */
/** @typedef {'mens'|'womens'|'unisex'} FitCut */
/** Offered size LABELS (free strings — never a vocab; brands use XS–XXXL, numeric EU,
 * split "S/M"). One row per product, never a row per size. @typedef {string[]} SizeList */
/** The brand's own size label -> body-measurement map. Inner measure keys are
 * category-constrained by schema.js (helmet->head, jersey->chest, …). Dormant-until-sourced.
 * @typedef {Object.<string, Object.<string, ([number,number]|number)>>} SizeChart */

/** Fields shared by every kit category: the common part kit + the optional
 * fitCut / sizes / sizeChart trio. @typedef {CommonFields & {fitCut?: FitCut, sizes?: SizeList, sizeChart?: SizeChart}} KitCommon */
/** @typedef {KitCommon & {cat: 'helmet', type: HelmetType, certs?: ProtectionCert[], rotational?: Rotational}} HelmetPart */
/** @typedef {KitCommon & {cat: 'shoes', soleType: SoleType, closure?: ShoeClosure}} ShoesPart  soleType is the primary differentiator; NO pedal bridge (decision #3) */
/** @typedef {KitCommon & {cat: 'jersey', sleeve?: Sleeve}} JerseyPart */
/** @typedef {KitCommon & {cat: 'shorts', liner?: boolean}} ShortsPart  shorts + pants are SEPARATE categories (decision #1) */
/** @typedef {KitCommon & {cat: 'pants', liner?: boolean}} PantsPart */
/** @typedef {KitCommon & {cat: 'gloves'}} GlovesPart */
/** @typedef {KitCommon & {cat: 'kneepad', certs?: ProtectionCert[]}} KneepadPart  per pair */
/** @typedef {KitCommon & {cat: 'elbowpad', certs?: ProtectionCert[]}} ElbowpadPart  per pair */
/** @typedef {KitCommon & {cat: 'bodyarmor', coverage?: ArmorCoverage, certs?: ProtectionCert[]}} BodyarmorPart */
/** @typedef {KitCommon & {cat: 'neckbrace', certs?: ProtectionCert[]}} NeckbracePart  certs dormant (no universal standard yet) */
/** @typedef {KitCommon & {cat: 'shinguard', certs?: ProtectionCert[]}} ShinguardPart  per pair */
/** @typedef {KitCommon & {cat: 'eyewear', type: EyewearType, certs?: ProtectionCert[]}} EyewearPart  glasses | goggles */

/** Any Rider Kit part. Kept a SEPARATE union from the bike `Part` on purpose: folding
 * 12 more object variants into `Part` would enlarge the union that compat.js's
 * ~3000-row PARTS literal is checked against, which already sits at tsc's "union too
 * complex to represent" ceiling (the reason PARTS carries a @ts-ignore). Kit parts live
 * in src/kit.js's KIT_PARTS and never need to be a bike `Part`.
 * @typedef {HelmetPart|ShoesPart|JerseyPart|ShortsPart|PantsPart|GlovesPart|KneepadPart|ElbowpadPart|BodyarmorPart|NeckbracePart|ShinguardPart|EyewearPart} KitPart */

/** A preset (the kinds that carry `fills`). CompleteBikePart is the whole-build
 * kind - group-less, unlike the other four (see compat.js GROUPS comment).
 * @typedef {GroupsetPart|WheelsetPart|BrakesetPart|CockpitsetPart|CompleteBikePart} PresetPart */

/** Any catalog part.
 * @typedef {FramePart|ForkPart|ShockPart|FrontWheelPart|RearWheelPart|FrontHubPart|RearHubPart|RimPart|TirePart|ShifterPart|DerailleurPart|CassettePart|ChainPart|CranksetPart|CogPart|SeatpostPart|BbPart|HeadsetPart|BrakePart|RotorPart|HandlebarPart|StemPart|GripsPart|DropperPart|SaddlePart|PedalPart|PresetPart} Part */

/**
 * A build: slotKey -> resolved Part. Each named slot is typed to its exact
 * category variant (so the engine reads e.g. `build.frame.wheelConfigs` with no
 * casts), while the string index signature lets the helpers read/write slots by
 * a dynamic key. frontHub/frontRim/rearHub/rearRim are the build-your-own-wheel
 * alternate path to frontWheel/rearWheel (see GROUPS' `altOf` in compat.js) -
 * both are optional and mutually exclusive per side, enforced by the UI.
 * @typedef {{[slot: string]: (Part|undefined)} & {frame?: FramePart, fork?: ForkPart, shock?: ShockPart, frontWheel?: FrontWheelPart, rearWheel?: RearWheelPart, frontHub?: FrontHubPart, frontRim?: RimPart, rearHub?: RearHubPart, rearRim?: RimPart, frontTire?: TirePart, rearTire?: TirePart, shifter?: ShifterPart, derailleur?: DerailleurPart, cassette?: CassettePart, chain?: ChainPart, crankset?: CranksetPart, cog?: CogPart, seatpost?: SeatpostPart, bb?: BbPart, headset?: HeadsetPart, frontBrake?: BrakePart, rearBrake?: BrakePart, frontRotor?: RotorPart, rearRotor?: RotorPart, handlebar?: HandlebarPart, stem?: StemPart, grips?: GripsPart, dropper?: DropperPart, saddle?: SaddlePart, pedals?: PedalPart}} Build */

/** @typedef {Object.<string, string>} PresetBy  groupKey -> preset id */

/** A sample-build theme (the toolbar buttons — see generateSampleBuild in
 * compat.js). `band` biases every slot toward a price percentile (null =
 * uniform random); `frame` narrows the frame pool; `mullet` forces a 29-front /
 * 27.5-rear wheelset.
 * @typedef {Object} SampleTheme
 * @property {string} key      matches the toolbar button ('budget','dh',...)
 * @property {string} label
 * @property {{p: number, w: number}|null} band  price-percentile centre + jitter window, or null
 * @property {boolean} [mullet]
 * @property {function(FramePart): boolean} frame  frame-pool predicate
 */

/** The result of generateSampleBuild: a fresh random build (slotKey -> part id,
 * ready for the UI's bulk-load path) that is complete and error-free, or a
 * failure the UI answers with its fixed fallback build for the theme.
 * @typedef {{ok: true, theme: SampleTheme, build: Object.<string, string>, presetBy: Object.<string, string>, frameId: string, warnings: number} | {ok: false, theme: (SampleTheme|null)}} SampleBuildResult */

/**
 * @typedef {Object} Slot
 * @property {string} key
 * @property {string} label
 * @property {Category} cat
 * @property {string} [group]
 * @property {boolean} [optional]
 * @property {string} [altOf] marks this slot as an alternate path to filling
 *   the named slot key instead of being independently required (e.g.
 *   frontHub/frontRim are an altOf:'frontWheel' pair) - see slotRequired()
 *   and wheelPositionFilled() in compat.js.
 * @property {string[]} [excludes] peer slot keys this slot is MUTUALLY
 *   EXCLUSIVE with (the unified Seatpost group's dropper<->seatpost pair):
 *   picking this slot clears its peers in setSlot, and sanitizeShare drops the
 *   non-default peer if a legacy build carries both — one physical position.
 */

/** The wheel-shaped view checkBuild's rules read, whether it came from a
 * complete FrontWheelPart/RearWheelPart or was synthesized from a hub+rim
 * pair by effectiveWheel() (compat.js). freehub is only ever set on the rear.
 * @typedef {{wheel: WheelSize, hub: (FrontAxle|RearAxle), rotorMount: RotorMount, freehub?: Freehub, intWidth: number, maxTire: number, minTire?: number}} EffectiveWheel */

/**
 * @typedef {Object} Group
 * @property {string} key
 * @property {string} label
 * @property {string} icon
 * @property {Slot[]} slots
 * @property {{cat: Category, label: string}} [preset]
 * @property {string} [parent] rail-display-only: browse as a sub-chip of the named group instead of its own top-level rail chip (pricing/completeness are unaffected — see compat.js's cog group)
 */

/**
 * One structured engine finding. `msg` is the display string (also returned by
 * toString, so string interpolation keeps working); `ruleId`+`slots` give the
 * conflict a real identity for diffing (see verdictKey in compat.js). `fix` is
 * reserved for the "fits with adapter X" tier.
 * @typedef {Object} Verdict
 * @property {string} ruleId
 * @property {string[]} slots
 * @property {string} msg
 * @property {{kind: string, name: string}} [fix]
 */

/**
 * @typedef {Object} CompatResult
 * @property {Verdict[]} errors    won't fit
 * @property {Verdict[]} warnings  works but check
 * @property {Verdict[]} infos     notes
 */

/**
 * @typedef {Object} Totals
 * @property {number} price
 * @property {number} weight
 * @property {boolean} missingWeight
 */

/**
 * @typedef {Object} CompatState
 * @property {'g'|'w'|'r'|'n'} state  green / yellow (fits, but adds a warning) / red / neutral
 * @property {string} reason
 */

/**
 * A catalog handed to the validator. The parts are UNTRUSTED here (validating
 * them is the whole point), so they are typed loosely as `any[]`.
 * @typedef {Object} Catalog
 * @property {any[]} PARTS
 * @property {Slot[]} SLOTS
 */

module.exports = {};
