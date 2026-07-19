# verify-notes-kit.md — src/kit.js verification tail log

Log of dispositions for the kit-catalog verification grind (`src/kit.js` ONLY —
this file, unlike `tools/verification-job.json`, is kit-specific and not
touched by the main-catalog job runner). Bar = THE BAR in the task brief:
fetched manufacturer page (or accepted `sourceType:'measured'` third-party
weight) required for `verified:true`; search snippets never count.

Live count at session start (re-derived, not trusted from the prior estimate):
**714 kit rows, 437 verified / 277 unverified after this session** (started at
436 verified / 278 unverified — matches the "prior estimate was 278 of 714"
note in the brief almost exactly, so the 137/692 figure quoted in the task
prompt was stale).

## Branch: verify/kit-2

### VERIFIED (1)

- **`hm-smith-forefront2-mips`** (Smith Forefront 2 MIPS helmet) — the row
  carried a note from an earlier session (2026-07-17) saying the base model's
  product page 404'd / had dropped off the Shopify sitemap, replaced by the
  Forefront 3. Re-checked 2026-07-18: `https://www.smithoptics.com/en_US/p/helmet/forefront-2-mips%C2%AE-mtb-helmet/FOREFRONT2-HELMET-MATTE-BLACK.html`
  is live and fetched cleanly (via Exa, WebFetch itself 404'd on this specific
  URL encoding — the page is real, just finicky about how the client hits it).
  Confirms: weight 380 g (size M) exactly matching the prior sample value,
  CPSC + CE EN1078 certs, MIPS rotational system, price **$270 USD MSRP**
  (prior sample was $240 — corrected to match the source page; current listing
  shows a $162 sale price but $270 is the stated regular/MSRP price). Removed
  the stale `status:'discontinued'` field since the page is live. Set
  `verified:true`, `lastChecked:'2026-07-18'`, `source`. Committed on its own
  (brand: Smith).

### WALLS HIT / STILL UNVERIFIED (recorded so the next session doesn't re-tread)

- **Race Face** (jerseys/pants/gloves/armor, 6 rows): current raceface.com
  catalog has moved on from several catalogued SKUs — `Diffuse SS Jersey`
  (site now lists LS only), `Khyber Glove` (not found in the current gloves
  collection at all — likely discontinued/renamed). Apparel weight is not
  published on raceface.com product pages generally (confirmed by browsing
  the Trigger/Ruxton/Indy pages' visible content — spec sections show fabric
  and fit, never grams). Left unverified; a future pass should re-derive
  current-generation model names before attempting rather than assuming the
  catalogued name still matches a live SKU.
- **100%** (14 rows, eyewear + apparel + protection): eyewear product URLs
  guessed from the model name (`/products/s3`, `/products/speedcraft`, etc.)
  do not resolve to the actual SKU pages — 100percent.com's real slugs are
  colorway-specific (e.g. `/products/a2-aspire-matte-white-...`) and the
  legacy S3/Speedcraft/Racecraft2 models don't obviously map to a current
  slug without manual browsing per model. Also hit a 429 (rate limit, not a
  bot-wall) on two direct WebFetch attempts. The Ridecamp Knee Guard page DID
  fetch cleanly but its visible/cached content didn't include a weight figure
  (may be further down the page in a spec accordion not captured by the
  fetch). Left unverified — a fresh session with fresh rate-limit budget and
  patience for slug-hunting could likely clear several of these.
- **Sweet Protection** (Ronin, Clockwork eyewear): both models appear to have
  aged out of the *current* sweetprotection.com eyewear lineup (fetching
  `/eyewear/` today lists Shinobi/Memento/Falconer-family products, no
  Ronin/Clockwork). A WebSearch snippet claimed "31g" for Ronin but per THE
  BAR a search snippet is not a fetched page, so this was NOT recorded — left
  unverified rather than trust the snippet.
- **POC** (elbow/knee/armor, 7 rows): fetched `pocsports.com/products/joint-vpd-air-elbow`
  successfully (450 g **per pair**, size M) — but the catalog row is
  `elp-poc-joint-vpd-air-plus` ("Joint VPD Air**+** Elbow"), a different,
  apparently older/discontinued generation not in POC's current lineup (only
  "Joint VPD Air", "Joint VPD 2.0", and "VPD Air Flow" are live now). Did NOT
  verify the row against the wrong product's page — recording the mismatch so
  a future session doesn't repeat the fetch and can instead decide whether to
  correct the model name to the current "Joint VPD Air Elbow" (family/gen
  change, not just a provenance fill) or leave it as a discontinued sample row.
- **Leatt** (13 rows): Velocity 4.0 eyewear pages fetch fine but do not state
  a weight figure in their spec bullets (confirmed via WebSearch summary of
  the actual page content, several product variants checked). Apparel rows
  in this brand almost certainly hit the same "no published weight" wall as
  every other apparel maker checked this session.
- **Bontrager** (3 shoe rows): trekbikes.com is JS-rendered; Exa's cached
  fetch of the Flatline shoe page returned only nav/cross-sell content, no
  spec table, likely because the specs load into a tab/accordion the crawl
  snapshot didn't expand. Would need the browser pane (`preview_start` +
  `javascript_tool`) to get the live DOM — not attempted this session due to
  time budget; flagged for a follow-up session.
