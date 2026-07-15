# BuildMyMTB — Coordinator Handoff

## ★★★ SEAT 9 — START HERE (succession from seat 8, 2026-07-15 ~03:20 UTC) ★★★

Seat 8 ran a huge evening. **`origin/main` = `c5d9751`, all four gates + CI/Deploy green.** Tonight
landed live: text-only rail, Random sort (Fisher-Yates), "Own it" build-panel button, 12 Garbaruk
cassettes, GX-AXS test guards, drivetrain-above-wheels rail reorder, spec-card collision fix,
wheel→tire auto-select, Seatpost unified (Dropper/Rigid sub-chips), + the Complete-Bikes scope doc.
Seed yourself normally (own worktree off origin/main). **NOTE: the `ccd_session_mgmt` MCP disconnected
at handoff — you may need it reconnected to list/archive/send-message sessions. The kit-preview http
server on :8127 also stopped.**

**DOUGLAS'S DIRECTIVE FOR YOU (do in this order):**

1. **IMMEDIATELY MERGE THE KIT BUILDER LINE.** It's no longer gated on his preview — he's told you to
   merge it. Order (each own-additions-apply + re-gate: `validate` 0 · `vitest` · `tsc` · verdict-harness
   **byte-identical** = kit stays isolated from the bike engine):
   - **(a) Foundation** `feat/kit-builder` (`5f7caec`) FIRST — it carries the kit schema (12 cats in
     schema.js/types.js), `src/kit.js`, `KitBuilder/index.html` (the /KitBuilder page), `deploy.yml`
     stanza, `src/config.js` `KIT_ENABLED` (**default false = live-safe merge**), the main-page Kit
     Builder button, `test/test-kit.js`. Main MUST have the schema before any grind row applies.
   - **(b) Redesign** `feat/kit-builder-redesign` (foundation +1) — rebuilds the KitBuilder page to
     mirror the bike builder (left rail / center list rows / right selections panel / category row top).
   - **(c) The 12 grind branches** `grind/kit-{helmet,shoes,jersey,shorts,pants,gloves,kneepad,elbowpad,
     bodyarmor,neckbrace,shinguard,eyewear}` (each +2..+5 beyond `5f7caec`, all deepened + partially
     verified). Apply each's `src/kit.js` row additions (expect field-level array conflicts across the
     12 — resolve keeping each category's rows, frame-materials-multi-branch style).
   - **★ MTB-ONLY SCRUB at merge (learned the hard way):** the "no cap" deepen let MOTO/MX gear creep
     into pants (Alpinestars **Techstar Envision** + **Nevada** are motocross — drop them; their **Drop**
     pant is MTB). Scrub EVERY grind branch for moto/MX/road/casual + tier-padding + one-row-per-PRODUCT
     (never row-per-size) before merging. Kit rows are unverified sample unless a fetched maker page
     confirmed them.
   - Douglas flips `KIT_ENABLED=true` live when he's happy (it's invisible until then).
