# Navigation & Information Architecture

**Maturity: professional** (L1 complete + L2 IA-research methods and deep-link mechanics, round 3, 2026-07-18)

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

- **NAV-6** — **Card sorting** (NN/g): a generative research method where participants group
  labeled content cards into categories that make sense to *them*, to uncover users' mental
  models before an IA is built. **Open** (no predefined categories) is the default recommendation
  — it surfaces categorization schemes the team hasn't thought of; **closed** (predefined
  categories) or **hybrid** are used when validating against 1–2 categories the team is already
  confident about, though NN/g's own preference for pure *validation* of a proposed hierarchy is
  tree testing (NAV-7), not closed card sorting. *Tier B, fetched
  https://www.nngroup.com/articles/card-sorting-definition/ 2026-07-18.*

- **NAV-7** — **Tree testing** (NN/g, aka reverse card sorting): an evaluative method — given a
  finished category tree (text labels only, no visual design, no search, no context cues,
  deliberately stripped down), participants complete find-this-resource tasks and the tool
  scores **success rate**, **directness** (reached the answer without backtracking — a proxy for
  label clarity), and **first-click** (which top-level category people try first — diagnostic
  even when the task fails). Card sorting *generates* candidate structures; tree testing
  *evaluates* a specific proposed structure — different tools for different project stages.
  Quantitative comparisons between two tree options need ~50+ participants per tree for
  significance. *Tier B, fetched https://www.nngroup.com/articles/tree-testing/,
  https://www.nngroup.com/articles/navigation-ia-tests/, and
  https://www.nngroup.com/articles/interpreting-tree-test-results/ 2026-07-18. This is the
  concrete method to settle a real disagreement about where a page belongs in the nav (e.g. if
  BuildMyKit should nest under MTB or sit as a peer) rather than guessing.*

- **NAV-8** — **Breadcrumbs**, NN/g's 11 guidelines (condensed to what's load-bearing here):
  show **location in the site hierarchy, never session/click history** (that's the browser's
  Back button's job — a history-trail breadcrumb is confusing and useless for anyone who lands
  deep via an external link); supplement, never replace, the primary nav; for content with more
  than one valid parent (polyhierarchy), pick one canonical path rather than showing multiple
  trails or personalizing per-user; the current page is the last item and is **not** a link;
  omit entirely on flat 1–2-level hierarchies. **Mobile-specific**: never let a trail wrap to
  multiple lines, and don't shrink crumbs/spacing below the touch-target floor to avoid
  wrapping (ties directly to MOB-3/MOB-4) — shortening to just the immediate parent level is an
  acceptable mobile-only compromise NN/g explicitly does *not* endorse for desktop. *Tier B,
  fetched https://www.nngroup.com/articles/breadcrumbs/ and
  https://www.nngroup.com/articles/breadcrumb-navigation-useful/ 2026-07-18.* The accessible
  markup pattern: wrap the trail in `<nav aria-label="…">` containing an ordered list of links,
  with `aria-current="page"` (or equivalent) on the current, unlinked item. *Tier A technique,
  fetched https://www.w3.org/WAI/WCAG22/Techniques/general/G65.html 2026-07-18. Currently
  dormant — no page in the family is deep enough in a hierarchy to need one yet (MTB/BMX/Kit
  are peers, not parent/child), but directly actionable once guides/categories nest.*

- **NAV-9** — **Search-vs-browse is synergistic, not either/or** (NN/g): search has a higher
  interaction cost than browsing — users must formulate *and type* a query, which is
  error-prone and slow (worse on touch keyboards), and users import a "Google-grade relevance"
  expectation onto every site's search box, which most site-search implementations don't meet.
  Navigation, by contrast, *teaches* users the shape of the content space and is often faster
  than composing a good query for users who don't yet know exactly what they want. The
  recommendation is never to replace visible navigation with search-only (the same anti-pattern
  as hiding nav behind a hamburger, NAV-1) — the two should coexist. *Tier B, fetched
  https://www.nngroup.com/articles/search-not-enough/ 2026-07-18. Directly relevant as the page
  family grows past NAV-2's 6–15-item threshold: a search box is a valid *addition* at that
  point, never a replacement for the visible switcher NAV-5 already calls for.*

- **NAV-10** — The History API (`pushState`/`replaceState`/`popstate`) is the non-hash mechanism
  for SPA deep-linking: `pushState(state, "", url)` adds a history entry without a page load;
  `popstate` fires on Back/Forward with the state object that was pushed. **Gotcha**: the entry
  created by the page's *initial* load carries no pushed state, so a `popstate` back to it
  arrives with `event.state === null` unless the page called `replaceState` on load to attach
  one. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API
  2026-07-18. Not the mechanism this site uses (it's hash-routed, NAV-4) but the comparison
  point: `pushState`/`popstate` needs a server that serves the SPA shell for any deep-linked
  URL — exactly the server-routing dependency NAV-4 said hash routing avoids on static hosting.*

- **NAV-11** — **Resolves NAV-4's flagged inference**: `location.hash` changes (including
  `#guide/<slug>`-style route changes) **do create real browser history entries** — Back/Forward
  navigate between them and fire `hashchange` — confirmed from a fetched primary, not just
  platform convention. The two mechanisms are mutually exclusive: `hashchange` does **not** fire
  when a page instead uses `pushState`/`replaceState` (NAV-10) — a page picks one deep-linking
  strategy, not both. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event 2026-07-18. NAV-4's
  Back-behavior claim is no longer "inference" — it's confirmed platform behavior.*

- **NAV-12** — Cross-reference: fast Back/Forward navigation isn't just a convenience, it's
  measurably common (Chrome data: **1 in 10 desktop navigations, 1 in 5 mobile**, are Back or
  Forward) and the **back/forward cache (bfcache)** is what makes those instant when eligible —
  full detail (eligibility blockers, testing) lives in `performance-perceived.md` (PRF-9) to
  avoid duplicating it here; the IA-relevant takeaway is that hash-routed navigation (NAV-4/11)
  should be checked for bfcache eligibility same as any other page transition. *Tier A, see
  PRF-9's citation.*

## Gaps (next-round targets)

- NAV-6/7 give the *method*, not a completed study — no card sort or tree test has actually
  been run on BuildMyMTB's own nav; that's a recommend-to-coordinator action item, not a corpus
  fact to seed further.
- Cross-page nav consistency for a growing product family (MTB/BMX/Kit/Road/Gravel/EMTB) still
  has no dedicated fetched source beyond NAV-2/NAV-5's general thresholds — a source specific to
  multi-product-line site nav would sharpen this.
- NAV-9 opens the door to a future site-search feature; if one is ever built, NN/g's site-search
  usability guidelines (autosuggest quality, zero-results handling) are the next fetch target —
  out of scope while the site has no search box.
