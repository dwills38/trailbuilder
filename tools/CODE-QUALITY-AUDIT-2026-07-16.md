# Code-Quality & Efficiency Audit — 2026-07-16

**Scope:** the post-wave recurring audit (Douglas's standing order: run these after big feature waves).
**Trigger:** 64 commits since 2026-07-14 — grind-3/4/5 + salvage catalog merges, the Kit Builder rework,
the MSRP pricing fix (`aa0c08c`), the range-slider feature plus two revisions (`1999070`, `738c074`,
`d606710`), Cloudflare analytics (`48a1cfa`, `43c701e`), and the legal topo-header unification (`b07efa1`).
**Branch:** `audit/code-quality-2026-07-16`, based on `44688e2`. **READ-ONLY** — no `src/` file was modified.
**Method:** five parallel sub-agents (Opus on the engine, Sonnet elsewhere); **every CRITICAL/HIGH claim was
re-verified by the coordinator against running code before inclusion.** Three agent findings were
downgraded and one was re-framed on that evidence — see "Calibration" at the end.

**Catalog scale at audit time:** 4,060 bike parts + 713 kit rows. Shocks 823, forks 378, tires 328,
rear wheels 333, droppers 294, frames 219, completebikes 198.

### Gate results (coordinator-run, reproduced independently of the sub-agent)

| Gate | Result |
|---|---|
| `node validate.js` | **GREEN** — `DATA OK - 4060 parts, 0 problems (2511 verified, 1549 unverified).` / `KIT OK - 713 kit parts, 0 problems (289 verified, 424 unverified).` |
| `npm test` | **GREEN** — `Test Files 19 passed (19)`, `Tests 603 passed (603)`, 7.51 s |
| `npm run typecheck` | **GREEN** — `tsc --noEmit`, exit 0, zero output |

**No test is skipped, weakened, or disabled.** No `.skip`/`.todo`/`.only`/`xit`, no commented-out test, no
tautological assertion, no assertion-swallowing `try/catch` anywhere in `test/` (the two `try{` blocks —
`test-invariants.js:211-217`, `test-bmx-engine.js:39-41` — are legitimate assert-the-thrown-message patterns).
**The golden rule is being honoured.**

### Scope limitation — read this before trusting a line number

The report is pinned to **`44688e2`**. `origin/main` advanced **twice during the audit** (a live repo with
other sessions working): first `44688e2` (docs), then `9a58087` + `3e787ea`. The branch was **deliberately
not rebased** past `44688e2` — every finding below is line-anchored, and pulling an `index.html` change in
mid-write-up would silently invalidate those anchors.

**Consequence:** `9a58087` ("relabel frame rear travel, add frame rear-travel slider, fix per-size JSON dump")
introduces `formatSizes()` — the **per-size rendering** that was item (c) of this audit's brief. It does not
exist in this tree (`grep -c formatSizes index.html` → 0) and therefore **was not audited**. See **U-1**.

---

## Verdict

**One CRITICAL, reproduced and live.** The engine silently returns a false all-clear for any build using
the build-your-own-wheel slots (hub/rim) with only one half picked — and all 49 hub/rim rows dot green
against every build. This is the exact failure the code's own comment calls *"the one verdict this product
must never give."* Everything else is healthy.

**The scale question is answered: there is no cliff and no O(n²) in the engine.** `checkBuild` is O(1) in
catalog size (1.39 µs/call); rendering the largest category costs ~6 ms. The catalog can grow 10× without
the engine noticing. The one real O(n²) is in `lintCatalog` (dev/CI only, never user-facing).

**The `e22189a` question is closed: superseded, nothing to merge.** Both of its changes landed in main
independently — the `byId` index via `0655198`, the `_slotByKey` memo via `7f80ae6`.

**No standing-rule violations.** No pop-ups, no e-bikes, no committed secrets. The one CDN load is the
Cloudflare beacon, which is Douglas's deliberate 2026-07-16 decision (see LOW-1 — the fix is a doc
carve-out, not a code change).

**The gates are green and always have been — and that is itself a finding.** The suite passes 603/603 while
C-1 is live, because the tests cover the hub+rim *pair* thoroughly and the *partial* case not at all. Two of
the week's headline ships (the MSRP policy, the slider filters) have **zero** test coverage — not because
anyone weakened a test, but because the logic lives in `index.html`'s inline script, which no test can
`require()`. **Green gates are currently weaker evidence than they look.**

