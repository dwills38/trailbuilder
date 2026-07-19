-- BuildMyMTB — Supabase migration: LIVE-MIGRATIONS HARDENING (hardening-2).
--
-- Closes the fixable HIGH/MEDIUM findings from the 2026-07-18 live-migrations
-- security pass (tools/security/REVIEW-live-migrations-2026-07-18.md). It is a
-- NEW, additive, re-runnable migration — it edits NONE of the already-run files
-- (schema.sql, forum-profiles*.sql). Run ONCE in the Supabase SQL editor, AFTER
-- schema.sql + forum-profiles.sql + forum-profiles-hardening.sql have all run
-- (it depends on public.is_forum_admin() and the forum_threads/forum_posts,
-- profiles and storage.objects objects those files create).
--
-- It is fully idempotent: enable-RLS is a no-op when already enabled; every
-- function is CREATE OR REPLACE; every trigger and policy is drop-if-exists then
-- create; every CHECK is added inside a guarded pg_constraint DO block.
--
-- ===========================================================================
-- WHAT THIS CLOSES (see the review doc for the full proof + severity of each):
--
--   H1 (HIGH)   forum_threads.pinned is NOT server-authoritative. Any signed-in
--               user can POST/PATCH their own thread with {"pinned":true} — no
--               RLS clause or trigger stops it — and the app orders threads
--               `pinned desc, created_at desc`, so a self-pinned spam/promo
--               thread lands at the very top of the forum. The RLS-19 guard-
--               trigger pattern the repo already uses for profiles.is_admin and
--               reviews.hidden was never applied to forum_threads.pinned.
--               FIX: forum_threads_guard pins `pinned` for non-admin end users.
--
--   M4 (MED)    Admin (and owner) forum UPDATEs can reassign `author_id` — no
--               guard pins it, so a thread/post can be moved onto another user's
--               account, breaking attribution.
--               FIX: both forum guards pin `author_id := old.author_id` on every
--               end-user UPDATE (admins included — there is no legitimate
--               reassignment path). NOTE: the moderation AUDIT-TRAIL half of M4
--               (who hid/edited/deleted what, A09) is a design item routed to
--               Douglas, NOT built here.
--
--   M2 (MED)    profiles.avatar_url is CHECK-pinned to the avatars bucket PREFIX
--               but not to the owner's own folder, so user B can point B's
--               profile photo at user A's uploaded object (public-photo
--               impersonation). A CHECK cannot reference auth.uid() (not
--               immutable), so the owner-folder binding is added to the profiles
--               INSERT/UPDATE policies' WITH CHECK instead.
--
--   M5 (MED)    forum_threads/forum_posts had NO length caps (every profiles and
--               reviews field is capped; the forum predates that discipline).
--               FIX: bounded CHECKs added NOT VALID (enforced on new writes; the
--               initial full-table scan of existing rows is skipped so this is
--               safe on the populated live table — see the note at that block).
--
--   M1 (MED)    Belt-and-braces: re-ASSERT `enable row level security` on all
--               six live tables. schema.sql / forum-profiles.sql separate the
--               enable-RLS from the create-table by fallible statements, so a
--               partial run could leave a table created (with default anon
--               grants) but RLS never enabled. Running this file re-asserts RLS
--               regardless. **Also run the verification query in the review doc
--               §M1 to confirm current live state — this file cannot read it.**
--
-- NOT addressed here (routed to Douglas as design items — see review §§M3, M4,
-- L1, L2, L3): avatars-bucket erasure on account deletion (M3); a moderation
-- audit log (M4); the RPC reserved-name oracle (L1); admin-enumeration via the
-- world-readable is_admin column (L2); and the `(select auth.uid())` + `TO`
-- performance sweep across all policies (L3). None is a one-line fix and each
-- needs a product/design decision or a broad mechanical sweep best done on its
-- own branch.
--
-- POST-MIGRATION INVARIANTS (must hold after this runs):
--   * A non-admin end user can no longer set or keep forum_threads.pinned=true.
--   * No end-user caller (admin included) can reassign forum author_id.
--   * A profile's avatar_url can only ever point inside the owner's OWN avatars
--     folder (avatars/<their-uid>/...).
--   * Every existing guarantee (escalation-impossible, reserved-name, owner-only
--     writes, world-readable profiles/forum reads) is UNCHANGED — this file adds
--     constraints, it removes none.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- M1 — re-assert RLS on every live table (idempotent no-op if already on).
-- ---------------------------------------------------------------------------
alter table public.builds             enable row level security;
alter table public.inventory          enable row level security;
alter table public.forum_threads      enable row level security;
alter table public.forum_posts        enable row level security;
alter table public.profiles           enable row level security;
alter table public.reserved_usernames enable row level security;

