# Paste-ready worker blocks — refreshed by seat 17 at wrap-up (2026-07-22)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
Check the fleet before dispatching — seat 17's final in-flight set (vocab-tier1, pb-token6,
pb-emtb-2) may still be running or freshly harvested; the STAND-DOWN clause protects
against double-paste either way.

**Clauses baked into every block** (verify before handing one over): fresh worktree with a
UNIQUE suffix off `origin/main` at `.claude/worktrees/<name>` INSIDE `D:\MTB Bike Builder`
(Hard rule #5 — the containment hook is LIVE) · **EVERY file you create — scratch scripts, temp
dumps, notes, reports — stays INSIDE the project (your worktree, or the harness Temp\claude
scratchpad); the hardened hook (2026-07-22) now denies outside Writes/Edits and outside shell
redirects/copies, and the coordinator leak-sweeps D:\ root hourly — a blocked call means FIX
YOUR PATH, never work around it** · **NO BROWSER DOWNLOADS, EVER**
(Chrome download prompts land in Douglas's Downloads folder — a containment violation; read
pages as text via get_page_text/read_page, fetch payloads via WebFetch/Exa/curl to a path
INSIDE the project, and CANCEL any download prompt that appears) · **if your exact branch already exists with
commits, STAND DOWN and report** · NEVER prompt Douglas · NEVER push — coordinator review
is the gate · COMMIT PER BRAND/GROUP/BATCH · `tools/verification-job.json` is
coordinator-only · gates = `node validate.js` (7 OK) + `npm test` + `npx tsc --noEmit`
(+ verdict harness on any compat.js/engine-read change) · no e-bikes outside data/emtb.js ·
a blank beats an invented value · **EVERY new verified:true promotion MUST set `priceBasis`
(Douglas 2026-07-22)** · **FINAL ACT: write the full report to
`D:\MTB Bike Builder\.claude\worker-reports\<branch-slug>.md` — that EXACT absolute path in
the MAIN checkout, NOT the worktree — BEFORE any send_message; never wait on send_message.**

**Doctrine every catalog block must honor** (tools/VERIFY-PROTOCOL.md): FETCH ETHICS
(WebFetch → Exa → browser pane → stop; a CAPTCHA is a documented wall; walls are STALE BY
DEFAULT — one honest retry; interaction rendering ≠ circumvention: Specs-tab clicks,
locale switchers, accordion pointer-sequences are all legitimate) · PHANTOM-NUMBER (every
committed figure literally present in raw page text/image; Shopify shipping-weight buckets
are the known trap) · never infer a max/limit from a stock part · error-tier relaxations go
to the coordinator with the maker quote · priceBasis honesty: `discontinued-no-msrp` NEVER
goes on a current product (a branch was REJECTED for that 2026-07-22); the honest classes
are the enum, blank beats a wrong token.

---

## Queue (dispatch when lanes free — refreshed by seat 18 after the second 2026-07-22 wave)

State after both waves: **MTB burndown 1,777 · gravel 153 · road 3 · BMX 33 (all with honest
per-row reasons — effectively done) · EMTB 5 · kit 0 · striders 0** · 5,116 MTB parts · kit 749
· suite 1,103 tests. Standing lessons: SRAM publishes prices (never default third-party-listed
on a sram.com row); a maker RANGE is never a literal figure; regional-conversion needs a
DISCLOSED conversion (the Continental sample-price catch); "price = sample" in a desc means
BLANK; a bare /tmp is out-of-bounds two different ways — write scratch paths explicitly.

### 1. [Sonnet, medium] PB FINISHING — MTB slice B4 (resume at Cube; Fox/Maxxis/RockShox INCLUDED)
Continue the alphabetical grind from Cube (then Deviate, Devinci, DT Swiss 70, DVO 55...).
B3's resume list said "skip Fox/Maxxis/RockShox" with NO recorded reason — no ruling excludes
them; INCLUDE them (RockShox/SRAM model pages publish MSRPs, so they're actually the easy
msrp-confirmed class). Same protocol + the standing lessons above. NOTE: Exa credits were
exhausted 2026-07-22 — verify Exa works before relying on it; stagger WebFetch on Shopify
storefronts (Cane Creek 429 lesson). Branch backfill/pb-mtb-b4, report pb-mtb-b4.md.

### 2. [Sonnet, medium] 11-speed completebikes: Kona Honzo + Ragley Big Al (now genuinely unblocked)
The stale CLAUDE.md vocab line is fixed — shimano-11 is live with the full M5100 group
verified. (a) Enter the 3 part rows the Honzo build still lacks, maker/OE-attested: Vee Flow
Snap Tackee 29 front + Crown Gem DCC 29 rear tires, the WTB ST i30 TCS / Shimano centerlock
Boost wheel pair, Shimano RT30 160+180 CL rotors; then cb-kona-honzo ($1,299 re-confirmed
2026-07-22, fills per price-leads-1-report.md's fetched build table). (b) Ragley Big Al 1.0:
same pattern (SL-M5100/RD-M5100/11-51T stock; ragleybikes.com fetches clean). Completeness
invariant must pass — a stock part with no honest row gets its row entered properly or the cb
waits; never a gap, never an invention. Branch catalog/cb-11speed-1, report cb-11speed-1.md.

### 3. [Opus, high] ROAD_VOCAB field-mapping ratification + lint widening
road-vocab-lint's residual: 8 ROAD_VOCAB fields drift from the schema vocabs (disc-is,
is-mount, 1-1-8, hydraulic, t47-86, square-taper, proprietary, band-28.6) — documentation
drift, no live wrong verdict. Work: ratify the explicit field-key correspondence table between
ROAD_VOCAB / schema-road / schema-gravel (the ambiguous cases are documented in
road-vocab-lint.md §5 — gravel hub serves both wheel ends; fork axle ≠ hub vocab), then widen
LINT 2 to the whole mapped surface. Adversarial review at merge. Branch
engine/road-vocab-map, report road-vocab-map.md.

### 4. [Sonnet, low] EMTB: Haibike ALLMTN CF 11 TRN/IQ entry
The travelRear wall is resolved (maker Shopify .js JSON states 160mm f/r — route documented in
emtb-pb-clear.md). Enter the full row: every verdict-driving + display field independently
maker-confirmed via the <handle>.js JSON route; priceBasis honest. data/emtb.js only; keep
the Douglas-facing summary compact. Branch catalog/emtb-haibike-allmtn, report
emtb-haibike-allmtn.md.

### 5. [Sonnet, medium] Santa Cruz Bronson trim fill (a real fetch wall — pane craft needed)
Bronson X0 AXS / X0 AXS RSV / S / R / Deore trims are uncataloged; the build-kit table sits
behind a JS "See All Specs" interaction that defeated both the pane and WebFetch on 2026-07-22.
Try the known techniques (pointer-event sequences per the Radix-accordion lesson; a products/
<handle>.js JSON probe; the localized-site route). If the wall stands after honest attempts,
document and stop — never guess a build kit. Branch catalog/sc-bronson-trims, report
sc-bronson-trims.md.

### 6. Held walls (dispatch only when something changes)
135x10-qr wheels (no maker publishes one — gravel-qr-wheels.md) · QR-front gravel forks (no
vocab token; needs sourcing + schema) · Giant Stance E+ (maker copy self-conflicts) · Commencal
frame-only prices (Vue configurator state wall) · Canyon Strive CFR (member-gated) · the
Bronson wall above if attempt 2 fails.

**★ DOUGLAS'S FULL OPEN-QUESTION QUEUE (consolidated 2026-07-22 at seat-17 wrap per the
standing rule — "make sure any outstanding questions for me will be saved for the next
coordinator." Raise gently; the PDF mirror rule applies: `_PDFs/OPEN-QUESTIONS.pdf`,
items enter only after TWO ignored asks, never removed until he rules, NEVER act on an
unanswered question.)**

