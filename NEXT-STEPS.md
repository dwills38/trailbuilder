# Where we are + next steps

_A living snapshot. Architecture/conventions live in `CLAUDE.md`; full history in `git log`._

## Where we are (as of 2026-07-06)

TrailBuilder — "PCPartPicker for enduro mountain bikes": pick parts, get real-time
fit / price / weight checks. Plain static app (`index.html` + `src/`), no build step.

**Solid foundation, honestly-scoped prototype:**

- **Layout & tooling:** `src/` + `test/`; full-`strict` JSDoc type-checking (`npm run typecheck`);
  Vitest (`npm test` — **91 tests**); GitHub Actions CI; and a GitHub Pages deploy workflow that's
  ready but **not yet deployed** (no git remote / `gh` in this environment).
- **Engine:** 18 compatibility rules + a regression/fuzz **fortress** (`test/test-invariants.js`),
  proven crash-free, deterministic, and now **dot-honest** — a false-green preset dot (a "fits" that
  didn't) was found by audit and fixed, and an invariant guarantees a green dot never hides a
  newly-introduced conflict, plus clean verdict messages (no `undefined`/`NaN`). Verdicts are
  *self-consistent* — **not yet validated against the real world** (no expert review, no real riders).
- **Data:** 326 parts across ~100 brands with **38 verified** against manufacturer pages —
  verification is now a **resumable checkpointed job** (`tools/verify-job.js` +
  `tools/VERIFY-PROTOCOL.md`; any session/model resumes via `npm run verify:status`). (SRAM
  GX/X01/NX Eagle + most Transmission drivetrain parts, two RockShox shocks, a Shimano XT
  cassette, seven pedals, Synthesis wheels, four droppers, + the RAAW Madonna frame); the rest is
  clearly-badged sample data. **2026-07-06 data-integrity sweep:** all 19 wheel families' interfaces
  web-checked (2 wrong: Synthesis rear width, Bontrager stock freehub), dropper/cockpit specs
  spot-checked (PNW Loam 170 didn't exist → 175), and **rule 18 is ACTIVE on 6 frames** with
  manufacturer-published tire clearances (dormant on the 13 that don't publish one). **All 19
  frames' verdict-driving specs (axle, shock size/mount, UDH, BB, seat tube) were web-sourced
  2026-07-01** — 14 frames had wrong sample specs fixed (notably: the Specialized Enduro is Boost
  148 + UDH + 205x60 trunnion, not SuperBoost; the Madonna V2.2 is 29-only and NOT UDH stock).
  Weights/prices remain approximate. Provenance shows in the app (✓ Verified badges with source
  links + an "✓ Verified only" filter). The all-clear reads "No conflicts found", not "All
  compatible" — on purpose.
- **UI:** category chips + **sub-category chips** (e.g. Drivetrain → Groupset/Shifter/…), a **Sort
  menu** (best match / name / price / weight), search, an "✓ Verified only" filter, kit quick-fill
  with bundle pricing, shareable build links, four demo builds, the **⚐ Report a wrong verdict**
  modal (see step 1), and a **📋 View complete build** summary modal that appears once every
  required slot is filled (full part list w/ kit pricing + totals + copy/share).
- **Try it:** open `index.html` (double-click — no build step). (`TrailBuilder-sample.html` is a
  stale generated snapshot from an early session — don't trust it; safe to delete.)

## Next 1–3 steps (priority order)

1. **Deploy a beta.** The in-app **"⚐ Report a wrong verdict" button is built** (`index.html`): a modal
   that auto-builds a complete, reproducible report — the verdict shown + the full build list + a
   share link that reopens the exact build — and copies it to the clipboard. **One wiring step left:**
   set `REPORT_REPO` in `index.html` to `"owner/repo"` and the modal *also* offers a pre-filled GitHub
   issue (labelled `wrong-verdict`); until then it falls back to copy-to-clipboard (works locally).
   _Needs you:_ push to GitHub (`gh repo create trailbuilder --public --source=. --push`) and set Pages
   source to "GitHub Actions" (`.github/workflows/deploy.yml` is ready). Real usage is the only thing
   that validates the rules and turns the community into QA.
2. **Domain-expert rule review.** A mechanic/engineer sanity-checks the 18 rules + the verified
   specs. Irreplaceable for "the community can rely on it." _Needs a real wrench._
3. **Then: grow coverage + verified data.** The rear-tire-vs-frame-clearance rule (`frame.maxTire`)
   is now **live on 6 frames** (manufacturer clearances; the other 13 stay dormant until their
   makers publish one). Next: land the other data-dependent candidates from CLAUDE.md's "Coverage
   roadmap" the same way (rule + tests dormant, activate on data), keep converting sample parts to
   verified (SRAM shock variants + remaining cockpit are the easiest wins), and decide the
   measured-weight source policy that unblocks Shimano / rotors / forks.

**Planned (post-beta, not started):** accounts/login with **saved builds**, an **owned-parts
inventory**, and a **past-builds garage** (likely Supabase/Firebase — first backend, so it comes
after the static beta ships and the report loop proves the rules).

**The bar, always:** a wrong verdict (false "fits" OR false "won't fit") is worse than a missing
rule. Only add rules backed by manufacturer docs + tests, and keep `npm test`, `node validate.js`,
and `npm run typecheck` green on every change.
