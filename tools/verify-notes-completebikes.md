# Complete-bikes verification notes — verify/completebikes-1

## Round 2 (2026-07-18, post-merge continuation): the ~130-row JS-kit-list-wall brands

Coordinator merged Round 1 (Yeti) and asked to continue against the brand list from
`verify-cb-sheets-4-progress.md` (Pivot, Ibis, Cannondale, Rocky Mountain, Mondraker,
Ghost, Norco, Devinci, Propain) using `bdata scrape` on the free pool. Norco: 1 attempt
per the coordinator's caveat (`norco.com` returned only a bare "Page Not Found" title even
under bdata scrape) — confirmed still blocked, moved on. Cannondale: `cannondale.com`
renders no pricing at all under bdata scrape (its price/spec data loads via a client-side
API call the unlocker snapshot doesn't trigger) — still blocked, same as before. Propain:
`propain-bikes.com`'s per-model pages render no pricing either (its bike-builder
configurator is the pricing surface, not a static page) — still blocked, distinct from
the JS-kit-list class (this is the EU-configurator class flagged in
`verify-cb-sheets-4b-progress.md`).

**Pivot** (pivotcycles.com, Shopify): `bdata scrape` on `/en-us/collections/<model>`
pages renders full build-tier price lists cleanly (Shopify collection pages are SSR).
Spot-checked all 14 Pivot rows against live collection pages for Firebird, Switchblade,
Mach 4 SL, Shadowcat, Les SL. Trail 429 and Mach 6 are NOT in Pivot's current lineup at
all (collections/trail + collections/enduro list every current model; neither appears) —
both catalog rows are already-flagged legacy third-party-sourced (vitalmtb/99spokes)
snapshots with no live page to conflict against, correctly unverified. Every other
Pivot row's trim naming (e.g. "Ride SLX/XT", "Ride GX/X01") has also since been retired
from Pivot's lineup (replaced by "Ride Eagle 70/90" / "Ride GX Eagle Transmission" /
"Ride Factory" naming) — no live comparison possible, no bugs found, no changes made.

**Ibis** (ibiscycles.com, custom build-kit picker): `/build-kits/<slug>` pages render
full itemized component tables (fork/shock/wheels/tires/brakes/rotors/drivetrain/
headset/cockpit/dropper) — a genuine manufacturer spec-table source, not just a price
list. This let me catch real fill-level errors on 2 already-**verified** rows:

- `cb-ibis-ripmo-af-sram-90` (verified) — Fixed. Front tire was `ti-maxxis-minion-dhf-*`
  (Minion DHF); ibiscycles.com's own build-kit page states "Maxxis Assegai 29x2.5 EXO+"
  -> corrected to `ti-maxxis-assegai-29-25-exop-mt` (compound unstated, MaxxTerra per
  this catalog's OEM-default convention). Headset was `hs-canecreek-40-zs44-zs56` (Cane
  Creek 40); page states "Cane Creek 50: ZS44/ZS56" -> corrected to the already-cataloged
  `hs-canecreek-50-zs44-zs56` (Cane Creek Fifty), exact match. Every other fill
  independently re-confirmed exact against the manufacturer page.
- `cb-ibis-ripmo-af-deore` (verified) — Fixed. Same 2 corrections (Assegai front tire,
  Cane Creek 50 headset), confirmed against its own build-kit page. Left the
  Deore-M6100-vs-page's-stated-M6200 drivetrain tier substitution AS-IS and flagged for
  the coordinator/component-category worker — this catalog has no M6200 derailleur/
  cassette/crank/brake rows (only an M6200 shifter), so it's a documented component-row
  gap, not a wrong-SKU error like the tire/headset (which had exact existing matches).

