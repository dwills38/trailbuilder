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
3. You set the catalog fields **to match the source** (price = US MSRP in USD,
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
