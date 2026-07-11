# Mechanic Findings Intake

**Purpose:** apply the domain-expert mechanic's review of
[`EXPERT-REVIEW-DOSSIER.md`](../EXPERT-REVIEW-DOSSIER.md) fast and disciplined, once it comes
back. This doc is prepared in advance, before any findings exist — **it changes no code,
catalog, schema, or tests.** Applying a finding is a separate, gated change (§3). It has three
parts:

1. [Rule map](#1-rule-map) — every engine rule area → the exact region in `src/compat.js` and
   the test file(s) that pin its behavior.
2. [Per-finding triage template](#2-per-finding-triage-template) — copy this block once per
   mechanic finding and fill it in before touching code.
3. [Fast-apply checklist](#3-fast-apply-checklist) — the sequence to follow per finding,
   honoring the project's bar: **a wrong verdict is worse than a missing rule.**

**Line numbers drift** (this file was previously stale by ~2300 lines after catalog growth —
the exact failure mode the doc exists to prevent). They are anchors **as of the commit that
refreshed this file**. The stable identity is the `ruleId` string and the `/* N. */` rule
comment in [`src/compat.js`](../src/compat.js) — **grep the `ruleId`, don't trust the line
number.** Rule-area numbering matches CLAUDE.md's "Compatibility engine" list and the dossier's
rule-by-rule ordering.

---

## 1. Rule map

All fit rules live inside the single `checkBuild(build)` function in
[`src/compat.js`](../src/compat.js) (**starts L3629, `return` L3890**). Each rule pushes a
`Verdict` via the local closures `err(ruleId, slots, msg)` / `warn(ruleId, slots, msg, fix?)` /
`info(ruleId, slots, msg)` (**L3634–3638**). `ruleId` is the stable identity used by
`verdictKey()` (**L3580**, = `ruleId+'|'+slots+'|'+msg`) for dot-diffing and dedup — **when a
finding changes a rule's class (error↔warning↔info) or the shape of what it fires on, check
whether the `ruleId`/`slots` also change**, since the pick-time dot, the report UI, and
`test-verdict-identity.js` all key on `verdictKey`, never raw message text (two different
conflicts can stringify byte-identically — REVIEW.md #4/#13).

| # | Rule area | `ruleId`(s) | Class | Dir-aware? | `compat.js` region | Primary test(s) |
|---|-----------|-------------|-------|-----------|--------------------|-----------------|
| 1 | Wheel sizing: each end internally consistent + front/rear combo matches a frame `wheelConfigs` (incl. mullet); frameless reverse-mullet guard | `front-wheel-size`, `rear-wheel-size`, `wheel-config` | error | n/a | `sizeOf()` + L3645–3671 | `test-engine.js` "29-only frame rejects a 27.5 front" (L14), "mullet…" (L17/L20), "frameless reverse-mullet" (L26), "…legit mullet…silent" (L29); hub+rim L401 |
| 2 | Front & rear axle (fork.axle vs frontHub.hub; frame.rearAxle vs rearHub.hub) | `front-axle`, `rear-axle` | error | n/a | L3673–3675 | `test-engine.js` "SuperBoost frame + Boost rear wheel" (L35), "front-axle check fires…dead rule pinned" (L332); hub+rim L410–415 |
| 3 | Drivetrain one-system + one-speed | `drivetrain-system`, `drivetrain-speeds` | error | n/a | L3677–3688 | `test-engine.js` "SRAM shifter + Shimano derailleur" (L44), group tests L51–69, "rule 3 rejects mixing 7-speed DH shifter…" (L360) |
| 3b | Actuation: cable trigger ↔ AXS mech (shared `system`, split by `actuation`) | `actuation` | error | reverse-symmetric (both directions error) | L3689–3695 | `test-engine.js` "mechanical trigger + AXS" (L75), "AXS controller + mechanical" (L78), "AXS Eagle drivetrain…clean" (L81) |
| 3c | T-Type Flattop chain vs chainring standard | `chainring-standard` | error (info if `ringStd:null`) | **yes** — only Transmission-chain→non-T-Type-ring errors; T-Type ring IS backward-compat (reverse stays silent) | L3696–3707 | `test-engine.js` "Transmission Flattop chain + non-T-Type crank" (L87), "…+ T-Type…clean" (L90), "T-Type crank + Eagle chain" (L93), "armset-only crank…info" (L96) |
| 4 | SRAM Transmission (udh-direct mech) needs a UDH frame; frameless = info | `udh` | error (info if no frame) | n/a | L3709–3713 | `test-engine.js` "Transmission derailleur needs a UDH frame" (L104), "…fine on a UDH frame" (L107) |
| 5 | Cassette range vs derailleur capacity (`cassette.maxCog` > `derailleur.maxCog`) | `cassette-capacity` | error | one-sided (only too-big fires) | L3715–3716 | `test-engine.js` "cassette bigger than derailleur capacity" (L110) |
| 6 | Freehub: cassette vs rear wheel | `freehub` | error | n/a | L3718–3719 | `test-engine.js` "Shimano cassette on XD wheel" (L41), "Box Prime 9 cassette on MicroSpline" (L69); hub+rim L418 |
| 7 | Crank / BB spindle advisory | `bb-advisory` | info (never blocks) | n/a | L3721–3722 | not separately pinned — exercised incidentally by golden builds |
| 8 | Brake caliper mounts (front brake vs fork; rear brake vs frame) | `front-brake-mount`, `rear-brake-mount` | error | n/a | L3724–3726 | `test-engine.js` "brake-mount checks fire on synthetic flat-mount brakes…dead rule pinned" (L337) |
| 9 | Rotor interface vs hub | `front-rotor-interface`, `rear-rotor-interface` | error / **warning + `fix`** | **yes** — CL-rotor→6-bolt-hub = error; 6-bolt-rotor→CL-hub = adapter warning carrying `fix:{kind:'adapter',name}` | L3728–3745 | `test-engine.js` "Center Lock rotor on 6-bolt front hub" (L113), "6-bolt rotor on CL hub…structured fix" (L120), "…REAR hub" (L128); hub+rim L421; `test-greying.js` L39–49 |
| 10 | Rotor size vs frame/fork max (warn) + vs fork native-mount minimum (error, sourced forks only) | `front-rotor-max`, `rear-rotor-max`, `front-rotor-min` | warning / error | **yes** — over-max warns, under-min errors (adapters only space up) | L3747–3756 | `test-engine.js` "180mm rotor on a ZEB (200 min)…error" (L135), "200mm…meets minimum" (L138), "…dormant without minRotorF" (L141); `test-greying.js` L97 |
| 11 | Steerer / headset (fork.steerer vs frame.headset) | `steerer` | error | n/a | L3758–3759 | `test-engine.js` "steerer check fires…dead rule pinned" (L345), "dual-crown fork on tapered frame" (L350), "…the other way" (L355), "matched straight-dc pair…silent" (L366) |
| 12 | Fork travel vs frame rated max (warn) + under-fork vs sourced minimum (dormant) | `fork-travel`, `fork-travel-min` | warning | **yes** — over warns; under warns, dormant until `frame.minForkTravel` | L3761–3770 | `test-engine.js` "over-travel fork (180 on 170-rated)" (L239), "under-forking warns…" (L246), "…dormant without minForkTravel" (L251); `test-greying.js` L103 |
| 13 | Dropper diameter vs seat tube + insertion nudge | `dropper-diameter`, `dropper-shim`, `dropper-insertion` | error / warning / info | **yes** — bigger post errors, smaller = shim warning; ≥200mm drop = insertion info | L3772–3790 | `test-engine.js` "dropper bigger than seat tube" (L198), "smaller dropper…shim warning" (L201), "exact-diameter…silent" (L205), "long-drop…insertion info" (L277); `test-greying.js` L120 |
| 14 | Tire width vs wheel-rim clearance (per wheel, warn) + vs fork chassis (dormant) | `front-tire-rim`, `rear-tire-rim`, `front-tire-fork` | warning | n/a | L3792–3799 | `test-engine.js` "front tire wider than fork chassis" (L266), "…dormant without fork.maxTire" (L271), REVIEW#16 real-parts (L316); hub+rim L424 |
| 15 | Handlebar / stem clamp | `bar-stem-clamp` | error | n/a | L3801–3802 | `test-engine.js` "bar/stem clamp mismatch (35 vs 31.8)" (L144) |
| 16 | Rear-shock fit: hardtail guard; eye-to-eye; stroke; mount; coil approval (dormant) | `hardtail-shock`, `shock-size`, `shock-stroke-over`, `shock-stroke-short`, `shock-mount`, `coil-approval` | error / error / error / **warning** / error / warning | **yes** — longer stroke errors, shorter same-eye stroke warns (quantified) | L3804–3834 | `test-engine.js` "hardtail frame + a shock" (L184), "shorter-stroke…quantified warning" (L217), "longer-stroke…error" (L222), "trunnion shock…mount error" (L209), "coil shock warns…" (L255); `test-greying.js` L13–36 |
| 17 | Frame + shock bundling / OEM-only | `bundled-shock`, `package-only`, `oem-shock` | info / warning / error | **yes** — OEM frameless = info, OEM wrong-frame = error | L3836–3856 | `test-engine.js` "OEM shock cannot go on the wrong frame" (L228), "OEM shock with NO frame…info" (L231), "package-only frame…warning" (L235); `test-greying.js` L26–52 |
| 18 | Rear tire vs FRAME clearance (optional `frame.maxTire`, warn) | `rear-tire-frame` | warning | n/a | L3858–3864 | `test-engine.js` "rear tire wider than frame max" (L288), "…within max" (L294), "…dormant when frame declares no maxTire" (L300), "…ACTIVE on sourced frames" (L305), REVIEW#16 (L319) |
| 19 | Shifter mounting vs brake-lever integration (I-Spec/MatchMaker; dormant until tagged) | `shifter-mount` | warning | n/a | L3866–3888 | `test-engine.js` "I-Spec EV shifter + MatchMaker" (L151), "…+ I-Spec EV…silent" (L155), "one matching lever is enough" (L158), "…dormant when brakes untagged" (L168); `test-greying.js` L107 |
| 20a | Headset steerer acceptance vs fork (`headset.steerer` vs `fork.steerer`, exact equality — rule-11 semantics on the headset side) | `headset-steerer` | error | n/a | L4708–4710 | `test-engine.js` "rule 20a: tapered headset + dual-crown (straight) fork -> steerer error" (L187), "rule 20a reverse direction: …straight-dc headset on a tapered fork" (L221) |
| 20b | Headset cups vs frame head-tube S.H.I.S. **bore tokens** (`headset.upper`/`.lower` vs frame `headTubeUpper`/`headTubeLower`; dormant-until-sourced, live on the SHIS-carrying frames) | `headset-upper`, `headset-lower` | error | n/a | L4711–4714 | `test-engine.js` "rule 20b: IS-cup headset in a ZS head tube -> upper AND lower cup errors" (L190), "matching cups…clean" (L195), "is DORMANT on a frame without sourced head-tube data" (L198), "compares BORE tokens, not full codes" (L208) |
| 20c | Pick-a-headset advisory once frame+fork are chosen (frames often ship one, so it only nudges — never blocks) | `headset-advisory` | info (never blocks) | n/a | L4715–4719 | `test-engine.js` "rule 20c: frame+fork with sourced head-tube data -> advisory names the cups" (L227), "…without head-tube data -> generic advisory, never a verdict" (L231), "rule 20 clean sweep…advisory suppressed" (L203) |

**Cross-cutting / not rule-specific:**

- **`Verdict` shape + `verdictKey`:** L3577 / L3580. `nameOf` L3522, `byId` L3520 (message
  helpers rules use).
- **`resolveBuild` / `effectiveWheel`** (hub+rim synthesis into a virtual wheel): L3591 / L3615.
  Any finding touching wheel-adjacent rules (1, 2, 6, 9, 10, 14) must be re-checked against the
  **hub+rim build path**, not just the complete-wheel path — `test-engine.js` L389–431 exercises
  both and asserts identical verdicts. `test-verdict-identity.js` pins exact `ruleId`+`slots`
  for wheel-config and rotor rules precisely because two structurally different conflicts can
  produce byte-identical text — **don't rely on message-substring assertions when editing these.**
- **`compatOf` (the pick-time dot: green/yellow/red/grey):** L3931, via `placementDiff` (L3914,
  diffs by `verdictKey`) / `conflictReason` (L3929). Tested in `test-greying.js`. **Yellow =
  fits but adds a new warning** (REVIEW #6) — any class change or direction flip must be
  re-checked here, not just in `test-engine.js`.
- **`buildTotals` (pricing/weight, bundle detection):** L4000, tested in `test-pricing.js`. Not
  dossier-covered but touched if a finding changes what a preset `fills` or bundling implies.
- **`partWeight` / `partVerified`:** L4043 / L4093. Relevant only if a finding changes a
  provenance rule, not a fit rule.
- **`test-invariants.js`:** fuzzes random/partial builds against every catalog part to prove the
  engine never throws and is deterministic. Not rule-specific, but **re-run it after any
  `checkBuild` edit** — a rule that reads a field without a `typeof`/`&&` guard surfaces here
  even when `test-engine.js` doesn't catch it. Follow the dormant-rule idiom
  (`typeof frame.<field>==='number'`) for any new field read.
- **`test-golden.js`:** whole real bikes that must stay clean, plus a known-bad build that must
  fail. **Any finding that tightens a rule must be checked against every golden build** — a new
  true-positive on a golden build means either the golden build's catalog parts are wrong (fix
  the row) or the rule is too aggressive (fix the rule), **never** "loosen the golden build's
  assertion."
- **`test-data.js` / `test-schema.js`:** catalog passes the validator / validator catches bad
  data. Any schema or vocab change lands a negative test here.
- **Deliberate NON-rules** (dossier's "please confirm, don't fix" set — CLAUDE.md "Coverage
  roadmap"): SuperBoost frame + Boost-chainline crank silence is pinned at `test-engine.js`
  "SuperBoost frame + Boost-chainline crank stays clean" (L379). Tire-vs-internal-rim-width
  (too-narrow) and oversize-rotor-adapter *info* are considered-but-deferred. **If the mechanic
  overturns one of these, it's a NEW rule, not a rule change** — highest scrutiny (see triage
  "reversing a documented non-rule").
- **`ALIASES`** (L3150, resolved via `canonicalId()` L3516): any finding that requires
  retiring/correcting a catalog part **id** (not just editing its fields) goes through this
  append-only mechanism — ids are never renamed, reused, or deleted; the verify-job sync
  tombstones a departed id. "This is fundamentally a different SKU than we catalogued" = an
  ALIASES case; "this field on the existing part is wrong" = a plain data edit.
- **Vocab widening** (`src/schema.js`: `VOCAB` L25, `SCHEMA` L186, `validatePart` L354): a
  finding introducing a genuinely new standard (new axle size, freehub body, I-Spec generation)
  needs the `VOCAB` entry first — `validatePart` rejects any row using an unlisted value, so the
  schema change lands with or before the rows that need it. Field add/rename → update BOTH
  `schema.js` (runtime) AND [`src/types.js`](../src/types.js) (the `Part` JSDoc union) so
  `npm run typecheck` stays in agreement.

---

## 2. Per-finding triage template

Copy this block once per mechanic finding (one per numbered rule area, or one per "gap" they
flag). Fill in every field **before writing any code** — the empty fields are where the bar
gets enforced.

```
### Finding: <one-line summary, quote the mechanic if possible>

- Dossier rule #:      <1–20 (incl. 3b/3c, 20a/20b/20c), or "gap: <name>", or "non-rule: <name>">
- Mechanic verdict:    ✓ correct  /  ✗ wrong (false verdict)  /  ~ right idea, wrong
                       tier-or-wording-or-scope
- What they say is wrong (if ✗ or ~):
- Change type:         [ ] rule is WRONG (false red / false green — fix logic/direction/threshold)
                       [ ] rule INCOMPLETE (add a case; keep dormant if data-dependent)
                       [ ] rule CONFIRMED correct (no code change — record sign-off + source)
                       [ ] NEW candidate rule (must clear "backed by mfg docs + tested")
                       [ ] REVERSING a documented non-rule (highest scrutiny)
                       [ ] DATA fix only (catalog row wrong; engine fine)
- Verdict class:       current = <error|warning|info>  →  proposed = <error|warning|info>
                       (error = won't fit; warning = works but check; info = note. Prefer
                        downgrading a false red to warning/info over deleting the rule.)
- Direction-aware?:    [ ] symmetric   [ ] one-directional — state which direction verdicts and
                       which stays silent. Rules 3c/9/10/12/13/16 are direction-aware BY DESIGN;
                       a finding addressing only one direction needs a follow-up question before
                       you touch the other direction.
- Source cited:        <shop experience / a manufacturer doc+URL / a specific bike-check>.
                       REQUIRED to ADD or STRENGTHEN a red. "Shop experience" alone lets us
                       DOWNGRADE/soften, not add. A finding that CONTRADICTS an existing cited
                       manufacturer source (e.g. SRAM's documented Flattop incompatibility) needs
                       a second source before acting — same bar as a new rule.
- Dormant-until-data?  [ ] no   [ ] yes → gate on `typeof frame.<field>==='number'` (etc.);
                       ships inert, activates per-part as sourced data lands (the rule-18 template)
- Catalog rows affected: <none / list ids that gain or lose a verdict — grep the catalog and
                       list them. If a row needs a new sourced field to activate the rule, that
                       is follow-up DATA work, not part of this change.>
- Schema/types impact: [ ] none   [ ] new/changed field → src/schema.js (SCHEMA+VOCAB) AND
                       src/types.js (Part union), + a negative test in test-schema.js
- ruleId / identity impact: [ ] none  [ ] new ruleId  [ ] existing ruleId's class or slots
                       changing (breaks test-verdict-identity.js pins — update deliberately)
- ALIASES / id migration: [ ] none   [ ] a catalog id is being corrected → retire old id into
                       ALIASES (append-only, never rename/reuse); check share-hash refs
- Tests to add/change: - test-engine.js: <new test name(s), one per direction if dir-aware,
                         written to FAIL on current behavior first>
                       - test-greying.js: <only if a real catalog pair's dot state changes>
                       - test-verdict-identity.js: <only if ruleId/slots shape changes>
                       - test-golden.js: <re-check; NEVER weaken its zero-issues assertion — a
                         newly-failing golden build means the catalog row is wrong, fix that>
                       - test-invariants.js: <no new tests — just re-run after the edit>
- Docs to update after landing: EXPERT-REVIEW-DOSSIER.md (mark ✓/✗/~ + resolution),
                       CLAUDE.md "Compatibility engine" section (if rule count/description
                       changed), NEXT-STEPS.md (if queued there)
- Decision:            [ ] apply now  [ ] land dormant  [ ] defer (log in NEXT-STEPS.md)  [ ] reject
- Priority:            <mechanic's own ranking if given; else the order in §3>
- Notes:
```

**Reading "change type" against the bar:**

- *Rule is WRONG (false red / false green):* highest priority — a wrong verdict is the one thing
  worse than a missing rule. Prefer **downgrading** (error→warning→info) or making the rule
  **direction-aware** over deleting it, so the real signal survives (how REVIEW #8/#9/#10 were
  fixed). A genuinely spurious rule can be removed, but its test is *updated* to assert the new
  silent behavior, not deleted.
- *NEW candidate rule:* lands only if **backed by a manufacturer compatibility doc AND tested.**
  No source → not a red; consider info-only or defer to NEXT-STEPS.md. (See CLAUDE.md's rejected
  list — Boost/SuperBoost chainline was REJECTED because a naive rule false-reds real builds.)
- *Reversing a documented non-rule:* means the dossier's own prior refutation was wrong.
  Re-verify that refutation's original source before overturning, and update the dossier's
  non-rules section, not just the code.
- *CONFIRMED correct:* still valuable — record the sign-off + any source into the dossier / rule
  comment so it isn't re-litigated.

---

## 3. Fast-apply checklist

Apply findings **one at a time**; smallest safe batch = one dossier rule area (its sub-checks
a/b/c may land together when they're the same finding). Don't batch unrelated rule areas into
one commit — the golden rule ("after ANY change to `compat.js` or `schema.js`, run
`node validate.js` AND `npm test`, both must pass before committing") applies per change, and
small commits keep a bad finding easy to isolate and revert.

1. **Fill in the triage template** (§2) for the finding before editing anything.
2. **Re-read the dossier's framing for that rule** — the "Ask" line tells you exactly what the
   mechanic was asked to confirm; don't over-apply a finding beyond what was asked.
3. **If the finding reverses a documented non-rule**, stop and re-verify that the original
   refutation's cited source is actually wrong/inapplicable — don't trust a new finding over an
   already-sourced refutation without understanding why they disagree.
4. **Re-anchor.** Grep the `ruleId` string in `src/compat.js` to confirm the region (line
   numbers drift). Read the `/* N. */` comment — it records *why* the rule is shaped this way
   (often a REVIEW.md finding); don't undo a deliberate direction-awareness by accident.
5. **Write the failing test FIRST.** Add/adjust a test in `test-engine.js` (and `test-greying.js`
   if the dot changes) capturing the corrected behavior, and confirm it **fails on current code
   for the right reason.** *Never weaken or delete an existing test to make a change pass* — if a
   test's assertion looks wrong in light of the finding, that's its own triage item ("test
   encodes the wrong belief"), not something to quietly edit away.
6. **Make the change small.** Edit only the rule region and/or `schema.js` (new fields/vocab)
   and/or catalog rows (a "this part's data is wrong" fix is *different* from an engine-rule fix
   — don't conflate them).
   - Preserve the direction-awareness idiom (rules 9/10/12/13/16): real-world physical asymmetry
     → different classes per direction, never a single symmetric check.
   - For data-dependent rules, gate the new read so it ships **dormant** (inert until a sourced
     row opts in), with a test proving silence-without-data — same as rules 12b/14b/16b/min-rotor.
   - Keep message style consistent: name parts via `nameOf`, sizes via `L()`.
7. **Schema stays the source of truth.** New/changed field → `src/schema.js` (SCHEMA + VOCAB)
   AND `src/types.js` (the `Part` union) in the same change, plus a negative test in
   `test-schema.js`. Don't scatter ad-hoc checks.
8. **Provenance for any spec you touch.** Set `verified:true` only with a fetched manufacturer
   page + real `source` URL + non-future `lastChecked` (validator-enforced). Interfaces are
   always manufacturer-sourced; a third-party *measured* weight needs `sourceType:'measured'` +
   `weightSource`. A spec correction that can't meet the weight bar stays `verified:false` and is
   recorded `Skipped` (VERIFY-PROTOCOL.md) — a correction without verification is still valuable.
   Never present unverified specs as real.
9. **Run all three gates — every one must be green (CLAUDE.md's golden rule):**
   ```
   node validate.js       # expect: DATA OK … 0 problems   (enforces provenance)
   npm test               # expect: every test passes, 0 failures   (don't hardcode counts)
   npx tsc --noEmit       # expect: no output, exit 0
   ```
   All three, always, after any `compat.js` / `schema.js` change. A change that can't get all
   three green is not ready — **fix the change, not the gate.**
10. **If a golden build now fails:** decide whether the golden build's catalog parts are wrong
    (fix the row, keep the tightened rule) or the rule is too aggressive for a real bike (loosen
    the rule, re-triage). Never adjust the golden build's expected zero-issues assertion to
    accommodate a new true-positive — that assertion is the whole point of the file.
11. **Re-verify the dot & identity.** Confirm `test-greying.js` reflects the intended
    green/yellow/red/grey and `test-verdict-identity.js` still holds if a `ruleId`/`slots`
    changed.
12. **Update `EXPERT-REVIEW-DOSSIER.md`** inline: mark the rule ✓/✗/~ with the resolution, so
    the dossier stays the durable record of what was asked and decided (mirrors how REVIEW.md's
    Criticals/Majors are recorded in-repo, not lost in chat).
13. **Commit narrowly.** Engine/schema/catalog edit + its tests together, one dossier finding per
    commit where practical, message naming the dossier rule # and the manufacturer source (e.g.
    "Rule 9: restrict CL-rotor adapter warning to one-piece rotors, per mechanic review + Shimano
    SM-RTAD05 doc"). Update the rule's `/* */` comment, and `CLAUDE.md`'s "Compatibility engine"
    section if the rule count/tier/description changed.
14. Repeat from step 1 for the next finding. Batch only truly independent findings (different
    rule areas, no shared catalog rows). Parallel sessions each use their **own git worktree** —
    never run parallel sessions against the shared checkout.

**Stop conditions (do not ship):** any gate red; a test had to be weakened to pass; a new red
rule lacks a manufacturer source; the change would false-fire on an existing catalog build (grep
and check first); unsure whether a verdict direction is right → land dormant or defer, don't
guess. A missing rule is recoverable; a wrong verdict on a live build is the failure mode this
product exists to avoid.

### Priority order across findings (once all are triaged)

1. Any finding marked ✗ on an **error**-tier rule (a false "won't fit" or false "fits" that
   ships today) — the highest-cost mistakes.
2. Any finding marked ✗ on a **warning**-tier rule.
3. Tier changes (~ verdicts proposing error↔warning↔info moves).
4. Wording/scope fixes that don't change behavior (safe to batch several).
5. Activating a dormant rule with newly-confirmed backing — still needs sourced data per-part; a
   mechanic's general confirmation of the *rule* doesn't substitute for sourced *data* on which
   frames/forks it applies to.
6. Net-new rules for gaps the mechanic ranked dangerous — most design work (new schema fields,
   vocab, catalog backfill); follow the "land dormant, activate per-part as data arrives"
   template rather than shipping unsourced heuristics.
