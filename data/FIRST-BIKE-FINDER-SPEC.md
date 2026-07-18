# First Bike Finder — Matching Specification

**Status: DESIGN SPEC, OFF-LIVE. Docs only — no page, no engine, no catalog edits.**
Produced 2026-07-18 by the bike-fitter seat. The finder **page** needs Douglas's product
scoping; this document is the spec he scopes *from*.

**Grounding.** Every matching rule below traces to a fact in
[`tools/fitter/kids-fit.md`](../tools/fitter/kids-fit.md) (`KID-n` IDs, stable and append-only).
Read [`tools/fitter/INDEX.md`](../tools/fitter/INDEX.md) first — the corpus rules
(⚠ GUIDANCE-NOT-PRESCRIPTION, the tier system, the SITE-CONSTRAINTS rule) govern this spec too.
Where a rule the product would *like* to have has **no corpus support**, this spec says so and
declines to invent it, rather than shipping a confident number with nothing behind it.

Companion documents from this round:
- [`FIRST-BIKE-FINDER-DATA-VALIDATION.md`](FIRST-BIKE-FINDER-DATA-VALIDATION.md) — the pass over
  `data/striders.js` against these rules (14 findings).
- [`FIRST-BIKE-FINDER-DECISIONS.md`](FIRST-BIKE-FINDER-DECISIONS.md) — what the page needs from
  Douglas before it can be built.

Prior art this refines, not replaces: [`STRIDER-MODEL.md`](STRIDER-MODEL.md) §3–§5 (the field
spec and a first rule sketch) and [`STRIDER-ANALYSIS.md`](STRIDER-ANALYSIS.md) (the
fit-guide-not-component-builder argument). Three places where this spec **corrects** the MODEL's
sketch are marked ⚠ CORRECTION and explained.

---

## 0. What the finder is, and the one thing it must never do

Balance bikes are a **complete-bike purchase with near-zero part swapping**
(`STRIDER-ANALYSIS.md`). So the finder is **not** a component compatibility engine like
`checkBuild`. It answers one question: **does this bike fit this child, now?**

The single highest-value output is a **refusal** — "this bike does not fit your child yet"
(**KID-4**, multi-source consensus: REI + icebike + `STRIDER-MODEL.md` §3.5). Buying up a size is
a *documented* parent mistake: a bike whose minimum seat sits above the child's inseam cannot be
ridden safely and **teaches fear rather than balance**, defeating the purpose of the stage.

⚠ **Per the UNBIASED value (INDEX rule 7), that refusal is given even when it costs a sale, and
even when it is the only bike the parent was looking at.** A finder that softens a no-fit into a
"close enough!" to keep a click is the exact failure this product exists to avoid.

---

## 1. Category boundary — the rule the finder MUST switch at

**This is the sharpest coupling in the whole chapter and the easiest way to build a dangerous
tool.** From **KID-8** and **KID-9**:

| | Balance bike | Pedal bike |
|---|---|---|
| Seat-height rule | Feet **FLAT** on the ground, knees slightly bent (**KID-2**) | Legs **slightly bent at the bottom of the pedal stroke** (**KID-9**) — the adult rule |
| Can the child flat-foot it? | **Must** be able to | **Often cannot** — cranks need ground clearance to rotate, so the child sits higher (**KID-8**) |
| What stops the bike? | Feet (which is *why* feet-flat is the gate) | **Brakes** — hand and/or coaster. Foot-braking is no longer available (**KID-8**) |

⚠ **The feet-flat gate is structurally impossible to preserve on a pedal bike.** `kids-fit.md`
states this explicitly: *"a naive finder tool carrying one rule across both categories would
produce dangerous output."*

**Therefore, normatively:**

1. **v1 scope is `cat:'balancebike'` only.** Every rule in §3–§6 applies to balance bikes.
2. If the finder ever covers pedal bikes, it **switches rule sets on category**, and never
   evaluates a pedal bike with §3's gate.
3. **Convertibles (`convertsToPedal:true`) are a live hazard** — see §7. Their seat range spans a
   mode change, so a single `seatMin..seatMax` span silently crosses the boundary above.

---

## 2. Inputs

| Input | Required | Notes |
|---|---|---|
| Child's **inseam** (mm or in) | **Yes** | The fit variable. **KID-1**: fit is set by inseam, *not* by age and *not* by wheel size. |
| Child's **weight** | Optional | Enables the §5 weight-ratio comparison (**KID-6**). Absent → §5 is silently skipped, never guessed. |
| Child's age | **Never as a fit input** | **KID-1**: age fails because same-age children have very different inseams. May be collected for display/marketing copy only; it must not enter the match. |

