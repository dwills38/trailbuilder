# FOR-REVIEWERS.md — BuildMyMTB independent-review entry point

_You have been handed this project to double-check it independently — as another engineer or
another model, with no prior context. **Start here.** This document tells you what the project
claims, how to verify every claim yourself from a clean checkout, where every other document
lives and in what order to read them, and what deserves the harshest scrutiny._

Its companions:

- **[`REVIEWER-DOSSIER.md`](REVIEWER-DOSSIER.md)** — the comprehensive, retroactive decision +
  verification history, organized by theme (the engine rule-by-rule, the data model, the catalog
  + verification methodology, the major audits, the architecture decisions, the deferred rules).
  Every claim there cites a commit or a doc you can open.
- **[`PROJECT-LOG.md`](PROJECT-LOG.md)** — the _running_, dated, append-only trail (newest first).
- **Git history** — the ground truth for exact diffs. Commit hashes are cited throughout.

> **Honest-tone contract.** This repo is deliberately honest about what is and isn't proven. Sample
> data is called sample data; "verified" means a real manufacturer source was fetched. This document
> keeps that discipline — where a number or a claim can't be tied to a source, it says so and points
> you at what to check. **Inline counts across the repo's docs drift** (they were written at
> different times); the live gates below are the source of truth, not any number written in prose.

---

## 1. What BuildMyMTB is, and the one contract that matters

BuildMyMTB (repo name `trailbuilder`) is **"PCPartPicker for enduro mountain bikes"**: you pick
parts and it checks, in real time, whether they fit together, plus a running price and weight
total. It is a plain static browser app — `index.html` + `src/`, **no build step, no server** —
that runs entirely from a small built-in catalog. It is live at **buildmymtb.com** (GitHub Pages)
and also open by double-clicking `index.html`.

**The core contract — the whole reason the product exists:**

> **A "compatible" verdict must be _true_.** A false **"fits"** (the engine is silent but the parts
> physically don't go together) and a false **"won't fit"** (the engine flags a build a real mechanic
> would wave through) are the two worst possible failures. **A wrong verdict is worse than a missing
> part or a missing rule — in both directions.**

Everything else — catalog breadth, UI polish, accounts, the forum — is secondary to that contract.
Three honest qualifications a reviewer must keep in mind:

1. **Most catalog specs are _sample data_** — approximate and unverified — **except** the rows
   carrying provenance fields (`verified:true` + `source` + `lastChecked`). See §2.2.
2. **The engine's verdicts are _self-consistent_, not _field-validated_.** The test suite proves the
   rules are internally coherent, deterministic and crash-free; it does **not** prove they are right
   about the real world. The one structured domain review that exists
   ([`EXPERT-REVIEW-DOSSIER.md`](EXPERT-REVIEW-DOSSIER.md)) is a rule-by-rule paper review, not
   large-scale mechanic/rider field testing.
3. The app's all-clear reads **"No conflicts found"**, not "all compatible" — it means _no conflict
   among the dimensions the engine checks_, which is a bounded list (§4), not a guarantee.

---

## 2. How to independently verify everything

### 2.1 The four gates (exact commands + expected output)

Requires [Node.js](https://nodejs.org) 18+. From the repo root, once: `npm install` (pulls the
dev tooling — `vitest`, `typescript`, `@types/node`; `validate.js` and the audit harness themselves
need no dependencies).

| # | Command | What it proves | Expected output |
|---|---------|----------------|-----------------|
| 1 | `node validate.js` | The whole catalog is schema-valid; provenance is real | `DATA OK - N parts, 0 problems (V verified, U unverified).` — **exit 0** |
| 2 | `npx vitest run` (= `npm test`) | Every compatibility rule, dot, price/weight, golden build, id, invariant and negative case passes | `Test Files  15 passed (15)` / `Tests  N passed (N)` — **exit 0** |
| 3 | `npx tsc --noEmit` (= `npm run typecheck`) | The JSDoc-typed source type-checks in full `strict` (no build/emit) | **no output, exit 0** |
| 4 | `node tools/verdict-audit-harness.js` | Adversarial hunt for wrong verdicts across the whole catalog | Five probes A–E (see below) — **exit 0** |

**Live values at the time this document was written** (they will have moved — re-run and trust
the live output, not these): gate 1 = `2016 parts, 0 problems (1480 verified, 536 unverified)`;
gate 2 = `Tests 453 passed (453)`; gate 3 = clean; gate 4 as described below.

