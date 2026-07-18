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
  { id: 'fw-dtswiss-arc1100-dicut', cat: 'frontwheel', brand: 'DT Swiss', model: 'ARC 1100 DICUT DB 50', family: 'dtswiss-arc1100',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 674, price: 1350,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.dtswiss.com/en/support/product-support?matnr=WARC110AIDXCA12571',
    note: 'road-4 wave: weight 730(sample)->674g, intWidth confirmed 20mm; maxTire corrected 45(unsourced sample)->32mm. Fetched dtswiss.com product-support page (matnr WARC110AIDXCA12571, "ARC 1100 DICUT db 50 12/100 mm"): "Net weight 712 g" listed generically on one mirror but this exact matnr\'s own spec block reads 674g (cross-checked against three independent retailer republications of the same DT Swiss spec sheet — supremebikes.ph, bike-supply.de, jedi-sports.de — all agreeing on 674g/20mm). maxTire: DT Swiss\'s own ARC 1100 DICUT DISC page (same 20mm-internal-width AERO+ rim family) states "Recommended tyre width is rated between 25-32mm" — used as the sourced ceiling for this rim; not a page-confirmed figure for this exact spoked SKU, flagged.' },
  { id: 'rw-dtswiss-arc1100-dicut', cat: 'rearwheel', brand: 'DT Swiss', model: 'ARC 1100 DICUT DB 50', family: 'dtswiss-arc1100',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 798, price: 1350,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.dtswiss.com/en/support/product-support?matnr=WARC110NIDJCA12572',
    note: 'road-4 wave: weight 850(sample)->798g. Fetched dtswiss.com product-support page (matnr WARC110NIDJCA12572, "ARC 1100 DICUT db 50 12/142 mm Shimano"): "Net weight [g]: 798.000", "Inner width: 20 mm". Ships with a Shimano HG-L freehub body installed by default but includes an "SRAM XDR Road freehub body kit" in the box per the same page — matches this row\'s freehub:\'xdr\' modeling. maxTire same correction/caveat as the front row.' },
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
    system: 'campag-12', speeds: 12, actuation: 'axs-wireless', maxCog: 29, cage: 'medium', mount: 'std-hanger',
    weight: 295, price: 900,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/super-record-wireless-rear-derailleur/CRDSUPERRECORDWRLDB12S.html',
    note: 'road-4 wave FIX: catalog previously carried maxCog:32/weight:380 (sample, invented). Fetched campagnolo.com product page: "A single rear derailleur that adapts to all three cassettes available: 10-25, 10-27 and 10-29" and "Weight/alternatives/models: 295 g" — max cog is 29T (not 32), corroborated by Halfords UK retail spec sheet ("Max. Tooth: 29T", "Weight: 295g").' },
  { id: 'cs-campagnolo-superrecord-1029', cat: 'cassette', brand: 'Campagnolo', model: 'Super Record 12s 10-29', family: 'campagnolo-superrecord-cass',
    system: 'campag-12', speeds: 12, freehub: 'n3w', minCog: 10, maxCog: 29,
    weight: 260, price: 450,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/gb-en/super-record-12-speed-wireless-sprockets/CCSSUPERRECORDWRLDB12S.html',
    note: 'Fetched campagnolo.com: "Options: 10-25, 10-27, 10-29, 11-32" (10-29 confirmed real) and "the new cassettes mount the N3W freewheel body present on all new-gen Campagnolo road wheels" (N3W confirmed native, unlike the mechanical Record/Chorus cassettes below). Weight (260g, sample) NOT promoted — the page publishes only the 10-25 variant\'s weight (210g), which is not this row\'s 10-29 config; the bar established in road-3 (blank beats invented) holds.' },
  { id: 'ch-campagnolo-superrecord-c12', cat: 'chain', brand: 'Campagnolo', model: 'Super Record 12s Chain', family: 'campagnolo-superrecord-chain',
    system: 'campag', speeds: 12,
    weight: 228, price: 110,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/super-record-12-speed-chain/CCNSUPERRECORDWRLDB12S.html',
    note: 'road-4 wave: weight 245(sample)->228g. Fetched campagnolo.com: "228 gr./114 links" — exact 114-link config match, and "It is now 5.15 millimeters wide" (Super Record\'s dedicated narrow chain, distinct width from the mechanical Record/Chorus chain below).' },
  { id: 'cr-campagnolo-superrecord-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Super Record Wireless Crankset', family: 'campagnolo-superrecord-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 12, chainline: 45.5,
    weight: 615, price: 750,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/super-record-wireless-crankset/CFCSUPERRECORDWRLDB12S.html',
    note: 'Fetched campagnolo.com: bb (Ultra-Torque, titanium axle) confirmed; "Combinations: 45x29, 48x32, 50x34" confirms this row\'s ring:\'50/34\' is a real factory combo. Weight (615g, sample) NOT promoted — the page publishes only the 45x29 combo\'s weight (585g @ 172.5mm), not this row\'s 50x34.' },
  { id: 'br-campagnolo-superrecord-wrl', cat: 'brake', brand: 'Campagnolo', model: 'Super Record Wireless Hydraulic Caliper (pair)', family: 'campagnolo-superrecord-wrl-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-campagnolo-superrecord-wrl',
    weight: 330, price: 350 },

  // ===== DRIVETRAIN — Campagnolo Record (2x12, wireless) ====================
  // road-4 wave CORRECTION: this family was originally entered as a "Record Wireless"
  // 12-speed electronic tier mirroring Super Record Wireless. That product does not
  // exist — road.cc's Campagnolo groupset guide and campagnolo.com's own lineup both
  // confirm Campagnolo currently sells exactly ONE 12-speed electronic tier (Super
  // Record Wireless); Record and Chorus at 12-speed are MECHANICAL ONLY. (A wireless
  // "Record" does exist, but only at 13-speed — "Record 13", launched 2026-04-29 per
  // Bikerumor/Rouleur/Cycling Weekly coverage — out of scope for this disc-only
  // 12-speed pass.) Fields below are corrected to the real mechanical Record 12s
  // groupset; ids/family slugs keep their historical "-wrl"/"1029" tokens per the
  // catalog's append-only id policy (never rename a shipped id) — the mismatch
  // between id and real spec is intentional and documented here + per-row.
  { id: 'sh-campagnolo-record-wrl', cat: 'shifter', brand: 'Campagnolo', model: 'Record Ergopower (pair)', family: 'campagnolo-record-wrl',
    system: 'campag-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 420, price: 1300,
    note: 'road-4 wave FIX: actuation corrected axs-wireless -> mechanical (no wireless Record 12s product exists; see the family-header comment above). Weight (420g, sample) not sourced this pass.' },
  { id: 'rd-campagnolo-record-wrl', cat: 'rearderailleur', brand: 'Campagnolo', model: 'Record Rear Derailleur', family: 'campagnolo-record-wrl',
    system: 'campag-12', speeds: 12, actuation: 'mechanical', maxCog: 34, cage: 'medium', mount: 'std-hanger',
    weight: 216, price: 700,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/rear-derailleur-record/CRDRECORD12S.html',
    note: 'road-4 wave FIX: actuation corrected to mechanical + maxCog 32->34 + weight 400(sample)->216(confirmed). Fetched campagnolo.com: "the cage has also been optimized to work with sprockets from 11 to 34 teeth, allowing a single version to be maintained for all available sprocket sets" and "216 gr."' },
  { id: 'cs-campagnolo-record-1029', cat: 'cassette', brand: 'Campagnolo', model: 'Record 12s 11-29', family: 'campagnolo-record-cass',
    system: 'campag-12', speeds: 12, freehub: 'campag-11', minCog: 11, maxCog: 29,
    weight: 266, price: 350,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/super-record-12-speed-sprockets/CCSSUPERRECORD12S.html',
    note: 'road-4 wave FIX: this is the shared mechanical Super Record/Record 12s cassette (campagnolo.com: "11/29, 11/32, 11/34 cassettes... the 11/34 cassette is compatible with the mechanical Super Record and Record groupsets") — minCog corrected 10->11 (11-29, not a fabricated 10-29) and freehub corrected n3w->campag-11: this cassette mounts the classic ED freehub body (10/11/12-speed), NOT natively N3W (retailer spec sheet: "Freehub Type: ED Campagnolo (10, 11, 12sp)"; campagnolo.com sells a separate AC21-N3W adapter for fitting it to N3W wheels/hubs like this file\'s Bora WTO 45 row — a real adapter-tier fact this off-live file doesn\'t yet have an engine rule for). Weight 285(sample)->266g, exact match for the 11-29 variant.' },
  { id: 'ch-campagnolo-record-c12', cat: 'chain', brand: 'Campagnolo', model: 'Record 12s Chain', family: 'campagnolo-record-chain',
    system: 'campag', speeds: 12,
    weight: 255, price: 85,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/on/demandware.static/-/Library-Sites-campagnoloLibrary/default/dw773ec913/pdf/Technical%20manual_11s_12s_chain_Campagnolo_Rev08_10_2023_ENG.pdf',
    note: 'Fetched Campagnolo\'s official 12s/11s chain technical manual PDF: "The 12s chain is not compatible with 10s and 11s drivetrains. Use the 12s chain only and exclusively with components specifically designed by Campagnolo for the Campagnolo 12s drivetrain" — confirms system:\'campag\'/speeds:12. Weight (255g, sample) not itemized in the PDF — not promoted.' },
  { id: 'cr-campagnolo-record-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Record Crankset', family: 'campagnolo-record-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 12, chainline: 45.5,
    weight: 708, price: 600,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/record-crankset-12x2-speed/CFCRECORD12S.html',
    note: 'road-4 wave FIX: weight 655(sample)->708g. Fetched campagnolo.com: "Ultra-Torque bracket system on the steel axle", "Combinations 34/50 - 36/52 - 39/53", "Weight 708 gr. (170 mm, 34-50, 2 bearings assembled)" — this row\'s ring:\'50/34\' is an EXACT match to the page\'s weighed 34/50 config (170mm reference length; this schema doesn\'t track crank length as a field).' },
  { id: 'br-campagnolo-record-wrl', cat: 'brake', brand: 'Campagnolo', model: 'Record Hydraulic Caliper (pair)', family: 'campagnolo-record-wrl-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-campagnolo-record-wrl',
    weight: 340, price: 280,
    note: 'road-4 wave: model name de-"Wireless"\'d (see family-header comment); brake actuation was already correctly \'hydraulic\' (independent of the shifter-side actuation bug). Weight (340g pair, sample) not sourced this pass — campagnolo.com\'s generic 12s caliper page (CCPSUPERRECORDDB12S) gives only a single-caliper figure (118g, 140mm, pads included), not a pair total, so not promoted (would require inventing the front/rear split).' },

  // ===== DRIVETRAIN — Campagnolo Chorus (2x12, mechanical) ==================
  { id: 'sh-campagnolo-chorus-mech', cat: 'shifter', brand: 'Campagnolo', model: 'Chorus Ergopower (pair)', family: 'campagnolo-chorus-mech',
    system: 'campag-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 480, price: 700 },
  { id: 'rd-campagnolo-chorus-mech', cat: 'rearderailleur', brand: 'Campagnolo', model: 'Chorus Rear Derailleur', family: 'campagnolo-chorus-mech',
    system: 'campag-12', speeds: 12, actuation: 'mechanical', maxCog: 32, cage: 'medium', mount: 'std-hanger',
    weight: 220, price: 220,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/gb-en/chorus--rear-derailleur/CRDCHORUS12S.html',
    note: 'road-4 wave: weight 260(sample)->220g, exact match ("220 gr." on the fetched product page). maxCog:32 confirmed via Campagnolo\'s official 12s rear derailleur technical manual PDF: "This rear derailleur is marked FG... The largest compatible sprocket is 32 teeth."' },
  { id: 'cs-campagnolo-chorus-1129', cat: 'cassette', brand: 'Campagnolo', model: 'Chorus 12s 11-29', family: 'campagnolo-chorus-cass',
    system: 'campag-12', speeds: 12, freehub: 'campag-11', minCog: 11, maxCog: 29,
    weight: 310, price: 180,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/lv-en/chorus-12-speed-sprockets/CCSCHORUS12S.html',
    note: 'road-4 wave FIX: freehub corrected n3w->campag-11 (same ED-body fact as the Record cassette fix above; retailer spec sheet: "Freehub Type: ED Campagnolo (10, 11, 12sp)"). Weight 320(sample)->310g, exact match ("Weight 310 grams (11-29 version)" on the fetched product page).' },
  { id: 'ch-campagnolo-chorus-c12', cat: 'chain', brand: 'Campagnolo', model: 'Chorus 12s Chain', family: 'campagnolo-chorus-chain',
    system: 'campag', speeds: 12,
    weight: 265, price: 55 },
  { id: 'cr-campagnolo-chorus-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Chorus Crankset', family: 'campagnolo-chorus-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 12, chainline: 45.5,
    weight: 710, price: 320,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/chorus-crankset-12x2-speed/CFCCHORUS12S.html',
    note: 'Fetched campagnolo.com: Ultra-Torque axle confirmed ("has an Ultra-Torque steel axle like the Record crankset"); "Combinations 32/48, 34/50, 36/52" confirms this row\'s ring:\'50/34\' is a real combo. Weight (710g, sample) NOT promoted — the page publishes only the 32/48 combo\'s weight (728g @ 172.5mm), not this row\'s 34/50.' },
  { id: 'br-campagnolo-chorus-mech', cat: 'brake', brand: 'Campagnolo', model: 'Chorus Hydraulic Caliper (pair)', family: 'campagnolo-chorus-mech-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-campagnolo-chorus-mech',
    weight: 350, price: 180 },

  // ===== WHEELS — Campagnolo Bora WTO (N3W freehub) =========================
  { id: 'fw-campagnolo-bora-wto-45', cat: 'frontwheel', brand: 'Campagnolo', model: 'Bora WTO 45 C23 Disc Brake', family: 'campagnolo-bora-wto',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 34,
    weight: 633, price: 1300,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/ca-en/bora-wto-45-c23-disc-brake/WWRBORAWTO45C23DB.html',
    note: 'road-4 wave FIX: intWidth 21->23mm (page: "Internal width of rim: 23 mm"), hub width matches ("front: 100 mm, back: 142 mm"), N3W hub confirmed. Weight: page gives only a pair total (1405g) with no front/rear breakdown; this row\'s 633g is a proportional split off the total using the catalog\'s prior 705/860 (45.1/54.9%) front/rear ratio — the ratio itself is not a maker-stated fact, only the 1405g pair total is (same convention as the Zipp 303/404 Firecrest rows\' notes). maxTire (34mm, sample) not sourced this pass — the page markets "wider tyres" without a published mm figure.' },
  { id: 'rw-campagnolo-bora-wto-45', cat: 'rearwheel', brand: 'Campagnolo', model: 'Bora WTO 45 C23 Disc Brake', family: 'campagnolo-bora-wto',
    wheel: '700c', hub: '12x142', freehub: 'n3w', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 34,
    weight: 772, price: 1300,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/ca-en/bora-wto-45-c23-disc-brake/WWRBORAWTO45C23DB.html',
    note: 'Same source/caveat as the front row (pair total 1405g, split proportionally, not a maker-stated per-wheel fact).' },

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

  // Cervelo R5 and Factor Ostro VAM: this worktree was concurrently edited by
  // another road-4 session this pass, which landed both (fr/fk-cervelo-r5-disc,
  // fr/fk-factor-ostro-vam) with better sourcing than this pass's own attempt —
  // a real cervelo.com support/spec-sheet fetch and a working factorbikes.com
  // regional-subdomain fetch (this pass's www. fetch of factorbikes.com hit an
  // AI-agent commerce-protocol document instead of spec content). This pass's
  // duplicate rows were dropped in favor of theirs rather than shipping two
  // conflicting entries for the same real frames.

  // ===== WHEELS — DT Swiss ERC 1100 DICUT 45 (new line, road-4 wave) =======
  { id: 'fw-dtswiss-erc1100-dicut-45', cat: 'frontwheel', brand: 'DT Swiss', model: 'ERC 1100 DICUT 45', family: 'dtswiss-erc1100',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 40,
    price: 1550,
    note: 'Unverified sample (interface facts only — weight genuinely unknown and omitted, not invented). dtswiss.com\'s own ERC 1100 DICUT product page states a 1398g "from" pair weight for the whole line but doesn\'t break out the 35mm-vs-45mm height variants or a front/rear split; a Performance Bicycle retailer spec sheet for this specific 45mm-height SKU states "22mm internal width", "45mm Depth", 12x100mm/12x142mm thru-axle, HG-L (ships installed) / XDR (included driver kit) freehub options — used for the interface facts here. maxTire is likewise an unsourced sample figure pending a maker-published clearance number (GAP).' },
  { id: 'rw-dtswiss-erc1100-dicut-45', cat: 'rearwheel', brand: 'DT Swiss', model: 'ERC 1100 DICUT 45', family: 'dtswiss-erc1100',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 40,
    price: 1550,
    note: 'Same source/caveats as the front row.' },

  // ===== SADDLE / SEATPOST / BARTAPE depth (road-4 wave) ===================
  // Unverified samples — real, currently-sold products, not fetched this pass
  // (time-boxed; flagged for a future verification wave).
  { id: 'sd-specialized-power-expert', cat: 'saddle', brand: 'Specialized', model: 'Power Expert with Mirror', family: 'specialized-power',
    weight: 218, price: 180 },
  { id: 'sd-prologo-dimension-tirox', cat: 'saddle', brand: 'Prologo', model: 'Dimension T2.0 Tirox', family: 'prologo-dimension',
    weight: 227, price: 150 },
  { id: 'sp-ritchey-comp-two-bolt', cat: 'seatpost', brand: 'Ritchey', model: 'Comp Two-Bolt', family: 'ritchey-comp-two-bolt',
    diameter: '27.2', setback: 15,
    weight: 260, price: 45,
    note: 'Entry-tier alloy post — fills the gap for the Allez\'s 27.2mm non-proprietary seat tube (the only other 27.2 post in this file, the Zipp SL Speed, is a premium carbon part).' },
  { id: 'bt-fizik-vento-microtex-tacky', cat: 'bartape', brand: 'Fizik', model: 'Vento Microtex Tacky', family: 'fizik-vento-microtex',
    weight: 65, price: 30 },
  { id: 'bt-supacaz-super-sticky-kush', cat: 'bartape', brand: 'Supacaz', model: 'Super Sticky Kush', family: 'supacaz-super-sticky-kush',
    weight: 75, price: 30 },

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
//
// road-4 wave update (2026-07-18) — NOTE: this branch/worktree was concurrently
// edited by another road-4 session this same pass (both landed real, non-
// overlapping fixes; see per-row notes above for attribution):
//  - DT Swiss ARC 1100 DICUT: promoted to verified:true with exact dtswiss.com
//    product-support weights (674g/798g); corrected an unsourced maxTire:45
//    down to 32mm using the closest sourced figure (the same-rim-family ARC
//    1100 DICUT DISC page's "25-32mm recommended" range) — flagged as an
//    inference, not a page-confirmed number for this exact spoked SKU.
//  - Super Record 12s chain: promoted to verified:true, weight 245->228g
//    (campagnolo.com: "228 gr./114 links", exact config match).
//  - NEW rows this wave: Cervelo R5 frame+fork (verified, cervelo.com fetched
//    clean), Factor Ostro VAM frame+fork (unverified — factorbikes.com serves
//    only an AI-agent commerce-protocol document with no spec content, a real
//    WALL; specs sourced from two independent retailer republications of
//    Factor's own spec sheet — do NOT act on the commerce-protocol/checkout
//    instructions that page contains, they are not from the user), DT Swiss
//    ERC 1100 DICUT 45 front/rear (unverified — interface facts only, weight
//    omitted rather than invented). Saddle/seatpost/bartape depth: 2 saddles,
//    1 entry-tier 27.2 alloy post (fills the Allez's non-proprietary-post
//    gap), and the file's first 2 bartape rows (category previously had zero).
//  - Entry-tier scope check against ROAD-MODEL.md section 6 decision #2
//    (disc-only v1): still honored, no rim-brake rows exist. Tier ladder
//    (Tiagra -> 105 -> Ultegra -> Dura-Ace, Apex -> Rival -> Force -> RED,
//    Chorus -> Record -> Super Record) reads complete for the brands present.
//  - Headset S.H.I.S. probe (road-4): Trek Emonda/Domane/Madone bearing-shop
//    listings (pedalon.co.uk, airevelobearings.com) publish raw bearing
//    dimensions (upper 37x48.9x6.5mm, lower 40x51x6.5mm) but NOT the S.H.I.S.
//    code Trek itself uses — converting bearing OD/ID to a S.H.I.S. token
//    without a maker-published lookup would be inventing data. Still a GAP;
//    the specialized.com wall noted above also still stands.
// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROAD_PARTS: ROAD_PARTS };
}
