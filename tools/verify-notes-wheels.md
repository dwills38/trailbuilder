# Wheels cluster verification notes — verify/wheels-2 (2026-07-18)

Scope: `frontwheel`, `rearwheel`, `rim`, `fronthub`, `rearhub` only (per
assignment). Starting point: verify/wheels-1's DT Swiss-focused batch was
already merged to origin/main; this session picked up its explicit
recommendation to hit the fronthub/rearhub a-la-carte sweep first (cleanest
manufacturer spec tables of any wheel-adjacent category), then work the
brand backlog.

At session start: 755 rows in scope (fronthub/rearhub/rim), 474 unverified.
frontwheel/rearwheel alone: 457 unverified across 40+ brands (We Are One 41,
Bontrager 38, DT Swiss 38, WTB 31, Industry Nine 29, Giant 25, Race Face 23,
Roval 19, Shimano 18, e*thirteen 18, and a long tail).

## This session's yield: 8 rows newly verified, 3 corrected, both open
## questions from wheels-1 resolved, 2 more rows meaningfully improved
## (interfaces confirmed) without flipping verified

### fronthub/rearhub sweep — Onyx Vesper (COMPLETE, all 4 rows)

`onyxrp.com` WebFetches with a 403 (bot-wall), but the fetch-ethics doctrine
draws a hard line between rendering JS (fine) and defeating an active
anti-bot challenge (not fine) — a plain browser-pane load renders the site
perfectly (it's a WooCommerce/Algolia-instant-search storefront, no active
challenge), so this batch cleared cleanly:

| id | disposition | note |
|---|---|---|
| `fh-onyx-vesper-iso-boost110` | **Verified** | 176g (was 180g sample), $230, ISO 6-Bolt, SKU 102700 |
| `rh-onyx-vesper-boost148-ms` | **Verified** | 414g (was 394g), $510, ISO 6-Bolt, MicroSpline, SKU 102719 |
| `rh-onyx-vesper-boost148-hg` | **Verified** | 420g (was 398g), $510, ISO 6-Bolt, Shimano HG-11spd, SKU 102714 |
| `rh-onyx-vesper-boost148-xd` | **Verified + CORRECTED** | 408g (was 389g); **freehub corrected `XD` → `XDR`** — Onyx's current Boost148/ISO lineup sells exactly 4 drivers (Campagnolo N3W, Shimano HG-11spd, MicroSpline, SRAM XDR) confirmed via the site's own product-filter facets; there is no plain XD option on this hub shell. The prior fanatikbike.com retailer source apparently mislabeled XDR as XD (an easy real-world mix-up — XD and XDR are different splines, and this catalog's schema already distinguishes them). Id kept as `-xd` (append-only rule; ids are opaque labels, never re-derived from a corrected field) — **flagging this id/field mismatch for whoever next touches this row.** |

Method note for future sessions: onyxrp.com's product-filter is an Algolia
InstantSearch widget driven by a URL hash (`#q=<query>&hPP=<n>&idx=wp_posts_product&p=0`)
— set `q` to a search string (e.g. `Vesper Boost 148`) and read the
resulting facet counts/product list from `get_page_text`; product page
slugs are predictable (`onyxrp.com/store/mtb-hubs/mtb-boost/<slug>/`) and
the Specs tab lives at `#tab-additional_information` (read via
`document.getElementById('tab-additional_information').innerText`).

### fronthub/rearhub sweep — remaining brands: genuine walls, re-confirmed not abandoned

- **DT Swiss 350 (2 rows, `rh-dtswiss-350-boost148-ms`/`-hg`)**: two prior
  sessions already exhausted NOBL Wheels for this weight. This session went
  one step further — FETCHED `dtswiss.com/en/support/product-support?matnr=<sku>`
  directly for both exact matnrs (`H350TCD2R28SA5242S` MS,
  `H350TCDBR28SA0465S` HG), which **manufacturer-confirms every interface
  field exactly** (axle, built-in dimension, brake interface, freehub body).
  Weight still isn't on this support page (it lists spare-parts/kits, not
  weight), and the retail product page's "Choose model" JS widget didn't
  render a weight table to a browser-pane click (unlike the XRC1200/M1900
  families, where this worked cleanly — inconsistent JS behavior across DT
  Swiss's own site sections). Retailer weight citations for the same exact
  matnrs conflict wildly (225g/257g/259g/279g/359g across sources) —
  correctly stays unverified rather than picking one. mfgPn added to both
  rows so a future session can retry the weight lookup with less rediscovery.
- **Industry Nine Hydra Classic (7 rearhub rows)**: industrynine.com has
  fully migrated to a new storefront (Shopify) whose current hub nav lists
  ONLY "Hydra2", "SOLiX", "1/1" — **"Hydra Classic" no longer exists
  anywhere in the current site's navigation.** This is a strong signal the
  line is genuinely discontinued/renamed at the retail level (matches why
  every direct industrynine.com/hubs/... URL guess 404s across two
  sessions). The catalog rows' existing sourcing (wheelbuilder.com,
  campfirecycling.com, slovakbikeparks.sk, the ap.industrynine.com mirror)
  remains the best available and is untouched. Did not attempt the JS hub
  BUILDER tool's driver-specific text again (confirmed still JS-selector-only,
  no weight/driver text to a static or rendered fetch this session either).
