# Paste-ready worker blocks — SEAT 22 WRAP (2026-07-24): ALL chips merged, fleet clear.
# Seat 23: read THIS block first. Earlier seat sections kept below as history.

# ============================================================================================
# ★★ SEAT 22 WRAP — the current queue (seat 23: read THIS block first) ★★
# ============================================================================================

## ★ WHAT SEAT 22 SHIPPED (main 058a6a31 -> 32b5fa67, 303 commits, zero broken deploys)
Catalog 7,663 -> 7,902 rows · verified ~4,900 -> ~5,487 (69%) · tests 1,195 -> 1,349 ·
priceBasis backlog 1,383 -> 507 · worktrees 216 -> 134 (2.3 GB reclaimed).

- **CLOUDFLARE REDIRECTS ARE LIVE** — all 5 BuildMy* domains + www (10 hostnames) 301 to their
  builder pages, verified against the real internet. Root cause of the long stall: the zones had
  ZERO DNS records, so a redirect rule could never fire. Each zone needed a proxied A + www CNAME
  first. Tooling committed: `tools/cf-recon.js` (read-only) and `tools/cf-apply.js` (dry-run by
  default, `--apply` to write). Douglas's token lives in env `CLOUDFLARE_API_TOKEN`.
- **NAV + GARAGE SHIPPED ON THE FLAGSHIP** — one "🚲 Builders ▾" dropdown replaced the wordmark menu
  and two stray nav buttons; `garage.html` is a real page (builds full-width top, inventory
  bottom-left, service log bottom-right). Douglas approved it live. **Replication to the other 5 is
  DEFERRED to next week and gated behind a uniformity audit — see READY CHIPS.**
- **Token law machine-enforced** (`discontinued-no-msrp` => `status:'discontinued'` cross-rule in all
  5 validators, +12 tests); 20 live violations resolved honestly (17 genuinely archived, 3 were
  CURRENT products whose token was wrong).
- **7.2 MB dropped from 3 live pages** (`src/verdict-core.js` extraction) · **compat.js split**
  22,942 -> 2,104 lines with the catalog moved to `data/mtb.js` · **page-shell** single-sources the
  footer legal links + family switcher.
- **Compliance + a11y**: all 7 pages now carry legal links and the analytics beacon (5 had none);
  all 4 builders now announce verdict changes to screen readers (3 were silent).
- **Adversarial audit** found 4 defects, all fixed and re-probed: a false "won't fit" (truncated
  source quote), stale-FX kit prices, an unbuildable $660 wheel, and phantom prices on shared ids.
- **5 fabrications caught** across the session (Command Post lineage, Nukeproof Bosch motor, a
  Supacaz seatpost, a DT Swiss 12x150 axle note, a phantom dropper combo).
- Backup at `D:\BuildMyMTB-Backup` (35 MB of gitignored business docs/reports/PDFs); the containment
  hook was widened by exactly one path to allow it, then hardened against 3 false-positive classes.

## ★ RULES EARNED THIS SEAT (inherit them)
- **A STALE BRANCH MAKES GIT LIE.** The shared checkout sat 2,150 commits behind; its diff read as
  "24k uncommitted lines" that were actually gitignored reports. It nearly made me commit a STALE
  `verification-job.json` (3,597 entries vs 4,952 on main) — that would have deleted 1,355 parts'
  state. **It is now on `main`; keep it there.** Always diff against origin/main.
- **CHECK FOR UNCOMMITTED WORK BEFORE ARCHIVING.** Twice, a worker was cut off mid-run with real work
  uncommitted in its worktree and NO report. Archiving cleans the worktree — that work would have been
  destroyed. `git status --porcelain` in the worktree before every archive.
- **BOUND YOUR OWN REPAIRS.** I wrote a "fix all quotes" script that rewrote 790 lines when the defect
  was 10. Reverted. A worker later fixed it surgically because the chip said *"do not write a
  file-wide fix-all script — that is the known wrong approach."* For a known-small defect, say so.
- **VERIFY YOUR OWN GREPS.** Several false positives this seat (prose matched instead of fields;
  comments matched instead of script tags; quote-style miscounts). Check the FIELD, not the file text.
- **BATCH THE ARCHIVES** (Douglas): each throws a confirmation dialog; archiving one-at-a-time
  mid-wave stalls the harvest. Sweep them together at a natural pause.
