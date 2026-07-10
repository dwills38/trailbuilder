# TrailBuilder — Coordinator Handoff

_Last updated: 2026-07-10 (night), by the day's coordinator session at the end of the review + expansion + verification marathon. Read this end-to-end before touching git. It is written so a fresh coordinator with zero prior context can operate safely._

---

## 1. TL;DR — current state

- **Catalog: 1843 parts / 1238 verified (67%) / 407 tests at handoff** — run `node validate.js` and `npm test` for live numbers; never trust counts written in docs (they drift within hours here).
- **GREEN + DEPLOYED** at every push: CI + GitHub Pages on `main` (live at dwills38.github.io/trailbuilder). Local gates green ⇒ CI passes; runners queue but don't fail; latest deploy wins.
- **THE EXPERT RULES REVIEW IS 100% COMPLETE (2026-07-10).** All 19 rule areas, all 4 deliberate NON-rules, and the known-gaps ranking were verdicted by Douglas and every resolution applied + merged same day. **The durable record is the annotated `EXPERT-REVIEW-DOSSIER.md`** (every section carries its Review verdict inline) + `EXPERT-REVIEW-DOSSIER-REVIEWED.pdf` in the shared-checkout root. Do not re-litigate anything recorded there.
- Engine highlights now live: **BB category** (real bottom brackets, exact shell×spindle checks, own GROUP — never a drivetrain slot, see §7), **sourced-strict rule 12** (outside a maker-published fork-travel range = hard error; design-only frames keep the >20mm-under warning), **rule 10b** frame-side native rotor floor (Cotic Solaris), **rule 4 UDH retrofit-kit warning tier**, **rule 3a AXS-controller exemption**, 180mm dropper-insertion info threshold, dormant `minTire`, de-estimated stroke warning.
- **Expansion is UN-held** (Douglas lifted it after the review) and the r2 wave (6 category clusters) is merged — an independent re-fetch audit of the whole wave found **zero fabrications**. Verification waves same night took shocks 3→107/108 (zero interface corrections), droppers 153 promoted, forks 108 promoted (one real false-fit caught: SR Suntour Durolux was Boost110, maker says 20x110).
- **Nothing pending in the merge queue at handoff** — the verify-brakes-rotors branch landed as the final act (81 promotions incl. the whole TRP line + SRAM/Hope/Shimano-handbook brakes; zero interface corrections). Fresh branches only appear when Douglas runs a new wave.
- **Worktrees:** your session's own worktree is your coordination base (see §2). `D:\MTB Bike Builder` (shared checkout) — NEVER coordinate from it; it currently sits on a stray `claude/*` branch (housekeeping, §6). `D:/tb-coord` was the previous coordinator's worktree and may still be locked by that session — don't fight it.

## 2. Your role and working base

You are the **coordinator**. You do NOT write catalog rows or features yourself by default — you **design waves, hand Douglas chips, review + merge worker branches, keep main green + deployed, and keep docs/memory coherent**.

- **Working base:** your session's own auto-worktree. First acts: `git fetch origin`, create your coordination branch from it (`git switch -c coord/<date> origin/main`). All merges happen on your branch, then `git push origin HEAD:main` (fetch-before-push + `git merge-base --is-ancestor origin/main HEAD` first, ALWAYS).
- **Never** run git in the shared checkout `D:\MTB Bike Builder`. If refs behave impossibly, STOP and trust only `git ls-remote origin`.

### How Douglas wants waves delivered (settled 2026-07-10 — follow exactly, see memory `parallel-work-delivery`)

**One `spawn_task` chip per wave. The chip session is an ORCHESTRATOR** (Douglas clicks it on Fable/any model) **that fans out model-PINNED background agents** via the Agent tool:
- `subagent_type:'catalog-worker'` — **pinned Sonnet**, defined in `.claude/agents/catalog-worker.md` (carries the non-negotiables: worktree isolation, THE BAR, all four gates, hands off verification-job.json, never merges).
- `subagent_type:'catalog-auditor'` — **pinned Opus**, `.claude/agents/catalog-auditor.md` (adversarial re-fetch audits).
- Usage bills at the AGENT's model rate — that's the whole point: the premium orchestrator only pays for coordination.
- Spawn all disjoint cluster workers **simultaneously** (`isolation:'worktree'`, `run_in_background`) — Douglas's machine is a 7900X/64GB and he explicitly said use it (memory `hardware-capacity`).
- Orchestrator chips present branches + a consolidated report; **they never merge/push and never spawn chips of their own** (Douglas rejected worker-spawned chips).
- Chips can't preset model — they inherit Douglas's current default picker. Put the recommended model in the chip TITLE.

