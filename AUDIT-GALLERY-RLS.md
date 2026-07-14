# Security audit — Builds Gallery MVP (`feat/builds-gallery`)

Independent static policy audit of `supabase/gallery-builds.sql`, `src/gallery.js`,
the publish/gallery UI in `index.html`, `tools/gen-sitemap.js`, and `.github/workflows/deploy.yml`.
Re-derived from the code, not from the author's SQL-header claims. No live Postgres, so RLS/trigger
reasoning is analytical; the JS render paths were traced line-by-line.

**Verdict: GO** — no data-safety, auth, XSS, secret, pop-up, or e-bike issue found. One LOW/MEDIUM
robustness finding (client-controlled `created_at`) is worth a cheap server-side hardening but is not
a blocker: it cannot leak or mutate another user's data.

## Attack surface results

| # | Surface | Result | Deciding line |
|---|---------|--------|---------------|
| 1 | RLS write / forged author_id / hijack | **PASS** | insert `with check (auth.uid()=author_id)`; update `using`+`with check` both pin author_id; delete `using (auth.uid()=author_id)`; all `to authenticated`; anon has no write policy (`auth.uid()` NULL ≠ author_id). `gallery-builds.sql:209–234` |
| 2 | Private `builds` (garage) leak | **PASS** | Gallery layer never references `public.builds`/`inventory`; `source_build_id` is a plain uuid with **no FK** (`sql:127`). Fully decoupled table; `select using(true)` only exposes rows that are published by construction. |
| 3 | Publish caps (10/day + 200) | **PARTIAL** | Caps are **advisory, not a boundary.** Daily cap is bypassable (see F1); both caps are raceable under READ COMMITTED (BEFORE-INSERT count doesn't see concurrent uncommitted rows). Lifetime 200 is the only real ceiling. `sql:151–181` |
| 4 | Injection / XSS (title, story) | **PASS** | Every innerHTML path `esc()`s title/story (`index.html:3668,3747,3752`); `document.title` is a text assignment and `metaDesc`/canonical use `setAttribute()` — both DOM-safe, not HTML-parsed (`3736–3739`). Denorm chips are whitelist-key lookups (`DISC_LABELS`/`WC_LABEL`), `dot.color` is a constant palette. Sitemap emits only uuid+date, xml-escaped (`gen-sitemap.js:37–53`) — title/story never reach it. DB CHECK caps (title 1–120, story ≤4000) match the UI `maxlength`. |
| 5 | Payload integrity (`data` JSON) | **PASS** | Read path `_resolveData()` runs `sanitizeShare()` before any render/engine call (`index.html:3112`), so a forged non-catalog id or wrong-slot id is dropped regardless of what's stored. Totals + verdict are **recomputed live** (`buildTotals`/`checkBuild`), never read from the denorm hints. |
| 6 | Report pipeline + deploy.yml | **PASS** | Report opens a prefilled GitHub `issues/new` URL, `encodeURIComponent`'d, `window.open(...,'noopener')`, no token — auth is the reporter's own GitHub session (`index.html:3777–3786`). deploy.yml adds only a daily `schedule` + a sitemap step using the **public anon key** from `config.js`; `permissions` unchanged (`contents:read/pages:write/id-token:write`); fail-soft, no secret. |
| 7 | Scope creep / hard rules | **PASS (1 note)** | No kudos/like/featured column or UI. No pop-ups — `publishModal` is a `<dialog>` opened only on button click. No e-bike surface. **Note:** inert `photo_path` column exists (deferred fast-follow) with no upload/render path — see F3. |

## Findings

### F1 — LOW/MEDIUM · `created_at` is client-writable → daily-cap bypass + grid self-promotion
`created_at` has only `default now()` (`sql:132`); no trigger pins it on insert/update and there is no
column-level GRANT restricting it, so the default Supabase `authenticated` grant lets a REST caller set
it in the request body. Two consequences:
- **Daily-cap bypass:** the trigger's daily count is `... and created_at > now() - interval '1 day'`
  (`sql:163`). Insert each row with a **back-dated** `created_at` (e.g. `2020-01-01`) and every prior
  row falls outside the 1-day window, so `day_count` stays 0. The 10/day cap never trips; only the
  lifetime 200 remains. (Also raceable via a parallel burst.)
- **Ordering manipulation:** the grid is `order by created_at desc`. A **future** `created_at` pins a
  user's build to the permanent top of the "newest-first" grid — directly undermining the
  "recency ordering, never a bias/monetization signal" property.

Blast radius is bounded (own rows only; lifetime 200 cap holds; no data leak). **Cheap fix:** pin the
timestamp server-side — set `new.created_at := now()` in the BEFORE INSERT trigger (and reset it on
UPDATE), or revoke column-level write on `created_at`/denorm columns from `authenticated`.

### F2 — LOW · Cap trigger is a TOCTOU race
BEFORE-INSERT count under READ COMMITTED can't see concurrent uncommitted inserts, so a parallel burst
can exceed 10/day and (to a lesser degree) 200. Acceptable for "flood control," but note it is not a
hard boundary. A real cap needs a `unique`/exclusion constraint or a serialized counter.

### F3 — INFO · Deferred `photo_path` column landed early
`photo_path` (`sql:131`) is nullable, bounded, and has no upload or render path, but Douglas deferred
photos. Inert and harmless; called out only against the "no photo column" scope guard.

## Gates (run on the branch)
- `node validate.js` → `DATA OK - 3117 parts, 0 problems` ✅
- `npx vitest run` → `561 passed (19 files)` ✅
- `npx tsc --noEmit` → clean, exit 0 ✅
- `node tools/verdict-audit-harness.js` → 11/11 clashes flagged, 0 missed, 0 new errors ✅
  (the 6 rotor-max fork false-warns are pre-existing fork catalog data, unrelated to the gallery.)
