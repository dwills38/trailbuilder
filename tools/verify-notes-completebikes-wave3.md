# Complete-bikes verification notes — verify/completebikes-2 (wave 3)

Continuation of `tools/verify-notes-completebikes.md` (Round 1 Yeti + Round 2 Pivot/Ibis/
Rocky Mountain/Devinci, both already merged to main). This wave picked up the Round 2
leftovers (Ghost, Mondraker, remaining Devinci rows) and opened a new brand: Canyon.

## Leftover brands from Round 2 (all confirmed clean, no changes)

**Ghost** (ghost-bikes.com, per-product pages): fetched all 3 catalog rows —
`cb-ghost-riot-am-cf-pro` ($5,939, verified), `cb-ghost-riot-trail-cf` ($4,859, verified),
`cb-ghost-riot-am-cf-full-party` ($6,695, unverified). Live EUR prices (€5,499 / €4,499 /
€6,199) convert to the stored USD figures at a consistent ~1.08 FX rate — no drift.
Fill-by-fill cross-check against each page's full spec table (fork/shock/drivetrain/
brakes/wheels/cockpit) matched exactly on all three rows, including the AM CF Pro's SRAM
Eagle 90 Transmission tier, the Trail CF's Shimano Deore M6100/BR-M6120 tier, and the Full
Party's SRAM GX Transmission + ZEB Ultimate/Vivid Ultimate spec. No bugs found.

**Mondraker** (mondraker.com regional sites, no direct USD page): `cb-mondraker-raze-r`'s
full fill set (Fox 36 Rhythm, Fox DPS Performance EVOL 205x57.5, Mavic Crossmax XL S,
Maxxis Dissector/Aggressor, mixed SRAM NX/GX Eagle, Truvativ Stylo 7K, SRAM G2 R, Onoff
cockpit) matches an archived cdn.mondraker.com spec sheet for the same model almost
field-for-field. `cb-mondraker-foxy-r` and `cb-mondraker-foxy-carbon-r` fills are
internally consistent with current mondraker.com regional listings (Öhlins RXF36/TTX2Air
and Fox 36 Performance/Float X Performance Elite tiers respectively). No USD price is
published on any regional mondraker.com site (UK/BE prices in GBP/EUR only), so price
stays third-party-sourced per policy — no change. No bugs found.

**Devinci remainder**: `cb-devinci-django-carbon-gx`, `cb-devinci-django-nx-12s`,
`cb-devinci-marshall-29-deore` — confirmed both Django and Marshall are **retired from
Devinci's current lineup** (devinci.com/en/bikes/mountain/ lists only Chainsaw, Spartan,
Troy, Kobain, Minus) — no live page to compare against, correctly left as legacy-snapshot
unverified rows, same pattern as the Pivot Trail 429/Mach 6 finding in Round 2. No action.
`cb-devinci-chainsaw-dh-gx` ($4,499, 2023, unverified): re-fetched devinci.com's current
Chainsaw DH page — the live "Chainsaw GX 7s | Coil" trim is priced exactly $4,499,
confirming the stored price against today's live page (the row's own extensive desc
already documents every fill as FETCHED-with-flagged-ASSUMED-substitutions from vitalmtb;
this session only re-confirmed the price independently). No changes made — already
correctly unverified given the ASSUMED substitutions on file.

## Canyon (17 rows) — first pass this wave

