/* ==========================================================================
   upgrade.js — Upgrade Advisor ("does this part fit MY bike?") pure logic.

   The engine already answers the used-parts shopper's question — compatOf
   against a filled build — but only through the build-from-scratch entry
   path. This module holds the flipped path's PURE pieces so they are unit-
   testable in Node (docs/PRODUCT-IDEAS-2026-07-19.md §1; committed feature
   slate, docs/MISSION.md):

   - upgradeCheck(): the full swap-aware diff behind the part modal's
     "On your bike" block. Same swap semantics as compat.js's placementDiff
     (the tested slot + its mutex partners are CLEARED from the baseline
     before diffing, so a candidate fork is judged as the build WITH that
     fork swapped in — never against the fork it replaces), and the same
     verdictKey identity (never message text — two different conflicts can
     raise byte-identical strings, REVIEW.md #4/#13). On top of the
     compatOf-compatible state/reason it returns what compatOf deliberately
     doesn't: the placement slot, every displaced part, ALL new errors and
     warnings (not just the first), and which of the build's CURRENT
     conflicts the swap would clear. test/test-upgrade.js pins that the
     state can never disagree with compatOf's dot.

   - the #upgrade hash codec (parseUpgradeHash / upgradeHashOf /
     encodeBuildPayload / decodeBuildPayload): the mode + baseline live in
     the hash (NAV-15/16 conventions) so an upgrade check is shareable like
     a build. '#upgrade' = mode on, no baseline yet; '#upgrade/bike/<id>' =
     a pristine catalog complete bike; '#upgrade/b=<payload>' = an arbitrary
     baseline in EXACTLY the '#b=' share-link payload grammar (same
     sanitizeShare guards on decode — a crafted link can't inject a tire
     into the fork slot here either).

   NOTHING here feeds or alters checkBuild — this file only calls the
   engine. Deps (checkBuild, verdictKey, byId, SLOTS, altSlotsOf,
   sanitizeShare, canonicalId) are dependency-injected like src/facets.js,
   so there is no load-order coupling and Node tests can pass compat.js's
   real exports. ========================================================================== */

/** @typedef {import('./types.js').Part} Part */
/** @typedef {import('./types.js').Build} Build */
/** @typedef {import('./types.js').Verdict} Verdict */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').CompatResult} CompatResult */

/**
 * @typedef {Object} UpgradeDeps
 * @property {function(Build):CompatResult} checkBuild
 * @property {function(Verdict):string} verdictKey
 * @property {function((string|null|undefined)):(Part|null)} byId
 * @property {Slot[]} SLOTS
 * @property {function(string):string[]} altSlotsOf
 */

/**
 * The full swap-aware answer for one candidate against one baseline build.
 * `state`/`reason` are contractually identical to compatOf's dot (pinned in
 * test/test-upgrade.js); the rest is the detail the flipped view surfaces.
 * @typedef {Object} UpgradeVerdict
 * @property {'g'|'w'|'r'|'n'} state
 * @property {string} reason
 * @property {string|null} slotKey   the placement judged (null: preset/kit — fills several)
 * @property {Part[]} displaced      parts that would leave the build (slot + mutex partners)
 * @property {Verdict[]} newErrors   every error the swap introduces
 * @property {Verdict[]} newWarnings every warning the swap introduces
 * @property {Verdict[]} resolvesErrors   current-build errors the swap clears
 * @property {Verdict[]} resolvesWarnings current-build warnings the swap clears
 */

/* Exact compatOf wording, reused so the flipped view can never drift from the
   dot's honesty framing ("No conflicts found", never "all compatible"). */
var UPGRADE_GREEN_REASON = 'No conflicts with your current build (among the dimensions we check - some makers publish no spec data)';
var UPGRADE_EMPTY_REASON = 'Pick some parts first to check fit';

/** Slot keys a category can occupy, derived from SLOTS (mirrors compat.js's
 * internal _catSlots). @param {string} cat @param {Slot[]} SLOTS @returns {string[]} */
function upgradeSlotsFor(cat, SLOTS){
  return SLOTS.filter(function(s){ return s.cat === cat; }).map(function(s){ return s.key; });
}

/** Mutex partners setSlot() would clear for this placement (mirrors compat.js's
 * internal _mutexOf: hub/rim wheel alternates + the dropper/rigid-seatpost
 * exclusion) — cleared from the baseline so the diff judges the post-click
 * build, exactly like placementDiff. @param {string} slotKey @param {UpgradeDeps} deps @returns {string[]} */
