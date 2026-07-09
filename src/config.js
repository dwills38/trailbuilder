/* TrailBuilder — public app config (committed, no secrets).
 *
 * The Supabase Project URL and anon (publishable) key are SAFE to ship in
 * client code: they only permit what Row-Level Security allows, and every row
 * in `builds`/`inventory` is owner-scoped (auth.uid() = user_id). This mirrors
 * the existing external-service pattern (`var REPORT_REPO` in index.html).
 *
 * Until the Supabase project exists, leave these as empty strings. While unset,
 * ACCOUNTS_ENABLED is false and ALL account UI stays hidden (same graceful
 * gating as `$('reportGithub').hidden = !REPORT_REPO`) — the app runs fully as
 * a logged-out prototype and hash share-links keep working unchanged.
 *
 * To go live: paste the Project URL + anon key from the Supabase dashboard
 * (Settings -> API), run supabase/schema.sql, and set the Auth redirect URLs.
 */
var SUPABASE_URL = 'https://pabiaerjadeeggwoslng.supabase.co';
var SUPABASE_ANON_KEY = 'sb_publishable_s9F1GKfy_8MwRtDrBcWN3w_BUB4qrdS';   // publishable/anon key - RLS owner-scopes every row, safe to commit

var ACCOUNTS_ENABLED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

/* Phase 4: the built-in forum (threads + replies). Piggybacks on the SAME
 * Supabase project/auth as accounts above — no new keys, just two new tables
 * (forum_threads/forum_posts, appended to supabase/schema.sql). Stays false
 * (and all forum UI hidden, falling back to the GitHub Discussions link) until
 * that migration has been run against the live project — see
 * supabase/SETUP.md step 7. Flip to true once it has.
 */
var FORUM_ENABLED = false;
