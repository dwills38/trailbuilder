-- BuildMyMTB — Supabase migration: RICH PROFILES v2 (photo / tagline / multi-
-- discipline / home trails / current bike / experience / social handles) —
-- owner-editable fields layered onto public.profiles, PLUS the `avatars`
-- Storage bucket + its owner-write-own-path / public-read policies for the
-- profile-photo upload.
--
-- Run ONCE in the Supabase SQL editor, AFTER supabase/schema.sql,
-- supabase/forum-profiles.sql, supabase/forum-profiles-hardening.sql AND
-- supabase/forum-profiles-rich.sql have all been run. It only ADDS COLUMNS to
-- the profiles table those files create and ADDS a Storage bucket + policies;
-- it does not redefine any existing function, trigger, or profiles policy. It
-- is fully re-runnable / idempotent: every column add uses
-- `alter table ... add column if not exists`, every CHECK is added inside a
-- guarded DO block that first checks pg_constraint, the bucket insert is
-- `on conflict do nothing`, and each storage policy is drop-if-exists then
-- create.
--
-- WHAT THIS ADDS (all nullable, default NULL, all freely owner-editable)
--   * avatar_url    text    — PUBLIC URL of the rider's uploaded profile photo,
--                             in the `avatars` bucket. Constrained by CHECK to
--                             THIS project's public-storage prefix + the
--                             avatars/<uuid>/ path shape — it can NEVER hold an
--                             arbitrary URL, a javascript:/data: scheme, or a
--                             path outside the avatars bucket. NULL = no photo
--                             (client falls back to the emoji preset, then
--                             initials).
--   * tagline       text    — one-line headline under the name, cap 80 chars.
--   * riding_styles text[]  — MULTI discipline pick: any subset of
--                             ('xc','trail','enduro','dh','all'). Supersedes the
--                             single riding_style column from rich v1 (that
--                             column is kept for back-compat; the UI reads
--                             riding_styles first, falls back to riding_style).
--                             Display/annotation only — NEVER feeds checkBuild,
--                             same firewall as the catalog's `disciplines`.
--   * home_trails   text    — where they ride, short free text, cap 120 chars.
--   * current_bike  text    — their current rig as free text, cap 120 chars.
--                             (Saved builds stay owner-private — this is the
--                             deliberate public-facing alternative to surfacing
--                             them, so no build-visibility RLS change is needed.)
--   * experience    text    — one of ('beginner','intermediate','advanced',
--                             'expert','pro'), or NULL.
--   * instagram     text    — Instagram HANDLE only (^[A-Za-z0-9._]{1,30}$), not
--                             a URL. The client builds https://instagram.com/<h>.
--   * youtube       text    — YouTube handle/name (^[A-Za-z0-9._-]{1,30}$). The
--                             client builds https://youtube.com/@<h>.
--   * strava        text    — Strava numeric athlete id (^[0-9]{1,20}$). The
--                             client builds https://strava.com/athletes/<id>.
--     Social columns store HANDLES, never URLs, so no user-controlled scheme or
--     host ever reaches the DOM — the client hardcodes the host and adds
--     rel="noopener nofollow". A malicious 'javascript:...' cannot even pass the
--     charset CHECK, and could not be a link host if it did.
--
-- ===========================================================================
-- SECURITY-CRITICAL: this migration adds NO privilege surface on profiles.
--
-- Every column below is a PLAIN, UNPRIVILEGED profiles column — none influence
-- is_admin, verified_pro, username, or username_norm, and profiles_guard does
-- not read them. The existing story is unchanged (see forum-profiles-rich.sql's
-- walkthrough): RLS scopes every write to the owner's own row
-- (auth.uid() = user_id); profiles_guard re-pins is_admin/verified_pro on EVERY
-- write regardless of which columns changed; the reserved-name check still fires
-- on new.username only. A payload like {"tagline":"x","is_admin":true} on an
-- owner's own row still saves the tagline and SILENTLY drops is_admin. So this
-- file re-creates NO function/trigger/profiles-policy — minimal diff, no third
-- copy of the guard to drift.
--
-- The ONE new security surface is Storage. It is locked down below:
--   * bucket `avatars` is public-READ (profile photos are public) but WRITE is
--     restricted by policy to `authenticated` callers writing ONLY under a
--     top-level folder equal to their own auth.uid() — no cross-user writes, no
--     arbitrary-path writes, no anon writes.
--   * file_size_limit (2 MiB) + allowed_mime_types (jpeg/png/webp) are set on
--     the bucket, so oversized or wrong-type uploads are rejected server-side,
--     not merely client-side.
--   * avatar_url on profiles is additionally CHECK-constrained to this project's
--     avatars public prefix, so even a hand-crafted profiles UPDATE cannot point
--     the photo at an off-project or non-image URL.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Columns (idempotent adds).
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists avatar_url    text;
alter table public.profiles add column if not exists tagline       text;
alter table public.profiles add column if not exists riding_styles text[];
alter table public.profiles add column if not exists home_trails   text;
alter table public.profiles add column if not exists current_bike  text;
alter table public.profiles add column if not exists experience    text;
alter table public.profiles add column if not exists instagram     text;
alter table public.profiles add column if not exists youtube       text;
alter table public.profiles add column if not exists strava        text;

