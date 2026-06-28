# CLAUDE.md — TrailBuilder

Context for Claude Code working on this project. Read this before making changes.

## What this is

TrailBuilder is a "PCPartPicker for enduro mountain bikes": pick parts and it checks, in
real time, whether they fit together, plus running price and weight. It's an early
prototype that runs entirely in the browser from a small built-in catalog.

**Catalog specs, prices and weights are SAMPLE DATA — approximate and unverified — except
the few parts that carry provenance fields (`verified:true` + `source`).** Do not present
unverified specs as real. See "Provenance" below.

## Files (src/ + test/ layout — these are the project)

Entry points (`validate.js`, `index.html`) live at the root; tests run on Vitest
(`npm test`); the library lives in `src/`; the test modules live in `test/`.

| File | Purpose |
|------|---------|
| `index.html` | The app (UI). Plain HTML/CSS/JS, no build step. Loads `src/compat.js` via `<script>`. Open by double-click. |
| `src/compat.js` | The catalog data (`PARTS`) **and** the compatibility engine (`checkBuild`) + helpers (`compatOf`, `buildTotals`). The heart of the project. |
| `src/schema.js` | Data schema + validator. The single source of truth for "valid data". |
| `src/types.js` | Shared JSDoc `@typedef`s — a per-category discriminated union for `Part`, plus `Build`/`Group`/etc. (type-checking only; no runtime code). Mirrors `schema.js`. |
| `validate.js` | CLI: `node validate.js` — checks the whole catalog. |
| `vitest.config.mjs` | Vitest config — points the runner at `test/test-*.js` and enables globals. |
| `test/test-util.js` | Shared test helpers: `C`, `B(map)`, `part(id)`, and the `eq`/`ok`/`some` assertions. |
| `test/test-data.js` | Asserts the catalog passes the validator. |
| `test/test-schema.js` | Proves the validator catches bad data (negative tests). |
| `test/test-engine.js` | Each compatibility rule fires when it should. |
| `test/test-greying.js` | The green/red/grey compatibility dots. |
| `test/test-pricing.js` | Bundle (groupset) pricing + weight totals. |
| `test/test-golden.js` | Whole real bikes that must validate clean; a known-bad build that must fail. |
| `package.json` | Scripts: `test` (Vitest), `test:watch`, `validate`, `typecheck`. Dev-only deps: `vitest`, `typescript`, `@types/node`. |
| `tsconfig.json` | Type-check config (`checkJs`, `noEmit`). Drives `npm run typecheck`; produces no build output. |
| `.github/workflows/ci.yml` | GitHub Actions CI — runs `validate`, `tests`, and `typecheck` on every push / PR. |
| `.github/workflows/deploy.yml` | GitHub Actions — deploys the static app (`index.html` + `src/`) to GitHub Pages on push to `main`, after `validate` + `tests` pass. Needs a public remote + Pages source = "GitHub Actions". |
| `README.md`, `Getting-Started-Roadmap.md` | Docs. |

(Stray files like `test_compat.js` or `test2.js` from earlier sessions are NOT part of the project; delete them.)

## How to run

Requires [Node.js](https://nodejs.org) 18+. Run `npm install` once (dev tooling for the
tests + type-checker; `validate.js` itself needs no dependencies).

```
npm test            # full suite (Vitest) — expect "Tests  64 passed (64)"
node validate.js    # data check — expect "DATA OK - 105 parts, 0 problems"
```

(`npm run validate` works too; `npm run test:watch` re-runs Vitest on save.) To run the
app, open `index.html` in a browser.

### Type-checking (optional, no build step)

The plain JS is type-checked via JSDoc + `checkJs`. One-time `npm install` (pulls the
dev dependencies — `typescript`, `@types/node`, `vitest`), then:

```
npm run typecheck   # tsc --noEmit — expect no output, exit 0
```

It compiles and ships nothing; it only reads the JSDoc types. Shared `@typedef`s live in
`src/types.js` — `Part` is a per-category discriminated union that mirrors `schema.js`.

## The golden rule

**After ANY change to `src/compat.js` or `src/schema.js`, run `node validate.js` AND `npm test`. Both must pass before committing.** The whole value of this product is that a "compatible" verdict is true, so the suite is the guardrail — never weaken a test to make a change pass; fix the change.

## Data model (what a part looks like)

Every part: `id, cat, brand, model, price` (USD, sample), and usually `weight` (grams, sample).
Category-specific fields (enforced by `schema.js` → `SCHEMA`, using vocabularies in `VOCAB`):

