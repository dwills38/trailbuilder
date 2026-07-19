# Security Review — LIVE Supabase migrations (2026-07-18)

**Date:** 2026-07-18 · **Reviewer:** security-expert · **Branch:** `audit/live-sql-security-1`
· **Targets (all RUN in production, serving real users today):**

- [`supabase/schema.sql`](../../supabase/schema.sql) — `builds`, `inventory`, `forum_threads`, `forum_posts`
- [`supabase/forum-profiles.sql`](../../supabase/forum-profiles.sql) — `profiles`, `reserved_usernames`, the guard trigger, admin moderation
- [`supabase/forum-profiles-hardening.sql`](../../supabase/forum-profiles-hardening.sql) — search_path pins + EXECUTE grants
- [`supabase/forum-profiles-rich.sql`](../../supabase/forum-profiles-rich.sql) — bio/riding_style/location/avatar-preset columns
- [`supabase/forum-profiles-rich2.sql`](../../supabase/forum-profiles-rich2.sql) — rich v2 columns + the **`avatars` Storage bucket**
- [`supabase/forum-riding-styles-dj.sql`](../../supabase/forum-riding-styles-dj.sql) — widens the riding-style CHECK for `dj`

**Findings only — nothing in the already-run files was patched.** Per the corpus boundary
([`INDEX.md`](INDEX.md) "Boundaries"), this specialist reviews and flags; changes route to the
coordinator. The fixable HIGH/MEDIUM findings are collected into **one new, additive, staged
migration — [`supabase/hardening-2.sql`](../../supabase/hardening-2.sql)** — for Douglas to run.
Nothing was executed against Supabase.

**Method bar:** this pass follows [`REVIEW-reviews-sql-2026-07-18.md`](REVIEW-reviews-sql-2026-07-18.md)
— severity-ranked, PROOF-required (every claimed vuln carries the concrete request/flow),
and a **§B Defenses-verified** section, because a review that is only findings is
indistinguishable from a review that didn't look. It also discharges that review's **F8
"cross-migration `(select auth.uid())` sweep is unfinished"** — see L3.

**These are LIVE, so "live outranks staged" cuts both ways:** a real exposure here is worse
than the same bug in `reviews.sql` (which is still staged), but a structural finding whose
trigger is "a partial migration run" is *conditional* on something that may already have
happened cleanly — I flag those honestly and give Douglas a one-query check rather than
asserting an exposure I cannot observe.

---

## A. Findings (most severe first)

| # | Severity | Summary | Fixed in `hardening-2.sql`? |
|---|---|---|---|
| H1 | **HIGH** | Any signed-in user can self-**pin** a forum thread to the top — `pinned` is not server-authoritative | ✅ yes |
| M1 | MEDIUM | RLS-enable is separated from `create table`; a partial run exposes tables incl. the owner's **real-name PII** to the anon key | ⚠️ re-asserts RLS; **verify live state (query below)** |
| M2 | MEDIUM | A user can point their profile **avatar_url at another user's photo** (public-photo impersonation) | ✅ yes |
| M3 | MEDIUM | Avatar objects are **not erased on account deletion** — GDPR-erasure gap in Storage | ❌ design item → Douglas |
| M4 | MEDIUM | Forum admin UPDATE can **rewrite content + reassign author_id**, no audit trail (A09) | ◑ author_id pinned; audit-log → Douglas |
| M5 | MEDIUM | `forum_threads`/`forum_posts` have **no length caps** and no volume anchor — storage/DoS + spam | ✅ caps added (NOT VALID) |
| L1 | LOW | `username_is_reserved()` is RPC-callable by `authenticated` → confirmation oracle for reserved (owner) names | ❌ routed → Douglas |
| L2 | LOW | `profiles.is_admin` is world-readable → **anon can enumerate moderators** | ❌ design trade-off → Douglas |
| L3 | LOW | The F8 sweep: bare `auth.uid()` (not `(select …)`) + missing `TO` targeting across every live policy | ❌ documented → own branch |
| I1–I4 | INFO | XSS-at-the-sink reminder; orphaned avatar objects on change; no profile self-delete; `builds.data` jsonb trust | — |

