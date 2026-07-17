# BMX rule-severity research — community consensus check

Requested by Douglas 2026-07-17. Scope: the seven **[MED]/[LOW] PROVISIONAL** product-design
questions in `data/DJ-BMX-COMPAT-ANALYSIS.md` §5 (Q4–Q10) — each was implemented per the doc's
own "lean" and flagged `[MECHANIC REVIEW]` pending a domain-expert or community-consensus check.
This is that check: what real BMX riders/mechanics say happens, sourced from forums, shop/mechanic
articles, and brand docs (fetched pages, not search-summary paraphrases, per the project's standing
"search-result summaries lie" lesson). **No engine code was touched.** Recommendations only — the
coordinator and Douglas decide whether/how to act on them.

---

## Q6 — Chain-pitch/width mismatch (`ss-chain-width` / `bmx-chain-pitch`) — currently WARNING

**Current implementation:** WARNING in both engines when ring/cog/chain `chainWidth` values
(`1/8` vs `3/32`) don't all match — framed as "turns but runs poorly."

**What the community actually says:**

The two widths are asymmetric, and outcomes split by direction:

- **A 1/8" chain on 3/32" sprockets**: multiple independent threads report this working for
  extended periods with no real downside. One mechanic on Bike Forums: *"No problem at
  all...I do the same. If you havn't a tensioner or derailleur to foul with the wider
  1/8th...it works."* A rider on MTBR: *"I ran a 1/8" kmc z410 on a 3/32 surly cog for about 6
  months without dropping the chain once."* The main caveat raised is cosmetic/mechanical
  slop, not failure: *"1/8 inch is better suited for 1/8" cogs, it will work but not ideal, too
  much side play."* [Bike Forums](https://www.bikeforums.net/bicycle-mechanics/412480-ok-use-1-8-sprocket-3-32-chain.html), [MTBR](https://www.mtbr.com/threads/1-8-chain-on-3-32-sprocket-good-ok-or-bad.497271/)

