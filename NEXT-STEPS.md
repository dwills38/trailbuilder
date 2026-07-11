# Where we are + next steps

_A living snapshot. Architecture/conventions live in `CLAUDE.md`; full history in `git log`._

## Where we are (as of 2026-07-11)

> **Live state (2026-07-11):** **1865 parts / 1337 verified (72%) / 439 tests / 20 rule areas**; `node validate.js` 0 problems, `tsc` clean; CI + GitHub Pages green (origin/main `6dd5361`). **The expert rules review is 100% COMPLETE and applied** (all 19 original rule areas + non-rules + gaps — durable record: annotated `EXPERT-REVIEW-DOSSIER.md`). **Phase 3 accounts LIVE**; **the in-app forum LIVE with 18 categories** (vocab in `src/forum.js` — adding categories needs no SQL). Shipped 2026-07-10→11: 🌙 dark mode, tire-width filters, the **headset category** (rule 20, S.H.I.S. codes on 77/127 frames), **catalog list view** (default, cards toggle), **guided build flow** (pick → auto-advance + compatible-only), rule 6b (integrated-cassette wheels), mobile fixes. Catalog stays verdict-clean: wave-r3's adversarial audit killed 2 false-fits, caught 1 fabrication pre-merge, and demoted 2 false verifications; the frames S.H.I.S. pass audited 28/28 clean. _Inline figures below drift — trust the live gates._
>
> **Focus (2026-07-11):** the **left rail is SHIPPED and REFINED** (Douglas-approved rail-refine landed `61f4929`: discipline-first rail, toolbar strip with toggles + sample-builds dropdown + legend, community/login in the header) and the **stale Budget demo is fixed** (`6dd5361`: Domain Gold RC fork; all three price-tier demos now golden-pinned — 439 tests). **The style pass is UNBLOCKED** (mountain-panorama header art etc. — starts when Douglas schedules it). In flight: night-shift catalog grind (self-merge mandate), random sample-builds generator (Opus). Blocked-on-Douglas: **domain purchase (today)** → affiliate signups → stickers. Coordination state + follow-up queue: `COORDINATOR-HANDOFF.md`.

TrailBuilder — "PCPartPicker for enduro mountain bikes": pick parts, get real-time
fit / price / weight checks. Plain static app (`index.html` + `src/`), no build step.

