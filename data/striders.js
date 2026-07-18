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
  }

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STRIDER_PARTS: STRIDER_PARTS };
}