function upgradePartnersOf(slotKey, deps){
  var s = null;
  for(var i = 0; i < deps.SLOTS.length; i++){ if(deps.SLOTS[i].key === slotKey){ s = deps.SLOTS[i]; break; } }
  if(!s) return [];
  return (s.altOf ? [s.altOf] : deps.altSlotsOf(slotKey)).concat(s.excludes || []);
}

/** @param {Verdict[]} list @param {function(Verdict):string} keyFn @returns {Object.<string, boolean>} */
function _keySet(list, keyFn){
  /** @type {Object.<string, boolean>} */ var o = {};
  list.forEach(function(v){ o[keyFn(v)] = true; });
  return o;
}
/** @param {Verdict[]} after @param {Object.<string, boolean>} beforeKeys @param {function(Verdict):string} keyFn @returns {Verdict[]} */
function _newOnes(after, beforeKeys, keyFn){
  return after.filter(function(v){ return !beforeKeys[keyFn(v)]; });
}

/**
 * Diff one concrete placement (part into slotKey) against the baseline —
 * the swap-vs-add core: the slot under test and its mutex partners are
 * removed from the baseline first, so the candidate is judged as the build
 * that would exist AFTER the click, never alongside the part it replaces.
 * @param {Part} part @param {string} slotKey @param {Build} build @param {UpgradeDeps} deps
 * @returns {{newErrors: Verdict[], newWarnings: Verdict[], after: CompatResult}}
 */
function upgradePlacementDiff(part, slotKey, build, deps){
  /** @type {Build} */ var base = {};
  Object.keys(build).forEach(function(k){ base[k] = build[k]; });
  delete base[slotKey];
  upgradePartnersOf(slotKey, deps).forEach(function(k){ delete base[k]; });
  var before = deps.checkBuild(base);
  /** @type {Build} */ var test = {};
  Object.keys(base).forEach(function(k){ test[k] = base[k]; });
  test[slotKey] = part;
  var after = deps.checkBuild(test);
  return {
    newErrors:   _newOnes(after.errors,   _keySet(before.errors,   deps.verdictKey), deps.verdictKey),
    newWarnings: _newOnes(after.warnings, _keySet(before.warnings, deps.verdictKey), deps.verdictKey),
    after: after
  };
}

/**
 * The Upgrade Advisor's headline computation: judge a candidate part (or
 * preset kit) against a baseline build, swap-aware, and report the whole
 * story. Placement ranking matches compatOf exactly (first no-new-verdict
 * slot wins green; else the first warning-only slot; else the first slot in
 * order) so this can never disagree with the card dot. Returns null for a
 * row that is neither slot-placeable nor a fills-preset (e.g. a completebike
 * — that's a baseline, not a candidate).
 * @param {Part} part @param {Build} build @param {UpgradeDeps} deps
 * @returns {UpgradeVerdict|null}
 */
