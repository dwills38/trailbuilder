# Paste-ready worker blocks — carried forward from seat 13 (2026-07-18)

Douglas dispatches these himself so he controls model + effort (`CLAUDE.md` Hard rule #4 —
paste-blocks, never click-chips). Ordered by value, not by size.

**Clauses baked into every block below** (already written into each, listed once here so the
coordinator can verify a block before handing it over): fresh worktree with a UNIQUE suffix off
`origin/main` — **created at `.claude/worktrees/<name>` INSIDE `D:\MTB Bike Builder`; ALL file
reads/writes stay inside the project (CLAUDE.md Hard rule #5 — never `D:\` root, never anywhere
else on any drive; a PreToolUse hook auto-denies outside worktree paths)** — never the shared checkout · NEVER prompt Douglas (no
AskUserQuestion — decide per THE BAR, log open questions in the report) · NEVER push; present the
branch via send_message, because the coordinator's independent review IS the quality gate ·
`tools/verification-job.json` is coordinator-only (dispositions go to
`tools/verify-notes-<cluster>.md`) · gates = `node validate.js` (7 OK lines) + `npm test` +
`npx tsc --noEmit` + `node tools/verdict-audit-harness.js` before/after with any delta justified ·
commit per brand/chapter · no e-bike content in the MTB catalog, ever · a blank beats an invented
value; Skipped-with-a-reason is a real result.

**Fetch doctrine for every block — DOUGLAS'S ETHICS RULING 2026-07-18:** WebFetch → Exa MCP →
**the BROWSER PANE** (`preview_start {url:"…"}` + `javascript_tool` reading
`document.body.innerText`; close the tab after) → `bdata search` for URL lookup only. **We do NOT
defeat anti-bot protection on any brand** — rendering JavaScript is fine (it's just being a
browser), defeating a bot-wall is not. An active challenge/403 is a DOCUMENTED WALL, not a task:
mark it Skipped/Failed naming the wall, or enter the row as honest unverified sample data.
**`bdata scrape` is retired — never put it in a brief.** Full doctrine: the FETCH ETHICS section of
`tools/VERIFY-PROTOCOL.md`. If the ethical path stalls a whole category, escalate to Douglas as a
decision — he asked to be told so he can revisit.

**Two watch-classes to repeat in any catalog block:** WRONG-SKU (a complete-bike page silently
supplying frame-only fields — cost us the Canfield error) and FRAMESET-SIBLING (makers publish
`-frameset` / `-frame-kit` / Shopify `/collections/<model>` URLs carrying spec tables the product
page lacks — confirmed on Revel, Canfield, Pivot, Rocky Mountain).

---

## 1. [Fable or Opus, high effort] AFFILIATE PROCESS HARD REVIEW — incl. every email draft
**Douglas asked for this specifically. Highest-stakes non-code review on the list: these emails go
to real manufacturers under his real name and LLC, and a bad one costs a relationship permanently.**