- **CROSS-CATEGORY GAPS ARE THE PRODUCTIVE BREADTH SEAM** — two independent workers found it
  unprompted. Brands already in a catalog, already trusted, absent from categories they demonstrably
  sell into. Rows come back VERIFIED, not sample. New-brand breadth is largely exhausted.
- **VERIFICATION IS HITTING STRUCTURAL WALLS** except in kit. EMTB stood down at 90% (all 21
  remaining rows are dead SKUs with no live page). BMX yields ~2/round now. Kit still yields 20+.

## ★ DOUGLAS'S OPEN-QUESTION QUEUE (consolidated at wrap, succession rule 5.
## NEVER act on an unanswered question. Full detail + options: `_PDFs/OPEN-QUESTIONS.md`/.pdf)
1. **Canyon/DTC live-price drift** — he asked for more detail, got it, hasn't ruled. Verified rows
   whose maker price has since changed. (a) correct on sight (b) "price-at-verification" convention
   (c) only on confirmed permanent change (d) park. **This is actively blocking workers — one flagged
   a Fezzari drift rather than rewriting it, correctly.**
2. **Fox 38 Performance Elite 29/180** — confirmed STILL WIDELY SOLD at retail, but absent from Fox's
   current lineup. Does `status` describe the MAKER or the MARKET? EMTB's dead-SKU handling
   (discontinued + supersededBy + stays visible in the archive) is a working precedent for (a).
