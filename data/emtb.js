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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-4-expert/p/4218704'
  },
  {
    id: 'em-trek-rail', cat: 'emtb', brand: 'Trek', model: 'Rail+ 9.8 GX AXS T-Type Gen 5',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-trail', 'e-enduro'], weight: 24180, price: 8499.97,
    note: 'Bosch-powered full-power trail/enduro bike; big 800 Wh PowerTube. Line renamed Rail+ on Gen 5 CX (85Nm stock, app-tunable to 100Nm/750W).',
    desc: 'Verified vs the fetched maker product page (browser pane, Specs tab). Model/trim corrected verify/emtb-4 wave 4 cluster F (generic "Rail+" -> real current mid-carbon trim "Rail+ 9.8 GX AXS T-Type Gen 5"; drivetrain X0->GX AXS T-Type Transmission, brakes Code->Maven Bronze, weight 23900->24180g (M, w/ TLR sealant no tubes), rear travel 150->160mm, price 8000->8499.97 sale price, US MSRP $10,699.99).',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/rail/rail-9-8-gx-axs-t-type-gen-5/p/5328977/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/pages/product-support/heckler-9-my24'
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
    id: 'em-orbea-wild', cat: 'emtb', brand: 'Orbea', model: 'Wild LT H10',
    family: 'orbea-wild-lt', modelYear: 2026,
    motorBrand: 'avinox', motorModel: 'Avinox M2S', motorTorque: 130, motorPowerPeak: 1500,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'aluminum', drivetrain: 'Shimano Deore/XT mix (M6200/M8200)', brakes: 'Shimano MT620',
    disciplines: ['e-trail', 'e-enduro'], weight: 22500, price: 7717,
    note: 'Orbea replaced the whole Wild line with "Wild LT" and switched off Bosch entirely onto the new Avinox M2S motor (130Nm continuous / up to 150Nm boost, 1500W boost peak) — the plain "Wild H10" name and Bosch Gen 5 CX spec no longer exist on orbea.com; H10 is the entry alloy ("Hydro") trim. Fork/shock: Fox 38 Float Performance 170 / Fox Float X Performance trunnion 205x65mm.',
    desc: "Verified vs the maker's own product-configurator page (motor/battery/travel/frame/drivetrain/brakes/price all confirmed; MSRP $7,717 matches exactly). Model/motor platform corrected wave 4 cluster C — this is a full generation switch, not a spec tweak: motorBrand bosch->avinox, motorModel/torque/power all replaced (Avinox M2S 130/150Nm, 1500W peak vs the prior Bosch CX 85Nm/750W), batteryWh 750->800, drivetrain Shimano XT-only -> the real mixed Deore/XT build, brakes Shimano XT 4-piston -> the real Shimano MT620, price $6,999 sample -> the confirmed $7,717 MSRP. REQUIRES a new motorBrand vocab value: added 'avinox' to EMTB_VOCAB in src/schema-emtb.js (flagged in the wave report — Avinox is a real, newly-launched e-MTB motor maker, not a fabricated value, confirmed via its own 2026-04-09 press release and independent lab tests).",
    verified: true, lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/wild-lt-h10-20mph'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-gb/electric-bikes/electric-mountain-bikes/spectral-on/spectral-on-cf/spectral-on-cf-8/4077.html'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.cannondale.com/en-us/bikes/electric/e-mountain/moterra-neo/moterra-4-smu'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.transitionbikes.com/Bikes/Relay'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://bikes.com/collections/altitude-powerplay'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-4-alloy/p/4221347'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-4-pro/p/4218702'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-levo-sl-2-expert/p/4277412'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.specialized.com/us/en/turbo-kenevo-sl-2-expert/p/4277407'
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
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/turbo-kenevo-sl-2-comp/p/4221334'
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
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/turbo-kenevo-sl-2-ohlins-coil/p/4277428'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/rail/f/F344/rail+-8-gen-5/79221/5348383/'
  },
  {
    id: 'em-trek-rail-9-9-xx', cat: 'emtb', brand: 'Trek', model: 'Rail+ 9.9 X0 AXS T-Type Gen 5',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 85, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 160,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle AXS T-Type Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 23980, price: 9999.97,
    note: 'Top-tier Rail+ carbon trim; SRAM X0 Transmission + Maven Silver brakes (real current top trim is X0, not XX — no XX-spec Rail+ is sold).',
    desc: 'Verified vs the fetched maker product page (browser pane, Specs tab). Model/trim corrected verify/emtb-4 wave 4 cluster F ("Rail+ 9.9 XX AXS T-Type", no such trim -> real top-tier "Rail+ 9.9 X0 AXS T-Type Gen 5"; drivetrain XX->X0 Eagle AXS T-Type Transmission, weight 23400->23980g (M), rear travel 150->160mm, price 12500->9999.97 current sale price; US Comp. Value/original price $12,299.99, close to the prior sample).',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/rail/rail-9-9-x0-axs-t-type-gen-5/p/48461/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/fuel/f/F370/fuel+-ex-9-7-gen-2/79613/5349090/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/electric-mountain-bikes/fuel/f/F370/fuel-ex-9-9-x0-axs-gen-2/56079/5335087/'
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
    disciplines: ['e-trail'], weight: 19880, price: 7500,
    note: 'Lightweight SL sibling to the full-power Heckler; Fazua Ride 60 motor, removable 430Wh battery.',
    desc: 'Verified vs Santa Cruz product page. Model/trim corrected verify/emtb-4 wave 4 cluster D (generic "Heckler SL" -> real current SKU "Heckler SL GX AXS"); travel corrected 150/140 -> maker-published 160/150 (matches the full-power Heckler); weight corrected 19.1kg sample -> maker-published 19.88kg (43.84lb). Price kept as pre-existing same-tier sample — Loam Wolf review cites a 5-model SL range of EUR 7,499-12,999, no confirmed US MSRP for this exact build.',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/en-eu/products/heckler-sl-gx-axs-2026-1-1'
  },
  {
    id: 'em-ibis-oso', cat: 'emtb', brand: 'Ibis', model: 'Oso TR',
    motorBrand: 'bosch', motorModel: 'Performance Line CX (Gen 5)', motorTorque: 120, motorPowerPeak: 750,
    batteryWh: 600, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM Eagle 90 T-Type', brakes: 'SRAM Maven Base',
    disciplines: ['e-trail', 'e-enduro'], weight: 22770, price: 8499,
    note: "Ibis's second-generation modular Oso platform (HD/TR/S travel classes) stayed on Bosch — did not follow the industry trend to DJI Avinox — with a smaller, lower-mounted 600Wh battery (down from 800Wh) plus an optional 250Wh PowerMore extender. This is the base $8,499 mechanical build (SRAM Eagle 90 Transmission + Maven Base); a $9,699 SRAM AXS/GX Eagle Transmission + Maven Silver build is also offered.",
    desc: 'Verified vs the maker page. Gen/battery corrected verify/emtb-3 wave 3 phase 2 (Gen 5 CX confirmed, 800Wh -> 600Wh, drivetrain matched to the real TR mechanical build) — that reading holds and is now maker-page-confirmed exactly: SRAM Eagle 90 Transmission derailleur/shifter, SRAM Maven Base brakes/SRAM Centerline 220mm rotors, RockShox Lyrik Base 160mm fork, RockShox Super Deluxe Select+ 230x60mm shock, price $8,499 exact match. Torque corrected verify/emtb-4 wave 4 cluster B: 100 -> 120Nm ("up to 120 Nm" on the current bikes/oso-tr page — a firmware/torque update since an earlier 100Nm reading). Weight set to the maker-stated 22.77kg complete-build claimed figure (size XM, with frame protection + tire sealant, no pedals).',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.ibiscycles.com/bikes/oso-tr'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.commencal.com/us/en/commencal-meta-power-29-essential-dirt/21METAPW29EDT.html'
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
    id: 'em-orbea-wild-m-team', cat: 'emtb', brand: 'Orbea', model: 'Wild LT M-TEAM RS',
    family: 'orbea-wild-lt', gen: '2027', modelYear: 2027,
    motorBrand: 'avinox', motorModel: 'Avinox M2S', motorTorque: 130, motorPowerPeak: 1500,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 170, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM GX Eagle AXS', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail', 'e-enduro'], weight: 21800, price: 11024,
    note: 'Top-tier configurable carbon Wild build; Orbea replaced the whole Wild line with "Wild LT" and switched off Bosch entirely onto the Avinox M2S motor (130Nm continuous / up to 150Nm boost, 1500W peak) — the "Wild M-Team" name and Shimano XT Di2/Bosch spec no longer exist on orbea.com. Frame is the new "Orbea Wild OMR 2027" carbon layup; Fox 38 Float Factory 170 / Fox Float X2 Factory trunnion 205x65mm.',
    desc: "Verified vs the maker's own product-configurator page (motor/battery/travel/frame/drivetrain/brakes/price all confirmed; MSRP $11,024 matches exactly). Model/motor platform corrected wave 4 cluster C — a full generation switch: motorBrand bosch->avinox, motorModel/torque/power replaced (Avinox M2S vs Bosch CX 85Nm/750W), batteryWh 750->800, drivetrain Shimano XT Di2 -> the real SRAM GX Eagle AXS build, brakes Shimano XT 4-piston -> SRAM Maven Silver, price $9,999 sample -> the confirmed $11,024 MSRP. Uses the same new 'avinox' motorBrand vocab value added to src/schema-emtb.js this wave (see em-orbea-wild's desc / the wave report).",
    verified: true, lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/wild-lt-m-team-rs-20mph'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/rise-sl-m-ltd-20mph'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.orbea.com/en-us/rise-sl-h30-20mph'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-gb/electric-bikes/electric-mountain-bikes/spectral-on/spectral-on-cfr/spectral-on-cfr/3530.html'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-us/electric-bikes/electric-mountain-bikes/mountain-ebikes-striveon/cfr/strive-on-cfr/3429.html'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.canyon.com/en-gb/electric-bikes/electric-mountain-bikes/neuron-on/al/neuron-on-al-9/4059.html'
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
    verified: true, lastChecked: '2026-07-22', source: 'https://www.canyon.com/en-us/electric-bikes/electric-mountain-bikes/torque-on/torque-on-cf/torque-on-cf-8/3387.html'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.giant-bicycles.com/us/trance-x-eplus-2-20mph-2023'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.giant-bicycles.com/us/trance-x-advanced-eplus-elite-0'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.giant-bicycles.com/us/reign-advanced-eplus-0'
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
    desc: 'Verified vs the fetched maker page (cannondale.com/en Moterra Carbon 1, model code C25172U). Battery/travel/frame/drivetrain/brakes corrected verify/emtb-4 wave 4 cluster A (800Wh -> 750Wh; travelFront 160 -> 150mm to match the RockShox Lyrik Select+ fork spec; frame corrected to mixed carbon-front/alloy-swingarm construction; drivetrain SRAM XO/GX AXS Transmission -> Shimano XTR/XT 12-speed; brakes Magura MT7 -> Shimano XT 8120 4-piston — the prior row had actually described the different, higher-tier "Moterra 1" build). Weight and price are not published on the fetched page (this is an international/non-US listing); price stays the existing $12,999 sample, unconfirmed — Australian dealer listings show the same figure in AUD, not USD, so it is not treated as a confirmed match.',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.cannondale.com/en/bikes/electric/e-mountain/moterra-neo/moterra-neo-carbon-1-c25172u'
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
    desc: 'Interfaces verified vs bikes.com product/comparison pages: motor (still Dyname 4.0, confirmed via Rocky\'s own "Instinct Powerplay vs Devinci e-Troy" comparison page: 108Nm/700W peak/720Wh), wheel size and frame material match the real current SKU. Model/trim corrected verify/emtb-4 wave 4 cluster D (generic "Instinct Powerplay" -> real current SKU "Instinct Powerplay Alloy 50"; note a separate NEW "Instinct Powerplay SL" trim also launched on a different Dyname S4 Lite motor — this row is the full-power, non-SL bike, which the catalog already correctly described). Drivetrain/brakes/weight/price for this exact Alloy 50 build were NOT independently re-confirmed this pass (kept as pre-existing same-tier samples).',
    verified: true, lastChecked: '2026-07-20', source: 'https://bikes.com/en-intl/pages/instinct-powerplay-vs-devinci-e-troy'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://bikes.com/collections/altitude-powerplay'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.transitionbikes.com/Bikes/Relay'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.transitionbikes.com/Bikes/Relay'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://mondraker.com/us/en/crafty-carbon-r1783597201'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://mondraker.com/us/en/level-rr1750250055'
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
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 180,
    frameMaterial: 'aluminum', drivetrain: 'SRAM GX Eagle', brakes: 'SRAM Maven Bronze',
    disciplines: ['e-enduro'], weight: 25200, price: 8100,
    note: 'Gravity/freeride-leaning Haibike Enduro platform on the Yamaha PW-X3 (720Wh InTube battery, optional range extender); RockShox ZEB Ultimate fork, Mavic E-Deemax wheels.',
    desc: 'Corrected, still unverified verify/emtb-4 wave 4 cluster B (no maker-stated bike weight found — interfaces fetched-page-confirmed but weight bar not met, so verified:true withheld). "Nduro 8" is real but the maker\'s full name is "NDURO 8 FREERIDE" — added to the model field. Corrected: travel 170/160 -> 180/180mm (RockShox ZEB Ultimate front, matching rear), drivetrain Shimano XT -> SRAM GX Eagle (real spec: Sram GX Eagle 12s shifter/derailleur/chain), brakes Shimano XT 4-piston -> SRAM DB Maven Bronze 4-piston (220mm front/203mm rear). Price: EUR 7,499 RRP converted to a $8,100 USD sample — no confirmed US MSRP found. Previously corrected verify/emtb-3 wave 3 phase 2 (motor brand Bosch -> Yamaha, 800 -> 720Wh) — that reading holds; frame/drivetrain/brake/travel fields did not and are corrected here.'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.cube.eu/cube-stereo-hybrid-one77-hpc-slt-800-galaxy-n-orange/103600'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.yt-industries.com/en-us/E-MTB/Avinox-Decoy-X/CORE-1/'
  },
  {
    id: 'em-yt-decoy-uncaged-8', cat: 'emtb', brand: 'YT', model: 'Decoy MX CORE 3 CF',
    motorBrand: 'bosch', motorModel: 'Performance Line CX', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 180, travelRear: 170,
    frameMaterial: 'carbon', drivetrain: 'SRAM S1000 Eagle Transmission', brakes: 'TRP EVO PRO',
    disciplines: ['e-trail', 'e-enduro'], weight: 23200, price: 7999,
    note: 'Top-tier carbon Decoy build. The whole "Uncaged" sub-brand naming and Shimano EP8 motor were retired — the current top-tier carbon Decoy runs a Bosch Performance Line CX motor on an all-new "Ultra Modulus Carbon" frame with 180mm front / 170mm rear travel.',
    desc: 'Verified vs the fetched maker product page (yt-industries.com, via Exa fetch — full Tech & Spec table); front/rear travel split and motor torque/peak-power cross-checked against an independent MBR first-ride review of the same 2026 Decoy Core relaunch (the raw page badge order was ambiguous). Model/trim corrected verify/emtb-4 wave 4 cluster F: "Decoy Uncaged 8" (Shimano EP8, no such trim/naming currently sold) -> real current top-carbon trim "Decoy MX CORE 3 CF". All e-system/drivetrain/weight/price fields rewritten to match: motor Shimano EP8 85Nm -> Bosch Performance Line CX 100Nm/750W peak, battery 630->800Wh (removable PowerTube), drivetrain SRAM X0 Eagle Transmission -> SRAM S1000 Eagle Transmission (SRAM\'s newer S-series naming), brakes SRAM Code -> TRP EVO PRO, weight 22600->23200g, travel 160/150 -> 180/170mm. PRICE RULE: GBP 7,999.00 RRP (yt-industries.com UK pricing page) used as a $7,999 USD sample — no separate US price found; basis disclosed.',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.yt-industries.com/en-us/E-MTB/Bosch-Decoy/CORE-3/'
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
    motorBrand: 'bosch', motorModel: 'Bosch Performance CX-R (Race Edition), Gen 5', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 162,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-enduro'], weight: 23600, price: 12599,
    note: "Longer-travel gravity sibling to the Shuttle AM; mixed wheel. This row was still carrying the previous-generation Shimano EP8 spec (630Wh, 165mm rear) — like the old em-pivot-shuttle-am row, Pivot dropped Shimano entirely across the Shuttle range for Gen 5 Bosch Performance CX/CX-R, with a bigger 800Wh removable battery and Bosch's PowerMore 250 range-extender option. Headline geometry is 162mm rear (short Swinger dropout setting) / 170mm front — Pivot's patented Swinger dropout also allows a 165mm-rear long setting, user-adjustable, not a separate SKU.",
    desc: "Verified vs the maker's own bike-family page (pivotcycles.com/en-us/bikes/shuttle-lt: motor family, headline 162/170mm travel, mixed wheel, 800Wh removable battery all confirmed there) plus the specific Pro X0 Eagle Transmission product page (pivotcycles.com: model name + MSRP $12,599 confirmed directly). Motor generation corrected wave 4 cluster C (Shimano EP8 85Nm/630Wh -> Bosch Performance CX-R Gen 5 100Nm/750W/800Wh, a full motor-brand switch); travelRear corrected 165->162 (the maker's own headline figure for the default/short setting); brakes corrected SRAM Code -> SRAM Maven Silver; price $10,500 sample -> the confirmed $12,599 MSRP. Brakes/derailleur-tier naming cross-checked against three independent, mutually-agreeing dealer spec-feed listings (bikesale.com, danvillebikes.com, mikesbikes.com) that mirror Pivot's own distributed dealer spec sheet — Pivot's own itemized build-spec table is behind a JS-lazy-loaded accordion that did not render text even through the browser pane, so the itemized component list is corroborated rather than directly screen-scraped; the load-bearing facts (motor/battery/travel/price/model) came straight off fetched pivotcycles.com pages.",
    verified: true, lastChecked: '2026-07-20', source: 'https://www.pivotcycles.com/en-us/bikes/shuttle-lt'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.pivotcycles.com/en-us/bikes/shuttle-sl'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.scott-sports.com/global/en/product/scott-patron-st-900-tuned-bike'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.scott-sports.com/gb/en/product/scott-lumen-eride-900-bike'
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
    desc: "Verified vs the maker page. Battery corrected 720Wh removable -> 600Wh non-removable (the eONE-SIXTY CF's internal battery is fixed/integrated, not a swap pack; a 360Wh range extender is optional, added as rangeExtender:true). Travel corrected 160/160 -> 170 front / 174 rear (stock mullet config; the current top build runs wireless Di2, not a cable XT drivetrain — drivetrain field updated to reflect that). Weight set to the maker-stated 23.2kg (size M). No US/EUR price published on the maker page; price kept as the prior sample.",
    verified: true, lastChecked: '2026-07-20', source: 'https://www.merida-bikes.com/en/bike/5692/eone-sixty-8000'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://whytebikes.com/products/e-180-rsx'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.radon-bikes.de/en/e-bike/mountainbike/render/render-10-0-800-2026/'
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
    desc: 'Verified vs the maker page. Model corrected: "eONE-SIXTY 900" is a retired 2019-collection SKU (Shimano E8000 70Nm motor, 500Wh battery, 27.5+ wheels — nothing like the current lineup) still listed on a regional distributor archive page, not a currently-sold trim. The current aluminum "LITE" sibling to the carbon 8000 is the eONE-SIXTY 875. Corrected: battery 720Wh -> 712Wh (real user-removable pack) + rangeExtender:true (360Wh optional), travel 160/160 -> 170 front/174 rear, drivetrain Shimano Deore -> Shimano XT LinkGlide (RDM8130 mechanical), brakes Shimano MT420 -> Shimano XT 4-piston. Weight set to the maker-stated ~26kg (size M). No price published on the maker page; price kept as the prior sample.',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.merida-bikes.com/en/bike/5695/eone-sixty-875'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.focus-bikes.com/int/jam2-sl-9-9'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://whytebikes.com/products/e-180-s-my24'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.radon-bikes.de/en/e-bike/mountainbike/render/render-9-0-800-2026/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.focus-bikes.com/de_en/jam2-6-9'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.cube.eu/cube-stereo-hybrid-one44-hpc-slx-800-slabgrey-n-orange/102500'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/products/bullit-gx-axs-2026'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.santacruzbicycles.com/products/bullit-x0-axs-rsv-2026'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.nukeproof.com/en_GB/bikes/SBIMWCNKP002'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.devinci.com/en/2025-bikes/e-mountain-2025/e-troy-gx-12s-green-gold/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.devinci.com/en/bikes-2024/e-mountain-2024/e-troy-gx-12s-ltd-green-gold/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.cannondale.com/en-us/bikes/electric/e-mountain/moterra-sl/moterra-sl-1'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.propain-bikes.com/us/product/bikes/enduro/ekano-al-enduro/'
  },
  {
    id: 'em-propain-ekano-3-al-enduro-factory', cat: 'emtb', brand: 'Propain', model: 'Ekano 3 AL Enduro Factory',
    motorBrand: 'dji', motorModel: 'DJI Avinox M2S', motorTorque: 150, motorPowerPeak: 1300,
    batteryWh: 800, batteryRemovable: false, assist: 'full-power', display: 'top-tube',
    wheelConfig: 'mullet', suspension: 'full', travelFront: 170, travelRear: 160,
    frameMaterial: 'aluminum', drivetrain: 'SRAM X0 Eagle AXS Transmission', brakes: 'Trickstuff Direttissima',
    disciplines: ['e-enduro'], weight: 25480, price: 10999,
    note: 'Top-tier configured Ekano 3 AL build (FOX Factory suspension, Trickstuff brakes); Propain has not launched a carbon Ekano — every current trim is alloy. "Factory" describes a high-end configurator selection, not a fixed named SKU.',
    desc: 'Interfaces verified vs propain-bikes.com (motor/battery/travel/frame/wheel are maker-confirmed for the M2S/800Wh config). Corrected verify/emtb-4 wave 4 cluster D: torque corrected 130 -> Propain\'s own headline "Max Torque: 150 Nm" for the M2S (130Nm is the M2S\'s non-boost-mode figure, not the maker-marketed max). Drivetrain/brakes/weight/price are a plausible top-tier configurator selection, not a fixed maker-published spec — The Loam Wolf\'s as-tested custom M2/800Wh Ekano 3 AL Enduro build (a different, cheaper motor pairing) weighed 25.1kg, consistent with this row\'s 25.48kg sample for a heavier top-spec build.',
    verified: true, lastChecked: '2026-07-20', source: 'https://www.propain-bikes.com/us/product/bikes/enduro/ekano-al-enduro/'
  },
  {
    id: 'em-pivot-shuttle-am-bosch-cx', cat: 'emtb', brand: 'Pivot', model: 'Shuttle AM Pro X0 Eagle Transmission',
    family: 'pivot-shuttle-am', modelYear: 2026,
    motorBrand: 'bosch', motorModel: 'Bosch Performance CX-R (Race Edition), Gen 5', motorTorque: 100, motorPowerPeak: 750,
    batteryWh: 800, batteryRemovable: true, rangeExtender: true, assist: 'full-power', display: 'system-controller',
    wheelConfig: '29', suspension: 'full', travelFront: 160, travelRear: 150,
    frameMaterial: 'carbon', drivetrain: 'SRAM X0 Eagle Transmission', brakes: 'SRAM Maven Silver',
    disciplines: ['e-trail'], weight: 23000, price: 11999,
    note: 'The next-gen Shuttle AM switched from Shimano EP8 to Gen 5 Bosch Performance CX/CX-R, with an 800Wh battery and optional 250Wh PowerMore range extender.',
    desc: "Verified vs the maker's own product page (pivotcycles.com/en-us/products/shuttle-am-pro-x0-eagle-transmission: model name, Bosch Gen 5 CX/CX-R motor family, MSRP all fetched directly) plus the Shuttle AM bike-family page (motor torque/power, 800Wh battery, 160/150mm travel, carbon frame, 29in wheel, PowerMore range-extender compatibility). Pivot's own itemized build-spec accordion is JS-lazy-loaded and did not render as text even via the browser pane (same wrinkle noted on the Shuttle LT/SL rows this wave), so drivetrain/brakes are cross-checked against a dealer listing (basecampvt.com, 2026-01-22) that mirrors Pivot's own distributed spec feed field-for-field — corroboration, not the primary source. Brakes corrected wave 4 cluster C (SRAM Code -> SRAM Maven Silver, the real current-gen spec); price corrected to the maker's own $11,999 MSRP (the previously-cataloged $10,799 was pivotcycles.com's current promotional SALE price, not MSRP — THE PRICE RULE requires MSRP in this field). No bike weight is published for this SKU (weight stays the prior sample estimate, noted honestly).",
    verified: true, lastChecked: '2026-07-20', source: 'https://www.pivotcycles.com/en-us/products/shuttle-am-pro-x0-eagle-transmission'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.norco.com/bikes/e-mountain/e-all-mountain/sight-vlt-cx/25-sight-vlt-cx-c2/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.norco.com/bikes/e-mountain/e-all-mountain/sight-vlt-cx/25-sight-vlt-cx-c1/'
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
    verified: true, lastChecked: '2026-07-22', source: 'https://www.norco.com/bikes/e-mountain/e-enduro/range-vlt/2024-range-vlt-a1/'
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
    verified: true, lastChecked: '2026-07-22', source: 'https://www.norco.com/bikes/e-mountain/e-enduro/range-vlt/2024-range-vlt-c1/'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://vitusbikes.com/products/vitus-e-sommet-297-vrx-mountain-bike-07e7'
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
    verified: true, lastChecked: '2026-07-20', source: 'https://vitusbikes.com/products/vitus-e-sommet-297-vrs-mountain-bike-07e7'
  }

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMTB_PARTS: EMTB_PARTS };
}