**Duplicate-row finding** (flagged for coordinator, not resolved — an id merge/dedup is
out of this cluster's field-level-correction scope): `cb-ibis-ripmo-v3-gx-axs` and
`cb-ibis-ripmo-v3-gx-transmission` are almost certainly the SAME real SKU (same $7,949
price, same cited source URL, "GX AXS" vs "GX Transmission" are Ibis's two labels for
the identical SRAM Eagle Transmission tier) entered twice under different ids with
materially different (and one demonstrably wrong) fills. Same situation for
`cb-ibis-ripley-v5-gx-axs` / `cb-ibis-ripley-v5-gx-transmission` (same $7,249 price, same
source). Fixed the *wrong* fills in place rather than merging:

- `cb-ibis-ripmo-v3-gx-axs` (unverified) — Fixed. Wheels were `fw/rw-ibis-s35-i9-29`
  (S35 Carbon on i9 Hydra hubs); re-fetched the row's own cited source URL fresh and it
  states "Blackbird Send Alloy, 32H, Blackbird Hubs" -> corrected wheels (to match the
  confirmed-correct sibling row) + rotors (6-bolt HS2, not Center-Lock, to match the new
  hub) + brakes (Base tier, matching the sibling) + added the frame-matching headset and
  grips this row had omitted.
- `cb-ibis-ripley-v5-gx-transmission` (unverified) — Fixed. Shock was
  `sh-fox-float-x-factory-210x52p5` (Float X); the row's OWN quoted desc text already
  said "Fox Float, Factory Series, Float w/EVOL" (no "X2"/"X") — self-contradictory.
  Re-fetched the source fresh, confirmed plain Float is correct (matches the sibling
  `-gx-axs` row's shock pick exactly) -> corrected to `sh-fox-float-factory-210x52p5`.

**Rocky Mountain** (bikes.com, Shopify): `bdata scrape` on `/collections/<model>` pages
renders full build-tier prices cleanly (same Shopify SSR pattern as Pivot). All 5
catalog rows are explicitly documented model-year snapshots (2023/2024, one 2026)
distinct from the current lineup's specs/naming (e.g. catalog's "Altitude C70 Shimano"
2024 vs live "Altitude Carbon 70" 2026 SRAM Eagle 90 Transmission build) — legitimately
not comparable to today's prices, same pattern as the Yeti C2-tier snapshots in Round 1.
No bugs found, no changes made; `cb-rockymountain-altitude-c50` and
`cb-rockymountain-altitude-a30` (both already current-modelYear) re-confirmed exact
matches ($5,999 / $3,999) against today's live page.

**Devinci** (devinci.com, per-product pages under `/en/bikes/mountain/<slug>/`): pricing
renders cleanly once given the exact product slug (found via the model hub page's
internal links). Spot-checked the 5 current-modelYear (2026) rows against live pricing —
`cb-devinci-troy-gx-axs` ($5,699), `cb-devinci-troy-carbon-gx-axs` ($6,899), and
`cb-devinci-troy-deore` ($3,199) all confirmed exact matches. No bugs found.

**Mondraker, Ghost**: not re-checked this round — their completebike rows already use
the `price`(MSRP)/`streetPrice`(sale) pair correctly per policy (spot-checked in Round 1
scoping pass), no sign of the sale-price-as-price bug class Round 1 found on Yeti.

### Round 2 gates

- `node validate.js`: `DATA OK - 5023 parts, 0 problems (3017 verified, 2006 unverified)`
  (7/7 catalogs OK, unchanged counts — all edits were fill-level corrections, no rows
  added/removed)
- `npm test`: 764/764 passed (29 files)
- `npx tsc --noEmit`: clean, no output
- `node tools/verdict-audit-harness.js`: unaffected — C1 stays 329 clean/0 errors (0
  regressed on the C2 wheel-substitution check either), D 15/15 clashes still correctly
  flagged. Every fill swapped this round was an already-cataloged, already-compatible
  part (same wheel-driver/rotor-mount/BB-interface family in each case), so no new
  clash surface was introduced.

### Round 2 tally

9 brands worked (Norco/Cannondale/Propain confirmed still blocked, 1 attempt each per
budget). Pivot (14 rows) and Rocky Mountain (5 rows) and Devinci (5 of 10 rows)
spot-checked clean, no bugs. Ibis (16 rows): 4 real fill-level errors fixed across 3
already-verified-or-soon-verifiable rows (2x wrong tire, 2x wrong headset tier, 1x wrong
shock model on a mislabeled row) plus 1 fully-wrong wheel/rotor/brake/headset/grips set
corrected on a duplicate row; 2 likely-duplicate SKU pairs flagged for the coordinator's
dedup queue (not resolved — id merges are out of scope here); 1 component-category gap
(Shimano Deore M6200 groupset missing from the catalog) flagged. No new completebike
rows added or removed; no ids changed; `tools/verification-job.json` untouched.


Session scope: `cat:'completebike'` rows only. Used `bdata scrape` (Bright Data Web
Unlocker, free pool) against yeticycles.com — a JS-rendered SPA that WebFetch/Exa could
not previously render (see `tools/verify-cb-sheets-4-progress.md`'s "top candidate for a
bdata-authorized session" flag). Confirmed `bdata scrape -f markdown` DOES render this
site's client-side kit-list content (tier name / brief spec / price all present in the
markdown), unlocking Yeti as a source. Full itemized wheel/tire/cockpit specs are still
NOT itemized on yeticycles.com's kit-list pages (only frame/fork/shock/brake/drivetrain
tier + price) and the `/buy/<kit>` configurator sub-pages did not render full spec tables
either — so per-slot fills for T2/T3/etc. trims still rely on the already-documented
carried-over sourcing (99spokes.com sibling builds), which correctly keeps those rows
unverified per THE BAR (not every fill independently confirmed for the exact trim).

