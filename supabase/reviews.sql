-- BuildMyMTB — Supabase migration: per-product REVIEWS & RATINGS (design round,
-- staged — NOT wired into the live app yet). Star rating + optional written
-- review + optional photos + optional external video link, per catalog part id.
--
-- Run ONCE in the Supabase SQL editor, AFTER supabase/schema.sql (needs its
-- public.touch_updated_at() trigger function) AND supabase/forum-profiles.sql
-- (needs its public.profiles table and the public.is_forum_admin() helper —
-- reviews reuse the SAME admin flag as the forum for moderation, no second
-- admin system). That ordering is now ENFORCED, not just documented: the
-- precondition block below raises before anything is created if either
-- dependency is missing, and the whole file runs in ONE transaction (see the
-- hardening note). It is re-runnable / idempotent, the same conventions as the
-- other migrations in this folder: create-if-not-exists tables, drop-and-recreate
-- policies/triggers, guarded DO blocks for CHECK constraints, on-conflict seeds,
-- and `... add column if not exists` for any later additive column.
--
-- HARDENING NOTE (2026-07-18 security review, tools/security/
-- REVIEW-reviews-sql-2026-07-18.md — findings F1–F9 addressed in this file):
--   * F1: the file is wrapped in an explicit BEGIN/COMMIT so a mid-script
--     failure on the psql/CLI path rolls back EVERYTHING — no table can ever
--     exist without its RLS. (If the SQL editor already wraps the script, the
--     inner BEGIN raises a harmless "transaction already in progress" WARNING.)
--     Additionally, `enable row level security` now sits IMMEDIATELY after each
--     `create table`, before any dependent object — RLS-on with no policies is
--     default-DENY, so even a hypothetical partial state is fail-closed. House
--     rule going forward: enable RLS in the same breath as CREATE TABLE.
--   * F2: photo visibility INHERITS the parent review's visibility (see the
--     review_photos read policy) — hiding a review hides its photos from the
--     API, and hidden reviews are no longer enumerable via the photos table.
--   * F5: the photo cap is enforced race-free (parent-row lock, see
--     review_photos_cap) — the previous count-only trigger was raceable.
--   * F6: review authorship (user_id) is pinned immutable for EVERY caller, and
--     every moderation action (hide/unhide, non-owner edit/delete) is recorded
--     in the append-only public.review_moderation_log.
--
-- WHAT THIS ADDS
--   * public.reviews        — one row per (user, part): a 1–5 star `rating` plus
--                             an optional `title`/`body` and an optional external
--                             `video_url`. `part_id` is a CATALOG id (append-only;
--                             see the id note below). UNIQUE(user_id, part_id) —
--                             one review per rider per part (anti-spam; see the
--                             astroturfing note for what this does NOT solve).
--                             An admin-only `hidden` moderation flag,
--                             server-authoritative exactly like profiles.is_admin.
--   * public.review_photos  — 0..N photos attached to a review (parent cascade),
--                             each a PUBLIC URL inside this project's
--                             `review-photos` Storage bucket, CHECK-pinned to the
--                             bucket prefix AND policy-pinned to the caller's OWN
--                             storage folder. Capped at 6 per review by a
--                             race-free trigger.
--   * public.review_reports — reader "flag this review" reports feeding a HUMAN
--                             moderation queue. UNIQUE(reporter_id, review_id).
--                             There is DELIBERATELY no auto-hide: nothing here
--                             hides a review on a report count (anti-brigade —
--                             Douglas's free-speech-first / mechanical-abuse-only
--                             moderation philosophy). Reports only accumulate for
--                             an admin to read; hiding is a manual admin action.
--   * public.review_moderation_log — APPEND-ONLY audit trail of moderation
--                             actions (who hid/unhid/edited/deleted what, when,
--                             with a before-image). Admin-readable. Written ONLY
--                             by a trigger; no end-user write path. This is what
--                             lets the site EVIDENCE its "we only remove
--                             mechanical abuse" promise.
--   * Storage bucket `review-photos` (public-read, owner-writes-own-path) +
--                             policies, mirroring the `avatars` bucket.
--
-- CATALOG ID NOTE (append-only / ALIASES): `part_id` is an app catalog id, the
-- same kind stored in public.inventory. The database does NOT know the catalog,
-- so it cannot (and must not) validate part_id against a live part set — that's
-- by design, exactly like inventory. The CLIENT is responsible for writing the
-- CANONICAL id (canonicalId(partId)) at review time and canonicalizing again on
-- read when it aggregates, so reviews left under a later-retired id still roll up
-- to the surviving part. See data/REVIEWS-MODEL.md §"Catalog ids & aliases".
--
-- FIREWALL: reviews are DISPLAY/annotation data ONLY. Nothing here ever feeds the
-- compatibility engine (checkBuild) or reorders the catalog — the same firewall
-- as the catalog's `disciplines` and tire-classes fields. See the UNBIASED
-- analysis in data/REVIEWS-MODEL.md before building any UI on top of this.
--
-- ASTROTURFING COST ANCHOR (review F4 — OPEN DESIGN DECISION FOR DOUGLAS, not
-- resolved in this file). UNIQUE(user_id, part_id) caps ratings per ACCOUNT, but
-- an account costs one email address (Supabase signups: ~30/hour/IP), so N fake
-- accounts buy N fake ratings. The engine firewall above bounds the damage to
-- DISPLAY bias — no compatibility verdict can be corrupted — but display bias is
-- exactly what UNBIASED exists to prevent, so this must be decided BEFORE review
-- scores are shown prominently. Content-neutral options (any mix):
--   1. CAPTCHA on signup (Supabase dashboard toggle — current state unknown);
--   2. account-age / activity gating before a review counts toward the aggregate;
--   3. weighting the aggregate by reviewer history/diversity, not raw count;
--   4. always displaying the count + histogram, so a thin or suspicious set is
--      legible to a human (state the weaker true thing — house voice).
-- A purchase-gate (marketplace-style) deliberately does NOT transfer here: you
-- cannot require a purchase to review a part someone already owns.
--
-- ===========================================================================
-- SECURITY MODEL (walk each caller — mirrors schema.sql / forum-profiles.sql):
--
--   * anon (logged out) — may READ visible (non-hidden) reviews and the photos
--     of visible reviews (photo visibility inherits the parent review's — a
--     hidden review's photos are NOT served), and NOTHING else: every write
--     policy is `to authenticated` and additionally checks auth.uid() =
--     user_id / reporter_id, and for an anonymous request auth.uid() is NULL so
--     those never hold. anon cannot post, edit, delete, report, or upload, and
--     cannot read the report queue or the moderation log.
--
--   * authenticated (normal signed-in user via the publishable/anon key) — may
--     write ONLY their OWN rows (auth.uid() = user_id), enforced by RLS. The
--     admin-only `reviews.hidden` flag is then PINNED by the BEFORE INSERT/UPDATE
--     trigger `reviews_guard` for every end-user JWT (auth.uid() IS NOT NULL):
--     forced false on INSERT, forced to its stored OLD value on UPDATE. So a
--     hand-crafted REST call sending {"rating":5,"hidden":false} against an
--     admin-hidden review saves nothing to `hidden` — a hidden review stays
--     hidden until an admin acts. `hidden` is server-authoritative, the same
--     design as profiles.is_admin/verified_pro. `user_id` is pinned immutable
--     on UPDATE for EVERY caller (owner, admin, service_role alike): there is no
--     legitimate path that reassigns a review to another author.
--
--   * admin (a profiles row an admin/service-role blessed with is_admin) — the
--     is_forum_admin() branch of every "admin" policy below lets them hide/edit/
--     delete ANY review, delete any photo, and read/clear the report queue. They
--     can never have raised their own is_admin (see forum-profiles.sql), so this
--     power is only ever real admins'. Every admin hide/unhide, and every edit
--     or delete of a review they do not own, lands in review_moderation_log with
--     a before-image — moderation is AUDITED, not silent.
--     (OPEN QUESTION for Douglas, review F6: should the admin power be narrowed
--     to hide/delete only — no content rewrite? Free-speech-first doctrine
--     implies hide, not rewrite. Today rewrite is allowed but logged.)
--
--   * service_role / SQL editor — no end-user JWT (auth.uid() IS NULL), bypasses
--     RLS and the guard's `hidden` pin (but NOT the user_id pin, which is
--     unconditional). The owner's tool for any manual moderation; its moderation
--     actions are logged with actor_id NULL.
--
-- Privilege escalation is IMPOSSIBLE: there is no end-user path to raising
-- is_admin (owned by forum-profiles.sql) and none to flipping another user's — or
-- your own admin-set — `hidden`.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- F1 hardening: one transaction + hard preconditions. Everything below either
-- fully commits or fully rolls back; and nothing is created at all unless the
-- dependency migrations have already run.
-- ---------------------------------------------------------------------------
begin;

