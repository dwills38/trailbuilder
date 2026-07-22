# verify-notes-tail17 — mtb-tail-17 worker session (2026-07-22)

Scope: unverified MTB rows in `src/compat.js`, categories handlebar/stem/grips/dropper/
seatpost/saddle ONLY. Branch `verify/mtb-tail-17`, worktree
`.claude/worktrees/mtb-tail-17-8467`. No complete bikes, no schema/HTML files.

Assignment: continue tail-16's punch list of ~50 remaining 1-9-row brands (ANVL through
Yeti), plus the two hanging leads it flagged (the SDG Bel-Air V3 near-duplicate, and
`hb-burgtec-ridehigh-35`'s missing rise value).

## Promotions this session (3 rows -> verified:true)

- `gr-lizardskins-charger-evo`, `gr-lizardskins-strata` — FETCHED lizardskins.com's own
  product configurator directly via the browser pane (WebFetch returns it empty; it's a
  Shopify JS-rendered product-detail page, not a bot wall). Charger Evo: "Weight: 90
  grams", "$33.99" — matches the prior audit-cockpit pass's retailer-sourced figures
  exactly. Strata: "Total Weight: 118 grams", "$33.99" — weight matched the existing
  off-road.cc-review figure exactly, but the price was wrong ($25, a UK-RRP conversion
  estimate) — corrected to the real US price, which matches the sibling Charger Evo grip.
- `hb-burgtec-ridehigh-35` — **resolves tail-16's flagged lead.** burgtec-usa.com now
  sells this bar as a SINGLE SKU (the "Choose an option" selector offers only one
  variant): fetched directly, "Clamp: 35.0mm, Rise: 38mm, Width: 800mm, ... Weight: 312g",
  "$109.64". The stock Transition TR11 build sheet this row was originally sourced from
  cites per-size rises of 20/30/30/38mm (an older/discontinued low-rise generation of this
  bar) — the 38mm XL point is the one that still exists as a real, current, purchasable
  SKU, so it's the one entered (width/rise fields were previously entirely absent on this
  row; weight corrected 300->312g).

## Price corrections without promotion (weight bar unmet)

- `gr-peatys-monarch-knurl` — price corrected 20->31.99 (FETCHED peatys.com directly,
  browser pane: "$31.99" stated verbatim, thin/thick sizing + 130mm grip area confirmed).
  No weight is published anywhere on the page (nor findable elsewhere) — weight bar stays
  unmet, kept unverified.
- `gr-sensus-swayze` — price corrected 28->33.99 (FETCHED thesensus.com directly, browser
  pane). Finding: the plain "Original Swayze Single-Ply" name this row is titled after is
  **retired from Sensus's current lineup** — the only Swayze SKU sold today is "Swayze -
  Lock-On - Sans Flange" (a V3-era redesign per the site's own "SWAYZE V3" banner). No
  weight is published on the current product page (dimensions only). Kept unverified;
  flagging the naming/generation drift for whoever revisits this row.

## Investigated, no fixable result (walls confirmed)

- **ANVL** (`hb-anvl-mandrel-35`, `st-anvl-swage-35-40`) — anvlcomponents.com is DEAD: the
  domain now resolves to an unrelated Pin Up casino/betting site (confirmed by fetching
  it directly — nav is "Home/Author/Company/Contacts/Privacy Policy", betting-site copy).
  ANVL is Transition Bikes' house component brand and has never had a proper standalone
  manufacturer site reachable this session — it's sold only through retailers
  (thelostco.com, fanatikbike.com, competitivecyclist.com, etc). No manufacturer page
  exists to fetch against. Not promotable; not worth retrying without a new lead.
- **Easton** (`hb-easton-haven-35`) — Easton's cycling division no longer exists as an
  independently reachable storefront: easton.com redirects to easton.rawlings.com (the
  Rawlings BASEBALL/softball site), and the cycling collection path 404s under that
  umbrella ("OOPS, THAT PAGE DOESN'T EXIST!", top categories are all baseball gear).
  Confirmed via both WebFetch (403) and a direct browser-pane load. The Haven 35 is a
  2014-era product; no current manufacturer page exists anywhere. Hard wall, not a
  fetch-technique problem — Easton Cycling is gone.
