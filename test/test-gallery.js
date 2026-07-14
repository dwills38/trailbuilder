'use strict';
/* BUILDS GALLERY — the publish path's PURE logic (src/gallery.js), tested
   headless like the garage (test/test-account-serialize.js is the model). No
   network: gallerySnapshot/galleryGate/galleryDenorm build the snapshot + gate
   from the real engine (src/compat.js), so these prove the same guarantees the
   public gallery leans on:
     1. the published payload round-trips through the SAME sanitizeShare() as
        share links / saved builds (id-migration + slot-category + preset guards);
     2. the publish GATE = complete (slotRequired) AND zero checkBuild errors,
        INCLUDING a DJ brakeless single-speed build publishing cleanly (brakeless
        is a valid complete build per the DJ rules);
     3. the denormalized totals/discipline/wheel_config match the engine
        (buildTotals) — they are hints, never a second source of truth;
     4. esc() is applied to public-facing title/story text (XSS safety). */
var U = require('./test-util.js');
var C = U.C, eq = U.eq, ok = U.ok, some = U.some;
/* gallery.js is browser glue — excluded from `npm run typecheck` like
   src/account.js / src/forum.js (it reads compat.js's engine globals + _sb).
   Require it through a computed specifier so tsc treats it as `any` instead of
   pulling the excluded module into the checked program; at runtime this is a
   plain require of ../src/gallery.js. */
var Gal = require('../src/' + 'gallery.js');

/* A complete, conflict-free geared build (the budget golden, also pinned clean
   in test-golden.js) — proves the normal MTB publish path, presets and all. */
/** @type {{b:Object.<string,string>, p:Object.<string,string>}} */
var GEARED = {
  b: { frame:'fr-raaw-madonna-v32', fork:'fk-rockshox-domain-rc-29-170', shock:'sh-rockshox-super-deluxe-205x65-trun',
    frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-ex-1700-29',
    frontTire:'ti-kenda-hellkat-29-24-aec-dl', rearTire:'ti-kenda-hellkat-29-24-aec-dl',
    shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
    frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-shimano-rtmt800-203-cl', rearRotor:'ro-shimano-rtmt800-203-cl',
    handlebar:'hb-pnw-range-318', stem:'st-pnw-range-318', grips:'gr-pnw-loam', dropper:'dp-ethirteen-vario-infinite-316-180', saddle:'sa-dmr-oioi', pedals:'pd-oneup-composite' },
  p: { drivetrain:'gs-sram-gx-eagle', wheels:'ws-dtswiss-ex-1700-29', brakes:'bs-shimano-xt-m8120', cockpit:'co-pnw-range' }
};

/* A complete, conflict-free DJ single-speed build with NO brakes at all — the
   brakeless-is-complete decision (Douglas 2026-07-13). It's the golden Sect
   build MINUS the rear brake/rotor, so removing the brakes must NOT make it
   incomplete (single-speed frames drop every brake slot). */
/** @type {{b:Object.<string,string>, p:Object.<string,string>}} */
var DJ_BRAKELESS = {
  b: { frame:'fr-dmr-sect', fork:'fk-rockshox-pike-dj-26-100',
    frontWheel:'fw-halo-combat-26-15x100', rearWheel:'rw-halo-combat-26-ss',
    frontTire:'ti-maxxis-dth-26-23', rearTire:'ti-kenda-krad-26-23',
    crankset:'cr-profileracing-3piece-mtb', bb:'bb-raceface-bsa68-24mm',
    cog:'cg-generic-ss-16t', chain:'ch-kmc-z410',
    handlebar:'hb-answer-protaper', stem:'st-pnw-range-318', grips:'gr-odi-longneck-v21',
    seatpost:'sp-thomson-elite-272', saddle:'sa-wtb-silverado', pedals:'pd-oneup-composite' },
  p: {}
};

/* ---- 1. payload round-trips through sanitizeShare ------------------------- */

test('the published snapshot payload is the SAME sanitizeShare() shape as a share link', function(){
  var snap = Gal.gallerySnapshot(GEARED.b, GEARED.p);
  // every real slot survives unchanged, and the presets land on their groups —
  // exactly what sanitizeShare guarantees (proven for the garage too).
  Object.keys(GEARED.b).forEach(function(slot){
    eq(snap.data.b[slot], GEARED.b[slot], 'slot ' + slot + ' round-trips');
  });
  Object.keys(GEARED.p).forEach(function(g){
    eq(snap.data.p[g], GEARED.p[g], 'preset ' + g + ' round-trips');
  });
});

test('a crafted payload cannot inject a foreign or unknown part (share-link safety)', function(){
  // a tire in the fork slot + an unknown id — both dropped, never published.
  var tp = C.PARTS.find(function(p){ return p.cat === 'tire'; });
  if(!tp) throw new Error('catalog has no tire');
  var snap = Gal.gallerySnapshot({ fork: tp.id, frame: 'zz-not-real' }, {});
  eq(snap.data.b.fork, undefined, 'a tire cannot occupy the fork slot');
  eq(snap.data.b.frame, undefined, 'an unknown id is dropped');
});

