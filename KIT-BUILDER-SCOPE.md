# Kit Builder — Scoping Document

**Date:** 2026-07-14 · **Status:** SCOPE ONLY — no code, no schema change, no catalog rows. ·
**Origin:** Douglas asked to start the **Kit Builder** — a rider gear/apparel builder alongside
the bike builder — on 2026-07-14. His words: *"Shoes, Pants/Shorts, Jersey's, Gloves, Helmets,
knee pads, body armour, elbow pads, etc."* The parts grind will later run as Sonnet background
chips, but **not until this round is done and he's made the product calls below.**

This document is decision-ready: recommendations are stated with reasons, and the closing
**§ Decisions for Douglas** lists only the calls he must make. Everything else is buildable as
written, in a later implementation round.

Sources read: `CLAUDE.md` (hard rules, data model, conventions), `src/schema.js`
(SCHEMA/VOCAB/cross-rule style — the single source of truth for valid data), `src/compat.js`
(GROUPS/SLOTS, `slotRequired`, `buildTotals`, the four-state pick dot), `tools/DATA-ENTRY-TEMPLATE.md`
(id recipe, split policy, weight/provenance conventions), `BUILDS-GALLERY-SCOPE.md` +
`data/DJ-BMX-COMPAT-ANALYSIS.md` (house scoping-doc format and the "own-engine vs fold-in" decision
that most closely rhymes with this one).

---

## 0. TL;DR

- **Kit is not a compatibility problem — it's a curated list with price + weight totals, cert
  badges, and discipline filtering.** Apparel items don't mechanically conflict with each other:
  there is **no error-tier engine for kit**, and therefore essentially **zero false-"won't fit"
  risk** — the thing the whole project is built to avoid. That single fact drives every
  recommendation here.
- **The one genuine cross-item fit fact is shoe cleat ↔ pedal style** (a clip/SPD shoe wants clip
  pedals; a flat shoe wants flat pedals). The bike build already carries `pedal.style`
  (`flat`/`clip`/`hybrid`). **Recommend building that single bridge as an advisory (info/warning),
  never an error** — and nothing else crosses between kit and bike.
- **The hard problem is sizing, and the honest answer is: one row per product with a *size-label
  list*, plus an optional per-brand *size chart* — NEVER a row per size, and never a universal
  cross-brand size claim.** A "Fox M" and a "TLD M" are different garments; the data model must not
  pretend otherwise.
- **Certification (CPSC / EN 1078 / ASTM F1952 for helmets; EN 1621-1/-2/-3 for pads and armor;
  MIPS et al. for rotational systems) is the closest thing to spec data — but it's a *property* of
  one item, not a *relation* between two.** So cert is a **filter + badge, never a verdict**, exactly
  like `disciplines` and `verified`. Because it's a safety claim, it follows the strict
  fetched-source tier (never inferred).
