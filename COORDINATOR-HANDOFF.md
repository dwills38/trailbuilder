# TrailBuilder — Coordinator Handoff

_Last updated: 2026-07-11 ~00:30, at the end of the 2026-07-10→11 feature-and-verification marathon. Read this end-to-end before touching git. Written so a fresh coordinator with zero context can operate safely._

---

## 1. TL;DR — current state

- **Catalog: 1865 parts / 1337 verified (72%) / 436 tests** at handoff — run `node validate.js` + `npm test` for live numbers; never trust doc counts, they drift within hours. `origin/main` = `76c1656`, CI + Deploy green, live at dwills38.github.io/trailbuilder.
- **Shipped LIVE this marathon** (each browser-verified on the deployed site): 🌙 dark mode (replaced Roadie; OS-default + persisted), tire-width filter chips (data-derived), **headset category** (rule 20: steerer active / S.H.I.S. bore check now live on **77/127 frames** / advisory), the **in-app forum** (Supabase; **18 categories**, app-side vocab in `src/forum.js` — more categories never need SQL), **catalog list view** (default; ▦/☰ toggle; pure-CSS same-DOM views = parity by construction), **guided build flow** (pick → auto-advance + compatible-only; structural bulk-load immunity), mobile `[hidden]` hardening, **rule 6b** (integrated-cassette wheels — e13 LG1r), the SM-RT rotor re-verifications, wave-r3 (72 promotions + 10 BB rows).
- **FINAL FREEZE 2026-07-11 ~03:40 (the outgoing coordinator's last state).** Shipped since the 03:00 note: **the COMPLETE LIST PACKAGE `f7e12c1`** (table-aligned rows + width stretch + density: 44px rows, 14 parts/screen, live-verified; all list branches swept) and the permission allowlist + reminders (`21aabf2`). **IN FLIGHT — your immediate queue, in order:**
  1. **`ui-rail-refine` — DONE, UNHARVESTED (do this FIRST):** Douglas's rail reorder (discipline ABOVE category, nothing else in the rail; filter toggles + dark/RAD + sample builds + legend back up top; Community/login to the header). Review, stage on a preview port, get HIS browser eyeball, ship on his verbatim word, live-verify, sweep + archive its session.
  2. **NIGHT SHIFT session — RUNNING with a corrective history:** it opened on Fable/max (picker inheritance) and drifted into self-grinding (WebFetch in its own context); the outgoing coordinator sent a send_message correction and Douglas was asked to flip its session model to Sonnet — VERIFY both took (get_session shows model; transcript shows no own-context WebFetch). It holds the data-row self-merge mandate (per-id diff + audits + four gates + CI per push; schema/UI/vocab/preset = flag-only) and Wave-0 ownership of the 8 `expansion-r3-*` branches — do NOT race it on catalog branches; read its morning report + the memory line before touching any catalog work.
  3. **Budget-demo-fix session** (running): the wave's Durolux axle correction made the fixed Budget sample build genuinely clash — small index.html fix, stage/gate normally.
  4. **random-builds session** (running, Opus): compat-aware random sample-build generator + seeded property tests; it interacts with the Budget fix and the goldens — its brief handles both; stage for Douglas (UI behavior change).
  5. **Remind Douglas of the settings block (§4.5)** and **archive the outgoing coordinator session** once you're oriented.
- **Blocked on Douglas (business):** **domain purchase — he does it 2026-07-11 (today)**; when he hands the name: CNAME file + Pages custom domain + exact DNS records for him + HTTPS + **Supabase auth-redirect updates or logins break** + OG/meta/canonical + docs links. Then affiliate signups (AvantLink/Impact/Amazon), then the bike-park stickers (spec in NEXT-STEPS — crack-and-peel liner is his hard requirement).
- **Worktrees at handoff:** shared checkout `D:\MTB Bike Builder` on `main` (NEVER coordinate from it; untracked dossier PDFs + `scripts/` in its root are intentional — hence no `git add -A`, ever), `D:/tb-land` = the coordinator landing seat, session worktrees under `.claude/worktrees/` for the in-flight sessions above, `D:/tb-coord` = a long-stale prior coordinator seat (removable once nothing holds it).

## 2. Role & mechanics

You **coordinate**: design chips (one per task/wave, recommended model in the TITLE), review + merge worker branches, keep main green + deployed, keep docs/memory coherent. You do not author features except small self-contained tweaks in a warm context.

- **Sessions:** `mcp__ccd_session_mgmt__*` — `list_sessions` to survey, `archive_session` to close finished ones (stops the process + cleans its worktree; Douglas one-click approves each — he never hunts windows), `send_message` to wake/steer a live session (used to wake the left-rail session when its prerequisites landed), `list_events` to read a finished session's report.
- **SUCCESSION RULE (Douglas's standing order, 2026-07-11):** a new coordinator session's first housekeeping act, once oriented, is to **archive the previous coordinator session** — and every coordinator **closes finished sessions AS YOU GO** (read the report → harvest the branch → archive; never let done sessions pile up). Tidiness is a stated preference: sessions, branches, worktrees, and launch.json entries are swept the moment their work lands.
- **COORDINATE-ONLY (Douglas's standing order, 2026-07-11):** the coordinator session does judgment/merge/staging work only — **all authoring is split off to chips/worker sessions** to keep this seat's usage and context low. His code creed for every worker brief: *tidy, clean, efficient, unbreakable*.
- **Agents:** the pinned `catalog-worker`/`catalog-auditor` types from `.claude/agents/` may NOT be registered in a coordinator session's Agent tool — fallback that works: `subagent_type:'general-purpose'` + `model:'opus'` with the audit brief inline (used for the frames S.H.I.S. audit — 28/28 re-fetch, clean).
- **Merge workflow per branch:** fetch → scope check → **per-id interface-field diff** for catalog branches (script pattern: parse rows from both refs, diff non-provenance fields; every hard change must match a declared, maker-quoted correction) → `merge --no-ff` → ALL FOUR gates (`node validate.js` 0 problems / `npm test` all pass / `npx tsc --noEmit` clean / `node tools/verdict-audit-harness.js` 0 flags, Section E informational) → verify-job re-sync ONCE per wave (`npm run verify:status`, commit; **never hand-merge that JSON, coordinator-only file**) → fetch + `git merge-base --is-ancestor origin/main HEAD` → `push origin HEAD:main` → CI + Deploy green → `branch -d`, archive the session.
- **Schema / broad-UI branches need Douglas's explicit sign-off before push** (taxonomy/design-level, not code-level). Adversarially audit anything feeding an ERROR-tier rule before merging (frames S.H.I.S. precedent).
- **Git hygiene:** commit messages via Bash heredoc, NO double quotes (PS 5.1 mangles); `git add <explicit paths>` only; ids append-only (a correction that changes product identity = FLAG, not edit; `ALIASES` for same-SKU retirement).

## 3. THE BAR (unchanged, non-negotiable)

Wrong verdict > missing part, both directions. Specs exist only on FETCHED maker/authoritative pages (snippets lie). `verified:true` = real source URL + non-future date. Retailer weights rejected; editorial teardowns = weight only (`sourceType:'measured'` + `weightSource`). New/strengthened REDs need a maker source + pinning test. Never weaken a test. `fr-santacruz-megatower-cc` verified-status is a test fixture. Golden-breaking corrections get FLAGGED to the coordinator, not applied.

## 4. What to do next

1. **The rail verdict** (see §1) — everything else UI waits on it; the **style pass** (queued in NEXT-STEPS: mountain-panorama header art etc.) is explicitly sequenced after the rail lands.
2. **Domain cutover** when Douglas buys (checklist in §1/NEXT-STEPS).
3. **Follow-up queue:** LG1r duplicate ex-HG row-pairs → ALIASES consolidation (4 pairs, same physical SKU post-correction); headTube vocab gaps a sourced page mentioned (ZS49 upper, ZS62 lower, IS41 lower — widen only when a sourced headset needs them); **preset wave prerequisites** (5 items from the pilot: all-fills-verified validator rule, lint-vs-real-MSRP semantics, kitExtras convention, preset provenance in VERIFY-PROTOCOL, fix `co-oneup-aluminum`'s synthesized price) — do NOT mass-grind presets (honest yield 2/133); `bb-ethirteen-pf92-p3` pending; document the r.jina.ai-proxy + archived-handbook routes in `tools/VERIFY-PROTOCOL.md`.
4. **Verification tail** (~528 unverified, job 85% processed): mostly wall-limited (Specialized/Trek 403s, no frame-only weights). Don't manufacture wall-hitting busywork.
5. **REMIND DOUGLAS — three settings on HIS side he asked to be reminded of** (2026-07-11; raise these early in your first exchange):
   - **Chrome extension site access** (claude.ai / extension settings): the account-level domain policy blocks the in-browser agent on nearly every bike-brand site — loosening per-site permissions would open the JS-walled makers (Trek, Specialized, Norco, Pivot, Giant) to browser-based verification, potentially hundreds of currently-unverifiable rows. Re-test with claude-in-chrome after he changes it (last confirmed blocked 2026-07-08).
   - **Default model picker → Sonnet**: chips inherit the picker at click time; a Sonnet default means a mis-click never silently burns Fable. He switches up deliberately only for the coordinator seat.
   - **Cloud/remote agent availability** (claude.ai plan/feature settings): recent chips attempt `isolation:'remote'` with local fallback — if his plan enables remote environments, overnight fleets gain width at zero local RAM.
   (The fourth recommendation — the permission allowlist — is DONE: `.claude/settings.json` is committed with 30 read-only allow entries, so every session worktree inherits it; git merge/push and other mutating commands still classifier-gate by design.)

## 5. Source & fetch map (delta on top of tools/VERIFY-PROTOCOL.md)

- **NEW route that pays:** Shimano's **archived edition handbooks** at `productinfo.shimano.com/pdfs/product/archive/…` — maker-official, period-correct for older-gen parts (the 2020-2021 edition has the real RT-MT rotor column the latest lacks). Direct download + `pdftotext -layout`/pypdf; WebFetch's summarizer cannot parse the tables and CAUSED the SM-RT cross-reference false-verifications.
- Shopify storefronts (`/products/<handle>.js`) give variant JSON incl. `grams` — trust the grams only if it VARIES per config (flat value = shipping placeholder; Chris King 205g precedent).
- Fetch fine: canecreek, chrisking, wolftooth, commencal `/frame-*`, canyon, RAAW, transition, ibis, santacruz SUPPORT pages, privateer, cotic, scott-sports, knolly, evil FAQ pages, rockymountain, devinci, GT, nicolai/geometron, spank-ind.com (non-www), hopetech PDFs, sram model pages, galfer/hayes/magura/TRP/trickstuff.
- Walls: specialized (site-wide), trek/norco/pivot/giant/propain (JS shells or 403), FSA 403, Acros 404, We Are One password-walled, onyxrp 403, **web.archive.org unreachable from tooling**, orbea WAF-403.

## 6. Gotchas (hard-won today)

- `preview_start` reads launch.json from the PRIMARY working dir for the coordinator, but a SESSION's pane reads its **worktree-local snapshot** — sessions must write their entry to BOTH.
- Empty branches look "merged": gate live-lane preconditions on fresh-fetch `merge-base --is-ancestor` + a **content grep** of origin/main, never `branch --merged` alone (the left-rail session caught its own false-positive).
- Browser-pane screenshots time out in this environment — DOM-eval assertions via `javascript_tool` are the verification path; behavioral checks beat pixel checks.
- The app hops the shared checkout onto `claude/*` branches / detached HEADs as sessions spawn — harmless; reattach `main` between waves, never mid-wave.
- Forum vocab lives in `src/forum.js` (`FORUM_CATEGORIES`) — labels/descs rewordable anytime, `key`s permanent; the category column feature-detects, so UI and SQL can deploy in either order.
- `buildTotals` skips a bundled group's non-fill slots — why BB and headset are their own single-slot optional groups. `slotRequired` is frame-aware AND now rear-wheel-aware (integrated cassette).
- tsc "union too complex": the `// @ts-ignore` above `var PARTS_RAW` is the only working fix.

## 7. Session log — 2026-07-10→11 (this coordinator)

Housekeeping sweep (49 branches/33 worktrees/70+ sessions cleared across the day, archive_session mechanism established) → dark mode + tire-width shipped → forum live (Douglas ran both migrations, coordinator flipped flags; write-path smoke-tested by Douglas) → wave-r3 landed (9 lanes, 2 false-fit kills, 1 fabrication caught by audit, 2 main-side false-verifications demoted) → headset category landed (BB-pattern) → 18 forum categories → list view → guided flow → LG1r rule 6b + SM-RT re-verifications → frames S.H.I.S. grind (28/28 audit) → left-rail staged for Douglas. Main never went red; every push deployed green; every schema/error-tier change was gated or audited.