0. **★ PENDING SUPABASE SQL RUNS (he asked for REPEATED reminders until confirmed run;
   he explicitly deferred "not tonight" on 2026-07-22 — resume reminding at natural
   checkpoints).** Two idempotent files, paste-whole into the Supabase SQL editor (content
   from GitHub raw off main, never the shared checkout):
   a. `supabase/forum-reserved-additions.sql` — Dirt Jesus + 1,295 pro-rider names.
   b. `supabase/forum-reserved-brands-influencers.sql` — 414 rows (manufacturers,
      Seth Alvo/Berm Peak, Phil Kmetz/Skills With Phil, GMBN roster, Sploosh MTB…).
   Verify which ran (his word / Table Editor counts) before striking.
1. **THE RE-BRAINSTORM SESSION** — feature slate 8/8 since 2026-07-21; he asked to be
   reminded. Standing.
2. **Cloudflare redirect batch** (5 rows, his clicks — table in domain-portfolio memory).
3. **PRICE_BASIS_STRICT flip** — coordinator flips (six constants + their pinned tests)
   when every catalog burndown reads 0; not a Douglas question, but track it here so it
   isn't lost. Kit is already 0.
4. **99spokes aggregator policy** — maker-sourced spec copy for the JS-walled house
   brands (~110 OE cockpit rows). Yes/no/park.