do $$
begin
  if to_regprocedure('public.touch_updated_at()') is null
     or to_regprocedure('public.is_forum_admin()') is null then
    raise exception 'Prerequisites missing: run supabase/schema.sql and supabase/forum-profiles.sql before supabase/reviews.sql.';
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- reviews. RLS is enabled IMMEDIATELY (fail-closed: RLS with no policies =
-- default deny), never later in the file.
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  part_id    text not null,
  rating     int  not null check (rating between 1 and 5),
  title      text,
  body       text,
  video_url  text,
  hidden     boolean not null default false,   -- admin-only (see reviews_guard)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, part_id)                     -- one review per rider per part
);

alter table public.reviews enable row level security;

-- Length caps + the external-video allowlist, as guarded constraints so re-runs
-- never error on "constraint already exists" (bare ADD CONSTRAINT is not
-- idempotent). Title/body caps keep a single review bounded; the video_url
-- allowlist restricts v1 video to an EXTERNAL embed link on a known host
-- (YouTube / Vimeo) — BuildMyMTB does NOT host video in v1 (bandwidth, storage
-- and moderation cost). See data/REVIEWS-MODEL.md §Video.
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'reviews_title_len_chk' and conrelid = 'public.reviews'::regclass) then
    alter table public.reviews add constraint reviews_title_len_chk
      check (title is null or char_length(title) <= 120);
  end if;
  if not exists (select 1 from pg_constraint
    where conname = 'reviews_body_len_chk' and conrelid = 'public.reviews'::regclass) then
    alter table public.reviews add constraint reviews_body_len_chk
      check (body is null or char_length(body) <= 4000);
  end if;
  if not exists (select 1 from pg_constraint
    where conname = 'reviews_video_url_chk' and conrelid = 'public.reviews'::regclass) then
    alter table public.reviews add constraint reviews_video_url_chk
      check (video_url is null or (
        char_length(video_url) <= 300 and
        video_url ~ '^https://(www\.)?(youtube\.com/watch\?v=|youtu\.be/|vimeo\.com/)[A-Za-z0-9._%/?=&-]+$'
      ));
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- review_photos: 0..N photos per review. `user_id` is denormalized (defaults to
-- auth.uid()) so the storage-path and RLS checks stay simple and a photo row
-- survives independent lookup; it must match the parent review's owner (enforced
-- by the INSERT policy). `url` is CHECK-pinned to THIS project's review-photos
-- public prefix — it can NEVER hold an arbitrary URL or a path outside the
-- bucket, the same defense as profiles.avatar_url — and the INSERT policy
-- additionally pins it to the caller's OWN storage folder (review F3: a row may
-- never reference another user's object).
-- ---------------------------------------------------------------------------
create table if not exists public.review_photos (
  id         uuid primary key default gen_random_uuid(),
  review_id  uuid not null references public.reviews(id)  on delete cascade,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  url        text not null,
  created_at timestamptz not null default now()
);

