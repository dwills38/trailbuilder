# Manufacturer-Bias Audit — 2026-07-17 (Round 3; post complete-bikes doubling + new filter/facet/tire-class surfaces)

_Read-only audit of `origin/main` @ `a0a4c99` (**5,025 parts / 2,675 verified**; was 3,763/2,457 at Round 2).
Successor to `tools/BIAS-AUDIT-2026-07-16.md` ("the -07-16 audit" / "Round 2"). Run per Douglas's standing
guardrail: periodic audits that the engine, catalog and UI favor NO manufacturer. Every remedy is ADD-real-data,
add-a-map, add-UI, or fix-a-rule — **nothing removes a real part or a filter**. Six dimensions fanned out to
sub-agents; every load-bearing number below was re-measured by `require()`-ing `src/compat.js` and running the
real `checkBuild` — counts drift, re-measure before acting._

## Verdict: **ACTION-NEEDED** — 2 HIGH, 4 MEDIUM(-HIGH); still NO evidence of favoritism anywhere

The headline is genuinely good news wrapped around two real defects:

- **Both of Round 2's HIGH findings are resolved.** #1 (`streetPrice` auto-promoting whichever bike a sale
  was recorded for) is **FIXED** and I could not find a path that reintroduces it. #2 (rule 14b as a
  "RockShox-only penalty") is **DISPROVED on measurement** — it was an inference from *coverage* that doesn't
  survive checking the *values*.
- **The +1,262-part / +322-bike grind improved almost every composition metric it touched** — top-maker share
  fell 9.6% → 7.6%, the entry price band nearly doubled (13.2% → 23.4%), full-ladder makers went 3 → 18, XC and
  DH climbed, hardtails landed (92 bikes). Growth broadened the catalog rather than deepening any skew.
- **Affiliate isolation still holds catalog-wide: 0 of 5,025 parts carry `retailerLinks` or `image`.**

The two HIGH findings that remain are: **#1 a correctness bug with a brand attached** — three real I.S.-mount
frames (2 Cotic, 1 Banshee) are now in the catalog and **100% unbuildable**, the engine emitting a false
"won't fit"; and **#2 the verified-badge semantic bug from Round 2, unfixed and now worse in scale** — it still
blanks the landing view, and its latent bias tail grew from 36 to 155 bikes.

**Split:** #1 (IS mount), #3 (tire chips), #5 (fork-travel slider basis), #6 (save badge), and the LOW copy/doc
items are **EDITORIAL** (our choices — fixable now). #2 is a **SEMANTIC BUG** with a bias tail. #4 (engine
dormancy honesty), #7 (Specialized/Trek verification) are **STRUCTURAL** (fetch-walls / what makers publish).

**Suggested queue:** #1 IS-mount adapter tier (correctness — a real red on real frames) → #4(e) the one-line
"green may mean no data" UI disclosure (cheapest honesty win; converts every dormancy finding from silent to
disclosed) → #2 completebike badge semantics (unchanged 2 audits, blast radius 4×) → #3 tire-chip convention
fix (one line, half-shared with the mapping) → #6 save-badge sanity cap → rest opportunistic.

---

## 1. HIGH · NEW · CORRECTNESS + EDITORIAL — I.S.-mount frames are **100% unbuildable**: 0 of 104 calipers produce a clean build, and the engine emits a false "won't fit"

The new `IS` brake-mount vocab value (added since Round 2) did what Round 2's frame-expansion note wanted: it
unblocked the Cotic frames that a missing vocab value had kept out of the catalog. But **the catalog gained IS
frames without gaining a single IS caliper or IS→post-mount adapter.** Rule 8 is a pure exact-match, so every
one of the 104 catalog calipers hard-errors against them.

**Measured** (`checkBuild({frame, rearBrake})` over all 104 catalog brakes):

| Frame | mount | calipers CLEAN | calipers ERROR |
|---|---|---|---|
| **Cotic BFe** (`fr-cotic-bfe`) | IS | **0** | **104** |
| **Cotic Jeht** (`fr-cotic-jeht`) | IS | **0** | **104** |
| **Banshee Paradox** (`fr-banshee-paradox`) | IS | **0** | **104** |
| _(any post-mount frame, e.g. Santa Cruz Megatower)_ | PM | 100 | 4 |

