# TrailBuilder Fitter Corpus — INDEX

The **bike-fitter** specialist's cited knowledge library. This is the entry point: the agent
(`.claude/agents/bike-fitter.md`) loads THIS file first, decides which chapter(s) the question
touches, and pulls only those.

**Purpose.** TrailBuilder answers "will these parts fit *each other*." The fitter answers the
question sitting underneath that one: **will this bike fit this *rider*.** A frame that passes
every compatibility rule can still be the wrong size, put the bar 30 mm too low, and hand its
owner ulnar neuropathy on a long ride. The mechanic corpus records part-to-part truth; this
corpus records **rider-to-bike** truth — sizing systems, saddle position, cockpit dimensions,
kids' sizing, discipline differences, and the fit causes behind common pain. It is the knowledge
layer behind a future fit-advice surface and, most concretely, behind the **First Bike Finder**
(see `kids-fit.md`).

**Sibling corpora.** This mirrors [`tools/mechanic/INDEX.md`](../mechanic/INDEX.md) and
[`tools/coach/INDEX.md`](../coach/INDEX.md) exactly in structure and discipline — same
append-only stable IDs, same fetched-source citation bar, same facts-not-wholesale-text rule,
same flag-never-edit engine boundary. Read those INDEXes too if you work across corpora; the
differences here are the two fitter-specific additions below (the **GUIDANCE-NOT-PRESCRIPTION**
rule and the **⚠ DISPUTED** protocol's central role) and the source-tier adaptation.

**ID ranges (cross-corpus rule).** Fact-ID prefixes are unique per corpus so a citation is
unambiguous across the whole project. This corpus owns `SIZ-` (sizing-fundamentals), `SDL-`
(saddle-position), `COC-` (cockpit-fit), `KID-` (kids-fit), `DSC-` (discipline-fit), `PRB-`
(fit-problems). It never emits `DRV-`/`BRK-`/`SUS-`/`WHL-`/`CKP-`/`FRM-` (mechanic),
`FND-`/`COR-`/`BRK-`/`CLD-`/`TER-`/`CCH-` (coach), or `MOB-`/`ACC-` (ui-expert). Note the
deliberate avoidance of `CKP-`: the mechanic corpus already owns it for cockpit *hardware*, so
cockpit *fit* is `COC-` here.

**Organizing principle — THE FIT IS A SYSTEM, AND EVERY CHANGE MOVES SOMETHING ELSE.** The
mechanic corpus is organized around INTERACTIONS (parts fail in combination); the coach corpus
around PROGRESSIONS (skills build in order). Fit's spine is **COUPLING**: no fit dimension is
independent. Moving the saddle back raises effective saddle height and lengthens reach. Cutting
the bar narrower quickens the steering and changes how much stem you want. Raising the bar
shortens effective reach. Every chapter carries a **COUPLINGS** section naming what else moves
when this dimension moves, and in which direction. A fit number in isolation is nearly useless;
what a rider (or a recommendation engine) needs is the number **plus what it drags with it.**

---

## Corpus rules (non-negotiable)

1. **Append-only.** Every fact carries a **stable ID** (`SIZ-1`, `SDL-3`, …). Never renumber,
   never rewrite in place. A correction is a **new fact** that references and supersedes the old
   one (`SDL-1 SUPERSEDED BY SDL-42`) — the same discipline as the catalog's `ALIASES` and both
   sibling corpora. History stays legible; a future reader sees what changed and why.

2. **Every fact carries a fetched-source citation.** The gold tier here is **peer-reviewed
   literature** (this is the one bike domain with a real clinical/biomechanics evidence base) or
   a **fetched manufacturer sizing document**. Search-result summaries are never a source alone
   (the project's oldest lesson: *summaries lie*). A fact seeded from a repo doc carries **both**
   the repo doc AND the primary URL it records.

3. **Facts + citations only — never wholesale-copied text.** Paraphrase the fit claim; a short
   quoted phrase under attribution is fine to pin exact wording. One quote per answer, under 15
   words, attributed — the project's copyright discipline.

4. **⚠ GUIDANCE-NOT-PRESCRIPTION (fitter-specific, load-bearing).** Bike fit has **competing
   documented methods that disagree with each other**, and the honest state of the art is a
   *starting point plus iteration*, not an answer. Therefore:
   - **Every positional recommendation is presented as a METHOD with its name, its stated
     output, and its known disagreement** — never as "the correct number." When several methods
     exist (saddle height is the canonical case: LeMond 0.883, Hamley 109%, Holmes knee-angle,
     heel-drop), present them **side by side with what each is derived from**, not merged into
     one confident figure.
   - **Never prescribe to a named individual's body.** The corpus describes methods and ranges;
     it does not tell a specific rider what their saddle height is.
   - **Medical-adjacent symptoms always carry a see-a-professional line.** Numbness, persistent
     pain, any neurological symptom (tingling, weakness, loss of sensation), and any genital or
     perineal symptom get an explicit "this warrants a clinician and/or a professional fitter,
     not a web page" statement — every time, without exception, even when the corpus has a
     well-sourced fit cause for it. A fit cause is a *hypothesis to test*, not a diagnosis.
   This rule exists because the failure mode of this corpus is **injury and false confidence in
   a body claim** — the coach corpus's SAFETY-FIRST rule, translated into fit's idiom.

5. **⚠ DISPUTED tag — central here, not exceptional.** In coaching, disputes are notable; in
   fit, they are the **normal state** of several load-bearing questions. **KOPS is the canonical
   case** and is tagged as such in `saddle-position.md`: it is simultaneously the most widely
   taught setback starting point AND has been argued to have no biomechanical foundation, by
   named authorities, in writing. When sources conflict, tag `⚠ DISPUTED`, present **both**
   positions with their sources and what each is actually claiming, and do **not** collapse them.
   Frame-reach-vs-effective-top-tube is a second live dispute (see `sizing-fundamentals.md`).

6. **⚠ CONTRADICTION tag (engine/catalog boundary).** If a fit fact collides with a TrailBuilder
   **catalog assumption or engine rule**, tag it `⚠ CONTRADICTION`, name the exact `ruleId` /
   catalog field, and hand it to the **coordinator**. This corpus never edits the engine (see
   "Boundaries"); it flags.

7. **⚠ SITE-CONSTRAINTS rule.** Every recommendation this corpus produces MUST respect
   BuildMyMTB's standing constraints, and an entry that collides with one must say so rather
   than assume it away:
   - **No build step, no CDN, no webfonts** — anything implementable must be plain HTML/CSS/JS
     with vendored assets only (CLAUDE.md Conventions).
   - **NO pop-ups / unsolicited overlays, EVER** (Douglas hard rule 2). A fit-advice surface may
     never interrupt; click-opened cards and panels are fine. A "get a professional fit!"
     interstitial is banned no matter how well-intentioned.
   - **NO e-bikes** (hard rule 1) — no e-specific fit content, ever, absent Douglas's word.
   - **UNBIASED is load-bearing** — fit guidance must never be shaped to steer a rider toward a
     manufacturer, a size a retailer has in stock, or a part with an affiliate link. A method
     that originates with a brand or a paid fit system is **labelled with that origin**
     (RideLogic, Retül, BikeFit, Specialized S-Sizing all carry vendor tags below).
   - **The honest-data value** — fit copy never overclaims. "A starting point, then ride and
     adjust" is the truthful register; "your correct saddle height is X" is not.

8. **Carry the source's own confidence, and the envelope it applies to.** A fit number is almost
   never universal: it is right for *this discipline, this rider's proportions, this terrain*.
   Road-derived formulas applied unchanged to MTB are a documented error (see `discipline-fit.md`
   DSC-2). State the envelope. A symmetric answer to an asymmetric reality is a bug.

9. **Both errors cost — and the honest floor is "not established."** A false "your bike is too
   big" sends someone to sell a bike that fits; a false "that's fine" leaves them in pain. When
   sources genuinely disagree or nothing was fetched, the honest entry is "not established —
   here's what would settle it." Silence beats a confident wrong number.

10. **Target the weakest chapter.** Future rounds read every chapter's **Maturity** line and
    **## Gaps** list first (defined in [`CURRICULUM.md`](CURRICULUM.md)) and prioritize the
    **weakest-graded chapter(s)**, closing listed gaps rather than re-deepening a strong one.

---

## What counts as a source here (tier adaptation)

Fit is unusual among this project's domains: it has **both** a manufacturer-spec layer (size
charts, geometry) **and** a genuine peer-reviewed literature. The tiers reflect that.

- **Tier A — peer-reviewed literature** (journal / PubMed): systematic reviews and controlled
  studies on saddle height, joint kinematics, and cycling overuse injury. This is the **highest**
  tier here — unlike the mechanic corpus, where the maker page is gold. Strongest for *mechanism*
  and for *what a method actually does to a joint angle*; thinnest on MTB specifically (most of
  the literature is road/laboratory/ergometer, a limitation the corpus states every time).
- **Tier A-mfr — fetched manufacturer sizing document**: a maker's own size chart, geometry
  chart, or fit guide (Trek's mountain sizing guide, Specialized S-Sizing, Race Face's cockpit
  guide, a component maker's cut-limit instructions). Primary and authoritative **for that
  maker's own product**, and the only acceptable source for a per-model sizing claim. Note the
  **UNBIASED caveat**: a maker's chart describes its own bikes, not a universal truth.
- **Tier B — established fit authority, published article**: professional fitters and fit
  educators writing under their own name with a coherent method (Steve Hogg, Keith Bontrager via
  sheldonbrown.com, John Higgins/FitKit Systems, Lee McCormack / RideLogic, BikeRadar sizing &
  fit, myvelofit fit academy, named physio/fitter blogs). A single Tier-B page is a real source.
- **Tier B-consensus — multiple independent Tier-B sources agreeing.** Often the strongest tier
  available for a practical cockpit question; treat a claim corroborated across ≥3 independent,
  method-serious sources as high-confidence and say "consensus."
- **Tier B-vendor — a fit system or brand with a commercial interest in its own method**
  (RideLogic/RAD, Retül, BikeFit, a brand's proprietary sizing scheme). Real, often
  well-reasoned, sometimes the only articulation of a useful idea — but **always labelled with
  the commercial interest**, per the UNBIASED value. Never presented as neutral consensus.
- **Tier C — aggregator / review-site normalization.** For kids' and balance bikes specifically,
  the review aggregators carry cleaner, more normalized spec tables than the walled maker pages
  (a lesson already recorded in `data/STRIDER-MODEL.md` §2). Usable as a **map**; a maker page is
  still required for any `verified:true` catalog row.
- **Tier D — community/forum/rider-lore.** Real but lowest; usable to describe a preference
  spectrum or flag that riders disagree, never to assert a fit claim on its own. Label it plainly.

**The bar:** asserting that a position is **harmful** (the fit analog of a hard "won't fit")
needs Tier A or Tier B-consensus. Community lore can describe a preference, flag a dispute, or
soften a claim — never establish a harm claim on its own.

---

## Boundaries (what this corpus and its agent may and may not do)

- **Knowledge, not code.** The corpus and the fitter agent produce **facts and recommendations
  only.** They **never** edit `src/compat.js`, `src/schema.js`, catalog rows, or tests. Anything
  touching the engine/catalog is **flagged** (`⚠ CONTRADICTION`), not changed.
- **No individual medical or injury advice.** The fitter describes documented fit-symptom
  associations; it does not diagnose, does not treat, and does not clear anyone to ride. See
  corpus rule 4.
- **No prescribing a size to a named person.** It describes how sizing systems work and what
  each method outputs; the rider (ideally with a fitter) owns the decision.
- **Recommendations route through the coordinator** — a proposed new chapter, a fit-surface
  feature, or a `⚠ CONTRADICTION` is a note for the coordinator to triage, not a change to make.

---

## Chapters

| Chapter | Covers | Level | Key couplings |
|---|---|---|---|
| [`sizing-fundamentals.md`](sizing-fundamentals.md) | frame sizing systems · reach & stack · effective top tube · seat-tube legacy sizing · maker size-chart variance | L1→L2 | reach↔stem length↔bar width; stack↔spacers↔bar rise; seat-tube angle silently changes effective reach |
| [`saddle-position.md`](saddle-position.md) | saddle height (LeMond / Hamley / Holmes / heel) · setback & the KOPS dispute · tilt doctrine | L1→L2 | height↔fore-aft (moving back raises effective height); tilt↔perineal pressure↔hand load |
| [`cockpit-fit.md`](cockpit-fit.md) | bar width & shoulders · stem length & handling · bar rise/sweep/roll · lever reach & angle · grip diameter | L1→L2 | bar width↔steering speed↔stem length; bar cut↔stiffness; lever angle↔wrist angle |
| [`kids-fit.md`](kids-fit.md) | **inseam→seat-height matching · standover · bike-weight ratio · when to size up (don't) · balance-to-pedal readiness** | L1→L2 | **powers the First Bike Finder**; seat-min↔inseam is the gate, seat-range↔longevity is the sell |
| [`discipline-fit.md`](discipline-fit.md) | MTB vs road vs gravel vs XC-vs-enduro — how discipline changes the answer | L1→L2 | discipline↔every other chapter's numbers; seated-static vs standing-dynamic is the fault line |
| [`fit-problems.md`](fit-problems.md) | numbness · knee pain · hand/wrist · neck/back · saddle-region symptoms → fit-cause mapping | L1→L2 | symptom↔multiple candidate causes (never one); every entry carries the professional-referral line |

**Level note.** The chapter level marks where its *core* content sits; each chapter is graded
separately for **Maturity** (foundation / professional / master) in its own header — see
[`CURRICULUM.md`](CURRICULUM.md).

---

## Seed provenance (where this corpus's first facts came from)

Seeded 2026-07-18 in the fitter-bootstrap round via a fetched L1 ingest across four source
classes, cross-corroborated:

- **Peer-reviewed (Tier A), via the PubMed MCP:** Bini/Hume/Croft 2011 saddle-height narrative
  review and Bini/Priego-Quesada 2021 systematic review (the two anchor papers); Millour et al.
  2019 on static-vs-dynamic knee-angle methods; Ferrer-Roca et al. 2012 and
  Encarnación-Martínez et al. 2021 on inseam-percentage methods and their sex-specific failure;
  Holliday & Swart 2021 on anthropometrics/flexibility as configuration predictors; Deakon 2012
  and Wanich et al. 2007 on cycling overuse injury; Akuthota et al. 2005 and Richmond 1994 on
  cyclist's palsy; Baran/Mitchell/Hellstrom 2015 on cycling-related sexual dysfunction; Zeuwts
  et al. 2022 and the 2024 Lyapunov study on balance-bike vs training-wheel learning.
- **Manufacturer sizing documents (Tier A-mfr):** Trek's mountain-bike sizing guide,
  Specialized S-Sizing, Race Face's cockpit selection guide, OneUp's carbon-bar cutting
  instructions, PNW Components' bar-width guide, Liv Cycling's bar-cutting guide, Giant's saddle
  adjustment page, USA Cycling's balance-bike article.
- **Fit authorities (Tier B / B-consensus):** Steve Hogg on setback and KOPS; Keith Bontrager's
  "The Myth of K.O.P.S." via sheldonbrown.com; John Higgins (FitKit Systems) on MTB fit; Lee
  McCormack / RideLogic and Zinn Cycles on RAD (labelled Tier B-vendor); BikeRadar on saddle
  setback; myvelofit on tilt and adjustment order; Peloton Physio on saddle position; Cyclist,
  Bike Gremlin, Sage Titanium and Seven Cycles on stack/reach (Seven supplying the dissent);
  ENDURO magazine on bar width and cut-stiffness; REI on bar width and kids' bike sizing.
- **Repo docs:** [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md) §3 — the balance-bike
  sizing science, carried here with its own primary sources and **cross-checked for
  contradiction** (result recorded in `kids-fit.md`; none found, one refinement noted).

The seed is a **floor, not a ceiling** — the fitter agent appends every newly verified fact.

## L2–L4 fetchability map (for the next rounds)

- **Tier A literature is the strong suit and is wide open.** PubMed MCP returns full abstracts
  and DOIs reliably; the saddle-height and overuse-injury literatures are both well-indexed and
  were only sampled this round. **This is the opposite of the coach corpus's situation** (where
  the authoritative tier was member-walled) — for fit, the rigorous tier is the *reachable* one.
  Two caveats: (a) the literature is overwhelmingly **road/ergometer**, so MTB-specific transfer
  is usually an inference and must be labelled as one; (b) full texts are often paywalled —
  abstracts carry the numbers cited here, and PMC open-access covers a useful minority.
- **Professional fit-certification curricula are the standout wall**, exactly mirroring the
  coach corpus's finding about PMBIA/BICP. Retül University, BikeFit Pro, IBFI and Serotta/
  Sicilian-lineage fitter courses are all **paid/member-gated**. Their public marketing pages
  are Tier-B-vendor at best. **Flag to Douglas as a potential paid-access decision** if true L4
  fitter-craft depth is ever wanted — same shape as the coach corpus's L4 flag.
- **Maker size charts fetch well via Exa** (Trek, Specialized, Giant, Race Face, PNW, OneUp,
  Liv all returned usable content). Expect JS-walled geometry tables on some brands; the
  **geometrygeeks.bike** convention-normalization route was NOT exercised this round and is the
  first thing an L2 sizing round should try.
- **Kids'/balance-bike specs: aggregators beat maker pages**, already established in
  `data/STRIDER-MODEL.md` §2 (Strider 403s WebFetch and times out Exa; woom/Cannondale read fine
  via Exa; twowheelingtots/readysetpedal/rascalrides normalize cleanly). Unchanged this round.
- **Steve Hogg's site fetches cleanly** via Exa and is a deep, opinionated Tier-B seam barely
  scratched — a natural L2/L3 target for setback, cleat position, and the pelvic-stability model.
- **Not yet touched, ranked by value:** cleat/foot position (a whole documented sub-domain, and
  the one fit adjustment several sources say to set *first*); crank length (an active research
  question with recent literature); saddle *width* vs sit-bone measurement (has both a
  literature and maker measurement systems); female-specific fit (Encarnación-Martínez 2021 shows
  the male-derived formulas measurably fail women — an evidence-backed gap, not a token one);
  suspension sag as a fit variable unique to MTB (changes stack and seat angle under load, and no
  road fit source addresses it).