- **frame**: `wheelConfigs` (array of `'29'`/`'275'`/`'mullet'`), `rearAxle`, `headset`, `bb`, `seatTube`, `brakeMount`, `maxRotorR`, `shockEye`, `shockStroke`, `shockMount`, `maxForkTravel`, `travel`, `udh` (bool), `frameOnly` (bool), `bundledShock` (id or null).
- **fork**: `wheel`, `travel`, `axle`, `steerer`, `brakeMount`, `maxRotorF`.
- **shock**: `eye`, `stroke`, `mount`, `spring`; optional `oemOnly` + `forFrame`.
- **frontwheel / rearwheel**: `wheel`, `hub`, (`freehub` rear only), `rotorMount`, `intWidth`, `maxTire`.
- **tire**: `wheel`, `width`. (Front and rear tires are separate build slots, both drawn from `cat:'tire'`.)
- **shifter / derailleur / cassette / chain**: `system` (`sram-eagle`/`sram-transmission`/`shimano-12`), `speeds`; derailleur also `maxCog`,`mount`; cassette also `freehub`,`range`,`maxCog`.
- **crankset**: `bb`, `ring`, `speeds`.
- **brake**: `mount`, `pistons`.   **rotor**: `size`, `mount`.
- **handlebar/stem**: `clamp` (+ optional dims).  **grips/saddle**: just the common fields.
- **dropper**: `diameter`, `drop`.
- **presets** (`groupset`/`wheelset`/`brakeset`/`cockpitset`): `price`, `weight`, and `fills` (slotKey → part id).

### Build slots

A build is a map of slotKey → part id. Slots: `frame, fork, shock, frontWheel, rearWheel,
frontTire, rearTire, shifter, derailleur, cassette, chain, crankset, frontBrake, rearBrake,
frontRotor, rearRotor, handlebar, stem, grips, dropper, saddle`. (`GROUPS`/`SLOTS` in `compat.js`.)

## Compatibility engine (`checkBuild`) — 17 rule areas

