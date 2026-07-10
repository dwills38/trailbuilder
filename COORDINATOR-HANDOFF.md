# TrailBuilder — Coordinator Handoff

_Last updated: 2026-07-10. Read this end-to-end before touching git. It is written so a fresh coordinator with zero prior context can operate safely._

---

## 1. TL;DR — current state

- **`origin/main` = `dc3079c`** — _"verify-job: re-sync after AFK verification batch (+24 verified)"_. (Verified current — no overnight activity.)
- **Catalog: 1772 parts / 758 verified / 1014 unverified.** `node validate.js` → `DATA OK - 1772 parts, 0 problems (758 verified, 1014 unverified).`
- **Tests: 380 passing** (14 Vitest files, 0 failures). `tsc --noEmit` clean (exit 0, no output).
- **GREEN + DEPLOYED.** Latest commit `dc3079c` has **CI = success** and **Deploy to GitHub Pages = success**. (A prior commit's Deploy shows `cancelled` — that is the deploy concurrency group auto-cancelling the superseded run when `dc3079c` was pushed. Expected, not a failure.)
- **Repo hygiene: clean.** Remote has ONLY `refs/heads/main`. Local branches: `main` + `coord/main`. No stashes. No stale worktrees.
- **⚠ There are NO open worker branches or PRs right now.** The remote is `main`-only; there is nothing in a merge queue. **The two real immediate actions are:** (1) the housekeeping **reset of the stale shared checkout** (§6), and (2) **HOLD for the mechanic** (§5). Do NOT go hunting for branches to land — landing worker branches (§3) only applies once one actually appears.
- **Worktrees:**
  - `D:/tb-coord` — **the coordinator worktree**, branch `coord/main` at `dc3079c`. **Do all work here.**
  - `D:\MTB Bike Builder` — the **shared checkout**, currently at **DETACHED HEAD `54d944d`, behind `origin/main`**. It is STALE. Reset it before anyone uses it (see §6 housekeeping). Never coordinate from it.
- **Baseline drift note:** MEMORY.md still describes a ~494-part catalog. Overnight AFK verification/expansion batches grew it to **1772 parts / 758 verified**. Trust the live gates, not the old counts.

---

## 2. Your role

You are the **coordinator**. Your job is to **land worker branches and keep `main` green + deployed**, and to keep the docs/memory coherent. Specifically:

- **LAND finished worker branches — _when they exist_ (right now none do; see §1):** review the diff, merge `--no-ff`, run all three gates, push, delete the remote branch (with user OK), confirm CI + deploy went green. Full workflow in §3.
- **Keep `main` green + deployed** at all times. A red main is your top priority to fix.
- **Keep docs/memory coherent** — update NEXT-STEPS.md counts + status, refresh MEMORY.md after each wave.
- **Do NOT write features or catalog rows yourself by default.** That is worker/subagent work. Exception, used sparingly in the past: small self-contained UI tweaks built directly in a branch when spawning a cold session would waste a warm context — but the default is _coordinate, don't author_.

---

## 3. Operating rules (hard-won — do not relearn the hard way)

### Worktree isolation is MANDATORY
- Operate ONLY from a dedicated worktree (`D:/tb-coord`, branch `coord/main`). If it ever needs recreating:
  ```
  git worktree add ../tb-coord -b coord/main origin/main
  ```
- **NEVER run git in the shared checkout `D:\MTB Bike Builder`.** A live worker session can grab that checkout and corrupt refs mid-command (you will see impossible states like _"main exists but won't resolve"_). Two actors in one checkout = tangled refs.
- **If refs behave impossibly, STOP.** Do not fight it. Trust only `git ls-remote origin` (remote truth is immune to local churn) and operate from a clean worktree.
- **Dispatched subagents with `isolation:'worktree'` still frequently land their first Edit/Read in the shared checkout** (they copy CLAUDE.md's absolute `D:\MTB Bike Builder\` example paths literally). Always tell a dispatched agent explicitly: _"your cwd IS your isolated worktree; do NOT reference `D:\MTB Bike Builder\` paths directly."_

### Per-branch MERGE WORKFLOW (do every step, in order)
**First: is there anything to merge?** Right now the remote is `main`-only — no worker branches or PRs (§1). If that is still true, skip this section entirely; your work is §5/§6. When a worker branch does appear:

1. `git fetch origin` (another actor also pushes to main — always fetch first).
2. **Review the diff.** For any schema/vocab change or verdict-driving field (axle, shock eye/stroke/mount, UDH, BB, wheel/freehub, rotor mount/size, travel, etc.), confirm the value was **sourced from a FETCHED manufacturer page**, not a search summary or retailer.
3. **Gate on branch type — this decides whether you may self-merge.** A **data-row-only catalog branch** is self-mergeable. A branch that touches **`supabase/schema.sql`** OR is a **broad UI diff** needs **explicit user OK BEFORE you merge** — the auto-mode classifier blocks unsupervised schema/UI merges. Do not proceed past here on those without it.
4. `git merge --no-ff <branch>`.
5. **Resolve conflicts.** Almost every conflict is in **`tools/verification-job.json` ONLY** (`src/compat.js` auto-merges clean via category-cluster partitioning). Resolve it with `git checkout --ours tools/verification-job.json` — **never hand-merge the JSON**; you regenerate it in step 7. (Full detail in §7.)
6. **Run ALL THREE gates** — `node validate.js` (0 problems), `npm test` (all pass), `npx tsc --noEmit` (clean). Never weaken a test to make a merge pass; fix the change.
7. **Re-sync `tools/verification-job.json` ONCE per merge wave** (not per branch) via `npm run verify:status`; re-run the gates if it changed.
8. Confirm fast-forward-safe (`git merge-base --is-ancestor origin/main HEAD`), then push: `git push origin HEAD:main`.
9. **Delete the remote branch** — needs **explicit user OK** (the classifier blocks remote-branch deletion).
10. **Poll CI + Deploy** until both show success for the new HEAD.

### THE BAR (never compromise)
- A **wrong verdict is worse than a missing part** — a false _"fits"_ OR a false _"won't fit"_ both destroy the product's whole value.
- **Never weaken a test** to make a change pass — fix the change.
- **A part's existence needs a FETCHED manufacturer page.** Search-result summaries lie.
- **Reject retailer "measured" weights** — only editorial teardowns (Bikerumor / MBR / BikeRadar) count for a measured weight (`sourceType:'measured'` + a `weightSource` URL); interfaces stay manufacturer-sourced, and `sourceType:'retailer'` is rejected on verified rows. (Full fetch-wall map: §7.)
- Adding or strengthening a RED (error) verdict needs a manufacturer compatibility source and a pinning test.

### Push / git safety
- **Fetch before EVERY push.** Another actor (Douglas or another session) also pushes to `main`; there is NO auto-merge automation, only `ci.yml` + `deploy.yml`. Verify fast-forward-safe first: `git merge-base --is-ancestor origin/main HEAD`.
- The **auto-mode classifier BLOCKS** (each needs explicit user OK): remote-branch deletion, `git reset --hard`, stash drops, history rewrites, and unsupervised merges of schema/UI branches. Data-row-only catalog branches were fine to self-merge; anything touching `supabase/schema.sql` or broad UI diffs needs a human/coordinator review step (wired into §3 step 3).
- **PowerShell 5.1 mangles `git commit -m` when the message contains DOUBLE QUOTES** (native-arg quoting — bitten repeatedly). Keep commit messages quote-free, or use the Bash tool with a heredoc.
- **If the PowerShell / Opus classifier is unavailable, route git through the Bash tool** — it classifies fine when PS auto-mode fails ("cannot determine safety").
- **`git add <explicit paths>`, never `git add -A`** — untracked `EXPERT-REVIEW-DOSSIER.pdf` + `scripts/` (the dossier build artifacts, §5) are intentionally untracked and get swept into a commit by `-A`.

---

## 4. Current work state

**The verdict-AUDIT is COMPLETE; active verification is PARKED (not finished). Keep these two claims separate.**

- **Verdict audit — done and clean.** Round 1 **FOUND and FIXED a real false-green** — **Finding 1** (fork `maxRotorF` native-mount conflation on Marzocchi Z2/Z1 + Manitou Mattoc), landed in `c5f409f` / `e7fec52`. **After** that fix the audit harness reports **0 flags / 124 clean**. Round 2 (over the newer, larger catalog regions) found **zero NEW false-greens**. The catalog is verdict-correct, guarded by `test/test-verdict-audit.js`.
- **Verification — PARKED at tooling walls, NOT finished.** ~758 / 1772 verified (43%); **~1014 rows still unverified**, verify-job **~58% processed**. Everything verified is against manufacturer pages/documents. The remaining unverified rows are largely **wall-limited** (see §6 / §7): frames publish no frame-only weight, wheels publish pair weights, forks/shocks publish one reference weight per model, and many maker domains are bot-blocked. Much of the unverified set is intentionally-labeled SAMPLE data — the catalog is honestly-scoped and verdict-clean regardless of verification status. **Resume verification only if tooling access improves.**
- `tools/verification-job.json` tracks ~701 queued (~58% processed); 758 verified, 191 skipped-documented.

---

## 5. What to do next

### TOP priority — the human mechanic dossier review (Phase 0 step 2)
This is the **single top human-blocked item** and the only thing nobody can parallelize around.
- The print-ready packet — **`EXPERT-REVIEW-DOSSIER.pdf`** (built from `EXPERT-REVIEW-DOSSIER.md` by **`scripts/build_dossier_pdf.py`**) — is **DONE** and handed to a mechanic who is **actively reviewing it async**. It is a long clock. **No findings have come back yet.**
- **⚠ WHERE THESE FILES PHYSICALLY LIVE:** `EXPERT-REVIEW-DOSSIER.pdf`, `EXPERT-REVIEW-DOSSIER.md`, and `scripts/build_dossier_pdf.py` are **UNTRACKED and exist ONLY in the shared checkout `D:\MTB Bike Builder`.** Untracked files do **not** propagate to a separate worktree — so from `D:/tb-coord` you will **not** have the PDF or the build script at all. To work with them from the coordinator worktree, **copy them over from the shared checkout, or regenerate the PDF** by running `scripts/build_dossier_pdf.py` against the `.md`. This deliberate untracked state is **exactly why §3 forbids `git add -A`** (which would otherwise commit them).
- When findings land, the playbook is **`tools/MECHANIC-FINDINGS-INTAKE.md`**: it maps all 19 rule areas → their `src/compat.js` region (grep the `ruleId`; line numbers drift) + the pinning test files, plus a per-finding triage template and a gated fast-apply checklist. **Apply one finding per commit**, all three gates green each time, at THE BAR (a wrong verdict beats a missing rule; strengthening/adding a red needs a manufacturer source).

### How to run parallel work
- **`spawn_task` chips** — best when the user is present. Each chip the user clicks spins up its own **worktree-isolated** session and keeps your coordinator context lean. Preferred for well-scoped, self-contained work.
- **Background Agent subagents** — no clicks needed; good when the user is AFK. Dispatch with `isolation:'worktree'` and give the explicit "your cwd IS your worktree" instruction (§3).

### Deliberate HOLDs
- **HOLD big catalog EXPANSION until the mechanic findings land.** New rows should enter against the _final_ rules/vocab; expanding now just grows the merge surface and risks re-work.
- **Do NOT manufacture wall-hitting verification busywork.** Spinning a fleet that just hits documented tooling walls (§7 fetch-wall map) is the waste-burn Douglas explicitly does not want. **If nothing valuable remains to verify, STOP** — resume only if tooling access improves. Before dispatching ANY verification agent, scope it against the §7 fetch-wall map so it doesn't burn on known-403 domains.

---

## 6. Outstanding + parked flags

| Item | Status | Blocked on |
|------|--------|-----------|
| **Reset the STALE shared checkout** `D:\MTB Bike Builder` (detached `54d944d`, behind `origin/main`). Fix (**needs explicit user OK — the classifier blocks `git reset --hard`**): confirm no live session holds it, then from that checkout run **`git fetch origin` FIRST** (so `origin/main` isn't a stale local ref), then `git switch main && git reset --hard origin/main`. **Preserve** untracked `EXPERT-REVIEW-DOSSIER.pdf` + `scripts/` (a hard reset leaves untracked files alone, but confirm before running). | open-housekeeping | explicit user OK **and** confirm no live session holds the shared checkout |
| **Apply mechanic dossier findings** (one per commit via `tools/MECHANIC-FINDINGS-INTAKE.md`). Highest-value pending work. | blocked | human mechanic returning findings (async, in progress) |
| **Verification grind tail** — ~1014 unverified / 1772; ~701 queued (~58% processed). Remaining work is LOW-YIELD (documented tooling walls, §7). Do NOT spin a wall-hitting fleet. | parked-wall-limited | tooling walls (no maker per-size/per-wheel weights; bot-blocked domains) |
| **Product photos / image licensing** (rest of Phase 2). Schema `image`/`colors`/`retailerLinks` + modal render exist; NO real image data (manufacturer photos copyrighted). | blocked | Douglas (permission vs affiliate feed vs placeholders) |
| **Retailer links → affiliate programs** (legit path for price feeds + images). | blocked | Douglas (which affiliate program[s]) |
| **Built-in forum go-live.** NOTE — a community front-door is **already live**: an in-app link to **GitHub Discussions + a welcome post are SHIPPED and LIVE**. Separately, the **native in-app forum** (`feature/forum-builtin`, PR #8) is MERGED but ships **INERT behind `FORUM_ENABLED=false`**. Native go-live = run forum-table migration (`supabase/SETUP.md §7`: `forum_threads`/`forum_posts`, owner-scoped RLS + public read) against live Supabase, then flip the flag — same two-step as Phase 3 accounts. | blocked (native forum only) | Douglas (run migration + flip flag) |
| **Native mobile app + PWA foundation** — fully PARKED (plan-now/build-later, native stores over PWA). Plan in NEXT-STEPS.md. | parked | Douglas (Apple $99/yr + Google $25, Mac/cloud iOS build, build-step sign-off, privacy policy, store assets) |
| **Verdict-audit Lead 3:** XC-frame `maxRotorR=160` on `fr-scott-scale-rc-sl` + `fr-mondraker-f-podium` left "likely correct" (XC frames genuinely cap rear at 160). Only `fr-canyon-lux-world-cup-cf` was fixed (160→180). Confirm against the two maker pages before touching. | open-low-priority | none |
| **a11y follow-up** (app-wide, pre-existing): Chrome default dialog-focus lands on the scrollable `.rm-body` div (overflow-y:auto makes it focusable) instead of a button. Add explicit `autofocus` on a sensible control. Not a regression. | open-minor | none |
| **DRIFT-TRIAGE-2026-07-09 process items** (NOT price corrections — real-drift queue is EMPTY): (a) `sft-sram-sx-eagle` source URL 404s ($40 still current — re-point/re-fetch); (b) `fk-ext-era-v2-29-170` possible weight nudge 2341→2275g per Vital, unconfirmed — check next fork-verify pass; (c) stale `KNOWN_UNFETCHABLE_HOSTS` comment in `tools/drift-check.js` claims no verified part uses giant-bicycles.com, but `fr-giant-glory-advanced` + `fr-giant-trance-x-advanced` now do (silently skipped). | open-low-priority | none |
| **DUP-ID-AUDIT low items** (catalog otherwise fully clean — 0 dupes / 0 broken refs / 0 id violations): (a) independently verify price+weight for 2 fit-identical sample pairs so they stop sharing placeholders — X-Fusion Trace 36/Slide ($899/2000g), Conti Xynotal/Kryptotal Trail ($82.95/1040g); (b) document the Maxxis `mtb` token (bare MaxxTerra) in `DATA-ENTRY-TEMPLATE.md §2`; (c) OPTIONAL: add explicit preset-fills existence check to `validateCatalog`. | open-low-optional | none |
| **Refresh stale repo docs.** NEXT-STEPS.md still cites 329 parts / 204 tests / 271-of-313 verification and calls Phase 3 accounts "built inert, awaiting keys" — but accounts went LIVE + E2E-confirmed 2026-07-08 eve. Update to 1772/758/380 + Phase-3-live. CLAUDE.md is count-free by design; light-refresh its Provenance highlights prose. | open-docs-debt | none |

### Parked flags (documented, non-urgent)
- **`dr-sram-x01-eagle`** — verified with an X0 model-page source (row is X01 Eagle, provenance URL is the X0 page). A name/source provenance MISMATCH, not a verdict error.
- **Alias-vs-removal style nuance** — retire a corrected/superseded part via `ALIASES` vs plain removal. Rule of thumb: _"fundamentally a different SKU"_ = ALIASES; _"this field on the existing part is wrong"_ = plain data edit.
- **~168 wall-limited unverified wheel/tire rows** (plus the broader unverified set) behind tooling walls — future batch only if tooling access improves.
- **Documented NON-RULES the engine deliberately omits** (a wrong rule is worse than a missing one): (1) crankset chainline vs frame Boost/SuperBoost — REJECTED, naive rule false-reds real builds; (2) tire-vs-internal-rim-width too-narrow — deferred, fuzzy thresholds; (3) oversize-rotor-adapter info — low priority. Plus REVIEW.md deferrals: real insertion-depth check + the BB category.
- **Cotic Solaris (steel)** — PM7 mount is 180mm-rotor-ONLY and the frame-side rotor minimum is un-modeled. Noted in the row, accepted gap.
- **Mara Pro chips** (`task_842e0e31` / `task_0d30d4b4` etc.) predate an app restart so they can't be dismissed — the underlying corrections ARE already landed. **Ignore the chips if they resurface.**

---

## 7. Gotchas & references

### Verification fetch walls (scope any dispatch against this)
This is what stops a dispatched verification agent from burning credits on known-dead domains. Before dispatching, scope the target rows against it.
- **Bot-blocked / 403 / JS-shell — treat as UNFETCHABLE:** `bike.shimano.com` (403 — Shimano also publishes no component weights), `specialized.com`, `giant-bicycles.com` (in `KNOWN_UNFETCHABLE_HOSTS`), Trek / Norco / Pivot (JS shells that return no spec text), Spank (flipped to 403), Pinkbike / NSMB / `support.sram.com` (403).
- **Fetch fine (use these):** editorial teardowns for _measured weights_ — **Bikerumor / MBR / BikeRadar**. Known-good maker pages: `sram.com` model pages, RAAW, Commencal `/us/en/frame-*` product pages (NOT the JS landing pages), Canyon, `scott-sports.com`, `privateerbikes.com`, `cotic.co.uk`, `crankbrothers.com`, `hayesbicycle.com`, and `pushindustries.com` (a rare Chrome-extension exception).
- **Weight rule (THE BAR):** retailer / forum / bare "measured" figures are **REJECTED**; only editorial-teardown measured weights count, entered as `sourceType:'measured'` + a `weightSource` URL (validator-enforced). Interfaces are ALWAYS manufacturer-sourced. `sourceType:'retailer'` is rejected on verified rows.
- **Chrome-extension domain policy is account-level** — it blocks most bike-brand domains for the in-browser agent, but plain WebSearch / WebFetch are fine for research. Don't assume a domain is dead just because the extension can't reach it; try WebFetch.

### Preview / launch
- **`preview_start` reads `.claude/launch.json` from the PRIMARY working dir (`D:\MTB Bike Builder`), NOT the coordinator worktree** — a worktree-local `launch.json` is ignored. To preview from `D:/tb-coord`, add a coord config (e.g. port 8135, `runtimeArgs --directory ../tb-coord`) to the SHARED checkout's gitignored `launch.json`.
- **Port 8123 often has a STALE http server still serving the shared checkout** — reloads need a hard-refresh / cache-bust. **Confirm which checkout a preview actually serves before trusting it.**
- `index.html` header-row buttons (`#demoMid`, `#forumNavBtn`) can report a successful `preview_click` with NO effect (hit-testing quirk, not an app bug) — fall back to invoking `el.onclick` directly to verify.
- Account-gated UI in preview uses STUBBED `currentUser`/`listInventory`/`addInventoryItem`. `preview_screenshot` has flaked — DOM-inspection `eval` is the reliable path.

### CI / deploy
- **GitHub Actions runners get CONGESTED — runs QUEUE, they don't fail.** Local gates green ⇒ CI passes; **latest deploy wins**. Confirm the final deploy went green rather than assuming a queued run failed. (A `cancelled` Deploy on a superseded commit is the concurrency group doing its job — not a failure; see §1.)

### Worktrees / Windows
- **Windows-locked worktree removal:** `git worktree remove` can fail on a locked dir — use `git worktree prune` to de-register (leaves a harmless orphan folder on disk).

### Data / tests
- **`test/test-data.js` requires a verified TIRE to carry BOTH `casing` AND `compound`**, even though `schema.js` makes `casing` OPTIONAL — bit verify-wheels-tires-2. No tire promotes to verified without both.
- **`fr-santacruz-megatower-cc` is `test/test-schema.js`'s known-good-UNVERIFIED fixture** (~20 assertions rely on it staying unverified) — **do NOT promote it.**
- **`checkBuild` given id STRINGS instead of part objects** used to silently return 0 errors (false all-clear) — now FIXED (throws). Still pass resolved objects / valid ids in new probes.
- **`tsc` hits "union type too complex to represent" on the `PARTS` array past ~1000 entries** (not a real error). ONLY working fix: a plain `// @ts-ignore` on the line IMMEDIATELY BEFORE `var PARTS = [` (an inline any-cast does NOT work). Real fix if ever needed: split into per-category arrays concatenated — but not while sessions are appending.

### Verify-job re-sync
- **Re-sync `tools/verification-job.json` ONCE per merge wave** via `npm run verify:status` (`node tools/verify-job.js status`), NOT per-branch (wired into §3 step 7). Almost every merge conflict is in `verification-job.json` ONLY (`src/compat.js` auto-merges clean via category-cluster partitioning) — resolve with `git checkout --ours tools/verification-job.json`, then re-run status to regenerate. **Never hand-merge the JSON.**

### Key commands
```
node validate.js        # data check — expect "DATA OK - N parts, 0 problems (...)"
npm test                # full Vitest suite — expect "N passed", 0 failures
npx tsc --noEmit        # type-check — expect no output, exit 0
npm run verify:status   # verification-job state + live counts (re-sync once per wave)
```

**Definition of green:** `validate` 0 problems **AND** all tests pass **AND** `tsc` clean **AND** CI + Deploy both success for the pushed HEAD. Anything less is not landable.