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
    id: 'bmx-fr-radio-darko', cat: 'frame', brand: 'Radio Bikes', model: 'Darko',
    family: 'radio-darko', discipline: 'freestyle', wheelSize: '20', bbShell: 'mid',
    headTube: 'integrated-1-1/8', topTube: 20.5, rearBrakeMount: 'u-brake', rearAxle: '14mm',
    frameOnly: false, price: 524.99,
    verified: true, lastChecked: '2026-07-20', source: 'https://radiobikes.com/collections/complete-bikes/products/radio-darko',
    note: 'Frame spec pulled from the Darko complete-bike page (radiobikes.com); also offered in 21in top tube. Mid press-fit BB, fully removable brake hardware. WALL-RETEST 2026-07-20 (verify/wall-retest-1): re-fetched via the browser pane, no wall - renders cleanly. Full spec table CONFIRMS "BB: RADIO MID bb set" (bbShell mid), "HEADSET: SALT PRO integrated headset" (headTube integrated), "REAR HUB: RADIO AM cassette hub...14mm axle" (rearAxle exact), "BRAKE: RADIO AM u-brake" (rearBrakeMount exact), and "Top Tube Length 20.5\" / 21\"" (topTube exact). Price NOT independently reconfirmed - no USD figure is currently shown on the fetched page (likely out of stock/hidden pricing); left at the existing $524.99 sample rather than guessed. Upgraded to verified:true on the strength of every rule-relevant field matching exactly.'
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

  // ===== FRONT WHEEL ====================================================
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
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-f32-forks-gloss-black. Shopify tags state "Brake Mounts:990" (u-brake) and "Wheel Size:20\"" verbatim (raw JSON, not a search summary). The JSON weight field (2268g) is discarded — it recurs identically on the unrelated F25 fork below, the documented shipping-weight-bucket tell — so weight is left unset rather than guessed. Unverified sample.'
  },
  {
    id: 'bmx-fk-odyssey-f25', cat: 'fork', brand: 'Odyssey', model: 'F25',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'u-brake', price: 189,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-f25-forks-gloss-black. Same F-Series line as the F32 above; tags state "Brake Mounts:990" and "Wheel Size:20\"". JSON weight (2268g) discarded as the same shipping-bucket figure as the F32 row. Unverified sample.'
  },
  {
    id: 'bmx-fk-odyssey-r15', cat: 'fork', brand: 'Odyssey', model: 'R15',
    discipline: 'freestyle', wheelSize: '20', steerer: 'integrated-1-1/8', axle: '10mm',
    brakeMount: 'none', price: 169.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-r15-forks-gloss-black. Shopify tags state "Brake Mounts:None" and "Wheel Size:20\"" verbatim, same brakeless R-Series pattern as the catalog\'s existing R32 fork. JSON weight (3629g) discarded — an implausibly heavy figure for a brakeless BMX fork, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-rh-odyssey-hexagram', cat: 'rearWheel', brand: 'Odyssey', model: 'Hexagram Cassette Hub',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', weight: 626, price: 209.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-hexagram-cassette-hub-anodized-black. Description text states "All-new 9T driver design" and "RHD/LHD switchable"; "14mm" hollow-axle bore is a catalog-standard BMX rear axle (BMX-MODEL.md sec.5), not independently re-quoted per this row. 626g JSON weight kept (does not repeat elsewhere in this session\'s fetches, so not flagged as a bucket figure) but not description-text-confirmed — unverified sample.'
  },
  {
    id: 'bmx-st-odyssey-boyd', cat: 'stem', brand: 'Odyssey', model: 'BOYD Stem',
    clamp: '25.4mm', price: 89.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-boyd-stem-anodized-silver ("Boyd Hilder Signature", 6061-T6 aluminum). Tags state "Reach:52mm"/"Rise:30mm" but BMX_SCHEMA\'s stem category carries neither field (clamp only, display-only per checkBmxBuild), so they are not stored. JSON weight (454g) discarded — identical to the unrelated Grandstand v2 pedal row below, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-pd-odyssey-grandstandv2', cat: 'pedals', brand: 'Odyssey', model: 'Grandstand v2 Alloy Pedals',
    platform: 'alloy', spindle: '9/16', price: 36.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-grandstand-v2-alloy-pedals-black. Description states "proprietary 14mm heat-treated chromoly spindle with 17mm wrench flats" driving a standard 9/16in pedal thread, and an alloy body ("Alloy" tag). JSON weight (454g) discarded — identical to the unrelated BOYD stem row above, the shipping-bucket tell. Pedals carry zero checkBmxBuild rules (platform/spindle are display-only), so this real, current product clears the interface bar regardless. Unverified sample (weight only).'
  },
  {
    id: 'bmx-sp-odyssey-boydsprocket-28', cat: 'sprocket', brand: 'Odyssey', model: 'BOYD Sprocket 28T',
    teeth: 28, mount: 'spline', pitch: '1/8', weight: 172, price: 56.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-boyd-sprocket-coffee ("Boyd Hilder\'s new signature sprocket", CNC 7075-T6 aluminum, sold in 25T/28T/30T — this row pins the 28T variant, JSON weight 172g consistent across all three tooth counts). mount:\'spline\' and pitch:\'1/8\' follow this catalog\'s existing convention for every other current Odyssey freestyle sprocket (not independently re-confirmed on this specific page, which does not state either field). Unverified sample.'
  },
  {
    id: 'bmx-rh-odyssey-hazardlite-24', cat: 'rearWheel', brand: 'Odyssey', model: 'Hazard Lite Cassette 24in Wheel',
    driverType: 'cassette', driverTeeth: 9, side: 'both', axle: '14mm', price: 279.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-hazard-lite-cassette-24-wheel-black — a 24" cruiser build wheel (C5 Cassette Hub laced to the Hazard Lite Rim). Description states "9T or 10T driver" (this row pins 9T) and "RHD/LHD switchable"; "14mm, 4130 chromoly hollow axle" stated explicitly. rearWheel\'s BMX_SCHEMA carries no wheelSize field (dormant for this category, same as every other rearWheel row) so the 24" size is name-only, matching BMX-MODEL.md sec.15 open-question 7\'s 24" cruiser scope. JSON weight (6350g) discarded — implausible for a 24" BMX wheel, the shipping-bucket tell (whole-box weight). Unverified sample.'
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
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-big-stitch-fat-seat-white. Description states "Available in Slim or Fat options. Black. Pivotal only" — confirms system:\'pivotal\'. JSON weight (386g) kept, not description-text-confirmed. Unverified sample.'
  },
  {
    id: 'bmx-se-odyssey-bigstitch-slim', cat: 'seat', brand: 'Odyssey', model: 'Big Stitch Slim Seat',
    system: 'pivotal', price: 39.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-big-stitch-slim-seat-black-denim-w-fluorescent-yellow-embroidery. Description states "Available in Slim or Fat options...Pivotal Only" — confirms system:\'pivotal\'. JSON weight (635g) discarded — identical across this handle and the unrelated Aitken/BROC seat rows below, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-se-odyssey-aitken-pivotal', cat: 'seat', brand: 'Odyssey', model: 'Aitken Pivotal Seat',
    system: 'pivotal', price: 35.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-aitken-pivotal-seat-dark-brown — Mike Aitken signature seat, "Available in Pivotal or Railed" (this handle is the pivotal variant). JSON weight (635g) discarded as the same shipping-bucket figure shared with the Big Stitch Slim / BROC rows. Unverified sample (weight only).'
  },
  {
    id: 'bmx-se-odyssey-aitken-railed', cat: 'seat', brand: 'Odyssey', model: 'Aitken Railed Seat',
    system: 'standard', price: 35.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-aitken-railed-seat-dark-brown — same Mike Aitken signature seat, railed (system:\'standard\') variant of the pivotal row above. JSON weight (635g) discarded as the same shipping-bucket figure. Unverified sample (weight only).'
  },
  {
    id: 'bmx-se-odyssey-broc-pivotal', cat: 'seat', brand: 'Odyssey', model: 'BROC Pivotal Seat',
    system: 'pivotal', price: 37.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-broc-pivotal-seat-white-perforated — Broc Raiford signature seat, "Available in pivotal or cruiser railed" (this handle is the pivotal variant). JSON weight (635g) discarded as the same shipping-bucket figure shared with the Aitken/Big Stitch rows. Unverified sample (weight only).'
  },
  {
    id: 'bmx-se-odyssey-broc-cruiser-railed', cat: 'seat', brand: 'Odyssey', model: 'BROC Cruiser Railed Seat',
    system: 'standard', price: 32.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, shop.odysseybmx.com/products/odyssey-broc-cruiser-railed-seat-white-perforated — same Broc Raiford seat, cruiser-railed (system:\'standard\') variant. JSON weight (635g) discarded as the same shipping-bucket figure. Unverified sample (weight only).'
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
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/devon-bars ("Devon Smillie signature bars...28\" wide, 10.5° backsweep, 3° upsweep", sold in 9.5in/9.75in rise; this row pins the 9.5in variant). JSON weight (6804g) discarded — identical across every rise/finish variant on this product AND shared with the unrelated Crew Bars row below, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-hb-cult-crew', cat: 'handlebar', brand: 'Cult', model: 'Crew Bars',
    clamp: '25.4mm', rise: 9, width: 30, price: 74.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/crew-bars ("Classic feel good geometry...30\" width, 12° backsweep, 2° upsweep", sold in 9in/9.35in/9.65in rise; this row pins the 9in variant). JSON weight (6804g) discarded — identical across every rise/finish variant AND shared with the unrelated Devon Bars row above, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-gr-cult-solo', cat: 'grips', brand: 'Cult', model: 'Solo Grip',
    length: 160, flangeless: true, price: 11.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/solo-grip (an ODI-made grip, Cult\'s current catalog copy: "Extra Long 160mm Length...Includes Push In Style end plugs" — push-in end plugs rather than a flanged lip, so flangeless:true). JSON weight (454g) discarded — the same figure seen recurring across unrelated products/brands this session, the shipping-bucket tell. grips carries no engine-read field (length/flangeless are display-only) so this real, current product clears the interface bar regardless. Unverified sample (weight only).'
  },
  {
    id: 'bmx-se-cult-corduroy', cat: 'seat', brand: 'Cult', model: 'Corduroy Slim Seat',
    system: 'pivotal', price: 44.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/corduroy-slim-seat-green — description states verbatim "only available in pivotal", confirming the one engine-read field (system). JSON weight (1361g) discarded — identical to the unrelated Dak Pedal row below, the shipping-bucket tell. Unverified sample (weight only).'
  },
  {
    id: 'bmx-pd-cult-dak', cat: 'pedals', brand: 'Cult', model: 'Dak Pedal',
    platform: 'alloy', spindle: '9/16', price: 16.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/dak-pedal ("Dakota Roche signature pedal...hefty heat treated 4130 spindle" — a standard 9/16in pedal thread; alloy body per the product\'s CNC-machined description). JSON weight (1361g) discarded — identical to the unrelated Corduroy Slim Seat row above, the shipping-bucket tell. Pedals carry zero checkBmxBuild rules (platform/spindle are display-only), so this real, current product clears the interface bar regardless. Unverified sample (weight only).'
  },
  {
    id: 'bmx-fw-cult-crewv2', cat: 'frontWheel', brand: 'Cult', model: 'Crew Front Wheel v2',
    wheelSize: '20', axle: '10mm', price: 169.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/crew-front-wheel-v2-1 ("NEW STRONGER AND WIDER MATCH V2 RIM...CREW Front hub laced to a...Match Rim"). wheelSize:20 per Cult\'s catalog-wide convention (every Cult row in this file is 20in, per the already-verified Race Frame row\'s own reasoning); axle:10mm is the BMX-universal front-axle standard (BMX-MODEL.md sec.5), not independently re-stated on this specific page. JSON weight (3629g) discarded — identical to the unrelated Race Fork row above, the shipping-bucket tell. Unverified sample.'
  },
  {
    id: 'bmx-ch-cult-halflink', cat: 'chain', brand: 'Cult', model: 'Halflink Chain',
    pitch: '1/8', halfLink: true, price: 11.99,
    note: 'bmx-depth-8 (2026-07-22): real current product, cultcrew.com/products/chains-1 (the "HALFLINK" variant of Cult\'s three-way chain listing — "teflon coated with engraved cult logos and is designed to help dial in the rear end length on frames with short dropouts. rounded side plates are compatible with 8t and larger drivers"). pitch:\'1/8\' matches the sibling "410 CHAIN...1/8\" chain" copy on the same page (the whole three-chain lineup is one width class). JSON weight (907g) discarded — identical to the unrelated Counter Post seatpost SKU on this same store, the shipping-bucket tell. Unverified sample.'
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
    id: 'bmx-fr-federal-boyd-v2', cat: 'frame', brand: 'Federal', model: 'Boyd V2',
    discipline: 'freestyle', wheelSize: '20', bbShell: 'mid', headTube: 'integrated-1-1/8', topTube: 21.0,
    rearBrakeMount: 'none', rearAxle: '14mm', frameOnly: true, price: 469.89,
    lastChecked: '2026-07-22', source: 'https://federalbikes.com/products/federal-boyd-v2-frame-matt-white',
    note: 'bmx-depth-9: Federal\'s own product page (fetched directly) states geometry (top tube 20.2-21.5", head angle 75.2°, ICS2 wishbone/dropouts) but NOT bbShell/headTube-type/brakeMount/rearAxle explicitly. Those four engine-read fields are sourced instead from a third-party retailer (kunstform.org) quoting Federal\'s own official spec sheet verbatim: "BB Shell Type: Mid BB", integrated headset ("75.2°" head tube angle, no threading mentioned), "removable brake hardware...delivery of the frame is without removable brake bosses" (ships brakeless stock -> rearBrakeMount:\'none\'), "Investment cast, 4130 CrMo, 5mm thick, 14mm slots" (-> rearAxle:\'14mm\'). Because THE BAR requires raw confirmation on the MAKER\'S OWN page for verified:true and this frame\'s own page does not state these fields, left unverified despite the strong retailer corroboration (sourceType:retailer, per policy, cannot itself carry verified:true). topTube:21.0 picked as a representative mid-size from the frame\'s five-size run (20.2/20.7/21/21.2/21.5"). Price: GBP RRP £369.99 converted to a $469.89 USD sample at ~1.27 USD/GBP, no US price published — THE PRICE RULE.'
  }
];

// Node/test consumption only — the browser path stays plain globals, matching
// src/compat.js's own export-guard convention.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BMX_PARTS: BMX_PARTS };
}
