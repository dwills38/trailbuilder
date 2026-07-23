# Paste-ready worker blocks — updated by seat 20 (2026-07-23: original 6 merged; 6 rulings +
# 8 new chips A–L queued)

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

## Chip queue (dispatch when lanes free)

### ✅ MERGED THIS SEAT (20, 2026-07-23) — the original six, all harvested + adversarially
reviewed + gated + pushed as separate commits:
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
7. **Permission one-liners for his settings.json allow list** (classifier blocks the
   coordinator adding them): `"Bash(node *)"`, `"Bash(git add *)"`, `"Bash(git commit *)"` —
   kills the recurring worker permission prompts.
8. **Smalls tail:** Whisp tier naming (SOLiX Classic vs uniform Hydra2 — taste) · one manual
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
fill shows its own status · dp-specialized-command-post-349-160 = RETIRE (via ALIASES) · M7
wheel-size-aware rule-18 = GO · MY27 Canyon Sender CLLCTV = (b) keep 2025 + ADD a 2027 row —
**and the GENERAL PRECEDENT for all such cases: a model-YEAR refresh (same or changed spec) =
new row, keep the old, NEVER overwrite (Straggler pattern)** · the ~50 spec-page-only road/
gravel rows = mark "deprioritized — needs a price-bearing source" so priceBasis waves skip them.