```
[Fable, high effort] AFFILIATE / PARTNERSHIP PROCESS — ADVERSARIAL REVIEW. Read-only research +
a docs-only branch; NO code, NO catalog edits. Branch audit/affiliate-process-1 off origin/main in
a fresh worktree with a UNIQUE suffix (afr-<4 hex>), never D:\ root, never the shared checkout.
NEVER prompt the user (no AskUserQuestion — log open questions in your report). NEVER push —
present via send_message to the Main Coordinator.

⚠ LANE NOTE: the business docs live UNTRACKED at the repo root and are gitignored on purpose
(they contain Douglas's real addresses and business identity — the .git/info/exclude PII guard).
READ them, quote what you must, but NEVER stage, commit, copy, or reproduce any personal
address/phone/EIN/bank detail into a tracked file or your report. If a finding requires
referencing PII, describe it by location ("the address block in X.md"), never by value.

SCOPE — review the whole affiliate/partnership PROCESS end to end:
1. THE EMAIL DRAFTS (outreach-emails.md + any drafts in AFFILIATE-*.md / MANUFACTURER-*.md) —
   review EVERY draft, hard. For each: does it state plainly who we are and what we're asking;
   is any claim in it TRUE TODAY (traffic, catalog size, verified counts, launch status — check
   each against the live repo, and flag anything that overstates); does it overclaim or imply a
   relationship that doesn't exist; is the ask specific and easy to say yes to; is there a clear
   no-cost-to-them framing; does it disclose affiliate intent honestly; would a brand marketing
   manager read it as professional or as spam? Rewrite anything weak — supply the improved draft
   inline, don't just critique.
2. THE IMAGE ASK folded into outreach (license scope, asset formats, channel) — is what we're
   requesting actually sufficient for the ImageService design, and is it phrased so a brand's
   legal reviewer can approve it without escalation?
3. SEQUENCING + RISK — the order (AvantLink → Impact → Amazon last), the ~Nov window, pre-LLC vs
   post-LLC sending, and THE BIG ONE: the open Tier A/B image decision. If Tier B (unlicensed
   temporary images) ever ships, does any outreach email become self-defeating — i.e. does the
   email itself become the mechanism by which a brand discovers unlicensed use of their images?
   State that risk plainly if it's real.
4. THE VALUES CHECK — Douglas's UNBIASED value is doubled and load-bearing: affiliate money funds
   the site but must NEVER bias rankings, ordering, or verdicts. Does anything in the process
   (email promises, program terms, partnership framing) create pressure toward bias, even
   implicitly? Flag any promise we could not keep while staying unbiased.
5. COMPLIANCE SANITY — FTC affiliate-disclosure adequacy vs what the live legal pages actually
   say (privacy.html / terms.html / affiliate-disclosure.html are tracked and readable), and
   whether the emails' claims match those pages. You are not counsel; flag, don't opine as law.

DELIVERABLE: tools/AFFILIATE-PROCESS-REVIEW-<date>.md — findings by severity, each with the exact
text quoted, why it's a problem, and a concrete rewrite. Plus a short "send-ready / needs-work /
do-not-send" verdict per email draft. Gates (no-ops for docs, prove them anyway): validate, npm
test, tsc. Report: the per-draft verdict table, the top 5 findings, and anything you'd want
Douglas to decide before a single email goes out.
```

---

## 2. [Sonnet, medium] RE-PROMOTION GRIND — the audit's recoverable demotions
**Highest catalog value per hour: 43 rows are ONE targeted maker fetch from being honestly verified.**

```
[Sonnet, medium effort] VERIFIED RE-PROMOTION GRIND. Branch verify/repromote-1 off origin/main,
fresh worktree UNIQUE suffix (rpm-<4 hex>), never D:\ root. NEVER prompt the user. NEVER push —
present via send_message to the Main Coordinator (its review is the quality gate).

BASIS: tools/VERIFIED-FLAG-AUDIT-2026-07-18.md demoted 55 rows on 2026-07-18. ~43 are recoverable:
33 were review/retailer-sourced (vitalmtb etc — they need the SAME facts from the MAKER's page),
and 10 carry sample/assumed/inherited checkBuild-read fields (Giant Reign maxRotorR, Canyon
Spectral AL carryover, Specialized Status "assumed" headset, Trek Fuel EX Gen6 shock, Trek Session
8 rearAxle/headset, Kona Process 153 inherited set, 4 Commencal fork-travel headroom values).
Each demoted row carries a dated DEMOTED note naming exactly what's missing — that note IS your
worklist.

TASK: for each, do the ONE targeted maker fetch that would close it. Promote to verified:true ONLY
on the full bar (interfaces maker-fetched; weight per policy incl. the nominal/measured exceptions).
★ THE PRICE RULE (formalized 2026-07-18, tools/VERIFY-PROTOCOL.md): price NEVER blocks
verification when no US MSRP exists — state the basis in desc. But a price belonging to a DIFFERENT
product is still always disqualifying. If the fetch doesn't close it, SHARPEN the DEMOTED note with
what you learned and move on — a better-documented gap is a real result.

ALLOWED: field corrections + verified-flag promotions on EXISTING rows. No new rows, no id changes,
no engine/schema edits. Commit per brand. Report: promoted / still-blocked / newly-sharpened counts,
each promotion with its source URL.
```

