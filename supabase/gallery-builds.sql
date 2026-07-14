-- BuildMyMTB — Supabase migration: PUBLIC BUILDS GALLERY (gallery_builds).
--
-- Run ONCE in the Supabase SQL editor, AFTER supabase/schema.sql AND
-- supabase/forum-profiles.sql have been run (this file reuses that file's
-- public.is_forum_admin() for admin moderation and public.touch_updated_at()
-- for the updated_at trigger). It is fully re-runnable / idempotent:
-- create-if-not-exists table + guarded CHECK adds + drop-and-recreate
-- policies/triggers, the same convention as schema.sql / forum-profiles.sql.
--
-- WHAT THIS ADDS
--   * public.gallery_builds — one row per PUBLISHED build. A build a rider
--     chooses to make public gets a durable public page. This is a SNAPSHOT
--     table, NOT a flag on public.builds: the private garage table is never
--     touched, so no RLS change can ever leak a private build (the design
--     decision in BUILDS-GALLERY-SCOPE.md §2 — the RLS blast-radius argument).
--     It follows the forum's proven public-content shape: open SELECT to
--     everyone, INSERT to authenticated (own row only), UPDATE/DELETE to the
--     author OR an admin.
--   * A per-user publish rate cap (daily + lifetime) enforced by a BEFORE
--     INSERT trigger — mechanical flood control, viewpoint-blind (scope §3).
--
-- WHY A SEPARATE TABLE (recap of the scope's §2 decision)
--   builds is the ONE table holding every user's PRIVATE garage. Publishing a
--   flag on it would force opening SELECT on that table (`using (published or
--   auth.uid() = user_id)`), where a single policy bug leaks every private
--   build. gallery_builds is public BY CONSTRUCTION — every row in it is, by
--   definition, something its author published — so `select using (true)` is
--   correct and carries zero blast radius onto private data. The published
--   payload is also a SNAPSHOT (captured at publish time), so a shared public
--   URL never silently changes because the owner kept tinkering in their garage.
--
-- ===========================================================================
-- SECURITY-CRITICAL: walk every caller. No path lets a non-owner read a private
-- build, mutate another user's gallery entry, escalate a flag, or bypass the cap
-- in a way that harms anyone. (This is the surface that gets adversarially
-- audited — the reasoning is written out so a reviewer can check it.)
--
--   * anon (logged out) — MAY read (`select using (true)`: the gallery is
--     public, that's the point). MAY NOT write: there is NO anon insert/update/
--     delete policy, and the insert/update policies are `to authenticated` with
--     `auth.uid() = author_id`; for anon auth.uid() is NULL and `NULL = author_id`
--     is never true. So anon can browse and nothing else.
--
--   * authenticated (a normal signed-in user via the publishable/anon key) —
--     - INSERT: `with check (auth.uid() = author_id)`. author_id DEFAULTS to
--       auth.uid(), and the check REJECTS any insert whose author_id isn't the
--       caller, so a hand-crafted REST call cannot publish "as" someone else.
--       The JWT `sub` is signed by Supabase and cannot be forged, so auth.uid()
--       is authoritative.
--     - UPDATE: `using (auth.uid() = author_id) with check (auth.uid() =
--       author_id)`. The USING clause means a non-owner's UPDATE matches NO rows
--       (it can't even see another user's row as a write target); the WITH CHECK
--       means an owner cannot reassign author_id away from themselves. So a user
--       can edit ONLY their own title/story, and can never hijack or donate a row.
--     - DELETE: `using (auth.uid() = author_id)` — own rows only.
--     - There is NO privileged column here (no is_admin/kudos/featured flag to
--       raise — kudos/featured are deliberately NOT in this MVP, scope §8 #4 and
--       §6), so there is nothing to escalate. author_id is pinned by the policies
--       above, not by a trigger, because unlike profiles it carries no privilege.
--
--   * service_role / SQL editor (the owner) — bypasses RLS, used only for
--     manual moderation if ever needed. Not reachable from the anon key.
--
--   * admin (a signed-in user whose profiles.is_admin was blessed by the owner
--     via forum-profiles.sql) — the layered permissive policies below let an
--     admin UPDATE/DELETE ANY row (takedown + edit), OR-ed with the owner-only
--     policies. is_forum_admin() reads the caller's STORED is_admin, which a user
--     can NEVER raise themselves (forum-profiles.sql's profiles_guard pins it),
--     so admin power is real and unforgeable.
--
-- HARD DELETE + NO LEAK: unpublish is a plain DELETE (scope §8 #5). A deleted
-- row no longer exists, so `select using (true)` cannot return it — there is no
-- tombstone, no "removed" state, and thus no policy that could leak a removed
-- row. The public URL simply 404s (the client renders "not found"); the sitemap
-- prunes it on the next run.
--
-- UNTRUSTED DENORMALIZED COLUMNS: total_price / total_weight / discipline /
-- wheel_config are client-supplied SORT/FILTER HINTS, denormalized at publish
-- time for cheap grid queries. They are NOT a source of truth and NOT a security
-- boundary: the detail page ALWAYS recomputes price/weight/verdict live from
-- `data` via the real engine (buildTotals/checkBuild). A user who forges these
-- only mis-files or mis-labels their OWN build; the visible numbers on the page
-- are always the engine's. Sort is recency (created_at), never any monetization
-- signal (scope §6, the unbiased-value constraint).
--
-- THE PUBLISH GATE IS NOT A DB CONSTRAINT: "build must be complete + zero
-- errors" is enforced in the client at publish time. Postgres cannot run the JS
-- compatibility engine, so this stays a UX/quality gate, not a DB check. A REST
-- caller who bypasses it can only publish a build that then DISPLAYS ITS OWN
-- conflicts honestly (the detail page runs checkBuild and shows every error/
-- warning) — a self-defeating act that injects nothing (sanitizeShare on read
-- drops any id that isn't a real catalog part in the right slot). Accepted, and
-- documented so no one mistakes the gate for a trust boundary.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- gallery_builds. `data` is the SAME {b,p} payload as share links / saved
-- builds ({ "b": {slotKey:partId}, "p": {groupKey:presetId} }), passed through
-- the app's sanitizeShare() on read — so a gallery build inherits share-link
-- safety for free (canonicalId id-migration + the slot-category guard) and can
-- literally never contain arbitrary content.
-- ---------------------------------------------------------------------------
create table if not exists public.gallery_builds (
  id            uuid primary key default gen_random_uuid(),
  -- nullable like the forum: a deleted account leaves the build page up as a
  -- "former member" build (on delete set null), consistent with forum posts.
  author_id     uuid references auth.users(id) on delete set null default auth.uid(),
  -- title: required, 1..120 chars AFTER trimming (the app trims + the DB bounds
  -- it, mirroring the profile tagline/bio caps in forum-profiles-rich*.sql).
  title         text not null
                check (char_length(btrim(title)) between 1 and 120),
  -- story: optional free text, capped. Rendered esc()'d + plain-text on the
  -- client (no auto-linkification in v1 — kills scam-link value cheaply, scope §3).
  story         text
                check (story is null or char_length(story) <= 4000),
  data          jsonb not null,
  -- denormalized SORT/FILTER HINTS (see the security note above) — nullable,
  -- lightly bounded as defense; never a source of truth.
  total_price   numeric check (total_price is null or total_price >= 0),
  total_weight  integer check (total_weight is null or total_weight >= 0),
  discipline    text     check (discipline is null or char_length(discipline) <= 20),
  wheel_config  text     check (wheel_config is null or char_length(wheel_config) <= 12),
  -- optional pointer back to the garage row this was published from (for a
  -- future "update my published version" = republish). Plain uuid, NO FK to
  -- public.builds on purpose: keeps the public table fully decoupled from the
  -- private one (no cross-table RLS interaction), and a stale pointer is harmless.
  source_build_id uuid,
  -- photos are a fast-follow (scope §8 #1): the column exists (nullable) so the
  -- snapshot shape is stable, but NO upload path is wired in this MVP and the UI
  -- never renders it. Bounded as defense-in-depth against a hand-crafted value.
  photo_path    text     check (photo_path is null or char_length(photo_path) <= 300),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Newest-first grid + per-author lookups (the publish-cap count and a future
-- "my published builds" list).
create index if not exists gallery_builds_created_idx        on public.gallery_builds (created_at desc);
create index if not exists gallery_builds_author_created_idx on public.gallery_builds (author_id, created_at desc);
-- Cheap discipline / wheel_config filter scans on the newest-first grid.
create index if not exists gallery_builds_discipline_idx     on public.gallery_builds (discipline, created_at desc);

-- ---------------------------------------------------------------------------
-- Per-user publish cap (flood control, viewpoint-blind — scope §3). BEFORE
-- INSERT, security invoker. Two bounds: a daily rate cap and a lifetime cap.
-- The count sees all of the caller's rows because SELECT is `using (true)` (the
-- table is public), so no SECURITY DEFINER is needed. The service role (no
-- end-user JWT -> auth.uid() IS NULL) is exempt, so manual/seed inserts are
-- never blocked.
-- ---------------------------------------------------------------------------
create or replace function public.gallery_builds_cap()
  returns trigger language plpgsql as $$
declare
  day_count  integer;
  total_count integer;
begin
  if auth.uid() is null then
    return new;   -- service role / SQL editor: exempt
  end if;
  select count(*) into day_count
    from public.gallery_builds
    where author_id = auth.uid()
      and created_at > now() - interval '1 day';
  if day_count >= 10 then
    raise exception 'Daily publish limit reached (10 builds/day). Try again tomorrow.'
      using errcode = 'check_violation';
  end if;
  select count(*) into total_count
    from public.gallery_builds
    where author_id = auth.uid();
  if total_count >= 200 then
    raise exception 'Published-build limit reached (200). Unpublish some builds first.'
      using errcode = 'check_violation';
  end if;
  return new;
end $$;

drop trigger if exists gallery_builds_cap on public.gallery_builds;
create trigger gallery_builds_cap
  before insert on public.gallery_builds
  for each row execute function public.gallery_builds_cap();

-- Keep updated_at fresh on edits (title/story), reusing schema.sql's trigger fn.
drop trigger if exists gallery_builds_touch on public.gallery_builds;
create trigger gallery_builds_touch
  before update on public.gallery_builds
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row-Level Security. Public read; author-own writes; admin moderation layered
-- on top (permissive policies OR together).
-- ---------------------------------------------------------------------------
alter table public.gallery_builds enable row level security;

drop policy if exists "gallery read"          on public.gallery_builds;
drop policy if exists "gallery insert"        on public.gallery_builds;
drop policy if exists "gallery owner modify"  on public.gallery_builds;
drop policy if exists "gallery owner delete"  on public.gallery_builds;
drop policy if exists "gallery admin modify"  on public.gallery_builds;
drop policy if exists "gallery admin delete"  on public.gallery_builds;

-- Everyone (anon + authenticated) may read every published build — the gallery
-- is public, and every row in THIS table is, by construction, published.
create policy "gallery read" on public.gallery_builds
  for select using (true);

-- A signed-in user may publish ONLY as themselves (author_id defaults to
-- auth.uid(); the check rejects any other author_id).
create policy "gallery insert" on public.gallery_builds
  for insert to authenticated
  with check (auth.uid() = author_id);

-- A signed-in user may edit ONLY their own row (title/story), and can never
-- reassign author_id away from themselves (with check).
create policy "gallery owner modify" on public.gallery_builds
  for update to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- A signed-in user may unpublish (hard delete) ONLY their own row.
create policy "gallery owner delete" on public.gallery_builds
  for delete to authenticated
  using (auth.uid() = author_id);

-- Admin moderation (forum-profiles.sql's is_forum_admin()): an admin may edit
-- or take down ANY build. Permissive — OR-ed with the owner policies above.
create policy "gallery admin modify" on public.gallery_builds
  for update to authenticated
  using (public.is_forum_admin())
  with check (public.is_forum_admin());

create policy "gallery admin delete" on public.gallery_builds
  for delete to authenticated
  using (public.is_forum_admin());

-- ===========================================================================
-- POST-MIGRATION INVARIANTS (must hold):
--   * public.builds (the private garage) is UNTOUCHED — no private build can
--     leak through this file.
--   * anon can read published builds and write nothing.
--   * a user can publish/edit/unpublish only their OWN builds; author_id can
--     never be forged on insert or reassigned on update.
--   * an admin can take down or edit any build; a normal user can never raise
--     their own admin (that guard lives in forum-profiles.sql and is unchanged).
--   * a hard delete removes the row with no tombstone, so no removed row is ever
--     selectable.
--   * per-user publish caps (10/day, 200 total) are enforced server-side.
-- ===========================================================================
