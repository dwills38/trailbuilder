# BuildMyMTB — Coordinator Handoff

_Last updated 2026-07-11 (late evening), at the end of a large feature + harvest session.
**LIVE at https://buildmymtb.com.** Read this end-to-end before touching git. Written so a fresh
coordinator with zero context can operate safely and knows **all of Douglas's rules & preferences.**_

---

## 0. You are the coordinator — first moves
- Read the memory index `C:\Users\Douglas\.claude\projects\D--MTB-Bike-Builder\memory\MEMORY.md`
  + the topic files it points to, then this file end-to-end, then `CLAUDE.md`.
- `git fetch origin; git switch -c coord/<today> origin/main` in your **OWN worktree/seat**.
  **NEVER run git in the shared checkout `D:\MTB Bike Builder`** — it stays on main / a claude branch
  for other sessions; untracked dossier PDFs + `_TO-REVIEW/` + `scripts/` in its root are intentional
  (never `git add -A`).
- **Succession:** archive the previous coordinator session once oriented. Close finished worker
  sessions AS YOU GO (read report → harvest branch → archive). Sweep branches/worktrees/launch.json
  entries the moment work lands.

## 1. Current state (2026-07-11 late)
- **LIVE at buildmymtb.com.** `origin/main` = `8fa5484`. ~2016 parts / ~1480 verified / 440 tests.
  CI + Deploy green. Always run `node validate.js` + `npx vitest run` for live numbers — never trust
  doc counts.
- **Shipped this session** (each CI+Deploy green, live-verified): list-card buttons side-by-side;
  the 3 legal pages (privacy/terms/affiliate-disclosure) + footer + on-page FTC disclosure +
  `rel=sponsored`; clickable home logo; **the forum usernames/profiles/admin/verified-pro system**
  (code live, feature-detects gracefully pre-migration); a regression test for bug #2 (Madonna V2.2
  fork travel — the report was a stale cache, catalog was already correct); +3 frames.
- **⚠ THE ONE PENDING GATE: Douglas must run the Supabase forum migration.** The forum code is live
  but dormant until he runs `supabase/forum-profiles.sql` + the admin-grant (see §4.1). I
  security-reviewed the migration end-to-end — privilege escalation is impossible (a BEFORE trigger
  pins `is_admin`/`verified_pro` off for every end-user JWT; only the service-role SQL editor grants
  them; reserved names enforced server-side).
- **Board: only random-builds staged** — branch `ui-random-builds-current` passed all 3 of Douglas's
  requirements (different every click / always compatible / fits the button), awaiting his browser
  eyeball. Everything else this session is shipped or delivered.

## 2. DOUGLAS'S RULES & PREFERENCES (he asked that the next coordinator know ALL of these)

### Vision & quality bar
- This is a **"super polished DIAMOND, undeniable"** — a serious flagship, NOT a quick project.
- Code creed for every worker brief: **tidy · clean · efficient · unbiased · good data · unbreakable.**
- **UNBIASED is doubled / load-bearing.** Affiliate revenue funds the site but NEVER biases
  recommendations — `retailerLinks` never feed `checkBuild`; keep it structural. Run **periodic
  manufacturer-bias audits** (after big catalog waves + ~monthly) AND **recurring code-efficiency/
  quality audits** (not just one-offs).

### How you work
- **COORDINATE ONLY — the seat stays LEAN and NEVER runs tasks in its own context.** Hand ALL task
  work OFF to SEPARATE sessions Douglas runs — via `spawn_task` chips (recommended model in the TITLE)
  or, preferred, copy-paste prompt blocks (model+effort header). **Do NOT spawn in-session background
  `Agent`s/subagents to do task work** (audits, grind, features): that runs the task INSIDE the
  coordinator seat, metering against it and bloating its context — Douglas rejected this explicitly
  (2026-07-11: _"I don't want the coordinator sessions to run tasks. I want to keep them lean to
  coordinate."_). The seat's own tool use is limited to coordination: read/review, git review+merge+
  gates, session management, doc/memory coherence. Only small, self-contained doc/config tweaks belong
  in a warm coordinator context.
- **The SEPARATE worker session fans out + adaptive effort:** every worker prompt MUST tell that
  session it may run MULTIPLE background agents when parallelizable, pick its own model+effort per
  sub-task, DEFAULT to the lowest effort that works and escalate only when needed. Use the 7900X/64GB
  box fully — don't throttle. (This fan-out happens in the worker session, NOT the coordinator.)
- **Picker leak:** chips inherit Douglas's model PICKER at click time regardless of the title. Keep
  the default picker on Sonnet; he flips to Opus for heavy/coordinator chips. He sometimes prefers a
  **copy-paste prompt** (to control model/effort himself) — hand him one with the model+effort noted.
- **Merge workflow per branch:** fetch → per-id interface diff (catalog branches) → ALL FOUR gates
  (`node validate.js` 0 problems / `npx vitest run` all pass / `npx tsc --noEmit` clean /
  `node tools/verdict-audit-harness.js` 0 flags — the section-E 4-fork note is pre-existing) →
  fetch + `git merge-base --is-ancestor origin/main HEAD` → `git push origin HEAD:main` (FF) →
  confirm CI + Deploy green → `branch -d`, archive the session.
- **Data-row catalog branches self-merge through your gates. Schema + ALL UI/visual + security
  changes STAGE on a local preview for Douglas's BROWSER eyeball first** — he says "ship it" (or
  "ship it and I'll check live" for lower-risk). Always include a **Ctrl+Shift+R** reminder + the
  localhost link.
