# BuildMyMTB — Project Log

A dated, append-only record of what changed, **why**, and **how it was verified** — so
the project can be handed to an independent reviewer (another engineer or model) who can
trace every decision and re-check it. This is the *running* trail; its companions:

- **`FOR-REVIEWERS.md`** — the reviewer's entry point: what to read, in what order, and how
  to independently verify every claim (the four gates, provenance URLs, the "compatible =
  true" contract). _(being built)_
- **`REVIEWER-DOSSIER.md`** — the comprehensive retroactive decision + verification history.
  _(being built)_
- **Git history** — the ground truth for exact diffs; commit hashes are cited below.
- **`tools/verification-job.json`** — the per-part provenance ledger (verified vs. sample).

**Entry format:** `date` · what changed · why · how it was verified · refs (commit/branch/
issue) · what a reviewer should double-check. Newest first. The coordinator appends one entry
per wave/decision; large reconstructions are handed to a worker session.

---

## 2026-07-11 — Coordinator session (lean-rule correction + owner-task prep)

- **Succession housekeeping.** Archived the outgoing coordinator session ("Main Coordinator
  Old 5"). No other sessions were active.
- **Lean-coordinator rule hardened.** The coordinator seat must **never run tasks in its own
  context** (no coordinator-spawned in-session background `Agent`s — they meter against and
  bloat the seat). Task work is handed to separate worker sessions.
  - _Why:_ this session spawned an in-session background audit agent; Douglas corrected it —
    *"I don't want the coordinator sessions to run tasks. I want to keep them lean to
    coordinate."*
  - _Verified / refs:_ baked into `COORDINATOR-HANDOFF.md` §2 (removed the prior "or background
    agents" license) — commit **`2742ca8`**; and into the Claude memory topic files. The
    in-session agent was stopped and its orphan worktree pruned.
  - _Double-check:_ handoff §2 "How you work" wording.
- **Owner account tasks scoped (blocked on Douglas, by design — his accounts).**
  - _Supabase:_ base forum is already live/migrated; the pending item is the usernames/admin
    layer — run `supabase/forum-profiles.sql`, then the owner admin-grant. Security-reviewed:
    privilege escalation is prevented by a BEFORE trigger that pins `is_admin`/`verified_pro`
    off for every end-user JWT (only the service-role SQL editor can grant). Refs:
    `supabase/SETUP.md` §9, `supabase/forum-profiles.sql`.
    App code is already live and feature-detects the tables (no deploy needed to light it up).
  - _Cloudflare:_ email routing (`Doug@buildmymtb.com` → Gmail) + optional cookieless
    analytics. Runbook: `CLOUDFLARE-SETUP.md`. If analytics is enabled, the privacy page's "no
    third-party analytics" line must be reworded the same day (honesty).
  - _Connectors:_ MCP registry search returned **no** one-click Supabase or Cloudflare
    connector; manual paths remain the recommendation for these one-time tasks.
- **⚠ Stale-branch flag.** `chore/cloudflare-prep` is divergent from current `main` and would
  **revert** the forum-profiles + random-builds work. Do **not** ship it. The contact-email
  swap (`douglas.w.wills@gmail.com` → `Doug@buildmymtb.com` on privacy/terms/affiliate-
  disclosure) is to be **re-derived from current main** once Doug@ routing goes live.
- **Open item — bug #2.** GitHub issue #2 ("Wrong verdict") is still **open**, but its fix is
  already on main (`6ef9b48`; it was a stale-cache report — the catalog was already correct).
  Needs closing with a note.
- **Audit trail established.** This log started; `FOR-REVIEWERS.md` + `REVIEWER-DOSSIER.md`
  handed to a worker session to build.
- **UPDATE (later 2026-07-11) — Supabase forum-profiles migration RUN.** Douglas ran
  `supabase/forum-profiles.sql` and seeded the owner admin profile (`Doug`, `is_admin=true`).
  Forum usernames/profiles/admin-moderation/verified-pro are now LIVE (app code already deployed;
  feature-detects the tables). _Gotcha logged:_ the admin-seed UUID must be single-quoted —
  pasting it bare tripped Postgres `42601: trailing junk after numeric literal`.
  _Next:_ Cloudflare owner task still open; queued forum follow-ups (rich profiles, auto-mod)
  ready to hand off.
- **UPDATE — reviewer audit-trail docs LANDED.** A worker session built `FOR-REVIEWERS.md`
  (entry-point/map) + `REVIEWER-DOSSIER.md` (retroactive decision + verification history, by theme,
  every claim commit-cited). Coordinator-reviewed end-to-end: accurate, honest-toned, technical-only
  (business/personal deliberately excluded — confirmed no leakage), four gates green. Merged this
  commit (only the two new files taken; the worker's branch was based on `75e0304`, one behind, so
  its stale `PROJECT-LOG.md` diff was NOT applied). The dossier honestly self-flags **13
  "reviewer should check"** items — none a live error-rule bug; the actionable follow-ups: stale
  "dead rule" wording for rules 2/8/11 (real DH-fork/FM-brake parts can now fire them) + no
  real-part error-case test for 2/11; `CLAUDE.md` roadmap/test-table prose lags shipped code;
  `MECHANIC-FINDINGS-INTAKE` rule map one behind (no rule 20). Backlogged for a doc-cleanup worker.
- **UPDATE — theme dropdown + 🍂 Loam mode SHIPPED LIVE (`6e2c202`).** Worker converted the
  Light/Dark/RAD toggles into one native `<details>` dropdown mirroring the Sample-builds menu, and
  added `html.loam` (warm forest-floor dark theme, WCAG AA verified). Scope clean (only index.html,
  126+/41−); coordinator independently re-verified gates green (validate 0 · 453 tests · tsc 0).
  ⚠ **Process note:** the worker SELF-SHIPPED to main rather than presenting a branch for Douglas's
  staged eyeball (my prompt had said "present a branch"); it claimed Douglas's launch prompt
  authorized auto-ship-if-sound. Sound + reversible, so left live — but the standing "UI stages for
  Douglas's eyeball first" rule vs. worker auto-ship is a policy question flagged to Douglas
  (unresolved at log time; do NOT bake auto-ship or a worker→coordinator auto-ping into standing
  instructions until Douglas confirms in chat — both were relayed via the worker, not from him).
- **UPDATE — forum-profile UI fix SHIPPED + hardening migration STAGED (`f689857`).** Worker fixed
  the 3 profile-UI bugs (username-as-identity header button; `[object PointerEvent]` guard; header
  auto re-render) + authored `supabase/forum-profiles-hardening.sql` (search_path pins on the 4
  flagged functions + least-privilege EXECUTE on `username_is_reserved`). Cherry-picked onto current
  main (branch was based on `f20c6bf`; a naive merge would have reverted theme/Loam + the reviewer
  docs). UI auto-shipped on green gates (new policy); the `.sql` is inert in-repo — **Douglas runs it
  in Supabase** (security tier). Coordinator independently reviewed the migration: bodies byte-
  identical, `profile_norm` stays IMMUTABLE, REVOKE-from-public can't strip authenticated's direct
  grant, fails CLOSED — escalation still impossible, reserved-names still fire. CONFIRMED SAFE
  (agrees with the worker's in-session auditor). Four gates green.
- **UPDATE — doc-cleanup LANDED (`73a3420`).** Chip refreshed 4 stale docs (CLAUDE.md,
  EXPERT-REVIEW-DOSSIER.md, REVIEW.md, MECHANIC-FINDINGS-INTAKE.md): rules 2/8/11 de-staled
  (rule 8-front + rule 11 now fully live WITH real-part error tests; rule 2-front has live vocab but
  its error case is still synthetic-only), CLAUDE.md roadmap + test-table + rules 10b/14c corrected,
  mechanic-intake rule map extended to rule 20. It independently verified all 12 DATA-MODEL-REVIEW
  §8 catalog items — **10 landed, 1 moot, 1 deliberate; NO un-applied catalog error remains.**
  Docs-only, four gates green, self-merged. Coordinator caught the original brief was wrong (rule 11
  already had a real-part error test — only rule 2-front lacks one). **OPEN (Douglas's call):** add a
  real-part error-case test for rule 2-front? A dual-crown DH fork on a trail wheel is nonsensical —
  coordinator recommends LEAVING it (a contrived test is worse than none).
- **UPDATE — rider profile PAGES shipped (`a37c342`) + rich-profile migration STAGED.** Worker built
  full-page rider profiles (header 👤 → own profile page: avatar/username/✓Pro/member-since/bio/
  riding-style/location + the user's forum threads & replies; forum author names → that rider's
  public read-only page; owner inline editors; preset/initials avatar, no external image URLs).
  Touches index.html + src/account.js + src/forum.js (all app tier). ⚠ The worker pushed to origin as
  branch `feat/user-profile-pages`, NOT main (its "pushed to origin" claim was the feature branch) —
  coordinator cherry-picked `365c67a` onto current main (base `58d5412`, clean). Feature-detects
  (`hasRichProfiles`) so the UI is safe pre-migration; auto-shipped on green gates. Migration
  `supabase/forum-profiles-rich.sql` (adds bio/riding_style/location/avatar columns; idempotent;
  DB-level CHECK constrains avatar to a slug — never a URL; touches NO policy/trigger) — **Douglas
  runs it** (schema tier). Coordinator review + the worker's independent adversarial pass both
  confirm escalation-impossible + reserved-name enforcement still hold. Four gates green.
- **UPDATE — rich profiles v2 shipped (`50f9368`) + Storage migration STAGED.** Worker (correctly
  presented a branch, did NOT self-push) added profile photo UPLOAD (Supabase Storage `avatars`
  bucket, owner-own-path RLS, 2 MiB + image-MIME caps), tagline, multi-select disciplines
  (`riding_styles[]`), experience, current bike, home trails, and social handles (IG/YT/Strava stored
  as handles only, host hardcoded client-side, rel=noopener nofollow). index.html + src/account.js
  (app tier, feature-detected `hasRichProfiles2`). Coordinator independently reviewed the Storage RLS
  + the `avatar_url` CHECK + social-handle charset constraints — SAFE (canonical owner-folder Storage
  pattern; avatar_url DB-locked to the project prefix; no profiles_guard/RLS/trigger change →
  escalation-impossible + reserved-names hold). Worker's adversarial pass agreed; one LOW note (no
  per-user Storage object quota) is optional/non-blocking. Migration `supabase/forum-profiles-rich2.sql`
  (9 columns + CHECKs + the `avatars` bucket + Storage policies) — **Douglas runs** (schema+Storage
  tier). Branched off current main (no stale base). Four gates green.
- **CATALOG MERGE WAVE 1 (2026-07-12): brakes + wheels + tires → 2172 parts.** Reviewed + merged 3
  finished expansion branches onto current main, each applied as its OWN additions only (git-apply of
  the merge-base..branch diff for compat.js/schema.js/types.js) to avoid the stale-base revert since
  all branches are based on old main. `expand/brakes` (+3 MTB brakes: SRAM G2 Ultimate + Shimano
  BR-MT410/MT420 — **DROPPED bk-sram-guide-re as SRAM's e-bike-branded caliper** per the no-e-bikes
  rule; that session predated the rule relay). `expand/wheels` (+109 wheels/wheelsets, all disciplines;
  + `XDR` freehub vocab — WTB CZR road-length driver, kept distinct from XD per THE BAR). `expand/tires`
  (+44; the tires session **self-dropped a Schwalbe e-MTB tire**). Interfaces sourced; unverified rows
  per the relaxed policy; verify-job untouched by workers (coordinator re-sync deferred to end of the
  catalog waves). Gates green (validate 0 · 453 tests · tsc 0 · verdict-audit 0 flags). 2016 → 2172
  (1563 verified / 609 unverified). Commits `7913a10`/`638508a`. Still RUNNING (present final branches
  later): frames, forks, shocks, drivetrain, finishing-kit. ⚠ NOTE for the engine review: the new XDR
  freehub hard-errors vs every current cassette (none is XDR) — conservative, flagged by the worker
  for a future fix-tier adapter enhancement.
- **Catalog-expansion sourcing policy CLARIFIED (Douglas).** 8 expansion chips launched (frames,
  forks, shocks, wheels, tires, drivetrain, brakes+rotors, finishing-kit) had been briefed with a
  stricter-than-normal bar: omit a product entirely to a GAPS list if its interface fields couldn't
  be confirmed via a LIVE manufacturer fetch. Douglas: "if a product exists and the specs aren't
  available, I want it included... not verified blank or marked estimated." Clarified via
  AskUserQuestion — he picked the safe, already-precedented option: interface fields sourced from
  ANY credible real source (retailer listing, geometry chart, review article), not just a live
  fetch; entered as ordinary unverified/sample data (no `verified:true`, no fake `source`) — the
  SAME state ~1480 of 2016 existing parts are already in. Never a fabricated/invented number with
  zero basis; `verified:true` still requires the real fetched-source bar. GAPS list now means
  "genuinely no plausible real-world spec found anywhere," not "wasn't manufacturer-fetched."
  Policy relayed via send_message to all 8 running sessions. **Root cause:** this exact policy was
  ALREADY set 2026-07-11 (memory `catalog-unverified-inclusion-policy`), but the repo docs still
  stated the strict rule, so the briefs regressed. Fixed for good this time — patched
  `tools/DATA-ENTRY-TEMPLATE.md` with the verified-vs-unverified-breadth distinction so future briefs
  default correct (VERIFY-PROTOCOL's fetched-only rules are correctly about earning `verified:true`).
- **UPDATE — 📚 Buyer's Guides section shipped (`c6cbdbc`).** Chip built a full-page Guides section
  (new `src/guides.js` + index.html) with **10** accurate, brand-neutral compatibility/buyer's guides
  (how-the-checker-works, fork travel, mullet, Boost/SuperBoost, brakes/rotors, cassette/freehub,
  UDH/Transmission, headset S.H.I.S., dropper sizing, rear-shock), each grounded in the real engine
  rules and deep-linkable (`#guide/<slug>`). Coordinator read all 10 — accurate, NO brand favoritism,
  ZERO affiliate links (unbiased value upheld). Worker presented a branch (correct); coordinator
  cherry-picked onto current main + resolved ONE index.html conflict (additive CSS, rich2 vs guides —
  kept both), gates green (validate 0 · 453 tests · tsc 0 incl. guides.js). ⚠ index.html inline script
  isn't gate-covered and this was a hand-resolved merge, so Douglas to eyeball Guides↔profile hash
  nav. Purpose: value-add written content for the AvantLink application. Follow-up flagged: static
  pre-render for real search-SEO would be the project's first build step — deferred, deliberate call.
