# Manufacturer-Bias Audit — 2026-07-19 (Round 4; first audit of the Upgrade Advisor, the green-dot disclosure, RideKit post-rebrand, and the multi-page surface)

_Read-only audit of `origin/main` @ `87026a1` (**5,023 MTB parts / 3,041 verified; 714 kit parts / 470
verified; 436 complete bikes; BMX 225/66; road 150/32; gravel 150/26; EMTB 75/0 off-live**). Successor to
`tools/BIAS-AUDIT-2026-07-17.md` ("Round 3"). Run per Douglas's standing guardrail: periodic proof that the
engine, catalog, UI and ordering favor NO manufacturer. Every load-bearing number below was measured by
running the REAL `checkBuild`/`upgradeCheck` over the live catalog — the harnesses are committed as
`tools/bias-r4-stats.js` and `tools/bias-r4-upgrade.js` (re-run them before acting; counts drift with every
catalog commit). Per the r3 method lessons: values were checked, not coverage; every copy finding was checked
against its render gate; everything measured off origin/main._

## Verdict: **ACTION-NEEDED** — 1 HIGH, 3 MEDIUM(-HIGH); still NO evidence of favoritism anywhere

The four never-before-audited surfaces mostly held up under measurement:

- **The Upgrade Advisor's mechanism is CLEAN.** ~500,000 (bike × candidate) pairs judged across four
  categories: **zero** sampled disagreements between `upgradeCheck.state` and `compatOf`'s dot; the
  "clears N current issues" credit is near-uniform across brands (mean exactly 1.00 everywhere); the
  deliberate no-verdict-sorting decision **held in the shipped code** (`SORTS` at `index.html:2810` has no
  verdict comparator); and the flipped view's green wording carries the honesty disclosure. The brand
  differences that do show (fork green rates 4–49%) decompose entirely into published spec values
  (travel/axle/steerer/rotor-max), not brand handling.
- **But the Upgrade Advisor inherits and AMPLIFIES a maker-concentrated data artifact** — finding #1. The
  new mode's whole framing is "here is what's wrong with *your* bike," and for 50 of 436 catalog bikes
  (86% of Pivot's, 45% of Yeti's) what's "wrong" is a warning their factory build does not deserve.
- **Round 3's headline fixes all shipped and verified**: IS-mount frames are buildable (0→98 of 102
  calipers), the build-sheet badge exists and the ✓-only landing view no longer blanks, the tire chips
  gained the Other/unrated bucket + absent-field pass-through, the green-dot disclosure ships in four
  places on the MTB page — and the **Specialized/Trek frame wall fell** (0/17 → 16/17, 1/21 → 14/21).
- **Affiliate isolation still holds catalog-wide: 0 of 5,023 parts and 0 of 714 kit parts carry
  `retailerLinks` or `image`** (the `p.image` read at `index.html:2843` is live code over an empty field).

**Split:** #1 is a **DATA ARTIFACT** with a bias tail (fixable by add-data + one entry rule); #2 and #3 are
**EDITORIAL** (our page defaults — fixable now); #4, #5, #6 are **STRUCTURAL** (grind order / what makers
publish), each with the cheap next wave named.

**Suggested queue:** #1 rotor-fill correction wave (it's a false verdict on real factory bikes — the
product's one unforgivable defect class) → #2 shuffle default on BMX/RideKit (one-line-per-page, the exact
fix the MTB page already shipped two rounds ago) → #3 BMX disclosure port (copy only) → #5/#6 zeros-first
verification waves → LOWs opportunistic.

---

## 1. HIGH · NEW · DATA ARTIFACT (maker-concentrated, Upgrade-Advisor-amplified) — 50 of 436 factory bikes raise a FALSE "needs a Center Lock adapter" warning pair on their own stock builds: Pivot 12/14 (86%), Yeti 9/20 (45%), Transition 7/18 (39%)

