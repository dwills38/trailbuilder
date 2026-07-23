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
test('maxTireByWheel with a wheel key outside the vocab is caught', function(){
  some(probs(over('fr-surly-karate-monkey', { maxTireByWheel:{'30':2.5} })), 'maxTireByWheel');
});
test('maxTireByWheel with a non-positive value is caught', function(){
  some(probs(over('fr-surly-karate-monkey', { maxTireByWheel:{'29':0} })), 'maxTireByWheel');
});
test('maxTireByWheel that is not an object is caught', function(){
  some(probs(over('fr-surly-karate-monkey', { maxTireByWheel:2.5 })), 'maxTireByWheel');
});
test('an empty maxTireByWheel map is caught', function(){
  some(probs(over('fr-surly-karate-monkey', { maxTireByWheel:{} })), 'maxTireByWheel');
});
test('the real Surly Karate Monkey (maxTireByWheel {29:2.5,275:3.0}) validates clean', function(){
  var p = over('fr-surly-karate-monkey');
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;
  eq(probs(p).length, 0, 'the dual-size Surly frame with a per-wheel map should validate');
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
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;
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
  // Strip provenance fields: this test is about the freehub:'integrated' SHAPE,
  // not about whichever verification date the live row happens to carry (which
  // drifts as sessions verify parts with today's real date against the fixed TODAY above).
  var p = over('rw-reserve-30-hd-29', { freehub:'integrated' });
  delete p.verified; delete p.lastChecked; delete p.source; delete p.sourceType; delete p.weightSource;
  eq(probs(p).length, 0, 'integrated is a legal rearwheel freehub value');
});
test('an armset-only crank (ringStd:null, no ring) is valid data', function(){
  // Strip provenance fields: this test is about the ringStd:null/no-ring SHAPE,
  // not about whichever verification date the live row happens to carry (which
  // drifts as sessions verify parts with today's real date against the fixed TODAY above).
  var p = over('cr-canecreek-eewings-allmountain');
  delete p.verified; delete p.lastChecked; delete p.source; delete p.sourceType; delete p.weightSource; delete p.priceBasis;
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
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;   // provenance-date noise, same as the eeWings test
  eq(probs(p).length, 0);
});
test('shimano-8 is valid system vocab (entry 8-speed group enterable)', function(){
  var p = over('sft-sram-gx-eagle', { system:'shimano-8', speeds:8 });
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;   // provenance-date noise, same as the sram-dh-7 test
  eq(probs(p).length, 0);
});
test('trp-evo7-dh is valid system vocab (TRP EVO 7 DH group enterable)', function(){
  var p = over('sft-sram-gx-eagle', { system:'trp-evo7-dh', speeds:7 });
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;   // provenance-date noise, same as the sram-dh-7 test
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
  // fixture value moved '26' -> '700c' 2026-07-13: '26' became a LEGAL wheel
  // token with the DJ pass, so it no longer serves as the out-of-vocab example.
  some(probs(over('rm-dtswiss-ex511-29', { wheel:'700c' })), 'wheel');
});
test('FM (flat mount) is valid brakeMount vocab; unknown mounts still rejected', function(){
  var p = over('bk-magura-mt7', { mount:'FM' });
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;   // provenance-date noise
  eq(probs(p).length, 0);
  some(probs(over('bk-magura-mt7', { mount:'XYZ' })), 'mount');
});
test('9x135-bolt (vocab-tier1, 2026-07-22) is valid rearAxle vocab; unknown axle spacings still rejected', function(){
  var p = over('fr-mongoose-fireball-ss', { rearAxle:'9x135-bolt' });
  delete p.verified; delete p.lastChecked; delete p.source;   // provenance-date noise
  eq(probs(p).length, 0);
  some(probs(over('fr-mongoose-fireball-ss', { rearAxle:'9x142-bolt' })), 'rearAxle');
});
test('IS (International Standard) is valid brakeMount vocab - widened grind-7 w5 after confirming IS is a genuinely distinct, non-interchangeable-without-adapter mount (51mm bolt spacing parallel to axle vs PM 74.2mm perpendicular)', function(){
  var p = over('bk-magura-mt7', { mount:'IS' });
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;   // provenance-date noise
  eq(probs(p).length, 0);
});
test('a disciplines value outside the vocab is caught (ebike is deliberately not one)', function(){
  some(probs(over('fr-santacruz-megatower-cc', { disciplines:['enduro','ebike'] })), 'disciplines');
});
test('an empty disciplines array is caught (absence already means universal)', function(){
  some(probs(over('fr-santacruz-megatower-cc', { disciplines:[] })), 'disciplines');
});
test('a frame material outside the vocab is caught', function(){
  // probe value stays fictional (magnesium: no catalog frame is magnesium, so
  // it is deliberately NOT a vocab value - never invent a token no row needs)
  some(probs(over('fr-santacruz-megatower-cc', { material:'magnesium' })), 'material');
});
test('a non-string frame material is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { material:['carbon'] })), 'material');
});
test('a valid frame material passes (optional: absence = unknown, also valid)', function(){
  eq(probs(over('fr-santacruz-megatower-cc', { material:'carbon' })).length, 0);
  var p = over('fr-santacruz-megatower-cc'); delete p.material;
  eq(probs(p).length, 0);
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
test('ZS51/28.6 and ZS59/40 (widened grind-7 w4, Polygon Collosus T8 Carbon FSA No.76) validate clean', function(){
  var p = over('fr-santacruz-megatower-cc', { headTubeUpper:'ZS51/28.6', headTubeLower:'ZS59/40' });
  eq(probs(p).filter(function(x){ return x.indexOf('headTube') >= 0; }).length, 0);
});
test('ZS56/30 (widened grind-7 w4, Polygon Collosus DH9 straight-steerer FSA No.55/57-1) validates clean', function(){
  var p = over('fr-santacruz-megatower-cc', { headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/30' });
  eq(probs(p).filter(function(x){ return x.indexOf('headTube') >= 0; }).length, 0);
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
  delete p.verified; delete p.lastChecked; delete p.source; delete p.priceBasis;
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
test('lint: a completebike rotor fill that disagrees with its stock wheel rotorMount warns', function(){
  var bike = /** @type {any} */ (Object.assign({}, C.byId('cb-forbidden-druid-v2-29-buildkit3')));
  var bad = /** @type {any} */ (Object.assign({}, bike, {
    id:'cb-bad-rotor-mount', fills: Object.assign({}, bike.fills, { frontRotor:'ro-sram-hs2-180-6b' }) }));
  some(S.lintCatalog({ PARTS: C.PARTS.concat([bad]), SLOTS: C.SLOTS }), 'frontRotor mount');
});
test('lint: rotorAdapterDocumented:true suppresses the rotor-mount warning on that bike', function(){
  var bike = /** @type {any} */ (Object.assign({}, C.byId('cb-forbidden-druid-v2-29-buildkit3')));
  var documented = /** @type {any} */ (Object.assign({}, bike, {
    id:'cb-forbidden-documented-rotor-adapter', rotorAdapterDocumented:true,
    fills: Object.assign({}, bike.fills, { frontRotor:'ro-sram-hs2-180-6b' }) }));
  var warnings = S.lintCatalog({ PARTS: C.PARTS.concat([documented]), SLOTS: C.SLOTS });
  eq(warnings.filter(function(w){ return w.indexOf('cb-forbidden-documented-rotor-adapter') >= 0; }).length, 0,
    'rotorAdapterDocumented should opt the bike out of the rotor-mount advisory');
});
test('lint: the shipped catalog has zero rotor-mount mismatches (bias-r4 rotor wave, 2026-07-19)', function(){
  var warnings = S.lintCatalog(C);
  eq(warnings.filter(function(w){ return /frontRotor mount|rearRotor mount/.test(w); }).length, 0,
    'every completebike rotor fill must match its stock wheel rotorMount, or carry rotorAdapterDocumented:true');
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
test('a crankset with a spindle outside the crankBb vocab is caught', function(){
  some(probs(over('cr-sram-gx-eagle', { bb:'square-tapre' })), 'bb');
});
test('a crankset with the square-taper crankBb spindle passes (2026-07-16 hardtail-depth vocab widening)', function(){
  eq(probs(over('cr-sram-gx-eagle', { bb:'square-taper', verified:false, lastChecked:undefined, source:undefined, priceBasis:undefined })).length, 0);
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

/* ---- priceBasis: price provenance (Douglas's 2026-07-22 ruling) -----------
   "verified means the pricing was verified too". A stated basis is a CLAIM, so
   the validator must bite in both directions: an unverified row may not state
   one, and a stated one must be a real vocab token. The missing-on-verified
   case is deliberately NOT an error yet — PRICE_BASIS_STRICT is false while the
   backfill runs — and that staging is itself pinned below, so a premature flip
   can't slip in unnoticed. */
/** a verified row stripped to a known-good provenance baseline, so these tests
 * don't drift with whatever lastChecked the live row happens to carry
 * @param {Object} [changes] @returns {*} */
function pbRow(changes){
  var p = over('fr-santacruz-megatower-cc', { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}
test('every priceBasis vocab token is accepted on a verified row', function(){
  S.VOCAB.priceBasis.forEach(function(token){
    // pair-split-estimate is wheel-only (see the dedicated tests below) -
    // pbRow's base part is a frame, so it needs a wheel-category row instead.
    var row = token === 'pair-split-estimate' ? pbWheelRow({ priceBasis:token }) : pbRow({ priceBasis:token });
    eq(probs(row).length, 0, 'expected "' + token + '" to validate on a verified row');
  });
});
/* ---- pair-split-estimate: wheel-only scoping (2026-07-22, "split the price") --- */
/** @param {Object} [changes] @returns {any} */
function pbWheelRow(changes){
  var p = over('fw-raceface-ar30-factor-29', { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}
test('pair-split-estimate validates clean on a frontwheel/rearwheel row', function(){
  eq(probs(pbWheelRow({ priceBasis:'pair-split-estimate' })).length, 0);
  var rw = over('rw-raceface-ar30-factor-29-sb157-hg', { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01', priceBasis:'pair-split-estimate' });
  delete rw.sourceType; delete rw.weightSource;
  eq(probs(rw).length, 0);
});
test('pair-split-estimate is rejected on a non-wheel category (e.g. a frame)', function(){
  some(probs(pbRow({ priceBasis:'pair-split-estimate' })), 'pair-split-estimate');
  some(probs(pbRow({ priceBasis:'pair-split-estimate' })), 'wheel category');
});
test('an out-of-vocab priceBasis is caught', function(){
  some(probs(pbRow({ priceBasis:'msrp-probably' })), 'priceBasis');
  some(probs(pbRow({ priceBasis:'street-price' })), 'priceBasis');
});
test('priceBasis on an UNVERIFIED row is rejected (a basis is a claim, not decoration)', function(){
  var p = pbRow({ priceBasis:'msrp-confirmed' });
  delete p.verified; delete p.source; delete p.lastChecked;
  some(probs(p), 'requires verified:true');
});
test('priceBasis with verified:false is rejected too (explicit false, not just absent)', function(){
  var p = pbRow({ priceBasis:'msrp-confirmed', verified:false });
  some(probs(p), 'requires verified:true');
});
test('msrp-confirmed cannot ride on a verified row lacking a real source (verified:true already forces one)', function(){
  var p = pbRow({ priceBasis:'msrp-confirmed', source:'not-a-url' });
  some(probs(p), 'source URL');
});
test('a non-string priceBasis is caught', function(){
  some(probs(pbRow({ priceBasis:7 })), 'priceBasis');
});
test('STAGED ROLLOUT: a verified row with NO priceBasis is still legal while PRICE_BASIS_STRICT is false', function(){
  // The whole point of the staging — ~3,300 verified rows predate the field and
  // must not break the gate mid-backfill. If this ever fails, PRICE_BASIS_STRICT
  // was flipped before the backfill finished (that is the coordinator's call,
  // and this test is the tripwire, not an obstacle to be deleted).
  eq(S.PRICE_BASIS_STRICT, false, 'PRICE_BASIS_STRICT flipped — the backfill must be complete in EVERY catalog first');
  eq(probs(pbRow()).length, 0, 'a verified row without priceBasis must stay valid during the rollout');
});
test('priceBasisAudit counts only VERIFIED rows, and only their missing bases', function(){
  var a = S.priceBasisAudit([
    { verified:true,  priceBasis:'msrp-confirmed' },
    { verified:true },                                  // verified, no basis -> missing
    { verified:false, priceBasis:'msrp-confirmed' },    // unverified rows are not counted either way
    { }                                                 // no provenance at all
  ]);
  eq(a.verified, 2); eq(a.withBasis, 1); eq(a.missing, 1);
});
test('priceBasisAudit is safe on empty/absent input (validate.js calls it on every catalog)', function(){
  eq(S.priceBasisAudit([]).missing, 0);
  eq(S.priceBasisAudit(null).verified, 0);
});
test('priceBasisNote is quiet when nothing is missing, and states the burndown when something is', function(){
  eq(S.priceBasisNote([{ verified:true, priceBasis:'msrp-confirmed' }]), '');
  eq(S.priceBasisNote([]), '');
  eq(S.priceBasisNote([{ verified:true }]), ', 1 verified row(s) still lack priceBasis');
});
test('priceBasis NEVER feeds a compatibility verdict (display/annotation only)', function(){
  /* The same contract as `disciplines`: a PRICE fact must never move a FIT
     verdict. compatOf/placementDiff take a real part OBJECT, so this injects a
     priceBasis-carrying clone of each part and requires byte-identical output —
     a genuine guard, not a self-comparison. Every enum token is tried, so a
     future rule keying off one specific basis can't hide. */
  var build = U.B({ frame:'fr-santacruz-megatower-cc' });
  [['sh-fox-float-x-230x60','shock'],                              // yellow (shorter stroke)
   ['sh-rockshox-super-deluxe-ultimate-230x62p5','shock'],         // green
   ['sh-rockshox-super-deluxe-205x65-trun','shock']                // red (trunnion)
  ].forEach(function(pair){
    var base = U.part(pair[0]);   // throws on a missing id — keeps tsc honest about Part|null
    var plainDot  = JSON.stringify(C.compatOf(base, build));
    var plainDiff = JSON.stringify(C.placementDiff(base, pair[1], build));
    S.VOCAB.priceBasis.forEach(function(token){
      var tagged = Object.assign({}, base, { priceBasis:token });
      eq(JSON.stringify(C.compatOf(tagged, build)), plainDot,
        pair[0] + ': the dot changed when priceBasis="' + token + '" was added');
      eq(JSON.stringify(C.placementDiff(tagged, pair[1], build)), plainDiff,
        pair[0] + ': placementDiff changed when priceBasis="' + token + '" was added');
    });
  });
});
