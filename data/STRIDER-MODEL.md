# STRIDER-MODEL.md — Balance-bike ("strider") data model (OFF-LIVE research + design doc)

**Status: OFF-LIVE.** This document is a design round for a future kids' balance-bike product
line. Nothing here is wired into the live app (`index.html`, `src/compat.js`, `src/schema.js`),
and no catalog rows are created by this round — it is docs only. Balance bikes are a niche
Douglas has flagged to **NAIL**, to live behind a **separate page + button** (the BuildMyBMX
precedent), **OFF-LIVE until his explicit word.** Read the companion **`data/STRIDER-ANALYSIS.md`**
first — it makes the product argument (builder vs. fit-guide vs. both) that this model implements,
and it holds the **DECISIONS FOR DOUGLAS** list. This doc is the data-model spec.

Date: 2026-07-17. Templates followed: `data/BMX-MODEL.md`, `data/DJ-BMX-COMPAT-ANALYSIS.md`.

> **NO E-BIKES.** Rule 1 is trivially satisfied here and stays absolute: balance bikes are
> unpowered by definition — no motor, battery, or e-anything appears anywhere below, and no
> "e-strider" is ever added. (Powered ride-ons for toddlers exist in the wider toy market; they
> are explicitly out of scope, permanently, absent Douglas's word — same posture as rule 1 for MTB.)

---

## 1. The one fact that reshapes everything: a balance bike is a COMPLETE-BIKE purchase

TrailBuilder / BuildMyBMX / the DJ engine are all **part-to-part compatibility checkers** — the
value is "will this fork fit this frame, will this BB take this crank." **A balance bike has almost
no part-to-part surface to check:**

- **No drivetrain at all.** No chain, cassette, derailleur, crank, bottom bracket, shifter,
  pedals. The single biggest chunk of the MTB/BMX engines is simply *absent*. There is nothing to
  "build."
- **Wheels, tires, fork, bars are model-integral.** A parent does not shop a separate wheelset or
  fork for a woom 1. The bike is sold, and ridden, as a finished unit.
- **Brakes are trivial or absent.** Many (all Striders) ship **brakeless**; premium ones add **one
  rear hand brake** (woom, Cannondale, Prevelo) or **dual hand brakes** (woom 1 PLUS, LittleBig).
  There is no caliper-mount matrix to police.
- **The only parts ever swapped** are a **longer/XL seatpost** (to buy more growth) and maybe
  grips — negligible.

So the central design decision this model makes (argued in full in the ANALYSIS): **the primary
catalog entity is a whole balance bike, not a kit of components, and the "engine" checks
RIDER-to-BIKE FIT (does this bike fit this child, now and for how long), not PART-to-PART
compatibility.** That is a genuinely different engine shape from every existing TrailBuilder
engine — and it is the honest one for this niche.

There is exactly **one** real part-to-part rule worth modeling (§6): **pedal-conversion kits**
("balance-to-pedal" bikes — Strider 14x + pedal kit, LittleBig, Prevelo Balance-Tec). A pedal kit
fits only the specific bikes it was made for. That is the lone genuine compatibility check in the
whole niche, and it is optional.

---

## 2. Market map + fetchability (fetched this round)

Douglas named Strider, woom, Cannondale, Specialized. The wider niche is ~25 brands. Fetchability
was mapped live this round (fetch doctrine: WebFetch → Exa → Bright Data):

| Brand (host) | WebFetch | Exa | Bright Data | Notes / best route |
|---|---|---|---|---|
| **Strider** (striderbikes.com, BigCommerce) | ❌ 403 | ❌ live-crawl timeout | ⚠️ works for nav/taxonomy; **product spec tables are JS-rendered** (category pages list products, not specs); a guessed `/pages/sizing` 404'd | Get Strider's spec tables from the aggregators (Ready Set Pedal, twowheelingtots) which carry them cleanly |
| **woom** (woom.com) | ⚠️ 302 → SPA shell (thin) | ✅ **full geometry + size ladder** via `/en_US/products/<slug>` | untested | Exa search → the `/en_US/products/` URL is the reliable route |
| **Specialized** (specialized.com) | ❌ 403 | ⚠️ direct live-crawl **times out**; **Exa *search* returns cached full spec pages** (Hotwalk, Hotwalk Carbon, multiple model years/regions) | ⚠️ returns content but a **stale `p/<id>` resolves to the wrong product** (a Hotwalk id served a Rockhopper page) | Resolve the live `p/<id>` slug via Exa search first, then read |
| **Cannondale** (cannondale.com) | untested | ✅ **full product page + geometry** | untested | Cleanest of the four majors; Exa direct read works |
| **Aggregators** (twowheelingtots, readysetpedal, rascalrides, cascadegearreviews, nytimes/wirecutter, downtown-mag, littlebigbikes) | ✅ | ✅ | — | **The single best cross-brand, normalized spec + seat-height + weight source.** These review sites ARE the tool parents use today (see ANALYSIS §1) |

**Lesson (worth a memory):** for balance-bike specs, the review aggregators are more reliable and
more *normalized* than the manufacturer pages (which are walled and JS-heavy). Manufacturer pages
are still the provenance source of record for a `verified:true` row; the aggregators are the fast
map. Same "only a fetched maker page counts for `verified`" bar as the rest of the catalog.

### Sample market data gathered this round (illustrative — for the ANALYSIS, not live rows)

| Bike | Wheel | Seat height | Weight | Tires | Brake | Steer limiter | Price | Source |
|---|---|---|---|---|---|---|---|---|
| woom 1 / GO 1 | 12" | 10.4–14.4″ | 6.6 lb | air | rear hand | ✅ | $249 | woom.com (Exa) |
| woom 1 PLUS / GO 1 PLUS | 12" | 14.8–18.7″ | 9.6 lb | air | dual hand | ✅ | $299 | twowheelingtots |
| Strider 12 Classic | 12" | 11–16″ | 6.7 lb | foam | none | ✗ | $89.99 | readysetpedal |
| Strider 12 Sport | 12" | 11–17″ (19″ XL post) | 6.7 lb | foam | none | ✗ | $119.99 | readysetpedal |
| Strider 12 Pro | 12" | 11–16″ | 5.3 lb (alu) | foam | none | ✗ | $169.99 | readysetpedal |
| Strider 14x (+ pedal kit) | 14/16" | 15–22″ | 12.5 lb | air | coaster (w/ kit) | ✗ | $249 + $89 kit | twowheelingtots/rascalrides |
| Specialized Hotwalk | 12" | 12.2–17″ | 9 lb | air/airless | **none** | ✗ | $269–299 | specialized.com (Exa) |
| Specialized Hotwalk **Carbon** | 12" | ~13–17″ | **4 lb 6.5 oz** | air | none | ✗ | **$1,000** | specialized.com (Exa) |
| Cannondale Kids Trail Balance | 12" | (kids 94–107 cm) | 8.6 lb | air | rear hand | ✗ | ~$180 | cannondale.com (Exa) |
| Prevelo Alpha Zero | 12" | 10.75–14.6″ | 6.9–7.4 lb | air | rear hand | ✗ | $239–259 | twowheelingtots/cascade |
| Early Rider Big Foot 12 | 12" | 12.2–16.1″ | 8.3 lb | knobby air | kid V-brake | ✅ | $269 | cascade/downtown-mag |
| Frog Tadpole Mini | **10"** | **9.5–12.3″** | 7.6 lb | air | rear hand | ✅ | $300 | cascade |
| Retrospec Cub / Cub Plus | 12" | 11.5–15″ | 7 / 8.7 lb | foam / air | none / hand | ✗ | $79 / $119 | twowheelingtots |
| Guardian | 12" | 12.5–16″ | 8.5 lb | air | SureStop hand | ✅ | $149 | twowheelingtots |
| Giant Pre rCarbon | 12" | — | **5.1 lb** (carbon) | air | — | — | €599 | downtown-mag |
| LittleBig (3-in-1) | 14" | 12–20″ | 10.2 lb bal / 13.8 lb pedal | air | dual hand | ✗ | $295 + $95 | littlebigbikes/rascalrides |

(Price bands: **budget $79–120 · mid $150–270 · premium $240–350 · halo carbon $600–1,000.**
Seat height spans **9.5″ (Frog Tadpole Mini) to 22″ (Strider 14x)** — a >2× range that is the
*entire* fit story. See ANALYSIS §2 for why seat height, not wheel size, is the sizing axis.)

---

## 3. The sizing science parents actually need (the load-bearing data)

Every reputable guide (twowheelingtots, Ready Set Pedal, Early Rider, REI, Wirecutter) converges on
the same facts. These are the *product's* reason to exist — the model is built to compute them.

1. **Fit is set by INSEAM → SEAT HEIGHT, not by wheel size or age.** "Wheel size is typically not a
   good indication of a balance bike's size" (twowheelingtots). Two 12″ bikes can have completely
   different seat ranges (woom 1 starts at 10.4″; a Guardian at 12.5″ — a 2″ gap that decides
   whether an 18-month-old can ride at all).
2. **The rule:** minimum seat height should sit **~0.5″–1.5″ BELOW the child's inseam** (feet plant
   flat, knees slightly bent — the "athletic stance" that lets them run the bike). A 13″ inseam
   wants a min seat height **≤ ~12.5″**.