alter table public.review_photos enable row level security;

do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'review_photos_url_chk' and conrelid = 'public.review_photos'::regclass) then
    alter table public.review_photos add constraint review_photos_url_chk
      check (
        char_length(url) <= 400 and
        url ~ '^https://pabiaerjadeeggwoslng\.supabase\.co/storage/v1/object/public/review-photos/[A-Za-z0-9._/-]+(\?v=[0-9]+)?$'
      );
  end if;
end $$;

-- Cap photos per review (defense-in-depth over the app's own limit), RACE-FREE
-- (review F5). The old count-only guard was a TOCTOU race: under READ COMMITTED,
-- N concurrent inserts could each read a stale count of 5 and all commit. The
-- fix: take a row lock on the PARENT review first, which serializes photo
-- inserts per review — the second transaction blocks on the lock, then counts a
-- fresh snapshot and sees the first one's committed row. Lock semantics under
-- RLS: FOR UPDATE requires the row to pass the reviews UPDATE policies — the
-- owner passes "reviews owner update", an admin passes "reviews admin update",
-- and a non-owner simply locks nothing (their insert is then rejected by the
-- review_photos INSERT policy regardless). Cost: contention only among
-- concurrent photo uploads to the SAME review, i.e. none in practice.
create or replace function public.review_photos_cap()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
begin
  perform 1 from public.reviews where id = new.review_id for update;
  if (select count(*) from public.review_photos where review_id = new.review_id) >= 6 then
    raise exception 'A review can have at most 6 photos.' using errcode = 'check_violation';
  end if;
  return new;
end $$;

drop trigger if exists review_photos_cap on public.review_photos;
create trigger review_photos_cap
  before insert on public.review_photos
  for each row execute function public.review_photos_cap();

-- ---------------------------------------------------------------------------
-- review_reports: reader flags -> HUMAN moderation queue. No auto-action of any
-- kind lives here (see the anti-brigade note at the top). UNIQUE(reporter_id,
-- review_id) stops one account spamming reports on the same review; it does NOT
-- and MUST NOT drive any automatic hide.
-- ---------------------------------------------------------------------------
create table if not exists public.review_reports (
  id          uuid primary key default gen_random_uuid(),
  review_id   uuid not null references public.reviews(id) on delete cascade,
  reporter_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  reason      text not null,
  created_at  timestamptz not null default now(),
  unique (reporter_id, review_id)
);

alter table public.review_reports enable row level security;

do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'review_reports_reason_len_chk' and conrelid = 'public.review_reports'::regclass) then
    alter table public.review_reports add constraint review_reports_reason_len_chk
      check (char_length(reason) between 1 and 1000);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- review_moderation_log (review F6): APPEND-ONLY audit trail of moderation.
