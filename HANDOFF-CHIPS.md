# Paste-ready worker blocks — refreshed by seat 16 (2026-07-21)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
**Nothing is in flight right now** — every chip from the last two dispatch rounds (gravel-7,
kit-11, service log, fabricate-fill audit + its fix chip, cb-sheets-6, road-11, mtb-tail-5,
gravel-8, emtb-6, road-12, build-diff-1) landed on main this seat, and the bb86/pf86 vocab
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

### 1. [Sonnet, medium] MTB tail 6 — rotors, Fox forks, Ibis duplicate call
~1,876 unverified MTB rows. Three concrete levers left, each genuinely hard (prior waves
hit real dead ends, don't just repeat the same searches): (a) 17 unverified SRAM rotor rows
— SRAM publishes no rotor weights at all, needs a `sourceType:'measured'` figure that
survives a raw-page re-check (mtb-tail-5 rejected a WebSearch-summary figure that didn't
appear on the actual cited page — phantom-number hazard, verify before committing); (b) ~15
Fox forks are OE-only travel points with no standalone SKU page — the ones with an
engineering PDF/JPG spec sheet need a vision read (pdftoppm-rendered), not pdftotext; (c) the
Ibis Ripmo V3 / Ripley V5 GX-AXS-vs-GX-Transmission duplicate-SKU pairs are flagged in their
own `desc` fields from two prior waves now — this pass should make the id-merge CALL (not
just re-flag it a third time): confirm via ibiscycles.com whether each pair is really one SKU
sold under two catalog ids, and if so do the retirement properly (ALIASES + verify-job
tombstone). Also worth a look: Formula/Tektro/Clarks/TRP/Galfer entry-tier rotors (untouched
so far). Gates: node validate.js + npm test + npx tsc --noEmit + node
tools/verdict-audit-harness.js (compat.js changes). Never push — present the branch. Final
act: write the report to .claude/worker-reports/mtb-tail-6.md before any send_message.

### 2. [Sonnet, medium] GRAVEL 9 — breadth + two loose threads
Toward the ~300-row target. Two specific follow-ups from gravel-8 worth closing rather than
re-flagging: Liv Devote Advanced 1's bb86 is still an inference (try Liv's geometry/spec PDF,
not linked from the current product page); the Cannondale SI ZS44/EC49 headset row is
probably a brand/spec mismatch (Cannondale's real "SI" system is Lefty/Headshok IS42-family,
not a ZS44/EC49 SKU) — re-source it as a real Cane Creek/WOOdman product or drop it. Then
general breadth: frame brands with static pages, 650b wheel depth. The schema-vocab non-fits
logged so far (square-taper, slider dropouts, 36.1mm post, Wilier's straight steerer,
Tumbleweed/Curve's out-of-vocab axle spacings) stay logged — don't invent vocab or force a
fit; the axle-spacing ones need an engine-level change in compat-road.js, out of scope for a
data wave. Gates: node validate.js + npm test + npx tsc --noEmit. Never push — present the
branch. Final act: write the report to .claude/worker-reports/gravel-9.md before any
send_message.

### 3. [Sonnet, medium] ROAD 13 — Ritchey identity chase + breadth
Three Ritchey cockpit rows (hb-ritchey-wcs-streem, st-ritchey-wcs-c260,
sp-ritchey-comp-two-bolt) look like the same stale-naming pattern road-11/12 already solved
twice (Shimano FC-RX600-2, Deda M35) — Ritchey's current lineup has "WCS Streem Internal
Routing" and "Superlogic C260 84D" but nothing matching these exact names. Chase down real
current-catalog matches or confirm discontinued, same discipline as the Deda resolution.
Also worth a look: st-fsa-kforce (4 current K-Force stem variants, none cleanly matches),
pd-look-keo-blade-carbon (naming may be descriptive not a tier), bt-supacaz-super-sticky-kush
(walled both routes last time — retry once). Then general unverified-count breadth. Gates:
node validate.js + npm test + npx tsc --noEmit. Never push — present the branch. Final act:
write the report to .claude/worker-reports/road-13.md before any send_message.

### 4. [Sonnet, low] KIT 12 — ION/Loose Riders/Pearl Izumi retry, one more pass
The SKU-ambiguity walls on these three brands have now been independently re-confirmed twice
(kit-10, kit-11) — low expected yield, but worth one more pass specifically hunting the
"prior session fetched real data into `desc` but never flagged `verified:true`" pattern
kit-11 found (7 candidates surfaced, only 2 were safe to promote) — scan the rest of the kit
catalog for that shape before spending budget on new fetches. Gates: node validate.js + npm
test + npx tsc --noEmit. Never push — present the branch. Final act: write the report to
.claude/worker-reports/kit-12.md before any send_message.

---

**Held pending Douglas:**
- The Cloudflare redirect batch (5 rows, his clicks — table in domain-portfolio memory)
- gravel CX-tag + rim-brake vocab
- the carried decision-queue tail (see the SEAT 16 block in COORDINATOR-HANDOFF.md)