3. **Growth room:** maximum seat height should be **≥ inseam + ~2″** so the bike lasts. The
   headline metric a parent cares about is the **adjustable range** (seatMax − seatMin) →
   "how many years does this bike last." woom's ~5″ of range and Strider's 11″→17″(→19″ XL) are
   marketed exactly on this.
4. **Weight ≤ 30% of the child's body weight** (Cannondale states its own "Kid-Correct Weight ≤
   30–40%"; twowheelingtots uses 30%). A 30 lb toddler wants a **≤ ~7–9 lb** bike. This is why the
   carbon (4.4 lb) and alloy (6.6 lb) bikes command a premium and the 12.5 lb Strider 14x is "a bit
   heavy for a balance bike."
5. **"Don't buy a size up."** A well-documented parent mistake (multiple guides call it out): a bike
   whose min seat is above the child's inseam can't be ridden safely and kills the confidence the
   balance-bike stage is meant to build.
6. **Standover** (top-tube/frame height at step-through) should also clear the inseam; a **very low
   standover** (woom/Guardian ≈ 7″) is what lets the youngest toddlers mount unaided.

Secondary decision axes (comparison filters, not hard fit): **tire type** (air = grip+cushion but
heavier/maintenance; foam = light, puncture-proof, less grip), **brake** (none / rear hand / dual
hand / coaster — and lever reach sized for small hands), **footrest** (present on Strider/Specialized;
a convenience, occasionally a shin-snag concern), **steering limiter** (an O-ring/limiter that
prevents front-wheel jackknife — woom/Guardian/Early Rider have it; Strider/Prevelo do not, on the
view that kids self-limit), **frame material** (aluminum/steel/carbon/wood), **pedal-conversion**
(does it grow into a pedal bike).

