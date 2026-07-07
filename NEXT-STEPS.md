# Where we are + next steps

_A living snapshot. Architecture/conventions live in `CLAUDE.md`; full history in `git log`._

## Where we are (as of 2026-07-07)

TrailBuilder — "PCPartPicker for enduro mountain bikes": pick parts, get real-time
fit / price / weight checks. Plain static app (`index.html` + `src/`), no build step.

**Solid foundation, honestly-scoped prototype:**

- **Layout & tooling:** `src/` + `test/`; full-`strict` JSDoc type-checking (`npm run typecheck`);
  Vitest (`npm test` — **174 tests**); GitHub Actions CI; and a GitHub Pages deploy workflow that's
  ready but **not yet deployed** (no git remote / `gh` in this environment).
- **Engine:** 19 compatibility rules + a regression/fuzz **fortress** (`test/test-invariants.js`),
  proven crash-free, deterministic, and **dot-honest** — a green dot never hides a newly-introduced
  conflict, with clean verdict messages. A 2026-07-06 adversarial audit (**`REVIEW.md`**) found 5
  Critical false-greens — all fixed same day (actuation, T-Type chainring, minimum rotor, preset-dot
  baseline, shifter clamp) — and its **Major findings (#6–#9) were fixed 2026-07-07** (one commit
  each, branch `review-majors-6-9`): **warning-visible yellow dots** (four states, honest legend,
  "N thing(s) to check" wording), the **XD 27.5 rear wheel + kit** that breaks the SRAM-mullet
  catalog trap (golden Meta SX Transmission build pinned), and **direction-aware shock-stroke and
  dropper rules** (impossible direction = error; manufacturer-supported direction = quantified
  warning). The REVIEW **Minors** are the remaining backlog.
  Verdicts are *self-consistent* — **not yet validated
  against the real world** (no expert review, no real riders).
- **Data:** 329 parts across ~100 brands with **62 verified** against manufacturer pages/documents —
  verification is a **resumable checkpointed job** (`tools/verify-job.js` + `tools/VERIFY-PROTOCOL.md`;
  any session resumes via `npm run verify:status`). Verified so far: SRAM GX/X01/NX Eagle + most
  Transmission drivetrain parts, two RockShox shocks, a Shimano XT cassette, seven pedals, Synthesis
  wheels, four droppers, **six frames** (all three RAAW Madonnas, Commencal Meta SX V5, Canyon Strive
  CFR, Forbidden Dreadnought), and **the whole tire category — 22 tires across 8 brands**
  (2026-07-07 batch: Continental from the maker's Tire Range 2025/26 PDF, Schwalbe from
  schwalbetires.com's JS tables via a real browser session, Pirelli/Vittoria/WTB/Kenda/Goodyear
  from their product pages; each pinned to ONE purchasable casing/compound SKU with new ids +
  ALIASES. **The batch caught four fictional sample sizes** — Pirelli 29x2.5, Maxxis HR II 29x2.4 and
  Shorty 29x2.5, Goodyear MTF 29x2.4 don't exist — and per-brand casing/compound vocab is now
  enumerated in `VOCAB` for 8 brands. Michelin + Specialized tires sit in the retry queue:
  JS-rendered/bot-blocked pages, need a browser session with those domains allowed). The rear-tire-clearance rule (18) is **active on 8 frame models
  (10 catalog entries)** with manufacturer-published clearances. The verification sweeps keep catching
  real spec bugs (Megatower runs 230x62.5 not 230x65; Dreadnought seatpost is 31.6 not 30.9; HD6 max
  rotor is 220 not 203) — **the lesson that keeps paying: search-result summaries lie; only a fetched
  manufacturer page counts.** Known blockers in the retry queue: Specialized/Orbea (bot-block 403),
  Trek/Norco/Pivot/Rocky Mountain/Propain (JS-rendered spec pages — need a real browser session),
  Nukeproof (domains down post-CRC-collapse). Most of the catalog is still clearly-badged sample data.