Catalog mount distribution: **frames `{PM, FM, IS:3}`, forks `{PM}`, brakes `{PM:100, FM:4}` — zero IS
calipers.** The verdict text on a Cotic BFe + any brake reads:

> `[rear-brake-mount] Rear brake mount mismatch: Brake is Post mount but Frame is IS.`

**Why this is worse than a missing rule.** The project's own stated bar (CLAUDE.md, "Coverage roadmap") is
that *"a false 'won't fit' OR a false 'fits' is worse than a missing rule."* This is a false "won't fit" on
three real frames: an I.S. frame absolutely does accept a post-mount caliper — via the universal, in-the-box
I.S.→post-mount adapter that every I.S. frame has always used. The engine is asserting something factually
untrue, and it does so on the two brands (Cotic, Banshee) that use the older standard. Adding the vocab value
converted "Cotic BFe is absent" into "Cotic BFe is present and completely broken," which is worse for the rider
and worse for the brand.

**STRUCTURAL vs EDITORIAL: EDITORIAL.** Nobody is fetch-walled — IS→PM adapters are universal, cheap, and
documented. The engine already has the exact tier for this: rule 9 treats 6-bolt-rotor-on-Center-Lock-hub as a
**warning carrying a structured `fix`** (`{kind:'adapter', name:'Shimano SM-RTAD05'}`).

**Recommendation (ADD-DATA + rule tier, never remove):** make a post-mount caliper on an IS frame a **warning
with a structured `fix`**, e.g. `{kind:'adapter', name:'I.S.-to-post-mount adapter (e.g. Shimano
SM-MA-F160P/S)'}`, cited to a maker adapter page — mirroring rule 9. Direction matters: PM caliper on IS frame
= adapter warning; the reverse has no adapter and stays an error. Optionally add a couple of IS→PM adapter rows.
This makes the three frames buildable and keeps the check honest.

---

## 2. HIGH · UNCHANGED + WORSE · SEMANTIC BUG (widening bias tail) — "✓ Verified only" still blanks the landing view: **0 of 436** bikes pass, and the would-vanish set grew **36 → 155 bikes**

This is Round 2's finding #3, **unchanged in mechanism and materially worse in scale.** `partVerified`
(`src/compat.js:21131-21138` — the function moved since Round 2 cited ~12008; the logic did not) still takes
the **kit branch** for any row with `fills`, requiring **every** fill part verified — unreachable for a ~22-slot
bike. Line `:21137` (`return p.verified === true`) is never reached for a completebike.

| Metric | Round 2 (114 bikes) | Now (436) | Δ |
|---|---|---|---|
| Complete bikes passing `partVerified()` | **0 (0%)** | **0 (0%)** | unchanged mechanism |
| Rows carrying own `verified:true` (build sheet fetched) | 58 | **134** | +76 rows rendering `≈ estimate` |
| Mean fill-verified rate | 59.5% | 56.9% | flat |
| Bikes reaching 100% fills | 0 | **0** | unreachable |

So **toggling "✓ Verified only" on the Complete Bikes landing view still yields zero cards** and the empty
state, and **all 436 render `≈ estimate`** — including the 134 rows with a fetched factory build sheet and
price. The top blocking slots are the OE house-brand tail exactly as Round 2 predicted (stem blocks 81%,
frontWheel 73%, rearWheel 75%, grips 64%) — slots no bike will ever get a maker spec page for.

**The bias tail — why this is in a bias audit — grew.** On a naive "fix" that switches the badge to the row
flag `p.verified`:

| | Round 2 | Now |
|---|---|---|
| Makers vanishing entirely from the verified view | 14 (**36 bikes**) | **26 (155 bikes, 35.6% of the landing view)** |
| Largest maker in the verified view | Santa Cruz 15.5% | Santa Cruz **9.0%** |

The 26 would-vanish makers: Specialized 0/32, Trek 0/21, Yeti 0/20, Pivot 0/14, Orbea 0/13, Cannondale 0/7,
Nukeproof 0/6, Chromag/Rocky Mountain 0/5, and 17 more. **Two nuances change the fix from Round 2:**

- **The Santa-Cruz-dominance sub-claim IMPROVED** (15.5% → 9.0%, ≈ its 7.6% row share) — the verified view's
  top is now a flat spread, not a single-maker takeover. Good.