### 2.1 ⚠ BLOCKING: the inseam measurement standard is unresolved

**KID-2** records a live, unresolved discrepancy: icebike specifies measuring **in shoes** (floor
to crotch, child standing straight); the repo's model and other guides commonly measure
**barefoot**. That is a **~10–15 mm** difference — *comparable to the entire 12.7–38.1 mm
threshold band in §3.* An arithmetic gate is not meaningful until one convention is fixed.

**The tool MUST state its own measurement method in its own instructions and apply it
consistently.** This is a **DECISION FOR DOUGLAS** (see the decisions doc). Recommended default:
**barefoot**, because it is the child's actual anatomy, is reproducible across seasons and shoe
types, and matches the repo's existing model — with the UI showing a shoe allowance note. But the
corpus does **not** settle it, and this spec does not pretend it does.

Whichever is chosen, the UI must show the measuring method **inline, next to the input** — not
in a pop-up (INDEX rule 7 / Douglas hard rule 2).

---

## 3. The gate: inseam → minimum seat height

**Source: KID-2** (min seat height ≈ **0.5–1.5 in below inseam** = **12.7–38.1 mm**, so the child
sits with both feet **flat** and knees slightly bent). All arithmetic in mm; the catalog is mm.

Let `I` = child's inseam, `Smin` = `bike.seatMin`.

| Band | Condition | Verdict | Copy basis |
|---|---|---|---|
| **A — Fits** | `I − 38.1 ≤ Smin ≤ I − 12.7` | ✅ **fits now** | KID-2 target band, feet flat + knee bend |
| **B — Marginal** | `I − 12.7 < Smin ≤ I` | ⚠ **just fits** | Feet reach flat but with little/no knee bend; the child cannot get the athletic stance that lets them run the bike. Tightens toward the tiptoe failure. |
| **C — Too big** | `Smin > I` | ⛔ **does not fit yet — REFUSE** | KID-2 + KID-4. Child cannot plant feet → cannot self-start, cannot foot-brake, cannot learn balance. |
| **D — Below band** | `Smin < I − 38.1` | ✅ **fits, with a note** | See the honesty note below. |

### 3.1 ⚠ Where the corpus does NOT support a rule — Band D

The corpus establishes a **lower** bound on seat height (Band C) and a target band (A). It
establishes **no harm claim** for a seat that is *further* below the inseam than 1.5 in.
Deeply-bent knees are plausibly less efficient, but **nothing in `kids-fit.md` sources that as a
fit problem for a balance bike**, and INDEX rule 9 is explicit: a false "your bike is too big"
sends someone to sell a bike that fits.

**Therefore Band D is a PASS carrying an informational note only** — "plenty of clearance; check
§4 growth room, they may outgrow the seat range sooner." It is **never** an error and **never** a
warning. Establishing a real lower-bound harm claim would need Tier A or Tier B-consensus
(INDEX: "the bar"), which does not exist today. *Recorded as a gap, not filled with a guess.*

### 3.2 The observable test outranks the arithmetic

⚠ **KID-2 is emphatic: the observable test is the authority; the numeric band is the shortcut.**
Because of §2.1's measurement ambiguity, **every** result — including a clean Band A — must carry
the physical check:

> *Sit the child on the bike with the seat at its lowest. Both feet should be **flat** on the
> ground with a slight bend at the knee. **If they are on tiptoes while seated, the bike is too
> tall** — regardless of what the numbers said.*

This is not a disclaimer to bury. It is the actual authority, and the honest-data value
(INDEX rule 7) requires it be as prominent as the verdict.

### 3.3 Rows with no `seatMin`

`seatMin` is **optional** in `src/schema-strider.js` and blank on 4 of 36 rows (THE BAR: a blank
beats a guess). A bike with no `seatMin` **cannot be gated** and must be surfaced as
**"fit data not published"** — never silently dropped (that would bias the results toward
whichever makers publish specs) and never estimated from wheel size (**KID-1** forbids exactly
that inference). See the validation doc, Finding 1.

---

## 4. Growth room

**Source: KID-3** — max seat height should be **≥ inseam + ~2 in (50.8 mm)** for the bike to last;
**(seatMax − seatMin)** is the headline metric a parent actually cares about.

- **Report remaining room in INCHES/MM: `seatMax − I`.**
- **Report total adjustable range: `seatMax − seatMin`** as the product's longevity claim.

### 4.1 ⚠ CORRECTION to `STRIDER-MODEL.md` §5 — never express longevity in years

The MODEL's rule sketch proposes `fit-grow-room` copy reading *"≈ N months/years of growth
room."* **This spec forbids that.** `kids-fit.md` "Readiness" §, explicitly:

