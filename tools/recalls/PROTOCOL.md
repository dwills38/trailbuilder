# Recall Watchdog — PROTOCOL

The repeatable sweep. Read [`INDEX.md`](INDEX.md) first for the prime directive and corpus
rules — this file is the *how*, that file is the *bar*.

---

## 1. Fetch tooling (same doctrine as the rest of this project)

CPSC.gov 403s plain `WebFetch`. The doctrine from `tools/VERIFY-PROTOCOL.md` applies
unchanged: **WebFetch first → Exa (`web_search_exa` / `web_fetch_exa`) for walled pages →
Bright Data (`bdata scrape`) for the hardest bot-walls and archive.org.** In practice, the
Exa MCP tools cleanly render CPSC.gov recall pages (smoke-tested 2026-07-18 — every
CPSC.gov URL in the first sweep round-tripped through `web_fetch_exa` on the first try) and
manufacturer recall/safety pages, so Exa is the practical first stop for this specific sweep
rather than a fallback. A fetched CPSC.gov page or a fetched manufacturer notice both meet
the bar equally; a search-result snippet never does — always follow up with a fetch of the
actual page before writing a ledger entry.

## 2. Where to sweep

**Regulator databases (primary, always check):**
- `cpsc.gov` — the US regulator; search via `web_search_exa` with queries like
  `"CPSC bicycle recall <year>"`, `"CPSC.gov bicycle recall list <brand>"`, or target a
  specific category (`"CPSC bicycle recall fork"`, `"...crankset"`, `"...wheel"`,
  `"...frame"`) since CPSC's own site search is not reliably fetchable directly.
- Health Canada (`recalls-rappels.canada.ca`), UK OPSS (`gov.uk/product-safety-alerts...`),
  ACCC (`productsafety.gov.au`) — useful corroboration and sometimes catch a recall CPSC
  hasn't posted yet (or vice versa); not required every sweep but worth a pass when a US
  search comes up thin.

**Manufacturer safety/recall pages (primary, check the majors every sweep):**
Component makers whose parts saturate this catalog — SRAM/RockShox (`sram.com/en/service/
recalls`), Shimano (`bike.shimano.com` "Safety Recalls"), Fox (`ridefox.com`), DT Swiss
(`dtswiss.com/en/recall`), FSA. Frame/complete-bike makers with the largest catalog
footprint — Trek, Specialized, Cannondale, Giant, Santa Cruz/Juliana, Yeti, Ibis,
Transition, Pivot, Canyon, Rocky Mountain, Norco, Salsa/QBP, Cervélo, BMC — each keep a
`.../safety-notices`, `.../recalls`, or `.../safety-and-recalls` page; search
`"<brand> bicycle safety recall notices"` to find the live URL since paths vary by brand.

**BMX-specific (relevant now that BMX is building toward go-live per `CLAUDE.md`):** Box
Components, QBP-distributed BMX brands (Stolen, WeThePeople, Eclat, Cult, Fit), GT, Haro,
Mongoose. Kids/balance-bike brands relevant to `data/striders.js`: woom, Cannondale (Dave),
GT (LaBomba), Pacific Cycle/Schwinn/Mongoose.

## 3. What counts as "last ~3 years" and what doesn't

Default window is the **last 3 years from the sweep date** (a recall announced in that
window). A recall from just outside the window is still worth an entry — tag it
`OUTSIDE-WINDOW` in the ledger rather than dropping it — **only if** it involves a model
family that's still heavily cataloged and still plausibly in riders' hands (a flagship
frame platform, a still-sold component family). Don't chase every recall back to 2001;
the RockShox 2001 fork recall and Cannondale's 2011-2015 Lefty OPI steerer are the kind of
thing to skip unless a specific catalog row's `modelYear` lands inside the recalled range.

## 4. Cross-referencing against the catalog

For each recall found, grep the catalog files for the brand and model name(s):

```
src/compat.js        — the live MTB catalog (frames, forks, groupsets, wheels, etc.)
src/kit.js            — rider gear/apparel (helmets, pads — relevant to helmet/apparel recalls)
data/bmx.js           — off-live BMX catalog
data/road.js          — off-live road catalog
data/gravel.js        — off-live gravel catalog
data/striders.js      — off-live balance-bike catalog
data/emtb.js          — off-live e-MTB catalog (separate, contained page per CLAUDE.md)
```

Match on **brand + model name** first (grep is cheap and catches most hits — see the
worked example in `RECALL-LOG.md`'s first sweep, which found real hits this way for Salsa
handlebars, DT Swiss wheels, and the Transition TR11). Where the recall specifies a
model-year or production-date range and the catalog row carries `modelYear`, compare them
directly. Where the catalog row carries no year (common for component-only rows — bars,
wheels, cranksets), record the match as **NAME MATCH, GENERATION UNCONFIRMED** per
`INDEX.md` rule 3 rather than guessing.

Apply the **INDEX.md rule 3 confidence labels** to every hit, including near-misses — a
brand match with no model match is worth a one-line "CHECKED, NO MATCH" note so the next
sweep doesn't re-do the same search from zero.

## 5. Severity ranking + notify rule

Rank each **CONFIRMED MATCH** or **NAME MATCH** by what the recall's own hazard language
says:
- **Stop-ride / crash hazard, currently-cataloged live row** (not a retired/superseded id,
  not off-live-only unless the off-live catalog itself is the exact match) — the one tier
  that's `PushNotification`-worthy per the standing "notify missing tools" /
  push-notification doctrine (see memory: notifications reserved for merges-gone-live,
  decisions-needed, session-errors, credit-exhaustion — a live stop-ride match on a
  currently-sold catalog part is a "decision-needed" case: does this part get pulled or
  flagged?). Say so explicitly to the coordinator.
- **Fall/injury hazard, confirmed or name-matched** — goes in the findings table, coordinator
  reviews on normal cadence, no proactive push.
- **Everything else (CONDITIONAL, CHECKED NO MATCH, OUTSIDE-WINDOW without a strong catalog
  tie)** — ledger record only, informational.

## 6. Re-sweep cadence

**Recommended: quarterly**, plus an ad-hoc sweep whenever a coordinator or session notices a
recall mentioned in passing (a forum thread, a manufacturer email) that isn't yet in the
ledger. Bicycle-industry recalls are infrequent enough (the first sweep found on the order
of 15-20 relevant ones across 3 years, industry-wide) that monthly is overkill and annual
risks a live stop-ride recall sitting unflagged for months. Quarterly matches the cadence of
this project's other periodic audits (the manufacturer-bias audit runs "after big waves +
~monthly" per memory; recalls move slower than catalog bias, so a longer interval is
appropriate). Each re-sweep should log its date at the top of a new section in
`RECALL-LOG.md` rather than only updating individual entries, so the ledger itself shows the
sweep history.

## 7. Writing a ledger entry

Follow the `RCL-n` format already established in `RECALL-LOG.md`. Keep the recall fact and
its catalog cross-reference(s) together under one entry (unlike the mechanic corpus's
facts-vs-recommendations split, a recall *is* the actionable unit — the catalog match is
part of recording it usefully, not a separate judgment call layered on top).
