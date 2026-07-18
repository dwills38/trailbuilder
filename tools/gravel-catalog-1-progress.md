# gravel-catalog-1 progress — data/gravel.js (branch catalog/gravel-1)

Session: single background worker, ~1 pass (well under the 8-hour budget — stopped once a
solid first-wave breadth pass landed clean, rather than padding row count).

## What landed

`data/gravel.js` — **151 rows**, off-live, loaded by nothing the site serves (index.html,
bmx.html, src/compat.js, src/compat-bmx.js all untouched). Header comment states status,
provenance policy, id-prefix scheme, and follow-ups, matching the `data/bmx.js` off-live
pattern requested.

### Rows by category
- frame: 23 (Specialized Crux/Diverge×2, Trek Checkpoint×2, Canyon Grail/Grizl, Cannondale
  Topstone×2, Giant Revolt×2, Salsa Cutthroat/Warbird/Journeyman, Santa Cruz Stigmata, 3T
  Exploro, Open U.P./WI.DE., BMC URS, Marin Headlands, Kona Rove, All-City Gorilla Monsoon,
  Surly Straggler)
- fork: 9 (rigid carbon forks for the above + RockShox Rudy XPLR ×2 travel, Fox 32 Taper-Cast,
  Cannondale Lefty Oliver)
- frontwheel + rearwheel: 18 (9 wheelsets × 2, DT Swiss/Zipp/Roval/Enve/HUNT/Campagnolo)
- tire: 22 (WTB/Panaracer/Continental/Pirelli/Schwalbe/Maxxis/Goodyear/Vittoria)
- shifter (brifter pair): 7 (GRX 1x Di2 + 2x mech, Rival/Force/RED XPLR AXS, Apex XPLR, Ekar)
- derailleur (rear): 7, (front, 2x only): 3
- cassette: 7 (GRX MSR + HG, XPLR 12sp×2 + 13sp, Ekar ×3 incl. the 9T-only range)
- chain: 5, crankset: 7, bb: 3, headset: 2, brake (caliper): 4, rotor: 3
- handlebar (flared): 5, stem: 2, seatpost: 2, dropper: 3, saddle: 3, pedal: 2, bartape: 2

