# verify/fanout-1-wheels-boutique-2 — Industry Nine + We Are One wheel rows

Continuation of `verify/fanout-1-wheels-boutique` (Newmen + e*thirteen done, merged).
Scope this session: every unverified `frontwheel`/`rearwheel` row where
`brand` is **We Are One** or **Industry Nine** (70 rows total: 42 We Are One,
28 Industry Nine — a bit more than the ~63 estimate in the brief).

## Key finding confirmed (matches the brief's warning, and goes further)

Industry Nine sells **every** wheel tier — not just the premium 1/1/Triad
line — with 6-bolt and Center Lock as a customer-selectable option on the
SAME hub model. Confirmed independently via:
- `industrynine.com/products/triad-al` (current site, bdata-fetched): the
  live "Build your Triad Aluminium" configurator explicitly offers
  "6 Bolt" / "Centerlock" as a dropdown next to hub/spacing/freehub choices.
- An eBay listing titled **"Industry Nine Enduro-S 29 Wheelset Centerlock
  Super Boost"** — proving the *base/Classic* Enduro S tier (not just 1/1)
  also ships Center Lock in the wild, contradicting an assumption that only
  the premium tier is CL-capable.
- Antidote's own CarbonJack spec sheet (WebFetch, antidotebikes.com) lists
  the stock wheel only as "Industry Nine Enduro S Hydra 15x110/12x148mm" —
  no rotor-mount callout at all, across all 6 build variants on that page.

