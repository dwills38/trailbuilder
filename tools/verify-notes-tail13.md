# verify-notes-tail13 — mtb-tail-13 worker session (2026-07-21)

Scope: unverified MTB rows in `src/compat.js`, categories handlebar/stem/grips/dropper/
seatpost/saddle ONLY. Branch `verify/mtb-tail-13`, worktree
`.claude/worktrees/mtb-tail-13-ebb5d044`.

Starting point: tail-12 covered the big house-brand clusters (Bontrager/Cannondale/
Specialized/PRO/Nukeproof/TranzX/Canyon/Marin) and did NOT reach Giant (16 rows) or the
~90 remaining 1-9-row brands (real aftermarket makers). This session's assignment: Giant,
those ~90 brands, and the two browser-pane candidates (SDG Slater, Newmen configurator).

## Disposition: Giant (16 rows) — fully worked this session

**Key finding: giant-bicycles.com is NOT an OE-only wall.** Several rows tail-12/earlier
sessions marked "no standalone retail SKU page found" DO have standalone US pages — those
notes were stale, not permanent. Re-check giant-bicycles.com per-row before assuming OE-only.

Promoted to verified:true (direct US giant-bicycles.com fetch, USD MSRP + maker weight):
- `sa-giant-romero-sl` ($70→$105, 230g→245g)
- `st-giant-contactsl-xc-35` ($35→$69, weight already exact at 140g)
- `hb-giant-contactslrtrail-ic-35-800` ($120→$550, 220g→255g — full one-piece bar+stem
  unit weight, per the row's existing paired-stem-half convention)
- `dp-giant-contactswitchat-309-140`/`-170` ($180/190→$205, 600/640g→490/550g — page's
  own per-travel-length weight table)
- `dp-giant-contactswitchcore-309-120` ($150→$140, 520g→490g — documents a maker-side
  120mm-vs-125mm travel-label inconsistency between the OE build sheet and the retail SKU)

Corrected but left unverified (retailer-relayed or non-USD manufacturer data):
- `sa-giant-grit-pp`: weight 250g→310g (UK retailer spec-table relay, exact "SHELL: PP"
  match); no USD price found for this specific PP tier (US site only sells SL/SLR tiers)
- `sa-giant-ergocontact-trail`: weight 270g→350g (direct giant-bicycles.com/gb fetch — real
  manufacturer data, but this saddle isn't sold on the US site, so no USD MSRP exists)
- `st-giant-contactsl-35`: price $35→$86 (direct US manufacturer fetch); weight left as
  sample — only a retailer-disclosed figure (bike24.com, "Weight Source: Manufacturer")
  exists, which per this catalog's established precedent corrects a sample but doesn't meet
  THE BAR for verified:true

Re-attempted, no promotable result:
- `gr-giant-soleo`: standalone US page DOES exist (sole-o-bmx-grips-140mm) but no weight,
  and its $12 price is flagged "Clearance" (not a clean MSRP)
- `hb-giant-contacttr-35-800`/`-780` (Contact TR35 alloy bar): real "Contact SL TR35"
  standalone page exists ($85) but SKU-name mapping to this catalog's plain "Contact TR35"
  rows is uncertain (OE build sheets drop the "SL" prefix inconsistently) — not touched to
  avoid a wrong SKU pairing
- `hb-giant-connecttrail-318-780`: giant-bicycles.com/ie lists a DIFFERENT width variant
  (750mm) with no weight; retailer weight (335g) is for yet another width (730mm) — no
  manufacturer weight for the exact 780mm/31.8mm SKU this catalog uses
- `st-giant-sport-7deg-70`: no manufacturer weight found anywhere (only lengths per size)

## Disposition: Race Face + WTB (worked partially this session)

Promoted:
- `sp-raceface-ride-272-400`: $25→$38.99, 230g→295g (direct raceface.com fetch)

Corrected but unverified:
- `st-raceface-aeffect-r-35-40`: price $45→$70.99 (the page DOES show a USD price now — a
  prior "no USD MSRP shown" note was stale); weight held at the documented 149g estimate
  per a prior session's careful, still-valid demotion (raceface.com only publishes one
  weight point, 161g@50mm, and this row is 40mm)
- `dp-raceface-aeffect-r-309-150`: weight 590g→586g against Race Face's own dropper
  fit-guide PDF (hosted on Fox Factory's asset domain — a genuine manufacturer document,
  just not the live product page); price left alone (this session's product-page price
  scrape was garbled/contradictory, not trustworthy)
- `gr-wtb-wavelength-lockon`: price $25→$29.95 (direct wtb.com fetch); weight unchanged (no
  manufacturer figure, only reviewer measurements)
- `sa-wtb-volt-pro`: weight 280g→226g (the prior citation didn't match its own cited
  retailers; tradeinn.com's listing for this exact Medium/Cromoly spec is 226g)

Not re-litigated (already thoroughly researched by prior sessions, re-confirmed this
session, left as-is): `gr-odi-elite-pro` (documented "no measured weight" after a genuine
BikeRadar search), `gr-ergon-gd1-evo` (documented rejection of an untrusted outlet's 116g
figure in favor of keeping the honest sample).

## Not reached this session (in-scope, still Pending)

Given ~100 rows across 25+ real aftermarket brands (Race Face 9, ODI 8, SDG 8, Ergon 7,
Thomson 4, KS/KindShock 6, Prologo 4, Fizik 5, Selle Italia 4, DMR 4, Cane Creek 3, WTB 3,
Wolf Tooth 2, Chromag 3, Renthal 1, Burgtec 3, Title 2, Truvativ/TruVativ 3, X-Fusion 4,
Roval 4, Easton 1, Hope 1, Supacaz 1, ESI 1, BikeYoke 1, Peaty's 1, ANVL 2, Lizard Skins 2,
Fabric 3) plus ~65 more single-brand rows and Giant/Race Face/WTB only partially worked,
this session did not exhaust the assignment. Research already gathered this session for a
future pass (all manufacturer-domain or manufacturer-adjacent, not yet written to the
catalog):

- **Race Face** (raceface.com is fully reachable, real per-model weight tables): Turbine R
  35 handlebar ($129 AUD seen, need USD; 300g@20mm rise, manufacturer-confirmed), Aeffect
  saddle (retailer-only ~239-240g, matches existing sample almost exactly, no raceface.com
  saddle page found — may be discontinued from their current lineup)
- **ODI** (odigrips.com fully reachable, prices match this catalog's existing samples
  almost exactly — `gr-odi-rogue-v21` $32.00 exact, `gr-odi-ag2` $36.25 exact AND its
  per-grip 53g review figure doubles to an exact 106g pair match): the remaining 6 ODI rows
  (Longneck V2.1, Elite Motion, F-1 Vapor/Float, elsewhere) not yet fetched
- **Wolf Tooth** (wolftoothcomponents.com reachable): Echo Lock-On grips weight EXACTLY
  matches the existing 106g sample (manufacturer-confirmed) but price shown was EUR not
  USD this session — needs a US-site price fetch
- **Thomson** (bikethomson.com/thomsonbike.com reachable, real spec tables): Elite 35
  handlebar (~300-315g depending on source, some conflict between 269g/300g/315g across
  retailers — needs a direct manufacturer-page re-fetch to resolve), Elite X4 stem (clean
  per-length weight table found via bike-components.de: 141g@70mm, matches this catalog's
  `st-thomson-elite-x4-318` row's 145g sample closely)
- **Ergon**: SM10 base saddle has ambiguous tier-naming (SM10 vs SM10 Enduro vs SM10 Enduro
  Comp all cite different weights 250-300g) — needs the exact SKU pinned down before
  touching; SM10 Enduro's existing 255g sample already matches ergonbike.com's own
  "smemtb"/enduro variant page (255g) almost exactly

## Browser-pane candidates (not re-attempted this session — time-boxed out)

- `gr-sdg-slater`: tail-12 confirmed genuinely discontinued from sdgcomponents.com (404s to
  homepage, only "Slater Jr" remains) — a real wall, not worth re-trying without a new
  angle (e.g. a Wayback snapshot of the old product page).
- Newmen configurator: tail-12 already resolved this (material correction landed without
  needing the browser pane).

## Syncros (25 rows) — flagged, NOT touched

Syncros (Scott's house-brand component maker) has 25 unverified rows in scope
(handlebar/stem/grips/dropper/seatpost/saddle) — bigger than Giant's 16, and not mentioned
in tail-11's or tail-12's brand breakdowns (a genuine gap, not previously assigned to any
session). This session's assignment was scoped to Giant + the ~90 1-9-row brands, so Syncros
was left for a dedicated future pass — worth prioritizing given its size.

## Gates

`node validate.js`: 0 problems (3297 verified, 1743 unverified — was 3293/1747 verified at
session start on this branch's base). `npm test`: 988 passed. `npx tsc --noEmit`: clean.
Two commits this session (Giant batch, Race Face+WTB batch), both gated individually.