**Measured** (`checkBuild` over every complete bike's resolved fills): 74 bikes carry ≥1 warning on their
pristine factory build; **100 of the ~131 total warnings are one artifact** — `front/rear-rotor-interface`:
"6-bolt rotor on a Center Lock hub needs a Center Lock adapter (e.g. Shimano SM-RTAD05)."

| Maker | bikes with the warning | share of their catalog |
|---|---|---|
| **Pivot** | 12/14 | **86%** |
| **Yeti** | 9/20 | 45% |
| **Transition** | 7/18 | 39% |
| Canyon, Scott, Forbidden, Deviate, others | 22 more | — |

**Root cause traced** (e.g. `cb-pivot-firebird-ride-slxxt`): the stock wheels are DT Swiss M1900 —
`rotorMount:'CL'`, verified — but the rotor fills point at **6-bolt rotor rows** (`ro-sram-centerline-200-6b`
appears in 18 of the 50; Hayes D-Series, Shimano RT66/86, HS2… the rest). Factory bikes ship rotors in the
mount their hubs take; the build sheets typically say just "SRAM Centerline 200mm," and the entry worker
matched the model name to whichever row existed — and the catalog has **123 six-bolt rotor rows vs 66
Center-Lock rows**, so the 6-bolt row usually existed. The engine is right about the pair; the pair is not
what the factory ships. This is a **false "check first" on a real product** — the same defect class as r3's
IS-mount false "won't fit," one tier softer.

**Why it's a bias finding, and why the Upgrade Advisor makes it worse than it was in r3's world:** the
warning does not land evenly — it lands on whichever makers spec CL-hub wheels with rotors we cataloged
6-bolt-first (Pivot, Yeti, Transition). The new mode then turns it into the headline: pick "🔧 This is my
bike" on any Firebird and the page tells you your factory bike has 2 issues; browse any rival rear wheel and
the modal awards it "**Swapping it in also clears 2 current issues**." Measured across the rear-wheel sweep
(453 wheels × 436 bikes): the ~12% `clearsAny` rate that most wheel brands earn derives almost entirely from
this artifact — i.e. **the "clears" framing today is mostly a machine for crediting rival wheels with fixing
a Pivot/Yeti problem that doesn't exist.** (The credit itself is brand-neutral — any wheel that doesn't
re-raise the pair gets it, and Shimano's own CL wheels at 0.46% are the ones that DON'T earn it, because
they keep the CL hub and the 6-bolt rotor fill keeps warning. The input is what's wrong.)

**Recommendation (ADD-DATA + one entry rule + one lint; nothing removed):**
1. Enter the Center-Lock variants of the affected stock rotors (SRAM Centerline CL exists; Shimano's CL rows
   are largely already cataloged) and **repoint the 50 bikes' rotor fills** (fills are references, not ids —
   append-only is not violated).
2. Add to `tools/DATA-ENTRY-TEMPLATE.md`: *a completebike's rotor fill must match the stock wheel's
   `rotorMount`; when the build sheet omits the mount, the hub decides.*
3. A `lintCatalog` advisory listing every completebike whose rotor `mount` ≠ wheel `rotorMount` — 50 hits
   today, 0 after the wave; leave it a lint (not a hard error) for the rare bike that genuinely ships an
   adapter, which then earns a per-row sourced note.

