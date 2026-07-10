/* TrailBuilder — forum layer: threads + replies over Supabase (Phase 4).
 *
 * Plain browser globals (like src/account.js), loaded via a classic <script>.
 * Load order (see index.html): src/vendor/supabase.min.js -> src/config.js ->
 * src/account.js -> src/forum.js -> src/compat.js. Reuses account.js's `_sb`
 * client rather than opening a second connection — no separate auth path.
 *
 * All data functions are async (return Promises) and THROW on a Supabase
 * error so callers can try/catch; reads return the row array/object.
 * `author_id` is never sent from the client for writes — the DB column
 * defaults to auth.uid() and RLS enforces owner-only edit/delete (see
 * supabase/schema.sql). Reads are open to everyone (anon + authenticated).
 */

function forumReady(){
  return !!(typeof FORUM_ENABLED !== 'undefined' && FORUM_ENABLED && typeof _sb !== 'undefined' && _sb);
}
function _forumNeed(){ if(!forumReady()) throw new Error('The forum is not available.'); }
function _forumUnwrap(res){
  if(res && res.error){ throw new Error(res.error.message || String(res.error)); }
  return res ? res.data : null;
}

/* ---- categories (Phase 4b) -------------------------------------------------
 * The ONE committed category vocabulary, shared by the new-thread picker, the
 * thread-list filter chips and the per-thread labels (same committed-constant
 * pattern as REPORT_REPO / src/config.js). `key` is what forum_threads.category
 * stores — lowercase, stable, never renamed; label/desc are display-only and
 * safe to reword anytime without a migration. The riding-discipline entries
 * reuse the catalog's discipline vocab + emoji (xc/trail/enduro/dh — see
 * DISC_LABELS in index.html) so forum naming stays coherent with the catalog
 * chips. Deliberately NO buy/sell-marketplace category (moderation +
 * liability — an explicit non-goal, not an oversight).
 *
 * Unknown or missing values normalize to FORUM_DEFAULT_CATEGORY everywhere
 * (forumCategoryOf), so legacy pre-migration threads and stray hand-crafted
 * values both render as General and can never break the page.
 */
var FORUM_DEFAULT_CATEGORY = 'general';
var FORUM_CATEGORIES = [
  { key:'announcements',     label:'📣 Announcements',              desc:'Official TrailBuilder news, updates and release notes' },
  { key:'build-help',        label:'🧩 Build help & compatibility', desc:'Does X fit Y? Part choices and build advice' },
  { key:'bike-checks',       label:'🚵 Bike checks & builds',       desc:'Show off a finished build or share a build link for feedback' },
  { key:'suspension',        label:'🛠️ Suspension setup',           desc:'Sag, pressures, tokens, rebound — dialing in forks and shocks' },
  { key:'drivetrain-brakes', label:'⚙️ Drivetrain & brakes',        desc:'Shifting, bleeds, pads and rotors — setup and maintenance' },
  { key:'wheels-tires',      label:'🛞 Wheels & tires',             desc:'Tire choice, pressures, inserts, tubeless and rims' },
  { key:'xc',                label:'🐇 XC',                         desc:'Cross-country riding, bikes and racing' },
  { key:'trail',             label:'🌲 Trail',                      desc:'Trail riding and trail bikes' },
  { key:'enduro',            label:'⛰️ Enduro',                     desc:'Enduro riding, racing and bikes' },
  { key:'dh',                label:'⬇️ DH',                         desc:'Downhill riding, racing and bikes' },
  { key:'general',           label:'💬 General',                    desc:'Anything else — the default home for new threads' },
  { key:'site-feedback',     label:'🐞 Site feedback & bugs',       desc:'Bug reports, wrong or missing verdicts, data fixes and feature ideas' }
];
/* Vocab entry for a key, falling back to the General entry for anything unknown. */
function forumCategory(key){
  var i, fallback = null;
  for(i=0;i<FORUM_CATEGORIES.length;i++){
    if(FORUM_CATEGORIES[i].key === key) return FORUM_CATEGORIES[i];
    if(FORUM_CATEGORIES[i].key === FORUM_DEFAULT_CATEGORY) fallback = FORUM_CATEGORIES[i];
  }
  return fallback || { key: FORUM_DEFAULT_CATEGORY, label: FORUM_DEFAULT_CATEGORY, desc: '' };
}
/* Normalized category key of a thread row: unknown/missing -> the default. */
function forumCategoryOf(row){
  return forumCategory(row && row.category ? row.category : FORUM_DEFAULT_CATEGORY).key;
}

/* Feature-detect the category column, so this UI is safe to deploy BEFORE the
 * schema.sql migration has run against the live project (supabase/SETUP.md §8
 * says SQL-first, but nothing breaks in either order): probe with a 1-row
 * select of just the column — an error (undefined column) means pre-migration
 * and ALL category UI stays hidden, keeping the forum exactly as it was.
 * A positive answer is cached for the session; a negative one is re-probed on
 * the next call, so the UI self-heals the moment the owner runs the migration
 * (no redeploy or reload needed). */
var _forumCatsProbe = null;   // cached in-flight/positive Promise<boolean>, or null
function forumHasCategories(){
  if(!forumReady()) return Promise.resolve(false);
  if(_forumCatsProbe) return _forumCatsProbe;
  _forumCatsProbe = _sb.from('forum_threads').select('category').limit(1)
    .then(function(res){ return !(res && res.error); },
          function(){ return false; })
    .then(function(on){ if(!on){ _forumCatsProbe = null; } return on; });
  return _forumCatsProbe;
}

/* ---- threads -------------------------------------------------------------- */
function listThreads(){
  _forumNeed();
  return _sb.from('forum_threads').select('*')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .then(_forumUnwrap);
}
function getThread(id){
  _forumNeed();
  return _sb.from('forum_threads').select('*').eq('id', id).single().then(_forumUnwrap);
}
function createThread(title, body, category){
  _forumNeed();
  var row = { title: title, body: body };
  // Only sent when the caller knows the column exists (forumHasCategories) —
  // a pre-migration database would reject any insert that names the column.
  if(category){ row.category = category; }
  return _sb.from('forum_threads').insert(row).select().then(_forumUnwrap);
}

/* ---- replies --------------------------------------------------------------- */
function listPosts(threadId){
  _forumNeed();
  return _sb.from('forum_posts').select('*').eq('thread_id', threadId)
    .order('created_at', { ascending: true }).then(_forumUnwrap);
}
function createPost(threadId, body){
  _forumNeed();
  return _sb.from('forum_posts').insert({ thread_id: threadId, body: body }).select().then(_forumUnwrap);
}

/* Node/CommonJS export guard (parity with account.js) — lets a future test
   require the pure bits without a browser. Browser ignores this. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    forumReady: forumReady,
    FORUM_CATEGORIES: FORUM_CATEGORIES, FORUM_DEFAULT_CATEGORY: FORUM_DEFAULT_CATEGORY,
    forumCategory: forumCategory, forumCategoryOf: forumCategoryOf,
    forumHasCategories: forumHasCategories,
    listThreads: listThreads, getThread: getThread, createThread: createThread,
    listPosts: listPosts, createPost: createPost
  };
}
