# Performance & Perceived Performance

**Maturity: professional** (L1 complete + L2 INP-mechanism/perception-research depth, round 3, 2026-07-18)

LCP/INP budgets, no-build-step constraints, font/paint behavior. Read [`INDEX.md`](INDEX.md)
first.

## Facts

- **PRF-1** — **LCP budget**: good **≤ 2.5 s**, poor > 4.0 s, judged at the **75th percentile**
  of page loads across mobile+desktop. LCP candidates: `img`, `image`-in-`svg`, `video`
  poster/first-frame, `url()` background images, and block-level text elements. *Tier A,
  fetched https://web.dev/articles/lcp 2026-07-18. Site note: with no hero imagery, this
  site's LCP element is almost certainly a text block — LCP is then gated by CSS/JS arrival
  and first render, not image loading.*

- **PRF-2** — **INP budget**: good **≤ 200 ms**, needs-improvement 200–500 ms, poor > 500 ms,
  at the 75th percentile. *Tier A, fetched https://web.dev/articles/inp 2026-07-18. Site
  note: the INP-critical interactions here are part-pick → `checkBuild` + full re-render, and
  filter changes over the whole catalog; keeping those handlers under ~200 ms **on a mid-range
  phone** as the catalog grows is this site's principal performance contract.*

- **PRF-3** — Site synthesis (labelled inference from PRF-1 + the repo's conventions): the
  no-build-step/no-CDN/vendored stack is performance-*friendly* by construction — no
  third-party font/CDN round-trips, one origin — and the classic `<script>` chain
  (`compat.js` etc.) is render-blocking by default, which keeps first paint behind catalog
  parse. Measurement (PRF-5 gap) must precede any restructuring recommendation. *Inference,
  labelled.*

- **PRF-4** — No webfonts is a font-performance *win*: system fonts render with zero network
  cost and no FOUT/FOIT window. **The FOUT/FOIT taxonomy and `font-display` details are
  unpinned this round** — irrelevant while the no-webfont constraint holds; pin only if that
  constraint is ever revisited. *Status note, not a fact.*

- **PRF-5** — Skeleton screens vs spinners and perceived-wait research: **not established this
  round** — no primary fetched. Do not assert "skeletons feel faster" from memory; the
  research record is genuinely mixed and needs fetching. *Honest gap.*

- **PRF-6** — INP's three independently-optimizable subparts (the mechanism layer under PRF-2):
  **input delay** (interaction start → event callbacks begin — commonly extended by main-thread
  script parsing/compiling during page load, or by other overlapping interactions/timers),
  **processing duration** (the callbacks actually running — reducible by breaking long callbacks
  into smaller tasks that yield, e.g. via `setTimeout`, and by doing only the UI-visible update
  first, deferring everything else), and **presentation delay** (callbacks done → next frame
  painted — driven up by large-DOM rendering cost; `content-visibility` can lazily skip
  off-screen rendering work). Chrome DevTools' "INP breakdown" insight reports which of the
  three subparts dominates a given slow interaction, so the fix targets the actual bottleneck
  rather than guessing. *Tier A, fetched https://web.dev/articles/optimize-inp,
  https://web.dev/articles/inp, and
  https://developer.chrome.com/docs/performance/insights/inp-breakdown 2026-07-18. Site note:
  PRF-2 already names `checkBuild` + full re-render as this site's INP-critical path — this is
  the diagnostic vocabulary for isolating *where* in that path time goes, once real
  measurement (a still-open gap) exists.*

- **PRF-7** — NN/g's classic **0.1 / 1 / 10 second** response-time canon (Nielsen 1993,
  reaffirmed with modern data in a 2010 follow-up): **0.1s** feels instantaneous / direct
  manipulation, no feedback needed beyond the result itself; **1s** keeps the user's flow of
  thought unbroken — they notice the delay and feel "the computer is working," but still feel in
  control (delays in this band should show *some* sign of activity, e.g. a cursor change);
  **10s** is the limit for holding attention at all — beyond it, use a percent-done indicator
  and let the user do something else meanwhile, and assume they'll need to reorient when the
  wait ends. *Tier B, fetched https://www.nngroup.com/articles/response-times-3-important-limits/
  and https://www.nngroup.com/articles/website-response-times/ 2026-07-18. Directly frames PRF-1/
  PRF-2's budgets in human terms: INP's 200ms good-threshold (PRF-2) sits comfortably inside
  the 0.1–1s "still feels responsive" band, not the 0.1s "instantaneous" band — useful context
  for why 200ms was chosen as *good*, not merely *acceptable*.*

