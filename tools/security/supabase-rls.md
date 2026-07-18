# Supabase & RLS — Security Corpus

**Maturity: professional** (L1 complete + substantial L2 vendor-primary depth — see
[`CURRICULUM.md`](CURRICULUM.md)). Seeded 2026-07-18 from four fetched Supabase docs (RLS
guide, Going-into-Prod checklist, Storage access control, Hardening the Data API) **plus** a
full read of this repo's shipped policy corpus. Graded `professional` rather than
`foundation` because the repo's own migrations supply genuine L2 material — a working
escalation-proof pattern, a grants-hardening pass, and a caller-walkthrough convention — all
captured here as facts. Short of `master`: no MFA/AAL work, no `restrictive` policy use, no
verified backup/recovery or audit-logging story. See `## Gaps`.

**This is the load-bearing chapter.** It guards live user data today.
Read [`INDEX.md`](INDEX.md) first (corpus rules, severity scale, PROOF bar).

Fact IDs are stable and append-only (`RLS-n`).

---

## Part 1 — RLS semantics (vendor-primary)

**RLS-1 — A policy is an implicit WHERE clause on every query.** `USING` decides which
**existing** rows are visible/affectable; `WITH CHECK` validates the **resulting** row. For
UPDATE, `USING` gates the old row and `WITH CHECK` gates the new one. **If `WITH CHECK` is
omitted, `USING` applies to both.** *Confidence: confirmed.* Source: Supabase RLS guide
(fetched 2026-07-18).

**This is the single most important semantic in the chapter.** A policy with `USING` alone on
an UPDATE silently governs the new row too — sometimes that is what you want and sometimes it
hides a hole. Always write both explicitly, as this repo does.

**RLS-2 — RLS must be enabled on every table in an exposed schema.** Supabase's production
checklist: tables without RLS and reasonable policies "allow any client to access and modify
their data." *Confidence: confirmed.* Source: Supabase Going-into-Prod checklist (fetched
2026-07-18). **This is the A02:2025 misconfiguration that matters most here** — one
`create table` in `public` without a matching `enable row level security` is a full table
exposure to anyone holding the publishable key, which is committed in `src/config.js` and
therefore public.

**RLS-3 — Per-operation policy clauses.** SELECT → `USING`. INSERT → `WITH CHECK`.
UPDATE → both. DELETE → `USING`. *Confidence: confirmed.* Source: Supabase RLS guide
(fetched 2026-07-18).

**RLS-4 — An UPDATE requires a corresponding SELECT policy to function.** *Confidence:
confirmed.* Source: Supabase RLS guide (fetched 2026-07-18). A practical corollary for
review: a table with an UPDATE policy and no SELECT policy is not "extra locked down," it is
**broken**, and the reviewer should say so rather than praising it.

**RLS-5 — `auth.uid()` returns NULL when unauthenticated, and NULL comparisons are false.**
So `auth.uid() = user_id` fails closed for anon. Supabase nonetheless recommends writing
`auth.uid() IS NOT NULL AND auth.uid() = user_id` to make the intent explicit. *Confidence:
confirmed.* Source: Supabase RLS guide (fetched 2026-07-18).

**RLS-6 — `auth.jwt()`: use `raw_app_meta_data`, NEVER `raw_user_meta_data`, for
authorization.** `raw_user_meta_data` is **user-modifiable**; basing a policy on it is
self-granted privilege. *Confidence: confirmed.* Source: Supabase RLS guide (fetched
2026-07-18).

**RLS-7 — JWT claims are stale between refreshes.** A revoked role or changed metadata does
**not** take effect until the token refreshes. *Confidence: confirmed.* Source: Supabase RLS
guide (fetched 2026-07-18).

