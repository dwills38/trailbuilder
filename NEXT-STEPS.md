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
- 🚧 **Catalog breadth (started 2026-07-08, branch `catalog-breadth` — NOT merged).** Most brands had
  only ONE SKU cataloged, collapsing real choice on almost any frame. Worked the categories with a
  genuine **fit-collapse** (a real compatibility rule was falsely narrowing choice), 30 rows added as
  sample data, each variant's existence confirmed via a fetched manufacturer/retailer page:
  - ✅ **Shocks (+11).** The motivating case is fixed: a Madonna V3.2 (205×65 trunnion) now takes
    Öhlins / EXT / Cane Creek / Marzocchi / DVO / Manitou (was RockShox+Fox only → 8 brands). EXT
    Storia + Manitou also fill the four other single-brand eye×stroke×mount combos; every frame
    shock-combo now has ≥2 brands.
  - ✅ **Rear wheels (+7 Micro Spline).** Was 13 XD brands vs 4 Micro Spline, so Shimano drivetrains
    (~half the market) had almost no compatible wheel. Added factory Micro Spline freehub variants of
    DT Swiss EX 1700, Reserve 30 HD, Race Face Turbine SL, Hope Fortus 30, Stan's Flow EX3, Spank 359,
    ENVE AM30 → Shimano Micro Spline cassettes now fit **11** rear-wheel brands (was 4).
  - ✅ **Forks (+6 travel options).** ~11 frames are 160mm design travel but the big 38mm forks were
    cataloged only at 170. Added ZEB 160, Fox 38 160, Öhlins RXF38 160+180, Manitou Mezzer 160+180.
  - ✅ **Droppers (+6 diameters).** 31.6 was well-covered (12 platforms) but 34.9 had 3 and 30.9 had 2.
    Added Fox Transfer, RockShox Reverb AXS and SDG Tellis in 34.9 + 30.9 → 34.9 now 6 platforms, 30.9 now 5.
  - ⏸ **Deliberately NOT expanded — no real fit-collapse:** brakes (all catalog brakes are PM / 4-piston —
    universal, zero fit-variance), cranksets (`bb` feeds an info advisory, not an error; T-Type already has
    2 cranks), and handlebars (clamp is covered on both 31.8 and 35, and 35 is the enduro standard with 12
    bars; the remaining bar variance is display-only rise/width). Adding rows there is cosmetic padding.
  - ⏸ **Deferred (deprioritized this session):** 27.5 / mullet **rear** wheels — 16 frames support mullet
    but only DT Swiss has a 27.5 rear, so mullet rear choice is DT-Swiss-only. Real gap, but mullet is the
    less common case; pick it up later (existence already scoped: We Are One, Stan's, Hope, Spank, DT Swiss
    all sell 27.5). Also parked: 150/190mm fork travels, alternate-freehub *fronts* (fronts have no freehub),
    dropper drop-length options (display-only). Research per `tools/DATA-ENTRY-TEMPLATE.md`; branch is green
    on every commit (validate + tests + typecheck), one commit per category. **Does not need Douglas.**
