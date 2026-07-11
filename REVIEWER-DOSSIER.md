# REVIEWER-DOSSIER.md — BuildMyMTB retroactive decision & verification history

_The comprehensive companion to [`FOR-REVIEWERS.md`](FOR-REVIEWERS.md). Where that document is the
entry point ("what to check and how"), this one is the **history** ("what was decided, why, how it
was verified, and which commit proves it"), reorganized **by theme** so you can review a subsystem
end-to-end instead of commit-by-commit._

**How this was built & how to trust it.** This dossier was reconstructed read-only from the repo at
`origin/main` tip `75e0304` (2026-07-11) — from the full git history, the in-repo audit documents
(`REVIEW.md`, `DATA-MODEL-REVIEW.md`, `EXPERT-REVIEW-DOSSIER.md`, `DOSSIER-OPEN-QUESTIONS-RESEARCH.md`,
`tools/*AUDIT*`/`*TRIAGE*`), `tools/verification-job.json`, and the source (`src/compat.js`,
`src/schema.js`, `src/types.js`, `test/`). Every commit hash cited below was confirmed against
`git show`. **It is a reconstruction, not a fresh audit** — where a claim couldn't be tied to a
commit or a doc, it is flagged in §8 ("UNVERIFIED — reviewer should check") rather than asserted.
Counts drift (the project says so itself); the live gates in `FOR-REVIEWERS.md` §2.1 are the truth.
Scope is **technical only** — business/operational material is deliberately excluded.

**Contents:** §1 Timeline & phases · §2 The compatibility engine, rule by rule · §3 Data model &
schema evolution · §4 Catalog build-out, verification & provenance · §5 The major audits · §6 Key
architecture decisions · §7 Deliberately deferred / rejected rules · §8 Consolidated
"reviewer should check" list.

---

## 1. Timeline & phase map

First commit `f51bc7a` (2026-06-22) → tip `75e0304` (2026-07-11): ~791 commits on `origin/main`
over 19 bursty days. The phases are **overlapping threads, not a strict sequence** — e.g. the
"Phase 0.5" data-model gate is numbered to sit between Phase 0 and 1 but chronologically lands on
07-06/07-07, after Phase 1 UI work and several Phase 2 catalog rounds had already shipped.

| Phase | What | Defining commits (verified) | Rough dates |
|---|---|---|---|
| **0 — ship the beta** | Prototype, tests, typecheck, CI, deploy workflow, fuzz fortress, bug-report button | `f51bc7a` (init + `src/`+`test/` reorg) · `d7025e8` (JSDoc typecheck) · `91aeec0` (full-strict union types) · `7f8c32a` (GitHub Actions CI) · `5821770` (Vitest) · `17e7549` (Pages deploy workflow) · `21e69d4` (invariants/fuzz) · `0839383` (report-a-verdict) | 2026-06-22 → 06-30 |
| **1 — quick wins on the static app** | Sub-category chips, sort menu, verified-only filter, sample builds, detail modal, dark mode, RAD mode | threaded through the catalog work (no single anchor) | 2026-06-27 → 07-05 |
| **0.5 — pre-mass-entry data-model gate** | The 7 `DATA-MODEL-REVIEW §5.1` gates + REVIEW.md fixes | `15832ac`→`c395829` (gates) interleaved with `53863a8`→`ba4005e` (REVIEW.md) | 2026-07-06 18:43 → 07-07 11:09 |
| **2 — richer catalog + data pipeline** | The verification job, the 8-pass discipline expansion, the `expansion-r3` lanes, BB + headset categories, rule 6b | `488b069` (verify-job) · `1a98da4`→`14c74c0` (disciplines 1–8) · `37d193e` (BB) · `af99f54`/`50dd543` (headset) · `12f0b9f`/`2d9fc65` (rule 6b) | 2026-07-01 → ongoing |
| **3 — accounts (Supabase)** | Vendored client, config, owner-scoped RLS; shipped inert then flipped live | `b63caf8` (data layer) → `1f37103` (merged inert) → `670efb9` (GO-LIVE) | 2026-07-08 |
| **4 — in-app forum** | GH-Discussions link → built-in forum (inert) → live → category taxonomy → email/password auth | `c2ef4d2` → `fae7729` (inert) → `36e4982` (live) → `3059960`/`390dba7` (12→18 categories) → `c59ca25` (auth) | 2026-07-08 → 07-11 |

Later milestones: domain cutover to **buildmymtb.com** (`2ac8199`, 2026-07-11) + rebrand
TrailBuilder→BuildMyMTB (`dca108b`); legal pages + FTC affiliate disclosure shipped live
(`8be0f33`, 2026-07-11); the running audit trail `PROJECT-LOG.md` started (`75e0304`).

> **Reviewer note (from the git-history reconstruction):** "git init" and the `src/`+`test/` reorg
> are the **same** commit (`f51bc7a`) — the prototype existed pre-repo, so there is no earlier commit
> showing the flat layout. And the deploy _workflow_ landed 2026-06-27 (`17e7549`) but git alone
> can't confirm the exact date the app first served public traffic on the `github.io` URL — the
> custom domain didn't go live until 2026-07-11. Treat both as noted, not as precise "first-live" dates.

---

## 2. The compatibility engine, rule by rule

The engine is `checkBuild(build)` in `src/compat.js` (L4335–L4723). It takes a map of slotKey→part
object and returns `{errors, warnings, infos}`. There are **20 rule areas**; because several split
into sub-rules (6b, 10b, 12b/12c, 14b/14c, 20a/b/c, …), the engine emits **52 distinct `ruleId`
strings** (grep of every `err(`/`warn(`/`info(` call site). `GROUPS`/`SLOTS`/`slotRequired`
(L93–167) drive build *completeness* and never feed a verdict.

### 2.1 Verdict tiers & the structured-verdict mechanism

Findings are `Verdict` objects — `function Verdict(ruleId, slots, msg, fix)` (L4273), with
`toString()` returning `msg` (L4274) so any UI/report code that interpolates a verdict "just works".
- **errors** = won't fit · **warnings** = works but check · **infos** = notes.
- Conflict identity for the pick-dots is **`verdictKey` = `ruleId+'|'+slots.join('+')+'|'+msg`**
  (L4276), **never raw message text**. This exists because two *different* conflicts can raise
  byte-identical strings — precisely the `REVIEW.md` **#4** (preset-dot false-green) and **#13**
  (cross-slot string-dedup masking) defects. Pinned by `test/test-verdict-identity.js` and, fuzzed
  whole-catalog, by `test/test-invariants.js` ("a green/yellow dot never hides a newly-introduced
  error", which diffs by `verdictKey`).
- **`fix`** is the structured "fits with adapter X" tier — `{kind, name}`, engine-side pair data,
  never a part field. It appears at exactly **3 call sites**: rule 9's two rotor-interface warnings
  (`{kind:'adapter', name:'Shimano SM-RTAD05'}`, L4487/L4493 — its **first/origin use**) and rule 4's
  UDH-retrofit warning (`{kind:'adapter', name:frame.udhRetrofitKit}`, L4441).

### 2.2 The 4-state pick dot (`compatOf`, L4763)

`compatOf(part, build)` returns a state used by the UI dots: **`n`/grey** (nothing picked yet) ·
**`g`/green** (adds no new error or warning) · **`w`/yellow** (fits, but adds a new *warning* — the
warning is the hover reason; this is the `REVIEW.md` **#6** fix, so a warning-tripping part no longer
looks identical to a perfect fit) · **`r`/red** (adds a new error). Two code paths, both diffing by
`verdictKey`: the preset/bundle path clears the slots the preset fills *before* computing the
baseline (the `REVIEW.md` #4 fix, L4766–4791), and the single-part path (`placementDiff`/
`conflictReason`, L4740–4761) tries every slot a part's category can fill and returns its **best**
placement (green if any slot is clean; a warning-only placement outranks an error-everywhere one).

> Wording nuance a reviewer should not conflate: `compatOf`'s own clean-state reason string is
> `"No conflicts with your current build"` (component level, `compat.js`); the app-level all-clear
> **"No conflicts found"** lives in `index.html`. Both carry the same "not a guarantee, only the
> dimensions we check" caveat, but they are two different strings in two different files.

### 2.3 A guard worth knowing: no silent false-green

`resolveBuild` (L4287–L4301) **throws** if a build passes an id *string* where a part *object* is
expected. Every field read on a string is `undefined`, which used to yield `0 errors / 0 warnings` —
a silent all-clear, the one verdict this product must never give (regression pinned in
`test/test-invariants.js`). Strings that match a catalog id resolve through `canonicalId()`+`byId()`
(the same forgiving path as share links); a string matching nothing throws rather than silently pass.
`effectiveWheel` (L4311–L4322) is the single pivot that lets every wheel rule read one local whether
the user picked a complete wheel or a hub+rim pair (build-your-own-wheel).

### 2.4 Rule inventory

Tier: **E**=error, **W**=warning, **I**=info. Lines are `src/compat.js`. "Live" = fires today;
"dormant" = correct and tested but only fires once a part carries the named sourced field (a missing
rule is preferred over a wrong one). Every rule's manufacturer/source basis is recorded rule-by-rule
in `EXPERT-REVIEW-DOSSIER.md`.

| Rule (ruleId · lines) | Checks | Tier | Direction-aware | Live/dormant | Tests |
|---|---|---|---|---|---|
| **1** wheel config (`wheel-config`,`front/rear-wheel-size` · 4351–4377) | front group + rear group each one size; combo ∈ frame `wheelConfigs`; frameless reverse-mullet guard | E | mullet (29F/27.5R) allowed, reverse-mullet rejected | live | `test-engine`, `test-verdict-identity`, `test-verdict-audit` |
| **2** axles (`front-axle`,`rear-axle` · 4379–4381) | fork.axle↔front hub; frame.rearAxle↔rear hub | E | no | live (rear real; front — see §8-1) | `test-engine`, `test-verdict-audit` |
| **3a** drivetrain system/speed (`drivetrain-system`,`-speeds` · 4383–4409) | one `system` + one `speeds`; SRAM AXS electronic-controller exemption (all AXS controllers drive all AXS mechs), not crossing to non-SRAM | E | exemption asymmetric to non-SRAM | live | `test-engine`, `test-verdict-audit` |
| **3b** actuation (`actuation` · 4410–4416) | shifter.actuation↔derailleur.actuation (cable vs AXS) | E | no | live | `test-engine`, `test-verdict-audit` |
| **3c** chainring standard (`chainring-standard` · 4417–4428) | T-Type chain vs `crankset.ringStd`; `ringStd:null` → info | E+I | **one-directional** (T-Type ring+Eagle chain silent) | live | `test-engine` |
| **4** Transmission needs UDH (`udh` · 4430–4444) | UDH-direct mech needs `frame.udh`; `udhRetrofitKit` → warning+`fix`; frameless → info | E/W/I | 3-way by frame state | live | `test-engine`, `test-verdict-audit` |
| **5** cassette vs derailleur capacity (`cassette-capacity` · 4446–4447) | `cassette.maxCog > derailleur.maxCog` | E | **one-sided** (big mech + small cassette silent) | live | `test-engine`, `test-verdict-audit` |
| **6** freehub (`freehub` · 4459) | cassette.freehub↔wheel.freehub (XD/MicroSpline/HG) | E | no | live | `test-engine`, `test-verdict-audit` |
| **6b** integrated cassette (`freehub-integrated` · 4449–4461) | `freehub:'integrated'` (LG1r DH) → any cassette hard-errors; none → info; slot exempt from completeness | E+I | n/a | live | `test-engine`, `test-greying` |
| **7** bottom bracket (`bb-shell`,`bb-spindle`,`bb-advisory` · 4463–4473) | bb.shell↔frame.bb, bb.spindle↔crank.bb (exact); none picked → advisory info | E×2+I | no | live | `test-engine` |
| **8** brake mounts (`front/rear-brake-mount` · 4475–4477) | brake.mount↔fork/frame.brakeMount | E | no | live (front real+tested; see §8-1) | `test-engine`, `test-verdict-audit` |
| **9** rotor interface (`front/rear-rotor-interface` · 4479–4496) | rotor.mount↔hub.rotorMount | E/W(`fix`) | **CL-rotor-on-6-bolt = error; 6-bolt-on-CL = warning + SM-RTAD05 adapter** | live | `test-engine`, `test-greying`, `test-verdict-identity`, `test-verdict-audit` |
| **10** rotor size max (`front/rear-rotor-max` · 4504–4505) | rotor.size > fork.maxRotorF / frame.maxRotorR | W | over-half of the pair | live | `test-greying`, `test-verdict-identity` |
| **10** fork rotor min (`front-rotor-min` · 4506–4507) | rotor.size < `fork.minRotorF` (native mount; adapters only space up) | E | under-half | dormant→live (ZEB/Domain) | `test-engine`, `test-verdict-audit` |
| **10b** frame rotor min (`rear-rotor-min` · 4508–4515) | rotor.size < `frame.minRotorR` | E | under-half | dormant→live (Cotic Solaris) | `test-engine` |
| **11** steerer/headset (`steerer` · 4517–4518) | fork.steerer↔frame.headset | E | no | live (real DH forks exist; error-case test synthetic — §8-1) | `test-engine`, `test-golden` |
| **12** fork travel max (`fork-travel` · 4520–4538) | fork.travel > frame.maxForkTravel | E (sourced range) / W (no range) | over-half | live | `test-engine` (issue #2 regression) |
| **12b** approved minimum (`fork-travel-min` · 4539–4545) | fork.travel < `frame.minForkTravel` | E | under-half | dormant→live | `test-engine` |
| **12c** design-travel grace (`fork-travel-design` · 4546–4559) | `designForkTravel − travel > 20`, suppressed if 12b fired | W | under-only | dormant | `test-engine` |
| **13** dropper diameter (`dropper-diameter`,`dropper-shim` · 4566–4571) | dropper.diameter vs frame.seatTube | E (bigger) / W (smaller = shim) | **yes** | live | `test-engine`, `test-greying` |
| **13b** insertion nudge (`dropper-insertion` · 4572–4579) | `drop ≥ 180` → info only (no frame-size concept yet) | I | n/a | live (info) | `test-engine` |
| **14** tire vs wheel max (`front/rear-tire-rim` · 4581–4583) | tire.width > wheel.maxTire | W | over-half | live | `test-engine` |
| **14c** too-narrow tire (`front/rear-tire-rim-min` · 4584–4593) | tire.width < `wheel.minTire` | W | under-half | dormant (maker minima only) | `test-engine` |
| **14b** tire vs fork chassis (`front-tire-fork` · 4594–4598) | fTire.width > `fork.maxTire` | W | no | dormant | `test-engine` |
| **15** bar/stem clamp (`bar-stem-clamp` · 4601) | bar.clamp↔stem.clamp | E | no | live | `test-engine` |
| **16** rear shock fit (`hardtail-shock`,`shock-size`,`shock-stroke-over`,`shock-stroke-short`,`shock-mount` · 4603–4630) | hardtail guard; eye (exact); stroke; mount (exact) | E / W (shorter stroke) | **stroke: longer=error, shorter=warning** | live | `test-engine`, `test-greying`, `test-verdict-identity` |
| **16b** coil approval (`coil-approval` · 4631–4636) | `frame.coilApproved===false` + coil shock | W | n/a | dormant | `test-engine` |
| **17** frame+shock bundling / OEM (`bundled-shock`,`package-only`,`oem-shock` · 4640–4660) | bundledShock match; oemOnly wrong-frame=error, frameless=info | I/W/E | frameless-vs-wrong-frame asymmetry | live | `test-engine`, `test-greying`, `test-verdict-identity` |
| **18** rear tire vs frame (`rear-tire-frame` · 4662–4668) | rTire.width > `frame.maxTire` | W | no | live (~8–10 frames) | `test-engine` |
| **19** shifter clamp vs lever (`shifter-mount` · 4670–4692) | lever-integrated clampType vs brake `leverAccepts` | W | no | dormant | `test-engine` |
| **20a** headset steerer (`headset-steerer` · 4709–4710) | hset.steerer↔fork.steerer | E | no | live | `test-engine`, `test-greying` |
| **20b** headset cup vs head tube (`headset-upper`,`-lower` · 4711–4714) | `shisBore(hset)`↔`shisBore(frame.headTube*)` — **bore token only** | E | no | dormant→live (~51 frames) | `test-engine`, `test-greying` |
| **20c** headset advisory (`headset-advisory` · 4715–4720) | frame+fork, no headset → info nudge | I | n/a | live | `test-engine` |

The engine's self-consistency (crash-free, deterministic, dot-honest) is guarded by
`test/test-invariants.js` (a ~300-build fuzz fortress, `21e69d4`). **These tests prove the rules are
internally coherent, not that they are right about the real world** — that is what the audits in §5
and the domain review (`EXPERT-REVIEW-DOSSIER.md`) address, and what still needs field validation.

---

## 3. Data model & schema evolution

`src/schema.js` is the **single source of truth** for "valid data" (`SCHEMA` + `VOCAB` +
`KNOWN_VALUES` + the validator); `src/types.js` mirrors it as JSDoc types; the tests delegate to it.
Every part is `id, cat, brand, model, price` (USD MSRP, sample) + usually `weight` + category-specific
fields. The big pre-mass-entry evolution landed as the **seven `DATA-MODEL-REVIEW §5.1` "Gate"
commits** (all 2026-07-06/07, verified):

| Gate | Commit | Content |
|---|---|---|
| 1 | `15832ac` | Brand-qualified **append-only ids** + `ALIASES` + verify-job **tombstoning** |
| 2 | `dd86d49` | Flat-SKU kit (`family`/`gen`/`modelYear`/`mfgPn`) + `tools/DATA-ENTRY-TEMPLATE.md` |
| 3 | `570a3c4` | `disciplines` tag (filter-only, **never feeds checkBuild**) + `suspension` discriminator (cross-rule: shock block required for full, forbidden for hardtail) |
| 4 | `666cc28` | Semantic fixes: `crankBb`=spindle interface (killed 2 fictitious cranks); nullable `ringStd` (killed a live eeWings false-red); numeric `minCog`/`chainline`; `leverAccepts`/`forFrames` arrays |
| 5 | `ede27a3` | Vocab widening + `KNOWN_VALUES`/sibling/wheelset lints + **derived kit weights** (preset weight is a validator error to store — fixes `REVIEW.md` #12) |
| 6 | `3003d76` | **Provenance policy** + lifecycle (`sourceType`/`weightSource`/`status`/`supersededBy`/`soldWithout`) |
| 7 | `c395829` | **Structured verdict objects** replace string identity (§2.1) |

Key decisions in detail:
- **Append-only, brand-qualified ids** (`<prefix>-<brand>-<model…>[-gen][-variants]`, enforced by
  `ID_RE`/`ID_PREFIX` + validator, `schema.js` ~L354–428). Ids are load-bearing in four places
  (share-link hashes, `verification-job.json`, catalog cross-refs, hardcoded test/demo ids), so the
  migration was done pre-deploy in the one window it was cheap; corrections retire an id into
  `ALIASES` (`compat.js` L~3844) resolved via `canonicalId()` (L4210); the verify-job **tombstones**
  departed ids rather than deleting their state.
- **Flat-SKU kit** — real SKUs are matrices (e.g. dozens of shock eye×stroke×mount combos); `family`
  groups them, `gen`/`mfgPn` pin them where sourced. Frames use a per-size `sizes` sub-object
  (`{seatTubeLen?, maxInsert?}`) rather than a row per size.
- **`disciplines` (xc/trail/enduro/dh)** is annotation/filter only and is validated to never reach
  the engine; **`suspension`** is a required, cross-rule-enforced discriminator, mirrored in
  `types.js` as `FullSusFramePart | HardtailFramePart`.
- **Categories added over time:** the **BB** category (`37d193e`, 2026-07-10 — real shell/spindle
  parts, from the dossier rule-7 finding), the **headset** category (`3abbf77`/`af99f54`, 2026-07-10
  — S.H.I.S. codes, rule 20), and **`freehub:'integrated'`** (`2c7e52f`, 2026-07-10 — the LG1r DH
  built-in cassette, forbidden on cassette rows by a cross-rule). Vocab members earlier classified
  "LATER" (DH axles `20x110`/`-nonboost`, `straight-dc` steerer, `150x12`, `sram-dh-7`, budget
  microSHIFT/Box systems) were built out across the discipline-expansion waves.

---

## 4. Catalog build-out, verification & provenance

**The state of the data is honest by design:** most rows are **sample data** (approximate,
unverified); only rows carrying provenance fields are verified against a fetched source. Live at
tip: `node validate.js` → **2016 parts, 0 problems (1480 verified, 536 unverified)**.

### 4.1 The bar & the per-part loop
Verification logic lives in `tools/VERIFY-PROTOCOL.md`. **A row may be `verified:true` only when a
_fetched manufacturer / authoritative page_ (in-session) confirms every interface field** —
"interfaces are ALWAYS manufacturer-sourced, no exceptions." The grind is a **resumable checkpointed
job** (`tools/verify-job.js` + `tools/verification-job.json`): `start`→fetch→edit→gate
(`validate.js`, `npm test` if engine-relevant)→`complete Verified|Failed|Skipped`, with atomic
writes so an interrupt loses at most one in-flight part. **Every `Skipped` carries a documented
reason** (a policy, not a failure). The process is designed to **catch fabrication**: the ledger
records refusals to invent specs for probably-nonexistent SKUs (e.g. a Galfer 220 mm 6-bolt rotor, a
Manitou Mezzer 180 that doesn't exist in that generation), and the schema history notes two
nonexistent cranks that a too-narrow vocab had once forced into being (now real parts, Gate 4).

### 4.2 Provenance model & validator enforcement
Fields (all optional; **absence = unverified**), declared in `schema.js` `COMMON` (L343–346) and
enforced in `validatePart`:
- `verified:true` **requires** a valid `http(s)` `source` **and** a non-future `lastChecked` date
  (L442–445).
- `sourceType` ∈ `[manufacturer, manufacturer-doc, measured, retailer]` (L201); **`verified:true`
  cannot rest on `retailer`** (L489); **`sourceType:'measured'` requires a `weightSource` URL**
  (L490). `weightSource`/`archiveUrl` must be URLs (L492–493); `status`∈`[current,discontinued,
  recalled]`; `supersededBy` must resolve to a real, non-self id (L494–500).
- Negative-tested in `test/test-schema.js` (verified-without-source, future date, bogus URL,
  retailer-on-verified, measured-without-weightSource all rejected; good provenance passes).

**The measured-weight exception & why it exists:** decided 2026-07 (`DATA-MODEL-REVIEW.md` §5.1-13,
Gate 6 `3003d76`). Manufacturers don't always publish component weights — **Shimano publishes none;
SRAM publishes none for rotors / DH group / some AXS pods** (and `bike.shimano.com` is additionally
fetch-walled). So a reputable **editorial measured** weight (a teardown by an outlet with no sales
interest — Bikerumor/BikeRadar/MBR, not a retailer) is accepted **for the weight only** via
`sourceType:'measured'` + `weightSource`; interfaces stay manufacturer-sourced; retailer "we weighed
it" is rejected. In practice a couple dozen rows use this exception (e.g. DT Swiss/Chris King hubs →
noblwheels teardown; several SRAM derailleurs → bikerumor).

### 4.3 Telling verified from sample (four ways)
1. The three fields on the row. 2. `node validate.js`'s `(V verified, U unverified)` line.
3. The **"✓ Verified only"** UI filter (`partVerified`, `compat.js` L5097). 4. The ledger
`tools/verification-job.json` (`npm run verify:status`). **Ledger vs live drift is expected and
self-healing:** the committed ledger snapshot (Verified 1472 / Skipped 134 / Pending 264, non-preset
universe; presets excluded because they derive verified-ness from their fills) lags the live catalog
by a few rows after post-snapshot commits; `verify-job.js` re-syncs (auto-promotes anything already
`verified:true`) on the next run.

### 4.4 Brand fetchability map
Fetch-fine: `sram.com`/`rockshox` model pages, canecreek, chrisking, commencal, canyon, RAAW,
transition, ibis, santacruz support pages, privateer, cotic, scott-sports, knolly, evil,
rockymountain, devinci, GT, nicolai, spank (non-www), hopetech PDFs, kmc, galfer/hayes/magura/TRP/
trickstuff. Walled (403 / JS-shell / password / DNS): specialized, trek+bontrager, norco, pivot,
giant, propain, orbea, michelin, dtswiss configurator, industry-nine, we-are-one, newmen,
`bike.shimano.com`, FSA, Acros. A distinct failure mode is "**fetches, but publishes only a wheelset
total or a complete-bike weight**" (reserve/raceface/hopetech wheels; canyon/santacruz/scott/yt
frames) — which is why many frames end `Skipped` for weight while their interfaces are verified.
**Search-result snippets and retailer summaries repeatedly lied** (fictitious tire sizes, wrong
shock/rotor specs) — only a fetched maker page counts.

### 4.5 Verified coverage (live, per category — expect drift)
The verified set is broad but uneven. Strong: **headset 23/23; shock 107/108; dropper 242/250; the
tire category** (185/214 across 14 brands); **fork 166/211; frame 106/141** (33 brands). Thinner (a
tooling-wall artifact, not neglect): **frontwheel 20/55; rearwheel 64/134; shifter 10/23; rim 10/15**
— these lean on domains that are walled or publish only wheelset totals. The catalog grew through an
8-pass **discipline expansion** (`1a98da4`→`14c74c0`, all 2026-07-08 — DH/Trail/XC frames, forks,
tires, kit pricing, goldens) and the **`expansion-r3`** multi-lane wave, each lane **adversarially
audited before merge** (drivetrain `20baaf3` 12/12; pedals `ff7351e` 14/14; headsets `06816de` 11/11;
front-wheels/hubs `02f143f` 16/16; tires `99672d0` 39/40 **+1 honest demotion**; etc.) — a good
example of the merge discipline (error-tier data gets an independent adversarial pass first).

---

## 5. The major audits (what was found, how it was resolved)

| Audit (doc · added) | Scope | Top findings | Resolution | Status |
|---|---|---|---|---|
| **Engine correctness** (`REVIEW.md` · `53863a8`, 2026-07-06) | rules 1–18 + helpers + verdict wording; 6 auditors, 54→29 findings | **5 Criticals** (false greens: mech+AXS silent, T-Type ring silent, no min-rotor, preset false-green, shifter/lever clamp) · **4 Majors** (#6 dots ignore warnings; #7 SRAM-mullet trap; #8 shorter-stroke shock false-red; #9 shimmable dropper false-red) · Minors #10–25 · **1 refuted** (52T-mech vs 10-50, kept on file so it's never re-added) | Criticals same day (`cb97a6b`…`ae78741`); Majors `f11fe3b`…`0503b92` (branch `review-majors-6-9`); Minors sweep to `f0319c5`; **retired `ba4005e`** | **RESOLVED** (2 deliberate deferrals: real insertion-depth, BB — both since addressed) |
| **Data model** (`DATA-MODEL-REVIEW.md` · `3882312`, 2026-07-06) | schema, catalog structure, provenance, entry workflow; 10 auditors, 119 claims fact-checked, **16 refuted** (Appendix B) | 15 prioritized changes (the §5.1 gate); §8 = 12 catalog data errors surfaced but **not applied by the review** | The 7 Gate commits (§3); §5.1-19 BB landed later (`37d193e`) | **RESOLVED** (§5.1 gate); "LATER" categories partly since built; **§8 fixes = §8-3 flag** |
| **Domain-expert dossier** (`EXPERT-REVIEW-DOSSIER.md` · `f4e2daf`, 2026-07-07) | every rule's claim/tier/source in mechanic language, for a human review | Rule-by-rule verdicts recorded inline (2026-07-10): 11 confirmed as-is; refinements to rules 3a/4/7/10b/12/13/14c/16 | Applied as the "Dossier rule N" commit wave (2026-07-10) | **RESOLVED** (verdicts "received via the project owner" — see §8-2) |
| **Dossier open-questions research** (`DOSSIER-OPEN-QUESTIONS-RESEARCH.md` · `efb1424`, 2026-07-10) | research the dossier's open questions vs fetched primary docs | 23 items: **14 confirmed / 7 partial / 2 unsourceable / 0 verdicts refuted** | Fed the dossier verdict wave | **RESOLVED** (research pass) |
| **Drift triage ×3** (`tools/DRIFT-TRIAGE-*` · `dd68ed9`/`8bbfb5e`/run-2) | re-fetch every verified source, check price/weight still on page | Run 1: 14 changed → **4 real price drifts** fixed + matcher hardened (8 false-positive patterns). Run 2 (695 parts): **0 real drift**. run-2 validates the hardening | Real drifts fixed (`0249918`); matcher hardened (`3a55df5`/`5649e61`) | **RESOLVED**; 3 housekeeping items OPEN-BACKLOG |
| **Duplicate-id audit** (`tools/DUP-ID-AUDIT-2026-07-09.md`) | duplicates, id-convention, broken refs (392 preset + 130 golden + 118 demo + 356 alias refs) | **0** on every dimension (harness self-tested to prove the detectors fire); 2 INFO-only (fit-identical distinct products; an undocumented compound token) | none needed | **RESOLVED (clean)** |
| **Verdict audits ×2** (`tools/VERDICT-AUDIT-*` · 2026-07-09) | false-fit/false-won't-fit hunt across the catalog (5–6 probes) | Pass 1 **#1: real defect** — 19 fork rows had `maxRotorF` = native mount (false-warned the common rotor); Pass 2: **no false-green found** | 19 rows fixed (`fix-fork-maxrotorf`, native mount → new `minRotorF`) + **PERMANENT GUARD 4/5** tests | **RESOLVED** |
| **Breadth-gap** (`tools/BREADTH-GAP.md` · auto-gen, last `460419e`) | does any frame collapse a category to <2 brands? | Real gaps found earlier were **closed by adding parts, not changing rules**; current snapshot: 0 real gaps (15 structural hardtail-shock) | iterative catalog additions | **RESOLVED (snapshot stale — §8-5)** |
| **Mechanic-findings intake** (`tools/MECHANIC-FINDINGS-INTAKE.md` · `dee2e08`) | a rule-map + triage template to apply an external mechanic's findings fast | process infrastructure (changes no code itself); rule map covers 1–19 | exercised by the dossier verdict wave | **process doc** (rule map one behind rule 20 — §8-4) |

The **verdict-audit harness** (`tools/verdict-audit-harness.js`) is the *standing* version of the
verdict audits — the 4th gate. Its probes A–D (name-vs-field, presets, per-frame assemble,
adversarial) are correctness-critical and currently clean; probe E reports a **pre-existing,
warning-tier** 4-fork rotor-max over-warn (documented, not an error-tier failure).

---

## 6. Key architecture decisions

- **No build step / plain browser JS.** `index.html` loads `src/compat.js` via a classic `<script>`;
  type-checking is JSDoc-only (`tsconfig.json` `checkJs`/`noEmit`, full `strict`) — nothing is
  compiled or shipped (`d7025e8`/`91aeec0`, day one). `types.js` is a pure dev-time proof layer.
- **Third-party libraries are VENDORED, not CDN-loaded.** Precedent set at Phase 3: `src/vendor/
  supabase.min.js` (`@supabase/supabase-js` v2.110.1 UMD, fetched 2026-07-08, `b63caf8`) with a
  header recording version + source URL + "DO NOT EDIT BY HAND", loaded via a classic `<script>` to
  honor the no-build-step / no-runtime-CDN convention.
- **Append-only, brand-qualified ids** as first-class identity (§3) — a cost-of-delay decision made
  pre-deploy; `ALIASES`+`canonicalId()` is the permanent forward mechanism.
- **Structured verdict objects** over string-matched errors (§2.1, `c395829`) — traced directly to
  `REVIEW.md` #4/#13; also the home for the adapter `fix` tier without new part fields.
- **JSDoc discriminated-union typechecking** — `Part` keyed by `cat`; `Frame` nested on `suspension`.
  Browser-only glue (`src/account.js`, `src/forum.js`, `src/vendor/**`) is excluded from typecheck for
  the same reason the inline `index.html` script is (DOM + cross-file script globals); the pure logic
  stays checked.
- **External-service config as a committed constant, feature-gated.** Pattern originates with
  `REPORT_REPO` (in `index.html`); Phase 3 mirrors it in `src/config.js` (publishable `SUPABASE_URL`
  + anon key — safe because RLS owner-scopes every row) with `ACCOUNTS_ENABLED = !!(url && key)`;
  Phase 4 adds `FORUM_ENABLED`. Both shipped **inert** then flipped live by setting a value
  (`670efb9` accounts GO-LIVE; `36e4982` forum). Never commit a secret (`service_role`).
- **Supabase owner-scoped Row-Level Security.** `builds`/`inventory` default `user_id` to
  `auth.uid()` and every verb is gated `auth.uid() = user_id` (`supabase/schema.sql`) — the
  justification for shipping the anon key publicly. Forum tables use a deliberately **asymmetric**
  policy (reads open, writes author-scoped) appropriate to public content.

---

## 7. Deliberately deferred / rejected rules

The bar for adding a rule: **backed by manufacturer compatibility docs and tested — a false "won't
fit" OR a false "fits" is worse than a missing rule.** What was considered and *not* shipped as an
error rule (reasoning in `CLAUDE.md` "Coverage roadmap" + `REVIEW.md` + `EXPERT-REVIEW-DOSSIER.md`):

- **Crankset chainline Boost vs SuperBoost — REJECTED (pinned non-rule).** SuperBoost frames are
  commonly ridden with Boost-chainline cranks, so a naive "SuperBoost frame needs SuperBoost crank"
  rule would fire a **false error**. `crankset.chainline` is display-only and is confirmed never read
  by `checkBuild`; the non-rule is pinned by a test asserting `fr-pivot-firebird` + `cr-sram-gx-eagle`
  stays clean (with a comment warning future sessions not to "helpfully" add it).
- **Real dropper insertion-depth vs frame size — DEFERRED.** Today rule 13b is only an **info** nudge
  (`drop ≥ 180`). The real check needs a frame-*size* picker in the build UI; the per-size data
  (`frame.sizes.maxInsert`) already exists, the UI concept doesn't.
- **Tire-vs-internal-rim-width** — the *too-narrow* half shipped as the **dormant** soft-warning
  rule 14c (maker minima only; ETRTO-derived thresholds were judged too fuzzy to hard-code). Note:
  `CLAUDE.md`'s roadmap prose still lists this as "unimplemented," which is stale — see §8-6.
- **Oversize-rotor adapter *info*** — genuinely not implemented (rule 10's max is a warning with no
  `fix`); low priority.
- **52T-max derailleur + 10-50 cassette (rule 5's mirror) — REFUTED.** SRAM documents these mechs as
  backward-compatible with 10-50 cassettes, so the proposed reverse error was rejected and kept on
  file so it is never "fixed in."
- **Chain length / ring size vs capacity, seatpost insertion vs curved seat tubes, e-bike ratings —
  PARKED** (not modeled at all).

---

## 8. UNVERIFIED — reviewer should check

Consolidated from the reconstruction. Each item names the exact place to look. **None is a known
correctness bug in a live error rule** — they are stale docs, test-coverage gaps, drift, or
provenance questions a reviewer should independently confirm.

1. **The "dead rule" language for rules 2 (front-axle), 8 (brake-mount), 11 (steerer) is stale.**
   Real catalog parts now exist that *can* fire them — DH forks with `axle:'20x110'` +
   `steerer:'straight-dc'` (`fk-fox-40-factory-29-203`, the BoXXers, the Öhlins DH38s at
   `compat.js` ~L670–715) and FM brakes (`bk-shimano-xtr-m9110-fm`, L~2411). Rule 8's front half is
   **confirmed live and tested** (`test-verdict-audit.js` ~L151). But `EXPERT-REVIEW-DOSSIER.md` §2/§8/§11
   and `REVIEW.md` #15 still call these "dead / can't fire," and no test pairs *two real parts* to
   fire the rule-2 / rule-11 **error** case (the error-case tests use synthetic `Object.assign`
   overrides; goldens exercise only the matched/silent case). Reviewer should: (a) confirm the docs'
   "can't fire" wording should be corrected, and (b) decide whether a real-part error-case test for
   rules 2/11 is wanted (a dual-crown DH fork on a trail frame is a nonsensical build even though the
   data would fire — that may be why it's untested).
2. **Whether the domain-expert review was an independent third party.** `EXPERT-REVIEW-DOSSIER.md` is
   addressed to "a mechanic / suspension tech / bike-industry engineer," but every 2026-07-10
   resolution line reads "Verdict received via the project owner." No separate, independently-authored
   external-mechanic document was found distinct from the AI research pass
   (`DOSSIER-OPEN-QUESTIONS-RESEARCH.md`) + that sign-off. Confirm whether an independent expert's raw
   findings exist. (This is why `FOR-REVIEWERS.md` calls the engine "self-consistent, not
   field-validated.")
3. **Whether `DATA-MODEL-REVIEW.md` §8's 12 "catalog errors surfaced in passing" were all fixed.**
   The review explicitly did **not** apply them (`DATA-MODEL-REVIEW.md` ~L564). Items include the two
   fictitious cranks (since realized), `fr-slash`'s BB shell, `fr-giga`'s `udh` value, a
   `specSummary` hardcoded-`'lock-on'` grips falsehood, OneUp dropper source-URL rot. Some adjacent
   fixes are visible in the log; grep current `src/compat.js` for each id/field to confirm each landed.
4. **`tools/MECHANIC-FINDINGS-INTAKE.md`'s rule map covers only rules 1–19** (last refreshed
   2026-07-09); rule 20 (headset) landed 2026-07-10 (`3abbf77`). Confirm the table was extended.
5. **The verification ledger and `BREADTH-GAP.md` are point-in-time snapshots that lag live.** The
   ledger (`verification-job.json`) is ~13 rows / 4 verifications behind the catalog and self-heals on
   the next `verify-job.js` run; `BREADTH-GAP.md`'s "124 frames / 0 gaps" is ~2 days / ~17 frames
   stale. Re-run `npm run verify:status` and `node tools/breadth-gap.js` for current numbers.
6. **`CLAUDE.md`'s "Coverage roadmap" prose lags the shipped code** in two spots: it lists
   tire-vs-rim-width as unimplemented (it's live-dormant as rule 14c) and its "20 rule areas"
   paragraph doesn't explicitly name rule 10b or 14c. Looks like copy-editing lag, not disagreement —
   confirm against `compat.js`.
7. **`archiveUrl` is documented as encouraged practice** (`VERIFY-PROTOCOL.md`) **but 0 rows carry
   it.** Either the step was never exercised or snapshots live outside the catalog fields — ask which.
8. **`sourceType:'manufacturer'` is a legal vocab value but is written on 0 rows** (manufacturer-page
   rows simply omit `sourceType`). Inert enum member, not a defect — noted so a reviewer isn't
   surprised.
9. **Numeric counts throughout the repo self-flag as drifting** ("don't trust a number written here").
   Every count in *this* dossier (parts, verified, tests, "~51 SHIS frames", "~8–10 rule-18 frames")
   is scene-setting reconstructed at tip `75e0304`; re-run the four gates for live truth.
10. **The exact roster of parts carrying each dormant-activating field** (`minForkTravel`,
    `designForkTravel`, `minRotorF`/`minRotorR`, `coilApproved`, `headTubeUpper`/`Lower`, `maxTire`,
    shifter `clampType` + brake `leverAccepts`) is not enumerated anywhere — grep `compat.js`'s
    `PARTS` for each field to get the current set before trusting any prose count.
11. **The GitHub Pages "first live" date** can't be confirmed from git alone (the deploy workflow
    landed 2026-06-27 `17e7549`; the custom domain went live 2026-07-11 `2ac8199`).
12. **`test/` contains files not in `CLAUDE.md`'s file table** (`test-verdict-identity.js`,
    `test-verdict-audit.js`, `test-random-builds.js`, `test-share.js`, `test-ui.js`, `test-ids.js`,
    `test-drift-check.js`, `test-account-serialize.js`). Confirm the table is just due a refresh.
13. **This dossier did not re-fetch any manufacturer `source` URL** — it reconstructs the methodology
    and the decision trail, not the correctness of any individual spec. The "ADVERSARIALLY AUDITED"
    note on many merge commits refers to a separate adversarial pass at merge time, not to anything
    performed here. Independent spec-checking against live manufacturer pages is exactly the work a
    reviewer is invited to do.