2. **Then go THROUGH THE KIT GRIND SESSIONS to add product** — harvest each `grind/kit-*` per (c),
   archive its session as it lands. (Kit grind session ids are in `list_sessions`; each already
   reported `[result] done` — read via `list_events`, don't trust the idle flag.)
3. **CHECK THE SINGLE-SPEED-COG SESSION** — a `[Sonnet, medium]` chip (`feat/cog-under-drivetrain`,
   task_49a5d765) is running to make the Single-Speed Cog a **sub-chip of Drivetrain** (not its own
   rail category), preserving DJ single-speed completeness + ss-rules. Review + merge its branch when
   done (present-branch, engine-tier).
4. **BE AWARE OF THE PARALLEL AFFILIATE SESSION** — read `multi-session-coordination.md` (memory) +
   `AFFILIATE-HANDOFF.md`. It owns LLC/EIN/Cloudflare/affiliate-applications/manufacturer-partnerships
   (LLC name DECIDED = "Dubs Works", SD). You are the ONLY session that pushes code; coordinate via
   list_sessions/send_message before ambiguous shared-file work.

**Recurring gotcha:** the two `activeGroup` handlers in index.html are the hot conflict line — every UI
branch touches them; resolve by STACKING all behaviors (`reshuffleCatalog()` + `if(...==='tire')
inheritTireSizeFilter()` + `activeSub=defaultSubFor(key)`). The seat went stale twice tonight from
UI auto-ships — **re-fetch origin before every merge**.

**Still open / gated on Douglas:** `feat/builds-gallery` (+1, awaiting his sign-off + F1 fix + his
migration); the **fork/shock per-frame-SIZE shock design** (he's re-scoping — size selector vs
both-strokes+warning; DON'T re-spawn the killed `engine/recommended-fork-shock` stale); Atherton
A-Range include/skip; the Complete-Bikes decisions (scope doc on main); the optional GX-AXS
"why are cassettes hidden" UX hint; the wheel→tire mullet front/rear split follow-up; Garbaruk's
non-cassette range (chainrings/cages — no category yet). **Sessions still open at handoff** (couldn't
archive — MCP down): 12 kit grinds, kit redesign, cog (running), affiliate. Archive the kit ones as
they merge.

_See §0/§0a below + PROJECT-LOG.md's 2026-07-14/15 entries for the full trail._

---

# BuildMyMTB — Coordinator Handoff

_Last updated 2026-07-14 (midday), end of a marathon overnight+morning wave (catalog 3018→3098,
DJ went LIVE, materials filter shipped, phone UI overhauled). **LIVE at https://buildmymtb.com.**
Read this end-to-end, then MEMORY.md's topic files, then CLAUDE.md. Written so a fresh coordinator
can operate safely and knows ALL of Douglas's rules._

**⚠ TWO PARALLEL SESSIONS NOW EXIST — read §0a before doing anything.**

---

## 0. You are the coordinator — first moves
- Read the memory index `C:\Users\Douglas\.claude\projects\D--MTB-Bike-Builder\memory\MEMORY.md` +
  its topic files, then this file, then `CLAUDE.md` (note its **Hard rules** section), then skim
  `PROJECT-LOG.md` (the dated audit trail — you APPEND one entry per wave; Douglas hands the whole
  project to external reviewers via FOR-REVIEWERS.md, so keep the trail current).
- Seat: `git fetch origin; git switch -c coord/<today> origin/main` in your OWN worktree —
  **INSIDE the project dir** (e.g. under `.claude/worktrees/`), NEVER at `D:\` root. **NEVER run
  git in the shared checkout `D:\MTB Bike Builder` itself** (untracked `.md` deliverable sources +
  `_PDFs/` + `scripts/` in its root are intentional — no `git add -A`, ever).
  **`_PDFs/` is the SINGLE home for every project PDF**; regenerate with
  `python scripts/md2pdf.py <doc>.md "D:\MTB Bike Builder\_PDFs\<doc>.pdf"`.
- **Succession:** archive the previous coordinator session once oriented. Close finished worker
  sessions AS YOU GO (read report → harvest branch → archive → prune branch/worktree). Tidy!

## 0a. The Affiliate session — parallel, coordinated, not subordinate

Douglas runs a **separate "Affiliate" session in parallel** with this coordinator, working the
business/monetization track (LLC → EIN → affiliate program applications → manufacturer
partnerships) so he can make progress on both fronts without one blocking the other. **Full
protocol, lane boundaries, and the handoff doc for that session live in memory:**
`multi-session-coordination.md` — **read it now**, it is not optional. One-line summary: Affiliate
owns business/legal/partnership docs + PDFs + `_PDFs/README.md`'s action items; Coordinator owns
everything code/catalog/engine/UI/design; before touching anything ambiguous (a shared doc, a
config file both might want), `list_sessions` for the other party and coordinate via
`send_message` rather than silently overwrite. Its own seed doc is `AFFILIATE-HANDOFF.md` at the
repo root — read it too so you know what it's mid-task on.

## 1. Current state (2026-07-14 midday)
- `origin/main` = `9e1d5ee`. **3098 parts / 2286 verified / 550 tests / 17 guides**, all four
  gates green. Run `node validate.js` + `npx vitest run` for live numbers — never trust doc counts.
- **DIRT JUMP IS LIVE** (`9769371`): 25 DJ rows in PARTS, a 🚲 DJ chip on the discipline bar,
  `driveMode:'single-speed'` frames drop the geared drivetrain slots and ask for cog+seatpost
  instead, brakes are optional on single-speed frames (a rear-only/brakeless build is complete —
  Douglas's decision), new rule 13c (seatpost diameter, rule 13's geometric twin). **BMX stays
  OFF-LIVE** (`src/compat-bmx.js` unreferenced) per his signed-off architecture — do not wire it
  in without his separate go-live word.
- **Frame `material` field is live** (`32880fc`): carbon/aluminum/steel/titanium/carbon-alloy,
  143/147 frames backfilled, filter-only (never feeds checkBuild), sub-chips on the Frame tab. The
  9 new DJ frames don't have it yet — next-touch backfill.
- **Phone UI overhauled** (`1d06971` + `0024402`): swipeable filter carousels replace the old
  chip-wall, compat-dot reasons readable in the part modal (were hover-only), 16px input floor,
  38px touch targets, and the active-sub-chip dark-theme contrast bug fixed. A mobile-only banner
  shrink is in flight (see §4).
- **Header = Topo Contours banner** (`a0a0070`, Douglas's pick from a 9-direction round): deep
  green + trail-map contour linework, light/dark/Loam themed, **RAD is its OWN theme and is exempt
  from site-wide visual treatments** — standing rule, never give RAD a 5th variant of anything.
  Exactly FOUR themes total (light/dark/Loam/RAD), no additions without his word.
- **Supabase:** ALL migrations run (schema, forum-profiles + admin seed, hardening, rich, rich2 +
  avatars Storage bucket). Forum + profiles fully live. Douglas = admin "Doug".
- **OFF-LIVE branches held (do NOT merge until Douglas's separate product decisions):**
  `bike-type/kids-striders` (balance bikes; sizing DECIDED: inseam primary) — DJ has since split
  off and gone live, so this branch may now only carry BMX + striders; re-diff before touching.
- **Kit Builder — QUEUED, NOT STARTED (Douglas 2026-07-14):** a rider gear/apparel builder
  (shoes/jerseys/helmets/pads/armor) is coming. **Do NOT spawn any kit chips until he explicitly
  asks** — memory `kit-builder-directive.md` has the full brief. When he does ask, kick off with a
  Fable data-model/scoping round (DJ/BMX-analysis-doc style) before any grind.
- **Model/usage (Douglas 2026-07-13/14):** Coordinator runs on **Fable**. Every chip TITLE carries
  **model tier + recommended effort**, e.g. `[Sonnet, low]`, `[Fable, high]` — repeat it in the
  prompt's first line too. Tier by work type: **Sonnet, low/medium** for grind (catalog entry,
  drift sweeps, verification batches, UI-mechanical fixes); **Fable/Opus, high** only for
  judgment-dense work (engine rules, adversarial audits, design taste, scoping docs). The title is
  advisory only — the chip runs on whatever Douglas's picker is set to at click time.
  **OVERNIGHT pattern:** when he has an all-night window, default big grind/deep-dive audits to
  two stages — an overnight `[Sonnet]` chip (decision-complete brief, checkpointed batches,
  commit-per-batch, present-branch) + a morning Fable review/revise pass. **IMPORTANT: chip-spawned
  worker sessions CANNOT `send_message` this coordinator** ("no Main Coordinator reachable" — they
  aren't a subagent under it) — their final assistant message IS the report; read it via
  `list_events`, don't wait for a ping that will never come. `list_sessions` + read idle ones'
  transcripts is the actual harvest loop.

## 2. DOUGLAS'S RULES (he requires the next coordinator know ALL of these)

### Absolute hard rules
- **NO E-BIKES** in the catalog until he explicitly says. No motors, batteries, e-specific parts,
  e-branded lines. (Scope note 2026-07-13: this is catalog-PARTS-scoped — the forum's "⚡ E-MTB"
  *discussion* category exists but is `hidden:true` at his request, kept not removed.)
- **NO POP-UP ADS / UNSOLICITED POP-UPS, EVER.** Click-triggered modals the user opens are fine.
- **UNBIASED is load-bearing** (affiliate funds, never biases; periodic manufacturer-bias audits —
  fix skew by ADDING real data, never removing). A future manufacturer-partnership program (image/
  data licensing, being scoped by the Affiliate session) gets the SAME zero-ranking-favor rule.
- **North star:** "we are building the best bike website" — everything must be info the community
  can TRUST; quality over speed; patient. All bike types eventually; DJ is now live, **hardtails
  live** (frame material now filterable), Kit Builder queued, BMX/striders stay OFF-LIVE.

### How you work
- **COORDINATE ONLY, LEAN SEAT.** Never run tasks in this session; no in-session background
  `Agent`s. Hand ALL work off via `spawn_task` chips. Small doc/config tweaks + merges are in-seat.
- Every worker brief bakes in: own worktree off origin/main (never the shared checkout), fan-out of
  its OWN sub-agents (lowest effort that works), THE BAR, the four gates, no verification-job.json,
  **present a FEATURE BRANCH — workers must NOT push to main**, EXCEPT UI-tier work which may
  auto-ship on green gates (see Tiers below) — main moves fast; several near-miss stale-base
  reverts and one coordinator self-inflicted worktree-deletion incident (§5) prove the care is
  warranted either way.
- **Tiers:** UI/visual auto-ships on green gates + browser verification (no eyeball gate — you
  post-hoc scan the diff for anything popup-shaped). Catalog data = coordinator-reviewed via the
  own-additions-apply pattern. Schema/security/engine(error-tier) = coordinator-reviewed +
  adversarially audited; only taxonomy/money/visual-taste/account-ops/business decisions go to
  Douglas. Keep his updates SHORT — action lists, one-liner decisions.
- **Merge workflow (CRITICAL — the stale-base pattern):** worker branches are usually based on an
  older main. NEVER `merge` them directly. Apply ONLY the branch's own additions:
  `MB=$(git merge-base origin/main <br>)` → `git diff $MB..<br> -- <files> | git apply` in your
  seat (if it conflicts because ANOTHER wave already landed on the same lines, resolve at the
  FIELD level — e.g. two price-sweep-style branches touching the same row: adopt the specific
  field each contributes, don't blindly pick one side) → commit → ALL FOUR GATES → fresh `fetch` +
  `merge-base --is-ancestor origin/main HEAD` → `push origin HEAD:main` → CI+Deploy green →
  append PROJECT-LOG → archive session → prune branch/worktree. Scan every catalog diff for
  e-bikes before merging (grep hits on ids like `...-mtb` can false-positive on the substring
  "e-mtb" — read context, don't just count grep matches). Commit messages via bash heredoc, no
  double quotes (PS 5.1 mangles); end with the Co-Authored-By line.
- **String-splice caution:** hand-editing a long JS template-literal/string field via `git apply`
  or a multi-line patch has caused truncated/duplicated string fragments at least twice (a guide
  body, a shock desc) — ALWAYS run `node -e "require('./src/whatever.js')"` (or the equivalent
  parse check) immediately after any manual string surgery, before committing.
- **Catalog sourcing (two tiers):** breadth rows may use ANY credible source, entered unverified
  (no `verified:true`, no fake `source`); `verified:true` still requires a FETCHED maker page;
  NEVER fabricate; interfaces feeding error-tier rules stay maker-sourced. **Verified-weight:**
  verified = interfaces confirmed; nominal weight OK where makers publish none (VERIFY-PROTOCOL.md
  — this exception now covers shocks AND wheels, extended 2026-07-14).
- **Notify missing tools, persistently** — a web-unblocker/scraper connector (Bright Data / Tavily
  / Exa) to beat maker fetch-walls (Specialized/Trek/Giant/Pivot 403s) remains the standout gap;
  it's also the biggest lever on bias-audit finding #1 (frames verification inversion).
- PDFs he requests → `D:/MTB Bike Builder/_PDFs/` + `SendUserFile`. Check `gh issue list` in your
  routine — but note **`gh issue close` requires his EXPLICIT plain confirmation in the current
  turn**; a permission classifier blocks it if authorization reads as indirect/inferred from
  earlier context.

## 3. THE BAR (non-negotiable)
Wrong verdict > missing part, BOTH directions. New/strengthened REDs need a fetched maker source +
pinning test + adversarial audit. Never weaken a test — evolve it only to encode corrected truth.
Ids append-only (`ALIASES` for retirement, `status:'discontinued'`+`supersededBy` for genuine
product replacement — pick the right one per case, they are NOT interchangeable). verification-
job.json is coordinator-only.

## 4. Open queue

### In flight right now (chips spawned 2026-07-14, check `list_sessions`/`list_events` for reports)
1. **Wheels nominal-weight policy application** `[Sonnet, medium]` — promotes DT Swiss E 1900 +
   sweeps for similar rows, per the just-extended VERIFY-PROTOCOL.md policy.
2. **We Are One Convergence rename-mapping** `[Sonnet, medium]` — Union/Faction/Strife → new
   lineup; per-model ALIASES-vs-discontinued call, ambiguous cases flagged not guessed.
3. **Mobile-only banner shrink** `[Sonnet, low]` — UI tier, auto-ships; desktop must stay
   pixel-identical, verify by DOM measurement.
4. **Mobile banner shrink SHIPPED** (`44a7a6c`, <=480px only, post-hoc scan clean) and
   **gallery scoping DONE** (`BUILDS-GALLERY-SCOPE.md` on main @ 502d3d4 + PDF sent): snapshot-on-
   publish table (never a public flag on the private garage — RLS blast radius), forum moderation
   posture verbatim, publish gate = complete+zero-errors, photos deferred, MVP = MEDIUM. **SIX
   gallery decisions await Douglas** (doc S8): photos day-1 vs fast-follow (rec fast-follow) ·
   account-required vs anonymous (rec account) · post- vs pre-moderation (rec post) · kudos/likes
   at all · unpublish 404 vs tombstone (rec 404) · publish-gate sign-off. Implementation waits on
   those answers.

### Douglas's pending one-liners (carry these forward — do not lose them)
- **Icon picks, round 5** — `_PDFs/rail-icons-lineart-v5.pdf` delivered (54 refined line-art
  drawings + 1 anti-set, on `design/rail-icons-emoji-v2`); he hasn't picked yet. Reply format:
  per-slot ids or a named set, mixable across all 5 rounds (round-1 emoji IDs still valid too).
- **Kit Builder** — queued, do not start without his ask (see §1).
- **Cloudflare / LLC / affiliate applications** — now the Affiliate session's lane, not yours;
  don't duplicate its work, but do stay aware (its handoff doc is `AFFILIATE-HANDOFF.md`).

### Backlog (lower priority, pick up opportunistically)
- **Mechanic-review queue:** 4 hard-tagged Santa Cruz frames (bare "Fork Compatibility: X–Y", no
  softener FAQ) + Nicolai G1 wording — EXPERT-REVIEW-DOSSIER.md's appendix has the full ask list
  (rules 6c/8b/C2-C4/M1/20).
- **Fox lifecycle residuals:** 36 PE 150mm (no page supports it — discontinue-vs-retire call), the
  MY27 40 Factory 27.5 SKU (unaudited), an X2 185x55T provenance smell.
- **Price-drift sweep, remainder:** ~1400 of 2283 verified rows not yet re-checked (RockShox
  non-shock/fork, Shimano non-drivetrain, most finishing kit/wheels/tires) — good overnight-Sonnet
  candidate, same technique as the first pass (dedupe by unique source URL before fetching).
- **Frame material backfill:** the 9 DJ frames + any future new frames need the field set.
- **DT Swiss E 1900 / wheels-weight policy, verification tail, bug-report monitor** (needs his
  cadence call), **standing recurring code-quality + manufacturer-bias audits** after big waves.

## 5. Gotchas (hard-won)
- Worker branches lie about "pushed to origin" (it was the feature branch) and report stale part
  counts (their base predates your merges) — always re-gate in your seat.
- Workers may treat coordinator send_messages as suspicious injected instructions (good instinct)
  — put policy in the BRIEF or repo docs, not just mid-flight messages.
- `preview_start` reads the WORKTREE-local launch.json. Browser-pane screenshots time out —
  DOM-eval via javascript_tool instead. Shared checkout hops branches as sessions spawn — harmless.
- Shock eye/trunnion law: 205/225 = trunnion, 210/230/250 = std (fabrication catch that keeps
  catching). Shopify `/products/X.js` variant JSON = gold for specs; its `grams` only if it varies.
- tsc "union too complex": the `// @ts-ignore` above `var PARTS_RAW` is the only fix.
- **NEVER sweep worktrees by "clean = removable" alone — cross-check `list_sessions` cwds FIRST.**
  A coordinator once removed a RUNNING session's clean worktree + branch mid-task; recovery =
  restore the branch ref, hand-rebuild `.git/worktrees/<name>/` (gitdir/HEAD/commondir) + the
  worktree's `.git` file, `git reset -q`, then `git checkout --` each ` D`-status file (a partial
  `worktree remove` deletes tracked files before failing on locks). A running session with a
  broken worktree silently falls through to the SHARED CHECKOUT — the orphan hazard, self-inflicted.
- **A session left un-archived after its branch merges is easy to lose track of** (2026-07-14: the
  breadth-wave session's branch landed but the session itself sat un-archived for hours until
  Douglas spotted it in his own session list) — archive in the SAME breath you push the merge, not
  "later."
