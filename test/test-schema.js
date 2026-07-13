'use strict';
/* SCHEMA VALIDATOR — prove the validator actually BITES. A validator that never
   fails is worthless, so these feed it deliberately broken data and require it
   to complain. */
var U = require('./test-util.js');
var S = require('../src/schema.js');
var eq = U.eq, some = U.some;
var C = U.C;

var TODAY = new Date('2026-06-21T00:00:00Z');
var ctx = S._ctx(C, TODAY);
/** @param {*} part @returns {string[]} */
function probs(part){ return S.validatePart(part, ctx); }
// clone a real part and override some fields
/** @param {string} id @param {Object} [changes] @returns {*} */
function over(id, changes){ return Object.assign({}, C.byId(id), changes); }

test('a valid real part has no problems', function(){
  eq(probs(C.byId('fr-santacruz-megatower-cc')).length, 0);
});
test('missing required field is caught', function(){
  var p = over('fr-santacruz-megatower-cc'); delete p.wheelConfigs; some(probs(p), 'wheelConfigs');
});
test('bad enum value is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { wheelConfigs:['30'] })), 'wheelConfigs');
});
test('unknown / misspelled field is caught', function(){
  some(probs(over('rw-reserve-30-hd-29', { frehub:'XD' })), 'unknown field');
});
test('wrong type is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { seatTube:'big' })), 'seatTube');
});
test('dangling id reference is caught', function(){
  some(probs(over('fr-specialized-enduro-sworks', { bundledShock:'sh-nope' })), 'bundledShock');
});
test('shifter missing actuation is caught', function(){
  var p = over('sft-sram-gx-eagle'); delete p.actuation; some(probs(p), 'actuation');
});
test('actuation value outside the vocab is caught', function(){
  some(probs(over('dr-sram-gx-eagle-axs', { actuation:'hydraulic' })), 'actuation');
});
test('crankset missing ringStd is caught', function(){
  var p = over('cr-shimano-xt-m8100'); delete p.ringStd; some(probs(p), 'ringStd');
});
test('brake leverAccepts outside its own (narrower) vocab is caught', function(){
  some(probs(over('bk-sram-code-rsc', { leverAccepts:['band'] })), 'leverAccepts');
});
test('cassette with minCog >= maxCog is caught', function(){
  some(probs(over('ca-sram-xg1275', { minCog:52 })), 'minCog');
});
test('an HG cassette claiming a 10T cog is caught (HG floor is 11T)', function(){
  some(probs(over('ca-sram-pg1230', { minCog:10 })), 'HG');
});
test('the real SRAM XS-1270 (integrated 10T-on-HG design) is a valid allowlisted exception', function(){
  var p = over('ca-sram-xs1270');
  delete p.verified; delete p.lastChecked; delete p.source;
  eq(probs(p).length, 0, 'XS-1270 row should validate despite freehub:HG + minCog:10');
});
test('the HG-10T exception is scoped to the real mfgPn, not a blanket loosening', function(){
  some(probs(over('ca-sram-xs1270', { mfgPn:'CS-XS-9999-A1' })), 'HG');
});
test('a cassette claiming freehub integrated is caught (wheel/hub-side value only)', function(){
  // 'integrated' marks a wheel whose driver IS a built-in cassette (e*thirteen
  // LG1r DH) - a purchasable cassette row carrying it would be nonsense data.
  some(probs(over('ca-sram-xg1275', { freehub:'integrated' })), 'integrated');
});
test('a rear wheel with freehub integrated is valid data (e*thirteen LG1r DH)', function(){
  var p = over('rw-reserve-30-hd-29', { freehub:'integrated' });
  eq(probs(p).length, 0, 'integrated is a legal rearwheel freehub value');
});
test('an armset-only crank (ringStd:null, no ring) is valid data', function(){
  // Strip provenance fields: this test is about the ringStd:null/no-ring SHAPE,
  // not about whichever verification date the live row happens to carry (which
  // drifts as sessions verify parts with today's real date against the fixed TODAY above).
  var p = over('cr-canecreek-eewings-allmountain');
  delete p.verified; delete p.lastChecked; delete p.source; delete p.sourceType; delete p.weightSource;
  eq(probs(p).length, 0, 'eeWings row should validate');
});
test('a string chainline is caught (must be mm)', function(){
  some(probs(over('cr-sram-gx-eagle', { chainline:'Boost' })), 'chainline');
});
test('a frame without the suspension discriminator is caught', function(){
  var p = over('fr-santacruz-megatower-cc'); delete p.suspension; some(probs(p), 'suspension');
});
test('a full-suspension frame missing its shock block is caught', function(){
  var p = over('fr-santacruz-megatower-cc'); delete p.shockEye; some(probs(p), 'shockEye');
});
test('a hardtail carrying shock fields is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { suspension:'hardtail' })), 'must not carry');
});
test('a valid hardtail frame passes (hardtails are enterable now)', function(){
  var p = over('fr-santacruz-megatower-cc', { suspension:'hardtail' });
  delete p.shockEye; delete p.shockStroke; delete p.shockMount; delete p.travel; delete p.bundledShock;
  eq(probs(p).length, 0);
});
test('sram-dh-7 is valid system vocab (7-speed DH group enterable)', function(){
  var p = over('sft-sram-gx-eagle', { system:'sram-dh-7', speeds:7 });
  delete p.verified; delete p.lastChecked; delete p.source;   // provenance-date noise, same as the eeWings test
  eq(probs(p).length, 0);
});
test('a 20x110 dual-crown DH front axle is valid vocab (fork + front hub)', function(){
  var f = over('fk-rockshox-zeb-ultimate-29-170', { axle:'20x110' });
  delete f.verified; delete f.lastChecked; delete f.source;   // provenance-date noise, same as the sram-dh-7 test
  eq(probs(f).length, 0);
  eq(probs(over('fw-dtswiss-ex-1700-29', { hub:'20x110', verified:undefined, lastChecked:undefined, source:undefined })).filter(function(m){ return m.indexOf('hub')>=0; }).length, 0);
});
test('an unknown front axle value is still caught', function(){
  some(probs(over('fk-rockshox-zeb-ultimate-29-170', { axle:'20x100' })), 'axle');
});
test('20x110 Boost and 20x110 non-Boost are distinct valid values (never conflate)', function(){
  var f = over('fk-rockshox-zeb-ultimate-29-170', { axle:'20x110-nonboost' });
  delete f.verified; delete f.lastChecked; delete f.source;   // provenance-date noise, same as the sram-dh-7 test
  eq(probs(f).length, 0);
});
test('a valid fronthub/rearhub/rim part has no problems', function(){
  // Strip provenance fields: this test is about the fronthub/rearhub/rim SHAPE,
  // not whichever verification date these rows carry (which drifts as sessions
  // verify parts with today's real date against the fixed TODAY above) -
  // provenance-date noise, same as the eeWings/sram-dh-7 tests.
  var fh = over('fh-dtswiss-350-boost110');
  delete fh.verified; delete fh.lastChecked; delete fh.source; delete fh.sourceType; delete fh.weightSource;
  eq(probs(fh).length, 0);
  var rh = over('rh-dtswiss-350-boost148-xd');
  delete rh.verified; delete rh.lastChecked; delete rh.source; delete rh.sourceType; delete rh.weightSource;
  eq(probs(rh).length, 0);
  var rm = over('rm-dtswiss-ex511-29');
  delete rm.verified; delete rm.lastChecked; delete rm.source;
  eq(probs(rm).length, 0);
});
test('fronthub missing hub is caught', function(){
  var p = over('fh-dtswiss-350-boost110'); delete p.hub; some(probs(p), 'hub');
});
test('rearhub missing freehub is caught', function(){
  var p = over('rh-dtswiss-350-boost148-xd'); delete p.freehub; some(probs(p), 'freehub');
});
test('rearhub freehub value outside the vocab is caught', function(){
  some(probs(over('rh-dtswiss-350-boost148-xd', { freehub:'SRAM-XD' })), 'freehub');
});
test('rim missing wheel size is caught', function(){
  var p = over('rm-dtswiss-ex511-29'); delete p.wheel; some(probs(p), 'wheel');
});
test('rim wheel size outside the vocab is caught', function(){
  some(probs(over('rm-dtswiss-ex511-29', { wheel:'26' })), 'wheel');
});
test('FM (flat mount) is valid brakeMount vocab; unknown mounts still rejected', function(){
  var p = over('bk-magura-mt7', { mount:'FM' });
  delete p.verified; delete p.lastChecked; delete p.source;   // provenance-date noise
  eq(probs(p).length, 0);
  some(probs(over('bk-magura-mt7', { mount:'IS' })), 'mount');
});
test('a disciplines value outside the vocab is caught (ebike is deliberately not one)', function(){
  some(probs(over('fr-santacruz-megatower-cc', { disciplines:['enduro','ebike'] })), 'disciplines');
});
test('an empty disciplines array is caught (absence already means universal)', function(){
  some(probs(over('fr-santacruz-megatower-cc', { disciplines:[] })), 'disciplines');
});
test('bad family slug is caught (must be lowercase slug)', function(){
  some(probs(over('fr-raaw-madonna-v3', { family:'RAAW Madonna' })), 'family');
});
test('modelYear outside the sane range is caught', function(){
  some(probs(over('fr-raaw-madonna-v3', { modelYear:190 })), 'modelYear');
});
test('tire casing outside the vocab is caught', function(){
  // (probe value must stay fictional: 'super-gravity' sat here until it became
  // a REAL vocab value in the Schwalbe verification batch)
  some(probs(over('ti-maxxis-assegai-29-25-exop-mg', { casing:'not-a-real-casing' })), 'casing');
});
test('frame sizes with an unknown per-size key is caught', function(){
  some(probs(over('fr-raaw-madonna-v3', { sizes:{ M:{ maxInser:280 } } })), 'unknown key');
});
test('frame sizes with a non-positive value is caught', function(){
  some(probs(over('fr-raaw-madonna-v3', { sizes:{ M:{ maxInsert:0 } } })), 'positive');
});
test('a valid frame sizes map passes', function(){
  // unverified fixture on purpose: the frozen test date predates the verified
  // rows' lastChecked, which would add an unrelated provenance problem
  eq(probs(over('fr-santacruz-megatower-cc', { sizes:{ S:{ seatTubeLen:395, maxInsert:220 }, M:{ maxInsert:245 } } })).length, 0);
});
test('id with the wrong category prefix is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { id:'fk-santacruz-megatower-cc' })), 'prefix');
});
test('id with bad charset (uppercase) is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { id:'fr-SantaCruz-megatower' })), 'lowercase');
});
test('id with too few tokens is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { id:'fr-megatower' })), 'tokens');
});
test('verified:true without a source is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { verified:true })), 'source');
});
test('verified:true with a future date is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { verified:true, source:'https://x.com/s', lastChecked:'2099-01-01' })), 'lastChecked');
});
test('verified:true with a bogus URL is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { verified:true, source:'notaurl', lastChecked:'2025-01-01' })), 'source');
});
test('verified:true with good provenance passes', function(){
  eq(probs(over('fr-santacruz-megatower-cc', { verified:true, source:'https://example.com/spec', lastChecked:'2025-01-01' })).length, 0);
});
test('preset filling a wrong-category part is caught', function(){
  var p = over('ws-roval-traverse-hd-29', { fills:{ frontWheel:'fr-santacruz-megatower-cc', rearWheel:'rw-roval-traverse-hd-29' } });
  some(probs(p), 'category');
});
test('preset with a dangling fill reference is caught', function(){
  var p = over('ws-roval-traverse-hd-29', { fills:{ frontWheel:'fw-nope', rearWheel:'rw-roval-traverse-hd-29' } });
  some(probs(p), 'fw-nope');
});
test('a stored preset weight is caught (bundle weight is derived from fills)', function(){
  some(probs(over('gs-sram-gx-eagle', { weight:1670 })), 'derived');
});
test('a headTube value outside the SHIS vocab is caught', function(){
  // ZS49/28.6 was widened into the vocab 2026-07-11 (expand/finishing-kit-headset-bb,
  // a real Chris King InSet 5 + Cane Creek 40/110 SKU) - use a still-nonexistent
  // code so this stays a true negative test.
  some(probs(over('fr-santacruz-megatower-cc', { headTubeUpper:'ZS99/28.6' })), 'headTube');
});
test('the inert widened system values are accepted (LinkGlide cassette validates)', function(){
  var p = over('ca-sram-pg1230', { system:'shimano-linkglide', minCog:11 });
  eq(probs(p).filter(function(x){ return x.indexOf('system') >= 0; }).length, 0);
});

