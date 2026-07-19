# Product ideas — brainstorm round, 2026-07-19

**Status: IDEAS, NOT DIRECTIVES.** Nothing in this document is scheduled, approved, or
implied to be coming. Each idea waits for the owner to pick it up, and each would get its
own scoping round before any code. This round deliberately excludes everything already on
the recorded roadmap (visual build diagrams, phone app, ToolBox, sizing guide, geometry
comparison, trail maps, news feed, photo part-recognition, builds gallery,
reviews/ratings, marketplace, home page — see `docs/MISSION.md`).

**The filter every idea passed:** serves the mission (free, unbiased, accurate, honest);
no pop-ups ever; no bias vector (nothing that could rank a brand by money); buildable on
the no-build-step static site + Supabase unless marked "needs new infrastructure"; adds
rider value rather than interface noise.

**Research grounding (fetched 2026-07-19):** PCPartPicker's stickiness comes from the
ecosystem around the picker — price trends, completed-builds community, price-vs-performance
plots — not the picker alone. The bike world's maintenance trackers (ProBikeGarage et al.)
share one loud complaint: *you must re-enter every part on your bike by hand*. Bicycle Blue
Book, the used-value incumbent, is widely criticized as inaccurate (no real transaction
corpus behind it). Suspension-setup calculators are a crowded field, but none is connected
to an actual parts-level build. Torque-spec lookup is scattered across PDFs and blog
tables. Geometry databases (Geometry Geeks, 99 Spokes, Bike Insights) are mature — which is
exactly why this round pitches nothing there beyond what's already on the roadmap.

---

## TIER 1 — TOP 5 (would genuinely move the product; recommended)

### 1. Upgrade Advisor — "check a part against MY bike" (S/M)

Flip the builder's direction: instead of building from scratch, a rider picks their
current bike (the complete-bike rows already carry full factory fills) or loads a saved
garage build, then evaluates any single candidate part against it — the dot, the verdicts,
the adapter fixes, all already computed by `compatOf`. This is the single most common
real-world question ("will this dropper fit my Ripmo?") and the classifieds/used-parts
shopper's constant anxiety, and the engine answers it today; only the entry path is
missing. Serves upgraders and second-hand shoppers — a much larger audience than
scratch-builders. Fits the mission exactly (an honest verdict, no purchase push). Risk:
low — it's a UI mode over existing machinery; the care point is wording, since a green dot
on a 2019 bike outside the catalog must not overclaim.

### 2. Upgrade Optimizer — "cheapest way to drop 500 g" (M)

A pure-math answer nobody in the bike world offers: given a build, enumerate compatible
swap candidates slot by slot (the engine already knows which), and rank by dollars per
gram saved — "your cheapest 500 g lives in the wheels, not the derailleur." PCPartPicker's
price-vs-performance plot is its analog; weight is the bike world's performance axis and
the catalog already holds both numbers on every row. Serves weight-conscious riders and
budget upgraders equally, and it's structurally unbiased: the ranking is arithmetic on
MSRP and grams, with unverified weights labeled or excluded per the existing honesty
rules. Risk: sample-data weights could mislead — mitigate by offering a verified-only mode
and labeling estimates exactly as the app already does.

### 3. Garage service log — maintenance tracking with the parts already filled in (M/L)

Every dedicated maintenance tracker's top user complaint is re-entering the whole bike by
hand; a garage build here *is* the parts list, so the cold-start pain vanishes. Per-part
service intervals (chain wear checkpoints, fork lowers service, pivot-bearing checks)
come from the mechanic corpus with citations — published intervals only, silence where
makers publish none, exactly the engine's dormancy discipline applied to maintenance.
Riders log hours or rides manually; no fitness-platform dependency required (an optional
import could come later). Serves every owner, not just builders, and gives accounts a
reason to exist beyond saving builds. Risk: interval data is a real corpus grind, and
notifications must be in-app-on-visit only — never a pop-up, and email only by explicit
opt-in. Needs Supabase tables (existing infrastructure pattern).

### 4. Personal recall watcher (S/M)

