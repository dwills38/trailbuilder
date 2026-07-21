# Paste-ready worker blocks — refreshed by seat 16 (2026-07-21)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
Seat 15's queue is fully shipped except **cb-sheets-6 and road-11, still IN FLIGHT** — do NOT
re-issue those; harvest them via the report-drop Monitor. (gravel-7, kit-11, service log, and
the fabricate-fill audit all landed on main this seat.)

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

### 0. [Sonnet, medium] GRAVEL FIX — fabricate-fill audit fix list (READY NOW)
Coordinator-reviewed, Trek T47 headline independently confirmed by two seats. Fixes ONLY —
no new breadth. `.claude/worker-reports` copy is gone (harvested) but the full audit is on
main at `.claude/worker-reports/fabricate-fill-audit.md`'s content — now folded into
PROJECT-LOG 2026-07-21 seat-16 entry; read that first for the evidence trail, then:
1. `gfr-trek-checkpoint-sl-7`: `bb:'bb86'` → `'t47-86'` (Trek spec table: T47 internal-
   bearing 85.5mm, not press-fit). Add provenance (trekbikes.com Checkpoint SL 7 AXS Gen 3
   spec tab, model 5321676).
2. `gfr-trek-checkpoint-alr-5`: `bb:'bsa-road'` → `'t47-86'`, same source route
   (trekbikes.com Checkpoint ALR 5 Gen 2 spec tab).
3. Repoint the Checkpoint golden (`test/test-road-golden.js`)'s `bb` fill off
   `gbb-shimano-sm-bb72-bsa` to a real T47-85.5×24mm-road BB — enter Praxis "T47 I.B.
   Shimano" (praxiscycles.com/product/t47-i-b-shimano/, fetches clean) as a NEW row, or use
   SRAM BB-DUB-T47-A1 if pairing with a DUB crank instead. Do NOT delete/retire
   `gbb-shimano-sm-bb72-bsa` — it's real, verified, and legitimately fills PF86 frames
   (Canyon Grail, Rondo Ruut).
4. `gbb-praxis-t47`: `spindle:'dub'` is fabricated — Praxis makes no DUB T47 (its T47 line
   is Shimano-24mm/M30 only; praxiscycles.com's own T47 E.B. page never mentions DUB).
   Retire the id (ALIASES + verify-job tombstone, append-only convention) and re-enter as
   the real T47 E.B./I.B. Shimano (`spindle:'24mm-road'`), OR replace with SRAM
   BB-DUB-T47-A1 if a DUB×T47 path is wanted instead.
5. `gfw-hunt-adventurewide-650b` / `grw-hunt-adventurewide-650b`: phantom model — Hunt's
   real 650B lineup is exactly three SKUs, none named "Adventure Wide" (the row splices two
   real products' specs). Retire both ids; if a 650b wheel is still wanted, enter the real
   "HUNT 650B Adventure Carbon Disc" (27mm int, us.huntbikewheels.com) or "Mason X Hunt
   650B Adventure Sport" (25mm int). Repoint the KNOWN-BAD golden's 650b front wheel to
   whichever real id you enter (any 650b wheel serves that test's purpose).
6. Use the new `status`/`supersededBy` gravel schema fields (landed this seat) for any
   retirement instead of a bare delete.
Gates as always; STAND DOWN if `catalog/gravel-fabfix-1` already has commits. Two suspects
NOT in scope for this chip (need their own fetch first): `bmx-fr-redline-prolineflight`
(redlinebicycles.com — real Proline is disc-braked but "Flight" trim unconfirmed) and
`ghs-cannondale-si-zs44-ec49` (unsourced, non-load-bearing). Leave both as-is.

### 1. [Sonnet, medium] MTB tail 5 — the remaining verification tail
~1,870 unverified MTB rows; the biggest levers left: rotors via measured-weight sources
(SRAM/Shimano/Campagnolo publish none), the FC-MT612 identity call (Douglas), Fox fork
weights (tech sheets are dimensional-only).

### 2. [Sonnet, medium] GRAVEL 8 — toward the ~300-row target
Waits for the gravel fix chip (#0) to land first — same file, avoid a stale-base collision.
Breadth again after two depth waves: frame brands with static pages, 650b wheel depth. The
four logged schema-vocab non-fits stay logged (square-taper, slider dropouts, 36.1mm post,
Wilier) unless Douglas rules on vocab additions. Lead with gravel-1's remaining bb86 frame
claims (Canyon Grail CF SL, Grizl, BMC URS, Rondo Ruut, Bianchi Impulso, Liv Devote) —
plausible-but-unfetched and share the exact field two rows just proved fabricated.

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
domain-portfolio memory); `bb86` vs `pf86` gravel-vocab unification (schema-sign-off, not a
chip — 2 pf86 frames are currently BB-unbuildable because the only press-fit-86 BB row
carries the `bb86` token); FC-MT612 identity; gravel CX-tag + rim-brake vocab; the carried
decision-queue tail (see the SEAT 16 block).
