# BuildMyMTB — Mission & Full-Realization Roadmap

> **Our mission:** BuildMyMTB is a free, unbiased bike-building tool with accurate
> data: it tells you whether parts fit together, what they cost, and what they
> weigh — verified against the people who make them, favoring no manufacturer, and
> honest about what it doesn't yet know.

_The project's north-star document: what this is, why it exists, and the path from
today to the whole planned project. Written 2026-07-18. Live counts cited below are
from that date and grow daily — `node validate.js` prints the current ones; trust it
over any number in prose._

---

## Part 1 — The big overview

### The idea

Pick a frame. Pick a fork, wheels, a drivetrain, brakes — every part of a mountain
bike — and watch the site tell you, in real time, whether they actually fit together,
what the build costs, and what it weighs. That's BuildMyMTB: a free build planner and
compatibility checker for riders, running entirely in your browser with no install,
no account required, and nothing between you and the data. The site loads straight to
the builder — no pop-ups, no interstitials, ever. That's a permanent rule, not a
current state.

The one contract that everything else serves: **a "compatible" verdict must be true.**
A false "fits" and a false "won't fit" are the two worst failures the product can
have — worse, in both directions, than a missing part or a missing rule. When the
engine doesn't have manufacturer-backed data for a check, it stays silent rather than
guessing, and the app's all-clear deliberately reads "No conflicts found" — meaning
no conflict among the dimensions we check — never "everything is guaranteed
compatible."

### What's live today (buildmymtb.com)