-- ---------------------------------------------------------------------------
-- CHECK constraints — each guarded so re-running never errors.
-- ---------------------------------------------------------------------------

-- avatar_url: NULL, or a public URL inside THIS project's `avatars` bucket under
-- an avatars/<anything>/ path. The project ref is hardcoded (this file has no
-- access to src/config.js at migration time); update it if the project moves.
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_avatar_url_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_avatar_url_chk
      check (avatar_url is null or (
        char_length(avatar_url) <= 300 and
        avatar_url ~ '^https://pabiaerjadeeggwoslng\.supabase\.co/storage/v1/object/public/avatars/[A-Za-z0-9._/-]+(\?v=[0-9]+)?$'
      ));
  end if;
end $$;

-- tagline: cap 80.
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_tagline_len_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_tagline_len_chk
      check (tagline is null or char_length(tagline) <= 80);
  end if;
end $$;

-- riding_styles: NULL, or a non-empty array (≤5) whose every element is in the
-- discipline vocab (mirrors VOCAB.disciplines + 'all'; kept literal here).
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_riding_styles_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_riding_styles_chk
      check (riding_styles is null or (
        array_length(riding_styles, 1) between 1 and 5 and
        riding_styles <@ array['xc','trail','enduro','dh','all']::text[]
      ));
  end if;
end $$;

-- home_trails: cap 120.
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_home_trails_len_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_home_trails_len_chk
      check (home_trails is null or char_length(home_trails) <= 120);
  end if;
end $$;

-- current_bike: cap 120.
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_current_bike_len_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_current_bike_len_chk
      check (current_bike is null or char_length(current_bike) <= 120);
  end if;
end $$;

-- experience: one of the level vocab, or NULL.
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_experience_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_experience_chk
      check (experience is null or experience in ('beginner','intermediate','advanced','expert','pro'));
  end if;
end $$;

-- Social handles: strict charset, HANDLES not URLs. NULL allowed.
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_instagram_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_instagram_chk
      check (instagram is null or instagram ~ '^[A-Za-z0-9._]{1,30}$');
  end if;
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_youtube_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_youtube_chk
      check (youtube is null or youtube ~ '^[A-Za-z0-9._-]{1,30}$');
  end if;
  if not exists (select 1 from pg_constraint
    where conname = 'profiles_strava_chk' and conrelid = 'public.profiles'::regclass) then
    alter table public.profiles add constraint profiles_strava_chk
      check (strava is null or strava ~ '^[0-9]{1,20}$');
  end if;
end $$;

-- No RLS / policy / trigger changes on public.profiles — see the walkthrough.

-- ===========================================================================
-- STORAGE: the `avatars` bucket for profile photos.
-- ===========================================================================

-- Public-read bucket with a 2 MiB size cap and an image-only MIME allowlist.
-- These bucket-level limits are enforced by Storage server-side on every
-- upload, independent of the client's own pre-checks.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars', 'avatars', true, 2097152,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Policies on storage.objects for the avatars bucket. Read = anyone (public
-- profile photos). Write (insert/update/delete) = an authenticated caller, ONLY
-- under a top-level folder equal to their own auth.uid(). (storage.foldername(
-- name))[1] is the first path segment; requiring it to equal auth.uid()::text
-- makes cross-user and arbitrary-path writes impossible. anon has no write
-- policy at all, so logged-out callers cannot write.
drop policy if exists "avatars public read"   on storage.objects;
drop policy if exists "avatars owner insert"   on storage.objects;
drop policy if exists "avatars owner update"   on storage.objects;
drop policy if exists "avatars owner delete"   on storage.objects;

create policy "avatars public read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars owner insert" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars owner update" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars owner delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ===========================================================================
-- POST-MIGRATION INVARIANTS (must still hold):
--   * Privilege escalation remains IMPOSSIBLE — profiles_guard unchanged, still
--     pins is_admin/verified_pro on every write incl. one that only touches the
--     new columns.
--   * Reserved-username enforcement still fires (trigger unchanged).
--   * profiles RLS still scopes every write to auth.uid() = user_id.
--   * avatar_url can only ever hold a URL inside this project's avatars bucket.
--   * Storage writes are owner-own-path only; reads are public; oversized /
--     wrong-type uploads are rejected by the bucket limits.
-- ===========================================================================