---

### H1 — HIGH · Any authenticated user can self-pin a forum thread to the top of the forum

**Caller:** any `authenticated` user, holding only the publishable key committed in `src/config.js` + their own signed-in JWT.

**The defect.** `forum_threads.pinned` (schema.sql line 96) is a privileged prominence flag —
it drives the pinned/announcement slot at the top of the forum, and the seed welcome thread is
the only row meant to carry it. But **nothing makes it server-authoritative.** The write
policies check *authorship only*:

```sql
-- schema.sql
create policy "forum threads insert" on public.forum_threads
  for insert to authenticated with check (auth.uid() = author_id);      -- line 125-126
create policy "forum threads modify" on public.forum_threads
  for update to authenticated using (auth.uid() = author_id)
                                with check (auth.uid() = author_id);     -- line 127-128
```

Neither clause constrains `pinned`. And — verified by grep across `supabase/*.sql` — **there is
no trigger on `forum_threads` at all**; the only guard triggers in the repo are `profiles_guard`,
`reviews_guard`, `builds_touch`, `reviews_touch`, `profiles_touch`. The RLS-19 server-
authoritative-flag pattern the project *already uses* for `profiles.is_admin`, `profiles.verified_pro`
and `reviews.hidden` was **never applied to `forum_threads.pinned`.** RLS gates *which rows* you
may write, not *which columns* (RLS-19) — so an owner writing their own row can set any column
value in that row, `pinned` included.

**The concrete exploit.** The app's `createThread` (src/forum.js line 108-114) sends only
`{title, body, category?}`, so `pinned` defaults false for normal use. A hand-crafted client
sends it directly:

```
curl -X POST "$SUPABASE_URL/rest/v1/forum_threads" \
  -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $USER_JWT" \
  -H "Content-Type: application/json" \
  -d '{"title":"⭐ BUY MY BRAND ⭐","body":"...","author_id":"<self-uuid>","pinned":true}'
```

`with check (auth.uid() = author_id)` passes (`author_id` is the caller). `pinned:true` is
written unopposed. And `listThreads` orders **`pinned desc, created_at desc`** (src/forum.js
lines 100-101, backed by index `forum_threads_pinned_created_idx`), so the row lands **above every
legitimate thread**, indistinguishable from an official pinned announcement. The same works via
PATCH on an existing owned thread.

**Blast radius.** An ordinary user seizes the forum's most prominent, authority-signalling slot
— permanently, for any number of threads, until a human admin notices and unpins/deletes each.
It is display-tier (no data exposed or destroyed), which is why it is HIGH and not CRITICAL — but
it is **exploitable by an ordinary authenticated caller with a single request**, which is the HIGH
bar, and it lands directly on the project's doubled, load-bearing **UNBIASED** value: a
self-pinned promotional/manufacturer-favouring thread wearing an announcement's authority is
exactly the astroturf the bias guardrail exists to stop. It is also strictly worse than
`reviews.sql`'s F4 astroturfing (which only *moves an average*): this *guarantees* the top slot.

**Fix (in `hardening-2.sql`).** `forum_threads_guard` — a BEFORE INSERT/UPDATE trigger mirroring
`profiles_guard`: for any end-user JWT (`auth.uid() IS NOT NULL`) that is **not** a forum admin,
force `pinned := false` on INSERT and `pinned := old.pinned` on UPDATE. Admins keep the ability to
pin (that is the feature); the service role / SQL editor (`auth.uid()` NULL — the seed path) is
untouched. Silent pin, not `RAISE`, consistent with the repo's other guards (RLS-20).

---

### M1 — MEDIUM · A partial migration run leaves tables created but RLS disabled — including the owner's real-name PII

**Caller:** `anon` (publishable key only), **if** the precondition holds.

**The defect.** In both `schema.sql` and `forum-profiles.sql`, `enable row level security` is
separated from its `create table` by intervening, fallible statements:

- `schema.sql`: `builds` (line 17) and `inventory` (line 33) are created; then two `create index`
  (44-45); RLS is enabled only at **lines 50-51**.
