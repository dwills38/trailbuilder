# Paste-ready worker blocks — refreshed by seat 16 (2026-07-21)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
**Nothing is in flight right now** — gravel-7, kit-11, service log, the fabricate-fill audit,
its fix chip, cb-sheets-6, and road-11 all landed on main this seat, and the bb86/pf86 vocab
merge is done. Queue below is fully open to dispatch.

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
~1,880 unverified MTB rows; the biggest levers left: rotors via measured-weight sources
(SRAM/Shimano/Campagnolo publish none), the FC-MT612 identity call (Douglas), Fox fork
weights (tech sheets are dimensional-only), plus 2 flagged-not-fixed items from cb-sheets-6
worth a quick follow-up look: 2 Ibis duplicate-SKU pairs (an id-merge decision) and
`cb-specialized-chisel-sram` (no live match — likely discontinued).

### 2. [Sonnet, medium] GRAVEL 8 — toward the ~300-row target
Breadth again after two depth waves + the fabricate-fill fix. Frame brands with static
pages, 650b wheel depth. The four logged schema-vocab non-fits stay logged (square-taper,
slider dropouts, 36.1mm post, Wilier) unless Douglas rules on vocab additions. Lead with
gravel-1's remaining bb86 frame claims (Canyon Grail CF SL, Grizl, BMC URS, Rondo Ruut,
Bianchi Impulso, Liv Devote) — plausible-but-unfetched and share the exact field two rows
just proved fabricated. Two suspects from the fabricate-fill audit still need their own
fetch: `bmx-fr-redline-prolineflight` (redlinebicycles.com) and
`ghs-cannondale-si-zs44-ec49` (unsourced, non-load-bearing).

### 3. [Sonnet, low] STRIDERS 2 — the blocked eight, one retry
8/36 rows blocked on no-maker-weight; a measured-weight (sourceType:'measured') sweep is
the only path; low yield expected, low effort priced in.

### 4. [Fable, high] FEATURE SLATE — BUILD DIFF (compare two saved builds)
The next committed slate pick, now that service-log has landed (same index.html lane — ONE
at a time). Garage-pair diff view: parts added/removed/swapped, price/weight deltas, verdict
deltas via checkBuild on both builds. Click-opened, zero engine changes, DI-extracted
module + tests, the build-sheet precedent for print styling if wanted.

### 5. [Sonnet, medium] EMTB 6 — measured-weight + trim tail
26 blocked rows (twice-confirmed walls) need sourceType:'measured' figures or stay honest;
plus the Bullit XX trim-identity fix from emtb-5's flag. Compact packet, e-content in
data/emtb.js only.

### 6. [Sonnet, medium] ROAD 12 — Specialized remainder + wheel/cockpit close-out
road-11 closed the wheels/cockpit tail it took; road still has open threads worth a wave:
the 2 flagged-not-fixed rows (HUNT 36/48 Aerodynamicist — likely fictitious SKU, no matching
product found anywhere, consider retiring; Deda M35/Trentacinque — conflates two different
Deda products, retarget or retire) need a coordinator-style call baked into the brief rather
than left open again, plus whatever road-brand breadth is still thin.

---

**Held pending Douglas:** the Cloudflare redirect batch (5 rows, his clicks — table in
domain-portfolio memory); FC-MT612 identity; gravel CX-tag + rim-brake vocab; the carried
decision-queue tail (see the SEAT 16 block).
