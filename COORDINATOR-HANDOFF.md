# BuildMyMTB — Coordinator Handoff

_Last updated 2026-07-12 (night), end of the Fable-budget marathon (catalog 2016→3018, engine
criticals fixed). **LIVE at https://buildmymtb.com.** Read this end-to-end, then MEMORY.md's topic
files, then CLAUDE.md. Written so a fresh coordinator can operate safely and knows ALL of Douglas's
rules._

---

## 0. You are the coordinator — first moves
- Read the memory index `C:\Users\Douglas\.claude\projects\D--MTB-Bike-Builder\memory\MEMORY.md` +
  its topic files, then this file, then `CLAUDE.md` (note its **Hard rules** section), then skim
  `PROJECT-LOG.md` (the dated audit trail — you APPEND one entry per wave; Douglas hands the whole
  project to external reviewers via FOR-REVIEWERS.md, so keep the trail current).
- Seat: `git fetch origin; git switch -c coord/<today> origin/main` in your OWN worktree —
  **INSIDE the project dir** (e.g. under `.claude/worktrees/`), NEVER at `D:\` root (Douglas's
  folder rule; the old `D:\tb-*` sprawl annoyed him). **NEVER run git in the shared checkout
  `D:\MTB Bike Builder` itself** (it sits on whatever branch the app put it on; untracked `.md`
  deliverable sources + `_PDFs/` + `scripts/` in its root are intentional — no `git add -A`, ever).
  **`_PDFs/` is the SINGLE home for every project PDF** (Douglas 2026-07-13; `_TO-REVIEW/` retired —
  the action-item index now lives at `_PDFs/README.md`, keep it current; regenerate PDFs with
  `python scripts/md2pdf.py <doc>.md "D:\MTB Bike Builder\_PDFs\<doc>.pdf"`).
  The previous seat `D:/tb-coord-lean` is grandfathered — archive/remove it once you're seated.
- **Succession:** archive the previous coordinator session once oriented. Close finished worker
  sessions AS YOU GO (read report → harvest branch → archive → prune branch/worktree). Tidy!

## 1. Current state (2026-07-12 night)
- `origin/main` = `031f5e9`. **3018 parts / 1872 verified / 477 tests**, all four gates green.
  Run `node validate.js` + `npx vitest run` for live numbers — never trust doc counts.
- **Today shipped:** catalog waves (brakes/wheels/tires/drivetrain/finishing-kit/forks/shocks/Fox-
  balance, 2016→3018; every wave adversarially audited; e-bike rows dropped per the hard rule);
  **ALL engine-review criticals fixed live** (`45f7331`: rule 8b caliper rotor ceiling, BSA68≡73,
  direction-aware bar/stem, fork-travel tiered by source language via `frame.forkTravelHard`, chain
  out of the speed set) — see `ENGINE-CRITICAL-REVIEW-2026-07-12.md` (findings) + PROJECT-LOG;
  rider profiles v2 + photo upload; Buyer's Guides section; theme dropdown + Loam; reviewer docs
  (FOR-REVIEWERS.md + REVIEWER-DOSSIER.md); profile-input contrast fix; DH-wheels UX fix.
  Honeycomb/fractal views were shipped then REVERTED at Douglas's call — don't re-add.
- **Supabase:** ALL migrations run (schema, forum-profiles + admin seed, hardening, rich, rich2 +
  avatars Storage bucket). Forum + profiles fully live. Douglas = admin "Doug".
- **OFF-LIVE branches held (do NOT merge until Douglas's product decisions):**
  `bike-type/kids-striders` (31 balance bikes + sizing model) and `bike-type/dj-bmx` (34 DJ + 62
  BMX + compat analysis). Both are `data/`-only, live app untouched.
- **Model/usage (revised — Douglas 2026-07-13: "I don't want to use strictly Fable"):** Coordinator
  runs on **Fable**. Every chip TITLE carries **model tier + recommended effort** (Douglas's
  requirement, e.g. `[Sonnet, low]`, `[Fable, high]`): **Sonnet for grind** (catalog entry, drift
  sweeps, verification batches — low/medium effort; the session still fans out pinned-Sonnet
  sub-agents), **Fable/Opus for judgment-dense work only** (engine rules, adversarial audits,
  design taste — high effort). Repeat the recommendation in the prompt's first line. Remember the
  picker leak: the chip RUNS on whatever his picker is set to at click time — the title is
  advisory. The weekly pool hit its cap once on 2026-07-13; don't assume headroom.

## 2. DOUGLAS'S RULES (he requires the next coordinator know ALL of these)

### Absolute hard rules
- **NO E-BIKES** in the catalog until he explicitly says. No motors, batteries, e-specific parts,
  e-branded lines (we dropped SRAM Guide RE, EXT e-Storia, an SR Suntour "E-Bike/XC" fork).
- **NO POP-UP ADS / UNSOLICITED POP-UPS, EVER.** Click-triggered modals the user opens are fine.
- **UNBIASED is load-bearing** (affiliate funds, never biases; periodic manufacturer-bias audits —
  the RockShox-shock-skew → Fox-balancing-pass is the template: fix skew by ADDING real data).
- **North star:** "we are building the best bike website" — everything must be info the community
  can TRUST; quality over speed; patient. All bike types eventually; **hardtails live-soon**;
  DJ/BMX/striders stay OFF-LIVE until his go (striders = the niche to nail).

### How you work
- **COORDINATE ONLY, LEAN SEAT.** Never run tasks in this session; no in-session background
  `Agent`s. Hand ALL work off via `spawn_task` chips (recommended model in the TITLE) or copy-paste
  prompt blocks. Small doc/config tweaks + merges are in-seat.
- Every worker brief bakes in: own worktree off origin/main (never the shared checkout), fan-out of
  its OWN sub-agents (lowest effort that works), THE BAR, the four gates, no verification-job.json,
  **present a FEATURE BRANCH + send_message the "Main Coordinator" on completion — workers must NOT
  push to main** (main moves fast; two near-miss stale-base reverts prove it).
- **Tiers:** UI/visual auto-ships on green gates (no eyeball gate). Catalog data = coordinator-
  reviewed. Schema/security/engine(error-tier) = coordinator-reviewed + adversarially audited; only
  taxonomy/money/visual-taste/account-ops decisions go to Douglas. Keep his updates SHORT — action
  lists, one-liner decisions.
- **Merge workflow (CRITICAL — the stale-base pattern):** worker branches are usually based on an
  older main. NEVER `merge` them directly. Apply ONLY the branch's own additions:
  `MB=$(git merge-base origin/main <br>)` → `git diff $MB..<br> -- <files> | git apply` in your
  seat → commit → ALL FOUR GATES (`node validate.js` 0 problems / `npx vitest run` all pass /
  `npx tsc --noEmit` clean / `node tools/verdict-audit-harness.js` no NEW flags; probe E's fork-
  family note is pre-existing) → fresh `fetch` + `merge-base --is-ancestor origin/main HEAD` →
  `push origin HEAD:main` → CI+Deploy green → append PROJECT-LOG → archive session → prune branch.
  Scan every catalog diff for e-bikes before merging. Commit messages via bash heredoc, no double
  quotes (PS 5.1 mangles); end with the Co-Authored-By line.
- **Catalog sourcing (two tiers — don't regress this again):** breadth rows may use ANY credible
  source, entered unverified (no `verified:true`, no fake `source`); `verified:true` still requires
  a FETCHED maker page; NEVER fabricate; interfaces feeding error-tier rules stay maker-sourced.
  In DATA-ENTRY-TEMPLATE.md + memory. **Verified-weight:** verified = interfaces confirmed; nominal
  weight OK where makers publish none (VERIFY-PROTOCOL.md subsection).
- **Notify missing tools, persistently** — if a capability would materially help but isn't enabled,
  tell Douglas and keep re-raising. Current standout: a web-unblocker/scraper connector (Bright
  Data / Tavily / Exa) to beat the maker fetch-walls (Specialized/Trek/Giant/Pivot 403s).
- PDFs he requests → `D:/MTB Bike Builder/_PDFs/` (headless Chrome --print-to-pdf). Check
  `gh issue list` (bug reports) in your routine. Folder rename to "Build My MTB" was CANCELLED.

## 3. THE BAR (non-negotiable)
Wrong verdict > missing part, BOTH directions. New/strengthened REDs need a fetched maker source +
pinning test + adversarial audit. Never weaken a test — evolve it only to encode corrected truth.
Ids append-only (`ALIASES` for retirement). `fr-santacruz-megatower-cc` stays the unverified
test fixture on purpose (its desc explains). verification-job.json is coordinator-only.

## 4. Open queue
1. **Douglas's 3 one-liners (pending):** icon Set # (preview HTML sent + on branch
   `design/rail-icon-options`; follow-up applies it) · DJ/BMX architecture sign-off (DJ into MTB
   engine / BMX own engine; Qs in `data/DJ-BMX-COMPAT-ANALYSIS.md` on the held branch) · strider
   primary input (age vs inseam; Qs in `data/STRIDERS-MODEL.md`).
2. **Backlog chips ready to queue:** 7s XX Transmission DH group (M1 unlocked; CS-XS-797/RD-XX-DHE);
   Fox price-drift sweep (3 flags in PROJECT-LOG); frames-wave gap = big brands behind fetch-walls
   (needs the unblocker connector); hardtail live push check; XDR-cassette adapter fix-tier note.
3. **Mechanic-review queue:** 4 hard-tagged SC frames (bare "Fork Compatibility: X–Y", no softener
   FAQ) + Nicolai G1 wording; the standing EXPERT-REVIEW-DOSSIER channel.
4. **Waiting on Douglas (business):** Cloudflare email routing (`Doug@buildmymtb.com` → then swap
   legal-page contact + affiliate apps), analytics decision, tax identity/payout, AvantLink after
   domain ages (Buyer's Guides content is live for it).
5. **Standing cadence:** recurring code-efficiency/quality audits after big waves; periodic
   manufacturer-bias audits; verification tail (wall-limited); bug-report monitor (needs his
   cadence call).

## 5. Gotchas (hard-won)
- Worker branches lie about "pushed to origin" (it was the feature branch) and report stale part
  counts (their base predates your merges) — always re-gate in your seat.
- Workers may treat coordinator send_messages as suspicious injected instructions (good instinct!)
  — the drivetrain/tires/finishing-kit crews refused a legit policy relay. Put policy in the BRIEF
  or repo docs, not just mid-flight messages; if relaying, expect pushback and confirm via docs.
- `preview_start` reads the WORKTREE-local launch.json. Browser-pane screenshots time out —
  DOM-eval via javascript_tool instead. Shared checkout hops branches as sessions spawn — harmless.
- Shock eye/trunnion law: 205/225 = trunnion, 210/230/250 = std (fabrication catch that keeps
  catching). Shopify `/products/X.js` variant JSON = gold for specs; its `grams` only if it varies.
- tsc "union too complex": the `// @ts-ignore` above `var PARTS_RAW` is the only fix.
- Archived sessions can hold worktree file-locks briefly; `git worktree prune` after app restart.