---

## 3. [Sonnet, medium] WHEELS WAVE 2 — the worst-covered big category
```
[Sonnet, medium effort] MTB VERIFICATION — WHEELS WAVE 2. Branch verify/wheels-2 off origin/main,
fresh worktree UNIQUE suffix (wh2-<4 hex>), never D:\ root. NEVER prompt the user. NEVER push —
present via send_message to the Main Coordinator.

SCOPE — ONLY frontwheel, rearwheel, rim, fronthub, rearhub. ~473 rows still unverified (front
wheels sit at 27% verified, rear at 39% — the weakest big cluster in the catalog).
START FROM tools/verify-notes-wheels.md — the prior wave's notes file IS your brief: it maps the
brand backlog (We Are One 42, Industry Nine ~40, Bontrager 38, WTB 31, Race Face 26, Giant 25,
e*thirteen 21, Roval 19, Shimano 18, …) and flags STANDALONE FRONTHUB/REARHUB a-la-carte pages as
the next-best-yield target (cleanest maker spec tables: DT Swiss, Hope, I9, Chris King).
DO NOT touch tools/verification-job.json — append dispositions to tools/verify-notes-wheels.md as
`<id> | Verified|Skipped|Failed | <source URL or reason>`.

THE BAR: rotorMount, freehub, intWidth and maxTire all feed engine rules — those stay
manufacturer-sourced, no exceptions. Weight may use the wheels nominal-weight exception where
makers publish none, but PREFER the real per-SKU figure: DT Swiss's model-finder publishes
per-matnr weights, and citing the matnr (e.g. WEX1700TEDRSA11693) is what made the last wave
independently checkable — do that wherever a maker exposes SKU codes.
Two OPEN QUESTIONS from the last wave to resolve if you can, not guess: XRC 1200 "25mm-width" rows
(current DT site lists only the 30mm tier — discontinued?), and M1900 SuperBoost157 rows (retail
page shows only 142/148; plausible OE-only end-caps, the Canyon Sender pattern).
Commit per brand. Report counts, corrections with source URLs, anything that smells fabricated.
```

---

## 4. [Sonnet, medium] COMPLETE BIKES WAVE 3 — user-facing, now with the brand-wall map
```
[Sonnet, medium effort] MTB VERIFICATION — COMPLETE BIKES WAVE 3. Branch verify/completebikes-2 off
origin/main, fresh worktree UNIQUE suffix (cb3-<4 hex>), never D:\ root. NEVER prompt the user.
NEVER push — present via send_message to the Main Coordinator.

SCOPE — ONLY cat:'completebike' rows (436 total, ~35% sheet-verified). Do NOT edit the component
rows a bike's fills point at — if a fill looks wrong, REPORT it (that escalation path caught four
real Ibis errors and a Yeti frame BB defect).
START FROM tools/verify-notes-completebikes.md — it carries the live brand-wall map:
UNLOCKED: Pivot + Rocky Mountain via Shopify /collections/<model>; Devinci per-product pages; Yeti
kit lists; Ibis /build-kits/<slug> (renders FULL itemized spec tables, not just prices — that's
what surfaced the fill errors).
WALLED, do not re-burn budget: Norco (404s even unlocked), Cannondale (client-side pricing API),
Propain (its bike-BUILDER configurator IS the pricing surface — no static page will ever have it).
DO NOT touch tools/verification-job.json — dispositions to the notes file.

THE BAR: the build sheet must come from a FETCHED maker page for the EXACT trim the row names —
trims differ by a single component and a wrong fill is a false product claim. Fills must be ONLY
real factory parts; if a component isn't in the catalog, report the gap rather than substituting a
near-match (a known open gap: Shimano M6200 derailleur/cassette/crank/brakes don't exist in the
catalog, only the shifter). NO e-bikes — maker pages will happily show you e-models.
★ TWO ERRORS THAT ALREADY HAPPENED, check both every time: verified rows have carried WRONG FILLS
(4 Ibis rows), and complete-bike pages have supplied frame-only fields wrongly (the Canfield
wrong-SKU class). Commit per maker. Report counts, corrections with source URLs, component gaps.
```

