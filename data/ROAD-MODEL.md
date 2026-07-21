# ROAD-MODEL.md — Road bike data model (OFF-LIVE research + design doc)

**Status: OFF-LIVE, DESIGN ROUND.** Research + design for a future **BuildMyRoadBike** page
(name UNCONFIRMED — see DECISIONS-FOR-DOUGLAS). Nothing here is wired into the live app;
nothing ships until Douglas's go-live word. **No e-bikes** — every e-road model (Creo,
Domane+, Synapse NEO, Gain, Addict eRIDE, …) is excluded; only acoustic trims are
candidates. **No pop-ups.** Read alongside `ROAD-GRAVEL-SHARED-STANDARDS.md` (the shared
layer) and `ROAD-GRAVEL-COMPAT-ANALYSIS.md` (the rule set + architecture).

Date: 2026-07-17.

---

## 1. Domain overview

A road bike is a **drop-bar, rigid, narrow-tire** bike. Two practical eras coexist in the
market and set the scope question:

- **Modern disc road** (the design centre): thru-axle 12×100/12×142, **flat-mount** disc
  brakes, tapered steerer, 700c wheels, 28–32 mm tires, 2× (or increasingly 1×) 12-speed
  electronic or mechanical groupsets. This is where every current groupset, wheel, and
  frame lives, and where the compat engine earns its keep (freehub vs cassette, flat-mount
  vs frame, FD capacity, thru-axle match).
- **Rim-brake road** (legacy tail): dual-pivot caliper brakes, QR wheels (9×100/10×130),
  often straight 1-1/8 steerer, rim-brake-specific wheels. Mechanically a parallel world
  for the brake/axle/wheel axes. **Scope decision below** — recommend disc-only for v1.

Sub-flavours that are **tags, not new machinery** (all on the road page): *race/aero*,
*endurance/allroad* (Domane, Synapse, Défy — slacker, more clearance), *classic/steel*.
"Allroad" blurs into gravel; the boundary is a `discipline` tag + tire-clearance number,
not an engine difference.

Where road's compat engine earns its keep (all the same rules as gravel, road data ranges):
**freehub body vs cassette** (HG-road / HG-L2 / XDR / N3W — never the MTB tokens),
**flat-mount caliper vs frame/fork**, **thru-axle match**, **front-derailleur 2× capacity**,
**tire vs frame clearance** (tight — 28–35 mm), **tapered steerer vs head tube**,
**BB shell vs crank spindle** (road shell zoo), and the drop-bar-only
**brake/shifter ("brifter") integration** + **rim-brake-vs-disc** axes.

---

## 2. Slot / category set (proposed)

Slots (drop-bar build; `*` = optional, never blocks a "complete" build):

```
frame, fork, frontWheel, rearWheel, frontTire, rearTire,
shifter (=brifter L+R pair), frontDerailleur*, rearDerailleur, cassette, chain, crankset,
bb*, headset*, frontBrake, rearBrake, frontRotor*, rearRotor*,
handlebar, stem, cockpit* (one-piece bar/stem alternative), bartape*,
seatpost, saddle, pedals*
```

