# Paste-ready worker blocks — refreshed by seat 16 at wrap-up (2026-07-21 evening)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
**Nothing is in flight** — all ~45 of seat 16's worker branches landed on main. The queue
below is the fresh next round, built from the day's own reports' next-wave leads.

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

## Queue (dispatch when a lane frees up — all leads sourced from 07-21's own reports)

### 1. [Sonnet, medium] BMX PRICE-BLOCKED SWEEP + Fit/Chase
bmx-depth-7's structural finding: many BMX small-part categories have zero engine-read
fields beyond identity, so THE PRICE RULE leaves dozens of interface-confirmed rows one
edit from verified — re-sweep ALL brands for that shape (not just the eight covered).
Then the two untouched high-headroom brands: Fit Bike Co (1/18 verified) and Chase (0/10).
The 3/8" axle vocab gap stays flagged, don't fabricate (bmx-fr-cult-race). Gates: all four
incl. BMX validator. Never push. Report to .claude/worker-reports/bmx-price-sweep.md.

### 2. [Sonnet, medium] CB-SHEETS-10 — Yeti (the largest unverified complete-bike brand)
20 unverified Yeti bikes; cb-sheets-6 already confirmed yeti.com is un-walled and corrected
its price rows. Sheet-verify fills per the proven method; the Roscoe-9 lesson applies (page
text vs engine schema → the test suite arbitrates, document don't force). Next after Yeti:
Transition (14), Pivot (14 — mostly retired trims, expect archive work), Orbea (13 — WAF
wall, browser pane only). Gates: all four + harness. Never push. Report to
.claude/worker-reports/cb-sheets-10.md.

### 3. [Sonnet, medium] GRAVEL VERIFY 3 — material-mislabel grep + the aftermarket tail
Lead with gravel-verify-2's systemic finding: grep every remaining unverified gravel
frame's `material` field against its maker page (4 mislabels caught so far, all
grind-1-entered 'alloy' on real carbon/steel frames). Then the aftermarket tail (~118
rows: tires 11, forks 12, wheels 20, headsets 5, cockpit, saddles, pedals, bartape) —
cleaner single-purpose pages than frames, likely faster per-row. statebicycle.com 429
retry. Gates: all four. Never push. Report to .claude/worker-reports/gravel-verify-3.md.

### 4. [Sonnet, medium] MTB TAIL 10 — OE-wheel sampling + the ti- tail + XM1700 CL fix
(a) Sample the OE-spec wheel brands with real maker sites (We Are One, Industry Nine,
Reserve) before bulk-Skipping the rest; (b) the ~50-row ti- tail
(Panaracer/Schwalbe/Kenda/Specialized/WTB/Continental — Specialized via Exa, proven);
(c) the flagged XM1700 rotor-mount fix: DT Swiss says the family is native CENTER-LOCK
with an included 6-bolt adapter, catalog says sixbolt — fix the wheel rows AND re-check
the ~10 dependent completebike fills in one pass (warning-tier both ways). Dispositions to
tools/verify-notes-tail10.md, never the job file. Gates: all four + harness. Never push.
Report to .claude/worker-reports/mtb-tail-10.md.

### 5. [Sonnet, low] ROAD 17 — the last 36
road is 185/221 (84%). The remaining 36 are mostly documented dead ends — this pass is a
close-out audit, not breadth: re-check only rows whose notes name a retryable condition
(Ritchey C260 regional TLS cert, Prologo Dimension identity, statebicycle-class 429s,
frames blocked purely on the no-frame-weight pattern), and confirm the rest are correctly
parked. If Douglas rules YES on the seatpost exception (open-question item 2), apply it to
the 2 waiting posts. Gates: all four. Never push. Report to
.claude/worker-reports/road-17.md.

---

**★ DOUGLAS'S FULL OPEN-QUESTION QUEUE (consolidated 2026-07-21 end-of-seat-16 on his
instruction — "make sure any outstanding questions for me will be saved for the next
coordinator." Raise gently, never nag; items 1-2 are the freshest.)**

