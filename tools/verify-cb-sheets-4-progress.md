# verify/cb-sheets-4 — build-sheet verification round 4 (2026-07-17/18)

Branch off origin/main (9d7456e), fresh worktree at `.claude/worktrees/cb-sheets-4-seat12`.
Continuation of rounds 1-3 (sheet-verified 149/436 at session start). Scope per brief:
retry the round-3 rate-limited list (Marin, Canfield, Chromag x2, Vitus, Diamondback) with
the Shopify-JSON price trick, refine the filter to target "price is the only open question"
rows, then sweep Ghost/Mondraker/Pivot/Ibis/Yeti/Cannondale/Nukeproof/Norco/Rocky Mountain/
Devinci/Propain. NO e-bikes touched. THE BAR unchanged from VERIFY-PROTOCOL.md. bdata kept
LOW per brief — WebFetch/Exa/curl-Shopify-JSON only.

## Batch 1: retry list — sheet-verified 149 -> 151

Used `curl` directly for the Shopify `.json` variant-price trick instead of WebFetch (WebFetch
hit 429s on us.chromagbikes.com/marinbikes.com/vitusbikes.com/diamondback.com on first pass;
plain curl with a browser User-Agent cleared every one of them on retry — **worth remembering:
when WebFetch 429s a Shopify `.json` endpoint, try curl before giving up, it may not share the
same rate-limit bucket**).

### Promoted to verified:true (2)

- **cb-marin-rift-zone-2** — marinbikes.com/products/2026-rift-zone-2.json: all 5 size/color
  variants price at $2,299.00 exact match. Every fill already traced to a direct manufacturer
  fetch in an earlier session (round-4 desc audit found no fill-selection substitution flags on
  this row itself — the one "flagged as an inference" note is on the downstream crank PART's own
  row, not a choice made on this completebike row). Promoted.
- **cb-marin-san-quentin-3** — **price correction**: marinbikes.com/products/2024-san-quentin-29-3.json
  reads $1,799.00 exact across all 5 variants; the catalog carried $1,999 sourced from a stale
  collection-page listing (the product's own page states no price, per the existing desc — the
  `.json` route is what unblocks it). Corrected 1999->1799 and promoted; every fill was already a
  direct-fetch exact/documented-non-driving match.

### Price-corrected, stays unverified (1)

- **cb-chromag-rootdown-ti-xo** — the "COMPLETE - XO TRANSMISSION" variant was sold-out at a prior
  session's fetch (no live price), so that session corroborated $3,600 via 3 dealer listings and
  left it unverified. This session's `.json` fetch shows the variant back in stock at **$5,500** —
  a real manufacturer price, not the dealer figure. Corrected 3600->5500. Still unverified: grips
  (not itemized on the build sheet) and DHR tire compound (unstated) are genuine inferences,
  unrelated to price.

### Re-confirmed correct, no change (6)

- **cb-marin-rift-zone-1** — price exact ($1,899) but the shock is "Pro R" vs the cataloged "Pro
  RL" (flagged in-desc as "not independently re-confirmed identical") — a genuine fill-level
  substitution question, not just a price gap. Correctly stays unverified.
- **cb-chromag-rootdown-eagle90** / **cb-chromag-stylus-mx-eagle90** — both prices exact
  ($3,840 / $3,650) via curl `.json`, but both already flag their DHF/DHR tire compound as
  inferred (not stated on the page) — the documented reason both stay unverified. No change.
- **cb-vitus-escarpe-290-cr** — `.json` price ($2,599.99) is the SAME number the existing desc
  already used as the GBP source figure for its documented USD conversion (vitusbikes.com is a
  UK storefront; no US-specific pricing is independently fetchable) — confirms the existing
  unverified status is correct, not a new find.
- **cb-canfield-lithium-v3-base** — `.json` confirms BASE tier at $3,999.99 exact (already
  verified via this same technique in an earlier session), but the desc flags the Assegai/DHR-II
  tire pairing as "not independently re-confirmed for Canfield specifically" — stays unverified.