/* ---- provenance policy + lifecycle (Gate 6) ------------------------------ */
test('verified:true resting on a retailer source is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { verified:true, source:'https://x.com/s', lastChecked:'2025-01-01', sourceType:'retailer' })), 'retailer');
});
test('sourceType measured without a weightSource URL is caught', function(){
  // weightSource must be knocked out explicitly: the real HS2 200 row now
  // carries one (it IS a measured-verified rotor since the measured pass).
  some(probs(over('ro-sram-hs2-200-6b', { sourceType:'measured', weightSource:null })), 'weightSource');
});
test('a measured-weight verified part passes (the policy that unblocks rotors)', function(){
  eq(probs(over('ro-sram-hs2-200-6b', { verified:true, source:'https://www.sram.com/en/sram/models/rt-hs2', lastChecked:'2025-01-01',
    sourceType:'measured', weightSource:'https://weights.example/hs2-200' })).length, 0);
});
test('a bad status value is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { status:'sold-out' })), 'status');
});
test('a dangling supersededBy is caught', function(){
  some(probs(over('fr-raaw-madonna-v22', { supersededBy:'fr-raaw-madonna-v4' })), 'supersededBy');
});
test('a part superseding itself is caught', function(){
  some(probs(over('fr-raaw-madonna-v22', { supersededBy:'fr-raaw-madonna-v22' })), 'supersede');
});
test('a bad soldWithout value is caught', function(){
  some(probs(over('dr-sram-gx-transmission', { soldWithout:['battery','tools'] })), 'soldWithout');
});
test('a non-string udhRetrofitKit is caught', function(){
  some(probs(over('fr-raaw-madonna-v22', { udhRetrofitKit:123 })), 'udhRetrofitKit');
});
test('a bogus archiveUrl is caught', function(){
  some(probs(over('fr-canyon-strive-cfr', { archiveUrl:'notaurl' })), 'archiveUrl');
});