> Converting range → "this lasts ~2 years" needs **pediatric growth-rate data** … which this
> chapter does not have. Either source it (CDC/WHO growth references are public and fetchable) or
> express longevity only in inches of remaining range — **never guess a number of years.**

A years figure is the most quotable output the tool could produce and therefore the most damaging
to get wrong. **Inches until the seat runs out** is honest and needs no data we lack. Sourcing
CDC/WHO growth references is the listed L2 gap and a **decision for Douglas** (see decisions doc).

### 4.2 ⚠ KID-3 is a graded signal, NOT a filter

Applied as a hard gate, "seatMax ≥ inseam + 2 in" **fails 8 of the 32 rows** that carry seat data
— including verified maker-sourced rows (validation Finding 4). Most fail by 0.2–0.5 in, i.e.
inside measurement noise.

This mirrors the refinement `kids-fit.md` already recorded for **KID-6**: a threshold that much of
a legitimate market misses is a **quality target**, not a pass/fail rule. **Rank on growth room;
never exclude on it.** Excluding would also systematically punish the infant tier (validation
Finding 5), which is short-lived *by design* — an unbiasedness problem, not just an accuracy one.

### 4.3 The KID-3 ↔ KID-4 tension, which the UI must actively resist

**KID-3's own Couplings line** warns that generous *range* tempts a parent toward a bike whose
*minimum* is too high. **Growth room must never be displayed in a way that can override the §3
gate.** A Band C bike is out — its range is irrelevant and should not be shown as a consolation.

---

## 5. Bike weight vs child weight