5. **Propain rigid-post completeness gap** — three-remedy design packet (per-completebike
   override / frame-level flag / accept-and-document) in propain-conflicts-1's report;
   recurs on any rigid-base brand.
6. **Whisp tier naming** — worker used I9's own "SOLiX Classic" label; uniform "Hydra2"
   wording catalog-wide is his taste call.
7. **Reserved-names smalls**: "100%" as bare "100"? road ProTeams tier (~1,000 more
   names)? GCN presenter roster?
8. **Kit scope calls**: Cairn "Ride" junior model in the adult catalog? O'Neal Park FR
   SKU identity (maker sells knee-only; the cataloged combo is retailer-only).
9. **dp-specialized-command-post-349-160** — "suspected fictional combo" flag stands.
10. **Audit M7** — wheel-size-aware rule-18 clearance (Surly 27.5x3.0 case; gravel's
    maxTireByWheel is the model). Engine change → adversarial review when picked up.
10c. **Flat<->post adapter deferral (R18 vs MTB BRK-28/29)** — the two engines now disagree:
    MTB warns both ways off Shimano SM-MA + Wolf Tooth; road/gravel R18 keeps the
    [MECHANIC REVIEW] error. Close the divergence?
10d. **Wheel-PAIR price-split token** — pb-gravel-2: Zipp/Fulcrum/Reserve/DT GRC pair MSRPs
    split across front/rear rows have no honest token (bundle-split-estimate is scoped to
    shift-brake systems). Ratify a pair-split-estimate token, or leave those rows blank?
11. **Older tail** (carried): archive_session auto-approve hook (JSON in seat-16's
    transcript, he deferred) · Audit L4 verification round-robin (his nod = implement) ·
    "Sort: Random" wording nit · gallery six · reviews.sql levers + hardening-2.sql ·
    Supabase MFA/CAPTCHA check · Cloudflare Vitals read · Finder two · recall-badge
    scoping · fitter paywalls · the empty D:\mtb-worktrees shell folder (one manual
    right-click).

**GRAVEL MULLET: RULED 2026-07-22 (Douglas: "no gravel mullet option") — option D, deliberate
exclusion. Gravel stays drivetrain-frozen at road parity; no Eagle tokens, no xd freehub, no
pullRatio field. tools/TIER2-DRIVETRAIN-DESIGN.md stands as the record; revisit ONLY if
Douglas re-opens (e.g. at gravel complete-bikes). A mullet build stays inexpressible, which
is honest — no false verdict either way.**

**RESOLVED THIS SEAT (for the record, don't re-ask):** seatpost interface exception
(YES, 7th class, applied) · I9 hub tiers (SPLIT, applied) · vocab Tier-1 (ratified,
implementation in flight at wrap) · verified-means-price-too (mechanism + backfill waves
live) · the 6th priceBasis token (YES, third-party-listed, in flight at wrap) · RideKit
new categories (NO, the 12 stand) · EMTB full-equal status (YES) · Zipp 303 S (both
catalogs, applied) · EX44 = EC44 (FRM-54, applied).