---

## 5. [Sonnet, medium] FRAMESET-SIBLING SWEEP — convert accumulated "completes-only" skips
```
[Sonnet, medium effort] FRAMESET-SIBLING SWEEP. Branch verify/frameset-sibling-1 off origin/main,
fresh worktree UNIQUE suffix (fss-<4 hex>), never D:\ root. NEVER prompt the user. NEVER push —
present via send_message to the Main Coordinator.

BASIS: campaign-3 accumulated a large cluster of frames Skipped as "brand sells completes only, so
price/weight can never clear the bar." That premise was WRONG at least twice: Canfield publishes a
standalone /products/lithium-frameset (exact price + frame-only weight) and Revel publishes
/products/<model>-frame-kit-2026 carrying a spec table the product page lacks. Both rows were
sourced from complete-bike pages and were wrong in price basis, weight basis, and frameOnly.

TASK: walk every frame row whose desc/job-state says completes-only or whose source URL is a
complete-bike page, and try the sibling-URL patterns before accepting the skip: `-frameset`,
`-frame-kit`, `-frame`, `<model>-frame-kit-<year>`, and Shopify `/collections/<model>`. Where a
frameset SKU exists, correct price/weight/frameOnly to it and promote if the full bar is met.
Where it genuinely doesn't exist, REWRITE the skip reason to say "no frameset SKU found; tried
<patterns>" so no future pass re-does this work blind.
ALLOWED: field corrections + promotions on EXISTING frame rows only. No new rows, no id changes.
Report: rows converted, rows confirmed genuinely completes-only, and any maker whose frameset URL
pattern is worth adding to the doctrine list.
```

---

## 6. [Sonnet, medium] FORKS TAIL · 7. COCKPIT WAVE 2 · 8. KIT TAIL
```
[Sonnet, medium effort] MTB VERIFICATION — <FORKS | COCKPIT WAVE 2 | KIT TAIL>. Branch
verify/<forks-2|cockpit-2|kit-2> off origin/main, fresh worktree UNIQUE suffix (<3 letters>-<4 hex>),
never D:\ root. NEVER prompt the user. NEVER push — present via send_message to the Main Coordinator.

SCOPE (pick ONE per dispatch; they are disjoint so they may run in parallel):
· FORKS — cat:'fork', 119 pending (71% verified already). The fork nominal-weight policy applies
  (tools/VERIFY-PROTOCOL.md, 2026-07-17 section): weights are generation-ambiguous, so note the
  quoted config in desc. minRotorF is ERROR-TIER — maker-sourced only, and a wrong one manufactures
  a false "won't fit."
· COCKPIT WAVE 2 — handlebar/stem/grips/saddle/seatpost/dropper/pedal/cog; continue from the skip
  log in tools/verify-notes-cockpit.md. Engine-feeding fields: bar/stem `clamp`, dropper/seatpost
  `diameter`, cog `teeth`/`chainWidth`. NOTE an open policy question: DMR confirms cog interfaces
  but publishes no per-cog weight, and cog isn't in the interface-verification exception list —
  do NOT promote cogs on interfaces alone until Douglas rules; document instead.
· KIT TAIL — src/kit.js, 278 unverified of 714 (61% done). Kit rows validate through schema.js's
  own validatePart; the kit catalog has ZERO engine rules, so the bar is provenance-only.
DO NOT touch tools/verification-job.json — dispositions to tools/verify-notes-<cluster>.md.
★ A REMINDER EARNED THIS WEEK: if a row's desc needs the word "estimate" for a load-bearing field,
it is NOT verified — a retailer-listing weight was caught being promoted on exactly that basis.
Commit per brand. Report counts, corrections with source URLs, anything that smells fabricated.
```

---

