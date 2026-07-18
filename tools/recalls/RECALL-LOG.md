# Recall Watchdog — RECALL-LOG

Append-only findings ledger. Read [`INDEX.md`](INDEX.md) for the corpus rules (stable IDs,
citation bar, confidence labels) and [`PROTOCOL.md`](PROTOCOL.md) for the sweep methodology
before adding to this file.

---

## Sweep 1 — 2026-07-18 (bootstrap sweep, coordinated by tooling/recall-watchdog-bootstrap)

Scope: US bicycle-industry recalls from the last ~3 years (2023-2026), CPSC.gov + the
majors' own recall pages, cross-referenced against `src/compat.js`, `src/kit.js`,
`data/bmx.js`, `data/road.js`, `data/gravel.js`, `data/striders.js`, `data/emtb.js`. A
handful of pre-2023 recalls are included (tagged `OUTSIDE-WINDOW`) because they hit
model families that are still heavily cataloged and plausibly still on the road/trail.

**Findings summary for the coordinator** (full detail in each `RCL-n` entry below):

| ID | Recall | Catalog confidence | Live/stop-ride? |
|---|---|---|---|
| RCL-1 | Shimano Ultegra/Dura-Ace 11-spd bonded Hollowtech II road cranks | CHECKED, NO MATCH | crash hazard, but no matching SKU cataloged |
| RCL-2 | SRAM 12-spd AXS drop-bar shift-brake levers (aftermarket) | CHECKED, NO MATCH | crash hazard, but not a distinct cataloged SKU |
| RCL-3 | Salsa Cowbell/Cowchipper + Whisky No.9 12F/24F carbon bars (+ Cutthroat/Warbird/Warroad) | **NAME MATCH, GENERATION UNCONFIRMED** (bars) / CHECKED, NO MATCH (frames — wrong model year) | injury hazard |
| RCL-4 | BMC Kaius 01 (fork steerer) | CHECKED, NO MATCH | fall hazard, but Kaius not cataloged (only BMC Twostroke 01 is) |
| RCL-5 | Cannondale Dave (headtube/downtube weld) | CHECKED, NO MATCH | fall/injury hazard, kids bike, not cataloged |
| RCL-6 | Open Cycle U.P./UPPER/WIDE/MIND Ekar (Campagnolo hydraulic rear brake) | **CONDITIONAL** (frames cataloged, brake pairing not schema-tracked) | crash hazard |
| RCL-7 | woom OFF/OFF AIR/ORIGINAL 6 (crank fatigue fracture) | CHECKED, NO MATCH | fall/crash hazard, wrong woom product line (only balance bikes cataloged) |
| RCL-8 | FSA Gossamer Pro AGX+ CK-6037 crankset (Cannondale/Canyon/Marin/Haro/Fuji/Pinarello) | CHECKED, NO MATCH | fall/injury hazard |
| RCL-9 | DT Swiss ERC/CRC/HEC/ARC carbon wheels (ID ≥2740000) | **CONFIRMED MATCH** (2 rows, `data/road.js`) | **crash hazard — live cataloged rows, coordinator decision needed** |
| RCL-10 | Box Components BMX Race Box One Delta stem | CHECKED, NO MATCH | fall hazard, off-live BMX catalog |
| RCL-11 | GT LaBomba (headtube/downtube weld) | CHECKED, NO MATCH | fall/injury hazard |
| RCL-12 | Transition TR11 Alloy chainstay yoke weld (manufacturer notice) | **CONFIRMED MATCH** (frame + complete bike, `src/compat.js`) | **fall/crash hazard — live cataloged rows, coordinator decision needed** |
| RCL-13 | Specialized Tarmac SL7 fork steerer *(OUTSIDE-WINDOW, 2021)* | CHECKED, NO MATCH | fall/injury hazard, Tarmac SL7 not currently cataloged |
| RCL-14 | Santa Cruz/Juliana MY2020 aluminum frames *(OUTSIDE-WINDOW, 2020)* | CHECKED, NO MATCH | fall hazard, wrong model year for every cataloged Santa Cruz/Juliana row |
| RCL-15 | Rocky Mountain Instinct/Instinct BC/Pipeline alloy MY2018-2020 *(OUTSIDE-WINDOW, 2020)* | not cross-referenced this sweep (Rocky Mountain catalog coverage not confirmed) | fall/injury hazard |
| RCL-16 | Trek Promax hydraulic disc brakes (FX/Verve/Dual Sport) | CHECKED, NO MATCH | crash hazard, commuter/hybrid models outside catalog scope |
| RCL-17 | E-bike recalls sweep (Trek FX+/Townie Go!, Specialized Como SL/Globe Haul, Giant Momentum Vida E+, Norco Sight VLT CX, Super73) | CHECKED, NO MATCH | various — none are the specific e-MTB models in `data/emtb.js` |