/* ---- Phase 2 display-only fields: image / colors / retailerLinks ---- */
test('a valid image/colors/retailerLinks part has no problems', function(){
  var p = over('fr-santacruz-megatower-cc', {
    image:'https://example.com/megatower.jpg',
    colors:['#1f6f4a','#000'],
    retailerLinks:[{label:'Competitive Cyclist', url:'https://example.com/buy'}]
  });
  eq(probs(p).length, 0);
});
test('a non-URL image is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { image:'not-a-url' })), 'image');
});
test('an empty colors array is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { colors:[] })), 'colors');
});
test('a non-hex colors value is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { colors:['forest green'] })), 'colors');
});
test('a retailerLinks entry missing url is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { retailerLinks:[{label:'REI'}] })), 'url');
});
test('a retailerLinks entry with an unknown key is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { retailerLinks:[{label:'REI', url:'https://example.com', price:100}] })), 'unknown key');
});
test('pedalStyle vocab widened for real dual-sided pedals: hybrid is a valid style', function(){
  var p = over('pd-oneup-aluminum', { style:'hybrid' });
  delete p.verified; delete p.lastChecked; delete p.source;
  eq(probs(p).length, 0, 'hybrid should validate now that real dual-sided flat/clip pedals (Double Shot 3, HT D1/GD1) are cataloged');
});
test('pedalStyle still rejects a value outside its (now 3-value) vocab', function(){
  some(probs(over('pd-oneup-aluminum', { style:'toe-clip' })), 'style');
});

