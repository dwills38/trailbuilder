# Verify notes — frames (verify/wall-retest-1, 2026-07-20)

Dispositions from the wall re-test sweep. See the branch commits for full
per-field detail; this is the summary index.

## Norco (norco.com — RENDERS, was a WebFetch tooling gap)

Norco's spec sheet loads only after clicking the client-side "Frameset" tab —
invisible to plain WebFetch/innerText, which is why it read as a "JS-only
shell to a fetch" wall. The browser pane renders it fully.

- `fr-norco-optic` — upgraded to verified:true. norco.com's `24-optic-C1` page
  confirms rearAxle/headset/bb/maxForkTravel/travel/maxRotorR exactly.
- `fr-norco-fluid-fs-a` — upgraded to verified:true. norco.com's `25-fluid-fs-a2`
  page confirms rearAxle/bb/headset/seatTube/maxRotorR(180, resolving the prior
  160->180 correction with a primary source)/maxForkTravel/travel/price exactly.
- `fr-norco-fluid-ht`, `fr-norco-torrent-ht-a`, `fr-norco-torrent-ht-s`,
  `fr-norco-shore-park` — **not re-verified**: all four are discontinued from
  norco.com's current lineup (not in the nav, no current product page found).
  Existing vitalmtb/dealer-page sourcing stands as the best available.

## Cannondale (cannondale.com — RENDERS, was a WebFetch tooling gap)

Same pattern: specs load only after clicking the client-side "Specs" tab.

- `fr-cannondale-jekyll` — upgraded to verified:true. Every field re-confirmed
  verbatim; frameset price corrected $3,000 (sample) -> $3,725 (real, maker-
  stated, page now prints "Jekyll Frameset $3,725").
- `fr-cannondale-scalpel` — upgraded to verified:true. **Real bug**: `udh` was
  `false` (inferred from the stock non-Transmission derailleur); the frame's
  own spec line explicitly reads "...UDH, post-mount disc – 160mm native" —
  corrected to `true`. brakeMount/maxRotorR upgraded from inference to a
  literal maker-stated ceiling.
- `fr-cannondale-scalpel-ht` — upgraded to verified:true. Same bug: frame spec
  line reads "...w/UDH hanger" — `udh` corrected `false` -> `true`.
- `fr-cannondale-habit-ht` — upgraded to verified:true. Same bug again: "...
  Boost 148, 55mm chainline, UDH hanger" — `udh` corrected `false` -> `true`.
  brakeMount upgraded from inference to "post mount disc" (maker-stated).

**Pattern**: all three false `udh:false` bugs were the same mistake — inferring
UDH absence from the *stock derailleur* rather than checking the frame's own
hanger spec line. The frame having a UDH hanger and shipping a non-Transmission
derailleur stock are unrelated facts; a false `udh:false` blocks a real,
compatible SRAM Transmission upgrade path with a false "won't fit".

## Propain (propain-bikes.com — RENDERS, was a WAF-403 tooling gap)

propain-bikes.com loads with no 403/WAF challenge from the browser pane; its
"Technical Data" tab (client-side, loads on click) is a full primary-source
spec table per model.

- `fr-propain-rage-3-cf` — upgraded to verified:true. Every field confirmed;
  brakeMount/maxRotorR upgraded from the documented-stock-max convention to a
  literal "Postmount 200" maker-stated ceiling.
- `fr-propain-spindrift-al` — **not upgraded to verified**, one field flagged
  not fixed: `maxForkTravel` corrected 190->200 (a real, safely-wider maker
  ceiling). The live page states a 180mm rotor ceiling, but this catalog's
  `cb-propain-spindrift-al-swedish-gold` complete bike ships real 203mm rotors
  per its own Propain-sourced build sheet and that row's own desc cites "the
  frame's 203mm-max native-mount tolerance" — likely a cross-generation
  mismatch between the live page (current Spindrift AL) and that 2024 Swedish
  Gold build. Left `maxRotorR` at 203 (the value the real shipped product
  needs) rather than narrowing it and breaking that build with a false
  warning. **Flagged for a follow-up gen-split reconciliation, not resolved.**

## Orbea (orbea.com — RENDERS, was a WAF-403 tooling gap)

orbea.com loads with no 403 from the browser pane. Its per-trim "Standard
configuration" panel is a DOM-present, `display:none` modal opened by
clicking a toggle — invisible to a plain WebFetch/innerText scrape, which
explains the prior false-wall read.

- `fr-orbea-laufey` — upgraded to verified:true via the exact `laufey-h30` SKU
  page. rearAxle/headset/seatTube/maxForkTravel confirmed exactly.
- `fr-orbea-oiz-m10` — upgraded to verified:true via the exact `oiz-m10` SKU
  page. shockEye/shockStroke/maxForkTravel/rearAxle/bb/seatTube confirmed
  exactly. Noted (not resolved): orbea.com names this trim's stock fork "Fox
  34 Float SL Factory" vs the vitalmtb-sourced "FOX FLOAT 34 Step-Cast (SC)
  Factory" already used on this frame's completebike fills — likely a running
  model-year fork-lineup refresh (SC succeeded by SL), flagged for a
  fork-fill follow-up, out of scope for the frame row itself.
- `fr-orbea-occam-sl` — **not re-verified**: discontinued from orbea.com's
  current lineup (`bikes-mountain-occam_sl` 404s, not in the mountain-bikes
  nav at all). Existing vitalmtb sourcing stands.

## Stale "walled" notes that should be rewritten

Every repo note claiming these four brands are walled should be treated as
**superseded** by this pass:
- Norco: "norco.com is a JS-only shell to a fetch (the documented Norco
  blocker)" — appears on multiple frame-row `desc` fields. Not a wall; a
  click-to-load tab the fetch tooling never triggered.
- Cannondale: "cannondale.com bike product pages are JS-rendered/fetch-
  blocked" / "the documented Cannondale blocker" — same pattern, same fix
  (click the "Specs" tab).
- Propain: "propain-bikes.com WAF-403" / "the documented Propain fetch wall" —
  not a WAF block; renders cleanly, spec data is behind a "Technical Data"
  tab click.
- Orbea: "orbea.com is 403-walled" / "the documented Orbea blocker" — not a
  403; spec data is behind a `display:none` modal opened by a button click.

None of these four should be re-flagged as walled in future sessions without
first trying the browser pane + a tab/modal click.