---

## 4. Category schema (proposed) — a whole bike is the primary row

Mirrors the catalog's field conventions (`id, brand, model, price` USD sample, `weight` grams
sample; optional identity `family`/`modelYear`/`mfgPn`; provenance `verified`/`lastChecked`/
`source`/`sourceType` under the **same contract** — `verified:true` only with a fetched maker URL +
non-future date). Lengths canonical in **mm** (project convention) but **displayed in inches + cm**
(the units parents use).

**`cat:'balancebike'` — the complete bike (the primary and, for MVP, essentially only entity):**

| Field | Type / vocab | Role |
|---|---|---|
| `wheel` | `'10'`\|`'12'`\|`'14'`\|`'16'` (+ `'8'` for baby/Bella-Velio) | display + coarse class; **NOT the fit axis** |
| `seatMin` / `seatMax` | number, mm | **THE fit fields** — feed the fit engine |
| `standover` | number, mm (optional, sourced) | low-standover mount check (info) |
| `bikeWeight` | number, g | the 30%-of-child check + display (lb) |
| `weightLimit` | number, g (rider max) | display / upper age guard |
| `tire` | `'air'`\|`'foam'`\|`'rubber-foam'`\|`'solid-rubber'` | comparison filter (display) |
| `tireWidth` | number, inches (optional) | display (2.0–2.4 knobby vs slick) |
| `brake` | `'none'`\|`'rear-hand'`\|`'dual-hand'`\|`'coaster'`\|`'rear-hand+coaster'` | comparison filter; **never required** (brakeless is valid & common) |
| `brakeReach` | `'short'`\|`'standard'` (optional) | small-hands note (display) |
| `footrest` | bool | comparison filter |
| `steeringLimiter` | bool | comparison filter |
| `frameMaterial` | `'aluminum'`\|`'steel'`\|`'carbon'`\|`'wood'`\|`'composite'`\|`'magnesium'` | display |
| `ageMin` / `ageMax` | number, months (maker-stated) | display only (fit is inseam-driven) |
| `heightMin` / `heightMax` | number, mm (maker-stated) | display only |
| `convertsToPedal` | bool | the balance-to-pedal axis |
| `pedalKit` | id \| null | the one real part-fit link (see §6) |
| `adjustRange` | derived (`seatMax − seatMin`) | **headline "grows-with-you" metric** |
| `quickReleaseSeat` | bool (optional) | tool-free adjust (display) |