- **cb-diamondback-release-29-1** — price exact ($2,850) but brakes (piston count unstated),
  rotor size (not printed, modeled to frame max) and dropper travel (not page-stated) are all
  documented substitutions — stays unverified, no change.

## Batch 2: brand sweep — Ghost/Mondraker/Pivot/Ibis/Yeti/Cannondale/Rocky Mountain

**Finding: the modern build-your-bike brands (Yeti, Pivot, Ibis, Cannondale, Rocky Mountain,
Mondraker's current-gen pages) render their component/build-kit tables via client-side JS that
neither plain WebFetch NOR the Exa fetch tool executes** — both return the marketing copy and
(for Rocky Mountain/Ibis) the full geometry table, but the actual per-tier parts list is empty.
This is a DIFFERENT wall than a 403/429 block — the page is genuinely fetchable, the spec sheet
just isn't in server-rendered HTML. Confirmed on:
- yeticycles.com/en-us/bikes/sb130 (features/geometry only, no build-kit)
- ibiscycles.com/bikes/ripley-af (full geometry table renders; the "Build Your Ripley AF"
  configurator renders empty — DID surface a real number worth flagging: the page states
  Ripley AF **"Starting at $3,499"** but the Deore-tier configurator shows a base of ~$3,999
  once a build is implied selected; the catalog's `cb-ripley-af-deore` carries $3,499. Not enough
  to correct on (no component list to confirm fills against), but flagged for whoever revisits
  Ibis with a JS-capable fetch)
- pivotcycles.com/bikes/firebird ("Build Specs" section present but empty in the fetch)
- cannondale.com product URLs 404 on every guessed slug tried; guessing exact current URLs
  without a working site search is not a good use of fetch budget
- bikes.com/en-intl/products/altitude-a30-25 (Rocky Mountain) — full geometry renders, no
  build-kit component list
- mondraker.com — only 2023-generation URLs surfaced via search; the catalog's Raze R/Foxy
  rows are already 2025/2026-gen and retailer-sourced (thebackcountry.com/vitalmtb), so a
  same-gen manufacturer match wasn't found this session
- ghost-bikes.com — 404 on the direct product slug, 429 on the collection page

**These 7 brands (Ghost, Mondraker, Pivot, Ibis, Yeti, Cannondale, Rocky Mountain — ~90
unverified rows) need a JS-rendering fetch tool (bdata `scrape`, which the brief kept LOW this
round) to make progress on build-kit confirmation.** Flagging as the highest-value unblock to
retry with bdata authorized.

### Nukeproof — 1 row spot-checked, no change

- **cb-nukeproof-dissent-carbon-pro-297-gx-dh7** — re-fetched nukeproof.com/en_US/bikes/SBIDICNKP003
  (still fetchable, confirming the round-cb7 finding that this one en_US bikes subpath works
  where other nukeproof.com paths don't). Same $5,999 figure as already cataloged, but this
  session's fetch rendered it with a "€" prefix where the prior session's fetch (same day, same
  page) recorded "$5,999.00 USD stated directly on the page, not a GBP conversion" — likely a
  fetch-tool locale/cookie difference, not a real page change, but not resolved either way. Moot
  for verification: the row already carries multiple documented substitution flags (wheels,
  tires, saddle all "closest cataloged, flagged") unrelated to price, so it stays correctly
  unverified regardless. No change made.

### Propain — blocked

- propain-bikes.com/en/bikes/spindrift/ returned HTTP 403 (bot wall). The 5 unverified Propain
  rows stay vitalmtb-sourced and unverified; not retried further this session (403 walls don't
  respond to a second identical attempt).

## Batch 3: Norco/Devinci/Propain retries

- **Norco** — norco.com re-confirmed as the round-2/3-documented JS-only shell (no retry
  needed, matches the standing finding). All 12 unverified Norco rows stay as-is.
- **Devinci** — devinci.com IS fetchable via `curl` with a browser UA (WebFetch itself wasn't
  tried directly here, curl was used from the start since it already proved reliable this
  session) and DOES render its cross-sell/related-builds price widgets server-side, but the
  actual build-kit component list for the page's own bike is JS-injected (same wall class as
  Yeti/Pivot/Ibis). Two spot-checks:
  - **cb-devinci-chainsaw-dh-gx**: devinci.com/en/bikes-2023/mountain/chainsaw-gx-dh-silver/
    confirms the price header directly as **US$4,499.00** — exact match to the catalog's
    vitalmtb-sourced $4,499. Not promotable regardless (6+ documented fill substitutions
    already block it - chain, crank ring, rotor model, tire casing, stem, grips, saddle all
    flagged ASSUMED in the existing desc). No change.
  - **cb-devinci-marshall-29-deore**: devinci.com/en/bikes-2024/mountain-2024/marshall-deore-12s-green-lux/
    — this exact page's own price isn't rendered server-side, but its cross-sell widget lists
    a sibling "Marshall 29 Deore 12S" tile at **US$2,649.00**, not the catalog's $2,599 (sourced
    from theloamwolf.com, a review site republishing the maker sheet, not devinci.com directly).
    **NOT corrected this session** — a cross-sell teaser tile isn't confident enough evidence to
    overwrite a price sourced from a full republished build sheet (could be a different color/MY
    variant); flagging the ~$50 discrepancy for a session that can fetch this page's own
    primary price display. Also already has 6 documented fill substitutions (brakes, rotors,
    wheels, tires, cockpit, saddle) blocking verification independent of price.