**Gate 4 — read the probes, don't just look for "0".** The harness (`tools/verdict-audit-harness.js`,
report-only, zero-dependency) runs five independent probes:

- **A. NAME-vs-FIELD** — does a part's name (brand+model) contradict a verdict-driving field (an
  "AXS" shifter tagged `actuation:'cable'`, a "29" tire tagged `wheel:'275'`)? **Expect `0 flags`.**
- **B. PRESETS** — every curated bundle's own fills must be conflict-free. **Expect `0`.**
- **C. ASSEMBLE** — a sensible complete build per frame; unexpected errors are surfaced for
  inspection. **Expect `0 with errors`** (the "N clean" count is informational).
- **D. ADVERSARIAL** — builds that _must_ clash; a miss here is a false "fits". **Expect
  `11/11 clashes correctly flagged, 0 missed`.**
- **E. ROTOR-MAX** — would a standard front rotor falsely trip rule 10? **This one is _not_ zero:**
  it currently reports **`4 fork families would false-warn on a standard front rotor`**. This is a
  **known, pre-existing, warning-tier** note (rule 10 rotor-max is a _warning_, never an error — it
  cannot produce a false "won't-fit" that blocks a build), documented in the audit trail. It is the
  one non-clean probe; A–D are the correctness-critical ones.

CI (`.github/workflows/ci.yml`) runs gates 1–3 on every push and PR; the GitHub Pages deploy
(`.github/workflows/deploy.yml`) is gated on validate + tests, so a broken build never ships.

### 2.2 How provenance works — telling verified data from sample data

Every part **may** carry three provenance fields; their **absence means "unverified"**, which is
the honest default for most of the catalog:

```js
verified: true,
lastChecked: "2026-06-21",          // YYYY-MM-DD, must not be in the future
source: "https://www.manufacturer.com/the-spec-page"
```

The validator (`src/schema.js`) **enforces that "verified" means something** — you can trust the
flag because malformed provenance fails gate 1:

- `verified:true` **requires** a valid `http(s)` `source` URL and a non-future `lastChecked` date
  (`src/schema.js` L444–L445).
- Optional lifecycle/provenance fields are vocab- and type-checked: `sourceType` ∈
  `[manufacturer, manufacturer-doc, measured, retailer]` (L201, L486–L488); **`verified:true`
  cannot rest on a `retailer` source** (L489); **`sourceType:'measured'` requires a `weightSource`
  URL** (L490); `weightSource`/`archiveUrl` must be `http(s)` (L492–L493); `supersededBy` must
  resolve to a real, non-self part id (L496–L499).

**The verification policy** (the reasoning is in `tools/VERIFY-PROTOCOL.md` and
[`REVIEWER-DOSSIER.md`](REVIEWER-DOSSIER.md)): **only a _fetched_ manufacturer / authoritative page
counts** — search-result snippets and retailer summaries have repeatedly lied (fictitious tire
sizes, wrong shock/rotor specs) and are rejected. A reputable **editorial** measured weight
(teardown by an outlet with no sales interest) is accepted **for the weight only** via
`sourceType:'measured'` + `weightSource` — this unblocks classes the maker doesn't publish (Shimano
publishes no component weights; SRAM publishes no rotor weights). Retailer "we weighed it" claims
are rejected.

**Four ways to tell verified from sample at a glance:**

1. The three fields present on the row in `src/compat.js`.
2. `node validate.js` prints the live `(V verified, U unverified)` split.
3. The **"✓ Verified only"** filter in the app (built on `partVerified`, `src/compat.js` L5097).
4. **`tools/verification-job.json`** — the per-part provenance ledger (status per part); browse it
   with `npm run verify:status`.

---

## 3. Map of every document (and a read order)