3. **Gravel steerer vocab** — the bike-mechanic answered and CORRECTED our premise (the Aspéro-5 is
   D-shaped, already handled). Real finding: THREE distinct tapered classes collapse into one
   `tapered` token, incl. 1-1/8→1-1/4 which we didn't know existed. Both failure directions are live.
   Open part is MIGRATION: (a) treat bare `tapered` as unknown/no-verdict and promote per row as
   re-sourced (mechanic's rec) (b) bulk-rename (c) defer.
4. **Kit `id-brand-token` warnings — 26.** Cosmetic; accept permanently or silence the lint?
5. **Crossed gravel BB id tokens** — shell data is CORRECT, only id suffixes mislead. (a) one-line
   comment (recommended) (b) build gravel ALIASES (c) leave.
6. **svl-evidence PNGs** (17, ~2.3 MB) — commit to git permanently, leave on disk, or move out?
7. **Wordmark vs Builders button** — RESOLVED BY IMPLEMENTATION (wordmark is now a plain link home).
   Drop from the queue unless he objects.
8. **Continuing education for the experts** — his "eventually" idea; suggested a scheduled study pass
   per specialist a week before each audit. Not scheduled.
9. **Re-brainstorm session** — feature slate 8/8 done; he asked to be reminded. Standing.
10. **The proper home page** — standing since 2026-07-16; do NOT act until he asks.
11. **Build visualization** — ULTIMATE-PLAN item; design round first; not started.
12. **Smalls tail:** 6 dupes in `.claude/legacy-strays/` need HIS manual delete (guard blocks us) ·
    stray `kit-jacket` port-8417 entry in `.claude/launch.json` · Bright Data top-up · Alma H30
    headset ambiguity · Whisp tier naming · "Sort: Random" wording · fr-trek-slash orphan dedupe ·
    recall-badge scoping · fitter paywalls · TWO "Bug report triage" sessions now exist (the older is
    probably dead clutter; never archive the live vessel).

## ★ RULED AT SEAT 22 (do NOT re-ask)
- **`fxRate` = option (a)**: add the field, use `lastChecked` as the date, land it OPTIONAL, backfill
  the derivable 66%, THEN make it validator-required. **NOT YET IMPLEMENTED — needs a chip.**
- **WTB perpetual-sale storefronts** = accept the maker's storefront figure as MSRP.
- **MTB vocab gaps** = ADD the vocab (magnetic pedal style + the tire casing/compound names).
- **Gearbox-frame schema gap** = WIDEN the schema.
- **Re-run the 12 missing fan-out brands** = yes, but NEXT WEEK (he was low on usage).
- **Foreign-price conversion** = already what `regional-conversion` does; closed as answered by fxRate.
- **Garage on every builder** = yes, but AFTER a uniformity audit (his call, 2026-07-24).
- **priceBasis lane RETIRED** from the rotation (2026-07-23) — capacity went to verification.
- Crossover bikes live in BOTH road and gravel catalogs, own id each.
- The e-bike special-case rule was REMOVED; Hard rule 1 is now "one catalog per surface".

## ★ READY CHIPS / LANES (all files FREE at wrap; re-verify the slug is unused + 0-ahead first)
1. **★ THE UNIFORMITY AUDIT (do this BEFORE replicating the garage)** — Douglas 2026-07-24: audit
   BuildMyMTB as the FORM reference and catalogue every inconsistency across all 6 builders before
   any copying. He cited EMTB missing a saved-builds concept and "inconsistencies in BuildMyBMX" as
   examples and expects there are more. `[Opus, high]` — read-only audit, findings doc, no edits.
2. **Garage/nav replication to the other 5** — HOLD until #1 lands and he's seen it. The
   `nav-garage-page.md` report has a "what replication involves" section.
3. **`fxRate` implementation** (he ruled (a); not built).
4. **MTB vocab additions + gearbox schema widening** (both ruled; not built).
5. **Cross-category breadth sweeps** — the productive seam. Kit and BMX both proved it. Make it the
   EXPLICIT target: go brand by brand, list every category that brand genuinely sells into but isn't
   represented in, fill it. Finite, well-defined, comes back verified.
6. Verification continues to pay in **kit** only; other catalogs are near their structural ceiling.

# ============================================================================================
# ↓↓ EARLIER SEAT SECTIONS BELOW — kept as history ↓↓
# ============================================================================================

# ============================================================================================
# ↓↓ EARLIER SEAT SECTIONS BELOW — kept as history ↓↓
# ============================================================================================


# ============================================================================================
# ★★ SEAT 21 WRAP — the current queue (seat 22: read THIS block first) ★★
# ============================================================================================

## ★ SEAT-22 FIRST TASK (Douglas's explicit order 2026-07-23): OFFER this chip to Douglas BEFORE
## other work. Offer it — he dispatches (Hard rule #4). READ-ONLY review, changes nothing.

### PROJECT-EFFICIENCY-REVIEW chip [Opus, high effort · READ-ONLY]
```
git fetch origin; git worktree add .claude/worktrees/efficiency-review -b review/project-efficiency origin/main
CHECK FIRST: IF review/project-efficiency exists with commits, STAND DOWN and report; else proceed.

GOAL (Douglas 2026-07-23): review the EFFICIENCY of the whole BuildMyMTB project and produce a
prioritized suggestions doc FOR HIS REVIEW. READ-ONLY — analyze + recommend, change NOTHING (no
catalog/code/doc edits, no git mutations beyond creating the worktree). Advice for Douglas, not a refactor.

REVIEW THESE DIMENSIONS (be concrete — cite files/line-counts/numbers, don't hand-wave):
 1. DATA/CATALOG — the 7 catalogs (~7,650 rows): data-model redundancy, the ~1,800 unverified +
    ~1,400 no-priceBasis tails (which are structural walls vs. genuinely workable), verification ROI,
    reused-slug/ghost-report friction, brand-casing/vocab hygiene.
 2. ENGINE/CODE — src/compat.js (~22k lines: is the data+engine split still right?), duplication
    across the compat/compat-bmx/schema-{bmx,road,gravel,emtb,strider} family, the 1,195-test suite
    shape, dead code / redundant helpers / vendored-lib drift.
 3. WORKFLOW/PROCESS — the coordinator+fleet model: chip dispatch → harvest → audit → merge cadence,
    the token-law audit overhead, worktree hygiene (170+ stale worktrees linger — see the
    worktree-recovery-audit memory), the report-file-vs-branch ghost problem, coordinator effort on
    friction vs. real work.
 4. TOOLING — hooks (containment + no-downloads), verify-job runner, the 5 scheduled tasks, the fetch
    doctrine (WebFetch→Exa→browser pane) hit-rate, Bright Data/Exa spend.

DELIVERABLE: write D:\MTB Bike Builder\.claude\worker-reports\project-efficiency-review.md — a
prioritized findings + suggestions doc, each tagged impact(H/M/L) × effort(S/M/L), top 3-5 called
out. Then RETURN a concise ranked shortlist. NEVER push, NEVER prompt Douglas, change nothing.
FETCH ETHICS + NO-DOWNLOADS apply.
```

## ★ READY LANES (all catalog files FREE at wrap — re-verify the slug is unused + 0-ahead + the
## premise still holds against origin/main before dispatch; ghost slugs reuse names, see rules):
- **BMX DATA now UNBLOCKED** by the seat-21 race/threadless-headset vocab (`c7a267d0`): add BMX
  **race** brands (Meybo, Answer BMX, Box, Position One, Yess) + **budget-freestyle** (Diamondback,
  Elite, Mongoose/Redline-tier) — the parts that stood down on the old vocab. This is the natural
  next BMX chip. (`data/bmx.js`)
- **MTB** — the verification tail + niche-brand continuation. mtb-breadth-2 left tire casing/compound
  + magnetic-pedal rows UNVERIFIED pending the vocab call (open-Q 7 below). (`src/compat.js`)
- **road / gravel / emtb / kit** — continued breadth/depth per the brand-gap audit
  (`.claude/worker-reports/brand-gap-audit.md`): gravel still has ~30 one-model marques for depth;
  kit has more apparel/shoe/eyewear brands; road's mainstream Bucket A is largely done (boutique tail
  is quote-only/hard). EMTB is FIRST-CLASS — treat equally.

