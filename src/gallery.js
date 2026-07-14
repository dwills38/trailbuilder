/* BuildMyMTB — public Builds Gallery layer: publish + browse over Supabase.
 *
 * Plain browser globals (like src/account.js / src/forum.js), loaded via a
 * classic <script>. Load order (see index.html): … -> src/compat.js ->
 * src/gallery.js. It is loaded AFTER compat.js so the pure helpers below can
 * read the engine primitives as globals in the browser; in Node (tests) they
 * come from require('./compat.js') instead (the dual-resolve just under here).
 * Reuses account.js's `_sb` client — no second connection, same auth.
 *
 * SPLIT of responsibilities:
 *   - PURE helpers (gallerySnapshot / galleryGate / galleryDenorm / …) build the
 *     publish snapshot + gate + denormalized hints from the catalog engine. No
 *     network, no DOM — unit-tested headless in test/test-gallery.js.
 *   - DATA-ACCESS functions (publishGalleryBuild / listGalleryBuilds / …) are
 *     thin async Supabase wrappers that THROW on error. `author_id` is NEVER
 *     sent for writes — the DB column defaults to auth.uid() and RLS enforces
 *     owner-only edit/delete (see supabase/gallery-builds.sql). Reads are open
 *     to everyone (anon + authenticated).
 */

/* Engine primitives: required from the compat module in Node (tests), read as
   globals in the browser (compat.js is a classic <script> loaded before this).
   The else-branch object literal is only ever EVALUATED in the browser, so its
   references to the compat globals never run under Node. */
var _GC = (typeof module !== 'undefined' && module.exports)
  ? require('./compat.js')
  : {
      sanitizeShare: sanitizeShare, buildTotals: buildTotals, checkBuild: checkBuild,
      slotRequired: slotRequired, byId: byId, SLOTS: SLOTS, WHEEL_CONFIG: WHEEL_CONFIG,
      effectiveWheel: effectiveWheel, wheelPositionFilled: wheelPositionFilled
    };

/* ==========================================================================
   PURE HELPERS (no network, no DOM) — the publish snapshot + gate.
   ========================================================================== */

/* Resolve a raw {slotKey:id} build + {groupKey:id} presetBy the same way the
   app does: sanitizeShare (canonicalId migration + slot-category guard + the
   preset-belongs-to-its-group guard), then map ids to part objects for the
   engine. Returns { res: {slotKey:part}, clean: {build, presetBy} }. */
function galleryResolve(build, presetBy){
  var clean = _GC.sanitizeShare(build || {}, presetBy || {});
  var res = {};
  Object.keys(clean.build).forEach(function(k){ res[k] = _GC.byId(clean.build[k]); });
  return { res: res, clean: clean };
}

/* Is this resolved build COMPLETE per slotRequired? Mirrors the builder's own
   completeness calc (index.html): every slot required for the chosen frame (and
   the effective rear wheel — an integrated-cassette wheel exempts the cassette
   slot) must be filled, counting the hub+rim alternate path via
   wheelPositionFilled. DJ single-speed frames drop shifter/derailleur/cassette/
   dropper + ALL brake slots (brakeless is a valid complete build), so a DJ
   brakeless build is complete here exactly as the engine intends. */
function galleryComplete(res){
  var eRW = _GC.effectiveWheel(res, 'rear');
  var required = _GC.SLOTS.filter(function(s){ return _GC.slotRequired(s, res.frame, eRW); });
  return required.every(function(s){ return _GC.wheelPositionFilled(res, s.key); });
}

/* The publish gate: complete AND zero checkBuild errors. Warnings are allowed
   (and returned so the UI can show them honestly on the public page). */
function galleryGate(res){
  var v = _GC.checkBuild(res);
  var complete = galleryComplete(res);
  return {
    complete: complete,
    errors: v.errors.length,
    warnings: v.warnings,
    ok: complete && v.errors.length === 0
  };
}

/* The wheel-size of one side of a resolved build (front: fork/wheel/tire; rear:
   wheel/tire), or null. */