**Optional secondary categories (only if any "builder" flavor is wanted — see ANALYSIS §4; the
conservative MVP omits all of them, per "a missing category beats a noise category"):**

- **`cat:'pedalkit'`** — converts a balance-to-pedal bike: `fitsModels` (array of balancebike ids),
  `addedWeight` (g), `brakeAdded` (`'coaster'`\|`'freewheel'`\|`'none'`), `price`. **The lone real
  compatibility rule lives here** (§6).
- **`cat:'seatpost'`** (balance-bike variant) — replacement/XL post to extend `seatMax`:
  `diameter` (mm), `length` (mm), `fitsModels` (or a `diameter`-match check). Marginal.

(Deliberately NOT modeled for MVP: grips, saddles, wheels, forks as separate rows. There is no
aftermarket "build" market for them; adding them would be noise, contradicting the catalog's
"a missing rule beats a wrong one" posture.)

### Entity/slot list (proposed)

The balance-bike "build" is **one primary slot** plus at most one optional kit:

`bike` (required) · `pedalKit` (optional, only offered when `bike.convertsToPedal`) ·
`seatpost` (optional, replacement/XL) · a **rider profile** (`inseam`, optional `weight`, optional
`age`) that is an *input to the fit engine*, not a catalog slot.

This is the structural break from MTB/BMX: **there is no 20-slot build map. There is one bike and a
rider.** The tool's job is matching, not assembling.

---

## 5. The fit engine (`checkBalanceFit`) — rider-to-bike, not part-to-part

A small function `checkBalanceFit(bike, rider, kit?)` → `{errors, warnings, infos}` of the same
structured `Verdict {ruleId, slots, msg, fix?}` shape the MTB/BMX engines return (reuse
`Verdict`/`verdictKey` — shared primitives, not copied; same as `compat-bmx.js`). Rules, all
**dormant until the rider supplies an inseam** (no rider input = pure spec-comparison mode, no
verdicts — exactly the "missing data → silent, never guess" posture):