| Doc | What it is |
|-----|------------|
| **`FOR-REVIEWERS.md`** | _This file_ — the reviewer entry point. |
| **`REVIEWER-DOSSIER.md`** | The comprehensive retroactive decision + verification history, by theme, with commit/doc cites. |
| **`PROJECT-LOG.md`** | The running, dated, append-only change trail (newest first). Coordinator-maintained. |
| `README.md` | The short "what it is / how to run / how to mark a part verified" intro. |
| `CLAUDE.md` | The technical spine: data model, the 20 rule areas, pricing/weight, provenance, conventions, roadmap. **The most important architecture doc.** |
| `Getting-Started-Roadmap.md` | The original bigger-picture plan (prototype → static site → accounts → prices), written for a non-developer owner. |
| `NEXT-STEPS.md` | A living status snapshot + the full running roadmap history (Phases 0–4). Inline counts drift. |
| `COORDINATOR-HANDOFF.md` | Operational handoff for the multi-session workflow (merge gates, git hygiene, gotchas). Contains some owner/business context outside review scope. |
| `REVIEW.md` | The 2026-07-06 engine correctness audit — 5 Criticals + Majors #6–#9 + a Minors sweep, with a status header tracking each to resolution. |
| `DATA-MODEL-REVIEW.md` | The 2026-07-06 data-model audit — §5.1 is the pre-mass-entry gate (id migration, entry template, semantic fixes, vocab widening). |
| `EXPERT-REVIEW-DOSSIER.md` | The rule-by-rule domain-expert packet: every rule's claim, tier, sources and open questions in mechanic language, each carrying its review verdict inline. |
| `DOSSIER-OPEN-QUESTIONS-RESEARCH.md` | The research pass answering the dossier's open questions (a mechanic cross-check sheet). |
| `tools/VERIFY-PROTOCOL.md` | The verification _logic_ — the bar, the per-part loop, batching, the skip policy. Read before judging any "verified" claim. |
| `tools/DATA-ENTRY-TEMPLATE.md` | The data-entry _judgment_ layer — id recipe, variant-token order, flat-SKU split, weight-basis conventions. |
| `tools/DRIFT-TRIAGE-2026-07-08.md`, `-2026-07-09.md`, `-run2.md` | Triage of the drift-checker's findings (re-fetching verified sources to catch spec/price drift). |
| `tools/DUP-ID-AUDIT-2026-07-09.md` | The duplicate-id audit. |
| `tools/VERDICT-AUDIT-2026-07-09.md`, `-2-2026-07-09.md` | Write-ups of the verdict-audit harness's findings (false-fit / false-won't-fit hunts). |
| `tools/BREADTH-GAP.md` | The catalog breadth-gap analysis (most brands are single-SKU). |
| `tools/MECHANIC-FINDINGS-INTAKE.md` | Intake sheet for real mechanic findings. |
| `supabase/SETUP.md`, `schema.sql`, `forum-profiles.sql` | The accounts + forum backend (owner-scoped RLS); off by default, feature-gated in the app. |

**Suggested read order for a reviewer:**
1. `FOR-REVIEWERS.md` (here) → 2. `README.md` → 3. `CLAUDE.md` (the spine) →
4. `REVIEWER-DOSSIER.md` (the retroactive history) → 5. drill into the evidence you want to
challenge: `EXPERT-REVIEW-DOSSIER.md` (rules), `REVIEW.md` (engine audit),
`DATA-MODEL-REVIEW.md` (data model), then the `tools/*AUDIT*/*TRIAGE*` write-ups →
6. **the code**: `src/compat.js` (catalog + engine), `src/schema.js` (validator), `test/`.

---

## 4. What to scrutinize hardest

**(a) The error-tier compatibility rules.** These are the ones that can produce a wrong verdict.
`checkBuild` lives in `src/compat.js` (L4335–L4723); each rule is a commented block. The rules that
can emit an **error** (i.e. "won't fit") — verify each against the code and against
`test/test-engine.js`:

- `wheel-config` (incl. the frameless reverse-mullet guard) · `front-axle` / `rear-axle` ·
  `drivetrain-system` (with the 3a AXS-controller exemption) / `drivetrain-speeds` · `actuation` ·
  `chainring-standard` (T-Type) · `udh` · `cassette-capacity` · `freehub` / `freehub-integrated` ·
  `bb-shell` / `bb-spindle` · `front`/`rear-brake-mount` · rotor `*-interface` (the Center-Lock
  direction) and `*-rotor-min` (10 / 10b) · `steerer` · `fork-travel` (sourced-range) /
  `fork-travel-min` · `dropper-diameter` · `bar-stem-clamp` · shock `hardtail-shock` / `shock-size`
  / `shock-stroke-over` / `shock-mount` · `oem-shock` · headset `headset-steerer` / `headset-upper`
  / `headset-lower`.

**(b) Direction-aware asymmetries.** Several rules are deliberately one-directional — verify _both_
directions behave correctly, because getting the asymmetry backwards is a subtle false verdict:
6-bolt-rotor-on-Center-Lock-hub (warning + adapter `fix`) vs the reverse (error); dropper smaller
(shim warning) vs bigger (error); shock stroke shorter (warning) vs longer (error); fork travel
under vs over a maker-published range.