**🚀 LIVE: [dwills38.github.io/trailbuilder](https://dwills38.github.io/trailbuilder/)** — public,
no login, safe to share with anyone. Repo: [github.com/dwills38/trailbuilder](https://github.com/dwills38/trailbuilder).

**Solid foundation, honestly-scoped prototype:**

- **Layout & tooling:** `src/` + `test/`; full-`strict` JSDoc type-checking (`npm run typecheck`);
  Vitest (`npm test` — **380 tests**); GitHub Actions CI; **deployed** via GitHub Pages
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
- **Data:** 1772 parts (sample + verified). Verification is a **resumable checkpointed job**
  (`tools/verify-job.js` + `tools/VERIFY-PROTOCOL.md`; any session resumes via `npm run verify:status`)
  and is now **271/313 processed (87%)**: 136 Verified against manufacturer pages/documents, 134
  Skipped with a documented reason (maker publishes no weight, no reputable third-party measured
  figure exists, etc.), 701 still queued. **Much of the remaining queue is a real tooling wall, not
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
  entered yet), the purely-cosmetic **🤘 RAD mode** easter egg, and a real **🌙 Dark mode**
  (persisted, follows the OS preference on first visit; mutually exclusive with RAD, zero
  effect on any verdict — it replaced the earlier Roadie-mode easter egg 2026-07-10).
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
2. **Domain-expert rule review — ✅ COMPLETE 2026-07-10.** All 19 rule areas, all 4 deliberate
   NON-rules and the known-gaps ranking were verdicted by Douglas (rule-by-rule, same day) and
   every resolution applied + merged the same day: 11 rules confirmed as-is; refinements landed
   for the SRAM AXS-controller false red (rule 3a), the UDH retrofit-kit warning tier (rule 4),
   the BB category with exact shell/spindle checks (rule 7), sourced-strict fork-travel tiers
   (rule 12 — min/design data across ~15 makers), the 180 mm insertion threshold (rule 13), the
   dormant too-narrow-tire floor (rule 14c), the de-estimated stroke warning (rule 16), and the
   frame-side native rotor floor (rule 10b, Cotic Solaris activated). **The durable record is the
   annotated [`EXPERT-REVIEW-DOSSIER.md`](EXPERT-REVIEW-DOSSIER.md)** — every section carries its
   Review verdict inline. Gaps ranked: dropper-insertion-vs-frame-size + curved-seat-tube checks =
   nice-to-have backlog; chain-length/e-bike = parked; no unlisted misfits reported.
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
- ✅ **🤘 RAD mode** — neon/checkerboard theme + a joke radness meter. (A second easter-egg
  toggle, 🏳️‍🌈 Roadie mode, shipped here originally — replaced 2026-07-10 by the real
  **🌙 Dark mode** below.)
- ✅ **🌙 Dark mode** — full dark palette, persisted in localStorage, follows the OS
  prefers-color-scheme on first visit, mutually exclusive with RAD mode.

Nothing left on this list — every Phase 1 item shipped and is live.

### Overnight run 2026-07-11 (Douglas asleep ~01:00→07:00; coordinator autonomous)

Douglas's mandate: grind parts (additions + verification) efficiently until ~7am as long as results are
produced; don't waste usage; clean up code as needed. Core values he restated: **tidy, clean, efficient,
good data, easy UI, UNBIASED (brand-neutral, honest verdicts — "unfuckingbiased"), pleasant design.**
- **Night shift** (Sonnet) is the grind engine — self-merges data rows to main through gates+audit+CI,
  loops verify→expand→tails, stop-when-truly-dry. Already pushed the r3 wave (→2002 parts) + more.
  A stall-aware coordinator Monitor watches it; the coordinator integrates + keeps main green.
- **Coordinator (this seat) autonomous overnight:** harvest completed DATA branches (gate + adversarial
  audit for error-tier frames + merge + push); preserve + SendUserFile PDF deliverables as they land;
  keep main green; light cleanup. **Waits for Douglas's morning approval** (all prompt him, can't do
  overnight): shipping the combined UI at :8192, archiving finished sessions, the groupset relabel/Eagle-90
  call. Honest limit: waking a stalled session / send_message both need his approval, so a stuck (not dry)
  night shift can only be flagged, not restarted, till morning — won't burn premium usage grinding on Opus.
- `MANUFACTURER-DATA-PLAYBOOK` (chip out, Sonnet high): printable PDF on getting real product images +
  data from manufacturers/affiliate feeds, WITH ready-to-send email drafts + a partner one-pager
  auto-included; brand-neutral framing. Research/deliverable only.

### Morning update 2026-07-11 — MUST cover (Douglas will ask; he wants LLC playbook + all of it)

Assemble a full morning report covering: **LLC + go-live playbook** (delivered — LLC-AND-GOLIVE-PLAYBOOK.pdf
+ CHECKLIST.pdf), **domain shortlist** (delivered — 202 .com, 26 available, top buildmymtb.com;
trailbuilder.com registered-but-dormant, aftermarket-checkable), **manufacturer-data playbook** (PDF +
email drafts — pending), **frames-fill outcome + the 25-not-added breakdown** (below), **night-shift wave
results** (catalog count/verified climb), the **staged UI wave** (localhost:8192 — awaiting his "ship it"),
and the **groupset decisions** (Eagle-90 promote / 11 relabel / lint).