## Disposition

cb-yeti-sb160-c2   | Skipped (unchanged) | price=6300 confirmed as an intentional 2024
  model-year snapshot (99spokes/yeticycles per its own desc), correctly distinct from
  today's live $5,200 C2 tier. No action.
cb-yeti-sb160-t2   | Failed->Fixed | https://www.yeticycles.com/bikes/sb160 (bdata scrape,
  2026-07-18) — row stored price:6800, which was the SALE price; live MSRP is $8,500,
  sale still $6,800. Corrected to price:8500, streetPrice:6800 per pricing-display policy
  (MSRP is always the price/ranking basis; sale is a labeled streetPrice).
cb-yeti-sb160-t3   | Failed->Fixed | same page/fetch — row stored price:8640 (the sale
  price; desc even recorded the MSRP as $9,500 at entry time). Live MSRP has since risen
  to $10,800 with the same $8,640 sale price. Corrected to price:10800, streetPrice:8640.
cb-yeti-sb135-c2, cb-yeti-sb135-t2, cb-yeti-sb135-t3 | Skipped (unchanged) | re-fetched
  https://www.yeticycles.com/bikes/sb135 — T2 $5,550 and T3 $6,300 match catalog exactly
  (no sale currently listed on either tier). C2's catalog price ($6,000, MY25 vitalmtb
  source) is an intentional snapshot distinct from today's live $4,200 C2 tier — no bug.
cb-yeti-sb120-c2, cb-yeti-sb120-c3, cb-yeti-sb120-t2 | Skipped (unchanged) | re-fetched
  https://www.yeticycles.com/bikes/sb120 — T2 $7,700 and C3 $6,500 match catalog exactly.
  C2's catalog price ($5,800, MY24 99spokes source) is an intentional snapshot distinct
  from today's live $6,000 C2 tier — no bug.
cb-yeti-arc-c2, cb-yeti-arc-t2, cb-yeti-arc-t1-xt-di2 | Skipped (unchanged) | re-fetched
  https://www.yeticycles.com/bikes/arc — T2 $5,900 and T1 $6,400 match catalog exactly.
  C2's catalog price ($4,600, MY25 99spokes source) is an intentional snapshot distinct
  from today's live $4,500 C2 tier — no bug.
cb-yeti-sb165-c2, cb-yeti-sb165-t2 | Skipped (unchanged) | price fields already store the
  correct MSRP ($6,400 / $6,800); sb165-c2's desc separately notes a $4,800 sale figure
  that was never stored as streetPrice — an omission, not a policy violation (in scope for
  a future pass, not touched here to keep this batch narrowly scoped to actual bugs).
cb-yeti-sb130-c1-gx, cb-yeti-sb150-c1-gx | Skipped | SB130/SB150 are not in Yeti's current
  site nav (superseded by SB135/SB140/SB160/LT); no live page to re-check against, left
  as-is (already-documented legacy-snapshot rows).

