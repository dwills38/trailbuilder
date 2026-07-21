// data/striders.js — kids' balance-bike ("strider") catalog
//
// Version: 0.1.0  |  Date: 2026-07-17
//
// *** OFF-LIVE. *** Nothing the site serves (index.html, bmx.html, src/compat.js,
// src/compat-bmx.js) loads this file. See data/STRIDER-MODEL.md for the data-model
// spec and data/STRIDER-ANALYSIS.md for the product/market analysis this round
// produced. Wired only into validate.js (a "STRIDER OK" gate line) and this
// module's own tests, if/when added. Stays off-live until Douglas's go-live word
// (CLAUDE.md hard rule 3).
//
// Plain browser JavaScript, no build step, no imports/exports, no CDN — same
// convention as src/compat.js / data/bmx.js. Defines top-level `var` globals only.
//
// PROVENANCE: cat:'balancebike' rows. Per data/STRIDER-MODEL.md section 2's fetchability
// finding, manufacturer balance-bike pages are largely walled/JS-heavy (Strider 403s;
// Specialized 403s direct-fetch); the cross-brand review aggregators (twowheelingtots,
// Ready Set Pedal, Rascal Rides, Cascade Gear Reviews, Wirecutter, downtown-mag,
// littlebigbikes) are the normalized, credible-source basis for the spec table gathered
// in the STRIDER-ANALYSIS/MODEL research round (fetched 2026-07-17 — see MODEL section 2
// for the exact aggregator per row). Per catalog policy, aggregator-sourced specs are
// UNVERIFIED SAMPLE data (never `verified:true` — that requires a fetched maker page);
// every row below is a real, currently-or-recently-sold model, never fabricated.
// seatMin/seatMax (the load-bearing fit fields) are left BLANK rather than guessed
// wherever the source only published a rider-height range or no seat-height figure —
// THE BAR: a blank beats a guessed number, always.
//
// No e-bikes / motors / batteries anywhere in this file (balance bikes are unpowered
// by definition — data/STRIDER-MODEL.md's opening note).

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------
/** @type {any[]} */
var STRIDER_PARTS = [

  {
    id: 'sb-woom-1-go1', cat: 'balancebike', brand: 'woom', model: '1 / GO 1',
    wheel: '12', seatMin: 259, seatMax: 353, bikeWeight: 2903, tire: 'air',
    brake: 'rear-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 249,
    note: 'Entry woom balance bike (sold as "GO 1" outside the US since a 2023 rebrand).',
    verified: true, lastChecked: '2026-07-18', sourceType: 'maker',
    source: 'https://woom.com/en_US/products/go-1-toddler-balance-bike',
    desc: 'Verified — woom.com GO 1 product page spec table (seat height 10.2-13.9in, weight 6lb 6oz, AA 6061 aluminum frame, mini V-brake).'
  },
  {
    id: 'sb-woom-1plus-go1plus', cat: 'balancebike', brand: 'woom', model: '1 PLUS / GO 1 PLUS',
    wheel: '14', seatMin: 366, seatMax: 432, bikeWeight: 4337, tire: 'air',
    brake: 'dual-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 299,
    note: 'Taller sibling of the woom 1, 14" wheel (corrected 2026-07-18 — prior wave incorrectly carried wheel:12 for this model).',
    verified: true, lastChecked: '2026-07-18', sourceType: 'maker',
    source: 'https://woom.com/en_US/products/go-1-plus-toddler-balance-bike',
    desc: 'Verified — woom.com GO 1 PLUS product page spec table (seat height 14.4-17in, weight 9lb 9oz, 14in wheels, dual independent mini V-brakes, AA 6061 aluminum frame).'
  },
  {
    id: 'sb-strider-12-classic', cat: 'balancebike', brand: 'Strider', model: '12 Classic',
    wheel: '12', seatMin: 279, seatMax: 406, bikeWeight: 2900, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 89.99,
    note: 'The category-defining minimalist balance bike; steel frame, puncture-proof foam tires. NOTE (2026-07-20): appears DISCONTINUED — no product page survives on striderbikes.com (only "12 Sport", "12 Pro" and a new composite-frame "12 Comp" remain in the current lineup); Performance Bicycle and FortNine both list this exact SKU as "Discontinued"/"discontinued and no longer available for purchase". Row kept (a real, formerly-sold model, not fabricated) since it may still show up secondhand/in old retailer stock.',
    desc: 'Unverified sample (maker page gone — see note) — spec basis: byte-identical manufacturer copy syndicated across 5 independent retailers (babycommon.com, shorelineoftahoe.com, grasseriveroutfitters.com, albrechtcycle.com, gcmurphy.com — Assembled Weight 2.9kg/6.5lb, Seat Height 28-41cm/11-16in, Steel Frame, Max Rider Weight 27kg/60lb), cross-checked 2026-07-20 via Exa search. Does not meet THE BAR for verified:true (no fetched striderbikes.com page — the model itself is gone from their site), but the retailer-syndicated text is corroborated highly enough to trust as sample data.'
  },
  {
    id: 'sb-strider-12-sport', cat: 'balancebike', brand: 'Strider', model: '12 Sport',
    wheel: '12', seatMin: 279, seatMax: 432, bikeWeight: 3039, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 169.99,
    note: 'Adds an XL seatpost (extends max seat height to ~19in/483mm per the maker; stock post shown here). Price corrected 2026-07-20 from a stale $119.99 sample to the current striderbikes.com $169.99 MSRP.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://striderbikes.com/balance-bikes/12-sport/',
    desc: 'Verified — striderbikes.com 12 Sport product page (Exa-fetched 2026-07-20, striderbikes.com direct WebFetch 403s): Seat Height 28-43cm/11-17in, Assembled Weight 3.0kg/6.7lb, Steel Frame, Flat-Free Foam Rubber 12in Tires, no brake, $169.99 (schema.org Offer price).'
  },
  {
    id: 'sb-strider-12-pro', cat: 'balancebike', brand: 'Strider', model: '12 Pro',
    wheel: '12', seatMin: 279, seatMax: 432, bikeWeight: 2500, tire: 'foam',
    brake: 'none', frameMaterial: 'aluminum', price: 219.99,
    note: '"World\'s Lightest Strider" — aluminum frame. Corrected 2026-07-20: seatMax was 406 (11-16in), maker states 11-17in (432); weight/price corrected against the maker page.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://striderbikes.com/balance-bikes/12-pro/',
    desc: 'Verified — striderbikes.com 12 Pro product page (Exa-fetched 2026-07-20, striderbikes.com direct WebFetch 403s): Seat Height 28-43cm/11-17in, "World\'s Lightest Strider" 2.5kg/5.6lb, Aluminum Frame, Foam Rubber 12in Tires, no brake, $219.99 (schema.org Offer price).'
  },
  {
    id: 'sb-strider-14x', cat: 'balancebike', brand: 'Strider', model: '14x',
    wheel: '14', seatMin: 381, seatMax: 559, bikeWeight: 5670, tire: 'air',
    brake: 'none', convertsToPedal: true, frameMaterial: 'steel', price: 249.99,
    note: 'Balance-to-pedal convertible; an Easy-Ride pedal kit ($89-99) bolts on and adds a coaster brake (weight with kit: 6.9kg/15.1lb). Pedal-kit row/pedalkit-fit compat rule not yet modeled this round (data/STRIDER-MODEL.md sec 6) — future work. Corrected 2026-07-20: frameMaterial was "aluminum", maker states steel frame and fork.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://striderbikes.com/convertible-bikes/14x-classic/',
    desc: 'Verified — striderbikes.com 14x product page (Exa-fetched 2026-07-20, striderbikes.com direct WebFetch 403s): Seat Height 38-55cm/15-22in, Weight w/o pedal kit 5.7kg/12.5lb, Frame and Fork Steel, 14x1.75in air tires (Schrader tube), Brakes in Balance Mode: None, $249.99 (schema.org Offer price).'
  },
  {
    id: 'sb-specialized-hotwalk', cat: 'balancebike', brand: 'Specialized', model: 'Hotwalk',
    wheel: '12', seatMin: 310, seatMax: 432, bikeWeight: 4082, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', price: 269,
    note: 'Airless-tire option also sold; brakeless by design like the Strider line.',
    desc: 'Unverified sample — spec basis: specialized.com product page via Exa search (STRIDER-MODEL.md sec 2), cross-checked against twowheelingtots\' Hotwalk review.'
  },
  {
    id: 'sb-specialized-hotwalk-carbon', cat: 'balancebike', brand: 'Specialized', model: 'Hotwalk Carbon',
    wheel: '12', seatMin: 330, seatMax: 432, bikeWeight: 1999, tire: 'air',
    brake: 'none', frameMaterial: 'carbon', price: 1000,
    note: 'Halo carbon frame/fork/bars/wheels; the lightest bike in this catalog by a wide margin.',
    desc: 'Unverified sample — spec basis: specialized.com product page via Exa search (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-cannondale-kids-trail-balance', cat: 'balancebike', brand: 'Cannondale', model: 'Kids Trail Balance',
    wheel: '12', heightMin: 940, heightMax: 1070, bikeWeight: 3901, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 180,
    note: 'Seat-height range not published by Cannondale — only a rider-height range (94-107cm); seatMin/seatMax intentionally left blank rather than derived/guessed (THE BAR).',
    desc: 'Unverified sample — spec basis: cannondale.com product page via Exa (STRIDER-MODEL.md sec 2) + Cannondale kids buying guide.'
  },
  {
    id: 'sb-prevelo-alpha-zero', cat: 'balancebike', brand: 'Prevelo', model: 'Alpha Zero',
    wheel: '12', seatMin: 277, seatMax: 355, bikeWeight: 3130, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 259,
    note: 'Mk III. Corrected 2026-07-18 against the maker page (prior wave carried aggregator-estimated seat height/weight/price).',
    verified: true, lastChecked: '2026-07-18', sourceType: 'maker',
    source: 'https://prevelo.com/products/alpha-zero',
    desc: 'Verified — prevelo.com Alpha Zero Mk III spec table (seat height 10.9-14in, weight 6.9lb, 6061 aluminum frame, rear hand brake, $259).'
  },
  {
    id: 'sb-earlyrider-bigfoot-12', cat: 'balancebike', brand: 'Early Rider', model: 'Big Foot 12',
    wheel: '12', seatMin: 310, seatMax: 409, bikeWeight: 3765, tire: 'air',
    brake: 'rear-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 269,
    note: 'Knobby off-road tire; UK brand, EU-market strong.',
    desc: 'Unverified sample — spec basis: cascadegearreviews.com + downtown-mag.com (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-frog-tadpole-mini', cat: 'balancebike', brand: 'Frog', model: 'Tadpole Mini',
    wheel: '10', seatMin: 241, seatMax: 312, bikeWeight: 3447, tire: 'air',
    brake: 'rear-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 300,
    note: 'The lowest seat-height bike in this catalog (10in wheel) — the "start them earliest" segment; Frog commissioned Brunel University child-fit research (STRIDER-ANALYSIS.md sec 1b).',
    desc: 'Unverified sample — spec basis: cascadegearreviews.com (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-retrospec-cub', cat: 'balancebike', brand: 'Retrospec', model: 'Cub',
    wheel: '12', seatMin: 292, seatMax: 381, bikeWeight: 3175, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 79,
    note: 'Budget-tier entry, foam tires, no brake.',
    desc: 'Unverified sample — spec basis: twowheelingtots (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-retrospec-cub-plus', cat: 'balancebike', brand: 'Retrospec', model: 'Cub Plus',
    wheel: '12', seatMin: 292, seatMax: 381, bikeWeight: 3946, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'steel', price: 119,
    note: 'Air-tire/hand-brake step-up from the base Cub, same seat range.',
    desc: 'Unverified sample — spec basis: twowheelingtots (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-guardian-balance-bike', cat: 'balancebike', brand: 'Guardian', model: 'Balance Bike',
    wheel: '12', seatMin: 318, seatMax: 406, bikeWeight: 3856, tire: 'air',
    brake: 'rear-hand', brakeReach: 'short', steeringLimiter: true, frameMaterial: 'aluminum', price: 149,
    note: 'SureStop hand brake sized for small hands (short lever reach). Maker page confirms weight/price/frame/brake exactly; seatMin/seatMax carried from twowheelingtots since guardianbikes.com states only an 11.5in minimum leg length, not an explicit seat-height range.',
    verified: true, lastChecked: '2026-07-18', sourceType: 'maker',
    source: 'https://guardianbikes.com/products/balance-bike',
    desc: 'Verified (partial) — guardianbikes.com product page confirms weight 8.5lb, price $149, aluminum frame, single-lever SureStop brake; seat height retained from twowheelingtots (maker states only min leg length, not a seat-height range). Corrected frameMaterial from steel to aluminum per the maker page.'
  },
  {
    id: 'sb-littlebig-3in1', cat: 'balancebike', brand: 'LittleBig', model: '3-in-1',
    wheel: '14', seatMin: 305, seatMax: 508, bikeWeight: 4627, tire: 'air',
    brake: 'dual-hand', convertsToPedal: true, frameMaterial: 'aluminum', price: 295,
    note: 'Grows from a small balance bike into a larger balance bike, then a pedal bike, via included conversion parts (~$95 upgrade kit); bikeWeight is the smaller balance-mode configuration. Pedal-kit compat modeling deferred (data/STRIDER-MODEL.md sec 6).',
    desc: 'Unverified sample — spec basis: littlebigbikes.com + rascalrides.com (STRIDER-MODEL.md sec 2).'
  },

  // --- wave 2 (catalog/striders-2) — broadened brand coverage ---------------

  {
    id: 'sb-puky-lr-m', cat: 'balancebike', brand: 'Puky', model: 'LR M',
    wheel: '8', seatMin: 300, seatMax: 400, bikeWeight: 3560, tire: 'solid-rubber',
    brake: 'none', frameMaterial: 'steel', footrest: true, steeringLimiter: false, price: 108,
    note: 'German budget-entry balance bike (8.8in solid-plastic wheels; nearest catalog wheel vocab value "8" used, actual size noted here). No steering limiter (downtown-mag: "There\'s no steering limiter either"). Price converted from the EUR99 list price at time of research.',
    desc: 'Unverified sample — spec basis: downtown-mag.com PUKY LR M test (weight, price) + kidsbikeshop.co.uk PUKY sizing guide (seat height 30-40cm) + puky.de product page.'
  },
  {
    id: 'sb-kokua-likeabike-jumper-12', cat: 'balancebike', brand: 'Kokua', model: 'LIKEaBIKE Jumper 12',
    wheel: '12', seatMin: 340, seatMax: 440, bikeWeight: 3400, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', steeringLimiter: true, price: 328,
    note: 'Premium German balance bike; ships with a rear elastomer suspension (not modeled — schema has no suspension field) and a steering damper (mapped to steeringLimiter). No hand brake.',
    desc: 'Unverified sample — spec basis: kokua-shop.com / kokuabikesusa.com product pages (seat height, weight, price) cross-checked against twowheelingtots\' Jumper review (BRAKES: No).'
  },
  {
    id: 'sb-banwood-first-go', cat: 'balancebike', brand: 'Banwood', model: 'First Go',
    wheel: '12', seatMin: 370, seatMax: 440, bikeWeight: 4500, tire: 'air',
    brake: 'none', frameMaterial: 'steel', price: 199,
    note: 'Design-forward premium steel balance bike with wicker basket; maker states no brake system ("The first go has no brake system").',
    desc: 'Unverified sample — spec basis: banwood.us product page (seat height, weight, price, no-brake statement).'
  },
  {
    id: 'sb-schwinn-elm', cat: 'balancebike', brand: 'Schwinn', model: 'Elm',
    wheel: '12', seatMin: 362, seatMax: 425, bikeWeight: 3810, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', steeringLimiter: true, price: 69,
    note: 'Budget-tier steel balance bike with foam (Mag wheel/EVA) tires and a ball-bearing headset steering limiter; sold mainly via Amazon/mass retail under $70.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Schwinn balance-bike roundup (own-measured seat height/weight, since Schwinn/Amazon don\'t publish them) + schwinnbikes.com product page (features, price).'
  },
  {
    id: 'sb-schwinn-skip2', cat: 'balancebike', brand: 'Schwinn', model: 'Skip 2',
    wheel: '12', seatMin: 381, seatMax: 432, bikeWeight: 3266, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 59,
    note: 'Entry model of the older Schwinn Skip line (predecessor to Elm/Koen); lightest and cheapest of the Schwinn balance-bike lineup.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Schwinn balance-bike roundup (own-measured seat height/weight — Schwinn/Amazon don\'t publish them).'
  },
  {
    id: 'sb-wishbone-recycled-3in1', cat: 'balancebike', brand: 'Wishbone', model: 'Recycled 3-in-1',
    wheel: '12', seatMin: 229, seatMax: 508, bikeWeight: 5171, tire: 'air',
    brake: 'none', frameMaterial: 'composite', price: 229.99,
    note: 'Trike-to-balance-bike convertible made from recycled ocean/carpet plastic; the widest seat-height range in this catalog (9-20in) via a flip-frame + adjustable seatpost. bikeWeight is the 2-wheel balance-bike configuration (11.4lb per rascalrides); the 3-wheel trike mode weighs more. Retail price varies $199.99-$289.99 across sellers; $229.99 used (shopkidsplaysets.com).',
    desc: 'Unverified sample — spec basis: twowheelingtots.com + rascalrides.com reviews (seat height, weight) + wishbonedesign.com product page; price from shopkidsplaysets.com.'
  },
  {
    id: 'sb-kinderfeets-classic', cat: 'balancebike', brand: 'Kinderfeets', model: 'Classic',
    wheel: '12', seatMin: 300, seatMax: 380, bikeWeight: 3300, tire: 'foam',
    brake: 'none', frameMaterial: 'wood', footrest: true, price: 139.99,
    note: 'Birch-wood balance bike with footpegs and EVA airless (foam) tires. Wheel diameter not explicitly published by the maker; 12in used per the bike\'s stated seat-height/size class and is consistent with comparable wood balance bikes (display-only field, not fit-critical per STRIDER-MODEL.md sec 4).',
    desc: 'Unverified sample — spec basis: kinderfeets.com/kinderfeets.co.nz product pages (seat height, weight, price, materials).'
  },
  {
    id: 'sb-chillafish-bmxie2', cat: 'balancebike', brand: 'Chillafish', model: 'BMXie2',
    wheel: '12', seatMin: 320, seatMax: 390, bikeWeight: 3600, tire: 'rubber-foam',
    brake: 'none', frameMaterial: 'composite', footrest: true, price: 75,
    note: 'Reinforced-plastic BMX-styled balance bike with airless "Rubberskin"-covered foam tires (puncture-proof) and an integrated footbrake — no vocab value exists for a foot-operated brake (schema brake enum is hand/coaster only), so brake is left "none"; the footbrake is a real feature, noted here rather than misrepresented as a hand brake.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Chillafish review (seat height, weight, tire construction) + info.chillafish.com/product/bmxie-nb (official seat-height spec, price).'
  },
  {
    id: 'sb-yedoo-tootoo', cat: 'balancebike', brand: 'Yedoo', model: 'TooToo',
    wheel: '12', seatMin: 317, seatMax: 419, bikeWeight: 3765, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'steel', price: 159,
    note: 'Steel-frame balance bike with a Tektro short-reach hand brake and Kenda pneumatic tires; low ~12in standover suits younger toddlers. An optional extended seat post (shared with Strider) raises max seat height to ~19.5in.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Yedoo TooToo/YooToo review (seat height, weight, price, brake).'
  },
  {
    id: 'sb-yedoo-yootoo', cat: 'balancebike', brand: 'Yedoo', model: 'YooToo',
    wheel: '12', seatMin: 305, seatMax: 438, bikeWeight: 3583, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 199,
    note: 'Aluminum-frame step-up sibling of the Yedoo TooToo; lighter, taller max seat height, same Tektro hand brake.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Yedoo TooToo/YooToo review (seat height, weight, price, brake).'
  },
  {
    id: 'sb-giant-pre', cat: 'balancebike', brand: 'Giant', model: 'Pre',
    wheel: '12', seatMin: 310, seatMax: 430, bikeWeight: 4010, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', footrest: true, price: 130,
    note: 'Giant\'s entry kids\' balance bike (ALUXX aluminum frame, thermo-formed polymer fork); US RRP cited by BikeExchange\'s group test (giant.com regional pricing varies).',
    desc: 'Unverified sample — spec basis: bikeexchange.com group-test measurements (weight, seat height, US RRP) + giant.com/giantnorthlakes.com.au product pages (frame/fork materials, footrest).'
  },
  {
    id: 'sb-coop-rev-12', cat: 'balancebike', brand: 'Co-op Cycles', model: 'REV 12',
    wheel: '12', bikeWeight: 4091, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', price: 169,
    note: 'REI\'s house-brand balance bike; REI publishes a child-inseam fit range (12-17in) rather than a seat-height range, so seatMin/seatMax are left blank rather than guessed (THE BAR) — inseam and seat height are related but not identical measurements. Maker confirms no brake ("The REV BAL does not have brakes").',
    desc: 'Unverified sample — spec basis: rei.com product/category pages (weight, price, inseam range) + Co-op REV BAL owner\'s manual (no-brake statement).'
  },

  // --- wave 3 (catalog/striders-3) — Early Rider infant tier, budget/lightweight
  // brands, the Strider convertible top of the range, and three more EU brands ---

  {
    id: 'sb-earlyrider-bella-velio', cat: 'balancebike', brand: 'Early Rider', model: 'Bella Velio',
    wheel: '8', seatMin: 215, seatMax: 245, bikeWeight: 2800, tire: 'foam',
    brake: 'none', frameMaterial: 'wood', price: 229,
    note: 'Infant-tier balance bike (8in spherical wheels, rear-wheel-steer "Active Balance Control" system) with a removable parent-tiller handle; girls\'-pattern sibling of the Velio.',
    verified: true, lastChecked: '2026-07-18', sourceType: 'maker',
    source: 'https://us.earlyrider.com/products/bella-velio-balance-bike-for-1-year-old',
    desc: 'Verified — us.earlyrider.com product page spec table (seat height 8.46-9.65in, weight 2.8kg/6.2lb, walnut+birch laminate frame, puncture-proof EVA foam tires, no brake, $229).'
  },
  {
    id: 'sb-radioflyer-ultra-lite', cat: 'balancebike', brand: 'Radio Flyer', model: 'Ultra Lite',
    wheel: '12', seatMin: 318, seatMax: 419, bikeWeight: 3289, tire: 'air',
    brake: 'none', frameMaterial: 'magnesium', price: 99.99,
    note: 'Mass-retail lightweight magnesium-frame balance bike (Radio Flyer\'s step-up from the steel Air Ride); no brake.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Radio Flyer balance-bike review (seat height, weight, frame material, tire, brake) + radioflyer.com product page ($99.99 list price).'
  },
  {
    id: 'sb-bixe-12', cat: 'balancebike', brand: 'Bixe', model: '12',
    wheel: '12', seatMin: 292, seatMax: 394, bikeWeight: 2086, tire: 'foam',
    brake: 'none', frameMaterial: 'aluminum', price: 60,
    note: 'Budget/lightweight Amazon-marketplace balance bike; foam tires on plastic rims, no brake.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com + kiddingzone.com Bixe reviews (seat height 11.5-15.5in, weight 4.6lb, aluminum frame, foam tires, no brake) + amazon.com listing (price).'
  },
  {
    id: 'sb-bixe-16', cat: 'balancebike', brand: 'Bixe', model: '16',
    wheel: '16', seatMin: 464, seatMax: 569, bikeWeight: 5443, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 90,
    note: 'Step-up size in the Bixe lineup for bigger kids (ages ~4-9); air tires and a hand brake, unlike the 12in model. A separate "16 Pro" trim also exists (twowheelingtots cites 13-14.9lb for it) but wasn\'t pinned to a distinct sourced spec table this round, so only the base 16 is entered.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Bixe review (seat height 18.25-22.4in, weight 12lb, aluminum frame) + campingworld.com/walmart.com listings (price, brake, tire).'
  },
  {
    id: 'sb-strider-20x-sport', cat: 'balancebike', brand: 'Strider', model: '20x Sport',
    wheel: '20', seatMin: 545, seatMax: 840, bikeWeight: 11700, tire: 'air',
    brake: 'dual-hand', convertsToPedal: true, frameMaterial: 'steel', price: 399.99,
    note: 'Top of the Strider convertible range — grows from a big-kid balance bike into a 20in-wheel pedal bike via a bolt-on kit (ages 8-adult, quick-release seatpost clamp). Pedal-kit compat modeling deferred (data/STRIDER-MODEL.md sec 6). Brake is front+rear lever-operated drum brakes (mapped to dual-hand — two separate hand levers, drum not rim). Corrected 2026-07-20: frameMaterial was "aluminum", maker states steel frame and fork; price corrected from a stale $379 sample to the current $399.99 MSRP.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://striderbikes.com/convertible-bikes/20x-sport/',
    desc: 'Verified — striderbikes.com 20x Sport product page (Exa-fetched 2026-07-20, striderbikes.com direct WebFetch 403s): Seat Height 54.5-84cm/21.5-33.1in, Weight w/o pedal kit 11.7kg/25.8lb, Frame and Fork Steel, 20x1.75in air tires, Front and Rear Lever Operated Drum Brakes, $399.99 (schema.org Offer price).'
  },
  {
    id: 'sb-kubikes-12', cat: 'balancebike', brand: 'KUbikes', model: '12',
    wheel: '12', bikeWeight: 3500, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 169,
    note: 'German-assembled premium balance bike with hand-laced wheels. Only a recommended-inseam range (12.4-15.7in) is published, not a seat-height range, so seatMin/seatMax are left blank rather than guessed (THE BAR). Price converted from the EUR169 list price at time of research.',
    desc: 'Unverified sample — spec basis: downtown-mag.com KUbikes 12 test (weight 3.5kg) + sm-parts.net listing (rear brake, aluminum frame, EUR169 price).'
  },
  {
    id: 'sb-moustache-mercredi-12', cat: 'balancebike', brand: 'Moustache', model: 'Mercredi 12',
    wheel: '12', seatMin: 340, seatMax: 410, bikeWeight: 3420, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', footrest: true, price: 249,
    note: 'French brand (best known for e-bikes) kids balance bike; single-tube hydroformed alloy frame + fork, removable footrest.',
    desc: 'Unverified sample — spec basis: downtown-mag.com Moustache Mercredi 12 test (weight 3.42kg, seat height 34-41cm, price EUR249, footrest, alloy frame) + ribblevalley-e-bikes.co.uk listing.'
  },
  {
    id: 'sb-propain-bambam', cat: 'balancebike', brand: 'Propain', model: 'Bam Bam',
    wheel: '14', heightMin: 900, heightMax: 1100, bikeWeight: 4440, tire: 'rubber-foam',
    brake: 'none', frameMaterial: 'aluminum', price: 249,
    note: 'German gravity-brand\'s kids balance bike; maker fits by rider height (90-110cm), not seat height, so seatMin/seatMax are left blank (THE BAR). No brake by design (maker: young children lack the grip strength to use one safely); a disc-brake mount exists but ships without a caliper.',
    desc: 'Unverified sample — spec basis: downtown-mag.com Propain Bam Bam test (weight 4.44kg) + propain-bikes.com/thebikedads.com press coverage (14in knobby tires, height fit 90-110cm, no-brake rationale, aluminum frame, EUR249 price).'
  }

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STRIDER_PARTS: STRIDER_PARTS };
}
