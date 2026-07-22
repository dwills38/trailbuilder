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

## Queue (dispatch when lanes free — refreshed by seat 18 after the 2026-07-22 finishing-wave harvest)

Burndowns after the wave: **MTB 1,895 · gravel 153 · road 3 · BMX 34 · EMTB 9 · kit 0 · striders 0.**
All seven wave chips harvested + merged (pb-gravel-2, pb-road-2, pb-mtb-a2/b2/c2,
gravel-is-mount, t2-drivetrain-design). Lessons now standing: NEVER default third-party-listed
onto a sram.com-sourced row (SRAM publishes prices — pb-road-2 catch); a maker price RANGE is
not a literal figure (no msrp-confirmed, no midpoint inventions — two rulings same day).

### 1. [Sonnet, medium] PB FINISHING — MTB slice B3 (frames/forks/shocks/wheels/tires, resume at CST)
Continue backfill/pb-mtb-b2's alphabetical grind from brand CST (then Cane Creek 77, RockShox
519, Fox 149, Maxxis 99...). Same protocol as pb-mtb-b2 (real re-fetches of stored source
URLs; the two range/SRAM lessons above; blank beats a wrong token). Branch backfill/pb-mtb-b3,
report pb-mtb-b3.md.

### 2. [Sonnet, low] Smalls fix-pack: flagged price leads
One branch, four bounded items: (a) ro-sram-centerline-200-6b — stored $45 is BELOW the
fetched $50-65 page range; re-fetch, decide honest price/basis per the range ruling (blank +
note if no per-size figure). (b) gfr-cinelli-kingzydeco2 — re-fetch cinelli-milano.com's own
price page to settle the mixed-domain provenance. (c) gch-sram-red-flattop's road sibling
ch-sram-red-flattop — variant-exact re-fetch (stored $130 above the $110-120 range). (d) W2
from the tier-2 packet: add cb-kona-honzo (base alloy $1,299) — RE-FETCH konaworld.com, never
trust the 2026-07-16 desc. Branch fix/price-leads-1, report price-leads-1.md.

### 3. [Sonnet, medium] Gravel QR rear wheels (unbreaks 4 frames)
gravel-is-mount finding B: 4 QR gravel frames (Nicasio+ 135x9-qr, Kona Rove AL + 2 more
135x10-qr) have ZERO compatible rear wheels — every gravel rearwheel is 12x142. Enter real
QR-hub gravel/all-road wheelsets (maker-page-sourced; the pair-row doctrine). Also check
front-wheel QR coverage while there. Branch catalog/gravel-qr-wheels, report gravel-qr-wheels.md.

### 4. [Opus, high] Road/gravel vocab-integrity hardening (t2 finding b)
ROAD_VOCAB/ROAD_SYSTEM_CHAIN drift makes R15 SILENTLY DORMANT for the live GRX-10 tier (and
rearAxle tokens 12x148/135x10-qr are undeclared). Extend test-road-golden's vocab pin to
system (+ rearAxle), add a lint asserting every system token has a ROAD_SYSTEM_CHAIN entry,
and add the missing entries. Also t2 finding (a): guard the sram-apex-mech-12 token (Flattop
vs Apex-Eagle chain conflation) — split or a hard warning note at the token per the
coordinator's pick at review. Adversarial review at merge. Branch engine/road-vocab-lint,
report road-vocab-lint.md.

### 5+. Breadth round 4 leads (unchanged — each catalog's last report names them)
Road alloy staples/Fulcrum retry · gravel Vulpine-S/Kanzo-Fast · BMX 451 Killer Buzz/completes ·
kit glove depth/youth · EMTB Stance E+/Pinion blocks · MTB Norco Sight bundle-gaps, cb breadth,
the ~50-brand cockpit tail.

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
