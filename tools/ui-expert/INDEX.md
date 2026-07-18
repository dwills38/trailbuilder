# TrailBuilder UI/UX Corpus — INDEX

The **ui-expert** specialist's cited knowledge library. This is the entry point: the agent
(`.claude/agents/ui-expert.md`) loads THIS file first, decides which chapter(s) the question
touches, and pulls only those.

**Level.** The corpus is a leveled program, L1 (fundamentals) → L4 (measurement & research
methods) — see [`CURRICULUM.md`](CURRICULUM.md) for the level definitions and how a chapter is
graded. Each chapter states its current **Maturity** and an honest **## Gaps** list.

**Purpose.** BuildMyMTB ships a dense, data-heavy builder UI to phones and desktops with no
build step and no design team. This corpus is the durable, cited record of real UI/UX facts —
so a design question is answered from sourced standards and research, not model memory, and so
the answer survives across sessions and models. A confident wrong "that's fine on mobile" ships
an unusable filter rail; the honest floor is "not established."

**Sibling corpora.** This mirrors [`tools/mechanic/INDEX.md`](../mechanic/INDEX.md) and
[`tools/coach/INDEX.md`](../coach/INDEX.md) exactly in structure and discipline — same
append-only stable fact IDs, same fetched-source citation bar, same facts-not-wholesale-text
rule, same flag-never-implement boundary. The differences are the source-tier adaptation
(§ "What counts as a source here") and the SITE-CONSTRAINTS rule below.

