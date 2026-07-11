-- BuildMyMTB — Supabase migration: forum usernames/profiles + admin moderation.
--
-- Run ONCE in the Supabase SQL editor, AFTER supabase/schema.sql has been run
-- (this file depends on that file's forum_threads / forum_posts tables and its
-- public.touch_updated_at() trigger function). It is re-runnable / idempotent:
-- create-if-not-exists tables + drop-and-recreate policies/triggers, the same
-- convention as schema.sql.
--
-- WHAT THIS ADDS
--   * public.profiles — one row per auth user: a public display `username`
--     plus an `is_admin` flag used to moderate the forum.
--   * RLS so profiles are world-readable (usernames are public on the forum),
--     while a user may create/rename ONLY their own row and can NEVER touch
--     is_admin (see the security walkthrough below).
--   * Admin moderation on the forum: an admin may delete (and edit) ANY thread
--     or post. These are SEPARATE permissive policies layered on top of the
--     existing owner-only policies from schema.sql — permissive policies OR
--     together, so owners keep managing their own posts and this file never has
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
--     is_admin column is then PINNED by the BEFORE INSERT/UPDATE trigger
--     `profiles_guard`: for any caller carrying a real end-user JWT
--     (auth.uid() IS NOT NULL — the JWT is signed by Supabase and cannot be
--     forged to a null/attacker-chosen sub) the trigger overwrites is_admin to
--     `false` on INSERT and to its stored OLD value on UPDATE. So even a
--     hand-crafted REST call that sends {"username":"x","is_admin":true} saves
--     the username and SILENTLY drops the flag change — is_admin is
--     server-authoritative for every end user. There is no code path from the
--     anon key to a raised is_admin.
--
--   * service_role / SQL editor (the owner granting admin) — these run WITHOUT
--     an end-user JWT, so auth.uid() IS NULL, the trigger's guard is skipped,
--     and is_admin may be set. The service role also bypasses RLS entirely.
--     This is the ONE and only way admin is granted (see the grant block at the
--     bottom and SETUP.md §9). The publishable/anon key never gets this role.
--
-- The forum moderation policies below trust `is_admin` transitively: because an
-- end user can never raise their own is_admin, `is_forum_admin()` can only be
-- true for a row an admin (service role) blessed.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- profiles: user_id is the PK and FKs to auth.users (cascade on user delete).
-- `username` is validated by a single regex CHECK (3–20 chars, [A-Za-z0-9_-]).
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  user_id    uuid primary key
             references auth.users(id) on delete cascade
             default auth.uid(),
  username   text not null
             check (username ~ '^[A-Za-z0-9_-]{3,20}$'),
  is_admin   boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Case-insensitive uniqueness: "Rider" and "rider" are the SAME name, so no one
-- can impersonate another member by changing only the case. This satisfies the
-- unique-username requirement; the app preserves the chosen casing for display.
create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username));

-- ---------------------------------------------------------------------------
-- is_admin guard (SECURITY-CRITICAL — see the walkthrough at the top). Pins
-- is_admin for every real end-user caller so it can only ever be changed by the
-- service_role / SQL editor. Silent pin (not RAISE) is deliberate: the app only
-- sends {user_id, username}, so a legitimate rename never trips anything, and a
-- malicious extra is_admin field is simply ignored rather than failing the whole
-- write — the flag stays server-authoritative either way.
-- ---------------------------------------------------------------------------
create or replace function public.profiles_guard_is_admin()
  returns trigger language plpgsql as $$
begin
  if auth.uid() is not null then           -- a real signed-in end user
    if tg_op = 'INSERT' then
      new.is_admin := false;               -- nobody self-registers as admin
    elsif tg_op = 'UPDATE' then
      new.is_admin := old.is_admin;        -- cannot raise (or drop) the flag
    end if;
  end if;
  return new;
end $$;

drop trigger if exists profiles_guard on public.profiles;
create trigger profiles_guard
  before insert or update on public.profiles
  for each row execute function public.profiles_guard_is_admin();

-- Keep profiles.updated_at fresh on update, reusing schema.sql's trigger fn.
drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row-Level Security for profiles.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles read"   on public.profiles;
drop policy if exists "profiles insert" on public.profiles;
drop policy if exists "profiles update" on public.profiles;

-- World-readable: usernames (and the is_admin marker) are public on the forum.
create policy "profiles read" on public.profiles
  for select using (true);

-- A user may create ONLY their own row (is_admin is pinned false by the trigger).
create policy "profiles insert" on public.profiles
  for insert to authenticated
  with check (auth.uid() = user_id);

-- A user may rename ONLY their own row (is_admin is pinned to OLD by the trigger).
create policy "profiles update" on public.profiles
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- (No delete policy: profiles are not user-deletable; a deleted auth user
-- cascades this row away via the FK.)

-- ---------------------------------------------------------------------------
-- Admin moderation on the forum. `is_forum_admin()` is a plain STABLE helper
-- (security invoker) — safe because profiles is world-readable, so the caller
-- can always read their own row; and profiles policies never reference the
-- forum tables, so there is no RLS recursion.
-- ---------------------------------------------------------------------------
create or replace function public.is_forum_admin()
  returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.is_admin
  );
$$;

drop policy if exists "forum threads admin delete" on public.forum_threads;
drop policy if exists "forum threads admin modify" on public.forum_threads;
drop policy if exists "forum posts admin delete"   on public.forum_posts;
drop policy if exists "forum posts admin modify"   on public.forum_posts;

-- Admin may delete / edit ANY thread. OR's with schema.sql's owner-only policies.
create policy "forum threads admin delete" on public.forum_threads
  for delete to authenticated
  using (public.is_forum_admin());
create policy "forum threads admin modify" on public.forum_threads
  for update to authenticated
  using (public.is_forum_admin())
  with check (public.is_forum_admin());

-- Admin may delete / edit ANY post. OR's with schema.sql's owner-only policies.
create policy "forum posts admin delete" on public.forum_posts
  for delete to authenticated
  using (public.is_forum_admin());
create policy "forum posts admin modify" on public.forum_posts
  for update to authenticated
  using (public.is_forum_admin())
  with check (public.is_forum_admin());

-- ===========================================================================
-- GRANTING ADMIN (owner only). Do NOT hardcode a user id in this file.
--
-- 1. Sign in to the app once and pick a username, so your profiles row exists.
-- 2. Find your user id (SQL editor — replace the email):
--      select id, email from auth.users where email = 'you@example.com';
-- 3. Grant admin (paste your uuid):
--      update public.profiles set is_admin = true where user_id = '<your-uuid>';
--
-- Step 3 works because the SQL editor runs as the service role with no end-user
-- JWT (auth.uid() IS NULL), so the is_admin guard trigger leaves the flag alone.
-- This is the only path that can raise is_admin. To revoke, set it back to false.
-- ===========================================================================
