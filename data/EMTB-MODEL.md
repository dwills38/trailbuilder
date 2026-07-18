# EMTB-MODEL.md — e-MTB ("BuildMyEMTB") data model (OFF-LIVE bootstrap doc)

**Status: OFF-LIVE.** This document is the data-model spec for **BuildMyEMTB**, the ONLY
e-bike surface the project will ever host. Nothing here is wired into the live app
(`index.html`, `bmx.html`, `src/compat.js`, `src/compat-bmx.js`); the e-MTB catalog
(`data/emtb.js`) is validated by `validate.js` (an "EMTB OK" gate line) and its own tests,
and stays off-live until Douglas's explicit flip word.

Date: 2026-07-18. Templates followed: `data/STRIDER-MODEL.md` (the complete-bike, off-live
precedent — the closest structural analog), `data/BMX-MODEL.md`, `data/DJ-BMX-COMPAT-ANALYSIS.md`.

> **CONTAINMENT IS THE DESIGN PRINCIPLE (CLAUDE.md hard rule 1, amended on Douglas's explicit
> word 2026-07-18).** E-bikes were authorized *reluctantly* and *contained*: the MTB catalog
> (`src/compat.js` `PARTS`) stays **100% e-bike-free permanently**, no other catalog gains
> e-parts, and every motor/battery/e-specific field exists **only** in this surface. The amended
> rule is enforced *both ways* by an automated test (`test/test-emtb-containment.js`): the MTB
> catalog is asserted to carry no e-field, and this catalog is asserted to actually carry the
> e-system. See §5.

---

## 1. The one fact that reshapes everything: an e-MTB is a COMPLETE-BIKE, OEM-locked purchase

TrailBuilder / BuildMyBMX / the DJ engine are all **part-to-part compatibility checkers** — the
value is "will this fork fit this frame, will this BB take this crank." An e-MTB has **almost no
e-part-to-part surface to check, by design:**

- **The motor, battery, and frame are a closed, OEM-locked system.** You cannot put a Bosch
  Performance Line CX into a Specialized frame, or a Shimano EP801 into an Orbea Wild. The motor
  interface (mount pattern, wiring, firmware, battery bay) is proprietary to the frame it ships in.
  A rider buys a complete e-MTB (or, at most, a frameset that already includes its motor + battery).
  There is no "pick a motor, pick a battery, check they fit the frame" market to model — the answer
  is always "they come together or not at all."
- **The battery is matched to the frame's downtube.** Battery Wh, removability, and the availability
  of a range extender are fixed per model. A rider does not shop batteries across brands.
- **The non-e parts (drivetrain, brakes, wheels, cockpit) ARE swappable** — but their compatibility
  is *identical to a regular MTB's*, already fully modeled by `src/compat.js`. Re-checking a SRAM GX
  Transmission against a UDH e-frame is the same rule set the MTB engine already runs. Duplicating
  that engine here would be all cost, no new value — and would violate containment (the MTB engine
  must never load e-frames).

So the central design decision (argued in full in §4): **the primary catalog entity is a whole
e-MTB, and the surface is a BROWSE / COMPARE / FILTER tool over complete bikes — the
`complete-bikes` view pattern — NOT a 20-slot part builder.** This is the same structural break the
balance-bike model made (`STRIDER-MODEL.md` §1): one bike, no build map. It is the honest shape for
a completes-dominated, OEM-locked market. (Recommendation + the open call are in §4 and §8.)

---

## 2. Market map + the flagship seed set

The market is dominated by full-suspension trail/enduro completes from the major brands, split into
two motor/weight **classes**:

- **Full-power** — ~85–108 Nm torque, ~700–900 Wh batteries, ~22–25 kg. The mainstream e-enduro/
  e-trail bike (Levo, Rail, Bullit, Wild, Moterra, Spectral:ON, Meta Power, Altitude Powerplay).
- **Lightweight / "SL"** — ~50–60 Nm, ~360–430 Wh, ~17–20 kg. Rides closer to an acoustic bike
  (Transition Relay, Levo SL, Orbea Rise, Specialized/Fazua/TQ-powered bikes). Modeled as
  `assist:'lightweight'` (an orthogonal weight/power axis, NOT a riding discipline — see §3).

Ten flagships are seeded this round as **unverified samples** to exercise the schema (see
`data/emtb.js`). They span 5 motor makers (Bosch, Shimano, Specialized, Fazua, Rocky Mountain
Dyname), both classes, both wheel configs, and a $-band spread:

