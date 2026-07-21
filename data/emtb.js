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
    status: 'discontinued', supersededBy: 'em-santa-cruz-bullit-bosch-cx',
    note: 'Gravity-leaning mixed-wheel e-enduro bike on Shimano EP801.',
    desc: 'Unverified sample seed (EMTB-MODEL.md sec 2) — flagship to exercise the schema; specs approximate, not maker-confirmed. Superseded: Santa Cruz dropped Shimano on the Bullit entirely for the 2026 model year (verify/emtb-2 wave 2 phase 2).'
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
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85,
    batteryWh: 625, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 165,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX 12-speed', brakes: 'Shimano SLX 4-piston',
    disciplines: ['e-enduro'], weight: 25000, price: 6500,
    note: 'Meta Power SX V4 Bosch Essential; aluminium value e-enduro bike, long-travel mixed wheel.',
    desc: 'Verified vs the maker page for the Bosch Essential build; MSRP $6,500 matches (site listed at a temporary discount).',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.commencal.com/us/en/BT3MSXPWE4L.html'
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
    status: 'discontinued', supersededBy: 'em-santa-cruz-bullit-bosch-x0-axs-rsv',
    note: 'Top-tier Bullit build; SRAM XX Transmission + Maven brakes.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: Santa Cruz dropped Shimano on the Bullit entirely for the 2026 model year (verify/emtb-2 wave 2 phase 2).'
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
  },

  // ---------------------------------------------------------------------------
  // Commencal depth (Meta Power 29 + Meta Power SX Signature)
  // ---------------------------------------------------------------------------
  {
    id: 'em-commencal-meta-power-29', cat: 'emtb', brand: 'Commencal', model: 'Meta Power 29',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'Formula Cura 4',
    disciplines: ['e-trail'], weight: 23000, price: 5500,
    note: 'More XC/trail-leaning 29er sibling to the Meta Power SX; shorter travel, smaller battery.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-commencal-meta-power-sx-signature', cat: 'emtb', brand: 'Commencal', model: 'Meta Power SX Signature',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85,
    batteryWh: 625, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 165,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore XT 12-speed', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-enduro'], weight: 24200, price: 8000,
    note: 'Meta Power SX V4 Bosch Signature; top-tier build over the base SX Essential.',
    desc: 'Verified vs the maker page for the Bosch Signature build; MSRP $8,000 and 24.2kg weight both match exactly.',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.commencal.com/us/en/commencal-meta-power-sx-bosch-signature-pure-white/22METAPWSG2.html'
  },

  // ---------------------------------------------------------------------------
  // Orbea depth (Wild + Rise lightweight line)
  // ---------------------------------------------------------------------------
  {
    id: 'em-orbea-wild-m-team', cat: 'emtb', brand: 'Orbea', model: 'Wild M-Team',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-trail', 'e-enduro'], weight: 21800, price: 12500,
    note: 'Top-tier Wild build; SRAM XX SL Transmission.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-orbea-rise-m-team', cat: 'emtb', brand: 'Orbea', model: 'Rise M-Team',
    motorBrand: 'shimano', motorModel: 'Shimano EP8 RS', motorTorque: 60,
    batteryWh: 360, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-trail'], weight: 17800, price: 11500,
    note: 'Lightweight-class Orbea; custom-tuned Shimano EP8 RS motor, top-tier build.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-orbea-rise-h30', cat: 'emtb', brand: 'Orbea', model: 'Rise H30',
    motorBrand: 'shimano', motorModel: 'Shimano EP8 RS', motorTorque: 60,
    batteryWh: 360, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-trail'], weight: 19500, price: 5800,
    note: 'Entry alloy Rise trim; same lightweight EP8 RS motor as the carbon range.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Canyon depth (Spectral:ON CFR, Strive:ON, Neuron:ON)
  // ---------------------------------------------------------------------------
  {
    id: 'em-canyon-spectral-on-cfr', cat: 'emtb', brand: 'Canyon', model: 'Spectral:ON CFR',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 900, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 22900, price: 11500,
    note: 'Top-tier CFR carbon Spectral:ON build.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-canyon-strive-on', cat: 'emtb', brand: 'Canyon', model: 'Strive:ON',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-enduro'], weight: 24500, price: 7500,
    note: "Canyon's gravity-leaning e-enduro platform; longer travel than the Spectral:ON.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-canyon-neuron-on', cat: 'emtb', brand: 'Canyon', model: 'Neuron:ON',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 130,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 22200, price: 5500,
    note: "Canyon's lighter, shorter-travel XC/trail e-bike; smaller 630 Wh battery.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Giant (new maker) — Trance X E+ / Reign E+
  // ---------------------------------------------------------------------------
  {
    id: 'em-giant-trance-x-e-plus-elite', cat: 'emtb', brand: 'Giant', model: 'Trance X E+ Elite',
    motorBrand: 'giant', motorModel: 'SyncDrive Pro2', motorTorque: 85,
    batteryWh: 850, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-trail'], weight: 23800, price: 5800,
    note: "Giant's in-house SyncDrive Pro2 motor (co-engineered with Yamaha); large 850 Wh EnergyPak.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-giant-trance-x-advanced-e-plus-0', cat: 'emtb', brand: 'Giant', model: 'Trance X Advanced E+ 0',
    motorBrand: 'giant', motorModel: 'SyncDrive Pro2', motorTorque: 85,
    batteryWh: 850, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-trail'], weight: 21200, price: 12000,
    note: 'Top-tier carbon Trance X Advanced E+ build.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-giant-reign-e-plus-0', cat: 'emtb', brand: 'Giant', model: 'Reign E+ 0',
    motorBrand: 'giant', motorModel: 'SyncDrive Pro2', motorTorque: 85,
    batteryWh: 850, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-enduro'], weight: 23600, price: 10500,
    note: "Giant's gravity/enduro e-MTB; longer travel than the Trance X E+.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Cannondale depth (Moterra 1 + Moterra SL lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-cannondale-moterra-1', cat: 'emtb', brand: 'Cannondale', model: 'Moterra 1',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-trail', 'e-enduro'], weight: 22800, price: 11000,
    note: 'Top-tier Moterra build; SRAM XX SL Transmission.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-cannondale-moterra-sl-1', cat: 'emtb', brand: 'Cannondale', model: 'Moterra SL 1',
    motorBrand: 'bosch', motorModel: 'Performance Line SX', motorTorque: 55,
    batteryWh: 320, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-trail'], weight: 18400, price: 10500,
    status: 'discontinued', supersededBy: 'em-cannondale-moterra-sl-1-shimano-ep801',
    note: 'Lightweight-class Cannondale on the Bosch Performance Line SX motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the real "Moterra SL 1" trim runs Shimano EP801 (85Nm/600W), not a Bosch SX lightweight motor — wrong motor brand AND wrong assist class (verify/emtb-3).'
  },

  // ---------------------------------------------------------------------------
  // Rocky Mountain depth (Instinct Powerplay + Altitude Powerplay Carbon 90)
  // ---------------------------------------------------------------------------
  {
    id: 'em-rocky-mountain-instinct-powerplay', cat: 'emtb', brand: 'Rocky Mountain', model: 'Instinct Powerplay',
    motorBrand: 'rocky-mountain', motorModel: 'Dyname 4.0', motorTorque: 108,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 23400, price: 6800,
    note: 'Shorter-travel trail sibling to the Altitude Powerplay; same in-house Dyname 4.0 motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-rocky-mountain-altitude-powerplay-c90', cat: 'emtb', brand: 'Rocky Mountain', model: 'Altitude Powerplay Carbon 90',
    motorBrand: 'rocky-mountain', motorModel: 'Dyname 4.0', motorTorque: 108,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-enduro'], weight: 23800, price: 11500,
    note: 'Top-tier Altitude Powerplay carbon build.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Transition depth (Relay Alloy XT + Relay Carbon X0 AXS)
  // ---------------------------------------------------------------------------
  {
    id: 'em-transition-relay-alloy-xt', cat: 'emtb', brand: 'Transition', model: 'Relay Alloy XT',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 20200, price: 6000,
    note: 'Entry alloy Relay trim; same Fazua Ride 60 motor as the carbon range.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-transition-relay-carbon-x0-axs', cat: 'emtb', brand: 'Transition', model: 'Relay Carbon X0 AXS',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 19100, price: 9500,
    note: 'Higher-tier carbon Relay trim; SRAM X0 Transmission upgrade.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Mondraker (new maker) — Crafty (full-power) + Level (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-mondraker-crafty-carbon-r', cat: 'emtb', brand: 'Mondraker', model: 'Crafty Carbon R',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-enduro'], weight: 24000, price: 8500,
    note: "Mondraker's gravity-leaning full-power e-MTB; long travel, mixed wheel.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-mondraker-level-carbon-rr', cat: 'emtb', brand: 'Mondraker', model: 'Level Carbon RR SL',
    motorBrand: 'bosch', motorModel: 'Performance Line SX', motorTorque: 55,
    batteryWh: 400, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 130,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX SL Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-trail'], weight: 18600, price: 9800,
    note: 'Lightweight-class Mondraker on the Bosch Performance Line SX motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Haibike (new maker) — AllMtn (Yamaha) + Nduro (Bosch)
  // ---------------------------------------------------------------------------
  {
    id: 'em-haibike-allmtn-9', cat: 'emtb', brand: 'Haibike', model: 'AllMtn 9',
    motorBrand: 'yamaha', motorModel: 'Yamaha PW-X3', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 23600, price: 8000,
    note: "Haibike's flagship full-power trail/enduro bike on the Yamaha PW-X3 motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-haibike-nduro-8', cat: 'emtb', brand: 'Haibike', model: 'Nduro 8',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-enduro'], weight: 25200, price: 6200,
    note: 'Gravity-leaning Bosch-powered Haibike; alloy frame, long travel.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Cube (new maker) — Stereo Hybrid 160 + Stereo Hybrid ONE55 SL (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-cube-stereo-hybrid-160', cat: 'emtb', brand: 'Cube', model: 'Stereo Hybrid 160',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24000, price: 5800,
    note: "Cube's full-power all-mountain e-MTB on the Bosch CX motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-cube-stereo-hybrid-one55-sl', cat: 'emtb', brand: 'Cube', model: 'Stereo Hybrid ONE55 SL',
    motorBrand: 'bosch', motorModel: 'Performance Line SX', motorTorque: 55,
    batteryWh: 400, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 145,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 18900, price: 8200,
    note: 'Lightweight-class Cube on the Bosch Performance Line SX motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // YT (new maker) — Decoy Core 3 + Decoy Uncaged 8
  // ---------------------------------------------------------------------------
  {
    id: 'em-yt-decoy-core-3', cat: 'emtb', brand: 'YT', model: 'Decoy Core 3',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 23800, price: 5500,
    note: "Direct-to-consumer YT Decoy; entry alloy trim.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-yt-decoy-uncaged-8', cat: 'emtb', brand: 'YT', model: 'Decoy Uncaged 8',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 22600, price: 8500,
    note: 'Top-tier carbon Decoy build.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Propain (new maker) — Ekano (direct-to-consumer German brand)
  // ---------------------------------------------------------------------------
  {
    id: 'em-propain-ekano-mix-line', cat: 'emtb', brand: 'Propain', model: 'Ekano Mix Line',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 23600, price: 5200,
    status: 'discontinued', supersededBy: 'em-propain-ekano-3-al-enduro',
    note: 'Direct-to-consumer German full-power e-MTB; custom build-config program.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: Propain consolidated the Ekano line onto the DJI Avinox M2/M2S motor — Shimano is no longer offered (verify/emtb-3).'
  },
  {
    id: 'em-propain-ekano-highend-line', cat: 'emtb', brand: 'Propain', model: 'Ekano Highend Line',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 22200, price: 8200,
    status: 'discontinued', supersededBy: 'em-propain-ekano-3-al-enduro-factory',
    note: 'Top-tier carbon Ekano build.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: current Ekano lineup is alloy-only (Propain has not launched a carbon Ekano) on the DJI Avinox M2S motor — both frame material AND motor brand were wrong (verify/emtb-3).'
  },

  // ---------------------------------------------------------------------------
  // Pivot (new maker) — Shuttle AM / LT (full-power) + Shuttle SL (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-pivot-shuttle-am', cat: 'emtb', brand: 'Pivot', model: 'Shuttle AM',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 22800, price: 9000,
    status: 'discontinued', supersededBy: 'em-pivot-shuttle-am-bosch-cx',
    note: "Pivot's full-power all-mountain e-MTB on the Shimano EP8 motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the next-gen Shuttle AM dropped Shimano entirely for Bosch Gen 5 Performance Line CX/CX-R (verify/emtb-3).'
  },
  {
    id: 'em-pivot-shuttle-lt', cat: 'emtb', brand: 'Pivot', model: 'Shuttle LT',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 165,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-enduro'], weight: 23600, price: 10500,
    note: 'Longer-travel gravity sibling to the Shuttle AM; mixed wheel.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-pivot-shuttle-sl', cat: 'emtb', brand: 'Pivot', model: 'Shuttle SL',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 130,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Level Ultimate',
    disciplines: ['e-trail'], weight: 17600, price: 9500,
    note: 'Lightweight-class Pivot; acoustic-close XC/trail handling on the Fazua Ride 60.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Norco (new maker) — Sight VLT A1 (alloy) + C1 (carbon top)
  // ---------------------------------------------------------------------------
  {
    id: 'em-norco-sight-vlt-a1', cat: 'emtb', brand: 'Norco', model: 'Sight VLT A1',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24200, price: 5800,
    status: 'discontinued', supersededBy: 'em-norco-sight-vlt-cx-c2',
    note: 'Entry alloy Sight VLT trim.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: current Sight VLT CX is carbon-only on Bosch Performance Line CX — Shimano EP8 was the discontinued prior generation, and there is no current alloy "A1" tier (verify/emtb-3).'
  },
  {
    id: 'em-norco-sight-vlt-c1', cat: 'emtb', brand: 'Norco', model: 'Sight VLT C1',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 22600, price: 9500,
    status: 'discontinued', supersededBy: 'em-norco-sight-vlt-cx-c1',
    note: 'Top-tier carbon Sight VLT build.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: current Sight VLT CX top-tier runs Bosch Performance Line CX, not Shimano EP8 (verify/emtb-3).'
  },

  // ---------------------------------------------------------------------------
  // Scott (new maker) — Patron eRIDE (gravity), Genius eRide (trail), Lumen eRIDE (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-scott-patron-eride-900-tuned', cat: 'emtb', brand: 'Scott', model: 'Patron eRIDE 900 Tuned',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-enduro'], weight: 23800, price: 10500,
    note: "Scott's gravity/enduro e-MTB; Bosch CX motor, long travel, mixed wheel.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-scott-genius-eride-910', cat: 'emtb', brand: 'Scott', model: 'Genius eRide 910',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 22600, price: 6200,
    status: 'discontinued', supersededBy: 'em-scott-genius-eride-910-bosch-cx-gen4',
    note: "Scott's full-power trail e-MTB on the Shimano EP8 motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the Genius eRIDE runs Bosch Performance CX Gen 4, not Shimano EP8 (verify/emtb-3).'
  },
  {
    id: 'em-scott-lumen-eride-910', cat: 'emtb', brand: 'Scott', model: 'Lumen eRIDE 910',
    motorBrand: 'tq', motorModel: 'TQ-HPR50', motorTorque: 50,
    batteryWh: 360, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 120, travelRear: 120,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 16800, price: 8500,
    note: 'Lightweight XC/downcountry-leaning Scott on the quiet TQ HPR50 motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Merida (new maker) — eONE-SIXTY
  // ---------------------------------------------------------------------------
  {
    id: 'em-merida-eone-sixty-8000', cat: 'emtb', brand: 'Merida', model: 'eONE-SIXTY 8000',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-enduro'], weight: 23400, price: 7500,
    note: "Merida's mixed-wheel enduro-travel e-MTB on the Shimano EP8 motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Whyte (new maker, UK) — E-180 RS
  // ---------------------------------------------------------------------------
  {
    id: 'em-whyte-e-180-rs', cat: 'emtb', brand: 'Whyte', model: 'E-180 RS',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code',
    disciplines: ['e-enduro'], weight: 25400, price: 7200,
    note: "UK brand's long-travel gravity e-MTB; Bosch CX motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Marin (new maker) — Alpine Trail E
  // ---------------------------------------------------------------------------
  {
    id: 'em-marin-alpine-trail-e2', cat: 'emtb', brand: 'Marin', model: 'Alpine Trail E2',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 165,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-enduro'], weight: 25000, price: 5200,
    status: 'discontinued', supersededBy: 'em-marin-alpine-trail-e2-2026',
    note: 'Value-oriented alloy gravity e-MTB; long travel, mixed wheel.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: Marin moved the Alpine Trail E line from Shimano to Bosch (verify/emtb-2 wave 2 phase 2).'
  },

  // ---------------------------------------------------------------------------
  // Radon (new maker, DTC German brand) — Jealous
  // ---------------------------------------------------------------------------
  {
    id: 'em-radon-jealous-10-0', cat: 'emtb', brand: 'Radon', model: 'Jealous 10.0',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 22800, price: 6800,
    note: 'Direct-to-consumer German full-power e-MTB; strong value-to-spec ratio.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Vitus (new maker, budget DTC brand) — E-Sommet
  // ---------------------------------------------------------------------------
  {
    id: 'em-vitus-e-sommet-27', cat: 'emtb', brand: 'Vitus', model: 'E-Sommet 27',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 625, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '275', suspension: 'full', travelFront: 170, travelRear: 165,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-enduro'], weight: 25600, price: 4800,
    status: 'discontinued', supersededBy: 'em-vitus-e-sommet-297-vrx',
    note: 'Budget direct-to-consumer gravity e-MTB; 27.5in wheels, Bosch CX motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the real E-Sommet runs Shimano STEPS motors (not Bosch), and the current 27.5-only chassis was replaced by the mullet "E-Sommet 297" (verify/emtb-3).'
  },

  // ---------------------------------------------------------------------------
  // Kona (new maker) — Remote
  // ---------------------------------------------------------------------------
  {
    id: 'em-kona-remote-160', cat: 'emtb', brand: 'Kona', model: 'Remote 160',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 23800, price: 5900,
    note: "Kona's full-power trail e-MTB on the Shimano EP8 motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Devinci (new maker, Canadian brand) — E-Troy
  // ---------------------------------------------------------------------------
  {
    id: 'em-devinci-e-troy-29', cat: 'emtb', brand: 'Devinci', model: 'E-Troy 29',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 23600, price: 6200,
    status: 'discontinued', supersededBy: 'em-devinci-e-troy-bosch-29',
    note: "Canadian brand's full-power trail/enduro e-MTB on the Shimano EP8 motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the redesigned E-Troy switched from Shimano to Bosch (verify/emtb-2 wave 2 phase 2).'
  },

  // ---------------------------------------------------------------------------
  // Merida depth (eONE-SIXTY 900 alloy)
  // ---------------------------------------------------------------------------
  {
    id: 'em-merida-eone-sixty-900', cat: 'emtb', brand: 'Merida', model: 'eONE-SIXTY 900',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-enduro'], weight: 25200, price: 5200,
    note: 'Entry alloy eONE-SIXTY trim; same motor/battery as the carbon 8000.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Focus (new maker) — Jam2 SL (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-focus-jam2-sl-8-9', cat: 'emtb', brand: 'Focus', model: 'Jam2 SL 8.9',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 19400, price: 8200,
    note: "German brand's lightweight-class trail e-MTB on the Fazua Ride 60 motor.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Nukeproof (new maker) — Megawatt (gravity/DH-leaning)
  // ---------------------------------------------------------------------------
  {
    id: 'em-nukeproof-megawatt-297-comp', cat: 'emtb', brand: 'Nukeproof', model: 'Megawatt 297 Comp',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-enduro'], weight: 25800, price: 6500,
    status: 'discontinued', supersededBy: 'em-nukeproof-megawatt-297-carbon-pro',
    note: "Nukeproof's longest-travel gravity e-MTB; Bosch CX motor, DH-adjacent geometry.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the Megawatt moved off Bosch entirely to a full-carbon frame on SRAM Eagle Powertrain (verify/emtb-2 wave 2 phase 2).'
  },

  // ---------------------------------------------------------------------------
  // Whyte depth (E-180 S)
  // ---------------------------------------------------------------------------
  {
    id: 'em-whyte-e-180-s', cat: 'emtb', brand: 'Whyte', model: 'E-180 S',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-enduro'], weight: 26200, price: 5200,
    note: 'Entry alloy E-180 trim; same Bosch CX motor as the RS.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Radon depth (Jealous 9.0)
  // ---------------------------------------------------------------------------
  {
    id: 'em-radon-jealous-9-0', cat: 'emtb', brand: 'Radon', model: 'Jealous 9.0',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24200, price: 5200,
    note: 'Entry alloy Jealous trim; same motor/battery as the carbon 10.0.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Kona depth (Remote 150)
  // ---------------------------------------------------------------------------
  {
    id: 'em-kona-remote-150', cat: 'emtb', brand: 'Kona', model: 'Remote 150',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX', brakes: 'Shimano MT520',
    disciplines: ['e-trail'], weight: 23400, price: 5200,
    note: 'Shorter-travel, more XC/trail-leaning sibling to the Remote 160.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Vitus depth (E-Sommet 29)
  // ---------------------------------------------------------------------------
  {
    id: 'em-vitus-e-sommet-29', cat: 'emtb', brand: 'Vitus', model: 'E-Sommet 29',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 625, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-enduro'], weight: 25200, price: 4800,
    status: 'discontinued', supersededBy: 'em-vitus-e-sommet-297-vrs',
    note: '29in-wheel sibling to the mixed/27.5 E-Sommet; same Bosch CX motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the real E-Sommet runs Shimano STEPS motors (not Bosch) and a mullet-only "297" chassis, not a dedicated 29in-wheel version (verify/emtb-3).'
  },

  // ---------------------------------------------------------------------------
  // Marin depth (Alpine Trail E1)
  // ---------------------------------------------------------------------------
  {
    id: 'em-marin-alpine-trail-e1', cat: 'emtb', brand: 'Marin', model: 'Alpine Trail E1',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 165,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-enduro'], weight: 25600, price: 4500,
    status: 'discontinued', supersededBy: 'em-marin-alpine-trail-e1-2026',
    note: 'Entry alloy trim beneath the E2; same motor/battery.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: Marin moved the Alpine Trail E line from Shimano to Bosch (verify/emtb-2 wave 2 phase 2).'
  },

  // ---------------------------------------------------------------------------
  // Devinci depth (E-Troy Carbon)
  // ---------------------------------------------------------------------------
  {
    id: 'em-devinci-e-troy-carbon', cat: 'emtb', brand: 'Devinci', model: 'E-Troy Carbon',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 21800, price: 9200,
    status: 'discontinued', supersededBy: 'em-devinci-e-troy-bosch-carbon',
    note: 'Top-tier carbon E-Troy build.',
    desc: "Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the redesigned E-Troy switched from Shimano to Bosch (verify/emtb-2 wave 2 phase 2). NOTE: Devinci's current lineup does not show an SRAM X0 Transmission Bosch E-Troy trim — this row's replacement uses the confirmed base-trim Bosch spec instead; a carbon-frame Bosch E-Troy tier was not independently confirmed this pass."
  },

  // ---------------------------------------------------------------------------
  // Focus depth (Jam2, full-power — distinct from the Jam2 SL)
  // ---------------------------------------------------------------------------
  {
    id: 'em-focus-jam2-6-9', cat: 'emtb', brand: 'Focus', model: 'Jam2 6.9',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24600, price: 6000,
    note: 'Full-power sibling to the lightweight Jam2 SL; Bosch CX motor.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Nukeproof depth (Megawatt 297 Elite)
  // ---------------------------------------------------------------------------
  {
    id: 'em-nukeproof-megawatt-297-elite', cat: 'emtb', brand: 'Nukeproof', model: 'Megawatt 297 Elite',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code Ultimate',
    disciplines: ['e-enduro'], weight: 25200, price: 8200,
    status: 'discontinued', supersededBy: 'em-nukeproof-megawatt-297-carbon-rs',
    note: 'Higher-tier Megawatt build; SRAM X0 Transmission upgrade over the Comp.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the Megawatt moved off Bosch entirely to a full-carbon frame on SRAM Eagle Powertrain (verify/emtb-2 wave 2 phase 2).'
  },

  // ---------------------------------------------------------------------------
  // Cube depth (Stereo Hybrid 140, shorter-travel trail trim)
  // ---------------------------------------------------------------------------
  {
    id: 'em-cube-stereo-hybrid-140', cat: 'emtb', brand: 'Cube', model: 'Stereo Hybrid 140',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85,
    batteryWh: 625, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-trail'], weight: 23200, price: 5000,
    note: 'Shorter-travel, more XC/trail-leaning sibling to the Stereo Hybrid 160.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Wave 2 phase 2 re-entries (2026-07-20) — motor-brand platform switches found
  // in the wave-2 phase 1 triage (tools/verify-notes-emtb.md). Each supersedes a
  // discontinued row above via status/supersededBy; specs are best-credible-public
  // from the current maker pages, still unverified (not a fetched-page confirm).
  // ---------------------------------------------------------------------------
  {
    id: 'em-santa-cruz-bullit-bosch-cx', cat: 'emtb', brand: 'Santa Cruz', model: 'Bullit',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 600, batteryRemovable: false, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-enduro'], weight: 21800, price: 8500,
    note: 'Santa Cruz moved the Bullit off Shimano entirely for 2026, onto Bosch CX Gen 5 with a non-removable internal battery.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-santa-cruz-bullit-bosch-x0-axs-rsv', cat: 'emtb', brand: 'Santa Cruz', model: 'Bullit X0 AXS RSV',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 600, batteryRemovable: false, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 21900, price: 9999,
    note: 'Top-tier 2026 Bullit build; Bosch CX Gen 5 replaces the prior Shimano/SRAM XX Transmission spec.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-marin-alpine-trail-e2-2026', cat: 'emtb', brand: 'Marin', model: 'Alpine Trail E2',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-enduro'], weight: 26400, price: 8999,
    note: 'Marin moved the Alpine Trail E line from Shimano to Bosch CX Gen 5 with a bigger 800Wh battery and updated MultiTrac 2 suspension.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-marin-alpine-trail-e1-2026', cat: 'emtb', brand: 'Marin', model: 'Alpine Trail E1',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT420',
    disciplines: ['e-enduro'], weight: 27000, price: 5999,
    note: 'Entry alloy trim beneath the E2; same Bosch CX Gen 5 motor/battery.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-nukeproof-megawatt-297-carbon-pro', cat: 'emtb', brand: 'Nukeproof', model: 'Megawatt 297 Carbon Pro',
    motorBrand: 'sram', motorModel: 'SRAM Eagle Powertrain', motorTorque: 90,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-enduro'], weight: 24000, price: 9899,
    note: 'The Megawatt moved to a full-carbon frame and SRAM Eagle Powertrain, dropping Bosch entirely.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-nukeproof-megawatt-297-carbon-rs', cat: 'emtb', brand: 'Nukeproof', model: 'Megawatt 297 Carbon RS',
    motorBrand: 'sram', motorModel: 'SRAM Eagle Powertrain', motorTorque: 90,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX Eagle Transmission', brakes: 'SRAM Maven',
    disciplines: ['e-enduro'], weight: 23600, price: 10899,
    note: 'Top-tier carbon Megawatt build on SRAM Eagle Powertrain.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-devinci-e-troy-bosch-29', cat: 'emtb', brand: 'Devinci', model: 'E-Troy',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 625, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 24900, price: 6399,
    note: "Devinci's redesigned E-Troy switched from Shimano EP8 to Bosch Performance Line CX.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-devinci-e-troy-bosch-carbon', cat: 'emtb', brand: 'Devinci', model: 'E-Troy',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 625, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail', 'e-enduro'], weight: 23800, price: 7999,
    note: 'Top-tier 2026 E-Troy build (frame material listed as aluminum per current maker copy — a carbon-frame Bosch E-Troy trim was not independently confirmed this pass; see verify-notes-emtb.md).',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },

  // ---------------------------------------------------------------------------
  // Wave 3 re-entries (verify/emtb-3) — 9 stale-wrong-brand rows from wave 2 phase 1
  // ---------------------------------------------------------------------------
  {
    id: 'em-cannondale-moterra-sl-1-shimano-ep801', cat: 'emtb', brand: 'Cannondale', model: 'Moterra SL 1',
    motorBrand: 'shimano', motorModel: 'Shimano EP801 (Cannondale-tuned)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 601, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XO Eagle AXS Transmission', brakes: 'Magura MT7',
    disciplines: ['e-trail'], weight: 22000, price: 9999,
    note: 'Moterra SL replaces its Bosch SX-motor generation with a Cannondale-tuned Shimano EP801 — still branded "lightweight-chassis" but the motor itself is full-power class (85Nm/600W, 601Wh custom internal battery).',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-propain-ekano-3-al-enduro', cat: 'emtb', brand: 'Propain', model: 'Ekano 3 AL Enduro',
    motorBrand: 'dji', motorModel: 'DJI Avinox M2S', motorTorque: 130, motorPowerPeak: 1300,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 24500, price: 6499,
    note: 'Propain replaced the whole Ekano line with an alloy DJI Avinox-motor platform (M2/M2S options, configurator-sold); Shimano/SRAM-motor builds are gone.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-propain-ekano-3-al-enduro-factory', cat: 'emtb', brand: 'Propain', model: 'Ekano 3 AL Enduro Factory',
    motorBrand: 'dji', motorModel: 'DJI Avinox M2S', motorTorque: 130, motorPowerPeak: 1300,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'Trickstuff Direttissima',
    disciplines: ['e-enduro'], weight: 25480, price: 10999,
    note: 'Top-tier configured Ekano 3 AL build (FOX Factory suspension, Trickstuff brakes); Propain has not launched a carbon Ekano — every current trim is alloy.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-pivot-shuttle-am-bosch-cx', cat: 'emtb', brand: 'Pivot', model: 'Shuttle AM',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 23000, price: 10799,
    note: 'The next-gen Shuttle AM switched from Shimano EP8 to Gen 5 Bosch Performance CX/CX-R, with an 800Wh battery and optional 250Wh PowerMore range extender.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-norco-sight-vlt-cx-c2', cat: 'emtb', brand: 'Norco', model: 'Sight VLT CX C2',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-trail', 'e-enduro'], weight: 22200, price: 7999,
    note: 'Mid-tier build of the Bosch-powered Sight VLT CX; the platform is carbon-only now — there is no current alloy "A1" tier.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-norco-sight-vlt-cx-c1', cat: 'emtb', brand: 'Norco', model: 'Sight VLT CX C1',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 22600, price: 9999,
    note: 'Top-tier Sight VLT CX build; Bosch Performance Line CX replaces the prior Shimano EP8 generation.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-scott-genius-eride-910-bosch-cx-gen4', cat: 'emtb', brand: 'Scott', model: 'Genius eRide 910',
    motorBrand: 'bosch', motorModel: 'Bosch Performance CX (Gen 4)', motorTorque: 85,
    batteryWh: 625, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 23400, price: 6559,
    note: "Scott's full-power trail e-MTB runs Bosch Performance CX Gen 4, not Shimano EP8; optional 500Wh Range Booster brings total capacity to 1125Wh.",
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-vitus-e-sommet-297-vrx', cat: 'emtb', brand: 'Vitus', model: 'E-Sommet 297 VRX',
    motorBrand: 'shimano', motorModel: 'Shimano STEPS EP801', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 630, batteryRemovable: false, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle T-Type Transmission', brakes: 'Hayes Dominion A4',
    disciplines: ['e-enduro'], weight: 25000, price: 7699,
    note: 'The real E-Sommet runs Shimano STEPS motors (not Bosch), on a redesigned mullet-only "297" chassis with RockShox ZEB/Vivid Ultimate suspension.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  },
  {
    id: 'em-vitus-e-sommet-297-vrs', cat: 'emtb', brand: 'Vitus', model: 'E-Sommet 297 VRS',
    motorBrand: 'shimano', motorModel: 'Shimano STEPS EP801', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 630, batteryRemovable: false, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX', brakes: 'SRAM DB8',
    disciplines: ['e-enduro'], weight: 25400, price: 6399,
    note: 'Entry-tier mullet E-Sommet 297 build; RockShox ZEB/Super Deluxe Select suspension.',
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed.'
  }

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMTB_PARTS: EMTB_PARTS };
}
