# BuildMyMTB Security Corpus — INDEX

The **security-expert** specialist's cited knowledge library. This is the entry point:
the agent (`.claude/agents/security-expert.md`) loads THIS file first, decides which
chapter(s) the question touches, and pulls only those.

Modelled deliberately on [`tools/mechanic/INDEX.md`](../mechanic/INDEX.md) — same corpus
rules, same append-only fact IDs, same "flag, never patch" boundary. If you know the
mechanic corpus you already know how to use this one.

**Level.** The corpus is a leveled program, L1 (web fundamentals) → L4 (adversarial craft) —
see [`CURRICULUM.md`](CURRICULUM.md). Each chapter states its **Maturity** and an honest
**## Gaps** list.

**Purpose.** The catalog's bar is "a *compatible* verdict must be TRUE." The security bar is
its mirror: **a *secure* claim must be TRUE.** This app already holds real user data behind
a publishable key on a static site — saved builds, an owned-parts inventory, forum posts,
profiles — and is designed toward a used-parts marketplace where being wrong costs riders
money. The corpus is the durable, cited record of what actually defends that, so a security
question is answered from sourced facts rather than model memory.

---

## Organizing principle — CALLERS, not features

The mechanic corpus organizes around **interactions** (parts fail in combination). The
security analogue is the **caller**: every finding here is framed as *who is asking, holding
what credential, and what can they reach?* This project's own SQL files already do this —
`supabase/reviews.sql` walks `anon` → `authenticated` → `admin` → `service_role` in its
header comment before writing a single policy, and that walkthrough is what makes the file
reviewable. **That is the house style and this corpus enforces it.** A defense described
without naming the caller it stops is not yet a fact.

---

## Corpus rules (non-negotiable)

1. **Append-only.** Every fact carries a **stable ID** (`WEB-1`, `RLS-3`, …). Never
   renumber, never rewrite in place. A correction is a **new fact** that references and
   supersedes the old one (`RLS-1 SUPERSEDED BY RLS-42`) — the same discipline as the
   catalog's `ALIASES`.

2. **Every fact carries a fetched-source citation.** Gold tier is a **fetched
   standards-body / vendor / OWASP page** — never a search-result summary (the project's
   oldest lesson: *search-result summaries lie*). A fact seeded from a repo doc carries
   **both** the repo doc AND the primary URL that doc records.

3. **Facts + citations only — never wholesale-copied text.** Paraphrase; a short quoted
   phrase under attribution is fine to pin exact wording.

4. **⚠ CONTRADICTION tag.** When a corpus fact contradicts something this repo actually
   ships — a policy in `supabase/*.sql`, a convention in `CLAUDE.md`, a claim in a design
   doc — tag it `⚠ CONTRADICTION` and name the exact file/policy/constant. That tag is a
   hand-off to the **coordinator**; this corpus never patches production SQL (see
   "Boundaries").

5. **Carry the source's own confidence.** `confirmed` (fetched primary) / `partial` /
   `inference` (reasoned from a primary, labelled as reasoning) / `unestablished`.

6. **Both errors cost — and here the asymmetry flips.** In the catalog, a false "won't fit"
   and a false "fits" are equally bad. In security they are **not**: a false "this is secure"
   ships a vulnerability, while a false "this is vulnerable" costs only review time. **When
   uncertain, the honest entry is the finding, flagged at its true confidence** — but see the
   PROOF rule below, which is what keeps that from degenerating into noise.

---

## The two security-specific rules

### 7. Findings are SEVERITY-RANKED

Every finding carries one of:

| Severity | Meaning |
|---|---|
| **CRITICAL** | Exploitable now, by an unauthenticated or ordinary caller, against live data or funds. Drop everything. |
| **HIGH** | Exploitable by an ordinary authenticated caller, or unauthenticated against staged/near-live code. Fix before the feature ships. |
| **MEDIUM** | Requires an unusual precondition (a race, an admin mistake, a chained bug), or is a real defense-in-depth gap with bounded blast radius. |
| **LOW** | Hardening / hygiene / info-leak with no clear attack path. |
| **INFO** | Observation, design note, or a defense worth recording that isn't a defect. |

Rank by **what the attacker gets**, not by how clever the bug is. A boring missing `to
authenticated` that exposes every row outranks an elegant race that leaks a row count.

### 8. Findings are PROOF-REQUIRED (the adversarial bar)

**A claimed vulnerability must come with the concrete request or flow that exploits it.**
Not "this policy looks weak" — the actual `curl`/PostgREST call, the actual sequence of app
actions, the actual SQL, naming the caller and the credential they hold. If you cannot write
the exploit, you do not have a finding; you have a **question**, and it is filed as one
(severity `INFO`, phrased as "unverified — would need X to confirm").

