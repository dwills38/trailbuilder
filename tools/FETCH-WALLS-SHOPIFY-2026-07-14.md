# Shopify `/products.json` retry sweep — 2026-07-14

Session goal: the verification retry queue's stalled wheel/component brands (JS-rendered /
bot-blocked, sat unfetchable for days) had never been systematically tried against the
Shopify `/products/<handle>.js` (and `/products.json`) route that unlocked ridefox.com,
spank-ind.com, and rideframeworks.com in earlier waves. Result: **the Shopify route did not
unlock any of the target brands' wheel/hub/rim rows.** Zero catalog rows were changed this
session (no commits beyond this doc). Documenting the wall precisely so the next session
doesn't re-spend the same budget re-discovering it.

## Per-brand outcome

| Brand | Shopify-hosted? | Outcome |
|---|---|---|
| **Industry Nine** | Yes (`industrynine.com/products.json` responds) | Wall: the Shopify storefront only carries spare parts (raw rims, headset configurator SKUs, a "coloured nipples" accessory) — no complete wheelset/hub products at all. Complete wheels (Enduro S, Whisp, Hydra2 DH) and hubs (Hydra2, Hydra Classic) live on separate JS "wheel builder" pages (`industrynine.com/wheels/mountain/...`, `industrynine.com/products/industry-nine-hydra-2`) that DO list interface options (axle standards, freehub bodies, rotor mount) but **no per-SKU weight** anywhere found — same wall as before, just confirmed via a different URL family. Not touched.
| **We Are One** | Yes, and NOT password-walled for `/products.json` (contrary to the standing assumption — worth re-testing on other "password-walled storefront" brands) | Wall of a different kind: WAO's own site now sells only its rebranded "Convergence" lineup (Deal / Whisp / Revive 2.0 / Wanderer / Fuse / Triad / Sector). Our catalog's Union / Faction / Strife rows (22 unverified) **do not appear anywhere in the current storefront** under those names — only third-party retailers (evo, Competitive Cyclist, Jenson) still list them as current products. Retailer-only sourcing fails the manufacturer-page bar. **Flagging, not touching**: this could mean the rows are legacy-generation SKUs WAO no longer sells direct (fine, just permanently unverifiable via manufacturer source) — or a naming/rebrand mapping exists that a deeper session could confirm (e.g. "Union" → "Sector"/"Triad" successor). Recommend a coordinator/human check before any renaming.
| **Newmen** | No — `products.json` 404s on both `newmen-components.de` and its `www` redirect target. Not a Shopify store. | No route found this session.
| **Roval** | No — `roval.com`/`www.roval.com` 404 on `products.json` (Specialized's own platform, not Shopify) | Confirmed still-walled exactly as the 2026-07-09 audit documented: `specialized.com` product pages 403 WebFetch directly; WebSearch snippet aggregation reproduces the cataloged front/rear weight split (806g/995g for Traverse HD 350) almost exactly, but per standing policy a snippet isn't a fetched page, so the existing rows correctly stay unverified. No new data.
| **Race Face** | Yes (`raceface.com/products.json`) — but only ~single-page catalog (apparel, handlebars, stems, rings, a "Vault Cassette Bodies" freehub-driver accessory) | Wall: none of Turbine SL wheels, Vault hubs, ARC rims, or the Aeffect saddle are in the Shopify catalog at all (dealer-only distribution). Their non-Shopify "spec" URLs (`raceface.com/products/details/<slug>`) are JS-broken for WebFetch — they resolve to the homepage shell with no server-rendered spec table. No route found.
| **Bontrager** | No — Trek's own platform, not Shopify (`trekbikes.com` DNS/route issues, no `products.json`) | Confirmed still-walled exactly as the 2026-07-09 audit documented (nav-only content via WebFetch). No new data.
| **DT Swiss E 1900** | No — not Shopify (`dtswiss.com` has no `products.json`, but unlike Roval/Bontrager its own product pages up ARE fetchable directly) | Partial: `dtswiss.com/en/wheels/wheels-mtb/enduro/e-1900-spline` fetches cleanly and reconfirms interface (30mm internal, CL/6-bolt, 370 hub) — matches the already-cataloged, already-audited (2026-07-09) values. Still no front/rear weight split, only a combined "from 1994g" set figure — identical wall as before. **Judgment call flagged, not applied:** DT Swiss publishes exact per-SKU interface (via `/en/support/product-support?matnr=...` pages keyed to precise axle/freehub/mount codes) but never a front/rear split — this looks structurally identical to the shock "interface-only" exemption CLAUDE.md carved out 2026-07-12, but that policy was scoped to the categories reviewed at the time and explicitly said it "does not relitigate existing rows." Extending it to wheels is a policy-scope decision, not a data question — leaving it for Douglas/coordinator rather than unilaterally applying it.
| **Crankbrothers** | Yes (`crankbrothers.com/products.json`) | Wall: the Shopify storefront is shoes/apparel only. The 5 remaining unverified Crankbrothers rows are wheelset **presets** (Synthesis XCT/DH/Enduro bundles) whose component wheels are already verified; the presets themselves (price-only) aren't sold as a single SKU on the Shopify store to confirm bundle pricing against. No route found.
| **Spank** | Yes, but 403-blocked at both `spank-ind.com` and `www.spank-ind.com` | Consistent with the existing "mostly done, check leftovers" note — whatever technique cleared the bulk of Spank earlier wasn't the plain Shopify JSON route (still bot-blocked for WebFetch). No new data this session.

## Bottom line

The Shopify-JSON hypothesis paid off on **fetchability** (I9, We Are One, Race Face, Crankbrothers,
Spank are all genuinely Shopify-backed) but **not on data availability** for this specific
retry batch — the products these catalog rows need (complete wheels/hubs with per-SKU weights)
either aren't sold on the brand's own Shopify storefront (dealer-only / apparel-only stores) or
the storefront itself doesn't carry weight data. Roval/Bontrager/DT Swiss aren't Shopify at all
and remain exactly as walled as the 2026-07-09 audit found them.

No `verified:true` flips this session; no catalog edit. Gates not re-run (no `src/compat.js`
diff). Flagged items for a human/coordinator decision: (1) We Are One Union/Faction/Strife
possible rebrand mapping, (2) whether the shock-exemplar interface-only verification policy
should extend to wheels (DT Swiss E 1900 is the clean test case).