## 9. [Sonnet, medium] BMX VERIFICATION — **conditional on Douglas's ranking**
**LIVE surface at 26% verified vs his own ~40% go-live bar. He must rank it against MTB depth
(his flagship-first directive) before this goes out.**

```
[Sonnet, medium effort] BMX VERIFICATION WAVE 1. Branch verify/bmx-1 off origin/main, fresh
worktree UNIQUE suffix (bmx-<4 hex>), never D:\ root. NEVER prompt the user. NEVER push —
present via send_message to the Main Coordinator.

SCOPE — ONLY data/bmx.js (BMX_PARTS): 225 rows, 59 verified (26%). BuildMyBMX is LIVE at bmx.html,
so these rows are serving real users today — that's why this matters despite the small catalog.
Read data/BMX-MODEL.md + src/schema-bmx.js first (the BMX schema is its own validator with its own
vocab; validate.js prints the "BMX OK" line). Engine-feeding fields go through checkBmxBuild in
src/compat-bmx.js — treat those exactly as strictly as MTB interfaces.
BMX brands are mostly small/DTC with clean static product pages (unlike the MTB maker walls), so
WebFetch should carry most of this; the pivotal-seat ERROR rule and other BMX-specific decisions
are already settled — do not relitigate them.
DO NOT touch tools/verification-job.json — dispositions to tools/verify-notes-bmx.md (create it).
Commit per brand. Report: verified count before/after, corrections with source URLs, and whether
the catalog can plausibly reach 40% (Douglas's stated go-live bar) from available sources.
```

---

## 10. [Fable or Opus, high] UI EXPERT ROUND 5 — heuristic evaluation
```
[Fable, high effort] UI EXPERT ROUND 5 — HEURISTIC EVALUATION. Branch tooling/ui-expert-round5 off
origin/main, fresh worktree UNIQUE suffix (ui5-<4 hex>), never D:\ root. NEVER prompt the user.
NEVER push — present via send_message to the Main Coordinator. You are the ui-expert agent; read
tools/ui-expert/INDEX.md and CURRICULUM.md first and honor their Boundaries section (this corpus
NEVER edits index.html or src/** — findings are FLAGGED, never fixed inline).

ROUND 5's successor rule is already written in CURRICULUM.md (round 4 retired target-the-weakest
when all seven chapters hit MASTER). Its PRIORITY 0 is the HEURISTIC EVALUATION (RES-4) — the one
L4 method an agent can execute unaided, with no recruits. Run Nielsen's 10 heuristics across the
three surfaces: the builder (index.html), the forum, and the guides. Produce candidate findings
with severity ratings, each checkable against the repo.
ALSO in scope, per the same successor rule: (1) VERIFY what the corpus asserts but never measured —
MOB-47 (does in-flight state survive a resize across 769px? needs only a resizable window),
DNS-20 (rail height at 375px), MOB-46 (mobile control positions vs the reachability pie); (2)
RE-CHECK the CONDITIONAL no-actions that go stale silently — is Viewport Segments Baseline yet
(MOB-45)? is every :hover still cosmetic (PLT-11, grep for display|visibility|opacity)? has
Cloudflare shipped Safari/Firefox CWV (PRF-14/17)?
DO NOT re-open MOB-45 / PLT-11 / RSP-20 / DNS-18 as gaps — they are deliberate reasoned
non-actions with their logic recorded, and CURRICULUM has an explicit do-not-reopen list.
Note PRF-16 (read Vitals Explorer) is DOUGLAS-ONLY and still unread — do not attempt it, and do not
treat performance claims as measured until he does. Commit per chapter. Report: findings by
severity, which conditional no-actions changed status, and what round 6 should target.
```

---