- **The vanishing set is no longer "the fetch-walled set."** Yeti is **9/9 (100%) verified on frames** but
  **0/20 on complete bikes**; RAAW 7/7 frames, 0/2 bikes. Those are **grind-order artifacts, not walls** — pure
  add-data, no tooling needed. Only Specialized/Trek/Cannondale are genuinely wall-bound (#7).

**Recommendation (UI — unchanged from Round 2, now more urgent):** give completebike its own **"✓ Build sheet
verified"** badge (row `verified:true && source`), point the "✓ Verified only" filter at the same predicate,
ship it with a UI note that the filter reflects *what makers publish and what we've checked, not quality*, and
add a test (no test covers the completebike case today). Then a **Yeti/RAAW/Pivot/Orbea completebike build-sheet
wave** — those frames already verify, so it's pure grind and cuts the would-vanish set fastest per unit effort.

---

## 3. MEDIUM-HIGH · EDITORIAL — the new tire compound/casing CLASS chips make **unmapped == invisible**: Maxxis 96–97% visible, five rival brands at 100% loss

Two independent sub-agents (tire-mapping and filter-surface) converged on this with matching numbers, and I
reproduced it a third time. `src/tire-classes.js` maps brand-native `compound`/`casing` SKU values to
rider-facing classes. The shipped chip predicate (`index.html:1858`, `:1863`) is
`classifyTireCompound(p.compound)===v`, which returns for an **unmapped or absent** value `null`, so the tire
matches **no** chip and disappears until the chip resets to "All". This is a deliberate departure from
index.html's SUBFILTERS convention (where a part lacking an axis passes every chip) — and it's the only two
chip rows that break that convention.

**Measured — a rider engaging any compound chip deletes 96 of 369 tires (26.0%); any casing chip 103 (27.9%):**

| Brand | rows | vanish on compound chip | vanish on casing chip |
|---|---|---|---|
| **Maxxis** | 107 | **4 (3.7%)** | **3 (2.8%)** |
| Schwalbe | 38 | 5 (13%) | 5 (13%) |
| Specialized | 15 | 0 | 0 |
| **Vittoria** | 23 | **18 (78%)** | 0 |
| **Bontrager** | 17 | 4 (24%) | **17 (100%)** |
| **Hutchinson** | 16 | 6 (38%) | **16 (100%)** |
| **Kenda** | 15 | **15 (100%)** | 8 (53%) |
| **Panaracer** | 15 | **15 (100%)** | **15 (100%)** |
| **WTB** | 14 | **13 (93%)** | 10 (71%) |
| **CST** | 5 | 1 | **5 (100%)** |

**The core hypothesis — "Maxxis wins because we favored Maxxis" — is DISPROVED.** Maxxis is 96–97% visible
because it publishes a clean 4-rung compound ladder and a clean 4-rung casing ladder; **every rival that also
publishes a clean ladder scores identically** — Specialized, Onza, Pirelli, e*thirteen, Goodyear, and Vittoria
(casing) are all at 0% loss. The brands that vanish do so because their SKU values genuinely are *construction
descriptors* (`tritec` is WTB's one unqualified compound name; `dtc`/`dual-layer` are two-durometer
constructions; `triple-compound`/`4c-graphene`/`bi-compound` are compound-*count* descriptors;
`hardskin`/`sideskin` are a reinforcement-coverage axis). Mapping those would invent a claim the maker didn't
make — the project's "a missing map beats a wrong map" bar, and it's structurally sound.

**But it doesn't land evenly, and three editorial defects sit inside the structural result:**

**(3a) Schwalbe's DH-tier casing is invisible on the DH chip — the one measured chip-level distortion.**
`bikepark` (Schwalbe Magic Mary + Big Betty) is unmapped *and* absent from the file's own documented-unmapped
list — despite `src/schema.js:326` carrying a **directly-fetched** schwalbetires.com note calling it *"the
wire-bead DH/bike-park casing tier."* That meets the mapping file's own stated bar ("an existing sourced
schema.js provenance comment states the class unambiguously"); it fell through a gap between the Gravity rule
and the literal-DH rule rather than being judged. Result: **Maxxis holds 52% of the DH chip (14 of 27) on a 29%
catalog share**, and Schwalbe's only two true DH-casing rows are the excluded ones. **Fix:** map
`'bikepark':'dh'`, document it, pin it in `test/test-tire-classes.js`. _Do this one first — it's the only
editorial chip-level distortion with a measured effect._

**(3b) Terrene `tough` → enduro but WTB `tcs-tough` → unmapped, on identical evidence.** Both are "the
reinforced rung of a two-rung lineup, described by construction with no discipline word." Terrene's 4 rows got
the Enduro chip; WTB's 3 rows got invisibility — landing on WTB, already the worst-hit brand. **Fix:** pick one
rule and apply to both (the consistent call is to unmap `tough`; if Douglas prefers coverage, map both).

**(3c) The absent-field rows (61 total) are dropped by a rationale that only argues the present-but-unmapped
case.** The header justifies dropping a value that "DOES exist, we just won't guess"; for an *absent* value
there's nothing to refuse to guess about, and the rest of index.html's SUBFILTERS passes absent-axis parts.
Michelin loses 7 of 9 casing rows purely to absence. **Fix:** either extend the pass-through
(`|| p.compound==null`) to match every sibling filter, or document the absent case as a deliberate second rule.

Also latent (0 rows today, so no live effect): `agc` (Kenda) and `gravity-core` (Vee) are Gravity-named, in the
vocab, and unmapped/undocumented — traps for the next row. And one data error: `ti-wtb-vigilante-...-gripton`
carries Specialized's `gripton-t7` compound (WTB makes TriTec, not Gripton) — it's WTB's *only* mapped compound
row, via a rival's ladder. **Confirmed CLEAN:** the class fields do **not** feed `checkBuild` (grep clean).

---

## 4. MEDIUM · STRUCTURAL (honesty gap) — engine dormancy is real but **undisclosed**: a green dot can mean "this maker published nothing," and nothing on the page says so

This reframes Round 2's #2/#5. The rules are architecturally right (a missing rule beats a wrong one), and the
tiering is faithful (C5 holds — see Clean). The problem is that **the dormancy is invisible to the rider.**

**(4a) Round 2's #2 "RockShox penalty" is DISPROVED — the asymmetry inverted, and shrank.** Fork `maxTire`
coverage is uneven (RockShox 109/145, Fox 5/70), but coverage was the wrong proxy: **all 67 RockShox enduro
forks publish `maxTire: 3.19"`, and the widest tire in the entire catalog is 2.8"** — so they are *structurally
incapable* of firing rule 14b. The Round 2 flagship scenario is dead:

```
Lyrik Ultimate 160 (maxTire 3.19) + Maxxis Minion DHF 2.6  → GREEN (0 warn / 0 err)
Fox 36 (maxTire absent)           + same tire              → GREEN
```

Normalized warning **rate** (raw counts mislead across different row counts): **Cane Creek 8.0%, Fox 1.6%,
RockShox 1.4%.** The duopoly is even; the real outlier is now Cane Creek (its Helm genuinely publishes a tight
2.52"), a boutique brand least able to absorb it — and it's a *true* warning, not a wrong one. Still STRUCTURAL;
the remedy is the same Fox `maxTire` grind, now justified by Cane Creek, not by a false RockShox claim.

**(4b) The structural remainder is NOT honestly labeled.** Of 233 forks missing `maxTire`, only **21 (9%)**
carry a `desc` explaining the absence; **212 (91%) are silent.** Where it *is* documented (some Fox 36/38 rows)
it's exemplary — the convention works, it just never became policy. A reviewer or future worker cannot tell "we
checked, the maker publishes nothing" from "nobody looked yet."

**(4c) Rule 12's ERROR tier is reachable by only 6 boutique brands.** `forkTravelHard:true` is on **15/329
frames** (Ibis 6, Santa Cruz 4, Knolly 2, Forbidden 1, Cotic 1, Nicolai 1). An over-/under-forked build on a
Trek (0/21), Specialized (0/17), Canyon (0/13) or Giant (0/13) can only ever raise a soft warning, while the
same abuse on an Ibis raises a hard red. The *tier* is faithful (Santa Cruz appears on both error and warning
sides — it tracks the maker's wording), but the whole ladder is only available to the makers who published a
range. STRUCTURAL, with an editorial `designForkTravel` tail.

**(4d) `minRotorF` — SR Suntour still 0/19, and Giant joined the 0% club (0/4).** Rule 10's error rate over
fork×rotor pairs: RockShox 35.0%, Fox 36.4% … **SR Suntour 0.0%, Giant 0.0%.** An SR Suntour or Giant fork
greens on a 140 rotor where every rival reds — on an *error*-tier rule. The gap widened in absolute terms
(11 → 19 SR Suntour rows) and gained a brand exactly as the +parts arrived.

**(4e) THE HIGHEST-LEVERAGE CHEAP FIX — no UI disclosure exists that a green dot may mean "no data."**
Measured across `index.html`: zero. CLAUDE.md itself says the all-clear "means no conflict among the dimensions
we check, not a guarantee" — but that reasoning lives only in the repo, never on the page. A rider
cross-shopping Cane Creek (yellow) vs Fox (green) can only read it as "the Fox has more clearance"; the opposite
may be true. **Recommendation (ADD-UI, respects the no-popups rule — hover/detail only):** (1) where a rule is
dormant on the picked part for want of data, extend the green dot's existing `reason` string — *"No conflicts
found. Note: this fork's maker publishes no tire-clearance figure, so that check is skipped."* (2) one clause in
the About paragraph. (3) add the absence-`desc` convention to `tools/DATA-ENTRY-TEMPLATE.md` so the 91% silence
stops growing. This single fix converts every dormancy finding in this audit from a silent distortion into a
disclosed limitation.

---

## 5. MEDIUM · EDITORIAL — the `frameForkTravelRange` slider mixes two measurements per row, decided by our grind depth

`frameForkTravelOf` (`src/facets.js:91-95`) prefers sourced `designForkTravel`, falling back to
`maxForkTravel`. Both branches return a real number, so coverage is 100% and nothing is dropped — but the axis
**silently mixes two different specs**: `designForkTravel` sits a mean 13.1 mm *below* `maxForkTravel` on the 87
frames where they differ. So a frame's slider position depends on whether *we* fetched its design figure.
**87 of 329 frames (26.4%) occupy a different slider bucket than they would on one uniform basis** — and the
0%-`designForkTravel` set (Norco, Nukeproof, Kona, Orbea, Cannondale, Intense, Specialized 6%) is the
known fetch-walled cohort from #7. Crucially the harm has **no fixed direction** (sourced frames move *down*,
gaining some windows and losing others), so nobody is systematically penalized — the defect is that two
mechanically identical frames land in different buckets for a data reason.

**Recommendation (ADD-UI + ADD-DATA):** the slider already supports a `note:` (used by `frameRearTravelRange`,
`index.html:1955`) — add *"maker's design travel where published, otherwise the rated max."* Then backfill
`designForkTravel` on the walled brands (the #7 wave). Do **not** collapse to a uniform `maxForkTravel` basis —
that discards 174 rows of true sourced data.

---

## 6. MEDIUM · NEW · EDITORIAL — the "save" badge fires on **435 of 436 bikes (99.8%)** and reaches **+174%**; its magnitude is a catalog artifact that flatters cheap/DTC brands

Independent of the (fixed) `streetPrice` issue: the `save = partsTotal − MSRP` badge is near-universal
wallpaper, and its size is driven by à-la-carte aftermarket MSRP vs OEM volume pricing, not by the bike.
Mean save% by band: entry 69%, mid 47%, flagship 24%. Per-maker mean spans **13×**: Privateer 174% ("save
$4,506" on a $2,589 bike), Rose 121%, Chromag 102% … Pivot 11%, Ragley 9%, Cotic 1%. A savings claim exceeding
the bike's own price isn't credible, and the skew systematically flatters cheap and direct-to-consumer brands on
the landing view — again, with nobody choosing it.

**Hypothesis DISPROVED:** it is *not* driven by fill-cataloging depth — `corr(save%, fillVerifiedRate) = −0.07`,
`corr(save%, fillCount) = −0.16`, both negligible; fill counts are tightly banded (19–23). The driver is the
price-band arithmetic, not cataloging.

**Recommendation (UI + copy, no data removed):** suppress or reframe the badge above a sanity threshold
(e.g. save > 60% of MSRP), add hover copy stating the parts total is à-la-carte MSRP for individually-bought
components (so a factory build is *expected* to cost less), and consider showing save% alongside `$` so a
$4,506-on-$2,589 figure reads as the artifact it is.

---

## 7. MEDIUM-HIGH · STRUCTURAL — Specialized frames **0/17** and Trek **1/21** verified; unmoved, and both grew

The two biggest mainstream brands added rows without adding provenance: Specialized frames 0/11 → **0/17**,
Trek 0/7 → **1/21**, while every other top-count brand moved (Yeti 9/9, Transition 10/11, Ibis 7/7, Polygon
8/8, Santa Cruz 10/14). This compounds with #2 (Specialized and Trek are the #2/#3 most-shown makers on the
landing view and 0% verified — 53 of the 155 would-vanish bikes) and with #4c/#5 (both worst on
`designForkTravel` too). **Two Round 2 assumptions corrected:** "Specialized is uniquely worst on
designForkTravel" is now stale (Norco/Nukeproof/Kona/Orbea/Cannondale/Intense are all 0%); "Giant/Scott are
walled" is confirmed stale (Giant frames 6/13, Scott 4/8 — both publish). Yeti's 100%-frames/0%-bikes split
proves the wall map and the grind map are different maps: **re-test, don't assume.**

**Recommendation:** the standing **web-unblocker connector gap** (Bright Data / Tavily / Exa — Douglas's
notify-missing-tools order) remains the concrete route to Specialized/Trek/Cannondale interfaces. Separately and
cheaply: the completebike build-sheet wave from #2.

---

## LOW findings (opportunistic; ranked)

- **L1 · Doc drift actively invites the #1 regression.** Four authoritative docs still describe the *pre-fix*
  `streetPrice`-as-headline behavior: `src/schema.js:661-662` and `:862`, `src/types.js:173`,
  `COMPLETE-BIKES-SCOPE.md` decision #3. A worker reading `schema.js` ("single source of truth") would
  reimplement the bug in good faith, and the tests guard `pricing.js`, not a new call site. **Fix:** update all
  four to the shipped ruling, cross-referencing `src/pricing.js`.
- **L2 · `streetPriceDate` still absent; the no-op row remains.** Round 2 defect (c) is open — no staleness
  field, `streetPrice` grew 6 → 16 rows, no entry policy in the template; a stale sale displays indefinitely
  (now less severe since it no longer drives ranking). Defect (d): `cb-scott-ransom-900-rc` still has
  `streetPrice === price`, now rendering "$8,499.99 (Sale $8,499.99)" — more conspicuous post-fix. **Fix:** a
  schema cross-rule rejecting `streetPrice === price`, and either add `streetPriceDate` or document that MSRP is
  the one durable basis.
- **L3 · `BB_FAMILY` is the one hand-enumerated map, and it omits `PF3083`** (`src/facets.js:25`). Cannondale's
  only BB (a pressfit shell) is unreachable via the "Pressfit" chip — it mints its own `PF3083` bucket. 1 row,
  but 100% of Cannondale's BB presence. **Fix:** add `PF3083:'pressfit'` + a test asserting every `bb.shell`
  vocab value has a `BB_FAMILY` entry.
- **L4 · `leverAccepts` (rule 19): Magura 0/10 and Hope 0/6 are whole-brand zeros.** Rule 19 can never fire for
  either, so a Magura lever silently accepts any shifter clamp — despite Magura shipping Shiftmix. Low (rule 19
  is largely dormant catalog-wide). **Fix:** a `leverAccepts` pass on Magura/Hope.
- **L5 · Sample generator's frame concentration relocated and worsened: top brand 6.6% → 10.5%, now Trek** (top
  in 5 of 8 themes; xc theme Trek 22.5%). The generator is still brand-neutral (sampled share tracks the
  eligible pool — no brand string anywhere); the cause is the price-band filter × catalog depth (Trek frames
  grew 7 → 21, heavily into cheap XC/hardtails). The irony: it most-shows the least-verifiable brand.
  **Fix:** deepen the thin XC (46) and hardtail (83) frame pools — pure grind; it dissolved the DH concentration
  the same way (21.7% → 12.1%).
- **L6 · One maker-marketing superlative reappeared** — `cb-marin-rift-zone-2` desc: "Marin's most popular,
  best-reviewed trail platform" (`src/compat.js:15755`). Round 2's #9 (the kit.js Yeti "best-selling" line) is
  **resolved** (0 hits in kit.js now), but the pattern moved to the bike catalog. Mitigating: complete-bike
  descs are **not** user-visible (gated on `!p.fills` at `index.html:3011`), so this is a data-hygiene note, not
  a live surface. Still: it's the 2nd instance, so the "before the field becomes a marketing surface" warning is
  live. **Fix:** trim the clause; the spec facts stand alone.
- **L7 · Guide/chip tension.** The `tire-casings-compounds` guide correctly cautions against cross-brand casing
  equivalence using the *exact* example (Maxxis EXO+ vs Schwalbe Super Trail) the new "Trail" class chip now
  groups into one bucket. Not a bias finding (the guide's core claim — neither field feeds the checker — stays
  true, and the chips are an honest rider-facing approximation), but the guide should acknowledge the chips
  exist and are a coarse convenience, not a maker equivalence. **Fix:** one reconciling sentence.
- **L8 · Sub-brand policy undocumented but de-facto consistent.** Liv is its own maker (not folded into Giant) —
  and so is every other parent-owned sub-brand (Roval/Specialized, Bontrager/Trek, Syncros/Scott, OQUO/Orbea).
  Round 2's implied inconsistency is **DISPROVED** (zero folded sub-brands catalog-wide). The one gap is
  **Juliana at 0 rows** while its peer Liv is present and Santa Cruz is the top maker — grind order, not bias.
  **Fix:** write the de-facto rule into `DATA-ENTRY-TEMPLATE.md`; enter Juliana opportunistically.
- **L9 · Wheel `minTire` (rule 14c) grew brand-at-a-time again** — HUNT arrived at 100% (2/2) while 18 brands
  and 494 wheels stay at 0; the rate nearly halved (7.7% → 4.0%) as the wheel catalog grew with no new coverage
  beyond HUNT. Low (93%+ silent = the baseline is silence). Watch: Hope fell 5→1 and Stans 4→0 in absolute
  `have` — possibly honest re-verification, worth a glance. **Fix:** prefer category-wide sweeps.
- **L10 · UDH retrofit tier (rule 4) — WATCH-ITEM exposure doubled.** Still RAAW-only (`udhRetrofitKit` on 2
  frames), but non-UDH frames that hard-error on a Transmission derailleur grew 72 → 142 across 53 brands.
  Correct today (RAAW genuinely sells a documented kit), but the trigger condition ("another maker ships one and
  it goes unsourced") is now twice as likely tripped and unchecked. **Fix:** a one-pass sweep of the top
  non-UDH brands + a line in the frame entry checklist.

---

## ✅ Confirmed FIXED / IMPROVED since Round 2

| Round 2 finding | Status | Evidence |
|---|---|---|
| **#1 `streetPrice` inflates headline + save + ranking** | **FIXED** | `index.html:2483`/`:2813` route through `window.completeBikeSaveBasis` (`src/pricing.js`); no computation/sort site reads `streetPrice` (grepped every `\|\|`/ternary/`!= null ?` form — zero substitutions survive); display and sort now agree; Pivot "Jenson Exclusive" moved from #11 → **#250 of 436** on the save ranking. Tested (`test/test-pricing-basis.js`, 9 passing). |
| **#2 rule 14b RockShox-only penalty** | **DISPROVED** | RockShox enduro forks publish 3.19" > the 2.8" widest catalog tire → structurally can't fire; normalized rate RockShox 1.4% ≈ Fox 1.6%; real outlier is Cane Creek 8.0% (a true warning). |
| **#7 `loadBad()` pins one brand as "the broken bike"** | **FIXED** | `index.html:4476` — uniform `Math.random()` over 10 frames / 10 distinct brands per click; Specialized 100% → 10%; each verified to still raise errors. _(Residual: the rest-of-build is still pinned — see note.)_ |
| **#6 trim-tier premium skew** | **IMPROVED** | entry band 13.2% → 23.4%; full-ladder makers 3 → 18; Santa Cruz 89%-flagship → 3/16/14. Flagship share identical (36.0%) — growth was entry-favorable. |
| **#10 discipline mix** | **IMPROVED** | XC 9.6% → 15.4%, DH 0.9% → 5.3%; hardtails landed (92 bikes / 31 makers). |
| **#9 kit marketing superlative** | **FIXED (moved)** | 0 hits in `kit.js`; one new instance in a non-visible bike desc (L6). |
| Top-maker concentration | **IMPROVED** | Specialized 9.6% → Santa Cruz 7.6%; makers 40 → 59; 0 of 436 missing `family`. |

**One residual on #7:** the demo's *frame* rotates but the rest of the broken build is permanently pinned
(always RockShox / Shimano XT / SRAM GX Transmission / Maxxis / Industry Nine). Round 2's own argument — being
paired with a wall of red is an asymmetry even when the part isn't at fault — applies to components too. LOW;
rotate the pinned components too, or add one line of copy noting the clashes come from the *combination*. The
shipped comment (`index.html:4472`) also overclaims "frame-independent" — 9 of 10 frames raise additional
frame-specific errors; correct it.

---

## Checked CLEAN (with the numbers, including disproved hypotheses)

- **C1 — Affiliate isolation holds catalog-wide.** 0 of 5,025 parts carry `retailerLinks` or `image` (incl. all
  436 completebikes, all KIT_PARTS). Neither field is read by `checkBuild`/`compatOf`/`buildTotals`; no sort
  ranks by monetizable-ness (`SORTS`/`ROW_SORTS` = random/name/price/weight only). The one retailer-named row
  (Pivot "Jenson Exclusive") is a pricing-basis matter (fixed), not a link leak.
- **C2 — Engine brand-neutrality HOLDS; zero new brand branches.** Every brand string literal in `checkBuild`
  is faithful standard-ownership (SRAM AXS-controller exemption gated on `electronic && sram-*`; T-Type/Flattop
  one-way; SM-RTAD05 still "e.g."-qualified; rotor rules pure numeric — no brand tolerance). `forkTravelHard`
  tier tracks source language (Santa Cruz on both sides). `coilApproved` 0/329 fully dormant.
- **C3 — Facets & sliders are the best-behaved surface audited.** All 9 range sliders pass null-valued parts and
  have 100% brand-even axis coverage; the `cb*Of` complete-bike facets impose **zero** data-depth penalty
  (0.0% null derivation across 436 bikes — they read schema-*required* fields). The brief's top hypothesis for
  that dimension (thin-OE-fill bikes vanish from facet chips) is **DISPROVED**. hardtail=0 convention holds
  83/83 with 0 false hardtails; `actuationOf` never guesses (no `'cable'` default). No facet feeds `checkBuild`
  (grep clean, structurally impossible via load order).
- **C4 — Filtered-view ordering is still the uniform Fisher-Yates shuffle** (Round 2 C2 fix holds at the
  filtered level): 3,000 shuffles of a filtered set show max deviation 0.24pp = Monte Carlo noise; no filter
  handler reshuffles; insertion index survives only as a tie backstop.
- **C5 — Guides, legal pages, forum CLEAN.** All 19 guides: zero endorsement/superlative; every brand mention
  factual standard-ownership; the Pivot Firebird appears only as the counter-example for the rejected chainline
  rule. `privacy.html`/`terms.html`/`affiliate-disclosure.html`: 0 brand hits; FTC disclosure present +
  `rel="sponsored"` in place though 0 affiliate links exist yet. `src/forum.js`: 0 brand mentions.
- **C6 — Desc tone is symmetric.** Across the top 12 brands by desc count (RockShox 582 … Giant 76), praise-word
  and criticism-word rates are ≈0 and even — descs read as spec data, not editorial. No brand gets enthusiasm a
  rival gets hedging.
- **C7 — Verified filter does NOT distort price tiers (re-DISPROVED on 436).** Median $5,199 (all) vs $4,994
  (verified); entry share *rises* 23.4% → 25.4%. It would hide makers (#2), not price tiers.
- **C8 — No maker floods via variant depth.** rows/family rose to 2.07 but every ≥4 family is a genuine
  price-differentiated trim ladder (max 6 rows, Ibis Ripmo); rows/family-*without*-price-differentiation ≈ 0.

---

_Read-only audit; no `src/`, `index.html`, or catalog file was modified. Branch `audit/bias-2026-07-17`,
presented for review, not pushed to `main`. Deliberately untouched anything the live verification session
(verify/fanout-1 lane) is grinding. Counts drift with every catalog commit — re-measure before acting on a
number here._
