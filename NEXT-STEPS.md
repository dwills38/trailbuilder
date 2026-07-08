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
  - ✅ **27.5 / mullet rear wheels UN-PARKED (`catalog-mullet-rears`, +7 rows → 449 parts / 158
    verified / 258 tests).** The mullet rear choice had collapsed to one brand (DT Swiss E 1900) even
    though ~16 frames support mullet. Added Boost 148 27.5 rears in XD and/or Micro Spline for the four
    other brands already known to sell them: **We Are One Union** (XD; fetched vitalmtb.com spec page:
    12x148 Boost or 12x157, 30mm internal, Centerlock/6-bolt), **Spank 359** (XD + Micro Spline; fetched
    spank-ind.com manufacturer page: 12x148 Boost, HG/XD/Microspline, 6-bolt, 30.5mm internal, $449.99),
    **Stan's Flow EX3** (XD + Micro Spline; stans.com's own 148 configs show "coming soon", so existence
    leans on fetched retailer SKU pages — thelostco.com XD at the sibling's exact $505, REI's "27.5 Boost
    Micro Spline" listing title, corroborated by Colorado Cyclist/Bikeman/Modern Bike), and **Hope Fortus
    30** (XD + Micro Spline, Pro 4/Pro 5 per the existing 29 sibling convention; fetched
    bikewheelsdirect.com configurator: Boost 148x12, XD/Microspline/HG, 6-bolt/Centerlock — hopetech.com's
    own page confirms 27.5 + 148 Boost exist but doesn't break specs out per wheel size). Mullet rear
    choice is now **5 brands** instead of 1. All sample data (unverified) mirroring each brand's existing
    29" sibling row for weight/price except where a fetched page stated a 27.5-specific number (Spank's
    30.5mm internal + $449.99; Stan's $505 exact match). Also still parked: 150/190mm fork travels,
    alternate-freehub *fronts* (fronts have no freehub), dropper drop-length options (display-only).
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
  **Pass 3 (`catalog-disciplines-3`, 2 commits, +6 rows → 401 parts / 141 verified):** trail
  frames 3→6 (**Stumpjumper 15, Fuel EX C Gen 6, Hightower 3** — all picked because their shock
  sizes already existed in-catalog; the Fuel EX correctly rejects std-mount shocks, trunnion
  guard), **Synthesis DH 11 29 wheels** (front verified vs crankbrothers.com — second DH wheel
  brand), **verified Racing Ralph** (schwalbetires.com SKU page fetched; casing += super-race,
  compound += addix-speed). Browser-verified: 34 frames (DH 5 / Trail 6 / XC 1), the Exceed's
  shock slot shows "not needed for this frame". Held-documented: the 20x110-STANDARD 27.5
  Synthesis front exists (Amazon SKU) but is a dead-end part until a full-27.5 DH frame lands
  (the Bomber 58 remains buildable-blocked).
  **Pass 4 (`catalog-disciplines-4`, 4 commits, +8 rows → 413 parts / 147 verified / 254 tests):**
  the queue's four priorities all landed. (1) **The first FULL-27.5 DH frame — Commencal FRS**
  (fetched commencal.com FT4FRS3 page: 200mm, 250x75 std, 12x150, PF107, ZS44/ZS56, PM/203,
  "UDH hanger: No", 4.22 kg) + its ecosystem: **verified Synthesis DH 27.5 front** (865 g,
  crankbrothers.com), FR 1500 27.5 rear in 12x150 (fetched Universal Cycles; ships 12x157 with
  12x150 end caps in box), **verified 27.5 DH Assegai** (TB00017200) → **golden full-27.5 DH
  build pinned**. ⚠️ Correction: the crankbrothers page lists BOTH Synthesis DH fronts as
  20x110 **Boost** — pass 3's Amazon-sourced "20x110 STANDARD" note was REFUTED, so **the
  Bomber 58 (non-Boost) is still wheel-blocked** (needs a fetchable 20x110-standard 27.5 front;
  none found yet). (2) **The Lux World Cup blocker cleared**: fetched MBR review states the
  rear is a **160 mm flat mount** (and fetched bike-magazin.de on the new 2026/27 gen confirms
  by contrast — it "returns to post-mount"). Entered `fr-canyon-lux-world-cup-cf` (the first
  XC FULL-SUS + first FM full-sus) + SIDLuxe 210x50 + the first 160 mm rotor (CenterLine X,
  fetched sram.com) + **verified Racing Ray front** (schwalbetires.com SKU 11654052.01) →
  **golden XC full-sus build pinned**. (3) XC breadth: **Conti Cross King** (vocab widened:
  casing += `protection`, compound += `blackchili`; Race King skipped — no fetchable page left,
  404/404/403) + **verified Synthesis XCT 11 wheels** (700 g front; MS + XD rear rows).
  (4) **Per-discipline demo buttons in the UI** (DH ⛰️ / Trail 🌲 / XC 🐇), each mirroring a
  golden — including a **new TRAIL golden** (Stumpjumper 15 + SD 210x55 + GX + XT). checkBuild
  caught the XC demo's first draft (CL rotors on the XCT 11's 6-bolt hubs) — demo switched to
  the EX 1700 pair. Browser-verified on a fresh preview server (all three buttons → "No
  conflicts found", 0 console errors). Skipped-documented: **Lux Trail CF** (fetched canyon.com
  spec lists 160 F / 180 R rotors — backwards from every convention, no second source; entering
  FM+maxRotor on contradictory data risks a wrong verdict), Race King (above).
  **Pass 5 (`catalog-disciplines-5`, 3 commits, +7 rows → 420 parts / 150 verified / 254 tests):**
  (1) **160 mm 6-bolt rotor** (CenterLine, fetched WWC) → **the XC demo + golden now run the
  verified 700 g-front Synthesis XCT 11 wheels** ($9,941 / 10.6 kg, browser-verified).
  (2) **27.5 DH tire breadth for the FRS**: verified DHF + DHR II 27.5x2.5 DH MaxxGrip (fetched
  maxxis.com SKU tables; classic F/R pairing) + **verified Magic Mary 27.5x2.4 Super Downhill**
  (fetched schwalbetires.com SKU 11654180) — the FRS went from 1 tire to 4 across 2 brands; the
  FR 1500 27.5 front (fetched WWC) makes its front wheel 2-brand too. (3) **Second XC hardtail:
  Scott Scale RC SL** (847 g) — scott-sports.com product pages FETCH (new discovery); PM rear
  with direct 160-rotor bosses per fetched BikeRadar; 31.6/PF92/UDH per fetched Vital.
  (4) **SID SL Ultimate 100** (fetched Wheel & Sprocket; native PM160 → first XC `minRotorF`;
  the sram.com model page 404s). **Bomber 58 unlock: DRY this pass** — Sun Ringlé Düroc (Hayes'
  own page: Boost only), Halo Chaos (100 mm or 110 Boost), Spank (sells the HEX 20x110-std hub
  but no complete wheel): no fetchable 20x110-STANDARD 27.5 front wheel exists in current
  production; the fork stays catalogued + buildable-blocked, documented in both wheel descs.
  **Pass 6 (`catalog-disciplines-6`, 3 commits, +7 rows → 427 parts / 153 verified / 254 tests):**
  (1) **XC kit pricing**: `gs-shimano-xtr-m9100` groupset preset + `ws-crankbrothers-synthesis-xct11-29-ms/-xd`
  wheelset presets (crankbrothers sells the pair at $2,400 = component sum) → the XC demo button
  now loads with drivetrain+wheels+cockpit bundles on: **$9,784 / 10.6 kg**, browser-verified.
  (2) **Canyon Neuron CF** — the 130 mm trail tier (fetched canyon.com CF 8 spec: 210x50 M-XL,
  12x148, 30.9, BSA73, 2460 g; the XS/S sizes run 27.5 + 190x45, a different config — documented,
  not conflated; maxRotorR 180 = maker-demonstrated stock; udh:false per the Jibb precedent).
  (3) **Verified Rekon Race x2** (fetched maxxis.com table: TB00046300 2.25/737 g, TB00211100
  2.4/814 g) — third XC tire family. (4) **Verified Öhlins RXF34 m.2 120** (fetched ohlins.com:
  1698 g, $1,309, brake dim 180–203 → both minRotorF and maxRotorF maker-stated) — the
  XC/downcountry fork choice was RockShox-only. Skipped-documented: **Specialized Epic Hardtail**
  (no fetched source states its rear brake mount — Vital + two BikeRadar reviews all silent; same
  discipline as the Lux Trail skip), Commencal Clash (URL 404s). Fork-tier note: the pass-5 claim
  that 140-150 forks were thin was wrong — Pike 130/140, Fox 34 140, Mattoc 150 already cover it.
  **Pass 7 (`catalog-disciplines-7`, 3 commits, +5 rows → 432 parts / 154 verified / 254 tests):**
  (1) **RAAW Yalla!! V2 — VERIFIED** (fetched raawmtb.com spec page, Madonna precedent): the
  first TRUNNION DH frame, first UDH/T-Type DH frame, seventh DH frame (198 mm, 225x75 trunnion,
  148x12 Boost rear — V1 was 157, BSA83, PM 223 max, 2.6 maker maxTire, 4.2 kg, $2,924) + its
  shock size (Vivid Ultimate 225x75 trunnion, fetched WWC) so the slot isn't a dead end.
  (2) **Commencal Meta HT V3 — the first trail/AM hardtail** (fetched commencal.com frame page;
  **vocab widened: frameBb += BSA68**, the classic 68 mm threaded shell; 29 M-XL + mullet-on-S,
  UDH, PM 200, 64 mm maker maxTire → rule 18 active, 2.32 kg alu). (3) **Commencal T.E.M.P.O.**
  — the 125 mm downcountry tier (fetched tech-tempo page: 210x50, PF92, UDH, maker maxTire).
  (4) **FR 1500 DH wheelset preset** → the DH demo now loads with wheels-kit pricing
  (browser-verified, $9,026).
  **Pass 8 (`catalog-disciplines-8`, 2 commits, +7 rows → 439 parts / 157 verified / 254 tests):**
  **privateerbikes.com FETCHES (new discovery)** — both Gen 2 framesets entered from their own
  pages: **161 G2** (enduro, 205x60 trunnion, UDH explicitly NO — flip chips, 2.5 design tire)
  and **141 G2** (trail, 185x55 trunnion = the Jibb size), each with its bundled custom-tuned
  Fox shock as a new row (Float X2 PE 205x60-trun / Float X PE 185x55-trun — both also retail
  SKUs). **SRAM Level Ultimate Stealth VERIFIED** (sram.com model page, 254 g maker-published)
  — the XC post-mount brake choice was Shimano-only. **Vittoria Mezcal XC Race 29x2.4 + 2.25
  both VERIFIED** (vittoria.com; vocab widened: casing += `xc-race`, compound +=
  `graphene-silica`). **Addendum D3 (landed directly on main, gates green pre-commit; +3 rows
  → 442 parts / 158 verified):** the **first STEEL frame — Cotic Solaris** (Reynolds 853 trail
  hardtail; **cotic.co.uk fetches — new discovery**; its PM7 mount takes a 180 mm rotor ONLY,
  and the frame-side rotor *minimum* is un-modeled — noted in the row), the Fox **Transfer SL**
  30.9/100 XC dropper (~330 g vs the ~600 g trail posts), and the **verified Eggbeater 3**
  (280 g/pair, crankbrothers.com). Skipped: **Bird** (bird.bike swallows deep product URLs —
  homepage only). **Next pass:** more frames from fetchable makers, Epic HT/Spark/
  Genius only with maker docs (integrated-shock/FM minefields), 27.5 XC tires if a 27.5 XC frame
  ever lands, drift-checker script (Phase 2), mullet-rear wheels (still parked).
  **Frame-holdouts pass (`catalog-frames-holdouts`, +2 rows → 451 parts / 280 tests):** the
  **Specialized Epic 8 family — both prior brake-mount holdouts CLEARED.** The Epic HT skip (the
  rear brake mount was "stated nowhere fetched") is resolved by a *stock-caliper* pin: every Epic 8
  trim ships a SRAM **Level/Code** caliper, which is **post-mount** (SRAM makes no flat-mount MTB
  caliper), so the frame is PM — a sound inference, documented in each row. (1) **`fr-specialized-epic-8`**
  (full-sus XC): 120 mm rear + **RockShox SIDLuxe 190×45 STANDARD** mount from the FETCHED Specialized
  Epic 8/EVO 2024 owner manual (*"...Solo Air, 190x45mm"*) corroborated by the FETCHED Vital EVO spec
  table (FOX FLOAT 190×45) — and that shock **already exists in-catalog** (`sh-rockshox-sidluxe-ultimate-190x45`),
  so it's buildable out of the box; 12×148 Boost + SRAM DUB BSA73 threaded + 30.9 post + UDH from those
  fetched sources; maxForkTravel 130 (Flow); maxTire omitted (base clears ~2.35, EVO 2.4 — left dormant
  vs a false green). (2) **`fr-specialized-epic-hardtail`**: SRAM Level TL 2-piston + 160 mm rotor per
  FETCHED BikeRadar → PM; FACT 11m, 12×148 Boost, DUB BSA73, 30.9 post, UDH. Engine-verified: the Epic 8
  accepts its 190×45 std shock clean, rejects a 205×60 trunnion on both size+mount, and the hardtail
  fires the rear-shock-guard error when a shock is picked. **Scott Spark/Genius re-evaluated and SKIPPED**
  per the bar: proprietary integrated **Nude T165×45 + TwinLoc**, no maker aftermarket-shock policy — a
  standard 165×45 trunnion physically bolts in but the frame is built around the custom Nude (reservoir
  clearance / geometry-adjust), so claiming "fits" risks a wrong verdict. Enter only if a maker doc ever
  pins the aftermarket policy. **Note:** this pass rode into a **concurrent-session branch race** (the
  shared working tree was switched under it to `tools-drift-checker` mid-edit) — recovered cleanly by
  saving the isolated diff as a patch, restoring the shared tree, and re-applying onto a fresh checkout
  of latest main. Lesson: with multiple sessions on one working dir, keep each change to a saveable diff
  and re-verify `git branch --show-current` before every commit.
