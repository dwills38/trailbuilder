# EMTB verification wave 1 — dispositions

Scope: `data/emtb.js` only (75 rows, 0 verified at start). Per-brand batches,
gated + committed individually. Follows `tools/VERIFY-PROTOCOL.md` (raw-text
phantom-number check, THE PRICE RULE, frame/complete-bike exception where
relevant) and FETCH ETHICS (no anti-bot circumvention; JS-render via browser
pane is fine).

Format per row: `id — Verified|Skipped|Failed — one-line reason`.


## Commencal (2026-07-20)
- em-commencal-meta-power-sx — Verified — Meta Power SX V4 Bosch Essential; motor/battery/drivetrain/brakes corrected (was stale Shimano-EP801/SRAM guess; real bike is Bosch CX/Shimano SLX); price $6,500 matched exactly.
- em-commencal-meta-power-sx-signature — Verified — Bosch Signature build; corrected to Bosch CX/Shimano XT; price $8,000 and weight 24.2kg both matched exactly, strong identity confirmation.
- em-commencal-meta-power-29 — Skipped — current lineup shows this line renamed/consolidated into "Meta Power AM Shimano Essential" (EP800/630Wh matches loosely) but travel (170/155 vs catalog 150/140), drivetrain (SLX vs GX Eagle) and price ($6,900 MSRP vs catalog $5,500) don't match closely enough to confirm SKU identity — spec drift, needs re-entry not just a provenance stamp.

## Canyon (2026-07-20) — all Skipped
- em-canyon-spectral-on, em-canyon-spectral-on-cfr — Skipped — Canyon relaunched the Spectral:ON platform: current CFR is Shimano EP801/Canyon BT010 800Wh/27.5in-only/160-155mm ($8,499 MSRP, Shimano Di2 drivetrain), vs catalog's 29in/900Wh/SRAM Eagle Transmission builds which match the discontinued 2022-2023 CFR LTD generation instead. No confident current-SKU match for either row.
- em-canyon-strive-on — Skipped — not independently re-checked this pass given the Spectral relaunch pattern; flagged for a dedicated fetch next wave.
- em-canyon-neuron-on — Skipped — current Neuron:ON AL 2026 is Bosch Performance CX/800Wh/150-145mm travel (bikeradar/pinkbike), catalog row says Shimano EP8/630Wh/140-130mm — motor brand wrong, spec drift.

## Rocky Mountain (2026-07-20) — all Skipped
- em-rocky-mountain-altitude-powerplay, em-rocky-mountain-altitude-powerplay-c90 — Skipped — current Altitude Powerplay III lineup (bikes.com) confirms motor/torque/battery (Dyname [S4 Pro]/108Nm/720Wh) and travel (170/160) match, BUT wheel is 29in-only (not mullet) and only 3 SKUs exist (C70 $10,799 SRAM Eagle 90 Transmission, A50 $7,899, A30 $6,099 Shimano Deore) — no "C90" tier or SRAM X0 Transmission build exists in the current lineup; catalog rows reference a discontinued C90-era generation.
- em-rocky-mountain-instinct-powerplay — Skipped — bikes.com nav shows a new "Instinct Powerplay SL" line alongside the standard Instinct Powerplay (lineup changed); product-listing fetch didn't return spec content in this pass (JS-lazy list), not re-verified.

## YT (2026-07-20) — both Skipped
- em-yt-decoy-core-3, em-yt-decoy-uncaged-8 — Skipped — YT went through administration and relaunched the whole Decoy line as "Decoy X" (Avinox M2S motor 150Nm, 800Wh, RockShox ZEB/Vivid, SRAM Eagle 90 Transmission, 170/160 travel). Catalog rows carry Shimano EP8/85Nm/630Wh/160-150mm — the old, now-discontinued Decoy MX generation; "Uncaged 8" trim no longer exists at all. Needs full re-entry.

## Radon (2026-07-20) — both Skipped
- em-radon-jealous-10-0, em-radon-jealous-9-0 — Skipped — real Radon "Jealous Hybrid" line is a Bosch 5th-gen CX-motor short-travel bike (~120mm fork, XC/light-trail category), not the Shimano EP8/160-155mm enduro-mullet bike the catalog describes. Category mismatch, not just a spec drift — needs re-entry against a real Radon enduro e-MTB (e.g. Swoop Hybrid) or correction of the model name.

