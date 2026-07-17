# verify/cb-sheets-3 — build-sheet verification round 3 (2026-07-17)

Branch off origin/main (bb80eea), fresh worktree at `.claude/worktrees/cb-sheets-3-seat12`.
Continuation of `verify/cb-sheets-1` and `verify/cb-sheets-2`'s rounds (sheet-verified
141/436 at session start). Scope per brief: fresh-fetch Santa Cruz, Orbea, Canyon, YT,
Commencal, Giant, Liv first, then down the maker list; also re-derive the 2 flagged DRIFT
rows (YT Jeffsy Core 3 CF, Evil Following) against their CURRENT maker pages. NO e-bikes
touched. THE BAR (manufacturer-page-only for interfaces) unchanged from VERIFY-PROTOCOL.md.

## Batch 1 result: sheet-verified 141 -> 144

### Promoted to verified:true (3)

- **cb-giant-fathom-2** — RE-FETCHED giant-bicycles.com/us/fathom-2-2025 fresh this
  session; reproduces every already-cataloged field verbatim (Shimano Deore drivetrain,
  Tektro HD-M275 brakes/180mm rotors, Praxis Cadet M24 30T crank, Giant cockpit/dropper/
  saddle) plus the $1,500 price. The row had a complete exact-match build sheet from an
  earlier grind that was flagged "not independently corroborated" and left unverified —
  this session's fresh fetch IS that corroboration. Genuine gap-fill, no data changed.
- **cb-liv-pique-advanced-29-2** — **liv-cycling.com/us/pique-advanced-29-2 is now
  fetchable** (round-1/round-2 both recorded every liv-cycling.com bike URL as
  404/JS-thin; that block did not reproduce this session). A direct manufacturer fetch
  confirms the full vitalmtb-sourced build sheet verbatim (Fox Float SL Performance Elite
  165x45 trunnion shock, Fox 34 SC Performance 120mm fork, Shimano XT M8120 30T crank,
  KMC X-12 chain, Giant XCR 2 carbon wheels, Maxxis Aspen tires, brakes+180/160 rotors,
  cockpit/dropper/saddle) and the $5,400 price. No fill changes; promoted.
- **cb-liv-intrigue-x-advanced-2** — same liv-cycling.com unblock. Direct fetch of
  /us/intrigue-x-advanced-2 confirms every fill verbatim BUT the price has moved: catalog
  carried $4,800 (from the earlier vital-sourced entry), the live manufacturer page states
  $5,000. Corrected price to $5,000 (current MSRP, sourced this session) and promoted.

### DRIFT re-check: cb-yt-jeffsy-core3-cf — RESOLVED, false alarm, no fill changes

Round 2 flagged an Exa-fetched render of this page showing Hayes Dominion A4 brakes +
15.80kg weight as possibly not matching the cataloged fills. A direct WebFetch of the live
yt-industries.com page this session reproduces the FULL current build sheet and it
EXACT-MATCHES every already-cataloged fill, including the brakes (which were already
`bk-hayes-dominion-a4` in the catalog — the round-2 "drift" was in the Exa render, not the
catalog). Row stays unverified for one still-real reason: the price widget renders no USD
figure to any fetch tool tried across 3 sessions now — persistent block, not something this
round can clear. No fill changes made; desc updated with the re-check finding.

### DRIFT re-check: cb-evil-following-ls-x0-transmission — BLOCKED, not resolved this session

