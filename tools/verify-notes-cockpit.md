# Cockpit & finishing cluster — verify/cockpit-1

Format: `<id> | Verified|Skipped|Failed | <source URL or reason>`

## cog

- cg-dmr-13t | Skipped | Interface (13T, 1/8in via YBN MK918 half-link) confirmed at https://dmrbikes.com/products/dmr-sect-pro-international (fetched 2026-07-18) but DMR publishes no per-cog weight; cog isn't a formalized interface-verification exception category (only shocks/wheels are) so weight bar blocks verified:true. No catalog change needed - data already matches the manufacturer page.
- cg-scott-12t | Skipped | scott-sports.com product page 404s; every source found (vitalmtb, mtbdatabase, tracebikes, bikes.fan) is a retailer/aggregator quoting the OEM build sheet, not Scott's own page. Cannot meet fetched-manufacturer-page bar. No catalog change.
- cg-generic-ss-16t | Skipped | Deliberately brand-agnostic generic aftermarket cog (row's own desc says so) - no manufacturer exists to fetch a page from. Not verifiable by definition.

## seatpost

- sp-reverse-comp-316 | Verified | https://reverse-components.com/en/products/comp-%C3%B8316mm - exact match: 31.6mm, 339g, part #00651.
- sp-thomson-elite-272 | Verified | https://bikethomson.com/product/elite-seatpost/ - 27.2mm confirmed (1 of 18 diameters); weight updated 220g->228g (page's own 330mm/MTB figure), price updated $90->$70 (page MSRP $69.95).
- sp-raceface-ride-309 | Verified | https://www.raceface.com/products/ride-seatpost - exact match: 30.9mm, 295g.
- sp-raceface-ride-272-400 | Skipped | raceface.com's own "Ride" page only lists a 375mm/295g variant (27.2/30.9/31.6mm diameters exist, but not at 400mm/230g as catalogued). A separate discontinued "Ride XC" SKU (RF1798, 27.2x400mm) shows up on retailer sites at ~334g, not 230g - real discrepancy, left unverified rather than force a mismatched figure.
- sp-newmen-advanced-carbon-272-400 | Skipped | newmen-components.de's own configurator confirms 27.2mm exists but only in 350mm(215g)/430mm(230g) lengths - no 400mm SKU, and 400mm/180g as catalogued is physically implausible (longer post, lighter weight) vs the confirmed 350mm/215g. Flagging as a likely data-quality issue for a future correction pass, not verifying.
- sp-dmr-dj-272 | Skipped | dmrbikes.com's only current 27.2mm Sect-platform product is the "Sect Combo Saddle" (250g, seat+post combined, SKU DMR-JS-SECT-K3) - confirms the platform's 27.2mm diameter but is a bundled saddle+post product, not a match for this standalone seatpost row. No separate DMR seatpost SKU found this session.
- sp-nukeproof-neutron-316-450, sp-ragley-alloy-316-400, sp-canyon-sp20198-316, sp-syncros-dj15-316, sp-syncros-duncan15-316, sp-syncros-duncan20-316-rigid, sp-syncros-dh20-316, sp-gt-alloy-316, sp-bontrager-rhythmelite-316, sp-cube-performance-post-316, sp-pivot-phoenix-race-alu-272, sp-bmc-3dforged-272, sp-tranzx-sp66-316, sp-sonder-316, sp-sdg-tellis-316-rigid, sp-sdg-v2comp-349 | Skipped | Searched each brand's own site this session; none yielded a standalone manufacturer product page with matching diameter+weight (Bontrager/Nukeproof/GT/Cube/Pivot/BMC pages are either JS-rendered and unfetchable, or only show OEM-bike-page mentions already captured in existing desc fields). No catalog changes - existing unverified sample data is honest and already documents the bike-OEM source. Note: sp-sdg-tellis-316-rigid's "Tellis" branding looks suspect - SDG's Tellis line is exclusively a dropper-post family (V1/V2, no rigid SKU); their only rigid posts are Micro Alloy/Carbon I-Beam (different clamp system). Left untouched (no strong replacement evidence) but flagged for a future data-correction pass.

## handlebar / stem

- hb-ethirteen-base-alu-35 | Verified | https://www.ethirteen.com/products/base-handlebar - 35mm clamp confirmed, weight corrected 300g->404g (page states 404g at either 20mm or 35mm rise), price corrected $40->$39.95.
- hb-ethirteen-plus-alu-35 | Verified | https://www.ethirteen.com/products/plus-handlebar - 35mm clamp confirmed, weight corrected 290g->295g, price corrected $55->$74.95.
- st-raceface-aeffect-r-35-40 | Verified | https://www.raceface.com/products/aeffect-r-stem - 35mm clamp + 40mm length confirmed as an offered SKU; weight (149g) stays a documented cross-retailer estimate scaled from the page's own 161g/50mm reference figure (per-length weight not broken out on the page itself).
- hb-raceface-ride-35, hb-raceface-turbine-r-35, hb-thomson-elite-35, hb-thomson-elite-trail-318 | Skipped (already dead-ended in prior sessions, re-confirmed) | Race Face Ride 35mm-clamp is an OE-only variant with no standalone retail SKU; Race Face Turbine R has no manufacturer-direct fetch for this exact bar; Thomson explicitly publishes NO weight figures anywhere on bikethomson.com for any bar/stem (confirmed dead end, not a formalized interface-verification exception category).
- st-truvativ-descendant-318, st-truvativ-descendant-35 | Skipped (already dead-ended in prior sessions) | sram.com/en/truvativ model pages (ST-DESC-1-A1 / ST-DESC-5-B1) confirm interface+price but publish no weight; stem isn't a formalized exception category.
- st-anvl-swage-35-40 | Skipped | No live anvlcomponents.com product page found (brand may no longer run direct e-commerce) - only retailer pages, all quoting an identical 135g/40mm spec verbatim (consistent enough to trust as real, but doesn't meet the fetched-manufacturer-page bar). Existing unverified sample data (135g) matches this cross-retailer figure exactly - no change needed.
- Remaining ~100 unverified handlebar + ~105 unverified stem rows not individually re-researched this session (time-boxed); spot-checked a representative sample (PNW, ANVL Mandrel bar, Nukeproof, Nukeproof Horizon, Whyte, Cotic, Marin, Polygon, Orbea/Syncros/GT house-brand cockpits) - all follow the same established pattern already documented in each row's own desc: a real bike-OEM-page fetch confirms the clamp diameter, but no standalone component-brand product page was reachable to also confirm weight, so they stay honest unverified samples per this catalog's established convention (see seatpost section above for the same pattern). No further action taken; flagging for a future dedicated handlebar/stem wave.

## grips

- No promotions this session. Spot-checked ODI Elite Pro (odigrips.com's own page lists no weight), Renthal Traction (renthal.com's own page lists length/grip-section only, no weight/diameter - already accurately documented as unverified from a prior audit), Wolf Tooth Echo Lock-On (wolftoothcomponents.com confirms 106g/132mm/32mm but doesn't disambiguate per-pair vs per-grip - same ambiguity a prior session already flagged, no new information). Grips have no verdict-driving interface field (schema: brand/model/price/weight only), so verification here is purely a weight-sourcing exercise; most brands' own sites simply don't publish it. No catalog changes.

## saddle

- sa-dmr-dj-saddle | Verified | https://dmrbikes.com/products/dmr-sect-rail-saddle - model corrected "DJ Saddle"->"Sect Rail Saddle" (the real DMR product name), weight corrected 250g->365g, price corrected $30->$70, exact match to the page's spec block.

## pedal

- pd-dmr-v6 | Verified | https://dmrbikes.com/products/dmr-v6-pedal - "327g per pair" exact match, price corrected $45->$26.
- pd-hope-union-rc, pd-hope-union-tc | Skipped | hopetech.com's own pages list RRP + Q-factor + features but no weight anywhere. Left unverified.
- pd-pnw-loam | Skipped | pnwcomponents.com's own Gen 2 Loam Pedal page didn't surface a spec/weight table via the fetch this session (page appears to load specs client-side); retailer-corroborated at 420g/pair but not a direct manufacturer confirmation. No change.
- pd-nukeproof-horizon-pro, pd-look-trailroc, pd-vpcomponents-x93, pd-vpcomponents-vx6001, pd-shimano-eh500, pd-wellgo-b107n, pd-xlc-pdm29-flat, pd-polygon-oe-flat | Not researched this session (time-boxed after the DMR/Hope/PNW spot-check) | Left as-is.

## Summary

7 rows promoted to verified:true this session (2 seatpost + 1 seatpost-weight-corrected already counted = 3 seatpost, 2 handlebar, 1 stem, 1 pedal, 1 saddle = 8 total): sp-reverse-comp-316, sp-thomson-elite-272, sp-raceface-ride-309, hb-ethirteen-base-alu-35, hb-ethirteen-plus-alu-35, st-raceface-aeffect-r-35-40, pd-dmr-v6, sa-dmr-dj-saddle. Every other row researched this session is logged above with a specific reason (dead end confirmed, or genuinely unreachable this pass) - none were skipped without a documented attempt. No new rows, no id changes, no engine/schema edits, no e-bike content, per scope.

## verify/cockpit-2 session (2026-07-18)

Continued from the skip log above. Scoped categories re-checked: dropper (68 unverified, not
previously touched in this notes file - large unexplored set), saddle (spot-check pass), pedal
(spot-check pass), plus a couple of dropper/stem leftovers from prior notes.

### saddle

- sa-ergon-sm-enduro | Verified | https://www.ergonbike.com/en/product-details.html?anr=44071000&s=smemtb&a=saettel - "SM Enduro Men" exact model match. Weight corrected 240->255g, price corrected 89.95->79.95 (supersedes the 2026-07-09 ergonbike.shop-sourced $89.95 - a different Ergon storefront domain; ergonbike.com is Ergon's own corporate site).
- sa-ergon-sm-enduro-comp | Verified | https://www.ergonbike.com/en/product-details.html?anr=44071003&s=smemtb&w=enduro - "SM Enduro Comp Men" exact match. Weight corrected 250->245g, price corrected 114.95->99.95 (ergonbike.shop, the source of the old figure, never published weight; ergonbike.com does).
- sa-ergon-sm-enduro-pro-ti | Verified | https://www.ergonbike.com/en/product-details.html?anr=44071002&s=smemtb&w=enduro - "SM Enduro Pro Titanium Men" exact match. Weight corrected 210->225g, price corrected 219.95->199.95, same domain-supersession reasoning.
- sa-ergon-sm10, sa-ergon-sm10-enduro, sa-ergon-sm10-sport | Skipped | The "SM10" line appears to be a retired (~2019-era) Ergon product family - no live ergonbike.com product page found via search; only the still-current "SM Enduro"/"SM Sport" lines resolve. No catalog change (existing sample data plausible but unconfirmable this session).
- sa-wtb-volt-pro | Skipped | wtb.com's current Volt product page has been reorganized around material tiers (Fusion Form Carbon/Stainless/Titanium, Flex-Tuned Narrow/Medium/Wide) with per-variant weights 165-320g - no "Pro" trim exists on the live page anymore and the page's only clear price is a $64.95 sale figure, not tied to a specific variant. Cannot confidently match this row's $90/280g to a current SKU. No catalog change.
- Spot-checked sa-fizik-terra-alpaca (fizik.com 429 rate-limited), sa-raceface-aeffect saddle, sa-prologo-dimension - not reached this session (time-boxed after the Ergon/WTB pass).

### pedal

- pd-look-trailroc | Skipped | lookcycle.com's original "Trail Roc" product URL now 404s; the live page is "Trail Roc+" (395g/pr, $200), an explicitly different/upgraded product per the page's own text, not a match for this row's 420g/$115. Genuine product-lineup wall, not a fetch failure. No catalog change.
- pd-vpcomponents-x93 | Skipped | vpcomponents.com's own site only lists a "VPE-993" model, not "X93" - all X93 weight/price data found is retailer-sourced (466g/pr). No manufacturer page reachable for this exact SKU. No catalog change.
- Remaining pedal rows (pd-shimano-saint-m820, pd-nukeproof-horizon-pro, pd-pnw-loam, pd-vpcomponents-vx6001, pd-shimano-eh500, pd-hope-union-rc/tc/gc, pd-wellgo-b107n, pd-xlc-pdm29-flat, pd-polygon-oe-flat) not re-researched this session; pd-hope-union-rc/tc already dead-ended in the prior session's notes above (no weight published), Shimano's no-component-weight pattern is documented catalog-wide.

### dropper (68 unverified at session start; not covered in this file before)

No rows promoted to verified. This category hit the exact same wall pattern documented above for
handlebar/stem in the fanout-1-cockpit-closer session: makers either publish one flat reference
weight not tied to the row's exact diameter/travel combo, or the only "weight" field reachable is
a Shopify shipping-weight placeholder (not the product's actual mass).

- dp-fox-transfer-factory-309-240 | Skipped | ridefox.com rate-limited (HTTP 429) every fetch attempt this session; WebSearch summaries alone don't meet THE BAR. Not retried further (time-boxed).
- dp-bikeyoke-divine-sl-309-100 | Skipped | bikeyoke.com's own 100mm/30.9mm product page (divsl100309) doesn't publish an exact weight for that travel point - only states the 80mm variant is "significantly lower than 400g" when cut down, plus an unrelated "€0.00" placeholder price (page shows a future back-in-stock date, likely a stale/pre-release listing). No confident match.
- dp-xfusion-manic-* (5 rows, all diameters/travels) | Skipped | x-fusionshox.com's actual product page (xfusionshox.com/products/19_43.htm) wasn't reachable with a spec table this session; only aggregated third-party review figures found (not fetched-manufacturer-page quality). No catalog change.
- dp-sdg-tellis-v2-316-150 | Skipped | sdgcomponents.com's Shopify product page confirms the price ($224.99, exact match) but its `weight` JSON field is a Shopify shipping-weight placeholder (879-1332g range across variants, clearly not the ~550-650g product mass reported by reviews) - not a real per-SKU spec, so the weight bar isn't met. Price-only correction not applied (already matched). No catalog change.
- dp-raceface-aeffect-r-309-150 | Skipped | raceface.com's product page states a single flat 602g not broken out by the 100/125/150/170mm travel options (the same flat-weight trap the fanout-1-cockpit-closer session documented for other Race Face products) - not confidently attributable to this row's exact 150mm SKU. No catalog change.
- dp-tranzx-* (8 rows: ysi34 x2, ysi60ql, jdysp39kl, jdysi05j, rad, ysi05-rad, ysp23jl, reverse x2, jdysi34) | Skipped | tranzx.com's current dropper-post model listing (JD-YSP07/12/15/16J/18P/19/20J/22/29/36/38J/01V/39J) contains NONE of this catalog's cataloged model codes - looks like an older/discontinued TranzX naming generation not represented on the live site. Genuine catalog-vs-current-lineup wall, not a fetch failure. No catalog change.
- Remaining ~45 dropper rows (GT DropKick, KS LEV Ci/Rage-i x2, Specialized Command Post, PRO Koryak x6, Bontrager Line x2, Cannondale DownLow, Canyon SP0070/SP0060/SP0081 x4, Brand-X, KindShock x2, Cane Creek AL, Whyte, XLC x2, X-Fusion Manic remainder, Onoff, Giant Contact x3, Syncros x2, Merida x2, Cube x3, Post Moderne, Iridium x2, Eightpins, Bird, TwinWorks) not individually re-researched this session (time-boxed) - left as documented unverified sample data.

### Summary (this session)

3 rows promoted to `verified:true`: sa-ergon-sm-enduro, sa-ergon-sm-enduro-comp,
sa-ergon-sm-enduro-pro-ti (all corrections to weight+price via ergonbike.com, superseding an
older ergonbike.shop source that never published weight). No new rows, no id changes, no
engine/schema edits, no e-bike content, per scope. `tools/verification-job.json` untouched.
Gates after this batch: `node validate.js` -> 5023 parts, 0 problems (3041 verified, 1982
unverified); `npm test` -> 29 files / 764 tests passed; `npx tsc --noEmit` -> clean;
`node tools/verdict-audit-harness.js` -> 0 flags (A), 0 preset conflicts (B), 329/0 clean (C),
5/5 (C2), 15/15 caught (D), 2/2 clean (D2), rotor-max section (E) pre-existing/unchanged.