**Source: KID-6.** Commonly-cited ceiling ≈ **30%** of the child's body weight
(twowheelingtots; Cannondale's own "Kid-Correct Weight" 30–40%). USA Cycling's mechanism: a
lighter bike is easier to get moving and to stride uphill, so the child rides further before
tiring.

⚠ **KID-6 carries an explicit REFINEMENT that this spec adopts as normative.** USA Cycling's own
arithmetic puts a *typical* balance bike at **24–36%** of a 25 lb child's weight — straddling the
line, with many ordinary, perfectly good bikes landing above it. *"A finder tool that hard-rejected
everything over 30% would reject much of the market."*

**Therefore:** weight ratio is a **graded comparison signal, never a filter.** Show
`bikeWeight / childWeight` as a percentage with 30% marked as a *target*, and rank on it. Never
gate. If the child's weight was not supplied, **omit the whole section** — do not substitute an
age- or inseam-derived estimate (that needs the growth data we lack, §4.1).

---

## 6. Standover

**Source: KID-5.** Standover should clear the inseam; very low standover (woom/Guardian ≈ 7 in) is
what lets the smallest toddlers mount unaided.

⚠ **KID-5 explicitly warns that REI's quantified 2–4 in clearance target is a PEDAL-BIKE number
and must not be transplanted onto balance bikes**, whose frames are step-through-low by design and
whose binding constraint is seat height (§3), not top-tube clearance.

**Status: DORMANT.** `standover` is sourced on **0 of 36** rows (validation Finding 2). Land the
rule as an **info-tier** check that activates per-row as data arrives — the project's established
rule-18 dormancy template. **Do not derive standover from any other field.**

---

## 7. Convertibles — the mode-change hazard

Three rows carry `convertsToPedal:true`; a fourth converts trike→balance. Their `seatMin..seatMax`
spans **more than one configuration**, so the top of the range is often the **pedal-bike** setting
— where §3's gate does not apply at all (§1, **KID-8/KID-9**).

**Rules:**
1. Gate a convertible on `seatMin` in its **balance-bike configuration** only.
2. **Never present the full span as balance-bike growth room.** Doing so would credit a bike with
   longevity that is only reachable by changing category — precisely the boundary KID-9 says a
   naive tool must not cross.
3. Where the configuration a spec figure belongs to is unknown, treat the range as
   **unqualified** and say so.

⚠ The catalog cannot currently express this: there is no field marking which configuration a seat
figure describes (validation Finding 6). Flagged for the coordinator; **this spec does not edit
the schema** (INDEX Boundaries).

---

## 8. Readiness for pedals — describable, NOT computable

**KID-8**: readiness is judged by **demonstrated balance and braking, not by age.** The documented
sequence: walking the bike seated → longer strides → gliding between steps → coasting with both
feet up, slowing by dragging the feet.

⚠ `kids-fit.md` is explicit that this **is not computable** and *"should not be presented as if it
were. It is caregiver observation — the tool can describe the milestone sequence, not evaluate
it."*

**Therefore the finder MUST NOT** output a readiness verdict, a readiness score, or an "is your
child ready?" quiz that returns a determination. It **MAY** display the milestone sequence as
static reference content for the caregiver to judge against.

---

## 9. Output shape

**Ranking is a DECISION FOR DOUGLAS** (output shape: ranked list vs single pick). What the corpus
constrains regardless of that choice:

1. **Band C bikes are excluded from recommendations**, and the exclusion is *shown with its
   reason* (KID-4's refusal is the product's most valuable output — hiding it wastes it).
2. **Rank only within fitting bikes**, on growth room (§4.2) and weight ratio (§5) — both graded,
   neither a gate.
3. **`seatMin`-blank bikes appear in a separate "fit data not published" group** (§3.3), never
   ranked as if evaluated, never silently dropped.
4. **Ordering must never be influenced by price, affiliate status, retailer stock, or brand**
   (INDEX rule 7 — UNBIASED is load-bearing; affiliate links never feed the match, mirroring the
   live catalog's `retailerLinks` discipline).
5. **Every result carries the §3.2 physical check.**
6. **Uncertainty is displayed, not hidden**: unverified sample rows say so (the catalog is
   overwhelmingly aggregator-sourced — validation Finding 3), and a fit computed near a band edge
   says the measurement method matters (§2.1).

### 9.1 Site constraints (INDEX rule 7 — non-negotiable)

- **No pop-ups, no interstitials, ever** (Douglas hard rule 2). The inseam prompt is an **inline
  panel the user opens**, never an auto-appearing overlay. A "get a professional fit!" interstitial
  is banned however well-intentioned.
- **No build step, no CDN, no webfonts** — plain HTML/CSS/JS, vendored assets only.
- **No e-bikes** (hard rule 1). Not at issue here — balance bikes are unpowered by definition.
- **Honest register throughout**: "a starting point, then check it in person" — never "your
  child's correct bike is X."

---

## 10. Honest limits — what this spec deliberately does not do

Stated plainly so a future reader does not mistake omission for oversight:

| Not done | Why |
|---|---|
| Longevity in months/years | No pediatric growth data (§4.1, KID-3). Would need CDC/WHO sourcing. |
| A lower-bound "seat too low" rule | No corpus support for the harm claim (§3.1). |
| Readiness evaluation | Not computable; caregiver observation (§8, KID-8). |
| Pedal-bike matching | Different rule set (§1); KID-9 is one REI paragraph — a listed L2 gap. |
| Brake-lever reach for small hands | Named a genuine safety variable (a child who cannot reach the lever cannot brake) but **unwritten** in the corpus — listed L2 gap. `brakeReach` exists in the schema and is sourced on 1 row. |
| Height→inseam conversion | Two rows publish only rider height (validation Finding 7); converting needs anthropometric data we lack, and **KID-1** warns against proxies for inseam. |
| Any recommendation to a named child | INDEX rule 4 / Boundaries — the corpus describes methods and ranges; it never prescribes to an individual body. |

---

## 11. Traceability

| Spec section | Fact(s) | Corpus tier |
|---|---|---|
| §0 refusal doctrine | KID-4 | B + C-aggregator, multi-source consensus |
| §1 category switch | KID-8, KID-9 | A-mfr-adjacent (USA Cycling) + B (REI) |
| §2 inputs, inseam-not-age | KID-1 | C-aggregator + A-mfr-adjacent |
| §2.1 measurement standard | KID-2 (recorded discrepancy) | unresolved — decision required |
| §3 the gate | KID-2 | C-aggregator + repo-doc-corroborated |
| §3.1 Band D | — | **no source; deliberately unruled** |
| §4 growth room | KID-3 | C-aggregator + repo-doc |
| §4.1 no-years rule | KID-3 + chapter Readiness § | corpus-explicit prohibition |
| §5 weight ratio | KID-6 (+ its refinement) | A-mfr-adjacent (USA Cycling) + repo-doc |
| §6 standover | KID-5 | B (REI) + repo-doc; dormant on data |
| §7 convertibles | KID-8, KID-9 | as §1 |
| §8 readiness | KID-8 | corpus-explicit non-computability |
| §9 unbiased ordering | INDEX rule 7 | project value |

**The "why a balance bike at all" explainer** (**KID-7**) is the one genuinely peer-reviewed claim
available (Zeuwts et al. PMC9310799; the 2024 Lyapunov study PMC11676224) and is strong
differentiating content. If the page carries it, it must also carry KID-7's **fairness note**:
USA Cycling states *both* balance bikes and training wheels are effective and safe, and training
wheels retain real advantages. The literature shows balance bikes are **more efficient — not that
training wheels fail.** Overstating that would breach the honest-data value.
