# verify-notes-tail15 — mtb-tail-15 worker session (2026-07-21)

Scope: unverified MTB rows in `src/compat.js`, categories handlebar/stem/grips/dropper/
seatpost/saddle ONLY. Branch `verify/mtb-tail-15`, worktree
`.claude/worktrees/mtb-tail-15-a7k2`. Excludes complete-bike rows, wheels, tires.

Task: the 22 remaining unverified Syncros rows in these six categories, plus the
retirement-vs-live disposition pass tail-14 recommended for the Syncros naming-drift
pattern it found (`tools/verify-notes-tail14.md`).

## Disposition of all 22 rows

Confirmed the exact 22-row set by scanning `PARTS` for `brand:'Syncros'` in the six
scoped categories with no `verified:true` — matched the task brief's count exactly.

### Promoted to verified:true (3 rows, 1 commit `d0928ce`)

- `st-syncros-xc20-318` ("XC 2.0" stem): FETCHED syncros.com's standalone product page
  directly. Exact name match. $45→$89.99, 135g→160g (one weight figure stated for the
  whole product — not per-length — so it applies across the full 50-90mm length range,
  including this row's stored 60mm). 31.8mm clamp confirmed exactly.
- `hb-syncros-fraserics-318-740` + `st-syncros-fraserics-318` (Fraser iC SL XC Carbon
  integrated cockpit, paired bar/stem-half rows): FETCHED syncros.com's standalone
  "Fraser iC SL XC Integrated Cockpit" product page directly. 740mm width exact match,
  stem-length option range 50/60/70/80mm includes this row's stored 70mm. Whole-unit
  price $399.99 (was $420 sample) and weight 270g (was a 130/130=260g sample split) —
  reallocated per this catalog's existing zero-cost/zero-weight stem-half convention
  (already used on the Bontrager RSL Integrated / Syncros Hixon iC pairs elsewhere):
  bar-half carries the real weight (price:0), stem-half carries the real price
  (weight:0).

### Retired to status:'discontinued' (16 rows, 1 commit `e939cfc`)

Confirms and extends tail-14's finding: Syncros has genuinely dropped these naming
lines from the current lineup (direct syncros.com fetches this session — cockpit
category page, saddle listing incl. site search for "Kaslo"/"Duncan", Duncan
dropper/rigid-post listing). **No `supersededBy` set on any of these** — in every case
either the whole naming line is gone with no replacement (XM, DH stem/seatpost, DJ
set, Pro DH grips, Kaslo) or the closest current match differs enough (name, price
structure, or generation number with no stated linkage) that asserting a specific
successor would be a guess, not evidence, per THE BAR:

- `hb-syncros-hixon2-318` (Hixon 2.0) — no plain "Hixon 2.0" bar; only Hixon iC SL/SL
  Rise (integrated carbon cockpits) and the separately-cataloged, already-verified
  Hixon 1.0/1.5/DH alloy bars.
- `hb-syncros-hixon20-318-780` (Hixon 2.0 Alloy) — same finding as above, the alloy
  trail-bar variant.
- `st-syncros-xm15-318` (XM1.5) — no "XM" stem naming line at all today (current:
  XC 1.5/2.0, DC 1.5/2.0/3.0, AM 1.5/2.0, XR 1.5).
- `gr-syncros-prodh` (Pro DH grips) — no "Pro DH" grip in the live catalog (tail-14
  found a real Jenson USA retailer listing for this exact name, still no live
  syncros.com page this session either).
- `sp-syncros-dj15-316` (DJ1.5 seatpost) — no "DJ" rigid-post line found.
- `sa-syncros-dj15` (DJ1.5 saddle) — no "DJ" saddle found (site search empty).
- `hb-syncros-hixonic-35-780` + `st-syncros-hixonic-35` (Hixon iC Carbon, paired
  rows) — the live lineup's "Hixon iC SL"/"Hixon iC SL Rise" is a differently-named,
  differently-priced ($399.99) integrated unit; a generation-name change, not
  confirmed the same SKU.
- `dp-syncros-duncan25-316-150` (Duncan Dropper 2.5) — current Duncan Dropper lineup
  is only 1.5 (200mm) and 2.0 (125/150/170mm); no "2.5" generation. A number-only
  rename to 2.0 is plausible but unevidenced.
- `dp-syncros-duncan15xc-316-100` (Duncan Dropper 1.5XC) — same lineup check; no
  "1.5XC"/100mm variant exists today.
- `sa-syncros-tofino25` (Tofino 2.5) — current Tofino lines are E 1.0/1.5/2.0, R/V SL,
  R/V 1.0/1.5; no "2.5" generation.
- `hb-syncros-fraser15-318-740` (Fraser 1.5) — current handlebar lineup has only
  "Fraser 1.0 XC" (alloy) plus the carbon Fraser iC SL cockpits; no "Fraser 1.5"
  naming, and (unlike the sibling Fraser 2.0 XC row below) no weight-matched
  candidate to leave the door open on.
- `sp-syncros-duncan15-316` (Duncan 1.5, rigid) — current rigid-post lineup is Duncan
  2.0 (0/15mm offset) and Duncan SL (10/25mm offset); no rigid "Duncan 1.5" (tail-14's
  exact finding, re-confirmed).
- `st-syncros-dh15-318-50` (DH1.5 stem) — no "DH" stem line in the current lineup.
- `sp-syncros-dh20-316` (DH2.0 seatpost) — no "DH" rigid-post line in the current
  lineup.
- `sa-syncros-kaslo20` (Kaslo 2.0 saddle) — "Kaslo" is named only as a legacy range on
  the saddle-finder marketing page copy; no live product page, and a direct site
  search for "Kaslo" returns zero results (tail-14's exact finding, re-confirmed).

### Left unverified, untouched (3 rows — real ambiguity, not force-matched)

- `st-syncros-xr15-318` (XR 1.5 stem, stored length:90): the live "XR 1.5 Stem" is a
  genuine exact-name/clamp match (31.8mm, $64.99, lengths 50-90mm) — **not** a
  retirement case. But its published weight (120g) is stated "for the 70mm length"
  only, not per-size or whole-product, and this catalog's row is the 90mm point — no
  weight figure covers that specific size, so THE BAR's weight requirement isn't met.
  Not promoted, not discontinued (it's real and current). Flag for a future session:
  if syncros.com ever publishes a 90mm-specific weight (or the row's stored length is
  changed to 70mm to match the one weight Syncros does publish), this promotes
  cleanly.
- `hb-syncros-fraser20-318-740` (Fraser 2.0 XC): re-confirmed tail-14's finding
  unchanged this session — the live "Fraser 1.0 XC" bar shares the *exact* weight
  (225g) and clamp/width (31.8mm/740mm) as this row, but under a different generation
  number. Genuinely ambiguous (same-SKU-renamed vs. different-product) per the same
  class of finding as the Contact TR35/SL issue tail-13 flagged. Not touched.
- `sa-syncros-tofino15-ti` (Tofino 1.5, Titanium rails): the "Tofino" family is very
  much alive (E 1.0/1.5/2.0, R/V SL, R/V 1.0/1.5) but no explicit Titanium-rail
  variant was found under any current name — the R/V SL tier is the plausible
  candidate (premium tier) but SL commonly denotes carbon rails, not confirmed
  titanium. Left unverified rather than guessed.

## Gates

`node validate.js`: 0 problems both commits (3312→3315 verified, 1728→1725 unverified
after the discontinued-status commit which doesn't change verified count; the
promotion commit is what moves 3312→3315). `npx vitest run`: 988 passed both commits.
`npx tsc --noEmit`: clean both commits. Two commits this session (`e939cfc` retirements,
`d0928ce` promotions), both gated.