## Coordinator flag (not fixed here — out of this cluster's scope)

`fr-yeti-arc`'s already-**verified** frame row states `bb:'BSA73'`. This session's
cb-yeti-arc-c2 desc (entered by a prior session) documents that MY25 yeticycles.com specs
state `BB86/BB92, Press Fit` / `SRAM DUB BB92` for the ARC, and Yeti's own support article
"What cranks and bottom bracket can I use on the ARC?" independently corroborates PF92 —
contradicting the verified BSA73 field. Flagged then, still unresolved. Worth a direct
re-check against the MY25 owner-manual PDF the frame row was originally sourced from,
since a wrong `bb` value on a verified frame is a real false-compatibility risk (any
cassette-frame BB slot pick against this frame would get a false-clean verdict for a
part that can't actually be threaded in).

## Gates (this session, after both price corrections)

- `node validate.js`: `DATA OK - 5023 parts, 0 problems (3017 verified, 2006 unverified)`
  (+ KIT/BMX/STRIDER/ROAD/GRAVEL/EMTB all OK — 7/7)
- `npm test`: 764/764 passed (29 files)
- `npx tsc --noEmit`: clean, no output
- `node tools/verdict-audit-harness.js`: unaffected by these price-only edits — C1 stays
  329 clean/0 errors, D 15/15 clashes correctly flagged, no fills changed on either row.

## Session tally

436 total completebike rows in catalog (151 previously sheet-verified per prior sessions'
running tally, unchanged this session — no new promotions, this batch was a targeted
price-accuracy sweep on the Yeti cluster, not a verification-promotion pass). 20 Yeti rows
reviewed; 2 real price-policy bugs found and fixed (sale price stored where MSRP belongs);
1 frame-level BB discrepancy flagged for the coordinator; rest confirmed correct
(intentional model-year snapshots or already-accurate). `bdata scrape` confirmed as a
working unlocker for yeticycles.com specifically — worth trying on the other JS-walled
brands flagged in `verify-cb-sheets-4-progress.md` (Pivot, Ibis, Cannondale, Rocky
Mountain, Mondraker, Ghost, Norco, Devinci, Propain, ~130 rows) in a follow-up session;
not attempted this round (time-boxed to Yeti as the proof-of-concept brand).

## Wave 4 (2026-07-18, `verify/completebikes-4`): Santa Cruz, Giant, Evil, Orbea, Scott

Three catalog-worker sub-sessions ran in parallel (each its own worktree/branch off
origin/main), covering the no-recorded-wall brands the coordinator flagged for yield:
Santa Cruz (33 rows), Giant (17) + Evil (15), Orbea (13) + Scott (11) — 89 rows total,
none previously touched by waves 1-3. Trek/Specialized (known walls) and the
"remaining smaller makers" tail were NOT attempted this wave — deferred to a follow-up,
per the coordinator's yield-first sequencing. All three branches merged cleanly into
`verify/completebikes-4` (no conflicts — disjoint id ranges).

**Santa Cruz** (santacruzbicycles.com `/pages/product-support/<model>-my<year>` build-kit
tables, fetched via Exa after WebFetch hit a 429 — no bot wall, Exa resolved the
Shopify/Alpine.js rendering cleanly): 33/33 rows checked. 17 Fixed (mostly a systematic
Centerline→HS2 rotor-family correction plus several tire compound/casing drifts against
the exact live trim, and one major re-source of `cb-santacruz-hightower-gx-axs-rsv` off a
third-party review onto the real manufacturer page — corrected drivetrain family
mechanical-AXS→Transmission plus fork/shock/brakes/rotors/tire). 13 Confirmed-clean.
Component-category gaps noted (not fabricated, left as documented approximations): no
plain-EXO 27.5×2.4 3C MaxxTerra DHR II row, no 27.5×2.5 EXO Aggressor row, no Rekon Race
29×2.35 EXO row, no RaceFace ARC-27/30 rim-width variants, no "direct mount" DH stem
mount type in the schema (V10 8 bar/stem naming approximations, non-verdict-driving).

**Giant + Evil** (giant-bicycles.com, evilbikes.com): 32/32 rows checked. Giant: 1 real
fix (Reign Advanced 1 rear tire EXO+→DoubleDown), 1 drivetrain-SKU correction (Talon 1's
Advent X substitution replaced with real cataloged Advent MX rows), 6 promoted to
`verified:true` on exact-match re-fetch, rest already-verified/skipped-clean. Evil: 6
rows Fixed→Verified (tire casing/compound, rotor size, shock air→coil, brake tier,
saddle-model corrections against the exact live build tab), 3 Skipped-wall (GX/i9 Hydra
tier has no matching live spec tab, left on its documented 99spokes sourcing). **Escalated,
not resolved:** `cb-evil-following-ls-xx-transmission` and the two Wreckoning LS XX rows —
evilbikes.com's own "XX Eagle Transmission" tab lists cassette code XG-1295 (a standard
AXS code, not a genuine Transmission code) with chain wording that doesn't match a
flattop-compatible cassette, internally contradictory on Evil's own page; correcting the
derailleur/cassette/chain/crank family would be verdict-driving (system/actuation/mount)
and needs a second source (ideally a direct SRAM compatibility check) plus confirming the
frame's derailleur-hanger mount — flagged in each row's `desc`, left unchanged pending a
coordinator follow-up. One gate near-miss caught and fixed pre-merge: an initial
Trance X Advanced 1 shock swap picked an `oemOnly`+`forFrames`-restricted alloy-frame
shock for the carbon-frame row; `test-golden.js`/`test-invariants.js` caught it, reverted
to the frame's own `bundledShock`.

