# DATA-MODEL-REVIEW.md — Future-proofing the TrailBuilder data model before mass data entry

**Date:** 2026-07-06 · **Scope:** the data model only — `src/schema.js` (SCHEMA/VOCAB), the catalog
structure in `src/compat.js` (categories, GROUPS/SLOTS, presets, ids), `src/types.js`, provenance and
the entry workflow (`tools/VERIFY-PROTOCOL.md`). **REVIEW ONLY — no schema, code, or data was changed;
this document is the only artifact.**

**Baseline at review time:** `node validate.js` → `DATA OK - 327 parts, 0 problems (46 verified, 281
unverified)`; 112 tests; 19 rule areas; 21 VOCAB keys; 23 categories. No data-entry template exists —
`tools/VERIFY-PROTOCOL.md` governs *verifying* existing rows, nothing governs *creating* rows.

**Method:** ten parallel auditors (Fable 5, the two structural dimensions at maximum effort) covered
the seven requested dimensions, each grounding claims in fetched manufacturer pages; every auditor's
riskiest factual claims then went through an independent adversarial fact-check pass (119 claims
tested, 16 refuted — the corrections are woven in below and listed in Appendix B so they are never
re-proposed). Basis tags used throughout: **(fetched)** = verified against a fetched manufacturer/
authoritative page, **(known)** = uncontroversial industry fact, **(opinion)** = design judgment.