-- ---------------------------------------------------------------------------
-- H1 + M4 — forum guard triggers. Mirror the profiles_guard / reviews_guard
-- pattern (RLS-19): a BEFORE INSERT/UPDATE trigger that PINS a privileged
-- column for every caller carrying a real end-user JWT (auth.uid() IS NOT
-- NULL), so a hand-crafted REST field is silently ignored rather than obeyed.
-- Silent pin (assign, not RAISE), consistent with the repo's other guards:
-- the app never sends pinned/author_id, so a legitimate write never trips, and
-- a malicious extra field is dropped instead of failing the whole write.
--
-- Callers:
--   * anon              — cannot write forum rows at all (insert/update policies
--                         are `to authenticated`), so the trigger's guard branch
--                         is never reached by anon.
--   * authenticated     — auth.uid() IS NOT NULL: pinned is forced (false on
--                         insert, OLD on update) UNLESS they are a forum admin;
--                         author_id is forced to OLD on every update.
--   * admin             — is_forum_admin() true: MAY set pinned (that is the
--                         point of pinning), but still cannot reassign author_id.
--   * service_role/SQL  — auth.uid() IS NULL: guard skipped entirely (seeds the
--                         pinned welcome thread, runs owner maintenance).
-- ---------------------------------------------------------------------------
create or replace function public.forum_threads_guard()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
begin
  if auth.uid() is not null then
    -- `pinned` is admin/system-only prominence. Pin it for non-admin end users.
    if not public.is_forum_admin() then
      if tg_op = 'INSERT' then
        new.pinned := false;                 -- nobody self-pins their own thread
      elsif tg_op = 'UPDATE' then
        new.pinned := old.pinned;            -- and cannot flip it on later
      end if;
    end if;
    -- `author_id` is never reassignable by ANY end-user caller (admins too):
    -- there is no legitimate path that moves a thread onto another account.
    if tg_op = 'UPDATE' then
      new.author_id := old.author_id;
    end if;
  end if;
  return new;
end $$;

create or replace function public.forum_posts_guard()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
begin
  -- forum_posts has no privileged prominence column; the only pin needed is
  -- author_id (no reassignment by any end-user caller, admins included).
  if auth.uid() is not null and tg_op = 'UPDATE' then
    new.author_id := old.author_id;
  end if;
  return new;
end $$;

drop trigger if exists forum_threads_guard on public.forum_threads;
create trigger forum_threads_guard
  before insert or update on public.forum_threads
  for each row execute function public.forum_threads_guard();

drop trigger if exists forum_posts_guard on public.forum_posts;
create trigger forum_posts_guard
  before insert or update on public.forum_posts
  for each row execute function public.forum_posts_guard();

-- EXECUTE-grant hygiene (RLS-14 / the forum-profiles-hardening precedent). Both
-- functions return `trigger`, so Postgres refuses direct/RPC invocation anyway
-- (belt-and-braces — matches the house standard so nobody re-derives it later).
revoke execute on function public.forum_threads_guard() from public;
revoke execute on function public.forum_threads_guard() from anon;
grant  execute on function public.forum_threads_guard() to authenticated;
grant  execute on function public.forum_threads_guard() to service_role;
revoke execute on function public.forum_posts_guard() from public;
revoke execute on function public.forum_posts_guard() from anon;
grant  execute on function public.forum_posts_guard() to authenticated;
grant  execute on function public.forum_posts_guard() to service_role;

-- ---------------------------------------------------------------------------
-- M2 — bind profiles.avatar_url to the owner's OWN avatars folder.
--
-- The forum-profiles-rich2 CHECK pins avatar_url to the avatars bucket prefix
-- but `[A-Za-z0-9._/-]+` matches ANY user's folder, so B can point B's own
-- profile photo at A's object. A CHECK cannot reference auth.uid(), but a policy
-- WITH CHECK can — so we re-create the two owner-write policies (identical to
-- forum-profiles.sql, verb-for-verb) with one added WITH CHECK term requiring
-- avatar_url, when present, to sit under avatars/<caller-uid>/.
--
-- The client already uploads to avatars/<own-uid>/... (the storage policy
-- enforces that), so legitimate writes always satisfy this and nothing breaks.
-- ---------------------------------------------------------------------------
drop policy if exists "profiles insert" on public.profiles;
create policy "profiles insert" on public.profiles
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and (
      avatar_url is null
      or avatar_url like
         'https://pabiaerjadeeggwoslng.supabase.co/storage/v1/object/public/avatars/'
         || auth.uid()::text || '/%'
    )
  );

drop policy if exists "profiles update" on public.profiles;
create policy "profiles update" on public.profiles
  for update to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and (
      avatar_url is null
      or avatar_url like
         'https://pabiaerjadeeggwoslng.supabase.co/storage/v1/object/public/avatars/'
         || auth.uid()::text || '/%'
    )
  );

-- ---------------------------------------------------------------------------
-- M5 — length caps on the forum body/title columns.
--
-- Added NOT VALID: the constraint is enforced on every INSERT and UPDATE from
-- now on, but the initial full-table validation scan of EXISTING rows is
-- skipped. That makes this safe to run on the populated live table even if a
-- legacy row happens to exceed a cap (it would only block a future edit of that
-- one row until trimmed). To promote to fully-enforced once you have confirmed
-- no row violates it, run e.g.
--   alter table public.forum_threads validate constraint forum_threads_body_len_chk;
-- Caps are generous (a real thread/post is far shorter); they exist to stop a
-- hand-crafted multi-megabyte body, not to constrain legitimate writing.
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_constraint
    where conname = 'forum_threads_title_len_chk' and conrelid = 'public.forum_threads'::regclass) then
    alter table public.forum_threads
      add constraint forum_threads_title_len_chk
      check (char_length(title) between 1 and 300) not valid;
  end if;
  if not exists (select 1 from pg_constraint
    where conname = 'forum_threads_body_len_chk' and conrelid = 'public.forum_threads'::regclass) then
    alter table public.forum_threads
      add constraint forum_threads_body_len_chk
      check (char_length(body) <= 20000) not valid;
  end if;
  if not exists (select 1 from pg_constraint
    where conname = 'forum_posts_body_len_chk' and conrelid = 'public.forum_posts'::regclass) then
    alter table public.forum_posts
      add constraint forum_posts_body_len_chk
      check (char_length(body) <= 20000) not valid;
  end if;
end $$;
