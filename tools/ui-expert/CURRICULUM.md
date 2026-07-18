# TrailBuilder UI/UX Corpus — CURRICULUM

Defines the levels so every future training round knows what depth it is adding and where the
corpus stands. Read after [`INDEX.md`](INDEX.md); the corpus rules (citation discipline,
append-only, ⚠ CONTRADICTION, ⚠ SITE-CONSTRAINTS) apply at every level unchanged. Mirrors the
mechanic and coach corpora's CURRICULUM files.

---

## The four levels

### L1 — Fundamentals
The testable floors and load-bearing conventions every screen must meet: **touch-target
minimums** (WCAG 2.5.8 / Apple 44 pt / Android 48 dp), **thumb-reach**, **viewport/safe-area**,
**WCAG 2.2 AA** (contrast, focus, reflow, motion), **content-driven breakpoints**, the
**never-horizontal-scroll rule**, **Core Web Vitals budgets**, core **form/nav research** (NN/g).
Sources: standards bodies + platform vendors + NN/g. **This is the bootstrap seed's target.**

### L2 — Applied patterns
The named patterns that make dense data work: disclosure/progressive-filtering patterns for
filter rails, accessible range-slider and chip-row implementations (WAI-ARIA APG), responsive
data-table strategies, comparison-view patterns, empty/loading/error states, sticky-element
behavior, hash-route deep-linking conventions. L2 depth means: for each pattern, the canonical
accessible implementation, its failure modes at 375 px, and the tradeoff record.

### L3 — Craft depth
The judgment layer under the patterns: typography systems and vertical rhythm without
webfonts, spatial density theory (when compact beats comfortable), color-system design across
themes, motion design under `prefers-reduced-motion`, dark-mode contrast math, perceived-
performance choreography (skeletons vs spinners — and what the research actually shows),
internationalization/RTL awareness. Leans on Tier-B/C with Tier-A anchors.

### L4 — Measurement & research methods
How to *know* instead of guess: usability-test design at small N, task-based benchmark
metrics, funnel/analytics interpretation (the site has Cloudflare Web Analytics only — no
per-user tracking), A/B constraints on a static site, heuristic-evaluation method (Nielsen's
10), accessibility audit method (WCAG-EM), field CWV monitoring. This is what turns the agent
from "cites standards" into "designs the study that settles a dispute."

---

## Grading a chapter

Each chapter carries a **Maturity** line under its title:

- **foundation** — L1 coverage only (the expected state after the bootstrap seed).
- **professional** — L1 complete + meaningful L2 pattern depth (canonical implementations with
  failure modes and tradeoffs) across most of the chapter's scope.
- **master** — L1+L2 complete, plus L3 craft and/or L4 measurement depth on the chapter's
  domains.

Grade **honestly** — a chapter with one L2 pattern and mostly L1 floors is still `foundation`.
A pattern documented without its accessibility contract does not count toward maturity at all.
Each chapter ends with a **## Gaps** section the next round reads to pick its target.

## Current state (round 5 — the execution round, 2026-07-18)

Round 5 ran the successor rule exactly as written, in its priority order — and it was the first
round whose product is **findings and closed questions, not new citations**:

