// data/emtb.js — e-MTB ("BuildMyEMTB") catalog — the ONLY e-bike surface
//
// Version: 0.1.0  |  Date: 2026-07-18
//
// *** OFF-LIVE. *** Nothing the site serves (index.html, bmx.html, src/compat.js,
// src/compat-bmx.js) loads this file. See data/EMTB-MODEL.md for the data-model spec
// (section 3 = the field set; section 4 = the browse/compare-not-builder recommendation;
// section 5 = containment). Wired only into validate.js (an "EMTB OK" gate line) and this
// module's own tests. Stays off-live until Douglas's explicit flip word.
//
// CONTAINMENT (CLAUDE.md hard rule 1, amended 2026-07-18): e-bikes were authorized
// reluctantly and CONTAINED. The MTB catalog (src/compat.js PARTS) stays 100% e-bike-free
// PERMANENTLY; the motor/battery/e-system fields below exist ONLY in this file. Both
// directions are asserted by test/test-emtb-containment.js.
//
// Plain browser JavaScript, no build step, no imports/exports, no CDN — same convention as
// src/compat.js / data/bmx.js / data/striders.js. Defines top-level `var` globals only.
//
// PROVENANCE: cat:'emtb' complete-bike rows. Every row below is a real, currently-sold
// flagship, seeded to PROVE THE SCHEMA — its specs are best-credible-public values and are
// NOT maker-confirmed, so NO row is `verified:true` (that requires a fetched maker page +
// non-future lastChecked, per catalog policy). E-MTB maker pages are heavily JS-rendered/
// walled, so a later verified grind will lean on the sourceType:'measured' weight path — the
// same posture as the tire and strider catalogs. Nothing here is fabricated; where a spec was
// uncertain a credible round figure was used and the whole set is marked unverified.
// Lengths in mm, battery in Wh, torque in Nm, weight in grams, price in USD (all sample).