- ✅ **Drift checker DONE (`tools/drift-check.js`, branch `tools-drift-checker`, MERGED+PUSHED
  2026-07-08).** Zero-dep, resumable, style-matched to `verify-job.js`: re-fetches every
  `verified:true` part's `source` URL (plain `https`/`http`, follows redirects, 12s timeout) and
  checks whether its price/weight still appear on the page as plain-text substrings (multiple
  number formats: grams, kg 1/2dp, lbs 1dp+rounded, comma-grouped price). Dispositions: `ok` /
  `changed` (a catalogued number wasn't found — go re-verify by hand) / `unfetchable` (403/429,
  a JS-challenge shell, or a documented standing-blocked host — not retried by default) /
  `fetch failed` (transient — DNS/timeout/5xx — retryable via `reset --failed`). **Never writes to
  the catalog** — same judgment-stays-manual principle as the verify grind; it's a signal, not an
  autocorrector. State + a committed report live in `tools/drift-report.json`; `npm run
  verify:drift` runs the next batch (default 20, `--limit n`). 22 fixture-based unit tests
  (`test/test-drift-check.js`) cover the token-matching + classification logic with no network;
  `tools/drift-check.js` is `// @ts-nocheck` + excluded from `tsconfig.json`'s `include` (same
  non-goal as `verify-job.js`, which was never in scope either — both are Node CLI scripts over
  dynamic external data, not the pure logic the typecheck gate exists to protect). **Smoke-tested
  live against the real catalog**: of the first 8 verified parts checked, RAAW's 3 Madonnas came
  back `ok`, but Canyon (Strive CFR) and Commencal (Meta SX V5) came back `changed` on price —
  turns out correctly, since those rows document their price as sample/currency-converted, not
  page-sourced (the checker is doing its job: flagging catalog claims the page doesn't literally
  back up, whether that's real drift or just a documented sample field). **Still open (not started
  this pass):** browser automation for the JS-rendered/bot-blocked retry queue (a separate,
  heavier-weight problem than plain-https drift checking).
  **First full run over all 165 verified parts, 2026-07-08 (`drift/first-full-run`):** 150 `ok`,
  14 `changed` (all on price, zero on weight), 1 `unfetchable` (bike.shimano.com — confirmed
  genuine 403, not currently in `KNOWN_UNFETCHABLE_HOSTS`), 0 fetch failures. Every `changed` row
  hand-triaged by re-fetching its source — full breakdown in
  [`tools/DRIFT-TRIAGE-2026-07-08.md`](tools/DRIFT-TRIAGE-2026-07-08.md). Headline: **4 real
  drift candidates for the verification queue** (SRAM XS-1275 cassette $380→$275 on SRAM's own
  page; Hope F22 pedal $260→~$203 USD-equiv; RAAW Yalla V2 + Jibb each +$2, likely one blanket
  price bump; Schwalbe Big Betty needs its configurator re-checked, "from $49" teaser vs our
  $102 SKU isn't a clean comparison), **1 ambiguous status signal** (Canyon Strive CFR now shows
  "Sold out" across all sizes + member-gated pricing — needs a real browser session, not a
  plain fetch, to tell sold-out-temporarily from discontinued), **1 expected supersession
  artifact** (RAAW Madonna V3's source URL now serves V3.2 content — matches the row's own
  `supersededBy`, no action needed), and **8 matcher-pattern gaps, not real drift** (mostly
  `.99`-ending prices vs a whole-dollar catalog value, a space-thousands-separator format on
  Öhlins' site, and three source URLs that are spec/FAQ pages which never carried a price at
  all). No catalog rows were edited by this pass — triage findings are a queue, not a fix.

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
