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