## ★ DOUGLAS'S OPEN-QUESTION QUEUE (refreshed at seat-21 wrap, succession rule 5. NEVER act on an
## unanswered question. The seat-20 queue below has the fuller wording; this is the current set.)
1. **Re-brainstorm session** — feature slate 8/8 done; he asked to be reminded. Standing.
2. **Cloudflare redirects — PARKED.** All 5 BuildMy* zones have ZERO DNS records (chip banked).
3. **WTB perpetual-"Sale price" storefronts** — accept the maker's stable storefront figure as
   msrp-confirmed when no separate MSRP exists / keep strict / park. ~10 rows.
4. **The no-USD-MSRP token family** — current products whose makers publish no USD price. Ratify a
   token (e.g. `no-us-msrp`), or those rows stay permanently blank? Structural floor under road/gravel.
5. **Canyon live-price drift** — verified rows whose canyon.com prices/spec-levels changed. Re-verify
   as corrections, or adopt a "price-at-verification" convention? (model-YEAR refresh already = new row.)
6. **Fox 38 Performance Elite 29/180** — no such SKU on ridefox.com anymore. Discontinued writeup or retire?
7. **★ NEW — MTB vocab gaps (mtb-breadth-2):** no `magnetic` pedal style for Magped-class magnet+cleat
   pedals (flat/clip/hybrid all fit poorly); and tire casing/compound names (Tioga Magnum120/FlexGuard,
   WolfPack ToGuard, Mitas Supra/Textra/EDC, American Classic Stage-XC-Armor/Rubberforce-G) not in vocab.
   Those rows sit unverified. Add the vocab (with tests), or leave them uncategorized on those axes?
8. **Gearbox-frame schema gap** — checkBuild doesn't model gearbox/Pinion drivetrains (Zerode,
   Guerrilla Gravity, boutique frames flagged). Widen the schema, or leave a documented gap?
9. **Gravel steerer-vocab widening** — a 1-¼-to-1-½ tapered class (FSA IS2 on the Cervélo Aspéro-5)
   is wider than the generic `tapered` gravel token. Add a distinct token (with tests), or defer?
10. **Kit `id-brand-token` warnings — now 26** (grew this seat with fuse→fuseprotection, zeal→zealoptics).
    Append-only ids can't be renamed; validate is "0 problems, 26 warnings" (cosmetic). Accept
    permanently, or address (retire+re-add ids / relax the lint)?
