# Client Trust — Security Corpus

**Maturity: foundation** (L1 coverage — see [`CURRICULUM.md`](CURRICULUM.md)). Seeded
2026-07-18 from fetched Supabase docs (RLS guide, Going-into-Prod, Hardening the Data API),
this repo's `CLAUDE.md` conventions, and `src/config.js`. No L2 depth on key rotation, the
publishable-vs-legacy-anon key migration, or supply-chain verification of the vendored
client — see `## Gaps`.

What a static client can and cannot enforce · publishable-key doctrine · committed-constant
config · feature gates. Read [`INDEX.md`](INDEX.md) first.

Fact IDs are stable and append-only (`CLI-n`).

---

## The one rule everything here derives from

**CLI-1 — Everything shipped to the browser is public, readable, and modifiable by the user.**
There is no build step, no bundler, no minification of our own code (`CLAUDE.md` →
Conventions: plain browser JS, `index.html` loads `src/compat.js` directly). The entire
catalog, every compatibility rule, every config constant and every feature gate is delivered
as readable source. *Confidence: confirmed (repo structure + CLAUDE.md, read 2026-07-18).*

**Corollary — the only real trust boundary in this system is the database.** Not the client,
not the UI, not a disabled button. If a rule must hold against a hostile user, it holds
because a **Postgres policy or constraint** enforces it (see
[`supabase-rls.md`](supabase-rls.md)) — or it does not hold at all.

**CLI-2 — Client-side validation is UX, not security; it must be duplicated server-side to be
a control.** *Confidence: inference from CLI-1 + RLS-11 (grants/RLS as the enforcement
layer).* This repo already practises the correct version: the photo-per-review cap exists
**both** in the app and as a database trigger, described in `supabase/reviews.sql` as
"defense-in-depth over the app's own limit." That is the right relationship — the client
limit is for the honest user's benefit; the DB limit is the actual control.

---

## Publishable-key doctrine

**CLI-3 — The Supabase publishable/anon key is SAFE to commit; the `service_role` key NEVER
is.** The publishable key only permits what RLS allows. Service keys **bypass RLS entirely**
and Supabase states they must never be exposed in browsers or to customers. *Confidence:
confirmed.* Sources: Supabase RLS guide + Going-into-Prod checklist (fetched 2026-07-18);
`CLAUDE.md` → Conventions; `src/config.js` (read 2026-07-18).

**CLI-4 — The safety of CLI-3 is CONDITIONAL, and the condition is RLS-2.** "The anon key is
safe" is true only while every table in the exposed schema has RLS enabled with correct
policies. `src/config.js` states the condition explicitly — the key is safe *because* "RLS
owner-scopes every row." *Confidence: confirmed (read 2026-07-18).*

**This is the most dangerous half-remembered fact in the stack.** "The anon key is public,
that's fine" is repeated until it becomes unconditional, and then someone adds a table
without RLS and the same sentence is now false. **The publishable key is a loaded gun pointed
at every un-policied table in `public`** — and per RLS-12 the grants for it are created
automatically. Whenever this fact is cited, cite the condition with it.

**CLI-5 — This project's live key is in the new `sb_publishable_…` format.** `src/config.js`
carries `SUPABASE_URL = 'https://pabiaerjadeeggwoslng.supabase.co'` and
`SUPABASE_ANON_KEY = 'sb_publishable_…'`. *Confidence: confirmed (read 2026-07-18).* Recorded
because the format signals the newer publishable-key scheme rather than a legacy JWT-style
anon key; the two differ in rotation/revocation behavior. **The differences were not fetched
this round** — see `## Gaps`.

**CLI-6 — A committed key is a PUBLISHED key, and un-publishing it requires rotation, not
deletion.** *Confidence: inference from CLI-1 + git's append-only history.* Deleting a
committed credential in a later commit does not remove it from history, clones, forks, or
GitHub's own caches. **The remediation for any committed secret is always rotate-then-remove,
never remove-and-hope.** No secret is currently committed here (verified 2026-07-18:
`src/config.js` holds only the publishable key and URL) — this fact is the standing procedure
for if one ever is.

---

## Committed-constant config

**CLI-7 — External-service config is a committed constant, by convention.** `REPORT_REPO`,
`SUPABASE_URL`, `SUPABASE_ANON_KEY` — all committed. Only *publishable* values qualify.
*Confidence: confirmed.* Source: `CLAUDE.md` → Conventions; `src/config.js` (read
2026-07-18).

**Security-positive, and worth defending:** because there is no environment-variable layer
and no build-time injection, **there is no mechanism by which a secret could be silently
threaded into the client**. A secret would have to be typed into a committed file, where code
review and git history both see it. Convention-as-guardrail. A future "let's add a .env and a
bundler" proposal should be evaluated against this property, not only against ergonomics.

**CLI-8 — Third-party libraries are VENDORED, never CDN-loaded.** `src/vendor/supabase.min.js`
is a committed UMD build (v2.110.1) loaded by a classic `<script>`, with its version and
source URL in a header comment. No `import`, no ESM, no runtime CDN fetch. *Confidence:
confirmed.* Source: `CLAUDE.md` → Conventions (read 2026-07-18).

