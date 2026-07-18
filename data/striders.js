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
    wheel: '12', seatMin: 264, seatMax: 366, bikeWeight: 2994, tire: 'air',
    brake: 'rear-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 249,
    note: 'Entry woom balance bike (sold as "GO 1" outside the US since a 2023 rebrand).',
    desc: 'Unverified sample — spec basis: woom.com product page via Exa (STRIDER-MODEL.md sec 2) cross-checked against twowheelingtots.'
  },
  {
    id: 'sb-woom-1plus-go1plus', cat: 'balancebike', brand: 'woom', model: '1 PLUS / GO 1 PLUS',
    wheel: '12', seatMin: 376, seatMax: 475, bikeWeight: 4354, tire: 'air',
    brake: 'dual-hand', steeringLimiter: true, frameMaterial: 'aluminum', price: 299,
    note: 'Taller sibling of the woom 1, for kids who outgrow the 1 without needing a 14".',
    desc: 'Unverified sample — spec basis: twowheelingtots (STRIDER-MODEL.md sec 2 table).'
  },
  {
    id: 'sb-strider-12-classic', cat: 'balancebike', brand: 'Strider', model: '12 Classic',
    wheel: '12', seatMin: 279, seatMax: 406, bikeWeight: 3039, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 89.99,
    note: 'The category-defining minimalist balance bike; steel frame, puncture-proof foam tires.',
    desc: 'Unverified sample — spec basis: readysetpedal.com 12" comparison chart (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-strider-12-sport', cat: 'balancebike', brand: 'Strider', model: '12 Sport',
    wheel: '12', seatMin: 279, seatMax: 432, bikeWeight: 3039, tire: 'foam',
    brake: 'none', frameMaterial: 'steel', price: 119.99,
    note: 'Adds an XL seatpost (extends max seat height to ~19in/483mm per the maker; stock post shown here).',
    desc: 'Unverified sample — spec basis: readysetpedal.com (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-strider-12-pro', cat: 'balancebike', brand: 'Strider', model: '12 Pro',
    wheel: '12', seatMin: 279, seatMax: 406, bikeWeight: 2404, tire: 'foam',
    brake: 'none', frameMaterial: 'aluminum', price: 169.99,
    note: 'Aluminum frame drops ~1.4lb vs the Classic/Sport.',
    desc: 'Unverified sample — spec basis: readysetpedal.com (STRIDER-MODEL.md sec 2).'
  },
  {
    id: 'sb-strider-14x', cat: 'balancebike', brand: 'Strider', model: '14x',
    wheel: '14', seatMin: 381, seatMax: 559, bikeWeight: 5670, tire: 'air',
    brake: 'none', convertsToPedal: true, frameMaterial: 'aluminum', price: 249,
    note: 'Balance-to-pedal convertible; an Easy-Ride pedal kit ($89) bolts on and adds a coaster brake. Pedal-kit row/pedalkit-fit compat rule not yet modeled this round (data/STRIDER-MODEL.md sec 6) — future work.',
    desc: 'Unverified sample — spec basis: twowheelingtots + rascalrides.com convertible-bike coverage (STRIDER-MODEL.md sec 2).'
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
    wheel: '12', seatMin: 273, seatMax: 371, bikeWeight: 3243, tire: 'air',
    brake: 'rear-hand', frameMaterial: 'aluminum', price: 239,
    note: 'Maker-stated weight varies 6.9-7.4lb by size/spec; bikeWeight uses the midpoint.',
    desc: 'Unverified sample — spec basis: twowheelingtots + cascadegearreviews.com (STRIDER-MODEL.md sec 2).'
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
    brake: 'rear-hand', brakeReach: 'short', steeringLimiter: true, frameMaterial: 'steel', price: 149,
    note: 'SureStop hand brake sized for small hands (short lever reach).',
    desc: 'Unverified sample — spec basis: twowheelingtots (STRIDER-MODEL.md sec 2).'
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
  }

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STRIDER_PARTS: STRIDER_PARTS };
}
