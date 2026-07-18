# TrailBuilder Recall Watchdog — INDEX

The **recall-watchdog** specialist's entry point. Read this first: it states the prime
directive, the corpus rules, and where the sweep methodology and findings ledger live.

- [`PROTOCOL.md`](PROTOCOL.md) — the repeatable sweep: how to query CPSC's public recall
  database and the majors' own recall/safety pages, and how to cross-reference hits
  against this catalog.
- [`RECALL-LOG.md`](RECALL-LOG.md) — the append-only findings ledger. Every recall this
  corpus has recorded, and every catalog cross-reference made against it, live there with
  stable IDs.

**Purpose.** TrailBuilder sells the idea that a rider can trust the parts list they build.
A recall is a manufacturer or regulator saying "this exact part can hurt you" — the sharpest
possible signal this project can carry. This corpus exists so that signal is never lost: it
is caught, recorded with a real citation, checked against the catalog, and handed to the
coordinator, every time, on a repeatable cadence — not rediscovered from scratch by whichever
session happens to think of it.

---

## Prime directive (non-negotiable)

**A recall claim is only ever recorded from CPSC.gov (or another national safety regulator's
own recall database — Health Canada, UK OPSS/GOV.UK product-safety-alerts, ACCC) or the
manufacturer's own recall/safety notice — never from news aggregation alone.** A cycling-press
article (Bicycle Retailer, Pinkbike, BikeRadar, etc.) is useful for *finding* a recall and can
be cited as corroboration, but the ledger entry's primary citation must be the regulator page
or the manufacturer's own notice. If only a secondary source is reachable (a manufacturer
recall page taken down after the remedy period, a JS-walled regulator mirror), the entry must
say so explicitly and carry the secondary source's *verbatim quote* of the official notice, not
a paraphrase — same discipline as this project's "search-result summaries lie" lesson from the
catalog-verification side (`tools/VERIFY-PROTOCOL.md`).

This mirrors the mechanic corpus's citation bar (`tools/mechanic/INDEX.md` rule 2) for the
same reason: a false "this part is recalled" wastes a rider's trust and a false "not recalled"
is worse — both cost, so nothing goes in the ledger without a real source.

---

## Corpus rules (non-negotiable)

1. **Append-only.** Every recall entry carries a **stable ID** (`RCL-1`, `RCL-2`, …). Never
   renumber, never rewrite in place. If a recall is later expanded, corrected, or closed, add
   a **new** entry that references and supersedes the old one (`RCL-4 SUPERSEDED BY RCL-19`) —
   the same discipline as the catalog's `ALIASES` and the mechanic corpus's fact IDs.

2. **Every entry carries: recall number (if the source assigns one), date, affected
   models/serials AS STATED by the source, remedy, and the source URL.** Don't summarize away
   the serial/production-code detail — a rider (or the coordinator) needs it to actually check
   whether a specific catalog row or a specific bike is caught by the recall. Quote the
   affected-model list verbatim when the source states one; paraphrase the hazard/remedy
   narrative (this project's copyright discipline — one short quote under attribution is fine,
   not wholesale reproduction).

3. **Every catalog cross-reference is its own record**, separate from the recall fact itself:
   which catalog row(s) it might touch, by brand + model + modelYear, and a **confidence**
   label:
   - **CONFIRMED MATCH** — the recall's stated model/SKU name and (where given) model-year or
     production-date range line up exactly with a cataloged row.
   - **NAME MATCH, GENERATION UNCONFIRMED** — the brand+model matches but the catalog row
     carries no modelYear/production-code field to confirm it's the *same* recalled
     generation/run (common for component rows that don't carry a year).
   - **CONDITIONAL** — the recall targets a specific build spec (e.g. "framesets sold with
     brand X's brake") that this catalog's schema doesn't capture, so a match can't be
     confirmed or ruled out from catalog data alone.
   - **CHECKED, NO MATCH** — the brand is cataloged but the specific recalled model/SKU is not.
   Never silently skip a brand that's heavily cataloged just because the first search didn't
   turn up a hit — the "CHECKED, NO MATCH" label is itself useful signal for the next sweep.

4. **Flags only — never a catalog edit.** This corpus and its agent recommend; they do not
   touch `src/compat.js`, `data/*.js`, or any catalog row. How a live recall should surface to
   a *user* (a warning badge, a filter, nothing at all) is a **parked Douglas decision** — note
   that explicitly in any findings report rather than assuming an answer. This mirrors the
   mechanic corpus's engine boundary (`tools/mechanic/INDEX.md` "Boundaries").

5. **Every catalog match is coordinator-routed, severity-ranked.** A recall that maps to a
   currently-cataloged, non-superseded row and involves a **stop-ride / crash hazard** is the
   one case worth a proactive push (see `PROTOCOL.md`'s notify rule) — everything else waits
   for the coordinator's normal review cadence.

6. **Re-sweeps update, don't restart.** A new sweep round reads the existing ledger first,
   checks each open (non-superseded) recall for status changes (remedy completed, recall
   expanded), and adds genuinely new recalls found since the last sweep's date — it does not
   re-litigate entries that haven't changed.

---

## Boundaries (what this corpus and its agent may and may not do)

- **Research and flag, never edit.** No catalog row, test, or schema file is ever touched by
  this corpus or its agent. A confirmed match is a note for the coordinator, not a change.
- **No UI/UX decisions.** Whether/how a recall shows up to an end user is explicitly NOT this
  corpus's call — say so and stop, the same way the mechanic corpus defers rule-activation
  calls to the coordinator's gated process.
- **The bar is unchanged regardless of how alarming a lead looks.** A scary-sounding secondary
  source without a regulator or manufacturer primary citation does not get an entry — it can be
  noted as "unconfirmed lead, needs a primary source" in a sweep's working notes, but does not
  enter `RECALL-LOG.md` until a real source is found.
