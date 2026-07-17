# GRAVEL-MODEL.md — Gravel bike data model (OFF-LIVE research + design doc)

**Status: OFF-LIVE, DESIGN ROUND.** Research + design for the future **BuildMyGravelBike**
page (name DECIDED by Douglas 2026-07-17). Nothing here is wired into the live app; nothing
ships until Douglas's go-live word. **No e-bikes** — every e-gravel model (Creo 2, Grail:ON,
Checkpoint+, Grade e, Revolt E+, …) is excluded; only acoustic trims are candidates.
**No pop-ups.** Read alongside `ROAD-GRAVEL-SHARED-STANDARDS.md`, `ROAD-MODEL.md` (this doc
inherits its category schema and only documents the deltas), and
`ROAD-GRAVEL-COMPAT-ANALYSIS.md`.

Date: 2026-07-17.

---

## 1. Domain overview — gravel = road + clearance (+ often 1×)

A gravel bike is a **drop-bar disc bike built around a wider tire and a wider gear range.**
Mechanically it is a road bike (§`ROAD-MODEL.md`) with five data-level differences, none of
which is a new rule family:

1. **Tire clearance is big and it's the headline spec.** Manufacturer-published maxes,
   fetched this session:
   - Specialized **Crux**: *"47c / 650b × 2.1" tire clearance"*
     ([specialized.com](https://www.specialized.com/us/en/crux-frameset/p/205814)).
   - Trek **Checkpoint SL Gen 3**: *"can now fit up to 50 mm gravel tires (as measured)"*
     ([trekbikes.com FAQ](https://www.trekbikes.com/us/en_US/FAQ/checkpoint-sl-gen3/)).
   - 3T **Exploro** ("GravelPlus"): 700c road/cross **and** 650b MTB tires up to **2.1"
     (54 mm)** ([3T Exploro leaflet PDF](https://company.3t.bike/wp-content/uploads/2018/08/3T-Exploro-leaflet.pdf)).
2. **Two wheel sizes.** 700c (fast/mixed) **or** 650b (max-volume, keeps rollout close to a
   700c — the GravelPlus idea). A frame commonly supports *both*; a build must run a matched
   pair. Same "fits one of the frame's wheel sizes" rule as MTB mullet/wheelConfig, over the
   `['700c','650b']` vocab.
3. **1× is common** (GRX 1×12, SRAM XPLR 1×12/13, Campagnolo Ekar 1×13). The
   front-derailleur slot is simply empty → the FD-capacity rule doesn't fire (the DJ-drops-
   the-derailleur pattern).
4. **Suspension forks & droppers appear** (both rare on road, real on gravel).
5. **Flared drop bars** are the norm (wider drops, more control off-road) — a display dim,
   not a fit axis.

Everything else — flat-mount brakes, 12×100/12×142 thru-axles, tapered steerer, freehub
bodies, BB shells, brifter integration — is **identical to the road model** and served by
the same engine + vocab.

---

## 2. Slot / category set — the road set, with these deltas

Inherits `ROAD-MODEL.md` §2 wholesale. Deltas:

- **`dropper` optional slot ADDED** (gravel-specific short-travel droppers are a real
  segment — e.g. dropper-equipped Checkpoint/Grizl builds). Road left it out; gravel keeps
  it optional (never a completeness blocker). Same diameter rule as MTB rule 13/13c.
- **`fork.travel` genuinely used** — a small suspension-fork tail (RockShox Rudy Ultimate
  XPLR ~30–40 mm, Fox 32 Taper-Cast, Cannondale Lefty Oliver). The fork is the same
  category; `travel > 0` just flips a "suspension gravel fork" annotation. A fork-travel-vs-
  frame rule is **[MECHANIC REVIEW]** and almost certainly dormant (gravel frames rarely
  publish a rated max for a suspension fork) — a missing rule beats a wrong one.
- **`frontDerailleur` even more often empty** (1× prevalence) — no schema change, just data.
- **Bar `flare` dimension** (degrees) added to `handlebar` — display-only.

No new *slots* beyond the optional dropper; gravel is the road slot set with different data.

---

## 3. Category field deltas vs the road schema

Only the fields that differ from `ROAD-MODEL.md` §3:

- **frame**: `wheelSizes` commonly `['700c','650b']` (road was `['700c']`); `maxTire` values
  are large (40–57 mm) and often **per wheel size** (e.g. 45 mm @700c / 2.1" @650b) — model
  as `maxTire` + optional `maxTire650b`, or a `maxTireByWheel` map. Add `dropperReady`
  (bool, if a maker states internal dropper routing — optional/annotation).
- **cassette**: wide-range small-cog-**10T** ranges dominate — 10-44 / 10-46 (SRAM XPLR
  12sp), 10-46 (XPLR 13sp), 10-45 / 10-51 (GRX 1×12 on Micro Spline Road), 9-36 / 9-42 /
  10-44 (Campagnolo Ekar on N3W — **9-tooth** small cog is Ekar-only). The `minCog` vocab
  must allow **9 and 10** (road HG floor was 11). Fetched ranges:
  - SRAM XPLR RDs: 10-36 / 10-44 / 11-44 (12sp) or **10-46 only** (13sp E1)
    ([support.sram.com XPLR](https://support.sram.com/hc/en-us/articles/6014226075035-Are-SRAM-XPLR-eTap-AXS-parts-compatible-with-other-SRAM-components)).
  - Campagnolo Ekar: 9-36 / 9-42 / 10-44 ([Bikerumor N3W](https://bikerumor.com/campagnolo-n3w-in-detail-how-campys-new-freehub-body-fits-all-10-13-speed-cassettes/)).
- **rearDerailleur**: gravel is where SRAM's **full-mount / UDH** requirement bites — the
  13-speed Rival/Force/RED XPLR E1 RDs are **UDH full-mount, 13-speed, 10-46-only** (fetched,
  same SRAM XPLR article). This is a real cross-rule: a 13sp XPLR RD needs a UDH frame (the
  exact shape of the live MTB "SRAM Transmission needs UDH" rule 4).
- **fork**: `travel` (0–40 mm, mostly 0), `suspension` (`rigid`/`suspension`) annotation.
- **dropper**: `diameter`, `drop` (short — 50–100 mm typical on gravel), `actuation`.
- **handlebar**: `flare` (degrees), `dropWidth`/`hoodWidth` (display).

---

## 4. Vocab draft — the road vocab plus these additions

Everything in `ROAD-MODEL.md` §4, plus:

```js
// wheelRG already includes '650b' — gravel is why it's there
minCogRG:    [9, 10, 11]                    // 9 = Ekar-only; 10 = XDR/N3W/MSR; 11 = HG road
systemGravel (subset of systemRoad, tagged discipline:'gravel'):
  'shimano-grx-12', 'shimano-grx-11', 'sram-xplr-12', 'sram-xplr-13',
  'sram-apex-mech-12', 'campag-ekar-13'
forkSuspRG:  ['rigid', 'suspension']        // suspension = the small XPLR/TC fork tail
dropperGravel: reuse the MTB dropper vocab (diameter/drop) — no new tokens
barFlare:    number (degrees, display)
```

Note the **`micro-spline-road` freehub** carries real weight on the gravel page: GRX 1×12
lives on it and shares MTB cassettes (10-45/10-51), while GRX 2×12 uses the HG road body —
so a single "GRX" badge spans **two freehub bodies** depending on 1× vs 2×. The engine keys
on the part's actual `freehub`/`cassette` fields, never the badge (the MTB "map wording →
vocab, not marketing" discipline).

---

## 5. Starter-catalog shape + fetchability map

Inherits `ROAD-MODEL.md` §5. Gravel-specific starter notes:

**Groupsets** — the gravel backbone is exactly the three road families in their gravel guise:
- **Shimano GRX** (RX820 1×12 / RX610 12×2, RX810/RX600 11sp) — interfaces fetchable
  (`productinfo.shimano.com` + the Compatibility PDF), weights via measured third-party.
- **SRAM XPLR / Apex / Rival-Force-RED AXS** — **fetched clean via Exa** this session; the
  12sp-vs-13sp XPLR split and the UDH-full-mount 13sp fact are the load-bearing cross-rules.
- **Campagnolo Ekar (N3W)** — interface facts fetched (Bikerumor teardown); probe
  campagnolo.com for weights/prices in the build pass.

**Frames** — brands that publish clearance + axle + BB cleanly (all fetched or
fetch-friendly this session): **Specialized** Crux/Diverge (47c/650b×2.1", Exa-clean),
**Trek** Checkpoint (50 mm, Exa-clean), **3T** Exploro/Extrema (GravelPlus 2.1", PDF-clean),
**Canyon** Grail/Grizl, **Cannondale** Topstone (+Lefty/Kingpin), **Giant** Revolt, **Salsa**
(Cutthroat/Warbird — MTB catalog already has Salsa depth), **Santa Cruz** Stigmata, **Open**
(U.P./WI.DE — GravelPlus originator with 3T). Enter the clearance number as the sourced
`maxTire` that activates the per-frame clearance rule.

**Wheels** — DT Swiss (G-series), Zipp (303/G40), Roval Terra, Enve G-series, HUNT,
Campagnolo Levante/Fulcrum Rapid Red (N3W) — all publish freehub options; DT Swiss/Zipp
fetch well. **Tires** — the gravel arms of the same tire brands (WTB, Panaracer, Continental
Terra, Pirelli Cinturato Gravel, Schwalbe G-One, Maxxis Rambler/Ravager, Goodyear
Connector) — same fetch behaviour as the MTB tire batch.

Fetch doctrine unchanged: **WebFetch → Exa → Bright Data**; Exa is the workhorse (it cleared
SRAM + Shimano this session where WebFetch 403'd both).

---

## 6. DECISIONS-FOR-DOUGLAS (gravel)

1. **650b clearance modelling** — one `maxTire` (mm) plus a `maxTire650b`, or a
   `maxTireByWheel` map? Recommend the **map** (a frame genuinely has two published maxes).
   Cheap either way; flagging so the schema shape is your call.
2. **Suspension gravel forks** — include the small tail (Rudy XPLR, Fox 32 TC, Lefty
   Oliver) in v1, or defer? Recommend **include as rigid-or-suspension data**, but keep any
   fork-travel-vs-frame rule **dormant** (gravel frames rarely publish a rated max — a wrong
   rule is worse than none).
3. **Gravel dropper slot** — confirm the optional `dropper` slot on the gravel page
   (recommended; it's a real and growing segment). Road stays dropper-less.
4. **Cyclocross fold-in** — treat CX as a `discipline:'cx'` tag on the gravel page (tighter
   UCI 33 mm clearance is just a smaller `maxTire`), or leave CX out of v1? (Shared decision
   #5.) Recommend tag-on-gravel.
5. **The 9-tooth cog / Ekar depth** — Ekar's 9T small cog forces `minCog` to allow 9. Model
   Ekar fully in v1 (it's *the* Campagnolo gravel group), or start Shimano+SRAM and add Ekar
   in a second pass? Recommend include Ekar (its N3W/13sp facts are the interesting
   cross-rules and are already fetched).
6. **"Adventure/bikepacking" vs "gravel race" as tags** — worth a `discipline` sub-tag for
   filtering (Cutthroat/Fargo vs Crux/Aspero), or is one "gravel" tag enough for v1?
   Recommend one tag for v1, sub-tags later.
