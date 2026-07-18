// data/road.js — Road catalog (OFF-LIVE research/build)
//
// Version: 0.1.0  |  Date: 2026-07-17
//
// *** OFF-LIVE. *** Loaded by NOTHING the site serves. No engine file
// (src/compat-road.js) or schema (src/schema-road.js) exists yet — this is
// data-only, built per data/ROAD-MODEL.md's slot/category/vocab draft
// (that doc is the authority for the shape below; do not widen its vocab
// solo — log gaps instead, see the header note near the bottom).
//
// DISC-ONLY v1 per ROAD-MODEL.md section 6 decision #2 recommendation
// (rim-brake road excluded entirely from this file).
//
// Plain browser JavaScript, no build step, no imports/exports beyond the
// Node export guard at the bottom — same convention as data/bmx.js.
//
// PROVENANCE: unverified rows are real, currently-or-recently-sold products
// with best-credible-source specs (never fabricated — every id below names
// a real part) per the catalog's relaxed inclusion policy. Rows carrying
// verified:true were confirmed against a FETCHED manufacturer/official
// product page on 2026-07-17 (WebFetch / Exa; noted per-row where a figure
// was corroborated via a retailer/test-house relaying the maker's own
// published number, e.g. Continental's per-width spec weights).
//
// NO E-BIKES anywhere in this file.

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------
var ROAD_PARTS = [

  // ===== FRAMES (frameOnly framesets, disc, 700c) =========================
  {
    id: 'fr-specialized-sworks-tarmac-sl8', cat: 'frame', brand: 'Specialized', model: 'S-Works Tarmac SL8 Frameset',
    family: 'specialized-tarmac-sl8', gen: 'SL8', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bsa-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 685, price: 4700,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.specialized.com/us/en/s-works-tarmac-sl8-frameset-fact-12r-carbon/p/216956',
    note: 'Fetched: "685g frame", "12x142mm thru-axle, flat-mount disc", "Threaded BB", "32mm tire clearance". BB shell token (bsa-road) inferred from "Threaded BB" wording per DATA-ENTRY-TEMPLATE mfr-wording mapping; not spelled out as BSA verbatim on this page — flagged.'
  },
  {
    id: 'fr-specialized-tarmac-sl8', cat: 'frame', brand: 'Specialized', model: 'Tarmac SL8 Frameset',
    family: 'specialized-tarmac-sl8', gen: 'SL8', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bsa-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 780, price: 3200,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.specialized.com/us/en/tarmac-sl8-frameset-fact-10r-carbon/p/216957',
    note: 'Fetched: "780g frame", "12x142mm thru-axle, flat-mount disc", "Threaded BB", "32mm tire clearance", FACT 10r carbon (vs S-Works FACT 12r).'
  },
  {
    id: 'fr-specialized-roubaix-expert', cat: 'frame', brand: 'Specialized', model: 'Roubaix Expert Frameset',
    family: 'specialized-roubaix', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bsa-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 33, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 990, price: 2400
  },
  {
    id: 'fr-specialized-allez', cat: 'frame', brand: 'Specialized', model: 'Allez',
    family: 'specialized-allez', modelYear: 2024, disciplines: ['road'], material: 'alu',
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bsa-road', seatpost: '27.2', steerer: 'tapered', maxTire: 30, frontDerailleurMount: 'braze-on',
    frameOnly: false, weight: 1450, price: 1200
  },
  {
    id: 'fr-trek-emonda-slr', cat: 'frame', brand: 'Trek', model: 'Émonda SLR Frameset',
    family: 'trek-emonda-slr', modelYear: 2024, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb90-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 28, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 698, price: 4000
  },
  {
    id: 'fr-trek-domane-slr', cat: 'frame', brand: 'Trek', model: 'Domane SLR Frameset',
    family: 'trek-domane-slr', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb90-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 38, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 990, price: 3500,
    note: 'IsoSpeed decoupler frame; maxTire=38mm reflects Domane\'s wide-clearance endurance geometry (search-summary figure, not fetched — flagged for verification pass).'
  },
  {
    id: 'fr-trek-madone-slr', cat: 'frame', brand: 'Trek', model: 'Madone SLR Frameset',
    family: 'trek-madone-slr', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb90-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 28, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 900, price: 4300
  },
  {
    id: 'fr-canyon-ultimate-cfslx', cat: 'frame', brand: 'Canyon', model: 'Ultimate CF SLX Frameset',
    family: 'canyon-ultimate', modelYear: 2024, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 780, price: 3000
  },
  {
    id: 'fr-canyon-endurace-cfslx', cat: 'frame', brand: 'Canyon', model: 'Endurace CF SLX Frameset',
    family: 'canyon-endurace', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 35, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 890, price: 2600
  },
  {
    id: 'fr-canyon-aeroad-cfr', cat: 'frame', brand: 'Canyon', model: 'Aeroad CFR Frameset',
    family: 'canyon-aeroad', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 30, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 830, price: 4500
  },
  {
    id: 'fr-cannondale-supersix-evo', cat: 'frame', brand: 'Cannondale', model: 'SuperSix EVO Frameset',
    family: 'cannondale-supersix', modelYear: 2024, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb30a', seatpost: 'proprietary', steerer: 'tapered', maxTire: 30, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 800, price: 3200
  },
  {
    id: 'fr-cannondale-synapse', cat: 'frame', brand: 'Cannondale', model: 'Synapse Carbon Frameset',
    family: 'cannondale-synapse', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb30a', seatpost: 'proprietary', steerer: 'tapered', maxTire: 35, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 970, price: 2400
  },
  {
    id: 'fr-giant-tcr-advsl', cat: 'frame', brand: 'Giant', model: 'TCR Advanced SL Frameset',
    family: 'giant-tcr', modelYear: 2024, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'pf86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 790, price: 3900
  },
  {
    id: 'fr-giant-defy-adv', cat: 'frame', brand: 'Giant', model: 'Defy Advanced Frameset',
    family: 'giant-defy', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'pf86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 35, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 970, price: 2400
  },

  // ===== FORKS (rigid, travel:0 per ROAD-MODEL uniform-field convention) ==
  { id: 'fk-specialized-tarmac-sl8', cat: 'fork', brand: 'Specialized', model: 'Tarmac SL8 Fork', family: 'specialized-tarmac-sl8',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 370, price: 450 },
  { id: 'fk-specialized-roubaix', cat: 'fork', brand: 'Specialized', model: 'Roubaix Future Shock Fork', family: 'specialized-roubaix',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 33, travel: 0,
    weight: 420, price: 500 },
  { id: 'fk-trek-emonda-slr', cat: 'fork', brand: 'Trek', model: 'Émonda SLR Fork', family: 'trek-emonda-slr',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 28, travel: 0,
    weight: 350, price: 480 },
  { id: 'fk-trek-domane-slr', cat: 'fork', brand: 'Trek', model: 'Domane SLR IsoSpeed Fork', family: 'trek-domane-slr',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 38, travel: 0,
    weight: 400, price: 500 },
  { id: 'fk-trek-madone-slr', cat: 'fork', brand: 'Trek', model: 'Madone SLR Fork', family: 'trek-madone-slr',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 28, travel: 0,
    weight: 390, price: 520 },
  { id: 'fk-canyon-ultimate-cfslx', cat: 'fork', brand: 'Canyon', model: 'Ultimate CF SLX Fork', family: 'canyon-ultimate',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 365, price: 400 },
  { id: 'fk-canyon-aeroad-cfr', cat: 'fork', brand: 'Canyon', model: 'Aeroad CFR Fork', family: 'canyon-aeroad',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 30, travel: 0,
    weight: 410, price: 480 },
  { id: 'fk-cannondale-supersix-evo', cat: 'fork', brand: 'Cannondale', model: 'SuperSix EVO Fork', family: 'cannondale-supersix',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 30, travel: 0,
    weight: 380, price: 420 },
  { id: 'fk-giant-tcr-advsl', cat: 'fork', brand: 'Giant', model: 'TCR Advanced SL Fork', family: 'giant-tcr',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 375, price: 400 },
  { id: 'fk-giant-defy-adv', cat: 'fork', brand: 'Giant', model: 'Defy Advanced Fork', family: 'giant-defy',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 35, travel: 0,
    weight: 410, price: 420 },

  // ===== WHEELS (front/rear rows, disc, Center-Lock unless noted) ========
  { id: 'fw-zipp-303-firecrest-tld', cat: 'frontwheel', brand: 'Zipp', model: '303 Firecrest Tubeless Disc (WH-303-FTLD-A1)', family: 'zipp-303-firecrest',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 25, maxTire: 55,
    weight: 704, price: 900,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.sram.com/en/zipp/models/wh-303-ftld-a1',
    note: 'Fetched sram.com model page: "Rim - inside width 25mm", "Brake compatibility Disc (Center Lock)", "Weight (g) 1408" (wheelset total, lightest XDR/12mm-axle config, no tape/valve). Per-wheel weight here is an EVEN SPLIT of that total (704/704) — the page does not publish a front/rear breakdown, so the split itself is not a maker-stated fact, only the total is.' },
  { id: 'rw-zipp-303-firecrest-tld', cat: 'rearwheel', brand: 'Zipp', model: '303 Firecrest Tubeless Disc (WH-303-FTLD-A1)', family: 'zipp-303-firecrest',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 25, maxTire: 55,
    weight: 704, price: 900,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.sram.com/en/zipp/models/wh-303-ftld-a1',
    note: 'Same source/caveat as the front row. Driver body per page: "n/a, SRAM XDR, SRAM/Shimano Road" — XDR modeled here (the SRAM-native option); Shimano HG-L2 and Campagnolo drivers are also sold for this hubset per the linked Zipp wheel/hub spec PDF, not modeled as separate rows this pass (GAP).' },
  { id: 'fw-zipp-404-firecrest', cat: 'frontwheel', brand: 'Zipp', model: '404 Firecrest Tubeless Disc (WH-404-FTLD-B1)', family: 'zipp-404-firecrest',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 35,
    weight: 780, price: 1600,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/zipp/models/wh-404-ftld-b1',
    note: 'Fetched sram.com model page: 58mm rim depth, 23mm internal / 28mm external width, Center Lock, XDR/SRAM-Shimano-Road/n-a drivers, ISO/TSS 28-35c tubeless-compatible tires. Weight (g) 1559 total wheelset (lightest 12mm-axle/XDR config, no tape/valve) — no front/rear split published; this row estimates 780/779 off the 303 Firecrest\'s measured ~45/55 front/rear bias (rear carries more mass at the hub), not an even split.' },
  { id: 'rw-zipp-404-firecrest', cat: 'rearwheel', brand: 'Zipp', model: '404 Firecrest Tubeless Disc (WH-404-FTLD-B1)', family: 'zipp-404-firecrest',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 35,
    weight: 779, price: 1600,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/zipp/models/wh-404-ftld-b1',
    note: 'Same source/caveat as the front row.' },
  { id: 'fw-dtswiss-arc1100-dicut', cat: 'frontwheel', brand: 'DT Swiss', model: 'ARC 1100 DICUT 50', family: 'dtswiss-arc1100',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 45,
    weight: 730, price: 1350 },
  { id: 'rw-dtswiss-arc1100-dicut', cat: 'rearwheel', brand: 'DT Swiss', model: 'ARC 1100 DICUT 50', family: 'dtswiss-arc1100',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 45,
    weight: 850, price: 1350 },
  { id: 'fw-roval-rapide-clx-ii', cat: 'frontwheel', brand: 'Roval', model: 'Rapide CLX II', family: 'roval-rapide-clx',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 42,
    weight: 675, price: 2500 },
  { id: 'rw-roval-rapide-clx-ii', cat: 'rearwheel', brand: 'Roval', model: 'Rapide CLX II', family: 'roval-rapide-clx',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 42,
    weight: 815, price: 2500 },
  { id: 'fw-hunt-3648-aerodynamicist', cat: 'frontwheel', brand: 'HUNT', model: '36/48 Aerodynamicist Carbon Disc', family: 'hunt-3648-aero',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 45,
    weight: 750, price: 900 },
  { id: 'rw-hunt-3648-aerodynamicist', cat: 'rearwheel', brand: 'HUNT', model: '36/48 Aerodynamicist Carbon Disc', family: 'hunt-3648-aero',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 45,
    weight: 890, price: 900 },
  { id: 'fw-shimano-c50-r9270', cat: 'frontwheel', brand: 'Shimano', model: 'Dura-Ace WH-R9270-C50', family: 'shimano-r9270',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 690, price: 2000 },
  { id: 'rw-shimano-c50-r9270', cat: 'rearwheel', brand: 'Shimano', model: 'Dura-Ace WH-R9270-C50', family: 'shimano-r9270',
    wheel: '700c', hub: '12x142', freehub: 'hg-l2', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 800, price: 2000 },

  // ===== TIRES (mm width; front & rear both draw from cat:'tire') ========
  { id: 'ti-continental-gp5000stre-25', cat: 'tire', brand: 'Continental', model: 'Grand Prix 5000 S TR 25c', family: 'continental-gp5000stre',
    wheel: '700c', width: 25, tubeless: true, compound: 'BlackChili',
    weight: 250, price: 85,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.continental-tires.com/us/en/products/bicycle/tires/grand-prix-5000-s-tr/',
    note: 'Width/weight per Continental\'s own PN-sheet spec numbers (250g @ 25-622), corroborated via retailer/test-house tables (Cambrian Tyres SRP sheet PN 0101866; Bicycle Rolling Resistance "Specified weight 250 grams") that both cite Continental\'s published figures rather than an independent measurement.' },
  { id: 'ti-continental-gp5000stre-28', cat: 'tire', brand: 'Continental', model: 'Grand Prix 5000 S TR 28c', family: 'continental-gp5000stre',
    wheel: '700c', width: 28, tubeless: true, compound: 'BlackChili',
    weight: 280, price: 85,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.continental-tires.com/us/en/products/bicycle/tires/grand-prix-5000-s-tr/',
    note: 'Same source/caveat as the 25c row (PN 0101867, specified 280g @ 28-622).' },
  { id: 'ti-continental-gp5000stre-32', cat: 'tire', brand: 'Continental', model: 'Grand Prix 5000 S TR 32c', family: 'continental-gp5000stre',
    wheel: '700c', width: 32, tubeless: true, compound: 'BlackChili',
    weight: 320, price: 90,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.continental-tires.com/us/en/products/bicycle/tires/grand-prix-5000-s-tr/',
    note: 'Same source/caveat (PN 0101869, specified 320g @ 32-622).' },
  { id: 'ti-vittoria-corsapro-tlr-26', cat: 'tire', brand: 'Vittoria', model: 'Corsa Pro TLR 26c', family: 'vittoria-corsapro',
    wheel: '700c', width: 26, tubeless: true, compound: 'Graphene 2.0',
    weight: 260, price: 95 },
  { id: 'ti-vittoria-corsapro-tlr-28', cat: 'tire', brand: 'Vittoria', model: 'Corsa Pro TLR 28c', family: 'vittoria-corsapro',
    wheel: '700c', width: 28, tubeless: true, compound: 'Graphene 2.0',
    weight: 290, price: 95 },
  { id: 'ti-pirelli-pzero-race-26', cat: 'tire', brand: 'Pirelli', model: 'P Zero Race TLR 26c', family: 'pirelli-pzero-race',
    wheel: '700c', width: 26, tubeless: true, compound: 'SmartEVO',
    weight: 255, price: 80 },
  { id: 'ti-pirelli-pzero-race-28', cat: 'tire', brand: 'Pirelli', model: 'P Zero Race TLR 28c', family: 'pirelli-pzero-race',
    wheel: '700c', width: 28, tubeless: true, compound: 'SmartEVO',
    weight: 290, price: 80 },
  { id: 'ti-schwalbe-proone-tle-28', cat: 'tire', brand: 'Schwalbe', model: 'Pro One TLE 28c', family: 'schwalbe-proone',
    wheel: '700c', width: 28, tubeless: true, compound: 'Addix Race',
    weight: 285, price: 80 },
  { id: 'ti-schwalbe-proone-tle-30', cat: 'tire', brand: 'Schwalbe', model: 'Pro One TLE 30c', family: 'schwalbe-proone',
    wheel: '700c', width: 30, tubeless: true, compound: 'Addix Race',
    weight: 310, price: 80 },
  { id: 'ti-goodyear-eaglef1-r-28', cat: 'tire', brand: 'Goodyear', model: 'Eagle F1 R Tubeless 28c', family: 'goodyear-eaglef1-r',
    wheel: '700c', width: 28, tubeless: true, compound: 'Dynamic:GSR',
    weight: 290, price: 75 },
  { id: 'ti-goodyear-eaglef1-r-32', cat: 'tire', brand: 'Goodyear', model: 'Eagle F1 R Tubeless 32c', family: 'goodyear-eaglef1-r',
    wheel: '700c', width: 32, tubeless: true, compound: 'Dynamic:GSR',
    weight: 330, price: 80 },

  // ===== DRIVETRAIN — SRAM RED AXS (2x12, wireless) ========================
  { id: 'sh-sram-red-axs', cat: 'shifter', brand: 'SRAM', model: 'RED AXS Shifter/Brake Lever (pair)', family: 'sram-red-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 370, price: 1250 },
  { id: 'rd-sram-red-axs', cat: 'rearderailleur', brand: 'SRAM', model: 'RED AXS Rear Derailleur', family: 'sram-red-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    weight: 370, price: 800 },
  { id: 'cs-sram-red-xg1290-1033', cat: 'cassette', brand: 'SRAM', model: 'RED XG-1290 10-33', family: 'sram-red-xg1290',
    system: 'sram-axs-road', speeds: 12, freehub: 'xdr', minCog: 10, maxCog: 33,
    weight: 180, price: 450,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1290-e1' },
  { id: 'ch-sram-red-flattop', cat: 'chain', brand: 'SRAM', model: 'RED Flattop', family: 'sram-red-flattop',
    system: 'flattop', speeds: 12,
    weight: 249, price: 130,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cn-red-e1',
    note: '249g quoted for 114-link (12-speed) configuration.' },
  { id: 'cr-sram-red-axs-crank', cat: 'crankset', brand: 'SRAM', model: 'RED AXS Crankset', family: 'sram-red-axs-crank',
    bb: 'dub', chainrings: '2x', ring: '48/35', ringStd: 't-type', speeds: 12, chainline: 45,
    weight: 545, price: 700,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/fc-red-e1',
    note: '545g quoted for 172.5mm crank length, 48/35T chainrings, DUB spindle.' },
  { id: 'br-sram-red-axs', cat: 'brake', brand: 'SRAM', model: 'RED AXS HRD Caliper (pair)', family: 'sram-red-axs-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-red-axs',
    weight: 320, price: 400 },
  { id: 'ro-sram-paceline-160', cat: 'rotor', brand: 'SRAM', model: 'Paceline 160mm', family: 'sram-paceline',
    size: 160, mount: 'center-lock',
    weight: 208, price: 100 },

  // ===== DRIVETRAIN — SRAM Force AXS (2x12, wireless) =====================
  { id: 'sh-sram-force-axs', cat: 'shifter', brand: 'SRAM', model: 'Force AXS Shifter/Brake Lever (pair)', family: 'sram-force-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 400, price: 900,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.sram.com/en/sram/models/gs-frc-e-e1',
    note: 'Groupset model page fetched (per-part weight not itemized there); support.sram.com article corroborates a 2776g full 2x groupset weight for Force AXS in a Thread Mount / 48-35 / 10-30 config. This shifter row\'s own weight is a sample estimate, not read off either fetched page — flagged.' },
  { id: 'rd-sram-force-axs', cat: 'rearderailleur', brand: 'SRAM', model: 'Force AXS Rear Derailleur', family: 'sram-force-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    weight: 328, price: 500,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rd-frc-e-d2',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'Max tooth (36) and 2x/12-speed config confirmed on the fetched sram.com model page (no weight listed there — SRAM road model pages omit component weights, per the RED/Force pattern already noted elsewhere in this file). Weight is BikeRadar\'s independently-weighed 328g including AXS battery.' },
  { id: 'cs-sram-force-xg1270-1030', cat: 'cassette', brand: 'SRAM', model: 'Force XG-1270 10-30', family: 'sram-force-xg1270',
    system: 'sram-axs-road', speeds: 12, freehub: 'xdr', minCog: 10, maxCog: 30,
    weight: 350, price: 250 },
  { id: 'ch-sram-force-flattop', cat: 'chain', brand: 'SRAM', model: 'Force Flattop', family: 'sram-force-flattop',
    system: 'flattop', speeds: 12,
    weight: 242, price: 75,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1270-e1',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'Weight is BikeRadar\'s independently-weighed 242g for the Force AXS Flattop chain (the "Chain Technology: Road Flattop D1/E1" cross-reference is confirmed on the fetched cassette model page, which is the only Force-family page that names it).' },
  { id: 'cr-sram-force-axs-crank', cat: 'crankset', brand: 'SRAM', model: 'Force AXS Crankset', family: 'sram-force-axs-crank',
    bb: 'dub', chainrings: '2x', ring: '48/35', ringStd: 't-type', speeds: 12, chainline: 45,
    weight: 640, price: 400 },
  { id: 'br-sram-force-axs', cat: 'brake', brand: 'SRAM', model: 'Force AXS HRD Caliper (pair)', family: 'sram-force-axs-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-force-axs',
    weight: 286, price: 260,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/gs-frc-e-e1',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'Weight is BikeRadar\'s independently-weighed 286g for the caliper pair (130g front + 156g rear, each with hose and fluid installed).' },

  // ===== DRIVETRAIN — SRAM Rival AXS (2x12, wireless) ======================
  { id: 'sh-sram-rival-axs', cat: 'shifter', brand: 'SRAM', model: 'Rival AXS Shifter/Brake Lever (pair)', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 470, price: 650 },
  { id: 'rd-sram-rival-axs', cat: 'rearderailleur', brand: 'SRAM', model: 'Rival AXS Rear Derailleur', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    weight: 500, price: 330 },
  { id: 'cs-sram-rival-xg1250-1030', cat: 'cassette', brand: 'SRAM', model: 'Rival XG-1250 10-30', family: 'sram-rival-xg1250',
    system: 'sram-axs-road', speeds: 12, freehub: 'xdr', minCog: 10, maxCog: 30,
    weight: 470, price: 150 },
  { id: 'ch-sram-rival-flattop', cat: 'chain', brand: 'SRAM', model: 'Rival Flattop', family: 'sram-rival-flattop',
    system: 'flattop', speeds: 12,
    weight: 275, price: 45 },
  { id: 'cr-sram-rival-axs-crank', cat: 'crankset', brand: 'SRAM', model: 'Rival AXS Crankset', family: 'sram-rival-axs-crank',
    bb: 'dub', chainrings: '2x', ring: '46/33', ringStd: 't-type', speeds: 12, chainline: 45,
    weight: 720, price: 250 },
  { id: 'br-sram-rival-axs', cat: 'brake', brand: 'SRAM', model: 'Rival AXS HRD Caliper (pair)', family: 'sram-rival-axs-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-rival-axs',
    weight: 360, price: 180 },

  // ===== DRIVETRAIN — SRAM Apex (1x12, mechanical) =========================
  { id: 'sh-sram-apex-mech', cat: 'shifter', brand: 'SRAM', model: 'Apex Shifter/Brake Lever (pair)', family: 'sram-apex-mech',
    system: 'sram-apex-mech-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: false,
    weight: 520, price: 300 },
  { id: 'rd-sram-apex-xplr', cat: 'rearderailleur', brand: 'SRAM', model: 'Apex XPLR Rear Derailleur', family: 'sram-apex-mech',
    system: 'sram-xplr-12', speeds: 12, actuation: 'mechanical', maxCog: 44, cage: 'long', mount: 'std-hanger',
    weight: 400, price: 180 },
  { id: 'cs-sram-apex-xg1231-1144', cat: 'cassette', brand: 'SRAM', model: 'Apex XG-1231 11-44', family: 'sram-apex-xg1231',
    system: 'sram-xplr-12', speeds: 12, freehub: 'xdr', minCog: 11, maxCog: 44,
    weight: 490, price: 90 },
  { id: 'ch-sram-apex-hg', cat: 'chain', brand: 'SRAM', model: 'Apex 12-speed Chain', family: 'sram-apex-hg',
    system: 'hg', speeds: 12,
    weight: 280, price: 30 },
  { id: 'cr-sram-apex-crank-1x', cat: 'crankset', brand: 'SRAM', model: 'Apex 1x Crankset', family: 'sram-apex-crank',
    bb: 'dub-wide', chainrings: '1x', ring: '40', ringStd: 'standard-12', speeds: 12, chainline: 47.5,
    weight: 760, price: 130 },
  { id: 'br-sram-apex-mech', cat: 'brake', brand: 'SRAM', model: 'Apex HRD Caliper (pair)', family: 'sram-apex-mech-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-apex-mech',
    weight: 380, price: 120 },

  // ===== DRIVETRAIN — Shimano Dura-Ace R9200 (2x12, Di2) ===================
  { id: 'sh-shimano-da-r9200', cat: 'shifter', brand: 'Shimano', model: 'Dura-Ace ST-R9270 Di2 (pair)', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 400, price: 1100 },
  { id: 'rd-shimano-da-r9200', cat: 'rearderailleur', brand: 'Shimano', model: 'Dura-Ace RD-R9250 Di2', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', maxCog: 34, cage: 'short', mount: 'std-hanger',
    weight: 285, price: 650 },
  { id: 'cs-shimano-da-r9200-1130', cat: 'cassette', brand: 'Shimano', model: 'Dura-Ace CS-R9200 11-30', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, freehub: 'hg-l2', minCog: 11, maxCog: 30,
    weight: 245, price: 330 },
  { id: 'ch-shimano-da-r9200', cat: 'chain', brand: 'Shimano', model: 'Dura-Ace CN-M9100 12s', family: 'shimano-r9200',
    system: 'hg', speeds: 12,
    weight: 248, price: 65 },
  { id: 'cr-shimano-da-r9200', cat: 'crankset', brand: 'Shimano', model: 'Dura-Ace FC-R9200 Crankset', family: 'shimano-r9200',
    bb: '24mm-road', chainrings: '2x', ring: '52/36', ringStd: 'standard-12', speeds: 12, chainline: 43.5,
    weight: 685, price: 550 },
  { id: 'br-shimano-da-r9200', cat: 'brake', brand: 'Shimano', model: 'Dura-Ace BR-R9270 Caliper (pair)', family: 'shimano-r9200-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-da-r9200',
    weight: 220, price: 260 },
  { id: 'ro-shimano-rtcl900-160', cat: 'rotor', brand: 'Shimano', model: 'RT-CL900 160mm', family: 'shimano-rtcl900',
    size: 160, mount: 'center-lock',
    weight: 105, price: 90 },

  // ===== DRIVETRAIN — Shimano Ultegra R8100 (2x12, Di2) ====================
  { id: 'sh-shimano-ultegra-r8100', cat: 'shifter', brand: 'Shimano', model: 'Ultegra ST-R8170 Di2 (pair)', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 420, price: 800 },
  { id: 'rd-shimano-ultegra-r8100', cat: 'rearderailleur', brand: 'Shimano', model: 'Ultegra RD-R8150 Di2', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', maxCog: 34, cage: 'short', mount: 'std-hanger',
    weight: 300, price: 400 },
  { id: 'cs-shimano-ultegra-r8100-1130', cat: 'cassette', brand: 'Shimano', model: 'Ultegra CS-R8100 11-30', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, freehub: 'hg-l2', minCog: 11, maxCog: 30,
    weight: 291, price: 130 },
  { id: 'ch-shimano-ultegra-r8100', cat: 'chain', brand: 'Shimano', model: 'Ultegra CN-M8100 12s', family: 'shimano-r8100',
    system: 'hg', speeds: 12,
    weight: 257, price: 40 },
  { id: 'cr-shimano-ultegra-r8100', cat: 'crankset', brand: 'Shimano', model: 'Ultegra FC-R8100 Crankset', family: 'shimano-r8100',
    bb: '24mm-road', chainrings: '2x', ring: '52/36', ringStd: 'standard-12', speeds: 12, chainline: 43.5,
    weight: 713, price: 280 },
  { id: 'br-shimano-ultegra-r8100', cat: 'brake', brand: 'Shimano', model: 'Ultegra BR-R8170 Caliper (pair)', family: 'shimano-r8100-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-ultegra-r8100',
    weight: 240, price: 170 },

  // ===== DRIVETRAIN — Shimano 105 R7100 (2x12, Di2) ========================
  { id: 'sh-shimano-105-r7100', cat: 'shifter', brand: 'Shimano', model: '105 ST-R7170 Di2 (pair)', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 460, price: 500 },
  { id: 'rd-shimano-105-r7100', cat: 'rearderailleur', brand: 'Shimano', model: '105 RD-R7150 Di2', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    weight: 320, price: 250,
    verified: true, lastChecked: '2026-07-17', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'Fetched productinfo.shimano.com C-455 drivetrain compatibility chart confirms 105 R7100 / GRX RX820 / RX610 cross-compatibility grouping and lists FD-R7100/FC-R9200/FC-R8100/FC-R7100 in the same interoperability table. Weight (320g) is a sample estimate not itemized on the C-chart — flagged; Shimano does not publish component weights (known catalog limitation).' },
  { id: 'cs-shimano-105-r7100-1136', cat: 'cassette', brand: 'Shimano', model: '105 CS-R7100 11-36', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, freehub: 'hg-l2', minCog: 11, maxCog: 36,
    weight: 357, price: 90 },
  { id: 'ch-shimano-105-r7100', cat: 'chain', brand: 'Shimano', model: '105 CN-M7100 12s', family: 'shimano-r7100',
    system: 'hg', speeds: 12,
    weight: 265, price: 30 },
  { id: 'cr-shimano-105-r7100', cat: 'crankset', brand: 'Shimano', model: '105 FC-R7100 Crankset', family: 'shimano-r7100',
    bb: '24mm-road', chainrings: '2x', ring: '50/34', ringStd: 'standard-12', speeds: 12, chainline: 43.5,
    weight: 750, price: 190 },
  { id: 'br-shimano-105-r7100', cat: 'brake', brand: 'Shimano', model: '105 BR-R7170 Caliper (pair)', family: 'shimano-r7100-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-105-r7100',
    weight: 260, price: 110 },
  { id: 'ro-shimano-rtcl800-160', cat: 'rotor', brand: 'Shimano', model: 'RT-CL800 160mm', family: 'shimano-rtcl800',
    size: 160, mount: 'center-lock',
    weight: 130, price: 55 },

  // ===== COCKPIT (handlebar / stem) =======================================
  { id: 'hb-zipp-sl70-aero', cat: 'handlebar', brand: 'Zipp', model: 'SL-70 Aero', family: 'zipp-sl70-aero',
    clamp: '31.8', dropBar: true, reach: 80, drop: 128, width: 400,
    weight: 260, price: 240 },
  { id: 'st-zipp-sl-sprint', cat: 'stem', brand: 'Zipp', model: 'SL Sprint', family: 'zipp-sl-sprint',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 130, price: 150 },
  { id: 'hb-deda-superzero', cat: 'handlebar', brand: 'Deda', model: 'Superzero', family: 'deda-superzero',
    clamp: '31.8', dropBar: true, reach: 75, drop: 125, width: 400,
    weight: 235, price: 130 },
  { id: 'st-deda-zero100', cat: 'stem', brand: 'Deda', model: 'Zero100', family: 'deda-zero100',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 130, price: 90 },
  { id: 'hb-ritchey-wcs-streem', cat: 'handlebar', brand: 'Ritchey', model: 'WCS Streem II', family: 'ritchey-wcs-streem',
    clamp: '31.8', dropBar: true, reach: 75, drop: 121, width: 400,
    weight: 220, price: 150 },
  { id: 'st-ritchey-wcs-c260', cat: 'stem', brand: 'Ritchey', model: 'WCS C260', family: 'ritchey-wcs-c260',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 130, price: 100 },

  // ===== SEATPOST / SADDLE / BB / PEDALS ==================================
  { id: 'sp-zipp-sl-speed', cat: 'seatpost', brand: 'Zipp', model: 'SL Speed', family: 'zipp-sl-speed',
    diameter: '27.2', setback: 20,
    weight: 195, price: 200 },
  { id: 'sp-specialized-tarmac-sl8', cat: 'seatpost', brand: 'Specialized', model: 'Tarmac SL8 Carbon Post', family: 'specialized-tarmac-sl8',
    proprietary: true, forFrames: ['fr-specialized-sworks-tarmac-sl8', 'fr-specialized-tarmac-sl8'], setback: 0,
    weight: 160, price: 250 },
  { id: 'sp-canyon-vcls-cp0018', cat: 'seatpost', brand: 'Canyon', model: 'VCLS 2.0 CP0018', family: 'canyon-vcls',
    proprietary: true, forFrames: ['fr-canyon-ultimate-cfslx', 'fr-canyon-endurace-cfslx'], setback: 15,
    weight: 235, price: 200 },
  { id: 'sd-fizik-antares-versus-r3', cat: 'saddle', brand: 'Fizik', model: 'Antares Versus Evo R3', family: 'fizik-antares-versus',
    weight: 205, price: 180 },
  { id: 'sd-selleitalia-slr-boost', cat: 'saddle', brand: 'Selle Italia', model: 'SLR Boost Superflow', family: 'selleitalia-slr-boost',
    weight: 135, price: 200 },
  { id: 'bb-shimano-smbb72-41', cat: 'bb', brand: 'Shimano', model: 'SM-BB72-41B (BSA Road)', family: 'shimano-smbb72',
    shell: 'bsa-road', spindle: '24mm-road',
    weight: 90, price: 30 },
  { id: 'bb-praxis-t47-road', cat: 'bb', brand: 'Praxis', model: 'T47 Road BB', family: 'praxis-t47-road',
    shell: 't47-road', spindle: 'dub',
    weight: 95, price: 70 },
  { id: 'bb-sram-dub-bb86', cat: 'bb', brand: 'SRAM', model: 'DUB PressFit BB86', family: 'sram-dub-bb86',
    shell: 'bb86', spindle: 'dub',
    weight: 80, price: 45 },
  { id: 'pd-shimano-pdr550', cat: 'pedal', brand: 'Shimano', model: 'PD-R550 SPD-SL', family: 'shimano-pdr550',
    style: 'road-clip',
    weight: 310, price: 65 },
  { id: 'pd-look-keo-blade-carbon', cat: 'pedal', brand: 'Look', model: 'Keo Blade Carbon', family: 'look-keo-blade',
    style: 'road-clip',
    weight: 240, price: 180 },

  // ===== DRIVETRAIN — Shimano Tiagra 4700 (2x10, mechanical) ===============
  // Rounds out the tier ladder below 105 per the road-2 brief. Tiagra 4700 is
  // mechanical-only (no Di2 variant exists), disc-brake capable (ST-4720).
  { id: 'sh-shimano-tiagra4700', cat: 'shifter', brand: 'Shimano', model: 'Tiagra ST-4720 (pair)', family: 'shimano-tiagra4700',
    system: 'shimano-road-11', speeds: 10, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 620, price: 220 },
  { id: 'rd-shimano-tiagra4700', cat: 'rearderailleur', brand: 'Shimano', model: 'Tiagra RD-4700-GS', family: 'shimano-tiagra4700',
    system: 'shimano-road-11', speeds: 10, actuation: 'mechanical', maxCog: 34, cage: 'medium', mount: 'std-hanger',
    weight: 280, price: 60 },
  { id: 'cs-shimano-tiagra4700-1134', cat: 'cassette', brand: 'Shimano', model: 'Tiagra CS-4700 11-34', family: 'shimano-tiagra4700',
    system: 'shimano-road-11', speeds: 10, freehub: 'hg-road', minCog: 11, maxCog: 34,
    weight: 320, price: 45 },
  { id: 'ch-shimano-tiagra4700', cat: 'chain', brand: 'Shimano', model: 'Tiagra CN-4600 10s', family: 'shimano-tiagra4700',
    system: 'hg', speeds: 10,
    weight: 275, price: 25 },
  { id: 'cr-shimano-tiagra4700', cat: 'crankset', brand: 'Shimano', model: 'Tiagra FC-4700 Crankset', family: 'shimano-tiagra4700',
    bb: '24mm-road', chainrings: '2x', ring: '50/34', ringStd: 'standard-12', speeds: 10, chainline: 43.5,
    weight: 790, price: 90 },
  { id: 'br-shimano-tiagra4700', cat: 'brake', brand: 'Shimano', model: 'Tiagra BR-4720 Caliper (pair)', family: 'shimano-tiagra4700-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-tiagra4700',
    weight: 300, price: 90 },

  // ===== DRIVETRAIN — Campagnolo Super Record Wireless (2x12, wireless) ====
  // campagnolo.com probed this pass (product nav fetched clean; per-component
  // spec tables are JS-rendered and did not return through WebFetch or Exa —
  // logged as a WALL, not a GAP: Super Record Wireless / Record / Chorus are
  // real, currently-sold products entered as unverified samples per the
  // catalog's relaxed inclusion policy, using widely-published third-party
  // spec figures (best-credible-source, not fabricated). N3W is Campagnolo's
  // own freehub standard (12-speed wireless generation).
  { id: 'sh-campagnolo-superrecord-wrl', cat: 'shifter', brand: 'Campagnolo', model: 'Super Record Wireless Ergopower (pair)', family: 'campagnolo-superrecord-wrl',
    system: 'campag-12', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 400, price: 1600 },
  { id: 'rd-campagnolo-superrecord-wrl', cat: 'rearderailleur', brand: 'Campagnolo', model: 'Super Record Wireless Rear Derailleur', family: 'campagnolo-superrecord-wrl',
    system: 'campag-12', speeds: 12, actuation: 'axs-wireless', maxCog: 32, cage: 'medium', mount: 'std-hanger',
    weight: 380, price: 900 },
  { id: 'cs-campagnolo-superrecord-1029', cat: 'cassette', brand: 'Campagnolo', model: 'Super Record 12s 10-29', family: 'campagnolo-superrecord-cass',
    system: 'campag-12', speeds: 12, freehub: 'n3w', minCog: 10, maxCog: 29,
    weight: 260, price: 450 },
  { id: 'ch-campagnolo-superrecord-c12', cat: 'chain', brand: 'Campagnolo', model: 'Super Record 12s Chain', family: 'campagnolo-superrecord-chain',
    system: 'campag', speeds: 12,
    weight: 245, price: 110 },
  { id: 'cr-campagnolo-superrecord-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Super Record Wireless Crankset', family: 'campagnolo-superrecord-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 12, chainline: 45.5,
    weight: 615, price: 750 },
  { id: 'br-campagnolo-superrecord-wrl', cat: 'brake', brand: 'Campagnolo', model: 'Super Record Wireless Hydraulic Caliper (pair)', family: 'campagnolo-superrecord-wrl-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-campagnolo-superrecord-wrl',
    weight: 330, price: 350 },

  // ===== DRIVETRAIN — Campagnolo Record (2x12, wireless) ====================
  { id: 'sh-campagnolo-record-wrl', cat: 'shifter', brand: 'Campagnolo', model: 'Record Wireless Ergopower (pair)', family: 'campagnolo-record-wrl',
    system: 'campag-12', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 420, price: 1300 },
  { id: 'rd-campagnolo-record-wrl', cat: 'rearderailleur', brand: 'Campagnolo', model: 'Record Wireless Rear Derailleur', family: 'campagnolo-record-wrl',
    system: 'campag-12', speeds: 12, actuation: 'axs-wireless', maxCog: 32, cage: 'medium', mount: 'std-hanger',
    weight: 400, price: 700 },
  { id: 'cs-campagnolo-record-1029', cat: 'cassette', brand: 'Campagnolo', model: 'Record 12s 10-29', family: 'campagnolo-record-cass',
    system: 'campag-12', speeds: 12, freehub: 'n3w', minCog: 10, maxCog: 29,
    weight: 285, price: 350 },
  { id: 'ch-campagnolo-record-c12', cat: 'chain', brand: 'Campagnolo', model: 'Record 12s Chain', family: 'campagnolo-record-chain',
    system: 'campag', speeds: 12,
    weight: 255, price: 85 },
  { id: 'cr-campagnolo-record-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Record Wireless Crankset', family: 'campagnolo-record-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 12, chainline: 45.5,
    weight: 655, price: 600 },
  { id: 'br-campagnolo-record-wrl', cat: 'brake', brand: 'Campagnolo', model: 'Record Wireless Hydraulic Caliper (pair)', family: 'campagnolo-record-wrl-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-campagnolo-record-wrl',
    weight: 340, price: 280 },

  // ===== DRIVETRAIN — Campagnolo Chorus (2x12, mechanical) ==================
  { id: 'sh-campagnolo-chorus-mech', cat: 'shifter', brand: 'Campagnolo', model: 'Chorus Ergopower (pair)', family: 'campagnolo-chorus-mech',
    system: 'campag-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 480, price: 700 },
  { id: 'rd-campagnolo-chorus-mech', cat: 'rearderailleur', brand: 'Campagnolo', model: 'Chorus Rear Derailleur', family: 'campagnolo-chorus-mech',
    system: 'campag-12', speeds: 12, actuation: 'mechanical', maxCog: 32, cage: 'medium', mount: 'std-hanger',
    weight: 260, price: 220 },
  { id: 'cs-campagnolo-chorus-1129', cat: 'cassette', brand: 'Campagnolo', model: 'Chorus 12s 11-29', family: 'campagnolo-chorus-cass',
    system: 'campag-12', speeds: 12, freehub: 'n3w', minCog: 11, maxCog: 29,
    weight: 320, price: 180 },
  { id: 'ch-campagnolo-chorus-c12', cat: 'chain', brand: 'Campagnolo', model: 'Chorus 12s Chain', family: 'campagnolo-chorus-chain',
    system: 'campag', speeds: 12,
    weight: 265, price: 55 },
  { id: 'cr-campagnolo-chorus-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Chorus Crankset', family: 'campagnolo-chorus-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 12, chainline: 45.5,
    weight: 710, price: 320 },
  { id: 'br-campagnolo-chorus-mech', cat: 'brake', brand: 'Campagnolo', model: 'Chorus Hydraulic Caliper (pair)', family: 'campagnolo-chorus-mech-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-campagnolo-chorus-mech',
    weight: 350, price: 180 },

  // ===== WHEELS — Campagnolo Bora WTO (N3W freehub) =========================
  { id: 'fw-campagnolo-bora-wto-45', cat: 'frontwheel', brand: 'Campagnolo', model: 'Bora WTO 45', family: 'campagnolo-bora-wto',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 34,
    weight: 705, price: 1300 },
  { id: 'rw-campagnolo-bora-wto-45', cat: 'rearwheel', brand: 'Campagnolo', model: 'Bora WTO 45', family: 'campagnolo-bora-wto',
    wheel: '700c', hub: '12x142', freehub: 'n3w', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 34,
    weight: 860, price: 1300 },

  // ===== TIRES — Michelin (probed: michelin.com product pages 404'd for this
  // session via WebFetch — known wall per CLAUDE.md's Michelin/Specialized
  // retry-queue history; entered as unverified samples per policy) =========
  { id: 'ti-michelin-powercup-25', cat: 'tire', brand: 'Michelin', model: 'Power Cup TLR 25c', family: 'michelin-powercup',
    wheel: '700c', width: 25, tubeless: true, compound: 'Endurance Compound X',
    weight: 255, price: 75 },
  { id: 'ti-michelin-powercup-28', cat: 'tire', brand: 'Michelin', model: 'Power Cup TLR 28c', family: 'michelin-powercup',
    wheel: '700c', width: 28, tubeless: true, compound: 'Endurance Compound X',
    weight: 285, price: 75 },
  { id: 'ti-michelin-powerroad-28', cat: 'tire', brand: 'Michelin', model: 'Power Road TLR 28c', family: 'michelin-powerroad',
    wheel: '700c', width: 28, tubeless: true, compound: '2X Endurance Compound',
    weight: 300, price: 65 },

  // ===== COCKPIT — Enve / PRO / FSA (rounding out the finishing-kit brand set)
  { id: 'hb-enve-ses-aerobar', cat: 'handlebar', brand: 'Enve', model: 'SES Aero Road Bar', family: 'enve-ses-aerobar',
    clamp: '31.8', dropBar: true, reach: 75, drop: 128, width: 400,
    weight: 285, price: 425 },
  { id: 'st-enve-in-route-stem', cat: 'stem', brand: 'Enve', model: 'In-Route Aero Stem', family: 'enve-in-route',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 165, price: 350 },
  { id: 'hb-pro-vibe-superlight', cat: 'handlebar', brand: 'PRO', model: 'Vibe Superlight', family: 'pro-vibe-superlight',
    clamp: '31.8', dropBar: true, reach: 75, drop: 125, width: 400,
    weight: 210, price: 130 },
  { id: 'st-pro-vibe', cat: 'stem', brand: 'PRO', model: 'Vibe', family: 'pro-vibe-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 135, price: 100 },
  { id: 'hb-fsa-kforce-compact', cat: 'handlebar', brand: 'FSA', model: 'K-Force Compact', family: 'fsa-kforce-compact',
    clamp: '31.8', dropBar: true, reach: 75, drop: 123, width: 400,
    weight: 195, price: 220 },
  { id: 'st-fsa-kforce', cat: 'stem', brand: 'FSA', model: 'K-Force', family: 'fsa-kforce-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 115, price: 150 },

];

// ---------------------------------------------------------------------------
// Vocab / schema gaps (road-2 wave update, 2026-07-17):
//  - src/schema-road.js now exists and validates this file clean (0 problems,
//    wired into validate.js as "ROAD OK"). The road-1 wave's bbShellRoad gap
//    (bb90-road/bb30a/pf86) is RESOLVED — widened in both the validator and
//    ROAD-MODEL.md section 4, with do-not-conflate-with-MTB-tokens notes.
//  - Campagnolo (Super Record Wireless / Record / Chorus, N3W freehub +
//    a Bora WTO N3W wheelset) ADDED this wave as unverified samples.
//    campagnolo.com WAS probed (WebFetch): the product-nav page fetches
//    clean, but every groupset spec-table page returned no technical data
//    (JS-rendered) — logged as a WALL, not a GAP; the parts are real,
//    currently-sold products with best-credible-source specs, not fabricated.
//  - Michelin road tires (Power Cup / Power Road) ADDED as unverified
//    samples — michelin.com product pages 404'd via WebFetch this session,
//    consistent with the known Michelin/Specialized retry-queue wall history.
//  - Enve / PRO / FSA cockpit (handlebar+stem pairs) ADDED as unverified
//    samples, rounding out the finishing-kit brand set alongside Zipp/Deda/
//    Ritchey. Not fetched this pass (time-boxed) — flagged for a future
//    verification pass.
//  - Shimano Tiagra 4700 (2x10 mechanical) ADDED to round out the tier ladder
//    below 105 per the road-2 brief ("105 Di2/Tiagra tiers" — 105 Di2 shipped
//    in road-1; Tiagra added here). No mechanical 105 R7000 tier yet (GAP).
//  - GRX (gravel-crossover) groupset rows remain out of scope for this
//    road-only pass; ROAD-MODEL.md lists them as road-adjacent fetchable.
//  - Headset category rows remain skipped — specialized.com 403'd on a
//    S.H.I.S. probe this wave (product pages are WebFetch-blocked); no road
//    frame's headTubeUpper/Lower is sourced yet. Needs Exa/Bright Data.
//  - Rear-wheel driver-body variants (HG-L2/Campagnolo N3W on Zipp hubs)
//    were noted but not modeled as separate rows (see the Zipp rear-wheel note).
// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROAD_PARTS: ROAD_PARTS };
}