Rationale / departures from MTB `SLOTS`:
- **`shifter`** on a drop bar is an integrated brake-lever + shifter ("brifter" / STI /
  ergopower / eTap control). One SKU **per side**; a build takes a L+R pair. The **brake
  lever and the shift mechanism are the same unit**, so brake-hydraulics and shifting are
  bought together — this couples the brake and drivetrain slots in a way MTB never does
  (see rule set). Model as one `shifter` slot holding the pair (like the MTB tire "front &
  rear are one category" convention), or split `shifterLeft`/`shifterRight` — flagged.
- **`frontDerailleur` is OPTIONAL** — 1× road builds have none (mirrors how DJ drops the
  derailleur slot). `rearDerailleur` is required on any geared build.
- **`frontRotor`/`rearRotor` optional** — a rim-brake build has none; on disc builds the
  wheels + rotors interplay exactly like MTB.
- **`cockpit` optional** — the integrated one-piece aero bar/stem alternative to separate
  `handlebar`+`stem`. Picking a `cockpit` fills both roles; the clamp rule is N/A for it.
- **`bb` / `headset` optional single-slot groups** — same treatment as the live MTB catalog
  (their own groups, advisory-info nudge, `buildTotals` skips non-fill bundle slots).
- **`pedals` optional** — road bikes are very often sold without pedals; not a completeness
  blocker (matches MTB).

Groups (for the UI, `GROUPS`-style): Frame · Fork · Wheels · Tires · Drivetrain
(shifter/derailleurs/cassette/chain/crankset/bb) · Brakes (levers-integrated-with-shifter,
calipers, rotors) · Cockpit (bar/stem or cockpit, tape) · Seat (post/saddle) · Pedals.

---

## 3. Category field schema (proposed)

Common identity kit is identical to the MTB catalog (`id, cat, brand, model, price`,
optional `family/gen/modelYear/mfgPn/weight`, provenance trio + `sourceType/weightSource/
archiveUrl/status/supersededBy`, a `discipline` enum-array — here
`road/allroad/aero/endurance/cx` — annotation only, never feeds the engine). Category
fields below; **`src/schema.js` stays the single source of truth** — this is the mapping.

- **frame**: `wheelSizes` (array of `700c`/`650b` — road ~always `['700c']`), `rearAxle`
  (`12x142`/`qr130`), `brakeSystem` (`disc-flat`/`rim-caliper`), `brakeMount` (`flat-mount`
  when disc), `bb` (shell — road vocab §4), `seatpost` (diameter **or** `proprietary`),
  `steerer`/`headTube` (S.H.I.S.-style; tapered near-universal), `maxTire` (mm, sourced —
  activates the clearance rule per-frame), `frontDerailleurMount` (`braze-on`/`band`/`none`
  for 1×-only frames), optional `sizes` map, `frameOnly` (bool).
- **fork**: `wheel`, `axle` (`12x100`/`qr100`), `steerer`, `brakeSystem`+`brakeMount`,
  `maxRotorF` (flat mount caps 140/160 natively — §ANALYSIS rule), `maxTire` (fork-crown
  clearance, sourced), `travel` (0 = rigid — a road fork is always 0; the field exists so
  the shared engine treats road/gravel forks uniformly).
- **frontWheel / rearWheel**: `wheel`, `hub` (axle spec), `freehub` (rear — `hg-road`/
  `hg-l2`/`xdr`/`n3w`/`micro-spline-road`; **never** the MTB tokens), `brakeSystem`
  (`disc`/`rim`), `rotorMount` (`center-lock`/`6-bolt` when disc), `intWidth`, `maxTire`,
  `minTire` (optional, rule-14c shape).
- **tire**: `wheel`, `width` (mm — note road is **mm**, MTB is inches; the shared engine
  must know the unit per discipline), optional `casing`/`compound`, `tubeless` (bool).
- **shifter (brifter)**: `system` (§4), `speeds`, `actuation` (`mechanical`/`di2-wired`/
  `axs-wireless`), `brakeSystem` (`disc-hydraulic`/`disc-mechanical`/`rim`), `side`
  (`left`/`right`/`pair`), `frontShift` (bool — a 1× right-only control exists).
- **frontDerailleur**: `system`, `speeds`, `actuation`, `mount` (`braze-on`/`band`),
  `maxChainringDiff`/`capacity` (teeth — the 2× capacity rule).
- **rearDerailleur**: `system`, `speeds`, `actuation`, `maxCog`, `cage` (`short`/`medium`/
  `long`/`xplr`/`mullet`), `mount` (`std-hanger`/`udh-fullmount` — SRAM XPLR 13sp needs UDH
  full-mount, fetched).
- **cassette**: `system`, `speeds`, `freehub`, `minCog`, `maxCog` (road small cogs go to
  **10T** on XDR/N3W/MSR, **11T** on HG — the validator's HG 11T floor is road-correct).
- **chain**: `system` (incl. SRAM `flattop` as a compatibility token — Flattop chains are a
  distinct width and only pair with AXS road, fetched), `speeds`.
- **crankset**: `bb` (spindle interface — `dub`/`dub-wide`/`24mm-road`/`30mm`), `chainrings`
  (`1x`/`2x` + tooth pair, display), `ringStd` (nullable), `speeds`, `chainline` (display).
- **bb**: `shell` (frame standard — road vocab), `spindle` (crank interface). Same rule-7
  exact-match pair as MTB.
- **headset**: `upper`/`lower` (S.H.I.S.), `steerer`. Complete headsets only (MTB rule).
- **brake** (caliper): `brakeSystem` (`disc-flat`/`rim-caliper`), `mount` (`flat-mount`),
  `pistons` (disc), `actuation` (`hydraulic`/`mechanical`), `leverPair` (the brifter it's
  bundled/compatible with — brifter integration rule).
- **rotor**: `size` (140/160 typical on road — flat-mount cap), `mount` (`center-lock`/
  `6-bolt`).
- **handlebar**: `clamp` (`31.8`/`35`), `reach`/`drop`/`width` (display), `dropBar` (bool —
  always true here).
- **stem**: `clamp` (matches bar), `steerer` (`1-1/8`), dims.
- **cockpit** (one-piece): `steerer`, `width`/`reach`/`drop` (display), `integrated:true` —
  fills bar+stem; no clamp axis.
- **seatpost**: `diameter` (`27.2`/`30.9`/`31.6`) **or** `proprietary:true`+`forFrames`
  (aero/D-shape lock), `setback` (display).
- **saddle / bartape / pedals**: common fields; pedals `style` (`road-clip`/`spd`) is
  display-only (a cleat/shoe choice, not a bike-fit rule).

---

## 4. Vocab draft (road; the split-from-MTB tokens are the point)

```js
// SHARED road+gravel vocab (drafted here; gravel adds 650b + wide cassettes)
wheelRG:     ['700c', '650b']                              // NOT 29/275/26/24
freehubRG:   ['hg-road', 'hg-l2', 'micro-spline-road',     // Shimano road/GRX
              'xdr', 'n3w', 'campag-11']                   // SRAM road / Campagnolo
brakeSystem: ['disc-flat', 'disc-post', 'rim-caliper']     // disc-post = rare/legacy gravel
brakeMountRG:['flat-mount', 'post-mount']                  // road/gravel = flat; NOT PM/FM disc tokens' meaning
rearAxleRG:  ['12x142', 'qr130', 'qr135']                  // qr = rim-brake legacy tail
frontAxleRG: ['12x100', 'qr100']
steererRG:   ['tapered', 'straight-1-1-8']                 // tapered near-universal; straight = legacy
systemRoad:  ['shimano-road-12', 'shimano-road-11',        // 105/Ultegra/DA R7100/R8100/R9200; older 11sp
              'shimano-grx-12', 'shimano-grx-11',           // GRX RX820/RX610 (12), RX810/RX600 (11)
              'sram-axs-road', 'sram-xplr-12', 'sram-xplr-13', // Rival/Force/RED AXS; XPLR 12sp & E1 13sp
              'sram-apex-mech-12',                          // Apex 1x12 mechanical
              'campag-ekar-13', 'campag-12', 'campag-11']   // Ekar; Chorus/Record/SR
actuationRG: ['mechanical', 'di2-wired', 'axs-wireless']   // road SPLITS electronic into wired/wireless
chainStd:    ['hg', 'flattop', 'campag']                   // SRAM Flattop is its own width (fetched)
bbShellRoad: ['bsa-road', 'bb86', 'bb386evo', 'bbright', 'pf30', 't47-road', 'italian',
              'bb90-road', 'bb30a']                    // ADDED 2026-07-17 (road-2 wave):
                                                          // bb90-road = Trek bearing-in-frame shell (NOT
                                                          // the MTB PF92/BB92 tokens - different width/seat);
                                                          // bb30a = Cannondale's asymmetric 30mm-spindle
                                                          // press-fit (NOT interchangeable with a generic BB30).
                                                          // Real tokens used by wave-1's Trek/Cannondale
                                                          // frame rows; now wired into src/schema-road.js's
                                                          // bbShellRoad vocab too.
                                                          // RETIRED 2026-07-21: 'pf86' (Shimano-style road
                                                          // press-fit, 86.5mm) — turned out to be the SAME
                                                          // physical shell as 'bb86', just a different spelling
                                                          // (Shimano's own SM-BB72-41B page and SRAM's own
                                                          // BB-DUB-PF-A1 page both describe "86.5mm press-fit"
                                                          // under their respective tags). Merged into 'bb86'.
crankBbRoad: ['dub', 'dub-wide', '24mm-road', '30mm']
seatpostDiaRG:['27.2', '30.9', '31.6']                     // + proprietary flag for aero/D-shape
clampRG:     ['31.8', '35']
```

**Discipline of the split:** every token above whose meaning differs from an existing MTB
token gets a **new value** — never a reused MTB token (the BMX-engine discipline: reusing an
MTB token that means something else is a false-green generator). The most load-bearing split
is `freehubRG` vs the MTB `freehub` (`src/schema.js:88`). BB-shell values (`bb86` etc.)
should be **added per fetched frame page**, exactly as the MTB `frameBb` vocab grew — start
with the shells the starter brands actually publish, not a speculative superset.

---

## 5. Starter-catalog shape + fetchability map

Same shape as the MTB catalog: rows are **fit-distinct, purchasable SKUs**
(`tools/DATA-ENTRY-TEMPLATE.md` policy applies verbatim — one row per engine-read-field
difference; carbon-vs-alloy = both rows; trims = rows; generations = new ids). Enter real
products as **unverified sample** rows from any credible source; earn `verified:true` only
from a **fetched** manufacturer page (the catalog's two-tier rule).

**Groupsets (the compat backbone — get these right first):**

| Brand family | Clean specs? | Fetchability (this session's probe) |
|---|---|---|
| **SRAM AXS road (Rival/Force/RED) + XPLR** | ✅ excellent — SRAM model pages + support articles publish weights, cassettes, freehub, cross-compat | ✅ **support.sram.com fetched clean via Exa** (XPLR 12/13sp split, road cross-compat). `sram.com/en/sram/models/<slug>` is the per-part weight source (MTB lesson). WebFetch 403s SRAM → use **Exa**. |
| **Shimano 12sp road (105 R7100 / Ultegra R8100 / Dura-Ace R9200) + GRX (RX820/RX610)** | ⚠️ interfaces yes, **component weights NO** (Shimano policy — MTB lesson) | ⚠️ `bike.shimano.com` article body is JS-walled (WebFetch 403; Exa returns nav only, but **Exa *highlights* surfaced the full freehub table**). **`productinfo.shimano.com` C-charts + the [2025-2026 Compatibility PDF] fetch** (MTB lesson holds). Weights → `sourceType:'measured'` third-party per the measured-weight policy. |
| **Campagnolo Ekar (N3W) + Chorus/Record** | ✅ campagnolo.com publishes sprocket/spec pages | ⚠️ campagnolo.com not probed this session; N3W interface facts fetched from a reputable third-party teardown (Bikerumor). Probe campagnolo.com in the build pass. |

**Frames (start with brands that publish clean geo + clearance + axle + BB):**

| Brand | Why a good starter | Fetchability |
|---|---|---|
| **Specialized** (Tarmac SL8, Roubaix, Allez, Crux/Diverge for the gravel doc) | Publishes tire clearance, axle, BB explicitly | ✅ **specialized.com product pages fetched clean via Exa** this session (Crux "47c/650b×2.1"). Bright Data is the known fallback for Specialized (MTB memory). |
| **Trek** (Émonda, Madone, Domane) | Publishes clearance ("up to Xmm as measured"), geo | ✅ **trekbikes.com FAQ fetched via Exa** (Checkpoint 50 mm). |
| **Canyon** (Ultimate, Endurace, Aeroad) | Full geo/spec, consumer-direct | ⚠️ probe; consumer-direct sites sometimes JS-heavy. |
| **Cannondale** (SuperSix, Synapse) | Clean spec tables | ⚠️ probe. |
| **Giant/Liv** (TCR, Defy, Propel) | Clean spec tables | ⚠️ probe (MTB catalog has Liv depth precedent). |

**Wheels:** DT Swiss, Zipp (SRAM — clean pages), Roval (Specialized), Shimano, Campagnolo,
Enve, HUNT — all publish freehub options + int-width; DT Swiss/Zipp fetch well (MTB lesson).
**Tires:** Continental (GP5000), Pirelli (P Zero), Vittoria, Schwalbe, Goodyear, Michelin —
same brands + same fetch behavior as the MTB tire batch (Michelin/Specialized were the
retry-queue walls; use Bright Data). **Cockpit/finishing:** the groupset + wheel + tire
brands plus Deda, FSA, Ritchey, Zipp, PRO.

Fetch doctrine (from memory / VERIFY-PROTOCOL.md): **WebFetch → Exa → Bright Data.** This
session confirmed WebFetch 403s Shimano *and* SRAM, while **Exa cleared both** (SRAM article
bodies fully; Shimano via highlights) — so Exa is the workhorse for the groupset pass, Bright
Data reserved for the hard walls (Specialized product images, Michelin).

---

## 6. DECISIONS-FOR-DOUGLAS (road)

1. **Page name** — "BuildMyRoadBike" is a **placeholder**; confirm or rename (gravel's
   "BuildMyGravelBike" is decided; road's is not — kickoff brief).
2. **Rim-brake road: in or out for v1?** Recommend **disc-only v1** (matches gravel, ~halves
   the brake/axle/wheel vocab); add rim brake as a sourced follow-up. Big scope lever.
3. **Brifter slot: one `shifter` holding the L+R pair, or split `shifterLeft`/
   `shifterRight`?** Recommend **one paired slot** (simpler; matches how tires are one
   category). Split only if buyers genuinely mix (they don't, for brifters).
4. **Electronic actuation granularity.** Road splits electronic into **Di2-wired vs
   AXS-wireless** — a real cross-compat fact (a Di2 lever can't drive an AXS mech). Confirm
   modelling `actuation:['mechanical','di2-wired','axs-wireless']` rather than the MTB
   `['cable','electronic']`. Recommend yes.
5. **Integrated cockpit** as its own `cockpit` category, or a `handlebar` with
   `integrated:true`? Recommend a distinct `cockpit` slot (cleaner clamp-rule N/A).
6. **Campagnolo road depth** (Chorus/Record/SR + Campag-11 freehub) now, or Ekar-first?
   (Shared decision #4 — recommend Ekar-first.)
7. **Tubular / tubeless / clincher** as a real axis or display-only? Recommend **display-
   only** (`tubeless:bool`) — tire-to-rim tech rarely produces a hard "won't fit" at the
   catalog level, and a wrong one would be worse than none (the bar).