**Two CONFIRMED MATCH entries on currently-live catalog rows (RCL-9, RCL-12) — flagging to
the coordinator per `PROTOCOL.md` §5.** Neither is acted on here; how a recall should surface
to a user (if at all) is Douglas's parked call.

---

### RCL-1 — Shimano 11-Speed Bonded Hollowtech II Road Cranksets

- **Source:** CPSC.gov, recall #23-294, September 21, 2023.
  https://www.cpsc.gov/Recalls/2023/Shimano-Recalls-Cranksets-for-Bicycles-Due-to-Crash-Hazard
- **Affected:** Shimano Ultegra FC-6800, Ultegra FC-R8000, Dura-Ace FC-9000, Dura-Ace
  FC-R9100, Dura-Ace FC-R9100P — 11-speed bonded Hollowtech II road cranksets manufactured
  **before July 1, 2019**, identified by a two-letter production code (KF through RF, listed
  in full on the CPSC page) stamped on the back of the crank arm. Sold individually and as
  OEM on bikes from other makers (Trek, Specialized named explicitly).
- **Hazard:** bonded crank parts can separate and break — crash hazard. 4,519 incidents,
  6 injuries reported.
- **Remedy:** free inspection at an authorized Shimano dealer; replacement only if bonding
  separation/delamination is found.
- **Catalog cross-reference: CHECKED, NO MATCH.** `src/compat.js` and `data/road.js` were
  grepped for `FC-6800`, `FC-9000`, `FC-R8000`, `FC-R9100` — no hits. This catalog does not
  currently carry these specific Shimano road crankset SKUs under any id.

### RCL-2 — SRAM 12-Speed Shift-Brake Levers (aftermarket)

- **Source:** CPSC.gov, recall #24-103 (Fast Track Recall), February 1, 2024.
  https://www.cpsc.gov/Recalls/2024/SRAM-Recalls-Shift-Brake-Levers-Due-to-Crash-Hazard
- **Affected:** all SRAM 12-speed shift-brake levers (Apex AXS, Rival eTap AXS, Force eTap
  AXS, Red eTap AXS — black hoods) **sold separately as upgrade/replacement kits**, June 2019
  through October 2023. Explicitly **excludes** levers installed by a dealer on a complete
  new bike.
- **Hazard:** clamp bolt can loosen — crash hazard. No injuries reported.
- **Remedy:** free inspection/tightening or clamp-bolt replacement at an authorized SRAM
  dealer.
- **Catalog cross-reference: CHECKED, NO MATCH.** This catalog's SRAM AXS shifter rows
  (`src/compat.js`) model the shared AXS Pod Controller used across MTB Eagle/Transmission
  tiers, not the road/gravel drop-bar shift-brake lever family this recall targets, and no
  distinct drop-bar-lever SKU rows exist in `data/road.js` or `data/gravel.js` to check
  against. Nothing to flag.

### RCL-3 — Salsa Cowbell/Cowchipper + Whisky No.9 12F/24F Carbon Handlebars (+ Cutthroat/Warbird/Warroad)

- **Source:** CPSC.gov, recall #23-086 (Fast Track Recall), January 5, 2023.
  https://www.cpsc.gov/Recalls/2023/Quality-Bicycle-Products-Recalls-Carbon-Handlebars-and-Bicycles-Due-to-Injury-Hazard