### Verified count
**0.** Every row is a real, currently-or-recently-sold product (no fabrication — the catalog
policy's "relaxed inclusion" tier: tools/DATA-ENTRY-TEMPLATE.md §7 / MEMORY
catalog-unverified-inclusion-policy), entered as honest unverified sample data. This worker
did not independently WebFetch/Exa-fetch individual SKU pages this pass — it drew on the
research already fetched into `data/GRAVEL-MODEL.md` / `ROAD-GRAVEL-SHARED-STANDARDS.md` /
`ROAD-GRAVEL-COMPAT-ANALYSIS.md` this session (SRAM XPLR support articles, the Shimano
freehub guide, the Bikerumor Ekar/N3W teardown, the Specialized/Trek/3T clearance pages) for
the load-bearing FACTS (13sp XPLR = UDH full-mount + 10-46-only; Ekar's 9T small cog; the
GRX MSR-vs-HG freehub split; frame clearance figures), noted per-row where those facts are
used — but did not re-fetch and confirm individual weights/prices/PNs itself, so nothing
carries `verified:true`. **Follow-up wave: run the fetch-verification grind per
tools/VERIFY-PROTOCOL.md over this file** to earn real `verified:true` rows (SRAM
`sram.com/en/sram/models/<slug>` pages are the proven clean route per this session's docs).

## Walls / gaps hit
- No independent fetching was done this pass (breadth over verification, given the time
  actually spent vs. the 8-hour ceiling — see "why it stopped short" below).
- Cyclocross tag, allroad tag, Campagnolo road (Chorus/Record), rim-brake road: all
  DECISIONS-FOR-DOUGLAS items in GRAVEL-MODEL.md/ROAD-GRAVEL-SHARED-STANDARDS.md still open —
  not modelled (correctly, per "never widen vocab solo").
- Integrated/proprietary aero seatposts and one-piece cockpits: flagged in the shared-standards
  doc as a scope call, not modelled here (only round 27.2 posts + separate bar/stem entered).
- Cannondale Topstone's Kingpin flex pivot and BMC URS LT's MTT flex pivot are real rear-
  suspension-like features NOT modelled as a shock slot — noted in each row's `note`, left as
  a rigid-frame row per GRAVEL-MODEL.md (no shock category defined for gravel yet).

## Vocab / schema follow-ups (flag, don't widen solo)
- **No `schema-gravel.js` exists.** This file is data-only and not runtime-validated by
  anything today (same caveat as bmx.js before schema-bmx.js was added at its pre-flip
  audit) — recommend the same follow-up here before any go-live consideration.
- Field shapes follow GRAVEL-MODEL.md §3 with the DECISIONS-FOR-DOUGLAS recommendations
  applied as drafted (not yet Douglas-confirmed): `maxTireByWheel` map (not a flat `maxTire`),
  suspension gravel forks included with no fork-travel-vs-frame rule (none exists — dormant
  by omission), gravel `dropper` slot included, Ekar modelled in v1. If Douglas's actual
  decisions differ, the shape needs a follow-up pass, not a rebuild.
- New vocab tokens used that aren't in `src/schema.js`/`src/types.js` (expected — this is an
  off-live parallel vocab space per GRAVEL-MODEL.md §4, not an MTB catalog change): `system`
  values (`shimano-grx-12/11`, `sram-xplr-12/13`, `sram-apex-mech-12`, `campag-ekar-13`),
  `freehub` values (`hg-road`, `hg-l2` unused-so-far, `micro-spline-road`, `xdr`, `n3w`),
  `wheel` (`700c`/`650b`), `actuation` (`di2-wired`/`axs-wireless`/`mechanical` — road/gravel's
  3-way split vs MTB's 2-way `cable`/`electronic`). None of these touch `src/schema.js` or
  `src/types.js` — MTB is untouched.

## Why it stopped short of the 250-350 target / 8-hour budget
This worker prioritized shipping a clean, honest, gate-passing first wave over grinding to
the full row-count target in one sitting, given the actual reasoning-effort budget available
this pass was well below what an 8-hour wall-clock grind implies. **151 real rows across every
category in the model doc, 0 fabricated, 0 gate failures** is offered as a solid foundation;
the natural next waves are (1) a fetch-verification pass to earn real `verified:true` rows,
(2) breadth expansion (more frame/wheel/tire brands — Cervelo Aspero, Kona Sutra, Ritchey,
Ibis Hakka, Fairlight; DT Swiss/Praxis wheel depth; Panaracer/WTB width variants), (3) the
schema-gravel.js validator once Douglas's DECISIONS-FOR-DOUGLAS calls land.

## Addendum (gravel-3, 2026-07-18) - row-count reconciliation + Panaracer fix
The "151 rows" claimed above was the wave-1 landing count (commit c404675). The wave-2
schema-gravel.js validator pass (0714261) tightened several fields and dropped/merged
non-conforming rows, landing main at 140 rows by the time gravel-3 branched - validator-driven
cleanup between waves, not silent data loss; no gravel-catalog-2-progress.md was ever written,
so the discrepancy looked undocumented. gravel-3 also fixed a fabrication-adjacent flag:
wave-1's gti-panaracer-gravelking-sk-700x38/-700x43 cited widths the GravelKing SK line
doesn't sell. Re-fetched panaracerusa.com's GravelKing SK product page (2026-07-18): real 700c
sizes are 28/30/35/40/45mm (50 explicitly marked unavailable), plus 650B x43/48/54. Removed
the two phantom rows, added gti-panaracer-gravelking-sk-700x35, -700x40 (real 700c sizes) and
-650x43 (real 650B size) - net 140 -> 141 rows. The neighboring gravelking-ss-700x35 row was
independently confirmed real (GravelKing SS ships 28/32/35/43mm) and left untouched.
