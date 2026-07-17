-- BuildMyMTB — Supabase migration: per-product REVIEWS & RATINGS (design round,
-- staged — NOT wired into the live app yet). Star rating + optional written
-- review + optional photos + optional external video link, per catalog part id.
--
-- Run ONCE in the Supabase SQL editor, AFTER supabase/schema.sql (needs its
-- public.touch_updated_at() trigger function) AND supabase/forum-profiles.sql
-- (needs its public.profiles table and the public.is_forum_admin() helper —
-- reviews reuse the SAME admin flag as the forum for moderation, no second
-- admin system). It is re-runnable / idempotent, the same conventions as the
-- other migrations in this folder: create-if-not-exists tables, drop-and-recreate
-- policies/triggers, guarded DO blocks for CHECK constraints, on-conflict seeds,
-- and `... add column if not exists` for any later additive column.
--
-- WHAT THIS ADDS
--   * public.reviews        — one row per (user, part): a 1–5 star `rating` plus
--                             an optional `title`/`body` and an optional external
--                             `video_url`. `part_id` is a CATALOG id (append-only;
--                             see the id note below). UNIQUE(user_id, part_id) —
--                             one review per rider per part (anti-spam / anti-
--                             astroturf). An admin-only `hidden` moderation flag,
--                             server-authoritative exactly like profiles.is_admin.
--   * public.review_photos  — 0..N photos attached to a review (parent cascade),
--                             each a PUBLIC URL inside this project's
--                             `review-photos` Storage bucket (CHECK-pinned to the
--                             bucket prefix, like profiles.avatar_url). Capped at
--                             6 per review by a trigger.
--   * public.review_reports — reader "flag this review" reports feeding a HUMAN
--                             moderation queue. UNIQUE(reporter_id, review_id).
--                             There is DELIBERATELY no auto-hide: nothing here
--                             hides a review on a report count (anti-brigade —
--                             Douglas's free-speech-first / mechanical-abuse-only
--                             moderation philosophy). Reports only accumulate for
--                             an admin to read; hiding is a manual admin action.
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
-- ===========================================================================
-- SECURITY MODEL (walk each caller — mirrors schema.sql / forum-profiles.sql):
--
--   * anon (logged out) — may READ visible (non-hidden) reviews and their photos
--     (reviews are public), and NOTHING else: every write policy is
--     `to authenticated` and additionally checks auth.uid() = user_id /
--     reporter_id, and for an anonymous request auth.uid() is NULL so those never
--     hold. anon cannot post, edit, delete, report, or upload.
--
--   * authenticated (normal signed-in user via the publishable/anon key) — may
--     write ONLY their OWN rows (auth.uid() = user_id), enforced by RLS. The
--     admin-only `reviews.hidden` flag is then PINNED by the BEFORE INSERT/UPDATE
--     trigger `reviews_guard` for every end-user JWT (auth.uid() IS NOT NULL):
--     forced false on INSERT, forced to its stored OLD value on UPDATE. So a
--     hand-crafted REST call sending {"rating":5,"hidden":false} against an
--     admin-hidden review saves nothing to `hidden` — a hidden review stays
--     hidden until an admin acts. `hidden` is server-authoritative, the same
--     design as profiles.is_admin/verified_pro.
--
--   * admin (a profiles row an admin/service-role blessed with is_admin) — the
--     is_forum_admin() branch of every "admin" policy below lets them hide/edit/
--     delete ANY review, delete any photo, and read/clear the report queue. They
--     can never have raised their own is_admin (see forum-profiles.sql), so this
--     power is only ever real admins'.
--
--   * service_role / SQL editor — no end-user JWT (auth.uid() IS NULL), bypasses
--     RLS and the guard's pin. The owner's tool for any manual moderation.
--
-- Privilege escalation is IMPOSSIBLE: there is no end-user path to raising
-- is_admin (owned by forum-profiles.sql) and none to flipping another user's — or
-- your own admin-set — `hidden`.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- reviews.
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
-- bucket, the same defense as profiles.avatar_url.
-- ---------------------------------------------------------------------------
create table if not exists public.review_photos (
  id         uuid primary key default gen_random_uuid(),
  review_id  uuid not null references public.reviews(id)  on delete cascade,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  url        text not null,
  created_at timestamptz not null default now()
);

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

-- Cap photos per review (defense-in-depth over the app's own limit). A small
-- BEFORE INSERT count guard — cheap, and it makes photo-flooding one review
-- impossible even from a hand-crafted client.
create or replace function public.review_photos_cap()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
begin
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

do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'review_reports_reason_len_chk' and conrelid = 'public.review_reports'::regclass) then
    alter table public.review_reports add constraint review_reports_reason_len_chk
      check (char_length(reason) between 1 and 1000);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- reviews_guard (SECURITY-CRITICAL). BEFORE INSERT/UPDATE. Pins the admin-only
