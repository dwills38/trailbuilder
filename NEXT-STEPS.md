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

1. **Deploy a beta.** The in-app **"⚐ Report a wrong verdict" button is built** (`index.html`): a modal
   that auto-builds a complete, reproducible report — the verdict shown + the full build list + a
   share link that reopens the exact build — and copies it to the clipboard. **One wiring step left:**
   set `REPORT_REPO` in `index.html` to `"owner/repo"` and the modal *also* offers a pre-filled GitHub
   issue (labelled `wrong-verdict`); until then it falls back to copy-to-clipboard (works locally).
   _Needs you:_ push to GitHub (`gh repo create trailbuilder --public --source=. --push`) and set Pages
   source to "GitHub Actions" (`.github/workflows/deploy.yml` is ready). Real usage is the only thing
   that validates the rules and turns the community into QA.
2. **Domain-expert rule review.** A mechanic/engineer sanity-checks the 17 rules + the verified
   specs. Irreplaceable for "the community can rely on it." _Needs a real wrench._
3. **Then: grow coverage + verified data.** The rear-tire-vs-frame-clearance rule (optional
   `frame.maxTire`) is now **scaffolded + dormant** (rule 18 + tests in `test/test-engine.js`) — the
   only thing left to switch it on is *sourced per-frame `maxTire` data*. Land the other
   data-dependent candidates from CLAUDE.md's "Coverage roadmap" the same way (rule + tests dormant,
   activate on data), and decide the measured-weight source policy that unblocks Shimano / rotors /
   forks.

**The bar, always:** a wrong verdict (false "fits" OR false "won't fit") is worse than a missing
rule. Only add rules backed by manufacturer docs + tests, and keep `npm test`, `node validate.js`,
and `npm run typecheck` green on every change.
