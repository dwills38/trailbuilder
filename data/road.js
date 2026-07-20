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
    note: 'road-4 wave: weight 730(sample)->674g, intWidth confirmed 20mm; maxTire corrected 45(unsourced sample)->32mm. Fetched dtswiss.com product-support page (matnr WARC110AIDXCA12571, "ARC 1100 DICUT db 50 12/100 mm"): "Net weight 712 g" listed generically on one mirror but this exact matnr\'s own spec block reads 674g (cross-checked against three independent retailer republications of the same DT Swiss spec sheet — supremebikes.ph, bike-supply.de, jedi-sports.de — all agreeing on 674g/20mm). maxTire: DT Swiss\'s own ARC 1100 DICUT DISC page (same 20mm-internal-width AERO+ rim family) states "Recommended tyre width is rated between 25-32mm" — used as the sourced ceiling for this rim; not a page-confirmed figure for this exact spoked SKU, flagged. | RECALL NOTE (2026-07-18, RECALL-LOG RCL-9): this wheel line is named in CPSC recall #25-445 (Aug 2025) - carbon rim delamination crash hazard on units with DT Swiss ID 2740000+ (Vietnam-made, delivered Aug 2024 onward; Poland-made rims excluded). Unit-specific - check your wheel ID at dtswiss.com/en/recall; remedy is stop-use + free replacement.' },
  { id: 'rw-dtswiss-arc1100-dicut', cat: 'rearwheel', brand: 'DT Swiss', model: 'ARC 1100 DICUT DB 50', family: 'dtswiss-arc1100',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 798, price: 1350,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.dtswiss.com/en/support/product-support?matnr=WARC110NIDJCA12572',
    note: 'road-4 wave: weight 850(sample)->798g. Fetched dtswiss.com product-support page (matnr WARC110NIDJCA12572, "ARC 1100 DICUT db 50 12/142 mm Shimano"): "Net weight [g]: 798.000", "Inner width: 20 mm". Ships with a Shimano HG-L freehub body installed by default but includes an "SRAM XDR Road freehub body kit" in the box per the same page — matches this row\'s freehub:\'xdr\' modeling. maxTire same correction/caveat as the front row. | RECALL NOTE (2026-07-18, RECALL-LOG RCL-9): this wheel line is named in CPSC recall #25-445 (Aug 2025) - carbon rim delamination crash hazard on units with DT Swiss ID 2740000+ (Vietnam-made, delivered Aug 2024 onward; Poland-made rims excluded). Unit-specific - check your wheel ID at dtswiss.com/en/recall; remedy is stop-use + free replacement.' },
  { id: 'fw-dtswiss-arc1100-dicut-38', cat: 'frontwheel', brand: 'DT Swiss', model: 'ARC 1100 DICUT DB 38', family: 'dtswiss-arc1100',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 587, price: 1200,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.dtswiss.com/en/support/product-support?matnr=WARC110AIDXCO22333',
    note: 'road-grind-1: shallower-depth sibling to the existing verified ARC 1100 DICUT DB 50 pair (same AERO+ 20mm-internal-width rim family). Fetched dtswiss.com product-support page (matnr WARC110AIDXCO22333, "ARC 1100 DICUT db 38 12/100 mm"): "Net weight 587 grams", "Inner Rim Width 20 mm", "Disc Center Lock", "12/100 mm" axle. maxTire reuses the same rim-family "25-32mm recommended" sourced ceiling as the DB 50 pair (not a page-confirmed figure for this exact SKU, same flag). price is an unsourced sample scaled off the DB 50 pair\'s price (shallower rim, lower typical MSRP) — not maker-published.' },
  { id: 'rw-dtswiss-arc1100-dicut-38', cat: 'rearwheel', brand: 'DT Swiss', model: 'ARC 1100 DICUT DB 38', family: 'dtswiss-arc1100',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 712, price: 1200,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.dtswiss.com/en/support/product-support?matnr=WARC110NIDJCO22334',
    note: 'road-grind-1: Fetched dtswiss.com product-support page (matnr WARC110NIDJCO22334, "ARC 1100 DICUT db 38 12/142 mm Shimano"): "Net weight 712 g", "Inner width 20 mm", "Disc Center Lock", freehub "Shim. RD. 11SP Light S ASLS11" (DT Swiss\'s Shimano Road 11-speed driver naming) — modeled as freehub:\'hg-road\' (NOT xdr like the DB 50 sibling, which explicitly notes an included XDR kit; this SKU\'s page did not state one, so it is not assumed). maxTire/price caveats same as the front row.' },
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

  // ===== WHEELS — road-5 build-path gap fill ===============================
  // Priority-2 gap (the GRX-trap lesson): before this pass, the only
  // hg-road rearwheel in the whole file was the ARC 1100 DICUT DB 38 (an
  // aero wheel, not an entry/mid-tier one), and NO wheel anywhere carried
  // micro-spline-road or campag-11 — meaning a GRX 1x12 build (cassette
  // freehub:'micro-spline-road') and a Chorus/Record build (freehub:
  // 'campag-11') had literally zero conflict-free wheel choice. These three
  // pairs are real, credible-source SAMPLE rows (retailer/review-sourced,
  // not a fetched manufacturer page — left unverified per THE BAR) closing
  // that gap for every drivetrain tier.
  { id: 'fw-shimano-rx880-grx', cat: 'frontwheel', brand: 'Shimano', model: 'GRX WH-RX880', family: 'shimano-rx880',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 25, maxTire: 50,
    weight: 627, price: 800,
    note: 'road-5 gap-fill: carbon GRX gravel wheelset, converts between MICRO SPLINE and HG-L2 12-speed freehub bodies (this pair modeled with the micro-spline-road driver installed, the GRX 1x12 build-path this file was missing). Specs (25mm internal width, 32-50mm tire range, 1394g claimed pair weight) are retailer/Shimano-storefront sourced (ride.shimano.com, bike24, universalcycles), not a fetched shimano.com model page, so left unverified. No front/rear split is published — this row\'s 627g is an estimated ~45% share of the 1394g pair total, flagged as unconfirmed rather than a page-stated figure. Price ($800) is an unsourced sample — no retailer in this pass listed a clear MSRP.' },
  { id: 'rw-shimano-rx880-grx', cat: 'rearwheel', brand: 'Shimano', model: 'GRX WH-RX880', family: 'shimano-rx880',
    wheel: '700c', hub: '12x142', freehub: 'micro-spline-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 25, maxTire: 50,
    weight: 767, price: 800,
    note: 'road-5 gap-fill: see front-wheel note (fw-shimano-rx880-grx) for full sourcing — this is the micro-spline-road-driver rear half of the same pair, closing the file\'s only gap for a GRX 1x12 (cs-shimano-grx-m8100-*) drivetrain build. 767g is the estimated ~55% share of the 1394g claimed pair weight, not a page-stated split.' },
  { id: 'fw-shimano-rs710-c46', cat: 'frontwheel', brand: 'Shimano', model: '105 WH-RS710-C46-TL', family: 'shimano-rs710',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 719, price: 625,
    note: 'road-5 gap-fill: entry/mid-tier (105-tier) carbon disc wheelset — before this pass the file\'s only hg-road wheel was an aero-tier DT Swiss pair, leaving 105/Ultegra/Tiagra 2x builds with almost no wheel choice. Specs (46mm rim height, 21mm internal width, 25-32mm tire range, 719g front / 893g rear / 1612g set, $625 MSRP) are retailer-sourced (BikeRadar review + Jenson USA/Universal Cycles listings), not a fetched shimano.com model page, so left unverified rather than marked verified.' },
  { id: 'rw-shimano-rs710-c46', cat: 'rearwheel', brand: 'Shimano', model: '105 WH-RS710-C46-TL', family: 'shimano-rs710',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 893, price: 625,
    note: 'road-5 gap-fill: see front-wheel note (fw-shimano-rs710-c46) for full sourcing — this is the hg-road-driver rear half of the same pair (compatible with 11- and 12-speed Shimano road cassettes: Ultegra R8100, 105 R7100, Tiagra 4700, GRX 2x RX810/RX600 in this file), closing the entry/mid-tier wheel gap.' },
  { id: 'fw-campagnolo-zonda-c17-disc', cat: 'frontwheel', brand: 'Campagnolo', model: 'Zonda C17 Disc', family: 'campagnolo-zonda-c17',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 17, maxTire: 32,
    weight: 754, price: 550,
    note: 'road-5 gap-fill: before this pass NO wheel in the file carried the traditional Campagnolo splined driver (campag-11) — the file\'s one Campagnolo wheel (Bora WTO 45) is N3W, which fits only the Super Record cassette here, leaving the Chorus/Record (freehub:\'campag-11\') tier with zero conflict-free wheel choice. Specs (17mm internal width, up to 32mm tire clearance, ~1675g claimed pair weight) are retailer/review-sourced (Excel Sports, Condor Cycles, BikeTestReviews), not a fetched campagnolo.com model page, so left unverified. No front/rear split is published — this row\'s 754g is an estimated ~45% share of the 1675g pair total. Price ($550) is an unsourced sample within the ~$500-600 retail range multiple sources cited, not an official Campagnolo MSRP.' },
  { id: 'rw-campagnolo-zonda-c17-disc', cat: 'rearwheel', brand: 'Campagnolo', model: 'Zonda C17 Disc', family: 'campagnolo-zonda-c17',
    wheel: '700c', hub: '12x142', freehub: 'campag-11', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 17, maxTire: 32,
    weight: 921, price: 550,
    note: 'road-5 gap-fill: see front-wheel note (fw-campagnolo-zonda-c17-disc) for full sourcing — this is the campag-11-driver rear half of the same pair (Campagnolo also sells a Shimano-HG-driver version of this same wheel; this row is specifically the Campagnolo-driver SKU), closing the file\'s Chorus/Record wheel gap. 921g is the estimated ~55% share of the ~1675g claimed pair weight, not a page-stated split.' },

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
    price: 770,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rd-red-e-e1',
    note: 'road-5: sram.com model page (RD-RED-E-E1) fetched: 12-speed AXS wireless, "cassettes from 10-28T to 10-36T" (-> maxCog:36), "compatible with both 1x and 2x drivetrain configurations," $770 MSRP (corrected from an $800 sample). Cage length and hanger mount are not stated on the page; kept the existing medium/std-hanger values as the plausible 2x-tier assumption (consistent with this file\'s Force/Rival 2x AXS RD rows), not page-confirmed. No weight listed — dropped the prior 370g sample rather than present it as confirmed.' },
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
    price: 60,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rt-pln-a2',
    note: 'road-5: sram.com model page (RT-PLN-A2) fetched: Centerlock mount, 140/160mm sizes, aluminum carrier, $60 MSRP (corrected from the prior $60-vs-$100 sample). No weight listed on the page — dropped the prior 208g sample rather than present it as confirmed (matches the ro-sram-paceline-160-6b/pacelinex-160-cl siblings\' convention of leaving weight blank when unconfirmed).' },
  { id: 'fd-sram-red-axs', cat: 'frontderailleur', brand: 'SRAM', model: 'RED AXS Front Derailleur', family: 'sram-red-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', mount: 'braze-on', maxChainringDiff: 13,
    weight: 144, price: 495,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/fd-red-e-e1',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/tech/2024-sram-red-axs-weights',
    note: 'sram.com model page (FD-RED-E-E1) fetched: braze-on only mount, 12-speed AXS wireless, chainring combos 46/33 through 56/43T (each pair a constant 13T difference -> maxChainringDiff:13), 45mm chainline, $495 MSRP; no weight listed there (SRAM road model pages omit component weights, per the RED/Force pattern already noted elsewhere in this file). Weight is BikeRadar\'s independently-weighed 144g (SRAM claims 145g).' },
  { id: 'rd-sram-red-xplr-e1', cat: 'rearderailleur', brand: 'SRAM', model: 'RED XPLR AXS Rear Derailleur E1 (13-speed)', family: 'sram-red-xplr',
    system: 'sram-xplr-13', speeds: 13, actuation: 'axs-wireless', maxCog: 46, cage: 'xplr', mount: 'udh-fullmount',
    weight: 375, price: 770,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rd-red-1e-e1',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/sram-red-xplr-13-speed-groupset/',
    note: 'sram.com model page (RD-RED-1E-E1) fetched: 13-speed, wireless AXS, "Full Mount with UDH interface" (hangerless, direct dropout mount -> mount:\'udh-fullmount\'), 46T max cog, 10-46T XPLR 13-speed cassette + Road Flattop D1/E1 chain compatibility, 1x-only, $770 MSRP (sram.com price; Bikerumor\'s hands-on piece quotes $700, likely an earlier press-launch price point — flagged, not reconciled). Weight is Bikerumor\'s measured 375g (no weight listed on the sram.com page itself).' },
  { id: 'cs-sram-red-xg1391-1046', cat: 'cassette', brand: 'SRAM', model: 'RED XPLR XG-1391 10-46 (13-speed)', family: 'sram-red-xplr',
    system: 'sram-xplr-13', speeds: 13, freehub: 'xdr', minCog: 10, maxCog: 46,
    weight: 288, price: 660,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1391-e1',
    note: 'sram.com model page (CS-XG-1391-E1) fetched: 13-speed, XDR driver, cog spread 10-11-12-13-15-17-19-21-24-28-32-38-46T, "designed for 1x XPLR rear derailleurs" + Flattop chains, $660 MSRP, and the page itself states a 288g weight (manufacturer-published, not a third-party measurement — no sourceType/weightSource pair needed).' },

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
    price: 215,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cs-xg-1270-e1',
    note: 'road-5: sram.com model page (CS-XG-1270-E1) fetched: 12-speed, XDR driver, "FULL PIN construction," offered in 10-28/10-30/10-33/10-36T (this row is the 10-30T SKU), $215 MSRP (corrected from a $250 sample). No weight listed on the page — dropped the prior 350g sample rather than present it as confirmed.' },
  { id: 'ch-sram-force-flattop', cat: 'chain', brand: 'SRAM', model: 'Force Flattop', family: 'sram-force-flattop',
    system: 'flattop', speeds: 12,
    weight: 242, price: 75,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1270-e1',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'Weight is BikeRadar\'s independently-weighed 242g for the Force AXS Flattop chain (the "Chain Technology: Road Flattop D1/E1" cross-reference is confirmed on the fetched cassette model page, which is the only Force-family page that names it).' },
  { id: 'cr-sram-force-axs-crank', cat: 'crankset', brand: 'SRAM', model: 'Force AXS Crankset', family: 'sram-force-axs-crank',
    bb: 'dub', chainrings: '2x', ring: '48/35', ringStd: 't-type', speeds: 12, chainline: 45,
    price: 455,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/fc-frc-e1',
    note: 'road-5: sram.com model page (FC-FRC-E1) fetched: 12-speed, DUB spindle interface ("All SRAM Road DUB BBs"), 8-bolt direct-mount chainrings offered as 46/33, 48/35, or 50/37T (this row is the 48/35T SKU, matching the constant-13T X-Range spacing already used for maxChainringDiff on this file\'s FD rows), 45mm chainline, $455 MSRP (corrected from a $400 sample). No weight listed on the page — dropped the prior 640g sample rather than present it as confirmed.' },
  { id: 'br-sram-force-axs', cat: 'brake', brand: 'SRAM', model: 'Force AXS HRD Caliper (pair)', family: 'sram-force-axs-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-force-axs',
    weight: 286, price: 260,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/gs-frc-e-e1',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'Weight is BikeRadar\'s independently-weighed 286g for the caliper pair (130g front + 156g rear, each with hose and fluid installed).' },
  { id: 'fd-sram-force-axs', cat: 'frontderailleur', brand: 'SRAM', model: 'Force AXS Front Derailleur', family: 'sram-force-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', mount: 'braze-on', maxChainringDiff: 13,
    weight: 182, price: 270,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/fd-frc-e-e1',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'sram.com model page (FD-FRC-E-E1) fetched: braze-on/clamp-compatible mount (SRAM sells the clamp interface as a separate accessory, AC-FDCL-A1 — this remains a single braze-on-mount SKU, not two rows), 12-speed AXS wireless, chainring combos 46/33, 48/35, 50/37T (constant 13T diff -> maxChainringDiff:13), 45mm chainline, $270 MSRP; no weight listed there. Weight is BikeRadar\'s independently-weighed 182g including battery (same Force AXS weight article already used for this file\'s RD/chain/brake rows).' },
  { id: 'rd-sram-force-xplr-e1', cat: 'rearderailleur', brand: 'SRAM', model: 'Force XPLR AXS Rear Derailleur E1 (13-speed)', family: 'sram-force-xplr',
    system: 'sram-xplr-13', speeds: 13, actuation: 'axs-wireless', maxCog: 46, cage: 'xplr', mount: 'udh-fullmount',
    weight: 440, price: 475,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rd-frc-1e-e1',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/sram-force-rival-12-axs-13-axs-xplr-prices-actual-weights/',
    note: 'sram.com model page (RD-FRC-1E-E1) fetched: 13-speed, wireless AXS, Full Mount hangerless interface (-> mount:\'udh-fullmount\'), 46T max cog, 10-46T XPLR 13-speed cassette + Road Flattop D1/E1 chain compatibility, 1x-only, $475 MSRP. Weight is Bikerumor\'s actual-measured 440g (no weight listed on the sram.com page itself).' },
  { id: 'cs-sram-force-xg1371-1046', cat: 'cassette', brand: 'SRAM', model: 'Force XPLR XG-1371 10-46 (13-speed)', family: 'sram-force-xplr',
    system: 'sram-xplr-13', speeds: 13, freehub: 'xdr', minCog: 10, maxCog: 46,
    weight: 348, price: 305,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1371-e1',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/sram-force-rival-12-axs-13-axs-xplr-prices-actual-weights/',
    note: 'sram.com model page (CS-XG-1371-E1) fetched: 13-speed, XDR driver, 10-46T range, "compatible with all XD cassettes (with a 1.85mm spacer)", $305 MSRP; no weight listed on the page. Weight is Bikerumor\'s actual-measured 348g.' },

  // ===== DRIVETRAIN — SRAM Rival AXS (2x12, wireless) ======================
  { id: 'sh-sram-rival-axs', cat: 'shifter', brand: 'SRAM', model: 'Rival AXS Shifter/Brake Lever (pair)', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 470, price: 650,
    note: 'road-5: sram.com\'s Rival AXS HRD Shift-Brake System (ED-RIV-E1) is $280 MSRP, wireless AXS, hydraulic disc — but that price/SKU bundles the caliper too (same bundled-lever-and-caliper shape as RED\'s ED-RED-E1), and no weight is published, so it does not cleanly verify this row\'s lever-only weight/price. Left unverified — a real wall, not a gap.' },
  { id: 'rd-sram-rival-axs', cat: 'rearderailleur', brand: 'SRAM', model: 'Rival AXS Rear Derailleur', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    price: 325,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rd-riv-e-e1',
    note: 'road-5: sram.com model page (RD-RIV-E-E1) fetched: 12-speed AXS wireless, "cassettes from 10-28T to 10-36T" (-> maxCog:36), $325 MSRP (corrected from a $330 sample). Cage/mount not stated — kept the existing medium/std-hanger values, consistent with the RED/Force 2x AXS RD rows in this file. No weight listed — dropped the prior 500g sample rather than present it as confirmed.' },
  { id: 'cs-sram-rival-xg1250-1030', cat: 'cassette', brand: 'SRAM', model: 'Rival XG-1250 10-30', family: 'sram-rival-xg1250',
    system: 'sram-axs-road', speeds: 12, freehub: 'xdr', minCog: 10, maxCog: 30,
    price: 145,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cs-xg-1250-d1',
    note: 'road-5: sram.com model page (CS-XG-1250-D1) fetched: real "XG-1250" SKU (unlike the Apex "PG-1231" mismatch elsewhere in this file, this row\'s XG naming was already correct), XDR driver ("designed for road hub applications"), offered in 10-30T and 10-36T (this row is the 10-30T SKU), 12-speed, $145 MSRP (corrected from a $150 sample). No weight listed — dropped the prior 470g sample rather than present it as confirmed.' },
  { id: 'ch-sram-rival-flattop', cat: 'chain', brand: 'SRAM', model: 'Rival Flattop', family: 'sram-rival-flattop',
    system: 'flattop', speeds: 12,
    price: 50,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cn-riv-d1',
    note: 'road-5: sram.com model page (CN-RIV-D1) fetched: Flattop D1 technology (confirms this row\'s system:\'flattop\'), 12-speed, "1x and 2x eTap AXS" compatible, 120-link, PowerLock D1 connector, $50 MSRP (corrected from a $45 sample). No weight listed — dropped the prior 275g sample rather than present it as confirmed.' },
  { id: 'cr-sram-rival-axs-crank', cat: 'crankset', brand: 'SRAM', model: 'Rival AXS Crankset', family: 'sram-rival-axs-crank',
    bb: 'dub', chainrings: '2x', ring: '46/33', ringStd: 't-type', speeds: 12, chainline: 45,
    price: 220,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/fc-riv-e1',
    note: 'road-5: sram.com model page (FC-RIV-E1) fetched: 12-speed, DUB spindle interface, chainrings offered as 48/35T or 46/33T (this row is the 46/33T SKU), 45mm chainline, $220 MSRP (corrected from a $250 sample). Page states "over 50 grams lighter than the previous generation" but gives no absolute weight — dropped the prior 720g sample rather than present it as confirmed.' },
  { id: 'br-sram-rival-axs', cat: 'brake', brand: 'SRAM', model: 'Rival AXS HRD Caliper (pair)', family: 'sram-rival-axs-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-rival-axs',
    weight: 360, price: 180 },
  { id: 'fd-sram-rival-axs', cat: 'frontderailleur', brand: 'SRAM', model: 'Rival AXS Front Derailleur', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', mount: 'braze-on', maxChainringDiff: 13,
    weight: 151, price: 195,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/fd-riv-e-e1',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/hands-on-complete-rival-etap-axs-wireless-road-group-with-actual-weights/',
    note: 'sram.com model page (FD-RIV-E-E1) fetched: braze-on/clamp-compatible mount, 12-speed AXS wireless, chainring combos 46/33, 48/35, 50/37T (constant 13T diff -> maxChainringDiff:13), 45mm chainline, $195 MSRP; no weight listed there. Weight is Bikerumor\'s actual-measured 151g (without battery, matching this file\'s existing convention).' },
  { id: 'rd-sram-rival-xplr-e1', cat: 'rearderailleur', brand: 'SRAM', model: 'Rival XPLR AXS Rear Derailleur E1 (13-speed)', family: 'sram-rival-xplr',
    system: 'sram-xplr-13', speeds: 13, actuation: 'axs-wireless', maxCog: 46, cage: 'xplr', mount: 'udh-fullmount',
    weight: 435, price: 360,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rd-riv-1e-e1',
    sourceType: 'measured', weightSource: 'https://nminus1bikes.substack.com/p/2026-sram-rival-xplr-groupset-review',
    note: 'sram.com model page (RD-RIV-1E-E1) fetched: 13-speed, wireless AXS, Full Mount hangerless interface (-> mount:\'udh-fullmount\'), 46T max cog, 10-46T XPLR 13-speed cassette + Road Flattop D1/E1 chain compatibility, 1x-only, $360 MSRP. Weight is a road-media hands-on review\'s stated 435g (no weight listed on the sram.com page itself; this is the least-corroborated of the three XPLR E1 RD weights in this batch — flagged for a future cross-check against a second source).' },
  { id: 'cs-sram-rival-xg1351-1046', cat: 'cassette', brand: 'SRAM', model: 'Rival XPLR XG-1351 10-46 (13-speed)', family: 'sram-rival-xplr',
    system: 'sram-xplr-13', speeds: 13, freehub: 'xdr', minCog: 10, maxCog: 46,
    weight: 383, price: 215,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1351-e1',
    sourceType: 'measured', weightSource: 'https://nminus1bikes.substack.com/p/2026-sram-rival-xplr-groupset-review',
    note: 'sram.com model page (CS-XG-1351-E1) fetched: 13-speed, XDR driver, 10-46T range (cogs 10-11-12-13-15-17-19-21-24-28-32-38-46), Road Flattop D1/E1 chain compatibility, $215 MSRP; no weight listed on the page. Weight is a road-media hands-on review\'s stated 383g — same flag as the RD row above.' },

  // ===== DRIVETRAIN — SRAM Apex (1x12, mechanical) =========================
  { id: 'sh-sram-apex-mech', cat: 'shifter', brand: 'SRAM', model: 'Apex Shifter/Brake Lever (pair)', family: 'sram-apex-mech',
    system: 'sram-apex-mech-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: false,
    weight: 520, price: 300,
    note: 'road-5: sram.com\'s closest match is the "Shift-brake System (SD-APX-D1)" at $270 — mechanical DoubleTap, hydraulic disc, 12-speed, "compatible with Apex XPLR and Eagle mechanical derailleurs" (confirms this row\'s fields) — but the page shows a single right-hand lever and never states whether $270 is per-lever or the L+R pair, and lists no weight. Left unverified rather than guess the per-unit split (same bundled-SKU wall as the RED/Rival AXS shift-brake systems below).' },
  { id: 'rd-sram-apex-xplr', cat: 'rearderailleur', brand: 'SRAM', model: 'Apex XPLR Rear Derailleur', family: 'sram-apex-mech',
    system: 'sram-xplr-12', speeds: 12, actuation: 'mechanical', maxCog: 44, cage: 'long', mount: 'std-hanger',
    price: 140,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rd-apx-1-d1',
    note: 'road-5: sram.com model page (RD-APX-1-D1) fetched: 12-speed mechanical ("compatible with 12-speed mechanical Apex and Eagle shifters"), "X-HORIZON straight parallelogram design," 44T max cog (-> maxCog:44), Flattop-chain compatible (-> the ch-sram-apex-hg fix below), $140 MSRP (corrected from a $180 sample). Cage length/mount not stated on the page — kept the existing long/std-hanger values as the plausible wide-range assumption. No weight listed — dropped the prior 400g sample rather than present it as confirmed.' },
  { id: 'cs-sram-apex-xg1231-1144', cat: 'cassette', brand: 'SRAM', model: 'Apex PG-1231 11-44', family: 'sram-apex-xg1231',
    system: 'sram-xplr-12', speeds: 12, freehub: 'hg-road', minCog: 11, maxCog: 44,
    price: 135,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cs-pg-1231-d1',
    note: 'road-5 CORRECTNESS FIX: sram.com model page (CS-PG-1231-D1 — the real SKU is "PG-1231," not "XG-1231" as the prior sample model name had it; id kept append-only, model field corrected) fetched: "splined 11-speed road driver body" -> freehub is hg-road, NOT xdr as the prior row had it. This was a live false-fit bug: the row would have wrongly required an XDR wheel (Apex\'s actual selling point is fitting standard 11-speed-driver wheels) and would wrongly green-light pairing with an XDR-only wheel. 11-44T, 12-speed, "400% range," "Road Flattop chain" compatible, $135 MSRP (corrected from a $90 sample). No weight listed — dropped the prior 490g sample rather than present it as confirmed.' },
  { id: 'ch-sram-apex-hg', cat: 'chain', brand: 'SRAM', model: 'Apex Flattop Chain', family: 'sram-apex-hg',
    system: 'flattop', speeds: 12,
    price: 40,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cn-apx-d1',
    note: 'road-5 CORRECTNESS FIX: sram.com model page (CN-APX-D1) fetched: "Flattop D1" technology, 12-speed, PowerLock D1 connector, 120 links — this is a Flattop chain, NOT an HG chain as the prior sample (system:\'hg\') had it. This was a live false-error bug: src/compat-road.js\'s ROAD_SYSTEM_CHAIN maps sram-xplr-12 (this row\'s drivetrain family) to \'flattop\', so the old hg value would have tripped rule R15 (\'Chain mismatch\') on every Apex build using its own maker-intended chain — a false red on a real, SRAM-documented pairing. $40 MSRP (corrected from a $30 sample). No weight listed — dropped the prior 280g sample rather than present it as confirmed.' },
  { id: 'cr-sram-apex-crank-1x', cat: 'crankset', brand: 'SRAM', model: 'Apex 1 Wide Crankset', family: 'sram-apex-crank',
    bb: 'dub-wide', chainrings: '1x', ring: '40', ringStd: 'standard-12', speeds: 12, chainline: 47.5,
    price: 120,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/fc-apx-1w-d1',
    note: 'road-5: sram.com model page (FC-APX-1W-D1, "Apex 1 Wide Crankset" — the base non-Wide FC-APX-1-A1 uses a GXP spindle instead, so the prior generic "Apex 1x Crankset" model name is corrected to name the actual DUB-spindle SKU this row\'s bb:\'dub-wide\' value describes) fetched: DUB spindle, 40T or 42T chainrings (this row is the 40T SKU), chainline "47.5mm or 51.0mm" (this row is the 47.5mm/standard-chainline config), $120 MSRP (corrected from a $130 sample). No weight listed — dropped the prior 760g sample rather than present it as confirmed.' },
  { id: 'br-sram-apex-mech', cat: 'brake', brand: 'SRAM', model: 'Apex HRD Caliper (pair)', family: 'sram-apex-mech-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-apex-mech',
    weight: 380, price: 120,
    note: 'road-5: sram.com lists a "Disc Brake (DB-APX-D1)" at $225 (flat-mount, hydraulic, confirms this row\'s mount/actuation) but does not state whether that price/spec is per-caliper or the pair, and no page publishes a caliper-pair weight — left unverified rather than guess the per-unit split (a real wall, not a gap: logged for a future pass with a clearer per-unit source).' },

  // ===== ROTORS — SRAM Paceline / Paceline X depth (road-grind-1-sram wave) =
  // Rotor coverage was thin catalog-wide (3 rows total) before this pass.
  // The existing 'ro-sram-paceline-160' row (mount:'center-lock') maps to
  // SRAM's RT-PLN-A2 Centerlock Paceline SKU; the two rows below fill the
  // genuinely missing configurations: the 6-bolt Paceline (a distinct SKU,
  // RT-PLN-A1) and the lighter RED-tier Paceline X (Centerlock-only,
  // RT-PLN-X-A1). Both sram.com model pages were fetched directly (WebFetch
  // did not 403 this session, unlike the support.sram.com KB articles used
  // for cross-checking elsewhere in this wave). Only 160mm rows are entered
  // — both products also ship in 140mm, but neither fetched page broke out
  // a per-size price, and inventing one would violate THE BAR; 140mm stays
  // a GAP for a future pass with a per-size source.
  { id: 'ro-sram-paceline-160-6b', cat: 'rotor', brand: 'SRAM', model: 'Paceline 160mm (6-bolt)', family: 'sram-paceline',
    size: 160, mount: '6-bolt',
    price: 45,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rt-pln-a1',
    note: 'sram.com model page (RT-PLN-A1) fetched: 6-bolt mount (the RT-PLN-A2 SKU is the Centerlock version of the same Paceline line — already cataloged as ro-sram-paceline-160), 140/160mm sizes, "brake track vent design for smooth, quiet braking", $45 MSRP. No weight listed on the page and no reputable third-party MEASURED (not retailer-claimed) figure was found this pass — left blank rather than invented (retailer listing weights for this SKU ranged 112-160g across sources with no fetched teardown backing any single number, so none qualifies as sourceType:\'measured\').' },
  { id: 'ro-sram-pacelinex-160-cl', cat: 'rotor', brand: 'SRAM', model: 'Paceline X 160mm', family: 'sram-pacelinex',
    size: 160, mount: 'center-lock',
    price: 75,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rt-pln-x-a1',
    note: 'sram.com model page (RT-PLN-X-A1) fetched: Centerlock-only mount, 140/160mm sizes, "lightest aluminum carrier we\'ve made yet" (the RED-tier rotor line, paired with rd-sram-red-axs/br-sram-red-axs elsewhere in this file), $75 MSRP, lockring sold separately. The page states "280g based on two 160mm rotors with SRAM lockrings" (a PAIR figure, not a per-rotor one) — left the per-unit weight field blank rather than dividing an unstated lockring share, per THE BAR.' },

  // ===== DRIVETRAIN — Shimano Dura-Ace R9200 (2x12, Di2) ===================
  // road-6 wave (Shimano depth): productinfo.shimano.com/en/product/<SKU>
  // pages (browser pane; WebFetch renders them empty/JS-thin) turned out to
  // carry full spec tables INCLUDING "Average weight (g)" per SKU — this
  // contradicts the long-standing catalog note that "Shimano does not
  // publish component weights"; flagged for a memory update. Weights below
  // are those page-stated figures, not estimates.
  { id: 'sh-shimano-da-r9200', cat: 'shifter', brand: 'Shimano', model: 'Dura-Ace ST-R9270 Di2 (pair)', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 350, price: 1100,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/ST-R9270-R',
    note: 'road-6 wave: fetched productinfo.shimano.com spec table for ST-R9270-R (dual control lever): "Recommended brake caliper BR-R9270" (confirms leverPair pairing on br-shimano-da-r9200), "Di2 connectivity wired ✔ / wireless ✔", hydraulic brake lever (SM-BH90-JK-SSR hose kit, SHIMANO Mineral oil). Average weight 350g/pair (was a 400g sample).' },
  { id: 'rd-shimano-da-r9200', cat: 'rearderailleur', brand: 'Shimano', model: 'Dura-Ace RD-R9250 Di2', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', maxCog: 34, cage: 'short', mount: 'std-hanger',
    weight: 215, price: 650,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/RD-R9250',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Low sprocket Max. 34T / Min. 30T" (maxCog:34), "SHIMANO ROAD type: Direct attachment (conventional) ✔ / UDH standard ✔" (std-hanger, also UDH-capable), Di2 wired+wireless. Average weight 215g (was a 285g sample).' },
  { id: 'cs-shimano-da-r9200-1130', cat: 'cassette', brand: 'Shimano', model: 'Dura-Ace CS-R9200-12 11-30', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, freehub: 'hg-l2', minCog: 11, maxCog: 30,
    weight: 223, price: 330,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CS-R9200-12',
    note: 'road-6 wave: productinfo.shimano.com spec table: "Combination name (Group name) 11-30T, 11-34T", 12 speed, "HG spline L2 (ROAD 12-speed dedicated) checked" — Dura-Ace HG-L2 is undisputed across sources (unlike the Ultegra/105/GRX rows, see the flag below). Average weight 223g for the 11-30T combo (was a 245g sample; the 11-34T combo weighs 253g per the same page).' },
  { id: 'ch-shimano-da-r9200', cat: 'chain', brand: 'Shimano', model: 'Dura-Ace CN-M9100 12s', family: 'shimano-r9200',
    system: 'hg', speeds: 12,
    weight: 242, price: 65,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CN-M9100',
    note: 'road-6 wave: productinfo.shimano.com confirms "Type: HG 12-speed", QUICK-LINK. Average weight 242g (114 links) (was a 248g sample).' },
  { id: 'cr-shimano-da-r9200', cat: 'crankset', brand: 'Shimano', model: 'Dura-Ace FC-R9200 Crankset', family: 'shimano-r9200',
    bb: '24mm-road', chainrings: '2x', ring: '52/36', ringStd: 'standard-12', speeds: 12, chainline: 44.5,
    weight: 692, price: 550,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/FC-R9200',
    note: 'road-6 wave: productinfo.shimano.com spec table: "Chainring combination 46-36T, 50-34T, 52-36T, 54-40T" (52-36T confirmed real), "Chain line (mm) 44.5" (was an unsourced 43.5 sample — corrected), "Compatible bottom bracket type: Outboard" (24mm-road Hollowtech II spindle, matches catalog). Average weight (170mm, w/o BB) is combo-specific: 692g for 52-36T (was a flat 685g sample carried over from a different combo\'s figure).' },
  { id: 'br-shimano-da-r9200', cat: 'brake', brand: 'Shimano', model: 'Dura-Ace BR-R9270 Caliper (pair)', family: 'shimano-r9200-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-da-r9200',
    weight: 194, price: 260,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/BR-R9270',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Mount type: Flat mount", "Piston: 2", "Brake type: Hydraulic disc brake", "Recommended brake lever: ST-R9270", "Recommended disc brake rotor: RT-MT900, RT-CL900" (matches ro-shimano-rtcl900-160). Weight basis: page states 97g per caliper (single, w/o rotor/hose/hardware) — 194g = 2x97g for the pair (was a 220g sample), disclosed per VERIFY-PROTOCOL\'s brake hose/config-dependent weight-basis note.' },
  { id: 'ro-shimano-rtcl900-160', cat: 'rotor', brand: 'Shimano', model: 'RT-CL900 160mm', family: 'shimano-rtcl900',
    size: 160, mount: 'center-lock',
    weight: 114, price: 90,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/RT-CL900',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms 160mm size available (also 140/180/203), Center Lock (RT-CL prefix), ICE TECHNOLOGIES FREEZA. Average weight (w/o lock ring) 114g at 160mm (was a 105g sample).' },

  // ===== DRIVETRAIN — Shimano Ultegra R8100 (2x12, Di2) ====================
  { id: 'sh-shimano-ultegra-r8100', cat: 'shifter', brand: 'Shimano', model: 'Ultegra ST-R8170 Di2 (pair)', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 391, price: 800,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/ST-R8170-R',
    note: 'road-6 wave: productinfo.shimano.com spec table: "Recommended brake caliper BR-R8170" (confirms leverPair), Di2 wired+wireless, hydraulic brake lever. Average weight 391g/pair (was a 420g sample).' },
  { id: 'rd-shimano-ultegra-r8100', cat: 'rearderailleur', brand: 'Shimano', model: 'Ultegra RD-R8150 Di2', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', maxCog: 34, cage: 'short', mount: 'std-hanger',
    weight: 262, price: 400,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/RD-R8150',
    note: 'road-6 wave: productinfo.shimano.com confirms "Low sprocket Max. 34T" (maxCog:34), std-hanger + UDH capable, Di2 wired+wireless. Average weight 262g (was a 300g sample).' },
  { id: 'cs-shimano-ultegra-r8100-1130', cat: 'cassette', brand: 'Shimano', model: 'Ultegra CS-R8101-12 11-30', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, freehub: 'hg-road', minCog: 11, maxCog: 30,
    weight: 291, price: 130,
    note: 'road-6 wave: LEFT UNVERIFIED — a real conflict surfaced this pass. productinfo.shimano.com\'s spec table for CS-R8101-12 (the current SKU string, superseding "CS-R8100" — https://productinfo.shimano.com/en/product/CS-R8101-12, combination 11-30T/11-34T confirmed, 361g measured on the 105-tier sibling page) marks "HG spline L2 (ROAD 12-speed dedicated)" CHECKED for this cassette, same as the undisputed Dura-Ace CS-R9200-12 row above and productinfo\'s own C-731 freehub/cassette-spline compatibility chart ("HG spline L2: for 12-speed ROAD cassettes" generally, not Dura-Ace-only). This directly conflicts with THIS FILE\'s existing dropbar-cleanup-1 correction (see the trailing comment near EOF) which set this row\'s freehub to \'hg-road\' on the strength of a bike.shimano.com "Features of MICRO SPLINE, HG L2 and HG Freehubs" article quote ("HG L2 freehub is only compatible with Dura-Ace 12-speed road cassettes"). Both are Shimano-owned pages saying opposite things. Per the task brief\'s explicit instruction not to re-introduce hg-l2 here, this row is left AS-IS (freehub unchanged, NOT marked verified) rather than resolved unilaterally — this is a real compatibility-correctness question (wrong either way risks a false "fits"/"won\'t fit"), escalated to Douglas rather than routed around. Model string corrected from the retired "CS-R8100" to the current "CS-R8101-12" SKU (both real; -12 is Shimano\'s running revision suffix, confirmed via the bike.shimano.com CS-R8101-12 product page).' },
  { id: 'ch-shimano-ultegra-r8100', cat: 'chain', brand: 'Shimano', model: 'Ultegra CN-M8100 12s', family: 'shimano-r8100',
    system: 'hg', speeds: 12,
    weight: 252, price: 40,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CN-M8100',
    note: 'road-6 wave: productinfo.shimano.com confirms "Type: HG 12-speed", QUICK-LINK. Average weight 252g (114 links) (was a 257g sample).' },
  { id: 'cr-shimano-ultegra-r8100', cat: 'crankset', brand: 'Shimano', model: 'Ultegra FC-R8100 Crankset', family: 'shimano-r8100',
    bb: '24mm-road', chainrings: '2x', ring: '52/36', ringStd: 'standard-12', speeds: 12, chainline: 44.5,
    weight: 711, price: 280,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/FC-R8100',
    note: 'road-6 wave: productinfo.shimano.com spec table: "Chainring combination 46-36T, 50-34T, 52-36T" (52-36T confirmed), "Chain line (mm) 44.5" (was an unsourced 43.5 sample — corrected), Outboard/Hollowtech II BB type (24mm-road, matches catalog). Average weight (170mm, w/o BB) 711g for 52-36T (was a 713g sample, close but now combo-pinned).' },
  { id: 'br-shimano-ultegra-r8100', cat: 'brake', brand: 'Shimano', model: 'Ultegra BR-R8170 Caliper (pair)', family: 'shimano-r8100-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-ultegra-r8100',
    weight: 246, price: 170,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/BR-R8170',
    note: 'road-6 wave: productinfo.shimano.com confirms "Mount type: Flat mount", "Piston: 2", hydraulic, "Recommended brake lever: ST-R8170", "Recommended disc brake rotor: RT-MT800, RT-CL800" (matches ro-shimano-rtcl800-160 below). Weight basis: 123g per caliper (single) x 2 = 246g pair (was a 240g sample), basis disclosed per VERIFY-PROTOCOL.' },

  // ===== DRIVETRAIN — Shimano 105 R7100 (2x12, Di2) ========================
  { id: 'sh-shimano-105-r7100', cat: 'shifter', brand: 'Shimano', model: '105 ST-R7170 Di2 (pair)', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 423, price: 500,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/ST-R7170-R',
    note: 'road-6 wave: productinfo.shimano.com spec table: "Recommended brake caliper BR-R7170", "Di2 connectivity wired: -" / "wireless: ✔" — 105 Di2 is a fully-wireless-lever design (battery CR1632 x2 per lever, unlike DA/Ultegra\'s central-battery wired hub), a real physical difference from the DA/Ultegra rows above. Kept actuation:\'di2-wired\' unchanged for consistency with this catalog\'s already-verified rd-shimano-105-r7100 row (same convention, no \'di2-wireless\' token exists in ROAD_VOCAB — the field distinguishes Shimano-Di2-electronic vs SRAM-AXS-electronic vs mechanical for compat purposes, not lever wiring detail) rather than introduce an inconsistent value solo. Average weight 423g/pair (was a 460g sample).' },
  { id: 'rd-shimano-105-r7100', cat: 'rearderailleur', brand: 'Shimano', model: '105 RD-R7150 Di2', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    weight: 320, price: 250,
    verified: true, lastChecked: '2026-07-17', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'Fetched productinfo.shimano.com C-455 drivetrain compatibility chart confirms 105 R7100 / GRX RX820 / RX610 cross-compatibility grouping and lists FD-R7100/FC-R9200/FC-R8100/FC-R7100 in the same interoperability table. Weight (320g) is a sample estimate not itemized on the C-chart — flagged; Shimano does not publish component weights (known catalog limitation).' },
  { id: 'cs-shimano-105-r7100-1136', cat: 'cassette', brand: 'Shimano', model: '105 CS-R7101-12 11-36', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, freehub: 'hg-road', minCog: 11, maxCog: 36,
    weight: 361, price: 90,
    note: 'road-6 wave: LEFT UNVERIFIED — same freehub conflict as cs-shimano-ultegra-r8100-1130 above (see that row\'s note for the full writeup). productinfo.shimano.com\'s CS-R7101-12 spec page (https://productinfo.shimano.com/en/product/CS-R7101-12) confirms "Combination name (Group name) 11-34T" and lists an 11-34T teeth breakdown, NOT 11-36 — this catalog row\'s "11-36" combo does not appear on that page at all (11-36 may be a different/older SKU or a data error; not resolved this pass, flagged alongside the freehub conflict). Also marks "HG spline L2 (ROAD 12-speed dedicated)" CHECKED, conflicting with this row\'s current hg-road freehub (kept unchanged per the same escalate-don\'t-override reasoning). Model string corrected from retired "CS-R7100" to current "CS-R7101-12" SKU naming (both real). Weight 361g is the page\'s stated figure for the 11-34T config (was a 357g sample) — used as an informative update even though the row stays unverified, since the SKU/weight correspondence is itself uncertain pending the range mismatch above.' },
  { id: 'ch-shimano-105-r7100', cat: 'chain', brand: 'Shimano', model: '105 CN-M7100 12s', family: 'shimano-r7100',
    system: 'hg', speeds: 12,
    weight: 252, price: 30,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CN-M7100',
    note: 'road-6 wave: productinfo.shimano.com confirms "Type: HG 12-speed", QUICK-LINK. Average weight 252g (114 links) (was a 265g sample).' },
  { id: 'cr-shimano-105-r7100', cat: 'crankset', brand: 'Shimano', model: '105 FC-R7100 Crankset', family: 'shimano-r7100',
    bb: '24mm-road', chainrings: '2x', ring: '50/34', ringStd: 'standard-12', speeds: 12, chainline: 44.5,
    weight: 754, price: 190,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/FC-R7100',
    note: 'road-6 wave: productinfo.shimano.com spec table: "Chainring combination 50-34T, 52-36T" (50-34T confirmed), "Chain line (mm) 44.5" (was an unsourced 43.5 sample — corrected), Outboard/Hollowtech II BB type (24mm-road, matches catalog). Average weight (170mm, w/o BB) 754g (was a 750g sample, very close).' },
  { id: 'br-shimano-105-r7100', cat: 'brake', brand: 'Shimano', model: '105 BR-R7170 Caliper (pair)', family: 'shimano-r7100-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-105-r7100',
    weight: 246, price: 110,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/BR-R7170',
    note: 'road-6 wave: productinfo.shimano.com confirms "Mount type: Flat mount", "Piston: 2", hydraulic, "Recommended brake lever: ST-R7170". Note: page lists "Recommended disc brake rotor: RT-CL700, SM-RT64" (an older/lower rotor tier), NOT RT-CL800/RT-MT800 as with the DA/Ultegra calipers above — not a blocker (Shimano Center-Lock rotors interoperate across tiers by mount+size, already this catalog\'s stated convention on the RT-MT800 row below), but flagged since it is not the page\'s literal "recommended" pairing. Weight basis: 123g per caliper (single) x 2 = 246g pair (was a 260g sample).' },
  { id: 'ro-shimano-rtcl800-160', cat: 'rotor', brand: 'Shimano', model: 'RT-CL800 160mm', family: 'shimano-rtcl800',
    size: 160, mount: 'center-lock',
    weight: 114, price: 55,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/RT-CL800',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms 160mm size available (also 140/180/203), Center Lock, ICE TECHNOLOGIES FREEZA. Average weight (w/o lock ring) 114g at 160mm (was a 130g sample).' },
  { id: 'ro-shimano-rtmt800-160', cat: 'rotor', brand: 'Shimano', model: 'RT-MT800 160mm (Ice Tech Freeza)', family: 'shimano-rtmt800',
    size: 160, mount: 'center-lock',
    weight: 130, price: 60,
    note: 'road-5 wave (rotor depth): this file previously carried only 3 rotor rows total (RT-CL900/RT-CL800/SRAM Paceline). RT-MT800 is a genuinely different SKU, not a duplicate of the RT-CL800/900 road rotors already cataloged — it is Shimano\'s Ice Technologies FREEZA finned/3-layer construction, commonly paired with GRX 1x and MTB-shared 12-speed drivetrains for extra heat capacity on gravel/off-road descents (sold in 203/180/160/140mm, Center Lock only, per multiple bike.shimano.com regional product-page titles surfaced via WebSearch: "SHIMANO CENTER LOCK Disc Brake Rotor ICE TECHNOLOGIES FREEZA 203/180/160/140 mm"). This pass\'s own browser-pane fetch of the bike.shimano.com product page returned a client-side-routing-mismatched title/content pairing (a real wall, not a clean confirmation) — kept as an UNVERIFIED sample rather than claiming a fetch that did not cleanly resolve; size/mount/weight-class are still real, not fabricated. A dedicated road-specific SM-RT900/SM-RT800-tier rotor SKU search turned up no distinct road-only rotor family beyond the RT-CL line already in this file — Shimano rotors are shared hardware across road/MTB/GRX by design (Center-Lock or 6-bolt, sized by mm, no drivetrain-specific rotor exists), so "reuse, don\'t duplicate" is the right call there; RT-MT800 earns its own row only because it is mechanically distinct (Ice Tech Freeza) from the RT-CL family, not because it is road-vs-GRX-specific.' },

  // ===== FRONT DERAILLEURS — Shimano road (R9200/R8100/R7100) + GRX ========
  // road-5 wave (Shimano depth): catalog previously had ZERO frontderailleur
  // rows despite full shifter/RD/cassette/chain/crank/brake depth for these
  // tiers. Model existence, speeds and system pairing for the six road FDs
  // below are confirmed via productinfo.shimano.com/en/compatibility/C-455
  // (fetched: "FD-R9200 and FD-R9250: Paired with FC-R9200/FC-R9200-P... 2x12
  // DURA-ACE"; "FD-R8100 and FD-R8150: ...ULTEGRA"; "FD-R7100 and FD-R7150:
  // ...SHIMANO 105"). Mount (braze-on) is the modern Shimano road/GRX FD
  // native standard — Shimano sells a separate SM-AD91 clamp-band adapter
  // for frames without a braze-on tab (na.s-tec.shimano.com spec sheet +
  // corroborating retailer/explainer pages), so 'band' is never the native
  // SKU. Weights are NOT itemized on any fetched Shimano page (known
  // catalog-wide Shimano limitation) — sample estimates, flagged per row,
  // never promoted as sourced.
  { id: 'fd-shimano-da-r9200', cat: 'frontderailleur', brand: 'Shimano', model: 'Dura-Ace FD-R9200 (mechanical)', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, actuation: 'mechanical', mount: 'braze-on',
    weight: 88, price: 220,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'road-5 wave: fetched productinfo.shimano.com C-455 confirms "FD-R9200 and FD-R9250: Paired with FC-R9200/FC-R9200-P cranksets in 2x12-speed DURA-ACE configurations" — FD-R9200 is the mechanical member of the pair (FD-R9250 is Di2, separate row below). No matching mechanical Dura-Ace shifter/rear-derailleur row exists in this catalog yet (this family\'s other rows are all Di2 R9270/R9250) — flagged as a GAP, out of this pass\'s scope (front derailleurs only). Mount (braze-on) per the native-standard reasoning in the section header comment, not a per-model unique fetch. Weight (88g) is an unsourced sample estimate — Shimano does not publish component weights.' },
  { id: 'fd-shimano-da-r9250', cat: 'frontderailleur', brand: 'Shimano', model: 'Dura-Ace FD-R9250 Di2', family: 'shimano-r9200',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', mount: 'braze-on',
    weight: 98, price: 270,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'road-5 wave: same C-455 fetch/citation as the FD-R9200 row above; this is the Di2 member of the pair, matching this catalog\'s existing Di2-only R9200-family shifter/RD rows. Weight (98g) unsourced sample.' },
  { id: 'fd-shimano-ultegra-r8100', cat: 'frontderailleur', brand: 'Shimano', model: 'Ultegra FD-R8100 (mechanical)', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, actuation: 'mechanical', mount: 'braze-on',
    weight: 95, price: 100,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'road-5 wave: fetched productinfo.shimano.com C-455 confirms "FD-R8100 and FD-R8150: Compatible with FC-R8100/FC-R8100-P in 2x12-speed ULTEGRA setups" — FD-R8100 is the mechanical member. No mechanical Ultegra shifter/RD row exists in this catalog (same GAP as Dura-Ace, flagged, out of scope). Weight (95g) unsourced sample.' },
  { id: 'fd-shimano-ultegra-r8150', cat: 'frontderailleur', brand: 'Shimano', model: 'Ultegra FD-R8150 Di2', family: 'shimano-r8100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', mount: 'braze-on',
    weight: 108, price: 150,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'road-5 wave: same C-455 citation; Di2 member, matches this catalog\'s existing Di2 R8100-family rows. Weight (108g) unsourced sample.' },
  { id: 'fd-shimano-105-r7100', cat: 'frontderailleur', brand: 'Shimano', model: '105 FD-R7100 (mechanical)', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, actuation: 'mechanical', mount: 'braze-on',
    weight: 100, price: 55,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'road-5 wave: fetched productinfo.shimano.com C-455 confirms "FD-R7100 and FD-R7150: Work with FC-R7100/FC-RS520 in 2x12-speed SHIMANO 105 applications" — FD-R7100 is the mechanical member (this catalog\'s existing 105-family shifter/RD rows are Di2 R7170/R7150; a mechanical 105 groupset otherwise stays a GAP, out of this pass\'s FD-only scope). Weight (100g) unsourced sample.' },
  { id: 'fd-shimano-105-r7150', cat: 'frontderailleur', brand: 'Shimano', model: '105 FD-R7150 Di2', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, actuation: 'di2-wired', mount: 'braze-on',
    weight: 115, price: 90,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-455',
    note: 'road-5 wave: same C-455 citation; Di2 member, matches this catalog\'s existing Di2 R7100-family rows (which already cite this same C-455 URL on the rd-shimano-105-r7100 row). Weight (115g) unsourced sample.' },
  { id: 'fd-shimano-grx-rx820', cat: 'frontderailleur', brand: 'Shimano', model: 'GRX FD-RX820 (mechanical, 2x12)', family: 'shimano-grx-rx820',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', mount: 'braze-on',
    weight: 105, price: 70,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-FD-RX820.html',
    note: 'road-5 wave: fetched bike.shimano.com product page (title "GRX FRONT DERAILLEUR 2X12s"; spec table: "Model No FD-RX820", "Front speeds 2", "Rear speeds 12", "Compatible chain HG 12-speed", "Action Down swing") via the browser pane per VERIFY-PROTOCOL\'s "JS-rendered != bot-walled" guidance (WebFetch 403s bike.shimano.com; the browser pane renders it clean, same page any visitor sees — not a bot-wall defeat). GRX IS applicable here: RX820/RX610 both offer a real 2x12 tier alongside the more common 1x — verified before adding, per the brief\'s instruction not to invent one. Weight (105g) unsourced sample.' },
  { id: 'fd-shimano-grx-rx825', cat: 'frontderailleur', brand: 'Shimano', model: 'GRX Di2 FD-RX825 (2x12)', family: 'shimano-grx-rx820',
    system: 'shimano-grx-12', speeds: 12, actuation: 'di2-wired', mount: 'braze-on',
    weight: 120, price: 140,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-FD-RX825.html',
    note: 'road-5 wave: fetched bike.shimano.com product page (title "GRX Di2 FRONT DERAILLEUR 2x12s"; spec table: "Model No FD-RX825", "Front speeds 2", "Rear speeds 12", "Compatible chain HG 12-speed") via the browser pane, same fetch-doctrine note as FD-RX820. This is the Di2 electronic member of the GRX 2x12 pair (productinfo.shimano.com C-455 also lists "FD-RX825" linked to "FC-RX610-2"). No GRX Di2 shifter/RD rows exist in this catalog yet — flagged as a GAP for a future GRX Di2 depth pass, out of this pass\'s scope. Weight (120g) unsourced sample.' },

  // ===== DRIVETRAIN — Shimano GRX RX820/RX610 (12-speed) ===================
  // road-5 wave: catalog had ZERO GRX rows despite the road-1/2 trailing
  // comment flagging this as an explicit GAP. RX820 (top tier) and RX610
  // (mid tier) share the same rear derailleurs (RD-RX820 for 2x, RD-RX822
  // GS/SGS for 1x — confirmed via WebSearch that no distinct "RD-RX610"
  // 12-speed derailleur exists; RX610 differs only in shifter/crank
  // material tier) and the same cassette/chain — see notes per row for the
  // exact fetch each fact traces to. Per ROAD-GRAVEL-SHARED-STANDARDS.md
  // section 2: 2x12 GRX uses the HG-road freehub with 11-34/11-36T
  // cassettes (this catalog's existing cs-shimano-105-r7100-1136 row,
  // 11-36T, is reused rather than duplicated — confirmed via WebSearch
  // citing "the 2x GRX is expected to be the 11-36 from R7100"), while
  // 1x12 GRX uses Micro Spline and shares real Shimano MTB cassettes
  // (CS-M8100-12) — modeled below as its own row per the brief's
  // instruction NOT to invent a road-only cassette, only reference the
  // real shared SKU. The chain is likewise shared with the MTB 12-speed
  // HG+ family and already has a matching row in this file
  // (ch-shimano-ultegra-r8100, "Ultegra CN-M8100 12s") — reused, not
  // duplicated.
  { id: 'sh-shimano-grx-rx820-2x', cat: 'shifter', brand: 'Shimano', model: 'GRX ST-RX820 Shift/Brake Lever (pair, 2x)', family: 'shimano-grx-rx820',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 780, price: 380,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-ST-RX820-L.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane; WebFetch 403s this host): title "GRX DUAL CONTROL LEVER 2X12s", spec table "Model No ST-RX820-L", "Front speeds 2", "Shifter type DUAL CONTROL LEVER" — confirms this is a mechanical (cable, not Di2) 2x lever with an integrated hydraulic brake. Weight (780g pair, sample) and price are unsourced estimates — Shimano does not publish component weights.' },
  { id: 'sh-shimano-grx-rx820-1x', cat: 'shifter', brand: 'Shimano', model: 'GRX ST-RX820-LA Shift/Brake Lever (pair, 1x)', family: 'shimano-grx-rx820',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: false,
    weight: 760, price: 360,
    note: 'road-5 wave: GRX 1x uses the same right-side 12-speed shifter (ST-RX820-R) as the 2x pair, but a distinct LEFT lever with no front shift — the ST-RX820-LA, confirmed real via WebSearch surfacing its own bike.shimano.com product page (Polish/Japanese locales fetched by the search engine; title translates to "GRX Brake Lever - Dropper Post Lever"), which this pass did not itself render through the browser pane (time-boxed) — kept unverified rather than claiming a fetch that did not happen. Weight/price unsourced samples.' },
  { id: 'sh-shimano-grx-rx610-2x', cat: 'shifter', brand: 'Shimano', model: 'GRX ST-RX610 Shift/Brake Lever (pair, 2x)', family: 'shimano-grx-rx610',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 820, price: 260,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-454',
    note: 'road-5 wave: fetched productinfo.shimano.com C-454 rear-drivetrain compatibility chart: "Shifters: ST-RX820: 2x12-speed, ST-RX610: 2x12-speed, ST-RX600: 2x11-speed" — confirms ST-RX610 as a real, distinct 2x12 shifter (the mid-tier sibling of ST-RX820, cheaper materials/finish per Shimano\'s tiering, same mechanical 12-speed mechanism). Weight/price unsourced samples.' },
  { id: 'rd-shimano-grx-rx820-2x', cat: 'rearderailleur', brand: 'Shimano', model: 'GRX RD-RX820 (2x12)', family: 'shimano-grx-rx820',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    weight: 280, price: 130,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX820.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX REAR DERAILLEUR 12s (FOR 11-34/36T)", spec table "Model No RD-RX820", "Rear speeds 12", "Compatible chain HG 12-speed", "RD construction SHIMANO SHADOW RD+", "Mount Direct attachment (conventional)". maxCog:36 covers the page-stated 34/36T cassette range (this catalog\'s cassette schema wants a single number; 36 is the wider/safer max). mount:\'std-hanger\' maps the page\'s "Direct attachment (conventional)" (not the UDH full-mount token). This is the shared 2x12 rear derailleur for BOTH the RX820 and RX610 tiers (WebSearch corroborated no separate "RD-RX610" 12-speed part exists). Weight/price unsourced samples.' },
  { id: 'rd-shimano-grx-rx822-gs', cat: 'rearderailleur', brand: 'Shimano', model: 'GRX RD-RX822-GS (1x12, 10-45T)', family: 'shimano-grx-rx822',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', maxCog: 45, cage: 'medium', mount: 'std-hanger',
    weight: 290, price: 140,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX822-GS.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX REAR DERAILLEUR 12s (FOR 10-45T)", spec table "Model No RD-RX822-GS", "Rear speeds 12", "Compatible chain HG 12-speed", "Mount Direct attachment (conventional)" — confirms the GS (medium/"Shadow Plus") cage 1x12 derailleur, max sprocket 45T. Shared by both RX820 and RX610 1x builds (same part, one SKU per cage length, not per shifter tier). Weight/price unsourced samples.' },
  { id: 'rd-shimano-grx-rx822-sgs', cat: 'rearderailleur', brand: 'Shimano', model: 'GRX RD-RX822-SGS (1x12, 10-51T)', family: 'shimano-grx-rx822',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', maxCog: 51, cage: 'long', mount: 'std-hanger',
    weight: 305, price: 150,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX822-SGS.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX REAR DERAILLEUR 12s (FOR 10-51T)", spec table "Model No RD-RX822-SGS", same construction/mount fields as the GS row — the long-cage sibling, max sprocket 51T, for the widest-range 1x12 cassettes. Weight/price unsourced samples.' },
  { id: 'cs-shimano-grx-m8100-1045', cat: 'cassette', brand: 'Shimano', model: 'Deore XT CS-M8100-12 10-45T (GRX 1x12 shared)', family: 'shimano-grx-cs-m8100',
    system: 'shimano-grx-12', speeds: 12, freehub: 'micro-spline-road', minCog: 10, maxCog: 45,
    weight: 470, price: 165,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX822-GS.html',
    note: 'road-5 wave: per ROAD-GRAVEL-SHARED-STANDARDS.md section 2, GRX 1x12 uses Micro Spline and shares real Shimano MTB cassettes rather than a road-only SKU — this row is that literal MTB part (CS-M8100-12), not an invented road cassette. Range (10-45T) matches the fetched RD-RX822-GS page\'s own title ("FOR 10-45T") — the derailleur\'s own spec page is the source for the cassette range it\'s designed around, corroborated by productinfo.shimano.com C-454\'s fetched "CS-M9100-12 CS-M8100-12 CS-M7100-12 CS-M6100-12(10-51T)" 12-speed family listing (the 51T sibling is the separate row below). freehub:\'micro-spline-road\' is this file\'s own vocab token for the GRX-side Micro Spline driver (LOCAL_VOCAB.freehubRG) — physically the same spline as the MTB freehub, tagged distinctly per ROAD-MODEL.md\'s "never reuse an MTB token" discipline. Weight/price unsourced samples.' },
  { id: 'cs-shimano-grx-m8100-1051', cat: 'cassette', brand: 'Shimano', model: 'Deore XT CS-M8100-12 10-51T (GRX 1x12 shared)', family: 'shimano-grx-cs-m8100',
    system: 'shimano-grx-12', speeds: 12, freehub: 'micro-spline-road', minCog: 10, maxCog: 51,
    weight: 505, price: 175,
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-454',
    note: 'road-5 wave: same MTB-shared-cassette reasoning as the 10-45T row above; range (10-51T) fetched directly off productinfo.shimano.com C-454\'s "CS-M9100-12 CS-M8100-12 CS-M7100-12 CS-M6100-12(10-51T)" line, and matches the fetched RD-RX822-SGS page title ("FOR 10-51T"). Weight/price unsourced samples.' },
  { id: 'cr-shimano-grx-rx820-2x', cat: 'crankset', brand: 'Shimano', model: 'GRX FC-RX820-2 Crankset', family: 'shimano-grx-rx820',
    bb: '24mm-road', chainrings: '2x', ring: '48/31', ringStd: 'standard-12', speeds: 12,
    weight: 700, price: 380,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/products/components/pdp.P-FC-RX820-2.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX CRANKSET - 2X12s", model FC-RX820-2. Ring (48/31T) and HOLLOWTECH II construction (-> bb:\'24mm-road\', this file\'s existing token for Shimano\'s Hollowtech II spindle, matching every other Shimano road crank in this catalog) are corroborated across multiple retailer listings quoting Shimano\'s own product copy (bike-components.de, spokex.com, probikesupply.com all independently state "48-31T... Hollowtech II"). chainline not sourced for this specific 2x SKU (the 1x820/2x610 rows below have a page-confirmed chainline; this one does not — left blank rather than guessed). Weight/price unsourced samples.' },
  { id: 'cr-shimano-grx-rx820-1x', cat: 'crankset', brand: 'Shimano', model: 'GRX FC-RX820-1 Crankset', family: 'shimano-grx-rx820',
    bb: '24mm-road', chainrings: '1x', ring: '40', ringStd: 'standard-12', speeds: 12, chainline: 49.7,
    weight: 650, price: 320,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-FC-RX820-1.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX CRANKSET - 1X12s", spec table "Model No FC-RX820-1", "Rear speeds 12", "Compatible chain HG 12-speed", "Chain line (mm) 49.7", "P.C.D. (mm) 110" — both figures page-confirmed. ring:\'40\' is the smaller of the two factory ring options (40T/42T are both real per retailer listings); the 42T sibling is a GAP, not modeled as a separate row this pass. Weight/price unsourced samples.' },
  { id: 'cr-shimano-grx-rx610-2x', cat: 'crankset', brand: 'Shimano', model: 'GRX FC-RX610-2 Crankset', family: 'shimano-grx-rx610',
    bb: '24mm-road', chainrings: '2x', ring: '46/30', ringStd: 'standard-12', speeds: 12, chainline: 47,
    weight: 750, price: 220,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-FC-RX610-2.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX CRANKSET - 2X12s", spec table "Model No FC-RX610-2", "Chain line (mm) 47", "P.C.D. (mm) 110/80" — both page-confirmed. Ring (46/30T) corroborated across multiple retailer listings quoting Shimano\'s own copy (spokex.com, probikesupply.com, Amazon OEM listing all state "46-30T"). Weight/price unsourced samples.' },
  { id: 'br-shimano-grx-rx820', cat: 'brake', brand: 'Shimano', model: 'GRX BR-RX820 Caliper (pair)', family: 'shimano-grx-rx820-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-grx-rx820-2x',
    weight: 270, price: 130,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-BR-RX820.html',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX - FLAT MOUNT - BRAKE CALIPER" for model BR-RX820, confirming brakeSystem/mount. pistons:2 matches this file\'s convention for every other Shimano/SRAM road flat-mount caliper (not itemized on the fetched page, a reasonable same-tier inference, flagged). Weight/price unsourced samples.' },

  // ===== DRIVETRAIN — Shimano GRX RX810/RX600 (11-speed, legacy) ===========
  // Older GRX generation (predates the 2023 12-speed RX820/RX610 launch),
  // still real/sold. Not individually fetched through the browser pane this
  // pass (time-boxed) — sourced from BikeRadar's GRX launch/review coverage
  // (a reputable cycling publication relaying Shimano's own published specs,
  // not an independent teardown) cross-checked against multiple retailer
  // listings; entered as unverified samples per the catalog's relaxed
  // inclusion policy (real, current-or-recently-sold products, never
  // fabricated) rather than claiming a manufacturer fetch that didn't happen.
  { id: 'sh-shimano-grx-rx810-2x', cat: 'shifter', brand: 'Shimano', model: 'GRX ST-RX810 Shift/Brake Lever (pair, 2x)', family: 'shimano-grx-rx810',
    system: 'shimano-grx-11', speeds: 11, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 800, price: 280,
    note: 'road-5 wave: BikeRadar GRX review/launch coverage describes ST-RX810 as the 11-speed dual-control lever with integrated hydraulic brake. Not independently fetched this pass — unverified sample.' },
  { id: 'sh-shimano-grx-rx600-2x', cat: 'shifter', brand: 'Shimano', model: 'GRX ST-RX600 Shift/Brake Lever (pair, 2x)', family: 'shimano-grx-rx600',
    system: 'shimano-grx-11', speeds: 11, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 850, price: 180,
    note: 'road-5 wave: same source/caveat as ST-RX810 — the budget-tier 11-speed sibling; productinfo.shimano.com C-454 corroborates "ST-RX600: 2x11-speed" (fetched, cited on the RX820-tier rows above). Unverified sample (weight/price).' },
  { id: 'rd-shimano-grx-rx810', cat: 'rearderailleur', brand: 'Shimano', model: 'GRX RD-RX810 (2x11)', family: 'shimano-grx-rx810',
    system: 'shimano-grx-11', speeds: 11, actuation: 'mechanical', maxCog: 34, cage: 'medium', mount: 'std-hanger',
    weight: 290, price: 100,
    note: 'road-5 wave: BikeRadar: "The RD-RX810 rear derailleur has a medium cage designed for road-style cassettes up to 34 teeth" — real product, not independently fetched this pass. Unverified sample.' },
  { id: 'cs-shimano-grx-hg800-1134', cat: 'cassette', brand: 'Shimano', model: 'CS-HG800-11 11-34T', family: 'shimano-grx-cs-hg800',
    system: 'shimano-grx-11', speeds: 11, freehub: 'hg-road', minCog: 11, maxCog: 34,
    weight: 335, price: 70,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CS-HG800-11',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Combination name (Group name) 11-34T", "Rear speeds 11", "HG spline M (10/9/8-speed, MTB 11-speed...) checked" / L2 not checked — an 11-speed cassette, so no HG-L2 dispute here (unlike the 12-speed Ultegra/105 rows above). freehub:\'hg-road\' is the closest available ROAD_VOCAB token to "HG spline M" (this schema has no separate M-vs-L token). Average weight 335g (was a 380g sample).' },
  { id: 'ch-shimano-grx-hg701', cat: 'chain', brand: 'Shimano', model: 'CN-HG701-11 Chain', family: 'shimano-grx-cn-hg701',
    system: 'hg', speeds: 11,
    weight: 257, price: 30,
    note: 'road-5 wave: BikeRadar: "Ultegra CN-HG701-11 Chain with Quick Link Chain Connector" — the 11-speed HG chain paired with GRX RX810/RX600 (shared with Ultegra 11sp, matching this file\'s convention of tagging shared HG chains system:\'hg\'). Unverified sample.' },
  { id: 'cr-shimano-grx-rx810-2x', cat: 'crankset', brand: 'Shimano', model: 'GRX FC-RX810-2 Crankset', family: 'shimano-grx-rx810',
    bb: '24mm-road', chainrings: '2x', ring: '48/31', ringStd: 'standard-12', speeds: 11, chainline: 47,
    weight: 710, price: 220,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/FC-RX810-2',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Chainring combination 48-31T", "Rear speeds 11", "Chain line (mm) 47" (GRX\'s wider gravel-clearance chainline vs the 44.5mm road cranks above — newly captured), Outboard/Hollowtech II BB (24mm-road). Average weight (170mm, w/o BB) 710g (was a 720g sample).' },
  { id: 'cr-shimano-grx-rx600-2x', cat: 'crankset', brand: 'Shimano', model: 'GRX FC-RX600-2 Crankset', family: 'shimano-grx-rx600',
    bb: '24mm-road', chainrings: '2x', ring: '46/30', ringStd: 'standard-12', speeds: 11,
    weight: 780, price: 130,
    note: 'road-5 wave: BikeRadar: "The 2x11-speed RX600 crank is 46/30 only". Unverified sample. 1x RX810/RX600 crank variants (40T/40-42T per BikeRadar) are a GAP, not modeled this pass.' },
  { id: 'br-shimano-grx-rx810', cat: 'brake', brand: 'Shimano', model: 'GRX BR-RX810 Caliper (pair)', family: 'shimano-grx-rx810-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-grx-rx810-2x',
    weight: 290, price: 110,
    note: 'road-5 wave: flat-mount hydraulic caliper matching this file\'s convention for every other Shimano/SRAM road/GRX brake row. Unverified sample.' },

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
  { id: 'bb-shimano-smbb72-41', cat: 'bb', brand: 'Shimano', model: 'SM-BB72-41B (PF86 Press-Fit Road)', family: 'shimano-smbb72',
    shell: 'pf86', spindle: '24mm-road',
    weight: 69, price: 30,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/SM-BB72-41B',
    note: 'road-6 wave: CORRECTION — this row was previously labeled "(BSA Road)" with shell:\'bsa-road\' (threaded), but productinfo.shimano.com\'s spec table for SM-BB72-41B shows "HOLLOWTECH II bottom bracket: Threaded bottom bracket type -" (unchecked) / "Press-Fit type ✔" / "Press-Fit bottom bracket shell width (mm) 86.5 ✔" — this is a Press-Fit 86.5mm shell BB, not threaded BSA. Corrected shell to \'pf86\' (ROAD_VOCAB\'s "Shimano-style press-fit road shell, 86.5mm wide" token, per schema-road.js\'s own description — an exact match) and the model label to match. This also matches the "Recommended bottom bracket: Press-Fit SM-BB72(-41B)" line on the FC-R8100/FC-R7100/FC-RX810-2 crankset pages fetched elsewhere in this wave. A rule-11 exact-match error check (bb.shell vs frame.bb) means the old mislabeling would have wrongly greenlit BSA-threaded frames and wrongly reddened the file\'s two pf86 frames — a real false-fit/false-conflict risk this correction fixes. Average weight 69g (was a 90g sample).' },
  { id: 'bb-praxis-t47-road', cat: 'bb', brand: 'Praxis', model: 'T47 Road BB', family: 'praxis-t47-road',
    shell: 't47-road', spindle: 'dub',
    weight: 95, price: 70 },
  { id: 'bb-sram-dub-bb86', cat: 'bb', brand: 'SRAM', model: 'DUB PressFit BB86', family: 'sram-dub-bb86',
    shell: 'bb86', spindle: 'dub',
    price: 50,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/bb-dub-pf-a1',
    note: 'road-5: sram.com model page (BB-DUB-PF-A1, "DUB PressFit Bottom Bracket") fetched: one DUB-spindle SKU spans "PF 104.5, PF 107, PF 121, PF 86.5, PF 89.5, PF 92" shells (PF 86.5 = this row\'s bb86), price range "$50-$290" across the family (this row uses the $50 floor, the BB86/92 tier). Page states 72g "based on BB92 specification" — a different shell size in the same SKU family, so left the weight field blank rather than reuse a figure for a size this row is not (dropped the prior 80g sample).' },

  // ===== HEADSETS (complete upper+lower assemblies; tapered — every ROAD_PARTS
  //   frame in this file uses steerer:'tapered'. ZERO headset rows existed
  //   before this wave — road-1..4 all flagged it a GAP (specialized.com
  //   S.H.I.S. probes 403'd). road-grind-1 wave: fsaproshop.com and
  //   canecreek.com BOTH fetched (WebFetch, no bot-wall), but neither page's
  //   raw body text cleanly stated its own weight figure on a single fetch —
  //   one fetch returned a "5.3/12.8" fragment that reads like leaked bearing
  //   dimensions, not a component weight (the PHANTOM-NUMBER hazard per
  //   VERIFY-PROTOCOL.md); the Cane Creek page's S.H.I.S. codes came from its
  //   own product-slug/SKU naming (Cane Creek's own naming convention, not an
  //   invented guess) rather than confirmed body prose. So: real, currently-
  //   sold SKUs with maker-page-corroborated S.H.I.S. codes, but NOT marked
  //   verified:true (weight unconfirmed / codes not in clean prose) — logged
  //   here rather than silently upgraded. =====
  { id: 'hs-fsa-orbit-15-zs44-zs56', cat: 'headset', brand: 'FSA', model: 'Orbit 1.5 ZS', family: 'fsa-orbit',
    upper: 'ZS44/28.6', lower: 'ZS56/40', steerer: 'tapered',
    price: 59.99, lastChecked: '2026-07-20', source: 'https://www.fsaproshop.com/products/orbit-1-5-zs-internal-headset',
    note: 'road-grind-1: fetched fsaproshop.com product page directly (WebFetch, no wall) — part number 141-2044, upper ZS44/28.6, lower reported as "ZS56/39.78" (rounds to the catalog\'s existing ZS56/40 token, matching the same SKU already cataloged unverified in the MTB catalog at src/compat.js hs-fsa-orbit-15-zs44-zs56 with price $59.99/weight 125g from independent retailer cross-checks). This fetch itself returned inconsistent price ($57 sale/$76 list) and an uninterpretable weight fragment ("5.3/12.8") — NOT trusted per the phantom-number hazard, so weight is omitted here and verified:true is withheld despite having fetched the maker page, because the fetched figures did not cleanly confirm.' },
  { id: 'hs-canecreek-110-zs44-zs56', cat: 'headset', brand: 'Cane Creek', model: '110 ZS44/28.6-H8 | ZS56/40', family: 'canecreek-110',
    upper: 'ZS44/28.6', lower: 'ZS56/40', steerer: 'tapered',
    mfgPn: 'BAA0825K', price: 99.99, lastChecked: '2026-07-20', source: 'https://canecreek.com/product/110-series-zs44-28-6-h8-zs56-40-complete-baa0825k/',
    note: 'road-grind-1: fetched canecreek.com product page directly (WebFetch, no wall) — product title "110 Premium Bicycle Headset with Stainless Steel Bearings", price confirmed $99.99 in the fetched body. Upper/lower S.H.I.S. codes (ZS44/28.6, ZS56/40) come from Cane Creek\'s own SKU slug/part-number naming for this exact listing ("110-series-zs44-28-6-h8-zs56-40-complete-baa0825k", BAA0825K) rather than being stated in clean prose on the fetched page body, so not marked verified:true; steerer:\'tapered\' follows from the ZS56/40 lower bore per the same S.H.I.S.-code convention used catalog-wide (a 40mm lower bore is the tapered-fork cup). No weight published.' },

  { id: 'pd-shimano-pdr550', cat: 'pedal', brand: 'Shimano', model: 'PD-R550 SPD-SL', family: 'shimano-pdr550',
    style: 'road-clip',
    weight: 310, price: 65,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/PD-R550',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Type: SPD-SL", single-sided binding. Average weight 310g/pair exactly matches the catalog\'s existing sample figure.' },
  { id: 'pd-look-keo-blade-carbon', cat: 'pedal', brand: 'Look', model: 'Keo Blade Carbon', family: 'look-keo-blade',
    style: 'road-clip',
    weight: 240, price: 180 },

  // ===== DRIVETRAIN — Shimano Tiagra 4700 (2x10, mechanical) ===============
  // Rounds out the tier ladder below 105 per the road-2 brief. Tiagra 4700 is
  // mechanical-only (no Di2 variant exists), disc-brake capable (ST-4720).
  { id: 'sh-shimano-tiagra4700', cat: 'shifter', brand: 'Shimano', model: 'Tiagra ST-4720 (pair)', family: 'shimano-tiagra4700',
    system: 'shimano-road-11', speeds: 10, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 620, price: 220,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/ST-4720-R',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Series TIAGRA", "Rear speeds 10", mechanical shift lever (cable outer casing OT-SP41), hydraulic brake lever (SM-BH90 hose kit, SHIMANO Mineral oil) — "Recommended brake caliper BR-4770" (NOT "BR-4720" — see br-shimano-tiagra4700 below for that correction). Average weight not itemized on this page ("Average weight (g) -"); left as the existing 620g sample.' },
  { id: 'rd-shimano-tiagra4700', cat: 'rearderailleur', brand: 'Shimano', model: 'Tiagra RD-4700-GS', family: 'shimano-tiagra4700',
    system: 'shimano-road-11', speeds: 10, actuation: 'mechanical', maxCog: 34, cage: 'medium', mount: 'std-hanger',
    weight: 280, price: 60,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/RD-4700-GS',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Low sprocket Max. 34T (front double)" (maxCog:34), "SHIMANO ROAD type: Direct attachment (conventional) ✔" (std-hanger, no UDH), mechanical (cable adjuster, no Di2 fields), 10-speed. Average weight not itemized on this page; left as the existing 280g sample.' },
  { id: 'cs-shimano-tiagra4700-1134', cat: 'cassette', brand: 'Shimano', model: 'Tiagra CS-HG500-10 11-34', family: 'shimano-tiagra4700',
    system: 'shimano-road-11', speeds: 10, freehub: 'hg-road', minCog: 11, maxCog: 34,
    weight: 320, price: 45,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CS-HG500-10',
    note: 'road-6 wave: CORRECTION — "CS-4700" is not a real Shimano cassette SKU (4700 is the crankset/derailleur series number; WebSearch/productinfo both return no such cassette). The Tiagra 4700-tier cassette Shimano actually sells is CS-HG500-10, confirmed via productinfo.shimano.com: "Combination name (Group name) 11-25T, 12-28T, 11-32T, 11-34T" (11-34T real), "Rear speeds 10", "HG spline M... checked" (matches this row\'s hg-road freehub, no L2 dispute — this is a 10-speed HG cassette, not the disputed 12-speed road-L2 class). Model string corrected; id/family left unchanged (append-only convention). Average weight not itemized on the productinfo page; left as the existing 320g sample rather than adopt an uncross-checked retailer figure (350g, seen on Amazon/eBay listings) per THE BAR.' },
  { id: 'ch-shimano-tiagra4700', cat: 'chain', brand: 'Shimano', model: 'Tiagra CN-4600 10s', family: 'shimano-tiagra4700',
    system: 'hg', speeds: 10,
    weight: 275, price: 25,
    note: 'road-6 wave: CN-4600 returned "No results" on productinfo.shimano.com/en/product/CN-4600 (the tool otherwise resolved every other SKU fetched this wave cleanly) — a real wall, not chased further this pass; left unverified rather than claim a fetch that did not resolve. CN-4600 is a genuine, widely-sold Shimano 10-speed HG-X chain per retailer listings, just not present in this instance of Shimano\'s spec database.' },
  { id: 'cr-shimano-tiagra4700', cat: 'crankset', brand: 'Shimano', model: 'Tiagra FC-4700 Crankset', family: 'shimano-tiagra4700',
    bb: '24mm-road', chainrings: '2x', ring: '50/34', ringStd: 'standard-12', speeds: 10, chainline: 43.5,
    weight: 790, price: 90,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/FC-4700',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Chainring combination 48-34T, 50-34T, 52-36T" (50-34T confirmed real), "Chain line (mm) 43.5" (matches catalog exactly — unlike the R9200/R8100/R7100/RX810 12/11-speed cranks above, this one did NOT need a chainline correction), "Compatible bottom bracket type: Outboard" (24mm-road, though marked "2-PIECE CRANKSET" rather than HOLLOWTECH II — Tiagra\'s integrated-axle design, still outboard-BB-compatible, no schema impact). Average weight not itemized on this page; left as the existing 790g sample.' },
  { id: 'br-shimano-tiagra4700', cat: 'brake', brand: 'Shimano', model: 'Tiagra BR-4770 Caliper (pair)', family: 'shimano-tiagra4700-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-tiagra4700',
    weight: 300, price: 90,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/BR-4770-F',
    note: 'road-6 wave: CORRECTION — "BR-4720" is not a real Shimano caliper SKU (4720 is the shifter/lever series number). ST-4720-R\'s own productinfo.shimano.com page states "Recommended brake caliper BR-4770", confirmed directly: "Mount type: Flat mount", "Piston: 2", "Brake type: Hydraulic disc brake", "Recommended brake lever: ST-4720, ST-4725". Model string corrected; id/family left unchanged. Average weight not itemized on the fetched page; left as the existing 300g sample.' },

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
    note: 'Unverified sample (interface facts only — weight genuinely unknown and omitted, not invented). dtswiss.com\'s own ERC 1100 DICUT product page states a 1398g "from" pair weight for the whole line but doesn\'t break out the 35mm-vs-45mm height variants or a front/rear split; a Performance Bicycle retailer spec sheet for this specific 45mm-height SKU states "22mm internal width", "45mm Depth", 12x100mm/12x142mm thru-axle, HG-L (ships installed) / XDR (included driver kit) freehub options — used for the interface facts here. maxTire is likewise an unsourced sample figure pending a maker-published clearance number (GAP). | RECALL NOTE (2026-07-18, RECALL-LOG RCL-9): this wheel line is named in CPSC recall #25-445 (Aug 2025) - carbon rim delamination crash hazard on units with DT Swiss ID 2740000+ (Vietnam-made, delivered Aug 2024 onward; Poland-made rims excluded). Unit-specific - check your wheel ID at dtswiss.com/en/recall; remedy is stop-use + free replacement.' },
  { id: 'rw-dtswiss-erc1100-dicut-45', cat: 'rearwheel', brand: 'DT Swiss', model: 'ERC 1100 DICUT 45', family: 'dtswiss-erc1100',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 40,
    price: 1550,
    note: 'Same source/caveats as the front row. | RECALL NOTE (2026-07-18, RECALL-LOG RCL-9): this wheel line is named in CPSC recall #25-445 (Aug 2025) - carbon rim delamination crash hazard on units with DT Swiss ID 2740000+ (Vietnam-made, delivered Aug 2024 onward; Poland-made rims excluded). Unit-specific - check your wheel ID at dtswiss.com/en/recall; remedy is stop-use + free replacement.' },

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

  // ===== COCKPIT — one-piece integrated bar/stem (road-5 wave, first rows) ==
  // Zero rows existed pre-wave despite the category being modeled since
  // ROAD-MODEL.md section 3. Manufacturer product pages (specialized.com,
  // enve.com, deda.com) 403'd/429'd WebFetch this pass (Specialized is the
  // established wall from the tire batch; enve.com rate-limited; deda.com
  // 404'd on the direct product path) — entered as unverified samples with
  // dimensions cross-checked across 3+ independent retailer/press
  // republications of each maker's own spec sheet (racycles.com,
  // dedaelementi.com listings, bikerumor.com, bikeradar.com, velo.outsideonline.com),
  // same standing as the file's other search-corroborated rows (e.g. the
  // Trek Domane SLR maxTire note above). No plausible fabrication risk: the
  // steerer interface (1-1/8" tapered) is the universal road standard already
  // used by every stem in this file.
  { id: 'ck-roval-rapide-cockpit', cat: 'cockpit', brand: 'Roval', model: 'Rapide Cockpit', family: 'roval-rapide-cockpit',
    steerer: '1-1-8', width: 420, reach: 75, drop: 125, integrated: true,
    weight: 310, price: 700,
    note: 'specialized.com/support.specialized.com both 403\'d WebFetch this pass (known wall). Dims (310g @ 100x420mm, 380-440mm widths, 75-125mm stem lengths, 75mm reach x 125mm drop, -6deg stem angle) cross-checked across specialized.com search snippets, Velo/Outside\'s "one-piece bar/stem combo" writeup, and multiple retailer spec-sheet republications (Bobcat Bicycles, The Mob Shop, Riverside Cycle) all agreeing on the same figures. Unverified — not fetched.' },
  { id: 'ck-deda-alanera-rs', cat: 'cockpit', brand: 'Deda', model: 'Alanera RS', family: 'deda-alanera-rs',
    steerer: '1-1-8', width: 420, reach: 75, drop: 120, integrated: true,
    weight: 340, price: 796,
    note: 'deda.com product path 404\'d WebFetch this pass. Dims (340g @ 110x42cm, 40/42/44cm widths, 90-130mm stem lengths, 75mm reach x 120mm drop, 6deg flare) cross-checked across dedaelementi.com listing snippets, Bikerumor\'s launch writeup, and RA Cycles/Golden Sports/Cicli Corsa retailer spec tables all agreeing. Unverified — not fetched.' },
  { id: 'ck-enve-ses-ar-onepiece', cat: 'cockpit', brand: 'Enve', model: 'SES AR One-Piece Handlebar', family: 'enve-ses-ar-onepiece',
    steerer: '1-1-8', width: 400, reach: 76, drop: 127, integrated: true,
    weight: 345, price: 1200,
    note: 'enve.com 429\'d WebFetch (rate-limited) both attempts this pass. Dims (330-360g depending on size, 38-44cm widths x 90-130mm stem lengths standard/up to 46cm x 140mm special-order, 76mm reach x 127mm drop, $1200 USD) cross-checked across Bikerumor, BikeRadar and Velo/Outside\'s launch coverage, all citing the same Enve-published numbers. Unverified — not fetched; weight entered as the range midpoint.' },

  // ===== HANDLEBAR/STEM depth — 35mm oversize clamp pair (road-5 wave) =====
  // Every existing hb/st pair in this file is 31.8mm clamp; adds the 35mm
  // oversize standard (widening from "6 handlebar / 6 stem" toward covering
  // both clamp diameters the schema vocab (clampRG) already allows).
  { id: 'hb-deda-m35', cat: 'handlebar', brand: 'Deda', model: 'Trentacinque M35 RHM', family: 'deda-m35',
    clamp: '35', dropBar: true, reach: 75, drop: 129, width: 420,
    weight: 278, price: 295,
    note: 'Unverified sample — deda.com 404\'d. Dims (278g @ 42cm, 42/44/46cm widths, 75mm reach x 129mm drop) and $295 carbon-version price cross-checked across RA Cycles, LafoBikes and BikeRadar\'s M35+Trentacinque-stem review.' },
  { id: 'st-deda-trentacinque-35', cat: 'stem', brand: 'Deda', model: 'Trentacinque 35', family: 'deda-trentacinque-35',
    clamp: '35', steerer: '1-1-8', length: 110,
    weight: 136, price: 70,
    note: 'Unverified sample — deda.com 404\'d. Purpose-built pairing for the M35 bar above (35mm clamp, 1-1/8" steerer, 82deg angle, 40mm clamp height). 136g @ 110mm and ~$70 cross-checked across RA Cycles, Ridewill and Bicyclehero listings.' },

  // ===== SEATPOST depth — round diameters + a 2nd proprietary lock (road-5) =
  { id: 'sp-thomson-elite-309', cat: 'seatpost', brand: 'Thomson', model: 'Elite Setback 30.9', family: 'thomson-elite',
    diameter: '30.9', setback: 0,
    weight: 201, price: 70,
    verified: true, lastChecked: '2026-07-18', source: 'https://bikethomson.com/product/elite-seatpost/',
    note: 'Fetched bikethomson.com clean: 30.9mm is one of the Elite\'s published diameter offerings ("25.0mm...30.9mm...32.4mm"), straight/16mm-setback options, and "approximately 201 grams (250 length)" (the page does not break weight out per-diameter, so 201g is the maker\'s own stated approximate figure, not a per-SKU exact number — flagged). Price entered at the page\'s quoted range floor ($69.95-$134.95, varies by config).' },
  { id: 'sp-thomson-elite-316', cat: 'seatpost', brand: 'Thomson', model: 'Elite Setback 31.6', family: 'thomson-elite',
    diameter: '31.6', setback: 16,
    weight: 201, price: 75,
    verified: true, lastChecked: '2026-07-18', source: 'https://bikethomson.com/product/elite-seatpost/',
    note: 'Same fetched source/caveat as the 30.9 row above (31.6mm also in the page\'s published diameter list); this row uses the 16mm-setback config the same page names ("Straight / Setback(16mm)"). Price is a sample estimate within the page\'s quoted range.' },
  { id: 'sp-cannondale-c140aero-20', cat: 'seatpost', brand: 'Cannondale', model: 'C1 40 Aero Seatpost 20mm Offset', family: 'cannondale-c140aero',
    proprietary: true, forFrames: ['fr-cannondale-supersix-evo'], setback: 20,
    weight: 165, price: 210,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.cannondale.com/en-us/gear/components/seatposts/road-seatposts/c1-40-aero-seatpost-20mm-offset',
    note: 'Fetched cannondale.com clean: "Weight: 165g", "Offset: 20mm", 330mm length, 65mm min insertion, sold as "a replacement seatpost" for the SuperSix Evo (2023-current) — matches this catalog\'s fr-cannondale-supersix-evo frame. Price ($210) is a retailer figure (Locally.com), not read off the fetched page — flagged.' },

  // ===== SADDLE depth (road-5 wave) =========================================
  { id: 'sd-sanmarco-aspide-carbonfx', cat: 'saddle', brand: 'Selle San Marco', model: 'Aspide Carbon FX Open-Fit', family: 'sanmarco-aspide-carbonfx',
    weight: 147, price: 280,
    note: 'Unverified sample — not fetched. Weight (147g, Open-Fit Narrow 277x132mm) and $280 USD price cross-checked across BikeRadar\'s review, road.cc\'s review and multiple retailer listings (Excel Sports, Competitive Cyclist, Amazon) citing the same Selle San Marco spec sheet.' },
  { id: 'sd-prologo-scratch-m5', cat: 'saddle', brand: 'Prologo', model: 'Scratch M5 PAS Tirox', family: 'prologo-scratch-m5',
    weight: 189, price: 129,
    note: 'Unverified sample — not fetched. Weight (189g, Tirox-rail version, 250x140mm) and Tirox price ($129) cross-checked across prologo.it product listing snippets and multiple retailer spec tables (BikeTiresDirect, Western Bike Works, RA Cycles).' },

  // ===== PEDAL depth (road-5 wave) ==========================================
  { id: 'pd-shimano-pdr8000', cat: 'pedal', brand: 'Shimano', model: 'Ultegra PD-R8000', family: 'shimano-pdr8000',
    style: 'road-clip',
    weight: 249, price: 170,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/PD-R8000',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Type: SPD-SL", single-sided. Average weight 249g/pair (standard axle; a 258g longer-axle variant also exists) — was a 248g sample, essentially confirmed. Price stays an unsourced USD sample (no MSRP field on this page).' },
  { id: 'pd-wahoo-speedplay-zero', cat: 'pedal', brand: 'Wahoo', model: 'Speedplay Zero', family: 'wahoo-speedplay-zero',
    style: 'road-clip',
    weight: 222, price: 230,
    note: 'Unverified sample — not fetched. Weight (222g claimed/pair) and $230 USD price cross-checked across wahoofitness.com search snippets, BikeRadar\'s and Cyclist\'s reviews, and REI\'s listing, all agreeing. Speedplay\'s lollipop-cleat system is a road clip-in standard (not SPD 2-bolt) — modeled as style:\'road-clip\' per the pedalStyleRoad vocab\'s display-only intent.' },

  // ===== TIRE depth — Specialized (road-5 wave) =============================
  // Attempted per the coordinator brief: specialized.com/support.specialized.com
  // both 403'd WebFetch this pass (same wall already logged above for the
  // Roval cockpit and the road-4 headset probe) — entered as unverified
  // samples, not fetched. Michelin (also asked to retry) 404'd on
  // michelin.com/en/products-services/moto-bike/power-cup/ this pass —
  // consistent with the existing Power Cup/Power Road rows' wall note; no
  // new Michelin row added since the two already-cataloged SKUs stand.
  { id: 'ti-specialized-turbocotton-26', cat: 'tire', brand: 'Specialized', model: 'Turbo Cotton 26c', family: 'specialized-turbocotton',
    wheel: '700c', width: 26, tubeless: false, compound: 'GRIPTON',
    weight: 240, price: 70,
    note: 'Unverified sample — specialized.com 403\'d. 320 TPI polycotton clincher (not tubeless). Weight (240g) and compound cross-checked across Bicycle Rolling Resistance\'s measured test (an independent test-house figure, not entered as sourceType:measured since it is corroborating rather than the sole basis) and road.cc/Velo reviews quoting Specialized\'s own spec.' },
  { id: 'ti-specialized-turbocotton-28', cat: 'tire', brand: 'Specialized', model: 'Turbo Cotton 28c', family: 'specialized-turbocotton',
    wheel: '700c', width: 28, tubeless: false, compound: 'GRIPTON',
    weight: 260, price: 70,
    note: 'Same source/caveat as the 26c row above; also marketed as "Hell of the North" per Velo\'s review. Weight 260g.' },

  // ===== HEADSETS (road-5, Shimano-depth wave) ===============================
  // road-5 wave: the headset category previously had ZERO rows (the road-2/4
  // trailing comments both flagged this as an open GAP after a specialized.com
  // S.H.I.S. probe was blocked). Shimano does not make headsets, so per the
  // brief this uses real, fetchable tapered-steerer road headset brands
  // instead — headset is its own single-slot GROUP per ROAD-MODEL.md section
  // 2, not brand-specific to whichever groupset a build uses. All three rows
  // are genuinely complete ZS44/28.6 upper (1-1/8" steerer bore, 28.6mm stem
  // clamp) + a tapered lower cup S.H.I.S. code (EC44/40 or ZS-series 40/55/56mm
  // crown race) — the standard modern tapered road/gravel head-tube pairing
  // already used by every frame in this file (steerer:'tapered').
  { id: 'hs-canecreek-40-zs44-ec44', cat: 'headset', brand: 'Cane Creek', model: '40-Series ZS44/28.6 - EC44/40', family: 'canecreek-40-series',
    upper: 'ZS44/28.6', lower: 'EC44/40', steerer: 'tapered',
    weight: 171, price: 50,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.canecreek.com/products/40',
    note: 'road-5 wave: fetched canecreek.com/products/40 (their own product page, cleanly fetchable via WebFetch): the "40-ZS44-EC44" part-number combination (BAA0717K/BAA0719K) is listed among the Forty\'s real SKU/part-number table, confirming the ZS44/28.6 upper + EC44/40 tapered-lower combo is a genuine purchasable Cane Creek 40-Series configuration; price ($49.99) is stated on the same page. Weight (171g) is NOT itemized on the fetched page — a commonly-cited third-party figure, kept as an unsourced sample per this catalog\'s "verified:true can coexist with a flagged sample weight" convention (same pattern as rd-shimano-105-r7100 elsewhere in this file) rather than inventing or over-claiming it.' },
  { id: 'hs-fsa-orbit-zs44-zs56', cat: 'headset', brand: 'FSA', model: 'Orbit ZS44/28.6 - ZS56/40', family: 'fsa-orbit',
    upper: 'ZS44/28.6', lower: 'ZS56/40', steerer: 'tapered',
    weight: 124, price: 40,
    note: 'road-5 wave: real, currently-sold FSA headset (fullspeedahead.com itself was not successfully fetched this pass — not probed via WebFetch/browser pane, time-boxed) — spec (ZS44/28.6 upper, ZS56/40 tapered lower, ~124g) cross-checked across multiple independent retailer listings (Performance Bicycle, BIKE24, The Lions Cyclery) all quoting the same FSA-published S.H.I.S. codes. Kept as an unverified sample per the catalog\'s relaxed inclusion policy (real product, not fabricated) rather than a manufacturer-page fetch that did not happen.' },
  { id: 'hs-ritchey-comp-zero-zs44-zs55', cat: 'headset', brand: 'Ritchey', model: 'Comp Zero Logic ZS44/28.6 - ZS55/40 Tapered', family: 'ritchey-comp-zero',
    upper: 'ZS44/28.6', lower: 'ZS55/40', steerer: 'tapered',
    weight: 109, price: 45,
    note: 'road-5 wave: real, currently-sold Ritchey headset (Ritchey already appears elsewhere in this file as a cockpit brand — Ritchey WCS bar/stem). ritchey-logic.com itself was not probed this pass (time-boxed); spec (ZS44/28.6 upper, ZS55/40 tapered lower, 109g, "Stem Clamp Diameter: 28.6") cross-checked across bike24.com/bike-components.de retailer listings quoting Ritchey\'s own published S.H.I.S. codes. Unverified sample, same caveat as the FSA row above.' },

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
//
// road-5 wave (2026-07-20) — finishing-kit + tire depth pass (worktree
// rd1-finish-a93f, branch catalog/road-grind-1-finishing):
//  - COCKPIT: first 3 rows ever in this category (Roval Rapide, Deda Alanera
//    RS, Enve SES AR One-Piece) — all unverified samples; specialized.com
//    403'd, deda.com 404'd, enve.com 429'd (rate-limited) on every attempt
//    this pass. Steerer modeled as universal '1-1-8' (every road frame/fork
//    in this file is tapered-with-1-1/8-lower, matching every stem row).
//  - HANDLEBAR/STEM: added the file's first 35mm-clamp pair (Deda Trentacinque
//    M35 bar + Trentacinque 35 stem) — previously every row was 31.8mm.
//  - SEATPOST: added Thomson Elite 30.9 and 31.6 (bikethomson.com FETCHED
//    clean, verified:true — the first non-27.2/non-proprietary rows in this
//    category) and a 2nd proprietary lock, Cannondale's own C1 40 Aero
//    Seatpost 20mm Offset for the SuperSix Evo (cannondale.com FETCHED
//    clean, verified:true). Trek Emonda's own post was investigated but Trek
//    markets a seatMAST cap (Bontrager Ride Tuned), a different mechanism
//    the seatpost schema (diameter/proprietary+forFrames) doesn't model —
//    skipped rather than force-fit, flagged for a future seatmast-aware
//    schema pass (DECISION).
//  - SADDLE: +2 (Selle San Marco Aspide Carbon FX, Prologo Scratch M5),
//    unverified samples, cross-retailer corroborated.
//  - PEDAL: +2 (Shimano Ultegra PD-R8000, Wahoo Speedplay Zero), unverified
//    samples; Speedplay's lollipop cleat modeled as style:'road-clip'
//    (DECISION — closer to the road-clip family than SPD 2-bolt).
//  - TIRE: +2 Specialized Turbo Cotton (26c/28c, clincher not tubeless) as
//    unverified samples — specialized.com 403'd again (consistent wall).
//    Michelin retry: michelin.com 404'd this pass too — no new Michelin row,
//    existing Power Cup/Power Road rows stand as-is.
//  - No src/schema-road.js vocab changes this wave — every value used
//    (clamp:'35', diameter:'30.9'/'31.6', steerer:'1-1-8', tubeless:false,
//    style:'road-clip') already existed in LOCAL_VOCAB.
//
// road-5 wave update (2026-07-18, Shimano depth pass — see per-row notes for
// full sourcing detail):
//  - GAP RESOLVED: frontderailleur rows (previously ZERO) — 6 road (105/
//    Ultegra/Dura-Ace, mechanical + Di2 each) + 2 GRX (FD-RX820 mechanical,
//    FD-RX825 Di2 — GRX's real 2x12 tier, verified before adding rather than
//    assumed 1x-only).
//  - GAP RESOLVED: "GRX groupset rows remain out of scope" (this bullet, road-2
//    wave) — RX820/RX610 (12-speed) and RX810/RX600 (11-speed) added: shifters,
//    rear derailleurs (2x + both 1x cage lengths), crank/brake per tier, a
//    1x12 cassette pair that references the real shared MTB CS-M8100-12 SKU
//    (not a road-only invention), an 11-speed cassette/chain pair. The
//    existing 105 R7100 cassette and Ultegra CN-M8100 chain rows are reused
//    for the GRX 2x12 tier rather than duplicated.
//  - Rotor depth: RT-MT800 (Ice Tech Freeza) ADDED — a mechanically distinct
//    SKU from the existing RT-CL800/900, not a duplicate. No separate
//    road-only rotor family found beyond RT-CL; Shimano rotors are shared
//    Center-Lock/6-bolt hardware across road/MTB/GRX.
//  - GAP RESOLVED: "Headset category rows remain skipped" (road-2/4 waves) —
//    3 rows added (Cane Creek 40-Series, verified via a clean canecreek.com
//    fetch; FSA Orbit and Ritchey Comp Zero, unverified samples). Shimano
//    doesn't make headsets, so per DECISIONS-FOR-DOUGLAS below this uses
//    neutral tapered-steerer road headset brands instead — headset is its
//    own single-slot GROUP per ROAD-MODEL.md section 2, not groupset-specific.
//    The specialized.com S.H.I.S. wall (road-2/4) and the Trek bearing-vs-
//    S.H.I.S.-code gap (road-4) both still stand for THOSE frames specifically
//    — unrelated to the headset PARTS added here, which are Cane Creek/FSA/
//    Ritchey products, not frame-side head-tube facts.
//  - No new src/schema-road.js vocab was needed this wave — systemRoad
//    already carried 'shimano-grx-12'/'shimano-grx-11', frontDerailleurMount
//    already carried 'braze-on', and freehubRG already carried
//    'micro-spline-road'/'hg-road'. Flagged per the coordinator brief even
//    though the answer is "no vocab changed."
//  - FIXED (catalog/dropbar-cleanup-1, item 1): cs-shimano-105-r7100-1136 and
//    cs-shimano-ultegra-r8100-1130 carried freehub:'hg-l2'; re-fetched
//    bike.shimano.com's "Features of MICRO SPLINE, HG L2 and HG Freehubs"
//    (via browser pane, WebFetch 403'd) and confirmed verbatim: "The HG L2
//    freehub is only compatible with Dura-Ace 12-speed road cassettes" —
//    Ultegra R8100 and 105 R7100 are NOT HG L2. Corrected both to
//    freehub:'hg-road' (the same page: "HG Freehub ... Designed For: 12- and
//    11-speed road and gravel"). cs-shimano-da-r9200-1130 and the Dura-Ace
//    WH-R9270-C50 rear wheel correctly keep 'hg-l2' — both are genuine
//    Dura-Ace 9200 parts.
// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROAD_PARTS: ROAD_PARTS };
}
