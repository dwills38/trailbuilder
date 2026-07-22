# verify-notes-tail11 — mtb-tail-11 worker session (2026-07-21)

Scope: unverified MTB rows in `src/compat.js`, categories handlebar/stem/grips/dropper/
seatpost/saddle ONLY (wheels/tires/complete bikes owned by parallel workers this pass).
Branch `verify/mtb-tail-11`, worktree `.claude/worktrees/mtb-tail-11-a3f7`.

Starting scope size: 463 unverified rows across these 6 categories, ~100 distinct brands.
That is far too large for one session — this pass worked a bounded slice, prioritizing rows
with little/no prior verification attempt (short `desc`, no `source` field) over rows where
prior sessions (audit-cockpit 2026-07-09, verify-cockpit-tail/closer 2026-07-10/17) already
exhaustively chased a manufacturer page and hit a documented wall (Thomson/ODI/Ergon/Sixpack/
Race Face OE-tier rows) — re-running those would likely hit the same walls.

## Disposition: VERIFIED (5 rows, direct syncros.com fetches)

All five: FETCHED the manufacturer's own `syncros.com/us/en/product/...` page directly this
session (bar item 1), maker-stated weight (bar item 2a), fields set to match (bar item 3),
provenance trio added (`lastChecked:'2026-07-21'`).

- `hb-syncros-hixon15-318-780` (Hixon 1.5 Alloy) — 31.8mm clamp, 780mm width, 15mm rise,
  Alloy AL7075, 280g (corrected from 320g sample). No USD price published on the page; the
  $55 sample price stays (documented estimate, same convention as `sp-reverse-comp-316`).
- `hb-syncros-hixon15-dh-318-800` (Hixon 1.5 DH) — 31.8mm oversize clamp, 800mm, 15mm rise,
  Alloy AL7075, 335g (corrected from 340g). Price stays a $65 sample (no maker price).
- `st-syncros-am15-318` (AM 1.5) — 31.8mm clamp, 40/50/60mm lengths (one weight figure, no
  per-length split), 0° rise, 155g (corrected from 180g), $89.99 (corrected from $30 sample).
  Length newly captured at 50mm (representative mid-point). Note: the original build-sheet
  source claimed "4 degree rise" — the maker page states 0°; corrected to the fetched figure.
- `sa-syncros-tofino20` (Tofino 2.0 Regular) — via the current "Tofino R 2.0 Cut Out" page:
  245g (corrected from 265g), $69.99 (corrected from $55), 7x7mm Hollow CrMo rails.
- `sa-syncros-belcarra20` (Belcarra Regular 2.0 CRMO) — via "Belcarra R 2.0 Channel": 240g
  (corrected from 250g), $79.99 (corrected from $45), 7x7mm Hollow CrMo rails confirmed.

## Disposition: corrected, still UNVERIFIED (weight bar unmet)

- `gr-supacaz-grizips` — FETCHED supacaz.com/product/grizips-black/ directly: price is
  **$25.00**, not $20 as a 2026-07-09 audit pass had it (that pass cited "the fetched-adjacent
  supacaz.com listing" but was evidently stale/indirect — corrected back). 32mm diameter,
  dual-density rubber, aluminum lock-on rings confirmed. No weight published on the page;
  113g sample stays (multiple retailer/review figures cluster 110-114g but none is a
  maker-stated or clearly-measured figure meeting the bar). Kept unverified.

## Disposition: SKIPPED — attempted this session, no promotable result (don't re-attempt without new approach)

- `st-syncros-xm15-318` (Syncros XM1.5 stem) — both syncros.com URL patterns found via search
  404'd on direct fetch this session. Retry later with a fresh URL search.
- `hb-syncros-hixon20-318-780` (Syncros "Hixon 2.0 Alloy") — no "Hixon 2.0" model exists in
  the current syncros.com lineup search turned up (only Hixon 1.0/1.5/1.5 DH/iC variants).
  Likely an older/retired generation name from the original build-sheet source. Left as-is.
- `sa-syncros-kaslo20` (Syncros "Kaslo 2.0") — current syncros.com lineup only shows "Kaslo R
  1.5"; no "2.0" tier found. Same retired-generation-name situation as Hixon 2.0 above.
- `st-syncros-dh15-318-50` (Syncros DH1.5 stem) — syncros.com/us/en/product/syncros-dh-1-5-stem
  404'd on direct fetch (page likely restructured/removed since search indexed it).
- `gr-sdg-slater` — sdgcomponents.com/products/slater-grip fetched but returned only generic
  shop-nav/bestseller content, no product spec block (probably JS-rendered product data not
  present in the static HTML WebFetch sees). Existing 42g/$20 sample is already well-sourced
  from a prior audit pass (real weight 42g per search-indexed page text) — left unverified,
  a browser-pane fetch could likely close this one out.
- `gr-lizardskins-charger-evo` — lizardskins.com's product pages are a JS-driven personalization
  configurator; WebFetch/Exa both return only nav chrome, no spec data. Would need the browser
  pane to render JS.
- `gr-sensus-swayze` — thesensus.com/shopgrips product pages did not yield weight/price in
  either WebSearch or a would-be WebFetch (not attempted directly due to time; flagged for a
  future pass).
- `hb-cotic-calver-780-25`, `st-cotic-shorterstem-35`, `gr-cotic-lockon` — cotic.co.uk's
  order/components page only shows a generic "Cotic Stems £39" line with no length/model
  breakdown and no weight; the Calver bar and Lockon grips don't appear on that page at all.
  Left unverified.
- `hb-newmen-evolutionsl-800-318` and Newmen siblings — newmen-components.de uses a JS
  "Konfigurator" for its product pages; WebSearch surfaced a likely weight (350g, €68 MSRP)
  from retailer listings, but nothing from a direct manufacturer fetch this session, so not
  promoted. A browser-pane visit to the configurator could close these out.
- `hb-roval-*` rows (Traverse SL Carbon, Control Rise Carbon, Control SL Integrated) —
  specialized.com/roval.com fetch-blocked (403), a pre-existing documented blocker in this
  catalog. Not re-attempted.

## Not reached (in-scope, still Pending)

The remaining ~450 unverified rows across handlebar/stem/grips/dropper/seatpost/saddle were
not attempted this session — see the brand/count breakdown captured at session start (biggest
clusters: Syncros ~24 remaining, Bontrager 23, Giant 16, Cannondale 15, TranzX 14, Canyon 14,
Pivot 14, Specialized 13, PRO 11, Nukeproof 10, Marin 10, plus ~90 more brands with 1-9 rows
each). A future session should `npm run verify:status` / re-scan this file's job state and
continue from here — many of these are OEM/house-brand rows (Cannondale, Giant, Trek/Bontrager,
PRO/Shimano, TranzX) with real dedicated brand sites likely worth a direct-fetch pass before
falling back to build-sheet-only sampling.
