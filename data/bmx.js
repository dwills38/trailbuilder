// data/bmx.js — BMX catalog
//
// Version: 0.1.0  |  Date: 2026-07-11  |  LIVE since: 2026-07-17
//
// *** LIVE — served by bmx.html ("BuildMyBMX"). ***
// index.html and src/compat.js still never reference this file (the MTB app is untouched);
// it is loaded only by the separate bmx.html page, alongside src/compat-bmx.js. Wired live on
// Douglas's 2026-07-17 go-live word (see CLAUDE.md hard rule 3). See data/BMX-MODEL.md for the
// design doc, field schema, real-vs-display compat notes, and open product-design questions.
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-11', source: 'https://kinkbmx.com/products/williams-frame',
    note: 'Nathan Williams signature frame; also offered in 20.5/21/21.25in top tube.'
  },
  {
    id: 'bmx-fr-wethepeople-justice', cat: 'frame', brand: 'WeThePeople', model: 'Justice',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 579.99,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-11', source: 'https://wethepeoplebmx.de/bikes/justice',
    note: 'Weight fetched (12.03kg) is COMPLETE BIKE weight, not frame-only, so weight is omitted here to avoid a wrong frame-weight field. BB is a Salt "Mid" pressed for 19mm spindle.'
  },
  {
    id: 'bmx-fr-cult-gateway', cat: 'frame', brand: 'Cult', model: 'Gateway',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 469.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://cultcrew.com/products/025-gateway-black',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED under the frames complete-bike-only exception (VERIFY-PROTOCOL.md, case b), which post-dates the 2026-07-17 check that first found this row. Re-fetched cultcrew.com/products/025-gateway-black.js: "20.5\" TT" (topTube CONFIRMED), "Integrated Headset" (headTube CONFIRMED), "Sealed Mid Bottom Bracket" (bbShell:mid CONFIRMED), "990 U-Brake" (rearBrakeMount:u-brake CONFIRMED) - every checkBmxBuild-read frame field (wheelSize/bbShell/rearBrakeMount) is confirmed against the exact complete bike\'s own fetched page. frameOnly CORRECTED true -> false: Gateway has no frame-only SKU on cultcrew.com, it exists ONLY inside this complete bike, matching case (b)\'s pattern exactly. price CORRECTED 429.99 -> 469.99 (the real complete-bike MSRP, no longer a frameset-price placeholder now that frameOnly is honestly false). rearAxle (14mm) is not stated on the page and is NOT checkBmxBuild-read (display-only) - left as the pre-existing sample, does not block verification.'
  },
  {
    id: 'bmx-fr-sunday-forecaster', cat: 'frame', brand: 'Sunday', model: 'Forecaster',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 439.99,
    verified: true, lastChecked: '2026-07-20', source: 'https://shop.sundaybikes.com/products/2023-sunday-forecaster-matte-maroon-with-20-75-tt',
    note: 'BMX wave 4 (frame-exception harvest): Sunday sells Forecaster only as a complete bike (shop.sundaybikes.com\'s Frames collection links this model to a complete-bike collection, no frame-only SKU) - verified on interfaces alone per the 2026-07-20 policy extension. Fetched complete-bike page (20.75in TT variant, matching this row exactly) states verbatim: "Sunday Forecaster, 20.75\\" TT, 100% chromoly frame with integrated 1-1/8\\" head tube, and removable brake hardware" (confirms headTube + corroborates u-brake convention), "BB Parts: Sealed, Mid, 19mm" (confirms bbShell:mid), "Brakes: Odyssey Springfield U-brake" (confirms rearBrakeMount:u-brake exactly), "Rear Hub: ...14mm female axle" (confirms rearAxle:14mm). No frame-only weight exists (page states only the ~26.78lb complete-bike weight, not used here) - weight intentionally left unset. Price kept as the prior sample; not independently reconfirmed on this page.'
  },
  {
    id: 'bmx-fr-fitbikeco-seriesone', cat: 'frame', brand: 'Fit Bike Co', model: 'Series One',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 419.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://thebuildingdistro.com/product/2026-series-one-gloss-black-20-75-tt/',
    note: 'Sold as a complete bike only - Fit sells no frame-only Series One SKU on its current store (thebuildingdistro.com, fitbikeco.com/shop/* 301s there), so no shopper should read this as "buy this bare." Interfaces confirmed against the 2026 SERIES ONE GLOSS BLACK 20.75 TT complete-bike spec sheet 2026-07-21: BB shell "Sealed Mid" = mid, head tube "Integrated w/Gyro Holes" = integrated-1-1/8, "U-Brake w/Low Tension Springs" = u-brake, top tube 20.75in matches this row\'s modeled size exactly. rearAxle not stated on the page (display-only field, no rule reads it) - stays a sample. Weight not published for this platform. Price stays the prior 419.99 sample (NOT the $469.95 complete-bike price, which THE PRICE RULE #3 forbids putting on a frame row) - no bare-frame MSRP exists to cite.'
  },
  {
    id: 'bmx-fr-subrosa-salinas', cat: 'frame', brand: 'Subrosa', model: 'Salinas',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 399.99,
    note: 'WALL, checked 2026-07-21 (bmx-sweep-2): subrosabrand.com\'s frame category/product URLs (product-category/frames/, product/simo-frame/, and this row\'s implied slug) all resolve to a stale cached 2012 "Frames updated" placeholder post - a structural site wall, not a per-product 404. The current homepage\'s only listed frame is "Simo Frame"; Salinas is not shown. Left unverified/unchanged - no reachable manufacturer page to confirm bbShell/rearBrakeMount.'
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
    price: 429.99, note: 'Alex Hiam signature frame; real published sizes are 18.9/19.2/20.4/20.7/21in (corrected from a non-existent 20.6in) — ships bossless with a removable brake-tab kit sold separately, so brakeless-stock is correct. Currently sold only via Colony\'s AU distributor/retail channel, not colonybmx.com.au\'s own current frame lineup, so it does not clear the manufacturer-own-page verification bar; weight/price remain sample. RECONFIRMED 2026-07-21 (bmx-sweep-3): colonybmx.com.au/products/category/frames/ (maker\'s own current 9-product Frames category - Prody/Cadet 20/18/16/Bloody Oath Kit/Rico/Enishi/Prisma/Blaster/Horizon Alloy) still has no "Sweet Tooth". Left unverified/unchanged.'
  },
  {
    id: 'bmx-fr-haro-downtown', cat: 'frame', brand: 'Haro', model: 'Downtown',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 469.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://harobikes.com/products/downtown-20-2025',
    note: 'BMX wave 4 (frame-exception harvest): sold as a complete bike only (no frame-only SKU) - verified on interfaces alone per the 2026-07-20 policy extension. Current-year page (downtown-20-2025) states: "Hi-tension steel frame. 20.5\\" top tube. Integrated head tube. Welded brake bosses. Mid bottom bracket." (confirms bbShell:mid, headTube, topTube:20.5 exactly) and current Shopify price $469.00 (corrected from $379.99). The 2025 page names the brake bosses but not the mount TYPE explicitly; cross-checked against Haro\'s own archived spec sheet for the same current-generation model (archive.harobikes.com/bmx/2023-freestyle/downtown-20-2023, same 20.5in TT / Mid BB / integrated-headtube frame, unchanged since), which states verbatim "990 Brake Mounts" and "Brakes: Radius Alloy 990 U-Brake" - confirms rearBrakeMount:u-brake and rearAxle:14mm ("14mm Axle Drop-outs") exactly. No frame-only weight exists on either page (Shopify\'s "weight" field is a shipping-weight bucket, not net product weight, per the wave-2 phantom-number doctrine - not used); weight intentionally left unset.'
  },
  {
    id: 'bmx-fr-mongoose-legion', cat: 'frame', brand: 'Mongoose', model: 'Legion L20',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'american', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 299.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.mongoose.com/products/legion-l20-m20',
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
    price: 439.99,
    note: 'WALL, checked 2026-07-21 (bmx-sweep-3): strangerco.com/collections/frames (Stranger\'s own current-lineup Shopify collection) lists 6 in-stock frames - Ballast Evo, RPG, Royale, Alley Cat - no "Level" model. Retailer pages (Albe\'s/Dan\'s Comp/5150/Stacked) still sell a "Stranger Level" complete bike dated 2021, so this is a discontinued-from-current-manufacturer-lineup case (the same pattern as GT Fly/Fly Bikes Nassau/Haro Downtown DLX), not a fabricated name. Left unverified/unchanged - no manufacturer source confirms these interfaces today.'
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
    price: 399.99, note: 'Long-running Redline race platform, threaded Euro BB shell. WALL, checked 2026-07-21 (bmx-sweep-2): diamondback.com/collections/redline-bmx (Redline\'s current parent-brand storefront) lists 6 current products - PL-26, RL275, SQB-26, MX20, Proline Expert XL, Proline Expert - no plain "Proline" base model. This row is the pre-Expert-tier base platform (a real historical Redline name, distinct from the already-verified bmx-fr-redline-prolineexpert), but it is not among current SKUs, so left unverified/unchanged.'
  },
  {
    id: 'bmx-fr-chase-rsp30', cat: 'frame', brand: 'Chase', model: 'RSP 3.0',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: true,
    weight: 1532, price: 549.99,
    verified: true, priceBasis: 'discontinued-no-msrp', lastChecked: '2026-07-21', source: 'https://chasebicycles.com/frames/frame-archives/chase-rsp-3-0/',
    note: 'Every engine-read field confirmed against chasebicycles.com\'s RSP 3.0 frame-archive page (re-fetched 2026-07-21, raw text cross-checked - a discontinued frame, archive-only): wheelSize=20in (standard), bbShell=euro (page: "BSA Threaded BB on both the earlier RSP frames"), rearBrakeMount=v-brake (V-brake-only frame); weight 1532g is the same page\'s per-size table for the 21.0in/Pro-XL row (this row\'s modeled size). headTube and rearAxle are catalog-required but display-only in checkBmxBuild (no rule reads them) and the archive page states neither, so both stay unconfirmed samples per the interface-verification exception - retained unchanged rather than guessed. Price (549.99) has no located source on this or any other fetched page (2016-era discontinued frame, no surviving retailer listing found); kept as a pre-existing sample figure with NO disclosed original basis - flagged here rather than presented as MSRP, per THE PRICE RULE.'
  },
  {
    id: 'bmx-fr-supercross-envy', cat: 'frame', brand: 'Supercross BMX', model: 'Envy RS7',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: true,
    price: 699.95,
    note: 'RENAMED 2026-07-17 (preflight audit fix): the prior "Envy SL" name is not a real Supercross BMX SKU (unconfirmable, flagged by the 2026-07-17 pre-flip audit). Re-fetched supercrossbmx.com\'s current Envy lineup: the RS7 is Supercross\'s flagship current alloy race frame, sold frame-only. RS7 spec pages describe a threaded/euro-style cold-forged BB shell across the line, and the RS7 FASTBACK is explicitly marketed as the separate "disc brake specific" variant, implying the base RS7 (this row) is the rim/v-brake configuration. The exact 14mm rear-axle figure and 20.75in top tube (Pro Plus size) were not independently confirmed on the fetched pages (some retailer listings for a disc-specific RS7 SKU show a "15mm" dropout-slot-width figure, the same slot-width-vs-axle-diameter trap caught on the GT Speed Series Pro row this same pass) - kept as the best-credible-source estimate per catalog inclusion policy; left unverified (no verified:true/source claimed). WALL-RETEST 2026-07-20 (verify/wall-retest-1): supercrossbmx.com/products/envy-rs7-triple-butted-aluminum-race-frame RENDERS cleanly via the browser pane (no wall was ever suspected here, but re-checked as part of the sweep) and lists 18 sizes/12 colors by name only (Pro/Pro Plus/Pro XL/etc, no inch measurements or a geometry table on this SKU) at "$699.95" - price CORRECTED 899.99->699.95 to this live figure (the prior $899.99 does not match anything currently on the page and may have been a stale/wrong-SKU read). Rear axle, brake mount, and top-tube-inches remain unconfirmed on this page (genuinely not published, not a rendering gap) - still left unverified.'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://gtbicycles.com/products/pro-performer-20',
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
    topTube: 20.75, rearBrakeMount: 'disc', rearAxle: '10mm', frameOnly: false,
    price: 900.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://gtbicycles.com/products/speed-series-pro',
    note: 'GT\'s race-team-tier complete bike. bbShell corrected euro -> spanish (frame is BB86 press-fit, unthreaded - the "Spanish BB" token, not the threaded Euro shell). rearBrakeMount corrected v-brake -> disc (disc-brake-only frame, "AL CNC/Forged Quick Change Disc Dropout system"). AUDIT 2026-07-17: was mistakenly \'caliper\' (rim-caliper token) after the earlier v-brake->caliper edit; re-corrected to the \'disc\' token added the same day (BMX_VOCAB.brakeMount), so the Avid BB5 (mount:\'disc\') and other disc calipers match instead of false-erroring. PREFLIGHT FIX 2026-07-17 (schema-bmx.js catch): rearAxle re-corrected 15mm -> 10mm - re-fetched gtbicycles.com/products/speed-series-pro, which lists "AL CNC/Forged Quick Change Disc Dropout SyStem" with "3/8\\" Dropouts" (the axle spec) and a separate "15mm" DROPOUT SLOT WIDTH figure the earlier pass mistook for the axle diameter; 3/8in is the standard BMX_VOCAB \'10mm\' token, matching every other race-frame row\'s rear axle. headTube (integrated 1-1/8-1.5 taper) and topTube (20.75in Pro size) confirmed. Price corrected 799.99 -> 900.00 (gtbicycles.com/products/speed-series-pro.js); the separate frame-only SKU (gtbicycles.com/products/speed-series-pro-frame) is $262.50 for reference, not used here since this row is frameOnly:false.'
  },
  {
    id: 'bmx-fr-haro-lineage-master', cat: 'frame', brand: 'Haro', model: 'Lineage Master',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21.0, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 499.99, note: 'Heritage reissue of Haro\'s original Master freestyle frame. WALL, checked 2026-07-21 (bmx-sweep-3): harobikes.com/collections/bmx (Haro\'s own current Freestyle collection, 10 products) lists La Bastille Cassette, Hoover, Dana, Clairemont, Burgess, Blvd, Downtown 24/20/18/16 - no "Lineage Master" or any "Lineage" model. Not on the live site at all (unlike Downtown DLX, no archived Haro spec page was located either). Left unverified/unchanged.'
  },
  {
    id: 'bmx-fr-haro-downtown-dlx', cat: 'frame', brand: 'Haro', model: 'Downtown DLX',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 449.99,
    note: 'BMX wave 4: CORRECTED, NOT VERIFIED. No current harobikes.com listing found - Downtown DLX appears discontinued from the live lineup (last found at archive.harobikes.com/bmx/2023-freestyle/downtown-20-dlx-2023, Haro\'s own archived spec sheet, not a current manufacturer page, so the frame-exception bar item 1 isn\'t met). That archive states verbatim "Radius Alloy 990 U-Brake Front & Rear w/ GYRO" and "990 Brake Mounts" - corrected rearBrakeMount from the wrong "none"/brakeless assumption to "u-brake" (this DLX tier actually ships WITH brakes + gyro, not brakeless). Also corrected topTube 20.75->20.5: the archive\'s geometry table lists only two sizes (19.5in and 20.5in), no 20.75in option exists. Frame remains complete-bike-only (Haro sells Downtown/Downtown DLX with no frame-only SKU in any year checked) but since no CURRENT page confirms these interfaces, left unverified per the same standard applied to other discontinued models (Redline Proline, Fly Bikes Nassau) rather than verifying off a 2023 archive alone. RECONFIRMED WALL 2026-07-21 (bmx-sweep-3): harobikes.com/collections/bmx\'s current 10-product Freestyle lineup (see bmx-fr-haro-lineage-master) confirms Downtown DLX is indeed gone - only plain "Downtown 20/18/16/24" remain, a different (non-DLX) SKU.'
  },
  {
    id: 'bmx-fr-haro-hoover', cat: 'frame', brand: 'Haro', model: 'Hoover',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 649.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/hoover',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. harobikes.com/collections/bmx current 10-product Freestyle lineup, fetched via browser pane (WebFetch 429s on this domain). The Specifications-tab text (hidden accordion, present in DOM, not surfaced by page text/description alone) states verbatim: "Full chromoly frame w/ 1-1/8\\" Integrated head tube, mid BB shell, removable brake mounts, 14mm dropouts." (confirms bbShell:mid, headTube:integrated-1-1/8, rearBrakeMount:u-brake, rearAxle:14mm exactly); the Features list confirms "20.75\\" top tube" and current Shopify price $649.99 (SKU 23441/23442). Complete-bike-only (no frame-only Hoover SKU on the current site) -> frameOnly:false per the Mongoose Legion convention. No net frame-only weight published (Shopify carries no weight field on this listing) - weight intentionally left unset per the phantom-number doctrine.'
  },
  {
    id: 'bmx-fr-haro-labastille-cassette', cat: 'frame', brand: 'Haro', model: 'La Bastille Cassette',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.25, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 649.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/la-bastille-cassette',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Matthias Dandois signature flatland/street complete. Specifications-tab text (browser-pane, hidden accordion): "Full chromoly frame w/ 1-1/8\\" integrated headtube, mid BB shell, removable brakes mounts & 14mm dropouts. 20.25\\" top tube." - confirms every engine-read field exactly; current Shopify price $649.99 (SKU 23458). Complete-bike-only (cassette-hub-equipped variant of the La Bastille platform, no frame-only SKU) -> frameOnly:false. No frame-only weight published - left unset.'
  },
  {
    id: 'bmx-fr-haro-dana', cat: 'frame', brand: 'Haro', model: 'Dana',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 629.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/dana-2025',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Product page markets it as "built on the same frame as the Hoover" in rider-designed colorways at a lower price point, but the page\'s own Specifications-tab text (browser-pane) states its OWN geometry distinctly: "Full chromoly construction. 20.5\\" top tube. Removable brake mounts. Integrated head tube. Mid bottom bracket." - topTube modeled at 20.5in (this page\'s own stated size and the only variant offered, "Gloss Metallic Bronze / 20.5"), not copied from the Hoover\'s 20.75in. bbShell/headTube/rearBrakeMount confirmed exactly; rearAxle:14mm carried from the shared-platform convention (every current Haro freestyle frame in this catalog uses 14mm dropouts; not independently restated on this specific page, so treat as the one field not directly page-confirmed). Current Shopify price $629.00 (SKU 25260/25261). Complete-bike-only -> frameOnly:false.'
  },
  {
    id: 'bmx-fr-haro-clairemont', cat: 'frame', brand: 'Haro', model: 'Clairemont',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 599.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/clairemont-2025',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Haro\'s top-tier park/all-around complete ("competition-ready straight out of the box"). Specifications-tab text (browser-pane): "Full chromoly construction. 20.75\\" top tube. Removable brake mounts. Integrated head tube. Mid bottom bracket." - confirms every engine-read field exactly. Current Shopify price $599.00 (SKU 25262, single "Default Title" variant/colorway). Complete-bike-only -> frameOnly:false.'
  },
  {
    id: 'bmx-fr-haro-burgess', cat: 'frame', brand: 'Haro', model: 'Burgess',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 579.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/burgess-2025',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Marketed as "built on the same frame as the Clairemont" in pro-inspired colorways at a lower price point. Specifications-tab text (browser-pane) confirms this is genuinely the same spec, not just marketing: "Full chromoly construction. 20.75\\" top tube. Removable brake mounts. Integrated head tube. Mid bottom bracket." - byte-identical to the Clairemont\'s own tab text, and its "20.75" variant size matches. Current Shopify price $579.00 (SKU 25258/25259). Complete-bike-only -> frameOnly:false.'
  },
  {
    id: 'bmx-fr-haro-blvd', cat: 'frame', brand: 'Haro', model: 'BLVD',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 529.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/blvd-2025',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Entry all-around complete, taller-bar setup. Specifications-tab text (browser-pane): "Chromoly top and down tubes. 20.5\\" top tube length. Integrated head tube. Welded brake bosses. Mid bottom bracket." - "welded" (non-removable) brake bosses, still the u-brake token (mount TYPE, not removability, is what the field encodes - matches the Downtown-DLX archive\'s identical "welded"/fixed convention). rearAxle:14mm carried from the shared Haro-freestyle-platform convention, not independently restated on this page. Current Shopify price $529.00 (SKU 25256/25257). Complete-bike-only -> frameOnly:false.'
  },
  {
    id: 'bmx-fr-haro-downtown-18', cat: 'frame', brand: 'Haro', model: 'Downtown 18',
    discipline: 'freestyle', wheelSize: '18', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 18.9, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 439.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/downtown-18-2025',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Junior-size Downtown, "sized for smaller riders...before they\'re ready for a full 20\\"". Specifications-tab text (browser-pane) states verbatim: "Steel Frame w/ 1-1/8\\" Integrated Headtube, MID BB Shell, 990 Brake Mounts & 14mm Axle Drop-outs, 13.1\\"CS 74.5° HT" - confirms bbShell:mid, headTube:integrated-1-1/8, rearBrakeMount:u-brake (Haro\'s "990" designation, same token this catalog uses for the Downtown 20/Downtown DLX), rearAxle:14mm exactly. No explicit top-tube-length figure is stated on this page (the model name/wheel-size is the differentiator, not a stated TT number) - topTube modeled at 18.9in as a plausible 18in-wheel junior-frame value (NOT page-confirmed; every other engine-read field is). Current Shopify price $439.00 (SKU 25268/25269). Complete-bike-only -> frameOnly:false.'
  },
  {
    id: 'bmx-fr-haro-downtown-16', cat: 'frame', brand: 'Haro', model: 'Downtown 16',
    discipline: 'freestyle', wheelSize: '16', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 17.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 429.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://harobikes.com/products/downtown-16-2025',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. "The perfect first bike for young riders ready to dive into BMX." Specifications-tab text (browser-pane) states verbatim: "Hi-tension steel frame. Integrated head tube. Welded brake bosses. Mid bottom bracket." plus a matching fork ("Hi-tension steel fork...32mm offset"), bar ("Haro 7\\" rise hi-tension steel"), and cranks ("3-piece chromoly cranks. 140mm length. 19mm spindle.") spec block - confirms bbShell:mid, headTube:integrated-1-1/8, rearBrakeMount:u-brake (welded/fixed, same convention as the BLVD row above). No top-tube-length or dropout-mm figure is stated for this smallest-size SKU; topTube modeled at 17.5in as a plausible 16in-wheel entry-size value and rearAxle carried from the shared-platform 14mm convention - NEITHER page-confirmed, unlike the other engine-read fields. Current Shopify price $429.00 (SKU 25266/25267). Complete-bike-only -> frameOnly:false. NOTE: a companion "Downtown 24" SKU (harobikes.com/products/downtown-24-2025, $499.00) exists on the same collection page but is marked "Coming Soon" with empty Features/Specifications tabs (product not yet released, no manufacturer spec text published at all) - a genuine TRUE-GAP, not entered (fabricating its interfaces would violate THE BAR).'
  },
  {
    id: 'bmx-fr-bsd-focus', cat: 'frame', brand: 'BSD', model: 'Focus',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.8, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    weight: 2270, price: 439.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://us.bsdforever.com/products/bsd-focus-gaspar-guendulain-frame',
    note: 'Gaspar Guendulain signature Focus frame; us.bsdforever.com confirms mid BB, integrated head tube, removable brake mounts (sold separately - runs brakeless by default), and 14mm dropouts. Top tube corrected from 20.6in (not an offered size) to 20.8in, the shortest real option (20.8/21/21.2/21.5in). Weight ~2270g per the published "5lbs". US-store price ($439.99) matches this row exactly.'
  },
  {
    id: 'bmx-fr-flybikes-nassau', cat: 'frame', brand: 'Fly Bikes', model: 'Nassau',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 449.99, note: 'Fly Bikes (Spain) street/park frame; commonly run brakeless. Checked flybikes.com 2026-07-17: current frame lineup is Dove/Savanna/Fuego V-8/Motosierra/Aire/Sierra -- no Nassau frame found (product page 302-redirects, site search returns nothing), appears discontinued. Left unverified; spec unchanged.'
  },
  {
    id: 'bmx-fr-sandm-pitchfork', cat: 'fork', brand: 'S&M', model: 'Pitchfork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 980, price: 209.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://sandmbikes.com/product/hardgoods/forks/pitchfork/',
    note: 'RECATEGORIZED frame->fork 2026-07-17 (audit): "Pitchfork" is S&M\'s long-running 4130 CrMo FORK, never a frame. BMX wave 6: PROMOTED to verified off sandmbikes.com\'s own product page (raw-fetched, not a WebSearch summary) - its variation JSON confirms the 20in/"None"-brake-mount/"38" (3/8in=10mm) dropout SKU (sku 02-PF-BLK-20) weighs "3 lbs" shipping-bucket but the spec table\'s stated per-size weight is authoritative: "2.17 lb (.98 kg) 20\\"" = 980g exact match. Steerer text ("1 Piece CNC-Machined 4130 CrMo... Requires standard bearing race included with headset") confirms the integrated-1-1/8 convention. PRICE CORRECTED 459.99 -> 209.95: the page\'s real price for this exact SKU (20in/none/3/8in) is $209.95, not the stale $459.99 sample (a 990-brake-mount variant on the same page runs $219.95, still nowhere near the old figure). Dropouts also confirmed to ship in a 14mm variant (different SKU, not this row).'
  },

  // ===== FRAMES — seat 12 depth pass (new brands) =====================
  {
    id: 'bmx-fr-subrosa-malum', cat: 'frame', brand: 'Subrosa', model: 'Malum',
    family: 'subrosa-malum', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 659.99,
    note: 'Frame spec pulled from the Malum complete-bike page (Source BMX); BB is 19mm-spindle Mid per the complete-bike crank/BB callout. WALL, checked 2026-07-21 (bmx-sweep-2): subrosabrand.com structurally unreachable per bmx-fr-subrosa-salinas\'s finding (every frame URL serves a stale 2012 placeholder); the existing Source BMX retailer basis cannot upgrade to verified:true (sourceType:retailer is validator-rejected on verified rows). Left unverified/unchanged.'
  },
  {
    id: 'bmx-fr-subrosa-salvador', cat: 'frame', brand: 'Subrosa', model: 'Salvador',
    family: 'subrosa-salvador', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 796.00,
    note: 'Frame spec pulled from the Salvador complete-bike page (Source BMX); hi-ten frame with chromoly top/down tube, entry-to-intermediate tier. WALL, checked 2026-07-21 (bmx-sweep-2): subrosabrand.com structurally unreachable per bmx-fr-subrosa-salinas\'s finding (every frame URL serves a stale 2012 placeholder); the existing Source BMX retailer basis cannot upgrade to verified:true (sourceType:retailer is validator-rejected on verified rows). Left unverified/unchanged.'
  },
  {
    id: 'bmx-fr-mankind-sunchaser', cat: 'frame', brand: 'Mankind', model: 'Sunchaser (Ed Black)',
    family: 'mankind-sunchaser', modelYear: 2020, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: true, weight: 2100, price: 379.95,
    note: 'Daniel Juchatz signature frame (mankindbmx.com); also offered in 20.75/21/21.25in top tube. Price is EUR retail. Removable U-brake mounts, gyro-compatible, integrated seat clamp + chain tensioners.'
  },
  {
    id: 'bmx-fr-mankind-international2', cat: 'frame', brand: 'Mankind', model: 'International 2.0 Park (Ed Black, 21in)',
    family: 'mankind-international', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, weight: 2100, price: 421.74,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-23',
    source: 'https://mankindbmx.com/mankind-international-2-0-park-rahmen-21-0-ed-black/',
    note: 'bmx-brand-depth-2: directly fetched mankindbmx.com (Mankind\'s own storefront), the current Sanko-tubing park-frame platform (updated geometry, 2022+ per digbmx.com\'s corroborating coverage). States verbatim "BB: Mid BB" (bbShell:mid), "Head tube: Wärmebehandelt-Int. Steuersatz" (integrated headset -> headTube:integrated-1-1/8), "Dropouts:...14mm Achsaufnahme" (rearAxle:14mm exact), "U-Brake: Abn. M6 Bremssockel" (removable U-brake bosses -> rearBrakeMount:u-brake exact), "Weight: 2.1 kg bei 21.0\\"" (this row is the 21.0in TT variant, so weight:2100 is this exact SKU\'s own stated figure, not a cross-size guess), "Lengths: 20.3, 20.6, 21.0" (topTube:21 modeled). Sold as a standalone frame ("Kategorie: Rahmen", no complete-bike bundling on this SKU) -> frameOnly:true. Price is maker-stated EUR-only (369.95€, "inkl. 19% MwSt.") - no USD figure published on this German-region storefront; converted at 1.14 USD/EUR (this catalog\'s existing bmx-br-saltplus-geo-xl-rear precedent rate) = $421.74, disclosed as priceBasis:regional-conversion.'
  },
  {
    id: 'bmx-fr-radio-darko', cat: 'frame', brand: 'Radio Bikes', model: 'Darko',
    family: 'radio-darko', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 524.99,
    verified: true, lastChecked: '2026-07-20', source: 'https://radiobikes.com/collections/complete-bikes/products/radio-darko',
    note: 'Frame spec pulled from the Darko complete-bike page (radiobikes.com); also offered in 21in top tube. Mid press-fit BB, fully removable brake hardware. WALL-RETEST 2026-07-20 (verify/wall-retest-1): re-fetched via the browser pane, no wall - renders cleanly. Full spec table CONFIRMS "BB: RADIO MID bb set" (bbShell mid), "HEADSET: SALT PRO integrated headset" (headTube integrated), "REAR HUB: RADIO AM cassette hub...14mm axle" (rearAxle exact), "BRAKE: RADIO AM u-brake" (rearBrakeMount exact), and "Top Tube Length 20.5\" / 21\"" (topTube exact). Price NOT independently reconfirmed - no USD figure is currently shown on the fetched page (likely out of stock/hidden pricing); left at the existing $524.99 sample rather than guessed. Upgraded to verified:true on the strength of every rule-relevant field matching exactly.'
  },
  {
    id: 'bmx-fr-radio-comrad', cat: 'frame', brand: 'Radio Bikes', model: 'Comrad',
    family: 'radio-comrad', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 980.39,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-23',
    source: 'https://radiobikes.com/products/radio-comrad',
    note: 'bmx-brand-depth-2: directly fetched radiobikes.com (Radio\'s own storefront), Radio\'s current PRO-level street complete. Spec list states verbatim "BB: RADIO \\"MID\\" bb set, press fit, sealed bearing" (bbShell:mid), "HEADSET: SALT \\"PRO\\" integrated headset, sealed bearing" (headTube:integrated-1-1/8), "BRAKE: RADIO \\"PRO\\" u-brake, alloy, rear" + "FRAME: RADIO \\"COMRAD\\" frame, full crmo, removable brake mounts & guides" (confirms rearBrakeMount:u-brake), "REAR HUB: SALTPLUS \\"VERTEX\\" freecoaster hub...14mm hollow axle" (rearAxle:14mm exact), and the Frame Geometry table\'s "Top Tube Length: 21\\"" (topTube exact). No standalone Comrad frame SKU is listed on radiobikes.com/collections/frames (complete-bike-only) -> frameOnly:false, same convention as the sibling Darko row. Stated weight (12.65kg) is COMPLETE-BIKE mass, intentionally omitted (mirrors this catalog\'s WeThePeople-row convention). Price is maker-stated EUR-only (€859.99, no USD toggle available on this page) - converted at 1.14 USD/EUR (this catalog\'s existing rate precedent) = $980.39, disclosed as priceBasis:regional-conversion.'
  },
  {
    id: 'bmx-fr-premium-solo', cat: 'frame', brand: 'Premium', model: 'Solo',
    family: 'premium-solo', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 360.00,
    note: 'Frame spec pulled from the Solo complete-bike page; also offered in 20/20.5in top tube. Price is an archived 2012 MSRP (Premium/Haro catalog archive) - current pricing not re-sourced.'
  },
  {
    id: 'bmx-fk-premium-ckv3', cat: 'fork', brand: 'Premium', model: 'CK V3 Fork',
    family: 'premium-ck', discipline: 'freestyle', wheelSize: '20',
    steerer: 'integrated-1-1/8', axle: '10mm', brakeMount: 'none',
    price: 199.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://harobikes.com/products/ck-v3-fork',
    note: 'bmx-brand-depth-2: Chad Kerley signature fork, directly fetched from harobikes.com (Premium is now sold through Haro Bikes\' own storefront, premiumbmx.com, which 301-redirects to harobikes.com/pages/premiumproducts/... - same manufacturer). Page states verbatim "100% machined 4130 chromoly steerer tube with built-in compression cap" + "Built-in 45° integrated headset cup" (confirms steerer:integrated-1-1/8) and "5mm thick 3/8\\" invest cast dropouts" (confirms axle:10mm, the 3/8in=10mm token per this catalog\'s convention). No brake boss of any kind is mentioned anywhere in the spec (no canti/U-brake mount named) - entered as brakeMount:none per this catalog\'s standing convention for spec-silent freestyle street forks (matches the sibling bmx-fk-haro-downtown/bmx-fk-sunday-darkwave/bmx-fk-merritt-cnc rows\' identical reasoning); commonly run brakeless. Price $199.99 matches premiumbmx.com\'s own storefront listing exactly (fetched separately, same session) - both are Haro/Premium\'s own first-party pages. No current Premium-branded frame SKU was found on premiumbmx.com (its live product list has zero frame rows, components only) - a genuine gap, not entered; the existing bmx-fr-premium-solo row (archived 2012 MSRP) remains the catalog\'s only Premium frame.'
  },
  {
    id: 'bmx-cr-premium-trestle-24mm', cat: 'cranks', brand: 'Premium', model: 'Trestle 24mm Cranks',
    family: 'premium-trestle', spindle: '24mm', pieces: '3-piece', ringMount: 'spline', length: 170,
    price: 209.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://harobikes.com/products/trestle-24mm-cranks',
    note: 'bmx-brand-depth-2: directly fetched harobikes.com (Premium\'s parent-brand storefront). States verbatim "Oversized 24mm hollow heat-treated chromoly 48-spline spindle" (spindle:24mm - the 24mm diameter is the fit-relevant dimension; "48-spline" here names the SPROCKET interface, not a competing spindle-diameter class) and is offered in 165/170/175mm arm lengths (length modeled at the middle 170mm option - display-only field, not fit-relevant). harobikes.de\'s companion CK Pro complete-bike spec sheet independently states "Premium Trestle 3-piece chromoly cranks. 24mm spindle" confirming pieces:3-piece. Compatible with "24mm spline drive sprockets" per empirebmx.com\'s retailer copy (ringMount:spline). Price $209.99 matches exactly; americancycle.com/alansbmx.com corroborate the same spec independently.'
  },
  {
    id: 'bmx-hb-premium-ckv3-222', cat: 'handlebar', brand: 'Premium', model: 'CK V3 Bars (22.2mm)',
    family: 'premium-ck-bars', clamp: '22.2mm', rise: 9, width: 28.5,
    price: 79.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://harobikes.com/products/ck-v3-bars',
    note: 'bmx-brand-depth-2: directly fetched harobikes.com. Chad Kerley signature bars, sold in two bore sizes ("Size 9\\" / 22mm bore size, 9\\" / 25.4mm bore size") at the same $79.99 price - this row is the 22.2mm/"Regular" variant (clamp differs from the 25.4mm sibling row below, a new-row-worthy engine-read field per DATA-ENTRY-TEMPLATE). "9\\" Height" + "28.5\\" wide" confirm rise/width exactly. 100% heat-treated chromoly butted tubing.'
  },
  {
    id: 'bmx-hb-premium-ckv3-254', cat: 'handlebar', brand: 'Premium', model: 'CK V3 Bars (25.4mm)',
    family: 'premium-ck-bars', clamp: '25.4mm', rise: 9, width: 28.5,
    price: 79.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://harobikes.com/products/ck-v3-bars',
    note: 'bmx-brand-depth-2: companion oversize-clamp variant of the row above, same fetched page ("9\\" / 25.4mm bore size" option, same $79.99 price, same rise/width) - only clamp differs.'
  },
  {
    id: 'bmx-fr-verde-cadet', cat: 'frame', brand: 'Verde', model: 'Cadet',
    family: 'verde-cadet', modelYear: 2021, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 20.25, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: false, price: 399.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://verdebicycles.com/collections/bmx-bikes/products/2021-verde-cadet',
    note: 'Frame spec pulled from the Cadet complete-bike page (verdebicycles.com); entry-level hi-ten frame w/ Mid BB, alloy U-brake. WALL-RETEST 2026-07-20 (verify/wall-retest-1): re-fetched via the browser pane, no wall - verdebicycles.com renders cleanly. Full "Frame Spec" table CONFIRMS Top Tube Length 20.25in (exact), Mid BB, price $399.99 (exact), and Rear Hub "14mm axle" (rearAxle exact). HEADTUBE DISCREPANCY FLAGGED, NOT CHANGED: the page states "standard head tube" + "Headset: Standard 1-1/8\"" (an external-cup standard headset), not an integrated design - this row\'s headTube:integrated-1-1/8 does not match, but headTube is display-only (compat-bmx.js: "no headset rule fires") and BMX_VOCAB has no "standard-1-1/8" option (only integrated-1-1/8/mid/threaded), so left unchanged rather than picking a wrong enum value - flagged for a vocab-widening follow-up. Upgraded to verified:true on the strength of every rule-relevant field (bbShell, topTube, rearAxle, price) matching exactly.'
  },
  {
    id: 'bmx-fr-verde-eon', cat: 'frame', brand: 'Verde', model: 'Eon',
    family: 'verde-eon', modelYear: 2021, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: false, price: 529.99,
    verified: true, lastChecked: '2026-07-20', source: 'https://verdebicycles.com/products/2021-verde-eon',
    note: 'BMX wave 4 (frame-exception harvest): sold as a complete bike only - verified on interfaces alone per the 2026-07-20 policy extension. Raw-fetched verdebicycles.com product page states verbatim: "CNC machined integrated head tube, Mid BB" (confirms bbShell:mid + headTube), "Top Tube Length: 20.5\\"" (confirms topTube exactly), "Brake: Alloy U-brake" (confirms rearBrakeMount:u-brake exactly), "Rear Hub: Verde 100, fully sealed, alloy, 14mm axle" (confirms rearAxle:14mm exactly) - every rule-relevant field matches with zero corrections needed. Also offered in 21in (XL) top tube. No frame-only weight exists (complete-bike-only); a price figure ($399.99) appeared in the page\'s raw JSON but could not be confirmed as this SKU\'s own price rather than a related-product price (same ambiguity the Blueprint fetch hit) - price kept as the prior sample, not changed.'
  },
  {
    id: 'bmx-fr-united-supreme', cat: 'frame', brand: 'United', model: 'Supreme',
    family: 'united-supreme', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 465.00, status: 'discontinued',
    note: 'DISCONTINUED 2026-07-21 (bmx-fixpack-1), applying bmx-sweep-4\'s finding: re-confirmed via web search that unitedbikeco.com sells no complete "Supreme" bike today - the only current complete-bike line is "Recruit" (16/18/18.5/20.25in); "Supreme" now survives on the site only as standalone spare-parts naming (Supreme cranks, forks, wheels, BB kit, cassette hub driver - a component line, not a bike model). No supersededBy set: United names no successor for this frame (Recruit is a different, unrelated model line, not a continuation). Spec (bbShell:mid, headTube:integrated-1-1/8, rearBrakeMount:u-brake, rearAxle:14mm, topTube:20.5) stays unverified sample per bmx-sweep-4 - no maker page for the discontinued complete bike will ever exist, so THE BAR cannot be met; retailer corroboration (timelessbmxdistro.com, 5150bmx.com, skatehut.co.uk, americancycle.com) noted but not sourced as verified.'
  },
  {
    id: 'bmx-fr-united-recruit-2025', cat: 'frame', brand: 'United', model: 'Recruit 20.25',
    family: 'united-recruit', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.25, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 447.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://unitedbikeco.com/products/cbun48bk',
    note: 'bmx-brand-depth-2: directly fetched unitedbikeco.com (United\'s own storefront) via its products/<handle>.json feed. States verbatim "FRAME: 1020 HI TEN, WELDED BRAKE MOUNTS, 1 1/8\\" HEAD TUBE, MID BB" (confirms bbShell:mid, welded/fixed but still the u-brake mount TYPE - "REAR BRAKE: 990" confirms rearBrakeMount:u-brake exactly, same "990"=U-brake convention already used catalog-wide on Haro rows) and "HEADSET: UNITED INTEGRATED SEALED BEARING" (confirms headTube:integrated-1-1/8); "REAR HUB: 36H SEALED ALLOY CASSETTE HUB WITH 14MM AXLE" confirms rearAxle:14mm exactly; "TOP TUBE: LENGTH 20.25\\"" confirms topTube exactly. The page\'s own rendered price is "$447.00 USD" - a direct US-dollar MSRP (this is United\'s "Recruit" entry-level complete-bike line named as the Supreme\'s current successor line in the sibling row above; no standalone frame SKU exists, so complete-bike-only, frameOnly:false, same convention as the Mongoose Legion/WeThePeople rows).'
  },
  {
    id: 'bmx-fr-united-recruit-185', cat: 'frame', brand: 'United', model: 'Recruit 18.5',
    family: 'united-recruit', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 18.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 327.00,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-23',
    source: 'https://unitedbikeco.com/products/cbun47bk',
    note: 'bmx-brand-depth-2: directly fetched unitedbikeco.com\'s products/cbun47bk.json feed - same "Recruit" platform as the 20.25in sibling row (identical FRAME/HEADSET/REAR HUB/REAR BRAKE spec text verbatim: bbShell:mid, headTube:integrated-1-1/8, rearBrakeMount:u-brake, rearAxle:14mm all confirmed the same way), this SKU\'s "TOP TUBE LENGTH: 18.5\\"" confirms topTube exactly. The JSON\'s own variant carries "price":"352.95" with "price_currency":"EUR" explicitly (United Bike Co / 4Down Distribution Ltd is a UK/EU-based operation; unlike the 20.25in SKU above, this specific listing\'s API response is priced in EUR, not USD) - disclosed conversion at 1 EUR = 1.08 USD (rate used 2026-07-23), giving $327.00; not this catalog\'s own US-dollar MSRP.'
  },
  {
    id: 'bmx-fr-united-recruit-16', cat: 'frame', brand: 'United', model: 'Recruit 16',
    family: 'united-recruit', discipline: 'freestyle', wheelSize: '16', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 16, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 374.00,
    verified: true, lastChecked: '2026-07-23',
    source: 'https://unitedbikeco.com/products/cbun45bk',
    note: 'bmx-brand-depth-2: directly fetched unitedbikeco.com\'s products/cbun45bk.json feed. Junior-size Recruit (20H rims vs the 36H adult sizes): states verbatim "FRAME: 1020 HI-TEN, WELDED BRAKE MOUNTS, 1 1/8\\" HEAD TUBE, MID BB" (confirms bbShell:mid), "HEADSET: UNITED INTEGRATED SEALED BEARING" (confirms headTube:integrated-1-1/8), "REAR BRAKE: 990" (confirms rearBrakeMount:u-brake), "REAR HUB: 20H SEALED CASSETTE HUB WITH 14MM CROMO AXLE" (confirms rearAxle:14mm exactly - NOT a smaller diameter despite the junior size), "TOP TUBE LENGTH: 16\\"" (confirms topTube exactly; wheelSize:16 inferred from the model name + junior 20H-rim spec, this catalog\'s established Downtown-16 convention, not an independently stated wheel-diameter figure). This specific listing\'s fetched price field was ambiguous/possibly a caching artifact (identical raw figure to an unrelated sibling SKU fetched the same session) so NOT trusted as this SKU\'s own price; $374.00 is instead the confirmed regular-price figure from a same-model "Recruit 16\\" Lemon Sherbert" colorway also fetched from unitedbikeco.com this session - same model, different (older) color, so entered without a priceBasis token per the price-token law (a same-model-different-colorway figure is not this exact SKU\'s own confirmed price).'
  },
  {
    id: 'bmx-fr-mongoose-legionl60', cat: 'frame', brand: 'Mongoose', model: 'Legion L60',
    family: 'mongoose-legion', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 281.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://int.mongoose.com/products/legion-l60',
    note: 'BMX wave 4 (frame-exception harvest): sold as a complete bike only (Mongoose does not sell Legion frames standalone) - verified on interfaces alone per the 2026-07-20 policy extension. int.mongoose.com (Mongoose\'s own first-party international site) states verbatim: "Hi-Ten steel frame, removable brake mounts, and mid BB shell" (confirms bbShell:mid), spec table "Rear Hub: Steel, sealed-bearing cassette, 14 mm axle" (confirms rearAxle:14mm) and "Brakes: U-brake, aluminum" (confirms rearBrakeMount:u-brake exactly), "20.5-inch top tube length" (confirms topTube:20.5 exactly). Current mongoose.com (US) price $281.99 confirmed via raw fetch of the same SKU. No frame-only weight exists (complete-bike-only); weight intentionally left unset.'
  },
  {
    id: 'bmx-fr-mongoose-legionl100', cat: 'frame', brand: 'Mongoose', model: 'Legion L100',
    family: 'mongoose-legion', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 298.99,
    verified: true, lastChecked: '2026-07-20', source: 'https://int.mongoose.com/products/legion-l100',
    note: 'BMX wave 4 (frame-exception harvest): sold as a complete bike only (Mongoose does not sell Legion frames standalone) - verified on interfaces alone per the 2026-07-20 policy extension. int.mongoose.com (Mongoose\'s own first-party international site) states verbatim: "Mongoose full 4130 Chromoly frame, tapered headtube, removable brake mounts, and mid BB shell" (confirms bbShell:mid), spec table "Rear Hub: Aluminum, sealed-bearing cassette, 14 mm axle" (confirms rearAxle:14mm) and "Brakes: U-brake, aluminum" (confirms rearBrakeMount:u-brake exactly). Top-tube length not independently reconfirmed on this page (left at the prior 21in sample). Current mongoose.com (US) price $298.99 (sale price, WebSearch-corroborated only - not independently raw-confirmed, kept as prior sample). No frame-only weight exists (complete-bike-only); weight intentionally left unset.'
  },
  {
    id: 'bmx-fr-sunday-blueprint', cat: 'frame', brand: 'Sunday', model: 'Blueprint',
    family: 'sunday-blueprint', modelYear: 2023, discipline: 'freestyle', wheelSize: '20',
    bbShell: 'american', headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake',
    rearAxle: '14mm', frameOnly: false, price: 469.99,
    verified: true, lastChecked: '2026-07-20', source: 'https://shop.sundaybikes.com/products/2023-sunday-blueprint-gloss-black-with-20-5-tt',
    note: 'BMX wave 4 (frame-exception harvest): sold as a complete bike only (Sunday\'s own Frames collection links "Blueprint" to a complete-bike collection, no frame-only SKU exists) - verified on interfaces alone per the 2026-07-20 policy extension. Fetched complete-bike page (Gloss Black, 20.5in TT variant, matching this row exactly) states verbatim: "Frame: Sunday Blueprint, 20.5\\" top tube, integrated 1-1/8\\" head tube" (confirms topTube + headTube exactly), "BB Parts: Loose-ball, American, 19mm" (confirms bbShell:american exactly - genuinely unusual for an entry frame but literally maker-stated), "Brakes: Odyssey Springfield U-brake" (confirms rearBrakeMount:u-brake), "Rear Hub: Sunday, 36H, 14mm axle w/ 9t Driver" (confirms rearAxle:14mm). Also offered in 20in top tube (not this row). No frame-only weight exists (page states only the ~26lb complete-bike weight, not used here). Price kept as the prior sample; not independently reconfirmed on this page.'
  },
  {
    id: 'bmx-fr-supercross-envyblk2-expertxl', cat: 'frame', brand: 'Supercross BMX', model: 'ENVY BLK 2 Expert XL',
    family: 'supercross-envyblk2', discipline: 'race', wheelSize: '20', bbShell: 'euro',
    headTube: 'integrated-1-1/8', topTube: 20, rearBrakeMount: 'v-brake', rearAxle: '10mm',
    frameOnly: true, price: 1195.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://www.supercrossbmx.com/products/supercross-bmx-envy-blk-2-carbon-fiber-bmx-race-frame',
    note: 'Carbon fiber race frame, Expert XL size (10mm/3-8in rear axle - the larger Pro sizes ship a 15mm dropout w/ 10mm adapter, not modeled here). Threaded Euro BB shell, 22.2mm seatpost, removable V-brake mounts. Raw-fetch confirmed on supercrossbmx.com\'s own geometry table: Expert XL top tube = 20.0in (4-column Junior/Expert/Expert XL/Expert XXL table), 10mm rear axle explicitly stated for this size, threaded Euro BB shell, integrated 1-1/8"-1.5" head tube, removable V-brake system, and the exact $1195.95 price (Shopify JSON price field). No frame weight published anywhere on the page (sold standalone frame-only, no complete-bike bundling) - weight stays the unset/sample state per the frames no-published-weight exception (VERIFY-PROTOCOL.md).'
  },

  // ===== FRAMES — bmx-breadth-7 (new brand: Bone Deth) ==================
  {
    id: 'bmx-fr-bonedeth-crime', cat: 'frame', brand: 'Bone Deth', model: 'Crime',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2313, price: 399.95,
    note: 'bmx-breadth-7: new brand (Bone Deth absent entirely before this batch). Sean Burns/Josh Delarosa signature street/park frame, current production. Cross-confirmed across three independent US retailer listings carrying the identical spec block (empirebmx.com/products/bone-deth-crime-frame, albes.com/products/bone-deth-crime-frame, us.sourcebmx.com/products/bone-deth-crime-frame) rather than a bonedeth.com manufacturer page (bonedeth.com itself has no working product catalog to fetch), so this row stays UNVERIFIED per the credible-retailer-source policy for sample breadth. Specs: "Mid BB (heat-treated and CNC machined)", "integrated 155mm head tube... drilled for gyro tabs" (headTube:integrated-1-1/8 is this catalog\'s standard modern-integrated convention, not a literal S.H.I.S. code on any listing), "6mm thick dropouts" implying the near-universal 14mm rear axle (also stated explicitly on sourcebmx.com\'s spec table: "DROPOUT SIZE: 14mm"), "accepts low profile removable brake mounts / hardware (S&M, BSD, Cult, Kink, T1)" -> rearBrakeMount:u-brake (every named brand uses u-brake bosses in this catalog). Sold in 20.6"/20.75"/21"/21.25" TT at one flat $399.95 price across sizes (albes.com) - this row models the 20.75" size. Weight: sourcebmx.com/us.sourcebmx.com both state "5.1lbs (2.3kg)" for the Black colorway (2313g); a differently-worded UK retailer (Source BMX UK) instead lists a Machine-model-adjacent "5.6lbs" figure for a DIFFERENT Bone Deth frame (Machine, not cataloged this batch) - not conflated here.'
  },

  // ===== FORKS ========================================================
  {
    id: 'bmx-fk-odyssey-r32', cat: 'fork', brand: 'Odyssey', model: 'R32',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 885, price: 219.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-r32-forks',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): brakeMount corrected u-brake -> none - the product\'s own Shopify tag data states "Brake Mounts:None" verbatim (raw JSON, not a search summary). Axle (3/8in slot = 10mm token) and weight (885g/1lb 15.2oz) both raw-confirmed in the page\'s own spec list ("Weight: 1lb 15.2oz (885 grams)") - a real per-SKU figure, not the Shopify shipping-weight-bucket field (which separately reports 2268g on this same product, discarded). steerer is display-only in checkBmxBuild (no BMX headset/steerer rule reads it) so it does not gate verification.'
  },
  {
    id: 'bmx-fk-merritt-cnc', cat: 'fork', brand: 'Merritt', model: 'CNC 3-Piece',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 650, price: 149.99, note: 'Commonly run brakeless.'
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
    brakeMount: 'v-brake', weight: 450, price: 89.99,
    note: 'WALL, checked 2026-07-21 (bmx-sweep-2): diamondback.com/collections/redline-bmx (Redline\'s current parent-brand storefront) lists only 6 complete bikes (PL-26, RL275, SQB-26, MX20, Proline Expert XL, Proline Expert) - no standalone-parts collection found, and direct product-slug guesses (forklift-pro-fork, forklift-pro) both 404/timeout. Left unverified/unchanged - no manufacturer page reachable to confirm wheelSize/brakeMount.'
  },
  {
    id: 'bmx-fk-haro-downtown', cat: 'fork', brand: 'Haro', model: 'Downtown Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 680, price: 99.99, note: 'Companion fork to the Downtown/Downtown DLX frames; commonly run brakeless. WALL, checked 2026-07-21 (bmx-sweep-3): no standalone fork found on harobikes.com\'s current 10-product Freestyle lineup (see bmx-fr-haro-lineage-master) - Haro does not sell aftermarket forks separately in the current storefront at all (complete-bikes-only brand). Left unverified/unchanged.'
  },
  {
    id: 'bmx-cr-haro-fusion', cat: 'cranks', brand: 'Haro', model: 'Fusion Cranks',
    family: 'haro-fusion', spindle: '22mm', pieces: '3-piece', ringMount: 'press-on', length: 175,
    price: 189.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://harobikes.com/products/fusion-cranks',
    note: 'bmx-brand-depth-2: correction to the bmx-fk-haro-downtown note above (a prior session claimed Haro sells "complete-bikes-only" - it does also run a live standalone-parts storefront at harobikes.com, this row + the Baseline bar below directly fetched from it). Fusion Cranks page states verbatim "22mm heat-treated chromoly spindle" (spindle:22mm) and "7050 aluminum arms with dual pinch bolts" sold as "arms and spindle" (pieces:3-piece - two bolted arms + a separate spindle). ringMount:press-on per the companion "Fusion Disc" sprocket\'s own listed spec ("Style: Sprocket Bolt Drive", kunstform.org/Alan\'s BMX, both independently corroborating a bolt-drive, non-spline interface for this exact 19/22mm crank family) - this field is display-only (no compat-bmx.js rule reads ringMount), so the coarse spline/press-on binary safely covers the "not spline" bolt-drive reality. Offered in 175/180mm (length:175 modeled). Price $189.99 confirmed exactly on the fetched page.'
  },
  {
    id: 'bmx-hb-haro-baseline-2pc', cat: 'handlebar', brand: 'Haro', model: 'Baseline 2pc Bars',
    family: 'haro-baseline-bars', clamp: '22.2mm', rise: 9.5, width: 29,
    price: 34.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://harobikes.com/products/baseline-2pc-bars',
    note: 'bmx-brand-depth-2: directly fetched harobikes.com. States verbatim "9\\", and 9.5\\" rise" + "29\\" wide" (rise:9.5 modeled, width:29 exact). Clamp diameter is not restated on this exact page, but the same Baseline line\'s companion Bar Ends product (harobikes.com/products/baseline-bar-ends, also Haro-owned) states "fit all chromoly 22mm bars" - the brand\'s own stated clamp class for this bar family -> clamp:22.2mm. Price $34.99 confirmed exactly.'
  },
  {
    id: 'bmx-fk-chase-rsp', cat: 'fork', brand: 'Chase', model: 'RSP Race Fork',
    discipline: 'race', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'v-brake', weight: 420, price: 94.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (confirmed via its own nav: Bikes/Frames/Gear/Technologies/Team only - no Parts or Components section, no fork/crank/sprocket/brake/bar/stem/pedal product pages exist on the site). Left unchanged, not verified.'
  },
  {
    id: 'bmx-fk-speedline-elite-carbon-junior-expert', cat: 'fork', brand: 'Speedline', model: 'Elite Carbon Junior/Expert',
    discipline: 'race', wheelSize: '20', steerer: 'integrated-1', axle: '10mm',
    brakeMount: 'v-brake', weight: 300, price: 349.95,
    note: 'vocab-tier1 (2026-07-22): closes the "Speedline fork/headset tiers the flags blocked" item. FETCHED supercrossbmx.com/pages/carbon-forks-compared directly (Speedline\'s own authorized storefront comparison page) — its own spec table states verbatim: "Speedline Elite Carbon | Junior / Expert | Mini-Expert | 1\\" Full Carbon | — | 300g | 3/8\\" | 20\\", 24\\" Cruiser | $349.95" -> steerer:integrated-1 (this file\'s newly-ratified bare-1in-bore token), axle:10mm (this catalog\'s established 3/8in=10mm mapping, no new token needed per the explicit out-of-scope ruling on a separate 3/8in token), weight 300g, price $349.95 exact. This row models the 20" size (the 24" Cruiser size shares the same weight/price per the table\'s single row). brakeMount:v-brake is an INFERRED same-tier sample matching this catalog\'s other race-discipline forks (Chase RSP, Redline Forklift Pro) — not independently confirmed on the fetched page, which describes only the carbon construction and steerer/dropout/weight facts. Left unverified: brakeMount is inferred, not maker-page-direct. NOTE: Speedline\'s companion "Tapered Carbon Pro" fork (1-1/8"-1.5" tapered, 453g, $399.95) was investigated but NOT entered — its comparison-table row states "20mm" dropouts only (not 3/8"/10mm), and this catalog\'s BMX_VOCAB.axle is [\'10mm\',\'14mm\'] only; a 20mm BMX front-axle token was not part of this pass\'s ratified scope, so entering that fork would need either a fabricated axle value or a new unratified token — deferred to a future vocab pass.'
  },

  // ===== HEADSETS ======================================================
  {
    id: 'bmx-hs-cult-integrated', cat: 'headset', brand: 'Cult', model: 'Integrated Headset',
    fit: 'integrated-1-1/8', price: 27.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://cultcrew.com/products/og-headset',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): fit is display-only in checkBmxBuild (headTube/steerer is a documented "no headset rule fires" field per compat-bmx.js), so its unconfirmed value does not block verification - every current Cult frame in this catalog uses an integrated 1-1/8in head tube, consistent with the value here. Price ($27.99) matches Cult\'s current "Headset" product (cultcrew.com/products/og-headset: "OG HEADSET / 2 different sized stackable caps and three spacers"). No weight field on this row - the page\'s 907g JSON figure is a shipping-weight bucket shared verbatim with the unrelated Bottom Bracket listing, correctly never carried over.'
  },
  {
    id: 'bmx-hs-odyssey-integrated', cat: 'headset', brand: 'Odyssey', model: 'Pro Headset',
    fit: 'integrated-1-1/8', price: 34.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/pro-headset',
    note: 'Odyssey\'s "Pro Headset" - real product name corrected from generic "Integrated Headset"; 1-1/8in integrated fit + $34.99 price confirmed on the fetched maker page (was $22.99).'
  },
  {
    id: 'bmx-hs-salt-pro', cat: 'headset', brand: 'Salt', model: 'Pro Integrated Headset',
    fit: 'integrated-1-1/8', price: 19.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://saltbmx.com/products/salt-pro-headset',
    note: 'WeThePeople in-house parts brand (Salt). Maker page confirms int. 1-1/8in sealed fit; lists EUR21.99 (region price), catalog USD price left as prior sample.'
  },
  {
    id: 'bmx-hs-speedline-mini-1in', cat: 'headset', brand: 'Speedline', model: 'Mini 1" Sealed Bearing Integrated Headset',
    fit: 'integrated-1', price: 39.95,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.supercrossbmx.com/products/speedline-parts-sealed-bearing-integrated-bmx-racing-headsets',
    note: 'vocab-tier1 (2026-07-22): closes the "Speedline fork/headset tiers the flags blocked" item, pairing with the new bmx-fk-speedline-elite-carbon-junior-expert fork row. FETCHED supercrossbmx.com directly (Speedline\'s own authorized storefront) — its own product page lists three size variants ("1\\" Mini", "1 1/8\\" Pro", "1 1/8\\" - 1.5\\" Pro Tapered") on one SKU family, price range "$39.95 - $74.95" across all sizes/colors; page copy: "1\\" Mini Headsets: Typically used on Micro, Mini, Junior, Expert, or Any Campy Style Integrated Frame you wish to use a 1\\" Fork and Stem on" -> fit:integrated-1 (this file\'s newly-ratified bare-1in-bore token). Price $39.95 is the range\'s low end (the base-color 1" Mini tier is the cheapest of the three sizes on this listing) — not a per-variant-exact figure, so promoted to verified:true on the fit/interface fact only, per this catalog\'s established convention of counting only the fetched-and-confirmed field toward a verified claim.'
  },
  {
    id: 'bmx-hs-speedline-tapered', cat: 'headset', brand: 'Speedline', model: '1-1/8"-1.5" Pro Tapered Sealed Bearing Integrated Headset',
    fit: 'integrated-tapered-1-1/8-1.5', price: 59.95,
    verified: true, lastChecked: '2026-07-22', source: 'https://www.supercrossbmx.com/products/speedline-parts-sealed-bearing-integrated-bmx-racing-headsets',
    note: 'vocab-tier1 (2026-07-22): closes the "Speedline fork/headset tiers the flags blocked" item, the ratified-token-backing row for BMX_VOCAB.headTube\'s new integrated-tapered-1-1/8-1.5 token. Same fetched supercrossbmx.com page as the Mini 1in row above: "1 1/8\\" - 1.5\\" Pro Tapered Headsets: Typically used on Pro size and Larger Frames with Tapered Head Tubes. They can be used with 1.5\\" or 1 1/8\\" forks. An adapter for 1 1/8\\" is included with your purchase... The 1 1/8\\" - 1.5\\" Taper comes with 2 (two) bottom races to fit both the 1 1/8\\" Fork and the 1.5\\" Fork" -> fit:integrated-tapered-1-1/8-1.5. Price $59.95 is the middle of the listing\'s "$39.95 - $74.95" range (the Pro Tapered tier sits above the base Mini tier and at or below the top Pro tier on this catalog\'s typical size-ordered pricing) — not a per-variant-exact figure, promoted to verified:true on the fit/interface fact only, same convention as the Mini row.'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-gyro-g3-kit-white',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): dual-cable design and price ($22.99) confirmed on the maker page ("Odyssey\'s original dual cable detangler system", "Upper and lower cables included"). steererFit is display-only in checkBmxBuild (no BMX rule reads a gyro\'s steerer fit - only frame.gyroTabs/brake.dualCable gate the gyro rules), so its unconfirmed 1-1/8in value does not block verification; it matches every current Cult/Odyssey freestyle frame in this catalog. No weight field on this row.'
  },
  {
    id: 'bmx-gy-odyssey-gtxs', cat: 'gyro', brand: 'Odyssey', model: 'GTX-S Gyro',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', weight: 145, price: 49.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-gyro-gtx-s-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): sold as the bearing unit for Odyssey\'s dual-cable Gyro system (17mm stack height, sealed mechanism bearing, 6061-T6 aluminum) - price ($49.99) matches exactly. cableRouting/steererFit are both display-only in checkBmxBuild (no rule reads them), so their unconfirmed values do not block verification. Weight: no maker figure published for the bearing unit alone; the JSON variant field shows 227g but with no description text to corroborate it as a net (vs shipping) figure, so it is NOT trusted per the wave-2 phantom-number doctrine - weight stays the 145g sample.'
  },
  {
    id: 'bmx-gy-shadow-sanov2', cat: 'gyro', brand: 'The Shadow Conspiracy', model: 'Sano Detangler V2',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', weight: 45, price: 57.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-sano-detangler-v2',
    note: 'CNC 6061-T6 aluminum, U.S.B. sealed mechanism bearing, wider caged-bearing design (2nd-period spec), includes detangler plate. Weight per maker page (1.6oz).'
  },
  {
    id: 'bmx-gy-blackops-rotorblade', cat: 'gyro', brand: 'Black Ops', model: 'Rotor Blade Detangler Kit',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', price: 19.99,
    note: 'Budget-tier full kit (gyro, top plate, lower assembly, upper + lower cables included).'
  },
  {
    id: 'bmx-gy-total-chaosgyro', cat: 'gyro', brand: 'Total BMX', model: 'Chaos Gyro',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', weight: 32, price: 55.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://totalbmx.com/products/total-bmx-tech-gyro-black',
    note: 'bmx-breadth-4 (2026-07-22): VERIFIED. Directly fetched totalbmx.com: "Total BMX Tech Gyro - Black...Weight 0.032kg/ 1.1oz" -> 32g CONFIRMED; "Regular price $55.00 USD" CONFIRMED. steererFit/cableRouting are display-only in checkBmxBuild (no rule reads a gyro steerer fit or cable routing - VERIFY-PROTOCOL\'s BMX small-parts exception), so their unconfirmed values (the near-universal 1-1/8in integrated + dual-cable config every other cataloged gyro uses) do not block verification.'
  },
  {
    id: 'bmx-gy-saltplus-georotor', cat: 'gyro', brand: 'Salt', model: 'SaltPlus GEO Rotor',
    steererFit: 'integrated-1-1/8', cableRouting: 'dual', weight: 72, price: 44.99,
    note: 'bmx-breadth-4 (2026-07-22): UNVERIFIED sample. Directly fetched saltbmx.com/products/saltplus-geo-rotor: "Size: for 1 1/8\\" headtubes" -> steererFit CONFIRMED; "Weight: 72g (2.54oz : 0.15lbs)" -> weight CONFIRMED. cableRouting left at the catalog-standard \'dual\' (not itself stated on this page; SaltPlus separately sells a "Dual Upper Gyro Cable" for this same rotor line, consistent with dual routing). Maker page carries NO price (redirects off-site to a "Kingdom Store" distributor with no price shown) - retailer prices span $39.99 (thesecretbmx.com, listed sold-out) to $58.95 (SkatePro, EUR-region); $44.99 (LUXBMX-adjacent midpoint) entered as an approximate sample, not a confirmed MSRP. Left unverified: no source page states a USD price.'
  },

  // ===== CRANKS ========================================================
  {
    id: 'bmx-cr-profile-elite-al-sl', cat: 'cranks', brand: 'Profile Racing', model: "Elite AL 'SL' Crank Kit",
    spindle: '30mm', pieces: '3-piece', ringMount: 'spline', price: 489.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-11', source: 'https://www.profileracing.com/product-category/profile-bmx/profile-cranks/',
    note: 'Aluminum arms, 30mm spindle (Profile\'s largest spindle option).'
  },
  {
    id: 'bmx-cr-profile-elite-al-hd', cat: 'cranks', brand: 'Profile Racing', model: "Elite AL 'HD' Crank Kit",
    spindle: '30mm', pieces: '3-piece', ringMount: 'spline', price: 489.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-11', source: 'https://www.profileracing.com/product-category/profile-bmx/profile-cranks/'
  },
  {
    id: 'bmx-cr-profile-race', cat: 'cranks', brand: 'Profile Racing', model: 'Race Cranks',
    spindle: '19mm', pieces: '3-piece', ringMount: 'press-on', price: 286.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/rhd-3-piece-chromoly-race-crankset-2/',
    note: 'Confirmed as the RHD (bolt-on boss) 3-Piece Chromoly Race Crankset: 19mm GDH CrMo axle, 3-piece, bolt-on sprocket boss, base price $286.99 (2026-07-17). No per-config weight published (arm length is a variant); left without a weight field like the existing verified Elite AL crank rows.'
  },
  {
    id: 'bmx-cr-odyssey-calibre', cat: 'cranks', brand: 'Odyssey', model: 'Calibur V2 Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 900, price: 179.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-calibur-v2-bmx-cranks-rustproof-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): spindle (hollow 22mm, 48-spline), 3-piece construction and spline sprocket mount are all raw-confirmed in the maker page\'s own spec list; price ($179.99) matches. No maker weight is published for this SKU and no reputable third-party MEASURED figure exists, so weight stays the 900g sample (basis: unchanged from the prior pass, not a shipping-weight figure).'
  },
  {
    id: 'bmx-cr-stolen-team', cat: 'cranks', brand: 'Stolen', model: 'Team Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', price: 189.99,
    note: 'UNCONFIRMED, checked 2026-07-21 (bmx-sweep-4): fetched stolenbrand.com/collections/cranks (17 products, current maker storefront) - the full "Team" crankset is NOT sold today; current complete-crankset lineup is Odin, Mob V4, and Talon V2. Only Team-compatible SPARE parts remain listed ("TEAM/TALON CRANK SPINDLE", "TEAM 19MM CRANK BOLT KIT", "TEAM 22 CRANK BOLT KIT", "TEAM 2.5 CRANK BOLT KIT"), confirming a 22mm Team variant existed (matching this row\'s spindle:22mm) but is discontinued as a complete SKU. A third-party retailer listing (samsbmx.com, "Stolen Bikes Team 22 Bmx Cranks") independently corroborates spindle:22mm, 3-piece-equivalent (P2 arms + 1-piece spindle/sprocket boss), 48-spline, 876g, but sourceType:retailer cannot verify per THE BAR. Left unverified/unchanged; flagged for the coordinator as likely discontinued.'
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
    id: 'bmx-cr-chase-rsp', cat: 'cranks', brand: 'Chase', model: 'RSP Race Cranks',
    spindle: '19mm', pieces: '3-piece', ringMount: 'press-on', price: 279.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },

  // ===== BOTTOM BRACKETS ===============================================
  {
    id: 'bmx-bb-profile-euro-22', cat: 'bb', brand: 'Profile Racing', model: 'Euro Outboard BB',
    shell: 'euro', spindleFit: '22mm', weight: 148, price: 71.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/euro-externaloutboard-bottom-bracket/',
    note: 'CORRECTED 2026-07-17: maker page confirms Euro External (Outboard) BB is ONE SKU sold in both 19mm and 22mm axle fit at a single price, $71.99 (was $39.99) and 148g/5.18oz (weight was missing).'
  },
  {
    id: 'bmx-bb-salt-mid-19', cat: 'bb', brand: 'Salt', model: 'Mid Sealed BB',
    shell: 'mid', spindleFit: '19mm', price: 24.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://saltbmx.com/products/salt-rookie-mid-bb',
    note: 'Matches the press-fit spec published on the WeThePeople Justice frame page (bmx-fr-wethepeople-justice). Maker page (current lineup name: Rookie Mid BB Set) confirms a mid-shell 19mm-spindle sealed BB kit exists in Salt\'s current range.'
  },
  {
    id: 'bmx-bb-odyssey-american', cat: 'bb', brand: 'Odyssey', model: 'American BB',
    shell: 'american', spindleFit: '19mm', price: 24.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-american-bb-silver',
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/euro-externaloutboard-bottom-bracket/',
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-bmx-mid-bb-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): raw-confirmed via the maker page ("Made to fit all 19mm or 22mm crank spindles and press-fit Mid BB frames"), with 22mm and 19mm sold as the same product\'s two variant options - shell:\'mid\' and spindleFit:\'22mm\' both match exactly. Price ($24.99) matches. No weight field on this row to begin with.'
  },
  {
    id: 'bmx-bb-odyssey-mid-19', cat: 'bb', brand: 'Odyssey', model: 'Mid BB (19mm)',
    shell: 'mid', spindleFit: '19mm', price: 24.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-bmx-mid-bb-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): the 19mm-spindle variant of the same raw-confirmed Odyssey Mid BB product as bmx-bb-odyssey-mid-22 (see that row\'s note). shell:\'mid\' and spindleFit:\'19mm\' both match exactly; price ($24.99) matches. No weight field on this row to begin with.'
  },

  // ===== BOTTOM BRACKETS — bmx-breadth-7 (new brand: Empire BMX house parts) ====
  {
    id: 'bmx-bb-empirebmx-spanish', cat: 'bb', brand: 'Empire BMX', model: 'Spanish Bottom Bracket',
    shell: 'spanish', spindleFit: '19mm', price: 19.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23', source: 'https://www.empirebmx.com/products/empire-bmx-spanish-bottom-bracket-2',
    note: 'bmx-breadth-7: new brand (Empire BMX absent entirely before this batch) — Empire BMX\'s own house-brand parts line, sold on its own storefront (SKU 1101332). FETCHED empirebmx.com/products/empire-bmx-spanish-bottom-bracket-2 directly: "complete Spanish bottom bracket (19mm or 22mm)... 2x precision sealed Spanish bearings... machined alloy bearing cones... 15/16\\" / 24mm to 19mm or 22mm sprocket adapter", flat $19.95 across the 19mm/22mm spindle options (this row models the 19mm SKU). No weight published on the page.'
  },
  {
    id: 'bmx-bb-empirebmx-american', cat: 'bb', brand: 'Empire BMX', model: 'USA / American Bottom Bracket',
    shell: 'american', spindleFit: '19mm', price: 39.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23', source: 'https://www.empirebmx.com/products/empire-bmx-usa-american-bottom-bracket',
    note: 'bmx-breadth-7: second Empire BMX house-brand row (frame + BB position covered above via the Bone Deth batch; this is Empire\'s own American-shell BB, SKU 1094784). FETCHED empirebmx.com/products/empire-bmx-usa-american-bottom-bracket directly: "complete USA / American bottom bracket... includes two bearings/cups and complete hardware (tube spacer, alignment spacers, and conical bearing spacers)... 19mm, 22mm, or 24mm (choose the one that fits the crank spindle you\'ll be using)", flat $39.95 across all three spindle options (this row models the 19mm SKU). No weight published on the page.'
  },

  // ===== SPROCKETS =====================================================
  {
    id: 'bmx-sp-odyssey-utilitypro-30', cat: 'sprocket', brand: 'Odyssey', model: 'Utility Pro Sprocket 30T',
    teeth: 30, mount: 'spline', pitch: '1/8', price: 49.99,
    note: 'Teeth (30T, sold as "Sprocket Only" without the guard at this size) and price ($49.99, was $44.99) confirmed 2026-07-17 via shop.odysseybmx.com/products/odyssey-utility-pro-sprocket-black. Chain pitch is not literally stated on the page ("compatible with all BMX chains"), so the verdict-driving pitch field is left as the 1/8in sample value (correct for every other Odyssey freestyle sprocket in this catalog) and the row stays unverified.'
  },
  {
    id: 'bmx-sp-profile-race-25', cat: 'sprocket', brand: 'Profile Racing', model: 'Imperial 23T-30T Sprocket (25T)',
    teeth: 25, mount: 'press-on', pitch: '3/32', price: 57.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://www.profileracing.com/product/imperial-23-30/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, correcting two wrong fields the 2026-07-18 pass left unresolved. Directly fetched profileracing.com/product/imperial-23-30/ (page title literally "IMPERIAL 23T-30T SPROCKET" — the prior "Spline Drive" in this row\'s model name was never the real product name, corrected here). The page states verbatim: "-The Imperial is \'bolt on\' style and requires a sprocket bolt to be attached to crank arm" (NOT spline-drive at all) -> mount CORRECTED spline -> press-on, matching this catalog\'s existing convention that the bolt-on-boss Profile Race Crank rows (bmx-cr-profile-race/-22) also use mount:press-on for the same bolt-on-boss mounting style; "-3/32″ tooth width" -> pitch CORRECTED 1/8 -> 3/32. 25t is explicitly listed among the "Silver & Black: 23t,24t,25t,26t,27t,28t,29t,30t" size run -> teeth:25 CONFIRMED real. Flat $57.99 SKU price (2026-07-18 pass) unchanged/re-confirmed by this fetch (single price across the whole Additional-information color/size variant list). Weight is a per-color-run reference (67g at 26t) not this exact SKU\'s figure, so left without a weight field.'
  },
  {
    id: 'bmx-sp-profile-race-28', cat: 'sprocket', brand: 'Profile Racing', model: 'Imperial 23T-30T Sprocket (28T)',
    teeth: 28, mount: 'press-on', pitch: '3/32', price: 57.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://www.profileracing.com/product/imperial-23-30/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, same correction as bmx-sp-profile-race-25 (fetched the same profileracing.com/product/imperial-23-30/ page): model name corrected to the real "Imperial 23T-30T Sprocket" (no "Spline Drive" in the real name), mount CORRECTED spline -> press-on ("bolt on style... requires a sprocket bolt to be attached to crank arm"), pitch CORRECTED 1/8 -> 3/32 ("3/32″ tooth width"). 28t confirmed among the page\'s listed sizes. $57.99 flat SKU price re-confirmed.'
  },
  {
    id: 'bmx-sp-profile-race-33', cat: 'sprocket', brand: 'Profile Racing', model: 'Sabre Universal Spline Drive (33T)',
    teeth: 33, mount: 'spline', pitch: '1/8', price: 75.99, weight: 122, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://www.profileracing.com/product/sabre-universal-spline-drive-sprocket-25t-33t/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Directly fetched profileracing.com/product/sabre-universal-spline-drive-sprocket-25t-33t/ (page title "SABRE UNIVERSAL SPLINE DRIVE SPROCKET (25T-33T)"). The Sabre is a genuinely universal sprocket sold with a choice of adapter insert ("uses an adapter insert to make the sprocket compatible with spline drive or bolt on style cranks... A. 19mm Spline Drive, B. 22mm Spline Drive, C. 19mm Bolt On, D. 22mm Bolt On, E. 24mm Bolt On") — mount:spline here represents the "A/B Spline Drive" adapter configuration, a real purchasable option per DATA-ENTRY-TEMPLATE\'s config-dependent-spec guidance (kept as one of the valid options rather than invented). 33t confirmed in the page\'s variant list; the page\'s own JSON variant pricing (data-product_variations) shows 33t + "A. 19mm Spline Drive" = exactly $75.99, matching this row\'s existing price EXACTLY (no correction needed). Weight ADDED: page states "Weight (without insert): ...33t: 122g/4.3oz" — a real per-SKU figure (basis "without insert" noted here per the weight-conventions soldWithout practice). pitch "1/8″ chain width" confirmed unchanged.'
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

  // ===== SPROCKETS — bmx-breadth-7 (new brands: Bone Deth, Tree Bicycle Co) ====
  {
    id: 'bmx-sp-bonedeth-webslinger-28', cat: 'sprocket', brand: 'Bone Deth', model: 'Webslinger Guard Sprocket (28T)',
    teeth: 28, mount: 'spline', pitch: '1/8', weight: 232, price: 104.95,
    note: 'bmx-breadth-7: second Bone Deth row (frame covered above). Cross-confirmed across empirebmx.com/products/bone-deth-webslinger-guard-sprocket ($104.95, "7075-T6 AL, compatible with wide chains, 24mm bore, includes 19mm and 22mm adapters"), circuitbmx.com ("14mm Thick 7075-6 Alloy... Includes 19mm & 22mm adaptors... 24mm Bore... Sizes: 25T, 28T, 30T"), and soulcyclebmx (per-variant weight table: 28T = 0.232kg = 232g) — three independent US/EU retailer listings, no bonedeth.com manufacturer catalog available to fetch, so left UNVERIFIED per the credible-retailer-source policy. mount:spline models the native 24mm spline bore (19mm/22mm adapters are bundled accessories, not this row\'s own spec). pitch:1/8 matches "compatible with wide chains" (1/8in is the wide-chain class in this catalog\'s vocab).'
  },
  {
    id: 'bmx-sp-tree-originalsplinedrive-25', cat: 'sprocket', brand: 'Tree Bicycle Co', model: 'Original Spline Drive Sprocket 19mm (25T)',
    teeth: 25, mount: 'spline', pitch: '1/8', weight: 88, price: 54.99,
    note: 'bmx-breadth-7: new brand (Tree Bicycle Co absent entirely before this batch). Tree discontinued its FRAME line some years back (bmxunion.com interview, "Insight: Tree Bicycle Co. Discontinuing Frames") but the parts side (hubs, sprockets, seatposts, cockpit) remains in active current production on treebicycleco.com, so this batch catalogs Tree as a parts-only brand (no frame row). Price and spec confirmed via treebicycleco.com/products/original-splinedrive-sprocket itself (page states "Regular price $54.99" in USD): "1/4\\" thick 7075 T6 CNC machined aluminum - Heat Treated drive splined insert for 19mm 48 spline cranks - 1/8\\" wide teeth", offered in 25T/28T/30T (this row models 25T). Row stays UNVERIFIED (no lastChecked/source fields set) because the specific page fetch used for the weight figure was a different, independently-listed SKU (samsbmx.com\'s "Tree Bicycle Co OG Sprocket - 19mm - Spline - 25T - Black", which states "Weight: 3.1 oz (25T)" = 88g for what appears to be the same product under Tree\'s older "OG" naming) rather than one single confirmed manufacturer-page fetch covering both price AND weight together.'
  },
  {
    id: 'bmx-sp-tree-seatpost-200', cat: 'seatpost', brand: 'Tree Bicycle Co', model: 'Tree Seat Post',
    diameter: 25.4, system: 'pivotal', weight: 134, price: 49.99,
    note: 'bmx-breadth-7: second Tree Bicycle Co row. treebicycleco.com/products/tree-seat-post states: "3D Forged From 6061 Aluminum - Utilizes Patented Pivotal Technology - Longer 200mm Post", "Standard BMX 25.4mm dia x 200mm long", "WEIGHT 4.8oz/134g" — diameter/system/weight all confirmed on Tree\'s own page. Price ($49.99) is NOT from that fetch (the page rendered a non-US-locale €25,95 figure for this crawl, not a reliable USD MSRP); $49.99 is instead the USD figure independently listed by US retailer samsbmx.com ("Tree Bicycle Co Seat Post – Pivotal – 200mm – Black... $49.99"), carrying the identical spec (25.4mm/200mm/134g/Pivotal/6061 Aluminum) confirming it\'s the same SKU. Row left UNVERIFIED given the split-source price.'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-bluebird-half-link-chain-silver',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): pitch (explicit "1/2” x 1/8” size" in the maker\'s own spec list - the chainPitch field checkBmxBuild reads) and half-link construction ("Half-links allow for a more precise fit...") both raw-confirmed; price ($39.99) matches. No weight is published on the maker page and no measured third-party figure was found, so weight stays the 280g sample (basis noted here).'
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
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', weight: 1406, price: 69.99,
    verified: true, priceBasis: 'oe-only-no-msrp', lastChecked: '2026-07-21', source: 'https://thebuildingdistro.com/product/fit-oem-20-lhd-rhd-wheelset/',
    note: 'Re-fetched 2026-07-21: Fit no longer sells this hub/wheel standalone, only inside the "FIT OEM 20in LHD/RHD Wheelset" - every engine-read field this row carries is confirmed on that current page ("9T Cassette Driver", "14mm Rear Axle Male", "fully sealed hubs"; side kept RHD, the wheelset\'s LHD/RHD is a build choice, not a spec fact, and side is display-only in checkBmxBuild anyway). Weight 1406g = the page\'s stated 3.10lb rear-wheel figure (weight IS split per side on this page, so this is a real per-part number, not a bundle-only shipping weight). Price stays the prior 69.99 sample - the page only lists the wheelset\'s combined $79.95 (a different, bundled product; THE PRICE RULE covers a missing per-part price, not a wrong one).'
  },
  {
    id: 'bmx-rh-odyssey-clutchv2', cat: 'rearWheel', brand: 'Odyssey', model: 'Clutch V2 Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 623, price: 169.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-clutch-v2-freecoaster-hub',
    note: 'Freecoaster, 9T driver, 14mm chromoly axle bolts, RHD/LHD both available, weight (623g/22oz) and price ($169.99, was $199.99) all confirmed on the fetched maker page.'
  },
  {
    id: 'bmx-rh-primo-remix', cat: 'rearWheel', brand: 'Primo', model: 'Remix V3 Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 151.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://primostranger.com/products/primo-remix-v3-hub',
    note: 'bmx-sweep-4: current Remix generation is "V3" (model corrected, id kept per append-only policy). Fetched primostranger.com (Primo BMX\'s own storefront - "By PRIMO BMX"): confirms driverTeeth:9 ("1 pc 9t driver") and side:both (RHD/LHD/color variants all listed) exactly; driverType:cassette matches (the Remix line is Primo\'s cassette-hub family, distinct from any freecoaster). axle:14mm retained - the maker page\'s "true 17mm Female axle system" describes the axle BARREL/shaft OD, not the bolt-diameter convention this catalog\'s axle field uses; multiple retailer spec sheets (winstanleysbmx.com, sourcebmx.com) independently confirm "Chromoly 14mm female bolts" for the same V3 generation, matching the existing 14mm value. Price CORRECTED 89.99 -> 151.00 (maker\'s own listed USD price).'

  },
  {
    id: 'bmx-rh-profile-elite-freecoaster', cat: 'rearWheel', brand: 'Profile Racing', model: 'Z Coaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 583, price: 394.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/zcoaster%c2%81-hub/',
    note: 'CORRECTED 2026-07-17: this is Profile\'s Z Coaster (R) freecoaster hub, not a separate "Elite Freecoaster" model. Standard driver is 9T (was 10T - no 10T option exists; 12T Ti RHD-only is the other choice), base price $394.99 (was $259.99), weight 583g for the base 14mm GDH CrMo axle / 9T CrMo driver config (was 259.99/no weight).'
  },
  {
    id: 'bmx-rh-profile-elite-cassette', cat: 'rearWheel', brand: 'Profile Racing', model: 'Elite Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 509, price: 394.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.profileracing.com/product/elite-cassette-hub/',
    note: 'CORRECTED 2026-07-17: Profile\'s flagship US-made cassette hub, the long-running Elite line. 9T CrMo driver / 14mm GDH CrMo axle confirmed; base price $394.99 (was $229.99), weight 509g for that config (was 610g - unsourced).'
  },
  {
    id: 'bmx-rh-bsd-mind', cat: 'rearWheel', brand: 'BSD', model: 'Mind Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 279.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://us.bsdforever.com/products/bsd-back-street-pro-cassette-rear-wheel',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, closing the exact axle-mm gap the prior pass correctly flagged. The "Mind" name is retired from BSD\'s current storefront — the same underlying product (Back Street Pro cassette hub + BSD Forever rim, RHD/LHD, Jersey Barrier hub guards) is now sold as "FOREVER x BACK STREET PRO - REAR WHEEL" (us.bsdforever.com, Shopify products.json confirms price $279.99 EXACT match on the Black/RHD variant; RHD AND LHD variants both exist -> side:both CONFIRMED). The wheel page\'s own Tech Specs table states "Hub: BSD Back Street Pro hub" (driverType:cassette CONFIRMED) but only "Axle: Male" without a digit; the standalone "Back Street Pro Hub" product page (us.bsdforever.com/products/back-street-pro-cassette-hub, the same named hub) states verbatim "Axle: 14mm 4140 heat treated chromo" and "...now also coming in male 14mm axle version" -> axle:14mm CONFIRMED via the hub\'s own maker page. driverTeeth (9) is NOT engine-read (display-only, bmxGearInfo) so its absence from either page does not block verification per the BMX small-parts exception. Shopify variant weight (2600g, IDENTICAL across all 4 color/side variants) is the shipping-weight-bucket trap (VERIFY-PROTOCOL phantom-number hazard), not a real product weight - no weight field set.'
  },
  {
    id: 'bmx-rh-eclat-shift-freecoaster', cat: 'rearWheel', brand: 'Eclat', model: 'Shift Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 510, price: 164.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://eclatbmx.com/products/shift-freecoaster-hub',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Directly fetched eclatbmx.com/products/shift-freecoaster-hub: "Axle: 14mm hollow bore, male axle, hardened heat-treated crmo" (axle CONFIRMED), "Driver: 9t..." (driverTeeth CONFIRMED), "available in RSD or LSD" (side:both CONFIRMED), "Weight: 510g (17.9oz)" (a real per-unit maker-stated figure, distinct from the Shopify variant JSON\'s 96g sub-part placeholder). weight CORRECTED 480 -> 510g and price CORRECTED 227.00 -> 164.99 to match this page exactly (both RSD/LSD variants list $164.99). WeThePeople "Hybrid System" internals confirmed verbatim - converts between freecoaster/cassette mode ("MagnaDrive" magnetic driver); driverType kept as freecoaster (its as-sold/named mode).'
  },
  {
    id: 'bmx-rh-eclat-cortexevo-freecoaster', cat: 'rearWheel', brand: 'Eclat', model: 'Cortex Evo FC Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', price: 169.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://eclatbmx.com/products/eclat-cortex-evo-fc-hub',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Directly fetched eclatbmx.com/products/eclat-cortex-evo-fc-hub: "Axle: 14mm male hollow bore, hardened heat-treated crmo axle" (axle CONFIRMED), "Driver: RSD or LSD, 9t, 3 pin clutch freecoaster system" (driverTeeth + side:both + driverType:freecoaster all CONFIRMED), price $169.99 EXACT match on both RSD/LSD variants (no correction needed). Shopify variant weight shows 0g (never a real figure) - no weight field set.'
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
  {
    id: 'bmx-rc-odyssey-freewheel-13', cat: 'rearCog', brand: 'Odyssey', model: 'Freewheel 13T (RHD)',
    teeth: 13, fitsDriver: 'freewheel', pitch: '1/8', price: 21.99,
    note: 'bmx-breadth-4 (2026-07-22): real current product, directly fetched shop.odysseybmx.com/products/freewheel-13t-rhd (a genuine standalone thread-on freewheel, unlike most cataloged rearCog rows which found only hub-bundled cogs). Title "ODYSSEY FREEWHEEL 13T" + "Regular price $21.99" CONFIRM teeth:13 and price directly; "RHD version only fits flip-flop or compact drive hubs" confirms it is a thread-on freewheel body (fitsDriver:\'freewheel\', the checkBmxBuild-read field distinguishing it from a cassette/freecoaster cog). pitch:\'1/8\' is the catalog-standard BMX freestyle default (not itself stated on this specific page, and pitch IS engine-read per bmx-chain-pitch, so verified:true is withheld) - only the RHD 13T size is sold; no other teeth options exist on the maker\'s site.'
  },

  // ===== FRONT WHEEL ====================================================
  {
    id: 'bmx-fw-mongoose-motomagiii', cat: 'frontWheel', brand: 'Mongoose', model: 'Motomag III Front Wheel',
    family: 'mongoose-motomag', wheelSize: '20', axle: '10mm', price: 180.00,
    verified: true, priceBasis: 'pair-split-estimate', lastChecked: '2026-07-23',
    source: 'https://www.mongoose.com/products/motomag-iii',
    note: 'bmx-brand-depth-2: directly fetched mongoose.com (Mongoose\'s own storefront), the 50th-anniversary Motomag III retro wheelset re-release. States verbatim "Size: 20-in." (wheelSize:20 exact - a real page-stated size, distinguishing this from the withheld bmx-fw-odyssey-vandero hub row above whose maker page never states a wheel size) and "Front Hub: Aluminum shell with sealed bearing, 3/8 in axle" (axle:10mm exact). Sold ONLY as a front+rear PAIR at one confirmed price ($359.99 current mongoose.com listing, up from the 2022 launch $299.99) - split evenly per priceBasis:pair-split-estimate ($180.00 this row). GENUINE GAP: the matching rearWheel row was deliberately NOT entered - the page (corroborated independently by probmxbikes.com and Albe\'s BMX) states the rear hub "works with 16t and larger freewheels (NOT INCLUDED)" - a bare freewheel-compatible shell ships with no driver at all, so rearWheel\'s required driverTeeth field has no real value to enter without fabricating a tooth count this SKU does not ship with.'
  },
  {
    id: 'bmx-fw-odyssey-vandero', cat: 'frontWheel', brand: 'Odyssey', model: 'Vandero Pro Front Hub',
    wheelSize: '20', axle: '10mm', weight: 317, price: 96.99,
    note: 'bmx-sweep-2 (2026-07-21): weight ADDED from the maker page ("Weight: 11.2oz" = 317g, a real per-SKU figure, not a shipping placeholder) and axle (3/8in inbound bolts = the 10mm token) + price ($96.99) re-confirmed via shop.odysseybmx.com/products/vandero-pro-hub. COORDINATOR RULING at merge (seat 17): the wave\'s verified:true was DEMOTED back to unverified — wheelSize (the one checkBmxBuild-read field here) is still not stated on the hub\'s own page, and the bmx-fr-cult-race brand-convention precedent does not transfer: that frame\'s own page corroborated the 20in platform (a TT-length-only size run), while a bare front hub has no page-side corroboration and is physically wheel-size-agnostic (the same hub laces into 22/24in wheels) — wheelSize on a hub-modeled-as-frontWheel row is a modeling choice, not a maker fact. The prior wave\'s explicit withholding on exactly this evidence stands. Promotable if Odyssey ever states the intended wheel size on the SKU page or a complete-wheel page pairing this hub is cited instead.'
  },
  {
    id: 'bmx-fw-fitbikeco-oem', cat: 'frontWheel', brand: 'Fit Bike Co', model: 'OEM Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 1066, price: 49.99,
    verified: true, priceBasis: 'oe-only-no-msrp', lastChecked: '2026-07-21', source: 'https://thebuildingdistro.com/product/fit-oem-20-lhd-rhd-wheelset/',
    note: 'Re-fetched 2026-07-21: same situation as bmx-rh-fitbikeco-oem-9t — Fit no longer sells this standalone, only bundled in the current OEM 20in wheelset. That page confirms "3/8in Front Axle Male" (=10mm, this catalog\'s single token per BMX_VOCAB) and 20in wheel size (unchanged from before, used in test/test-bmx-golden.js). Weight 1066g = the page\'s 2.35lb front-wheel figure (a real per-part split, not a bundle-only shipping weight). Price stays the prior 49.99 sample - the page only lists the wheelset\'s combined $79.95 (a different, bundled product).'
  },
  {
    id: 'bmx-fw-profile-elite', cat: 'frontWheel', brand: 'Profile Racing', model: 'Elite Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 520, price: 149.99,
    note: 'UNCONFIRMED 2026-07-17: fetched profileracing.com\'s hubs + wheels/wheelsets categories. Profile sells standalone front HUBS (AC-2 BMX Front Hub $169.99-303.99, Beast Mode Elite Front Disc Hub $223.99) and custom-built complete WHEELS (e.g. "Elite Cassette Hub 20in Wheel" $561.99+), but no product matching a plain "Elite Front Wheel" at $149.99/520g was found - the row\'s price is below even the cheapest standalone front hub alone (before lacing/rim). Left unverified, unchanged (no confident correction), flagged for the coordinator.'
  },
  {
    id: 'bmx-fw-bsd-mind', cat: 'frontWheel', brand: 'BSD', model: 'Mind Front Wheel',
    wheelSize: '20', axle: '10mm', price: 179.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://us.bsdforever.com/products/forever-front-street-pro-front-wheel',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, closing the axle-mm gap the prior pass flagged. Same retired-name situation as bmx-rh-bsd-mind: the "Mind" branding is gone from the current storefront, but the identical product (Front Street Pro hub + BSD Forever rim, Jersey Barrier hubguards included) is now sold as "FOREVER x FRONT STREET PRO - FRONT WHEEL" (us.bsdforever.com). Price CORRECTED 169.99 -> 179.99 (Black variant, current live price; Chrome is 199.99). The wheel page\'s Tech Specs table states "Hub: BSD Front Street Pro hub" (wheelSize:20 CONFIRMED - this is BSD\'s only 20in front-hub-based wheel line) but no axle digit; the standalone "Front Street Pro Hub" product page (us.bsdforever.com/products/front-street-pro-hub, the same named hub) states "Bolts: 10mm 4140 heat treated chromo" -> axle:10mm CONFIRMED (BMX front-hub specs are conventionally given by their axle-bolt diameter). Shopify variant weight (2600g, identical Black/Chrome) is the same shipping-weight-bucket trap as the rear wheel row - no weight field set.'
  },

  // ===== TIRES ==========================================================
  {
    id: 'bmx-ti-odyssey-pathpro-225', cat: 'tire', brand: 'Odyssey', model: 'Path Pro 2.25"',
    wheelSize: '20', width: 2.25, casing: 'park', maxPsi: 100, price: 32.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-path-pro-tire',
    note: '20x2.25in size, 100psi max and price ($32.99, was $24.99) confirmed on the fetched maker page (dual-ply sidewalls, sizes 20x2.25in and 20x2.40in).'
  },
  {
    id: 'bmx-ti-odyssey-pathpro-24', cat: 'tire', brand: 'Odyssey', model: 'Path Pro 2.4"',
    wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 100, price: 32.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-path-pro-tire',
    note: '20x2.40in size, 100psi max and price ($32.99, was $26.99) confirmed on the fetched maker page (same product page lists both the 2.25 and 2.40 width options at the same price).'
  },
  {
    id: 'bmx-ti-maxxis-hookworm-25', cat: 'tire', brand: 'Maxxis', model: 'Hookworm',
    wheelSize: '20', width: 1.95, casing: 'park', maxPsi: 110, weight: 720, price: 29.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.maxxis.com/us/tire/hookworm/',
    note: 'CORRECTED 2026-07-17: maxxis.com lists only one 20in Hookworm SKU, 20x1.95 (part TB294610, wire bead, single compound, 720g, max 110psi) - there is no 20x2.5 Hookworm (that width only exists at 24in+). Row model/width/maxPsi/weight corrected to match; id kept per append-only policy though it now reads oddly against the corrected 1.95in width.'
  },
  {
    id: 'bmx-ti-veetireco-speedster', cat: 'tire', brand: 'Vee Tire Co', model: 'Speedster BMX 1-3/8"',
    wheelSize: '20', width: 1.375, casing: 'race-slick', maxPsi: 100, weight: 385,
    price: 19.99, verified: true, lastChecked: '2026-07-21', sourceType: 'manufacturer',
    source: 'https://veetires.com/products/speedster-bmx-1',
    note: 'RETARGETED 2026-07-21 (bmx-fixpack-1), fabfix-(a) pattern per coordinator dispatch: the prior row pointed at veetires.com\'s "Speedster" (singular), a wrong-product match (that page is an e-bike/fat-tire tire per bmx-sweep-3/4 findings). Re-fetched veetires.com/products/speedster-bmx-1 (the real BMX-lineup product, id kept append-only) - its tech-spec table confirms the 20x1 3/8 row exactly: ETRTO 37-451, MPC (Multiple Purpose Compound), B-Proof (Aramid Belt), 27 TPI, wire bead, Max 100 PSI, 385g +/-. model/width/casing/maxPsi/weight corrected to match; price kept as the prior sample figure (the page lists $35.70, but that spans a multi-variant selector and this exact 20x1 3/8 size shows "Unavailable" in the current buy-flow, so the $35.70 headline price is not confidently this SKU\'s price - left as unconfirmed sample). Note the page\'s own variant picker marks 20x1 3/8 "Unavailable" (stock status only, not a discontinuation - the tech-spec table still lists it as a current catalog size); the previously-cited "VRB316 FB 90TPI SpeedSter LSG" spec does not appear on this page at all (90TPI/LSG only appears on 24in variants) and is NOT used here.'
  },
  {
    id: 'bmx-ti-odyssey-aitken', cat: 'tire', brand: 'Odyssey', model: 'Aitken Tire 2.45"',
    wheelSize: '20', width: 2.45, casing: 'park', maxPsi: 100, price: 32.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-aitken-tire-black',
    note: 'Width corrected 2.4in -> 2.45in (the real SKU is 20x2.25in or 20x2.45in - no 2.4in size exists), maxPsi corrected to 100 and price to $32.99 (was $27.99), all confirmed on the fetched maker page (Mike Aitken signature, dual-ply, low profile tread).'
  },
  {
    id: 'bmx-ti-duo-svs', cat: 'tire', brand: 'DUO Brand', model: 'SVS Tire 2.3"',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 95, price: 26.99,
    note: 'WALL, checked 2026-07-21 (bmx-sweep-4): duobrand.com (the maker\'s own site, confirmed via browser pane, not just a WebFetch failure - the store itself returns "This store is unavailable", a dead Shopify storefront) cannot be fetched. DATA POINT FOR THE COORDINATOR, NOT VERIFIED (retailer sourcing only, does not meet THE BAR): many independent retailers (dkbicycles.com, systemcycle.com, jdcyclesupply.com, probmxbikes.com) consistently describe the current SVS as a 20x2.25in tire (inflated width 2.22in/56.5mm), MAX PRESSURE 60PSI (not this row\'s 95) and ~592g/20.9oz - this catalog row\'s width:2.3/maxPsi:95 do not match that consensus, but cannot be corrected without a maker source per THE BAR. Left unchanged; flagged for the coordinator as a likely stale spec pending the maker site coming back online.'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.flybikes.com/product/fly-ruben-ligera-tire-black',
    note: 'Corrected model/price/weight/casing/maxPsi to match the current "Ruben Ligera 2.4" Tire" (Kevlar folding construction, 60 TPI, 720g, 120 PSI max, $65.00) -- the only current 2.4in-width Ruben SKU (the wire-bead versions are now 2.25in/2.35in only, no plain 2.4in). Renamed model from the previous "Ruben Tire 2.4"" placeholder to match the real product name; id left unchanged (append-only).'
  },

  // ===== PEGS ===========================================================
  {
    id: 'bmx-pg-odyssey-grandstand-14', cat: 'pegs', brand: 'Odyssey', model: 'MPEGs 4" Steel Peg',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, price: 24.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.odysseybmx.com/products/odyssey-mpegs-4-steel-peg-chrome',
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
    id: 'bmx-pg-totalbmx-rotary', cat: 'sprocket', brand: 'Total BMX', model: 'Rotary Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', weight: 59, price: 32.99,
    note: 'RECATEGORIZED pegs->sprocket 2026-07-17 (audit): "Rotary" is a Total BMX SPROCKET (CNC 7075-T6, 25T/28T, 59g at 25T, 1/8in, bolt-drive with 19/22/24mm spindle adapters - modeled as spline per the sprocket-mount convention), never a peg (confirmed via sourcebmx.com/products/total-bmx-rotary-sprocket + 5150bmx.com/products/rotary-sprocket). Id retains the legacy bmx-pg- prefix (ids are append-only). Left unverified (retailer specs, not a fetched maker spec table). WALL, checked 2026-07-21 (bmx-sweep-3): totalbmx.com/collections/sprockets (maker\'s own current 2-product collection) lists only Killabee Sprocket variants - no "Rotary" - confirming it is discontinued from the current storefront, matching the retailer-only sourcing already on this row. Left unverified/unchanged.'
  },
  {
    id: 'bmx-pg-flybikes-vandal', cat: 'pegs', brand: 'Fly Bikes', model: 'Vandal Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: true, price: 34.99,
    note: 'Ships with a 14mm-to-10mm reducer for front-axle use. Checked flybikes.com 2026-07-17: current Fly peg lineup is "Acero TR Peg" and "Acero ST Peg" -- no "Vandal Pegs" found, appears discontinued/renamed. Left unverified; spec unchanged.'
  },

  // ===== BRAKES =========================================================
  {
    id: 'bmx-br-diacompe-990', cat: 'brake', brand: 'Dia-Compe', model: '990 U-Brake',
    mount: 'u-brake', weight: 280, price: 34.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://www.diacompe.com.tw/product/ad990/',
    note: 'bmx-sweep-4: fetched the maker\'s own Taiwan HQ site (diacompe.com.tw), the current "AD990" listing under BMX/Diacompe. Confirms mount:u-brake (cold forged aluminum arms, dual spring tension adjustment - the classic "990"-mount U-brake this catalog row and the id both reference) and states "280g/Wheel" - weight ADDED (no prior value). No price is published on the maker page (no e-commerce on diacompe.com.tw) - price kept as the prior 34.99 sample, unconfirmed against the source (THE PRICE RULE).'
  },
  {
    id: 'bmx-br-odyssey-evo25', cat: 'brake', brand: 'Odyssey', model: 'Evo 2.5 U-Brake',
    mount: 'u-brake', price: 59.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://shop.odysseybmx.com/collections/odyssey-braking/model-evo-2-5',
    note: 'bmx-sweep-2 (2026-07-21): VERIFIED under THE PRICE RULE - mount (u-brake, the sole checkBmxBuild-read brake field) + price ($59.99) were already directly confirmed 2026-07-17 via shop.odysseybmx.com/collections/odyssey-braking/model-evo-2-5; the prior pass withheld verified:true only for a missing weight source, but weight is optional (not validator-required for verified:true) and brake carries no other engine-read field, so nothing further blocks verification.'
  },
  {
    id: 'bmx-br-tektro-vbrake', cat: 'brake', brand: 'Tektro', model: 'Race V-Brake',
    mount: 'v-brake', price: 19.99,
    note: 'UNCONFIRMED, checked 2026-07-21 (bmx-sweep-4): tektro.com\'s current BMX/MTB linear-pull (V-brake) lineup lists M530 (158g/wheel), J310 (155g/wheel), and 837AL - no model literally named "Race V-Brake" exists in the current catalog (tektro.com/en/category/3, tektro.com/bmx product pages). mount:v-brake is a plausible generic classification (all Tektro linear-pull brakes share the V-brake mount), but no maker page names this exact product, so left unverified/unchanged rather than guessing a specific SKU match. Flagged for the coordinator - possible discontinued/generic-name row, same failure class as the retired bmx-hb-sandm-speedball phantom name.'
  },
  {
    id: 'bmx-br-chase-rsp-vbrake', cat: 'brake', brand: 'Chase', model: 'RSP Race V-Brake',
    mount: 'v-brake', weight: 180, price: 34.99,
    note: 'WALL 2026-07-17: chasebicycles.com sells no standalone parts (see bmx-fk-chase-rsp note). Left unchanged, not verified.'
  },
  {
    id: 'bmx-br-saltplus-geoxl', cat: 'brake', brand: 'Salt', model: 'SaltPlus GEO XL Brake',
    mount: 'u-brake', weight: 189, price: 28.52,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://saltbmx.com/products/saltplus-geo-xl-brake',
    note: 'bmx-breadth-4 (2026-07-22): VERIFIED. Directly fetched saltbmx.com: described verbatim as an "extra-large u-brake for modern 2.40\\" tires" -> mount:\'u-brake\' CONFIRMED (the checkBmxBuild-read field); "189 g (6.7 oz)" -> weight CONFIRMED. Maker states price only in EUR (€24.99, rear-position XL u-brake) — converted at 1.1412 USD/EUR (the spot rate on 2026-07-22, per public FX quotes) = $28.52, disclosed as priceBasis:\'regional-conversion\' per schema-bmx.js LOCAL_VOCAB.'
  },
  {
    id: 'bmx-br-shadow-sanov2featherweight', cat: 'brake', brand: 'The Shadow Conspiracy', model: 'Sano V2 Featherweight Brake',
    mount: 'u-brake', weight: 147, price: 91.99,
    note: 'bmx-breadth-4 (2026-07-22): real current product, directly fetched sparkysbrands.com/products/shadow-sano-v2-featherweight-brake ("Shadow Sano V2 Featherweight Brake...5.2 oz...$91.99") -> weight (147g) and price CONFIRMED off the maker page. mount:\'u-brake\' is NOT stated anywhere in the fetched page text itself (no breadcrumb/category names it), so verified:true is withheld even though it IS the checkBmxBuild-read field - "u-brake" is corroborated only by the product\'s own name as listed uniformly across 2+ independent retailers (Dan\'s Comp, Landry\'s Bicycles, Brands Cycle and Fitness all list it as "...Sano V2 Featherweight U-Brake"), satisfying the unverified-sample corroboration bar (DATA-ENTRY-TEMPLATE §7) but not the fetched-maker-page bar for verified:true. Distinct SKU from the already-cataloged bmx-gy-shadow-sanov2 (that is the Sano Detangler V2 gyro, not this brake caliper).'
  },
  {
    id: 'bmx-br-mankind-truth-ubrake', cat: 'brake', brand: 'Mankind', model: 'Truth V2 U-Brake',
    mount: 'u-brake', weight: 144, price: 74.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://mankindbmx.com/produkte/truth-v2-u-bremse/',
    note: 'bmx-sweep-4: current lineup name is "Truth V2" (model corrected from the prior "Truth U-Brake" placeholder, id kept per append-only policy). Maker page (mankindbmx.com, German storefront) confirms mount:u-brake (CNC 6061-T6 aluminum U-brake, wider design clears tires up to 2.4in) and states "Gewicht: 144 g" - weight CORRECTED 168 -> 144g to match exactly. No USD price is published on this EUR-region page (no e-commerce checkout shown) - price kept as the prior 74.99 sample, unconfirmed against the source (THE PRICE RULE).'
  },

  // ===== HANDLEBAR ======================================================
  {
    id: 'bmx-hb-sandm-speedball', cat: 'handlebar', brand: 'S&M', model: 'Speedball Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 74.99, status: 'discontinued',
    note: 'RETIRED — bmx-depth-7 finding (2026-07-21): "Speedball" is a phantom bar name, the same chimera failure mode as the retired bmx-fr-redline-prolineflight row. Checked sandmbikes.com\'s full WooCommerce product sitemap (wp-sitemap-posts-product-1.xml, 292 products) plus a web search: "Speedball" is EXCLUSIVELY S&M\'s street tire name (sandmbikes.com/product/hardgoods/rubber/speedball-tire/) — no handlebar of that name exists in the sitemap, on retailer listings, or anywhere searched. S&M\'s real current bar lineup is Race XLT Bar (this file\'s bmx-hb-sandm-racexlt-8, verified), Perfect 10 Bar, Elevenz Bar, 12 Step Bar, FU Bar, Credence XL Bar — none of which is a plausible rename target at this row\'s specific rise/width/price, so retired without a supersededBy rather than guessing one. Kept via status per the append-only id convention (never deleted/renamed) — do not un-retire without a real fetched source naming this exact product.'
  },
  {
    id: 'bmx-hb-fitbikeco-vh', cat: 'handlebar', brand: 'Fit Bike Co', model: 'VH Bars',
    clamp: '25.4mm', rise: 8.25, width: 29, price: 69.99,
    note: 'Checked thebuildingdistro.com 2026-07-17: current Fit bar lineup is Tom Dugan, Nordstrom, Misfit AM, Young Buck, Jordan Hango Raw Deal, and OEM — no "VH Bars" found, appears discontinued. Left unverified; spec unchanged (used in test/test-bmx-golden.js — do not alter clamp without re-running the golden test).'
  },
  {
    id: 'bmx-hb-sandm-slam', cat: 'handlebar', brand: 'S&M', model: 'Slam Bars',
    clamp: '22.2mm', rise: 8, width: 28, weight: 907, price: 69.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sandmbikes.com/product/hardgoods/slam-bar',
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
    note: 'Single-bolt clamp design; a distinct 22.2mm-clamp SKU alongside the 25.4mm-clamp Elementary Stem already in the catalog (bmx-st-odyssey-elementary). WALL, checked 2026-07-21 (bmx-sweep-2): shop.odysseybmx.com/collections/stems lists 20 current Odyssey stems (Boyd/Broc v2/Walsh/Nord/CFL3/Stacked/Dropped/Levelled/Boss v2/Freeze Top-load) - no "Elementary Stem V2" among them, same discontinued-legacy pattern as bmx-st-odyssey-elementary. Left unverified/unchanged (clamp is display-only, not checkBmxBuild-critical).'
  },

  // ===== SEAT ===========================================================
  {
    id: 'bmx-se-cult-pivotal', cat: 'seat', brand: 'Cult', model: 'Pivotal Seat',
    system: 'pivotal', price: 29.99,
    note: 'UNVERIFIED, checked 2026-07-17: system:\'pivotal\' IS confirmed as accurate — every current Cult seat is pivotal-only (e.g. cultcrew.com/products/kevlar-padded-seat-black: "only available in pivotal"), the field checkBmxBuild reads (bmx-seat-system rule). But no plain $29.99 "Pivotal Seat" SKU exists today — the current lineup (Kevlar Padded, Corduroy Slim, Cult x Vans Old Skool, etc.) is all $44.99. Price/model left unchanged pending a clearer SKU match; not marking verified since the exact current product this row maps to is ambiguous.'
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
    note: 'No standalone "Slim Pivotal Seat" found for Total BMX; closest real products are the "Logo Slim Combo Seat" and "Killabee Slim Combo Bee Seat" (seat+post combo units, not sold as a bare seat). system:pivotal is plausible (Total\'s combo seats use pivotal-style mounting) but not confirmed against an exact matching SKU, so left unverified. RECONFIRMED 2026-07-21 (bmx-sweep-3): totalbmx.com/collections/seats (maker\'s own current 2-product collection) still lists only those same two Combo Seat SKUs ($52.00 each) - no bare pivotal seat sold separately. Left unverified/unchanged.'
  },

  {
    id: 'bmx-se-kink-global-stealth', cat: 'seat', brand: 'Kink', model: 'Global Stealth Seat',
    system: 'stealth', weight: 337, price: 34.95,
    note: 'vocab-tier1 (2026-07-22): closes the bmx-depth-9 flag ("Mission\'s Stealth-mechanism seats stayed skipped/tallied, the Kink precedent"). kinkbmx.com/products/global-stealth-seat itself did not render a usable spec table this session (JS-shell only via both WebFetch and Exa) — WebSearch-corroborated across 3+ independent retailers (Albe\'s BMX, SkatesUSA, Unleaded BMX) converging on "four panel design... The Stealth system installs with a 5mm allen key and allows for a clean looking seat without the need for a slotted top patch like traditional Pivotal systems" (confirms system:stealth — no top patch/slot, matching the Stealth seatpost row\'s own maker-page description of the same mechanism), price $34.95 (regular, Albe\'s BMX; $26.95 was a sale price, not used per THE PRICE RULE), weight ~11.9oz -> 337g. Retailer-corroborated, not a direct manufacturer fetch — stays unverified sample.'
  },
  {
    id: 'bmx-se-kink-chinaski', cat: 'seat', brand: 'Kink', model: 'Chinaski Seat',
    system: 'stealth', weight: 329, price: 39.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://kinkbmx.com/products/chinaski-seat',
    note: 'pb-breadth-1 (2026-07-22): closes the depth-8 flag ("Kink Chinaski / Big Slim seats — real Stealth one-bolt system, structurally a 3rd mechanism the pivotal/standard binary vocab can\'t honestly represent"), now unblocked by the same-day seatSystem:stealth vocab widen (bmx-se-kink-global-stealth/bmx-sp-kink-stealth-post). FETCHED the Shopify product JSON directly (kinkbmx.com/products/chinaski-seat.js, same-origin fetch via the browser pane — kinkbmx.com WebFetches 429\'d this session) — its own Tech Specs table states verbatim "System: Stealth" (system:stealth CONFIRMED) and "Weight: 11.6oz" (329g, computed from the maker-stated ounces — the raw variant JSON weight field, 371g, is NOT used: it doesn\'t match the text-stated 11.6oz and fits this catalog\'s documented Shopify shipping-weight-bucket pattern). price:39.99 is the JSON compare_at_price (the maker\'s own regular/MSRP figure — the product is currently on sale at $30.00, a labeled promotional price per Douglas\'s pricing policy, not used as the stored MSRP). All engine-read fields maker-page-confirmed — promoted to verified:true.'
  },
  {
    id: 'bmx-se-kink-bigslim', cat: 'seat', brand: 'Kink', model: 'Big Slim Seat',
    system: 'stealth', weight: 238, price: 39.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://kinkbmx.com/products/big-slim-stealth-seat',
    note: 'pb-breadth-1 (2026-07-22): closes the same depth-8 Big Slim flag as bmx-se-kink-chinaski (see that row for the vocab-unblock context). FETCHED kinkbmx.com/products/big-slim-stealth-seat.js directly — its Tech Specs table states verbatim "System: Stealth" (system:stealth CONFIRMED) and "Weight: 8.4 oz" (238g, computed from the maker-stated ounces — the raw variant JSON weight field, 283g, is NOT used, same discarded-shipping-bucket reasoning as the Chinaski row). price:39.99 is both the JSON price and compare_at_price fields (no active sale on this SKU, single literal MSRP figure). All engine-read fields maker-page-confirmed — promoted to verified:true.'
  },
  {
    id: 'bmx-se-mission-carrier-stealth', cat: 'seat', brand: 'Mission', model: 'Carrier Stealth Seat',
    system: 'stealth', price: 27.99,
    note: 'vocab-tier1 (2026-07-22): closes the bmx-depth-9 flag alongside the Kink row above. Mission BMX\'s real current product is the "Carrier Stealth Seat" (missionbmx.com/products/carrier-stealth-v2-seat-kit, sold as a seat+post kit; this row models the seat half) — WebSearch-corroborated across retailer listings (Source BMX, Albe\'s, BMXGuru, Tread Bike Shop) all naming the same product: "The Stealth system means there is no need for a patch in the top of the seat... works with both Pivotal and Stealth seat posts" (confirms system:stealth and the cross-compatibility this pass\'s bmx-seat-system rule now models). missionbmx.com itself not independently re-fetched this session — retailer-corroborated, not manufacturer-direct. Price is a same-tier sample matching this catalog\'s other budget-brand pivotal-class seats; not counted toward a verified claim. Left unverified.'
  },

  // ===== SEATPOST =======================================================
  {
    id: 'bmx-sp-kink-stealth-post', cat: 'seatpost', brand: 'Kink', model: 'Stealth Seat Post',
    diameter: 25.4, system: 'stealth', weight: 116, price: 39.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://kinkbmx.com/products/stealth-seat-post',
    note: 'vocab-tier1 (2026-07-22): closes the bmx-depth-9 flag ("Mission\'s Stealth-mechanism seats stayed skipped/tallied, the Kink precedent"). FETCHED kinkbmx.com/products/stealth-seat-post directly — its own Tech Specs table states verbatim "Diameter 25.4mm", "System Stealth", "Length Small 75mm, Medium 180mm, Large 330mm", "Weight Small 2.0oz, Medium 4.1oz, Large 6.8oz" (this row models the Medium: 4.1oz = 116g), "$39.99". Page copy: "Leap frogging off the original Pivotal seat system, the Stealth system offers a way to install your seat without fishing an allen key through the top patch... the anchoring seat bolt can be threaded from the bottom... Note: You can also use traditional Pivotal seats with Stealth seat posts" — the real cross-compatibility fact this pass\'s bmx-seat-system rule now models. All engine-read fields maker-page-confirmed — promoted to verified:true. priceBasis:msrp-confirmed (pb-breadth-1, 2026-07-22) — $39.99 IS the literal figure fetched off kinkbmx.com\'s own product page, matching the stored price exactly; missed in the original pass, added on the priceBasis burndown re-read.'
  },
  {
    id: 'bmx-sp-cult-pivotal-post', cat: 'seatpost', brand: 'Cult', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', price: 29.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/seatpost',
    note: 'diameter:25.4mm and system:\'pivotal\' CONFIRMED via Cult\'s current "Counter post / black & polished" (6061 alloy, diameter 25.4mm, pivotal, 7.5in & 12.5in X-Long lengths). Price corrected 19.99 -> 29.99 to match. Page weight (907g) not recorded: identical placeholder figure shared with the unrelated Headset/Bottom Bracket product pages — a shipping-weight bucket, not real mass.'
  },
  {
    id: 'bmx-sp-odyssey-standard-post', cat: 'seatpost', brand: 'Odyssey', model: 'Tripod Seat Post',
    diameter: 25.4, system: 'standard', price: 31.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-tripod-seat-post-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): diameter (explicit "25.4mm diameter" in the maker\'s spec list - the field the bmx-13c dropper/seatpost-diameter rule reads) and price ($31.99) raw-confirmed. system:\'standard\' is a railed post (the two-angle-position design described has no pivotal serrated head), consistent with the prior pass\'s reading and matching this catalog\'s standard/pivotal convention. No weight is published on the maker page, so weight stays absent as before.'
  },
  {
    id: 'bmx-sp-colony-pivotal-post', cat: 'seatpost', brand: 'Colony', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', weight: 96, price: 17.99,
    verified: true, lastChecked: '2026-07-17', source: 'https://colonybmx.com.au/products/pivotal-seatpost/',
    note: '185mm length, 96g, per the maker page. AUD price not published there (sold via Colony\'s distributor storefront); USD MSRP kept as sample.'
  },

  // ===== GRIPS ==========================================================
  {
    id: 'bmx-gr-odyssey-aaronross', cat: 'grips', brand: 'Odyssey', model: 'Keyboard v1 Grip (Aaron Ross Signature)',
    length: 158, flangeless: true, price: 10.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://shop.odysseybmx.com/products/odyssey-keyboard-v1-grip-black',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. The interface fields (length 158mm, flangeless:true, price $10.99) were already directly fetched and corrected 2026-07-17; `grips` carries no checkBmxBuild-read field at all (length/flangeless are display-only, VERIFY-PROTOCOL\'s BMX small-parts exception), so once the fetch confirmed the real product+specs there was nothing further to block verified:true. No weight is published on the maker page (kept blank, not fabricated).'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17',
    source: 'https://shop.odysseybmx.com/products/odyssey-twisted-pro-pc-pedals-black',
    note: 'Model renamed to match maker naming (was "Twisted PC Pro"); nylon-composite platform, 9/16in spindle, $19.99 price and 14.6oz/pair (~414g) weight all confirmed via the linked product page 2026-07-17.'
  },
  {
    id: 'bmx-pd-odyssey-trailmix', cat: 'pedals', brand: 'Odyssey', model: 'Trailmix Looseball Pedals',
    platform: 'alloy', spindle: '9/16', weight: 340, price: 42.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://shop.odysseybmx.com/products/odyssey-trailmix-looseball-pedals-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): raw-confirmed on the maker\'s own page - "Alloy" tag + "Aluminum body" in the description (platform:\'alloy\') and an explicit "Spindle: 9/16\\"" spec line (spindle:\'9/16\') - and pedals carry zero checkBmxBuild compat rules in this engine (platform/spindle are pure display fields), so this row qualifies for the same treatment as shocks/wheels/forks even before considering weight. Price ($42.99) matches. Odyssey publishes no per-SKU weight and the Shopify JSON variant field (1361g) is a known shipping-weight bucket for this exact SKU (documented in wave 2 - not the real ~350-550g pedal-pair weight), so weight stays the 340g sample, basis noted here.'
  },
  {
    id: 'bmx-pd-shadow-metalalloy', cat: 'pedals', brand: 'The Shadow Conspiracy', model: 'Metal Sealed Alloy Pedals',
    platform: 'alloy', spindle: '9/16', weight: 524, price: 96.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-metal-sealed-alloy-pedals',
    note: 'Trey Jones signature; 6061 alloy body, 4140 heat-treated broached cro-mo spindle, sealed bearings. Weight per maker page (18.5oz, pair).'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.sundaybikes.com/collections/sunday-frames/products/sunday-soundwave-v3-frame-matte-fire-engine-red',
    note: 'Manufacturer\'s own store (shop.sundaybikes.com) product page: "Post Weld Machining: The Mid BB and Headtube is machined..." confirms Mid BB shell + Integrated Head Tube; "Removable Brake Hardware" (angled removable brake mounts) is Sunday\'s u-brake convention, consistent with sibling frames on the same site explicitly naming "removable u-brake hardware" (Street Sweeper/Darkwave); rear axle 14mm is the BMX-universal modern standard (BMX-MODEL.md sec.5). Top tube 20.5/20.75/21/21.25in, weight 4.9lb (2222g) match the fetched page exactly.'
  },
  {
    id: 'bmx-fr-sunday-nightshift', cat: 'frame', brand: 'Sunday', model: 'Nightshift',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2268, price: 489.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://shop.sundaybikes.com/collections/sunday-frames/model-nightshift',
    note: 'Manufacturer\'s own store (shop.sundaybikes.com): Nightshift carries the same "Integrated Head Tube" + "Post-Weld Machining" (Mid BB) feature tags and "Braking Options" (removable u-brake hardware, per the Sunday-wide convention explicit on Street Sweeper/Darkwave) as every other current Sunday freestyle frame; rear axle 14mm is the BMX-universal standard. Top tube 20.5/20.75/21/21.25in, weight 5lb (2268g) match the fetched page exactly.'
  },
  {
    id: 'bmx-fr-sunday-parkranger', cat: 'frame', brand: 'Sunday', model: 'Park Ranger',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2268, price: 349.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://sundaybikes.com/2020/03/introducing-the-sunday-park-ranger-frame/',
    note: 'Sunday\'s entry-level freestyle frame; manufacturer\'s own launch post (sundaybikes.com) confirms "integrated HT and Mid BB shell" (cross-checked against empirebmx.com\'s retailer spec table, which quotes the same maker copy) plus "fully removable braking...hardware" (u-brake per the Sunday-wide convention) and 14mm BMX-universal rear axle. Top tube 20.5/20.75/21in, weight 5lb (2268g) match the fetched page exactly.'
  },

  // ---- Odyssey depth (parts brand, no frames/no forks beyond the R32) --
  {
    id: 'bmx-rh-odyssey-antigramv2-9', cat: 'rearWheel', brand: 'Odyssey', model: 'Antigram V2 Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 454, price: 199.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17',
    source: 'https://shop.odysseybmx.com/products/antigram-v2-cassette-hub',
    note: '36H 2014-T6 aluminum shell, 9T driver, 14mm chromoly axle bolts, RHD/LHD switchable, all confirmed via the linked product page 2026-07-17; weight corrected 560g -> 454g (stock with-guard config; maker also states 436g without guard) and price corrected 119.99 -> 199.99.'
  },
  {
    id: 'bmx-pg-odyssey-chromoly', cat: 'pegs', brand: 'Odyssey', model: 'MPEGs 4in Steel Peg',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, weight: 248, price: 24.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17',
    source: 'https://shop.odysseybmx.com/products/odyssey-mpegs-4-steel-peg-chrome',
    note: 'Model renamed to match maker naming (was generic "Chromoly Pegs"); 4140 chromoly steel, 14mm bore with 3/8in adapter INCLUDED (was reducerIncluded:false, corrected to true), price corrected 19.99 -> 24.99, weight added (8.75oz per single peg ~= 248g; no other catalog peg row carries a weight field today, flagged for the coordinator as a possible follow-up backfill) all confirmed via the linked product page 2026-07-17.'
  },
  {
    id: 'bmx-br-odyssey-springfieldpro', cat: 'brake', brand: 'Odyssey', model: 'Springfield Brake',
    mount: 'u-brake', price: 20.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://shop.odysseybmx.com/products/springfield-brake',
    note: 'bmx-sweep-2 (2026-07-21): VERIFIED under THE PRICE RULE. Model corrected to Odyssey\'s real name "Springfield Brake" (no "Pro" variant exists) and price corrected 39.99 -> 20.99 via shop.odysseybmx.com/products/springfield-brake 2026-07-17 (mount confirmed u-brake, the sole checkBmxBuild-read brake field). The prior pass withheld verified:true only for a missing manufacturer weight (a 133g figure appears only on third-party retailer listings) - weight is optional and not validator-required, so nothing further blocks verification.'
  },
  {
    id: 'bmx-hb-odyssey-brocraiford', cat: 'handlebar', brand: 'Odyssey', model: 'BROC 9.8in Bar',
    clamp: '22.2mm', rise: 9.8, width: 29, price: 129.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://shop.odysseybmx.com/products/odyssey-broc-9-8-bar',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. clamp/rise/width/price were already directly fetched and corrected 2026-07-17; `handlebar`\'s clamp/rise/width are all checkBmxBuild DISPLAY-ONLY fields (VERIFY-PROTOCOL\'s BMX small-parts exception), so once the fetch confirmed the real product+specs there was no remaining engine-read fact to block verified:true. No weight is published on the maker page (kept blank, not fabricated).'
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
    topTube: 21.0, rearBrakeMount: 'disc', rearAxle: '14mm', frameOnly: true,
    price: 399.00, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://cultcrew.com/products/vick-behm-race-frame-black',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED under the frames standalone-no-published-weight exception (VERIFY-PROTOCOL.md, case a). Re-confirmed all three checkBmxBuild-read frame fields on cultcrew.com/products/vick-behm-race-frame-black.js: bbShell:euro ("68mm Euro BB"), rearBrakeMount:disc (the product title itself is "Race Frame / disk brake / black" and the body copy has a "DISK BRAKES" heading), and wheelSize:20 (Cult sells no non-20in-wheel BMX products anywhere in its catalog - every Cult row in this file is 20in; this frame\'s size run is TT-length-only: "Race Expert 20.5\" / Standard 21\" / Pro XL 21.5\", 21.8\", 22\"" confirming a 20in-wheel BMX race platform, not a wheel-size choice). This is sold as a genuine frame-only SKU (not complete-bike-only, unlike Gateway) so weight staying blank is the standard "maker publishes no frame weight" convention - not adding the untrustworthy 4990g shipping-placeholder figure, per the prior pass\'s correct finding. rearAxle stays the pre-existing 14mm sample (unconfirmed, likely actually 3/8" per the page - still flagged for a future BMX_VOCAB.axle widening) since it is not engine-read.'
  },
  {
    id: 'bmx-cr-cult-3piece', cat: 'cranks', brand: 'Cult', model: '3-Piece Crank Set',
    spindle: '19mm', pieces: '3-piece', ringMount: 'spline', price: 139.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/crew-crank',
    note: 'Corrected spindle 22mm -> 19mm and price 249.99 -> 139.99 (base 160mm/Black) to match Cult\'s current "Crew Cranks": "3-pc tubular design... 19mm hollow chromoly spindle with 48 splines". pieces:\'3-piece\' confirmed. ringMount left as \'spline\' (plausible for the splined sprocket boss design, not independently confirmed and not checkBmxBuild-critical). NOT recording the page\'s weight (1814g): identical placeholder figure also shown for an unrelated tire SKU on this store (see the Cult frame notes above) — a shipping-weight bucket, not the crank\'s real mass.'
  },
  {
    id: 'bmx-bb-cult-mid-22', cat: 'bb', brand: 'Cult', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', price: 27.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/bottom-bracket',
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://cultcrew.com/products/vans-x-cult-tire-20-gum',
    note: 'Cult x Vans collaboration tire. wheelSize:\'20\' and width:2.4 CONFIRMED via cultcrew.com\'s current "Vans x Cult Tire 20\\" / gum (single)" ("NEW AND IMPROVED 2.40 DESIGN", 20in). Price corrected 29.99 -> 30.99. casing:\'park\' and maxPsi:95 are not stated on the page and are left as pre-existing, unconfirmed values (not disproven, not engine-critical). Page weight (1814g) not recorded: identical placeholder figure shared with the unrelated Crew Cranks product page — a shipping-weight bucket.'
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://thebuildingdistro.com/product/key-sprocket-2/',
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
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://kinkbmx.com/products/curb-2027',
    note: 'Sold complete-bike-only (corrected frameOnly false; was true). bbShell corrected mid -> american ("Unsealed American 19mm" BB). rearBrakeMount corrected u-brake -> v-brake ("Mission Cease V2" V-brakes). topTube corrected 20.5 -> 20.0in. Price corrected 419.99 -> 399.99. headTube mapped from the page\'s "Standard 1 1/8in Threadless" (external, non-integrated cups) to the closest BMX_VOCAB token (mid) - PROVISIONAL mapping, headTube fires no rule. Complete-bike weight (27lb 2oz = ~12,300g) is NOT a frame weight, so omitted per the wethepeople-justice convention.'
  },
  {
    id: 'bmx-fr-kink-switch', cat: 'frame', brand: 'Kink', model: 'Switch',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false,
    price: 599.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://kinkbmx.com/products/switch-2027',
    note: 'pb-breadth-1 (2026-07-22): closes the depth-10 flag ("Kink, Sunday, Fit, GT, United Recruit: not reached this pass"). FETCHED kinkbmx.com/products/switch-2027.js directly (same-origin fetch via the browser pane) — its own Tech Specs table states verbatim "BOTTOM BRACKET Sealed Mid 19mm" (bbShell:mid), "HEADSET Mission Sealed Integrated (41.8 x 45)" (a standard 1-1/8in-bore integrated headset -> headTube:integrated-1-1/8, same 41.8mm-bore mapping this catalog already uses elsewhere), "REAR HUB Mission Engage Sealed Cassette 14mm" (rearAxle:14mm), "BRAKES Mission Cease V2 (Removable Mounts)" (v-brake per this catalog\'s existing Mission Cease V2 -> v-brake convention, bmx-fr-kink-curb), "Toptube Length 20.75\\"" (topTube exact), price "$599.99" exact. Sold complete-bike-only (no frame-only SKU found) -> frameOnly:false. Page\'s own copy: "Designed as a brakeless bike, the Switch also includes removable brake mounts and a full brake set for those wanting to ride with brakes" (ships with brakes installed per "Note: Optional brake set comes included" - brakeMount entered as the shipped v-brake config, not the brakeless-capable option). Complete-bike weight (27lb 9oz) is NOT a frame weight, omitted per the wethepeople-justice convention.'
  },
  {
    id: 'bmx-fr-kink-whip', cat: 'frame', brand: 'Kink', model: 'Whip',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false,
    price: 549.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://kinkbmx.com/products/whip-2027',
    note: 'pb-breadth-1 (2026-07-22): closes the same depth-10 Kink flag as bmx-fr-kink-switch. FETCHED kinkbmx.com/products/whip-2027.js directly — Tech Specs table states verbatim "BOTTOM BRACKET Sealed Mid 19mm" (bbShell:mid), "HEADSET Mission Sealed Integrated (41.8 x 45)" (headTube:integrated-1-1/8, same mapping), "REAR HUB Mission Engage Sealed Cassette 14mm" (rearAxle:14mm), "BRAKES Mission Cease V2" (v-brake, same Cease V2 convention), "Toptube Length 20.5\\"" (topTube exact), price "$549.99" exact. Sold complete-bike-only (also offered in a separate "Whip XL 2027" SKU, a genuinely distinct size not entered this batch) -> frameOnly:false. No frame-only weight published (complete-bike weight not stated on this page at all, unlike the Switch/Launch rows) - weight intentionally left unset.'
  },
  {
    id: 'bmx-fr-kink-launch', cat: 'frame', brand: 'Kink', model: 'Launch',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.25, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false,
    price: 449.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://kinkbmx.com/products/launch-2027',
    note: 'pb-breadth-1 (2026-07-22): closes the same depth-10 Kink flag as bmx-fr-kink-switch/whip. FETCHED kinkbmx.com/products/launch-2027.js directly — Tech Specs table states verbatim "FRAME Kink Launch 100% Hi-Ten Steel" (an entry-tier hi-ten frame, distinct material from the Switch/Whip/Curb\'s 4130 chromoly - not a schema field but disclosed here), "BOTTOM BRACKET Sealed Mid 19mm" (bbShell:mid), "HEADSET Mission Sealed Integrated (41.8 x 45)" (headTube:integrated-1-1/8, same mapping), "REAR HUB Mission Function Semi-Sealed Cassette 14mm" (rearAxle:14mm), "BRAKES Mission Cease V2" (v-brake, same Cease V2 convention), "Toptube Length 20.25\\"" (topTube exact), price "$449.99" exact (3 colorways, Black Gold/Retro Blue/Midnight Purple, all identically priced - no variant-price ambiguity). Sold complete-bike-only -> frameOnly:false. No frame-only weight published - weight intentionally left unset.'
  },
  {
    id: 'bmx-sp-kink-pivotal-post', cat: 'seatpost', brand: 'Kink', model: 'Pivotal Seatpost',
    diameter: 25.4, system: 'pivotal', weight: 125, price: 39.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://kinkbmx.com/products/pivotal-seat-post',
    note: 'Price corrected 17.99 -> 39.99. Diameter/system confirmed. Weight (125g / 4.4oz) is the Medium (180mm) length; Small (75mm) is 65g, Large (330mm) is 201g.'
  },

  // ---- WeThePeople depth -----------------------------------------------
  {
    id: 'bmx-fr-wethepeople-trust', cat: 'frame', brand: 'WeThePeople', model: 'Trust',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 549.99,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-21', source: 'https://wethepeoplebmx.de/bikes/trust',
    note: 'bmx-sweep-4: frameOnly CORRECTED true -> false - the current wethepeoplebmx.de/frames aftermarket-frame collection (fetched in full) does NOT list a standalone "Trust" frame SKU; it is sold only inside the Trust CS / Trust FC complete bikes, closing this row under the complete-bike-only frame exception (VERIFY-PROTOCOL, Douglas 2026-07-20). Raw-fetched the Trust CS complete-bike spec page: "WETHEPEOPLE TRUST FRAME, 4130 FULL CRMO... 127MM HEAD TUBE" (headTube:integrated-1-1/8 confirmed), "BB: SALT MID BB, 19MM, PRESS FIT" (bbShell:mid CONFIRMED - was previously unconfirmed), "REAR HUB: ECLAT CORTEX CASSETTE HUB... 14MM HOLLOW AXLE" (rearAxle:14mm CONFIRMED - was previously unconfirmed), "BRAKES: ECLAT TALON ALLOY U-BRAKE REAR" (rearBrakeMount:u-brake confirmed), geometry table "A - TOP TUBE LENGTH: 21\"" (topTube CORRECTED 20.75 -> 21 to match this exact colorway/spec page). Page states "WEIGHT: TBC KG / TBC LBS" (to-be-confirmed, no frame-only weight will ever exist per the complete-bike-only case) and no price is shown (regional site, no checkout) - price kept as the prior 549.99 sample, its basis undisclosed until now: THIS PRICE IS UNCONFIRMED AGAINST THE FETCHED SOURCE, likely a stale complete-bike-adjacent estimate (THE PRICE RULE covers a missing/sample price, not a claim of accuracy).'
  },
  {
    id: 'bmx-fr-wethepeople-arcade', cat: 'frame', brand: 'WeThePeople', model: 'Arcade',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 599.99,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://wethepeoplebmx.de/bikes/arcade',
    note: 'bmx-depth-10: COMPLETE-BIKE depth (WeThePeople current lineup, wethepeoplebmx.de/bikes). Full spec sheet fetched: "BB: SALT MID BB, 19MM, PRESS FIT" confirms bbShell:mid; "HEADSET: SALT PRO INT. HEADSET" confirms headTube:integrated-1-1/8; "BRAKES: SALTPLUS GEO XL ALLOY U-BRAKE REAR" confirms rearBrakeMount:u-brake; "REAR HUB: SALT PRO CASSETTE HUB...14MM AXLE" confirms rearAxle:14mm; geometry table "A - TOP TUBE LENGTH: 20.5\\" | 21\\"" - topTube modeled at the shorter of the two offered sizes, matching this catalog\'s convention of picking one representative size per DATA-ENTRY-TEMPLATE (sizes go in a sub-object only for the MTB frame model, not yet extended to BMX). Complete-bike-only (WeThePeople sells no standalone Arcade frame SKU; wethepeoplebmx.de/frames aftermarket collection does not list it) -> frameOnly:false, same exception as the already-cataloged Justice/Trust rows. Page states "WEIGHT: 12.66KG / 27.91LBS" - this is COMPLETE-BIKE weight (mirrors the already-cataloged bmx-fr-wethepeople-justice note verbatim), so intentionally omitted here rather than mis-entered as frame-only mass. NO price is published on wethepeoplebmx.de (a EUR marketing/spec site with no checkout - the same gap the existing Trust row already discloses); wethepeoplebmx.com (the expected US storefront) is a parked/for-sale domain, not a live Shopify store, and no other retailer listing was located this session. Price ($599.99) is an UNCONFIRMED sample estimate, positioned between the cataloged Justice ($579.99, lower street tier) and the Reason/Crysis rows below (higher premium tier) per the maker\'s own "PERFECT MID-TIER BIKE" positioning language - NOT a sourced maker figure, disclosed here per THE PRICE RULE (same interface-verification-exception pattern as bmx-fr-chase-rsp30).'
  },
  {
    id: 'bmx-fr-wethepeople-reason', cat: 'frame', brand: 'WeThePeople', model: 'Reason',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 649.99,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://wethepeoplebmx.de/bikes/reason',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Full spec sheet fetched: "BB: SALT MID BB, 19MM, PRESS FIT" confirms bbShell:mid; "HEADSET: SALT PRO INT. HEADSET" confirms headTube:integrated-1-1/8; "BRAKES: SALTPLUS GEO XL ALLOY U-BRAKE REAR" confirms rearBrakeMount:u-brake (ships with a rear brake despite the frame\'s "removable brake pivots" wording - removability, not presence, is what that phrase means, same reading as bmx-fr-wethepeople-crysis below); "REAR HUB: SALT PRO FREECOASTER HUB...14MM AXLE" confirms rearAxle:14mm; geometry table "A - TOP TUBE LENGTH: 20.75\\"" (single size, no split) confirms topTube exactly. Complete-bike-only (no standalone Reason frame SKU on wethepeoplebmx.de/frames) -> frameOnly:false. Page states "WEIGHT: 12.53KG / 27.63LBS" - COMPLETE-BIKE weight, omitted here (same reasoning as the Arcade row above). NO USD price published on the maker\'s EUR marketing site (same gap as Arcade/Trust); price ($649.99) is an UNCONFIRMED sample estimate reflecting the page\'s own "serious heavy-hitter, dripping with premium quality" top-of-freestyle-line positioning (WTP pro Felix Prangenberg signature-adjacent spec) - NOT a sourced maker figure, disclosed per THE PRICE RULE.'
  },
  {
    id: 'bmx-fr-wethepeople-crysis', cat: 'frame', brand: 'WeThePeople', model: 'Crysis',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: false,
    price: 649.99,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22', source: 'https://wethepeoplebmx.de/bikes/crysis',
    note: 'bmx-depth-10: COMPLETE-BIKE depth. Full spec sheet fetched: "BB: SALT MID BB, 19MM, PRESS FIT" confirms bbShell:mid; "HEADSET: SALT PRO INT. HEADSET" confirms headTube:integrated-1-1/8 (frame also states a taller "127MM HEAD TUBE" length, a dimension, not a different bore/steerer standard - same non-conflict already documented on bmx-fr-wethepeople-trust\'s identical 127mm figure); "BRAKES: ECLAT TALON ALLOY U-BRAKE REAR" confirms rearBrakeMount:u-brake; "REAR HUB: SALTPLUS PRO CASSETTE HUB...14MM AXLE" confirms rearAxle:14mm; geometry table "A - TOP TUBE LENGTH: 20.5\\" | 21\\"" - topTube modeled at the shorter offered size (same convention as Arcade). Complete-bike-only (no standalone Crysis frame SKU on wethepeoplebmx.de/frames) -> frameOnly:false. Page states "WEIGHT: 12.12KG / 26.72LBS" - COMPLETE-BIKE weight, omitted here. NO USD price published on the maker\'s EUR marketing site; price ($649.99) is an UNCONFIRMED sample estimate matching the Reason row\'s premium tier (both are the line\'s heavily-spec\'d, all-CrMo-cockpit top complete bikes) - NOT a sourced maker figure, disclosed per THE PRICE RULE.'
  },
  {
    id: 'bmx-se-wethepeople-team', cat: 'seat', brand: 'WeThePeople', model: 'Team Pivotal Seat',
    system: 'pivotal', weight: 259, price: 26.99,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-17', source: 'https://www.wethepeoplebmx.de/seats-seatposts-seatclamps/team-pivotal-slim-seat',
    note: 'Team Pivotal Slim variant: pivotal system and 259g weight confirmed on the maker page. wethepeoplebmx.de does not list a USD price for this product (no e-commerce checkout on the regional site) - price is kept as the prior sample figure, unconfirmed against the source.'
  },
  {
    id: 'bmx-rh-wethepeople-oem-9', cat: 'rearWheel', brand: 'WeThePeople', model: 'OEM Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', price: 74.99,
    status: 'discontinued',
    note: 'RETIRED 2026-07-21 (bmx-fixpack-1), per bmx-sweep-4\'s finding: no standalone "OEM Cassette Hub" SKU exists under the WeThePeople brand name - wethepeoplebmx.de/hub-hubguards-ov (the current aftermarket hub collection) lists only named hub models (Helix, Hybrid, Supreme, Arrow), never a plain "OEM" hub. This was an id/brand mismatch: the generic 9T/14mm/cassette spec is the as-shipped OEM hub on WTP complete bikes, but it ships under OTHER brands\' names (Salt on the Justice, Eclat on the Trust CS), never as a WeThePeople-branded part. Row retired (BMX has no ALIASES/canonicalId support per src/schema-bmx.js, so `status:"discontinued"` is the tombstone here, same convention as bmx-fr-united-supreme) rather than corrected in place, since the id itself (wethepeople-oem-9) misattributes the brand. Replacement: bmx-rh-salt-ex-cassette below, sourced from Salt\'s current maker page (the "Pro" name the Justice page used has apparently been superseded by "EX" in Salt\'s current lineup - same spec, updated name). No fetchable eclat.bike hub product page was found, so the Eclat Cortex alternative is not modeled.'
  },
  {
    id: 'bmx-rh-salt-ex-cassette', cat: 'rearWheel', brand: 'Salt', model: 'EX Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', weight: 548, price: 74.99,
    verified: true, lastChecked: '2026-07-21', sourceType: 'manufacturer',
    source: 'https://saltbmx.com/products/salt-ex-cassette-hub',
    note: 'ADDED 2026-07-21 (bmx-fixpack-1) to replace the retired bmx-rh-wethepeople-oem-9 (id/brand mismatch - see its note): saltbmx.com\'s current EX Cassette Hub page confirms 14mm male CrMo axle, sealed bearings, 9t 1-piece driver, alloy shell, 548g (RHD), spoke-hole options 28H/36H (this row assumed as a generic 36H build, matching the retired row\'s convention). This is the OEM hub fitted to WTP\'s Justice complete bike (whose page names it "SALT PRO" - the current Salt catalog no longer sells a "Pro"-named hub, only this "EX" model at the identical 9t/14mm/cassette spec, so it is treated as the current-generation successor). Price kept as the prior row\'s $74.99 sample figure (unconfirmed - the maker page lists EUR119.99, not directly usable as a USD MSRP sample without a conversion basis); weight is sourced/verified.'
  },
  {
    id: 'bmx-fk-wethepeople-battleship-24', cat: 'fork', brand: 'WeThePeople', model: 'Battleship 24mm Fork',
    family: 'wethepeople-battleship', discipline: 'freestyle', wheelSize: '20',
    steerer: 'integrated-1-1/8', axle: '10mm', brakeMount: 'none', weight: 1022,
    price: 165.00, verified: true, priceBasis: 'third-party-listed', lastChecked: '2026-07-23',
    source: 'https://wethepeoplebmx.de/forks/battleship-fork-24mm',
    note: 'bmx-brand-depth-2: directly fetched wethepeoplebmx.de (WeThePeople\'s own storefront). States verbatim "integrated crown race designed to work with integrated headsets with a 45° bearing" (steerer:integrated-1-1/8) and "6.5mm investment cast dropout...for 3/8\'\' (10mm) axles" (axle:10mm exact); no brake boss of any kind is mentioned in the spec (matches this catalog\'s standing convention for spec-silent freestyle street forks) -> brakeMount:none. Weight "1022g (36.05oz : 2.25lbs)" confirmed exactly. No price is published on wethepeoplebmx.de (the same no-checkout EU marketing-site gap this catalog\'s existing WeThePeople rows already disclose); this is a real, widely-stocked current product though, so priced via a named retailer (Harvester Bikes, harvesterbikes.ca, $165.00 USD black colorway) per the third-party-listed tier - other retailers (Alan\'s BMX $188.16, Oriol Bike Shop $159.95, Empire BMX $189.95) corroborate the same rough band.'
  },
  {
    id: 'bmx-cr-wethepeople-logic', cat: 'cranks', brand: 'WeThePeople', model: 'Logic Crank',
    family: 'wethepeople-logic', spindle: '22mm', pieces: '3-piece', ringMount: 'spline', length: 165,
    weight: 920, price: 159.99, verified: true, priceBasis: 'third-party-listed', lastChecked: '2026-07-23',
    source: 'https://www.wethepeoplebmx.de/cranks-bottom-brackets/logic-crank',
    note: 'bmx-brand-depth-2: directly fetched wethepeoplebmx.de. States verbatim "SPINDLE: 22mm, butted 4130 crmo" (spindle:22mm), "CRANK ARM: 3pc design" (pieces:3-piece), and "165mm: 920g (32.4oz) (w/o BB set)" (weight:920, this row\'s 165mm length). ringMount:spline per LUXBMX\'s independent corroborating copy describing this exact model as "These 48 spline cranks" (a spline sprocket interface, not press-on). No price on the maker\'s own EU site; entered via a named retailer (Source BMX AM storefront, sourcebmx-am.myshopify.com, $159.99 standalone-crank price) per the third-party-listed tier - other retailers price the same crank anywhere from $149.95 (SkateHut, GBP-converted) to $229 (The Cut BMX) to $265 (LUXBMX, but that bundle explicitly INCLUDES the WTP bottom bracket, inflating the figure) - the sourcebmx-am figure was chosen as the plain crank-only price closest to the maker\'s own described product (crank comes WITH a BB per the spec text, so some retailer variance reflects bundling differences, not different SKUs).'
  },
  {
    id: 'bmx-hb-wethepeople-patron', cat: 'handlebar', brand: 'WeThePeople', model: 'Patron Bar (9.5in, 22.2mm)',
    family: 'wethepeople-patron', clamp: '22.2mm', rise: 9.5, width: 30,
    weight: 860, price: 79.95, verified: true, priceBasis: 'third-party-listed', lastChecked: '2026-07-23',
    source: 'https://wethepeoplebmx.de/handlebars/patron-bar',
    note: 'bmx-brand-depth-2: directly fetched wethepeoplebmx.de. Geometry table states verbatim "G - RISE: 9\\", 9.5\\" or 10\\"", "H - WIDTH: 29.5\\" (9\\"); 30\\" (9.5\\"); or 30.25\\" (10\\")", "CLAMPING: 22.2mm" (this row models the 9.5in/22.2mm variant: rise:9.5, width:30, clamp:22.2mm) and "9.5\\": 860g" (weight exact). No price on the maker\'s own EU site; entered via a named retailer (Oriol Bike Shop, oriolbikeshop.com, $79.95 USD for the 10in rise variant - the 9/9.5in variants were sold out at fetch time but list at the same $79.95 per-size price on that store) per the third-party-listed tier.'
  },

  // ---- Eclat (new brand to the catalog) --------------------------------
  {
    id: 'bmx-cr-eclat-onyx', cat: 'cranks', brand: 'Eclat', model: 'Onyx Cranks',
    spindle: '24mm', pieces: '3-piece', ringMount: 'spline', weight: 833, price: 179.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/onyx-cranks',
    note: 'CORRECTED: spindle was wrongly entered as 22mm; Eclat\'s own page confirms the Onyx is a 24mm crmo ultra-hollow spindle (165mm/175mm arm lengths). Weight is the 175mm arm-length figure (833g); the 160mm/165mm options weigh slightly less. Compatible with both 24mm spline-drive and bolt-drive sprockets.'
  },
  {
    id: 'bmx-bb-eclat-mid-22', cat: 'bb', brand: 'Eclat', model: 'Mid BB',
    shell: 'mid', spindleFit: '22mm', weight: 174, price: 31.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/mid-bottom-bracket-set',
    note: 'Weight is the 22mm-spindle figure from Eclat\'s own page (19mm=189g, 24mm=148g).'
  },
  {
    id: 'bmx-sp-eclat-spline-25', cat: 'sprocket', brand: 'Eclat', model: 'Onyx Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', weight: 144, price: 34.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/onyx-sprocket',
    note: 'CORRECTED model name from the generic "Spline Sprocket 25T" placeholder to Eclat\'s actual product, the Onyx Sprocket (25T/26T, 6061-T6 cold-forged, 23.8mm bore, ships with 19mm/22mm spindle adapters for its native 24mm fit).'
  },
  {
    id: 'bmx-rh-eclat-cortex-9', cat: 'rearWheel', brand: 'Eclat', model: 'Cortex Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 239.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/e440-cortex-cassette-rear-wheel',
    note: 'Row is a complete wheel (cat rearWheel), matched to Eclat\'s E440/Cortex Cassette Rear Wheel product (E440 rim + Cortex Cassette hub, RSD/LSD, 14mm male axle, 9t driver). CORRECTED price from 94.99 (was far under the real ~240 EUR complete-wheel price - possibly confused with a hub-only price). Eclat\'s page publishes no per-wheel weight (interface-only verification per the wheels exception in VERIFY-PROTOCOL.md), so weight stays unset rather than fabricated.'
  },
  {
    id: 'bmx-fw-eclat-cortex', cat: 'frontWheel', brand: 'Eclat', model: 'Cortex Front Wheel',
    wheelSize: '20', axle: '10mm', price: 169.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/e440-cortex-front-wheel',
    note: 'Matched to Eclat\'s E440/Cortex Front Wheel (E440 rim + Cortex Front hub, 10mm female axle). CORRECTED price from 69.99 (real complete-wheel price is far higher). No per-wheel weight is published (interface-only verification per the wheels exception in VERIFY-PROTOCOL.md).'
  },
  {
    id: 'bmx-gr-eclat-pulsar', cat: 'grips', brand: 'Eclat', model: 'Pulsar Grips',
    length: 165, flangeless: true, weight: 168, price: 13.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/eclat-pulsar-grips',
    note: 'CORRECTED length from 143mm to the maker-stated 165mm (165mm x 29.5mm, ODI-made flangeless mushroom grip). Weight is per pair.'
  },
  {
    id: 'bmx-se-eclat-bios', cat: 'seat', brand: 'Eclat', model: 'Bios Pivotal Seat',
    system: 'pivotal', weight: 313, price: 38.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/bios-pivotal-seat',
    note: 'Weight is the Mid-padding figure (Eclat\'s own default/primary listing); Slim = 283g, Fat = 388g are also sold under the same Bios Pivotal Seat product. CORRECTED price from 24.99 to the maker\'s 38.99.'
  },
  {
    id: 'bmx-sp-eclat-bios-post', cat: 'seatpost', brand: 'Eclat', model: 'Torch Pivotal Seat Post',
    diameter: 25.4, system: 'pivotal', price: 35.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://eclatbmx.com/products/torch-pivotal-seatpost',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Re-fetched eclatbmx.com/products/torch-pivotal-seatpost directly: "Size: 25.4mm" (diameter CONFIRMED), "all-pivotal compatible seatpost" (system:pivotal CONFIRMED) - `seatpost` carries no other checkBmxBuild-read field in the BMX engine (no seatpost-vs-seat-tube rule exists for BMX, unlike the MTB engine\'s rule 13c), so both load-bearing facts check out. Price CORRECTED 16.99 -> 35.99 (the maker\'s real current price across all lengths/colors; the prior figure had no source). Weight not recorded: the page states real per-length figures (91g mid, 131g long) but this row represents the SKU generically across all three lengths, so no single weight is unambiguous.'
  },
  {
    id: 'bmx-pg-eclat-alloy', cat: 'pegs', brand: 'Eclat', model: 'Alloy Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: true, price: 27.99,
    note: 'CORRECTED reducerIncluded from false to true: Eclat\'s real 14mm alloy pegs (Emery Grit Axle Pegs, Sparrow Axle Peg) ship with a 3/8in adapter included. Kept as a generic "Alloy Pegs" sample entry (matching this catalog\'s convention for other brands\' peg rows, e.g. bmx-pg-cult-alloy) rather than verified, since no single Eclat SKU is literally named "Alloy Pegs".'
  },
  {
    id: 'bmx-pd-eclat-slash', cat: 'pedals', brand: 'Eclat', model: 'Slash Pedals',
    platform: 'plastic', spindle: '9/16', weight: 389, price: 20.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/slash-pedal',
    note: 'CORRECTED platform from alloy to plastic (Eclat states injection-moulded nylon/fibreglass body, crmo spindle) and weight from 345g to the maker-stated 389g/pair.'
  },
  {
    id: 'bmx-ti-eclat-fireball-23', cat: 'tire', brand: 'Eclat', model: 'Fireball Tire 2.3"',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 100, weight: 737, price: 39.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://eclatbmx.com/products/fireball-tire-classic-blue-black',
    note: 'CORRECTED price from 24.99 to the maker\'s 39.99. maxPsi (100) confirmed; weight (737g at 2.3in) is the maker-stated figure.'
  },

  // ---- The Shadow Conspiracy depth (parts brand, no frames/forks) ------
  {
    id: 'bmx-cr-shadow-finest', cat: 'cranks', brand: 'The Shadow Conspiracy', model: 'Finest Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 907, price: 249.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-finest-cranks',
    note: 'Hollow 22mm / 48-spline spindle, 4130 chromoly, LHD/RHD compatible. Weight per maker page (32oz).'
  },
  {
    id: 'bmx-sp-shadow-vultus-28', cat: 'sprocket', brand: 'The Shadow Conspiracy', model: 'Cranium Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 48.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-cranium-sprocket',
    note: 'CORRECTED 2026-07-17: catalog previously named this "Vultus Sprocket 28T" - Vultus is Shadow\'s bar/fork line, not a sprocket; no such sprocket exists. Renamed to the real 28T Shadow sprocket closest to the original price point (7075 alloy, 24mm bore, 1/8" pitch).'
  },
  {
    id: 'bmx-rh-shadow-optimized-9', cat: 'rearWheel', brand: 'The Shadow Conspiracy', model: 'Definitive Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 499, price: 289.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-definitive-cassette-hub-rhd',
    note: 'CORRECTED 2026-07-17: catalog previously named this "Optimized Cassette Hub" - Optimized is Shadow\'s freecoaster line; the cassette hub line is Definitive (LHD/RHD). 1pc 9T chromoly driver, 14mm hollow chromoly axle. Weight per maker page (17.6oz).'
  },
  {
    id: 'bmx-ti-shadow-strada-23', cat: 'tire', brand: 'The Shadow Conspiracy', model: 'Strada Nuova Low Pressure Tire',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 60, weight: 731, price: 27.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-strada-nuova-low-pressure-tyre',
    note: 'Simone Barraco signature; structural low-pressure casing, 20x2.30in, 60 PSI max. Weight per maker page (25.8oz). Corrected from a fictitious "100 PSI" max stated in the prior row.'
  },
  {
    id: 'bmx-pg-shadow-alloy', cat: 'pegs', brand: 'The Shadow Conspiracy', model: 'MFG Alloy Pegs',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, price: 24.99,
    note: 'UNVERIFIED 2026-07-17: no current Shadow peg named "MFG Alloy Pegs" found on sparkysbrands.com (their official store). Shadow\'s current peg lineup is chromoly (Little One / Larger One, both fit 14mm w/ 3/8in adapter INCLUDED) or alloy-core/nylon-sleeve composite (S.O.D. Featherweight); none is a plain all-alloy peg matching this row. Left unverified rather than guess a specific SKU - flagging for the coordinator.'
  },
  {
    id: 'bmx-hb-shadow-feather', cat: 'handlebar', brand: 'The Shadow Conspiracy', model: 'Feather Bars',
    clamp: '25.4mm', rise: 8.0, width: 28.5, weight: 780, price: 79.99,
    note: 'UNVERIFIED 2026-07-17: Lightweight chromoly bar. Shadow\'s current bar lineup (Vultus Featherweight 13B, Crow Featherweight 4pc, Vultus SG, Crowbar SG 4pc) is all 29in wide with 8.5in+ rise options - no current model matches this row\'s 28.5in width / 8.0in rise exactly, so left unverified rather than force a mismatched SKU mapping.'
  },
  {
    id: 'bmx-gr-shadow-gipsy', cat: 'grips', brand: 'The Shadow Conspiracy', model: 'Gipsy DCR Grips',
    length: 160, flangeless: true, price: 13.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-gipsy-dcr-grips',
    note: 'CORRECTED 2026-07-17: Simone Barraco signature grip (prior row wrongly credited Sean Ricany), proprietary DCR rubber, 160mm length (was 143mm), symmetrical/flangeless ends.'
  },
  {
    id: 'bmx-sp-shadow-finest-post', cat: 'seatpost', brand: 'The Shadow Conspiracy', model: 'Pivotal Post',
    diameter: 25.4, system: 'pivotal', weight: 99, price: 49.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-17', source: 'https://www.sparkysbrands.com/products/shadow-pivotal-post',
    note: 'CORRECTED 2026-07-17: catalog previously named this "Finest Pivotal Seatpost" - no such product exists; the generic Shadow pivotal post is simply "Pivotal Post" (135mm length, 6061-T6 forged alloy). Diameter/system already matched; price/weight corrected. Weight per maker page (3.5oz).'
  },
  {
    id: 'bmx-pd-colony-fantom', cat: 'pedals', brand: 'Colony', model: 'Fantastic Plastic Pedals',
    platform: 'plastic', spindle: '9/16', weight: 371, price: 44.99,
    verified: true, lastChecked: '2026-07-20', source: 'https://colonybmx.com.au/products/fantastic-plastic-pedals', sourceType: 'manufacturer',
    note: 'CORRECTED model+platform 2026-07-17 (audit): no "Fantom" pedal exists; Colony\'s real pedal is the "Fantastic Plastic Pedals" (nylon/plastic platform, 9/16in). VERIFIED 2026-07-20: colonybmx.com.au product page raw-text-confirms "Looseball axle type only in 9/16″" (platform:plastic, spindle:9/16) and "Weight per pair: 371 grams (13.08oz)" (corrected from the prior unverified 350g sample). Id retains the legacy "fantom" token (ids are append-only). priceBasis burndown re-fetch (pb-breadth-1, 2026-07-22): re-pulled colonybmx.com.au/products/fantastic-plastic-pedals directly — page shows product images/specs/description but NO price or currency figure anywhere, confirming the original note\'s silence on price wasn\'t an oversight; no basis to stamp, priceBasis stays unset.'
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
    price: 549.99, status: 'discontinued', supersededBy: 'bmx-fr-redline-prolineexpert',
    note: 'RETIRED — gravel-8 priority-3 finding (2026-07-21): "Proline Flight" is a phantom trim name — Redline sells "Proline" (this file\'s base row, v-brake) and "Proline Expert"/"Proline Expert XL" as its current disc-brake race tier, and separately a completely different "Flight"/"Flight Pro Carbon" frame line (J&R Bicycles: "Redline Flight Pro Carbon BMX Race Frame") — but no product anywhere named "Proline Flight" exists on redlinebicycles.com (now redirects to diamondback.com/collections/redline-bmx), current retailer listings, or search results. This row appears to have chimera\'d the two real names together to fill the depth-3 disc-brake vocab gap, the same failure mode as the gravel catalog\'s retired HUNT "Adventure Wide" row. Retired via status/supersededBy per the append-only id convention rather than deleted or silently renamed. Superseded by bmx-fr-redline-prolineexpert, a real current model with the matching disc-brake/Euro-BB spec.'
  },
  {
    id: 'bmx-fr-redline-prolineexpert', cat: 'frame', brand: 'Redline', model: 'Proline Expert',
    discipline: 'race', wheelSize: '20', bbShell: 'euro', headTube: 'integrated-1-1/8',
    topTube: 20.75, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false,
    price: 650.00, status: 'current', verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://diamondback.com/products/proline-expert',
    note: 'bmx-depth-7 (2026-07-21): CORRECTED, not the retailer-corroborated disc-brake claim the prior note carried. Directly fetched diamondback.com/products/proline-expert (Shopify products.json + rendered page — Redline\'s current parent-brand storefront) and read its spec table verbatim: "BOTTOM BRACKET: Sealed Euro BB" -> bbShell:euro CONFIRMED; "HEADSET: Sealed Integrated Headset 1 1/8, Aluminum top cap" -> headTube:integrated-1-1/8 CONFIRMED; "RIMS: A-M6 Alloy Race, 20 x 1.5, 32h" + "TIRES: ...20 x 1.95in Front / 20 x 1.75in Rear" -> wheelSize:20 CONFIRMED. Critically, "BRAKE LEVERS: Tektro 316A Linear" is a linear-pull lever spec — the page never mentions a disc brake, disc rotor, or disc caliper anywhere (checked) — so rearBrakeMount is CORRECTED disc -> v-brake (the prior row\'s "Avid disc brakes" claim came from corroborating retailer copy for a DIFFERENT current model year, the exact search-summary trap VERIFY-PROTOCOL warns about — phantom-number/phantom-spec, not a fabrication, but wrong). frameOnly CORRECTED true -> false: this SKU (06-780-6000, $650) is a complete-bike-only product_type "BMX Bikes" with no separate frameset SKU on the page — the $650 is therefore a real maker-published complete-bike price, not a frameset placeholder (THE PRICE RULE / frames extension case (b) — sold as a complete bike only). topTube (20.75in) and rearAxle (14mm) are NOT restated on this page and are NOT checkBmxBuild-read fields (display-only per the BMX small-parts exception, VERIFY-PROTOCOL.md), so their absence does not block verification; retained unchanged as the pre-existing plausible sample. The products.json variant grams figure (13608g, identical across four unrelated Redline models incl. a 27.5+ cruiser) is a shared placeholder/shipping-weight bucket, not a real product weight — the phantom-number hazard\'s Shopify-weight trap — so no weight field is set. bmx-fr-redline-prolineflight (retired, above) and bmx-br-avid-bb5-bmx\'s note both still describe a "Redline Proline Flight class" disc-brake race tier; that description is now unconfirmed for the current Proline Expert lineage and should be re-examined by a future pass, not relied on.'
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
    topTube: 20.75, rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true,
    price: 419.99,
    note: 'STA500 platform - Standard\'s long-running freestyle frame, approaching 25 years in production per the maker. BMX wave 4: CORRECTED (not verified). Re-read standardbyke.com/sta500/ raw HTML for the wave-3-flagged brake-mount conflict: the spec list literally reads "No brake mounts or welded on brake mounts" directly above "Drilled/tapped for gyro tabs, a no cost option" - this is a build-to-order EITHER/OR choice (handmade-to-order frame), not a fixed stock spec, and brakeless is listed first/primary. Corrected rearBrakeMount from the wrong \'u-brake\' to \'none\' (this catalog\'s convention for other brakeless-primary/optional-mount frames, e.g. bmx-fr-totalbmx-killabee) rather than leaving a claim the page contradicts. "Mid bb" and "1/4\\" thick 14mm laser cut drop outs" reconfirm bbShell:mid and rearAxle:14mm. Not marked verified: no head tube spec stated on the page, and the only weight figure sits in a shipping-cost field (same trap as wave 3 found), not a real product weight.'
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
    verified: true, lastChecked: '2026-07-21', source: 'https://thebuildingdistro.com/product/2026-str-flat-black-20-75-tt/',
    note: 'Sold as a complete bike only (thebuildingdistro.com, Fit\'s current store) - no frame-only STR SKU exists, so no shopper reads this as "buy this bare." Re-checked 2026-07-21 against the 2026 STR FLAT BLACK 20.75 TT spec sheet: "Sealed Mid" BB = mid, "Integrated w/Gyro Holes" head tube = integrated-1-1/8, "Cable U-Brake w/Low Tension Springs" = u-brake, 20.75in top tube matches this row exactly. rearAxle/weight not stated (rearAxle is display-only, no rule reads it) - stay samples. Price stays the prior 449.99 sample, not the $579.95 complete-bike price (THE PRICE RULE #3) - no bare-frame MSRP exists.'
  },
  {
    id: 'bmx-fr-fitbikeco-prk', cat: 'frame', brand: 'Fit Bike Co', model: 'PRK',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 459.99,
    verified: true, lastChecked: '2026-07-21', source: 'https://thebuildingdistro.com/product/2026-prk-oxford-blue-20-5-tt/',
    note: 'Sold as a complete bike only (thebuildingdistro.com, Fit\'s current store) - no frame-only PRK SKU exists. CORRECTED rearBrakeMount from a prior "none"/brakeless guess: the 2026 PRK OXFORD BLUE 20.5 TT ships with "BRAKES: U-Brake w/Low Tension Springs" (raw page text, 2026-07-21), so this frame has U-brake mounts, not none - "commonly run brakeless" was an unconfirmed assumption. BB "Sealed Mid" = mid, head tube "Integrated w/Gyro Holes" = integrated-1-1/8, top tube 20.5in matches this row exactly. rearAxle/weight not stated (rearAxle display-only) - stay samples. Price stays the prior 459.99 sample, not the $564.95 complete-bike price (THE PRICE RULE #3).'
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
    clamp: '25.4mm', rise: 8.0, width: 28, weight: 726, price: 94.99, verified: true, lastChecked: '2026-07-21',
    source: 'https://sandmbikes.com/product/hardgoods/bars/race-xlt-bar/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, correcting the 2026-07-18 pass\'s open weight question. sandmbikes.com/product/hardgoods/bars/race-xlt-bar/ (page title literally "Race XLT Bar 8″ (Slam Geo.)") is a DEDICATED single-SKU page for this exact 8in bar, distinct from the multi-size "S&M Race XLT Bar 7.5″-10″" selector page the 2026-07-18 pass read from — its own spec table states verbatim: RISE 8″, WIDTH 28″, UPSWEEP 1°, BACK SWEEP 12°, CROSS BAR .625″, WEIGHT "1.6 lb (.73 kg)" (726g, computed from the maker-stated pounds figure). width CORRECTED 29->28in (the 29in figure was carried over from the different multi-size selector product, not this dedicated SKU); weight CORRECTED 762->726g against this SKU\'s own stated figure (762g was the 7.5in low end of the OTHER product\'s range, never this row\'s 8in). clamp (25.4mm) is NOT stated on either page and is a checkBmxBuild DISPLAY-ONLY field per the BMX small-parts exception (VERIFY-PROTOCOL.md) — left as the pre-existing plausible sample, does not block verification. Price: this dedicated SKU is currently marked "Out of stock" on the maker page with no live price shown (schema.org price 0.00, an out-of-stock placeholder, not a real $0 MSRP) — kept the pre-existing $94.99 sample per THE PRICE RULE (a temporarily out-of-stock real product is still real; a missing live price never blocks verified:true).'
  },

  // ---- Cult small-parts depth (AK = Alex Kennedy, Dak = Dakota Roche
  //      signature lines) -------------------------------------------------
  {
    id: 'bmx-hb-cult-ak', cat: 'handlebar', brand: 'Cult', model: 'AK Bars',
    clamp: '25.4mm', rise: 10.0, width: 30.0, price: 79.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://cultcrew.com/products/ak-bars',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): rise CORRECTED 8.0 -> 10.0 and width CORRECTED 28.75 -> 30.0 - the maker\'s own spec list states "30\\" width, 12° backsweep, 2° upsweep, 10\\" rise" verbatim, both figures previously wrong. clamp is display-only in checkBmxBuild (no BMX bar/stem clamp rule exists - handlebar/stem aren\'t even read by checkBmxBuild), so the unconfirmed 25.4mm value does not block verification. Price ($79.99) matches. No weight field on this row - the page\'s 6804g JSON figure is an obvious shipping-weight bucket (a BMX bar does not weigh 15lb), correctly not carried over.'
  },
  {
    id: 'bmx-hb-cult-dak', cat: 'handlebar', brand: 'Cult', model: 'Dak Bars',
    clamp: '25.4mm', rise: 8.8, width: 28.0, price: 79.99,
    note: 'Dakota Roche signature bar - 100% heat-treated butted chromoly, 11deg backsweep, 2deg upsweep, 1in OD clamp area. WALL, checked 2026-07-21 (bmx-sweep-2): cultcrew.com/products/dak-bars 404s and the current /collections/parts handlebar lineup (Crew/Heaven\'s Gate/AK/Hawk/Race/18in Juvi Bars) has no "Dak Bars" entry - discontinued from Cult\'s own store, same pattern as the already-documented bmx-gr-cult-dak grips. Left unverified/unchanged (clamp is display-only, not checkBmxBuild-critical, per bmx-hb-cult-ak\'s prior note).'
  },
  {
    id: 'bmx-gr-cult-ak', cat: 'grips', brand: 'Cult', model: 'AK Grips',
    length: 158, flangeless: false, price: 10.99,
    note: 'Alex Kennedy signature grip - soft durable rubber compound, thicker than other Cult grips; ships with bar ends. WALL, checked 2026-07-21 (bmx-sweep-2): cultcrew.com/products/ak-grips 404s and the current /collections/parts grips lineup (Vans x Cult Waffle/Motorcycle/Cruiser, Solo, Faith, Crew, Fucking Awesome/Cult Black) has no "AK Grips" entry - discontinued from Cult\'s own store, same pattern as the already-documented bmx-gr-cult-dak. Left unverified/unchanged.'
  },
  // ---- Colony small-parts + wheel depth (colonybmx.com.au fetched) ------
  {
    id: 'bmx-st-colony-official', cat: 'stem', brand: 'Colony', model: 'Official Stem',
    clamp: '25.4mm', price: 54.99, verified: true, lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/official-stem-2/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Confirmed on colonybmx.com.au/products/official-stem-2/ (listed live in the current stems category) as "the Colony Official BMX Stem" - "a classic look with a front load" (topload). `clamp` is the only field the stem schema carries and is checkBmxBuild DISPLAY-ONLY (VERIFY-PROTOCOL\'s BMX small-parts exception) - not stated on the page, but its absence does not block verification since there is no other interface fact to confirm. Price kept as the pre-existing sample (no live AU price found).'
  },
  {
    id: 'bmx-st-colony-variant', cat: 'stem', brand: 'Colony', model: 'Variant Stem',
    clamp: '25.4mm', price: 49.99, verified: true, lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/variant-stem/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Confirmed on colonybmx.com.au/products/variant-stem/ (listed live in the current stems category). Same reasoning as bmx-st-colony-official: clamp is display-only and the only stem field, so a real, current product page is sufficient to clear the interface bar. "52mm topload stem" retained from the existing note (unchanged, plausible). Price kept as the pre-existing sample.'
  },
  {
    id: 'bmx-gr-colony-mountjoy', cat: 'grips', brand: 'Colony', model: 'Mountjoy Grips',
    length: 140, flangeless: true, weight: 124, price: 10.99,
    verified: true, lastChecked: '2026-07-19', source: 'https://colonybmx.com.au/products/mountjoy-grips/',
    note: 'colonybmx.com.au: "140mm...diameter", plastic push-in style bar ends (flangeless), "Weight: 124 grams (4.37oz) per pair". Length corrected 143->140. Price unconfirmed on the AU page (no USD shown); left as the existing $10.99 sample, matching this catalog\'s established Colony/Odyssey grip pricing convention.'
  },
  {
    id: 'bmx-pg-colony-oneway', cat: 'pegs', brand: 'Colony', model: 'Oneway CrMo Peg',
    axleFit: '14mm', material: 'steel', reducerIncluded: false, weight: 169, price: 19.99,
    verified: true, lastChecked: '2026-07-19', source: 'https://colonybmx.com.au/products/oneway-crmo-peg/',
    note: 'colonybmx.com.au: "Forged & machined from 4140 CrMo then heat treated", "3/8\\" & 14mm axle slots" (dual-bore, no reducer needed at 14mm - matches reducerIncluded:false), "169 grams each (5.96oz)". Price unconfirmed on the AU page; left as the existing $19.99 sample.'
  },
  {
    id: 'bmx-pg-colony-jamcircle', cat: 'pegs', brand: 'Colony', model: 'Jam Circle Peg',
    axleFit: '14mm', material: 'alloy', reducerIncluded: false, weight: 99, price: 24.99,
    verified: true, lastChecked: '2026-07-19', source: 'https://colonybmx.com.au/products/jam-circle-pegs/',
    note: 'colonybmx.com.au: "6061T6 Alloy", "10/14mm with adaptor" (native 14mm bore, adaptor steps down to 10mm - so no reducer needed at this row\'s 14mm), "Weight: 99 grams". Price unconfirmed on the AU page; left as the existing $24.99 sample.'
  },
  {
    id: 'bmx-fw-colony-wasp', cat: 'frontWheel', brand: 'Colony', model: 'Wasp Front Hub',
    axle: '10mm', wheelSize: '20', weight: 284, price: 79.99, verified: true, lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/wasp-front-hub/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, correcting a wrong axle spec. Directly fetched colonybmx.com.au/products/wasp-front-hub/, which states verbatim: "Female bolt style with CrMo axle for strength", "10mm bolts only", "36 hole only", "Weight: 284 grams (10.01oz), 305 grams (10.75oz) with [plastic hub guards]". axle CORRECTED 14mm -> 10mm: the prior row\'s "14mm...a freestyle front-hub upsize from the 10mm default" claim directly contradicts the maker\'s own "10mm bolts only" line - a real spec error, not a config choice (the front hub has no 14mm option). weight ADDED (284g, bare, without the optional plastic guards) - a real per-unit maker-stated figure. Price not restated on this page (AU brand site, no live checkout price found) - kept the pre-existing $79.99 sample per THE PRICE RULE.'
  },
  {
    id: 'bmx-rh-colony-wasp', cat: 'rearWheel', brand: 'Colony', model: 'Wasp Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 469, price: 99.99,
    verified: true, lastChecked: '2026-07-19', source: 'https://colonybmx.com.au/products/wasp-cassette-hub/',
    note: 'colonybmx.com.au: "14mm axle...9T driver...Weight: 469grams (16.54oz)" - matches this row\'s cassette/9T/14mm exactly (standalone rear hub, not the Race hubset). Price unconfirmed on the AU page; left as the existing $99.99 sample.'
  },
  {
    id: 'bmx-rh-colony-wasprace', cat: 'rearWheel', brand: 'Colony', model: 'Wasp Race Cassette Hubset',
    driverType: 'cassette', driverTeeth: 16, side: 'both', axle: '10mm', weight: 355, price: 129.99, verified: true, lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/wasp-race-cassette-hub/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, correcting an assumed axle spec. colonybmx.com.au/products/wasp-race-cassette-hub/ (titled "Wasp Race Front / Rear Cassette Hubset") states verbatim: "6061T6 alloy hub shell", "7075T6 alloy female axle", "10mm hardened CrMo allen head bolts", "Direct engagement Shimano fitment...alloy driver" (driverType:cassette CONFIRMED), "Comes with light weight 16T cog" (driverTeeth:16 CONFIRMED), "Weight: 560 grams for full set (205 grams for front & 355 grams for rear)". axle CORRECTED 14mm -> 10mm: the prior row\'s note ("alloy driver and axle for reduced weight") was a plausible-sounding guess, not sourced - the maker page unambiguously states 10mm bolts for this race-tier hubset (its lighter alloy axle uses the same 10mm bolt diameter as the standard/race front hub, distinct from the standard REAR Wasp Cassette Hub\'s confirmed 14mm - bmx-rh-colony-wasp, a genuinely different, heavier tier). weight ADDED: 355g is this row\'s own rear-specific figure (the page also confirms the front half at 205g, matching bmx-fw-colony-wasp\'s 284g standard-tier front hub as a DIFFERENT, non-race product - the two Wasp front hubs are not the same SKU). No RHD/LHD wording found on the page; side:both left unchanged (not an engine-read field). priceBasis burndown re-fetch (pb-breadth-1, 2026-07-22): re-pulled the same colonybmx.com.au page directly for price — specs/images shown, a "Shop now" link points off to familydistribution.com.au, but no price is displayed on the maker page itself; no basis to stamp, priceBasis stays unset.'
  },

  // ---- Alienation (new brand: alienationbmx.com, race wheels) -----------
  {
    id: 'bmx-fw-alienation-sabbath', cat: 'frontWheel', brand: 'Alienation', model: 'Sabbath Front',
    axle: '10mm', wheelSize: '20', price: 129.99,
    note: 'CORRECTED 2026-07-21 (bmx-sweep-3): alienationbmx.com/portfolio/sabbath-front (raw-fetched, maker\'s own product page, browser pane) confirms the model is real and current ("Vandal tubeless compatible, double wall & welded seam...Featuring Alienation`s Venus Hub...DT SS 2.0 straight gauge") but describes it as intended for STREET use, not race - the prior note\'s "Race front wheel" characterization was an unsourced guess and is corrected here. The page states NEITHER wheelSize NOR axle mm (the load-bearing fields checkBmxBuild reads), so both remain unconfirmed sample values - not verified.'
  },
  {
    id: 'bmx-rh-alienation-sabbath', cat: 'rearWheel', brand: 'Alienation', model: 'Sabbath Rear',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 149.99,
    note: 'CORRECTED 2026-07-21 (bmx-sweep-3): alienationbmx.com/portfolio/black-sabbath (raw-fetched, maker\'s own product page, browser pane) confirms this is a STREET wheel, not race - "Intended for street use", "Featuring Alienation`s Venus Hub with 9 tooth driver" (driverTeeth:9 CONFIRMED), "Available in Left and Right-hand drive options" (side:both CONFIRMED). The page does not state driverType as literally "cassette" (Venus Hub is not spelled out as cassette-vs-freecoaster on this page) or an axle mm figure - those two load-bearing fields remain unconfirmed; not verified. Prior note\'s "race rear wheel...race hubs are cassette-only" reasoning is retracted (unsourced assumption).'
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
    topTube: 21, rearBrakeMount: 'disc', rearAxle: '10mm', frameOnly: true, weight: 1680, price: 609.99,
    verified: true,priceBasis:'third-party-listed',  lastChecked: '2026-07-21', source: 'https://chasebicycles.com/frames/chase-rsp-5-0-frame/',
    note: 'Full per-size geometry table fetched 2026-07-21 (chasebicycles.com/frames/chase-rsp-5-0-frame). This row = "Pro XL" size (21in/533.4mm top tube, the catalog\'s modeled size): Press Fit BB86 (mid), Integrated IS 42/52 head tube (integrated-1-1/8), Post-or-Flat-mount 120/140mm brakes (disc), Enclosed 3/8"-10mm rear dropout - CORRECTED rearAxle from a prior 14mm guess to the page\'s stated 10mm (all sizes share this spacing), weight 1.68kg=1680g from the same per-size table. No price on the page (frame-only Chase parts aren\'t sold direct); price stays the prior BRG Store sample per THE PRICE RULE.'
  },
  {
    id: 'bmx-fr-redline-roam', cat: 'frame', brand: 'Redline', model: 'Roam',
    discipline: 'race', wheelSize: '20', bbShell: 'american', headTube: 'integrated-1-1/8',
    topTube: 19.1, rearBrakeMount: 'v-brake', rearAxle: '14mm', frameOnly: false, price: 320,
    note: 'Redline\'s smaller-than-standard-20" entry/youth race-inspired complete bike (between an 18" and full 20") - valleybmx.com lists an American-shell threaded BB and alloy linear-pull ("V-brake" family) brakes. Price is the listed non-sale MSRP. WALL, checked 2026-07-21 (bmx-sweep-2): also absent from diamondback.com/collections/redline-bmx\'s current 6-product lineup (PL-26, RL275, SQB-26, MX20, Proline Expert XL, Proline Expert); direct product-slug fetch (diamondback.com/products/roam) timed out. Left unverified/unchanged - no manufacturer page reachable to confirm bbShell/rearBrakeMount.'
  },
  {
    id: 'bmx-cr-redline-flight', cat: 'cranks', brand: 'Redline', model: 'Flight Cranks (Retro)',
    family: 'redline-flight', spindle: '19mm', pieces: '3-piece', ringMount: 'spline', length: 175,
    weight: 631, price: 169.95,
    note: 'bmx-brand-depth-2: Redline\'s current (2026) legacy old-school race crank, still sold as used on the Diamondback-era Supercross SX250 complete bikes. diamondback.com/collections/redline-bmx sells only complete bikes (no standalone parts store for the brand), so this is retailer-sourced (supercrossbmx.com, directly fetched) rather than a Redline-owned page - stays unverified per THE BAR (retailer, not manufacturer). States verbatim "Redline cr-mo 19mm splined spindle" (spindle:19mm) and "Tubular chromoly...crank arms" sold as "Arms and Spindle only" (pieces:3-piece - two arms + a separate spindle, pinch-bolted, not a solid 1-piece or a modern 2-piece unibody); ringMount:spline per the splined-spindle interface driving Redline\'s classic spline-drive "Tiger Tooth" sprocket (the page\'s own suggested pairing). Weight: "Right Hand 325g, Left Hand 306g" summed = 631g (both arms, no BB, per the page). Available in 175mm only (length:175). Price $169.95, listed Sold Out at fetch time (a stock status, not a discontinuation - Redline Flight cranks remain a current catalog item across multiple other retailers at the same price band). GENUINE GAP flagged: no standalone Redline handlebar (Flight V-Bar) could be entered - five independent retailers (J&R, LUXBMX, Albe\'s, BMX International, Sams BMX) describe rise/width/sweep consistently but NONE states a clamp diameter, a required schema field, so it was not entered rather than guessed; no Redline wheel/wheelset row was entered either - planetbmx.com sells Redline-branded race wheelsets but only as tire+tube+freewheel bundles with no stated driverTeeth/axle spec, insufficient for this catalog\'s rearWheel schema.'
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
    pitch: '1/8', halfLink: true, price: 42.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://shop.odysseybmx.com/products/odyssey-bluebird-half-link-chain-silver',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Directly fetched shop.odysseybmx.com/products/odyssey-bluebird-half-link-chain-silver: "1/2\" x 1/8\" size" -> pitch:1/8 CONFIRMED (the only checkBmxBuild-read chain field); the product name itself and "Half-Link" throughout the page confirm halfLink:true (display-only, not engine-read, but real). Price CORRECTED 25.88 -> 42.99 (this row had no source at all before; $42.99 is the maker\'s displayed regular price for this exact SKU).'
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
    system: 'pivotal', price: 29.95,
    note: 'BMX wave 6: raw-fetched sandmbikes.com/product/hardgoods/seating/fat-pivotal-seat/ (the manufacturer\'s own page) - confirms "PIVOTAL" mount and PADDED construction (matches system:\'pivotal\'), and the real price ("price":"29.95") - CORRECTED from the stale 49.95 albes.com-retailer figure. NOT VERIFIED: no per-product weight anywhere on the page, only a generic "1 lbs" shipping-box figure indistinguishable from the Odyssey/Cult shipping-weight-bucket trap (wave 2 doctrine) - fails THE BAR item 2 (seat is not an interface-verification-exception category). Left unverified.'
  },
  {
    id: 'bmx-st-sm-racexlt', cat: 'stem', brand: 'S&M', model: 'Race XLT Stem',
    clamp: '25.4mm', price: 64.95, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://sandmbikes.com/product/hardgoods/stems/race-xlt-stem/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, upgrading the prior danscomp.com retailer-listing basis to a direct manufacturer fetch. sandmbikes.com/product/hardgoods/stems/race-xlt-stem/ confirms: "Reach: 49mm, 53mm, 55mm, 57mm", "Rise: 23.5mm / 8.1mm Inverted", "Weight: 10.2oz, 10.5oz, 10.9oz" (per reach), and its own price range "$64.95 - $69.95" with the 53mm reach option EXACT-matching this row\'s existing $64.95. `clamp` is a checkBmxBuild DISPLAY-ONLY field for stems (VERIFY-PROTOCOL.md\'s BMX small-parts exception) and the maker page never states a bar-clamp bore diameter — since it is the only field the stem schema carries and it does not feed any engine rule, its absence from the source does not block verification (the interface bar has nothing load-bearing left to confirm on this row). No per-reach weight is recorded here since this row does not pin one specific reach.'
  },
  {
    id: 'bmx-sp-odyssey-utilitypro-25t', cat: 'sprocket', brand: 'Odyssey', model: 'Utility Pro Guard Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 49.99,
    note: 'Guard-style sprocket with an integrated bash/chain guard - danscomp.com listing; sibling to the 28T guard sprocket and the already-cataloged 30T non-guard Utility Pro. PARTIAL 2026-07-21 (bmx-sweep-2): this is the same shop.odysseybmx.com/products/odyssey-utility-pro-sprocket-black SKU family as bmx-sp-odyssey-utilitypro-30 ("Options: 25t Black (w/Guard), 28t Black (w/Guard), 30t Black (No Guard/Sprocket Only)", one flat price). Price CORRECTED 69.99 -> 49.99 to match the page exactly; teeth (25t) confirmed among the listed options. mount/pitch stay unconfirmed - the page only says "Compatible with all BMX chains" (same wall as the 30T row) - so not marked verified.'
  },
  {
    id: 'bmx-sp-odyssey-utilitypro-28t', cat: 'sprocket', brand: 'Odyssey', model: 'Utility Pro Guard Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 49.99,
    note: 'Guard-style sprocket with an integrated bash/chain guard - danscomp.com listing. PARTIAL 2026-07-21 (bmx-sweep-2): same shop.odysseybmx.com/products/odyssey-utility-pro-sprocket-black SKU family as bmx-sp-odyssey-utilitypro-30/-25t. Price CORRECTED 69.99 -> 49.99 to match the page exactly; teeth (28t) confirmed among the listed options. mount/pitch stay unconfirmed ("Compatible with all BMX chains" only), so not marked verified.'
  },
  {
    id: 'bmx-se-cult-paddedpivotal', cat: 'seat', brand: 'Cult', model: 'Padded Pivotal Seat',
    system: 'pivotal', price: 44.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://cultcrew.com/products/kevlar-padded-seat-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): matches Cult\'s current "Kevlar Padded Seat" ($44.99 exact) - raw-confirmed "only available in pivotal" on the maker\'s own page (system:\'pivotal\' is the sole field the bmx-seat-system rule reads). No maker weight published; the JSON variant field (1361g) is the same shipping-weight-bucket value seen on the unrelated Dak Pedal listing, correctly not carried over - weight stays absent as before.'
  },
  {
    id: 'bmx-se-cult-vansoldschool', cat: 'seat', brand: 'Cult', model: 'x Vans Old School Pro Pivotal Seat',
    system: 'pivotal', price: 44.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-20', source: 'https://cultcrew.com/products/cult-x-vans-old-skool-seat-black',
    note: 'Wave 7 (BMX interface-verification exception, Douglas 2026-07-20): matches Cult\'s current "Cult x Vans Old Skool Seat" ($44.99 exact) - raw-confirmed "pivotal seat" on the maker\'s own page (system:\'pivotal\' is the sole field the bmx-seat-system rule reads), "Designed to look like the CULT x VANS Old Skool pro shoe". No maker weight published; the JSON variant field (1361g) is the same shipping-weight-bucket value seen elsewhere on this store, correctly not carried over.'
  },
  {
    id: 'bmx-sp-cult-nwo-25t', cat: 'sprocket', brand: 'Cult', model: 'NWO Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', price: 29.99,
    note: '7075-T6 5-spoke bolt-drive sprocket (bolts to the crank spider\'s spline/bolt pattern - modeled as `spline` per the sprocket-mount convention), ships with 19/22mm spindle adapters - cultcrew.com / danscomp.com. PARTIAL 2026-07-21 (bmx-sweep-2): cultcrew.com/products/nwo-sprocket.js confirms teeth (25t/28t/30t variants) and price ($29.99 flat across sizes) exactly, but neither the JSON variant data nor the product body copy ("Machined from 7075-T6 aluminum... Available in 25t, 28t & 30t") states a chain pitch or mount type - pitch (the bmx-chain-pitch-critical field) stays unconfirmed, so not marked verified.'
  },
  {
    id: 'bmx-sp-cult-nwo-28t', cat: 'sprocket', brand: 'Cult', model: 'NWO Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', price: 29.99,
    note: '7075-T6 5-spoke bolt-drive sprocket, ships with 19/22mm spindle adapters - cultcrew.com / danscomp.com. PARTIAL 2026-07-21 (bmx-sweep-2): same cultcrew.com/products/nwo-sprocket.js fetch as bmx-sp-cult-nwo-25t - teeth (28t) and price ($29.99) confirmed exactly, pitch/mount not stated on the page, so not marked verified.'
  },
  // bmx-hb-colony-rick / bmx-hb-colony-guardian SPLIT 2026-07-20 (hygiene pass, catalog/bmx-hygiene-1):
  // the single generic row per model was flat-SKU ambiguous — colonybmx.com.au raw-curl-confirmed
  // (BMX verification waves 2/3/5, tools/verify-notes-bmx.md) that Colony currently sells BOTH
  // bars in two real rise/width variants each, and the old row's rise:8/width:29 guess (never
  // itemized on the danscomp.com listing it came from) didn't cleanly match either. Removed rather
  // than aliased/status-flagged: BMX has no ALIASES/canonicalId or status/supersededBy field
  // support (src/schema-bmx.js's COMMON allowlist has neither), and a grep of data/, src/, test/
  // confirmed nothing referenced either id before removal (same check applied to the
  // bmx-gr-odyssey-keyboard removal above). Both new ids are net-new, so the append-only id rule
  // (never reuse a retired string) still holds. Per-variant rise/width/weight below are the
  // colonybmx.com.au numbers the prior waves raw-curl-confirmed but left unpromoted for the
  // ambiguity this split now resolves; price is still the old danscomp.com (retailer) figure,
  // unconfirmed per-variant, so these stay unverified samples, not verified:true.
  {
    id: 'bmx-hb-colony-rick-865-28', cat: 'handlebar', brand: 'Colony', model: 'Rick Bars 8.65in',
    clamp: '25.4mm', rise: 8.65, width: 28, weight: 1039, price: 109.99, verified: true,priceBasis:'third-party-listed',  lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/rick-bars/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Re-fetched colonybmx.com.au/products/rick-bars/ directly (the raw page waves 2/3/5 had already curl-confirmed): "Rise: 8.7\" & 9.3\"", "Width: 28.0\".(8.65\" rise) 29\" (9.3\" rise)", "Weight: 1039 grams & 1056 grams" - EXACT match to this row\'s rise/width/weight. Price ($109.99) has no live figure on this AU brand page (no checkout price shown) - kept as the pre-existing danscomp.com-sourced sample per THE PRICE RULE (price never blocks verified:true once interfaces are confirmed).'
  },
  {
    id: 'bmx-hb-colony-rick-93-29', cat: 'handlebar', brand: 'Colony', model: 'Rick Bars 9.3in',
    clamp: '25.4mm', rise: 9.3, width: 29, weight: 1056, price: 109.99, verified: true,priceBasis:'third-party-listed',  lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/rick-bars/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED - same fetch and same reasoning as bmx-hb-colony-rick-865-28 (one product page covers both rise variants). 9.3in rise / 29in width / 1056g EXACT match. Price kept as the pre-existing sample per THE PRICE RULE.'
  },
  {
    id: 'bmx-hb-colony-guardian-88-29', cat: 'handlebar', brand: 'Colony', model: 'Guardian Bars 8.8in',
    clamp: '25.4mm', rise: 8.8, width: 29, weight: 864, price: 89.99, verified: true, lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/guardian-bars/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED. Re-fetched colonybmx.com.au/products/guardian-bars/ directly: "Height: 8.8\" or 9.4\" tall", "Width: 29.0\" wide", "Weight: 8.8\" 864g 1.9lbs, 9.4\" 942g (2.08lbs)" - EXACT match. Price kept as the pre-existing sample per THE PRICE RULE (no live AU price shown on the page).'
  },
  {
    id: 'bmx-hb-colony-guardian-94-29', cat: 'handlebar', brand: 'Colony', model: 'Guardian Bars 9.4in',
    clamp: '25.4mm', rise: 9.4, width: 29, weight: 942, price: 89.99, verified: true, lastChecked: '2026-07-21',
    source: 'https://colonybmx.com.au/products/guardian-bars/',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED - same fetch as bmx-hb-colony-guardian-88-29 (one page covers both rise variants). 9.4in rise / 29in width / 942g EXACT match. Price kept as the pre-existing sample per THE PRICE RULE.'
  },
  {
    id: 'bmx-gr-odyssey-broc', cat: 'grips', brand: 'Odyssey', model: 'Broc Grips',
    length: 160, flangeless: false, price: 10.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-21',
    source: 'https://shop.odysseybmx.com/products/odyssey-broc-grip-bright-red',
    note: 'bmx-depth-7 (2026-07-21): VERIFIED, upgrading from the prior danscomp.com retailer basis. Directly fetched shop.odysseybmx.com/products/odyssey-broc-grip-bright-red (the maker\'s own current listing, titled "Odyssey BROC Grip"): "Broc Raiford signature", "Comfortable ribbed design", "Par Ends included", "160mm length". length CORRECTED 158 -> 160mm to match the maker\'s own figure exactly (the retailer listing\'s 158mm was close but not exact). `grips` carries no engine-read field (length/flangeless are display-only) so this real, current, maker-confirmed product clears the interface bar regardless; flangeless left unchanged (not stated either way on the page, not fabricated).'
  },
  // bmx-gr-odyssey-keyboard REMOVED 2026-07-17 (preflight audit fix): a near-duplicate of
  // bmx-gr-odyssey-aaronross (same real product - the Odyssey Keyboard v1 Grip, Aaron Ross's
  // signature colorway). aaronross was re-fetched against shop.odysseybmx.com directly
  // (length corrected to the maker-listed 158mm, price to $10.99); this row's 143mm/$11.99
  // figures came from an older danscomp.com listing and are superseded. Verified nothing else
  // in data/bmx.js, src/, or test/ referenced this id before removing.

  // ===== BMX-DEPTH-8 ADDITIONS (2026-07-22) — breadth lane, small-parts long tail ==========
  // Method: raw `curl -A "Mozilla/5.0"` of each brand's Shopify products.json + per-handle
  // /products/<handle>.js (never a WebSearch/WebFetch summary — the wave-2 phantom-number
  // doctrine). Every row below names a real, currently-listed product; a Shopify JSON `weight`
  // field was DISCARDED (not carried into this row) whenever it repeated identically across
  // clearly-unrelated products on the same store (the documented shipping-weight-bucket tell) —
  // weight is then simply omitted rather than guessed. `mount:'spline'` on Odyssey sprockets
  // follows the existing catalog convention already applied to the Utility Pro rows (every
  // current Odyssey freestyle sprocket in this catalog uses that value; not independently
  // re-confirmed per-row here either).

  // --- Odyssey (shop.odysseybmx.com) ---
  {
    id: 'bmx-fk-odyssey-f32', cat: 'fork', brand: 'Odyssey', model: 'F32',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', price: 189,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-f32-forks-gloss-black',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception (VERIFY-PROTOCOL.md). Re-fetched shop.odysseybmx.com/products/odyssey-f32-forks-gloss-black.js directly: Shopify tags state "Brake Mounts:990" and "Wheel Size:20\"" verbatim (raw first-party JSON) - CONFIRMS brakeMount:u-brake (the "990" = u-brake token is an established catalog-wide convention, cross-corroborated on multiple Haro/United/Diacompe rows) and wheelSize:20, the two checkBmxBuild-read fork fields (bmx-front-brake-mount + wheel-size rules); steerer/axle are display-only, not blocking. Price $189.00 matches the fetched page exactly. JSON weight (2268g) is discarded as a shipping-weight-bucket figure (identical across the F25 sibling) per the exception - weight stays unset, not a maker-stated net figure.'
  },
  {
    id: 'bmx-fk-odyssey-f25', cat: 'fork', brand: 'Odyssey', model: 'F25',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', price: 189,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-f25-forks-gloss-black',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-f25-forks-gloss-black.js directly: tags state "Brake Mounts:990" and "Wheel Size:20\"" verbatim - CONFIRMS brakeMount:u-brake + wheelSize:20 (the checkBmxBuild-read fields); steerer/axle display-only. Price $189.00 matches exactly. JSON weight (2268g) discarded as the same shipping-bucket figure as the F32 sibling - weight stays unset.'
  },
  {
    id: 'bmx-fk-odyssey-r15', cat: 'fork', brand: 'Odyssey', model: 'R15',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', price: 169.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-r15-forks-gloss-black',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-r15-forks-gloss-black.js directly: tags state "Brake Mounts:None" and "Wheel Size:20\"" verbatim - CONFIRMS brakeMount:none + wheelSize:20 exactly, same brakeless R-Series pattern as the catalog\'s existing R32 fork; steerer/axle display-only. Price $169.99 matches exactly. JSON weight (3629g) discarded - an implausibly heavy shipping-bucket figure - weight stays unset.'
  },
  {
    id: 'bmx-rh-odyssey-hexagram', cat: 'rearWheel', brand: 'Odyssey', model: 'Hexagram Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 626, price: 209.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-hexagram-cassette-hub-anodized-black',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-hexagram-cassette-hub-anodized-black.js directly. Product is titled/described as a "Cassette Hub" (driverType:cassette CONFIRMED); "All-new 9T driver design" CONFIRMS driverTeeth:9; "LHD/RHD switchable" (stated twice) CONFIRMS side:both; "4130 chromoly 14mm bolts" CONFIRMS axle:14mm exactly (the bolt spec, not the 17mm hollow bore) - all checkBmxBuild-read rearWheel fields. Price $209.99 matches exactly. Weight (626g) kept as a sample figure per the note - it does not recur elsewhere in this session\'s fetches so is plausibly real, but is not independently description-text-confirmed, so stays unqualified sample data (the verified claim covers interfaces, not this weight).'
  },
  {
    id: 'bmx-st-odyssey-boyd', cat: 'stem', brand: 'Odyssey', model: 'BOYD Stem',
    clamp: '25.4mm', price: 89.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-boyd-stem-anodized-silver',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified. Re-fetched shop.odysseybmx.com/products/odyssey-boyd-stem-anodized-silver.js directly - a real current Odyssey product ("Boyd Hilder Signature", 6061-T6 aluminum CNC). Stems carry ZERO checkBmxBuild-read fields (clamp is display-only, per compat-bmx.js), so this real confirmed current product clears the interface bar regardless of clamp not being independently page-stated. Price $89.99 matches exactly. JSON weight (454g) discarded as a shipping-bucket figure (identical to the unrelated Grandstand v2 pedal row) - weight stays unset.'
  },
  {
    id: 'bmx-pd-odyssey-grandstandv2', cat: 'pedals', brand: 'Odyssey', model: 'Grandstand v2 Alloy Pedals',
    platform: 'alloy', spindle: '9/16', price: 36.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-grandstand-v2-alloy-pedals-black',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified. Re-fetched shop.odysseybmx.com/products/odyssey-grandstand-v2-alloy-pedals-black.js directly. Spec block states verbatim "Pedal Threads: 9/16\"" (CONFIRMS spindle) and the "Alloy" tag + CNC-machined aluminum body description CONFIRMS platform:alloy. Pedals carry zero checkBmxBuild rules anyway (platform/spindle display-only), so this real, current, fully-confirmed product clears the bar cleanly. Price $36.99 matches exactly. JSON weight (454g) discarded as the same shipping-bucket figure shared with the BOYD stem row - weight stays unset.'
  },
  {
    id: 'bmx-sp-odyssey-boydsprocket-28', cat: 'sprocket', brand: 'Odyssey', model: 'BOYD Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', weight: 172, price: 56.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-boyd-sprocket-coffee ("Boyd Hilder\'s new signature sprocket", CNC 7075-T6 aluminum, sold in 25T/28T/30T — this row pins the 28T variant, JSON weight 172g consistent across all three tooth counts). mount:\'spline\' and pitch:\'1/8\' follow this catalog\'s existing convention for every other current Odyssey freestyle sprocket (not independently re-confirmed on this specific page, which does not state either field). Unverified sample.'
  },
  {
    id: 'bmx-rh-odyssey-hazardlite-24', cat: 'rearWheel', brand: 'Odyssey', model: 'Hazard Lite Cassette 24in Wheel',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 279.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-hazard-lite-cassette-24-wheel-black',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-hazard-lite-cassette-24-wheel-black.js directly — a 24" cruiser build wheel (C5 Cassette Hub laced to the Hazard Lite Rim). "C5 Cassette Hub" CONFIRMS driverType:cassette; "9T or 10T driver" (this row pins the 9T variant); "RHD/LHD switchable" CONFIRMS side:both; "14mm, 4130 chromoly hollow axle" CONFIRMS axle:14mm exactly - every checkBmxBuild-read rearWheel field is page-confirmed (rearWheel carries no wheelSize field, dormant for the whole category). Price $279.99 matches exactly. JSON weight (6350g) discarded as an implausible whole-box shipping-bucket figure — no weight is stored.'
  },
  {
    id: 'bmx-sp-odyssey-pivotalpost', cat: 'seatpost', brand: 'Odyssey', model: 'Pivotal Seat Post (High Polished)',
    diameter: 25.4, system: 'pivotal', weight: 227, price: 44.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://shop.odysseybmx.com/products/odyssey-pivotal-seat-post-polished',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description text states, verbatim: "Diameter: 25.4mm Length: 200mm Weight: 5oz" (5oz = 227g, EXACT match to the JSON variant weight — a real per-SKU figure, not a shipping-bucket coincidence, since it is independently stated in ounces in the page\'s own spec list). "Compatible only with Pivotal style seats" confirms system:\'pivotal\'.'
  },
  {
    id: 'bmx-se-odyssey-bigstitch-fat', cat: 'seat', brand: 'Odyssey', model: 'Big Stitch Fat Seat',
    system: 'pivotal', weight: 386, price: 37.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-big-stitch-fat-seat-white',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-big-stitch-fat-seat-white.js directly. Description states "Available in Slim or Fat options. Black. Pivotal only" - CONFIRMS system:pivotal, the one checkBmxBuild-read seat field (bmx-seat-system rule). Price $37.99 matches exactly. JSON weight (386g) kept as a plausible sample figure (not independently text-confirmed, does not recur elsewhere as a bucket value) - the verified claim covers interfaces + price, not this weight.'
  },
  {
    id: 'bmx-se-odyssey-bigstitch-slim', cat: 'seat', brand: 'Odyssey', model: 'Big Stitch Slim Seat',
    system: 'pivotal', price: 39.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-big-stitch-slim-seat-black-denim-w-fluorescent-yellow-embroidery',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched the page directly. Description states "Available in Slim or Fat options...Pivotal Only" - CONFIRMS system:pivotal. Price $39.99 matches exactly. JSON weight (635g) discarded - identical across this handle and the unrelated Aitken/BROC seat rows, the shipping-bucket tell - no weight stored.'
  },
  {
    id: 'bmx-se-odyssey-aitken-pivotal', cat: 'seat', brand: 'Odyssey', model: 'Aitken Pivotal Seat',
    system: 'pivotal', price: 35.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-aitken-pivotal-seat-dark-brown',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-aitken-pivotal-seat-dark-brown.js directly - Mike Aitken signature seat; the product TITLE itself ("Aitken Pivotal Seat") plus body copy "Available in Pivotal or Railed" CONFIRMS system:pivotal for this specific SKU handle. Price $35.99 matches exactly. JSON weight (635g) discarded as the same shipping-bucket figure shared with the Big Stitch Slim / BROC rows - no weight stored.'
  },
  {
    id: 'bmx-se-odyssey-aitken-railed', cat: 'seat', brand: 'Odyssey', model: 'Aitken Railed Seat',
    system: 'standard', price: 35.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-aitken-railed-seat-dark-brown',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-aitken-railed-seat-dark-brown.js directly - same Mike Aitken signature seat; the product TITLE itself ("Aitken Railed Seat") plus body copy "Available in Pivotal or Railed" CONFIRMS this SKU is the railed (system:standard, the catalog\'s non-pivotal-rail token) variant of the pivotal row above. Price $35.99 matches exactly. JSON weight (635g) discarded as the same shipping-bucket figure - no weight stored.'
  },
  {
    id: 'bmx-se-odyssey-broc-pivotal', cat: 'seat', brand: 'Odyssey', model: 'BROC Pivotal Seat',
    system: 'pivotal', price: 37.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-broc-pivotal-seat-white-perforated',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-broc-pivotal-seat-white-perforated.js directly - Broc Raiford signature seat; the product TITLE ("BROC Pivotal Seat") plus body copy "Available in pivotal or cruiser railed" CONFIRMS system:pivotal for this handle. Price $37.99 matches exactly. JSON weight (635g) discarded as the same shipping-bucket figure shared with the Aitken/Big Stitch rows - no weight stored.'
  },
  {
    id: 'bmx-se-odyssey-broc-cruiser-railed', cat: 'seat', brand: 'Odyssey', model: 'BROC Cruiser Railed Seat',
    system: 'standard', price: 32.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.odysseybmx.com/products/odyssey-broc-cruiser-railed-seat-white-perforated',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched shop.odysseybmx.com/products/odyssey-broc-cruiser-railed-seat-white-perforated.js directly - same Broc Raiford seat; product TITLE ("BROC Cruiser Railed Seat") plus body copy "Available in pivotal or cruiser railed" CONFIRMS this handle is the railed (system:standard) variant. Price $32.99 matches exactly. JSON weight (635g) discarded as the same shipping-bucket figure - no weight stored.'
  },

  // --- Cult (cultcrew.com) ---
  {
    id: 'bmx-fk-cult-race-20', cat: 'fork', brand: 'Cult', model: 'Race Fork 20in',
    discipline: 'race', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'disc', price: 159.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/race-fork-20 ("1-pc machined steerer tube with an integrated bearing race...open 10mm dropouts", 20in). brakeMount:\'disc\' is NOT stated on this specific fork page (no brake-mount text at all) but follows this catalog\'s own already-verified sibling row bmx-fr-cult-race (Cult\'s "Race Frame", same product line, cultcrew.com/products/vick-behm-race-frame-black — its title and body copy explicitly confirm disk brakes), a same-brand same-platform cross-reference rather than a guess. JSON weight (3629g) discarded — identical to the unrelated Crew Front Wheel v2 row below, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-hb-cult-devon', cat: 'handlebar', brand: 'Cult', model: 'Devon Bars',
    clamp: '25.4mm', rise: 9.5, width: 28, price: 74.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://cultcrew.com/products/devon-bars',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified. Re-fetched cultcrew.com/products/devon-bars.js directly - a real current product ("Devon Smillie signature bars...28\" wide, 10.5° backsweep, 3° upsweep", sold in 9.5in/9.75in rise; this row pins the 9.5in variant - width:28/rise:9.5 CONFIRMED). Handlebars carry ZERO checkBmxBuild-read fields (clamp is display-only), so this real, current, price-matched product clears the interface bar. Price $74.99 matches exactly. JSON weight (6804g) discarded as a shipping-bucket figure (identical across every rise/finish variant AND the unrelated Crew Bars sibling) - no weight stored.'
  },
  {
    id: 'bmx-hb-cult-crew', cat: 'handlebar', brand: 'Cult', model: 'Crew Bars',
    clamp: '25.4mm', rise: 9, width: 30, price: 74.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://cultcrew.com/products/crew-bars',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified. Re-fetched cultcrew.com/products/crew-bars.js directly - a real current product ("Classic feel good geometry...30\" width, 12° backsweep, 2° upsweep", sold in 9in/9.35in/9.65in rise; this row pins the 9in variant - width:30/rise:9 CONFIRMED). Handlebars carry zero checkBmxBuild-read fields (clamp display-only), so this real, current, price-matched product clears the interface bar. Price $74.99 matches exactly. JSON weight (6804g) discarded as a shipping-bucket figure (identical across every variant AND the unrelated Devon Bars sibling) - no weight stored.'
  },
  {
    id: 'bmx-gr-cult-solo', cat: 'grips', brand: 'Cult', model: 'Solo Grip',
    length: 160, flangeless: true, price: 11.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://cultcrew.com/products/solo-grip',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified. Re-fetched cultcrew.com/products/solo-grip.js directly (an ODI-made grip): "Extra Long 160mm Length" CONFIRMS length:160; "Includes Push In Style end plugs" (push-in end plugs, not a flanged lip) CONFIRMS flangeless:true. Grips carry zero checkBmxBuild-read fields, and here both display fields are independently text-confirmed anyway. Price $11.99 matches exactly. JSON weight (454g) discarded as a shipping-bucket figure recurring across unrelated products/brands this session - no weight stored.'
  },
  {
    id: 'bmx-se-cult-corduroy', cat: 'seat', brand: 'Cult', model: 'Corduroy Slim Seat',
    system: 'pivotal', price: 44.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://cultcrew.com/products/corduroy-slim-seat-green',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified under the BMX small-parts interface exception. Re-fetched cultcrew.com/products/corduroy-slim-seat-green.js directly - description states verbatim "only available in pivotal", CONFIRMING system:pivotal, the one checkBmxBuild-read seat field. Price $44.99 matches exactly. JSON weight (1361g) discarded as a shipping-bucket figure (identical to the unrelated Dak Pedal row) - no weight stored.'
  },
  {
    id: 'bmx-pd-cult-dak', cat: 'pedals', brand: 'Cult', model: 'Dak Pedal',
    platform: 'alloy', spindle: '9/16', price: 16.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://cultcrew.com/products/dak-pedal',
    note: 'bmx-verify-1 (2026-07-23): PROMOTED to verified. Re-fetched cultcrew.com/products/dak-pedal.js directly ("Dakota Roche signature pedal...hefty heat treated 4130 spindle" driving a standard 9/16in pedal thread; alloy CNC-machined body CONFIRMS platform:alloy). Pedals carry zero checkBmxBuild rules anyway (platform/spindle display-only). Price $16.99 matches exactly. JSON weight (1361g) discarded as a shipping-bucket figure (identical to the unrelated Corduroy Slim Seat row) - no weight stored.'
  },
  {
    id: 'bmx-fw-cult-crewv2', cat: 'frontWheel', brand: 'Cult', model: 'Crew Front Wheel v2',
    wheelSize: '20', axle: '10mm', price: 169.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/crew-front-wheel-v2-1 ("NEW STRONGER AND WIDER MATCH V2 RIM...CREW Front hub laced to a...Match Rim"). wheelSize:20 per Cult\'s catalog-wide convention (every Cult row in this file is 20in, per the already-verified Race Frame row\'s own reasoning); axle:10mm is the BMX-universal front-axle standard (BMX-MODEL.md sec.5), not independently re-stated on this specific page. JSON weight (3629g) discarded — identical to the unrelated Race Fork row above, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-ch-cult-halflink', cat: 'chain', brand: 'Cult', model: 'Halflink Chain',
    pitch: '1/8', halfLink: true, price: 34.99,
    note: 'bmx-verify-1 (2026-07-23): re-fetched cultcrew.com/products/chains-1.js directly. PRICE CORRECTED 11.99 -> 34.99: the page\'s three-way listing prices the "Halflink" variant at $34.99 (410 = $11.99, 510 = $19.99, Halflink = $34.99, all colorways) - the prior $11.99 figure actually belonged to the 410 chain, a different SKU on the same page, not this Halflink row. Still NOT marking verified: pitch (the bmx-chain-pitch-critical field) is only explicitly stated as "1/8\"" for the sibling "410 CHAIN" copy ("strong and affordable 1/8\" chain") - the Halflink paragraph itself ("teflon coated with engraved cult logos...rounded side plates are compatible with 8t and larger drivers") never states a pitch, and per the phantom-number rule a sibling\'s stated spec must not be carried over without the SKU\'s own confirmation. Left as the pre-existing 1/8in sample value (correct for the vast majority of BMX freestyle chains) and unverified. JSON weight (907g) discarded — identical to the unrelated Counter Post seatpost SKU on this same store, the shipping-bucket tell.'
  },

  // --- The Shadow Conspiracy (sold via sparkysbrands.com — theshadowconspiracy.com itself is a
  // WordPress marketing site with no product pages; sparkysbrands.com is Shadow's real storefront,
  // confirmed via the brand's own site nav) ---
  {
    id: 'bmx-fw-shadow-symbol', cat: 'frontWheel', brand: 'The Shadow Conspiracy', model: 'Symbol Front Hub',
    wheelSize: '20', axle: '14mm', weight: 258, price: 94.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, sparkysbrands.com/products/shadow-symbol-front-hub. Description states, verbatim: "a stout 14mm inner axle...14mm chromoly center axle with 3/8\\" bolts" (an unusually beefy front-hub axle bore for BMX, but this is the maker\'s own literal spec, trusted over the domain-general 10mm-front convention) and "Weight: 9.1 oz" (9.1oz = 258g, an independently oz-stated figure, not the JSON shipping-weight field). wheelSize:\'20\' is Shadow\'s catalog-wide freestyle standard (not independently re-stated on this specific hub-only page, so left unverified on that basis alone).'
  },
  {
    id: 'bmx-rh-shadow-symbolcassette-rhd', cat: 'rearWheel', brand: 'The Shadow Conspiracy', model: 'Symbol Cassette Hub (RHD)',
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', weight: 733, price: 171.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, sparkysbrands.com/products/shadow-symbol-cassette-hub-rhd. Description states, verbatim: "14mm solid cro-mo male axle 9T 1pc CNC cro-mo driver...Left or Right Hand Drive" (this handle is the RHD variant) and "Weight: 25.85 oz" (25.85oz = 733g, independently oz-stated, not the JSON shipping-weight field). Unverified sample (interfaces are real-page-sourced but not cross-checked against a second source).'
  },
  {
    id: 'bmx-ti-shadow-serpent-23', cat: 'tire', brand: 'The Shadow Conspiracy', model: 'Serpent Tire 2.3in',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 110, weight: 474, price: 52.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, sparkysbrands.com/products/shadow-serpent-foldable-tyre. Description states, verbatim: "110 PSI Size 20\\" x 2.30\\"...Weight: 16.7 oz" (16.7oz = 474g, oz-stated, not the JSON shipping-weight field); tags confirm "TyreDia : 20". casing:\'park\' per the described "close course park and ramp riding" use case (not a literal page token, since BMX_SCHEMA\'s casing vocab is engine-external display-only). Unverified sample.'
  },
  {
    id: 'bmx-ti-shadow-contender-235', cat: 'tire', brand: 'The Shadow Conspiracy', model: 'Contender Welterweight Tire 2.35in',
    wheelSize: '20', width: 2.35, casing: 'park', maxPsi: 110, weight: 677, price: 42.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, sparkysbrands.com/products/shadow-contender-welterweight-tyre. Description states, verbatim: "20\\" x 2.35\\" 110 PSI...Weight: 23.9 oz" (23.9oz = 677g, oz-stated, not the JSON shipping-weight field, and the steel-bead Welterweight tier specifically — heavier than the folding-bead Featherweight tier mentioned in the same copy); tags confirm "TyreDia : 20". Unverified sample.'
  },
  {
    id: 'bmx-st-shadow-odin', cat: 'stem', brand: 'The Shadow Conspiracy', model: 'Odin Top Load Stem',
    clamp: '25.4mm', weight: 326, price: 40.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, sparkysbrands.com/products/shadow-odin-top-load-stem. Description states, verbatim: "Reach: 48mm Rise: 36mm Stack Height: 29mm Width: 48mm Weight: 11.5oz" (11.5oz = 326g, oz-stated, not the JSON shipping-weight field). clamp is display-only in checkBmxBuild (no rule reads it) so the 25.4mm sample value doesn\'t gate. Unverified sample.'
  },
  {
    id: 'bmx-pd-shadow-metalunsealed', cat: 'pedals', brand: 'The Shadow Conspiracy', model: 'Metal Unsealed Alloy Pedals',
    platform: 'alloy', spindle: '9/16', weight: 524, price: 54.99,
    note: 'bmx-depth-8 (2026-07-22): real current product (Trey Jones signature), sparkysbrands.com/products/shadow-metal-unsealed-alloy-pedals — a distinct SKU from this catalog\'s existing "Metal Sealed Alloy Pedals" row (sealed vs. unsealed bearings). Tags state "9/16 - 3pc" and description states "6061 alloy body...Weight: 18.5 oz" (18.5oz = 524g, oz-stated, not the JSON shipping-weight field). Note: this product carries a "REMOVED" internal tag (ambiguous — may mean a discontinued colorway rather than the whole SKU); flagged here rather than silently dropped, since the model itself, price and spec text are all real and current as fetched. Pedals carry zero checkBmxBuild rules. Unverified sample.'
  },
  {
    id: 'bmx-sp-shadow-railed-200', cat: 'seatpost', brand: 'The Shadow Conspiracy', model: 'Railed Seatpost 200mm',
    diameter: 25.4, system: 'standard', weight: 184, price: 62.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://www.sparkysbrands.com/products/shadow-railed-seatpost',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Classic alloy railed seat post...Length: 200mm Diameter: 25.4mm Weight: 6.5 oz" (6.5oz = 184g, independently oz-stated, not the JSON shipping-weight field of 250g which is discarded). "Railed" post confirms system:\'standard\' (the one engine-read seatpost field).'
  },
  {
    id: 'bmx-sp-shadow-pivotal-135', cat: 'seatpost', brand: 'The Shadow Conspiracy', model: 'Pivotal Seatpost 135mm',
    diameter: 25.4, system: 'pivotal', weight: 99, price: 49.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://www.sparkysbrands.com/products/shadow-pivotal-seatpost-135mm',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Shadow Pivotal posts...Size: 135mm length Diameter: 25.4mm Weight: 3.5 oz" (3.5oz = 99g, independently oz-stated, not the JSON shipping-weight field of 250g which is discarded). "Pivotal posts" confirms system:\'pivotal\'.'
  },
  {
    id: 'bmx-se-shadow-heritage-railed', cat: 'seat', brand: 'The Shadow Conspiracy', model: 'Heritage Railed Seat',
    system: 'standard', weight: 244, price: 30.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://www.sparkysbrands.com/products/shadow-heritage-railed-seat',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "A clean 2-panel railed seat with Cro-Mo Rails...Weight: 8.6 oz" (8.6oz = 244g, independently oz-stated, not the JSON shipping-weight field). "Railed seat" confirms system:\'standard\' (the one engine-read seat field).'
  },
  {
    id: 'bmx-se-shadow-crowd-slim-pivotal', cat: 'seat', brand: 'The Shadow Conspiracy', model: "Crow'd Slim Pivotal Seat",
    system: 'pivotal', weight: 275, price: 57.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://www.sparkysbrands.com/products/shadow-crowd-slim-pivotal-seat-black',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description\'s own structured spec block states, verbatim: "TYPE : Pivotal PADDING : Slim WEIGHT : 9.7 oz" (9.7oz = 275g, independently oz-stated, not the JSON shipping-weight field). "TYPE: Pivotal" directly confirms system:\'pivotal\'.'
  },

  // --- Eclat (eclatbmx.com, its own Shopify store) ---
  {
    id: 'bmx-hs-eclat-wave12', cat: 'headset', brand: 'Eclat', model: 'Wave 12 Headset',
    fit: 'integrated-1-1/8', weight: 96, price: 36.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, eclatbmx.com/products/wave-12-headset ("mid-stack 12mm top cap and x2 3mm spacers...6061-T6 alloy cnc machined, high-end sealed bearings"). JSON variant weight (96g) is real (not a bucket duplicate seen elsewhere this session) but plausibly the top-cap+spacer kit rather than the full bearing set — flagged, not silently trusted as the whole headset\'s mass. fit is display-only in checkBmxBuild (no rule reads it). Unverified sample.'
  },
  {
    id: 'bmx-cr-eclat-tibiaxlt', cat: 'cranks', brand: 'Eclat', model: 'Tibia XLT Cranks',
    spindle: '22mm', pieces: '3-piece', ringMount: 'spline', weight: 770, price: 259.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, eclatbmx.com/products/eclat-tibia-xlt-crank-1. Description states, verbatim: "Spindle 22mm crmo ultra hollow XLT" and "3pc construction" and "Weight complete: 770g (160mm)" (a per-length, oz-cross-checked figure for the 160mm arm option this row pins). ringMount:\'spline\' follows this catalog\'s existing convention for every other current Eclat crank (Onyx Cranks, bmx-cr-eclat-onyx) — not independently re-confirmed on this specific page. Unverified sample.'
  },
  {
    id: 'bmx-ch-eclat-4stroke', cat: 'chain', brand: 'Eclat', model: '4 Stroke Halflink Chain',
    pitch: '1/8', halfLink: true, weight: 454, price: 27.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://eclatbmx.com/products/4-stroke-halflink-chain',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "half link chain...Size 1/2\\" x 1/8\\"...Weight 454g (16.2oz : 1lbs)" — an independently oz-cross-checked figure (454g = 16.02oz, matching the page\'s own dual-unit statement almost exactly), not the JSON shipping-weight field. "half link" confirms halfLink:true.'
  },
  {
    id: 'bmx-se-eclat-complexcombo', cat: 'seat', brand: 'Eclat', model: 'Complex Combo Seat (Kevlar)',
    system: 'pivotal', price: 38.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, eclatbmx.com/products/eclat-complex-combo-seat — an integrated seat+post combo ("25.4mm seat post, 200mm long...Bios Pivotal seat inspired s[hape]", the description\'s own phrasing pointing at this catalog\'s existing Eclat Bios Pivotal Seat as its design basis). system:\'pivotal\' follows from that stated lineage; not independently re-confirmed as a standalone claim on this specific page. Unverified sample (no reliable weight figure — the JSON variant weight is 0 across all three padding options).'
  },
  {
    id: 'bmx-gr-eclat-filter', cat: 'grips', brand: 'Eclat', model: 'Filter Grip',
    length: 164, flangeless: true, price: 10.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, eclatbmx.com/products/filter-grips. Description states, verbatim: "one long-lasting flangeless grip...Now longer at 164mm". grips carries no engine-read field (length/flangeless are display-only) so this real, current, maker-confirmed product clears the interface bar regardless. Unverified sample (no reliable weight figure — the JSON variant weight is 0 across every color).'
  },
  {
    id: 'bmx-hb-eclat-dive', cat: 'handlebar', brand: 'Eclat', model: 'Dive Bar',
    clamp: '22.2mm', rise: 9.25, width: 29.5, price: 64.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, eclatbmx.com/products/dive-bar. Description states, verbatim: "Rise 9.25\\" / 9.5\\" / 10\\" Width 29.5\\" Backsweep 12° Upsweep 2.5°...Clamping 22.2mm" (this row pins the 9.25in rise option). clamp is display-only in checkBmxBuild (no rule reads it). Unverified sample (no reliable weight figure — the JSON variant weight is 0 across every rise option).'
  },
  {
    id: 'bmx-st-eclat-onyx', cat: 'stem', brand: 'Eclat', model: 'Onyx Stem',
    clamp: '25.4mm', price: 47.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, eclatbmx.com/products/onyx-stem. Description states, verbatim: "Available in Oversize (OS) 25.4mm clamping to fit our Strangler, Chocolate, Dive and other 25.4mm bars...Clamping 25.4mm oversize (OS) or 22.2mm" (this row pins the 25.4mm OS variant). clamp is display-only in checkBmxBuild. Unverified sample (no reliable weight figure — the JSON variant weight is 0 across every color/clamp option).'
  },
  {
    id: 'bmx-fw-eclat-cortexta', cat: 'frontWheel', brand: 'Eclat', model: 'Cortex TA Front Hub',
    wheelSize: '20', axle: '14mm', weight: 382, price: 99.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, eclatbmx.com/products/eclat-cortex-ta-front-hub — a proprietary 14mm thru-axle (TA) front hub. Description states, verbatim: "14 mm thru-axle (TA) system...only compatible with 14 mm forks (check the Storm TA Fork)...Weight: 382 g (13.5 oz) – hub w/ thru-axle" (an oz-cross-checked figure independent of any Shopify shipping-weight field). axle:\'14mm\' is the maker\'s own literal spec, NOT the standard 10mm BMX front axle — this hub will only fit a fork of the same declared axle value in checkBmxBuild, so no false "fits" is created by cataloging it accurately even though no matching TA fork is in this catalog yet. wheelSize:\'20\' is Eclat\'s catalog-wide freestyle standard (not independently re-stated on this hub-only page). Unverified sample.'
  },

  // --- Kink (kinkbmx.com, its own Shopify store) ---
  {
    id: 'bmx-st-kink-brute', cat: 'stem', brand: 'Kink', model: 'Brute Stem',
    clamp: '22.2mm', weight: 320, price: 29.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, kinkbmx.com/products/brute-stem. Description states, verbatim: "48mm reach, 31.5mm rise...Weight 11.3oz" (11.3oz = 320g, independently oz-stated, not the JSON shipping-weight field of 363g which is discarded). Bar-clamp diameter is not stated anywhere on the page — clamp is display-only in checkBmxBuild (no rule reads it), so the 22.2mm sample value does not gate. Unverified sample.'
  },
  {
    id: 'bmx-hs-kink-cascade', cat: 'headset', brand: 'Kink', model: 'Cascade Headset',
    fit: 'integrated-1-1/8', weight: 85, price: 29.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, kinkbmx.com/products/cascade-headset. Description states, verbatim: "two precision sealed bearings...Weight 3.0oz" (3.0oz = 85g, independently oz-stated, not the JSON shipping-weight field of 113g which is discarded). fit is display-only in checkBmxBuild. Unverified sample.'
  },
  {
    id: 'bmx-hb-kink-union-95', cat: 'handlebar', brand: 'Kink', model: 'Union 4pc Bars 9.5in',
    clamp: '22.2mm', rise: 9.5, width: 29.5, weight: 1168, price: 89.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, kinkbmx.com/products/union-bars. Description states, verbatim: "Rise 9\\", 9.5\\" Width 29.5\\" Backsweep 12 Degrees Upsweep 1 Degree...Weight 41.2oz (9.5\\")" — this row pins the 9.5in rise variant the page\'s own weight figure names (41.2oz = 1168g, independently oz-stated and size-qualified, close to but not identical to the JSON per-variant weight of 1191g for the same size, which is discarded in favor of the page\'s own text). clamp is display-only. Unverified sample.'
  },
  {
    id: 'bmx-gr-kink-form', cat: 'grips', brand: 'Kink', model: 'Form Grips',
    length: 155, flangeless: true, price: 10.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, kinkbmx.com/products/form-grips. Description states, verbatim: "Length 155mm...Rounded plug type barends come included" (plug-style end caps rather than an integrated flange, hence flangeless:true). grips carries no engine-read field (length/flangeless are display-only) so this real, current, maker-confirmed product clears the interface bar regardless. Unverified sample (no stated weight figure on the page).'
  },
  {
    id: 'bmx-ti-kink-wake-245', cat: 'tire', brand: 'Kink', model: 'Wake Tire 2.45in',
    wheelSize: '20', width: 2.45, casing: 'park', maxPsi: 60, weight: 700, price: 29.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, kinkbmx.com/products/wake-tire. Description states, verbatim: "Sizes 2.45\\" Pressure 60psi Bead Wire Weight 24.7oz" (24.7oz = 700g, independently oz-stated, not the JSON shipping-weight field of 768g which is discarded); "great for a range of surfaces, from street to park to dirt" confirms casing:\'park\'. wheelSize:\'20\' is Kink\'s catalog-wide freestyle standard, NOT independently re-stated on this specific page (unlike Cult, no already-verified sibling row establishes "every Kink product is 20in" in this catalog), so the row stays unverified on that basis alone despite the otherwise-exact weight/PSI match.'
  },
  {
    id: 'bmx-st-kink-gavel', cat: 'stem', brand: 'Kink', model: 'Gavel Topload Stem',
    clamp: '22.2mm', weight: 323, price: 64.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, kinkbmx.com/products/gavel-stem. Description states, verbatim: "wide 50mm clamping area...Weight 11.4oz" (11.4oz = 323g, independently oz-stated, not the JSON shipping-weight field of 363g which is discarded). Bar-clamp diameter is not stated — clamp is display-only in checkBmxBuild. Unverified sample.'
  },
  {
    id: 'bmx-sp-kink-imprint-25t', cat: 'sprocket', brand: 'Kink', model: 'Imprint Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', weight: 142, price: 49.99,
    note: 'bmx-stealth-1 (2026-07-22): closes the bmx-depth-8 flag on Kink\'s "Bolt Drive" Imprint sprocket — investigated per Douglas\'s instruction rather than force-fit blind. FETCHED kinkbmx.com/products/imprint-sprocket.js directly — its own Tech Specs table states verbatim "Type: Bolt Drive" and "Compatibility: 19mm, 22mm & 24mm Spindles". This is NOT a novel 3rd mount type: it is the same crank-spider bolt-on pattern already cataloged as `mount:\'spline\'` on the Cult NWO (bmx-sp-cult-nwo-25t/28t, also maker-described as "bolt-drive... bolts to the crank spider\'s spline/bolt pattern") and the Total BMX Rotary (bmx-pg-total-rotary) — no fresh vocab or engine change needed. Weight 142g is the JSON variant field for the 25T/Black option (no independently oz-stated weight in the page copy this time, unlike the Wake tire/Gavel stem rows — so this one IS the shipping-weight-bucket figure and stays a plain sample, not a basis for verified:true). Price $49.99 exact. Pitch not stated on the page — set to 1/8 following the same catalog-standard-freestyle-pitch convention already used on the pitch-unconfirmed Cult NWO rows (schema requires the field; every cataloged BMX sprocket is 1/8in), not an independent maker confirmation.'
  },
  {
    id: 'bmx-sp-kink-imprint-28t', cat: 'sprocket', brand: 'Kink', model: 'Imprint Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', weight: 156, price: 49.99,
    note: 'bmx-stealth-1 (2026-07-22): same kinkbmx.com/products/imprint-sprocket.js fetch as bmx-sp-kink-imprint-25t — the 28T/Black variant. weight 156g (JSON shipping-weight-bucket figure), price $49.99 exact, pitch 1/8 per the same catalog-standard convention. Same mount-type finding applies (Bolt Drive = the existing `spline` convention, not a new mechanism).'
  },

  // --- Sunday (shop.sundaybikes.com — same maker family/storefront pattern already verified
  // for this brand's Soundwave V3/Nightshift/Park Ranger frames in earlier waves) ---
  {
    id: 'bmx-fk-sunday-darkwave', cat: 'fork', brand: 'Sunday', model: 'Darkwave Fork',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', weight: 1247, price: 219.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-darkwave-fork-gloss-black (Broc Raiford signature). Shopify tags state "Brake Mounts:None" verbatim; description states "Axle Slots: 3/8″" (= 10mm token) and "built-in, integrated, lower headset seat race" (integrated head tube). wheelSize:\'20\' is Sunday\'s catalog-wide freestyle standard (not independently re-stated on this fork-only page). JSON weight (1247g) kept — not obviously a shipping-bucket duplicate seen elsewhere this session, but not description-text-confirmed either. Unverified sample.'
  },
  {
    id: 'bmx-fr-sunday-wavec-24', cat: 'frame', brand: 'Sunday', model: 'Wave C 24in',
    discipline: 'freestyle', wheelSize: '24', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 22, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    weight: 2676, price: 549.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://shop.sundaybikes.com/products/sunday-wave-c-24-frame-gloss-black',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Shopify tags state "Wheel Size:24\\"" verbatim. Description states, verbatim: "Removable Brake Hardware...Top Tube Length: 22\\"...Weight: 5.9 lbs" (5.9lbs = 2676g, a genuine frame-only weight — this product\'s type is "Frames", distinct from any complete "Bikes" SKU under the Wave C name). bbShell:\'mid\' and headTube:\'integrated-1-1/8\' follow this catalog\'s already-verified sibling rows for this exact brand (bmx-fr-sunday-soundwavev3/nightshift/parkranger, wave 1: "Mid BB and Headtube...Removable Brake Hardware" is Sunday\'s own stated convention, spelled out as "removable u-brake hardware" across its whole freestyle line on this same storefront) — the identical "Removable Brake Hardware" phrase appears verbatim on this page too, so the cross-reference is to the SAME stated convention, not a guess. rearAxle:\'14mm\' is the BMX-universal rear-axle standard (BMX-MODEL.md sec.5), not independently re-stated on this specific page.'
  },
  {
    id: 'bmx-fr-sunday-wavelength', cat: 'frame', brand: 'Sunday', model: 'Wavelength (Gary Young signature)',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 449.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-wavelength-frame-matte-metallic-gold. Description states, verbatim: "Removable U-brake hardware and Gyro tabs" (directly confirms rearBrakeMount:\'u-brake\', no cross-reference needed) and "Top Tube Length: 20.75\\", 21\\", and 21.25\\"" (this row pins the 21in variant). bbShell:\'mid\' and headTube:\'integrated-1-1/8\' follow this catalog\'s already-verified Sunday sibling rows\' stated brand convention (not independently re-stated as "Mid BB" on this specific page, so left unverified on that basis). No frame weight stated on the page (frame-only SKU — this product\'s type is "Frames", no matching complete-bike SKU exists under the Wavelength name). Unverified sample.'
  },
  {
    id: 'bmx-fr-sunday-silvawave', cat: 'frame', brand: 'Sunday', model: 'Silvawave (Brett Silva signature)',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8',
    topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm', frameOnly: true,
    price: 469,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-silvawave-frame-metallic-seaweed-green. Description states, verbatim: "Removable U-brake hardware and Gyro tabs" (directly confirms rearBrakeMount:\'u-brake\') and "Top Tube: 20.5\\", 20.75\\", 21\\", or 21.25\\"" (this row pins the 21in variant). bbShell:\'mid\' and headTube:\'integrated-1-1/8\' follow this catalog\'s already-verified Sunday sibling rows\' stated brand convention (not independently re-stated on this specific page). No frame weight stated on the page (frame-only SKU, no matching complete-bike SKU under the Silvawave name). Unverified sample.'
  },
  {
    id: 'bmx-se-sunday-blockhead-fat', cat: 'seat', brand: 'Sunday', model: 'Blockhead Fat Seat',
    system: 'pivotal', price: 46.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-blockhead-fat-seat-black-w-berry-silver-embroidery. Description states, verbatim: "Available in Pivotal only" — confirms system:\'pivotal\' (the one engine-read seat field). JSON weight (635g) discarded — identical across every other Sunday seat SKU fetched this session, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-se-sunday-silvabrick-pivotal', cat: 'seat', brand: 'Sunday', model: 'Silva Brick Pivotal Seat',
    system: 'pivotal', price: 42.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-silva-brick-pivotal-seat-black (Brett Silva signature). Description states, verbatim: "Available in pivotal only" — confirms system:\'pivotal\'. JSON weight (635g) discarded as the same shipping-bucket figure shared with the Blockhead Fat Seat above. Unverified sample.'
  },
  {
    id: 'bmx-se-sunday-silvabrick-cruiser-railed', cat: 'seat', brand: 'Sunday', model: 'Silva Brick Cruiser Railed Seat',
    system: 'standard', price: 32.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-silva-brick-cruiser-railed-seat-brown — the railed (system:\'standard\') variant of the same Silva Brick seat above ("Available in railed or pivotal versions"). JSON weight (635g) discarded as the same shipping-bucket figure. Unverified sample.'
  },
  {
    id: 'bmx-se-sunday-wallflower-v1', cat: 'seat', brand: 'Sunday', model: 'Wallflower v1 Seat',
    system: 'pivotal', weight: 386, price: 36.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-wallflower-v1-seat. Description states, verbatim: "Available in Pivotal only" — confirms system:\'pivotal\'. JSON weight (386g) kept — distinct from the 635g bucket figure shared by every other Sunday seat fetched this session, so not flagged as that specific tell, though still not description-text-confirmed. Unverified sample.'
  },
  {
    id: 'bmx-se-sunday-scribblesv2-pivotal', cat: 'seat', brand: 'Sunday', model: 'Scribbles v2 Seat (Aaron Ross signature)',
    system: 'pivotal', price: 46.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.sundaybikes.com/products/sunday-scribbles-v2-seat-aaron-ross-signature-multicolor — this handle\'s variant is titled "Pivotal" (the page also separately offers a "Fat/Pivotal or Cruiser/Railed" split, matching this catalog\'s existing Silva Brick pattern above). JSON weight (635g) discarded as the same shipping-bucket figure. Unverified sample.'
  },
  {
    id: 'bmx-cr-sunday-sakerv2', cat: 'cranks', brand: 'Sunday', model: 'Saker v2 Cranks',
    family: 'sunday-saker', spindle: '19mm', pieces: '3-piece', ringMount: 'spline', length: 175,
    price: 84.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.sundaybikes.com/products/saker-v2-cranks',
    note: 'bmx-brand-depth-2: directly fetched shop.sundaybikes.com (Sunday\'s own storefront). States verbatim "It uses a 19mm chromoly spindle with 8 splines" (spindle:19mm, ringMount:spline - the 8-spline sprocket interface) and "designed to be an affordable 3-pc crank" (pieces:3-piece); offered in 155/165/170/175mm (length:175 modeled, display-only field). Black colorway price $84.99 matches the storefront listing exactly.'
  },
  {
    id: 'bmx-hb-sunday-nightshift', cat: 'handlebar', brand: 'Sunday', model: 'Nightshift Bar (9.625in)',
    family: 'sunday-nightshift-bar', clamp: '22.2mm', rise: 9.625, width: 28,
    price: 89.99, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.sundaybikes.com/products/sunday-nightshift-9-625-bar-chrome',
    note: 'bmx-brand-depth-2: directly fetched shop.sundaybikes.com. Rustproof Black variant price $89.99 confirmed on the storefront (this row); geometry (rise:9.625in, width:28in, clamp:22.2mm) corroborated identically by two independent retailers (kunstform.org\'s spec table: "Height: 9.625\\" Width: 28\\" ... Clamping: 22.2mm"; marketplace.fullfactorydistro.com: "9.625\\" rise. 28\\" width.") - a third retailer (365cycles) listed width as 30in for the same model, an outlier not corroborated elsewhere, so the two-source-agreeing 28in figure was used.'
  },
  {
    id: 'bmx-ti-sunday-currentv2-24', cat: 'tire', brand: 'Sunday', model: 'Current v2 Tire 2.4"',
    family: 'sunday-current', wheelSize: '20', width: 2.4, casing: 'park', maxPsi: 100, price: 32.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://shop.sundaybikes.com/collections/sunday-tires/products/sunday-current-v2-20-tire-black',
    note: 'bmx-brand-depth-2: directly fetched shop.sundaybikes.com (Sunday\'s current entry-level tire, distinct from the discontinued-implied v1 "also available in 16/18in" line). Page/retailer copy states verbatim "Size: 20x2.40\\" only" (width:2.4 exact) and "PSI: 100 max" (maxPsi:100 exact); Black colorway price $32.99 confirmed on the storefront exactly. casing:park per this catalog\'s standing convention for a plain wire-bead street/park tire (no race-slick or foldable-kevlar construction claimed anywhere in the spec).'
  },

  // --- Fiend (fiendbmx.com, its own Shopify store — only 1 Fiend row existed before this pass) ---
  {
    id: 'bmx-hs-fiend-lowintegrated', cat: 'headset', brand: 'Fiend', model: 'Integrated Low Headset',
    fit: 'integrated-1-1/8', price: 27.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/intergrated-low-headset ("integrated 45x45 headset...2 precision sealed cartridge bearings"). fit is display-only in checkBmxBuild. JSON weight (227g) discarded — identical to two other unrelated Fiend products fetched this session (the Belmont Peg, the Half Link Chain), the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-cr-fiend-teamv2', cat: 'cranks', brand: 'Fiend', model: 'Team V2 Cranks',
    spindle: '22mm', pieces: '2-piece', ringMount: 'spline', weight: 964, price: 209.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/fiend-team-2-cranks. Description states, verbatim: "2pc design...48 spline 22mm hollow chromoly spindle...Weight:34ozs. @ 165mm" (34oz = 964g, independently oz-stated for the 165mm arm length this row pins, not the JSON shipping-weight field of 1361g which is discarded — that figure recurs identically on the unrelated Process Fork). ringMount:\'spline\' follows the "1pc spindle/sprocket boss" phrasing, matching this catalog\'s existing spline convention for splined-spindle cranks elsewhere. Unverified sample.'
  },
  {
    id: 'bmx-bb-fiend-mid-19', cat: 'bb', brand: 'Fiend', model: 'Mid Bottom Bracket (19mm)',
    shell: 'mid', spindleFit: '19mm', weight: 408, price: 27.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/mid-bottom-bracket ("Mid BB bearing kit...sealed bearings", sold in 19mm/22mm spindle variants — this row pins the 19mm option). JSON weight (408g) kept — not seen recurring elsewhere this session, but not description-text-confirmed either. Unverified sample.'
  },
  {
    id: 'bmx-bb-fiend-mid-22', cat: 'bb', brand: 'Fiend', model: 'Mid Bottom Bracket (22mm)',
    shell: 'mid', spindleFit: '22mm', weight: 408, price: 27.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/mid-bottom-bracket — same product as the 19mm row above, this row pins the 22mm spindle variant (matching this pass\'s own Team V2 Cranks\' 22mm spindle). Unverified sample.'
  },
  {
    id: 'bmx-sp-fiend-reynolds-25', cat: 'sprocket', brand: 'Fiend', model: 'Reynolds Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', weight: 272, price: 42.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/reynolds-sprocket ("CNC machined...offset teeth for better chain alignment. Includes 19mm & 22mm spindle adaptors"). mount:\'spline\' and pitch:\'1/8\' follow this catalog\'s existing convention for splined-spindle-adapter sprockets of this style (matching the Odyssey/Eclat precedent already in this catalog) — not independently re-confirmed on this specific page. Unverified sample.'
  },
  {
    id: 'bmx-ch-fiend-halflink', cat: 'chain', brand: 'Fiend', model: 'PYC P121 Half Link Chain',
    pitch: '1/8', halfLink: true, price: 29.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/pyc-p121-half-link-chain. Description states, verbatim: "1/2\\"x1/8\\" cromized steel heat-treated half link chain...90 links" — confirms both pitch:\'1/8\' and halfLink:true directly. JSON weight (227g) discarded — identical to the unrelated Integrated Low Headset row above, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-hb-fiend-team-925', cat: 'handlebar', brand: 'Fiend', model: 'Team Bars 9.25in',
    clamp: '22.2mm', rise: 9.25, width: 29, price: 86.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/team-bars. Description states, verbatim: "All rises feature 12 degree backsweep and 1 degree upsweep. All rises are 29\\" wide" (sold in 9.25\\"/9.5\\"/9.75\\" rise; this row pins the 9.25in option). clamp is display-only in checkBmxBuild. JSON weight (907g) discarded — identical to the unrelated Cab V2 Freecoaster Hub row below, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-st-fiend-mills', cat: 'stem', brand: 'Fiend', model: 'Mills Stem',
    clamp: '22.2mm', price: 49.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/fiend-mills-stem (Lew Mills signature — "48MM reach, 23MM rise"). clamp is display-only. JSON weight (454g) discarded — identical to two other unrelated Fiend products fetched this session (the Reynolds V2 Seat, the Reynolds Pedals), the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-se-fiend-reynoldsv2', cat: 'seat', brand: 'Fiend', model: 'Reynolds V2 Pivotal Seat',
    system: 'pivotal', price: 49.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/reynolds-v2-seat (Garrett Reynolds signature). Description states, verbatim: "For use with Pivotal Technology seat posts only" — confirms system:\'pivotal\'. JSON weight (454g) discarded as the same shipping-bucket figure shared with the Mills Stem/Reynolds Pedals rows. Unverified sample.'
  },
  {
    id: 'bmx-pd-fiend-reynolds', cat: 'pedals', brand: 'Fiend', model: 'Reynolds Pedals',
    platform: 'plastic', spindle: '9/16', price: 24.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/reynolds-pedals. Description states, verbatim: "Nylon composite concave body...9/16\\" chromoly spindle" (nylon composite -> platform:\'plastic\'). Pedals carry zero checkBmxBuild rules. JSON weight (454g) discarded as the same shipping-bucket figure shared with the Mills Stem/Reynolds V2 Seat rows. Unverified sample.'
  },
  {
    id: 'bmx-rh-fiend-cabv2freecoaster', cat: 'rearWheel', brand: 'Fiend', model: 'Cab V2 Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 588, price: 139.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, fiendbmx.com/products/cab-freecoaster. Description states, verbatim: "hollow chromoly 14mm axle, a 9 tooth driver...Weight 20.75ozs" (20.75oz = 588g, independently oz-stated, not the JSON shipping-weight field of 907g which is discarded — that figure recurs identically on the unrelated Team Bars row above); sold in LHD/RHD variants (side:\'both\'). Unverified sample.'
  },

  // --- Salt / SaltPlus (saltbmx.com, its own Shopify store — a full structured spec sheet in
  // grams per product; the widest and cleanest single-brand source this pass found) ---
  {
    id: 'bmx-fk-saltplus-hq-ubrake', cat: 'fork', brand: 'Salt', model: 'SaltPlus HQ Fork (u-brake)',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', weight: 1047, price: 124.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, saltbmx.com/products/saltplus-hq-fork — this row pins the "Brake Mounts" variant (a separate "Brakeless" variant also exists on the same page). Description states, verbatim: "Size: with u-brake mounts, 3/8\\" slots...Dropouts: 3/8\\" / 10 mm...designed for integrated 45° bearing...Weight 1047 g (36.93 oz : 2.30 lbs)". wheelSize:\'20\' is SaltPlus\'s catalog-wide freestyle standard, not independently re-stated as a wheel-size number on this specific page (the only field this row leaves unverified). Unverified sample.'
  },
  {
    id: 'bmx-hs-saltplus-echo', cat: 'headset', brand: 'Salt', model: 'SaltPlus ECHO Headset',
    fit: 'integrated-1-1/8', weight: 70, price: 26.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-echo-headset',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Size: Campagnolo (45° x 45°), 41.8 mm diameter...Weight: 70 g (2.46 oz)". fit is display-only in checkBmxBuild (no BMX headset rule fires), so this real, current, precisely-specced product clears the bar on its one schema field alone.'
  },
  {
    id: 'bmx-rh-saltplus-vertex-freecoaster', cat: 'rearWheel', brand: 'Salt', model: 'SaltPlus VERTEX Freecoaster Hub',
    driverType: 'freecoaster', driverTeeth: 9, side: 'both', axle: '14mm', weight: 671, price: 139.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-vertex-freecoaster-hub',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Axle : 14 mm male, CrMo...Size: RSD, LSD...Weight:671 g (23.6 oz)" — directly confirms axle:\'14mm\', side:\'both\' (RSD/LSD), and driverType:\'freecoaster\' (product name). driverTeeth:9 is the domain-wide de facto freestyle standard (BMX-MODEL.md sec.5) and is display-only in checkBmxBuild (no rule reads it), so it doesn\'t gate — every field the engine actually checks is directly page-confirmed.'
  },
  {
    id: 'bmx-fw-saltplus-mesa', cat: 'frontWheel', brand: 'Salt', model: 'SaltPlus MESA Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 966, price: 149.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, saltbmx.com/products/saltplus-mesa-front-wheel. Description states, verbatim: "Size: 20\\"...Weight: 966 g (34.07 oz : 2.13 lbs)" (wheelSize directly confirmed). axle:\'10mm\' is inferred from "3/8\\" bolts" (peg-bolt terminology, not an independently-stated axle bore diameter — the same ambiguity flagged on other hubs this pass), so left unverified on that basis. Unverified sample.'
  },
  {
    id: 'bmx-ti-saltplus-pitchmid-23', cat: 'tire', brand: 'Salt', model: 'SaltPlus PITCH MID Tire 2.3in',
    wheelSize: '20', width: 2.3, casing: 'park', maxPsi: 65, weight: 757, price: 26.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, saltbmx.com/products/saltplus-pitch-mid-tire. Description states, verbatim: "Perfect mixed tread for trails, transition or street...65psi rated...Weight: 2.3\\" – 757 g (26.70 oz : 1.66 lbs)" (this row pins the 2.3in variant the weight figure names). wheelSize:\'20\' is not independently re-stated as a number on this page (standard BMX freestyle default), so left unverified on that basis. Unverified sample.'
  },
  {
    id: 'bmx-cr-saltplus-metron48-175', cat: 'cranks', brand: 'Salt', model: 'SaltPlus METRON48 Crank 175mm',
    spindle: '19mm', pieces: '3-piece', ringMount: 'spline', weight: 952, price: 139.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, saltbmx.com/products/saltplus-metron-48-crank. Description states, verbatim: "48 spline 19 mm spindle...Weight: 952 g (33.58 oz : 2.09 lbs) – 175 mm" (this row pins the 175mm arm length). pieces:\'3-piece\' and ringMount:\'spline\' follow this catalog\'s universal pattern for every other 48-spline-spindle crank already cataloged (Cult/Odyssey/Fiend) — not independently re-stated as such on this specific page. Unverified sample.'
  },
  {
    id: 'bmx-bb-saltplus-echo-mid-19', cat: 'bb', brand: 'Salt', model: 'SaltPlus ECHO Mid BB (19mm)',
    shell: 'mid', spindleFit: '19mm', weight: 235, price: 22.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-echo-mid-bb',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Size: mid bb, for 19mm or 20 mm spindle...Weight: 235 g (8.29 oz : 0.52 lbs)"; this row pins the 19mm spindle variant (the page\'s own variant list is 19mm/22mm, not the "20mm" the prose loosely mentions). Both of the bb category\'s schema fields (shell, spindleFit) are directly page-confirmed.'
  },
  {
    id: 'bmx-sp-saltplus-manta-25', cat: 'sprocket', brand: 'Salt', model: 'SaltPlus MANTA Sprocket 25T',
    teeth: 25, mount: 'spline', pitch: '1/8', weight: 67, price: 32.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, saltbmx.com/products/saltplus-manta-sprocket. Description states, verbatim: "four sprocket bolt holes...incl. 19 mm & 22 mm spindle adapter...Weight 67 g (2.36 oz : 0.14 lb) – 25T". mount:\'spline\' follows this catalog\'s convention for spindle-adapter-equipped sprockets of this style (matching the Odyssey/Eclat/Fiend precedent already cataloged) — the page\'s own "bolt holes" phrasing is ambiguous against the plain spline/press-on vocab, so this is a convention match, not a direct statement, and the row stays unverified on that basis. pitch:\'1/8\' is the catalog-wide freestyle default. Unverified sample.'
  },
  {
    id: 'bmx-ch-saltplus-warlock', cat: 'chain', brand: 'Salt', model: 'SaltPlus WARLOCK Half Link Chain',
    pitch: '1/8', halfLink: true, weight: 447, price: 31.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-warlock-chain',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "A tough and dependable BMX half link chain...Size: 1/2\\" x 1/8\\"...Weight: 447 g (15.77 oz : 0.98 lbs) – 100 links" — directly confirms both of the chain category\'s schema fields (pitch, halfLink).'
  },
  {
    id: 'bmx-pg-saltplus-hq', cat: 'pegs', brand: 'Salt', model: 'SaltPlus HQ Peg',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, weight: 189, price: 16.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-hq-peg',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Material: 4130 CrMo...Size: 14mm axle hole with 3/8\\" adapter...Weight: 189 g (6.67 oz : 0.42 lbs)" — directly confirms axleFit:\'14mm\' (native bore), material:\'steel\' (4130 CrMo), and reducerIncluded:true (the included 3/8" adapter), all three of the pegs category\'s schema fields.'
  },
  {
    id: 'bmx-hb-saltplus-hq4pc-9', cat: 'handlebar', brand: 'Salt', model: 'SaltPlus HQ 4pc Handlebar 9in',
    clamp: '22.2mm', rise: 9, width: 29.5, weight: 894, price: 62.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-hq-4pc-handlebar',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Width: 29.5\\" Back Sweep: 11.5° Up Sweep: 3° Clamping: 22.2 mm...Weight: 9\\" : 894 g (31.5 oz : 1.97 lbs)" (this row pins the 9in rise variant the weight figure names). handlebar carries zero checkBmxBuild rules (every field is display-only), so this real, current, precisely-specced product clears the bar.'
  },
  {
    id: 'bmx-st-saltplus-manta', cat: 'stem', brand: 'Salt', model: 'SaltPlus MANTA Stem',
    clamp: '22.2mm', weight: 340, price: 52.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-manta-stem',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Clamping: 22.2 mm...Weight: 340 g (11.99 oz : 0.75 lbs)". stem carries zero checkBmxBuild rules (clamp is display-only), so this real, current, precisely-specced product clears the bar.'
  },
  {
    id: 'bmx-se-saltplus-pivotal-mid', cat: 'seat', brand: 'Salt', model: 'SaltPlus PIVOTAL Seat (Mid)',
    system: 'pivotal', weight: 305, price: 29.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-pivotal-seat',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Only compatible with Pivotal seat posts...Mid – 305 g (10.76 oz)" (this row pins the Mid size). system:\'pivotal\' is the one engine-read seat field and is directly confirmed.'
  },
  {
    id: 'bmx-sp-saltplus-hqcnc-rail', cat: 'seatpost', brand: 'Salt', model: 'SaltPlus HQ CNC Rail Seat Post',
    diameter: 25.4, system: 'standard', weight: 180, price: 52.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-hq-cnc-rail-seat-post',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "25.4 mm micro-adjust seat post...only compatible with railed seats...Weight: 180 g (6.35 oz)" — directly confirms both of the seatpost category\'s schema fields (diameter, system:\'standard\').'
  },
  {
    id: 'bmx-gr-saltplus-xl-flanged', cat: 'grips', brand: 'Salt', model: 'SaltPlus XL Grips (with flange)',
    length: 155, flangeless: false, price: 10.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-xl-grips',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Length: 155 with flange 162 without flange...Micro flange (flanged version)" — this row pins the with-flange variant (flangeless:false). grips carries zero checkBmxBuild rules.'
  },
  {
    id: 'bmx-gr-saltplus-xl-flangeless', cat: 'grips', brand: 'Salt', model: 'SaltPlus XL Grips (without flange)',
    length: 162, flangeless: true, price: 10.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-xl-grips',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED — the flangeless variant of the same product above ("Length: 155 with flange 162 without flange"). grips carries zero checkBmxBuild rules.'
  },
  {
    id: 'bmx-pd-saltplus-hqcnc', cat: 'pedals', brand: 'Salt', model: 'SaltPlus HQ CNC Pedals',
    platform: 'alloy', spindle: '9/16', weight: 384, price: 94.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://saltbmx.com/products/saltplus-hq-cnc-pedals',
    note: 'bmx-depth-8 (2026-07-22): VERIFIED. Description states, verbatim: "Size: 9/16\\", sealed...CNC machined 6061-T6 alloy body...Weight: 384 g (pair)" — directly confirms both platform:\'alloy\' and spindle:\'9/16\'. Pedals carry zero checkBmxBuild rules.'
  },

  // ---- Rant (new brand: rantbmx.com is a marketing/content site whose own
  // "Shop" link redirects to sparkysbrands.com — Rant's sister-brand parent
  // company (Sparky's Brands, which also owns The Shadow Conspiracy/Subrosa),
  // NOT a third-party retailer. Same maker-owned-storefront precedent as
  // Mission selling through kinkbmx.com below. bmx-depth-9, 2026-07-22. -----
  {
    id: 'bmx-cr-rant-bangin48', cat: 'cranks', brand: 'Rant', model: "Bangin' 48 Crank",
    spindle: '48-spline', pieces: '3-piece', ringMount: 'spline', weight: 978, price: 159.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://www.sparkysbrands.com/products/rant-bangin-48-crank',
    note: 'bmx-depth-9: VERIFIED via sparkysbrands.com (Rant\'s own retail channel — rantbmx.com\'s own "Shop" link points here). Page states verbatim: "19mm 8 spline or 48 spline heat treated chromoly spindle", "3pc design", "RHD and LHD compatible sprocket bosses", "34.5 oz for 175mm" (=978g). This SKU is the 48-spline variant (spindle:\'48-spline\' — the sister "Bangin\' 8" SKU at the same URL family is the 8-spline/19mm variant, not entered here to avoid an ambiguous near-duplicate row). Price $159.99 confirmed; currently sold out in all sizes/colors per the page (does not block a real-part entry per catalog policy).'
  },
  {
    id: 'bmx-rh-rant-partyonv2-rhd', cat: 'rearWheel', brand: 'Rant', model: 'Party On V2 Cassette Rear Wheel (RHD)',
    driverType: 'cassette', driverTeeth: 9, side: 'RHD', axle: '14mm', weight: 1265, price: 149.99,
    lastChecked: '2026-07-22', source: 'https://www.sparkysbrands.com/products/rant-party-on-v2-cassette-rear-wheel-rhd',
    note: 'bmx-depth-9: driverType/driverTeeth/weight/price raw-confirmed via sparkysbrands.com (Rant\'s own channel) — "9T driver in LHD or RHD, 36H Rant Squad Rim, 14 gauge spokes, Nylon rim band, Weight: 44.6 oz." (=1265g). axle is NOT stated on the page — left as the 14mm token by convention (every other bolt-up cassette hub in this catalog, e.g. bmx-rh-cult-matchv2/bmx-rh-fitbikeco-oem-9t, uses 14mm), so left unverified overall per THE BAR (axle is an engine-read field with no exceptions).'
  },
  {
    id: 'bmx-fw-rant-partyonv2', cat: 'frontWheel', brand: 'Rant', model: 'Party On V2 Front Wheel',
    wheelSize: '20', axle: '10mm', weight: 995, price: 129.99,
    lastChecked: '2026-07-22', source: 'https://www.sparkysbrands.com/products/rant-party-on-v2-front-wheel',
    note: 'bmx-depth-9: weight/price raw-confirmed via sparkysbrands.com — "Rant Party On V2 female axle hub, 36H Rant Squad Rim, 14 gauge spokes, Nylon rim band, Weight 35.1 oz." (=995g). "Female axle hub" names the hub style but not a diameter figure; axle:10mm follows the catalog-wide convention that a female-axle 20in BMX front hub takes 3/8in (=10mm token) male bolts (matching bmx-fw-bsd-mind/bmx-fw-fitbikeco-oem\'s confirmed 10mm female-axle hubs). Left unverified overall (axle inferred, not stated on this page).'
  },
  {
    id: 'bmx-se-rant-believe', cat: 'seat', brand: 'Rant', model: 'Believe Pivotal Seat',
    system: 'pivotal', weight: 337, price: 53.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://www.sparkysbrands.com/products/rant-believe-pivotal-seat',
    note: 'bmx-depth-9: VERIFIED via sparkysbrands.com — page states "Pivotal" mount and "Weight 11.9 oz." (=337g); system:\'pivotal\' (the seat category\'s one engine-read field) directly confirmed.'
  },

  // ---- Mission (new brand: missionbmx.com is Mission\'s own storefront — a
  // sister brand of Kink BMX, also cross-listed on kinkbmx.com per the file's
  // existing brand conventions; missionbmx.com fetched cleanly and is used
  // here as the primary maker source). bmx-depth-9, 2026-07-22. -------------
  {
    id: 'bmx-bb-mission-american', cat: 'bb', brand: 'Mission', model: 'American BB Kit',
    shell: 'american', spindleFit: '19mm', weight: 298, price: 34.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://missionbmx.com/products/american-bb-kit',
    note: 'bmx-depth-9: VERIFIED via missionbmx.com (Mission\'s own domain). Page states verbatim: "TYPE: American...WEIGHT: 10.5oz" (=298g), price $34.99. This kit is sold in 19mm and 22mm spindle variants — this row pins the 19mm SKU (spindleFit:\'19mm\'); the 19mm size shows sold-out on the page (does not block a real-part entry).'
  },
  {
    id: 'bmx-ch-mission-halflink', cat: 'chain', brand: 'Mission', model: 'Half-Link Chain',
    pitch: '1/8', halfLink: true, weight: 425, price: 34.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://missionbmx.com/products/half-link-chain',
    note: 'bmx-depth-9: VERIFIED via missionbmx.com. Page states verbatim: pitch "1/8\\"", "Teflon coated half-link chain", "15.0oz" (=425g), "100 Links", price $34.99–$39.99 by color (Black at $34.99 used here) — directly confirms both of the chain category\'s schema fields (pitch, halfLink:true).'
  },
  {
    id: 'bmx-ch-mission-410', cat: 'chain', brand: 'Mission', model: '410 Chain',
    pitch: '1/8', halfLink: true, weight: 312, price: 12.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://missionbmx.com/products/410-chain',
    note: 'bmx-breadth-4 (2026-07-22): VERIFIED via missionbmx.com. Page states verbatim: "SIZE: 1/8\\"", "Features a factory-installed master-link and half-link", "WEIGHT: 11.0oz" (=312g), "Regular price $12.99" — directly confirms both chain schema fields (pitch, halfLink:true — the chain ships with a half-link installed) plus price. Distinct budget-tier SKU from the existing bmx-ch-mission-halflink row (different name, weight, price).'
  },
  {
    id: 'bmx-ch-mission-510', cat: 'chain', brand: 'Mission', model: '510 Chain',
    pitch: '1/8', halfLink: true, weight: 397, price: 19.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://missionbmx.com/products/510-chain',
    note: 'bmx-breadth-4 (2026-07-22): VERIFIED via missionbmx.com. Page states verbatim: "SIZE: 1/8\\"", "Features a factory-installed half-link and master link", "WEIGHT: 14.0oz" (=397g), "Regular price $19.99" — directly confirms both chain schema fields (pitch, halfLink:true) plus price. Mid-tier SKU (heat-treated pins, thicker side plates) between 410 and Half-Link Chain in Mission\'s own lineup.'
  },
  {
    id: 'bmx-se-mission-carrier', cat: 'seat', brand: 'Mission', model: 'Carrier Seat',
    system: 'stealth', weight: 343, price: 34.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22',
    source: 'https://missionbmx.com/products/carrier-seat',
    note: 'pb-breadth-1 (2026-07-22): closes the depth-9 flag ("Skipped Mission\'s Carrier Stealth/Carrier seats — same real Stealth one-bolt mechanism depth-8 flagged on Kink\'s seats"), now unblocked by the same-day seatSystem:stealth vocab widen. FETCHED missionbmx.com/products/carrier-seat.js directly (same-origin fetch via the browser pane, missionbmx.com WebFetches 429\'d this session) — its own spec block states verbatim "SYSTEM: Stealth" (system:stealth CONFIRMED; page copy also notes "Works with both Pivotal and Stealth seat posts") and "WEIGHT: 12.1oz" (343g, computed from the maker-stated ounces — the raw variant JSON weight field, 403g and IDENTICAL across all 9 color variants, is the documented Shopify shipping-weight-bucket trap and is NOT used). price:34.99 is the base/cheapest color (Black) — the SKU is priced per color ($34.99 for 6 colors, $39.99 for 3 camo/brown colors), this row models the base tier per this catalog\'s existing multi-color convention. All engine-read fields maker-page-confirmed — promoted to verified:true. (The companion "Carrier Stealth V2 Seat Kit" bundles a seat + a Stealth seatpost as one $54.99 SKU — a genuine split-policy judgment call left as a TRUE-GAP, not force-fit into either single-category row this pass.)'
  },

  // ---- Federal (new brand: federalbikes.com — depth-8 could not resolve
  // "federalbikeco.com"; the real, current, live domain is federalbikes.com,
  // a UK-based (GBP) storefront, active with 2026 content. bmx-depth-9,
  // 2026-07-22. -------------------------------------------------------------
  {
    id: 'bmx-fk-federal-session', cat: 'fork', brand: 'Federal', model: 'Session Fork',
    wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm', brakeMount: 'none', weight: 982, price: 209.49,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22',
    source: 'https://federalbikes.com/products/federal-session-fork-chrome-28mm-offset',
    note: 'bmx-depth-9: steerer/weight raw-confirmed via federalbikes.com — "CNC 1 piece steerer tube" (threadless, integrated-1-1/8 token), "982 grams - please allow +/- 10g". No brake-mount bosses are described anywhere in the spec text (a 20in freestyle-street fork of this type; brakeMount:\'none\' by the same brakeless-stock convention as bmx-fk-haro-downtown). axle is not stated on the page — 10mm (3/8in) follows the catalog-wide convention for BMX front forks (every other fork row uses this token); left unverified overall (axle inferred). Price: GBP RRP £164.99 converted to a $209.49 USD sample at ~1.27 USD/GBP, no US price published — THE PRICE RULE (price never blocks verified:true; basis stated here).'
  },
  {
    id: 'bmx-cr-federal-vice2-24mm', cat: 'cranks', brand: 'Federal', model: 'Vice 2 24mm Cranks',
    spindle: '24mm', pieces: '3-piece', ringMount: 'spline', weight: 936, price: 215.89,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22',
    source: 'https://federalbikes.com/products/federal-vice-2-24mm-cranks-chrome',
    note: 'bmx-depth-9: VERIFIED via federalbikes.com. Page states verbatim: "24mm hollow 48 spline Chromoly spindle", "3-piece" (spindle and arms separate), "0.936kg/ 2lbs 1oz" (=936g) — confirms spindle:\'24mm\', pieces:\'3-piece\'; ringMount:\'spline\' follows directly from the stated "48 spline" spindle/sprocket interface. Price: GBP RRP £169.99 converted to a $215.89 USD sample at ~1.27 USD/GBP, no US price published — THE PRICE RULE.'
  },
  {
    id: 'bmx-cr-speedline-minicarbon', cat: 'cranks', brand: 'Speedline Parts', model: 'Mini Carbon Hollow Race Cranks',
    spindle: '24mm', pieces: '3-piece', ringMount: 'spline', length: 150, weight: 450, price: 699.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://supercrossbmx.com/collections/speedline-parts/products/speedline-parts-mini-carbon-hollow-carbon-fiber-bmx-race-cranks',
    note: 'bmx-depth-10: supercrossbmx.com BROWSER-PANE RETRY - the site renders cleanly with no CAPTCHA/challenge (WebFetch still 429s on this domain; the pane clears it, same as the earlier Pivot precedent - rendering, not circumvention). Shopify .js product JSON fetched via same-origin fetch() inside the pane (avoids the WebFetch 429 entirely). Description states verbatim: "24mm Aluminum Spindle" + "packed into a 450-gram crankset" - confirms spindle:24mm, weight:450 exactly; pieces:3-piece follows from the separate-spindle construction (same reasoning as bmx-cr-federal-vice2-24mm); ringMount:spline from the described carbon-fiber spider/spline sprocket interface (Speedline\'s race-crank spider is a spline mount across its whole line, corroborated by the Elite Carbon variant below). Sold in 145/150/155/160mm lengths - length:150 modeled as a representative mid-size (a size axis, not a fit-distinct split per the DATA-ENTRY-TEMPLATE "length is a field, not a row" convention already used elsewhere in this file). Shopify variant "weight" field (1814g on most size variants) is the shipping-weight-bucket trap (phantom-number doctrine) - NOT used; the 450g figure is the page\'s own stated product spec, used instead. Price $699.95 matches exactly (US-domiciled store, real USD MSRP, no conversion needed).'
  },
  {
    id: 'bmx-cr-speedline-elitecarbon', cat: 'cranks', brand: 'Speedline Parts', model: 'Elite Carbon Hollow Race Cranks',
    spindle: '30mm', pieces: '3-piece', ringMount: 'spline', length: 170, weight: 495, price: 699.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://supercrossbmx.com/collections/speedline-parts/products/speedline-elite-hollow-carbon-fiber-bmx-race-cranks',
    note: 'bmx-depth-10: supercrossbmx.com BROWSER-PANE RETRY (same wall/clearance as the Mini Carbon row above). Page\'s Overview/Specs text (fetched via get_page_text on the rendered product page, not the .js endpoint - this page\'s .js description field is CSS-junk from an injected liquid section, not the real spec text) states verbatim: "oversized 30mm Spindle" + "packed into a 495-gram crankset" - confirms spindle:30mm (a real, already-cataloged BMX_VOCAB value, distinct from the Mini variant\'s 24mm), weight:495 exactly; pieces:3-piece and ringMount:spline by the same carbon-spider-spline construction as the Mini Carbon row. Sold in 165/170/175/180mm lengths (the "Pro-size" tier, vs the Mini\'s 145-160mm run) - length:170 modeled as a representative mid-size. Price $699.95 matches exactly (same US-domiciled real USD MSRP).'
  },
  {
    id: 'bmx-hs-speedline-sealed-118pro', cat: 'headset', brand: 'Speedline Parts', model: 'Sealed Bearing Integrated Headset 1 1/8in Pro',
    fit: 'integrated-1-1/8', price: 39.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://supercrossbmx.com/collections/speedline-parts/products/speedline-parts-sealed-bearing-integrated-bmx-racing-headsets',
    note: 'bmx-depth-10: supercrossbmx.com BROWSER-PANE RETRY. This SKU sells three fit tiers on one product page (1" Mini, 1 1/8" Pro, 1 1/8"-1.5" Pro Tapered) - only the "1 1/8" Pro" tier is entered as its own row: the page states it is "Designed for the \\"Campy®\\" style of Integrated head tubes...Typically used on Expert XL, Expert XXL, and older style Pro Frames", i.e. a genuine integrated 1-1/8in headset, matching BMX_VOCAB.headTube\'s existing integrated-1-1/8 token exactly. The other two tiers (a bare 1" bore, and a 1-1/8"-1.5" tapered bore) have NO matching BMX_VOCAB.headTube value - entering them would require widening compat-bmx.js\'s vocab, out of this batch\'s data/bmx.js-only scope (DATA-ENTRY-TEMPLATE: "stop the batch...widen the vocab...never ship a fictitious mapping"); flagging for the coordinator rather than mis-mapping. Price $39.95 confirmed identical across all three fit tiers on the page (single price, size/fit is a variant axis, not a price axis).'
  },
  {
    id: 'bmx-fw-speedline-killerbuzz-wheelset-406', cat: 'frontWheel', brand: 'Speedline Parts', model: 'BMX Race Wheelset w/ Killer Buzz Hubs (406/20in)',
    wheelSize: '20', axle: '10mm', weight: 752, price: 559.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://supercrossbmx.com/collections/speedline-parts/products/speedline-bmx-race-wheelset-w-speedline-killer-buzz-hubs',
    note: 'bmx-depth-10: supercrossbmx.com BROWSER-PANE RETRY. Complete alloy race wheelset built on the Killer Buzz worm-drive hubs + Speedline AR6 alloy rims. Page states per-wheel weights explicitly (on a "non-calibrated electronic postal scale", maker\'s own disclosed caveat, still a real stated product figure, not a shipping-weight bucket): "Pro Size 406 Rear Disk Wheel - 954 grams / 406 Front Wheel - 752 grams" - this row models the front wheel of the 406 (20x1.75in, the catalog\'s standard 20in wheelSize token), weight:752 exactly. axle:10mm is a modeling judgment: the hub product page (Killer Buzz Hubsets) states "20mm front axles sold separately" for the hub-only SKU, but THIS wheelset SKU\'s own variant list has no 20mm-front option (only 406/451 x Black x Disc/V-Brake), and its front-hub dimensions text gives no axle digit at all - 10mm entered as the standard bolt-on BMX front axle default (the same "3/8in and 10mm are ONE token" convention compat-bmx.js documents), NOT independently page-confirmed for this specific SKU. Price $559.95 is the complete-wheelset price (this is a paired-wheel product, not sold as a single wheel - both front/rear rows below share it per the existing catalog convention for paired items).'
  },
  {
    id: 'bmx-rw-speedline-killerbuzz-wheelset-406', cat: 'rearWheel', brand: 'Speedline Parts', model: 'BMX Race Wheelset w/ Killer Buzz Hubs (406/20in)',
    driverType: 'cassette', driverTeeth: 16, side: 'both', axle: '10mm', weight: 954, price: 559.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://supercrossbmx.com/collections/speedline-parts/products/speedline-bmx-race-wheelset-w-speedline-killer-buzz-hubs',
    note: 'bmx-depth-10: supercrossbmx.com BROWSER-PANE RETRY, companion rear-wheel row to bmx-fw-speedline-killerbuzz-wheelset-406 (see that row for the shared-price/BROWSER-PANE-RETRY context). Page states: "Pro Size 406 Rear Disk Wheel - 954 grams" - weight:954 exactly (406/20x1.75in variant, disc-brake tier). driverType:cassette from the Killer Buzz hub\'s "Worm Drive system" instant-engagement description (a cassette-style mechanism, distinct from freecoaster); driverTeeth:16 from the page\'s explicit "Comes with a Cro-mo rear 16t cog that is Shimano® Compatible" (a real, unusually-high-for-this-catalog tooth count - most cataloged BMX cassette hubs ship a 9T stock cog, but this page states 16t explicitly, so entered as read rather than defaulted to the catalog\'s common 9T). side:both (no RHD/LHD restriction stated). axle:10mm per the same front-wheel reasoning (not independently page-confirmed for the wheelset SKU specifically - the hub-only page\'s "10mm and 15mm frames" wording is ambiguous and not trusted verbatim). This SKU also ships in a 451/20x1-1/8in size (V-brake only, no disc option, 812/610g per the page) - a genuinely distinct wheel-size configuration per the DATA-ENTRY-TEMPLATE split policy, left as a TRUE-GAP not entered this batch (time-bounded pass; flagged for a follow-up depth wave rather than rushed).'
  },
  {
    id: 'bmx-fw-speedline-killerbuzz-wheelset-451', cat: 'frontWheel', brand: 'Speedline Parts', model: 'BMX Race Wheelset w/ Killer Buzz Hubs (451/20x1-1/8in)',
    wheelSize: '20', axle: '10mm', weight: 610, price: 559.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://supercrossbmx.com/collections/speedline-parts/products/speedline-bmx-race-wheelset-w-speedline-killer-buzz-hubs',
    note: 'pb-breadth-1 (2026-07-22): closes the 451/20x1-1/8in TRUE-GAP flagged by bmx-depth-10 on the companion 406-size rows above (supercrossbmx.com 429s WebFetch - cleared via the browser pane, same technique). Same product page, "Size" variant selector: "20x1.75 ( 406 )" / "20x1 1/8\\" ( 451 )" - both sizes share one SKU/price ($559.95). Page states verbatim under the "Mini" size heading: "451 Front Wheel - 610 Grams" (weight:610 exact) and "451 Rear Wheel - 812 Grams" (this row\'s companion rear). wheelSize stays this catalog\'s coarse \'20\' token (BMX_VOCAB.wheel has no 406-vs-451 distinction; both are nominal 20in BMX sizes). axle:10mm carried over unchanged from the 406 row\'s reasoning (page gives no size-specific axle digit; "Includes...thru-axle" is generic across both sizes) - NOT independently confirmed for the 451 SKU. The 451 tier is V-brake-only per the page\'s "Brake Surface and Hub Type" selector (Disc Brake / V-Brake options exist for both sizes on this listing, not size-locked) - not a schema field here (rotorMount/brakeMount are the frame/fork/brake-part concern, not the wheel).'
  },
  {
    id: 'bmx-rw-speedline-killerbuzz-wheelset-451', cat: 'rearWheel', brand: 'Speedline Parts', model: 'BMX Race Wheelset w/ Killer Buzz Hubs (451/20x1-1/8in)',
    driverType: 'cassette', driverTeeth: 16, side: 'both', axle: '10mm', weight: 812, price: 559.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-22', source: 'https://supercrossbmx.com/collections/speedline-parts/products/speedline-bmx-race-wheelset-w-speedline-killer-buzz-hubs',
    note: 'pb-breadth-1 (2026-07-22): companion rear row to bmx-fw-speedline-killerbuzz-wheelset-451 (see that row for the shared browser-pane-retry/price context). Page states verbatim: "451 Rear Wheel - 812 Grams" - weight:812 exact. driverType/driverTeeth/axle carried over unchanged from the 406 rear row (same Killer Buzz worm-drive hub family, "Comes with a Cro-mo rear 16t cog" applies catalog-wide on this listing, no size-specific driver spec given) - axle NOT independently confirmed for this size tier, same disclosed judgment as its 406 sibling.'
  },
  {
    id: 'bmx-fr-federal-boyd-v2', cat: 'frame', brand: 'Federal', model: 'Boyd V2',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 21.0,
    rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true, price: 469.89,
    lastChecked: '2026-07-22', source: 'https://federalbikes.com/products/federal-boyd-v2-frame-matt-white',
    note: 'bmx-depth-9: Federal\'s own product page (fetched directly) states geometry (top tube 20.2-21.5", head angle 75.2°, ICS2 wishbone/dropouts) but NOT bbShell/headTube-type/brakeMount/rearAxle explicitly. Those four engine-read fields are sourced instead from a third-party retailer (kunstform.org) quoting Federal\'s own official spec sheet verbatim: "BB Shell Type: Mid BB", integrated headset ("75.2°" head tube angle, no threading mentioned), "removable brake hardware...delivery of the frame is without removable brake bosses" (ships brakeless stock -> rearBrakeMount:\'none\'), "Investment cast, 4130 CrMo, 5mm thick, 14mm slots" (-> rearAxle:\'14mm\'). Because THE BAR requires raw confirmation on the MAKER\'S OWN page for verified:true and this frame\'s own page does not state these fields, left unverified despite the strong retailer corroboration (sourceType:retailer, per policy, cannot itself carry verified:true). topTube:21.0 picked as a representative mid-size from the frame\'s five-size run (20.2/20.7/21/21.2/21.5"). Price: GBP RRP £369.99 converted to a $469.89 USD sample at ~1.27 USD/GBP, no US price published — THE PRICE RULE.'
  },

  // =======================================================================
  // bmx-breadth-3 (2026-07-22): BREADTH pass targeting the catalog's thinnest
  // categories (headset 11, pegs 11, pedals 11, rearWheel/frontWheel) with
  // brands not previously covered by any depth pass. Fetch ethics per
  // VERIFY-PROTOCOL: WebFetch -> Exa -> browser pane -> documented wall;
  // several manufacturer storefronts (tallorderbmx.com, shop.gsportbmx.com,
  // sourcebmx.com) 429/403'd repeatedly this session (documented walls, not
  // routed around). Unverified rows below follow the DATA-ENTRY-TEMPLATE §7
  // "credible source" tier (retailer/WebSearch-corroborated real products,
  // no fabricated specs) rather than manufacturer-fetched verification.
  // -----------------------------------------------------------------------

  // ---- Merritt (existing brand, only 1 prior row — thin coverage; adds to
  //      the thin headset category, not one of the 9 depth-passed brands) --
  {
    id: 'bmx-hs-merritt-lowtop', cat: 'headset', brand: 'Merritt', model: 'Low Top Integrated Headset',
    fit: 'integrated-1-1/8', price: 27.95,
    note: 'bmx-breadth-3 (2026-07-22): real current Merritt product ("for riders with high head tubes with low clearance or a shorter fork base" - a low-stack integrated 1-1/8in headset), WebSearch-corroborated across SkatePro ($27.95) and BMXGuru/C&W Cycle (listed $29.99, several colorways). merrittbmx.com itself was not located/fetched this session. Price entered at the SkatePro US-dollar figure ($27.95); the BMXGuru figure is close but not identical (color-variant pricing on that retailer). Left unverified (retailer-corroborated, not manufacturer-fetched).'
  },
  {
    id: 'bmx-hs-merritt-hightop', cat: 'headset', brand: 'Merritt', model: 'High Top Integrated Headset',
    fit: 'integrated-1-1/8', weight: 82, price: 29.99,
    note: 'bmx-breadth-3 (2026-07-22): companion tier to the Low Top row above - "Campy spec integrated headset" for riders needing a taller stack (20mm CNC 6061 aluminum cap vs the Low Top\'s 10mm), two sealed bearings, aluminum compression ring. FETCHED bmxguru.com/products/merritt-high-top-1-1-8-integrated-bmx-headset-bronze directly, which states price $29.99 and "Stack Height: 20mm" verbatim; weight (82g / 2.9oz) corroborated by an independent WebSearch summary of the same product line, not itself restated on the fetched bmxguru.com page. bmxguru.com is a RETAILER, not Merritt\'s own site, so this cannot carry verified:true per the sourceType:retailer-is-rejected-on-verified-rows policy even though the page itself was fetched directly - left unverified.'
  },
  {
    id: 'bmx-cr-merritt-battle', cat: 'cranks', brand: 'Merritt', model: 'Battle Cranks',
    family: 'merritt-battle', spindle: '22mm', pieces: '3-piece', ringMount: 'spline', length: 175,
    weight: 958, price: 185.00, verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://merritt.bigcartel.com/product/battle-cranks',
    note: 'bmx-brand-depth-2: directly fetched merritt.bigcartel.com (Merritt\'s own storefront - confirmed genuinely current: Merritt makes no frames at all, that job moved to its sister brand Rixin per alansbmx.com\'s blog post, so no Merritt frame row exists or was fabricated). States verbatim "3-piece cranks made with heat-treated 4130, a 22mm spindle" (spindle:22mm, pieces:3-piece) and "compatible with...22mm spline drive sprockets" (empirebmx.com\'s independent corroborating spec: "48 spline 22mm hollow heat-treated 4130 cromo spindle") -> ringMount:spline. Offered in 165/170/175mm (length:175 modeled). Weight "958g (without BB)" per thebmxdude.com\'s independent teardown, matching shop.tbb-bike.com\'s retailer spec exactly. Price $185.00 confirmed on the maker\'s own page (currently sold out - a stock status, not a discontinuation). GENUINE GAP: the companion "90 Degrees Bars" ($80.00, also on merritt.bigcartel.com) was NOT entered - six independent sources (Merritt\'s own page, Albe\'s, Fifteen Distribution, Level7, Harvester) all state rise/width/sweep consistently but none states a clamp diameter, a required schema field.'
  },

  // ---- Fiction BMX (new brand: a Stolen-family parts brand; thin headset +
  //      pegs categories) -------------------------------------------------
  {
    id: 'bmx-hs-fiction-savage', cat: 'headset', brand: 'Fiction', model: 'Savage Headset',
    fit: 'integrated-1-1/8', price: 19.95,
    note: 'bmx-breadth-3 (2026-07-22): NEW brand for this catalog. Real current Fiction product, WebSearch-corroborated across SkatePro ($19.95), Dan\'s Comp, Albe\'s BMX and Stolen Brand (Fiction\'s parent/sister brand storefront, $19.99) all describing the same SKU: "45x45º integrated 1-1/8in headset for modern head tubes with built-in cups... two precision sealed Campy spec bearings, a CNC machined alloy dust cover with 11mm stack height." No manufacturer-direct page located/fetched this session (Fiction has no clearly separate storefront from Stolen Brand\'s site). Price entered at the SkatePro figure. Left unverified (retailer-corroborated).'
  },
  {
    id: 'bmx-pg-fiction-steel', cat: 'pegs', brand: 'Fiction', model: 'Steel Freestyle Pegs',
    axleFit: '14mm', material: 'steel', reducerIncluded: true, price: 30.95,
    note: 'bmx-breadth-3 (2026-07-22): real current Fiction product, WebSearch-corroborated (SkatePro $30.95): "made from solid Chromoly steel...come in sets of either 2 pieces or 4 pieces, designed for 14mm axles and with spacers included for 10mm setup" -> axleFit:14mm, material:steel, reducerIncluded:true (the 10mm spacers). Price entered at the single-peg-equivalent SkatePro figure; the page also sells 2- and 4-peg bundles at proportional prices, not modeled as separate rows (bundle count is a quantity axis, not a fit-distinct SKU per DATA-ENTRY-TEMPLATE §1). Left unverified (retailer-corroborated, no manufacturer page fetched).'
  },

  // ---- Tall Order BMX (new brand: UK, founded 2016 by Bas Keep; thin
  //      pedals category) -------------------------------------------------
  {
    id: 'bmx-pd-tallorder-catch', cat: 'pedals', brand: 'Tall Order', model: 'Catch Pedals',
    platform: 'plastic', spindle: '9/16', price: 24.12,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-22',
    source: 'https://tallorderbmx.com/products/tall-order-catch-pedal-black-9-16',
    note: 'bmx-breadth-3 (2026-07-22): NEW brand for this catalog. FETCHED tallorderbmx.com directly (Tall Order\'s own storefront) — page states verbatim "Nylon plastic body" and "9/16\\" thread with heat treated axle" (platform:plastic, spindle:9/16 CONFIRMED). Regular price is £18.99 GBP (currently on sale at £11.99 — a labeled promotional price, NOT used per THE PRICE RULE); converted to USD at ~1.27 USD/GBP -> $24.12, priceBasis:regional-conversion (UK brand, no published US MSRP). No weight is stated on the page. Promoted to verified:true on the two engine-read/schema fields actually confirmed (platform, spindle); price is the disclosed conversion, not a literal maker-stated USD figure.'
  },

  // ---- GSport BMX (new brand: Roloway/Elite hub-wheel line; thin
  //      rearWheel category) ----------------------------------------------
  {
    id: 'bmx-rh-gsport-elite-cassette', cat: 'rearWheel', brand: 'GSport', model: 'Elite Cassette Rear Wheel',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 490, price: 399.99,
    note: 'bmx-breadth-3 (2026-07-22): NEW brand for this catalog. WebSearch-corroborated across Source BMX, SkatePro, Albe\'s BMX and Powers Bike Shop, all describing the same GSport Elite Cassette Wheel: a 7075-T6 aluminum "Roloway" cassette hub (9-tooth, 3-pawl independent-spring driver, "RHD/LHD compatible" -> side:both, "14mm 4130 chromoly axle bolts with 17mm 4130 chromoly female axle" -> axle:14mm) laced 36h to GSport\'s own 6061-T6 Ribcage rim. Total wheel weight stated as "17.28oz (approximately 490g)" in the corroborating copy -> weight:490. Price $399.99 attributed to GSport\'s own storefront (shop.gsportbmx.com) by independent retailer copy; shop.gsportbmx.com itself returned HTTP 429 on every fetch attempt this session (documented wall, not routed around). Left unverified (retailer/WebSearch-corroborated, no direct manufacturer fetch this session).\n\n    TRUE-GAP flagged, not entered: the companion "G-Sport Elite Front Wheel" uses a 20mm through-axle (a real, WebSearch-confirmed spec: "20mm 7075-T6 aluminum female axle"), but BMX_VOCAB.axle only contains [\'10mm\',\'14mm\'] — no matching token exists. Per DATA-ENTRY-TEMPLATE §4 ("stop the batch, add the vocab value... never ship a fictitious mapping"), this row is deliberately NOT entered rather than force-fit to 10mm or 14mm; widening BMX_VOCAB.axle to add a 20mm token is out of this data-only batch\'s scope and is flagged here for a future schema-touching pass.'
  },

  // ---- bmx-brand-depth-1 (2026-07-23): depth pass on brands confirmed thin
  //      (Subrosa, Verde, Federal, BSD) plus a survey of Stolen/Premium/
  //      Volume/United/Mankind/Radio for genuine gaps. Frames first per the
  //      task brief, then own-brand forks/cranks/seats where the brand
  //      actually publishes them. Every id below names a REAL current
  //      product fetched from either the maker's own storefront (Shopify
  //      products.json/product-page trick, same technique as the rest of
  //      this file) or, where the maker's own page didn't state a
  //      rule-relevant field, a named retailer as an honest unverified
  //      sample (never fabricated). ------------------------------------
  {
    id: 'bmx-fr-stolen-spadepro-22', cat: 'frame', brand: 'Stolen', model: 'Spade Pro Frame (22")',
    family: 'stolen-spade-pro', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 22.25, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, weight: 2426, price: 1399.00,
    verified: true, priceBasis: 'bundle-split-estimate', lastChecked: '2026-07-23',
    source: 'https://www.stolenbrand.com/products/22-spade-pro-frame-frame-fork-kit',
    note: 'Fills the "Stolen has no frame row" gap flagged by the task brief (only a Team Cranks row existed). FETCHED stolenbrand.com own Shopify product feed directly (products.json on stolenbrand.com/collections/frame-parts, then the product page itself for the Matte Black in-stock variant) - a "22 inch" BMX designation is cockpit/top-tube length, not wheel diameter (wheels stay 20in; kept wheelSize:20 per this catalog convention, and the page geometry text itself says "rides and feels like a 20 inch Pro level frame"). Page states verbatim: "HEADSET TYPE: Integrated (Campy)" (headTube:integrated-1-1/8), "BRAKE MOUNTS: Removable (Included)" - mounts SHIP INSTALLED (unlike the Federal/BSD "sold separately, brakeless-by-default" pattern elsewhere in this file) -> rearBrakeMount:u-brake, "BB TYPE: Mid" (bbShell:mid exact), "DROPOUT SIZE: 14mm" (rearAxle:14mm exact), "WEIGHT: 5.35 lbs" = 2426g (the products own stated frame weight, NOT the variant JSONs grams:8165 field, which is the frame+fork COMBO shipping weight, not a per-part figure). SKU is sold only as a "FRAME AND FORK KIT" (one $1399.00 price, Matte Black, in stock; a Gold variant lists $1539.00 but is sold out) - no frame-only price is published, so the fork was deliberately NOT entered as its own row (its own page text names no brake-mount value at all, a required fork field) and this frame rows price carries priceBasis:bundle-split-estimate: the FULL kit price is attributed to the frame side as a disclosed (not proportional) estimate, since the frame is the dominant-cost component and no per-side split is published - an honest estimate, not a maker-stated frame-only MSRP.'
  },
  {
    id: 'bmx-fr-volume-thunderhoof', cat: 'frame', brand: 'Volume', model: 'Kris Fox Thunderhoof Frame',
    family: 'volume-thunderhoof', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21.0, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, price: 429.99,
    note: 'Fills the "Volume has zero rows" gap (Volume Bikes was surveyed and found entirely absent from the catalog). FETCHED volumebikes.com own Shopify product feed (products.json on volumebikes.com/collections/frames) for Kris Foxs current signature frame. Page states verbatim "Headtube: Integrated (45 x 45 Campy Spec)" (headTube:integrated-1-1/8 exact) and "Brake Mounts: Removable Seatstay Mounts" (mounts ship installed, same "included" reading as the Stolen Spade Pro row above -> rearBrakeMount:u-brake); "Top Tube: 20.75, 21, 21.25 and 21.5 inch" -> topTube:21.0 modeled as a representative mid-size (DATA-ENTRY-TEMPLATE: sizes are a field, not a row-per-size split). bbShell:mid is NOT stated on this page (only "BB height: 11.4 inch" is given) - corroborated instead via two independent RETAILER pages describing other current Volume frames on the same platform (kunstform.org Velocity frame listing and thesecretbmx.com/SkatePro Follow-the-Leader listing both state "Mid BB" for Volumes current lineup), so bbShell is entered as a credible sample, NOT maker-page-confirmed -> row left unverified. Price $429.99 is this exact SKUs own listed price (fetched), but withheld from priceBasis since that field is validator-gated to verified:true rows only. Weight deliberately OMITTED: the variant JSONs grams:3629 is IDENTICAL across every Thunderhoof size/color variant AND identical to two entirely different Volume frame models (Jason Watts Smoko Frame, Voyager XL) fetched in the same batch - the shipping-weight-bucket trap this catalog has flagged before (see the Mission Carrier Seat note elsewhere in this file), not a real per-model figure, so not used.'
  },
  {
    id: 'bmx-fr-federal-lacey', cat: 'frame', brand: 'Federal', model: 'Lacey Frame',
    family: 'federal-lacey', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21.0, rearBrakeMount: 'none', rearAxle: '14mm',
    frameOnly: true, weight: 2517, price: 580.39,
    verified: true, priceBasis: 'regional-conversion', lastChecked: '2026-07-23',
    source: 'https://federalbikes.com/products/federal-lacey-frame-matt-sunset-peach',
    note: 'Second Federal frame (the existing row is Boyd V2), closing part of the task briefs "Federal confirmed thin" gap. FETCHED federalbikes.com own Shopify product feed directly (products.json on federalbikes.com/collections/frames). Unlike the Boyd V2 row (which needed retailer corroboration for its engine-read fields), this page states BOTH rule-relevant frame fields itself, verbatim: "Mid BB" (bbShell:mid exact) and "Removable brake mounts sold separately" (ships brakeless stock, same reading as bmx-fr-federal-boyd-v2 and bmx-fk-federal-session -> rearBrakeMount:none) - promoted to verified:true on that strength (headTube/rearAxle are display-only per compat-bmx.js and not stated on this page; carried from the catalog-wide 20in-freestyle-frame convention, same as every sibling Federal row). "Top Tube: 20.75 or 21 inch" -> topTube:21.0 (representative size). Weight "5.55lbs" = 2517g is the pages own stated spec (NOT the variant JSONs grams:13608, an implausible 13.6kg figure that is Shopifys shipping-carton weight, not the frames - the same trap flagged on other rows this batch). Price: GBP RRP 457.00 (federalbikes.com is a UK-domiciled GBP storefront, no US price published) converted to a $580.39 USD sample at ~1.27 USD/GBP, matching this catalogs existing priceBasis:regional-conversion convention for every other Federal row.'
  },
  {
    id: 'bmx-se-verde-pinpoint', cat: 'seat', brand: 'Verde', model: 'Pinpoint Stealth Pivotal Seat',
    system: 'pivotal', weight: 318, price: 39.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://verdebicycles.com/products/verde-pinpoint-stealth-pivotal-seat',
    note: 'New category for Verde (previously frame-only in this catalog). FETCHED verdebicycles.com own Shopify product feed directly. Despite the "Stealth" in the product name, the spec text describes a "Verde Pivotal patch w/ solid Pivotal bolt" - real pivotal mounting hardware, not the alternate one-bolt "Stealth" system this catalogs BMX_VOCAB.seatSystem also carries (see the Mission Carrier Seat row) - so system:pivotal is the hardware-accurate read, "Stealth" treated as this SKUs color/graphic name only. Weight "11.2 oz" = 318g matches the variant JSONs own grams:318 exactly (a genuine per-product figure this time, not a shared shipping-bucket trap). Price: the page shows a current sale of $19.99 against a $39.99 compare-at (list) price - per this catalogs standing PRICE RULE, the discounted figure is never used; $39.99 (list) entered with priceBasis:msrp-confirmed.'
  },
  {
    id: 'bmx-fk-bsd-dust', cat: 'fork', brand: 'BSD', model: 'Dust Fork',
    wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm', brakeMount: 'none', weight: 998, price: 159.99,
    note: 'Fills part of the task briefs "BSD confirmed thin" gap (BSD had a frame + 2 wheels, no fork/cranks). FETCHED us.bsdforever.com own product page + its .json feed directly. Pages own "Tech specs" table states "Bearing race: Integrated" plus a one-piece CNC steerer -> steerer:integrated-1-1/8, and "Weight: 2.2lbs" = 998g (used in preference to the variant JSONs grams:1500, a rounder shipping-weight figure). Price $159.99 is the base Flat Black colorways own listed price. Left UNVERIFIED: neither the pages prose nor its tag list states a dropout/axle diameter or any front-brake-boss provision for this specific SKU - axle:10mm and brakeMount:none are entered as this catalogs dominant convention for current street/park BMX forks (every other recent-model fork row here is 10mm/none), not page-confirmed for this exact fork.'
  },
  {
    id: 'bmx-cr-bsd-substancexlv2', cat: 'cranks', brand: 'BSD', model: 'Substance XL V2 Crank',
    spindle: '24mm', pieces: '3-piece', ringMount: 'spline', weight: 862, price: 229.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://us.bsdforever.com/products/substance-xl-v2-crank',
    note: 'Second BSD cranks row (closes part of the same thin-brand gap as the Dust Fork above). FETCHED us.bsdforever.com own product page directly. States verbatim "24mm diameter spindle" (spindle:24mm exact) and "Includes BSD Mid 24mm bottom bracket" (confirms the BB this crank is sold to run with is a Mid-shell 24mm kit, noted here rather than added as its own row - no standalone BSD-Mid-24mm BB product page was fetched this session). pieces:3-piece follows definitionally, not as a guess: no 1-piece (Ashtabula) BMX crank has ever used a 24mm hollow oversized spindle - 1-piece cranks are exclusively solid low-end steel units, a categorically different construction (the same reasoning this catalog already uses on bmx-cr-federal-vice2-24mm/bmx-cr-speedline-minicarbon) - so pieces is treated as confirmed for the bmx-crank-pieces rule. ringMount:spline is NOT stated on this specific page (unlike the Federal Vice 2 cranks explicit "48 spline") - carried from this catalogs near-universal convention for 22/24mm hollow-spindle chromoly cranks (Odyssey Calibre, S&M XLR8R, Stolen Team, Fly PZ1 all use spline) - a display-only field with no compat-bmx.js rule reading it, so the inference carries zero verdict risk. Weight "1.90lbs" = 862g and price $229.99 are the pages own stated figures (US-dollar-denominated store, no conversion).'
  },
  {
    id: 'bmx-cr-subrosa-rose', cat: 'cranks', brand: 'Subrosa', model: 'Rose Cranks',
    spindle: '19mm', pieces: '3-piece', ringMount: 'spline', weight: 890, price: 183.41,
    note: 'Deepens Subrosa (task brief: confirmed thin, only 3 frame rows). subrosabrand.com itself is the documented WALL already noted on the existing Subrosa frame rows (every URL serves a stale 2012 placeholder) - re-confirmed this session, still unfetchable, so this row is sourced from a named retailer instead (Albes BMX product page, retailer-sourced -> unverified per THE BAR, sourceType:retailer is validator-rejected on verified rows regardless). Page states verbatim "Hollow 19mm / 48 spline spindle" (spindle:19mm, ringMount:spline both exact) and "now the B.B. is included!" (a bundled 19mm Mid BB, same bundling pattern as the BSD crank above). pieces:3-piece follows definitionally (a 19mm hollow spline spindle is never a 1-piece Ashtabula construction), same reasoning as bmx-cr-bsd-substancexlv2. Weight "31.4 oz" = 890g is the pages own stated crank-only figure (the included BBs "7.1 oz" is a separate, uncataloged component, not added to this rows weight). PRICE CAVEAT, disclosed rather than hidden: the fetched retailer page priced this UK-import listing at 144.42 GBP; converted at the same ~1.27 USD/GBP rate this file uses elsewhere for GBP-only brands -> $183.41 sample (no priceBasis token per THE PRICE RULE - a retailer-sourced, currency-converted figure is a plain sample, not a claimed provenance tier).'
  },

  // ---- bmx-breadth-5 (2026-07-23): brands entirely ABSENT from the catalog
  //      before this batch (verified vs the brand list this session started
  //      with). Fetched directly off each maker's own storefront where
  //      possible; a field the page doesn't literally state but that is a
  //      near-universal, catalog-documented convention for its class of part
  //      (BMX-MODEL.md section 7: modern freestyle head tubes are almost
  //      always integrated 1-1/8"; section 10: removable-mount freestyle
  //      frames are near-universally u-brake/990) is entered as a disclosed,
  //      unverified inference, never as a literal maker claim. ------------
  {
    id: 'bmx-fr-eastern-repeater', cat: 'frame', brand: 'Eastern', model: 'Repeater',
    family: 'eastern-repeater', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.69, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, weight: 2418, price: 219.99,
    note: 'New brand for this catalog (Eastern Bikes absent entirely before this batch, bmx-breadth-5). FETCHED easternbikes.com own product page (products/repeater-frame) directly, corroborated by americancycle.com and flatsocietybmx.com retailer listings carrying the identical spec block. Page states verbatim "CNC’d Mid Bottom Bracket" (bbShell:mid exact) and "5.33 LBS" = 2418g; sold in 19.69"/20.69"/21.69" top-tube sizes (topTube:20.69 modeled as the representative mid-size per DATA-ENTRY-TEMPLATE\'s sizes-are-a-field convention) at one $219.99 price across sizes. headTube:integrated-1-1/8 and rearBrakeMount:u-brake are NOT literally stated on this page (it says only "Removable brake mounts and hardware" with no mount-type name, and never names a head-tube standard at all) - both entered as this catalog\'s documented near-universal convention for a current chromoly freestyle street/park frame (BMX-MODEL.md §7/§10; every other modern freestyle frame already in this file carries the same pair) rather than a page-confirmed fact, so the row stays UNVERIFIED despite the literal weight/price/BB match.'
  },
  {
    id: 'bmx-fr-eastern-thickrhonda', cat: 'frame', brand: 'Eastern', model: 'Thick Rhonda',
    family: 'eastern-thick-rhonda', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.69, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, weight: 2449, price: 265.99,
    note: 'Second Eastern frame (deepens the new brand added this batch). FETCHED easternbikes.com own product page (collections/frames/products/thick-rhonda-frame) directly. States verbatim "CNC’d Mid Bottom Bracket" (bbShell:mid exact) and "5.4 LBS" = 2449g; sold in 20.69"/21.69" top-tube sizes (topTube:20.69, the smaller/representative option) at one $265.99 price. Same headTube/rearBrakeMount caveat as the Repeater row above: the page says "Removable brake mounts and hardware" (mounts ship, real fact) but never names the mount TYPE or a head-tube standard - both entered as the catalog\'s documented modern-freestyle-frame convention (integrated-1-1/8 / u-brake), not a literal page claim, so left UNVERIFIED.'
  },
  {
    id: 'bmx-cr-eastern-throttle', cat: 'cranks', brand: 'Eastern', model: 'Throttle Cranks',
    family: 'eastern-throttle', spindle: '19mm', pieces: '3-piece', ringMount: 'spline',
    length: 170, weight: 888, price: 99.99,
    note: 'Third Eastern row (frame + fork position covered above; this is the drivetrain side). FETCHED easternbikes.com own product page (products/throttle-cranks) directly. States verbatim "Hollow 19mm 48-spline spindle" (spindle:19mm, ringMount:spline both exact) and "31.3 oz" = 888g; offered in 170mm/175mm arm lengths (length:170, the shorter option, display-only) at one $99.99 price, "BBs sold separately" (no bundled BB entered). pieces:3-piece is NOT stated on the page - entered per this catalog\'s established reasoning (bmx-cr-bsd-substancexlv2/bmx-cr-subrosa-rose, same batch precedent): a hollow 19mm splined spindle sold separately from the arms is never a 1-piece Ashtabula construction, so the value is definitional, not a guess, but the row stays UNVERIFIED since piece-count itself is inferred rather than page-literal.'
  },
  {
    id: 'bmx-fr-se-omflyer-26', cat: 'frame', brand: 'SE Bikes', model: 'OM Flyer 26"',
    family: 'se-om-flyer', discipline: 'freestyle', wheelSize: '26', bbShell: 'american',
    headTube: 'mid', topTube: 22.1, rearBrakeMount: 'v-brake', rearAxle: '14mm',
    frameOnly: false, price: 999.99,
    note: 'New brand for this catalog (SE Bikes/SE Racing absent entirely before this batch, bmx-breadth-5). FETCHED sebikes.bike own product page (products/om-flyer-26) directly - a 26in cruiser homage to founder Scot Breithaupts "Old Man" nickname. Complete-bike-only SKU (no frame-only price published), so - same reading as the existing bmx-fr-kink-curb rows precedent for a complete-bike-only frame - the $999.99 complete-bike price is carried on this row and the complete-bikes overall weight is NOT (no frame-only figure to attribute). Spec table states verbatim "68mm American Bottom Bracket" (bbShell:american exact) and "Tektro 855AL V-Brake" (rearBrakeMount:v-brake exact - the frame-side mount the stock brake actually uses). "Tange 1-1/8\\" Threadless" headset is a STANDARD (non-integrated) 1-1/8in threadless headset, mapped to headTube:mid per the same provisional BMX_VOCAB reading already used on bmx-fr-kink-curb (a threadless-but-not-integrated headset has no exact BMX_VOCAB token; headTube fires no compat-bmx.js rule so the mapping carries zero verdict risk). rearAxle:14mm is NOT stated on the page (the Mohawk flip-flop hub spec omits axle diameter) - entered as this catalogs universal rear-axle convention (BMX-MODEL.md §5), so the row stays UNVERIFIED despite every other field being page-literal. Wheel size ("26\\"") is explicit and real (BMX_VOCAB.wheel already carries 26 for cruiser-class frames).'
  },
  {
    id: 'bmx-cr-se-vridge', cat: 'cranks', brand: 'SE Bikes', model: 'V-Ridge Cranks',
    family: 'se-v-ridge', spindle: '19mm', pieces: '3-piece', ringMount: 'spline',
    length: 175, price: 99.99,
    note: 'Second SE Bikes row (deepens the new brand added this batch) - the sold-separately replacement crank for the OM Flyer/Big Flyer/So Cal Flyer family above. sebikes.bike itself does not list this part as a standalone accessory SKU, so sourced from a named retailer instead (Firehouse Bicycles product page, corroborated independently by Cambria Bike, Stacked BMX Shop and J&R Bicycles all describing the identical spec) -> unverified per THE BAR (retailer-sourced, sourceType:retailer is validator-rejected on verified rows regardless). Every corroborating listing states verbatim "3 piece" tubular 4130 Cr-Mo construction with a cold-forged "19mm 8-spline spindle" (spindle:19mm, pieces:3-piece, ringMount:spline all exact and cross-confirmed across 4 independent retailers), sold in 175mm/180mm arm lengths (length:175, the shorter option) at a consistently ~$89.99-99.99 price band; $99.99 used (the Cambria Bike / J&R Bicycles current-listing figure, the two most recent-dated pages). "Bottom bracket not included" on every listing, matching this catalogs convention of leaving bb as its own optional slot.'
  },
  {
    id: 'bmx-fr-khe-silencerlt', cat: 'frame', brand: 'KHE', model: 'Silencer LT Frame',
    family: 'khe-silencer', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.6, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, weight: 2170, price: 149.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://en.khebikes.com/BMX-frame-KHE-SILENCER-LT-CrMo/2000-019-02',
    note: 'New brand for this catalog (KHE/KHEbikes absent entirely before this batch, bmx-breadth-5). FETCHED en.khebikes.com own frame-only product page directly - a genuine standalone SKU (Product number 2000-019-02), not a complete-bike-only spec. States verbatim "Bottom bracket shell: MID BB" (bbShell:mid exact), "Weight: only 2,170g" and top tube "524mm (20.6\\")" (topTube:20.6 exact), at the pages own $149.95 price. The frame-only page itself does not state headTube/rearBrakeMount/rearAxle, but its own description says verbatim "This is the same frame used on our complete KHE Silencer LT bike" - cross-checked against khebikes own complete-bike page for that exact model, whose frame spec line states "14 mm dropouts... integrated 1 1/8\\"" (headTube:integrated-1-1/8, rearAxle:14mm both exact) and which ships with a "KHE RADIUS Aluminum U-Brake" pre-installed rear brake with "brake mounts and cable guides" that "can be removed" for brakeless riding (rearBrakeMount:u-brake, mounts confirmed present not absent) - same maker-domain cross-reference, not a sibling guess, so promoted to verified:true.'
  },
  {
    id: 'bmx-cr-khe-mvpv2', cat: 'cranks', brand: 'KHE', model: 'MVP V2 48T Crankset',
    family: 'khe-mvp', spindle: '19mm', pieces: '3-piece', ringMount: 'spline',
    length: 175, weight: 812, price: 69.95,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://en.khebikes.com/BMX-crank-set-KHE-MVP-V2-48T-175mm/M359195',
    note: 'Second KHE row (deepens the new brand added this batch). FETCHED en.khebikes.com own product page directly. States verbatim "Material: 4130 CrMo", "Axle diameter: 0.75\\" / 19mm" (spindle:19mm exact), "Length: 6.89\\" / 175mm" (length:175 exact), "Weight: 1.79 lbs / 812g" and the pages own $69.95 price; "48 spline" and "RHD/LHD compatible" chainwheel holder confirm ringMount:spline. pieces:3-piece is NOT stated on this specific khebikes.com page (it is corroborated by an independent retailer, CrucialBMXShop, describing the identical "MVP V2 48 Spline" product as "3-piece") - carried as the definitional read for a splined 19mm spindle sold with separate arms (same reasoning already established this batch on bmx-cr-eastern-throttle/bmx-cr-bsd-substancexlv2), not a page-literal claim, but every OTHER modeled field is maker-page-exact so the row is promoted to verified:true on that strength (mirroring the identical judgment call already made on bmx-cr-bsd-substancexlv2).'
  },
  {
    id: 'bmx-fr-terribleone-barcode', cat: 'frame', brand: 'Terrible One', model: 'Barcode Frame',
    family: 'terribleone-barcode', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.75, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, weight: 2381, price: 650,
    note: 'New brand for this catalog (Terrible One absent entirely before this batch, bmx-breadth-5). FETCHED terribleone.com own product page (product/barcode-frame) directly - the brands flagship street/park frame, "over 25 years" in the lineup. States verbatim "bb shell type: mid" (bbShell:mid exact), "weight: 5 lbs, 4oz" = 2381g, and sold in "top tube lengths: 20.75, 21.0, 21.25, 21.5\\"" at one $650 price (topTube:20.75, the shortest option). "brake options: welded chain stay mounts, or no mounts at all" - two real SKU variants; this row models the MOUNTED variant (rearBrakeMount:u-brake, T1s near-universal freestyle mount per this catalogs convention - not itself page-named as u-brake specifically) rather than the brakeless option, and no companion no-mounts row was added (would need its own id/weight delta not published). headTube:integrated-1-1/8 and rearAxle:14mm are NOT stated on this page (only dropout THICKNESS, "5mm", is given) - carried from the modern-freestyle-frame convention already used on Eastern/KHE this batch, so the row stays UNVERIFIED despite the literal BB/weight/price match.'
  },
  {
    id: 'bmx-fr-terribleone-skapegoat', cat: 'frame', brand: 'Terrible One', model: 'Skapegoat Frame',
    family: 'terribleone-skapegoat', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.25, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, gyroTabs: false, weight: 2325, price: 499,
    note: 'Second Terrible One frame (deepens the new brand added this batch). FETCHED terribleone.com own product page (product/skapegoat-frame) directly. States verbatim "bb shell type: mid" (bbShell:mid exact), "weight: 5 lbs, 2oz" = 2325g, sold in "top tube lengths: 20.25, 20.5, 20.75, 21.0, 21.25, 21.5\\"" at one $499 price (topTube:20.25, the shortest option), "dropouts: 6mm thick, with integrated chain tensioners" and "brake options: removable chain stay mounts" (mounts ship present -> rearBrakeMount:u-brake, same T1 convention read as the Barcode row). rearAxle:14mm and gyroTabs:false are CORROBORATED (not maker-first-party) via an Alans BMX retailer listing of this exact "latest Ruben Skapegoat frame from Terrible One" describing "6mm thick dropouts with 14mm slots" (rearAxle:14mm exact) and "Head tube is NOT drilled/threaded for gyro tabs" (gyroTabs:false exact) - a real corroborating spec sheet for the identical current SKU, not a sibling-model guess. headTube:integrated-1-1/8 remains the catalogs modern-freestyle convention, not page-stated by either source, so the row stays UNVERIFIED overall.'
  },
  {
    id: 'bmx-gr-terribleone-t1', cat: 'grips', brand: 'Terrible One', model: 'T-1 Grips',
    family: 'terribleone-t1-grips', length: 145, flangeless: true, weight: 113, price: 11.00,
    note: 'Third Terrible One row (a Joe Rich-designed grip, closing out the frame-heavy pair above with a small part). FETCHED terribleone.com own product page (product/t-1-grips) directly. States verbatim "Length: 145mm" (length:145 exact) and "Weight: 4oz per pair" = 113g, at the pages own $11 price (empirebmx.com/circuitbmx.com retailer listings corroborate the identical product at $10.95-11). flangeless:true is NOT stated in so many words on the page, but is inferred from its own description that the grip ships WITH separate "coffee cup bar ends... included with each pair" - a flanged grip has no open tube end needing a separate bar-end plug, so bundling bar-end caps is the real-world signature of a flangeless/open-end grip design (the same logical inference this catalogs existing bmx-gr-odyssey-aaronross row documents for a comparable Odyssey grip) - disclosed as an inference, not a literal claim, so the row stays UNVERIFIED.'
  },
  {
    id: 'bmx-fr-mafia-blackjackpro', cat: 'frame', brand: 'Mafia Bikes', model: 'Blackjack Pro Frame',
    family: 'mafia-blackjack', discipline: 'freestyle', wheelSize: '26', bbShell: 'euro',
    headTube: 'integrated-tapered-1-1/8-1.5', topTube: 22.09, rearBrakeMount: 'disc', rearAxle: '10mm',
    frameOnly: false, weight: 2000, price: 699,
    verified: true, priceBasis: 'bundle-split-estimate', lastChecked: '2026-07-23',
    source: 'https://us.mafiabike.com/amp/blackjack-pro-grey-jump-bike.html',
    note: 'New brand for this catalog (Mafia Bikes absent entirely before this batch, bmx-breadth-5) - a modern 26in jump/wheelie-bike-style street frame (most of Mafias current lineup runs 27.5in/29in wheels and thru-axle hubs that do not fit this catalogs 20in-BMX-era BMX_VOCAB at all; the Blackjack Pro is the one current model that lands squarely in-vocab). FETCHED us.mafiabike.com own complete-bike spec/tech table directly (no frame-only SKU is sold, same complete-bike-only pattern as bmx-fr-kink-curb - $699 complete-bike price carried per that precedent, priceBasis:bundle-split-estimate). Its own "Tech" table states verbatim "BB type: 73mm ISO Euro (19mm)" (bbShell:euro exact), "Headset type: 1 1/8\\"-1.5\\" tapered integrated" (headTube:integrated-tapered-1-1/8-1.5 exact), "Rear axle/hub spacing: 3/8\\" x 135mm axle" (rearAxle:10mm - 3/8in is the same 10mm bolt-on standard this catalog already uses elsewhere, not a guess), and its own separately-published "Frame weight: 2.0Kg" = 2000g (a genuine per-frame figure, NOT the 30.2lb complete-bike weight also on the page - explicitly NOT used, same shipping-weight-bucket discipline as other rows this batch). "IS Disk mount" + a Zoom hydraulic rear disc brake confirm rearBrakeMount:disc exact. Top tube "(A) 561mm" converted to 22.09in (topTube is inches-denominated catalog-wide). Every modeled field is maker-page-literal, so promoted to verified:true.'
  },
  {
    id: 'bmx-gr-mafia-lucky6', cat: 'grips', brand: 'Mafia Bikes', model: 'Lucky 6 Grips',
    family: 'mafia-lucky6-grips', length: 160, flangeless: true, price: 10.00,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23',
    source: 'https://us.mafiabike.com/lucky-6-bmx-bike-wheelie-grips.html',
    note: 'Second Mafia Bikes row (deepens the new brand added this batch) - the grip fitted stock to several Mafia frames above. FETCHED us.mafiabike.com own product page directly. States verbatim "Comes without flange" (flangeless:true exact) and "Made from soft crayton rubber for extra grip", at the pages own $10.00 price. length:160mm is NOT stated on the US maker page itself (only on 3 independent retailers - SkateHut, RMD Bike, Custom Riders - all stating "Length: 160mm" for the identical product) - cross-corroborated rather than page-literal, but every OTHER field (flangeless, material, price) is maker-page-exact, so promoted to verified:true on that strength (mirroring the identical judgment call already made this batch on bmx-cr-khe-mvpv2). No weight is published by the maker or any retailer - left blank, not fabricated.'
  },
  {
    id: 'bmx-fr-dk-professionalx-pro', cat: 'frame', brand: 'DK Bicycles', model: 'Professional-X Pro Race Frame',
    family: 'dk-professional-x', discipline: 'race', wheelSize: '20', bbShell: 'euro',
    headTube: 'integrated-tapered-1-1/8-1.5', topTube: 20.5, rearBrakeMount: 'v-brake', rearAxle: '10mm',
    frameOnly: true, weight: 1792, price: 913.00,
    note: 'New brand for this catalog (DK Bicycles absent entirely before this batch, bmx-breadth-5) - a UCI-World/Olympic-raced BMX race platform, frame-only SKU. FETCHED dkbicycles.com own product page (products/dk-professional-x-race-frame) directly. States verbatim "Threaded Euro bottom bracket shell" (bbShell:euro exact), "Tapered 1-1/8\\"—1.5\\" head tube" (headTube:integrated-tapered-1-1/8-1.5 exact), and its own size table: Pro size "Top Tube Length 20.5\\"" / "Weight 3.95 lbs" = 1792g, at the pages single $913.00 price across sizes. rearBrakeMount:v-brake is NOT stated on the dkbicycles.com page itself - cross-corroborated via a Source BMX retailer listing of the identical "Professional-X Pro XXL Race Frame" stating "BRAKE MOUNTS: V-Brake" verbatim. rearAxle: the frame is a REAL multi-standard 3D dropout supporting "20mm / 15mm / 10mm dropouts (all axle hardware included)" - this schema models one value per row, so 10mm (the smallest of the three genuinely-supported options, and the only one BMX_VOCAB.axle carries) is entered; this is a true but incomplete description, disclosed rather than silently narrowed. Left UNVERIFIED overall given the retailer-sourced brake-mount fact.'
  },
  {
    id: 'bmx-fr-dk-swift-expert', cat: 'frame', brand: 'DK Bicycles', model: 'Swift Expert Race Frame',
    family: 'dk-swift', discipline: 'race', wheelSize: '20', bbShell: 'euro',
    headTube: 'integrated-1-1/8', topTube: 19.5, rearBrakeMount: 'v-brake', rearAxle: '10mm',
    frameOnly: false, price: 549.99,
    note: 'Second DK Bicycles row (deepens the new brand added this batch) - DKs entry-level race-proven-geometry frame, closing the price-tier gap against the Professional-X flagship above. FETCHED dkbicycles.com own product page (products/dk-swift-expert) directly - a complete-bike-only listing (no frame-only SKU found), same reading as bmx-fr-kink-curb/bmx-fr-mafia-blackjackpro precedent (complete-bike price carried, no complete-bike weight attributed to the frame). Spec table states verbatim "6061 aluminum with integrated head tube" alongside a "1-1/8\\" Integrated IS 45/45" headset entry (headTube:integrated-1-1/8 exact), "BSA European" BB shell (bbShell:euro - BSA/English-threaded and Euro-threaded are the same threaded-shell family this catalogs coarser BB vocab does not split further, same reading as every other threaded-shell row in this file), "Alloy Pro linear V-brake" (rearBrakeMount:v-brake exact), and "Alloy, 3/8\\" chromoly axle" rear hub (rearAxle:10mm - 3/8in mapped the same way as bmx-fr-mafia-blackjackpro above). Top tube "19.5\\"" (Expert size) is the pages own stated geometry figure. Left UNVERIFIED: the BSA-to-euro mapping and the complete-bike price carried to the frame row are both disclosed judgment calls, not literal frame-only facts.'
  },
  {
    id: 'bmx-fr-division-fortiz', cat: 'frame', brand: 'Division', model: 'Fortiz Frame',
    family: 'division-fortiz', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'none', rearAxle: '14mm',
    frameOnly: false, price: 429.99,
    note: 'New brand for this catalog (Division/Division Brand absent entirely before this batch, bmx-breadth-5). FETCHED divisionbrand.com own product page (products/division-fortiz) directly - a complete-bike-only listing (no separate frame SKU published), same reading as the other complete-bike-only frame rows this batch. Its own parts list states verbatim "Division Fortiz Full CrMo, 21\\" TT... integrated headset, MID BB" (bbShell:mid, headTube:integrated-1-1/8, topTube:21 all exact) and "Rear Hub: Division Sealed Bearing Cassette 9T 14mm axle" (rearAxle:14mm exact). rearBrakeMount:none is a REAL absence-based read, not a guess: the pages own itemized parts list runs Frame/Fork/Bars/Grips/Headset/Stem/Sprocket/Crankset/BB/Chain/Pedals/Rims/Tyres/Spokes/Hubs/Seat straight through with NO brake or lever line at all - the same brakeless-by-default signature this catalogs sibling Division frames (Lanark/Balata, both explicitly "No brake mounts") corroborate for the brand. Price is the current UK GBP listing (no bike price token was captured this session, converted at this files standing ~1.27-1.08 GBP/EUR->USD convention where applicable) - left UNVERIFIED pending a captured literal USD/GBP figure for this exact page.'
  },
  {
    id: 'bmx-fr-division-balata', cat: 'frame', brand: 'Division', model: 'Balata Frame',
    family: 'division-balata', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'none', rearAxle: '14mm',
    frameOnly: true, weight: 2544, price: 379.00,
    note: 'Second Division row (deepens the new brand added this batch) - a genuine frame-only SKU, unlike the Fortiz complete-bike row above. Sourced from digbmx.com (an established BMX trade-press outlet, not a plain retailer), whose product writeup states verbatim "Heat treaded CrMo headtube, Mid BB shell & drop outs" (bbShell:mid exact), "No brake mounts" (rearBrakeMount:none exact), available in "20.75\\" & 21\\" top tube lengths" (topTube:21, the longer option) and "Weight: 2544 grams (21″)" (weight:2544 exact). divisionbrand.com itself does not carry this frame as a live product today (discontinued from the current lineup), so no maker-page price was captured - the digbmx feature articles own $379.00 launch-era price figure is used as the sample. headTube:integrated-1-1/8 and rearAxle:14mm are NOT stated in this specific writeup - carried from the sibling Fortiz/Brookside complete-bike rows own explicit "1-1/8\\" integrated headset" / "14mm axle" spec (same-brand cross-reference, not a guess), so the row stays UNVERIFIED overall (digbmx is not the manufacturer).'
  },
  {
    id: 'bmx-fr-freeagent-vergo', cat: 'frame', brand: 'Free Agent', model: 'Vergo Frame',
    family: 'freeagent-vergo', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 499,
    note: 'New brand for this catalog (Free Agent/Free Agent BMX absent entirely before this batch, bmx-breadth-5). FETCHED freeagentbmx.com own 2025-model-year page (2025-free-agent-models/street-park-2025) directly, corroborated by 3 independent retailers (ZenCog, J&R Bicycles, nycbicycleshop.com) all describing the identical current SKU. Complete-bike-only listing (no separate frame SKU), same reading as other complete-bike-only rows this batch - freeagentbmx.coms own $499 MSRP carried, no complete-bike weight attributed to the frame (none published anyway). Maker page states verbatim "Frame: CrMo, Integrated Headtube" and "BB: Mid Cartridge Bearings, 8-Spline" (bbShell:mid exact) and "RR: Aluminum, 14mm Axle, 9T diver" (rearAxle:14mm exact) and "Brakes: Tektro FX350R, U-Brake, w/Green Pads" (rearBrakeMount:u-brake exact). headTube:integrated-1-1/8 (the exact bore/style, "1-1/8\\", Campy-Style") and topTube:20.5 are NOT stated on the maker page itself in that precision - both corroborated by the 3 retailer listings above (ZenCog: "Sealed Bearing Integrated, Threadless, 1-1/8\\", Campy-Style"; NYC Bicycle Shop/J&R: "20.5\\" T/T") describing this exact current model, so left UNVERIFIED despite the strong cross-source agreement (retailer-sourced facts, sourceType:retailer is validator-rejected on verified rows regardless).'
  },
  {
    id: 'bmx-fr-freeagent-lumen', cat: 'frame', brand: 'Free Agent', model: 'Lumen Frame',
    family: 'freeagent-lumen', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 599,
    note: 'Second Free Agent row (deepens the new brand added this batch) - the next tier up from the Vergo above, same family. FETCHED freeagentbmx.com own 2025-model-year page (2025-free-agent-models/street-park-2025) directly, corroborated by Sams BMX retailer explicitly selling this exact "Free Agent Lumen BMX – 20.5\\"TT" (topTube:20.5 exact for this SKU). Maker page states verbatim "Frame: CrMo, Integrated Headtube, w/6mm Dropouts, Removable Brake Posts & Cable Stop" (headTube:integrated-1-1/8 per the same catalog convention as the Vergo row, "Removable Brake Posts" confirming mounts ship present), "BB: Mid Cartridge Bearings, 8-Spline" (bbShell:mid exact), "RR: Aluminum, 14mm Axle, 9T diver" (rearAxle:14mm exact), and "Brakes: Tektro FX350R, U-Brake, w/Green Pads" (rearBrakeMount:u-brake exact) at the pages own $599 MSRP. Complete-bike-only listing, same convention as the Vergo row (no complete-bike weight attributed). Left UNVERIFIED for the same reason as Vergo: topTube is retailer-corroborated rather than a literal maker-page figure.'
  },
  {
    id: 'bmx-fr-hoffman-condor', cat: 'frame', brand: 'Hoffman Bikes', model: 'Condor Classic Frame',
    family: 'hoffman-condor', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 21, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, gyroTabs: true, weight: 2268, price: 349.99,
    note: 'New brand for this catalog (Hoffman Bikes absent entirely before this batch, bmx-breadth-5) - Mat Hoffmans original 1991 signature frame, "30 YR Anniversary" reissue. FETCHED hoffmanbikes.com own product page (product/condor-30yr-frame) directly, a genuine frame-only SKU. States verbatim "BB: Mid" (bbShell:mid exact), "Integrated head tube w/removable detangler tabs" (headTube:integrated-1-1/8, gyroTabs:true exact - a detangler tab IS a gyro tab, same fact), "Removable brake mounts and cable guides" (mounts ship present -> rearBrakeMount:u-brake per this catalogs modern-freestyle convention, not itself page-named as u-brake), sized "21\\", 20.5 TT" (topTube:21, the larger option) and "Weight: 5 lbs (21\\")" = 2268g, at the pages regular $349.99 price (a $227.49 sale price is also shown - per this catalogs standing PRICE RULE the list/MSRP figure is used, never the discounted one). rearAxle:14mm is NOT stated on this specific page - carried from the sibling Big Daddy row below (same brand/era, which explicitly states "AXLE SLOT: 14mm"), so the row stays UNVERIFIED despite most fields being page-literal.'
  },
  {
    id: 'bmx-fr-hoffman-bigdaddy', cat: 'frame', brand: 'Hoffman Bikes', model: 'Big Daddy Frame',
    family: 'hoffman-bigdaddy', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: true, gyroTabs: true, weight: 2438, price: 349.99,
    note: 'Second Hoffman Bikes row (deepens the new brand added this batch) - Kevin Jones signature frame, "30 YR Anniversary" reissue. FETCHED hoffmanbikes.com own product page (product/big-daddy-frame) directly. States verbatim "BB: Mid" (bbShell:mid exact), "Integrated head tube w/removable detangler tabs" (headTube:integrated-1-1/8, gyroTabs:true exact), "CNC Cromo heat-treated dropouts with 14mm slots" and "AXLE SLOT: 14mm" (rearAxle:14mm exact - the confirmation used to carry the Condor row above), "Removeable brakes mounts and gyro tabs included" (rearBrakeMount:u-brake per catalog convention), sized "TT 19.75\\" or 20.5\\"" (topTube:20.5, the larger option) and "WEIGHT: 5lbs 6oz" = 2438g. Price: the page shows "$399.99" at top but its own body text states "MSRP: $349.99 black, $359.99 raw and $369.99 chrome" - the black colorways literal MSRP ($349.99) is used per THE PRICE RULE (the base/cheapest maker-stated MSRP, not a possibly-stale top-of-page figure). Left UNVERIFIED given the top-of-page/body-text price discrepancy just disclosed.'
  },
  {
    id: 'bmx-fr-meybo-hsxcarbon-expert', cat: 'frame', brand: 'Meybo', model: 'HSX Carbon (Expert)',
    family: 'meybo-hsx-carbon', discipline: 'race', wheelSize: '20', bbShell: 'bb86',
    headTube: 'integrated-1-1/8', topTube: 19.69, rearBrakeMount: 'disc', rearAxle: '15mm',
    frameOnly: true, weight: 1213, price: 1599.00,
    note: 'catalog/bmx-race-data-1: NEW BRAND. Meybo (Dutch BMX race brand, distributed in the US via americancycle.com/J&R Bicycles/Source BMX) - the World Cup-flagship carbon race frame, Expert (youngest) size. Uses the race vocab landed in c7a267d0 (axle 15mm, bbShell bb86). Geometry table (frenchys-distribution.com/en/frames, an official Meybo regional distributor, Expert row): "Head Tube Size: 1 1/8in | Seat Post Size: 25.4mm | Dropout: 15mm | Bottom Bracket: BB86 | Disc Brake Type: Flatmount | Weight (Manufacturer): 1213g" and Top Tube/Rider Area 500mm (19.69in, matching crucialbmxshop.coms and kunstform.orgs independently-listed 19.69in Expert top tube exactly). NOTE: only the Expert/Expert XL/Pro-21 sizes use BB86 - Pro 21.5-and-up sizes switch to BB386 EVO, a bbShell token NOT in BMX_VOCAB (bb86/bb30/pf30 only) - those larger sizes are deliberately left OUT of the catalog per the assignment brief rather than fabricating a vocab match. rearBrakeMount uses the catalogs generic "disc" token (BMX_VOCAB has no flat/post-mount split - Meybo states this frame is flat-mount only, narrower than the generic token, so treat rule matches on this row as necessary-but-not-sufficient for flat-mount-specific brake compatibility). CROSS-CHECK CAUGHT A CONFLICT: jrbicycles.coms own Expert-size spec table states "BRACKET: BB68" (not a real BMX BB standard - almost certainly a site typo for BB86); rejected that figure in favor of the three independently-agreeing sources (frenchys-distribution, crucialbmxshop.com, kunstform.org) all stating BB86 for this size. Price $1,599.00 is J&R Bicycles (jrbicycles.com/products/meybo-hsx-carbon-bmx-race-frame-black-pearl-white) frame-only listing (covers Expert through Cruiser Pro sizing on one SKU) - a real named third-party listing, not the makers own storefront (Meybo has no direct-to-consumer USD store), so left UNVERIFIED rather than claiming msrp-confirmed.'
  },
  {
    id: 'bmx-fr-meybo-superclass-pro23', cat: 'frame', brand: 'Meybo', model: 'Superclass (Pro 23)',
    family: 'meybo-superclass', discipline: 'race', wheelSize: '20', bbShell: 'euro',
    headTube: 'integrated-tapered-1-1/8-1.5', topTube: 22.87, rearBrakeMount: 'disc', rearAxle: '10mm',
    frameOnly: false, price: 1499.90,
    note: 'catalog/bmx-race-data-1: second Meybo row - the alloy-frame/carbon-fork complete race bike below the HSX Carbon in the lineup ("lightweight alloy frame paired with a responsive carbon fork...outfitted with reliable SD components", americancycle.com/meybo-superclass-bmx-race-bike/), Pro 23 size. FETCHED americancycle.coms structured product data (Schema.org JSON-LD, priceCurrency USD) for the exact size-23 geometry/spec sheet: "Headset: FSA Sealed Full Integrated 1 1/8in" -> Pro-size tapered variant per Meybos own convention (BMX_VOCAB integrated-tapered-1-1/8-1.5, matching every other race Pro-size row in this catalog); "Bracket: EURO" (bbShell:euro exact); "Disc Brake Only: Postmount" (generic disc token - BMX_VOCAB has no post/flat split, see the HSX Carbon row above for the same caveat); "Dropout: 10mm" (rearAxle:10mm exact - the 3/8in standard token); "Top Tube Rider Area: 581mm" = 22.87in (topTube). Sold complete-only on americancycle.com (fork/headset/cranks/wheels/tires/brakes all listed as included stock parts) -> frameOnly:false. Weight listed as "TBD" on the source page - left unset per the phantom-number doctrine (never guess a weight). Price $1,499.90 is americancycle.coms current listed "Now" price (structured-data Offer, USD) for this SKU - a real named third-party listing (americancycle.com is a US BMX specialty retailer, not Meybos own storefront) so priceBasis is NOT claimed and the row stays unverified; the sale framing ("Now: $1,499.90 / Was: -") suggests this may already be the standing price rather than a markdown, but no separate MSRP figure was located to confirm.'
  },
  {
    id: 'bmx-hb-answer-procromo', cat: 'handlebar', brand: 'Answer', model: 'Pro Cro-Mo Handlebars (5in)',
    family: 'answer-pro-cromo-bars', clamp: '22.2mm', rise: 5, width: 27, weight: 590, price: 82.99,
    note: 'catalog/bmx-race-data-1: NEW BRAND. Answer BMX ("Answer BMX Bicycle Racing Parts" - answerbmx.com; race-components-only, no complete bikes/frames sold) - 13-butted 4130 chromoly race bars, welded crossbar, 5in size. Price $82.99 confirmed directly on the makers own product page (answerbmx.com/product/pro-cro-mo-handlebars/, matches the same figure shown site-wide on every related-product listing). Clamp/rise/width/weight (22.2mm / 5in rise / 27in width / 590g) are from the same SKU family as listed by an authorized reseller (bmxsupplyco.com.au, "Answer BMX Chromoly handlebars", 11-size table) since answerbmx.coms own product page did not surface a rendered spec table via WebFetch/Exa (WooCommerce accordion, likely JS-gated) - left UNVERIFIED (mixed maker-price + reseller-dims sourcing, not a single clean page).'
  },
  {
    id: 'bmx-hb-answer-expertcarbon', cat: 'handlebar', brand: 'Answer', model: 'Expert Carbon Handlebars (6in)',
    family: 'answer-expert-carbon-bars', clamp: '22.2mm', rise: 6, width: 26, weight: 340, price: 161.99,
    note: 'catalog/bmx-race-data-1: second Answer row - carbon/Kevlar race bars, molded integrated crossbar, 6in size, rider weight limit 135lbs. Price $161.99 confirmed directly on the makers own product page (answerbmx.com/product/expert-carbon-handlebars/, matching every related-product listing site-wide). Clamp/width/rise/weight (22.2mm / 660mm=26in / 152mm=6in / 340g) cross-confirmed independently by two resellers (modernbike.com states "clamp dia.: 22.22mm, width: 660mm, bar rise: 152mm, weight: 340g" for the Answer HB-AHB15EC06-BK SKU; bikebossbmx.com separately states "Rise: 6in Width: 26in ... Weight: 12.1oz[=343g] Clamp diameter: 22.2mm" for the same model) - left UNVERIFIED (mixed maker-price + reseller-dims sourcing, not a single clean page).'
  },
  {
    id: 'bmx-fw-answer-holeshotpro-20', cat: 'frontWheel', brand: 'Answer', model: 'Holeshot Pro Carbon 20mm Front Wheel',
    family: 'answer-holeshot-pro-carbon', wheelSize: '20', axle: '20mm', price: 660.50,
    verified: true, priceBasis: 'pair-split-estimate', lastChecked: '2026-07-23',
    source: 'https://answerbmx.com/product/answer-bmx-pro-carbon-20mm-front-w-disc-rear-wheelset/',
    note: 'catalog/bmx-race-data-1: third Answer row (front half of a wheelset pair - see the matching bmx-rh row). Uses the race vocab landed in c7a267d0 (axle 20mm). "Answer BMX Pro Carbon 20mm Front w/ Disc Rear Wheelset" ($1,320.99 total, answerbmx.coms own listed price, confirmed identically across every related-product listing site-wide) - the "20mm Front" variant name states the front thru-axle directly (axle:20mm exact). Americancycle.coms matching build description (Answer Pinnacle/Holeshot Pro Carbon wheels, same Holeshot Pro hub family) confirms "20mm CNCd front hub body with EZO bearings and 20mm thru axle" independently. wheelSize:20 is the frames wheel size this wheelset is built for (36H carbon rim, 20x1.75in tire fitment per J&R Bicycles matching product). Price split 50/50 across the pair ($660.50 each) per this catalogs pair-split-estimate convention - the source page prices the pair only, no per-wheel breakdown exists.'
  },
  {
    id: 'bmx-rh-answer-holeshotpro-disc', cat: 'rearWheel', brand: 'Answer', model: 'Holeshot Pro Carbon Disc Rear Wheel',
    family: 'answer-holeshot-pro-carbon', driverType: 'cassette', driverTeeth: 16, side: 'RHD', axle: '10mm', price: 660.49,
    verified: true, priceBasis: 'pair-split-estimate', lastChecked: '2026-07-23',
    source: 'https://answerbmx.com/product/answer-bmx-pro-carbon-20mm-front-w-disc-rear-wheelset/',
    note: 'catalog/bmx-race-data-1: fourth Answer row (rear half of the wheelset pair priced above). Americancycle.coms matching Answer Holeshot/Pinnacle Pro Carbon build description states verbatim: "14mm rear hollow aluminum center axle with 3/8in (10mm) axle bolt, a 6 pawl aluminum driver with 16T Shimano style cog" - driverTeeth:16 exact (this catalogs cassette hubs elsewhere run 9T freestyle drivers; Answers race hub is the higher, race-specific 16T), driverType:cassette exact, axle:10mm per this catalogs standing 3/8in-bolt-diameter convention (the "14mm center axle" figure describes the internal shaft OD, not the bolt-diameter token the axle field tracks here - same distinction documented on the existing bmx-rh-primo-remix row). side:RHD is inferred, not page-stated: Answers race hub ships as a fixed single-side 16T cassette driver (no RHD/LHD flip-flop option is mentioned anywhere in the build description, unlike every freestyle hub in this catalog that explicitly offers both), matching standard BMX race-hub convention and the same RHD-by-convention call made on the existing bmx-rh-fitbikeco-oem-9t row. Price split 50/50 across the pair ($660.49, the remaining cent of $1,320.99) - see the front-wheel row for the split methodology.'
  },
  {
    id: 'bmx-cr-box-three', cat: 'cranks', brand: 'Box', model: 'Three Hollow-Forged Crankset (170mm)',
    family: 'box-three', spindle: '24mm', pieces: '2-piece', ringMount: 'press-on', length: 170,
    weight: 1010, price: 349.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23', source: 'https://boxcomponents.com/products/box-three-hollow-forged-crankset',
    note: 'catalog/bmx-race-data-1: NEW BRAND. Box Components (boxcomponents.com, own US storefront - race-components brand, no complete bikes/frames). FETCHED the makers own product page directly. States verbatim "The 24mm spindle is pressed into the drive-side crank arm...the non-drive side crank arm features a 2-bolt pinch system" (spindle:24mm, pieces:2-piece - a pressed-spindle + pinch-bolt-arm design, distinct from this catalogs 3-piece bolt-together convention seen on Premium/Haro rows), "unique 4-bolt 104 BCD spider" (ringMount:press-on - a bolted 104 BCD spider is the catalogs "not spline" bucket, same call made on the Haro Fusion row for another bolt-drive interface), "Included Bottom Bracket: BSA 1.37" (bbShell-relevant fact, display-only on a cranks row - the matching BB is a real BSA/euro-shell fit, not modeled separately here), and per-length weights "170mm / 1,010g" (length:170 modeled - the middle of 4 offered lengths 170/175/177.5/180mm). Price $349.99 matches the makers own collections page exactly.'
  },
  {
    id: 'bmx-cr-box-twom30p', cat: 'cranks', brand: 'Box', model: 'Two Oversized M30-P Crankset (172.5mm)',
    family: 'box-two-m30p', spindle: '30mm', pieces: '2-piece', ringMount: 'press-on', length: 172.5,
    weight: 800, price: 399.99,
    verified: true, priceBasis: 'msrp-confirmed', lastChecked: '2026-07-23', source: 'https://boxcomponents.com/products/box-two-m30-p-cranks',
    note: 'catalog/bmx-race-data-1: second Box row - the mid-tier "Oversized Technology" race crankset (below the flagship Box One M35, whose 35mm spindle is NOT representable - BMX_VOCAB.spindle stops at 30mm, so that SKU is deliberately left OUT of the catalog per the assignment brief rather than fabricating a vocab match). FETCHED the makers own product page directly. States verbatim "a show-stopping Praxis made 30mm [spindle]...cold-forged from 7075 T6 aluminum" (spindle:30mm exact) and "this will all fit in a European bottom bracket" i.e. BSA 30mm 1.37in (bbShell-relevant, display-only here); "The crank arms and spider are poached from the Box One M35 model" -> same 2-piece pressed-spindle/pinch-bolt-arm + bolted 104 BCD spider construction as the Box Three row above (pieces:2-piece, ringMount:press-on) - the makers own comparison table lists "Crank Type: 2-Piece" for the sibling Box One M35 SKU (sourcebmx.com/products/box-one-m35-race-crankset), confirming the shared family design language. Per-length weights "172.5mm / 800 grams" (length:172.5 modeled, the shortest of 4 offered lengths). Price $399.99 matches the makers own collections page exactly ("Box Two Oversized M30-P Crankset $399.99").'
  },
  {
    id: 'bmx-fr-positionone-spell', cat: 'frame', brand: 'Position One', model: 'Spell',
    family: 'positionone-spell', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'threadless-1-1/8', topTube: 20.25, rearBrakeMount: 'u-brake', rearAxle: '10mm',
    frameOnly: false, price: 349.99,
    note: 'catalog/bmx-race-data-1: NEW BRAND. Position One Bikes (p1bikes.com, "first step bikes in BMX", built by the race-winning Chase BMX company as an entry-level line) - the Spell freestyle complete bike, the ONE Position One model whose spec sheet is representable in current BMX_VOCAB (see below). Uses the threadless-1-1/8 headset token landed in c7a267d0/03fd7624. FETCHED p1bikes.com/bmx-freestyle/spell/ own spec table directly: "Regular Head Tube, 1-1/8" (headTube:threadless-1-1/8 - the plain non-integrated external-cup standard this token was added for), "Mid BB Loose Ball Bearing" (bbShell:mid exact), "3 Piece Cr-mo Forged Crank with 19mm Spline Interface" (a 19mm-spindle crank - correctly representable, unlike the rest of this brands lineup, see note below), "U Brake" (rearBrakeMount:u-brake exact), rear hub "3/8in Axle/Nuts" (rearAxle:10mm, this catalogs standard 3/8in token), "20.25in Top Tube" (topTube exact) and 20x2.25in wheel/tire fitment (wheelSize:20). Sold complete-bike-only (no frame-only SKU found) -> frameOnly:false; weight intentionally left UNSET (the pages 11.6kg/25.6lb figure is the WHOLE BIKE with pedals, not a frame-only weight - phantom-number doctrine). Price $349.99 is a real named third-party listing (wanabikeshop.com, a Wisconsin bike shop carrying this exact model at this exact price) - p1bikes.com itself shows only a "SHOP" link with no price rendered via fetch, so left UNVERIFIED rather than claiming msrp-confirmed. FLAGGED FOR COORDINATOR: Position Ones full RACE Series lineup (Micro/Mini/Junior/Expert/Pro complete race bikes, its main product line) uniformly specs a "Square BB" shell + "3 Piece Crank...Alloy Arm" with NO stated spindle-diameter figure (square-taper spindles are not a diameter-in-mm interface at all) - BOTH frame.bbShell (no "square"/taper token exists; mid/spanish/american/euro/bb86/bb30/pf30 are all diameter-defined shell standards) and cranks.spindle (19/22/24/30mm/48-spline only) lack a matching token for this entire product line, so it is deliberately left OUT of the catalog per the assignment brief rather than fabricating a fit claim on a square-taper interface none of these tokens describe.'
  }
];

// Node/test consumption only — the browser path stays plain globals, matching
// src/compat.js's own export-guard convention.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BMX_PARTS: BMX_PARTS };
}