function upgradeCheck(part, build, deps){
  /** @type {Build} */ var bld = build || {};
  /** @param {'g'|'w'|'r'|'n'} state @param {string} reason @returns {UpgradeVerdict} */
  function empty(state, reason){
    return { state: state, reason: reason, slotKey: null, displaced: [],
             newErrors: [], newWarnings: [], resolvesErrors: [], resolvesWarnings: [] };
  }
  if(Object.keys(bld).length === 0) return empty('n', UPGRADE_EMPTY_REASON);

  var current = deps.checkBuild(bld);   // the build as it sits — the "resolves" reference

  /** @param {CompatResult} after @returns {{resolvesErrors: Verdict[], resolvesWarnings: Verdict[]}} */
  function resolvesVs(after){
    return {
      resolvesErrors:   _newOnes(current.errors,   _keySet(after.errors,   deps.verdictKey), deps.verdictKey),
      resolvesWarnings: _newOnes(current.warnings, _keySet(after.warnings, deps.verdictKey), deps.verdictKey)
    };
  }

  // Preset kit (groupset/wheelset/brakeset/cockpitset — and completebike, which
  // the UI never offers as a candidate): clear every filled slot, then apply
  // the fills — the same baseline convention as compatOf's preset branch.
  if('fills' in part && part.fills){
    var pf = part.fills;
    /** @type {Build} */ var base = {};
    Object.keys(bld).forEach(function(k){ base[k] = bld[k]; });
    /** @type {Part[]} */ var displaced = [];
    Object.keys(pf).forEach(function(s){
      var old = bld[s];
      if(old && old.id !== pf[s]) displaced.push(old);
      delete base[s];
    });
    var beforeP = deps.checkBuild(base);
    /** @type {Build} */ var testP = {};
    Object.keys(base).forEach(function(k){ testP[k] = base[k]; });
    Object.keys(pf).forEach(function(s){
      var fp = deps.byId(pf[s]);
      if(fp) testP[s] = fp;
    });
    var afterP = deps.checkBuild(testP);
    var newE = _newOnes(afterP.errors,   _keySet(beforeP.errors,   deps.verdictKey), deps.verdictKey);
    var newW = _newOnes(afterP.warnings, _keySet(beforeP.warnings, deps.verdictKey), deps.verdictKey);
    var resP = resolvesVs(afterP);
    return {
      state: newE.length ? 'r' : newW.length ? 'w' : 'g',
      reason: newE.length ? String(newE[0]) : newW.length ? String(newW[0]) : UPGRADE_GREEN_REASON,
      slotKey: null, displaced: displaced, newErrors: newE, newWarnings: newW,
      resolvesErrors: resP.resolvesErrors, resolvesWarnings: resP.resolvesWarnings
    };
  }

  var slots = upgradeSlotsFor(part.cat, deps.SLOTS);
  if(!slots.length) return null;   // not a slot-fillable candidate (completebike without fills, etc.)

  /** @param {string} slotKey @param {{newErrors: Verdict[], newWarnings: Verdict[], after: CompatResult}} d @returns {UpgradeVerdict} */
  function finish(slotKey, d){
    /** @type {Part[]} */ var disp = [];
    var old = bld[slotKey];
    if(old && old.id !== part.id) disp.push(old);
    upgradePartnersOf(slotKey, deps).forEach(function(k){ if(bld[k]) disp.push(/** @type {Part} */(bld[k])); });
    var res = resolvesVs(d.after);
    return {
      state: d.newErrors.length ? 'r' : d.newWarnings.length ? 'w' : 'g',
      reason: d.newErrors.length ? String(d.newErrors[0]) : d.newWarnings.length ? String(d.newWarnings[0]) : UPGRADE_GREEN_REASON,
      slotKey: slotKey, displaced: disp, newErrors: d.newErrors, newWarnings: d.newWarnings,
      resolvesErrors: res.resolvesErrors, resolvesWarnings: res.resolvesWarnings
    };
  }

  /** @type {{slotKey: string, d: {newErrors: Verdict[], newWarnings: Verdict[], after: CompatResult}}|null} */
  var firstWarn = null;
  /** @type {{slotKey: string, d: {newErrors: Verdict[], newWarnings: Verdict[], after: CompatResult}}|null} */
  var firstErr = null;
  for(var i = 0; i < slots.length; i++){
    var d = upgradePlacementDiff(part, slots[i], bld, deps);
    if(!d.newErrors.length && !d.newWarnings.length) return finish(slots[i], d);   // green: same early-return as compatOf
    if(!d.newErrors.length){ if(!firstWarn) firstWarn = { slotKey: slots[i], d: d }; }
    else if(!firstErr){ firstErr = { slotKey: slots[i], d: d }; }
  }
  // A warning-only placement outranks one that errors (compatOf's multi-slot rule).
  if(firstWarn) return finish(firstWarn.slotKey, firstWarn.d);
  if(firstErr) return finish(firstErr.slotKey, firstErr.d);
  return null;   // unreachable: every judged slot lands in one bucket
}

/* =============================================================================
   #upgrade HASH CODEC — the mode + baseline as a shareable URL (NAV-15/16).
   ========================================================================== */

/** A baseline reference for hashing: 'pick' = mode on, nothing chosen yet;
 * 'bike' = a pristine catalog complete bike by id; 'build' = an arbitrary
 * baseline carried as the '#b=' share payload ({b,p} id maps).
 * @typedef {{kind:'pick'}|{kind:'bike', id:string}|{kind:'build', b:Object.<string,string>, p:Object.<string,string>}} UpgradeBaselineRef */

