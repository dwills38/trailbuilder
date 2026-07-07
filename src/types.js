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

/** @typedef {'frame'|'fork'|'shock'|'frontwheel'|'rearwheel'|'tire'|'shifter'|'derailleur'|'cassette'|'chain'|'crankset'|'brake'|'rotor'|'handlebar'|'stem'|'grips'|'dropper'|'saddle'|'pedal'|'groupset'|'wheelset'|'brakeset'|'cockpitset'} Category */

/* ---- vocabularies (mirror VOCAB in schema.js) ---------------------------- */
/** @typedef {'29'|'275'} WheelSize */
/** @typedef {'29'|'275'|'mullet'} WheelConfig */
/** @typedef {'Boost148'|'SuperBoost157'} RearAxle */
/** @typedef {'Boost110'} FrontAxle */
/** @typedef {'XD'|'MicroSpline'|'HG'} Freehub */
/** @typedef {'sixbolt'|'CL'} RotorMount */
/** @typedef {'std'|'trunnion'} ShockMount */
/** @typedef {'tapered'} Tapered */
/** @typedef {'BSA73'|'PF92'|'T47'} FrameBb */
/** @typedef {'DUB'|'SH24'} CrankBb */
/** @typedef {'PM'} BrakeMount */
/** @typedef {'sram-eagle'|'sram-transmission'|'shimano-12'} DriveSystem */
/** @typedef {'cable'|'electronic'} Actuation */
/** @typedef {'t-type'|'standard-12'} RingStd */
/** @typedef {'ispec-ev'|'matchmaker'|'band'|'pod'} ShifterClamp */
/** @typedef {'ispec-ev'|'matchmaker'} LeverClamp */
/** @typedef {'hanger'|'udh-direct'} DerailMount */
/** @typedef {'air'|'coil'} Spring */
/** @typedef {'alu'|'carbon'} Material */
/** @typedef {'flat'|'clip'} PedalStyle */
/** @typedef {'exo'|'exo-plus'|'doubledown'|'dh'} Casing */
/** @typedef {'dual'|'3c-maxxterra'|'3c-maxxgrip'} Compound */
/** @typedef {'xc'|'trail'|'enduro'|'dh'} Discipline */
/** @typedef {'full'|'hardtail'} Suspension */

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
 */

/* Frame is itself a discriminated union on `suspension` (mirrors the schema.js
   cross-rule): a full-sus frame REQUIRES the shock block; a hardtail cannot
   carry any of it, so tsc rejects reading frame.shockEye without narrowing. */
/** @typedef {Object} FrameShared
 * @property {WheelConfig[]} wheelConfigs
 * @property {RearAxle} rearAxle
 * @property {Tapered} headset
 * @property {FrameBb} bb
 * @property {number} seatTube
 * @property {BrakeMount} brakeMount
 * @property {number} maxRotorR
 * @property {number} maxForkTravel
 * @property {boolean} udh
 * @property {boolean} frameOnly
 * @property {number} [maxTire]
 * @property {FrameSizes} [sizes]
 */