| ruleId | Fires when | Tier | Message shape |
|---|---|---|---|
| `fit-seat-min` | `bike.seatMin > rider.inseam` | **error** | "Min seat 12.5″ is above your child's 12″ inseam — they can't plant their feet. Too big." |
| `fit-seat-marginal` | `seatMin` within ~0.5″ of `inseam` (no room for knee bend) | warning | "Just fits — little knee bend; they'll be more comfortable soon or on a lower-seat bike." |
| `fit-grow-room` | `bike.seatMax − rider.inseam` small **or** large | info | "≈ N months/years of growth room before max seat." (direction-aware, encouraging both ways) |
| `fit-weight` | `bike.bikeWeight > 0.30 × rider.weight` (weight optional) | warning | "At X lb the bike is >30% of a Y-lb child — heavy to lift and control." |
| `fit-standover` | `bike.standover > rider.inseam` (sourced only) | info | "Standover slightly above inseam — check they can step over comfortably." |
| **`pedalkit-fit`** | a `pedalKit` chosen whose `fitsModels` excludes `bike.id` | **error** | "This pedal kit fits only <models>; it won't fit this bike." (**the one real part-to-part rule**) |

The four-state pick dot (`compatOf`) maps naturally to **whole-bike fit**: green = fits with growth
room, yellow = marginal (a `fit-seat-marginal`/`fit-weight` warning), red = too big/small
(`fit-seat-min` error), grey = no inseam entered. Same UI grammar as the live app, applied to bikes
instead of parts. Price/weight "totals" collapse to the single bike's price + weight (+ kit if
chosen) via a trivial `balanceBuildTotals`.

**Architecture:** own tiny engine in a new off-live `src/compat-balance.js`, sharing the MTB
`Verdict`/`verdictKey` primitives — the same call the BMX doc made (its §3), and *more* clear-cut
here: balance bikes share **zero** rules and operate on **complete bikes + a rider profile** rather
than a slot map, so folding them into `checkBuild` would be all cost and no reuse. Clean on-ramp to
a future `buildmyfirstbike`-style split (ANALYSIS §6).

---

## 6. The one real compatibility rule: pedal-conversion kits

A meaningful slice of the market is **balance-to-pedal ("convertible") bikes**: Strider 14x + Easy-Ride
pedal kit, LittleBig 3-in-1, Prevelo Alpha + Balance-Tec, Wishbone 3-in-1, Black Mountain Pinto,
RoyalBaby snap-on. The universal fact (stated bluntly by every reviewer): **"You cannot add pedals
to just any balance bike. These pedal kits only work with the bikes they're made for."**

That is a genuine, non-fuzzy part-to-part compatibility check — the `pedalkit-fit` error above,
keyed on `pedalKit.fitsModels`. It is the single place the balance-bike tool does real "does-this-
bolt-on" work, and it doubles as a nice upsell/education surface ("this bike grows into a pedal bike
— here's the kit"). It stays **optional and dormant** until convertible rows + a pedal-kit row exist,
per the project bar. (Gear ratio, Q-factor, crank length in pedal mode are **display-only** tuning
facts, never fit verdicts — same posture as BMX gear ratio.)

---

## 7. Provenance & the "no e-bikes / no pop-ups" rules

- **Provenance:** identical contract to the live catalog. `verified:true` requires a fetched
  manufacturer page + non-future `lastChecked` + `source`. Because maker pages are walled/JS-heavy
  (§2), expect a `sourceType:'measured'` path for weights (a reputable review site's *measured*
  weight, interfaces/specs still maker-sourced) — the same relaxation the Shimano/rotor classes use.
- **No e-bikes (rule 1):** absolute, trivially met — nothing powered, ever, absent Douglas's word.
- **No pop-ups (rule 2):** the balance-bike page, like every page, loads straight to the data. The
  fit finder is a click-driven form the parent fills in themselves — never an auto-appearing
  interstitial. (A "tell us your child's inseam" prompt must be an inline panel the user opens, not
  a pop-up on load.)

---

## 8. What this model deliberately does NOT do

- It does **not** invent a 20-slot component build for a bike nobody builds from parts.
- It does **not** fabricate seat-height/weight specs — missing data leaves a field blank and the
  fit engine silent, never a guessed verdict.
- It does **not** require a brake (brakeless is a valid, complete, common balance bike — same
  confirmed stance as DJ/BMX).
- It does **not** go live. OFF-LIVE until Douglas's word (hard rule 3 + his directive).

**Open questions for Douglas live in `data/STRIDER-ANALYSIS.md` → "DECISIONS FOR DOUGLAS."**