**(c) The dormant / data-dependent rules.** Many rules only fire when a part carries _sourced_ data,
and stay silent otherwise (a missing rule is preferred over a wrong one). When one _does_ fire,
**scrutinize the data behind the activation, not just the rule logic**: `frame.maxTire` (rule 18),
`frame.minForkTravel`/`designForkTravel` (12b/12c), `fork.minRotorF` / `frame.minRotorR` (10/10b),
`fork.maxTire` (14b), `rim/wheel.minTire` (14c), `frame.coilApproved` (16b), `frame.headTubeUpper`/
`headTubeLower` (20b), shifter `clampType` + brake `leverAccepts` (19). Confirm each activating
value traces to a fetched manufacturer source.

**(d) Unverified catalog rows.** ~536 of ~2016 parts are **sample data** at the time of writing —
their specs, prices and weights are illustrative and must **not** be trusted as real. Only the
verified set (provenance fields present) has been checked against a source. Do not review the sample
rows as if they were facts; review that the _engine_ treats them correctly.

**(e) The one guard against a silent false-green.** `resolveBuild` (`src/compat.js` L4287–L4301)
throws if a build passes an _id string_ where a part object is expected — because every field read
on a string is `undefined`, which used to yield `0 errors / 0 warnings` (a silent all-clear, the
one verdict this product must never give). Confirm this guard and its regression test
(`test/test-invariants.js`).

---

## 5. Known limitations + open questions

- **Verdicts are self-consistent, not field-validated.** No third-party engineer sign-off, limited
  real-rider testing. The `EXPERT-REVIEW-DOSSIER.md` review is domain-informed but is a paper review.
- **Gate 4 probe E**: 4 fork families would false-_warn_ on a standard front rotor (warning tier,
  pre-existing, documented) — not a correctness (error-tier) failure, but a real known imperfection.
- **The one-native-axle model.** A frame/wheel is modeled with a single native axle standard, so a
  build that is only compatible _via a maker conversion kit_ (e.g. the Commencal Supreme DH V5's
  157→150 kit) reads as an axle error. This is a documented modeling limitation, not a real
  incompatibility — see the row's `desc` and `REVIEWER-DOSSIER.md`.
- **Deliberately deferred / rejected rules** (reasoning in `CLAUDE.md` "Coverage roadmap" + `REVIEW.md`):
  crankset chainline Boost/SuperBoost (**rejected** — a naive rule would false-error common builds);
  real dropper insertion-depth vs frame size (**deferred** — needs a frame-size concept in the app);
  tire-vs-internal-rim-width (thresholds too fuzzy without sourcing).
- **Catalog breadth gap** — most brands have only one SKU cataloged, so picking a frame can narrow
  real choice to 1–2 brands (`tools/BREADTH-GAP.md`). A completeness limitation, not a correctness one.
- **The verification tail is partly a tooling wall**, not just unfinished work: many manufacturer
  domains are 403/JS/password-walled to automated fetching (`tools/VERIFY-PROTOCOL.md` + the source
  map), so some parts are `Skipped` with a documented reason rather than verifiable.
- **Counts in prose drift.** Trust the gates, `node validate.js`, and `tools/verification-job.json`.

---

## 6. How the change trail works

- **Git history is the ground truth.** Commit hashes are cited throughout `REVIEWER-DOSSIER.md`;
  open any with `git show <hash>` or browse with `git log --oneline`.
- **`PROJECT-LOG.md`** is the _running_ trail — one dated entry per wave/decision, newest first,
  each with _what · why · how-verified · refs · what-to-double-check_.
- **`REVIEWER-DOSSIER.md`** is the _retroactive_ companion — the same history reorganized by theme
  so you can review a subsystem end-to-end (the engine, the data model, the catalog, the audits, the
  architecture) rather than commit-by-commit.
- **The audit docs** (`REVIEW.md`, `DATA-MODEL-REVIEW.md`, `EXPERT-REVIEW-DOSSIER.md`,
  `DOSSIER-OPEN-QUESTIONS-RESEARCH.md`, and the `tools/*AUDIT*`/`*TRIAGE*` write-ups) are the primary
  evidence a reviewer re-checks; each is dated and tracks its findings to resolution.

To re-derive any decision: find it in `REVIEWER-DOSSIER.md`, open the cited commit(s) with
`git show`, open the cited audit doc, and re-run the four gates to confirm the current state.
