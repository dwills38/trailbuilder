# CLAUDE.md — TrailBuilder

Context for Claude Code working on this project. Read this before making changes.
**Current status + immediate next steps: see [`NEXT-STEPS.md`](NEXT-STEPS.md).**

## What this is

TrailBuilder is a parts-compatibility builder for enduro mountain bikes: pick parts and it checks, in
real time, whether they fit together, plus running price and weight. It's an early
prototype that runs entirely in the browser from a small built-in catalog.

**Catalog specs, prices and weights are SAMPLE DATA — approximate and unverified — except
the few parts that carry provenance fields (`verified:true` + `source`).** Do not present
unverified specs as real. See "Provenance" below.

## Hard rules (Douglas — non-negotiable)

1. **E-BIKES ARE CONTAINED (rule amended on Douglas's explicit word, 2026-07-18).** The MTB
   catalog (`src/compat.js` `PARTS`) remains **100% e-bike-free permanently** — no e-bike / e-MTB /
   motor / battery / e-specific part may EVER enter it, and no other catalog gains e-parts either.
   The ONLY e-bike surface is **BuildMyEMTB** (`data/emtb.js` + its own schema/validator + a future
   separate `emtb.html` page — the BuildMyBMX pattern), authorized reluctantly and explicitly by
   Douglas 2026-07-18, off-live until his flip word. Douglas dislikes this domain: keep every
   e-MTB decision routed to him as a compact packet, never spec-level detail.
2. **NO POP-UP ADS / UNSOLICITED POP-UPS, EVER.** The site loads straight to the data — never an ad,
   newsletter/promo/cookie interstitial, or any auto-appearing pop-up, for any reason. Click-triggered
   cards/tabs/modals the user opens themselves (a part's spec card, the login dialog) are fine;
   anything that appears WITHOUT the user asking is banned. No monetization pattern may ever use a pop-up.
3. **Catalog scope:** MTB now (rounding out every MTB category; **hardtails are a near-term LIVE
   priority**), expanding to ALL bike types over time. New non-MTB types (kids' balance bikes /
   striders, road, gravel) are built OFF-LIVE — a separate dataset NOT wired into the live app —
   until Douglas says go. The per-type split is REAL and live (bmx.html/BuildMyBMX,
   KitBuilder/BuildMyRideKit; road/gravel/EMTB pages follow the same pattern, domains owned).
   **Never e-bikes in the MTB catalog** (rule 1).
   **Dirt jump went LIVE on Douglas's word 2026-07-14** (25 rows in `PARTS`, `dj` discipline chip,
   `cog`+`seatpost` slots, `driveMode:'single-speed'` completeness drops incl. the confirmed
   brakeless-is-complete decision).
   **BMX went LIVE on Douglas's word 2026-07-17** as its own root page, `bmx.html`
   ("BuildMyBMX") — a separate builder over `src/compat-bmx.js` (`checkBmxBuild` +
   `BMX_GROUPS`/`BMX_SLOTS`) and `data/bmx.js` (`BMX_PARTS`), reusing `src/compat.js`'s
   `Verdict`/`verdictKey` primitives (compat.js loads first on that page for that reason).
   index.html itself is untouched by this — it never loads the BMX engine or data, so the MTB
   app's own behavior can't drift. Nav: index.html and KitBuilder both link to BuildMyBMX;
   the former "Kit Builder" nav button/label is renamed **BuildMyKit**, then rebranded
   **BuildMyRideKit** 2026-07-19 (Douglas owns buildmyridekit.com) — routes/ids unchanged.
4. **WORK IS HANDED OFF AS PASTE-READY PROMPT BLOCKS — NEVER CLICK-CHIPS (Douglas, 2026-07-18).**
   Every worker task goes to Douglas as a **fenced copy-paste prompt block** whose first line is a
   `[Model, effort]` header (e.g. `[Sonnet, high effort]`), so **he** sets the model and effort in
   his picker before dispatching. Do **not** use `spawn_task` click-chips: a chip inherits whatever
   the picker happens to be set to at click time, which has silently run grind work on premium
   models and premium work on Sonnet. His words: *"I like chips that I have to copy and paste
   myself instead of click so I can make sure it's on the right model and effort."* Each block must
   be self-contained (scope, exclusions, THE BAR, unique worktree suffix, the four gates,
   never-prompt-Douglas, present-a-branch-never-push **with the why**). Also recorded in memory
   `parallel-work-delivery.md`.
5. **FILE CONTAINMENT (Douglas, 2026-07-18): every session reads and writes files ONLY inside
   `D:\MTB Bike Builder`.** Worktrees go at `.claude/worktrees/<unique-name>` INSIDE the project —
   never at `D:\` root, never anywhere else on any drive (two workers created `D:\gdd-a3f1` and
   `D:\mtb-wt-rsq-195f`; that is the banned pattern). The harness-managed temp scratchpad
   (`AppData\Local\Temp\claude\...`) is the only exception, for throwaway files. Enforced by a
   PreToolUse hook (`tools/hooks/guard-worktree-path.js`) that auto-denies `git worktree add` /
   `git clone` targeting an outside path. Tool reads of system locations (node, npm, git) are
   normal operation, not a violation — the rule is about where PROJECT files live.

## Files (src/ + test/ layout — these are the project)

Entry points (`validate.js`, `index.html`) live at the root; tests run on Vitest
(`npm test`); the library lives in `src/`; the test modules live in `test/`.

| File | Purpose |
|------|---------|
| `index.html` | The app (UI). Plain HTML/CSS/JS, no build step. Loads `src/compat.js` via `<script>`. Open by double-click. Never loads the BMX engine/data — `bmx.html` is a separate page for that. |
| `src/compat.js` | The catalog data (`PARTS`) **and** the compatibility engine (`checkBuild`) + helpers (`compatOf`, `buildTotals`). The heart of the project. |
| `src/schema.js` | Data schema + validator. The single source of truth for "valid data". |
| `bmx.html` | **BuildMyBMX** — a separate root page (live 2026-07-17), the BMX counterpart to `index.html`/`KitBuilder/index.html`. Loads `src/compat.js` (for the shared `Verdict`/`verdictKey` globals `compat-bmx.js` reads at parse time — must load first), then `src/compat-bmx.js`, then `data/bmx.js`. Own local `bmxCompatOf`/`bmxPlacementDiff` (same four-state dot contract as `compatOf`, over `checkBmxBuild`). |
| `src/compat-bmx.js` | **LIVE BMX engine** (`checkBmxBuild` + `BMX_VOCAB`/`BMX_GROUPS`/`BMX_SLOTS`/`bmxSlotRequired`/`bmxGearInfo`/`bmxBuildTotals`), sharing compat.js's `Verdict`/`verdictKey` primitives. Loaded only by `bmx.html` (index.html still does not `<script>` it — the MTB app is untouched). Data: `data/bmx.js`; design: `data/DJ-BMX-COMPAT-ANALYSIS.md`. |
| `src/schema-bmx.js` | **BMX schema/validator** — the `schema.js` "bouncer at the door" pattern scoped to `BMX_PARTS`: per-category required/optional field sets (derived from `data/BMX-MODEL.md` section 14 + the live `data/bmx.js` rows, never invented) checked against `BMX_VOCAB` (reused from `compat-bmx.js`) plus a small `LOCAL_VOCAB` for fields BMX_VOCAB doesn't cover. `validateBmxCatalog` is wired into `validate.js` as the "BMX OK" line. Added at the 2026-07-17 pre-flip audit. |
| `src/config.js` | **Phase 3 accounts.** Publishable Supabase URL + anon key (placeholders until set) + the `ACCOUNTS_ENABLED` gate. Same committed-constant pattern as `REPORT_REPO`. |
| `src/account.js` | **Phase 3 accounts.** Async auth + saved-builds + inventory data-access over the Supabase client. Browser glue (not typechecked, like the inline app script). Loads before `compat.js`. |
| `src/forum.js` | **Phase 4 forum.** Threads + replies over Supabase, reusing `account.js`'s client. Browser glue (not typechecked). |
| `src/guides.js` | Buyer's & compatibility guides — static, author-controlled content (`GUIDES` array of `{slug,title,summary,readMin,body}`) rendered client-side, deep-linked as `#guide/<slug>`. Browser glue (not typechecked). |
| `src/ui-common.js` | Shared theme system (`tbApplyTheme`/`tbCurrentTheme`, the pre-paint dark-mode guard) + `tbMoney` money formatting — used by both `index.html` and `KitBuilder/index.html`. Browser glue (not typechecked, DOM/localStorage at parse time). |
| `src/kit.js` | **Kit Builder** (rider gear: helmets/shoes/apparel/protection) data + slots + totals — `KIT_PARTS`, `kitById`, `kitTotals`. Fully isolated from the bike compat engine (zero `checkBuild` rules for kit); every kit row is validated by re-calling `schema.js`'s own `validatePart`, scoped to the kit catalog (`validate.js`). Fully tsc-checked against `types.js`'s `KitPart[]`. |
| `src/vendor/supabase.min.js` | **Vendored** `@supabase/supabase-js` UMD (v2.110.1) — loaded via a classic `<script>` to keep the no-build-step/no-CDN convention. Exposes `window.supabase`. Do not hand-edit. |
| `supabase/schema.sql` | **Phase 3.** `builds` + `inventory` tables with owner-only RLS + `updated_at` trigger. Run once in the Supabase SQL editor. `supabase/SETUP.md` is the owner's turn-on checklist. |
| `src/types.js` | Shared JSDoc `@typedef`s — a per-category discriminated union for `Part`, plus `Build`/`Group`/etc. (type-checking only; no runtime code). Mirrors `schema.js`. |
| `src/tire-classes.js` | Groups the brand-native tire `compound`/`casing` SKU axes into rider-facing classes (soft/medium/hard; DH/Enduro/Trail/XC) for the Tires-tab sub-filter chips — display/filter grouping only, never feeds `checkBuild`. |
| `src/pricing.js` | The complete-bike MSRP save/sale basis (`completeBikeSaveBasis`) + MSRP-only sort comparators (`msrpCompareAsc`/`Desc`) — Douglas's 2026-07-16 pricing ruling, extracted out of `index.html`'s inline script per the 2026-07-16 code-quality audit (H-2) so it's testable. |
| `src/facets.js` | Pure per-part/complete-bike filter-facet derivations backing several catalog sub-filter/slider rows: `bbFamily`, `actuationOf`, the four `cb*Of` complete-bike facets (read through a bike's `fills`), `frameRearTravelOf`/`frameForkTravelOf`. `byId` is dependency-injected (no load-order coupling to `compat.js`). Extracted per the 2026-07-16 audit (H-3). |
| `src/range-filters.js` | The generic, catalog-agnostic building blocks behind the SUBFILTERS/RANGEFILTERS tables: `distinctVals`/`numBoundsOf`/`inOrder`, the float-epsilon-safe `rangeMatch`, and the `subFiltersMatch`/`rangeFiltersMatch` AND-composition loops. Extracted per the 2026-07-16 audit (H-3). |
| `src/format-sizes.js` | Renders a frame's `sizes` map as a readable per-size spec line (`formatSizes`) for the part-detail modal. `esc` is dependency-injected. Extracted per the 2026-07-16 audit (U-1). |
| `src/recall-notes.js` | **Recall watcher** (Feature slate #4, 2026-07-20): a pure read-join between the recall-watchdog corpus (`tools/recalls/RECALL-LOG.md`) and a signed-in rider's inventory — `recallNoticesForOwnedParts(partIds)` returns the `RecallNote`s (hazard, honest serial/date-range `scopeNote`, remedy, source) for any owned part id the ledger has a CONFIRMED/NAME MATCH citation for against a currently-live catalog row. Hand-maintained (not auto-derived from the ledger's prose) — only add an entry after verifying the part id still exists in `src/compat.js`. Zero engine changes; rendered by `index.html`'s inventory page (`renderRecallBanners`) as an in-page banner, never a popup. |
| `src/build-sheet.js` | **Printable build sheet** (Feature slate #5, 2026-07-20): pure model + renderer behind the click-opened 🖨️ Build sheet dialog — `buildSheetModel()` folds the current build into per-group rows (bundle attribution identical to `buildTotals`/`bundleActive`), the required/filled count (via `slotRequired`/`wheelPositionFilled`), totals passthrough, and `checkBuild` verdicts VERBATIM; `renderBuildSheetHtml()` emits the escaped fragment shared by the dialog preview and the print-only `#bsPrintRoot` (index.html's `@media print` rules, gated on `body.bs-printing` while the dialog is open, print ONLY the sheet — a normal Ctrl+P is untouched). Deps injected like `facets.js`/`upgrade.js`; zero engine changes. |
| `validate.js` | CLI: `node validate.js` — checks the whole catalog. |
| `vitest.config.mjs` | Vitest config — points the runner at `test/test-*.js` and enables globals. |
| `test/test-util.js` | Shared test helpers: `C`, `B(map)`, `part(id)`, and the `eq`/`ok`/`some` assertions. |
| `test/test-data.js` | Asserts the catalog passes the validator. |
| `test/test-schema.js` | Proves the validator catches bad data (negative tests). |
| `test/test-engine.js` | Each compatibility rule fires when it should. |
| `test/test-greying.js` | The green/yellow/red/grey compatibility dots (yellow = fits, but adds a warning). |
| `test/test-pricing.js` | Bundle (groupset) pricing + weight totals. |
| `test/test-golden.js` | Whole real bikes that must validate clean; a known-bad build that must fail. |
| `test/test-verdict-identity.js` | The verdict-identity contract: dots + dedup/diff key on `verdictKey` (ruleId+slots+msg), not raw message text (guards the REVIEW.md #4/#13 maskings). |
| `test/test-verdict-audit.js` | Regression cases from the 2026-07-09 verdict audit (`tools/VERDICT-AUDIT-2026-07-09.md`) — real-part builds that must raise (or stay silent on) specific ruleIds. |
| `test/test-random-builds.js` | `generateSampleBuild()` must emit a compatible, wheel-config-consistent build in every price band on every seed (property-based, not golden-pinned). |
| `test/test-share.js` | The share-link sanitizer (`sanitizeShare()`, which `readHash()` uses) — bad/foreign slot ids are dropped, presets land in their own group. |
| `test/test-ui.js` | App helpers the UI leans on: `esc()` HTML escaping + the build/preset provenance logic. |
| `test/test-ids.js` | Id convention + `ALIASES`: brand-qualified, append-only, ≥3 tokens; retired ids resolve through `canonicalId()`. |
| `test/test-drift-check.js` | The drift-check matching logic (pure, no network) — token generation + ok/changed/unfetchable/fetch-failed classification. |
| `test/test-account-serialize.js` | Garage/account serialization: a saved build's payload round-trips through the same `sanitizeShare()` as share links (pure logic, no network). |
| `test/test-invariants.js` | Engine-fortress properties across every part and many pseudo-random builds: `checkBuild` never throws, never returns malformed output, is deterministic, and every preset/lookup stays internally consistent — structural contract, not specific verdicts (that's `test-engine.js`). |
| `test/test-dj-singlespeed.js` | The DJ / single-speed surface (live since 2026-07-14): driveMode-blind checkBuild pinning, the slotRequired drops + inverted cog/seatpost requires, ss-chain-width/ss-tension, rule 13c, the schema cross-rules, and the golden DMR Sect build (complete + conflict-free in the live catalog). |
| `test/test-bmx-engine.js`, `test/test-bmx-golden.js` | The OFF-LIVE BMX engine (`src/compat-bmx.js` — loaded by nothing the site serves): every BMX rule fires + dormancy negatives; braked, brakeless-complete and known-bad golden builds. |
| `test/test-schema-bmx.js` | The OFF-LIVE BMX schema/validator (`src/schema-bmx.js`): the real `data/bmx.js` catalog validates clean, plus negative cases (out-of-vocab value, missing required field, unknown category, bad price, verified-provenance rejections, stray field, duplicate id). |
| `test/test-kit.js` | The Kit Builder data layer (`src/kit.js`): schema cross-rules, `kitTotals` edge cases, and its isolation from the bike compat engine. |
| `test/test-tire-classes.js` | Pins a handful of representative `src/tire-classes.js` mappings across brands, and that an unmapped/garbage/absent value always resolves to `null`. |
| `test/test-pricing-basis.js` | The complete-bike MSRP save/sale basis (`src/pricing.js`) — headline/save always derive from MSRP, `streetPrice` never a computation basis, and the MSRP-only sort comparators. |
| `test/test-facets.js` | The filter-facet derivations (`src/facets.js`) — BB-shell family, drivetrain actuation resolution, frame travel facets, and the complete-bike facets, including the hardtail=0 convention and the "never synthesize a third bucket" rule for single-speed bikes. |
| `test/test-range-filters.js` | The generic slider/filter composition mechanism (`src/range-filters.js`) — distinct-value/bounds scanning, the float-epsilon range predicate, and that two engaged filters compose as AND (not OR) with out-of-scope parts always passing. |
| `test/test-build-sheet.js` | The printable build sheet (`src/build-sheet.js`): model truth (verbatim verdicts, totals passthrough, bundle attribution, split-wheel completeness) + renderer escaping and the honest-framing pins (the hedged all-clear, the app's sample-data disclosure verbatim, never "All compatible"). |
| `test/test-format-sizes.js` | Per-size spec formatting (`src/format-sizes.js`) — known-key labels, the unknown-key fallback, multi-size/multi-field joining, and `esc()` applied to hostile keys/values. |
| `package.json` | Scripts: `test` (Vitest), `test:watch`, `validate`, `typecheck`, `verify:status/next/report/drift`. Dev-only deps: `vitest`, `typescript`, `@types/node`. |
| `tools/verify-job.js` | **Resumable verification job runner** (state only, zero deps): queue/checkpoints for the part-verification grind. `init`, `status`, `next`, `start`, `complete`, `reset`, `retry`, `report`. Never reprocesses Verified parts without `--force`. |
| `tools/VERIFY-PROTOCOL.md` | The **verification logic** (the bar, per-part loop, batching, skip policy) — kept separate from the runner so any AI model/session can resume the job with no code changes. **Read this before verifying parts.** |
| `tools/DATA-ENTRY-TEMPLATE.md` | The **entry judgment layer**: flat-SKU split policy, the id recipe + per-category variant-token order, family/gen/mfgPn rules, manufacturer-wording→vocab mapping, weight-basis conventions. **Read this before creating rows.** |
| `tools/verification-job.json` | The job state (committed): per-part status (Pending/InProgress/Verified/Failed/Skipped), timestamps, errors, queue. Atomic writes; auto-syncs with the catalog on every run. |
| `tsconfig.json` | Type-check config (`checkJs`, `noEmit`). Drives `npm run typecheck`; produces no build output. |
| `.github/workflows/ci.yml` | GitHub Actions CI — runs `validate`, `tests`, and `typecheck` on every push / PR. |
| `.github/workflows/deploy.yml` | GitHub Actions — deploys the static app (`index.html` + `src/`) to GitHub Pages on push to `main`, after `validate` + `tests` pass. Needs a public remote + Pages source = "GitHub Actions". |
| `README.md`, `Getting-Started-Roadmap.md` | Docs. |
| `REVIEW.md` | 2026-07-06 correctness audit of the engine (all Criticals/Majors/Minors resolved by 2026-07-07 — see its status header). |
| `EXPERT-REVIEW-DOSSIER.md` | The **rule-by-rule packet for the human domain-expert review** (Phase 0 step 2): every rule's claim, tier, sources, direction-awareness and open questions in mechanic language — no code reading needed. Hand this to the reviewer. |
| `DATA-MODEL-REVIEW.md` | 2026-07-06 data-model audit for catalog scale. **§5.1 is the pre-mass-entry gate** (id migration, entry template, semantic fixes, vocab widening) — read before entering parts in bulk. |

(Stray files like `test_compat.js` or `test2.js` from earlier sessions are NOT part of the project; delete them.)

## How to run

Requires [Node.js](https://nodejs.org) 18+. Run `npm install` once (dev tooling for the
tests + type-checker; `validate.js` itself needs no dependencies).

```
npm test            # full suite (Vitest) — expect "Tests  N passed (N)", 0 failures
node validate.js    # data check — expect "DATA OK - N parts, 0 problems (N verified, ...)"
```

(Don't expect specific counts — they move with nearly every catalog/test commit, and
hardcoded ones here have gone stale before. The contract is: **every** test passes and
validate reports **0 problems**; both commands print the live counts.)

(`npm run validate` works too; `npm run test:watch` re-runs Vitest on save.) To run the
app, open `index.html` in a browser.

### Type-checking (optional, no build step)

The plain JS is type-checked via JSDoc + `checkJs`. One-time `npm install` (pulls the
dev dependencies — `typescript`, `@types/node`, `vitest`), then:

```
npm run typecheck   # tsc --noEmit — expect no output, exit 0
```

It compiles and ships nothing; it only reads the JSDoc types. Shared `@typedef`s live in
`src/types.js` — `Part` is a per-category discriminated union that mirrors `schema.js`.

## The golden rule

**After ANY change to `src/compat.js` or `src/schema.js`, run `node validate.js` AND `npm test`. Both must pass before committing.** The whole value of this product is that a "compatible" verdict is true, so the suite is the guardrail — never weaken a test to make a change pass; fix the change.

## Data model (what a part looks like)

Every part: `id, cat, brand, model, price` (USD MSRP, sample), and usually `weight` (grams, sample);
plus the optional identity kit `family` (platform slug — backfilled catalog-wide), `gen`, `modelYear`,
`mfgPn`, and `disciplines` (enumArray of `xc/trail/enduro/dh` — **filter/annotation only, never feeds
`checkBuild`**; absence = universal; backfilled `['enduro']` on frame/fork/wheels/tires).
Category-specific fields (enforced by `schema.js` → `SCHEMA`, using vocabularies in `VOCAB`):

- **frame**: `wheelConfigs` (array of `'29'`/`'275'`/`'mullet'`), `rearAxle`, `headset`, `bb`, `seatTube`, `brakeMount`, `maxRotorR`, **`suspension`** (`'full'`/`'hardtail'` discriminator: the shock block `shockEye`/`shockStroke`/`shockMount`/`travel` is required for full and forbidden for hardtail — cross-rule), `maxForkTravel`, optional sourced `minForkTravel` (maker-approved floor) + `designForkTravel` (maker-stated design travel), `udh` (bool), `frameOnly` (bool), `bundledShock` (id or null), optional `sizes` (per-size map → `{seatTubeLen?, maxInsert?}`).
- **fork**: `wheel`, `travel`, `axle`, `steerer`, `brakeMount`, `maxRotorF`, optional `minRotorF` (native-mount minimum; sourced forks only).
- **shock**: `eye`, `stroke`, `mount`, `spring`; optional `oemOnly` + `forFrames` (array — OEM shocks ship across multiple frames).
- **frontwheel / rearwheel**: `wheel`, `hub`, (`freehub` rear only — `'integrated'` = the driver IS a built-in 7-speed cassette, e*thirteen LG1r DH; wheel/hub-side value, forbidden on cassettes by a cross-rule), `rotorMount`, `intWidth`, `maxTire`.
- **tire**: `wheel`, `width`, optional `casing`/`compound` (brand-native SKU axes; template-mandatory for new rows). (Front and rear tires are separate build slots, both drawn from `cat:'tire'`.)
- **shifter / derailleur / cassette / chain**: `system` (`sram-eagle`/`sram-transmission`/`shimano-12`), `speeds`; shifter + derailleur also `actuation` (`cable`/`electronic` — same system, but a trigger can't drive an AXS mech); shifter optional `clampType` (`ispec-ev`/`ispec-ii`/`ispec-b`/`matchmaker`/`band`/`pod`); derailleur also `maxCog`,`mount`; cassette also `freehub`,`minCog`,`maxCog` (numeric — the display range is derived; HG floor is 11T, validator-enforced).
- **crankset**: `bb` (spindle interface: `DUB`/`24mm`/`30mm`/`p3`), optional `ring`, nullable `ringStd` (`t-type`/`standard-12`/null = ring sold separately), `speeds`, optional `chainline` (number, mm — display-only).
- **bb** (the bottom bracket itself, added at the dossier rule-7 review): `shell` (frame standard, frameBb vocab) + `spindle` (crank interface, crankBb vocab) — both exact-match rule-7 error checks once a BB is picked. Its own single-slot GROUP (never a drivetrain slot: buildTotals skips a bundled group's non-fill slots) and the slot is `optional` (completeness unchanged; the sold-separately advisory nudges until one is picked).
- **headset** (added 2026-07-10; the bb category is the template): `upper`/`lower` (the assemblies' S.H.I.S. codes, headTube vocab — the token before the slash is the head-tube bore, the frame fact; the number after it is the steerer side) + `steerer` (same vocab as fork.steerer). **Complete headsets only** (one purchasable upper+lower SKU); a validator cross-rule rejects a steerer value contradicting the codes' suffixes. Own optional single-slot GROUP like bb (same buildTotals reason vs the cockpitset bundle). Frames capture the head-tube side in optional sourced `headTubeUpper`/`headTubeLower` — rule 20b compares **bore tokens only** (frame-side suffixes assume the tapered assembly).
- **brake**: `mount`, `pistons`, optional `leverAccepts` (array of `ispec-ev`/`ispec-ii`/`ispec-b`/`matchmaker` — real levers accept several standards).   **rotor**: `size`, `mount`.
- **handlebar/stem**: `clamp` (+ optional dims).  **grips/saddle**: just the common fields.
- **dropper**: `diameter`, `drop`.  **pedal**: `style` (`flat`/`clip`) — pairs; 9/16" thread fits every crank, so no compat rules.
- **cog / seatpost** (DJ go-live 2026-07-14): **cog** = the single rear cog of a single-speed
  drivetrain (`teeth`, `chainWidth` of `1/8`/`3/32`); **seatpost** = a rigid post (`diameter`;
  droppers stay their own category). Each is its own single-slot GROUP (the bb/headset
  buildTotals reason) with INVERTED requiredness: required ONLY on a `driveMode:'single-speed'`
  frame, never for geared frames or the no-frame default. Frames may carry
  `driveMode:'single-speed'` (single-speed-only; drops shifter/derailleur/cassette/dropper +
  ALL brake slots from completeness — brakeless is a valid complete build, Douglas 2026-07-13)
  and `dropoutType` (`horizontal`/`sliding`/`ecc-bb`/`vertical`); chains/cranksets may carry
  `chainWidth` instead of the geared `system`/`speeds` identity (schema cross-rules);
  wheels may carry `freehub:'single-speed'` (takes one cog, cassette slot exempt, rule 6 errors a cassette).
- **presets** (`groupset`/`wheelset`/`brakeset`/`cockpitset`): `price` and `fills` (slotKey → part id). **Weight is always derived from the fills** (`partWeight`) — storing it is a validator error; price may be stored because real bundle discounts exist (≤-sum lint guards it).

### Build slots

A build is a map of slotKey → part id. Slots: `frame, fork, shock, frontWheel, rearWheel,
frontTire, rearTire, shifter, derailleur, cassette, chain, crankset, cog, bb, headset, frontBrake, rearBrake,
frontRotor, rearRotor, handlebar, stem, grips, dropper, seatpost, saddle, pedals`. (`GROUPS`/`SLOTS` in `compat.js`.)

## Compatibility engine (`checkBuild`) — 20 rule areas

Wheel-size by front/rear group vs frame `wheelConfigs` (incl. mullet = 29 front / 27.5 rear,
plus a frameless guard rejecting pairs that match no config — reverse mullet);
front & rear axles; drivetrain one-system + one-speed + shifter/derailleur actuation (cable vs
AXS wireless) + T-Type chainring vs Transmission chain (electronic SRAM controllers are exempt
from one-system — SRAM documents all AXS controllers drive all AXS derailleurs — but stay
red on non-SRAM systems); SRAM Transmission needs a UDH frame;
cassette range vs derailleur capacity; cassette freehub vs rear wheel (incl. 6b: an
integrated-cassette wheel — the LG1r DH driver IS a built-in 7-speed cassette — hard-errors ANY
picked cassette in its own words, drops a built-in-cassette info when cassette-less, and
`slotRequired` exempts the cassette slot from completeness, hardtail-shock style; incl. 6c: an XD
cassette on an XDR-driver wheel = adapter-tier WARNING with a structured fix naming SRAM's 1.85 mm
spacer — SRAM-documented; every other freehub mismatch, including the reverse direction, stays the
exact-match error); brake caliper mounts (direction-aware on the rule-9 adapter template, NOT a
plain exact-match: a Post-mount caliper on an **I.S.** frame/fork mount = adapter-tier WARNING with
a structured `fix` naming the rotor-size-specific I.S.-to-post adapter (Shimano SM-MA-R160P/S rear
/ F160P/S front — Shimano DM-SMMA00A plus Banshee's and Cotic's own pages describing this exact
setup); **PM↔FM both directions** likewise warn with a `fix` (Shimano SM-MA flat-mount line one way,
Wolf Tooth Post-to-Flat the other, whose message flags the +20 mm-only step and boss clearance);
**FM-on-I.S.** stays an ERROR (only a boutique rotor-limited part exists — a `fix` would be a false
"fits"), and an **I.S. caliper** on any other mount stays an ERROR, dormant-but-correct since no
I.S. caliper is cataloged. Live on the 3 I.S. frames (Cotic BFe/Jeht, Banshee Paradox V3), which
went from 0/104 buildable to PM-caliper-buildable; the I.S. *fork* branch is dormant);
rotor interface vs hub (direction-aware: Center-Lock rotor on a 6-bolt hub = error;
6-bolt rotor on a Center-Lock hub = adapter warning carrying a structured `fix`); rotor size vs
frame/fork max AND vs the fork's native-mount minimum (error; sourced forks only) AND vs the
frame's native-mount minimum (rule 10b — error, live on the Cotic Solaris's sourced `minRotorR`;
dormant elsewhere); steerer/headset;
fork travel vs frame rated max AND sourced approved minimum (under-forking — live per-frame as
`minForkTravel` is sourced) AND vs maker-stated design travel (rule 12c: warns >20 mm below
`designForkTravel`, 20 mm grace for deliberate builds, suppressed when the 12b floor already
fired; threshold flagged for the mechanic review); dropper diameter vs seat tube (direction-aware: too big = error,
smaller = reducing-shim warning; ≥200 mm drop adds an insertion-depth info; rule 13c applies the
same direction-aware check to the rigid `seatpost` slot — DJ go-live 2026-07-14); single-speed
rules (DJ): `ss-chain-width` (ring/cog/chain must share a `1/8`/`3/32` width class — warning,
provisional severity for the mechanic review) and `ss-tension` (vertical-dropout single-speed
frame needs a tensioner/half-link — info; every current DJ frame is `'sliding'`, so dormant);
tire width vs wheel clearance AND vs fork chassis clearance (dormant until forks carry `maxTire`)
AND too-narrow tire vs a wide rim (rule 14c — soft warning, live-dormant until a wheel declares a
maker-published `minTire`); rear-tire width vs frame clearance (rule 18 — dormant until a frame declares `maxTire`);
bar/stem clamp; rear-shock fit (eye-to-eye + mount + **direction-aware stroke**: longer stroke =
error, shorter same-eye stroke = quantified less-travel warning; maker-stated coil approval —
dormant until a frame declares `coilApproved:false`; hardtail guard: a shock on a
`suspension:'hardtail'` frame errors cleanly); frame+shock bundling (incl. OEM-only — an OEM
shock with NO frame picked is an info, mirroring rule 4's frameless convention);
shifter clamp vs brake lever integration (rule 19 — I-Spec EV/MatchMaker, dormant until parts
are tagged); headset (rule 20 — 20a steerer-acceptance vs fork ACTIVE with rule-11 semantics,
20b cup vs frame head-tube S.H.I.S. **bore tokens** dormant-until-sourced and live on the
51 SHIS-carrying frames, 20c pick-a-headset advisory info once frame+fork are chosen — frames
often ship with one, so it nudges, never claims sold-separately).
Returns `{errors, warnings, infos}` of **structured verdicts** `{ruleId, slots, msg, fix?}` that
stringify to their message (so UI/report interpolation just works). Conflict identity for the
dots is `verdictKey` (ruleId+slots+msg) — never raw message text, which two different conflicts
can share byte-identically (the REVIEW.md #4/#13 maskings). `fix` is the structured "fits with
adapter X" tier — first live use: `{kind:'adapter', name:'Shimano SM-RTAD05'}` on the
6-bolt-rotor-on-Center-Lock-hub warning (adapter facts are engine-side pair data, never part fields).
Errors = won't fit; warnings = works but check; infos = notes.
The pick-time dot (`compatOf`) has **four states** (REVIEW #6): green = adds no new error or
warning, **yellow = fits but adds a new warning** (the warning is the hover reason), red = adds a
new error, grey = nothing selected. Multi-slot parts dot their best placement.
(The all-clear in the app reads "No conflicts found", not "All compatible" — it means no conflict
among the dimensions we check, not a guarantee. Don't reword it to overclaim.)

### Coverage roadmap (candidate rules — evaluated, deliberately deferred)

The engine only checks the dimensions above; a green verdict is only as complete as that list.
**The bar for adding a rule: it must be backed by manufacturer compatibility docs and tested — a
false "won't fit" OR a false "fits" is worse than a missing rule.** Candidates considered:

- **Frame rear-tire clearance** (`rTire.width` vs optional `frame.maxTire`): ✅ **added as rule 18,
  ACTIVATED 2026-07-06, now live on 10 catalog frames (8 models)** with manufacturer-published
  clearances (the three Madonnas 2.6, Slash 2.5, Megatower 2.5 stock setting, Spire 2.6, SB160 2.6,
  HD6 2.5, Reign 2.5, Dreadnought 2.6). The other frames publish no explicit
  max, so the rule stays dormant for them — a missing rule beats a wrong one. `test/test-engine.js`
  proves it fires when tripped, stays silent within clearance, and stays dormant without data. This is
  the template for the data-dependent candidates below: land the rule + tests dormant, activate per
  part as sourced data arrives. The 2026-07-06 correctness audit (`REVIEW.md`) used the same template
  to land actuation, T-Type chainring, minimum-rotor and shifter-clamp checks (its 5 Criticals);
  its Major findings (#6–#9: warning-blind dots, the SRAM-mullet catalog trap, direction-blind
  shock-stroke and dropper rules) were fixed 2026-07-07; its Minors remain the open backlog.
- **Tire vs internal-rim-width range** (too-narrow tire on a wide rim): ✅ **added as rule 14c
  (`front-tire-rim-min`/`rear-tire-rim-min`), a soft warning, live-dormant** on the rule-18 template.
  Because the thresholds are fuzzy/standards-dependent, it fires ONLY off a maker-published
  `minTire` on a wheel (never an ETRTO-derived guess), so it stays dormant until such data is
  sourced. `test/test-engine.js` proves it fires below a declared `minTire` and stays dormant without one.
- **Oversize-rotor adapter** needed when a rotor exceeds the native mount: today rule 10 already
  *warns* on exceeding the max; an adapter *info* could be added. Low priority.
- **Crankset chainline vs frame (Boost vs SuperBoost) — REJECTED for now.** Too nuanced: SuperBoost
  frames (e.g. `fr-pivot-firebird`) are commonly ridden with Boost-chainline cranks,
  so a naive "SuperBoost frame needs a SuperBoost crank" rule would fire a FALSE error.
  Needs real per-frame data + domain-expert input before it's safe.

Tests + types + the validator catch regressions and crashes (see `test/test-invariants.js`), but
they prove the engine is *self-consistent*, not that the rules are *right for the real world* —
that needs a mechanic/engineer review and real-rider feedback.

## Pricing & weight

`buildTotals(build, presetBy)`: a group whose slots exactly match a chosen preset is billed
at the **bundle price** (weight is derived from the fills either way); swap any single part
and that group reverts to summing components. `presetBy` maps groupKey → preset id.

## Provenance

Parts may carry `verified: true` + `lastChecked: "YYYY-MM-DD"` + `source: "https://…"`.
Absence = unverified (still the default for much of the catalog; `node validate.js` prints
the live verified count and `npm run verify:status` the full job state — **don't trust a
number written here, they drift**. Everything verified is against manufacturer pages/documents;
highlights from the early batches: the SRAM GX Eagle mechanical, X01/NX Eagle, and most
GX/X0/XX Transmission drivetrain parts (the AXS pods have no clean model pages so they stay
sample; the X01/GX-AXS derailleur and X01 crank pages list no weight, so they stay sample
too), two RockShox shocks (the Super Deluxe Ultimate air + Vivid air), a Shimano XT cassette, six
frames — all three RAAW Madonnas (V2.2/V3/V3.2; RAAW publishes full spec sheets), the
Commencal Meta SX V5 (tech page), the Canyon Strive CFR and the Forbidden Dreadnought —
seven pedals (OneUp, Race Face, Crankbrothers, Time; Shimano pedal pages blocked fetching),
the Crankbrothers Synthesis Enduro wheel pair, four droppers (OneUp V3, PNW Loam — both
publish per-size weights), and **the whole tire category — 23 tires across 8 brands**
(Maxxis, Continental via its Tire Range PDF, Schwalbe via schwalbetires.com's tables,
Pirelli, Vittoria, WTB, Kenda, Goodyear — each pinned to one purchasable casing/compound
SKU; Michelin + Specialized sit in the retry queue: JS-rendered/bot-blocked pages)).
**The verification grind
is a resumable job: see `tools/VERIFY-PROTOCOL.md` + `npm run verify:status`.** The
validator **refuses `verified: true` without a real source URL and a non-future date** — so
"verified" always means something. When you actually confirm a spec against a manufacturer
page, set the fields to match the source and add those three fields. (`node validate.js`
reports the verified/unverified counts.)

**Verifiability by brand (learned the hard way — saves re-discovering it):** SRAM publishes
exact component weights on its model pages (`sram.com/en/sram/models/<slug>`), so SRAM
drivetrain is cleanly verifiable. **Shimano does NOT publish component weights** *(footnote,
2026-07-20/21 waves: productinfo.shimano.com per-SKU pages — browser pane only, WebFetch renders
them empty — DO carry real per-SKU weights for current-gen ROAD components, Di2/electronic MTB
parts, and pedals; still blank for mechanical MTB tiers (Deore/CUES/budget brakes/rotors/BBs).
So: tier-gated, not absolute — try productinfo before declaring a weight wall)*, and **SRAM
does not publish *rotor* weights** — interfaces can be confirmed but not the maker's weight.
**Policy (decided 2026-07, DATA-MODEL-REVIEW §5.1-13):** a reputable third-party *measured*
weight is accepted **for the weight only** — `sourceType:'measured'` + a `weightSource` URL
(validator-enforced); interfaces stay manufacturer-sourced, and `sourceType:'retailer'` is
rejected on verified rows. That unblocks the Shimano/rotor/fork classes (see
`tools/VERIFY-PROTOCOL.md`). Optional `archiveUrl` records a Wayback snapshot (source rot is
real); optional `status`/`supersededBy` capture lifecycle (the Madonna generations are chained).
The `✓ Verified only` filter in the app (built on `partVerified`) shows just the verified set.

## Conventions

- Plain browser JavaScript (`var`/`function`), **no build step** — `index.html` loads `src/compat.js`
  directly. Type-checking is JSDoc-only (`npm run typecheck`); keep shipping plain JS (no bundler/transpile).
- **Third-party libraries are VENDORED, not CDN-loaded** (Phase 3 set the precedent with
  `src/vendor/supabase.min.js`): commit the UMD build, load it via a classic `<script>`, record its
  version + source URL in a header comment. No `import`/ESM, no runtime CDN fetch. Browser-only glue
  (`src/account.js`, `src/vendor/**`) is excluded from `npm run typecheck` — same reason the inline
  `index.html` script isn't checked (DOM + cross-file script globals); the pure logic stays checked.
- **External-service config is a committed constant** (`REPORT_REPO`; `SUPABASE_URL`/`ANON_KEY` in
  `src/config.js`). Only publishable values — the Supabase anon key is safe because every row is
  owner-scoped by RLS. Never commit a secret (e.g. a `service_role` key). Feature-gate UI on the
  config being present (`ACCOUNTS_ENABLED`, mirroring `$('reportGithub').hidden = !REPORT_REPO`).
- `schema.js` is the one definition of valid data; the tests delegate to it. Extend the schema
  when you add fields, don't scatter ad-hoc checks.
- **Ids are brand-qualified and APPEND-ONLY** (`<prefix>-<brand>-<model…>[-gen][-variants]`,
  e.g. `fk-rockshox-zeb-ultimate-29-170`; enforced by the validator + `lintCatalog`). Never rename
  or reuse an id — share links, `tools/verification-job.json` and catalog cross-refs all key on
  them. A correction retires the old id into `ALIASES` (compat.js); `readHash` and the verify-job
  sync resolve through `canonicalId()`. The verify-job sync **tombstones** state for ids that left
  the catalog instead of deleting it. (Migrated 2026-07-06, pre-deploy; DATA-MODEL-REVIEW.md §3.1.)
- When you add or rename a part field, update BOTH `schema.js` (runtime validator) and `src/types.js`
  (the JSDoc `Part` type) so the validator and `npm run typecheck` stay in agreement.
- Keep the UI logic and the engine sharing `compatOf`/`buildTotals` from `compat.js` (don't fork them).

## Roadmap / good next tasks

1. ✅ **Reorganized into `src/` + `test/`** with `git init` + an initial commit (done — the flat layout was forced by the tool that created it). `validate.js` stays a root CLI; the test runner later moved to Vitest (`npm test`).
2. ✅ **TypeScript type-checking without a build step** (done): JSDoc types in `src/types.js`,
   a `tsconfig.json` with `checkJs`/`noEmit`, and `npm run typecheck` (`tsc --noEmit`). Still plain
   JS — nothing is compiled or shipped. Full `strict` is on, and `Part` is a per-category
   discriminated union (keyed by `cat`), so tsc catches a part missing a required field, a part
   carrying another category's field, or the wrong category dropped into a build slot.
3. ✅ **Vitest + GitHub Actions CI** (done): the home-grown runner is replaced by **Vitest**
   (`npm test`, config in `vitest.config.mjs`), and `.github/workflows/ci.yml` runs
   `validate` + `tests` + `typecheck` on every push / PR.
4. 🚧 **Adding real, verified parts** (in progress — now a resumable checkpointed job: run
   `npm run verify:status`, then follow `tools/VERIFY-PROTOCOL.md` — the status command has
   the live counts): highlights of the verified set so far — SRAM
   GX/X01/NX Eagle and most Transmission drivetrain parts, two RockShox shocks, a Shimano XT
   cassette, seven pedals, Synthesis wheels, four droppers, the whole tire category (23
   tires, 8 brands; Michelin/Specialized in the retry queue), and six frames
   (all three RAAW Madonnas incl. the new V3/V3.2, the Commencal Meta SX V5, the Canyon Strive
   CFR and the Forbidden Dreadnought). All 21 frames' verdict-driving
   specs (axle, shock size/mount, UDH, BB, seat tube) are web-sourced; most frame makers publish
   no frame-only weight, so those end `Skipped` in the job state with a reason. Forks are
   deliberately still flagged (weights couldn't be pinned reliably — e.g. RockShox's page lists
   the ZEB 170 at 2550 g vs the ~2100 g cited elsewhere). **Lesson that keeps paying: search-result
   summaries lie; only a fetched manufacturer page counts** (that's how the Spire's trunnion shock
   and the Meta SX's real 4.08 kg weight were caught). Most of the catalog is still sample data.
5. Parked: **ride categories** (enduro / trail / downhill) to filter the catalog by discipline;
   mullet is already supported.
6. 🚧 **Deploy** — a GitHub Pages workflow (`.github/workflows/deploy.yml`) is ready; push to a
   public GitHub remote and set Pages source to "GitHub Actions" to go live. Later (planned,
   post-beta): **accounts/login with saved builds, an owned-parts inventory, and a past-builds
   garage** (Supabase/Firebase), plus price feeds via retailer affiliate programs.
