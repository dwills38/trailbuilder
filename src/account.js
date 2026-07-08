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

/* Node/CommonJS export guard (parity with compat.js) — lets a future test
   require the pure bits without a browser. Browser ignores this. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    accountsReady: accountsReady, currentUser: currentUser, initAccount: initAccount,
    signInWithEmail: signInWithEmail, signInWithGitHub: signInWithGitHub, signOut: signOut,
    listBuilds: listBuilds, saveBuild: saveBuild, updateBuild: updateBuild, deleteBuild: deleteBuild,
    listInventory: listInventory, addInventoryItem: addInventoryItem,
    setInventoryQty: setInventoryQty, removeInventoryItem: removeInventoryItem
  };
}
