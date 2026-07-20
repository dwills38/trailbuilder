# Paste-ready worker blocks — refreshed by seat 14 (2026-07-20)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4 —
paste-blocks, never click-chips). Seat 13's original 13 blocks are ALL DONE and removed;
this is the live queue. Ordered by value.

**Clauses baked into every block** (verify before handing one over): fresh worktree with a
UNIQUE suffix off `origin/main` **at `.claude/worktrees/<name>` INSIDE `D:\MTB Bike Builder`
(Hard rule #5, hook-enforced)** · NEVER prompt Douglas · NEVER push — present via send_message
(coordinator review is the gate) · COMMIT PER BRAND/ITEM (interrupted = committed work is the
deliverable) · `tools/verification-job.json` is coordinator-only · gates = `node validate.js`
(7 OK) + `npm test` + `npx tsc --noEmit` (+ verdict harness on any compat.js change) · no
e-bikes in any non-EMTB catalog · a blank beats an invented value.

**Doctrine every catalog block must honor** (tools/VERIFY-PROTOCOL.md): FETCH ETHICS
(WebFetch → Exa → browser pane → stop; CAPTCHA = documented wall — Five Ten/adidas is the only
confirmed wall) · **JS-RENDERED ≠ BOT-WALLED** (click Specs tabs in the browser pane before
declaring a wall) · **PHANTOM-NUMBER** (every committed figure literally present in raw page
text; summaries are leads) · never infer a max/limit from a STOCK part.

---

## 1. [Sonnet, medium] BMX WAVE 5 — small-parts sweep to the 40% bar
15 rows to Douglas's 90/225 go-live bar. Wave 4's honest read: the frame lever is spent; the
path is small parts on brands with proven static/first-party sites (Colony, Mongoose intl,
Verde, Sunday) — NOT the Shopify-JS-shell brands (Odyssey/Cult shipping-weight trap).

```
[Sonnet, medium effort] BMX WAVE 5 — SMALL-PARTS SWEEP. Branch verify/bmx-5, worktree
.claude/worktrees/bmx5-<4 hex> INSIDE D:\MTB Bike Builder (Hard rule #5). NEVER prompt the
user. NEVER push — present via send_message to the Main Coordinator. COMMIT PER BRAND.
SCOPE — ONLY data/bmx.js: 75/225 verified, bar = 90. Read tools/verify-notes-bmx.md waves 1-4
first (the terrain is fully mapped — do not re-walk exhausted brands/dead domains). Yield =
small parts (bars/stems/cranks/pedals/seats/pegs/hubs) on Colony, Mongoose international,
Verde, Sunday, Supercross, United, Radio — first-party static pages, raw-text confirmation
per the PHANTOM-NUMBER rule. Complete-bike-only FRAMES may verify under the 2026-07-20
ruling's three conditions (VERIFY-PROTOCOL "Extended to FRAMES"). Skip: Odyssey/Cult
(shipping-weight bucket), Premium (dead domain), Subrosa Malum/Salvador (404s).
Gates per commit. Report: before/after, distance to 90, honest reachability call.
```

## 2. [Sonnet, medium] KIT EYEWEAR + SHOE TAIL (wave 5)
244 kit rows left; wave 4 closed helmets and re-scoped Shimano shoes. Untouched: all 56
eyewear rows + ~55 remaining shoes (Giro cluster started; Five Ten is the CAPTCHA wall — skip).

```
[Sonnet, medium effort] KIT WAVE 5 — EYEWEAR + SHOE TAIL. Branch verify/kit-5, worktree
.claude/worktrees/kt5-<4 hex> INSIDE the project (Hard rule #5). NEVER prompt the user.
NEVER push — present via send_message. COMMIT PER BRAND.
SCOPE — ONLY src/kit.js (244 unverified). Apparel bar per VERIFY-PROTOCOL: no weight needed
(helmets keep the weight bar; accurate weights welcome everywhere — the more-info principle).
Eyewear first (56 rows, untouched — 100%/Oakley/Smith/POC publish clean product pages;
100percent.com is JS-rendered, use the browser pane), then the shoe tail (continue Giro;
Shimano current names only per tools/verify-notes-kit.md's re-scope map; SKIP Five Ten —
confirmed CAPTCHA wall). Dispositions to tools/verify-notes-kit.md.
ALSO: the 3-row kit-3-vs-kit-4 verified disagreement (hm-100-altec,
hm-troyleedesigns-d4-composite-mips, sho-shimano-xc5) — do the ONE tiebreak fetch each and
report which wave was right; correct off the fetched page only.
Gates per commit. Report: before/after by category, the 3 tiebreak verdicts with URLs.
```

## 3. [Sonnet, medium] GRAVEL GRIND WAVE 2
Wave 1 hit 198 rows honestly; continuation mapped: more frame brands + the Chris King retry
(DNS/429 — space it out) + finishing-kit verification depth.

```
[Sonnet, medium effort] GRAVEL CATALOG GRIND WAVE 2. Branch catalog/gravel-grind-2, worktree
.claude/worktrees/gv2-<4 hex> INSIDE the project (Hard rule #5). NEVER prompt the user.
NEVER push — present via send_message. COMMIT PER BRAND.
SCOPE — ONLY data/gravel.js (198 rows, 27 verified; target ~300). Read data/GRAVEL-MODEL.md +
the wave-1 report (PROJECT-LOG 2026-07-20) first. Douglas's confirmed decisions stand
(maxTireByWheel, suspension forks, dropper, Ekar); CX-tag + rim-brake stay open — log, never
decide. Continue: frame brands, Chris King retry (spaced — the DNS/429 was a throttle),
verification depth on wave-1's unverified rows, and if the drop-bar cleanup chip has NOT
landed its GRX wheels yet, add Shimano-freehub wheel variants (kills the no-clean-GRX-build
trap). NO e-gravel, ever. Gates per commit. Report: rows/verified before-after, walls,
decisions list.
```

## 4. [Sonnet, low] FORKS TAIL (MTB)
~113 fork rows pending since the forks wave; the nominal-weight policy applies; DVO is a
confirmed JS-shell (re-test via the browser pane per the new doctrine before skipping).

```
[Sonnet, low effort] MTB FORKS TAIL. Branch verify/forks-3, worktree
.claude/worktrees/fk3-<4 hex> INSIDE the project (Hard rule #5). NEVER prompt the user.
NEVER push — present via send_message. COMMIT PER BRAND.
SCOPE — cat:'fork' pending rows (~113). Fork nominal-weight policy applies
(VERIFY-PROTOCOL); minRotorF is ERROR-TIER — maker-sourced only; never read a ceiling off the
stock config (the Roscoe lesson). FIRST: re-test dvosuspension.com + EXT via the browser
pane (JS-rendered ≠ walled — three walls fell to this doctrine already); if they render,
the 25 DVO Failed rows are the biggest cluster. Dispositions to a verify-notes file, not
verification-job.json. Gates per commit. Report: before/after, wall verdicts, corrections.
```

## 5. [Sonnet, medium] FEATURE SLATE #4 — PERSONAL RECALL WATCHER
The cheapest committed feature: joins recall notes the catalog already carries to the garage
riders already have.

```
[Sonnet, medium effort] FEATURE SLATE #4 — PERSONAL RECALL WATCHER. Branch
feat/recall-watcher-1, worktree .claude/worktrees/rw1-<4 hex> INSIDE the project (Hard rule
#5). NEVER prompt the user. NEVER push — present via send_message with browser evidence
(live-surface feature: coordinator review is the gate).
BASIS: docs/PRODUCT-IDEAS-2026-07-19.md idea 4 + the committed slate in docs/MISSION.md.
Rows already carry recall NOTES (the recall-watchdog corpus, RECALL-LOG); the garage/
inventory already knows what a rider owns. Build the join: when a signed-in rider's garage/
inventory contains a part carrying a recall note, surface a QUIET notice in the garage view
(a labeled row/banner INSIDE the garage the user opens — never a popup, never auto-appearing
site-wide) linking the official remedy. Honest framing per the recall-notes convention (a
recall scopes serial ranges, not every unit — say so). Zero engine changes; pure read-join in
the garage render path; extract any pure logic to a tested module.
Gates + harness byte-identical; browser-verify signed-in flow at 375px/desktop, 4 themes,
popup scan (nothing may appear outside the garage view). Report: the join logic, the exact
notice wording, and evidence across a garage with and without recalled parts.
```

## 6. [Fable, high] FEATURE SLATE #16 — DISCONTINUED-PARTS ARCHIVE VIEW
Pairs with the shipped Upgrade Advisor (used shoppers hunt discontinued interface specs).
Fable because the browse/UX judgment is the work; the data fields already exist.

```
[Fable, high effort] FEATURE SLATE #16 — DISCONTINUED ARCHIVE VIEW. Branch
feat/discontinued-archive-1, worktree .claude/worktrees/da1-<4 hex> INSIDE the project (Hard
rule #5). NEVER prompt the user. NEVER push — present via send_message with browser evidence.
BASIS: docs/PRODUCT-IDEAS-2026-07-19.md idea 16. The lifecycle fields (status,
supersededBy) already chain generations. Build an explicit "include discontinued" browse
mode: a user-opted toggle (never default-on — the default catalog stays current-market), a
clear lifecycle banner on discontinued rows (status + what supersedes it, linked), and
correct interplay with the Upgrade Advisor (checking a used discontinued part against your
bike is THE use case). Verdicts unchanged — discontinued parts check exactly like any part;
this is visibility, not engine. UNBIASED: the toggle/banner treats every brand identically.
Gates + harness byte-identical; browser-verify at 375px/desktop, 4 themes, popup scan.
Report: design decisions, the toggle's exact behavior, Upgrade-Advisor interplay evidence.
```

---

**Held pending Douglas:** road/gravel PAGE builds (need his flip-word sequencing), D2/D3
home-page directions (round-2 mockups in flight), BMX flip at the 40% bar, everything in the
decision queue (see the SEAT 15 block).
