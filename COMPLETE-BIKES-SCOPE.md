# Complete Bikes — Scoping Document

**Date:** 2026-07-14 · **Status:** SCOPE ONLY — no code, no schema change, no catalog rows. ·
**Origin:** Douglas wants **Complete Bikes** — whole, rideable builds you can buy assembled (his
worked example: the *Specialized Stumpjumper 15 Alloy FOX Coil*, whole-bike price **$4,099.99**,
[product page](https://www.specialized.com/us/en/stumpjumper-15-alloy-fox-coil/p/4257786)). Two
requirements are LOCKED (design around them, don't re-litigate):

1. **Pick a complete bike → it AUTO-FILLS every slot** in the right-hand "Your Build" panel
   (frame, fork, shock, wheels, tires, drivetrain, brakes, cockpit, dropper, saddle, pedals …).
2. **Two prices shown:** (a) the **component total** — the à-la-carte sum of the individual parts
   bought separately (much higher), computed the normal way; (b) the **"Purchased Complete Build"
   price** — the maker's whole-bike figure ($4,099.99). The value insight: **buying complete is
   cheaper than à-la-carte.**

This document is decision-ready: recommendations are stated with reasons, and the closing
**§ Decisions for Douglas** lists only the calls he must make. Everything else is buildable as
written, in a later implementation round.

Sources read: `CLAUDE.md` (data model, the PRESET system, hard rules, provenance, conventions);
`src/compat.js` (`GROUPS`/`SLOTS`, `slotRequired`, `PRESETS`, **`bundleActive` + `buildTotals`**,
`compatOf`, `checkBuild`, the `applyPreset` precedent); `src/schema.js` (`SCHEMA`/`PRESET_CATS`, the
**`fills` field validator**, the **preset ≤-sum price lint** and "weight-derived-from-fills" rule);
`index.html` (build-panel render, `applyPreset`, `presetBy`, the dual number line); `test/test-golden.js`
(whole real bikes that validate clean — the direct precedent, incl. a **Stumpjumper 15** golden build);
`KIT-BUILDER-SCOPE.md` + `BUILDS-GALLERY-SCOPE.md` (house scoping-doc format, the feature-gate + provenance
posture). Live build sheet cross-checked against fanatikbike.com / vitalmtb.com / 99spokes.com /
flowmountainbike.com (specialized.com is fetch-walled — the documented Specialized blocker).

---

## 0. TL;DR

- **A complete bike IS a whole-build preset.** The repo already has the exact machinery: presets carry
  a `fills` map (slotKey → partId) + a stored `price`, and `buildTotals` already produces the à-la-carte
  component sum. **Recommend a new `completebike` preset category** — a `fills` map covering ALL build
  slots + a stored whole-bike `price` (the MSRP) + brand/model/modelYear/source/verified. It reuses the
  `fills` validator, the "weight-derived-from-fills" rule, and the ≤-sum price lint **verbatim** — near-zero
  new schema surface.
- **The dual price needs NO change to `buildTotals`.** The component total is `buildTotals(build)` with an
  **empty `presetBy`** (already the à-la-carte sum). The complete price is the stored `price` on the
  completebike row, read directly. "Complete is $X cheaper" is one subtraction. The one deliberate
  difference from groupset/wheelset bundles: a complete bike **shows both numbers side-by-side**; it does
  **not** substitute the MSRP into the total (that's why it is NOT attached to a build GROUP — see §1/§2).
- **The ≤-sum lint is a gift.** `schema.js`'s existing lint fails any `fills` row whose stored `price`
  exceeds its component sum. For complete bikes that lint **enforces Douglas's value insight by
  construction** — a completebike whose stored price is *above* the à-la-carte sum is flagged as a data
  error, which is exactly right.
- **Auto-fill already exists in miniature.** `applyPreset(id)` writes each `fills` entry into the build
  map. A complete bike is the same loop over ALL slots, **without** setting `presetBy` (so the total stays
  à-la-carte). No new fill mechanism to invent.
- **Compatibility is a feature, not a risk.** A real complete bike must pass `checkBuild` **verdict-clean
  by construction** — it becomes a golden test, exactly like `test-golden.js`'s `TRAIL_BUILD`. Every
  complete bike we ship is a *checked* bike, which no maker's spec page claims.
- **The real cost is component sourcing.** Every `fills` entry must point at a REAL catalog part, and the
  catalog **skews toward premium aftermarket parts**, while complete bikes ship **house-brand cockpits, OE
  wheels, exact-size stock tires, and coil/OE shocks** that mostly aren't in the catalog yet. Each bike is
  therefore a per-bike grind of **~8–12 new rows** (like adding a frame + its parts). Phase it flagship-first.
- **Live-safe, gate it.** Complete bikes add no error-tier engine rules and no e-bike content (the catalog
  gate guarantees the latter). Ship behind a `COMPLETE_BIKES_ENABLED` constant (the `ACCOUNTS_ENABLED`
  pattern), preview at localhost, flip live on Douglas's word.
- **The worked example (§7) needs ~9 new rows:** the alloy frame, the FOX DHX coil shock, the two
  exact-size Specialized OE tires, the SLX crankset + chain, a Shimano BSA BB, the Deity Racepoint bar, and
  the Specialized Bridge saddle. The fork (FOX 38 Factory 160), TRP DH-R EVO brakes, SLX shifter/mech/cassette,
  Deity grips/stem, PNW Loam dropper, and Roval Traverse wheels are already in the catalog.

---

## 1. Data model — a `completebike` whole-build preset (reuse, don't reinvent)

### 1a. The two candidate shapes

| | **A. New `cat:'completebike'` preset (RECOMMEND)** | B. New `cat` treated as a build "part" |
|---|---|---|
| Shape | A catalog row with `fills:{ every slotKey → partId }` + stored `price` (MSRP) + brand/model/etc. | A row you'd try to drop into a build slot |
| Validation | Reuses the **existing `fills` type** (`schema.js:693`) — each fill's slot + part-category checked for free | Would need a bespoke validator; a bike isn't a slot-fitting component |
| Price/weight | Reuses the ≤-sum lint + "weight-derived-from-fills" rule verbatim | New rules |
| Fit into UI | Inert in the current builder until the new browse surface reads it (like groupset presets, which only surface where a GROUP declares them) | No slot has cat `completebike`, so it fits nowhere — a category with no home |
| Precedent | `groupset`/`wheelset`/`brakeset`/`cockpitset` are exactly this pattern, scaled to one group | none |

**Recommend A.** A complete bike is definitionally "a bundle of parts sold at one price" — which is
precisely what a preset already is. Scaling the preset from one group (`fills` = 5 drivetrain slots) to the
whole build (`fills` = every slot) reuses the validator, the lint, `byId`, provenance, and the `applyPreset`
fill loop with almost no new surface. Option B miscategorises a bike as a slot-component and earns nothing.

### 1b. Exact shape (specification only — do NOT implement now)

A `completebike` row, in `SCHEMA` style, alongside the other preset cats in `src/compat.js`'s `PARTS`
array (presets already live in `PARTS`, keyed by their preset `cat`):

```
completebike: {
  fills: { type:'fills' }          // slotKey -> partId, covering the whole build; reuses schema.js:693
}
// + COMMON (id, cat, brand, model, price, desc, verified, lastChecked, source,
//   family, gen, modelYear, mfgPn, disciplines, image, colors, retailerLinks)
// price   = the whole-bike figure (see §6 for which figure)
// weight  = FORBIDDEN as a stored field (derived from fills, like every preset — schema.js:582)
```

Example row (the §7 worked example; `NEW-` marks a part that must be added first):

```
{ id:'cb-specialized-stumpjumper-15-alloy-fox-coil', cat:'completebike',
  brand:'Specialized', model:'Stumpjumper 15 Alloy FOX Coil', family:'specialized-stumpjumper',
  gen:'15', modelYear:2025, disciplines:['trail'], price:4099.99,
  verified:true, lastChecked:'2026-07-14',
  source:'https://www.specialized.com/us/en/stumpjumper-15-alloy-fox-coil/p/4257786',
  fills:{
    frame:'NEW-fr-specialized-stumpjumper-15-alloy', fork:'fk-fox-38-factory-29-160',
    shock:'NEW-sh-fox-dhx-factory-210x55', frontWheel:'fw-roval-traverse-hd-29',
    rearWheel:'rw-roval-traverse-hd-275-ms',
    frontTire:'NEW-ti-specialized-butcher-29-23-gridtrail-t9',
    rearTire:'NEW-ti-specialized-eliminator-275-23-gridgravity-t7t9',
    shifter:'sft-shimano-slx-m7100', derailleur:'dr-shimano-slx-m7100-sgs',
    cassette:'ca-shimano-slx-m7100-1051', chain:'NEW-ch-shimano-slx-m7100',
    crankset:'NEW-cr-shimano-slx-m7120', bb:'NEW-bb-shimano-mt801-bsa73',
    frontBrake:'bk-trp-dhr-evo', rearBrake:'bk-trp-dhr-evo',
    frontRotor:'ro-sram-hs2-220-6b', rearRotor:'ro-sram-hs2-200-6b',
    handlebar:'NEW-hb-deity-racepoint-35', stem:'st-deity-copperhead-35',
    grips:'gr-deity-knuckleduster', dropper:'dp-pnw-loam-349-200',
    saddle:'NEW-sa-specialized-bridge-comp', pedals:/* none stock — see §7 */ } }
```

Notes on the shape:

- **`fills` is the same field type** the drivetrain/wheel presets already use; the validator already checks
  every slot key is real and every part's category matches its slot. A complete bike simply names more slots.
- **Optional / exempt slots.** A complete bike need not name `pedals` (bikes ship without them), `headset`
  (frame-integrated, and the slot is already optional), `bb`/`grips` (optional slots), or `cog`/`seatpost`
  (single-speed-only). It fills what the bike actually ships. `slotRequired` already treats those as
  non-blocking; the auto-filled build is "complete" for its frame by the same rule the builder uses today.
- **It is NOT attached to a GROUP.** Existing presets hang off a group (`GROUPS[i].preset.cat`), so
  `bundleActive` can bill that group at the bundle price. A complete bike must **not** do that — we want to
  *show* the à-la-carte total, not replace it. Leaving it group-less means `presetBy` is never set for it, so
  `buildTotals` returns the component sum untouched (§2). This is the single most important structural
  decision and it costs nothing.
- **Id prefix:** add `completebike:'cb'` to `ID_PREFIX` (collision-free with the taken set). Id shape stays
  `cb-<brand>-<model…>[-gen][-trim]`, append-only, ≥3 tokens; the trim distinguishes build variants of one
  platform (`-fox-coil`, `-comp-slx`, `-expert`).
- **`PRESET_CATS`:** add `completebike` so it inherits the "weight is derived, never stored" guard.

### 1c. Why not just reuse groupset-style per-group bundling for the whole bike?

Because a complete bike spans *all* groups, and `bundleActive` bills **at most one preset per group** and
**substitutes** the bundle price for the component sum. To make the MSRP the headline you'd have to bill every
group as bundled at once — which would *hide* the component total, the exact number Douglas wants shown next
to the MSRP. Modelling the complete bike as a standalone (group-less) record with a stored price you display
*alongside* `buildTotals(build)` gives both numbers cleanly. The group-bundle machinery is the conceptual
ancestor (stored bundle price ≤ component sum, guarded by the ≤-sum lint); complete bikes take the same data
shape but **display-both instead of substitute**.

---

## 2. Dual price — it maps onto existing machinery with ZERO engine change

Douglas's two numbers map exactly:

| Douglas's number | Where it comes from | New code? |
|---|---|---|
| **Component total** ("sum of individual parts if bought separately") | `buildTotals(build)` with an **empty `presetBy`** — already the à-la-carte sum over every filled slot | **None.** Exists today. |
| **Purchased Complete Build price** ($4,099.99) | the `price` field on the `completebike` row, read directly | trivial field read |
| **"Complete is $X cheaper"** | `componentTotal − completePrice` | one subtraction in the render |

**`buildTotals` does not change.** After auto-fill, `presetBy` holds no entry for the complete bike (it isn't
group-attached), so `bundleActive` is false for every group and `buildTotals` sums components — the
à-la-carte total. The MSRP lives on the row. The savings line is a subtraction. That's the whole of it.

**Where the build panel shows both.** The panel already renders one totals line (`buildTotals(res, presetBy)`
at `index.html:1963`). Recommendation: when the current build was auto-filled from a complete bike, render a
small **two-row price block** at the top of "Your Build":

```
  Buy as parts        $6,480   ·  13,940 g          ← buildTotals(build), à-la-carte
  Complete bike       $4,099.99                      ← the stored MSRP
  ────────────────────────────
  You save            $2,380   buying it complete    ← the difference, only when positive
```

(Illustrative numbers.) Weight stays a single figure from the components (`missingWeight` handling
unchanged — if a stock part lacks a weight, the total still reads "incomplete" honestly). The savings line is
suppressed if the difference is ≤ 0, and that case is *also* caught upstream by the ≤-sum lint below, so it
should never occur on clean data.

**The ≤-sum lint enforces the value insight for free.** `schema.js:851` already fails any `fills` row whose
stored `price` exceeds the sum of its component prices. Applied to `completebike`, it means: **a complete
bike whose stored price is higher than its à-la-carte component sum is a hard validator error.** That is
exactly Douglas's thesis turned into a guardrail — "complete is cheaper" becomes a *checked invariant*, not a
hope. (Caveat to flag: because most component prices are still *sample* MSRPs, an occasional legit complete
bike could trip the lint if a sample component price is inflated. The correct fix is to correct the offending
component's price to its real MSRP — never to exempt complete bikes from the lint. This is a useful forcing
function toward better price data, not a bug.)

---

## 3. Pick UX — a "Complete Bikes" browse surface + one-click auto-fill

### 3a. Finding a complete bike

Recommend a dedicated **"Complete Bikes" browse section** (not a slot picker — a bike isn't a slot). The
cleanest placement, consistent with the repo's surfaces:

- **A "Complete Bikes" entry** in the top nav / rail (peer of the catalog view; a natural neighbour of the
  Builds Gallery if that ships). It opens a **grid of bike cards** reusing the catalog's card + verified-badge
  visual language: card = brand + model, hero stat line (**complete price · component price · discipline chip ·
  wheel config**), a "save $X complete" flag, and the `✓ Verified` badge when the row is sourced.
- **Filters** reuse existing chip patterns: discipline (trail/enduro/DH/XC), price band (on the *complete*
  price), brand, wheel config. **Search** by brand/model (the same text filter the catalog uses).
- **A bike detail view** (or an expanded card) lists every stock component — each linked to its catalog part
  card (provenance and all) — plus both prices and the live `checkBuild` verdict panel. This is where the
  "every complete bike is a *checked* bike" promise is visible.

### 3b. Picking one → auto-fill

Picking a complete bike auto-fills the build exactly like applying a preset, generalised to all slots. The
mechanism already exists — `index.html:1892` `applyPreset(id)`:

```js
function applyPreset(id){
  var p=byId(id); if(!p||!p.fills) return;
  Object.keys(p.fills).forEach(function(slot){ build[slot]=p.fills[slot]; });
  presetBy[PRESET_GROUP[p.cat]] = id;        // <-- complete-bike version SKIPS this line
}
```

A complete-bike apply is that fill loop **minus the `presetBy` assignment** (so the total stays à-la-carte).
Recommended shape: a sibling `applyCompleteBike(id)` that (1) clears the current build, (2) writes every
`fills` entry into `build`, (3) records the picked complete-bike id in a small piece of state (e.g.
`activeCompleteBike`) so the panel knows to show the dual-price block, and (4) leaves `presetBy` empty. The
share/save payload already round-trips a plain build map through `sanitizeShare()`, so an auto-filled build
saves, shares, and reloads with no new plumbing; whether the *complete-bike identity* rides along in the
payload (so a shared link re-shows the dual-price block) is a minor follow-up, not MVP-blocking.

**After auto-fill the rider can freely swap any slot.** The moment they do, the build simply diverges from the
stock bike — the component total updates, and the UI drops the "complete bike" framing for that slot (or for
the whole block; a small call, §Decisions). This is the habit-loop hook: *start from a real bike, then make
it yours* — and every swap is checked by the engine in real time, the core product value.

---

## 4. Component sourcing — the real effort, and how to phase it

This is where the work is. Every `fills` entry must resolve to a REAL catalog part, and the current catalog
**skews toward premium aftermarket parts** (it was grown frame-first + verified-drivetrain-first). Complete
bikes, by contrast, ship a lot of **OE / house-brand / exact-stock-size** components the catalog doesn't have
yet. Concretely, from the §7 worked example, the classes that are typically **missing** are:

- **The alloy frame variant.** The catalog has the *carbon* Stumpjumper 15; the Alloy is a separate row (the
  established carbon/alloy split policy). Most complete bikes are alloy/mid-tier — often a new frame row.
- **OE / coil shocks.** Stock bikes ship OE-tuned or coil shocks (here a FOX DHX Factory coil 210×55); the
  catalog leans air aftermarket. Frequently a new shock row (`spring:'coil'` is already modeled).
- **Exact-size stock tires.** The catalog has the Butcher in 29×2.6 and the Eliminator in 29×2.3, but the
  bike ships Butcher 29×2.3 **GRID TRAIL** front and Eliminator **27.5×2.3 GRID GRAVITY** rear — two new SKUs.
- **House-brand cockpit + saddle.** Deity grips/stem are in-catalog, but the exact Deity *Racepoint* bar and
  the Specialized *Bridge* saddle are new rows.
- **The exact stock drivetrain tier pieces.** SLX shifter/derailleur/cassette exist; the SLX crankset + SLX
  chain + the Shimano BSA BB are new rows.

**Net: ~8–12 new rows per bike.** That is the same order of effort as adding a frame and all of its parts.
The parts that already exist tend to be the "hero" pieces (marquee fork, brakes, dropper, wheels).

### 4a. Per-bike workflow (the grind loop)

For each complete bike:

1. **Source the build sheet.** Maker page if fetchable; otherwise the documented fallback chain
   (fanatikbike / vitalmtb / 99spokes / retailer listings). Capture: whole-bike price, and every component's
   make/model/size/casing/speeds.
2. **Map each component to the catalog** (the §7 table is the template): mark each **EXISTS** (record the id)
   or **MUST-ADD**.
3. **Enter the MUST-ADD rows** per `tools/DATA-ENTRY-TEMPLATE.md` + `tools/VERIFY-PROTOCOL.md` (id recipe,
   variant-token order, provenance tier, weight basis). These are ordinary catalog rows — they also enrich the
   à-la-carte catalog, so the effort compounds (a bike's stock tire is useful to every builder, not just this
   bike).
4. **Assemble the `fills` map + the whole-bike `price`.**
5. **Prove it green.** Add the build as a golden test (§5). If `checkBuild` raises an *error*, the modeling is
   wrong (a mis-entered spec, or a real incompatibility to investigate) — fix before shipping the row.

### 4b. Phasing

- **Phase 1 — a few flagships.** Start with 3–5 marquee complete bikes across disciplines (the Stumpjumper 15
  Alloy FOX Coil as the trail flagship). Proves the surface end-to-end and seeds the pattern.
- **Phase 2 — a grind, per maker.** Once the pattern is proven, this is a natural Sonnet-chip grind (the
  verification-job model): one chip per maker or per bike, each self-contained (build sheet → new rows →
  `fills` → golden test → branch). The orchestrator fans them out; the coordinator reviews + merges.
- **Own-it synergy.** The recently-shipped per-slot "Own it" buttons mean a rider can pick a complete bike,
  auto-fill it, then mark the parts they already own — a strong "how much to *upgrade* from stock" story that
  falls out for free.

---

## 5. Compatibility — a real bike must be verdict-clean by construction

A complete bike is a real, shipping build, so its `fills` **must pass `checkBuild` with zero errors** (warnings
allowed and shown honestly — some stock builds legitimately carry an adapter-tier or reducing-shim warning).
This is a *feature*: **every complete bike we publish is a checked bike**, which the maker's own spec page
never claims. Each one becomes a golden test on the `test-golden.js` pattern:

```js
var STUMPY15_ALLOY_COIL = { frame:'...', fork:'...', /* every fills slot */ };
test('golden: Stumpjumper 15 Alloy FOX Coil (the complete bike) is verdict-clean', function(){
  var r = chk(STUMPY15_ALLOY_COIL); eq(r.errors.length, 0);   // warnings tolerated + inspected
});
```

Even stronger: a test that asserts, for **every** `completebike` row, that `checkBuild(fills)` has zero errors
and `fills` fills every `slotRequired` slot for its frame — so a future catalog correction that would break a
real shipping bike is caught immediately. (This mirrors the existing "every demo build fills every required
slot" golden test.)

**Modeling gaps to expect (flag, don't false-flag):**

- **Mullet size-dependence.** The Stumpjumper 15 is 29-front/27.5-rear on most sizes but can be full-29; the
  frame already carries `wheelConfigs:['29','mullet']`, and one `fills` map pins one wheel config. Model the
  stock (mullet) config; note size-dependent wheel/travel as a known limitation (the same nuance already
  flagged on the Capra's travel-per-config). If a bike genuinely ships different builds per size, that's
  multiple rows or a documented single representative — a per-bike call.
- **Coil shocks + OE tunes** are already representable (`spring:'coil'`; rule 17's `coilApproved:false` is
  dormant, so a coil shock never false-errors unless a frame explicitly forbids it).
- **OE parts not yet modeled** (house-brand wheels/cockpit/saddle) must be entered truthfully — entering a
  *near-miss* substitute (e.g. the wrong rotor size, or a Center-Lock wheel where the bike is 6-bolt) risks a
  **false** warning/error on a bike that's fine in reality. The rule: enter the real stock part, or if a spec
  is genuinely unpublished, pick the honest closest and note it — never invent a spec that trips a rule.
- **Flat-mount rear caliper rotor ceilings** (rule 8b) and **Center-Lock vs 6-bolt** (rule 8) are the two most
  likely honest surprises: get the stock rotor mount + size right and both stay green.

If a real, correctly-entered complete bike raises an **error**, that's a signal worth taking seriously — either
a data-entry mistake, or a genuine engine gap/false-positive worth a rule review. Either way, the golden test
is the right place to surface it.

---

## 6. Verified vs sample — provenance, and the MSRP-vs-street-price call

- **The whole-bike price + build sheet come from the maker.** Specialized is fetch-walled (403), so per the
  established policy the row is sourced to the **product URL** + corroborating credible secondaries
  (fanatikbike / vitalmtb / 99spokes / flowmountainbike). The `completebike` row can be `verified:true` with
  the product URL as `source` once the build sheet + price are confirmed against a real page.
- **Components follow the two-tier policy** (`tools/VERIFY-PROTOCOL.md`): interfaces manufacturer-sourced;
  a third-party *measured* weight accepted for the weight only (`sourceType:'measured'` + `weightSource`).
  Under the relaxed-inclusion policy, an OE part whose maker page is unfetchable still enters as an honest
  **unverified sample** row (best credible spec, no `verified`/`source`) — never fabricated.
- **★ The one genuine price decision: which figure is the stored `price`?** The Stumpjumper 15 Alloy FOX Coil
  is listed by Specialized at **MSRP $5,499.00** with a **current sale price of $4,099.99** — and $4,099.99 is
  the figure Douglas cited. So "the complete price" is ambiguous:
  - **Store the list MSRP ($5,499).** Stable, maker-authoritative, doesn't chase sales; but it's not the
    number Douglas quoted, and the à-la-carte-vs-complete gap looks smaller.
  - **Store the current street/sale price ($4,099.99).** The number Douglas used and the real "what you'd
    pay," which maximises the "complete is cheaper" insight — but it's volatile (sales change) and would need
    periodic refresh, and it blurs "MSRP" with "today's deal."
  - **Store both** (`price` = list MSRP; an optional `streetPrice`/`salePrice`) and show the lower one as the
    headline. Most honest, slightly more schema + upkeep.

  **Recommendation:** store the **list MSRP as the canonical `price`** (stable + honest, matches how the rest
  of the catalog treats price as MSRP), and — if Douglas wants the sale figure featured — add an optional
  `streetPrice` field shown as the headline when present. This is a real product call; see §Decisions. (Note:
  whichever is stored as `price` is what the ≤-sum lint checks — and a heavier discount makes the lint *easier*
  to pass, so this is safe either way.)

---

## 7. Worked example — Specialized Stumpjumper 15 Alloy FOX Coil ($4,099.99)

Full stock build sheet (cross-checked against fanatikbike.com + vitalmtb.com + 99spokes.com + Flow;
specialized.com fetch-walled), mapped to the catalog. **EXISTS** = already a catalog row (id given);
**MUST-ADD** = a new row to enter first.

| Slot | Stock component (build sheet) | Catalog status | id (existing) / proposed new id |
|---|---|---|---|
| frame | Specialized **M5 Alloy** Stumpjumper 15, 145 mm, mullet-capable, UDH, BSA73, 34.9 post | **MUST-ADD** (only the *carbon* frame exists) | `fr-specialized-stumpjumper-15-alloy` |
| fork | **FOX 38 Factory**, GRIP X2, 160 mm, 29 | **EXISTS** | `fk-fox-38-factory-29-160` |
| shock | **FOX DHX Factory coil**, 210×55, Trail Tune | **MUST-ADD** (only a DHX 205×60 trunnion exists) | `sh-fox-dhx-factory-210x55` |
| frontWheel | **Roval Traverse** alloy, 30 mm, 29, 6-bolt | **EXISTS (approx** — "HD" trim) | `fw-roval-traverse-hd-29` |
| rearWheel | **Roval Traverse** alloy, 30 mm, 27.5, Micro Spline, 6-bolt | **EXISTS (approx** — "HD" trim) | `rw-roval-traverse-hd-275-ms` |
| frontTire | **Specialized Butcher**, GRID TRAIL, GRIPTON T9, 29×2.3 | **MUST-ADD** (only 29×2.6 exists) | `ti-specialized-butcher-29-23-gridtrail-t9` |
| rearTire | **Specialized Eliminator**, GRID GRAVITY, T7/T9, 27.5×2.3 | **MUST-ADD** (only 29×2.3 GRID TRAIL exists) | `ti-specialized-eliminator-275-23-gridgravity-t7t9` |
| shifter | **Shimano SLX M7100**, 12-sp | **EXISTS** | `sft-shimano-slx-m7100` |
| derailleur | **Shimano SLX M7100 SGS**, 12-sp | **EXISTS** | `dr-shimano-slx-m7100-sgs` |
| cassette | **Shimano SLX CS-M7100**, 10–51T | **EXISTS** | `ca-shimano-slx-m7100-1051` |
| chain | **Shimano SLX M7100** | **MUST-ADD** (catalog uses the XT chain as the SLX stand-in) | `ch-shimano-slx-m7100` |
| crankset | **Shimano SLX M7120**, 32T, 55 mm chainline | **MUST-ADD** (catalog SLX build used a Race Face crank) | `cr-shimano-slx-m7120` |
| bb | **Shimano BB-MT801**, BSA73 | **MUST-ADD** | `bb-shimano-mt801-bsa73` |
| frontBrake | **TRP DH-R EVO**, 4-piston | **EXISTS (verified)** | `bk-trp-dhr-evo` |
| rearBrake | **TRP DH-R EVO**, 4-piston | **EXISTS (verified)** | `bk-trp-dhr-evo` |
| frontRotor | 220 mm | **EXISTS (approx** — stock is TRP/OE; use a 220 6-bolt) | `ro-sram-hs2-220-6b` |
| rearRotor | 203 mm | **EXISTS (approx)** | `ro-sram-hs2-200-6b` *(or a 203 6-bolt row)* |
| handlebar | **Deity Racepoint**, alloy, 810 mm, 35 mm clamp | **MUST-ADD** (catalog has Deity Skywire carbon, not Racepoint) | `hb-deity-racepoint-35` |
| stem | **Deity**, 35 mm clamp, 35 mm length | **EXISTS (approx** — Copperhead 35 is 50 mm length) | `st-deity-copperhead-35` |
| grips | **Deity Knuckleduster** | **EXISTS (verified)** | `gr-deity-knuckleduster` |
| dropper | **PNW Loam OE**, 34.9, 150–200 (size-dependent) | **EXISTS (approx** — Loam 34.9 family; use the 200) | `dp-pnw-loam-349-200` |
| saddle | **Specialized Bridge Comp** | **MUST-ADD** | `sa-specialized-bridge-comp` |
| pedals | none stock (as most bikes) | leave slot empty | — |
| headset | frame-integrated (unlisted) | optional slot — leave empty or add if sourced | — |

**Tally: ~13 EXISTS (7 exact, 6 approximate), ~9 MUST-ADD.** The approximates (Roval "HD" wheels, Copperhead
35 stem length, the HS2 rotors, the Loam travel) should be tightened to the exact stock SKU during entry where
the spec is published — but every one is close enough that `checkBuild` stays green; none risks a false error.

**Price:** whole-bike **$4,099.99** (Specialized's current sale price; **list MSRP $5,499.00** — see §6 for
which to store). The à-la-carte component total will land well above it once the rows exist — the intended
"complete is cheaper" gap.

**Compatibility:** mullet (29 F / 27.5 R) on a mullet frame; SLX Micro Spline drivetrain on a Micro Spline
rear wheel; 220 F / 203 R rotors within the FOX 38 + M5-alloy-frame limits; BSA73 BB matching the frame shell —
all consistent, so the assembled build is **verdict-clean by construction** once the ~9 new rows are entered
correctly. (The carbon-frame `TRAIL_BUILD` golden already proves the Stumpjumper 15 platform validates clean.)

---

## § Decisions for Douglas

Everything above is buildable as written. These are the calls only you can make:

1. **Data model — confirm the `completebike` whole-build preset** (a `fills` map over all slots + a stored
   whole-bike price, reusing the preset/validator/lint machinery), rather than a new part `cat`. *(Recommend:
   yes.)*

2. **Dual price display — confirm the two-row block** ("Buy as parts $X" vs "Complete bike $Y" + a "you save
   $Z" line), with `buildTotals` unchanged. *(Recommend: yes — it's the whole value pitch, one subtraction.)*

3. **★ Which price is the stored figure — list MSRP ($5,499) or current street/sale price ($4,099.99)?**
   *(Recommend: store list MSRP as canonical `price` for stability + honesty; add an optional `streetPrice`
   shown as the headline when you want the sale figure — e.g. the $4,099.99 you cited — featured. Your call on
   whether to carry/maintain street prices at all, given they go stale.)*

4. **Pick UX — confirm a dedicated "Complete Bikes" browse section** (grid of bike cards, filter by
   discipline/price/brand, search by model), with pick → auto-fill every slot. *(Recommend: yes — a browse
   surface, not a slot picker.)*

5. **After a swap — does the "complete bike" framing drop for the whole build, or just the swapped slot?**
   *(Recommend: keep showing the dual-price block but label it "modified from Stumpjumper 15 Alloy FOX Coil"
   once any slot diverges — preserves the compare-to-stock story. Minor.)*

6. **Compatibility gate — confirm every complete bike must be `checkBuild` verdict-clean (zero errors;
   warnings allowed + shown) and ship as a golden test.** *(Recommend: yes — it's the credibility promise.)*

7. **Scope of Phase 1 — how many flagship bikes to seed** (recommend 3–5 across disciplines, starting with
   the Stumpjumper 15 Alloy FOX Coil), before opening the per-maker Sonnet grind. *(Your number.)*

8. **Launch gating — build behind a `COMPLETE_BIKES_ENABLED` gate (default off) and preview at localhost
   before going live** (the Kit-Builder / accounts pattern), or ship straight to live on green gates?
   *(Recommend: preview-first, given it's a new browse surface.)*

9. **Go / no-go on starting the implementation round** (foundation: the `completebike` schema cat + id prefix
   + the auto-fill + the dual-price block + the browse surface + the gate + tests), then the flagship bikes.
   *(Awaiting your word — this doc changes no code.)*

---

*Scope only — no code, no schema, no catalog rows; the sole artifact is this document. Branch
`scope/complete-bikes`, presented for review, not merged. Gates run clean (doc-only change).*

---

## § DECISIONS LOCKED (Douglas, 2026-07-15) — implementation GO

All nine answered. The build proceeds on these:

1. **YES — `completebike` whole-build preset.** ★ REFINEMENT: the `fills` map uses **ONLY the parts
   that ship on the bike from the factory** — the faithful OE spec (exact fork/shock/wheels/tires-by-
   size/drivetrain/brakes/cockpit/dropper/saddle). Do NOT substitute a "close enough" aftermarket part.
   Slots the factory omits (commonly **pedals** — most complete MTBs ship pedal-less) stay **empty**;
   that's honest, and the dual price reflects only the parts that actually ship.
2. **YES — dual-price block** ("Buy as parts $X" / "Complete bike $Y" / "you save $Z"), `buildTotals` unchanged.
3. **MSRP is the canonical stored `price`; add an optional `streetPrice`** shown as the headline when present.
4. **YES — dedicated "Complete Bikes" browse section** (cards, filter by discipline/price/brand, search),
   pick → auto-fill every slot.
5. **Per recommendation** — keep the dual-price block after a swap, relabel "modified from <bike>" once
   any slot diverges.
6. **YES — every complete bike must be `checkBuild` verdict-clean** (0 errors; warnings allowed + shown)
   and ships as a golden test.
7. **5 flagship bikes** — but seed from the **manufacturers we get the best data from FIRST** (fetchable
   full build sheets: Commencal / Canyon / Vitus / Forbidden and similar). Explicitly do NOT lead with the
   fetch-walled makers (Specialized/Trek/Giant/Pivot) — so the doc's Stumpjumper worked example is
   DEFERRED until its build sheet is sourceable (walled maker; revisit with a web-unblocker or a clean
   third-party sheet). NOTE: some best-data brands (e.g. RAAW) sell frames only — pick makers that
   actually sell complete bikes.
8. **SHIP STRAIGHT TO LIVE** — NO `COMPLETE_BIKES_ENABLED` gate, no preview round; auto-ship on green
   gates like the UI tier. Consequence: the foundation must debut with **≥1 real complete bike** (build
   the foundation + the first flagship bike together) so the live section is never empty; the browse
   entry hides itself when there are zero complete bikes.
9. **YES — GO.** Implementation round approved.
