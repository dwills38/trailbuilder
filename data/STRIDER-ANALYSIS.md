# Balance-bike ("Strider") Product & Architecture Analysis

**Status:** design doc — **OFF-LIVE, no decisions made.** This round is docs only: no live-app
changes, no catalog rows. It analyses the real balance-bike market and answers, honestly, the
question Douglas posed — **is this a compatibility BUILDER, a fit/sizing GUIDE, or both?** — then
**recommends and leaves the call to Douglas** (see **DECISIONS FOR DOUGLAS** at the end). Companion:
**`data/STRIDER-MODEL.md`** (the data-model spec this argument implies). Templates followed:
`data/DJ-BMX-COMPAT-ANALYSIS.md`, `data/BMX-MODEL.md`.

Date: 2026-07-17. Every market claim below is grounded in a source fetched this round (§8).

---

## 0. TL;DR

- **A balance bike is a complete-bike purchase with ~zero aftermarket part-swapping.** No
  drivetrain, no separate wheelset/fork market, brakes trivial or absent. The
  "pick-parts-and-check-fit" paradigm that powers TrailBuilder/BuildMyBMX/DJ **has almost no surface
  area here.** Forcing balance bikes into a component *builder* would be dishonest to the product and
  useless to parents — there are no parts to assemble.
- **What parents actually need is a FIT decision:** *"Which bike fits my 2-year-old right now, and
  how long will it last?"* That is an **inseam → seat-height matcher + an unbiased spec comparison**,
  not a compatibility engine. The whole niche is decided on **seat height, weight, tires, brake,
  and grow-room** — a matching/filtering problem.
- **Recommendation (decisive, but Douglas's call): build it as a FIT/SIZING GUIDE + unbiased
  comparison (a "First Bike Finder"), wearing a thin "builder"-style shell** so it keeps the family
  resemblance (the four-state fit dot, the clean single-page tool) — plus **one genuine part-fit
  rule** (pedal-conversion kits). Center of gravity: **guide, ~80%; builder-flavored shell, ~20%.**
- **Architecture:** its own tiny off-live engine `checkBalanceFit` (rider-to-bike fit), sharing the
  `Verdict`/`verdictKey` primitives — the same call the BMX doc made, and cleaner here. Its own
  page + button (BuildMyBMX precedent), OFF-LIVE until Douglas's word.
- **"Nailing the niche" = being the most honest, complete, UNBIASED balance-bike fit-and-comparison
  tool on the internet** — beating the static review-site charts parents use today with an
  interactive, inseam-driven matcher and no affiliate bias. (The UNBIASED value is load-bearing.)

---

## 1. The market — a real analysis

### 1a. Structure: complete bikes, sold whole, chosen by parents

The balance-bike market is **~25 brands** spanning four clear price bands:

- **Budget ($79–130):** Retrospec Cub ($79), Yedoo Too Too ($99), Radio Flyer Ultra Lite ($99),
  Banana Bike, Bixe, Chillafish. Foam tires, often no brake, heavier.
- **Mid ($150–270):** Guardian ($149), Strider 12 Sport ($120)/Pro ($170), Specialized Hotwalk
  ($269), Cannondale Kids Trail Balance (~$180), Early Rider Big Foot 12 ($269). The volume tier.
- **Premium ($240–350):** woom 1/GO 1 ($249) & 1 PLUS ($299), Prevelo Alpha Zero ($259), Frog
  Tadpole ($300), KUbikes. Lightweight aluminum, air tires, hand brake, thoughtful kid-geometry.
- **Halo / carbon ($600–1,000):** Giant Pre rCarbon (€599, 5.1 lb), **Specialized Hotwalk Carbon
  ($1,000, 4 lb 6.5 oz — carbon frame/fork/bars/wheels).** Proof the niche supports genuine
  aspiration/gift spending.

Two brands anchor the mental model: **Strider** (Rapid City, SD — the category-defining
minimalist: foam tires, no brake, an 11″→17″(→19″ XL) seat range so *one bike lasts years*) and
**woom** (the premium benchmark — 6.6 lb, air tires, rear hand brake, steering limiter, ~5″ of
adjust, obsessive kid-geometry). Specialized and Cannondale bring MTB-brand halo (Hotwalk Carbon;
Cannondale's Lil' Lefty fork). Every one of them is **bought as a finished bike.**

### 1b. There is real fit science here (this is the opportunity)

The niche is not frivolous — there is genuine, researched fit knowledge parents struggle with:

- **Frog Bikes** commissioned Brunel University's Centre for Human Performance to test ~250 children
  (age 2–16) on a bike-fitting rig, driving narrow-Q cranks, shorter crank arms, and swappable bars.
- Every guide converges on the **inseam → seat-height rule**, the **≤30% body-weight rule**, and
  the **"don't buy a size up" mistake** (see MODEL §3). These are *exactly* the facts parents get
  wrong, and exactly what a smart tool can get right.

### 1c. The competitive landscape is STATIC review charts — and that's the gap

Today a parent researching a first bike lands on **twowheelingtots, Ready Set Pedal, Rascal Rides,
Wirecutter, Cascade Gear Reviews** — excellent, but **static comparison tables and prose.** The
parent still has to: measure the inseam, mentally cross-reference it against a dozen seat-height
rows, weigh the 30% rule, and decide. **No one offers an interactive "enter your child's inseam →
get ranked, honest, cross-brand matches."** That is the wedge. TrailBuilder's core competence —
**structured unbiased product data + a smart real-time matcher + a clean single-page UI** — is
*exactly* what turns those static charts into the tool parents wish existed.

---

## 2. Why seat height, not wheel size, and why "builder" barely applies

- **Wheel size is a decoy.** Two 12″ bikes can differ by 2″+ in minimum seat height — the
  difference between an 18-month-old riding and not riding. Fit = **seat height vs. inseam**, full
  stop (MODEL §3). A tool that leads with wheel size (like a normal bike shop) would mislead.
- **The "build" has one part.** Strip a balance bike to its checkable interfaces and you get: a
  frame, a fork, two wheels, bars, a seatpost, a saddle, maybe one brake — none of which anyone
  shops separately, and all of which the maker has already matched. There is **no BB/crank rule, no
  drivetrain rule, no cassette/derailleur/chain rule** — i.e. most of what `checkBuild` *is*.
- **So a component builder would be a hollow shell** — 20 slots, 19 of them either absent or
  never-swapped, and a "compatibility" verdict that is always green because there's nothing to
  conflict. That is the opposite of the product's honesty value: a green dot that means nothing.

The honest read: **the value is in FIT (rider↔bike) + COMPARISON (bike↔bike), not COMPATIBILITY
(part↔part).**

---

## 3. The real value surface (what the tool should actually do)

1. **Inseam → bike fit finder.** Parent enters child's inseam (with the "book-and-wall" how-to
   inline), optionally weight/age; tool returns **ranked complete bikes** with a four-state fit dot
   (green fits-with-growth / yellow marginal / red too-big-or-small / grey no-input). This is the
   hero feature and the honest analog of the compat dot.