-- Every admin/service hide, unhide, non-owner edit, and non-owner delete of a
-- review lands here with a before-image, written by the AFTER trigger below.
--
-- Deliberate design choices:
--   * NO foreign keys. review_id must survive the review's deletion (the
--     'delete' entry would otherwise cascade away with the row it documents),
--     and actor_id must survive an admin account's deletion. An audit log
--     outlives its subjects by definition.
--   * actor_id NULL means service_role / SQL editor (no end-user JWT).
--   * RLS enabled with a SELECT policy for admins ONLY and NO insert/update/
--     delete policies at all: with RLS on, no policy = no path, so end users
--     cannot write, rewrite, or purge audit rows through the API. The only
--     writer is reviews_moderation_audit(), which is SECURITY DEFINER (owner
--     bypasses RLS) and, being a trigger function, cannot be invoked directly
--     (Postgres: "trigger functions can only be called as triggers").
-- ---------------------------------------------------------------------------
create table if not exists public.review_moderation_log (
  id         bigint generated always as identity primary key,
  review_id  uuid not null,
  actor_id   uuid,                              -- NULL = service_role/SQL editor
  action     text not null check (action in ('hide','unhide','edit','delete')),
  before     jsonb not null,                    -- full OLD row image
  created_at timestamptz not null default now()
);

alter table public.review_moderation_log enable row level security;

create index if not exists review_moderation_log_review_idx
  on public.review_moderation_log (review_id, created_at desc);

-- The audit writer. AFTER UPDATE/DELETE on reviews; SECURITY DEFINER solely so
-- its INSERT into the log bypasses the log's deny-all RLS (the reviews write
-- itself was already authorized by reviews' own RLS before this fires).
-- auth.uid() and is_forum_admin() read the CALLER's JWT/stored flag and are
-- unaffected by the definer context. Owner self-edits are NOT logged (that is
-- ordinary user activity, not moderation); hidden flips always are (only
-- admins/service can flip hidden — the guard pins it for everyone else).
create or replace function public.reviews_moderation_audit()
  returns trigger language plpgsql security definer
  set search_path = public, pg_temp as $$
declare
  actor uuid := auth.uid();
begin
  if tg_op = 'UPDATE' then
    if old.hidden is distinct from new.hidden then
      insert into public.review_moderation_log (review_id, actor_id, action, before)
      values (old.id, actor, case when new.hidden then 'hide' else 'unhide' end, to_jsonb(old));
    end if;
    if (actor is null or actor <> old.user_id)
       and (old.rating, old.title, old.body, old.video_url, old.part_id)
           is distinct from (new.rating, new.title, new.body, new.video_url, new.part_id) then
      insert into public.review_moderation_log (review_id, actor_id, action, before)
      values (old.id, actor, 'edit', to_jsonb(old));
    end if;
    return new;
  elsif tg_op = 'DELETE' then
    if actor is null or actor <> old.user_id then
      insert into public.review_moderation_log (review_id, actor_id, action, before)
      values (old.id, actor, 'delete', to_jsonb(old));
    end if;
    return old;
  end if;
  return null;
