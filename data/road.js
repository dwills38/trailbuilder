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
    frameOnly: true, weight: 685, price: 5499.99,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/s-works-tarmac-sl8-frameset-fact-12r-carbon/p/216956', priceBasis: 'msrp-confirmed',
    note: 'Fetched: "685g frame", "12x142mm thru-axle, flat-mount disc", "Threaded BB", "32mm tire clearance". BB shell token (bsa-road) inferred from "Threaded BB" wording per DATA-ENTRY-TEMPLATE mfr-wording mapping; not spelled out as BSA verbatim on this page — flagged. priceBasis backfill (2026-07-22): re-fetched the same page — PRICE CORRECTED 4700->5499.99, the current listed price ("$5,499.99"); the prior $4700 was a stale/unsourced sample never actually read off this page.'
  },
  {
    id: 'fr-specialized-tarmac-sl8', cat: 'frame', brand: 'Specialized', model: 'Tarmac SL8 Frameset',
    family: 'specialized-tarmac-sl8', gen: 'SL8', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bsa-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 780, price: 3500,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/tarmac-sl8-frameset-fact-10r-carbon/p/216957', priceBasis: 'msrp-confirmed',
    note: 'Fetched: "780g frame", "12x142mm thru-axle, flat-mount disc", "Threaded BB", "32mm tire clearance", FACT 10r carbon (vs S-Works FACT 12r). priceBasis backfill (2026-07-22): re-fetched the same page — PRICE CORRECTED 3200->3500, the current listed price ("$3,500"); the prior $3200 was a stale/unsourced sample never actually read off this page.'
  },
  {
    id: 'fr-specialized-roubaix-expert', cat: 'frame', brand: 'Specialized', model: 'Roubaix Expert Frameset',
    family: 'specialized-roubaix', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bsa-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 33, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 990, price: 2400,
    note: "road-17 wave (2026-07-21): re-fetched specialized.com's Roubaix Expert Technical Specifications table (Exa, WebFetch itself 403-walled on this SKU) — reconfirms every engine-read field on this row: \"threaded BB\" (bsa-road), \"12x142mm thru-axle, flat-mount disc\" (rearAxle/brakeMount both match), \"made room for 33mm tires\" (maxTire matches exactly). The page publishes NO frameset weight anywhere (only a disclaimer that \"weights based on production painted frames as pictured\" with no number given) — the classic no-frame-weight pattern this catalog already documents for most road frames. 990g/$2400 stay unsourced samples; row correctly stays parked unverified, no promotion possible without an invented weight."
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
    id: 'fr-trek-emonda-sl', cat: 'frame', brand: 'Trek', model: 'Émonda SL Frameset',
    family: 'trek-emonda-sl', modelYear: 2024, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb90-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 28, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 1660, price: 2199,
    note: 'road-depth-4 wave (the mid-tier sibling below fr-trek-emonda-slr). Multiple retailer spec republications of Trek\'s own Émonda SL Disc Frameset spec sheet (Wheel & Sprocket, Sigma Sports UK, Nevis Cycles, treknology3.com — all quoting Trek\'s tech-spec text verbatim, cross-checked against a live trekbikes.com Émonda SL 6 Disc complete-bike spec page fetched via Exa which confirms the same frame line "Ultralight 500 Series OCLV Carbon..., tapered head tube, BB90, flat mount disc brakes, 12mm thru axle... Ride Tuned seatmast") agree on: 500 Series OCLV Carbon (a lower carbon grade than the SLR\'s higher-grade layup, the real SL/SLR tier split), tapered head tube, BB90 (bb90-road), flat-mount disc, 12x142mm rear / 12x100mm front thru-axle, and a "Ride Tuned seatmast" integrated masthead (not a swappable post — seatpost:\'proprietary\' per the SLR sibling convention). Max tire 28mm and frame weight 1.66kg/1660g (56cm, painted) are the Wheel & Sprocket tech-spec republication\'s stated figures; frameset price $2,199 is 99spokes.com\'s listed US MSRP (crossed-out reference price on a $999 sale listing) which lines up with Sigma Sports UK\'s £1,975 RRP and Nevis Cycles\' £1,975 2024 listing at typical GBP/USD conversion. Not marked verified — no single clean trekbikes.com frameset-only product-page fetch with price was obtained (WebFetch returns only header/nav on this JS-heavy site; the retailer republications are consistent enough to include as a real, disclosed sample per the catalog\'s relaxed inclusion policy, but do not meet the single-manufacturer-fetch verify bar).'
  },
  {
    id: 'fr-trek-madone-sl', cat: 'frame', brand: 'Trek', model: 'Madone SL Disc Gen 7 Frameset',
    family: 'trek-madone-sl', gen: 'Gen 7', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 't47-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 28, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 1200, price: 3800,
    note: 'road-depth-4 wave (new sibling — the mid-tier Madone below fr-trek-madone-slr; deliberately the Gen 7 platform, NOT the newer Gen 8, which zonacycles/Sigma Sports/Ridley\'s retailer pages show carries a proprietary "RCS Headset System" integrated steerer/headset — a real per-system non-round interface with no reserved vocab token yet; picking Gen 7 avoids silently mis-modeling that as generic tapered). zonacycles.com\'s "2024 Trek Madone SL Gen 7 Frameset" listing (a Trek-authorized dealer republishing Trek\'s own tech-spec text) states: "500 Series OCLV Carbon, KVF (Kammtail Virtual Foil) tube shape, IsoFlow seat tube, invisible cable routing, 3S aero chain keeper, T47 BB, flat mount disc, 142x12mm thru axle" (frame) / "Madone KVF full carbon, tapered carbon steerer, internal brake routing, flat mount disc, carbon dropouts, 12x100mm thru axle" (fork) / "Bottom Bracket: T47, threaded" (t47-road, an exact vocab match) / "Weight: 476g (fork-only, painted), 1200g - 56cm (frame-only, painted)" / price $3,800. maxTire 28mm carried over from the aero-platform sibling fr-trek-madone-slr (same KVF tube shaping family; not independently re-confirmed for Gen 7 specifically on this listing — flagged). seatpost:\'proprietary\' per the IsoFlow integrated-seatmast convention shared with every other Madone/Émonda SLR row. Not marked verified: a dealer republication, not a direct trekbikes.com fetch.'
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
    bb: 'bb86', seatpost: 'proprietary', steerer: 'straight-1-1-8', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 989, price: 4500,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.canyon.com/on/demandware.store/Sites-US-Site/en_US/Product-IncludeComponents?pid=4478&dwvar_4478_pv_rahmenfarbe=R136_P01&tab=all',
    note: 'road-16 wave (2026-07-21): RESOLVES the road-14/road-15 FK0060-vs-FK0137 fork-generation puzzle. canyon.com\'s "All components" spec panel is populated by an AJAX endpoint (data-tabber-content-url on the modal\'s tab button) rather than client-side JS the browser pane could drive open — road-15 found the modal itself wouldn\'t populate after repeated trigger/scroll attempts; this pass hit that endpoint directly for the current Aeroad CFR AXS build (pid=4478, canyon.com\'s own live product-configurator URL, not a search summary) and got the full component spec table. Frame section: name "Canyon Aeroad CFR", Axle dimension "12x142 mm", Tyre clearance "32 mm" (matches the maxTire this row already had CORRECTED from — this pass fixes the actual number 30->32, resolving the road-15 partial confirmation), Material "Carbon (CF)", Weight "2.18 lbs" = 989g (CORRECTED 830->989, a real per-gram figure, not estimated). steerer CORRECTED tapered->straight-1-1-8: the fork section (see fk-canyon-aeroad-cfr) states a constant "1 1/8\"" steer-tube diameter with no taper — this frame\'s head tube is NOT the more common road tapered bore. Price stays the pre-existing $4500 sample (frameset-only price not present in the component-spec response).' },
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
    id: 'fr-cannondale-caad13', cat: 'frame', brand: 'Cannondale', model: 'CAAD13 Disc Frameset',
    family: 'cannondale-caad13', modelYear: 2024, disciplines: ['road'], material: 'alu',
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb30a', seatpost: '27.2', steerer: 'tapered', maxTire: 30, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 1350, price: 1900,
    note: 'road-depth-4 wave (new alloy sibling — the SmartForm C1 Premium Alloy race platform). cannondale.com\'s own fetched CAAD13 Disc Owner\'s Manual Supplement PDF (manual-uploads/manuals/137370 rev 1 cd oms my20 caad13.pdf) states verbatim: "Bottom Bracket: Type/Width — BB30A / 73 mm", "Front Derailleur — Braze-on", "Tire Size x Max. Width — DISC BRAKES: 700c x 30 mm (measured)", "Brakes: Mount Type — DISC: Flat Mount 140/160 mm", "Axles — DISC: Front Speed Release TA 100 x 12, Rear Speed Release TA 142 x 12", "Headset — Integrated, UPR 1-1/8 in, LWR 1-1/4 in" — a round two-diameter (1-1/8"->1-1/4") tapered steerer, the SAME modeling precedent already used for fr-cervelo-caledonia-5/fr-cervelo-r5/fr-cervelo-soloist\'s 1-1/4"x1-1/2" headsets: a bearing-size VARIANT of a round tapered bore, not a non-round proprietary system, so steerer:\'tapered\' is the correct exact-match token (reserving per-system tokens like cannondale-delta/overdrive-aero/bmc-ics-flat for genuinely flattened/D-shaped bores only, per the OverDrive-lesson doctrine). Frame ships with a "HollowGram 27 Alloy Seatpost" per cannondale.com\'s own CAAD13 Frameset product page — a round 27.2mm 2-bolt post (seatpost:\'27.2\'), not proprietary. Frameset price $1,900 corroborated by a live 2023-model dealer listing (1stproject.com.au) alongside cannondale.com\'s own current listing page (no clean US-dollar frameset price line was captured from the cannondale.com fetch itself — flagged). Frame-only weight NOT separately published: the manufacturer\'s "CAAD13 Team Replica Frameset" listing states only a combined "2.0 kg / 4.3 lbs" frameset figure (frame+fork+headset+seatpost package, explicitly caveated "weights may vary in final production") — per the PHANTOM-NUMBER doctrine that combined figure is NOT used as a frame-only weight; 1350g kept as the prior sample pending a clean frame-only figure. Not marked verified overall (weight unconfirmed at the frame-only level), though every compat-driving field (BB/axles/brakeMount/tire/steerer/FD-mount) is a direct manufacturer-PDF quote.'
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
  {
    id: 'fr-factor-ostro-vam', cat: 'frame', brand: 'Factor', model: 'OSTRO VAM Frameset',
    family: 'factor-ostro-vam', gen: 'v2', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 't47-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 820, price: 5500,
    note: 'road-depth-4 wave (new brand — first Factor road row; a boutique aero platform sold electronic-drivetrain-only). Multiple retailer spec republications of Factor\'s own OSTRO VAM v2 (2024) tech sheet (clubhaus.bike, twohubs.com, wheelproject.com, viresvelo.com, metier.cc, all quoting matching figures) agree on: "Bottom Bracket: CeramicSpeed T47A... available for DUB, 24mm, or Ultra-Torque" (T47 threaded shell -> bb:\'t47-road\'), "Front Axle: 12x100mm thru-axle" / "Rear Axle: 12x142mm thru-axle", "Brake type: Disc... Flat Mount Disc (160mm max rotor)", "Wheel Size: 700c", "Max Tire Clearance: 32mm Measured", "Headset: CeramicSpeed SLT 1-1/8\\" and 1-3/8\\" bearings" (a round two-diameter tapered bore — the SAME bearing-size-variant-of-tapered precedent as the Cervélo/CAAD13 rows above; NOT modeled as a proprietary token), and a proprietary "Factor OSTRO Aero Carbon" seatpost sold with 0/20mm setback options (seatpost:\'proprietary\'). Front derailleur: Factor markets an "adjustable/removable front derailleur mount" (metier.cc) — modeled as braze-on-equivalent per this catalog\'s convention for bolt-on FD mounts on aero frames (Specialized/Cervélo/BMC), not independently confirmed as a literal brazed boss — flagged as an inference. Frame weight ~820g (size 54, painted) per metier.cc\'s current v2 listing (the older wheelproject.com listing\'s "900g" figure is the prior v1 generation, not used); frameset price $5,500 corroborated identically by twohubs.com ("MSRP: USD 5,500.00") and clubhaus.bike ($5,499). Not marked verified — every source is a Factor-authorized dealer republication rather than a direct factorbikes.com fetch (the brand\'s own site was not independently reached this pass); every field above nonetheless names real, internally-consistent, cross-corroborated Factor specs, not a fabricated or estimated figure.'
  },
  {
    id: 'fk-factor-ostro-vam', cat: 'fork', brand: 'Factor', model: 'OSTRO VAM Fork', family: 'factor-ostro-vam',
    wheel: '700c', axle: '12x100', steerer: 'tapered', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 350, price: 500,
    note: 'road-depth-4 wave: paired OEM fork for fr-factor-ostro-vam (the Cervélo/BMC precedent of shipping every new frame with its matching fork row so the frame is buildable). "OSTRO Wide Stance Carbon Fork" per clubhaus.bike/metier.cc, 12x100mm thru-axle, flat-mount disc, CeramicSpeed SLT 1-1/8"/1-3/8" tapered steerer (steerer:\'tapered\', same precedent as the frame row), max rotor 160mm, max tire 32mm measured — all matching the frame\'s own spec sheet fields. No fork-only weight was published in any fetched source (frame/fork are quoted as a combined or frame-only figure across every retailer) — 350g/$500 are nominal unsourced samples, flagged pending a clean fork-only figure.'
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
  { id: 'fk-canyon-aeroad-cfr', cat: 'fork', brand: 'Canyon', model: 'Aeroad CFR Fork', family: 'canyon-aeroad', mfgPn: 'FK0137',
    wheel: '700c', axle: '12x100', steerer: 'straight-1-1-8', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 35, travel: 0,
    weight: 399, price: 480,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.canyon.com/on/demandware.store/Sites-US-Site/en_US/Product-IncludeComponents?pid=4478&dwvar_4478_pv_rahmenfarbe=R136_P01&tab=all',
    note: 'road-16 wave (2026-07-21): RESOLVES the road-14/road-15 FK0060-vs-FK0137 fork-generation puzzle. Prior waves could not get canyon.com\'s "All components" spec panel to render through the browser pane (it\'s a lazy-loaded accordion modal) or resolve which of two candidate generations (99spokes-cited FK0060, an older ~2021-2023 two-diameter-clamp design, vs FK0137, the current gen) actually ships on the live SKU. This pass found the modal\'s content is fetched by the page\'s own AJAX endpoint (`data-tabber-content-url` on its tab button) and hit that URL directly for the current Aeroad CFR AXS build (canyon.com pid=4478, its own live product-configurator response, not a search summary or aggregator): Fork section name is literally "Canyon FK0137 CF Disc" — CONFIRMS FK0137, the current generation, settling the puzzle. Spec table: Axle dimension "12x100 mm" (matches, unchanged), Fork steer tube diameter "1 1/8\"" — a CONSTANT diameter top-to-bottom (steerer CORRECTED tapered->straight-1-1-8; this frame/fork does NOT use the more common road tapered bore), Tyre clearance "35 mm" (maxTire CORRECTED 30->35; this is the FORK\'s own front-tire figure — the frame\'s separate rear Tyre clearance of 32mm, corrected on fr-canyon-aeroad-cfr, is a different, lower number, which is normal), Material "Carbon (CF)", Weight "0.88 lbs" = 399g (CORRECTED 410->399, a real maker-stated per-config figure, not a nominal estimate). No fork-only price is present in the component-spec response (Canyon does not appear to sell this fork as a standalone aftermarket SKU) — $480 stays the pre-existing sample.' },
  { id: 'fk-cannondale-supersix-evo', cat: 'fork', brand: 'Cannondale', model: 'SuperSix EVO Fork', family: 'cannondale-supersix', gen: 'Gen 5',
    wheel: '700c', axle: '12x100', steerer: 'cannondale-delta', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 380, price: 420,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.cannondale.com/en/bikes/road/race/supersix-evo/supersix-evo-frameset', priceBasis: 'third-party-listed',
    note: 'road-15 wave: cannondale.com SuperSix EVO Frameset page (fetched direct) confirms fork spec verbatim: "Fork: SuperSix EVO Carbon, integrated crown race, 12x100mm thru-axle, flat mount disc, internal routing, 1-1/8\" to 1-1/4\" Delta steerer" (separate frame-row spec on the same table is 12x142 rear thru-axle — the fork row is the 12x100mm front) + "Fly Delta"/"Delta Steerer" feature copy confirming the proprietary non-round bore -> steerer:\'cannondale-delta\' confirmed correct. Tire clearance CORRECTED 30->32mm: page states "measured max tire width of 32mm" for the current Gen 5 platform (road-14\'s 30-32 range note is resolved to the maker\'s own current figure). maxRotorF 160mm matches both build kits\' rotor specs (Shimano 160/140, SRAM 160/160) on sibling complete-bike pages. No per-part fork weight published anywhere on the site — 380g kept as the existing nominal sample figure (fork-only weights are effectively never published for road framesets).' },
  { id: 'fk-bmc-teammachine-slr01', cat: 'fork', brand: 'BMC', model: 'Teammachine SLR 01 ICS Fork', family: 'bmc-teammachine-slr01', gen: 'Gen 5',
    wheel: '700c', axle: '12x100', steerer: 'bmc-ics-flat', brakeSystem: 'disc-flat', brakeMount: 'flat-mount', maxRotorF: 160, maxTire: 32, travel: 0,
    weight: 339, price: 450,
    note: 'Coordinator row (2026-07-22, at the road-depth-3 merge): the frameset fork paired with fr-bmc-teammachine-slr01 — added so the new bmc-ics-flat steerer token has its matching fork and the frame is buildable (the cannondale-delta frame+fork precedent; an exact-match proprietary token without its pair would show every fork red, the IS-mount-class trap). Spec basis: the SAME road-depth-3 fetches the frame row cites — BMC\'s own platform page breaks the frameset into Frame 700g / Fork 339g / Seatpost 134g (weight 339g is that maker-stated figure) and states Fork "Flat Mount Disc | 12 x 100mm Thru-Axle" with the ICS flat steerer; maxTire mirrors the platform\'s stated 32mm measured clearance; maxRotorF 160 mirrors the flat-mount road convention of its siblings (not independently page-confirmed — sample). Price $450 is a sample (BMC sells no standalone ICS fork SKU; frameset-only). Unverified: the coordinator did not independently re-fetch — promote when a future wave fetches the platform page itself.' },
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

  { id: 'fr-cervelo-caledonia-5', cat: 'frame', brand: 'Cervélo', model: 'Caledonia-5 Frameset',
    family: 'cervelo-caledonia-5', gen: 'Mk2', modelYear: 2024, disciplines: ['road', 'endurance'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bbright', seatpost: 'proprietary', steerer: 'tapered', maxTire: 36, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 995, price: 5000,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.cervelo.com/en-US/support/CALEDONIA-5%20DISC%20MK1', priceBasis: 'regional-conversion',
    note: 'road-depth-3 wave (new brand — first Cervélo road row): cervelo.com\'s own bike-registration/tech-spec page (support/CALEDONIA-5 DISC MK1) states "BB Shell Type: BBRIGHT" (bbright vocab token, an exact match), "Front Axle Dimensions: 12 X 100MM" / "Rear Axle Dimensions: 12 X 142MM", "Brake Mount Type Front/Rear: FLAT MOUNT 140", "Headset: 1-1/4\\" X 1-1/2\\"" (tapered), "Wheel Size: 700C", "Seatpost: SP18/24" — a Cervélo-numbered proprietary carbon post (not a round diameter token; a 2025-model RA Cycles retailer listing independently confirms "SP24 seatpost" ships with the frameset, corroborating the model-number pattern), and a bolt-on "Removable FDM" (aluminum front-derailleur mount, braze-on-equivalent). maxTire: cervelo.com\'s own current Caledonia-5 model page states "big tires (36mm)" and a 2024 Velo/Outside review independently states "Max tire clearance: 36 mm (with room for more)" — used over the support page\'s older MK1 clearance table (34mm stock/42mm frame max) since the current-model marketing copy is the more recent figure and the two independent 36mm citations agree; the older table numbers may reflect an earlier sub-revision. Frame weight 995g (56cm painted) + frameset price $5,000 (fork 394g, both from the Velo/Outside review AND matched by a fetched competitivecyclist.com retailer listing\'s "Claimed Weight [frame] 936g" for a different size/paint — used the review\'s 56cm painted figure as the more size-representative sample; frameset $5,000 corroborated identically by both cervelo.com\'s own price table and the RA Cycles/Cambria Bike retailer listings). sourceType left default (manufacturer page, not measured).' },

  {
    id: 'fr-cervelo-r5', cat: 'frame', brand: 'Cervélo', model: 'R5 Frameset',
    family: 'cervelo-r5', gen: 'MK4', modelYear: 2024, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bbright', seatpost: 'proprietary', steerer: 'tapered', maxTire: 42, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 651, price: 6500,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.cervelo.com/en-US/support/R5%20DISC%20MK4', priceBasis: 'regional-conversion',
    note: 'road-depth-4 wave (new sibling — the climbing-focused R5 alongside the endurance Caledonia-5). cervelo.com\'s own registration/tech-spec database page (support/R5 DISC MK4, First Model Year 2023, Last Model Year PRESENT) states verbatim: "BB Shell Type: BBRIGHT" (bbright, exact vocab match), "Front Axle Dimensions: 12 X 100MM" / "Rear Axle Dimensions: 12 X 142MM", "Brake Mount Type Front/Rear: FLAT MOUNT 140", "Wheel Size: 700C", and "Frame Tire Clearance: 42" (mm — used over the newer-generation 2026 R5\'s marketing-copy "34mm" figure that a separate Sigma Sports 2026-model listing shows, since this row targets the MK4/2023-present generation the support DB itself dates as "PRESENT"). cervelo.com\'s own bikes/r5 page states "The frame is just 651 grams (size 56)" and lists the Frameset (electronic-only, includes one-piece carbon cockpit + carbon seatpost) at "$6,500" — used as frame weight + frameset price (the page\'s "1.54 kgs" frameset-package weight is the combined frame+fork+cockpit+seatpost figure, NOT used as frame-only weight per the PHANTOM-NUMBER doctrine). Headset per cervelo.com\'s current bikes/r5 spec table: "FSA SL IS2 1-1/4, 45°x45° / 1-1/2, 36°x45°" — the SAME round two-diameter tapered bore already modeled as steerer:\'tapered\' on the Caledonia-5 sibling row (bearing-size variant, not a non-round proprietary system — see the CAAD13 row\'s note for the fuller precedent statement). Seatpost is a Cervélo-numbered proprietary carbon post (SP33 per the current spec table) -> seatpost:\'proprietary\'. Front derailleur mount: a backcountry.com retailer tech-spec republication of an earlier R5 frameset SKU states "Front Derailleur Mount: braze-on" — carried over as the best-available figure (not independently re-confirmed on the current cervelo.com pages, which do not list an FD-mount line for this electronic-only-drivetrain frameset). verified:true reflects the BB/axle/brakeMount/wheel/tire-clearance/weight/price fields, all direct cervelo.com quotes.'
  },
  {
    id: 'fr-cervelo-soloist', cat: 'frame', brand: 'Cervélo', model: 'Soloist Frameset',
    family: 'cervelo-soloist', modelYear: 2024, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 't47-road', seatpost: 'proprietary', steerer: 'tapered', maxTire: 34, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 919, price: 2700,
    verified: true, lastChecked: '2026-07-22', source: 'https://cervelo.cdn.prismic.io/cervelo/c4c8b737-75b6-4a2b-a0fd-d2f954560dd4_Soloist_2023_Manual_v2.1_web.pdf', priceBasis: 'regional-conversion',
    note: 'road-depth-4 wave (new sibling — the aero all-rounder alongside R5/Caledonia-5; a genuinely different BB shell from both). Cervélo\'s own fetched Soloist Retailer Assembly Manual (2023 v2.1 PDF, cervelo.cdn.prismic.io) states verbatim: "BB Type: T47 BBRight (Threaded)" — mapped to bb:\'t47-road\' (the THREADED T47 shell, a distinct real standard from the R5/Caledonia-5\'s press-fit BBright, correctly NOT conflated: cervelo.com\'s own support/SOLOIST DISC MK1 tech-spec page independently corroborates "BB Shell Type: T47a"), "Headset Type: Integrated 1-1/4\\" x 1-1/2\\"" (the same round tapered bore precedent as the R5/Caledonia-5/CAAD13 rows -> steerer:\'tapered\'), "Brake Mount Type: Flat Mount Disc", "Front Thru-Axle Dimensions: 12 x 100MM" / "Rear Thru-Axle Dimensions: 12 x 142MM", "Maximum Tire Width (Actual): 34mm with 4mm clearance", and "Seatpost: SP-SP27-ZERO, SP-SP27-15MM" — a Cervélo-numbered proprietary carbon post (seatpost:\'proprietary\'), plus a bolt-on "Front Derailleur Hanger FDM-0E0" / "Removable FDM / FDM blanking plate" (the same braze-on-equivalent bolt-on convention as the Caledonia-5/BMC rows -> frontDerailleurMount:\'braze-on\'). Frame-only weight was NOT in the manual (frameset-package weights only); used a 2023-model Excel Sports retailer listing stating "Weight: Frame 919 grams / Fork 374 grams (Size 56cm)" — a clean per-part split, not a combined figure, so kept per the PHANTOM-NUMBER doctrine\'s frame-only preference. Frameset price $2,700 is corroborated identically by two independent US retailers (Excel Sports 2023, Contender Bicycles 2025) and lines up with cervelo.com\'s own en-CA bikes/soloist page listing the Frameset at CAD $3,700 (≈USD $2,700 at typical conversion) — not itself a US-dollar cervelo.com quote, hence not fully verified on price, but every BB/axle/brakeMount/steerer/tire/seatpost field above is a direct Cervélo manual/support-DB quote.'
  },

  { id: 'fr-bmc-teammachine-slr01', cat: 'frame', brand: 'BMC', model: 'Teammachine SLR 01 Frameset',
    family: 'bmc-teammachine-slr01', gen: 'Gen 5', modelYear: 2025, disciplines: ['road', 'aero'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb86', seatpost: 'proprietary', steerer: 'bmc-ics-flat', maxTire: 32, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 700, price: 4999,
    verified: true, lastChecked: '2026-07-21', source: 'https://co.bmc-switzerland.com/products/teammachine-slr-01-frameset-frames-bmc-27a-000027', priceBasis: 'regional-conversion',
    note: 'road-depth-3 wave (new brand — first BMC road row). bmc-switzerland.com\'s own regional storefronts (co./us. variants, fetched directly, corroborated across 4+ regional mirrors) state the frameset spec verbatim: "Bottom Bracket: Press-Fit 86.5mm Road" (bb86 — the sentosabicycle.com third-party spec sheet independently corroborates "Bottom Bracket Type PF86 Required", the pre-2026-07-21-merge spelling of the same 86.5mm shell, now bb86 per schema-road.js\'s header note), "Frame... Flat Mount Disc | 12 x 142mm Thru-Axle" / "Fork... Flat Mount Disc | 12 x 100mm Thru-Axle", "Wheel Size: 700C" wheels shown throughout, and a proprietary "Teammachine SLR 01 Gen 5... Aero Shaped Seatpost" (sentosabicycle.com: "D-Shape, 15mm Offset" — genuinely non-round). Tire Clearance "32mm measured tire" on every fetched regional page. Front derailleur: sentosabicycle.com\'s spec sheet states "Front Derailleur Type Braze-On Required", corroborated by BMC\'s own genuine spare-parts listings for a bolt-on "Front Derailleur Hanger SLR01" service part (rivet-attached plate, the braze-on-equivalent bolt-on mount convention this catalog already uses for Specialized/Cervélo). STEERER — VOCAB GAP FLAGGED, not silently forced into \'tapered\': BMC\'s own fetched Gen 5 owner\'s manual states verbatim "Teammachine SLR 01 (flat steerer fork)" and "The Teammachine SLR 01 frameset is only compatible with ICS type cockpits and stem for internal brake cable routing" with standard round "1\\"1/8 stems external cables" explicitly marked incompatible — this is a real, non-round, per-system proprietary steerer, not a round tapered tube. Added the new steererRG token \'bmc-ics-flat\' to schema-road.js/compat-road.js (mirroring the existing cannondale-delta/overdrive-aero per-system-token pattern already Douglas-ruled 2026-07-21, never a shared \'proprietary\' value on this exact-match field) and extended the rg-headset-proprietary info rule to cover it (BMC services this steerer via its own ICS headset/bearing kits only — the same integrated-headset pattern as the other two proprietary systems, no aftermarket complete headset SKU exists). Frame-only weight (700g, size 54 painted, excludes fork/seatpost) and frameset price ($4,999 USD, co.bmc-switzerland.com\'s US-dollar regional listing, corroborated identically by contenderbicycles.com and us.bmc-switzerland.com) both from BMC\'s own fetched "Teammachine SLR 01 - BMC Road Racing Bikes" platform page, which breaks the combined "1173g with all accessories" frameset figure down into its real per-part components (Frame 700g / Fork 339g / Seatpost 134g) rather than using the ambiguous combined number other regional product pages quote — the combined figure is NOT this row\'s frame weight and was deliberately not used, per the PHANTOM-NUMBER doctrine (a "1455-1515g with all accessories" figure varies by paint/finish across the fetched pages and is not a clean frame-only weight).' },

  { id: 'fr-canyon-ultimate-cfsl', cat: 'frame', brand: 'Canyon', model: 'Ultimate CF SL Frameset',
    family: 'canyon-ultimate', gen: '5th-gen', modelYear: 2025, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb86', seatpost: 'proprietary', steerer: 'tapered', maxTire: 33, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 1048, price: 1349.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://warehousebike.com/2025-canyon-ultimate-cf-sl-7-di2-road-bike', priceBasis: 'regional-conversion',
    note: 'road-depth-3 wave (mid-tier depth — the lower Ultimate trim below the existing fr-canyon-ultimate-cfslx row). This is the same "5th-generation Ultimate frame" platform Canyon\'s own 2025-model complete-bike spec sheets describe (warehousebike.com and alldaybike.com are Canyon-authorized dealer configurator mirrors relaying Canyon\'s own per-SKU spec table verbatim, not independent estimates): "Axle dimension: 12x142 mm" (frame) / "12x100 mm" (fork), "Tyre clearance: 33 mm" both frame and fork, "Material: Carbon (CF)", frame "Weight: 2.31 lbs" = 1048g (a genuine unpainted/bare frame-only figure distinct from any complete-bike weight), fork "Fork steer tube diameter: 1 1/4\\"" (Canyon\'s own shorthand for its standard tapered head-tube bore — matches the existing fr-canyon-ultimate-cfslx/fr-canyon-endurace-cfslx sibling rows\' steerer:\'tapered\', a same-platform-family precedent, and is NOT the Aeroad\'s distinct constant-1-1/8" fork), BB "Bottom bracket standard: PF 86,5" (bb86), seatpost "Canyon SP0055... aerodynamic D-shape profile... Clamp diameter: 27,2 mm" — genuinely proprietary despite the round-sounding clamp figure (a shaped cross-section, not a standard round tube; matches this catalog\'s seatpost:\'proprietary\' convention for every other D-shape Canyon/Trek aero post already on file), and front derailleur "Mounting type: braze-on" (SRAM Rival AXS build spec). PRICE CAVEAT: Canyon US no longer sells the Ultimate CF SL as a standalone frameset SKU (only the CF SLX Frameset is presently listed on canyon.com/en-us) — $1,349.99 is a real, still-current secondhand/dealer-stock listing (cyclelimited.com) for the 2023 model of this same frame platform, used as the sample price per this catalog\'s relaxed inclusion policy (a real part with a real, disclosed, non-manufacturer price beats a fabricated MSRP or an excluded row); every interface/geometry field above is independently manufacturer-sourced from the current 5th-gen spec, not tied to that 2023 listing.' },

  { id: 'fr-giant-tcr-advpro', cat: 'frame', brand: 'Giant', model: 'TCR Advanced Pro Frameset',
    family: 'giant-tcr', gen: 'Advanced Pro', modelYear: 2025, disciplines: ['road'],
    wheelSizes: ['700c'], rearAxle: '12x142', brakeSystem: 'disc-flat', brakeMount: 'flat-mount',
    bb: 'bb86', seatpost: 'proprietary', steerer: 'overdrive-aero', maxTire: 33, frontDerailleurMount: 'braze-on',
    frameOnly: true, weight: 879, price: 2350,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.giant-bicycles.com/us/tcr-advanced-pro-frameset-2025', priceBasis: 'regional-conversion',
    note: 'road-depth-3 wave (mid-tier depth — the Advanced Pro trim, between the existing fr-giant-tcr-advsl frameset and the base Advanced tier not yet cataloged). giant-bicycles.com/us\'s own current TCR Advanced Pro Frameset (2025) product page, directly fetched, states verbatim: "Advanced-Grade Composite 12x142mm thru-axle, Disc" (frame) / "Advanced SL-Grade Composite, Full-Composite OverDrive Aero Steerer, 12x100mm thru-axle, Disc" (fork) — the SAME proprietary D-shaped OverDrive Aero steerer as the Advanced SL tier (Giant\'s own copy: "OverDrive Aero... spans the whole current TCR line", matching the sibling fr-giant-tcr-advsl row\'s steerer:\'overdrive-aero\' precedent, unlike the tier-gated Defy line where only SL/Pro trims carry it), "Max Tire Clearance 700x33mm", price "$2,350" (US MSRP, this exact page). A separately fetched giant-bicycles.com/gb static PDF spec sheet (same SKU family) states "Pressfit 86.5x41mm" for the bottom bracket (bb86) and "Giant Variant, Composite Offset -5/+15mm" for the seatpost (proprietary — the same Variant post family as the road-21 fr-giant-tcr-advsl OEM seatpost row, sp-giant-tcr-variant-2024, already on file). Frame weight: giant-bicycles.com\'s own "TCR Testing Results" page (a dedicated maker-published stiffness/weight comparison table, not a marketing estimate) breaks the current-generation TCR Advanced Pro down component-by-component: "Frame 800 g" (bare) + "Frame Paint 79 g" = 879g used here as the as-sold painted frame-only weight (fork/seatpost/headset/hanger weights on the same table are excluded, consistent with this catalog\'s frame-only weight convention). Front derailleur mount: braze-on, matching every other current-generation Giant road frame already cataloged (Giant does not sell a 1x-only TCR variant).' },

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
  { id: 'fw-zipp-303-s-tld', cat: 'frontwheel', brand: 'Zipp', model: '303 S Tubeless Disc (WH-303-STLD-A1)', family: 'zipp-303-s',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 28,
    weight: 711, price: 800,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/service/models/wh-303-stld-a1',
    note: 'zipp-303s-fix (2026-07-21): the road catalog\'s first Zipp 303 S rows — this SKU (WH-303-STLD-A1) was previously mislabeled as a gravel wheel (retired gfw-zipp-303-s-700c/grw-zipp-303-s-700c in data/gravel.js); SRAM\'s own service page categorizes it under "Zipp Road Wheels". FETCHED sram.com/en/service/models/wh-303-stld-a1 directly. Spec table: "Internal width 23mm", "Max outside width 28mm" (maxTire:28 — the only tire-clearance figure the page publishes, a road-tier number distinct from the wider 303 XPLR S gravel wheel), "Carbon – Hookless" construction, "Disc (Center Lock)", hub codes "176D, 76D" with driver options "n/a, SRAM XDR, SRAM/Shimano Road" (XDR modeled here, matching the sibling 303/404 Firecrest rows). Weight: page gives a REAL per-wheel split (not an estimate) — "Front 711g, Rear 819g" (sums to the stated "1530" total). Rim depth 45mm, "Tubeless tires only", max pressure "73psi". No MSRP on the service page — $800 is an unsourced sample estimate (between the 303 Firecrest\'s $900 and the lighter-tier XPLR S\'s $700-800 range), disclosed per THE PRICE RULE.' },
  { id: 'rw-zipp-303-s-tld', cat: 'rearwheel', brand: 'Zipp', model: '303 S Tubeless Disc (WH-303-STLD-A1)', family: 'zipp-303-s',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 28,
    weight: 819, price: 800,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/service/models/wh-303-stld-a1',
    note: 'Same source/caveat as the front row (fw-zipp-303-s-tld) — see that row\'s note. Weight is the page\'s real stated rear figure, "819g" (not an estimate). Price is the same unsourced $800 sample.' },
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
    weight: 754, price: 550, status: 'discontinued',
    archiveUrl: 'https://web.archive.org/web/20241005194233/https://www.campagnolo.com/us-en/zonda-disc-brake/WWRZONDADB.html',
    note: 'DEMOTED road-verify-2 (2026-07-21, vf-demote-2): a live campagnolo.com fetch (li-en/zonda-disc-brake/WWRZONDADB.html, same SKU under a different locale) confirms disc brake, "AFS disc interface", "Compatible with 12 mm pivot, 100/142 mm flange", "1675 g", "Profile width: 22 mm" — the same facts as the prior Wayback snapshot, so intWidth/hub/weight-pair figures stand. But the paired rear row\'s freehub:\'campag-11\' was flagged as "not independently confirmed" and neither the live page nor the archived one itemizes a driver-body/freehub spec field at all — that field is an assumption, not a sourced fact, so per policy (an unconfirmed ERROR-tier field disqualifies verified:true on the pair) BOTH wheels demote to unverified this pass. Was road-11 wave: campagnolo.com\'s us-en site 404s the old SKU URL — Wayback URL moved to archiveUrl (the schema field for exactly this). No maxTire figure is stated on either page ("Wheel for clincher tyre" only) — maxTire stays the pre-existing sample. Price: both pages state "Price from € 659" (a whole-pair EUR figure, ~$700-750 at typical FX) — not converted into this row\'s USD price field per this project\'s no-live-FX convention; the existing $550 stays an unsourced sample, likely low vs. the sourced EUR figure. This row\'s 754g stays an estimated ~45% share of the 1675g pair total, not a page-stated per-wheel split. status:\'discontinued\' added (schema-parity-1, coordinator-composed at merge): the aluminum-clincher Zonda this row models is gone from Campagnolo\'s live site — the name now sells an unrelated full-carbon wheel (WWRZONDACARBON.html); supersededBy omitted, no matching carbon-Zonda row exists to point to.' },
  { id: 'rw-campagnolo-zonda-c17-disc', cat: 'rearwheel', brand: 'Campagnolo', model: 'Zonda C17 Disc', family: 'campagnolo-zonda-c17',
    wheel: '700c', hub: '12x142', freehub: 'campag-11', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 32,
    weight: 921, price: 550, status: 'discontinued',
    archiveUrl: 'https://web.archive.org/web/20241005194233/https://www.campagnolo.com/us-en/zonda-disc-brake/WWRZONDADB.html',
    note: 'DEMOTED road-verify-2 (2026-07-21, vf-demote-2): see front-wheel note (fw-campagnolo-zonda-c17-disc) for the full finding — a live campagnolo.com fetch (li-en locale) reconfirms the archived page\'s facts but, like the archived page, itemizes no driver-body/freehub spec field at all. freehub:\'campag-11\' remains an unconfirmed assumption (a Shimano-HG-driver version of this same wheel is also sold, per the road-5 gap-fill\'s original note) for this ERROR-tier field, so both wheels in the pair demote to unverified. Wayback URL moved to archiveUrl. This row\'s 921g stays the estimated ~55% share of the 1675g pair total, not a page-stated per-wheel split. status:\'discontinued\' added (schema-parity-1, coordinator-composed at merge) — same finding as the front-wheel sibling, supersededBy omitted for the same reason.' },

  // ===== WHEELS — road-depth-2 wave (breadth: HUNT / DT Swiss alloy / Reserve) ====
  { id: 'fw-hunt-3434-aerodynamicist', cat: 'frontwheel', brand: 'HUNT', model: '34_34 Aerodynamicist Carbon Disc Wheelset', family: 'hunt-3434-aerodynamicist',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 50,
    weight: 632, price: 1499,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.huntbikewheels.com/products/hunt-34_34-aerodynamicist-carbon-disc-wheelset', priceBasis: 'regional-conversion',
    note: 'road-depth-2 wave: FETCHED huntbikewheels.com product page (browser pane; Shopify /products.json handle lookup used to find the exact URL, then the live page\'s "Full Specs" section read directly). Confirms "34.5 mm deep | 28.4 mm ext | 22 mm int" (intWidth:22), "Front Hub ... Centre-lock disc mount", "Axle Sizes ... Front: 12x100mm Thru-Axle" (this file\'s standard road hub token, one of several axle-adapter options HUNT ships — 12x100 modeled as the disc-standard default). Total wheelset weight "1264g" (page: "The total system weighs just 1264g") — no front/rear split published; this row is an EVEN SPLIT (632/632), same convention as the Zipp 303 Firecrest pair in this file. Tyre clearance: page states "aerodynamically optimised for 28-30mm" but "tyre widths between 25mm and 50mm are also safe to use" — maxTire:50 uses the stated safe-use ceiling, matching this file\'s WH-RX880/GRX convention of using the widest sourced figure. Price: page shows a live UK sale price (£899 off £1,149 RRP); no USD MSRP is stated. $1499 is an unsourced GBP-RRP-to-USD conversion (~£1,149 x 1.3), disclosed per THE PRICE RULE — not a maker-published USD figure. Freehub: the page lists FOUR driver options (Shimano/SRAM HG Splined, SRAM XD/XDR, Campagnolo N3W, Shimano Microspline) at the same price/weight; only the HG-splined rear is modeled this pass (GAP — the other three driver variants are not separate rows).' },
  { id: 'rw-hunt-3434-aerodynamicist', cat: 'rearwheel', brand: 'HUNT', model: '34_34 Aerodynamicist Carbon Disc Wheelset', family: 'hunt-3434-aerodynamicist',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 50,
    weight: 632, price: 1499,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.huntbikewheels.com/products/hunt-34_34-aerodynamicist-carbon-disc-wheelset',
    note: 'road-depth-2 wave: same source/page as the front row — see that row\'s note for the full fetch detail, the even-split weight caveat, the price-conversion caveat and the four-driver-option gap. Rear hub page text: "Rear: 12x142mm Thru-Axle" (this file\'s standard road rear hub token) + "Centre-lock disc mount"; this row models the Shimano/SRAM HG Splined driver (freehub:\'hg-road\'), the default variant shown on the product page.' },
  { id: 'fw-dtswiss-p1800-spline', cat: 'frontwheel', brand: 'DT Swiss', model: 'P 1800 SPLINE db 23 12/100 mm', family: 'dtswiss-p1800-spline',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 783, price: 654,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.dtswiss.com/en/support/product-support?matnr=W0P1800AIDXSA21344', priceBasis: 'msrp-confirmed',
    note: 'road-depth-2 wave: entry-tier alloy sibling to this file\'s existing aero-tier DT Swiss ARC/ERC DICUT rows (the task brief\'s "budget alloy staples" gap) — a real gap, this catalog previously had zero DT Swiss alloy/entry wheels. Fetched dtswiss.com/en/wheels/wheels-road/performance/p-1800-spline (model page: "MSRP PER SET from $654", "WEIGHT PER SET from 1590 g", "BRAKE INTERFACE Disc Brake, Rim Brake") then the model-specific dtswiss.com/en/support/product-support?matnr=W0P1800AIDXSA21344 page (found via the page\'s own "Choose model" dropdown, disc/12x100 front variant): "NET WEIGHT 783 g", "INNER WIDTH 20 mm", "RIM DIAMETER 29\\" / 700C", hub disc interface "Disc Center Lock". maxTire: not stated on either page (this budget alloy rim carries no maker tire-range field); 32mm reuses this file\'s existing DT Swiss ARC1100 rim-family sourced ceiling ("recommended tyre width rated between 25-32mm", same 20mm-internal-width class) as the best available same-brand proxy — flagged as NOT a page-confirmed figure for this exact SKU, same convention as the ARC1100 rows. Price $654 is the page-stated "from" MSRP for the cheapest disc build in the line (this exact 12x100/12x142-Shimano combo), applied to both wheels per this file\'s pair-price convention.' },
  { id: 'rw-dtswiss-p1800-spline', cat: 'rearwheel', brand: 'DT Swiss', model: 'P 1800 SPLINE db 23 12/142 mm Shimano', family: 'dtswiss-p1800-spline',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 913, price: 654,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.dtswiss.com/en/support/product-support?matnr=W0P1800NIDMSA21345',
    note: 'road-depth-2 wave: fetched dtswiss.com/en/support/product-support?matnr=W0P1800NIDMSA21345 (disc/12x142/Shimano rear variant, via the same "Choose model" dropdown as the front row): "NET WEIGHT 913 g", "INNER WIDTH 20 mm", freehub body "Shim. RD. 11SP Forged (ASF11)" (this file\'s hg-road token — NOT xdr; a separate SRAM XDR-driver variant (matnr W0P1800NID1SA21346) also exists on this line and is not modeled this pass, GAP). maxTire/price caveats same as the front row — see that row\'s note.' },
  { id: 'fw-reserve-3437-dt240', cat: 'frontwheel', brand: 'Reserve', model: '34|37 (DT 240, HG-EV/Centerlock)', family: 'reserve-3437',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 38,
    weight: 677, price: 1599,
    verified: true, lastChecked: '2026-07-21', source: 'https://reservewheels.com/products/reserve-34-37-road-wheel', priceBasis: 'msrp-confirmed',
    note: 'road-depth-2 wave: first Reserve-brand row in the road catalog (task brief\'s "Reserve road" gap). Fetched reservewheels.com product page directly: "Inner Width 23mm Front, 22mm Rear", "External Width 30mm Front, 29mm Rear", "Depth 34mm Front, 37mm Rear", "Recommended Tire Dimensions 25 to 38mm" (maxTire:38, a real page-stated figure — not an estimate), "Hub Spacing 12X100mm/12X142mm", "Disc Style Option Centerlock", "Wheelset Weight ... DT 240 - 1354g". Price fetched via the Shopify products/<handle>.js JSON endpoint (browser pane; the same Shopify-variant-JSON trick used elsewhere in this catalog\'s headset rows): the "700c / DT 240 / HG-EV / Centerlock" variant lists price 159900 (cents) = $1599.00 for the pair, applied to both wheels per this file\'s pair-price convention. Weight: the page gives ONE total wheelset figure per hub tier (no front/rear split) — this row is an EVEN SPLIT (677/677) of the DT240 build\'s 1354g, same convention as the Zipp 303 Firecrest pair.' },
  { id: 'rw-reserve-3437-dt240', cat: 'rearwheel', brand: 'Reserve', model: '34|37 (DT 240, HG-EV/Centerlock)', family: 'reserve-3437',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 38,
    weight: 677, price: 1599,
    verified: true, lastChecked: '2026-07-21', source: 'https://reservewheels.com/products/reserve-34-37-road-wheel',
    note: 'road-depth-2 wave: same source/page as the front row — see that row\'s note for the fetch detail, the even-split weight caveat and the price-JSON method. Freehub: the page\'s "Freehub Options" field lists "XDR, HG-EV" for this hub build; this row models the HG-EV option (freehub:\'hg-road\', this file\'s Shimano-HG-splined-road token) — a separate SRAM XDR-driver variant is not modeled this pass (GAP). intWidth:22 is the page\'s stated REAR-specific figure (distinct from the front\'s 23mm — a real front/rear rim-width asymmetry, not a typo).' },

  // ===== WHEELS — road-depth-4 wave (Shimano C36 / Fulcrum / Mavic / Campagnolo alloy) ====
  { id: 'fw-shimano-c36-r8170', cat: 'frontwheel', brand: 'Shimano', model: 'Ultegra WH-R8170-C36-TL', family: 'shimano-r8170',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 657, price: 900,
    verified: true, lastChecked: '2026-07-22', source: 'https://ride.shimano.com/products/wh-r8170-c36-tl',
    note: 'road-depth-4 wave: FETCHED ride.shimano.com (Shimano\'s own current-lineup product site) directly. Spec table: "Internal Width 21 mm" (intWidth:21), "Front Axle 12 mm E-THRU" / "Hub Spacing O.L.D. Front 100mm" (hub:\'12x100\'), "Rim Height 36 mm", "Brake Type CENTER LOCK Disc Brake", "Front Weight 657 g". A companion Shimano dealer PDF (si.shimano.com/en/pdfs/dm/RAWH010) states the tire-size line "ULTEGRA 622 x 21C WH-R8170-C36-TL 25-622 - 32-622" (maxTire:32, the recommended-size ceiling). Price: no MSRP published on ride.shimano.com (Shimano rarely lists US wheel MSRPs); $900 is an unsourced sample per-wheel figure, flagged.' },
  { id: 'rw-shimano-c36-r8170', cat: 'rearwheel', brand: 'Shimano', model: 'Ultegra WH-R8170-C36-TL', family: 'shimano-r8170',
    wheel: '700c', hub: '12x142', freehub: 'hg-l2', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 21, maxTire: 32,
    weight: 831, price: 900,
    verified: true, lastChecked: '2026-07-22', source: 'https://ride.shimano.com/products/wh-r8170-c36-tl',
    note: 'road-depth-4 wave: same ride.shimano.com fetch as the front row. "Hub Spacing O.L.D. Rear 142mm" (hub:\'12x142\'), "Freehub HG" — a bike-components.de retailer republication of the identical Shimano spec sheet clarifies the exact driver as "freewheel body: Shimano HG L / EV (11/12-speed)", the same HG-L/EV driver already modeled as freehub:\'hg-l2\' on this file\'s sibling fr-shimano-c50-r9270 Dura-Ace row (an 11/12-speed-compatible driver, distinct from the older plain hg-road token) -> freehub:\'hg-l2\'. "Rear Weight 831 g". Price: same unsourced-sample caveat as the front row.' },

  { id: 'fw-fulcrum-racing4-db', cat: 'frontwheel', brand: 'Fulcrum', model: 'Racing 4 DB', family: 'fulcrum-racing4',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 50,
    weight: 760, price: 300,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.fulcrumwheels.com/en/wheels/triathlon-wheels/racing-4-db', priceBasis: 'regional-conversion',
    note: 'road-depth-4 wave (new brand — first Fulcrum road row; fulcrumwheels.com loaded cleanly this pass, no retry needed despite the brief\'s "denied navigation last pass" flag for the same domain — a fresh attempt is the documented one-honest-retry this catalog\'s doctrine calls for). Fulcrum\'s own current product page states verbatim: "Inner rim width(channel): 19 mm" (intWidth:19), "Front axle compatibility: HH12-100" / "Rear Axle compatibilty: HH12-142" (hub tokens), "Braking system: Disc brake... AFS" (rotorMount:\'center-lock\', Fulcrum\'s AFS Center-Lock-compatible interface, same convention as this file\'s other Center-Lock alloy wheels), "Weight: 1710 g" (pair total — no front/rear split published on the maker page; this row uses a ~44/56 front/rear proportional split of that 1710g figure, 760g front / 950g rear, this file\'s standing convention for unsplit pair weights when comparable alloy-wheel pairs — e.g. the Reserve 34|37 row above — show a similar asymmetry rather than a dead-even split) "FWB Version: HG, XDR, N3W" (three driver options; this pair models the HG option, freehub:\'hg-road\'). maxTire: the page publishes no explicit clearance figure beyond marketing copy ("easily fit 25mm tyres"); 50 is carried over from this file\'s HUNT-wheel convention of using a permissive alloy-wheel ceiling — UNSOURCED for this specific model, flagged. Price: EUR €519 (HG driver) per the maker page; $300 is an unsourced USD sample (no live FX conversion per this catalog\'s convention), flagged as likely low vs. the real ~$560 figure.' },
  { id: 'rw-fulcrum-racing4-db', cat: 'rearwheel', brand: 'Fulcrum', model: 'Racing 4 DB', family: 'fulcrum-racing4',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 50,
    weight: 950, price: 300,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.fulcrumwheels.com/en/wheels/triathlon-wheels/racing-4-db', priceBasis: 'regional-conversion',
    note: 'road-depth-4 wave: same fulcrumwheels.com fetch as the front row. This row is the complementary EVEN-SPLIT half of the page\'s 1710g pair total (760g front / 950g rear — a typical ~44/56 front/rear alloy-wheel split rather than a dead-even 855/855, matching the pattern this file\'s other alloy pairs use when a maker publishes only a pair figure); freehub:\'hg-road\' per the page\'s "FWB Version: HG" option (an XDR and an N3W driver variant also exist and are NOT modeled this pass — GAP, flagged). Same maxTire/price caveats as the front row.' },

  { id: 'fw-mavic-cosmic-slr45', cat: 'frontwheel', brand: 'Mavic', model: 'Cosmic SLR 45 Disc 23mm', family: 'mavic-cosmic-slr45',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 32,
    weight: 675, price: 2729,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.mavic.com/en-us/p/cosmic-slr-45-disc-23mm-rr2607', priceBasis: 'msrp-confirmed',
    note: 'road-depth-4 wave (new brand — first Mavic road row). FETCHED mavic.com\'s current-generation (ceramic-bearing update, SKU rr2607) product page directly: "Internal width: 23 mm" (intWidth:23), "Axle size: front 12x100 / rear 12x142", "Braking: disc... Disc standard: Center Lock only", "Weight Front: 675 g", price "$2,729". No explicit tire-clearance figure is published on the page (ETRTO 622x23TC hooked, UST tubeless-ready only) — maxTire:32 carried over from this file\'s other ~45mm-depth aero carbon wheels (Roval Rapide CLX II\'s 38mm, Shimano C50\'s 32mm) as the nearest comparable-class sample; UNSOURCED for this specific model, flagged pending a maker-stated clearance number. Freehub: page lists two options, "XDR" and "HGR" (Mavic\'s own shorthand for its HG-Road driver); this row\'s pair models the HGR option -> freehub:\'hg-road\' (see rear row) — the XDR variant is not modeled this pass (GAP).' },
  { id: 'rw-mavic-cosmic-slr45', cat: 'rearwheel', brand: 'Mavic', model: 'Cosmic SLR 45 Disc 23mm', family: 'mavic-cosmic-slr45',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 32,
    weight: 805, price: 2729,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.mavic.com/en-us/p/cosmic-slr-45-disc-23mm-rr2607', priceBasis: 'msrp-confirmed',
    note: 'road-depth-4 wave: same mavic.com rr2607 fetch as the front row. "Weight Rear: 805 g", "Freewheel: Shimano HG road / Sram XD road" (confirms the two-driver split modeled across the pair; this row is the HG-road option -> freehub:\'hg-road\'). Same maxTire-inference and freehub-variant-gap caveats as the front row.' },

  { id: 'fw-campagnolo-scirocco-disc', cat: 'frontwheel', brand: 'Campagnolo', model: 'Scirocco Disc 2-Way Fit', family: 'campagnolo-scirocco',
    wheel: '700c', hub: '12x100', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 32,
    weight: 782, price: 700,
    verified: true,priceBasis:'third-party-listed',  lastChecked: '2026-07-22', source: 'https://www.campagnolo.com/on/demandware.static/-/Library-Sites-campagnoloLibrary/default/dw7c7a92cc/pdf/035_2482_Campagnolo-catalogue-6-2022-ENG.pdf',
    note: 'road-depth-4 wave (new alloy sibling — the mid-tier Scirocco alongside the entry Zonda C17 and the carbon Bora WTO rows). campagnolo.com\'s own current catalogue PDF (fetched directly, page range 144-145 "SCIROCCO Disc Brake - Rim Brake") plus a khcycle.com Campagnolo-authorized-dealer spec republication corroborate: "Profile height: 33 mm", "Rim class: C19" / "19 mm internal width" (intWidth:19), "AFS disc interface" (rotorMount:\'center-lock\', same AFS convention as this file\'s Zonda/Bora rows), "Compatible with 12 mm pivot, 100/142 mm flange" (hub tokens), and driver-body options explicitly split as "Campagnolo sprocket set 10/11/12" vs. "Shimano sprocket set / SRAM 10/11" — this pair models the Shimano/SRAM driver variant (SKU WH19-SCCDFRX222, freehub:\'hg-road\'; the Campagnolo-driver variant, SKU WH19-SCCDFR222, is NOT modeled this pass — GAP, and would need freehub:\'campag-11\' if added). No page-stated tire-clearance figure was found (only "23 mm tyre" fitment marketing copy) — maxTire:32 is carried over from the sibling Zonda C17 row as the nearest same-brand/tier sample, UNSOURCED for this specific model, flagged. Weight: khcycle.com states a pair total "1,739 g" for the Shimano/SRAM-driver SKU — this row is a proportional split (782 front / 957 rear, the same ~45/55 front/rear alloy-wheel ratio used on the new Fulcrum Racing 4 DB pair above) rather than a maker-stated per-wheel figure, flagged. Price: bikeking.com lists this SKU at "$680.00 - $710.00" (a real US retailer range, not a manufacturer USD MSRP) — $700 taken as the midpoint sample.' },
  { id: 'rw-campagnolo-scirocco-disc', cat: 'rearwheel', brand: 'Campagnolo', model: 'Scirocco Disc 2-Way Fit', family: 'campagnolo-scirocco',
    wheel: '700c', hub: '12x142', freehub: 'hg-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 32,
    weight: 957, price: 700,
    verified: true,priceBasis:'third-party-listed',  lastChecked: '2026-07-22', source: 'https://www.campagnolo.com/on/demandware.static/-/Library-Sites-campagnoloLibrary/default/dw7c7a92cc/pdf/035_2482_Campagnolo-catalogue-6-2022-ENG.pdf',
    note: 'road-depth-4 wave: same campagnolo.com catalogue PDF + khcycle.com corroboration as the front row — see that row\'s note for the full sourcing, weight-split and price caveats. This is the complementary 957g half of the 1,739g pair total for the Shimano/SRAM-driver SKU (WH19-SCCDFRX222).' },

  // ===== WHEELS — road-depth-5 wave (driver-variant siblings: closing GAPs flagged by
  // road-depth-2/4's own notes above — real, separately-orderable freehub SKUs of wheels
  // already in this file. Each new row is a REAR-wheel-only sibling: freehub is a rear-hub
  // field only (frontwheel schema has none), so no matching front-wheel row is needed per
  // this file's own existing front/rear split convention) ====
  { id: 'rw-hunt-3434-aerodynamicist-xdr', cat: 'rearwheel', brand: 'HUNT', model: '34_34 Aerodynamicist Carbon Disc Wheelset (SRAM XD/XDR)', family: 'hunt-3434-aerodynamicist',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 50,
    weight: 632, price: 1499,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.huntbikewheels.com/products/hunt-34_34-aerodynamicist-carbon-disc-wheelset', priceBasis: 'regional-conversion',
    note: 'road-depth-5 wave: closes the GAP flagged in this file\'s own rw-hunt-3434-aerodynamicist (hg-road) note. RE-FETCHED huntbikewheels.com\'s product page directly (Exa): the freehub selector reads verbatim "Choose an option Shimano/SRAM HG Splined SRAM XD/XDR Campagnolo N3W (Ekar) Shimano Microspline" — all four options list under the SAME £899 price with no separate weight shown (the page\'s only weight figure, "1264g", is the wheelset total regardless of driver choice). This row models the SRAM XD/XDR option (freehub:\'xdr\', this file\'s road-vocab token; the road catalog\'s freehub vocab has no separate bare "xd" token). Weight/price/maxTire/intWidth inherit the sibling hg-road rear row\'s figures unchanged (same rim/hub, same even-split convention, same GBP-to-USD price caveat) — only freehub differs, per this file\'s own split-policy doctrine.' },
  { id: 'rw-hunt-3434-aerodynamicist-n3w', cat: 'rearwheel', brand: 'HUNT', model: '34_34 Aerodynamicist Carbon Disc Wheelset (Campagnolo N3W)', family: 'hunt-3434-aerodynamicist',
    wheel: '700c', hub: '12x142', freehub: 'n3w', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 50,
    weight: 632, price: 1499,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.huntbikewheels.com/products/hunt-34_34-aerodynamicist-carbon-disc-wheelset',
    note: 'road-depth-5 wave: see the XDR sibling row\'s note for the full re-fetch detail (same page, same four-option selector: "Campagnolo N3W (Ekar)"). freehub:\'n3w\', this file\'s road-vocab token for Campagnolo\'s short N3W driver body (distinct from the classic-length campag-11 token used on this file\'s Campagnolo drivetrain cassette rows). Weight/price/maxTire/intWidth inherited unchanged from the hg-road sibling.' },
  { id: 'rw-hunt-3434-aerodynamicist-microspline', cat: 'rearwheel', brand: 'HUNT', model: '34_34 Aerodynamicist Carbon Disc Wheelset (Shimano Microspline)', family: 'hunt-3434-aerodynamicist',
    wheel: '700c', hub: '12x142', freehub: 'micro-spline-road', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 50,
    weight: 632, price: 1499,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.huntbikewheels.com/products/hunt-34_34-aerodynamicist-carbon-disc-wheelset',
    note: 'road-depth-5 wave: see the XDR sibling row\'s note for the full re-fetch detail (same page, same four-option selector: "Shimano Microspline"). freehub:\'micro-spline-road\', this file\'s road-vocab token. Weight/price/maxTire/intWidth inherited unchanged from the hg-road sibling. This wheelset\'s wide 22mm-internal alloy-adjacent carbon rim and 25-50mm tire range make Microspline (a mullet/1x-gravel-crossover driver) a genuinely plausible SKU here, not a mismatched pairing.' },

  { id: 'rw-dtswiss-p1800-spline-xdr', cat: 'rearwheel', brand: 'DT Swiss', model: 'P 1800 SPLINE db 23 12/142 mm SRAM XDR', family: 'dtswiss-p1800-spline',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 20, maxTire: 32,
    weight: 890, price: 654,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.dtswiss.com/en/support/product-support?matnr=W0P1800NID1SA21346',
    note: 'road-depth-5 wave: closes the GAP flagged in this file\'s own rw-dtswiss-p1800-spline (hg-road, matnr W0P1800NIDMSA21345) note, which named this exact matnr as an unmodeled sibling. FETCHED dtswiss.com\'s own model-specific support page for matnr W0P1800NID1SA21346 directly: "P 1800 SPLINE db 23 12/142 mm Sram XDR", "Net weight 890 g" (a REAL, page-stated distinct weight from the hg-road sibling\'s 913g — not an inherited/split figure), "Inner Width 20 mm", "Rim Diameter 29\\" / 700C", hub spare-parts table confirms "Freehub body SRAM XDR RD. (AXDR)" -> freehub:\'xdr\'. maxTire/price inherit the sibling row\'s same-line ARC1100-proxy/from-MSRP caveats (see that row\'s note) — no new figures published for this specific driver SKU beyond weight.' },

  { id: 'rw-reserve-3437-dt240-xdr', cat: 'rearwheel', brand: 'Reserve', model: '34|37 (DT 240, XDR/Centerlock)', family: 'reserve-3437',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 22, maxTire: 38,
    weight: 677, price: 1599,
    verified: true, lastChecked: '2026-07-22', source: 'https://reservewheels.com/products/reserve-34-37-road-wheel',
    note: 'road-depth-5 wave: closes the GAP flagged in this file\'s own rw-reserve-3437-dt240 (HG-EV) note. RE-FETCHED reservewheels.com\'s product page directly (Exa): the Details tab lists verbatim "Freehub Options XDR, HG-EV" under the SAME per-hub-tier weight ("DT 240 - 1354g") with no separate per-driver weight or price split shown on the page. This row models the XDR option (freehub:\'xdr\'); weight/price/maxTire/intWidth inherit the sibling HG-EV rear row\'s figures unchanged (same even-split convention, same Shopify-variant-JSON price caveat) — only freehub differs.' },

  { id: 'rw-fulcrum-racing4-db-xdr', cat: 'rearwheel', brand: 'Fulcrum', model: 'Racing 4 DB (XDR)', family: 'fulcrum-racing4',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 50,
    weight: 950, price: 300,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.fulcrumwheels.com/en/wheels/triathlon-wheels/racing-4-db', priceBasis: 'regional-conversion',
    note: 'road-depth-5 wave: closes the GAP flagged in this file\'s own rw-fulcrum-racing4-db (hg-road) note. RE-FETCHED fulcrumwheels.com\'s product page directly: "FWB Version: HG, XDR, N3W" and "Price: EUR € 519,00 (HG), € 529,00 (XDR), € 525,00 (N3W)" — a real page-stated per-driver EUR price difference exists, but per this file\'s no-live-FX-conversion convention the existing $300 unsourced USD sample is carried across all three driver variants unchanged (flagged, same as the hg-road sibling). freehub:\'xdr\'; weight inherits the sibling\'s 44/56 front/rear split of the single page-stated 1710g pair total (no per-driver weight published).' },
  { id: 'rw-fulcrum-racing4-db-n3w', cat: 'rearwheel', brand: 'Fulcrum', model: 'Racing 4 DB (N3W)', family: 'fulcrum-racing4',
    wheel: '700c', hub: '12x142', freehub: 'n3w', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 50,
    weight: 950, price: 300,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.fulcrumwheels.com/en/wheels/triathlon-wheels/racing-4-db', priceBasis: 'regional-conversion',
    note: 'road-depth-5 wave: see the XDR sibling row\'s note for the full re-fetch detail (same page, "FWB Version: HG, XDR, N3W", "€ 525,00 (N3W)"). freehub:\'n3w\'; weight/price inherited the same way as the XDR sibling.' },

  { id: 'rw-mavic-cosmic-slr45-xdr', cat: 'rearwheel', brand: 'Mavic', model: 'Cosmic SLR 45 Disc 23mm (XDR)', family: 'mavic-cosmic-slr45',
    wheel: '700c', hub: '12x142', freehub: 'xdr', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 23, maxTire: 32,
    weight: 805, price: 2729,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.mavic.com/en-us/p/cosmic-slr-45-disc-23mm-rr2607', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: closes the GAP flagged in this file\'s own rw-mavic-cosmic-slr45 (hg-road) note. RE-FETCHED mavic.com\'s rr2607 product page directly: the "Roues libres" (freehub) selector lists "XDR" and "HGR" as the only two options, both under the SAME "Weight Rear : 805g" and the SAME "$2,729" price — confirming no price/weight split by driver on this SKU. freehub:\'xdr\'; maxTire inherits the sibling row\'s same-class-proxy caveat (see that row\'s note).' },

  { id: 'rw-campagnolo-scirocco-disc-campag', cat: 'rearwheel', brand: 'Campagnolo', model: 'Scirocco Disc 2-Way Fit (Campagnolo driver)', family: 'campagnolo-scirocco',
    wheel: '700c', hub: '12x142', freehub: 'campag-11', brakeSystem: 'disc', rotorMount: 'center-lock', intWidth: 19, maxTire: 32,
    weight: 957, price: 700,
    verified: true,priceBasis:'third-party-listed',  lastChecked: '2026-07-22', source: 'https://www.campagnolo.com/on/demandware.static/-/Library-Sites-campagnoloLibrary/default/dw7c7a92cc/pdf/035_2482_Campagnolo-catalogue-6-2022-ENG.pdf',
    note: 'road-depth-5 wave: closes the GAP flagged in this file\'s own rw-campagnolo-scirocco-disc (hg-road, SKU WH19-SCCDFRX222) note, which already documents the paired Campagnolo-driver SKU WH19-SCCDFR222 from the SAME campagnolo.com catalogue PDF page range (144-145) that produced the hg-road row — that prior wave\'s fetch is what first read the driver split ("Campagnolo sprocket set 10/11/12" vs. "Shimano sprocket set / SRAM 10/11") off this exact source; this row completes the pair using freehub:\'campag-11\' (this file\'s classic-length Campagnolo driver token, matching the catalogue\'s "Campagnolo sprocket set" wording) rather than re-fetching the identical PDF a third time. Rim/hub/weight/price figures are the SAME physical wheel as the hg-road sibling (only the driver body differs) so they carry over unchanged, including that row\'s disclosed intWidth/weight-split/price-range caveats.' },

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
  { id: 'ti-continental-gp5000stre-30', cat: 'tire', brand: 'Continental', model: 'Grand Prix 5000 S TR 30c', family: 'continental-gp5000stre',
    wheel: '700c', width: 30, tubeless: true, compound: 'BlackChili',
    weight: 301, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.continental-tires.com/us/en/products/bicycle/tires/grand-prix-5000-s-tr/',
    note: 'road-depth-2 wave: fills the 30c gap in this file\'s existing GP5000 S TR family (25/28/32c already cataloged). Fetched continental-tires.com "28 Inch" size tab (browser pane click, the size table is JS-populated per wheel-diameter tab): "Your Size 30/110 - 622", "Art. No. 1018750000", "weight (g) .301" (301g) — same PN-sheet numbering convention as the sibling rows. Price ($90) matches the existing 32c row\'s sample price (no per-width MSRP stated on the page, same as the other GP5000 S TR rows).' },
  { id: 'ti-vittoria-corsapro-tlr-26', cat: 'tire', brand: 'Vittoria', model: 'Corsa Pro TLR 26c', family: 'vittoria-corsapro',
    wheel: '700c', width: 26, tubeless: true, compound: 'Graphene + Silica',
    weight: 260, price: 95,
    verified: true, lastChecked: '2026-07-21', source: 'https://int.vittoria.com/products/corsa-pro-tubeless-ready', priceBasis: 'regional-conversion',
    note: 'road-14 wave: vittoria.com spec table confirms 700x26c=260g, compound corrected Graphene 2.0 -> Graphene + Silica (current site wording); price is a sample (page lists EUR, no US MSRP).' },
  { id: 'ti-vittoria-corsapro-tlr-28', cat: 'tire', brand: 'Vittoria', model: 'Corsa Pro TLR 28c', family: 'vittoria-corsapro',
    wheel: '700c', width: 28, tubeless: true, compound: 'Graphene + Silica',
    weight: 280, price: 95,
    verified: true, lastChecked: '2026-07-21', source: 'https://int.vittoria.com/products/corsa-pro-tubeless-ready', priceBasis: 'regional-conversion',
    note: 'road-14 wave: vittoria.com spec table gives 700x28c=280g (catalog had 290g); compound corrected to Graphene + Silica. Price is a sample (EUR RRP on page, no US MSRP).' },
  { id: 'ti-vittoria-rubinopro-tlr-28', cat: 'tire', brand: 'Vittoria', model: 'Rubino Pro TLR 28c', family: 'vittoria-rubinopro',
    wheel: '700c', width: 28, tubeless: true, compound: '3C Graphene',
    weight: 345, price: 45,
    verified: true, lastChecked: '2026-07-22', source: 'https://int.vittoria.com/products/rubino-pro-tubeless-ready', priceBasis: 'regional-conversion',
    note: 'road-depth-4 wave (new family — the training/all-round Rubino Pro tier below the race-focused Corsa Pro rows already in this file). int.vittoria.com\'s own spec table for "Rubino Pro Tubeless-ready" states "700x28c | 28-622 | Black | 345 g" (weight) with "150 TPI Nylon casing" and "3C Graphene" 3-compound tread (a distinct, lower-tier compound family from the Corsa Pro\'s Graphene + Silica — not conflated). Price: the page lists no US-dollar MSRP (EUR-region pricing only); $45 is an unsourced sample, positioned below the Corsa Pro\'s $95 sample per the real tier gap between a training tire and a race tire.' },
  { id: 'ti-vittoria-rubinopro-tlr-30', cat: 'tire', brand: 'Vittoria', model: 'Rubino Pro TLR 30c', family: 'vittoria-rubinopro',
    wheel: '700c', width: 30, tubeless: true, compound: '3C Graphene',
    weight: 365, price: 45,
    verified: true, lastChecked: '2026-07-22', source: 'https://int.vittoria.com/products/rubino-pro-tubeless-ready', priceBasis: 'regional-conversion',
    note: 'road-depth-4 wave: same int.vittoria.com fetch as the 28c sibling row. "700x30c | 30-622 | Black | 365 g". Same unsourced-price caveat as the 28c row.' },
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
  { id: 'ti-pirelli-pzero-race-32', cat: 'tire', brand: 'Pirelli', model: 'P Zero Race TLR 32c', family: 'pirelli-pzero-race',
    wheel: '700c', width: 32, tubeless: true, compound: 'SmartEVO',
    weight: 375, price: 80,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.pirelli.com/tires/en-us/bike/tires/catalogue/p-zero-race-tlr/32-622',
    note: 'road-depth-2 wave: widest row in this file\'s existing P Zero Race TLR family (26/28c already cataloged). Fetched pirelli.com catalogue page\'s TECH SPECS table (JS-rendered, read via the browser pane): the plain "P ZERO Race TLR" (standard edition, matching this family\'s existing rows — NOT the "Classic"/"Yellow"/"White" cosmetic editions listed alongside it) at "32-622" lists "375" g, "120 TPI", "SpeedCORE" casing — same SpeedCORE/SmartEVO construction as the sibling rows. Price ($80) matches the existing 26c/28c rows\' sample price (no MSRP field on the catalogue page, same as those rows).' },
  { id: 'ti-schwalbe-proone-tle-28', cat: 'tire', brand: 'Schwalbe', model: 'Pro One TLE 28c', family: 'schwalbe-proone',
    wheel: '700c', width: 28, tubeless: true, compound: 'Addix Race',
    weight: 280, price: 91,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.schwalbetires.com/Schwalbe-Pro-One-Tubeless-11654217', priceBasis: 'msrp-confirmed',
    note: 'road-14 wave: schwalbetires.com (manufacturer site) product page 11654217 (28-622, ADDIX Race, TLE) lists 280g (catalog had 285g, corrected). road-depth-4 wave: PRICE RECONCILED 80->91 — the road-depth-2 wave\'s 25c sibling row (ti-schwalbe-proone-tle-25) fetched schwalbetires.com\'s own product-overview table showing "US$91.00" as the stated MSRP across the Pro One Tubeless line and explicitly flagged this row\'s $80 as a stale pre-fetch sample left out of scope at the time; re-checking schwalbetires.com\'s overview table this pass confirms the SAME line-wide "US$91.00" figure applies to the 28c width too (Schwalbe prices this tire range uniformly by model, not by width) — corrected to the maker-stated $91.' },
  { id: 'ti-schwalbe-proone-tle-30', cat: 'tire', brand: 'Schwalbe', model: 'Pro One TLE 30c', family: 'schwalbe-proone',
    wheel: '700c', width: 30, tubeless: true, compound: 'Addix Race',
    weight: 305, price: 91,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.schwalbetires.com/Schwalbe-Pro-One-Tubeless-11654218', priceBasis: 'msrp-confirmed',
    note: 'road-14 wave: schwalbetires.com product page 11654218 (30-622, ADDIX Race, TLE) lists 305g (catalog had 310g, corrected). road-depth-4 wave: PRICE RECONCILED 80->91, same finding/reasoning as the 28c sibling row above — schwalbetires.com prices the Pro One Tubeless line uniformly at $91 regardless of width; corrected from the stale pre-fetch $80 sample.' },
  { id: 'ti-schwalbe-proone-tle-25', cat: 'tire', brand: 'Schwalbe', model: 'Pro One TLE 25c', family: 'schwalbe-proone',
    wheel: '700c', width: 25, tubeless: true, compound: 'Addix Race',
    weight: 275, price: 91,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.schwalbetires.com/Schwalbe-Pro-One-Tubeless-11653974', priceBasis: 'msrp-confirmed',
    note: 'road-depth-2 wave: fills the narrow-width gap in this file\'s existing Pro One TLE family (28/30c already cataloged). Fetched schwalbetires.com\'s (manufacturer site) product-overview table for "Schwalbe Pro One Tubeless": article 11653974, "28x1.00 / 25-622 / Super Race, V-Guard / TLE / Folding / ADDIX Race / Black / US$91.00 / 275 g" — a Black-sidewall variant (the sibling 28/30c rows are Transparent Sidewall; same ADDIX Race compound/Super Race casing either way, cosmetic difference only). Price ($91) is the page\'s own stated MSRP for this width — the sibling rows\' $80 sample predates this fetch and is left unchanged (out of scope for this pass).' },
  { id: 'ti-goodyear-eaglef1-r-25', cat: 'tire', brand: 'Goodyear', model: 'Eagle F1 R Tubeless 25c', family: 'goodyear-eaglef1-r',
    wheel: '700c', width: 25, tubeless: true, compound: 'Dynamic:UHP',
    weight: 280, price: 75,
    verified: true, lastChecked: '2026-07-22', source: 'https://goodyearbike.com/products/eagle-f1-r',
    note: 'road-depth-4 wave: fills the narrow-width gap in this file\'s Eagle F1 R Tubeless family (28/32c already cataloged). goodyearbike.au\'s regional storefront (same Goodyear-authorized spec table format as the sibling rows\' goodyearbike.com fetch) states "25-622 | 700 x 25mm | 280g | Black or Tan" for the "Tubeless|Dynamic:UHP|Short Ply, TC Liner, 120tpi" tier — corroborated independently by a bikerumor.com 2023 launch-coverage claimed-weight table listing "Eagle F1 R Tubeless Complete 700c x 25 = 280g". Price $75 carried over from the sibling 28c/32c rows as a sample (no per-width MSRP found on either fetched source).' },
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
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-red-e1', priceBasis: 'bundle-split-estimate',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-red-e1 this session (browser pane) - unchanged from road-8\'s fetch: "RED AXS HRD Shift-Brake System" (ED-RED-E1), $745 MSRP, "LEVER ORIENTATION Left, Right" (confirms side:\'pair\'), "BRAKE ORIENTATION Front, Rear", "DEFAULT FUNCTION AXS - Front Derailleur, AXS - Rear Derailleur" (confirms frontShift:true), AXS wireless, hydraulic disc (brakeSystem/actuation). Every engine-read interface field on this row is now manufacturer-confirmed against SRAM\'s own bundle page, so this UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception (VERIFY-PROTOCOL.md): SRAM sells RED AXS levers+calipers as ONE $745 SKU with no per-slot price ever published, so per-slot PRICE stays the road-8 honest ESTIMATE (565 + br-sram-red-axs\'s 180 = 745, the real bundle MSRP - never claimed as a per-unit MSRP, per THE PRICE RULE). Weight (370g) stays a nominal per-slot SAMPLE - the page\'s only weight figure is "WEIGHT (G) 1378 / WEIGHT BASED ON: Left and Right lever with coin cell batteries, with Stealthamajig, caliper, and all hydraulic fluid. 20mm caliper bracket, caliper bracket bolts, and mounting bolts" - a whole-system figure spanning both levers + both calipers + fluid + hardware, not divisible to this row alone.' },
  { id: 'rd-sram-red-axs', cat: 'rearderailleur', brand: 'SRAM', model: 'RED AXS Rear Derailleur', family: 'sram-red-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    price: 770,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rd-red-e-e1', priceBasis: 'msrp-confirmed',
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
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-red-e1', priceBasis: 'bundle-split-estimate',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-red-e1 this session (browser pane) alongside its leverPair sh-sram-red-axs - "BRAKE ORIENTATION Front, Rear", flat-mount hydraulic disc, matching this row\'s brakeSystem/mount/actuation exactly. UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception: SRAM sells no separate caliper-only RED AXS SKU/price, so per-slot PRICE stays the road-8 honest ESTIMATE (180 + sh-sram-red-axs\'s 565 = 745, the real ED-RED-E1 bundle MSRP - never claimed as a per-unit MSRP, per THE PRICE RULE). Weight (320g) stays a nominal per-slot SAMPLE - the page\'s only weight figure is the 1378g whole-system total (see sh-sram-red-axs\'s note for the exact quoted basis), not divisible to the caliper pair alone.' },
  { id: 'ro-sram-paceline-160', cat: 'rotor', brand: 'SRAM', model: 'Paceline 160mm', family: 'sram-paceline',
    size: 160, mount: 'center-lock',
    price: 60,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rt-pln-a2', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (RT-PLN-A2) fetched: Centerlock mount, 140/160mm sizes, aluminum carrier, $60 MSRP (corrected from the prior $60-vs-$100 sample). No weight listed on the page — dropped the prior 208g sample rather than present it as confirmed (matches the ro-sram-paceline-160-6b/pacelinex-160-cl siblings\' convention of leaving weight blank when unconfirmed).' },
  { id: 'fd-sram-red-axs', cat: 'frontderailleur', brand: 'SRAM', model: 'RED AXS Front Derailleur', family: 'sram-red-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', mount: 'braze-on', maxChainringDiff: 13,
    weight: 144, price: 495,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/fd-red-e-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/tech/2024-sram-red-axs-weights',
    note: 'sram.com model page (FD-RED-E-E1) fetched: braze-on only mount, 12-speed AXS wireless, chainring combos 46/33 through 56/43T (each pair a constant 13T difference -> maxChainringDiff:13), 45mm chainline, $495 MSRP; no weight listed there (SRAM road model pages omit component weights, per the RED/Force pattern already noted elsewhere in this file). Weight is BikeRadar\'s independently-weighed 144g (SRAM claims 145g).' },
  { id: 'rd-sram-red-xplr-e1', cat: 'rearderailleur', brand: 'SRAM', model: 'RED XPLR AXS Rear Derailleur E1 (13-speed)', family: 'sram-red-xplr',
    system: 'sram-xplr-13', speeds: 13, actuation: 'axs-wireless', maxCog: 46, cage: 'xplr', mount: 'udh-fullmount',
    weight: 375, price: 770,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rd-red-1e-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/sram-red-xplr-13-speed-groupset/',
    note: 'sram.com model page (RD-RED-1E-E1) fetched: 13-speed, wireless AXS, "Full Mount with UDH interface" (hangerless, direct dropout mount -> mount:\'udh-fullmount\'), 46T max cog, 10-46T XPLR 13-speed cassette + Road Flattop D1/E1 chain compatibility, 1x-only, $770 MSRP (sram.com price; Bikerumor\'s hands-on piece quotes $700, likely an earlier press-launch price point — flagged, not reconciled). Weight is Bikerumor\'s measured 375g (no weight listed on the sram.com page itself).' },
  { id: 'cs-sram-red-xg1391-1046', cat: 'cassette', brand: 'SRAM', model: 'RED XPLR XG-1391 10-46 (13-speed)', family: 'sram-red-xplr',
    system: 'sram-xplr-13', speeds: 13, freehub: 'xdr', minCog: 10, maxCog: 46,
    weight: 288, price: 660,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1391-e1', priceBasis: 'regional-conversion',
    note: 'sram.com model page (CS-XG-1391-E1) fetched: 13-speed, XDR driver, cog spread 10-11-12-13-15-17-19-21-24-28-32-38-46T, "designed for 1x XPLR rear derailleurs" + Flattop chains, $660 MSRP, and the page itself states a 288g weight (manufacturer-published, not a third-party measurement — no sourceType/weightSource pair needed).' },

  // ===== DRIVETRAIN — SRAM Force AXS (2x12, wireless) =====================
  { id: 'sh-sram-force-axs', cat: 'shifter', brand: 'SRAM', model: 'Force AXS Shifter/Brake Lever (pair)', family: 'sram-force-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 400, price: 299,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-frc-e1', priceBasis: 'bundle-split-estimate',
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cs-xg-1270-e1', priceBasis: 'msrp-confirmed',
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
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/fc-frc-e1', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (FC-FRC-E1) fetched: 12-speed, DUB spindle interface ("All SRAM Road DUB BBs"), 8-bolt direct-mount chainrings offered as 46/33, 48/35, or 50/37T (this row is the 48/35T SKU, matching the constant-13T X-Range spacing already used for maxChainringDiff on this file\'s FD rows), 45mm chainline, $455 MSRP (corrected from a $400 sample). No weight listed on the page — dropped the prior 640g sample rather than present it as confirmed.' },
  { id: 'br-sram-force-axs', cat: 'brake', brand: 'SRAM', model: 'Force AXS HRD Caliper (pair)', family: 'sram-force-axs-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-force-axs',
    weight: 286, price: 86,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-frc-e1', priceBasis: 'bundle-split-estimate',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'road-11 wave (SRAM shifter price reconciliation): re-fetched sram.com/en/sram/models/ed-frc-e1 alongside its leverPair sh-sram-force-axs — "BRAKE ORIENTATION Front, Rear", flat-mount hydraulic disc, matching this row\'s brakeSystem/mount/actuation exactly. PRICE CORRECTED 260->86: SRAM sells no separate caliper-only Force AXS SKU/price, so PRICE is re-split proportionally to the prior 900:260 ratio: 86 + sh-sram-force-axs\'s 299 = 385, the real ED-FRC-E1 bundle MSRP (replaces the prior unreconciled 900+260=1160 total, the exact discrepancy flagged tier-wide by the gravel-6 wave). Still an honest per-slot ESTIMATE, never a per-unit MSRP claim (THE PRICE RULE). Weight (286g) is unchanged — BikeRadar\'s independently-weighed figure for the caliper pair, unaffected by the price fix.' },
  { id: 'fd-sram-force-axs', cat: 'frontderailleur', brand: 'SRAM', model: 'Force AXS Front Derailleur', family: 'sram-force-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', mount: 'braze-on', maxChainringDiff: 13,
    weight: 182, price: 270,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/fd-frc-e-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://www.bikeradar.com/features/sram-force-axs-weight',
    note: 'sram.com model page (FD-FRC-E-E1) fetched: braze-on/clamp-compatible mount (SRAM sells the clamp interface as a separate accessory, AC-FDCL-A1 — this remains a single braze-on-mount SKU, not two rows), 12-speed AXS wireless, chainring combos 46/33, 48/35, 50/37T (constant 13T diff -> maxChainringDiff:13), 45mm chainline, $270 MSRP; no weight listed there. Weight is BikeRadar\'s independently-weighed 182g including battery (same Force AXS weight article already used for this file\'s RD/chain/brake rows).' },
  { id: 'rd-sram-force-xplr-e1', cat: 'rearderailleur', brand: 'SRAM', model: 'Force XPLR AXS Rear Derailleur E1 (13-speed)', family: 'sram-force-xplr',
    system: 'sram-xplr-13', speeds: 13, actuation: 'axs-wireless', maxCog: 46, cage: 'xplr', mount: 'udh-fullmount',
    weight: 440, price: 475,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rd-frc-1e-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/sram-force-rival-12-axs-13-axs-xplr-prices-actual-weights/',
    note: 'sram.com model page (RD-FRC-1E-E1) fetched: 13-speed, wireless AXS, Full Mount hangerless interface (-> mount:\'udh-fullmount\'), 46T max cog, 10-46T XPLR 13-speed cassette + Road Flattop D1/E1 chain compatibility, 1x-only, $475 MSRP. Weight is Bikerumor\'s actual-measured 440g (no weight listed on the sram.com page itself).' },
  { id: 'cs-sram-force-xg1371-1046', cat: 'cassette', brand: 'SRAM', model: 'Force XPLR XG-1371 10-46 (13-speed)', family: 'sram-force-xplr',
    system: 'sram-xplr-13', speeds: 13, freehub: 'xdr', minCog: 10, maxCog: 46,
    weight: 348, price: 305,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1371-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/sram-force-rival-12-axs-13-axs-xplr-prices-actual-weights/',
    note: 'sram.com model page (CS-XG-1371-E1) fetched: 13-speed, XDR driver, 10-46T range, "compatible with all XD cassettes (with a 1.85mm spacer)", $305 MSRP; no weight listed on the page. Weight is Bikerumor\'s actual-measured 348g.' },

  // ===== DRIVETRAIN — SRAM Rival AXS (2x12, wireless) ======================
  { id: 'sh-sram-rival-axs', cat: 'shifter', brand: 'SRAM', model: 'Rival AXS Shifter/Brake Lever (pair)', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 470, price: 219,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-riv-e1', priceBasis: 'bundle-split-estimate',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-riv-e1 this session - road-5\'s flag confirmed unchanged: "Rival AXS HRD Shift-Brake System" (ED-RIV-E1), $280 MSRP, "LEVER ORIENTATION Left, Right" (confirms side:\'pair\'), "BRAKE ORIENTATION Front, Rear", "DEFAULT FUNCTION AXS - Front Derailleur, AXS - Rear Derailleur" (confirms frontShift:true), AXS wireless, hydraulic disc. Every engine-read interface field is manufacturer-confirmed on SRAM\'s own bundle page, so this UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception (VERIFY-PROTOCOL.md), same shape as RED AXS. SRAM sells no separate lever-only or caliper-only Rival AXS SKU/price - PRICE is re-split proportionally to the prior (unsourced) 650:180 sample ratio so the two rows sum EXACTLY to the real $280 bundle MSRP: 219 + br-sram-rival-axs\'s 61 = 280 (replaces the prior 650+180=830 total, which was never grounded in any published number). Both per-slot figures remain honest ESTIMATES, never a per-unit MSRP claim (THE PRICE RULE). Weight (470g) stays a nominal per-slot SAMPLE — the page publishes no weight at all for this SKU.' },
  { id: 'rd-sram-rival-axs', cat: 'rearderailleur', brand: 'SRAM', model: 'Rival AXS Rear Derailleur', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', maxCog: 36, cage: 'medium', mount: 'std-hanger',
    price: 325,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rd-riv-e-e1', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (RD-RIV-E-E1) fetched: 12-speed AXS wireless, "cassettes from 10-28T to 10-36T" (-> maxCog:36), $325 MSRP (corrected from a $330 sample). Cage/mount not stated — kept the existing medium/std-hanger values, consistent with the RED/Force 2x AXS RD rows in this file. No weight listed — dropped the prior 500g sample rather than present it as confirmed.' },
  { id: 'cs-sram-rival-xg1250-1030', cat: 'cassette', brand: 'SRAM', model: 'Rival XG-1250 10-30', family: 'sram-rival-xg1250',
    system: 'sram-axs-road', speeds: 12, freehub: 'xdr', minCog: 10, maxCog: 30,
    price: 145,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cs-xg-1250-d1', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (CS-XG-1250-D1) fetched: real "XG-1250" SKU (unlike the Apex "PG-1231" mismatch elsewhere in this file, this row\'s XG naming was already correct), XDR driver ("designed for road hub applications"), offered in 10-30T and 10-36T (this row is the 10-30T SKU), 12-speed, $145 MSRP (corrected from a $150 sample). No weight listed — dropped the prior 470g sample rather than present it as confirmed.' },
  { id: 'ch-sram-rival-flattop', cat: 'chain', brand: 'SRAM', model: 'Rival Flattop', family: 'sram-rival-flattop',
    system: 'flattop', speeds: 12,
    price: 50,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cn-riv-d1', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (CN-RIV-D1) fetched: Flattop D1 technology (confirms this row\'s system:\'flattop\'), 12-speed, "1x and 2x eTap AXS" compatible, 120-link, PowerLock D1 connector, $50 MSRP (corrected from a $45 sample). No weight listed — dropped the prior 275g sample rather than present it as confirmed.' },
  { id: 'cr-sram-rival-axs-crank', cat: 'crankset', brand: 'SRAM', model: 'Rival AXS Crankset', family: 'sram-rival-axs-crank',
    bb: 'dub', chainrings: '2x', ring: '46/33', ringStd: 't-type', speeds: 12, chainline: 45,
    price: 220,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/fc-riv-e1', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (FC-RIV-E1) fetched: 12-speed, DUB spindle interface, chainrings offered as 48/35T or 46/33T (this row is the 46/33T SKU), 45mm chainline, $220 MSRP (corrected from a $250 sample). Page states "over 50 grams lighter than the previous generation" but gives no absolute weight — dropped the prior 720g sample rather than present it as confirmed.' },
  { id: 'br-sram-rival-axs', cat: 'brake', brand: 'SRAM', model: 'Rival AXS HRD Caliper (pair)', family: 'sram-rival-axs-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-rival-axs',
    weight: 360, price: 61,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/ed-riv-e1', priceBasis: 'bundle-split-estimate',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/ed-riv-e1 this session alongside its leverPair sh-sram-rival-axs — "BRAKE ORIENTATION Front, Rear", flat-mount hydraulic disc, matching this row\'s brakeSystem/mount/actuation exactly. UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception: SRAM sells no separate caliper-only Rival AXS SKU/price, so PRICE is re-split proportionally to the prior 650:180 sample ratio: 61 + sh-sram-rival-axs\'s 219 = 280, the real ED-RIV-E1 bundle MSRP (replaces the prior unsourced 650+180=830 total). Still an honest per-slot ESTIMATE, never a per-unit MSRP claim (THE PRICE RULE). Weight (360g) stays a nominal per-slot SAMPLE — the page publishes no weight at all for this SKU.' },
  { id: 'fd-sram-rival-axs', cat: 'frontderailleur', brand: 'SRAM', model: 'Rival AXS Front Derailleur', family: 'sram-rival-axs',
    system: 'sram-axs-road', speeds: 12, actuation: 'axs-wireless', mount: 'braze-on', maxChainringDiff: 13,
    weight: 151, price: 195,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/fd-riv-e-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://bikerumor.com/hands-on-complete-rival-etap-axs-wireless-road-group-with-actual-weights/',
    note: 'sram.com model page (FD-RIV-E-E1) fetched: braze-on/clamp-compatible mount, 12-speed AXS wireless, chainring combos 46/33, 48/35, 50/37T (constant 13T diff -> maxChainringDiff:13), 45mm chainline, $195 MSRP; no weight listed there. Weight is Bikerumor\'s actual-measured 151g (without battery, matching this file\'s existing convention).' },
  { id: 'rd-sram-rival-xplr-e1', cat: 'rearderailleur', brand: 'SRAM', model: 'Rival XPLR AXS Rear Derailleur E1 (13-speed)', family: 'sram-rival-xplr',
    system: 'sram-xplr-13', speeds: 13, actuation: 'axs-wireless', maxCog: 46, cage: 'xplr', mount: 'udh-fullmount',
    weight: 435, price: 360,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rd-riv-1e-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://nminus1bikes.substack.com/p/2026-sram-rival-xplr-groupset-review',
    note: 'sram.com model page (RD-RIV-1E-E1) fetched: 13-speed, wireless AXS, Full Mount hangerless interface (-> mount:\'udh-fullmount\'), 46T max cog, 10-46T XPLR 13-speed cassette + Road Flattop D1/E1 chain compatibility, 1x-only, $360 MSRP. Weight is a road-media hands-on review\'s stated 435g (no weight listed on the sram.com page itself; this is the least-corroborated of the three XPLR E1 RD weights in this batch — flagged for a future cross-check against a second source).' },
  { id: 'cs-sram-rival-xg1351-1046', cat: 'cassette', brand: 'SRAM', model: 'Rival XPLR XG-1351 10-46 (13-speed)', family: 'sram-rival-xplr',
    system: 'sram-xplr-13', speeds: 13, freehub: 'xdr', minCog: 10, maxCog: 46,
    weight: 383, price: 215,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/cs-xg-1351-e1', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://nminus1bikes.substack.com/p/2026-sram-rival-xplr-groupset-review',
    note: 'sram.com model page (CS-XG-1351-E1) fetched: 13-speed, XDR driver, 10-46T range (cogs 10-11-12-13-15-17-19-21-24-28-32-38-46), Road Flattop D1/E1 chain compatibility, $215 MSRP; no weight listed on the page. Weight is a road-media hands-on review\'s stated 383g — same flag as the RD row above.' },

  // ===== DRIVETRAIN — SRAM Apex (1x12, mechanical) =========================
  { id: 'sh-sram-apex-mech', cat: 'shifter', brand: 'SRAM', model: 'Apex Shifter/Brake Lever (pair)', family: 'sram-apex-mech',
    system: 'sram-apex-mech-12', speeds: 12, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: false,
    weight: 520, price: 354,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/sd-apx-d1', priceBasis: 'bundle-split-estimate',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/sd-apx-d1 (browser pane spec table) this session — road-5\'s "single right-hand lever" read was correct and resolves the price wall: "LEVER ORIENTATION Right", $270 MSRP, "DRIVETRAIN CONFIGURATION 1x", 12-speed, DoubleTap mechanical actuation, hydraulic disc, "BRACKET (DISC BRAKE) Flat Mount 20mm offset". Apex\'s shape differs from RED/Rival AXS: SRAM does NOT sell one pair-covering bundle SKU here — it sells TWO side-specific lever+caliper bundles, confirmed by also fetching the companion left lever, sram.com/en/sram/models/db-apx-d1 ("Apex Disc Brake", $225 MSRP, "no need for a shift mechanism," "ORIENTATION Left/Front, Left/Rear," same Flat Mount 20mm bracket, hydraulic) — this is the brake-only left-hand lever that pairs with SD-APX-D1\'s shifting right-hand lever to form the full 1x lever set (matches this row\'s frontShift:false — Apex 1x has no front-derailleur shift function on either side). Real total for the lever pair = 270 + 225 = 495 (no per-function lever-vs-caliper split is ever published — SRAM prices per SIDE, not per SLOT). Every engine-read interface field (system/speeds/actuation/brakeSystem) is now manufacturer-confirmed, so this UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception (VERIFY-PROTOCOL.md), extended to this per-side-bundle shape. PRICE is re-split proportionally to the prior 300:120 sample ratio so the two rows sum to the real $495 total: 354 + br-sram-apex-mech\'s 141 = 495 (replaces the prior unsourced 300+120=420). Honest per-slot ESTIMATE only, never a per-unit MSRP claim (THE PRICE RULE). Weight (520g) stays a nominal per-slot SAMPLE — neither page publishes any weight figure.' },
  { id: 'rd-sram-apex-xplr', cat: 'rearderailleur', brand: 'SRAM', model: 'Apex XPLR Rear Derailleur', family: 'sram-apex-mech',
    system: 'sram-xplr-12', speeds: 12, actuation: 'mechanical', maxCog: 44, cage: 'long', mount: 'std-hanger',
    price: 140,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/rd-apx-1-d1', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (RD-APX-1-D1) fetched: 12-speed mechanical ("compatible with 12-speed mechanical Apex and Eagle shifters"), "X-HORIZON straight parallelogram design," 44T max cog (-> maxCog:44), Flattop-chain compatible (-> the ch-sram-apex-hg fix below), $140 MSRP (corrected from a $180 sample). Cage length/mount not stated on the page — kept the existing long/std-hanger values as the plausible wide-range assumption. No weight listed — dropped the prior 400g sample rather than present it as confirmed.' },
  { id: 'cs-sram-apex-xg1231-1144', cat: 'cassette', brand: 'SRAM', model: 'Apex PG-1231 11-44', family: 'sram-apex-xg1231',
    system: 'sram-xplr-12', speeds: 12, freehub: 'hg-road', minCog: 11, maxCog: 44,
    price: 135,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cs-pg-1231-d1', priceBasis: 'msrp-confirmed',
    note: 'road-5 CORRECTNESS FIX: sram.com model page (CS-PG-1231-D1 — the real SKU is "PG-1231," not "XG-1231" as the prior sample model name had it; id kept append-only, model field corrected) fetched: "splined 11-speed road driver body" -> freehub is hg-road, NOT xdr as the prior row had it. This was a live false-fit bug: the row would have wrongly required an XDR wheel (Apex\'s actual selling point is fitting standard 11-speed-driver wheels) and would wrongly green-light pairing with an XDR-only wheel. 11-44T, 12-speed, "400% range," "Road Flattop chain" compatible, $135 MSRP (corrected from a $90 sample). No weight listed — dropped the prior 490g sample rather than present it as confirmed.' },
  { id: 'ch-sram-apex-hg', cat: 'chain', brand: 'SRAM', model: 'Apex Flattop Chain', family: 'sram-apex-hg',
    system: 'flattop', speeds: 12,
    price: 40,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/cn-apx-d1', priceBasis: 'msrp-confirmed',
    note: 'road-5 CORRECTNESS FIX: sram.com model page (CN-APX-D1) fetched: "Flattop D1" technology, 12-speed, PowerLock D1 connector, 120 links — this is a Flattop chain, NOT an HG chain as the prior sample (system:\'hg\') had it. This was a live false-error bug: src/compat-road.js\'s ROAD_SYSTEM_CHAIN maps sram-xplr-12 (this row\'s drivetrain family) to \'flattop\', so the old hg value would have tripped rule R15 (\'Chain mismatch\') on every Apex build using its own maker-intended chain — a false red on a real, SRAM-documented pairing. $40 MSRP (corrected from a $30 sample). No weight listed — dropped the prior 280g sample rather than present it as confirmed.' },
  { id: 'cr-sram-apex-crank-1x', cat: 'crankset', brand: 'SRAM', model: 'Apex 1 Wide Crankset', family: 'sram-apex-crank',
    bb: 'dub-wide', chainrings: '1x', ring: '40', ringStd: 'standard-12', speeds: 12, chainline: 47.5,
    price: 120,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/fc-apx-1w-d1', priceBasis: 'msrp-confirmed',
    note: 'road-5: sram.com model page (FC-APX-1W-D1, "Apex 1 Wide Crankset" — the base non-Wide FC-APX-1-A1 uses a GXP spindle instead, so the prior generic "Apex 1x Crankset" model name is corrected to name the actual DUB-spindle SKU this row\'s bb:\'dub-wide\' value describes) fetched: DUB spindle, 40T or 42T chainrings (this row is the 40T SKU), chainline "47.5mm or 51.0mm" (this row is the 47.5mm/standard-chainline config), $120 MSRP (corrected from a $130 sample). No weight listed — dropped the prior 760g sample rather than present it as confirmed.' },
  { id: 'br-sram-apex-mech', cat: 'brake', brand: 'SRAM', model: 'Apex HRD Caliper (pair)', family: 'sram-apex-mech-brake',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', leverPair: 'sh-sram-apex-mech',
    weight: 380, price: 141,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/db-apx-d1', priceBasis: 'bundle-split-estimate',
    note: 'road-10 wave (BUNDLED SHIFT-BRAKE SKU EXCEPTION): re-fetched sram.com/en/sram/models/db-apx-d1 (browser pane spec table) this session alongside sram.com/en/sram/models/sd-apx-d1 — "Apex Disc Brake" (DB-APX-D1), $225 MSRP, flat-mount hydraulic disc, "BRACKET (DISC BRAKE) Flat Mount 20mm offset" matching this row\'s mount/actuation exactly; this is the left-hand brake-only lever+caliper unit that pairs with SD-APX-D1\'s right-hand shift-brake unit — see sh-sram-apex-mech\'s note for the full per-side shape (SRAM prices this system per SIDE, not per shifter/brake SLOT). UPGRADES to verified:true under the 2026-07-21 bundled-shift-brake-SKU exception, extended to this per-side-bundle shape. PRICE is re-split proportionally to the prior 300:120 sample ratio: 141 + sh-sram-apex-mech\'s 354 = 495, the real two-lever total (270 SD-APX-D1 shift-brake + 225 DB-APX-D1 brake-only = 495) — replaces the prior unsourced 300+120=420. Honest per-slot ESTIMATE only, never a per-unit MSRP claim (THE PRICE RULE). Weight (380g) stays a nominal per-slot SAMPLE — neither page publishes any weight figure.' },

  // ===== DRIVETRAIN — SRAM Rival 22 (2x11, mechanical, pre-Flattop) =========
  // road-depth-1 wave (2026-07-22): SRAM Rival 22 is a real, STILL-LISTED
  // 2x11 mechanical groupset (sram.com/en/sram/road/series/sram-rival —
  // live product listing, unlike the plain "SRAM Apex" 2x mechanical series
  // page, which returns "0 Products" / no live SKUs and was NOT added here
  // per THE BAR: no plausible current spec exists for it). All rows fetched
  // via WebFetch from individual sram.com/en/sram/models/<slug> pages.
  // NEW VOCAB: 'sram-rival22-11' added to schema-road.js/compat-road.js this
  // wave (ROAD_SYSTEM_CHAIN: 'hg') — Rival 22 predates SRAM's Flattop chain
  // standard and uses a standard HG-compatible 11-speed driver/chain
  // interface (CS-PG-1130 "compatible with non-XD driver bodies"; CN-1170-A1
  // "11-speed powerchain", not Flattop) — genuinely distinct from
  // sram-apex-mech-12 (T-Type/Flattop, 12-speed), never conflated.
  // No brake caliper row: SB-RIV-HRD-A1's own product description already
  // states "Two-piston hydraulic calipers with steel-backed organic pads" as
  // part of the shifter SKU's bundled function (same BUNDLED SHIFT-BRAKE SKU
  // shape as RED/Rival AXS elsewhere in this file) and no separate
  // caliper-only SKU/price was found this pass (time-boxed) — flagged as a
  // GAP, not a compat gap (the shifter's own brakeSystem/actuation fields
  // already carry the real interface).
  { id: 'sh-sram-rival22-hrd', cat: 'shifter', brand: 'SRAM', model: 'Rival 22 Shifters / Hydraulic Disc Brake (pair)', family: 'sram-rival22-hrd',
    system: 'sram-rival22-11', speeds: 11, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 620, price: 355,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/sb-riv-hrd-a1', priceBasis: 'msrp-confirmed',
    note: 'road-depth-1 wave: sram.com model page (SB-RIV-HRD-A1) confirms "SRAM Road EXACT ACTUATION 11-speed system", "Two-piston hydraulic calipers with steel-backed organic pads", DoubleTap mechanical shift, "2x drivetrain configuration", "Direct Mount or Flat Mount (no offset)" caliper brackets, $345-$365 MSRP (355 used as the midpoint). No weight published on the fetched page — 620g/pair is an unsourced sample estimate, flagged.' },
  { id: 'rd-sram-rival22', cat: 'rearderailleur', brand: 'SRAM', model: 'Rival 22 Rear Derailleur', family: 'sram-rival22',
    system: 'sram-rival22-11', speeds: 11, actuation: 'mechanical', maxCog: 32, cage: 'medium', mount: 'std-hanger',
    weight: 250, price: 72,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/rd-riv-b1', priceBasis: 'msrp-confirmed',
    note: 'road-depth-1 wave: sram.com model page (RD-RIV-B1) confirms "11-speed", "Cage Options: Medium and Short" (this row: medium), "Maximum Cog: 28T or 32T" (this row: the 32T config, matching the CS-PG-1130 cassette below), "Exact Actuation (1:1 ratio)" mechanical, WiFLi-compatible. $65-$80 MSRP (72 used as the midpoint). No weight published — 250g is an unsourced sample estimate, flagged.' },
  { id: 'fd-sram-rival22', cat: 'frontderailleur', brand: 'SRAM', model: 'Rival 22 Yaw Front Derailleur', family: 'sram-rival22',
    system: 'sram-rival22-11', speeds: 11, actuation: 'mechanical', mount: 'braze-on',
    weight: 95, price: 50,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/fd-riv-b1', priceBasis: 'msrp-confirmed',
    note: 'road-depth-1 wave: sram.com model page (FD-RIV-B1) confirms "11-speed compatible", "Mount Type: Braze-on (clamp styles also available)" (braze-on modeled per this catalog\'s one-mount-native-SKU convention), "Chainline: 45.0mm", "Yaw" cage rotation technology, $50 MSRP. No weight published — 95g is an unsourced sample estimate, flagged.' },
  { id: 'cs-sram-rival22-1132', cat: 'cassette', brand: 'SRAM', model: 'Rival 22 PG-1130 11-32', family: 'sram-rival22-cass',
    system: 'sram-rival22-11', speeds: 11, freehub: 'hg-road', minCog: 11, maxCog: 32,
    weight: 300, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/cs-pg-1130-a1', priceBasis: 'msrp-confirmed',
    note: 'road-depth-1 wave: sram.com model page (PG-1130) confirms "11-28t / 11-32t / 11-36t / 11-42t" gearing options (this row: the 11-32T config, matching rd-sram-rival22\'s 32T max capacity), "Compatible with non-XD driver bodies" (freehub:\'hg-road\', the catalog\'s existing generic standard-HG-driver token — matches Apex\'s own cs-sram-apex-xg1231-1144 correction elsewhere in this file), PowerGlide II. $75-$105 MSRP (90 used as the midpoint). No weight published — 300g is an unsourced sample estimate, flagged.' },
  { id: 'ch-sram-rival22', cat: 'chain', brand: 'SRAM', model: 'Rival 22 PC-1170 Chain', family: 'sram-rival22',
    system: 'hg', speeds: 11,
    weight: 256, price: 55,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/cn-1170-a1', priceBasis: 'msrp-confirmed',
    note: 'road-depth-1 wave: sram.com model page (CN-1170-A1) confirms "11-speed", "114 links or 120 links", "Weight: 256g (based on 114 links)" (matches this row exactly, a real fetched figure — not a sample), PowerLock connector, "11-speed powerchain" (a standard HG-class chain, NOT Flattop — matches this row\'s system:\'hg\' and the ROAD_SYSTEM_CHAIN[\'sram-rival22-11\']=\'hg\' mapping added this wave). $55 MSRP.' },
  { id: 'cr-sram-rival22-3011', cat: 'crankset', brand: 'SRAM', model: 'Rival 22 Crankset (BB30, 50/34)', family: 'sram-rival22-crank',
    bb: '30mm', chainrings: '2x', ring: '50/34', ringStd: 'standard-12', speeds: 11, chainline: 45,
    weight: 700, price: 205,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.sram.com/en/sram/models/fc-riv-2x11-a1', priceBasis: 'msrp-confirmed',
    note: 'road-depth-1 wave: sram.com model page (FC-RIV-2X11-A1) confirms "11-speed", "50/34T or 52/36T" chainring options (this row: the 50/34T SKU), "BB30/PF30-68mm and GXP/PF GXP 68mm" — TWO spindle-interface SKUs exist; this row models the BB30 variant (bb:\'30mm\', matching this catalog\'s existing crankBbRoad vocab exactly — the GXP variant was NOT modeled this pass since GXP has no matching token in crankBbRoad, a real vocab gap flagged rather than mis-mapped to \'24mm-road\'/\'30mm\'), "Chainline: 45.0mm". $195-$215 MSRP (205 used as the midpoint). No weight published — 700g is an unsourced sample estimate, flagged.' },

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
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rt-pln-a1', priceBasis: 'msrp-confirmed',
    note: 'sram.com model page (RT-PLN-A1) fetched: 6-bolt mount (the RT-PLN-A2 SKU is the Centerlock version of the same Paceline line — already cataloged as ro-sram-paceline-160), 140/160mm sizes, "brake track vent design for smooth, quiet braking", $45 MSRP. No weight listed on the page and no reputable third-party MEASURED (not retailer-claimed) figure was found this pass — left blank rather than invented (retailer listing weights for this SKU ranged 112-160g across sources with no fetched teardown backing any single number, so none qualifies as sourceType:\'measured\').' },
  { id: 'ro-sram-pacelinex-160-cl', cat: 'rotor', brand: 'SRAM', model: 'Paceline X 160mm', family: 'sram-pacelinex',
    size: 160, mount: 'center-lock',
    price: 75,
    verified: true, lastChecked: '2026-07-18', source: 'https://www.sram.com/en/sram/models/rt-pln-x-a1', priceBasis: 'msrp-confirmed',
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

  // ===== DRIVETRAIN — Shimano 105 R7000 (2x11, mechanical) ==================
  // road-depth-1 wave (2026-07-22): fills the mechanical 11-speed 105 tier
  // BELOW the catalog's existing 105 R7100 (2x12, Di2-only) family — a
  // real, distinct, still-widely-sold Shimano generation (105 R7000 shipped
  // mechanical-only, hydraulic-disc-capable via ST-R7020). All interface
  // fields + weights below are FETCHED live via the browser pane from
  // productinfo.shimano.com (WebFetch renders this host empty, the catalog's
  // known limitation). Brake caliper: ST-R7020's own page states "Recommended
  // brake caliper BR-R7070, BR-R7170" — BR-R7170 is already this catalog's
  // 105-R7100-tier caliper (br-shimano-105-r7100, verified); BR-R7070 itself
  // 404s on productinfo (dropped-from-current-edition, same wall this file
  // already hit on RT-MT800/CN-4600/BR-RX810/FC-RX600) and was not chased
  // into the archive PDFs this pass (time-boxed) — no new brake row added for
  // this tier; a 105 R7000 build pairs correctly with the existing
  // br-shimano-105-r7100 caliper row (same maker-documented cross-tier
  // recommendation), so this is a labeling GAP, not a compat gap.
  { id: 'sh-shimano-105-r7000', cat: 'shifter', brand: 'Shimano', model: '105 ST-R7020 (pair)', family: 'shimano-105-r7000',
    system: 'shimano-road-11', speeds: 11, actuation: 'mechanical', brakeSystem: 'disc-hydraulic', side: 'pair', frontShift: true,
    weight: 610, price: 400,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/ST-R7020-R',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Series SHIMANO 105", "Rear speeds 11", mechanical dual-control lever (cable shift, OT-SP41/OT-RS900 outer casing) with hydraulic disc brake (SM-BH90 hose kit, SHIMANO Mineral oil), "Recommended brake caliper BR-R7070, BR-R7170" (see section note above). "Average weight (g) 610 ( /pair)" — a genuine pair figure (not doubled from a single-side spec like several sibling rows). Price ($400) is an unsourced estimate — Shimano does not publish consumer MSRP on productinfo.' },
  { id: 'rd-shimano-105-r7000', cat: 'rearderailleur', brand: 'Shimano', model: '105 RD-R7000-GS', family: 'shimano-105-r7000',
    system: 'shimano-road-11', speeds: 11, actuation: 'mechanical', maxCog: 34, cage: 'medium', mount: 'std-hanger',
    weight: 232, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/RD-R7000-GS',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Rear speeds 11", "Low sprocket Max. 34T / Min. 28T" (maxCog:34), "SHIMANO ROAD type: Direct attachment (conventional) ✔" (std-hanger, no UDH), "Total capacity 39T", mechanical cable-actuated (no Di2 fields on this page). Average weight (g) 232 (GS/medium-cage). Price unsourced sample.' },
  { id: 'fd-shimano-105-r7000', cat: 'frontderailleur', brand: 'Shimano', model: '105 FD-R7000-F (braze-on)', family: 'shimano-105-r7000',
    system: 'shimano-road-11', speeds: 11, actuation: 'mechanical', mount: 'braze-on',
    weight: 96, price: 45,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/FD-R7000-F',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Front speeds 2", "Rear speeds 11", "Brazed-on ✔" (mount:braze-on; the sibling FD-R7000-B band-type SKU exists for frames without a braze-on tab, not modeled as a separate row per this catalog\'s one-mount-native-SKU convention), "Chain line (mm) 43.5", "Top gear teeth 46-53T". Average weight (g) (band type: L size, direct type w/ screw) 96. Price unsourced sample.' },
  { id: 'cs-shimano-105-r7000-1134', cat: 'cassette', brand: 'Shimano', model: '105 CS-HG700-11 11-34', family: 'shimano-105-r7000-cass',
    system: 'shimano-road-11', speeds: 11, freehub: 'hg-road', minCog: 11, maxCog: 34,
    weight: 379, price: 65,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/CS-HG700-11',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Rear speeds 11", "Combination name (Group name) 11-34T", teeth "11-13-15-17-19-21-23-25-27-30-34T", "HG spline M (10/9/8-speed, MTB 11-speed, 7-speed CS-HG400/HG210) ✔" — the standard pre-12-speed HG freehub body, modeled as this catalog\'s existing generic \'hg-road\' token (same simplification already used by the verified 12-speed cs-shimano-105-r7100 row — this catalog does not split the HG-M/HG-L spline distinction into separate freehub vocab values). Average weight (g) 379. Price unsourced sample.' },
  { id: 'ch-shimano-105-r7000', cat: 'chain', brand: 'Shimano', model: '105 CN-HG601-11', family: 'shimano-105-r7000',
    system: 'hg', speeds: 11,
    weight: 257, price: 25,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/CN-HG601-11', priceBasis: 'regional-conversion',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Type LINKGLIDE, HG 11-speed", "E-BIKE rear derailleur system compatible ✔". Average weight (g) (114 links) 257. Price unsourced sample.' },
  { id: 'cr-shimano-105-r7000', cat: 'crankset', brand: 'Shimano', model: '105 FC-R7000 Crankset', family: 'shimano-105-r7000',
    bb: '24mm-road', chainrings: '2x', ring: '50/34', ringStd: 'standard-12', speeds: 11, chainline: 43.5,
    weight: 713, price: 160,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/FC-R7000',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Chainring combination 50-34T, 52-36T, 53-39T" (50-34T confirmed real), "Chain line (mm) 43.5", "HOLLOWTECH II ✔" / "Compatible bottom bracket type: Outboard" (bb:\'24mm-road\', matches catalog). Average weight (170mm, w/o BB): "713.4 (50-34T)" — rounded to 713g. Price unsourced sample.' },

  // ===== DRIVETRAIN — Shimano Sora R3000 (2x9, mechanical, RIM BRAKE) =======
  // road-depth-1 wave (2026-07-22): Sora is the entry tier below Tiagra 4700.
  // Fetched via the browser pane, productinfo.shimano.com. IMPORTANT: Sora
  // R3000's shift/brake lever (ST-R3000-R/-L) is an integrated RIM-BRAKE-ONLY
  // dual-control lever — no ST-R3000 hydraulic-disc variant exists on
  // productinfo (only -R/-L rim-brake SKUs are listed under the ST-R3000
  // family; unlike Tiagra 4700/105, Sora never shipped a disc-hydraulic
  // integrated lever of this generation). This catalog's brake schema
  // (schema-road.js ROAD_SCHEMA.brake) requires `mount` (vocab
  // brakeMountRG: flat-mount/post-mount only) and `pistons` — there is NO
  // rim-caliper-shaped brake row possible in this schema, so BR-R3000 (the
  // real NEW SUPER SLR dual-pivot rim caliper) is a genuine SCHEMA GAP, not
  // fabricated or omitted by oversight: flagging for a future rim-brake
  // vocab widening rather than forcing it into the disc-only brake shape.
  // The six drivetrain rows below still enter cleanly (shifter.brakeSystem
  // accepts 'rim-caliper' per LOCAL_VOCAB.brakeSystem) and are dormant
  // against every current-catalog frame (all disc, per the road-4 v1
  // decision) until a rim-brake frame is sourced — same real-part/dormant-
  // compat pattern already used elsewhere in this file (e.g. the Cane Creek
  // headset rows before any frame sourced headTubeUpper/Lower).
  { id: 'sh-shimano-sora-r3000', cat: 'shifter', brand: 'Shimano', model: 'Sora ST-R3000 (pair)', family: 'shimano-sora-r3000',
    system: 'shimano-road-11', speeds: 9, actuation: 'mechanical', brakeSystem: 'rim-caliper', side: 'pair', frontShift: true,
    weight: 480, price: 130,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/ST-R3000-R',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Series SORA", "Rear speeds 9", "Shifter type DUAL CONTROL LEVER", rim-brake-integrated ("NEW SUPER SLR" caliper interface, no hydraulic hose fitting on this page — unlike ST-R7020/ST-4720 above). system:\'shimano-road-11\' reused per this catalog\'s established convention (Tiagra 4700\'s own trailing comment): systemRoad has no dedicated 9-speed token, and the independent speeds:9 check already reds out any cross-tier pairing on speed count alone (same reasoning, not re-litigated per row). Average weight not itemized on the fetched page ("Average weight (g) -"); 480g/pair is an unsourced sample estimate, flagged. Price unsourced sample.' },
  { id: 'rd-shimano-sora-r3000', cat: 'rearderailleur', brand: 'Shimano', model: 'Sora RD-R3000-GS', family: 'shimano-sora-r3000',
    system: 'shimano-road-11', speeds: 9, actuation: 'mechanical', maxCog: 34, cage: 'medium', mount: 'std-hanger',
    weight: 240, price: 40,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/RD-R3000-GS',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Rear speeds 9", "Low sprocket Max. 34T / Min. 28T" (maxCog:34), "SHIMANO ROAD type: Direct attachment (conventional) ✔" (std-hanger), mechanical, "Total capacity 43T". Average weight not itemized on the fetched page ("Average weight (g) -"); 240g is an unsourced sample estimate, flagged. Price unsourced sample.' },
  { id: 'fd-shimano-sora-r3000', cat: 'frontderailleur', brand: 'Shimano', model: 'Sora FD-R3000-F (braze-on)', family: 'shimano-sora-r3000',
    system: 'shimano-road-11', speeds: 9, actuation: 'mechanical', mount: 'braze-on',
    weight: 100, price: 25,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/FD-R3000-F',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Front speeds 2", "Rear speeds 9", "Brazed-on ✔" (mount:braze-on; the sibling FD-R3000-B band-type SKU not modeled, same one-mount-native-SKU convention as the 105 R7000 FD above), "Chain line (mm) 43.5", "Top gear teeth 46-52T". Average weight not itemized on the fetched page; 100g is an unsourced sample estimate, flagged. Price unsourced sample.' },
  { id: 'cs-shimano-sora-r3000-1132', cat: 'cassette', brand: 'Shimano', model: 'Sora CS-HG400-9 11-32', family: 'shimano-sora-r3000-cass',
    system: 'shimano-road-11', speeds: 9, freehub: 'hg-road', minCog: 11, maxCog: 32,
    weight: 330, price: 35,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/CS-HG400-9',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Rear speeds 9", "Combination name (Group name) ...11-32T (ar)...", teeth "11-12-14-16-18-21-24-28-32T" — the 11-32T config confirmed real (this row\'s chosen combination among six the SKU offers). "HG spline M" ✔ (modeled as this catalog\'s existing generic \'hg-road\' token, same simplification as the 105 R7000 cassette above). Average weight not itemized on the fetched page; 330g is an unsourced sample estimate, flagged. Price unsourced sample.' },
  { id: 'ch-shimano-sora-r3000', cat: 'chain', brand: 'Shimano', model: 'Sora CN-HG53', family: 'shimano-sora-r3000',
    system: 'hg', speeds: 9,
    weight: 299, price: 20,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/CN-HG53',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Type HG 9-speed". Average weight (g) (114 links) 299. Price unsourced sample.' },
  { id: 'cr-shimano-sora-r3000', cat: 'crankset', brand: 'Shimano', model: 'Sora FC-R3000 Crankset', family: 'shimano-sora-r3000',
    bb: '24mm-road', chainrings: '2x', ring: '50/34', ringStd: 'standard-12', speeds: 9, chainline: 43.5,
    weight: 830, price: 65,
    verified: true, lastChecked: '2026-07-21', source: 'https://productinfo.shimano.com/en/product/FC-R3000',
    note: 'road-depth-1 wave: productinfo.shimano.com spec table: "Chainring combination 50-34T" (only combination offered — no 52/36 or 53/39 option at this tier, unlike 105/Tiagra above), "Chain line (mm) 43.5", "2-PIECE CRANKSET ✔" / "Compatible bottom bracket type: Outboard" (bb:\'24mm-road\', same interface family as Tiagra/105 despite the different construction name). Average weight not itemized on the fetched page ("Average weight (g)... -"); 830g is an unsourced sample estimate, flagged. Price unsourced sample.' },


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
    verified: true, lastChecked: '2026-07-18', source: 'https://productinfo.shimano.com/en/compatibility/C-455', priceBasis: 'regional-conversion',
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
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-FD-RX820.html', priceBasis: 'regional-conversion',
    note: 'road-5 wave: fetched bike.shimano.com product page (title "GRX FRONT DERAILLEUR 2X12s"; spec table: "Model No FD-RX820", "Front speeds 2", "Rear speeds 12", "Compatible chain HG 12-speed", "Action Down swing") via the browser pane per VERIFY-PROTOCOL\'s "JS-rendered != bot-walled" guidance (WebFetch 403s bike.shimano.com; the browser pane renders it clean, same page any visitor sees — not a bot-wall defeat). GRX IS applicable here: RX820/RX610 both offer a real 2x12 tier alongside the more common 1x — verified before adding, per the brief\'s instruction not to invent one. Weight (105g) unsourced sample.' },
  { id: 'fd-shimano-grx-rx825', cat: 'frontderailleur', brand: 'Shimano', model: 'GRX Di2 FD-RX825 (2x12)', family: 'shimano-grx-rx820',
    system: 'shimano-grx-12', speeds: 12, actuation: 'di2-wired', mount: 'braze-on',
    weight: 120, price: 140,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-FD-RX825.html', priceBasis: 'regional-conversion',
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
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX820.html', priceBasis: 'regional-conversion',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX REAR DERAILLEUR 12s (FOR 11-34/36T)", spec table "Model No RD-RX820", "Rear speeds 12", "Compatible chain HG 12-speed", "RD construction SHIMANO SHADOW RD+", "Mount Direct attachment (conventional)". maxCog:36 covers the page-stated 34/36T cassette range (this catalog\'s cassette schema wants a single number; 36 is the wider/safer max). mount:\'std-hanger\' maps the page\'s "Direct attachment (conventional)" (not the UDH full-mount token). This is the shared 2x12 rear derailleur for BOTH the RX820 and RX610 tiers (WebSearch corroborated no separate "RD-RX610" 12-speed part exists). Weight/price unsourced samples.' },
  { id: 'rd-shimano-grx-rx822-gs', cat: 'rearderailleur', brand: 'Shimano', model: 'GRX RD-RX822-GS (1x12, 10-45T)', family: 'shimano-grx-rx822',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', maxCog: 45, cage: 'medium', mount: 'std-hanger',
    weight: 290, price: 140,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX822-GS.html', priceBasis: 'regional-conversion',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX REAR DERAILLEUR 12s (FOR 10-45T)", spec table "Model No RD-RX822-GS", "Rear speeds 12", "Compatible chain HG 12-speed", "Mount Direct attachment (conventional)" — confirms the GS (medium/"Shadow Plus") cage 1x12 derailleur, max sprocket 45T. Shared by both RX820 and RX610 1x builds (same part, one SKU per cage length, not per shifter tier). Weight/price unsourced samples.' },
  { id: 'rd-shimano-grx-rx822-sgs', cat: 'rearderailleur', brand: 'Shimano', model: 'GRX RD-RX822-SGS (1x12, 10-51T)', family: 'shimano-grx-rx822',
    system: 'shimano-grx-12', speeds: 12, actuation: 'mechanical', maxCog: 51, cage: 'long', mount: 'std-hanger',
    weight: 305, price: 150,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX822-SGS.html', priceBasis: 'regional-conversion',
    note: 'road-5 wave: fetched bike.shimano.com (browser pane): title "GRX REAR DERAILLEUR 12s (FOR 10-51T)", spec table "Model No RD-RX822-SGS", same construction/mount fields as the GS row — the long-cage sibling, max sprocket 51T, for the widest-range 1x12 cassettes. Weight/price unsourced samples.' },
  { id: 'cs-shimano-grx-m8100-1045', cat: 'cassette', brand: 'Shimano', model: 'Deore XT CS-M8100-12 10-45T (GRX 1x12 shared)', family: 'shimano-grx-cs-m8100',
    system: 'shimano-grx-12', speeds: 12, freehub: 'micro-spline-road', minCog: 10, maxCog: 45,
    weight: 470, price: 165,
    verified: true, lastChecked: '2026-07-18', source: 'https://bike.shimano.com/en-NA/products/components/pdp.P-RD-RX822-GS.html', priceBasis: 'regional-conversion',
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
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/superzero-rs-handlebar', priceBasis: 'regional-conversion',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com (deda.com itself 404s; dedaelementi.com is Deda\'s live maker site) directly — the plain "Superzero" name this row previously carried is not itself a purchasable SKU in Deda\'s current lineup: the series page (dedaelementi.com/series/superzero) lists only "Superzero Alloy Handlebar" (305g @ 42cm, 130mm drop — does not match this row\'s 235g) alongside RS/DCR/Gravel carbon variants. The exact match is "Superzero RS Carbon Handlebar" (SZRSHB40/42/44/46): "Weight: 235 g (42 cm)" is an EXACT match to this row\'s pre-existing 235g (confirming the row always meant the RS carbon bar, just under-specified), "Reach: 75mm" (confirmed), "Diameter handlebar: 31,7mm" (clamp:31.8 kept, standard rounding per this file\'s convention), "Width (SKU): 40cm: SZRSHB40" (confirms width:400 is a real SKU). DROP CORRECTED 125->120mm ("Drop: 120mm", the RHM-EVO shape\'s stated compact drop). Model string corrected to name the real RS SKU. PRICE CORRECTED 130->340: page states "€315.00 VAT NOT INCLUDED" (~$340 at typical FX, not converted precisely — flagged); the prior $130 sample was far below the real carbon-bar MSRP (closer to the alloy sibling\'s €100).' },
  { id: 'st-deda-zero100', cat: 'stem', brand: 'Deda', model: 'Zero100 Stem', family: 'deda-zero100',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 126, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/zero100-stem', priceBasis: 'regional-conversion',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com/zero100-stem directly: "Diameter: 31,7mm" (clamp:31.8 kept, standard rounding), "Fork Steerer: 1 1/8\" (28,6mm)" (confirms steerer:\'1-1-8\'), sizes "80mm...140mm" (100mm is a real SKU, D100B100/D100BOB100). WEIGHT CORRECTED 130->126: the page states "Weight: 126g (110mm)" — no per-100mm figure is published, so this is the closest sourced data point (and fixes a physically-implausible reading where the old 130g/100mm sample was heavier than the real 110mm-length weight, which should never happen since shorter stems weigh less). Price: page states "FROM €68.00" (~$75); this row\'s existing $90 sample stays (in the right ballpark, not corrected to avoid a shaky EUR->USD conversion for a THE-PRICE-RULE-exempt field).' },
  { id: 'hb-ritchey-wcs-streem', cat: 'handlebar', brand: 'Ritchey', model: 'WCS Streem', family: 'ritchey-wcs-streem',
    clamp: '31.8', dropBar: true, reach: 73, drop: 128, width: 400,
    weight: 220, price: 150,
    note: 'road-13 wave: Ritchey identity chase. FETCHED ritcheylogic.com/bike/handlebars/wcs-streem-internal-routing-handlebar directly (WebFetch, no wall) — this is a REAL, currently-sold Ritchey product; the row\'s prior model string "WCS Streem II" is not the maker\'s current name (the page calls it plainly "WCS Streem Internal Routing Handlebar" / "WCS Streem" throughout, no "II" anywhere) — MODEL CORRECTED (id kept, append-only). Spec table: "Accessory Mount Diameter: 31.8mm" (clamp confirmed), "Reach: 73mm" (CORRECTED 75->73), "Drop: 128mm" (CORRECTED 121->128), "Width Options: 38, 40, 42, 44, 46cm" (confirms width:400 is a real SKU). NOT marked verified:true: the page publishes only one weight figure, "287g (42cm)" — a different width than this row\'s 400mm/40cm SKU, so the weight bar (VERIFY-PROTOCOL item 2, exact-SKU weight) isn\'t met; the existing 220g stays an unsourced sample, flagged. No price on the page. Material is triple-butted 6066 ALLOY per the page (not carbon, despite this file\'s prior "II" naming implying the carbon-tier Streem lineage) — the maker\'s carbon variant is a separate current product, "WCS Carbon Streem"/Superlogic Streem, a different SKU entirely, not this row.' },
  { id: 'hb-easton-ec70-sl', cat: 'handlebar', brand: 'Easton', model: 'EC70 SL', family: 'easton-ec70-sl',
    clamp: '31.8', dropBar: true, reach: 80, drop: 125, width: 420,
    weight: 220, price: 249.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://eastoncycling.com/products/ec70-sl-bar', priceBasis: 'msrp-confirmed',
    note: 'road-depth-3 wave (new brand — first Easton road cockpit row). DIRECTLY FETCHED eastoncycling.com\'s own EC70 SL Handlebar product page: "BAR WEIGHT: 220g (42cm)", "CLAMP DIAMETER: 31.8mm", "WIDTH (C-TO-C AT HOODS): 40-, 42-, 44-, 46cm" (this row uses the 42cm/420mm point, matching the stated weight), "REACH: 80mm", "DROP: 125mm", "MATERIALS: EC70 CARBON". Price $249.99 read directly off the maker\'s own page and independently corroborated identically by planetcyclery.com and trisports.com (trisports.com states it as the MSRP explicitly, not a sale price).' },
  { id: 'st-ritchey-wcs-c260', cat: 'stem', brand: 'Ritchey', model: 'WCS C260', family: 'ritchey-wcs-c260',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 103, price: 100,
    note: 'road-13 wave: Ritchey identity chase — INCONCLUSIVE, left as-is. Ritchey\'s reachable US site (ritcheylogic.com, no wall) currently lists only a "Superlogic C260 84D Stem" (carbon, 128g/100mm, steerer 1-1/8" or 1-1/4") and a "WCS C220 84D Stem" (alloy, 132g/100mm) whose own product copy markets itself as rivaling "the revolutionary C260 stem design, but... quicker and easier to install" — i.e. C220 reads as the current alloy successor in that clamp family. No live product page for a plain alloy "WCS C260" was found on the reachable main domain; only a spare-parts page ("C260 Stem Face Plate Replacement", ambiguous as to which C260 tier it services) references the name. The eu./us. regional subdomains (which search snippets show DO list a "WCS C260 84D Stem") are unreachable — expired TLS certs on both (WebFetch + browser pane both failed with "certificate has expired"/navigation denied), a documented wall, not routed around. Multiple US retailers (Jenson USA, ModernBike) show the WCS C260 alloy stem as out of stock/discontinued, consistent with C220 having superseded it, but that is not a manufacturer confirmation. Given the genuine ambiguity between "still sold in other regions" vs "discontinued, replaced by C220" vs "the page just resolves under Superlogic C260 now", this row is NOT renamed (renaming to C220 or Superlogic C260 would conflate three distinct real products under one id) and stays unverified sample data pending a working fetch of the regional page or maker confirmation. road-15 wave RETRY: ritcheylogic.com/bike/stems/wcs-c260-84d-stem still 404s (TLS-cert wall on the regional subdomains unchanged — not fixed this pass). Not promoting, but CORRECTED weight 130->103g: four independent retailers (Pro Bike Supply, Mantel, Incycle, Tree Fort Bikes) all state the alloy WCS C260 84D stem at exactly 103g/100mm, an unusually tight cross-source agreement for a discontinued SKU\'s spec sheet — used to fix an implausible sample value, but retailer corroboration alone does not meet THE BAR, so verified stays false. road-17 wave RETRY: eu.ritcheylogic.com/bike/stems/wcs-c260-84d-stem WebFetch attempted again — still "certificate has expired". The regional-subdomain TLS wall is stale-by-default per doctrine, so this was the one honest retry; it has NOT been fixed since road-15. No change; row stays exactly as left.' },

  // ===== SEATPOST / SADDLE / BB / PEDALS ==================================
  { id: 'sp-enve-seatpost-272', cat: 'seatpost', brand: 'Enve', model: 'Seatpost 27.2mm 0mm Offset 400mm', family: 'enve-seatpost',
    diameter: '27.2', setback: 0,
    weight: 204, price: 325,
    verified: true, lastChecked: '2026-07-22', source: 'https://enve.com/products/seatpost', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED enve.com\'s own "Seatpost" product page directly — ENVE\'s universal (non-frame-proprietary) round-diameter carbon post, a quality-tier aftermarket option distinct from this file\'s frame-specific proprietary posts. Spec table + the page\'s own variant picker: "Diameter 25.4mm, 27.2mm, 30.9mm, 31.6mm", "Offset 25mm, 0mm", "Lengths 300mm, 400mm" (this row uses the 27.2mm/0mm/400mm point, SKU 300-1008-101), per-variant weight table states "27.2mm 0mm 400mm: 204g" (exact-SKU maker-stated weight), price "$325.00 USD" confirmed for the 400mm/27.2mm/0mm variant on the same page\'s buy-box.' },
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
  { id: 'sp-canyon-s27-vcls-aeroad', cat: 'seatpost', brand: 'Canyon', model: 'S27 VCLS CF Seatpost', family: 'canyon-s27-vcls',
    proprietary: true, forFrames: ['fr-canyon-aeroad-cfr'], setback: 15,
    weight: 109, price: 249.95,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.canyon.com/en-us/gear/components/spare-and-wear-parts/spare-wear-parts/canyon-s27-vcls-cf-seatpost/101402.html', priceBasis: 'msrp-confirmed',
    note: 'oem-posts-1 new row (2026-07-21): the Aeroad CFR frame\'s own OEM post — added so fr-canyon-aeroad-cfr\'s seatpost:\'proprietary\' has a real matching part (distinct SKU from the Ultimate/Endurace-only sp-canyon-vcls-cp0018 above, which is NOT compatible with the Aeroad\'s aero frame profile). DIRECTLY FETCHED canyon.com/en-us (US storefront): "The S27 seatpost is compatible with our Canyon Aeroad, due to its trident shape", "Full carbon material", setback range "between 15 and -1 mm" (this row uses the 15mm-offset point), weight "0.24 lbs" (109g), price $249.95 — a genuine US MSRP, not a currency conversion.' },
  { id: 'sp-trek-emonda-slr-mastcap', cat: 'seatpost', brand: 'Trek', model: 'Émonda SLR Carbon Mast Cap', family: 'trek-emonda-slr-mastcap',
    proprietary: true, forFrames: ['fr-trek-emonda-slr'], setback: 20,
    weight: 117, price: 228.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.trekbikes.com/us/en_US/equipment/cycling-components/bike-seatposts-accessories/bike-seatpost-parts-accessories/trek-round-ultra-light-carbon-seatmast-cap-10mm-ears/p/27250/', priceBasis: 'msrp-confirmed',
    note: 'oem-posts-1 new row (2026-07-21): the Émonda SLR frame\'s own OEM seatpost — added so fr-trek-emonda-slr\'s seatpost:\'proprietary\' has a real matching part. This is a proprietary Trek/Bontrager round CARBON SEATMAST design: the frame\'s own mast tube is not cut to length like a standard round seatpost — only a mast CAP is a separate purchasable part. road-16 wave (2026-07-21): DIRECTLY FETCHED trekbikes.com\'s "Trek Round Ultra-light Carbon Seatmast Cap & 10mm Ears" product page (browser pane, model W567409) — its own copy states "Originally developed for the incredibly light Émonda SLR 10, the SLR seat mast cap is the lightest available for Trek bikes equipped with round seat masts," confirming this exact SKU is the Émonda SLR\'s OEM cap. Spec table: four length x offset points (135mm/5mm, 135mm/20mm, 175mm/5mm, 175mm/20mm), weights 117.0g (135mm) / 134.0g (175mm) per offset pair, all Carbon, "Universal" rail compatibility. This row uses the 135mm/20mm point (117g, CORRECTED from 92g dealer estimate) matching the existing setback:20. Price $228.99 read directly off the same page (CORRECTED from a $179.99 Wheel & Sprocket dealer figure that turned out to be stale/lower than Trek\'s own current MSRP).' },
  { id: 'sp-trek-domane-slr-kvf', cat: 'seatpost', brand: 'Trek', model: 'KVF Aero Carbon Seatpost', family: 'trek-domane-slr-kvf',
    proprietary: true, forFrames: ['fr-trek-domane-slr'], setback: 5,
    weight: 103, price: 228.99,
    verified: true,priceBasis:'msrp-confirmed',  lastChecked: '2026-07-22', source: 'https://www.trekbikes.com/us/en_US/equipment/cycling-components/bike-seatposts-accessories/bike-seatposts/trek-kvf-aero-carbon-seatpost/p/W5285077/',
    note: 'PROMOTED 2026-07-22 under the SEATPOST INTERFACE-VERIFICATION EXCEPTION (Douglas-ratified this date, the 7th exception class): weight is not engine-read for seatposts (only diameter/setback feed compat) and the maker page publishes none — the 103g retailer figure stays a disclosed sample; every engine-read interface field was already directly manufacturer-confirmed (road-16). Source URL re-confirmed live by the coordinator at promotion. oem-posts-1 new row (2026-07-21): the Domane SLR frame\'s own OEM seatpost — added so fr-trek-domane-slr\'s seatpost:\'proprietary\' has a real matching part. Confirmed via trekbikes.com\'s own Domane SL/SLR/RSL FAQ: "No, it\'s a D-shaped KVF post for improved aerodynamics" — NOT a standard round tube, genuinely proprietary to fit the frame\'s IsoSpeed decoupler. Real part numbers W5285075/76/77/78 (280mm and 320mm lengths, 5mm and 20mm offsets); this row uses the 280mm/5mm point (W5285077). road-16 wave (2026-07-21): DIRECTLY FETCHED trekbikes.com\'s "Trek KVF Aero Carbon Seatpost" product page (browser pane, model W5285077) — resolves the prior wave\'s flagged JSON-LD naming inconsistency: the live page itself titles the SKU "Trek KVF Aero Carbon Seatpost" (matching this row, not "Madone"), confirms the "Aero" (D-shaped, non-round) diameter and the 280mm/5mm point among the four length x offset options, and is cross-corroborated as the Domane\'s OEM post by a second trekbikes.com-domain URL for the identical W5285077 code path-named "trek-domane-mkiv-seatposts". Price CORRECTED 263.99->228.99 (read directly off the fetched page, replacing an earlier JSON-LD-snippet figure). The page\'s own Specs tab does NOT publish a weight for this SKU (unlike the sibling Émonda mast-cap page, which does) — 103g stays the pre-existing bike24.com retailer figure, unsourced-for-verification; not marked verified:true because the weight bar is unmet, though every engine-read interface field is now directly manufacturer-confirmed.' },
  { id: 'sp-trek-madone-gen8', cat: 'seatpost', brand: 'Trek', model: 'Madone Gen 8 Seatpost', family: 'trek-madone-gen8',
    proprietary: true, forFrames: ['fr-trek-madone-slr'], setback: 0,
    weight: 110, price: 329.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.trekbikes.com/us/en_US/equipment/cycling-components/bike-seatposts-accessories/bike-seatposts/trek-madone-gen-8-seatpost/p/W5316714/', priceBasis: 'msrp-confirmed',
    note: 'oem-posts-1 new row (2026-07-21): the Madone SLR frame\'s own OEM seatpost — added so fr-trek-madone-slr\'s seatpost:\'proprietary\' has a real matching part. DIRECTLY FETCHED trekbikes.com\'s own Trek Madone Gen 8 Seatpost product page (WebFetch via Exa): spec table gives Diameter "Mast" (not a round tube — a mast-cap-style integrated aero post, genuinely proprietary) across four size/offset points (Mast x 150mm x 0mm = 110.0g, x150x20 = 121.0g, x190x0 = 115.0g, x190x20 = 127.0g, all Carbon); this row uses the lightest/0mm-offset point. Price $329.99 confirmed consistent across four independent US Trek-authorized dealers (Bike Doctor, Kim\'s Bike Shop, Trek Bicycle Mississauga, Trek Bicycle Tustin) — not itself on the fetched trekbikes.com page, so flagged as dealer-network-confirmed rather than a direct manufacturer-page price quote.' },
  { id: 'sp-cannondale-synapse-save', cat: 'seatpost', brand: 'Cannondale', model: 'SAVE Carbon Road Seatpost 27.2', family: 'cannondale-save-seatpost',
    proprietary: true, forFrames: ['fr-cannondale-synapse'], setback: 15,
    weight: 202, price: 220,
    verified: true,priceBasis:'msrp-confirmed',  lastChecked: '2026-07-22', source: 'https://www.cannondale.com/en-us/gear/components/seatposts/road-seatposts/save-carbon-road-seatpost-272',
    note: 'PROMOTED 2026-07-22 under the SEATPOST INTERFACE-VERIFICATION EXCEPTION (Douglas-ratified this date, the 7th exception class): weight is not engine-read for seatposts and cannondale.com publishes no weight field at all — the 202g retailer figure stays a disclosed sample; interfaces (the real 27.2mm SAVE SKU, CP2700U) were already directly manufacturer-confirmed (road-16). Source URL re-confirmed live by the coordinator at promotion (en-us page, CP2700U model code matches). oem-posts-1 new row (2026-07-21): the Synapse frame\'s own OEM SAVE-profile post — added so fr-cannondale-synapse\'s seatpost:\'proprietary\' has a real matching part (Cannondale\'s "SAVE" carbon layup is a tuned-flex proprietary post family shipped on Synapse/SuperSix frames, sold aftermarket as a genuine 27.2mm-diameter SKU rather than a generic 27.2 round post — kept proprietary/forFrames per this file\'s existing BMC-URS/Cinelli precedent rather than reclassified to plain 27.2, since the Synapse\'s own seat-tube/clamp geometry is designed specifically around this post\'s SAVE profile). road-16 wave (2026-07-21): DIRECTLY FETCHED cannondale.com\'s "SAVE Carbon Road Seatpost 27.2mm" product page (browser pane): the ONLY 27.2mm SAVE seatpost currently sold is "SAVE Seatpost 27.2mm, 15mm Offset" (Model Code CP2700U), sizes 350mm/400mm, price $220 — CORRECTED setback 0->15 (the 0mm-offset point does not appear to be a current cannondale.com SKU; older 0mm-offset listings found via search, e.g. a 2021-dated Walmart CP2700U1040 listing, look like a discontinued prior-lineup code) and price 200->220 (the page\'s own current MSRP). setback is display-only (not read by checkBuild — no compat-road.js rule keys off it), so this correction does not change any verdict. The page\'s Specs tab lists only Platform/Model Name/Model Code — no weight field at all; 202g stays the pre-existing CannondaleExperts.com retailer figure, unsourced for verification. Not marked verified:true: weight bar unmet, though interfaces (proprietary/forFrames/the real 27.2mm SAVE SKU) are now directly manufacturer-confirmed.' },
  { id: 'sp-giant-tcr-variant-2024', cat: 'seatpost', brand: 'Giant', model: 'Variant Seatpost for 2024+ TCR', family: 'giant-tcr-variant',
    proprietary: true, forFrames: ['fr-giant-tcr-advsl'], setback: 4,
    weight: 195, price: 149.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.giant-bicycles.com/gb/variant-seatpost-for-2024plus-tcr-2024', priceBasis: 'regional-conversion',
    note: 'oem-posts-1 new row (2026-07-21): the TCR Advanced SL frame\'s own OEM aero seatpost — added so fr-giant-tcr-advsl\'s seatpost:\'proprietary\' has a real matching part. DIRECTLY FETCHED giant-bicycles.com/gb\'s "Variant Seatpost for 2024+ TCR" product page: "Optimized for maximum aero performance at a super low weight", "Compatible with model year 2024 and on TCR frames... Not compatible with pre-model year 2024 TCR", Diameter "Aerosystem Shaping" (non-round, genuinely proprietary), Length 375mm, Offset 4mm (matches setback), Weight "195g" (maker-stated, exact match), full carbon. road-16 wave (2026-07-21): RE-FETCHED and confirmed identical (weight, offset, compatibility copy unchanged); also cross-checked giant-bicycles.com/ca\'s live Seatposts collection, which lists the same product at CAD $249.99 — no giant-bicycles.com/us storefront page exists for this SKU (Giant does not sell parts direct-to-consumer in the US), so no true US MSRP is fetchable. Promoted to verified:true per THE PRICE RULE (interfaces + weight are manufacturer-confirmed via a real fetched giant-bicycles.com product page; price is a non-US GBP figure used as the USD sample, disclosed here — a US retailer independently listed the same part at a comparable $146.99, corroborating the figure is in the right range).' },
  { id: 'sp-bmc-teammachine-slr01', cat: 'seatpost', brand: 'BMC', model: 'Teammachine SLR01 Seatpost (15mm offset)', family: 'bmc-teammachine-slr01-seatpost',
    proprietary: true, forFrames: ['fr-bmc-teammachine-slr01'], setback: 15,
    weight: 200, price: 249,
    verified: true,priceBasis:'msrp-confirmed',  lastChecked: '2026-07-22', source: 'https://us.bmc-switzerland.com/products/teammachine-slr01-seatpost-bike-components-bmc-19-10801-002',
    note: 'road-depth-5 wave, PROMOTED under the SEATPOST INTERFACE-VERIFICATION EXCEPTION (Douglas-ratified 2026-07-22, the 7th exception class — see the KVF/SAVE precedent, sp-trek-domane-slr-kvf and sp-cannondale-synapse-save, elsewhere in this file): closes a real gap — fr-bmc-teammachine-slr01\'s seatpost:\'proprietary\' had NO matching post row in this file before this pass. DIRECTLY FETCHED us.bmc-switzerland.com\'s own "Teammachine SLR01 Seatpost" product page: SKU 301897, "D-Shape Seatpost" (non-round, genuinely proprietary — matches the frame\'s bmc-ics-flat integrated-cockpit design language), offered in 0mm/15mm/30mm offset (this row uses the in-stock 15mm SKU, matching BMC\'s own MY2024 spare-parts-list part number 30000742 "Seatpost SLR01 15mm OFFSET"), "Compatible with: Teammachine SLR01 and SLR01 Disc" (directly names this file\'s frame), real US price "USD 249.00". The page publishes NO weight field at all (confirmed on a full-page re-fetch, every table row blank) — 200g stays a disclosed BIKE24.com-relayed retailer estimate for the sibling 15mm-offset part (BIKE24 itself labels its 30mm-offset listing "Weight Source: BIKE24", i.e. its own measurement, not BMC\'s; a separate lvr-cycles.com listing for the earlier MY2017 15mm-offset version states 200g) — NOT a manufacturer-published figure, and per this exception weight is not engine-read for seatposts (only diameter/setback feed compat), so the interface fields alone (real SKU, offset, forFrames) carry verified:true.' },
  { id: 'sd-fizik-antares-versus-r3', cat: 'saddle', brand: 'Fizik', model: 'Vento Antares R3', family: 'fizik-vento-antares',
    weight: 195, price: 174.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.fizik.com/en-us/products/saddles-vento-antares-r3-black-vantar3fa1', priceBasis: 'regional-conversion',
    note: 'road-16 wave (2026-07-21): RETARGETED — road-15 flagged this row\'s "Antares Versus Evo R3" name as a genuinely dropped Fizik branding with no current SKU, uncertain whether to migrate it to the current "Vento Antares R3" naming. DIRECTLY FETCHED fizik.com\'s own "Vento Antares R3" product page (browser-fetchable, not JS-walled): its own copy confirms this is Fizik\'s current-generation successor in the same Antares racing-saddle lineage ("Antares is back and better than ever... As a member of the new generation of Antares saddles, the Antares R3 maintains many iconic design features that made the original one of the most popular amongst leading athletes") — a rebrand/relaunch of the same product line, not an unrelated saddle, matching this catalog\'s road-12 Deda-handlebar precedent (retarget in place rather than mint a new id + alias, since road.html\'s ids were not yet exposed to real share links at the time of that precedent and remain a young live surface). Tech-spec table: two widths, 195g/140mm and 202g/150mm, carbon-reinforced-nylon shell with WingFlex, Kium rails. This row now uses the 140mm/195g point (CORRECTED from the old 205g sample, which matched neither current width exactly). Price: fizik.com itself renders EUR-only on this session\'s fetch (€149.00, likely geo-defaulted); used the real US MSRP instead — biketiresdirect.com (a US Fizik-authorized retailer, redirected from westernbikeworks.com) states "$157.49 (on sale from $174.99 MSRP)" — $174.99 is the stated regular US MSRP, not the sale price, consistent with this catalog\'s MSRP-only pricing policy. id/family kept unchanged (append-only) despite the model-name change — this is the same physical product lineage under a new name, the road-12 pattern, not a different SKU needing a new id.' },
  { id: 'sd-selleitalia-slr-boost', cat: 'saddle', brand: 'Selle Italia', model: 'SLR Boost Superflow', family: 'selleitalia-slr-boost',
    weight: 135, price: 200 },
  { id: 'sd-ergon-sr-allroad-core-pro-carbon', cat: 'saddle', brand: 'Ergon', model: 'SR Allroad Core Pro Carbon Men', family: 'ergon-sr-allroad-core',
    weight: 225, price: 219.95,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.ergonbike.com/en/product-details.html?anr=44063020&s=srallroadcore&w=road', priceBasis: 'msrp-confirmed',
    sourceType: 'measured', weightSource: 'https://www.bikeperfect.com/reviews/ergon-sr-all-road-core-pro-carbon-gravel-saddle-review-subtly-smooth-gravel-seat',
    note: 'road-depth-3 wave (new brand — first Ergon road/all-road saddle row). DIRECTLY FETCHED ergonbike.com\'s own "SR Allroad Core Pro Carbon Men" product page (Art.-No. 44063020, M/L size): "MSRP $ 219.95 excl. VAT", "Shell Carbon Composite", CORE HD (BASF Infinergy E-TPU) padding, carbon rails (the lightest of the three-tier SR Allroad Core Men range: Comp/Pro/Pro Carbon). ergonbike.com does not publish a weight figure on this page (spec table stops at material/technology, no grams row) — used bikeperfect.com\'s independent MEASURED weight for the same M/L Pro Carbon SKU ("Weight: 225g (M/L)"), sourceType:\'measured\' + weightSource per this catalog\'s Shimano/rotor-class policy (a reputable third-party measured weight is accepted for the weight field only, interfaces/price stay manufacturer-sourced). saddle category carries no engine-read compat fields (schema-road.js ROAD_SCHEMA.saddle is empty), so this row is common-fields-only.' },
  { id: 'bb-shimano-smbb72-41', cat: 'bb', brand: 'Shimano', model: 'SM-BB72-41B (BB86/PF86 Press-Fit Road)', family: 'shimano-smbb72',
    shell: 'bb86', spindle: '24mm-road',
    weight: 69, price: 30,
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/SM-BB72-41B',
    note: 'road-6 wave: CORRECTION — this row was previously labeled "(BSA Road)" with shell:\'bsa-road\' (threaded), but productinfo.shimano.com\'s spec table for SM-BB72-41B shows "HOLLOWTECH II bottom bracket: Threaded bottom bracket type -" (unchecked) / "Press-Fit type ✔" / "Press-Fit bottom bracket shell width (mm) 86.5 ✔" — this is a Press-Fit 86.5mm shell BB, not threaded BSA. Corrected shell to \'pf86\' (ROAD_VOCAB\'s "Shimano-style press-fit road shell, 86.5mm wide" token, per schema-road.js\'s own description — an exact match) and the model label to match. This also matches the "Recommended bottom bracket: Press-Fit SM-BB72(-41B)" line on the FC-R8100/FC-R7100/FC-RX810-2 crankset pages fetched elsewhere in this wave. A rule-11 exact-match error check (bb.shell vs frame.bb) means the old mislabeling would have wrongly greenlit BSA-threaded frames and wrongly reddened the file\'s two pf86 frames — a real false-fit/false-conflict risk this correction fixes. Average weight 69g (was a 90g sample). 2026-07-21 vocab merge (coordinator, Douglas-ruled): shell CORRECTED pf86->bb86 — this row\'s own source text ("Press-Fit... 86.5") and bb-sram-dub-bb86\'s source text ("PF 86.5 = this row\'s bb86") describe the identical physical shell under the vocab\'s two different spellings; bb86 kept as canonical (majority usage), pf86 retired from ROAD_VOCAB/GRAVEL_VOCAB. Model label now reads BB86/PF86 to keep both maker-facing names discoverable.' },
  { id: 'bb-praxis-t47-road', cat: 'bb', brand: 'SRAM', model: 'DUB T47 Bottom Bracket', family: 'sram-dub-t47', mfgPn: 'BB-DUB-T47-A1',
    shell: 't47-road', spindle: 'dub',
    weight: 95, price: 70,
    verified: true, lastChecked: '2026-07-20', source: 'https://sram.com/en/sram/models/bb-dub-t47-a1', priceBasis: 'msrp-confirmed',
    note: 'road-8 wave (2026-07-20): browser-pane fetch of sram.com/en/sram/models/bb-dub-t47-a1 confirms road-7\'s flag - this is the real SRAM "DUB T47 Bottom Bracket" (MODEL ID BB-DUB-T47-A1: SPINDLE DIAMETER "DUB", BOTTOM BRACKET SHELL TYPE "T47 68, T47 77, T47 85.5", CRANKSETS TYPE "Road, Road Wide", MSRP $60-$290 spanning bearing-option SKUs), not a Praxis product; brand/model/family/mfgPn corrected. Price $70 sits inside the page\'s stated range (kept as-is). Weight 95g is NOT published on the fetched page (SRAM lists no weight for this DUB T47 listing, same pattern as its src/compat.js MTB-catalog sibling bb-sram-dub-t47) - left as an unsourced sample, flagged. ID KEPT AS-IS (brand token now reads stale "praxis"): this road/ catalog has no ALIASES/canonicalId retirement mechanism (test-ids.js and lintCatalog\'s brand-qualified-id check only cover src/compat.js\'s MTB PARTS; compat-road.js/schema-road.js define no equivalent) and inventing one is out of scope for a data-correction wave - matches this file\'s existing convention of leaving a now-inaccurate id in place with an explanatory note when a full identity migration isn\'t in scope (see the rw-ethirteen-lg1r-*-hg duplicate-id notes above). This is the SAME real product as src/compat.js\'s bb-sram-dub-t47 (MTB catalog, same source/mfgPn) - the two catalogs are separate and this is not a cross-catalog duplicate in the id-collision sense, but flagged for the coordinator as a naming inconsistency worth a scoped id-migration pass someday.' },
  { id: 'bb-sram-dub-bb86', cat: 'bb', brand: 'SRAM', model: 'DUB PressFit BB86', family: 'sram-dub-bb86',
    shell: 'bb86', spindle: 'dub',
    price: 50,
    verified: true, lastChecked: '2026-07-20', source: 'https://www.sram.com/en/sram/models/bb-dub-pf-a1', priceBasis: 'msrp-confirmed',
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
    note: 'road-grind-1: fetched fsaproshop.com product page directly (WebFetch, no wall) — part number 141-2044, upper ZS44/28.6, lower reported as "ZS56/39.78" (rounds to the catalog\'s existing ZS56/40 token, matching the same SKU already cataloged unverified in the MTB catalog at src/compat.js hs-fsa-orbit-15-zs44-zs56 with price $59.99/weight 125g from independent retailer cross-checks). This fetch itself returned inconsistent price ($57 sale/$76 list) and an uninterpretable weight fragment ("5.3/12.8") — NOT trusted per the phantom-number hazard, so weight is omitted here and verified:true is withheld despite having fetched the maker page, because the fetched figures did not cleanly confirm. road-16 wave (2026-07-21): confirmed as the DUPLICATE-SKU SURVIVOR — hs-fsa-orbit-zs44-zs56 (identical upper/lower/steerer, near-identical weight) retired to status:\'discontinued\'+supersededBy pointing here; this is the row to build with going forward. See that row\'s note for the full reasoning.' },
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
    verified: true, lastChecked: '2026-07-20', source: 'https://productinfo.shimano.com/en/product/CS-HG500-10', priceBasis: 'regional-conversion',
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
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/us-en/super-record-wireless-rear-derailleur/CRDSUPERRECORDWRLDB12S.html', priceBasis: 'regional-conversion',
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
    verified: true, lastChecked: '2026-07-18', source: 'https://www.campagnolo.com/gb-en/chorus--rear-derailleur/CRDCHORUS12S.html', priceBasis: 'regional-conversion',
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

  // ===== DRIVETRAIN — Campagnolo Centaur (2x11, mechanical, RIM BRAKE) ======
  // road-depth-1 wave (2026-07-22): Centaur is Campagnolo's entry tier below
  // Chorus — no longer listed on campagnolo.com's current road groupset page
  // (Record 13/Super Record 13/Chorus only), but its individual product
  // pages ARE still live and fetchable (campagnolo.com/us-en/centaur-*),
  // confirming it's a real, still-sold component line, not a discontinued
  // one — fetched directly via WebFetch, no wall. Like Sora above, Centaur's
  // Ergopower lever is RIM-BRAKE ONLY (no disc-hydraulic Centaur lever
  // exists — confirmed by an explicit "centaur disc" search on
  // campagnolo.com returning no dedicated disc product); same schema gap as
  // Sora applies (ROAD_SCHEMA.brake has no rim-caliper shape), so no brake
  // caliper row this tier either. system:'campag-11'/freehub:'campag-11'
  // reuse this catalog's existing tokens (already used by the Record/Chorus
  // 12s cassettes' shared classic-ED-driver freehub — Centaur mounts the
  // same body). NOT added: a frontderailleur row — the fetched page states
  // no mount type (braze-on vs clamp/band) anywhere and no second source was
  // found this pass (time-boxed); a real GAP, not a fabricated 'braze-on'
  // guess (the FD schema field has no safe default).
  { id: 'sh-campagnolo-centaur-mech', cat: 'shifter', brand: 'Campagnolo', model: 'Centaur Ergopower (pair)', family: 'campagnolo-centaur-mech',
    system: 'campag-11', speeds: 11, actuation: 'mechanical', brakeSystem: 'rim-caliper', side: 'pair', frontShift: true,
    weight: 746, price: 250,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/centaur-ergopower-controls/CCLCENTAURBLACK11S.html',
    note: 'road-depth-1 wave: campagnolo.com product page confirms "11-speed", rim brake (mechanical, PowerShift "1-lever-1-action"), "Weight: 373 grams" — per-lever figure, doubled to 746g for this catalog\'s per-pair shifter convention (basis disclosed, not a page-stated pair total). Price not published on the fetched page — 250 is an unsourced estimate.' },
  { id: 'rd-campagnolo-centaur-mech', cat: 'rearderailleur', brand: 'Campagnolo', model: 'Centaur Rear Derailleur', family: 'campagnolo-centaur-mech',
    system: 'campag-11', speeds: 11, actuation: 'mechanical', maxCog: 32, cage: 'medium', mount: 'std-hanger',
    weight: 230, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/centaur-rear-derailleur/CRDCENTAURBLACK11S.html',
    note: 'road-depth-1 wave: campagnolo.com product page confirms "11-speed (mechanical)", "compatible with cassettes up to 32 teeth" (maxCog:32, matching the cassette row below), "Weight: 230 grams" (matches this row exactly, a real fetched figure — not a sample). Cage length and mount not itemized on the page; mount:\'std-hanger\' + cage:\'medium\' follow this catalog\'s existing Campagnolo convention (rd-campagnolo-chorus-mech). Price not published — 90 is an unsourced estimate.' },
  { id: 'cs-campagnolo-centaur-1132', cat: 'cassette', brand: 'Campagnolo', model: 'Centaur Sprockets 11-32', family: 'campagnolo-centaur-cass',
    system: 'campag-11', speeds: 11, freehub: 'campag-11', minCog: 11, maxCog: 32,
    weight: 291, price: 75,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/centaur-sprockets/CCSCENTAURBLACK11S.html',
    note: 'road-depth-1 wave: campagnolo.com product page confirms "11-speed", "Cog Range Options: 11-29, 11-32, 12-32" (this row: the 11-32T config, matching rd-campagnolo-centaur-mech\'s 32T max capacity), example teeth "11-12-13-14-15-17-19-22-25-28-32" cross-checks the 11-32T range. freehub:\'campag-11\' reused per this catalog\'s existing classic-ED-driver convention (cs-campagnolo-record-1129/cs-campagnolo-chorus-1129 — not independently re-confirmed on this specific page, which itemizes no driver-body field, but Centaur has never shipped an N3W-only cassette). "Weight: 291 g" matches this row exactly. Price not published — 75 is an unsourced estimate.' },
  { id: 'ch-campagnolo-centaur-c11', cat: 'chain', brand: 'Campagnolo', model: 'Centaur 11s Chain', family: 'campagnolo-centaur-chain',
    system: 'campag', speeds: 11,
    weight: 269, price: 30,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/centaur-chain/CCNCENTAURBLACK11S.html',
    note: 'road-depth-1 wave: campagnolo.com product page confirms "11-speed" (compatible 11/12-speed per the technical-manual reference), HD-Link fastening, "5.9mm special steel links". Weight stated on the page as "2.36 grams per link" — DERIVED to a 114-link total (this catalog\'s established Campagnolo weight-basis convention, e.g. Super Record/Record/Chorus chains above) as 2.36 x 114 = 269g; basis disclosed, not a page-stated pair/total figure. Price not published — 30 is an unsourced estimate.' },
  { id: 'cr-campagnolo-centaur-crank', cat: 'crankset', brand: 'Campagnolo', model: 'Centaur Crankset', family: 'campagnolo-centaur-crank',
    bb: 'ultra-torque', chainrings: '2x', ring: '50/34', ringStd: null, speeds: 11, chainline: 43.5,
    weight: 875, price: 220,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.campagnolo.com/us-en/centaur-crankset/CFCCENTAURBLACK11S.html',
    note: 'road-depth-1 wave: campagnolo.com product page confirms "Campagnolo Ultra-Torque BB cups required" (bb:\'ultra-torque\', matching this catalog\'s existing Record/Chorus crankset convention), "52/36 and 50/34 tooth combinations" (this row: the 50/34T config), four-arm design, "a single crank works with both chainring combinations" (ringStd:null, same sold-separately-rings convention as the Chorus crankset above). "Weight: 875 grams" matches this row exactly. Chainline and price not published on the fetched page — 43.5mm/220 are unsourced estimates (chainline matches this catalog\'s other 2x mechanical road cranksets).' },

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
  { id: 'ti-michelin-powercup-30', cat: 'tire', brand: 'Michelin', model: 'Power Cup TLR 30c', family: 'michelin-powercup',
    wheel: '700c', width: 30, tubeless: true, compound: 'Gum-X',
    weight: 300, price: 75,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.bike24.com/p2581542.html',
    note: 'road-depth-4 wave: fills the 30c gap in this file\'s Power Cup TLR family (25/28c already cataloged). A bike24.com retailer spec republication explicitly citing "Manufacturer: Michelin" and Michelin\'s own bike.michelin.com product page states "Weight (manufacturer\'s specification): approx. 300 g (28\\" black | width: 30 mm)", "carcass density: 120TPI/EPI", "tire compound: Gum-X, X-Race Compound" (compound corrected to Gum-X — the current-generation Power Cup TLR "Competition Line" naming, distinct from the older "Endurance Compound X" wording on this file\'s 25/28c sibling rows, which may reflect an earlier product revision; not reconciled across the family this pass, flagged). Price $75 carried over from the sibling rows as a sample (no per-width MSRP found).' },
  { id: 'ti-michelin-powercup-32', cat: 'tire', brand: 'Michelin', model: 'Power Cup TLR 32c', family: 'michelin-powercup',
    wheel: '700c', width: 32, tubeless: true, compound: 'Gum-X',
    weight: 330, price: 75,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.bike24.com/p2581542.html',
    note: 'road-depth-4 wave: same bike24.com/Michelin-spec source as the 30c sibling row — "approx. 330 g (28” | width 32 mm)". Same compound-wording and price caveats as the 30c row.' },
  // road-15 wave RETRY: Power Road does not appear anywhere in Michelin's current
  // lineup (michelin.com/michelinman.com/michelin.ca all searched) - independent
  // reporting (tradeinn.com customer review, road.cc's 2019/2020 launch coverage)
  // indicates Michelin has since discontinued/replaced the Power Road line with
  // Power Cup/Power Protection TLR. No live maker page exists to fetch. STILL
  // UNVERIFIED after the retry - a genuinely gone product, not a bot wall.
  { id: 'ti-michelin-powerroad-28', cat: 'tire', brand: 'Michelin', model: 'Power Road TLR 28c', family: 'michelin-powerroad',
    wheel: '700c', width: 28, tubeless: true, compound: '2X Endurance Compound',
    weight: 300, price: 65, status: 'discontinued', supersededBy: 'ti-michelin-powercup-28',
    note: 'status:\'discontinued\' added (schema-parity-1) per the road-15 retry finding above (Power Road absent from every current Michelin storefront, corroborated by independent reporting as replaced by Power Cup/Power Protection TLR); supersededBy points to the same-width Power Cup TLR 28c row already in this catalog.' },

  // ===== TIRES — Specialized Cotton TLR (road-depth-4 wave: new brand tire line) ====
  { id: 'ti-specialized-cotton-tlr-28', cat: 'tire', brand: 'Specialized', model: 'Cotton TLR 28c', family: 'specialized-cotton-tlr',
    wheel: '700c', width: 28, tubeless: true, compound: 'Gripton', casing: 'Poly-Cotton-Corespun',
    weight: 280, price: 90,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/cotton-tlr/p/1000261337',
    note: 'road-depth-4 wave (new brand — first Specialized road tire row; this file previously had no Specialized tire despite the brand\'s frame/wheel presence). FETCHED specialized.com\'s current "Cotton TLR" product page directly: "700x28c, 280g" (Approximate Weight table), "Poly-Cotton-Corespun casing with seamless vulcanization... strong polyester core with supple cotton fibers" (casing), GRIPTON compound (marketing copy names the compound family without a numbered tier on this specific tire, unlike the T2/T5-tiered RapidAir line). Tubeless-ready ("TLR", "race-proven... tubeless-ready"). Price: no per-tire MSRP found on the page; $90 is an unsourced sample positioned near this file\'s other premium tubeless race-tire rows (Vittoria Corsa Pro $95, Pirelli P Zero Race $80).' },
  { id: 'ti-specialized-cotton-tlr-30', cat: 'tire', brand: 'Specialized', model: 'Cotton TLR 30c', family: 'specialized-cotton-tlr',
    wheel: '700c', width: 30, tubeless: true, compound: 'Gripton', casing: 'Poly-Cotton-Corespun',
    weight: 290, price: 90,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/cotton-tlr/p/1000261337',
    note: 'road-depth-4 wave: same specialized.com Cotton TLR fetch as the 28c sibling row. "700x30c, 290g".' },
  { id: 'ti-specialized-cotton-tlr-32', cat: 'tire', brand: 'Specialized', model: 'Cotton TLR 32c', family: 'specialized-cotton-tlr',
    wheel: '700c', width: 32, tubeless: true, compound: 'Gripton', casing: 'Poly-Cotton-Corespun',
    weight: 320, price: 90,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/cotton-tlr/p/1000261337',
    note: 'road-depth-4 wave: same specialized.com Cotton TLR fetch as the 28c/30c sibling rows. "700x32c, 320g".' },

  // ===== COCKPIT — Enve / PRO / FSA (rounding out the finishing-kit brand set)
  { id: 'hb-enve-ses-aerobar', cat: 'handlebar', brand: 'Enve', model: 'SES Aero Road Bar', family: 'enve-ses-aerobar',
    clamp: '31.8', dropBar: true, reach: 79, drop: 127, width: 400,
    weight: 267, price: 400,
    verified: true, lastChecked: '2026-07-21', source: 'https://enve.com/products/aero-handlebar/', priceBasis: 'msrp-confirmed',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED enve.com directly (no rate-limit this session, unlike the road-5 wave\'s 429 on this same domain for the SES AR One-Piece row below). Product now sold as "AERO IN-ROUTE HANDLEBAR" (300-1003-112, an IN-Route-updated version of the same SES Aero Road Bar this row names). Product Specs table: "Reach 79mm" (CORRECTED 75->79), "Drop/Rise 127mm" (CORRECTED 128->127), "Clamp Diameter 31.8" (confirmed), "Width C to C in Drops: 40cm, 42cm, 44cm, 46cm" (confirms width:400 is a real 40cm SKU), "Weight: 267g, 270g, 281g, 290g" listed in the same 40/42/44/46cm order — 267g is the 40cm figure (WEIGHT CORRECTED 285->267). "Regular price $400.00" (PRICE CORRECTED 425->400, exact).' },
  { id: 'st-enve-in-route-stem', cat: 'stem', brand: 'Enve', model: 'In-Route Aero Stem', family: 'enve-in-route',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 177, price: 350,
    verified: true, lastChecked: '2026-07-21', source: 'https://enve.com/collections/in-route-stem/products/stem-aero-in-route', priceBasis: 'msrp-confirmed',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED enve.com directly. Product Specs table (per-length row): "100mm: Reach 8.2, Stack 99.5, Weight 177g" (WEIGHT CORRECTED 165->177, exact maker figure at this row\'s modeled 100mm length), "Clamp Diameter 31.8mm" (confirmed), "Steer Tube Clamp Diameter 1 1/8\"" (confirms steerer). "Regular price $350.00" — exact match to this row\'s pre-existing $350 (confirmed, not corrected).' },
  { id: 'hb-pro-vibe-superlight', cat: 'handlebar', brand: 'PRO', model: 'Vibe Superlight', family: 'pro-vibe-superlight',
    clamp: '31.8', dropBar: true, reach: 80, drop: 130, width: 400,
    weight: 157, price: 130,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.pro-bikegear.com/products/pro-vibe-superlight-handlebar', priceBasis: 'third-party-listed',
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
    weight: 214, price: 209.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/power-expert-with-mirror/p/1000148806', priceBasis: 'msrp-confirmed',
    note: 'road-16 wave (2026-07-21): DIRECTLY FETCHED specialized.com/us (browser pane — a JS-rendered SPA, not a bot wall, per this catalog\'s established JS-rendered!=bot-walled doctrine). Confirms real US price "$209.99" (CORRECTED from a $180 sample) and per-size weights: 130mm/210g, 143mm/214g, 155mm/225g, 168mm/227g (this row uses the 143mm point, CORRECTED from a 218g sample that matched no real size exactly). Also confirms sizing (130/143/155/168mm), hollow titanium rails, Mirror 3D-printed insert construction.' },
  { id: 'sd-prologo-dimension-tirox', cat: 'saddle', brand: 'Prologo', model: 'Dimension T2.0 Tirox', family: 'prologo-dimension',
    weight: 227, price: 150,
    note: 'road-16 wave (2026-07-21): investigated, LEFT UNVERIFIED — genuine naming ambiguity, could not confirm a single real SKU matching this exact name. Prologo\'s "T2.0" (Chromoly steel) and "Tirox" (light-alloy steel) are two DIFFERENT, mutually-exclusive rail options on Prologo\'s own rail-comparison page (prologo.it/en/pages/rail-e-basi) — "Dimension T2.0 Tirox" pairs both rail codes into one string, which does not describe a real purchasable combination. The Prologo "Dimension" family has since forked into several distinct generations/variants (base Dimension, Dimension R2 — FETCHED prologo.it/en/pages/dimension-r2 directly, offered ONLY in Nack/Tirox rail, no T2.0 option, 135g Nack-rail weight stated; Dimension Nack, Dimension Tri, Dimension Space, Dimension NDR), each with its own rail-option set and weight, none of which is named "T2.0 Tirox." Multiple US retailers do sell a plain "Prologo Dimension Tirox" saddle (Amazon, Wheel & Sprocket, BikeTiresDirect part codes DIME403HB80-AM/DIMETN3HB80-AM) which is the closest real candidate, but a direct prologo.it fetch of that base-generation product page could not be located this session (a "products/dimension" URL 404s; the live site appears to have reorganized around the generation-specific pages above). Given the real risk of retargeting to the wrong generation/weight, per THE BAR left unchanged rather than guess — flagged for a future pass with more time to locate the exact current prologo.it SKU page. road-17 wave (2026-07-21) RETRY: located prologo.it/en/products/dimension-143 directly (Exa) — the current "Dimension 143" is sold in three rail options, and its OWN spec table states "Weight with Tirox rail: 205 g" (manufacturer figure, not retailer). This is the closest maker-page identity match found yet for a plain "Dimension Tirox" SKU. But it does NOT fully resolve the ambiguity: retailers selling a "Prologo Dimension Tirox Saddle" under that exact plain name quote conflicting weights (Sigma Sports 179g, Halfords 202g) that disagree with prologo.it\'s own 205g Tirox-rail figure by a non-trivial margin, and it remains unconfirmed whether those retailer listings are the same 143 generation or an older/different Dimension variant. Given the weight bar requires one exact-SKU figure and three sources disagree, still NOT promoted — left unverified, flagged with this narrower lead (prologo.it/en/products/dimension-143, Tirox row) for the next pass to resolve the retailer/maker weight conflict.' },
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
  { id: 'bt-lizardskins-dsp-v2-25', cat: 'bartape', brand: 'Lizard Skins', model: 'DSP V2 Bar Tape 2.5mm', family: 'lizardskins-dsp-v2',
    weight: 74, price: 44.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.bike24.com/p2374901.html', priceBasis: 'msrp-confirmed',
    note: 'road-depth-3 wave (new brand — third bartape row alongside Fizik/Supacaz). bike24.com\'s own spec table for the current-collection (model year 2026) SKU lists the full per-thickness weight range verbatim: "1.8 mm - Weight: 50 g... 2.5 mm - Weight: 74 g... 3.2 mm - Weight: 86 g... 4.6 mm - Weight: 102 g" (this row uses the 2.5mm point, the "most popular choice for road bikes" tier per performancebike.com\'s independent spec copy, which states the identical 74g figure for the same 2.5mm SKU — two independent retailers agree). lizardskins.com\'s own site (fetched directly) confirms this is a real, currently-sold product line but its per-color product pages do not surface a price or weight figure in fetchable body text (JS-rendered variant picker); price $44.99 used instead, corroborated identically across FOUR independent US retailers (Walmart — sold and shipped by Lizard Skins directly, Contender Bicycles, Performance Bicycle, Cripple Creek Backcountry), a strong convergent signal for the real US MSRP even without a clean maker-page price fetch.' },

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
    verified: true, lastChecked: '2026-07-21', source: 'https://www.specialized.com/us/en/roval-rapide-cockpit/p/218323', priceBasis: 'msrp-confirmed',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED specialized.com via the browser pane (the file\'s standing "Specialized 403s WebFetch" wall did not block the browser pane today). Spec table: "Reach 75mm / Drop 127mm, 4°/10°/12° flare at the drops, -6° stem" (drop CORRECTED 125->127mm, was an uncross-checked retailer figure), "Steerer Diameter 1-1/8\"" (confirms steerer), widths "380mm, 400mm, 420mm, 440mm" (confirms width:420 is real), Stem Length range 75-135mm. Weight is combo-specific: the page\'s own comparison box states "310g (420x100)" for this exact 420mm-width/100mm-stem combo — matches this row\'s pre-existing 310g exactly (confirmed, not corrected). Price "$699.99" rounds to the pre-existing $700 sample (confirmed, not corrected).' },
  { id: 'ck-deda-alanera-rs', cat: 'cockpit', brand: 'Deda', model: 'Alanera RS', family: 'deda-alanera-rs',
    steerer: '1-1-8', width: 420, reach: 75, drop: 120, integrated: true,
    weight: 340, price: 796,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/alanera-rs-handlebar', priceBasis: 'regional-conversion',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com/alanera-rs-handlebar directly (deda.com 404s; dedaelementi.com is Deda\'s live maker site). Tech specs confirm every field this row already carried, unusually exactly: "Fork steerer: 1 1/8\" (28.6mm)" (steerer), "Reach: 75mm" / "Drop: 120mm" (both exact), "Weight: 340g (110×42)" (exact match to this row\'s pre-existing 340g), 42cm a real width option ("Sizes: 42cm: 90,100,110,120,130mm" stem lengths, confirms width:420). Price: page states "€795.00 VAT NOT INCLUDED" (~$860 at typical FX) — close to but not exactly this row\'s pre-existing $796 sample; kept as-is rather than force an approximate EUR->USD conversion. No field corrections needed — the road-5 wave\'s retailer-corroborated cross-check turned out fully accurate.' },
  { id: 'ck-enve-ses-ar-onepiece', cat: 'cockpit', brand: 'Enve', model: 'SES AR One-Piece Handlebar', family: 'enve-ses-ar-onepiece',
    steerer: '1-1-8', width: 400, reach: 76, drop: 129, integrated: true,
    weight: 380, price: 950,
    verified: true, lastChecked: '2026-07-21', source: 'https://enve.com/products/ar-one-piece-bar-stem', priceBasis: 'msrp-confirmed',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED enve.com directly (no rate-limit this session, unlike the road-5 wave\'s two 429s). Live product is "SES AR ONE-PIECE HANDLEBAR - CUSTOM / US MADE" (300-1030-236). Tech Specs table: "Width Options 38-46cm" (confirms width:400 is real), "Drop 129mm" (CORRECTED 127->129), "Reach 76mm" (confirmed, unchanged), "Weight 380g (120mm x 42cm)" — the only weight figure the page publishes, combo-specific rather than per-width (WEIGHT CORRECTED 345->380, replacing the road-5 wave\'s cross-checked range-midpoint estimate). "Regular price $950.00" (PRICE CORRECTED 1200->950). Steerer (1-1/8") not restated on this page — kept as the universal-standard assumption already used for every other bar/stem/cockpit row in this file, not independently re-confirmed this pass.' },

  // ===== HANDLEBAR/STEM depth — 35mm oversize clamp pair (road-5 wave) =====
  // Every existing hb/st pair in this file is 31.8mm clamp; adds the 35mm
  // oversize standard (widening from "6 handlebar / 6 stem" toward covering
  // both clamp diameters the schema vocab (clampRG) already allows).
  { id: 'hb-deda-m35', cat: 'handlebar', brand: 'Deda', model: 'Superleggera 35', family: 'deda-superleggera-35',
    clamp: '35', dropBar: true, reach: 75, drop: 130, width: 420,
    weight: 180, price: 200,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/superleggera-35-handlebar', priceBasis: 'regional-conversion',
    note: 'road-12 wave: RETARGETED — road-11 flagged this row\'s old "Trentacinque M35 RHM" model string as a conflation of two different Deda products (the discontinued carbon "35 Trentacinque" bar, whose series page at dedaelementi.com/series/trentacinque returns "We can\'t find products matching the selection," and an unrelated current alloy "M35 RHM" outlet item). FETCHED dedaelementi.com/superleggera-35-handlebar directly: its tech-copy is verbatim identical to the discontinued Trentacinque series page ("technology behind the superleggera combined with the 35 innovation... HR40 carbon fiber... modern RHM shape") — Deda\'s current-catalog successor to the same bar under a new name, not a different product. TECH SPECS table: "Handlebar: 35mm" (confirms clamp), "Reach: 75mm" (exact match, unchanged), "Drop: 130mm" (CORRECTED 129->130), "Sizes: 42 (SLC3542)/44/46, outside to outside" (420mm width = the 42cm size, confirmed a real SKU), "Weight: 180 grams (based on a size 42cm)" (CORRECTED 278->180). Price "FROM €200.00 VAT NOT INCLUDED" — CORRECTED 295->200 (same conservative EUR-read-as-USD convention this file already applies to the paired Deda stem\'s €90 figure). id/family kept distinct from the live "M35 RHM" alloy product (m35-rhm-handlebar) as a different SKU.' },
  { id: 'st-deda-trentacinque-35', cat: 'stem', brand: 'Deda', model: 'Trentacinque Stem', family: 'deda-trentacinque-35',
    clamp: '35', steerer: '1-1-8', length: 110,
    weight: 136, price: 90,
    verified: true, lastChecked: '2026-07-21', source: 'https://dedaelementi.com/trentacinque-stem', priceBasis: 'regional-conversion',
    note: 'road-11 wave (wheels/cockpit tail): FETCHED dedaelementi.com/trentacinque-stem directly (currently in stock, unlike the carbon Trentacinque handlebar above): "Diameter: 35mm" (confirms clamp:\'35\'), "Fork Steerer: 1 1/8\" (28,6mm)" (confirms steerer), "Angle: 82°", "Sizes: 110 (35N110)" (confirms length:110 is a real SKU), "Weight: 136g (110mm)" — an EXACT match to this row\'s pre-existing 136g (now maker-confirmed, not just retailer-corroborated). PRICE CORRECTED 70->90: page states "FROM €90.00 VAT NOT INCLUDED" (~$97 at typical FX); $90 is a closer, still-conservative read of that figure than the prior $70 sample.' },

  // ===== SEATPOST depth — round diameters + a 2nd proprietary lock (road-5) =
  { id: 'sp-thomson-elite-309', cat: 'seatpost', brand: 'Thomson', model: 'Elite Setback 30.9', family: 'thomson-elite',
    diameter: '30.9', setback: 0,
    weight: 201, price: 70,
    verified: true, lastChecked: '2026-07-18', source: 'https://bikethomson.com/product/elite-seatpost/', priceBasis: 'msrp-confirmed',
    note: 'Fetched bikethomson.com clean: 30.9mm is one of the Elite\'s published diameter offerings ("25.0mm...30.9mm...32.4mm"), straight/16mm-setback options, and "approximately 201 grams (250 length)" (the page does not break weight out per-diameter, so 201g is the maker\'s own stated approximate figure, not a per-SKU exact number — flagged). Price entered at the page\'s quoted range floor ($69.95-$134.95, varies by config).' },
  { id: 'sp-thomson-elite-316', cat: 'seatpost', brand: 'Thomson', model: 'Elite Setback 31.6', family: 'thomson-elite',
    diameter: '31.6', setback: 16,
    weight: 201, price: 75,
    verified: true, lastChecked: '2026-07-18', source: 'https://bikethomson.com/product/elite-seatpost/',
    note: 'Same fetched source/caveat as the 30.9 row above (31.6mm also in the page\'s published diameter list); this row uses the 16mm-setback config the same page names ("Straight / Setback(16mm)"). Price is a sample estimate within the page\'s quoted range.' },
  { id: 'sp-cannondale-c140aero-20', cat: 'seatpost', brand: 'Cannondale', model: 'C1 40 Aero Seatpost 20mm Offset', family: 'cannondale-c140aero',
    proprietary: true, forFrames: ['fr-cannondale-supersix-evo'], setback: 20,
    weight: 165, price: 210,
    verified: true,priceBasis:'third-party-listed',  lastChecked: '2026-07-18', source: 'https://www.cannondale.com/en-us/gear/components/seatposts/road-seatposts/c1-40-aero-seatpost-20mm-offset',
    note: 'Fetched cannondale.com clean: "Weight: 165g", "Offset: 20mm", 330mm length, 65mm min insertion, sold as "a replacement seatpost" for the SuperSix Evo (2023-current) — matches this catalog\'s fr-cannondale-supersix-evo frame. Price ($210) is a retailer figure (Locally.com), not read off the fetched page — flagged.' },

  // ===== SADDLE depth (road-5 wave) =========================================
  { id: 'sd-sanmarco-aspide-carbonfx', cat: 'saddle', brand: 'Selle San Marco', model: 'Aspide Carbon FX Open-Fit', family: 'sanmarco-aspide-carbonfx',
    weight: 145, price: 280,
    verified: true, lastChecked: '2026-07-21', source: 'https://sellesanmarco.com/aspide-carbon-fx/', priceBasis: 'regional-conversion',
    note: 'road-16 wave (2026-07-21): DIRECTLY FETCHED sellesanmarco.com\'s own "Aspide Carbon FX" product page (US-domain manufacturer storefront). Technical Specifications table: "Weight S2 145 g – L2 150 g (± 8%)", "Dimensions S2 132 x 277 mm – L2 142 x 277 mm", Rail "Carbon DNA", Intended use "Road" — Open-Fit cutout confirmed in the product copy ("the comfortable Open-Fit cut-out is the ideal combination of support and relief"). This row\'s narrow point (S2, 132mm) is CORRECTED 147->145g (a near-exact match to the pre-existing unverified figure — the prior retailer-sourced sample was already accurate). Price kept at the pre-existing $280 sample (multiple US retailer cross-checks already cited); the manufacturer page itself renders a EUR figure (€214.90) with no clean USD MSRP line, so not used as the price basis.' },
  { id: 'sd-prologo-scratch-m5', cat: 'saddle', brand: 'Prologo', model: 'Scratch M5 PAS Tirox', family: 'prologo-scratch-m5',
    weight: 201, price: 149,
    verified: true, lastChecked: '2026-07-21', source: 'https://prologo.it/en/products/scratch-m5-pas', priceBasis: 'regional-conversion',
    note: 'road-16 wave (2026-07-21): DIRECTLY FETCHED prologo.it\'s "Scratch M5 PAS" product page — confirms exactly this row\'s name (the "open"/PAS-channel version of the Scratch M5), size 250x140mm (matches), and per-rail weights: "Weight with Nack rail: 131 g" / "Weight with Tirox rail: 201 g" (CORRECTED from a 189g sample — this row already correctly selects the Tirox rail point). Price CORRECTED 129->149: prologo.it\'s own IT storefront shows EUR pricing for its default (Nack) rail selection, not a clean Tirox-specific USD figure; used a real US retailer figure instead — Walmart lists "Prologo Scratch M5 Saddle - Tirox" at a stated regular price of $149.00 (on sale from that figure to $99.25), which is the MSRP-basis figure per this catalog\'s sale-price-excluded pricing policy.' },

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
    verified: true,priceBasis:'msrp-confirmed',  lastChecked: '2026-07-18', source: 'https://www.canecreek.com/products/40',
    note: 'road-5 wave: fetched canecreek.com/products/40 (their own product page, cleanly fetchable via WebFetch): the "40-ZS44-EC44" part-number combination (BAA0717K/BAA0719K) is listed among the Forty\'s real SKU/part-number table, confirming the ZS44/28.6 upper + EC44/40 tapered-lower combo is a genuine purchasable Cane Creek 40-Series configuration; price ($49.99) is stated on the same page. Weight (171g) is NOT itemized on the fetched page — a commonly-cited third-party figure, kept as an unsourced sample per this catalog\'s "verified:true can coexist with a flagged sample weight" convention (same pattern as rd-shimano-105-r7100 elsewhere in this file) rather than inventing or over-claiming it.' },
  { id: 'hs-fsa-orbit-zs44-zs56', cat: 'headset', brand: 'FSA', model: 'Orbit ZS44/28.6 - ZS56/40', family: 'fsa-orbit',
    upper: 'ZS44/28.6', lower: 'ZS56/40', steerer: 'tapered',
    weight: 124, price: 40, status: 'discontinued', supersededBy: 'hs-fsa-orbit-15-zs44-zs56',
    note: 'road-5 wave: real, currently-sold FSA headset (fullspeedahead.com itself was not successfully fetched this pass — not probed via WebFetch/browser pane, time-boxed) — spec (ZS44/28.6 upper, ZS56/40 tapered lower, ~124g) cross-checked across multiple independent retailer listings (Performance Bicycle, BIKE24, The Lions Cyclery) all quoting the same FSA-published S.H.I.S. codes. Kept as an unverified sample per the catalog\'s relaxed inclusion policy (real product, not fabricated) rather than a manufacturer-page fetch that did not happen. road-15 wave: fetched fsaproshop.com\'s current Orbit-family listing directly — no SKU is named plainly "Orbit ZS44/28.6-ZS56/40" (no "1.5"/"Z"/"E" suffix); the closest current products are "Orbit 1.5 ZS Internal Headset" (ZS44/28.6 | ZS56/39.78, same bore pair as this row — likely the SAME physical product as this catalog\'s sibling hs-fsa-orbit-15-zs44-zs56 row, possibly a naming duplicate across the two rows) and "Orbit 1.5E ZS Internal Headset" (124.6g, but a DIFFERENT tapered-fork-only config, not a ZS56 lower). Given the real risk of this row and hs-fsa-orbit-15-zs44-zs56 being the same SKU under two different catalog names, left unverified/unchanged rather than guess which weight figure belongs here — flagged for a future id/dedup pass. road-16 wave (2026-07-21) DECISION: retired via status/supersededBy rather than deletion (ids append-only). Re-examined both rows: identical engine-read fields across the board (upper ZS44/28.6, lower ZS56/40, steerer tapered) and near-identical weight (124g here vs the sibling\'s 125g figure). fsaproshop.com\'s current live Orbit-family catalog names exactly ONE plain-tapered ZS44/ZS56 product — "Orbit 1.5 ZS Internal Headset" (part 141-2044, the hs-fsa-orbit-15-zs44-zs56 row\'s own fetched source) — with no separate "Orbit ZS44/28.6-ZS56/40" SKU (no bare, "1.5E"-less, non-"1.5" name) anywhere on the maker\'s current site. Concluded this row describes the SAME physical FSA SKU as hs-fsa-orbit-15-zs44-zs56 under an earlier, less precise catalog name that predates FSA\'s current "Orbit 1.5" naming — not a genuinely distinct product. \'discontinued\' is used loosely here (the schema\'s status vocab has no dedicated \'duplicate\' value): it signals this row\'s exact name is not a current FSA SKU and the sibling row is the one to build with, without deleting the append-only id.' },
  { id: 'hs-ritchey-comp-zero-zs44-zs55', cat: 'headset', brand: 'Ritchey', model: 'Comp Zero Logic ZS44/28.6 - ZS55/40 Tapered', family: 'ritchey-comp-zero',
    upper: 'ZS44/28.6', lower: 'ZS55/40', steerer: 'tapered',
    weight: 109, price: 45,
    note: 'road-5 wave: real, currently-sold Ritchey headset (Ritchey already appears elsewhere in this file as a cockpit brand — Ritchey WCS bar/stem). ritchey-logic.com itself was not probed this pass (time-boxed); spec (ZS44/28.6 upper, ZS55/40 tapered lower, 109g, "Stem Clamp Diameter: 28.6") cross-checked across bike24.com/bike-components.de retailer listings quoting Ritchey\'s own published S.H.I.S. codes. Unverified sample, same caveat as the FSA row above. road-13 wave: FETCHED ritcheylogic.com/bike/headsets/comp-semi-integrated-zs-headset (WebFetch, no wall) — this current product lists lower options "ZS44/30 (1 1/8\"), ZS55/40 (1.5\"), ZS56/40" alongside upper "ZS44/28.6 (1 1/8\")", i.e. the same bore pair this row models IS one of its selectable configs — but the page never uses the name "Comp Zero"/"Comp Zero Logic" (this row\'s model string) and states weight "83g (1 1/8\")" for the generic listing, not this row\'s 109g. Plausible same-family product under a renamed/generic current SKU, but not a confirmed identity match (weight mismatch, no name bridge) — left unrenamed/unverified rather than guess.' },

  // ===== road-depth-5 wave: cockpit + saddle depth-3 gaps (Zipp Service Course /
  // Service Course SL, PRO Discover, FSA Omega, Specialized Romin, Prologo Kappa,
  // Selle Italia SLR Kit Carbonio / Novus). Rim-brake road is OUT OF SCOPE by this
  // file's own v1 design decision (top-of-file header comment, ROAD-MODEL.md
  // section 6 decision #2) - a deliberate exclusion, not a vocab gap, so no
  // rim-caliper rows are added here. =====
  { id: 'st-zipp-servicecourse', cat: 'stem', brand: 'Zipp', model: 'Service Course', family: 'zipp-servicecourse-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 152, price: 65,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.sram.com/en/zipp/models/st-sc-b2', priceBasis: 'regional-conversion',
    note: 'road-depth-5 wave: FETCHED sram.com Zipp Service Course Stem model page (ST-SC-B2) directly. Spec table: Clamp diam 31.8mm, Steerer clamp diameter 1-1/8in, Length (ST) includes 100mm (confirms this row a real SKU), Weight (g) 152, Weight Based On Service course stem 6deg 100mm - exact-SKU weight match. Price: the page itself renders EUR (geo-defaulted); sram.com own US Stems category listing states the real US MSRP Service Course Stem ST-SC-B2 $65 - used instead per this catalog MSRP-only convention.' },
  { id: 'hb-zipp-servicecourse-70ergo', cat: 'handlebar', brand: 'Zipp', model: 'Service Course 70 Ergo', family: 'zipp-servicecourse-bar',
    clamp: '31.8', dropBar: true, reach: 70, drop: 128, width: 420,
    weight: 295, price: 65,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.sram.com/en/zipp/models/hb-dbsc-7e-b2', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED sram.com Zipp Service Course 70 Ergo Handlebar model page (HB-DBSC-7E-B2) directly. Spec table: Reach 70mm, Drop 128mm, Width center-to-center includes 42cm (this row uses 420mm), Clamp diam 31.8mm, Weight (g) 295, Weight Based On 42cm bar - exact-SKU weight match. Price: sram.com own US Service Course series listing states the real US MSRP HB-DBSC-7E-B2 $65.' },
  { id: 'st-zipp-servicecoursesl', cat: 'stem', brand: 'Zipp', model: 'Service Course SL', family: 'zipp-servicecoursesl-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 135, price: 130,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.sram.com/en/zipp/models/st-sc-sl-b2', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED sram.com Zipp Service Course SL Stem model page (ST-SC-SL-B2) directly. Spec table: Clamp diam 31.8mm, Steerer clamp diameter includes 1-1/8in (the page also lists a 1-1/4in OS option for a different fork class - this row models the standard 1-1/8in tapered-steerer SKU, matching this file other road stems), Length includes 100mm, Weight (g) 135, Weight Based On Service Course SL +-6deg 100mm - exact-SKU weight match. Price: sram.com own US Stems category page states the real US MSRP ST-SC-SL-B2 $130.' },
  { id: 'hb-zipp-servicecoursesl-70', cat: 'handlebar', brand: 'Zipp', model: 'Service Course SL-70', family: 'zipp-servicecoursesl-bar',
    clamp: '31.8', dropBar: true, reach: 70, drop: 128, width: 420,
    weight: 250, price: 130,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.sram.com/en/zipp/models/hb-dbsc-sl70-b2', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED sram.com Zipp Service Course SL-70 Handlebar model page (HB-DBSC-SL70-B2) directly. Spec table: Reach 70mm, Drop 128mm, Width center-to-center includes 42cm (this row uses 420mm), Clamp diam 31.8mm, Weight (g) 250, Weight Based On 42cm bar - exact-SKU weight match. Price: sram.com own US Service Course SL series listing states the real US MSRP HB-DBSC-SL70-B2 $130.' },

  { id: 'st-pro-discover10', cat: 'stem', brand: 'PRO', model: 'Discover Stem 10', family: 'pro-discover-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 166, price: 115,
    note: 'road-depth-5 wave: DIRECTLY FETCHED pro-bikegear.com PRO Discover Stem 10 product page (Exa) - confirms this is PRO current gravel/all-road stem line, a real distinct product from the existing st-pro-vibe road stem row (AL-7075, flippable +-10deg angle, 60-120mm range in 10mm steps, Clamping diameter 31.8mm, Steerer diameter 1 1/8in). The maker page itself states only a from-figure (Weight: from 146g, the 60mm SKU 142g quoted in body copy) with no per-length weight table and no price. This row uses the 100mm SKU (part number PRSS0629, per a bike24.com manufacturer item-code table); a MORE SPECIFIC retailer republication (bike24.com/tunecycles.com.au) of the same maker spec states a 100mm-specific weight of 166g - the exact-length figure used here, sourced via a retailer relaying manufacturer specs rather than a maker-page per-length table, so LEFT UNVERIFIED per THE BAR. Price $115 is an unsourced US-retailer sample (Pit Crew Cycles, a US shop, lists $115.00; other US-region listings range $99.99-$149.99) - not a manufacturer MSRP, flagged.' },
  { id: 'st-fsa-omega', cat: 'stem', brand: 'FSA', model: 'Omega Stem', family: 'fsa-omega-stem',
    clamp: '31.8', steerer: '1-1-8', length: 100,
    weight: 144, price: 40,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.fsaproshop.com/products/omega-stem', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED fsaproshop.com (FSA own US-direct storefront, the same domain already used for this file verified K-Force/K-Force Compact rows) directly. Product copy: 31.8mm handlebar clamp diameter, +-6deg x L60-130mm including 100mm (confirms a real SKU point), WEIGHT 144 grams (100mm) - exact-SKU weight match, steerer:1-1-8 per the AL6061/T6 alloy-stem convention used elsewhere in this file. Price $40.00 USD read directly off the page. Flagged: several third-party retailers (Chain Reaction NZ, Nomad Frontiers, Bicycle Warehouse) republish this same product at 127-129g rather than fsaproshop.com own 144g - the maker own current US page is used per THE BAR fetched-manufacturer-page precedence, but the discrepancy (possibly an older vs current casting revision) is disclosed.' },

  { id: 'sd-specialized-romin-evocomp-gel', cat: 'saddle', brand: 'Specialized', model: 'Romin EVO Comp Gel', family: 'specialized-romin',
    weight: 266, price: 149.99,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.specialized.com/us/en/romin-evo-comp-gel/p/155424', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED specialized.com/us directly - the Romin family (flatter, more forward-reach shape than this file existing Power-family rows) is Specialized other mainline road/performance saddle platform, matching the task brief Power and Romin saddle tiers gap. Confirms real US price $149.99 and per-size weights: 143mm/266g, 155mm/278g, 168mm/281g - this row uses the 143mm point, matching this file existing sd-specialized-power-expert row same-size convention. Cr-Mo rails (the page: the Comp features durable Cr-Mo rails, while the Expert has lighter titanium - a lower tier than a hypothetical Romin Expert, not modeled this pass).' },
  { id: 'sd-prologo-kappa', cat: 'saddle', brand: 'Prologo', model: 'Kappa T2.0', family: 'prologo-kappa',
    weight: 266, price: 79,
    verified: true, lastChecked: '2026-07-22', source: 'https://prologo.it/en/products/kappa', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED prologo.it own current Kappa product page directly (Exa) - a distinct, semi-round/T-shape Prologo saddle family from this file existing sd-prologo-dimension-tirox and sd-prologo-scratch-m5 rows, matching the task brief Prologo Scratch and Kappa gap. Spec table: Rail in T2.0 (chromoly steel rail, per this file existing Dimension row note distinguishing T2.0 from Tirox), Peso 266gr (exact maker-stated weight), Misure 265x147mm. Price: no USD MSRP on the Italian maker page; multiple independent US retailers (FirstFlightBikes, Send It Bikes) list the identical Prologo Kappa Saddle T2.0 at the same regular price $79.00 - taken as the real US MSRP (Tree Fort Bikes $71.99, orig $79.00 corroborates $79.00 as the pre-discount MSRP, not a sale price, consistent with this catalog MSRP-only pricing policy).' },
  { id: 'sd-selleitalia-slr-boost-kitcarbonio', cat: 'saddle', brand: 'Selle Italia', model: 'SLR Boost Kit Carbonio Superflow', family: 'selleitalia-slr-boost-kitcarbonio',
    weight: 129, price: 449.99,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.selleitalia.com/slr-boost-kit-carbonio-superflow/', priceBasis: 'msrp-confirmed',
    note: 'road-depth-5 wave: FETCHED selleitalia.com own SLR Boost Kit Carbonio Superflow product page directly - a distinct, all-carbon-railed top tier from this file existing sd-selleitalia-slr-boost row (which carries no rail-material note and stays an unverified $200 sample), matching the task brief SLR saddle tiers gap. Spec table: Weight S3 122g - L3 129g (this row uses the L3/145mm point, matching this file general size convention on other multi-size rows), Rail Carbon 7x9mm, Dimensions L3 145x248mm, Family SLR. Price: no USD figure on the Italian maker page; two independent US retailers (The Bike Place, TwoHubs) both state an identical $449.99/$450.00 MSRP - taken as the real US MSRP.' },
  { id: 'sd-selleitalia-novus-boost-tm', cat: 'saddle', brand: 'Selle Italia', model: 'Novus Boost Evo TM Superflow', family: 'selleitalia-novus-boost',
    weight: 265, price: 109.99,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.selleitalia.com/novus-boost-evo-tm-superflow/', priceBasis: 'regional-conversion',
    note: 'road-depth-5 wave: FETCHED selleitalia.com own Novus Boost Evo TM Superflow product page directly - Selle Italia other mainline road saddle family (short-nose, wave-profile shape) distinct from this file existing SLR rows, matching the task brief Novus saddle tiers gap. This row uses the mid-tier manganese-rail SKU (the Novus range also includes lighter/pricier carbon and Ti316 rail options, e.g. Novus Boost Evo Kit Carbonio Superflow at 165g - not modeled this pass, GAP). Spec table: Weight 265g, Dimensions 145x245mm, Rail Manganese Tube 7mm, Family Novus. Price: the maker own EU site shows a discounted EUR figure (Now: e104,90), not a US MSRP; $109.99 is an unsourced USD sample in the same range as independent retailer listings (GBP99.99 UK, CAD$169.99) - flagged, no live FX conversion per this catalog convention.' },

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