**The cost model that organizes everything below** (the review's central lens):

- **Cheap later:** *optional* fields — they can be added any time without touching existing rows.
- **Expensive later:** id-scheme changes, semantic changes to existing (especially *required*) fields
  or vocab values, category splits, and structure (variants, slots). These must be decided **now**.
- **The hidden exception:** the real unit of cost at catalog scale is the **manufacturer-page visit**,
  not the schema edit. An optional field that is *on the page the verifier is already fetching* must
  exist **before** the entry pass, or every page gets fetched twice. "Optional" ≠ "defer".
- **Vocabulary additions** are code-side and individually cheap, but a missing value **blocks data
  entry mid-batch** — so the real market values are enumerated up front (§6).

---

## 1. Executive summary — the prioritized changes

| # | Change | Class | Effort | Timing |
|---|--------|-------|--------|--------|
| 1 | **Variant model: one flat row per purchasable, fit-distinct SKU** + `family`/`gen`/`modelYear`/`mfgPn` fields + written split policy | Structure | M | **DO BEFORE** |
| 2 | **Id convention: brand-qualified, append-only** (`<cat>-<brand>-<model>[-variants]`) + ALIASES map + verify-job tombstoning; migrate the 327 legacy ids in the pre-deploy window | Identity | M | **DO BEFORE** |
| 3 | **Discipline tag** (`disciplines` enumArray) + script-backfill `'enduro'` now + `suspension:'full'/'hardtail'` frame discriminator + conditional slot-requiredness design | Structure | M | **DO BEFORE** |
| 4 | **`tools/DATA-ENTRY-TEMPLATE.md`** — per-category field checklist, id recipe, split policy, vocab mapping table, weight conventions | Process | S | **DO BEFORE** |
| 5 | Fix semantics of existing fields while rows are few: `crankBb` (spindle interface: +30mm/p3, rename SH24→24mm), cassette `range`→`minCog`, crank `chainline` string→number, `leverClamp` scalar→array, `forFrame`→`forFrames`, price = USD MSRP pin | Semantics | S–M each | **DO BEFORE** |
| 6 | Make crank `ring`/`ringStd` nullable — required values force fabricated data on armset-only cranks and already produce a **live false red** (rule 3c vs eeWings-class cranks) | Semantics | S | **DO BEFORE** |
| 7 | Vocabulary widening bundle (§6): drivetrain `system` values, `material` +steel/ti, `rearAxle` +142x12, headTube SHIS capture fields, etc. | Vocab | M | **DO BEFORE** |
| 8 | Provenance policy: decide measured-weight question + `sourceType`; archive snapshots; **rotor category can never verify under the current bar — decide before its batch** | Provenance | S–M | **DO BEFORE** |
| 9 | Weight-basis conventions + `soldWithout` field (AXS battery, coil springs, brake hose config) — verified weights are otherwise non-comparable | Semantics | S | **DO BEFORE** |
| 10 | Entry-time capture checklist of optional fields that live on pages the grind already fetches (§5.4) | Process | S | **DO BEFORE** |
| 11 | Cheap guards: `KNOWN_VALUES` warn-lints for free numbers, id lint, sibling-differ lint, preset weight derived from fills, specSummary invariant test | Validator | S | **DO BEFORE** |
| 12 | Structured verdict objects (`{ruleId, slots, severity, fix?}`) replacing string identity — enables the "fits with adapter X" tier and fixes REVIEW.md #4/#13's root cause | Engine | M | **DO BEFORE** (code-only) |
| 13 | New categories: **bb** (decide slot now — changes "complete build"), headset, chainguide, seatpost, spring | Structure | M | bb: decide now; rest **LATER** |
| 14 | DH package (dual-crown/20x110/straight-steerer + rule-11 matrix), e-bike deferral design, XC odds & ends, rule-3 chain-speeds redesign | Discipline | M–L | **LATER** (gated) |
| 15 | Family-collapsed picker UI, staleness tooling, display-only field backlog | UI/Process | L | **LATER** |

§3 and §4 are the two structural decisions in full; §5 is the complete DO-BEFORE/LATER breakdown;
§7 gives the recommended final column set per category.

---

## 2. What is already right (don't churn it)

- **The system/actuation/mount/ringStd axis split** was validated against the newest market segment:
  SRAM's 2025 cable-actuated **Eagle 90/70 Transmission** (fetched sram.com RD-90-A1: "T-Type cable
  actuation", Full Mount, 12s, 52T max) models as `system:'sram-transmission' + actuation:'cable' +
  mount:'udh-direct'` with **zero schema change**. Entry-guidance trap: it must never be tagged
  `sram-eagle` (different pull ratio from Eagle mechanical). (fetched)
- **`udh:bool` survives an enum challenge** — every candidate third state (proprietary hangers,
  gearbox frames) either maps to existing values or is a category-level concept. Keep it; document
  "proprietary-hanger frames are `udh:false` and still take standard-hanger derailleurs". (opinion)
- **Six vocabularies are market-complete for MTB**: `rotorMount`, `shockMount`*, `spring`,
  `derailMount`, `pedalStyle`, `actuation`*. (*`shockMount` may eventually want `'bearing'` — see §6;
  `actuation` gains `'hydraulic'` only when droppers get an actuation field.) Mark them "audited
  2026-07" in comments so future sessions don't speculatively widen them. (opinion)
- **Pedals need no compat rule** — confirmed: all adult MTB cranks are 9/16"-20; 1/2" threads live on
  one-piece kids/BMX cranks outside scope. CLAUDE.md's claim stands. (known)
- **12x157 is ONE fitment standard.** An auditor proposed a `'157DH'` value separate from
  `SuperBoost157`; the fact-check **refuted** it: the Commencal Supreme DH V5 ships a DT Swiss 350
  12x157 hub that DT itself sells as "Super Boost", and Knolly's 157 tech page confirms hub shell
  width/cassette position/chainline are common across the 157 lineage — flange spacing varies by hub
  *manufacturer*, not by discipline, and is a wheel-build nuance, not a fit split. Adding `'157DH'`
  would have **created false "won't fit" verdicts**. At most relabel: `LABELS['SuperBoost157'] =
  'SuperBoost / DH 157x12'` (display-only). (fetched, via fact-check)
- **The add-a-category path is clean** (~7 touchpoints: SCHEMA, types union, GROUPS/SLOTS,
  specSummary, LABELS, rows, tests). UI/chips/hash/totals all derive from GROUPS; `readHash` tolerates
  unknown slot keys, so adding slots never breaks old share links. Document the checklist in CLAUDE.md;
  the silent-failure spot is `specSummary` (returns `''` for unknown cats — add an invariant test that
  every SCHEMA cat renders a non-empty spec line). (fetched: code)
- **`fills`/`bundledShock` id-reference pattern** (validator-cross-checked links) is the right
  template for every future relationship. Its one flaw: storing *derived* numbers next to the link
  (preset weights — REVIEW.md #11/#12). Principle to adopt: **weight is always derived, price may be
  stored** (real discounts exist, and the ≤-sum lint already guards it). (opinion)

---

## 3. Structural decision A — variants & model-year

**This is the decision that dominates data-entry effort.** The real market ships matrices, not parts
(all fetched):

| One "model" | Actual SKUs |
|---|---|
| Maxxis Assegai | **25 SKUs** on one page (15×29", 10×27.5"), columns Part#/Size/Weight/Compound (Dual, 3C MaxxTerra, 3C MaxxGrip)/Casing (EXO, EXO+, DoubleDown, DH); 29x2.5 alone spans **1,097–1,567 g** by casing |
| RockShox ZEB Ultimate | up to **12 fit-distinct configs** per generation (travel 150–190 × wheel × offset), and **four generations** (A1/A2/A3/B1) each with its own sram.com model page; the current B1 quotes 2,550 g where the catalog's sample row says 2,150 g — a *generation* difference, not a data conflict (NEXT-STEPS already tripped over exactly this) |
| RockShox Vivid | **32 eye×stroke×mount combos** on one page, plus eyelet variants (Standard / Bearing / 90-deg) |
| OneUp V3 dropper | **20 SKUs** (4 diameters × drops 90–240), each with its own published weight (304–765 g) — the catalog's two verified rows match the per-size table exactly |
| WTB Volt saddle | ~13 SKUs (5 rail materials × 3 widths, 165–320 g) |
| RAAW Madonna V3.2 | ships with Rocker 60 **or** Rocker 65 (205×60 vs 205×65 shock) — an engine-read *frame* axis |

### Recommendation (decisive): keep **flat rows — one row per purchasable, fit-distinct configuration**

The catalog already is a flat-SKU model by accident (`fk-zeb`/`fk-zeb-275`/`fk-zeb-180`); make it one
on purpose. Rejected alternatives (opinion, grounded as noted):

- **(C) Parametric rows** (array fields): breaks the engine contract outright — all 19 rules
  scalar-compare resolved fields; per-SKU verified weights/provenance become inexpressible.
- **(B) Two-level product+variants with load-time expansion**: feasible under the no-build-step
  constraint, but generated ids silently threaten share links (`readHash` drops unknown ids without
  error) and the id-keyed `verification-job.json`; and since weight, price, and all three provenance
  fields differ per SKU anyway, the shared "product shell" shrinks to ~5 fields while validate/tests/
  types/verify-job must all learn the expansion layer. Not worth it. If entry ergonomics demand it
  later, write a *generator script that emits flat rows* — tooling, not schema.
- Flat rows are also what PCPartPicker demonstrably ships at full-market scale (one product page per
  manufacturer part number; even colors are separate products). (fetched)

### The supporting kit (all schema-**optional** → zero forced retrofit of the 327 rows; **template-mandatory** for new rows)

1. **`family: string`** — generation-agnostic platform key (`'rockshox-zeb'`, `'maxxis-assegai'`,
   `'fox-float-x'`). Unlocks UI grouping, sibling lints, "one fetch verifies all siblings" batching,
   supersededBy chains. Backfill the 327 rows in one mechanical pass. Today `sh-floatx`,
   `sh-floatx-60`, `sh-floatx-2062` share nothing machine-readable.
2. **`gen: string`** (free-form — `'B1'`, `'C2'`, `'V3.2'`; SRAM/frames/Fox all use different schemes,
   an enum would block entry constantly) + **`modelYear: number`**. **Policy: a spec-changing
   generation ⇒ NEW rows with new ids; never mutate an existing row's specs** — mutating silently
   changes the verdicts of every previously shared build. The catalog already does this right for
   frames (three Madonna generations as three rows); source URLs are already generation-pinned
   (`rs-sdlx-ult-c2`). Fact-check correction worth keeping: Megatower **V1 = 230×57.5** (160 mm),
   V2 = 230×62.5 stock / 230×65 optional — same name, three shock sizes across gens. (fetched)
3. **`mfgPn: string`** — the manufacturer part number / model code, template-mandatory when the
   source spec table shows one (Maxxis Part#, SRAM model codes). On a 25-row spec page, "the Assegai"
   is not a verifiable claim; "Part # ETB000123" is. Also the join key for the planned drift-checker.
4. **Split policy** (write into the entry template):
   - **New ROW** when a config differs in any engine-read field (wheel, travel, eye×stroke, mount,
     diameter, drop, width, casing, compound, freehub, hub, rotor size…), in price, or in published
     weight. Trim levels (Ultimate vs Select+, Factory vs Performance) stay separate rows — they're
     how buyers shop.
   - **FIELD-only** for fork `offset` (catalog the stock offset per travel×wheel; it changes handling,
     not fit/price/weight).
   - **NOTHING** for color, suspension tune codes (RC2T/HBO, rebound/compression codes), coil spring
     rate, decals.
5. **Tire `casing` + `compound` as structured fields** — the very next grind batch
   (Continental/Schwalbe/Michelin/Pirelli per NEXT-STEPS) is tires; every row entered before these
   fields exist is a guaranteed retouch. Store the maker's own names as vocab values
   (EXO/EXO+/DoubleDown/DH fetched; Schwalbe Super Trail/Gravity/Downhill, Continental Trail/Enduro/DH,
   Specialized GRID enumerated per brand at batch time). Fact-check nuance: Continental couples
   compound to casing (Trail=Endurance, Enduro=Soft, DH=SuperSoft — **three** compounds, not four) —
   more evidence the axes belong to the SKU row. A normalized cross-brand `casingTier` was proposed by
   one auditor and argued against by another ("don't invent a toughness tier in v1"); **defer it**
   (opinion — brand-native values lose nothing and a tier can be derived later).
6. **Frame size = per-size sub-object, NOT variant rows** (extends REVIEW.md #23). Sizes are not
   SKU-like here: one price, identical interfaces, no per-size published weight (RAAW quotes size M
   only) — rows would multiply frames ~5× and make a shared build mean "a Large Madonna" when today it
   means "a Madonna". But the data future rules need IS published per size — RAAW lists max seatpost
   insertion **220/245/268/294/294 mm** across S–XXL (fetched), exactly what the dropper-insertion
   rule needs. **Structure now, populate lazily:** optional `frame.sizes` map (free string keys —
   brands use S–XXL *and* S1–S6-style schemes; don't enum them) → `{seatTubeLen?, maxInsert?}`,
   plus a build-level `frameSize` selection (third key in the share hash; `readHash` already tolerates
   older shapes). The insertion rule then lands dormant per the rule-18 template.
7. **Id recipe for new rows** — see Decision-adjacent §3.1.

### 3.1 Identity: the id scheme is the single most expensive retrofit — fix it in the open window

Current ids are ad-hoc in *meaning* (slug = model `fr-slash`, brand `fw-dt`, brand-abbrev `hb-rf`,
or model+variant in **three different syntaxes**: `fk-zeb-275` wheel, `dp-oneup-349` diameter,
`fk-38-180` travel, `sh-sdu-230625` unparseable digit blob). Collisions are already loaded:
`fk-onyx` is the DVO **Onyx** fork while Onyx Racing Products is a hub brand; `hb-pro` is PRO
(Shimano) while ProTaper is a competing bar brand. (fetched: catalog + known brands)

Ids are load-bearing in four places a rename silently breaks (all verified in code):
share-link hashes (`readHash` drops unknown ids **without error**), `tools/verification-job.json`
(sync **hard-deletes** state for missing ids — destroying Verified/Skipped history, the grind's
institutional memory), catalog cross-refs (`bundledShock`/`forFrame`/`fills`), and hardcoded ids in
golden tests/demo builds/bug-report text.

**Recommendation:**
- **Convention:** `<catPrefix>-<brand>-<model>[-<gen>][-<variant tokens in a fixed per-category
  order>]`, lowercase `[a-z0-9-]` — e.g. `fk-rockshox-zeb-b1-29-170`, `sh-rockshox-sdu-c2-230x62p5`,
  `ti-maxxis-assegai-29-25-exop-mg`, `dp-oneup-v3-316-210`. No "bare default" ids (which of 12 ZEB
  configs deserves `fk-zeb`? whichever came first — forever).
- **Policy: ids are append-only** — never renamed, never reused. Corrections go through a small
  `ALIASES` map (old→new) consumed by `readHash` **and** by verify-job's catalog sync (which should
  tombstone rather than delete state).
- **Migrate the 327 legacy ids now** — one scripted, atomic commit (catalog + cross-refs + tests +
  demo builds + verification-job keys + ALIASES seed). The window is uniquely open: **the app is not
  yet deployed** (Phase 0 still waits on the GitHub repo), so no external share links exist yet.
  After deploy + mass entry this becomes permanently expensive. (opinion — the alternative,
  grandfathering old ids, was proposed by one auditor; with no deployed users the migration cost
  argument collapses, so migrate.)
- **Validator lint:** id charset pattern; first token must match a per-category PREFIX table; warn
  when the second token isn't a known brand slug.

---

## 4. Structural decision B — the discipline tag (and what each discipline actually breaks)

### Recommendation: add the tag NOW; it's the cheapest expensive-looking item on the list

- **`VOCAB.discipline = ['xc','trail','enduro','dh']`** and an **optional `disciplines` enumArray**
  accepted on every category. Semantics: **absence = universal** (saddles, grips, pedals, most
  drivetrain — correct by default). Protocol-mandatory at entry for frame/fork/frontwheel/rearwheel/
  tire; elsewhere only when the maker states intended use.
- **Backfill the current catalog with `'enduro'` by script NOW** — the catalog is uniformly enduro
  *by construction* (CLAUDE.md says so), so the backfill is mechanical today and per-part research
  forever after. This is the single largest avoidable retouch at 2,000+ parts. (opinion, high confidence)
- **Two hard guards:** (a) **`'ebike'` is NOT a discipline** — e-enduro/e-trail/e-XC all exist; e-bike
  is an orthogonal axis (plan a later optional `ebike:true` frame flag + descriptive `motor`/
  `batteryWh` strings — spec-sheet data, not selectable parts). (b) **`disciplines` never feeds
  checkBuild** — a DH tire physically fits an enduro bike; it is a filter/annotation dimension only.
  Structural DH constraints are expressed by real physical fields (crown, axle, steerer).
- **`rideCategory: number` (1–5), optional, capture opportunistically** — the manufacturer-published
  ASTM-style condition rating. The fetched Canyon Strive CFR page (already a verified source URL in
  the catalog) prints "Category 4" with its scope text verbatim — provenance-grade data, unlike
  marketing labels. Don't make it the primary filter (spotty coverage; Condition 4 spans
  trail→enduro). (fetched)

### What each discipline breaks (decide now, implement gated)

- **Hardtails (trail/XC — unenterable today):** `SCHEMA.frame` hard-requires `shockEye/shockStroke/
  shockMount` (+`travel`), so the entire hardtail market cannot validate. Add **required
  `suspension:'full'|'hardtail'`** with a validator cross-rule: `'hardtail'` ⇒ shock block **absent**
  (the oemOnly cross-rule at schema.js:199 is the pattern). Backfill `'full'` by script — provably
  safe, a hardtail cannot currently validate. Keep `maxForkTravel` (hardtails publish it — Santa Cruz
  Chameleon: 130 mm, fetched). Split `FramePart` into a discriminated union in types.js; guard rules
  16/17 (today a hardtail+shock would emit "Frame needs undefinedxundefined"). (fetched)
- **"Complete build" is hard-coded universal:** every slot except grips is required (GROUPS,
  index.html completeness math, golden test). A production DH bike ships a **rigid post, no dropper**
  (fetched: Commencal Supreme DH V5 spec — RIDE ALPHA 31.6×250 rigid); a hardtail has no shock.
  **Design now:** slot requiredness becomes a function of the selected frame (`requiredIf(frame)`
  predicate in GROUPS) — hardtail ⇒ shock not required; DH ⇒ dropper not required. Implement with the
  first non-full-sus/DH frame.
- **DH hardware:** dual-crown forks use **straight 1-1/8" steerers and 20x110 Boost axles** (fetched:
  BoXXer Ultimate — also 2,880 g, min rotor 200; Fox 40 — "1.125 Straight", 20TAx110). Three gaps:
  `crown:'single'|'dual'` (optional, absent=single), `frontAxle` +`'20x110Boost'`, `steerer`
  +`'straight-1125'` — **and rule 11's `fork.steerer === frame.headset` equality must become a compat
  matrix before these values land** (straight-in-tapered works via reducer cups = warning; the reverse
  is impossible = error), or every DH fork false-reds in every DH frame. Direct-mount stems need
  optional `stem.mount:'steerer'|'direct'` (absent=steerer; zero backfill). Add `dualCrownOk` dormant
  frame warning per the rule-18 template.
- **DH drivetrain falsifies rule 3's one-speed model:** SRAM's own X01 DH page (fetched RD-X0-1DH-A3)
  specs the 7-speed derailleur with an **11-speed chain**. Chain "speeds" is really a width class.
  Before the first non-12s part: drop the chain from the speeds-equality set and check it via a small
  system↔chain-width map. Also add `system:'sram-dh-7'` then.
- **XC costs almost nothing** — its distinguishing dimensions are already plain numbers (100–120 mm
  travel, 160 rotors, 27.2 diameters, 190×45 shocks, 2 pistons). Residual gaps gated on sourced parts:
  `brakeMount:'FM'` (flat-mount creep — **not yet confirmed on any mainstream MTB frame page**; add
  when fetched), `frameBb` PF30/BB30 (Cannondale; spec pages JS-gated — verify manually first),
  remote lockout as display-only field.
- **E-bike: defer wholesale** (opinion, unanimous across auditors): motors/batteries are
  OEM-designed-in proprietary systems (no cross-brand motor swaps exist); Bosch and Shimano pages
  403 automated fetching, so verification would stall under the project's evidence bar. When it
  lands: `eRated` flags on fork/wheel/tire (makers publish per-model e-approval — fetched Schwalbe
  "E-50" rating, Reserve "E-Bike Approved: Yes"), LinkGlide system values (§6), motor/battery as
  **bundled frame attributes** (the `bundledShock` precedent), not pick-parts.

---

## 5. The full prioritized list

### 5.1 DO BEFORE mass data entry — structural & semantic (expensive-later class)

Each: **what → why → example → effort**.

1. **Flat-SKU variant model + family/gen/modelYear/mfgPn + split policy** (§3) → prevents re-keying
   every row when variants formalize → Maxxis Assegai (25 SKUs/page) → **M**.
2. **Id convention + append-only policy + ALIASES + tombstoning verify-job sync + legacy migration**
   (§3.1) → ids are the one thing you can never cheaply change; migration is only cheap pre-deploy →
   `sh-sdu-230625` vs `fk-onyx`/Onyx-hubs collision → **M**.
3. **`disciplines` tag + `'enduro'` backfill + `suspension` discriminator + conditional-requiredness
   design** (§4) → last moment the backfill is mechanical; hardtails currently unenterable →
   Santa Cruz Chameleon; Supreme DH V5's rigid post → **M**.
4. **Write `tools/DATA-ENTRY-TEMPLATE.md`** → every model ambiguity otherwise becomes a per-row
   judgment call made hundreds of times, inconsistently; the existing id zoo and the fabricated
   "Aeffect R DUB" row are what template-free entry produced at just 327 parts → **S**. Contents:
   per-category required + template-mandatory fields, id recipe + worked examples, split policy,
   manufacturer-wording→vocab mapping ("T-Type Actuation" → `sram-transmission`+`cable`; "24mm steel
   spindle" → `24mm` not DUB; "rings sold separately" → `ring:null`), weight-basis conventions.
5. **`crankBb` redefined as spindle interface** — add `'30mm'`, `'p3'`, rename `SH24`→`'24mm'`
   (interface, not brand) → the catalog already holds **two fictitious products** created by the
   too-narrow vocab: `cr-rf` "Aeffect R DUB" (real part: 24 mm steel Cinch spindle — fetched
   raceface.com) and `cr-e13` "Plus DUB" (P3); every non-SRAM/Shimano crank brand hits this wall →
   **S**. (Extends REVIEW.md #20; DUB-Wide is a *chainline*, not a new spindle value.)
6. **Make crank `ring` optional / `ringStd` nullable** → required fields force fabricated values on
   armset-only cranks (Race Face "rings sold separately", eeWings), and the fabricated
   `'standard-12'` on eeWings **false-reds a manufacturer-supported build today** — current 8-bolt
   eeWings are designed for SRAM T-Type rings, but rule 3c errors them against `ch-flattop` →
   fetched canecreek.com → **S**. Rule 3c: skip on null + info "fit a T-Type (8-bolt) ring".
7. **Cassette `range` → numeric `minCog`** (+ validator lints `minCog < maxCog`, `HG ⇒ minCog ≥ 11`)
   → min cog drives a real freehub constraint (10T needs XD/MicroSpline; HG floor is 11T — why NX is
   11-50) and the string invites divergence; format changes are trivial at 9 rows, painful at 100 →
   SRAM PG-1230 (HG, 11-50) vs XG-1275 (XD, 10-52), both in catalog → **S**. (Extends REVIEW.md #28.)
8. **Crank `chainline` free string → number (mm)** → today's values are unvalidated and **wrong**:
   T-Type cranks are 55 mm but `cr-x0t`/`cr-xx-t` say `'Boost'` (52) — fetched sram.com FC-X0-D1
   lists "55.0mm, 76.5mm"; GX lists 49/52/56.5/66.5/76.5 → **S**. Display-only now; enables the
   deferred SuperBoost *info* later.
9. **Brake `leverClamp` scalar → array (`leverAccepts`) + widen values** → real levers accept
   MULTIPLE standards via the maker's own clamps (fetched: Hayes Peacemaker "I-Spec II/EV / MatchMaker",
   Magura Shiftmix, Hope direct mounts) and 13 of 21 catalog brakes are currently untaggable; Saint/Zee
   are I-Spec **B** — a scalar can't express any of this, and only 8 rows carry the field today →
   **M**. Values: `ispec-ev, ispec-ii, ispec-b, matchmaker` (membership check in rule 19; the array
   itself expresses Shiftmix/Peacemaker capability).
10. **Head-tube standard capture** → the frame pages being verified publish SHIS values the schema
    discards (fetched RAAW: "56/56 Zero stack" = ZS56/ZS56). **Keep `frame.headset` as the
    steerer-fit field** (it's what rule 11 consumes; every listed SHIS standard accepts a tapered
    steerer via cups) **and add optional `headTubeUpper`/`headTubeLower`** (SHIS vocab: ZS44/28.6,
    **ZS56/28.6**, ZS56/40, IS41/28.6, IS42/28.6, IS52/40, EC34/28.6, EC44/40 — illustrative, not
    exhaustive; the fact-check added ZS56/28.6, which RAAW's own upper cup needs) captured during
    frame verification → prerequisite for a future headset category → **M**. (Editorial resolution:
    one auditor proposed *repurposing* the required `headset` field — rejected; a semantic change to
    a required rule-consumed field is the riskier path when optional capture fields get the same data.)
11. **`forFrame` → `forFrames: string[]`** → OEM shocks ship across multiple frames; 1:1 forces
    duplicate rows; exactly one row uses it today → **S**.
12. **Pin price semantics: manufacturer US MSRP in USD** (doc + comment; optional `currency` only if
    non-USD storage is ever allowed) → mixed MSRP/street/converted meanings across 3,000 rows can
    never be untangled later → RAAW note: the en-us store publishes native USD (live $2,738 vs stored
    2733 — the drift itself is the argument for `lastChecked`-as-price-date, not for a currency
    field) → **S**.
13. **Provenance decisions** → **(a)** decide the measured-weight policy NOW and add optional
    `sourceType` (`manufacturer`/`manufacturer-doc`/`measured`/`retailer`, absent = manufacturer);
    recommendation (opinion): accept `measured` for **weight only**, interfaces stay
    manufacturer-sourced; **(b)** the **rotor category can never verify under the current bar** —
    fetched SRAM HS2 page publishes no weight; decide (a) or an interface-verified provenance tier
    before the rotor batch, or the "✓ Verified only" filter shows an empty category forever;
    **(c)** archive snapshots: source rot is already live — the verified OneUp dropper's stored URL
    (`…/dropper-post-v2`) now serves the V3 page; add optional `archiveUrl` + a save-a-snapshot
    protocol step → **S–M**.
14. **Lifecycle: optional `status` (`current`/`discontinued`/`recalled`, absent=current) +
    `supersededBy` (id-validated)** → the catalog already holds three unlinked Madonna generations;
    discontinued parts must stay (used-parts builds are core); recalls are real in bike components —
    the CPSC-recalled bonded Hollowtech II cranks were **road** models (Ultegra FC-6800/R8000,
    Dura-Ace FC-9000/R9100 — fact-check corrected the auditor's "XT-class" example) → capture status
    at entry while the verifier is on the page → **S**.
15. **Weight-basis conventions + optional `soldWithout` enumArray**
    (`battery`/`charger`/`spring`/`rotor`/`mounting-hardware`) → verified weights are otherwise
    silently non-comparable: fetched sram.com RD-GX-E-B1 lists 470 g explicitly "**without
    Battery**" ("AXS battery and Pod controller available separately"); fetched EXT Storia **V4**
    page prints "**Spring Sold Separately**" (the V3 included springs — policy changed!); fetched
    RockShox Super Deluxe Coil page quotes 902 g **with** a 350 lb spring. Convention: coil-shock
    weight = damper **without** spring (convert/flag with-spring figures); brake weight = the
    maker's per-brake figure with quoted config noted in `desc` (prefer rear — fetched Maven: "362 g
    rear, organic pads, no rotor" vs catalog's 315) → **S**. (Supersedes a separately-proposed
    `springIncluded` bool.)
16. **Vocabulary widening bundle** → §6 table → **M** total.
17. **Cheap validator guards** → `KNOWN_VALUES` warn-only whitelists for free numbers (rotor size
    {140,160,180,183,200,203,205,220,223}, dropper/seatTube diameters {27.2,30.9,31.6,34.9}, clamp
    {25.4,31.8,35}, speeds {9,10,11,12,13}) so a typo'd `size:2003` can't ship silently; id lint;
    sibling-differ lint (two rows sharing `family` must differ in ≥1 structured field); wheelset
    fills agree on size+brand; preset **weight derived from fills** (kills REVIEW.md #12's impossible
    bundles); specSummary non-empty invariant → **S**.
18. **Structured verdict objects** `{ruleId, slots, severity, fix?}` replacing string-matched
    errors → code-only, no rows touched, and it: fixes the REVIEW.md #4/#13 masking root cause,
    enables the **"fits with adapter X"** verdict tier (fix: `{kind:'adapter', name:'Shimano
    SM-RTAD05'}`), and gets strictly more expensive as the app grows → **M**. Adapter facts stay an
    **engine-side table keyed by standards-pair + direction** — they are properties of pairs, not
    parts; zero new part fields; a general requires/provides graph is rejected (0..n adapters have no
    slot in the Build map). (opinion + fetched SM-RTAD05)
19. **BB category: decide now** (the one adapter that IS a purchasable part with a natural slot) →
    two required fields only (`shell` = frameBb vocab, `spindle` = crankBb vocab); rules: error vs
    `frame.bb` / vs `crankset.bb`; retires rule 7's blanket info; slot optional-but-counted so old
    share links stay valid → every real build needs one (~$45+/76 g — fetched SRAM DUB BSA) and
    totals omit it today → land with or right after the crankBb fix, **before** goldens/presets
    multiply → **M**. (Builds on REVIEW.md #26.)

### 5.2 DO BEFORE — the entry-time capture checklist (page-visit asymmetry)

These are *optional* fields that are cheap in schema but expensive to backfill because the data lives
on the pages the grind is already fetching. Freeze them into the template so verification captures
them opportunistically. (All fetched examples.)

- **frame:** `minRotorR`, `brakeMountSize` (native PM size — RAAW states "203 mm post mount"),
  `minForkTravel` (REVIEW #14), `coilApproved` (REVIEW #21 — RockShox's own coil page warns "do not
  swap OEM air for coil unless specified by your frame manufacturer"), `material` (+steel/ti vocab),
  `iscg` (`'iscg05'|'none'` — enables the chainguide category; OneUp's guide page blacklists specific
  frames *including the catalog's Meta SX V5*, so the future rule checks tab presence only, never
  clearance), `headTubeUpper/Lower`, `sizes.maxInsert` per size, `storage`, `rideCategory`,
  `disciplines`, `status`, `gen`/`modelYear`, `mfgPn`.
- **fork:** `spring` (air/coil — the catalog's coil forks are indistinguishable today; note the
  fact-check: **Domain RC is air-sprung** (DebonAir), the real coil example is Push Nine.One),
  `offset` (variant-defining: ZEB 44 vs 51), `maxTire` (**unit decision: inches** to match
  tire.width/frame.maxTire — ZEB publishes 81 mm, convert at entry), `crown` (when DH),
  `brakeMountSize`, `disciplines`.
- **shock:** `climbSwitch` (SKU-splitting — fact-check correction: the with/without-lever SKU split
  belongs to the Fox Float **X2**, not the Float X, whose all three trims have the 2-pos lever),
  `soldWithout:['spring']`, `gen`.
- **wheels:** `freehubOptions` (REVIEW #7 — note the corrected evidence: Reserve's configurator
  offers a *hub* choice, not a freehub choice; swappability is real but post-purchase via ratchet
  bodies/conversion kits), `minTire` (Reserve publishes a 2.2–2.6" range), `material`, `spokes`,
  `maxSystemWeight`, `ebikeApproved`.
- **tire:** `casing`, `compound`, `minRimWidth`/`maxRimWidth` (Maxxis: "optimized for 30–35 mm
  internal" — converts the deferred tire-vs-rim rule to the sourced rule-18 template), `etrto`,
  `tubeless`, `ebikeRating`.
- **rotor:** `thickness` (SKU-splitting: Galfer Wave sold in 1.8 **and** 2.0 mm; SRAM HS2 headlines
  2.0 mm; Shimano ~1.8 mm per retailers — Shimano's own page 403s, mark unverified) — also the datum
  a future caliper-clearance rule needs (dormant until per-brake data is fetched).
- **dropper:** `totalLen` + `minInsert` (OneUp publishes full dimension charts — REVIEW #23's data
  side is capturable today), `actuation` (+`'hydraulic'` vocab value — pre-AXS Reverbs), `remoteIncluded`
  (OneUp and Reverb AXS both sell the remote separately — a $50–90 hole in totals).
- **saddle:** `rails` (`'7x7-round'|'7x9-oval'` — a real clamp-fit constraint; cite WTB Volt Carbon's
  published "7mm x 9mm"; the fact-check found SDG's page does *not* state dimensions), `railMaterial`,
  `width`.
- **grips:** `attach` (`'lock-on'|'slide-on'`) — **fixes a live display falsehood**: specSummary
  hardcodes 'lock-on' and the catalog's ESI Chunky is slide-on silicone.
- **crankset:** `armLength` (the config the verified weight names — SRAM quotes "DUB 175mm Boost 32t"),
  `armLengths` (offered options; Eagle 70 adds 155/160 mm), `ringMount` (later; vocab reserved).
- **derailleur:** `cage` (`'long'|'mid'` + one-row-per-cage convention — XT SGS 10-51 vs GS 10-45;
  XTR Di2 M9250 SGS 10-51 vs GS 9-45).

### 5.3 Safe to add LATER (genuinely cheap later — listed so they aren't re-litigated)

- **New categories:** headset (after headTube fields populate), chainguide (`mount`,`minRing`,`maxRing`;
  frame.iscg captured now), **seatpost** (rigid — DH/budget; requires the slot to accept a category
  LIST `['dropper','seatpost']`, a small SLOTS/fills change), spring (rate/stroke-range; never rate
  recommendations), accessories tier (explicitly out for v1 — one generic price-only category later
  if ever, per the PCPartPicker analog).
- **DH package** (gated on the discipline decision): `crown`, `stemMount`, `frontAxle:'20x110Boost'`,
  `steerer:'straight-1125'` + the rule-11 compat matrix + tests (rules 2-front/11 go from dead to
  live — REVIEW #15's tests ship in the same commit), `frameBb:'BSA83'/'PF107'`, `system:'sram-dh-7'`
  + the rule-3 chain-width redesign, `wheel:'26'` only if dirt-jump/legacy ever enters.
- **E-bike package** (§4): `ebike` flag, `motor`/`batteryWh` descriptive, `eRated`, LinkGlide values
  (pre-registered in §6 since they also serve budget bikes), battery vocab (`'sram-axs'`,
  **`'shimano-di2'`** — fact-check correction: Shimano's Di2 battery (BT-DN320) is *removable* and
  sold separately, not built-in; name the value accordingly).
- **Display-only field backlog:** `etrto`, `tubeless`, `backsweep`/`upsweep`, `climbSwitch`,
  `resStyle` (`inline`/`piggyback` — display only, never a clearance rule), `axleToCrown` (spec-sheet
  PDFs, low value now), `fluid` (`dot`/`mineral` — **never a rule**), `hangerModel`, `storage`,
  wheel `spokes`/`maxSystemWeight`, `brakeEnd`, `shockHardware` (e.g. "8x30mm" — shopping-list info;
  hardware matching stays out of the engine), pad shape/compound (**out of scope** — consumables).
- **Family-collapsed picker UI** — render-time grouping over `family` + structured axes; zero data
  migration once the fields exist (the strongest argument for two-level data, neutralized).
- **Staleness tooling** — `verify:report` stale bucket (lastChecked > 12 months), `reset --stale`;
  derived entirely from existing fields, hence safely later.
- **Complete-bike presets** — PRESET_CATS couples preset↔group 1:1; `fills` already spans arbitrary
  slots, so only that coupling blocks it. Decide "post-beta or never"; don't drift into it.

### 5.4 Explicitly OUT of scope (decided, with reasons — don't re-add)

- **Air-can/reservoir/yoke clearance** — manufacturers express it only as per-frame approved-shock
  lists; any field-based rule would guess (violates the false-verdict bar). Escape hatch if demand
  appears: optional `frame.approvedShocks` allowlist, info-level only.
- **Full geometry engine / head-angle math** — only reach/seatTubeLen/maxInsert earn capture (a
  plausible rule consumes them); the rest waits for a committed geometry feature.
- **Brake pad shape/compound, fluid-as-rule, chain lube/sizing, tubeless valves/sealant/inserts,
  shock bushing hardware kits, seatpost clamps** — consumables/universal accessories with no
  pair-discriminating fit dimension; one static "what's not in the total" UI note covers them.
- **Rider-weight-dependent anything** (spring rates, wheel weight limits as rules) — the app has no
  rider-weight concept; keep `maxSystemWeight` display-only.
- **Center Lock lockring internal-vs-external** — a $10 tooling/accessory nuance, below the adapter
  threshold; revisit only if 20 mm-axle DH hubs land (info-level ceiling).
- **XDR / N3W freehubs, road/gravel** — no MTB products; pin the `'HG'` semantic as "MTB-length HG
  spline" in a comment so a future road expansion knows to split rather than conflate.

---

## 6. Controlled-vocabulary master widening list

Legend: **now** = before mass entry (blocks real parts); **gated** = add with the named discipline/
tier, values enumerated here so nothing is discovered mid-batch; *(inert)* = equality-checked only,
safe to pre-add; *(needs rule)* = value demands new engine logic — ship with tests, not just vocab.

| Vocab | Add **now** | Add **gated** | Notes |
|---|---|---|---|
| `system` | `shimano-linkglide`, `shimano-11`, `shimano-10`, `sram-11` *(inert)* | `microshift-advent-x`, `microshift-advent`, `box-prime9`, `sram-dh-7` (DH; needs the rule-3 chain redesign) | First sub-$2,000 bike or e-bike hits LinkGlide immediately (fetched Shimano C-649: LinkGlide is HG-only, deliberately incompatible with Hyperglide+ 12s). Eagle 90/70 needs **no** new value. |
| `rearAxle` | `142x12` *(inert)* | `150x12` (legacy DH), QR values (budget — defer) | **Do NOT add `'157DH'`** — refuted; 12x157 is one fitment standard (see §2). |
| `frontAxle` | — | `20x110Boost` (DH), `20x110` (pre-2021 DH, distinct), `15x100`, `9x100QR` *(inert but revives dead rule 2-front — ship REVIEW #15's tests with the first widening)* | Naming: existing `Boost110` omits diameter; new values shouldn't. |
| `steerer` / `headset` | — | `straight-1125` (DH), `18` (e-MTB), `od2` (legacy Giant) — ***(needs rule)***: rule 11 equality → compat matrix first | Fetched: BoXXer/Fox 40 straight 1-1/8; 1.8 e-MTB standard (ZS66 lowers exist from Works/Acros). |
| NEW `headTube` (SHIS pair fields) | ZS44/28.6, ZS56/28.6, ZS56/40, IS41/28.6, IS42/28.6, IS52/40, EC34/28.6, EC44/40 — capture fields now, extend as sourced | | Illustrative list, not exhaustive (fact-check added ZS56/28.6 — RAAW's own upper). |
| `frameBb` | comment: PF92 covers BB92/89.5 family; **define T47 semantics before the first real T47 frame** (85.5-internal vs 68/73-external are different products) | `BSA83`, `PF107` (DH); `PF30`/`BB30` (XC/Cannondale — verify manually, spec pages JS-gated) | The catalog's only "T47" (fr-slash) is a **data error** — Trek's own FAQ says the Slash is BSA 73 (see §8). |
| `crankBb` | `30mm`, `p3`, rename `SH24`→`24mm` | e-motor spindles (with e-bike) | Blocks Race Face/e*thirteen/Hope/Cane Creek today; two catalog rows already fictitious. |
| `freehub` | — (pin `HG` = MTB-length in a comment) | `XDR`/`N3W` never (road) | All budget systems verified to ride existing `HG`. |
| `brakeMount` | — (keep numeric minRotor/maxRotor as the size model — **decided**: no PM6/PM7/PM8 enum; proprietary mounts reduce to min=max) | `IS` ***(needs rule: per-size IS→PM adapters)***, `FM` (only when fetched on a real MTB frame) | |
| `material` | `steel`, `ti` *(inert)* | `cromoly`, `stainless` (if saddle railMaterial reuses it) | Whole brands blocked otherwise (Cotic, Starling, Ti bars/rails). |
| `ringStd` | — | `standard-8-11` (with budget systems) | Prevents budget rings being falsely tagged `standard-12`. |
| `shifterClamp` / `leverAccepts` | `ispec-ii`, `ispec-b` (+ the scalar→array change, §5.1-9) | | Saint/Zee are I-Spec B; M8000-era is I-Spec II — both incompatible with EV. |
| `actuation` | — | `hydraulic` (with dropper.actuation) | Shifter/derailleur side is market-complete (wireless XTR Di2 still = `electronic`). |
| `shockMount` | — | `bearing` (first bearing-eyelet row — Vivid sells one, fetched) | Otherwise market-complete. |
| `wheel` / `wheelConfig` | — | `26` (dirt-jump/legacy only) | Deliberately excluded for now. |
| NEW `casing` / `compound` | Maxxis values now (tires are the next batch): `exo, exo-plus, doubledown, dh` / `dual, 3c-maxxterra, 3c-maxxgrip` | Schwalbe/Continental/Specialized values enumerated per brand at batch time | Continental couples compound to casing (3 compounds, not 4). |
| NEW `discipline` | `xc, trail, enduro, dh` | — | `ebike` deliberately not a value. |
| NEW `suspension` | `full, hardtail` | — | Required frame discriminator. |
| NEW `sourceType` | `manufacturer, manufacturer-doc, measured, retailer` | — | Absent = manufacturer; `retailer` named so the validator can explicitly reject it for `verified`. |
| NEW `status` | `current, discontinued, recalled` | — | Absent = current. |
| NEW `soldWithout` | `battery, charger, spring, rotor, mounting-hardware` | — | |
| NEW (later) | `iscg` (`iscg05,none`), `crown` (`single,dual`), `stemMount` (`steerer,direct`), `cage` (`long,mid`), `gripAttach` (`lock-on,slide-on`), `saddleRail` (`7x7-round,7x9-oval`), `battery` (`sram-axs, shimano-di2, coin-cell`), `brakeFluid` (`dot,mineral`), `brakeEnd` | | `gen` and frame-size keys are deliberately **free strings**, not vocabs (per-maker schemes; an enum would block entry constantly). |

**Free-number fields stay numbers** (rotor size, diameters, speeds, clamp) — guarded by the
`KNOWN_VALUES` warn-lints (§5.1-17) instead of vocabs, so a new real standard never blocks entry but
a typo never ships silently.

---

## 7. Recommended final column set per category

Common to all parts (identity/provenance/lifecycle — §3/§5): `id` (new convention), `cat`, `brand`,
`model`, `price` (USD MSRP), `weight?`, `desc?`, **new optional:** `family`*, `gen`, `modelYear`,
`mfgPn`, `disciplines`, `status`, `supersededBy`, `sourceType`, `archiveUrl`, `soldWithout` + the
existing provenance trio. (* = template-mandatory for new rows.)

Legend: **R** required · O optional · ⊕ new · *(entry)* = on the entry-capture checklist ·
consumer: rule N / future-dormant / display.

**frame** — R: `wheelConfigs`, `rearAxle`, `headset` (steerer-fit — semantics pinned), `bb`,
`seatTube`, `brakeMount`, `maxRotorR`, `maxForkTravel`, `udh`, `frameOnly`, ⊕`suspension`
(full ⇒ `shockEye`/`shockStroke`/`shockMount` required; hardtail ⇒ forbidden), `travel` (full-sus).
O: `maxTire`*(entry)*, `bundledShock`, ⊕`headTubeUpper`/`headTubeLower`*(entry)*,
⊕`minRotorR`*(entry)*, ⊕`brakeMountSize`*(entry)*, ⊕`minForkTravel`*(entry)*,
⊕`coilApproved`*(entry)*, ⊕`material`*(entry)*, ⊕`iscg`*(entry)*, ⊕`sizes` (map: name →
{seatTubeLen?, maxInsert?})*(entry)*, ⊕`rideCategory`, ⊕`storage`, later ⊕`dualCrownOk`,
⊕`approvedShocks`, ⊕`ebike`/`motor`/`batteryWh`.

**fork** — R: `wheel`, `travel`, `axle`, `steerer`, `brakeMount`, `maxRotorF`. O: `minRotorF`*(entry)*,
⊕`spring`*(entry)*, ⊕`offset`*(entry)*, ⊕`maxTire` (inches)*(entry)*, ⊕`brakeMountSize`*(entry)*,
⊕`crown` (absent=single), ⊕`axleToCrown`, ⊕`lockout`, ⊕`eRated` (later).

**shock** — R: `eye`, `stroke`, `mount`, `spring`. O: `oemOnly`, ⊕`forFrames` (replaces `forFrame`),
⊕`climbSwitch`, ⊕`resStyle`; weight basis: damper without spring + `soldWithout:['spring']`.

**frontwheel / rearwheel** — R: `wheel`, `hub`, `rotorMount`, `intWidth`, `maxTire`; rear also
`freehub` (stock config). O: ⊕`freehubOptions`*(entry)* (rear), ⊕`minTire`, ⊕`material`, ⊕`spokes`,
⊕`maxSystemWeight`, ⊕`ebikeApproved`.

**tire** — R: `wheel`, `width` (labeled inches — semantics unchanged). O (template-mandatory for new
rows): ⊕`casing`*, ⊕`compound`*; O: ⊕`minRimWidth`/`maxRimWidth`*(entry)*, ⊕`etrto`, ⊕`tubeless`,
⊕`ebikeRating`. Id encodes tread+size+casing(+compound).

**rotor** — R: `size`, `mount`. O: ⊕`thickness`*(entry)*. Category verification policy decided
before its batch (§5.1-13b).

**shifter** — R: `system`, `speeds`, `actuation`. O: `clampType` (+ispec-ii/-b values).
**derailleur** — R: `system`, `speeds`, `actuation`, `maxCog`, `mount`. O: ⊕`cage` (one row per cage
variant), ⊕`battery` (later).
**cassette** — R: `system`, `speeds`, `freehub`, ⊕`minCog` (replaces `range` — derive the display
string), `maxCog`.
**chain** — R: `system`, `speeds` — sufficient (Flattop/HG+/LinkGlide tiers are all expressed by
`system`); the DH/width redesign changes the *rule*, not the columns.
**crankset** — R: `bb` (spindle interface), `speeds`, `ringStd` (nullable = ring user-fitted).
O: `ring` (now optional), ⊕`chainline` (number, mm), ⊕`armLength`*(entry)*, ⊕`armLengths`,
⊕`ringMount` (later).
⊕**bb (new)** — R: `shell` (frameBb vocab), `spindle` (crankBb vocab). Nothing else.

**brake** — R: `mount`, `pistons`. O: ⊕`leverAccepts` (array, replaces `leverClamp`), ⊕`fluid`
(display), later ⊕`brakeEnd`. One row per model; weight = maker's per-brake figure, config noted in
desc (prefer rear).
**handlebar** — R: `clamp`. O: `width`, `rise`, `material`, ⊕`backsweep`/`upsweep`. (Number-typed
`clamp` already admits 25.4/26.0 legacy sizes — no vocab needed.)
**stem** — R: `clamp`. O: `length`, ⊕`rise` (pick deg or mm, document), ⊕`mount` (later, DH).
**grips** — O: ⊕`attach` (fixes the specSummary falsehood), ⊕`diameter`. No rule (22.2 mm interface
universal — known).
**dropper** — R: `diameter`, `drop`. O: ⊕`actuation` (+hydraulic), ⊕`remoteIncluded`,
⊕`totalLen`*(entry)*, ⊕`minInsert`*(entry)*. One row per diameter×drop.
**saddle** — O: ⊕`rails`, ⊕`railMaterial`, ⊕`width`. Rail version = separate row (weight/price differ).
**pedal** — R: `style`. Confirmed complete; document the deliberate non-rule.
**presets** — `fills` + `price` (R); **drop stored `weight`** (derive from fills). Wheelset entry
convention: 3 rows per real product, component prices = per-wheel MSRP when published else flagged;
lint: fills agree on wheel size + brand.
⊕**seatpost / headset / chainguide / spring** — column sets in §5.3, land with their categories.

---

## 8. Catalog data errors surfaced in passing (fix list — NOT applied by this review)

Sample-data errors found while auditing the model; each would otherwise poison future rules:

1. **`cr-rf` "Race Face Aeffect R DUB"** — nonexistent product; real part is a 24 mm steel Cinch
   crank ("slides right into a Shimano Hollowtech BB" — fetched raceface.com). Blocked on the
   crankBb vocab fix.
2. **`cr-e13` "e*thirteen Plus DUB"** — nonexistent (P3 spindle); already REVIEW.md #20/appendix.
3. **`cr-eewings`/`cr-rf` fabricated `ring`/`ringStd`** — creates a live rule-3c false red vs
   T-Type chains (fetched canecreek.com: current 8-bolt eeWings pair with SRAM Transmission rings).
4. **`cr-x0t`/`cr-xx-t` `chainline:'Boost'`** — SRAM lists 55.0 mm (DUB Wide) for T-Type cranks
   (fetched FC-X0-D1).
5. **`fr-slash` `bb:'T47'`** — Trek's own Slash FAQ (fetched) says **BSA 73 threaded** (Gen 6);
   earlier gens were BB92-family. No Slash generation uses T47 (that's Trek's road line).
6. **`fr-giga` `udh:false`** — the Nukeproof Giga uses SRAM's UDH (fetched review + Nukeproof's own
   UDH spare listed for Mega/Giga). Also invalidates using it as a "proprietary hanger" example.
7. **`bk-maven` weight 315 g** — SRAM quotes 362 g (rear, organic, no rotor); basis undefined
   (fetched db-mvn-ult-a1) — the weight-convention finding's poster child.
8. **`fk-domain`** — if/when the fork `spring` field lands: Domain RC is **air** (DebonAir per
   fetched SRAM page); do not tag it coil.
9. **OneUp dropper source URLs** (`dp-oneup`, `dp-oneup-349`) point at `…/dropper-post-v2`, which now
   serves the V3 page — fix at next touch; the archive-snapshot policy prevents the class.
10. **`ti-kryp-29` "Kryptotal 29x2.4"** — unidentifiable SKU: Kryptotal ships as Fr and Re in three
    coupled casing/compound tiers (fetched continental pages); nameable only once casing/compound
    fields exist.
11. **`fr-madonna-v32` price 2733** vs live $2,738 — price drift; `lastChecked` is doing the work of
    a price-date field (accepted; see §5.1-12).
12. **specSummary hardcodes 'lock-on'** for all grips — false for `gr-esi` (slide-on silicone).

---

## Appendix A — claims marked *unverified* (check before acting)

- Shimano RT-MT800 rotor thickness ~1.75–1.8 mm: retailer-corroborated only (bike.shimano.com 403s).
- Flat-mount rear on the 2025 Canyon Exceed: review-reported, not confirmed on a canyon.com page.
- Cannondale PF30/BB30 current models: spec tables JS-gated; verify via manual/PDF before adding values.
- e*thirteen P3 interface details: echoed from REVIEW.md #20, no e*thirteen page fetched this session.
- ZEB B1 = "2027 model year": generation confirmed current (Charger 3.2), year label unconfirmed.
- Specialized Enduro uses S1–S6 sizing: the S-Sizing scheme is real (known); the exact span for the
  Enduro was not fetched.
- Shimano Di2 BT-DN320 battery capacity ~310 mAh: search-corroborated only.

## Appendix B — refuted claims (corrections; do not re-propose)

1. ~~RockShox Domain RC is coil~~ → **air** (DebonAir; only pre-~2015 Domains were coil).
2. ~~Fox Float X sold with/without climb lever~~ → all three Float X trims have the 2-pos lever; the
   SKU split belongs to the **Float X2**.
3. ~~Megatower V1 = 230×62.5~~ → **V1 = 230×57.5** (160 mm); V2 = 230×62.5 stock, 230×65 optional.
4. ~~Reserve 30|HD offers freehub choice at purchase~~ → the configurator offers a **hub** choice
   (DT 350 vs e13); freehub is a fixed spec line; swappability is post-purchase.
5. ~~Shimano XTR Di2 battery is built-in/non-swappable~~ → **removable** BT-DN320, sold separately.
6. ~~10 brake rows carry leverClamp~~ → **8 of 21**.
7. ~~SDG publishes 7×9 mm rail dims~~ → SDG's page says only "Rail Carbon"; cite **WTB Volt Carbon**.
8. ~~DH-157 hubs ≠ SuperBoost157, need own vocab value~~ → **one 12x157 fitment standard**; a
   `'157DH'` value would create false reds (the exact failure the project fears most).
9. ~~Proposed headTube list covers the examples~~ → it omitted **ZS56/28.6** (RAAW's own upper);
   treat the list as illustrative.
10. ~~Assegai = 16×29 + 9×27.5~~ → **15×29 + 10×27.5** (25 total correct).
11. ~~Kryptotal has four compounds~~ → **three**, coupled 1:1 to casing.
12. ~~RAAW prices only in EUR (currency-field motivation)~~ → RAAW's en-us store publishes native
    USD; the observed delta is *price drift*, not conversion.
13. ~~CPSC-recalled cranks were XT-class~~ → they were **road** models (Ultegra/Dura-Ace bonded
    Hollowtech II).
14. ~~GX AXS upgrade kit includes chain-gap tool~~ → T-Type kit = derailleur body + battery + pod +
    PowerLock (+charger, likely); the chain-gap tool belongs to the older non-Transmission kit.
15. ~~Nukeproof Giga runs a proprietary hanger (udh:false correct)~~ → the Giga **uses UDH**;
    `fr-giga.udh` is a catalog error (§8-6).
16. ~~Trek Slash has a T47 shell~~ → **BSA 73** (Gen 6, Trek's own FAQ); the catalog's T47 value is
    itself the error (§8-5).