end $$;

drop trigger if exists reviews_moderation_audit on public.reviews;
create trigger reviews_moderation_audit
  after update or delete on public.reviews
  for each row execute function public.reviews_moderation_audit();

-- ---------------------------------------------------------------------------
-- reviews_guard (SECURITY-CRITICAL). BEFORE INSERT/UPDATE. Two pins:
--
--   (1) `user_id` is immutable on UPDATE for EVERY caller — owner, admin, and
--       service_role alike (review F6): no legitimate path reassigns a review
--       to another author, and reassignment would break attribution and collide
--       with UNIQUE(user_id, part_id). Unconditional, so even the SQL editor
--       cannot do it by accident (a true reassignment would be delete+recreate,
--       which is visible and logged).
--
--   (2) the admin-only `hidden` flag is pinned for every real end-user caller,
--       exactly as profiles_guard pins is_admin/verified_pro. Silent pin (not
--       RAISE): the app never sends `hidden`, so a legitimate edit never trips
--       anything, and a malicious extra {"hidden":false} is simply ignored
--       rather than failing the whole write. is_forum_admin() reads the
--       caller's STORED is_admin (which they cannot forge), so an admin editing
--       through the app keeps their moderation power while every ordinary user
--       is pinned.
-- ---------------------------------------------------------------------------
create or replace function public.reviews_guard()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
begin
  if tg_op = 'UPDATE' then
    new.user_id := old.user_id;              -- authorship is immutable, for everyone
  end if;
  if auth.uid() is not null and not public.is_forum_admin() then
    if tg_op = 'INSERT' then
      new.hidden := false;                 -- nobody self-publishes as hidden/unhidden
    elsif tg_op = 'UPDATE' then
      new.hidden := old.hidden;            -- cannot un-hide an admin-hidden review
    end if;
  end if;
  return new;
end $$;

drop trigger if exists reviews_guard on public.reviews;
create trigger reviews_guard
  before insert or update on public.reviews
  for each row execute function public.reviews_guard();

-- Keep reviews.updated_at fresh on update, reusing schema.sql's trigger fn.
drop trigger if exists reviews_touch on public.reviews;
create trigger reviews_touch
  before update on public.reviews
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Indexes. The per-part read (fetch + aggregate a part's visible reviews) is the
-- hot path; a partial index on the visible set backs it. Reports are grouped by
-- review for the moderation queue.
-- ---------------------------------------------------------------------------
create index if not exists reviews_part_visible_idx  on public.reviews (part_id, created_at desc) where not hidden;
create index if not exists reviews_user_idx          on public.reviews (user_id);
create index if not exists review_photos_review_idx  on public.review_photos (review_id);
create index if not exists review_reports_review_idx on public.review_reports (review_id);

-- ---------------------------------------------------------------------------
-- Row-Level Security policies. (RLS itself was enabled at each CREATE TABLE.)
-- Idiom (review F8): auth.uid()/is_forum_admin() are wrapped as
-- `(select ...)` so Postgres evaluates them ONCE per statement (initPlan)
-- instead of per row, and every policy names its target roles with TO.
-- ---------------------------------------------------------------------------

-- reviews ---------------------------------------------------------------------
drop policy if exists "reviews read"          on public.reviews;
drop policy if exists "reviews insert"        on public.reviews;
drop policy if exists "reviews owner update"  on public.reviews;
drop policy if exists "reviews owner delete"  on public.reviews;
drop policy if exists "reviews admin update"  on public.reviews;
drop policy if exists "reviews admin delete"  on public.reviews;

-- Read: everyone sees non-hidden reviews; a hidden review is visible ONLY to its
-- author (so they can see it still exists) and to admins (the moderation view).
-- Because non-admins never see hidden rows, the client's per-part aggregate
-- (average, count, histogram) is computed over exactly the visible set for free.
create policy "reviews read" on public.reviews
  for select to anon, authenticated
  using (not hidden or (select auth.uid()) = user_id or (select public.is_forum_admin()));

create policy "reviews insert" on public.reviews
  for insert to authenticated
  with check ((select auth.uid()) = user_id);  -- hidden pinned false by the guard

create policy "reviews owner update" on public.reviews
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);  -- hidden + user_id pinned by the guard