| Seed | Motor | Torque | Battery | Class | Wheel | Travel F/R |
|---|---|---|---|---|---|---|
| Specialized Turbo Levo | Specialized 2.2 | 90 Nm | 700 Wh | full-power | mullet | 160/150 |
| Trek Rail | Bosch Performance Line CX | 85 Nm | 800 Wh | full-power | mullet | 160/150 |
| Santa Cruz Bullit | Shimano EP801 | 85 Nm | 720 Wh | full-power | mullet | 170/150 |
| Santa Cruz Heckler | Shimano EP801 | 85 Nm | 720 Wh | full-power | mullet | 160/150 |
| Commencal Meta Power SX | Shimano EP801 | 85 Nm | 720 Wh | full-power | mullet | 170/160 |
| Orbea Wild | Bosch Performance Line CX | 85 Nm | 750 Wh | full-power | 29 | 160/150 |
| Canyon Spectral:ON | Shimano EP801 | 85 Nm | 900 Wh | full-power | 29 | 160/150 |
| Cannondale Moterra | Bosch Performance Line CX | 85 Nm | 750 Wh | full-power | mullet | 160/150 |
| Transition Relay | Fazua Ride 60 | 60 Nm | 430 Wh | **lightweight** | mullet | 160/150 |
| Rocky Mountain Altitude Powerplay | Rocky Mountain Dyname 4.0 | 108 Nm | 720 Wh | full-power | mullet | 170/160 |

**These ten rows are SAMPLE data — specs are best-credible-public, NOT maker-confirmed, and no row
is `verified:true`.** They exist to prove the field set and the validator; a verified grind (off
fetched maker pages, `sourceType:'measured'` for walled/JS-heavy weight pages — same posture as the
tire and strider catalogs) is a later, Douglas-gated phase.

---

## 3. Category schema — `cat:'emtb'`, a whole e-MTB is the primary row

Mirrors the catalog's field conventions (`id, brand, model, price` USD sample, `weight` grams
sample; optional identity `family`/`modelYear`/`mfgPn`; provenance `verified`/`lastChecked`/
`source`/`sourceType`/`weightSource` under the **same contract** — `verified:true` only with a
fetched maker URL + non-future date). Enforced by `src/schema-emtb.js` (`EMTB_SCHEMA` + `EMTB_VOCAB`).

**The e-system block (the containment-critical, e-specific fields — these live NOWHERE else):**

| Field | Type / vocab | Req? | Role |
|---|---|---|---|
| `motorBrand` | `bosch`\|`shimano`\|`specialized`\|`fazua`\|`rocky-mountain` (+ shipped) | ✅ | motor maker |
| `motorModel` | string | ✅ | e.g. "Performance Line CX", "EP801", "Dyname 4.0" |
| `motorTorque` | number, **Nm** | ✅ | the headline assist metric |
| `motorPowerPeak` | number, W | ○ | peak power where published (nominal is regulated) |
| `batteryWh` | number, **Wh** | ✅ | headline range metric |
| `batteryRemovable` | bool | ○ | tool-free battery removal |
| `rangeExtender` | bool | ○ | a range-extender battery is offered |
| `assist` | `full-power`\|`lightweight` | ✅ | the SL-vs-full-power class axis |
| `display` | `top-tube`\|`system-controller` (+ shipped) | ○ | display/remote unit type |

**The bike side (reusing MTB conventions, all display/compare — NO part-compat rules run here):**

| Field | Type / vocab | Req? | Role |
|---|---|---|---|
| `wheelConfig` | `29`\|`275`\|`mullet` | ✅ | as-shipped wheel setup (single value; a complete bike ships one) |
| `suspension` | `full`\|`hardtail` | ✅ | discriminator (cross-rule vs `travelRear`, §below) |
| `travelFront` | number, mm | ✅ | fork travel |
| `travelRear` | number, mm | ✅ | rear travel (0 for a hardtail e-MTB) |
| `frameMaterial` | `aluminum`\|`carbon`\|`steel`\|`mixed` | ○ | display |
| `drivetrain` | string | ○ | display spec (e.g. "SRAM GX Eagle Transmission") |
| `brakes` | string | ○ | display spec |
| `disciplines` | array of `e-xc`\|`e-trail`\|`e-enduro`\|`e-dh` | ○ | riding-style filter (closed enum, mirrors MTB `disciplines`; absence = universal) |

**Cross-rule (the one crisp schema cross-check, mirroring the MTB frame shock-block rule):**
`suspension:'full'` requires `travelRear > 0`; `suspension:'hardtail'` requires `travelRear === 0`.
A full-suspension e-MTB has rear travel; a hardtail has none — a contradiction is a data error.

**Deliberately NOT modeled for MVP** (per "a missing field beats a noise field"): separate
motor/battery/frame rows (there is no aftermarket to build from); a `speeds`/`system` drivetrain
matrix (the non-e drivetrain is display-only here — its real compatibility is the MTB engine's job,
and running it would breach containment); regional legal class (`class-1/3`, EU 250 W / 25 km/h vs
US) — flagged as a **decision for Douglas** (§8), not built, because it is a compliance-display call.

---

## 4. The engine question — browse/compare vs part-builder (honest analysis + recommendation)

**Does a parts-level compat engine make sense for v1? Recommendation: NO — build a browse/compare/
filter surface over complete e-MTBs, like the `complete-bikes` view, not a slot-based builder.**

The reasoning (from §1): the e-drive system is OEM-locked, so there is **zero genuine e-part-to-part
compatibility surface** — the check "does this motor fit this frame" has no answer other than "they
ship together." The only real compatibility on an e-MTB is the **non-e drivetrain/brakes/cockpit**,
which is *the exact rule set `src/compat.js` already runs for regular MTBs*. Rebuilding that here
would (a) duplicate a 20-rule engine for no new coverage and (b) breach containment — the MTB engine
must never touch e-frames, and an e-engine that imported the MTB rules would be a second copy to keep
in sync. Neither is worth it.