0. **★ PENDING SUPABASE SQL RUNS (Douglas 2026-07-21: "remind me of the supabase step
   later, i most likely wont do it the next time you ask" — so REMIND REPEATEDLY until he
   confirms each ran; a single mention does not discharge this).** Reserved-username
   seeds only exist in the DATABASE after he pastes them into the Supabase SQL editor —
   the repo files alone change nothing live. Outstanding runs (all idempotent, safe to
   re-run whole files; paste CONTENT from GitHub raw / chat, never the shared checkout):
   a. `supabase/forum-reserved-additions.sql` — Dirt Jesus (held). Committed `d3e55ab`,
      NOT yet run as of 2026-07-21 evening.
   b. Same file, pro-rider batch — appended when the pro-riders-reserve chip lands.
   c. `supabase/forum-reserved-brands-influencers.sql` — brands + influencers (Berm
      Peak/Seth Alvo, Skills With Phil/Phil Kmetz, Sploosh MTB, …) — exists once the
      brand-influencer-reserve chip lands.
   Cross-seat rule: verify which have run (ask him / check the Table Editor counts)
   before striking any sub-item; carry the rest forward.
1. **THE RE-BRAINSTORM SESSION IS DUE** — the 2026-07-19 feature slate completed 8/8 on
   2026-07-21; his recorded words: "once we get closer to the end, I will want to run
   another brainstorming session." He asked to be reminded "a little later" — seat 16's
   reminder cron dies with the seat, so the NEXT coordinator inherits the reminder duty.
2. **Seatpost interface-exception question** (road-16, 2026-07-21): should seatposts join
   the ratified interface-verification exception list? Weight isn't engine-read for
   seatposts (only diameter/setback feed compat) and makers often publish none — a yes
   promotes sp-trek-domane-slr-kvf + sp-cannondale-synapse-save immediately and unblocks
   the class. Same shape as the six exceptions already ratified.
3. **Gravel vocab-widening packet** — now 4+ REAL products blocked by missing tokens:
   QR rear axles (Salsa Journeyman 10x135, Kona Rove AL), straight steerers (Kona Rove AL,
   Ritchey Outback, possibly Marin Nicasio+ base tier), square-taper BB shell (Nicasio+),
   36.1mm post, Wilier's 1-1/4 straight. Each needs a token + possibly engine awareness;
   worth one consolidated ruling instead of per-row flags. (Related: gravel CX-tag +
   rim-brake vocab, carried from earlier waves.)
4. **The Cloudflare redirect batch** (5 rows, his clicks — table in domain-portfolio
   memory). Standing since 2026-07-20.
5. **archive_session auto-approve hook** — the harness always-prompts on session archiving;
   the safety classifier (correctly) blocked the coordinator from self-installing the
   auto-approve hook. The exact JSON block to paste into .claude/settings.json's PreToolUse
   array is in seat 16's transcript (2026-07-21 evening); he deferred ("not going to worry
   about that now"). Batching archives is the workaround meanwhile.
6. **Audit L4 follow-through (optional)**: round-robin the verification queue by maker so no
   single brand absorbs a day's badge grants (Specialized took 70% on 07-21 for legitimate
   unwalling reasons; the disclosure line already shipped). Process tweak, coordinator can
   implement on his nod.
7. **"Sort: Random" wording nit** (ui-honesty caveat): the 5 non-MTB pages shuffle
   per-category (grouped, then shuffled within) vs index.html's whole-catalog shuffle — both
   provably maker-unbiased; unifying the algorithms or tightening wording is his taste call.
   Low priority.
8. **Audit M7 / rule-18 wheel-size-aware clearance** — MTB's scalar maxTire mis-warns
   maker-approved plus-tires on dual-wheel-size frames (Surly 27.5x3.0 case); gravel's
   maxTireByWheel is the model. Engine change → adversarial review when picked up.
9. **Carried older tail** (from the SEAT 16 block, still open): fr-trek-slash orphan dedupe,
   verified-badge semantics + price-policy gap (1,000+ sample-price verified rows), gallery
   six, reviews.sql levers + hardening-2.sql, Supabase MFA/CAPTCHA check, Cloudflare Vitals
   Explorer read, Finder two, recall-badge scoping, fitter paywalls, the empty
   D:\mtb-worktrees shell folder (his one manual right-click).
10. **BMX cadence**: he pasted BMX depth 7 on 2026-07-21 (his word for that wave);
    flagship-first still governs — future BMX chips still need his paste.