## Wave 1 summary (2026-07-20, session close)
Checked 6 brands / 16 rows: Commencal (2 verified, 1 skipped), Canyon (0/4), Rocky Mountain (0/3),
YT (0/2), Radon (0/2). **Pattern found repeatedly: e-MTB platforms churn motor vendor/battery/travel
generation-to-generation faster than most MTB parts, and this catalog's unverified seed data mostly
reflects a stale (pre-relaunch) generation** — wrong motor brand entirely in most cases (Shimano
guessed where the real current bike is Bosch/DJI/Avinox), not just a minor number drift. This means
most of the remaining 59 rows likely need the same treatment: fetch → compare → either correct+verify
(clean SKU/price match, ~1-in-8 hit rate so far) or Skip with the generation-drift note.
Remaining brands not yet touched (59 rows): Specialized, Trek, Santa Cruz, Orbea (started, walled —
SPA lazy-loads specs, not re-attempted), Cannondale, Transition, Giant, Cube, Ibis, Mondraker, Haibike,
Propain, Pivot, Norco, Scott, Merida, Whyte, Marin, Devinci, Vitus, Kona, Focus, Nukeproof.
Walls hit: orbea.com renders via JS-SPA with lazy spec tabs (browser pane got the price but not the
spec sheet in one pass — needs a click-through, not yet a hard anti-bot wall); bikes.com (Rocky
Mountain) hCaptcha-gated on the newsletter popup only, product data still readable via Exa.

## Wave 2 (2026-07-20) — Phase 1: full-catalog motor-brand-only triage