**Orbea + Scott**: 24/24 rows checked. Orbea (orbea.com): confirmed still wall-blocked
(WebFetch 403, Exa 403/CRAWL_NOT_FOUND, browser pane root loads but every model path
404s — same WAF wall prior sessions documented, not circumvented per the fetch-ethics
ruling). All 13 rows instead cross-checked against their own already-cited vitalmtb.com
source for drift — zero drift found, all Confirmed-clean. Scott (scott-sports.com, no
wall): 3 rows Fixed (Ransom 910 added missing `streetPrice`+re-sourced off vitalmtb to a
direct fetch; Spark RC Team's brake+rotor family drifted SRAM DB6/Centerline on the live
page and was corrected; Gambler 10 price rounding $5899→$5899.99), 1 Skipped-snapshot
(Genius 910, retired MY2023 listing, legitimate), 1 Skipped-wall (Voltage YZ01 DJ SKU,
already documented), rest Confirmed-clean. **Flagged, not fixed:**
`cb-scott-ransom-900-rc`'s `price` field equals its `streetPrice` rather than the real
$9,999.99 MSRP — correcting it fails the bundle-price-vs-component-sum validator check
against this catalog's current sample component prices (component sum is $9,507.99,
under the true MSRP); needs either a documented exception or a components-pricing
follow-up, out of this wave's completebike-only scope.

### Wave 4 gates

- `node validate.js`: `DATA OK - 5023 parts, 0 problems (2997 verified, 2026 unverified)`
  (+ KIT/BMX/STRIDER/ROAD/GRAVEL/EMTB all OK — 7/7)
- `npm test`: 764/764 passed (29 files)
- `npx tsc --noEmit`: clean, no output
- `node tools/verdict-audit-harness.js`: unaffected — C1 stays 329 clean/0 errors, C2
  5/5 wheel-substitution clean, D 15/15 clashes correctly flagged, D2 2/2 clean partials
  correct. The E-section's 5 flagged fork families (dvo-diamond-d1sl, dvo-onyx-sc,
  srsuntour-aion-34/durolux/xce) are pre-existing and unrelated to this wave's brands.

### Wave 4 tally

