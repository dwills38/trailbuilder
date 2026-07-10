-- TrailBuilder — Supabase schema (Phase 3: accounts, saved builds, inventory).
--
-- Run this ONCE in the Supabase SQL editor (or via `supabase db push`) after
-- creating the project. It is the source of truth for the DB; re-runnable
-- (create-if-not-exists / drop-and-recreate policies).
--
-- Security model: every row is owner-scoped. `user_id` defaults to auth.uid()
-- and Row-Level Security lets a user touch ONLY their own rows, so the anon
-- key shipped in the client is safe.

-- ---------------------------------------------------------------------------
-- builds: one row per saved build. `data` is the SAME {b,p} payload the app's
-- share-hash uses ({ "b": {slotKey:partId}, "p": {groupKey:presetId} }), so a
-- saved build and a share link are the same format and both pass through the
-- app's sanitizeShare() (catalog id-migration safety) on read.
-- ---------------------------------------------------------------------------
create table if not exists public.builds (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name       text not null default 'Untitled build',
  data       jsonb not null,
  status     text not null default 'in_progress'
             check (status in ('in_progress','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- inventory: parts the user owns (catalog id + quantity). Powers the future
-- "build around what I own" filter. `part_id` is a catalog id (append-only;
-- resolved through canonicalId() on read, like everything else).
-- ---------------------------------------------------------------------------
create table if not exists public.inventory (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  part_id    text not null,
  qty        int  not null default 1 check (qty > 0),
  note       text,
  created_at timestamptz not null default now(),
  unique (user_id, part_id)
);

-- Helpful index for the per-user list queries.
create index if not exists builds_user_updated_idx on public.builds (user_id, updated_at desc);
create index if not exists inventory_user_idx      on public.inventory (user_id);

-- ---------------------------------------------------------------------------
-- Row-Level Security: owner-only, every verb.
-- ---------------------------------------------------------------------------
alter table public.builds    enable row level security;
alter table public.inventory enable row level security;

drop policy if exists "own builds"    on public.builds;
drop policy if exists "own inventory" on public.inventory;

create policy "own builds" on public.builds
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "own inventory" on public.inventory
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- keep builds.updated_at fresh on every update.
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
  returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists builds_touch on public.builds;
create trigger builds_touch
  before update on public.builds
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Phase 4: built-in forum (threads + replies). Piggybacks on the SAME
-- Supabase auth as builds/inventory above — no separate login. Unlike those
-- owner-scoped tables, reads are open to EVERYONE (anon + authenticated) so
-- logged-out visitors can browse; only signed-in users can post, and only the
-- author can edit/delete their own posts. `author_id` is nullable so a
-- system-seeded thread — like the welcome post below — can exist with no
-- human author; the app shows those as "TrailBuilder team".
-- ---------------------------------------------------------------------------
create table if not exists public.forum_threads (
  id         uuid primary key default gen_random_uuid(),
  author_id  uuid references auth.users(id) on delete set null default auth.uid(),
  title      text not null,
  body       text not null,
  category   text not null default 'general',  -- Phase 4b; vocab is app-side (FORUM_CATEGORIES in src/forum.js) — see the categories stanza at the bottom
  pinned     boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.forum_posts (
  id         uuid primary key default gen_random_uuid(),
  thread_id  uuid not null references public.forum_threads(id) on delete cascade,
  author_id  uuid references auth.users(id) on delete set null default auth.uid(),
  body       text not null,
  created_at timestamptz not null default now()
);

create index if not exists forum_threads_pinned_created_idx on public.forum_threads (pinned desc, created_at desc);
create index if not exists forum_posts_thread_created_idx    on public.forum_posts (thread_id, created_at asc);

alter table public.forum_threads enable row level security;
alter table public.forum_posts   enable row level security;

drop policy if exists "forum threads read"   on public.forum_threads;
drop policy if exists "forum threads insert" on public.forum_threads;
drop policy if exists "forum threads modify" on public.forum_threads;
drop policy if exists "forum threads delete" on public.forum_threads;
drop policy if exists "forum posts read"     on public.forum_posts;
drop policy if exists "forum posts insert"   on public.forum_posts;
drop policy if exists "forum posts modify"   on public.forum_posts;
drop policy if exists "forum posts delete"   on public.forum_posts;

create policy "forum threads read" on public.forum_threads
  for select using (true);
create policy "forum threads insert" on public.forum_threads
  for insert to authenticated with check (auth.uid() = author_id);
create policy "forum threads modify" on public.forum_threads
  for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "forum threads delete" on public.forum_threads
  for delete to authenticated using (auth.uid() = author_id);

create policy "forum posts read" on public.forum_posts
  for select using (true);
create policy "forum posts insert" on public.forum_posts
  for insert to authenticated with check (auth.uid() = author_id);
create policy "forum posts modify" on public.forum_posts
  for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "forum posts delete" on public.forum_posts
  for delete to authenticated using (auth.uid() = author_id);

-- Seed: one pinned welcome thread, authored by the system (no human author).
-- Guarded by title so re-running this migration doesn't duplicate it.
-- NOTE: deliberately does NOT reference the category column — on a live
-- pre-category database this statement runs BEFORE the Phase 4b alter below,
-- and Postgres validates an INSERT's column list even when the guarded select
-- yields no rows, so naming the column here would fail the whole re-run.
-- The Phase 4b stanza re-categorizes this thread instead.
insert into public.forum_threads (author_id, title, body, pinned)
select null,
  'Welcome to TrailBuilder Discussions',
  'Bug reports, build questions, feature requests — post away. Real builds are how the compatibility rules get checked, so if something looks wrong, say so.',
  true
where not exists (
  select 1 from public.forum_threads where title = 'Welcome to TrailBuilder Discussions'
);

-- ---------------------------------------------------------------------------
-- Phase 4b: forum categories. ONE text column on forum_threads; the category
-- vocabulary (keys, emoji labels, descriptions, order) is a committed
-- app-side constant — FORUM_CATEGORIES in src/forum.js — the same
-- committed-constant pattern as REPORT_REPO / src/config.js, so relabeling
-- or reordering a category never needs a migration. No CHECK constraint on
-- purpose: the app treats any unknown/missing value as 'general', so a stray
-- value degrades gracefully in the UI instead of hard-failing inserts if the
-- app and schema ever deploy out of step.
--
-- ADDITIVE + BACKWARD-COMPATIBLE: the pre-category deployed UI selects * and
-- inserts an explicit column list without category, so it keeps working
-- unchanged after this runs (new threads land as 'general' via the default).
-- Existing live rows get 'general' from the column default too; the seeded
-- welcome thread is then moved to its real home, 'announcements'.
-- ---------------------------------------------------------------------------
alter table public.forum_threads
  add column if not exists category text not null default 'general';

-- Re-categorize the seeded welcome thread (title-guarded, like the seed
-- itself). Also guarded on category='general' so a deliberate manual
-- re-categorization later survives re-runs of this file.
update public.forum_threads
   set category = 'announcements'
 where title = 'Welcome to TrailBuilder Discussions'
   and category = 'general';