- **PRF-8** — Resolves PRF-5 honestly (the research genuinely doesn't give a universal winner):
  skeleton screens generally out-perform spinners on **perceived** speed and preference
  specifically for **informational** content (a 2018 news-site study, N modest, found skeleton
  scored higher on perceived speed and ease-of-navigation than a spinner; a larger 2025
  comparative study found skeletons rate best for *informational* apps specifically, while
  progress bars win for *educational*/*entertainment* purposes and spinners rate worst for
  informational/educational but fine for entertainment "flow" contexts — perception is
  service-purpose-dependent, not universal). **Critical caveat**: perceived speed and actual
  task-completion speed are different axes — the 2018 study's participants were objectively
  *faster* finding a specific article with the plain spinner despite rating the skeleton screen
  as feeling faster, and found no statistically significant difference overall. A 2024 study of
  *combinations* found "looped spinner + skeleton screen" scored best for perceived wait time
  specifically. *Tier B (published HCI/UX research with stated N, not NN/g-branded but the same
  caliber the corpus's own Tier-B definition names), fetched via Exa search-highlights of
  Mejtoft/Långström/Söderström 2018 (dl.acm.org DOI), a 2025 Korean HCI journal comparative
  study, and a 2024 thesis on feedback-combination perception, 2026-07-18. Site-relevant
  conclusion: BuildMyMTB is squarely an "informational" product (a parts catalog, not
  entertainment/education) — the research leans toward a skeleton screen being the better
  perceived-speed choice for the catalog's loading states, but this is a *lean from mixed
  evidence*, not a settled fact; don't claim it's proven faster.*

- **PRF-9** — The **back/forward cache (bfcache)**: a whole-page snapshot the browser holds in
  memory on navigating away, restored instantly (no re-fetch/re-parse/re-execute) on Back/
  Forward — and this is common, not an edge case (Chrome field data: **~1 in 10 desktop
  navigations, ~1 in 5 mobile**, are Back or Forward). Common eligibility blockers: an `unload`
  event listener (use `pagehide` instead — Chrome/Firefox refuse to bfcache a page carrying one);
  open connections at navigation time (IndexedDB, in-flight fetch/XHR, WebSockets, WebRTC —
  close them in `pagehide`); historically `Cache-Control: no-store` on the document itself.
  Testable directly in Chrome DevTools (Application → Back/forward cache → Run Test) and via
  Lighthouse 10+. *Tier A, fetched https://web.dev/articles/bfcache 2026-07-18. Cross-referenced
  from `navigation-ia.md` NAV-12: this site's hash-routed navigation (NAV-4/NAV-11) should be
  checked for bfcache eligibility like any other transition — an unactioned gap, not a known
  problem (no known `unload` listener exists in the codebase, but it hasn't been verified).*

- **PRF-10** — Resolves PRF-4's placeholder: `font-display` has five values on a spectrum from
  "hide until ready" to "never show the wrong font" — `block` (default; brief invisible-text
  window, Safari blocks indefinitely, Chromium/Firefox cap at ~3s before falling back),
  `swap` (show the fallback immediately, swap when ready — most common, but risks a visible
  reflow if the fallback and web font differ in metrics), `fallback` (a very short block, then
  commits to the fallback if the font hasn't arrived), `optional` (strictest: only uses the web
  font if it arrives within ~100ms, otherwise skips it for this navigation entirely — no
  mid-visit swap, no layout jank). *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display,
  https://web.dev/learn/performance/optimize-web-fonts, and
  https://web.dev/articles/preload-optional-fonts 2026-07-18. Confirmed dormant: the site ships
  **no webfonts at all** (PRF-4), so none of this applies today — recorded for completeness
  only, per PRF-4's own note to "pin only if that constraint is ever revisited."*

- **PRF-11** — Script loading decision rule: a plain `<script src>` blocks HTML parsing until
  fetched *and* executed; `async` downloads without blocking parsing but executes as soon as
  it's ready (no order guarantee across multiple `async` scripts — wrong choice for
  interdependent scripts); `defer` downloads without blocking parsing **and** executes only
  after parsing completes, **in source order**, right before `DOMContentLoaded`. MDN's own rule:
  use `async` only for scripts with zero dependencies on the DOM or on each other (analytics is
  the canonical example); use `defer` whenever scripts depend on the DOM being ready or on each
  other's order. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script 2026-07-18. Site
  note: PRF-3 already flagged the classic `<script>` chain (`compat.js` etc.) as render-blocking
  by default; this is the concrete lever if that's ever revisited — `defer` preserves the
  chain's dependency order while unblocking initial parse/paint. **Flagging as a
  recommend-to-coordinator candidate, not implementing** — the corpus never edits app code.*

- **PRF-12** — **Cumulative Layout Shift (CLS)**, the third Core Web Vital, now seeded: good
  **≤ 0.1**, poor **> 0.25**, measured the same way as LCP/INP (75th percentile, mobile+desktop).
  Score = impact fraction (how much of the viewport shifted) × distance fraction (how far it
  moved). *Tier A, fetched https://web.dev/articles/cls and
  https://web.dev/articles/optimize-cls 2026-07-18. Site note: PRF-1's own text confirms low
  inherent risk here (no hero imagery, a stable-layout app), but the number is now on record for
  when field measurement (still a gap) becomes possible.*

## Gaps (next-round targets)

- Field measurement: no CWV data exists for buildmymtb.com (Cloudflare Web Analytics measures
  traffic, and any RUM/CWV capability it has is unverified). Pinning real LCP/INP/CLS numbers is
  the first actionable step — recommend-to-coordinator, not implement.
- PRF-8's lean (skeleton screens likely suit an informational catalog better) has never been
  tested on this site specifically — a real recommend-and-measure step, not a corpus fact.
- No CWV field-data tool has been evaluated for a Cloudflare-Pages/static-hosting-only stack
  (e.g. whether Cloudflare Web Analytics' own RUM extension covers CWV) — worth checking before
  recommending a separate RUM library.
