/* TrailBuilder — account layer: Supabase auth + saved builds + inventory.
 *
 * Plain browser globals (like src/compat.js), loaded via a classic <script>.
 * Load order (see index.html): src/vendor/supabase.min.js -> src/config.js ->
 * src/account.js. All data functions are async (return Promises) and THROW on
 * a Supabase error so callers can try/catch; reads return the row array/object.
 *
 * No UI here. `user_id` is NEVER sent from the client — the DB column defaults
 * to auth.uid() and RLS enforces owner-only access (see supabase/schema.sql).
 *
 * PKCE flow is used so the OAuth/magic-link callback arrives in the QUERY
 * string (`?code=...`), which does NOT collide with the app's own build hash
 * (`#b=...`) parsed by readHash().
 */

/* The client — null when accounts are not configured yet (placeholder config).
   `supabase` is the global from the vendored UMD build. */
var _sb = (typeof ACCOUNTS_ENABLED !== 'undefined' && ACCOUNTS_ENABLED && typeof supabase !== 'undefined')
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true }
    })
  : null;

var _acctUser = null;   // cached current user (or null), kept fresh by onAuthChange

function accountsReady(){ return !!_sb; }
function currentUser(){ return _acctUser; }

/* Wire auth-state changes and prime the cached user. `cb(user|null)` fires on
   sign-in / sign-out / token refresh. Returns a Promise resolving to the
   initial user (or null). Safe to call when accounts are disabled (no-op). */
function initAccount(cb){
  if(!_sb){ if(cb) cb(null); return Promise.resolve(null); }
  _sb.auth.onAuthStateChange(function(_evt, session){
    _acctUser = (session && session.user) || null;
    if(cb) cb(_acctUser);
  });
  return _sb.auth.getSession().then(function(res){
    _acctUser = (res && res.data && res.data.session && res.data.session.user) || null;
    return _acctUser;
  });
}

/* Throw a readable error out of a Supabase `{data, error}` response. */
function _unwrap(res){
  if(res && res.error){ throw new Error(res.error.message || String(res.error)); }
  return res ? res.data : null;
}
function _need(){ if(!_sb) throw new Error('Accounts are not configured.'); }

/* ---- auth ---------------------------------------------------------------- */
function signInWithEmail(email){
  _need();
  return _sb.auth.signInWithOtp({ email: email, options: { emailRedirectTo: location.href } })
    .then(_unwrap);
}
function signInWithGitHub(){
  _need();
  return _sb.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: location.href } })
    .then(_unwrap);
}
function signOut(){ _need(); return _sb.auth.signOut().then(_unwrap); }

/* ---- saved builds -------------------------------------------------------- */
/* `data` is the same {b:build, p:presetBy} payload the share-hash uses. */
function listBuilds(){
  _need();
  return _sb.from('builds').select('*').order('updated_at', { ascending: false }).then(_unwrap);
}
function saveBuild(name, data, status){
  _need();
  return _sb.from('builds').insert({ name: name, data: data, status: status || 'in_progress' })
    .select().then(_unwrap);
}
function updateBuild(id, patch){
  _need();
  return _sb.from('builds').update(patch).eq('id', id).select().then(_unwrap);
}
function deleteBuild(id){ _need(); return _sb.from('builds').delete().eq('id', id).then(_unwrap); }

/* ---- inventory ----------------------------------------------------------- */
function listInventory(){ _need(); return _sb.from('inventory').select('*').then(_unwrap); }
function addInventoryItem(partId, qty){
  _need();
  return _sb.from('inventory')
    .upsert({ part_id: partId, qty: qty || 1 }, { onConflict: 'user_id,part_id' })
    .select().then(_unwrap);
}
function setInventoryQty(id, qty){
  _need();
  return _sb.from('inventory').update({ qty: qty }).eq('id', id).select().then(_unwrap);
}
function removeInventoryItem(id){ _need(); return _sb.from('inventory').delete().eq('id', id).then(_unwrap); }

