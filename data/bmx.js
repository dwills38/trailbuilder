// data/bmx.js — BMX starter catalog (OFF-LIVE research spike)
//
// Version: 0.1.0  |  Date: 2026-07-11
//
// *** OFF-LIVE — NOT LOADED BY THE APP. ***
// This file is not referenced by index.html or src/compat.js. Nothing here reaches the live
// site until Douglas explicitly says go. See data/BMX-MODEL.md for the design doc, field
// schema, real-vs-display compat notes, and open product-design questions.
//
// Plain browser JavaScript, no build step, no imports/exports, no CDN — same convention as
// src/compat.js. Defines top-level `var` globals only.
//
// PROVENANCE: specs are SAMPLE/UNVERIFIED best-credible-source estimates unless a row carries
// `verified:true` + `lastChecked` + `source` (a real URL that was actually fetched and read —
// never a search-result summary). A handful of rows below were confirmed against an official
// brand page (kinkbmx.com, wethepeoplebmx.de, profileracing.com) on 2026-07-11 and are marked
// verified; every other row is a real, notable, currently-or-recently-sold BMX product with
// best-available specs from search results / retail listings, included as unverified sample
// data per catalog policy (never fabricated — every id below names a real part).
//
// No e-bikes / motors / batteries anywhere in this file (BMX is unpowered).