11. **Smalls tail (carry):** WTB sale rows · 6 confirmed-dup files in `.claude/legacy-strays/` (guard
    blocks the coordinator — needs Douglas's manual delete) · a stray `kit-jacket` port-8417 entry
    left in the main checkout's `.claude/launch.json` (dev-only, tidy) · Bright Data balance top-up ·
    Alma H30 headset ambiguity · Whisp tier naming · "Sort: Random" wording · fr-trek-slash orphan
    dedupe · recall-badge scoping · fitter paywalls.

## ★ RULED / DONE at SEAT 21 (2026-07-23 — do NOT re-ask):
- **Jacket kit category = DONE** (added, live `d025a26a`; resolves the kit-breadth-11 schema-gap flag).
- **LTWOO/Sensah MTB budget drivetrain = SKIP** (not the target rider; would need a new `system` vocab).
- **BMX race = IN** (vocab + threadless-headset + bmx-axle rule landed `c7a267d0`; race + budget-freestyle
  DATA now addable — see ready lanes).
- **Brand-casing normalization = DONE** (compat.js 7 groups: FOX→Fox, CUBE→Cube, HUNT→Hunt, TruVativ→
  Truvativ, fizik→Fizik, ACROS→Acros, Alexrims→Alex Rims; + road/gravel Enve→ENVE, HUNT→Hunt — all 3
  files now consistent on ENVE + Hunt).
- **EMTB = FIRST-CLASS** ("stop minimizing e-exposure, i want the EMTB site just as complete as the
  others"); the equality sweep corrected CLAUDE.md rule 1+3, NEXT-STEPS, and the mtb-flagship-priority /
  emtb-buildout memories. Only structural containment remains special.
- **Archive auto-approve hook = UNFIXABLE** — archives still prompt after an app restart; it's a
  hard-coded tool dialog no permission hook can suppress. Permanent one-click residual; stop testing.
- **NO-DOWNLOADS enforcement = LIVE** (guard-worktree-path.js Routes 4/5, 25-case self-test).

# ============================================================================================
# ↓↓ SEAT-20 section below — kept as history ↓↓
# ============================================================================================

# (original header) updated by seat 20 at WRAP (2026-07-23 evening): ALL chips merged,
# nothing in flight; ready lanes + 11-item open-question queue consolidated for seat 21

Douglas dispatches these himself so he controls model + effort (CLAUDE.md Hard rule #4).
Fleet was EMPTY at seat-19 wrap — nothing in flight, no double-paste risk, but every chip
still carries the stand-down guard.

**Clauses baked into every block** (verify before handing one over): fresh worktree with a
UNIQUE suffix off `origin/main` at `.claude/worktrees/<name>` INSIDE `D:\MTB Bike Builder`
(Hard rule #5 — containment hook LIVE + HARDENED) · every file created stays INSIDE the
project or the harness Temp\claude scratchpad · **NO BROWSER DOWNLOADS, EVER** · **IN-APP
Browser pane ONLY — never claude-in-chrome (Douglas's personal Chrome)** · **stand-down
guard phrased as "CHECK FIRST: IF branch X already exists with commits, stand down and
report; otherwise proceed"** (three workers misread the terse form) · NEVER prompt Douglas ·
NEVER push — coordinator review is the gate · COMMIT PER BRAND/GROUP/BATCH ·
`tools/verification-job.json` is coordinator-only · gates = `node validate.js` (7 OK) +
`npm test` + `npx tsc --noEmit` (+ verdict harness on any compat.js/engine-read change) ·
no e-bikes outside data/emtb.js · a blank beats an invented value · **FINAL ACT: write the
full report to `D:\MTB Bike Builder\.claude\worker-reports\<branch-slug>.md` (exact absolute
path, MAIN checkout, NOT the worktree) BEFORE any send_message.**

**THE TOKEN LAW (12 catches in seat 19 — every verification-adjacent chip carries this
verbatim):** msrp-confirmed = the literal figure for THIS SKU in YOUR OWN fetch (never a
range/midpoint/sibling-inference/conversion) · third-party-listed = a real NAMED listing,
never a retained sample · regional-conversion = the MAKER's own non-USD figure, disclosed
rate+date · discontinued-no-msrp = genuinely discontinued + status:'discontinued' same edit ·
sourceType:'measured' = a scale reading, never a retailer spec line · a retained sample gets
NO token.

**Doctrine** (tools/VERIFY-PROTOCOL.md): FETCH ETHICS (WebFetch → Exa → browser pane → stop;
a CAPTCHA is a documented wall; walls stale by default — one honest retry; JS-rendered ≠
walled) · PHANTOM-NUMBER (every committed figure literally present in the worker's own
fetched text; watch third-party sites echoing a maker's single figure against the wrong SKU
— the Chromag catch) · never infer a max/limit/size from a stock part (the UNNO shock catch)
· error-tier relaxations go to the coordinator with the maker quote.

---

## Chip queue — ALL SEAT-20 CHIPS MERGED (2026-07-23 wrap; NOTHING in flight)

**Seat 21: every chip listed below — the 6 originals, the 8 ruling-derived A–H, the breadth
waves, and the 2 re-dispatches — is MERGED to main `b198b91c` with its worker archived. The
detailed listings are the HISTORICAL RECORD, not a pending queue.** Two evolved from their
original wording: **B landed as REPLACE-WITH-A-REAL-Command-Post-IRcc** (`93f75a70`, Douglas's
(1) ruling — 3 fabricated ids aliased to the new real row), NOT a retire; and **the R&M
Superdelite EMTB row was EXCLUDED** (touring bike, ruled — note lives in data/emtb.js's header).

**READY LANES FOR FRESH WORK (all FREE at wrap — but RE-VERIFY the branch slug is unused AND
0-ahead before dispatch; ghost branches from prior waves reuse slugs, see the seat-21 rules):**
`src/compat.js` (MTB completebike breadth OR the ~500-row verification tail) · `data/road.js`
(components beyond wheels/frames) · `data/gravel.js` (frames/components; the no-gravel-mullet
freeze still governs drivetrain) · `data/emtb.js` (round-4 deepening — many brands still 1-3
rows) · `data/bmx.js` · `src/kit.js`. Paste-blocks in seat-20's transcript are the template.
**Deliver READY-ONLY** (memory `chip-delivery-ready-only`).

### [HISTORICAL — ALL MERGED] Original six, harvested + adversarially reviewed + gated + pushed:
1. e13 LG1 DH integrated-driver semantics → outcome (c), desc-only, `fc4fcb28`. **FLAGGED a
   real out-of-scope false-fit → see follow-up G below.**
2. wheel-prices-2 → 40 already-qualifying rows tagged `pair-split-estimate`; Zipp/Reserve
   correctly got NO invented split; zero `msrp-confirmed` overreach, `5b57a179`.
3. UNNO Horn Race cassette+wheel driver pair (XS-1275/XD → XS-1270/HG, the documented
   HG-driver exception) `0258f022`.
4. RAAW Madonna V3.2 Fox Podium build ($8,780, not the brief's stale $8,798) + XTR M9250 Di2
   + Newmen 20x110/MS wheels (worker caught a rule-2 front-axle mismatch via checkBuild),
   `3a405216`.
5. Microshift Sword gravel `microshift-sword-10` token + 2x10 drivetrain (gate CLEARED:
   self-contained single-brand mechanical gravel group, not a mullet), `c6e38a13`.
6. Cross-BB `'30mm'` convention → don't split (honest bore class per Praxis docs); docs+tests
   only, +7 tests, `0e89ed4e`. Corrected the chip's "rule 11" mislabel (rule 11 = steerer).

### NEW follow-up + ruling-derived chips (full paste blocks in seat-20's transcript
2026-07-23; premises below are enough to reconstruct — CONTENT-CHECK against origin/main first):
- **A. [Opus, high] M7 — wheel-size-aware rule-18** (Douglas GO): store `maxTireByWheel` per
  wheel size on frames (gravel engine is the model), kill the Surly 29x2.5-vs-27.5x3.0 false
  warning. Engine change to src/compat.js + schema + types + tests; verdict harness; adversarial.
- **B. [Sonnet, low] Retire dp-specialized-command-post-349-160** (Douglas RETIRE): suspected-
  fictional 34.9/160 combo. Remove the row, retire the id into ALIASES (append-only), grep for
  any build/preset reference first (none expected). Gates.
- **C. [Sonnet, medium] Canyon Sender CLLCTV MY27** (Douglas ruled B): keep the 2025 row, ADD a
  2027 row (5 spec changes, same $7,799). GENERAL PRECEDENT now — model-year refresh = new row,
  keep old, never overwrite (Straggler pattern).
- **D. [Sonnet, medium] Tire model-name vocab 4C** (Douglas APPROVED): add Teravail "Light &
  Supple", Continental "PureGrip", WTB "Breakout", + the Specialized tokens gravel lacks to the
  road/gravel tire casing/compound vocab, then let the honest rows through. Touches schema-road/
  gravel + data rows (shares gravel files with none currently in flight).
- **E. [Sonnet, low] Verified-badge-on-completebike = (a)** (Douglas ruled A): confirm the badge
  logic treats a completebike's OWN verified:true as the badge (fills show own status); if code
  already does this, document only; if it requires all-fills-verified, fix + test.
- **F. [Sonnet, low] Deprioritize the ~50 spec-page-only rows** (Douglas OK'd): mark the
  Shimano/SRAM/Zipp/Campagnolo spec-page-sourced road/gravel rows "deprioritized — needs a
  price-bearing source" so priceBasis waves stop re-fetching them.
- **G. [Sonnet, medium] Commencal Supreme DH V5 Öhlins false-fit** (found by the e13 worker):
  cb pairs ca-ethirteen-lg1-dh-924 (integrated e13 driver) with rw-dtswiss-fr-1500-275-157
  (generic DT Swiss), both freehub:'XD' → reads GREEN but e13's page says "not compatible with
  other hub models." Fix: re-point the cassette at a generic 7-speed DH XD cassette matching
  Commencal's "E13 DH cassette 9-24t" wording, OR re-home onto an e13 LG1r-integrated wheel pair.
- **H. [Sonnet, low] wheel-prices-3** (continuation): same protocol on the boutique/direct-sale
  brands most likely to publish per-wheel MSRP — DT Swiss, Race Face, Roval, Hope, Nukeproof,
  Ibis, Spank. ~46 brands / ~625 rows still unreached (logged in wheel-prices-2.md, not skipped).

### PRODUCT-BREADTH chips (proposed seat 20; each in a PHYSICALLY SEPARATE catalog file →
zero mutual conflict + zero conflict with the compat.js chips above; even-weight directive):
- **I. [Sonnet, med] Road frames marque breadth** (data/road.js) — ABSENT: Argon18, Basso, Cube,
  Merida, Orbea, Ribble, Ridley, Van Rysel; THIN: Pinarello/Colnago/Bianchi/Factor/Look/Wilier.
- **J. [Sonnet, med] EMTB brand breadth** (data/emtb.js) — ABSENT: Bulls, Fantic, GasGas, Gazelle,
  Pole, Riese&Müller, Simplon, Thömus, Bird; THIN: Focus/Amflow/Forestal/Husqvarna/Moustache.
- **K. [Sonnet, med] Kit apparel breadth** (src/kit.js) — ABSENT: Flylow, Muc-Off; THIN: Chromag/
  Club Ride/Loose Riders/Handup/DHaRCO/Fasthouse. FLAG the "Pearl Izumi"/"Pearl iZUMi" casing split.
- **L. [Sonnet, med] BMX brand depth** (data/bmx.js) — THIN: Subrosa/Verde/Federal/BSD; survey +
  add if missing: Stolen/Premium/Volume/United/Mankind/Radio.

### Held walls (dispatch only when something changes): Stanton GenV builds (no press
build-spec exists yet; try Stanton's configurator "recommended build" route) · Bird
(configurator-only, no fixed spec) · Canyon Strive CFR (member-gate) · Commencal frame-only
prices (Vue configurator) · Giant Stance E+ (self-conflicting copy) · Propain site (403) ·
bhbikesusa (network wall) · Chris King prices (storefront renders none — PERMANENT, stop
re-fetching) · Formula/Giant/Cube frame-only prices (none published) · the ~50
spec-page-only component rows (pending Douglas ruling #9) · WTB perpetual-Sale-price rows
(pending ruling #8) · road's 12-row + gravel's ~130-row pb tails (structural, pending the
no-USD-MSRP ruling family).

---

## ★ DOUGLAS'S FULL OPEN-QUESTION QUEUE (re-consolidated 2026-07-23 at seat-19 wrap per
succession rule 5. PDF mirror: `_PDFs/OPEN-QUESTIONS.pdf` (regenerated to open-items-only
per his 2026-07-22 word — answered items are REMOVED at regen). NEVER act on an unanswered
question.)

1. **Re-brainstorm session** — feature slate 8/8 done; he asked to be reminded. Standing.
2. **Cloudflare redirects — PARKED on his word.** All 5 BuildMy* zones have ZERO DNS
   records. Revisit = (a) create scoped API token (Zone/DNS/Edit + Zone/Dynamic
   Redirect/Edit, 5 zones), (b) `setx CLOUDFLARE_API_TOKEN "..."`, (c) re-paste the API
   chip (findings banked in cloudflare-redirects*.md).
3. **WTB perpetual-"Sale price" storefronts** — accept a maker's own stable storefront
   figure as msrp-confirmed when no separate MSRP exists / keep strict (rows stay blank) /
   park. ~10 rows now.
4. **The no-USD-MSRP token family** (third face, confirmed by the rejected
   pb-gravel-4 branch): current products whose makers publish no USD price
   (foreign-currency-only or spec-only). Ratify a token (e.g. `no-us-msrp`), or those rows
   stay permanently blank? This is the structural floor under the road/gravel burndowns.
5. **Canyon live-price drift** — verified rows whose canyon.com URLs now show different
   prices/spec-levels (Spectral $1,999→$3,099 etc.). Re-verify as corrections, or is a
   "price-at-verification" convention needed? (Note: the MY27-Sender precedent — new row,
   keep old — covers a model-YEAR refresh; this is a same-row price DRIFT, still open.)
6. **Fox 38 Performance Elite 29/180** — no such SKU exists on ridefox.com anymore (170mm
   only). Discontinued writeup or retire?
7. **Archive auto-approve hook — UNRESOLVED.** The `Bash(node/git add/git commit *)` permission
   one-liners are DONE (Douglas added them 2026-07-23; worker prompts gone). He also pasted a
   PreToolUse hook returning `permissionDecision:"allow"` for `mcp__ccd_session_mgmt__archive_session`
   (valid JSON, saved) — but archives STILL prompted him. Open: does it just need a `/hooks`
   reload/restart to fire, or is the archive confirmation a hard-coded tool dialog no setting can
   suppress (its own description says it "ALWAYS prompts")? Next archive after a `/hooks` open is
   the test.
8. **Gearbox-frame schema gap.** `checkBuild` doesn't model gearbox/Pinion drivetrains, so
   Zerode (Pinion-only lineup) and Guerrilla Gravity frames can't be added honestly (the
   boutique-frames worker flagged both, didn't force). Widen the schema for gearbox drivetrains,
   or leave as a documented gap?
9. **Gravel steerer-vocab widening.** A 1-¼-to-1-½ tapered class (FSA IS2 headset on the Cervélo
   Aspéro-5) is WIDER than the generic `tapered` gravel token; forcing `tapered` would be a false
   interface claim. Add a distinct steerer token (with tests), or keep it deferred? (gravel worker
   flagged; the Aspéro-5 row was NOT added pending this.)
10. **Kit's 20 advisory `id-brand-token` warnings.** The 2026-07-23 casing normalization
    (Dharco→DHaRCO, Gore Wear→GOREWEAR, etc.) left ~20 ids whose brand-token no longer matches the
    corrected full brand name — append-only ids can't be renamed. validate shows "0 problems, 20
    warnings" (cosmetic). Accept permanently, or address (retire+re-add the ids / relax the lint)?
11. **Smalls tail:** Whisp tier naming (SOLiX Classic vs uniform Hydra2 — taste) · one manual
    delete: 6 confirmed-duplicate files in `.claude/legacy-strays/` (guard blocks the
    coordinator) · Bright Data balance $1.39 (optional top-up) · archive_session auto-approve
    hook (deferred) · Audit L4 round-robin · "Sort: Random" wording · fr-trek-slash orphan
    dedupe · gallery six · reviews.sql levers + hardening-2.sql · Supabase MFA/CAPTCHA check ·
    Cloudflare Vitals read (needs the Observability connector or his word) · Finder two ·
    recall-badge scoping · fitter paywalls · Alma H30 headset ambiguity (maker wording vs
    third-party conflict — row honestly unverified until resolved).

**RULED THIS SEAT (do NOT re-ask):** Supabase reserved-names SQL = DONE (1,734 rows live via
the connector after his write grant) · vocab A+B yes · D = two Straggler rows, old one
labeled Classic · every bike requires some post + DH/noStockDropper exemptions RETIRED ·
rigid post completes ANY bike · pair-split-estimate ratified (wheel-scoped) · 99spokes =
unverified sample rows only · GCN roster reserved · ProTeams stay unreserved (delegated) ·
100% + 100Percent reserved, never bare "100" · Cairn junior OUT · O'Neal knee-only · EVEN
WEIGHT across all categories ("take out any bias i may have presented") · Cloudflare parked ·
weekly repo auditor approved (highest effort, nothing irreversible).

**RULED SEAT 20 (2026-07-23) — do NOT re-ask (each is now a chip A–F above):** vocab 4C =
YES (Teravail "Light & Supple" / Continental "PureGrip" / WTB "Breakout" / Specialized gravel
tokens) · verified badge on a COMPLETE BIKE = (a) the bike's own sheet+price verified, each
fill shows its own status · dp-specialized-command-post-349-160 = **REPLACE with a real Command
Post IRcc** (Douglas's follow-up (1) ruling — the whole 3-id lineage was fabricated with no real
sibling to retire into, so a real 30.9×125 IRcc row was entered and all 3 fabricated ids aliased
to it; landed `93f75a70`) · M7
wheel-size-aware rule-18 = GO · MY27 Canyon Sender CLLCTV = (b) keep 2025 + ADD a 2027 row —
**and the GENERAL PRECEDENT for all such cases: a model-YEAR refresh (same or changed spec) =
new row, keep the old, NEVER overwrite (Straggler pattern)** · the ~50 spec-page-only road/
gravel rows = mark "deprioritized — needs a price-bearing source" so priceBasis waves skip them ·
**Riese & Müller Superdelite "mountain" = NOT an e-MTB (touring bike), permanently EXCLUDED from
data/emtb.js — never re-add on a breadth pass; the EC-conformity-PDF "E-MTB" label is overruled
(Douglas 2026-07-23). Exclusion note also lives in data/emtb.js's header.**