- **Adversarially audit anything feeding an ERROR-tier rule OR security** before merge (frames,
  drivetrain system/actuation, rotor/hub, RLS/privilege-escalation). `catalog-auditor` (Opus) is the
  pinned agent.
- **Pricing:** always the CURRENT manufacturer MSRP, never launch.
- **Git hygiene:** never git in the shared checkout; commit messages via Bash heredoc, no double
  quotes; `git add <explicit paths>` only, never -A; IDs append-only (a correction that changes
  identity = FLAG + `ALIASES`).
- **Deliverables Douglas uses offline → PDFs** (untracked repo root + `SendUserFile`). The
  **`_TO-REVIEW/`** folder at the repo root holds his current action-PDFs + a README index — keep it
  current.
- **He glazes over long updates.** Keep him a clean, current ACTION list and resurface it; surface
  only what needs his eyes; don't flood. Ask only for genuinely-his decisions (taste, taxonomy,
  money, tier changes, destructive/public/account actions). Never close/comment on GitHub issues,
  post public content, or touch his accounts without his OK.

### Forum / community values
- **FREE SPEECH first** (First Amendment; "speak very very very freely"). The auto-moderator (queued)
  guards **mechanical ABUSE only** (flood/spam/scam-links/illegal/doxxing), NEVER viewpoint/opinion/
  profanity — rude/controversial takes stay. Reports → the human (admin) queue; **NEVER auto-hide by
  report count** (anti-brigade). A behavioral EARLY-WARNING flags trending targeted harassment for
  the admin (human decides). **Child safety is the one hard auto-line** (predatory/grooming toward
  minors + CSAM → remove + report) — scoped as anti-PREDATION conduct, never topic/identity policing.
  **NO pornographic images** (posts or profile photos) — a content-type carve-out, viewpoint-neutral.
- **Profiles:** signup requires only **email + username + password** (Supabase email+password;
  magic-link/GitHub optional). Usernames allow spaces + are case-insensitive-unique; his real name +
  variations are reserved (impersonation), Gnarfather/The Mechanic/The Pilot are held for him.
  **Verified-pro** badge (admin grants real pros, e.g. Brage/Åsa). Queued follow-ups: **rich profiles**
  (photo/bio/riding-style — photo needs Supabase Storage), **sticky/pinned threads** (admin).

### Bug reports & monitoring
- In-app "report a wrong verdict" → GitHub ISSUES on `REPORT_REPO`=dwills38/trailbuilder.
  **Check `gh issue list` in your routine** (a report sat unseen for days once). He wants a **monitor**
  (scheduled agent that triages new reports + notifies him + optionally auto-spawns a fix) — QUEUED,
  needs his cadence / notify-method / notify-only-vs-auto-fix decision.

### Marketplace (future, not scoped)
- Buy/sell used parts, tied INTO the builder (see used parts available for each part). HARD
  requirement = super-scam-secure from day one (identity/seller verification, escrow or a trusted
  processor — never touch card data, fraud detection, disputes, moderation).

### His identity
- **Doug** / Douglas Wadsworth Wills / **Pennsylvania** / contact **`Doug@buildmymtb.com`** (pending
  Cloudflare routing — Gmail on the pages until then). Favorite LLC name so far: **"Dubs Works"** —
  remind him at LLC-formation time.

## 3. THE BAR (verdict correctness — non-negotiable)
Wrong verdict > missing part, both directions. Specs exist only on FETCHED maker/authoritative pages
(snippets + third-party aggregators lie). `verified:true` = real maker source URL + non-future date
(validator-enforced). Retailer weights rejected; editorial teardowns = weight only
(`sourceType:'measured'` + `weightSource`). New/strengthened REDs need a maker source + a pinning
test. **Never weaken a test.** `fr-santacruz-megatower-cc` verified-status is a test fixture.
Golden-breaking corrections get FLAGGED, not applied.

## 4. Immediate queue

