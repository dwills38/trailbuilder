# Drift-check triage — 2026-07-18 (seat 12, partial pass)

Ran `node tools/drift-check.js` (automated substring re-fetch of every
`verified:true` row's `source` URL) on branch `maint/drift-check-3`, a fresh
worktree off `origin/main` (never the shared `D:\` root). **No catalog edits
made** — `src/compat.js` untouched throughout; this is triage only, exactly
as scoped.

## Coverage — partial, resumable (read this before the counts below)

The verified population has grown to **3,007 in-scope rows** (3,015 total
minus 8 retired/history-only) since the last full pass (`DRIFT-TRIAGE-run2.md`,
2026-07-08, 167 rows). Real-world fetch throughput ran ~25–65 rows per
10-minute batch (politely rate-limited, 250ms gap + up to 12s per-host
timeout) — a full sweep of the remaining pending rows would take several more
hours of wall-clock network time, past this task's scope.

**1,369 of 3,007 rows checked (~46%), 1,638 still `pending`.** State lives in
`tools/drift-report.json` (committed on this branch). Resume anytime with
`node tools/drift-check.js run` — it picks up exactly where this left off, no
rework lost.

## Result: 1,244 ok / 83 changed / 19 unfetchable / 23 fetch-failed

(vs. run2's 162/4/1/0 — the much larger denominator here includes hundreds of
rows from the 2026-07-16/17 catalog waves never drift-checked before.)

## Part 1 — the 23 FETCH FAILED rows: one real cluster + assorted singles

**`sh-manitou-mara-pro-*` — 10 of 10 catalog rows, all HTTP 404, all the same
URL (`hayesbicycle.com/products/mara-pro`).** This is the single strongest
finding of the pass: an entire verified shock family's citation now 404s on
the manufacturer's own storefront (Hayes owns Manitou). Every trunnion/std-eye
size in the family shares this one product page as `source`, so this isn't
10 independent failures — it's one dead URL cited 10 times. Strong candidate
for `archiveUrl` backfill (a Wayback snapshot) and/or a corrected live URL;
not evidence any spec *value* is wrong, just that the citation no longer
resolves.

| Part | Result | URL |
|---|---|---|
| `fr-marin-alpine-trail` | HTTP 404 | marinbikes.com/products/alpine-trail-alloy-xr-frame-kit |
| `fr-intense-primer` | HTTP 404 | intensecycles.com/products/primer-frame |
| `sft-sram-sx-eagle` | HTTP 404 | sram.com/en/sram/models/sl-sx-1-a1 |
| `sh-manitou-mara-pro-*` (10 rows) | HTTP 404 | hayesbicycle.com/products/mara-pro |
| `fr-trek-supercaliber-slr-gen2`, `fr-trek-top-fuel-gen4`, `fr-trek-full-stache-8` | HTTP 409 | retailerassetsprd.blob.core.windows.net (Trek service-manual/FAQ PDFs) |
| `fk-srsuntour-durolux-r2c2-29-170`, `fk-fox-36-factory-275-150/160`, `fk-srsuntour-aion-34-29/275-130`, `fk-srsuntour-axon-werx-34-29-100/110` | timeout (12s) | srsuntour.com / vitalmtb.com |

The 3 non-Manitou 404s (Marin, Intense, SRAM) are each a single independent
citation — same "likely link rot, needs a look" read as before, now joined by
the much larger Manitou cluster. The 3 Trek 409s share a host and a
~3-second window — reads as transient Azure Blob rate-limiting, not link rot.
The 7 timeouts are spread across srsuntour.com and vitalmtb.com with no
shared pattern beyond "slow to answer this pass" — worth a retry before
treating as anything but transient.

## Part 2 — the 19 UNFETCHABLE rows

17 of 19 are the existing `KNOWN_UNFETCHABLE_HOSTS` fast-path (trekbikes.com,
specialized.com, giantbicycles.com-family) firing as designed.

Two are **new 403s not yet in the fast-path list**:
- `pd-vpcomponents-vice` and `pd-vpcomponents-aim` (vpcomponents.com) — both
  403'd.
- `ca-shimano-xt-m8100-1051` (bike.shimano.com) — 403, matching run2's finding
  on the same host (that report called two independent runs "a standing
  block" — this is now a **third** confirmation).

**Recommendation for a follow-up:** add `vpcomponents.com` and
`bike.shimano.com` to `KNOWN_UNFETCHABLE_HOSTS` in `tools/drift-check.js` —
tooling suggestion only, not made in this triage-only pass.

## Part 3 — the 83 CHANGED rows: overwhelmingly a known matcher gap, not confirmed drift

**79 of the 83** carry the identical note `not found on page: price` (weight
either matched or was correctly skipped as sample-grade), spread across
brands already known (run2's Part 1/2) to hide price behind member gates, JS
configurators, region-locked pricing, or (new pattern this pass) third-party
spec-guide sites that never carried a price field to begin with:

- **Santa Cruz** (8 rows), **Canyon** (5), **Vitus** (4), **Cotic** (3),
  **Yeti** (2), **Pipedream** (2), **Antidote** (2) — frames, same
  gated/JS-storefront pattern as run2.
- **9point8 Fall Line R droppers** (7, one family, one gated size-selector page).
- **DVO Onyx SC/D1 forks** (10 rows) + **DVO Topaz Gen 3 shocks** (16 rows,
  every size in the family) — `dvosuspension.com` product pages; same
  size-selector-gates-price pattern as the 9point8 droppers.
- **Fox 36/38/40 Factory forks** (5 rows) sourced to `vitalmtb.com` — a
  third-party spec-guide site, not a manufacturer storefront; these pages
  structurally never carry a price at all (consistent with the
  `looksLikeSpecOrFaqPage` skip elsewhere in the tool, but vitalmtb's page
  shape doesn't trip that detector's marker phrases, so it still reports
  "not found" rather than being auto-skipped — a **matcher gap worth fixing**,
  not a real price question).
- One-off frames/parts: Frameworks, Evil, Intense, EXT, PRO, Wellgo,
  Production Privée, Geometron, Devinci, Commencal, Kona.

**4 of the 79 repeat exact rows run2 already triaged as non-drift**
(`fr-canyon-strive-cfr`, `fr-raaw-madonna-v3`, `ti-schwalbe-big-betty`,
`pd-hope-f22`) — same conclusion holds, re-confirmed, no new information.

None of these 79 were hand-verified against a live browser session this pass
(out of scope for an automated triage run) — they're candidates for the
manual verification workflow (`tools/VERIFY-PROTOCOL.md`), not confirmed
corrections. **No row in this pass's CHANGED list shows a *found-but-different*
number** — the matcher only ever reports "not found," never a contradicting
figure — so this pass surfaced **zero confirmed factual contradictions**,
only citation-staleness/matcher-blind-spot candidates.

## No catalog changes made this pass

Per task scope, `src/compat.js` was not touched, and nothing was pushed.
`tools/drift-report.json` (committed state) reflects this session's progress
on branch `maint/drift-check-3` — a coordinator/reviewer can merge that
state-only update, or let a future resumed run regenerate it.

## Suggested follow-ups (not actioned here)

1. **Hand-verify the Manitou Mara Pro 404 (10 rows, 1 URL)** — the single
   most concentrated finding this pass. Likely `archiveUrl` backfill or a
   corrected hayesbicycle.com URL.
2. Hand-verify the 3 single-row 404s (`fr-marin-alpine-trail`,
   `fr-intense-primer`, `sft-sram-sx-eagle`).
3. Add `vpcomponents.com` + `bike.shimano.com` to `KNOWN_UNFETCHABLE_HOSTS`.
4. Consider teaching `looksLikeSpecOrFaqPage` (or a sibling detector) to
   recognize vitalmtb.com-style third-party spec-guide pages so they skip
   the price check instead of reporting "changed" — a tooling fix, not a
   catalog fix (5 Fox fork rows this pass, likely more on future runs as
   other verified rows share vitalmtb.com sources).
5. Resume `node tools/drift-check.js run` to keep working the remaining
   1,638 pending rows — no state is lost, this is a checkpoint, not a restart.
6. The 79 "price not found" rows are candidates for the manual verification
   grind (WebFetch/Bright Data, per `tools/VERIFY-PROTOCOL.md`), not for any
   automatic catalog edit — same policy as every prior drift-check triage.
