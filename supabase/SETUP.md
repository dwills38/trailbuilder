# Supabase setup — turning on accounts (one-time, ~15 min)

The Phase 3 code (login, garage, inventory) is **built and shipped inert**: until the two
keys below are filled in `src/config.js`, `ACCOUNTS_ENABLED` is false and all account UI stays
hidden, so the live app is unaffected. These are the steps only the project owner can do.

## 1. Create the project
1. Sign in at [supabase.com](https://supabase.com) → **New project** (free tier is fine).
2. Pick a name/region, set a database password (you won't need it for this app).
3. Wait for it to provision (~2 min).

## 2. Run the schema
1. Left nav → **SQL Editor** → **New query**.
2. Paste the entire contents of [`schema.sql`](schema.sql) and **Run**.
3. Confirm: **Table Editor** now shows `builds` and `inventory`, and each shows
   "RLS enabled" with an owner-only policy.

## 3. Get the keys
1. Left nav → **Project Settings** → **API**.
2. Copy the **Project URL** (e.g. `https://abcdefgh.supabase.co`).
3. Copy the **anon / public** key (a long `eyJ…` JWT). This one is **safe to commit** — it
   only permits what RLS allows. (Do NOT use the `service_role` key anywhere.)
4. Paste both into [`../src/config.js`](../src/config.js):
   ```js
   var SUPABASE_URL = 'https://abcdefgh.supabase.co';
   var SUPABASE_ANON_KEY = 'eyJhbGciOi...';
   ```

## 4. Enable auth providers
- **Email + password** is the required sign-up baseline (email + username + password). Supabase's
  **Email** provider is enabled by default and supports passwords out of the box — nothing to turn
  on. One setting matters: **Authentication → Providers → Email → "Confirm email"**. If it's **ON**
  (Supabase default), a new signup must click a confirmation link before their first sign-in, and
  the app applies their chosen username at that first sign-in; if it's **OFF**, they're signed in
  immediately and the username is applied right away. Either way works — the username is captured
  at signup and finalized (unique + reserved-checked) when the profile row is created.
- **Email magic link** stays available as an optional passwordless method ("Email me a magic link
  instead" in the auth modal) — on by default (deliverability on Supabase's shared SMTP can be slow;
  fine for testing).
- **GitHub (recommended, easiest to test):**
  1. GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App.
     - Homepage URL: `https://dwills38.github.io/trailbuilder/`
     - Authorization callback URL: the value Supabase shows in step 4.2 below
       (`https://<project>.supabase.co/auth/v1/callback`).
  2. Supabase → **Authentication → Providers → GitHub** → paste the GitHub app's
     Client ID + Client Secret → Enable.

## 5. Allow the redirect URLs
Supabase → **Authentication → URL Configuration**:
- **Site URL:** `https://dwills38.github.io/trailbuilder/`
- **Redirect URLs** (add both):
  - `https://dwills38.github.io/trailbuilder/`   (production)
  - `http://localhost:8123/`   (local testing via the preview server; `file://` will NOT work)

## 6. Ship & test
1. Commit the filled-in `src/config.js`, push — CI + deploy run automatically.
2. Open the app, click **Log in**, sign in with GitHub. The header should show your email
   plus **Garage** / **Inventory** / **Log out**.
3. Build a bike → **⭑ Save to garage** → reload → **Garage** lists it → **Load** restores it.
   Add a part to **Inventory**, reload, confirm it persists. Sign out.

### Notes
- Free-tier projects **pause after ~1 week idle** — the dashboard has a "restore" button; fine
  for a prototype, worth knowing before a demo.
- To rotate keys later, just edit `src/config.js` — nothing else references them.
- Everything a user stores is owner-scoped by RLS; a logged-out visitor (and any other user)
  can't read or write someone else's builds/inventory.

## 7. Turn on the built-in forum (Phase 4, optional)

The forum (`src/forum.js`) reuses this same project — no new keys — but ships **inert** behind
`FORUM_ENABLED` in `src/config.js` until you've run its migration:

1. Left nav → **SQL Editor** → **New query**. Paste the entire contents of `schema.sql` again
   (it's re-runnable — the forum tables were appended to the bottom) and **Run**. Confirm
   **Table Editor** now also shows `forum_threads` and `forum_posts`, RLS enabled, and that
   `forum_threads` has one pinned row: "Welcome to TrailBuilder Discussions".
2. Edit `src/config.js`: set `var FORUM_ENABLED = true;`.
3. Commit + push. The header's **💬 Community** button now opens the in-app forum page
   instead of linking out to GitHub Discussions.
4. Test: open the app logged out — the welcome thread should be readable. Log in, **＋ New
   thread**, post one, open it, post a reply. Reads stay open to everyone; only signed-in
   users can post, and only the author can edit/delete their own posts (enforced by RLS,
   same owner-only pattern as builds/inventory above — see the "forum threads/posts"
   policies in `schema.sql`).

## 8. Forum categories (Phase 4b — after the forum is live)

Threads carry a category (📣 Announcements, 🧩 Build help & compatibility, the riding
disciplines, …). The vocabulary is the committed `FORUM_CATEGORIES` constant in
[`../src/forum.js`](../src/forum.js); the database only stores the key. Rollout order is
deliberately safe in both directions — the deployed UI **feature-detects** the column and
hides all category UI until it exists:

1. **SQL first** (safe under the currently-deployed UI): SQL Editor → paste the entire
   `schema.sql` again → **Run**. Confirm in Table Editor: `forum_threads` has a `category`
   column, existing threads show `general`, and the pinned welcome thread shows
   `announcements`.
2. Merge + push the category UI — CI + deploy run as usual.
3. 60-second smoke test, logged in: **＋ New thread** → pick a category → post → the list's
   category chips filter to it → the welcome thread shows under 📣 Announcements. Logged
   out, the list + chips render read-only as always.

Until step 1 runs, the deployed category UI stays hidden and the forum behaves exactly as
before; threads posted pre-migration simply render as 💬 General afterwards.

## 9. Forum usernames + admin moderation (after the forum is live)

Gives every signed-in user a public **username** (shown on their forum threads/replies instead
of an email or raw id) and gives **you, the owner, moderation powers** (delete any thread or
reply). Same deploy-order safety as everything above — the deployed UI **feature-detects** the
new `profiles` table and hides all username/admin UI until it exists, so nothing breaks if the
app ships before this migration runs.

**Username rules:** 3–24 characters, letters/numbers/spaces/`_`/`-`; ends trimmed and internal
whitespace collapsed. Uniqueness is **case- and separator-insensitive** on a normalized form
(lowercase + strip spaces/`_`/`-`), so `Doug`, `doug` and `D o u g` all count as the same name —
nobody can impersonate by re-casing or re-spacing.

1. **Run the migration.** SQL Editor → **New query** → paste the entire contents of
   [`forum-profiles.sql`](forum-profiles.sql) → **Run**. (It depends on `schema.sql` having
   already been run — it reuses that file's forum tables and `touch_updated_at()` trigger.)
   Confirm in **Table Editor**: new `profiles` and `reserved_usernames` tables (RLS enabled), and
   that `reserved_usernames` has the seeded rows.
2. **Ship the app** (merge + push — CI + deploy as usual). The header now shows a **👤 Profile**
   button when signed in; first sign-in prompts for a username. Threads/replies show usernames;
   legacy posts whose author never picked one show as `rider-<short id>` (never an email).
3. **Seed your owner profile as admin** (one-time). In the SQL Editor:
   ```sql
   -- find your user id:
   select id, email from auth.users where email = 'douglas.w.wills@gmail.com';
   -- seed the 'Doug' profile as admin (paste the uuid). Works even before you've
   -- signed in, and may claim the reserved name 'Doug' because it runs as the
   -- service role:
   insert into public.profiles (user_id, username, is_admin)
   values ('<your-uuid>', 'Doug', true)
   on conflict (user_id) do update set is_admin = true, username = 'Doug';
   ```
   Reload the app — you'll now see a 🗑 **Delete** control on every thread and reply. To grant
   admin to someone else later: `update public.profiles set is_admin = true where user_id =
   '<their-uuid>';` (to revoke, set it back to `false`).

**Verified Pro badge.** `profiles.verified_pro` (admin-only, same non-self-settable trigger as
`is_admin`) drives a small **✓ Pro** badge next to a username on the forum. Verify the person's
real pro identity offline first, then grant it in SQL:
```sql
select user_id, username from public.profiles where username = 'Brage Vestavik';
update public.profiles set verified_pro = true where user_id = '<their-uuid>';
```
A normal user can never set this on themselves — it's pinned by the same server-side guard as
`is_admin` (walkthrough below). Set it back to `false` to revoke.

**Reserved usernames.** `reserved_usernames` holds names an ordinary user may **not** take —
`kind='blocked'` (your real name + variants; private, never exposed to clients) and `kind='held'`
(parked handles like `Gnarfather`, readable so the app can pre-warn). A server-side trigger
rejects any username whose normalized form is reserved, **unless the caller is an admin** (so you
can still claim `Doug`). Manage the list in SQL:
```sql
-- reserve another name (norm is computed for you):
insert into public.reserved_usernames (norm, label, kind)
values (public.profile_norm('Some Name'), 'Some Name', 'blocked') on conflict (norm) do nothing;
-- release one:
delete from public.reserved_usernames where norm = public.profile_norm('Some Name');
```

**Why a normal user can't make themselves admin (or a Verified Pro):** both `is_admin` and
`verified_pro` are server-authoritative. The profiles RLS lets a signed-in user create/rename only
their own row (`auth.uid() = user_id`), and a `BEFORE INSERT/UPDATE` trigger *pins* both flags for
every real end-user caller (it forces `false` on insert and the unchanged old value on update), so
even a hand-crafted API call that tries to set `is_admin: true` / `verified_pro: true` saves the
username and silently drops the flag change. Only the SQL Editor / service role — which runs with
no end-user JWT (`auth.uid()` is null) — can set them, i.e. the grants above are the only path. The
full walkthrough is in the header comment of `forum-profiles.sql`.
