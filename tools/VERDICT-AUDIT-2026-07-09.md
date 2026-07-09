# Verdict Audit — 2026-07-09

**Goal:** hunt the ~1775-part catalog for **wrong compatibility verdicts** — a false
*"fits"* (`checkBuild` comes back clean but the real world says no) or a false
*"won't fit"* (a flag a mechanic would wave through). The bar, from the brief:
**a false "fits" / "won't fit" is worse than a missing part.**

**Scope:** report-only. Nothing in `src/compat.js` (engine or catalog) was changed.
Reproduce everything with `node tools/verdict-audit-harness.js`; regression cases
are in `test/test-verdict-audit.js`.

## Method (5 probes)

| Probe | What it checks | Result |
|-------|----------------|--------|
| **A. Name vs field** | product name (`brand+model`) vs the fields `checkBuild` reads (fork steerer/axle, shifter actuation, tire wheel size…) | **0 flags** |
| **B. Presets** | every one of the 122 curated presets — its own `fills` run through `checkBuild` must raise no error/warning | **0 conflicts** |
| **C. Assemble** | a realistic complete build per frame (nearest-compatible part in every slot) → any error is a false "won't fit" candidate | **124/124 clean** |
| **D. Adversarial** | builds that *must* clash (wrong freehub, non-UDH + Transmission, CL rotor on 6-bolt hub, hardtail + shock…) — a miss is a false "fits" | **9/9 flagged, 0 missed** |
| **E. Rotor-max** | would the *standard* front rotor for a fork's travel class falsely trip rule 10? | **6 fork families false-warn** |

**Headline:** the catalog is in very good shape. No confirmed **false "fits"** (green
that should be red) were found — the engine flagged every adversarial clash, curated
presets are internally clean, and product names agree with the fields that drive
verdicts. The one real, confirmed wrong verdict is a **false "won't fit"–class warning**
(Finding 1) caused by a systematic data-entry conflation on a set of forks.

---

## Findings (most severe first)

### 1. [CONFIRMED] Fork `maxRotorF` holds the *native post-mount* size, not the *maximum* → false `front-rotor-max` warning on ordinary trail/enduro builds

**The verdict that's wrong.** Rule 10 warns when `frontRotor.size > fork.maxRotorF`
("Front rotor: 180mm exceeds the fork max of 160mm."). On a set of forks, `maxRotorF`
was entered as the size the fork's *direct/native* post-mount is cut for — **not** the
largest rotor the fork accepts with the standard post-mount adapter it ships to use. So
the most common real-world rotor choices trip a warning that a mechanic would wave
through.

**Demonstration** (from the harness):

```
Marzocchi Bomber Z2 (140mm) + standard 180mm front rotor
  -> WARN [front-rotor-max] Front rotor: 180mm exceeds the fork max of 160mm.
Marzocchi Bomber Z1 (160mm) + standard 203mm front rotor
  -> WARN [front-rotor-max] Front rotor: 203mm exceeds the fork max of 180mm.
```

A 180 mm front rotor is *the* standard for a trail fork, and 200/203 mm is standard on a
150–170 mm enduro fork — so this fires on the majority of realistic builds that pick
these forks.

**Root cause (a semantic mix-up the catalog documents the right convention for):** the
maker pages state the *shipped* rotor / the *direct-mount* size, then note the real max
needs an adapter. The rows captured the first number as `maxRotorF`:

- Marzocchi Bomber Z2 page: *"ROTOR SIZE: 160mm"* — but a WWC-corroborated search
  confirms **"160mm post mount … max rotor 203mm"** (34 mm chassis, Fox-34 class).
- Manitou Mattoc Pro (Hayes page): *"Post Mount 160mm"* — native; "can accommodate 180 mm
  or 203 mm with a brake adapter."
- Marzocchi Bomber Z1 page: **"180 mm post mount … 203 mm max rotor"** (36 mm chassis).

Compare the catalog's *own* correct convention on the DVO Onyx DC / X-Fusion RV1 rows:
native mount → `minRotorF: 203`, adapter max → `maxRotorF: 220`. These forks did the
inverse — put the native mount into `maxRotorF` and left `minRotorF` unset.

**Affected rows (all `verified: true` — the worst kind, they read as confirmed):**

| Family | Rows | `maxRotorF` (in catalog) | Real max (adapter) | Standard rotor that false-warns |
|--------|------|--------------------------|--------------------|---------------------------------|
| `fk-marzocchi-bomber-z2-*` | 5 | **160** | 203 | 180 mm (every trail build) |
| `fk-manitou-mattoc-pro-*` | 10 | **160** | 180–203 | 180 mm (every trail build) |
| `fk-marzocchi-bomber-z1-*` (150/160 mm) | 2 (of 4) | **180** | 203 | 200/203 mm (enduro builds) |