**The non-rotor tail (24 warnings, 20 bikes) needs a per-bike verification mini-wave, not a rule:** Deviate
4/4 bikes warn `rear-rotor-max` (203 vs a 180 frame max — either the frame max or the build sheet is wrong);
Nukeproof ×2, Propain ×2, Chromag ×2, Intense ×2, Ragley ×1 same pattern; `cb-marin-pine-mountain-2` shows
a 150mm fork on a 120mm-max frame (a real Marin spec — the frame row's `maxForkTravel` is the suspect);
the two Salsa `freehub` XDR-spacer warnings are **TRUE and SRAM-documented** (ship-with-spacer bikes) and
should stay.

---

## 2. MEDIUM-HIGH · NEW SURFACE · EDITORIAL — BuildMyBMX and BuildMyRideKit default to insertion-order "featured" sort: first-entered brands permanently top every category — the exact pattern Round 2 got fixed on the MTB page

`bmx.html:761` and `KitBuilder/index.html:687`: `featured = CAT_ORDER || insertion index`. The MTB page
replaced insertion order with a uniform Fisher-Yates shuffle two rounds ago precisely because "no
manufacturer or model can sit permanently at the top" (`index.html:2804` comment). The two newer pages
shipped without that lesson.

**Measured, insertion order = what every visitor sees first on every load:**
- **RideKit:** Fox holds **9 of 36** top-3 slots across the 12 categories (jersey/shorts/gloves/kneepad/
  elbowpad all open on Fox); Troy Lee Designs 6, Leatt 6 (incl. all 5 neckbrace slots — legitimately, it's
  16 rows deep there), Race Face 4, G-Form 4. 12 brands share the 36 slots; ~40 brands never appear.
- **BuildMyBMX:** Odyssey is the **#1 row in 8 of 20 categories** and appears in the first four in 15 of 20;
  Cult and Profile Racing take most of the rest.

No one chose Fox or Odyssey — entry order did. But r2's reasoning stands: a stable, non-chosen,
brand-concentrated default IS a favoritism surface, and it's now live on two pages.

**Recommendation (one small change per page):** port the MTB pattern — `fisherYatesShuffle` once per page
load (both pages already build an `idx` map; shuffle the ids into it instead of using insertion order), keep
the explicit name/price/weight sorts as-is. If "featured" survives as a label, it must mean the shuffle.

---

## 3. MEDIUM · NEW SURFACE · EDITORIAL — the green-dot honesty disclosure did not propagate to BuildMyBMX

Round 3's #4e fix shipped thoroughly on the MTB page — four independent surfaces: the dot's own green reason
(`compat.js:20981/20988` "…among the dimensions we check - some makers publish no spec data"), the legend
title + `legend-note` (`index.html:1169/1181`), the footer (`:1395`), and both Upgrade-Advisor wordings
(`upgrade.js` `UPGRADE_GREEN_REASON`, `index.html:1204/3391`). **bmx.html has none of them**: its green
reason is plain "No conflicts with your current build" (`bmx.html:529`), its all-clear "✓ No conflicts
found" (`:780/:836`) has no qualifier, and the page has no legend note or footer clause. The BMX catalog is
**66/225 verified** with its own dormant-until-sourced checks, so the honesty rationale applies with more
force there, not less. (RideKit is fine — it has no compatibility engine and its honesty strip + per-row
"Sample spec (unverified)" already disclose the data basis.)

**Recommendation (copy only):** append the same "among the dimensions we check — some makers publish no spec
data" clause to bmx.html's green reason and all-clear, and add the one-line legend note. Same non-overclaim
wording, verbatim, so the two engines can't drift apart in honesty framing.

---

## 4. MEDIUM · STRUCTURAL (persists onto the new surface) — fork tire-clearance dormancy is now visibly asymmetric inside the Upgrade Advisor: the `front-tire-fork` yellow is reachable by 4 brands and structurally impossible for 6

Measured on the full fork sweep (430 forks × 436 bike baselines): the `front-tire-fork` warning fires for
**RockShox on 995 pairs (1.6% of its pairs), Cane Creek 72 (1.3%), Fox 217 (0.7%), Manitou 10 (0.07%)** —
and can never fire for DVO, Formula, X-Fusion, SR Suntour, Marzocchi, EXT, Push or Giant (**0% `maxTire`
coverage**). The catalog's bikes ship 2.4–2.5" front tires almost universally, and RockShox's XC forks
publish tight 2.35–2.44" clearances while Fox's XC forks publish nothing — so in upgrade mode, cross-shopping
a SID against a Fox 34 SL on the same bike shows yellow-vs-green *for a data reason, in RockShox's disfavor*.
This is r3 #4a's structural finding surviving unchanged onto a higher-stakes surface (r3's "can't fire"
conclusion was correct for the *enduro* fleet at 3.19"; the XC rows and real bike baselines expose the tail).
**Mitigations already shipped:** the green reason itself now discloses ("some makers publish no spec data"),
on every surface including this one. **Also measured:** `minRotorF` — SR Suntour still 0/19 and Giant 0/4
(every other fork brand 62–100%), unchanged from r3 #4d, still on an *error*-tier rule.

**Recommendation (ADD-DATA, unchanged from r3 but with a sharper target):** a Fox + DVO/Marzocchi `maxTire`
pass and an SR Suntour/Giant `minRotorF` pass. These two are the highest-leverage dormancy grinds in the
catalog because they're the ones the Upgrade Advisor now puts side-by-side.

---

## 5. MEDIUM · STRUCTURAL (grind-order) — the build-sheet-verified view now works, and it removes 27 makers (162 bikes) entirely: Specialized 0/32, Trek 0/21, Yeti 0/20, Pivot 0/14, Orbea 0/13

Round 3 #2's fix **shipped and works**: `completeBikeSheetVerified` (row `verified:true && source`), its own
"🧾 Build-sheet verified" badge, the ✓-only filter routed through it (`index.html:2717`), and an honest
guide section. The landing view no longer blanks — **171/436 (39.2%)** pass. What r3 predicted as the
"would-vanish set" is now the live vanish set: **27 makers at 0 sheet-verified**. The top of the verified
view is healthily flat (Santa Cruz 26, Giant 17/17, GT 8/8, Polygon 7/7, Cube 7/7 — no takeover), and the
0% cohort is a mix of true fetch-walls (Specialized/Trek/Cannondale *bike* pages — note their *frames* now
verify, so the wall map keeps needing re-tests) and pure grind order (Yeti frames 9/9 but bikes 0/20; Pivot,
Propain, Nukeproof, RAAW similar).

**Recommendation:** the Yeti/Pivot/Propain/Nukeproof/Orbea build-sheet wave r3 already specified — their
sites fetch; it's the fastest way to shrink the vanish set. Re-probe Specialized/Trek bike pages with the
browser-pane route that just cracked their frame pages.

---

## 6. MEDIUM · STRUCTURAL (grind-order) — RideKit verification clusters by brand: five whole-brand zeros vs five 100% brands, and the ✓-only toggle deletes them

Kit is 470/714 (65.8%) verified overall, but per-brand (≥5 rows): **Sombrio 0/9, ION 0/8, Royal Racing 0/8,
SixSixOne 0/6, 7mesh 1/7** — while Bell 14/14, Crankbrothers 7/7, Ride Concepts 7/7, Pearl Izumi 5/5, Atlas
5/5 sit at 100%. The apparel-bar wave (+33 verified, d8beece) worked brand-cluster-wise, which is efficient
per fetch-session but leaves whole-brand holes; RideKit's "✓ Verified only" toggle (`KitBuilder/index.html:603`)
removes those five brands from the page entirely. Category rates are even-ish (eyewear 35% is the lagging
category); the skew is brand-axis. No favoritism — grind order — but it's the same shape as #5 on a page
whose verified badge is the main trust signal.

**Recommendation:** a zeros-first kit wave (Sombrio/ION/Royal Racing/SixSixOne/7mesh ≈ 38 rows), then
eyewear as the lagging category.

---

## LOW findings (opportunistic; ranked)

- **L1 · The footer claims a sort that does not exist** — `index.html:1397`: "the catalog is sorted
  compatible-first." Actual default: uniform random shuffle; no verdict sort exists anywhere (that's the
  *good* finding #4 verified). Stale copy inviting users to read card position as a fit ranking. Fix the
  clause ("cards are shuffled — no brand or rank ordering; use Sort to reorder").
- **L2 · r3 L1 doc drift STILL open, now 3-way** — `src/schema.js:861-863` and `src/types.js:173-175` still
  describe `streetPrice` "shown as the headline instead of the canonical MSRP price," contradicting the
  shipped `pricing.js` ruling AND the new complete-bikes guide (which documents the correct policy well).
  The `streetPrice > price` validator guard did land. Fix the two comments; they're the reimplementation bait.
- **L3 · r3 L2 partial** — `streetPrice` grew 16 → 21 rows, `streetPriceDate` still absent, and
  `cb-scott-ransom-900-rc` still has `streetPrice === price` (renders "Sale" at MSRP). One row, one cross-rule.
- **L4 · r3 #6 save-badge magnitude unchanged** — no cap, no hover copy (`index.html:2865`); measured
  per-maker mean save% still spans Cotic 1% … Privateer 174%, 76 bikes >60%, flattering DTC/entry brands
  (Radon 96%, Merida 91%, Polygon 82%, Canyon 78%). Downgraded from r3's MEDIUM: the complete-bikes guide
  now explains the parts-total basis honestly. The card itself still doesn't; r3's hover-copy fix stands.
- **L5 · r3 L3 unfixed** — `PF3083` still missing from `BB_FAMILY` (`src/facets.js:25`); still 1 row, still
  100% of Cannondale's BB presence unreachable via the Pressfit chip.
- **L6 · r3 L4 unfixed** — `leverAccepts`: Magura 0/10, Hope 0/6, Formula 0/4 (Shimano 18/24, SRAM 23/30).
  Rule 19 still can't fire for three whole brake brands.
- **L7 · Brand-string splits on wheels** — "Alex Rims" vs "Alexrims" and "SUNringle" vs "Sun Ringlé" are
  each two brand buckets for one maker, splitting their rows in every brand-aggregated surface (family
  cards, the upgrade sweep tables measured them separately). Pick one string per maker (append-only ids
  unaffected — `brand` is display data).
- **L8 · Sample-generator concentration stable** — top frame brand Trek 10.2% (r3: 10.5%), same cause
  (thin XC/hardtail pools), same fix (deepen those pools). Mechanism still brand-neutral.
- **L9 · The one live superlative survives, still behind its render gate** — `cb-marin-rift-zone-2` "most
  popular, best-reviewed" (`compat.js`), still non-visible (`!p.fills` gate at `index.html:3431` holds).
  Kit descs: 0 hits. The r4 sweep's other "#1" hits are all false positives (audit-numbering inside
  provenance notes). Trim the Marin clause when touched.