Canyon.com per-model pages render live US pricing cleanly via direct fetch (JS-loaded
component tables don't render through the fetch tool, but the price block does).

**Fixed:**
- `cb-canyon-spectral-cf-7` — price 3699 -> **3799**, added **streetPrice:2799**,
  promoted to **verified:true**. The row's own desc already documented every fill as
  directly maker-fetched off this same canyon.com page; only the price was third-party
  (canyon.com showed "Sold out" with no live price at original entry time, so price came
  from cross-checked vitalmtb/bikeradar editorial specs). Re-fetched today: the model is
  back in stock with a live price ($3,799 MSRP / $2,799 sale) — corrected and promoted
  since every field is now maker-sourced from the one page.
- `cb-canyon-neuron-cf-8` (verified) — streetPrice 2999 -> **3199**. MSRP unchanged
  ($3,999, confirmed exact); the live sale price has moved since the row was verified.

**Confirmed clean, no changes:** `cb-canyon-spectral-cf-8` ($5,099), `cb-canyon-spectral-cf-9`
($6,499), `cb-canyon-neuron-al-5` ($2,399/$1,599 — sale price matches exactly),
`cb-canyon-spectral-al-6` ($3,099), `cb-canyon-sender-cfr-team` ($7,799) — all verified
rows, all re-fetched prices match stored values exactly.

**Spot-checked, price plausible, not promoted (fills carry flagged ASSUMED substitutions
per their own desc, so THE BAR keeps them unverified):** `cb-canyon-torque-mullet-cf-7` —
live canyon.com now shows $3,399 sale / **$4,199 original**, exactly matching the row's
stored price ($4,199) which the row's own desc says was NOT maker-confirmed at entry
time. Did not add streetPrice or promote — the desc documents real fork/stem
substitutions (ZEB Select vs Select+, etc.) that keep this row correctly unverified
regardless of price confirmation.

**Could not verify (page sold out / no live price rendered):** `cb-canyon-grand-canyon-al-6`,
`cb-canyon-stoic-4`, `cb-canyon-stoic-3` (regional page render blocked). Left unchanged.

### Flagged for the coordinator — NOT fixed, needs a second look

1. **`cb-canyon-grand-canyon-al-8` — possible uncorrected currency.** Live
   canyon.com/en-gb shows **£1,599** for this exact model/trim; the catalog's stored USD
   `price` field is also **1599** — the same raw number, not an FX-converted figure. The
   row's own desc claims "Price £1,249 converted to a documented USD sample" — but £1,249
   is the *AL 7* sibling's live price, not AL 8's (£1,599) — the desc appears to have
   copy-pasted the wrong sibling's conversion note. Net effect: AL-8's stored $1,599 looks
   like an un-converted GBP figure sitting in a USD field, OR the desc note is simply
   stale/wrong and the number is fine — genuinely ambiguous without knowing which. Did not
   touch it (fills are correctly maker-sourced and unaffected either way) — flagging for a
   pricing-focused follow-up.
2. **`cb-canyon-sender-cfr-gen3-cllctv` — wheel-model uncertainty.** The row's fills use
   `fw/rw-dtswiss-fr-1500-*` (DT Swiss FR 1500), sourced from a WebFetch + "corroborating
   search summary" of canyon.com's /sender/ hub page (not a dedicated product page for
   this exact trim — none was found). That hub page's own marketing copy for the
   "Sender CFR CLLTV" spec block (note: hub page spells it CLLTV, catalog id says
   CLLCTV — same trim, naming inconsistency worth resolving) states **"Wheels: DT Swiss
   EX1500"**, not FR1500. Drivetrain (SRAM X01 DH) and frame do match the hub copy. Did
   not touch the wheel fill — EX1500 isn't confirmed to exist as a distinct SKU in this
   catalog either, and the hub page is marketing copy, not an itemized spec table — flag
   only, needs a dedicated product-page fetch to resolve which wheel is actually correct.

## Gates (this session)

- `node validate.js`: `DATA OK - 5023 parts, 0 problems (2973 verified, 2050 unverified)`
  (7/7 catalogs OK; verified count +1 net vs the pre-session baseline of 2972, from the
  Spectral CF 7 promotion)
- `npm test`: 764/764 passed (29 files)
- `npx tsc --noEmit`: clean, no output

## Session tally

436 total completebike rows (unchanged — no rows added/removed, no ids changed).
Reviewed: 3 Ghost + 3 Mondraker + 4 Devinci (leftover from Round 2, all clean) + 17 Canyon
rows (first pass). 2 real price corrections fixed (1 promotion to verified, 1 stale
sale-price update on an already-verified row). 2 items flagged for the coordinator
(possible GBP-in-USD-field bug on Grand Canyon AL 8; wheel-model naming/spec uncertainty
on the Sender CFR CLLCTV). No e-bikes touched; no component rows edited (only completebike
fill references, and only where the referenced part id itself was already correct).
Brand-wall map from Round 2 still holds: Norco/Cannondale/Propain confirmed blocked (not
re-attempted, per this task's scope caveat). Untouched this wave: Santa Cruz (33), Trek
(21), Giant (17), Specialized (32), Evil (15), Orbea (13), Scott (11), Commencal (9),
Forbidden (9), YT (9), GT (8), Vitus (7), Marin (7), Polygon (7), Cube (7), Salsa (6),
Nukeproof (6), Whyte (6), Merida (6), Revel (6), Intense (5), Chromag (5), Kona (5),
Ragley (5), and 20+ smaller brands — a large remaining surface for a follow-up wave.