**Consequence:** a JWT-claim-based admin check has a revocation lag; a **table-read** admin
check (this repo's `is_forum_admin()`, RLS-11) is instant. That is a real, under-appreciated
advantage of the pattern this repo chose — recorded so nobody "optimizes" it into a claim.

**RLS-8 — Always target roles with `TO`.** `TO authenticated` stops the policy being
evaluated for anon at all — a correctness *and* performance win. *Confidence: confirmed.*
Source: Supabase RLS guide (fetched 2026-07-18).

**RLS-9 — Wrap function calls in a sub-select for the initPlan optimization.** Prefer
`(select auth.uid()) = user_id` over `auth.uid() = user_id`; Postgres then caches the result
per-statement instead of re-evaluating per-row, a **>94% improvement** in Supabase's
measurement. Also index columns referenced in policies, filter client-side to mirror the
policy, and avoid joins between source and target tables (prefer `IN`/`ANY` over an array).
*Confidence: confirmed.* Source: Supabase RLS guide (fetched 2026-07-18).

**RLS-10 — Views bypass RLS unless created with `security_invoker = true` (Postgres 15+).**
*Confidence: confirmed.* Source: Supabase RLS guide (fetched 2026-07-18). **A view is a
silent RLS bypass by default** — this belongs on every review checklist, and this repo
currently creates no views (verified by grep 2026-07-18), which is worth keeping true.

---

## Part 2 — The layer BENEATH RLS: grants and the Data API

**RLS-11 — Grants and RLS are two independent layers, and RLS alone is not sufficient.**
Supabase: grants "determine which Postgres roles can reach a table, view, or function over
the Data API," while RLS "determine[s] which rows those roles can read or modify." Grants
control *access*; RLS controls *scope*. **Both** are required. *Confidence: confirmed.*
Source: Supabase "Hardening the Data API" (fetched 2026-07-18).

**RLS-12 — Tables created in `public` receive `SELECT`/`INSERT`/`UPDATE`/`DELETE` grants for
`anon`, `authenticated` and `service_role` BY DEFAULT.** *Confidence: confirmed.* Source:
Supabase "Hardening the Data API" (fetched 2026-07-18).

**This is why RLS-2 is phrased as "one missing line is a full exposure."** The grant is
already there, automatically. RLS is the *only* thing standing between a new `public` table
and the anon key. Supabase notes the platform is moving toward opt-in exposure, and that you
can pre-empt it with `alter default privileges`.

**RLS-13 — RLS does not apply to FUNCTIONS.** Grant `EXECUTE` only to roles that need it, and
review every `SECURITY DEFINER` function carefully — such functions run with the creator's
privileges and can bypass RLS on internal tables. Never create `SECURITY DEFINER` functions
in exposed schemas for general use. *Confidence: confirmed.* Sources: Supabase "Hardening the
Data API" + Supabase RLS guide (both fetched 2026-07-18).

**RLS-14 — `CREATE FUNCTION` grants `EXECUTE` to `PUBLIC` by default**, so a newly created
function is reachable by `anon` unless explicitly revoked. *Confidence: confirmed.* Source:
`supabase/forum-profiles-hardening.sql` §"REVOKE from PUBLIC" (this repo's own hardening
migration, read 2026-07-18), which exists precisely to close this on
`public.username_is_reserved(text)`.

**RLS-15 — `service_role` is a member of `PUBLIC`, so `REVOKE … FROM PUBLIC` also strips
service_role's inherited grant.** This repo therefore re-grants EXECUTE to `service_role`
explicitly as "zero-cost insurance," reasoning that `service_role` bypasses RLS but **not**
grants. *Confidence: confirmed.* Source: `supabase/forum-profiles-hardening.sql` (read
2026-07-18).

**Worth recording as craft:** this is a subtle trap (revoking from PUBLIC has non-obvious
blast radius) that the repo already found and documented. A reviewer who does not know
RLS-15 will read the re-grant as sloppy over-permissioning and file a false finding.

**RLS-16 — The Data API can be disabled entirely**, in which case no auto-generated REST or
GraphQL endpoint responds "regardless of grants or RLS." *Confidence: confirmed.* Source:
Supabase "Hardening the Data API" (fetched 2026-07-18). Not applicable to us — the app *is*
the Data API client — but it is the correct answer for any future table that only server-side
tooling should touch.

---

## Part 3 — The patterns THIS repo runs (the proven checklist)

These are the load-bearing facts: patterns already shipped, reviewed, and working. New
migrations should be measured against them.

**RLS-17 — The owner-scoped pattern.** Every private table carries
`user_id uuid not null default auth.uid() references auth.users(id) on delete cascade`, plus
a single `for all` policy with `using (auth.uid() = user_id) with check (auth.uid() = user_id)`.
*Confidence: confirmed.* Source: `supabase/schema.sql` (`builds`, `inventory`; read
2026-07-18).

Three separate properties make this work, and all three are load-bearing:
1. `default auth.uid()` — the client never has to send `user_id`, so it cannot get it wrong.
2. `with check` — the client cannot *forge* it either; writing another user's id is rejected.
3. `on delete cascade` — account deletion removes the rows, which is the GDPR-erasure path.

**RLS-18 — The public-read / owner-write pattern.** Forum threads and posts use
`for select using (true)` (open to anon, so logged-out visitors can browse) plus separate
`to authenticated` INSERT/UPDATE/DELETE policies each checking `auth.uid() = author_id`.
`author_id` is nullable with `on delete set null` so a system-seeded row can exist with no
human author (rendered as "TrailBuilder team"). *Confidence: confirmed.* Source:
`supabase/schema.sql` Phase 4 stanza (read 2026-07-18).

**RLS-19 — Server-authoritative flags via a BEFORE INSERT/UPDATE guard trigger.** A
privileged column (`profiles.is_admin`, `profiles.verified_pro`, `reviews.hidden`) is
**pinned in a trigger**, not merely omitted from the client: forced to a safe constant on
INSERT, forced back to `OLD` on UPDATE, for every caller with a real end-user JWT
(`auth.uid() IS NOT NULL`). *Confidence: confirmed.* Source: `supabase/forum-profiles.sql`
(`profiles_guard`) + `supabase/reviews.sql` (`reviews_guard`) (read 2026-07-18).

**Why a trigger and not just RLS:** RLS gates *which rows* you may write, not *which columns*.
Postgres column-level privileges exist but do not compose cleanly with PostgREST's
partial-update shape. The trigger is the mechanism that makes a hand-crafted
`PATCH {"rating":5,"hidden":false}` a **no-op on `hidden`** rather than a privilege
escalation.

**RLS-20 — The pin must be SILENT (assign), not `RAISE`.** Both guards overwrite the field
rather than erroring. Rationale recorded in-repo: the app never sends the flag, so a
legitimate write never trips anything, and a malicious extra field is *ignored* rather than
failing the whole write. *Confidence: confirmed.* Source: `supabase/forum-profiles.sql` +
`supabase/reviews.sql` (read 2026-07-18).

*Inference (labelled):* silent-pin also denies the attacker an oracle. A `RAISE` would
confirm "this column is protected and you tried to touch it"; a silent pin returns an
ordinary success and tells them nothing. Recorded as reasoning, not as the repo's stated
rationale.

**RLS-21 — The escalation-impossible argument, stated as a chain.** The repo's claim is that
privilege escalation is *structurally* impossible, and it rests on exactly two links:
1. **No end-user path raises `is_admin`** — `profiles_guard` pins it for every caller with
   `auth.uid() IS NOT NULL`; only the service role / SQL editor (where `auth.uid()` is NULL)
   can set it, per the documented owner-only grant block.
2. **Therefore `is_forum_admin()` can only ever be true for a real admin**, so every
   `using (public.is_forum_admin())` policy is safe to write.
*Confidence: confirmed as a reading of the code.* Source: `supabase/forum-profiles.sql`
(read 2026-07-18).

**This is the crown jewel of the schema and the thing a reviewer must re-check on every new
migration.** The whole admin model is one trigger deep. Any future path that writes
`profiles` while bypassing `profiles_guard` — a `SECURITY DEFINER` helper, a rule, a
`COPY`, a trigger created `BEFORE` it and returning early — breaks link 1 and silently
invalidates every admin policy downstream.

**RLS-22 — `is_forum_admin()` is deliberately SECURITY INVOKER + `STABLE`, not
`SECURITY DEFINER`.** It is safe as invoker because `profiles` is world-readable
(`profiles read using (true)`), so any caller can always read their own row; and `profiles`
policies never reference the forum tables, **so there is no RLS recursion.** *Confidence:
confirmed.* Source: `supabase/forum-profiles.sql` (read 2026-07-18).

**This defense HOLDS, and the reasoning is correct.** Recording it explicitly because
"admin-check helper is not SECURITY DEFINER" reads like a finding to a reviewer working from
pattern-matching rather than from the actual policy graph. It is not a finding. **The
recursion hazard is real in general** — a helper that reads a table whose own policy calls
the helper is an infinite loop — and this schema avoids it by construction.

**RLS-23 — `SECURITY DEFINER` functions here pin `search_path`.**
`username_is_reserved(text)` is `security definer` with `set search_path = public, pg_temp`;
the trigger functions `reviews_guard()` and `review_photos_cap()` also set it. *Confidence:
confirmed.* Source: `supabase/forum-profiles.sql`, `supabase/reviews.sql` (read 2026-07-18).
An unpinned `search_path` on a definer function lets a caller who can create objects shadow
an unqualified reference and execute code as the definer.

**RLS-24 — CHECK-pin user-supplied URLs to a known host/prefix at the DB layer.**
`profiles.avatar_url` and `review_photos.url` are constrained by regex to *this project's*
Storage public prefix; `reviews.video_url` is constrained to YouTube/Vimeo. *Confidence:
confirmed.* Source: `supabase/reviews.sql`, `supabase/forum-profiles-rich2.sql` (read
2026-07-18).

**Verified this round — the `video_url` regex holds.** Reviewed for host-escape:
`^https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/|vimeo\.com/)[A-Za-z0-9._%/?=&-]+$`.
The host is inside the anchored prefix, so `https://youtube.com@evil.com/…` cannot match
(the literal `youtube.com/watch?v=` must follow immediately); `@`, backslash and whitespace
are absent from the trailing character class, closing the userinfo and control-character
tricks; and Postgres POSIX `~` anchors `$` at true end-of-string (no trailing-newline
exception as in Perl-style regex), closing newline injection. **No finding — recorded as a
defense that holds, per INDEX rule 8's corollary.**

⚠ **But see [`web-fundamentals.md`](web-fundamentals.md) WEB-12:** a DB CHECK protects *new
rows in this table*. The renderer must still validate the scheme at the sink, because a
constraint relaxed later does not retroactively re-clean old rows.

**RLS-25 — Idempotent-migration conventions (house style).** `create table if not exists`;
`drop policy if exists` before every `create policy`; guarded `DO $$ … pg_constraint … $$`
blocks for CHECK constraints (bare `ADD CONSTRAINT` is **not** idempotent); `on conflict`
seeds; `add column if not exists` for later additive columns. *Confidence: confirmed.*
Source: `supabase/schema.sql`, `supabase/reviews.sql` (read 2026-07-18).

**Security-relevant, not just tidiness:** a migration that fails halfway through leaves a
table created and its policies **not** created — i.e. RLS-2's exact failure. Re-runnability
is what makes "run it again" a safe recovery instead of a gamble.

**RLS-26 — The CALLER WALKTHROUGH is this project's required review artifact.**
`supabase/reviews.sql` opens with a `SECURITY MODEL` block that walks **anon → authenticated
→ admin → service_role**, stating for each exactly what it may reach and by what mechanism,
then closes with a `POST-MIGRATION INVARIANTS` block listing what must hold after the file
runs. *Confidence: confirmed.* Source: `supabase/reviews.sql` (read 2026-07-18).

**Treat both blocks as mandatory for any new migration.** They are what make these files
reviewable by someone who did not write them, and the invariants block converts prose intent
into a checkable list. This is the single best security practice already present in this repo
and it should be defended against erosion.

**RLS-27 — Storage: bucket-level `file_size_limit` and `allowed_mime_types` are enforced
server-side**, and object writes are scoped to a caller-owned top-level folder via
`(storage.foldername(name))[1] = auth.uid()::text`. *Confidence: confirmed.* Sources:
Supabase Storage access-control doc (fetched 2026-07-18) + `supabase/reviews.sql`
`review-photos` bucket (5 MiB, jpeg/png/webp) (read 2026-07-18).

**RLS-28 — Upsert needs more grants than upload.** Upload requires `INSERT`; **upsert
(overwrite) requires `INSERT`, `SELECT` and `UPDATE`**; download requires `SELECT`.
*Confidence: confirmed.* Source: Supabase Storage access-control doc (fetched 2026-07-18).
A missing `UPDATE` policy manifests as "upload works, re-upload fails," which is easy to
misdiagnose as a client bug.

**RLS-29 — A "public" bucket means the object bytes are readable by anyone with the URL,
independent of any table RLS.** *Confidence: partial* — confirmed for this repo's usage
(`review-photos` and `avatars` are created `public = true` and paired with a
`for select using (bucket_id = …)` policy), but the fetched Storage doc did not spell out the
public-bucket exposure semantics in detail. **Do not upgrade this fact without fetching a
Supabase doc that states it directly.**

**The important corollary is already acknowledged in-repo:** hiding a review hides its *card*;
it does **not** delete the image bytes. Only a DELETE removes the object. Moderation of
imagery is therefore a two-step action, and any UI that implies otherwise is lying to the
moderator.

**RLS-30 — Supabase Auth ships its own rate limits, and they are the abuse floor.** Defaults
recorded 2026-07-18: **email endpoints 2/hour** (unless custom SMTP), OTP **360/hour**,
verification **360/hour per IP** (bursts to 30), MFA challenges **15/minute per IP**,
**anonymous signups 30/hour per IP**. CAPTCHA is available on signup, sign-in and
password-reset. *Confidence: confirmed.* Source: Supabase Going-into-Prod checklist (fetched
2026-07-18). See [`abuse-moderation.md`](abuse-moderation.md) for what these do and do not
cover.

**RLS-31 — Production checklist items not yet confirmed for this project.** Supabase's
checklist calls for: enabling email confirmations, OTP expiry ≤ 3600s, custom SMTP,
CAPTCHA, SSL enforcement (Database → Settings → SSL Configuration), network restrictions, MFA
on the *Supabase account itself*, and multiple org owners to avoid a single point of failure.
*Confidence: confirmed as the vendor's requirements* (Going-into-Prod checklist, fetched
2026-07-18); **UNESTABLISHED whether any are configured on this project** — these are
dashboard settings, not repo state, so no amount of code reading can answer it.

