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
