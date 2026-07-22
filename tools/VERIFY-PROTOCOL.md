# VERIFY-PROTOCOL — how to verify catalog parts (resumable across sessions & models)

This document is the **verification logic**. The job state/queue is managed by
`tools/verify-job.js` (no logic in there). Together they make the job fully
resumable: any AI model or human can pick up exactly where the last session
stopped, with no duplicated work.

## Resuming a session (start here)

```
node tools/verify-job.js status     # where the job stands + what's next
node tools/verify-job.js next 5     # the next work orders (InProgress first)
```

Never assume the job will finish in one session. Every part is an independent
unit of work; state is saved to disk after every part.

## The verification bar (from CLAUDE.md — do not lower it)

A part may be marked `verified:true` in `src/compat.js` ONLY when **all** hold:

1. You **fetched the manufacturer's own product/spec page** (not a retailer,
   not a review) in this session and it confirms the part's interface specs.
   **Interfaces are ALWAYS manufacturer-sourced — no exceptions.**
2. The part has a trustworthy **weight** for the config you catalog — either:
   - **(a)** the manufacturer page states it (the default; leave `sourceType`
     absent), or
   - **(b)** *(policy decided 2026-07, DATA-MODEL-REVIEW §5.1-13)* a
     **reputable third-party MEASURED weight** exists for the exact SKU: set
     `sourceType:'measured'` + `weightSource:'https://…'` (the measured
     figure's URL — validator-enforced). This is for the categories whose
     makers publish no weights (Shimano components, **SRAM rotors — this is
     what makes the rotor batch verifiable at all**); prefer (a) whenever it
     exists. "Reputable measured" = a scale photo / lab-measured figure for
     the exact SKU (e.g. a major outlet's verified-weight database), never a
     retailer listing — `sourceType:'retailer'` is validator-REJECTED on
     verified rows.
   If neither exists, the part CANNOT be verified — mark it `Skipped` with a
   note (policy, not failure) — **except in the interface-verification
   categories below**, where the weight may stay nominal. Fork weights are generation-ambiguous; brake
   weights are hose/config-dependent — note the quoted config in `desc`
   (weight-basis conventions live in DATA-ENTRY-TEMPLATE.md §5, e.g. coil
   shocks weigh in WITHOUT spring; `soldWithout` records what's excluded).
3. You set the catalog fields **to match the source** (price = US MSRP in USD —
   but see the PRICE RULE immediately below, it does NOT block verification),
   weight, and every interface field), using the vocabularies in
   `src/schema.js` — plus the capture-opportunistically fields the page shows
   anyway (`family`/`gen`/`mfgPn`, frame `maxTire`/`sizes`, `status` if
   discontinued/recalled, `supersededBy` when a newer generation exists).
4. You add all three provenance fields: `verified:true`,
   `lastChecked:'YYYY-MM-DD'` (today, never future), `source:'https://…'`
   (the fetched manufacturer URL).
5. **Archive step (source rot is real — a stored OneUp URL silently started
   serving the next generation's page):** when practical, save the page to
   the Wayback Machine (`https://web.archive.org/save/<url>`) and record the
   snapshot in `archiveUrl`. Optional, but do it for load-bearing sources.

### ★ THE PRICE RULE — price NEVER blocks verification (FORMALIZED 2026-07-18, Douglas)

**`verified:true` is a claim about INTERFACES and WEIGHT. It has never been, and is not, a claim
that `price` is a maker-published US MSRP.**

Established by the 2026-07-18 verified-flag integrity audit
(`tools/VERIFIED-FLAG-AUDIT-2026-07-18.md`), which found **1,000+ verified rows carrying honestly
disclosed sample/converted prices** under a self-citing precedent chain: SRAM publishes no MSRP at
all, the entire Shimano handbook set is spec-only, and many European makers publish EUR/GBP RRP
with no US price. Those rows are correct data honestly labeled — demoting four digits of rows over
a field the badge was never claiming would have destroyed far more truth than it created.

**The rule:**
1. **A missing or non-US-MSRP price NEVER blocks `verified:true`**, provided interfaces and weight
   meet their own bars.
2. **The basis MUST be stated in `desc`** — e.g. "EUR 30.90 RRP converted to a $34 USD sample, no
   US price published", "same-tier sample, no MSRP on the page". An undisclosed price basis is
   still a defect; the honesty is what makes the row acceptable.
3. **A price that belongs to a DIFFERENT PRODUCT is always disqualifying** (a complete bike's price
   on a frame row — the `fr-devinci-troy-st` class). That is not a sample, it is a wrong value.
4. **Never invent a number with no basis.** A blank beats a fabricated price.
5. Where a real US MSRP exists on the fetched page, use it — this rule is a floor for the cases
   where it doesn't exist, not a licence to skip looking.

**User-facing consequence (shipped 2026-07-18):** the app's verified-badge legend now reads
"✓ Verified = interfaces & weight checked vs manufacturer spec (price may be a sample)", so the
badge no longer overclaims price to riders. Keep those two facts in sync — if this rule ever
changes, the legend changes with it.

### ★ `priceBasis` — STATE THE PRICE BASIS ON EVERY NEW VERIFIED ROW (Douglas, 2026-07-22)

Douglas's ruling: **"make it so verified means the pricing was verified too."** This AMENDS the
PRICE RULE above — it does not overturn it. The prose basis that rule already demands in `desc`
becomes a **machine-readable field**, so the claim is checkable instead of buried in a sentence.

**The field.** Optional `priceBasis` on every catalog's part shape (`src/schema.js` +
`src/types.js`, mirrored into `schema-bmx/road/gravel/emtb/strider.js`; kit rides `schema.js`).
One enum everywhere:

| value | when to use it |
|---|---|
| `msrp-confirmed` | **the norm** — the maker's own US MSRP, read off the same fetched page you verified the spec against |
| `discontinued-no-msrp` | the maker no longer publishes a price for it |
| `oe-only-no-msrp` | OE/OEM-only part, never sold at a consumer MSRP |
| `regional-conversion` | the maker publishes a non-USD price only; the USD figure is a disclosed conversion |
| `bundle-split-estimate` | the maker prices only a combined SKU (the ratified shift-brake exception's shape) |

The four non-`msrp-confirmed` values are the **disclosed exception classes** — they are exactly
the cases the 2026-07-18 audit protected (EUR RRP with no US price, spec-only handbooks, OE parts).
Those 1,000+ honestly-labeled rows get **backfilled to an exception token, never demoted**.

**THE RULE FOR NEW WORK — from now on, every row you promote to `verified:true` MUST set
`priceBasis`.** Pick `msrp-confirmed` when the fetched page shows a real US MSRP and you used it;
otherwise pick the exception class that is actually true. Keep stating the basis in `desc` too —
the prose carries the detail (the actual EUR figure, the conversion, which bundle), the field
carries the class.

**Validator behavior (staged — read this before you panic at a red gate):**

* `priceBasis` on an **unverified** row is an **ERROR**. A basis is a claim; claims ride on
  verified rows only. (`verified:true` already forces a real source URL + non-future date, which
  is what makes `msrp-confirmed` mean "read off *that* page".)
* An out-of-vocab value is an **ERROR**.
* A **verified row with NO `priceBasis`** is, *for now*, a **WARNING-tier count**, printed by
  `node validate.js` next to the verified counts:
  `DATA OK - 5062 parts, 0 problems (3343 verified, 1719 unverified, 3343 verified row(s) still lack priceBasis).`
  That trailing figure is the **backfill burndown**, one per catalog. It never fails the gate.
* When every catalog's burndown reaches **0**, the coordinator flips `PRICE_BASIS_STRICT` (one
  clearly-marked constant per validator — `grep PRICE_BASIS_STRICT`) and the missing case becomes
  a hard error. **Do not flip it yourself**; flipping early turns `validate.js` red for thousands
  of rows and blocks all catalog work.

**`priceBasis` NEVER feeds a compatibility rule** in any engine — display/annotation only, the
same contract as `disciplines`. A price fact must never move a fit verdict.

**User-facing consequence (shipped with this change):** each part's ✓ badge tooltip now states its
own price basis — "price: MSRP confirmed against the manufacturer", a named exception phrase, or
"price: sample — not verified" (what nearly every verified row says until the backfill runs).
Wording is centralized in `src/pricing.js` (`priceBasisLabel`) and shared by all six pages. The
legend in `index.html` was amended to match — **same sync obligation as the rule above.**

### Interface verification — categories whose makers publish no per-SKU weights

*(policy decided 2026-07-12, Douglas via coordinator; it formalizes the
convention the shock waves already ran on — most verified shocks carry
nominal weights. It does not relitigate existing rows.)*

For a category whose manufacturers publish full interface data but **no
per-SKU weights** (rear shocks are the exemplar: the maker states the exact
eye × stroke, mount and spring type per purchasable SKU, but at best one
"starting weight" not tied to the size), `verified:true` attests that the
**INTERFACE fields — the ones `checkBuild` reads (eye/stroke/mount/spring
etc.) — plus provenance are manufacturer-confirmed** per bar item 1. The
**weight may remain a nominal/sample figure** in that case; say so in `desc`
and note the basis (e.g. scaled from a sibling size). When a real per-SKU
weight source *does* exist, bar item 2 applies unchanged — maker-stated, or
`sourceType:'measured'` + `weightSource`. This never lowers the interface
bar (item 1 has no exceptions), and it does not apply where the maker does
publish per-SKU weights (SRAM drivetrain): there a wrong weight still blocks
verification.

Corrections without verification are still valuable: if a spec is wrong but
the weight bar can't be met, fix the spec, leave the part unverified, and
record the outcome as `Skipped` with a note.

**Extended to wheels (Douglas 2026-07-14, via coordinator):** the same interface-verification
exception applies to wheel rows whose maker confirms the full interface set (wheel size, hub
spacing, freehub, rotor mount, internal width, max/min tire) but never publishes a per-wheel or
per-pair weight split — DT Swiss's combined "from Xg" set-weight pattern is the exemplar. Nominal
weight stays, noted in `desc` with the basis, exactly as for shocks.

**Extended to Shimano MECHANICAL MTB components (Douglas 2026-07-20, via coordinator — chip "MTB
TAIL 3"):** the same interface-verification exception now applies to Shimano **mechanical
(non-Di2/non-electronic) MTB** rows — brakes, rotors, bottom brackets, cassettes, derailleurs,
shifters, cranksets — whose `productinfo.shimano.com` per-SKU specifications-handbook page (or a
`bike.shimano.com` product page) confirms the full interface set (mount/pistons for brakes;
shell/spindle for BBs; system/speeds/freehub/minCog/maxCog for cassettes;
system/speeds/actuation/maxCog/mount for derailleurs; system/speeds/actuation/clampType for
shifters; bb/ring/ringStd/speeds/chainline for cranksets) but publishes **no per-SKU weight** —
Shimano's long-established policy for this tier (already noted elsewhere in this doc and in
CLAUDE.md). `verified:true` attests the **interfaces** per bar item 1 (no exceptions there); the
**weight stays a nominal/sample figure**, its basis stated in `desc` (e.g. "no maker weight
published — Shimano mechanical MTB policy; nominal figure, see [source]"). Check for a real
**measured** weight FIRST (`sourceType:'measured'` + `weightSource`, bar item 2b, reputable
editorial/lab source — never a retailer) — a real weight always wins over a nominal one; only fall
back to nominal when no measured figure exists. This does not apply to Shimano Di2/electronic MTB
parts or to non-MTB Shimano tiers, and it does not relax item 1 — every interface field an actual
engine rule reads must still come from a fetched manufacturer page, never a search summary.

**Extended to forks (Douglas 2026-07-17, via coordinator):** the same exception now applies to
fork rows whose maker confirms the full interface set (wheel size, travel, axle, steerer, brake
mount, max/min rotor) but publishes no weight for that exact travel/wheel/damper configuration —
the long-standing fork blocker (RockShox model pages list one reference figure never tied to the
catalog row's travel point; Fox/budget-tier pages often none). `verified:true` attests the
interfaces; the weight stays nominal with its basis in `desc` (scaled from a stated sibling
config, or the maker's unqualified reference figure labeled as such). Where a per-config weight
IS published (some SRAM service pages state it for an exact config — the Lyrik Select+ 160
precedent) or a `sourceType:'measured'` figure exists, those still win, unchanged. This retires
the blanket "forks deliberately flagged" freeze: fork rows may now verify on the same terms as
shocks and wheels.

**KIT APPAREL — weight NOT required at all (Douglas 2026-07-19, via coordinator): "I don't
think we need weights on kit apparel aside from helmets."** For kit-catalog (`src/kit.js`)
apparel rows — jerseys, shorts/pants, gloves, armor/protection, eyewear, shoes, and any other
worn-gear category — `verified:true` requires provenance + the row's real fields
manufacturer-confirmed, and the **weight may be absent or a sample with no exception paperwork
needed** (the kit catalog has zero engine rules, so nothing downstream reads it). **HELMETS are
the one exception: weight still matters there** (riders shop helmets by weight) — helmet rows
follow the normal bar incl. the `sourceType:'measured'` route where makers publish none. This
supersedes the 2026-07-19 kit-tail wave's apparel weight-walls: those rows may re-verify on a
maker-page fetch alone.

**REFINED same day (Douglas 2026-07-19): err on the side of MORE accurate info, never less.**
"If people care about the weights of shoes or any other category, let's include it… It doesn't
mean we have to blow up the interfaces with nonsense no one cares about though." Operating rule:
an ACCURATE weight (maker-stated or `sourceType:'measured'`) is WELCOME on every kit row and
should be captured whenever a pass encounters one — absence just never *blocks* apparel
verification. Never a fabricated or retailer-guessed figure (unchanged). Which categories'
weights get surfaced prominently in the UI (vs stored quietly on the row) is a separate display
decision informed by the expert weight-materiality consult — data-gathering is liberal,
interface real estate is curated.

**Extended to FRAMES — including complete-bike-only frames (Douglas 2026-07-20, "yes, with the
conditions above"):** a frame row may carry `verified:true` on **interfaces alone** — every
engine-read field (BB, head tube, brake mounts, axle/dropouts, seat tube, shock fit where
applicable) manufacturer-confirmed — in BOTH of these cases:
(a) the frame is sold standalone but the maker publishes no frame-only weight (the long-standing
frames practice, now formalized — closes the verified-flag audit's "unwritten exception" flag);
(b) **the frame exists ONLY inside a complete bike** (Haro/Mongoose/Sunday pattern): no frame
SKU, so no frame-only weight or price will ever exist.
THE CONDITIONS (mandatory, all three): (1) interfaces sourced from the EXACT complete bike's
fetched maker page (or the frameset page for case a); (2) weight stays blank or an
honestly-labeled sample with its basis stated in `desc` — never invented, and THE PRICE RULE
covers the missing MSRP; (3) for case (b) the `desc` MUST state the frame is sold as a complete
bike only, so no shopper reads the badge as "you can buy this bare." Interfaces feeding
error-tier rules keep the no-exceptions bar; this never relaxes item 1.

**Extended to BMX small parts (Douglas 2026-07-20, via the wave-7 dispatch):** the same
interface-verification exception now covers `data/bmx.js` rows — mainly the Odyssey/Cult
small-parts pool wave 2 had documented as blocked — whose maker publishes full interface specs
(spindle/shell, teeth, diameter, pitch, driver, mount, etc.) but only a shipping/packaged weight
via its Shopify JSON `weight` field, never a real net product weight. `verified:true` attests the
**interfaces** per bar item 1 (no exceptions there — every field an actual `checkBmxBuild` rule
reads must still be raw-confirmed against the maker's own page, never a WebSearch summary); the
**weight field never takes the shipping-weight figure** — it stays the existing sample, with the
basis ("maker publishes shipping weight only" / "no maker weight published") stated in the row's
`note`. Two BMX-specific wrinkles this wave surfaced, useful for future passes: (1) several
`data/bmx.js` fields the schema requires are actually **display-only in `checkBmxBuild`**
(fork/headset `steerer`/`fit`, handlebar/stem `clamp`, gyro `steererFit`/`cableRouting`) — an
unconfirmed value there does not block verification, only fields an actual rule reads do (chain/
sprocket/cog `pitch`, wheel `wheelSize`/`axle`, fork/frame `brakeMount`, seat/seatpost `system`
are the real load-bearing ones); (2) a Shopify product's `tags` array can carry a structured spec
line (e.g. `"Brake Mounts:None"`) straight from the maker's own product-organization metadata —
worth checking alongside the description text, and unlike a WebSearch summary it's raw first-party
JSON, not a fabrication risk.

**Extended to BUNDLED SHIFT-BRAKE SYSTEMS (Douglas 2026-07-21, by dispatching the road-10 chip):**
the same interface-verification exception now covers **road hydraulic shift-brake lever rows**
(`data/road.js` and any future `data/gravel.js` analog) that a maker sells only as one lever+caliper
SKU, with no per-unit price or weight ever published — the SRAM RED/Rival/Apex AXS-and-mechanical
"shift-brake system" pattern (e.g. `ED-RED-E1`, `ED-RIV-E1`), where this catalog's schema splits one
real bundle across two engine slots (`shifter` + `brake`) purely because `checkBuild` models front/
rear brakes as their own slot. `verified:true` attests the **INTERFACES** — every field the engine
reads (`system`, `speeds`, `actuation`, `brakeSystem`, `mount` — no exceptions there, raw-confirmed
on the maker's own bundle page each session, never a search summary); **per-slot PRICE** stays an
honestly labeled ESTIMATE that sums to the real bundle MSRP (never claims a per-unit MSRP — THE
PRICE RULE governs the split itself, not just its presence); **per-slot WEIGHT** stays a nominal/
sample figure with its basis stated in the row's `note` ("maker publishes bundle-only weight" / "no
weight published at all"). A wrinkle this wave surfaced: not every maker bundles by SHIFTER-VS-
CALIPER slot — SRAM's mechanical Apex line instead bundles by SIDE (`SD-APX-D1` = right shift-brake
lever+caliper, `DB-APX-D1` = left brake-only lever+caliper, no pair-covering SKU at all). The
exception still applies: re-split proportionally across the two engine slots so they sum to the
real total of both side-SKUs, and document the per-side shape in `note` so a future pass isn't
misled into thinking a pair bundle exists. This does not relax item 1 for any other field, and does
not apply where a maker DOES publish a clean per-unit price/weight (use that instead).

**Extended to SEATPOSTS (Douglas, ruled directly in chat 2026-07-22 — the SEVENTH exception
class):** rigid seatposts across every catalog. Rationale: weight is not engine-read for the
category (only `diameter`/`setback`/`proprietary`+`forFrames` feed any compat rule), and makers
frequently publish no seatpost weight at all (trekbikes' KVF page and cannondale.com's SAVE page
both lack a weight field entirely). `verified:true` attests the INTERFACES — every engine-read
field raw-confirmed on the maker's own page; WEIGHT stays a disclosed sample with its basis in
the `note`. First applications (promoted at ratification): `sp-trek-domane-slr-kvf`,
`sp-cannondale-synapse-save` (data/road.js). As with every exception class: does not relax the
interface bar, does not apply where the maker DOES publish a weight (use it — e.g. the Giant
Variant post's maker-stated 195g).

### JS-rendered ≠ bot-walled (kit wave 3, 2026-07-19 — try the browser pane before declaring a wall)

**specialized.com and 100percent.com defeat WebFetch/Exa but render CLEANLY in the browser
pane** — they are JS-rendered SPAs, not anti-bot walls, squarely in the FETCH ETHICS "allowed"
lane (rendering JS is just being a browser). Do not burn budget re-proving the WebFetch 403,
and do not mark these brands Walled: go straight to `preview_start {url}` + `javascript_tool`
reading `document.body.innerText`. NOTE FOR THE FRAMES BACKLOG: the long-standing
"Specialized/Trek frames fetch-walled" blocker should be re-tested through this lane before
being repeated — the kit wave proved at least specialized.com's product pages readable.

### ★ THE PHANTOM-NUMBER HAZARD (BMX wave 2, 2026-07-19 — treat fetched figures as leads)

WebSearch/WebFetch summaries have now been caught REPORTING SPECIFIC WEIGHT FIGURES that do not
exist on the cited manufacturer page — two of them exactly matching the catalog's own pre-existing
UNVERIFIED SAMPLE values, i.e. the summarizer reproduced a familiar-looking number instead of
reading the page. Before committing any weight (or other load-bearing figure) sourced through a
fetch/search summary, CROSS-CHECK it against the raw page (`curl <url> | grep`, or the browser
pane's `document.body.innerText`) — the number must be literally present. A summary-reported
figure is a LEAD, never a source. Related trap, same wave: **Shopify storefronts' product-JSON
`weight` field is often a SHIPPING-weight bucket, not net product weight** (proved on Odyssey/
Cult; a pedal pair listed at 1361g vs the real ~350-550g) — the Shopify `/products/X.js` trick
remains gold for interfaces/variants, but its grams are only trustworthy where they vary
per-variant and pass a sanity check.

## Per-part loop (persist before moving on)

For each work order from `next`:

1. `node tools/verify-job.js start <id>`   (marks InProgress — crash marker)
2. Research: WebSearch → WebFetch the manufacturer page. Config-dependent
   specs (freehub choices, rotor-mount options): catalog the STOCK config, or
   keep the current value if it is one of the valid options; note it.
3. Edit `src/compat.js` (this persists the data change to disk).
4. Gate: `node validate.js` must stay at 0 problems (it enforces the
   provenance rules). If the edit touched anything the engine reads, also run
   `npm test`.
5. `node tools/verify-job.js complete <id> Failed --error "..."` or
   `... Skipped --note "why"`. For **Verified** outcomes you usually don't
   need `complete` at all: the runner auto-promotes any part whose catalog
   entry gained `verified:true` (the catalog is the source of truth), and
   will refuse a redundant manual complete. State is written atomically to
   disk before the next part begins either way.

Outcome meanings: **Verified** = bar met. **Failed** = transient (fetch error,
conflicting sources) — retry later via `reset --failed`. **Skipped** = the bar
cannot be met for a documented reason — do not retry unless policy changes.

## Batching & commits

- Work in batches (`batchSize` in the state file, default 25; small categories
  = one batch). After each batch: run the full gates (`node validate.js`,
  `npm test`, `npm run typecheck`), then `git commit` the catalog + state
  together, then print `node tools/verify-job.js status` as the batch summary.
- Interrupted mid-batch? Nothing is lost: completed parts are already on disk
  and in state. Commit whatever is clean on resume.

## Idempotency rules

- Never reprocess a `Verified` part — the runner refuses without `--force`.
- The runner auto-promotes parts that are already `verified:true` in the
  catalog, so re-running `init`/`status` never creates duplicate work.
- Adding new parts to the catalog: run `init` afterwards — they join the queue
  as `Pending` automatically.

## Wrap-up

```
node tools/verify-job.js report     # totals, success rate, failed items
node tools/verify-job.js retry     # the retry list + retry command
```

## PDF sources — poppler IS installed (2026-07-16, Douglas-approved capability note)

**Do not re-report "poppler-utils not installed" — it is present and on PATH in Git Bash:**
poppler 25.07.0 (winget `oschwartz10612.Poppler`) — `pdftotext`, `pdfinfo`, `pdftoppm` + 10 more
all resolve in bash (`which pdfinfo`). Git-for-Windows also bundles an Xpdf `pdftotext` 4.06 at
`/mingw64/bin` (first on PATH; fine for plain text extraction). If a PowerShell context can't see
them, call the full path:
`C:\Users\Douglas\AppData\Local\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin\`
Workflow for PDF-published specs (Shimano archive editions, SRAM spec sheets, Continental Tire
Range): `curl -sL -o x.pdf <url> && pdftotext -layout x.pdf -` (the `-layout` flag preserves
spec-table columns). ~48 Shimano rows + the SRAM/Continental PDF classes in the price-drift
remainder queue (tools/price-drift-2-progress.md) are unblocked by this.
(web.archive.org remains unreachable from this environment — that half of the gap stands.)

## Bright Data unblocker — INSTALLED + AUTHED (2026-07-17, Douglas)

The fetch-wall era is over for most targets. The `bdata` CLI (Bright Data,
`@brightdata/cli`, authenticated, zones `cli_unlocker`/`cli_browser`) is available
in bash:

## ★★★ FETCH ETHICS — DOUGLAS'S RULING 2026-07-18. READ BEFORE ANY FETCH. ★★★

**"Let's keep it ethical so as not to upset any partners."** — Douglas, 2026-07-18, on being
shown that the Bright Data Web Unlocker's function is **bot-detection / CAPTCHA bypass**.

**THE RULE: we do not defeat anti-bot protection. Ever, on any brand.** Not for a spec, not for a
price, not to close a verification. This is a values decision AND a business one: the makers behind
the hardest bot-walls are precisely the brands the Partnerships lane is preparing to ask for
licensing and image rights. Being detected circumventing a brand's protection while asking to
become their partner is self-defeating in exactly the way the Tier-B image analysis was.

### The distinction that makes this cheap to honor

**Rendering JavaScript is NOT circumvention. Defeating a bot-wall IS.** Most "walls" in this
project were only the former:

| Wall type | Example | Allowed tool |
|---|---|---|
| **JS-rendered content** (specs load client-side) | Pivot, Trek, Giant, Ibis, Yeti, Michelin, Cannondale | ✅ **Browser pane** (`preview_start {url}` + `javascript_tool`) or Exa — a normal browser loading a public page, same as a rider |
| **Anti-bot / CAPTCHA / 403 challenge** | specialized.com's 403, DataDome/Akamai class | ❌ **Do not circumvent.** Enter the row as honest unverified sample data |

**PROVEN 2026-07-18:** the plain browser pane rendered pivotcycles.com's full build-tier pricing
($8,999 / $7,399 / $6,699 / $6,499, tiers named) on a page a worker had reported as
"JS-loaded and uncaptured even under `bdata scrape`." The clean path **outperformed** the unlocker.

### Fetch order (use in this order, stop at the first that works)

1. **WebFetch** — open pages. Always first.
2. **Exa MCP** (`web_fetch_exa`) — JS-rendered pages; batches URLs.
3. **Browser pane** — `preview_start {url:"…"}` then `javascript_tool` to read `document.body.innerText`.
   Best for JS-heavy maker pages and Shopify `/collections/<model>` build-tier lists. Close the tab
   when done.
4. **`bdata search`** — SERP lookup to FIND a product URL. This is a search query, not
   circumvention, and remains fine.
5. **STOP.** If a page is behind an active anti-bot challenge, that is a **documented wall, not a
   task**: mark the row `Skipped`/`Failed` with the wall named, or enter it as unverified sample
   data per the relaxed-inclusion policy. Say so plainly in your report.

**`bdata scrape` (Web Unlocker) is RETIRED from routine use** by this ruling. Do not use it to
defeat a challenge. Do not add it back to a worker brief. **If the ethical path ever becomes a
genuine roadblock — a whole category stalls and it materially hurts the catalog — Douglas asked to
be told so he can revisit the call.** Escalate it to him as a decision, never route around it.
`bdata browser` remains off entirely (it also bills real money).

_(Historical: `bdata scrape` was smoke-tested through specialized.com and web.archive.org and was
briefly written into this protocol as "use it freely." That guidance was wrong on the ethics and is
superseded by the ruling above.)_

### ★ BILLING (retained for reference — but see the FETCH ETHICS ruling above)

`bdata search` (SERP lookup, still allowed) draws on a **FREE 5,000-credit/month pool** that renews
monthly. `bdata browser` is NOT free-tier covered and bills real money — do not use it.
**`bdata budget` CANNOT see the free pool** — it reports only the paid/test balance, so a low number
there does NOT mean credits are exhausted (a coordinator misread `balance: 1.39` as exhaustion on
2026-07-18 and wrongly told workers to stop; Douglas corrected it from the dashboard, which showed
4,273 free credits). Never infer free-pool state from the CLI; ask Douglas to check the dashboard.

Newly unlocked wall list to retarget: Specialized (403),
Trek/Giant/Pivot/Yeti (JS-rendered), Fox Racing/Giro/Bell (Vista bot-wall),
Five Ten/Adidas, Bolle, Pearl Izumi, IXS geo-wall, Michelin, and any
`archiveUrl`/Wayback lookup. THE BAR IS UNCHANGED: a bdata-fetched maker page
counts exactly like a WebFetch-fetched one (it IS the maker page); search
snippets still never count.

## Exa — second unblocker, MCP-based (2026-07-17, Douglas)

The Exa connector is authorized: MCP tools `web_search_exa` (semantic search,
clean highlights) + `web_fetch_exa` (full pages as markdown, BATCHES multiple
URLs per call). Load via ToolSearch (query "exa"). SMOKE-TESTED: it renders
trekbikes.com's JS-walled SPEC TABLES (full frameset/fork/drivetrain lists —
independently confirming the Boost141 + Powerspline entries from Trek's own
page). Doctrine: WebFetch first for open pages; Exa next for JS-rendered
walls (Trek/Giant class — and its batch-fetch is efficient for many URLs);
then the BROWSER PANE for anything Exa can't render (`preview_start {url}` +
`javascript_tool`). ~~Bright Data (`bdata scrape`) for the hardest bot-walls~~
— **SUPERSEDED 2026-07-18 by the FETCH ETHICS ruling above: hard bot-walls
(Specialized-403 / DataDome / Akamai class) are NOT to be defeated. They are
documented walls — Skip/Fail with the wall named, or enter the row as honest
unverified sample data.** An Exa- or browser-pane-fetched maker page meets THE
BAR like any fetched maker page; search highlights alone still never count —
follow up with the full fetch.