**The 25 of 33 frames NOT added (Douglas wants to know why) — reconstruct precisely from the frames-fill
session report in the morning (list_events, needs his OK); interim reconstruction:** worker added 8
(Atherton S.200, Devinci Wilson 29, Frameworks DH [verified], Intense M1, Contra MC, Santa Cruz Highball,
YT Jeffsy, Specialized Epic 8 — the last under audit). The other 25 split into: **known maker-walled**
(per the fetch-map — Specialized Epic World Cup [site-wide 403], Norco Aurum HSP/Torrent HT/Shore [JS/403],
Pivot Phoenix DH/Mach 4 SL [403], Cannondale Habit/Scalpel/Scalpel HT [walled], Orbea Oiz [WAF-403]) — ~11
rows; and **boutique/QBP or simply-not-reached in an 8-of-33 first pass** (Gamux Sego, Pole Machine DH,
Unno Burn, Zerode G3 DH, Zink Zader, BMC Fourstroke, Scott Spark RC, Kona Honzo ESD/Unit X, Transition
TransAM, Surly Karate Monkey/Krampus, Salsa Timberjack/Fargo) — ~14, several of which (Scott, Transition,
Kona) DO fetch per the map and are just next-pass candidates. Honest framing: not all 25 are hard walls —
some are genuinely blocked makers, others were unreached and are gettable next round.

### Comprehensive frame master list (Douglas 2026-07-11)

He wants night shift to work from a comprehensive discipline-organized list (every DH, then enduro, trail,
etc. — like his ChatGPT list). Being generated overnight by a background agent → `FRAME-MASTER-LIST-BY-
DISCIPLINE.md` (repo root, unverified target list). In the morning: hand this to night shift / a frames
chip as the expansion target (cross-ref vs the 127 catalog frames for the gap set), and grind the
fetchable brands. Couldn't task night shift overnight (send_message needs Douglas's approval).

### Future — MARKETPLACE (Douglas 2026-07-11, eventually — NOT scoped yet)

Douglas wants a marketplace eventually (buy/sell parts). Hard requirement: **must be super secure against
scammers/fraud.** When scoped, this is a major phase needing: identity/seller verification, escrow or a
trusted payment processor (never handle card data directly), fraud/scam detection, dispute resolution,
listing moderation, and abuse/report tooling — security-first design throughout. Park until Douglas
prioritizes it; do not start unprompted.

### Queued by Douglas 2026-07-10 (parked here so they're not forgotten — do not start unprompted)