/* ---- profiles / usernames (forum-profiles.sql) ---------------------------
 * A `profiles` row is one-per-user: a PUBLIC display `username` (world-readable
 * — usernames show on the forum) plus an `is_admin` moderation flag. is_admin
 * is server-authoritative: a BEFORE INSERT/UPDATE trigger pins it for every
 * end-user caller, so nothing sent from here can raise it (see forum-profiles.sql).
 *
 * Feature-detected so the app is safe to ship BEFORE the migration runs against
 * the live project — same pattern/rationale as forumHasCategories in forum.js:
 * a 1-row probe of the table; an error (missing table) means pre-migration and
 * ALL username/admin UI stays hidden, leaving the forum exactly as it was. A
 * positive answer is cached for the session; a negative one is re-probed on the
 * next call, so it self-heals the moment the owner runs the migration. */
var _profilesProbe = null;   // cached in-flight/positive Promise<boolean>, or null
function hasProfiles(){
  if(!_sb) return Promise.resolve(false);
  if(_profilesProbe) return _profilesProbe;
  _profilesProbe = _sb.from('profiles').select('user_id').limit(1)
    .then(function(res){ return !(res && res.error); },
          function(){ return false; })
    .then(function(on){ if(!on){ _profilesProbe = null; } return on; });
  return _profilesProbe;
}

/* The signed-in user's own profile row (or null if none yet). */
function getMyProfile(){
  _need();
  var u = _acctUser;
  if(!u) return Promise.resolve(null);
  return _sb.from('profiles').select('user_id,username,is_admin').eq('user_id', u.id)
    .maybeSingle().then(_unwrap);
}
/* Public username/is_admin rows for a set of author ids (forum display). */
function getProfilesByIds(ids){
  _need();
  var list = (ids || []).filter(Boolean);
  if(!list.length) return Promise.resolve([]);
  return _sb.from('profiles').select('user_id,username,is_admin').in('user_id', list).then(_unwrap);
}
/* Case-insensitive username lookup (collision check). Returns the row or null.
   Escapes LIKE wildcards so `_`/`%` in a name match literally (PostgREST ilike
   treats `_` as a single-char wildcard — unescaped it would over-match and
   maybeSingle() could even error on multiple hits). The DB's lower(username)
   unique index is the authoritative guard; this is just the friendly pre-check. */
function findProfileByUsername(name){
  _need();
  var pat = String(name == null ? '' : name).replace(/([\\%_])/g, '\\$1');
  return _sb.from('profiles').select('user_id,username').ilike('username', pat)
    .maybeSingle().then(_unwrap);
}
/* Create or rename the signed-in user's profile. `user_id` is sent so upsert can
   target the PK; is_admin is never sent (the DB trigger owns it). */
function upsertMyProfile(username){
  _need();
  var u = _acctUser;
  if(!u) throw new Error('Sign in first.');
  return _sb.from('profiles').upsert({ user_id: u.id, username: username }, { onConflict: 'user_id' })
    .select('user_id,username,is_admin').then(_unwrap);
}

/* Node/CommonJS export guard (parity with compat.js) — lets a future test
   require the pure bits without a browser. Browser ignores this. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    accountsReady: accountsReady, currentUser: currentUser, initAccount: initAccount,
    signInWithEmail: signInWithEmail, signInWithGitHub: signInWithGitHub, signOut: signOut,
    listBuilds: listBuilds, saveBuild: saveBuild, updateBuild: updateBuild, deleteBuild: deleteBuild,
    listInventory: listInventory, addInventoryItem: addInventoryItem,
    setInventoryQty: setInventoryQty, removeInventoryItem: removeInventoryItem,
    hasProfiles: hasProfiles, getMyProfile: getMyProfile, getProfilesByIds: getProfilesByIds,
    findProfileByUsername: findProfileByUsername, upsertMyProfile: upsertMyProfile
  };
}
