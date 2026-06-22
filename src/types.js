'use strict';
/* =============================================================================
   TrailBuilder — shared JSDoc type definitions (TYPE-CHECKING ONLY, no runtime
   code; this module exports nothing useful and is never require()d at runtime).
   -----------------------------------------------------------------------------
   These types MIRROR schema.js, which is the runtime source of truth for "valid
   data". When you add or change a field in schema.js's SCHEMA/VOCAB, update the
   matching field here so `npm run typecheck` and the validator stay in agreement.

   `Part` is a single umbrella type: the common fields are always present, and
   every category-specific field is optional (the validator enforces which
   fields each category actually requires). That keeps the engine code — which
   reads e.g. `frame.wheelConfigs` or `shock.eye` — simple to type, while still
   catching misspelled field names (excess-property errors) and wrong value
   types as you write data.
   ========================================================================== */

/** @typedef {'frame'|'fork'|'shock'|'frontwheel'|'rearwheel'|'tire'|'shifter'|'derailleur'|'cassette'|'chain'|'crankset'|'brake'|'rotor'|'handlebar'|'stem'|'grips'|'dropper'|'saddle'|'groupset'|'wheelset'|'brakeset'|'cockpitset'} Category */

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
/** @typedef {'hanger'|'udh-direct'} DerailMount */
/** @typedef {'air'|'coil'} Spring */
/** @typedef {'alu'|'carbon'} Material */

/**
 * A catalog part. `id`..`price` are always present; everything below is
 * category-specific and therefore optional on this umbrella type.
 * @typedef {Object} Part
 * @property {string} id
 * @property {Category} cat
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {number} [weight]
 * @property {string} [desc]
 * @property {boolean} [verified]
 * @property {string} [lastChecked]
 * @property {string} [source]
 *
 * @property {WheelConfig[]} [wheelConfigs]
 * @property {RearAxle} [rearAxle]
 * @property {Tapered} [headset]
 * @property {FrameBb|CrankBb} [bb]
 * @property {number} [seatTube]
 * @property {BrakeMount} [brakeMount]
 * @property {number} [maxRotorR]
 * @property {number} [shockEye]
 * @property {number} [shockStroke]
 * @property {ShockMount} [shockMount]
 * @property {number} [maxForkTravel]
 * @property {number} [travel]
 * @property {boolean} [udh]
 * @property {boolean} [frameOnly]
 * @property {string|null} [bundledShock]
 *
 * @property {WheelSize} [wheel]
 * @property {FrontAxle} [axle]
 * @property {Tapered} [steerer]
 * @property {number} [maxRotorF]
 *
 * @property {number} [eye]
 * @property {number} [stroke]
 * @property {ShockMount|DerailMount|BrakeMount|RotorMount} [mount]
 * @property {Spring} [spring]
 * @property {boolean} [oemOnly]
 * @property {string} [forFrame]
 *
 * @property {FrontAxle|RearAxle} [hub]
 * @property {Freehub} [freehub]
 * @property {RotorMount} [rotorMount]
 * @property {number} [intWidth]
 * @property {number} [maxTire]
 *
 * @property {number} [width]
 *
 * @property {DriveSystem} [system]
 * @property {number} [speeds]
 * @property {number} [maxCog]
 * @property {string} [range]
 * @property {string} [chainline]
 * @property {number} [ring]
 *
 * @property {number} [pistons]
 * @property {number} [size]
 *
 * @property {number} [clamp]
 * @property {number} [rise]
 * @property {Material} [material]
 * @property {number} [length]
 *
 * @property {number} [diameter]
 * @property {number} [drop]
 *
 * @property {Object.<string, string>} [fills]
 */

/**
 * A build: a map of slotKey -> resolved Part. Slots are: frame, fork, shock,
 * frontWheel, rearWheel, frontTire, rearTire, shifter, derailleur, cassette,
 * chain, crankset, frontBrake, rearBrake, frontRotor, rearRotor, handlebar,
 * stem, grips, dropper, saddle.
 * @typedef {Object.<string, Part>} Build
 */

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
 * The minimum a catalog needs to be validated / queried: parts + slot list.
 * @typedef {Object} Catalog
 * @property {Part[]} PARTS
 * @property {Slot[]} SLOTS
 */

module.exports = {};