| Rank | Count | Items |
|---|---|---|
| CRITICAL | 1 | hub/rim false all-clear + unconditional green dots |
| HIGH | 3 | verified kit work unmerged; MSRP save/ranking policy untested; slider/facet filters untested |
| MED | 7 | `lintCatalog` O(m²); rule 8b tolerance trap; `buildTotals` unenforced invariant; search debounce; card-shell triplication; symmetric-rule duplication; test runtime creep |
| LOW | 6 | beacon doc carve-out; memo idiom drift; baseline recompute; stale "dormant" prose; CLAUDE.md doc gaps; dialog-listener duplication |
| UNAUDITED | 1 | per-size rendering (`formatSizes`, landed after this branch's base) |

---

## CRITICAL

### C-1 — Hub/rim partial builds return a silent false all-clear; all 49 hub/rim rows dot green unconditionally

**Files:** [`src/compat.js:13256`](../src/compat.js#L13256) (`effectiveWheel`), [`src/compat.js:13828`](../src/compat.js#L13828) (`placementDiff`)

```js
function effectiveWheel(b, side){
  if(side==='front'){
    if(b.frontWheel) return b.frontWheel;
    var fh=b.frontHub, fr=b.frontRim;
    if(!fh || !fr) return null;          // <-- ONE half picked => the engine checks NOTHING
```

Every wheel-side rule reads `fW`/`rW` ([`compat.js:13291`](../src/compat.js#L13291)). With only one of hub/rim filled,
`effectiveWheel` returns `null` and rules **1** (wheel size), **2** (axle), **6** (freehub), **9** (rotor
interface) and **14** (tire clearance) all go silent. The part is never checked against fields it carries.

**Reproduced by the coordinator (not just reported):**

```
build = { frame: fr-santacruz-megatower-cc (wheelConfigs ['29']),
          fork:  fk-fox-38-factory-29-170  (axle Boost110),
          frontHub: fh-industrynine-hydra2-20x110  (a DH axle),
          frontRotor: ro-sram-hs2-200-6b }

checkBuild -> errors: 0 | warnings: 0        ==> panel reads "No conflicts found"

...add ANY rim to the identical build:
checkBuild -> errors: 1
   "Front axle mismatch: Fork is Boost 15x110 but Front wheel hub is 20x110 Boost (DH)."
```

A 20×110 DH hub on a Boost 15×110 fork is a hard conflict the engine **already models**. A missing rim
suppresses it entirely.

**The pick-time dot is wrong too** (coordinator-reproduced, build = 29-only frame + 29 fork):

```
compatOf(27.5" rim,        build) -> {"state":"g","reason":"No conflicts with your current build"}
compatOf(20x110 DH hub,    build) -> {"state":"g","reason":"No conflicts with your current build"}
```

All **49 rows** (fronthub 11 + rearhub 23 + rim 15) are green against **any** build. The
`🟢 Compatible only` filter ([`index.html:2384`](../index.html#L2384), which hides `state==='r'`) therefore never hides them.

**This is live and reachable today, not theoretical.** The slots carry real labels — `Front Hub`,
`Front Rim`, `Rear Hub` ([`compat.js:128-130`](../src/compat.js#L128), [`index.html:1501`](../index.html#L1501)) — and `subCatsOf`
([`index.html:1705`](../index.html#L1705)) emits a sub-chip per group slot cat, so the Wheels rail renders these chips now.

**Second, independent masking path.** `placementDiff` deletes only `slotKey`:

```js
var base = Object.assign({}, build || {}); delete base[slotKey];
```

but `setSlot` ([`index.html:2633`](../index.html#L2633)) also clears the mutex partner (`if(slotDef && slotDef.altOf)
delete build[slotDef.altOf];`). All four wheel-part slots are `altOf` (verified:
`frontHub/frontRim -> frontWheel`, `rearHub/rearRim -> rearWheel`). So with a complete wheel picked, the
baseline keeps `frontWheel`, `effectiveWheel` prefers it, and the rim under test is ignored — the dot is
computed against a build state **that cannot exist after the click**.

**Why it matters:** two of the four verdict states are wrong for a whole browsable rail, and the failure
mode is the worst-case direction — a false *"fits"*, not a false *"won't fit"*. `resolveBuild`'s own comment
([`compat.js:13223-13230`](../src/compat.js#L13223)) names this exact scenario as the thing the product must never do.

**Fix — three parts, all needed:**

**(a)** Make `effectiveWheel` return a **partial merge** instead of `null`:
```js
if(!fh && !fr) return null;
return { wheel: fr && fr.wheel, hub: fh && fh.hub, rotorMount: fh && fh.rotorMount,
         intWidth: fr && fr.intWidth, maxTire: fr && fr.maxTire, minTire: fr && fr.minTire };
```

**(b)** Add presence guards to the four exact-compare rules — **mandatory**, not optional. The audit verified
that a naive partial merge produces the correct error *plus two false ones*:
```
rim-only partial -> "Front wheel size mismatch: Fork 29", Front wheel 27.5"."          [CORRECT]
                 -> "Front axle mismatch: ... Front wheel hub is undefined."            [FALSE]
hub-only partial -> "Front wheel size mismatch: ... Front wheel undefined, ..."         [FALSE]
                 -> "Front axle mismatch: ... hub is 20x110 Boost (DH)."                [CORRECT]
```
Guard `fW.wheel != null` at 13306/13307; `fW.hub`/`rW.hub` at 13325/13326; `rW.freehub` at 13423;
`fW.rotorMount`/`rW.rotorMount` at 13524/13530. Rules 14/14c already `typeof`-guard.

**(c)** Clear the mutex partners in `placementDiff` so the engine and `setSlot` cannot drift, driven off
existing `SLOTS` metadata:
```js
function _mutexOf(slotKey){
  var s = _slotByKey(slotKey); if(!s) return [];
  return (s.altOf ? [s.altOf] : altSlotsOf(slotKey)).concat(s.excludes || []);
}
// placementDiff: delete base[slotKey]; _mutexOf(slotKey).forEach(function(k){ delete base[k]; });
```
The `excludes` (dropper/seatpost) half is verdict-neutral today — rules 13/13c fire independently, so the
partner's verdicts sit in both `before` and `after` and never read as new. `altOf` is the actual bug,
because `effectiveWheel` *masks* rather than *adds*. Include both for symmetry.

**Effort: M.**

**Regression-safety — verified, and it corrects the sub-agent's own hedge.** The engine agent warned that
`test-greying.js` might pin the hub/rim greens ("those pins are the bug, not the contract"). **It does not.**
All seven hub/rim tests ([`test/test-engine.js:866-905`](../test/test-engine.js#L866)) supply **both** halves, and the block's
stated contract is explicitly about a *"hub+rim **pair**"*. The pair case is correct and well covered; the
**partial** case is simply untested. So the fix lands without weakening any test — it only *adds* coverage.
That the suite is green today while this bug is live is itself the finding in **M-4**.

---

## HIGH

### H-1 — Verified kit work sits unmerged on `verify/kit-grind-3`

**Evidence:** branch `verify/kit-grind-3` (worktree `.claude/worktrees/inspiring-nash-adba6e`) is **2 commits
ahead** of `origin/main`: `f2c7606` (TLD Sprint LS retargeted to a real, sourced `Sprint Pro LS` SKU,
`verified:true`) and `6fc95b0` (8 flagged Dakine rows resolved). Main still carries the unverified placeholder:

```
verify/kit-grind-3 : model:'Sprint Pro LS', price:92, weight:109   (verified, sourced)
origin/main        : model:'Sprint LS',     price:65, weight:190   (unverified placeholder)
```

**Why it matters:** real, sourced verification work is not live; the site shows a placeholder price/weight
that verification has already corrected.

**Re-framed from the sub-agent's report — the repo moved mid-audit.** Area 5 found this as *uncommitted*
work on a branch that was then an *ancestor of main*, i.e. a genuine data-loss risk from a routine
"merged branches are safe to delete" sweep. That session has since committed (`f2c7606`), so the worktree
is clean and the branch is no longer sweep-eligible. **The data-loss risk is gone; the merge is still owed.**

**Recommendation:** merge `verify/kit-grind-3` (coordinator lane — gates then merge). Do not delete the
worktree until merged. **Effort: S.**

**Generalized lesson worth keeping:** the "merged branch = safe to delete" heuristic is unsafe while a
worktree is dirty. Any future sweep should check `git status --porcelain` per worktree *before* deleting a
merged branch. This is the same class as the two dirty night-verify worktrees already on the open list.

### H-2 — The MSRP save/ranking policy has zero test coverage — the exact logic that just shipped a live-bug fix

**Files:** [`index.html:2457`](../index.html#L2457) (`var save = partsTotal - p.price;`),
[`index.html:2785-2787`](../index.html#L2785) (`renderCompleteBikeBlock`, `var save = t.price - cb.price;`),
[`index.html:2419-2420`](../index.html#L2419) (the `price-asc`/`price-desc` comparators, keyed on `a.p.price`),
[`index.html:2468`](../index.html#L2468) + [`2672`](../index.html#L2672) (sale-labeled strings).

This is the entire implementation of the 2026-07-16 ruling (`aa0c08c`) — the fix for a **real, live bug**
where `streetPrice` inflated the best-value ranking (a Pivot Firebird jumped from #101 to #2 of 164 on the
wrong basis). **Nothing tests it.** Grepped every test file for `streetPrice`/`MSRP`/`savings`/
`bikePartsTotal`/`renderCompleteBikeBlock`: the only hits are in `test-drift-check.js`, matching the literal
string "MSRP" inside scraped-HTML fixtures for the price-drift tool — unrelated. `test-pricing.js` /
`test-invariants.js` cover `buildTotals`/`bundleActive` (the buy-as-parts bundle math) — a different,
well-covered concern.

**Root cause is structural, not negligence:** none of this is exported from `src/compat.js`; it lives only in
`index.html`'s inline `<script>`, which no test file can `require()`.

**Read this together with the clean bill in "Checked and clean".** The policy is *correctly implemented
today* — Area 3 verified there is no `streetPrice` leak on any path, and `schema.js:750-753` rejects
`streetPrice > price`. The finding is that **nothing guards it**: a future edit reintroducing
`p.streetPrice || p.price` while fixing something adjacent would regress a bug Douglas personally caught,
and every gate would stay green.

**Fix:** extract the pure part into `src/compat.js` (or a small requirable module) — e.g.
`completeBikeSaveBasis(bike, partsTotal) -> {headline: bike.price, save: partsTotal - bike.price, sale: bike.streetPrice||null}`
— and call it from both `bikeCardEl` and `renderCompleteBikeBlock` instead of duplicating the arithmetic.
Then test a synthetic bike with `price:5000, streetPrice:3000`: assert `headline`/`save` derive from `5000`
only, plus a sort regression pinning "a low-`streetPrice`/high-`price` bike does not float above a
cheaper-MSRP bike under `price-asc`." **Effort: M.**

### H-3 — The dual-ended slider filters and facet composition are 100% untested

**Files:** [`index.html:1824-1922`](../index.html#L1824) (`SUBFILTERS`, incl. the complete-bike
`cbFrameMaterial`/`cbDrivetrainAct` facets at 1908-1921), [`index.html:1941-1975`](../index.html#L1941)
(`RANGEFILTERS`: `forkTravelRange`, `shockEyeRange`, `shockStrokeRange`, `dropperDropRange`, `tireWidthRange`,
`cbFrontTravelRange`, `cbRearTravelRange`), composed in `baseMatch()` at
[`index.html:2328`](../index.html#L2328) / [`2331`](../index.html#L2331).

Grepped `test/` for `RANGEFILTERS`, `SUBFILTERS`, `rangeFilter`, `cbMaterialOf`, `cbActuationOf`,
`cbFrontTravelOf`, `cbRearTravelOf`, `numBoundsOf` — **zero matches**. This is the headline feature of the
week (shipped `1999070`, revised twice more) and nothing exercises:

- that two engaged filters compose as **AND**, not OR — a one-character regression would silently show
  incompatible-facet results;
- the float-epsilon tolerance on `shockStrokeRange`/`tireWidthRange` (`>= lo-1e-9 && <= hi+1e-9`) at boundaries;
- the "out-of-scope or null value always passes" convention every `match()` depends on — documented in the
  comment at [`index.html:1939`](../index.html#L1939), never asserted;
- `cbActuationOf`'s explicit "never synthesize a third bucket" rule when it returns `null` (single-speed /
  no-drivetrain bikes).

**Same structural root cause as H-2** (logic trapped in the inline script). Note the fix precedent already
exists and is documented: `test-ui.js`'s own header says of `esc()`/`partVerified()` — *"These used to live
untested inside the inline `<script>`; they now live in compat.js."*

**Fix:** pull the descriptor tables' pure parts (`match`, `bounds`, the `cbXOf`/`numBoundsOf`/`distinctVals`
helpers) into a requirable module and drive them from Vitest with fixture parts. Minimum coverage:
AND-composition of any two engaged filters; each range's boundary/epsilon behavior; null/out-of-scope
pass-through on every axis. **Effort: L** (no extraction precedent for filter logic yet; no DOM test
environment in the repo today).

---

## MED

### M-1 — `lintCatalog` sibling-differ is O(m²) per family cluster with redundant re-serialization

**File:** [`src/schema.js:1123-1135`](../src/schema.js#L1123)

```js
for(var i = 0; i < group.length; i++){
  for(var j = i + 1; j < group.length; j++){
    var a = Object.assign({}, group[i]), b = Object.assign({}, group[j]);
    delete a.id; delete b.id;
    if(JSON.stringify(a) === JSON.stringify(b)) warnings.push(...);
  }
}
```

`JSON.stringify` is recomputed per *pair* rather than per *part*. **Coordinator-reproduced on live data:**

```
4,060 parts | 1,714 family clusters | 32,197 pairwise comparisons
validateCatalog  19ms
lintCatalog     143ms   <- 7.5x
top clusters: shock|rockshox-super-deluxe = 161, shock|rockshox-vivid = 123, shock|rockshox-deluxe = 52
```

Dev/CI only — never runs in the browser, so **no user impact**. But it runs 5× per CI pass
(`validate.js` + `test-ids.js` + 3× in `test-schema.js`, each via `C.PARTS.concat([oneRow])` paying full
cost) and degrades **quadratically** as any one shock family grows — which is the catalog's stated trajectory.
Kit data never hits this (only 45/713 rows carry `family`, no cluster > 2).

**Fix:** compute each part's canonical signature once (O(m)), detect duplicates via a `Map<string,id>`.
Same warnings, no nested loop, no repeated stringify. **Effort: S.**

### M-2 — Rule 8b compares rotor size with strict `>`, bypassing the engine's own cross-brand tolerance

**File:** [`src/compat.js:13513-13516`](../src/compat.js#L13513)

```js
if(fBrake && fRotor && typeof fBrake.maxRotor==='number' && fRotor.size>fBrake.maxRotor)
  err('front-brake-rotor-max', ...);
```

Rule 10 ([`compat.js:13543`](../src/compat.js#L13543)) routes the identical comparison through `rotorOverMax`
([`compat.js:13149`](../src/compat.js#L13149)), whose 3 mm grace exists precisely because **SRAM 200 ≡ Shimano 203** and
**SRAM 220 ≡ Shimano 223**. Rule 8b skips it.

**Not live today** — only 4 brakes carry `maxRotor`, all flat-mount at 160/160/180/160, and neither 160 nor
180 has a cross-brand twin within 3 mm. But the catalog holds **11 rotors at 200 mm and 42 at 203 mm**, so the
first flat-mount caliper entered with a SRAM-labeled `maxRotor:200` will hard-error every Shimano 203 rotor —
a false *"won't fit"* on a physically identical mount class, in the one tier (`err`) with no adapter escape.

**Fix:** use `rotorOverMax(fRotor.size, fBrake.maxRotor)` on both lines. Verdict-neutral on today's data;
closes the trap permanently. **Effort: S.**

### M-3 — `buildTotals` silently drops a bundled group's non-fill slots; the invariant is unenforced

**File:** [`src/compat.js:13916-13934`](../src/compat.js#L13916)

When `bundleActive` is true the group bills `preset.price` and the summing branch is skipped entirely. Any
group slot the preset does **not** fill vanishes from both price and weight.

**Not live today** — every preset was scanned against its group's non-`altOf` slots: **zero partial presets**
(all 27 cockpitsets fill `grips`; groupsets fill all 5; brakesets all 4; wheelsets both wheels). But the
invariant is load-bearing and unenforced — it is the documented reason `bb`/`headset`/`cog`/`seatpost` each
got their own GROUP. A bar+stem kit without grips is a natural catalog addition, and the day one lands, a
user's grips silently vanish from the headline price with no error anywhere.

**Fix (preferred — verified no-op on today's data, makes the bug class impossible):** in the bundle branch,
also sum picked parts in the group's non-fill slots. **Additionally/alternatively:** a `lintCatalog` rule —
*"a preset must fill every non-`altOf`, non-`optional` slot of its group."* **Effort: S.**

### M-4 — Search input re-renders the full catalog on every keystroke, against the file's own established pattern

**File:** [`index.html:4459`](../index.html#L4459)

```js
$('search').addEventListener('input', function(e){ search=e.target.value; renderCatalog(); });
```

No debounce; **zero** debounce/throttle helpers exist in the file. This contradicts the pattern the slider
work deliberately established ([`index.html:2049-2058`](../index.html#L2049)), whose comment explains that `input`
(drag) only repaints the row's own label while `change` (release) does the re-filter — *"cheap, no catalog
re-filter mid-drag"* on the *"3000+-row catalog"*. The search box got no equivalent treatment.

**Severity corrected downward from the sub-agent's HIGH, on measurement.** The agent reported a
"user-visible input-lag cliff" from *"823 × 2 = 1,646 `checkBuild` calls"* per keystroke. The call count is
right; the cost conclusion is not:

```
compatOf over ALL 823 shocks (one full render pass) = 3.6 ms
5-char search = 5 renders = ~18 ms of engine work
```

`checkBuild` is O(1) in catalog size (~2 µs/call), so the engine is **not** the bottleneck. The residual
per-keystroke cost is DOM construction — `renderCatalog` rebuilds every matching card from `innerHTML=''`
with no virtualization/pagination (verified: no `slice(0,`, no `IntersectionObserver`, no `loadMore`).

**Fix:** debounce the `input` handler (150–250 ms trailing), mirroring the slider's `input`-vs-`change`
cadence. **Effort: S.** Genuine consistency fix; not urgent.

### M-5 — Card shell + open-wiring triplicated across three renderers

**Files:** `cardEl` [`index.html:2485`](../index.html#L2485), `familyCardEl` [`index.html:2235`](../index.html#L2235),
`bikeCardEl` [`index.html:2446`](../index.html#L2446)

All three hand-roll the same `.pcard-head` / `.pcard-headtext` / `.kind` / `.name` skeleton
(2507-2512 / 2262-2264 / 2460-2462) and each re-wires the identical open-on-click pattern
(2516+2555 / 2269+2274 / 2474+2481). This is precisely the debt the wave produced — Complete Bikes and the
family-drill cards were bolted onto the original `cardEl`. Any shell change (a badge, an a11y fix to the
name button) must be applied three times by hand, with nothing enforcing sync.

**Fix:** extract `cardShellHtml({thumbHtml, kindLabel, nameLabel, nameAria, specHtml, provHtml, priceHtml})`
plus `wireCardOpen(card, openFn)`; each call site keeps its own per-cat logic. Purely presentational — no
engine involvement. **Effort: M** (needs testing across list/grid CSS view modes; selectors like
`.list .pcard.completebike .name` at [`index.html:340`](../index.html#L340) target this markup).

### M-6 — ~9 symmetric front/rear rule pairs are copy-pasted in `checkBuild`

`checkBuild` is 524 lines with near-identical twins differing only by a `Front`/`Rear` (or
`Dropper`/`Seatpost`) label:

| pair | lines |
|---|---|
| `front-brake-rotor-max` / `rear-brake-rotor-max` | 13513-13516 |
| `front-rotor-interface` / `rear-rotor-interface` | 13524-13535 |
| `front-rotor-max` / `rear-rotor-max` | 13543-13544 |
| `front-tire-rim` / `rear-tire-rim` | 13648-13649 |
| `front-tire-rim-min` / `rear-tire-rim-min` | 13656-13659 |
| rule 13 (`dropper-*`) / rule 13c (`seatpost-*`) | 13618-13645 |
| `headset-upper` / `headset-lower` | 13792-13795 |

Rule 13 vs 13c is the cleanest case — a `postDiameterRule(part, slotKey, ruleIdPrefix, Noun)` reproduces
both exactly (13b's insertion info stays on the dropper branch).

**Do NOT merge** rule 2 (`front-axle` reads `fork.axle`; `rear-axle` reads `frame.rearAxle`) or rule 8 — the
subjects genuinely differ; merging obscures rather than dedupes.

**The guard that makes this safe:** `verdictKey` is `ruleId|slots|msg`, so a single character of `msg` drift
silently changes conflict identity and breaks the dedup/dot contract. Since `checkBuild` is pure and costs
1.39 µs, pin it first: snapshot ~50k pseudo-random builds and assert the full sorted `verdictKey` set is
byte-identical before/after. That corpus runs in well under a second and turns a risky refactor into a
mechanical one. **Effort: M** (S for the 13/13c pair alone).

### M-7 — `test-random-builds.js` is 86% of test time, and half of it is exact-duplicate work

Per-file timings (Vitest JSON reporter):

| File | Duration | Tests |
|---|---|---|
| `test-random-builds.js` | **7,438 ms** | 15 |
| `test-schema.js` | 589 ms | 92 |
| `test-ids.js` | 203 ms | 6 |
| `test-invariants.js` | 118 ms | 19 |
| everything else (16 files) | ≤ 43 ms each | — |

**The 7.51 s total is not a problem** — it is well within any sane budget, and this is filed MED for tidiness,
not urgency. But one file is ~86% of it for a concrete, fixable reason: `generateSampleBuild(theme, seed)` is
deterministic (proven by the file's own `'same seed produces the same build'` test at
`test-random-builds.js:55-62`), yet the file calls it **876 times**, of which **460 (52%) are exact repeats**
of `(theme, seed)` pairs the core property loop (lines 40-52, 8 themes × seeds 1-50) already computed:

- `'different seeds produce different builds'` (line 64) — 160 duplicate calls
- the mullet/DH/hardtail character tests (lines 76, 87, 96) — 150 duplicate calls
- `'price bands are ordered'` (line 105) — 150 duplicate calls

Each call is expensive in the product code it drives (`_sampleSlotPick`, `compat.js:14072-14094`, runs
`checkBuild` once per candidate part per slot per attempt).

**Fix (test-file only, zero coverage change):** memoize `genOk(key, seed)` on `key+'|'+seed` — safe precisely
because the suite already proves the function is pure/deterministic. Every call site then reuses a build the
core loop computed. No assertion changes; the identical `(theme, seed)` pairs are still exercised. This is
redundant-computation removal, **not** a coverage reduction — the golden rule is respected. **Effort: S.**

---

## LOW

### L-1 — Cloudflare beacon is a CDN/ESM load; the vendoring convention has no analytics carve-out

**Files:** [`index.html:890`](../index.html#L890), `KitBuilder/index.html:314`, `privacy.html:73`, `terms.html:73`,
`affiliate-disclosure.html:74` — five copies of:

```html
<script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "..."}'></script>
```

CLAUDE.md's Conventions say *"Third-party libraries are VENDORED, not CDN-loaded… No `import`/ESM, no
runtime CDN fetch."* Read literally, this is both.

**Severity corrected downward from the sub-agent's CRITICAL — twice, independently.** Two agents flagged
it (Area 1 as CRITICAL, Area 5 as MED) and both concluded the same fix: **documentation, not code.** The
coordinator concurs. Reasons: it is Douglas's explicit 2026-07-16 decision (token handed over directly); it
carries an inline rationale comment at [`index.html:888-889`](../index.html#L888) citing the committed-constant
precedent; it is a passive analytics beacon, not a functional dependency the app breaks without; and a
Cloudflare Web Analytics beacon **cannot meaningfully be vendored** — it must load from Cloudflare to report.
The vendoring rule was written for *libraries* (the `supabase.min.js` precedent). Privacy is already handled
truthfully (§5 rewrite, CF added to §6 processors, `43c701e`).

**Fix:** add one sentence to CLAUDE.md's Conventions exempting analytics/telemetry beacons (as distinct from
functional libraries), citing this beacon as the example. **No code change wanted.** Without it, every future
audit re-flags this. **Effort: S.**

### L-2 — Memoization idiom drift: two of four memos skip the documented prototype-free hardening

`_BY_ID` ([13127](../src/compat.js#L13127)) and `_SLOT_BY_KEY` ([14059](../src/compat.js#L14059)) use `Object.create(null)`,
with 13120-13121 explaining why. Two others do not: `_CAT_SLOTS` ([13815](../src/compat.js#L13815), `var acc = {}`)
and `_PARTS_BY_CAT` ([14021](../src/compat.js#L14021)). Both `|| []` fallbacks are defeated by an inherited truthy —
`_partsByCat('constructor')` returns `Object.prototype.constructor`. **Unreachable today**: both keys come
from the fixed `SLOTS`/validator-constrained `cat` vocab, not user input (unlike `byId`, which reads share
links). Idiom drift, not a vulnerability. Same one-line gap in [`validate.js:29`](../validate.js#L29)
(`var bikeIds = {}`), also unreachable (`ID_RE` + the ≥3-token rule reject `__proto__`-shaped ids first).

**Verified clean:** no memo can go stale — `PARTS` is `var PARTS = PARTS_RAW;` and nothing in `src/` or
`index.html` ever pushes to or reassigns `PARTS`/`SLOTS`/`GROUPS`.

**Fix:** `Object.create(null)` in all three. **Effort: S.**

### L-3 — `placementDiff` recomputes an identical baseline per card

[`src/compat.js:13829`](../src/compat.js#L13829): `var before = checkBuild(base);` — for a category list, `base` is
**identical for every card** yet recomputed per card, per slot. Rendering 328 tires = 1,312 `checkBuild`
calls, of which 656 recompute one of only **2** distinct baselines. Total 5.4 ms; hoisting halves it.

Two adjacent multipliers in `index.html`: with `🟢 Compatible only` on, `compatOf` runs **twice** per
surviving part ([2384](../index.html#L2384) filter + [2409](../index.html#L2409) meta map); and
[`index.html:1530`](../index.html#L1530) rebuilds its own `CAT_SLOTS` duplicating `_catSlots()`, while
[`index.html:2632`](../index.html#L2632) linear-scans `SLOTS.filter(...)` because `_slotByKey` isn't exported.

**Filed LOW so it is not mistaken for a cliff** — worst realistic render is ~13 ms and this stays cheap at
10k+ rows. Fix only if the code is being touched anyway: optional `baseline` param on `placementDiff`,
compute once per slot in `compatOf`, export `_slotByKey`, cache the filter's `compatOf` result. **Effort: S.**

### L-4 — Engine comments and CLAUDE.md call several rules "dormant" that are now live

| rule | prose says | actual |
|---|---|---|
| 14b `fork.maxTire` | *"dormant until a fork carries a maker-published maxTire"* (13660) | **190 forks** |
| 18 `frame.maxTire` | *"10 catalog frames as of 2026-07-06"* (13745) | **115 frames** |
| 12c `designForkTravel` | *"dormant until a frame carries…"* (13598) | **124 frames** |
| 10 `fork.minRotorF` | *"sourced forks only"* | **330 forks** |
| 14c `minTire` | *"live-dormant"* (13650) | **11 fw / 14 rw / 9 rim** |
| 20b `headTubeUpper` | *"51 frames at landing"* (13781) | **121 frames** |
| 19 `leverAccepts` | *"dormant until parts are tagged"* (13751) | **46 brakes / 6 shifters** |

Genuinely still dormant (verified 0 rows): **16b** `coilApproved:false`, **ss-tension**
`dropoutType:'vertical'`. Docs, not behavior — but *"dormant"* is exactly the word a future session will
trust when judging whether a change is risky. **Fix:** refresh or drop the numbers (CLAUDE.md's own
*"don't trust a number written here, they drift"* rule applies). **Effort: S.**

### L-5 — CLAUDE.md's file table omits 4 live source modules, 1 test, 3 live tools, and an npm script

**Missing from the table:** `src/kit.js` (2,725 lines / 713 rows), `src/forum.js`, `src/guides.js`,
`src/ui-common.js`, `test/test-kit.js` (on disk, wired into `vitest.config.mjs`'s glob, **26 passing tests** —
the *only* table mismatch in either direction; every other on-disk test has a row and every row's file exists),
`KIT-BUILDER-SCOPE.md`, and the tools `drift-check.js`
(has npm script `verify:drift`, `require()`d by `test-drift-check.js`), `verdict-audit-harness.js`
(in both agent gate checklists), `breadth-gap.js` (generates the committed `BREADTH-GAP.md`). All are live
and referenced — the gap is purely documentation.

**Why it matters concretely:** CLAUDE.md bills the table as *"these are the project"* and is the first thing
every session reads. **This audit's own brief was wrong because of it** — it assumed kit.js had "its own
validator" to reconcile against schema.js. It does not: `src/kit.js` is pure data plus two helpers
(`kitById`, `kitTotals`), and every kit row is validated by re-calling `schema.js`'s own `validatePart`
scoped to the kit catalog ([`validate.js:25`](../validate.js#L25), [`test/test-kit.js:12-15`](../test/test-kit.js#L12)). That is
the **correct** architecture and should be preserved — it just isn't discoverable from the docs.

Also stale in the same row: `package.json:11-14` has **four** `verify:*` scripts (`status`, `next`, `report`,
**`drift`**), but CLAUDE.md lists only `verify:status/next/report` — `verify:drift` (which runs
`tools/drift-check.js`, itself covered by `test-drift-check.js`) is omitted.

**Fix:** add the rows; note that `node validate.js` gates **both** catalogs; change the script list to
`verify:status/next/report/drift`. **Effort: S.**

### L-7 — `tbMoney` is untestable-by-accident, and KitBuilder's `esc()` is an untested duplicate

`src/ui-common.js` has no test. `tbMoney` ([`ui-common.js:22`](../src/ui-common.js#L22)) is pure
(`'$' + (n||0).toLocaleString()`) and trivially testable, but the file's top-level IIFE
([`ui-common.js:50-58`](../src/ui-common.js#L50)) touches `document`/`localStorage`/`matchMedia` **at parse
time**, so `require()`-ing it in Vitest's default `node` environment throws before a test can reach `tbMoney`.
Separately, `KitBuilder/index.html:374` carries its **own copy** of `esc()` — a duplicate of the
compat.js one that `test-ui.js` hardened; the KitBuilder copy is never exercised.

**Fix:** hoist `tbMoney` (and any other DOM-free helper) above the theme IIFE or into its own tiny module,
then add 3-4 cases (`0` → `'$0'`, `1234.5`, `null`/`undefined` → `'$0'`). Give KitBuilder's `esc()` at least a
smoke test — it is the same XSS-adjacent escaping the compat.js copy was hardened for. **Effort: S** for
`tbMoney`, **M** for the rest.

---

## UNAUDITED

### U-1 — Per-size rendering (`formatSizes`) landed after this branch's base and was not reviewed

Item (c) of the audit brief. `9a58087` ("relabel frame rear travel, add frame rear-travel slider, fix per-size
JSON dump") introduces `formatSizes()` — the readable *"S: 380 mm seat tube · M: …"* rendering of a frame's
`sizes` map. It is **not in this tree** (`grep -c formatSizes index.html` → 0), so there was nothing to audit.
This branch was deliberately not rebased onto it to keep every line anchor above valid.

**What *is* present and verified:** `frame.sizes` schema validation is covered
([`test/test-schema.js:187-196`](../test/test-schema.js#L187) — unknown per-size key caught, non-positive value
caught, valid map passes), and its deliberate dormancy in `checkBuild` is documented
([`compat.js:13624-13628`](../src/compat.js#L13624), *"the app has no frame-size concept yet"*).

**Recommendation for whoever picks this up:** `formatSizes()` is a small pure function (a `sizes` map in, a
joined display string out, generic over unknown per-size keys via a label fallback) — exactly the shape that
should live in `compat.js` rather than the inline script (**H-2/H-3's structural lesson**). Test known-key
labels, the unknown-key fallback, multi-size/multi-field joining, and that `esc()` is applied to hostile
keys/values (mirroring the existing hostile-string test at `test-ui.js:24-31`). **Effort: S once merged.**

### L-6 — Nine byte-identical dialog backdrop-close listeners

[`index.html:4603, 4606, 4614, 4619, 4627, 4642, 4650, 4653, 4685`](../index.html#L4603) — nine copies of
`addEventListener('click', function(e){ if(e.target===this){ this.close(); } })`, differing only in the id.
Confirmed one-shot (bound at setup, not in a re-render path — **not** a leak). **Fix:** a loop over the id
list, or one delegated `document` listener checking `e.target.tagName==='DIALOG'`. **Effort: S.**

Also minor and in the same family: `actuationOf` ([1755](../index.html#L1755)) and `cbActuationOf`
([1778](../index.html#L1778)) share a byte-identical fill-resolution body; extract
`actuationFromFills(fills)`. **Effort: S.**

---

## Checked and clean (no finding — recorded so the next audit can skip them)

**Standing rules.** No pop-ups: every `showModal()`/`toast()` call site traces to a user click; none fire
from `DOMContentLoaded`/`window.onload`/`setTimeout`. No e-bikes: the only `motor`/`battery` hits in
`compat.js` are comments documenting *exclusions* (Pole Hiisi, Mondraker Dune); `kit.js:148,152` mention
"e-MTB cert" only as a note that a standard MTB helmet's NTA-8776 certification *also* covers e-MTB use — no
e-bike part, field, or vocab token. No secrets: only the labeled Supabase publishable/anon key in
`src/config.js`; `service_role` appears solely in prose warning against committing one. BMX stays OFF-LIVE
(`data/bmx.js` / `src/compat-bmx.js` are `<script>`-loaded by nothing served).

**Engine correctness (Opus, verified against running code).** All direction-aware rules correct, none
inverted — rule 9 rotor (6-bolt→CL warn + `SM-RTAD05` fix / CL→6-bolt err), 13/13c post diameter, 15
bar/stem, 16 shock stroke, 6c freehub (XD-on-XDR warn + spacer fix; reverse err). **Zero NaN/undefined
silent passes across all 4,060 rows** on every engine-compared field — the `undefined > 5 === false` trap has
no live instance (the `effectiveWheel` partial in C-1 is the one place it *would* bite, which is why C-1's
guards are mandatory). No mutation of the input `build`; no shared mutable state; `checkBuild` deterministic
across repeat calls. `forkTravelHard` is safe by construction (`schema.js:960-962` rejects it without
`minForkTravel`; all 15 such frames carry one). `canonicalId` is O(1) over 365 aliases. `sanitizeShare` is
not prototype-pollutable.

**Determinism.** No `Math.random`/`Date.now` outside the two documented injectable defaults; no `for…in`;
verdict order fixed by rule order, not key iteration; `generateSampleBuild('mid', mulberry32(7))` byte-identical
across runs.

**Scale.** `checkBuild` is O(1) in catalog size — 1.39 µs/call (20-slot build), 0.195 µs (2-slot). Its only
catalog touches are the memoized `byId(frame.bundledShock)` and `shock.forFrames.indexOf` (max `forFrames`
length = 1). Largest category render (823 shocks) = 6.3 ms; `generateSampleBuild` = 5.7–22 ms across all 8
themes. **The `0655198`/`7f80ae6` memoization did its job; the catalog can grow 10× without the engine noticing.**

**Schema/types drift.** Every recently-shipped field spot-checked in **both** `schema.js` and `types.js`:
`driveMode`, `dropoutType`, `chainWidth`, `cog`/`seatpost`, `headTubeUpper`/`headTubeLower`, `minTire`,
`minRotorF`, `minForkTravel`, `designForkTravel`, `streetPrice`, `modelYear`, `retailerLinks`, `image`,
`sourceType`, `weightSource`, `archiveUrl`, `status`, `supersededBy` — all present and correctly typed.
`kit.js`'s `KIT_PARTS` is fully tsc-checked against `KitPart[]` with no `@ts-ignore` — *stronger* than
`compat.js`'s bike `PARTS_RAW`, which carries a documented `@ts-ignore` for a tsc union-complexity ceiling.

**Pricing policy — no leak.** `schema.js:750-753` rejects `streetPrice > price`; `streetPrice` is
schema-defined only under `completebike`. Every use site computes from MSRP `price` only: the save badge
(`index.html:2457`), the sort comparators (2419-2420), the dual-price block (2786). `streetPrice` appears
only inside explicitly-labeled "Sale" strings (2468, 2672, 2785). **The `aa0c08c` fix holds.**

**CI/deploy.** `ci.yml` runs `validate` → `test` → `typecheck` on every push/PR, matching the golden rule.
`deploy.yml` stages `index.html`, `src/`, `CNAME`, `privacy.html`, `terms.html`, `affiliate-disclosure.html`,
`KitBuilder/index.html` — cross-checked against `git ls-files "*.html"`: **all 5 served pages handled, none
missing.** The "new root .html needs a cp line" warning is currently satisfied.

**Listeners.** The 34 `addEventListener` calls split cleanly: per-render node factories (elements freshly
created and discarded via `innerHTML=''`, so listeners GC with their nodes — churn cost, not a growing leak)
and one-shot setup binds to static singletons. **No leak found.**

**Slider revision cruft — none.** Despite 3 rounds (`1999070`, `738c074`, `d606710`), the CSS
(`index.html:97-186`) and `rangeRowEl` (2059-2134) carry no orphaned rules or dead classes; superseded rules
were actually removed. The three "was a discrete-chip row, replaced by X" comments describe completed
migrations, not dead code. **Clean ships.**

**Large committed artifacts — all load-bearing, none dead.** `verification-job.json` (822 KB, deliberately
committed job state), `drift-report.json` (231 KB, `drift-check.js`'s `STATE_FILE`), `price-drift-2-queue.json`
(78 KB) and `price-drift-2-progress.md` (57 KB) — both actively growing under the in-flight sweep. **None
should be gitignored or deleted.** No stray files: `git status --porcelain --ignored` shows only expected
gitignored locals — no `test2.js`-style strays, no editor backups.

**The Kit Builder's data layer is genuinely well covered — this is not a gap.** `test-kit.js` runs 26 tests
over `src/kit.js`'s schema cross-rules, `kitTotals` edge cases, and its isolation from the bike engine. The
untested part is the `KitBuilder/index.html` page (see L-7), not the data layer.

**`ui-common.js` hoisting is already right where it counts.** `money` is properly aliased
(`var money = tbMoney`); `tbApplyTheme`/`tbCurrentTheme` used as documented. `esc()`/`provHtml()` divergence
between the two pages is **intentional**, per `ui-common.js`'s own header — KitBuilder never loads
`compat.js`, and its provenance rendering covers kit-only fields (`certs`, `rotational`, `fitCut`,
`sizeChart`). Not a duplication bug.

---

## Branch & worktree hygiene

**`e22189a` / `audit/code-quality-2026-07-11` — CLOSED, nothing to merge.** The standing note listed this as
"UNLANDED perf refactor (review+merge)". **That note is stale.** Both changes landed in main independently:
the `byId` index via `0655198` ("Perf: index byId + hoist per-render build resolve"), the `_slotByKey` memo
via `7f80ae6`. `e22189a` is not an ancestor of `origin/main`, no branch contains it, and the branch is
already gone locally. **Action: none. Remove from the open list.**

**Sprawl has regrown since the 2026-07-12 sweep** (154→21 branches then): **147 local branches**, ~60
worktrees. Content-verified via `git merge-base --is-ancestor <branch> origin/main` after a fresh fetch —
**not** `git branch --merged`, per the 2026-07-11 false-positive lesson:

- **72 ordinary merged branches** — mostly auto-named `claude/*` session branches, plus `coord/2026-07-15*`,
  `feat/build-panel-own`, `fix/xc-hardtail-dropper-completeness`, `refactor/ui-common`, `ui/legal-topo-header`,
  `ui/pricing-msrp-save`, `verify/kit-parts-1-cluster7*`. Safe to `git branch -d` (already ancestors, so `-d`
  succeeds cleanly — no `-D` needed).
- **22 dangling `worktree-agent-<hash>` branches** — Agent-tool `isolation:'worktree'` anchors; none are
  checked out by any current worktree (the worktrees sharing their hash sit on the *real* feature branch).
- **10 worktrees on already-merged branches**, all clean, safe to `git worktree remove` after the branch
  deletes: `agent-a8b62e9c3404e416b`, `build-panel-own`, `coord-2026-07-15`, `coord-2026-07-15-seat11`,
  `coord-s11-0715`, `legal-topo-header`, `nifty-wozniak-d27ee2`, `pricing-msrp-fix`,
  `inspiring-nash-adba6e` (**H-1 — merge first**), `dreamy-cohen-d4bb74` (**has an active nested worktree at
  `.claude/worktrees/kit-verify` on the in-progress `verify/kit-parts-1` — check the child before touching the parent**).
- **4 merged remote branches**: `origin/audit/frame-materials-c2`, `origin/audit/frame-materials-c7`,
  `origin/fix/xc-hardtail-dropper-completeness`, `origin/perf/complete-bikes-render`. Remote deletes are
  destructive — **recommendation only, not performed.**
- **KEEP `feat/catalog-views-fractal-honeycomb`** — intentionally retained as the only reference to a
  deliberately-removed feature, despite showing unmerged.
- **~75 branches carry genuine unmerged work** (the `catalog/cb-grind6-*`, `cb-grind5*`,
  `verify/kit-parts-1-cluster*` families, `verify/price-drift-2` at 115 commits ahead) — expected steady state
  for the current grind cadence, **not** a problem to fix.

**Recommendation:** fold a "prune merged branches + worktrees" pass into the existing periodic sweep rather
than treating it as a one-off — it regrew from 21 to 147 in four days. **Always `git status --porcelain` each
worktree before deleting its merged branch** (H-1's lesson).

**The `tools/*.md` one-off reports** (`BIAS-AUDIT-*`, `DUP-ID-AUDIT-*`, `DRIFT-TRIAGE-*`, `VERDICT-AUDIT-*`,
`FETCH-WALLS-*`, `MECHANIC-FINDINGS-INTAKE.md`) are **audit-trail-as-designed** per the standing
reviewer-trail preference — no deletion. Optionally add one CLAUDE.md line marking the `tools/*AUDIT*` /
`*TRIAGE*` pattern as historical, pointing at `REVIEWER-DOSSIER.md`.

---

## Recommended order of work

1. **C-1** — the false all-clear. Nothing else in this report is close in importance. Ship the
   `effectiveWheel` partial merge + presence guards + `placementDiff` mutex clear, and **add the missing
   partial-case tests** (the pair case is already covered; the fix needs no test weakened).
2. **H-1** — merge `verify/kit-grind-3`; real verified data is sitting out of main.
3. **M-2 + M-3** — both S, both close a latent wrong-verdict / wrong-price trap while the data still makes
   them no-ops. Cheapest possible time to fix them is now, before the triggering row is entered.
4. **H-2** — put a test under the MSRP policy. It is correct today and unguarded; it is also the one policy
   Douglas caught personally, which makes an unnoticed regression expensive in trust, not just in code.
5. **L-5 + L-1 + L-4** — the doc trio (file table, beacon carve-out, stale "dormant" counts). All S; L-5 in
   particular is what made this audit's own brief wrong.
6. **M-1** — `lintCatalog` signature Map; CI-only, but quadratic against the catalog's growth trajectory.
7. **H-3** — the filter-extraction test work (L). Larger, and worth doing as one deliberate piece with H-2
   and U-1, since all three are the same structural fix: **move pure logic out of the inline script so it can
   be tested at all.** That extraction is the single highest-leverage quality investment this report
   identifies, and `test-ui.js`'s header documents the precedent.
8. **M-4 / M-5 / M-6 / M-7 / L-2 / L-3 / L-6 / L-7** — quality backlog; take when the surrounding code is
   being touched. **M-6 only behind the `verdictKey` corpus pin.**

---

## Calibration note (how these findings were vetted)

Five sub-agents produced the raw findings; the coordinator re-verified **every CRITICAL and HIGH** against
running code before inclusion. Four claims changed materially — recorded because the standing order is a
*recurring* audit, and the failure modes repeat:

- **CF beacon: CRITICAL → LOW.** Two agents flagged it because the brief said "report any CDN load as
  CRITICAL." Literally true, but it is an approved, documented, un-vendorable analytics beacon. The gap is
  CLAUDE.md's wording, not the code. **Lesson: a rule-literal scan needs a carve-out list, or it manufactures
  false CRITICALs every cycle.**
- **Search debounce: HIGH → MED.** The agent's "1,646 engine passes per keystroke" was right in *count* and
  wrong in *cost* — measured at 3.6 ms, because `checkBuild` is O(1) in catalog size. **Lesson: call counts
  are not costs; measure before ranking.**
- **Uncommitted kit work: HIGH → re-framed.** Real when found (uncommitted work on a then-merged branch = a
  sweep would have eaten it); the owning session committed mid-audit, so the risk is gone and only the merge
  is owed. **Lesson: this is a live repo — re-verify branch/worktree findings at write-up time.**
- **C-1's regression risk: hedge → resolved.** The engine agent warned existing tests might pin the buggy
  greens. They do not — all seven hub/rim tests supply both halves. The fix adds coverage instead of
  weakening any test.

**The one that survived unchanged is C-1**, reproduced independently from a cold build.

A fifth correction ran the other way: Area 3's brief asserted kit.js had "its own validator" to reconcile
against schema.js. The agent **refused the premise** and proved kit.js delegates to `schema.js`'s
`validatePart`. A sub-agent correcting its own brief is the behaviour to reward — the wrong move would have
been inventing a divergence to satisfy the question. The brief was wrong because **L-5** is wrong.

### The through-line

Three of this report's findings (**H-2**, **H-3**, **U-1**) are the same structural problem wearing different
hats: **logic that lives in `index.html`'s inline `<script>` cannot be tested, so it ships unguarded.** That
is why the week's two headline features have zero coverage despite 603 green tests, and why C-1 — a false
all-clear on 49 rows — sat behind a fully green suite. The engine is in good shape; the catalog is in good
shape; the gates are honest about what they check. The gap is what they *cannot* reach.

`test-ui.js`'s header already records the cure and the precedent: *"These used to live untested inside the
inline `<script>`; they now live in compat.js."* Doing that once more — for the save basis, the filter
predicates, and `formatSizes` — would close H-2, H-3 and U-1 together and stop the next feature from landing
in the same blind spot.

**Green gates are necessary, not sufficient.** Worth holding in mind against the standing rule that UI work
auto-ships on green gates: for anything that lives in the inline script, "green" currently means "the parts we
could reach still pass."
