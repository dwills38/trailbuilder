# Security Review — `supabase/reviews.sql` (STAGED)

**Date:** 2026-07-18 · **Reviewer:** security-expert (bootstrap round) · **Target:**
[`supabase/reviews.sql`](../../supabase/reviews.sql) @ `7c6ab0b`, 400 lines, **staged — not
yet run against the live project.**

**Findings only. Nothing was patched.** Per the corpus boundary, this specialist reviews and
flags; every change routes to the coordinator.

**This file predates the security corpus.** It was written before `tools/security/` existed
and is reviewed here against it for the first time. That framing matters: the file is
**well above the median** for this kind of migration — it walks its callers, states its
invariants, pins its privileged column in a trigger, and gets the hard parts right. The
findings below are not a verdict on its quality; §B is as much a part of the review as §A.

**Timing is favourable.** Per `client-trust.md` CLI-11, a staged migration is inert until it
is *run* — but once run, its policies are live to the committed publishable key regardless of
any feature flag. **This review is happening inside the safe window.** F1 in particular is
much cheaper to fix now than after the file has been executed.

---

## A. Findings (most severe first)

| # | Severity | Summary |
|---|---|---|
| F1 | **HIGH** | A partial run leaves `reviews` created with RLS **not enabled** — full anon read/write |
| F2 | **HIGH** | Hiding a review does not hide its photos; hidden reviews are also enumerable |
| F3 | MEDIUM | A photo row may point at another user's storage object |
| F4 | MEDIUM | No cost anchor on reviews — astroturfing costs one email address per fake rating |
| F5 | MEDIUM | Photo cap is a TOCTOU race; the in-file comment overclaims it as impossible |
| F6 | MEDIUM | Admin UPDATE can rewrite content and reassign authorship, with no audit trail |
| F7 | LOW | New functions don't carry the EXECUTE-grant hygiene the hardening migration established |
| F8 | LOW | RLS performance idiom (`(select auth.uid())`) not applied |
| F9 | INFO | `review_reports` has no SELECT policy — insert may fail if the client requests a representation |

---

### F1 — HIGH · A partial run leaves `reviews` with RLS disabled and default anon grants

**Caller:** `anon` — anyone at all, using the publishable key committed in `src/config.js`.

**The defect.** Tables are created at lines 86–196. `alter table … enable row level security`
does not appear until **lines 246–248**. Between those points the script executes guarded
`DO` blocks, two `create or replace function`s, two `create trigger`s, and four
`create index`es. **If any statement in that span fails, the script aborts with the tables
created and RLS never enabled.**

Per `supabase-rls.md` RLS-12, a table created in `public` receives `SELECT`/`INSERT`/`UPDATE`/
`DELETE` grants for `anon` and `authenticated` **automatically**. RLS is the only thing
standing between it and the publishable key (RLS-2, `client-trust.md` CLI-4). Without it,
`public.reviews` is world-readable **and world-writable**.

**The concrete flow.** The file's own header states it must be run *after* `schema.sql`
(it needs `public.touch_updated_at()`) and *after* `forum-profiles.sql` (it needs
`public.is_forum_admin()`). **Nothing enforces that ordering.** Run `reviews.sql` first — an
entirely foreseeable operator error on a fresh project, or when re-bootstrapping — and:

```
psql "$DATABASE_URL" -f supabase/reviews.sql
-- ... tables, constraints, indexes created ...
-- line 229: create trigger reviews_touch ... execute function public.touch_updated_at();
ERROR:  function public.touch_updated_at() does not exist
-- script aborts. Lines 246+ never run.
```

Then, with **no credential beyond the committed publishable key**:

```
curl "$SUPABASE_URL/rest/v1/reviews?select=*" -H "apikey: $PUBLISHABLE"          # reads everything
curl -X POST "$SUPABASE_URL/rest/v1/reviews" -H "apikey: $PUBLISHABLE" \
     -H "Content-Type: application/json" \
     -d '{"user_id":"<any uuid>","part_id":"x","rating":5,"hidden":false}'        # writes anything
```