- **Shimano shoes** (9 rows) — CLAUDE.md already documents Shimano doesn't
  publish component weights; tested whether shoe pages differ (they might,
  since shoes are a "measured" product like a helmet). The SH-ME702 URL found
  via WebSearch actually 301/redirected to the bike.shimano.com homepage on
  fetch (stale/removed product slug) rather than showing a spec page — a dead
  link, not a bot-wall. Left unverified; would need fresh URL discovery.
- **General apparel pattern (jerseys/shorts/pants/gloves) across every brand
  sampled this session** (Race Face, 100%, Sweet Protection, Endura, Troy Lee
  Designs, iXS): none of the maker sites checked publish a per-garment weight
  figure on the retail product page — consistent with the CLAUDE.md-documented
  pattern for Shimano components and SRAM rotors (some categories just don't
  get maker weights). These rows likely need the `sourceType:'measured'`
  third-party-weight route (a teardown/review site with a scale) rather than
  ever finding it on a maker page — same policy already used for Shimano/SRAM
  rotor rows in the main catalog. Flagging this as a process note for
  whoever picks the job back up: apparel weight verification may need the
  measured-weight route by default, not a repeated search for a maker figure
  that doesn't exist.

## Summary this session

- Verified: **1** row (Smith, helmet category).
- Rows attempted and left honestly unverified (wall documented above): ~10
  spanning Race Face, 100%, Sweet Protection, POC, Leatt, Bontrager, Shimano.
- No data corrections beyond the Smith row's price/status/certs fix (which
  was part of verifying it).
- No new vocab needed.
- Gates: `node validate.js` 0 problems, `npm test` 764/764 passed,
  `npx tsc --noEmit` clean — all after the single Smith commit.

## Recommendation for the next kit-verification session (superseded below — see verify/kit-3)

Given how thin the yield was per-brand this session (mostly apparel, which
doesn't publish weight, and several catalogued model names that have aged
out of current lineups), the highest-value next targets are:
1. **Helmets and shoes** across the remaining unverified brands (iXS, Fox,
   Alpinestars, Sidi, MET, Lazer, Giant, Bontrager) — these categories are
   the ones that reliably publish weight, per this session's one hit.
   `node -e "console.log(require('./src/kit.js').KIT_PARTS.filter(p=>!p.verified && ['helmet','shoes'].includes(p.cat)).map(p=>p.id))"`
   is a fast way to pull that worklist.
2. **Eyewear** (sunglasses/goggles) as a second tier — POC/100%/Smith/Leatt
   sunglasses pages do sometimes state weight, but require careful slug
   discovery per exact SKU (colorway-specific URLs are common on Shopify
   storefronts).
3. Apparel (jersey/shorts/pants/gloves/armor) should probably be deprioritized
   in favor of a deliberate `sourceType:'measured'` pass (BikeRadar/MBR/
   Bikerumor teardowns) once Douglas/coordinator confirms that's the intended
   route for this category class, mirroring the Shimano/SRAM-rotor precedent.

**This recommendation is now superseded.** Later on 2026-07-19, Douglas ruled that kit
apparel (jerseys, shorts, gloves, armor, eyewear, shoes) verifies on provenance + confirmed
fields ALONE — no weight required (`tools/VERIFY-PROTOCOL.md`, "KIT APPAREL" section).
Helmets keep the normal weight bar. This unblocked most of the "no published weight" walls
recorded above. See the `verify/kit-3` section below for the wave that used the new bar.

---

# verify/kit-3 (2026-07-19) — apparel-bar wave

Ran under the new KIT APPAREL rule above. Worked the highest-yield unverified brand
clusters in `src/kit.js`, highest count first: iXS (18), Specialized (16), 100% (14), Leatt
(13), then a partial pass on Shimano shoes (9). **Result: 437 -> 470 verified (277 -> 244
unverified), +33 net across the session**, plus real corrections/discontinuation findings
on rows that stayed unverified. Full detail in the file's top section
("Kit verification notes ...") above this line — that section documents the same wave.

Key process notes that weren't obvious going in:
- **specialized.com and 100percent.com both 403/crawl-fail WebFetch and Exa, but the
  browser pane (`preview_start`/`navigate` + `get_page_text`) renders them cleanly.** This
  resolved two of the four brand-level "wall" entries recorded in the kit-2 log above
  (100% and, by extension, any other Shopify-storefront brand hitting the same JS-render
  wall). Neither site is an anti-bot CAPTCHA wall — they're just JS-rendered, which is
  explicitly the allowed lane per the FETCH ETHICS ruling.
- `read_page`/`find` frequently return an empty/0x0 tree on these Shopify sites even when
  `get_page_text` works fine on the same page — go straight to `get_page_text`, don't
  retry `read_page`.
- Regional storefronts of the same brand (100percent.eu, mtb.leatt.ch, mtb.leatt.com.au)
  are legitimate manufacturer sources when a SKU has been pulled from the US site — cite
  them with the currency-conversion basis stated in `desc`, same as any other non-US price.
- Leatt in particular refreshes SKU generations fast (V21->V23 shorts, Obsolete->back-in-
  stock ProFlat 3.0) — a "discontinued" note from even 2-3 days earlier can already be stale.
- The Shimano 700-tier shoe line (ME702, XC702/XC703) appears to have been pulled entirely
  in the ~2 days since the kit-2 log's WALLS entry above was written; not worth re-attempting
  the exact old model numbers again without first re-deriving Shimano's current shoe names.
