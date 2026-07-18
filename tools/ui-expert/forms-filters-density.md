# Forms, Filters & Density — dense data on a 375 px screen

**Maturity: foundation** (L1 seed, 2026-07-18 — the L2 pattern layer is the declared round-2 target)

OUR hardest problem: the catalog's filter rail, range sliders, chip rows, and data-dense part
lists on phones. Read [`INDEX.md`](INDEX.md) first — the ⚠ SITE-CONSTRAINTS rule (no pop-ups,
no build step, theme tokens, unbiased) binds every pattern here.

## Facts

- **DNS-1** — Forms are **single-column**: "multiple columns interrupt the vertical momentum"
  of completing a form. Labels sit close to their fields (above, on mobile/short forms).
  *Tier B, fetched https://www.nngroup.com/articles/web-form-design/ 2026-07-18.*

- **DNS-2** — Cut fields: "every time you cut a field or question from a form, you increase
  its conversion rate"; eliminate optional fields where possible, and if kept, limit to 1–2
  and label them optional explicitly. *Same fetch as DNS-1.*

- **DNS-3** — Error handling needs **redundant cues** — outline the field AND red text AND
  heavier font — and must preserve the user's erroneous input for correction. Never ship
  Reset/Clear buttons (accidental-wipe risk). *Same fetch as DNS-1. (Redundant-cue also
  satisfies the color-alone rule in ACC-4's note.)*

- **DNS-4** — Field width should telegraph expected input length (match the field to the
  data). *Same fetch as DNS-1. Site note: the min/max numeric filter inputs should be sized
  like 3–4-digit numbers, not full-width.*

- **DNS-5** — Range sliders are drag-dependent UI: WCAG **2.5.7 Dragging Movements (AA)**
  requires a single-pointer non-dragging alternative, and keyboard operability is required
  outright (2.1.1, Level A). A slider without paired numeric inputs or steppers is an AA risk.
  *Tier A base (w3.org/TR/WCAG22 fetch, 2026-07-18) + labelled inference applying it to
  sliders; the canonical accessible slider wiring is ACC-9's un-fetched APG pattern — pin it
  before specifying an implementation.*

- **DNS-6** — Every chip in a chip row is a pointer target, so the MOB-3 floor (24×24 CSS px
  AA; 44 px comfortable per MOB-1/MOB-5) applies to **each chip**, and NN/g's spacing finding
  (MOB-4: spacing cannot rescue undersized targets) applies **between chips**. Density is
  achieved by *collapsing groups*, never by shrinking targets below the floor. *Inference
  composing MOB-3/MOB-4 (labelled).*

- **DNS-7** — Dense data tables are the recognized exception to WCAG reflow (RSP-3): a wide
  table may 2-D-scroll **inside its own container**; the page around it still must not.
  *Tier A (the SC 1.4.10 exception list, w3.org fetch 2026-07-18).*

- **DNS-8** — Sub-navigation scale thresholds (NN/g): **<6 subcategories** → submenu/accordion
  in place; **6–15** → a section menu; **>15** → a category landing page. Applied to filters:
  a facet with a handful of values can sit open; a many-valued facet wants a collapsed
  disclosure, not an endless open chip wall. *Tier B, fetched
  https://www.nngroup.com/articles/mobile-subnavigation/ 2026-07-18 (nav-scoped research,
  filter application is a labelled analogy).*

- **DNS-9** — ⚠ SITE-CONSTRAINTS reminder (normative for this chapter): filter/compare
  patterns from the literature that auto-open overlays, nag, or interstitial are **banned
  regardless of source** (Douglas hard rule 2); progressive disclosure the user opens is the
  compliant shape. *Project rule, CLAUDE.md hard rule 2 — cited as project fact, not external.*

## Gaps (next-round targets — this chapter is the standing round-2 priority)

- The APG accessible implementations for slider / disclosure / listbox / combobox (via ACC-9).
- Baymard filtering/e-commerce research (filter UX at scale; likely partially member-walled —
  test fetchability).
- A sourced pattern for the part-list card at 375 px (what data survives, what folds).
- Responsive data-table strategies (column priority, row-to-card collapse) — currently only
  the DNS-7 exception is pinned, not any positive pattern.
- Touch-keyboard optimization for numeric filters (`inputmode`, `type`) — with MOB gaps.