Note the second call: the guard trigger *was* created (line 223, before the failure point),
but it only pins `hidden` when `auth.uid() is not null`. For an anon caller `auth.uid()` is
NULL, so **the guard deliberately steps aside** — it was designed on the assumption that only
`service_role` reaches that branch. With RLS off, `anon` reaches it too. The guard and the RLS
enable are load-bearing *together*, and the file's ordering lets them separate.

**Precondition, stated honestly.** This requires statement-level autocommit rather than the
whole script running in one transaction. Under `psql -f` without `-1` (and `supabase db push`,
both documented in the file's header as the intended paths) each statement autocommits, so the
abort leaves the completed work committed — the exploit holds. **Whether the Supabase SQL
editor wraps a pasted multi-statement script in a single transaction was not verified this
round**; if it does, that one path rolls back cleanly. The finding stands on the `psql`/CLI
path, which the file explicitly names.

**Blast radius.** Total compromise of the reviews subsystem: read every review including
admin-hidden ones, forge reviews under any user's id, delete anyone's review. Silent — nothing
errors, nothing logs, and the app works normally.

**Recommended fix (coordinator).** Move `enable row level security` to **immediately after
each `create table`**, before any dependent object. It is idempotent, so this costs nothing.
Optionally add a hard precondition at the top of the file:

```sql
do $$ begin
  if to_regprocedure('public.touch_updated_at()') is null
     or to_regprocedure('public.is_forum_admin()') is null then
    raise exception 'Run supabase/schema.sql and supabase/forum-profiles.sql first.';
  end if;
end $$;
```

Failing *before* creating anything is strictly safer than failing partway through.

**Generalize it.** This ordering applies to `schema.sql` and `forum-profiles*.sql` too — worth
a sweep, and worth adding to the house checklist (`supabase-rls.md` RLS-26) as: **"enable RLS
in the same breath as `create table`, never later in the file."**

---

### F2 — HIGH · Hiding a review does not hide its photos, and leaks which reviews were moderated

**Caller:** `anon`.

**The defect.** The `reviews` read policy correctly filters hidden rows (line 262):

```sql
create policy "reviews read" on public.reviews
  for select using (not hidden or auth.uid() = user_id or public.is_forum_admin());
```

The `review_photos` read policy does not (line 297):

```sql
create policy "review photos read" on public.review_photos
  for select using (true);
```

`review_photos` rows carry `review_id`, `user_id` and the public `url`. **Nothing filters them
by the parent review's visibility.**

**Exploit A — moderation is defeated for imagery.** An admin hides a review because its photo
is abusive, doxxing, or otherwise the mechanical abuse the moderation system exists to remove.
The review card disappears. Then:

```
curl "$SUPABASE_URL/rest/v1/review_photos?select=url,review_id,user_id" \
     -H "apikey: $PUBLISHABLE"
```

returns the URL, and the bucket is `public = true`, so the image fetches. **The hide did not
remove the thing it was performed to remove.**

The file *does* acknowledge that bytes survive a hide (line 294: hiding "does NOT delete the
image bytes; only a DELETE removes the object"). **That is not the same claim.** Retained-but-
unreachable bytes are a normal, acceptable moderation posture — the URL is unguessable in
practice, so a hide is effectively a removal. Here the URL is **served by the API to anyone**,
so it is not unreachable at all. The acknowledgement covers retention; it does not cover
discoverability, and discoverability is what makes it a finding.

**Exploit B — enumerate moderated content.** Fetch both endpoints and diff:

```
review_ids_from_photos  -  review_ids_from_reviews  =  the hidden set
```

Any `review_id` appearing in `review_photos` but absent from `reviews` is a hidden review, with
its author's `user_id` attached. An anon caller thereby obtains **a list of every moderated
review and who wrote it** — a moderation-transparency leak on a site whose credibility rests on
moderation being restrained (`abuse-moderation.md` ABU-1, ABU-13).

**Blast radius.** Defeats image moderation entirely; leaks the moderation log to the public.
Bounded to reviews that have photos.

**Recommended fix (coordinator).** Make photo visibility inherit the parent's. Because RLS on
`reviews` already applies inside the subquery for the invoking caller, `exists` alone is
sufficient and stays in step automatically if the reviews policy ever changes:

```sql
create policy "review photos read" on public.review_photos
  for select using (
    exists (select 1 from public.reviews r where r.id = review_id)
  );
```

**And update the honesty note (line 294)** to state the real, weaker guarantee: a hide removes
the card and the API-discoverable reference; **the object itself is only removed by a hard
delete**, so an abusive image still requires an explicit storage delete (the policy for which
already exists at line 380). Two-step moderation is fine — a moderator silently believing it is
one step is not.

---

### F3 — MEDIUM · A photo row may point at another user's storage object

**Caller:** any `authenticated` user.

**The defect.** The `review_photos.url` CHECK (line 151) pins the **bucket prefix** but not the
owner folder:

```
'^https://pabiaerjadeeggwoslng\.supabase\.co/storage/v1/object/public/review-photos/[A-Za-z0-9._/-]+(\?v=[0-9]+)?$'
```

`[A-Za-z0-9._/-]+` matches any path inside the bucket, including `<someone-else's-uuid>/…`.
The storage policies correctly confine *object writes* to the caller's own folder (line 359),
but **the table row is a separate object from the file**, and no check ties them together.

**Exploit.** User B, authenticated, having created their own review:

```
curl -X POST "$SUPABASE_URL/rest/v1/review_photos" \
  -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $B_JWT" \
  -H "Content-Type: application/json" \
  -d '{"review_id":"<B_review_id>",
       "url":"https://pabiaerjadeeggwoslng.supabase.co/storage/v1/object/public/review-photos/<A_uuid>/<A_review_id>/photo.jpg"}'
```

Both policy conditions hold — `auth.uid() = user_id` (B's own row) and the parent review
belongs to B — and the CHECK passes. B has attached A's photograph to B's review.

**Blast radius.** Misattribution of user content; a rider's photo appears under a stranger's
review, possibly a fraudulent one. Compounding: when A deletes their review, the cascade
removes A's photo rows but **not B's**, so A's image keeps being displayed after A believed
they removed it — a deletion-expectation violation with privacy weight. Bounded by the bucket
being public-read regardless (the bytes were never confidential), which is why this is MEDIUM
and not HIGH.

**Recommended fix (coordinator).** A CHECK constraint cannot reference `auth.uid()` (not
immutable), so pin it in the INSERT policy:

```sql
create policy "review photos owner insert" on public.review_photos
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and exists (select 1 from public.reviews r where r.id = review_id and r.user_id = auth.uid())
    and url like 'https://pabiaerjadeeggwoslng.supabase.co/storage/v1/object/public/review-photos/'
                 || auth.uid()::text || '/%'
  );
```

This makes the row-level claim and the object-level permission agree, which is the invariant
the design already assumes.

---

### F4 — MEDIUM · No cost anchor on reviews: astroturfing costs one email address per fake rating

**Caller:** anyone willing to register accounts.

**The defect.** The only anti-abuse control on review authorship is `UNIQUE(user_id, part_id)`
(line 97), described in-file as the anti-spam / anti-astroturf measure. Per
`abuse-moderation.md` ABU-7 and ABU-9, a per-account uniqueness constraint is only as strong as
the cost of an account — and per Supabase's documented limits (ABU-5) anonymous signups run at
**30/hour/IP**, i.e. ~720/day from a single address and unbounded across a proxy pool.

**Exploit.** Register N accounts; from each, POST one 5-star review of the target part. Every
row satisfies `reviews insert` (`auth.uid() = user_id`) and the UNIQUE constraint (different
`user_id` each time). Nothing counts, throttles, or correlates. The part's aggregate rating —
computed client-side over exactly the visible set, per the design at line 260 — moves by
whatever N the attacker chose.

**Blast radius.** Display-tier only: reviews are firewalled from `checkBuild` and from catalog
ordering (line 45), so **no compatibility verdict can be corrupted by this** — a genuinely
important structural limit, and the firewall deserves credit for it. But it lands squarely on
**UNBIASED**, this project's doubled, load-bearing value: a manipulable star rating is a
manufacturer-favouring signal that money or effort can buy, which is exactly what the bias
guardrail exists to prevent.

**Why MEDIUM and not HIGH.** No data is exposed or destroyed, the firewall bounds it to
display, and the current user base makes manual cleanup feasible. **It becomes HIGH the day
review scores are shown prominently enough to influence purchases**, which is the whole point
of building them.

**Recommended direction (coordinator) — and an honest admission that this is unsolved.**
`marketplace-payments.md` MKT-19 solves the *marketplace* case elegantly: no settled
transaction, no review, so each fake signal costs real money. **That mechanism does not
transfer here** — you cannot require a purchase to review a part someone already owns, and
requiring one would exclude exactly the experienced riders whose reviews are most valuable.
Available partial levers, all content-neutral and therefore compatible with ABU-1:
- **CAPTCHA on signup** (ABU-8) — available in Supabase today; raises per-account cost without
  touching content. **Current status unknown — a dashboard question for Douglas.**
- **Account-age or activity gating** before a review counts toward the displayed aggregate.
- **Weight the aggregate by reviewer diversity/history** rather than raw count — the
  counterparty-diversity idea from MKT-20 applied to ratings.
- **Display the review count and distribution honestly**, so a 40-review part with a suspicious
  histogram is legible to a human. Consistent with the app's "No conflicts found" voice: state
  the weaker true thing rather than a confident average.

This is a **design problem to decide before launch**, not a line to patch.

---

### F5 — MEDIUM · The photo cap is a TOCTOU race, and the comment claims otherwise

**Caller:** any `authenticated` user, against their own review.

**The defect.** `review_photos_cap()` (line 159) is a BEFORE INSERT trigger that counts:

```sql
if (select count(*) from public.review_photos where review_id = new.review_id) >= 6 then
```

Under READ COMMITTED, concurrent transactions each see the pre-insert count. Two — or twenty —
transactions can all read 5, all pass the check, and all commit.

**Exploit.**

```
for i in $(seq 1 24); do
  curl -s -X POST "$SUPABASE_URL/rest/v1/review_photos" \
    -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $JWT" \
    -H "Content-Type: application/json" \
    -d "{\"review_id\":\"$RID\",\"url\":\"$VALID_URL_$i\"}" &
done; wait
```

More than 6 rows land. **The specific claim at line 157 — that this "makes photo-flooding one
review impossible even from a hand-crafted client" — is false**, and a hand-crafted client is
precisely the caller it names.

**Blast radius.** Low on its own (photo flooding on one's own review). Recorded at MEDIUM
rather than LOW for two reasons: it **compounds with F4 and ABU-11** into a storage-cost attack
(N accounts × M parts × unbounded photos × 5 MiB), and **an overclaiming security comment is
itself a defect** — the next reviewer reads "impossible" and stops looking.

**Recommended fix (coordinator).** Replace the counting trigger with a constraint the database
enforces atomically:

```sql
alter table public.review_photos add column if not exists slot smallint;
-- backfill, then:
alter table public.review_photos add constraint review_photos_slot_chk check (slot between 1 and 6);
create unique index if not exists review_photos_review_slot_idx on public.review_photos (review_id, slot);
```

A unique index cannot be raced. Alternatively take a row lock on the parent review
(`select 1 from public.reviews where id = new.review_id for update`) inside the trigger, which
serializes inserts per review at the cost of contention. **Either way, correct the comment** —
even if the fix is deferred, the claim should be downgraded to what it actually delivers:
defense-in-depth against a *sequential* client.

---

### F6 — MEDIUM · Admin UPDATE can rewrite content and reassign authorship, with no audit trail

**Caller:** any account with `profiles.is_admin`.

**The defect.** The admin update policy (line 280) constrains only *who*, never *what*:

```sql
create policy "reviews admin update" on public.reviews
  for update to authenticated
  using (public.is_forum_admin()) with check (public.is_forum_admin());
```

And `reviews_guard` (line 212) explicitly steps aside for admins
(`and not public.is_forum_admin()`), so **no column is pinned on the admin path.**

**Exploit.** An admin, through the ordinary app credential:

```
curl -X PATCH "$SUPABASE_URL/rest/v1/reviews?id=eq.$RID" \
  -H "apikey: $PUBLISHABLE" -H "Authorization: Bearer $ADMIN_JWT" \
  -H "Content-Type: application/json" \
  -d '{"body":"Actually this part is great.","rating":5,"user_id":"<other-user-uuid>"}'
```

Two distinct problems, and they deserve different weights:

1. **Content rewriting is stated intent** — the header says admins may "hide/edit/delete ANY
   review." Not a defect against the design. But it *is* worth surfacing that under
   `abuse-moderation.md` ABU-1's free-speech-first doctrine, silently editable user speech
   sits awkwardly: a rider's words can be changed while still attributed to them, and neither
   they nor anyone else can tell. **The doctrine implies a hide/remove power, not a rewrite
   power.**
2. **Authorship reassignment is almost certainly NOT intended.** Nothing in the header
   contemplates changing `user_id`. It breaks attribution, can collide with
   `UNIQUE(user_id, part_id)`, and would let a review be moved onto an unwitting user's
   account.

**Compounding: there is no audit trail** (ABU-13). No table, trigger, or column records who
hid, edited, or deleted what, or when. An admin edit is indistinguishable from the author's own
words, and Douglas has no way to audit his own moderators. That maps to **A09:2025 Security
Logging and Alerting Failures** — and on a site whose stated promise is "we only remove
mechanical abuse," an unlogged moderation system **cannot evidence the promise it makes.**

**Blast radius.** Requires an admin, so this is insider-risk and least-privilege rather than an
external attack — hence MEDIUM. Note though that per `marketplace-payments.md` MKT-5, an ATO'd
admin account is a named threat, and today that account has unlogged rewrite power over all
user speech.

**Recommended direction (coordinator).**
- **Pin `user_id` for every caller** in `reviews_guard`, admins included:
  `new.user_id := old.user_id;` on UPDATE. There is no legitimate reassignment path.
- **Consider narrowing the admin update to `hidden`** (pin the other columns on the admin
  branch too), making the moderation power *hide*, not *rewrite* — which matches the doctrine.
- **Add an append-only moderation log** (`review_id`, `actor_id`, `action`, `before`, `at`),
  written by the guard trigger, admin-readable. This is the A09 gap and it is worth solving
  once, generically, for reviews *and* the already-live forum.

---

### F7 — LOW · New functions don't carry the EXECUTE-grant hygiene the hardening migration established

**Caller:** `anon` / `authenticated`, theoretically.

**The defect.** Per `supabase-rls.md` RLS-14, `CREATE FUNCTION` grants `EXECUTE` to `PUBLIC` by
default. `supabase/forum-profiles-hardening.sql` exists **specifically** to close this, with a
documented `revoke from public` / `revoke from anon` / `grant to authenticated` / `grant to
service_role` pattern. `reviews.sql` adds two functions — `reviews_guard()` and
`review_photos_cap()` — and carries none of it.

**Why this is LOW and not higher — stated plainly, per the PROOF bar.** **I could not write a
working exploit.** Both are trigger functions, and Postgres refuses direct invocation of a
function returning `trigger` (`ERROR: trigger functions can only be called as triggers`), so
the PostgREST RPC path is closed at the engine level regardless of grants. **This is a
consistency finding, not a vulnerability**, and it is filed as LOW precisely because it should
not be dressed up as one.

It is still worth doing: the house standard exists so nobody has to re-derive "is this
particular function safely un-revoked?" per migration, and the next function added to this
file may not return `trigger`.

**Recommended fix (coordinator).** Append the same revoke/grant block, or — better — fold the
default into `alter default privileges` as Supabase's hardening guide suggests (RLS-12), so
the property holds for future objects without per-file discipline.

---

### F8 — LOW · RLS performance idiom not applied

**The defect.** Per `supabase-rls.md` RLS-9, Supabase recommends `(select auth.uid())` over
bare `auth.uid()` so Postgres caches the result per-statement via initPlan (a measured **>94%**
improvement), and recommends `TO role` targeting on every policy (RLS-8). `reviews.sql` uses
bare `auth.uid()` throughout, and `reviews read` (line 262) has no `TO` clause.

**Honest scoping.** The hot path — the per-part visible-review read — is well served by the
partial index at line 238, and `not hidden` short-circuits the `OR` before
`public.is_forum_admin()` runs for the common case, so the per-row subquery only fires on
hidden rows. **The practical impact today is small**, and I am not going to inflate it: this is
hygiene that becomes worth having as the table grows, not a live problem.

**Recommended fix (coordinator).** Wrap the auth calls in sub-selects and add `TO authenticated`
/ `TO anon, authenticated` where appropriate, as a cheap sweep across all the migrations rather
than a change to this file alone.

---

### F9 — INFO · `review_reports` has no SELECT policy

`review_reports` grants INSERT to the reporter and SELECT to admins only (correctly — see §B).
There is **no** SELECT policy for the reporter on their own rows.

Two consequences, neither a vulnerability:
1. **Possible functional break.** If the client ever inserts with
   `Prefer: return=representation` (in supabase-js, chaining `.select()` after `.insert()`),
   PostgREST needs SELECT on the new row and the insert will appear to fail. `supabase-js` v2's
   `.insert()` does not return rows unless `.select()` is chained, so the default path is fine —
   **but this is a trap worth knowing before the UI is written.** Related: RLS-4 (an UPDATE
   needs a SELECT policy).
2. **A reporter can neither see nor retract their own report.** There is no UPDATE or DELETE
   policy for `reporter_id`. Filed as INFO because it is a product decision, not a defect — but
   it is worth deciding deliberately rather than inheriting.

---

## B. Defenses verified — these HOLD

Per the corpus's PROOF-bar corollary: a review that is only findings is indistinguishable from
a review that didn't look. Each of these was actually walked.

**B1 — The `hidden` guard trigger is sound, and it is the right mechanism.** `reviews_guard`
(line 208) pins `hidden := false` on INSERT and `hidden := old.hidden` on UPDATE for every
caller with `auth.uid() IS NOT NULL` who is not an admin. A hand-crafted
`PATCH {"rating":5,"hidden":false}` against an admin-hidden review **saves nothing to
`hidden`.** Verified: RLS gates rows, not columns (RLS-19), so a trigger is genuinely the
correct tool here — this is not belt-and-braces, it is the only layer that can do this job.

**B2 — The silent pin (assign, not `RAISE`) is the right choice.** It avoids failing legitimate
writes, and — a benefit the file doesn't claim — it denies the attacker an oracle. A `RAISE`
would confirm "that column is protected and you touched it"; the silent pin returns an ordinary
success and reveals nothing (RLS-20).

**B3 — The escalation-impossible chain is intact for this file.** `reviews.sql` introduces **no
new path to `profiles.is_admin`**, so `profiles_guard`'s pin remains the only gate and
`is_forum_admin()` remains trustworthy (RLS-21). Every `using (public.is_forum_admin())` policy
here inherits that correctly.

**B4 — `is_forum_admin()` as SECURITY INVOKER is correct, not an oversight.** It is safe as
invoker because `profiles` is world-readable, and there is **no RLS recursion** because
`profiles` policies never reference reviews or the forum tables (RLS-22). Checked specifically
because "admin helper isn't SECURITY DEFINER" pattern-matches as a finding and is not one here.

**B5 — The `video_url` regex resists host escape.** Reviewed against
`^https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/|vimeo\.com/)[A-Za-z0-9._%/?=&-]+$`
(RLS-24): the host sits inside the anchored prefix so `https://youtube.com@evil.com/…` cannot
match; `@`, backslash and whitespace are absent from the trailing class, closing userinfo and
control-character tricks; and Postgres POSIX `~` anchors `$` at true end-of-string with no
Perl-style trailing-newline exception, closing newline injection. **No bypass found.**

*Forward-looking caveat, not a finding:* per `web-fundamentals.md` WEB-12, the **renderer must
independently validate the scheme** before this value reaches an `href`/`src`/iframe. A DB
CHECK protects new rows in this table; it does not protect rows written before a future
constraint change, and defense belongs at the sink too.

**B6 — Ownership checks on writes are correct and complete.** `reviews insert` /
`owner update` / `owner delete`, and `review photos owner insert` — which correctly
double-checks **both** that the row's `user_id` is the caller **and** that the parent review
belongs to them (line 302). A non-owner, non-admin authenticated user satisfies no write
policy on another user's review; both permissive policies evaluate false. Walked, holds.

**B7 — The report queue is admin-only readable.** Reasons and reporter ids are never
world-readable (line 327), so reporting cannot be weaponized to expose or retaliate against
good-faith reporters (ABU-3). Correct and non-obvious.

**B8 — No auto-hide, and the file says why.** Nothing hides a review on a report count;
hiding is a manual admin action (lines 30–33, 394). Per `abuse-moderation.md` ABU-2 this is not
a mitigation but a **structural removal** of the brigade attack: with auto-hide at threshold N,
silencing anyone costs exactly N sockpuppets; without it, that attack has no mechanism.
**The strongest single security decision in the file.**

**B9 — Storage bucket limits are server-enforced.** `review-photos` is created with a 5 MiB
`file_size_limit` and an image-only `allowed_mime_types` allowlist (line 341), enforced by
Storage rather than by the client (RLS-27). Object writes are confined to the caller's own
top-level folder via `(storage.foldername(name))[1] = auth.uid()::text` (line 363). Correct —
and note F3 is not a hole in *this*, but in the table row that references it.

**B10 — Idempotency is real and correctly implemented.** Guarded `DO … pg_constraint` blocks
(bare `ADD CONSTRAINT` is not idempotent), `drop policy if exists` before every create,
`create table if not exists`, `on conflict do update` on the bucket seed (RLS-25). This is what
makes "just run it again" a safe recovery — **which is precisely the property F1's fix depends
on**, and why F1 is cheap to fix.

**B11 — The engine firewall is stated and structurally sound.** Reviews are display/annotation
data only and never feed `checkBuild` or catalog ordering (lines 45–48, 389). Enforced in the
app rather than the database, correctly noted as such. **This firewall is what bounds F4's
blast radius to display bias instead of corrupted compatibility verdicts** — it is doing real
security work, not just bias work.

**B12 — The caller walkthrough and post-migration invariants blocks are exemplary.** Lines
50–81 walk anon → authenticated → admin → service_role; lines 387–400 list what must hold after
the run. **This is the single best security practice in the repo** (RLS-26) and it is the reason
this review could be written with confidence about intent. It should be mandatory for every
future migration.

---

## C. Questions (not findings — insufficient proof)

Per INDEX rule 8, these could not be turned into exploits and are filed as questions:

1. **Does the Supabase SQL editor wrap a pasted multi-statement script in one transaction?**
   Determines whether F1's exploit reaches the dashboard path or only the `psql`/CLI path.
   F1 stands regardless, but the answer changes its likelihood.
2. **Is CAPTCHA enabled on signup for this project?** (`abuse-moderation.md` ABU-8.) Dashboard
   state, not repo state — bears directly on F4's severity.
3. **Has the Supabase production checklist been walked** (`supabase-rls.md` RLS-31)? Two items
   stand out for a one-person project: **MFA on the Supabase account itself** — it is the master
   key to all user data, and a phished password is total compromise that no RLS policy mitigates
   — and **a second org owner** for recovery.
4. **What is the intended admin moderation UI?** F6's severity depends on whether admins act
   through a narrow hide control or general row editing.
5. **Is `data/REVIEWS-MODEL.md` consistent with this file?** It is referenced five times as the
   design of record and was **not read** this round — a gap in this review, stated so nobody
   assumes it was checked.

---

## D. Scope and honesty statement

**Reviewed:** `supabase/reviews.sql` in full, against `supabase/schema.sql` and
`supabase/forum-profiles.sql` / `-hardening.sql` for the helpers and patterns it depends on.

**NOT reviewed, and therefore not cleared:**
- `data/REVIEWS-MODEL.md` (the design doc) — unread.
- Any client code — none exists yet; the reviews UI is unbuilt.
- The **live** forum tables (`forum_threads` / `forum_posts`). They are **live today** and have
  had no equivalent pass. Per `abuse-moderation.md` they carry the same unbounded-write
  exposure (ABU-6) and the same missing audit trail (ABU-13) as this file, **without the
  benefit of this review.** Recommended as the next review target on the grounds that live
  outranks staged.
- Supabase dashboard configuration (§C).

**No changes were made to any file outside `tools/security/`.**
