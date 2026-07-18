# verify-fanout-1-cockpit-closer — progress log

Branch: `verify/fanout-1-cockpit-closer`. Scope: close out unverified `stem`/`handlebar` rows
(227 unverified combined at session start) toward the fanout's >60% verified-ratio goal.

**Correction to the brief**: the brief described stem/handlebar as "completely untouched,
no wall history." That was stale — Cannondale, Chromag, Marin and Nukeproof rows in this
catalog already carry extensive `desc` notes from prior sessions (`audit-cockpit 2026-07-09`,
`verify-cockpit-tail 2026-07-10`, `cb-grind5/6`, `cb200-*`) documenting the exact same
per-SKU-weight wall independently rediscovered below. Pivoted to the brief's own fallback
clause ("other independently-fetchable brand") after confirming those four brands were
genuinely dry, not skipped.

## The core wall in this category

Most aftermarket cockpit makers publish exactly ONE reference weight for a stem/bar model,
not a full per-length/per-clamp table — and several storefronts (Shopify-based) expose a
`variants[].weight` field that is a **flat shipping-weight placeholder identical across every
length/color/clamp combination**, not a real per-SKU spec (confirmed directly on Chromag HiFi,
Chromag HiFi BSX, and Spank Split's `.js` endpoint — all flat across variants that plainly
differ in mass). THE BAR requires a maker-stated (or reputable-measured) weight for the EXACT
cataloged length+clamp; a flat/placeholder number or a reference figure for a different
length/clamp than the row's own does not meet it. This is why yield per row was low relative to
grind time — most candidates required a full page fetch just to rule OUT a false match.

## Verified this session (9 rows, all via a direct WebFetch/bdata maker-page fetch)

| id | brand/model | before -> after | source |
|---|---|---|---|
| `st-burgtec-enduro-mk3-35` | Burgtec Enduro MK3 (35/42.5) | weight already correct (152g); added verified | burgtec.co.uk/product/enduro-mk3-stem/ |
| `hb-burgtec-ridewide-enduro-35` | Burgtec RideWide Enduro (35/800/30) | weight already correct (300g); added verified | burgtec.co.uk/shop/ride-wide-alloy-enduro-handlebar/ |
| `st-industrynine-mountain-40-35` | Industry Nine Mountain A35 (35/40) | weight 130->135g, price 150->175 | industrynine.com/products/mt |
| `st-spank-split-318` | Spank Split (31.8/38) | weight already correct (138g, from a 2026-07-10 partial finding); promoted to verified | spank-ind.com/products/spank-split-stem |
| `st-bikeyoke-barkeeper-35-45` | BikeYoke Barkeeper (35/45) | weight/price already correct; bikeyoke.com now fetches (prior session's DNS blocker is gone) | bikeyoke.com/en/barkeeper/bark35 |
| `hb-ethirteen-alu-800-35` | e*thirteen Base Handlebar (35/800/20) | weight 320->404g, price 70->39.95 | ethirteen.com/products/base-handlebar |
| `hb-ethirteen-base-alu-800-35` | e*thirteen Base Handlebar (35/800, 2nd catalog row) | weight 310->404g, price 40->39.95 | ethirteen.com/products/base-handlebar |
| `st-fsa-grid-35` | FSA Grid (35/35) | weight 140->135g, price 50->79 | fsaproshop.com/products/grid-stem-o35mm-clamp (FSA/Vision's own storefront) |
| `st-intend-grace-fr-35-35` | Intend Grace OS FR (35/35) | weight already correct (80g, from a 2026-07-16 partial finding); promoted to verified | intend-blackline.com/products/grace-fr/ |

## Correction without verification (1 row)

- `st-burgtec-mk3-directmount-35-50`: price corrected 99->141.89 (re-fetched burgtec-usa.com
  checkout price); clamp/reach reconfirmed on both burgtec-usa.com and burgtec.co.uk; neither
  Burgtec site publishes a per-reach weight for this DH direct-mount stem, so the 156g figure
  stays an unconfirmed carry-over. Kept unverified.

## Walls hit / skipped (logged, not retried without new data)

- **Cannondale** (8 rows): cannondale.com product pages are marketing-only — no weight table,
  and the one reference weight found (C1 Conceal, 210g@110mm) doesn't match this catalog's
  90mm-length row. Spec-table divs on the page are a generic full-bike template, not populated
  per-stem. Zero yield.
- **Chromag** (3 rows: HiFi 35, RIZA 35, HiFi BSX): re-confirmed the prior sessions' finding —
  chromagbikes.com states exactly one weight per product (tied to ONE length/clamp combo that
  is NOT this catalog's cataloged combo in all three cases), and the Shopify `.js` variant
  weight field is a flat placeholder (200g/250g/143g respectively, identical across every
  length). No new data since the 2026-07-09/07-10 sessions; still unverifiable.
- **Marin** (7 rows) and **Nukeproof** (6 rows): both are OE/house-brand parts with no
  standalone product page at all (Marin) or a page that gives options but no per-option weight
  (Nukeproof Horizon: 35/50mm + 31.8/35mm reference points only, this catalog's rows sit at
  different length points). Same conclusion prior sessions reached; not re-litigated further.
- **Pivot** (8 rows): deprioritized per the brief's own guidance (house-adjacent, likely
  walled) — not attempted this session given the four priority brands already consumed the
  budget for this pass.
- `hb-burgtec-ridehigh-35`: Burgtec's current standalone "Ride High" product (4 rise options,
  38-80mm, burgtec.co.uk) doesn't match the Transition TR11 OE build sheet's own rise numbers
  (20/30/38mm across S-XL) — likely a different generation/bend; no rise field is set on this
  row so there's no way to pin an exact SKU. Left unverified, no correction (existing 300g
  sample is below every real weight point 312-378g, but guessing which one is wrong).
