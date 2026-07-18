# Platform Conventions — iOS HIG vs Material vs web-native

**Maturity: professional** (L1 complete + L2 web-native-first implementation patterns, round 3, 2026-07-18)

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

## Gaps (next-round targets)

- PLT-2 still needs a real source (it remains doctrine-grade inference) — none of this round's
  fetches directly addressed "when to override web-native with a platform convention," though
  PLT-1/PLT-5/PLT-6/PLT-7 all reinforce it by example rather than as a named citable rule.
- Desktop-specific conventions (hover affordances, pointer `cursor` semantics, keyboard
  shortcuts) remain unfetched — still the clearest next-round target for this chapter.
- Material's own M3 pages remain unpinned (walled); if a future round needs an M3-specific
  fact (state layers, elevation), find the developer.android.com or research-blog carrier.
- PLT-8 (PWA) is seeded but entirely dormant — revisit only if an installable-app ask surfaces.