## 11. [Sonnet, medium] COACH ROUND 6
```
[Sonnet, medium effort] COACH ROUND 6. Branch tooling/coach-round6 off origin/main, fresh worktree
UNIQUE suffix (ch6-<4 hex>), never D:\ root. NEVER prompt the user. NEVER push — present via
send_message to the Main Coordinator. You are the coach agent; read tools/coach/INDEX.md +
CURRICULUM.md first and honor the Boundaries section.

Board: 2 chapters MASTER (coaching-methodology, cornering), 5 professional (fundamentals,
braking-traction, climbing-descending, terrain-features, discipline-craft). CURRICULUM.md names the
round-6 target list, with the **Cycling UK Unit 3 ingest as the single richest available source**.
★ STANDING CONSTRAINT (Douglas, decided): PUBLIC SOURCES ONLY — no paid memberships, ever, for any
specialist corpus. That is the corpus's ceiling and it is deliberate; work within it and document
what sits behind a paywall rather than trying to reach it.
Claim an ID range up front and state it in your first commit message (parallel corpus rounds have
collided on ids before). Same corpus rules as the other specialists: cite primaries, grade honestly,
prefer a documented gap over dressed-up consensus, and record reasoned non-actions so a future round
doesn't re-litigate them. Commit per chapter. Report: facts added by chapter, any maturity changes
(with the evidence that justifies them), and what round 7 should target.
```

---

## 12. [Sonnet, low] MOB-47 — the cheap measurable test
```
[Sonnet, low effort] MOB-47 STATE-SURVIVAL TEST. Branch audit/mob47-resize off origin/main, fresh
worktree UNIQUE suffix (m47-<4 hex>), never D:\ root. NEVER prompt the user. NEVER push — present
via send_message to the Main Coordinator.

BASIS: tools/ui-expert/mobile-fundamentals.md MOB-47, recorded as a HYPOTHESIS not a finding. A
foldable's posture change is just a resize, and the site swaps layouts at the 769px breakpoint. The
question nobody has tested: does IN-FLIGHT STATE survive that swap? Needs NO foldable hardware —
just a resizable browser window.
TEST each with state deliberately in flight, crossing 769px in BOTH directions: (a) a partially
filled build (do picks survive?), (b) an OPEN dialog (does it stay open/usable, or orphan?), (c) a
scrolled filter rail (position preserved?), (d) a mid-edit numeric range-filter field (does focus or
the typed value get torn? — these inputs shipped 2026-07-18, DNS-21), (e) an open routed page
(#forum/#guides — does the route survive the resize?).
Use preview_start on the project's launch.json + the browser tools; DOM-eval via javascript_tool
rather than screenshots (pane screenshots time out in this environment).
DELIVERABLE: a findings write-up appended to tools/ui-expert/mobile-fundamentals.md as a NEW fact
(append-only — never edit MOB-47 itself; a correction is a new fact). If you find a real defect,
FLAG it with repro steps — do NOT fix index.html (corpus boundary). Gates: validate, npm test, tsc.
```

---

## 13. [Sonnet, medium] MODELYEAR BACKFILL — long-parked, still owed
```
[Sonnet, medium effort] MODELYEAR BACKFILL. Branch catalog/modelyear-2 off origin/main, fresh
worktree UNIQUE suffix (myb-<4 hex>), never D:\ root. NEVER prompt the user. NEVER push — present
via send_message to the Main Coordinator.

TASK: populate `modelYear` on year-specific rows — frames, complete bikes, forks, shocks, and
generational components — sourced from the maker page that already backs each row where possible.
★ LEAVE IT BLANK on year-agnostic parts (tires, saddles, grips, generic drivetrain). The policy is
already written in tools/DATA-ENTRY-TEMPLATE.md — follow it exactly.
★ NEVER INVENT A YEAR. A blank modelYear is correct and expected; a guessed one is a fabrication,
and this field will eventually drive filtering, so a wrong value misleads riders. If a row's source
doesn't state a year, leave it blank and say so in your report.
ALLOWED: adding modelYear to EXISTING rows only. No other field edits, no new rows, no id changes,
no engine/schema edits. This touches many rows in src/compat.js, so commit per category to keep the
coordinator's review and any conflict resolution tractable.
Report: rows backfilled per category, rows deliberately left blank and why, and any row whose
stated year contradicts its family/gen fields (that's a real data conflict worth flagging).
```