- **Hope** (`st-hope-am-35`) — hopetech.com is alive and fetchable, but the "AM" stem name
  is retired: the current product is the "TR Stem", and Hope's own page states verbatim
  "Designed as a replacement for the AM stem." FETCHED hopetech.com/products/controls/
  stems/tr-stem/ directly (browser pane): weights are published per-length for the
  31.8mm clamp (32/40/50mm: 123/131/150g) but **only ONE length for the 35mm clamp**
  (35mm reach: 121g) — no 40mm/50mm-length weight exists for the 35mm-clamp TR stem to
  match this row's stored `length:50`. A genuine generation/naming mismatch (the KS
  Rage-i pattern from tail-16) — not a safe promotion without either changing the row's
  length to 35mm or leaving it as-is. Left untouched pending a call on which. Price note
  for a future pass: Hope's own page states "RRP ... $143.90 (ex tax)" for the TR stem
  overall (not length-specific).
- **Selle Royal** (`sa-selleroyal-2058-drn`) — "2058 DRN" is not a name found anywhere in
  Selle Royal's current product catalog (its official saddle-finder/collections turn up
  "On", "Journey", etc, never a "2058" or "DRN" line). The number pattern reads like an
  Orbea OE part number for a bundled saddle rather than a real standalone Selle Royal SKU
  — matches how the row is actually used in this catalog (an Orbea OE fill). No
  manufacturer page to fetch against; not promotable.
- **Newmen** (`hb-newmen-evolutionsl-800-318`, `st-newmen-evolution-318`, and siblings) —
  newmen-components.de is alive, but its current homepage advertises a **brand-new
  MTB-Lenker (handlebar) line-up** built around "Beskar" (gravity/enduro-DH) and
  "Performance" (XC-trail) naming — the "Evolution SL" name these rows are titled after
  is not mentioned anywhere on the current site; it's an older, likely-discontinued
  generation (retailer listings for Evolution SL still exist at bike-components.de/
  bike24.com, but no current newmen-components.de product page was found). Same
  generation-mismatch pattern as Hope/Sensus above. Not promoted; flagging for whoever
  investigates whether Newmen's shop still lists Evolution SL under a different URL.
- **Velo** (`sa-velo-shuttle`, `gr-velo-vlg1812d2`, `sa-velo-vl1c28-trail`) — Velo (VL
  Components) is a B2B OEM saddle/grip supplier; velosaddles.com exists but publishes no
  reachable per-SKU consumer product page for any of these exact model numbers (confirmed
  by search — only the general company site and unrelated model numbers surface). Same
  finding as tail-16's own note on `sa-velo-shuttle`. Not promotable this session either.
- **Ibis** 31.8mm-clamp rows (`hb-ibis-alloy-318-800`, `st-ibis-alloy-318-40`) —
  re-confirmed: store.ibiscycles.com sells ONLY the 35mm-clamp Blackbird alloy/carbon
  cockpit today (both already verified:true from a prior session); the 31.8mm OE-spec
  bar/stem used on older DV9-tier build kits has no standalone product listing. Correctly
  already documented as unverified samples — nothing new to do.
- **Intense** house-brand "Recon" cockpit (`hb-intense-carbon-800-35`, `st-intense-40-35`,
  `gr-intense-lockon`, `hb-intense-reconelite-carbon-760-318`, `st-intense-reconxc-318-65`)
  — re-confirmed: intensecycles.com/collections/replacement-parts and its /grips sub-tag
  both return "Sorry, there are no products in this collection" for cockpit/lock-on-grip
  items (the site DOES sell some Intense small parts standalone — the Foam Grips and the
  Recon dropper post, both already verified:true from prior sessions — just not these
  bar/stem/grip SKUs). Correctly already documented as unverified samples.

## SDG Bel-Air V3 near-duplicate — investigated, disposition recommended (NOT merged)