// ---------------------------------------------------------------------------
// Slots + vocab now live in the ENGINE — src/compat-bmx.js (BMX_GROUPS /
// BMX_SLOTS / BMX_VOCAB / bmxSlotRequired / checkBmxBuild), per Douglas's
// 2026-07-13 architecture sign-off (data/DJ-BMX-COMPAT-ANALYSIS.md section 3,
// Option b: BMX gets its own engine; the v0.1 slot/vocab sketch that lived
// here was its precursor and was folded in there — single source of truth).
// This file is DATA ONLY: BMX_PARTS.
// Clamp-token note: v0.1's clamp value 'oversized' was normalized to '25.4mm'
// (they are the same standard — BMX "oversized" IS the 25.4mm clamp; keeping
// both tokens would have made identical bars/stems read as different fits).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------
var BMX_PARTS = [

  // ===== FRAMES =====================================================
  {
    id: 'bmx-fr-kink-williams', cat: 'frame', brand: 'Kink', model: 'Williams',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2245, price: 449.99,
    verified: true, lastChecked: '2026-07-11', source: 'https://kinkbmx.com/products/williams-frame',
    note: 'Nathan Williams signature frame; also offered in 20.5/21/21.25in top tube.'
  },
  {
    id: 'bmx-fr-wethepeople-justice', cat: 'frame', brand: 'WeThePeople', model: 'Justice',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 579.99,
    verified: true, lastChecked: '2026-07-11', source: 'https://wethepeoplebmx.de/bikes/justice',
    note: 'Weight fetched (12.03kg) is COMPLETE BIKE weight, not frame-only, so weight is omitted here to avoid a wrong frame-weight field. BB is a Salt "Mid" pressed for 19mm spindle.'
  },
  {
    id: 'bmx-fr-cult-gateway', cat: 'frame', brand: 'Cult', model: 'Gateway',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 429.99,
    note: 'UNVERIFIED, checked 2026-07-17: cultcrew.com currently sells "Gateway" ONLY as a complete bike (cultcrew.com/products/025-gateway-black, $469.99, 20.5in TT) — no frame-only Gateway SKU exists in the current lineup, so frameOnly:true here cannot be confirmed against a dedicated frame product page. The complete-bike copy does corroborate topTube (20.5in TT), headTube (integrated headset), bbShell ("sealed mid bottom bracket") and rearBrakeMount ("990 U-brake") qualitatively, but rearAxle and price are NOT stated there and are left as pre-existing sample values. Left unverified rather than mark verified off a complete-bike page for a frame-only row.'
  },
  {
    id: 'bmx-fr-sunday-forecaster', cat: 'frame', brand: 'Sunday', model: 'Forecaster',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2100, price: 439.99
  },
  {
    id: 'bmx-fr-fitbikeco-seriesone', cat: 'frame', brand: 'Fit Bike Co', model: 'Series One',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 419.99
  },
  {
    id: 'bmx-fr-subrosa-salinas', cat: 'frame', brand: 'Subrosa', model: 'Salinas',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 399.99
  },
  {
    id: 'bmx-fr-sandm-holmes', cat: 'frame', brand: 'S&M', model: 'Holmes',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 459.99
  },
  {
    id: 'bmx-fr-colony-sweettooth', cat: 'frame', brand: 'Colony', model: 'Sweet Tooth',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.6, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 429.99, note: 'Commonly run brakeless.'
  },
  {
    id: 'bmx-fr-haro-downtown', cat: 'frame', brand: 'Haro', model: 'Downtown',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 379.99
  },
  {
    id: 'bmx-fr-mongoose-legion', cat: 'frame', brand: 'Mongoose', model: 'Legion L20',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 349.99
  },
  {
    id: 'bmx-fr-totalbmx-killabee', cat: 'frame', brand: 'Total BMX', model: 'Killabee',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'Commonly run brakeless.'
  },
  {
    id: 'bmx-fr-stranger-level', cat: 'frame', brand: 'Stranger Bikes', model: 'Level',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.9, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 439.99
  },
  {
    id: 'bmx-fr-fiend-typeo', cat: 'frame', brand: 'Fiend', model: 'Type O',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'Commonly run brakeless.'
  },
  // Race frames
  {
    id: 'bmx-fr-redline-proline', cat: 'frame', brand: 'Redline', model: 'Proline',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: true,
    price: 399.99, note: 'Long-running Redline race platform, threaded Euro BB shell.'
  },
  {
    id: 'bmx-fr-chase-rsp30', cat: 'frame', brand: 'Chase', model: 'RSP 3.0',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: true,
    price: 549.99
  },
  {
    id: 'bmx-fr-supercross-envy', cat: 'frame', brand: 'Supercross BMX', model: 'Envy SL',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: true,
    price: 899.99, note: 'Alloy race frame (most others in this list are chromoly).'
  },
  {
    id: 'bmx-fr-chase-element', cat: 'frame', brand: 'Chase', model: 'Element',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: true,
    price: 349.99, note: 'Chase\'s entry/intermediate race frame, below the RSP 3.0 in the lineup.'
  },
  {
    id: 'bmx-fr-gt-performer', cat: 'frame', brand: 'GT', model: 'Performer',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 469.99, note: 'GT\'s long-running heritage/old-school reissue platform, sold as a complete bike.'
  },
  {
    id: 'bmx-fr-gt-fly', cat: 'frame', brand: 'GT', model: 'Fly',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 429.99, note: 'GT\'s current freestyle/park complete bike.'
  },
  {
    id: 'bmx-fr-gt-speedseries-pro', cat: 'frame', brand: 'GT', model: 'Speed Series Pro',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false,
    price: 799.99, note: 'GT\'s race-team-tier complete bike.'
  },
  {
    id: 'bmx-fr-haro-lineage-master', cat: 'frame', brand: 'Haro', model: 'Lineage Master',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 499.99, note: 'Heritage reissue of Haro\'s original Master freestyle frame.'
  },
  {
    id: 'bmx-fr-haro-downtown-dlx', cat: 'frame', brand: 'Haro', model: 'Downtown DLX',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'Upgraded Downtown chassis; commonly run brakeless.'
  },
  {
    id: 'bmx-fr-bsd-focus', cat: 'frame', brand: 'BSD', model: 'Focus',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.6, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 439.99, note: 'BSD (UK) street/park frame; commonly run brakeless.'
  },
  {
    id: 'bmx-fr-flybikes-nassau', cat: 'frame', brand: 'Fly Bikes', model: 'Nassau',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'Fly Bikes (Spain) street/park frame; commonly run brakeless.'
  },
  {
    id: 'bmx-fr-totalbmx-techlite', cat: 'frame', brand: 'Total BMX', model: 'Techlite',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    weight: 1950, price: 469.99, note: 'Total\'s lightweight chromoly flagship; commonly run brakeless.'
  },
  {
    id: 'bmx-fr-sandm-pitchfork', cat: 'frame', brand: 'S&M', model: 'Pitchfork',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 459.99, note: 'S&M\'s long-running dirt/park frame; commonly run brakeless.'
  },
  {
    id: 'bmx-fr-colony-emerald', cat: 'frame', brand: 'Colony', model: 'Emerald',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.7, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'Colony\'s second freestyle frame platform (Sweet Tooth is the other); commonly run brakeless.'
  },

  // ===== FORKS ========================================================
  {
    id: 'bmx-fk-odyssey-r32', cat: 'fork', brand: 'Odyssey', model: 'R32',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', weight: 700, price: 129.99
  },
  {
    id: 'bmx-fk-merritt-cnc', cat: 'fork', brand: 'Merritt', model: 'CNC 3-Piece',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 650, price: 149.99, note: 'Commonly run brakeless.'
  },
  {
    id: 'bmx-fk-wethepeople-pathfinder', cat: 'fork', brand: 'WeThePeople', model: 'Pathfinder',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', weight: 720, price: 119.99
  },
  {
    id: 'bmx-fk-fitbikeco-tibs', cat: 'fork', brand: 'Fit Bike Co', model: 'TIBS',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', weight: 690, price: 109.99
  },
  {
    id: 'bmx-fk-redline-forkliftpro', cat: 'fork', brand: 'Redline', model: 'Forklift Pro',
    discipline: 'race', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'v-brake', weight: 450, price: 89.99
  },
  {
    id: 'bmx-fk-haro-downtown', cat: 'fork', brand: 'Haro', model: 'Downtown Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 680, price: 99.99, note: 'Companion fork to the Downtown/Downtown DLX frames; commonly run brakeless.'
  },
  {
    id: 'bmx-fk-sandm-mianus', cat: 'fork', brand: 'S&M', model: 'Mianus Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 660, price: 119.99, note: 'S&M\'s long-running signature 3-piece fork name.'
  },
  {
    id: 'bmx-fk-totalbmx-yfork', cat: 'fork', brand: 'Total BMX', model: 'Y-Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 640, price: 109.99, note: 'Total\'s iconic 3-piece fork silhouette; commonly run brakeless.'
  },
  {
    id: 'bmx-fk-chase-rsp', cat: 'fork', brand: 'Chase', model: 'RSP Race Fork',
    discipline: 'race', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'v-brake', weight: 420, price: 94.99
  },

  // ===== HEADSETS ======================================================
  {
    id: 'bmx-hs-cult-integrated', cat: 'headset', brand: 'Cult', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 27.99,
    note: 'Price corrected 24.99 -> 27.99 to match Cult\'s current "Headset" product (cultcrew.com/products/og-headset, checked 2026-07-17: "OG HEADSET / 2 different sized stackable caps and three spacers"). Left UNVERIFIED: that page states no fit/standard text at all (no "integrated" or "1-1/8" wording), so fit:\'integrated-1-1/8\' — while consistent with Cult\'s frames all using integrated 1-1/8in headtubes — is not literally confirmed by this source. Page weight (907g) not recorded: identical placeholder figure also appears on the unrelated Bottom Bracket product page, a shipping-weight bucket, not this part\'s real mass.'
  },
  {
    id: 'bmx-hs-odyssey-integrated', cat: 'headset', brand: 'Odyssey', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 22.99
  },
  {
    id: 'bmx-hs-salt-pro', cat: 'headset', brand: 'Salt', model: 'Pro Integrated Headset',
    fit: 'integrated-1-1/8', price: 19.99, note: 'WeThePeople in-house parts brand (Salt).'
  },
  {
    id: 'bmx-hs-profile-integrated', cat: 'headset', brand: 'Profile Racing', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 24.99
  },
  {
    id: 'bmx-hs-flybikes-integrated', cat: 'headset', brand: 'Fly Bikes', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 21.99
  },

  // ===== GYRO / DETANGLER (freestyle only) ============================
  {
    id: 'bmx-gy-odyssey-g3kit', cat: 'gyro', brand: 'Odyssey', model: 'Gyro G3 Kit',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', price: 22.99,
    note: 'Odyssey has made the Gyro since 1986; the G3 is the affordable full kit (cables included).'
  },
  {
    id: 'bmx-gy-odyssey-gtxs', cat: 'gyro', brand: 'Odyssey', model: 'GTX-S Gyro',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', weight: 145, price: 49.99,
    note: '17mm stack height, sealed bearing, 6061-T6 aluminum (detangler only, cables sold separately in the GTX-S Pro kit).'
  },
  {
    id: 'bmx-gy-shadow-sanov2', cat: 'gyro', brand: 'The Shadow Conspiracy', model: 'Sano V2 Detangler',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', price: 44.99,
    note: 'CNC 6061-T6 aluminum, sealed bearing, low stack height.'
  },

  // ===== CRANKS ========================================================
  {
    id: 'bmx-cr-profile-elite-al-sl', cat: 'cranks', brand: 'Profile Racing', model: "Elite AL 'SL' Crank Kit",
    spindle: '30mm', pieces: '3-piece', ringMount: 'spline', price: 489.99,
    verified: true, lastChecked: '2026-07-11', source: 'https://www.profileracing.com/product-category/profile-bmx/profile-cranks/',
    note: 'Aluminum arms, 30mm spindle (Profile\'s largest spindle option).'
  },
  {
    id: 'bmx-cr-profile-elite-al-hd', cat: 'cranks', brand: 'Profile Racing', model: "Elite AL 'HD' Crank Kit",
    spindle: '30mm', pieces: '3-piece', ringMount: 'spline', price: 489.99,
    verified: true, lastChecked: '2026-07-11', source: 'https://www.profileracing.com/product-category/profile-bmx/profile-cranks/'
  },
  {
    id: 'bmx-cr-profile-race', cat: 'cranks', brand: 'Profile Racing', model: 'Race Cranks',
    spindle: '19mm', pieces: '3-piece', ringMount: 'press-on', price: 286.99,
    note: 'Profile\'s classic 19mm chromoly race crank family (Tech Tip #37 covers the 19mm vs 22mm tradeoff).'
  },
  {
    id: 'bmx-cr-odyssey-calibre', cat: 'cranks', brand: 'Odyssey', model: 'Calibre Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 900, price: 199.99
  },
  {
    id: 'bmx-cr-sandm-xlr8r', cat: 'cranks', brand: 'S&M', model: 'XLR8R Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 950, price: 219.99
  },
  {
    id: 'bmx-cr-stolen-team', cat: 'cranks', brand: 'Stolen', model: 'Team Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', price: 189.99
  },
  {
    id: 'bmx-cr-profile-race-22', cat: 'cranks', brand: 'Profile Racing', model: 'Race Cranks 22mm',
    spindle: '22mm', pieces: '3-piece', ringMount: 'press-on', price: 299.99,
    note: '22mm-spindle version of Profile\'s classic chromoly race crank family (Profile\'s Tech Tip #37 covers the 19mm vs 22mm tradeoff).'
  },
  {
    id: 'bmx-cr-flybikes-pz1', cat: 'cranks', brand: 'Fly Bikes', model: 'PZ1 Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 920, price: 209.99
  },
  {
    id: 'bmx-cr-bsd-dvt', cat: 'cranks', brand: 'BSD', model: 'DVT Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 940, price: 199.99
  },
  {
    id: 'bmx-cr-chase-rsp', cat: 'cranks', brand: 'Chase', model: 'RSP Race Cranks',
    spindle: '19mm', pieces: '3-piece', ringMount: 'press-on', price: 279.99
  },

  // ===== BOTTOM BRACKETS ===============================================
  {
    id: 'bmx-bb-profile-euro-22', cat: 'bb', brand: 'Profile Racing', model: 'Euro Outboard BB',
    shell: 'euro', spindleFit: '22mm', price: 39.99
  },
  {
    id: 'bmx-bb-salt-mid-19', cat: 'bb', brand: 'Salt', model: 'Mid Sealed BB',
    shell: 'mid', spindleFit: '19mm', price: 24.99,
    note: 'Matches the press-fit spec published on the WeThePeople Justice frame page (bmx-fr-wethepeople-justice).'
  },
  {
    id: 'bmx-bb-odyssey-american', cat: 'bb', brand: 'Odyssey', model: 'American BB',
    shell: 'american', spindleFit: '19mm', price: 22.99
  },
  {
    id: 'bmx-bb-totalbmx-mid-22', cat: 'bb', brand: 'Total BMX', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 27.99
  },
  {
    id: 'bmx-bb-profile-euro-19', cat: 'bb', brand: 'Profile Racing', model: 'Euro Outboard BB 19mm',
    shell: 'euro', spindleFit: '19mm', price: 39.99
  },
  {
    id: 'bmx-bb-gt-mid-22', cat: 'bb', brand: 'GT', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 24.99
  },
  {
    id: 'bmx-bb-flybikes-mid-22', cat: 'bb', brand: 'Fly Bikes', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 26.99
  },

  // ===== SPROCKETS =====================================================
  {
    id: 'bmx-sp-odyssey-utilitypro-30', cat: 'sprocket', brand: 'Odyssey', model: 'Utility Pro Sprocket 30T',
    teeth: 30, mount: 'spline', pitch: '1/8', price: 44.99
  },
  {
    id: 'bmx-sp-profile-race-25', cat: 'sprocket', brand: 'Profile Racing', model: 'Race Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 59.99
  },
  {
    id: 'bmx-sp-sandm-unit-28', cat: 'sprocket', brand: 'S&M', model: 'Unit Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 49.99
  },
  {
    id: 'bmx-sp-profile-race-28', cat: 'sprocket', brand: 'Profile Racing', model: 'Race Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 59.99
  },
  {
    id: 'bmx-sp-profile-race-33', cat: 'sprocket', brand: 'Profile Racing', model: 'Race Sprocket 33T',
    teeth: 33, mount: 'spline', pitch: '1/8', price: 59.99
  },
  {
    id: 'bmx-sp-colony-terminator-25', cat: 'sprocket', brand: 'Colony', model: 'Terminator Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 54.99
  },
  {
    id: 'bmx-sp-flybikes-alloy-28', cat: 'sprocket', brand: 'Fly Bikes', model: 'Alloy Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 44.99
  },
  {
    id: 'bmx-sp-chase-rsp-30', cat: 'sprocket', brand: 'Chase', model: 'RSP Race Sprocket 30T',
    teeth: 30, mount: 'spline', pitch: '1/8', price: 54.99
  },

  // ===== CHAIN ==========================================================
  {
    id: 'bmx-ch-kmc-z410', cat: 'chain', brand: 'KMC', model: 'Z410 BMX Chain',
    pitch: '1/8', halfLink: false, weight: 300, price: 14.99
  },
  {
    id: 'bmx-ch-odyssey-seance', cat: 'chain', brand: 'Odyssey', model: 'Seance Chain',
    pitch: '1/8', halfLink: true, weight: 280, price: 24.99
  },

  // ===== REAR HUB / WHEEL ==============================================
  {
    id: 'bmx-rh-cult-matchv2', cat: 'rearWheel', brand: 'Cult', model: 'Match V2 Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 580, price: 129.99,
    note: 'Sold as hub or built into the Cult Crew SDS wheel; RHD/LHD, male or female axle options. UNVERIFIED, checked 2026-07-17: cultcrew.com no longer sells a product literally named "Match V2 Cassette Hub" — the current SDS 9T cassette hub is sold as "Crew Cassette Hub" ($169.99, cultcrew.com/products/crew-cassette-hub, "SDS 9t cassette hub... Flip Flop design... RHD to LHD"), and rims are still branded "Match" (Match Rim v2). Specs (9T driver, flip-flop RHD/LHD) line up with this row, but the naming change makes a confident 1:1 SKU-identity match too uncertain to mark verified without an explicit manufacturer statement that Crew = Match V2 renamed. Left all fields unchanged (existing weight/price already track a plausible unverified sample). Also NOT trusting the current page\'s weight field (3629g): identical placeholder value also shown for the unrelated Crew Front Wheel v2 product — a shipping-weight bucket.'
  },
  {
    id: 'bmx-rh-fitbikeco-oem-9t', cat: 'rearWheel', brand: 'Fit Bike Co', model: 'OEM Sealed Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', price: 69.99
  },
  {
    id: 'bmx-rh-odyssey-clutchv2', cat: 'rearWheel', brand: 'Odyssey', model: 'Clutch V2 Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 720, price: 199.99
  },
  {
    id: 'bmx-rh-primo-remix', cat: 'rearWheel', brand: 'Primo', model: 'Remix Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 89.99
  },
  {
    id: 'bmx-rh-profile-elite-freecoaster', cat: 'rearWheel', brand: 'Profile Racing', model: 'Elite Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 10, side: 'both', axle: '14mm', price: 259.99
  },
  {
    id: 'bmx-rh-profile-elite-cassette', cat: 'rearWheel', brand: 'Profile Racing', model: 'Elite Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 610, price: 229.99,
    note: 'Profile\'s flagship US-made cassette hub, the long-running Elite line.'
  },
  {
    id: 'bmx-rh-bsd-mind', cat: 'rearWheel', brand: 'BSD', model: 'Mind Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 99.99
  },
  {
    id: 'bmx-rh-colony-devast8r', cat: 'rearWheel', brand: 'Colony', model: "Devast8r Cassette Hub",
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 590, price: 149.99
  },

  // ===== REAR COG =======================================================
  {
    id: 'bmx-rc-cult-cassette-9', cat: 'rearCog', brand: 'Cult', model: 'Cassette Cog 9T',
    teeth: 9, fitsDriver: 'cassette', pitch: '1/8', price: 12.99,
    note: 'UNVERIFIED, checked 2026-07-17: cultcrew.com sells no standalone 9T cassette cog/sprocket product today — the 9T cog ships built into the driver ("Crew Cassette Hub Driver", $56.99, cultcrew.com/collections/wheels-hubs) rather than as its own purchasable cog SKU. Could not find a manufacturer page to confirm teeth/fitsDriver/pitch as a separate part; left unchanged as pre-existing sample data.'
  },
  {
    id: 'bmx-rc-profile-freecoaster-10', cat: 'rearCog', brand: 'Profile Racing', model: 'Freecoaster Cog 10T',
    teeth: 10, fitsDriver: 'freecoaster', pitch: '1/8', price: 24.99,
    note: 'Freecoaster cogs are body-specific; not interchangeable with a cassette driver.'
  },
  {
    id: 'bmx-rc-profile-cassette-9', cat: 'rearCog', brand: 'Profile Racing', model: 'Cassette Cog 9T',
    teeth: 9, fitsDriver: 'cassette', pitch: '1/8', price: 16.99
  },
  {
    id: 'bmx-rc-colony-cassette-9', cat: 'rearCog', brand: 'Colony', model: 'Cassette Cog 9T',
    teeth: 9, fitsDriver: 'cassette', pitch: '1/8', price: 13.99
  },

  // ===== FRONT WHEEL ====================================================
  {
    id: 'bmx-fw-odyssey-vandero', cat: 'frontWheel', brand: 'Odyssey', model: 'Vandero Front Wheel',
    wheelSize: '20', axle: '10mm', price: 79.99
  },
  {
    id: 'bmx-fw-fitbikeco-oem', cat: 'frontWheel', brand: 'Fit Bike Co', model: 'OEM Front Wheel',
    wheelSize: '20', axle: '10mm', price: 49.99
  },
  {
    id: 'bmx-fw-profile-elite', cat: 'frontWheel', brand: 'Profile Racing', model: 'Elite Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 520, price: 149.99
  },
  {
    id: 'bmx-fw-bsd-mind', cat: 'frontWheel', brand: 'BSD', model: 'Mind Front Wheel',
    wheelSize: '20', axle: '10mm', price: 74.99
  },
  {
    id: 'bmx-fw-colony-devast8r', cat: 'frontWheel', brand: 'Colony', model: 'Devast8r Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 500, price: 99.99
  },

  // ===== TIRES ==========================================================
  {
    id: 'bmx-ti-odyssey-pathpro-225', cat: 'tire', brand: 'Odyssey', model: 'Path Pro 2.25"',
    wheelSize: '20', width: 2.25, casing: 'park', maxPsi: 100, price: 24.99
  },
  {
    id: 'bmx-ti-odyssey-pathpro-24', cat: 'tire', brand: 'Odyssey', model: 'Path Pro 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 100, price: 26.99
  },
  {
    id: 'bmx-ti-maxxis-hookworm-25', cat: 'tire', brand: 'Maxxis', model: 'Hookworm 2.5"',
    wheelSize: '20', width: 2.5, casing: 'park', maxPsi: 90, price: 29.99
  },
  {
    id: 'bmx-ti-veetireco-speedster', cat: 'tire', brand: 'Vee Tire Co', model: 'Speedster 1-3/8"',
    wheelSize: '20', width: 1.375, casing: 'race-slick', maxPsi: 110, price: 19.99
  },
  {
    id: 'bmx-ti-odyssey-aitken', cat: 'tire', brand: 'Odyssey', model: 'Aitken Tire 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 95, price: 27.99
  },
  {
    id: 'bmx-ti-duo-svs', cat: 'tire', brand: 'DUO Brand', model: 'SVS Tire 2.3"',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 95, price: 26.99
  },
  {
    id: 'bmx-ti-bsd-motto-24', cat: 'tire', brand: 'BSD', model: 'Motto Tire 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 90, price: 27.99
  },
  {
    id: 'bmx-ti-colony-griplock-24', cat: 'tire', brand: 'Colony', model: 'Grip Lock Tire 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 100, price: 28.99
  },
  {
    id: 'bmx-ti-colony-griplock-215', cat: 'tire', brand: 'Colony', model: 'Grip Lock Tire 2.15"',
    wheelSize: '20', width: 2.15, casing: 'park', maxPsi: 100, price: 26.99
  },
  {
    id: 'bmx-ti-flybikes-ruben-24', cat: 'tire', brand: 'Fly Bikes', model: 'Ruben Tire 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 95, price: 26.99
  },
  {
    id: 'bmx-ti-profile-elite-13', cat: 'tire', brand: 'Profile Racing', model: 'Elite Race Tire 1-3/8"',
    wheelSize: '20', width: 1.375, casing: 'race-slick', maxPsi: 120, price: 21.99
  },

  // ===== PEGS ===========================================================
  {
    id: 'bmx-pg-odyssey-grandstand-14', cat: 'pegs', brand: 'Odyssey', model: 'Grandstand Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: false, price: 24.99
  },
  {
    id: 'bmx-pg-fit-universal', cat: 'pegs', brand: 'Fit Bike Co', model: 'Universal Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: true, price: 34.99,
    note: 'Ships with a 14mm-to-10mm reducer for front-axle use.'
  },
  {
    id: 'bmx-pg-cult-alloy', cat: 'pegs', brand: 'Cult', model: 'Alloy Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 29.99,
    note: 'UNVERIFIED, checked 2026-07-17: cultcrew.com sells no peg literally named "Alloy Pegs" — current lineup is "Doomsday Peg" ($13.99, heat-treated chromoly) and "Butter Peg" ($16.99, 4130 core + Perlon-Nylon 6 sleeve), neither of which is a metal "alloy" peg. axleFit:\'14mm\' IS confirmed as accurate: BOTH current Cult pegs state "14mm pegs with 3/8 adapters" (cultcrew.com/products/doomsday-pegs, /products/butter-pegs), so the one checkBmxBuild-critical field (bmx-peg-axle rule) checks out even though model/material/price don\'t match a specific current SKU. Left unchanged pending a clearer SKU match.'
  },
  {
    id: 'bmx-pg-colony-wasted', cat: 'pegs', brand: 'Colony', model: 'Wasted Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, price: 27.99,
    note: 'Ships with a 14mm-to-10mm reducer for front-axle use.'
  },
  {
    id: 'bmx-pg-totalbmx-rotary', cat: 'pegs', brand: 'Total BMX', model: 'Rotary Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 32.99
  },
  {
    id: 'bmx-pg-bsd-superstar', cat: 'pegs', brand: 'BSD', model: 'Superstar Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: false, price: 22.99
  },
  {
    id: 'bmx-pg-flybikes-vandal', cat: 'pegs', brand: 'Fly Bikes', model: 'Vandal Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: true, price: 34.99,
    note: 'Ships with a 14mm-to-10mm reducer for front-axle use.'
  },

  // ===== BRAKES =========================================================
  {
    id: 'bmx-br-diacompe-990', cat: 'brake', brand: 'Dia-Compe', model: '990 U-Brake',
    mount: 'u-brake', price: 34.99, note: 'The original "990" that gave U-brakes their nickname on BMX.'
  },
  {
    id: 'bmx-br-odyssey-evo25', cat: 'brake', brand: 'Odyssey', model: 'Evo 2.5 U-Brake',
    mount: 'u-brake', price: 44.99
  },
  {
    id: 'bmx-br-tektro-vbrake', cat: 'brake', brand: 'Tektro', model: 'Race V-Brake',
    mount: 'v-brake', price: 19.99
  },
  {
    id: 'bmx-br-chase-rsp-vbrake', cat: 'brake', brand: 'Chase', model: 'RSP Race V-Brake',
    mount: 'v-brake', weight: 180, price: 34.99
  },

  // ===== HANDLEBAR ======================================================
  {
    id: 'bmx-hb-sandm-speedball', cat: 'handlebar', brand: 'S&M', model: 'Speedball Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 74.99
  },
  {
    id: 'bmx-hb-odyssey-canadadave', cat: 'handlebar', brand: 'Odyssey', model: 'Canada Dave Bars',
    clamp: '25.4mm', rise: 8.0, width: 29, price: 79.99
  },
  {
    id: 'bmx-hb-fitbikeco-vh', cat: 'handlebar', brand: 'Fit Bike Co', model: 'VH Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 69.99
  },
  {
    id: 'bmx-hb-totalbmx-techlite', cat: 'handlebar', brand: 'Total BMX', model: 'Techlite Bars',
    clamp: '25.4mm', rise: 8.0, width: 29, weight: 620, price: 84.99
  },
  {
    id: 'bmx-hb-colony-pintour', cat: 'handlebar', brand: 'Colony', model: 'Pintour Bars',
    clamp: '25.4mm', rise: 8.15, width: 29, price: 79.99
  },
  {
    id: 'bmx-hb-sandm-slam', cat: 'handlebar', brand: 'S&M', model: 'Slam Bars',
    clamp: '25.4mm', rise: 8.5, width: 29, price: 74.99
  },
  {
    id: 'bmx-hb-flybikes-glory', cat: 'handlebar', brand: 'Fly Bikes', model: 'Glory Bars',
    clamp: '25.4mm', rise: 8.0, width: 29, price: 72.99
  },
  {
    id: 'bmx-hb-chase-rsp', cat: 'handlebar', brand: 'Chase', model: 'RSP Race Bars',
    clamp: '22.2mm', rise: 6.5, width: 27.5, price: 54.99
  },

  // ===== STEM ===========================================================
  {
    id: 'bmx-st-odyssey-elementary', cat: 'stem', brand: 'Odyssey', model: 'Elementary Stem',
    clamp: '25.4mm', price: 44.99
  },
  {
    id: 'bmx-st-cult-hi-fi', cat: 'stem', brand: 'Cult', model: 'Hi-Fi Stem',
    clamp: '25.4mm', price: 39.99,
    note: 'UNVERIFIED, checked 2026-07-17: no "Hi-Fi Stem" found on cultcrew.com/collections/parts — current Cult stems are "Forged Salvation Stem" ($44.99), "Salvation Stem", and "Mind Control Stem". Could not confirm this SKU still exists; left unchanged as pre-existing sample data (clamp is not a checkBmxBuild-critical field per compat-bmx.js, so the risk of an unconfirmed row here is low).'
  },
  {
    id: 'bmx-st-profile-race', cat: 'stem', brand: 'Profile Racing', model: 'Race Stem',
    clamp: '25.4mm', price: 49.99
  },
  {
    id: 'bmx-st-gt-performer', cat: 'stem', brand: 'GT', model: 'Performer Stem',
    clamp: '25.4mm', price: 34.99
  },
  {
    id: 'bmx-st-chase-rsp', cat: 'stem', brand: 'Chase', model: 'RSP Race Stem',
    clamp: '22.2mm', price: 42.99
  },

  // ===== SEAT ===========================================================
  {
    id: 'bmx-se-cult-pivotal', cat: 'seat', brand: 'Cult', model: 'Pivotal Seat',
    system: 'pivotal', price: 29.99,
    note: 'UNVERIFIED, checked 2026-07-17: system:\'pivotal\' IS confirmed as accurate — every current Cult seat is pivotal-only (e.g. cultcrew.com/products/kevlar-padded-seat-black: "only available in pivotal"), the field checkBmxBuild reads (bmx-seat-system rule). But no plain $29.99 "Pivotal Seat" SKU exists today — the current lineup (Kevlar Padded, Corduroy Slim, Cult x Vans Old Skool, etc.) is all $44.99. Price/model left unchanged pending a clearer SKU match; not marking verified since the exact current product this row maps to is ambiguous.'
  },
  {
    id: 'bmx-se-odyssey-fedaykin', cat: 'seat', brand: 'Odyssey', model: 'Fedaykin Slim Pivotal Seat',
    system: 'pivotal', price: 27.99
  },
  {
    id: 'bmx-se-fitbikeco-slim', cat: 'seat', brand: 'Fit Bike Co', model: 'Slim Seat',
    system: 'standard', price: 22.99
  },
  {
    id: 'bmx-se-colony-pivotal', cat: 'seat', brand: 'Colony', model: 'Pivotal Seat',
    system: 'pivotal', price: 27.99
  },
  {
    id: 'bmx-se-flybikes-pivotal', cat: 'seat', brand: 'Fly Bikes', model: 'Pivotal Seat',
    system: 'pivotal', price: 26.99
  },
  {
    id: 'bmx-se-totalbmx-slim', cat: 'seat', brand: 'Total BMX', model: 'Slim Pivotal Seat',
    system: 'pivotal', price: 24.99
  },

  // ===== SEATPOST =======================================================
  {
    id: 'bmx-sp-cult-pivotal-post', cat: 'seatpost', brand: 'Cult', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 29.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/seatpost',
    note: 'diameter:25.4mm and system:\'pivotal\' CONFIRMED via Cult\'s current "Counter post / black & polished" (6061 alloy, diameter 25.4mm, pivotal, 7.5in & 12.5in X-Long lengths). Price corrected 19.99 -> 29.99 to match. Page weight (907g) not recorded: identical placeholder figure shared with the unrelated Headset/Bottom Bracket product pages — a shipping-weight bucket, not real mass.'
  },
  {
    id: 'bmx-sp-odyssey-standard-post', cat: 'seatpost', brand: 'Odyssey', model: 'Standard Seatpost',
    diameter: 25.4, system: 'standard', price: 14.99
  },
  {
    id: 'bmx-sp-colony-pivotal-post', cat: 'seatpost', brand: 'Colony', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 17.99
  },
  {
    id: 'bmx-sp-profile-pivotal-post', cat: 'seatpost', brand: 'Profile Racing', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 21.99
  },

  // ===== GRIPS ==========================================================
  {
    id: 'bmx-gr-odyssey-aaronross', cat: 'grips', brand: 'Odyssey', model: 'Aaron Ross ARG Grips',
    length: 143, flangeless: true, price: 9.99
  },
  {
    id: 'bmx-gr-odi-longneck', cat: 'grips', brand: 'ODI', model: 'Longneck Grips',
    length: 148, flangeless: false, price: 12.99
  },
  {
    id: 'bmx-gr-cult-dak', cat: 'grips', brand: 'Cult', model: 'Dak Grips',
    length: 143, flangeless: true, price: 10.99,
    note: 'UNVERIFIED, checked 2026-07-17: the Dak Grips (Dakota Roche x ODI collab) are a real, well-known product, but are no longer listed on cultcrew.com\'s own store (not in /collections/parts as of this check) — only third-party retailers (SkatePro, Empire BMX, Dan\'s Comp, etc.) still carry them, which does not meet the manufacturer-page bar. Retailer copy quotes length 150mm vs this row\'s 143mm, but since retailer sources are not verification-eligible, left unchanged rather than correct off a non-manufacturer figure.'
  },
  {
    id: 'bmx-gr-colony-griplock', cat: 'grips', brand: 'Colony', model: 'Grip Lock Grips',
    length: 143, flangeless: true, price: 11.99
  },
  {
    id: 'bmx-gr-flybikes-radioactive', cat: 'grips', brand: 'Fly Bikes', model: 'Radioactive Grips',
    length: 143, flangeless: true, price: 9.99
  },
  {
    id: 'bmx-gr-gt-performer', cat: 'grips', brand: 'GT', model: 'Performer Grips',
    length: 148, flangeless: false, price: 8.99
  },

  // ===== PEDALS =========================================================
  {
    id: 'bmx-pd-odyssey-twistedpro', cat: 'pedals', brand: 'Odyssey', model: 'Twisted PC Pro Pedals',
    platform: 'plastic', spindle: '9/16', price: 19.99
  },
  {
    id: 'bmx-pd-odyssey-trailmix', cat: 'pedals', brand: 'Odyssey', model: 'Trail Mix Pedals',
    platform: 'alloy', spindle: '9/16', weight: 340, price: 39.99
  },
  {
    id: 'bmx-pd-shadow-metalalloy', cat: 'pedals', brand: 'The Shadow Conspiracy', model: 'Metal Alloy Pedals',
    platform: 'alloy', spindle: '9/16', weight: 360, price: 34.99
  },

  // ===================================================================
  // SEAT 12 DEPTH GRIND (2026-07-17) — catalog/bmx-depth-1
  // Brands: Sunday, Odyssey, Cult, Fit Bike Co, Kink, WeThePeople, Eclat,
  // The Shadow Conspiracy. Real, currently-or-recently-sold products;
  // unverified sample specs unless marked verified:true+source (fetched
  // manufacturer page). Frame specs (bbShell/headTube/rearBrakeMount/
  // rearAxle) not stated on a fetched page are filled with the
  // near-universal freestyle-frame defaults (mid shell, integrated
  // 1-1/8in headtube, u-brake bosses, 14mm rear axle) and left
  // unverified even where price/weight WAS confirmed, per THE BAR
  // (never claim verified on a field that wasn't actually read off the
  // source). No e-bikes.
  // ===================================================================

  // ---- Sunday frames (store.sundaybikes.com/collections/sunday-frames,
  //      fetched 2026-07-17: top tube range + weight + price confirmed;
  //      bbShell/headTube/rearBrakeMount/rearAxle are the standard-freestyle
  //      assumption, NOT sourced, so verified is withheld) --------------
  {
    id: 'bmx-fr-sunday-soundwavev3', cat: 'frame', brand: 'Sunday', model: 'Soundwave V3',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2222, price: 489.99,
    note: 'Top tube (20.5-21.25in), weight (4.9lb) and price confirmed via store.sundaybikes.com 2026-07-17; bbShell/headTube/brake-mount/axle are the standard-freestyle-frame assumption, not source-confirmed, so left unverified.'
  },
  {
    id: 'bmx-fr-sunday-nightshift', cat: 'frame', brand: 'Sunday', model: 'Nightshift',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2268, price: 489.99,
    note: 'Top tube (20.5-21.25in), weight (5lb) and price confirmed via store.sundaybikes.com 2026-07-17; other interfaces assumed standard, unverified.'
  },
  {
    id: 'bmx-fr-sunday-parkranger', cat: 'frame', brand: 'Sunday', model: 'Park Ranger',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2268, price: 349.99,
    note: 'Sunday\'s entry-level freestyle frame; top tube (19.75-21in), weight (5lb) and price confirmed via store.sundaybikes.com 2026-07-17.'
  },

  // ---- Odyssey depth (parts brand, no frames/no forks beyond the R32) --
  {
    id: 'bmx-sp-odyssey-tripletrap-28', cat: 'sprocket', brand: 'Odyssey', model: 'Triple Trap Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 49.99,
    note: 'Odyssey\'s long-running guard-compatible spline sprocket.'
  },
  {
    id: 'bmx-rh-odyssey-antigramv2-9', cat: 'rearWheel', brand: 'Odyssey', model: 'Antigram V2 Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 560, price: 119.99
  },
  {
    id: 'bmx-pg-odyssey-chromoly', cat: 'pegs', brand: 'Odyssey', model: 'Chromoly Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: false, price: 19.99
  },
  {
    id: 'bmx-br-odyssey-springfieldpro', cat: 'brake', brand: 'Odyssey', model: 'Springfield Pro U-Brake',
    mount: 'u-brake', price: 39.99
  },
  {
    id: 'bmx-hb-odyssey-brocraiford', cat: 'handlebar', brand: 'Odyssey', model: 'Broc Raiford Bars',
    clamp: '25.4mm', rise: 8.5, width: 29, price: 84.99,
    note: 'Broc Raiford signature bar.'
  },
  {
    id: 'bmx-st-odyssey-krad', cat: 'stem', brand: 'Odyssey', model: 'K-Rad Stem',
    clamp: '25.4mm', price: 34.99
  },

  // ---- Cult depth (cultcrew.com/collections/frames fetched 2026-07-17:
  //      model names + price confirmed; geometry/interfaces not published
  //      on the collection page, so filled with the standard-freestyle
  //      assumption and left unverified) ------------------------------
  {
    id: 'bmx-fr-cult-treyjonesswampfest', cat: 'frame', brand: 'Cult', model: 'Trey Jones Swampfest',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 399.99,
    note: 'Trey Jones signature frame; model + price re-confirmed via cultcrew.com/products/trey-jones-swampfest-frame.js 2026-07-17 (options 20-21.8in TT, all $399.99). Geometry/interfaces still not published there (75deg HT/71deg ST angles given, but no BB shell/brake-mount/axle spec), so left unverified. NOT adding the page\'s reported weight (4990g): cultcrew.com\'s Shopify weight field is a shipping-carton placeholder, not a real product weight (see bmx-fr-cult-race — its weight field is also exactly 4990g, identical to this unrelated frame, while its OWN body copy says "just over 4lbs" ~1814g; og-headset and bottom-bracket both report exactly 907g; crew-crank and the Vans tire both report exactly 1814g — all round-pound shipping buckets). Flagging this sitewide weight-field trap for future BMX verification batches.'
  },
  {
    id: 'bmx-fr-cult-race', cat: 'frame', brand: 'Cult', model: 'Race Frame',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'caliper', rearAxle: '14mm', frameOnly: true,
    price: 399.00,
    note: 'Cult\'s disc-brake race frame; model + price re-confirmed via cultcrew.com/products/vick-behm-race-frame-black.js 2026-07-17. bbShell:\'euro\' CONFIRMED ("68mm Euro BB" stated). rearBrakeMount mapping to \'caliper\' stands (disk brake). rearAxle is UNCONFIRMED and likely wrong: the page states "3/8\" dropouts", not 14mm — but BMX_VOCAB axle only enumerates [10mm,14mm], no 3/8" token, and this field is not currently read by any checkBmxBuild rule (dormant/display-only), so left as-is rather than fabricate a vocab-illegal value. FLAG for the coordinator: BMX_VOCAB.axle may need a 3/8" value before frame rearAxle can be entered/verified accurately for 3/8"-dropout race frames. Also NOT adding a weight: the page\'s Shopify weight field (4990g) is a shipping-placeholder shared byte-identically with the unrelated Swampfest frame above, while this page\'s own body copy says "just over 4lbs" (~1814g) — neither figure is trustworthy enough to record as verified.'
  },
  {
    id: 'bmx-cr-cult-3piece', cat: 'cranks', brand: 'Cult', model: '3-Piece Crank Set',
    spindle: '19mm', pieces: '3-piece', ringMount: 'spline', price: 139.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/crew-crank',
    note: 'Corrected spindle 22mm -> 19mm and price 249.99 -> 139.99 (base 160mm/Black) to match Cult\'s current "Crew Cranks": "3-pc tubular design... 19mm hollow chromoly spindle with 48 splines". pieces:\'3-piece\' confirmed. ringMount left as \'spline\' (plausible for the splined sprocket boss design, not independently confirmed and not checkBmxBuild-critical). NOT recording the page\'s weight (1814g): identical placeholder figure also shown for an unrelated tire SKU on this store (see the Cult frame notes above) — a shipping-weight bucket, not the crank\'s real mass.'
  },
  {
    id: 'bmx-bb-cult-mid-22', cat: 'bb', brand: 'Cult', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 27.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/bottom-bracket',
    note: 'shell:\'mid\' and spindleFit:\'22mm\' CONFIRMED via Cult\'s current "Bottom Bracket" (cultcrew.com/products/bottom-bracket: "precision sealed MID bearings... 19mm and 22mm" spindle options — 22mm is a real purchasable variant). Price corrected 24.99 -> 27.99. Page weight (907g) not recorded: identical placeholder figure shared with the unrelated Headset product page — a shipping-weight bucket.'
  },
  {
    id: 'bmx-sp-cult-splinedrive-28', cat: 'sprocket', brand: 'Cult', model: 'Spline Drive Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 44.99,
    note: 'UNVERIFIED, checked 2026-07-17: no "Spline Drive Sprocket" found on cultcrew.com — the current Cult sprocket is "Conviction Guard Sprocket" ($44.99, a bash-guard-style sprocket, different design). Could not confirm teeth/mount/pitch for this exact SKU on the current site; left unchanged as pre-existing sample data.'
  },
  {
    id: 'bmx-pg-cult-steel', cat: 'pegs', brand: 'Cult', model: 'Steel Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: false, price: 22.99,
    note: 'UNVERIFIED, checked 2026-07-17: cultcrew.com sells no peg literally named "Steel Pegs" — current lineup is "Doomsday Peg" ($13.99, heat-treated chromoly) and "Butter Peg" ($16.99, 4130 core + nylon sleeve). axleFit:\'14mm\' IS confirmed as accurate: BOTH current Cult pegs state "14mm pegs with 3/8 adapters" (cultcrew.com/products/doomsday-pegs, /products/butter-pegs) — the one checkBmxBuild-critical field checks out — but model/material/price don\'t match a specific current SKU. Left unchanged pending a clearer SKU match.'
  },
  {
    id: 'bmx-ti-cult-vans-24', cat: 'tire', brand: 'Cult', model: 'Vans Tire 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 95, price: 30.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/vans-x-cult-tire-20-gum',
    note: 'Cult x Vans collaboration tire. wheelSize:\'20\' and width:2.4 CONFIRMED via cultcrew.com\'s current "Vans x Cult Tire 20\\" / gum (single)" ("NEW AND IMPROVED 2.40 DESIGN", 20in). Price corrected 29.99 -> 30.99. casing:\'park\' and maxPsi:95 are not stated on the page and are left as pre-existing, unconfirmed values (not disproven, not engine-critical). Page weight (1814g) not recorded: identical placeholder figure shared with the unrelated Crew Cranks product page — a shipping-weight bucket.'
  },
  {
    id: 'bmx-fw-cult-vans', cat: 'frontWheel', brand: 'Cult', model: 'Vans Front Wheel',
    wheelSize: '20', axle: '10mm', price: 74.99,
    note: 'UNVERIFIED, checked 2026-07-17: cultcrew.com sells no "Vans"-branded front wheel — the Vans x Cult collab covers shoes/tires/grips only. The current front wheel product is "Crew Front Wheel v2" ($169.99-179.99, cultcrew.com/products/crew-front-wheel-v2-1: "Black or Polished CREW Front hub laced to a Black or Polished Match Rim"), which publishes no axle-diameter spec at all. This row\'s model name likely does not correspond to any real current Cult SKU; flagging for the coordinator/data-entry layer to reconsider (id is append-only so it cannot be renamed here). Left wheelSize/axle/price unchanged rather than guess.'
  },

  // ---- Fit Bike Co depth --------------------------------------------
  {
    id: 'bmx-fr-fitbikeco-trl', cat: 'frame', brand: 'Fit Bike Co', model: 'TRL',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 359.99, note: 'Fit\'s value-tier freestyle frame.'
  },
  {
    id: 'bmx-sp-fitbikeco-key-25', cat: 'sprocket', brand: 'Fit Bike Co', model: 'Key Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 42.99
  },
  {
    id: 'bmx-st-fitbikeco-key', cat: 'stem', brand: 'Fit Bike Co', model: 'Key Stem',
    clamp: '25.4mm', price: 32.99
  },
  {
    id: 'bmx-gr-fitbikeco-uni', cat: 'grips', brand: 'Fit Bike Co', model: 'Uni Grips',
    length: 143, flangeless: true, price: 9.99
  },

  // ---- Kink depth -----------------------------------------------------
  {
    id: 'bmx-fr-kink-curb', cat: 'frame', brand: 'Kink', model: 'Curb',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 419.99, note: 'Kink\'s street/park value-tier frame.'
  },
  {
    id: 'bmx-rh-kink-cage-9', cat: 'rearWheel', brand: 'Kink', model: 'Cage Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 99.99
  },
  {
    id: 'bmx-hb-kink-retro', cat: 'handlebar', brand: 'Kink', model: 'Retro Bars',
    clamp: '25.4mm', rise: 8.0, width: 28.75, price: 69.99
  },
  {
    id: 'bmx-sp-kink-pivotal-post', cat: 'seatpost', brand: 'Kink', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 17.99
  },
  {
    id: 'bmx-pd-kink-rival', cat: 'pedals', brand: 'Kink', model: 'Rival Pedals',
    platform: 'alloy', spindle: '9/16', weight: 350, price: 29.99
  },

  // ---- WeThePeople depth -----------------------------------------------
  {
    id: 'bmx-fr-wethepeople-trust', cat: 'frame', brand: 'WeThePeople', model: 'Trust',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 549.99, note: 'Front-load street frame in WeThePeople\'s current lineup.'
  },
  {
    id: 'bmx-cr-wethepeople-compulsion', cat: 'cranks', brand: 'WeThePeople', model: 'Compulsion Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', price: 269.99
  },
  {
    id: 'bmx-hb-wethepeople-loop', cat: 'handlebar', brand: 'WeThePeople', model: 'Loop Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 74.99
  },
  {
    id: 'bmx-se-wethepeople-team', cat: 'seat', brand: 'WeThePeople', model: 'Team Pivotal Seat',
    system: 'pivotal', price: 26.99
  },
  {
    id: 'bmx-rh-wethepeople-oem-9', cat: 'rearWheel', brand: 'WeThePeople', model: 'OEM Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', price: 74.99
  },

  // ---- Eclat (new brand to the catalog) --------------------------------
  {
    id: 'bmx-fr-eclat-cortex', cat: 'frame', brand: 'Eclat', model: 'Cortex',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 429.99
  },
  {
    id: 'bmx-fk-eclat-onyx', cat: 'fork', brand: 'Eclat', model: 'Onyx Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', price: 99.99
  },
  {
    id: 'bmx-cr-eclat-onyx', cat: 'cranks', brand: 'Eclat', model: 'Onyx Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', price: 229.99
  },
  {
    id: 'bmx-bb-eclat-mid-22', cat: 'bb', brand: 'Eclat', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 22.99
  },
  {
    id: 'bmx-sp-eclat-spline-25', cat: 'sprocket', brand: 'Eclat', model: 'Spline Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 39.99
  },
  {
    id: 'bmx-rh-eclat-cortex-9', cat: 'rearWheel', brand: 'Eclat', model: 'Cortex Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 94.99
  },
  {
    id: 'bmx-fw-eclat-cortex', cat: 'frontWheel', brand: 'Eclat', model: 'Cortex Front Wheel',
    wheelSize: '20', axle: '10mm', price: 69.99
  },
  {
    id: 'bmx-hb-eclat-cortex', cat: 'handlebar', brand: 'Eclat', model: 'Cortex Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 64.99
  },
  {
    id: 'bmx-st-eclat-cortex', cat: 'stem', brand: 'Eclat', model: 'Cortex Stem',
    clamp: '25.4mm', price: 29.99
  },
  {
    id: 'bmx-gr-eclat-pulsar', cat: 'grips', brand: 'Eclat', model: 'Pulsar Grips',
    length: 143, flangeless: true, price: 8.99
  },
  {
    id: 'bmx-se-eclat-bios', cat: 'seat', brand: 'Eclat', model: 'Bios Pivotal Seat',
    system: 'pivotal', price: 24.99
  },
  {
    id: 'bmx-sp-eclat-bios-post', cat: 'seatpost', brand: 'Eclat', model: 'Bios Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 16.99
  },
  {
    id: 'bmx-pg-eclat-alloy', cat: 'pegs', brand: 'Eclat', model: 'Alloy Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 27.99
  },
  {
    id: 'bmx-pd-eclat-slash', cat: 'pedals', brand: 'Eclat', model: 'Slash Pedals',
    platform: 'alloy', spindle: '9/16', weight: 345, price: 32.99
  },
  {
    id: 'bmx-ti-eclat-fireball-23', cat: 'tire', brand: 'Eclat', model: 'Fireball Tire 2.3"',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 100, price: 24.99
  },

  // ---- The Shadow Conspiracy depth (parts brand, no frames/forks) ------
  {
    id: 'bmx-cr-shadow-finest', cat: 'cranks', brand: 'The Shadow Conspiracy', model: 'Finest Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', price: 219.99
  },
  {
    id: 'bmx-sp-shadow-vultus-28', cat: 'sprocket', brand: 'The Shadow Conspiracy', model: 'Vultus Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 46.99
  },
  {
    id: 'bmx-rh-shadow-optimized-9', cat: 'rearWheel', brand: 'The Shadow Conspiracy', model: 'Optimized Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 109.99
  },
  {
    id: 'bmx-ti-shadow-strada-23', cat: 'tire', brand: 'The Shadow Conspiracy', model: 'Strada Tire 2.3"',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 100, price: 26.99
  },
  {
    id: 'bmx-pg-shadow-alloy', cat: 'pegs', brand: 'The Shadow Conspiracy', model: 'MFG Alloy Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 24.99
  },
  {
    id: 'bmx-br-shadow-raptor', cat: 'brake', brand: 'The Shadow Conspiracy', model: 'Raptor U-Brake',
    mount: 'u-brake', price: 42.99
  },
  {
    id: 'bmx-hb-shadow-feather', cat: 'handlebar', brand: 'The Shadow Conspiracy', model: 'Feather Bars',
    clamp: '25.4mm', rise: 8.0, width: 28.5, weight: 780, price: 79.99,
    note: 'Lightweight chromoly bar.'
  },
  {
    id: 'bmx-gr-shadow-gipsy', cat: 'grips', brand: 'The Shadow Conspiracy', model: 'Gipsy Grips',
    length: 143, flangeless: true, price: 10.99,
    note: 'Sean Ricany signature grip.'
  },
  {
    id: 'bmx-se-shadow-finest', cat: 'seat', brand: 'The Shadow Conspiracy', model: 'Finest Pivotal Seat',
    system: 'pivotal', price: 24.99
  },
  {
    id: 'bmx-sp-shadow-finest-post', cat: 'seatpost', brand: 'The Shadow Conspiracy', model: 'Finest Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 15.99
  },
  {
    id: 'bmx-pd-profile-elite', cat: 'pedals', brand: 'Profile Racing', model: 'Elite Pedals',
    platform: 'alloy', spindle: '9/16', weight: 380, price: 74.99
  },
  {
    id: 'bmx-pd-colony-fantom', cat: 'pedals', brand: 'Colony', model: 'Fantom Pedals',
    platform: 'alloy', spindle: '9/16', weight: 350, price: 44.99
  },
  {
    id: 'bmx-pd-bsd-motive', cat: 'pedals', brand: 'BSD', model: 'Motive Pedals',
    platform: 'plastic', spindle: '9/16', price: 17.99
  },
  {
    id: 'bmx-pd-chase-rsp-clip', cat: 'pedals', brand: 'Chase', model: 'RSP Clip Pedals',
    platform: 'clip', spindle: '9/16', weight: 300, price: 89.99
  }
];

// Node/test consumption only — the browser path stays plain globals, matching
// src/compat.js's own export-guard convention.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BMX_PARTS: BMX_PARTS };
}
