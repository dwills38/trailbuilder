# Paste-ready worker blocks — refreshed by seat 19 at wrap-up (2026-07-23)

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

## Chip queue (dispatch when lanes free — refreshed at seat-19 wrap)

### 1. [Sonnet, medium] e13 LG1 DH cassette semantics (chip fully written in seat-19's
transcript; premise: ca-ethirteen-lg1-dh-924 is a cassette row for what e13's own page calls
an integrated cassette/driver unit — rule 6b's wheel-side product class. Investigate:
duplicate-of-wheel (retire via ALIASES) vs real separate driver SKU (fix freehub semantics)
vs schema question (write it up, change nothing). Harness if verdicts move.)

### 2. [Sonnet, low] wheel-prices-2 (chip fully written in seat-19's transcript; the Enve
precedent: sweep wheel rows for brands publishing INDIVIDUAL front/rear USD MSRPs; real
per-wheel figure = msrp-confirmed, supersedes pair-split-estimate; pair-only = document.)

### 3. [Sonnet, low] UNNO cassette re-verify — cb-unno-1 flagged the Horn Race build's
cassette as XS-1270 (HG) on unno.com vs the cataloged XS-1275 (XD); needs the build's wheel
DRIVER re-verified before either row moves (a cassette swap implies a freehub swap — rule 6
territory). Fetch the Horn Race build page + the wheel's spec; correct the pair coherently
or flag.

### 4. [Sonnet, medium] RAAW Podium build — the $8,798 V3.2 build needs two uncataloged
product lines researched first: the Fox 38 Podium (inverted) fork and Shimano XTR Di2
wireless (drivetrain + brakes). Enter the part rows properly (new-line research, maker
pages), THEN the completebike wrapper. Currently out-of-stock/notify-me on raawmtb.com —
enter only if RAAW still publishes the full build sheet.

### 5. [Opus, high] Microshift Sword gravel — whole-brand lift: new `system` token +
shifter/RD/chain/cassette rows entered TOGETHER (a token never lands without backing rows;
the gravel drivetrain freeze is road-parity per Douglas's no-gravel-mullet ruling — verify
Sword 1x fits inside that ruling before landing; if ambiguous, packet to Douglas first).

### 6. [Opus, high] Cross-BB crank spindle convention — Praxis M30 / White Industries 30mm
class has no honest crankBb token. Design the convention (dedicated tokens per system vs a
documented field), audit rule 7/11 interactions, land with tests + backing rows. Adversarial
review at merge.

### 7. Held walls (dispatch only when something changes): Stanton GenV builds (no press
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
3. **Vocab packet 4C — tire model-name words** (Teravail "Light & Supple", Continental
   "PureGrip", WTB "Breakout", Specialized tokens gravel lacks). The last unruled letter;
   same principle as A/B/D which he approved.
4. **Verified-badge meaning on COMPLETE BIKES** — (a) bike's own sheet verified (fills show
   their own status) vs (b) badge only when bike + every fill verified. Coordinator leans (a).
5. **dp-specialized-command-post-349-160** — suspected-fictional combo; coordinator
   recommends RETIRE. Awaiting his word.
6. **M7 — wheel-size-aware rule-18 clearance** (the Surly 27.5x3.0 false warning;
   gravel's maxTireByWheel is the model). "Go on M7" starts it; adversarial review.
7. **MY27 Canyon Sender CLLCTV** — live page is a 2027 refresh (5 spec changes, same
   $7,799). (a) update in place / (b) keep 2025 + add 2027 row / (c) supersede. Coordinator
   leans (b), the Straggler precedent. Findings documented in-row.
8. **WTB perpetual-"Sale price" storefronts** — accept a maker's own stable storefront
   figure as msrp-confirmed when no separate MSRP exists / keep strict (rows stay blank) /
   park. ~10 rows now.
9. **Spec-page-only component rows (~50 road/gravel)** — Shimano/SRAM/Zipp/Campagnolo spec
   pages never carry prices; OK to mark "deprioritized — needs a price-bearing source" so pb
   waves stop re-fetching them?
10. **The no-USD-MSRP token family** (third face of 8/9, confirmed by the rejected
    pb-gravel-4 branch): current products whose makers publish no USD price
    (foreign-currency-only or spec-only). Ratify a token (e.g. `no-us-msrp`), or those rows
    stay permanently blank? This is the structural floor under the road/gravel burndowns.
11. **Canyon live-price drift** — verified rows whose canyon.com URLs now show different
    prices/spec-levels (Spectral $1,999→$3,099 etc.). Re-verify as corrections, or is a
    "price-at-verification" convention needed?
12. **Fox 38 Performance Elite 29/180** — no such SKU exists on ridefox.com anymore (170mm
    only). Discontinued writeup or retire?
13. **Permission one-liners for his settings.json allow list** (classifier blocks the
    coordinator adding them): `"Bash(node *)"`, `"Bash(git add *)"`, `"Bash(git commit *)"` —
    kills the recurring worker permission prompts.
14. **Smalls tail:** Whisp tier naming (SOLiX Classic vs uniform Hydra2 — taste) · one manual
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