Resolves tail-16's flagged lead. FETCHED sdgcomponents.com/products/bel-air-v3-lux-alloy
directly: "Bel-Air V3 - Lux-Alloy", **$104.99, 236g** — this is an EXACT match to the
already-verified `sa-sdg-belair-v3` row (id:'sa-sdg-belair-v3', price:105, weight:236,
`verified:true`, `source` already literally points at this same lux-alloy URL). So
`sa-sdg-belair-v3` is correctly-sourced data for the Lux-Alloy trim, just under a plain
"Bel-Air V3" name/id (matches this catalog's established convention elsewhere of using
the base "V3" id for the mid-tier alloy-rail trim, since sdgcomponents.com also sells a
separate currently-sold-out "Bel-Air V3 | Steel" trim under its own distinct page).

`sa-sdg-belair-v3-lux-alloy` (the OTHER row, correctly id'd for the trim it claims to be)
carries stale/wrong figures — price:70, weight:270 — that do NOT match the real
sdgcomponents.com page for this exact product (its own desc admits "the product page did
not return a fetchable spec table this session" when it was entered). This is a genuine
stray duplicate: same real-world SKU, two catalog rows, one right (verified) and one
wrong (unverified sample).

**Recommended disposition** (not actioned this session, per brief — investigate only):
retire `sa-sdg-belair-v3-lux-alloy` into `ALIASES` pointing at `sa-sdg-belair-v3`, the
standard append-only-id correction pattern this catalog already uses elsewhere (see
CLAUDE.md "Ids are brand-qualified and APPEND-ONLY"). Whoever does the merge should also
sanity-check the `co-*`/`cb-*` cross-refs and complete-bike `fills` maps that currently
point at `sa-sdg-belair-v3-lux-alloy` (a handful exist, e.g. `dp-oneup-v3-316-180`'s
sibling build at line ~7367) so they resolve through `canonicalId()` after the retirement.

## Not reached this session

Given the breadth of the remaining punch list, this session prioritized: (1) the two
explicitly-flagged hanging leads (both resolved above), and (2) real aftermarket brands
most likely to have a clean standalone manufacturer page. NOT reached: Answer, Antidote,
Ari, Bird, Cotic, DEUX, Diamondback, Eightpins, Entity, Evil, Fabric (remaining
unverified rows), Focus, Forbidden, Ground Fiftyone, Ibis Blackbird-family already done,
Intense Recon already investigated above, Iridium, Kona, Liv, Mondraker, Natural Fit,
Onoff, PMG, Polygon, Post Moderne, Privateer, Production Privee, Radon, Ragley, Revel,
Rocky Mountain, Rose, Sixpack (Racing), Sonder, Stanton, Straitline, Supacaz (already
100% verified per tail-16), Twinworks, VP, Vitus, Yeti.

Judgment call worth recording for whoever picks this up: a very large fraction of the
remaining list (Bird, Antidote, Production Privee, TwinWorks, Stanton, DEUX, Onoff, Ari,
Ground Fiftyone, PMG, Ragley, Sixpack, Vitus, Radon, Focus, Diamondback, Forbidden,
Sonder, Entity) are **house-brand OE cockpit parts sold ONLY bundled into complete
bikes** — no standalone manufacturer product page exists for them by design (confirmed
for a sample of these in tail-16's own session, and by this session's ANVL/Newmen/Velo/
Selle-Royal findings above). Expect most of that subset to be a documented wall rather
than a promotable row; the higher-yield remainder is Kona/Liv/Rocky Mountain/Rose/
Mondraker/Polygon/Vitus/Radon house cockpit (worth a quick standalone-store check each,
since some bike brands DO sell their house parts a la carte) plus the genuine aftermarket
names (Straitline, VP, Iridium, Natural Fit, Post Moderne, Eightpins, Revel).

## Gates

`node validate.js`: 0 problems throughout (3359 -> 3366 verified across this session's
commit). `npx vitest run`: 989 passed. `npx tsc --noEmit`: clean. One commit this session
(Lizard Skins x2 + Burgtec rise fix + Peaty's/Sensus price corrections), gated before
committing.