- **Architecture: integrated *data*, isolated *rules*.** Kit slots live in the same build map (one
  save, one share link, an optional combined "Bike + Kit" total), but `checkBuild` gains **no kit
  rules** except the one shoe↔pedal advisory, and every kit slot is **optional** (never gates a bike
  build's completeness). This is the DJ/BMX lesson applied: don't cram alien rules into the MTB
  engine.
- **Live-safe.** Unlike BMX (a genuinely alien engine, built off-live), kit adds no error-tier
  verdicts, so there is **no correctness reason to keep it off-live**. Recommend shipping it behind a
  `KIT_ENABLED` feature gate (the repo's established pattern) and flipping it live on Douglas's word.
- **Recommended initial category set (8):** helmet, shoes, jersey, shorts (incl. pants), gloves,
  knee pads, elbow pads, body armor. Socks + eyewear/goggles are cheap fast-follows; hydration packs,
  base layers, and neck braces are later/open.

---

## 1. Categories & scope

### 1a. Douglas's core list → recommended v1 categories

| Category | `cat` | Sizing axis | Carries cert? | Notes |
|---|---|---|---|---|
| **Helmet** | `helmet` | head circumference (cm) | ✅ CPSC / EN 1078 / ASTM F1952 + rotational | The anchor: everyone needs one, richest data. `type`: half-shell / full-face / convertible. |
| **Shoes** | `shoes` | numeric (EU, with US/UK) | — | Carries `cleat` (flat / clip) — **the one bike bridge** (§4). |
| **Jersey** | `jersey` | chest (cm) / S–XXL | — | Optional `sleeve` short/long. |
| **Shorts / Pants** | `shorts` | waist (cm) / S–XXL | — | One category; `length` short/long distinguishes shorts vs pants (see §1c). |
| **Gloves** | `gloves` | hand circumference / S–XXL | — | Full-finger is the MTB default. |
| **Knee pads** | `kneepad` | knee/thigh circ. / S–XXL | ✅ EN 1621-1 (L1/L2) | Sold + weighed **per pair**. |
| **Elbow pads** | `elbowpad` | elbow circ. / S–XXL | ✅ EN 1621-1 (L1/L2) | Per pair. |
| **Body armor** | `bodyarmor` | chest/torso / S–XXL | ✅ EN 1621-2 (back) / EN 1621-3 (chest) | `coverage`: back / chest / chest-back. |

### 1b. Proposed additions (OPEN — recommend cheap fast-follows, defer the rest)

| Candidate | `cat` | Sizing axis | Cert | Recommendation |
|---|---|---|---|---|
| **Socks** | `socks` | shoe-size band / S–XXL | — | **Fast-follow.** Trivial schema, low value; include once the core ships. |
| **Eyewear (sunglasses)** | `eyewear` | one-size | rare (ANSI Z87 / EN 166) | **Fast-follow.** Mostly display; a real gravity category. |
| **Goggles** | `goggles` | one-size | rare | **Fast-follow.** Pairs with full-face helmets — a candidate *info* bridge (§4), deferred. |
| **Hydration pack / hip pack** | `hydration` | **volume (L), not body fit** | — | **Later.** Different model entirely (capacity + reservoir liters); no body sizing. |
| **Base layer** | `baselayer` | chest (cm) | — | **Later.** Schema ≈ jersey; low priority. |
| **Neck brace** | `neckbrace` | S/M/L + fitment | maker-specific, no single standard | **Defer.** Niche DH (Leatt); no universal cert to badge honestly. |

**Recommendation:** ship the **8 core** categories first (helmet is the natural first data batch —
richest specs, richest cert). Treat **socks + eyewear + goggles** as a cheap second wave.
Hydration/base-layer/neck-brace wait for Douglas's word — hydration especially, because its
volume-based model doesn't reuse the apparel sizing schema and shouldn't distort it.

### 1c. Shorts vs pants — one category, not two

Shorts and pants share an identical sizing schema (waist/inseam) and cert profile (none). They are
**not two product classes** — they're one garment with a leg-length difference, the same way a tire's
EXO vs DH is a casing variant of *one* `tire` category, not two categories. **Recommend one `shorts`
category with an optional `length` field (`short`/`long`) and one build slot.** (Douglas may prefer
two visible slots for UI clarity — a minor call, §Decisions.)

---

## 2. What "compatibility" means here — almost nothing (and why that's the point)

The bike engine exists because bike parts genuinely don't fit: a 29″ tire won't seat a 27.5″ rim; an
XD cassette won't mount an HG driver. **Apparel has no equivalent.** A jersey and gloves never
conflict. A size-M helmet with a size-XXL jersey is not an error — riders have different head and
torso sizes. So three things that *look* like they might be engine rules are not:

1. **Cross-item sizing** — there is none. Sizing helps a rider pick the right size of **each item
   independently**; it never yields a kit-level verdict. (§3.)
2. **Certification** — it's a **property of one item** ("this helmet meets ASTM F1952"), not a
   **relation between two**. It's a filter + badge, exactly like `disciplines`/`verified`. It **never
   feeds a verdict.** (§2a.)
3. **The one real cross-item fit fact** is shoe cleat ↔ pedal style — and that crosses *into the bike
   build*, not within kit. It's an advisory at most. (§4.)

**Conclusion (load-bearing for the whole design): Kit ships with no `checkBuild` rules of its own.**
Its value is a curated, filterable, provenance-badged list with honest price + weight totals — plus
the single optional shoe↔pedal advisory. This is why kit is cheap, low-risk, and live-safe where BMX
was not.

### 2a. Certification mapping (which categories carry cert, and the vocab)

Certs are **real published standards** — enumerated like the tire `casing` vocab (brand/standard-native,
never invented). A single optional `certs` **enumArray** (mirrors `leverAccepts`/`soldWithout`) carries
them; a schema cross-rule restricts which tokens each category may hold.

| Category | Standard(s) | Proposed vocab tokens |
|---|---|---|
| **Helmet** | CPSC 1203 (US), EN 1078 (EU), ASTM F1952 (DH full-face) | `cpsc`, `en1078`, `astm-f1952` |
| **Helmet — rotational** | MIPS, WaveCel, SPIN, Leatt 360° Turbine, Koroyd (liner) … | separate `rotational` field (below) |
| **Knee / Elbow pads** | EN 1621-1 limb protector, **Level 1 / Level 2** | `en1621-1-l1`, `en1621-1-l2` |
| **Body armor — back** | EN 1621-2 back protector, **L1 / L2** | `en1621-2-l1`, `en1621-2-l2` |
| **Body armor — chest** | EN 1621-3 chest protector | `en1621-3` |
| Shoes / jersey / shorts / gloves / socks | none | — (field absent) |
| Eyewear / goggles | occasional ANSI Z87.1 / EN 166 | optional; usually absent |

- **Rotational systems** (MIPS and kin) are a **different axis** from the pass/fail impact standards,
  so they get their own optional `rotational` field, not a `certs` token. The exact vocab needs an
  **[EXPERT REVIEW]** pass to confirm the genuinely-distinct systems (MIPS vs WaveCel vs SPIN vs Leatt
  Turbine…) and to decide whether liner tech (Koroyd) belongs on this axis. **Absence = unknown, never
  defaulted to "none"** — asserting "no rotational system" is itself a claim.
- **Cert is a safety claim, so it follows the strict fetched-source tier even on otherwise-sample
  rows.** You may enter an unverified *sample* jersey from a retailer listing (Douglas's relaxed-
  inclusion policy), but you may **never** assert "EN 1621-2 Level 2" without a real maker/standards
  source. A false safety claim is worse than a missing one — the project bar, applied to safety.
- **UI use:** cert becomes a **filter** (e.g. "ASTM F1952 full-face" for a DH kit; "Level 2 back
  protector") and a **badge** on the part card (alongside the existing `✓ Verified` badge). It orders
  nothing and blocks nothing.

---

## 3. Sizing model — the hard problem, solved without lying

**The tension:** brands size differently (a Fox L ≠ a 100% L ≠ a Troy Lee L); shoes are numeric but
EU/US/UK diverge and still vary by brand; and the *measurement axis differs per category* (head cm vs
chest cm vs waist cm vs foot length). No single field is both truthful and universal.

| Option | What it is | Verdict |
|---|---|---|
| **A. Universal S/M/L enum** | One `size` vocab across all apparel | ❌ **Lies about comparability** (Fox M ≠ TLD M) and **can't represent shoes** (numeric) or helmet cm-bands. |
| **B. Single numeric field** | e.g. one `size` number per row | ❌ Different categories measure different things; not every brand publishes a number; forces a fake "M". |
| **C. Per-brand size chart** (the `frame.sizes` precedent) | Brand's own label→measurement map | ✅ **Truthful and category-correct** — but needs the maker's size guide, which isn't always published. |

**Recommendation — a hybrid built on the existing `frame.sizes` pattern:**

1. **`sizes`: the row's list of offered size *labels*** (free strings, **not** a vocab). Apparel:
   `["S","M","L","XL","XXL"]`; shoes: `["40","41","42",…]`; split gear: `["S/M","L/XL"]`; one-size:
   `["OSFA"]`. This is what the builder shows as the size picker. **Free strings on purpose** —
   brands use XS–XXXL, numeric, and split sizes; a vocab would block real data (the exact
   tire-casing lesson).
2. **`sizeChart` (optional, dormant-until-sourced): the brand's own label → body-measurement
   ranges.** e.g. `{ M: {chest:[96,101]}, L: {chest:[101,107]} }`. The **inner keys are
   category-appropriate** and schema-constrained (helmet→`head`; jersey/armor/baselayer→`chest`;
   shorts→`waist`; gloves→`hand`; shoes→`footLength`/`eu`) — exactly how `frame.sizes` is constrained
   to `seatTubeLen`/`maxInsert`. When present, the app can turn "my chest = 99 cm" into "this brand's
   M." **When absent, the app shows only the labels — an honest "M", with no false cross-brand
   claim.** This lands per-row as data arrives, the rule-18 template.

**The single most important data-model call for kit:** apparel **sizes are NOT separate rows**. A
jersey offered in six sizes is **one row** with a six-label `sizes` list — because size is not
fit-distinct against any *other* item, and splitting would multiply the catalog six-fold for zero
compat value. **This is the deliberate opposite of the bike-part split policy** (where a fit-distinct
SKU = a row), and it must be written into `DATA-ENTRY-TEMPLATE.md` before the grind starts, or a
worker will dutifully mint `jsy-fox-flexair-…-m`, `-l`, `-xl` and bloat everything.

- **Selected size is build-state, not a row.** The kit build references the part id (the product);
  the rider's chosen size rides alongside as an optional per-slot annotation (like a note), captured
  in the save/share payload. v1 can ship without it (pick the product; size is a display detail) and
  add it as a small follow-up.
- **Weight varies slightly by size.** Follow the entry-template weight convention: record the size
  the quoted weight is for in `desc` (helmets and pads vary meaningfully by shell/size), prefer the
  maker's stated size, and — where the maker publishes per-size weights — they live in `sizeChart`.
  Pads/armor weigh **per pair/set** (the pedals/grips convention).
- **Optional `fitCut`** (`mens`/`womens`/`unisex`): women's-specific cuts are real and change fit;
  worth an optional annotation + filter. Include v1 or defer — minor call (§Decisions).

---

## 4. Does Kit tie into the bike build? — the shoe↔pedal bridge

**Exactly one real cross-item link exists.** The bike build carries `pedal.style` ∈
`{flat, clip, hybrid}`. A shoe carries a cleat interface: **flat** (flat sole, no cleat) or **clip**
(2-bolt SPD recess — the MTB clipless standard). They pair:

| Shoe `cleat` | Pedal `style` | Verdict | Why |
|---|---|---|---|
| flat | flat | green | The intended pairing. |
| clip | clip | green | The intended pairing. |
| either | hybrid | green | Dual-sided pedals accept both. |
| **flat** | **clip** | **warning** | You physically stand on the pedal, but **can't clip in** — the clip mechanism is unusable. Pair with flat pedals. |
| **clip** | **flat** | **info** | Works fine; the cleat just goes unused (many riders simply don't fit one). |

**Recommendation: build this one bridge, as an advisory (info/warning), never an error, and only
when *both* a shoe and pedals are present in one combined build.** Reasoning:

- It's the product's core value proposition — *real cross-item fit awareness* — applied to gear. A
  builder that checks bike parts but stays mute when you put flat shoes on clipless pedals is leaving
  its best trick on the table.
- It's **mechanically unambiguous and low-risk** — no fuzzy standard, no false-"won't fit" (nothing
  here is an error; the shoe always sits on the pedal). That keeps it clear of the bar that blocks
  fuzzier rules.
- It's cheap: one guarded branch reading two fields.

**Tradeoff / the one caveat:** it couples the kit dataset to the bike engine. That's acceptable
*because the coupling is one small, well-understood, non-error advisory* — but it means the shoe must
be reachable in the same build map the check runs over (see §5, "integrated data"). Everything else
in kit stays fully independent of the bike.

Severities above are my recommendation; flag them for Douglas / the mechanic review (I lean:
flat-shoe-on-clip-pedal = **warning**; clip-shoe-on-flat-pedal = **info**; hybrid = silent). A second
candidate bridge — **goggles ↔ full-face helmet** (goggles are worn with full-face, sunglasses with
half-shell) — is real but weak (you *can* run goggles with a half-shell), so **defer it** as an
info-only nicety once helmets carry `type` and goggles exist.

---

## 5. Architecture — integrated data, isolated rules

Four questions, each answered decisively.

### 5a. Own section vs integrated build slots → **integrated *data*, isolated *rules***

The DJ/BMX analysis is the precedent that rhymes: **DJ folded into `checkBuild`** because it shared
12 rules; **BMX got its own engine** because its rules were alien and cramming them in risked leaking
assumptions into MTB verdicts. Kit is like BMX in being *alien to the bike compat rules* — but even
more inert, because it has **no intra-kit rules at all**. So the same logic says: **do not put kit
rules inside `checkBuild`.**

But the shoe↔pedal bridge wants the shoe and the pedals in **one build map**. The resolution — which
the codebase already demonstrates with the `bb`, `headset`, `cog`, and `seatpost` groups (each its
own group, each exempt from the usual completeness via `slotRequired`) — is:

- **Kit slots live in the same builder build map** as new optional GROUPS under a visually-separate
  **"Rider Kit"** rail section (helmet, shoes, jersey, shorts, gloves, knee, elbow, body-armor).
  One build = bike + kit → **one save, one share link, one payload** (and the bridge is trivial: both
  slots are already in the map).
- **`checkBuild` gains no kit rules except the shoe↔pedal advisory**, guarded on both slots present.
  No kit part is read by any of the 20 bike rule areas.
- **Every kit slot is `optional` in `slotRequired`** — a bike build is complete without a jersey. Kit
  gets its own soft "N pieces added" display if wanted, but it **never** blocks or alters the bike's
  completeness / verdict. (This mirrors how `bb`/`headset` slots are optional today.)
- **The pick-dot (`compatOf`) is green/grey for kit parts** — nothing a kit part can conflict with,
  except a shoe that trips the pedal advisory (which would dot yellow, honestly).

*Section vs separate tab:* I recommend the **in-builder "Rider Kit" section** (one page, one payload)
over a separate full-width "Kit" tab (like Forum/Guides), precisely because it makes the bridge and
the combined total free. A separate tab would re-introduce plumbing to link the two builds. Douglas's
call if he wants strict separation (§Decisions).

### 5b. Does Kit join `buildTotals`? → **a sibling `kitTotals`, plus an optional grand total**

`buildTotals` is bike-scoped and preset-aware (groupset/wheelset bundles). Kit has no bundles in v1
and shouldn't muddy "what does my **bike** cost" — the core number. **Recommend a sibling
`kitTotals(kitBuild)` that reuses the same per-part price/weight summation** (factor the shared
summation out of `buildTotals`; don't fork it — the tidy/unbreakable creed), presented as a separate
**"Kit: $X · Yg"** line, with an **optional combined "Bike + Kit"** grand total. Kit weight reuses the
same `partWeight`/`missingWeight` handling, so "weight incomplete" stays honest.

*Kit presets/bundles* (a brand's knee+elbow armor set, or helmet+goggles combo) are real and could
later become a `kitset` preset category on the groupset/wheelset pattern (with the same ≤-sum price
lint). **Defer to a later phase** — v1 enters individual pieces.

### 5c. Live vs off-live → **live-safe; ship behind a `KIT_ENABLED` gate**

CLAUDE.md hard rule 3 sends new *bike types* (BMX, striders) off-live because they carry
false-verdict risk. **Kit is not a bike type and carries no error-tier engine** — the worst it can do
is one info/warning advisory. So, unlike BMX, **there is no correctness reason to keep kit off-live.**
The right move matches the repo's convention for launch-timing control:

- **Kit categories go into `src/schema.js`** (SCHEMA/VOCAB/ID_PREFIX) — the single source of truth;
  no separate schema. Kit rows validate under `node validate.js` like everything else.
- **Kit data + slots + `kitTotals` + the bridge helper live in a new `src/kit.js`**, loaded by
  `index.html` alongside `compat.js` (keeping the bike engine file focused; mirrors how
  `account.js`/`config.js` are separate concerns). Deploy already ships `index.html` + `src/`, so no
  deploy-workflow change is needed (contrast the root-`.html` legal-pages `cp` gotcha).
- **UI gated on `KIT_ENABLED`** (a committed constant, exactly like `ACCOUNTS_ENABLED`/`FORUM_ENABLED`
  and `REPORT_REPO`). Build it, land it, flip it live on Douglas's word.

(This differs from DJ, which was authored in an off-live `data/dirt-jump.js` and folded into `PARTS`
at go-live only because it *did* touch the engine. Kit touches the engine so little that authoring it
live-behind-a-gate is cleaner than a separate off-live dataset.)

### 5d. Id-prefix conventions

Extend `ID_PREFIX` with collision-free slugs (existing taken: fr fk sh fw rw ti fh rh rm sft dr ca ch
cr cg sp bk ro hb st gr dp sa pd bb hs gs ws bs co). Proposed:

| Category | Prefix | Category | Prefix |
|---|---|---|---|
| helmet | `hm` | body armor | `arm` |
| shoes | `sho` | socks | `sck` |
| jersey | `jsy` | eyewear | `ewr` |
| shorts | `sht` | goggles | `gog` |
| gloves | `glv` | hydration | `hyd` |
| knee pad | `knp` | base layer | `bsl` |
| elbow pad | `elp` | | |

Id shape stays `<prefix>-<brand>-<model…>[-variant]`, append-only, ≥3 tokens, brand = one slug.
**Crucially, ids carry NO size token** (size is a per-row label list, not a fit-distinct SKU) and no
color token (color is never fit-distinct — the bike convention). Kit rows therefore have **few or
zero variant tokens** — the SKU-splitting axes bike parts have (wheel/travel/casing) mostly don't
exist here. The rare legitimate variant token is a genuinely fit-distinct construction difference
(e.g. a helmet sold in MIPS and non-MIPS versions = two rows, `-mips`; a short sold in distinct
inseams as separate products, `-long`).

---

## 6. Schema shape (specification only — do NOT implement)

Sketched in `schema.js` style. This is a spec for a later round, not a change to make now.

### 6a. New `VOCAB` entries

```
helmetType:     ['half-shell', 'full-face', 'convertible']   // convertible = removable chin bar
cleat:          ['flat', 'clip']                             // maps onto pedalStyle for the bridge
protectionCert: ['cpsc', 'en1078', 'astm-f1952',             // helmet
                 'en1621-1-l1', 'en1621-1-l2',               // limb (knee/elbow)
                 'en1621-2-l1', 'en1621-2-l2', 'en1621-3']   // body armor (back / chest)
rotational:     ['mips', 'wavecel', 'spin', '360-turbine', 'koroyd']   // [EXPERT REVIEW] — extensible; absence = unknown
garmentLength:  ['short', 'long']                            // shorts vs pants, if one category
fitCut:         ['mens', 'womens', 'unisex']                 // optional fit annotation
```
All are additive and **inert for the bike catalog** (no bike part references them), the same way the
DJ vocab landed inert. `disciplines` (`xc/trail/enduro/dh/dj`) already exists and is reused verbatim
to tag kit (a DH full-face, XC-weight gloves) — filter/annotation only, never a verdict, exactly as
for bike parts.

### 6b. New `SCHEMA` categories (fields; `?` = optional, dormant-until-sourced where noted)

```
helmet:    { type:helmetType, certs?:enumArray<protectionCert>, rotational?:rotational,
             sizes?:sizeList, sizeChart?:sizeChart<head> }
shoes:     { cleat:cleat, sizes?:sizeList, sizeChart?:sizeChart<footLength|eu> }   // cleat feeds the bridge
jersey:    { sleeve?:['short','long'], fitCut?:fitCut, sizes?:sizeList, sizeChart?:sizeChart<chest> }
shorts:    { length:garmentLength, fitCut?:fitCut, sizes?:sizeList, sizeChart?:sizeChart<waist> }
gloves:    { sizes?:sizeList, sizeChart?:sizeChart<hand> }
kneepad:   { certs?:enumArray<protectionCert>, sizes?:sizeList, sizeChart?:sizeChart<knee> }   // per pair
elbowpad:  { certs?:enumArray<protectionCert>, sizes?:sizeList, sizeChart?:sizeChart<elbow> }  // per pair
bodyarmor: { coverage?:['back','chest','chest-back'], certs?:enumArray<protectionCert>,
             sizes?:sizeList, sizeChart?:sizeChart<chest> }
// fast-follow / open:
socks:     { sizes?:sizeList }
eyewear:   { certs?:enumArray<protectionCert>, ... display }      // mostly display
goggles:   { ... display }                                        // full-face bridge deferred
hydration: { capacity:number /* liters */, reservoir?:number }    // volume-sized, NOT body fit
baselayer: { fitCut?:fitCut, sizes?:sizeList, sizeChart?:sizeChart<chest> }
```

- **`sizeList`** = a new field type: a non-empty array of free-string size labels (validated as
  non-empty strings, NOT against a vocab). **`sizeChart`** = a new sub-object type mirroring
  `frame.sizes`: `{ <label>: { <measure>: [lo,hi] | number } }`, with the allowed inner `<measure>`
  keys constrained **per category** (the `frame.sizes`→`seatTubeLen`/`maxInsert` precedent).
- Every kit category also carries the `COMMON` kit (`id/cat/brand/model/price/weight/desc`, the
  `family`/`gen`/`modelYear`/`mfgPn` identity fields, provenance trio, `disciplines`, `image`/`colors`/
  `retailerLinks`) unchanged.

### 6c. Cross-rules (schema-level, in the style of the shock/headset cross-rules)

- **cert-token ↔ category:** a `helmet`'s `certs` may hold only `cpsc`/`en1078`/`astm-f1952`; a
  `kneepad`/`elbowpad` only `en1621-1-*`; `bodyarmor` only `en1621-2-*`/`en1621-3`. (Blocks a jersey
  carrying a cert, or a helmet carrying a back-protector cert — a typo'd safety claim.)
- **`rotational` only on helmets**; **`cleat` only on shoes** (it's the bridge input).
- **`sizeChart` inner keys constrained per category** (helmet→`head`, jersey/armor/baselayer→`chest`,
  shorts→`waist`, gloves→`hand`, shoes→`footLength`/`eu`) — reject a mismatched measure.
- **`length` required on `shorts`** (or defaulted to `short` if absent) if shorts/pants share the
  category.
- **Contract assertion (like `disciplines`):** no kit field — sizing, cert, cleat — ever feeds a bike
  compat verdict, except the one shoe↔pedal advisory below.

### 6d. The single engine touch

- **`kit-shoe-pedal`** advisory (info/warning per §4), guarded on both the `shoes` and `pedals` slots
  being present. Land it with the same structured-verdict shape (`{ruleId, slots, msg}`) and its own
  test cases (`test-engine.js`), following the dormant-until-tripped template. **This is the only
  place kit code touches `checkBuild`.**

### 6e. Conventions honored (for the eventual UI round)

- **Plain browser JS, no build step** — `src/kit.js` loads via a classic `<script>`, no ESM/bundler.
- **No pop-ups (hard rule 2)** — every kit surface is click-triggered. A **size chart opens on a
  click** (a user-opened card, like a part's spec card), never an auto-appearing modal. No
  "what's your size?" interstitial, ever.
- **Unbiased (doubled value)** — kit ordering/featuring is **never** influenced by affiliate links or
  which retailer stocks an item, identical to the catalog and the gallery bias line. Cert badges and
  sizing are the only ranking-relevant signals, and they're user-meaningful, not monetization.
- **Provenance** — kit rows use the same `verified`/sample tiers. Helmets often publish weight; pads
  sometimes; jerseys rarely — so many rows will be **honest unverified samples** (the relaxed-
  inclusion policy). Sizing charts come from the maker's size-guide page. **Cert claims are the
  strict exception: fetched-source only, never inferred** (§2a).

---

## 7. Effort & build order (for the implementation round)

**MVP — size: MEDIUM.** New categories + vocab + the `sizeList`/`sizeChart` field types in
`schema.js`; `src/kit.js` (KIT_GROUPS/SLOTS + `kitTotals` + the bridge); the "Rider Kit" rail section
+ size picker + cert badges/filters in `index.html`; the `KIT_ENABLED` gate; tests. Every hard
primitive already exists (card UI, provenance badges, disciplines filter, share/save payload,
`partWeight`, the four-state dot).

1. Schema: kit cats + VOCAB + `sizeList`/`sizeChart` types + cross-rules (+ `DATA-ENTRY-TEMPLATE.md`
   the **no-row-per-size** rule and the kit id/prefix table — *before any grind*).
2. `src/kit.js`: KIT_GROUPS/SLOTS (all optional), `kitTotals` (shared summation), `kit-shoe-pedal`.
3. UI: "Rider Kit" rail section, size picker, cert badge + filter, kit total + optional grand total.
4. Tests: kit rows validate; `kitTotals` matches summation; size-list round-trips through the
   save/share sanitizer; the shoe↔pedal advisory fires only when both slots are present; cert-token
   cross-rules reject mis-tagged rows.
5. Flip `KIT_ENABLED` on Douglas's word; **then** spawn the Sonnet data-entry chips per category.

**Later:** selected-size in the payload · `kitset` bundles · socks/eyewear/goggles wave ·
goggles↔full-face info · hydration (volume model) · a size-recommender UI once `sizeChart` data
accumulates.

---

## § Decisions for Douglas

Recommendations first; only these need his call. Everything else is buildable as written.

1. **Initial category set.** *Recommend:* ship the **8 core** (helmet, shoes, jersey, shorts+pants,
   gloves, knee, elbow, body armor); **socks + eyewear + goggles** as a cheap fast-follow;
   **hydration / base layers / neck braces** deferred. → *Confirm the v1 set and what (if anything) to
   pull forward or drop.*
2. **Sizing model sign-off (the load-bearing call).** *Recommend:* **one row per product** with a
   **size-label list** + an optional **per-brand size chart**; **NEVER a row per size**; **no
   universal cross-brand size claim.** → *Confirm — this shapes the whole catalog and the grind
   instructions.*
3. **The shoe↔pedal bridge.** *Recommend:* **build it** as an advisory — flat-shoe-on-clip-pedal =
   **warning**, clip-shoe-on-flat-pedal = **info**, hybrid = silent; **never an error**; fires only
   when both are in the build. → *Build it or keep kit fully independent? Confirm the severities.*
4. **Architecture: section vs tab.** *Recommend:* an in-builder **"Rider Kit" section** (one
   save/share payload; combined "Bike + Kit" total available) with **no kit rules in `checkBuild`**
   and every kit slot optional. → *Confirm the in-builder section vs a separate Kit tab.*
5. **Totals.** *Recommend:* a separate **"Kit total"** plus an optional **"Bike + Kit" grand total**
   (bike total stays the headline number). → *Confirm you want the combined number shown.*
6. **Launch gating.** *Recommend:* build it **live-capable behind a `KIT_ENABLED` gate** and flip on
   your word — there's **no off-live requirement** here (kit has no error-tier engine, unlike BMX).
   → *Confirm gate-and-flip vs off-live authoring.*
7. **Certification = filter + badge, never a verdict** — and **cert claims are fetched-source only**
   (a safety claim). The exact **rotational-systems vocab** (MIPS/WaveCel/…) wants an expert-review
   confirm. → *Confirm the badge/filter treatment; OK to seed the rotational vocab pending expert
   review?*
8. **Minor calls (pick or defer):** (a) **shorts + pants = one category** with a `length` field
   (recommended) vs two slots; (b) include **`fitCut`** (mens/womens/unisex) in v1 (recommended) vs
   defer; (c) **`kitset` bundles** deferred to a later phase (recommended). → *Any objection?*
9. **Grind kickoff.** The Sonnet data-entry chips stay **unspawned until you've made the calls above**
   (per the directive). Helmet is the recommended first batch (richest spec + cert data). → *Say go,
   and in what category order.*

---

*Scoping only — no code, no schema, no catalog rows; the only artifact is this document on branch
`scope/kit-builder`. Prepared 2026-07-14. The implementation round decides final field names and DDL;
this round decides the shape and the product calls.*
