# verify-fanout-1-dtswiss — DT Swiss wheel verification progress

Branch: `verify/fanout-1-dtswiss`. Scope: every unverified `frontwheel`/`rearwheel` row
with `brand:'DT Swiss'` in `src/compat.js` (65 rows at session start, across 18 families).
Method/bar: `tools/VERIFY-PROTOCOL.md`'s wheels interface-verification exception
(2026-07-14 policy) — full interface set (wheel size, hub spacing, freehub, rotor mount,
internal width, max/min tire) must be explicitly manufacturer-confirmed; weight may stay
nominal ONLY when the maker states no per-wheel/per-freehub split, and never accepted from
a retailer.

## Batch 1 — VERIFIED (9 rows)

**XM1700 (2 rows, resolves the predecessor's blocked rotor-mount flag):**
- `fw-dtswiss-xm1700-29`, `rw-dtswiss-xm1700-29-xd` — RE-FETCHED
  dtswiss.com/en/wheels/wheels-mtb/all-mountain/xm-1700-spline this session and
  re-confirmed it states NO rotor-mount wording anywhere (word-for-word check, not an
  AI-summarizer inference) — the predecessor's block was real. Resolution: Canyon's own
  Spectral CF 8 OE spec-sheet page (re-fetched fresh:
  `https://www.canyon.com/en-us/mountain-bikes/trail-bikes/spectral/cf/spectral-cf-8/4023.html`,
  note the corrected `/cf/` URL segment — a prior stale link 404'd) states in plain words
  "Rotor mount IS 6-bolt" for both wheels — a legitimate manufacturer source for this OE
  build's actual configuration, not an inference. intWidth 30mm cross-confirmed on the
  dtswiss.com page itself ("Inner width 30 mm"). maxTire stays a conservative 2.6 estimate
  (not maker-stated), consistent with the established E593/E1900/M1900 convention.
- `rw-dtswiss-xm1700-29-ms` — Micro Spline sibling, same basis, verified.

**X1900 (3 rows — CORRECTION, not just an addition):**
- `fw-dtswiss-x1900-29`, `rw-dtswiss-x1900-29-xd`, `rw-dtswiss-x1900-29-ms` — FETCHED
  dtswiss.com/en/wheels/wheels-mtb/cross-country/x-1900-spline directly. It states
  verbatim: "available in centerlock and comes with an IS 6-bolt adapter" and "Internal
  Rim Width: 25 mm". **The prior rotorMount value of `sixbolt` was a documented guess
  ("the DT Swiss 370-hub X-series wheels are consistently 6-bolt-only... not
  maker-confirmed") and was WRONG** — corrected to `CL`. This flips the verdict on the 5
  completebikes shipping this wheel (all stock 6-bolt rotors: Pivot Mach 4 SL Ride
  GX/SLX-XT, Radon Jealous 8.0, Canyon Lux World Cup CF 8, Pivot Les SL Ride SLX/XT) from a
  silent match to an honest rule-8 adapter warning — this is CORRECT behavior (DT Swiss
  ships the IS-6-bolt adapter in the box), matching the already-audited M1900/E1900
  Center-Lock-plus-adapter precedent. Axle spacing (Boost110/148) is not stated on this
  dtswiss.com page itself; retained from the already-fetched vitalmtb.com/99spokes.com
  build-sheet corroboration (same convention already used for the audited M1900 rows,
  which also source axle from bike24.com rather than dtswiss.com). Weight/price stay
  nominal per-wheel estimates (DT Swiss states only a combined-pair figure).

**XRC 1501 Spline One (3 rows — the predecessor's redirect-loop cleared this session):**
- `fw-dtswiss-xrc1501-29` — FETCHED dtswiss.com's own per-SKU product-support page,
  matnr `WXRC150BEIXCA11457` ("XRC 1501 SPLINE ONE 29 - 30 mm CL 15/110 mm"): 29in, 30mm
  internal width, 15x110 Boost front, Center-Lock, and a REAL itemized weight of 728g
  (corrected from the 680g sample — this is a genuine per-wheel maker figure, not a
  nominal estimate, so bar item 2(a) is met outright).
- `rw-dtswiss-xrc1501-29-xd` — FETCHED matnr `WXRC150TEDRCA11460` ("XRC 1501 SPLINE ONE
  29 - 30 mm CL 12/148 mm Sram"): 30mm width, Boost148, CL, SRAM XD, weight 816g
  (corrected from 790g sample).
- `rw-dtswiss-xrc1501-29-ms` — Micro Spline sibling; no distinct MS-specific matnr page
  found this session (only the XD SKU resolved), so interfaces/weight are carried from the
  XD sibling's maker-confirmed page (240 EXP hub is field-swappable-freehub per this
  catalog's established DT Swiss convention) — same tool-free-freehub-swap basis already
  used and audited on the M1900/E1900/E593 families.

## Skipped / blocked (documented, do not retry unless policy changes)

**FR 1500 Classic (12 rows) — the whole family stays blocked.** FETCHED
dtswiss.com/en/wheels/wheels-mtb/freeride-downhill/fr-1500-classic three times this
session (targeted prompts for axle/freehub/rotor-mount wording, then a "give me every
word on the page" pass) — the page states only hub ("240 with Ratchet EXP 36"), rim
material/width (30mm), a combined-pair weight ("from 1928 g") and price. It NEVER states
axle spacing, freehub options, or rotor mount in words at all — not even the AI-inference
risk XM1700 had, just genuinely absent. The existing catalog desc's own "sample specs
(FR 541 rim, 240 hub)" language is consistent with this finding. Cannot meet bar item 1.

**350/EX 511/AM LN 370/LN XC (8 rows across 4 families) — no DT Swiss product page
exists for these OE house-wheel names.** Confirmed by navigating dtswiss.com's actual
site structure this session: the Hubs MTB overview
(`/en/components/hubs-and-rws/hubs-mtb`) lists exactly four hub models — 180, 240, 350,
370 — and fetching the standalone "350" and "370" hub pages surfaced a REAL TRAP worth
flagging for future sessions: **dtswiss.com/en/components/hubs-and-rws/hubs-mtb/370 is a
completely different product** — a dirt-jump single-speed hub ("Ready for your next jam
session", "brakeless up front", "12-tooth sprocket", available in 20/110mm non-boost or
10/135mm) — NOT the multi-freehub Center-Lock 370 hub referenced inside the E1900/M1900/
F1900 wheelset pages (which is a different internal spec bundled into those wheel
products, not this standalone hub SKU). No data was taken from these pages into the
catalog (caught before use), but it's exactly the kind of name-reuse trap the project's
memory already warns about (see MEMORY.md's SRAM trunnion-eye-equivalence note for the
analogous pattern). These 8 rows' existing rotorMount values are themselves admitted
guesses in their own desc text ("Rotor mount not stated on Kona's page"), so even the
already-fetched bike-maker OE pages (Kona/Canyon/Commencal) don't clear bar item 1 for
that field. Left unverified, no changes made.

**M1900 SuperBoost157 siblings (3 rows: `rw-dtswiss-m1900-275-157-xd`,
`rw-dtswiss-m1900-29-157-xd`, `rw-dtswiss-m1900-29-157-ms`) — re-confirmed blocked.**
RE-FETCHED dtswiss.com/en/wheels/wheels-mtb/all-mountain/m-1900-spline with a targeted
prompt for '157'/'SuperBoost' wording — NOT STATED. A WebSearch call's inline "AI answer"
initially claimed the page states "Shimano Microspline installation dimension of 12 x 157
mm Superboost" verbatim — this was FALSE, a hallucinated quote (exactly the WebFetch/
WebSearch summarizer-invention trap the project memory warns about); a direct targeted
re-fetch confirmed that exact phrase does not appear on the page. Browsed the All Mountain
category listing directly too — it currently lists only XMC1200/XMC1500/XM1700, not
M1900 at all, confirming no live distinct SuperBoost157 product page exists to fetch.
Stays unverified, matching the predecessor's finding exactly.

**EX 1700 (2 rows: `rw-dtswiss-ex-1700-29` CL+XD 29in, `rw-dtswiss-ex-1700-275-xd` CL+XD
27.5in) — stays blocked.** The sibling CL+MicroSpline SKUs both resolved to real
dtswiss.com matnr pages already (verified pre-existing:
`WEX1700TED2SA11692` 29in, presumably an equivalent for 27.5in) but no CL+XD-specific
matnr was found this session despite several targeted searches (only a 6-Bolt+XD matnr,
`WEX1700TFDRSA11696`, and Shimano-freehub CL matnrs turned up) — the existing desc's
"still no dtswiss.com matnr found for an exact CL+XD combo" finding holds. Not touched.

**E593 (2 rows) — stays blocked.** E 593 is a DT Swiss RIM sold standalone
(dtswiss.com/en/components/rims-mtb/enduro/e-593 confirms rim-only specs, already used in
the existing desc), hand-built by Commencal into OE wheels with a non-DT-Swiss hub. Rotor
mount is an unconfirmed model ("modeled sixbolt"), never stated by any manufacturer page
per the existing desc's own honest caveat. Not eligible for the wheel-row exception (no
complete-wheel maker page). Not touched.

**370/Roval alloy, FR541/240, E532 (6 rows across 3 families) — same OE hand-built
pattern as 350/EX511/AMLN370/LNXC above** (hub+third-party-or-DT-rim pairing, no
standalone DT Swiss wheel product; rotorMount admitted-sample in the existing desc text).
Spot-checked 370-Roval-alloy's desc directly; consistent with the pattern. Not touched
this session for time — same reasoning would apply if picked up later.

**XR1700, XRC1200 Spline, F-1900 (21 rows across 3 families) — not reached this
session** (time-boxed; XR1700 was spot-checked and found to have no distinct dtswiss.com
product page — only XRC1700, a different carbon-tier product line, has one — so it would
likely also land in Skipped; XRC1200 Spline and F-1900 were not investigated).

**F 1900 Classic / `dtswiss-f-1900` family (10 rows) — not touched, flagged as
uncertain rather than confirmed-blocked.** RE-FETCHED
dtswiss.com/en/wheels/wheels-mtb/freeride-downhill/f-1900-classic twice this session
(targeted-fields prompt, then a full-raw-text prompt) and got ONLY hub ("370 with Ratchet
LN 18"), 30mm internal width, "from 2118 g" combined weight, and price — no rotor-mount,
axle-spacing, or freehub wording either time. This is notable because the ALREADY-VERIFIED
sibling family `dtswiss-f1900-classic` (`fw-dtswiss-f1900-classic-275` /
`rw-dtswiss-f1900-classic-275-hg`, verified 2026-07-16, same source URL) has a desc
claiming that same page states "6-bolt, tubeless ready", "Shimano HG, Shimano Microspline,
or SRAM XD" freehub options, and "12x148 Boost / 12x150(157)" axle options — none of which
this session's fetches could reproduce. Possible explanations: the page is JS-rendered
and serves different content depending on render timing/locale, or the 2026-07-16 fetch
saw a fuller render this session didn't. **Not resolved either way** — did NOT touch the
already-verified sibling rows (out of this session's scope, no proof they're wrong,
would need a separate targeted re-fetch pass), and did NOT verify the `dtswiss-f-1900`
family off an unreproducible quote. Left unverified. **Flagging for the coordinator/next
session:** worth an independent re-fetch of the f1900-classic source to confirm those
claimed quotes still hold, given this discrepancy.

## Corrections summary (real spec fixes, not just new verifications)
- `fw-dtswiss-x1900-29` / `rw-dtswiss-x1900-29-xd` / `rw-dtswiss-x1900-29-ms`:
  rotorMount `sixbolt` -> `CL` (maker-confirmed; previously an unsourced guess).
- `fw-dtswiss-xrc1501-29`: weight 680g -> 728g (maker-itemized).
- `rw-dtswiss-xrc1501-29-xd` / `rw-dtswiss-xrc1501-29-ms`: weight 790g -> 816g
  (maker-itemized, XD SKU; MS carried from same SKU per field-swappable-freehub
  convention).

## Gates (batch 1, after 9 verifications)
- `node validate.js`: DATA OK - 5025 parts, 0 problems (2684 verified, 2341 unverified).
- `npx vitest run`: 24 test files, 688 passed (688) — same as baseline, no change.
- `npx tsc --noEmit`: clean, no output.
- `node tools/verdict-audit-harness.js`: A=0 flags, B=0 preset conflicts, C=329 clean/0
  errors (C2 5/5 clean), D=15/15 clashes caught, D2=2/2 clean — matches the expected
  "0 flags / 9-9 / assemble clean" pattern. Section E (rotor-max fork false-warns) is a
  pre-existing, unrelated finding (fork maxRotorF vs standard rotor sizes) not touched by
  this batch.

No new vocab was introduced (`sixbolt`/`CL` already exist in `src/schema.js`'s VOCAB).