## 3. Operating rules (hard-won — do not relearn the hard way)

### Per-branch MERGE WORKFLOW (every step, in order)
1. `git fetch origin` (other actors push to main too).
2. **Review the diff**: scope check (only its categories), then verdict-driving fields. For verification branches, diff the INTERFACE FIELDS PER ID between main and the branch with a small node script (pattern used repeatedly 2026-07-10: extract `id → field-tuple` from both refs, compare) — zero-interface-change is the expected good outcome; every change needs a verbatim maker quote in the desc.
3. `git merge --no-ff <branch>`.
4. **Run ALL FOUR gates:** `node validate.js` (0 problems), `npm test` (all pass — never weaken a test), `npx tsc --noEmit` (clean), `node tools/verdict-audit-harness.js` (0 flags, 9/9 adversarial, assemble clean; its Section E fork-rotor list is informational — sourced-honest, never silence it).
5. Fast-forward check, push `origin HEAD:main`, confirm CI+Deploy green (they run ~20-35s).
6. `git branch -d <branch>` — will FAIL while the worker session's worktree still holds it; that's fine, defer to the end-of-day sweep (§6).

### THE BAR (never compromise)
- A wrong verdict is worse than a missing part — both directions.
- A spec exists only if a maker/authoritative page was FETCHED (snippets lie — proven repeatedly).
- `verified:true` needs a real source URL + non-future lastChecked. Retailer "measured" weights REJECTED; editorial teardowns (Bikerumor/MBR/BikeRadar) count for weight only (`sourceType:'measured'` + `weightSource`).
- Adding/strengthening a RED needs a manufacturer source + a pinning test.
- Ids are APPEND-ONLY. A spec-changing **generation is NEW rows, never a mutation** of an existing row (a worker tried rev1→rev2 relabeling 2026-07-10 — rejected at harvest).

### Parallel-wave rules (learned 2026-07-10, the hard way)
- **Unique branch names per wave.** Two sessions were once pointed at the same scope with the same branch name (`verify-brakes-rotors`) and interleaved commits on one branch. Give every prompt/agent a distinct branch, and never run two sessions on the same category scope.
- **`tools/verification-job.json` is coordinator-only.** Workers must not run the verify-job runner or commit that file; you re-sync ONCE per merge wave (`npm run verify:status`, commit). Merge conflicts in it: `git checkout --ours tools/verification-job.json`, re-run status, never hand-merge.
- **Duplicate/overlapping branches — harvest, don't merge.** If two sessions covered the same rows, diff each branch against its own merge-base for SUBSTANTIVE (non-provenance) changes, adopt only sourced improvements main lacks, and reject: weight-basis flips on verified rows, generation mutations, anything contradicting a verified row without a stronger source. Record adopted/rejected in the commit message.
- Exclude in every worker prompt: rows another live session owns (e.g. by `lastChecked` date), `fr-santacruz-megatower-cc` verified-status (test fixture), T47 (semantics unpinned — see schema comment), goldens.

### Git/PowerShell
- Commit messages: NO double quotes (PS 5.1 mangles them) — use the Bash tool with heredoc (`git commit -F -`).
- `git add <explicit paths>`, never `-A` (untracked PDFs/scripts in the shared checkout root are intentional).
- Remote-branch deletion / reset --hard / history rewrites need explicit user OK.

## 4. What to do next