-- `hidden` flag for every real end-user caller, exactly as profiles_guard pins
-- is_admin/verified_pro. Silent pin (not RAISE): the app never sends `hidden`,
-- so a legitimate edit never trips anything, and a malicious extra
-- {"hidden":false} is simply ignored rather than failing the whole write.
-- is_forum_admin() reads the caller's STORED is_admin (which they cannot forge),
-- so an admin editing through the app keeps their moderation power while every
-- ordinary user is pinned.
-- ---------------------------------------------------------------------------
create or replace function public.reviews_guard()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
begin
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
-- Row-Level Security.
-- ---------------------------------------------------------------------------
alter table public.reviews        enable row level security;
alter table public.review_photos  enable row level security;
alter table public.review_reports enable row level security;

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
  for select
  using (not hidden or auth.uid() = user_id or public.is_forum_admin());

create policy "reviews insert" on public.reviews
  for insert to authenticated
  with check (auth.uid() = user_id);           -- hidden pinned false by the guard

create policy "reviews owner update" on public.reviews
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);           -- hidden pinned to OLD by the guard

create policy "reviews owner delete" on public.reviews
  for delete to authenticated
  using (auth.uid() = user_id);

-- Admin moderation: separate permissive policies (they OR with the owner ones).
create policy "reviews admin update" on public.reviews
  for update to authenticated
  using (public.is_forum_admin())
  with check (public.is_forum_admin());
create policy "reviews admin delete" on public.reviews
  for delete to authenticated
  using (public.is_forum_admin());

-- review_photos ---------------------------------------------------------------
drop policy if exists "review photos read"          on public.review_photos;
drop policy if exists "review photos owner insert"  on public.review_photos;
drop policy if exists "review photos owner delete"  on public.review_photos;
drop policy if exists "review photos admin delete"  on public.review_photos;

-- Photos are public-read (the storage bucket is public anyway — see the honesty
-- note in data/REVIEWS-MODEL.md §Moderation: hiding a review hides its card, it
-- does NOT delete the image bytes; only a DELETE removes the object).
create policy "review photos read" on public.review_photos
  for select using (true);

-- Insert only for the parent review's own author (double check: the row's
-- user_id is the caller AND the parent review belongs to the caller).
create policy "review photos owner insert" on public.review_photos
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and exists (select 1 from public.reviews r where r.id = review_id and r.user_id = auth.uid())
  );

create policy "review photos owner delete" on public.review_photos
  for delete to authenticated
  using (auth.uid() = user_id);
create policy "review photos admin delete" on public.review_photos
  for delete to authenticated
  using (public.is_forum_admin());

-- review_reports --------------------------------------------------------------
drop policy if exists "review reports insert"      on public.review_reports;
drop policy if exists "review reports admin read"  on public.review_reports;
drop policy if exists "review reports admin delete" on public.review_reports;

-- Anyone signed in may file a report (their own reporter_id only). Reports are
-- NOT world-readable — the queue (with reasons + reporter ids) is admin-only, so
-- reporting can't be weaponized to surface who flagged what.
create policy "review reports insert" on public.review_reports
  for insert to authenticated
  with check (auth.uid() = reporter_id);
create policy "review reports admin read" on public.review_reports
  for select to authenticated
  using (public.is_forum_admin());
create policy "review reports admin delete" on public.review_reports
  for delete to authenticated
  using (public.is_forum_admin());

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
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "review-photos owner update" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'review-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'review-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Owner may delete their own object; an admin may delete ANY review-photos
-- object (moderation of an abusive image — the hard removal that a soft hide
-- does not perform).
create policy "review-photos owner delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'review-photos'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_forum_admin())
  );

-- ===========================================================================
-- POST-MIGRATION INVARIANTS (must hold after this file runs):
--   * reviews/photos/reports never influence checkBuild or catalog ordering —
--     enforced in the APP, not here; this file only stores data. Keep the
--     firewall when building UI (data/REVIEWS-MODEL.md §Unbiased).
--   * `reviews.hidden` is server-authoritative: no end-user path flips it.
--   * one review per (user, part); one report per (reporter, review).
--   * NO auto-hide: a review's visibility changes only by an admin/service-role
--     action, never by a report count.
--   * review photo URLs can only ever point inside this project's review-photos
--     bucket; storage writes are owner-own-path; oversized/wrong-type uploads are
--     rejected by the bucket limits.
--   * the report queue is admin-only readable.
-- ===========================================================================
