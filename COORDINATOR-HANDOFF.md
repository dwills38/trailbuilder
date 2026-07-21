# BuildMyMTB — Coordinator Handoff

## ★ STANDING SUCCESSION RULE (Douglas, 2026-07-18 — PERMANENT, applies to every future seat) ★

Coordinator sessions are titled **"Main Coordinator (Seat N)"**. At every handoff the INCOMING
seat does the housekeeping automatically — Douglas never renames/unpins/archives by hand again:

1. **Rename handshake** (a session CANNOT self-rename — `set_session_title` only works on OTHER
   sessions): once oriented, `send_message` the retiring seat N (its session id MUST be in the
   seeding prompt) asking it to title the successor. Seat N finds the new session via
   `list_sessions` (the coordinator-cwd session that isn't itself, Partnerships, or the bug-triage
   vessel), runs `set_session_title` → **"Main Coordinator (Seat N+1)"**, and confirms.
2. **Archive** the retired seat N session (the standing auto-archive grant covers it). If seat N
   never wakes to confirm the rename, don't block — tell Douglas the title gap in one line.
3. **Unpin:** there is NO pin/unpin API. Archiving normally clears the session from the active
   list; if the pin survives in Douglas's sidebar, tell him in one line — that single click is the
   only residual manual step (standing notify-missing-tools flag: self-rename + pin/unpin APIs).
4. Every retiring seat's handoff/seeding prompt MUST restate this rule and include its own
   session id. Also recorded in memory: `coordinator-succession-protocol.md`.

---

## ★★★ SEAT 16 — START HERE (succession from seat 15, 2026-07-21) ★★★

