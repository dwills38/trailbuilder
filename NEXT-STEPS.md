# Where we are + next steps

_A living snapshot. Architecture/conventions live in `CLAUDE.md`; full history in `git log`._

## Where we are (as of 2026-07-08)

TrailBuilder — "PCPartPicker for enduro mountain bikes": pick parts, get real-time
fit / price / weight checks. Plain static app (`index.html` + `src/`), no build step.

**🚀 LIVE: [dwills38.github.io/trailbuilder](https://dwills38.github.io/trailbuilder/)** — public,
no login, safe to share with anyone. Repo: [github.com/dwills38/trailbuilder](https://github.com/dwills38/trailbuilder).

**Solid foundation, honestly-scoped prototype:**

- **Layout & tooling:** `src/` + `test/`; full-`strict` JSDoc type-checking (`npm run typecheck`);
  Vitest (`npm test` — **204 tests**); GitHub Actions CI; **deployed** via GitHub Pages
  (`.github/workflows/deploy.yml`, gated on validate+tests, green on every push to `main`).
- **Engine:** 19 compatibility rules + a regression/fuzz **fortress** (`test/test-invariants.js`),
  proven crash-free, deterministic, and **dot-honest** — a green dot never hides a newly-introduced
  conflict, with clean verdict messages. A 2026-07-06 adversarial audit (**`REVIEW.md`**) found 5
  Critical false-greens — all fixed same day (actuation, T-Type chainring, minimum rotor, preset-dot
  baseline, shifter clamp) — and its **Major findings (#6–#9) were fixed 2026-07-07** (one commit
  each, branch `review-majors-6-9`): **warning-visible yellow dots** (four states, honest legend,
  "N thing(s) to check" wording), the **XD 27.5 rear wheel + kit** that breaks the SRAM-mullet
  catalog trap (golden Meta SX Transmission build pinned), and **direction-aware shock-stroke and
  dropper rules** (impossible direction = error; manufacturer-supported direction = quantified
  warning). **The REVIEW Minors were swept the same day** (branch `review-minors-sweep`, four
  commits): rotor adapter direction with the first structured `fix` (#10), honest kit badge (#11),
  three dormant sourced-data rules — under-forking, coil approval, fork tire clearance
  (#14/#21/#22), dead-rule pins (#15), a real 2.6″ tire activating rules 14/18 (#16), OEM
  frameless convention (#17), frameless reverse-mullet guard (#18), long-drop insertion info
  (#23), the reachable preset↔group totals-corruption fix (#25), and the SuperBoost non-rule pin
  (#27). **REVIEW.md is fully retired** except two deliberate deferrals: the real insertion-depth
  check (needs a frame-size concept) and the BB category (§5.1-19, its own decision).
  Verdicts are *self-consistent* — **not yet validated
  against the real world** (no expert review, no real riders).
- **Data:** 329 parts across ~100 brands. Verification is a **resumable checkpointed job**
  (`tools/verify-job.js` + `tools/VERIFY-PROTOCOL.md`; any session resumes via `npm run verify:status`)
  and is now **271/313 processed (87%)**: 136 Verified against manufacturer pages/documents, 134
  Skipped with a documented reason (maker publishes no weight, no reputable third-party measured
  figure exists, etc.), 42 still in the retry queue. **The remaining 42 are a real tooling wall, not
  more grinding**: both WebFetch and browser automation are blocked on nearly every bike-brand domain
  (Trek, Norco, Pivot, Rocky Mountain, Specialized, Industry Nine, DT Swiss's configurator, Roval,
  We Are One, Newmen, Spank, Bontrager, Giant) — confirmed still true as of 2026-07-08.
  `pushindustries.com` was a rare exception (caught a real price drift on the Push Eleven Six shock).
  **Hard-won policy, keeps paying:** a retailer's own "we weighed it" claim is still REJECTED as a
  verified-weight source — only an editorial outlet with no sales interest counts (Bikerumor/MBR/
  BikeRadar teardown, not Bike24/Commencal/Amazon). Search-result summaries also keep lying (four
  fictional tire sizes caught in the tire batch, wrong shock/seatpost/rotor specs caught elsewhere) —
  only a fetched manufacturer page counts.
- **🚨 Catalog breadth gap (found 2026-07-08, not yet worked):** most brands only have ONE SKU
  cataloged (one size/mount/config), so picking almost any frame narrows real choices to whichever
  1–2 brands happen to fit. Quantified: shocks 7/9 brands single-SKU, forks 10/14, front wheels
  **17/18**, handlebars 13/14, droppers 9/13, cranksets 3/5, brakes 3/8. This is the single biggest
  thing between "prototype" and "feels like a real parts picker" — see the Phase 2 addition below.
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
  with bundle pricing, shareable build links, the **⚐ Report a wrong verdict** modal (live GitHub
  issues), and a **📋 View complete build** summary modal. **All of Phase 1 shipped 2026-07-07/08**
  (see below) plus a Phase 2 quick hit: clickable part cards → a full-spec detail modal, budget/
  mid/high-end sample builds (real pricing, 0 conflicts each), lite build comparison via pasted
  share links, a downloadable spec-card share image, per-category placeholder illustrations
  (`image`/`colors`/`retailerLinks` schema fields exist and the UI is wired for them — no real data
  entered yet), and two purely-cosmetic theme toggles: **🤘 RAD mode** and **🏳️‍🌈 Roadie mode**
  (mutually exclusive, zero effect on any verdict).
- **Try it:** live at [dwills38.github.io/trailbuilder](https://dwills38.github.io/trailbuilder/), or
  open `index.html` locally (double-click — no build step). (`TrailBuilder-sample.html` is a
  stale generated snapshot from an early session — don't trust it; safe to delete.)

---

# Roadmap v2 (approved 2026-07-06)

**The bar that governs everything below:** a wrong verdict is worse than a missing feature.
Anything that *claims* something about fit or ride quality needs a source; everything else can
be playful.

## Phase 0 — Ship the beta

1. **Deploy. ✅ DONE 2026-07-07.** Live at dwills38.github.io/trailbuilder; CI + deploy workflows
   green; `REPORT_REPO` wired so **⚐ Report a wrong verdict** files real GitHub issues.
2. **Domain-expert rule review — packet ready, still needs Douglas.** **The review packet is ready:
   [`EXPERT-REVIEW-DOSSIER.pdf`](EXPERT-REVIEW-DOSSIER.pdf)** (print-ready PDF generated 2026-07-07,
   `scripts/build_dossier_pdf.py`) — every rule's claim, tier, sources and open questions in mechanic
   language (~2-3h review, no code reading). **Still open: recruit the reviewer and hand them the
   PDF.** Nothing else can happen on this until that human step happens.
3. **Verification grind — 87% processed, hit a real wall.** 271/313 parts have a final disposition
   (136 Verified, 134 Skipped-documented). The remaining 42 need either a differently-configured
   browser session or Douglas manually fetching a few blocked pages — see the "Data" bullet above.

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

Separate queue — **REVIEW.md: ✅ FULLY RETIRED 2026-07-07.** Majors #6–#9 (four commits on
`review-majors-6-9`) and the Minors sweep (four commits on `review-minors-sweep`) are all landed.
Deliberately deferred, documented in REVIEW.md's status header: the real insertion-depth check
(needs a frame-size concept) and the BB category (DATA-MODEL-REVIEW §5.1-19, its own decision).

## Phase 1 — Quick wins on the static app ✅ *(ALL DONE 2026-07-07/08)*

- ✅ **Weight in lbs** alongside grams/kg on the build summary.
- ✅ **Sample builds: budget / mid / high-end.** Real bundle pricing, 0 conflicts each
  ($5.9k / $9.2k / $15.4k).
- ✅ **Clickable part cards → detail view.** Full specs, provenance badge + source link; generic
  field renderer auto-covers new schema fields (image/colors/retailerLinks slot in with no UI change).
- ✅ **Build comparison, lite.** Paste a share link, see it side-by-side (verdict/price/weight/
  per-group diff) with your current build.
- ✅ **🤘 RAD mode** — neon/checkerboard theme + a joke radness meter. Plus a second toggle not
  originally planned: **🏳️‍🌈 Roadie mode** (pride-flag theme), mutually exclusive with RAD mode.

Nothing left on this list — every Phase 1 item shipped and is live.

## Phase 2 — Richer catalog + data pipeline

- ✅ **Schema additions DONE 2026-07-08:** `image`, `colors[]`, `retailerLinks[]` per part
  (`schema.js` + `src/types.js`, 6 negative tests). Display-only, no compat impact. The part-detail
  modal already renders real data when present.
- ✅ **Placeholder illustrations DONE 2026-07-08:** 11 clean hand-drawn stroke-icon SVGs (one per
  part group) show on every card and in the detail modal until a real photo exists.
- ✅ **Build image, first rung DONE 2026-07-08:** downloadable spec-card share image (SVG→canvas→PNG).
- ⬜ **Real product photos.** Manufacturer photos are copyrighted; needs manufacturer permission,
  a retailer/affiliate image feed, or staying on placeholders. **Blocked on Douglas** (licensing call).
- ⬜ **Retailer links → affiliate programs.** Also the legitimate answer for **price feeds** and
  images. **Blocked on Douglas** (which program(s) to join).
- 🚨 **NEW, highest-value open item (found 2026-07-08): catalog breadth.** Most brands have only
  ONE SKU cataloged — add the missing size/mount variants, starting with shocks (7 of 9 brands are
  single-SKU 230×65-std-only; a Madonna V3.2 owner currently can't pick an Öhlins/EXT/Cane Creek/
  Marzocchi/DVO/Manitou shock because none of them have a 205×65-trunnion row yet, even though those
  brands make one in real life). Same narrowness in forks (10/14 single-SKU), front wheels (17/18!),
  handlebars (13/14), droppers (9/13). Real research per `tools/DATA-ENTRY-TEMPLATE.md`, sample data
  until the verification grind catches it (same convention as the rest of the catalog) — **does not
  need Douglas, a session can start this unprompted.**
- ⬜ **Semi-automated product data scripts.** A drift checker that re-fetches verified parts' source
  URLs for spec/price changes, and browser automation for the JS-rendered/bot-blocked retry queue.
  What stays manual: the *judgment* step — the grind keeps catching wrong specs a naive scraper would
  write through as truth. New products arrive as **unverified** and join the existing queue.

## Phase 3 — Accounts & the garage *(first backend: Supabase/Firebase — not started)*

- **Login + saved builds** (the share-link format already encodes a build, so migration is clean).
- **Garage:** in-progress vs **completed builds**, plus an **owned-parts inventory** — inventory
  then powers "build around what I own" filtering.
- **Full build comparison** across saved builds (the Phase 1 lite version, via pasted links, is done).
- **Blocked on Douglas:** pick Supabase vs Firebase before this is worth scoping at all.

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
- **Image of the final build.** In order of realism: ✅ a shareable spec-card graphic of the build
  (**DONE 2026-07-08**, moved up from Phase 4 as a Phase 1/2 quick hit); composited part photos
  (needs Phase 2 photos first); clearly-labeled AI-generated render.

---

**Sequencing, updated 2026-07-08:** Phase 0 is deployed and live — that part of the ballgame is won.
What's left splits cleanly into two buckets: **things only Douglas can unblock** (expert-review
reviewer, image/affiliate licensing, Supabase-vs-Firebase) and **things a session can pick up
unprompted** (catalog breadth expansion — the highest-value one — and the remaining verification
retry queue, though that one's hit a real tooling wall). Catalog breadth is the current top
recommendation: it's the thing actually limiting what people can build today, and doesn't wait on
anyone.

**The bar, always:** a wrong verdict (false "fits" OR false "won't fit") is worse than a missing
rule. Only add rules backed by manufacturer docs + tests, and keep `npm test`, `node validate.js`,
and `npm run typecheck` green on every change.