- `st-hope-am-35`: Hope's current product is now branded "TR Stem" (possibly a later generation
  than the catalog's "AM" naming); the maker states only ONE weight per clamp (121g at 35/35),
  not this row's 35/50mm combo. Left unverified.
- `st-truvativ-descendant-318`/`-35`: sram.com/en/truvativ (both service and model pages)
  reconfirm clamp/length/rise exactly, but SRAM publishes NO weight at all for this stem
  (consistent with CLAUDE.md's documented SRAM-weight gaps). Genuine no-data wall, not a fetch
  wall. Left unverified (unchanged from prior session).
- `st-sixpack-millenium-35-35`: sixpack-racing.com's current "Millenium Stem Your Part"
  configurator page only exposes the default-selected variant's spec block in a static fetch
  (35mm clamp/45mm length = 133g); could not isolate the 35mm/35mm combo's own figure from a
  static page fetch. Left unverified.
- `hb-ethirteen-base-alu-35` (780mm cut-down width): e*thirteen's Base Handlebar ships stock at
  800mm (cuttable to 760mm minimum); 780mm isn't a maker-stated distinct SKU point, so the
  404g figure confirmed for the 800mm siblings above isn't confidently transferable to this
  row (cutting a bar changes its weight, if only slightly) - left unverified rather than
  overstate precision.
- `hb-burgtec-ridehigh-35`, FSA Grid stem's cheaper collections page, Race Face Ride 31.8 stem,
  Thomson Elite X4 (both clamps), Cane Creek eeSilk (CS+SL): all had NO per-length weight
  breakdown published by the maker at all (Thomson historically never publishes stem weights;
  Race Face Ride states one flat 140g not tied to a length; Cane Creek states a 225-235g RANGE
  across 4 lengths, not broken out) - none promotable under THE BAR.
- `st-straitline-318` (Straitline SSC 31.8/35): straitlinecomponents.com's real product page
  couldn't be reached (`/collections/types?...` blocked by robots.txt for the Bright Data
  unblocker; `shop.straitlinecomponents.com`'s direct product URL fails with an SSL handshake
  error - looks like a dead/misconfigured legacy storefront). WebSearch corroborates 163g at
  35mm (matching this row already) but a search snippet doesn't meet THE BAR. Left unverified.

## Gates (after this batch)

- `node validate.js` — `DATA OK - 5026 parts, 0 problems (3006 verified, 2020 unverified)`
- `npx vitest run` — 24 files / 700 tests passed (baseline unchanged, nothing added/removed)
- `npx tsc --noEmit` — clean, no output
- `node tools/verdict-audit-harness.js` — 0 flags (A), 0 preset conflicts (B), 329 clean / 0
  errors (C), 5/5 wheel-substitution clean (C2), 15/15 adversarial clashes caught / 0 missed
  (D), 2/2 compatible partials stayed clean (D2), rotor-max section unchanged (E, pre-existing
  dormant/sourced fork entries, untouched by this session)

Overall verified ratio after this batch: 3006/5026 = **59.81%** (up from 59.63% at session
start; the >60% goal needs roughly 10 more verified rows from here).
