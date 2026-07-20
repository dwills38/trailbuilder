# verify/forks-3 — dispositions (fork tail)

Session scope: `cat:'fork'` pending rows in `src/compat.js` (88 at session start).
Fork verification exception (Douglas 2026-07-17, VERIFY-PROTOCOL.md) applies: a fork
may carry `verified:true` on **interfaces alone** (wheel/travel/axle/steerer/brakeMount/
maxRotorF manufacturer-confirmed) with a **nominal/sample weight**, basis stated in `desc`.

## FIRST: DVO / EXT wall re-test

Re-fetched `dvosuspension.com/fork/onyx-sc/` via the browser pane
(`document.body.innerText`) this session: still a functionally dead product shell —
loads only nav/footer + the bare heading "ONYX SC D1", zero spec content. This is the
**4th session in a row** to hit the identical empty shell (see the row's own `desc` for
the prior three). Confirmed genuine documented wall, not a bot-block — no ethical-fetch
workaround applies (JS renders fine, there is simply no content). The 21 DVO `Failed`
rows stay Failed; no maker source exists to promote them. Did not re-fetch all 21
individually (identical page shell across the family per prior sessions' notes).

**EXT**: no `brand:'EXT'` fork rows exist in the catalog (checked via grep) — nothing to
test. Scope note for whoever wrote the brief: EXT may have been intended as a future
gap-fill brand, not an existing catalog cluster.

## Batch 1 (this commit): promote 34 fork-family rows meeting the fork exception

All 34 already had a `source` + `lastChecked` from prior sessions' research documenting a
**directly-fetched manufacturer page** (sram.com model/service pages, ridefox.com product
JSON, ohlins.com, srsuntour.com) confirming the interface fields for the row's exact
travel/wheel config — but were left un-promoted because weight wasn't maker-stated. Under
the 2026-07-17 fork exception that's no longer a blocker: added `verified:true` to each
(kept the existing `lastChecked`/`source`; nominal-weight basis was already disclosed in
each row's own `desc`). No catalog values were changed except the sibling-family Fox
Rhythm/RockShox rows where prior sessions had already independently fetched the parent
chassis's interfaces and confirmed this specific travel point exists via a bike-spec-sheet
fetch (Canyon/Kona/GT/Norco/Santa Cruz product pages) — same reuse convention already
used elsewhere in this catalog for verified same-chassis siblings (e.g. the
repromote-1-forks Fox 38 Performance row).

Promoted ids (34): fk-srsuntour-aion-34-29-140, fk-srsuntour-aion-34-275-140,
fk-srsuntour-aion-34-275-150, fk-rockshox-boxxer-select-d2-{29,275}-{180,190,200} (x6),
fk-ohlins-dh38-m1-29-180, fk-ohlins-dh38-m1-275-180, fk-rockshox-sid-sl-select-29-110,
fk-rockshox-sid-sl-select-29-100, fk-fox-34-sc-performance-29-120,
fk-fox-34-rhythm-29-120, fk-fox-34-rhythm-29-130, fk-fox-32-rhythm-29-120,
fk-fox-36-rhythm-29-160, fk-fox-38-rhythm-29-170, fk-rockshox-yari-rc-275-150,
fk-rockshox-judy-silver-tk-29-130, fk-rockshox-yari-rc-29-170,
fk-rockshox-yari-rc-29-160, fk-rockshox-35-gold-rl-29-130,
fk-rockshox-recon-gold-rl-29-120, fk-rockshox-35-gold-rl-29-150,
fk-rockshox-judy-silver-tk-29-100-qr, fk-rockshox-judy-silver-tk-29-100-boost,
fk-rockshox-judy-29-100-qr-rockhopper, fk-rockshox-judy-silver-tk-29-110,
fk-rockshox-judy-gold-rl-29-120, fk-rockshox-recon-rl-29-130,
fk-fox-40-performance-29-203, fk-rockshox-35-silver-tk-29-140.

Gates: `node validate.js` → 0 problems. `npm test` → 832/832 passed. `npm run typecheck`
→ clean.

## Left Pending — genuine gaps, not promoted (deliberately conservative)

- **fk-fox-32-sc-factory-275-100** — row's own source URL literally names the Performance
  tier, not Factory; unresolved naming discrepancy flagged by a prior session.
- **fk-formula-nero-r-{275-200,29-180,29-190,29-200}, fk-formula-nero-c-{275-200,29-200}**
  (6 rows) — rideformula.com's own steerer field is self-contradictory ("Straight or
  Tapered 1.5 optional") on a dual-crown-only chassis; prior session modeled straight-dc by
  inference, not by reading a clean confirmed value. Real defect, not a missing-weight gap
  — needs a second source (e.g. a distributor spec sheet) to resolve, not this session's
  scope.
- **fk-formula-selva-c-29-170** — desc only claims "interfaces per the family page" with no
  quoted per-config table for this exact 170mm/Extended point; too thin to promote.
- **fk-fox-podium-29-{170,160}** — the fetched ridefox.com product JSON never states wheel
  size; 29in is press-inferred only. Wheel size is a core interface field (bar item 1 has
  no exceptions) — stays unverified until a Fox page states it.
- **fk-fox-36-sl-performance-elite-29-140, fk-fox-36-sl-performance-29-140** — both
  products' own Shopify tags read "200/230" rotor while every 36 SL Factory sibling tags
  "180/203" on the same chassis; prior session judgment-called 180/203 but flagged it
  explicitly NOT VERIFIED given the raw-page contradiction.
- **fk-rockshox-recon-silver-rl-275-130, fk-rockshox-revelation-rc-275-130** — both
  rows explicitly self-declare "not independently fetched this session" (interfaces
  reused from a 29in sibling without a dedicated rockshox.com/sram.com fetch for the
  27.5in SKU). Left as-is; a real RockShox fetch would likely clear both quickly but
  wasn't attempted this session (time budget).

These 11 rows remain `Pending`/`Failed` in the job state — no fabricated promotions.

## Not yet reached this session (39 pending rows with no prior `source`/`lastChecked` at all)

These need fresh research from scratch (no prior desc/source to build on) — deferred to a
follow-up batch given session scope. Brand breakdown of the untouched set: RockShox
(Reckon/Recon Silver/Yari/Revelation/35 Gold/Judy/SID Base/Lyrik Select — mostly
travel-point gap-fills of already-catalogued chassis), Fox (36/38/34 Performance &
Rhythm & Performance-Elite gap-fills, Rhythm 170, 34-rythm typo-id), SR Suntour
(XCE/XCT/XCM entry XC forks), Giant (STL34/Crest34/SXC32 x2), Manitou Circus Expert x2
(BMX/DJ 26in), Marzocchi Bomber Z2 Air Rail. Most look like same-chassis travel-point
gap-fills that should promote quickly under the same fork exception once a manufacturer
page is fetched per family — good next-session starting point.
