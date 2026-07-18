# Road catalog grind — progress log (branch catalog/road-1)

Status: **PARTIAL PASS, session-budget-limited.** One build+commit cycle delivered
`data/road.js` (108 rows) covering frames, forks, wheels, tires, four SRAM road
groupsets, three Shimano road groupsets, cockpit, seatpost/saddle/BB/pedals — disc-only
per ROAD-MODEL.md's v1 recommendation. This is a foundational first wave, not the full
250-350 row target; continuing waves should pick up the gap list below.

## What's in data/road.js (108 rows)

- **Frames (14):** Specialized S-Works Tarmac SL8 + Tarmac SL8 (both VERIFIED — fetched
  specialized.com product pages), Specialized Roubaix Expert, Allez; Trek Émonda SLR,
  Domane SLR, Madone SLR; Canyon Ultimate CF SLX, Endurace CF SLX, Aeroad CFR;
  Cannondale SuperSix EVO, Synapse; Giant TCR Advanced SL, Defy Advanced.
- **Forks (10):** one rigid fork per frame family above (Cannondale/Giant share one
  fork family each; a couple of frame families don't yet have a matching fork row —
  gap).
- **Wheels (12 rows = 6 wheelsets):** Zipp 303 Firecrest (VERIFIED — fetched
  sram.com/en/zipp/models/wh-303-ftld-a1), Zipp 404 Firecrest, DT Swiss ARC 1100
  DICUT, Roval Rapide CLX II, HUNT 36/48 Aerodynamicist, Shimano Dura-Ace
  WH-R9270-C50.
- **Tires (10):** Continental GP5000 S TR 25/28/32c (all three VERIFIED — fetched
  continental-tires.com product page + corroborating spec-sheet weights), Vittoria
  Corsa Pro TLR, Pirelli P Zero Race, Schwalbe Pro One TLE, Goodyear Eagle F1 R —
  2 widths each.
- **Groupsets (42 rows = 7 tiers x 6):** SRAM RED AXS, Force AXS, Rival AXS (all 2x12
  wireless), SRAM Apex (1x12 mechanical/XPLR rear mech), Shimano Dura-Ace R9200,
  Ultegra R8100, 105 R7100 (all 2x12 Di2). Each tier: shifter pair, rear derailleur,
  cassette, chain, crankset, brake caliper pair (+ 2 rotors). SRAM Force AXS shifter
  and Shimano 105 rear derailleur rows are VERIFIED off fetched sram.com /
  productinfo.shimano.com pages (interface facts only — see per-row notes; component
  weights are sample, per Shimano's no-published-weights policy noted in CLAUDE.md).
- **Cockpit (6):** Zipp SL-70 Aero/SL Sprint, Deda Superzero/Zero100, Ritchey WCS
  Streem II/C260.
- **Seatpost/saddle/BB/pedals (10):** Zipp SL Speed, two proprietary posts (Specialized
  Tarmac, Canyon VCLS), Fizik Antares Versus Evo, Selle Italia SLR Boost, three BBs
  (Shimano BSA-road, Praxis T47, SRAM DUB BB86), two pedals (Shimano PD-R550, Look Keo
  Blade Carbon).

## Verified count: 9 rows

Zipp 303 Firecrest front+rear (2), Continental GP5000 S TR x3 widths (3), Specialized
S-Works Tarmac SL8 + Tarmac SL8 frames (2), SRAM Force AXS shifter (1), Shimano 105
rear derailleur — via the productinfo.shimano.com C-455 compatibility chart (1). All
carry a real fetched-page source URL + 2026-07-17 lastChecked; every note discloses
where a figure (e.g. a per-wheel weight split, a component weight not itemized on the
fetched page) required a disclosed non-fetched estimate rather than overclaiming.

## Walls / brands not attempted this pass

- **Campagnolo** (Ekar/Chorus/Record, N3W freehub) — ROAD-MODEL.md flags
  campagnolo.com as unprobed; not attempted this session.
- **GRX** (Shimano gravel-crossover groupset) — out of scope, road-only pass.
- **Michelin, Specialized tires** — known walls per CLAUDE.md tire-batch history; not
  attempted.
- **Enve, PRO, FSA cockpit/wheel lines** — not attempted (time).
- **Headset category** — no road frame's S.H.I.S. codes were fetched, so no headset
  rows were added; every frame omits `headTubeUpper`/`headTubeLower`.

## Tooling / process gaps flagged (not fixed this pass)

- **No `src/schema-road.js` validator exists.** `data/road.js` was hand-built to mirror
  `ROAD-MODEL.md` section 3 field-by-field, but nothing automatically checks it (unlike
  `data/bmx.js` + `src/schema-bmx.js`). This is the most important follow-up before the
  next big grind wave — self-discipline alone won't scale past ~100 rows.
- `ROAD-MODEL.md`'s `bbShellRoad` vocab draft (§4) is missing `bb90-road`, `bb30a`,
  `pf86` — real shell tokens needed for the Trek/Cannondale/Giant frames added here.
  Logged in `data/road.js`'s trailing comment block; not widened solo per the brief.

## Gates run this pass

`node validate.js`, `npm test`, `npx tsc --noEmit` — all run after the commit below;
`data/road.js` is loaded by nothing (no script tag, no test import, no validator
wired to it yet), so none of the three should be affected by this file's presence.