- **Affected:** Salsa Cowchipper, Salsa Cowbell, Whisky No.9 12F, and Whisky No.9 24F
  **carbon** handlebars, sold individually Jan 2018–Aug 2022, and sold as OEM on Salsa
  Cutthroat, Warbird, and Warroad complete bikes Aug 2018–June 2022.
- **Hazard:** handlebar can crack where the brake/shift levers clamp — injury hazard. 37
  reports of cracking/fracturing, no injuries.
- **Remedy:** free replacement carbon or aluminum handlebar at a local bike retailer.
- **Catalog cross-reference:**
  - **Handlebars — NAME MATCH, GENERATION UNCONFIRMED.** `data/gravel.js` carries
    `ghb-salsa-cowbell-318` (Salsa Cowbell, 31.8 clamp) and `ghb-salsa-cowchipper-318`
    (Salsa Cowchipper, 31.8 clamp). Neither row carries a `modelYear` or material field, so
    it can't be confirmed from catalog data whether these are the same recalled
    2018–2022 carbon run or a current (post-recall-remedy) aluminum/carbon SKU. Needs a
    manual check against Salsa's current product pages before this can be upgraded to
    CONFIRMED or downgraded to CHECKED-CLEAR.
  - **Frames — CHECKED, NO MATCH.** `data/gravel.js` carries `gfr-salsa-cutthroat-carbon`
    and `gfr-salsa-warbird-carbon`, both `modelYear: 2024` — outside the recalled
    Aug 2018–June 2022 sales window, so these are a later, unaffected generation.
  - Whisky No.9 12F/24F specifically: `data/gravel.js` carries a Whisky No.9 CX **fork**
    (`gfk-whiskyparts-no9-cx`), a different product (fork, not the recalled handlebars) —
    no match.

### RCL-4 — BMC Kaius 01 Bicycles and Framesets

- **Source:** CPSC.gov, recall #25-177 (Fast Track Recall), March 13, 2025.
  https://www.cpsc.gov/Recalls/2025/BMC-Recalls-Kaius-01-Bicycles-and-Framesets-Due-to-Fall-Hazard
- **Affected:** all BMC-branded Kaius 01 bicycles and framesets with a **V5 fork**, sold
  July 2022–February 2025 (2023, 2024, and 2026 model years pictured on the recall page).
- **Hazard:** fork steerer tube can crack, break, or separate — fall hazard. 2 reports, no
  injuries.
- **Remedy:** free fork inspection and replacement at an authorized BMC dealer.
- **Catalog cross-reference: CHECKED, NO MATCH.** BMC is cataloged (`fr-bmc-twostroke-01`,
  an XC hardtail, in `src/compat.js`; `gfr-bmc-urs-lt-two` in `data/gravel.js`) but the
  Kaius 01 — BMC's aero road platform — is not. No match in `data/road.js` either.

### RCL-5 — Cannondale Dave Bicycles (MY2021–2023)

- **Source:** CPSC.gov, recall #24-136, February 29, 2024.
  https://www.cpsc.gov/Recalls/2024/Cannondale-Recalls-Dave-Bicycles-Due-to-Fall-and-Injury-Hazards
- **Affected:** Model Year 2021–2023 Cannondale 26" Dave bicycles and framesets (deep teal,
  stealth gray), sold June 2021–September 2023.
- **Hazard:** headtube/downtube weld can fail, separating the headtube from the frame — fall
  and injury hazards. 2 reports, no injuries.