- **L10 · WTB gripton row survives** — `ti-wtb-vigilante-275-25-lightsg2-gripton` still carries
  Specialized's compound ladder on a WTB tire (r3's data-error note, unfixed).
- **L11 · Adapter-fix naming census (new standing check)** — 10 structured `fix` sites in the engine:
  Shimano named in 6 (SM-MA ×4, SM-RTAD05 ×2), Wolf Tooth 2, brand-free 2 (XDR spacer, UDH kit). All
  "e.g."-qualified and each is the manufacturer-documented canonical part for that adaptation, so no action —
  but Shimano is becoming the house adapter brand by habit; prefer brand-free naming + "e.g." for future
  tiers, and add a second example brand where one genuinely exists.
- **L12 · The tire-classes guide now contradicts the shipped chips in one line** — it says unmapped tires
  "won't match any of the chips until the chip is reset back to 'All'"; since the Other/unrated bucket
  shipped, they match *that* chip. The fix made the guide stale in the rider-friendly direction. One sentence.
- **L13 · r3's loadBad residual half-fixed** — the overclaiming comment was corrected (the retained errors
  really are frame-independent now, `index.html:5100`), but the rest-of-build is still permanently pinned
  (RockShox/Shimano/SRAM/Maxxis/Industry Nine on every roll). Same one-line remedy as r3.