**This is a genuine supply-chain advantage over the common pattern.** A CDN `<script>` is a
standing remote-code-execution grant to a third party on every page load — the CDN (or anyone
who compromises it) can serve different bytes tomorrow. A vendored file executes bytes that
are **in our git history and reviewable**. It maps directly to **A03:2025 Software Supply
Chain Failures** (`web-fundamentals.md` WEB-2) and this repo is on the right side of it.

⚠ **The advantage is not free, and this repo has not yet paid the rest of the bill.** Vendoring
moves the risk from *runtime compromise* to *ingest-time compromise plus staleness*: nothing
currently records **how the vendored bytes were verified against upstream at ingest** (a
published checksum? a signature? "downloaded it and trusted the URL"?), and nothing defines an
update policy for when upstream ships a security fix. A vendored dependency with no
verification record and no update trigger is A03 with extra steps. This is a real gap, filed
in `## Gaps` and named as the likely next training target in `web-fundamentals.md`.

**CLI-9 — Browser-only glue is excluded from `npm run typecheck`.** `src/account.js` and
`src/vendor/**` are unchecked (DOM + cross-file script globals), like the inline `index.html`
script; the pure logic stays checked. *Confidence: confirmed.* Source: `CLAUDE.md` →
Conventions (read 2026-07-18).

**Security-relevant:** `src/account.js` is the **authentication and data-access layer** and it
sits in the unchecked set — the tooling that catches a wrong-shaped call elsewhere does not
run over the code that talks to the database. That is a defensible tradeoff, but it means
account/auth changes carry less automated backstop than the rest of the repo and deserve
correspondingly more review attention.

---

## Feature gates

**CLI-10 — Feature gates (`ACCOUNTS_ENABLED`, `FORUM_ENABLED`, `KIT_ENABLED`) are UX
controls, NOT security controls.** They are committed booleans in `src/config.js` that hide
UI. A user can flip any of them in DevTools. *Confidence: confirmed (read 2026-07-18) +
CLI-1.*

**What a gate actually protects:** `KIT_ENABLED = false` renders an inert "coming soon" panel
so a merge to `main` is live-safe. That is real and useful — it prevents *accidental*
exposure of unfinished UI. **It does not prevent deliberate access**, and more importantly it
does not gate the *data*: if a table's RLS allows a read, flipping the flag back on in the
console reads it.

**Rule: never let a feature gate be the reason a table's policies are loose.** "It's fine, the
UI is hidden" is not an argument that survives CLI-1. Staged tables need correct policies from
the day the migration runs — which is exactly why reviewing the staged `supabase/reviews.sql`
*before* it goes live is the right sequencing.

**CLI-11 — Staged SQL is a distinct risk state from staged UI.** A staged *feature* is inert
until its flag flips. A staged *migration* is inert until it is **run** — but the moment the
owner runs it in the SQL editor, it is live regardless of any flag, because the Data API
exposes tables, not features (RLS-12). *Confidence: inference from RLS-12 + CLI-10.*

**Consequence: the review gate for a migration is "before it is run," not "before the UI
ships."** `supabase/reviews.sql` is currently in the safe window. Once run, its policies are
live to the publishable key with or without a review UI.

---

## What the client CAN legitimately enforce

**CLI-12 — Allowlist-shaped client validation is genuinely valuable even though it is
bypassable.** `sanitizeShare()` cannot stop a determined user (they control their own
browser), but it is not *for* that — it is for the case where **someone else's crafted link
opens in the victim's browser** (`web-fundamentals.md` WEB-13). There the attacker does not
control the client; the victim's client is enforcing against attacker-supplied input, and the
allowlist shape holds. *Confidence: inference from WEB-13 + `test/test-share.js` (read
2026-07-18).*

**The distinction that matters:** "client-side checks are worthless" is a slogan, not an
analysis. Client checks are worthless against **the user attacking their own session** and
essential against **input arriving at the user's session from elsewhere** — crafted links,
hostile forum posts, other users' review text. Most of this app's real client-side security
work is the second kind.

---

## Gaps

To reach `professional` (L2):

- **No key-rotation procedure.** CLI-6 states the principle; there is no documented, tested
  path for rotating the publishable key (who changes what, in which order, what breaks for
  logged-in users mid-rotation).
- **CLI-5's publishable-vs-legacy-JWT key semantics were not fetched.** Revocation, expiry
  and rotation behavior may differ meaningfully between the formats.
- **No supply-chain verification record for `src/vendor/supabase.min.js`** (CLI-8's ⚠). No
  checksum, no signature, no upstream-diff procedure, no update policy, no CVE-watch. This is
  the largest single gap in the chapter and it maps to A03:2025.
- **No Subresource Integrity discussion** — SRI is the standard mitigation for the CDN case
  we avoid, and is worth recording even though we vendor, since it is the fallback if anyone
  ever proposes a CDN.
- **`src/account.js` has never been security-reviewed** — it is the auth/data-access layer,
  it is excluded from typecheck (CLI-9), and no fact in this corpus derives from reading it.
- **No session-storage facts** — where the Supabase session token is persisted
  (localStorage vs memory vs cookie) is unverified, which is why `web-fundamentals.md` WEB-22
  sits at `partial`. Resolving that resolves both.
- **No L3/L4 content** — no threat-modelling of the client as an untrusted execution
  environment in depth (extension interference, hostile bookmarklets, shared-device residue).
