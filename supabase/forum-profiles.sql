-- BuildMyMTB — Supabase migration: forum usernames/profiles + admin moderation
-- + reserved-username protection.
--
-- Run ONCE in the Supabase SQL editor, AFTER supabase/schema.sql has been run
-- (this file depends on that file's forum_threads / forum_posts tables and its
-- public.touch_updated_at() trigger function). It is re-runnable / idempotent:
-- create-if-not-exists tables + drop-and-recreate policies/triggers, the same
-- convention as schema.sql.
--
-- WHAT THIS ADDS
--   * public.profiles — one row per auth user: a public display `username`
--     (letters/numbers/spaces/_/-, 3–24 chars) plus two admin-only flags,
--     `is_admin` (forum moderation) and `verified_pro` (a "Verified Pro" badge
--     the owner grants to real pro riders). Uniqueness is CASE- and
--     SEPARATOR-insensitive (see profile_norm), so "Doug" / "doug" / "D o u g"
--     are the same name.
--   * public.reserved_usernames — names no ordinary user may take (the owner's
--     real name + a few held handles), enforced by a server-side trigger.
--   * RLS so profiles are world-readable (usernames are public on the forum),
--     while a user may create/rename ONLY their own row and can NEVER touch
--     is_admin (see the security walkthrough below).
--   * Admin moderation on the forum: an admin may delete (and edit) ANY thread
--     or post. Separate permissive policies layered on top of schema.sql's
--     owner-only ones (permissive policies OR together), so this file never has
--     to edit schema.sql.
--
-- ===========================================================================
-- SECURITY-CRITICAL: privilege escalation is IMPOSSIBLE. Walk each caller:
--
--   * anon (logged out) — the profiles INSERT/UPDATE policies require
--     auth.uid() = user_id. For an anonymous request auth.uid() is NULL, and
--     `NULL = user_id` is never true, so anon can write NO profile row at all
--     (it can only read). Nothing to escalate.
--
--   * authenticated (a normal signed-in user, via the publishable/anon key) —
--     RLS lets them write only their OWN row (auth.uid() = user_id). The
--     is_admin AND verified_pro columns are then PINNED by the BEFORE
--     INSERT/UPDATE trigger `profiles_guard`: for any caller carrying a real
--     end-user JWT (auth.uid() IS NOT NULL — the JWT is signed by Supabase and
--     cannot be forged to a null/attacker-chosen sub) the trigger overwrites
--     BOTH flags to `false` on INSERT and to their stored OLD values on UPDATE.
--     So even a hand-crafted REST call that sends {"username":"x",
--     "is_admin":true,"verified_pro":true} saves the username and SILENTLY drops
--     both flag changes — is_admin and verified_pro are server-authoritative for
--     every end user. There is no code path from the anon key to raising either.
--
--   * service_role / SQL editor (the owner granting admin / seeding reserved
--     names) — these run WITHOUT an end-user JWT, so auth.uid() IS NULL, the
--     trigger's guard is skipped, and is_admin may be set. The service role also
--     bypasses RLS entirely. This is the ONE and only way admin is granted (see
--     the grant block at the bottom and SETUP.md §9). The publishable/anon key
--     never gets this role.
--
-- The forum moderation policies below trust `is_admin` transitively: because an
-- end user can never raise their own is_admin, is_forum_admin() can only be true
-- for a row an admin (service role) blessed.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- profile_norm(): the normalization used for uniqueness AND reserved matching.
-- Lowercase + strip spaces / underscores / hyphens, so "Doug", "doug" and
-- "D o u g" all collapse to "doug". IMMUTABLE — required to index/generate on it.
-- The client mirrors this exactly (profileNorm in index.html).
-- ---------------------------------------------------------------------------
create or replace function public.profile_norm(t text)
  returns text language sql immutable as $$
  select lower(regexp_replace(coalesce(t, ''), '[ _-]', '', 'g'));
$$;