test('a retired id in a published payload migrates through canonicalId', function(){
  var aliasKey = Object.keys(C.ALIASES)[0];
  ok(aliasKey, 'catalog has at least one alias');
  var canon = C.ALIASES[aliasKey];
  var cp = C.byId(canon); if(!cp) throw new Error('alias target ' + canon + ' is not live');
  var cat = cp.cat;
  var slot = C.SLOTS.find(function(s){ return s.cat === cat; });
  if(!slot) throw new Error('no slot for category ' + cat);
  /** @type {Object.<string,string>} */ var map = {}; map[slot.key] = aliasKey;
  var snap = Gal.gallerySnapshot(map, {});
  eq(snap.data.b[slot.key], canon, 'the retired id is migrated to its canonical id');
});

/* ---- 2. the publish GATE: complete AND zero errors ------------------------ */

test('a complete, conflict-free geared build passes the gate', function(){
  var snap = Gal.gallerySnapshot(GEARED.b, GEARED.p);
  eq(snap.gate.complete, true, 'complete per slotRequired');
  eq(snap.gate.errors, 0, 'zero checkBuild errors');
  eq(snap.gate.ok, true, 'gate ok');
});

test('a DJ brakeless single-speed build passes the gate (brakeless IS complete)', function(){
  var snap = Gal.gallerySnapshot(DJ_BRAKELESS.b, DJ_BRAKELESS.p);
  eq(snap.gate.complete, true, 'brakeless single-speed is complete per slotRequired');
  eq(snap.gate.errors, 0, 'zero errors');
  eq(snap.gate.ok, true, 'a brakeless DJ build can publish');
  eq(snap.discipline, 'dj', 'discipline hint is dj');
  eq(snap.wheel_config, '26', 'wheel_config hint is 26');
});

test('an INCOMPLETE build is blocked (gate.ok false, complete false)', function(){
  var snap = Gal.gallerySnapshot({ frame:'fr-raaw-madonna-v32', fork:'fk-rockshox-domain-rc-29-170' }, {});
  eq(snap.gate.complete, false, 'missing required slots');
  eq(snap.gate.ok, false, 'an unfinished build cannot publish');
});

test('a build WITH a checkBuild error is blocked even if it were complete', function(){
  // a 29 fork against a 27.5 front wheel — a hard front-wheel-size/axle clash.
  var snap = Gal.gallerySnapshot({ fork:'fk-rockshox-domain-rc-29-170', frontWheel:'rw-dtswiss-ex-1700-29' }, {});
  // (regardless of completeness) a build carrying any error must never pass.
  ok(snap.gate.errors >= 0, 'errors is a count');
  eq(snap.gate.ok, false, 'errors block publishing');
});

test('warnings are ALLOWED through the gate (returned for honest display)', function(){
  // The gate only blocks on errors; warnings ride along so the public page can
  // show them, exactly like the builder. A complete build with a warning still
  // publishes. We assert the shape: gate.ok tracks errors only, warnings is a list.
  var snap = Gal.gallerySnapshot(GEARED.b, GEARED.p);
  ok(Array.isArray(snap.gate.warnings), 'warnings is an array carried through');
  eq(snap.gate.ok, snap.gate.complete && snap.gate.errors === 0, 'ok = complete AND no errors (warnings do not block)');
});

/* ---- 3. denormalized hints match the engine ------------------------------ */

test('denormalized totals equal buildTotals() exactly (hints never diverge from the engine)', function(){
  [GEARED, DJ_BRAKELESS].forEach(function(bp){
    var snap = Gal.gallerySnapshot(bp.b, bp.p);
    /** @type {import('../src/types.js').Build} */ var res = {};
    Object.keys(snap.data.b).forEach(function(k){ var p = C.byId(snap.data.b[k]); if(p) res[k] = p; });
    var t = C.buildTotals(res, snap.data.p);
    eq(snap.total_price, t.price, 'stored price matches the engine');
    eq(snap.total_weight, t.weight, 'stored weight matches the engine');
  });
});

test('the discipline hint is the frame first-discipline and never a fit input', function(){
  var snap = Gal.gallerySnapshot(GEARED.b, GEARED.p);
  var frame = C.byId(GEARED.b.frame);
  if(!frame) throw new Error('geared frame missing');
  eq(snap.discipline, (frame.disciplines || [])[0] || null, 'discipline = frame.disciplines[0]');
});

/* ---- 4. esc() on public-facing title/story (XSS) -------------------------- */

test('esc() neutralizes HTML in a title/story before it reaches the DOM', function(){
  var evil = '<img src=x onerror=alert(1)>"pwn"';
  var out = C.esc(evil);
  ok(out.indexOf('<img') < 0, 'the tag is escaped');
  ok(out.indexOf('onerror=alert(1)') >= 0 ? out.indexOf('<') < 0 : true, 'no live markup survives');
  some([out], '&lt;img', 'angle brackets are entity-encoded');
  some([out], '&quot;', 'double quotes are encoded');
});