- **The MTB builder** — the flagship. A 26-slot build (frame through pedals) checked
  by a compatibility engine covering 20 rule areas: wheel sizes (including mullet),
  axle standards, drivetrain system/speed/actuation, freehub interfaces, brake and
  rotor mounts, shock fit, fork travel, dropper and seatpost diameters, headset
  standards, single-speed rules, and more. Verdicts are structured and
  direction-aware (a too-big dropper is an error; a smaller one is a "works with a
  shim" warning), and where a real adapter exists the verdict says which one.
  As of 2026-07-18 the MTB catalog holds **5,023 parts, 3,041 of them verified
  (60.5%)** against fetched manufacturer sources — and growing daily. It includes
  complete factory bikes alongside individual parts, hardtails alongside full
  suspension, and dirt-jump bikes with their single-speed rules.
- **BuildMyBMX** — a separate page with its own BMX catalog (225 parts, 62 verified
  at the flip) and its own compatibility engine, live since 2026-07-17 after an
  adversarial pre-launch audit. The honest note: BMX brands mostly sell complete
  bikes rather than standalone parts, so its verified fraction is source-limited —
  that ceiling is documented, not hidden.
- **BuildMyKit** — rider gear (helmets, shoes, apparel, protection: 714 items, 437
  verified). Deliberately independent of the bike engine: gear has sizing and
  certification data, not mechanical compatibility, and the site doesn't pretend
  otherwise. Certifications are shown only when fetched from a real source.
- **Accounts, saved builds, and a garage** — optional sign-in (the tool works fully
  without it) with saved builds, an owned-parts inventory, and shareable build
  links. Every stored build passes through the same sanitizer as a share link.
- **A forum** — threaded discussion with a deliberately open moderation philosophy:
  free speech first, with guardrails aimed only at mechanical abuse (flooding, spam,
  scams, illegal content, predation) — never at viewpoints or opinions.
- **42 guides** — buyer's guides, compatibility explainers, and riding-skills
  articles grounded in the project's cited specialist knowledge bases rather than
  generic filler.
- **Safety notes** — where a confirmed product recall matches a cataloged item, the
  row says so, with the official remedy linked and honest framing (a recall scopes
  serial ranges, not every unit).

### Built and waiting for the word

New bike types are developed **off-live** — separate datasets and engines, wired
into nothing the site serves — until the owner explicitly flips them. Built so far,
each with its own validated catalog and design document:

| Surface | State (2026-07-18) | Gate |
|---|---|---|
| **Road** | 150 parts (32 verified), data model done; catalog grind scheduled | Engine + page build-out, then the owner's word |
| **Gravel** | 150 parts (26 verified), data model done | Same playbook as road; the owner's word |
| **Balance bikes** | 36 bikes (32 with real seat-height data); designed as a *fit guide*, not a parts builder — kids' bikes are complete-bike purchases, so the honest product is inseam-to-seat-height matching | Open product decisions, then the owner's word |
| **E-MTB** | 75 complete bikes, 0 verified yet; strictly contained on its own future page — the MTB catalog stays permanently e-bike-free | Verification round + page, then the owner's word |

Also designed on paper, not yet built: per-product **reviews and ratings** (with an
explicit anti-gaming and anti-bias model), a public **builds gallery** (every
published build carries the engine's real verdict and real totals), and a used-parts
**marketplace** whose threat model was written before any code — headlined by the
rule that the platform never holds anyone's money.

### The quality machinery — why a green check means something

Anyone can display a green check. The machinery below is what makes this one worth
trusting:

- **THE BAR.** A part is marked "verified" only when its interface specs were
  checked against a *fetched* manufacturer page — search-result snippets and
  retailer summaries have repeatedly lied and are rejected. The validator refuses a
  "verified" flag without a real source URL and date, so the badge can't be faked
  even by accident. Absence of the flag honestly means "sample data" — and the app
  says so.
- **More accurate info, never less — and never invented.** Where a maker publishes
  no weight, a reputable third-party *measured* weight is accepted for the weight
  only, labeled as such. Where nothing trustworthy exists, the field stays blank. A
  missing value always beats a plausible-looking fabricated one; whole grind waves
  have dropped rows rather than guess a spec.
- **Ethical sourcing.** The project renders public pages the way any rider's browser
  would, and **never defeats a manufacturer's anti-bot protection** — a hard wall is
  documented as a wall, and the row stays honestly unverified. Partners-to-be are
  not people you sneak past.
- **A missing rule beats a wrong one.** Engine rules activate only on
  manufacturer-documented data, per part. Rules that can't yet be backed stay
  dormant, and candidates that would false-flag real-world builds (chainline is the
  canonical example) are rejected outright and documented.
- **Adversarial self-auditing, on a standing cadence.** Beyond the ordinary gates
  (schema validation, a 750+-case test suite, strict type-checking — run in CI on
  every change, with deploys blocked unless they pass), the repo carries an
  adversarial verdict-audit harness that hunts false "fits" and false "won't fits"
  across the whole catalog, two independent engine correctness audits, recurring
  **manufacturer-bias audits** (three rounds so far; each published in the repo,
  findings tracked to resolution), code-quality audits, and drift checks that
  re-fetch verified sources to catch silently changed specs.
- **Unbiased, structurally.** The load-bearing product value. No brand gets
  favorable rules, ordering, or representation; affiliate infrastructure is
  firewalled so that no commercial datum can ever feed a compatibility verdict or a
  ranking (savings math runs on MSRP precisely so a retailer's sale can't quietly
  promote its own SKU). The bias audits exist to prove this keeps being true.
- **An expert bench.** Persistent, citation-only knowledge bases — a bike mechanic,
  a riding coach, a UI/accessibility expert, with a bike fitter, recall watchdog,
  and security specialist now booting — each built from primary sources (service
  manuals, standards documents, peer-reviewed work) with per-chapter maturity
  grades and honest gap lists. They ground the guides, review engine-rule
  severities, and have already overturned one engine rule with manufacturer
  documentation. The paper trail (a reviewer entry point, a running project log, a
  decision dossier) is public in the repo so anyone can re-derive any claim.
- **Containment and honesty rules.** No pop-ups, ever. No e-bike data anywhere near
  the MTB catalog. Append-only part IDs so links never rot. Honest wording
  everywhere a claim could overclaim.

What the machinery does *not* claim: the engine's rules are proven self-consistent
and manufacturer-sourced, but they have not yet been field-validated at scale by
professional mechanics and riders. That review layer is on the roadmap below, and
until then the product's language stays calibrated to what's actually proven.

---

## Part 2 — The mission statement

**Adopted by the owner, 2026-07-19:**

> BuildMyMTB is a free, unbiased bike-building tool with accurate data: it tells
> you whether parts fit together, what they cost, and what they weigh — verified
> against the people who make them, favoring no manufacturer, and honest about
> what it doesn't yet know.

Drafted from the owner's own recorded words — "trustworthy, accurate data, no bias,
just a tool for users to help them build or have fun"; "we are building the best
bike website"; information the community can *trust and count on*; unbiased as
load-bearing; every bike type eventually; more accurate info over less. Two
alternate drafts (a rider-emotional voice and an ambitious voice) were considered
and set aside in favor of this plain-spoken one — the statement's honesty IS the
brand voice.

---

## Part 3 — The steps to full realization

The phases below are ordered by dependency, not hype. Many gates are literally "the
owner's word" — that is the project's deliberate governance model (new surfaces ship
only on an explicit, recorded decision), and it's stated plainly where it applies.
Phases overlap where their dependencies allow; the numbering is a map, not a strict
queue.

### Phase 1 — The MTB flagship, polished to the bar (active, top priority)

MTB is the reference example everything else copies. What ships here:

- **The verification climb** continues past 60% — honestly. Much of the remaining
  tail is wall-limited (makers whose pages block automated fetching), and per the
  ethics rule those walls are documented, not defeated; progress comes from new
  legitimate access, not from lowering the bar.
- **Catalog completeness**: remaining frame gaps, category breadth (many brands are
  still single-SKU), complete-bike build-sheet verification, and the data-model
  cleanup passes that keep 5,000+ rows coherent.
- **A proper home page** — the site currently loads straight into the builder; a
  real front door (designed under the no-pop-up rule) is a standing item awaiting
  the owner's kickoff.
- **The style pass** — a chosen design direction exists; icons, header, and theme
  polish continue, with every change contrast-checked and accessibility-audited
  (the recent mobile hard-review and its fix wave are the template).
- **The human expert review** — the engine's rule severities and thresholds go in
  front of professional mechanics (the review packet already exists), converting
  "self-consistent" into "field-validated."

**Gate:** the owner's standing quality bar — a serious, polished flagship, not a
quick project. **Depends on:** nothing; this is the trunk.

### Phase 2 — BMX to its mature bar (paused by design)

BuildMyBMX is live and now deliberately paused while MTB takes priority. Its future
rounds — deeper verification within the documented structural ceiling, engine-rule
severity research, possibly its own domain — resume on the owner's ask, not by
default. **Gate:** the owner's word to resume. **Depends on:** Phase 1's priority
call.

### Phase 3 — Road and gravel pages (the BMX playbook, re-run twice)

The proven pipeline: data-model document → validated off-live catalog → catalog
grind → dedicated engine → separate page → adversarial pre-flip audit → the owner's
flip word. Both catalogs and models exist; road's grind is scheduled next. Gravel
ships as its own page (name decided), road likewise (name to be confirmed at
page-ship time). **Gate:** each page flips only on the owner's explicit word, after
its audit. **Depends on:** fleet capacity freed by Phase 1/2 sequencing.

### Phase 4 — E-MTB as the contained separate surface

The one surface built reluctantly, and therefore built with the strictest walls:
its own dataset, schema, validator, and future page; the MTB catalog permanently
e-bike-free (enforced by both validators, forever). Next: a verification round
against heavily walled maker pages, then page build-out. **Gate:** the owner's flip
word; decisions reach him as compact packets, never spec-level detail. **Depends
on:** the road/gravel page pattern (it reuses the same shell).

### Phase 5 — The First Bike Finder (balance bikes as a fit guide)

The design honesty here is the point: kids' balance bikes have almost no
part-to-part compatibility surface, so the product is a **fit and sizing guide** —
inseam to seat height, growth room, weight ratio, and a refuse-to-recommend band
that fires even when it costs a "sale" — not a forced parts builder. The spec is
written and validated against the data; schema upgrades (child-inseam ranges,
standover) and a handful of product decisions are queued. **Gate:** the owner's
open decisions, then his word. **Depends on:** the fitter knowledge base (booting
now).

### Phase 6 — Kit Builder maturity (parallel track)

Live and growing. Remaining: the verification tail, seasonal lifecycle handling
(discontinued gear flagged with evidence, not deleted), and the display decision on
weights — the expert bench's materiality review (weight genuinely matters for
helmets; mostly doesn't elsewhere) feeds a curated UI while the data stays liberal
underneath. **Gate:** display decisions are the owner's taste calls; data work is
continuous. **Depends on:** nothing — runs alongside everything.

### Phase 7 — The community layer

In dependency order:

1. **Builds gallery** (scoped, decision-ready): public pages for user-published
   builds, each carrying the engine's real verdict and real totals — never
   self-reported numbers. The habit loop and the search-engine surface in one.
2. **Reviews and ratings** (designed, staged): 1–5 stars with optional text and
   photos, moderation reusing the forum's human-queue machinery, and a hard
   firewall — ratings never reorder the catalog and never feed the engine. No fake
   "verified purchase" badges: the site processes no transactions, so it will not
   pretend to verify one.
3. **Forum growth**: rich profiles, then the auto-moderator built to the recorded
   philosophy — free speech first; mechanical-abuse guards only; reports go to a
   human queue and mass-reporting can never auto-hide anyone; child safety is the
   one hard automated line.

**Gate:** each piece ships on the owner's word after staging; the security-model
disciplines (owner-scoped rows, server-authoritative moderation flags) are already
established. **Depends on:** the accounts/forum foundation (live).

### Phase 8 — Honest monetization (funds the mission, never bends it)

The model: **affiliate partnerships fund the site and must never bias it.** The
structural guarantees already exist — commercial fields are firewalled from
verdicts, rankings run on MSRP, disclosure pages are live and honest, and the
recurring bias audits are the proof mechanism. The formal signup window opens once
the project's legal footing (a proper legal entity) completes, expected later this
year; until then the site stays application-ready. Beyond affiliates, the endgame
is **direct manufacturer partnerships** for spec data and imagery — with partners
getting exactly zero ranking favor, same as everyone. **Gate:** the owner completes
the legal steps; every network application is his action. **Depends on:** nothing
technical — the site side is done.

### Phase 9 — The images program (permission-first)

Riders genuinely shop with their eyes — colorways and finishes are core product,
not decoration. The build-out is an independent image service with per-image
license provenance (who granted it, when, evidence), automated
replacement of temporary assets with official ones, and a permission-first
acquisition posture: ask the maker, use what's licensed, never strip a watermark,
and audit the whole inventory clean before the affiliate window. **Gate:** the
owner's mode decision (outreach-first is the recommendation on the table), then
per-milestone approval. **Depends on:** Phase 8's partnership channel for the
licensed-feed tier.

### Phase 10 — The marketplace (security-first, or not at all)

The used-parts marketplace ties into the builder ("what does this part sell for
used?") and carries the project's hardest requirement: **scam-secure by design.**
The threat model is already written, headlined by the one decision that removes
most of the risk — the platform never custodies anyone's money (payments flow
through an established marketplace processor; the site is a facilitator, never a
bank). Identity verification, dispute handling, and fraud defense are designed
before code, and the security specialist's knowledge base becomes load-bearing
here. Marketplace ranking and badges inherit the same no-bias law as everything
else. **Gate:** the owner scopes and greenlights it; nothing starts before the
security architecture is accepted. **Depends on:** accounts (live), the community
layer's moderation muscle (Phase 7), and revenue stability (Phase 8).

### Horizon items (real, unscheduled)

The specialist-corpus flywheel keeps compounding — every verified fact makes the
next guide, audit, and rule review cheaper and better. On the far radar, in the
owner's recorded ideas: **BuildMyToolBox** (workshop equipment, the same
separate-page pattern), a rider **sizing guide** built from real frame geometry,
geometry comparison between builds, integrated trail maps, a news feed, and
photo-based part recognition. Ideas, not commitments — each gets scoped on its own
merits when picked up.

---

### Where we are on this map today (2026-07-18)

**Live:** the MTB builder (5,023 parts / 60.5% verified and climbing), BuildMyBMX,
BuildMyKit, accounts + garage, the forum, 42 guides, recall notes, legal pages —
all popup-free, all honest about sample vs. verified data. **Built and gated:**
road, gravel, balance-bike fit guide, contained e-MTB — each awaiting its word.
**Designed on paper:** reviews, builds gallery, marketplace security. **In
motion:** Phase 1 is the active front (verification, completeness, polish, the
coming home page), with the road grind scheduled next and the expert bench at full
professional grade across all three founding boards. **The constant:** every phase
above ships under the same contract the first prototype made — a verdict you can
trust, or silence.