Cheap spot-check of all 59 rows not touched in wave 1 (23 brands), via WebSearch only (no deep
per-SKU fetch yet — that's phase 2/3). Classification: **Current** = motor brand/family confirmed
matching today's lineup; **Current-likely** = plausible match but not confirmed to trim-id
precision (flag for phase 3); **Stale** = right brand, wrong generation/renamed line; **Stale
(wrong brand)** = the catalog's motor maker itself is no longer used on that platform — highest
priority for phase 2 re-entry; **Unclear** = search didn't resolve confidently, needs a dedicated
fetch.

| id | catalog motor | disposition | note |
|---|---|---|---|
| em-specialized-turbo-levo | Specialized 2.2 | Stale | current Levo 4 uses Specialized 3.1 motor |
| em-specialized-turbo-levo-comp-alloy | Specialized 2.2 | Stale | same — 2.2→3.1 gen |
| em-specialized-turbo-levo-pro | Specialized 2.2 | Stale | same — 2.2→3.1 gen |
| em-specialized-turbo-levo-sl-expert | Specialized SL 1.2 | Current | matches current Levo SL 2's SL 1.2 motor |
| em-specialized-turbo-kenevo-sl-expert | Specialized SL 1.1 | Stale | line renamed Kenevo SL 2, motor now SL 1.2 |
| em-trek-rail | Bosch CX (no gen) | Stale | line renamed Rail+, now Bosch Gen 5 CX |
| em-trek-rail-9-5 | Bosch CX (no gen) | Stale | same |
| em-trek-rail-9-9-xx | Bosch CX (no gen) | Stale | same |
| em-trek-fuel-exe-9-5 | TQ-HPR50 | Stale | line renamed Fuel+, motor now TQ HPR60 |
| em-trek-fuel-exe-9-9-xx | TQ-HPR50 | Stale | same |
| em-santa-cruz-bullit | Shimano EP801 | Stale (wrong brand) | 2026 Bullit dropped Shimano entirely for Bosch CX Gen 5 |
| em-santa-cruz-bullit-xx | Shimano EP801 | Stale (wrong brand) | same |
| em-santa-cruz-heckler | Shimano EP8 | Current | full-power Heckler still Shimano EP8 |
| em-santa-cruz-heckler-sl | Fazua Ride 60 | Current | Heckler SL still Fazua Ride 60 |
| em-orbea-wild | Bosch CX (no gen) | Stale-likely | Wild is mid-churn (Gen 5 CX / CX-Race / newer Avinox variant); no gen in catalog |
| em-orbea-wild-m-team | Bosch CX (no gen) | Stale-likely | same |
| em-orbea-rise-m-team | Shimano EP8 RS | Current | current Rise runs Shimano EP801-RS Gen2 — same family |
| em-orbea-rise-h30 | Shimano EP8 RS | Current | same |
| em-cannondale-moterra | Bosch CX (no gen) | Stale-likely | current Moterra/LT on Bosch Gen 5 CX; no gen in catalog |
| em-cannondale-moterra-1 | Bosch CX (no gen) | Stale-likely | same |
| em-cannondale-moterra-sl-1 | Bosch SX | Stale (wrong brand) | real Moterra SL runs Shimano EP801, not Bosch SX |
| em-transition-relay | Fazua Ride 60 | Current | confirmed alive, same core motor specs |
| em-transition-relay-alloy-xt | Fazua Ride 60 | Current | same |
| em-transition-relay-carbon-x0-axs | Fazua Ride 60 | Current | same |
| em-giant-trance-x-e-plus-elite | SyncDrive Pro2 | Current | Trance X still on Pro2 (Reign got the new Pro 3, Trance X hasn't) |
| em-giant-trance-x-advanced-e-plus-0 | SyncDrive Pro2 | Current | same |
| em-giant-reign-e-plus-0 | SyncDrive Pro2 | Stale | 2026 Reign E+ moved to SyncDrive Pro 3 (48V) |
| em-ibis-oso | Bosch CX (no gen) | Stale-likely | Oso got a 2026 "second generation" overhaul onto Gen 5 CX |
| em-mondraker-crafty-carbon-r | Bosch CX (no gen) | Stale-likely | Gen 5 CX era, no gen in catalog |
| em-mondraker-level-carbon-rr | Bosch SX | Stale (wrong motor line) | 2026 Level relaunched on full Bosch CX Gen 5, not SX |
| em-haibike-allmtn-9 | Yamaha PW-X3 | Unclear | search didn't confirm PW-X3 continuity for 2026 — needs dedicated fetch |
| em-haibike-nduro-8 | Bosch CX (no gen) | Unclear | Nduro has historically been Yamaha-based (PW-X3) — possible brand mismatch, needs dedicated fetch |
| em-cube-stereo-hybrid-160 | Bosch CX (no gen) | Stale-likely | Gen 5 CX era, no gen in catalog |
| em-cube-stereo-hybrid-one55-sl | Bosch SX | Current-likely | SX family plausible for the lightweight ONE55 SL, not trim-confirmed |
| em-cube-stereo-hybrid-140 | Bosch CX (no gen) | Current-likely | entered in the 2026-07-20 depth pass, presumed fresher — not yet confirmed |
| em-propain-ekano-mix-line | Shimano EP8 | Stale (wrong brand) | Propain dropped Shimano entirely, Ekano line consolidated onto Avinox M2S |
| em-propain-ekano-highend-line | Shimano EP8 | Stale (wrong brand) | same |
| em-pivot-shuttle-am | Shimano EP8 | Stale (wrong brand) | current Shuttle AM runs Bosch CX Gen 5, not Shimano |
| em-pivot-shuttle-lt | Shimano EP8 | Current | Shuttle LT confirmed still Shimano EP8 |
| em-pivot-shuttle-sl | Fazua Ride 60 | Current | Shuttle SL confirmed still Fazua |
| em-norco-sight-vlt-a1 | Shimano EP8 | Stale (wrong brand) | Shimano EP-801 was "the last iteration" — current Sight VLT is Bosch PX/CX Gen5 or TQ HPR60 |
| em-norco-sight-vlt-c1 | Shimano EP8 | Stale (wrong brand) | same |
| em-scott-patron-eride-900-tuned | Bosch CX (no gen) | Stale-likely | current Patron confirmed on Bosch Gen 5 CX, catalog carries no gen |
| em-scott-genius-eride-910 | Shimano EP8 | Stale (wrong brand) | current Genius eRIDE runs Bosch CX Gen 4, not Shimano |
| em-scott-lumen-eride-910 | TQ-HPR50 | Current | confirmed match |
| em-merida-eone-sixty-8000 | Shimano EP8 | Current | standard eONE-SIXTY confirmed Shimano EP801 |
| em-merida-eone-sixty-900 | Shimano EP8 | Current | same |
| em-whyte-e-180-rs | Bosch CX (no gen) | Current-likely | motor family (CX Gen 4) matches, but current lineup trim is "RSX" not "RS" — name-drift flag |
| em-whyte-e-180-s | Bosch CX (no gen) | Current | trim name AND motor family (CX Gen 4, current per Bosch's own site) both match |
| em-marin-alpine-trail-e2 | Shimano EP8 | Stale (wrong brand) | current Alpine Trail E is Bosch CX Gen 5; Shimano was the discontinued "-INT" 2024 variant |
| em-marin-alpine-trail-e1 | Shimano EP8 | Stale (wrong brand) | same |
| em-vitus-e-sommet-27 | Bosch CX (no gen) | Stale (wrong brand) | real E-Sommet runs Shimano STEPS motors, not Bosch |
| em-vitus-e-sommet-29 | Bosch CX (no gen) | Stale (wrong brand) | same |
| em-kona-remote-160 | Shimano EP8 | Current-likely | EP8 exists in current lineup (Remote X / 160 DL) but exact trim-id mapping unconfirmed |
| em-kona-remote-150 | Shimano EP8 | Current-likely | same |
| em-devinci-e-troy-29 | Shimano EP8 | Stale (wrong brand) | redesigned E-Troy now runs Bosch CX, not Shimano |
| em-devinci-e-troy-carbon | Shimano EP8 | Stale (wrong brand) | same |
| em-focus-jam2-sl-8-9 | Fazua Ride 60 | Current | confirmed match, Jam2 SL still Fazua |
| em-focus-jam2-6-9 | Bosch CX (no gen) | Current-likely | standard Jam2 confirmed on Bosch CX Gen 5 family; recently-entered row, not yet trim-confirmed |
| em-nukeproof-megawatt-297-comp | Bosch CX (no gen) | Stale (wrong brand) | current Megawatt runs SRAM Eagle Powertrain, not Bosch at all |
| em-nukeproof-megawatt-297-elite | Bosch CX (no gen) | Stale (wrong brand) | same |

**Wave 2 phase 1 totals (59 rows):** 17 Current, 6 Current-likely, 19 Stale (same-brand,
wrong-gen/renamed), 17 Stale-wrong-brand, 2 Unclear (Haibike, needs dedicated fetch). Combined
with wave 1's 6 Verified+Skipped, only 2/75 rows are `verified:true` going into phase 2 — this
wave confirms wave 1's finding at full-catalog scale: e-MTB motor platforms turn over almost every
model year, and an unverified seed catalog skews stale by default. The **Stale-wrong-brand** bucket
(17 rows) is the priority queue for phase 2 re-entry — those aren't spec drift, the maker itself
changed.

## Wave 2 phase 2 (2026-07-20) — re-entry of 4 highest-value wrong-brand platforms (8 rows)

Schema extended first: `src/schema-emtb.js` gained `status`/`supersededBy` (mirrors `schema.js`'s
frame lifecycle convention — the emtb schema had no way to retire a row before this) and widened
`motorBrand` to include `sram` (the Nukeproof Megawatt's real current motor maker — a genuine new
value, not a typo). Old rows marked `status:'discontinued'` + `supersededBy` pointing at a new
appended row (append-only id convention); new rows carry corrected motor/battery/travel/price/
weight from wave-2-phase-1's search findings, still unverified samples (no fetched-page confirm
yet, so no `verified:true`).

Re-entered (old id → new id):
- `em-santa-cruz-bullit` → `em-santa-cruz-bullit-bosch-cx` — Bosch CX Gen 5, non-removable 600Wh, Shimano dropped entirely for 2026.
- `em-santa-cruz-bullit-xx` → `em-santa-cruz-bullit-bosch-x0-axs-rsv` — same platform switch, top X0 AXS RSV trim.
- `em-marin-alpine-trail-e2` → `em-marin-alpine-trail-e2-2026` — Bosch CX Gen 5 (120Nm/750W), 800Wh, replaces Shimano EP8.
- `em-marin-alpine-trail-e1` → `em-marin-alpine-trail-e1-2026` — same platform switch, entry alloy trim.
- `em-nukeproof-megawatt-297-comp` → `em-nukeproof-megawatt-297-carbon-pro` — full-carbon frame + SRAM Eagle Powertrain (90Nm), Bosch dropped entirely.
- `em-nukeproof-megawatt-297-elite` → `em-nukeproof-megawatt-297-carbon-rs` — same platform switch, top RS trim.
- `em-devinci-e-troy-29` → `em-devinci-e-troy-bosch-29` — Bosch Performance Line CX replaces Shimano EP8.
- `em-devinci-e-troy-carbon` → `em-devinci-e-troy-bosch-carbon` — same platform switch; **open question**: couldn't independently confirm a carbon-frame SRAM-X0-Transmission Bosch E-Troy trim exists in the current lineup (current maker copy only shows an aluminum frame across all three 2026 builds) — flagged in the row's `desc`, not stated as fact.

Remaining 9 stale-wrong-brand rows not yet re-entered this wave: Cannondale Moterra SL 1, Propain
Ekano ×2, Pivot Shuttle AM, Norco Sight VLT ×2, Scott Genius eRIDE, Vitus E-Sommet ×2. Plus 19
same-brand-wrong-gen rows and 2 Haibike Unclear rows. All still carry their wave-2-phase-1
disposition above — untouched this session, next wave's queue.

Gates after phase 2: `node validate.js` → EMTB OK, 83 bikes, 0 problems (2 verified, 81
unverified); `npm test` → 838/838 passed; `npm run typecheck` → clean.

## Wave 2 phase 3 attempt (2026-07-20) — Transition Relay + Santa Cruz Heckler, both Skipped

Tried the two rows flagged as "easy wins" (motor family matched cleanly in phase 1). Both turned
up a **trim-naming mismatch** that blocks a clean `verified:true` even though the motor is right:

- **Transition Relay** (3 rows) — transitionbikes.com/Bikes/Relay lists three live builds ("Relay
  PNW Alloy Eagle 90", "Relay Carbon Eagle 90", "Relay PNW Carbon Eagle 90"), all on **SRAM Eagle
  90 Transmission**. The catalog's three rows are named "Relay", "Relay Alloy XT" and "Relay
  Carbon X0 AXS" — the "Alloy XT"/"Carbon X0 AXS" trim names don't exist in the current lineup
  (no Shimano-XT-derailleur Relay build, no distinct "X0 AXS" tier separate from "Eagle 90").
  Motor (Fazua Ride 60) is confirmed current; drivetrain trim identity is stale/invented. Needs a
  re-entry (3 real trims: PNW Alloy, Carbon, PNW Carbon, all Eagle 90) rather than a same-id fix.
- **Santa Cruz Heckler** (2 rows) — santacruzbicycles.com lists five 2026 builds (R, S, GX AXS,
  X0 AXS RSV, XX AXS RSV), all confirmed 720Wh/full-power, but the fetched page didn't surface
  motor brand/model text (site is JS-heavy) so the Shimano EP8 match from phase 1's WebSearch
  isn't page-confirmed. Catalog's single "Heckler" row (no trim suffix) doesn't map cleanly to
  any of the five named trims. Price ($8,500 in catalog) only compares against sale prices from
  this fetch, not MSRP — per the MSRP-only policy that's not a valid match either.

**Disposition: both Skipped, not Verified.** Forcing `verified:true` off a motor-family match
alone would violate THE BAR (trim/SKU identity must be confirmed, not just the motor) — logged
here instead per protocol. Next wave: re-fetch Heckler via browser pane (JS-rendered spec table)
and re-enter Relay's three real trim names before attempting verification again.

## Wave 2 session close (2026-07-20)

Net this wave: catalog grew 75 → 83 bikes (8 re-entered current-gen platforms), verified count
unchanged at 2/83 (no row cleared the trim-identity bar this pass). Remaining backlog for the next
wave: 9 stale-wrong-brand rows not yet re-entered (Cannondale Moterra SL 1, Propain Ekano ×2,
Pivot Shuttle AM, Norco Sight VLT ×2, Scott Genius eRIDE, Vitus E-Sommet ×2), 19 same-brand-wrong-
gen rows, 2 Haibike Unclear rows, and the full phase-3 deep-verify pass (attempt it via browser
pane for JS-heavy maker sites — Transition/Santa Cruz both needed it and phase 3 stalled without
it this wave).

## Wave 3 phase 1 (2026-07-20) — re-entry of the remaining 9 stale-wrong-brand rows

Schema widened: `EMTB_VOCAB.motorBrand` gains `'dji'` (Propain's Ekano platform moved to the
DJI Avinox M2/M2S drive unit — a genuine new motor maker, not a typo, backed by the two new
Ekano rows below). Same append-only pattern as wave 2 phase 2: old rows marked
`status:'discontinued'` + `supersededBy` pointing at a new row; specs sourced via WebSearch/Exa
(no browser-pane wall hit this pass — all six maker sites resolved cleanly through search
snippets/cached product pages).

Re-entered (old id → new id):
- `em-cannondale-moterra-sl-1` → `em-cannondale-moterra-sl-1-shimano-ep801` — Cannondale-tuned
  Shimano EP801 (85Nm/600W, 601Wh) replaces the Bosch Performance Line SX guess; the real
  "SL 1" chassis is marketed lightweight but the motor itself is full-power class.
- `em-propain-ekano-mix-line` → `em-propain-ekano-3-al-enduro` — DJI Avinox M2S replaces
  Shimano EP8; alloy frame, mullet, configurator-sold German DTC brand.
- `em-propain-ekano-highend-line` → `em-propain-ekano-3-al-enduro-factory` — same motor
  platform switch; **note** Propain has not launched a carbon Ekano (every current trim is
  alloy), so the new row corrects frame material too, not just motor brand.
- `em-pivot-shuttle-am` → `em-pivot-shuttle-am-bosch-cx` — Gen 5 Bosch Performance Line CX/CX-R
  replaces Shimano EP8; 800Wh battery, optional 250Wh PowerMore range extender.
- `em-norco-sight-vlt-a1` → `em-norco-sight-vlt-cx-c2` — Bosch Performance Line CX replaces
  Shimano EP8; **note** the current Sight VLT CX line is carbon-only, so there is no current
  alloy "A1" tier — the re-entry is carbon like its sibling below.
- `em-norco-sight-vlt-c1` → `em-norco-sight-vlt-cx-c1` — same platform switch, top C1 tier
  (RockShox Lyrik/Zeb Ultimate, SRAM Maven Silver).
- `em-scott-genius-eride-910` → `em-scott-genius-eride-910-bosch-cx-gen4` — Bosch Performance
  CX Gen 4 replaces Shimano EP8; weight (23.4kg) independently confirmed via a third-party
  build review, not just the maker page.
- `em-vitus-e-sommet-27` → `em-vitus-e-sommet-297-vrx`, `em-vitus-e-sommet-29` →
  `em-vitus-e-sommet-297-vrs` — Shimano STEPS EP801 replaces the Bosch CX guess; **both**
  wheel-specific rows (27.5-only and 29-only) are superseded by two builds of the current
  mullet-only "E-Sommet 297" chassis (VRX = SRAM GX T-Type/Hayes Dominion A4 top tier, VRS =
  Shimano SLX/SRAM DB8 entry tier) — the old 27/29 split no longer exists in the real lineup.

Gates after phase 1: `node validate.js` → EMTB OK, 92 bikes, 0 problems (2 verified, 90
unverified); `npm test` → 838/838 passed; `npm run typecheck` → clean.

Remaining queue for phase 2: 19 same-brand-wrong-gen rows (Specialized Levo ×3, Kenevo SL,
Trek Rail ×3, Fuel EXe ×2, Orbea Wild ×2, Cannondale Moterra ×2, Giant Reign E+, Ibis Oso,
Mondraker Crafty + Level, Cube Stereo Hybrid 160 + ONE55 SL, Scott Patron eRIDE, Whyte E-180
RS) and 2 Haibike Unclear rows (AllMtn 9, Nduro 8) — untouched this phase, next phase's queue.
