// data/road.js — Road catalog (LIVE — served by road.html/BuildMyRoadbike)
//
// Version: 0.1.0  |  Date: 2026-07-17  |  WENT LIVE 2026-07-20 (Douglas's flip word)
//
// *** LIVE. *** road.html loads src/compat-road.js (the shared drop-bar
// engine) + this file in production. Built per data/ROAD-MODEL.md's
// slot/category/vocab draft (that doc is the authority for the shape below;
// do not widen its vocab solo — log gaps instead, see the header note near
// the bottom). Header said OFF-LIVE until 2026-07-21 — staleness fixed at
// the seat-16 doc pass.
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
    bb: 'bsa-road', seatpost: '27.2', steerer: 'tapered', maxTire: 35, frontDerailleurMount: 'braze-on',
    frameOnly: false, weight: 1375, price: 1200,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/allez-comp-shimano-105/p/4221810',
    note: 'road-14 wave: specialized.com current Allez pages confirm E5 Premium Aluminum frame, 12x142mm thru-axle, flat-mount disc, Shimano Threaded BSA BB, 27.2mm 2-bolt alloy seatpost, and the maker-stated frame weight "1,375 grams" (catalog had 1450g, corrected). maxTire corrected 30->35mm ("tire clearance up to a beefy 35 mm (32 mm with Fenders)"). Price kept as the existing $1200 sample (page lists complete-bike prices only, no frameset-only US MSRP found).'
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
    bb: 'bb86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 33, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 780, price: 3000,
    note: 'road-14 wave: maxTire corrected 32->33mm per canyon.com\'s current Ultimate CF SLX page ("Maximum tyre clearance 33 mm"). Row left unverified overall — canyon.com/retailer listings for the current 5th-gen frame give a frameOnly weight around 885g (1.95 lbs) vs this row\'s 780g sample, and it is unclear which generation 780g corresponds to, so the weight was not promoted without a cleaner single-generation source.'
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
    bb: 'bb30a', seatpost: 'proprietary', steerer: 'cannondale-delta', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 800, price: 3200,
    note: '2026-07-21 steerer-vocab resolution (coordinator, Douglas-ruled): steerer CORRECTED tapered->cannondale-delta to match its own OEM fork (fk-cannondale-supersix-evo, whose Delta steerer cannondale.com confirmed in the road-14 wave) — the frame\'s head tube takes only that proprietary non-round steerer, so the old "tapered" value would have false-fitted standard tapered forks. Exact-match rule now fits the real pairing and errors everything else. road-15 wave: maxTire CORRECTED 30->32mm — cannondale.com SuperSix EVO Frameset page (fetched, see fk-cannondale-supersix-evo source) states "measured max tire width of 32mm" for the current Gen 5 platform. Frame row itself remains unverified (weight/price not re-confirmed this pass).'
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
    bb: 'bb86', seatpost: 'proprietary', steerer: 'overdrive-aero', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 790, price: 3900,
    note: '2026-07-21 vocab merge (coordinator, Douglas-ruled): bb CORRECTED pf86->bb86 — pf86 and bb86 both described the same physical 86.5mm press-fit road shell (Shimano SM-BB72-41B\'s own spec table says "Press-Fit... 86.5" for the pf86-tagged row; SRAM\'s BB-DUB-PF-A1 page literally lists "PF 86.5" as its bb86-tagged tier) under two different vocab spellings. bb86 kept as canonical (majority usage across road+gravel); pf86 retired from both schemas. | 2026-07-21 steerer-vocab resolution (same day): steerer CORRECTED tapered->overdrive-aero to match its OEM fork (fk-giant-tcr-advsl; Giant\'s own copy confirms the D-shaped OverDrive Aero system spans TCR/Defy/Propel) — the old "tapered" would have false-fitted standard forks/headsets.'
  },
  {
    id: 'fr-giant-defy-adv', cat: 'frame', brand: 'Giant', model: 'Defy Advanced Frameset',
    family: 'giant-defy', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 40, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 970, price: 2400,
    note: '2026-07-21 vocab merge (coordinator, Douglas-ruled): bb CORRECTED pf86->bb86, same rationale as fr-giant-tcr-advsl above — pf86/bb86 were synonym tokens for one physical 86.5mm press-fit shell. 2026-07-21 steerer-vocab resolution (same day): steerer CORRECTED tapered->overdrive-aero, same OEM-system rationale as the TCR above (Giant\'s OverDrive Aero spans TCR/Defy/Propel). road-15 wave (RE-CORRECTED): steerer CORRECTED BACK overdrive-aero->tapered — the 07-21 resolution\'s "Defy shares the TCR steerer" assumption turns out to be tier-specific, not range-wide. giant-bicycles.com (fetched: Defy Advanced 2/3 pages + static spec PDF) shows Giant\'s Defy line splits by TIER: only the Advanced SL/Pro trims carry the proprietary D-shaped "OverDrive Aero steerer" (see fk-giant-tcr-advsl for that token\'s real home); the BASE "Defy Advanced" trim (Advanced-grade Composite, non-SL — matching this row and its paired fk-giant-defy-adv fork) is spec\'d with plain "full-composite OverDrive steerer" instead — Giant\'s older OverDrive system, which giant-bicycles.com\'s own technology page (giant-bicycles.com/us/technology/detail/50) and independent coverage (Pinkbike/Singletrack 2011 Eurobike writeups) confirm is a STANDARD tapered steerer/head-tube interface (1-1/8in top, 1-1/4in bottom bearings for road), fully compatible with generic tapered headsets/stems/forks — NOT the non-round proprietary Aero bore. Left uncorrected, the overdrive-aero tag was a false restriction that would wrongly reject real tapered-fork pairings on this exact frame; corrected back to the shared tapered token. maxTire CORRECTED 35->40mm per the same Advanced-tier spec pages ("MAX TIRE CLEARANCE 40mm"). Frame row remains otherwise unverified this pass (weight/price/BB not re-confirmed).'
  },

  // ===== FORKS (rigid, travel:0 per ROAD-MODEL uniform-field convention) ==
  { id: 'fk-specialized-tarmac-sl8', cat: 'fork', brand: 'Specialized', model: 'Tarmac SL8 Fork', family: 'specialized-tarmac-sl8',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 370, price: 450,
    note: 'DEMOTED road-verify-2 (2026-07-21, vf-demote-2): re-fetched specialized.com\'s own frameset spec pages (both the Tarmac SL8 Frameset FACT 10r and S-Works FACT 12r Technical Specifications tables, via Exa) directly — the "Fork" row states only "FACT 10r/12r Carbon, 12x100mm thru-axle, flat-mount disc"; specialized.com itself never states a steerer type/shape anywhere on the page (no geometry-chart steerer row, no product-details mention). 12x100mm axle, flat-mount disc, and 32mm tire clearance are thus reconfirmed manufacturer-sourced and stand. The tapered steerer value still traces only to retailer-class listings (e.g. Performance Bicycle\'s spec sheet: "Headset Size: Integrated (Tapered) 1-1/8 to 1-1/2"), which sourceType policy rejects for a verified row (retailer-class, not manufacturer) — so this row demotes to unverified rather than keep a prose-hidden retailer citation. No per-config fork weight published anywhere sourced — 370g stays a nominal/sample figure.' },
  { id: 'fk-specialized-roubaix', cat: 'fork', brand: 'Specialized', model: 'Roubaix Future Shock Fork', family: 'specialized-roubaix',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 33, travel: 0,
    weight: 420, price: 500,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/roubaix-expert/p/184474',
    note: 'road-14 wave: specialized.com Roubaix Expert page confirms fork "Future Shock 2.0 w/ Damper, Smooth Boot, 12x100mm thru-axle, flat-mount", 33mm tire clearance; tapered steerer per the Roubaix parts/service manual (1.5in lower bearing). No per-config Future Shock fork weight published — 420g kept nominal (forks interface-verification exception).' },
  { id: 'fk-trek-emonda-slr', cat: 'fork', brand: 'Trek', model: 'Émonda SLR Fork', family: 'trek-emonda-slr',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 28, travel: 0,
    weight: 350, price: 480,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.trekbikes.com/us/en_US/equipment/cycling-components/bike-forks/rigid-bike-forks/trek-emonda-slr-700-rigid-fork/p/41856/',
    note: 'road-14 wave: trekbikes.com replacement-fork spec table confirms 12x100mm thru-axle, flat-mount disc, "Road tapered" steerer; 28mm official max tire clearance confirmed for current Emonda SLR. No per-config fork weight published by Trek — 350g kept nominal.' },
  { id: 'fk-trek-domane-slr', cat: 'fork', brand: 'Trek', model: 'Domane SLR IsoSpeed Fork', family: 'trek-domane-slr',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 38, travel: 0,
    weight: 400, price: 500,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.trekbikes.com/us/en_US/bikes/road-bikes/performance-road-bikes/domane/domane-slr/domane-slr-9/p/33299/',
    note: 'road-14 wave: trekbikes.com Domane SLR 9 spec confirms fork "Domane SLR carbon, tapered carbon steerer, internal brake routing, flat mount disc, 12x100mm thru axle" and max tire size 38mm. No per-config fork weight published — 400g kept nominal.' },
  { id: 'fk-trek-madone-slr', cat: 'fork', brand: 'Trek', model: 'Madone SLR Fork', family: 'trek-madone-slr',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 28, travel: 0,
    weight: 390, price: 520,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.trekbikes.com/gb/en_GB/equipment/cycling-components/bike-forks/rigid-bike-forks/trek-madone-slr-700c-rigid-fork/p/41855/',
    note: 'road-14 wave: trekbikes.com replacement-fork spec table confirms 12x100mm thru-axle, flat-mount disc, "Road-tapered" steerer. maxTire kept at 28mm (catalog value); current Gen 8 Madone SLR advertises up to 32mm, but the row is not pinned to a generation, so left unchanged (not contradicted, just not confirmed to that exact generation). No per-config fork weight published — 390g kept nominal.' },
  { id: 'fk-canyon-ultimate-cfslx', cat: 'fork', brand: 'Canyon', model: 'Ultimate CF SLX Fork', family: 'canyon-ultimate',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 33, travel: 0,
    weight: 365, price: 400,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.canyon.com/en-us/road-bikes/race-bikes/ultimate/',
    note: 'road-14 wave: canyon.com Ultimate CF SLX page confirms 33mm max tyre clearance (catalog had 32mm, corrected); fork axle 12x100mm + flat-mount confirmed via Canyon-sourced retailer spec sheets (F38 CF Disc, steerer "1 1/4\" ", a tapered-family bore Canyon uses instead of the more common 1.5"). No per-config fork weight published — 365g kept nominal.' },
  { id: 'fk-canyon-aeroad-cfr', cat: 'fork', brand: 'Canyon', model: 'Aeroad CFR Fork', family: 'canyon-aeroad',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 30, travel: 0,
    weight: 410, price: 480,
    note: 'road-14 wave: LEFT UNVERIFIED — flagged for follow-up. Multiple bike-spec aggregators citing Canyon\'s own sheet (asiacycles.com, roadbikedatabase.com, 99spokes.com) list the Aeroad CFR fork (Canyon FK0060) steerer as a STRAIGHT "1 1/8\"" tube, not tapered, which would contradict this row\'s steerer:"tapered". Tire clearance also reads 31-32mm across sources vs this row\'s 30mm. Did not promote to verified without a direct canyon.com product-page fetch confirming the exact steerer/clearance for this generation — a wrong steerer value would risk a false headset-fit verdict. road-15 wave: STILL UNVERIFIED, deliberately — canyon.com\'s live product page (fetched via Exa + browser pane, both confirm the maker\'s own domain) states "Maximum tyre clearance 32 mm" for the current Aeroad CFR twice (aeroad range page), matching neither this row (30mm) nor 99spokes\' figure. But the steerer/component spec TABLE on canyon.com is rendered inside a lazy-loaded accordion modal (`.productDetailComponentsModal`) that would not populate through the browser pane after multiple trigger/scroll attempts (a genuine JS-lazy-load limitation, not a bot wall — logged for a future session with more time to drive the modal open) — so the steerer field could not be directly confirmed against canyon.com itself this pass. Aggregator data (99spokes) further complicates rather than resolves it: it shows the model has gone through AT LEAST TWO different fork generations with materially different steerers — FK0060 (older gen, ~2021-2023) has an unusual two-diameter clamp (1-1/8" lower crown race, 1-1/4" upper clamp per a GranFondo teardown — a proprietary Canyon aero-steerer geometry, not the catalog\'s generic "tapered" token) vs FK0137 (current 2025/2026 gen) listed as a constant "1 1/8\" " STRAIGHT steer tube with 35mm tire clearance. Given the generation is ambiguous and the two candidate fork specs actively disagree with each other AND with this row\'s stored values, changing steerer/maxTire now risks trading one wrong guess for another. Left unverified/unchanged pending a session that can open the canyon.com components modal directly (or fetch a canyon.com PDF spec sheet) and pin the exact model-year SKU.' },
  { id: 'fk-cannondale-supersix-evo', cat: 'fork', brand: 'Cannondale', model: 'SuperSix EVO Fork', family: 'cannondale-supersix', gen: 'Gen 5',
    wheel: '700c', axle: '12x100', steerer: 'cannondale-delta', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 380, price: 420,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.cannondale.com/en/bikes/road/race/supersix-evo/supersix-evo-frameset',
    note: 'road-15 wave: cannondale.com SuperSix EVO Frameset page (fetched direct) confirms fork spec verbatim: "Fork: SuperSix EVO Carbon, integrated crown race, 12x100mm thru-axle, flat mount disc, internal routing, 1-1/8\" to 1-1/4\" Delta steerer" (separate frame-row spec on the same table is 12x142 rear thru-axle — the fork row is the 12x100mm front) + "Fly Delta"/"Delta Steerer" feature copy confirming the proprietary non-round bore -> steerer:\'cannondale-delta\' confirmed correct. Tire clearance CORRECTED 30->32mm: page states "measured max tire width of 32mm" for the current Gen 5 platform (road-14\'s 30-32 range note is resolved to the maker\'s own current figure). maxRotorF 160mm matches both build kits\' rotor specs (Shimano 160/140, SRAM 160/160) on sibling complete-bike pages. No per-part fork weight published anywhere on the site — 380g kept as the existing nominal sample figure (fork-only weights are effectively never published for road framesets).' },
  { id: 'fk-giant-tcr-advsl', cat: 'fork', brand: 'Giant', model: 'TCR Advanced SL Fork', family: 'giant-tcr',
    wheel: '700c', axle: '12x100', steerer: 'overdrive-aero', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 33, travel: 0,
    weight: 375, price: 400,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.giant-bicycles.com/ca/tcr-advanced-sl-frameset',
    note: 'road-15 wave: giant-bicycles.com/ca TCR Advanced SL Frameset page (fetched direct) confirms fork spec verbatim: "FORK Advanced SL-grade Composite, full-composite OverDrive Aero steerer, 12x100mm thru-axle, disc" + "MAX TIRE CLEARANCE 33mm" + "D-shaped fork steerer tube" feature copy naming OverDrive Aero explicitly -> steerer:\'overdrive-aero\' and maxTire:33 both confirmed correct (no change needed, closing out the road-14 wave\'s "unverified pending fresh fetch" flag). Cross-checked against the giant-bicycles.com static spec-sheet PDF (giant-tcr-advanced-sl-frameset-is-is-4176.pdf) which states the identical fork line. Flat-mount disc brakeMount carried over from the road-14 fetch (unchanged, standard on this OEM fork family). No per-part fork weight published — 375g kept as the existing nominal sample figure.' },
  { id: 'fk-giant-defy-adv', cat: 'fork', brand: 'Giant', model: 'Defy Advanced Fork', family: 'giant-defy',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 40, travel: 0,
    weight: 410, price: 420,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.giant-bicycles.com/gb/defy-advanced-2',
    note: 'road-15 wave: RE-CORRECTED steerer overdrive-aero->tapered (see the paired fr-giant-defy-adv frame note for the full explanation). giant-bicycles.com/gb Defy Advanced 2 page (fetched direct, cross-checked against the Defy Advanced 3 page and static-PDF spec sheet, all giant-bicycles.com) states the base "Defy Advanced" tier fork verbatim as "Advanced-grade Composite, full-composite OverDrive steerer, 12x100mm thru-axle, disc" — plain OverDrive (Giant\'s open, standard tapered steerer/head-tube system per giant-bicycles.com/us/technology/detail/50), NOT the proprietary D-shaped OverDrive Aero bore used on the Defy Advanced SL/Pro trims and the TCR (fk-giant-tcr-advsl). The road-14/07-21 "Defy shares the TCR steerer" note conflated the two Defy tiers; corrected here to the real base-tier spec so the exact-match steerer rule stops falsely rejecting standard tapered fork/headset pairings on this SKU. maxTire CORRECTED 35->40mm ("MAX TIRE CLEARANCE 40mm" on the same page). Axle 12x100mm + flat-mount disc confirmed unchanged. No per-part fork weight published — 410g kept as the existing nominal sample figure.' },

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
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 38,
    weight: 710, price: 1175,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/roval-rapide-clx-ii/p/205440',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED specialized.com via the browser pane (this session; the file\'s standing "Specialized 403s WebFetch" wall did not block the browser pane today — matches this project\'s "JS-rendered != bot-walled" doctrine). Spec table: "Front Rim Dimensions: Depth 51mm, Internal Width 21mm, Max External Width 35mm" (confirms intWidth:21), "Front Hub: Roval Aero Hub (AFD01), CenterLock, 100x12mm" (confirms hub:\'12x100\'/rotorMount:\'center-lock\'), "Approved Tire Widths: 24mm-38mm" (maxTire CORRECTED 42->38, was an unsourced sample), "Front Weight: 710g (including 15g tubeless rim tape and tubeless valve)" (weight CORRECTED 675->710). Price: the page shows one "Starting at $1,174.99" regardless of the Front/Rear size selector — read as a per-wheel price (Roval sells replacement wheels individually) rather than the pair; not unambiguous, flagged. Rounds to $1175, replacing the 2500 unsourced sample (which the page does not support as a pair total either).' },
  { id: 'rw-roval-rapide-clx-ii', cat: 'rearwheel', brand: 'Roval', model: 'Rapide CLX II', family: 'roval-rapide-clx',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 38,
    weight: 810, price: 1175,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/roval-rapide-clx-ii/p/205440',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED specialized.com via the browser pane, same page/session as the front row. Spec table: "Rear Rim Dimensions: Depth 60mm, Internal Width 21mm" (confirms intWidth:21), "Rear Hub: Roval Aero Hub (AFD02R), CenterLock, 142x12mm, DT Swiss EXP" (confirms hub:\'12x142\'), "Rear Freehub Body: DT Swiss Ratchet EXP Shimano 11spd" — FREEHUB CORRECTED xdr->hg-road (a real false-fit bug: the prior xdr value would have wrongly required an XDR-driver cassette and wrongly rejected this file\'s Shimano hg-road-driver cassettes, when the maker page states the shipped driver is Shimano 11-speed). "Approved Tire Widths: 24mm-38mm" (maxTire CORRECTED 42->38). "Rear Weight: 810g (including 15g tubeless rim tape, tubeless valve, HG Freehub)" (weight CORRECTED 815->810). Price: same per-wheel-vs-pair ambiguity as the front row\'s note; $1175 replaces the 2500 unsourced sample.' },
  // fw/rw-hunt-3648-aerodynamicist REMOVED (road-12 wave): road-11 flagged "HUNT 36/48
  // Aerodynamicist" as possibly fictitious after an exhaustive check found no "36/48" combo
  // in HUNT's current or discontinued Aerodynamicist lineup. road-12 re-verified directly —
  // huntbikewheels.com's live Aerodynamicist collection page (fetched via the browser pane)
  // lists exactly three depth combos, current-gen: 34_34, 44_46, 54_58 (no 36, no 48, no
  // 36/48); a 2019-window Wayback capture of the same collection page shows the identical
  // three-combo range, so this isn't a dropped older-gen SKU either. A dedicated web search
  // for "HUNT 36 Aerodynamicist" surfaces only an unrelated real product, the rim-brake-era
  // "HUNT 36 Carbon Wide Aero" (a single-depth, non-Aerodynamicist-branded wheelset with no
  // front/rear split) — not a plausible source of this row's name. No manufacturer page, no
  // archive snapshot, and no retailer/review listing anywhere names a "36/48 Aerodynamicist."
  // Confirmed fictitious per THE BAR; removed rather than left as a permanent flag (ids were
  // never exposed to a real share link — road.html went live only 2026-07-20).
  { id: 'fw-shimano-c50-r9270', cat: 'frontwheel', brand: 'Shimano', model: 'Dura-Ace WH-R9270-C50-TL', family: 'shimano-r9270',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 674, price: 2000,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/WH-R9270-C50-TL-F',
    note: 'road-7 wave: productinfo.shimano.com spec table (WH-R9270-C50-TL-F) confirms "Internal width (mm) 21", "Recommended size 25-622 - 32-622" (maxTire:32), "Thru axle 100 x 12 ✔" (12x100), "Disc mount CENTER LOCK ✔". "Average weight (g) (w/o quick release, rim tape, tubeless tape, valve stem, lock ring) 674" replaces the 690g sample. Model corrected to the page\'s "Model name" (WH-R9270-C50-TL — the plain "-C50" is not a purchasable SKU, only the -TL/-TU front/rear split codes are). Price ($2000) is an unsourced sample; no MSRP field on this page.' },
  { id: 'rw-shimano-c50-r9270', cat: 'rearwheel', brand: 'Shimano', model: 'Dura-Ace WH-R9270-C50-TL', family: 'shimano-r9270',
    wheel: '700c', hub: '12x142', freehub: 'hg-l2', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 787, price: 2000,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/WH-R9270-C50-TL-R',
    note: 'road-7 wave: productinfo.shimano.com spec table (WH-R9270-C50-TL-R) confirms "HG spline L2 (ROAD 12-speed dedicated) ✔" (hg-l2), "Thru axle 142 x 12 ✔" (12x142), "Rear speeds 12", same rim/tire specs as the front. "Average weight (g) (w/o quick release, rim tape, tubeless tape, valve stem, lock ring) 787" replaces the 800g sample. See front-wheel note for the model-name correction (WH-R9270-C50-TL). Price ($2000) is an unsourced sample.' },

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
  { id: 'fw-shimano-rx880-grx', cat: 'frontwheel', brand: 'Shimano', model: 'WH-RX880-TL', family: 'shimano-rx880',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 25, maxTire: 50,
    weight: 635, price: 800,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/WH-RX880-TL-F12-700C',
    note: 'road-7 wave: productinfo.shimano.com spec table (WH-RX880-TL-F12-700C) confirms "Internal width (mm) 25", "Recommended size 32-622 - 50-622" (maxTire:50), "Thru axle 100 x 12 ✔", "Disc mount CENTER LOCK ✔" — upgrading the road-5 gap-fill\'s retailer-sourced figures to a fetched maker page. "Average weight (g) (w/o quick release, rim tape, tubeless tape, valve stem, lock ring) 635" replaces the previous estimated-split 627g (that figure was a guessed ~45% share of a claimed pair weight; this is the page-stated front figure).' },
  { id: 'rw-shimano-rx880-grx', cat: 'rearwheel', brand: 'Shimano', model: 'WH-RX880-TL', family: 'shimano-rx880',
    wheel: '700c', hub: '12x142', freehub: 'micro-spline-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 25, maxTire: 50,
    weight: 759, price: 800,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/WH-RX880-TL-R12-700C',
    note: 'road-7 wave: productinfo.shimano.com spec table (WH-RX880-TL-R12-700C) confirms the rear hub is dual-driver convertible — "Spline type MICRO SPLINE ✔" AND "HG spline L2 (ROAD 12-speed dedicated) ✔" both checked, with per-driver weights listed separately: "762 (HG-spline L2) / 759 (MICRO SPLINE)". This row models the MICRO SPLINE build (759g, closing the file\'s GRX 1x12 gap per the road-5 rationale — cs-shimano-grx-m8100-* cassettes), replacing the previous estimated-split 767g. "Thru axle 142 x 12 ✔" confirmed. See front-wheel note for the model-name correction (WH-RX880-TL, not "GRX WH-RX880").' },
  { id: 'fw-shimano-rs710-c46', cat: 'frontwheel', brand: 'Shimano', model: 'WH-RS710-C46-TL', family: 'shimano-rs710',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 719, price: 625,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/WH-RS710-C46-TL-F',
    note: 'road-7 wave: productinfo.shimano.com spec table (WH-RS710-C46-TL-F, "Model name WH-RS710") confirms "Internal width (mm) 21", "Recommended size 25-622 - 32-622" (maxTire:32), "Thru axle 100 x 12 ✔", "Disc mount CENTER LOCK ✔". "Average weight (g) (w/o quick release, rim tape, tubeless tape, valve stem, lock ring) 719" matches the road-5 gap-fill retailer figure exactly, now upgraded to a fetched maker page. Model corrected to drop the retailer "105" prefix (the page\'s own "Series" field reads "SHIMANO", not "105" — WH-RS710 is a Shimano-branded wheel, not badged under the 105 groupset name).' },
  { id: 'rw-shimano-rs710-c46', cat: 'rearwheel', brand: 'Shimano', model: 'WH-RS710-C46-TL', family: 'shimano-rs710',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 893, price: 625,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/WH-RS710-C46-TL-R',
    note: 'road-7 wave: productinfo.shimano.com spec table (WH-RS710-C46-TL-R) confirms "HG spline L (ROAD 12/11-speed) ✔" (this file\'s hg-road freehub token), "Thru axle 142 x 12 ✔", "Rear speeds 12/11" (compatible with both this file\'s 11- and 12-speed hg-road cassettes: Ultegra R8100, 105 R7100, Tiagra 4700, GRX RX810/RX600). "Average weight (g) ... 893" matches the road-5 sample exactly. See front-wheel note for the model-name correction.' },
  { id: 'fw-campagnolo-zonda-c17-disc', cat: 'frontwheel', brand: 'Campagnolo', model: 'Zonda C17 Disc', family: 'campagnolo-zonda-c17',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 32,
    weight: 754, price: 550,
    archiveUrl: 'https://web.archive.org/web/20241005194233/https://www.campagnolo.com/us-en/zonda-disc-brake/WWRZONDADB.html',
    note: 'DEMOTED road-verify-2 (2026-07-21, vf-demote-2): a live campagnolo.com fetch (li-en/zonda-disc-brake/WWRZONDADB.html, same SKU under a different locale) confirms disc brake, "AFS disc interface", "Compatible with 12 mm pivot, 100/142 mm flange", "1675 g", "Profile width: 22 mm" — the same facts as the prior Wayback snapshot, so intWidth/hub/weight-pair figures stand. But the paired rear row\'s freehub:\'campag-11\' was flagged as "not independently confirmed" and neither the live page nor the archived one itemizes a driver-body/freehub spec field at all — that field is an assumption, not a sourced fact, so per policy (an unconfirmed ERROR-tier field disqualifies verified:true on the pair) BOTH wheels demote to unverified this pass. Was road-11 wave: campagnolo.com\'s us-en site 404s the old SKU URL — Wayback URL moved to archiveUrl (the schema field for exactly this). No maxTire figure is stated on either page ("Wheel for clincher tyre" only) — maxTire stays the pre-existing sample. Price: both pages state "Price from € 659" (a whole-pair EUR figure, ~$700-750 at typical FX) — not converted into this row\'s USD price field per this project\'s no-live-FX convention; the existing $550 stays an unsourced sample, likely low vs. the sourced EUR figure. This row\'s 754g stays an estimated ~45% share of the 1675g pair total, not a page-stated per-wheel split.' },
  { id: 'rw-campagnolo-zonda-c17-disc', cat: 'rearwheel', brand: 'Campagnolo', model: 'Zonda C17 Disc', family: 'campagnolo-zonda-c17',
    wheel: '700c', hub: '12x142', freehub: 'campag-11', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 32,
    weight: 921, price: 550,
    archiveUrl: 'https://web.archive.org/web/20241005194233/https://www.campagnolo.com/us-en/zonda-disc-brake/WWRZONDADB.html',
    note: 'DEMOTED road-verify-2 (2026-07-21, vf-demote-2): see front-wheel note (fw-campagnolo-zonda-c17-disc) for the full finding — a live campagnolo.com fetch (li-en locale) reconfirms the archived page\'s facts but, like the archived page, itemizes no driver-body/freehub spec field at all. freehub:\'campag-11\' remains an unconfirmed assumption (a Shimano-HG-driver version of this same wheel is also sold, per the road-5 gap-fill\'s original note) for this ERROR-tier field, so both wheels in the pair demote to unverified. Wayback URL moved to archiveUrl. This row\'s 921g stays the estimated ~55% share of the 1675g pair total, not a page-stated per-wheel split.' },

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
    wheel: '700c', width: 26, tubeless: true, compound: 'Graphene + Silica',
    weight: 260, price: 95,
    verified: true, lastChecked: '2026-07-21', source: 'https://int.vittoria.com/products/corsa-pro-tubeless-ready',
    note: 'road-14 wave: vittoria.com spec table confirms 700x26c=260g, compound corrected Graphene 2.0 -> Graphene + Silica (current site wording); price is a sample (page lists EUR, no US MSRP).' },
  { id: 'ti-vittoria-corsapro-tlr-28', cat: 'tire', brand: 'Vittoria', model: 'Corsa Pro TLR 28c', family: 'vittoria-corsapro',
    wheel: '700c', width: 28, tubeless: true, compound: 'Graphene + Silica',
    weight: 280, price: 95,
    verified: true, lastChecked: '2026-07-21', source: 'https://int.vittoria.com/products/corsa-pro-tubeless-ready',
    note: 'road-14 wave: vittoria.com spec table gives 700x28c=280g (catalog had 290g); compound corrected to Graphene + Silica. Price is a sample (EUR RRP on page, no US MSRP).' },
  { id: 'ti-pirelli-pzero-race-26', cat: 'tire', brand: 'Pirelli', model: 'P Zero Race TLR 26c', family: 'pirelli-pzero-race',
    wheel: '700c', width: 26, tubeless: true, compound: 'SmartEVO',
    weight: 290, price: 80,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.pirelli.com/tires/en-us/bike/tires/catalogue/p-zero-race-tlr/26-622',
    note: 'road-14 wave: pirelli.com catalogue page confirms 26-622=290g SpeedCORE/SmartEVO (catalog had 255g, corrected).' },
  { id: 'ti-pirelli-pzero-race-28', cat: 'tire', brand: 'Pirelli', model: 'P Zero Race TLR 28c', family: 'pirelli-pzero-race',
    wheel: '700c', width: 28, tubeless: true, compound: 'SmartEVO',
    weight: 315, price: 80,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.pirelli.com/tires/en-us/bike/tires/catalogue/p-zero-race-tlr/28-622',
    note: 'road-14 wave: pirelli.com catalogue page confirms 28-622=315g SpeedCORE/SmartEVO (catalog had 290g, corrected).' },
  { id: 'ti-schwalbe-proone-tle-28', cat: 'tire', brand: 'Schwalbe', model: 'Pro One TLE 28c', family: 'schwalbe-proone',
    wheel: '700c', width: 28, tubeless: true, compound: 'Addix Race',
    weight: 280, price: 80,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.schwalbetires.com/Schwalbe-Pro-One-Tubeless-11654217',
    note: 'road-14 wave: schwalbetires.com (manufacturer site) product page 11654217 (28-622, ADDIX Race, TLE) lists 280g (catalog had 285g, corrected).' },
  { id: 'ti-schwalbe-proone-tle-30', cat: 'tire', brand: 'Schwalbe', model: 'Pro One TLE 30c', family: 'schwalbe-proone',
    wheel: '700c', width: 30, tubeless: true, compound: 'Addix Race',
    weight: 305, price: 80,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.schwalbetires.com/Schwalbe-Pro-One-Tubeless-11654218',
    note: 'road-14 wave: schwalbetires.com product page 11654218 (30-622, ADDIX Race, TLE) lists 305g (catalog had 310g, corrected).' },
  { id: 'ti-goodyear-eaglef1-r-28', cat: 'tire', brand: 'Goodyear', model: 'Eagle F1 R Tubeless 28c', family: 'goodyear-eaglef1-r',
    wheel: '700c', width: 28, tubeless: true, compound: 'Dynamic:UHP',
    weight: 310, price: 75,
    verified: true, lastChecked: '2026-07-21', source: 'https://goodyearbike.com/products/eagle-f1-r',
    note: 'road-14 wave: goodyearbike.com spec table (GR.017.28.622.V003.R, Tubeless Ready/Short-Ply 120tpi) lists 310g (catalog had 290g, corrected); compound corrected Dynamic:GSR -> Dynamic:UHP (GSR is an older Eagle F1 tier, not this SKU).' },
  { id: 'ti-goodyear-eaglef1-r-32', cat: 'tire', brand: 'Goodyear', model: 'Eagle F1 R Tubeless 32c', family: 'goodyear-eaglef1-r',
    wheel: '700c', width: 32, tubeless: true, compound: 'Dynamic:UHP',
    weight: 345, price: 80,
    verified: true, lastChecked: '2026-07-21', source: 'https://goodyearbike.com/products/eagle-f1-r',
    note: 'road-14 wave: goodyearbike.com spec table (GR.017.32.622.V003.R) lists 345g (catalog had 330g, corrected); compound corrected to Dynamic:UHP.' },

  // ===== DRIVETRAIN — SRAM RED AXS (2x12, wireless) ========================
  { id: 'sh-sram-red-axs', cat: 'shifter', brand: 'SRAM', model: 'RED AXS Shifter/Brake Lever (pair)', family: 'sram-red-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 370, price: 565,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-red-e1',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-red-e1 this session (browser pane) - unchanged from road-8\'s fetch: "RED AXS HRD Shift-Brake System" (ED-RED-E1), $745 MSRP, "LEVER ORIENTATION Left, Right" (confirms side:\'pair\'), "BRAKE ORIENTATION Front, Rear", "DEFAULT FUNCTION AXS - Front Derailleur, AXS - Rear Derailleur" (confirms frontShift:true), AXS wireless, hydraulic disc (brakeSystem/actuation). Every engine-read interface field on this row is now manufacturer-confirmed against SRAM\'s own bundle page, so this UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception (VERIFY-PROTOCOL.md): SRAM sells RED AXS levers+calipers as ONE $745 SKU with no per-slot price ever published, so per-slot PRICE stays the road-8 honest ESTIMATE (565 + br-sram-red-axs\'s 180 = 745, the real bundle MSRP - never claimed as a per-unit MSRP, per THE PRICE RULE). Weight (370g) stays a nominal per-slot SAMPLE - the page\'s only weight figure is "WEIGHT (G) 1378 / WEIGHT BASED ON: Left and Right lever with coin cell batteries, with Stealthamajig, caliper, and all hydraulic fluid. 20mm caliper bracket, caliper bracket bolts, and mounting bolts" - a whole-system figure spanning both levers + both calipers + fluid + hardware, not divisible to this row alone.' },
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
    weight: 320, price: 180,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-red-e1',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-red-e1 this session (browser pane) alongside its leverPair sh-sram-red-axs - "BRAKE ORIENTATION Front, Rear", flat-mount hydraulic disc, matching this row\'s brakeSystem/mount/actuation exactly. UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception: SRAM sells no separate caliper-only RED AXS SKU/price, so per-slot PRICE stays the road-8 honest ESTIMATE (180 + sh-sram-red-axs\'s 565 = 745, the real ED-RED-E1 bundle MSRP - never claimed as a per-unit MSRP, per THE PRICE RULE). Weight (320g) stays a nominal per-slot SAMPLE - the page\'s only weight figure is the 1378g whole-system total (see sh-sram-red-axs\'s note for the exact quoted basis), not divisible to the caliper pair alone.' },
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
    weight: 400, price: 299,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-frc-e1',
    note: 'road-11 wave (SRAM shifter price reconciliation): re-fetched sram.com/en/sram/models/ed-frc-e1 directly (the same bundled-shift-brake-SKU exception road-10 already applied to RED/Rival/Apex) — "Force AXS HRD Shift-Brake System" (ED-FRC-E1), "MSRP $385", "LEVER ORIENTATION Left, Right" (confirms side:\'pair\'), "BRAKE ORIENTATION Front, Rear", "DEFAULT FUNCTION AXS - Front Derailleur, AXS - Rear Derailleur" (confirms frontShift:true), AXS wireless, hydraulic disc — matches this row\'s interface fields exactly. THE FIX: this row and its leverPair br-sram-force-axs had NEVER been reconciled to this real $385 bundle total — sh(900)+br(260)=1160, over 3x the real MSRP, the exact tier-wide discrepancy flagged by the gravel-6 wave and this wave\'s scope. PRICE CORRECTED 900->299, split proportionally to the prior 900:260 ratio so the two rows sum EXACTLY to $385: 299 + br-sram-force-axs\'s 86 = 385. Both per-slot figures remain honest ESTIMATES, never a per-unit MSRP claim (THE PRICE RULE) — SRAM sells no separate lever-only or caliper-only Force AXS SKU/price. Weight (400g) stays a nominal per-slot SAMPLE — the page publishes no weight figure for this SKU (matches the road-10 RED/Rival/Apex rows\' same gap).' },
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
    weight: 286, price: 86,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-frc-e1',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'road-11 wave (SRAM shifter price reconciliation): re-fetched sram.com/en/sram/models/ed-frc-e1 alongside its leverPair sh-sram-force-axs — "BRAKE ORIENTATION Front, Rear", flat-mount hydraulic disc, matching this row\'s brakeSystem/mount/actuation exactly. PRICE CORRECTED 260->86: SRAM sells no separate caliper-only Force AXS SKU/price, so PRICE is re-split proportionally to the prior 900:260 ratio: 86 + sh-sram-force-axs\'s 299 = 385, the real ED-FRC-E1 bundle MSRP (replaces the prior unreconciled 900+260=1160 total, the exact discrepancy flagged tier-wide by the gravel-6 wave). Still an honest per-slot ESTIMATE, never a per-unit MSRP claim (THE PRICE RULE). Weight (286g) is unchanged — BikeRadar\'s independently-weighed figure for the caliper pair, unaffected by the price fix.' },
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
    weight: 470, price: 219,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-riv-e1',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-riv-e1 this session - road-5\'s flag confirmed unchanged: "Rival AXS HRD Shift-Brake System" (ED-RIV-E1), $280 MSRP, "LEVER ORIENTATION Left, Right" (confirms side:\'pair\'), "BRAKE ORIENTATION Front, Rear", "DEFAULT FUNCTION AXS - Front Derailleur, AXS - Rear Derailleur" (confirms frontShift:true), AXS wireless, hydraulic disc. Every engine-read interface field is manufacturer-confirmed on SRAM\'s own bundle page, so this UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception (VERIFY-PROTOCOL.md), same shape as RED AXS. SRAM sells no separate lever-only or caliper-only Rival AXS SKU/price - PRICE is re-split proportionally to the prior (unsourced) 650:180 sample ratio so the two rows sum EXACTLY to the real $280 bundle MSRP: 219 + br-sram-rival-axs\'s 61 = 280 (replaces the prior 650+180=830 total, which was never grounded in any published number). Both per-slot figures remain honest ESTIMATES, never a per-unit MSRP claim (THE PRICE RULE). Weight (470g) stays a nominal per-slot SAMPLE — the page publishes no weight at all for this SKU.' },
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
    weight: 360, price: 61,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-riv-e1',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-riv-e1 this session alongside its leverPair sh-sram-rival-axs — "BRAKE ORIENTATION Front, Rear", flat-mount hydraulic disc, matching this row\'s brakeSystem/mount/actuation exactly. UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception: SRAM sells no separate caliper-only Rival AXS SKU/price, so PRICE is re-split proportionally to the prior 650:180 sample ratio: 61 + sh-sram-rival-axs\'s 219 = 280, the real ED-RIV-E1 bundle MSRP (replaces the prior unsourced 650+180=830 total). Still an honest per-slot ESTIMATE, never a per-unit MSRP claim (THE PRICE RULE). Weight (360g) stays a nominal per-slot SAMPLE — the page publishes no weight at all for this SKU.' },
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
    weight: 520, price: 354,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/sd-apx-d1',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/sd-apx-d1 (browser pane spec table) this session — road-5\'s "single right-hand lever" read was correct and resolves the price wall: "LEVER ORIENTATION Right", $270 MSRP, "DRIVETRAIN CONFIGURATION 1x", 12-speed, DoubleTap mechanical actuation, hydraulic disc, "BRACKET (DISC BRAKE) Flat Mount 20mm offset". Apex\'s shape differs from RED/Rival AXS: SRAM does NOT sell one pair-covering bundle SKU here — it sells TWO side-specific lever+caliper bundles, confirmed by also fetching the companion left lever, sram.com/en/sram/models/db-apx-d1 ("Apex Disc Brake", $225 MSRP, "no need for a shift mechanism," "ORIENTATION Left/Front, Left/Rear," same Flat Mount 20mm bracket, hydraulic) — this is the brake-only left-hand lever that pairs with SD-APX-D1\'s shifting right-hand lever to form the full 1x lever set (matches this row\'s frontShift:false — Apex 1x has no front-derailleur shift function on either side). Real total for the lever pair = 270 + 225 = 495 (no per-function lever-vs-caliper split is ever published — SRAM prices per SIDE, not per SLOT). Every engine-read interface field (system/speeds/actuation/brakeSystem) is now manufacturer-confirmed, so this UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception (VERIFY-PROTOCOL.md), extended to this per-side-bundle shape. PRICE is re-split proportionally to the prior 300:120 sample ratio so the two rows sum to the real $495 total: 354 + br-sram-apex-mech\'s 141 = 495 (replaces the prior unsourced 300+120=420). Honest per-slot ESTIMATE only, never a per-unit MSRP claim (THE PRICE RULE). Weight (520g) stays a nominal per-slot SAMPLE — neither page publishes any weight figure.' },
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
    weight: 380, price: 141,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/db-apx-d1',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/db-apx-d1 (browser pane spec table) this session alongside sram.com/en/sram/models/sd-apx-d1 — "Apex Disc Brake" (DB-APX-D1), $225 MSRP, flat-mount hydraulic disc, "BRACKET (DISC BRAKE) Flat Mount 20mm offset" matching this row\'s mount/actuation exactly; this is the left-hand brake-only lever+caliper unit that pairs with SD-APX-D1\'s right-hand shift-brake unit — see sh-sram-apex-mech\'s note for the full per-side shape (SRAM prices this system per SIDE, not per shifter/brake SLOT). UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception, extended to this per-side-bundle shape. PRICE is re-split proportionally to the prior 300:120 sample ratio: 141 + sh-sram-apex-mech\'s 354 = 495, the real two-lever total (270 SD-APX-D1 shift-brake + 225 DB-APX-D1 brake-only = 495) — replaces the prior unsourced 300+120=420. Honest per-slot ESTIMATE only, never a per-unit MSRP claim (THE PRICE RULE). Weight (380g) stays a nominal per-slot SAMPLE — neither page publishes any weight figure.' },

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
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CS-R8101-12',
    note: 'road-7 wave: the road-6 wave\'s freehub conflict (hg-l2 vs hg-road, full writeup was here) is now RESOLVED at the engine level — C-731\'s compatibility chart (fetched verbatim 2026-07-20) confirmed HG spline L2 accepts the whole ROAD-12 cassette class (not Dura-Ace-only), and compat-road.js\'s rg-freehub rule now silently fits a road-12 cassette on either hg-road or hg-l2 regardless of which token the row carries (see src/compat-road.js "HG-L2 DUAL-BODY FIT" comment, PROJECT-LOG.md 2026-07-20). That clears the blocker — re-fetched productinfo.shimano.com/en/product/CS-R8101-12 fresh this wave and confirmed "Combination name (Group name) 11-30T, 11-34T" (11-30T real) and "Average weight (g) 291 (11-30T)" — exact match to this row\'s existing 291g. Now marked verified. Model string (CS-R8101-12) unchanged from the road-6 correction.' },
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
  { id: 'cs-shimano-105-r7100-1136', cat: 'cassette', brand: 'Shimano', model: '105 CS-R7101-12 11-34', family: 'shimano-r7100',
    system: 'shimano-road-12', speeds: 12, freehub: 'hg-road', minCog: 11, maxCog: 34,
    weight: 361, price: 90,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CS-R7101-12',
    note: 'road-8 wave (2026-07-20): browser-pane fetch of productinfo.shimano.com/en/product/CS-R7101-12 (WebFetch renders this host empty per this catalog\'s known limitation) confirms the spec table lists exactly one combination — "Combination name (Group name) 11-34T", teeth 11-12-13-14-15-17-19-21-24-27-30-34T — no 11-36T SKU exists for CS-R7101-12. Corrected maxCog 36→34 (was flagged unverified by road-6/road-7 for this exact mismatch) and model string to "105 CS-R7101-12 11-34" (was mislabeled "...11-36"). Now verifiable: the freehub half of the original conflict was already resolved at the engine level (rg-freehub C-731 dual-body fix), and this range correction resolves the remaining blocker. Weight 361g matches the page\'s stated average weight exactly (id token \'-1136\' predates this correction and is left as-is per the append-only id rule). test/test-road-engine.js\'s rg-rd-capacity pins (lines ~182-187) are updated in the same wave to assert against the corrected 34T range — see that file\'s commit for the honest before/after.' },
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
    weight: 109, price: 60,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/pdfs/product/archive/2019-2020_Specifications_v034_en.pdf',
    note: 'road-11 wave (Shimano archive chase): productinfo.shimano.com\'s live SKU search 404s "RT-MT800" (current edition dropped it, same wall this file already hit on CN-4600/BR-RX810/FC-RX600); resolved via /en/archive\'s 2019-2020 Specifications PDF (Ver.3.4, Feb 14 2020), rendered at 150dpi per the mtb-tail-4 doctrine (pdftotext -layout garbles these dense tables) — GENERAL section, "Disc Brake Rotor" table, printed p.209 (file p.212): RT-MT800 row confirms Center Lock ✓, ICE TECHNOLOGIES ✓, ICE TECHNOLOGIES FREEZA ✓, 203/180/160/140mm all ✓ (matches size:160, mount:\'center-lock\'), "Average Weight (w/o lock ring): 164g (203mm), 132g (180mm), 109g (160mm), 88g (140mm)" — this row\'s 160mm figure corrected 130(sample)->109 (w/o lock ring, matching this file\'s other Shimano rotor rows\' weight-basis convention). Cross-corroborated on the same archive PDF\'s BR-RX810 caliper page (printed p.125): "Recommended brake rotor: SM-RT800 / RT-MT800" — confirms this is a genuine GRX-recommended SKU, not a fabricated/duplicate one.' },

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
    weight: 552, price: 360,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/spec/gravel-shiftbrake-lever-hydraulic-disc-brake',
    note: 'road-9 wave: browser-pane fetch of productinfo.shimano.com\'s Gravel > Shift/Brake Lever spec table confirms the ST-RX820-LA is real: "Shifter type: Single lever for dropper seat post" (0 shift functions of its own — pairs with the right-side ST-RX820-R, which carries the 12-speed rear shift, for a complete 1x GRX cockpit), "Recommended brake caliper: BR-RX820", hydraulic disc, mechanical (cable) actuation — confirms every interface field on this row. The page states PER-LEVER weights, not a pair figure: ST-RX820-R 289g + ST-RX820-LA 263g = 552g for the pair this row represents (corrected from the prior 760g sample). No price on the page (Shimano publishes no component MSRPs) — $360 stays an unsourced sample, basis stated per THE PRICE RULE.' },
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
    weight: 570, price: 280,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/ST-RX810-R',
    note: 'road-7 wave: productinfo.shimano.com spec tables for both halves confirm the pairing — ST-RX810-R: "Rear speeds 11", "Oil SHIMANO Mineral" (disc-hydraulic), average weight 286g; ST-RX810-L: "Front speeds 2" (frontShift:true), "Recommended brake caliper BR-RX810, BR-RX820", average weight 284g. Pair weight (570g) is the page-stated L+R sum, replacing the 800g unsourced sample. Price ($280) unsourced.' },
  { id: 'sh-shimano-grx-rx600-2x', cat: 'shifter', brand: 'Shimano', model: 'GRX ST-RX600 Shift/Brake Lever (pair, 2x)', family: 'shimano-grx-rx600',
    system: 'shimano-grx-11', speeds: 11, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 613, price: 180,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/ST-RX600-R',
    note: 'road-7 wave: productinfo.shimano.com spec tables for both halves: ST-RX600-R: "Rear speeds 11", "Oil SHIMANO Mineral" (disc-hydraulic), average weight 307g; ST-RX600-L: "Front speeds 2" (frontShift:true), average weight 306g — the budget-tier 11-speed sibling of ST-RX810 (also corroborated by productinfo.shimano.com C-454\'s "ST-RX600: 2x11-speed", already cited on the RX820-tier rows). Pair weight (613g) is the page-stated L+R sum, replacing the 850g unsourced sample. Price ($180) unsourced.' },
  { id: 'rd-shimano-grx-rx810', cat: 'rearderailleur', brand: 'Shimano', model: 'GRX RD-RX810 (2x11)', family: 'shimano-grx-rx810',
    system: 'shimano-grx-11', speeds: 11, actuation: 'mechanical', maxCog: 34, cage: 'medium', mount: 'std-hanger',
    weight: 255, price: 100,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/RD-RX810',
    note: 'road-7 wave: productinfo.shimano.com spec table confirms "Rear speeds 11", "Low sprocket Max. 34T" (maxCog:34, matching the road-5 BikeRadar figure), "SHIMANO ROAD type: Direct attachment (conventional) ✔" (std-hanger). Average weight 255g replaces the 290g sample. cage:\'medium\' is this file\'s convention for the SHADOW RD+ single-cage GRX 11-speed mech (page does not itemize a cage-length field, only construction "SHIMANO SHADOW RD+ ✔").' },
  { id: 'cs-shimano-grx-hg800-1134', cat: 'cassette', brand: 'Shimano', model: 'CS-HG800-11 11-34T', family: 'shimano-grx-cs-hg800',
    system: 'shimano-grx-11', speeds: 11, freehub: 'hg-road', minCog: 11, maxCog: 34,
    weight: 335, price: 70,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CS-HG800-11',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Combination name (Group name) 11-34T", "Rear speeds 11", "HG spline M (10/9/8-speed, MTB 11-speed...) checked" / L2 not checked — an 11-speed cassette, so no HG-L2 dispute here (unlike the 12-speed Ultegra/105 rows above). freehub:\'hg-road\' is the closest available ROAD_VOCAB token to "HG spline M" (this schema has no separate M-vs-L token). Average weight 335g (was a 380g sample).' },
  { id: 'ch-shimano-grx-hg701', cat: 'chain', brand: 'Shimano', model: 'CN-HG701-11 Chain', family: 'shimano-grx-cn-hg701',
    system: 'hg', speeds: 11,
    weight: 257, price: 30,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CN-HG701-11',
    note: 'road-7 wave: productinfo.shimano.com spec table confirms "Type LINKGLIDE, HG 11-speed" and "Average weight (g) (114 links) 257" — exact match to the existing 257g sample, now upgraded from the road-5 BikeRadar citation to a fetched maker page. The 11-speed HG chain paired with GRX RX810/RX600 (shared with Ultegra 11sp, matching this file\'s convention of tagging shared HG chains system:\'hg\'). Price ($30) unsourced.' },
  { id: 'cr-shimano-grx-rx810-2x', cat: 'crankset', brand: 'Shimano', model: 'GRX FC-RX810-2 Crankset', family: 'shimano-grx-rx810',
    bb: '24mm-road', chainrings: '2x', ring: '48/31', ringStd: 'standard-12', speeds: 11, chainline: 47,
    weight: 710, price: 220,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/FC-RX810-2',
    note: 'road-6 wave: productinfo.shimano.com spec table confirms "Chainring combination 48-31T", "Rear speeds 11", "Chain line (mm) 47" (GRX\'s wider gravel-clearance chainline vs the 44.5mm road cranks above — newly captured), Outboard/Hollowtech II BB (24mm-road). Average weight (170mm, w/o BB) 710g (was a 720g sample).' },
  { id: 'cr-shimano-grx-rx600-2x', cat: 'crankset', brand: 'Shimano', model: 'GRX FC-RX600-11 Crankset', family: 'shimano-grx-rx600',
    bb: '24mm-road', chainrings: '2x', ring: '46/30', ringStd: 'standard-12', speeds: 11, chainline: 46.9,
    weight: 806, price: 130,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/pdfs/product/archive/2019-2020_Specifications_v034_en.pdf',
    note: 'road-11 wave (Shimano archive chase): CORRECTION — "FC-RX600-2" is not a real Shimano model number (2026-07-20\'s road-6/7 waves never itemized this SKU\'s own spec page); the archive edition\'s "Front Chainwheel" table (2019-2020 Specifications PDF, printed p.126, file p.129) lists the real GRX FC-RX600 2x SKUs by rear-speed count: FC-RX600-11 (11-speed) and FC-RX600-10 (10-speed) — this row\'s speeds:11 matches FC-RX600-11 exactly: "Rear speeds 11", "Chain ring combination 46-30T" (confirms ring:\'46/30\'), "Chainline (mm) 46.9" (new field, corrects the prior blank), "Compatible bottom bracket type: Outboard" (24mm-road), threaded BSA 68/70mm shell. "Average Weight (170 mm, w/o bottom bracket) 806 g" replaces the 780g unsourced sample. Model string corrected FC-RX600-2 -> FC-RX600-11 (id/family kept append-only per convention, same precedent as this file\'s PG-1231/CS-HG500-10 corrections).' },
  { id: 'br-shimano-grx-rx810', cat: 'brake', brand: 'Shimano', model: 'GRX BR-RX810 Caliper (pair)', family: 'shimano-grx-rx810-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-shimano-grx-rx810-2x',
    weight: 286, price: 110,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/pdfs/product/archive/2019-2020_Specifications_v034_en.pdf',
    note: 'road-11 wave (Shimano archive chase): productinfo.shimano.com\'s live SKU search 404s "BR-RX810"/"BR-RX810-F"/"BR-RX810-R" (current edition dropped it); resolved via /en/archive\'s 2019-2020 Specifications PDF (Ver.3.4, Feb 14 2020), "Brake (Hydraulic disc brake)" table, printed p.125 (file p.128): confirms "Mount type: Flat mount" (2 places rear/international-mount adapter noted), "Piston 2", Oil "SHIMANO Mineral" (hydraulic), "Recommended brake lever: ST-RX810, BL-RX810, ST-RX815" (matches this row\'s leverPair), "Recommended brake rotor: SM-RT800, RT-MT800" (cross-corroborates ro-shimano-rtmt800-160 above as a real GRX-paired SKU). "Average Weight: 148 g (Front), 138 g (Rear)" -> 286g pair, replacing the 290g unsourced sample.' },

  // ===== COCKPIT (handlebar / stem) =======================================
  { id: 'hb-zipp-sl70-aero', cat: 'handlebar', brand: 'Zipp', model: 'SL-70 Aero', family: 'zipp-sl70-aero',
    clamp: '31.8', dropBar: true, reach: 70, drop: 128, width: 400,
    weight: 240, price: 240,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/zipp/models/hb-dbsl-70a-a2',
    note: 'road-12 wave: FETCHED sram.com\'s Zipp SL-70 Aero model page (HB-DBSL-70A-A2) directly. Spec table: "Clamp diameter: 31.8mm" (confirmed), "Reach: 70mm" (CORRECTED 80->70), "Drop: 128mm" (exact match, unchanged), "Available widths: 38cm, 40cm, 42cm, 44cm" (confirms width:400 is a real SKU). "Weight: 240g (based on 42cm size)" — CORRECTED 260->240; this row\'s width is the 40cm size, so the true 40cm weight is a shade under 240g, but 42cm is the only figure SRAM publishes.' },
  { id: 'st-zipp-sl-sprint', cat: 'stem', brand: 'Zipp', model: 'SL Sprint', family: 'zipp-sl-sprint',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 167, price: 150,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/zipp/models/st-sl-spnt-a3',
    note: 'road-12 wave: FETCHED sram.com\'s Zipp SL Sprint Stem model page (ST-SL-SPNT-A3) directly. Spec table: "Clamp diameter: 31.8mm" (confirmed), "Steerer clamp diameter: 1-1/8 in" (confirms steerer:\'1-1-8\'), "Material: Unidirectional Carbon", "Available lengths: 90mm, 100mm, 110mm, 120mm, 130mm, 140mm" (confirms length:100 is a real SKU). "Weight: 167g (based on 100mm stem)" — CORRECTED 130->167 at the exact same 100mm length this row models.' },
  { id: 'hb-deda-superzero', cat: 'handlebar', brand: 'Deda', model: 'Superzero RS Carbon Handlebar', family: 'deda-superzero',
    clamp: '31.8', dropBar: true, reach: 75, drop: 120, width: 400,
    weight: 235, price: 340,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/superzero-rs-handlebar',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com (deda.com itself 404s; dedaelementi.com is Deda\'s live maker site) directly — the plain "Superzero" name this row previously carried is not itself a purchasable SKU in Deda\'s current lineup: the series page (dedaelementi.com/series/superzero) lists only "Superzero Alloy Handlebar" (305g @ 42cm, 130mm drop — does not match this row\'s 235g) alongside RS/DCR/Gravel carbon variants. The exact match is "Superzero RS Carbon Handlebar" (SZRSHB40/42/44/46): "Weight: 235 g (42 cm)" is an EXACT match to this row\'s pre-existing 235g (confirming the row always meant the RS carbon bar, just under-specified), "Reach: 75mm" (confirmed), "Diameter handlebar: 31,7mm" (clamp:31.8 kept, standard rounding per this file\'s convention), "Width (SKU): 40cm: SZRSHB40" (confirms width:400 is a real SKU). DROP CORRECTED 125->120mm ("Drop: 120mm", the RHM-EVO shape\'s stated compact drop). Model string corrected to name the real RS SKU. PRICE CORRECTED 130->340: page states "€315.00 VAT NOT INCLUDED" (~$340 at typical FX, not converted precisely — flagged); the prior $130 sample was far below the real carbon-bar MSRP (closer to the alloy sibling\'s €100).' },
  { id: 'st-deda-zero100', cat: 'stem', brand: 'Deda', model: 'Zero100 Stem', family: 'deda-zero100',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 126, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/zero100-stem',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com/zero100-stem directly: "Diameter: 31,7mm" (clamp:31.8 kept, standard rounding), "Fork Steerer: 1 1/8\" (28,6mm)" (confirms steerer:\'1-1-8\'), sizes "80mm...140mm" (100mm is a real SKU, D100B100/D100BOB100). WEIGHT CORRECTED 130->126: the page states "Weight: 126g (110mm)" — no per-100mm figure is published, so this is the closest sourced data point (and fixes a physically-implausible reading where the old 130g/100mm sample was heavier than the real 110mm-length weight, which should never happen since shorter stems weigh less). Price: page states "FROM €68.00" (~$75); this row\'s existing $90 sample stays (in the right ballpark, not corrected to avoid a shaky EUR->USD conversion for a THE-PRICE-RULE-exempt field).' },
  { id: 'hb-ritchey-wcs-streem', cat: 'handlebar', brand: 'Ritchey', model: 'WCS Streem', family: 'ritchey-wcs-streem',
    clamp: '31.8', dropBar: true, reach: 73, drop: 128, width: 400,
    weight: 220, price: 150,
    note: 'road-13 wave: Ritchey identity chase. FETCHED ritcheylogic.com/bike/handlebars/wcs-streem-internal-routing-handlebar directly (WebFetch, no wall) — this is a REAL, currently-sold Ritchey product; the row\'s prior model string "WCS Streem II" is not the maker\'s current name (the page calls it plainly "WCS Streem Internal Routing Handlebar" / "WCS Streem" throughout, no "II" anywhere) — MODEL CORRECTED (id kept, append-only). Spec table: "Accessory Mount Diameter: 31.8mm" (clamp confirmed), "Reach: 73mm" (CORRECTED 75->73), "Drop: 128mm" (CORRECTED 121->128), "Width Options: 38, 40, 42, 44, 46cm" (confirms width:400 is a real SKU). NOT marked verified:true: the page publishes only one weight figure, "287g (42cm)" — a different width than this row\'s 400mm/40cm SKU, so the weight bar (VERIFY-PROTOCOL item 2, exact-SKU weight) isn\'t met; the existing 220g stays an unsourced sample, flagged. No price on the page. Material is triple-butted 6066 ALLOY per the page (not carbon, despite this file\'s prior "II" naming implying the carbon-tier Streem lineage) — the maker\'s carbon variant is a separate current product, "WCS Carbon Streem"/Superlogic Streem, a different SKU entirely, not this row.' },
  { id: 'st-ritchey-wcs-c260', cat: 'stem', brand: 'Ritchey', model: 'WCS C260', family: 'ritchey-wcs-c260',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 103, price: 100,
    note: 'road-13 wave: Ritchey identity chase — INCONCLUSIVE, left as-is. Ritchey\'s reachable US site (ritcheylogic.com, no wall) currently lists only a "Superlogic C260 84D Stem" (carbon, 128g/100mm, steerer 1-1/8" or 1-1/4") and a "WCS C220 84D Stem" (alloy, 132g/100mm) whose own product copy markets itself as rivaling "the revolutionary C260 stem design, but... quicker and easier to install" — i.e. C220 reads as the current alloy successor in that clamp family. No live product page for a plain alloy "WCS C260" was found on the reachable main domain; only a spare-parts page ("C260 Stem Face Plate Replacement", ambiguous as to which C260 tier it services) references the name. The eu./us. regional subdomains (which search snippets show DO list a "WCS C260 84D Stem") are unreachable — expired TLS certs on both (WebFetch + browser pane both failed with "certificate has expired"/navigation denied), a documented wall, not routed around. Multiple US retailers (Jenson USA, ModernBike) show the WCS C260 alloy stem as out of stock/discontinued, consistent with C220 having superseded it, but that is not a manufacturer confirmation. Given the genuine ambiguity between "still sold in other regions" vs "discontinued, replaced by C220" vs "the page just resolves under Superlogic C260 now", this row is NOT renamed (renaming to C220 or Superlogic C260 would conflate three distinct real products under one id) and stays unverified sample data pending a working fetch of the regional page or maker confirmation. road-15 wave RETRY: ritcheylogic.com/bike/stems/wcs-c260-84d-stem still 404s (TLS-cert wall on the regional subdomains unchanged — not fixed this pass). Not promoting, but CORRECTED weight 130->103g: four independent retailers (Pro Bike Supply, Mantel, Incycle, Tree Fort Bikes) all state the alloy WCS C260 84D stem at exactly 103g/100mm, an unusually tight cross-source agreement for a discontinued SKU\'s spec sheet — used to fix an implausible sample value, but retailer corroboration alone does not meet THE BAR, so verified stays false.' },

  // ===== SEATPOST / SADDLE / BB / PEDALS ==================================
  { id: 'sp-zipp-sl-speed', cat: 'seatpost', brand: 'Zipp', model: 'SL Speed', family: 'zipp-sl-speed',
    diameter: '27.2', setback: 20,
    weight: 170, price: 200,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/zipp/models/sp-sl-s-b1',
    note: 'road-12 wave: FETCHED sram.com\'s Zipp SL Speed Seatpost model page (SP-SL-S-B1) directly. Spec table: "Diameter: 27.2mm, 31.6mm" (confirms diameter:\'27.2\' is a real SKU), "Offset: 0mm, 20mm" (confirms setback:20 is a real SKU), "Material: Unidirectional Carbon". "Weight: 170g (based on 27.2mm, 0 offset, 330mm length)" — CORRECTED 195->170; this row is the 20mm-offset variant, so the true weight may run a touch higher than the 0-offset baseline SRAM publishes, but 170g is the only sourced figure.' },
  { id: 'sp-specialized-tarmac-sl8', cat: 'seatpost', brand: 'Specialized', model: 'Tarmac SL8 Carbon Post', family: 'specialized-tarmac-sl8',
    proprietary: true, forFrames: ['fr-specialized-sworks-tarmac-sl8', 'fr-specialized-tarmac-sl8'], setback: 0,
    weight: 160, price: 250 },
  { id: 'sp-canyon-vcls-cp0018', cat: 'seatpost', brand: 'Canyon', model: 'VCLS 2.0 CP0018', family: 'canyon-vcls',
    proprietary: true, forFrames: ['fr-canyon-ultimate-cfslx', 'fr-canyon-endurace-cfslx'], setback: 15,
    weight: 235, price: 200 },
  { id: 'sd-fizik-antares-versus-r3', cat: 'saddle', brand: 'Fizik', model: 'Antares Versus Evo R3', family: 'fizik-antares-versus',
    weight: 205, price: 180,
    note: 'road-15 wave: investigated, LEFT UNVERIFIED — genuine generation ambiguity. Fizik\'s current live catalog (fizik.com, fetched via Exa) no longer sells a saddle under this exact name; the "Versus Evo" branding has been dropped and the closest current product is "Vento Antares R3" (non-Adaptive), 195g/140mm-202g/150mm per fizik.com\'s own spec table. Independent 2020-era coverage (Bikerumor, quoting Fizik\'s own launch press release) states the original "Antares Versus Evo R3" (this row\'s exact name) at a claimed 209g/narrow-215g/wide — close to but not identical to this row\'s 205g sample, and clearly a different generation/weight point than the current Vento-branded product. Given the model name genuinely no longer exists as a current SKU and the two candidate generations disagree on weight, did not promote or rename — a future pass should decide whether this row should be migrated to the current "Vento Antares R3" naming (a data-entry/id-migration judgment call, not a plain verification).' },
  { id: 'sd-selleitalia-slr-boost', cat: 'saddle', brand: 'Selle Italia', model: 'SLR Boost Superflow', family: 'selleitalia-slr-boost',
    weight: 135, price: 200 },
  { id: 'bb-shimano-smbb72-41', cat: 'bb', brand: 'Shimano', model: 'SM-BB72-41B (BB86/PF86 Press-Fit Road)', family: 'shimano-smbb72',
    shell: 'bb86', spindle: '24mm-road',
    weight: 69, price: 30,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/SM-BB72-41B',
    note: 'road-6 wave: CORRECTION — this row was previously labeled "(BSA Road)" with shell:\'bsa-road\' (threaded), but productinfo.shimano.com\'s spec table for SM-BB72-41B shows "HOLLOWTECH II bottom bracket: Threaded bottom bracket type -" (unchecked) / "Press-Fit type ✔" / "Press-Fit bottom bracket shell width (mm) 86.5 ✔" — this is a Press-Fit 86.5mm shell BB, not threaded BSA. Corrected shell to \'pf86\' (ROAD_VOCAB\'s "Shimano-style press-fit road shell, 86.5mm wide" token, per schema-road.js\'s own description — an exact match) and the model label to match. This also matches the "Recommended bottom bracket: Press-Fit SM-BB72(-41B)" line on the FC-R8100/FC-R7100/FC-RX810-2 crankset pages fetched elsewhere in this wave. A rule-11 exact-match error check (bb.shell vs frame.bb) means the old mislabeling would have wrongly greenlit BSA-threaded frames and wrongly reddened the file\'s two pf86 frames — a real false-fit/false-conflict risk this correction fixes. Average weight 69g (was a 90g sample). 2026-07-21 vocab merge (coordinator, Douglas-ruled): shell CORRECTED pf86->bb86 — this row\'s own source text ("Press-Fit... 86.5") and bb-sram-dub-bb86\'s source text ("PF 86.5 = this row\'s bb86") describe the identical physical shell under the vocab\'s two different spellings; bb86 kept as canonical (majority usage), pf86 retired from ROAD_VOCAB/GRAVEL_VOCAB. Model label now reads BB86/PF86 to keep both maker-facing names discoverable.' },
  { id: 'bb-praxis-t47-road', cat: 'bb', brand: 'SRAM', model: 'DUB T47 Bottom Bracket', family: 'sram-dub-t47', mfgPn: 'BB-DUB-T47-A1',
    shell: 't47-road', spindle: 'dub',
    weight: 95, price: 70,
    verified: true, lastChecked: '2026-07-20', source: 'https://sram.com/en/sram/models/bb-dub-t47-a1',
    note: 'road-8 wave (2026-07-20): browser-pane fetch of sram.com/en/sram/models/bb-dub-t47-a1 confirms road-7\'s flag - this is the real SRAM "DUB T47 Bottom Bracket" (MODEL ID BB-DUB-T47-A1: SPINDLE DIAMETER "DUB", BOTTOM BRACKET SHELL TYPE "T47 68, T47 77, T47 85.5", CRANKSETS TYPE "Road, Road Wide", MSRP $60-$290 spanning bearing-option SKUs), not a Praxis product; brand/model/family/mfgPn corrected. Price $70 sits inside the page\'s stated range (kept as-is). Weight 95g is NOT published on the fetched page (SRAM lists no weight for this DUB T47 listing, same pattern as its src/compat.js MTB-catalog sibling bb-sram-dub-t47) - left as an unsourced sample, flagged. ID KEPT AS-IS (brand token now reads stale "praxis"): this road/ catalog has no ALIASES/canonicalId retirement mechanism (test-ids.js and lintCatalog\'s brand-qualified-id check only cover src/compat.js\'s MTB PARTS; compat-road.js/schema-road.js define no equivalent) and inventing one is out of scope for a data-correction wave - matches this file\'s existing convention of leaving a now-inaccurate id in place with an explanatory note when a full identity migration isn\'t in scope (see the rw-ethirteen-lg1r-*-hg duplicate-id notes above). This is the SAME real product as src/compat.js\'s bb-sram-dub-t47 (MTB catalog, same source/mfgPn) - the two catalogs are separate and this is not a cross-catalog duplicate in the id-collision sense, but flagged for the coordinator as a naming inconsistency worth a scoped id-migration pass someday.' },
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
  { id: 'pd-look-keo-blade-carbon', cat: 'pedal', brand: 'Look', model: 'Keo Blade – Q Factor 53mm', family: 'look-keo-blade',
    style: 'road-clip',
    weight: 240, price: 195,
    note: 'road-13 wave: FETCHED lookcycle.com (WebFetch, no wall — note the maker\'s real domain is lookcycle.com, not look-cycle.com, which does not resolve) — Look currently sells 8 distinct Keo Blade SKUs (Ceramic Vision $325, Ceramic TI $400, two Ceramic Prisme/plain $275 tiers x 2 Q-factors, three base Chromoly $195 tiers x Q-factor/edition), none plainly named "Keo Blade Carbon". This row\'s model string doesn\'t match any current SKU exactly; renamed to the base-tier "Keo Blade – Q Factor 53mm" ($195, Chromoly+ axle, the closest non-ceramic/non-limited match to what a generic "Keo Blade Carbon" sample row likely meant — id kept, append-only). PRICE CORRECTED 180->195 (the base tier\'s real MSRP). NOT marked verified:true: the fetched page states weight "300 g" but EXPLICITLY "including cleats" — not comparable to this catalog\'s per-pair-pedal-only convention (DATA-ENTRY-TEMPLATE §5), so the existing 240g sample is left unverified/unconfirmed rather than replaced with a mismatched-basis figure.' },

  // ===== DRIVETRAIN — Shimano Tiagra 4700 (2x10, mechanical) ===============
  // Rounds out the tier ladder below 105 per the road-2 brief. Tiagra 4700 is
  // mechanical-only (no Di2 variant exists), disc-brake capable (ST-4720).
  // road-7 wave (2026-07-20) AUDITED the system:'shimano-road-11' token on all
  // three geared parts below against speeds:10 — re-fetched ST-4720-R live via
  // browser pane (productinfo.shimano.com confirms "Series TIAGRA" /
  // "Rear speeds 10", independently reconfirming the road-6 note). VERDICT:
  // no field changes. `systemRoad` (src/schema-road.js, ROAD-MODEL.md §4) has
  // ONLY 'shimano-road-12'/'shimano-road-11' for Shimano mechanical road — the
  // "-11" is a leftover of that token meaning 11-speed 105/Ultegra/DA, and
  // Tiagra 4700 is a genuine 10-speed family with no vocab slot of its own.
  // Two options were weighed: (a) leave 'shimano-road-11' — cosmetically odd,
  // but functionally safe: R13's independent speed-count check (rg-drivetrain-
  // speeds) already reds out any cross-pairing with a real 11-speed part on
  // speeds alone, so no false "fits" verdict is possible; R15's chain-standard
  // check also still correctly fires (ROAD_SYSTEM_CHAIN['shimano-road-11'] =
  // 'hg', which matches ch-shimano-tiagra4700's own 'hg' chain). (b) switch to
  // the generic 'hg' token (already schema-legal, reused by the chain's own
  // `system` field) — but ROAD_SYSTEM_CHAIN has no 'hg' key, so this would
  // silently DROP the correctly-firing R15 check for zero gain in false-
  // positive prevention. (a) is strictly safer, so system/speeds are left
  // UNCHANGED on all three rows. OPEN QUESTION for the coordinator: add a
  // real 'shimano-road-10' token to systemRoad (schema-road.js LOCAL_VOCAB +
  // compat-road.js VOCAB + ROAD_SYSTEM_CHAIN) as a follow-up label-accuracy
  // pass? Not done here per the road-7 brief's "don't invent new vocab"
  // instruction — flagged instead of guessed.
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
  { id: 'ch-shimano-tiagra4700', cat: 'chain', brand: 'Shimano', model: 'Tiagra CN-4601 10s', family: 'shimano-tiagra4700',
    system: 'hg', speeds: 10,
    weight: 275, price: 25,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/pdfs/product/archive/2013-2014_Specifications_v018_en.pdf',
    note: 'road-11 wave (Shimano archive chase) CORRECTION — "CN-4600" is not a real Shimano chain model number: productinfo.shimano.com\'s live SKU search 404s it (matching the road-6 wave\'s finding, "a real wall, not chased further"), and it is also absent from the 2019-2020, 2016-2017, 2015-2016 and 2013-2014 archive Specifications PDFs\' Chain tables searched this pass. The real Tiagra 10-speed chain in every one of those editions is CN-4601 — confirmed on the 2013-2014 Specifications PDF (Ver.1.8, Oct 25 2013), "Chain" table, printed p.104 (file p.107): Series "Tiagra", Model no. "CN-4601", Type "HG 10-speed" (matches this row\'s system:\'hg\'/speeds:10 exactly). No weight is published for CN-4601 in that table (the cell is blank, unlike its DURA-ACE/ULTEGRA/105 neighbors on the same page) — weight stays the pre-existing 275g sample rather than invented. Model string corrected CN-4600 -> CN-4601 (id/family kept append-only per convention, same precedent as this file\'s PG-1231/CS-HG500-10/FC-RX600-11 corrections this file and this wave).' },
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
    weight: 745, price: 1600,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/super-record-wireless-ergopower-controls/CCLSUPERRECORDWRLDB12S.html',
    note: 'road-13 wave (breadth pass): FETCHED campagnolo.com product page directly (WebFetch, no wall). "Weight: 745 g / pair" — CORRECTED 400->745 (the prior sample was far below the real wireless-shifter+hydraulic-lever pair weight). 12-speed wireless electronic actuation and disc-hydraulic brake system confirmed (already correct on this row).' },
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
    weight: 330, price: 350,
    note: 'road-14 wave: checked the road-13-flagged single-caliper-vs-pair-weight hypothesis raised for br-campagnolo-record-wrl - confirmed it applies identically here. campagnolo.com\'s Super Record Wireless caliper page (CCPSUPERRECORDWRLDB12S) states only a single 140mm caliper weight (118g incl. pads), same figure Campagnolo publishes for every 12s-13s tier (Record, Chorus) since they share the same physical caliper. No pair total is published anywhere on campagnolo.com, so - matching road-13\'s call on Record - this row is NOT promoted to verified: doubling 118g to estimate a pair total would be an invented figure, not a sourced one. Interfaces (flat-mount, hydraulic, 2-piston) are correct and unambiguous regardless.' },

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
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/record-disc-brake-ergopower-controls/CCLRECORDDB12S.html',
    weight: 463, price: 1300,
    note: 'road-4 wave FIX: actuation corrected axs-wireless -> mechanical (no wireless Record 12s product exists; see the family-header comment above). road-13 wave: FETCHED campagnolo.com/us-en/record-disc-brake-ergopower-controls/CCLRECORDDB12S.html directly (WebFetch, no wall) — "Weight: 463 grams" (CORRECTED 420->463), mechanical actuation and disc brake system confirmed.' },
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
    weight: 488, price: 700,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/cz-en/chorus-ergopower-disc-brake-controls/CCLCHORUSDB12S.html',
    note: 'road-13 wave (breadth pass): FETCHED campagnolo.com product page directly (WebFetch, no wall). "Weight: 488 grams" (CORRECTED 480->488, close but not exact on the prior sample). 12-speed mechanical actuation, disc-hydraulic brake system confirmed.' },
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
    weight: 243, price: 55,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/chorus-12-speed-chain/CCNCHORUS12S.html',
    note: 'road-13 wave (breadth pass): FETCHED campagnolo.com product page directly (WebFetch, no wall). "Weight: 243 grams (110 links)" — CORRECTED 265->243. 12-speed confirmed.' },
  { id: 'cr-campagnolo-chorus-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Chorus Crankset', family: 'campagnolo-chorus-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 12, chainline: 45.5,
    weight: 710, price: 320,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/chorus-crankset-12x2-speed/CFCCHORUS12S.html',
    note: 'Fetched campagnolo.com: Ultra-Torque axle confirmed ("has an Ultra-Torque steel axle like the Record crankset"); "Combinations 32/48, 34/50, 36/52" confirms this row\'s ring:\'50/34\' is a real combo. Weight (710g, sample) NOT promoted — the page publishes only the 32/48 combo\'s weight (728g @ 172.5mm), not this row\'s 34/50.' },
  { id: 'br-campagnolo-chorus-mech', cat: 'brake', brand: 'Campagnolo', model: 'Chorus Hydraulic Caliper (pair)', family: 'campagnolo-chorus-mech-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-campagnolo-chorus-mech',
    weight: 350, price: 180,
    note: 'road-14 wave: same single-caliper-vs-pair-weight problem road-13 documented for br-campagnolo-record-wrl, confirmed here too. Campagnolo publishes one shared 140mm caliper across the Chorus/Record/Super Record 12s tiers - a Chorus-specific listing (e-bike.ee, quoting Campagnolo\'s own spec) states "Caliper weight 118g (140mm, 1 pz - pads included)", the identical figure Record and Super Record Wireless carry. No pair total is published, so not promoting to verified: doubling would be an invented number, not a sourced one. Interfaces (flat-mount, hydraulic, 2-piston) are unambiguous and unaffected.' },

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
  // road-15 wave RETRY (one honest attempt per protocol): michelin.com/en/products-services/moto-bike/power-cup/
  // still 404s (WebFetch + Exa search both confirm no such page exists on the maker's global
  // domain). Found the real maker page instead: michelinman.com/bicycle/tires/michelin-power-cup-tlr-competition-line
  // (Michelin's US consumer-bike domain, fetched via Exa + driven directly in the browser pane,
  // incl. clicking "Find your size" and a specific 25-622/BLACK size tile) — it confirms this
  // exact SKU exists in 25/28/30/32-622 sizes (MSPN part numbers listed per size/colorway) but the
  // page is a marketing+reviews page with NO spec table: no TPI, no per-size weight, no compound
  // name anywhere in the rendered DOM. Retailer/distributor listings (Halfords UK, gambacicli.com,
  // hlc.bike) corroborate weights in the 255-305g range and "4x120 TPI"/"GUM-X compound" naming,
  // roughly matching this row's sample figures, but those are retailer pages, not the maker's own —
  // does not meet THE BAR. STILL UNVERIFIED after the retry; leaving as-is rather than promoting off
  // retailer corroboration.
  { id: 'ti-michelin-powercup-25', cat: 'tire', brand: 'Michelin', model: 'Power Cup TLR 25c', family: 'michelin-powercup',
    wheel: '700c', width: 25, tubeless: true, compound: 'Endurance Compound X',
    weight: 255, price: 75 },
  { id: 'ti-michelin-powercup-28', cat: 'tire', brand: 'Michelin', model: 'Power Cup TLR 28c', family: 'michelin-powercup',
    wheel: '700c', width: 28, tubeless: true, compound: 'Endurance Compound X',
    weight: 285, price: 75 },
  // road-15 wave RETRY: Power Road does not appear anywhere in Michelin's current
  // lineup (michelin.com/michelinman.com/michelin.ca all searched) - independent
  // reporting (tradeinn.com customer review, road.cc's 2019/2020 launch coverage)
  // indicates Michelin has since discontinued/replaced the Power Road line with
  // Power Cup/Power Protection TLR. No live maker page exists to fetch. STILL
  // UNVERIFIED after the retry - a genuinely gone product, not a bot wall.
  { id: 'ti-michelin-powerroad-28', cat: 'tire', brand: 'Michelin', model: 'Power Road TLR 28c', family: 'michelin-powerroad',
    wheel: '700c', width: 28, tubeless: true, compound: '2X Endurance Compound',
    weight: 300, price: 65 },

  // ===== COCKPIT — Enve / PRO / FSA (rounding out the finishing-kit brand set)
  { id: 'hb-enve-ses-aerobar', cat: 'handlebar', brand: 'Enve', model: 'SES Aero Road Bar', family: 'enve-ses-aerobar',
    clamp: '31.8', dropBar: true, reach: 79, drop: 127, width: 400,
    weight: 267, price: 400,
    verified: true, lastChecked: '2026-07-21', source: 'https://enve.com/products/aero-handlebar/',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED enve.com directly (no rate-limit this session, unlike the road-5 wave\'s 429 on this same domain for the SES AR One-Piece row below). Product now sold as "AERO IN-ROUTE HANDLEBAR" (300-1003-112, an IN-Route-updated version of the same SES Aero Road Bar this row names). Product Specs table: "Reach 79mm" (CORRECTED 75->79), "Drop/Rise 127mm" (CORRECTED 128->127), "Clamp Diameter 31.8" (confirmed), "Width C to C in Drops: 40cm, 42cm, 44cm, 46cm" (confirms width:400 is a real 40cm SKU), "Weight: 267g, 270g, 281g, 290g" listed in the same 40/42/44/46cm order — 267g is the 40cm figure (WEIGHT CORRECTED 285->267). "Regular price $400.00" (PRICE CORRECTED 425->400, exact).' },
  { id: 'st-enve-in-route-stem', cat: 'stem', brand: 'Enve', model: 'In-Route Aero Stem', family: 'enve-in-route',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 177, price: 350,
    verified: true, lastChecked: '2026-07-21', source: 'https://enve.com/collections/in-route-stem/products/stem-aero-in-route',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED enve.com directly. Product Specs table (per-length row): "100mm: Reach 8.2, Stack 99.5, Weight 177g" (WEIGHT CORRECTED 165->177, exact maker figure at this row\'s modeled 100mm length), "Clamp Diameter 31.8mm" (confirmed), "Steer Tube Clamp Diameter 1 1/8\"" (confirms steerer). "Regular price $350.00" — exact match to this row\'s pre-existing $350 (confirmed, not corrected).' },
  { id: 'hb-pro-vibe-superlight', cat: 'handlebar', brand: 'PRO', model: 'Vibe Superlight', family: 'pro-vibe-superlight',
    clamp: '31.8', dropBar: true, reach: 80, drop: 130, width: 400,
    weight: 157, price: 130,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.pro-bikegear.com/products/pro-vibe-superlight-handlebar',
    note: 'road-12 wave: FETCHED pro-bikegear.com directly. Product copy + spec table: "130 millimeter drop, 80 millimeter reach" (DROP CORRECTED 125->130, REACH CORRECTED 75->80), "31.8 millimeter clamping diameter" (confirmed), "available in 38-, 40- and 42-centimeter widths" (confirms width:400 is a real SKU) with a per-width weight row "154g / 157g / 160g" for 380/400/420 — 157g is this row\'s 400mm figure (WEIGHT CORRECTED 210->157).' },
  { id: 'st-pro-vibe', cat: 'stem', brand: 'PRO', model: 'Vibe', family: 'pro-vibe-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 135, price: 100,
    note: 'road-15 wave: investigated, LEFT UNVERIFIED. pro-bikegear.com/global/road/stems/vibe-stem-10 (fetched via Exa) confirms this is a real, currently-sold stem: "PRO Vibe Stem is an AL7075 alloy stem... available in either 1 1/8 or 1 1/4 steerer diameters", clamp 31.8mm confirmed, and a 100mm/-10deg/31.8mm SKU (part number PRSS0582) is real — matching this row\'s stored clamp/steerer/length. But the page states only ONE weight figure for the whole size run: "the longest weighing just 163 grams" (i.e. the 130mm SKU) — no 100mm-specific weight is published, so the exact-SKU weight bar isn\'t met; the existing 135g sample is left unsourced/unconfirmed rather than replaced with the 130mm figure (a different, heavier SKU).' },
  { id: 'hb-fsa-kforce-compact', cat: 'handlebar', brand: 'FSA', model: 'K-Force Compact', family: 'fsa-kforce-compact',
    clamp: '31.8', dropBar: true, reach: 80, drop: 125, width: 400,
    weight: 180, price: 220,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.fsaproshop.com/products/k-force-compact-handlebar',
    note: 'road-12 wave: FETCHED fsaproshop.com directly. Spec table: "Ø31.8mm" clamp (confirmed), "80mm reach" (CORRECTED 75->80), "125mm drop" (CORRECTED 123->125), "W400, 420, 440mm" (confirms width:400 is a real SKU), weight "180 grams (400mm)" (CORRECTED 195->180, exact same width this row models).' },
  { id: 'st-fsa-kforce', cat: 'stem', brand: 'FSA', model: 'K-Force 2.0', family: 'fsa-kforce-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 123, price: 182,
    note: 'road-13 wave: FETCHED fsaproshop.com/products/k-force-2-0-stem directly (WebFetch, no wall) — FSA currently sells 4 distinct K-Force-family stems (K-Force 2.0 alloy $182 MSRP/123g@100mm -6°; K-Force OS-99 carbon-wrap $?/126g ±6°; K-Force -12° CSI $?/143g@100mm; K-Force Carbon monocoque $297 MSRP/193g@100mm -6°), none plainly named just "K-Force". Renamed to the closest current match, "K-Force 2.0" (alloy 6061/T6, the generic non-suffixed successor tier, weight closest to this row\'s pre-existing 115g of the four — id kept, append-only). WEIGHT CORRECTED 115->123 (page: "123 grams (100mm)"), PRICE CORRECTED 150->182 (page: "$182.00 MSRP", sale-priced lower but MSRP is this catalog\'s price-field convention). NOT marked verified:true: the page confirms clamp "Ø31.8mm" but does not state a steerer-tube diameter compatible with a plain description (only "33.5mm fork clamp stack height", ambiguous vs this row\'s existing steerer:\'1-1-8\' — left unconfirmed/unchanged rather than guessed) — a real interface field stays unsourced, so the bar for verified:true isn\'t met.' },

  // Cervelo R5 and Factor Ostro VAM: this worktree was concurrently edited by
  // another road-4 session this pass, which landed both (fr/fk-cervelo-r5-disc,
  // fr/fk-factor-ostro-vam) with better sourcing than this pass's own attempt —
  // a real cervelo.com support/spec-sheet fetch and a working factorbikes.com
  // regional-subdomain fetch (this pass's www. fetch of factorbikes.com hit an
  // AI-agent commerce-protocol document instead of spec content). This pass's
  // duplicate rows were dropped in favor of theirs rather than shipping two
  // conflicting entries for the same real frames.

  // ===== WHEELS — DT Swiss ERC 1100 DICUT 45 (new line, road-4 wave) =======
  { id: 'fw-dtswiss-erc1100-dicut-45', cat: 'frontwheel', brand: 'DT Swiss', model: 'ERC 1100 DICUT DB 45 12/100 mm', family: 'dtswiss-erc1100',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 40,
    weight: 663, price: 1550,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.dtswiss.com/en/wheels/wheels-road/endurance/erc-1100-dicut',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dtswiss.com\'s ERC 1100 DICUT product page\'s "Choose model" finder (a client-side model table on the same manufacturer page, not a retailer relay) — matnr WERC110AIDXCA18206, "ERC 1100 DICUT DB 45 12/100 MM": Net weight 663g (was 663g listed nowhere before; replaces the road-4 wave\'s unsourced sample derived from a Performance Bicycle retailer sheet), Inner width 22mm (confirms intWidth:22, unchanged), Outer width 28.5mm, Disc Center Lock, 12mm Thru Axle/100mm (confirms hub:\'12x100\'), Rim height 45mm (confirms this is the real 45mm-height SKU, distinct from the 35mm sibling also sold under the same ERC 1100 DICUT line). No recommended tire-width range is published on this page (only inner/outer rim width) — maxTire (40) stays the pre-existing unsourced sample/GAP. Price ($1550) also stays an unsourced sample — the page\'s own "$3218 from" figure is a whole-line MSRP spanning both the 35mm and 45mm variants, not a per-model number. | RECALL NOTE (2026-07-18, RECALL-LOG RCL-9): this wheel line is named in CPSC recall #25-445 (Aug 2025) - carbon rim delamination crash hazard on units with DT Swiss ID 2740000+ (Vietnam-made, delivered Aug 2024 onward; Poland-made rims excluded). Unit-specific - check your wheel ID at dtswiss.com/en/recall; remedy is stop-use + free replacement.' },
  { id: 'rw-dtswiss-erc1100-dicut-45', cat: 'rearwheel', brand: 'DT Swiss', model: 'ERC 1100 DICUT DB 45 12/142 mm Shimano', family: 'dtswiss-erc1100',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 40,
    weight: 786, price: 1550,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.dtswiss.com/en/wheels/wheels-road/endurance/erc-1100-dicut',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dtswiss.com\'s ERC 1100 DICUT "Choose model" finder — matnr WERC110NIDJCA18207, "ERC 1100 DICUT DB 45 12/142 MM SHIMANO": Net weight 786g (was 786g listed nowhere before; replaces the road-4 wave\'s unsourced sample), Inner width 22mm, Disc Center Lock, 12mm Thru Axle/142mm (confirms hub:\'12x142\'), Cassette interface "Shimano ROAD", Freehub body "Shim. RD. 11SP Light S ASLS11 (mounted)" — the driver MOUNTED by default is Shimano HG-road, not XDR; the page separately lists "SRAM XDR Road freehub body kit" only under INCLUSIVE (an included conversion kit, not the shipped default). FREEHUB CORRECTED xdr->hg-road to match this file\'s own established convention for this exact ships-with-X-includes-Y-kit pattern (see rw-dtswiss-arc1100-dicut-38\'s note, same reasoning). No tire-width range published (matches the front row\'s caveat); maxTire stays sample. Price stays an unsourced sample (see front row\'s note on the page\'s whole-line MSRP). | RECALL NOTE (2026-07-18, RECALL-LOG RCL-9): this wheel line is named in CPSC recall #25-445 (Aug 2025) - carbon rim delamination crash hazard on units with DT Swiss ID 2740000+ (Vietnam-made, delivered Aug 2024 onward; Poland-made rims excluded). Unit-specific - check your wheel ID at dtswiss.com/en/recall; remedy is stop-use + free replacement.' },

  // ===== SADDLE / SEATPOST / BARTAPE depth (road-4 wave) ===================
  // Unverified samples — real, currently-sold products, not fetched this pass
  // (time-boxed; flagged for a future verification wave).
  { id: 'sd-specialized-power-expert', cat: 'saddle', brand: 'Specialized', model: 'Power Expert with Mirror', family: 'specialized-power',
    weight: 218, price: 180 },
  { id: 'sd-prologo-dimension-tirox', cat: 'saddle', brand: 'Prologo', model: 'Dimension T2.0 Tirox', family: 'prologo-dimension',
    weight: 227, price: 150 },
  { id: 'sp-ritchey-comp-two-bolt', cat: 'seatpost', brand: 'Ritchey', model: 'Comp 2-Bolt', family: 'ritchey-comp-two-bolt',
    diameter: '27.2', setback: 25,
    weight: 260, price: 45,
    verified: true, lastChecked: '2026-07-21', source: 'https://ritcheylogic.com/bike/seatposts/comp-2-bolt-seatpost',
    note: 'road-13 wave: Ritchey identity chase. FETCHED ritcheylogic.com/bike/seatposts/comp-2-bolt-seatpost directly (WebFetch, no wall) — the maker\'s current name is "Comp 2-Bolt Seatpost" (MODEL CORRECTED from the row\'s prior "Comp Two-Bolt" spelling to match, id kept, append-only — this is the same product, not a different one; the prior row already had the specs right). Spec table: "Diameter Options: 26.8, 27.0, 27.2, 30.9, 31.4, 31.6mm" (confirms diameter:\'27.2\' is a real SKU), "Setback/Offset: 25mm" (SETBACK CORRECTED 15->25 — an exact match to the maker\'s stated offset, the prior 15mm was wrong), "Weight: 260g (27.2x350mm)" (EXACT match to this row\'s pre-existing 260g, confirming it), "Material: 6061 alloy". No price on the page; this row\'s existing $45 sample stays. Entry-tier alloy post — fills the gap for the Allez\'s 27.2mm non-proprietary seat tube (the only other 27.2 post in this file, the Zipp SL Speed, is a premium carbon part).' },
  { id: 'bt-fizik-vento-microtex-tacky', cat: 'bartape', brand: 'Fizik', model: 'Racefeel 2mm Tacky', family: 'fizik-vento-microtex',
    weight: 77, price: 30,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.fizik.com/en-us/products/bartapes-racefeel-2mm-tacky-white-bt09000a00044',
    note: 'road-12 wave: FETCHED fizik.com directly — the product page states verbatim "This product was previously the Vento Microtex 2mm Tacky," i.e. Fizik\'s current-catalog name for the exact same tape this row already modeled (model string CORRECTED to the current name; id/family kept unchanged per the append-only convention). Tech spec table: "Weight: 77 g" (CORRECTED 65->77), "Technology: Microtex", "Finish: Tacky", "Thickness: 2 mm" (all consistent with this row).' },
  { id: 'bt-supacaz-super-sticky-kush', cat: 'bartape', brand: 'Supacaz', model: 'Super Sticky Kush', family: 'supacaz-super-sticky-kush',
    weight: 75, price: 45,
    note: 'road-13 wave: RETRY SUCCEEDED — this row previously walled BOTH WebFetch and Exa (per road-12 wave notes); WebFetch on supacaz.com/products/super-sticky-kush and supacaz.com/product/super-sticky-kush-black/ both still 403 this pass, but Exa\'s fetch tool got through on the same product URL (supacaz.com/product/super-sticky-kush-black/) per the fetch-ethics doctrine\'s WebFetch->Exa order. Page confirms: "Material: PU Length: 2200mm Width: 30mm Thickness: 2.5mm", "$45.00". PRICE CORRECTED 30->45 (exact match to the fetched MSRP). NOT marked verified:true: no weight is published anywhere on the page (only length/width/thickness) — the existing 75g sample stays an unsourced-but-plausible figure, flagged rather than fabricated a source for it.' },

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
    steerer: '1-1-8', width: 420, reach: 75, drop: 127, integrated: true,
    weight: 310, price: 700,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/roval-rapide-cockpit/p/218323',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED specialized.com via the browser pane (the file\'s standing "Specialized 403s WebFetch" wall did not block the browser pane today). Spec table: "Reach 75mm / Drop 127mm, 4°/10°/12° flare at the drops, -6° stem" (drop CORRECTED 125->127mm, was an uncross-checked retailer figure), "Steerer Diameter 1-1/8\"" (confirms steerer), widths "380mm, 400mm, 420mm, 440mm" (confirms width:420 is real), Stem Length range 75-135mm. Weight is combo-specific: the page\'s own comparison box states "310g (420x100)" for this exact 420mm-width/100mm-stem combo — matches this row\'s pre-existing 310g exactly (confirmed, not corrected). Price "$699.99" rounds to the pre-existing $700 sample (confirmed, not corrected).' },
  { id: 'ck-deda-alanera-rs', cat: 'cockpit', brand: 'Deda', model: 'Alanera RS', family: 'deda-alanera-rs',
    steerer: '1-1-8', width: 420, reach: 75, drop: 120, integrated: true,
    weight: 340, price: 796,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/alanera-rs-handlebar',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com/alanera-rs-handlebar directly (deda.com 404s; dedaelementi.com is Deda\'s live maker site). Tech specs confirm every field this row already carried, unusually exactly: "Fork steerer: 1 1/8\" (28.6mm)" (steerer), "Reach: 75mm" / "Drop: 120mm" (both exact), "Weight: 340g (110×42)" (exact match to this row\'s pre-existing 340g), 42cm a real width option ("Sizes: 42cm: 90,100,110,120,130mm" stem lengths, confirms width:420). Price: page states "€795.00 VAT NOT INCLUDED" (~$860 at typical FX) — close to but not exactly this row\'s pre-existing $796 sample; kept as-is rather than force an approximate EUR->USD conversion. No field corrections needed — the road-5 wave\'s retailer-corroborated cross-check turned out fully accurate.' },
  { id: 'ck-enve-ses-ar-onepiece', cat: 'cockpit', brand: 'Enve', model: 'SES AR One-Piece Handlebar', family: 'enve-ses-ar-onepiece',
    steerer: '1-1-8', width: 400, reach: 76, drop: 129, integrated: true,
    weight: 380, price: 950,
    verified: true, lastChecked: '2026-07-21', source: 'https://enve.com/products/ar-one-piece-bar-stem',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED enve.com directly (no rate-limit this session, unlike the road-5 wave\'s two 429s). Live product is "SES AR ONE-PIECE HANDLEBAR - CUSTOM / US MADE" (300-1030-236). Tech Specs table: "Width Options 38-46cm" (confirms width:400 is real), "Drop 129mm" (CORRECTED 127->129), "Reach 76mm" (confirmed, unchanged), "Weight 380g (120mm x 42cm)" — the only weight figure the page publishes, combo-specific rather than per-width (WEIGHT CORRECTED 345->380, replacing the road-5 wave\'s cross-checked range-midpoint estimate). "Regular price $950.00" (PRICE CORRECTED 1200->950). Steerer (1-1/8") not restated on this page — kept as the universal-standard assumption already used for every other bar/stem/cockpit row in this file, not independently re-confirmed this pass.' },

  // ===== HANDLEBAR/STEM depth — 35mm oversize clamp pair (road-5 wave) =====
  // Every existing hb/st pair in this file is 31.8mm clamp; adds the 35mm
  // oversize standard (widening from "6 handlebar / 6 stem" toward covering
  // both clamp diameters the schema vocab (clampRG) already allows).
  { id: 'hb-deda-m35', cat: 'handlebar', brand: 'Deda', model: 'Superleggera 35', family: 'deda-superleggera-35',
    clamp: '35', dropBar: true, reach: 75, drop: 130, width: 420,
    weight: 180, price: 200,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/superleggera-35-handlebar',
    note: 'road-12 wave: RETARGETED — road-11 flagged this row\'s old "Trentacinque M35 RHM" model string as a conflation of two different Deda products (the discontinued carbon "35 Trentacinque" bar, whose series page at dedaelementi.com/series/trentacinque returns "We can\'t find products matching the selection," and an unrelated current alloy "M35 RHM" outlet item). FETCHED dedaelementi.com/superleggera-35-handlebar directly: its tech-copy is verbatim identical to the discontinued Trentacinque series page ("technology behind the superleggera combined with the 35 innovation... HR40 carbon fiber... modern RHM shape") — Deda\'s current-catalog successor to the same bar under a new name, not a different product. TECH SPECS table: "Handlebar: 35mm" (confirms clamp), "Reach: 75mm" (exact match, unchanged), "Drop: 130mm" (CORRECTED 129->130), "Sizes: 42 (SLC3542)/44/46, outside to outside" (420mm width = the 42cm size, confirmed a real SKU), "Weight: 180 grams (based on a size 42cm)" (CORRECTED 278->180). Price "FROM €200.00 VAT NOT INCLUDED" — CORRECTED 295->200 (same conservative EUR-read-as-USD convention this file already applies to the paired Deda stem\'s €90 figure). id/family kept distinct from the live "M35 RHM" alloy product (m35-rhm-handlebar) as a different SKU.' },
  { id: 'st-deda-trentacinque-35', cat: 'stem', brand: 'Deda', model: 'Trentacinque Stem', family: 'deda-trentacinque-35',
    clamp: '35', steerer: '1-1-8', length: 110,
    weight: 136, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/trentacinque-stem',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com/trentacinque-stem directly (currently in stock, unlike the carbon Trentacinque handlebar above): "Diameter: 35mm" (confirms clamp:\'35\'), "Fork Steerer: 1 1/8\" (28,6mm)" (confirms steerer), "Angle: 82°", "Sizes: 110 (35N110)" (confirms length:110 is a real SKU), "Weight: 136g (110mm)" — an EXACT match to this row\'s pre-existing 136g (now maker-confirmed, not just retailer-corroborated). PRICE CORRECTED 70->90: page states "FROM €90.00 VAT NOT INCLUDED" (~$97 at typical FX); $90 is a closer, still-conservative read of that figure than the prior $70 sample.' },

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
    wheel: '700c', width: 26, tubeless: false, compound: 'GRIPTON', casing: '320 TPI Polycotton',
    weight: 240, price: 70,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/turbo-cotton/p/155771',
    note: 'road-15 wave: PROMOTED — specialized.com fetched directly via Exa (the WebFetch 403 previously logged for this domain is a bot-wall, not JS-rendering; Exa\'s render cleared it, closing the road-14/prior "specialized.com 403" flag). Product page states verbatim: "Casing: 320 TPI Polycotton", "Compound: GRIPTON", "700 x 26mm, psi 95-115, approximate weight 240g" — every catalog field matches exactly, no corrections needed. Not tubeless (clincher only), matches this row. Price ($70) is the existing sample figure; the fetched page shows no US MSRP text in the extracted content, so price basis is left as an honestly-labeled sample per THE PRICE RULE.' },
  { id: 'ti-specialized-turbocotton-28', cat: 'tire', brand: 'Specialized', model: 'Turbo Cotton 28c', family: 'specialized-turbocotton',
    wheel: '700c', width: 28, tubeless: false, compound: 'GRIPTON', casing: '320 TPI Polycotton',
    weight: 260, price: 70,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/turbo-cotton/p/155771',
    note: 'road-15 wave: PROMOTED — same specialized.com fetch as the 26c row above. Product page states verbatim: "700 x 28mm, Hell of the North, psi 85-95, approximate weight 260g" — matches this row exactly (also marketed under the "Hell of the North" name on the maker\'s own page, not just a retailer nickname). Price ($70) kept as an honestly-labeled sample (no US MSRP text captured on the fetched page).' },

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
    note: 'road-5 wave: real, currently-sold FSA headset (fullspeedahead.com itself was not successfully fetched this pass — not probed via WebFetch/browser pane, time-boxed) — spec (ZS44/28.6 upper, ZS56/40 tapered lower, ~124g) cross-checked across multiple independent retailer listings (Performance Bicycle, BIKE24, The Lions Cyclery) all quoting the same FSA-published S.H.I.S. codes. Kept as an unverified sample per the catalog\'s relaxed inclusion policy (real product, not fabricated) rather than a manufacturer-page fetch that did not happen. road-15 wave: fetched fsaproshop.com\'s current Orbit-family listing directly — no SKU is named plainly "Orbit ZS44/28.6-ZS56/40" (no "1.5"/"Z"/"E" suffix); the closest current products are "Orbit 1.5 ZS Internal Headset" (ZS44/28.6 | ZS56/39.78, same bore pair as this row — likely the SAME physical product as this catalog\'s sibling hs-fsa-orbit-15-zs44-zs56 row, possibly a naming duplicate across the two rows) and "Orbit 1.5E ZS Internal Headset" (124.6g, but a DIFFERENT tapered-fork-only config, not a ZS56 lower). Given the real risk of this row and hs-fsa-orbit-15-zs44-zs56 being the same SKU under two different catalog names, left unverified/unchanged rather than guess which weight figure belongs here — flagged for a future id/dedup pass.' },
  { id: 'hs-ritchey-comp-zero-zs44-zs55', cat: 'headset', brand: 'Ritchey', model: 'Comp Zero Logic ZS44/28.6 - ZS55/40 Tapered', family: 'ritchey-comp-zero',
    upper: 'ZS44/28.6', lower: 'ZS55/40', steerer: 'tapered',
    weight: 109, price: 45,
    note: 'road-5 wave: real, currently-sold Ritchey headset (Ritchey already appears elsewhere in this file as a cockpit brand — Ritchey WCS bar/stem). ritchey-logic.com itself was not probed this pass (time-boxed); spec (ZS44/28.6 upper, ZS55/40 tapered lower, 109g, "Stem Clamp Diameter: 28.6") cross-checked across bike24.com/bike-components.de retailer listings quoting Ritchey\'s own published S.H.I.S. codes. Unverified sample, same caveat as the FSA row above. road-13 wave: FETCHED ritcheylogic.com/bike/headsets/comp-semi-integrated-zs-headset (WebFetch, no wall) — this current product lists lower options "ZS44/30 (1 1/8\"), ZS55/40 (1.5\"), ZS56/40" alongside upper "ZS44/28.6 (1 1/8\")", i.e. the same bore pair this row models IS one of its selectable configs — but the page never uses the name "Comp Zero"/"Comp Zero Logic" (this row\'s model string) and states weight "83g (1 1/8\")" for the generic listing, not this row\'s 109g. Plausible same-family product under a renamed/generic current SKU, but not a confirmed identity match (weight mismatch, no name bridge) — left unrenamed/unverified rather than guess.' },

];

// ---------------------------------------------------------------------------
// Vocab / schema gaps (road-2 wave update, 2026-07-17):
//  - src/schema-road.js now exists and validates this file clean (0 problems,
//    wired into validate.js as "ROAD OK"). The road-1 wave's bbShellRoad gap
//    (bb90-road/bb30a) is RESOLVED — widened in both the validator and
//    ROAD-MODEL.md section 4, with do-not-conflate-with-MTB-tokens notes.
//    ('pf86' was also added here originally but RETIRED 2026-07-21 — merged
//    into 'bb86', same physical shell; see schema-road.js's header note.)
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
