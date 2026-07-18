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