This is the direct analogue of the catalog's "a fetched manufacturer page or it didn't
happen." It exists because security review's characteristic failure mode is a confident list
of plausible-sounding issues that nobody can reproduce, which trains the reader to ignore the
next list. **An unproven finding is worse than no finding: it spends the reader's trust.**

Corollary: when a defense *holds*, say so and show why it holds — the walked-through negative
result is as valuable as a positive finding, and it is what makes a review believable.

---

## Boundaries (what this corpus and its agent may and may not do)

- **Reviews and flags — never patches.** The agent does **NOT** edit `supabase/*.sql`,
  `src/config.js`, `src/account.js`, `index.html`, or any live policy. Security changes to
  production SQL are gated: a bad RLS edit can expose every row in a table, and unlike a
  catalog row it fails **silently and globally**. Findings route to the **coordinator**, who
  stages the change through the normal branch → gates → review → merge path.
- **The agent may freely write to `tools/security/**`** (its own corpus) and produce review
  documents. That is its work product.
- **Never weaken a control to make something pass.** Same creed as "never weaken a test."
- **Secrets are never handled.** The agent reads committed config to *verify it contains only
  publishable values*; it never asks for, generates, stores, or transports a `service_role`
  key, a DB password, or any token. If a real secret is found committed, that is an immediate
  **CRITICAL** finding and a rotation recommendation to Douglas — not something to fix quietly
  in a diff.

---

## Chapters

| Chapter | Covers | Key callers |
|---|---|---|
| [`web-fundamentals.md`](web-fundamentals.md) | OWASP Top 10 (2021 + 2025), XSS by context, CSRF, injection, CSP doctrine for a static GitHub-Pages site | anonymous visitor · a crafted link · a hostile forum post |
| [`supabase-rls.md`](supabase-rls.md) | **THE LOAD-BEARING CHAPTER.** RLS policy semantics, the owner-scoped pattern this repo runs, server-authoritative flags, the guard-trigger pattern, storage policies, the project's own proven review checklist | anon · authenticated · admin · service_role |
| [`client-trust.md`](client-trust.md) | What a static client can and cannot enforce, publishable-key doctrine, committed-constant config, feature gates as UX (not security) | anyone with DevTools and the shipped JS |
| [`marketplace-payments.md`](marketplace-payments.md) | The used-parts marketplace threat model, never-touch-money doctrine, PCI scope avoidance, trust tiers, stolen-goods/counterfeit defense | scammer-seller · scammer-buyer · collusion ring · ATO'd account |
| [`abuse-moderation.md`](abuse-moderation.md) | Rate limiting, report-brigade resistance, the free-speech-first / mechanical-abuse-only line, sybil and astroturf resistance | flooder · brigade · sockpuppet farm · good-faith reporter |

---

## Seed provenance (where this corpus's first facts came from)

Bootstrapped 2026-07-18. External ingest this round (all fetched live, not summarized):

- **OWASP** — `owasp.org/www-project-top-ten/`, `owasp.org/Top10/2021/`, `owasp.org/Top10/2025/`,
  and the **XSS Prevention Cheat Sheet** (`cheatsheetseries.owasp.org`).
- **Supabase official docs** — Row Level Security guide, Going-into-Prod security checklist,
  Storage access control, and **Hardening the Data API**.
- **web.dev** — the Strict CSP article (`web.dev/articles/strict-csp`).

In-repo seed (cited with the primary URLs those docs carry):

- [`supabase/schema.sql`](../../supabase/schema.sql), [`supabase/forum-profiles*.sql`](../../supabase/),
  [`supabase/reviews.sql`](../../supabase/reviews.sql) — the shipped and staged policy corpus,
  including reviews.sql's caller-walkthrough and escalation-impossible language, captured here
  as the project's own proven review checklist (`RLS-30`…).
- [`data/MARKETPLACE-SECURITY-MODEL.md`](../../data/MARKETPLACE-SECURITY-MODEL.md) — the
  marketplace threat model, with its Stripe / PCI SSC / Bike Index citations carried over.
- [`CLAUDE.md`](../../CLAUDE.md) — the vendoring, committed-constant, and no-build-step
  conventions.
- `MEMORY.md` / `PROJECT-LOG.md` — Douglas's free-speech-first moderation doctrine and the
  no-auto-hide anti-brigade decision.

The seed is a *floor*, not a ceiling.

---

## First deliverable

[`REVIEW-reviews-sql-2026-07-18.md`](REVIEW-reviews-sql-2026-07-18.md) — a severity-ranked,
proof-required review of the **staged** `supabase/reviews.sql` against this corpus. Findings
only; nothing was patched.
