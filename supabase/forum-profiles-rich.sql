-- BuildMyMTB — Supabase migration: RICH PROFILES (bio / riding style / location /
-- avatar preset) — owner-editable fields layered onto public.profiles.
--
-- Run ONCE in the Supabase SQL editor, AFTER supabase/schema.sql,
-- supabase/forum-profiles.sql AND supabase/forum-profiles-hardening.sql have all
-- been run (this file only ADDS COLUMNS to the profiles table those files
-- create; it does not redefine any function, trigger, or policy). It is fully
-- re-runnable / idempotent: every column add uses
-- `alter table ... add column if not exists`, and every CHECK constraint is
-- added inside a guarded DO block that first checks pg_constraint, so a second
-- run is a no-op.
--
-- WHAT THIS ADDS (all nullable, default NULL, all freely owner-editable)
--   * bio          text  — free-form "about me", capped at 500 chars.
--   * riding_style text  — one of the discipline vocab ('xc','trail','enduro',
--                           'dh') plus 'all' (rider doesn't pick one), or NULL
--                           (not set). Mirrors the catalog's `disciplines`
--                           vocabulary (compat.js / schema.js VOCAB) so the UI
--                           can reuse the same labels/icons; this column never
--                           feeds checkBuild — display only, same firewall as
--                           the catalog's disciplines field.
--   * location     text  — short free text (city/region), capped at 60 chars.
--   * avatar       text  — an OPTIONAL preset/emoji-KEY the client resolves to
--                           an icon locally. NEVER a URL: constrained to a
--                           short lowercase slug ('^[a-z0-9-]{1,20}$' or NULL).
--                           v1 avatars are preset/initials, client-side only —
--                           this column stores which preset the user picked,
--                           nothing more. No storage bucket, no upload path.
--
-- ===========================================================================
-- SECURITY-CRITICAL: this migration adds NO new security surface. Full
-- argument (read this before touching the file):
--
-- profiles already has:
--   (a) RLS — world-readable SELECT; INSERT/UPDATE restricted to
--       `auth.uid() = user_id` (owner-only writes, `to authenticated`);
--   (b) the profiles_guard BEFORE INSERT/UPDATE trigger, which — for EVERY
--       caller carrying a real end-user JWT (auth.uid() IS NOT NULL) —
--       unconditionally re-pins is_admin/verified_pro (false on INSERT, OLD on
--       UPDATE) and re-checks the reserved-username rule, REGARDLESS OF WHICH
--       COLUMNS THE WRITE TOUCHED. Postgres triggers fire on the whole row for
--       any UPDATE that matches the trigger's event, not per-changed-column, so
--       a user editing only their new bio/riding_style/location/avatar still
--       runs the exact same guard that pins the privileged flags and rejects
--       reserved names.
--
-- bio, riding_style, location and avatar are PLAIN, UNPRIVILEGED columns —
-- none of them influence is_admin, verified_pro, username, or username_norm,
-- and the guard trigger's logic does not read them at all. Because:
--   1. RLS already scopes every write to the owner's own row
--      (`auth.uid() = user_id`), and
--   2. the guard trigger re-pins the two privileged flags on EVERY write
--      (insert or update) with no column-level exception, and
--   3. these four new columns sit entirely OUTSIDE the privileged set the
--      trigger pins (is_admin, verified_pro) and outside the reserved-name
--      check (which only inspects `new.username`),
-- adding them requires NO change to any policy, function, or trigger. A
-- malicious payload like {"bio":"...", "is_admin":true} on an owner's own row
-- still saves the bio and SILENTLY drops is_admin, exactly as it does today
-- for username-only writes — this migration changes that story not at all.
--
-- DECISION: this file deliberately touches ONLY `public.profiles`'s columns.
-- It does not re-create profiles_guard, is_forum_admin, or any policy — there
-- is nothing for them to do differently, and re-stating a security-critical
-- trigger byte-for-byte here (a THIRD copy, after forum-profiles.sql and
-- forum-profiles-hardening.sql) would only add a future place for the three
-- copies to drift apart. Minimal-diff is the safer choice.
--
-- POST-MIGRATION INVARIANTS (must still hold after this file runs):
--   * Privilege escalation remains IMPOSSIBLE. is_admin/verified_pro stay
--     server-authoritative — unchanged trigger, unchanged pin, still fires on
--     every write including one that only sets bio/riding_style/location/avatar.
--   * Reserved-username enforcement still FIRES — the trigger's step (3) still
--     runs on every INSERT/UPDATE and still inspects new.username only; adding
--     unrelated nullable columns cannot bypass it.
--   * RLS still scopes every write to `auth.uid() = user_id` — untouched.
--   * avatar can never carry a URL or arbitrary string — enforced by the CHECK
--     below, at the database layer (not just client-side).
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Columns (idempotent adds).
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists bio          text;
alter table public.profiles add column if not exists riding_style text;
alter table public.profiles add column if not exists location     text;
alter table public.profiles add column if not exists avatar       text;

-- ---------------------------------------------------------------------------
-- CHECK constraints — each guarded by a DO block that checks pg_constraint
-- first, so re-running this file never errors with "constraint already
-- exists". Bare `alter table ... add constraint` is NOT idempotent; this is.
-- ---------------------------------------------------------------------------

-- bio: cap at 500 chars (NULL allowed — "not set" is the default state).
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_bio_len_chk'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_bio_len_chk
      check (bio is null or char_length(bio) <= 500);
  end if;
end $$;

-- riding_style: one of the catalog's discipline vocab, or 'all', or NULL.
-- Mirrors VOCAB.disciplines in src/schema.js — kept as a literal list here
-- (this file has no access to that JS vocab at migration time); update both
-- if the discipline vocab ever changes.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_riding_style_chk'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_riding_style_chk
      check (riding_style is null
             or riding_style in ('xc','trail','enduro','dh','all'));
  end if;
end $$;

-- location: short free text, cap at 60 chars (NULL allowed).
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_location_len_chk'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_location_len_chk
      check (location is null or char_length(location) <= 60);
  end if;
end $$;

-- avatar: a short lowercase preset SLUG only — NEVER a URL. NULL = no preset
-- chosen (client falls back to initials).
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_avatar_slug_chk'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_avatar_slug_chk
      check (avatar is null or avatar ~ '^[a-z0-9-]{1,20}$');
  end if;
end $$;

-- No RLS / policy / trigger changes — see the security walkthrough above.
-- The existing "profiles read" (world-readable) and "profiles insert" /
-- "profiles update" (owner-only, `auth.uid() = user_id`) policies already
-- cover these columns with zero edits, and profiles_guard already re-pins
-- is_admin/verified_pro on every write regardless of which columns changed.
