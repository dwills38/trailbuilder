-- ===========================================================================
-- forum-riding-styles-dj.sql
-- ---------------------------------------------------------------------------
-- Adds 'dj' (dirt jump) to the profile riding-style vocab CHECK constraints.
--
-- WHY: Dirt jump went LIVE in the catalog 2026-07-14 (the 🤸 DJ discipline chip,
-- driveMode:'single-speed' frames). The forum profile riding-style pickers mirror
-- the catalog discipline vocab (src/schema.js VOCAB.disciplines) — but the two
-- existing CHECK constraints were written before DJ existed and still cap the
-- allowed set at ('xc','trail','enduro','dh','all'). A rider choosing DJ would hit
-- a constraint violation and the profile write would fail. This migration widens
-- BOTH constraints (the rich-v1 singular `riding_style` and the rich-v2 plural
-- `riding_styles[]`) to include 'dj', mirroring the live vocab.
--
-- SAFETY: Display/annotation only — riding style NEVER feeds checkBuild (same
-- firewall as the catalog's `disciplines`). Touches NO policy, NO trigger, NO
-- privileged column — privilege-escalation-impossible and reserved-username
-- enforcement are entirely unaffected (they live in the guard trigger, which this
-- file does not touch). Widening a value-set CHECK cannot reject any row that was
-- already valid, so it is safe on populated tables.
--
-- IDEMPOTENT: drop-if-exists + re-add, safe to run more than once. Run ONCE in the
-- Supabase SQL editor (owner). Keep this vocab in sync with VOCAB.disciplines if it
-- ever changes again.
-- ===========================================================================

-- rich v1 — singular riding_style (kept for back-compat; UI reads riding_styles first)
alter table public.profiles drop constraint if exists profiles_riding_style_chk;
alter table public.profiles
  add constraint profiles_riding_style_chk
  check (riding_style is null
         or riding_style in ('xc','trail','enduro','dh','dj','all'));

-- rich v2 — plural riding_styles[] (the current multi-select the UI writes)
alter table public.profiles drop constraint if exists profiles_riding_styles_chk;
alter table public.profiles
  add constraint profiles_riding_styles_chk
  check (riding_styles is null or (
    array_length(riding_styles, 1) between 1 and 5 and
    riding_styles <@ array['xc','trail','enduro','dh','dj','all']::text[]
  ));