2. **Unbiased spec-comparison grid.** Every bike, every brand — seat range (in **and** cm), weight
   (+ % of the child's weight if entered), tire type, brake, footrest, steering limiter, frame
   material, standover, price, and a **price-per-year-of-use** derived metric. Honest filters, no
   pay-to-rank. (The load-bearing UNBIASED value: affiliate funds it but **never** orders it —
   ranking is always by fit + the parent's chosen filters, never by commission.)
3. **Parent education, baked in (no pop-ups).** The 30% weight rule, the inseam method, air-vs-foam,
   brake/lever-reach, "don't buy a size up," and the balance→pedal path — presented cleanly on the
   page, never as an interstitial (hard rule 2).
4. **The one real build check:** pedal-conversion-kit fit (MODEL §6) — the lone genuine part-to-part
   rule, doubling as a "this bike grows into a pedal bike" upsell/education surface.

---

## 4. The three framings, evaluated

**(a) Component compatibility BUILDER (the literal TrailBuilder/BMX paradigm).** ❌ **Rejected.**
No drivetrain, no aftermarket part market, no real part-to-part conflicts. Would produce empty slots
and meaningless always-green verdicts. Dishonest and useless for this niche.

**(b) Fit/sizing GUIDE + unbiased comparison (a "First Bike Finder").** ✅ **Recommended core.**
Matches the real job-to-be-done, uses genuine fit science, beats the static review charts, and is
*more* aligned with the product's honesty/unbiased values than a hollow builder would be. Risk: it
looks less like the flagship builder — mitigated by (c).

**(c) HYBRID — guide core in a thin builder-style shell.** ✅ **Recommended packaging.** Keep the
family resemblance: the single-page tool, the four-state dot (applied to whole-bike fit), the clean
"pick + see verdict" loop — but the "pick" is *pick a bike for your child*, and the optional
"build" step is *add the pedal kit* (the one real compat check). Best of both: honest guide value,
consistent brand feel across buildmymtb / buildmybmx / this.

**Net recommendation: (b) as the substance, (c) as the shell.** ~80% fit-guide, ~20% builder-flavor.
Douglas decides the balance (DECISIONS FOR DOUGLAS Q2).

---

## 5. What "nailing the niche" should mean

Douglas's word was **NAIL** this niche. Concretely, that means being:

1. **The most honest, complete, UNBIASED balance-bike fit tool on the internet.** Every brand
   (not just affiliate partners), full seat-range/weight/feature data, ranked only by fit + the
   parent's filters. The thing the static review sites can't be because they're editorial/affiliate.
2. **The best inseam→bike matcher** — because *fit* is the decision parents most get wrong, and the
   one a tool can nail. Inseam in, ranked honest matches out, with the "why" shown (growth room,
   weight %, brake, tires).
3. **A parent-trust product.** First-bike buying is emotional and confusing; a calm, ad-free,
   pop-up-free, jargon-free tool that *teaches while it recommends* earns trust — and trust is the
   moat for a family brand that later sells pedal bikes, kit, etc.
4. **A clean on-ramp to the "balance→pedal→MTB" pipeline.** The pedal-conversion axis and the woom/
   Strider/Prevelo *size ladders* mean this tool naturally hands the family up to the next bike — a
   strategic tie to the pedal-bike/kids' line and, eventually, buildmymtb itself.

Nailing it is **not** about the most SKUs or the flashiest builder — it's about being the tool a
parent trusts to answer "what's the right first bike for MY kid," better than anyone.

---

## 6. Architecture recommendation

**Own tiny off-live engine `checkBalanceFit` in `src/compat-balance.js`**, sharing the MTB
`Verdict`/`verdictKey` primitives (shared, not copied — exactly as `src/compat-bmx.js` does).
Rationale, mirroring the BMX §3 decision and *stronger* here:

- Balance bikes share **zero** rules with MTB/BMX and operate on **complete bikes + a rider
  profile**, not a slot map. Folding them into `checkBuild` (option a of the BMX analysis) would be
  all cost, no reuse, and would leak toddler-fit assumptions into the MTB engine — the exact
  silent-false-verdict hazard the project most fears.
- A separate small engine + separate off-live data + separate tests (`test-balance-*.js`) is
  independently developable and shippable, and is a **file-move on-ramp** to a future standalone
  page/site (the "site may split per type" future — buildmybmx precedent). Its own **page + button**,
  OFF-LIVE until Douglas's word.
- The UI reuses the four-state dot and the single-page layout at the **whole-bike** level; there is
  no 20-slot build panel. Price/weight "totals" collapse to one bike (+ optional kit).

**Data:** off-live `data/balance-bikes.js` (`BALANCE_BIKES`) + optional `pedalkit`/`seatpost` rows,
under the same schema/provenance contract (MODEL §4, §7). Nothing the live site serves loads any of
it until go-live — identical dormancy to BMX (`compat-bmx.js` + `data/bmx.js`).

---

## 7. Safety & sizing facts that matter to parents (education content the tool should carry)

(Condensed from the fetched guides — the substance behind the fit engine, and the on-page education
that builds trust. Full detail + the fit rules in MODEL §3/§5.)

- **Inseam → seat height:** min seat **~0.5–1.5″ below inseam** (feet flat, slight knee bend);
  max seat **≥ inseam + ~2″** for growth. Seat height, not wheel size, is the fit axis.
- **Weight ≤ 30% of the child's body weight** (Cannondale: "≤30–40%"). Lighter = more control,
  fewer tip-over injuries, more fun — the reason carbon/alloy bikes exist.
- **Air vs foam tires:** air = grip + cushion (better outdoors/curbs) but heavier + can flat;
  foam = light, never flats, less grip (fine on smooth pavement). A real tradeoff, not a
  right-answer — present it honestly.
- **Brakes:** optional; useful once the child is ~2.5–3.5 yr and moving fast (a real
  shoe-shredding/toe-dragging pain point parents report). If present, a **short-reach lever for
  small hands** matters. Brakeless is valid and common (Strider's whole line).
- **Steering limiter:** prevents front-wheel jackknife on the youngest riders (woom/Guardian/Early
  Rider). Nice-to-have; some brands (Strider/Prevelo) omit it deliberately.
- **Footrest:** convenient for coasting/downhill; occasionally a shin-snag; not essential.
- **"Don't buy a size up":** the #1 documented parent mistake — a too-big bike can't be ridden
  safely and stalls the confidence-building the balance stage exists for.

---

## DECISIONS FOR DOUGLAS

Open product-design calls this round surfaced — **nothing here is decided; these are yours.**
(The worker never prompts mid-task; per the standing order, all open questions are collected here.)

1. **[HIGH] Product shape — guide, builder, or hybrid?** Recommendation: **fit/sizing GUIDE +
   unbiased comparison as the substance (§4b), in a thin builder-style shell (§4c)** — ~80/20. A
   pure component builder is rejected as dishonest for this niche (§2, §4a). *Your call on the
   balance.*
2. **[HIGH] "Nailing the niche" definition — do you agree it means the most honest/unbiased
   inseam→bike fit tool on the internet (§5), not the biggest SKU count or flashiest builder?**
3. **[HIGH] Naming & URL.** The site family is BuildMy___ (buildmymtb live, BuildMyBMX/
   BuildMyGravelBike planned). "Build" reads oddly for a bike nobody builds. Options: keep family
   consistency with a URL like **buildmyfirstbike.com** but brand the tool a **"First Bike Finder"**;
   or **BuildMyBalanceBike**; or a finder-first name (FindMyFirstBike / MyFirstBikeFinder).
   **Trademark caution: "Strider" is a registered brand (Strider Sports) — do NOT name the site
   BuildMyStrider or use Strider branding; the generic term is "balance bike" / "first bike."**
   *Your call.*
4. **[MED] Scope — where does the age range stop?** Include the **balance→pedal convertibles**
   (Strider 14x, LittleBig, Prevelo Balance-Tec) and their pedal kits? This is where the niche
   brushes up against the kids'-pedal-bike market and, eventually, buildmymtb. Recommendation:
   include convertibles + the one real `pedalkit-fit` rule (§6, MODEL §6); leave full kids'-pedal
   bikes to a later, separate line.
5. **[MED] Baby/pre-toddler bikes (8–10″ wheels, e.g. Frog Tadpole Mini 9.5″ seat, Early Rider
   Bella Velio).** In scope as the low end, or start at 12″? Recommendation: include — the "start
   them earliest" segment is exactly where a fit tool shines (a 9.5″ seat vs. 12″ is decisive).
6. **[MED] Units & rider input.** Store canonical mm, display **inches + cm** with a toggle; rider
   inseam entered in in/cm. Also: do we ask the child's **weight** (enables the 30% rule) or keep
   input to just inseam to reduce friction? Recommendation: inseam required, weight optional.
7. **[LOW] Wood/composite bikes (Kinderfeets, Wishbone, Banwood).** Design-led, non-adjustable-ish,
   popular as gifts. Include for completeness, or MTB-adjacent brands only? Recommendation: include —
   completeness serves the unbiased mission.
8. **[LOW] Verified-badge semantics.** Same open question the complete-bike catalog has (per
   [[pricing-display-policy]]): does a whole balance bike get one `verified` badge, and against what
   (seat range + weight from the maker page)? Recommendation: verify seat range + weight against the
   maker page; use `sourceType:'measured'` for weights sourced from a reputable review site's actual
   measurement (the maker pages are walled — MODEL §2).
9. **[LOW] Go-live trigger.** Stays OFF-LIVE until your word (hard rule 3). When you give it, is it
   its own page+button on buildmymtb, or a standalone site from day one? Recommendation: build
   off-live behind a page+button (BuildMyBMX pattern); the own-engine/own-data structure makes a
   later standalone split a file-move.

---

## 8. Sources (fetched this round)

Manufacturer (provenance-of-record; walled — see MODEL §2 for the fetch route each needed):
- Cannondale Kids Trail Balance — cannondale.com/en-us/bikes/kids/1-to-4/kids-trail-1-to-4/kids-trail-balance (Exa) + Cannondale kids buying guide
- woom 1 / GO 1 (full geometry, size ladder) — woom.com/en_US/products/woom-1-balance-bike, /go-1-toddler-balance-bike (Exa)
- Specialized Hotwalk & **Hotwalk Carbon** (full geometry, multiple model years) — specialized.com/us/en/hotwalk*/p/… (Exa search); Bright Data smoke-tested (URL-sensitive)
- Strider lineup taxonomy (Baby; 12 Comp/Sport/Pro; 14x/20x) — striderbikes.com (Bright Data)

Cross-brand review aggregators (normalized specs + fit methodology — the current parent tool, §1c):
- twowheelingtots.com — how-to-choose-balance-bikes; 10-best-balance-bikes; specialized-hotwalk-review
- readysetpedal.com — 12" balance-bike comparison chart; woom-vs-prevelo-vs-frog
- rascalrides.com — best convertible balance bikes (pedal-conversion axis)
- cascadegearreviews.com — best balance bikes 2025 (woom/Prevelo/Early Rider/Frog specs)
- nytimes.com/wirecutter — best balance bike 2026
- downtown-mag.com — balance-bike test quick guide (EU brands: Early Rider, Giant Pre rCarbon, KUbikes, PUKY, Moustache, Propain)
- littlebigbikes.com — woom vs Frog vs LittleBig (convertible economics)

Web-search syntheses (sizing/weight/tire rules): twowheelingtots, kidpop, bikefreedomacademy,
earlyrider, weebikeshop, Bicystar (foam-vs-air).