**This is a question for Douglas, filed per the PROOF bar as a question and not a finding.**
Two stand out for a one-person project: **MFA on the Supabase account** (it is the master key
to all user data — a phished password is total compromise, and no RLS policy helps) and
**multiple org owners / recovery access** (single point of failure).

---

## Gaps

To reach `master` (L3):

- **No MFA / AAL enforcement facts in practice.** RLS-6 records that
  `(select auth.jwt()->>'aal') = 'aal2'` can gate sensitive operations, but nothing in this
  repo uses it and no policy has been designed around it. The marketplace design
  (`marketplace-payments.md` MKT-14) *requires* MFA for payout changes — that is an unbuilt
  dependency.
- **No `restrictive` policy coverage.** Every policy in this repo is permissive (they OR
  together). `AS RESTRICTIVE` policies AND together and are the correct tool for a global
  cross-cutting constraint (e.g. "no writes at all while the account is suspended"). Not
  researched, not fetched.
- **No audit-logging or alerting story** — A09:2025. There is no record of admin moderation
  actions (see the reviews.sql review, finding F6), no failed-auth alerting, no anomaly
  detection. Nothing was fetched on Supabase's logging capabilities.
- **No backup / recovery / incident-response facts.** What is the restore path if a bad
  migration drops a policy? Unresearched.
- **RLS-29 sits at `partial`** pending a Supabase doc that states public-bucket semantics
  directly.
- **RLS-31 is unresolved** — the dashboard-side production checklist has never been walked
  against the live project.
- **No performance-under-RLS measurement.** RLS-9's `(select auth.uid())` optimization is
  recorded but **not applied anywhere in this repo's policies**, and no policy-column index
  audit has been done.
- **`supabase/SETUP.md` has not been read into the corpus** — the owner's turn-on checklist
  may already answer parts of RLS-31.