89 completebike rows checked across 5 brands (Santa Cruz 33, Giant 17, Evil 15, Orbea 13,
Scott 11): 27 Fixed with real corrections (rotor family, tire compound/casing, shock
type, brake tier, drivetrain SKU, price rounding/missing streetPrice), 8 promoted to
`verified:true` on exact-match re-fetch, ~5 Skipped (snapshot or wall), rest
Confirmed-clean. 3 rows escalated with unresolved drivetrain ambiguity (Evil XX
Transmission tier); 1 row escalated with a price-vs-validator tension (Scott Ransom 900
RC). No new completebike rows added or removed; no ids changed; `tools/
verification-job.json` untouched (out of scope — that job tracks individual parts).
Trek, Specialized (known walls) and the remaining smaller-maker tail (Transition,
Forbidden, Commencal, GT, Vitus, Polygon, Marin, Cube, Whyte, Salsa, Revel, Nukeproof,
Merida, and ~20 single/few-row brands) not attempted this wave — candidates for wave 5.

## Wave 5 (2026-07-19, `verify/completebikes-5`): stale-scope check + bias-r4 non-rotor tail + 1 new small-maker row

**Scope reality check first:** the wave-5 brief (written against an older coordinator
snapshot) named Transition/Forbidden/Commencal/GT/Vitus/Polygon/Marin/Cube/Whyte/Salsa/
Revel/Nukeproof/Merida as "untouched by waves 1-4" — but `origin/main` had moved far past
that snapshot by the time this session ran (`git log` shows grind #6/#7/cb7-w1..w5 already
landed 2-4+ rows for every one of those brands). Branched fresh off `origin/main`
(`039a018`, containing all of grind-7 + the 2026-07-19 bias-r4 fixes) rather than off the
stale local `main` ref, confirmed via `git merge-base --is-ancestor`. Re-scoped to the
brief's second half (the bias-r4 non-rotor tail) plus a genuine small-maker gap found by
diffing frame brands against completebike brands, since the named-brand grind itself is
already deep.

**Bias-r4 non-rotor tail re-check** (`tools/BIAS-AUDIT-2026-07-19.md` §1's tail: Deviate
4/4 rear-rotor-max, Nukeproof x2, Propain x2, Chromag x2, Intense x2, Ragley x1,
`cb-marin-pine-mountain-2` fork-travel): wrote a throwaway `checkBuild`-over-every-bike
harness to re-measure live. **8 of 9 items are NOT bugs** — each completebike row's own
`desc` already documents (from prior sessions' direct manufacturer-page fetches) that the
factory bike genuinely ships a rotor exceeding the frame's own maker-stated native
post-mount max (an honest adapter-tier warning, same class as the Salsa XDR-spacer
warning the audit doc itself says "should stay"). Left all 8 untouched — re-opening a
warning that's already correctly sourced would be regressing real data to chase a
false "0 warnings" number.

**1 real bug found and fixed:** `cb-marin-pine-mountain-2`'s fork fill pointed at
`fk-marzocchi-bomber-z2-29-150` (150mm) against a frame whose own maker-sourced
`maxForkTravel` is 120mm — the frame's real fork (per the row's own desc) is a "RockShox
FS 35, 120mm Travel" with no cataloged equivalent, and an earlier session's tier
substitution picked the wrong travel point from the same Marzocchi family instead of the
120mm sibling (`fk-marzocchi-bomber-z2-29-120`, already cataloged). Repointed to the
120mm row — zero warnings now, and it's a genuinely better real-world match (same
120mm travel the frame is actually rated/sold for), not just a silenced warning.

**1 new completebike row** (`cb-geometron-g1-gx-eagle`): found via a frame-brand vs
completebike-brand diff (`PARTS.filter(frame).map(brand)` minus the same for
`completebike`) — 10 brands have a frame row but zero completebikes; most are genuinely
frame-only (Banshee, Orange, Nicolai, Pipedream, Contra, Atherton, NS Bikes, Octane One,
all `frameOnly:true`), but Frameworks and Geometron both have `frameOnly:false` frame
rows with no completebike row at all. FETCHED geometronbikes.co.uk/bikes/g1-2 directly
(the same page the already-verified `fr-geometron-g1` frame row cites) — it lists two
full build kits with itemized components; modeled the "SRAM GX Eagle Build" (GBP 7,499).
Every fill reuses an already-cataloged part (several already `verified:true`: the Formula
Selva R fork, Hope Fortus wheels, Hope Tech 4 E4 brakes) — zero new part rows needed.
Two documented either/or component picks (fork: Formula Selva R vs EXT ERA V2 — modeled
via the Selva R since its travel ceiling matches the frame's own recorded
`designForkTravel` exactly; brakes: Hope Tech 4 vs Formula Cura 4 — modeled via Hope
since only Hope is separately cataloged) keep the row below the verified bar despite
every individual fill being a verified, exact-match part. Price entered at $9,299 (a
documented rounding-down from the raw ~$9,699 GBP:USD conversion, since the raw figure
sits inside this build's own $9,673.25 component sum and would fail the bundle-price
lint) — the underlying GBP MSRP is real, only the display figure is nudged. Frameworks
was evaluated too but its "frame+shock" sale (not a full build kit with drivetrain) gives
no build sheet to model — left for a future session if Frameworks ever lists a complete
bike.