The catalog already carries confirmed recall notes on affected rows; the garage already
knows which parts a signed-in rider owns. Join them: a quiet, prominent notice when a
recall matches something in your saved builds or inventory, with the official remedy
linked and the honest serial-range framing the recall notes already use. This is the
rare feature that is pure rider-safety value with zero commercial angle — trust as a
feature, literally. Effort is small because both halves exist; the join and a notice
surface are the work. Risk: minimal — the one rule is that it must never overclaim ("may
be affected; check your serial against the official notice"), which the recall notes'
existing language already models.

### 5. Mechanic-ready build sheet — print/export with torque specs (S/M)

One click turns a build into a clean printable sheet: every part with its interface
specs, the verdict list, totals, the share link as a QR code — and, where the mechanic
corpus has a *cited* value, the torque spec beside each clamped part (carbon bars, stem
bolts, seatpost collar). Torque lookup today is scattered across brand PDFs and blog
tables; putting cited values on the rider's own parts list is genuinely new. Serves the
hand-your-builder-to-a-shop moment and the home mechanic equally, and it makes the site
useful *after* the build decision — the lifecycle beyond picking. Effort: a print
stylesheet + a torque field pass over cockpit/seatpost categories, cited-or-blank. Risk:
a wrong torque number is a safety defect — the bar must be manufacturer-published values
with sources, silence otherwise (the project's existing rule, applied verbatim).

---

## TIER 2 — WORTH CONSIDERING

### 6. "Spec changes we caught" — a public drift feed (S)

The drift checker already re-fetches verified sources and catches silently changed specs;
today those catches die in internal reports. A public, dated feed — "maker X's page now
lists 2,550 g where it said 2,100 g" — is a trust artifact no other bike site has, and
it's nearly free because the machinery exists. Doubles as honest marketing: it shows the
verification bar operating in public. Risk: tone must stay factual, never gotcha —
makers are future partners.

### 7. Public data-quality dashboard (S)

Verification percentage per category and per brand, the documented fetch walls, the
demotion history — the numbers `validate.js` already prints, rendered as a page. It turns
THE BAR from a repo doc into a visible product promise, and it pairs naturally with the
drift feed (#6). Effort small: the data is computable at commit time into a static JSON.
Risk: per-brand verified percentages must be framed as *our access*, not brand quality —
a wall is the maker's choice, not a defect; wording review needed so it can't read as a
brand ranking.

### 8. Standards encyclopedia — a page per vocab value (M)

Every vocabulary token the schema knows (Boost 148, UDH, trunnion, S.H.I.S. codes, XD vs
XDR…) becomes a small generated page: what it is, what it mates with, which adapters
bridge it (the engine's structured `fix` data), which catalog parts carry it. This is the
"why this verdict" explainer generalized into a browsable, linkable reference — and a
legitimate search-engine surface built from data the project already trusts. Effort:
generator over VOCAB + engine adapter pairs, plus prose from the guides corpus. Risk:
low; it's static content under existing honesty rules.

### 9. "Why this verdict" inline explainers (S/M)

Each ruleId links its verdict text to a short plain-language explainer — what the
standard is, why the mismatch matters, what the adapter actually does — drawn from the
dossier and guides. The verdict stays terse; the curiosity click gets the education.
Serves beginners without cluttering the expert's view (a click-opened card, so
pop-up-rule clean). Pairs with #8 as its link target. Risk: none beyond writing effort.

### 10. Build diff — compare two builds side by side (S/M)

Paste two share links (or pick two saved builds) and see the slot-by-slot diff: parts,
price delta, weight delta, verdict differences. Utterly natural for "which of these two
complete bikes should I buy" and for before/after upgrade planning; share-link
infrastructure already defines the input format. PCPartPicker never did this well.
Risk: low; pure client-side computation over existing structures.

### 11. Owned-vs-to-buy build planner (S/M)

The inventory feature already knows what a rider owns; let a build mark slots as
"have it" vs "need it" and show remaining-cost — the real number a phased upgrade
project runs on. Serves the winter-project builder buying one part per paycheck.
Effort small: a per-slot flag and a second total. Risk: none identified; it reuses the
existing MSRP basis and changes no verdict logic.

### 12. Rider weight limits — a new sourced safety field (M)

Many makers publish a max rider or system weight per frame/wheel/seatpost; the catalog
doesn't capture it. Add an optional sourced field and a per-build info line ("lightest
published limit in this build: 110 kg — frame") — cited-or-silent, the rule-18 dormancy
template applied to a safety fact. Genuine value for heavier riders, whom almost every
tool ignores. Risk: must stay an info/advisory, never a computed verdict about a
specific rider; the data grind is real but incremental like every other sourced field.

### 13. Consumables & small-parts card per build (M/L)

A build implies its consumables: the right chain width, brake pad shape, rotor size,
sealant, and — the legendary pain — the derailleur hanger. UDH is already a field
(that answer is free today); non-UDH hanger identification is a famously miserable
lookup that a per-frame sourced field could solve over time. Serves every owner at
service time. Risk: pad-shape and hanger data are new grind axes with patchy sources;
ship cited-or-blank and let coverage grow row by row like verification does.

### 14. Suspension baseline card — maker-published setup only (M)

Given the build's fork/shock and a rider weight input, show the *manufacturer's own*
published base settings (air pressure tables, sag range, click counts) with the source
linked — and nothing where the maker publishes nothing. The calculator field is crowded
but every one of them guesses from generic formulas; citing only the maker's table tied
to the actual picked part is the honest-data version. Risk: coverage will be sparse at
first and must say so; strictly display, never a computed recommendation.

### 15. Units toggle — metric/imperial (S)

Grams-and-mm is right for parts, but plenty of riders think in pounds; a lb/kg toggle on
totals (persisted like the theme) is cheap reach. Full localization is a separate, much
bigger question (see #20). Risk: none; display-only.

### 16. Discontinued-parts archive view (S)

The lifecycle fields (`status`, `supersededBy`) already chain generations; an explicit
"include discontinued" browse mode with a lifecycle banner turns the catalog into a
reference that outlives product cycles — where 99 Spokes archives whole bikes, this
archives *interface data*, which is what a used buyer actually needs. Pairs with the
Upgrade Advisor (#1): used shoppers are exactly the people hunting discontinued specs.
Risk: none; the data model already supports it.

---

## TIER 3 — LOGGED (recorded honestly as weak or premature)

### 17. Open compatibility API / embeddable checker (M, logged for timing)

A documented read-only JSON surface (the catalog is already public JS) plus an
embeddable "check this build" widget for forums and video creators — PCPartPicker's
ecosystem grew partly on permalinks and forum markup. Logged rather than recommended
because it freezes public contracts (IDs, schema) while both still evolve fast, and an
API implies a stability promise the project shouldn't make mid-grind. Revisit when the
data model has been quiet for a while.

### 18. Used-value estimates (logged: would violate the honesty bar)

The incumbent is widely criticized as inaccurate precisely because it lacks real
transaction data — and this project would have even less. Publishing a guessed number
wearing the site's trusted badge is exactly the false-"fits" failure mode transplanted
to pricing. If the marketplace (Phase 10) someday produces real, consented transaction
data, revisit; until then the honest answer is no number at all.

### 19. Build-off challenges (M, logged pending the gallery)

Themed community challenges — lightest hardtail under $2,500, best budget enduro —
scored by the engine's *computed* totals rather than votes, which keeps them unbiased
and un-gameable in a way social contests aren't. Genuinely fun and on-values, but it
depends on the builds gallery (Phase 7) existing first; logged so it's remembered when
the gallery ships.

### 20. Full localization / i18n (L, logged)

Real reach eventually, but a no-build-step static site makes string extraction a
hand-rolled affair, the catalog's English spec vocabulary is the actual content, and
traffic doesn't yet justify the carrying cost. The units toggle (#15) captures the
cheap 80%. Revisit on real international traffic evidence.

### 21. Rotating-vs-static weight breakdown (S, logged as gimmick-risk)

Splitting build weight into rotating mass (wheels, tires, cassette) and static mass is
physically real and cheap to compute from existing data, but it flirts with
weight-weenie theater and adds a number most riders won't act on. The Upgrade Optimizer
(#2) delivers the actionable version of the same insight ("your cheapest grams are in
the wheels"). Logged in case #2's scoping wants it as an internal detail.

### 22. Theft-registry integration (logged: out of mission)

Serial-number registries exist and do this well already; bolting one on adds surface
area without adding anything the mission owns. A garage feature could someday link *out*
to an official registry entry, but building or mirroring one here is scope creep. No
planned action.

---

## Cross-cutting notes

- **The lifecycle thesis** ties Tier 1 together: today the product's value ends at the
  moment of purchase decision; ideas 1–5 extend it to owning, maintaining, and upgrading
  — where a rider spends years, not evenings. That's also where return visits (and
  eventually honest affiliate value) live, without a single new bias vector.
- **Every data-dependent idea inherits the dormancy discipline**: cited-or-silent,
  activation per part as sources arrive, never a guessed value. The rule-18 template is
  the product pattern, not just an engine pattern.
- **Nothing here needs a pop-up, and several ideas (6, 7) actively convert the
  project's internal honesty machinery into visible product.** That conversion —
  trust made legible — is the cheapest differentiation available, because the hard part
  (actually doing the verification) is already paid for.