function _gallerySideSize(res, side){
  var list = side === 'front'
    ? [res.fork, _GC.effectiveWheel(res, 'front'), res.frontTire]
    : [_GC.effectiveWheel(res, 'rear'), res.rearTire];
  for(var i = 0; i < list.length; i++){ if(list[i] && list[i].wheel) return list[i].wheel; }
  return null;
}

/* The build's wheel-config key ('29' / '275' / 'mullet' / …) matched against
   WHEEL_CONFIG, or null when a side is unknown or the pair matches nothing.
   Display/filter hint only — the engine still owns the real fit verdict. */
function galleryWheelConfig(res){
  var f = _gallerySideSize(res, 'front'), r = _gallerySideSize(res, 'rear');
  if(!f || !r) return null;
  var keys = Object.keys(_GC.WHEEL_CONFIG);
  for(var i = 0; i < keys.length; i++){
    var c = _GC.WHEEL_CONFIG[keys[i]];
    if(c && c.front === f && c.rear === r) return keys[i];
  }
  return null;
}

/* The build's representative discipline (its frame's first discipline tag), or
   null. Annotation/filter only — NEVER a fit input, same firewall as the
   catalog's `disciplines` field. */
function galleryDiscipline(res){
  var d = res.frame && res.frame.disciplines;
  return (d && d.length) ? d[0] : null;
}

/* The denormalized SORT/FILTER hints stored at publish time. Truth is always
   recomputed live from `data` on the detail page — these are display/sort
   shortcuts, never authoritative (see the SQL security note). */
function galleryDenorm(res, presetBy){
  var t = _GC.buildTotals(res, presetBy || {});
  return {
    total_price: t.price,
    total_weight: t.weight,
    discipline: galleryDiscipline(res),
    wheel_config: galleryWheelConfig(res)
  };
}

/* Build the full publish snapshot from the app's live {slotKey:id} build +
   {groupKey:id} presetBy. Returns everything the publish path needs:
     { data:{b,p}, gate:{complete,errors,warnings,ok},
       total_price, total_weight, discipline, wheel_config }
   `data` is the sanitized {b,p} payload — the SAME shape as share links / saved
   builds — captured as a snapshot (a value, not a live reference to a mutable
   garage row). */
function gallerySnapshot(build, presetBy){
  var rr = galleryResolve(build, presetBy);
  var gate = galleryGate(rr.res);
  var denorm = galleryDenorm(rr.res, rr.clean.presetBy);
  return {
    data: { b: rr.clean.build, p: rr.clean.presetBy },
    gate: gate,
    total_price: denorm.total_price,
    total_weight: denorm.total_weight,
    discipline: denorm.discipline,
    wheel_config: denorm.wheel_config
  };
}

/* ==========================================================================
   DATA ACCESS (Supabase) — async, throws on error.
   ========================================================================== */

/* Gallery is available when accounts are configured (it shares the auth/client).
   The feature-detect probe below additionally gates the UI on the migration
   having run, so the app is safe to deploy before it. */
function galleryReady(){
  return !!(typeof _sb !== 'undefined' && _sb);
}
function _galleryNeed(){ if(!galleryReady()) throw new Error('The gallery is not available.'); }
function _galleryUnwrap(res){
  if(res && res.error){ throw new Error(res.error.message || String(res.error)); }
  return res ? res.data : null;
}

/* Feature-detect the gallery_builds table — same probe-and-cache pattern as
   hasProfiles / forumHasCategories: a 1-row select of `id`. An error (missing
   table) means pre-migration and ALL gallery UI stays hidden. Positive answer
   cached for the session; negative re-probed so it self-heals once the owner
   runs supabase/gallery-builds.sql. */
var _galleryProbe = null;
function hasGallery(){
  if(!galleryReady()) return Promise.resolve(false);
  if(_galleryProbe) return _galleryProbe;
  _galleryProbe = _sb.from('gallery_builds').select('id').limit(1)
    .then(function(res){ return !(res && res.error); },
          function(){ return false; })
    .then(function(on){ if(!on){ _galleryProbe = null; } return on; });
  return _galleryProbe;
}

