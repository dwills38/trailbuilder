# Paste-ready worker blocks — refreshed by seat 15 (2026-07-21)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
Seat 14's queue is fully shipped. **Six chips are IN FLIGHT at this refresh** (cb-sheets-6,
service log, fabricate-fill audit, gravel-7, kit-11, road-11) — do NOT re-issue those;
harvest them via the report-drop Monitor.

**Clauses baked into every block** (verify before handing one over): fresh worktree with a
UNIQUE suffix off `origin/main` at `.claude/worktrees/<name>` INSIDE `D:\MTB Bike Builder`
(Hard rule #5 — the containment hook is LIVE and will deny outside paths) · **if your exact
branch already exists with commits, STAND DOWN and report** (the double-paste guard) ·
NEVER prompt Douglas · NEVER push — coordinator review is the gate · COMMIT PER
BRAND/GROUP/ITEM · `tools/verification-job.json` is coordinator-only · gates =
`node validate.js` (7 OK) + `npm test` + `npx tsc --noEmit` (+ verdict harness on any
compat.js change) · no e-bikes outside data/emtb.js · a blank beats an invented value ·
**FINAL ACT: write the full report to `.claude/worker-reports/<branch-slug>.md` BEFORE any
send_message; never wait on send_message.**

**Doctrine every catalog block must honor** (tools/VERIFY-PROTOCOL.md): FETCH ETHICS
(WebFetch → Exa → browser pane → stop; a CAPTCHA is a documented wall) · JS-RENDERED ≠
BOT-WALLED (and walls are STALE BY DEFAULT — one honest browser-pane retry before trusting
any wall note) · PHANTOM-NUMBER (every committed figure literally present in raw page
text/image; Shimano handbook tables read as rendered images, never pdftotext) · never infer
a max/limit from a stock part · error-tier relaxations go to the coordinator with the maker
quote (two conflicting first-party sources = the conservative value stands).

---

## Queue (dispatch when a lane frees up)

### 1. [Sonnet, medium] MTB tail 5 — the remaining verification tail
Waits for cb-sheets-6 to land (same file). ~1,870 unverified MTB rows; the biggest levers
left: rotors via measured-weight sources (SRAM/Shimano/Campagnolo publish none), the
FC-MT612 identity call (Douglas), Fox fork weights (tech sheets are dimensional-only),
and whatever the fabricate-fill audit's fix list produces (coordinator-reviewed first).

### 2. [Sonnet, medium] GRAVEL 8 — toward the ~300-row target
Waits for gravel-7. Breadth again after two depth waves: frame brands with static pages,
650b wheel depth. The four logged schema-vocab non-fits stay logged (square-taper, slider
dropouts, 36.1mm post, Wilier) unless Douglas rules on vocab additions.

### 3. [Sonnet, low] STRIDERS 2 — the blocked eight, one retry
8/36 rows blocked on no-maker-weight; a measured-weight (sourceType:'measured') sweep is
the only path; low yield expected, low effort priced in.

### 4. [Fable, high] FEATURE SLATE — BUILD DIFF (compare two saved builds)
The next committed slate pick after service-log lands (same index.html lane — ONE at a
time). Garage-pair diff view: parts added/removed/swapped, price/weight deltas, verdict
deltas via checkBuild on both builds. Click-opened, zero engine changes, DI-extracted
module + tests, the build-sheet precedent for print styling if wanted.

### 5. [Sonnet, medium] EMTB 6 — measured-weight + trim tail
26 blocked rows (twice-confirmed walls) need sourceType:'measured' figures or stay honest;
plus the Bullit XX trim-identity fix from emtb-5's flag. Compact packet, e-content in
data/emtb.js only.

---

**Held pending Douglas:** the Cloudflare redirect batch (5 rows, his clicks — table in
domain-portfolio memory); fabricate-fill fix list (after the audit lands + coordinator
review); FC-MT612 identity; gravel CX-tag + rim-brake vocab; the carried decision-queue
tail (see the SEAT 16 block).
