# Manufacturer-Bias Audit — 2026-07-16 (post complete-bikes doubling, 57 → 114)

_Read-only audit of `origin/main` @ `24d1c51` (**3,763 parts / 2,457 verified**; was 3,018/1,872 at
the last audit), run per Douglas's standing guardrail: periodic audits that the engine, catalog and
UI favor NO manufacturer. Ranked by severity. Every remedy is ADD-real-data or a neutral rule —
nothing removes real parts. Successor to `MANUFACTURER-BIAS-AUDIT-2026-07-12.md` ("the -07-12
audit")._

**What's new here:** the **complete-bikes surface** (114 rows, 40 makers) had never been audited —
it didn't exist on 2026-07-12. It is now the **landing view** (`index.html:1335`,
`activeGroup='completebikes'`), so its data and ordering are the first thing every visitor sees.
That raises its stakes above any other surface. The engine and copy dimensions were also
re-checked against the -07-12 baseline.

## Verdict: **ACTION-NEEDED** — 2 HIGH, 2 MEDIUM-HIGH; no evidence of favoritism anywhere

Nothing found is intentional bias, and the two most important findings arrived *without anyone
choosing them*: #1 is a mechanism that auto-promotes whichever bike a sale was recorded for, #3 is
a predicate that silently discards true provenance. **Four -07-12 findings are confirmed FIXED**
(including the whole XDR and browse-ordering items), and **affiliate isolation still holds
catalog-wide: 0 of 3,763 parts carry `retailerLinks` or `image`.**

The complete-bikes catalog itself is **more balanced than the component catalog**: 40 makers, top
maker 9.6%, 1.31 rows/family, no flooding, and a well-spread sample generator (55 frame brands, top
6.6%).

**Split of the findings:** #1, #7 and #9 are **EDITORIAL** (our choices — fixable now). #2, #4, #5,
#6 are **STRUCTURAL** (fetch-walls / what makers publish — fixable only by add-data or an
unblocker). #3 is a **semantic bug** with a latent bias tail.

**Suggested queue:** #1 (one-line fix, kills the worst distortion) → #3 (badge semantics; needs a
small decision) → #2 Fox `maxTire` wave (biggest live engine asymmetry, pure grind) → #4 unblocker
for Specialized/Trek (Douglas decision) → #5 SR Suntour (one afternoon) → #7/#9 one-liners → rest
opportunistic.

---

## 1. HIGH · EDITORIAL — `streetPrice` gives 6 of 114 bikes a discounted headline **and** an inflated "save" badge