// ---------------------------------------------------------------------------
// Parts (complete e-MTBs)
// ---------------------------------------------------------------------------
/** @type {any[]} */
var EMTB_PARTS = [

  {
    id: 'em-specialized-turbo-levo', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo',
    motorBrand: 'specialized', motorModel: 'Specialized 2.2 (Full Power System)', motorTorque: 90,
    batteryWh: 700, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 22700, price: 8500,
    note: 'The category-defining full-power trail e-MTB; mixed-wheel, MasterMind TCU top-tube display.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-trek-rail', cat: 'emtb', brand: 'Trek', model: 'Rail',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 23900, price: 8000,
    note: 'Bosch-powered full-power trail/enduro bike; big 800 Wh PowerTube.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-santa-cruz-bullit', cat: 'emtb', brand: 'Santa Cruz', model: 'Bullit',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code RSC',
    disciplines: ['e-enduro'], weight: 24000, price: 9000,
    note: 'Gravity-leaning mixed-wheel e-enduro bike on Shimano EP801.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-santa-cruz-heckler', cat: 'emtb', brand: 'Santa Cruz', model: 'Heckler',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 23600, price: 8500,
    note: 'All-mountain full-power stablemate to the Bullit; shorter travel, same EP801.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-commencal-meta-power-sx', cat: 'emtb', brand: 'Commencal', model: 'Meta Power SX',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'Formula Cura 4',
    disciplines: ['e-enduro'], weight: 24500, price: 6500,
    note: 'Aluminium value e-enduro bike; long-travel mixed wheel.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-orbea-wild', cat: 'emtb', brand: 'Orbea', model: 'Wild',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 22500, price: 8200,
    note: 'Bosch-powered 29er full-power trail bike; integrated 750 Wh battery.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-canyon-spectral-on', cat: 'emtb', brand: 'Canyon', model: 'Spectral:ON',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 900, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 24800, price: 7000,
    note: 'Direct-to-consumer full-power trail bike; notably large 900 Wh battery.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-cannondale-moterra', cat: 'emtb', brand: 'Cannondale', model: 'Moterra',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24200, price: 7500,
    note: 'Bosch-powered mixed-wheel full-power trail bike.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-transition-relay', cat: 'emtb', brand: 'Transition', model: 'Relay',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 19500, price: 8000,
    note: 'Lightweight ("SL") Fazua-powered bike — rides close to an acoustic trail bike.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — the lightweight-class representative; specs approximate, not maker-confirmed.'
  },
  {
    id: 'em-rocky-mountain-altitude-powerplay', cat: 'emtb', brand: 'Rocky Mountain', model: 'Altitude Powerplay',
    motorBrand: 'rocky-mountain', motorModel: 'Dyname 4.0', motorTorque: 108,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-enduro'], weight: 24600, price: 9500,
    note: 'In-house Dyname 4.0 motor — among the highest torque in the class.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Specialized depth (Turbo Levo / Levo SL / Kenevo SL trims)
  // ---------------------------------------------------------------------------
  {
    id: 'em-specialized-turbo-levo-comp-alloy', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo Comp Alloy',
    motorBrand: 'specialized', motorModel: 'Specialized 2.2 (Full Power System)', motorTorque: 90,
    batteryWh: 700, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 24500, price: 6500,
    note: 'Entry-level alloy-frame Turbo Levo trim; same motor/battery as the carbon range.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-specialized-turbo-levo-pro', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo Pro',
    motorBrand: 'specialized', motorModel: 'Specialized 2.2 (Full Power System)', motorTorque: 90,
    batteryWh: 840, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-trail', 'e-enduro'], weight: 21500, price: 11000,
    note: 'Top-tier carbon Levo trim; largest-capacity 840 Wh battery option in the range.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-specialized-turbo-levo-sl-expert', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo SL Expert',
    motorBrand: 'specialized', motorModel: 'Specialized SL 1.2', motorTorque: 50,
    batteryWh: 320, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code RSC',
    disciplines: ['e-trail'], weight: 18200, price: 9500,
    note: 'Lightweight ("SL") class trail bike; acoustic-close handling, small 320 Wh battery.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-specialized-turbo-kenevo-sl-expert', cat: 'emtb', brand: 'Specialized', model: 'Turbo Kenevo SL Expert',
    motorBrand: 'specialized', motorModel: 'Specialized SL 1.1', motorTorque: 35,
    batteryWh: 320, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code RSC',
    disciplines: ['e-enduro'], weight: 19200, price: 9000,
    note: 'Lightweight gravity/enduro-travel SL platform; longest travel in the Specialized e-range.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Trek depth (Rail / Fuel EXe trims)
  // ---------------------------------------------------------------------------
  {
    id: 'em-trek-rail-9-5', cat: 'emtb', brand: 'Trek', model: 'Rail 9.5',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 25200, price: 6500,
    note: 'Entry alloy Rail trim; same Bosch CX motor/800 Wh PowerTube as the carbon range.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-trek-rail-9-9-xx', cat: 'emtb', brand: 'Trek', model: 'Rail 9.9 XX AXS T-Type',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 23400, price: 12500,
    note: 'Top-tier Rail carbon trim; SRAM XX Transmission + Maven brakes.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-trek-fuel-exe-9-5', cat: 'emtb', brand: 'Trek', model: 'Fuel EXe 9.5',
    motorBrand: 'tq', motorModel: 'TQ-HPR50', motorTorque: 50,
    batteryWh: 360, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 130,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM DB8',
    disciplines: ['e-trail'], weight: 19800, price: 6300,
    note: 'Entry alloy Fuel EXe; quiet, low-profile TQ HPR50 hub-style motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-trek-fuel-exe-9-9-xx', cat: 'emtb', brand: 'Trek', model: 'Fuel EXe 9.9 XX AXS',
    motorBrand: 'tq', motorModel: 'TQ-HPR50', motorTorque: 50,
    batteryWh: 360, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 130,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail'], weight: 18100, price: 11500,
    note: 'Top-tier lightweight Fuel EXe trim; acoustic-close trail-bike handling.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Santa Cruz depth + Ibis
  // ---------------------------------------------------------------------------
  {
    id: 'em-santa-cruz-bullit-xx', cat: 'emtb', brand: 'Santa Cruz', model: 'Bullit XX AXS',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 23200, price: 12000,
    note: 'Top-tier Bullit build; SRAM XX Transmission + Maven brakes.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-santa-cruz-heckler-sl', cat: 'emtb', brand: 'Santa Cruz', model: 'Heckler SL',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 19100, price: 7500,
    note: 'Lightweight SL sibling to the full-power Heckler; Fazua Ride 60 motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-ibis-oso', cat: 'emtb', brand: 'Ibis', model: 'Oso',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 23800, price: 8500,
    note: "Ibis's Bosch-powered full-power e-MTB; mixed-wheel trail/enduro platform.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  }

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMTB_PARTS: EMTB_PARTS };
}