- **e*thirteen (3 rows, front/rear Race Alloy hubs)**: re-fetched
  ethirteen.eu/products/race-alloy-rear-hub in full (all tabs, ~1500 words)
  via Exa — confirms axle/freehub/weight text exhaustively but **never once
  states a rotor mount** anywhere on the page. Reconfirms the prior
  sessions' finding; this is a genuine brand-wide gap (matches all 10+
  e*thirteen LG1r wheel rows already in the catalog with the same note).
  Not touched further.
- **Industry Nine rim (`rm-industrynine-endurosv2-{29,275}`)**: not
  re-attempted this session (the Enduro S → Enduro 305 rename wall is
  already well-documented by two prior sessions; nothing new to try without
  a generation-conflation risk).
- **Spank (`rm-spank-359-29`)**, **We Are One (`rm-weareone-union-29`)**,
  **Race Face rearhub (`rh-raceface-vault-boost148-{xd,ms}`)**: not
  re-attempted — already re-confirmed as genuine walls (empty JS weight
  cells / 404s / mismatched-config weight figures) as recently as
  2026-07-09/10 by wheels-1; nothing indicated those pages have changed.

### frontwheel/rearwheel/rim — brand work outside the fronthub/rearhub sweep

- **Race Face ARC Offset 25 rim (`rm-raceface-arc25-29`)**: **Verified.**
  raceface.com's own product page still only renders one blended weight
  ("494g / 27.5in rim", matching the prior session's finding), but the same
  page links its own downloadable "Rim Dimensions Sheet" PDF
  (`cdn.shopify.com/.../Rim_Dimensions_Sheet_Offset.pdf`, fetched directly)
  — a real manufacturer spec table with per-width, per-diameter weight for
  both the ARC OFFSET and AR OFFSET lines. 25mm width = 428g (27.5in) /
  450g (29in), an EXACT match to this row's existing sample weight.
  Corrected price sample $100 → real $114.99 MSRP. **This PDF is a strong
  lead for the rest of the Race Face rim/wheelset backlog** — it also gives
  clean per-width weights for AR OFFSET 25/27/30/35/40 (448/470,
  490/520, 514/545, 552/583, 595/626 g) and ARC CARBON 26/31/36, which the
  next session could use to correct the AR/ARC-family complete-wheel rows'
  *rim-half* weight (the hub-half of an assembled wheelset still needs a
  separate hub-weight source; raceface.com's wheelset pages themselves only
  publish one blended full-set weight, e.g. 1980g/1920g across retailers,
  no clean per-config split — same wall as before, did not chase further).
- **Bontrager (38 rows)**: EXPLORED, not touched. trekbikes.com has rich
  per-front/rear spec tables (hub width, axle diameter, holes, brake type,
  rim inner width, weight) — but **multiple product-ID pages for what looks
  like the "same" wheel return materially different numbers** (e.g. Line
  Pro 30 TLR Boost 29 front: 730g / 810g / 840g across different fetched
  product-page IDs, likely different model-year generations sharing one
  marketing name with stale/duplicate catalog pages on Trek's own site).
  Untangling which numeric ID is the CURRENT US-market SKU for each of the
  38 catalog rows would need careful per-row generation triage — flagged as
  a real opportunity but not attempted this session given the risk of
  silently picking a stale generation's numbers. **Recommendation for next
  session:** cross-check each Bontrager family against Trek's current-year
  complete-bike spec pages (which pin one canonical wheel weight per bike)
  rather than the wheel's own product page's several conflicting IDs.
- **Giant (25 rows)**: not attempted. All rows are Giant house-brand OE
  wheels (TRX/TRA/XCT/AM/XCR/Fathom-OE/Talon-OE/GX03V-Tracker) sold only
  bundled on Giant complete bikes — giant-bicycles.com is JS-rendered
  (browser-pane-eligible per the fetch-ethics doctrine, not yet tried this
  session) but likely needs a per-complete-bike spec-page cross-reference
  rather than a standalone wheel product page (Giant doesn't sell these
  wheels a la carte). Good candidate for a session that also has
  complete-bikes context.
- **WTB (31 rows)**: EXPLORED, not touched — genuinely two-part problem.
  WTB itself publishes clean rim-only specs (`wtb.com/products/kom-light-i30`,
  `kom-tough-i30`, etc. — a real per-diameter weight/ERD/hole-count table),
  which would let a future session correct/verify the RIM half (intWidth,
  maxTire) of the KOM Light/KOM Tough i30 rows. But every catalog row here
  is a complete OE wheel (WTB rim + a 3rd-party hub — Novatec D791SB/D902SB,
  Shimano TC500/MT400, SRAM MTH716/746) whose rotorMount/freehub is set by
  the HUB, not WTB — THE BAR requires the hub maker's own page too, which
  this session didn't chase per-pairing. **Recommendation:** pair the
  wtb.com rim data with Novatec's/Shimano's own hub spec pages per-model;
  tractable but needs per-row hub-brand lookups, not a single-brand sweep.
- **DT Swiss XRC 1200 SPLINE 25mm — OPEN QUESTION #1 RESOLVED (Verified,
  discontinued):** `fw-dtswiss-xrc1200-spline25-29`,
  `rw-dtswiss-xrc1200-spline25-29-{ms,xd}`. web.archive.org itself is
  unreachable to WebFetch/Exa in this environment (a known, standing
  limitation), but the **browser pane reaches it fine** (this is JS/page
  rendering, not circumventing anything — dtswiss.com's own model finder,
  just an old copy of it). A 2022-01-19 snapshot of dtswiss.com's XRC 1200
  SPLINE model finder shows the 25mm tier WAS real and current-at-the-time
  alongside 30mm: matnr `WXRC120BEIXCA10925` (front, 649g — an EXACT match
  to this row's existing weight) and `WXRC120TEDRCA10927` (rear, 762g,
  XD-mounted with an included MicroSpline shim kit — same
  single-SKU-both-drivers pattern already used for the verified 30mm
  siblings). **Conclusion: real, now-discontinued SKU** (current
  dtswiss.com only lists 30mm) — marked `status:'discontinued'` +
  `verified:true` (mirrors the existing `fk-fox-38/36`
  verified-but-EOL precedent), not removed, not left as an open question.
- **DT Swiss M1900 SuperBoost157 — OPEN QUESTION #2 RESOLVED (stays
  unverified, documented):** `rw-dtswiss-m1900-{29,275}-157-{xd,ms}`.
  Independently re-fetched `pivotcycles.co.nz/products/firebird` directly
  — Pivot's own regional storefront (a bike-MAKER page, not a retailer)
  states "WHEELS: DT Swiss M1900 w/ DT Swiss 370 hub, 30mm ... F - 15x110 /
  R - 12x157" for the current model year, independently corroborating the
  same combo already cited from vitalmtb/99spokes on 3 different Pivot
  models (Firebird, Switchblade V2, Mach 6). **Conclusion: real, deliberate
  OE-only DT Swiss custom end-cap variant** that genuinely never appears on
  DT Swiss's own retail configurator (same pattern as the catalog's
  already-existing `rw-dtswiss-fr-1500-275-148-xd` Canyon-OEM row). Per
  that same precedent, this stays **unverified** — the wheel's actual maker
  (DT Swiss) still shows no retail SKU for it, only bike-maker pages
  confirm it, a different provenance tier than THE BAR requires for
  `verified:true`. Documented in the row's `desc` rather than left as an
  open question for a third session to re-discover.

