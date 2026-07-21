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
/* Email+password signup (the required baseline: email + username + password —
   the caller creates the profiles row with the chosen username once a session
   exists). Returns {user, session}; session is null when the project requires
   email confirmation, in which case the profile is created on first sign-in. */
function signUpWithPassword(email, password){
  _need();
  return _sb.auth.signUp({ email: email, password: password, options: { emailRedirectTo: location.href } })
    .then(_unwrap);
}
function signInWithPassword(email, password){
  _need();
  return _sb.auth.signInWithPassword({ email: email, password: password }).then(_unwrap);
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

/* ---- service log (schema.sql Phase 5) -------------------------------------
 * The rider's maintenance notebook: events logged against a garage build
 * (build_id) or an owned catalog part (part_id). Owner-only RLS, so list
 * returns only the caller's rows. Feature-detected with the same
 * probe-and-cache pattern as hasProfiles: a 1-row select of the table; an
 * error (missing table) means the owner hasn't run the Phase 5 migration and
 * ALL service-log UI stays hidden. Positive answers are cached for the
 * session; negatives re-probe, so it self-heals once the SQL runs. */
var _serviceLogProbe = null;
function hasServiceLog(){
  if(!_sb) return Promise.resolve(false);
  if(_serviceLogProbe) return _serviceLogProbe;
  _serviceLogProbe = _sb.from('service_events').select('id').limit(1)
    .then(function(res){ return !(res && res.error); },
          function(){ return false; })
    .then(function(on){ if(!on){ _serviceLogProbe = null; } return on; });
  return _serviceLogProbe;
}

/* All of the caller's events, newest service date first (ties: newest row
   first). RLS scopes this to the signed-in user; no filters needed. */
function listServiceEvents(){
  _need();
  return _sb.from('service_events').select('*')
    .order('done_on', { ascending: false })
    .order('created_at', { ascending: false })
    .then(_unwrap);
}
/* Insert one event. `ev` is the normalized {build_id?, part_id?, done_on,
   title, note?} produced by src/service-log.js's normalizeServiceEvent —
   user_id is never sent (DB default + RLS, like every other table). */
function addServiceEvent(ev){
  _need();
  return _sb.from('service_events').insert({
    build_id: ev.build_id || null,
    part_id:  ev.part_id  || null,
    done_on:  ev.done_on,
    title:    ev.title,
    note:     ev.note || null
  }).select().then(_unwrap);
}
function deleteServiceEvent(id){
  _need();
  return _sb.from('service_events').delete().eq('id', id).then(_unwrap);
}

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

/* The signed-in user's own profile row (or null if none yet). Selects '*' so it
   picks up created_at AND the rich columns (bio/riding_style/location/avatar)
   the moment forum-profiles-rich.sql has run — and stays safe before it, because
   select('*') only ever returns the columns that actually exist. */
function getMyProfile(){
  _need();
  var u = _acctUser;
  if(!u) return Promise.resolve(null);
  return _sb.from('profiles').select('*').eq('user_id', u.id)
    .maybeSingle().then(_unwrap);
}
/* One public profile row by user id (for viewing another rider's profile page).
   select('*') for the same feature-detect-friendly reason as getMyProfile. */
function getProfileById(id){
  _need();
  if(!id) return Promise.resolve(null);
  return _sb.from('profiles').select('*').eq('user_id', id).maybeSingle().then(_unwrap);
}
/* Public username/is_admin/verified_pro rows for a set of author ids (forum display). */
function getProfilesByIds(ids){
  _need();
  var list = (ids || []).filter(Boolean);
  if(!list.length) return Promise.resolve([]);
  return _sb.from('profiles').select('user_id,username,is_admin,verified_pro').in('user_id', list).then(_unwrap);
}

/* Feature-detect the rich profile columns (forum-profiles-rich.sql). Same
   probe-and-cache pattern as hasProfiles / forumHasCategories: a 1-row select of
   just `bio`. An error (undefined column) means the rich migration hasn't run,
   so the profile page shows the base fields only and hides the bio/riding-style/
   location/avatar editors. Positive answer cached; negative re-probed so it
   self-heals once the owner runs the migration. */
var _richProbe = null;
function hasRichProfiles(){
  if(!_sb) return Promise.resolve(false);
  if(_richProbe) return _richProbe;
  _richProbe = _sb.from('profiles').select('bio').limit(1)
    .then(function(res){ return !(res && res.error); },
          function(){ return false; })
    .then(function(on){ if(!on){ _richProbe = null; } return on; });
  return _richProbe;
}
/* Feature-detect the RICH v2 columns (forum-profiles-rich2.sql: photo, tagline,
   multi-discipline, home trails, current bike, experience, social handles).
   Same probe-and-cache pattern as hasRichProfiles — a 1-row select of `tagline`.
   Negative (column missing) re-probes so it self-heals once the owner runs the
   migration; while negative the profile page shows only the v1 rich fields and
   hides the v2 editors + the photo uploader. */
var _rich2Probe = null;
function hasRichProfiles2(){
  if(!_sb) return Promise.resolve(false);
  if(_rich2Probe) return _rich2Probe;
  _rich2Probe = _sb.from('profiles').select('tagline').limit(1)
    .then(function(res){ return !(res && res.error); },
          function(){ return false; })
    .then(function(on){ if(!on){ _rich2Probe = null; } return on; });
  return _rich2Probe;
}
/* Owner-only update of the rich profile fields. Only the whitelisted keys are
   ever sent; user_id/username/is_admin/verified_pro are untouched here (username
   has its own upsert path, the flags are DB-pinned). RLS scopes the update to
   the caller's own row, and profiles_guard still re-pins the privileged flags on
   this update. Unknown columns (pre-migration) simply aren't in the patch. */
function updateMyProfileFields(patch){
  _need();
  var u = _acctUser;
  if(!u) throw new Error('Sign in first.');
  var allow = ['bio','riding_style','location','avatar',
               'avatar_url','tagline','riding_styles','home_trails',
               'current_bike','experience','instagram','youtube','strava'];
  var clean = {};
  allow.forEach(function(k){ if(patch && (k in patch)){ clean[k] = patch[k]; } });
  return _sb.from('profiles').update(clean).eq('user_id', u.id)
    .select('*').then(_unwrap);
}

/* ---- profile photo upload (Storage `avatars` bucket, forum-profiles-rich2.sql)
 * Owner uploads their OWN photo. The upload path is ALWAYS `<auth.uid()>/…`, the
 * only folder the Storage RLS lets this user write (see the migration). Type +
 * size are pre-checked here for a friendly error; the bucket ALSO enforces both
 * server-side (allowed_mime_types + file_size_limit) so a bypassed client can't
 * abuse it. Returns the public URL string (also written to profiles.avatar_url
 * by the caller via updateMyProfileFields). */
var AVATAR_MAX_BYTES = 2 * 1024 * 1024;          // 2 MiB — mirrors the bucket cap
var AVATAR_TYPES = { 'image/jpeg':'jpg', 'image/png':'png', 'image/webp':'webp' };
function uploadAvatar(file){
  _need();
  var u = _acctUser;
  if(!u) return Promise.reject(new Error('Sign in first.'));
  if(!file) return Promise.reject(new Error('No file chosen.'));
  var ext = AVATAR_TYPES[file.type];
  if(!ext) return Promise.reject(new Error('Please choose a JPEG, PNG or WebP image.'));
  if(file.size > AVATAR_MAX_BYTES) return Promise.reject(new Error('Image is too large (2 MB max).'));
  // Deterministic per-user object name (upsert overwrites the prior photo, so a
  // rider never accumulates orphans). Path stays inside the user's own folder.
  var path = u.id + '/avatar.' + ext;
  return _sb.storage.from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type, cacheControl: '3600' })
    .then(function(res){
      if(res && res.error) throw res.error;
      var pub = _sb.storage.from('avatars').getPublicUrl(path);
      var url = pub && pub.data && pub.data.publicUrl;
      if(!url) throw new Error('Upload succeeded but no public URL was returned.');
      // Cache-bust so the browser refetches after a re-upload to the same path.
      return url + '?v=' + Date.now();
    });
}
/* Collision check on the NORMALIZED username (username_norm — lowercase +
   spaces/_/- stripped, matching public.profile_norm). An exact eq on the stored
   generated column, so no LIKE-wildcard hazards. The DB's unique index on
   username_norm is the authoritative guard; this is just the friendly pre-check.
   Returns the row {user_id} or null. */
