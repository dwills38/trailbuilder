# CLAUDE.md — TrailBuilder

Context for Claude Code working on this project. Read this before making changes.

## What this is

TrailBuilder is a "PCPartPicker for enduro mountain bikes": pick parts and it checks, in
real time, whether they fit together, plus running price and weight. It's an early
prototype that runs entirely in the browser from a small built-in catalog.

**All catalog specs, prices and weights are SAMPLE DATA — approximate and unverified.**
Do not present them as real. See "Provenance" below.

## Files (src/ + test/ layout — these are the project)

Entry points (`tests.js`, `validate.js`, `index.html`) live at the root; the library
lives in `src/`; the test modules live in `test/`.

| File | Purpose |
|------|---------|
| `index.html` | The app (UI). Plain HTML/CSS/JS, no build step. Loads `src/compat.js` via `<script>`. Open by double-click. |
| `src/compat.js` | The catalog data (`PARTS`) **and** the compatibility engine (`checkBuild`) + helpers (`compatOf`, `buildTotals`). The heart of the project. |
| `src/schema.js` | Data schema + validator. The single source of truth for "valid data". |
| `src/types.js` | Shared JSDoc `@typedef`s — a per-category discriminated union for `Part`, plus `Build`/`Group`/etc. (type-checking only; no runtime code). Mirrors `schema.js`. |
| `validate.js` | CLI: `node validate.js` — checks the whole catalog. |
| `tests.js` | CLI: `node tests.js` — runs the whole suite. |
| `test/test-harness.js` | Tiny zero-dependency test runner. |
| `test/test-util.js` | Shared test helpers (`C`, `B(map)`). |
| `test/test-data.js` | Asserts the catalog passes the validator. |
| `test/test-schema.js` | Proves the validator catches bad data (negative tests). |
| `test/test-engine.js` | Each compatibility rule fires when it should. |
| `test/test-greying.js` | The green/red/grey compatibility dots. |
| `test/test-pricing.js` | Bundle (groupset) pricing + weight totals. |
| `test/test-golden.js` | Whole real bikes that must validate clean; a known-bad build that must fail. |
| `package.json` | Scripts: `test`, `validate`, `typecheck`. Dev-only deps: `typescript`, `@types/node`. |
| `tsconfig.json` | Type-check config (`checkJs`, `noEmit`). Drives `npm run typecheck`; produces no build output. |
| `README.md`, `Getting-Started-Roadmap.md` | Docs. |

(Stray files like `test_compat.js` or `test2.js` from earlier sessions are NOT part of the project; delete them.)

## How to run

Requires [Node.js](https://nodejs.org) 18+.

```
node tests.js       # full suite — expect "PASSED - N passed, 0 failed"
node validate.js    # data check — expect "DATA OK - 105 parts, 0 problems"
```

(or `npm test` / `npm run validate`). To run the app, open `index.html` in a browser.

### Type-checking (optional, no build step)

The plain JS is type-checked via JSDoc + `checkJs`. One-time `npm install` (pulls the
dev-only `typescript` + `@types/node`), then:

```
npm run typecheck   # tsc --noEmit — expect no output, exit 0
```

It compiles and ships nothing; it only reads the JSDoc types. Shared `@typedef`s live in
`src/types.js` — `Part` is a per-category discriminated union that mirrors `schema.js`.

## The golden rule

**After ANY change to `src/compat.js` or `src/schema.js`, run `node validate.js` AND `node tests.js`. Both must pass before committing.** The whole value of this product is that a "compatible" verdict is true, so the suite is the guardrail — never weaken a test to make a change pass; fix the change.

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

## Pricing & weight

`buildTotals(build, presetBy)`: a group whose slots exactly match a chosen preset is billed
and weighed as the **bundle**; swap any single part and that group reverts to summing
components. `presetBy` maps groupKey → preset id.

## Provenance

Parts may carry `verified: true` + `lastChecked: "YYYY-MM-DD"` + `source: "https://…"`.
Absence = unverified (the current default for ALL parts). The validator **refuses
`verified: true` without a real source URL and a non-future date** — so "verified" always
means something. When you actually confirm a spec against a manufacturer page, add those
three fields.

## Conventions

- Plain browser JavaScript (`var`/`function`), **no build step** — `index.html` loads `src/compat.js`
  directly. Type-checking is JSDoc-only (`npm run typecheck`); keep shipping plain JS (no bundler/transpile).
- `schema.js` is the one definition of valid data; the tests delegate to it. Extend the schema
  when you add fields, don't scatter ad-hoc checks.
- When you add or rename a part field, update BOTH `schema.js` (runtime validator) and `src/types.js`
  (the JSDoc `Part` type) so the validator and `npm run typecheck` stay in agreement.
- Keep the UI logic and the engine sharing `compatOf`/`buildTotals` from `compat.js` (don't fork them).

## Roadmap / good next tasks

1. ✅ **Reorganized into `src/` + `test/`** with `git init` + an initial commit (done — the flat layout was forced by the tool that created it). Entry-point CLIs stay at the root so `node tests.js` / `node validate.js` still work.
2. ✅ **TypeScript type-checking without a build step** (done): JSDoc types in `src/types.js`,
   a `tsconfig.json` with `checkJs`/`noEmit`, and `npm run typecheck` (`tsc --noEmit`). Still plain
   JS — nothing is compiled or shipped. Full `strict` is on, and `Part` is a per-category
   discriminated union (keyed by `cat`), so tsc catches a part missing a required field, a part
   carrying another category's field, or the wrong category dropped into a build slot.
3. Switch the home-grown runner to **Vitest** + a GitHub Actions CI that runs validate + tests.
4. Then start adding **real, verified** manufacturers/parts (set the provenance fields).
5. Parked: **ride categories** (enduro / trail / downhill) to filter the catalog by discipline;
   mullet is already supported.
6. Later: accounts + saved builds (Supabase/Firebase), price feeds via retailer affiliate programs, deploy.