- **L14 · r3 #5 slider-basis note not shipped** — `frameForkTravelRange` (`index.html:2248`) still mixes
  `designForkTravel`/`maxForkTravel` with no `note:`. Carried forward unchanged.

---

## ✅ Round 3 items: status on measurement

| r3 finding | Status | Evidence (measured @ 87026a1) |
|---|---|---|
| **#1 IS-mount frames 100% unbuildable** | **FIXED + verified** | All 3 IS frames: 98/102 calipers now adapter-tier WARNING (structured `fix`, rotor-size-specific SM-MA), 4 FM calipers stay error (correct — no honest adapter). Direction-aware, tested. |
| **#2 verified-badge blanks the landing view** | **FIXED + verified** | `completeBikeSheetVerified` + 🧾 badge + filter re-route (`index.html:2717`); 171/436 pass. Residual = the structural vanish set, now finding #5. |
| **#3 tire chips unmapped==invisible** | **FIXED + verified** | Other/unrated escape bucket both axes; absent-field pass-through (`if(!p.compound) return true`); `bikepark`→dh mapped + tested; Terrene `tough` kept with new sourcing. Residual: L10, L12. |
| **#4e green-dot disclosure** | **SHIPPED on MTB** | Dot reason + legend + footer + both upgrade wordings. Gap = BMX (finding #3). |
| **#4a/#4d fork dormancy** | **OPEN, restated** | Finding #4 — now measured on the upgrade surface; SR Suntour 0/19 + Giant 0/4 `minRotorF` unchanged. |
| **#5 fork-travel slider mixed basis** | **OPEN** | L14 — no note shipped. |
| **#6 save badge** | **OPEN (downgraded)** | L4 — guide mitigates, card unchanged. |
| **#7 Specialized/Trek frame verification** | **LARGELY RESOLVED** | Specialized frames 0/17 → **16/17**, Trek 1/21 → **14/21** (browser-pane fetch doctrine). Cannondale still 0/4. Bike *pages* still walled (finding #5). |
| L1 streetPrice doc drift | **OPEN** (L2) | schema.js/types.js comments unchanged; guide added the correct story. |
| L2 streetPriceDate / ===price row | **OPEN** (L3) | 0 dates; the Scott row survives; >price guard landed. |
| L3 PF3083 | **OPEN** (L5) | unchanged. |
| L4 Magura/Hope leverAccepts | **OPEN** (L6) | unchanged. |
| L5 generator Trek share | stable | 10.5% → 10.2% (L8). |
| L6 Marin superlative | **OPEN, still gated** (L9) | gate verified. |
| L7 guide/chip tension | **RESOLVED** | A full tire-classes guide shipped; new one-line drift = L12. |
| L8 sub-brand policy | held | Liv/Roval/Bontrager/Syncros/OQUO all separate; Juliana still 0 rows. |
| L9 wheel minTire single-brand growth | **IMPROVED** | Now 5 brands: Spank 11, ENVE 8, WTB 6, HUNT 2, Hope 1 — the category-sweep advice was followed. |
| L10 UDH retrofit RAAW-only | unchanged | Now 2 RAAW frames (`madonna-v22`, `jibb`); still no sweep of other makers' kits. |

