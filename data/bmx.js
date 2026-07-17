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
    price: 419.99,
    note: 'Checked thebuildingdistro.com (Fit\'s current webstore, fitbikeco.com/shop/* now 301s there) 2026-07-17: Series One is a current 2026 complete-bike platform (multiple TT lengths/colors) and Fit still sells a companion Series One fork ($114.95) standalone, but no frame-only Series One SKU was found on the current site — cannot verify this frameOnly row against a live manufacturer page. Left unverified; spec unchanged (plausible sample).'
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
    price: 459.99,
    note: 'Holmes is a real S&M heritage/90s model (sandmbikes.com/1995/holmes-frame, sandmbikes.com/1990/the-holmes) but is NOT in S&M\'s current production lineup (current sandmbikes.com frames: Whammo V2, Holy Diver, NBD, Tall Boy, BTM, BTM XL, ATF variants, Black Magic, Hucker, M.O.D., C.C.R., Dagger, Steel Panther) - retailer listings show it "Not Available". Existing spec values (mid BB, integrated head tube, u-brake, 14mm axle, 21in TT) are consistent with historical Next Gen Holmes catalog data found via search, but no current manufacturer product page exists to fetch, so left unverified.'
  },
  {
    id: 'bmx-fr-colony-sweettooth', cat: 'frame', brand: 'Colony', model: 'Sweet Tooth',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.7, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 429.99, note: 'Alex Hiam signature frame; real published sizes are 18.9/19.2/20.4/20.7/21in (corrected from a non-existent 20.6in) — ships bossless with a removable brake-tab kit sold separately, so brakeless-stock is correct. Currently sold only via Colony\'s AU distributor/retail channel, not colonybmx.com.au\'s own current frame lineup, so it does not clear the manufacturer-own-page verification bar; weight/price remain sample.'
  },
  {
    id: 'bmx-fr-haro-downtown', cat: 'frame', brand: 'Haro', model: 'Downtown',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 379.99
  },
  {
    id: 'bmx-fr-mongoose-legion', cat: 'frame', brand: 'Mongoose', model: 'Legion L20',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'american', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 299.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.mongoose.com/products/legion-l20-m20',
    note: 'Complete bike only (Mongoose does not sell this frame separately). Maker page corrects bbShell to American loose-ball (catalog previously had mid, wrong) and price to $299.99 (was $349.99); confirms 14mm sealed-cassette rear axle, threadless integrated 1-1/8in headset, U-brake.'
  },
  {
    id: 'bmx-fr-totalbmx-killabee', cat: 'frame', brand: 'Total BMX', model: 'Killabee',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.7, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    weight: 2100, price: 449.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://totalbmx.com/products/total-bmx-killabee-k4-frame-black-yellow',
    note: 'Kyle Baldock signature Killabee K4: totalbmx.com confirms mid BB, integrated head tube (120mm, drilled for gyro tabs), removable (not welded) rear brake mounts run brakeless by default, and 14mm dropout slots. Top tube corrected from 20.75in (not an offered size) to 20.7in, the closest real K4 length (options: 19.75/20.4/20.7/21in). Weight ~2100g per the K4\'s published 2.1-2.14kg (size-dependent). totalbmx.com prices in CZK/AUD/GBP with no clean USD MSRP, so price is kept as the prior unconfirmed sample figure.'
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
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 449.99,
    note: 'CORRECTED 2026-07-17: fiendbmx.com (maker) shows the Type O ships standard with a Mission Cease rear brake + Token lever, so the frame has rear brake bosses (was wrongly "none"/brakeless in this row); Fiend sells the Type O only as a complete bike (frameOnly was wrongly true). Not independently manufacturer-verified (fiendbmx.com is a build-spec description page, not a frame-only spec sheet), so left unverified.'
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
    weight: 1532, price: 549.99,
    note: 'bbShell/headTube/rearBrakeMount and the 21.0in top tube (Pro XL size) confirmed against chasebicycles.com\'s RSP 3.0 frame-archive page 2026-07-17 (V-brake-only, BSA-threaded 68/73mm shell = this catalog\'s euro token, integrated headset); weight (1532g) is that page\'s per-size table for the Pro XL (21in) row. Price (549.99) and rearAxle are NOT stated on the archive page (this is a discontinued frame with no current listing), so left unverified rather than claiming verified on an unconfirmed price. Source: https://chasebicycles.com/frames/frame-archives/chase-rsp-3-0/'
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
    weight: 1500, price: 349.99,
    note: 'Chase\'s entry/intermediate race frame, below the RSP 3.0 in the lineup. This row matches the older frame-only Element (chasebicycles.com/frames/frame-archives/chase-element-frame-2016/ — CAUTION: the CURRENT "Chase Element" name on chasebicycles.com now refers to an unrelated disc-brake-only, Press-Fit-BB86, complete-bike-only line; do not confuse the two). rearBrakeMount (v-brake) and topTube (20.5in = the Pro size) confirmed against the 2016 archive page 2026-07-17; weight (1500g) is that page\'s Pro-size figure. bbShell/headTube are the RSP-series-standard assumption, NOT stated on this page, so left unverified. Price not listed on the archive page either.'
  },
  {
    id: 'bmx-fr-gt-performer', cat: 'frame', brand: 'GT', model: 'Performer',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 675.00,
    verified: true, lastChecked: '2026-07-17', source: 'https://gtbicycles.com/products/pro-performer-20',
    note: 'GT\'s long-running heritage/old-school reissue platform, sold as a complete bike ("GT BMX Pro Performer 20"). bbShell (Sealed Mid 22mm), headTube (Integrated 1-1/8in), rearBrakeMount (U-brake) and rearAxle (14mm dropout / 3/8in cassette) all confirmed. topTube corrected 20.5 -> 20.75in. Price corrected 469.99 -> 675.00 (Shopify variant JSON, gtbicycles.com/products/pro-performer-20.js).'
  },
  {
    id: 'bmx-fr-gt-fly', cat: 'frame', brand: 'GT', model: 'Fly',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 429.99,
    note: 'WALL 2026-07-17: gtbicycles.com/collections/bmx-bikes lists no current "Fly" model (confirmed via direct fetch) - the Fly was a GT model sold roughly 2001-2014 and is fully discontinued; its old product URL 404s and no Wayback snapshot was fetchable this session (web.archive.org unreachable via WebFetch/Exa in this environment). Corrected the prior note, which wrongly called this "GT\'s current...complete bike" - it is not currently sold. Left unverified/uncorrected otherwise: no manufacturer source found to confirm or refute the interface fields.'
  },
  {
    id: 'bmx-fr-gt-speedseries-pro', cat: 'frame', brand: 'GT', model: 'Speed Series Pro',
    discipline: 'race', wheelSize: '20', bbShell: 'spanish', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'caliper', rearAxle: '15mm', frameOnly: false,
    price: 900.00,
    verified: true, lastChecked: '2026-07-17', source: 'https://gtbicycles.com/products/speed-series-pro',
    note: 'GT\'s race-team-tier complete bike. bbShell corrected euro -> spanish (frame is BB86 press-fit, unthreaded - the "Spanish BB" token, not the threaded Euro shell). rearBrakeMount corrected v-brake -> caliper (disc-brake-only frame, "AL CNC/Forged Quick Change Disc Dropout system"). rearAxle corrected 14mm -> 15mm per the same disc dropout spec - NOTE: 15mm exceeds BMX_VOCAB.axle\'s documented [10mm,14mm] list (flagged for the coordinator/vocab update; frame.rearAxle is not itself read by checkBmxBuild so this is a data-accuracy fix, not a verdict change). headTube (integrated 1-1/8-1.5 taper) and topTube (20.75in Pro size) confirmed. Price corrected 799.99 -> 900.00 (gtbicycles.com/products/speed-series-pro.js); the separate frame-only SKU (gtbicycles.com/products/speed-series-pro-frame) is $262.50 for reference, not used here since this row is frameOnly:false.'
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
    topTube: 20.8, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    weight: 2270, price: 439.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://us.bsdforever.com/products/bsd-focus-gaspar-guendulain-frame',
    note: 'Gaspar Guendulain signature Focus frame; us.bsdforever.com confirms mid BB, integrated head tube, removable brake mounts (sold separately - runs brakeless by default), and 14mm dropouts. Top tube corrected from 20.6in (not an offered size) to 20.8in, the shortest real option (20.8/21/21.2/21.5in). Weight ~2270g per the published "5lbs". US-store price ($439.99) matches this row exactly.'
  },
  {
    id: 'bmx-fr-flybikes-nassau', cat: 'frame', brand: 'Fly Bikes', model: 'Nassau',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'Fly Bikes (Spain) street/park frame; commonly run brakeless. Checked flybikes.com 2026-07-17: current frame lineup is Dove/Savanna/Fuego V-8/Motosierra/Aire/Sierra -- no Nassau frame found (product page 302-redirects, site search returns nothing), appears discontinued. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-fr-totalbmx-techlite', cat: 'frame', brand: 'Total BMX', model: 'Techlite',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    weight: 1950, price: 469.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Techlite" frame found for Total BMX (real current frames: TWS 2, Killabee K4, Hangover H4, 657 X, Americano, Concorde). Left as unverified sample data; model name is not confirmed to a real Total BMX SKU.'
  },
  {
    id: 'bmx-fr-sandm-pitchfork', cat: 'frame', brand: 'S&M', model: 'Pitchfork',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 459.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): "Pitchfork" is S&M\'s long-running FORK (sandmbikes.com/product/hardgoods/pitchfork - steerer/dropout/offset spec sheet, no BB shell or head tube fields), not a frame - no S&M "Pitchfork frame" product exists in current or historical listings found. This row is likely miscategorized/misnamed at entry; left as unverified sample data, not corrected to the fork\'s real spec (would change category). Flagged for coordinator review.'
  },
  {
    id: 'bmx-fr-colony-emerald', cat: 'frame', brand: 'Colony', model: 'Emerald',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.7, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'UNRESOLVED: could not confirm "Emerald" as a real Colony frame model — colonybmx.com.au\'s current frame lineup (Prody/Cadet/Bloody Oath/Rico/Enishi/Prisma/Blaster/Horizon Alloy) has no Emerald, and "Emerald" only turns up as a colorway name (grips/pedals/tire) in Colony\'s own archives. Flagged for the coordinator — likely needs replacing with a real model or removal from a future data-entry pass; specs below are unverified sample, not sourced.'
  },

  // ===== FRAMES — seat 12 depth pass (new brands) =====================
  {
    id: 'bmx-fr-subrosa-malum', cat: 'frame', brand: 'Subrosa', model: 'Malum',
    family: 'subrosa-malum', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 659.99,
    note: 'Frame spec pulled from the Malum complete-bike page (Source BMX); BB is 19mm-spindle Mid per the complete-bike crank/BB callout.'
  },
  {
    id: 'bmx-fr-subrosa-salvador', cat: 'frame', brand: 'Subrosa', model: 'Salvador',
    family: 'subrosa-salvador', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 796.00,
    note: 'Frame spec pulled from the Salvador complete-bike page (Source BMX); hi-ten frame with chromoly top/down tube, entry-to-intermediate tier.'
  },
  {
    id: 'bmx-fr-mankind-sunchaser', cat: 'frame', brand: 'Mankind', model: 'Sunchaser (Ed Black)',
    family: 'mankind-sunchaser', modelYear: 2020, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: true, weight: 2100, price: 379.95,
    note: 'Daniel Juchatz signature frame (mankindbmx.com); also offered in 20.75/21/21.25in top tube. Price is EUR retail. Removable U-brake mounts, gyro-compatible, integrated seat clamp + chain tensioners.'
  },
  {
    id: 'bmx-fr-radio-darko', cat: 'frame', brand: 'Radio Bikes', model: 'Darko',
    family: 'radio-darko', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 524.99,
    note: 'Frame spec pulled from the Darko complete-bike page (radiobikes.com); also offered in 21in top tube. Mid press-fit BB, fully removable brake hardware.'
  },
  {
    id: 'bmx-fr-premium-solo', cat: 'frame', brand: 'Premium', model: 'Solo',
    family: 'premium-solo', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 360.00,
    note: 'Frame spec pulled from the Solo complete-bike page; also offered in 20/20.5in top tube. Price is an archived 2012 MSRP (Premium/Haro catalog archive) - current pricing not re-sourced.'
  },
  {
    id: 'bmx-fr-verde-cadet', cat: 'frame', brand: 'Verde', model: 'Cadet',
    family: 'verde-cadet', modelYear: 2021, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 20.25, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: false, price: 399.99,
    note: 'Frame spec pulled from the Cadet complete-bike page (verdebicycles.com); entry-level hi-ten frame w/ Mid BB, alloy U-brake.'
  },
  {
    id: 'bmx-fr-verde-eon', cat: 'frame', brand: 'Verde', model: 'Eon',
    family: 'verde-eon', modelYear: 2021, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: false, price: 529.99,
    note: 'Frame spec pulled from the Eon complete-bike page (verdebicycles.com); also offered in 21in (XL) top tube; hi-ten frame w/ chromoly top/down tube, Mid BB, alloy U-brake.'
  },
  {
    id: 'bmx-fr-united-supreme', cat: 'frame', brand: 'United', model: 'Supreme',
    family: 'united-supreme', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 465.00,
    note: 'Frame spec pulled from the Supreme complete-bike page; also offered in 20.75in top tube. U-brake is the classic "990"-style mount, removable.'
  },
  {
    id: 'bmx-fr-mongoose-legionl60', cat: 'frame', brand: 'Mongoose', model: 'Legion L60',
    family: 'mongoose-legion', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 281.99,
    note: 'Frame spec pulled from the Legion L60 complete-bike page (mongoose.com); Hi-Ten steel frame, Mid BB shell, aluminum U-brake and levers.'
  },
  {
    id: 'bmx-fr-mongoose-legionl100', cat: 'frame', brand: 'Mongoose', model: 'Legion L100',
    family: 'mongoose-legion', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 298.99,
    note: 'Frame spec pulled from the Legion L100 complete-bike page (int.mongoose.com / current Walmart listing); full 4130 chromoly frame (step up from the L60\'s Hi-Ten), Mid BB shell, aluminum U-brake.'
  },
  {
    id: 'bmx-fr-sunday-blueprint', cat: 'frame', brand: 'Sunday', model: 'Blueprint',
    family: 'sunday-blueprint', modelYear: 2023, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'american', headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: false, price: 469.99,
    note: 'Frame spec pulled from the Blueprint complete-bike page (shop.sundaybikes.com); also offered in 20in top tube. BB parts are listed as "Loose-ball, American, 19mm" - American-shell BB, unusual for an entry frame but per maker spec.'
  },
  {
    id: 'bmx-fr-supercross-envyblk2-expertxl', cat: 'frame', brand: 'Supercross BMX', model: 'ENVY BLK 2 Expert XL',
    family: 'supercross-envyblk2', discipline: 'race', wheelSize: '20', bbShell: 'euro',
    headTube: 'integrated-1-1/8', topTube: 20, rearBrakeMount: 'v-brake', rearAxle: '10mm',
    frameOnly: true, price: 1195.95,
    note: 'Carbon fiber race frame, Expert XL size (10mm/3-8in rear axle - the larger Pro sizes ship a 15mm dropout w/ 10mm adapter, not modeled here). Threaded Euro BB shell, 22.2mm seatpost, removable V-brake mounts.'
  },

  // ===== FORKS ========================================================
  {
    id: 'bmx-fk-odyssey-r32', cat: 'fork', brand: 'Odyssey', model: 'R32',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', weight: 885, price: 219.99,
    note: 'Weight (885g/1lb 15.2oz) and price ($219.99) corrected 2026-07-17 via shop.odysseybmx.com (3/8in axle slot = the 10mm token). Brake-mount bosses NOT stated on the maker page (retailer copy suggests the R32 is sold brakeless, F-series is the braked variant) so brakeMount is left as the unverified sample value and the row stays unverified.'
  },
  {
    id: 'bmx-fk-merritt-cnc', cat: 'fork', brand: 'Merritt', model: 'CNC 3-Piece',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 650, price: 149.99, note: 'Commonly run brakeless.'
  },
  {
    id: 'bmx-fk-wethepeople-pathfinder', cat: 'fork', brand: 'WeThePeople', model: 'Pathfinder',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', weight: 720, price: 119.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): wethepeoplebmx.de sells a Pathfinder FRAME and Pathfinder handlebars, but no fork named Pathfinder - current WTP fork lineup is Message/Battleship/Utopia/Patrol/Arc/Flash/Audio. Left as unverified generic-fork sample data; spec values are not sourced to a real Pathfinder-branded fork.'
  },
  {
    id: 'bmx-fk-fitbikeco-tibs', cat: 'fork', brand: 'Fit Bike Co', model: 'TIBS',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', weight: 690, price: 109.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: current Fit fork lineup is Blade V3, Shiv V3, OEM Forks, Series One fork and FK 1.0 — no TIBS fork found, appears discontinued. Left unverified; spec unchanged.'
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
    brakeMount: 'none', weight: 660, price: 119.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Mianus" fork (or any Mianus-named product) found for S&M in current or historical listings - "Mianus" does not appear anywhere in S&M\'s catalog history; S&M\'s actual long-running 3-piece fork is the Pitchfork (see bmx-fr-sandm-pitchfork\'s note - miscategorized as a frame in this catalog). Left as unverified sample data; likely a fabricated/placeholder name. Flagged for coordinator review.'
  },
  {
    id: 'bmx-fk-totalbmx-yfork', cat: 'fork', brand: 'Total BMX', model: 'Y-Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 640, price: 109.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Y-Fork" found for Total BMX (real current forks: Hangover - 28mm offset, 10mm dropouts, 1-1/8in steerer; TWS - same spec family). Left as unverified sample data; model name is not confirmed to a real Total BMX SKU.'
  },
  {
    id: 'bmx-fk-chase-rsp', cat: 'fork', brand: 'Chase', model: 'RSP Race Fork',
    discipline: 'race', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'v-brake', weight: 420, price: 94.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (confirmed via its own nav: Bikes/Frames/Gear/Technologies/Team only - no Parts or Components section, no fork/crank/sprocket/brake/bar/stem/pedal product pages exist on the site). Left unchanged, not verified.'
  },

  // ===== HEADSETS ======================================================
  {
    id: 'bmx-hs-cult-integrated', cat: 'headset', brand: 'Cult', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 27.99,
    note: 'Price corrected 24.99 -> 27.99 to match Cult\'s current "Headset" product (cultcrew.com/products/og-headset, checked 2026-07-17: "OG HEADSET / 2 different sized stackable caps and three spacers"). Left UNVERIFIED: that page states no fit/standard text at all (no "integrated" or "1-1/8" wording), so fit:\'integrated-1-1/8\' — while consistent with Cult\'s frames all using integrated 1-1/8in headtubes — is not literally confirmed by this source. Page weight (907g) not recorded: identical placeholder figure also appears on the unrelated Bottom Bracket product page, a shipping-weight bucket, not this part\'s real mass.'
  },
  {
    id: 'bmx-hs-odyssey-integrated', cat: 'headset', brand: 'Odyssey', model: 'Pro Headset',
    fit: 'integrated-1-1/8', price: 34.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/pro-headset',
    note: 'Odyssey\'s "Pro Headset" - real product name corrected from generic "Integrated Headset"; 1-1/8in integrated fit + $34.99 price confirmed on the fetched maker page (was $22.99).'
  },
  {
    id: 'bmx-hs-salt-pro', cat: 'headset', brand: 'Salt', model: 'Pro Integrated Headset',
    fit: 'integrated-1-1/8', price: 19.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://saltbmx.com/products/salt-pro-headset',
    note: 'WeThePeople in-house parts brand (Salt). Maker page confirms int. 1-1/8in sealed fit; lists EUR21.99 (region price), catalog USD price left as prior sample.'
  },
  {
    id: 'bmx-hs-profile-integrated', cat: 'headset', brand: 'Profile Racing', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 24.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com\'s Profile BMX category list (cranks/BB/hubs/wheels/stems/spiders/sprockets/chainrings/freewheels) and searched the site directly - Profile Racing does not appear to manufacture or sell headsets at all; it is a hub/crank/BB/drivetrain-hardware maker. Likely a brand-misattribution predating this session. Left unverified, unchanged (out of scope to delete/reattribute a catalog row); flagged prominently for the coordinator to decide (correct brand vs. remove).'
  },
  {
    id: 'bmx-hs-flybikes-integrated', cat: 'headset', brand: 'Fly Bikes', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 35.00, weight: 65,
    note: 'Checked flybikes.com 2026-07-17: current Fly headset is the "Volcano Headset Black" ($35.00, 65g, 6061-T6 CNC cups) -- corrected price and weight to match (was 21.99, no weight). The page describes it only as "integrated" without stating the 1-1/8in bore explicitly, so `fit` is left as the near-universal BMX default rather than claimed verified (every BMX frame in this catalog is integrated-1-1/8, but that specific numeric bore was not read off this page).'
  },

  // ===== GYRO / DETANGLER (freestyle only) ============================
  {
    id: 'bmx-gy-odyssey-g3kit', cat: 'gyro', brand: 'Odyssey', model: 'Gyro G3 Kit',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', price: 22.99,
    note: 'Odyssey has made the Gyro since 1986; the G3 is the affordable full kit (cables included). Checked 2026-07-17 via shop.odysseybmx.com/products/odyssey-gyro-g3-kit-black: price ($22.99) and dual-cable design confirmed on the maker page; no wrong fields found. steererFit (1-1/8in threadless) is not literally stated on the page, so the row stays unverified rather than claim a field the source never states.'
  },
  {
    id: 'bmx-gy-odyssey-gtxs', cat: 'gyro', brand: 'Odyssey', model: 'GTX-S Gyro',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', weight: 145, price: 49.99,
    note: '17mm stack height, sealed bearing, 6061-T6 aluminum (detangler only, cables sold separately in the GTX-S Pro kit). Checked 2026-07-17 via shop.odysseybmx.com/products/odyssey-gyro-gtx-s-black: price ($49.99), dual-cable design and 17mm stack confirmed; no wrong fields found. steererFit and the 145g weight are not stated on the page (no maker or measured weight source found), so the row stays unverified.'
  },
  {
    id: 'bmx-gy-shadow-sanov2', cat: 'gyro', brand: 'The Shadow Conspiracy', model: 'Sano V2 Detangler',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', price: 44.99,
    note: 'CNC 6061-T6 aluminum, sealed bearing, low stack height.'
  },
  {
    id: 'bmx-gy-blackops-rotorblade', cat: 'gyro', brand: 'Black Ops', model: 'Rotor Blade Detangler Kit',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', price: 19.99,
    note: 'Budget-tier full kit (gyro, top plate, lower assembly, upper + lower cables included).'
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
    verified: true, lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/rhd-3-piece-chromoly-race-crankset-2/',
    note: 'Confirmed as the RHD (bolt-on boss) 3-Piece Chromoly Race Crankset: 19mm GDH CrMo axle, 3-piece, bolt-on sprocket boss, base price $286.99 (2026-07-17). No per-config weight published (arm length is a variant); left without a weight field like the existing verified Elite AL crank rows.'
  },
  {
    id: 'bmx-cr-odyssey-calibre', cat: 'cranks', brand: 'Odyssey', model: 'Calibur V2 Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 900, price: 179.99,
    note: 'Model name corrected 2026-07-17 (real product is "Calibur v2", not "Calibre"); spindle (22mm hollow, 48-spline), 3-piece and spline sprocket mount confirmed via shop.odysseybmx.com/products/odyssey-calibur-v2-bmx-cranks-rustproof-black ($179.99, was $199.99). No maker weight is published and no reputable third-party MEASURED figure (retailer listings only) was found, so weight stays the sample 900g and the row is left unverified.'
  },
  {
    id: 'bmx-cr-sandm-xlr8r', cat: 'cranks', brand: 'S&M', model: 'XLR8R Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 950, price: 219.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "XLR8R" crank found for S&M (real current cranks: OEM 19 - 19mm/48-spline; historical Prince Albert). Left as unverified sample data; model name is not confirmed to a real S&M SKU.'
  },
  {
    id: 'bmx-cr-stolen-team', cat: 'cranks', brand: 'Stolen', model: 'Team Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', price: 189.99
  },
  {
    id: 'bmx-cr-profile-race-22', cat: 'cranks', brand: 'Profile Racing', model: 'Race Cranks 22mm',
    spindle: '22mm', pieces: '3-piece', ringMount: 'press-on', price: 299.99,
    note: '22mm-spindle version of Profile\'s classic chromoly race crank family (Profile\'s Tech Tip #37 covers the 19mm vs 22mm tradeoff). UNCONFIRMED 2026-07-17: fetched profileracing.com/product-category/profile-bmx/profile-cranks/ and both current Race Crankset SKUs (RHD, No Boss) list ONLY a 19mm axle today - no 22mm option found. Left unverified/unchanged (no better source found) - may be a discontinued spec; flagged for the coordinator.'
  },
  {
    id: 'bmx-cr-flybikes-pz1', cat: 'cranks', brand: 'Fly Bikes', model: 'PZ1 Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 920, price: 209.99,
    note: 'Checked flybikes.com 2026-07-17: current Fly crank lineup is only "Dolmen II Cranks" ($250.00) -- no PZ1 found, appears discontinued/renamed. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-cr-bsd-dvt', cat: 'cranks', brand: 'BSD', model: 'DVT Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 940, price: 199.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "DVT" crank found for BSD (real current cranks: Substance - 22mm spindle, 2.5pc; Substance XL V2 - 24mm spindle, 2.5pc). Left as unverified sample data; model name is not confirmed to a real BSD SKU.'
  },
  {
    id: 'bmx-cr-chase-rsp', cat: 'cranks', brand: 'Chase', model: 'RSP Race Cranks',
    spindle: '19mm', pieces: '3-piece', ringMount: 'press-on', price: 279.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },

  // ===== BOTTOM BRACKETS ===============================================
  {
    id: 'bmx-bb-profile-euro-22', cat: 'bb', brand: 'Profile Racing', model: 'Euro Outboard BB',
    shell: 'euro', spindleFit: '22mm', weight: 148, price: 71.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/euro-externaloutboard-bottom-bracket/',
    note: 'CORRECTED 2026-07-17: maker page confirms Euro External (Outboard) BB is ONE SKU sold in both 19mm and 22mm axle fit at a single price, $71.99 (was $39.99) and 148g/5.18oz (weight was missing).'
  },
  {
    id: 'bmx-bb-salt-mid-19', cat: 'bb', brand: 'Salt', model: 'Mid Sealed BB',
    shell: 'mid', spindleFit: '19mm', price: 24.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://saltbmx.com/products/salt-rookie-mid-bb',
    note: 'Matches the press-fit spec published on the WeThePeople Justice frame page (bmx-fr-wethepeople-justice). Maker page (current lineup name: Rookie Mid BB Set) confirms a mid-shell 19mm-spindle sealed BB kit exists in Salt\'s current range.'
  },
  {
    id: 'bmx-bb-odyssey-american', cat: 'bb', brand: 'Odyssey', model: 'American BB',
    shell: 'american', spindleFit: '19mm', price: 24.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-american-bb-silver',
    note: 'American shell + 19mm spindle fit and price ($24.99, was $22.99) confirmed on the fetched maker page ("made to fit 19mm crank spindles and American BB frames"). No weight is published or needed (this row never carried one).'
  },
  {
    id: 'bmx-bb-totalbmx-mid-22', cat: 'bb', brand: 'Total BMX', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', weight: 158, price: 27.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://totalbmx.com/products/total-bmx-team-mid-bottom-bracket-black',
    note: 'Real product name is "Team Mid Bottom Bracket"; totalbmx.com confirms mid shell, 19mm/22mm spindle options (this row is the 22mm SKU), and 0.158kg/5.6oz weight. totalbmx.com lists EUR32.95, not a USD MSRP, so price is kept as the prior unconfirmed sample figure.'
  },
  {
    id: 'bmx-bb-profile-euro-19', cat: 'bb', brand: 'Profile Racing', model: 'Euro Outboard BB 19mm',
    shell: 'euro', spindleFit: '19mm', weight: 148, price: 71.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/euro-externaloutboard-bottom-bracket/',
    note: 'CORRECTED 2026-07-17: maker page confirms Euro External (Outboard) BB is ONE SKU sold in both 19mm and 22mm axle fit at a single price, $71.99 (was $39.99) and 148g/5.18oz (weight was missing).'
  },
  {
    id: 'bmx-bb-gt-mid-22', cat: 'bb', brand: 'GT', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 24.99,
    note: 'shell/spindleFit confirmed 2026-07-17 against the GT Pro Performer 20 spec sheet ("Sealed Mid 22mm" BB, https://gtbicycles.com/products/pro-performer-20) - values already matched, no correction needed. GT does not sell this BB as a standalone SKU (only a "Power Series American BB" appears in gtbicycles.com/collections/cranks-bb), so price is unconfirmed and this row is left unverified despite the confirmed interface.'
  },
  {
    id: 'bmx-bb-flybikes-mid-22', cat: 'bb', brand: 'Fly Bikes', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 26.99,
    note: 'Checked flybikes.com 2026-07-17: current Fly BB lineup is only "Rotar Bottom Brackets" ($40.00) -- no "Mid BB" found by that name, appears renamed/discontinued. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-bb-odyssey-mid-22', cat: 'bb', brand: 'Odyssey', model: 'Mid BB (22mm)',
    shell: 'mid', spindleFit: '22mm', price: 24.99,
    note: 'Aftermarket sealed Mid BB set, fits press-fit Mid shells; ships with a spacer assortment.'
  },
  {
    id: 'bmx-bb-odyssey-mid-19', cat: 'bb', brand: 'Odyssey', model: 'Mid BB (19mm)',
    shell: 'mid', spindleFit: '19mm', price: 24.99,
    note: 'Same Odyssey Mid BB set, 19mm-spindle version.'
  },

  // ===== SPROCKETS =====================================================
  {
    id: 'bmx-sp-odyssey-utilitypro-30', cat: 'sprocket', brand: 'Odyssey', model: 'Utility Pro Sprocket 30T',
    teeth: 30, mount: 'spline', pitch: '1/8', price: 49.99,
    note: 'Teeth (30T, sold as "Sprocket Only" without the guard at this size) and price ($49.99, was $44.99) confirmed 2026-07-17 via shop.odysseybmx.com/products/odyssey-utility-pro-sprocket-black. Chain pitch is not literally stated on the page ("compatible with all BMX chains"), so the verdict-driving pitch field is left as the 1/8in sample value (correct for every other Odyssey freestyle sprocket in this catalog) and the row stays unverified.'
  },
  {
    id: 'bmx-sp-profile-race-25', cat: 'sprocket', brand: 'Profile Racing', model: 'Race Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 59.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com/product-category/profile-bmx/profile-sprockets/ - no product named "Race Sprocket" is currently listed (current spline-drive lines are Sabre, Imperial, Signet Guard, Galaxy). 25T falls in the Imperial 23T-30T ($57.99) and Sabre 25T-33T ($64.99-75.99) ranges but no exact SKU/price match found; left unverified, unchanged (no fabricated correction), flagged for the coordinator.'
  },
  {
    id: 'bmx-sp-sandm-unit-28', cat: 'sprocket', brand: 'S&M', model: 'Unit Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 49.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Unit" sprocket found for S&M (real current sprockets: X-Man, Tuffman, Mid School Guard, Chain Saw, Motoman, GoRing Guard - none named Unit). Left as unverified sample data; model name is not confirmed to a real S&M SKU.'
  },
  {
    id: 'bmx-sp-profile-race-28', cat: 'sprocket', brand: 'Profile Racing', model: 'Race Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 59.99,
    note: 'UNCONFIRMED 2026-07-17: same finding as bmx-sp-profile-race-25 - no "Race Sprocket" product currently listed on profileracing.com. Left unverified, unchanged, flagged for the coordinator.'
  },
  {
    id: 'bmx-sp-profile-race-33', cat: 'sprocket', brand: 'Profile Racing', model: 'Race Sprocket 33T',
    teeth: 33, mount: 'spline', pitch: '1/8', price: 59.99,
    note: 'UNCONFIRMED 2026-07-17: same finding as bmx-sp-profile-race-25 - no "Race Sprocket" product currently listed on profileracing.com; 33T is the top of the Sabre Universal Spline Drive (25T-33T, $64.99-75.99) range but no exact SKU/price match confirmed. Left unverified, unchanged, flagged for the coordinator.'
  },
  {
    id: 'bmx-sp-colony-terminator-25', cat: 'sprocket', brand: 'Colony', model: 'Terminator Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 54.99,
    note: 'UNRESOLVED: no "Terminator" sprocket found in Colony\'s current or archived lineup (real names: Blaster, Endeavour, Bish, Pursuit, CC, Menace Guard, CD, Beenleigh). Flagged for the coordinator; unverified sample, not sourced.'
  },
  {
    id: 'bmx-sp-flybikes-alloy-28', cat: 'sprocket', brand: 'Fly Bikes', model: 'Alloy Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 44.99,
    note: 'Checked flybikes.com 2026-07-17: current Fly sprocket lineup is the Tractor line (XLII/Guard/TT/plain, $65-85) -- no "Alloy Sprocket" found by that name, appears renamed/discontinued. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-sp-chase-rsp-30', cat: 'sprocket', brand: 'Chase', model: 'RSP Race Sprocket 30T',
    teeth: 30, mount: 'spline', pitch: '1/8', price: 54.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },

  // ===== CHAIN ==========================================================
  {
    id: 'bmx-ch-kmc-z410', cat: 'chain', brand: 'KMC', model: 'Z410 BMX Chain',
    pitch: '1/8', halfLink: false, weight: 300, price: 14.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://kmcchain.us/products/z410-ol',
    note: 'KMC does not sell the full Z410 chain itself on kmcchain.us today (only its Z410 half-link/connector spares, e.g. this page), so weight/price stay sample; the connector pages confirm the Z410/S1 family is 1/2in x 1/8in pitch, matching this row (interface-only verification, VERIFY-PROTOCOL exception).'
  },
  {
    id: 'bmx-ch-odyssey-seance', cat: 'chain', brand: 'Odyssey', model: 'Bluebird Half-Link Chain',
    pitch: '1/8', halfLink: true, weight: 280, price: 39.99,
    note: 'Model name corrected 2026-07-17 - no "Seance" chain exists in Odyssey\'s current or archived lineup; the real half-link chain is the "Bluebird Half-Link Chain" (1/2in x 1/8in, half-link). Pitch, half-link construction and price ($39.99, was $24.99) confirmed via shop.odysseybmx.com/products/odyssey-bluebird-half-link-chain. No weight is published on the maker page and no measured third-party figure was found, so weight stays the 280g sample and the row is left unverified.'
  },
  {
    id: 'bmx-ch-kmc-s1', cat: 'chain', brand: 'KMC', model: 'S1 Chain',
    pitch: '1/8', halfLink: false, price: 14.99,
    note: 'Single-speed 1/8in chain, common OEM spec on entry/mid-tier freestyle completes (Sunday, Mongoose).'
  },

  // ===== REAR HUB / WHEEL ==============================================
  {
    id: 'bmx-rh-cult-matchv2', cat: 'rearWheel', brand: 'Cult', model: 'Match V2 Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 580, price: 129.99,
    note: 'Sold as hub or built into the Cult Crew SDS wheel; RHD/LHD, male or female axle options. UNVERIFIED, checked 2026-07-17: cultcrew.com no longer sells a product literally named "Match V2 Cassette Hub" — the current SDS 9T cassette hub is sold as "Crew Cassette Hub" ($169.99, cultcrew.com/products/crew-cassette-hub, "SDS 9t cassette hub... Flip Flop design... RHD to LHD"), and rims are still branded "Match" (Match Rim v2). Specs (9T driver, flip-flop RHD/LHD) line up with this row, but the naming change makes a confident 1:1 SKU-identity match too uncertain to mark verified without an explicit manufacturer statement that Crew = Match V2 renamed. Left all fields unchanged (existing weight/price already track a plausible unverified sample). Also NOT trusting the current page\'s weight field (3629g): identical placeholder value also shown for the unrelated Crew Front Wheel v2 product — a shipping-weight bucket.'
  },
  {
    id: 'bmx-rh-fitbikeco-oem-9t', cat: 'rearWheel', brand: 'Fit Bike Co', model: 'OEM Sealed Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', price: 69.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: Fit no longer sells this hub/wheel standalone — only as the "FIT OEM 20in LHD/RHD Wheelset" ($79.95, 50% off from $159.95). That current wheelset page confirms cassette driver / 9T / 14mm rear axle (matching this row) but the SKU is a wheelset, not a standalone hub, so price/verified are left as-is (interfaces corroborated, not independently verifiable at the row level).'
  },
  {
    id: 'bmx-rh-odyssey-clutchv2', cat: 'rearWheel', brand: 'Odyssey', model: 'Clutch V2 Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 623, price: 169.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-clutch-v2-freecoaster-hub',
    note: 'Freecoaster, 9T driver, 14mm chromoly axle bolts, RHD/LHD both available, weight (623g/22oz) and price ($169.99, was $199.99) all confirmed on the fetched maker page.'
  },
  {
    id: 'bmx-rh-primo-remix', cat: 'rearWheel', brand: 'Primo', model: 'Remix Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 89.99
  },
  {
    id: 'bmx-rh-profile-elite-freecoaster', cat: 'rearWheel', brand: 'Profile Racing', model: 'Z Coaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 583, price: 394.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/zcoaster%c2%81-hub/',
    note: 'CORRECTED 2026-07-17: this is Profile\'s Z Coaster (R) freecoaster hub, not a separate "Elite Freecoaster" model. Standard driver is 9T (was 10T - no 10T option exists; 12T Ti RHD-only is the other choice), base price $394.99 (was $259.99), weight 583g for the base 14mm GDH CrMo axle / 9T CrMo driver config (was 259.99/no weight).'
  },
  {
    id: 'bmx-rh-profile-elite-cassette', cat: 'rearWheel', brand: 'Profile Racing', model: 'Elite Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 509, price: 394.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/elite-cassette-hub/',
    note: 'CORRECTED 2026-07-17: Profile\'s flagship US-made cassette hub, the long-running Elite line. 9T CrMo driver / 14mm GDH CrMo axle confirmed; base price $394.99 (was $229.99), weight 509g for that config (was 610g - unsourced).'
  },
  {
    id: 'bmx-rh-bsd-mind', cat: 'rearWheel', brand: 'BSD', model: 'Mind Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 279.99,
    note: 'Real, current product: the "Back Street Pro Mind Wheel" (bsdforever.com), built from the BSD Back Street Pro cassette hub + NASA rim - a complete wheel, not a bare hub. Price corrected from 99.99 to the confirmed US-store $279.99. The manufacturer page confirms RHD/LHD ("side":both) and a cassette-type hub, but its own spec table does not itself state axle mm or driver tooth count (those figures - 14mm male, 9T - are independently confirmed only by third-party retailer listings, consistently across several). Left unverified per THE BAR (interface facts must come from the fetched maker page itself); values are very likely correct.'
  },
  {
    id: 'bmx-rh-colony-devast8r', cat: 'rearWheel', brand: 'Colony', model: "Devast8r Cassette Hub",
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 590, price: 149.99,
    note: 'UNRESOLVED: no "Devast8r" hub found in Colony\'s current or archived lineup (real cassette-hub names: Wasp, Swarm, Contour, Pintour, Horizon). Flagged for the coordinator; unverified sample, not sourced.'
  },
  {
    id: 'bmx-rh-eclat-shift-freecoaster', cat: 'rearWheel', brand: 'Eclat', model: 'Shift Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 480, price: 227.00,
    note: 'WeThePeople "Hybrid System" internals - converts between freecoaster and cassette mode without extra parts; magnetic driver.'
  },
  {
    id: 'bmx-rh-eclat-cortexevo-freecoaster', cat: 'rearWheel', brand: 'Eclat', model: 'Cortex Evo FC Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', price: 169.99,
    note: '3-pin clutch freecoaster internals, available RSD or LSD.'
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
    note: 'Freecoaster cogs are body-specific; not interchangeable with a cassette driver. UNCONFIRMED 2026-07-17: fetched profileracing.com\'s Z Coaster (R) hub product page (the current Profile freecoaster) - its driver options are 9T CrMo/Ti or 12T Ti (RHD only); NO 10T option is listed, and no standalone/separately-purchasable driver-cog SKU or price was found anywhere on the site (cogs are ordered as a build option on the hub itself). Left teeth:10 unchanged to match the id\'s variant token (renaming/retiring the id is out of this task\'s scope) rather than silently making the id and the data disagree; flagged for the coordinator to decide whether this row should be corrected to 9T under a new id or retired.'
  },
  {
    id: 'bmx-rc-profile-cassette-9', cat: 'rearCog', brand: 'Profile Racing', model: 'Cassette Cog 9T',
    teeth: 9, fitsDriver: 'cassette', pitch: '1/8', price: 16.99,
    note: 'UNCONFIRMED 2026-07-17: 9T matches the Elite Cassette Hub\'s standard CrMo driver, but no standalone/separately-purchasable driver-cog SKU or price was found on profileracing.com (cogs are ordered as a build option on the hub itself, not sold alone). Left unverified, unchanged, flagged for the coordinator.'
  },
  {
    id: 'bmx-rc-colony-cassette-9', cat: 'rearCog', brand: 'Colony', model: 'Cassette Cog 9T',
    teeth: 9, fitsDriver: 'cassette', pitch: '1/8', price: 13.99,
    note: 'UNRESOLVED: no standalone Colony cassette-cog SKU found on colonybmx.com.au — cogs there ship bundled with a hub (e.g. the Wasp Race Cassette Hub comes with a 16T cog) rather than sold separately under this name. Flagged for the coordinator; unverified sample, not sourced.'
  },

  // ===== FRONT WHEEL ====================================================
  {
    id: 'bmx-fw-odyssey-vandero', cat: 'frontWheel', brand: 'Odyssey', model: 'Vandero Pro Front Hub',
    wheelSize: '20', axle: '10mm', price: 96.99,
    note: 'Model name corrected 2026-07-17 - "Vandero" is Odyssey\'s front HUB name, sold standalone (not as a complete "Vandero" wheel; complete wheels pairing it with a rim are sold under the rim\'s own name, e.g. "Hazard Lite Front Wheel"). Axle (3/8in inbound bolts = the 10mm token) and price ($96.99, was $79.99) confirmed via shop.odysseybmx.com/products/vandero-pro-hub. Wheel size (20in) is not literally stated on the hub\'s own page, so the row stays unverified.'
  },
  {
    id: 'bmx-fw-fitbikeco-oem', cat: 'frontWheel', brand: 'Fit Bike Co', model: 'OEM Front Wheel',
    wheelSize: '20', axle: '10mm', price: 49.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: same situation as bmx-rh-fitbikeco-oem-9t — Fit no longer sells this standalone, only bundled in the current OEM 20in wheelset. Left unverified; spec unchanged (used in test/test-bmx-golden.js — do not alter wheelSize/axle without re-running the golden test).'
  },
  {
    id: 'bmx-fw-profile-elite', cat: 'frontWheel', brand: 'Profile Racing', model: 'Elite Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 520, price: 149.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com\'s hubs + wheels/wheelsets categories. Profile sells standalone front HUBS (AC-2 BMX Front Hub $169.99-303.99, Beast Mode Elite Front Disc Hub $223.99) and custom-built complete WHEELS (e.g. "Elite Cassette Hub 20in Wheel" $561.99+), but no product matching a plain "Elite Front Wheel" at $149.99/520g was found - the row\'s price is below even the cheapest standalone front hub alone (before lacing/rim). Left unverified, unchanged (no confident correction), flagged for the coordinator.'
  },
  {
    id: 'bmx-fw-bsd-mind', cat: 'frontWheel', brand: 'BSD', model: 'Mind Front Wheel',
    wheelSize: '20', axle: '10mm', price: 169.99,
    note: 'Real, current product: the "Front Street Pro Mind Wheel" (bsdforever.com), built from the BSD Front Street Pro hub + NASA rim, ships with hubguards. Price corrected from 74.99 to the confirmed US-store $169.99 (a full built wheel, not a bare hub, so the prior sample price was too low). Axle mm is not itself printed on the fetched page (10mm is the standard BMX front-axle value and matches this row) - left unverified per THE BAR pending an interface-specific source.'
  },
  {
    id: 'bmx-fw-colony-devast8r', cat: 'frontWheel', brand: 'Colony', model: 'Devast8r Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 500, price: 99.99,
    note: 'UNRESOLVED: no "Devast8r" front wheel found in Colony\'s current or archived lineup (real front-wheel names: Wasp, Contour, Pintour, Horizon). Flagged for the coordinator; unverified sample, not sourced.'
  },

  // ===== TIRES ==========================================================
  {
    id: 'bmx-ti-odyssey-pathpro-225', cat: 'tire', brand: 'Odyssey', model: 'Path Pro 2.25"',
    wheelSize: '20', width: 2.25, casing: 'park', maxPsi: 100, price: 32.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-path-pro-tire',
    note: '20x2.25in size, 100psi max and price ($32.99, was $24.99) confirmed on the fetched maker page (dual-ply sidewalls, sizes 20x2.25in and 20x2.40in).'
  },
  {
    id: 'bmx-ti-odyssey-pathpro-24', cat: 'tire', brand: 'Odyssey', model: 'Path Pro 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 100, price: 32.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-path-pro-tire',
    note: '20x2.40in size, 100psi max and price ($32.99, was $26.99) confirmed on the fetched maker page (same product page lists both the 2.25 and 2.40 width options at the same price).'
  },
  {
    id: 'bmx-ti-maxxis-hookworm-25', cat: 'tire', brand: 'Maxxis', model: 'Hookworm',
    wheelSize: '20', width: 1.95, casing: 'park', maxPsi: 110, weight: 720, price: 29.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.maxxis.com/us/tire/hookworm/',
    note: 'CORRECTED 2026-07-17: maxxis.com lists only one 20in Hookworm SKU, 20x1.95 (part TB294610, wire bead, single compound, 720g, max 110psi) - there is no 20x2.5 Hookworm (that width only exists at 24in+). Row model/width/maxPsi/weight corrected to match; id kept per append-only policy though it now reads oddly against the corrected 1.95in width.'
  },
  {
    id: 'bmx-ti-veetireco-speedster', cat: 'tire', brand: 'Vee Tire Co', model: 'Speedster 1-3/8"',
    wheelSize: '20', width: 1.375, casing: 'race-slick', maxPsi: 110, price: 19.99
  },
  {
    id: 'bmx-ti-odyssey-aitken', cat: 'tire', brand: 'Odyssey', model: 'Aitken Tire 2.45"',
    wheelSize: '20', width: 2.45, casing: 'park', maxPsi: 100, price: 32.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-aitken-tire-black',
    note: 'Width corrected 2.4in -> 2.45in (the real SKU is 20x2.25in or 20x2.45in - no 2.4in size exists), maxPsi corrected to 100 and price to $32.99 (was $27.99), all confirmed on the fetched maker page (Mike Aitken signature, dual-ply, low profile tread).'
  },
  {
    id: 'bmx-ti-duo-svs', cat: 'tire', brand: 'DUO Brand', model: 'SVS Tire 2.3"',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 95, price: 26.99
  },
  {
    id: 'bmx-ti-bsd-motto-24', cat: 'tire', brand: 'BSD', model: 'Motto Tire 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 90, price: 27.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Motto" tire found for BSD (real current tires include Donnastreet - 2.3/2.4in, 680/730g, 110psi max - and Donnasqueak). Left as unverified sample data; model name is not confirmed to a real BSD SKU.'
  },
  {
    id: 'bmx-ti-colony-griplock-24', cat: 'tire', brand: 'Colony', model: 'Grip Lock Tire 2.35"',
    wheelSize: '20', width: 2.35, casing: 'park', maxPsi: 110, weight: 610, price: 28.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://colonybmx.com.au/products/griplock-tyre/',
    note: 'Corrected from a non-existent 2.4in width — Colony\'s Griplock only ships in 2.2in/2.35in. 60TPI, 110 max PSI, 610g at 2.35in per the maker page; AUD price not published there, USD MSRP kept as sample.'
  },
  {
    id: 'bmx-ti-colony-griplock-215', cat: 'tire', brand: 'Colony', model: 'Grip Lock Tire 2.2"',
    wheelSize: '20', width: 2.2, casing: 'park', maxPsi: 110, weight: 546, price: 26.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://colonybmx.com.au/products/griplock-tyre/',
    note: 'Corrected from a non-existent 2.15in width — Colony\'s Griplock only ships in 2.2in/2.35in. 60TPI, 110 max PSI, 546g at 2.2in per the maker page; AUD price not published there, USD MSRP kept as sample.'
  },
  {
    id: 'bmx-ti-flybikes-ruben-24', cat: 'tire', brand: 'Fly Bikes', model: 'Ruben Ligera 2.4" Tire',
    wheelSize: '20', width: 2.4, casing: 'kevlar-foldable', maxPsi: 120, price: 65.00, weight: 720,
    family: 'flybikes-ruben',
    verified: true, lastChecked: '2026-07-17', source: 'https://www.flybikes.com/product/fly-ruben-ligera-tire-black',
    note: 'Corrected model/price/weight/casing/maxPsi to match the current "Ruben Ligera 2.4" Tire" (Kevlar folding construction, 60 TPI, 720g, 120 PSI max, $65.00) -- the only current 2.4in-width Ruben SKU (the wire-bead versions are now 2.25in/2.35in only, no plain 2.4in). Renamed model from the previous "Ruben Tire 2.4"" placeholder to match the real product name; id left unchanged (append-only).'
  },
  {
    id: 'bmx-ti-profile-elite-13', cat: 'tire', brand: 'Profile Racing', model: 'Elite Race Tire 1-3/8"',
    wheelSize: '20', width: 1.375, casing: 'race-slick', maxPsi: 120, price: 21.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com\'s category list and site search - Profile Racing does not manufacture or sell tires (a bike-check tech article even names Maxxis/Demolition as the tire brands riders pair with Profile parts). Likely a brand-misattribution predating this session. Left unverified, unchanged (out of scope to delete/reattribute); flagged prominently for the coordinator.'
  },

  // ===== PEGS ===========================================================
  {
    id: 'bmx-pg-odyssey-grandstand-14', cat: 'pegs', brand: 'Odyssey', model: 'MPEGs 4" Steel Peg',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, price: 24.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-mpegs-4-steel-peg-chrome',
    note: 'Model name corrected 2026-07-17 - "Grandstand" is Odyssey\'s PEDAL line, not a peg; the real 4140 chromoly steel peg is "MPEGs" (14mm w/ 3/8in adapters included). Axle fit (14mm), material (steel) and price ($24.99) confirmed on the fetched maker page; reducerIncluded corrected false -> true (the 3/8in adapters ARE included, contradicting the prior sample value).'
  },
  {
    id: 'bmx-pg-fit-universal', cat: 'pegs', brand: 'Fit Bike Co', model: 'Universal Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: true, price: 34.99,
    note: 'Ships with a 14mm-to-10mm reducer for front-axle use. Checked thebuildingdistro.com 2026-07-17: current Fit peg lineup is only the "Miller Peg" ($17.95) — no "Universal Pegs" SKU found, appears discontinued. Left unverified; spec unchanged (used in test/test-bmx-golden.js + test/test-bmx-engine.js — do not alter axleFit/material/reducerIncluded without re-running those tests).'
  },
  {
    id: 'bmx-pg-cult-alloy', cat: 'pegs', brand: 'Cult', model: 'Alloy Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 29.99,
    note: 'UNVERIFIED, checked 2026-07-17: cultcrew.com sells no peg literally named "Alloy Pegs" — current lineup is "Doomsday Peg" ($13.99, heat-treated chromoly) and "Butter Peg" ($16.99, 4130 core + Perlon-Nylon 6 sleeve), neither of which is a metal "alloy" peg. axleFit:\'14mm\' IS confirmed as accurate: BOTH current Cult pegs state "14mm pegs with 3/8 adapters" (cultcrew.com/products/doomsday-pegs, /products/butter-pegs), so the one checkBmxBuild-critical field (bmx-peg-axle rule) checks out even though model/material/price don\'t match a specific current SKU. Left unchanged pending a clearer SKU match.'
  },
  {
    id: 'bmx-pg-colony-wasted', cat: 'pegs', brand: 'Colony', model: 'Wasted Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, price: 27.99,
    note: 'UNRESOLVED: no "Wasted" peg found in Colony\'s current or archived lineup (real names: Anyway, Oneway, Jam Circle, EXON II Flatland). Flagged for the coordinator; unverified sample, not sourced.'
  },
  {
    id: 'bmx-pg-totalbmx-rotary', cat: 'pegs', brand: 'Total BMX', model: 'Rotary Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 32.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): "Rotary" is a Total BMX SPROCKET (CNC 7075-T6, 25T/28T, 59g), not a peg - Total BMX\'s actual peg lineup is the Skinnies (V2). Likely a category mismatch at entry; left as unverified sample data, not corrected (would change model/spec entirely).'
  },
  {
    id: 'bmx-pg-bsd-superstar', cat: 'pegs', brand: 'BSD', model: 'Superstar Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: false, price: 22.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Superstar" peg found for BSD (real current pegs: Unit, Hubba, Roastin\', Crack Pipe - all 4140 chromoly, 10mm/14mm). "Superstar" is a peg name used by an unrelated house brand (urbanair.co.uk), not BSD. Left as unverified sample data; model name is not confirmed to a real BSD SKU.'
  },
  {
    id: 'bmx-pg-flybikes-vandal', cat: 'pegs', brand: 'Fly Bikes', model: 'Vandal Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: true, price: 34.99,
    note: 'Ships with a 14mm-to-10mm reducer for front-axle use. Checked flybikes.com 2026-07-17: current Fly peg lineup is "Acero TR Peg" and "Acero ST Peg" -- no "Vandal Pegs" found, appears discontinued/renamed. Left unverified; spec unchanged.'
  },

  // ===== BRAKES =========================================================
  {
    id: 'bmx-br-diacompe-990', cat: 'brake', brand: 'Dia-Compe', model: '990 U-Brake',
    mount: 'u-brake', price: 34.99, note: 'The original "990" that gave U-brakes their nickname on BMX.'
  },
  {
    id: 'bmx-br-odyssey-evo25', cat: 'brake', brand: 'Odyssey', model: 'Evo 2.5 U-Brake',
    mount: 'u-brake', price: 59.99,
    note: 'Mount + price confirmed via shop.odysseybmx.com/collections/odyssey-braking/model-evo-2-5 2026-07-17 (brake-only price was $44.99, corrected to $59.99); no maker weight published for this SKU, so left unverified per THE BAR (no weight source).'
  },
  {
    id: 'bmx-br-tektro-vbrake', cat: 'brake', brand: 'Tektro', model: 'Race V-Brake',
    mount: 'v-brake', price: 19.99
  },
  {
    id: 'bmx-br-chase-rsp-vbrake', cat: 'brake', brand: 'Chase', model: 'RSP Race V-Brake',
    mount: 'v-brake', weight: 180, price: 34.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },
  {
    id: 'bmx-br-mankind-truth-ubrake', cat: 'brake', brand: 'Mankind', model: 'Truth U-Brake',
    mount: 'u-brake', weight: 168, price: 74.99,
    note: 'CNC machined 6061-T6 alloy, includes CNC alloy cable hanger + straddle cable.'
  },

  // ===== HANDLEBAR ======================================================
  {
    id: 'bmx-hb-sandm-speedball', cat: 'handlebar', brand: 'S&M', model: 'Speedball Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 74.99
  },
  {
    id: 'bmx-hb-odyssey-canadadave', cat: 'handlebar', brand: 'Odyssey', model: 'Canada Dave Bars',
    clamp: '25.4mm', rise: 8.0, width: 29, price: 79.99,
    note: 'UNRESOLVED 2026-07-17: exhaustive search of shop.odysseybmx.com/collections/odyssey-handlebars, odysseybmx.com team roster and third-party BMX retailers found NO "Canada Dave" rider or bar model at Odyssey (current + legacy lineup checked). Left untouched (no real product to correct to, and inventing one would be fabrication) — flagged for coordinator/Douglas to decide whether this row should be retired/renamed.'
  },
  {
    id: 'bmx-hb-fitbikeco-vh', cat: 'handlebar', brand: 'Fit Bike Co', model: 'VH Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 69.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: current Fit bar lineup is Tom Dugan, Nordstrom, Misfit AM, Young Buck, Jordan Hango Raw Deal, and OEM — no "VH Bars" found, appears discontinued. Left unverified; spec unchanged (used in test/test-bmx-golden.js — do not alter clamp without re-running the golden test).'
  },
  {
    id: 'bmx-hb-totalbmx-techlite', cat: 'handlebar', brand: 'Total BMX', model: 'Techlite Bars',
    clamp: '25.4mm', rise: 8.0, width: 29, weight: 620, price: 84.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Techlite" bar found for Total BMX (real current bars: Killabee K3, TWS 2, Hangover). Left as unverified sample data; model name is not confirmed to a real Total BMX SKU.'
  },
  {
    id: 'bmx-hb-colony-pintour', cat: 'handlebar', brand: 'Colony', model: 'Pintour Bars',
    clamp: '25.4mm', rise: 8.15, width: 29, price: 79.99,
    note: 'UNRESOLVED: "Pintour" is a Colony WHEEL line (Pintour Swarm hub/wheel), not a handlebar — the model name is wrong. Colony\'s current bars lineup is Guardian/Cadet/Rick/Prody Kue/Elescious/Hardy V2/Bloody Oath/Tenacious; the closest real 29in-wide 25.4mm-clamp bar (Sweet Tooth Bars, rise 8.8in/9.4in) is sold only via distributor channels, not colonybmx.com.au\'s own current page, so it does not clear the manufacturer-own-page bar either. Flagged for the coordinator; unverified sample, not sourced.'
  },
  {
    id: 'bmx-hb-sandm-slam', cat: 'handlebar', brand: 'S&M', model: 'Slam Bars',
    clamp: '22.2mm', rise: 8, width: 28, weight: 907, price: 69.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.sandmbikes.com/product/hardgoods/slam-bar',
    note: 'Corrected from a generic sample entry: sandmbikes.com\'s own product page confirms 22.2mm clamp (not 25.4mm), 8in rise (not 8.5), 28in width (not 29), and 2.0lb/907g weight; base price $69.95 (variants run to $109.95 by color).'
  },
  {
    id: 'bmx-hb-flybikes-glory', cat: 'handlebar', brand: 'Fly Bikes', model: 'Glory Bars',
    clamp: '25.4mm', rise: 8.0, width: 29, price: 72.99,
    note: 'Checked flybikes.com 2026-07-17: current Fly bar lineup is Dove/Sierra/Savanna/Fuego 4p (all $105.00) -- no "Glory Bars" found, appears discontinued/renamed. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-hb-chase-rsp', cat: 'handlebar', brand: 'Chase', model: 'RSP Race Bars',
    clamp: '22.2mm', rise: 6.5, width: 27.5, price: 54.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },

  // ===== STEM ===========================================================
  {
    id: 'bmx-st-odyssey-elementary', cat: 'stem', brand: 'Odyssey', model: 'Elementary Stem',
    clamp: '22.2mm', price: 44.99,
    note: 'Real, long-discontinued (2004-2008) Odyssey stem confirmed via the manufacturer\'s own odysseybmx.com/2004/08/elementary-stem/ blog post (weight ~8oz, 50mm reach, 2014 aluminum) but that page does not state clamp diameter or price; corrected clamp from 25.4mm to 22.2mm per multiple corroborating retailer/reference specs (bmxmuseum.com Elementary V3 ref, treefortbikes) for the Elementary V3 — left unverified since no manufacturer page confirms clamp or price.'
  },
  {
    id: 'bmx-st-cult-hi-fi', cat: 'stem', brand: 'Cult', model: 'Hi-Fi Stem',
    clamp: '25.4mm', price: 39.99,
    note: 'UNVERIFIED, checked 2026-07-17: no "Hi-Fi Stem" found on cultcrew.com/collections/parts — current Cult stems are "Forged Salvation Stem" ($44.99), "Salvation Stem", and "Mind Control Stem". Could not confirm this SKU still exists; left unchanged as pre-existing sample data (clamp is not a checkBmxBuild-critical field per compat-bmx.js, so the risk of an unconfirmed row here is low).'
  },
  {
    id: 'bmx-st-profile-race', cat: 'stem', brand: 'Profile Racing', model: 'Race Stem',
    clamp: '25.4mm', price: 49.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com/product-category/profile-bmx/profile-stems/ - current lineup is Mark Mulville Push Stem, Acoustic Stem, Nova Stem (31.8mm bar), and "Gen 1" Clamp On Stem; no product named "Race Stem" is listed, and none of the current stems match this price ($49.99) or a plain 25.4mm clamp spec. Left unverified, unchanged (no confident correction), flagged for the coordinator.'
  },
  {
    id: 'bmx-st-gt-performer', cat: 'stem', brand: 'GT', model: 'Performer Stem',
    clamp: '25.4mm', price: 34.99,
    note: 'WALL 2026-07-17: not a standalone GT SKU - the Pro Performer 20 spec sheet names its stock stem "GT Mallet Front Load" (43mm, 19mm rise) and does not state a clamp diameter (gtbicycles.com/products/pro-performer-20). Left unverified/uncorrected - no source to confirm or refute the 25.4mm clamp value.'
  },
  {
    id: 'bmx-st-chase-rsp', cat: 'stem', brand: 'Chase', model: 'RSP Race Stem',
    clamp: '22.2mm', price: 42.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },
  {
    id: 'bmx-st-odyssey-elementaryv2-222', cat: 'stem', brand: 'Odyssey', model: 'Elementary Stem V2',
    clamp: '22.2mm', weight: 230, price: 52.00,
    note: 'Single-bolt clamp design; a distinct 22.2mm-clamp SKU alongside the 25.4mm-clamp Elementary Stem already in the catalog (bmx-st-odyssey-elementary).'
  },

  // ===== SEAT ===========================================================
  {
    id: 'bmx-se-cult-pivotal', cat: 'seat', brand: 'Cult', model: 'Pivotal Seat',
    system: 'pivotal', price: 29.99,
    note: 'UNVERIFIED, checked 2026-07-17: system:\'pivotal\' IS confirmed as accurate — every current Cult seat is pivotal-only (e.g. cultcrew.com/products/kevlar-padded-seat-black: "only available in pivotal"), the field checkBmxBuild reads (bmx-seat-system rule). But no plain $29.99 "Pivotal Seat" SKU exists today — the current lineup (Kevlar Padded, Corduroy Slim, Cult x Vans Old Skool, etc.) is all $44.99. Price/model left unchanged pending a clearer SKU match; not marking verified since the exact current product this row maps to is ambiguous.'
  },
  {
    id: 'bmx-se-odyssey-fedaykin', cat: 'seat', brand: 'Odyssey', model: 'Fedaykin Slim Pivotal Seat',
    system: 'pivotal', price: 27.99,
    note: 'UNRESOLVED 2026-07-17: no "Fedaykin" seat found anywhere in Odyssey\'s current or historical seat lineup (shop.odysseybmx.com/collections/odyssey-seating lists BROC/Aitken/Big Stitch/Bloom/Tropical/40-Year Anniversary models only; no web match at all for the name). Left untouched — flagged for coordinator/Douglas as an apparent fabricated row needing a real replacement or retirement.'
  },
  {
    id: 'bmx-se-fitbikeco-slim', cat: 'seat', brand: 'Fit Bike Co', model: 'Slim Seat',
    system: 'standard', price: 22.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: current Fit seat lineup is Barstool (2-panel/sublimated/quilted), Cafe Tripod and Solo Tripod — no "Slim Seat" found, appears discontinued. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-se-colony-pivotal', cat: 'seat', brand: 'Colony', model: 'Pivotal Seat',
    system: 'pivotal', price: 27.99,
    note: 'UNRESOLVED: "Pivotal Seat" as a bare generic name is not a real Colony SKU — every Colony seat carries a specific model name (Mini Pivotal, Wallwork, Paterico, Blaster, Alex Hiam (AH), Plume), all pivotal-clamp. Flagged for the coordinator to pick a real model; unverified sample, not sourced.'
  },
  {
    id: 'bmx-se-flybikes-pivotal', cat: 'seat', brand: 'Fly Bikes', model: 'Pivotal Seat',
    system: 'pivotal', price: 26.99,
    note: 'Checked flybikes.com 2026-07-17: current Fly seats are all named per frame model (Dove/Hawk/Motosierra/Fuego/Savanna/Sierra/Aire Seat, all $45.00) -- no generic "Pivotal Seat" found. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-se-totalbmx-slim', cat: 'seat', brand: 'Total BMX', model: 'Slim Pivotal Seat',
    system: 'pivotal', price: 24.99,
    note: 'No standalone "Slim Pivotal Seat" found for Total BMX; closest real products are the "Logo Slim Combo Seat" and "Killabee Slim Combo Bee Seat" (seat+post combo units, not sold as a bare seat). system:pivotal is plausible (Total\'s combo seats use pivotal-style mounting) but not confirmed against an exact matching SKU, so left unverified.'
  },

  // ===== SEATPOST =======================================================
  {
    id: 'bmx-sp-cult-pivotal-post', cat: 'seatpost', brand: 'Cult', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 29.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/seatpost',
    note: 'diameter:25.4mm and system:\'pivotal\' CONFIRMED via Cult\'s current "Counter post / black & polished" (6061 alloy, diameter 25.4mm, pivotal, 7.5in & 12.5in X-Long lengths). Price corrected 19.99 -> 29.99 to match. Page weight (907g) not recorded: identical placeholder figure shared with the unrelated Headset/Bottom Bracket product pages — a shipping-weight bucket, not real mass.'
  },
  {
    id: 'bmx-sp-odyssey-standard-post', cat: 'seatpost', brand: 'Odyssey', model: 'Tripod Seat Post',
    diameter: 25.4, system: 'standard', price: 31.99,
    note: 'Real product = the Tripod Seat Post (Odyssey\'s current railed/standard-system post); diameter, system and price confirmed via shop.odysseybmx.com/products/odyssey-tripod-seat-post-black 2026-07-17 (model renamed from generic "Standard Seatpost", price corrected 14.99 -> 31.99); no weight published, so left unverified.'
  },
  {
    id: 'bmx-sp-colony-pivotal-post', cat: 'seatpost', brand: 'Colony', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', weight: 96, price: 17.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://colonybmx.com.au/products/pivotal-seatpost/',
    note: '185mm length, 96g, per the maker page. AUD price not published there (sold via Colony\'s distributor storefront); USD MSRP kept as sample.'
  },
  {
    id: 'bmx-sp-profile-pivotal-post', cat: 'seatpost', brand: 'Profile Racing', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 21.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com\'s category list and site search - Profile Racing does not manufacture or sell seatposts (only rider-build mentions of other brands\' posts, e.g. "Stay Strong pivotal seatpost", turned up). Likely a brand-misattribution predating this session. Left unverified, unchanged (out of scope to delete/reattribute); flagged prominently for the coordinator.'
  },

  // ===== GRIPS ==========================================================
  {
    id: 'bmx-gr-odyssey-aaronross', cat: 'grips', brand: 'Odyssey', model: 'Keyboard v1 Grip (Aaron Ross Signature)',
    length: 158, flangeless: true, price: 10.99,
    note: 'Real product = the Keyboard v1 Grip, Aaron Ross\'s long-running signature colorway; length, flangeless (bar ends included, no flange) and price confirmed via shop.odysseybmx.com/products/odyssey-keyboard-v1-grip-black 2026-07-17 (model renamed, length corrected 143 -> 158mm, price corrected 9.99 -> 10.99); no weight published, so left unverified.'
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
    length: 143, flangeless: true, price: 11.99,
    note: 'UNRESOLVED: "Grip Lock"/"Griplock" is Colony\'s TIRE name, not a grip — the model name is wrong. Colony\'s actual grip product is "Much Room Grips" (140mm, 30mm diameter, Krayton rubber, push-in bar ends — a flanged, not flangeless, design), which does not match this row\'s specs either. Flagged for the coordinator; unverified sample, not sourced.'
  },
  {
    id: 'bmx-gr-flybikes-radioactive', cat: 'grips', brand: 'Fly Bikes', model: 'Radioactive Grips',
    length: 143, flangeless: true, price: 9.99,
    note: 'Checked flybikes.com 2026-07-17: current Fly grip lineup is Hawk / Ruben II / Ruben II Mini (all $15.00) -- no "Radioactive Grips" found, appears discontinued/renamed. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-gr-gt-performer', cat: 'grips', brand: 'GT', model: 'Performer Grips',
    length: 148, flangeless: true, price: 8.99,
    note: 'flangeless corrected false -> true: the Pro Performer 20 spec sheet names its stock grip "GT Super Soft Flangeless" (gtbicycles.com/products/pro-performer-20, fetched 2026-07-17). Not sold as a standalone SKU, and length/price are unconfirmed, so left unverified despite the flangeless correction.'
  },

  // ===== PEDALS =========================================================
  {
    id: 'bmx-pd-odyssey-twistedpro', cat: 'pedals', brand: 'Odyssey', model: 'Twisted Pro PC Pedals',
    platform: 'plastic', spindle: '9/16', weight: 414, price: 19.99,
    verified: true, lastChecked: '2026-07-17',
    source: 'https://shop.odysseybmx.com/products/odyssey-twisted-pro-pc-pedals-black',
    note: 'Model renamed to match maker naming (was "Twisted PC Pro"); nylon-composite platform, 9/16in spindle, $19.99 price and 14.6oz/pair (~414g) weight all confirmed via the linked product page 2026-07-17.'
  },
  {
    id: 'bmx-pd-odyssey-trailmix', cat: 'pedals', brand: 'Odyssey', model: 'Trailmix Looseball Pedals',
    platform: 'alloy', spindle: '9/16', weight: 340, price: 42.99,
    note: 'Model renamed to match maker naming (was "Trail Mix", two words) and price corrected 39.99 -> 42.99 via shop.odysseybmx.com/collections/odyssey-trailmix 2026-07-17 (aluminum body, 9/16in spindle, Looseball variant to match this row\'s non-sealed positioning); Odyssey publishes no weight for either Trailmix variant, and a third-party review\'s 578g/pair figure could not be confirmed as an actual scale measurement (fetch blocked), so the existing 340g sample weight is left as-is and the row stays unverified.'
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
    note: 'UNRESOLVED 2026-07-17: "Triple Trap" is an Odyssey PEDAL model, not a sprocket — shop.odysseybmx.com/collections/odyssey-sprockets lists only BOYD, La Guardia and Utility Pro sprockets (25/28/30T). No "Triple Trap" sprocket exists at Odyssey. Left untouched (no real product to correct to) — flagged for coordinator/Douglas as an apparent name mix-up/fabricated row.'
  },
  {
    id: 'bmx-rh-odyssey-antigramv2-9', cat: 'rearWheel', brand: 'Odyssey', model: 'Antigram V2 Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 454, price: 199.99,
    verified: true, lastChecked: '2026-07-17',
    source: 'https://shop.odysseybmx.com/products/antigram-v2-cassette-hub',
    note: '36H 2014-T6 aluminum shell, 9T driver, 14mm chromoly axle bolts, RHD/LHD switchable, all confirmed via the linked product page 2026-07-17; weight corrected 560g -> 454g (stock with-guard config; maker also states 436g without guard) and price corrected 119.99 -> 199.99.'
  },
  {
    id: 'bmx-pg-odyssey-chromoly', cat: 'pegs', brand: 'Odyssey', model: 'MPEGs 4in Steel Peg',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, weight: 248, price: 24.99,
    verified: true, lastChecked: '2026-07-17',
    source: 'https://shop.odysseybmx.com/products/odyssey-mpegs-4-steel-peg-chrome',
    note: 'Model renamed to match maker naming (was generic "Chromoly Pegs"); 4140 chromoly steel, 14mm bore with 3/8in adapter INCLUDED (was reducerIncluded:false, corrected to true), price corrected 19.99 -> 24.99, weight added (8.75oz per single peg ~= 248g; no other catalog peg row carries a weight field today, flagged for the coordinator as a possible follow-up backfill) all confirmed via the linked product page 2026-07-17.'
  },
  {
    id: 'bmx-br-odyssey-springfieldpro', cat: 'brake', brand: 'Odyssey', model: 'Springfield Brake',
    mount: 'u-brake', price: 20.99,
    note: 'Model corrected to Odyssey\'s real name "Springfield Brake" (no "Pro" variant exists) and price corrected 39.99 -> 20.99 via shop.odysseybmx.com/products/springfield-brake 2026-07-17 (mount confirmed u-brake); no manufacturer weight published (a 133g figure appears only on third-party retailer listings, not the maker page), so left unverified per THE BAR.'
  },
  {
    id: 'bmx-hb-odyssey-brocraiford', cat: 'handlebar', brand: 'Odyssey', model: 'BROC 9.8in Bar',
    clamp: '22.2mm', rise: 9.8, width: 29, price: 129.99,
    note: 'Model renamed to the real product (BROC 9.8in Bar, Broc Raiford\'s signature); clamp corrected 25.4mm -> 22.2mm (maker page: "traditional 7/8in crossbar"), rise corrected 8.5 -> 9.8in, price corrected 84.99 -> 129.99, all via shop.odysseybmx.com/products/odyssey-broc-9-8-bar 2026-07-17; no weight published, so left unverified.'
  },
  {
    id: 'bmx-st-odyssey-krad', cat: 'stem', brand: 'Odyssey', model: 'K-Rad Stem',
    clamp: '25.4mm', price: 34.99,
    note: 'UNRESOLVED 2026-07-17: no "K-Rad" stem found in Odyssey\'s current lineup (shop.odysseybmx.com/collections/odyssey-stems lists BOYD/BROC v2/WALSH/NORD/CFL3/BOSS v2 only) or on the full team roster (no rider by that name/nickname, past or present). Left untouched — flagged for coordinator/Douglas as an apparent fabricated row.'
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
    price: 359.99, note: 'Fit\'s value-tier freestyle frame. Checked thebuildingdistro.com 2026-07-17: Fit\'s own site now states "our new FLOW models replace what we used to call TRL models" — TRL is discontinued/renamed. No FLOW frame-only row added (not sourced), so left unverified with spec unchanged rather than silently rewritten under a name no longer sold.'
  },
  {
    id: 'bmx-sp-fitbikeco-key-25', cat: 'sprocket', brand: 'Fit Bike Co', model: 'Key Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 64.95, weight: 249, family: 'fitbikeco-key',
    mfgPn: '33-SP-KEY-BLK-25T',
    verified: true, lastChecked: '2026-07-17', source: 'https://thebuildingdistro.com/product/key-sprocket-2/',
    note: 'FIT KEY sprocket, 25T (also sold in 28T/30T). Confirmed via the product page\'s WooCommerce variation data (matte black, 25T): 1/8in pitch, splined mount (fits 19/22/24mm spindles via included hat washers), regular price $64.95 (matte black; page was running a temporary 25%-off sale to $49.95 at check time, so the regular/MSRP price is recorded here), weight 0.55lb = 249g. mfgPn/SKU is the matte-black 25T variant.'
  },
  {
    id: 'bmx-st-fitbikeco-key', cat: 'stem', brand: 'Fit Bike Co', model: 'Key Stem',
    clamp: '25.4mm', price: 32.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: current Fit stem lineup is Mike Aitken, Brian Foster, Hango and Van Homan — no "Key Stem" found, appears discontinued. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-gr-fitbikeco-uni', cat: 'grips', brand: 'Fit Bike Co', model: 'Uni Grips',
    length: 143, flangeless: true, price: 9.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: current Fit grip lineup is only "OG Grips" ($9.95, matches this row\'s price closely) — no "Uni Grips" found by that name, appears renamed/discontinued. Left unverified; spec unchanged.'
  },

  // ---- Kink depth -----------------------------------------------------
  {
    id: 'bmx-fr-kink-curb', cat: 'frame', brand: 'Kink', model: 'Curb',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'american', headTube: 'mid',
    topTube: 20.0, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false,
    price: 399.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://kinkbmx.com/products/curb-2027',
    note: 'Sold complete-bike-only (corrected frameOnly false; was true). bbShell corrected mid -> american ("Unsealed American 19mm" BB). rearBrakeMount corrected u-brake -> v-brake ("Mission Cease V2" V-brakes). topTube corrected 20.5 -> 20.0in. Price corrected 419.99 -> 399.99. headTube mapped from the page\'s "Standard 1 1/8in Threadless" (external, non-integrated cups) to the closest BMX_VOCAB token (mid) - PROVISIONAL mapping, headTube fires no rule. Complete-bike weight (27lb 2oz = ~12,300g) is NOT a frame weight, so omitted per the wethepeople-justice convention.'
  },
  {
    id: 'bmx-rh-kink-cage-9', cat: 'rearWheel', brand: 'Kink', model: 'Cage Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 99.99,
    note: 'WALL 2026-07-17: kinkbmx.com/collections/hubs-guards lists no hub called "Cage" (current Kink cassette hub is "Yukon"), and no other source turned up a Kink "Cage" hub past or present - flagged for the coordinator, this may be a non-existent/misnamed SKU. Left unchanged (cannot confirm OR refute the spec values), not verified.'
  },
  {
    id: 'bmx-hb-kink-retro', cat: 'handlebar', brand: 'Kink', model: 'Retro Bars',
    clamp: '25.4mm', rise: 8.0, width: 28.75, price: 69.99,
    note: 'WALL 2026-07-17: kinkbmx.com/collections/handlebars lists no bar called "Retro" (current lineup: Helm, Foundry, Union, Williams/Williams 4pc) and no other source turned up a Kink "Retro Bars" past or present - flagged for the coordinator, this may be a non-existent/misnamed SKU. Left unchanged, not verified.'
  },
  {
    id: 'bmx-sp-kink-pivotal-post', cat: 'seatpost', brand: 'Kink', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', weight: 125, price: 39.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://kinkbmx.com/products/pivotal-seat-post',
    note: 'Price corrected 17.99 -> 39.99. Diameter/system confirmed. Weight (125g / 4.4oz) is the Medium (180mm) length; Small (75mm) is 65g, Large (330mm) is 201g.'
  },
  {
    id: 'bmx-pd-kink-rival', cat: 'pedals', brand: 'Kink', model: 'Rival Pedals',
    platform: 'alloy', spindle: '9/16', weight: 350, price: 29.99,
    note: 'WALL 2026-07-17: kinkbmx.com/collections/pedals currently lists only the Hemlock pedal, and no other source turned up a Kink "Rival Pedals" past or present - flagged for the coordinator, this may be a non-existent/misnamed SKU. Left unchanged, not verified.'
  },

  // ---- WeThePeople depth -----------------------------------------------
  {
    id: 'bmx-fr-wethepeople-trust', cat: 'frame', brand: 'WeThePeople', model: 'Trust',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 549.99, note: 'Front-load street frame, currently sold as the Trust CS/FC complete bike. wethepeoplebmx.de/bikes/trust (fetched 2026-07-17) confirms 4130 full crmo, 127mm head tube (integrated-1-1/8), and an Eclat Talon u-brake rear - matching rearBrakeMount/headTube here. bbShell and rearAxle are NOT confirmed by that page (no standalone frame-only product page exists on the current site), so left unverified.'
  },
  {
    id: 'bmx-cr-wethepeople-compulsion', cat: 'cranks', brand: 'WeThePeople', model: 'Compulsion Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', price: 269.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Compulsion" crank found in WeThePeople\'s current or documented past lineup (real current cranks: Legacy, Logic; both 22mm spindle, matching this row\'s spindle value). Left as unverified sample data; model name is not confirmed to a real WTP SKU.'
  },
  {
    id: 'bmx-hb-wethepeople-loop', cat: 'handlebar', brand: 'WeThePeople', model: 'Loop Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 74.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Loop" bar found in WeThePeople\'s current lineup (real current bars: Pathfinder, Mad Max, Everlast, Utopia, LKS, Prodigy, Arc, Buck, Stallis, Patron). Left as unverified sample data; model name is not confirmed to a real WTP SKU.'
  },
  {
    id: 'bmx-se-wethepeople-team', cat: 'seat', brand: 'WeThePeople', model: 'Team Pivotal Seat',
    system: 'pivotal', weight: 259, price: 26.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://www.wethepeoplebmx.de/seats-seatposts-seatclamps/team-pivotal-slim-seat',
    note: 'Team Pivotal Slim variant: pivotal system and 259g weight confirmed on the maker page. wethepeoplebmx.de does not list a USD price for this product (no e-commerce checkout on the regional site) - price is kept as the prior sample figure, unconfirmed against the source.'
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
    price: 429.99,
    note: 'UNVERIFIED / FLAGGED 2026-07-17: an extensive eclatbmx.com search (site nav, collections/all, collections/frames) turned up NO frame product at all under the Eclat brand - Eclat appears to be parts-only (hubs/cranks/forks/bars/stems/pegs/tires/sprockets/chains/grips/seats/BB); their only frame-adjacent product is the WTP-branded Jackal titanium flatland frame (a WeThePeople release, not an Eclat one). "Cortex" is Eclat\'s hub/wheel line name, not a frame. Left as unverified sample data (id/model unchanged, append-only) rather than deleted; recommend the coordinator review whether this row should be retired as fabricated.'
  },
  {
    id: 'bmx-fk-eclat-onyx', cat: 'fork', brand: 'Eclat', model: 'Onyx Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', price: 99.99,
    note: 'UNVERIFIED / FLAGGED 2026-07-17: no "Onyx" fork exists in Eclat\'s current lineup - "Onyx" is Eclat\'s crank/stem/sprocket/BB-axle line name, not a fork. Eclat\'s real forks are Storm, Storm XLT, Storm TA, Coda, Stream (older) and the Ti Jackal flatland fork. Left as unverified sample data pending a coordinator decision on whether to retire or rename this row.'
  },
  {
    id: 'bmx-cr-eclat-onyx', cat: 'cranks', brand: 'Eclat', model: 'Onyx Cranks',
    spindle: '24mm', pieces: '3-piece', ringMount: 'spline', weight: 833, price: 179.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/onyx-cranks',
    note: 'CORRECTED: spindle was wrongly entered as 22mm; Eclat\'s own page confirms the Onyx is a 24mm crmo ultra-hollow spindle (165mm/175mm arm lengths). Weight is the 175mm arm-length figure (833g); the 160mm/165mm options weigh slightly less. Compatible with both 24mm spline-drive and bolt-drive sprockets.'
  },
  {
    id: 'bmx-bb-eclat-mid-22', cat: 'bb', brand: 'Eclat', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', weight: 174, price: 31.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/mid-bottom-bracket-set',
    note: 'Weight is the 22mm-spindle figure from Eclat\'s own page (19mm=189g, 24mm=148g).'
  },
  {
    id: 'bmx-sp-eclat-spline-25', cat: 'sprocket', brand: 'Eclat', model: 'Onyx Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', weight: 144, price: 34.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/onyx-sprocket',
    note: 'CORRECTED model name from the generic "Spline Sprocket 25T" placeholder to Eclat\'s actual product, the Onyx Sprocket (25T/26T, 6061-T6 cold-forged, 23.8mm bore, ships with 19mm/22mm spindle adapters for its native 24mm fit).'
  },
  {
    id: 'bmx-rh-eclat-cortex-9', cat: 'rearWheel', brand: 'Eclat', model: 'Cortex Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 239.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/e440-cortex-cassette-rear-wheel',
    note: 'Row is a complete wheel (cat rearWheel), matched to Eclat\'s E440/Cortex Cassette Rear Wheel product (E440 rim + Cortex Cassette hub, RSD/LSD, 14mm male axle, 9t driver). CORRECTED price from 94.99 (was far under the real ~240 EUR complete-wheel price - possibly confused with a hub-only price). Eclat\'s page publishes no per-wheel weight (interface-only verification per the wheels exception in VERIFY-PROTOCOL.md), so weight stays unset rather than fabricated.'
  },
  {
    id: 'bmx-fw-eclat-cortex', cat: 'frontWheel', brand: 'Eclat', model: 'Cortex Front Wheel',
    wheelSize: '20', axle: '10mm', price: 169.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/e440-cortex-front-wheel',
    note: 'Matched to Eclat\'s E440/Cortex Front Wheel (E440 rim + Cortex Front hub, 10mm female axle). CORRECTED price from 69.99 (real complete-wheel price is far higher). No per-wheel weight is published (interface-only verification per the wheels exception in VERIFY-PROTOCOL.md).'
  },
  {
    id: 'bmx-hb-eclat-cortex', cat: 'handlebar', brand: 'Eclat', model: 'Cortex Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 64.99,
    note: 'UNVERIFIED / FLAGGED 2026-07-17: no "Cortex" bar exists in Eclat\'s current lineup after an extensive eclatbmx.com search - "Cortex" is only used for Eclat\'s hub/wheel line. Eclat\'s real bar names are Strangler, Chocolate/Chocolate OS, Controller (Lewis Mills signature) and the 2PC/4PC bar families. Left as unverified sample data (fields are plausible generic BMX bar specs) pending a coordinator decision on whether to retire this row - do not mark verified.'
  },
  {
    id: 'bmx-st-eclat-cortex', cat: 'stem', brand: 'Eclat', model: 'Cortex Stem',
    clamp: '25.4mm', price: 29.99,
    note: 'UNVERIFIED / FLAGGED 2026-07-17: no "Cortex" stem exists in Eclat\'s current lineup - "Cortex" is only used for Eclat\'s hub/wheel line. Eclat\'s real stems are the Onyx Stem, Burns V2 Top Load, Domain Stem and Mercury Top Loader. Left as unverified sample data pending a coordinator decision; do not mark verified.'
  },
  {
    id: 'bmx-gr-eclat-pulsar', cat: 'grips', brand: 'Eclat', model: 'Pulsar Grips',
    length: 165, flangeless: true, weight: 168, price: 13.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/eclat-pulsar-grips',
    note: 'CORRECTED length from 143mm to the maker-stated 165mm (165mm x 29.5mm, ODI-made flangeless mushroom grip). Weight is per pair.'
  },
  {
    id: 'bmx-se-eclat-bios', cat: 'seat', brand: 'Eclat', model: 'Bios Pivotal Seat',
    system: 'pivotal', weight: 313, price: 38.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/bios-pivotal-seat',
    note: 'Weight is the Mid-padding figure (Eclat\'s own default/primary listing); Slim = 283g, Fat = 388g are also sold under the same Bios Pivotal Seat product. CORRECTED price from 24.99 to the maker\'s 38.99.'
  },
  {
    id: 'bmx-sp-eclat-bios-post', cat: 'seatpost', brand: 'Eclat', model: 'Bios Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 16.99,
    note: 'UNVERIFIED / FLAGGED 2026-07-17: Eclat does not sell a seatpost named "Bios" - Bios is only their seat name. Eclat\'s actual pivotal seatpost is the Torch Pivotal Seat Post (25.4mm, 135/230/330mm lengths, 91g/131g/-). The diameter and pivotal system here happen to match the real Torch post, so left as unverified sample data rather than deleted; flagged for the coordinator to decide whether to rename to Torch or retire.'
  },
  {
    id: 'bmx-pg-eclat-alloy', cat: 'pegs', brand: 'Eclat', model: 'Alloy Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: true, price: 27.99,
    note: 'CORRECTED reducerIncluded from false to true: Eclat\'s real 14mm alloy pegs (Emery Grit Axle Pegs, Sparrow Axle Peg) ship with a 3/8in adapter included. Kept as a generic "Alloy Pegs" sample entry (matching this catalog\'s convention for other brands\' peg rows, e.g. bmx-pg-cult-alloy) rather than verified, since no single Eclat SKU is literally named "Alloy Pegs".'
  },
  {
    id: 'bmx-pd-eclat-slash', cat: 'pedals', brand: 'Eclat', model: 'Slash Pedals',
    platform: 'plastic', spindle: '9/16', weight: 389, price: 20.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/slash-pedal',
    note: 'CORRECTED platform from alloy to plastic (Eclat states injection-moulded nylon/fibreglass body, crmo spindle) and weight from 345g to the maker-stated 389g/pair.'
  },
  {
    id: 'bmx-ti-eclat-fireball-23', cat: 'tire', brand: 'Eclat', model: 'Fireball Tire 2.3"',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 100, weight: 737, price: 39.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/fireball-tire-classic-blue-black',
    note: 'CORRECTED price from 24.99 to the maker\'s 39.99. maxPsi (100) confirmed; weight (737g at 2.3in) is the maker-stated figure.'
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
    platform: 'alloy', spindle: '9/16', weight: 380, price: 74.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com\'s category list and site search - Profile Racing does not manufacture or sell pedals (only rider-build mentions of other brands\' pedals, e.g. "Yoshimura pedals", turned up). Likely a brand-misattribution predating this session. Left unverified, unchanged (out of scope to delete/reattribute); flagged prominently for the coordinator.'
  },
  {
    id: 'bmx-pd-colony-fantom', cat: 'pedals', brand: 'Colony', model: 'Fantom Pedals',
    platform: 'alloy', spindle: '9/16', weight: 350, price: 44.99,
    note: 'UNRESOLVED: no "Fantom" pedal found in Colony\'s current or archived lineup — Colony\'s current pedal listing is "Fantastic Plastic Pedals" (plastic platform, not alloy). Flagged for the coordinator; unverified sample, not sourced.'
  },
  {
    id: 'bmx-pd-bsd-motive', cat: 'pedals', brand: 'BSD', model: 'Motive Pedals',
    platform: 'plastic', spindle: '9/16', price: 17.99,
    note: 'DATA-QUALITY FLAG (2026-07-17): no "Motive" pedal found for BSD (real current pedals: Safari, Jonesin\' - both nylon fibreglass, 9/16in, ~382g/pair). Left as unverified sample data; model name is not confirmed to a real BSD SKU.'
  },
  {
    id: 'bmx-pd-chase-rsp-clip', cat: 'pedals', brand: 'Chase', model: 'RSP Clip Pedals',
    platform: 'clip', spindle: '9/16', weight: 300, price: 89.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },

  // =====================================================================
  // ---- Seat 12 depth pass (2026-07-17): disc-brake vocab unblocks the
  //      Redline Proline Flight race tier + Avid BB5 caliper; two new
  //      brands (Standard Byke Co, Alienation); Fit Bike Co/S&M/Cult/Colony
  //      small-parts depth. Every id below names a real, currently-or-
  //      recently-sold product (WebSearch + a handful of manufacturer-page
  //      WebFetches); none confirmed to VERIFY-PROTOCOL's fetched-manufacturer-
  //      spec-table bar, so all stay unverified sample per catalog policy.
  //      Skipped per THE BAR (logged, not entered): Chase Edge/RSP5.0 race
  //      frames (disc-capable per chasebicycles.com, but no fetched BB shell
  //      - would have been a guessed required field); Tioga race tires (no
  //      fetched width data). Also dropped 3 rows already present from an
  //      earlier depth pass (S&M Slam Bars, Cult Dak Grips, Fit Key Sprocket
  //      25T - duplicate ids caught by test-bmx-golden.js). 222 -> 246 rows.
  //      ---------------------------------------------------------------

  // ---- Redline / Avid disc-brake tier (unblocks the depth-3 vocab gap) --
  {
    id: 'bmx-fr-redline-prolineflight', cat: 'frame', brand: 'Redline', model: 'Proline Flight',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'disc', rearAxle: '14mm', frameOnly: true,
    price: 549.99,
    note: 'Disc-brake-equipped tier of the Redline Proline race platform (Redline has added Avid disc-brake spec to Proline); unblocks the depth-3 disc-vocab gap.'
  },
  {
    id: 'bmx-br-avid-bb5-bmx', cat: 'brake', brand: 'Avid', model: 'BB5 Mechanical Disc Brake',
    mount: 'disc', price: 64.99,
    note: 'Mechanical disc caliper commonly specced on disc-mount BMX race frames (Redline Proline Flight class).'
  },

  // ---- Standard Byke Co (new brand: standardbyke.com, 1991-, USA-made) --
  {
    id: 'bmx-fr-standard-sta', cat: 'frame', brand: 'Standard Byke Co', model: 'STA',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 419.99,
    note: 'STA500 platform - Standard\'s long-running freestyle frame, approaching 25 years in production per the maker.'
  },
  {
    id: 'bmx-fr-standard-125r', cat: 'frame', brand: 'Standard Byke Co', model: '125R',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: true,
    price: 379.99,
    note: 'Race platform sold across Micro/Mini/Junior/Expert/Pro size classes via top-tube length; Expert spec captured here.'
  },

  // ---- Fit Bike Co depth (fitbikeco.com / thebuildingdistro.com fetched) --
  {
    id: 'bmx-fr-fitbikeco-str', cat: 'frame', brand: 'Fit Bike Co', model: 'STR',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 449.99,
    note: 'Street frame - chromoly front triangle with double gussets, Sealed Mid BB confirmed on the maker\'s spec page.'
  },
  {
    id: 'bmx-fr-fitbikeco-prk', cat: 'frame', brand: 'Fit Bike Co', model: 'PRK',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 459.99,
    note: 'Park/transition frame - Mid Sealed BB confirmed on the maker\'s spec page; commonly run brakeless. Also sold in a 20in top-tube size.'
  },
  {
    id: 'bmx-fk-fitbikeco-shivv3', cat: 'fork', brand: 'Fit Bike Co', model: 'Shiv V3',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', price: 99.99,
    note: '25mm offset per the current Fit fork lineup.'
  },
  {
    id: 'bmx-cr-fitbikeco-bosslessindent', cat: 'cranks', brand: 'Fit Bike Co', model: 'Boss-Less 2-Piece Indent Crank',
    spindle: '24mm', pieces: '2-piece', ringMount: 'spline', price: 199.99
  },
  {
    id: 'bmx-gr-fitbikeco-crossfit', cat: 'grips', brand: 'Fit Bike Co', model: 'CrossFIT Grips',
    length: 143, flangeless: true, price: 9.99
  },
  {
    id: 'bmx-gr-fitbikeco-tech', cat: 'grips', brand: 'Fit Bike Co', model: 'Tech Grips',
    length: 160, flangeless: false, price: 9.99,
    note: 'Long-flanged variant (paired with CrossFIT, the flangeless variant).'
  },

  // ---- S&M small-parts depth (sandmbikes.com product line) --------------
  {
    id: 'bmx-hb-sandm-racexlt-8', cat: 'handlebar', brand: 'S&M', model: 'Race XLT Bar 8"',
    clamp: '25.4mm', rise: 8.0, width: 28.5, weight: 762, price: 94.99,
    note: 'Slam-geometry race evolution, thinner-walled multi-butted tubing; also sold in 7.5-10in rise.'
  },

  // ---- Cult small-parts depth (AK = Alex Kennedy, Dak = Dakota Roche
  //      signature lines) -------------------------------------------------
  {
    id: 'bmx-hb-cult-ak', cat: 'handlebar', brand: 'Cult', model: 'AK Bars',
    clamp: '25.4mm', rise: 8.0, width: 28.75, price: 79.99,
    note: 'Alex Kennedy signature bar - 12deg backsweep, 2deg upsweep.'
  },
  {
    id: 'bmx-hb-cult-dak', cat: 'handlebar', brand: 'Cult', model: 'Dak Bars',
    clamp: '25.4mm', rise: 8.8, width: 28.0, price: 79.99,
    note: 'Dakota Roche signature bar - 100% heat-treated butted chromoly, 11deg backsweep, 2deg upsweep, 1in OD clamp area.'
  },
  {
    id: 'bmx-gr-cult-ak', cat: 'grips', brand: 'Cult', model: 'AK Grips',
    length: 158, flangeless: false, price: 10.99,
    note: 'Alex Kennedy signature grip - soft durable rubber compound, thicker than other Cult grips; ships with bar ends.'
  },
  // ---- Colony small-parts + wheel depth (colonybmx.com.au fetched) ------
  {
    id: 'bmx-st-colony-official', cat: 'stem', brand: 'Colony', model: 'Official Stem',
    clamp: '25.4mm', price: 54.99
  },
  {
    id: 'bmx-st-colony-variant', cat: 'stem', brand: 'Colony', model: 'Variant Stem',
    clamp: '25.4mm', price: 49.99,
    note: '52mm topload stem.'
  },
  {
    id: 'bmx-gr-colony-mountjoy', cat: 'grips', brand: 'Colony', model: 'Mountjoy Grips',
    length: 143, flangeless: true, price: 10.99
  },
  {
    id: 'bmx-pg-colony-oneway', cat: 'pegs', brand: 'Colony', model: 'Oneway CrMo Peg',
    axleFit: '14mm', material: 'steel', reducerIncluded: false, price: 19.99
  },
  {
    id: 'bmx-pg-colony-jamcircle', cat: 'pegs', brand: 'Colony', model: 'Jam Circle Peg',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 24.99
  },
  {
    id: 'bmx-fw-colony-wasp', cat: 'frontWheel', brand: 'Colony', model: 'Wasp Front Hub',
    axle: '14mm', wheelSize: '20', price: 79.99,
    note: '6061-T6 low-flange front hub on a 14mm hollow chromoly axle (a freestyle front-hub upsize from the 10mm default) - colonybmx.com.au product page.'
  },
  {
    id: 'bmx-rh-colony-wasp', cat: 'rearWheel', brand: 'Colony', model: 'Wasp Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 99.99,
    note: 'Popular freestyle cassette hub - 6 pawls, high engagement.'
  },
  {
    id: 'bmx-rh-colony-wasprace', cat: 'rearWheel', brand: 'Colony', model: 'Wasp Race Cassette Hubset',
    driverType: 'cassette', driverTeeth: 16, side: 'both', axle: '14mm', price: 129.99,
    note: 'Race version - alloy driver and axle for reduced weight, ships standard with a 16T cog (colonybmx.com.au product page).'
  },

  // ---- Alienation (new brand: alienationbmx.com, race wheels) -----------
  {
    id: 'bmx-fw-alienation-sabbath', cat: 'frontWheel', brand: 'Alienation', model: 'Sabbath Front',
    axle: '10mm', wheelSize: '20', price: 129.99,
    note: 'Race front wheel; axle/wheel-size per the near-universal modern BMX race standard (brand+model confirmed on alienationbmx.com, per-spec page not fetched).'
  },
  {
    id: 'bmx-rh-alienation-sabbath', cat: 'rearWheel', brand: 'Alienation', model: 'Sabbath Rear',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 149.99,
    note: 'Race rear wheel, cassette driver only (race hubs are cassette-only). Driver tooth count per today\'s de-facto 9T standard - brand+model confirmed on alienationbmx.com, per-spec page not fetched.'
  },

  // ---- Depth-5 (2026-07-17): disc-era race frame + Fit/S&M/Cult/Odyssey/
  // Colony small-parts depth. Real SKUs only, fetched/searched against
  // manufacturer or established BMX retail pages (chasebicycles.com fetched
  // directly for the RSP 5.0's disc-only claim; danscomp/valleybmx listing
  // prices via search - see per-row notes). No verified:true (no full
  // manufacturer weight/spec page fetch this batch).
  {
    id: 'bmx-fr-chase-rsp50', cat: 'frame', brand: 'Chase', model: 'RSP 5.0',
    discipline: 'race', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21, rearBrakeMount: 'disc', rearAxle: '14mm', frameOnly: true, price: 609.99,
    note: 'Chase\'s current-gen alloy race frame - chasebicycles.com states RSP 5.0 frames are "made exclusively for disc braking" (post+flat mount via a separately sold adapter) with Press Fit BBs on Expert XL and larger sizes (bbShell modeled as mid/press-fit); Pro-size top tube. Price from a BRG Store listing (pre-sale $609.99).'
  },
  {
    id: 'bmx-fr-redline-roam', cat: 'frame', brand: 'Redline', model: 'Roam',
    discipline: 'race', wheelSize: '20', bbShell: 'american', headTube: 'integrated-1-1/8',
    topTube: 19.1, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false, price: 320,
    note: 'Redline\'s smaller-than-standard-20" entry/youth race-inspired complete bike (between an 18" and full 20") - valleybmx.com lists an American-shell threaded BB and alloy linear-pull ("V-brake" family) brakes. Price is the listed non-sale MSRP.'
  },
  {
    id: 'bmx-fr-fitbikeco-mixtapev2', cat: 'frame', brand: 'Fit Bike Co', model: 'Mixtape V2',
    family: 'fitbikeco-mixtape', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, price: 599.95,
    note: 'Park/street frame - fitbikeco.com spec sheet lists "Removable Thread On 990" rear brake mounts (U-brake family) and a 25.4mm seatpost; offered in 20.5/20.75/21" top tubes (20.75 captured here). BB shell per Fit\'s modern Mid-shell default (not explicitly re-stated on this model\'s page).'
  },
  {
    id: 'bmx-ch-odyssey-bluebird', cat: 'chain', brand: 'Odyssey', model: 'Bluebird Chain',
    pitch: '1/8', halfLink: true, price: 25.88,
    note: 'Same plate/pin dimensions as the popular KMC freestyle chain, ships with a factory-installed half link on one end.'
  },
  {
    id: 'bmx-ch-kmc-z1ehx', cat: 'chain', brand: 'KMC', model: 'Z1eHX Wide Chain',
    pitch: '1/8', halfLink: false, price: 36,
    note: 'KMC\'s wide single-speed 1/8in chain (Neo Chrome finish) - danscomp.com listing.'
  },
  {
    id: 'bmx-sp-sm-oldschoollayback', cat: 'seatpost', brand: 'S&M', model: 'Old School Layback Seat Post',
    diameter: 22.2, system: 'standard', price: 69.95,
    note: '14in chromoly layback post for old-school 7/8in (22.2mm) seat tubes - danscomp.com listing; a railed (non-Pivotal) post.'
  },
  {
    id: 'bmx-se-sm-fatpivotal', cat: 'seat', brand: 'S&M', model: 'Fat Pivotal Seat',
    system: 'pivotal', price: 49.95,
    note: 'Fat-size padded Pivotal seat - albes.com listing.'
  },
  {
    id: 'bmx-st-sm-racexlt', cat: 'stem', brand: 'S&M', model: 'Race XLT Stem',
    clamp: '25.4mm', price: 64.95,
    note: 'CNC-machined 6061 topload race stem, offered in 49/53/55/57mm reach - danscomp.com listing (53mm).'
  },
  {
    id: 'bmx-sp-odyssey-utilitypro-25t', cat: 'sprocket', brand: 'Odyssey', model: 'Utility Pro Guard Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 69.99,
    note: 'Guard-style sprocket with an integrated bash/chain guard - danscomp.com listing; sibling to the 28T guard sprocket and the already-cataloged 30T non-guard Utility Pro.'
  },
  {
    id: 'bmx-sp-odyssey-utilitypro-28t', cat: 'sprocket', brand: 'Odyssey', model: 'Utility Pro Guard Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 69.99,
    note: 'Guard-style sprocket with an integrated bash/chain guard - danscomp.com listing.'
  },
  {
    id: 'bmx-se-cult-paddedpivotal', cat: 'seat', brand: 'Cult', model: 'Padded Pivotal Seat',
    system: 'pivotal', price: 44.99,
    note: 'Fat-base padded Pivotal seat - danscomp.com listing.'
  },
  {
    id: 'bmx-se-cult-vansoldschool', cat: 'seat', brand: 'Cult', model: 'x Vans Old School Pro Pivotal Seat',
    system: 'pivotal', price: 44.99,
    note: 'Cult x Vans collaboration Pivotal seat, old-school profile - danscomp.com listing (pairs with the already-cataloged Cult x Vans tire).'
  },
  {
    id: 'bmx-sp-cult-nwo-25t', cat: 'sprocket', brand: 'Cult', model: 'NWO Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 29.99,
    note: '7075-T6 5-spoke bolt-drive sprocket (bolts to the crank spider\'s spline/bolt pattern - modeled as `spline` per the sprocket-mount convention), ships with 19/22mm spindle adapters - cultcrew.com / danscomp.com.'
  },
  {
    id: 'bmx-sp-cult-nwo-28t', cat: 'sprocket', brand: 'Cult', model: 'NWO Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 29.99,
    note: '7075-T6 5-spoke bolt-drive sprocket, ships with 19/22mm spindle adapters - cultcrew.com / danscomp.com.'
  },
  {
    id: 'bmx-hb-colony-rick', cat: 'handlebar', brand: 'Colony', model: 'Rick Bars',
    clamp: '25.4mm', rise: 8, width: 29, price: 109.99,
    note: 'danscomp.com listing; rise/width per this catalog\'s established Colony/freestyle-bar convention (not itemized in the listing snippet).'
  },
  {
    id: 'bmx-hb-colony-guardian', cat: 'handlebar', brand: 'Colony', model: 'Guardian Bars',
    clamp: '25.4mm', rise: 8, width: 29, price: 89.99,
    note: 'danscomp.com listing; rise/width per this catalog\'s established Colony/freestyle-bar convention (not itemized in the listing snippet).'
  },
  {
    id: 'bmx-gr-odyssey-broc', cat: 'grips', brand: 'Odyssey', model: 'Broc Grips',
    length: 158, flangeless: false, price: 10.99,
    note: 'Broc Raiford signature grip, soft Kraton compound, ships with Odyssey Par Ends bar ends - danscomp.com product page (30mm OD/22mm ID/158mm length).'
  },
  {
    id: 'bmx-gr-odyssey-keyboard', cat: 'grips', brand: 'Odyssey', model: 'Keyboard V1 Grips',
    length: 143, flangeless: true, price: 11.99,
    note: 'Aaron Ross signature grip - danscomp.com listing.'
  }
];

// Node/test consumption only — the browser path stays plain globals, matching
// src/compat.js's own export-guard convention.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BMX_PARTS: BMX_PARTS };
}