/** @typedef {CommonFields & FrameShared & {cat: 'frame', suspension: 'full', shockEye: number, shockStroke: number, shockMount: ShockMount, travel: number, bundledShock?: (string|null)}} FullSusFramePart */
/** @typedef {CommonFields & FrameShared & {cat: 'frame', suspension: 'hardtail'}} HardtailFramePart */
/** @typedef {FullSusFramePart|HardtailFramePart} FramePart */
/** @typedef {CommonFields & {cat: 'fork', wheel: WheelSize, travel: number, axle: FrontAxle, steerer: Tapered, brakeMount: BrakeMount, maxRotorF: number, minRotorF?: number}} ForkPart */
/** @typedef {CommonFields & {cat: 'shock', eye: number, stroke: number, mount: ShockMount, spring: Spring, oemOnly?: boolean, forFrame?: string}} ShockPart */
/** @typedef {CommonFields & {cat: 'frontwheel', wheel: WheelSize, hub: FrontAxle, rotorMount: RotorMount, intWidth: number, maxTire: number}} FrontWheelPart */
/** @typedef {CommonFields & {cat: 'rearwheel', wheel: WheelSize, hub: RearAxle, freehub: Freehub, rotorMount: RotorMount, intWidth: number, maxTire: number}} RearWheelPart */
/** @typedef {CommonFields & {cat: 'tire', wheel: WheelSize, width: number, casing?: Casing, compound?: Compound}} TirePart */
/** @typedef {CommonFields & {cat: 'shifter', system: DriveSystem, speeds: number, actuation: Actuation, clampType?: ShifterClamp}} ShifterPart */
/** @typedef {CommonFields & {cat: 'derailleur', system: DriveSystem, speeds: number, actuation: Actuation, maxCog: number, mount: DerailMount}} DerailleurPart */
/** @typedef {CommonFields & {cat: 'cassette', system: DriveSystem, speeds: number, freehub: Freehub, range: string, maxCog: number}} CassettePart */
/** @typedef {CommonFields & {cat: 'chain', system: DriveSystem, speeds: number}} ChainPart */
/** @typedef {CommonFields & {cat: 'crankset', bb: CrankBb, ring: number, ringStd: RingStd, speeds: number, chainline?: string}} CranksetPart */
/** @typedef {CommonFields & {cat: 'brake', mount: BrakeMount, pistons: number, leverClamp?: LeverClamp}} BrakePart */
/** @typedef {CommonFields & {cat: 'rotor', size: number, mount: RotorMount}} RotorPart */
/** @typedef {CommonFields & {cat: 'handlebar', clamp: number, width?: number, rise?: number, material?: Material}} HandlebarPart */
/** @typedef {CommonFields & {cat: 'stem', clamp: number, length?: number}} StemPart */
/** @typedef {CommonFields & {cat: 'grips'}} GripsPart */
/** @typedef {CommonFields & {cat: 'dropper', diameter: number, drop: number}} DropperPart */
/** @typedef {CommonFields & {cat: 'saddle'}} SaddlePart */
/** @typedef {CommonFields & {cat: 'pedal', style: PedalStyle}} PedalPart */
/** @typedef {CommonFields & {cat: 'groupset', fills: Object.<string, string>}} GroupsetPart */
/** @typedef {CommonFields & {cat: 'wheelset', fills: Object.<string, string>}} WheelsetPart */
/** @typedef {CommonFields & {cat: 'brakeset', fills: Object.<string, string>}} BrakesetPart */
/** @typedef {CommonFields & {cat: 'cockpitset', fills: Object.<string, string>}} CockpitsetPart */

/** A drivetrain component (the four parts that share `system` + `speeds`).
 * @typedef {ShifterPart|DerailleurPart|CassettePart|ChainPart} DrivetrainPart */

/** A preset (the four kinds that carry `fills`).
 * @typedef {GroupsetPart|WheelsetPart|BrakesetPart|CockpitsetPart} PresetPart */

/** Any catalog part.
 * @typedef {FramePart|ForkPart|ShockPart|FrontWheelPart|RearWheelPart|TirePart|ShifterPart|DerailleurPart|CassettePart|ChainPart|CranksetPart|BrakePart|RotorPart|HandlebarPart|StemPart|GripsPart|DropperPart|SaddlePart|PedalPart|PresetPart} Part */

/**
 * A build: slotKey -> resolved Part. Each named slot is typed to its exact
 * category variant (so the engine reads e.g. `build.frame.wheelConfigs` with no
 * casts), while the string index signature lets the helpers read/write slots by
 * a dynamic key.
 * @typedef {{[slot: string]: (Part|undefined)} & {frame?: FramePart, fork?: ForkPart, shock?: ShockPart, frontWheel?: FrontWheelPart, rearWheel?: RearWheelPart, frontTire?: TirePart, rearTire?: TirePart, shifter?: ShifterPart, derailleur?: DerailleurPart, cassette?: CassettePart, chain?: ChainPart, crankset?: CranksetPart, frontBrake?: BrakePart, rearBrake?: BrakePart, frontRotor?: RotorPart, rearRotor?: RotorPart, handlebar?: HandlebarPart, stem?: StemPart, grips?: GripsPart, dropper?: DropperPart, saddle?: SaddlePart, pedals?: PedalPart}} Build */

/** @typedef {Object.<string, string>} PresetBy  groupKey -> preset id */

/**
 * @typedef {Object} Slot
 * @property {string} key
 * @property {string} label
 * @property {Category} cat
 * @property {string} [group]
 * @property {boolean} [optional]
 */

/**
 * @typedef {Object} Group
 * @property {string} key
 * @property {string} label
 * @property {string} icon
 * @property {Slot[]} slots
 * @property {{cat: Category, label: string}} [preset]
 */

/**
 * @typedef {Object} CompatResult
 * @property {string[]} errors    won't fit
 * @property {string[]} warnings  works but check
 * @property {string[]} infos     notes
 */

/**
 * @typedef {Object} Totals
 * @property {number} price
 * @property {number} weight
 * @property {boolean} missingWeight
 */

/**
 * @typedef {Object} CompatState
 * @property {'g'|'r'|'n'} state  green / red / neutral
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