So v1 = **a filterable catalog of complete e-MTBs**: sort/filter by motor brand, torque, battery Wh,
class (full-power/SL), travel, wheel config, price, weight, discipline — the same UI grammar as the
complete-bikes browse view, applied to e-MTBs on their own page. Price/weight "totals" collapse to
the single bike's own figures. **No `checkBuild`, no slot map, no four-state pick dot over parts.**

*If* a future round wants a light "fit/spec-compare" verdict layer (e.g. flag an SL bike to a rider
who wants big-battery range, or surface class/legal notes), that is a small optional `compareEmtb`
pass returning the shared `Verdict {ruleId, slots, msg, fix?}` shape — **dormant, additive, and
NOT part of this bootstrap.** The bootstrap ships data + schema + validator + tests only.

**This is the open architecture call in the decision packet (§8): confirm browse/compare, or ask
for a builder.** Recommendation stands: browse/compare.

---

## 5. Containment — how the amended rule 1 is enforced (both ways)

The amended hard rule 1 has two halves, each machine-checked so neither can silently rot:

1. **The MTB catalog stays e-free.** `test/test-emtb-containment.js` scans every `src/compat.js`
   `PARTS` row and fails if any row carries an e-field key (`motorBrand`, `motorTorque`, `batteryWh`,
   `assist`, `rangeExtender`, …), an e-category, or an `em-` id prefix. (At bootstrap time the MTB
   catalog has **0** such rows — verified live — so this is a green guard against future leakage,
   e.g. a careless paste of an e-MTB into `compat.js`.)
2. **The e-system lives only in the e-catalog.** The same test asserts every `data/emtb.js` row
   *does* carry the e-system (`motorBrand` + `motorTorque` + `batteryWh`) — so e-parts are provably
   contained in this surface, not scattered.

Structurally, containment is also enforced by isolation: `data/emtb.js` and `src/schema-emtb.js` are
loaded by **nothing the site serves** and by no other catalog — only `validate.js` (a gate line) and
these tests. The future `emtb.html` page (BuildMyBMX pattern) is the only surface that will ever load
them, off-live until Douglas's flip.

---

## 6. Provenance & the "no e in MTB / no pop-ups" rules

- **Provenance:** identical contract to the live catalog. `verified:true` requires a fetched
  manufacturer page + non-future `lastChecked` + `source`; `sourceType:'retailer'` is rejected;
  `sourceType:'measured'` (a reputable measured weight, interfaces still maker-sourced) needs a
  `weightSource` URL. E-MTB maker pages are heavily JS-rendered/walled, so expect the measured-weight
  path for the eventual verified grind — same as the tire and strider catalogs. **All ten seeds are
  unverified samples.**
- **No e-bikes *outside this surface* (rule 1, amended):** absolute. The MTB catalog is e-free
  forever; this is the only e-surface; §5 enforces both directions automatically.
- **No pop-ups (rule 2):** the future e-MTB page, like every page, loads straight to the data — never
  an auto-appearing interstitial. (Not exercised this round: bootstrap ships no page/nav/deploy.)

---

## 7. What this model deliberately does NOT do

- It does **not** invent a motor/battery/frame part-builder for a system nobody assembles from parts.
- It does **not** touch `index.html`, `src/compat.js`, `src/schema.js`, nav, or deploy — off-live,
  contained, additive-only (`validate.js` gets one new "EMTB OK" block; nothing existing changes).
- It does **not** fabricate `verified:true` rows — the ten seeds are best-credible SAMPLE specs,
  clearly marked unverified; a real verified grind is a later Douglas-gated phase.
- It does **not** go live, gain a page, or appear in any nav until Douglas's explicit flip word.

---

## 8. DECISION PACKET FOR DOUGLAS (short — decisions only, no spec detail)

1. **Engine shape (the one architecture call).** Recommend a **browse/compare/filter** surface over
   complete e-MTBs (like the complete-bikes view) — NOT a part builder. Motors/batteries/frames are
   OEM-locked, so there is no e-part-to-part fit to check. *Confirm browse/compare, or ask for a builder.*
2. **Go-live threshold.** How many models / what verified-% before the flip? (BMX used ~300 parts /
   ~40% verified. E-MTBs are completes, so far fewer rows — a ~60–100-model / X%-verified target is
   the natural analog. *Your number.*)
3. **Legal-class display.** Should the page surface US e-bike **Class (1/3)** and regional power/speed
   limits (EU 250 W·25 km/h vs US)? It is a compliance-flavored display choice; modeled as flaggable
   but **not built** this round. *Show it, or leave it off?*
4. **When to build the page.** This round is data + schema + validator + tests only. Say the word and
   the `emtb.html` page (BuildMyBMX pattern) gets built off-live for your review.

(No spec-level input is needed from you — the ten seed specs are worker-sourced and validator-checked.)
