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
2. The page states a **weight** for the part (the config you catalog). If the
   maker publishes no weight, the part CANNOT be verified — mark it `Skipped`
   with a note (this is policy, not failure). Known: Shimano publishes no
   component weights; SRAM publishes none for rotors; fork weights are
   unreliable; brake weights are hose/config-dependent.
3. You set the catalog fields **to match the source** (price = MSRP, weight,
   and every interface field), using the vocabularies in `src/schema.js`.
4. You add all three provenance fields: `verified:true`,
   `lastChecked:'YYYY-MM-DD'` (today, never future), `source:'https://…'`
   (the fetched manufacturer URL).

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