- `forum-profiles.sql`: `reserved_usernames` (line 78) is created **and seeded with the owner's
  real legal name** (lines 88-101); `profiles` is created (line 109); then a unique index, three
  `create function`s and two `create trigger`s run; RLS is enabled only at **lines 214-215**.

Per RLS-12, a table created in `public` receives `SELECT/INSERT/UPDATE/DELETE` grants for `anon`
and `authenticated` **automatically**; per RLS-2, RLS is the *only* thing between it and the
committed publishable key. If any statement in the gap fails under statement-level autocommit
(`supabase db push` / `psql -f` without `-1` — both named in the file headers as intended paths),
the script aborts with the table **created, granted, and RLS-less.**

**Why it is worse in `forum-profiles.sql` specifically.** The exposed table there is
`reserved_usernames`, whose whole purpose is to keep the owner's real-name rows **private** (only
`kind='held'` is world-readable; the `'blocked'` rows — `Douglas Wadsworth Wills`, `Douglas Wills`,
`Doug Wills`, … — are deliberately withheld). A partial run that stops before line 215 leaves
those PII rows readable by anon:

```
curl "$SUPABASE_URL/rest/v1/reserved_usernames?select=label,note" -H "apikey: $PUBLISHABLE"
# -> the owner's real legal name + variants, the exact thing the SELECT policy hides
```

**Honest scoping — this is conditional, and I cannot observe the live DB.** If any of these six
tables had RLS *off* right now, the symptom would be loud: a logged-in user would see **everyone's**
saved builds/inventory in their own garage, and anon could read the private reserved rows. The app
appears to work, which is weak evidence RLS is on — but weak is not proof. **The unconditional risk
is re-bootstrap / disaster-recovery:** these files are the committed source-of-truth, and the next
person who re-runs them inherits the same fragility.

**What Douglas should do (cannot be answered from code — it is live DB state):**

```sql
-- Run in the Supabase SQL editor. Every row must show rowsecurity = true.
select relname, relrowsecurity as rls_enabled
from pg_class
where relnamespace = 'public'::regnamespace
  and relname in ('builds','inventory','forum_threads','forum_posts','profiles','reserved_usernames');
```

**Fix (in `hardening-2.sql`).** The migration re-asserts `enable row level security` on all six
tables (idempotent). For the *source* files, the house rule going forward (add to RLS-26): **enable
RLS in the same breath as `create table`, never later in the file** — failing before creating
anything is strictly safer than failing partway.

---

### M2 — MEDIUM · A profile's avatar_url can point at another user's photo (public-photo impersonation)

**Caller:** any `authenticated` user.

**The defect.** `forum-profiles-rich2.sql` CHECK-pins `avatar_url` to the avatars bucket **prefix**
but not to the caller's **own folder** (line 107):

```
avatar_url ~ '^https://pabiaerjadeeggwoslng\.supabase\.co/storage/v1/object/public/avatars/[A-Za-z0-9._/-]+(\?v=[0-9]+)?$'
```