evil-bikes.com returned HTTP 429 (rate-limited) on 2 separate attempts this session; the
row's existing desc already notes evil-bikes.com's own build-kit page is JS-rendered and
returns no spec text even when reachable. vitalmtb.com (the row's existing third-party
source) was not re-tried since it wouldn't change the verified-eligibility outcome (bar
item 1 requires a manufacturer page). **Flagged for a later session/retry** — the frame's
own real 165x45 trunnion shock question is resolved (already in-catalog per the row's
desc); what's unconfirmed is whether evil-bikes.com's current lineup still sells this exact
LS X0 Transmission trim at the cataloged $8,599, or whether the maxxis.com DHR II
compound-SKU conflict flagged in the existing desc has been resolved catalog-wide (still
open, not this row's problem to fix — same conflict flagged in cb-sheets-2 territory).

### Re-confirmed still-blocked (re-fetched fresh, no change)

- **cb-canyon-spectral-cf-7** — canyon.com/en-us/.../spectral-cf-7/3637.html fresh-fetched:
  still "Unavailable"/"Sold out", "Members only product" gate, no USD price rendered.
  Matches round-2 finding exactly. Leave unverified.
- **cb-orbea-oiz-m10** / cb-orbea-occam-lt-m10 (spot-checked oiz-m10 directly) —
  orbea.com/us-en/mountain/models/oiz-m10/ still returns HTTP 403. Both rows already carry
  a complete vitalmtb-sourced build sheet but cannot clear bar item 1 (manufacturer-only
  for interfaces) while the wall holds. Correctly unverified; not a gap, a hard block.
- **cb-yt-tues-core3** — yt-industries.com/Bikes/Downhill-Tues/CORE-3/ fresh-fetched:
  every fill reconfirmed (Öhlins DH38 M.1/TTX22 M.2, SRAM GX DH groupset, DT Swiss FR 1500,
  Maxxis Assegai DH, TRP DH-R EVO, Title cockpit, ODI grips, SDG I-Fly saddle) but rotor
  sizes and USD price are still not printed on the page — both already honestly modeled as
  documented estimates in the desc (not source-stated), so bar item 3 (fields must MATCH
  source, not be estimated) still blocks. Leave unverified, no change.
- Santa Cruz (5 unverified rows inspected: nomad-s, megatower-s, highball-gx-axs,
  v10-8-x01-dh, v10-cc-x01-dh-2025) — all carry detailed, honest grind-6 descs with
  explicitly documented substitutions (rim-family stand-ins, tire-tier/width mismatches,
  brake-tier discrepancies, an added-not-itemized dropper). These are correctly unverified
  by design — a substituted part fails bar item 3 regardless of source quality. Not
  re-fetched (the existing descs already reflect a full fresh grind-6 fetch); no new
  Santa Cruz promotions found this batch.

## Method note for the next batch

Built a 2-tier filter over the 295 unverified completebike rows: rows whose `desc`
mentions a fetch/manufacturer domain AND contains none of a ~15-term soft-inference
wordlist (stand-in, reused, representative, flagged, SAMPLE, closest cataloged, etc.).
Only 2 of 295 rows passed the strict filter (both Orbea, both wall-blocked — see above).
This confirms round-1/2's finding that the catalog's genuinely promotable "forgot to flip
verified:true" gaps are rare (1 found in round 2, 2 found here via direct brand
re-fetching rather than the desc-language filter, which undersells rows fetched via
third-party routes like vitalmtb.com/liv unblocking). **Going forward the highest-yield
move is direct manufacturer re-fetch of specific brand/model candidates** (especially
brands previously recorded as fully-walled — liv-cycling.com just came back), not desc
text-mining, which mostly just re-confirms already-correct unverified status.

## Batch 2: brand sweep continuation, no promotions, 1 new flag

- **Commencal** (2 unverified of 10 total - the rest already verified:true from earlier
  waves): re-fetched commencal.com's Meta HT V3 Ohlins page with a strict verbatim prompt
  targeting just the rotor line - it STILL reads "SRAM RS2 200mm, 6-bolts" (SRAM sells no
  RS2 rotor; existing desc already reads this as a probable HS2 typo and models it that
  way). No change; the substitution judgment call is unresolved on Commencal's end, not
  something a re-fetch can clear. Supreme DH V5 Öhlins not re-fetched (its blockers are
  multiple ASSUMED fields, same class of issue).
- **Specialized** (32 unverified, the single largest bucket) - spot-checked
  specialized.com/us/en/chisel/p/226245 fresh: still HTTP 403. Confirms the existing
  retry-queue note (CLAUDE.md Provenance section) still holds; all 32 rows are sourced via
  vitalmtb.com and cannot clear bar item 1 while this wall stands. Not worth per-row
  re-checking until specialized.com itself becomes fetchable - flagging that as the
  highest-value unblock to watch for (32 rows waiting on one domain).
- **Norco** (12 unverified) - re-fetched norco.com/bikes/mountain/trail/fluid-fs/fluid-fs-a2/
  fresh: page renders title-only (JS shell), confirming the existing "norco.com is a
  JS-only shell" blocker note. No change.