-- ---------------------------------------------------------------------------
-- reserved_usernames: names an ordinary user may NOT take. `norm` is the
-- normalized key (profile_norm of the label). kind='blocked' = never claimable
-- by a normal user (the owner's real name + variants); kind='held' = parked for
-- the owner to claim/approve later. Admin-managed via SQL (this file); an admin
-- may still claim any of them (that's how the owner seeds 'Doug'). Full
-- homoglyph/unicode-confusable defense is out of scope.
-- ---------------------------------------------------------------------------
create table if not exists public.reserved_usernames (
  norm       text primary key,
  label      text not null,
  kind       text not null default 'blocked' check (kind in ('blocked','held')),
  note       text,
  created_at timestamptz not null default now()
);

-- Seed (idempotent). norm is computed from the label so it always matches
-- profile_norm; re-running never duplicates (on conflict do nothing).
insert into public.reserved_usernames (norm, label, kind, note) values
  (public.profile_norm('Douglas Wadsworth Wills'), 'Douglas Wadsworth Wills', 'blocked', 'owner real name'),
  (public.profile_norm('Douglas Wadsorth Wills'),  'Douglas Wadsorth Wills',  'blocked', 'owner real name (variant spelling)'),
  (public.profile_norm('Douglas Wills'),           'Douglas Wills',           'blocked', 'owner real name'),
  (public.profile_norm('Doug Wills'),              'Doug Wills',              'blocked', 'owner real name'),
  (public.profile_norm('Doug Wadsworth Wills'),    'Doug Wadsworth Wills',    'blocked', 'owner real name'),
  (public.profile_norm('Douglas'),                 'Douglas',                 'blocked', 'owner first name'),
  (public.profile_norm('Doug'),                    'Doug',                    'blocked', 'owner display name (owner claims this)'),
  (public.profile_norm('Wills'),                   'Wills',                   'blocked', 'owner surname'),
  (public.profile_norm('DWills'),                  'DWills',                  'blocked', 'owner handle'),
  (public.profile_norm('Gnarfather'),              'Gnarfather',              'held',    'reserved for the owner'),
  (public.profile_norm('The Mechanic'),            'The Mechanic',            'held',    'reserved for the owner'),
  (public.profile_norm('The Pilot'),               'The Pilot',               'held',    'reserved for the owner')
on conflict (norm) do nothing;

-- ---------------------------------------------------------------------------
-- profiles. `username_norm` is a STORED generated column (profile_norm of the
-- username) so the unique index and the client collision-check both key on the
-- normalized form. The CHECK fixes the shape (3–24 of [A-Za-z0-9 _-]) AND
-- requires at least one alphanumeric, so the normalized form is never empty.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  user_id      uuid primary key
               references auth.users(id) on delete cascade
               default auth.uid(),
  username     text not null
               check (username ~ '^[A-Za-z0-9 _-]{3,24}$' and username ~ '[A-Za-z0-9]'),
  username_norm text generated always as (public.profile_norm(username)) stored,
  is_admin     boolean not null default false,   -- forum moderation (admin-only, see trigger)
  verified_pro boolean not null default false,   -- "Verified Pro" badge (admin-only, see trigger)
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Idempotent upgrade: add verified_pro if an earlier profiles table predates it.
alter table public.profiles
  add column if not exists verified_pro boolean not null default false;

-- Case- + separator-insensitive uniqueness (the real anti-impersonation guard).
create unique index if not exists profiles_username_norm_idx
  on public.profiles (username_norm);

-- ---------------------------------------------------------------------------
-- is_forum_admin(): is the CURRENT end user an admin? Plain STABLE helper
-- (security invoker) — safe because profiles is world-readable, so the caller
-- can always read their own row; profiles policies never reference the forum
-- tables, so there is no RLS recursion.
-- ---------------------------------------------------------------------------
create or replace function public.is_forum_admin()
  returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.is_admin
  );
$$;

-- username_is_reserved(): does this normalized name hit the reserved list?
-- SECURITY DEFINER so it sees ALL reserved rows regardless of the caller's RLS
-- (the blocked/real-name rows are deliberately NOT world-readable — see the
-- reserved_usernames SELECT policy). search_path pinned for definer safety.
create or replace function public.username_is_reserved(p_norm text)
  returns boolean language sql stable security definer
  set search_path = public, pg_temp as $$
  select exists (select 1 from public.reserved_usernames r where r.norm = p_norm);
$$;

-- ---------------------------------------------------------------------------
-- profiles_guard (SECURITY-CRITICAL). BEFORE INSERT/UPDATE, security invoker.
-- Three jobs, in order: (1) normalize the display username (collapse internal
-- whitespace + trim) so the stored value is always clean; (2) PIN is_admin for
-- every real end-user caller (the escalation guard); (3) REJECT a reserved
-- username unless the caller is an admin (or the service role / SQL editor).
-- ---------------------------------------------------------------------------
create or replace function public.profiles_guard()
  returns trigger language plpgsql as $$
declare
  acting_is_admin boolean;
begin
  -- (1) normalize the DISPLAY username: collapse whitespace runs to a single
  --     space, then trim the ends — regardless of what the client sent.
  new.username := btrim(regexp_replace(new.username, '\s+', ' ', 'g'));

  -- (2) admin-only flag pin (is_admin, verified_pro): only the service role /
  --     SQL editor (no end-user JWT -> auth.uid() IS NULL) may set/change them.
  --     Silent pin (not RAISE) is deliberate: the app only sends
  --     {user_id, username}, so a legitimate rename never trips anything, and a
  --     malicious extra is_admin/verified_pro field is simply ignored rather
  --     than failing the whole write.
  if auth.uid() is not null then
    if tg_op = 'INSERT' then
      new.is_admin     := false;           -- nobody self-registers as admin
      new.verified_pro := false;           -- nor as a verified pro
    elsif tg_op = 'UPDATE' then
      new.is_admin     := old.is_admin;      -- cannot raise (or drop) the flag
      new.verified_pro := old.verified_pro;  -- same admin-only pin
    end if;
  end if;

  -- (3) reserved-name enforcement. The service role (auth.uid() null) and any
  --     admin may claim a reserved name (this is how the owner seeds 'Doug');
  --     everyone else is rejected. is_forum_admin() reads the caller's STORED
  --     is_admin, which they cannot have forged (see step 2).
  acting_is_admin := (auth.uid() is null) or public.is_forum_admin();
  if not acting_is_admin
     and public.username_is_reserved(public.profile_norm(new.username)) then
    raise exception 'That username is reserved. Please choose another.'
      using errcode = 'check_violation';
  end if;

  return new;
end $$;

drop trigger if exists profiles_guard on public.profiles;
create trigger profiles_guard
  before insert or update on public.profiles
  for each row execute function public.profiles_guard();

-- Keep profiles.updated_at fresh on update, reusing schema.sql's trigger fn.
drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row-Level Security.
-- ---------------------------------------------------------------------------
alter table public.profiles          enable row level security;
alter table public.reserved_usernames enable row level security;

drop policy if exists "profiles read"   on public.profiles;
drop policy if exists "profiles insert" on public.profiles;
drop policy if exists "profiles update" on public.profiles;

-- Profiles world-readable: usernames (and the is_admin marker) are public.
create policy "profiles read" on public.profiles
  for select using (true);
-- A user may create ONLY their own row (is_admin pinned false, reserved names
-- rejected — both by the trigger above).
create policy "profiles insert" on public.profiles
  for insert to authenticated
  with check (auth.uid() = user_id);
-- A user may rename ONLY their own row (is_admin pinned to OLD by the trigger).
create policy "profiles update" on public.profiles
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
-- (No delete policy: profiles are not user-deletable; a deleted auth user
-- cascades this row away via the FK.)

-- reserved_usernames: expose ONLY the 'held' rows to clients (for the friendly
-- pre-check), keeping the 'blocked' real-name rows PRIVATE. No write policies,
-- so only the service role / SQL editor manages the list.
drop policy if exists "reserved held readable" on public.reserved_usernames;
create policy "reserved held readable" on public.reserved_usernames
  for select using (kind = 'held');

-- ---------------------------------------------------------------------------
-- Admin moderation on the forum. Separate permissive policies that OR with
-- schema.sql's owner-only ones — an admin may delete/edit ANY thread/post while
-- owners keep managing their own.
-- ---------------------------------------------------------------------------
drop policy if exists "forum threads admin delete" on public.forum_threads;
drop policy if exists "forum threads admin modify" on public.forum_threads;
drop policy if exists "forum posts admin delete"   on public.forum_posts;
drop policy if exists "forum posts admin modify"   on public.forum_posts;

create policy "forum threads admin delete" on public.forum_threads
  for delete to authenticated
  using (public.is_forum_admin());
create policy "forum threads admin modify" on public.forum_threads
  for update to authenticated
  using (public.is_forum_admin())
  with check (public.is_forum_admin());

create policy "forum posts admin delete" on public.forum_posts
  for delete to authenticated
  using (public.is_forum_admin());
create policy "forum posts admin modify" on public.forum_posts
  for update to authenticated
  using (public.is_forum_admin())
  with check (public.is_forum_admin());

-- ===========================================================================
-- GRANTING ADMIN + seeding the owner's profile (owner only). Do NOT hardcode a
-- user id in this file.
--
-- 1. Find the owner's user id (SQL editor):
--      select id, email from auth.users where email = 'douglas.w.wills@gmail.com';
-- 2. Seed the owner's profile as admin with username 'Doug' (paste the uuid).
--    This works even before he has signed in / created a profile, and it may
--    claim the reserved name 'Doug' because it runs as the service role:
--      insert into public.profiles (user_id, username, is_admin)
--      values ('<owner-uuid>', 'Doug', true)
--      on conflict (user_id) do update set is_admin = true, username = 'Doug';
--
-- To grant admin to anyone else later (without changing their username):
--      update public.profiles set is_admin = true where user_id = '<their-uuid>';
--
-- To mark someone a Verified Pro (the badge next to their forum username) — the
-- owner manually verifies the person's real pro identity offline first, then:
--      -- find them by the username they picked:
--      select user_id, username from public.profiles where username = 'Brage Vestavik';
--      update public.profiles set verified_pro = true where user_id = '<their-uuid>';
--
-- To revoke either, set the flag back to false. All of these work because the
-- SQL editor runs as the service role with no end-user JWT (auth.uid() IS NULL),
-- so the is_admin/verified_pro guard and the reserved-name check are all skipped
-- — the only path to any of these powers.
-- ===========================================================================