- **IN FLIGHT / QUEUED 2026-07-11 (chips out, Douglas-ordered):**
  - `ui-rail-always-inches` (DONE @ `c39c1dd`, 4 gates green, browser-verified): killed the ☰ Filters
    toggle (rail always visible every width) + inch-mark wheel labels app-wide (`29"`, `27.5"`,
    mullet `29"/27.5"` via the compat.js LABELS map). **STAGED at localhost:8192 for Douglas's
    eyeball;** on his word → merge to main, then integrate the filters branch on top.
  - `ui-category-filters-reset` (RUNNING): Reset surfaced from the ⋯ menu into the visible toolbar +
    category sub-filters via a data-driven helper — fork `travel`, shock `stroke`, dropper
    `diameter`+`drop`, handlebar `clamp` (31.8/35), BB `shell` threaded{BSA*/T47}/pressfit{PF*},
    drivetrain `actuation` electronic/mechanical. **+folded in (send_message):** a 7th filter — shock
    `spring` Coil/Air (55 air/53 coil) — and the DISCIPLINE chip reorder by travel DH→Enduro→Trail→XC
    (`['all','dh','enduro','trail','xc']`). Branched off pre-rail main; **coordinator integrates it
    onto main AFTER rail/inches merges** (overlapping toolbar region). Staged for eyeball.
  - **Frame MATERIAL filter — QUEUED, needs a small schema step first** (Douglas asked for
    carbon/aluminum/steel filter): frames carry NO material field today (0/127). Plan: add optional
    `material` to the frame schema (schema.js + types.js; enum carbon/aluminum/steel/titanium/other;
    display-only, never feeds verdicts) → backfill 127 frames from sourced maker specs (material is
    prominently published) → then the UI filter. **Gated AFTER `frames-master-list-fill` lands** (so
    it covers the +33) and carved from night shift; schema touch = Douglas eyeball. Sonnet.
  - `frames-master-list-fill` (RUNNING): the 33 frames from Douglas's 2026 master-list Excel not yet
    in the catalog (49/82 already present) — fetched maker specs only, walled brands skipped-documented;
    coordinator runs an Opus adversarial audit before merge (frames feed error-tier rules).
  - `groupset-sku-audit` (chip out, report-only): verify all 19 `gs-*` groupset presets are real
    purchasable complete-groupset SKUs with an official PN — flag any fabricated bundle (no single
    official groupset SKU). Removals/relabels/promotions come back to Douglas.
  - `DOMAIN-BRAINSTORM` (RUNNING, Sonnet): 100-250 candidate domains + RDAP/DNS availability + per-TLD
    pricing → doc + PDF to Douglas. Research-only, no repo changes.
  - **UI polish 2 — QUEUED** (one consolidated chip, gated AFTER the current UI wave lands — rail/inches
    + filters chip + random-builds all touch index.html/demos; serialize to stay unbreakable; fires the
    moment the filters chip returns): (a) **COMPAT-FIRST SORT** (Douglas 2026-07-11, priority) — always
    group the catalog compatible-first then incompatible, with the chosen sort (A-Z / price / weight) as
    the SECONDARY key WITHIN each group. Today choosing A-Z overrides the compat rank; make compat-group
    the primary key across all sort modes (compatible = no error / incompatible = red). Show all, just
    order fits-first. (b) move the 🚵 Sample builds dropdown to the FAR LEFT of the toolbar; (c) in list
    rows, place the 🅖 Own button to the LEFT of Add-to-build (side-by-side, not stacked) so rows are
    wider + shorter — Own only shows when logged in; (d) sample/demo builds must FILL the `bb` + `headset`
    slots with compat-clean picks (frame-shell-matched BB, steerer-matched headset) and re-pin the
    BUDGET/MID/HIGHEND goldens — NOTE interacts with random-builds (if it ships, the fix is in the
    generator + SAMPLE_FALLBACK, not the static demo functions). Staged for Douglas's eyeball.
  - `LLC-AND-GOLIVE-PLAYBOOK` (chip out, Sonnet high): printable link-rich PDF(s) — form an LLC
    (state choice, articles, EIN, FinCEN BOI, bank acct), register the domain, go live as a real
    business (Supabase redirect update, legal pages/FTC disclosure, Search Console, affiliate apps).
    Research/deliverable only; extends TRAILBUILDER-LAUNCH-PLAYBOOK.pdf; not-legal-advice framing.
  - **NIGHT SHIFT** (woken 2026-07-11 ~04:30 after an idle-stall, now RUNNING): its `night/2026-07-11`
    branch holds 26 commits — 5 r3 lanes + frames-tail merged & adversarially audited, UNPUSHED.
    Instructed to finish the last 3 lanes (drivetrain/headsets/pedals), skip frames (frames-fill owns
    them), then push the whole wave to main in ONE go. Coordinator rebases pending branches once after
    that push. **AUTO-REPORT:** a persistent coordinator-side Monitor watches `night/2026-07-11` +
    origin/main and pings the coordinator on every new commit/push — no Douglas interaction needed; the
    push to main IS the report (work lands + CI runs). Cross-session send_message would prompt Douglas,
    so the watch+push path is the zero-interaction one.