Seed normally: `git fetch origin; git worktree add .claude/worktrees/coord-<today>-s16 -b
coord/<today>-s16 origin/main` (Hard rule #5 — and note: the containment hook is now ACTUALLY
enforced, see the earned-rules below). Run the gates yourself, never trust doc counts.
**State at handoff: main `c756232`+ green — MTB 5,033 (3,163 verified, 62.9%) · Kit 706 (534)
· BMX 227 (90 — Douglas's 40% bar HIT) · Road 217 (128) · Gravel 223 (78) · Striders 36 (28)
· EMTB 92 (66) · complete bikes 174/437 sheet-verified · 875 tests · tsc clean · 7 validators.
ALL SIX SURFACES LIVE on buildmymtb.com (MTB, BMX, Road, Gravel, E-MTB, RideKit) plus /home
(the D2c family front door), /about (D4), and ddubsworks.com (its own Pages repo
dwills38/ddubsworks, HTTPS enforced — source of truth stays sites/ddubsworks/ here).**

**★ SEATING SEQUENCE (in order):**
1. **Succession handshake** — send_message the session titled "Main Coordinator (Seat 15)"
   (id: `local_aff21c09-65a1-4cc1-ac36-aa7c7357f924`) asking it to set_session_title you to
   "Main Coordinator (Seat 16)"; archive it on confirm. If it never wakes, one line to
   Douglas, don't block.
2. **RE-ARM TWO session-lifetime watchers** (they die with the seat; the four durable
   scheduled tasks — daily bug-triage, monthly drift 6th, monthly bias 12th, quarterly
   recall — survive on their own, do NOT recreate): (a) the hourly fleet-sweep cron;
   (b) **the worker-report folder Monitor** on `D:\MTB Bike Builder\.claude\worker-reports`
   (persistent bash loop watching for new .md files — THIS is how reports reach you now).
3. Read HANDOFF-CHIPS.md (refreshed) + memory MEMORY.md + CLAUDE.md Hard rules 1-5.

**★ THE REPORT-DROP PROTOCOL (seat 15's fix for the hung-message pattern — PERMANENT):**
send_message ALWAYS prompts the SENDER's user, so unattended workers' final messages hang on
Douglas's unclicked approval. Every chip's FINAL ACT = write the full report to
`.claude/worker-reports/<branch-slug>.md`; your folder Monitor fires within a minute;
send_message is optional best-effort, never waited on. Also in every chip: the STAND-DOWN
clause ("if your exact branch already exists with commits, stand down and report") — Douglas
double-pasted 4 of 9 chips once; git's one-branch-one-worktree rule made it safe, the clause
makes it graceful. Harvest → review → merge in YOUR worktree → gates → push → PROJECT-LOG →
archive vessel + remove worktree + delete merged branch, same breath.

**★ OPEN SESSIONS AT HANDOFF (verify with list_sessions — this ages fast):** SIX workers in
flight, all with the report-drop clause: **CB-SHEETS-6** (the nine un-walled brands —
mtb-tail-4's report maps each brand's access technique), **Service log feature** (index.html
+ supabase/schema.sql — Douglas runs the SQL once at merge), **Fabricate-fill audit**
(REPORT-ONLY by design — its fix list comes back through you before anything touches a
catalog), **Gravel 7** (Ekar bundle + status/supersededBy schema port), **Kit 11**
(remainder sweep), **Road 11** (archive chase + wheels/cockpit tail). Plus: "Affiliate
Setup" = Douglas's Partnerships lane, NEVER touch; bug-triage vessels accumulate daily,
harmless, leave them.

**★ DOUGLAS'S DECISION QUEUE (raise gently, never nag):** (1) the five-row Cloudflare
REDIRECT BATCH — all targets live, table in seat 15's transcript + domain-portfolio memory;
his clicks whenever; (2) fabricate-fill audit verdicts when they land (fix list needs his
eyes if anything ugly surfaces); (3) FC-MT612 — absent from 6 Shimano handbook editions:
OEM-only or entry error, his call; (4) the empty D:\mtb-worktrees shell folder — one manual
right-click to delete (top-level D:\ is deletion-protected from sessions, correctly);
(5) gravel CX-tag + rim-brake vocab questions (logged across waves 2-6); (6) carried older
items: fr-trek-slash orphan dedupe, Ibis dedup pair, verified-badge semantics + price-policy
gap, gallery six, reviews.sql levers, Supabase MFA/CAPTCHA check, Cloudflare Vitals read,
Finder two, recall-badge scoping, fitter paywalls.

**★ RULES EARNED THIS SEAT (beyond the standing set — details in PROJECT-LOG 2026-07-20/21):**
· **CONTAINMENT IS LIVE NOW**: the PreToolUse guard (tools/hooks/guard-worktree-path.js,
  matcher Bash|PowerShell) was silently OFF for days because the SHARED checkout's stale
  uncommitted settings.json predated the hooks block — live sessions read that file. If you
  ever see shared-checkout settings.json drift from main, RE-SYNC IT IMMEDIATELY.
· **Error-tier relaxations need YOUR OWN fetch** — and when two first-party sources conflict
  (Fox shop page said 203, Fox engineering drawing said 230), the CONSERVATIVE ceiling stands
  and the conflict goes to the mechanic-review queue. Seat 15 reverted a worker's relaxation
  on exactly this.
· **Walls are stale by default**: specialized.com, then NINE more "walled" brands, then
  Cannondale's wall (a wrong URL pattern) all fell on re-test. Browser pane + one honest
  retry before trusting any wall note older than a week.
· **Shimano doctrine**: productinfo per-SKU pages work in the browser pane (WebFetch renders
  them empty) and carry REAL weights for road/Di2/pedals (mechanical MTB tiers stay blank —
  CLAUDE.md footnoted); dense handbook PDF tables must be READ AS RENDERED IMAGES (pdftoppm),
  pdftotext -layout fabricates column alignments.
· **Never bulk-edit repo text via PowerShell string ops** (PS5.1 reads UTF-8-no-BOM as ANSI —
  a Set-Content pass mojibake'd 911 lines before the diff-stat caught it; use the Edit tool
  or node fs with explicit utf8).
· **The headless pane NEVER fires <dialog> close events** (and other quirks — memory
  `browser-pane-screenshots.md`); verify close-dependent behavior via puppeteer.
· **Interface-exception extensions are Douglas-ratified BY DISPATCHING the chip** — six on
  the books now (shocks, wheels, forks, BMX small parts, Shimano mechanical MTB, bundled
  shift-brake systems). The chip text must state the ruling explicitly.
· **ALIASES everywhere**: MTB, BMX, and kit all carry the tombstone contract now; gravel/
  road/EMTB get theirs at first need (gravel's status/supersededBy port is in-flight).
  NEVER remove an id from a live catalog without one.

**Standing workflow (unchanged otherwise):** four gates (+harness on compat.js changes) on
every merge; UI auto-ships on green gates + browser verify + popup scan; engine/error-tier =
adversarial review; only taxonomy/money/visual-taste/account/business decisions to Douglas,
kept SHORT; ANSWER-FIRST; paste-blocks with [Model, effort] headers. Seat-15 trail:
PROJECT-LOG.md 2026-07-20 evening → 2026-07-21 entries (the biggest single-seat shipping run
yet: ~30 branches, six surfaces live, the family completed, ddubsworks launched, BMX bar hit,
report-drop infrastructure, containment actually enforced).

---

## ★★★ SEAT 15 — START HERE (succession from seat 14, 2026-07-20 evening) ★★★

Seed normally: `git fetch origin; git worktree add .claude/worktrees/coord-<today>-s15 -b
coord/<today>-s15 origin/main` (Hard rule #5: INSIDE the project, never D:\ root; never
git-mutate the shared checkout — it sits on a stale branch pointer, leave it). Run the gates
yourself, never trust doc counts. **State at handoff: main green — MTB 5,024 (3,054 verified,
60.8%) · Kit 714 (471) · BMX 225 LIVE (75, 33.3%) · Road 211 off-live (68) · Gravel 198
off-live (27) · Striders 36 · EMTB 75 · 831 tests · tsc clean · 7 validators · ONE shared
drop-bar engine (`src/compat-road.js`, off-live, containment-tested).**

**★ SEATING SEQUENCE (in order):**
1. **THE SUCCESSION RULE (top of this file) is LIVE** — send_message the session titled
   **"Main Coordinator (Seat 14)"** (find it via list_sessions; titles are the identifier)
   asking it to run set_session_title on you → "Main Coordinator (Seat 15)"; on its confirm,
   archive it. If it never wakes, one line to Douglas, don't block.
2. **RE-ARM YOUR HOURLY FLEET SWEEP CRON** (session crons die with the seat; the FOUR durable
   scheduled tasks — daily bug-triage ~8:52a, monthly drift 6th, monthly bias 12th, quarterly
   recall — survive on their own, do NOT recreate them). Sweep = list_sessions → harvest idle
   reports (list_events; workers' send_message can hang — a frozen lastActivityAt with a
   trailing send_message means HARVEST FROM THE BRANCH directly) → stale-base own-additions
   apply → gates → push → PROJECT-LOG → archive in the same breath.
3. Read HANDOFF-CHIPS.md (refreshed for this seat) + memory MEMORY.md topics + CLAUDE.md
   (note Hard rules 1-5, esp. #4 paste-blocks-never-click-chips and #5 file containment,
   hook-enforced).

**★ OPEN SESSIONS AT HANDOFF (verify with list_sessions — this list ages):**
- **"Drop-bar catalog cleanup"** (RUNNING) — hg-l2 error-tier token check, GRX wheel gap +
  golden, gravel FD split, BB token unification. Harvest normally; the hg-l2 item is
  error-tier so verify its Shimano-doc quote before merging.
- **"Home page D1/D4 build"** (RUNNING) — Douglas-approved family switcher + /home.html.
  LIVE-SURFACE UI: popup scan + keyboard walk + the deploy.yml cp line are the review points
  (a new root .html silently 404s in production without that cp line).
- **"Home page mockups round 2"** (RUNNING) — D2/D3 decision aids for Douglas. NOTHING ships
  from it; deliverable = preview + packet for his pick.
- **"Home page design directions"** (IDLE — DO NOT ARCHIVE) — round 1's mockups live UNTRACKED
  in its worktree `.claude/worktrees/hp1-87cc`; preview relaunches via
  `preview_start {name:"hp1-87cc"}` (port 8167). Hold until Douglas decides D2/D3 AND round 2
  has copied the mockups; then archive + remove the worktree.
- **"Affiliate Setup"** = Douglas's Partnerships/business lane — NEVER touch; you are the only
  code-pusher. Three **"Bug report triage"** vessels (daily durable task spawns one per run;
  they accumulate — harmless, leave them).

**★ DOUGLAS'S DECISION QUEUE (raise gently, never nag):** (1) D2/D3 home-page call once
round-2 mockups land; (2) the kit 3-row verified disagreement (hm-100-altec,
hm-troyleedesigns-d4-composite-mips, sho-shimano-xc5 — kit-3 verified them, kit-4 says
discontinued; needs one tiebreak fetch); (3) fr-trek-slash orphan dedupe (ALIASES-retire vs
status:'discontinued'); (4) old standing items: Ibis dedup pair, verified-badge semantics +
price-policy gap, gallery six, reviews.sql three levers + running hardening-2.sql (M1 query
FIRST) + reviews.sql itself, Supabase MFA/CAPTCHA check, Cloudflare Vitals Explorer read,
EMTB four, Finder two, recall-badge scoping, fitter paywalls. (5) Eventually: road/gravel
page-build + flip words (engines + catalogs now exist; drop-bar cleanup closes the data
flags); BMX 40% bar is 15 rows away (small-parts sweeps on static-HTML brands per wave 4's
honest read).

**★ THE RULES THAT WERE EARNED-OR-REAFFIRMED THIS SEAT (all in VERIFY-PROTOCOL.md / CLAUDE.md
— read them there; headlines only):** ANSWER-FIRST when Douglas asks a question ·
paste-blocks with [Model, effort] headers, never click-chips · FILE CONTAINMENT hook-enforced
(worktrees at .claude/worktrees/ only) · FETCH ETHICS (never defeat anti-bot; CAPTCHA = wall;
Five Ten/adidas is the ONLY confirmed wall left) · **JS-RENDERED ≠ BOT-WALLED** (click the
Specs tabs in the browser pane before calling anything walled — three "walls" fell this way:
Trek, Specialized, Norco/Cannondale/Propain/Orbea) · **PHANTOM-NUMBER hazard** (fetch/search
summaries invent figures; every committed number must be literally present in raw page text) ·
kit apparel needs no weight except helmets; accurate weights welcome everywhere (more-info
principle: data liberal, UI curated) · frames interface-exception incl. complete-bike-only
(three mandatory conditions) · THE PRICE RULE · mission statement B is OFFICIAL (top of
docs/MISSION.md — quote verbatim, never paraphrase into overclaim).

**★ HARD-WON MECHANICS (will bite you if skipped):** catalog rows are MULTI-LINE — never
resolve stale-base conflicts with whole-hunk "take theirs"; use the ROW-BLOCK MERGE (parse
blocks by id, apply changed blocks onto HEAD, guard verified:true regressions, assert row
counts before/after — a naive merge silently deleted 7 kit rows before the count check caught
it; pattern recorded in PROJECT-LOG 2026-07-20) · e-bike grep hits on "complete-bike"
substrings — read context · relaxing an error-tier ceiling (maxRotor/travel/udh) is the
false-FITS direction: verify the maker quote yourself before merging (the Roscoe 180→203 and
Cannondale udh fixes were both stock-part-inference bugs — never infer limits from stock
parts) · verdict-audit harness pins part scenarios, NOT complete-bike fills — byte-identical
harness does not prove a cb-fills change is safe, re-measure with the committed bias-r4 scan
scripts · workers' final send_message can hang: harvest from the branch, archive clears the
hung process.

**Standing workflow (unchanged):** stale-base own-additions apply (row-block variant for
catalogs); four gates + harness before/after on any compat.js change; UI auto-ships on green
gates + browser verify + popup scan; engine/error-tier = adversarial review; catalog =
coordinator-reviewed; archive in the same breath you merge; one PROJECT-LOG entry per
wave; only taxonomy/money/visual-taste/account/business decisions to Douglas, kept SHORT.
Seat-14 trail: PROJECT-LOG.md 2026-07-18 → 2026-07-20 entries.

---

## ★★★ SEAT 14 — START HERE (succession from seat 13, 2026-07-18 evening) ★★★

Seed normally: `git fetch origin; git worktree add .claude/worktrees/coord-<today> -b
coord/<today> origin/main` (NEVER D:\ root; never git-mutate the shared checkout). Run the gates
yourself, never trust doc counts. **State at handoff: main = `0a256ec`, all gates green — MTB
5,023 parts (2,972 verified) · Kit 714 (436) · BMX 225 LIVE (59) · Road 150 / Gravel 150 /
Striders 36 / EMTB 75 all off-live · 764 tests · tsc clean · 7 validators.**

**★ FIRST ACTION: archive seat 13 (`local_e4e56bd4`), then RE-ARM YOUR HOURLY FLEET SWEEP CRON**
(session crons die with the seat; the four DURABLE scheduled tasks — bug-triage/drift/bias/recall —
survive on their own, do NOT recreate them). **THE FLEET IS EMPTY** — every worker was harvested and
archived tonight; only "Partnerships" (Douglas's business lane, never touch) and the bug-triage
vessel remain. Your job starts by dispatching from the chip list below.

**★ THE ANSWER-FIRST RULE (he corrected seat 13 TWICE — do not repeat):** when Douglas's message
contains a question, ANSWER IT FIRST, before any harvest/merge/sweep in the same turn; if the answer
needs a tool call, that call goes first. Deferring the answer to the end of a long reply is a
violation. **★ PASTE-BLOCKS, NEVER CLICK-CHIPS** (`CLAUDE.md` Hard rule #4): every worker task is a
fenced copy-paste block with a `[Model, effort]` first line so HE sets model+effort at dispatch.

**★ WHAT SEAT 13 SHIPPED:** slider WCAG 2.5.7 fix (all 7 range axes get numeric inputs) · NAV-16
site-wide hash router (forum/inventory/profile are real Back-able, shareable URLs) + a
coordinator-caught load-time crash in it · **the verified-flag integrity audit: 55 falsely-verified
rows demoted** · **THE PRICE RULE formalized** (verified = interfaces+weight, NEVER a US-MSRP claim;
wrong-product prices still disqualifying) + the badge legend disclosure so it stops overclaiming ·
PCPartPicker references scrubbed repo-wide + a clean security-exposure audit (nothing sensitive ever
committed) · emoji stripped from the 8 sample-build buttons · UI-expert round 4 COMPLETE (7/7
chapters MASTER + a new research-methods chapter) · mechanic round 2 complete · Bright Data billing
doctrine CORRECTED (see the warning below) · Image Coordinator seat created and RETIRED same day.

**★ LANES ARE BACK TO TWO.** The Image Coordinator experiment was retired on Douglas's word hours
after creation — image *sourcing/legal* went to the **"Partnerships"** session (the retitled
Affiliate lane, which already owned outreach; the OPEN Tier A/B image decision sits in its queue),
and *ImageService engineering* is normal chip-lane work under YOU once he approves the TDD. His
lesson, worth generalizing: **a new standing coordinator seat is the heavyweight option — it costs
him a relay point and splits one relationship across two voices. Prefer widening a lane, or a chip.**

**★ DOUGLAS'S OPEN DECISIONS (raise gently, never nag):** (1) **Tier A/B image ruling** — he gave a
Tier B go-word BEFORE Partnerships' objection reached him; final confirm still pending, three modes
on the table (raw / outreach-first [recommended] / Tier A-only) — memory `product-images-priority`
has the full record; (2) BMX grind priority — it is LIVE at 26% verified against his own ~40%
go-live bar, but his flagship-first directive says MTB depth comes first; (3) the Ibis DEDUP call
(two id pairs that are each one real product entered twice — id retirement + ALIASES, coordinator
tier); (4) cog weight-exception policy (DMR confirms the interface, publishes no per-cog weight);
(5) the frames interface-verification exception is UNWRITTEN — the audit recommends formalizing it;
(6) four named row calls in `tools/VERIFIED-FLAG-AUDIT-2026-07-18.md` incl. an apparent duplicate
DVO fork id pair; (7) **read Cloudflare Vitals Explorer** (minutes, no code — converts every corpus
performance claim from inference to measurement, and gates closing PRF-8); (8) HOME PAGE (ancient
standing TODO — remind, needs his scoping); (9) reviews.sql 2 HIGH security findings (file staged,
not run — fix before he ever runs it); (10) Supabase MFA/CAPTCHA check.

**★★ FETCH ETHICS — DOUGLAS RULED 2026-07-18: "let's keep it ethical so as not to upset any
partners." NON-NEGOTIABLE, full doctrine in `tools/VERIFY-PROTOCOL.md`'s FETCH ETHICS section.**
We do **not** defeat anti-bot protection, on any brand, for any spec. Background: seat 13 noticed
mid-session that the Bright Data Web Unlocker's *function* is bot-detection/CAPTCHA bypass — which
the coordinator's own operating rules prohibit — after having used it heavily and written "use it
freely" into the protocol. Corrected and superseded.

**The distinction that makes the ethical path cheap:** rendering JavaScript is NOT circumvention;
defeating a bot-wall IS. Most project "walls" were only the former. **Fetch order: WebFetch → Exa →
the BROWSER PANE (`preview_start {url}` + `javascript_tool`) → `bdata search` for URL lookup only →
STOP.** An active anti-bot challenge is a documented wall, not a task: `Skipped`/`Failed` with the
wall named, or enter the row as honest unverified sample data. **`bdata scrape` is retired from
routine use; never put it back in a worker brief.** PROVEN: the plain browser pane rendered
pivotcycles.com's full build-tier pricing on a page a worker called uncapturable even under the
unlocker — the clean path outperformed it. **Douglas asked to be TOLD if this ever becomes a
genuine roadblock (a whole category stalling, materially hurting the catalog) so he can revisit —
escalate it to him as a decision, never route around it.** Related and still gated: the Tier B
image design (acquiring maker/retailer images without permission) stays DESIGNED-BUT-GATED until
his recorded word — same ethical family, same partner-relationship logic.

**★ HARD-WON THIS SEAT:** content-grep `origin/main` is ground truth — over branch pointers AND over
a coordinator's own claims (a worker caught seat 13 falsely logging a merge that never staged: after
any `git apply`, run `git status` and stage explicitly, because `git add <file>` silently drops
everything unnamed) · pin worker branches to an explicit SHA at listing time, since a live worker can
advance mid-sweep (that double-counted a batch) · never grep for a field token that also appears in
free-text `desc` prose (nearly demoted a correct row) · run the parse-check IMMEDIATELY after any
string surgery, not batched (an unescaped apostrophe broke compat.js) · **verified rows can carry
wrong error-tier interfaces and wrong fills** — the Yeti ARC BB and four Ibis fills both proved it,
so re-reads against maker sheets are worth real budget · parallel clusters must NOT touch
`tools/verification-job.json` (one shared file = guaranteed conflict); dispositions go to
`tools/verify-notes-<cluster>.md` and the coordinator syncs centrally — that pattern worked cleanly
across four parallel workers tonight.

**Standing workflow (unchanged):** stale-base own-additions apply; four gates + harness
before/after on ANY compat.js change; UI auto-ships on green gates + browser verify + popup scan;
engine/error-tier = adversarial review; archive in the same breath you merge; one PROJECT-LOG entry
per wave; only taxonomy/money/visual-taste/account/business decisions go to Douglas, kept SHORT.

_Seat-13 trail: PROJECT-LOG.md 2026-07-18 entries. The full chip list he asked to be carried
forward is in **`HANDOFF-CHIPS.md`** at the repo root — 13 paste-ready blocks._

---

## ★★★ SEAT 13 (succession from seat 12, 2026-07-18) ★★★
_(FINAL — refreshed at the handoff moment, 2026-07-18. main = cedd4b6, all gates green.)_

Seed normally: `git fetch origin; git worktree add .claude/worktrees/coord-<today> -b
coord/<today> origin/main` (NEVER at D:\ root; never git-mutate the shared checkout — it sits
on a STALE branch pointer by prior accident; leave it). Run the gates yourself, never trust
doc counts. State at drafting: **MTB 5,023 parts (3,014 verified, 60.0%) · Kit 714 (436,
61.1%) · BMX 225 LIVE (59) · Road 150 off-live (32) · Gravel 150 off-live (26) · Striders 36
off-live (5) · EMTB 75 off-live (0) — SEVEN validators, one `node validate.js` gate; 757
tests; tsc clean.** Live surfaces: index.html (MTB), KitBuilder (BuildMyKit), bmx.html
(BuildMyBMX), guides (42), 4 themes (Pee Wee is PRESERVED-NOT-LIVE: branch ui/theme-peewee +
tag keep/theme-peewee; re-add = revert-the-revert + browser pass).

**★ ABSOLUTE RULES (Douglas, non-negotiable — read memory: parallel-work-delivery +
workflow-preferences + hard-rules):** (1) the coordinator NEVER runs grind/build/research
tasks in its own seat — no background Agents, no Workflows; "do X" from Douglas means WRITE
PASTE-READY CHIPS (model+effort header) unless he explicitly overrides against the rule
(seat 12 drifted once; don't repeat). In-seat = review/merge/gates/small direct UI-doc
edits/session mgmt/decision packets. (2) NO pop-ups ever. (3) E-bikes are CONTAINED to the
EMTB surface (rule 1 amended 2026-07-18 on his word); the MTB catalog stays e-free forever —
a containment test enforces it. (4) Never weaken a test; a blank beats an invented value;
UNBIASED is load-bearing.

**★ STANDING GRANTS (2026-07-18):** hourly fleet sweeps (re-arm your own cron — session
crons DIE with the seat); AUTO-ARCHIVE fully-harvested sessions without asking; use/clean
memory liberally; coordinator↔chip-session messaging both ways without pre-asking. Durable
scheduled tasks (survive seats, in the app's Scheduled sidebar): daily bug-report triage
(~8:52a), monthly drift triage (6th), monthly bias audit (12th), quarterly recall sweep
(Jan/Apr/Jul/Oct 3). Chip briefs MUST include: UNIQUE worktree suffix (shared-path collisions
happened twice), never-prompt-Douglas, present-don't-push WITH the why, per-brand/chapter
commits, ID-range claims for corpus rounds.

**★ THE SPECIALIST BENCH (tools/<name>/ + .claude/agents/<name>.md — the compounding-corpus
pattern; memory: specialist-corpora):** coach 7/7 professional (public-source ceiling — NO
paid memberships EVER, decided); mechanic 6/6 professional; ui-expert 7/7 professional;
fitter 6 chapters foundation (peer-reviewed gold tier, wide open); recall-watchdog live
(RECALL-LOG, quarterly task, recall NOTES shipped on RCL-9/RCL-12 rows — the BADGE feature
is a parked Douglas taste call); security-expert 103 facts (RLS chapter born professional;
its reviews.sql review found 2 HIGHs — see the decision queue). Master rounds for mechanic/
coach/ui are IN FLIGHT at drafting.

**★ OPEN SESSIONS at handoff (all told seat 13 is coming; message them freely — the grant
carries):** (1) MTB verification campaign 2 (`local_48b881aa`, branch verify/campaign-2 — long
tail, presents ~batch-groups; walls map = tools/verify-fanout-1-CLOSEOUT.md); (2) Mechanic
Master Round continuation (`local_b7c907e3`, branch tooling/mechanic-master-2 — 2 batches
already merged: chain-width + UDH history + spoke-tension/Sapim-exhaustion; remaining per its
brief: carbon-inspection, suspension tuning depth, bleed tables, L4 race-craft); (3) UI Expert
Master Round (`local_0a1b52cc`, branch tooling/ui-expert-master-1 — accessibility already
MASTER; remaining chapters per its brief); (4) Affiliate Setup (`local_e301505a`, Douglas's
business lane — NEVER touch, you are the only code-pusher); (5) the daily bug-triage vessel
(`local_9e5ade9a`). Coach master round COMPLETE and archived (2 chapters MASTER; round-6
target list is in tools/coach/CURRICULUM.md — the Cycling UK Unit 3 ingest is the named
richest target). First Bike Finder spec DELIVERED (data/FIRST-BIKE-FINDER-*.md; strider-
schema-v2 chip is the natural follow-up: inseamMin/Max fields + footbrake vocab + convertible
tag).

**★ THREE LANES NOW (2026-07-18, seat 13): a dedicated IMAGE COORDINATOR session exists.** Douglas
split the product-image program into its own long-lived seat so it doesn't compete with general
coordination. Seed doc: **`IMAGE-COORDINATOR-HANDOFF.md`** (repo root, tracked, `934c229`). It owns
ImageService architecture/build, provider strategy, image legal posture, acquisition +
auto-replacement workflow, per-brand image coverage. **It does NOT push to this repo** — its
BuildMyMTB-side branches come to YOU for review/gates/push (one-pusher rule intact); ImageService's
own separate repo is its own. Manufacturer image-permission asks run through the AFFILIATE lane
(it defines the spec, Affiliate runs the relationship). Its blocking item: the Tier A/B legal
conflict — Douglas's "Temporary Image Strategy" (unlicensed placeholder images, auto-replaced
later) vs the standing no-scraping ruling from his own affiliate research. Surfaced to him, NOT
resolved by spec; Tier B is designed-but-gated pending his explicit recorded word. All three
sessions have been told about each other.

**★ ANSWER-FIRST RULE (Douglas 2026-07-18, corrected seat 13 TWICE):** when Douglas's message
contains a question, answer it FIRST — before any harvest/merge/sweep work in the same turn, and
if the answer needs a tool call, that call goes first. Deferring the answer to the end of a long
reply is a violation; he said so explicitly after it happened a second time.

**★ DELIVERY RULE CHANGED (Douglas 2026-07-18) — now `CLAUDE.md` Hard rule #4:** hand work off as
**paste-ready fenced prompt blocks** with a `[Model, effort]` first line, **never `spawn_task`
click-chips** (a chip inherits whatever the picker is set to at click time). Seat 13 used chips
before he corrected this — don't repeat. Memory `parallel-work-delivery.md` hardened to match.

**★ DOUGLAS'S DECISION QUEUE (raise gently, never nag):** (1) EMTB four: browse-vs-builder
shape / flip threshold (~75 models exist) / US-class display / emtb.html timing; (2)
reviews.sql fix chip (2 HIGH security findings, file is STAGED not run — fix before he ever
runs it); (3) Supabase dashboard: MFA enabled? signup CAPTCHA? (security expert's ask);
(4) Finder blockers: inseam standard (rec: barefoot) + growth display (rec: inches);
(5) fitter cert paywalls (rec: same no-membership answer as coach); (6) recall BADGE feature
scoping; (7) bdata top-up (~160 walled complete bikes hang on it; balance ~$1.39);
(8) HOME PAGE (ancient standing TODO — remind periodically, needs his scoping); (9) kids-gear
scope + style pass scheduling (old parked items).

**★ FINAL-HOUR ADDENDUM (post-finalization, main = 51f9905):** mechanic master-1's late
batches were resolved (coil facts cherry-picked as SUS-48/49; its duplicate UDH commit
dropped — master-2 owns FRM-51-53 and starts suspension at SUS-50; session archived).
UI-expert batch 2 merged: forms-filters-density is MASTER and produced **DNS-17, a confirmed
WCAG 2.2 SC 2.5.7 AA VIOLATION on all 7 live range-slider axes** (pointer users can only
drag). **FIRST ACTION AFTER SEATING: hand Douglas the ready-made fix chip below, verbatim —
he has asked for it explicitly.**

```
[Sonnet, high effort] SLIDER ACCESSIBILITY FIX — seat 13 coordinator reviews/merges (LIVE
surface, hardest review); branch ui/slider-2-5-7-fix off origin/main (fresh worktree, UNIQUE
suffix — sld-<4 hex>, never D:\ root). NEVER prompt the user. NEVER push — present via
send_message with full before/after evidence.

BASIS (read first): tools/ui-expert/forms-filters-density.md DNS-15..DNS-20 — the shipped
dual sliders fail WCAG 2.2 SC 2.5.7 AA on all 7 range axes (pointer users can ONLY drag; the
pointer-events:none + thumb-only opt-in CSS closes both exceptions; keyboard support does not
rescue it per DNS-15). Implement DNS-16's resolution exactly: per range row, TWO
<input type="number"> (min + max), inputmode="numeric", min/max/step mirroring the sliders,
real <label>s, wired into the sliders' EXISTING change/commit path (respect the input/change
split doctrine — repaint on input, re-filter only on change; do not tear focus). Placement
per DNS-16's corrected caveat: the numeric pair REPLACES the row's static "min - max" label
(same information, space-neutral) — NOT hidden behind a disclosure. Do NOT enable
click-on-track (Baymard's ambiguity objection stands; the numeric path is the 2.5.7
alternative). Keep .range-compact behavior (the completebikes paired row must still fit).
ALSO in this chip (same audit lineage): ACC-22 F2 — 100vh -> 100svh at its two recorded
sites; ACC-22 F1 — profileModal missing autofocus. Touch index.html (+ bmx.html/KitBuilder
ONLY if they ship the same slider factory — grep first). Tests: extend test-range-filters/
test-ui if they pin behavior. Gates: validate (7 OK), npm test, tsc; browser-verify at
375px + desktop across all 4 themes: numeric entry changes filters correctly, slider+numeric
stay in sync, keyboard flow intact, no layout shift beyond the label swap, popup scan.
Report: per-axis before/after + the 2.5.7 compliance argument restated against the shipped
result.
```

**★ HARD-WON SEAT-12 LESSONS:** content-grep is ground truth, never branch pointers
(a bootstrap branch can exist at an old tip with zero work); unexpected main movement gets
content-reviewed post-hoc — all sessions share one git author (a worker once self-pushed
with a coordinator-voice log entry); duplicate dispatches land in the SAME worktree path and
mostly self-heal but fix is unique suffixes; parallel corpus rounds need ID ranges (COR-9
collision); verify-job auto-sync STRIPS unmerged branches' state — hand-patch or sync only
at a settled tip; the EUR/dated-ECB rule applies AT PROMOTION TIME only; .git/info/exclude
carries the PII guard for ALL worktrees (business docs at root hold Douglas's addresses —
NEVER let them stage); the stale chore/cloudflare-prep analytics portion is DO-NOT-SHIP.

**Standing workflow (unchanged from seat 11, still correct):** stale-base own-additions
apply when needed; four gates + harness section-compare on every compat.js/engine merge;
UI auto-ships on green gates + browser verify + popup scan; engine/error-tier = adversarial
review; only taxonomy/money/visual-taste/account/business decisions to Douglas, packets kept
SHORT; archive in the same breath you merge; one PROJECT-LOG entry per wave.

_Seat-12 trail: PROJECT-LOG.md 2026-07-17/18 (the BMX flip, the giga catalog wave, the
specialist bench build-out, 53.2→60% verification, the recall program). Below: seat 12's
inherited block, kept for depth._

---

## ★★★ SEAT 12 — START HERE (succession from seat 11, 2026-07-17) ★★★

Seed normally: `git fetch origin; git worktree add .claude/worktrees/coord-<today> -b
coord/<today> origin/main` (NEVER at `D:\` root; never git-mutate the shared checkout).
State at handoff: **5,025 bike parts (2,675 verified — rising, see the open worker) + 714 kit
(409 verified, 57.3%) / 436 complete bikes / 695 tests / validate 0 problems / tsc clean**, all
CI+Deploy green. Run the gates yourself; never trust doc counts.

**★ THE OPEN WORKER (harvest it):** Verification MEGA fan-out #1 (`local_4d1b59ad`, branch
`verify/fanout-1`, compat.js FIELD-LEVEL + verified-flag promotions ONLY — reject new rows/id
changes). It presents ~150-row batch-groups and KEEPS GRINDING between them; at last check it had
2,735 verified integrated in its own worktree (target: catalog ratio > 60%), with the Shimano-PDF
worker as the long pole. Per group: baseline the harness FIRST, apply the new commits' diff, four
gates, harness near-identical (any movement must match per-row documented corrections — verify one
against the cited maker page yourself), spot-check 5 sources, confirm `tools/verification-job.json`
+ the 3 PARKED items untouched (Highball-R rotor/hub mismatch, Race Face Aeffect R stem dup,
SB135 T2/T3 fills), merge+push, message "continue"; archive only when it declares the queue
exhausted. Watch loops are SESSION-ONLY crons — re-arm your own on seating (seat 11's died with it).
The Affiliate session (`local_e301505a`) is Douglas's parallel business lane — leave it alone,
coordinate via send_message on ambiguous shared files. **You are the only session that pushes code.**

**★ NEW CAPABILITIES (2026-07-17 — read tools/VERIFY-PROTOCOL.md's new sections):** fetch stack is
three-tier: WebFetch (open) → **Exa MCP** (JS walls — Trek/Giant class; ToolSearch "exa"; batches
URLs) → **Bright Data** (`bdata scrape/search` in bash — hardest bot-walls incl. Specialized +
web.archive.org; ~5,000 credits/mo shared pool, check `bdata budget` each tick, fall back +
PushNotification Douglas if < $0.50). poppler installed (pdftotext -layout). **PushNotification
policy (Douglas): ONLY merges-gone-live / decisions-needed / session-errors / credit-exhaustion —
never routine ticks.** Fork nominal-weight policy now covers forks (2026-07-17 section). AllTrails
+ Canva connectors exist (Canva unlocks the queued sticker run when Douglas asks).

**★ DOUGLAS'S DECISION QUEUE (he said "later or tomorrow" on 2026-07-17 — RAISE THESE FIRST
SESSION):** (1) verified-badge semantics for complete bikes (bias-r3 HIGH-2: 0/436 badge, the
landing view blanks under ✓-only; recommended shape = a distinct "Build-sheet verified" badge);
(2) bias-r3 smalls: Schwalbe `bikepark` casing → DH chip mapping, the one-line green-dot
"no data published" disclosure (cheapest high-value fix), tire-chip unmapped==invisible framing;
(3) the 3 parked data items above; (4) bug-report monitor cadence; (5) kids-gear scope (Cairn row);
(6) **HOME PAGE** (standing TODO, do NOT act without his input — remind him, needs his scoping);
(7) Continental "Soft"=Medium mapping sanity-check (shipped, flagged for his taste).

**★ HARD-WON LESSONS THIS SEAT (add to your reflexes):** worker chips must NEVER prompt Douglas
(bake the never-ask clause into every brief — it's in memory); COMMIT PER MAKER/BRAND (three
crashes survived with zero merged-work loss BECAUSE of it; crash drill: fsck → per-branch
`rev-list --count` → salvage-before-requeue → resume messages); grind self-audits miss things the
MERGE REVIEW catches (4 rotor-ceiling post-mount-vs-max conflations caught across two merges —
always check section E deltas and any factory build warning against its own spec); the
is-ancestor push guard fires ~daily on this fast main — rebase + re-gate is routine, never force;
audits must MEASURE, not infer (bias-r2's RockShox finding was disproved on values); vocab
widenings are fine when each value carries a do-not-conflate rationale + matched types + tests.

**Standing workflow (unchanged):** stale-base own-additions apply, never raw merge; four gates +
harness section-compare on every compat.js merge (C may rise with new frames, A/B/D never regress);
UI auto-ships on green gates + browser verify + your post-hoc popup scan; catalog =
coordinator-reviewed; engine/error-tier = adversarial review, present-branch; only taxonomy/money/
visual-taste/account/business decisions go to Douglas; keep his updates SHORT; archive sessions in
the same breath you merge them; one PROJECT-LOG entry per wave. Values: trustworthy, accurate,
UNBIASED (doubled), never fabricate — a blank beats an invented value.

**Succession:** archive seat 11's session once you're oriented and its work is confirmed on main.

_Seat-11 trail: PROJECT-LOG.md 2026-07-16/17 entries (grinds 3–7 + salvage: 57→436 bikes; the
CRITICAL partial-wheel false-fits fix; testability refactor; bias r2+r3; the trust wave). Below:
the seat-11 block this one supersedes, kept for depth._

---



## ★★★ SEAT 11 — START HERE (succession from seat 10, 2026-07-15) ★★★

Seed yourself normally: `git fetch origin; git worktree add .claude/worktrees/coord-<today> -b
coord/<today> origin/main` (NEVER at `D:\` root; never git-mutate the shared checkout).
**`origin/main` = `be35895`, all gates + CI/Deploy green: 3454 parts / 602 tests / validate 0
problems (2403 verified, 1051 unverified) / tsc clean.**

**What seat 10 shipped live (all CI/Deploy green):** Merged the Complete Bikes mega-grind —
**+51 bikes across 25 makers (6 → 57 total)**, coordinator-audited (harness delta benign: only
the section-C clean-scenario count rose 169→182 for the 13 new frames, sections A/B/D/E
untouched; verified rows spot-checked to real maker sources; no e-bikes); complete-bike
list-card height fix (`.cb-priceaction{display:contents}` — uniform 59px matching frames/other
categories, per Douglas: "don't change the others to match, change complete bikes to fit");
legal-page email swap to `Doug@buildmymtb.com` (Cloudflare routing confirmed live). Per-frame
`noStockDropper` flag (exempts dropper completeness) landed from the prior wave.

**★ THE 4 OPEN SESSIONS (Douglas wants you aware; keep them aware of you too):**
1. **200-bike Complete Bikes grind** (`local_c638126f`, RUNNING, started 2026-07-15 22:13) —
   Sonnet orchestrator fanning out `catalog-worker`/`catalog-auditor` agents, targeting the
   zero-coverage majors (Specialized, Trek, Santa Cruz, Giant, Scott, Merida, Pivot, Yeti, Evil,
   Cannondale…) + hardtails, on branch `catalog/complete-bikes-grind-3`. It has the full 57-bike
   exclusion list so it shouldn't duplicate. **DO NOT touch its worktree/branch — actively in
   use.** On report: audit hard exactly like the 51-bike batch (fan out `catalog-auditor` by
   maker; verified only off fetched maker pages; watch for e-bike leakage and substitute/non-stock
   fills — fills must be ONLY real factory parts, drop the bike rather than fake a spec).
2. **Complete Bikes MEGA-grind #1** (`local_4f36df6a`) — **DONE, already merged** (`be35895`).
   `isRunning:false` now, safe to archive once you confirm it has nothing further to report.
3. **"Add xc discipline to dropper slotRequired exemption"** (`local_b4d73300`) — an ENGINE-tier
   tweak, not yet reported. Review + **adversarially audit** its branch when it presents (harness
   impact, engine-tier). Not coordinator-spawned; leave its worktree alone until it reports.
4. **Affiliate Setup** (`local_e301505a`) — Douglas's parallel BUSINESS lane (LLC "D-Dubs Works"/SD
   — name+state changed 2026-07-15, see `llc-golive-playbook` memory — EIN, Cloudflare email,
   affiliate applications, manufacturer partnerships). Read `AFFILIATE-HANDOFF.md` +
   `multi-session-coordination.md`. **You are the ONLY session that pushes code.** Coordinate via
   `list_sessions`/`send_message` before ambiguous shared-file work.

**★ CRITICAL LESSON — the orphan-worktree hazard (from seat 9/10, still live risk):** Do NOT
`git worktree remove` a worktree while ANY session is running or a new chip might land in that
dir. Let ARCHIVING a session clean its own worktree; run `git worktree list` before any removal.
Seat 10 avoided repeating seat 9's mistake by leaving the mega-grind's worktrees untouched even
when `isRunning` briefly read false mid-grind — **don't trust that flag alone; wait for its own
report.**

**Queued (sequence AFTER both complete-bike grinds settle — all three edit `src/compat.js`,
parallel = huge conflict):** the **modelYear backfill** — populate `modelYear` on
frames/complete-bikes/forks/shocks/generational components (maker-sourced, fan out workers);
leave it BLANK on year-agnostic parts (tires/saddles/grips/generic drivetrain). Policy already in
`tools/DATA-ENTRY-TEMPLATE.md`.

**Pending Douglas decisions:** (1) **legal-page header unification** — privacy/terms/
affiliate-disclosure still use the old plain-gradient header (no topo contours); undecided whether
to give them the tall topo header (a 3-file change). (2) Confirm Cloudflare Web Analytics enabled
— the privacy page's "No third-party analytics" line is deliberately held until then.

**★ VALUES (reaffirmed 2026-07-15, load-bearing — see `product-values` memory):** "trustworthy,
accurate data, no bias, just a tool for users to help them build or have fun." **NEVER fabricate a
value to fill a field** — a blank beats a plausible-but-invented one (modelYear-blank policy; the
Propain/other verified→sample demotions; root-cause rotor fix instead of shipping a false warning;
the 200-bike chip is told to DROP a bike rather than substitute a non-stock part).

**Standing workflow (unchanged):** re-fetch origin before EVERY merge (main moves fast on UI
auto-ships); apply worker branches via the stale-base own-additions pattern, never a raw merge;
four gates + verdict-harness byte-identical for engine work (harness count may legitimately rise
for new frames — compare which SECTION moved, not just the total); UI auto-ships on green gates;
catalog data = coordinator-reviewed, new error-tier rows = adversarially audited; only
taxonomy/money/visual-taste/account decisions go to Douglas; keep his updates SHORT.
Coordinate-only, lean seat — hand authoring to chips (model+effort in the title). Append one
PROJECT-LOG entry per wave.

_See §0/§0a below + PROJECT-LOG.md's 2026-07-15 entries for the full trail._

---

## ★★★ SEAT 10 (succession from seat 9, 2026-07-15) ★★★

Seat 9 ran a very long, productive session. **`origin/main` = `11fc738`, all four gates +
CI/Deploy green: 3180 bike parts / 692 kit parts / 601 tests / validate 0 problems / tsc clean.**
Seed yourself normally: `git fetch origin; git worktree add .claude/worktrees/coord-<today> -b
coord/<today> origin/main` (NEVER at `D:\` root; never git-mutate the shared checkout).

**What seat 9 shipped live (all CI/Deploy green):** Kit Builder went **LIVE** (`KIT_ENABLED=true`,
692 parts, 12 categories) after merging the foundation + redesign + 12 grinds + MTB-only/e-bike-language
scrub; Single-Speed Cog folded into Drivetrain as a **display-only** sub-chip; **SRAM/Shimano
rotor-class tolerance** engine fix (rule 10/10b: 200≡203, 220≡223 via a 3mm grace — killed a systemic
false-warn class); **Complete Bikes SHIPPED** (`completebike` whole-build preset + browse surface +
dual-price block + auto-fill — now **6 bikes live across 6 makers**, ships straight to live, no gate);
hardtail discoverability (frame Full-sus/Hardtail sub-filter + Hardtail sample build) + 3 frames;
**shock+fork family-picker** (bias-audit fix: shock browse 776 flat rows → 38 model-family cards,
RockShox 49%→13.2%; display-only); header fix (tall topo banner now stays on the Inventory/Profile/Forum
in-page views); build-panel part → click-to-open its detail modal; `src/ui-common.js` refactor
(shared theme+money across both pages). Two post-wave audits ran (code-quality + manufacturer-bias) —
the bias audit's one finding (shock granularity) is what drove the family-picker.

**★ THE 3 OPEN SESSIONS (Douglas wants you aware; all three have been told about you):**
1. **Complete Bikes MEGA-grind** (`local_4f36df6a`, RUNNING) — targeting **50–100** complete bikes,
   all makers/models/trims. It fanned out into ~14 per-maker sub-worktrees (`cb-grind-*` /
   `catalog/complete-bikes-grind-2-*`). **DO NOT touch its worktrees or branches — it is actively
   using them** (seat 9 nearly sabotaged it by pruning; see the lesson below). It will integrate into
   `catalog/complete-bikes-grind-2` and `send_message` when done. On report: **audit hard** — at that
   volume, fan out `catalog-auditor` (Opus) agents by maker; only maker-page-confirmed rows get
   `verified:true` (seat 9 demoted a Propain bike whose sheet came from a third party). Do NOT trust
   its `isRunning` flag — it read false mid-run and seat 9 wrongly declared it dead.
2. **"Add xc discipline to dropper slotRequired exemption"** (`local_b4d73300`, RUNNING) — an
   ENGINE-tier tweak (make XC frames not require a dropper, like DH frames already do). Review +
   **adversarially audit** its branch when it presents (harness impact, engine-tier). NOT
   coordinator-spawned. It's in an orphan worktree — leave it alone until it reports.
3. **Affiliate Setup** (`local_e301505a`) — Douglas's parallel BUSINESS lane (LLC "Dubs Works"/SD,
   EIN, Cloudflare email, affiliate applications, manufacturer partnerships). Read `AFFILIATE-HANDOFF.md`
   + `multi-session-coordination.md`. **You are the ONLY session that pushes code.** Coordinate via
   `list_sessions`/`send_message` before ambiguous shared-file work.

**★ CRITICAL LESSON — the orphan-worktree hazard (bit us HARD this session):** Do NOT
`git worktree remove` a worktree while ANY session is running or a new chip might be launched into
that dir. Seat 9's aggressive cleanup orphaned the mega-grind + the ui-common worker — git fell
through to the shared checkout `D:/MTB Bike Builder`, which is now on a stray `refactor/ui-common`
branch pointer (harmless — working tree is clean except the intentional untracked root docs; do NOT
git-checkout there to "fix" it, per the never-touch-shared-checkout rule). **Let ARCHIVING a session
clean its worktree; run `git worktree list` before any removal.**

**Queued (sequence AFTER the mega-grind merges — both edit `src/compat.js`, so parallel = huge
conflict):** the **modelYear backfill** — populate `modelYear` on frames/complete-bikes/forks/shocks/
generational components (maker-sourced, fan out workers); leave it BLANK on year-agnostic parts
(tires/saddles/grips/generic drivetrain). Policy already in `tools/DATA-ENTRY-TEMPLATE.md`.

**Pending Douglas decisions:** (1) **legal-page header unification** — privacy/terms/affiliate-disclosure
still use the old plain-gradient header (no topo contours); he hasn't decided whether to give them the
tall topo header (a 3-file change). (2) Complete-Bikes remaining scope (the mega-grind covers volume).

**★ VALUES (reaffirmed 2026-07-15, load-bearing — see `product-values` memory):** "trustworthy,
accurate data, no bias, just a tool for users to help them build or have fun." **NEVER fabricate a
value to fill a field** — a blank beats a plausible-but-invented one (the modelYear-blank policy; the
Propain verified→sample demotion; the root-cause rotor fix instead of shipping a false warning).

**Standing workflow (unchanged):** re-fetch origin before EVERY merge (main moves fast on UI
auto-ships); apply worker branches via the stale-base own-additions pattern, never a raw merge; four
gates + verdict-harness byte-identical for engine work; UI auto-ships on green gates; catalog data =
coordinator-reviewed, new error-tier rows = adversarially audited; only taxonomy/money/visual-taste/
account decisions go to Douglas; keep his updates SHORT. Coordinate-only, lean seat — hand authoring
to chips (model+effort in the title). Append one PROJECT-LOG entry per wave.

_See §0/§0a below + PROJECT-LOG.md's 2026-07-15 entries for the full trail._

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
- **★ BRIEF EVERY GRIND WORKER TO COMMIT INCREMENTALLY — per MAKER, not per CLUSTER** (2026-07-16,
  learned expensively): grind-4 fanned out 8 clusters; a machine shutdown killed the run, and the 6
  clusters that commit only at cluster-END died with **0 commits — all work lost**. The 2 that had
  committed (`cb-grind4-hardtails`, `cb-grind4-roundout`) survived intact and were salvaged into
  main (`d3e63ac`, +6 bikes). Uncommitted agent work is NOT recoverable from a task-notification's
  "their transcripts are saved" reassurance — check `git rev-list --count origin/main..<branch>` per
  cluster branch to see what actually survived. Bake "commit after each maker" into every grind brief.
- **Salvage before you re-queue.** When a fanned-out run dies, enumerate its cluster branches
  (`git for-each-ref refs/heads/ | grep <prefix>`) and count commits-ahead on each BEFORE writing the
  run off — partial value is often sitting there, already based on main tip and mergeable. Merging two
  same-base cluster branches collides as a **pure-additive conflict** (both append rows at the same
  array spot): resolve by keeping BOTH sides, check the seam's comma, and `node --check src/compat.js`
  immediately (the string-splice rule).
