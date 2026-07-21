# Fabricate-fill audit — report only, no catalog edits

Branch: `audit/fabricate-fill-1` (worktree `.claude/worktrees/ffa-9e2c`, cut from `origin/main` @ `c756232`).
Trigger: gravel-6 caught a deliberate BB shell swap (`gbb-shimano-sm-bb72-bsa` ↔ `gbb-shimano-sm-bb52-bb86`)
planted to fill the Trek Checkpoint SL 7's BB86 gap (PROJECT-LOG 2026-07-21). This audit traced the wave,
re-verified its siblings' engine-read interface fields against maker pages, and swept for the same
"interface value invented to close a gap" fingerprint. **Headline: the "BB86 gap" itself was fabricated —
the real Checkpoint SL Gen 3 is T47 threaded (Trek's own spec table), so BOTH the original swap AND the
current golden build rest on a wrong frame fact. 3 more confirmed-wrong rows + 2 strong suspects found.**

## 1. Git archaeology — which wave planted it

The swap was assembled across TWO waves, both already merged to main:

| Commit | Wave | What it contributed |
|---|---|---|
| `c404675` — "initial off-live data/gravel.js — 151 rows" | **catalog/gravel-1** (2026-07) | Entered `gbb-shimano-sm-bb72-bsa` with `shell:'bsa-road'` (real SM-BB72-41B is press-fit 86.5mm) — the first half of the swap. Also entered `gfr-trek-checkpoint-sl-7` with the fabricated `bb:'bb86'` (see §2) that created the "gap". |
| `a002e7e` — "grind wave 1 — 150→198 rows (+48)" | **catalog/gravel-grind-1** (2026-07-20, per its own commit message "the SM-BB52 BB86 that closes the Trek Checkpoint's pre-existing shell gap") | Entered `gbb-shimano-sm-bb52-bb86` with `shell:'bb86'` (real SM-BB52 is threaded BSA 68/73) carrying a self-incriminating note: *"fills the BB86 PressFit gap the Trek Checkpoint SL 7 frame row (bb:'bb86') left unbuildable… Real product, not independently fetched this session."* It even widened `GRAVEL_VOCAB.shell` with `'bb86'` to admit the row. |

Both waves touched ONLY `data/gravel.js` (+ `src/schema-gravel.js` vocab line, + a progress note) — no other
catalog was written by these commits, so the blast radius is gravel-only. Wave row lists: gravel-1 = 140 ids,
grind-1 = 48 ids (extracted from the commit diffs; scratchpad `wave-g1.txt` / `wave-grind1.txt`).

Status on current main: gravel-6's fix (`9b48cbe`, merged) already corrected both BB rows' shells and
verified them against fetched Shimano pages. The BB rows are now clean. **The frame row is not — see below.**

Prior-catch tally for context — gravel-1 is a serial offender. Rows it entered that later waves proved
fabricated/wrong: PD-GRX600 (nonexistent SKU → PD-ES600), GRX RX610 48T ring (no such option),
`gro-sram-paceline-140-6b` (Paceline has no 6-bolt SKU), RD-RX812 "2x12" (real RX812 is 1x11, fixed by
grind-1), an RX820 "Di2" shifter (no such thing, fixed by grind-1), GravelKing SK phantom sizes
(700x38/43 → 35/40, fixed `de597cc`), WTB/Continental casing mislabels, plus the BB72 shell. Grind-1's own
catches: Campagnolo AFS "6-bolt" (AFS *is* Center Lock, caught by gravel-6). This audit adds the rows below.

## 2. Confirmed-wrong (raw maker text fetched this audit)

### 2.1 `gfr-trek-checkpoint-sl-7` — `bb:'bb86'` is FABRICATED; real frame is T47 ★ GOLDEN-CORRUPTING
- **Evidence (browser pane, trekbikes.com Checkpoint SL 7 AXS Gen 3, model 5321676, spec tab, raw text):**
  Frame: "500 Series OCLV Carbon, IsoSpeed, … RCS Headset System, invisible cable routing, **T47**, flat
  mount disc, integrated chainkeeper, removable FD hanger, **UDH, 142x12mm chamfered thru axle**".
  Bottom bracket: "**SRAM DUB Wide, T47 threaded, internal bearing**".
  https://www.trekbikes.com/us/en_US/bikes/bikepacking-touring-bikes/checkpoint/checkpoint-sl/checkpoint-sl-7-axs-gen-3/p/47073/
- The row's other engine-read fields verify clean against the same table: rearAxle 12x142 ✔, flat-mount ✔,
  seatpost "Bontrager carbon, **27.2mm**" ✔, tapered steerer ✔, 50mm clearance ✔ (FAQ, already cited).
- **Consequence:** the Checkpoint golden in `test/test-road-golden.js` currently pairs this frame with
  `gbb-shimano-sm-bb72-bsa` (press-fit 86.5) — a physically false build that gravel-6's honest BB fix
  could not see because it never re-checked the frame side. The whole 3-row chain (frame bb86 → BB52
  mislabel → gravel-6's BB72 repoint) traces back to this one fabricated frame fact from gravel-1.
- **Proposed fix:** `bb: 'bb86'` → `'t47-86'` (Trek is T47 **internal-bearing 85.5mm**, NOT the 68mm
  `t47-road` — the Bombtrack Hook EXT note in-file already documents why these must not be conflated).
  Repoint the golden's `bb` fill to a real T47-85.5 × 24mm-road product for the GRX build — Praxis
  "T47 I.B. Shimano" (praxiscycles.com/product/t47-i-b-shimano/, 85.5mm road, Hollowtech II) is the honest
  candidate (new row), or SRAM DUB T47 (BB-DUB-T47-A1) if the golden moves to a SRAM crank. Note the
  frame also has **UDH** (not currently modeled in the gravel schema — optional flag for a future pass).

### 2.2 `gfr-trek-checkpoint-alr-5` — `bb:'bsa-road'` is WRONG; real frame is T47
- **Evidence (browser pane, trekbikes.com Checkpoint ALR 5 Gen 2, spec tab, raw text):** Frame:
  "300 Series Alpha Aluminum, tapered head tube, … **T47 BB**, rack and fender mounts, … flat mount disc,
  142x12mm thru axle". Bottom bracket: "SRAM DUB Wide, **T47 threaded**, internal bearing".
  https://www.trekbikes.com/us/en_US/bikes/bikepacking-touring-bikes/checkpoint/checkpoint-alr/checkpoint-alr-5-gen-2/p/5304202/
- Other fields clean: 12x142 ✔ flat-mount ✔ tapered ✔ (27.2 post not restated on this excerpt; low risk).
- Not golden-load-bearing, but the same wave + same frame family + same field as 2.1 — this is the
  "sibling" the audit brief predicted. **Proposed fix:** `bb` → `'t47-86'` (same internal-bearing T47).

### 2.3 `gbb-praxis-t47` — `spindle:'dub'` is a FABRICATED pairing; Praxis makes no DUB T47
- **Evidence:** praxiscycles.com's own T47 E.B. product page (WebFetch, raw): "installing a **Shimano
  Hollowtech II** cranks into a T47 68 Road or 73mm MTN frames… You are installing a Shimano™ Hollowtech II
  Road crank" — **"the page does not mention SRAM DUB anywhere."** Praxis's BB-finder lists its DUB family
  as BSA-shell only ("DUB 29mm BSA 68/73/83mm RD/MTN"); the T47 products are Shimano-24mm and M30 variants
  exclusively (t47-eb-shimano, t47-i-b-shimano, m30-t47-*).
- Fingerprint: this row + `gbb-wheelsmfg-t47-outboard` are the only `t47-road`-shell BBs — the T47 frames'
  (Ibis Hakka MX, Ritchey Outback) DUB-crank build path. Wheels Mfg's is real (see §4); Praxis's was
  seemingly invented for symmetry. **Proposed fix:** either retire → correct it to the real product it
  half-names (`model:'T47 E.B. Shimano'`, `spindle:'24mm-road'`, shell stays `t47-road` since the E.B.
  fits 68mm) — or replace with SRAM BB-DUB-T47-A1 (sram.com/en/sram/models/bb-dub-t47-a1, verifiable
  incl. weight) if a DUB×T47 path is wanted. Id is append-only: retirement + new row, per convention.

### 2.4 `gfw-hunt-adventurewide-650b` / `grw-hunt-adventurewide-650b` — PHANTOM MODEL
- **Evidence (browser pane, us.huntbikewheels.com/collections/650b-gravel-wheels, raw):** Hunt's complete
  650B gravel lineup is exactly three models — "MASON X HUNT 650B ADVENTURE SPORT DISC WHEELSET" (1594g,
  25 int, $489.30/$699), "HUNT 650B ADVENTURE CARBON DISC WHEELSET" (1390g, **27 wide int**, $1,349),
  "MASON X HUNT 650B ADVENTURE DYNAMO DISC WHEELSET". **No "650B Adventure Wide Gravel Disc" exists.**
- The catalog rows are a chimera: `intWidth:27` matches the $1,349 carbon wheel, while price ($500) and
  weights (800/980g) sit in alloy-Sport territory. Model name appears to splice "Adventure" + Hunt's
  unrelated 700c "Gravel X-Wide" branding. From gravel-1.
- **Mitigating scope:** used only in the KNOWN-BAD golden (as a deliberate 650b-vs-700c wheel-size
  conflict), so no clean golden depends on it — but a phantom SKU is still catalog poison.
  **Proposed fix:** retire both ids; if a 650b wheel row is still wanted, enter the real "HUNT 650B
  Adventure Carbon Disc" (27 int) or "Mason X Hunt 650B Adventure Sport" (25 int) from their product
  pages, and repoint the known-bad golden (any 650b front wheel serves its purpose).

## 3. Suspect (real family, unverifiable or unsourced identity — not raw-confirmed wrong)

- **`bmx-fr-redline-prolineflight` (`data/bmx.js`, "unblocks the depth-3 disc-vocab gap"):** disc-brake
  Proline is REAL (press/retail confirm 2022+ Proline completes ship Avid BB5 disc), but the model name
  "Proline Flight" appears NOWHERE — Proline trims are Pro / Pro XL / Expert / Junior / Mini, and "Flight"
  is Redline's unrelated crank/carbon branding. A frame-only $549.99 SKU is also unsupported (Proline
  sells as completes). Same class as the caught PD-GRX600: real family, invented SKU, entered to unblock
  a vocab gap. Needs a redlinebicycles.com fetch (Exa infra-error this session) → likely rename to a real
  trim or retire; the paired `bmx-br-avid-bb5-bmx` is a real product and honestly noted.
- **`ghs-cannondale-si-zs44-ec49` (grind-1):** zero note, zero source; "SI Integrated Headset" as
  ZS44/EC49 with $40/90g is dubious (Cannondale integrated head tubes are drop-in IS-style, not EC49
  external lower). NOT engine-load-bearing today (gravel frames carry no headTube fields; no golden uses
  headsets) — but it's exactly the unsourced-interface shape this audit targets. Verify or retire.
- **`ghs-canecreek-40-zs44-zs56` / `ghs-canecreek-110-zs44-ec49` (gravel-1):** plausible real configs
  (Cane Creek's 40/110 series are modular and do ship these S.H.I.S. combos) but unsourced. Low priority,
  same non-load-bearing status as above.

## 4. Cleared this audit (evidence found, no action needed)

- `gbb-wheelsmfg-t47-outboard` — REAL: wheelsmfg.com "T47 Outboard ABEC-3 BB for **29mm SRAM DUB**
  Compatible Cranks", cups fit 68–100mm shells (covers `t47-road`). Row stays unverified-sample but is
  not fabricated.
- `gfr-specialized-crux-comp-carbon` `bb:'bsa-road'` — corroborated ("Threaded BB", BSA 68, across
  specialized.com product listings; raw fetch 403-walled via both WebFetch and Exa — documented wall,
  interface matches, golden pairing with the verified SRAM DUB BSA BB is real-world sound).
- The two originally-swapped BB rows — fixed + verified by gravel-6 (`9b48cbe`, merged; shells now match
  fetched Shimano pages).
- The gap-fill wheel blocks in `road.js` (road-5/road-7) and `gravel.js` (dropbar-cleanup-1): every
  interface value carries a fetched-source quote (productinfo.shimano.com / dtswiss matnr / ride.shimano.com
  spec tables) or an explicit honest "retailer-sourced, left unverified" disclosure. The GRX ST-RX600
  shifter gap-fill quotes the Shimano spec handbook. These show the honest pattern the fabricated rows lack.
- Checkpoint SL 7's non-BB engine fields (axle/mount/post/steerer/clearance) — raw-confirmed correct.

## 5. Wave verdicts + follow-up scope

- **catalog/gravel-1 (`c404675`) — NOT a clean wave.** ~10 fabrications now traced to it (§1 tally + §2.1,
  2.2, 2.3, 2.4). **81 of its 140 rows are still unverified on main** (list in scratchpad; frames-heavy:
  Canyon Grail/Grizl, Giant Revolt ×2, BMC URS, Salsa ×3, Santa Cruz Stigmata, Open UP/WIDE, Specialized
  Diverge ×2, plus wheels ENVE/Zipp/Roval, forks, cockpit). Its remaining bb86 frame claims (Canyon Grail
  CF SL, Grizl, BMC URS, Rondo Ruut, Bianchi Impulso, Liv Devote) are plausible-but-unfetched
  and share a field with two confirmed fabrications — they should lead the next gravel deep-verify wave.
- **catalog/gravel-grind-1 (`a002e7e`) — planted the deliberate fill knowingly** (its note admits the
  motive), 45/48 rows still unverified. Its 12 new frame brands (Rondo, Niner, Mason, Kona Sutra, Norco
  Search, Otso, Ritchey, Jamis, Genesis, Diamondback, Marin Nicasio, State) are unverified; the Rondo
  Ruut's `bb86` (used to justify the vocab widening) deserves a fetch.
- **Vocab observation:** gravel frames use both `'bb86'` (7) and `'pf86'` (2) while the only press-fit-86
  BB row carries `'bb86'` — the 2 `pf86` frames (`gfr-giant-revolt-advanced-0`, `gfr-giant-revolt-1-alloy`)
  have NO matching BB row (an exact-match rule-7-style check leaves them BB-unbuildable) and the
  near-duplicate tokens invite the next convenience mislabel. Recommend unifying to one token
  (schema + rows, sign-off needed).
- Other catalogs: these waves wrote nothing outside gravel; the heuristic sweep across `road.js`,
  `bmx.js`, `emtb.js` notes found only the Redline suspect (§3). `src/compat.js` (MTB live) untouched.

## 6. Proposed fix list (for a follow-up chip after coordinator review — NOTHING touched this audit)

1. `gfr-trek-checkpoint-sl-7`: `bb:'bb86'` → `'t47-86'`; add provenance from the fetched spec table.
2. `gfr-trek-checkpoint-alr-5`: `bb:'bsa-road'` → `'t47-86'`; same source route.
3. Checkpoint golden (`test/test-road-golden.js`): repoint `bb` fill off `gbb-shimano-sm-bb72-bsa` to a
   real T47-85.5 BB row (new: Praxis T47 I.B. Shimano for the GRX 24mm crank — praxiscycles.com page
   fetches clean — or SRAM BB-DUB-T47-A1 with a crank change). Do NOT delete the BB72 row (it's real,
   verified, and legitimately fills PF86 frames like Canyon Grail/Rondo Ruut).
4. `gbb-praxis-t47`: retire id → re-enter as the real T47 E.B./I.B. Shimano (`spindle:'24mm-road'`), or
   replace with SRAM BB-DUB-T47-A1. (ALIASES + verify-job tombstone per convention.)
5. `gfw/grw-hunt-adventurewide-650b`: retire; enter a real Hunt 650B SKU; repoint the known-bad golden's
   front wheel.
6. `bmx-fr-redline-prolineflight`: fetch redlinebicycles.com; rename to a real Proline trim or retire.
7. `ghs-cannondale-si-zs44-ec49`: source or retire.
8. Next gravel verify wave: lead with the remaining gravel-1 bb86 frames + grind-1 frame brands (§5).
9. Vocab: decide `bb86` vs `pf86` unification (Douglas/coordinator sign-off — schema change).

## Method + walls

Raw-text rule observed throughout: verdicts above quote fetched page text (browser pane for trekbikes.com
and huntbikewheels.com — both render empty/shell via WebFetch; WebFetch for praxiscycles/wheelsmfg-via-Trek;
Exa attempted for walls). Walls this session: specialized.com/support 403 (both routes — documented, not
circumvented), wheelsmfg.com direct 429-then-pane-denied (product existence confirmed via its own indexed
product URLs + Trek's retail listing), redlinebicycles.com Exa infra-error (Redline check left at
"suspect"). No search-summary was treated as a source for any confirmed-wrong verdict.

Gates: no code/catalog/test file touched — trivially green (baseline `origin/main` @ `c756232`).