- **Remedy:** free replacement frame from an authorized Cannondale dealer.
- **Catalog cross-reference: CHECKED, NO MATCH.** Cannondale is heavily cataloged, but "Dave"
  (a 26" kids/youth model) does not appear anywhere in `src/compat.js`, `data/striders.js`,
  or `data/bmx.js`.

### RCL-6 — Open Cycle U.P./UPPER/WIDE/MIND Ekar (Campagnolo hydraulic rear brake)

- **Source:** CPSC.gov, recall #23-168, March 30, 2023.
  https://www.cpsc.gov/Recalls/2023/Bicycles-and-Framesets-Recalled-Due-to-Crash-Hazard-Manufactured-by-Open-Cycle
- **Affected:** Open Cycle U.P. Ekar, UPPER Ekar, WIDE Ekar, MIND Ekar bicycles, and **all**
  Open Cycle framesets fitted with a **Campagnolo hydraulic rear disc brake**, sold Nov
  2021–Feb 2023.
- **Hazard:** rear brake hose/frame port insert failure — crash hazard.
- **Remedy:** free repair kit (new hose/line + frame insert) at a local dealer.
- **Catalog cross-reference: CONDITIONAL.** `data/gravel.js` carries `gfr-open-up` (Open
  U.P., modelYear 2023, `frameOnly: true`) and `gfr-open-wide` (Open WI.DE., modelYear 2023,
  `frameOnly: true`) — both the right brand, the right model-name family, and the right
  model year to plausibly overlap the recalled sales window. But the recall is specific to
  frames/bikes **fitted with a Campagnolo hydraulic rear brake**, and this catalog's gravel
  frame schema doesn't track which brake a frameset shipped with (frame-only rows have no
  stock-brake field). Can't be confirmed or ruled out from catalog data alone — flagged
  CONDITIONAL per `INDEX.md` rule 3.

### RCL-7 — woom OFF/OFF AIR/ORIGINAL 6 (crank fatigue fracture)

- **Source:** CPSC.gov (woom Bikes USA), November 14, 2024.
  https://www.cpsc.gov/Recalls/2025/woom-Bikes-USA-Recalls-Childrens-OFF-OFF-AIR-and-ORIGINAL-6-Bicycles-Due-to-Fall-and-Crash-Hazards
- **Affected:** ORIGINAL 6 bicycles (model years 2016–2020) and OFF 5/OFF AIR 5/OFF 6/OFF
  AIR 6 bicycles (model years 2019–2020) — pedal bikes for riders 10–14, sold Sept
  2016–Oct 2020.
- **Hazard:** crank can break from fatigue fracture — fall/crash hazard.
- **Remedy:** free replacement crankset, installed by a bike shop; reimbursement available.
- **Catalog cross-reference: CHECKED, NO MATCH.** woom **is** cataloged, but only as balance
  bikes in `data/striders.js` (`sb-woom-1-go1`, `sb-woom-1plus-go1plus`) — a different woom
  product line entirely from the recalled OFF/ORIGINAL pedal-bike series, which this catalog
  does not carry.

### RCL-8 — FSA Gossamer Pro AGX+ CK-6037 Cranksets

- **Source:** CPSC.gov, April 18, 2024.
  https://www.cpsc.gov/Recalls/2024/Full-Speed-Ahead-Recalls-Gossamer-Pro-AGX-Cranksets-Sold-on-Bicycles-Due-to-Fall-and-Injury-Hazards
- **Affected:** FSA Gossamer Pro AGX+ crankset, model CK-6037, serial numbers starting B1,
  B2, or B3, sold individually and OEM on Cannondale, Canyon, Marin, Haro, Fuji, and
  Pinarello gravel bikes, Jan 2022–June 2023.
- **Hazard:** crank arm can loosen/detach — fall and injury hazards. 277 reports, no
  injuries.
- **Remedy:** free dealer-installed replacement crankset.
- **Catalog cross-reference: CHECKED, NO MATCH.** No FSA Gossamer rows exist in
  `data/gravel.js` or `src/compat.js`.

### RCL-9 — DT Swiss ERC/CRC/HEC/ARC Carbon Wheels