**Organizing principle — CONSTRAINTS MEET CONTENT.** A UI fact in isolation ("targets ≥ 24 CSS
px") is useful; what a design decision actually needs is how the constraint interacts with the
content it must hold ("a 24 px floor × a 30-chip filter rail × a 375 px viewport ⇒ the rail
must collapse, not shrink"). Every chapter carries the standards AND the interaction patterns
that make dense data survive them. Interactions are the spine, not an appendix.

---

## Corpus rules (non-negotiable)

1. **Append-only.** Every fact carries a **stable ID** (`MOB-1`, `ACC-3`, …). Never renumber,
   never rewrite in place. A correction is a **new fact** that references and supersedes the old
   one (`MOB-1 SUPERSEDED BY MOB-42`) — the same discipline as the catalog's `ALIASES`.

2. **Every fact carries a fetched-source citation.** The gold tier is a **fetched standards
   body / platform vendor / primary-research page** (W3C WCAG, Apple HIG, Material/Android,
   MDN, web.dev, NN/g research articles). Search-result summaries are never a source (the
   project's oldest lesson: *summaries lie*). Where a primary is fetch-walled, an
   **exa-search-highlight of the primary's own page text** counts (the coach-corpus REI
   precedent) and the fact records that route. Popular-blog sources only *soften* or
   illustrate — they never carry a hard recommendation alone.

3. **Facts + citations only — never wholesale-copied text.** Paraphrase the guidance; a short
   quoted phrase under attribution is fine to pin exact wording (e.g. WCAG's own "at least 24
   by 24 CSS pixels"). One quote per answer, under 15 words, attributed.

4. **⚠ CONTRADICTION tag.** When a corpus fact contradicts a **shipped UI pattern, a repo
   convention, or another corpus fact**, tag it `⚠ CONTRADICTION` and state exactly which
   file/pattern it collides with. That tag is a signal to the **coordinator** — this corpus
   never edits the app (see "Boundaries"); it flags.

5. **Carry the source's own tier and scope.** WCAG AA is a testable floor; an NN/g study is
   research with an N and a year; a platform HIG is one vendor's convention. State which kind
   of claim each fact is, and the envelope it applies to (touch vs pointer, mobile vs desktop).

6. **Both errors cost.** A false "this violates accessibility" burns effort on a non-problem; a
   false "this is fine" ships an unusable or exclusionary UI. When sources genuinely disagree
   or nothing was fetched, the honest entry is "not established."

7. **Target the weakest chapter.** Future training rounds read every chapter's Maturity + Gaps
   first and prioritize the weakest-graded chapter(s), closing the specific gaps listed. The
   corpus climbs evenly.

8. **⚠ SITE-CONSTRAINTS rule (project-specific, load-bearing).** Every recommendation this
   corpus produces MUST respect BuildMyMTB's standing constraints, and an entry that collides
   with one must say so rather than assume it away:
   - **No build step, no CDN, no webfonts** — recommendations must be implementable in plain
     HTML/CSS/JS with vendored assets only (CLAUDE.md Conventions). "Add a component library"
     is never a valid recommendation.
   - **NO pop-ups / unsolicited overlays, EVER** (Douglas hard rule 2). Any pattern from the
     literature that auto-appears (toasts that demand action, promo interstitials,
     scroll-triggered modals) is banned regardless of what a source says converts. Click-opened
     modals/cards are fine.
   - **The theme-token system** — colors/spacing route through the existing CSS custom
     properties and `tbApplyTheme` (`src/ui-common.js`); recommendations name tokens, not raw
     hex.
   - **The honest-data values** — UI copy never overclaims ("No conflicts found", never "All
     compatible"); UNBIASED is load-bearing: no layout/ordering/emphasis pattern may favor a
     manufacturer.

---

## What counts as a source here (tier adaptation)

- **Tier A — standards bodies & platform vendors, fetched:** W3C (WCAG 2.2, CSS specs), MDN,
  web.dev / Chrome developer docs, Apple HIG, Material Design / Android developer docs. A WCAG
  Level-A/AA criterion is the only thing in this corpus that is a *requirement*; everything
  else is guidance.
- **Tier B — primary UX research organizations:** Nielsen Norman Group articles (they publish
  their study data), Baymard Institute, published research (Hoober/Parhi et al. touch studies).
  A single Tier-B page is a real source; ≥2 independent Tier-B sources agreeing is consensus.
- **Tier C — reputable practitioner publications** (Smashing Magazine, A List Apart, CSS-Tricks)
  — usable to carry a Tier-B researcher's data (Smashing carrying Hoober's numbers), to
  illustrate technique, or to soften; never the sole basis of a hard recommendation.
- **Tier D — blogs / community.** Flavor only. Label it plainly.

**Visual taste is out of scope for facts.** Whether the topo header should be denser is
Douglas's call, not a citable fact — the agent routes taste to Douglas as compact packets with
mockups (see the agent file), and keeps the corpus to what sources can carry.

---

## Boundaries (what this corpus and its agent may and may not do)

- **Knowledge, not code.** The corpus and the ui-expert agent produce **facts and design
  recommendations only**. They **never** edit `index.html`, `bmx.html`, `src/**`, the themes,
  or the tests. Recommendations route to the **coordinator**; visual-taste calls route to
  **Douglas** as compact packets with mockups.
- **A `⚠ CONTRADICTION`** (e.g. "the filter rail's chips measure under the WCAG 2.5.8 floor")
  is a note for the coordinator to triage — not a change to make.
- **The bar:** calling a shipped pattern a *violation* needs a Tier-A criterion it testably
  fails. Tier-B research supports *recommendations* and prioritization, never a "violation"
  label on its own.

---

## Chapters

| Chapter | Covers | Key constraint interactions |
|---|---|---|
| [`mobile-fundamentals.md`](mobile-fundamentals.md) | touch-target minimums · thumb-reach zones · gesture conventions · viewport & safe-area | target floor × dense chip rows; reach zones × where the build panel's actions sit |
| [`responsive-layout.md`](responsive-layout.md) | breakpoint strategy · container vs media queries · wrap behavior · the never-horizontal-scroll rule | content-driven breakpoints × a no-build-step single stylesheet; WCAG reflow at 320 px |
| [`accessibility.md`](accessibility.md) | WCAG 2.2 AA floor: contrast math · focus states · ARIA patterns · reduced motion · screen-reader flows | contrast × the three themes; focus × custom chips/dots; reduced-motion × the topo header |
| [`forms-filters-density.md`](forms-filters-density.md) | dense filter rails · range sliders · chip rows · data tables at 375 px · form design | OUR hardest problem: the catalog's sub-filters and sliders on a phone |
| [`navigation-ia.md`](navigation-ia.md) | multi-page nav (MTB/BMX/Kit) · hamburger vs visible actions · deep links · back behavior | hidden-nav discoverability cost × a growing page family; `#guide/<slug>`-style hash routes |
| [`performance-perceived.md`](performance-perceived.md) | LCP/INP budgets · no-build-step constraints · font/paint behavior | Core Web Vitals × one giant inline script + a large in-memory catalog |
| [`platform-conventions.md`](platform-conventions.md) | iOS HIG vs Material vs web-native; when to follow which | a web app on both platforms: web-native first, platform conventions where they're load-bearing |
| [`research-methods.md`](research-methods.md) | **L4 — how to know instead of guess**: usability-test design, thinking-aloud, task scenarios, heuristic evaluation, method selection | the machinery for *un-parking* the corpus's taste/preference questions; A/B is unavailable on this stack, so qualitative rigour has to carry the load |

---

## Seed provenance (where this corpus's first facts came from)

Seeded 2026-07-18 in the ui-expert bootstrap round, from **fetched** primary pages:

- **W3C WCAG 2.2 spec** (w3.org/TR/WCAG22) — the SC numbers, levels and thresholds cited
  throughout `accessibility.md`.
- **WebAIM** (webaim.org/articles/contrast) — contrast practice: large-text definition,
  no-rounding, link-contrast interaction.
- **Apple HIG** — 44×44 pt hit target, pinned via **exa-search-highlight of Apple's own HIG
  page text** (developer.apple.com is a hard fetch wall — see the fetchability map).
- **Google / Android accessibility docs** (developer.android.com) — the 48×48 dp touch target
  and Android text-contrast tiers (the Material-side primary; m3.material.io is walled).
- **NN/g** — touch-target size (1 cm), hidden-navigation study numbers, mobile subnavigation
  thresholds, web-form guidelines.
- **web.dev** — LCP (2.5 s) and INP (200 ms) thresholds at p75; responsive basics
  (content-driven breakpoints, viewport meta).
- **MDN** — `prefers-reduced-motion`, `env(safe-area-inset-*)`.
- **Smashing Magazine carrying Hoober/Clark's data** (Tier C carrying Tier B) — one-handed-grip
  and thumb-zone numbers.

The seed is a *floor*, not a ceiling: the ui-expert agent appends every newly verified fact.

## Fetchability map (for the next rounds)

- **developer.apple.com is a hard wall**: WebFetch gets an empty shell, Exa crawl returns
  "unknown error", **Bright Data returns "Forbidden: target site requires special permission"**.
  Route: **Exa search highlights** surface HIG page text reliably (how MOB-1 was pinned);
  mirrors (apple-docs.everest.mt) exist but are unofficial — use only to locate, then pin via
  search-highlight of the real page.
- **m3.material.io / material.io is JS-walled** (404/empty to WebFetch). Route:
  **developer.android.com fetches cleanly** and carries the same numeric guidance — prefer it
  as the Google-side primary. m2.material.io redirects resolve but serve empty shells.
- **w3.org, webaim.org, developer.mozilla.org, web.dev, nngroup.com, smashingmagazine.com all
  fetch cleanly via plain WebFetch.** NN/g article text comes through with study numbers intact.
- **w3.org/WAI/ARIA/apg/patterns/ fetches clean** (confirmed round 2, 2026-07-18): slider,
  disclosure, listbox, combobox, tabs, and dialog-modal all returned full content via plain
  WebFetch — no wall.
- **baymard.com is partially walled, mixed by page type**: the benchmark/example galleries
  (`/research/...`, `/mcommerce-usability/...`) 404 or truncate to nav-only content via
  WebFetch; the **`/blog/<slug>` posts fetch cleanly** (confirmed: `/blog/5-essential-filters`,
  `/blog/slider-interfaces`) — prefer Exa search to locate the right `/blog/` slug, then
  WebFetch it directly, same two-step route as the Apple HIG precedent.
- **nngroup.com fetches cleanly** for slider/facet-specific articles too (confirmed:
  `/articles/gui-slider-controls/`, `/articles/filters-vs-facets/`) — reconfirms the seed's
  general nngroup.com note.
- Untested still (L2–L4 targets): Chrome for Developers case studies, Inclusive Components
  (inclusive-components.design), the WAI-ARIA APG's own accessible-name guidance page (ACC-8's
  remaining gap).
- **Round 3 (2026-07-18) additions**: `uxmatters.com` and `interactions.acm.org` fetch cleanly
  via WebFetch (used to pin Hoober's primary hold/grip study directly — MOB-17). The HIG
  **Gestures** page (`.../human-interface-guidelines/gestures`) stays walled for both plain
  fetch (`web_fetch_exa` → "An unknown error occurred") and exa-search-highlight (returned
  title-only, no body text, unlike the Buttons page that seeded MOB-1) — pinned via the
  Tier-D mirror route instead (see MOB-15). `w3.org/WAI/WCAG22/Understanding/*.html` per-SC
  pages fetch cleanly via plain WebFetch (used for the 2.5.x family).
