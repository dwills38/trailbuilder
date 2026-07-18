# Platform Conventions — iOS HIG vs Material vs web-native

**Maturity: master** (L1+L2 complete + L3 depth on desktop input conventions — capability media
features, SC 1.4.13 and its `title` exemption, and a live hover/cursor audit yielding a reasoned
no-action (PLT-11); round 4, 2026-07-18. PLT-2 remains honestly inference-grade — see PLT-14.)

When to follow which convention set, for a web app used on both platforms. Read
[`INDEX.md`](INDEX.md) first.

## Facts

- **PLT-1** — The two platform floors diverge on numbers but agree on direction: Apple asks
  **44×44 pt** hit targets (MOB-1), Google asks **48×48 dp** (MOB-2); both are vendor guidance
  sitting above WCAG's 24 px AA requirement (MOB-3). A cross-platform web app that designs to
  the **stricter applicable figure** (≈48 px for primary touch controls) satisfies all three.
  *Composition of MOB-1/2/3 (labelled inference; the component numbers are Tier A).*

- **PLT-2** — Decision rule for a web product (labelled inference, seeded as the chapter's
  working doctrine until an L2 source refines it): **web-native conventions first** — links
  look like links (ACC-5), the browser's own Back/scroll/zoom behaviors are never hijacked
  (MOB-9's gesture requirements point the same way), form controls stay real form controls
  unless a custom control carries its full ARIA contract (ACC-9 gap). Platform HIGs override
  web habit only where the *hardware* makes them load-bearing: target sizes (PLT-1), safe
  areas (MOB-8), thumb reach (MOB-6). Do not simulate iOS or Material *cosmetics* on the web —
  the site has its own theme system and impersonating a platform buys nothing. *Inference over
  Tier-A component facts; explicitly flagged for an L2 source (e.g. NN/g on platform
  conventions for web apps).*

- **PLT-3** — Android formalizes a text-contrast tier split the same way WCAG does: <18 sp
  (or <14 sp bold) text needs **4.5:1**, larger text 3:1 — i.e. the WCAG numbers restated in
  sp. Useful as evidence the AA contrast floor is cross-vendor consensus, not just W3C. *Tier
  A, fetched https://developer.android.com/guide/topics/ui/accessibility/apps 2026-07-18.*

- **PLT-4** — Fetch-route facts for this chapter's own sources (operational, from the INDEX
  fetchability map): Apple HIG pages are triple-walled (WebFetch shell / Exa-crawl error /
  Bright Data Forbidden) — pin HIG facts via **Exa search highlights** of the HIG page text.
  Google-side guidance: use **developer.android.com** (fetches clean); m3.material.io is
  walled. *Operational fact, established by direct attempts 2026-07-18.*