Wheel-size by front/rear group vs frame `wheelConfigs` (incl. mullet = 29 front / 27.5 rear);
front & rear axles; drivetrain one-system + one-speed; SRAM Transmission needs a UDH frame;
cassette range vs derailleur capacity; cassette freehub vs rear wheel; brake caliper mounts;
rotor interface (6-bolt/Center Lock) vs hub; rotor size vs frame/fork max; steerer/headset;
fork travel vs frame max; dropper diameter vs seat tube; tire width vs wheel clearance;
bar/stem clamp; rear-shock fit (eye×stroke + mount); frame+shock bundling (incl. OEM-only).
Returns `{errors, warnings, infos}`. Errors = won't fit; warnings = works but check; infos = notes.
(The all-clear in the app reads "No conflicts found", not "All compatible" — it means no conflict
among the dimensions we check, not a guarantee. Don't reword it to overclaim.)

### Coverage roadmap (candidate rules — evaluated, deliberately deferred)

The engine only checks the dimensions above; a green verdict is only as complete as that list.
**The bar for adding a rule: it must be backed by manufacturer compatibility docs and tested — a
false "won't fit" OR a false "fits" is worse than a missing rule.** Candidates considered:

- **Frame rear-tire clearance** (`rTire.width` vs a new optional `frame.maxTire`): a real gotcha,
  but needs per-frame clearance data we don't have. Safe to add as an optional warning once the
  data exists (dormant until then).
- **Tire vs internal-rim-width range** (too-narrow tire on a wide rim): real, but the thresholds
  are fuzzy/standards-dependent — needs sourcing; would be a soft warning.
- **Oversize-rotor adapter** needed when a rotor exceeds the native mount: today rule 10 already
  *warns* on exceeding the max; an adapter *info* could be added. Low priority.
- **Crankset chainline vs frame (Boost vs SuperBoost) — REJECTED for now.** Too nuanced: our own
  `fr-enduro` (Specialized Enduro) is SuperBoost-157 yet intentionally uses a Boost-chainline
  crank, so a naive "SuperBoost frame needs a SuperBoost crank" rule would fire a FALSE error.
  Needs real per-frame data + domain-expert input before it's safe.

Tests + types + the validator catch regressions and crashes (see `test/test-invariants.js`), but
they prove the engine is *self-consistent*, not that the rules are *right for the real world* —
that needs a mechanic/engineer review and real-rider feedback.

## Pricing & weight

`buildTotals(build, presetBy)`: a group whose slots exactly match a chosen preset is billed
and weighed as the **bundle**; swap any single part and that group reverts to summing
components. `presetBy` maps groupKey → preset id.

## Provenance

Parts may carry `verified: true` + `lastChecked: "YYYY-MM-DD"` + `source: "https://…"`.
Absence = unverified (still the default for most of the catalog; **11 parts are verified so
far** — the full SRAM GX Eagle mechanical drivetrain (`ca-sram-e`, `dr-gx-m`, `cr-gx`,
`ch-eagle`, `sft-gx-m`), most of the GX Eagle Transmission drivetrain (`dr-gx-t`, `ca-sram-t`,
`ch-flattop`, `cr-x0t` — the AXS pod `sft-gx-t` has no clean model page so it stays sample),
plus `ca-xt` and `sh-sd-air` — checked against manufacturer pages). The
validator **refuses `verified: true` without a real source URL and a non-future date** — so
"verified" always means something. When you actually confirm a spec against a manufacturer
page, set the fields to match the source and add those three fields. (`node validate.js`
reports the verified/unverified counts.)

**Verifiability by brand (learned the hard way — saves re-discovering it):** SRAM publishes
exact component weights on its model pages (`sram.com/en/sram/models/<slug>`), so SRAM
drivetrain is cleanly verifiable. **Shimano does NOT publish component weights**, and **SRAM
does not publish *rotor* weights** — for those, interfaces can be confirmed but the weight
can't, so they stay unverified (e.g. `cr-xt`, the HS2 rotors). Forks/frames are
year-variable, and tires/brakes are casing/config-dependent, so their weights are ambiguous
too. **Open product decision:** whether to accept a reputable third-party *measured* weight
as a source so a part can count as verified (today the bar is "manufacturer page only").
The `✓ Verified only` filter in the app (built on `partVerified`) shows just the verified set.

## Conventions

- Plain browser JavaScript (`var`/`function`), **no build step** — `index.html` loads `src/compat.js`
  directly. Type-checking is JSDoc-only (`npm run typecheck`); keep shipping plain JS (no bundler/transpile).
- `schema.js` is the one definition of valid data; the tests delegate to it. Extend the schema
  when you add fields, don't scatter ad-hoc checks.
- When you add or rename a part field, update BOTH `schema.js` (runtime validator) and `src/types.js`
  (the JSDoc `Part` type) so the validator and `npm run typecheck` stay in agreement.
- Keep the UI logic and the engine sharing `compatOf`/`buildTotals` from `compat.js` (don't fork them).

## Roadmap / good next tasks

1. ✅ **Reorganized into `src/` + `test/`** with `git init` + an initial commit (done — the flat layout was forced by the tool that created it). `validate.js` stays a root CLI; the test runner later moved to Vitest (`npm test`).
2. ✅ **TypeScript type-checking without a build step** (done): JSDoc types in `src/types.js`,
   a `tsconfig.json` with `checkJs`/`noEmit`, and `npm run typecheck` (`tsc --noEmit`). Still plain
   JS — nothing is compiled or shipped. Full `strict` is on, and `Part` is a per-category
   discriminated union (keyed by `cat`), so tsc catches a part missing a required field, a part
   carrying another category's field, or the wrong category dropped into a build slot.
3. ✅ **Vitest + GitHub Actions CI** (done): the home-grown runner is replaced by **Vitest**
   (`npm test`, config in `vitest.config.mjs`), and `.github/workflows/ci.yml` runs
   `validate` + `tests` + `typecheck` on every push / PR.
4. 🚧 **Adding real, verified parts** (in progress): 11 verified so far — the SRAM GX Eagle
   mechanical drivetrain and most of the GX Eagle Transmission drivetrain, plus a Shimano XT
   cassette and a RockShox shock. Forks are
   deliberately still flagged (weights couldn't be pinned reliably — e.g. RockShox's page lists
   the ZEB 170 at 2550 g vs the ~2100 g cited elsewhere). Set `verified`/`lastChecked`/`source`
   and fix wrong sample specs while you're there; most of the catalog is still sample data.
5. Parked: **ride categories** (enduro / trail / downhill) to filter the catalog by discipline;
   mullet is already supported.
6. 🚧 **Deploy** — a GitHub Pages workflow (`.github/workflows/deploy.yml`) is ready; push to a
   public GitHub remote and set Pages source to "GitHub Actions" to go live. Later: accounts +
   saved builds (Supabase/Firebase), price feeds via retailer affiliate programs.
