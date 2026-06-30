# Where we are + next steps

_A living snapshot. Architecture/conventions live in `CLAUDE.md`; full history in `git log`._

## Where we are (as of 2026-06-30)

TrailBuilder — "PCPartPicker for enduro mountain bikes": pick parts, get real-time
fit / price / weight checks. Plain static app (`index.html` + `src/`), no build step.

**Solid foundation, honestly-scoped prototype:**

- **Layout & tooling:** `src/` + `test/`; full-`strict` JSDoc type-checking (`npm run typecheck`);
  Vitest (`npm test` — **83 tests**); GitHub Actions CI; and a GitHub Pages deploy workflow that's
  ready but **not yet deployed** (no git remote / `gh` in this environment).
- **Engine:** 17 compatibility rules + a regression/fuzz **fortress** (`test/test-invariants.js`),
  proven crash-free and deterministic. Verdicts are *self-consistent* — **not yet validated against
  the real world** (no expert review, no real riders).
- **Data:** 105 parts, **11 verified** against manufacturer pages (most of two SRAM drivetrains);
  the rest is clearly-badged sample data. Provenance shows in the app (✓ Verified badges with
  source links + an "✓ Verified only" filter). The all-clear reads "No conflicts found", not
  "All compatible" — on purpose.
- **Try it:** open `TrailBuilder-sample.html` (generated standalone, double-click) or `index.html`.

## Next 1–3 steps (priority order)

1. **Deploy a beta + add an in-app "report a wrong verdict / part" button.** Real usage is the only
   thing that validates the rules and turns the community into QA. _Needs you:_ push to GitHub
   (`gh repo create trailbuilder --public --source=. --push`) and set Pages source to "GitHub
   Actions" (`.github/workflows/deploy.yml` is ready). The report-issue mechanism can be built now so
   it ships with the first deploy.
2. **Domain-expert rule review.** A mechanic/engineer sanity-checks the 17 rules + the verified
   specs. Irreplaceable for "the community can rely on it." _Needs a real wrench._
3. **Then: grow coverage + verified data.** Add the data-dependent rules from CLAUDE.md's "Coverage
   roadmap" (e.g. optional `frame.maxTire` + a rear-tire-clearance check), and decide the
   measured-weight source policy that unblocks Shimano / rotors / forks.

**The bar, always:** a wrong verdict (false "fits" OR false "won't fit") is worse than a missing
rule. Only add rules backed by manufacturer docs + tests, and keep `npm test`, `node validate.js`,
and `npm run typecheck` green on every change.