- 🚧 **Discipline expansion (DH / Trail / XC) — pass 1 MERGED+DEPLOYED 2026-07-08; pass 2 on
  branch `catalog-disciplines-2` (NOT merged).** Pass 1 (`catalog-disciplines`, 11 commits):
  all the schema machinery (`frontAxle` 20x110 Boost + non-Boost, `steerer`/`headset`
  `straight-dc`, `system` `sram-dh-7` chain-token decision, `rearAxle` 150x12, `frameBb` PF107,
  frame-aware `slotRequired`, discipline filter chips) + 5 brand sweeps (+23 rows: BoxXer, Pike,
  SID, SIDLuxe, the full X01 DH 7s group w/ XG-795 verified, Fox 40/34/Float SL, Bomber 58,
  **Supreme DH V5**, Vivid DH 250x75s, FR 1500 DH wheels, Assegai DH, **Spectral CF**), and the
  **golden-pinned complete DH build**. Pass 2 (`catalog-disciplines-2`, 4 commits, +13 rows,
  **395 parts / 248 tests**): **DH frames 1→5** (Sender CFR, Tues CF, V10 8, Session 8 — plus
  `frameBb` += BSA83 and the SD Ultimate DH 250x72.5 for the Session), **trail frames 1→3**
  (RAAW Jibb 185x55-trunnion + Meta V5 210x55, both from fetched maker pages, + their SD
  Ultimate shock sizes), **the first XC HARDTAIL** (Exceed CF — `brakeMount` += **FM** per
  fetched BikeRadar, first flat-mount brake XTR BR-M9110, hardtail machinery live end-to-end),
  and **verified Aspen XC tires** (fetched maxxis.com SKU table; compound += maxxspeed) →
  **golden-pinned complete XC hardtail build** ($6,690 / 10.2 kg). Skipped-documented: Canyon
  Lux WC (brake mount still unfetchable — needs its own manual/PDF), Schwalbe XC tires (URL
  pattern changed; Super Race casing needs vocab when entered), SID SL, 26".
  **Next pass:** Lux WC + SIDLuxe 210x50, Schwalbe/Conti XC tires, XC/DH wheels breadth
  (20x110-nonboost front for the Bomber 58 has no wheel yet), more trail frames (Hightower,
  Stumpjumper, Fuel EX via retailer existence), demo builds per discipline in the UI.
- ⬜ **Semi-automated product data scripts.** A drift checker that re-fetches verified parts' source
  URLs for spec/price changes, and browser automation for the JS-rendered/bot-blocked retry queue.
  What stays manual: the *judgment* step — the grind keeps catching wrong specs a naive scraper would
  write through as truth. New products arrive as **unverified** and join the existing queue.

## Phase 3 — Accounts & the garage *(backend chosen: **Supabase**; code built, awaiting keys)*

- 🚧 **Login + saved builds + inventory — BUILT and shipped INERT (branch `phase3-accounts`).**
  Backend decision made (**Supabase**, 2026-07-08). The whole feature is implemented behind an
  `ACCOUNTS_ENABLED` gate that is false until keys are set, so it's live-safe to merge:
  - `src/vendor/supabase.min.js` — vendored `@supabase/supabase-js` v2.110.1 UMD, loaded via a
    classic `<script>` (honors no-build-step / no-CDN). `src/config.js` — publishable URL + anon
    key (placeholders) + the `ACCOUNTS_ENABLED` gate (same committed-constant pattern as `REPORT_REPO`).
  - `src/account.js` — async auth + builds + inventory data-access (PKCE so the OAuth callback lands
    in `?code=`, never colliding with the `#b=` build hash). `supabase/schema.sql` — `builds` +
    `inventory` tables with **owner-only RLS**. Saved-build payload is the same `{b,p}` as a share
    link, re-validated through `sanitizeShare` on load (id-migration safety for free).
  - UI: header account control, auth/garage/inventory modals, "⭑ Save to garage" — all gated,
    following the existing `<dialog>`/`sync()` patterns. Garage rows show a live verdict dot + totals.
  - `test/test-account-serialize.js` proves the garage↔share payload contract. Verified inert in the
    browser (account UI hidden, no console errors, no visual regression); validate/tests/typecheck green.
- 🔑 **Blocked on Douglas — the only thing left to go live: [`supabase/SETUP.md`](supabase/SETUP.md).**
  Create the Supabase project, run `schema.sql`, enable GitHub OAuth (+ magic link), set the redirect
  URLs, and paste the Project URL + anon key into `src/config.js`. Then E2E test per SETUP §6 and ship.
- **Full build comparison** across saved builds (the Phase 1 lite version, via pasted links, is done)
  — a natural follow-up once builds live in the garage.

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
