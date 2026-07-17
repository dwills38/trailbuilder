# fanout-1-tires-tranzx — progress log

Branch: `verify/fanout-1-tires-tranzx` (based on origin/main @ 8f9b4c4). Scope: every
unverified `cat:'tire'` row for Schwalbe/Maxxis/Specialized, plus every unverified
`cat:'dropper'` row for TranzX.

Worklist size at start: 46 tire rows (17 Schwalbe, 14 Maxxis, 15 Specialized) + 15
TranzX dropper rows = 61 rows.

## Verified this session (23 rows: 3 Schwalbe + 6 Maxxis + 11 Specialized + 3 TranzX)

**Schwalbe (3):**
- `ti-schwalbe-big-betty-275-24-sg-as` — schwalbetires.com article 11654148, exact weight match (1180g)
- `ti-schwalbe-big-betty-275-24-st-as` — schwalbetires.com article 11654151, weight corrected 1080->1085g
- `ti-schwalbe-magic-mary-29-24-st-aus` — schwalbetires.com article 11654279, weight corrected 1160->1150g

**Maxxis (6, incl. 2 re-confirmations that already had a source but were missing `verified:true`):**
- `ti-maxxis-crossmark-ii-275-225-exo-dual` / `-29-225-exo-dual` — re-fetched maxxis.com/us/tire/crossmark-ii/, exact match, added `verified:true` (previously had `source` but not the verified flag)
- `ti-maxxis-minion-dhr-ii-29-24-dd-mt` — re-fetched maxxis.com/us/tire/minion-dhr-ii/, exact match (1222g)
- `ti-maxxis-aggressor-29-25-exo-dual` — maxxis.com/us/tire/aggressor/, weight corrected 1050->1122g
- `ti-maxxis-dissector-29-24-exo-3cmt` — maxxis.com/us/tire/dissector/, weight corrected 990->956g
- `ti-maxxis-highroller-ii-29-23-exo` — maxxis.com/us/tire/high-roller-ii/, weight corrected 900->939g + compound `dual` added (was unset)

**Specialized (11) — the 403 wall is confirmed dead via Bright Data (`bdata scrape`), per VERIFY-PROTOCOL.md's 2026-07-17 note:**
- `ti-specialized-butcher-t9-29-23` (2BR gen, mfgPn 187347) — weight 1048->975g, price $60->$70 (prior figure actually matched the newer TLR 29x2.4 sibling, a different SKU — flagged below)
- `ti-specialized-butcher-29-26-gridtrail-t9` (TLR gen, mfgPn 1000234003) — exact weight match (1110g), price corrected $60->$80
- `ti-specialized-butcher-29-24-gridtrail-t9` (TLR gen, mfgPn 1000234003) — weight 1080->1048g, price $60->$80
- `ti-specialized-eliminator-29-23-gridtrail-t7` (mfgPn 173627) — weight 934->950g, price $60->$70
- `ti-specialized-eliminator-29-26-gridtrail-t7` (mfgPn 173627) — weight 1080->1030g, price $65->$70
- `ti-specialized-hillbilly-29-24-gridgravity-t9` (mfgPn 1000161069) — exact match (1340g, $85)
- `ti-specialized-fasttrak-29-235-control-t7` (mfgPn 205391) — weight 725->715g, price $60->$65
- `ti-specialized-fasttrak-29-235-control-t5` (mfgPn 205256) — weight 700->670g, price $55->$32
- `ti-specialized-renegade-29-235-control-t5` (mfgPn 205202) — exact weight match (645g), price $55->$40
- `ti-specialized-groundcontrol-29-235-grid-t7` (mfgPn 203431) — exact weight match (870g), price $70->$65
- `ti-specialized-groundcontrol-29-235-control-t5` (mfgPn 203432) — weight 800->845g, price $55->$75

**TranzX droppers (3):**
- `dp-tranzx-ysp39-349-150` — re-fetched tranzx.com/product/10dropperpost/ysp39j.html, exact match (34.9mm/150mm=685g); already had a maker fetch cited in `desc` from a prior session but was missing `verified:true`
- `dp-tranzx-jdysp18-316-130` / `dp-tranzx-jdysp18-309-130` — same situation: tranzx.com/product/10dropperpost/ysp18p.html already cited with exact weights (580g/560g) from a prior session but missing `verified:true`

