# Navigation & Information Architecture

**Maturity: foundation** (L1 seed, 2026-07-18)

Multi-page nav (BuildMyMTB / BuildMyBMX / BuildMyKit and the coming family), hamburger vs
visible actions, deep links, back behavior. Read [`INDEX.md`](INDEX.md) first.

## Facts

- **NAV-1** — Hiding navigation has a measured cost (NN/g study): discoverability of
  nav-dependent content drops **>20%**; hidden menus get used far less (desktop 27% vs 48–50%
  visible/combo; mobile 57% vs 86% combo); tasks run **~39% slower on desktop / ~15% slower on
  mobile** with hidden nav, and are rated ~21% harder. *Tier B, fetched
  https://www.nngroup.com/articles/hamburger-menus/ 2026-07-18. Implication: keep the small
  page family as **visible** nav links/tabs as long as they fit; a hamburger is a last resort,
  and "combo" (key items visible + overflow hidden) beats fully hidden.*

- **NAV-2** — Subnavigation scale thresholds: <6 items → submenu/accordion; 6–15 → section
  menu; >15 → category landing page. Sequential (drill-in) menus disorient and collide with
  the device back button. Section menus must be visually distinct from the main menu or users
  never find them. *Tier B, fetched https://www.nngroup.com/articles/mobile-subnavigation/
  2026-07-18.*

- **NAV-3** — Navigation design goals (NN/g): minimum interaction cost to reach an item,
  support for the typical path, and discoverability of the nav UI itself. *Same fetch as
  NAV-2.*

- **NAV-4** — Site synthesis (labelled inference): the existing hash-route deep links
  (`#guide/<slug>`, share links) are the right shape for a no-build-step static site — they
  survive GitHub Pages hosting with zero server routing, and they give Back-button behavior
  for free via the history stack. Any new page-internal mode (a filter state, a compare view)
  that users will want to share or Back out of should live in the hash; transient UI (an open
  disclosure) should not. **The Back-behavior claim is convention + platform behavior, not a
  fetched study** — treat as inference until an L2 source is pinned. *Inference.*

- **NAV-5** — ⚠ SITE-CONSTRAINTS: as the page family grows (MTB, BMX, Kit, road/gravel/EMTB
  someday), NAV-2's thresholds say the header link row stops scaling somewhere in the 6–15
  band — the sourced options at that point are a section-style switcher or a landing page,
  **not** an auto-appearing mega-menu or interstitial (hard rule 2). *Composition of NAV-2 +
  project rule (labelled).*

## Gaps (next-round targets)

- No fetched source on cross-page nav consistency for a product family (L2).
- Back-behavior / history-API conventions unpinned (NAV-4 note).
- Breadcrumbs research (NN/g has it) unfetched — relevant once guides/categories deepen.
- No IA-method source (card sorting, tree testing) — that's L4 territory.
