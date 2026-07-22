# Paste-ready worker blocks — refreshed by seat 17 at wrap-up (2026-07-22)

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
Check the fleet before dispatching — seat 17's final in-flight set (vocab-tier1, pb-token6,
pb-emtb-2) may still be running or freshly harvested; the STAND-DOWN clause protects
against double-paste either way.

**Clauses baked into every block** (verify before handing one over): fresh worktree with a
UNIQUE suffix off `origin/main` at `.claude/worktrees/<name>` INSIDE `D:\MTB Bike Builder`
(Hard rule #5 — the containment hook is LIVE) · **if your exact branch already exists with
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

## Queue (dispatch when lanes free — the priceBasis FINISHING WAVE is the priority)

### 1. [Sonnet, medium] PB FINISHING — gravel redo (208)
AFTER schema/pb-third-party-listed lands on main (check `git log origin/main` for it):
redo the rejected gravel backfill. data/gravel.js verified rows lacking priceBasis. The
rejected branch's 52 sound calls (43 msrp-confirmed incl. "PRICE CORRECTED..." notes, 5
regional-conversion, 4 bundle-split on the SRAM shift-brake rows — Ekar EXPLICITLY not
bundle-split, its own note says the exception doesn't apply) can be re-derived from the
same notes; the ~156 remainder now classify honestly (third-party-listed where the note
says maker-publishes-no-price; genuine discontinued rows keep discontinued-no-msrp; blank
where no class fits). Its 3 price-mismatch leads (Rudy $999-vs-$929-page, Force FD
$425-vs-$270, XPLR chain $60-vs-$50-55) are REAL — re-fetch and correct those three.
Report: pb-gravel-2.md.

### 2. [Sonnet, medium] PB FINISHING — road wave 2 (163)
After the token lands: the 163-row remainder per pb-road's report brand list (Shimano 69,
Campagnolo 23, Zipp 9, DT Swiss 8…). Mostly third-party-listed per that report's own
verified finding (Campagnolo pages carry no price at all); per-row note check, never
bulk-stamp. Report: pb-road-2.md.

### 3-5. [Sonnet, medium ×3] PB FINISHING — MTB remainder (~2,000 rows, three slices)
After the token lands. The remainder needs REAL RE-FETCHES of stored source URLs (the
desc-disclosed shortcut is exhausted — pb-mtb-b's report explains). Slice by category as
before (A: drivetrain/brakes remainder incl. the 150 productinfo-Shimano rows →
third-party-listed unless a fetch finds a price; B: frames/forks/shocks/wheels/tires ~1,875;
C: any slice-C leftovers + the KS/GT flagged 10). The pattern-trap lesson (keyword windows
match SIBLING parts' basis language — read the full desc) is in pb-mtb-b's report. Reports:
pb-mtb-a2/b2/c2.md.

### 6. [Opus, high] Tier-2 vocab: the gravel I.S. brake-mount engine port
Engine change, adversarial review: add the I.S. mount token to gravel AND port the MTB
engine's direction-aware PM-on-IS adapter warning into compat-road (the Nicasio+ is
otherwise unbuildable — the IS-mount trap). Include the rule tests. Douglas ratified the
direction (Tier-2 recommendation accepted by his "go with 1-3" + vocab rulings); the
coordinator adversarially reviews at merge.

### 7. [Fable/Opus, high] Tier-2 design checks: sram-eagle gravel mullet + shimano-11 MTB
A DESIGN DOC first (not implementation): how should gravel model mullet drivetrains
(Eagle mech + road AXS shifter — cross-ecosystem rules) and how should MTB model the
11-speed Shimano tier (Honzo's stock Deore M5100 has no system token)? Deliver options +
blast radii; Douglas/coordinator pick before any implementation chip.

### 8+. Breadth round 4 leads (each catalog's last report names them)
Road: alloy-staple frames + remaining Vittoria/Kenda/Michelin tire widths + Fulcrum
retry. Gravel: Vulpine-S/Terra widths, Kanzo Fast (needs D-steerer vocab), the
data-blocked flared-bar widths if makers ever publish per-width weights. BMX: 451-size
Killer Buzz, small-parts remainder, Kink/Sunday/Fit completes. Kit: glove depth, youth,
remaining women's-fit cells. EMTB: Stance E+ (blocked on conflicting maker copy), the
Pinion ALLMTN (blocked on unpublished travelRear). MTB: Norco Sight C2/C1 completebikes
(blocked on the $463/$1,271 bundle-invariant gaps — needs a price-confirmation pass on
the OE-only fills), cb breadth continuation (Ragley/Marin/Kona/SC trims), the ~50
1-9-row cockpit brand tail (mostly house-brand walls per tail-17's judgment).

---

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
11. **Older tail** (carried): archive_session auto-approve hook (JSON in seat-16's
    transcript, he deferred) · Audit L4 verification round-robin (his nod = implement) ·
    "Sort: Random" wording nit · gallery six · reviews.sql levers + hardening-2.sql ·
    Supabase MFA/CAPTCHA check · Cloudflare Vitals read · Finder two · recall-badge
    scoping · fitter paywalls · the empty D:\mtb-worktrees shell folder (one manual
    right-click).

**RESOLVED THIS SEAT (for the record, don't re-ask):** seatpost interface exception
(YES, 7th class, applied) · I9 hub tiers (SPLIT, applied) · vocab Tier-1 (ratified,
implementation in flight at wrap) · verified-means-price-too (mechanism + backfill waves
live) · the 6th priceBasis token (YES, third-party-listed, in flight at wrap) · RideKit
new categories (NO, the 12 stand) · EMTB full-equal status (YES) · Zipp 303 S (both
catalogs, applied) · EX44 = EC44 (FRM-54, applied).