- **Data model: the pre-mass-entry gate is LANDED** (2026-07-07, seven commits on the
  2026-07-06 **`DATA-MODEL-REVIEW.md`** audit): brand-qualified **append-only ids** (all 327
  migrated pre-deploy; `ALIASES` + `canonicalId` keep old share links + verify-job state working;
  the job sync now **tombstones** instead of deleting), the **flat-SKU kit**
  (`family` backfilled catalog-wide, `gen`/`mfgPn` where sources pin them, tire
  `casing`/`compound`, `frame.sizes`) + **`tools/DATA-ENTRY-TEMPLATE.md`**, the `disciplines`
  tag (`['enduro']` backfilled) + frame `suspension` discriminator (hardtails enterable, rule-16
  guard), the semantic fixes (crankBb as spindle interface — the two fictitious cranks are now
  real parts; nullable `ringStd` killed the live eeWings false red; `minCog`; numeric
  `chainline`; `leverAccepts` arrays + I-Spec II/B; `forFrames`), the §6 vocab widening +
  `KNOWN_VALUES`/sibling/wheelset warn-lints + **derived kit weights** (REVIEW #12 root fix),
  the **provenance policy decision** (measured weights count for WEIGHT only via
  `sourceType:'measured'` + `weightSource`; retailer rejected; `archiveUrl`; `status`/
  `supersededBy` — Madonnas chained; `soldWithout`), and **structured verdict objects**
  (`{ruleId, slots, msg, fix?}` — the REVIEW #4/#13 masking class is dead; adapter tier enabled).
- **UI:** category + sub-category chips, Sort menu, search, "✓ Verified only" filter, kit quick-fill
  with bundle pricing, shareable build links, four demo builds, the **⚐ Report a wrong verdict**
  modal, and a **📋 View complete build** summary modal (full part list w/ kit pricing + totals +
  copy/share).
- **Try it:** open `index.html` (double-click — no build step). (`TrailBuilder-sample.html` is a
  stale generated snapshot from an early session — don't trust it; safe to delete.)

---

# Roadmap v2 (approved 2026-07-06)

**The bar that governs everything below:** a wrong verdict is worse than a missing feature.
Anything that *claims* something about fit or ride quality needs a source; everything else can
be playful.

## Phase 0 — Ship the beta *(unchanged, still first — needs Douglas)*

1. **Deploy.** Douglas creates the GitHub repo (`gh repo create trailbuilder --public --source=. --push`)
   and sets Pages source → "GitHub Actions" (`.github/workflows/deploy.yml` is ready). Then set
   `REPORT_REPO` in `index.html` to `"owner/repo"` so the built-in **⚐ Report a wrong verdict** modal
   upgrades from copy-to-clipboard to pre-filled GitHub issues (labelled `wrong-verdict`). Real usage
   is the only thing that validates the rules and turns the community into QA.
2. **Domain-expert rule review.** A mechanic/engineer sanity-checks the 19 rules + verified specs.
   Irreplaceable for "the community can rely on it" — and it also unblocks the Phase 4 ride-character
   features (they need an expert-blessed vocabulary).
3. **Keep the verification grind running** (resumable job — next up: Continental/Schwalbe/Michelin/
   Pirelli tires, which all publish weights). **✅ Gate cleared (2026-07-07):** the tire
   `casing`/`compound` fields and `tools/DATA-ENTRY-TEMPLATE.md` exist — the tire batch is a go
   (enumerate each brand's casing/compound values in VOCAB when its batch starts). The
   measured-weight policy is also decided (`sourceType:'measured'`, weight only), which unblocks
   the Shimano / rotor / fork classes — see `tools/VERIFY-PROTOCOL.md`.

## Phase 0.5 — Pre-mass-entry gate ✅ *(DONE 2026-07-07 — seven commits, one per item)*

All seven items of the DATA-MODEL-REVIEW.md §5.1 gate landed in order (ids → template/flat-SKU
kit → disciplines/suspension → semantic fixes → vocab+lints → provenance policy → structured
verdicts), plus the §8 catalog-error fix list (Slash BSA73, Giga UDH, Maven 362 g, fictitious
cranks realized, OneUp V3 source URLs re-verified). Every commit kept `npm test`,
`node validate.js` and `npm run typecheck` green; the suite grew 112 → 160 tests. **Mass data
entry is unblocked** — read `tools/DATA-ENTRY-TEMPLATE.md` before creating rows.

Deferred by design (documented in place): conditional slot-requiredness implementation (with the
first hardtail/DH frame), the `frameSize` share-hash key (readHash tolerates new keys), the BB
category (§5.1-19 — decide with its own commit; the crankBb groundwork is in), and the
"fits with adapter X" data (the `fix` field + verdict structure are ready).

Separate queue — **REVIEW.md Majors #6–#9: ✅ DONE 2026-07-07** (four commits, one per Major, on
`review-majors-6-9`): warning-visible dots, the SRAM-mullet catalog fix, direction-aware
shock-stroke/dropper rules. The REVIEW **Minors** (#10–#28: adapter-solvable rotor direction,
under-forking, coil approval, fork tire clearance, dropper insertion, BB category…) are the
remaining engine backlog.

## Phase 1 — Quick wins on the static app *(no backend, days-not-weeks each)*

- **Weight in lbs** alongside grams/kg on the build summary. *(Trivial.)*
- **Sample builds: budget / mid / high-end.** Recast the demo builds as price tiers using real
  bundle pricing.
- **Clickable part cards → detail view.** Modal with full specs, provenance badge + source link,
  and empty slots for image/retailer links so Phase 2 drops straight in.
- **Build comparison, lite.** Compare two builds side-by-side (totals, weights, verdicts) by
  pasting share links — no login needed. Graduates to saved-builds comparison in Phase 3.
- **🤘 RAD mode.** Easter-egg toggle: neon/checkerboard 1986 theme (the movie *RAD*), maybe a
  "radness meter" on the finished build. Zero honesty-bar risk because it's openly a joke.

## Phase 2 — Richer catalog + data pipeline

- **Schema additions:** `image`, `colors[]`, `retailerLinks[]` per part (update `schema.js` +
  `src/types.js` together, per convention). Colors are display-only — no compat impact.
- **Product pictures.** Manufacturer photos are copyrighted; realistic paths: manufacturer-hosted
  images where brands permit embedding, retailer/affiliate image feeds (licensed for exactly this),
  or clean per-category placeholder illustrations until then.
- **Retailer links → affiliate programs.** Also the legitimate answer for **price feeds** and images.
- **Semi-automated product data scripts.** What can be automated: *fetching and flagging* — a drift
  checker that re-fetches verified parts' source URLs for spec/price changes, and browser automation
  for the JS-rendered/bot-blocked sites in the retry queue. What stays manual: the *judgment* step —
  the grind keeps catching wrong specs that a naive scraper would write through as truth. New
  products arrive as **unverified** and join the existing verification queue; fully-automatic
  ingestion also has ToS/legal friction, so the long-term answer is affiliate/retailer API feeds.

## Phase 3 — Accounts & the garage *(first backend: Supabase/Firebase)*

- **Login + saved builds** (the share-link format already encodes a build, so migration is clean).
- **Garage:** in-progress vs **completed builds**, plus an **owned-parts inventory** — inventory
  then powers "build around what I own" filtering.
- **Full build comparison** across saved builds.

## Phase 4 — Community & ride character *(the ambitious tier)*

- **Forum:** don't build one at first — turn on **GitHub Discussions** at beta launch (free, zero
  code, zero moderation tooling) and only build an in-app forum if the community outgrows it.
- **AI ride-character summary** of a finished build (climbing efficiency, descending capability,
  suspension feel, best-suited rider/terrain) — with guardrails: generated from *objective* build
  facts (travel, weight, tire casing/compound, geometry once added), clearly labeled as opinion,
  never mixed into the fit verdicts, vocabulary blessed by the Phase 0 expert.
- **Efficiency rating:** honest version requires suspension-kinematics + geometry data we don't
  have (the "SB160 less plush than Megatower" comparison is subjective-review territory). Plan:
  add geometry fields to the schema first, ship transparent "character hints" derived only from
  real specs, and treat a numeric uphill-efficiency score as **parked** until there's defensible data.
- **Image of the final build.** In order of realism: a shareable spec-card graphic of the build
  (start here); composited part photos; clearly-labeled AI-generated render.

---

**Sequencing:** Phase 0 step 1 is the whole ballgame — every feature gets better feedback once
strangers can use the app. While that waits on repo creation, Phase 1 is pure momentum and makes
the beta demo dramatically better.

**The bar, always:** a wrong verdict (false "fits" OR false "won't fit") is worse than a missing
rule. Only add rules backed by manufacturer docs + tests, and keep `npm test`, `node validate.js`,
and `npm run typecheck` green on every change.