/** Encode a build (slotKey -> part id) + presetBy exactly like writeHash's
 * '#b=' payload. @param {Object.<string,string>} [build] @param {Object.<string,string>} [presetBy] @returns {string} */
function encodeBuildPayload(build, presetBy){
  return btoa(encodeURIComponent(JSON.stringify({ b: build || {}, p: presetBy || {} })));
}

/** Decode a '#b='-grammar payload from a full share link, a bare hash, or a
 * raw 'b=…' string — through the SAME sanitizeShare guards as readHash
 * (canonicalId resolution, slot-category, preset-belongs-to-group), so a
 * crafted upgrade link is exactly as harmless as a crafted share link.
 * Returns null when nothing loadable survives (malformed, empty, foreign).
 * @param {string|null|undefined} str
 * @param {function(*, *):{build: Object.<string,string>, presetBy: Object.<string,string>}} sanitizeShare
 * @returns {{build: Object.<string,string>, presetBy: Object.<string,string>}|null} */
function decodeBuildPayload(str, sanitizeShare){
  var m = String(str || '').match(/b=([^&]+)/);
  if(!m) return null;
  try{
    var o = JSON.parse(decodeURIComponent(atob(m[1])));
    var clean = sanitizeShare((o && o.b) ? o.b : o, (o && o.p) ? o.p : {});
    if(!Object.keys(clean.build).length) return null;
    return clean;
  }catch(e){ return null; }
}

/** The hash for a baseline ref (inverse of parseUpgradeHash).
 * @param {UpgradeBaselineRef|null|undefined} ref @returns {string} */
function upgradeHashOf(ref){
  if(ref && ref.kind === 'bike') return '#upgrade/bike/' + encodeURIComponent(ref.id);
  if(ref && ref.kind === 'build') return '#upgrade/b=' + encodeBuildPayload(ref.b, ref.p);
  return '#upgrade';
}

/** Parse a location.hash into an upgrade route, or null when the hash isn't
 * ours (the caller falls through to the ordinary router). Malformed input
 * under the '#upgrade' prefix degrades to {kind:'pick'} — mode on, baseline
 * picker showing — never a crash and never a half-applied baseline. The
 * 'build' kind returns the RAW payload; the caller decodes it with
 * decodeBuildPayload (which needs the injected sanitizer).
 * @param {string|null|undefined} hash
 * @returns {{kind:'pick'}|{kind:'bike', id:string}|{kind:'build', payload:string}|null} */
function parseUpgradeHash(hash){
  hash = hash || '';
  if(hash !== '#upgrade' && hash.indexOf('#upgrade/') !== 0) return null;
  var rest = hash === '#upgrade' ? '' : hash.slice('#upgrade/'.length);
  if(!rest) return { kind: 'pick' };
  if(rest.indexOf('bike/') === 0){
    var id = null;
    try{ id = decodeURIComponent(rest.slice(5)); }catch(e){ id = null; }
    return id ? { kind: 'bike', id: id } : { kind: 'pick' };
  }
  if(rest.indexOf('b=') === 0) return { kind: 'build', payload: rest };
  return { kind: 'pick' };
}

/** Resolve a '#upgrade/bike/<id>' id to its catalog complete bike — through
 * canonicalId (append-only ids: a retired id keeps resolving), and category-
 * guarded so a crafted link naming a non-bike id is rejected, not applied.
 * @param {string|null|undefined} id
 * @param {{byId: function((string|null|undefined)):(Part|null), canonicalId: function((string|null|undefined)):(string|null|undefined)}} deps
 * @returns {Part|null} */
function resolveUpgradeBike(id, deps){
  if(!id) return null;
  var p = deps.byId(deps.canonicalId(id));
  return (p && p.cat === 'completebike' && 'fills' in p && p.fills) ? p : null;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { upgradeCheck: upgradeCheck, upgradeSlotsFor: upgradeSlotsFor,
    upgradePartnersOf: upgradePartnersOf, upgradePlacementDiff: upgradePlacementDiff,
    encodeBuildPayload: encodeBuildPayload, decodeBuildPayload: decodeBuildPayload,
    upgradeHashOf: upgradeHashOf, parseUpgradeHash: parseUpgradeHash,
    resolveUpgradeBike: resolveUpgradeBike,
    UPGRADE_GREEN_REASON: UPGRADE_GREEN_REASON, UPGRADE_EMPTY_REASON: UPGRADE_EMPTY_REASON };
}