---

## Checked CLEAN (defenses verified, with numbers)

- **C1 — Upgrade Advisor state parity**: 0 sampled `upgradeCheck` vs `compatOf` disagreements across fork
  (430×436), rearwheel (453×436), cassette (57×436), dropper (319×436) sweeps. The test pin
  (`test/test-upgrade.js`) is telling the truth at catalog scale.
- **C2 — "Clears N issues" framing is mechanically brand-neutral**: mean clears = 1.00 for every brand in
  every category; `clearsAny` is uniform within a category except where a candidate honestly re-raises the
  same conflict (Shimano CL wheels 0.46% vs ~12% — the *correct* asymmetry). The r4-brief hypothesis
  ("brands with more catalog data get flattered") is **DISPROVED** — the credit's source is baseline
  conflicts, i.e. finding #1's input, not candidate data depth.
- **C3 — No verdict sorting anywhere**: `SORTS`/`ROW_SORTS` = random/name/price/weight only; upgrade mode
  adds no comparator; verified/dot state never orders. (The *footer copy* claims otherwise — L1.)
- **C4 — Upgrade-mode UI parity**: the per-card verdict line and family-card aggregated line render from
  the same `fm.state`/`uc` for every brand; the baseline picker imposes no brand filter; entering the mode
  is click-only (no-popups rule respected — the bar never auto-appears).