- **Priority 0 — the RES-4 heuristic evaluation RAN** (RES-14;
  [`HEURISTIC-EVAL-2026-07-18.md`](HEURISTIC-EVAL-2026-07-18.md)): ten heuristics × builder /
  forum / guides. **9 findings: 3 severity-3** — HE-1 reset destroys the build with no
  confirm/undo (Back can't recover: the hash is `replaceState`d); **HE-2/ACC-26 forum thread
  rows fail SC 2.1.1 Keyboard, Level A — the round's one violation-grade item** (click-only
  `<div>`s; the guides' `<button>` cards are the in-repo fix pattern); HE-3/PRF-19 the
  "All parts" view renders 2,986 cards / 57,120 DOM nodes unbounded — **4 severity-2**
  (NAV-18 stale `document.title` outside guides; ACC-27 guide-card `role="listitem"` hiding
  buttonness from AT; the 24%-of-viewport mobile chrome measurement; the forum's 460 px
  17-chip category wall) — 2 severity-1, plus a recorded strengths list (status/aria-live
  discipline, dialog hygiene, guides quality) so settled ground isn't re-litigated. One
  candidate **died in verification** (New-thread "dead button" — it's `hidden` gating working
  correctly; synthetic clicks bypass it) and is kept in the report as the method lesson:
  **gate scripted audits on real visibility before claiming a broken control.**
- **Priority 1 — all three unrun measurements RAN**: MOB-48 (the 769 px crossing with build +
  open dialog + mid-edit field: **everything survives, MOB-47's risk refuted** — the only
  resize listener syncs a CSS var); MOB-49 (reachability audit: build bar bottom-fixed = the
  pie model working; sticky search is the acceptable top-zone trade); DNS-22 (worst rail 323 px
  ≈ 40% viewport, no facet over 6 values — **facet collapsing not earned, RES-10 closed**).
  PRF-16 (Vitals Explorer) remains Douglas-only and unread; per the standing note, no
  performance claim is treated as measured until he opens it.
- **Priority 2 — all three conditional no-actions re-checked, all HOLD**: MOB-44/45 (Viewport
  Segments still explicitly not Baseline, MDN), PLT-15 (all 59 `:hover` rules still cosmetic),
  PRF-18 (Cloudflare CWV still Chromium-only, "Safari and Firefox coming soon" verbatim
  unchanged).

Maturity grid unchanged from round 4 (seven masters + research-methods professional) —
executing one agent-runnable method and closing measurements does not re-grade chapters, and
`research-methods` honestly stays professional until a *human* study runs.

**Round 6 should target, in order:** (1) the coordinator-side outcomes of this round's three
severity-3 findings — ACC-26 is a Level-A violation with a small in-repo fix, HE-1 is the
highest pain-per-fix, PRF-19 needs a design decision sequenced behind PRF-16's field-data
read — append confirming facts as fixes land, ACC-24-style; (2) the untouched priority-3 tail
(PLT-2's decision rule, keyboard-shortcut conventions, the L3 density judgment layer, RES-8's
recruiting/remote-testing pins); (3) the standing per-round sweeps (MOB-44 Baseline, PLT-11
hover grep, PRF-14/17 Cloudflare — all cheap, all dated in their chapters). Do NOT re-run the
heuristic evaluation against an unchanged app (RES-14's own caveat) — re-run it when the home
page, a router rework, or another new surface ships.

## Historical state (round 4 — the master round, 2026-07-18)

**All seven original chapters are `master`, and an eighth (L4) chapter was added.** Round 4 took
each remaining chapter to master by pairing a
fetched-primary pass with a **live-DOM audit of the shipped app** — which is what produced the
round's real value: three findings that shipped as fixes (DNS-17's SC 2.5.7 failure, ACC-22's
`100vh` and `autofocus` items), one contradiction still open (NAV-16), and several *reasoned
non-actions* recorded so future rounds don't re-open settled ground.

| Chapter | Level | Maturity | Round-4 note |
|---|---|---|---|
| `accessibility.md` | L1+L2+L4 | **master** | live-DOM audit of all nine dialogs (ACC-22), WCAG 2.2's new SCs applied (ACC-23), screen-reader testing doctrine (ACC-21), dot-contrast closed (ACC-24) |
| `forms-filters-density.md` | L1+L2+L3 | **master** | the dual-slider wiring contract; a Tier-A vs Tier-B conflict resolved (DNS-16); the round's one violation-grade finding, now fixed (DNS-17 → DNS-21) |
| `performance-perceived.md` | L1+L2+L4 | **master** | field-measurement doctrine; Cloudflare's real CWV capability + its Chromium-only bias; the site's own field data found already-collecting-but-unread (PRF-16) |
| `navigation-ia.md` | L1+L2+L3 | **master** | the places-vs-state routing doctrine (NAV-15); back-button depth audited across all four page views (NAV-16, open) |
| `mobile-fundamentals.md` | L1+L2+L3 | **master** | foldable form factors, Viewport Segments API + its Baseline status, large-phone reach; a reasoned no-action (MOB-45) |
| `platform-conventions.md` | L1+L2+L3 | **master** | desktop input conventions; SC 1.4.13's `title` exemption as a false-finding guard (PLT-10); PLT-2 honestly still open (PLT-14) |
| `responsive-layout.md` | L1+L2+L3 | **master** | Every Layout primary pinned, breakpoint-count sourced, and the intrinsic-layout-beats-breakpoints doctrine (RSP-19) |
| `research-methods.md` | L4 | **professional** | **NEW round 4** — the L4 method canon (5-user model + its exceptions, thinking-aloud, task-scenario design, Nielsen's 10, method-selection routing) plus runnable study designs for the corpus's own parked questions, and the finding that **A/B testing is unavailable on this stack** (RES-6) |

### What "master" did and did not mean here

Grading stayed honest per the rule below. Two things worth stating so the grade isn't
over-read:

- **No chapter earned master by adding citations alone.** Each pairs its L3/L4 depth with an
  audit whose result is checkable against the repo.
- **Master does not mean finished.** `platform-conventions` carries an openly unsourced core
  rule (PLT-2); `performance-perceived` cannot verify its own numbers until someone opens
  Vitals Explorer; `accessibility` records that **a real screen-reader session has never been
  run on this site** and that no amount of markup auditing substitutes. Those are in the
  chapters' Gaps, not papered over.

## Historical state (round 3, 2026-07-18)

| Chapter | Level | Maturity | Note |
|---|---|---|---|
| `mobile-fundamentals.md` | L1+L2 | **professional** | round 3 — WCAG 2.5.x family completed (2.5.2/2.5.3/2.5.4/2.5.6), Apple HIG gesture taxonomy, `touch-action`/`inputmode` web mechanisms, Hoober's primary study fetched directly |
| `responsive-layout.md` | L1+L2 | **professional** | round 3 — container queries resolved, fluid-type clamp() pattern, Every-Layout sidebar wrap + CSS Grid auto-fit/minmax, sticky mechanics, print + reader-mode seeded |
| `accessibility.md` | L1+L2 | **professional** | round 2 — WAI-ARIA APG ingested (slider/disclosure/listbox/combobox/tabs/dialog, ACC-10–15); resolved ACC-9; produced a theme-wide compat-dot contrast audit (⚠ CONTRADICTION: light-theme dot.w/dot.n fail SC 1.4.11) |
| `forms-filters-density.md` | L1+L2 | **professional** | round 2 — slider/disclosure/listbox patterns applied to the filter rail (DNS-10–12) + Baymard filter research (DNS-13/14) |
| `navigation-ia.md` | L1+L2 | **professional** | round 3 — card-sorting/tree-testing methods, breadcrumb canon + WCAG G65 markup, search-vs-browse synergy, History API + confirmed hashchange back-behavior |
| `performance-perceived.md` | L1+L2 | **professional** | round 3 — INP subpart mechanism (input/processing/presentation delay), NN/g's 0.1/1/10s canon, skeleton-vs-spinner research (mixed, informational-leaning), bfcache, font-display + script defer/async doctrine, CLS seeded |
| `platform-conventions.md` | L1+L2 | **professional** | round 3 — NN/g web-form canon, the 100vh trap resolved (svh/lvh/dvh), overscroll-behavior for modal/dialog scroll containment, PWA installability criteria |

## Corpus rule: target the weakest chapter — and what replaces it now

Restated from [`INDEX.md`](INDEX.md) rule 7: future rounds read every chapter's Maturity +
Gaps first and prioritize the weakest-graded chapter(s).

**With all seven at master, rule 7 no longer discriminates.** The successor rule for round 5+,
in priority order:

0. **Run the heuristic evaluation** (`research-methods.md` RES-4). It is the **only** method in
   the L4 canon an agent can execute unaided — ten heuristics across the builder, forum and
   guides surfaces — and it is the most likely source of the next round of real findings. It
   would also generate the candidate list that RES-8's user study should then test with humans.
1. **Verify what the corpus asserts but has never measured.** The highest-value open items are
   not unfetched citations — they are unrun checks the corpus itself flagged: read Vitals
   Explorer (PRF-16), resize across 769 px with state in flight (MOB-47), measure the rail at
   375 px to settle facet collapsing (DNS-20), audit where mobile controls sit vs the reachable
   thumb region (MOB-46). Each needs a browser or an account, not a fetch.
2. **Re-check the conditional recommendations.** Several round-4 no-actions are explicitly
   conditional and go stale silently: MOB-45 (Viewport Segments still non-Baseline?), PLT-11
   (every `:hover` still cosmetic?), PRF-14/17 (has Cloudflare shipped Safari/Firefox CWV?).
   These are cheap and should be swept every round.
3. **Then** chase the remaining honest gaps (PLT-2's decision rule, keyboard-shortcut
   conventions, the L3 density judgment layer).

**Do not re-open items the corpus has already closed with a reason** — MOB-45, PLT-11, RSP-20
and DNS-18 are all *deliberate* non-actions with their reasoning recorded, not oversights. Round 2 (2026-07-18) took
`accessibility.md` and `forms-filters-density.md` to professional via the WAI-ARIA APG
ingest (slider/disclosure/listbox/combobox/tabs/dialog) and Baymard/NN/g filter research, plus
a theme-contrast contradiction-hunt (see `accessibility.md`'s ⚠ CONTRADICTION section). Round 3
(2026-07-18) took the remaining five chapters — `mobile-fundamentals.md`, `responsive-layout.md`,
`navigation-ia.md`, `performance-perceived.md`, `platform-conventions.md` — from foundation to
professional in the corpus's own weakest-first order, each via a fetched-source L2 pass (see
each chapter's own facts and citations for detail).

**All seven chapters are now professional.** No chapter is "weakest" relative to the others
anymore — the corpus has climbed evenly, per rule 7's own intent. The next round's honest choice
is between two directions, not a chapter pick:

1. **Push toward master (L3/L4)** on whichever chapter's own Gaps list is richest in
   still-unfetched, genuinely load-bearing questions (several chapters flag specific unfetched
   primaries this round: RSP's Every-Layout primary, PLT-2's still-inference-grade decision
   rule, NAV's unrun card-sort/tree-test on the site's own nav, PRF's still-missing field CWV
   data).
2. **Chase ⚠ CONTRADICTION hunts** the way `accessibility.md`'s round-2 theme-contrast audit did
   — cross-checking a chapter's own facts against the shipped app for a concrete, coordinator-
   actionable finding, rather than adding more citations for their own sake.

Do not manufacture a "master" grade to look finished — CURRICULUM's own grading rule requires
L3 craft-depth or L4 measurement-method depth, not just more L1/L2 facts, and several chapters
(navigation-ia, performance-perceived especially) are honest about needing a real study or
real field data before they'd earn it.