create policy "reviews owner delete" on public.reviews
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Admin moderation: separate permissive policies (they OR with the owner ones).
create policy "reviews admin update" on public.reviews
  for update to authenticated
  using ((select public.is_forum_admin()))
  with check ((select public.is_forum_admin()));
create policy "reviews admin delete" on public.reviews
  for delete to authenticated
  using ((select public.is_forum_admin()));

-- review_photos ---------------------------------------------------------------
drop policy if exists "review photos read"          on public.review_photos;
drop policy if exists "review photos owner insert"  on public.review_photos;
drop policy if exists "review photos owner delete"  on public.review_photos;
drop policy if exists "review photos admin delete"  on public.review_photos;

-- Read: a photo is visible exactly when its PARENT REVIEW is visible to the
-- caller (review F2). The bare EXISTS is sufficient — the reviews RLS read
-- policy applies INSIDE the subquery for the invoking caller, so this inherits
-- the parent's visibility rules automatically and stays in step if they ever
-- change: anon/others see photos of non-hidden reviews only, the author still
-- sees their own hidden review's photos, admins see all. This closes both
-- halves of F2: a hide removes the photo reference from the API, and hidden
-- reviews can no longer be enumerated by diffing the photos table against the
-- reviews table.
-- HONESTY NOTE (moderation is TWO steps for imagery): hiding a review removes
-- its card and every API-served reference to the photo, but the storage OBJECT
-- itself is public-read at an unguessable URL and its bytes survive until a
-- hard DELETE ("review-photos owner delete" below covers admins). Anyone who
-- saved the URL while the review was visible can still fetch the bytes. For an
-- abusive image, hide the review AND delete the object.
create policy "review photos read" on public.review_photos
  for select to anon, authenticated
  using (exists (select 1 from public.reviews r where r.id = review_id));

-- Insert only for the parent review's own author (triple check, review F3: the
-- row's user_id is the caller, the parent review belongs to the caller, AND the
-- url points inside the CALLER'S OWN storage folder — a CHECK constraint cannot
-- reference auth.uid(), so the owner-folder pin lives here. This makes the
-- table row agree with the storage-side owner-writes-own-path policy: a row can
-- never attach another user's object).
create policy "review photos owner insert" on public.review_photos
  for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (select 1 from public.reviews r where r.id = review_id and r.user_id = (select auth.uid()))
    and url like 'https://pabiaerjadeeggwoslng.supabase.co/storage/v1/object/public/review-photos/'
                 || (select auth.uid())::text || '/%'
  );

create policy "review photos owner delete" on public.review_photos
  for delete to authenticated
  using ((select auth.uid()) = user_id);
create policy "review photos admin delete" on public.review_photos
  for delete to authenticated
  using ((select public.is_forum_admin()));

-- review_reports --------------------------------------------------------------
drop policy if exists "review reports insert"        on public.review_reports;
drop policy if exists "review reports reporter read" on public.review_reports;
drop policy if exists "review reports admin read"    on public.review_reports;
drop policy if exists "review reports admin delete"  on public.review_reports;

-- Anyone signed in may file a report (their own reporter_id only). The queue
-- (reasons + reporter ids) is admin-only — reporting can't be weaponized to
-- surface who flagged what — EXCEPT that a reporter may read their OWN reports
-- (review F9, a deliberate stance): it leaks nothing (it is their own row), it
-- lets the UI show "you already reported this", and it keeps a future
-- `.insert(...).select()` call from failing PostgREST's representation check.
-- Deliberately WITHHELD pending a product decision: reporter UPDATE/DELETE
-- (retracting or editing a filed report). Add only on Douglas's word.
create policy "review reports insert" on public.review_reports
  for insert to authenticated
  with check ((select auth.uid()) = reporter_id);
create policy "review reports reporter read" on public.review_reports
  for select to authenticated
  using ((select auth.uid()) = reporter_id);
create policy "review reports admin read" on public.review_reports
  for select to authenticated
  using ((select public.is_forum_admin()));
create policy "review reports admin delete" on public.review_reports
  for delete to authenticated
  using ((select public.is_forum_admin()));

-- review_moderation_log -------------------------------------------------------
drop policy if exists "review moderation log admin read" on public.review_moderation_log;