/* Publish a build. Only the whitelisted, non-privileged fields are sent;
   author_id is NEVER sent (DB-defaulted to auth.uid(), RLS-scoped). `fields`:
   { title, story, data, total_price, total_weight, discipline, wheel_config,
     source_build_id } — from gallerySnapshot() + the publish dialog. */
function publishGalleryBuild(fields){
  _galleryNeed();
  fields = fields || {};
  var row = {
    title: fields.title,
    story: fields.story || null,
    data: fields.data,
    total_price: (typeof fields.total_price === 'number') ? fields.total_price : null,
    total_weight: (typeof fields.total_weight === 'number') ? fields.total_weight : null,
    discipline: fields.discipline || null,
    wheel_config: fields.wheel_config || null,
    source_build_id: fields.source_build_id || null
  };
  return _sb.from('gallery_builds').insert(row).select().then(_galleryUnwrap);
}

/* Browse the gallery. Newest first (recency — NEVER any monetization signal,
   scope §6). Optional filters: { discipline, wheel_config, priceMin, priceMax,
   limit }. */
function listGalleryBuilds(opts){
  _galleryNeed();
  opts = opts || {};
  var q = _sb.from('gallery_builds')
    .select('id,author_id,title,total_price,total_weight,discipline,wheel_config,data,created_at')
    .order('created_at', { ascending: false })
    .limit(opts.limit || 60);
  if(opts.discipline)   q = q.eq('discipline', opts.discipline);
  if(opts.wheel_config) q = q.eq('wheel_config', opts.wheel_config);
  if(typeof opts.priceMin === 'number') q = q.gte('total_price', opts.priceMin);
  if(typeof opts.priceMax === 'number') q = q.lte('total_price', opts.priceMax);
  return q.then(_galleryUnwrap);
}

/* One published build by id (the public detail page). maybeSingle so a deleted/
   unknown id resolves to null (the client renders "not found" / 404) rather
   than throwing. */
function getGalleryBuild(id){
  _galleryNeed();
  if(!id) return Promise.resolve(null);
  return _sb.from('gallery_builds').select('*').eq('id', id).maybeSingle().then(_galleryUnwrap);
}

/* Edit a published build's title/story (owner or admin — RLS decides). Only
   those two fields are ever sent. */
function updateGalleryBuildMeta(id, patch){
  _galleryNeed();
  var clean = {};
  if(patch && 'title' in patch) clean.title = patch.title;
  if(patch && 'story' in patch) clean.story = patch.story;
  return _sb.from('gallery_builds').update(clean).eq('id', id).select().then(_galleryUnwrap);
}

/* Unpublish = hard delete (scope §8 #5). Authorized entirely by RLS (author or
   admin); the client sends only the id, the DB decides. */
function deleteGalleryBuild(id){
  _galleryNeed();
  return _sb.from('gallery_builds').delete().eq('id', id).then(_galleryUnwrap);
}

/* My own published builds (for a "manage / unpublish" list). RLS still lets me
   read everyone's, but this filters to mine. */
function listMyGalleryBuilds(userId){
  _galleryNeed();
  if(!userId) return Promise.resolve([]);
  return _sb.from('gallery_builds')
    .select('id,title,total_price,total_weight,discipline,wheel_config,created_at')
    .eq('author_id', userId)
    .order('created_at', { ascending: false }).then(_galleryUnwrap);
}

/* Node/CommonJS export guard (parity with account.js / forum.js) — the browser
   ignores it. Exports the PURE helpers (unit-tested) plus the data-access API. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // pure
    galleryResolve: galleryResolve, galleryComplete: galleryComplete,
    galleryGate: galleryGate, galleryWheelConfig: galleryWheelConfig,
    galleryDiscipline: galleryDiscipline, galleryDenorm: galleryDenorm,
    gallerySnapshot: gallerySnapshot,
    // data access
    galleryReady: galleryReady, hasGallery: hasGallery,
    publishGalleryBuild: publishGalleryBuild, listGalleryBuilds: listGalleryBuilds,
    getGalleryBuild: getGalleryBuild, updateGalleryBuildMeta: updateGalleryBuildMeta,
    deleteGalleryBuild: deleteGalleryBuild, listMyGalleryBuilds: listMyGalleryBuilds
  };
}