- **Transition** (14 unverified) - re-fetched transitionbikes.com/Bikes/Spur fresh: **the
  live Spur Carbon lineup no longer lists a "Deore" build at all** - current builds are
  Eagle 70 ($5,499), Eagle 90 ($6,499), XT Di2 ($7,499), XTR Di2 ($10,999). The cataloged
  `cb-transition-spur-carbon-deore` row may represent a DISCONTINUED trim no longer sold.
  Per the brief's scope (fix fills to real parts already in-catalog, not re-derive whole
  builds), this is flagged and NOT acted on - re-deriving would mean either finding
  archived spec data for the retired Deore trim or retiring the row, both out of this
  round's scope. **Flagged for the coordinator: possible discontinued-model cleanup
  candidate**, same class of decision as the modelYear-drift rows.
- **Evil Following LS X0 Transmission** (the 2nd flagged DRIFT row) - evil-bikes.com
  remains rate-limited (429) after 2 attempts across the session; not resolved. Retry in a
  later session/round.

## Batch 3: the Shopify variant-JSON price trick clears all 5 remaining GT rows

Discovered (independently, matching a technique already used once on the Canfield row per
its own desc) that `<brand-site>/products/<slug>.json` on a Shopify storefront returns
machine-readable variant pricing even when the rendered HTML page shows none - this is
exactly the class of blocker that had every GT completebike stuck ("every interface field
maker-fetched, price is a documented estimate"). Ran it against all 5 remaining unverified
GT rows and it resolved every one:

| row | old price (sample) | confirmed price (json) |
|---|---|---|
| cb-gt-sensor-carbon-elite | $3,300 | $3,500 |
| cb-gt-force-comp | $2,999 | $3,500 |
| cb-gt-zaskar-lt-expert | $2,200 | $2,100 (compare_at_price = MSRP; a color variant is on a live 50%-off sale at $1,050, NOT used per pricing policy) |
| cb-gt-force-carbon-elite | $3,600 | $3,800 |
| cb-gt-fury-carbon-pro | $6,499 | $6,700 |

**GT is now fully sheet-verified, 8/8 completebike rows.** Sheet-verified 144 -> 149.

### Same trick tried on other Shopify-hosted brands - mixed results

Built a broader filter (44 candidate rows: unverified + has a `source` URL + desc mentions
an unconfirmed/estimated price) and tried the `.json` route on 7 of them:

- **cb-marin-rift-zone-1**, **cb-canfield-lithium-v3-base** - JSON confirms the price
  ALREADY matches the catalog exactly ($1,899 and $3,999.99 respectively - Canfield's own
  desc already used this exact technique when the row was entered). These rows are
  correctly unverified for OTHER documented reasons (same-family part substitutions not
  independently confirmed, missing grips), not price - the broad filter over-matched on
  the word "price" appearing anywhere in a long desc. No changes.
- **us.chromagbikes.com** (2 rows), **vitusbikes.com**, **www.diamondback.com** - all
  returned HTTP 429 (rate-limited) this session, likely from the run of 7 near-simultaneous
  fetches. Worth a retry in a later session/batch - these are real, cheap candidates if the
  rate limit clears.
- **whytebikes.com/products/905-my23.json** - HTTP 404 (not a Shopify store, or wrong
  slug pattern). Not a quick win.

### Lesson for future rounds

The Shopify-JSON trick is high-yield but ONLY closes the price gap - it does nothing for
rows blocked by genuine part-substitution ambiguity (the Marin/Canfield near-misses above).
Filter for "price is the ONLY open question" specifically (every fill already exact-match,
desc contains no "flagged"/"ASSUMED"/"not independently confirmed" language) before
spending a fetch - a bare "mentions price" filter has a high false-positive rate.

## Session tally: reviewed ~30 bikes across 11 brands. 8 promotions (Giant Fathom 2, Liv
Pique Advanced 29 2, Liv Intrigue X Advanced 2, + all 5 GT rows). Sheet-verified 141 -> 149.
1 drift resolved as a false alarm (YT Jeffsy Core 3 CF). 1 new flag for the coordinator
(Transition Spur Carbon "Deore" possibly discontinued). Evil Following drift row still
blocked (evil-bikes.com 429). 4 domains rate-limited mid-batch, worth a retry. Continuing
down the remaining ~285 unverified rows next session/batch (Ghost/Mondraker/Pivot/Ibis/
Yeti/Cannondale/Evil/Nukeproof/Norco/Transition/Chromag retry/etc.). Trek skipped per brief
(3-tier wall). Specialized (32 rows) fully blocked on one domain (403) - highest-value
domain to re-check periodically.