## Gates (this session, cumulative across all 6 commits)

- `node validate.js`: 0 problems throughout (checked after every commit).
  Final: 5023 parts, 2980 verified / 2043 unverified (catalog-wide).
- `npm test`: 764/764 passed after every commit (no new rows added, so the
  count didn't move — task scope was verify/correct only).
- `npx tsc --noEmit`: clean throughout.
- `node tools/verdict-audit-harness.js`: byte-identical structural output
  before/after every commit (data-only corrections/verifications, no
  verdict deltas) — the rotor-max section's "5 fork families would
  false-warn" is a pre-existing, unrelated informational finding (fork
  category, out of this session's scope), not a regression.

## What's left for the next wheels session

- ~470 rows remain unverified in frontwheel/rearwheel/rim/fronthub/rearhub
  combined (started at 474, this session verified 8 + corrected 3 fields +
  improved 2 more without flipping verified).
- **Best next moves, ranked by tractability:**
  1. Race Face AR/ARC-family complete wheelsets — the Rim Dimensions Sheet
     PDF found this session gives clean rim-half weights for every AR/ARC
     width; pair with a hub-weight source to close the assembled-wheel gap.
  2. WTB KOM Light/KOM Tough i30 rows — wtb.com's own product pages give
     clean rim data; pair with Novatec/Shimano hub-maker pages per OE
     pairing.
  3. Bontrager — trekbikes.com has rich data but multiple conflicting
     generation IDs per model; needs careful current-year triage, ideally
     cross-referenced against Trek's own current complete-bike spec pages.
  4. Giant — try the browser pane on giant-bicycles.com (untried this
     session); likely needs complete-bike cross-reference since these are
     OE-only house-brand wheels.
- Untouched this session (no new information, matches wheels-1's
  documented walls): We Are One (41 fw/rw rows + 1 rim), Industry Nine
  (29 more fw/rw rows beyond the hub sweep), Roval (19), Shimano (18),
  e*thirteen (15 more fw/rw beyond the hub sweep), Halo (14), Specialized
  (13), Alex Rims (12), Syncros (11), Marin (11), Reserve (10), Stans (9),
  Vitus (9), and the long single/double-digit tail (Nukeproof, Formula,
  Zipp, OQUO, Whyte, XLC, Newmen, Hope, Polygon, Focus, Diamondback, Orbea,
  Hunt, Norco, Sonder, Merida, Sun Ringlé, Canyon, Spank, Stanton, SRAM,
  ACID).