1. **Merge `verify-brakes-rotors`** if not already merged (review done — see §1; re-verify tip hasn't moved, then the §3 workflow).
2. **Remaining verification tail** (run the per-category script in §7 for live numbers): biggest remaining piles after tonight ≈ rear wheels (~98), front wheels (~36), stems/grips/saddles, cranksets (~16), shifters (~14). Rear wheels are historically wall-limited (pair weights, blocked domains) — a wave is fine, but don't manufacture wall-hitting busywork; if a scope is documented-walled, STOP.
3. **Expansion round 3** on request: the r2 prompts live in this repo's history (chips of 2026-07-10); frames are near-complete for fetchable makers (memory `frame-expansion-findings`) — weight future expansion toward drivetrain/wheels/cockpit breadth and the bot-blocked-brand tail only if tooling improves.
4. **UI suggestions backlog (review done 2026-07-10, NOT implemented — Douglas asked for suggestions only):** mobile catalog starts 1313px down; build panel invisible on mobile (needs sticky bottom bar); 22-button toolbar needs grouping; "Showing X of N" count; ≈-marker should bind to price/weight; BB chip has no emoji; search input 14px→16px (iOS zoom); legend wording ("No conflict found" vs "No conflicts found"). Ask Douglas before implementing.
5. **Follow-ups parked:** 2 Fox fork rows flagged fictitious (verify-forks report); SM-RT30-203 rotor flagged; Wolf Tooth Resolve rev2-at-200mm = candidate NEW rows; Cotic I.S. brake mount not in vocab (blocked); dropper-insertion-vs-frame-size + curved-seat-tube checks = nice-to-have backlog (needs a frame-size picker; most frames already carry per-size maxInsert).
6. **Blocked on Douglas:** product-photo/affiliate licensing; forum migration + `FORUM_ENABLED` flip.

## 5. Housekeeping (do when Douglas closes his finished sessions)

- ~12 fully-merged branches are pinned by their sessions' worktrees under `D:\MTB Bike Builder\.claude\worktrees\` — once those sessions close: `git branch -d` each, `git worktree prune` (Windows: `worktree remove` may fail on locked dirs; prune de-registers, orphan folders are harmless).
- The shared checkout `D:\MTB Bike Builder` sits on a stray `claude/*` branch — with Douglas's OK and no live session holding it: `git switch main && git reset --hard origin/main` there (preserve the untracked root PDFs + `scripts/`).
- `dossier-research-pass` + `verify-droppers` (the harvested duplicate) branches can be deleted after their worktrees free up.

## 6. Gotchas & references (still true, verified tonight)

- **Per-category verified counts:** `node -e "var C=require('./src/compat.js');var m={};C.PARTS.forEach(p=>{m[p.cat]=m[p.cat]||{n:0,v:0};m[p.cat].n++;if(p.verified)m[p.cat].v++});console.log(m)"`.
- **buildTotals skips a bundled group's non-fill slots** — that's WHY the BB is its own single-slot group. Never move it into drivetrain.
- **tsc "union too complex" past ~1000 PARTS**: the `// @ts-ignore` above `var PARTS_RAW = [` is the only working fix — don't remove it.
- **`checkBuild` throws on unresolvable id strings** (deliberate); pass valid ids or objects in probes.
- **Fetch walls:** `bike.shimano.com` 403 (but a fetchable **Shimano spec HANDBOOK** was found by the brakes session 2026-07-10 — check its descs for the URL; `productinfo.shimano.com` C-charts also fetch); `KNOWN_UNFETCHABLE_HOSTS` in `tools/drift-check.js` (trek/specialized/norco/pivot/roval/bontrager...); wheelsmfg + WT product pages fetch, their collections are JS shells; hopetech/sram/ridefox/bike.marzocchi/commencal/canyon/ibis/raawmtb/transitionbikes/santacruz-support-pages all fetch.
- **Preview:** `preview_start` reads `.claude/launch.json` from the PRIMARY working dir; the `tb-coord` config serves that worktree on 8135; port 8123 often serves a STALE checkout — always confirm which checkout a preview serves; hard-refresh; `preview_screenshot` flakes — DOM-eval is the reliable path.
- **Tests:** verified TIRE needs BOTH casing+compound; provenance-noise idiom in test-schema (strip verified/lastChecked/source on `over()` clones — catalog verification churn vs the fixed TODAY); goldens' zero-issues assertions are never weakened.
- **Memory:** `C:\Users\Douglas\.claude\projects\D--MTB-Bike-Builder\memory\` — read MEMORY.md; keep the index line's counts current after each wave; key topics: `parallel-work-delivery`, `hardware-capacity`, `workflow-preferences`, `fork-verification-learnings`, `frame-expansion-findings`.

**Definition of green:** validate 0 problems AND all tests pass AND tsc clean AND harness clean AND CI+Deploy success for the pushed HEAD.

## 7. Session log — 2026-07-10 (the marathon day, for context)

One day took the project from "self-consistent prototype" to "expert-reviewed, 2/3-verified catalog": full 19-rule dossier review with all findings applied (incl. two SRAM-documented false-red kills and the new BB category), a 6-cluster expansion wave (+71 parts, zero fabrications on independent audit), and verification waves that took the catalog from 43% to ~66% verified — including the entire shock, dropper, and fork categories, with exactly one real false-fit found and fixed across ~420 re-fetched rows (Durolux axle). Every merge went through the four gates + harness; main never went red; every push auto-deployed green.