**Key lesson (Schwalbe):** individual `schwalbetires.com/<Model>-<article#>` SKU pages are NOT
uniformly JS-blocked — direct `curl`/WebFetch on the numbered article URL usually returns the
full spec-property block (Weight/Compound/ETRTO/Wheel Size/etc as plain HTML `properties-value`
divs), even though the category listing/configurator page (`schwalbetires.com/<Model>`) is
JS-rendered and returns marketing copy only. A `probe.sh` helper (curl + awk over
`properties-label`/`properties-value` pairs) made batch-checking many SKU pages fast — some
SKUs (Dirty Dan 11654177, Rock Razor 11601013.01, both Racing Ray/Ralph SKUs, two Nobby Nic SKUs,
one Hans Dampf SKU) have every property filled EXCEPT weight, which is genuinely absent from the
page (not a fetch failure) — these stay Skipped.

## Corrections without verification (2 rows)

- `ti-schwalbe-magic-mary-29-25-st-aus` — casing corrected `super-trail` -> `trail-pro`. The
  classic bias-ply Super Trail/Super Gravity Magic Mary casings ship only in 2.25/2.4/2.6in
  (confirmed across multiple schwalbetires.com SKU pages); a 2.5in Magic Mary only exists in the
  newer radial-carcass Trail Pro/Gravity Pro generation (schwalbetires.com article 11654597
  confirms "TRAIL PRO | ULTRA SOFT" at 29x2.5). Could not pin a fetchable per-SKU weight for this
  exact radial article this session (its own URL 404s; the category table is JS-rendered) —
  stays unverified but the casing tier now matches the real Schwalbe lineup.
- `ti-schwalbe-magic-mary-275-25-sg-as` — same reasoning, casing `super-gravity` -> `gravity-pro`
  (real tier for 27.5x2.5 per schwalbetires.com article 11654599, also un-fetchable this session).
- `ti-maxxis-minion-dhf-29-25-mt` — weight corrected 1100->1099g via maxxis.com/us/tire/minion-dhf/,
  but NOT marked verified: the fetched table's "Casing" column showed bead-type (Foldable/Wire)
  rather than a clean EXO/EXO+/DoubleDown split for this model, so a casing value could not be
  confidently pinned, and this catalog's own tire-verified gate (`test/test-data.js`) requires
  both casing AND compound before `verified:true`.

## Data-quality flags (not fixed this session — for the coordinator/next session)

1. **Duplicate/contradiction:** `ti-maxxis-ardent-race-29-22-exo` (family `maxxis-ardent-race`,
   685g/$68) and `ti-maxxis-ardentrace-29-22-exo` (family `maxxis-ardentrace`, 680g/$70) are the
   same real product (Ardent Race 29x2.2 EXO) entered as two separate rows with inconsistent
   family slugs and conflicting weight/price. Neither was overwritten (ids are append-only,
   never silently merge) — flagging for the coordinator to reconcile.
2. `dp-tranzx-jdysi05j-316-150` claims a fixed 150mm drop, but the real JD-YSI05J is a
   variable-travel post (95-125mm, adjustable in 5mm increments per multiple EU retailer specs:
   Pro-M Store, Gambacicli, Ridewill) — the fixed 150mm figure looks like a documented-sample
   guess from an earlier session, not a real config. Not corrected this session (ran out of time
   budget); flagging so it isn't miscounted as sourced.
3. `ti-specialized-eliminator-29-24-gridtrail-t7` and `ti-specialized-purgatory-29-24-grid-t9`:
   the fetched specialized.com Eliminator GRID TRAIL T7 page only lists 2.3in/2.6in SKUs (no
   2.4in); the fetched Purgatory page was GRID TRAIL T9 (1050g) but the catalog row is plain GRID
   T9 (a different, lighter casing tier) — neither resolved this session, left as-is.
4. Schwalbe `ti-schwalbe-tabletop-26-225` — per Schwalbe's own blog, Table Top is discontinued,
   succeeded by "Billy Bonkers." No maker weight page found either way; left as a documented
   sample, not corrected (out of scope for this worklist's tire-brand focus and no Billy Bonkers
   row exists to alias to).

