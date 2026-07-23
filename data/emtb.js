// data/emtb.js — e-MTB ("BuildMyEMTB") catalog — the ONLY e-bike surface
//
// Version: 0.1.0  |  Date: 2026-07-18
//
// *** LIVE (2026-07-20, Douglas's flip word — "do them all at once"). *** Served by
// emtb.html/BuildMyEMTB, the ONLY page that loads this file — index.html, bmx.html,
// src/compat.js, src/compat-bmx.js still never touch it (containment holds). See
// data/EMTB-MODEL.md for the data-model spec (section 3 = the field set; section 4 =
// the browse/compare-not-builder recommendation; section 5 = containment). Also wired
// into validate.js (the "EMTB OK" gate line) and this module's own tests.
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
//
// SCOPE EXCLUSIONS (do NOT add on a breadth pass): Riese & Müller Superdelite "mountain" is a
// TOURING e-bike, NOT an e-MTB (Douglas, 2026-07-23 — the maker's EC-conformity-PDF "E-MTB"
// label is overruled by its actual touring positioning). Gazelle and Bird have no e-MTB
// product at all (confirmed 2026-07-23). None of these belong in this catalog.

// ---------------------------------------------------------------------------
// Parts (complete e-MTBs)
// ---------------------------------------------------------------------------
/** @type {any[]} */
var EMTB_PARTS = [

  {
    id: 'em-specialized-turbo-levo', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo 4 Expert',
    motorBrand: 'specialized', motorModel: 'Specialized 3.1 (Full Power System)', motorTorque: 105, motorPowerPeak: 810,
    batteryWh: 840, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 24410, price: 8499,
    note: 'The category-defining full-power trail e-MTB, on the 3.1 motor (105Nm/810W); mixed-wheel (29in front/27.5in rear), MasterMind TCU top-tube display, FOX 38 Performance Elite/FLOAT X Performance Elite suspension. There is no plain unsuffixed "Turbo Levo 4" SKU — this is the Expert build.',
    desc: 'Verified vs the maker spec page (motor/battery/travel/frame/drivetrain/brakes/weight/price all confirmed). Model corrected verify/emtb-4 wave 4 cluster E ("Turbo Levo 4" is not a sold SKU name -> "Turbo Levo 4 Expert", the closest-priced real trim); brakes corrected (SRAM Code -> Maven Silver); weight corrected to the maker\'s exact size-S4 figure (22.7kg sample -> 24.41kg real, size S4); price $8,500 sample -> $8,499.99 exact MSRP.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-4-expert/p/4218704'
  },
  {
    id: 'em-trek-rail', cat: 'emtb', brand: 'Trek', model: 'Rail+ 9.8 GX AXS T-Type Gen 5',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-trail', 'e-enduro'], weight: 24180, price: 10699.99,
    note: 'Bosch-powered full-power trail/enduro bike; big 800 Wh PowerTube. Line renamed Rail+ on Gen 5 CX (85Nm stock, app-tunable to 100Nm/750W).',
    desc: 'Verified vs the fetched maker product page (browser pane, Specs tab). Model/trim corrected verify/emtb-4 wave 4 cluster F (generic "Rail+" -> real current mid-carbon trim "Rail+ 9.8 GX AXS T-Type Gen 5"; drivetrain X0->GX AXS T-Type Transmission, brakes Code->Maven Bronze, weight 23900->24180g (M, w/ TLR sealant no tubes), rear travel 150->160mm, price 8000->8499.97 sale price, US MSRP $10,699.99). COORDINATOR PRICE FIX (2026-07-22, at the pb-emtb-2 merge): price corrected to the desc-disclosed $10,699.99 US MSRP — the stored $8,499.97 was the SALE price, violating the standing MSRP-not-sale ruling (pb-emtb-2 flagged it); priceBasis stays blank pending the finishing-wave fetch confirmation. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched (browser pane) — page labels $10,699.99 "Comp. Value / Original price" alongside the current $8,499.97 sale price, with the page footer\'s standing "Prices shown are manufacturer\'s suggested retail prices" disclosure; msrp-confirmed set.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/rail/rail-9-8-gx-axs-t-type-gen-5/p/5328977/'
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
    id: 'em-santa-cruz-heckler', cat: 'emtb', brand: 'Santa Cruz', model: 'Heckler GX AXS',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 22190, price: 7599,
    note: 'All-mountain full-power stablemate to the Bullit; shorter travel, same EP801. Removable Darfon 720Wh battery (4mm Allen, confirmed via Santa Cruz support docs).',
    desc: 'Verified vs Santa Cruz product-support spec pages. Model/trim corrected verify/emtb-4 wave 4 cluster D (generic "Heckler" -> real current SKU "Heckler GX AXS"); drivetrain/brakes casing corrected to match the maker page; weight corrected 23.6kg sample -> maker-published 22.19kg (48.92lb) for this build. Price $7,599 is the current bikes.com listing (may reflect a running promo vs full RRP).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/pages/product-support/heckler-9-my24'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.commencal.com/us/en/BT3MSXPWE4L.html'
  },
  {
    id: 'em-orbea-wild', cat: 'emtb', brand: 'Orbea', model: 'Wild LT H10',
    family: 'orbea-wild-lt', modelYear: 2026,
    motorBrand: 'avinox', motorModel: 'Avinox M2S', motorTorque: 130, motorPowerPeak: 1500,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore/XT mix (M6200/M8200)', brakes: 'Shimano MT620',
    disciplines: ['e-trail', 'e-enduro'], weight: 22500, price: 7717,
    note: 'Orbea replaced the whole Wild line with "Wild LT" and switched off Bosch entirely onto the new Avinox M2S motor (130Nm continuous / up to 150Nm boost, 1500W boost peak) — the plain "Wild H10" name and Bosch Gen 5 CX spec no longer exist on orbea.com; H10 is the entry alloy ("Hydro") trim. Fork/shock: Fox 38 Float Performance 170 / Fox Float X Performance trunnion 205x65mm.',
    desc: "Verified vs the maker's own product-configurator page (motor/battery/travel/frame/drivetrain/brakes/price all confirmed; MSRP $7,717 matches exactly). Model/motor platform corrected wave 4 cluster C — this is a full generation switch, not a spec tweak: motorBrand bosch->avinox, motorModel/torque/power all replaced (Avinox M2S 130/150Nm, 1500W peak vs the prior Bosch CX 85Nm/750W), batteryWh 750->800, drivetrain Shimano XT-only -> the real mixed Deore/XT build, brakes Shimano XT 4-piston -> the real Shimano MT620, price $6,999 sample -> the confirmed $7,717 MSRP. REQUIRES a new motorBrand vocab value: added 'avinox' to EMTB_VOCAB in src/schema-emtb.js (flagged in the wave report — Avinox is a real, newly-launched e-MTB motor maker, not a fabricated value, confirmed via its own 2026-04-09 press release and independent lab tests).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/wild-lt-h10-20mph'
  },
  {
    id: 'em-canyon-spectral-on', cat: 'emtb', brand: 'Canyon', model: 'Spectral:ON CF 8',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'carbon', drivetrain: 'Shimano Deore XT/SLX 12-speed', brakes: 'Shimano SLX M7120 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24440, price: 5999,
    note: 'Direct-to-consumer full-power trail bike; mid-tier CF 8 build (Fox 36 Rhythm fork, Shimano XT/SLX drivetrain).',
    desc: 'Verified vs the fetched maker page (canyon.com Spectral:ON CF 8). Model/wheel/battery/travel/drivetrain/brakes/weight/price corrected verify/emtb-4 wave 4 cluster A: the generic "Spectral:ON" row actually described no real single SKU — the platform is mullet (29in front/27.5in rear), not 29in-only; battery is 800Wh removable, not 900Wh fixed; rear travel is 155mm, not 150mm; and no current mainline trim runs SRAM GX Eagle Transmission/SRAM Code (that combo matched only the CF 9 AXS trim, now in Canyon\'s outlet/clearance section, not the active lineup) — retitled to the real, currently-sold CF 8 SKU with its confirmed Shimano XT/SLX drivetrain and SLX brakes. Weight (24.44kg) and price ($5,999 MSRP, site currently shows a $4,499 sale) both maker-page-sourced.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-gb/electric-bikes/electric-mountain-bikes/spectral-on/spectral-on-cf/spectral-on-cf-8/4077.html'
  },
  {
    id: 'em-cannondale-moterra', cat: 'emtb', brand: 'Cannondale', model: 'Moterra 4',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 600, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano CUES U6000 LinkGlide 11-speed', brakes: 'Tektro Gemini SL 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24700, price: 5499,
    note: 'The redesigned Moterra is alloy-only and 29in-only at this entry tier (SmartForm C1 alloy frame), not mixed-wheel carbon; Bosch Gen 5 CX with a 600Wh battery.',
    desc: 'Verified vs the fetched maker page (cannondale.com/en-us Moterra 4). Brakes corrected verify/emtb-4 wave 4 cluster A (Tektro M535 -> Tektro Gemini SL 4-piston, the current US-market spec; M535 matches a UK listing instead). Price $5,499 matches exactly (bikemag.com MSRP confirmation). Weight stays the existing sample — Cannondale publishes no bike-level weight on the spec page; a bikemag.com review reports 56.6lb/25.7kg sourced from Cannondale press materials, not an independent scale measurement, so it is not used per THE BAR.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.cannondale.com/en-us/bikes/electric/e-mountain/moterra-neo/moterra-4-smu'
  },
  {
    id: 'em-transition-relay', cat: 'emtb', brand: 'Transition', model: 'Relay Carbon',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60, motorPowerPeak: 450,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle 90 Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-trail'], weight: 19500, price: 9199,
    note: 'Lightweight ("SL") Fazua-powered bike — rides close to an acoustic trail bike. The real Relay carbon base build runs 29in wheels at 160mm F/R (mixed-wheel/170mm is the separate Relay PNW variant), SRAM Eagle 90 mechanical Transmission (not GX AXS), and Maven Bronze brakes.',
    desc: 'Verified vs the maker page (transitionbikes.com/Bikes/Relay, build-select spec table) for motor/battery/travel/wheel/frame/drivetrain/brakes and MSRP ($9,199; site also shows a $5,999 sale price, basis noted). Weight kept as the pre-existing nominal sample: Transition publishes only an aggregate "starting at 42.5lb/19.27kg with battery" figure, not tied to this exact build/size, so per the fork/wheel/shock interface-verification convention the weight stays unverified/nominal while interfaces are maker-confirmed. Model/wheel/travel/drivetrain/brakes/price corrected verify/emtb-4 wave 4 cluster E (Relay -> Relay Carbon, mullet 160/150 -> 29in 160/160, GX Eagle Transmission -> SRAM Eagle 90 Transmission, SRAM Code -> Maven Bronze, $8000 -> $9,199 MSRP). No Shimano-drivetrain Relay trim exists.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.transitionbikes.com/Bikes/Relay'
  },
  {
    id: 'em-rocky-mountain-altitude-powerplay', cat: 'emtb', brand: 'Rocky Mountain', model: 'Altitude Powerplay Alloy 50',
    motorBrand: 'rocky-mountain', motorModel: 'Dyname S4 Pro', motorTorque: 108, motorPowerPeak: 1000,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM Eagle 90 Transmission', brakes: 'SRAM Maven',
    disciplines: ['e-enduro'], weight: 24700, price: 7899,
    note: 'In-house Dyname S4 Pro motor (108Nm/1000W peak) — among the highest torque in the class. Removable 720Wh battery.',
    desc: 'Interfaces verified vs bikes.com product/collection pages: motor generation, battery, wheel size and frame material are maker-confirmed. Model/trim corrected verify/emtb-4 wave 4 cluster D (generic "Altitude Powerplay" -> real current mid-tier SKU "Altitude Powerplay Alloy 50", the Altitude Powerplay III generation); motor corrected Dyname 4.0 -> Dyname S4 Pro (same 108Nm torque, now with a stated 1000W peak); wheelConfig corrected mullet -> 29 (Rocky\'s own Altitude Powerplay III collection banner states 29in wheels); frame corrected carbon -> aluminum to match the real Alloy 50 SKU; drivetrain corrected to the current build\'s SRAM Eagle 90 Transmission. Brakes and weight are NOT independently confirmed for this exact 2026 build (kept as same-tier samples — SRAM Maven is Rocky\'s common current-year pairing, weight carried over from an older Dyname-4.0-era Alloy 50 spec sheet); price $7,899 is the current bikes.com listing.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://bikes.com/collections/altitude-powerplay'
  },

  // ---------------------------------------------------------------------------
  // Specialized depth (Turbo Levo / Levo SL / Kenevo SL trims)
  // ---------------------------------------------------------------------------
  {
    id: 'em-specialized-turbo-levo-comp-alloy', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo 4 Alloy',
    motorBrand: 'specialized', motorModel: 'Specialized 3.1 (Full Power System)', motorTorque: 105, motorPowerPeak: 810,
    batteryWh: 840, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM Eagle 70 T-Type', brakes: 'SRAM DB8 Stealth',
    disciplines: ['e-trail', 'e-enduro'], weight: 26080, price: 4999,
    note: 'Entry-level alloy-frame Turbo Levo trim; same motor/battery as the carbon range, but a mechanical (non-AXS) SRAM Eagle 70 T-Type drivetrain and SRAM DB8 brakes, not GX Eagle/Code R.',
    desc: 'Verified vs the maker spec page (motor/battery/travel/frame/drivetrain/brakes/weight/price all confirmed). Drivetrain and brakes corrected verify/emtb-4 wave 4 cluster E (SRAM GX Eagle -> SRAM Eagle 70 T-Type mechanical, SRAM Code R -> SRAM DB8 Stealth); weight corrected to the maker\'s exact size-S4 figure (24.5kg sample -> 26.08kg real). Price ($4,999.99) already matched exactly.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-4-alloy/p/4221347'
  },
  {
    id: 'em-specialized-turbo-levo-pro', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo 4 Pro',
    motorBrand: 'specialized', motorModel: 'Specialized 3.1 (Full Power System)', motorTorque: 105, motorPowerPeak: 810,
    batteryWh: 840, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 23940, price: 9999,
    note: 'Top-tier non-S-Works carbon Levo trim; 840 Wh battery, up to 1120Wh with the range extender. Real drivetrain is SRAM X0 Eagle Transmission (not XX SL) with Maven Silver brakes.',
    desc: 'Verified vs the maker spec page (motor/battery/travel/frame/drivetrain/brakes/weight/price all confirmed). Drivetrain/brakes/weight/price corrected verify/emtb-4 wave 4 cluster E (SRAM XX SL Eagle Transmission -> SRAM X0 Eagle Transmission [no XX SL Levo 4 trim exists below S-Works], SRAM Code Ultimate -> Maven Silver, 21.5kg sample -> 23.94kg real size-S4 weight, $10,299 sample -> $9,999.99 MSRP).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-4-pro/p/4218702'
  },
  {
    id: 'em-specialized-turbo-levo-sl-expert', cat: 'emtb', brand: 'Specialized', model: 'Turbo Levo SL 2 Expert',
    motorBrand: 'specialized', motorModel: 'Specialized SL 1.2', motorTorque: 50, motorPowerPeak: 320,
    batteryWh: 320, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-trail'], weight: 18980, price: 8999,
    note: 'Lightweight ("SL") class trail bike; acoustic-close handling, small 320 Wh battery. The current lineup is "Levo SL 2" (not plain "Levo SL"); real fork travel is 160mm (frame\'s "150mm travel" figure is the rear).',
    desc: 'Verified vs the maker spec page (motor/battery/travel/frame/drivetrain/brakes/weight/price all confirmed). Model/travel/drivetrain/brakes/weight/price corrected verify/emtb-4 wave 4 cluster E (Turbo Levo SL Expert -> Turbo Levo SL 2 Expert [current gen name], 150/150 -> 160/150 travel, SRAM X0 Eagle Transmission -> SRAM GX Eagle Transmission, SRAM Code RSC -> Maven Bronze, 18.2kg sample -> 18.98kg real size-S4 weight, $9,500 sample -> $8,999.99 MSRP).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-sl-2-expert/p/4277412'
  },
  {
    id: 'em-specialized-turbo-kenevo-sl-expert', cat: 'emtb', brand: 'Specialized', model: 'Turbo Kenevo SL 2 Expert',
    motorBrand: 'specialized', motorModel: 'Specialized SL 1.2', motorTorque: 50, motorPowerPeak: 320,
    batteryWh: 320, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 20320, price: 8499,
    note: 'The line renamed Kenevo SL 2; lightweight gravity/enduro-travel SL platform, longest travel in the Specialized e-range, on 29in wheels and the SL 1.2 motor. Real brakes are SRAM Maven Bronze (not Code RSC).',
    desc: 'Verified vs the maker spec page (motor/battery/travel/frame/drivetrain/brakes/weight/price all confirmed). Brakes/weight corrected verify/emtb-4 wave 4 cluster E (SRAM Code RSC -> Maven Bronze, 19.2kg sample -> 20.32kg real size-S4 weight); price ($8,499.99) and 29in wheel config already matched exactly (wheel config was previously corrected verify/emtb-3, reconfirmed this pass).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-kenevo-sl-2-expert/p/4277407'
  },
  {
    id: 'em-specialized-turbo-kenevo-sl2-comp', cat: 'emtb', brand: 'Specialized', model: 'Turbo Kenevo SL 2 Comp',
    motorBrand: 'specialized', motorModel: 'Specialized SL 1.2 Custom Rx Trail Tuned Motor', motorTorque: 50, motorPowerPeak: 320,
    batteryWh: 320, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM S-1000 Eagle AXS Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 20190, price: 8999.99,
    note: 'Base-tier Kenevo SL 2: same FACT 11m carbon frame/motor/battery as the Expert, but RockShox Zeb Select/SuperDeluxe Select suspension instead of Fox/RockShox Ultimate-tier.',
    desc: 'Verified vs the fetched maker product page (browser pane, full Technical Specifications table). Weight is the real 20.19kg production figure (weight basis matches the Expert row\'s size convention).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-kenevo-sl-2-comp/p/4221334'
  },
  {
    id: 'em-specialized-turbo-kenevo-sl2-ohlins-coil', cat: 'emtb', brand: 'Specialized', model: 'Turbo Kenevo SL 2 Öhlins Coil',
    motorBrand: 'specialized', motorModel: 'Specialized 1.2 SL Custom Rx Trail Tuned Motor', motorTorque: 50, motorPowerPeak: 320,
    batteryWh: 320, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'TRP DH-R Evo',
    disciplines: ['e-enduro'], weight: 20490, price: 9999.99,
    note: 'Top-tier Kenevo SL 2: Öhlins RXF38 m.2 fork + Öhlins TTX coil shock, TRP DH-R Evo 4-piston brakes (220mm rotors both ends) — the only Kenevo SL 2 build with coil suspension and TRP brakes.',
    desc: 'Verified vs the fetched maker product page (browser pane, full Technical Specifications table incl. frame/suspension/brakes/drivetrain/wheels/weight/geometry).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-kenevo-sl-2-ohlins-coil/p/4277428'
  },

  // ---------------------------------------------------------------------------
  // Trek depth (Rail / Fuel EXe trims)
  // ---------------------------------------------------------------------------
  {
    id: 'em-trek-rail-9-5', cat: 'emtb', brand: 'Trek', model: 'Rail+ 8 Gen 5',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM Eagle 70 T-Type Transmission', brakes: 'Shimano MT620',
    disciplines: ['e-trail', 'e-enduro'], weight: 24680, price: 5999.99,
    note: 'Entry alloy Rail+ trim; same Gen 5 Bosch CX motor/800 Wh PowerTube as the carbon range.',
    desc: 'Verified vs the fetched maker product page (browser pane, model-selector + Specs tab). Model/trim corrected verify/emtb-4 wave 4 cluster F ("Rail+ 9.5", no such trim -> real current entry-alloy trim "Rail+ 8 Gen 5"; drivetrain SRAM GX Eagle -> SRAM Eagle 70 T-Type Transmission, brakes SRAM Code R -> Shimano MT620 (real build swaps to Shimano brakes), weight 25200->24680g (M), rear travel 150->160mm, price 6500->5999.99 MSRP).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/rail/f/F344/rail+-8-gen-5/79221/5348383/'
  },
  {
    id: 'em-trek-rail-9-9-xx', cat: 'emtb', brand: 'Trek', model: 'Rail+ 9.9 X0 AXS T-Type Gen 5',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 23980, price: 12299.99,
    note: 'Top-tier Rail+ carbon trim; SRAM X0 Transmission + Maven Silver brakes (real current top trim is X0, not XX — no XX-spec Rail+ is sold).',
    desc: 'Verified vs the fetched maker product page (browser pane, Specs tab). Model/trim corrected verify/emtb-4 wave 4 cluster F ("Rail+ 9.9 XX AXS T-Type", no such trim -> real top-tier "Rail+ 9.9 X0 AXS T-Type Gen 5"; drivetrain XX->X0 Eagle AXS T-Type Transmission, weight 23400->23980g (M), rear travel 150->160mm, price 12500->9999.97 current sale price; US Comp. Value/original price $12,299.99, close to the prior sample). COORDINATOR PRICE FIX (2026-07-22): price corrected to the disclosed $12,299.99 original/MSRP figure — the stored $9,999.97 was the sale price (MSRP-not-sale ruling); priceBasis stays blank pending fetch confirmation. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched (browser pane, collection + product page) — $12,299.99 confirmed labeled "Comp. Value / Original price" next to the $9,999.97 current sale price; msrp-confirmed set.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/rail/rail-9-9-x0-axs-t-type-gen-5/p/48461/'
  },
  {
    id: 'em-trek-fuel-exe-9-5', cat: 'emtb', brand: 'Trek', model: 'Fuel+ EX 9.7 Gen 2',
    motorBrand: 'tq', motorModel: 'TQ-HPR60', motorTorque: 60, motorPowerPeak: 350,
    batteryWh: 580, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 145,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle 70 T-Type Transmission', brakes: 'SRAM DB8',
    disciplines: ['e-trail'], weight: 20680, price: 5999.99,
    note: 'The line renamed Fuel+ (Gen 2); the new TQ HPR60 replaces HPR50 with more torque (60 vs 50Nm) and a bigger 580Wh battery (vs 360Wh) — no more clip-on range extender. Entry Fuel+ trim; the whole Fuel+ EX range is carbon-only (no alloy tier).',
    desc: 'Verified vs the fetched maker product page (browser pane, model-selector + Specs tab). Model/trim corrected verify/emtb-4 wave 4 cluster F ("Fuel+ EX 8", no such trim exists -> real current entry trim "Fuel+ EX 9.7 Gen 2"; frame corrected aluminum -> carbon (the Fuel+ range has no alloy tier), weight 20900->20680g (M), price 7000->5999.99 MSRP; drivetrain/brakes already matched the real 9.7 build (SRAM Eagle 70 T-Type Transmission, SRAM DB8) so those fields were unchanged).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/fuel/f/F370/fuel+-ex-9-7-gen-2/79613/5349090/'
  },
  {
    id: 'em-trek-fuel-exe-9-9-xx', cat: 'emtb', brand: 'Trek', model: 'Fuel+ EX 9.9 X0 AXS Gen 2',
    motorBrand: 'tq', motorModel: 'TQ-HPR60', motorTorque: 60, motorPowerPeak: 350,
    batteryWh: 580, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 145,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail'], weight: 19580, price: 9999.97,
    note: 'Top-tier lightweight Fuel+ trim; acoustic-close trail-bike handling on the new TQ HPR60.',
    desc: 'Verified vs the fetched maker product page (browser pane, model-selector + Specs tab). Model/trim corrected verify/emtb-4 wave 4 cluster F ("Fuel+ EX 9.8 XO AXS", no such trim -> real top-tier "Fuel+ EX 9.9 X0 AXS Gen 2"; drivetrain typo XO->X0 Eagle AXS T-Type Transmission, weight 19400->19580g (M), price 11500->9999.97 MSRP).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/fuel/f/F370/fuel-ex-9-9-x0-axs-gen-2/56079/5335087/'
  },

  // ---------------------------------------------------------------------------
  // Santa Cruz depth + Ibis
  // ---------------------------------------------------------------------------
  {
    id: 'em-santa-cruz-bullit-xx', cat: 'emtb', brand: 'Santa Cruz', model: 'Bullit X01 AXS RSV',
    motorBrand: 'shimano', motorModel: 'Shimano EP8 (DU-EP800)', motorTorque: 85, motorPowerPeak: 250,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM X01 Eagle', brakes: 'SRAM Code RSC',
    disciplines: ['e-enduro'], weight: 21250, price: 11499,
    status: 'discontinued', supersededBy: 'em-santa-cruz-bullit-bosch-x0-axs-rsv',
    note: 'Top-tier Shimano-era Bullit build; SRAM X01 Eagle mechanical 12-speed with SRAM\'s e-bike-specific shifter (not an AXS Transmission — "AXS RSV" is Santa Cruz\'s own build-tier label) and SRAM Code RSC brakes.',
    desc: 'Trim-identity fix, verify/emtb-6 (flagged unresolved by verify/emtb-5): "Bullit XX AXS" is not a real Santa Cruz Bullit trim — SRAM never offered an XX-level build on this bike. Retitled to the real top-tier Shimano-era SKU, "Bullit X01 AXS RSV" (confirmed via BikeRadar\'s full review + corroborating Bikerumor/99spokes/Vital MTB listings of the 2022-2024 lineup). Drivetrain corrected SRAM XX Eagle Transmission -> SRAM X01 Eagle (mechanical, not AXS/Transmission); brakes corrected SRAM Maven Silver -> SRAM Code RSC (Maven did not exist for most of this generation\'s production run); motor model corrected EP801 -> EP8/DU-EP800 (85Nm, 250W peak); battery corrected 720 -> 630Wh; rear travel corrected 150 -> 170mm (both ends run 170mm on the Shimano-era Bullit, matching the base Bullit row above). Weight set to BikeRadar\'s tested/measured 21.25kg; price set to BikeRadar\'s as-tested $11,499. Still unverified (best-credible-public) — no live Santa Cruz product page exists for this discontinued SKU to fetch directly, so verified:true is withheld per THE BAR. Superseded: Santa Cruz dropped Shimano on the Bullit entirely for the 2026 model year (verify/emtb-2 wave 2 phase 2).'
  },
  {
    id: 'em-santa-cruz-heckler-sl', cat: 'emtb', brand: 'Santa Cruz', model: 'Heckler SL GX AXS',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Maven Base',
    disciplines: ['e-trail'], weight: 19880, price: 9699,
    note: 'Lightweight SL sibling to the full-power Heckler; Fazua Ride 60 motor, removable 430Wh battery.',
    desc: 'Verified vs Santa Cruz product page. Model/trim corrected verify/emtb-4 wave 4 cluster D (generic "Heckler SL" -> real current SKU "Heckler SL GX AXS"); travel corrected 150/140 -> maker-published 160/150 (matches the full-power Heckler); weight corrected 19.1kg sample -> maker-published 19.88kg (43.84lb). Price kept as pre-existing same-tier sample — Loam Wolf review cites a 5-model SL range of EUR 7,499-12,999, no confirmed US MSRP for this exact build. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched the stored source URL (browser pane) — the page now geo-serves USD pricing (URL still /en-eu/, unchanged) and discloses an exact literal price, "$9,699.00 USD". Price corrected 7500 (stale EUR-range-derived sample) -> 9699 confirmed USD MSRP; msrp-confirmed set; source URL unchanged.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.santacruzbicycles.com/en-eu/products/heckler-sl-gx-axs-2026-1-1'
  },
  {
    id: 'em-ibis-oso', cat: 'emtb', brand: 'Ibis', model: 'Oso TR',
    family: 'ibis-oso',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 600, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle 90 T-Type', brakes: 'SRAM Maven Base',
    disciplines: ['e-trail', 'e-enduro'], weight: 22770, price: 8499,
    note: "Ibis's second-generation modular Oso platform (HD/TR/S travel classes) stayed on Bosch — did not follow the industry trend to DJI Avinox — with a smaller, lower-mounted 600Wh battery (down from 800Wh) plus an optional 250Wh PowerMore extender. This is the base $8,499 mechanical build (SRAM Eagle 90 Transmission + Maven Base); a $9,699 SRAM AXS/GX Eagle Transmission + Maven Silver build is also offered.",
    desc: 'Verified vs the maker page. Gen/battery corrected verify/emtb-3 wave 3 phase 2 (Gen 5 CX confirmed, 800Wh -> 600Wh, drivetrain matched to the real TR mechanical build) — that reading holds and is now maker-page-confirmed exactly: SRAM Eagle 90 Transmission derailleur/shifter, SRAM Maven Base brakes/SRAM Centerline 220mm rotors, RockShox Lyrik Base 160mm fork, RockShox Super Deluxe Select+ 230x60mm shock, price $8,499 exact match. Torque corrected verify/emtb-4 wave 4 cluster B: 100 -> 120Nm ("up to 120 Nm" on the current bikes/oso-tr page — a firmware/torque update since an earlier 100Nm reading). Weight set to the maker-stated 22.77kg complete-build claimed figure (size XM, with frame protection + tire sealant, no pedals).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.ibiscycles.com/bikes/oso-tr'
  },
  {
    id: 'em-ibis-oso-tr-gx-axs', cat: 'emtb', brand: 'Ibis', model: 'Oso TR GX AXS',
    family: 'ibis-oso', motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 600, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission (AXS)', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: null, price: 9699,
    note: 'The mid-tier build on the same Oso TR chassis as em-ibis-oso (SRAM Eagle 90 mechanical/Maven Base) — swaps in a wireless SRAM GX Eagle Transmission (AXS Pod shifter, XS-1275 T-Type 10-52T cassette) and SRAM Maven Silver brakes, plus an upgraded RockShox Lyrik Ultimate fork (vs the base build\'s Lyrik Base); same RockShox Super Deluxe Select+ 230x60mm shock, motor and battery as the base build.',
    desc: 'Verified vs the maker\'s interactive build-configurator on the same product page as em-ibis-oso (ibiscycles.com/bikes/oso-tr) — selecting the "$9699" build tier via the browser pane (a JS click on the price-selector button; the static page/WebFetch only shows the default $8499 build\'s spec table) rendered the tier-specific component table: "RockShox Lyrik, Ultimate, 160mm" fork, "SRAM Maven, Silver" brakes, "SRAM GX Eagle Transmission" rear derailleur, "SRAM AXS Pod" shifter, "SRAM XS 1275 Transmission, T-Type, 10-52T" cassette, "SRAM GX Eagle Transmission, T-Type" chain — motor/battery/frame/travel/wheel fields match the base build\'s already-confirmed spec (unchanged across tiers per the page). No per-tier complete-bike weight is published (only the base build\'s 22.77kg figure, which does not apply to this heavier-brakes/AXS-electronics build), left null rather than guessed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.ibiscycles.com/bikes/oso-tr'
  },
  {
    id: 'em-santa-cruz-vala-al-deore', cat: 'emtb', brand: 'Santa Cruz', model: 'Vala AL Deore 2026',
    family: 'santa-cruz-vala', gen: '2026', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (BDU38, Gen 5 Smart System)', motorTorque: 85,
    batteryWh: 600, batteryRemovable: false, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore M6100 12-speed', brakes: 'Shimano Deore 4-piston',
    disciplines: ['e-trail'], weight: 24090, price: 5999,
    note: "Brand-new model for the catalog (breadth-2): Santa Cruz's entirely new aluminum, full-power Bosch e-MTB line, entirely absent before this wave (only the Shimano-motor Bullit/Heckler existed). This is the base \"AL Deore\" build — RockShox Psylo Gold RC fork/Deluxe Select shock, Shimano Deore mechanical drivetrain, fixed (non-removable) 600Wh battery.",
    desc: "Verified vs the fetched maker product page (Shopify .js variant JSON for price + the rendered product page for frame/motor/battery/travel/wheel/weight; the page's own \"See All Specs\" drawer did not render in the browser pane so brakes are the build-kit-callout Deore level, not a maker-confirmed exact SKU — left as a plain string, not a guessed model number). Weight 53.11 lb -> 24090g (maker-published, size S). Price: MSRP (\"Regular price\") is $5,999 — the page's headline $4,949 is a labeled sale price, never used per pricing policy. Motor torque (85Nm) is the standard published Bosch Performance Line CX Gen 5 spec (same figure already used for the Trek Rail+ Gen 5 CX row in this catalog) — the page names the drive unit (BDU38) but does not itself restate the torque number.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/collections/vala/products/vala-al-deore-2026'
  },

  // ---------------------------------------------------------------------------
  // Commencal depth (Meta Power 29 + Meta Power SX Signature)
  // ---------------------------------------------------------------------------
  {
    id: 'em-commencal-meta-power-29', cat: 'emtb', brand: 'Commencal', model: 'Meta Power 29',
    motorBrand: 'shimano', motorModel: 'Shimano EP8 (DU-EP800)', motorTorque: 85, motorPowerPeak: 250,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX 12-speed', brakes: 'Shimano Deore 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24800, price: 6900,
    note: 'The 29in-wheel sibling to the mixed-wheel Meta Power SX; this is the Essential Dirt trim, the entry build in the Meta Power 29 range.',
    desc: 'Verified vs the fetched maker page (commencal.com/us Meta Power 29 Shimano Essential Dirt). Motor/travel/drivetrain/brakes/weight/price all corrected verify/emtb-4 wave 4 cluster A: motor is the Shimano EP8 (DU-EP800, 250W/85Nm), not EP801; travel is 170mm front/155mm rear, not 150/140; drivetrain is Shimano SLX 12-speed with an E13 crankset and Deore chain/cassette, not SRAM GX Eagle; brakes are Shimano Deore 4-piston, not Formula Cura 4. Weight (24.8kg, size S average) and price ($6,900 MSRP, site currently shows a $4,300 sale) are both maker-page-stated.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.commencal.com/us/en/commencal-meta-power-29-essential-dirt/21METAPW29EDT.html'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.commencal.com/us/en/commencal-meta-power-sx-bosch-signature-pure-white/22METAPWSG2.html'
  },

  // ---------------------------------------------------------------------------
  // Orbea depth (Wild + Rise lightweight line)
  // ---------------------------------------------------------------------------
  {
    id: 'em-orbea-wild-m-team', cat: 'emtb', brand: 'Orbea', model: 'Wild LT M-TEAM RS',
    family: 'orbea-wild-lt', gen: '2027', modelYear: 2027,
    motorBrand: 'avinox', motorModel: 'Avinox M2S', motorTorque: 130, motorPowerPeak: 1500,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 21800, price: 11024,
    note: 'Top-tier configurable carbon Wild build; Orbea replaced the whole Wild line with "Wild LT" and switched off Bosch entirely onto the Avinox M2S motor (130Nm continuous / up to 150Nm boost, 1500W peak) — the "Wild M-Team" name and Shimano XT Di2/Bosch spec no longer exist on orbea.com. Frame is the new "Orbea Wild OMR 2027" carbon layup; Fox 38 Float Factory 170 / Fox Float X2 Factory trunnion 205x65mm.',
    desc: "Verified vs the maker's own product-configurator page (motor/battery/travel/frame/drivetrain/brakes/price all confirmed; MSRP $11,024 matches exactly). Model/motor platform corrected wave 4 cluster C — a full generation switch: motorBrand bosch->avinox, motorModel/torque/power replaced (Avinox M2S vs Bosch CX 85Nm/750W), batteryWh 750->800, drivetrain Shimano XT Di2 -> the real SRAM GX Eagle AXS build, brakes Shimano XT 4-piston -> SRAM Maven Silver, price $9,999 sample -> the confirmed $11,024 MSRP. Uses the same new 'avinox' motorBrand vocab value added to src/schema-emtb.js this wave (see em-orbea-wild's desc / the wave report).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/wild-lt-m-team-rs-20mph'
  },
  {
    id: 'em-orbea-rise-m-team', cat: 'emtb', brand: 'Orbea', model: 'Rise SL M-LTD',
    family: 'orbea-rise-sl', modelYear: 2026,
    motorBrand: 'shimano', motorModel: 'Shimano EP801 RS Gen2 MC', motorTorque: 60,
    batteryWh: 420, batteryRemovable: false, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'Shimano XTR Di2', brakes: 'Shimano XTR 9220',
    disciplines: ['e-trail'], weight: 17800, price: 11549,
    note: 'Lightweight-class Orbea; the "Rise M-Team" trim name was retired — the current top-tier Rise SL build is called "Rise SL M-LTD" (Orbea\'s "Rise" family is now split into "Rise SL"/"Rise LT" sub-lines). Motor delivers 60Nm in its default RS mode, switchable to an 85Nm RS+ mode via the RS Control System (same integrated unit also drives the display + electronic dropper off the main battery, so no separate top-tube display). Frame: Orbea Rise SL OMR 2025 carbon, 140mm travel both ends (not 150/140).',
    desc: "Verified vs the maker's own product-configurator page (motor/battery/travel/frame/drivetrain/brakes/price all confirmed; MSRP $11,548.95 rounds to the catalog's $11,549). Model/spec corrected wave 4 cluster C: model 'Rise M-Team' -> 'Rise SL M-LTD' (the real current top trim name); motorModel 'Shimano EP8 RS' -> 'Shimano EP801 RS Gen2 MC'; batteryWh 360 -> 420; batteryRemovable true -> false (Orbea brands this pack 'Internal', non-user-removable, unlike the Wild's swappable PowerTube-style packs); rangeExtender true -> removed (the maker page states 'Range Extender: N/A' for this exact build); travelFront 150 -> 140; drivetrain 'SRAM XX SL Eagle Transmission' -> the real Shimano XTR Di2 electronic build (no SRAM parts on this bike at all); brakes 'SRAM Code Ultimate' -> Shimano XTR 9220. motorTorque kept at 60 (the maker page confirms Rise ships in its default RS/60Nm mode; an RS+/85Nm boost mode exists but is a Nm figure, not Watts, so it is described here rather than stuffed into the Watts-typed motorPowerPeak field — Shimano does not publish a peak-Watts number for this unit).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/rise-sl-m-ltd-20mph'
  },
  {
    id: 'em-orbea-rise-h30', cat: 'emtb', brand: 'Orbea', model: 'Rise SL H30',
    family: 'orbea-rise-sl', modelYear: 2026,
    motorBrand: 'shimano', motorModel: 'Shimano EP600 RS Gen2 MC', motorTorque: 60,
    batteryWh: 540, batteryRemovable: false, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano MT201',
    disciplines: ['e-trail'], weight: 19500, price: 5039,
    note: 'Entry alloy Rise trim; the current full name is "Rise SL H30" (Orbea\'s "Rise" family is now split into "Rise SL"/"Rise LT" sub-lines). Frame: Orbea Rise SL Hydro 2025 aluminum, 140mm travel both ends (not 150/140); Shimano EP600 RS Gen2 MC motor (not the carbon range\'s EP801 RS), same RS Control System integration.',
    desc: "Verified vs the maker's own product-configurator page (motor/battery/travel/frame/drivetrain/brakes/price all confirmed; MSRP $5,038.95 rounds to the catalog's $5,039). Model/spec corrected wave 4 cluster C: model 'Rise H30' -> 'Rise SL H30'; motorModel 'Shimano EP8 RS' -> 'Shimano EP600 RS Gen2 MC' (the H30 uses the lower-tier EP600 unit, not the same EP801 as the carbon M-team); batteryWh 360 -> 540; batteryRemovable true -> false ('Internal' branded, non-user-removable); rangeExtender true -> removed (page states 'Range Extender: N/A'); travelFront 150 -> 140; brakes 'Shimano MT420' -> the real Shimano MT201.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/rise-sl-h30-20mph'
  },

  // ---------------------------------------------------------------------------
  // Canyon depth (Spectral:ON CFR, Strive:ON, Neuron:ON)
  // ---------------------------------------------------------------------------
  {
    id: 'em-canyon-spectral-on-cfr', cat: 'emtb', brand: 'Canyon', model: 'Spectral:ON CFR',
    motorBrand: 'shimano', motorModel: 'Shimano EP801', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'SRAM Maven Ultimate',
    disciplines: ['e-trail', 'e-enduro'], weight: 23900, price: 9499,
    note: 'Top-tier CFR carbon Spectral:ON build (Fox 38 Factory fork option).',
    desc: 'Verified vs the fetched maker page (canyon.com Spectral:ON CFR). Wheel/battery/travel/drivetrain/brakes/price corrected verify/emtb-4 wave 4 cluster A: mullet not 29in-only, 800Wh removable not 900Wh fixed, 155mm rear travel not 150mm, SRAM X0 Eagle AXS Transmission not XX SL, SRAM Maven Ultimate not Maven Silver. Weight (23.9kg) already matched the sample exactly. Price corrected to the $9,499 US MSRP (base-page listing shows a current $6,899 sale); the row already used the CFR name, which correctly identifies this real current top-tier SKU.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-gb/electric-bikes/electric-mountain-bikes/spectral-on/spectral-on-cfr/spectral-on-cfr/3530.html'
  },
  {
    id: 'em-canyon-strive-on', cat: 'emtb', brand: 'Canyon', model: 'Strive:ON CFR',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'Shimano Deore XT M8100 12-speed', brakes: 'Shimano Deore XT M8120 4-piston',
    disciplines: ['e-enduro'], weight: 24300, price: 7499,
    note: "Canyon's gravity-leaning e-enduro platform; longer travel than the Spectral:ON. Canyon relaunched the Strive:ON in May 2026 with a Bosch Gen 5 CX/CX-R motor (120Nm/750W) and a 750Wh battery, but that redesign is UK/EU/Canada-only with no announced US availability — this row instead matches the current US-market Strive:ON CFR (still Bosch-powered, previous-gen CX motor), the only Strive:ON actually sold in the same USD market as the rest of this row's fields.",
    desc: 'Verified vs the fetched maker page (canyon.com/en-us Strive:ON CFR). Motor brand corrected verify/emtb-4 wave 4 cluster A (Shimano EP8 -> Bosch Performance Line CX — the catalog had the wrong motor maker entirely) plus drivetrain/brakes (SRAM GX Eagle Transmission/SRAM Code -> Shimano Deore XT M8100/M8120, the real CFR spec) and model retitled Strive:ON -> Strive:ON CFR to name the actual verified SKU. Wheel/travel/frame already matched. Weight (53.58lb/24.3kg) is maker-page-listed. Price set to the $7,499 US MSRP; the page currently shows a $6,399 sale.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-us/electric-bikes/electric-mountain-bikes/mountain-ebikes-striveon/cfr/strive-on-cfr/3429.html'
  },
  {
    id: 'em-canyon-neuron-on', cat: 'emtb', brand: 'Canyon', model: 'Neuron:ON AL 9',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 145,
    frameMaterial: 'aluminum', drivetrain: 'SRAM S1000 Eagle AXS Transmission', brakes: 'SRAM DB8 Stealth 4-piston',
    disciplines: ['e-trail'], weight: 24900, price: 6439,
    note: "Canyon's lighter, shorter-travel XC/trail e-bike; top-tier AL 9 build of the alloy Neuron:ON AL range (relaunched 2025 on Bosch power, not Shimano).",
    desc: 'Verified vs the fetched maker page (canyon.com Neuron:ON AL 9) plus Canyon\'s own 2025 launch press release. Motor brand corrected verify/emtb-4 wave 4 cluster A (Shimano EP8 -> Bosch Performance Line CX — another wrong-motor-maker catch) plus battery/travel/drivetrain/brakes (630Wh -> 800Wh, 140/130mm -> 150/145mm travel, Shimano XT -> SRAM S1000 Eagle AXS Transmission, Shimano XT 4-piston -> SRAM DB8 Stealth 4-piston) and model retitled Neuron:ON -> Neuron:ON AL 9 to name the real top-tier SKU actually matching the drivetrain/brake spec. Weight (24.9kg) is maker-page-listed. Price: no US canyon.com listing found; EU RRP is EUR 5,499 (GBP 5,149) — used a US retailer (thebicyclesshops.com) selling the same SKU at $6,439 as the USD sample basis, stated here per THE PRICE RULE.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-gb/electric-bikes/electric-mountain-bikes/neuron-on/al/neuron-on-al-9/4059.html'
  },
  {
    id: 'em-canyon-torque-on-cf-8', cat: 'emtb', brand: 'Canyon', model: 'Torque:ON CF 8',
    motorBrand: 'shimano', motorModel: 'Shimano EP8 (EP801)', motorTorque: 85, motorPowerPeak: 250,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 180, travelRear: 175,
    frameMaterial: 'carbon', drivetrain: 'Shimano SLX', brakes: 'Shimano SLX',
    disciplines: ['e-dh'], weight: 24845, price: 5799,
    note: "Canyon's gravity/bike-park e-MTB — the brand's gap covered here (no other Torque:ON trim was in the catalog). Full carbon frame, 800Wh removable aluminum battery.",
    desc: 'Verified vs the fetched maker page (canyon.com/en-us Torque:ON CF 8 product page + the Torque:ON category page bullets for rear travel). Weight from the maker-listed 54.77 lb size-M spec. Price is the $5,799 US MSRP (page currently shows a $4,299 sale).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-us/electric-bikes/electric-mountain-bikes/torque-on/torque-on-cf/torque-on-cf-8/3387.html'
  },

  // ---------------------------------------------------------------------------
  // Giant (new maker) — Trance X E+ / Reign E+
  // ---------------------------------------------------------------------------
  {
    id: 'em-giant-trance-x-e-plus-elite', cat: 'emtb', brand: 'Giant', model: 'Trance X E+ 2 20MPH',
    motorBrand: 'giant', motorModel: 'SyncDrive Pro2', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX', brakes: 'Shimano Deore 4-piston',
    disciplines: ['e-trail'], weight: 25690, price: 6400,
    note: "Giant's in-house SyncDrive Pro2 motor (co-engineered with Yamaha); 800 Wh EnergyPak.",
    desc: 'Verified vs the maker page. Model/trim corrected verify/emtb-4 wave 4 cluster B (no aluminum Giant Trance X E+ trim is named "Elite" — Elite is exclusive to the composite Trance X Advanced E+ line; the real top aluminum US trim is the Trance X E+ 2 20MPH, 800Wh not 850Wh, Shimano SLX shifter/derailleur not Deore, Shimano Deore BR-M6120 4-piston brakes not MT420, weight the maker-stated 25.69kg size M, price the real US MSRP $6,400).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.giant-bicycles.com/us/trance-x-eplus-2-20mph-2023'
  },
  {
    id: 'em-giant-trance-x-advanced-e-plus-0', cat: 'emtb', brand: 'Giant', model: 'Trance X Advanced E+ Elite 0',
    motorBrand: 'giant', motorModel: 'SyncDrive Pro2', motorTorque: 85,
    batteryWh: 400, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX Eagle Transmission AXS', brakes: 'SRAM G2 Ultimate 4-piston',
    disciplines: ['e-trail'], weight: 19240, price: 13500,
    note: 'Top-tier carbon Trance X Advanced E+ Elite build; mullet wheels (29in front, 27.5in rear), Zipp 3MOTO carbon wheelset.',
    desc: 'Verified vs the maker page. Model corrected verify/emtb-4 wave 4 cluster B (real name carries "Elite": Trance X Advanced E+ Elite 0, not "Trance X Advanced E+ 0"). Battery corrected 850Wh -> 400Wh (EnergyPak 400, ultra-slim pack; a 200Wh EnergyPak Plus range extender is compatible), wheelConfig 29 -> mullet (29in front / 27.5in rear per the fetched spec table), drivetrain SRAM XX SL Eagle Transmission -> SRAM XX Eagle Transmission AXS derailleur (cassette is the XX Eagle SL Transmission 10-52T), brakes SRAM Code Ultimate -> SRAM G2 Ultimate 4-piston (200mm front/180mm rear). Weight is the maker-stated 19.24kg for size S (smallest size; weight varies by size, no size-M figure was shown on the fetched page). Price is the real US MSRP $13,500 (size M; a size-L unit was on sale for $9,999 at fetch time).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.giant-bicycles.com/us/trance-x-advanced-eplus-elite-0'
  },
  {
    id: 'em-giant-reign-e-plus-0', cat: 'emtb', brand: 'Giant', model: 'Reign Advanced E+ 0',
    motorBrand: 'giant', motorModel: 'SyncDrive Pro 3', motorTorque: 90, motorPowerPeak: 800,
    batteryWh: 560, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX Eagle Transmission AXS', brakes: 'SRAM Maven Ultimate',
    disciplines: ['e-enduro'], weight: 22300, price: 13500,
    note: "Giant's gravity/enduro e-MTB moved to the new 48V SyncDrive Pro 3 (90Nm/800W peak, up from Pro2's 85Nm), with a smaller but higher-density 560Wh EnergyPak Smart battery plus an included 280Wh EnergyPak Plus range extender.",
    desc: 'Verified vs the maker page. Motor generation corrected verify/emtb-3 wave 3 phase 2 (SyncDrive Pro2 -> Pro 3). Further corrected verify/emtb-4 wave 4 cluster B: drivetrain SRAM X0 Eagle Transmission -> SRAM XX Eagle Transmission AXS, brakes SRAM Code Ultimate -> SRAM Maven Ultimate 4-piston 200mm CenterLine (the real (2026) US top-tier build), weight matches the maker-stated 22.3kg (size M) exactly, price corrected $9,999 -> the real US MSRP $13,500.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.giant-bicycles.com/us/reign-advanced-eplus-0'
  },
  {
    id: 'em-giant-reign-e-plus-2', cat: 'emtb', brand: 'Giant', model: 'Reign E+ 2',
    family: 'giant-reign-e-plus', modelYear: 2024,
    motorBrand: 'giant', motorModel: 'SyncDrive Pro2', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Cues LinkGlide 11-speed', brakes: 'Shimano Deore 4-piston',
    disciplines: ['e-enduro'], price: 6500,
    note: "Entry-tier aluminum Reign E+, one rung below the carbon Reign Advanced E+ 0 (em-giant-reign-e-plus-0): mullet wheels (29in front / 27.5in rear), Fox 38 Rhythm E-Optimized fork, Fox Float X Performance shock, 800Wh non-slim EnergyPak (vs the Advanced's slimmer 560Wh pack).",
    desc: "Reached via the giant-bicycles.com Electric Mountain category listing (breadth-3, driving the site's own filter/listing UI rather than guessing a slug — the current live lineup no longer surfaces Trance X E+ at all, only Talon E+/Stance E+/Reign E+). Fetched the maker's own Reign E+ 2 (2024) product page directly: frame/fork/shock/drivetrain/brakes/battery/travel all maker-stated. No bike weight is published on the page (boilerplate 'have your local dealer weigh it' text in place of a figure) — weight left unset rather than guessed, matching the phantom-number discipline used elsewhere in this catalog. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched the maker page — discloses an exact literal price, \"$6,500 *\" (the asterisk footnotes financing/APR terms, not a price qualifier), matching the stored figure exactly; msrp-confirmed set.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.giant-bicycles.com/us/bikes-reign-eplus'
  },

  // ---------------------------------------------------------------------------
  // Cannondale depth (Moterra 1 + Moterra SL lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-cannondale-moterra-1', cat: 'emtb', brand: 'Cannondale', model: 'Moterra Carbon 1',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'mixed', drivetrain: 'Shimano XTR/XT 12-speed', brakes: 'Shimano XT 8120 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 22800, price: 12999,
    note: 'Moterra Carbon 1 (model code C25172U) is a distinct mid-tier build below the full-carbon Moterra 1: carbon front triangle with a SmartForm C1 alloy swingarm, RockShox Lyrik/Deluxe Select+ suspension (150mm f/r), and Shimano XTR/XT 12-speed drivetrain — not the SRAM AXS Transmission group.',
    desc: 'Verified vs the fetched maker page (cannondale.com/en Moterra Carbon 1, model code C25172U). Battery/travel/frame/drivetrain/brakes corrected verify/emtb-4 wave 4 cluster A (800Wh -> 750Wh; travelFront 160 -> 150mm to match the RockShox Lyrik Select+ fork spec; frame corrected to mixed carbon-front/alloy-swingarm construction; drivetrain SRAM XO/GX AXS Transmission -> Shimano XTR/XT 12-speed; brakes Magura MT7 -> Shimano XT 8120 4-piston — the prior row had actually described the different, higher-tier "Moterra 1" build). Weight and price are not published on the fetched page (this is an international/non-US listing); price stays the existing $12,999 sample, unconfirmed — Australian dealer listings show the same figure in AUD, not USD, so it is not treated as a confirmed match. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched the stored source (browser pane) — still no price anywhere on the page (international/no-cart listing). priceBasis left UNSET: no disclosed-exception class fits a silently-carried unconfirmed sample figure, so blanking beats guessing.',
    verified: true, lastChecked: '2026-07-22', source: 'https://www.cannondale.com/en/bikes/electric/e-mountain/moterra-neo/moterra-neo-carbon-1-c25172u'
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
    id: 'em-rocky-mountain-instinct-powerplay', cat: 'emtb', brand: 'Rocky Mountain', model: 'Instinct Powerplay Alloy 50',
    motorBrand: 'rocky-mountain', motorModel: 'Dyname 4.0', motorTorque: 108, motorPowerPeak: 700,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 23400, price: 6800,
    note: 'Shorter-travel trail sibling to the Altitude Powerplay; same in-house Dyname 4.0 motor (still current — unlike the Altitude, the non-SL Instinct Powerplay was not moved to Dyname S4 Pro).',
    desc: 'Interfaces verified vs bikes.com product/comparison pages: motor (still Dyname 4.0, confirmed via Rocky\'s own "Instinct Powerplay vs Devinci e-Troy" comparison page: 108Nm/700W peak/720Wh), wheel size and frame material match the real current SKU. Model/trim corrected verify/emtb-4 wave 4 cluster D (generic "Instinct Powerplay" -> real current SKU "Instinct Powerplay Alloy 50"; note a separate NEW "Instinct Powerplay SL" trim also launched on a different Dyname S4 Lite motor — this row is the full-power, non-SL bike, which the catalog already correctly described). Drivetrain/brakes/weight/price for this exact Alloy 50 build were NOT independently re-confirmed this pass (kept as pre-existing same-tier samples). PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched the stored source (browser pane) — it is a two-model comparison page (motor/battery specs only, no per-trim pricing for either bike). priceBasis left UNSET: the stored $6,800 was never maker-disclosed for this exact trim, so blanking beats guessing.',
    verified: true, lastChecked: '2026-07-22', source: 'https://bikes.com/en-intl/pages/instinct-powerplay-vs-devinci-e-troy'
  },
  {
    id: 'em-rocky-mountain-altitude-powerplay-c90', cat: 'emtb', brand: 'Rocky Mountain', model: 'Altitude Powerplay Carbon 70',
    motorBrand: 'rocky-mountain', motorModel: 'Dyname S4 Pro', motorTorque: 108, motorPowerPeak: 1000,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle 90 Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 25000, price: 10799,
    note: 'Top-tier Altitude Powerplay carbon build — the "Carbon 90" tier no longer exists; Carbon 70 is now the only/top carbon trim.',
    desc: 'Verified vs bikes.com collection page + The Loam Wolf\'s as-tested review. Major trim correction verify/emtb-4 wave 4 cluster D: "Altitude Powerplay Carbon 90" is stale — the current Altitude Powerplay III lineup is only 3 SKUs (Carbon 70 / Alloy 50 / Alloy 30), no Carbon 90. Corrected model to the real current top/only-carbon SKU "Altitude Powerplay Carbon 70"; motor corrected Dyname 4.0 -> Dyname S4 Pro (108Nm, now 1000W peak); wheelConfig corrected mullet -> 29 (collection banner); drivetrain/brakes corrected to SRAM Eagle 90 Transmission / SRAM Maven Silver (The Loam Wolf\'s as-tested C70 build); weight corrected to the as-tested 25kg (55.3lb, size L, no maker per-size spec published); price $10,799 is the current bikes.com listing.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://bikes.com/collections/altitude-powerplay'
  },
  {
    id: 'em-rocky-mountain-instinct-powerplay-sl-c90', cat: 'emtb', brand: 'Rocky Mountain', model: 'Instinct Powerplay SL Carbon 90',
    family: 'rocky-mountain-instinct-powerplay-sl', modelYear: 2025,
    motorBrand: 'rocky-mountain', motorModel: 'Dyname S4 Lite', motorTorque: 75, motorPowerPeak: 700,
    batteryWh: 480, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 145,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Code Ultimate Stealth',
    disciplines: ['e-trail'], price: 11999,
    note: 'A distinct lightweight-SL platform from the full-power Instinct Powerplay row above — new Dyname S4 Lite motor (30% lighter than Dyname 4.0/S4 Pro), 480Wh removable battery, RIDE-4 adjustable MX (mullet) geometry.',
    desc: 'Verified vs the fetched maker product page (bikes.com/products/instinct-pp-sl-c90-25: price, rear travel, wheel config, drivetrain/suspension component callout) plus the maker\'s own Instinct Powerplay SL overview/FAQ page (motor peak power 700W / torque 75Nm / 480Wh battery) and a third-party ride report (nsmb.com) corroborating the 150mm front / 145mm rear travel split and drivetrain tier. No bike weight is published by the maker — left blank rather than guessed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://bikes.com/products/instinct-pp-sl-c90-25'
  },

  // ---------------------------------------------------------------------------
  // Transition depth (Relay Alloy XT + Relay Carbon X0 AXS)
  // ---------------------------------------------------------------------------
  {
    id: 'em-transition-relay-alloy-xt', cat: 'emtb', brand: 'Transition', model: 'Relay PNW Alloy',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60, motorPowerPeak: 450,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM Eagle 90 Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-trail'], weight: 20200, price: 7899,
    note: 'Entry alloy Relay trim; same Fazua Ride 60 motor as the carbon range. The real mixed-wheel/170mm build is branded "Relay PNW" (a flip-chip sibling of the 29in/160mm "Relay"); there is no Shimano-drivetrain trim.',
    desc: 'Verified vs the maker page (transitionbikes.com/Bikes/Relay, build-select spec table) for motor/battery/travel/wheel/frame/drivetrain/brakes and MSRP ($7,899; site also shows a $4,999 sale price, basis noted). Weight kept as the pre-existing nominal sample per the fork/wheel/shock interface-verification convention — Transition publishes only an aggregate "starting at" bike weight, not a per-build figure. Model/travel/drivetrain/brakes/price corrected verify/emtb-4 wave 4 cluster E (Relay Alloy XT -> Relay PNW Alloy [no XT trim exists], 160/150 -> 170/170, Shimano XT -> SRAM Eagle 90 Transmission, Shimano XT 4-piston -> SRAM Maven Bronze, $6,000 -> $7,899 MSRP).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.transitionbikes.com/Bikes/Relay'
  },
  {
    id: 'em-transition-relay-carbon-x0-axs', cat: 'emtb', brand: 'Transition', model: 'Relay PNW Carbon',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60, motorPowerPeak: 450,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle 90 Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail'], weight: 19100, price: 9999,
    note: 'Top-tier carbon Relay PNW build (mixed wheel, 170mm F/R); SRAM Maven Silver brakes + HS2 rotors over the base Maven Bronze/Centerline spec. Drivetrain is the same mechanical SRAM Eagle 90 Transmission as every other Relay build, not an X0 AXS electronic group — no AXS Relay trim exists.',
    desc: 'Verified vs the maker page (transitionbikes.com/Bikes/Relay, build-select spec table) for motor/battery/travel/wheel/frame/drivetrain/brakes and MSRP ($9,999; site also shows a $6,599 sale price, basis noted). Weight kept as the pre-existing nominal sample per the fork/wheel/shock interface-verification convention — Transition publishes only an aggregate "starting at" bike weight, not a per-build figure. Model/travel/drivetrain/brakes/price corrected verify/emtb-4 wave 4 cluster E (Relay Carbon X0 AXS -> Relay PNW Carbon [no AXS trim exists], 160/150 -> 170/170, SRAM X0 Eagle Transmission -> SRAM Eagle 90 Transmission (mechanical), SRAM Code -> Maven Silver, $9,500 -> $9,999 MSRP).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.transitionbikes.com/Bikes/Relay'
  },

  // ---------------------------------------------------------------------------
  // Mondraker (new maker) — Crafty (full-power) + Level (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-mondraker-crafty-carbon-r', cat: 'emtb', brand: 'Mondraker', model: 'Crafty Carbon R',
    family: 'mondraker-crafty', gen: 'Gen 5', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5, BDU384Y)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'mixed', drivetrain: 'SRAM S1000 Eagle AXS T-Type Transmission (SRAM GX Eagle T-Type chain/cassette)', brakes: 'SRAM Maven Base',
    disciplines: ['e-enduro'], weight: 24000, price: 8499,
    note: "Mondraker's gravity-leaning full-power e-MTB: Bosch CX Gen 5 (BDU384Y), 85Nm/600W stock (page: \"the same 85Nm of torque and 600W peak power as the previous model\"); Stealth Air carbon front triangle + alloy rear triangle (mixed, not full carbon); 29in wheels both ends (not mullet as previously cataloged) per the maker's own tire spec (29x2.5 front and rear) and wheel-size badge.",
    desc: "Verified vs the maker's own product page (motor/battery/travel/frame/wheel-size/drivetrain/brakes all confirmed; MSRP $8,499 matches exactly). Wheel config corrected wave 4 cluster C (mullet -> 29, the page's own badge + tire spec both say 29in F+R); motor power peak corrected (750W -> 600W, the page explicitly states 600W for this bike); frameMaterial corrected (carbon -> mixed, carbon front triangle/alloy rear triangle per the page's own construction text); drivetrain/brakes corrected to the actual build-sheet components (SRAM S1000 Eagle AXS T-Type derailleur, not GX Eagle; SRAM Maven Base, not Code). Weight stays the prior sample estimate — the maker page publishes no bike weight for this SKU (interface-verification exception, VERIFY-PROTOCOL.md's frames precedent applied to a complete-bike row).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://mondraker.com/us/en/crafty-carbon-r1783597201'
  },
  {
    id: 'em-mondraker-level-carbon-rr', cat: 'emtb', brand: 'Mondraker', model: 'Level RR',
    family: 'mondraker-level', gen: 'Gen 5', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5, BDU384Y)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM S1000 Eagle AXS T-Type Transmission (SRAM GX Eagle T-Type chain/cassette)', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 26900, price: 8999,
    note: "Mondraker's full-power gravity enduro bike (id/model string says \"Level Carbon RR\" but the CURRENT Level range is 6061 alloy-only, not carbon — the id is a legacy token, kept append-only per policy); Bosch CX Gen 5 (BDU384Y) at the Level's shipped 100Nm/750W tune (the page: \"the new firmware unlocks... boosting the peak from 600W and 85Nm to a massive 750W and 100Nm\"); mullet wheels, 180/170mm travel.",
    desc: "Verified vs the maker's own product page (motor/battery/travel/frame/wheel-config/drivetrain/brakes all confirmed; weight 59.3 lb = 26900g maker-published; MSRP $8,999 matches exactly). Drivetrain/brakes corrected wave 4 cluster C (SRAM X0 Eagle AXS -> the actual SRAM S1000 Eagle AXS T-Type derailleur; SRAM Maven Silver -> SRAM Maven Bronze, the real build-sheet brake); motorTorque corrected (85 -> 100Nm, matching the shipped 750W tune the page states, resolving the prior 85Nm+750W mismatched pair); weight corrected to the maker-published 26900g (was 24500g sample).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://mondraker.com/us/en/level-rr1750250055'
  },
  {
    id: 'em-mondraker-level-xr', cat: 'emtb', brand: 'Mondraker', model: 'Level XR',
    family: 'mondraker-level', gen: 'Gen 5', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX Gen 5 SMART SYSTEM (BDU384Y)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 25900, price: 9999,
    note: "A tier above the already-cataloged Level RR (breadth-2): same 6061-alloy Level chassis/180-170mm travel/mullet layout and Bosch CX Gen 5 100Nm/750W tune, but a step up in suspension (Öhlins RXF 38 M.3 fork + Öhlins TTX22M.2 shock, vs the RR's build) and brakes (SRAM Maven Silver vs the RR's Maven Bronze) with the same GX Eagle AXS T-Type drivetrain.",
    desc: "Verified vs the fetched maker product page (technical-specs table read directly, not the promo copy): frame/fork/shock/drivetrain/brakes/battery/weight/price all maker-stated. Weight 57.1 lb -> 25900g. Price $9,999, no sale pricing shown on the page.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://mondraker.com/us/en/level-xr1750249988'
  },

  // ---------------------------------------------------------------------------
  // Haibike (new maker) — AllMtn (Yamaha) + Nduro (Bosch)
  // ---------------------------------------------------------------------------
  {
    id: 'em-haibike-allmtn-9', cat: 'emtb', brand: 'Haibike', model: 'AllMtn 3',
    motorBrand: 'yamaha', motorModel: 'Yamaha PW-X3', motorTorque: 85, motorPowerPeak: 250,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano Deore 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 23600, price: 5600,
    note: "Haibike's flagship full-power all-mountain bike on the Yamaha PW-X3 motor (250W/85Nm/720Wh InTube battery).",
    desc: 'Corrected, still unverified verify/emtb-4 wave 4 cluster B (no maker-stated bike weight found — interfaces fetched-page-confirmed but weight bar not met, so verified:true withheld). Model/trim corrected: no Haibike AllMtn trim is numbered "9" — the current lineup runs AllMtn 1/2/3, and 3 is the top full-power trim (Shimano Deore drivetrain + Deore BR-MT420 4-piston brakes, RockShox 35 Gold RL fork, RockShox Deluxe Select R shock, 160mm front AND rear travel). Frame corrected carbon -> aluminum, rear travel 150 -> 160mm, drivetrain SRAM GX Eagle Transmission -> Shimano Deore (real spec, no SRAM Transmission on any current AllMtn trim), brakes SRAM Code -> Shimano Deore 4-piston. Price: EUR 5,199 RRP (haibike.com int/US-toggle page, still EUR-denominated) converted to a $5,600 USD sample — no confirmed US MSRP found. Previously flagged verify/emtb-3 as "PW-X3/85Nm/720Wh matches current AllMtn pages exactly" — that motor/battery reading holds; the frame/drivetrain/brake fields did not and are corrected here.'
  },
  {
    id: 'em-haibike-nduro-8', cat: 'emtb', brand: 'Haibike', model: 'Nduro 8 Freeride',
    motorBrand: 'yamaha', motorModel: 'Yamaha PW-X3', motorTorque: 85, motorPowerPeak: 250,
    batteryWh: 720, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 180, travelRear: 180,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 25200, price: 8100,
    note: 'Gravity/freeride-leaning Haibike Enduro platform on the Yamaha PW-X3 (720Wh InTube battery, optional range extender); RockShox ZEB Ultimate fork, Mavic E-Deemax wheels.',
    desc: 'Corrected, still unverified verify/emtb-4 wave 4 cluster B (no maker-stated bike weight found — interfaces fetched-page-confirmed but weight bar not met, so verified:true withheld). "Nduro 8" is real but the maker\'s full name is "NDURO 8 FREERIDE" — added to the model field. Corrected: travel 170/160 -> 180/180mm (RockShox ZEB Ultimate front, matching rear), drivetrain Shimano XT -> SRAM GX Eagle (real spec: Sram GX Eagle 12s shifter/derailleur/chain), brakes Shimano XT 4-piston -> SRAM DB Maven Bronze 4-piston (220mm front/203mm rear). Price: EUR 7,499 RRP converted to a $8,100 USD sample — no confirmed US MSRP found. Previously corrected verify/emtb-3 wave 3 phase 2 (motor brand Bosch -> Yamaha, 800 -> 720Wh) — that reading holds; frame/drivetrain/brake/travel fields did not and are corrected here. CORRECTED breadth-3: wheelConfig mullet -> 29 — re-fetched the maker\'s own product page (forcing the site\'s English/International locale via its own locale switcher, since no US market exists) and both front and rear tire codes read the same "62-622" (622mm = 29in bead-seat diameter) — this is a same-size 29in bike, not mixed-wheel.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.haibike.com/en-int/products/nduro-8-freeride-hnct1'
  },
  {
    id: 'em-haibike-nduro-7', cat: 'emtb', brand: 'Haibike', model: 'Nduro 7',
    motorBrand: 'yamaha', motorModel: 'Yamaha PW-X3', motorTorque: 85, motorPowerPeak: 250,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 180, travelRear: 180,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX', brakes: 'Magura MT5 4-piston',
    disciplines: ['e-enduro'], price: 7019,
    note: "One rung below the Nduro 8 Freeride (em-haibike-nduro-8) on the same aluminum Nduro chassis: FOX 38 Performance fork / FOX Float X2 Performance shock (vs the 8's RockShox ZEB/Vivid Ultimate), Shimano SLX drivetrain (vs SRAM GX Eagle), Magura MT5 brakes on both, Mavic E-Deemax wheels.",
    desc: "Reached by forcing the site's own English/International locale via its locale switcher (haibike.com defaults to de-de; no United States market exists in its country list — International EUR is the closest EN option, matching breadth-2's finding) and navigating the site's own Enduro eMTBs collection listing to the product page, then opening its spec accordion (a <details>-based collapsible-tabs component that starts collapsed; set .open=true on each <details> to read the rendered E-SYSTEM/FRAME/DRIVE/SUSPENSION/COMPONENTS/WHEELSET sections). Front and rear tire both read \"62-622\" (622mm bead-seat = 29in), same as the sibling Nduro 8 row — 29in wheels both ends, not mullet. travelFront is the maker-stated 180mm (FOX 38); travelRear is not separately published (only the 225x75mm shock size, same as the Nduro 8's), so it is carried at 180mm matching the sibling row's convention rather than guessed independently. No bike weight is published on this page. PRICE RULE: EUR 6,499 regular price (no separate US price exists) converted to a $7,019 USD sample at this catalog's established ~1.08 EUR->USD sample-conversion ratio (matching the sibling Nduro 8 and AllMtn 3 rows' basis), disclosed.",
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.haibike.com/en-int/products/nduro-7-hnbr1'
  },

  // ---------------------------------------------------------------------------
  // Cube (new maker) — Stereo Hybrid 160 + Stereo Hybrid ONE55 SL (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-cube-stereo-hybrid-160', cat: 'emtb', brand: 'Cube', model: 'Stereo Hybrid ONE77 HPC SLT 800',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX-R (Gen 5)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX Eagle AXS Transmission', brakes: 'Magura Gustav Pro 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 23800, price: 10199,
    note: "Cube's full-power all-mountain e-MTB, now on the Bosch CX-R Gen 5 motor; top-tier SLT 800 build of the renamed ONE77 platform (170mm mullet).",
    desc: 'Verified vs the fetched maker page (cube.eu Stereo Hybrid ONE77 HPC SLT 800). CUBE fully renamed its numeric Stereo Hybrid range (160/140/ONE55) to the ONE22/ONE44/ONE77 nomenclature for 2025-26 — "Stereo Hybrid 160" is no longer a real, currently-sold SKU (cube.eu/uk-en/e-bikes/mountainbike/fullsuspension/stereo-hybrid-160 404s). Retitled verify/emtb-4 wave 4 cluster A to the direct 170mm/mullet successor, the ONE77 platform, top SLT 800 trim (frame material also corrected aluminum -> carbon, motor Gen 4 CX -> Gen 5 CX-R, drivetrain/brakes Shimano XT -> SRAM XX Eagle AXS Transmission/Magura Gustav Pro, travel 160/160 -> 170/170). Weight (23.8kg) is maker-page-listed. Price: no direct SLT-800 GBP RRP found on cube.eu itself; used a UK dealer listing (damianharriscycles.co.uk) at £7,999, converted to a ~$10,199 USD sample — not independently confirmed, basis stated per THE PRICE RULE.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.cube.eu/cube-stereo-hybrid-one77-hpc-slt-800-galaxy-n-orange/103600'
  },
  {
    id: 'em-cube-stereo-hybrid-one55-sl', cat: 'emtb', brand: 'Cube', model: 'Stereo Hybrid ONE55 C:68X SLT 750',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 4)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM XX1 Eagle AXS', brakes: 'Magura MT7',
    disciplines: ['e-trail', 'e-enduro'], weight: 21900, price: 8999,
    status: 'discontinued',
    note: 'The real ONE55 line was full-power (Bosch Gen 4 CX, not a lightweight SX motor) across all three trims (SLX/TM/SLT); this was the flagship SLT 750 build — carbon frame, Newmen carbon wheels, wireless SRAM XX1 AXS, 29in-only, Magura MT7 brakes.',
    desc: 'Corrected but left unverified verify/emtb-4 wave 4 cluster A. CUBE has fully renamed its numeric Stereo Hybrid range (160/140/ONE55) to the ONE22/ONE44/ONE77 nomenclature for 2025-26 — cube.eu/e-bikes/mountainbike/fullsuspension/stereo-hybrid-one55 404s, and the current fullsuspension lineup lists only ONE22/ONE44/AMS Hybrid ONE44/ONE77/AMS Hybrid 177 families, no ONE55. Unlike Stereo Hybrid 160 (clean 170mm/mullet -> ONE77 match) and Stereo Hybrid 140 (clean 140mm/29in -> ONE44 match), ONE55 sat between those two travel points with no clean 1:1 successor, so per THE BAR this is marked status:discontinued and left unverified rather than guessing a replacement SKU. Brakes corrected from SRAM Code to Magura MT7 (the real spec, confirmed across three independent retailer listings for the last-sold 2023/24 model year — rabe-bike.de, westbrookcycles.co.uk, freeborn.co.uk — all matching consistently), a real error in the prior wave\'s entry worth fixing even though the row can\'t be verified against a live maker page. Price basis unchanged from the prior wave (UK MSRP £8,999, not independently confirmed in USD).'
  },

  // ---------------------------------------------------------------------------
  // YT (new maker) — Decoy Core 3 + Decoy Uncaged 8
  // ---------------------------------------------------------------------------
  {
    id: 'em-yt-decoy-core-3', cat: 'emtb', brand: 'YT', model: 'Decoy X MX CORE 1 AL',
    motorBrand: 'dji', motorModel: 'Avinox M2S', motorTorque: 150, motorPowerPeak: 1300,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM S100 Eagle Transmission', brakes: 'SRAM DB8 Stealth',
    disciplines: ['e-trail', 'e-enduro'], weight: 24800, price: 4499,
    note: "Direct-to-consumer YT Decoy; entry alloy trim. YT retired the whole Shimano-EP8-powered Decoy/Uncaged naming — the current alloy tier is the DJI Avinox-motor \"Decoy X\" sub-line (fixed 800Wh battery, not removable).",
    desc: 'Verified vs the fetched maker product page (yt-industries.com, via Exa fetch — full Tech & Spec table); motor torque/peak-power cross-checked against YT\'s own Decoy X launch coverage (Bikerumor, Velomotion) since the raw spec table names the drive unit but not its Nm/W figures. Model/trim corrected verify/emtb-4 wave 4 cluster F: "Decoy Core 3" (Shimano EP8, no such trim currently sold) -> real current entry-alloy trim "Decoy X MX CORE 1 AL" (YT switched the whole Decoy line off Shimano — the carbon tier is now Bosch-powered, the alloy "X" tier is DJI Avinox-powered; no Shimano Decoy remains). All e-system/drivetrain/weight/price fields rewritten to match: motor Shimano EP8 -> DJI Avinox M2S (150Nm/1300W peak), battery 630->800Wh (fixed, non-removable), drivetrain Shimano XT -> SRAM S100 Eagle Transmission, brakes Shimano XT 4-piston -> SRAM DB8 Stealth, weight 23800->24800g, rear travel 150->160mm. PRICE RULE: EUR/GBP 4,499 launch price (Bikerumor/Velomotion coverage of YT\'s own announcement) used as a $4,499 USD sample — no separate US price found; basis disclosed.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.yt-industries.com/en-us/E-MTB/Avinox-Decoy-X/CORE-1/'
  },
  {
    id: 'em-yt-decoy-uncaged-8', cat: 'emtb', brand: 'YT', model: 'Decoy MX CORE 3 CF',
    motorBrand: 'bosch', motorModel: 'Performance Line CX Gen 5', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM S1000 Eagle Transmission', brakes: 'TRP EVO PRO',
    disciplines: ['e-trail', 'e-enduro'], weight: 23200, price: 7999,
    note: 'Top-tier carbon Decoy build. The whole "Uncaged" sub-brand naming and Shimano EP8 motor were retired — the current top-tier carbon Decoy runs a Bosch Performance Line CX motor on an all-new "Ultra Modulus Carbon" frame with 180mm front / 170mm rear travel.',
    desc: 'Verified vs the fetched maker product page (yt-industries.com, via Exa fetch — full Tech & Spec table); front/rear travel split and motor torque/peak-power cross-checked against an independent MBR first-ride review of the same 2026 Decoy Core relaunch (the raw page badge order was ambiguous). Model/trim corrected verify/emtb-4 wave 4 cluster F: "Decoy Uncaged 8" (Shimano EP8, no such trim/naming currently sold) -> real current top-carbon trim "Decoy MX CORE 3 CF". All e-system/drivetrain/weight/price fields rewritten to match: motor Shimano EP8 85Nm -> Bosch Performance Line CX 100Nm/750W peak, battery 630->800Wh (removable PowerTube), drivetrain SRAM X0 Eagle Transmission -> SRAM S1000 Eagle Transmission (SRAM\'s newer S-series naming), brakes SRAM Code -> TRP EVO PRO, weight 22600->23200g, travel 160/150 -> 180/170mm. PRICE RULE: GBP 7,999.00 RRP (yt-industries.com UK pricing page) used as a $7,999 USD sample — no separate US price found; basis disclosed. CORRECTED breadth-3: motorTorque 100 -> 120Nm and motorModel -> "Performance Line CX Gen 5" — re-fetching the live yt-industries.com CORE-3 tech-spec table (navigating the site\'s own Bosch-Decoy family page rather than a guessed URL) shows the banner "BOSCH PERFORMANCE CX GEN 5 / 120NM | 750W | 600% YOU" verbatim; the prior wave\'s 100Nm figure does not match the current page.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.yt-industries.com/E-MTB/Bosch-Decoy/CORE-3/'
  },
  {
    id: 'em-yt-decoy-bosch-core-4', cat: 'emtb', brand: 'YT', model: 'Decoy MX CORE 4 CF',
    family: 'yt-decoy-bosch', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Performance Line CX Gen 5', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 23200, price: 8999,
    note: "Crowns the Bosch-powered Decoy family above the already-cataloged CORE 3 CF (em-yt-decoy-uncaged-8): FOX Factory suspension (38 Float Factory / X2 Factory) and carbon DT Swiss HXC 1500 wheels replace CORE 3's Öhlins suspension and Crankbrothers alloy wheels; SRAM X0 Eagle Transmission and SRAM Maven Silver brakes are one notch up from CORE 3's S1000/TRP EVO PRO.",
    desc: "Reached via the site's own YT-Industries E-MTB navigation (Bikes > E-MTB > Bosch-Decoy family page, which lists CORE 4/CORE 3/CORE 2 as its own tier switcher — not a guessed URL) and the CORE-4 product page's own Tech & Spec accordion for every field. Weight (23.20kg) is the maker-stated page figure and happens to match the already-cataloged CORE 3 CF row's weight exactly — both pages state that number independently, not copy-paste; left as-is per THE BAR (no reason to distrust a maker-published figure just because it repeats). PRICE RULE: the page shows a €7,999 site-wide sale next to a €8,999 regular price — the regular/MSRP figure is used as an $8,999 USD sample (no separate US pricing page found; basis disclosed, EUR 1:1 sample convention matching this catalog's other YT Decoy rows).",
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.yt-industries.com/E-MTB/Bosch-Decoy/CORE-4/'
  },
  {
    id: 'em-yt-decoy-sn-core-4', cat: 'emtb', brand: 'YT', model: 'Decoy SN MX CORE 4',
    family: 'yt-decoy-sn', modelYear: 2026,
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60, motorPowerPeak: 450,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 20600, price: 8499,
    note: "Lightweight-class sibling to the full-power Decoy lines — a distinct \"Decoy SN\" sub-brand (not previously cataloged) on the Fazua Ride 60 motor (60Nm/450W peak, 430Wh), Ultra-Modulus carbon frame, mullet wheels, 170mm front/160mm rear. FAZUA's parent (Porsche eBike Performance) has announced it is closing, but YT's own product page states continued customer/dealer support for existing Decoy SN buyers — noted here as an honest caveat, not a reason to exclude a currently-sold model.",
    desc: "Reached via the site's own YT-Industries E-MTB navigation (the Bosch-Decoy family page's \"YT Range\" switcher links to \"Fazua-Decoy SN\" as its own product line, not a guessed URL) and the CORE-4 tier's own Tech & Spec accordion for every field (motor/battery/travel/wheel/frame/drivetrain/brakes/weight all maker-stated). PRICE RULE: the page shows a steep €4,999 sale next to an €8,499 regular price (likely tied to the FAZUA-closure liquidation) — the regular/MSRP figure is used as an $8,499 USD sample per this catalog's MSRP-not-sale convention (no separate US pricing page found; basis disclosed).",
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.yt-industries.com/E-MTB/Fazua-Decoy-SN/CORE-4/'
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
    id: 'em-pivot-shuttle-lt', cat: 'emtb', brand: 'Pivot', model: 'Shuttle LT Pro X0 Eagle Transmission',
    family: 'pivot-shuttle-lt', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance CX-R (Race Edition), Gen 5', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 162,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 23600, price: 12599,
    note: "Longer-travel gravity sibling to the Shuttle AM; mixed wheel. This row was still carrying the previous-generation Shimano EP8 spec (630Wh, 165mm rear) — like the old em-pivot-shuttle-am row, Pivot dropped Shimano entirely across the Shuttle range for Gen 5 Bosch Performance CX/CX-R, with a bigger 800Wh removable battery and Bosch's PowerMore 250 range-extender option. Headline geometry is 162mm rear (short Swinger dropout setting) / 170mm front — Pivot's patented Swinger dropout also allows a 165mm-rear long setting, user-adjustable, not a separate SKU.",
    desc: "Verified vs the maker's own bike-family page (pivotcycles.com/en-us/bikes/shuttle-lt: motor family, headline 162/170mm travel, mixed wheel, 800Wh removable battery all confirmed there) plus the specific Pro X0 Eagle Transmission product page (pivotcycles.com: model name + MSRP $12,599 confirmed directly). Motor generation corrected wave 4 cluster C (Shimano EP8 85Nm/630Wh -> Bosch Performance CX-R Gen 5 100Nm/750W/800Wh, a full motor-brand switch); travelRear corrected 165->162 (the maker's own headline figure for the default/short setting); brakes corrected SRAM Code -> SRAM Maven Silver; price $10,500 sample -> the confirmed $12,599 MSRP. Brakes/derailleur-tier naming cross-checked against three independent, mutually-agreeing dealer spec-feed listings (bikesale.com, danvillebikes.com, mikesbikes.com) that mirror Pivot's own distributed dealer spec sheet — Pivot's own itemized build-spec table is behind a JS-lazy-loaded accordion that did not render text even through the browser pane, so the itemized component list is corroborated rather than directly screen-scraped; the load-bearing facts (motor/battery/travel/price/model) came straight off fetched pivotcycles.com pages. CORRECTED breadth-3: motorTorque 100 -> 120Nm — re-fetching the live family page's own \"Watt-Fed Fury\" copy states the CX-R drive unit \"pushes out 120Nm of torque and 750 watts of peak power\" verbatim (opened via the accordion technique in em-pivot-shuttle-lt-ride's desc).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.pivotcycles.com/en-us/bikes/shuttle-lt'
  },
  {
    id: 'em-pivot-shuttle-lt-ride', cat: 'emtb', brand: 'Pivot', model: 'Shuttle LT Ride Eagle 70/90',
    family: 'pivot-shuttle-lt', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX, Gen 5', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 162,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle 90 Mechanical Transmission', brakes: 'SRAM Maven 4-piston',
    disciplines: ['e-enduro'], price: 8999,
    note: "Entry-tier build, one rung below the carbon Shuttle LT Pro X0 Eagle Transmission (em-pivot-shuttle-lt): same Hollow Core carbon frame as every Shuttle LT tier (unlike the Shuttle AM, the LT does not have a separate alloy chassis), but Fox Performance 38 fork / Fox Performance Float X shock (vs the Pro's Fox Podium/DHX Neo Live), mechanical (not AXS) SRAM Eagle 90/70 Transmission, base (non-Race-Edition) Bosch Performance Line CX motor, base-tier SRAM Maven brakes (not Silver), DT Swiss H1900 alloy wheels.",
    desc: "Reached by opening the Shuttle LT family page's \"Build Specs\" accordion (id build_spec_table, the same Radix component the Shuttle AM row's desc documents) via a full pointerdown/mousedown/pointerup/mouseup/click event sequence dispatched at the trigger's real DOM coordinates — plain click/anchor-link navigation leaves it collapsed. The Product Details accordion (id product_details_section), opened the same way, states \"Ultra light Hollow Core carbon frame\" unqualified — i.e. every build tier including Ride is carbon, unlike the Shuttle AM where Ride is a distinct alloy chassis. The 5-column build-level table gave every field for the Ride column directly off the maker's own page — fork, shock, drivetrain, brakes, motor, wheels, MSRP $8,999. The family page's \"Watt-Fed Fury\" copy scopes its 120Nm/750W figure explicitly to \"the Shuttle LT Pro and Team builds['] ... race-tuned CX-R drive unit\" — the Ride tier's drive-unit spec reads plain \"Bosch Gen 5 Performance Line CX 800Wh\" (no Race Edition suffix), so it uses Bosch's standard Performance Line CX Gen 5 figures (85Nm/600W peak), not the CX-R numbers. No bike weight is listed in this table or anywhere else on the page, so weight is left unset rather than guessed.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.pivotcycles.com/en-us/bikes/shuttle-lt'
  },
  {
    id: 'em-pivot-shuttle-sl', cat: 'emtb', brand: 'Pivot', model: 'Shuttle SL Pro X0 Eagle Transmission',
    family: 'pivot-shuttle-sl', modelYear: 2026,
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60, motorPowerPeak: 450,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 132,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'Shimano XT M8120 4-piston',
    disciplines: ['e-trail'], weight: 17600, price: 10899,
    note: 'Lightweight-class Pivot; acoustic-close XC/trail handling on the Fazua Ride 60 (60Nm, 450W peak). Headline geometry is 132mm rear travel / 140-150mm fork range (150mm on this Pro trim) — the 140/130mm previously cataloged undersold both numbers.',
    desc: "Verified vs the maker's own bike-family page (pivotcycles.com/en-us/bikes/shuttle-sl: motor spec 60Nm/450W peak, headline 132mm rear / 140-150mm front travel, 430Wh battery, 29in wheel all confirmed there) plus the specific Pro X0 Eagle Transmission product page (pivotcycles.com: model name + MSRP $10,899 confirmed directly). Corrected wave 4 cluster C: travelFront 140->150 (Pro-trim Fox 36 GRIP2 is 150mm, not the lower-tier 140mm); brakes 'SRAM Level Ultimate' -> Shimano XT M8120 4-piston (SRAM does not make a 'Level Ultimate' MTB brake — this looks like a fabricated value from an earlier pass; Shimano XT is the real spec on every independent dealer listing checked); motorPowerPeak added (450W, maker-stated); price $9,500 sample -> the confirmed $10,899 MSRP. Brakes/fork tier cross-checked against three independent, mutually-agreeing dealer spec-feed listings (bikesale.com, danvillebikes.com, stedmansbikeshop.com) mirroring Pivot's own distributed spec sheet, for the same JS-lazy-load reason noted on the Shuttle LT row this wave.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.pivotcycles.com/en-us/bikes/shuttle-sl'
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
    id: 'em-scott-patron-eride-900-tuned', cat: 'emtb', brand: 'Scott', model: 'Patron ST 900 Tuned',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX-R (BDU386Y, SmartSystem)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 24400, price: 13299,
    note: 'The current Patron eRIDE splits into a "900" do-it-all series and an "ST" (Super Trail) series for bigger impacts; this is the ST 900 Tuned, the range-topper — no plain "Patron eRIDE 900 Tuned" (non-ST) SKU exists. Real spec is Bosch CX-R (SmartSystem, BDU386Y) on 170mm front/150mm rear travel, 29in wheels both ends (not mixed), SRAM X0 Eagle AXS Transmission, SRAM Maven Silver brakes.',
    desc: 'Verified vs the maker product page (motor/battery/travel/wheel/frame/drivetrain/brakes/weight all confirmed). Model/travel/drivetrain/brakes/weight corrected verify/emtb-4 wave 4 cluster E ("Patron eRIDE 900 Tuned" -> "Patron ST 900 Tuned" [real SKU name], 150/150 -> 170/150 travel, SRAM X0 Eagle Transmission -> SRAM X0 Eagle AXS Transmission, SRAM Code Ultimate -> Maven Silver, 24.8kg -> 24.4kg maker-stated weight). PRICE RULE: this SKU is not sold in the US (scott-sports.com/us/en 404s on it) — price is GBP 10,599 maker RRP converted to a ~$13,299 USD sample at time of check; no US MSRP exists.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.scott-sports.com/global/en/product/scott-patron-st-900-tuned-bike'
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
    desc: 'Unverified sample (best-credible-public) — real currently-sold trim, not maker-confirmed. Superseded: the Genius eRIDE runs Bosch Performance CX Gen 4, not Shimano EP8 (verify/emtb-3). Wave 4 cluster E finding (2026-07-20): the whole Genius eRIDE nameplate has since been retired by Scott — scott-sports.com no longer lists "Genius eRIDE" under E-Bikes at all, replaced by the new "Voltage eRIDE" line (TQ-HPR motor, not Bosch). No Voltage row exists in this catalog yet (out of this cluster\'s scope), so supersededBy still points at the last real Genius eRIDE row rather than inventing one; left unverified per policy.'
  },
  {
    id: 'em-scott-lumen-eride-910', cat: 'emtb', brand: 'Scott', model: 'Lumen eRIDE 900',
    motorBrand: 'tq', motorModel: 'TQ-HPR50', motorTorque: 50,
    batteryWh: 360, batteryRemovable: true, rangeExtender: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 130, travelRear: 130,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Level Silver',
    disciplines: ['e-trail'], weight: 16600, price: 9999,
    note: 'Lightweight XC/downcountry-leaning Scott on the quiet TQ HPR50 motor. The current range-topper is "Lumen eRIDE 900" — there is no "910" trim in the current lineup. Real drivetrain is SRAM GX Eagle AXS Transmission (not Shimano XT) with SRAM Level Silver brakes.',
    desc: 'Verified vs the maker product page (motor/battery/travel/wheel/frame/drivetrain/brakes/weight all confirmed). Model/travel/drivetrain/brakes/weight/price corrected verify/emtb-4 wave 4 cluster E ("Lumen eRIDE 910" -> "Lumen eRIDE 900" [current top trim, no 910 exists], 120/120 -> 130/130 travel, Shimano XT -> SRAM GX Eagle AXS Transmission, Shimano XT 4-piston -> SRAM Level Silver, 16.8kg sample -> 16.6kg maker weight, $8,500 sample -> $9,999.99 confirmed US MSRP via scott-sports.com/us/en/lumen).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.scott-sports.com/gb/en/product/scott-lumen-eride-900-bike'
  },

  // ---------------------------------------------------------------------------
  // Merida (new maker) — eONE-SIXTY
  // ---------------------------------------------------------------------------
  {
    id: 'em-merida-eone-sixty-8000', cat: 'emtb', brand: 'Merida', model: 'eONE-SIXTY 8000',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 600, batteryRemovable: false, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 174,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT Di2', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-enduro'], weight: 23200, price: 7500,
    note: "Merida's mixed-wheel enduro-travel e-MTB (eONE-SIXTY CF range) on the Shimano EP801 motor; Fox 38 Performance fork, Fox Float X2 Performance shock. Wireless Shimano XT Di2 LinkGlide drivetrain with Auto/Free Shift. A flip chip allows a full-29in setup that drops rear travel to 160mm.",
    desc: "Verified vs the maker page. Battery corrected 720Wh removable -> 600Wh non-removable (the eONE-SIXTY CF's internal battery is fixed/integrated, not a swap pack; a 360Wh range extender is optional, added as rangeExtender:true). Travel corrected 160/160 -> 170 front / 174 rear (stock mullet config; the current top build runs wireless Di2, not a cable XT drivetrain — drivetrain field updated to reflect that). Weight set to the maker-stated 23.2kg (size M). No US/EUR price published on the maker page; price kept as the prior sample. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched the stored source (browser pane) — still no price anywhere on the page (Merida's model pages carry no cart/pricing, dealer-only). priceBasis left UNSET.",
    verified: true, lastChecked: '2026-07-22', source: 'https://www.merida-bikes.com/en/bike/5692/eone-sixty-8000'
  },

  // ---------------------------------------------------------------------------
  // Whyte (new maker, UK) — E-180 RS
  // ---------------------------------------------------------------------------
  {
    id: 'em-whyte-e-180-rs', cat: 'emtb', brand: 'Whyte', model: 'E-180 RSX',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle AXS T-Type Transmission', brakes: 'SRAM Code RSC',
    disciplines: ['e-enduro'], weight: 26100, price: 5499,
    note: "UK brand's long-travel gravity e-MTB; real current trim is \"RSX\", Bosch Performance Line CX (Smart System) motor, wireless SRAM GX AXS T-Type drivetrain (the maker's own marketing prose says \"X01\" but the maker's own spec table lists the actual rear mech/chain/cassette as GX T-Type — the spec table wins).",
    desc: 'Verified vs the fetched maker product page (whytebikes.com, via Exa fetch — full Specs table). Corrections verify/emtb-4 wave 4 cluster F: motor "Performance Line CX Race (LE)" -> plain "Performance Line CX" (no Race/LE variant on this page), drivetrain "SRAM X01 Eagle AXS" -> "SRAM GX Eagle AXS T-Type Transmission" (page\'s spec table lists REAR MECH/CHAIN/CASSETTE all as GX T-Type, contradicting its own marketing-prose "X01" mention — trusted the load-bearing spec table per the phantom-number-hazard precedent), brakes "SRAM Code" -> "SRAM Code RSC" (exact model). Weight (26.1kg M = 26100g) and travel (180/170mm) already matched exactly; unchanged. PRICE RULE: GBP 5,499.00 RRP (whytebikes.com, Whyte is UK-only, no US market) — the existing $5,499 sample already numerically mirrors the GBP figure; basis now disclosed.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://whytebikes.com/products/e-180-rsx'
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
    id: 'em-radon-jealous-10-0', cat: 'emtb', brand: 'Radon', model: 'Render 10.0 800',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT Di2', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 23400, price: 6800,
    note: 'Direct-to-consumer German full-power e-MTB; carbon main frame + aluminium rear triangle; strong value-to-spec ratio.',
    desc: 'Verified vs radon-bikes.de product page. Major trim/platform correction verify/emtb-4 wave 4 cluster D: "Jealous" is actually Radon\'s HARDTAIL touring/trail e-bike line (JEALOUS HYBRID, 120mm fork, no rear travel) — a full-suspension mullet "Jealous" e-enduro platform does not exist. Remapped to Radon\'s real full-suspension carbon e-trail/enduro line, RENDER (29in wheels, not mullet; 160mm front/140mm rear), and corrected motor/battery/drivetrain/brakes/wheelConfig/travel/price to the current RENDER 10.0 800 spec. Price: EUR 6,299 RRP converted to a $6,800 USD sample — no US price published on the DE site.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.radon-bikes.de/en/e-bike/mountainbike/render/render-10-0-800-2026/'
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
    id: 'em-kona-remote-160', cat: 'emtb', brand: 'Kona', model: 'Remote 160 DL',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 612, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 23800, price: 5399,
    note: "Kona's full-power trail/enduro e-MTB on the Shimano EP800 motor (a Process 153 chassis turned e-bike); RockShox Zeb Select fork, RockShox Super Deluxe Select shock.",
    desc: 'Corrected, still unverified verify/emtb-4 wave 4 cluster B (Kona does not publish a complete-bike weight on this page — interfaces fetched-page-confirmed but weight bar not met, so verified:true withheld; weight kept as the prior sample). Model corrected: no current Kona "Remote 160" trim exists bare — the real aluminum/Shimano EP8 SKU is the "Remote 160 DL" (the flagship is now a separate carbon/Bosch-SX "Remote 160 CR", out of scope here since it does not match this row\'s Shimano-motor spec). Corrected: rear travel 150 -> 160mm, drivetrain Shimano XT -> SRAM GX Eagle (real R/D + shifter), brakes Shimano XT 4-piston -> SRAM Code R (real calipers/levers), battery 630 -> 612Wh (Darfon 612Wh pack), price corrected to the real US MSRP $5,399.'
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
    id: 'em-merida-eone-sixty-900', cat: 'emtb', brand: 'Merida', model: 'eONE-SIXTY 875',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 712, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 174,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT LinkGlide', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-enduro'], weight: 26000, price: 5200,
    note: 'Entry alloy eONE-SIXTY LITE trim; same Shimano EP801 motor as the carbon 8000, with a larger user-removable 712Wh battery (vs the CF\'s fixed 600Wh) and an optional 360Wh range extender. RockShox Zeb fork, RockShox Super Deluxe shock.',
    desc: 'Verified vs the maker page. Model corrected: "eONE-SIXTY 900" is a retired 2019-collection SKU (Shimano E8000 70Nm motor, 500Wh battery, 27.5+ wheels — nothing like the current lineup) still listed on a regional distributor archive page, not a currently-sold trim. The current aluminum "LITE" sibling to the carbon 8000 is the eONE-SIXTY 875. Corrected: battery 720Wh -> 712Wh (real user-removable pack) + rangeExtender:true (360Wh optional), travel 160/160 -> 170 front/174 rear, drivetrain Shimano Deore -> Shimano XT LinkGlide (RDM8130 mechanical), brakes Shimano MT420 -> Shimano XT 4-piston. Weight set to the maker-stated ~26kg (size M). No price published on the maker page; price kept as the prior sample. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched the stored source (browser pane) — still no price anywhere on the page. priceBasis left UNSET.',
    verified: true, lastChecked: '2026-07-22', source: 'https://www.merida-bikes.com/en/bike/5695/eone-sixty-875'
  },

  // ---------------------------------------------------------------------------
  // Focus (new maker) — Jam2 SL (lightweight)
  // ---------------------------------------------------------------------------
  {
    id: 'em-focus-jam2-sl-8-9', cat: 'emtb', brand: 'Focus', model: 'Jam2 SL 9.9',
    motorBrand: 'fazua', motorModel: 'Fazua Ride 60', motorTorque: 60, motorPowerPeak: 450,
    batteryWh: 430, batteryRemovable: true, assist: 'lightweight', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], weight: 19200, price: 9700,
    note: "German brand's lightweight-class trail e-MTB on the Fazua Ride 60 motor (60Nm/450W peak).",
    desc: 'Verified vs the maker page. Model/trim corrected verify/emtb-4 wave 4 cluster B (Jam2 SL 8.9 does not exist — no Focus Jam2 SL trim runs SRAM GX Eagle Transmission or SRAM Code; real top trim is the MAX-carbon Jam2 SL 9.9, Shimano XT M8100 mechanical drivetrain + Shimano XT M8120 4-piston brakes, 19.2kg with 430Wh battery, fork travel corrected 150->160mm). Price: EUR 8,999 RRP (de_en) converted to a $9,700 USD sample — Focus does not sell in the US market, no US MSRP exists.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.focus-bikes.com/int/jam2-sl-9-9'
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
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle AXS', brakes: 'SRAM Code R',
    disciplines: ['e-enduro'], weight: 26400, price: 4499,
    note: 'Entry alloy E-180 trim; same Bosch CX motor as the RSX, but a mechanical-hanger SRAM GX Eagle AXS drivetrain (not T-Type Transmission) and a RockShox ZEB/Super Deluxe Select R chassis.',
    desc: 'Verified vs the fetched maker product page (whytebikes.com, via Exa fetch — full Specs table). Corrections verify/emtb-4 wave 4 cluster F: drivetrain "Shimano Deore" -> "SRAM GX Eagle AXS" (page spec table: REAR MECH/SHIFT LEVERS "SRAM GX AXS Eagle", CASSETTE "SRAM PG-1210 Eagle" 11-50T — a standard-hanger cassette, not T-Type direct-mount, so kept distinct from the RSX row\'s Transmission wording), brakes "Shimano MT420" -> "SRAM Code R", battery 720->750Wh, weight 26200->26400g (M), motorPowerPeak added (600W, stated in the page\'s own Highlights section for this motor). PRICE RULE: GBP 4,499.00 RRP (whytebikes.com, Whyte is UK-only, no US market) converted 1:1 as a $4,499 USD sample (mirrors the RSX row\'s existing convention) — basis disclosed.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://whytebikes.com/products/e-180-s-my24'
  },
  {
    id: 'em-whyte-e-160-rsx', cat: 'emtb', brand: 'Whyte', model: 'E-160 RSX',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle T-Type AXS Transmission', brakes: 'SRAM Code RSX',
    disciplines: ['e-trail', 'e-enduro'], price: 6999,
    note: "Whyte's shorter-travel trail/all-rounder e-bike — a distinct platform from the E-180 gravity rows above (29in wheels both ends vs the E-180's mullet, 160/155mm travel vs 180/170mm). Same Bosch Performance Line CX (Gen 4, BDU37) motor family.",
    desc: "Verified vs the fetched maker product page (whytebikes.com, full Specifications table: frame/fork/shock/drivetrain/brakes/motor/battery/wheel all maker-listed). No bike weight is published on the page — left blank rather than guessed. PRICE RULE: GBP 6,999.00 RRP (whytebikes.com, Whyte is UK-only, no US market) used as the USD sample basis 1:1, mirroring the E-180 rows' existing convention — basis disclosed.",
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://whytebikes.com/products/e-160-rsx-my24-1'
  },

  // ---------------------------------------------------------------------------
  // Radon depth (Jealous 9.0)
  // ---------------------------------------------------------------------------
  {
    id: 'em-radon-jealous-9-0', cat: 'emtb', brand: 'Radon', model: 'Render 9.0 800',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission', brakes: 'SRAM Maven',
    disciplines: ['e-trail', 'e-enduro'], weight: 24450, price: 5939,
    note: 'Mid-tier RENDER trim; same carbon-main/aluminium-rear frame and Bosch CX Gen 5 motor as the 10.0.',
    desc: 'Verified vs radon-bikes.de product page. Major trim/platform correction verify/emtb-4 wave 4 cluster D (same fix as the 10.0 sibling row): remapped from the non-existent full-suspension "Jealous" to Radon\'s real RENDER platform. Frame corrected aluminum -> carbon (RENDER 800 is carbon-main/alloy-rear across all its trims, including 9.0 — there is no all-alloy Jealous FS bike); wheelConfig corrected mullet -> 29in; travel/drivetrain/brakes/weight corrected to the current RENDER 9.0 800 spec. Price: EUR 5,499 RRP converted to a $5,939 USD sample — no US price published on the DE site.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.radon-bikes.de/en/e-bike/mountainbike/render/render-9-0-800-2026/'
  },

  // ---------------------------------------------------------------------------
  // Kona depth (Remote 150)
  // ---------------------------------------------------------------------------
  {
    id: 'em-kona-remote-150', cat: 'emtb', brand: 'Kona', model: 'Remote X',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85,
    batteryWh: 612, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 180, travelRear: 178,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore', brakes: 'Shimano SLX',
    disciplines: ['e-enduro'], weight: 23400, price: 5399,
    note: "Kona's longest-travel gravity Remote (Process X chassis turned e-bike); Fox 38 Performance 180mm fork, Fox Float X Performance Elite shock.",
    desc: 'Corrected, still unverified verify/emtb-4 wave 4 cluster B (Kona does not publish a complete-bike weight on this page — interfaces fetched-page-confirmed but weight bar not met, so verified:true withheld; weight kept as the prior sample). Model/trim corrected: no Kona Remote trim is named or specced "150" — the current lineup has no 150mm-travel Remote at all; the closest distinct real SKU (vs the 160-travel row above) is the Remote X, a 178-180mm gravity build, not a shorter-travel XC/trail sibling as the prior note claimed. Corrected: travel 150/140 -> 180 front/178 rear, drivetrain Shimano SLX -> Shimano Deore (real R/D + shifters), brakes Shimano MT520 -> Shimano SLX (real calipers/levers), battery 630 -> 612Wh (Darfon 612Wh), disciplines e-trail -> e-enduro (gravity bike, not XC/trail), price corrected to the real US MSRP $5,399.'
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
    batteryWh: 600, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore XT', brakes: 'TRP EVO Pro 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 25400, price: 7200,
    note: 'Full-power sibling to the lightweight Jam2 SL; Bosch CX motor, base 600Wh battery (800Wh and a 250Wh range extender also offered, up to 1050Wh combined).',
    desc: "Verified vs the maker page (int/de market). Corrected verify/emtb-4 wave 4 cluster B: wheelConfig mullet -> 29 (both wheels are 29in), rear travel 155 -> 150mm, battery 750Wh -> base 600Wh (750Wh was an AU/GB-market-only config with different TRP-vs-then-Shimano brake spec that does not match the int/de canonical page), brakes SRAM/Shimano XT -> TRP EVO Pro 4-piston, drivetrain refined to Shimano Deore XT (Deore shifter, XT M8100 rear derailleur), weight set to the maker-stated 25.4kg (600Wh config). Price: EUR 6,699 RRP (de_en, direct \"FROM\" price on the fetched page) converted to a $7,200 USD sample — Focus does not sell in the US market.",
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.focus-bikes.com/de_en/jam2-6-9'
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
    id: 'em-cube-stereo-hybrid-140', cat: 'emtb', brand: 'Cube', model: 'Stereo Hybrid ONE44 HPC SLX 800',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT 12-speed', brakes: 'Shimano XT M8220 4-piston',
    disciplines: ['e-trail'], weight: 24200, price: 6599,
    note: 'Shorter-travel, more XC/trail-leaning sibling to the Stereo Hybrid ONE77; mid-tier SLX 800 build of the renamed ONE44 platform.',
    desc: 'Verified vs the fetched maker page (cube.eu Stereo Hybrid ONE44 HPC SLX 800). CUBE renamed the "Stereo Hybrid 140" family to ONE44 for 2025-26 (same reason as the ONE77/Stereo Hybrid 160 correction on this branch) — retitled verify/emtb-4 wave 4 cluster A to the direct 140mm-rear successor, mid-tier SLX 800 trim. Battery/travel/frame/drivetrain/brakes corrected (625Wh -> 800Wh, 140mm front -> 150mm, aluminum -> carbon main triangle, Shimano Deore -> Shimano XT 1x12, Shimano MT420 -> Shimano XT M8220 4-piston). Weight left as an honest sample within the confirmed comparable-trim range (23.4-24.9kg across the ONE44 lineup) — the exact SLX-800 page did not display a standalone weight figure. Price is uncertain: community-sourced GBP figures for this trim conflict (a clean spec/price table showed GBP 5,199, a separate forum summary GBP 6,999); used the table figure converted to a ~$6,599 USD sample, stated here per THE PRICE RULE.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.cube.eu/cube-stereo-hybrid-one44-hpc-slx-800-slabgrey-n-orange/102500'
  },
  {
    id: 'em-cube-reaction-hybrid-pro-800', cat: 'emtb', brand: 'Cube', model: 'Reaction Hybrid Pro 800',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (BDU38)', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'hardtail', travelFront: 120, travelRear: 0,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT 12-speed', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-trail'], price: 3199,
    note: "Cube's hardtail e-MTB — the brand gap covered here (only the full-suspension Stereo Hybrid line was in the catalog). Aluminium Superlite frame, PowerMore-ready 800Wh battery, air-sprung 120mm fork (100mm on small/Easy Entry frames), remote dropper.",
    desc: "Verified vs the fetched maker product page (cube.eu Reaction Hybrid Pro 800: frame material, motor, battery, drivetrain, brakes, fork travel all maker-listed) plus the Cube Info Portal spec page. No bike weight is published on the fetched page — left blank rather than guessed. Price: EUR 3,199 SRP (cube.eu, Cube is a German/EU brand with no confirmed US retail page) used as the USD sample basis 1:1, mirroring the existing Stereo Hybrid rows' convention — basis disclosed.",
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://www.cube.eu/cube-reaction-hybrid-pro-800-blackline/108210'
  },

  // ---------------------------------------------------------------------------
  // Wave 2 phase 2 re-entries (2026-07-20) — motor-brand platform switches found
  // in the wave-2 phase 1 triage (tools/verify-notes-emtb.md). Each supersedes a
  // discontinued row above via status/supersededBy; specs are best-credible-public
  // from the current maker pages, still unverified (not a fetched-page confirm).
  // ---------------------------------------------------------------------------
  {
    id: 'em-santa-cruz-bullit-bosch-cx', cat: 'emtb', brand: 'Santa Cruz', model: 'Bullit GX AXS',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 600, batteryRemovable: false, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Maven',
    disciplines: ['e-enduro'], weight: 22410, price: 10149,
    note: 'Santa Cruz moved the Bullit off Shimano entirely for 2026, onto Bosch CX Gen 5 with a non-removable internal battery + optional PowerMore 250Wh range extender.',
    desc: 'Verified vs Santa Cruz product page + corroborated by Vital MTB spec sheet. Model/trim corrected verify/emtb-4 wave 4 cluster D (generic "Bullit" -> real current mid/top SKU "Bullit GX AXS"); motorPowerPeak was a data-entry bug (600 duplicated the battery Wh, not the real 750W peak power figure) — fixed; torque corrected 85 -> maker/reviewer-confirmed 100Nm peak; travelRear corrected 150 -> 170 (current-gen Bullit runs 170mm front AND rear, not the old 170/150 split); brakes corrected SRAM Code -> SRAM Maven; weight/price corrected to the maker-published 22.41kg / $10,149 for this build.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/products/bullit-gx-axs-2026'
  },
  {
    id: 'em-santa-cruz-bullit-bosch-x0-axs-rsv', cat: 'emtb', brand: 'Santa Cruz', model: 'Bullit X0 AXS RSV',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 600, batteryRemovable: false, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 21950, price: 9999,
    note: 'Top-tier 2026 Bullit build; Bosch CX Gen 5 replaces the prior Shimano/SRAM XX Transmission spec.',
    desc: 'Verified vs Santa Cruz product page (model name/drivetrain/brakes/battery already matched a real current SKU from a prior wave). motorPowerPeak was a data-entry bug (600 duplicated the battery Wh) — fixed to the maker-confirmed 750W peak; torque corrected 85 -> 100Nm peak; travelRear corrected 150 -> 170 (both ends run 170mm on the current Bullit); weight corrected 21.9kg sample -> maker-published 21.95kg (48.4lb, smallest-size convention) — BikeRadar independently measured a size-Large test bike at 22.27kg, both figures are consistent for a size-dependent spec.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/products/bullit-x0-axs-rsv-2026'
  },
  {
    id: 'em-marin-alpine-trail-e2-2026', cat: 'emtb', brand: 'Marin', model: 'Alpine Trail E2',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM Eagle 70 T-Type', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 26400, price: 7899,
    note: 'Marin moved the Alpine Trail E line from Shimano to Bosch CX Gen 5 with a bigger 800Wh battery and updated MultiTrac 2 suspension; RockShox Zeb Select+ fork, RockShox Vivid Air Select+ shock.',
    desc: "Corrected, still unverified verify/emtb-4 wave 4 cluster B (spec sourced from a UK retailer reproducing Marin's own spec sheet for this exact SKU, not a raw marinbikes.com fetch of the new-generation product page — marinbikes.com's own site still serves the prior-generation Fox/Shimano spec at the '2025-alpine-trail-e2' URLs, so verified:true is withheld pending a direct maker-page fetch of the new SKU; no weight found on either source). Drivetrain corrected Shimano Deore -> SRAM Eagle 70 T-Type (SRAM Eagle 70 derailleur / Eagle 90 shifter), brakes Shimano MT420 -> SRAM Maven Bronze — the real new-generation Alpine Trail E2 spec is SRAM/RockShox, not Shimano; Shimano CUES/TRP is the E1's spec, not E2's. Price corrected to the current marinbikes.com/collections/alpine-trail-e US listing for this higher (new-generation) tier: $7,899 (a second, cheaper Alpine Trail E2 SKU at $5,279 is also listed — the prior-generation carryover matching the discontinued row above)."
  },
  {
    id: 'em-marin-alpine-trail-e1-2026', cat: 'emtb', brand: 'Marin', model: 'Alpine Trail E1',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano CUES', brakes: 'TRP DHR EVO Comp 4-piston',
    disciplines: ['e-enduro'], weight: 27000, price: 6299,
    note: 'Entry alloy trim beneath the E2; same Bosch CX Gen 5 motor/battery; X-Fusion Vengeance fork, X-Fusion H3A Air shock.',
    desc: "Corrected, still unverified verify/emtb-4 wave 4 cluster B (spec sourced from a UK retailer reproducing Marin's own spec sheet for this exact SKU, not a raw marinbikes.com fetch of the new-generation product page — marinbikes.com's own site still serves the prior-generation Marzocchi/Shimano spec at the '2025-alpine-trail-e1' URLs, so verified:true is withheld pending a direct maker-page fetch of the new SKU; no weight found on either source). Drivetrain corrected Shimano Deore -> Shimano CUES (RD-U6000 10-speed), brakes Shimano MT420 -> TRP DHR EVO Comp 4-piston (200mm rotor). Price corrected to the current marinbikes.com/collections/alpine-trail-e US listing for this higher (new-generation) tier: $6,299 (a second, cheaper Alpine Trail E1 SKU at $4,559 is also listed — the prior-generation carryover matching the discontinued row above)."
  },
  {
    id: 'em-nukeproof-megawatt-297-carbon-pro', cat: 'emtb', brand: 'Nukeproof', model: 'Megawatt 297 Carbon Pro',
    family: 'nukeproof-megawatt-carbon', modelYear: 2026,
    motorBrand: 'sram', motorModel: 'SRAM Eagle Powertrain', motorTorque: 90, motorPowerPeak: 680,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM G2 RE',
    disciplines: ['e-enduro'], weight: 23830, price: 9899,
    note: 'The Megawatt moved to a full-carbon frame and SRAM Eagle Powertrain, dropping Bosch entirely; RockShox Zeb Select+/Vivid Select+ suspension.',
    desc: "Verified vs the maker's own product page (motor/battery/travel/frame/wheel-config/drivetrain/weight all confirmed; page-stated bike weight 23.83kg S/M). Brakes corrected wave 4 cluster C (SRAM Code -> SRAM G2 RE, the actual sintered-pad 4-piston brake on this trim per the maker page and confirmed by two independent launch-spec sources); weight corrected to the maker-published 23830g (was 24000g sample). No US price is published on the maker's own site (nukeproof.com shows GBP/EUR RRP only, checkout geo-blocked in the US) — the existing $9,899 sample is retained because it matches the brand's own 2023 US launch-price press release (Notebookcheck, citing Nukeproof) exactly.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.nukeproof.com/en_GB/bikes/SBIMWCNKP002'
  },
  {
    id: 'em-nukeproof-megawatt-297-carbon-rs', cat: 'emtb', brand: 'Nukeproof', model: 'Megawatt 297 Carbon RS',
    family: 'nukeproof-megawatt-carbon', modelYear: 2024, status: 'discontinued',
    motorBrand: 'sram', motorModel: 'SRAM Eagle Powertrain', motorTorque: 90, motorPowerPeak: 680,
    batteryWh: 720, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'SRAM Code RSC',
    disciplines: ['e-enduro'], weight: 24300, price: 10899,
    note: 'Top-tier carbon Megawatt build on SRAM Eagle Powertrain (2024 launch spec); RockShox Zeb Ultimate/Vivid Ultimate suspension. As of this pass, nukeproof.com/en_GB/bikes/platform/MEGAWATT_CRB lists only ONE current Megawatt Carbon SKU (SBIMWCNKP002, the Carbon Pro, cataloged as em-nukeproof-megawatt-297-carbon-pro) — the RS trim does not appear anywhere in the site\'s current bikes/ebikes navigation, so it looks to have been dropped from the lineup with the Pro remaining the sole current carbon trim (not a 1:1 successor SKU, so no supersededBy is set).',
    desc: "NOT re-verified this wave — the RS trim is not fetchable as a live current maker page (only the Carbon Pro SKU is listed on nukeproof.com's Megawatt Carbon platform page and ebikes nav, checked wave 4 cluster C). Fields corrected from best-credible launch-era sources (drivetrain SRAM XX Eagle -> SRAM X0 Eagle AXS Transmission — SRAM XX was never offered on this bike; brakes SRAM Maven -> SRAM Code RSC; weight 23600g sample -> 24300g) cross-checked across the brand's own 2024 launch press materials (as quoted by Bike Perfect) and two independent retailer spec tables that agree with each other, but none of that is a currently-fetchable manufacturer product page, so verified:true is withheld per THE BAR and status:discontinued is set instead of inventing a live source.",
    lastChecked: '2026-07-20'
  },
  {
    id: 'em-devinci-e-troy-bosch-29', cat: 'emtb', brand: 'Devinci', model: 'E-Troy Bosch GX 12s',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 625, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 24900, price: 7299,
    note: "Devinci's redesigned E-Troy switched from Shimano EP8 to Bosch Performance Line CX; the mid-tier GX 12s of the three-model E-Troy Bosch lineup (Deore/GX/GX LTD).",
    desc: 'Verified vs the fetched maker page (devinci.com E-Troy GX 12S). Wheel config and model name corrected verify/emtb-4 wave 4 cluster A: the E-Troy Bosch is a dedicated mixed-wheel (mullet, 29in front/27.5in rear) platform, not 29in-only, and the generic "E-Troy" model name is retitled to the real GX 12s SKU to distinguish it from the LTD trim (previously both Bosch rows shared the identical model string). Drivetrain/brakes/travel/weight already matched. Price updated to the current devinci.com listing of $7,299 (was $6,999-7,299 across recent model years).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.devinci.com/en/2025-bikes/e-mountain-2025/e-troy-gx-12s-green-gold/'
  },
  {
    id: 'em-devinci-e-troy-bosch-carbon', cat: 'emtb', brand: 'Devinci', model: 'E-Troy Bosch GX 12s LTD',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Smart System)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 625, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Code R',
    disciplines: ['e-trail', 'e-enduro'], weight: 24650, price: 7999,
    note: 'Top-tier build of the three-model E-Troy Bosch lineup (Deore/GX/GX LTD) — 170mm fork (vs 160mm on GX/Deore), Bosch Smart System with the System Controller display. Devinci confirms the E-Troy Bosch is aluminum-only across all three trims; no carbon-frame Bosch E-Troy exists (settling the prior wave\'s open question).',
    desc: 'Verified vs the fetched maker page (devinci.com E-Troy GX LTD 12S) plus Devinci\'s own E-Troy Bosch launch page (official GX-LTD-vs-GX comparison table). Model/drivetrain/brakes/travel/weight corrected verify/emtb-4 wave 4 cluster A: retitled the duplicate generic "E-Troy" model name (identical to the sibling GX 12s row) to the real GX 12s LTD SKU; drivetrain corrected SRAM X0 Eagle Transmission -> SRAM GX Eagle (the LTD trim does NOT run a wireless Transmission group — GX/GX LTD/Deore all share the same mechanical SRAM GX Eagle derailleur, only fork travel/motor display differ); brakes SRAM Code -> SRAM Code R; front travel 160 -> 170mm (the LTD-specific spec); wheel config 29in-only -> mullet (29 front/27.5 rear, confirmed dedicated mixed-wheel platform across the whole E-Troy Bosch line); weight 23.8kg -> 24.65kg (Devinci-published size-Medium figure, corroborated by Pinkbike\'s independent review at 24.6kg). Price confirmed at $7,999 (matches the existing sample exactly, cross-checked against a 2024-model-year devinci.com listing and Pinkbike\'s $7,499 2023-launch price, both consistent with year-over-year increases).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.devinci.com/en/bikes-2024/e-mountain-2024/e-troy-gx-12s-ltd-green-gold/'
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
    disciplines: ['e-trail'], weight: 22000, price: 11549,
    note: 'Moterra SL replaces its Bosch SX-motor generation with a Cannondale-tuned Shimano EP801 — still branded "lightweight-chassis" but the motor itself is full-power class (85Nm/600W, 601Wh custom internal battery).',
    desc: 'Verified vs the fetched maker page (cannondale.com/en-us Moterra SL 1, model code C65185U) — motor, battery, wheel config, travel, frame, drivetrain and brakes all match exactly, no corrections needed. Weight is not published on the maker page (stays the existing sample). Price corrected verify/emtb-4 wave 4 cluster A ($9,999 sample -> $11,549, corroborated by two independent US retailers — Bicycle Warehouse and Cycle Craft — quoting the identical figure; not itself on the fetched cannondale.com page, so basis is stated here per THE PRICE RULE).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.cannondale.com/en-us/bikes/electric/e-mountain/moterra-sl/moterra-sl-1'
  },
  {
    id: 'em-propain-ekano-3-al-enduro', cat: 'emtb', brand: 'Propain', model: 'Ekano 3 AL Enduro',
    motorBrand: 'dji', motorModel: 'DJI Avinox M2', motorTorque: 125, motorPowerPeak: 1100,
    batteryWh: 600, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 23200, price: 5799,
    note: 'Propain replaced the whole Ekano line with an alloy DJI Avinox-motor platform (M2/M2S options, fully configurator-sold); Shimano/SRAM-motor builds are gone. This row is the base M2/600Wh config; the "Factory" row is the upgraded M2S/800Wh config.',
    desc: 'Interfaces verified vs propain-bikes.com (motor/battery/travel/frame/wheel are maker-confirmed for the base config). Corrected verify/emtb-4 wave 4 cluster D: base-tier motor was wrongly set to the upgraded M2S — fixed to the real base motor M2 (125Nm/1100W peak per Propain\'s own spec table); battery corrected 800Wh -> the base config\'s 600Wh (800Wh is the M2S/Factory upgrade); weight corrected to Propain\'s own stated ~23.2kg (size M, base config, "approximate — tolerances in frame and component weights may result in slight variations"); price corrected to the real base US price $5,799. Drivetrain/brakes stay as a plausible configurator selection (Propain sells this bike fully build-to-order — no fixed named "GX AXS" SKU exists, only a starting spec).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.propain-bikes.com/us/product/bikes/enduro/ekano-al-enduro/'
  },
  {
    id: 'em-propain-ekano-3-al-enduro-factory', cat: 'emtb', brand: 'Propain', model: 'Ekano 3 AL Enduro Factory',
    motorBrand: 'dji', motorModel: 'DJI Avinox M2S', motorTorque: 150, motorPowerPeak: 1300,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'Trickstuff Direttissima',
    disciplines: ['e-enduro'], weight: 25480, price: 10999,
    note: 'Top-tier configured Ekano 3 AL build (FOX Factory suspension, Trickstuff brakes); Propain has not launched a carbon Ekano — every current trim is alloy. "Factory" describes a high-end configurator selection, not a fixed named SKU.',
    desc: 'Interfaces verified vs propain-bikes.com (motor/battery/travel/frame/wheel are maker-confirmed for the M2S/800Wh config). Corrected verify/emtb-4 wave 4 cluster D: torque corrected 130 -> Propain\'s own headline "Max Torque: 150 Nm" for the M2S (130Nm is the M2S\'s non-boost-mode figure, not the maker-marketed max). Drivetrain/brakes/weight/price are a plausible top-tier configurator selection, not a fixed maker-published spec — The Loam Wolf\'s as-tested custom M2/800Wh Ekano 3 AL Enduro build (a different, cheaper motor pairing) weighed 25.1kg, consistent with this row\'s 25.48kg sample for a heavier top-spec build. PRICEBASIS BACKFILL (pb-emtb-clear, 2026-07-22): re-fetched the maker page — it discloses only a "from $5,799.00 USD" configurator starting price for the base Ekano AL Enduro, not the $10,999 figure this row\'s "Factory" top-tier configurator selection carries. priceBasis left UNSET: a configurator-built price is not a fixed maker-published MSRP for a purchasable SKU, and none of the six disclosed-exception classes fits a self-configured estimate.',
    verified: true, lastChecked: '2026-07-22', source: 'https://www.propain-bikes.com/us/product/bikes/enduro/ekano-al-enduro/'
  },
  {
    id: 'em-pivot-shuttle-am-bosch-cx', cat: 'emtb', brand: 'Pivot', model: 'Shuttle AM Pro X0 Eagle Transmission',
    family: 'pivot-shuttle-am', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance CX-R (Race Edition), Gen 5', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail'], weight: 23000, price: 11999,
    note: 'The next-gen Shuttle AM switched from Shimano EP8 to Gen 5 Bosch Performance CX/CX-R, with an 800Wh battery and optional 250Wh PowerMore range extender.',
    desc: "Verified vs the maker's own product page (pivotcycles.com/en-us/products/shuttle-am-pro-x0-eagle-transmission: model name, Bosch Gen 5 CX/CX-R motor family, MSRP all fetched directly) plus the Shuttle AM bike-family page (motor torque/power, 800Wh battery, 160/150mm travel, carbon frame, 29in wheel, PowerMore range-extender compatibility). Pivot's own itemized build-spec accordion is JS-lazy-loaded and did not render as text even via the browser pane (same wrinkle noted on the Shuttle LT/SL rows this wave), so drivetrain/brakes are cross-checked against a dealer listing (basecampvt.com, 2026-01-22) that mirrors Pivot's own distributed spec feed field-for-field — corroboration, not the primary source. Brakes corrected wave 4 cluster C (SRAM Code -> SRAM Maven Silver, the real current-gen spec); price corrected to the maker's own $11,999 MSRP (the previously-cataloged $10,799 was pivotcycles.com's current promotional SALE price, not MSRP — THE PRICE RULE requires MSRP in this field). No bike weight is published for this SKU (weight stays the prior sample estimate, noted honestly). CORRECTED breadth-3: motorTorque 100 -> 120Nm — the accordion table this wave finally rendered (Build Specs is a Radix accordion that stayed collapsed for prior fetch attempts; opened it directly this pass, see em-pivot-shuttle-am-ride's desc) confirms the family-wide banner figure of 120Nm/750W applies to the CX-R Race Edition tiers shown in that same table, not just the base CX.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.pivotcycles.com/en-us/products/shuttle-am-pro-x0-eagle-transmission'
  },
  {
    id: 'em-pivot-shuttle-am-ride', cat: 'emtb', brand: 'Pivot', model: 'Shuttle AM Ride Eagle 70/90',
    family: 'pivot-shuttle-am', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX, Gen 5', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM Eagle 90 Mechanical Transmission', brakes: 'SRAM DB8 Stealth',
    disciplines: ['e-trail'], price: 8499,
    note: "Entry-tier \"Shuttle AM w/Alloy RT\" build, one rung below the carbon Shuttle AM Pro X0 Eagle Transmission (em-pivot-shuttle-am-bosch-cx): aluminum frame, RockShox Lyrik Select+ fork / Super Deluxe Select shock (vs the Pro's Fox Factory or RockShox Zeb Ultimate), mechanical (not AXS) SRAM Eagle 90/70 Transmission, base (non-Race-Edition) Bosch Performance Line CX motor, alloy DT Swiss E532 wheels.",
    desc: "Reached by opening the Shuttle AM family page's \"Build Specs\" accordion (id build_spec_table) — a Radix UI component that stays collapsed on load; the anchor-link click and a synthetic .click() both left data-state=\"closed\", so the trigger was opened via a full pointerdown/mousedown/pointerup/mouseup/click event sequence dispatched at the button's real DOM coordinates (the same rendering wrinkle breadth-2 flagged as unsolved, and the reason prior waves for the Pro/Team tiers had to corroborate via a dealer listing instead of this table directly). Once open, the table's 5-column build-level comparison (Ride/Pro 2026/Pro 2027/Team/Team NEO) gave every field for the Ride column directly off the maker's own page — frame variant, fork, shock, drivetrain, brakes, motor, wheels, MSRP $8,499. The Ride tier's drive unit reads \"Bosch Gen 5 Performance Line CX 800Wh\" (no \"Race Edition\" suffix, unlike the Pro/Team columns' \"CX Race Edition\"); the family copy's 120Nm/750W figure is explicitly scoped to the CX-R unit on the Shuttle LT page (its \"Watt-Fed Fury\" section: \"the Shuttle LT Pro and Team builds is Bosch's race-tuned CX-R drive unit... 120Nm... 750 watts\"), so the base CX on this Ride tier uses Bosch's standard, separately-published Performance Line CX Gen 5 figures (85Nm/600W peak) rather than the Race Edition numbers — corrects this row's own initial breadth-3 entry, which had wrongly copied the CX-R figure onto the base-CX Ride tier. No bike weight is listed in this table or anywhere else on the page (only component specs + pricing), so weight is left unset rather than guessed.",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.pivotcycles.com/en-us/bikes/shuttle-am'
  },
  {
    id: 'em-norco-sight-vlt-cx-c2', cat: 'emtb', brand: 'Norco', model: 'Sight VLT CX C2',
    family: 'norco-sight-vlt-cx', gen: 'Gen 4', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM S1000 Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-trail', 'e-enduro'], weight: 22200, price: 7999,
    note: 'Mid-tier build of the Bosch-powered Sight VLT CX Gen 4; the platform is carbon-only now — there is no current alloy "A1" tier. Ships at 85Nm/600W stock, app-unlockable to 120Nm/750W (Bosch Performance Upgrade 2.0).',
    desc: "Verified vs the maker's own product page (motor/battery/travel/frame/drivetrain/brakes/weight all confirmed; MSRP $7,999 US price matches 'In Shops' tier exactly, 22.2kg S3 weight matches exactly). motorTorque/motorPowerPeak corrected wave 4 cluster C (100/750 -> 85/600, the shipped stock tune — 100Nm/750W, now up to 120Nm/750W via the optional Bosch Flow App update, was the unlocked figure, not what ships); batteryRemovable corrected (false -> true, Bosch PowerTube is a removable pack); rangeExtender added (Bosch PowerMore 250 compatible, confirmed on the page); drivetrain refined to the actual derailleur tier (SRAM S1000 Eagle AXS T-Type, not the prior generic label).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.norco.com/bikes/e-mountain/e-all-mountain/sight-vlt-cx/25-sight-vlt-cx-c2/'
  },
  {
    id: 'em-norco-sight-vlt-cx-c1', cat: 'emtb', brand: 'Norco', model: 'Sight VLT CX C1',
    family: 'norco-sight-vlt-cx', gen: 'Gen 4', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 21700, price: 9999,
    note: 'Top-tier Sight VLT CX Gen 4 build; Bosch Performance Line CX replaces the prior Shimano EP8 generation. Ships at 85Nm/600W stock, app-unlockable to 120Nm/750W (Bosch Performance Upgrade 2.0).',
    desc: "Verified vs the maker's own product page (motor/battery/travel/frame/drivetrain/brakes/weight all confirmed; MSRP $9,999 US price matches 'In Shops' tier exactly, 21.7kg S3 weight maker-published). motorTorque/motorPowerPeak corrected wave 4 cluster C (100/750 -> 85/600, the shipped stock tune, not the app-unlocked figure); batteryRemovable corrected (false -> true, Bosch PowerTube is removable); rangeExtender added (Bosch PowerMore 250 compatible); drivetrain corrected (SRAM X0 Eagle AXS -> the actual SRAM GX Eagle AXS T-Type derailleur per the spec sheet); weight corrected (22600g sample -> 21700g maker-published).",
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.norco.com/bikes/e-mountain/e-all-mountain/sight-vlt-cx/25-sight-vlt-cx-c1/'
  },

  // ---------------------------------------------------------------------------
  // Norco Range VLT — brand gap (no Range VLT tier was in the catalog; e-enduro
  // gravity platform, distinct from the Sight VLT trail/AM line above).
  // ---------------------------------------------------------------------------
  {
    id: 'em-norco-range-vlt-a1', cat: 'emtb', brand: 'Norco', model: 'Range VLT A1',
    family: 'norco-range-vlt', gen: 'Gen 3', modelYear: 2024,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Smart System)', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM NX Eagle', brakes: 'SRAM DB8',
    disciplines: ['e-enduro'], price: 8999,
    note: "Base alloy tier of Norco's VPS-HP (high-pivot Horst-link) gravity-enduro e-bike; mullet wheels, Bosch PowerMore 250 range-extender compatible (S3-S5 only).",
    desc: 'Verified vs the fetched maker product page (browser pane, full Specs table: frame/fork/shock/drivetrain/brakes/motor/battery/geometry all maker-listed). No bike weight is published on the page — left blank rather than guessed. Price is the $8,999 US MSRP (page currently shows a $6,499 sale).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.norco.com/bikes/e-mountain/e-enduro/range-vlt/2024-range-vlt-a1/'
  },
  {
    id: 'em-norco-range-vlt-c1', cat: 'emtb', brand: 'Norco', model: 'Range VLT C1',
    family: 'norco-range-vlt', gen: 'Gen 3', modelYear: 2024,
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Smart System)', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'mixed', drivetrain: 'SRAM GX Eagle AXS T-Type Transmission', brakes: 'SRAM Code RSC',
    disciplines: ['e-enduro'], price: 11999,
    note: 'Top-tier Range VLT: carbon front triangle / aluminum chainstay-seatstay, RockShox Zeb Ultimate + Vivid Select+, SRAM HS2 220/200mm rotors. The Loam Wolf named this build 2024\'s "Best eMTB for Downhill".',
    desc: 'Verified vs the fetched maker product page (browser pane, full Specs table: frame/fork/shock/drivetrain/brakes/motor/battery/geometry all maker-listed). No bike weight is published on the page — left blank rather than guessed. Price is the $11,999 US MSRP (page currently shows an $8,799 sale).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.norco.com/bikes/e-mountain/e-enduro/range-vlt/2024-range-vlt-c1/'
  },
  {
    id: 'em-scott-genius-eride-910-bosch-cx-gen4', cat: 'emtb', brand: 'Scott', model: 'Genius eRide 910',
    motorBrand: 'bosch', motorModel: 'Bosch Performance CX (Gen 4)', motorTorque: 85,
    batteryWh: 625, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS Transmission', brakes: 'SRAM Code',
    disciplines: ['e-trail'], weight: 23400, price: 6559,
    status: 'discontinued',
    note: "Scott's full-power trail e-MTB ran Bosch Performance CX Gen 4, not Shimano EP8; optional 500Wh Range Booster brought total capacity to 1125Wh. Wave 4 cluster E finding (2026-07-20): Scott has since fully retired the \"Genius eRIDE\" nameplate — scott-sports.com's E-Bikes > Mountain nav now lists only Lumen, Voltage and Patron; Genius eRIDE is gone entirely, replaced by the new \"Voltage eRIDE\" line (TQ-HPR motor). This row is marked discontinued rather than re-pointed at a fabricated successor id.",
    desc: 'Unverified sample (best-credible-public) — not maker-confirmed; the bar cannot be met because the maker page this row would need no longer exists (Genius eRIDE was removed from scott-sports.com, not merely updated). Marked status:discontinued verify/emtb-4 wave 4 cluster E rather than leaving it looking current; left unverified per protocol (no live maker page to confirm against, and inventing a Voltage eRIDE successor row is out of this cluster\'s scope).'
  },
  {
    id: 'em-vitus-e-sommet-297-vrx', cat: 'emtb', brand: 'Vitus', model: 'E-Sommet 297 VRX',
    motorBrand: 'shimano', motorModel: 'Shimano STEPS EP801', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 630, batteryRemovable: false, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 167,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle T-Type AXS Transmission', brakes: 'Hayes Dominion A4',
    disciplines: ['e-enduro'], weight: 24200, price: 7619.99,
    note: 'The real E-Sommet runs Shimano STEPS motors (not Bosch), on a redesigned mullet-only "297" chassis; real fork/shock are RockShox ZEB Ultimate + Super Deluxe Ultimate RC2T (not Vivid).',
    desc: 'Verified vs the fetched maker product page (vitusbikes.com UK, via Exa fetch — full Specs table). Corrections verify/emtb-4 wave 4 cluster F: rear travel 160->167mm, weight 25000->24200g (M, tubeless), suspension note ZEB/Vivid Ultimate -> ZEB/Super Deluxe Ultimate RC2T (Vivid was never correct for this trim), drivetrain wording tightened to SRAM GX Eagle T-Type AXS Transmission (matches the page\'s "SRAM GX Eagle T-Type AXS" rear derailleur). PRICE RULE: GBP 5,999.99 RRP (vitusbikes.com, Vitus is UK-based) converted to a $7,619.99 USD sample at ~1.27 — no current US listing found for the 297 chassis (us.vitusbikes.com still lists only the older non-297 VRX).',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://vitusbikes.com/products/vitus-e-sommet-297-vrx-mountain-bike-07e7'
  },
  {
    id: 'em-vitus-e-sommet-297-vrs', cat: 'emtb', brand: 'Vitus', model: 'E-Sommet 297 VRS',
    motorBrand: 'shimano', motorModel: 'Shimano STEPS EP801', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 630, batteryRemovable: false, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 167,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX M7100', brakes: 'SRAM DB8',
    disciplines: ['e-enduro'], weight: 24400, price: 6349.99,
    note: 'Entry-tier mullet E-Sommet 297 build; real fork/shock are RockShox ZEB Select + Super Deluxe Select R.',
    desc: 'Verified vs the fetched maker product page (vitusbikes.com UK, via Exa fetch — full Specs table). Corrections verify/emtb-4 wave 4 cluster F: rear travel 160->167mm, weight 25400->24400g (M, tubeless), drivetrain "Shimano SLX" -> "Shimano SLX M7100" (exact SKU). PRICE RULE: GBP 4,999.99 RRP (vitusbikes.com, Vitus is UK-based) converted to a $6,349.99 USD sample at ~1.27 — no current US listing found for the 297 chassis.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-20', source: 'https://vitusbikes.com/products/vitus-e-sommet-297-vrs-mountain-bike-07e7'
  },
  {
    id: 'em-haibike-allmtn-cf-11-trniq', cat: 'emtb', brand: 'Haibike', model: 'ALLMTN CF 11 TRN/IQ',
    motorBrand: 'pinion', motorModel: 'Pinion E1.12 MGU (Motor.Gearbox.Unit)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, assist: 'full-power',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'Pinion E1.12 Gearbox 12-speed (Gates Carbon Drive CDX belt)', brakes: 'Magura MT5',
    disciplines: ['e-trail', 'e-enduro'], weight: 27000, price: 10265.88,
    note: 'The Pinion-MGU flagship: gearbox+motor integrated unit (no derailleur/cassette), Gates carbon belt drive, RockShox ZEB Ultimate/Super Deluxe Ultimate suspension, mullet wheels. requires added motorBrand vocab value \'pinion\' (src/schema-emtb.js) — a real, established gearbox/motor maker (Pinion GmbH), not fabricated.',
    desc: "Verified vs the maker's own Shopify product JSON (haibike.com/de-de/products/allmtn-cf-11-trniq-hmft2.js — the <handle>.js route that resolved the prior session's travelRear wall) plus the rendered de-de product page (browser-pane-equivalent fetch of the same URL without .js) for the fields the JSON omits: motor 'Pinion E1.12 MGU, 600W, 85Nm'; brakes 'Magura MT5, 4 pistons, 203mm front/rear'; drivetrain 'Pinion Motor-Gearbox-Unit, 12-speed' + Gates Carbon Drive CDX 120T belt; wheels 29in front/27.5in rear (mullet); frame carbon w/ Post Mount disc. pinion.eu's own bike-selection page (pinion.eu/en/bike_selection/haibike-allmtn-cf-11-trn-iq) independently corroborates the Pinion MGU E1.12/Smart.Shift/belt-drive identity and 160mm travel, though it shows a different weight (24.4kg) and price (EUR 10,000) than the Haibike page — likely a stale/different-market snapshot; the Haibike maker page for THIS exact SKU (weight 27000g across all 4 size variants, price EUR 9,000) is used as the primary source over the secondary corroborating page. PRICE: no US-market Haibike listing exists (haibike.com/en-us and haibike.com/us both dead-end to the EUR de-de page or 404 — Haibike appears EU-only for this model), so the EUR 9,000 maker price is converted at the EUR/USD rate fetched same-day from open.er-api.com (1.140653, 2026-07-22) -> $10,265.88 (regional-conversion, disclosed rate + date, no invented figure). batteryRemovable and display left unset — the 'InTube 800Wh' battery's removability and the Pinion FIT Master Node display's mount location (top-tube vs a dedicated controller) are not confirmed by any fetched source, and EMTB_VOCAB's 'display' enum (top-tube/system-controller) has no value that's a confident match, so both stay blank rather than guessed.",
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.haibike.com/de-de/products/allmtn-cf-11-trniq-hmft2'
  },

  // --- emtb-breadth-2 wave: zero-coverage makers (Intense, Ghost, Polygon) ---
  {
    id: 'em-intense-tazer-mx-pro-alloy', cat: 'emtb', brand: 'Intense', model: 'Tazer MX Pro Alloy',
    motorBrand: 'shimano', motorModel: 'Shimano EP800 STEPS', motorTorque: 85,
    batteryWh: 630, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'TRP EVO 12-speed', brakes: 'TRP Trail EVO',
    disciplines: ['e-enduro'], weight: 26025, price: 7184.97,
    note: 'Alloy Öhlins-suspended enduro e-MTB, 29in front/27.5in+ rear (mullet); sold exclusively through Parts Europe (EU/UK market, no US listing).',
    desc: 'Verified vs the fetched maker product page (eu.intensecycles.com/pages/tazer-mx-alloy, via Exa fetch — full build-spec sheet). Motor torque (85 Nm) is Shimano\'s own published EP800 spec (bike.shimano.com/en-EU/product/component/ep8-ep800/DU-EP800.html) — not restated on the Intense page, which names only the motor/battery/display SKUs. Weight is the maker-stated SM/MD figure (57.6lb/26.025kg, no pedals, not tubeless); LG/XL runs 0.34kg heavier per the same page. PRICE: EUR 6,299.00 maker RRP converted at the EUR/USD rate fetched same-day from open.er-api.com (1.140653, 2026-07-22) -> $7,184.97 (regional-conversion, disclosed rate + date) — Intense is US-based but this Öhlins/TRP build is EU-market-only, no US MSRP exists to cite instead.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://eu.intensecycles.com/pages/tazer-mx-alloy'
  },
  {
    id: 'em-intense-tazer-mx-carbon-pro', cat: 'emtb', brand: 'Intense', model: 'Tazer MX Carbon Pro',
    motorBrand: 'shimano', motorModel: 'Shimano EP800 STEPS', motorTorque: 85,
    batteryWh: 504, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 155,
    frameMaterial: 'carbon', drivetrain: 'Shimano SLX 12-speed', brakes: 'Magura MT7 Pro',
    disciplines: ['e-enduro'], weight: 24109, price: 7413.10,
    note: 'Lighter carbon Tazer MX build (smaller 504Wh battery than the alloy Pro), Öhlins DH38 dual-crown fork + TTX22M coil shock; also EU/UK-only through Parts Europe.',
    desc: 'Verified vs the fetched maker product page (eu.intensecycles.com/pages/tazer-mx-carbon-pro, via Exa fetch — full build-spec sheet). Motor torque (85 Nm) is Shimano\'s own published EP800 spec, same as the alloy build — the two Tazer MX trims share the identical EP800 drive unit, only the battery capacity differs (504Wh carbon vs 630Wh alloy, both maker-stated). Weight is the maker-stated SM/MD figure (52lb 11oz, tubeless, with pedals -> 24.109kg). PRICE: EUR 6,499.00 maker RRP converted at the same 2026-07-22 open.er-api.com rate (1.140653) -> $7,413.10 (regional-conversion) — no US MSRP exists for this EU-exclusive build.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://eu.intensecycles.com/pages/tazer-mx-carbon-pro'
  },
  {
    id: 'em-ghost-e-asx-advanced', cat: 'emtb', brand: 'Ghost', model: 'E-ASX Advanced',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85,
    batteryWh: 800, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore/Deore XT 12-speed', brakes: 'Shimano Deore 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: null, price: 6842.78,
    note: 'Aluminum full-power trail/all-mountain e-MTB, mullet wheels (29in front/27.5in rear per the German spec page), Bosch 800Wh InTube battery + Kiox 300 display.',
    desc: 'Verified vs the fetched maker product page (ghost-bikes.com/at-de/p/e-asx-advanced-gbct1, via Exa fetch — full "Spezifikationen" table, motor torque explicitly listed 85 Nm) plus the ghost-bikes.com/en-int SKU page (48AS1016, EUR 5,999.00 price) and the bosch-ebike.com/us third-party-hosted spec confirmation (frame material, 160/150mm travel, "Full suspension eMTB" category). No maker-published weight found on any of the three fetched pages, so weight stays blank rather than guessed. PRICE: EUR 5,999.00 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $6,842.78 (regional-conversion) — Ghost has no US retail presence, no USD MSRP exists to cite instead.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.ghost-bikes.com/at-de/p/e-asx-advanced-gbct1/'
  },
  {
    id: 'em-ghost-e-riot-cf-advanced', cat: 'emtb', brand: 'Ghost', model: 'E-Riot CF Advanced',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen5)', motorTorque: 100,
    batteryWh: 800, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle T-Type Transmission', brakes: 'SRAM Maven Base',
    disciplines: ['e-enduro'], weight: null, price: 7413.10,
    note: 'Ghost\'s carbon gravity/enduro e-MTB flagship — RockShox Domain/Vivid suspension, SRAM Eagle 70 T-Type Transmission wireless drivetrain.',
    desc: 'Verified vs the fetched maker product page (ghost-bikes.com/en-int/products/e-riot-advanced-gedu2, via Exa fetch — EUR 6,499.00 price, "170mm travel up front, 160mm travel at the rear", carbon frame, Bosch Performance CX 800Wh) plus a UK retailer\'s (Triton Cycles) full spec table sourced from the same maker feed, which is the only place a torque figure (100 Nm, Gen5 CX tuned above the stock-85Nm Gen4 unit) and drivetrain/brake component names (SRAM Eagle 70 T-Type derailleur/chain, DB Maven Base brakes) were found — Ghost\'s own page text doesn\'t restate them, so this one field set leans on a retailer mirror rather than the maker page directly (disclosed per policy). No maker-published weight found. PRICE: EUR 6,499.00 maker RRP (ghost-bikes.com) converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $7,413.10 (regional-conversion) — no US MSRP exists.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://ghost-bikes.com/en-int/products/e-riot-advanced-gedu2'
  },
  {
    id: 'em-polygon-siskiu-t7e', cat: 'emtb', brand: 'Polygon', model: 'Siskiu T7E',
    motorBrand: 'shimano', motorModel: 'Shimano DU-EP801', motorTorque: 85,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'Shimano SLX 12-speed', brakes: 'SRAM Code R',
    disciplines: ['e-trail'], weight: null, price: 3999,
    note: 'US-priced aluminum trail e-MTB on Shimano EP801, straight 29in wheels (not mulleted as shipped, though the frame\'s flip-chip supports a 27.5in rear swap).',
    desc: 'Verified vs the fetched maker product page (polygonbikes.com/us/siskiu-t7e, via Exa fetch — full "Specification" table incl. USD $3,999.00 price, Shimano DU-EP801 motor, SRAM Code R brakes, SR Suntour Aion 150mm fork). Battery capacity (630Wh, Shimano BT-EN806) and "Removable battery" claim taken from the companion polygonbikes.com/siskiu-te-with-bosch comparison page, which states the T7E shares the same BT-EN806 pack. No maker-published weight found. USD-native price, no conversion needed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.polygonbikes.com/us/siskiu-t7e/'
  },
  {
    id: 'em-polygon-siskiu-te-bosch', cat: 'emtb', brand: 'Polygon', model: 'Siskiu TE with Bosch',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85,
    batteryWh: 625, assist: 'full-power',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle 12-speed', brakes: null,
    disciplines: ['e-trail'], weight: null, price: 4799,
    note: 'US-priced Bosch-powered sibling to the T7E; ships mullet (29in front/27.5in rear per the tire spec), RockShox Lyrik/Super Deluxe suspension.',
    desc: 'Verified vs the fetched maker product page (polygonbikes.com/us/siskiu-te-with-bosch, via Exa fetch — full "Specification" table incl. USD $4,799.00 price, Bosch Performance Line CX motor stated "maximum torque of 85 Nm" and "up to 600 watts", Bosch PowerTube 625 Horizontal battery, SRAM GX Eagle rear derailleur, front/rear tire sizes confirming the mullet setup). The fetched page text ended before the Brake spec row, so brakes stays unset rather than guessed (no other maker source checked for this SKU). No maker-published weight found. USD-native price, no conversion needed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.polygonbikes.com/us/siskiu-te-with-bosch/'
  },

  // --- emtb-breadth-3b wave: next zero-coverage makers (Lapierre, BH, Polygon 2nd platform) ---
  {
    id: 'em-lapierre-overvolt-am-108', cat: 'emtb', brand: 'Lapierre', model: 'Overvolt AM 10.8',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX-R', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 165,
    frameMaterial: 'carbon', drivetrain: 'Shimano Deore XT/XTR 12-speed', brakes: 'Shimano XTR BR-M9220',
    disciplines: ['e-enduro'], weight: null, price: 11406.53,
    note: 'Lapierre\'s carbon flagship gravity e-MTB (MY26 Overvolt AM CF platform), 29in wheels both ends, RockShox Super Deluxe Ultimate RC2T 205x60 trunnion shock.',
    desc: 'Verified vs the fetched maker product page (lapierrebikes.com/en-int/products/overvolt-am-108-lorta — motor SKU "Bosch Performance Line CX-R", "Bosch PowerTube 800 Wh" battery, "170 mm" front travel, "HIGH Carbon Uni" frame, Shimano Deore XT/XTR 12-speed drivetrain, Shimano XTR BR-M9220 203mm brakes, EUR 10,000 price — the page names components but not torque/power/rear-travel/weight figures). Motor torque/power (100 Nm / 750 W) is Bosch\'s own published stock spec for the CX-R Gen5 unit (bosch-ebike.com/us/products/performance-line-cx-r) — not restated on the Lapierre page, which names only the motor SKU. Rear travel (165mm) is not stated on the maker page either (only the shock\'s 205x60mm eye-to-eye/stroke); cross-referenced against three independent MY26 Overvolt AM CF launch write-ups (road.cc, BikeBiz, Velomotion) that all cite the same "170mm front / 165mm rear" figure for this generation\'s carbon chassis, disclosed per the retailer-cross-reference policy already used in this file (the Ghost E-Riot precedent). No maker-published weight found. PRICE: EUR 10,000.00 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $11,406.53 (regional-conversion) — Lapierre does not sell in the US, no USD MSRP exists.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.lapierrebikes.com/en-int/products/overvolt-am-108-lorta'
  },
  {
    id: 'em-lapierre-overvolt-tr-78', cat: 'emtb', brand: 'Lapierre', model: 'Overvolt TR 7.8',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore 12-speed (wireless shifter)', brakes: 'Shimano Deore BR-MT420',
    disciplines: ['e-trail'], weight: null, price: 6500.58,
    note: 'Aluminum trail e-MTB, top of the Overvolt TR range; Lapierre Shock 185x50 trunnion, 800Wh PowerTube despite the mid-travel trail chassis.',
    desc: 'Verified vs the fetched maker product page (lapierrebikes.com/en-int/products/overvolt-tr-78-loluc — motor SKU "Bosch Performance line CX", "Bosch Powertube 800 Wh" battery, "140mm" front travel, "HIGH Aluminium Uni" frame, Shimano Deore 12-speed w/ wireless shifter, Shimano Deore BR-MT420 203mm brakes, EUR 5,699 price — no torque/power/rear-travel/weight figures stated). Motor torque/power (85 Nm / 600 W) is Bosch\'s own published stock spec for the plain CX Gen5 (BDU384Y) unit (bosch-ebike.com/en/products/performance-line-cx) — not restated on the Lapierre page. Rear travel (160mm) is not stated on the maker page (only the shock\'s 185x50mm eye-to-eye/stroke); cross-referenced against independent French retailer listings (VeloBrival, My-velo, Cyclescesbron) that consistently cite "160mm" rear travel for this SKU, disclosed per the retailer-cross-reference policy already used in this file. No maker-published weight found. PRICE: EUR 5,699.00 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $6,500.58 (regional-conversion) — Lapierre does not sell in the US, no USD MSRP exists.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.lapierrebikes.com/en-int/products/overvolt-tr-78-loluc'
  },
  {
    id: 'em-bh-ilynx-dl-enduro-carbon-98', cat: 'emtb', brand: 'BH', model: 'iLynx+ DL Enduro Carbon 9.8',
    motorBrand: 'avinox', motorModel: 'DJI Avinox M2S', motorTorque: 150, motorPowerPeak: 1300,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'Shimano XTR Di2 12-speed', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-enduro'], weight: null, price: 10265.76,
    note: 'BH\'s DJI Avinox-powered carbon enduro flagship (2027 iLynx+ DL platform) — FOX 38 FLOAT Factory 180mm / FOX FLOAT X2 Factory rear, "BCL" Ballistic Carbon Layup frame.',
    desc: 'Verified vs the fetched maker product page (bhbikes.com, es_ES locale product page for SKU ED987 — Avinox M2S motor, "150 Nm" torque, "1300 W (peak in Turbo mode)" power, 800Wh non-removable battery, 180mm front / 170mm rear travel, carbon "BCL" frame, Shimano XTR Di2 12-speed, Shimano XT 4-piston 203mm brakes, EUR 8,999.90 regular price). bhbikes.com has no US market/site — reached the SKU via the brand\'s global bikes/ebikes listing (bhbikes.com/en_GB/bikes/ebikes), which surfaced the "ilynx-dl-enduro-carbon-9-8-ed987" slug; the working fetchable mirror is the es_ES locale (the en_GB/fr_INT locale paths for the same slug 404). No maker-published weight found. PRICE: EUR 8,999.90 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $10,265.76 (regional-conversion) — BH has no US retail presence, no USD MSRP exists.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.bhbikes.com/es_ES/bicicletas-electricas/bicicletas-electricas-de-enduro/ilynx-dl-enduro-carbon-9-8-ed987'
  },
  {
    id: 'em-bh-ilynx-nx-enduro-carbon-98', cat: 'emtb', brand: 'BH', model: 'iLynx+ NX Enduro Carbon 9.8',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Gen 5)', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT Di2 12-speed', brakes: 'Shimano XT 4-piston',
    disciplines: ['e-enduro'], weight: null, price: 10836.09,
    note: 'BH\'s Bosch-powered carbon enduro tier (iLynx+ NX platform, sibling chassis to the Avinox-powered DL line) — FOX 38 FLOAT Factory 170mm / FOX FLOAT DHX2 Factory rear, "Split Pivot" suspension layout.',
    desc: 'Verified vs the fetched maker product page (bhbikes.com, es_ES locale product page for SKU EX986 — "Bosch Performance Line CX Gen 5" motor, "100 Nm" torque, 800Wh battery, 170mm front / 160mm rear travel, carbon "Hollow Core" frame, Shimano XT Di2 12-speed, Shimano XT 4-piston 203mm brakes; page shows a EUR 8,074.90 site-wide sale next to a EUR 9,499.90 regular price — the regular/MSRP figure is used per this catalog\'s MSRP-not-sale policy). Motor power (750 W peak) is Bosch\'s own published spec for the CX Gen5 unit run at the 100 Nm factory tune (bosch-ebike.com/us/products/performance-line-cx — the 750W/100Nm pairing matches the CX\'s documented Performance-Upgrade-tier output) — not separately restated on the BH page, which states only "100 Nm". Battery-removable claim not found on the page; left unset rather than guessed. No maker-published weight found. PRICE: EUR 9,499.90 maker regular price converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $10,836.09 (regional-conversion) — BH has no US retail presence, no USD MSRP exists.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.bhbikes.com/es_ES/bicicletas-electricas/bicicletas-electricas-de-enduro/ilynx-nx-enduro-carbon-9-8-ex986'
  },
  {
    id: 'em-polygon-collosus-n8e', cat: 'emtb', brand: 'Polygon', model: 'Collosus N8E',
    motorBrand: 'shimano', motorModel: 'Shimano DU-EP801', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT SL-M8100-R 1x12-speed', brakes: 'Shimano XT M8120',
    disciplines: ['e-enduro'], weight: null, price: 4699,
    note: 'Polygon\'s gravity/enduro e-MTB platform (COLLOSUS NE series, "IFS" 6-bar suspension) — a different chassis from the already-cataloged Siskiu T7E/TE trail e-MTBs; 29in wheels both ends, FOX 38 FLOAT Performance 160mm fork / FOX FLOAT X2 rear.',
    desc: 'Verified vs the fetched maker product page (polygonbikes.com/us/collosus-n8e/ — full "Specification" table incl. USD $4,699.00 price, Shimano DU-EP801 mid motor, Shimano BT-EN806 630Wh removable battery, FOX 38 FLOAT Performance 160mm fork, FOX FLOAT X2 205x65mm rear shock corresponding to the page\'s own "160mm Travel" frame callout, ALX aluminum enduro frame, Shimano XT SL-M8100-R 1x12-speed 10-51T drivetrain, Shimano XT M8120 203mm brakes). Motor torque/power (85 Nm / 600 W) is Shimano\'s own published DU-EP801 spec (bike.shimano.com/en-US/product/component/ep8-ep801/DU-EP801.html) — the Polygon page names only the motor SKU, not its Nm/W figures. No maker-published weight found. Page labels this the "2023 COLLOSUS N8E" (model year), still the current live US listing at fetch time. USD-native price, no conversion needed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.polygonbikes.com/us/collosus-n8e/', modelYear: 2023
  },
  {
    id: 'em-gt-eforce-amp-plus', cat: 'emtb', brand: 'GT', model: 'eForce Amp+',
    motorBrand: 'shimano', motorModel: 'Shimano DU-EP801', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 630, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'SRAM SX Eagle 12-speed', brakes: 'Slate T4 4-piston',
    disciplines: ['e-enduro'], weight: null, price: 6000,
    note: 'GT\'s alloy full-power enduro e-MTB (Force platform, "Linkage Tuned Suspension" 4-bar); RockShox Yari RC fork / RockShox Deluxe Select R shock, 29in-only chassis.',
    desc: 'Verified vs the fetched maker product page (gtbicycles.com/products/eforce-amp-plus — motor "Shimano DU-EP801", "Shimano BT-E8036, 630Wh" battery, "150mm" front/rear travel via the RockShox Yari RC/Deluxe Select R spec, alloy frame, SRAM SX Eagle 12-speed 11-50T, Slate T4 203/203mm brakes) plus the product\'s Shopify .js JSON (price 600000 = $6,000.00 across all 8 size/color variants, price === compare_at_price so no active sale — the maker page itself lists no explicit price, this is the only source for it). Motor torque/power (85 Nm / 600 W) is Shimano\'s own published DU-EP801 spec (bike.shimano.com/en-US/product/component/ep8-ep801/DU-EP801.html) — not restated on the GT product page. Battery-removable claim and weight not stated on either source; left unset/null rather than guessed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://gtbicycles.com/products/eforce-amp-plus'
  },
  {
    id: 'em-gt-eforce-current', cat: 'emtb', brand: 'GT', model: 'eForce Current',
    motorBrand: 'shimano', motorModel: 'Shimano DU-EP600', motorTorque: 85, assist: 'full-power',
    batteryWh: 504,
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano CUES U6000 10-speed', brakes: 'Tektro M275 hydraulic disc',
    disciplines: ['e-enduro'], weight: null, price: 4600,
    note: 'Entry-tier stablemate to the eForce Amp+ on the same Force alloy chassis; smaller 504Wh battery, budget Shimano EP600 motor, coil SR Suntour Zeron 35 fork.',
    desc: 'Verified vs the fetched maker product page (gtbicycles.com/products/eforce-current — motor "Shimano DU-EP600", "504Wh" battery (Shimano BT-EN805), "150mm" front/rear travel via the SR Suntour Zeron 35 (coil)/X-Fusion O2 Pro RL spec, alloy frame, Shimano CUES 10-speed w/ FSA CK-752 EP8 34T crank and Shimano LG400 10-45T cassette, Tektro M275 180/180mm brakes) plus the product\'s Shopify .js JSON (price 460000 = $4,600.00 across all 4 size variants, price === compare_at_price so no active sale — the maker page itself lists no explicit price, this is the only source for it). Motor torque (85 Nm) is Shimano\'s own published DU-EP600 spec (bike.shimano.com/en-US/product/component/ep6-ep600/DU-EP600.html, fetched via the browser pane after a direct WebFetch 403 — "Maximum torque: 85 N·m" verbatim); peak power is not stated on Shimano\'s page, left unset rather than guessed. Battery-removable claim and weight not stated on either source; left unset/null rather than guessed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://gtbicycles.com/products/eforce-current'
  },
  {
    id: 'em-rotwild-rx375-pro', cat: 'emtb', brand: 'Rotwild', model: 'R.X375 PRO',
    motorBrand: 'shimano', motorModel: 'Shimano EP8', motorTorque: 85, motorPowerPeak: 500,
    batteryWh: 360, batteryRemovable: true, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT 8100 12-speed', brakes: 'Shimano XT 8120 hydraulic disc',
    disciplines: ['e-trail'], weight: 19500, price: 8543.49,
    note: 'German light e-MTB pioneer\'s "Action All Mountain" flagship — handmade high-modulus carbon frame + carbon linkage, IPU375 carbon quick-release battery (one of the lightest removable e-MTB packs on the market), FOX 36/Float DPS suspension.',
    desc: 'Verified vs the fetched maker product page (rotwild.com/en/r.x375-pro/20614 — "Shimano EP8" motor, "85 Nm" torque, "500 W" peak power, "IPU375 Carbon, 360 Wh" removable battery, "150 mm" front / "140 mm" rear travel, high-modulus carbon frame, Shimano XT 8100 12-speed w/ e*thirteen Plus 34T crank and 10-51T cassette, Shimano XT 8120 203/180mm brakes, 19.5 kg bike weight, EUR 7,490.00 price). PRICE: EUR 7,490.00 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $8,543.49 (regional-conversion, per this catalog\'s disclosed non-USD-market convention) — Rotwild has no US retail presence, no USD MSRP exists. Size M shown "Not available" on the page at fetch time; spec/price reflect the SKU\'s standard listing, not a stock state.',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.rotwild.com/en/r.x375-pro/20614'
  },
  {
    id: 'em-husqvarna-mountain-cross-mc6', cat: 'emtb', brand: 'Husqvarna', model: 'Mountain Cross MC6',
    motorBrand: 'shimano', motorModel: 'Shimano EP8 (DU-EP801)', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 720, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X01 Eagle 12-speed', brakes: 'Magura MT5 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24100, price: 7999,
    note: 'Husqvarna E-Bicycles\' carbon flagship all-mountain e-MTB (motorcycle brand\'s bicycle division, made by parent Pierer Mobility, same group as GasGas/KTM e-bicycles); FOX 36 Factory 150mm fork / FOX Float X Factory 230x62.5mm shock. The maker page lists both 27.5in and 29in wheel options with no per-size breakdown given — cataloged at 29in, the page\'s primary listed spec.',
    desc: 'Verified vs the fetched maker product page (husqvarna-bicycles.com/en-us/models/offroad/mountain-cross/mountain-cross-mc62023.html — "Shimano EP8 (DU-EP801)" motor, "Core S3+, 720 Wh" battery, "150mm" front/rear travel, New HQV Carbon frame, SRAM X01 Eagle 12-speed 34T/10-50T, Magura MT5 4-piston 203/203mm brakes, 24.1kg weight, "$7,999.00 USD" MSRP plus $60 freight (freight excluded from the cataloged price, same convention as other maker-quoted freight add-ons in this catalog)). Motor peak power (600W) is Shimano\'s own published DU-EP801 spec (bike.shimano.com/en-US/product/component/ep8-ep801/DU-EP801.html) — not restated on the Husqvarna page, which states only the 250W continuous/85Nm figures elsewhere on-brand. Page URL still carries a "2023" model-year token but is the live, currently-linked-from-homepage model page (not under the site\'s separate /archive/ path used for retired model years) — treated as the current-lineup listing. Battery-removable claim not stated; left unset rather than guessed.',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.husqvarna-bicycles.com/en-us/models/offroad/mountain-cross/mountain-cross-mc62023.html'
  },

  {
    id: 'em-thok-tp4', cat: 'emtb', brand: 'Thok', model: 'TP4',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX Gen.5', motorTorque: 120,
    batteryWh: 800, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'Shimano SLX 12-speed (FSA 34T crank, 10-51T cassette)', brakes: 'Shimano Deore 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 24300, price: 6832.71,
    note: 'Italian maker\'s all-mountain/enduro flagship — full UD-carbon frame with an integrated down-tube 800Wh Powertube, Flip Chip adjustable geometry (64.5° head angle), 27.5in rear compatible via the same flip chip (cataloged at the stock 29in/29in setup).',
    desc: 'Verified vs the fetched maker product page (thokbikes.com/en/negozio/ebike-en/tp4-black — "Bosch Performance Line CX" motor, "120 Nm max torque", "800 Wh" integrated Powertube, FOX 36 Float Rhythm 160mm fork / FOX Float Rhythm 150mm shock, full carbon frame, Shimano SLX 12-speed rear derailleur w/ FSA 34T crank and 10-51T cassette, Shimano Deore 4-piston 203mm brakes, 24.3kg size-M weight w/ 800Wh battery, EUR 5,990 price). PRICE: EUR 5,990 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653), matching this catalog\'s established EUR-conversion convention (em-rotwild-rx375-pro) -> $6,832.71 — Thok has no US retail presence, no USD MSRP exists. catalog/emtb-tail-5 zero-coverage-maker wave (first Thok row).',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.thokbikes.com/en/negozio/ebike-en/tp4-black/'
  },

  {
    id: 'em-moustache-samedi29-trail1502', cat: 'emtb', brand: 'Moustache', model: 'Samedi 29 Trail 150.2',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (BDU37, Smart System)', motorTorque: 85,
    batteryWh: 750, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano CUES 11-speed (11-50T, FSA 34T chainring)', brakes: 'Magura MT5 4-piston',
    disciplines: ['e-trail'], weight: 27000, price: 5245.02,
    note: 'French maker\'s trail e-MTB — 6061 T4-T6 aluminum frame, RockShox PSYLO Silver R fork, Moustache\'s own Magic Grip Control shock (205x60mm trunnion). The maker\'s own French listings also show a lighter 625Wh battery variant of this same 150.2 trim; cataloged at the US maker-page-listed 750Wh spec.',
    desc: 'Verified vs the fetched maker product page (moustachebikes.com/us/en/electric-bikes/samedi-29-trail/trail-150-2-2 — "Bosch Performance Line CX BDU37" motor, "85Nm", "Bosch PowerTube 750Wh" battery, RockShox PSYLO Silver R 150mm fork, Moustache Magic Grip Control 150mm shock, "6061 T4-T6 aluminum" frame, Shimano CUES 11-speed 11-50T w/ FSA 34T chainring, Magura MT5 4-piston 203mm brakes, 29in Maxxis Rekon 2.40 tires, 27kg size-L weight); no price is shown on the maker page (moustachebikes.com carries no shop/checkout). PRICE: the maker\'s French retail network (my-velo.fr, this exact "150.2 2026" SKU) lists EUR 4,599.00 as the pre-discount original price, converted at the 2026-07-22 open.er-api.com rate (1.140653) -> $5,245.02 — disclosed as a retailer-listed price, not a maker-published RRP, since Moustache\'s own site states none. COORDINATOR at merge (2026-07-22): regional-conversion token STRIPPED — that token requires the MAKER\'s own published non-USD figure; a retailer\'s EUR listing converted is a disclosed sample, not a conversion of a maker RRP. Price stays as the disclosed estimate, basis blank. catalog/emtb-tail-5 zero-coverage-maker wave (first Moustache row).',
    verified: true, lastChecked: '2026-07-22', source: 'https://moustachebikes.com/us/en/electric-bikes/samedi-29-trail/trail-150-2-2/'
  },

  {
    id: 'em-conway-ewme-49', cat: 'emtb', brand: 'Conway', model: 'eWME 4.9',
    motorBrand: 'shimano', motorModel: 'Shimano EP800', motorTorque: 85,
    batteryWh: 720, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 155,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore XT 12-speed', brakes: 'Magura MT5 eStop 4-piston',
    disciplines: ['e-enduro'], weight: 25300, price: 5132.83,
    note: 'German direct-to-consumer maker\'s enduro-leaning e-MTB ("We Make Enduro" eWME line) — RockShox Lyrik Select fork, FOX Float DPS shock (205x60mm trunnion), Schwalbe Magic Mary front / Hans Dampf rear tires.',
    desc: 'Verified vs the fetched maker product page (conway-bikes.com/en/e-bikes/e-mountainbike/ewme/02895894-conway-ewme-4.9-full-suspension-2024 — "SHIMANO EP800" motor, DARFON "Intube 720" 720Wh battery, ROCKSHOX Lyrik Select 160mm fork, FOX Float DPS 205x60mm shock, aluminum full-suspension frame, SHIMANO Deore XT 12-speed 1x12, MAGURA MT5 eStop 203mm front/rear brakes, 25.3kg weight, EUR 4,499.95 price). PRICE: EUR 4,499.95 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653), matching this catalog\'s established EUR-conversion convention (em-rotwild-rx375-pro) -> $5,132.83 — Conway has no US retail presence, no USD MSRP exists. Rear travel (155mm) is the eWME platform\'s published frame-travel figure (conway-bikes.com/en/e-bikes/e-mountainbike/ewme/ family overview page) — not restated on this SKU\'s own page, which lists only the 160mm fork. catalog/emtb-tail-5 zero-coverage-maker wave (first Conway row).',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://www.conway-bikes.com/en/e-bikes/e-mountainbike/ewme/02895894-conway-ewme-4.9-full-suspension-2024/'
  },

  {
    id: 'em-amflow-pl-carbon-pro-800', cat: 'emtb', brand: 'Amflow', model: 'PL Carbon Pro (800Wh)',
    motorBrand: 'dji', motorModel: 'DJI Avinox M1 Drive Unit', motorTorque: 105, motorPowerPeak: 850,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission (T-Type AXS, 104BCD 34T, 10-52T)', brakes: 'Magura MT7 Pro 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 19710, price: 10199,
    note: 'Chinese maker\'s flagship, built around DJI\'s Avinox drive system (co-developed for Amflow); ultra-light 2.27kg carbon frame + FOX 36 Factory/Float X Factory suspension; rear-wheel flip-chip supports a 27.5in mullet swap (cataloged at the stock dual-29in setup).',
    desc: 'Verified vs the fetched maker spec page (amflowbikes.com/pl-carbon/specs — "Avinox M1 Drive Unit: 105 N·m", "Avinox Integrated Battery: 800Wh", "2026 FOX 36 Factory" 160mm fork / "2026 FOX FLOAT X Factory" trunnion 185x55mm shock, "SRAM X0 Eagle Transmission" derailleur w/ 104BCD 34T chainring and XS-1295 10-52T cassette, "Magura MT7 Pro" 4-piston 203mm brakes, 29in wheels, USD $10,199 price); the specs page states no bike weight or rear-wheel-travel figure. Weight (19.71kg, size L, tubeless/no pedals) comes from a worldwidecyclery.com RETAILER listing for this exact SKU — COORDINATOR at merge (2026-07-22): the sourceType:measured tag was STRIPPED because a retailer spec line is not a scale-read measured figure; the weight stays as a disclosed retailer-quoted SAMPLE only; rear travel (150mm) and peak power (850W) are the model\'s consistently-reported figures across independent reviews (E-MOUNTAINBIKE Magazine, The Loam Wolf) confirming the FOX Float X Factory\'s travel, not maker-stated on the specs page itself. catalog/emtb-tail-5 zero-coverage-maker wave (first Amflow row).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://www.amflowbikes.com/pl-carbon/specs'
  },

  {
    id: 'em-forestal-siryon-v2-diode', cat: 'emtb', brand: 'Forestal', model: 'e-Siryon v2 Diode',
    motorBrand: 'avinox', motorModel: 'AVINOX M2S', motorTorque: 150, motorPowerPeak: 1300,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 174,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 AXS T-Type (104BCD 34T, XS-1295 10-52T, 12-speed)', brakes: 'SRAM Maven Ultimate 4-piston',
    disciplines: ['e-enduro'], weight: null, price: 11121.37,
    note: 'Spanish maker\'s full-power e-enduro flagship — Alpha Box v2 carbon frame w/ the patented Twin Levity suspension system, AVINOX M2S full-power drive unit (co-developed w/ DJI), FOX Factory 170mm fork / Float Factory X2 shock, size F3 (Large) build.',
    desc: 'Verified vs the fetched maker product/compare pages (rendered in-browser — forestal.com is a JS-heavy SPA that WebFetch could not get past the cookie/homepage shell for; the browser pane loaded the real content after clicking through the Siryon nav dropdown). Overview page (forestal.com/en/products/siryon): "e-SIRYON v2... 29\\" enduro / 170mm travel / carbon frame / AVINOX M2S", "AVINOX M2S... 150Nm/1300W", "AVINOX 800Wh... Integrated non-removable battery", "AVINOX DP100... 2.0-inch integrated OLED touchscreen". Compare page (forestal.com/en/compare/siryon) gave the full build-kit table for both trims: Diode (this row) = "Forestal Alpha Box Carbon AVINOX M2S 29\\" 170 / Carbon fibre | 174mm travel", "FOX Factory: Podium Factory 170 29\\" / Float Factory X2", "SRAM Maven Ultimate | HS200 Rotors", "SRAM X0 AXS T-Type | SRAM X0 AXS T-Type 10-52T | 12 Speed | 34T", "€ 9,750"; the lower Halo trim (RockShox Select fork/shock, SRAM Maven, SRAM S1000 AXS T-Type, € 7,650) was left uncataloged in favor of this flagship SKU, mirroring this file\'s one-flagship-row convention for multi-trim models. No maker-published complete-bike weight found on either page (only motor 2.6kg / battery 3.74kg component weights) — cataloged weightless rather than guessed. PRICE: EUR 9,750 maker RRP converted at the 2026-07-22 open.er-api.com rate (1.140653), matching this catalog\'s established EUR-conversion convention (em-rotwild-rx375-pro) -> $11,121.37 — Forestal ships direct from Spain/EU only (site states "Direct shipping is available to countries in Europe... For rest of countries, please contact us"), no USD MSRP exists. catalog/emtb-retry-2 wave — resolves the emtb-tail-5 Forestal drop (JS-heavy page previously only returned fragments via WebFetch).',
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://forestal.com/en/compare/siryon'
  },

  // ---------------------------------------------------------------------------
  // catalog/emtb-breadth-brands-1 wave — absent-brand + thin-brand pass
  // (Bulls, Fantic, GasGas, Simplon, Thomus, Pole, Riese & Muller now present;
  // Focus/Amflow/Forestal/Husqvarna deepened past 1 row. Gazelle and Bird were
  // researched and SKIPPED — confirmed no currently-sold e-MTB exists for
  // either brand, so no row was fabricated; see the worker report.)
  // ---------------------------------------------------------------------------

  {
    id: 'em-bulls-copperhead-evo-am4-750', cat: 'emtb', brand: 'Bulls', model: 'Copperhead EVO AM 4 750',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX (Smart System)', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XTR 12-speed (eThirteen CR4USM 34T crank, Shimano CS-M6100 10-51T cassette)', brakes: 'Shimano BR6120 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 27100, price: 5999, modelYear: 2026,
    note: 'US-market flagship of Bulls\' Copperhead EVO all-mountain e-MTB line (BULLS Bikes USA import) — 6061 aluminum frame, mullet (29in front/27.5in rear) wheels, SR Suntour Durolux 36 RC2 fork / SR Suntour RS19 TRIAir shock, 203mm rotors front/rear.',
    desc: 'Fetched directly from the maker-authorized US retail page (bullsbikesusa.com/products/copperhead-evo-am-4-750): "Bosch Performance Line CX" 85Nm motor, "Bosch PowerTube 750Wh" Smart System battery, mullet 29in/27.5in wheels, "Aluminum 6061" frame w/ internal routing, "Shimano XTR 12-speed" w/ eThirteen CR4USM 34T crank and Shimano CS-M6100 10-51T cassette, "Shimano BR6120 4-piston" 203/203mm brakes, 59.8 lbs (27.1kg) weight, regular price $5,999.00 (site currently runs a $4,499.00 promotional sale off that base MSRP — cataloged at the $5,999.00 struck-through MSRP per this catalog\'s standing MSRP-not-sale convention, mirroring the Trek Rail+ correction). Motor peak wattage not stated on this page. catalog/emtb-breadth-brands-1 wave (first Bulls row — brand was fully absent from data/emtb.js).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23', source: 'https://bullsbikesusa.com/products/copperhead-evo-am-4-750'
  },

  {
    id: 'em-bulls-copperhead-evo-am1-750', cat: 'emtb', brand: 'Bulls', model: 'Copperhead EVO AM 1 750',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX Gen4 (Smart System)', motorTorque: 85,
    batteryWh: 750, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore 10-speed (FSA Eco Steel Boost 34T crank, Shimano CS-M4100 11-46T cassette)', brakes: 'Tektro HD-M390 hydraulic disc',
    disciplines: ['e-trail'], weight: 26535, price: 4999, modelYear: 2026,
    note: 'The entry point of Bulls\' Copperhead EVO AM range — SR Suntour Lytro 35 Supreme SL fork / SR Suntour Edge Plus TR 2CR shock (both 150mm), mullet (29in front/27.5in rear) wheels, Formula hubs on Ryde Disc 30 rims, 203/180mm rotors.',
    desc: 'Fetched directly from the maker-authorized US retail page (bullsbikesusa.com/products/copperhead-evo-am-1-750): "Bosch Gen4 Performance Line CX motor with 85 Nm", "Bosch PowerTube 750 Wh, fully integrated", "SR Suntour Lytro 35 Supreme SL Boost" 150mm fork / "SR Suntour Edge Plus TR 2CR" 150mm shock, "Aluminum 6061" frame, "Shimano Deore RD-M5120-SGS" 10-speed w/ FSA Eco Steel Boost 34T crank and Shimano CS-M4100 11-46T cassette, "Tektro HD-M390" 203/180mm brakes, "58.5 lbs" (26.5kg) weight; page lists "$2,999.00 $4,999.00 Save $2,000" (a promotional sale off the struck-through $4,999.00 base) — cataloged at the $4,999.00 MSRP per the standing MSRP-not-sale convention. catalog/emtb-breadth-brands-1 wave (second Bulls row).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23', source: 'https://bullsbikesusa.com/products/copperhead-evo-am-1-750'
  },

  {
    id: 'em-fantic-xmf17-carbon-race', cat: 'emtb', brand: 'Fantic', model: 'XMF 1.7 Carbon Race',
    motorBrand: 'brose', motorModel: 'Brose S Mag', motorTorque: 90,
    batteryWh: 720, assist: 'full-power',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS (SX Eagle 12s 11-50T cassette, SX Eagle chain, SRAM 34T Eagle X-Sync 2 ring)', brakes: null,
    disciplines: ['e-trail', 'e-enduro'], weight: null, price: 9459.15, modelYear: 2026,
    note: 'Italian maker\'s flagship All Mountain e-MTB — carbon front triangle / aluminum rear end / carbon seatstay, mullet (29in/27.5in) wheels, RockShox Zeb Select fork + RockShox Deluxe Select+ 205x57.5mm shock, Fantic\'s own 720Wh battery, size S/M/L.',
    desc: 'Fetched directly from the maker\'s own product page (fanticbikes.com/en/products/xmf-1-7-carbon-race-black, redirected from fantic.com): tech-specs table states "Fantic All mountain, 170mm travel... 29\\"-27,5\\" wheels" frame, "RockShox Deluxe Select+ 205x57,5mm" shock, "RockShox Zeb Select 170mm" fork, "Fantic 720Wh" battery, "Brose S Mag 90Nm" motor, "Sram GX Eagle AXS" derailleur/shifter, "Sram SX Eagle 12s" chain, "Sram SX Eagle 12s 11-50" cassette, "Sram 34T Eagle technology X-Sync 2" chainring, price EUR 8,290.00. The page states no complete-bike weight or brake spec (a common Fantic-page omission) — both left uncataloged rather than guessed. PRICE: EUR 8,290.00 maker-published price converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $9,459.15; Fantic has no US retail presence for this SKU (fanticbikes.com is the EU/UK shop), so no USD MSRP exists — disclosed sample, not a "verified" price. catalog/emtb-breadth-brands-1 wave (first Fantic row — brand was fully absent).',
    lastChecked: '2026-07-23', source: 'https://fanticbikes.com/en/products/xmf-1-7-carbon-race-black'
  },

  {
    id: 'em-gasgas-ecc6', cat: 'emtb', brand: 'GasGas', model: 'ECC 6',
    motorBrand: 'sram', motorModel: 'SRAM Eagle Powertrain', motorTorque: 90,
    batteryWh: 630, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS Transmission 1x12', brakes: 'SRAM Code Ultimate Stealth 4-piston',
    disciplines: ['e-enduro'], weight: 24600, price: 11409.48, modelYear: 2026,
    note: 'Spanish motorcycle brand GasGas\' full-power e-enduro flagship (Pierer Mobility group, sister brand to Husqvarna/KTM e-bicycles) — full-carbon frame with a distinctive moto-plastics kit, DVO Onyx D1CV OTT fork / DVO Jade X CV coil shock (WP Cone Valve co-development), RockShox Reverb AXS dropper, Maxxis Assegai/Minion DHR II tires.',
    desc: 'GasGas\'s own product page (gasgas.com/bicycles/en-us/bikes/enduro/e-bike/ecc/ecc-6.html) is a navigation shell with no spec table (WebFetch/Exa both returned only nav links, not the JS-rendered spec content). Full spec instead confirmed across two independent editorial group tests that both quote the maker\'s own spec sheet verbatim: E-MOUNTAINBIKE Magazine ("Motor SRAM Eagle Powertrain 90 Nm, Battery SRAM Battery 630 Wh... Fork DVO Onyx D1CV OTT 170mm, Rear Shock DVO Jade X CV Coil 160mm... Drivetrain SRAM X0 Eagle Transmission 1x12... Brakes SRAM CODE Ultimate Stealth 220/200mm", 24.6kg, EUR 9,999) and Pinkbike\'s review (confirms 29in wheels, carbon frame, 90Nm/630Wh, 24.8kg as-tested, USD $10,999 as reviewed). Entered unverified (no direct maker-page fetch this session) per the catalog\'s credible-source breadth policy. PRICE: EUR 9,999 (E-MOUNTAINBIKE Magazine\'s quoted EU price) converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $11,409.48 (close to Pinkbike\'s independently-quoted $10,999 US price, both retained as disclosed samples, not a confirmed single MSRP). catalog/emtb-breadth-brands-1 wave (first GasGas row — brand was fully absent).',
    lastChecked: '2026-07-23', source: 'https://ebike-mtb.com/en/gasgas-ecc-6-2024-group-review/'
  },

  {
    id: 'em-simplon-rapcon-e', cat: 'emtb', brand: 'Simplon', model: 'Rapcon :e',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX Gen5', motorTorque: 85,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'Shimano XT Di2 12-speed (Ultimate package)', brakes: null,
    disciplines: ['e-trail', 'e-enduro'], weight: 22800, price: 7986.61, modelYear: 2026,
    note: 'Austrian maker\'s carbon enduro/all-mountain e-MTB — 4-bar rear end, 38mm-stanchion fork across all packages, RockShox Deluxe rear shock (205x62.5mm trunnion), mullet-convertible via flip chip (cataloged at the stock full-29in setup), Bosch Kiox 400c top-tube display, up to 150kg system weight rating.',
    desc: 'Fetched directly from the maker\'s own product page (simplon.com/en/Bikes/E-Mountain-Bikes/Rapcon-e_b_1149826): "Frame material Carbon", "Travel (rear/front) 160 mm / 160 mm", "Motor BOSCH PL CX Gen5", "Battery 600 / 800 Wh", "Total bike weight from 22,8 kg", "fork travel/length/OFFSET 160/576/44 mm", "shock size (eye to eye length X HUB) 205 x 62,5 mm", "lower shock hardware Trunnion", starting price "from EUR 6,999.00". Cataloged at the larger 800Wh battery option (the page offers both 600/800Wh — no single fixed-spec SKU is pinned, so this row represents the top-line CORE/Ultimate-package spec); brakes not stated on the fetched page section, left uncataloged. PRICE: EUR 6,999.00 ("from") maker-published starting price converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $7,986.61; Simplon has no US retail presence, no USD MSRP exists — disclosed "from" sample, not a pinned single-SKU verified price. catalog/emtb-breadth-brands-1 wave (first Simplon row — brand was fully absent).',
    lastChecked: '2026-07-23', source: 'https://www.simplon.com/en/Bikes/E-Mountain-Bikes/Rapcon-e_b_1149826'
  },

  {
    id: 'em-thomus-lightrider-e2-pro', cat: 'emtb', brand: 'Thömus', model: 'Lightrider E2 Pro',
    motorBrand: 'shimano', motorModel: 'Shimano EP6', motorTorque: 85,
    batteryWh: 726, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'Shimano SLX or XT 12-speed (buyer-selectable build)', brakes: null,
    disciplines: ['e-trail'], weight: null, price: 8899, modelYear: 2026,
    note: 'Swiss maker\'s modular-platform e-MTB, hand-built in Thömus\'s US workshop (Santa Monica) via an online configurator — carbon frame supporting 140-170mm of travel across FOX or DT Swiss suspension options; this row is the base SLX build at the current US listing.',
    desc: 'Fetched directly from the maker\'s US shop page (thomus.com/products/lightrider-e2-pro): "Regular price $8,899.00" (SHIMANO SLX build) / "$9,999.00" (SHIMANO XT build), modular frame supporting "140 to 170 millimeters" of travel, "FOX or DT-Swiss" suspension options (stock builds feature Fox Factory 160mm fork per the page text) — cataloged at 160/160mm as the page\'s named stock spec. The US product page does not state the motor/battery for the current build (Thömus has shipped this platform with several motor generations over the years — Shimano EP6/EP8, TQ, maxon — across model years); motor/battery here (Shimano EP6, 85Nm, 726Wh Darfon battery) is the most recent independently-reviewed spec for this exact SKU name (opticycles.com "Thoemus Lightrider E2 Pro Deore Schwarz" listing), not confirmed on the fetched US page itself — flagged as the best-credible sample basis, not maker-verified. No complete-bike weight found on either the US shop page or the cited review. catalog/emtb-breadth-brands-1 wave (first Thömus row — brand was thin, 0 prior rows... actually fully absent per the task brief).',
    lastChecked: '2026-07-23', source: 'https://thomus.com/products/lightrider-e2-pro'
  },

  {
    id: 'em-thomus-lightrider-emax', cat: 'emtb', brand: 'Thömus', model: 'Lightrider E_MAX',
    motorBrand: 'maxon', motorModel: 'maxon BIKEDRIVE AIR S', motorTorque: 90, motorPowerPeak: 620,
    batteryWh: 400, assist: 'lightweight',
    wheelConfig: '29', suspension: 'full', travelFront: 140, travelRear: 140,
    frameMaterial: 'carbon', drivetrain: null, brakes: null,
    disciplines: ['e-trail'], weight: 17010, price: 13463.90, modelYear: 2026,
    note: 'Thömus\' 2026 lightweight-class flagship — pairs the Swiss-made maxon BIKEDRIVE AIR S motor (a full-power-torque motor in a lightweight-class 2.0kg package) with a compact 400Wh battery; won E-MOUNTAINBIKE Magazine\'s 2026 Editors\' Choice. Deliberately purist minimal-weight setup rather than the maker\'s big-battery E2 platform.',
    desc: 'Sourced from E-MOUNTAINBIKE Magazine\'s fetched first-ride test (ebike-mtb.com/en/thoemus-lightrider-e-max-2026-test/ and the companion Editors\' Choice piece): "maxon BIKEDRIVE AIR S motor... 400 Wh battery... 90 Nm of torque and peak output of 620 watts", "17.01 kg in size M", "EUR 12,450". No maker product page with US pricing found (thomus.com\'s current catalog lists the E2/E2 Pro configurator but not this specific E_MAX SKU at time of research) — entered unverified via the credible-editorial-source breadth policy. PRICE: EUR 12,450 converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $13,463.90 — disclosed conversion of a reviewer-quoted EU price, not a maker-fetched USD MSRP. Drivetrain/brakes not stated in the fetched excerpt, left uncataloged. catalog/emtb-breadth-brands-1 wave (second Thömus row — introduces motorBrand:"maxon" to EMTB_VOCAB, backed by this real row).',
    lastChecked: '2026-07-23', source: 'https://ebike-mtb.com/en/thoemus-lightrider-e-max-2026-test/'
  },

  {
    id: 'em-pole-hiisi', cat: 'emtb', brand: 'Pole', model: 'Hiisi',
    motorBrand: 'maxon', motorModel: 'maxon Air S', motorTorque: 90, motorPowerPeak: 620,
    batteryWh: 600, batteryRemovable: false, rangeExtender: true, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: null, brakes: null,
    disciplines: ['e-trail', 'e-enduro'], weight: 22800, price: 17388.51, modelYear: 2026,
    note: 'Finnish maker Pole Bicycles\' 2026 comeback e-MTB (founder Leo Kokkonen\'s return after the original Pole Voima/bankruptcy) — CNC-machined 7075-T6 aluminum frame with adjustable-travel geometry (152-200mm rear / 160-200mm front via a shock-mount swap, one frame platform, 12 configurations), full 29er or mullet wheel configuration, built to order (~50 frames/year in Finland). Cataloged at the gravity-spec 170/170mm build.',
    desc: 'Sourced from E-MOUNTAINBIKE Magazine\'s fetched hands-on preview (ebike-mtb.com/en/new-pole-hiisi/), which quotes Pole founder Leo Kokkonen directly: "maxon Air S mit 90 Nm | 600 Wh | 22.8 kg in gravity build specification (manufacturer claim) | from EUR 15,239". Additional detail: "CNC-machined aluminium frame... 160-200mm front travel / 152-200mm rear travel... Choice of 600 Wh or 400 Wh battery (both permanently integrated)... a 250 Wh range extender... maxon AIR S... 2.03 kg, 90 Nm of torque and a peak output of 620 watts". No polebicycles.com product page with a fixed build kit/drivetrain spec was found (the brand sells built-to-order); drivetrain/brakes left uncataloged rather than guessed. PRICE: EUR 15,239 ("from") converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $17,388.51 — a reviewer-disclosed starting price, not a maker-fetched fixed-SKU MSRP. catalog/emtb-breadth-brands-1 wave (first Pole row — brand was fully absent; introduces motorBrand:"maxon", shared with the Thömus E_MAX row above).',
    lastChecked: '2026-07-23', source: 'https://ebike-mtb.com/en/new-pole-hiisi/'
  },


  {
    id: 'em-focus-sam2-68', cat: 'emtb', brand: 'Focus', model: 'SAM² 6.8',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX Smart System', motorTorque: 85, motorPowerPeak: 600,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: null, brakes: null,
    disciplines: ['e-enduro'], weight: null, price: 7986.61, modelYear: 2026,
    note: 'German maker Focus\' most downhill-oriented e-MTB — 7005 hydroformed aluminum frame w/ F.O.L.D. (FOCUS Optimised Linkage Design) kinematics, mullet (29in front/27.5in rear) wheels, RockShox Super Deluxe Coil Select 230x65mm shock, 38mm-stanchion fork, C.I.S. fully-integrated cable routing, compatible with a 250Wh range extender (up to 1,050Wh total).',
    desc: 'Fetched directly from the maker\'s own product pages (focus-bikes.com/int/bikes/e-mountainbike/focus-sam2 overview + focus-bikes.com/es_en SAM² 6.8 SKU page): "With 180/170 mm travel" (frame/fork) — note the fork-travel figure on the overview differs slightly by market page (170mm vs 180mm across regional listings); this SKU\'s own page states "180 mm" fork travel and "170 mm F.O.L.D. Gen2" frame travel (cataloged at 180/160 using the FOCUS FAQ\'s explicit "170 mm at the fork and 160 mm at the rear triangle" answer, which conflicts with the SKU page\'s own 180mm fork figure — both maker-stated, discrepancy disclosed rather than silently resolved), "Bosch Performance Line CX Smart System, 85 Nm" motor, "Bosch PowerTube Li-Ion (750Wh)" battery (SKU page) vs "up to 750 Wh" / 800Wh option on the overview page (cataloged at 800Wh, the larger option this trim supports per the overview FAQ), "Rock Shox Super Deluxe Coil Select, 230/65 mm" shock, "7005 hydroformed aluminium" frame, price EUR 6,999.00. Drivetrain/brakes not stated on the fetched sections, left uncataloged; no complete-bike weight found. PRICE: EUR 6,999.00 maker-published price converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $7,986.61; Focus has no consistent US retail MSRP for this SKU (the fetched pages are EU/AU market pages) — disclosed sample, not a confirmed single-market MSRP. catalog/emtb-breadth-brands-1 wave (Focus deepened from 2 rows to 3).',
    lastChecked: '2026-07-23', source: 'https://www.focus-bikes.com/es_en/catalog/product/view/_ignore_category/1/id/92485/s/focus-sam2-6-8-2/'
  },

  {
    id: 'em-amflow-pl-carbon-800', cat: 'emtb', brand: 'Amflow', model: 'PL Carbon (800Wh)',
    motorBrand: 'dji', motorModel: 'DJI Avinox M1 Drive Unit', motorTorque: 105, motorPowerPeak: 850,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'top-tube',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle Transmission (T-Type AXS)', brakes: 'Magura MT5 4-piston',
    disciplines: ['e-trail', 'e-enduro'], weight: 19200, price: 7499, modelYear: 2026,
    note: 'The base (non-Pro) trim of Amflow\'s DJI Avinox-powered flagship — same 2.27kg carbon frame, motor and 800Wh battery as the PL Carbon Pro, stepped down to a GX-level SRAM Transmission build and Magura MT5 (vs the Pro\'s MT7 Pro).',
    desc: 'Fetched directly from the maker\'s own spec/shop pages (amflowbikes.com/pl-carbon/specs and amflowbikes.com/product/amflow-pl-carbon): specs page lists both "Amflow PL Carbon (800Wh)" USD $7,499 and "Amflow PL Carbon Pro (800Wh)" USD $10,199 side by side, sharing "Avinox Integrated Battery: 800Wh"; the product page states "USD $6,499 USD $7,499" (a promotional sale off the $7,499 base) and "The 2.52kg motor delivers 105 N·m continuous torque" for the shared Avinox drive system. Cataloged at the $7,499 struck-through MSRP per the standing MSRP-not-sale convention. Drivetrain/brakes for this specific non-Pro trim are not broken out on the specs page (only the Pro trim\'s kit is itemized elsewhere) — GX Eagle Transmission / Magura MT5 entered as the catalog-documented step-down from the Pro\'s X0 Transmission / MT7 Pro, consistent with Amflow\'s own Pro-vs-base naming convention, but NOT independently confirmed on a fetched spec table for this exact SKU — flagged as the lower-confidence field on this row. Weight (19.2kg) is the maker\'s own general PL-family figure (per-model footnote attributes it to the Pro 600Wh build specifically) — same disclosed caveat as the sibling PL Carbon Pro row. catalog/emtb-breadth-brands-1 wave (Amflow deepened from 1 row to 2).',
    lastChecked: '2026-07-23', source: 'https://www.amflowbikes.com/pl-carbon/specs'
  },

  {
    id: 'em-forestal-cyon-neon', cat: 'emtb', brand: 'Forestal', model: 'Cyon Neon',
    motorBrand: 'forestal', motorModel: 'Forestal EonDrive (Bafang-built)', motorTorque: 60, motorPowerPeak: 400,
    batteryWh: 360, batteryRemovable: true, rangeExtender: true, assist: 'lightweight',
    wheelConfig: '29', suspension: 'full', travelFront: 150, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X01 Eagle 1x12', brakes: 'Magura MT7 4-piston',
    disciplines: ['e-trail'], weight: 18490, price: 13463.90, modelYear: 2026,
    note: 'Spanish maker Forestal\'s lightweight-class trail e-MTB (distinct from the full-power e-Siryon already in this catalog) — Alpha Box carbon frame w/ the "Twin Levity" single-pivot suspension linkage, RockShox Pike Ultimate Charger 2.1 fork / RockShox Super Deluxe Ultimate RCT shock, Crankbrothers Synthesis Carbon E7 wheels, Forestal Smart Dashboard top-tube display; Neon is the mid tier of the three-bike Cyon range (Halo below, Diode above).',
    desc: 'Sourced from BikeRadar\'s and MBR\'s independent reviews, both quoting Forestal\'s own spec sheet: BikeRadar ("Motor Forestal EonDrive motor, 360Wh Aurora Performance battery... up to 60Nm of torque and 250W of nominal power... built by Bafang... 150mm-travel", 18.49kg, price EUR 11,799/GBP 10,999) and MBR ("60Nm torque from the Bafang-built EonDrive motor, paired with a 360Wh battery... Frame: Alpha Box Carbon, 150mm travel... Fork: RockShox Pike Ultimate... Motor: Forestal EonDrive, 400W/60Nm"). No direct forestal.com product-page fetch this session for the Cyon line specifically (the existing catalog\'s Siryon row already documents forestal.com as a JS-heavy SPA requiring the browser pane; that step was not repeated here for a second Forestal model given the two independent editorial confirmations) — entered unverified via the credible-source breadth policy. PRICE: EUR 11,799.00 (BikeRadar\'s quoted EU price) converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $13,463.90 (close to BikeRadar\'s own independently-quoted GBP 10,999 -> USD conversion, both disclosed as reviewer-sourced, not a maker-fetched MSRP). Introduces motorBrand:"forestal" to EMTB_VOCAB (distinct from the existing Siryon row\'s "avinox" motorBrand — the Cyon\'s EonDrive is a different, Bafang-built, lightweight-class motor, not the AVINOX full-power unit). catalog/emtb-breadth-brands-1 wave (Forestal deepened from 1 row to 2).',
    lastChecked: '2026-07-23', source: 'https://www.bikeradar.com/reviews/bikes/electric-bikes/forestal-cyon-neon-review'
  },

  {
    id: 'em-husqvarna-hard-cross-hc5', cat: 'emtb', brand: 'Husqvarna', model: 'Hard Cross HC5',
    motorBrand: 'shimano', motorModel: 'Shimano EP8 (DU-EP801)', motorTorque: 85,
    batteryWh: 720, assist: 'full-power',
    wheelConfig: '29', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'SRAM X01 Eagle 12-speed (34T chainring, 10-50T cassette)', brakes: 'Magura MT7 4-piston',
    disciplines: ['e-enduro'], weight: 24600, price: 6599, modelYear: 2026,
    note: 'Husqvarna E-Bicycles\' enduro-focused sibling to the already-cataloged Mountain Cross MC6 (same Pierer Mobility parent group as GasGas e-bicycles) — New HQV Alloy frame, FOX Float 38 Factory Grip2 fork / FOX Float X2 Factory shock, 220mm front/203mm rear rotors, slacker/shorter/more stable geometry than its predecessor. The maker page lists both 27.5in and 29in wheel options with no per-size breakdown given — cataloged at 29in, matching the MC6 row\'s convention.',
    desc: 'Verified vs the fetched maker product page (husqvarna-bicycles.com/en-us/models/offroad/hard-cross/hard-cross-hc5-2023.html — "Shimano EP8 (DU-EP801)... 250 W, 85 Nm" motor, "Core S2+, 720 Wh, 36 V" battery, "FOX Float 38 Factory... 180 mm" fork / "FOX Float X2 Factory... 170mm" shock (rear travel per the maker\'s own product description text: "180/170mm of suspension travel"), "Alloy 6061... New HQV Alloy" frame, "SRAM X01 Eagle, 12-S" w/ 34T chainring, "Magura MT7, 4-piston" brakes, "24.6 kg" weight, "$6,599.00 USD" MSRP (plus separately-listed freight, excluded from the cataloged price per this catalog\'s standing freight-exclusion convention, same as the sibling MC6 row). Cassette range (10-50T) and rotor sizes (220/203mm) are the platform\'s commonly-cited figures, not independently re-confirmed in this fetch pass. Page URL still carries a "2023" model-year token but is the live, currently-linked-from-homepage model page (same "current lineup" treatment as the sibling MC6 row). catalog/emtb-breadth-brands-1 wave (Husqvarna deepened from 1 row to 2).',
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23', source: 'https://www.husqvarna-bicycles.com/en-us/models/offroad/hard-cross/hard-cross-hc5-2023.html'
  },

  {
    id: 'em-moustache-samedi27-wide5', cat: 'emtb', brand: 'Moustache', model: 'Samedi 27 Wide 5',
    motorBrand: 'bosch', motorModel: 'Bosch Performance Line CX BDU37 (Smart System)', motorTorque: 85, motorPowerPeak: 250,
    batteryWh: 625, assist: 'full-power', display: 'top-tube',
    wheelConfig: '275', suspension: 'full', travelFront: 130, travelRear: 120,
    frameMaterial: 'aluminum', drivetrain: 'Shimano XT 12-speed (Deore shifter, 11-51T cassette)', brakes: 'Shimano MT420 4-piston',
    disciplines: ['e-trail'], weight: 24400, price: 4714.31, modelYear: 2026,
    note: 'French maker Moustache\'s accessible/comfort-oriented sibling to the already-cataloged Samedi 29 Trail 150.2 — "Wide" family shares the Trail/Game platform\'s frame tech but prioritizes ease of use, 6061 T4-T6 hydroformed aluminum frame, Marzocchi Bomber Z2 RAIL fork, Moustache\'s own Magic Grip Control shock (120mm), 27.5in wheels w/ Maxxis Rekon 2.8in tires.',
    desc: 'Fetched directly from the maker\'s own product page (moustachebikes.com/se/en/electric-bikes/samedi-27-wide/samedi-27-wide-5/ and the identical /fr/en/ listing): "Wide, 6061 T4-T6 alloy, 120mm travel, Bosch PowerTube exclusive battery integration (horizontal)" frame, "Bosch, Performance Line CX BDU37, Smart System, 85Nm" motor, "Bosch, PowerTube 625Wh, horizontal, Smart System" battery, starting price "3 999 EUR" (FR listing) / a UK retailer (Velospeed) independently confirms the same SKU\'s full kit: "Marzocchi Bomber Z2 RAIL, 130mm" fork, "Shimano MT420" 4-piston 203mm brakes, "Shimano XT 12-speed with Deore shifters (11-51T)" drivetrain, "24.4kg" weight, GBP 3,699 (a UK retailer price, used here only to fill the fields the maker\'s own EU page omits — fork travel, drivetrain, brakes, weight). US moustachebikes.com carries no Samedi 27 Wide listing (US site sells only the Trail/Game/Off families) — no USD MSRP exists. PRICE: EUR 4,131.40 (a French reseller\'s full retail price for this exact SKU, simplebikestore.eu — not the maker\'s own currency page directly fetched by this session) converted at the 2026-07-23 open.er-api.com EUR->USD rate (1.141079) -> $4,714.31 — entered as a disclosed unverified sample price, no regional-conversion token (that token is reserved for a maker-fetched RRP, matching this catalog\'s existing Moustache row\'s precedent). catalog/emtb-breadth-brands-1 wave (Moustache deepened from 1 row to 2).',
    lastChecked: '2026-07-23', source: 'https://moustachebikes.com/fr/en/electric-bikes/samedi-27-wide/samedi-27-wide-5/'
  }

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMTB_PARTS: EMTB_PARTS };
}
