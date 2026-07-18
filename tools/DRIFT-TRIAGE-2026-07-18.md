# Drift-check triage — 2026-07-18 (seat 12, partial pass)

Ran `node tools/drift-check.js` (automated substring re-fetch of every
`verified:true` row's `source` URL) on branch `maint/drift-check-3`, a fresh
worktree off `origin/main` (never the shared `D:\` root). **No catalog edits
made** — `src/compat.js` untouched throughout; this is triage only, exactly
as scoped.

## Coverage — partial, resumable (read this before the counts below)

The verified population has grown to **3,007 in-scope rows** (3,015 total
minus 8 retired/history-only) since the last full pass (`DRIFT-TRIAGE-run2.md`,
2026-07-08, 167 rows). Real-world fetch throughput this session ran
~25–65 rows per 10-minute batch (politely rate-limited, 250ms gap + up to 12s
per-host timeout) — a full sweep of the remaining pending rows would take
several more hours of wall-clock network time, well past this task's scope.

**776 of 3,007 rows checked this session's cumulative state (state file is
shared/resumable — carries prior-session progress too), 2,239 still
`pending`.** State lives in `tools/drift-report.json` (committed, not part of
this diff since no catalog/state change is being proposed here — see note at
the end). Resume anytime with `node tools/drift-check.js run` — it picks up
exactly where this left off, no rework.

## Result this snapshot: 702 ok / 50 changed / 19 unfetchable / 6 fetch-failed

(vs. run2's 162/4/1/0 — the much larger denominator here includes hundreds of
rows from the 2026-07-16/17 catalog waves never drift-checked before.)

## Part 1 — the 6 FETCH FAILED rows (most actionable — 3 look like real link rot)

| Part | Result | URL |
|---|---|---|
| `fr-marin-alpine-trail` | **HTTP 404** | marinbikes.com/products/alpine-trail-alloy-xr-frame-kit |
| `fr-intense-primer` | **HTTP 404** | intensecycles.com/products/primer-frame |
| `sft-sram-sx-eagle` | **HTTP 404** | sram.com/en/sram/models/sl-sx-1-a1 |
| `fr-trek-supercaliber-slr-gen2` | HTTP 409 | retailerassetsprd.blob.core.windows.net (Trek service-manual PDF) |
| `fr-trek-top-fuel-gen4` | HTTP 409 | same blob host, different PDF |
| `fr-trek-full-stache-8` | HTTP 409 | same blob host, different PDF |

The three **404s are the strongest drift signal in this pass** — a source
that answered before and now returns "not found" is either a retired product
page (SKU discontinued/renamed) or a URL that moved. Worth a manual check
each before any catalog action (a 404 doesn't itself say the *spec* is wrong,
just that the citation no longer resolves — `archiveUrl` backfill or a
corrected URL is the likely fix, not necessarily a spec change).

The three Trek 409s share one host (`retailerassetsprd.blob.core.windows.net`)
and all 409'd in the same ~3-second window — reads as a transient
rate-limit/conflict on Azure Blob Storage, not link rot. Worth a solo retry
later; not flagging as real drift yet.

## Part 2 — the 19 UNFETCHABLE rows

17 of 19 are the existing `KNOWN_UNFETCHABLE_HOSTS` fast-path (trekbikes.com,
specialized.com, giantbicycles.com-family) firing as designed — not new
information, just the expected shape of hitting more rows from those brands
in this larger pass.

Two are **new 403s not yet in the fast-path list**:
- `pd-vpcomponents-vice` and `pd-vpcomponents-aim` (vpcomponents.com) — both
  403'd this pass.
- `ca-shimano-xt-m8100-1051` (bike.shimano.com) — 403, consistent with run2's
  finding on the same host (that report flagged it as "two independent runs
  now agree it's a standing block" — this is now a **third** confirmation).

**Recommendation for a follow-up:** add `vpcomponents.com` and
`bike.shimano.com` to `KNOWN_UNFETCHABLE_HOSTS` in `tools/drift-check.js` —
tooling suggestion only, not made in this triage-only pass.

## Part 3 — the 50 CHANGED rows: mostly a known matcher gap, not confirmed drift

**46 of the 50** carry the identical note `not found on page: price` with no
other field flagged, spread across brands whose storefronts are already known
(from run2's Part 1/2 findings) to hide price behind member gates, JS
configurators, or region-locked pricing that a plain-text re-fetch can't see:
Santa Cruz (7 rows), Canyon (4), Vitus (4), Trek-adjacent sample frames, Yeti
(2), Cotic (3), Pipedream (2), 9point8 Fall Line R droppers (7 — all one
family, all `desc`-documented as list-price, page likely gates by
size-selector JS), and a long tail of one-off frames (Frameworks, Evil,
Intense, DVO, EXT, PRO, Wellgo, Antidote, Production Privée, Geometron,
Devinci). **4 of the 46 repeat exact rows run2 already triaged as non-drift**
(`fr-canyon-strive-cfr`, `fr-raaw-madonna-v3`, `ti-schwalbe-big-betty`,
`pd-hope-f22`) — same conclusion holds, re-confirmed, no new information.

This pattern (price absent, weight either matched or correctly skipped as
sample-grade) is the checker's known blind spot on JS-driven/gated storefronts
— **not itself evidence the catalogued price is wrong**, per the same
reasoning run2 documented for Canyon/Schwalbe/Hope. None of these 46 were
hand-verified against a live browser session this pass (out of scope for an
automated triage run) — they're candidates for the human verification
workflow (`tools/VERIFY-PROTOCOL.md`), not confirmed corrections.

**2 of the 50 flag both fields** (`fr-santacruz-v10-8`, `fr-kona-process-153-carbon`,
`fr-evil-wreckoning-ls`, `fr-geometron-g1` — weight correctly skipped as
sample-grade, price not found): same category as above, no new signal beyond
the price-matcher gap.

No row in this pass's CHANGED list shows a *found-but-different* number (the
matcher only ever reports "not found," never a contradicting figure) — so
this pass surfaced **zero confirmed factual contradictions**, only citation
staleness/matcher-blind-spot candidates.

## No catalog changes made this pass

Per task scope, `src/compat.js` was not touched, and nothing was pushed.
`tools/drift-report.json` (committed state) now reflects this session's
progress on branch `maint/drift-check-3` — a coordinator/reviewer can either
merge that state-only update or let a future resumed run regenerate it; no
action is required to preserve the work (the file is small and diff-only).

## Suggested follow-ups (not actioned here)

1. Hand-verify the 3 real 404s (`fr-marin-alpine-trail`, `fr-intense-primer`,
   `sft-sram-sx-eagle`) — likely `archiveUrl` backfill or a URL correction.
2. Add `vpcomponents.com` + `bike.shimano.com` to `KNOWN_UNFETCHABLE_HOSTS`.
3. Resume `node tools/drift-check.js run` to keep working the remaining 2,239
   pending rows — no state is lost, this is a checkpoint, not a restart.
4. The 46 "price not found" rows are candidates for the *manual* verification
   grind (WebFetch/Bright Data, per `tools/VERIFY-PROTOCOL.md`), not for any
   automatic catalog edit — same policy as every prior drift-check triage.