- **GROUPSET-PRESET DECISIONS (from the 2026-07-11 audit — Douglas's calls; nothing changed yet):**
  0 fabricated tiers (all 19 are real product lines). Split: **8 SRAM tiers are real single-SKU
  groupsets** (official `GS-…` PNs incl. crank) — **Eagle 90 is promote-verified-ready as-is** ($670 =
  real MSRP, fills match `GS-90-A1`). **11 are NOT sold as one official groupset SKU** (5 Shimano =
  per-component only; SRAM X01 DH + Eagle 70 = component/OE; 2 Box + 2 microSHIFT = real kits but
  crankless/chainless, catalog adds the crank) → recommend RELABEL as "assembled build," not an
  official-MSRP groupset. Two extra flags: `gs-shimano-slx-m7100` fills a **Race Face** crank,
  `gs-shimano-cues-u6000` fills a **Deore** crank (disclosed in desc, invisible at group name).
  **Blocker:** real groupset MSRPs are often HIGHER than the summed component prices, so storing real
  MSRP trips the `≤-sum` preset lint — resolving lint-vs-real-MSRP (exempt verified presets, or raise
  component prices first) is prerequisite to any price promotion. Recommended path: promote Eagle 90
  now, relabel the 11, defer the lint decision. Full evidence table in the archived audit session.
- **Expansion-r3 coordinator decision queue (from the wave report, 2026-07-11 — decide at/after
  the night-shift morning report):** (1) vocab gaps flagged with audited quotes: headTube
  `ZS62/40`, `EC49/40`, `ZS49/28.6` (blocks real Cane Creek completes); crankBb **`PowerSpline`**
  (SX Eagle); tire casing/compound clusters (Continental Grip/Rapid + Race tier, WTB DNA tiers,
  Kenda SCT/native-Dual, Goodyear Peak/Trail2). (2) **Engine call:** XX DH 7-speed Transmission
  group is un-enterable — rule 3 counts the chain in the one-speed set but the correct chain is a
  12s T-Type Flattop; needs a "T-Type chains are speed-agnostic" decision + maker source before
  entry. (3) Conventions: bar/stem per-rise/length id token; verified-with-sample-price
  consistency (lane-1 vs `fw-hope-fortus-30-29`); Magura MT Trail SL/Sport asymmetric-piston
  set rows (4/2) — treat both rows together. (4) `cockpit-fix`'s eeSilk SL price field ($149.99
  vs maker $199.99) still needs a call. Data follow-ups live in the wave report / memory
  `expansion-r3-wave.md`.
- **Visual/style pass — explicitly "not yet."** More art direction across the app; the named
  example: replace the solid green header bar with an artistic panorama render of a mountain
  range. Wait for Douglas to schedule it (a UI-declutter mockup round is running first and may
  set the layout it lands on).
- ✅ **Headset category — LANDED 2026-07-10 late** (this merge): rule 20 (20a steerer active,
  20b S.H.I.S. bore check dormant-until-sourced — live on the 51 frames already carrying
  fetched headTube codes, 20c advisory), own optional single-slot group per the BB template,
  12 fetched Cane Creek/Chris King rows (all five catalog S.H.I.S. combos covered; CK weights
  honestly omitted — flat-205g storefront figure is a shipping placeholder). 1855 parts /
  1250 verified / 426 tests at landing.
- **Domain: register + cutover (Douglas + coordinator halves).** Douglas buys the domain
  (registrar of his choice; .bike/.cc/.com all fine), then the coordinator handles the
  cutover: CNAME file + Pages custom-domain + exact DNS records for him to paste, enforce
  HTTPS, **update the Supabase Auth site/redirect URLs (logins break otherwise)**, OG/meta/
  canonical + docs links. **Sequence this BEFORE affiliate applications** — programs approve
  real domains far more readily than github.io subdomains.