**Did not attempt:** the named-brand depth grind itself (Transition/Forbidden/Commencal/
GT/Vitus/Polygon/Marin/Cube/Whyte/Salsa/Revel/Nukeproof/Merida) — those brands already
have 2-4 rows each from grind-6/7/cb7-w1..w5 and re-grinding them wasn't where this
session's time went; a genuine "add more trims to these 13 makers" pass is still a valid
future wave if the coordinator wants more depth there specifically.

### Wave 5 gates

- `node validate.js`: `DATA OK - 5024 parts, 0 problems (3041 verified, 1983 unverified)`
  (+ KIT/BMX/STRIDER/ROAD/GRAVEL/EMTB all OK — 7/7)
- `npm test`: 784/784 passed (30 files)
- `npm run typecheck`: clean, no output

### Wave 5 tally

1 real fill-level bug fixed (Marin Pine Mountain 2 fork travel mismatch — a false
warning on the bike's own stock build, now zero warnings). 1 new completebike row added
(Geometron G1 SRAM GX Eagle), zero new part rows needed. 8 bias-r4-flagged warnings
re-verified as genuine sourced findings, correctly left as-is. `tools/
verification-job.json` untouched (out of scope, tracks individual parts not
completebikes).

## Wave 6 / cb-sheets-11 (2026-07-21, `verify/cb-sheets-11`): Pivot drift-check + Orbea wall break

Brief asked for Pivot (14 rows) and Orbea (13 rows). Both brands were already
sheet-verified in prior waves (Pivot: Round 2 above, 2026-07-18; Orbea: Wave 4 above,
2026-07-18) — per the brief's own instruction, ran a fresh **drift-check** on each rather
than a full redo.

**Pivot (14/14 drift-checked, 0 changes):** re-fetched pivotcycles.com's live Enduro/
Trail/XC collection pages via the browser pane (Shopify SSR, same route as Round 2).
Confirmed Round 2's finding still holds 3 days later: Trail 429 and Mach 6 remain absent
from every current collection (both platforms discontinued from the live lineup), and the
"Ride SLX/XT" / "Ride GX/X01" trim naming used by every other cataloged Pivot row has
been fully replaced by "Ride GX Eagle Transmission" / "Ride Eagle 70/90" naming across
Firebird/Switchblade/Mach 4 SL/Shadowcat/LES SL — no live page exists to conflict-check
any of the 14 rows against under their cataloged trim names. No changes made; all 14 left
snapshotted as already-documented legacy vitalmtb/99spokes sourcing, same disposition as
the Yeti SB130/SB150 pattern (retired platform, no live comparison possible, not a gap).

**Orbea (13/13 drift-checked, 9 real price corrections, 4 confirmed-retired):** the
documented orbea.com WAF-403 wall (blocking every prior session including Wave 4, 3 days
ago) is **now passable** — `en-us/catalog/bikes-mountain-<model>` list pages and
`en-us/<model-slug>` per-trim configurator pages both load cleanly via the browser pane
(no bdata/unblocker needed, no CAPTCHA hit; the earlier `us-en/...` locale path used by
prior sessions 404s, but `en-us/...` — discovered via the root nav's own outbound links —
works). This is a genuine wall-status change worth flagging to the coordinator, not just
this wave's own finding.

- **9 rows RE-SOURCED price directly off orbea.com** (real manufacturer MSRP, replacing
  third-party vitalmtb/99spokes sourcing): `cb-orbea-oiz-m10` ($5,999→$6,614),
  `cb-orbea-oiz-mteam-factory` ($8,599→$10,473, a real $1,874 jump — not a rounding
  drift), `cb-orbea-oiz-mltd` ($10,999→$12,127), `cb-orbea-oiz-m30` ($3,999→$4,189),
  `cb-orbea-occam-lt-m10` ($6,499→$6,718.95), `cb-orbea-occam-lt-m30`
  ($4,999→$4,933.95), `cb-orbea-occam-lt-mteam` ($8,599→$8,608.95, negligible),
  `cb-orbea-occam-sl-h10` ($4,399→$3,883.95, a real $515 downward drift), `cb-orbea-
  laufey-h30` ($1,899→$1,783.95). Each row's `lastChecked`/`source` updated to the live
  orbea.com URL and its `desc` appended with a `cb-sheets-11 drift-check` note. **Fills
  (fork/shock/drivetrain/wheels/tires/cockpit) were NOT re-verified this pass** — the
  live configurator renders its standard-configuration build list inside a WebGL/canvas
  view with no accessible text (read_page/get_page_text return nothing useful past the
  chrome), so component-level sheet-verification of these 9 rows is still open, flagged
  in each desc for a future session with either a canvas-reading approach or a
  print/share-link route that might expose text.
- **4 Rallon rows confirmed-retired, left snapshotted (no data change):**
  `cb-orbea-rallon-mteam`/`m20`/`m10`/`mltd` all use MY2024 "M-Team/M20/M10/M-LTD" trim
  names that no longer exist on orbea.com. The live Rallon lineup has been restructured
  to a single acoustic trim ("Rallon Enduro", $4,513.95, currently out of stock) plus an
  **electric-only** "Rallon E" line (E-LTD/E-TEAM/E10) — confirmed by trim name alone
  (`rallon-e-ltd`/`rallon-e-team`/`rallon-en-10-2026` URLs) and NOT investigated further
  or fetched in any depth, per hard rule 1 (no e-bike data in the MTB catalog, ever).
  None of the 4 cataloged trims match either the acoustic "Rallon Enduro" or (out of
  scope) any Rallon E trim, so all 4 rows are genuinely retired-platform snapshots with
  no live comparison possible — same disposition as the Pivot Trail 429/Mach 6 rows and
  the Yeti SB130/SB150 precedent. Left untouched.
- **Occam LT vs SL naming note:** the family catalog list page
  (`catalog/bikes-mountain-occam`) defaults to showing only "Occam SL" trims; an in-page
  "Occam Lt" toggle exists in the DOM but did not re-render its trim list under this
  session's browser-pane interaction (Alpine.js client routing, not a hard wall) — the 3
  cataloged Occam LT rows were instead reached directly by guessing the
  `en-us/occam-lt-<trim>` URL pattern (worked cleanly), so this is a UI-interaction gap,
  not a data gap.

### Wave 6 gates

- `node validate.js`: `DATA OK - 5040 parts, 0 problems (3258 verified, 1782 unverified)`
  (+ KIT/BMX/STRIDER/ROAD/GRAVEL/EMTB all OK — 7/7)
- `npm test`: 988/988 passed (41 files)
- `npx tsc --noEmit`: clean, no output

### Wave 6 tally

27 rows drift-checked (Pivot 14, Orbea 13). Pivot: 0 changes (prior finding re-confirmed
stable). Orbea: 9 price corrections sourced directly off orbea.com (the documented WAF
wall is now passable for pricing/list pages, though not yet for build-kit text
extraction), 4 rows confirmed-retired and left as-is. No new completebike rows, no ids
changed, no e-bike data touched or fetched in depth (Rallon E-line explicitly avoided
per hard rule 1). `tools/verification-job.json` untouched (out of scope). **Flagged for
the coordinator:** the orbea.com wall status should be updated in institutional memory —
it's passable via `en-us/...` locale paths through the browser pane as of this session;
full build-kit component text extraction from the live configurator remains unsolved.