- **C5 — Affiliate isolation**: 0/5,023 and 0/714 rows carry `retailerLinks`/`image`; neither field read by
  any engine path; `rel="sponsored"` scaffolding still ahead of any actual link.
- **C6 — Green-dot disclosure renders category-uniformly on the MTB page**: it lives in the static legend +
  footer (all categories) and in the dot reason itself (`compatOf`'s green string, every card, every
  category); complete-bike cards carry no dot by design and get the same legend. Only cross-PAGE parity
  fails (finding #3).
- **C7 — Complete-bike price display parity**: every card renders MSRP-headline + labeled Sale + as-parts +
  save from the same `completeBikeSaveBasis` path; 21 streetPrice rows across 10 makers (no maker-cluster);
  sort comparators MSRP-only (`msrpCompareAsc/Desc`). r2 #1 stays dead.
- **C8 — Engine brand-neutrality**: no new brand branches since r3; the new IS/FM adapter tiers are
  standard-ownership language with "e.g."-qualified parts (census in L11); the two brand-named exemptions
  (SRAM AXS controllers, T-Type) remain manufacturer-documented.
- **C9 — Superlative hygiene held through two big content waves**: kit descs 0 hits; guides (incl. the two
  new ones) read as spec prose; the one legacy hit stays render-gated (L9).

---

## What Round 5 should watch

1. **The rotor-fill lint count** (finding #1) — should be 0 after the wave; any new hit is the entry rule
   failing.
2. **BMX/RideKit ordering** after the shuffle ships — and whether any *new* page (road/gravel/EMTB builders
   are coming) copies the featured-order template again. The template to copy is index.html, not bmx.html.
3. **The "clears" framing once #1 is fixed** — re-measure `clearsAny`; it should collapse toward the honest
   tail (real spec tensions + true XDR-spacer notes). If it stays high, something new is feeding it.
4. **Upgrade-mode search/filter behavior** — this round measured verdicts and ordering; r5 should walk the
   full browse-in-upgrade-mode funnel in a browser (chips × upgrade lens interactions) once the mode has
   real usage.
5. **Fox `maxTire` / SR Suntour `minRotorF`** — the two dormancy grinds finding #4 names; both are
   pure-add-data and both now have a user-visible comparison surface.
6. **EMTB (75 bikes, 0 verified, off-live)** — it enters any future audit the moment it flips live; its
   catalog is currently 100% sample data, which would make every badge/ordering finding above apply at
   full strength on day one.

---

_Read-only audit; no `src/`, `index.html`, or catalog file was modified — deliverables are this report +
the two committed measurement harnesses (`tools/bias-r4-stats.js`, `tools/bias-r4-upgrade.js`). Branch
`audit/bias-round4`, presented for review, never pushed. Gates run at `87026a1` + docs/tools only:
`node validate.js` (0 problems, all seven catalogs), `npm test` (781/781), `npm run typecheck` (clean).
Counts drift with every catalog commit — re-run the harnesses before acting on any number here._
