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
- **Email magic link** is on by default — nothing to do (deliverability on Supabase's shared
  SMTP can be slow; fine for testing).
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