- **Affiliate/image licensing (the one real blocked-on-Douglas item).** Plan of record:
  domain first, then Douglas applies to 2-3 programs (AvantLink network — Jenson USA et al.;
  Impact — evo/Backcountry; Amazon Associates as breadth fallback) with his site URL +
  tax/payout identity; approved feeds license product images + give price data, which the
  coordinator then wires into the catalog (schema `image`/`retailerLinks` fields + detail
  modal are already built and waiting). Coordinator pre-builds the privacy/affiliate-
  disclosure page programs require. Manufacturer-direct permission emails = slower parallel
  path, only if a key brand is missing from the networks.
- **Bike-park stickers (queued 2026-07-10; DEPENDS ON THE DOMAIN — print the real URL, not
  github.io).** Design: QR code + site name, ~3in die-cut; QR at error-correction level H
  with a proper quiet zone (survives scuffs/mud, allows a small center logo), human-readable
  domain prominent for the non-scanners, high-contrast dark-on-light QR. Production spec
  (Douglas's hard requirement: NO stickers that fight the backing): die-cut LAMINATED VINYL,
  outdoor/weatherproof 3yr+ grade, **crack-and-peel / split-liner backing** (this is the
  thing that makes them peel clean), MATTE laminate (gloss glare can break QR scans in sun).
  Vendor shortlist: Sticker Mule (easy-peel reputation, frequent 100-pack deals), StickerApp,
  StickerGiant. Order a small sample run first, scan-test a sticker on a curved surface
  before the bulk order. A design session produces print-ready art (300dpi+, bleed per
  vendor template) when the domain exists. Etiquette note: target sticker walls/boards and
  spots parks allow.

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
- ✅ **Supreme DH V5 rear-axle correction DONE (branch `fix/supreme-dh-axle`, awaiting coordinator merge).**
  The confirmed catalog error (`fr-commencal-supreme-dh-v5` had `rearAxle:'150x12'` + `travel:200`,
  but the FETCHED commencal.com complete-bike page 23SUPR states native `157x12` SuperBoost + 220mm
  rear travel; the earlier 150/200 came from a Vital table describing the frame run with Commencal's
  157→150 conversion kit A22WHADAPDHV5) is fixed: frame → `rearAxle:'SuperBoost157'` + `travel:220`,
  desc quotes the source and documents the conversion-kit nuance (a 12x150 wheel physically fits via
  the kit but reads as an axle error under one-native-axle modeling — a known limitation, not a real
  incompatibility). The DH golden (`DH_BUILD`) and UI DH demo (`loadDH`) moved to the existing
  `rw-dtswiss-fr-1500-29-157` (SuperBoost157/XD/6-bolt, natural pair for the build's DT Swiss FR 1500
  front); added a `ws-dtswiss-fr-1500-29-157` wheelset preset ($1,152, mirrors the 150 kit) so the
  demo keeps its kit pricing. Golden stays **0 errors / 0 warnings** unweakened; gates green
  (450 parts / 0 problems, 295 tests, typecheck clean); browser-verified against a worktree-rooted
  server — DH demo → "No conflicts found", wheels slot reads "FR 1500 Classic rear (157)". Frame id
  NOT renamed (append-only; field correction, precedent = Slash BSA73 / Giga UDH).
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
  **Catalog-expand-9 (branch `catalog-expand-9`, worktree-isolated, PUSHED not merged — coordinator
  lands it): +7 rows on a 449-part / 319-test baseline → 456 parts / 177 verified / 325 tests.**
  Scoped OUT of drivetrain/brakes/rotors (a concurrent verification session owns those rows this
  pass). **Three more Commencal frames**, all from re-fetched commencal.com pages found via the
  `commencal.com/us/en/` nav (the Clash URL that 404'd in pass 6 is superseded by a new one):
  **Supreme DH V5.2** (verified — a new DH gen confirming the same 157×12 SuperBoost hub the V5
  sibling was corrected to in an earlier pass; V5 marked `supersededBy`), **Clash V3** (the first
  full-27.5 ENDURO frame — every prior full-27.5 row was DH; golden-pinned on SRAM GX Transmission
  + the existing DT Swiss E 1900 27.5 wheels), **Meta TR V4** (verified — a new trail platform whose
  210×55 std shock size and 34.9 post exactly match the Stumpjumper 15, so the existing TRAIL_BUILD
  parts list carries over unchanged onto it; golden-pinned). Other fetchable makers came up dry this
  pass: Cotic's newer platforms (Jeht, BFe) use an **IS brake mount** our schema doesn't model
  (would need brake-side changes, off-limits this pass) and Flare's specs are still "TBC"; Canyon
  Torque is e-bike-only now; Scott Ransom uses the same proprietary Nude/TracLoc integrated shock as
  the already-skipped Spark/Genius (skipped for the same no-aftermarket-shock-policy reason,
  consistently); Scott Gambler isn't in the fetchable US catalog. **A quick coverage sweep (every
  frame's shock/wheel/fork combo vs cataloged brands) found three real fit-collapses, not just
  cosmetic gaps, and fixed each with a fetched-source addition**: (1) 250×75 std DH shock was
  RockShox-only across all six DH frames that use it, and 225×75 trunnion (Yalla V2) was too — added
  **Öhlins TTX22 M.2** at both sizes (fetched ohlins.com, $929.50 each, weight unpublished so left
  unverified, same basis as the existing 230×65 sibling). (2) SuperBoost157 + 27.5 (the mullet rear
  config) had **zero** wheel options at all — five DH frames (Firebird, Supreme DH V5/V5.2, Sender
  CFR, V10 8) were unbuildable in mullet. Fixed by adding `rw-dtswiss-fr-1500-275-157`: its own 150
  sibling's already-fetched Universal Cycles listing states the wheel *ships* with a 157 hub and 150
  end caps in the box, so 157 is the native config. Golden-pinned a full mullet DH build (Supreme DH
  V5.2, 29 front/27.5 rear) exercising the new wheel + new Öhlins shock together. (3) Boost110/27.5/
  170 (the Clash V3 + Propain Spindrift CF fork slot) was RockShox ZEB-only — added **Öhlins RXF36
  m.2 27.5 170** (verified, fetched ohlins.com travel selector, 15×110, 180–205mm rotor range,
  2150g, $1,369.50). All three new frames + all breadth fixes browser-verified against a
  worktree-rooted preview server (`window.PARTS` shows 456, `window.checkBuild()` on the Clash V3
  build returns 0/0). **Next pass:** more frames from fetchable makers if any remain unexplored: RAAW
  and Privateer's lineups are now fully cataloged (3 and 2 platforms respectively), Commencal's
  Meta SX V4 / Meta HT V2 are older gens superseded by the V5/V3 rows already in-catalog so were
  skipped; Cotic Jeht/BFe need an `IS` brakeMount vocab addition (pair with a brake-category pass);
  Fox ridefox.com product-page URLs 404'd on every guessed slug this pass (unlike the earlier
  session's successful fetch) — worth a retry with a fresh URL discovery path to fill the remaining
  210×50/210×55-std second-shock-brand gap (3–4 frames, lower priority than the three fixed above).

## Phase 3 — Accounts & the garage *(**Supabase — LIVE**; accounts + garage + inventory shipped, E2E-confirmed 2026-07-08)*

- ✅ **Login + saved builds + inventory — LIVE** (merged from `phase3-accounts`; `ACCOUNTS_ENABLED` true, keys set in `src/config.js`).
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
- ✅ **Went live 2026-07-08** — [`supabase/SETUP.md`](supabase/SETUP.md) completed (Supabase project created, `schema.sql` run, GitHub OAuth + magic link enabled, redirect URLs set, keys in `src/config.js`); E2E-confirmed.
  Create the Supabase project, run `schema.sql`, enable GitHub OAuth (+ magic link), set the redirect
  URLs, and paste the Project URL + anon key into `src/config.js`. Then E2E test per SETUP §6 and ship.
- **Full build comparison** across saved builds (the Phase 1 lite version, via pasted links, is done)
  — a natural follow-up once builds live in the garage.

## Phase 4 — Community & ride character *(the ambitious tier)*

- ✅ **Forum — DONE 2026-07-08.** GitHub **Discussions** enabled on the repo (free, zero code, zero
  moderation tooling) and surfaced in-app via a header **💬 Community** link (`FORUM_URL` derived from
  `REPORT_REPO` → `/discussions`, feature-gated like the report link). Deployed live. Only build a
  bespoke in-app forum if the community outgrows Discussions; the convention-clean upgrade path if it
  ever wants to be *embedded* is Giscus (Discussions-backed), which would need a no-CDN exception.
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

### Native mobile app — PLAN (decided 2026-07-08: *plan now, build later*)

Douglas wants a real **App Store / Play Store** app (not just a PWA). The good news: the app is a
static site, so a native app **wraps the existing web app — no rewrite**. The honest news: a store
app is **not** low-hanging fruit, and its blockers are all human-gated (like the expert review and
image licensing). This is the concrete plan to pick up when those inputs are ready.

**Key insight:** every cheap native path is *built on top of* PWA groundwork (manifest + service
worker + icons). So the **PWA is the foundation for the native app, not an alternative to it** — and
a PWA alone already delivers "installable on the phone home screen + works offline at the trailhead,"
which is ~80% of what most people mean by "have it on my phone," with **zero** accounts, fees, review,
or Mac. Recommended sequence puts value ahead of blockers:

1. **PWA foundation** *(no blockers — a session can do this anytime; the actual low-hanging fruit)*:
   `manifest.webmanifest` (name, `theme-color`, `display:standalone`, `start_url`), **192 + 512 (+
   maskable) PNG icons** + `apple-touch-icon`, and a **service worker** caching the app shell + catalog
   for offline. Registered via a classic `<script>` (honors no-CDN/no-build). Ships with the existing
   GitHub Pages deploy. *Icon note:* need real PNGs — generate from an SVG (rasterize via the headless
   preview canvas or an installed tool); the existing hand-drawn stroke SVGs are a starting point.
2. **Android / Play Store** *(cheap, no Mac)*: wrap the PWA as a **Trusted Web Activity** via
   **Bubblewrap** or **PWABuilder**. Buildable on Windows (Android SDK). **On Douglas:** Play Console
   account (**$25 one-time**), an app signing key, and a store listing (icon, screenshots, **privacy
   policy URL — required because the app has accounts/Supabase**).
3. **iOS / App Store** *(the expensive tail)*: **Capacitor** (or PWABuilder) WKWebView wrapper.
   **On Douglas:** Apple Developer Program (**$99/yr**); a **Mac + Xcode OR a paid cloud-build**
   (Codemagic / EAS Build / GitHub macOS runners / Ionic Appflow) — *he's on Windows, so iOS cannot be
   built locally*; plus **review-hardening to pass Apple Guideline 4.2** ("minimum functionality" —
   Apple rejects bare website wrappers, so add offline + native share/nav, maybe push) and a privacy
   policy. Google Play is far more lenient here.

**Tooling call when we build:** **Capacitor** is the standard wrapper for an existing web app (real
iOS+Android projects, native-plugin access) but introduces **npm build tooling + native project dirs**
— a deliberate break from "no build step" **for the native target only** (the web app stays no-build;
Capacitor just copies the static files into the shell). PWABuilder/TWA is lighter for Android-only.

**Blocked on Douglas (the whole thing waits on these):** Apple ($99/yr) + Google ($25) accounts; a
Mac or paid cloud-build for iOS; sign-off on a build step for the native target; a privacy-policy page;
store assets (icons, screenshots). A session can build **step 1 (PWA)** with none of these.

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