function findProfileByNorm(norm){
  _need();
  return _sb.from('profiles').select('user_id').eq('username_norm', norm)
    .maybeSingle().then(_unwrap);
}
/* The 'held' reserved usernames (RLS exposes only these — the 'blocked'
   real-name rows stay private and are enforced server-side). Returns an array of
   {norm}. Used for the client's friendly reserved pre-check. */
function listReservedHeld(){
  _need();
  return _sb.from('reserved_usernames').select('norm').eq('kind', 'held').then(_unwrap);
}
/* Create or rename the signed-in user's profile. `user_id` is sent so upsert can
   target the PK; is_admin is never sent (the DB trigger owns it). The DB
   normalizes the display username + enforces reserved names. */
function upsertMyProfile(username){
  _need();
  var u = _acctUser;
  if(!u) throw new Error('Sign in first.');
  return _sb.from('profiles').upsert({ user_id: u.id, username: username }, { onConflict: 'user_id' })
    .select('user_id,username,is_admin,verified_pro').then(_unwrap);
}

/* Node/CommonJS export guard (parity with compat.js) — lets a future test
   require the pure bits without a browser. Browser ignores this. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    accountsReady: accountsReady, currentUser: currentUser, initAccount: initAccount,
    signInWithEmail: signInWithEmail, signInWithGitHub: signInWithGitHub,
    signUpWithPassword: signUpWithPassword, signInWithPassword: signInWithPassword, signOut: signOut,
    listBuilds: listBuilds, saveBuild: saveBuild, updateBuild: updateBuild, deleteBuild: deleteBuild,
    listInventory: listInventory, addInventoryItem: addInventoryItem,
    setInventoryQty: setInventoryQty, removeInventoryItem: removeInventoryItem,
    hasServiceLog: hasServiceLog, listServiceEvents: listServiceEvents,
    addServiceEvent: addServiceEvent, deleteServiceEvent: deleteServiceEvent,
    hasProfiles: hasProfiles, getMyProfile: getMyProfile, getProfilesByIds: getProfilesByIds,
    getProfileById: getProfileById, hasRichProfiles: hasRichProfiles,
    hasRichProfiles2: hasRichProfiles2, uploadAvatar: uploadAvatar,
    updateMyProfileFields: updateMyProfileFields,
    findProfileByNorm: findProfileByNorm, listReservedHeld: listReservedHeld,
    upsertMyProfile: upsertMyProfile
  };
}
