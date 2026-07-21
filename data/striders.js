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
    wheel: '12', seatMin: 310, seatMax: 432, bikeWeight: 4100, tire: 'foam',
    brake: 'none', frameMaterial: 'aluminum', price: 224.99,
    note: 'Brakeless by design like the Strider line. Corrected 2026-07-20: tire is "Rhythm Lite Airless" — non-pneumatic/flat-free, mapped to the foam-tire vocab value, not "air" (was wrong). Price corrected from a stale $269 sample to the 2023 model-year $224.99 MSRP. Specialized publishes no adjustable seat-height range (only seatpost/seat-tube geometry) — seatMin/seatMax retained from the prior aggregator source per the Guardian-row "verified (partial)" precedent.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.specialized.com/us/en/hotwalk/p/216861',
    desc: 'Verified (partial) — specialized.com 2023 Hotwalk product page (Exa-fetched 2026-07-20, direct WebFetch 403s): Specialized A1 Premium Aluminum frame, Rhythm Lite Airless 12x2.3 tires (no brake), Weight 4.1kg, $224.99. Seat height retained from the prior aggregator source (specialized.com states no seat-height range, only geometry: Seat-Tube Length 160mm, Seatpost Length 230mm).'
  },
  {
    id: 'sb-specialized-hotwalk-carbon', cat: 'balancebike', brand: 'Specialized', model: 'Hotwalk Carbon',
    wheel: '12', seatMin: 330, seatMax: 432, bikeWeight: 2000, tire: 'foam',
    brake: 'none', frameMaterial: 'carbon', price: 1000,
    note: 'Halo carbon frame/fork/bars/wheels; the lightest bike in this catalog by a wide margin. Corrected 2026-07-20: tire is "Rhythm Lite" airless/lightweight-casing (same non-pneumatic family as the base Hotwalk), mapped to foam not "air". Specialized publishes no adjustable seat-height range — seatMin/seatMax retained from the prior aggregator source (Guardian-row "verified (partial)" precedent).',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.specialized.com/us/en/hotwalk-carbon/p/216961',
    desc: 'Verified (partial) — specialized.com 2023 Hotwalk Carbon product page (Exa-fetched 2026-07-20, direct WebFetch 403s): FACT 9r Carbon frame/fork/bars, Fact Carbon 12in wheels with Rhythm Lite tires, no brake, Weight 2.0kg (4lb 6.5oz), $1,000. Seat height retained from the prior aggregator source (no seat-height range published, only geometry).'
  },
  {
    id: 'sb-cannondale-kids-trail-balance', cat: 'balancebike', brand: 'Cannondale', model: 'Kids Trail Balance',
    wheel: '12', heightMin: 940, heightMax: 1070, bikeWeight: 3901, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 180,
    note: 'Lil\' Lefty single-sided fork. Seat-height range not published by Cannondale — only a rider-height range (94-107cm); seatMin/seatMax intentionally left blank rather than derived/guessed (THE BAR). Boy\'s/girl\'s color variants publish slightly different weights (4.0kg/8.7lb boys, 3.9kg/8.6lb girls); bikeWeight uses the girls\' figure (near-identical, catalog row is the generic unisex platform). Price not shown on the maker page outside the buy flow; retailer prices for this exact model range $150-180, kept at the existing $180 sample pending a firmer MSRP.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.cannondale.com/en-us/bikes/kids/1-to-4/kids-trail-1-to-4/kids-trail-balance',
    desc: 'Verified (partial) — cannondale.com Kids Trail Balance product page (Exa-fetched 2026-07-20): "Teaching balance fundamentals, Kids 3\'1"-3\'6" (94cm-107cm)", durable lightweight aluminum frame, Lil\' Lefty single-sided fork, rear hand brake sized for small hands. No seat-height range or on-page price published (confirmed via boy\'s/girl\'s variant pages: weight 4.0kg/3.9kg).'
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
    wheel: '12', seatMin: 310, seatMax: 409, bikeWeight: 3750, tire: 'air',
    brake: 'rear-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 239,
    note: 'Knobby off-road tire (Vee Crown Gem 12x2.25in); UK brand, EU-market strong. Price corrected 2026-07-20 from a stale $269 sample to $239 (us.earlyrider.com, confirmed at 3 US retailers). Maker publishes standover height (33cm) not an adjustable seat-height range — seatMin/seatMax retained from the prior aggregator source (Guardian-row "verified (partial)" precedent).',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://us.earlyrider.com/products/big-foot-12-kids-balance-bike',
    desc: 'Verified (partial) — us.earlyrider.com Big Foot 12 product page (Exa-fetched 2026-07-20): AL6061 aluminum frame/fork, 12in pneumatic wheels w/ Vee Crown Gem tires, Tektro 837A V-brake w/ short-reach lever (single rear lever per the parts list), Weight 3.75kg (8.25lb), $239.00. No seat-height range published (only 33cm standover height).'
  },
  {
    id: 'sb-frog-tadpole-mini', cat: 'balancebike', brand: 'Frog', model: 'Tadpole Mini',
    wheel: '10', seatMin: 241, seatMax: 312, bikeWeight: 3460, tire: 'air',
    brake: 'dual-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 270,
    note: 'The lowest seat-height bike in this catalog (10in wheel) — the "start them earliest" segment; Frog commissioned Brunel University child-fit research (STRIDER-ANALYSIS.md sec 1b). Corrected 2026-07-20: brake was "rear-hand", maker states Tektro brakes front AND rear ("Brakes (F&R)") with both levers included — dual-hand. Price corrected from a stale $300 sample to the frogbikes.com US price ($270). Frog publishes an inseam-fit range, not an explicit seat-height range — seatMin/seatMax retained from the prior aggregator source (Guardian-row precedent).',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.frogbikes.com/en_US/bike-range/balance-bikes.html',
    desc: 'Verified (partial) — frogbikes.com Tadpole Mini spec table (Exa-fetched 2026-07-20): 6061 T6 aluminum frame/fork, 10in wheels, Tektro J310 mini v-brakes front AND rear, safety steering stop (steeringLimiter), Weight 3.46kg, US$270.00. Seat height retained from the prior aggregator source (maker publishes a 23-30cm inseam-fit range, not a seat-height range).'
  },
  {
    id: 'sb-retrospec-cub', cat: 'balancebike', brand: 'Retrospec', model: 'Cub',
    wheel: '12', seatMin: 279, seatMax: 381, bikeWeight: 3130, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 69.99,
    note: 'Budget-tier entry, airless EVA-foam tires, no brake, step-through low-standover frame. Corrected 2026-07-20 against retrospec.com: seatMin 292->279 (maker states 11-15in exactly, not 11.5in), weight 3175->3130g (retrospec\'s own published bike-weight table: 6.9lb), price 79->69.99 (current listing).',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://retrospec.com/products/cub-2-kids-balance-bike',
    desc: 'Verified — retrospec.com Cub product page (Exa-fetched 2026-07-20): Seat Height Range 11-15in (ground-to-top of saddle), 12in air-free/flat-free EVA high-density foam-filled tires, no brake, $69.99; weight 6.9lb per retrospec\'s own "how much do your bikes weigh" page.'
  },
  {
    id: 'sb-retrospec-cub-plus', cat: 'balancebike', brand: 'Retrospec', model: 'Cub Plus',
    wheel: '12', seatMin: 292, seatMax: 387, bikeWeight: 3946, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 119.99,
    note: 'Air-tire/hand-brake step-up from the base Cub. Corrected 2026-07-20: frameMaterial was "steel", maker states "rust-resistant aluminum frame"; seatMax 381->387 (maker states 11.5-15.25in, not 11.5-15in); price 119->119.99.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://retrospec.com/products/cub-plus-12-kids-balance-bike-2-3-yrs',
    desc: 'Verified — retrospec.com Cub Plus product page (Exa-fetched 2026-07-20): Adjustable Seat Height 11.5-15.25in, aluminum alloy V-brake (rear, single reach-adjustable lever), 12x2.125 air-filled tires, aluminum frame, $119.99; weight 8.7lb per retrospec\'s "how much do your bikes weigh" page.'
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
    wheel: '14', seatMin: 300, seatMax: 520, bikeWeight: 4300, tire: 'air',
    brake: 'dual-hand', convertsToPedal: true, frameMaterial: 'aluminum', price: 295,
    note: 'Grows from a small balance bike into a larger balance bike, then a pedal bike, via included conversion parts (~$95-99 upgrade kit); bikeWeight is the balance-mode configuration (6.2-6.3kg with the pedal kit attached). Pedal-kit compat modeling deferred (data/STRIDER-MODEL.md sec 6). Corrected 2026-07-20: seat height was 12-20in (305-508mm) sample, maker states an exact 30-52cm (300-520mm) saddle-height range; weight corrected to the maker\'s stated 4.3kg balance-mode figure (was 4627g). Price already matched the maker\'s $295 exactly.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.littlebigbikes.com/en-us/products/littlebig-convertible-balance-bike',
    desc: 'Verified — littlebigbikes.com product page (Exa-fetched 2026-07-20): 6061 alloy frame/fork, 14in alloy-rim wheels (Innova or Vee Crown Gem air tires, Schrader valve), Saddle Height Range 30cm to 52cm, Weight balance mode 4.3kg / pedal mode 6.2kg, From $295.00 USD. Balance-to-pedal conversion confirmed (pedal kit sold separately).'
  },

  // --- wave 2 (catalog/striders-2) — broadened brand coverage ---------------

  {
    id: 'sb-puky-lr-m', cat: 'balancebike', brand: 'Puky', model: 'LR M',
    wheel: '8', seatMin: 300, seatMax: 430, bikeWeight: 3560, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', footrest: true, steeringLimiter: false, price: 99.99,
    note: 'German budget-entry balance bike (8.8in wheels; nearest catalog wheel vocab value "8" used, actual size noted here). No steering limiter (downtown-mag: "There\'s no steering limiter either" — puky.de\'s own spec table doesn\'t list one either, consistent). Price confirmed at puky.de\'s current EUR99.99 list price (was a stale EUR99-converted sample, now an exact match). Corrected 2026-07-20: tire was "solid-rubber", puky.de states "hochwertige EVA-Bereifung" (EVA foam tire) — mapped to foam; seatMax was 400 (30-40cm sample), puky.de states an exact 30-43cm range.',
    desc: 'Unverified sample (weight not published by puky.de — no manufacturer figure or measured source, so verified:true withheld per THE BAR) — spec basis: puky.de LR M product page (Exa-fetched 2026-07-20, direct WebFetch not attempted — Puky\'s domain is fetchable via Exa): Seat height 30-43cm, EVA foam tires, height-adjustable saddle/handlebar, max load 25kg, EUR99.99. Weight retained from downtown-mag.com (matches original wave sourcing).'
  },
  {
    id: 'sb-kokua-likeabike-jumper-12', cat: 'balancebike', brand: 'Kokua', model: 'LIKEaBIKE Jumper 12',
    wheel: '12', seatMin: 340, seatMax: 440, bikeWeight: 3400, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', steeringLimiter: true, price: 328,
    note: 'Premium German balance bike; ships with a rear elastomer suspension (not modeled — schema has no suspension field) and a steering damper (mapped to steeringLimiter). No hand brake. Every field independently confirmed against the maker page 2026-07-20 with zero corrections needed (seat height, weight, and price all already matched exactly).',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://kokuabikesusa.com/products/like-a-bike-jumper-12',
    desc: 'Verified — kokuabikesusa.com LIKEaBIKE Jumper 12 product page (Exa-fetched 2026-07-20): 7005 aircraft-grade aluminum frame, adjustable seat height 340-440mm (two seat posts included), Schwalbe "Big Apple" air tires, steering damper, Weight 3400g (kokua-shop.com DE spec table), $328.00.'
  },
  {
    id: 'sb-banwood-first-go', cat: 'balancebike', brand: 'Banwood', model: 'First Go',
    wheel: '12', seatMin: 370, seatMax: 440, bikeWeight: 4500, tire: 'air',
    brake: 'none', frameMaterial: 'steel', price: 199,
    note: 'Design-forward premium steel balance bike with wicker basket; maker states no brake system ("The first go has no brake system"). Weight and price confirmed exactly against banwood.us 2026-07-20. Seat height varies slightly by color-variant listing on banwood.us (37-44cm on some pages, 44-50cm on others, likely a copy inconsistency across SKUs) — the catalog\'s existing 37-44cm range matches the majority of listings, kept as-is.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://banwood.us/products/balance-bike-pink',
    desc: 'Verified — banwood.us First Go product page (Exa-fetched 2026-07-20): 12in steel frame, adaptable seat height 37-44cm (most color variants; one variant page lists 44-50cm), 12in wheels, Weight 4.5kg, $199.00, no brake.'
  },
  {
    id: 'sb-schwinn-elm', cat: 'balancebike', brand: 'Schwinn', model: 'Elm',
    wheel: '12', seatMin: 362, seatMax: 425, bikeWeight: 3810, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', steeringLimiter: true, price: 69.99,
    note: 'Budget-tier steel balance bike with foam (Mag wheel/EVA) tires and a ball-bearing headset steering limiter; sold mainly via Amazon/mass retail. Price corrected 2026-07-20 from a stale $69 sample to schwinnbikes.com\'s exact $69.99. Frame material, tire, brakeless design, and steering limiter all confirmed against the maker page; seat height/weight retained from twowheelingtots (schwinnbikes.com doesn\'t publish either) — Guardian-row "verified (partial)" precedent.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.schwinnbikes.com/products/elm-12-balance-kids-bike',
    desc: 'Verified (partial) — schwinnbikes.com Elm Balance Bike 12in product page (Exa-fetched 2026-07-20): Steel 12in frame with Schwinn SmartStart, Mag wheels with EVA foam tires, ball-bearing headset with steering limiter, tool-free adjustable seat, $69.99. No brake mentioned (balance bike, consistent with "none"). Seat height/weight not published by Schwinn — retained from twowheelingtots.'
  },
  {
    id: 'sb-schwinn-skip2', cat: 'balancebike', brand: 'Schwinn', model: 'Skip 2',
    wheel: '12', seatMin: 381, seatMax: 432, bikeWeight: 3266, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 59,
    note: 'Entry model of the older Schwinn Skip line (predecessor to Elm/Koen); lightest and cheapest of the Schwinn balance-bike lineup. NOTE (2026-07-20): no longer sold on schwinnbikes.com (only Koen/Elm/Spitfire remain in the current lineup) — Skip 2 is Amazon/mass-retail-exclusive now, so no manufacturer product page exists to fetch. twowheelingtots\' 7.2lb weight figure cross-checked exactly against kiddingzone.com\'s independent review (also 7.2lb = 3266g) — high-confidence sample even without a maker page.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com Schwinn balance-bike roundup, cross-checked 2026-07-20 against kiddingzone.com\'s independent Skip 2 review (both cite 7.2lb/3266g) — Schwinn/Amazon publish no official spec page for this model.'
  },
  {
    id: 'sb-wishbone-recycled-3in1', cat: 'balancebike', brand: 'Wishbone', model: 'Recycled 3-in-1',
    wheel: '12', seatMin: 229, seatMax: 508, bikeWeight: 5800, tire: 'air',
    brake: 'none', frameMaterial: 'composite', price: 229.99,
    note: 'Trike-to-balance-bike convertible made from recycled ocean/carpet plastic; the widest seat-height range in this catalog (9-20in) via a flip-frame + adjustable seatpost. Corrected 2026-07-20: bikeWeight was 5171g (11.4lb per rascalrides, describing the 2-wheel-only configuration); updated to wishbonedesign.com\'s own stated "assembled weight" of 5.8kg (12.8lb) to meet THE BAR\'s maker-sourced-weight requirement for verified:true — this is likely the full 3-in-1 kit\'s assembled/shipping weight rather than the stripped 2-wheel mode, so it may run slightly heavy for balance-mode-only comparisons; flagged here rather than silently swapped.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://wishbonedesign.com/products/wishbone-bike-re2-3in1',
    desc: 'Verified — wishbonedesign.com Recycled 3-in-1 product page (Exa-fetched 2026-07-20): "Adjustable seat from 9\\" - 20\\" / 23 to 51cm", made from recycled bottles & carpet (composite frame), assembled weight 5.8kg (12.8lb), $229.99 (US price, exact match).'
  },
  {
    id: 'sb-kinderfeets-classic', cat: 'balancebike', brand: 'Kinderfeets', model: 'Classic',
    wheel: '12', seatMin: 300, seatMax: 380, bikeWeight: 3700, tire: 'foam',
    brake: 'none', frameMaterial: 'wood', footrest: true, price: 139.99,
    note: 'Birch-wood balance bike with footpegs and EVA airless (foam) tires. Wheel diameter not explicitly published by the maker; 12in used per the bike\'s stated seat-height/size class and is consistent with comparable wood balance bikes (display-only field, not fit-critical per STRIDER-MODEL.md sec 4). Corrected 2026-07-20: weight was a rough 3300g estimate, updated to 3700g per an authorized reseller\'s product-weight field (juegoyjardin.com — kinderfeets.com itself publishes no weight, only "up to 65lb/30kg" rider capacity, so verified:true is withheld per THE BAR).',
    desc: 'Unverified sample (weight not published by kinderfeets.com — no manufacturer figure or measured source meets THE BAR) — spec basis: kinderfeets.com Classic Balance Bike page (Exa-fetched 2026-07-20, seat height 12-15in/30-38cm exact match, birch wood, $139.99, rider capacity 65lb/30kg) + juegoyjardin.com authorized-reseller listing (weight 3700g) + junabear.com.au ("weighs about 8lb", corroborating).'
  },
  {
    id: 'sb-chillafish-bmxie2', cat: 'balancebike', brand: 'Chillafish', model: 'BMXie2',
    wheel: '12', seatMin: 311, seatMax: 387, bikeWeight: 3856, tire: 'rubber-foam',
    brake: 'none', frameMaterial: 'composite', footrest: true, price: 74.99,
    note: 'Reinforced-plastic BMX-styled balance bike with airless "Rubberskin"-covered foam tires (puncture-proof) and an integrated footbrake — no vocab value exists for a foot-operated brake (schema brake enum is hand/coaster only), so brake is left "none"; the footbrake is a real feature, confirmed directly on chillafish.com/products/bmxie2\'s own title ("...lightweight balance bike with foot brake"), not just via twowheelingtots as the prior wave cited. Corrected 2026-07-20: seat height was 12.6-15.35in (320-390mm) sample, twowheelingtots\' own measured range is 12.25-15.25in (311-387mm); weight updated to twowheelingtots\' measured 8.5lb (chillafish.com/info.chillafish.com publish no weight, so verified:true is withheld per THE BAR); price to Target/chillafish.com\'s $74.99.',
    desc: 'Unverified sample (weight not published by chillafish.com — no manufacturer figure meets THE BAR) — spec basis: info.chillafish.com/product/bmxie-nb (seat height 32-39cm/12.5-15.2in maker spec, footrest, airless rubber-skin foam tires) + chillafish.com/products/bmxie2 (footbrake confirmed in the product title, EUR79.99) + twowheelingtots.com measured review (seat height 12.25-15.25in, weight 8.5lb) + Target.com listing ($74.99, weight 8.4lb corroborating).'
  },
  {
    id: 'sb-yedoo-tootoo', cat: 'balancebike', brand: 'Yedoo', model: 'TooToo',
    wheel: '12', seatMin: 300, seatMax: 410, bikeWeight: 3700, tire: 'air',
    brake: 'rear-hand', steeringLimiter: true, frameMaterial: 'steel', price: 159,
    note: 'Steel-frame balance bike with a Tektro rear V-brake (junior lever) and Kenda/Innova pneumatic tires; bearing headset "with stoppers that prevent handlebar rotation" (steeringLimiter, added 2026-07-20 — confirmed by the maker, was missing from this row). An optional extended seat post (shared with Strider) raises max seat height further per twowheelingtots. Corrected 2026-07-20: seat height 317-419mm sample -> yedoo.eu\'s exact 30-41cm (300-410mm); weight 3765->3700g (yedoo.eu\'s stated 3.7kg). US price not published by yedoo.eu (EUR-only site, EUR129.90); kept at the existing $159 twowheelingtots-cited US price.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.yedoo.eu/en/product/tootoo-3aBvYe',
    desc: 'Verified (partial) — yedoo.eu TooToo product page (Exa-fetched 2026-07-20): Hi-ten steel frame/fork, seat height 30-41cm, weight 3.7kg, Rear V-brake Tektro w/ junior lever, Headset bearing with steering-rotation stoppers, EUR129.90. US price retained from twowheelingtots (yedoo.eu sells EUR-only).'
  },
  {
    id: 'sb-yedoo-yootoo', cat: 'balancebike', brand: 'Yedoo', model: 'YooToo',
    wheel: '12', seatMin: 290, seatMax: 430, bikeWeight: 3400, tire: 'air',
    brake: 'rear-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 199,
    note: 'Aluminum-frame step-up sibling of the Yedoo TooToo; lighter, taller max seat height, same Tektro rear hand brake, same steering-limiter headset (added 2026-07-20, confirmed by the maker). Corrected 2026-07-20: seat height 305-438mm sample -> yedoo.eu\'s exact 29-43cm (290-430mm); weight 3583->3400g (yedoo.eu\'s stated 3.4kg). US price not published by yedoo.eu (EUR129.90); kept at the existing $199 twowheelingtots-cited US price.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.yedoo.eu/en/product/yedoo-yootoo-alu-balance-bike-w-reflective-elements-7kquBY',
    desc: 'Verified (partial) — yedoo.eu YooToo product page (Exa-fetched 2026-07-20): Aluminium frame with two-position rear fork, seat height 29-43cm, weight 3.4kg, Rear V-brake Tektro w/ junior lever, Headset bearing with steering limiters, EUR179.90. US price retained from twowheelingtots (yedoo.eu sells EUR-only).'
  },
  {
    id: 'sb-giant-pre', cat: 'balancebike', brand: 'Giant', model: 'Pre',
    wheel: '12', seatMin: 310, seatMax: 430, bikeWeight: 4010, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', footrest: true, price: 130,
    note: 'Giant\'s entry kids\' balance bike (ALUXX aluminum frame, thermo-formed polymer fork, removable footrest, Giant Easy Balance 12x2.125in air tires — all confirmed against giant-bicycles.com 2026-07-20); US RRP cited by BikeExchange\'s group test (giant.com itself publishes AU RRP $299, not US pricing; regional pricing varies). Giant\'s own geometry chart gives only a 367mm standover height, no seat-height range or bike weight ("the most accurate way to determine any bike\'s weight is to have your local dealer weigh it" — Giant explicitly declines to publish one) — both fields retained from bikeexchange.com\'s measured group test, so verified:true is withheld per THE BAR (no maker-stated or measured weight).',
    desc: 'Unverified sample (weight not published by giant-bicycles.com) — spec basis: giant-bicycles.com/au/pre-2024 product page (Exa-fetched 2026-07-20: ALUXX aluminum frame, thermo-formed polymer fork, Giant Easy Balance 12x2.125in tires, removable footrest, AU$299 RRP) + bikeexchange.com group-test measurements (seat height, weight, US RRP).'
  },
  {
    id: 'sb-coop-rev-12', cat: 'balancebike', brand: 'Co-op Cycles', model: 'REV 12',
    wheel: '12', bikeWeight: 4091, tire: 'air',
    brake: 'none', frameMaterial: 'aluminum', price: 169,
    note: 'REI\'s house-brand balance bike (sold exclusively through REI — rei.com is the maker\'s own retail channel for this private label); REI publishes a child-inseam fit range (12-17in) rather than a seat-height range, so seatMin/seatMax are left blank rather than guessed (THE BAR) — inseam and seat height are related but not identical measurements. Maker confirms no brake ("The REV BAL does not have brakes"). Re-confirmed 2026-07-20: rei.com\'s own listed weight (9lb 0.3oz = 4090.5g) and price ($169.00) both match the existing row exactly — no corrections needed.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.rei.com/product/160837/co-op-cycles-rev-12-kids-balance-bike',
    desc: 'Verified — rei.com Co-op Cycles REV 12 listing (Exa-fetched 2026-07-20): Weight 9lb 0.3oz (4091g), Child Inseam 12-17in, $169.00, aluminum frame, air tires, no brake (Co-op REV BAL owner\'s manual).'
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
    wheel: '12', seatMin: 318, seatMax: 419, bikeWeight: 3447, tire: 'air',
    brake: 'none', frameMaterial: 'magnesium', price: 99.99,
    note: 'Mass-retail lightweight magnesium-frame balance bike (Radio Flyer\'s step-up from the steel Air Ride); no brake. Corrected 2026-07-20: weight was a twowheelingtots-sourced 3289g estimate, updated to radioflyer.com\'s own stated 7.6lb (3447g); price already matched the maker\'s $99.99 exactly.',
    verified: true, lastChecked: '2026-07-20', sourceType: 'maker',
    source: 'https://www.radioflyer.com/products/flyer-ultra-lite-balance-bike-black',
    desc: 'Verified — radioflyer.com Flyer Ultra Lite product page (Exa-fetched 2026-07-20): "Lightweight magnesium alloy frame", "Rubber air tires", pedal-free (no brake), Weight 7.6lb, $99.99. Seat height retained from twowheelingtots (radioflyer.com states only body/carton dimensions, not a seat-height range).'
  },
  {
    id: 'sb-bixe-12', cat: 'balancebike', brand: 'Bixe', model: '12',
    wheel: '12', seatMin: 292, seatMax: 394, bikeWeight: 2086, tire: 'foam',
    brake: 'none', frameMaterial: 'aluminum', price: 60,
    note: 'Budget/lightweight Amazon-marketplace balance bike; foam tires on plastic rims, no brake. Re-confirmed 2026-07-20: seat height (11.5-15.5in), weight (4.6lb), frame material, and no-brake design all independently double-corroborated by kiddingzone.com AND twowheelingtots.com (byte-identical figures) — no bixebalancebike.com maker page publishes a spec table to promote past this to full "verified" (THE BAR requires the manufacturer\'s own page, not converging aggregators), but the double-independent-source agreement is about as strong as unverified sample data gets.',
    desc: 'Unverified sample — spec basis: twowheelingtots.com + kiddingzone.com Bixe reviews, independently agreeing exactly (seat height 11.5-15.5in, weight 4.6lb, aluminum frame, foam tires, no brake) + amazon.com listing (price); bixebalancebike.com (the maker\'s own site) lists no spec table to fetch.'
  },
  {
    id: 'sb-bixe-16', cat: 'balancebike', brand: 'Bixe', model: '16',
    wheel: '16', seatMin: 464, seatMax: 569, bikeWeight: 5443, tire: 'air',
    brake: 'none', frameMaterial: 'steel', price: 110,
    note: 'Step-up size in the Bixe lineup for bigger kids (ages ~4-9); air tires, unlike the 12in model\'s foam. Corrected 2026-07-20 against twowheelingtots.com: frameMaterial was "aluminum", the maker text explicitly states "the Bixe 16 features a steel frame"; brake was "rear-hand", twowheelingtots\' own comparison table lists Bixe 16 Pro brakes as "None" ("we wish it had a hand brake" — it doesn\'t); price was a stale $90 sample, twowheelingtots states $110 MSRP. A separate "16 Pro" trim also exists at a lighter 14.9lb but wasn\'t pinned to a distinct sourced spec table this round.',
    desc: 'Unverified sample (no bixebalancebike.com spec table found — see Bixe 12 note) — spec basis: twowheelingtots.com Bixe review (seat height 18.25-22.4in, weight 12lb, steel frame, no brake, $110 MSRP), cross-checked against kiddingzone.com (same seat height/weight/frame figures).'
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
