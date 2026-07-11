-- BuildMyMTB — Supabase migration: forum profiles HARDENING (search_path pins +
-- least-privilege EXECUTE on the reserved-name function).
--
-- Run ONCE in the Supabase SQL editor, AFTER both supabase/schema.sql AND
-- supabase/forum-profiles.sql have been run (it re-states functions those files
-- define and re-grants a function they create). It is fully re-runnable /
-- idempotent: every statement is CREATE OR REPLACE FUNCTION or REVOKE/GRANT, all
-- of which are safe to run repeatedly with no cumulative effect. It changes NO
-- table, column, policy, trigger, RLS setting, or security context — it only
-- (1) pins each function's search_path and (2) tightens who may EXECUTE one
-- SECURITY DEFINER function. Every guarantee in forum-profiles.sql's header
-- security walkthrough is preserved verbatim (see the closing assertion).
--
-- ===========================================================================
-- WHY (linter background). Supabase's database linter flags two classes of
-- issue this file closes, WITHOUT weakening anything:
--   * "Function search_path mutable" — a function with no pinned search_path
--     resolves unqualified names against the CALLER's search_path, which a
--     caller can set. Our bodies are already fully schema-qualified (verified
--     below), so this is defense-in-depth, not a live hole; pinning makes the
--     property permanent and lint-clean.
--   * Over-broad EXECUTE on a SECURITY DEFINER function — CREATE FUNCTION grants
--     EXECUTE to PUBLIC by default. We reduce username_is_reserved()'s callable
--     surface to exactly the roles that need it (Job 2).
--
-- ===========================================================================
-- JOB 1 — pin search_path on the four flagged functions.
--
-- Method: CREATE OR REPLACE FUNCTION with `SET search_path = public, pg_temp`.
-- pg_temp is placed LAST on purpose: if it came first, a caller could create a
-- temp object (table/function) that shadows a public one and have it picked up
-- first; putting pg_temp last means real public objects always win and only a
-- genuinely-absent name could fall through to pg_temp. Bodies are copied
-- BYTE-FOR-BYTE from the source files; volatility, language, argument names, and
-- (for profiles_guard) the SECURITY INVOKER context are all unchanged. Adding a
-- SET clause changes neither a function's declared volatility nor its security
-- context.
--
-- SCHEMA-QUALIFICATION AUDIT (done before writing this file — pinning search_path
-- is only safe if no unqualified, non-builtin name lives in a body, or resolution
-- could change and a function could break). Result per function:
--   * touch_updated_at()  — references only `now()` (pg_catalog) and the trigger
--                           pseudo-record `new`. No schema-scoped name. SAFE.
--   * profile_norm(text)  — references only `lower`, `regexp_replace`, `coalesce`
--                           (all pg_catalog). No table/function reference. SAFE.
--                           KEPT `language sql immutable` and BYTE-IDENTICAL body:
--                           it backs the STORED generated column
--                           profiles.username_norm and the unique index
--                           profiles_username_norm_idx, so its volatility MUST
--                           stay IMMUTABLE and its output MUST NOT change. Adding
--                           only a SET clause keeps it IMMUTABLE, so the generated
--                           column / index dependency remains valid and
--                           CREATE OR REPLACE is permitted.
--   * is_forum_admin()    — references `public.profiles` and `auth.uid()` (both
--                           already schema-qualified) and `exists` (built-in).
--                           SAFE; `language sql stable` unchanged.
--   * profiles_guard()    — references `auth.uid()`, `public.is_forum_admin()`,
--                           `public.username_is_reserved(...)`,
--                           `public.profile_norm(...)` (ALL already qualified)
--                           and `btrim`, `regexp_replace` (built-ins), plus the
--                           trigger vars new/old/tg_op. SAFE; `language plpgsql`
--                           and SECURITY INVOKER unchanged (NOT made definer).
-- Conclusion: for all four, every referenced object is schema-qualified or a
-- pg_catalog built-in, so pinning search_path cannot change name resolution and
-- cannot break any function. Verified by hand against schema.sql /
-- forum-profiles.sql before authoring.
--
-- Note: the four triggers that call these functions (builds_touch,
-- profiles_touch, profiles_guard) reference them BY NAME, so replacing the
-- function bodies in place keeps every trigger wired up — no trigger is dropped
-- or recreated here.
--
-- ===========================================================================
-- JOB 2 — least-privilege EXECUTE on public.username_is_reserved(text)
-- (SECURITY DEFINER; already search_path-pinned in forum-profiles.sql, so it is
-- NOT re-created here — only its grants are tightened).
--
-- Caller facts (verified in the client, src/account.js): the browser NEVER calls
-- this function by RPC — it only READS the 'held' reserved rows through the
-- reserved_usernames SELECT policy (listReservedHeld). The ONLY runtime caller is
-- the profiles_guard trigger (SECURITY INVOKER), which runs as the acting role
-- during a signed-in user's profile INSERT/UPDATE and calls
-- username_is_reserved(...) to reject reserved names.
--
--   * REVOKE from PUBLIC  — removes the blanket default grant CREATE FUNCTION
--                           hands to PUBLIC. This is the actual surface cut.
--   * REVOKE from anon     — explicit defense-in-depth. anon can NEVER write a
--                           profile row (the profiles INSERT/UPDATE policies are
--                           `to authenticated`, and for anon auth.uid() is NULL
--                           so `auth.uid() = user_id` is never true), therefore
--                           anon's trigger path never fires and anon never needs
--                           this function. Stated explicitly so intent is legible.
--   * GRANT to authenticated — REQUIRED. A signed-in user's profile write runs
--                           the profiles_guard trigger AS the authenticated role;
--                           that role must still reach username_is_reserved. The
--                           guard calls it on EVERY non-admin write, so without
--                           this grant every ordinary profile insert/update would
--                           abort with "permission denied for function" — it fails
--                           CLOSED (all writes blocked), not open, so no reserved
--                           name could slip through either way; but the feature
--                           would be broken. This grant preserves the enforcement
--                           path exactly.
--
-- service_role decision: GRANT to service_role, as cheap, zero-cost insurance.
--   Reasoning: on the owner/admin seeding + reserved-name paths that run as
--   service_role (SQL editor), auth.uid() IS NULL, so profiles_guard sets
--   acting_is_admin := true and the `if not acting_is_admin and
--   username_is_reserved(...)` test SHORT-CIRCUITS — username_is_reserved is not
--   even evaluated — and separately the function OWNER can always execute its own
--   function regardless of grants. So today service_role does not strictly need
--   the grant. BUT: service_role is a member of PUBLIC, so `REVOKE ... FROM
--   PUBLIC` would otherwise strip its access, and if any FUTURE server-side path
--   (an admin edge function, or a tweak to the guard's short-circuit) ever made
--   service_role reach this function, a missing grant would break an
--   admin/reserved-name flow with "permission denied". Granting service_role
--   removes that fragility at ZERO added attack surface: service_role is a
--   trusted server-only secret, never shipped in the browser (the browser holds
--   only the anon/publishable key, which we just revoked). Safest choice that
--   still meaningfully reduces the browser-reachable surface. The narrower
--   alternative — making profiles_guard SECURITY DEFINER and inlining the check
--   to drop the grant entirely — was considered and REJECTED: it would change a
--   security-critical trigger's execution context and is a far larger, riskier
--   change than revoke/grant, which keeps every existing guarantee intact with
--   the smallest possible diff.
--
-- ===========================================================================
-- POST-MIGRATION INVARIANTS (unchanged by this file):
--   * Privilege escalation remains IMPOSSIBLE. is_admin and verified_pro stay
--     server-authoritative: the profiles_guard trigger still pins both flags for
--     every end-user caller (auth.uid() IS NOT NULL) — false on INSERT, OLD value
--     on UPDATE — so the anon/publishable key can never raise either. This file
--     touches neither the trigger's logic nor the RLS policies.
--   * Reserved-name enforcement still FIRES. A signed-in non-admin choosing a
--     reserved username is still rejected by the trigger: the trigger (as the
--     authenticated role) still calls username_is_reserved, which authenticated
--     is now explicitly granted EXECUTE on.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- JOB 1: search_path pins (bodies copied byte-for-byte; see audit above).
-- ---------------------------------------------------------------------------

-- touch_updated_at() — from schema.sql. language plpgsql, trigger fn.
create or replace function public.touch_updated_at()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- profile_norm(text) — from forum-profiles.sql. MUST stay `sql immutable` and
-- byte-identical (backs a stored generated column + unique index).
create or replace function public.profile_norm(t text)
  returns text language sql immutable
  set search_path = public, pg_temp as $$
  select lower(regexp_replace(coalesce(t, ''), '[ _-]', '', 'g'));
$$;

-- is_forum_admin() — from forum-profiles.sql. language sql stable.
create or replace function public.is_forum_admin()
  returns boolean language sql stable
  set search_path = public, pg_temp as $$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.is_admin
  );
$$;

-- profiles_guard() — from forum-profiles.sql. language plpgsql, SECURITY INVOKER
-- (unchanged — NOT made definer). Body copied exactly, comments included.
create or replace function public.profiles_guard()
  returns trigger language plpgsql
  set search_path = public, pg_temp as $$
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

-- ---------------------------------------------------------------------------
-- JOB 2: least-privilege EXECUTE on public.username_is_reserved(text).
-- (The function itself is unchanged — already SECURITY DEFINER + search_path
-- pinned in forum-profiles.sql; only its grants are tightened here.)
-- ---------------------------------------------------------------------------
revoke execute on function public.username_is_reserved(text) from public;
revoke execute on function public.username_is_reserved(text) from anon;
grant  execute on function public.username_is_reserved(text) to authenticated;
grant  execute on function public.username_is_reserved(text) to service_role;