### 4.1 Douglas's actions (his to-do — `_TO-REVIEW/` mirrors this)
1. **Turn on the forum** — in the Supabase SQL editor: (a) run `supabase/forum-profiles.sql`;
   (b) `select id, email from auth.users where email='douglas.w.wills@gmail.com';`;
   (c) `insert into public.profiles (user_id,username,is_admin) values ('<id>','Doug',true)
   on conflict (user_id) do update set is_admin=true, username='Doug';` → hard-refresh buildmymtb.com.
   Optional: delete the "Welcome to TrailBuilder" thread —
   `delete from public.forum_threads where title ilike '%welcome%';` (or one click in the admin UI).
2. **Cloudflare** (`_TO-REVIEW/CLOUDFLARE-SETUP.pdf`): set up Doug@ routing + Web Analytics
   (decide beacon Option A/B) → ping the coordinator to ship staged `chore/cloudflare-prep`.
3. **LLC:** pick a name (2 name-idea PDFs) → PA/USPTO/.com checks → form the LLC + get an EIN.
4. **Affiliate signups** (after LLC+EIN): AvantLink → Impact.
5. **Random-builds eyeball** (`ui-random-builds-current`) → ship on his OK.

### 4.2 Coordinator's queue
- **Ship `chore/cloudflare-prep`** when Douglas confirms Doug@ routes (rebase onto main first — it's
  off an older main; email swap + privacy update, HTML-only).
- **Spawn follow-ups AFTER Douglas runs the forum migration:** rich profiles, the free-speech-first
  auto-mod ([[forum-automod-philosophy]]), sticky threads.
- **Build the bug-report monitor** (once he gives cadence/notify/scope).
- **Re-run the code-efficiency review** — a corrected copy-paste prompt was handed to Douglas; it must
  run as a WORKER in its OWN worktree, ignoring coordinator memory (the first attempt misfired by
  adopting coordinator context at the repo root).
- Frame expansion is essentially COMPLETE for fetchable makers (low yield); the verification tail
  (~536) is wall-limited — don't manufacture busywork.
- Style pass (queued, Douglas schedules — mountain-panorama header art etc.).

## 5. Source & fetch map
Detail in `tools/VERIFY-PROTOCOL.md` + git history. Fetch-fine: sram/rockshox model pages, canecreek,
chrisking, wolftooth, commencal, canyon, RAAW, transition, ibis, santacruz support pages, privateer,
cotic, scott-sports, knolly, evil, rockymountain, devinci, GT, nicolai, spank (non-www), hopetech
PDFs, kmc, galfer/hayes/magura/TRP/trickstuff. Walls: specialized/trek/norco/pivot/giant/propain/
orbea (JS or 403), FSA, Acros, We Are One (password), web.archive.org unreachable. Shimano publishes
no component weights; `productinfo.shimano.com` archive-edition PDFs are the pay route.

## 6. Gotchas (hard-won)
- **The deploy workflow stages ONLY `index.html` + `src/`** into `_site` — new root files (the legal
  pages, CNAME) need a `cp` line in `.github/workflows/deploy.yml`.
- Supabase login redirects are origin-based (auto-adapt); only the Supabase dashboard allow-list needs
  the domain.
- Browser-pane screenshots time out here — verify via `javascript_tool` DOM-eval.
- `preview_start` reads the PRIMARY working dir's launch.json for the coordinator; a SESSION's pane
  reads its WORKTREE-local launch.json — sessions must write their entry locally.
- The app hops the shared checkout onto claude/* branches as sessions spawn — harmless; run
  `git worktree list` before switching branches; reattach main between waves.
- A session opened at the REPO ROOT inherits full coordinator memory and may behave as a coordinator —
  chips get their own worktree; copy-paste WORKER prompts must say "you are a worker, ignore
  coordinator memory, make your own worktree."
- Rebased branches can look "unmerged" (`branch -d` fails though content is on main) — confirm with a
  content grep, then `-D`.
- tsc "union too complex": the `// @ts-ignore` above `var PARTS_RAW` is the only working fix.
- Forum security model: a BEFORE INSERT/UPDATE trigger on `public.profiles` pins `is_admin` +
  `verified_pro` off for any real end-user JWT; only the service-role SQL editor grants them; reserved
  usernames enforced server-side (blocked real-name rows kept PRIVATE from clients).

## 7. Memory
`MEMORY.md` (one-line index) + topic files hold the durable detail: [[workflow-preferences]]
[[product-values]] [[hardware-capacity]] [[parallel-work-delivery]] [[forum-usernames-reqs]]
[[forum-automod-philosophy]] [[manufacturer-bias-audits]] [[bug-report-pipeline]]
[[randomized-sample-builds]] [[product-roadmap-ideas]] [[affiliate-push]] + the catalog/fetch
learnings. Update them as-you-go; keep MEMORY.md a one-line-per-entry INDEX (it hit ~20-24KB once —
compact if it nears the read limit; detail lives in the topic files).