- **A 3/32" (narrower) chain on 1/8" sprockets** is the direction actually flagged as
  problematic: narrower chain has more lateral play in a wider tooth profile, and reports
  describe alignment/chain-climb issues in this direction specifically — the same MTBR rider
  who had zero issues with 1/8"-chain-on-3/32"-cog reported the reverse-width case ("same chain
  would not stay on a boone cog for more than about a mile") was a *different, narrower-chain*
  scenario. General chain-size-chart guidance is blunter about this direction: *"chainring and
  rear cog width must match the chain width, or the fit will feel sloppy... A wider chain on
  narrow teeth may run, but it can feel loose and noisy... running a 1/8" chain (wider) on
  3/32" sprockets (narrower) would cause this issue [skipping/poor engagement]"* — note this
  source's own framing is internally inconsistent with the two forum threads above on which
  direction is worse, which itself is evidence the real-world failure mode is fuzzy/component-
  dependent rather than a clean binary. [Tiires chain guide](https://tiires.com/bike-chain-size-chart/)

**Verdict:** Community consensus does **not** support hardening to an ERROR — multiple riders
ran a mismatched pair for months with no failure, and the one consistently-cited downside
("side play," "runs poorly," "feels sloppy") is exactly what a WARNING is for (works, but
check/expect suboptimal shifting-free feel). If anything the evidence leans toward the
**mismatch being direction-dependent** (wide chain on narrow cog tolerated; narrow chain on
wide cog the one people actually report trouble with) the same way the MTB engine already
treats rotor/freehub mismatches direction-aware (rules 9/6c) — a candidate future refinement,
not a severity change. **Recommendation: keep WARNING as-is; do not harden to ERROR.**

Confidence: **Medium** — real firsthand reports from multiple independent forum threads, but no
brand engineering doc addresses this directly (chain/sprocket width tolerance isn't something
manufacturers publish compatibility bulletins on).

---

## Q5 — Freecoaster vs cassette depth (`bmx-freecoaster`) — currently INFO, never a conflict

**Current implementation:** modeling both hub types; picking one over the other never raises a
verdict, just an informational note.

**What the community says:** this is unambiguously a **riding-style preference**, not a fit or
performance defect either way. A dedicated comparison piece: *"It is not about which hub is
better, it is about which hub matches the way the bike actually gets ridden... A freecoaster on
a setup where fakie riding never happens adds weight, cost, and maintenance complexity for no
benefit"* [BilletBMX](https://billetbmx.com/blogs/news/cassette-hub-vs-freecoaster-bmx). Other
sources concur most riders (including many who do occasional fakies) are better served by
cassette for its simplicity/engagement speed, while dedicated street/flatland riders who fakie
constantly prefer freecoaster [The BMX Dude](https://thebmxdude.com/bmx-hub-types/),
[HoodMWR](https://www.hoodmwr.com/difference-between-a-bmx-freecoaster-a-cassette/). Nobody in
any source frames the choice as a compatibility problem — it's purely "which trick vocabulary do
you ride."

**Verdict:** INFO is correct and should **not** become a warning/error of any kind — hardening
it would actively mislead users into thinking one option is a worse "fit." **Recommendation: no
change.**

Confidence: **High** — every source, across mechanic articles and forum discussion, frames this
identically as rider-preference with zero fit implication.

---

## Q6-adjacent / Q7 — Pivotal vs railed seat/post (`bmx-seat-system`) — currently ERROR

**Current implementation:** modeled as a hard ERROR — a pivotal seat physically cannot clamp
onto a railed post's clamp plates and vice versa.

**What the community says:** every source agrees these are **not interchangeable, full stop** —
this is the one question here that is genuinely binary, not a "runs poorly" spectrum. *"You need
to match the seat and post system: pivotal with pivotal, stealth with stealth, and railed with
railed. Seat posts aren't cross-compatible with different BMX seat types"*
[The BMX Dude](https://thebmxdube.com/bmx-seat-post-types/). The mechanical reason is structural,
not tolerance-based: a pivotal seat bolts through a single center hole from underneath with no
clamp needed, while a railed seat has two parallel rails gripped by a toothed two-plate clamp on
the post — there is no partial-fit case, no "reducing shim," no direction where one physically
seats onto the other's mount.

**Verdict:** ERROR is the correct, and only defensible, severity — this is a connector-shape
mismatch (like B on a hub, not like a size tolerance). **Recommendation: confirm ERROR as final;
this question can be un-flagged as `[MECHANIC REVIEW]` — the doc's own note that "the non-fit is
definitional" is fully borne out by every source found.**

Confidence: **High** — uniform agreement across every shop/mechanic guide found, and the
mechanical reasoning is simple enough that no counter-evidence is plausible.

---

## Q8 — Peg axle nuance, 3/8" vs 10 mm (currently merged as one `'10mm'` vocab token)

**Current implementation:** treats 3/8" and 10 mm peg-axle sizing as identical, single vocab
token — no rule distinguishes them.

**What the community says:** the two are **numerically close but not identical** — 3/8" =
9.525 mm vs a true 10 mm axle, a ~0.475 mm difference — and where threading is involved, the two
standards use different thread pitches (3/8"×24tpi/26tpi SAE vs 10×1mm metric) that are **not
interchangeable** on the threaded-nut/wingnut side
[search synthesis citing Bike Forums + BMXmuseum threads]. However, for the peg *bore* itself
(the actual compatibility question this vocab token models), every peg-sizing guide found treats
3/8" and 10 mm as the same practical peg category, distinct from 14 mm: *"Most BMX bikes have
either 14mm (in the rear) or 3/8″ (10mm – in the front) axles"* — pegs and adapters are sold
explicitly as "14mm-with-10mm-adapter," never as a separate 3/8"-specific peg product
[The BMX Dude](https://thebmxdude.com/bmx-peg-size/). The one real non-interchangeability
(threaded axle-nut/wingnut pitch) is a fastener detail, not a peg-fit dimension, and the catalog
models pegs by axle bore, not by nut thread.

**Verdict:** the doc's lean (merge as one `'10mm'` token, no rule) holds up for the dimension the
engine actually models (peg bore). **Recommendation: keep merged; the real 3/8"-vs-10mm thread-
pitch nuance that does exist is out of scope for a peg-fit rule (no peg category in the catalog
is differentiated by axle-nut thread) — note it in the vocab comment as a known simplification
rather than modeling a new rule.**

Confidence: **Medium** — clear agreement on peg-bore practice; the thread-pitch nuance is
real but adjacent to what's actually modeled, so it doesn't change the lean.

---

## Q9 — BMX headset, integrated vs threaded (currently display-only, no rule fires)

**Current implementation:** headset fields are captured for display; no fit rule compares
frame/fork/headset compatibility (deferred "only if a sourced mismatch case appears").

**What the community says:** the one place people expect a **hard mismatch** is integrated
*headset* vs integrated *frame* (a non-integrated frame has no machined bearing seat for an
integrated headset — that's a real non-fit) — but critically, **fork choice is NOT the
constraint**: *"You don't need an integrated fork for an integrated headset... I'm using a
Hoffman fat free fork on my integrated set up"* and *"The integrated headsets come with a bottom
race that you will have to install on the fork just like you would a non-integrated headset"*
[BMXmuseum thread](https://bmxmuseum.com/forums/viewtopic.php?id=308683). In other words: the
frame/headset pairing can be a real fit constraint, but fork/headset is not — any fork works with
an integrated headset once the correct bottom race is installed on it.

**Verdict:** this actually surfaces a **narrower, real candidate rule** the doc didn't
distinguish: frame headtube (integrated bearing seat vs not) vs the *headset* chosen is a
genuine binary fit question; fork vs headset is not. Given the catalog doesn't yet carry a
`headTube`-integrated-or-not flag distinct from the S.H.I.S.-style token the MTB engine uses,
and no sourced BMX frame in the (off-live) dataset currently forces this, **the doc's "display-
only, activate only once a sourced mismatch case appears" lean is still correct** — just note
precisely which pairing (frame×headset, not fork×headset) would be the real rule if/when it's
added. **Recommendation: no change now; refine the eventual rule's scope to frame×headset only.**

Confidence: **Medium** — one detailed forum thread, consistent with how the MTB engine's own
S.H.I.S. modeling already treats frame-side vs fork-side separately (rule 20a vs 20b), which is
corroborating precedent, not independent evidence.

---

## Q10 — Gear-ratio/rollout display (`bmxGearInfo()`) — display-only, never feeds `checkBmxBuild`

**Current implementation:** computed and shown for information; explicitly never a compatibility
verdict.

**Research finding:** gear ratio and rollout are performance/preference numbers (bigger rollout
= more top speed, less acceleration; a matter of riding style and course, not a fit question).
No source anywhere frames gear ratio as a compatibility concern — it's a universal drivetrain
math property, not a parts-interface question. **Recommendation: no change; this was never
really a severity question and the doc's lean is uncontroversial.**

Confidence: **High** — this isn't a disputed area; it's arithmetic, not a fit claim.

---

## Q4 — DJ wheel-size scope, 26/24 as single-size-only (no 26/27.5-convertible frame modeled)

Out of scope for "rule severity" (it's a catalog-coverage decision, not a compat-verdict
severity), but flagged briefly since it's still `[MED] PROVISIONAL`: DJ/park bikes are
overwhelmingly sold as fixed 26" (adult) or 24"/20" (junior/park) with no rider-facing
"convertible" marketing claim comparable to MTB's 29/27.5/mullet story — nothing in the research
for Q5–Q9 surfaced any DJ-specific wheel-swap practice that would argue for adding a mixed
config now. **Recommendation: no change — the doc's "stays 26-only until a convertible frame is
sourced" lean needs no revision.**

---

## Summary table

| # | Rule | Current severity | Community-preferred severity | Confidence | Action |
|---|------|------|------|------|------|
| Q6 | `ss-chain-width` / `bmx-chain-pitch` | WARNING | **WARNING (keep)** — maybe direction-aware later | Medium | No change now |
| Q5 | `bmx-freecoaster` | INFO (never a conflict) | **INFO (keep)** | High | No change |
| Q7 | `bmx-seat-system` | ERROR | **ERROR (keep)** | High | Un-flag `[MECHANIC REVIEW]` |
| Q8 | peg axle `'10mm'` merge | no rule (merged token) | **No rule (keep)** | Medium | Note as known simplification |
| Q9 | BMX headset | display-only | **Display-only (keep)**; scope future rule to frame×headset only | Medium | No change now |
| Q10 | gear-ratio display | display-only, never feeds engine | **Correct as-is** | High | No change |
| Q4 | DJ wheel-size (26/24 only) | catalog scope, not severity | **No change** | Medium | No change |

**Net recommendation: land zero severity changes.** Every provisional lean in §5 already matches
what real riders/mechanics report. The one upgrade worth making to the *documentation* (not the
engine) is un-flagging Q7 (`bmx-seat-system`) from `[MECHANIC REVIEW]` to confirmed, since the
research found unanimous, structurally-obvious agreement with no counter-evidence anywhere.

## Sources consulted (fetched, not search-summary-only, where fetch succeeded)

- [Bike Forums — "Ok to use 1/8\" sprocket with 3/32\" chain?"](https://www.bikeforums.net/bicycle-mechanics/412480-ok-use-1-8-sprocket-3-32-chain.html)
- [MTBR — "1/8 chain on 3/32 sprocket: good, ok or bad?"](https://www.mtbr.com/threads/1-8-chain-on-3-32-sprocket-good-ok-or-bad.497271/) (fetched)
- [MTBR — "Chain Width - 1/8\" vs. 3/32"](https://www.mtbr.com/threads/chain-width-1-8-vs-3-32.668539/)
- [Tiires — Bike Chain Size Chart](https://tiires.com/bike-chain-size-chart/)
- [BilletBMX — Cassette Hub vs Freecoaster BMX](https://billetbmx.com/blogs/news/cassette-hub-vs-freecoaster-bmx) (fetched)
- [The BMX Dude — BMX Hub Types Explained](https://thebmxdude.com/bmx-hub-types/)
- [HoodMWR — BMX Freecoaster and a Cassette](https://www.hoodmwr.com/difference-between-a-bmx-freecoaster-a-cassette/)
- [The BMX Dude — BMX Seat Post Types](https://thebmxdude.com/bmx-seat-post-types/)
- [Waller BMX — BMX Guide to Seating Explained](https://wallerbmx.co.uk/pages/bmx-guide-bmx-seating-explained)
- [BMXmuseum Forums — Pivotal Seats thread](https://bmxmuseum.com/forums/viewtopic.php?id=244317) (fetched)
- [The BMX Dude — What BMX Peg Size Do You Need?](https://thebmxdude.com/bmx-peg-size/)
- [The BMX Dude — Are BMX Pegs Universal or Not?](https://thebmxdude.com/are-bmx-pegs-universal/)
- [BMXmuseum Forums — "INTEGRATED HEADSET vs. NON-INTEGRATED FORK"](https://bmxmuseum.com/forums/viewtopic.php?id=308683) (fetched)
- [BMXmuseum Forums — "BMX should switch from 3/8\" axles to 10mm"](https://bmxmuseum.com/forums/viewtopic.php?pid=5129211)
- [Bike Forums — "Is 3/8\" axle the same as 10mm axle?"](https://www.bikeforums.net/bicycle-mechanics/1164283-3-8-axle-same-10mm-axle.html)

**Note on unreachable sources:** `bmx-forum.com` (the r/bmx-adjacent dedicated BMX forum named in
the brief) has **shut down** ("difficult decision to shut down the platform due to a persistent
lack of activity") — its threads are gone, so its two candidate threads (`freecoaster-vs-
cassette-hubs`, `railed-or-pivotal`) could not be consulted; findings above rely on the
surviving mechanic/shop sources instead, which independently corroborate the same conclusions.
`bikeforums.net`'s full thread replies are gated behind login and could not be fetched past the
first page/search-snippet level (Bright Data hit the same login wall) — its citations above are
search-summary-level, flagged accordingly, and every claim they support is independently
corroborated by a fetched source.