**Fix (owner):** set `maxRotorF` to the true adapter maximum (203 for the Marzocchi and
Manitou families above) and, following the DVO/X-Fusion precedent, record the native
mount as `minRotorF` (160 / 180) so rule 10's *minimum* check stays honest too. Re-verify
against the maker pages when doing so.

**Severity:** medium. It's a false **warning** (yellow dot), not a false green or a hard
red — but it is a genuinely wrong verdict, it fires on the single most common rotor choice,
and it sits on parts flagged as verified. Ranked #1 because it is the only *confirmed*
wrong verdict in the audit.

---

### 2. [LEAD — same pattern, needs per-fork confirmation] Bigger-chassis forks at `maxRotorF` 180/200

Probe E flags three more families where the standard front rotor for the travel class
would warn. These share the Finding-1 pattern but were not each confirmed against a maker
page, and some are legitimately capped:

| Family | Rows | `maxRotorF` | Likely real max | Confidence |
|--------|------|-------------|-----------------|------------|
| `fk-dvo-onyx-sc-*` (36 mm, 160–180 mm travel) | 6 | 180 | 203+ (sibling Onyx D1 38 is 220) | medium |
| `fk-ohlins-rxf38-*` (38 mm enduro) | 3 | 200 | 203–223 | low–medium (200 vs 203 is marginal) |
| `fk-canecreek-helm-*` | 3 | 200 | 203+ | low–medium |

The 32 mm XC forks that report a 180 cap (`fk-fox-32-sc-*`, `fk-dvo-sapphire-32-*`,
`fk-xfusion-rc32-*`) are **not** flagged as suspect — 180 mm is a realistic ceiling there.

**Action:** verify each family's true max rotor against the maker page; correct any that
capped at the native mount.

---

### 3. [LEAD — low confidence] XC-frame `maxRotorR = 160`

`fr-scott-scale-rc-sl`, `fr-canyon-lux-world-cup-cf`, `fr-mondraker-f-podium` cap the rear
rotor at 160 mm. If that is the *native* mount rather than the frame's real max, an
ordinary 180 mm rear rotor would false-warn (rule 10, `rear-rotor-max`). **However**, XC
race frames genuinely do often cap the rear at 160 mm, so this may be correct as-is. Left
as a lead: confirm against the three maker pages before touching.

---

### 4. [NOT a wrong verdict — coverage note] The one `20x110-nonboost` fork

`fk-marzocchi-bomber-58-*` uses `axle: '20x110-nonboost'`, and **no complete front wheel**
in the catalog carries that hub (every DH front wheel is `20x110` Boost). The
`20x110` vs `20x110-nonboost` split is **correct** — verified against Worldwide Cyclery /
Stan's: the Boost DH hub shifts the rotor 5 mm outboard, so the two are genuinely
non-interchangeable, and the engine's front-axle error is a **true** "won't fit." The fork
is still buildable via the build-your-own-wheel path (`fh-industrynine-hydra2-20x110-nonboost`
+ a rim), so this is at most a minor completeness gap in the *complete-wheel* catalog, not a
wrong verdict. Per the brief's bar, a missing part beats a wrong flag — no action needed.

---

## What held up (negative results worth recording)

These are the places a fast-grown catalog would most likely have broken, and didn't:

- **Drivetrain coherence.** `system ↔ speeds ↔ freehub ↔ actuation` are consistent across
  all shifters/derailleurs/cassettes/chains. The tricky real cases are modelled correctly:
  SRAM **Eagle 90/70** are `sram-transmission` + `actuation: cable` (they really are cable
  Transmission), **AXS Eagle** shares `system: sram-eagle` so it correctly runs mechanical
  Eagle cassettes/chains, and the **X01 DH 7-speed** group is its own `sram-dh-7` system.
- **Axle / freehub / steerer standards are split correctly** — `Boost148` vs
  `SuperBoost157` vs `150x12`, `XD`/`MicroSpline`/`HG`, `20x110` vs `20x110-nonboost`,
  `tapered` vs `straight-dc`. Each real incompatibility produces an error; no conflation
  was found that would let a real clash pass.
- **UDH gate.** 87 frames are `udh: true`; probe C built a Transmission drivetrain onto
  every UDH frame with no false UDH error, and the adversarial probe confirms a Transmission
  derailleur on a non-UDH frame still errors.
- **Direction-aware rules behave** (rotor 6-bolt↔CL, dropper too-big vs shim, shock
  longer↔shorter stroke) — the adversarial probe hits each direction.

## Known, documented gaps (not defects — noted for completeness)

Per `CLAUDE.md`'s coverage roadmap these are deliberate deferrals, so a green verdict does
not cover them: **tire vs internal-rim-width** (too-narrow tire on a wide rim), and
**crankset chainline vs frame (Boost vs SuperBoost)**. Both are correctly *absent* rather
than guessed — a wrong rule would be worse.

## Re-running

```
node tools/verdict-audit-harness.js     # all five probes
npm test                                # includes test/test-verdict-audit.js
```
