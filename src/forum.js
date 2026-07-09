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
function createThread(title, body){
  _forumNeed();
  return _sb.from('forum_threads').insert({ title: title, body: body }).select().then(_forumUnwrap);
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
    listThreads: listThreads, getThread: getThread, createThread: createThread,
    listPosts: listPosts, createPost: createPost
  };
}