/* ---- lintCatalog: warn-only guards (never block entry, never ship a typo) */
test('lint: a typo-sized rotor (2003mm) warns', function(){
  var bad = /** @type {any} */ (Object.assign({}, C.byId('ro-sram-hs2-200-6b'), { id:'ro-sram-hs2-2003-6b', size:2003 }));
  some(S.lintCatalog({ PARTS: C.PARTS.concat([bad]), SLOTS: C.SLOTS }), 'not a known value');
});
test('lint: two rows identical apart from the id warn as a duplicate SKU', function(){
  var dup = /** @type {any} */ (Object.assign({}, U.part('ti-maxxis-shorty-29-24-dd-mg'), { id:'ti-maxxis-shorty-29-24-dd-mg-dup' }));
  some(S.lintCatalog({ PARTS: C.PARTS.concat([dup]), SLOTS: C.SLOTS }), 'duplicate SKU');
});
test('lint: a wheelset kit mixing wheel sizes warns', function(){
  var bad = /** @type {any} */ (Object.assign({}, C.byId('ws-dtswiss-ex-1700-29'), {
    id:'ws-dtswiss-mixed-29', fills:{ frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-e-1900-275' } }));
  some(S.lintCatalog({ PARTS: C.PARTS.concat([bad]), SLOTS: C.SLOTS }), 'mix wheel sizes');
});
test('catalog-level: a duplicate id is caught', function(){
  var cat = { PARTS: C.PARTS.concat([ U.part('fr-santacruz-megatower-cc') ]), SLOTS: C.SLOTS };
  some(S.validateCatalog(cat, TODAY), 'duplicate');
});
test('catalog-level: a groupset that mixes systems is caught', function(){
  var bad = /** @type {any} */ (Object.assign({}, C.byId('gs-sram-gx-transmission')));
  bad.id = 'gs-bad';
  bad.fills = Object.assign({}, bad.fills, { cassette:'ca-shimano-xt-m8100-1051' }); // Shimano cassette in a SRAM Transmission group
  var cat = { PARTS: C.PARTS.concat([ bad ]), SLOTS: C.SLOTS };
  some(S.validateCatalog(cat, TODAY), 'system');
});
test('a BB with a shell outside the frameBb vocab is caught', function(){
  some(probs(over('bb-sram-dub-bsa73', { shell:'BSA99' })), 'shell');
});
test('a BB missing its spindle is caught', function(){
  var p = over('bb-sram-dub-bsa73'); delete p.spindle; some(probs(p), 'spindle');
});

/* forkTravelHard cross-rule (engine-critical review C4, 2026-07-12): a hard
   fork-travel range is an engine ERROR, so the flag must rest on a published
   statement - it requires the floor it hardens AND a source URL. Encodes the
   review's invariant after one frame carried a hard-error range unsourced.
   (The Megatower fixture has minForkTravel but deliberately no source field,
   which is exactly the case the cross-rule exists to reject.) */
test('forkTravelHard:true without a source URL is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { forkTravelHard:true })), 'source');
});
test('forkTravelHard:true without minForkTravel is caught', function(){
  var p = over('fr-santacruz-megatower-cc', { forkTravelHard:true, source:'https://example.com/spec' });
  delete p.minForkTravel;
  some(probs(p), 'minForkTravel');
});
test('forkTravelHard:true with both min and source passes', function(){
  eq(probs(over('fr-santacruz-megatower-cc', { forkTravelHard:true, source:'https://example.com/spec' })).length, 0);
});
test('catalog-level: a frame bundling a non-fitting shock is caught', function(){
  var f = /** @type {any} */ (Object.assign({}, C.byId('fr-santacruz-megatower-cc'), { id:'fr-badbundle', bundledShock:'sh-rockshox-super-deluxe-205x65-trun' })); // 205x65 trunnion != 230x65 std
  some(S.validateCatalog({ PARTS: C.PARTS.concat([ f ]), SLOTS: C.SLOTS }, TODAY), 'does not fit');
});
test('catalog-level: an OEM shock with a broken back-link is caught', function(){
  var s = /** @type {any} */ (Object.assign({}, C.byId('sh-rockshox-vivid-ultimate-oem-205x60-trun'), { id:'sh-badoem', forFrames:['fr-santacruz-megatower-cc'] })); // megatower does not bundle it
  some(S.validateCatalog({ PARTS: C.PARTS.concat([ s ]), SLOTS: C.SLOTS }, TODAY), 'bidirectional');
});

/* ---- headset category (2026-07-10) — synthetic literal so these negatives
   are self-contained (they predate the first catalog rows) */
/** A valid complete tapered headset; each test breaks one thing. @returns {*} */
function hsOk(){
  return { id:'hs-canecreek-40-zs44-zs56', cat:'headset', brand:'Cane Creek', model:'40',
    family:'canecreek-40', price:70, weight:126, upper:'ZS44/28.6', lower:'ZS56/40', steerer:'tapered' };
}
test('a valid headset has no problems', function(){
  eq(probs(hsOk()).length, 0);
});
test('headset missing steerer is caught', function(){
  var p = hsOk(); delete p.steerer; some(probs(p), 'steerer');
});
test('headset upper outside the headTube vocab is caught', function(){
  some(probs(Object.assign(hsOk(), { upper:'ZS99/28.6' })), 'upper');
});
test('headset steerer outside the steerer vocab is caught', function(){
  some(probs(Object.assign(hsOk(), { steerer:'threaded-1in' })), 'steerer');
});
test('cross-rule: tapered headset with a /28.6 lower (straight crown race) is caught', function(){
  some(probs(Object.assign(hsOk(), { lower:'ZS56/28.6' })), 'needs a /40 lower');
});
test('cross-rule: straight-dc headset with a /40 lower (tapered crown race) is caught', function(){
  some(probs(Object.assign(hsOk(), { steerer:'straight-dc' })), 'needs a /30 lower');
});
test('headset id must carry the hs- prefix', function(){
  some(probs(Object.assign(hsOk(), { id:'st-canecreek-40-zs44-zs56' })), 'prefix');
});
