# First Bike Finder — Decisions for Douglas

**Six decisions. Nothing is being built until you scope the page** — this round produced the
matching spec ([`FIRST-BIKE-FINDER-SPEC.md`](FIRST-BIKE-FINDER-SPEC.md)) and a data validation
pass ([`FIRST-BIKE-FINDER-DATA-VALIDATION.md`](FIRST-BIKE-FINDER-DATA-VALIDATION.md)), both
docs-only and off-live.

Each has a recommendation. **1 and 2 are blocking** — the tool's arithmetic is not meaningful
until they're settled. The rest can default and be revisited.

---

## 1. 🔴 How is inseam measured — barefoot or in shoes?

**Blocking.** The sources disagree: icebike says measure **in shoes**, the repo's model and other
guides say **barefoot**. That's a **10–15 mm** gap — about the size of the entire fit band the
tool is matching against, so the answer changes verdicts near the edges. The corpus records the
discrepancy honestly and does **not** settle it.

**Recommend: barefoot**, with the UI showing a shoe allowance note. It's the child's actual
anatomy, reproducible across seasons and shoe types, and matches our existing model. Whatever you
pick, the tool states the method inline next to the input and applies it everywhere.

---

## 2. 🔴 Is growth room expressed in inches, or do we source growth data for years?

**Blocking for the copy.** "How long will this last?" is what a parent actually wants, and
**years is the most quotable output the tool could produce** — which is exactly why getting it
wrong is expensive. We cannot compute years today: it needs pediatric growth-rate data (inseam
growth per year by age) that the corpus does not have. The corpus is explicit — *never guess a
number of years.*

**Two options:**
- **(a) Inches only** — "3.7 in of seat height left before they outgrow it." Honest, ships now,
  needs nothing. **Recommended.**
- **(b) Source CDC/WHO growth references** (public and fetchable) and quote years with a stated
  range. Better answer, real content differentiator, but it's a research round first and a years
  figure invites false precision about a specific child.

Not mutually exclusive — ship (a), consider (b) later.

---

## 3. Output shape: ranked list, or a single pick?

**Recommend a ranked list**, for two reasons. It suits the UNBIASED value — a single pick asks the
user to trust one recommendation, a ranked list shows the trade-offs and lets them decide. And our
data can't support a confident single pick anyway: 31 of 36 rows are unverified aggregator specs.

The constraint that matters regardless: **bikes that don't fit are shown as excluded, with the
reason.** The refusal is the most valuable output the tool has ("this bike doesn't fit your child
yet" is the documented #1 parent mistake, and the sources are unanimous) — hiding it wastes it.
That refusal stands even when it costs a sale.

---

## 4. How is honest uncertainty displayed?

Three separate uncertainties need a UI answer, and they compound:

1. **86% of rows are unverified** aggregator specs, not maker-page verified.
2. **The measurement question (#1)** makes near-edge results genuinely ambiguous.
3. **The physical check outranks our arithmetic.** The corpus is emphatic: sit the child on the
   bike — if they're on tiptoes, it's too tall regardless of what the numbers said.

**Recommend:** the physical check displayed as prominently as the verdict itself (not a buried
disclaimer — it's the actual authority), a per-row verified/unverified marker, and near-edge
results saying so plainly. Note this connects to the open bias-audit item about a green dot
sometimes meaning "no data" — same honesty problem, different surface.

**Constraint:** the inseam prompt is an **inline panel the user opens**, never an auto-appearing
overlay — your no-pop-ups hard rule. No "get a professional fit!" interstitial either.

---

## 5. Where does the finder's upper age bound sit?

`sb-strider-20x-sport` is a legitimate balance bike for **ages 8–adult** (33 in max seat, 25.8 lb).
Correctly catalogued, but not a *first* bike — returning it for a toddler would look broken.

**Recommend an explicit inseam ceiling** for the finder's scope rather than special-casing rows.
Needs a number from you, or I can propose one from the catalog's distribution.

---

## 6. Three schema/vocab gaps — worth a round, or leave them?

Flagged, not changed (the fitter seat doesn't edit schema or catalog):

- **`inseamMin`/`inseamMax`** — REI and KUbikes publish child-inseam fit ranges directly, which is
  the *best* fit datum available: the maker answering the question in the exact units we match on.
  Both rows currently sit in the unusable "no data" bucket **while carrying the better number in a
  code comment.** Highest-value of the three.
- **A configuration tag for convertibles** — bikes like the Strider 14x span balance *and* pedal
  modes in one seat range, and the fit rules are different in each. Without a tag we'd credit
  growth room only reachable by converting the bike to a different category.
- **A foot-operated brake value** — the Chillafish BMXie2 has a real footbrake recorded as
  `brake:'none'` because no vocab value fits. A brake filter would call it brakeless.

---

## Not asking you about

For completeness, decided against bringing these to you — the corpus settles them:

- **Readiness for pedals** won't be a quiz or a score. It's caregiver observation; the corpus is
  explicit it isn't computable. We'll show the milestone sequence and let the parent judge.
- **Balance bikes vs training wheels** — we have genuinely peer-reviewed backing (independent
  cycling reached ~1.8 years earlier), which is strong content. It ships with the fairness note
  that USA Cycling says both work; the evidence says balance bikes are more *efficient*, not that
  training wheels fail. Overclaiming that would breach the honest-data value.
- **A "seat too low" warning** — no source supports it as a harm, so we won't invent one. A false
  "too big" sends someone to sell a bike that fits.