`[A-Za-z0-9._/-]+` matches any path in the bucket, including `<another-user-uuid>/photo.jpg`. The
storage policies correctly confine *object writes* to the caller's own folder (rich2 line 219-224)
— but the **profile row is a separate object from the file**, and nothing ties `avatar_url` to the
writer. (This is the exact class as `reviews.sql`'s F3, here on the live avatars surface.)

**The concrete exploit.** `profiles` is world-readable, so avatar URLs are discoverable:

```
# 1. read victim A's avatar_url
curl "$SUPABASE_URL/rest/v1/profiles?select=user_id,avatar_url&avatar_url=not.is.null" -H "apikey: $PUBLISHABLE"
# 2. B sets B's OWN profile to display A's photo
curl -X PATCH "$SUPABASE_URL/rest/v1/profiles?user_id=eq.<B-uuid>" \
  -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $B_JWT" \
  -H "Content-Type: application/json" \
  -d '{"avatar_url":"https://pabiaerjadeeggwoslng.supabase.co/storage/v1/object/public/avatars/<A-uuid>/me.jpg"}'
```

RLS (`auth.uid() = user_id`, B's own row) passes; the prefix CHECK passes; `profiles_guard` pins
`is_admin` (irrelevant). B's forum presence now wears A's face.

**Blast radius.** Impersonation — and impersonation is a threat this project *explicitly* designs
against (the entire `reserved_usernames` system exists to stop name-impersonation of the owner;
wearing another rider's face is the same attack on a different field). Bounded to MEDIUM because
the bytes were public-read regardless (nothing confidential leaks) and B can only alter B's own
row. Compounds with L2: pair a copied photo with a lookalike username and the impersonation is
convincing.

**Fix (in `hardening-2.sql`).** A CHECK cannot reference `auth.uid()` (not immutable), so the
owner-folder binding goes in the `profiles` INSERT/UPDATE policies' `WITH CHECK`: `avatar_url`,
when present, must `like '…/avatars/' || auth.uid()::text || '/%'`. The client already uploads to
its own folder, so legitimate writes are unaffected.

---

### M3 — MEDIUM · Avatar objects are not erased when an account is deleted (Storage GDPR-erasure gap)

**Caller:** n/a — this is a data-lifecycle gap, exercised by an account deletion.

**The defect.** The owner-scoped pattern's erasure story (RLS-17 link 3) is `on delete cascade`:
deleting the `auth.users` row cascades `builds`, `inventory`, `profiles` away. But **`storage.objects`
carries no foreign key to `auth.users`**, so the avatars-bucket bytes are *not* cascaded. After a
user deletes their account:

```
# profiles row is gone (cascaded), but:
curl -I "https://pabiaerjadeeggwoslng.supabase.co/storage/v1/object/public/avatars/<deleted-uuid>/me.jpg"
# -> 200 OK, the photo still serves (public bucket)
```

The user's uploaded face persists, publicly, indefinitely. For a project whose erasure story is
"delete the account and the cascade handles it," this is a real gap between the promise and the
mechanism — the same class the `reviews.sql` review raised for review photos, here on the *live*
avatars bucket.

**Blast radius.** Privacy / right-to-erasure: a rider who deletes their account reasonably expects
their photo gone; it is not. MEDIUM because the bytes were public while the account lived (not a
confidentiality break) but a lingering-after-deletion identity photo has real privacy weight.

**Fix — routed to Douglas (not a pure migration).** Storage-object cleanup on user deletion needs
either (a) a Supabase Auth "before user deleted" hook / edge function that empties `avatars/<uid>/`,
or (b) a periodic reconciler that deletes bucket folders with no matching `profiles` row, or (c) a
documented manual step in the account-deletion runbook. This is a design decision, not a line to
patch, so it is flagged, not built.

---

### M4 — MEDIUM · Forum admin UPDATE can rewrite content and reassign authorship, with no audit trail

**Caller:** any account with `profiles.is_admin` (or an ATO'd admin — a named threat, MKT-5).

**The defect.** The admin forum-update policies (forum-profiles.sql lines 257-268) constrain only
*who*, never *what*:

```sql
create policy "forum threads admin modify" on public.forum_threads
  for update to authenticated using (public.is_forum_admin()) with check (public.is_forum_admin());
```

There is no guard trigger on the forum tables (grep-verified), so an admin can PATCH any thread/post
— rewriting `body`, and **reassigning `author_id` to any user**:

```
curl -X PATCH "$SUPABASE_URL/rest/v1/forum_threads?id=eq.$TID" \
  -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $ADMIN_JWT" \
  -H "Content-Type: application/json" \
  -d '{"body":"(edited)","author_id":"<some-other-user-uuid>"}'
```

Two problems, different weights:
1. **Authorship reassignment is almost certainly unintended** — nothing in the design contemplates
   moving a thread onto another account. It breaks attribution and can plant words on an unwitting
   user. **Fixed here.**
2. **No audit trail (A09:2025).** No table/column/trigger records who edited, hid, or deleted what.
   An admin edit is indistinguishable from the author's own words, and Douglas cannot audit his own
   moderators. On a site whose promise is "we only remove mechanical abuse" (ABU-1), an unlogged
   moderation system **cannot evidence the promise it makes.**

**Blast radius.** Insider / ATO'd-admin risk (hence MEDIUM, not higher) — but with unlogged rewrite
power over all user speech in the *live* forum.

**Fix.** `hardening-2.sql` pins `author_id := old.author_id` on every end-user forum UPDATE (admins
included — no legitimate reassignment path), closing problem 1. **Problem 2 (the append-only
moderation log — `who / action / before / at`, admin-readable) is routed to Douglas** as a design
item worth solving once, generically, for the forum *and* the staged reviews system. Optionally,
narrow the admin power to *hide/delete*, not *rewrite*, to match the free-speech-first doctrine
(ABU-1 implies a remove power, not an edit power).

---

### M5 — MEDIUM · Forum threads/posts have no length cap and no volume anchor

**Caller:** any `authenticated` user.

**The defect.** Every `profiles` field is length-capped, and `reviews` caps its text — but the
**live** `forum_threads.title/body` and `forum_posts.body` are unbounded `text not null` with no
CHECK. The only anti-abuse anchor on the forum is Supabase's account-creation limit (30 signups/hr/IP,
RLS-30); once an account exists it can post **unlimited threads/posts of unlimited size**.

```
# one 25 MB body:
curl -X POST "$SUPABASE_URL/rest/v1/forum_posts" -H "apikey: $PUBLISHABLE" \
  -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
  -d "{\"thread_id\":\"$TID\",\"body\":\"$(head -c 25000000 /dev/zero | tr '\0' 'A')\"}"
# or a flood loop of thousands of rows
```

**Blast radius.** Storage/render DoS + spam floor (this is the ABU-6 unbounded-write the reviews
review's scope statement explicitly left un-reviewed for the live forum). Bounded to MEDIUM: needs
an account, no data exposure, cleanable — but it is a real cost/DoS surface and the asymmetry with
the capped tables shows the forum predates the discipline.

**Fix (in `hardening-2.sql`).** Bounded CHECKs (`title` 1–300, bodies ≤ 20000), added **NOT VALID**
so they enforce on new writes without a full-table scan of existing rows — safe on the populated
live table. Douglas can `VALIDATE CONSTRAINT` later once he confirms no legacy row exceeds them.
Rate/volume limiting (threads-per-hour) is a separate abuse-layer concern for `abuse-moderation.md`.

---

### L1 — LOW · `username_is_reserved()` is an RPC-callable confirmation oracle for reserved names

**Caller:** any `authenticated` user.

`forum-profiles-hardening.sql` correctly revokes EXECUTE from `public`/`anon` but grants it to
`authenticated` (line 219 — required: the guard trigger runs as that role). Because the function is
`SECURITY DEFINER` and lives in the exposed `public` schema, `authenticated` can also call it
directly over PostgREST RPC:

```
curl -X POST "$SUPABASE_URL/rest/v1/rpc/username_is_reserved" \
  -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" -d '{"p_norm":"dougwills"}'   # -> true
```

It **confirms** a guessed normalized name is reserved (the `'blocked'` rows are otherwise withheld
from clients), i.e. an attacker who suspects the owner's real name can verify it. It does **not
dump** the list. **Marginal, and why it stays LOW:** an equivalent oracle already exists via the
guard itself — attempting a profile write with a candidate username returns the distinctive
`'That username is reserved'` error. The RPC is just a tidier version of a disclosure the design
already accepts.

**Options (routed to Douglas):** make the reserved-name check a `SECURITY DEFINER` *trigger-internal*
helper not independently RPC-exposed, or accept the oracle as equivalent to the pre-existing one and
document it. Not fixed here (it needs the design call, and the marginal exposure doesn't justify
touching the security-critical guard's shape mid-review).

---

### L2 — LOW · `profiles.is_admin` is world-readable — anon can enumerate the moderators

**Caller:** `anon`.

`profiles read` is `using (true)` (forum-profiles.sql line 222) over the whole row, `is_admin`
included (the header calls this deliberate — "usernames and the is_admin marker are public"). So:

```
curl "$SUPABASE_URL/rest/v1/profiles?select=username&is_admin=eq.true" -H "apikey: $PUBLISHABLE"
# -> the full list of moderator usernames
```

Publishing *who the admins are* hands an attacker a target list for social engineering / ATO
(and MKT-5 names the ATO'd-admin as a real threat). **Why LOW, and an honest trade-off:** RLS is
row-level, not column-level, so hiding one column needs a view or column privileges — and RLS-22's
elegant `is_forum_admin()`-as-SECURITY-INVOKER design *depends* on `profiles` being world-readable
(the caller must be able to read their own `is_admin`). Restricting it is not free. Recommendation
(→ Douglas): expose `verified_pro` (the public badge) publicly, but consider serving `is_admin`
only to the owner's own row + admins via a view or a split, *if* the moderator-enumeration surface
is judged worth the added complexity. Flagged for awareness; not fixed.

---

### L3 — LOW · The F8 cross-migration sweep: bare `auth.uid()` and missing `TO` targeting

This discharges `reviews.sql`'s **F8** ("the cross-migration sweep is explicitly unfinished — this
is it"). Per RLS-8 and RLS-9, Supabase recommends `(select auth.uid())` (per-statement initPlan
caching, a measured **>94%** win) and `TO role` targeting on every policy. Across the live files:

- **`schema.sql`** `own builds` / `own inventory` are `for all` with **no `TO` clause** (evaluated
  for anon too) and bare `auth.uid()`. The forum policies use bare `auth.uid()` throughout.
- **`forum-profiles.sql`** `profiles insert/update`, `reserved held readable`, and the admin
  policies (`using (public.is_forum_admin())`, not `(select …)`) all use the bare form.
- **`forum-profiles-rich2.sql`** storage policies use bare `auth.uid()`.

**Impact today is small** (tables are tiny; correctness is unaffected — the policies fail closed for
anon either way), so this is hygiene that matters as tables grow, not a live problem, and I will not
inflate it. **Not fixed in `hardening-2.sql`:** it is a broad, purely-mechanical rewrite of nearly
every policy in every file, and that risk is better isolated on its own branch than bundled with the
security fixes. Recommended as a dedicated sweep, and added to RLS-26 as house style for new policies.

---

### INFO

- **I1 — XSS at the sink (WEB-12).** `bio`, `tagline`, `home_trails`, `current_bike`, and forum
  `title`/`body` are free text that reaches the DOM. Escaping is correctly *not* the DB's job — but
  the renderer (`src/forum.js`, `index.html`) **must** HTML-escape them (`esc()`, covered by
  `test/test-ui.js`). The charset CHECKs on `username`/social handles/`avatar` block injection in
  *those* fields; the free-text fields have no such CHECK (correctly) and depend entirely on the
  sink. Out of scope for a SQL review — recorded so the client review picks it up.
- **I2 — Orphaned avatar objects on *change* (not just deletion).** When a user swaps their avatar,
  the old `avatars/<uid>/…` object is not removed. Storage-cost/hygiene, not security; same cleanup
  mechanism as M3 would cover it.
- **I3 — No profile self-delete.** `profiles` has no DELETE policy (deletion only via account-cascade,
  by design). A deliberate product choice — flagged so it stays deliberate.
- **I4 — `builds.data` is arbitrary owner-scoped jsonb.** Trusted only because it is owner-scoped and
  re-sanitized through `sanitizeShare()` on read (schema.sql lines 12-16). Correct; recorded as the
  reason it is safe, not a finding.

---

## B. Defenses verified — these HOLD

Per the PROOF-bar corollary: the walked-through negative result is as valuable as a finding.

**B1 — The escalation-impossible chain is intact (RLS-21).** `profiles_guard` pins `is_admin`/
`verified_pro` for every caller with `auth.uid() IS NOT NULL` — `false` on INSERT, `OLD` on UPDATE —
so a hand-crafted `{"username":"x","is_admin":true}` saves the username and silently drops the flag.
`is_forum_admin()` can therefore only ever be true for a service-role-blessed row. Walked across all
six files: **none introduces a new path that writes `profiles` bypassing the guard**, so the chain
holds. (The forum-profiles-rich/rich2/dj files add only *unprivileged* columns and CHECKs; the guard
fires on the whole row regardless of which columns changed — Postgres triggers are per-row, not
per-column — so the pin still runs on a bio-only or riding_style-only edit.)

**B2 — `is_forum_admin()` as SECURITY INVOKER + STABLE is correct, not an oversight (RLS-22).** Safe
as invoker because `profiles` is world-readable; **no RLS recursion** because `profiles` policies
never reference the forum tables. Checked specifically because "admin helper isn't SECURITY DEFINER"
pattern-matches as a finding and is not one.

**B3 — The silent pin (assign, not RAISE) is the right choice (RLS-20).** Avoids failing legitimate
writes and denies the attacker an oracle. The new forum guards in `hardening-2.sql` follow the same
convention deliberately.

**B4 — search_path is pinned on every SECURITY DEFINER / trigger function (RLS-23).**
`username_is_reserved` (`security definer`, `set search_path = public, pg_temp`) and, via
`forum-profiles-hardening.sql`, `touch_updated_at` / `profile_norm` / `is_forum_admin` /
`profiles_guard` all pin it, `pg_temp` last so a caller-created temp object cannot shadow a public
name. The schema-qualification audit in that file's header was spot-checked against the bodies and
is accurate. Holds.

**B5 — EXECUTE-grant hygiene on `username_is_reserved` is correct (RLS-14/15).** `revoke from public`
+ `revoke from anon` + `grant to authenticated` (required — the guard runs as that role and fails
CLOSED without it) + `grant to service_role` (RLS-15: `service_role ∈ PUBLIC`, so the revoke would
otherwise strip it). The reasoning in the file's header is sound, not over-permissioning. (The RPC
oracle this grant enables is L1 — a disclosure question, not a grant error.)

**B6 — The avatar Storage bucket write-scoping holds (RLS-27).** `avatars` is public-read, but
object writes are `to authenticated` and confined to the caller's own top-level folder via
`(storage.foldername(name))[1] = auth.uid()::text` on insert/update/delete (rich2 lines 216-242).
No anon write policy exists. A cross-user or arbitrary-path object write is impossible. `file_size_limit`
(2 MiB) + `allowed_mime_types` (jpeg/png/webp) are bucket-level, enforced server-side (RLS-28: the
`update` policy is present, so upsert/overwrite works, not just first upload). **M2 is not a hole in
this** — it is in the *profiles table row* that references the bucket, which this scoping does not
reach.

**B7 — The owner-scoped pattern on `builds`/`inventory` is textbook (RLS-17).** `user_id uuid not
null default auth.uid() references auth.users(id) on delete cascade` + a single `for all` policy
`using/with check (auth.uid() = user_id)`. The client never sends `user_id` (can't get it wrong) and
can't forge it (`with check` rejects another user's id). Anon fails closed (`NULL = user_id` false).
`inventory`'s `unique(user_id, part_id)` and `qty > 0` CHECK are correct. (The missing `TO
authenticated` is L3 hygiene, not a hole — the policy fails closed for anon regardless.)

**B8 — Public-read / owner-write on the forum is correct (RLS-18).** `for select using (true)` opens
reads to logged-out browsers; separate `to authenticated` write policies each check
`auth.uid() = author_id`. `author_id` nullable + `on delete set null` lets the system-seeded welcome
thread exist with no human author. A non-owner non-admin satisfies no write policy on another's
thread/post. Holds — the H1 gap is specifically `pinned` (a *column* within an owned row), not the
row-ownership model, which is sound.

**B9 — Idempotency is real across every file (RLS-25).** `create table if not exists`,
`drop policy if exists` before every create, guarded `DO … pg_constraint` blocks for every CHECK
(bare `ADD CONSTRAINT` is not idempotent), `on conflict do nothing/update` seeds, `add column if not
exists`. This is what makes "run it again" a safe recovery — **and precisely what makes M1's fix
(re-run to re-assert RLS) safe**, and what `hardening-2.sql` itself relies on.

**B10 — The reserved-name PII rows are withheld from clients (by policy).** `reserved_usernames`
exposes only `kind='held'`; the `'blocked'` real-name rows are private. Correct — **subject to M1**
(a partial run that never enables RLS would expose them) and **L1** (the RPC oracle can *confirm* a
guessed one, but not dump the set).

**B11 — The caller-walkthrough + post-migration-invariants convention is present and exemplary
(RLS-26).** `forum-profiles.sql`, `-hardening.sql`, `-rich.sql`, `-rich2.sql` each open with an
anon → authenticated → admin → service_role walkthrough and close with an invariants block. This is
the single best security practice in the repo and it is why this review could be written with
confidence about intent. `hardening-2.sql` follows the same convention. **Gap worth noting:** the
original `schema.sql` (the oldest file) has a short security note but *no* full caller walkthrough or
invariants block — worth backfilling for the file that defines the core owner-scoped tables.

---

## C. Questions (not findings — insufficient proof / live-only state)

1. **Is RLS actually enabled on all six live tables right now?** M1's query answers it. This is the
   single most important thing to confirm coming out of this review — everything else assumes it.
2. **Does the Supabase SQL editor wrap a pasted multi-statement script in one transaction?** If it
   does, M1's partial-run exposure is limited to the `psql`/`db push` paths (still real, since the
   file headers name them). Unverified this round.
3. **Has the Supabase production checklist (RLS-31) been walked?** Unchanged from the prior review and
   still open — the two that matter most for a one-person project: **MFA on the Supabase account
   itself** (the master key — a phished password is total compromise no RLS mitigates) and **a second
   org owner** for recovery. Dashboard state, not repo state.
4. **What is the intended admin moderation UI?** M4's residual severity depends on whether admins act
   through a narrow hide/delete control or general row editing.

---

## D. Scope & honesty statement

**Reviewed in full:** all six files named at the top, against each other for the helpers/patterns they
share, and against `src/forum.js` / `src/config.js` for the caller facts H1/M2/L1 depend on.

**Gates (inert for a SQL-only branch, run anyway):** `node validate.js` → 0 problems; `npm test` →
**602 passed**; `npm run typecheck` → clean. (Run from the primary checkout — the branch adds only
`supabase/hardening-2.sql` + this doc, so JS behaviour is unchanged; the worktree has no `node_modules`.)

**NOT reviewed, and therefore not cleared:**
- `supabase/reviews.sql` — staged, already reviewed in `REVIEW-reviews-sql-2026-07-18.md`; out of this
  pass's scope (this pass is the *live* files).
- Client render/escaping (I1) — the XSS sink lives in `src/forum.js` / `index.html`, not these files.
- Supabase **dashboard** configuration (§C) — auth rate limits, CAPTCHA, MFA, SSL, org owners. Cannot
  be answered from repo state.
- Live DB state — nothing was executed against Supabase; M1's exposure is stated as *conditional* and
  handed to Douglas as a query, not asserted.

**No changes were made to any already-run file, or to anything outside
`supabase/hardening-2.sql` and `tools/security/`.**

---

## What needs Douglas before `hardening-2.sql` runs

1. **Confirm RLS is enabled on all six live tables** (M1 query). If any row shows `false`, that is an
   active exposure — treat as CRITICAL and enable immediately.
2. **Decide the M5 caps** are acceptable (300 title / 20000 body) or adjust before running; they go in
   NOT VALID so existing rows won't block the migration either way.
3. **Design decisions routed out of the migration:** the M3 avatar-erasure hook, the M4 moderation
   audit log (+ optional hide-only admin narrowing), the L1 oracle stance, and the L2 admin-visibility
   trade-off. None blocks running `hardening-2.sql`; each is a separate follow-up.
4. `hardening-2.sql` is **staged, not run.** It must be executed in the Supabase SQL editor by the
   owner, after the existing migrations — same as every other file here. It changes no already-run file.