`streetPrice` (optional sale price, decision #3 of `COMPLETE-BIKES-SCOPE.md`) is carried by exactly
**6 of 114 completebike rows (5.3%)**. The card renders (`index.html:2135`, `2146-2149`):

```js
var headline = p.streetPrice || p.price;   // shows the SALE price when present
var save     = partsTotal - headline;      // ...which also INFLATES the save badge
```

A row that happens to carry a `streetPrice` gets **two compounding advantages** over a rival at
plain MSRP: a lower headline, and a bigger `save $X` flag — the card's most persuasive element.
Nothing about the bike is better; someone simply recorded a sale for it.

**Measured effect on the `save` ranking** (114 bikes, à-la-carte total − headline):

| Bike | save-rank as shipped | rank on the canonical MSRP basis | places gained |
|---|---|---|---|
| **Pivot Firebird GX T-Type (Jenson Exclusive)** | **#2 of 114** | #68 | **+66** |
| Canyon Neuron CF 8 | #19 | #44 | +25 |
| Kona Process 153 CR/DL | #17 | #35 | +18 |
| Commencal Meta SX V5 Race | #21 | #39 | +18 |
| Kona Process X | #4 | #8 | +4 |
| Scott Ransom 900 RC | #90 | #90 | 0 (no-op — see (d)) |

The **Pivot Firebird** (`cb-pivot-firebird-gx-ttype-jenson`, `src/compat.js:9212`;
`price:7899, streetPrice:4299.94`) presents as the **#2 best-value bike on the entire site**, ahead
of every bike whose maker's sale simply wasn't recorded. On the MSRP basis every other row is judged
by, it is #68. Its model name contains **"(Jenson Exclusive)"** — the catalog is carrying **one
affiliate retailer's exclusive-build sale price** as a bike's headline. (Jenson is an AvantLink
retailer; AvantLink is the named primary network in the monetization plan.)

**To be explicit and fair: there is NO evidence of a monetization motive, and this is not the
worker's error.** The row is unverified/sample, carries **no `source`** and **no `retailerLinks`**
(0 of 3,763 parts carry any — see Clean §C1), and its `desc` documents an honest fetch of
vitalmtb's product-guide page which itself listed **both** figures ("$7,899.00 MSRP / $4,299.94
Jenson Exclusive"). The worker recorded what the page said — exactly the diligence the protocol
asks for. The bike is a genuinely real product under that name.

**The defect is the mechanism, not the row.** Because `save` keys off the discounted headline,
faithfully recording a real sale *silently promotes that bike to #2-best-value sitewide*. "The
best-value bike on the site is a single affiliate retailer's exclusive, at that retailer's sale
price" is precisely the shape of thing the UNBIASED value exists to prevent — and it arrived with
nobody choosing it. Fix it at the mechanism level, not by editing one row.

**Three further defects in the same mechanism:**

- **(b) Display and sort disagree.** `SORTS['price-asc']` sorts on `p.price` (MSRP,
  `index.html:2101`) while the card displays `streetPrice`. The Pivot **displays $4,299.94 but
  sorts at position 100 of 114**, where a $7,899 bike sorts — a user sorting price low→high sees a
  $4,299.94 card wedged between $7k bikes. A plain correctness bug, independent of bias.
- **(c) No staleness field.** There is no `streetPriceDate`. `lastChecked` covers the row, not the
  sale. Sale prices rot in days; MSRP doesn't. `src/schema.js:750-752` validates only
  `streetPrice <= price`, so a two-year-old sale keeps its inflated badge indefinitely.
- **(d) One row is a no-op.** Scott Ransom 900 RC has `streetPrice === price` ($8,499.99), rendering
  "MSRP $8,499.99 / $8,499.99 complete". Harmless — but it shows **no entry policy governs the
  field**; it's applied ad-hoc by whichever worker noticed a sale. That is uneven
  discount-visibility by construction.

**Recommendation:**

1. **Fix the `save` basis regardless of everything else** — compute `save = partsTotal − p.price`
   (always MSRP) so the savings claim uses one consistent basis across all 114 bikes; keep
   `streetPrice` as an informational "on sale now" line. One-line change; kills the +66-place
   distortion. **Unambiguous — recommend doing this now.**
2. **Make sort and display agree** — either sort on `streetPrice || price`, or display MSRP as the
   headline. Either is defensible; they must match. **Unambiguous.**
3. **Set an entry policy + staleness** *(Douglas's call)*: (a) drop `streetPrice` from the 6 rows
   and let MSRP be the one basis — simplest, most honest, zero upkeep; or (b) keep it, add a
   required `streetPriceDate`, hide the figure once stale (>30 days), and commit to recording sales
   **category-wide, maker-by-maker** rather than opportunistically.
4. **Decide whether retailer-EXCLUSIVE SKUs belong in a maker-neutral catalog at all** *(Douglas's
   call)*. If the Pivot Jenson row stays, fix 1 already neutralizes its unfair promotion.

---

## 2. HIGH · STRUCTURAL — Rule 14b (`front-tire-fork`) has become a near-perfect **RockShox-only penalty**

The -07-12 audit's structural note (#4: "dormant-until-sourced makes better-documented brands show
MORE warnings") is now **realized at scale in the sport's key duopoly**. Fork `maxTire` coverage
grew 30 → **178 of 364**, but almost entirely on one side.

**Enduro-class forks (travel ≥ 150) — `maxTire` have / missing** (independently re-verified):

| Brand | have | missing |
|---|---|---|
| **RockShox** | **62** | 4 |
| Manitou | 21 | 0 |
| Öhlins | 16 | 6 |
| Cane Creek | 8 | 0 |
| **Fox** | **0** | **30** |
| Formula / DVO / X-Fusion / Marzocchi / EXT / SR Suntour | **0** | **61** |

Fox carries `maxTire` on **2 of 55 rows catalog-wide** — `fk-fox-32-sc-factory-29-100` and
`fk-fox-32-sc-factory-275-100`, both XC, both 2.4. **Zero** Fox 36/38/40 rows carry it. RockShox:
**99 of 111**.

**Measured effect** (same-wheel fork × tire pairs): RockShox raises **318 warnings**, Fox **132** —
and all 132 of Fox's originate from those 2 XC rows. **A shopper cross-shopping a RockShox Lyrik vs
a Fox 36 with a 2.6 tire sees the Lyrik go yellow and the Fox stay green — purely because RockShox
published a chassis clearance.** In the one head-to-head class where it costs most.

This is **structural, not editorial** — the architecture (a missing rule beats a wrong rule) is
right. But the harm is concentrated exactly where the catalog can least afford it.

**Recommendation (ADD-data):** a targeted **Fox `maxTire` wave**. Fox publishes per-chassis tire
clearance in its owner/service manuals (fox.com help centre → fork specs) — the same class of
document that produced RockShox's 99 rows. Where a chassis genuinely publishes nothing, record that
in the row `desc` so the silence is deliberate, per the -07-12 audit's own per-class-evenness
target. This is the highest-value engine-fairness grind available.

---

## 3. MEDIUM-HIGH · SEMANTIC BUG (latent bias tail) — "✓ Verified only" **blanks the entire landing view**: 0 of 114 bikes pass

This began as a hypothesis that the verified badge would *skew* by maker. It doesn't skew — it is
**totally inert**, which is worse.

**Measured: `partVerified()` returns false for all 114 complete bikes.** So:

- Toggling **"✓ Verified only"** on the Complete Bikes landing view yields **zero cards** and the
  empty state *"No verified parts in this category yet…"* (`index.html:2089`). The flagship surface
  goes blank behind its own trust filter.
- **All 114 render `≈ estimate`** (`provHtml`, `index.html:1487-1489`) — **including the 58 rows
  (50.9%) carrying `verified:true`** with a fetched maker build sheet and price. Real, sourced
  provenance is invisible on the surface built to showcase it.

**Mechanism** (`src/compat.js:12008-12015`): a completebike has `fills`, so `partVerified` takes the
**kit branch**, ignores the row's own flag, and requires **every fill part** to be verified:

```js
if('fills' in p && p.fills){
  var ks = Object.keys(p.fills);
  return ks.length > 0 && ks.every(function(s){ var c = byId(p.fills[s]); return !!(c && c.verified === true); });
}
return p.verified === true;   // <-- completebike rows never reach this line
```

That bar is **unreachable** for a ~22-slot bike: mean fill-verified rate **59.5%**, best-covered is
Commencal Meta SX V5 Race at **22/23 (96%)**, and **0 of 114 reach 100%**. The blockers are the long
tail of OE house-brand parts that by nature have no maker spec page — **stem blocks 92 bikes (81%),
handlebar 89 (78%), rearWheel 82 (72%), grips 82 (72%)**.

**Evidence it's unintended, not a deliberate call:** no test covers the completebike case.
`test/test-ui.js:33-45` pins `partVerified` for *components* and *groupset kits* only. Complete
bikes fell into the kit branch by accident of carrying `fills` — the branch predates the category.
`test/test-golden.js:472` checks every completebike is `checkBuild`-clean but asserts nothing about
its badge.

**It's a semantic error, not just too strict a threshold.** The kit branch's all-parts rule was
written for groupset kits (REVIEW.md #11), where "✓ Parts verified" is the honest claim. A
completebike's own `verified:true` asserts something genuinely different and independently
valuable: *the factory build sheet and price were confirmed against a real maker page*. Collapsing
that into "are all 22 components individually verified?" throws away a true claim to avoid
overclaiming a different one.

**The bias tail — why this is in a bias audit.** The skew is *latent but loaded*: it fires the
moment someone "fixes" the badge by naively switching to `p.verified`. On that basis the verified
view drops **40 makers → 26**, with **14 makers (36 bikes) vanishing entirely** — Specialized (11 —
the catalog's *most*-represented maker, 0/11 verified), Propain (4), Nukeproof (4), Pivot (4),
Yeti (4), Evil (4), Orbea (3), Trek (3), Norco (2), Rocky Mountain (2), Ari (2), Chromag (2),
Mondraker (1), Cannondale (1) — almost exactly the documented fetch-walled/premium-US set. **Santa
Cruz (9/9) would jump 7.9% → 15.5%** to become the verified view's largest maker. That's -07-12
finding #1 reproducing on the new surface. Flagged now so the fix ships with the skew understood.

**Recommendation:**

1. **Give completebike its own badge semantics.** The honest, precise claim is a build-sheet
   badge — e.g. **"✓ Build sheet verified"** (row `verified:true` + `source`), hover text noting the
   factory spec and price were checked against the maker and that components carry their own
   provenance. Preserves the REVIEW.md #11 no-overclaim principle without discarding a true claim.
   Reserve a stronger state ("build sheet + all parts verified") for the eventual 100%-fills bike.
2. **Point the "✓ Verified only" toggle at that predicate** so the filter is useful, not blank. The
   badge and the filter must use the same predicate.
3. **Ship it with the maker skew visible** — pair with a UI note that the filter reflects *what
   makers publish*, not quality, and with targeted verification waves at the 14 would-vanish makers.

**Hypothesis DISPROVED (recorded so it isn't re-investigated):** on the row-flag basis the verified
filter does **not** distort the *price* of the market shown — median identical ($5,299 both),
verified mean slightly *lower* ($5,249 vs $5,399), entry-tier share *rises* (13.2% → 17.2%). It
would hide makers, not price tiers.

---

## 4. MEDIUM-HIGH · STRUCTURAL — Frames: Specialized **0/11** and Trek **0/7** verified; unmoved in 4 days

Every other top-count frame brand moved: Transition 10/11 (91%), Commencal 8/10, RAAW 7/7, Yeti 7/7,
Vitus 7/8, Santa Cruz 8/11. The two biggest mainstream brands remain at **0%** and vanish from the
trust-branded filter. Cause is the known fetch-wall. The same brands are worst on `designForkTravel`
(**Specialized 1 have / 10 missing** — worst ratio of any multi-row brand; Transition 11/0, RAAW
7/0, Yeti 7/0).

**This compounds with #3**: Specialized is simultaneously the *most-shown* maker on the landing view
(11 complete bikes, 9.6%) and the *least credible* (0 verified) — and #9 casts its flagship as the
site's demo of a broken bike.

**Recommendation:** the strongest concrete case yet for the **web-unblocker connector gap** (Bright
Data / Tavily / Exa) already on Douglas's standing notify-missing-tools order — Specialized and Trek
are exactly the hosts it unblocks. Secondary: the measured-weight policy (`sourceType:'measured'`)
already unblocks the weight axis; the interface axis still needs the page. **Note Giant and Scott
are now 3/3 verified on complete bikes**, so the -07-12 "Giant is walled" assumption is partly
stale — re-test rather than assume.

---

## 5. MEDIUM · STRUCTURAL — `minRotorF` absent on all 11 SR Suntour forks → they alone can never fire rule 10's error

Coverage is now **322/364 (88.5%)**, making this a single-brand outlier. Rule-10
`front-rotor-min` error rate over fork × rotor pairs: RockShox 41.3%, EXT 41.2%, Fox 39.7%,
Öhlins 36.5% … Formula 6.8% — **SR Suntour 0.0% (0 of 1,914 pairs; 0 of 11 rows carry the field)**.
An SR Suntour fork **greens on a 140 rotor where every rival reds**. Ids:
`fk-srsuntour-durolux-r2c2-29-{160,170,180}`, `fk-srsuntour-aion-34-{29,275}-*`,
`fk-srsuntour-axon-werx-34-29-{100,110,120}`.

This is the -07-12 per-class-evenness case, still open. **Recommendation:** source SR Suntour's
native PM size from its service-manual PDFs (srsuntour.com publishes them); or note the gap in
`desc` so the silence is deliberate.

---

## 6. LOW-MEDIUM · MIXED — Trim-tier skew: 21 of 40 makers single-band; catalog skews premium

- **Band mix:** mid ($3–6k) 58 (50.9%), flagship ($6k+) 41 (36.0%), **entry (<$3k) just 15 (13.2%)**
  — the volume end of the real market is the thinnest band.
- **Full-ladder makers (entry+mid+flagship): only Specialized (3/7/1), Scott (1/1/1), Trek (1/1/1)**
  — i.e. the makers shown most *completely* are the ones shown least *credibly* (#4).
- **Santa Cruz is 8/9 flagship, 0 mid** — and simultaneously the top maker of the (latent) verified
  view. Santa Cruz is genuinely premium, but it does sell mid-tier R/S kits; 89% flagship overstates
  even its real positioning.
- **Single-band (21/40):** Pivot (4 flag), Evil (4 flag), YT (4 mid), Propain (4 mid), Ibis (3 mid),
  Revel (3 mid), Norco, Rocky Mountain, Polygon, Rose, Forbidden, Kona, Chromag, Ghost, Marin,
  Vitus, Focus, Cotic, Whyte, Salsa, Mondraker, Cannondale, Intense, Merida, Ragley. Evil
  ($8,299–9,499) is fairly flagship-only in reality; **Pivot ($6,799–7,899) is not** — it sells
  cheaper trims.

Mostly a natural artifact of grind order (flagship-first per the scope doc's phasing) — low severity
because the fix is ordinary grind work. **Recommendation:** a targeted **entry/mid-trim fill-out
wave** (esp. Santa Cruz R/S builds, Pivot's cheaper trims, the entry band generally). Pure add-data;
also serves the under-served <$3k shopper.

---

## 7. LOW · EDITORIAL — `loadBad()` permanently casts one named brand's flagship as "the broken bike"

`index.html:4116` — the user-facing **"Show clashes ✗"** button (`:853`, `:4198`) loads a fixed
build pinned to **`fr-specialized-enduro-sworks`**. It's the app's only one-click demo of a wall of
red, and the same Specialized frame appears every time. The actual clashes are drivetrain/wheel-size,
**not the frame's fault** — but the visual pairing is a real editorial asymmetry, and it lands on the
brand that is *also* 0% verified (#4) and the most-shown on the landing view.

**Recommendation:** rotate the demo frame per click (or pick a frame whose brand isn't
simultaneously disadvantaged elsewhere). Tests unaffected — `test-golden.js` pins the *good* builds,
and the comment at `:4029-4030` confirms `loadBad` is the deliberate exception.

---

## 8. LOW · STRUCTURAL — Wheel `minTire` (rule 14c) live on 5 boutique brands only: 34/441 (7.7%)

Spank 11, ENVE 8, WTB 6, Hope 5, Stans 4. **Zero** on DT Swiss (0/56), We Are One (0/41),
Crankbrothers (0/38), Industry Nine (0/24), SUNringle (0/27), Specialized (0/12), Reserve (0/13).
Low severity: the rule is a soft warning firing only below a maker-published minimum, and with 93%
of wheels silent the *baseline is silence* — the 5 sourced brands are the outliers rather than the
rest being unfairly advantaged. **ENVE (8) is new since -07-12** — the sourced set is growing
brand-by-brand, which is the pattern to avoid. **Recommendation:** prefer category-wide sweeps over
brand-at-a-time.

---

## 9. LOW · EDITORIAL — One maker-marketing superlative in kit copy (the only one in the codebase)

`src/kit.js:1073`: `desc:"Yeti's best-selling trail short per the maker's own site: …"`. It is
**attributed**, which mostly saves it — but it is the **sole** row across 3,763 parts and 2,036
lines of kit data repeating a maker's marketing claim (grep for
`best-selling|most popular|award-winning` returns exactly this one hit across `kit.js`, `compat.js`,
`guides.js`). Because no rival short carries an equivalent claim, it reads as a soft endorsement.
**Recommendation:** drop the clause — the fit/length/MSRP facts stand alone — before the field
becomes a de-facto marketing surface as kit grows.

---

## 10. LOW — Discipline mix under-represents XC and DH; `SAMPLE_FALLBACK` skew persists

- **Complete bikes:** trail 60 (52.6%), enduro 52 (45.6%), **xc 11 (9.6%), dh 1 (0.9%)**. Faithful
  to the project's enduro/trail origin, not a manufacturer bias per se — but XC/DH-focused makers
  are structurally under-shown on a general MTB builder. Lifts naturally as hardtails land.
- **`SAMPLE_FALLBACK`** (`index.html:4039`, now 8 themes): brakes **rebalanced** (Shimano 8 > SRAM 4
  — the -07-12 ask, done); drivetrain 5 SRAM / 3 Shimano. Still skewed: **forks 6/8 RockShox, shocks
  6/8 RockShox, grips 6/8 OneUp**. Severity stays low — `generateSampleBuild` is the primary path
  and these appear only on roll failure. Diversify opportunistically (one Fox/Öhlins fork+shock
  theme) next time they're touched.

---

## ✅ Confirmed FIXED since the -07-12 audit

| Prior finding | Status | Evidence |
|---|---|---|
| **#2 XDR hard-errors every cassette** | **FIXED** | `src/compat.js:11215` — rule 6c is now a direction-aware WARNING with structured fix `{kind:'adapter', name:'1.85mm XDR cassette spacer'}`, cited to SRAM's XD/XDR driver-body article (`:11205-11208`). The 2 WTB CZR i30 XDR wheels are buildable again; XDR-cassette-on-XD still errors (correct). |
| **#5 "Best match" tie-breaks on insertion order** | **FIXED, and fixed well** | The `featured` sort is gone; default is `sortBy='random'` (`index.html:1337`) — a **true uniform Fisher-Yates shuffle** (`:1963-1979` `reshuffleCatalog`), redrawn per page load and per category switch (`:1565`); insertion index survives only as a total-order backstop (`:2096`). The code comment records the reasoning: a rank-first order "reads as bias no matter how the ties are broken". Data-entry history no longer decides what surfaces first — on **every** surface, complete bikes included. |
| **#4 flat-mount caliper ceiling on 2 of 4** | **FIXED — the exact cited case** | All **4/4** FM calipers now carry `maxRotor`; the two previously-missing rows are now verified with real sources: `bk-hope-xcrpro-x2-fm` (160, hopetech.com), `bk-sram-level-ultimate-fm` (180, SRAM caliper-mounting PDF). PM calipers are **0/81** — uniformly absent by design (`:11278-11290`), so no asymmetry. |
| **#1 verified-rate inversions** | **3 of 4 FIXED** | Shocks: RockShox **8.4% → 99%** (387/389). Drivetrain: was SRAM 80.8% / Shimano 40.8% → now **SRAM 70% / Shimano 86%** (inverted, near-even). Forks: DVO 4%→11%; RockShox 49% ≈ Fox 51%. **Still open:** frames (finding #4). |

---

## Checked CLEAN (for the record — including hypotheses this audit disproved)

- **C1 — Affiliate isolation holds, catalog-wide.** Measured: **0 of 3,763 parts carry
  `retailerLinks`; 0 carry `image`** — including all 114 completebike rows. Both remain unread by
  `checkBuild`/`compatOf`/`buildTotals`, and no sort ranks by monetizable-ness (`SORTS`/`ROW_SORTS`,
  `index.html:2046-2053`, `2098-2103` = random/name/price/weight only). *(The Pivot "Jenson
  Exclusive" row in #1 is a pricing-basis concern, NOT an affiliate-link leak.)*
- **C2 — Complete-bikes browse granularity is CLEAN** (the family-picker precedent). The shock
  problem (RockShox 49% of flat rows) does **not** reproduce: 114 rows across **87 families = 1.31
  rows/family**, **no family ≥4 rows**, every row has a `family` (0 missing). Max per-maker:
  Specialized 11 rows / 7 families (1.6), Santa Cruz 9 / 5 (1.8) — no maker floods via variant depth.
  Complete bikes are deliberately not family-grouped (`FAMILY_GROUPABLE=['shock','fork']`,
  `index.html:1364`), which is correct at 1.31 rows/family. Combined with C2's shuffle, top-of-list
  share ≈ row share ≈ 9.6% worst case. **No action.**
- **C3 — `generateSampleBuild` frame selection is well-distributed** (measured, 600 seeds × 8
  themes): **55 distinct frame brands, top only 6.6%** (Commencal), 2nd 6.5% (Santa Cruz); per-theme
  tops mostly 7–8%. Mechanism is brand-neutral (fit-filter → price-band sample). Two theme-level
  concentrations are **catalog-depth artifacts, not generator bias**: dh → Commencal 21.7% (only 14
  DH frames exist) and xc → Yeti 16.7% (only 15 XC frames). Both dissolve as those thin categories
  grow (#10).
- **C4 — Sample-build component slots inherit catalog row-share**, as -07-12 predicted. Measured
  tops: shock RockShox 38.1%/Fox 21.1%; fork RockShox 31.5%/Fox 17.5%; brake SRAM 33.5%/Shimano
  18.5%; tire Maxxis 26.7%; crankset SRAM 27.1%/Shimano 22.0% (near-even, matching that category's
  near-even catalog). Fixing the catalog fixes the generator; **no generator change warranted**.
  Cockpit/saddle/wheel slots are healthily diffuse (handlebar top brand 7.6% across 52 brands).
- **C5 — Engine neutrality: every brand-name branch in `checkBuild` is faithful standard-ownership,
  not favoritism.**
  - **Rule 3a AXS-controller exemption** (`:11131-11136`) — gated on
    `actuation==='electronic' && (sram-eagle|sram-transmission)`, cited to support.sram.com.
    Correctly does *not* cross to non-SRAM (`:11135` errors honestly). No cataloged non-SRAM
    electronic MTB controller exists to exempt (Di2 MTB absent), so it disadvantages nobody.
  - **Rule 3c T-Type/Flattop** (`:11165-11171`) — SRAM's own documented one-way incompatibility;
    reverse direction correctly silent.
  - **Rule 9 SM-RTAD05** (`:11306`, `:11312`) — still "e.g."-qualified and the canonical product;
    direction-aware (CL-rotor-on-6-bolt errors — no adapter exists).
  - **Rule 10/10b** (`:11322-11332`) — **no "SRAM/Shimano rotor-class tolerance" exists in the
    engine**; both are pure numeric comparisons, no brand string. *(Note: a catalog `desc` on the YT
    Jeffsy row claims such a tolerance exists — that comment is wrong and worth correcting, but the
    engine is clean.)* `maxRotorR` is **199/199 frames = 100%** — perfectly even, no dormancy
    asymmetry.
  - **Rule 12 error-vs-warning tiering** (`:11340-11360`) — **clean and source-driven.** Tier is set
    by the per-row `forkTravelHard` flag, not by brand. ERROR tier: Ibis 6, Santa Cruz 4, Knolly 2,
    Forbidden 1, Cotic 1, Nicolai 1. WARNING tier: Santa Cruz 3, Ragley 2, Stanton 1, Pipedream 1.
    **Santa Cruz appears on both sides** — proof the tier tracks the cited source's language, not the
    brand.
  - **Rule 16b `coilApproved`** — **0/199 frames carry it; fully dormant → zero bias by
    construction.**
  - **`headTubeUpper`** 116/199 (58.3%) across 30+ brands, no monopoly; Specialized is 9/11 here
    (vs 1/10 on `designForkTravel`), so the gap is **per-field, not a blanket Specialized penalty**.
  - **`leverAccepts`** (rule 19) 45 parts: Shimano 16 / SRAM 23 / TRP 4 / Hayes 1 / Tektro 1 —
    proportionate. **`clampType`** 19: SRAM 9 / Shimano 6 / microSHIFT 2 / Box 2 — proportionate.
  - **`frame.maxTire`** (rule 18) grew 10 → **105/199 (52.8%)** across 17 brands — materially fairer
    than -07-12's 10-frame dormancy.
  - **WATCH-ITEM (not a finding): Rule 4 UDH retrofit tier** (`:11183-11185`) reads
    `frame.udhRetrofitKit`, live on **2 RAAW frames only**, vs **72 non-UDH frames across 38 brands**
    that hard-error. Correct today — RAAW is one of very few makers actually selling a documented UDH
    retrofit kit. **But if another maker ships one and it goes unsourced, this becomes a real
    asymmetry.** Add to the entry-wave checklist.
- **C6 — Guides & copy are clean.** `src/guides.js` (all 14 guides, 161 lines): zero endorsement,
  zero brand superlative, zero asymmetric framing. Every brand mention is factual
  standard-ownership: XD/XDR/AXS/Transmission/UDH/Flattop (SRAM), Center Lock/HG/MicroSpline/
  SM-RTAD05 (Shimano), LG1r (e*thirteen), Pivot Firebird (as the *counter*-example for the
  deliberately-rejected chainline rule), Problem Solvers Super Booster, Maxxis EXO+ / Schwalbe Super
  Trail / Continental Endurance (`:120`, cited **explicitly as non-comparable** — a model passage:
  the casings "aren't interchangeable labels for the same thing"). The file header (`:16-21`) states
  the anti-bias contract; it holds. The new `dirt-jump-bikes-101` and `frame-materials-explained`
  guides are brand-free. **`privacy.html`/`terms.html`/`affiliate-disclosure.html`: zero
  manufacturer mentions.** **`src/forum.js`: zero brand mentions.** **`index.html` prose:** all brand
  hits are code identifiers, comments, or `SAMPLE_FALLBACK`/`loadBad` data; the one prose hit
  (`:1115`, a report-modal placeholder naming SRAM Transmission + RAAW Madonna) is a neutral
  bug-report example. **`src/kit.js`:** "flagship" appears 4× but is symmetric factual tier-
  positioning across brands — only #9 stands out.
- **C7 — Price-band distortion under the verified filter: DISPROVED.** See #3.

---

_Read-only audit; no catalog, engine or UI file was modified. Branch `audit/bias-2026-07-16`,
presented for review, not pushed to main. `src/compat.js` deliberately untouched (grind #5 editing
in parallel). Counts drift with every catalog commit — re-measure before acting on a number._
