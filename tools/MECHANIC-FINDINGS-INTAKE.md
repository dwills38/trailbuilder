# Mechanic Findings Intake

**Purpose:** apply the domain-expert mechanic's review of `EXPERT-REVIEW-DOSSIER.md` fast
and disciplined, once it comes back. This doc is prepared in advance, before any findings
exist — it changes no code or catalog data. It has three parts:

1. [Rule map](#1-rule-map) — every rule area in `EXPERT-REVIEW-DOSSIER.md` → the exact
   function/lines in `src/compat.js` and the test file(s) that pin its behavior.
2. [Per-finding triage template](#2-per-finding-triage-template) — copy this block once
   per mechanic finding and fill it in before touching code.
3. [Fast-apply checklist](#3-fast-apply-checklist) — the sequence to follow per finding,
   honoring the project's bar (a wrong verdict is worse than a missing rule).

This intake is keyed to the dossier as prepared 2026-07-07 (19 rule areas + sub-checks,
engine in `src/compat.js`, catalog/schema in `src/compat.js` / `src/schema.js`). If the
dossier is re-issued later against a different engine state, re-verify line numbers before
trusting this table — grep for the `ruleId` strings below in `src/compat.js` rather than
assuming the line numbers still hold.

---

## 1. Rule map

All rules live inside the single `checkBuild(build)` function in `src/compat.js`
(function starts at line 1284, `return` at line 1545). Each rule pushes a `Verdict` via
the local `err()` / `warn()` / `info()` closures — `err(ruleId, slots, msg)`,
`warn(ruleId, slots, msg, fix?)`, `info(ruleId, slots, msg)`. `ruleId` is the stable
identity used by `verdictKey()` (line 1235) for dot-diffing/dedup — **when a finding
changes a rule's tier (error↔warning↔info) or the shape of what it fires on, check
whether `ruleId` needs to change too**, since existing UI/report state and
`test-verdict-identity.js` key on it.

Dossier section numbers below match `EXPERT-REVIEW-DOSSIER.md` exactly.

| # | Dossier rule | `ruleId`(s) | `compat.js` lines | Tier | Primary test file(s) |
|---|---|---|---|---|---|
| 1 | Wheel size configuration | `wheel-config` | 1300–1326 | error | `test-engine.js` (front-only/mullet/frameless-mullet ~L14–34); `test-verdict-identity.js` (slot identity) |
| 2 | Axles (front/rear) | `front-axle`, `rear-axle` | 1328–1330 | error | `test-engine.js` L35–39 (SuperBoost/Boost rear), L307–311 (synthetic front-axle, dead-rule pin) |
| 3a | Drivetrain: one system, one speed | `drivetrain-system`, `drivetrain-speeds` | 1332–1343 | error | `test-engine.js` L44–46, L335–339 (7-speed DH shifter mix) |
| 3b | Actuation (cable vs AXS) | `actuation` | 1344–1350 | error | `test-engine.js` L48–57 |
| 3c | Chainring standard (T-Type vs Flattop, one-directional) | `chainring-standard` | 1351–1362 | error / info | `test-engine.js` L62–77 |
| 4 | SRAM Transmission needs UDH | `udh` | 1364–1368 | error / info (frameless) | `test-engine.js` L79–83 |
| 5 | Cassette range vs derailleur capacity (one-sided) | `cassette-capacity` | 1370–1371 | error | `test-engine.js` L85–86 |
| 6 | Cassette freehub vs rear wheel | `freehub` | 1373–1374 | error | `test-engine.js` L41–43; hub+rim path L393–395 |
| 7 | Bottom bracket advisory | `bb-advisory` | 1376–1377 | info (never blocks) | not separately pinned — covered incidentally by golden builds |
| 8 | Brake caliper mounts | `front-brake-mount`, `rear-brake-mount` | 1379–1381 | error | `test-engine.js` L312–318 (synthetic FM brakes, dead-rule pin) |
| 9 | Rotor interface vs hub (direction-aware) | `front-rotor-interface`, `rear-rotor-interface` | 1383–1400 | error (CL rotor→6-bolt hub) / warning + `fix` (6-bolt rotor→CL hub) | `test-engine.js` L88–109; hub+rim path L396–398 |
| 10 | Rotor size: max (warning) + native-mount minimum (error) | `front-rotor-max`, `rear-rotor-max`, `front-rotor-min` | 1402–1411 | warning (max) / error (min) | `test-engine.js` L110–118 |
| 11 | Steerer / headset | `steerer` | 1413–1414 | error | `test-engine.js` L320–333 (synthetic + straight-dc direction pair) |
| 12 | Fork travel vs frame: rated max (warning) + approved minimum (dormant) | `fork-travel`, `fork-travel-min` | 1416–1425 | warning | `test-engine.js` L214–228 |
| 13 | Dropper vs seat tube (direction-aware) + insertion nudge | `dropper-diameter`, `dropper-shim`, `dropper-insertion` | 1427–1445 | error (too big) / warning (shim) / info (≥200mm) | `test-engine.js` L173–182, L252–259 |
| 14 | Tire vs rim width + fork crown clearance | `front-tire-rim`, `rear-tire-rim`, `front-tire-fork` | 1447–1454 | warning | `test-engine.js` L241–250, L291–303 (real-parts case); hub+rim path L399–401 |
| 15 | Handlebar / stem clamp | `bar-stem-clamp` | 1456–1457 | error | `test-engine.js` L119–125 |
| 16 | Rear shock fit (direction-aware stroke + coil approval + hardtail guard) | `hardtail-shock`, `shock-size`, `shock-stroke-over`, `shock-stroke-short`, `shock-mount`, `coil-approval` | 1459–1489 | error (size/mount/hardtail/over-stroke) / warning (under-stroke/coil) | `test-engine.js` L159–200, L230–239; `test-greying.js` L13–25 (dot states) |
| 17 | Frame + shock bundling / OEM-only | `bundled-shock`, `package-only`, `oem-shock` | 1491–1511 | info (bundle match / frameless OEM) / warning (package-only) / error (wrong-frame OEM) | `test-engine.js` L203–212; `test-greying.js` L26–34 |
| 18 | Rear tire vs frame clearance | `rear-tire-frame` | 1513–1519 | warning | `test-engine.js` L263–303 |
| 19 | Shifter clamp vs brake-lever integration | `shifter-mount` | 1521–1543 | warning | `test-engine.js` L126–147 |

**Cross-cutting / not rule-specific:**

- `Verdict` shape + `verdictKey`: lines 1232–1235.
- `resolveBuild` / `effectiveWheel` (hub+rim synthesis into a virtual wheel): lines
  1246–1283. Any finding touching wheel-adjacent rules (1, 2, 6, 9, 10, 14) must be
  re-checked against the **hub+rim build path**, not just the complete-wheel path —
  `test-engine.js` L364–410 exercises both and asserts identical verdicts.
  `test-verdict-identity.js` also pins exact `ruleId`+`slots` for wheel-config and the
  rotor rules specifically because two structurally different conflicts can produce
  byte-identical message text (REVIEW.md #4/#13) — don't rely on message-substring
  assertions alone when editing these.
- `compatOf` (the pick-time dot: green/yellow/red/grey): lines 1586–1635, tested in
  `test-greying.js`.
- `buildTotals` (pricing/weight, bundle detection): lines 1655–1685, tested in
  `test-pricing.js`. Not dossier-covered but touched if a finding changes what a preset
  `fills` or bundling implies.
- `partWeight` / `partVerified`: lines 1698–1761. Relevant only if a finding changes a
  provenance rule, not a fit rule.
- `test-invariants.js`: fuzzes random/partial builds against every part in the catalog to
  prove the engine never throws and is deterministic — not rule-specific, but re-run it
  after any `checkBuild` edit; a rule that assumes a field exists without an `&&` guard
  will surface here even if `test-engine.js` doesn't catch it.
- `test-golden.js`: whole real bikes (GOOD/DEAL/MADONNA/CLASH + demo builds) that must
  stay clean (or stay exactly as-bad, for the deliberately-bad build). **Any finding that
  tightens a rule must be checked against every golden build** — a new true-positive on a
  golden build means either the golden build's parts are wrong (fix the catalog row) or
  the rule is too aggressive (fix the rule), not "loosen the golden build's assertion."
- **Deliberate non-rules** (dossier's "please confirm, don't fix" section): SuperBoost
  frame + Boost-chainline crank silence is pinned at `test-engine.js` L354–356; the 52T
  derailleur + 10-50 cassette non-rule has no dedicated pin beyond rule 5's one-sided
  test (L85–86 only tests the direction that *does* fire — there's no assertion that the
  reverse stays silent, which is worth adding if the mechanic reconfirms it). If the
  mechanic overturns one of these, it's a **new rule**, not a rule change — see the
  triage template's "reversing a documented non-rule" case.
- **`ALIASES`** (`src/compat.js` line 815, resolved via `canonicalId()` line 1171): any
  finding that requires renaming/retiring a catalog part id (not just editing its fields)
  goes through this mechanism — ids are append-only and never reused or deleted (see
  CLAUDE.md "Conventions" and the Mara Pro precedent in memory). A finding that says "this
  spec is fundamentally a different SKU than what we catalogued" is an alias case; a
  finding that says "this field on the existing part is wrong" is a plain data edit.
- **Vocab widening** (`src/schema.js` `VOCAB` at line 25, `SCHEMA` at line 148,
  `validatePart` at line 316): a finding that introduces a genuinely new standard (e.g. a
  new axle size, a new freehub body, a new I-Spec generation) requires adding to `VOCAB`
  first — `validatePart` will reject any catalog row using an unlisted value, so the
  schema change always lands before or with the catalog rows that need it, never after.

---

## 2. Per-finding triage template

Copy this block once per mechanic finding (one per numbered rule-area comment, or one per
"gap" they flag). Fill in every field before writing any code.

```
### Finding: <one-line summary, quote the mechanic if possible>

- **Dossier rule #:** <1-19, or "gap: <name from Known Gaps table>", or "non-rule: <name>">
- **Mechanic verdict:** ✓ correct / ✗ wrong / ~ right idea, wrong tier-or-wording-or-scope
- **What they said is wrong (if ✗ or ~):**
- **Verdict class implied:** error / warning / info / no-rule (delete or never-add)
  — does this MATCH the current tier, or is this a tier change?
- **Direction-aware?** yes/no — if yes, does the finding confirm both directions, or
  only comment on one? (Dossier rules 3c, 9, 10, 12, 13, 16 are direction-aware by
  design — a finding that only addresses one direction needs a follow-up question
  before you touch the other direction's behavior.)
- **Source cited by mechanic:** <shop experience / cites a manufacturer doc / cites a
  specific bike-check story — note which; "shop experience" alone is still valid input
  but treat a finding that CONTRADICTS an existing cited manufacturer source (e.g.
  overturning rule 5's SRAM-documented backward-compatibility refutation) as needing a
  second source before acting, same bar as adding a new rule from scratch>
- **Catalog rows affected:** <none / list ids, or "systemic — affects category X">
- **Is this a NEW rule, a TIER change, a WORDING change, a SCOPE narrowing/widening,
  or REVERSING a documented non-rule?**
  (Reversing a "please confirm, don't fix" non-rule is the highest-scrutiny case —
  it means the dossier's own prior refutation was wrong. Re-verify the original
  refutation's source before overturning it, and update the dossier's Known Non-Rules
  section, not just the code.)
- **`ruleId` impact:** new ruleId needed? existing ruleId's tier or slots changing
  (breaks `test-verdict-identity.js` pins — must update deliberately, not silently)?
- **ALIASES / id migration impact:** none / <describe>
- **Vocab (`schema.js`) impact:** none / <new VOCAB entries needed>
- **Tests to add/change:**
  - `test-engine.js`: <new test name(s) — one per direction if direction-aware>
  - `test-golden.js`: <does any golden build need re-checking? NEVER weaken its
    assertion to make this pass — if a golden build starts failing, the golden
    build's parts are wrong, fix the catalog row instead>
  - `test-greying.js`: <only if the dot state (g/w/r/n) for a real catalog pair changes>
  - `test-verdict-identity.js`: <only if ruleId/slots shape changes for a pinned rule>
  - `test-invariants.js`: <no new tests here — just re-run after the edit>
- **Docs to update after landing:** `EXPERT-REVIEW-DOSSIER.md` (mark ✓/✗/~ + resolution),
  `CLAUDE.md`'s "Compatibility engine" section if the rule count/description changed,
  `NEXT-STEPS.md` if it was queued there.
- **Priority:** <mechanic's own ranking if given, else: error-tier corrections first
  (false "won't fit" or false "fits" on something that ships today) > warning/info
  wording > dormant-rule activation > net-new gap coverage>
```

---

## 3. Fast-apply checklist

Apply findings **one at a time**, smallest safe batch = one dossier rule area (its
sub-checks a/b/c may land together if they're the same finding). Do not batch unrelated
rule areas into one commit — the golden rule ("after ANY change to `compat.js` or
`schema.js`, run `node validate.js` AND `npm test`, both must pass before committing")
applies per change, and small commits keep a bad finding easy to isolate/revert.

1. **Fill in the triage template** (§2) for the finding before editing anything.
2. **Re-read the dossier's own framing for that rule** — the "Ask" line at the end of
   each rule section tells you exactly what the mechanic was asked to confirm; don't
   over-apply a finding beyond what was actually asked.
3. **If the finding reverses a "please confirm, don't fix" non-rule** (dossier's
   Deliberate NON-rules section), stop and re-verify the original refutation's cited
   source is actually wrong/inapplicable — don't just trust the new finding over an
   already-sourced refutation without checking why they disagree.
4. **Locate the exact rule** via §1's table — grep the `ruleId` string in `src/compat.js`
   to confirm the line number still matches (catalog/engine edits since 2026-07-07 may
   have shifted lines).
5. **Edit `compat.js`** (rule logic) and/or `schema.js` (if new fields/vocab needed) and/or
   catalog rows (if the finding is really "this specific part's data is wrong," not an
   engine-rule problem — those are two different fixes, don't conflate them).
   - Preserve the direction-awareness pattern already used throughout the engine
     (see rules 9/10/12/13/16 for the established idiom: real-world physical asymmetry
     → different tiers per direction, never a single symmetric check).
   - If deactivating/dormant-marking a rule for lack of data (per the rule-18 template
     described in CLAUDE.md's "Coverage roadmap"), land it dormant with tests proving
     silence-without-data, same as the existing dormant rules (12b, 14b, 16b coil,
     min-rotor without sourced data).
6. **Add/update tests FIRST if practical (or immediately after) — never weaken an
   existing test to make a change pass.** If a test's assertion looks wrong in light of
   the finding, that's itself a triage item (new finding: "test encodes the wrong
   belief"), not something to quietly edit away.
7. **Run all three gates:**
   ```
   node validate.js       # must stay "0 problems"
   npm test                # every test passes, including golden builds
   npm run typecheck       # tsc --noEmit, no output
   ```
8. **If a golden build (`test-golden.js`) now fails:** determine whether the golden
   build's catalog parts are wrong (fix the catalog row, keep the tightened rule) or the
   rule is too aggressive for a real bike (loosen the rule, re-triage). Never adjust the
   golden build's *expected* zero-errors/zero-warnings assertion to accommodate a new
   true-positive — that assertion is the whole point of the file.
9. **Update `EXPERT-REVIEW-DOSSIER.md`** inline: mark the rule ✓/✗/~ with the resolution
   noted, so the dossier stays the durable record of what was asked and what was decided
   (mirrors how rule 5's refutation and REVIEW.md's Criticals/Majors are already recorded
   in-repo rather than lost in chat).
10. **Commit the engine/schema/catalog edit + its tests together**, one dossier finding
    per commit where practical, with a message naming the dossier rule # (e.g. "Rule 9:
    tighten CL-rotor adapter warning to one-piece rotors only, per mechanic review").
11. **Update `CLAUDE.md`'s "Compatibility engine" section** if the finding changed rule
    count, tier, or the one-line description of what a rule checks — that section is
    meant to stay accurate as the map of the engine.
12. Repeat from step 1 for the next finding. Batch only truly independent findings in
    parallel (different rule areas, no shared catalog rows) — if running multiple
    sessions in parallel, **each session MUST use its own git worktree**
    (`claude --worktree` / EnterWorktree); do not run parallel sessions against the
    shared checkout.

### Priority order across findings (once all are triaged)

1. Any finding marked ✗ on an **error**-tier rule (a false "won't fit" or a false "fits"
   ships today) — these are the highest-cost mistakes per the dossier's own framing.
2. Any finding marked ✗ on a **warning**-tier rule.
3. Tier changes (~ verdicts proposing error↔warning↔info moves).
4. Wording/scope fixes that don't change behavior (safe to batch several together).
5. Activating a dormant rule with newly-confirmed real-world backing (still needs sourced
   data per-part, per the existing dormant-rule convention — a mechanic's general
   confirmation of the *rule* doesn't substitute for sourced *data* on which frames/forks
   it applies to).
6. Net-new rules for gaps the mechanic ranked as dangerous (see the dossier's Known Gaps
   table) — these need the most design work (new schema fields, new vocab, catalog
   backfill) and should follow the existing "land dormant, activate per-part as data
   arrives" template rather than shipping a rule with unsourced heuristics.
