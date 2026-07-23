# Where we are + next steps

_A living snapshot — a pointer doc, not a second log. Architecture/conventions live in
`CLAUDE.md`; the full roadmap and mission live in `docs/MISSION.md`; the full dated
history is `PROJECT-LOG.md` (newest first) + `git log`._

## Where we are (refreshed 2026-07-21 — see `docs/MISSION.md` for the full picture)

**Live:** [buildmymtb.com](https://buildmymtb.com/) (custom domain, HTTPS, Supabase auth). Repo:
[github.com/dwills38/trailbuilder](https://github.com/dwills38/trailbuilder).

**Live gate output (trust this over any number in prose — counts drift every wave):**
run `node validate.js` for current per-catalog counts (MTB, KIT, BMX, STRIDER, ROAD, GRAVEL,
EMTB all validate 0 problems), `npm test` for the full Vitest suite, `npx tsc --noEmit` for
type-checking. CI + GitHub Pages deploy green on `main`.

**ALL SIX surfaces are LIVE (as of 2026-07-21, each on Douglas's flip word):**
- **BuildMyMTB** (`index.html`) — the flagship: a 26-slot build checked by a 20-rule-area
  compatibility engine, including dirt-jump/single-speed support (live since 2026-07-14).
- **BuildMyBMX** (`bmx.html`) — separate page + engine (`src/compat-bmx.js`), live 2026-07-17.
- **BuildMyRoadbike** (`road.html`) + **BuildMyEMTB** (`emtb.html`) — live 2026-07-20
  ("do them all at once").
- **BuildMyGravelBike** (`gravel.html`) — live 2026-07-21 (road + gravel share the
  `src/compat-road.js` drop-bar engine).
- **BuildMyRideKit** — rider gear builder, independent of the bike engines.
- Plus `/home` (the family front door), `/about`, accounts + saved builds + garage + service
  log (Supabase), a forum, guides, recall notes, legal + affiliate-disclosure pages.

**Still off-live:** only the balance-bike fit guide (kids' striders) — validated dataset, no
page yet. The MTB catalog itself stays **permanently e-bike-free**; e-MTB lives only on its
own contained page (Hard rule #1).

## The bar that governs everything

**A wrong verdict is worse than a missing feature.** Anything that *claims* fit or ride quality
needs a source; everything else can be playful. Verdicts are *self-consistent* (the test suite
proves it) — not yet field-validated by real mechanics/riders beyond the paper domain review in
`EXPERT-REVIEW-DOSSIER.md`.

## What's next

See `docs/MISSION.md` Part 3 for the full phased roadmap (Phase 1 MTB polish is the active
top priority; BMX/road/gravel/E-MTB/striders are gated behind Douglas's word per phase).
Standing items worth knowing about:

1. **MTB verification climb** — continues past the current verified fraction; much of the
   remaining tail is wall-limited (see `tools/VERIFY-PROTOCOL.md`'s fetchability map and the
   fetch-ethics rule: never defeat anti-bot protection, a wall is documented not routed around).
2. **Frame/catalog completeness gaps** — remaining category breadth and complete-bike
   build-sheet verification, tracked as they're found.
3. ✅ **Home page shipped** (2026-07-20): `/home` is the family front door (D2c design,
   Douglas's pick) + `/about`; the builder root stays loads-straight-to-data (no pop-ups ever).
4. **Style pass** — Loam-first direction picked; polish continues opportunistically.
5. **The human expert review** — engine rule severities in front of professional mechanics
   (packet exists in `EXPERT-REVIEW-DOSSIER.md`).
6. **Recurring audits**: bias + code-quality audits after every big wave (standing cadence).
7. **The owner-picked feature slate** (2026-07-19): Upgrade Advisor, Upgrade Optimizer,
   service log, recall watcher, build sheet, build diff, owned-vs-buy planner, discontinued
   archive — committed.

## Docs map

See [`FOR-REVIEWERS.md`](FOR-REVIEWERS.md) for the full document map and independent-review
entry point; `CLAUDE.md` for the technical spine (data model, 20 rule areas, conventions);
`docs/MISSION.md` for the mission statement and full roadmap.