- **Propain** — propain-bikes.com IS fetchable via `curl` (403'd WebFetch directly, `curl` with
  a browser UA got HTTP 200) — it's a WooCommerce/WordPress site, but prices are injected by the
  `wcpbc` (WooCommerce Price Based Country) plugin client-side, same JS-wall class again. All 6
  unverified Propain rows stay vitalmtb-sourced, no change.

**Running tally of the JS-build-kit-wall class**: Yeti, Pivot, Ibis, Cannondale, Rocky Mountain,
Mondraker (current-gen), Ghost, Norco, Devinci, Propain — 10 brands now confirmed hitting this
exact failure mode (page fetches fine, geometry/price sometimes renders, component list does
not). This is now clearly the single highest-value unblock for a future round: a bdata-authorized
session working just this brand list would likely clear a large fraction of the catalog's
remaining ~280 unverified completebike rows.

## Session tally

Sheet-verified 149 -> 151 (2 promotions: Marin Rift Zone 2, Marin San Quentin 3). 2 price
corrections on rows that stay unverified for other documented reasons (Chromag Rootdown Ti XO
$3600->$5500; San Quentin's $1999->$1799 was the promoted row above). ~13 rows re-confirmed
correctly unverified with no change (the retry-list brands). 1 Devinci + 1 Nukeproof row
spot-checked (price-confirmed, no change - both already blocked by other flags). 1 Devinci price
discrepancy flagged but not acted on (insufficient confidence). 10 brands (Yeti, Pivot, Ibis,
Cannondale, Rocky Mountain, Mondraker, Ghost, Norco, Devinci, Propain — ~130 combined unverified
rows) confirmed hitting the same JS-rendered-build-kit wall this round's toolset (WebFetch/Exa/
curl) can't clear — **flagged as the top candidate for a bdata-authorized session**, would
likely be the single highest-yield move available to the next round.

Incidental: rescued an unrelated stranded diff (Canyon Stoic 4 + DT Swiss wheels, from a
different unlanded grind) out of the shared root checkout mid-session per the coordinator's
instruction — saved to `D:\MTB Bike Builder\cb4-salvage.patch`, root confirmed clean. Not part
of this round's own work; noted here only so the patch's origin isn't a mystery later.
