# Where we are + next steps

> **⚠ STALE SNAPSHOT (flagged 2026-07-19).** The state below is frozen at 2026-07-13/14 and is
> materially out of date (BMX/BuildMyRideKit are LIVE, 7 catalogs validate, the counts and test
> numbers below are wrong). **The current picture lives in `docs/MISSION.md`** (overview +
> roadmap + where-we-are marker) and `PROJECT-LOG.md` (dated history). This doc awaits a full
> refresh chip; until then trust MISSION.md over anything below.

_A living snapshot — a pointer doc, not a second log. Architecture/conventions live in
`CLAUDE.md`; the full dated history is `PROJECT-LOG.md` (newest first) + `git log`._

## Where we are (as of 2026-07-13, live gates re-run 2026-07-14)

**Live:** [buildmymtb.com](https://buildmymtb.com/) (custom domain, HTTPS, Supabase auth). Repo:
[github.com/dwills38/trailbuilder](https://github.com/dwills38/trailbuilder).

**Live gate output (trust this over any number in prose — counts drift every wave):**
`node validate.js` → `DATA OK - 3065 parts, 0 problems (2283 verified, 782 unverified)`.
`npx vitest run` → `Test Files 15 passed (15)` / `Tests 489 passed (489)`. `tsc --noEmit` clean.
CI + GitHub Pages deploy green on `main`.

**Shipped this week (2026-07-12→13), highlights:**
- **Engine correctness wave** (`45f7331`, from `ENGINE-CRITICAL-REVIEW-2026-07-12.md`): C1 new
  rule 8b brake `maxRotor` ceiling, C2 BSA68≡BSA73 equivalence, C3 direction-aware `bar-stem-clamp`
  with a shim `fix`, C4 `frame.forkTravelHard` tiered by source language, M1 chain out of the
  drivetrain speed set. All maker-sourced, pinned, adversarially audited 5/5.
- **Rule 6c** (`021ba42`): XD cassette on an XDR-driver wheel is now an adapter-tier warning
  (SRAM's own spacer, not a hard error) — bias-audit finding #2 closed.
- **Headset category (rule 20 a/b/c)** — S.H.I.S. upper/lower cup checks, live.
- **Post-wave audits**: `MANUFACTURER-BIAS-AUDIT-2026-07-12.md` (brand-neutrality check),
  `CODE-QUALITY-AUDIT-2026-07-13.md` (byId memoization + renderCatalog perf fixes landed,
  `0655198`) — the recurring cadence Douglas asked for after big waves.
- **Away-grind waves 1–5**: catalog 1865 → 3065 parts, verified 1337 → 2283 (Shimano drivetrain
  now 100% verified; RockShox shocks 100%; SRAM rotors fully enumerated).
- **UI**: tall two-row header banner at all widths (`a0a0070`), topo-contours theme default,
  random/seeded-shuffle sort tie-break, forum E-MTB category hidden-not-removed.
- **Repo hygiene**: 154→12 branches / 54→3 worktrees swept, every deletion content-verified.
- **Reviewer trail added**: `PROJECT-LOG.md` (running) + `FOR-REVIEWERS.md` (entry point) +
  `REVIEWER-DOSSIER.md` (retroactive, by theme) — hand the whole project to another engineer/model.

**In flight / held (off-live, not merged):**
- **DJ/BMX architecture** (`bike-type/dj-bmx` branch, `555ee7c`): `driveMode:'single-speed'`
  discriminator in the live MTB engine (dormant), new `src/compat-bmx.js` engine for BMX (loaded
  by nothing live). Every new rule proven dormant / behavior-identical vs the live suite. Signed
  off by Douglas 2026-07-13; a "DJ go-live" chip is activating the DJ half (BMX stays off-live).
- **Kids-striders dataset** (`bike-type/kids-striders`, `0670f3a`): data-only, off-live.
- Two dirty night-verify worktrees hold unharvested WIP diffs to `src/compat.js` — harvest or
  discard before their branches are folded (see `PROJECT-LOG.md`'s 2026-07-13 hygiene entry).
- `audit/code-quality-2026-07-11`: superseded by the 2026-07-13 audit's perf fixes — check before
  reusing anything from it.

**Waiting on Douglas:** `Doug@buildmymtb.com` Cloudflare routing (then swap onto the legal pages),
Cloudflare Web Analytics enablement (then wire the snippet), LLC formation (playbook delivered;
his favorite name so far is "Dubs Works"), affiliate program signups (site is
application-ready — domain + legal pages live, needs LLC/EIN first).

## The bar that governs everything

**A wrong verdict is worse than a missing feature.** Anything that *claims* fit or ride quality
needs a source; everything else can be playful. Verdicts are *self-consistent* (the test suite
proves it) — not yet field-validated by real mechanics/riders beyond the paper domain review in
`EXPERT-REVIEW-DOSSIER.md`.

## What's next

1. **Frame catalog expansion** — still ~192 gap candidates from `FRAME-EXPANSION-GAPS.md`
   (needs a dedup-refine pass); most fetchable makers are near-complete, remaining gap is
   fetch-walled brands (Trek/Specialized/YT/Norco/Pivot/Cannondale) or a web-unblocker connector.
2. **Verification tail** — ~782 unverified rows remain, largely wall-limited (see
   `tools/VERIFY-PROTOCOL.md`'s fetchability map). Not more raw grinding until new access exists.
3. **DJ go-live merge** — once the held branch's engine-tier review + adversarial pass land.
4. **Style pass** — Loam-first direction picked; icons v5 delivered, awaiting Douglas's picks;
   header/toolbar polish continues opportunistically.
5. **Forum**: rich profiles (photo/bio/riding-style) + auto-moderation queued after the forum
   foundation branch merges (free-speech-first philosophy — see memory / coordinator notes).
6. **Recurring audits**: bias + code-quality audits after every big wave (standing cadence, not
   one-offs) — the two 2026-07-12/13 audits are the template.
7. **Marketplace** — parked, not scoped; must be scam/fraud-secure by design when it starts.

## Docs map

See [`FOR-REVIEWERS.md`](FOR-REVIEWERS.md) for the full document map and independent-review
entry point; `CLAUDE.md` for the technical spine (data model, 20 rule areas, conventions).
