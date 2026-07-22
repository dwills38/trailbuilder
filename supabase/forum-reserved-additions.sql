-- ---------------------------------------------------------------------------
-- Additive reserved-username seeds (run in the Supabase SQL editor, any time
-- after forum-profiles.sql). Idempotent: `on conflict (norm) do nothing`, so
-- re-running the whole file is always safe. Append new batches at the bottom
-- with a dated comment — never edit forum-profiles.sql's original seed block
-- (it documents what shipped with the table).
--
-- kind semantics (same as forum-profiles.sql):
--   'blocked' — nobody may take it, ever (owner identity names).
--   'held'    — rejected for ordinary signups; an admin may grant it to the
--               rightful claimant later (owner picks, real-person names).
-- ---------------------------------------------------------------------------

-- 2026-07-21 — owner order (seat 17): reserve "Dirt Jesus".
insert into public.reserved_usernames (norm, label, kind, note) values
  (public.profile_norm('Dirt Jesus'), 'Dirt Jesus', 'held', 'reserved on the owner''s order 2026-07-21')
on conflict (norm) do nothing;