- **Source:** CPSC.gov, recall #25-445, August 28, 2025.
  https://www.cpsc.gov/Recalls/2025/DT-Swiss-Recalls-Carbon-Wheels-Due-to-Crash-Hazard
  (manufacturer notice + affected-bike list: https://www.dtswiss.com/en/recall)
- **Affected:** DT Swiss carbon-rim wheels, model codes **ARC 1100/1400/1600 DICUT and
  SPLINE at 50/55/65mm**, **ERC 1100/1400/1600 DICUT and SPLINE at 35/45mm** (+ ERC LOG
  CLASSIC 45), **CRC 1100/1400/1600 at 35/45mm**, **HEC 1400 SPLINE 45**, manufactured in
  Vietnam and delivered from **August 1, 2024 onward** (DT Swiss ID number **2740000 or
  higher**). Sold OEM on numerous high-end road bikes and aftermarket, Sept 2024–July 2025.
- **Hazard:** outer carbon layer of the rim can delaminate at the flange — crash hazard.
  6 reports, no injuries (per CPSC; DT Swiss's own page cites additional reports globally).
- **Remedy:** stop use immediately, register with DT Swiss for replacement.
- **Catalog cross-reference: CONFIRMED MATCH — name-exact.** `data/road.js` carries:
  - `fw-dtswiss-arc1100-dicut` / `rw-dtswiss-arc1100-dicut` — **"ARC 1100 DICUT DB 50"** —
    exact model-name match to the recalled "ARC 1100 ... DICUT 50" line.
  - `fw-dtswiss-erc1100-dicut-45` / `rw-dtswiss-erc1100-dicut-45` — **"ERC 1100 DICUT 45"** —
    exact model-name match to the recalled "ERC 1100 ... DICUT ... 45" line.
  - **Caveat:** the recall further scopes to wheels with a specific DT Swiss ID number
    (≥2740000, tied to an August 2024+ delivery date) and manufactured in Vietnam
    specifically (DT Swiss's own Poland-made rims are explicitly excluded) — a
    serial/plant-level distinction this catalog's schema has no field for. The catalog rows
    are dated `lastChecked: '2026-07-18'` (current, road-4 wave) and cite `dtswiss.com`
    product-support pages directly, but those pages describe the SKU generically, not
    per-unit ID ranges. **This is a name/model match on a currently-sold DT Swiss line that
    overlaps the recalled production window; it cannot be narrowed further without a
    specific wheel's serial.** Flagging to the coordinator as the strongest hit this sweep
    found on a live-cataloged, high-value component.

### RCL-10 — Box Components BMX Race Box One Delta Stem

- **Source:** CPSC.gov, recall #24-105 (Fast Track Recall), February 1, 2024.
  https://www.cpsc.gov/Recalls/2024/Box-Components-Recalls-BMX-Race-Bicycle-Stems-Due-to-Fall-Hazard
- **Affected:** Box One Oversized 31.8 Delta BMX Race stems, sold separately Jan–Oct 2023.
- **Hazard:** faceplate can crack — fall hazard. 1 report, no injuries.
- **Remedy:** free refund or replacement stem.
- **Catalog cross-reference: CHECKED, NO MATCH.** Box Components is cataloged in
  `src/compat.js` (Box One Prime 9 shifter/derailleur, a 9-speed drivetrain group — an
  entirely different product) and possibly in `data/bmx.js`, but no "Delta" stem row exists
  in either file.

### RCL-11 — GT LaBomba (headtube/downtube weld)

- **Source:** CPSC.gov, recall #24-148, March 7, 2024.
  https://www.cpsc.gov/Recalls/2024/GT-Recalls-LaBomba-Bicycles-Due-to-Fall-and-Injury-Hazards
- **Affected:** GT LaBomba 24", 26", Pro, and Rigid bicycles and framesets, model years
  2019–2023, sold Oct 2018–Sept 2023.
- **Hazard:** headtube/downtube weld can separate — fall and injury hazards. 5 reports, no
  injuries.
- **Remedy:** free replacement frame from an authorized GT dealer.
- **Catalog cross-reference: CHECKED, NO MATCH.** No "LaBomba" row found in `src/compat.js`
  or `data/bmx.js`.

### RCL-12 — Transition TR11 Alloy Chainstay Yoke (heat-treating defect)

- **Source:** Manufacturer notice, Transition Bikes, July 2023. Transition maintains a
  dedicated recall page at https://www.transitionbikes.com/Support_RecallTR11.cfm (live
  URL confirmed to exist on transitionbikes.com 2026-07-18, though the page now renders only
  site-navigation chrome — consistent with an archived/resolved notice whose content template
  was retired after the remedy period closed). The full official statement is preserved
  verbatim via Pinkbike's coverage, which quotes it in full:
  https://www.pinkbike.com/news/transition-issues-voluntary-recall-of-tr11-alloy-frames.html
- **Affected:** TR11 Alloy framesets and complete bikes with serial numbers **TBC4801XXX,
  TBC4802XXX, and TBC4803XXX** (no visual way to identify affected units).
- **Hazard, per Transition's own quoted statement:** "the metal of the chainstay yoke may
  not have been heated sufficiently during welding, which can lead to poor weld penetration
  and premature failure" — a limited number of failures, no reported injuries at time of
  notice.
- **Remedy:** free replacement chainstay shipped to dealers/customers; affected owners
  instructed to stop riding until replaced.
- **Catalog cross-reference: CONFIRMED MATCH — name-exact, currently live.** `src/compat.js`
  carries `fr-transition-tr11-alloy` (TR11 Alloy frame, `modelYear: 2023`, `verified: true`,
  sourced directly from transitionbikes.com/Bikes/TR11) **and** a complete-bike build on the
  same frame, `cb-transition-tr11-alloy-gx` (TR11 Alloy GX, modelYear 2023, $6,599). This is
  the exact recalled model and model year. **Caveat:** the recall is serial-range-specific
  (TBC4801XXX–TBC4803XXX out of presumably a larger production run), which the catalog's
  schema has no field for — the catalog row represents the TR11 Alloy platform generally, not
  a specific serial-flagged unit, so this cannot be narrowed to "every cataloged TR11 is
  affected" — but it is the current, still-sold platform the 2023 recall targeted. Flagging
  to the coordinator as the second strongest hit this sweep found (a **stop-ride** notice
  from the manufacturer, on a frame this catalog currently sells as a complete bike).

### RCL-13 — Specialized Tarmac SL7 Fork Steerer *(OUTSIDE-WINDOW — 2021)*

- **Source:** CPSC.gov, October 13, 2021.
  https://www.cpsc.gov/Recalls/2022/Specialized-Bicycle-Components-Recalls-Tarmac-SL7-Bicycles-and-Framesets-Due-to-Fall-and-Injury-Hazards
- **Affected:** Specialized Tarmac SL7 bicycles and framesets, sold July 2020–Aug 2021.
- **Hazard:** fork steerer tube can crack/break after a harsh impact — fall and injury
  hazards. 2 reports, no injuries.
- **Remedy:** free inspection and repair from Specialized.
- **Why included despite being outside the 3-year window:** Tarmac SL7 is Specialized's
  flagship aero-road platform and a plausible current-catalog candidate.
- **Catalog cross-reference: CHECKED, NO MATCH.** No "Tarmac SL7" row found in
  `data/road.js` at this sweep.

### RCL-14 — Santa Cruz / Juliana MY2020 Aluminum Frames *(OUTSIDE-WINDOW — 2020)*

- **Source:** CPSC.gov, November 25, 2020.
  https://www.cpsc.gov/Recalls/2021/Santa-Cruz-Bicycles-Recalls-Bicycles-with-Aluminum-Frames-Due-to-Fall-Risk
- **Affected:** MY2020 **aluminum** Santa Cruz Nomad 4a, Bronson 3a, 5010 3a, and Juliana
  Roubion 3a, Furtado 3a — specific color combinations only, frames **without** six small
  indents above the serial number, sold June 2019–Oct 2020.
- **Hazard:** thermal damage from a non-standard paint-stripping step can bend/buckle the
  frame — fall hazard. 4 reports, no injuries.
- **Why included despite being outside the 3-year window:** Santa Cruz/Juliana are two of
  the most heavily cataloged frame brands in this project.
- **Catalog cross-reference: CHECKED, NO MATCH.** Santa Cruz rows found this sweep
  (e.g. `fr-santacruz-bronson-4`, modelYear 2024, material carbon) are later generations
  and/or carbon, outside both the recalled model year (2020) and material (aluminum). No
  MY2020 aluminum Santa Cruz/Juliana row was found — consistent with this catalog's frame
  coverage skewing to current-generation, mostly-carbon platforms.

### RCL-15 — Rocky Mountain Instinct / Instinct BC / Pipeline Alloy MY2018–2020 *(OUTSIDE-WINDOW — 2020)*

- **Source:** CPSC.gov, July 16, 2020.
  https://www.cpsc.gov/Recalls/2020/Rocky-Mountain-Bicycles-Recalls-Non-Electric-Instinct-Instinct-BC-and-Pipeline-Bicycles-with-Alloy-Frames-Due-to-Fall-and-Injury-Hazards
- **Affected:** MY2018–2020 **alloy** Instinct, Instinct BC, and Pipeline (carbon frames
  NOT affected), serial numbers starting PRK17/PRK18/PRK19 (with size-specific carve-outs
  for late-production PRK19 large frames), sold Aug 2017–May 2020.
- **Hazard:** front triangle can crack, separating the head tube from the frame — fall and
  injury hazards. 12 reports, no injuries.
- **Why included despite being outside the 3-year window:** Rocky Mountain is a
  recognizable trail-bike brand; worth a definitive check next sweep.
- **Catalog cross-reference: NOT CROSS-REFERENCED THIS SWEEP.** Rocky Mountain's presence
  in `src/compat.js` was not confirmed or ruled out this round — flagged as a **follow-up
  for the next sweep** rather than guessed at.

### RCL-16 — Trek Promax Hydraulic Disc Brakes (FX / Verve / Dual Sport)

- **Source:** CPSC.gov, recall #23-223, June 15, 2023.
  https://www.cpsc.gov/Recalls/2023/Trek-Recalls-Promax-Hydraulic-Disc-Brakes-Sold-on-Trek-Bicycles-Due-to-Crash-Hazard
- **Affected:** revision-1 Promax Solve DSK-925 and Promax F1 DSK-927 hydraulic disc brakes,
  OEM on Trek FX 2/3, Verve 3/3+, FX Sport 4/5/6, Dual Sport 2/3/+2 model years 21–23, sold
  June 2021–March 2023.
- **Hazard:** brake hose can detach from the lever — crash hazard. 195 reports, no injuries.
- **Remedy:** free inspection and repair at an authorized Trek dealer.
- **Catalog cross-reference: CHECKED, NO MATCH.** Trek's FX/Verve/Dual Sport lines are
  fitness/commuter hybrids, outside this catalog's MTB/BMX/road/gravel/emtb/strider scope —
  no match expected or found.

### RCL-17 — E-Bike Recall Sweep (checked against `data/emtb.js`)

Per CLAUDE.md, `data/emtb.js` is a separate, contained e-MTB catalog (the MTB catalog itself
stays e-free). The following recent e-bike recalls were checked against it and found **no
match** — none are the specific e-MTB model lines `data/emtb.js` carries (Turbo Levo/Kenevo,
Rail, Fuel EXe, Trance X E+/Reign E+):

- Trek/Electra coaster-brake bikes + rear-wheel-bolt recalls (FX+ 1, Townie Go!, Precaliber,
  Sprocket 1) — commuter/kids models, not Trek Rail/Fuel EXe.
  https://www.cpsc.gov/Recalls/2026/TREK-Recalls-Electric-Bicycles-Due-to-Fall-or-Crash-Hazard
- Specialized Globe Haul ST/LT (telescopic seatpost) and Turbo Como SL (fork steerer) —
  cargo/commuter e-bikes, not Turbo Levo/Kenevo.
  https://www.cpsc.gov/Recalls/2025/Specialized-Bicycle-Components-Recalls-Globe-Branded-Haul-ST-and-LT-E-Bikes-Due-to-Fall-Hazard
- Giant Momentum Vida E+ (fork steerer) — Giant's commuter sub-brand, not Trance X E+/Reign
  E+. https://www.giant-bicycles.com/us/news/fork-recall-momentum-vida-e-models/29851
- Norco Sight VLT CX (rear brake insert, stop-ride notice, April 2025) — Norco is not
  cataloged in `data/emtb.js` at all.
- Super73 Z Miami SE / Z Adventure Core (brake caliper pin) — Super73 is not cataloged.

**No entry needed beyond this summary** — none of these rise to a catalog match, but the
sweep is recorded so a future round doesn't re-walk the same ground from zero.