## Skipped — no maker-published weight found (interfaces confirmed, THE BAR blocks verification)

Schwalbe: `ti-schwalbe-dirty-dan-275-235-sdh-aus`, `ti-schwalbe-rock-razor-275-26-st-asg`,
`ti-schwalbe-nobbynic-29-24-supertrail-soft`, `ti-schwalbe-nobbynic-29-24-superground-speed`,
`ti-schwalbe-hans-dampf-29-235-st-as`, `ti-schwalbe-racing-ray-29-225-sg-asg`,
`ti-schwalbe-racing-ray-29-235-sg-asg`, `ti-schwalbe-racing-ralph-29-235-sg-as`,
`ti-schwalbe-magic-mary-275-25-tp-as` (already correctly labeled trail-pro, mfgPn 11654686 found
via biketiresdirect but the schwalbetires.com article itself 404s), `ti-schwalbe-magicmary-29-24`
/ `ti-schwalbe-bigbetty-29-24` (Performance tier — correctly left casing/compound unset, no vocab
name exists; not fixable).

Maxxis: `ti-maxxis-dth-26-23` (no matching weight in the fetched maxxis.com/us/tire/dth/ table
for this exact width/compound point), `ti-maxxis-ardent-race-29-22-exo` / `-29-235-exo-3cms`,
`ti-maxxis-ardentrace-275-26-exo-tr` / `-29-22-exo`, `ti-maxxis-ardent-29-24-exo-dual` — the
Ardent and Ardent Race product pages would not return a spec table via WebFetch OR `bdata scrape`
this session (unlike Dissector/DHF/DHR-II/Aggressor/High Roller II/Crossmark II, which all
returned full tables cleanly) — a genuine per-model fetch inconsistency, not a universal maxxis.com
wall. `ti-maxxis-minion-dhf-29-25-mt` — see corrections-without-verification above.

Specialized: `ti-specialized-butcher-29-23-gridgravity-t9`, `ti-specialized-butcher-275-23-gridtrail-t9`,
`ti-specialized-purgatory-29-24-grid-t9`, `ti-specialized-eliminator-29-24-gridtrail-t7` — ran out
of session time before locating/confirming the exact SKU page for these.

TranzX: `dp-tranzx-reverse-316-180`, `dp-tranzx-reverse-309-180` (OEM-only name, no na.tranzx.com
or tranzx.com page found), `dp-tranzx-ysi34-309-150`, `dp-tranzx-ysi34-349-170` (no standalone
tranzx.com page found for "YSI34" this session), `dp-tranzx-ysi60ql-309-150`,
`dp-tranzx-jdysp39kl-349-170` (170mm travel point has no published weight on the fetched
ysp39j.html page — only the 150mm/456mm point does), `dp-tranzx-jdysi05j-316-150` (see flag #2
above), `dp-tranzx-rad-316-150`, `dp-tranzx-ysi05-rad-309-150`, `dp-tranzx-slrle-349-170`,
`dp-tranzx-ysp23jl-309-170`, `dp-tranzx-jdysi34-316-150` — ran out of session time.

## Gate status (checked after every commit)

- `node validate.js`: 0 problems throughout (2891 verified / 2135 unverified at final commit)
- `npx vitest run`: 699/699 passing throughout (no test weakened; the tire-verified-gate test in
  `test/test-data.js` caught one premature `verified:true` this session — reverted, see the
  DHF correction-without-verification note above)
- `npx tsc --noEmit`: clean throughout
- `node tools/verdict-audit-harness.js`: 0 flags / 15-15 adversarial / assemble clean throughout
  (tires/droppers don't drive verdicts directly, as expected)

## Remaining worklist (for a follow-up session)

~21 tire rows + ~12 dropper rows still unverified from the original 61-row scope (see Skipped
lists above for exact ids) — none blocked by policy, just time. The Ardent/Ardent-Race maxxis.com
fetch inconsistency and the TranzX legacy-model-code pages (not on the current tranzx.com site
navigation) are the two open research threads worth a fresh WebSearch/bdata pass.
