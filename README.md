# TrailBuilder

A "PCPartPicker for enduro mountain bikes" — pick parts, and it checks in real time
whether they actually fit together. Early prototype.

> **Sample data warning:** specs and prices in `src/compat.js` are illustrative sample data —
> approximate and unverified — **except** the handful of parts now marked `verified` (checked
> against manufacturer pages, with a `source` link). Don't rely on the rest until it's been
> checked. `node validate.js` reports how many parts are verified.

## What's here

| File | What it is |
|------|------------|
| `index.html` | The app. Double-click to open in any browser — no install. |
| `src/compat.js` | The catalog data **and** the compatibility engine + helpers. The heart of the project. |
| `src/schema.js` | The data schema + validator: defines what a valid part is and rejects malformed data. |
| `src/types.js` | Shared JSDoc type definitions (for `npm run typecheck`; no runtime code). |
| `validate.js` | Command-line data check (`npm run validate`). |
| `vitest.config.mjs` | Vitest config (the test runner). |
| `test/test-util.js` | Shared test helpers + the `eq`/`ok`/`some` assertions. |
| `test/test-data.js` | Asserts the real catalog passes the schema validator. |
| `test/test-schema.js` | Proves the validator catches bad data (negative tests). |
| `test/test-engine.js` | Checks each compatibility rule fires when it should. |
| `test/test-greying.js` | Checks the green/red/grey compatibility dots. |
| `test/test-pricing.js` | Bundle (groupset/wheelset/etc.) pricing and weight totals. |
| `test/test-golden.js` | Whole real bikes that must pass; a known-bad build that must fail. |
| `tsconfig.json` | Type-check settings (`checkJs` + `noEmit`) for `npm run typecheck`. |
| `.github/workflows/ci.yml` | CI: runs validate + tests + typecheck on every push and PR. |
| `Getting-Started-Roadmap.md` | The bigger-picture plan. |

## Run the app

Open `index.html` in a browser. Keep the `src/` folder next to it — the app loads `src/compat.js`.

## Run the tests

The tests run on [Vitest](https://vitest.dev). You need [Node.js](https://nodejs.org);
install the dev tooling once (`npm install`), then from this folder:

```
npm test
```

You'll see a summary like `Tests  64 passed (64)`. It exits non-zero if anything fails, so
it also works in CI. `npm run test:watch` re-runs on save while you work.

**Add a part or change a rule, then run the tests.** If you broke something that used to
work — a real bike no longer validates, a rule stopped firing — the suite tells you
immediately instead of a user finding out.

## Check the data

```
node validate.js
```

(or `npm run validate`). This runs the schema validator over the whole catalog and
reports anything malformed — a missing field, a value that isn't a real standard, a
misspelled field name, a preset pointing at the wrong part, a groupset that mixes
SRAM and Shimano, and so on. It exits non-zero on any problem, so run it before
committing data changes. (The test suite runs it too.)

### Marking a part as verified

Every spec is **unverified** until proven. When you've checked a part against a real
source, add three fields to it in `src/compat.js`:

```js
verified: true,
lastChecked: "2026-06-21",
source: "https://www.manufacturer.com/the-spec-page"
```

The validator refuses `verified: true` without a real `http(s)` source and a
`lastChecked` date that isn't in the future — so "verified" always means something.

## Type-check the code (optional)

The code is plain JavaScript, but it's annotated with JSDoc types and checked by
TypeScript's `tsc` — no build step, nothing compiled, nothing shipped. Install the
dev tooling once (`npm install` — pulls `typescript`, `@types/node`, and `vitest`), then:

```
npm run typecheck
```

No output means success. It runs in full `strict` mode, and because each part category is
its own type (a discriminated union keyed by `cat`), it catches mistakes like a misspelled
field name, a price written as a string, a wheel size that isn't a real value, a fork
carrying a frame-only field, or the wrong part dropped into a build slot — as you type,
before the runtime validator ever runs. The shared type definitions live in `src/types.js`
and mirror `src/schema.js`; update both when you add a field.

## Continuous integration

Once the repo is on GitHub, `.github/workflows/ci.yml` runs the catalog validator, the
test suite, and the type-check on every push and pull request. Any failure fails the
build, so broken data, a broken rule, or a type error can't land unnoticed.

## Put it under version control

From this folder, one time:

```
git init
git add .
git commit -m "TrailBuilder prototype + test suite"
```

After that, `git add . && git commit -m "..."` after each change keeps a full history you
can roll back. Pushing to a free GitHub repo also gets you free hosting (GitHub Pages) and
a place a collaborator or coding assistant can work.

## Deploy (GitHub Pages)

The app is plain static files (no build step), so it hosts on GitHub Pages for free.
`.github/workflows/deploy.yml` publishes `index.html` + `src/` on every push to `main` —
but only after `validate` and the tests pass, so a broken build never goes live.

One-time setup:

1. Create a GitHub repo and push (it must be **public** for free Pages):

   ```
   gh repo create trailbuilder --public --source=. --push
   ```

   (or make an empty repo on github.com, then `git remote add origin <url>` and
   `git push -u origin main`).

2. In the repo: **Settings → Pages → Build and deployment → Source: “GitHub Actions”**.

The next push then deploys, and the site goes live at
`https://<your-user>.github.io/trailbuilder/` (the workflow run summary prints the URL).

## What's next (the "solidify" plan)

1. ✅ Repo + a permanent, runnable test suite.
2. ✅ Data schema + validator, with optional per-part `verified` + `lastChecked` + `source`.
3. ✅ Type-checking via JSDoc + `tsc --noEmit` (`npm run typecheck`) — full `strict`, with `Part` modeled as a per-category discriminated union, so missing / mistyped / cross-category fields are caught as you type. No build step.
4. ✅ Vitest test runner + GitHub Actions CI — `validate` + `tests` + `typecheck` on every push / PR.
5. 🚧 Adding real, verified manufacturers and parts — **7 verified so far** (a full SRAM GX Eagle drivetrain plus an XT cassette and a RockShox shock); the rest is still sample data.
6. 🚧 Deploy so real riders can hammer it — the GitHub Pages workflow is ready (`.github/workflows/deploy.yml`); it just needs a public GitHub remote and Pages enabled (see **Deploy** above).

**Parked (planned, not now):** ride categories — **enduro / trail / downhill** — so the catalog
and compatibility rules can be filtered by discipline.

## Pricing & weight

Each component has a sample `price` and `weight` (grams). Pick a whole kit (groupset / wheelset /
brake set / cockpit) and that group is billed and weighed as the **bundle**; swap any single part
and it reverts to per-part pricing. The build panel shows a running sample total and estimated weight.