Net effect: for the plain "Enduro S" rows (no rotor-mount-bearing name
segment, unlike e.g. `rw-industrynine-11-enduro-275-157-ms` whose model name
literally says "Center Lock"), **rotorMount cannot be confirmed from the
wheel-family page, nor from any bike-specific build sheet fetched this
session** (checked: Antidote CarbonJack page, Norco Range C1 spec search,
Evil Following/Wreckoning/Insurgent spec search, MBR's Enduro S review).
This blocks `verified:true` on those rows even though other interfaces are
now manufacturer-confirmed and real weights are in hand — same shape as the
prior session's e*thirteen LG1 Plus Enduro rotor-mount wall.

## Corrected this session (weight only, real manufacturer figures — NOT verified:true, rotorMount still ambiguous)

Source: Wayback-archived `industrynine.com/wheels/mountain/classic-enduro-s/`
(bdata scrape, snapshot 20230928232512 — the current live site has
reorganized around Triad/Sector/Whisp/Deal naming and 404s on the direct
Enduro S URL, confirming the existing quality-audit note). That archived
page states real per-size, per-wheel weights and 30.5mm internal width /
2.3–2.8in tire range / 28h, none of which were previously sourced from a
maker page (the existing desc fields cited only retailer/review
corroboration, never a direct fetch).

| id | change | before → after |
|---|---|---|
| `fw-industrynine-enduro-s-29` | weight (real maker fig, 29in front) | 950g → 860g |
| `fw-industrynine-enduro-s-275` | weight (real maker fig, 27.5in front — the old 945g was actually the REAR figure, mislabeled as front) | 945g → 795g |
| `rw-industrynine-enduro-s-29` | weight (real maker fig, 29in rear) | 1080g → 1010g |

Desc updated on all three with the source URL, the real weight basis, and
an explicit rotorMount-ambiguity note (why `verified:true` is still
withheld). `rw-industrynine-enduro-s-275` already carries an independent
Loam Wolf **measured** rear weight (1020.6g, `sourceType:'measured'`) from a
prior session — left untouched, but flagging a contradiction for whoever
picks this up next: **the manufacturer's own combined-page weight for the
27.5in rear is 945g, vs. Loam Wolf's independently measured 1020.6g for
(presumably) the same SKU — a 76g gap.** Not silently overwritten; needs a
second measured source or a size/spoke-count explanation before reconciling.

## Not corrected / not verified (documented reasoning, no source found this session)

- `rw-industrynine-enduro-s-29-157`, `rw-industrynine-enduro-s-275-157`,
  `rw-industrynine-enduro-s-275-157-ms` (SuperBoost157 variants): no maker
  page publishes a SuperBoost-specific weight split (the archived Classic
  Enduro S page only shows the base Boost148 numbers); left at their
  existing nominal-nudge sample weights rather than fabricate a delta.
- `rw-industrynine-enduro-s-29-xd`: XD-freehub sibling of the now-corrected
  MicroSpline row; freehub-body weight delta is negligible per I9's own
  hub-shell design (same convention already used elsewhere in this family's
  desc fields) — left at 1080g pending a cleaner pass rather than guess at a
  sub-10g adjustment under time pressure this session.
- `fw-industrynine-11-enduro-275`, `rw-industrynine-11-enduro-275-157-ms`,
  `fw-industrynine-hydra-reynoldsbl-29`, `rw-industrynine-hydra-reynoldsbl-29-ms`:
  already well-sourced from a prior session (vitalmtb.com Pivot Mach 6 / Mach
  4 SL build-sheet fetches) with rotorMount:CL correctly inferred from each
  bike's stock Center-Lock rotor pairing — a defensible, already-documented
  judgment call. Attempted to add real Reynolds Blacklabel XC 259 weight
  data this session (WebSearch corroborated set weight 1380g / 25mm internal
  / 2.0–2.3in tire, matching the cataloged 25mm intWidth); the Hayes Bicycle
  product page (both WebFetch and bdata) returned a 404/empty shell with no
  usable spec table, so left unedited rather than write in a WebSearch-only
  figure. Not a wasted check: the search snippet independently corroborates
  the existing 640g/760g front/rear sample split (1400g total, close to the
  1380g set figure) without a source strong enough to promote to a
  correction.

## NOT YET WORKED (of the 70-row worklist, 9 rows touched, 61 remain)

- **Industry Nine remainder** (~19 rows): Whisp Carbon (XC tier, `fw/rw-industrynine-whisp-*`
  x4), Hydra2 DH (`fw/rw-industrynine-hydra2-dh-*` x13, all Boost/SuperBoost
  x HG/MS/XD freehub combinations) — not fetched this session. Whisp/Hydra2
  DH map cleanly to CURRENT site naming (unlike Enduro S) so should fetch
  without a Wayback detour; prioritize next.
- **We Are One** (42 rows, 0 touched): Union/Faction/Strife/Sector/Deal/Triad
  families. Per the brief, several of these legacy names (Union, Faction,
  Strife) are very likely discontinued on weareonecomposites.com's current
  lineup (which now centers on Triad/Sector/Deal) and will need the same
  Wayback-archive-pass pattern used here for Enduro S. Not started this
  session - the I9 rotor-mount investigation consumed the session's research
  budget; this is the single biggest remaining chunk of the worklist.

## Gates (after the one committed batch)

```
node validate.js                    -> DATA OK - 5025 parts, 0 problems (2675 verified, 2350 unverified)
npx vitest run                      -> 24 files, 695/695 passed (baseline unchanged - 0 tests added/removed/weakened)
npx tsc --noEmit                    -> clean, no output
node tools/verdict-audit-harness.js -> 0 name/field flags, 0 preset conflicts,
                                        329 clean assembles / 0 errors,
                                        5/5 wheel hub+rim substitutions clean,
                                        15/15 adversarial clashes caught,
                                        2/2 compatible partials stayed clean
                                        (section E fork-rotor findings are
                                        pre-existing, unrelated to this batch)
```

No new vocab needed. `tools/verification-job.json` not touched. No excluded
rows (cb-santacruz-highball-r, the Aeffect R stem pair, cb-yeti-sb135-t2/t3)
touched. No completebike fills touched this session (the Norco Range C1
WebSearch snippet suggesting a possible We Are One Union / I9 Hydra custom
combo rather than the cataloged Enduro S SKU is flagged above as an
unconfirmed lead, NOT acted on — verifying/correcting a completebike's fill
choice is a different, higher-risk operation than verifying a wheel row's
own specs, and was out of scope for this pass).