-- Admin-only read; NO write policies on purpose (see the table's header note:
-- the only writer is the SECURITY DEFINER audit trigger).
create policy "review moderation log admin read" on public.review_moderation_log
  for select to authenticated
  using ((select public.is_forum_admin()));

-- ---------------------------------------------------------------------------
-- Function EXECUTE hygiene (review F7), matching the pattern
-- forum-profiles-hardening.sql established: strip the blanket PUBLIC grant
-- CREATE FUNCTION hands out, revoke anon explicitly, grant the roles that
-- actually reach each function. All three are trigger functions (Postgres
-- refuses direct invocation of trigger-returning functions, so the RPC surface
-- is closed at the engine level regardless) — this is consistency with the
-- house standard, not a live-hole fix. authenticated keeps EXECUTE because
-- end-user writes fire these triggers as the acting role; service_role keeps it
-- as the same zero-cost insurance the hardening file documents.
-- ---------------------------------------------------------------------------
revoke execute on function public.reviews_guard()             from public;
revoke execute on function public.reviews_guard()             from anon;
grant  execute on function public.reviews_guard()             to authenticated;
grant  execute on function public.reviews_guard()             to service_role;

revoke execute on function public.review_photos_cap()         from public;
revoke execute on function public.review_photos_cap()         from anon;
grant  execute on function public.review_photos_cap()         to authenticated;
grant  execute on function public.review_photos_cap()         to service_role;

revoke execute on function public.reviews_moderation_audit()  from public;
revoke execute on function public.reviews_moderation_audit()  from anon;
grant  execute on function public.reviews_moderation_audit()  to authenticated;
grant  execute on function public.reviews_moderation_audit()  to service_role;

-- ===========================================================================
-- STORAGE: the `review-photos` bucket for review images. Mirrors the `avatars`
-- bucket in forum-profiles-rich2.sql: public-read, a 5 MiB per-file cap and an
-- image-only MIME allowlist (all enforced server-side by Storage), and writes
-- restricted to a top-level folder equal to the caller's own auth.uid(). The
-- recommended object path is `<auth.uid()>/<review_id>/<file>`.
-- ===========================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'review-photos', 'review-photos', true, 5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "review-photos public read"  on storage.objects;
drop policy if exists "review-photos owner insert"  on storage.objects;
drop policy if exists "review-photos owner update"  on storage.objects;
drop policy if exists "review-photos owner delete"  on storage.objects;

create policy "review-photos public read" on storage.objects
  for select using (bucket_id = 'review-photos');

create policy "review-photos owner insert" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'review-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "review-photos owner update" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'review-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'review-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- Owner may delete their own object; an admin may delete ANY review-photos
-- object (moderation of an abusive image — the hard removal that a soft hide
-- does not perform; see the two-step honesty note on the photos read policy).
create policy "review-photos owner delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'review-photos'
    and ((storage.foldername(name))[1] = (select auth.uid())::text or (select public.is_forum_admin()))
  );

commit;

-- ===========================================================================
-- POST-MIGRATION INVARIANTS (must hold after this file runs):
--   * reviews/photos/reports never influence checkBuild or catalog ordering —
--     enforced in the APP, not here; this file only stores data. Keep the
--     firewall when building UI (data/REVIEWS-MODEL.md §Unbiased).
--   * `reviews.hidden` is server-authoritative: no end-user path flips it.
--   * `reviews.user_id` is immutable after insert, for EVERY caller.
--   * a hidden review's photos are NOT served by the API, and the hidden set is
--     not enumerable through review_photos.
--   * every hide/unhide and every non-owner edit/delete of a review is recorded
--     append-only in review_moderation_log; end users have no write, rewrite,
--     or purge path into the log.
--   * one review per (user, part); one report per (reporter, review); at most
--     6 photos per review, race-proof.
--   * NO auto-hide: a review's visibility changes only by an admin/service-role
--     action, never by a report count.
--   * review photo URLs can only ever point inside this project's review-photos
--     bucket AND inside the posting user's own folder; storage writes are
--     owner-own-path; oversized/wrong-type uploads are rejected by the bucket
--     limits.
--   * the report queue is admin-only readable, except each reporter's own rows.
--   * a partial run cannot exist (single transaction), and even statement-level
--     execution would be fail-closed (RLS enabled at CREATE TABLE time).
-- ===========================================================================