- **PLT-5** — Web-native form-control conventions (NN/g's Top-10, condensed to what's
  load-bearing for a filter-heavy catalog UI): avoid placeholder text as a label substitute
  (it disappears once typing starts and fails accessibility); never use a Reset/Clear button
  (the risk of accidental data loss outweighs the rare need to start over); single-column field
  layout (multi-column breaks vertical scanning momentum — short logically-grouped fields like
  City/State/Zip are the sanctioned exception); match field width to expected input length
  (don't give a 3-character field the same box as a paragraph); prefer radio buttons over a
  dropdown for only 2–3 options (one tap/click vs. two); mark the *optional* fields when most
  fields are required, not the reverse; surface errors with more than one cue (outline + text +
  weight — never color alone, which is also WCAG's own non-text-alone principle). A cited CHI
  study found forms following these guidelines got submitted correctly on the first try **78%**
  of the time vs **42%** for forms violating them. *Tier B, fetched
  https://www.nngroup.com/articles/web-form-design/ 2026-07-18. Direct input to
  `forms-filters-density.md`'s filter-rail/slider work as much as this chapter — the site's
  price/weight range inputs and any future account/profile forms should default to these.*

- **PLT-6** — The **100vh mobile trap**, resolved: `100vh` measures against the *largest*
  possible viewport (chrome retracted) on Safari/Chrome-mobile — intentionally, per WebKit's own
  2015 rationale (re-laying-out at 60fps as the address bar shows/hides "looks like shit," so
  Safari pinned `vh` to the large-viewport size instead). The consequence: content sized to
  `100vh` at page-load time (chrome *expanded*) overflows below the visible area until the user
  scrolls and the chrome retracts. The fix is the newer **small/large/dynamic viewport units**:
  `svh` (chrome-expanded size — content never hides behind the address bar), `lvh` (chrome-
  retracted size — old `vh` behavior), `dvh` (recalculates live as chrome shows/hides — closest
  to "always fill the visible area," but **re-triggers layout on every scroll frame**, so avoid
  it on properties like `font-size` that would visibly jump while scrolling). Practical rule: use
  `100svh` for "never let content hide behind browser chrome," reserve `dvh` for elements whose
  live-resizing is actually desired. Supported in Safari/Firefox first, Chrome 108+. *Tier A,
  fetched https://web.dev/blog/viewport-units 2026-07-18, corroborated by a practitioner
  deep-dive (ishadeed.com) carrying the same technical explanation and the WebKit-bug-tracker
  quote for historical rationale. Directly answers this chapter's own iOS-Safari-quirk gap.*

- **PLT-7** — `overscroll-behavior` controls two related mobile-scroll conventions in one
  property: **scroll chaining** (a nested scroll container that hits its own boundary handing
  the rest of the scroll gesture to its parent — e.g. a modal's content scrolling the page
  behind it once you reach the bottom) and the **rubber-band/pull-to-refresh bounce** effect at
  a page's own boundary. `contain` stops chaining to the parent while keeping the local bounce;
  `none` stops both. Canonical use: `overscroll-behavior: contain` (or `-y`) on a modal/dialog's
  scrollable body so scrolling past its end doesn't drag the page underneath along with it; a
  fixed-`overflow:hidden` element is *always* considered at its boundary, so setting `contain`/
  `none` there blocks all background scroll while it's showing. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior and
  https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overscroll_behavior 2026-07-18.
  Directly actionable for any click-opened modal/card (the spec-card, login dialog — both
  explicitly sanctioned by the site's no-pop-up rule as user-triggered surfaces) that scrolls
  independently of the page.*

- **PLT-8** — PWA installability, Chrome's concrete criteria (the fullest-specified browser):
  served over HTTPS; a linked web app manifest (`.webmanifest`) declaring `name`/`short_name`,
  icons at **192px and 512px**, `start_url`, and `display` set to one of
  `fullscreen`/`standalone`/`minimal-ui`/`window-controls-overlay`; plus an engagement heuristic
  (at least one tap/click, and at least 30 seconds of viewing, at any point including a prior
  visit) before the browser fires `beforeinstallprompt` — which a page can capture to drive its
  own "Install" UI instead of the browser's default prompt. **Safari has no `beforeinstallprompt`
  and no way to trigger installation programmatically** — iOS/iPadOS users install manually via
  the Share sheet's "Add to Home Screen," so any custom install-prompt UI must fork to manual
  instructions on Safari rather than assume the event will fire. *Tier A, fetched
  https://web.dev/articles/install-criteria, https://web.dev/learn/pwa/web-app-manifest, and
  https://web.dev/learn/pwa/installation-prompt 2026-07-18. Currently a pure gap for
  BuildMyMTB — no manifest exists — recorded per the chapter's own "PWA installability facts"
  charter item; **recommend-to-coordinator if Douglas wants an installable app someday**, not
  something this corpus implements.*

---

## Desktop conventions: hover, pointer, cursor (round 4 / master, 2026-07-18)

Closes this chapter's clearest standing Gap ("desktop-specific conventions … remain unfetched").

- **PLT-9 — Input-capability media features: `hover` / `any-hover` / `pointer` / `any-pointer`.**
  `hover` tests whether the **primary** input can conveniently hover (`hover` | `none`);
  `pointer` describes the primary pointing device's accuracy (`fine` mouse/trackpad | `coarse`
  touch | `none`). The `any-*` variants test whether *any* available input qualifies — which
  matters on hybrid devices (a touchscreen laptop reports both). **The recommended pattern is
  progressive enhancement, not detection-and-branch**: ship a baseline that works everywhere,
  then use `@media (hover: hover)` to *add* hover affordances. The governing principle is
  blunt — **never rely on hover for essential functionality**, because a touch user simply
  cannot reach it. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover 2026-07-18.*

- **PLT-10 — SC 1.4.13 Content on Hover or Focus (AA) — and its `title` exemption.** Where
  hover or focus reveals additional content, that content must be **dismissable** (without
  moving pointer/focus), **hoverable** (the pointer can move onto it without it vanishing) and
  **persistent** (it stays until dismissed, un-hovered, or invalidated). **Critical scoping
  fact: native `title` tooltips are EXEMPT.** The criterion carves out content whose "visual
  presentation … is controlled by the user agent and is not modified by the author," and the
  Understanding page names browser tooltips from the HTML `title` attribute as the example.
  *Tier A, fetched https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
  2026-07-18.* **Recorded specifically as a false-finding guard**: `index.html` carries **46**
  `title=` attributes, and a future round scanning for 1.4.13 exposure would otherwise "find" 46
  violations that are not violations. `title` has real *usability* weaknesses (PLT-12) — it just
  isn't a 1.4.13 failure.

### Live-DOM hover audit — another reasoned "no action needed"

- **PLT-11 — ✅ The site has ZERO `@media (hover:…)` queries, and that is correct, because
  nothing is hover-gated.** Audited all **36** `:hover` rules in `index.html`: **not one**
  changes `display`, `visibility` or `opacity` — every rule is purely cosmetic (colour and
  background state). No content, control or affordance is revealed by hover, so there is nothing
  for a `hover: none` branch to rescue, and PLT-9's "never rely on hover for essential
  functionality" is satisfied **by construction** rather than by capability-detection. Adding
  `@media (hover: hover)` wrappers today would be ceremony with no behavioural difference.
  *Standing condition on this recommendation:* it holds only while `:hover` stays cosmetic. **The
  moment any rule reveals content on hover, PLT-9's branch and PLT-10's three conditions both
  become live** — that is the trigger to re-open this, and it is cheap to re-check (grep `:hover`
  for `display|visibility|opacity`).

- **PLT-12 — The one genuinely hover-dependent channel is `title`, and it is already
  backstopped.** The compat dot renders as
  `role="img" aria-label="Compatibility: <reason>" title="<reason>"`. Screen-reader users get
  the reason from `aria-label`; **mouse users** get it from the tooltip; **touch users get
  neither**, since `title` never fires on touch. This was already found and mitigated by a prior
  in-project phone audit (2026-07-14): the part-detail modal carries a `.pm-compat` line
  showing the same reason, explicitly commented as "readable on TOUCH where the dot's hover
  title never shows." **So the information is reachable on every input** — it just costs touch
  users one extra interaction (open the part) versus a desktop hover. Recorded as an **accepted,
  documented tradeoff, not a finding**: the alternative (always-visible reason text on every
  card) collides head-on with DNS-6/DNS-8's density limits at 375 px. *Worth carrying into the
  parked MOB-46 mobile-controls audit as a known asymmetry rather than re-deriving it there.*

- **PLT-13 — Cursor semantics: consistent and conventional.** `index.html` uses exactly three
  cursor values — `pointer` (18×, on clickable controls) and `grab`/`grabbing` (2× each, on the
  range-slider thumbs, switching on `:active`). The grab/grabbing pair is the conventional
  signal for a draggable object and correctly distinguishes "can be dragged" from "is being
  dragged." No misuse found (no `pointer` on non-interactive text, no custom cursors).
  **Cross-reference DNS-21:** now that the numeric fields provide the non-drag path, the `grab`
  cursor honestly advertises drag as *one* way to operate the slider rather than the only one.
  *Site audit; no single Tier-A source defines cursor semantics, so this is recorded as a
  consistency check, not a sourced requirement.*

- **PLT-14 — PLT-2 remains inference-grade; this round did not close it, and says so.** The Gap
  asked for a real source for "when to override web-native with a platform convention."
  PLT-9/PLT-10 sharpen the *mechanism* (capability queries, never user-agent sniffing) and
  PLT-11 shows the doctrine working in practice, but **neither is a citable statement of the
  decision rule itself**. This round's searching surfaced no Tier-A/B page stating it as a named
  rule — the literature addresses specific conventions rather than the meta-question of
  precedence. **Honest status: PLT-2 stays labelled inference.** Recording the *failed* search so
  a future round doesn't repeat it: the likely unlock is an NN/g cross-platform/web-app piece
  rather than a vendor HIG, since a vendor will never publish "prefer the web's convention over
  ours."

- **PLT-15 — PLT-11's conditional re-checked (round 5, 2026-07-18): HOLDS.** Grepped every
  `:hover` rule across all six HTML entry points (59 occurrences: `index.html` 35, `bmx.html`
  9, `KitBuilder/index.html` 9, the three legal pages 2 each) for
  `display|visibility|opacity|pointer-events` inside the declaration block: **zero matches**.
  Every `:hover` remains cosmetic (color/border/underline feedback), no content or control is
  hover-gated, so PLT-11's zero-`@media (hover:…)` no-action recommendation stands unchanged.
  *Method: multiline regex over the repo at `origin/main` @ `2ff6e6c`; the cheap per-round
  sweep PLT-11's Gap prescribed.*

## Gaps (next-round targets)

- **PLT-2 still needs a real source** — round 4 tried and failed; see **PLT-14** for what was
  searched and where the likely unlock is, so the effort isn't repeated blind.
- ~~Desktop-specific conventions (hover affordances, pointer/`cursor` semantics)~~ → **CLOSED
  round 4 by PLT-9–PLT-13.** *Keyboard shortcuts* were **not** covered: the site has ~10
  `keydown`/key handlers but no documented shortcut scheme, and no source was fetched on
  web-app shortcut conventions (discoverability, conflict with AT and browser bindings). That
  remains open and is the narrower successor to this Gap.
- **PLT-11's no-action recommendation is conditional** and must be re-checked whenever CSS
  changes: it holds only while every `:hover` rule stays cosmetic. Cheap test — grep `:hover`
  for `display|visibility|opacity`. **Last re-checked round 5 (2026-07-18) by PLT-15: holds.**
- Material's own M3 pages remain unpinned (walled); if a future round needs an M3-specific
  fact (state layers, elevation), find the developer.android.com or research-blog carrier.
- PLT-8 (PWA) is seeded but entirely dormant — revisit only if an installable-app ask surfaces.
