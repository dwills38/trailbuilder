'use strict';
/* ROAD SCHEMA VALIDATOR (OFF-LIVE) — mirrors test-schema-bmx.js's positive/negative
   pattern for src/schema-road.js against data/road.js. */
var D = require('../data/road.js');
var S = require('../src/schema-road.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

var TODAY = new Date('2026-07-21T00:00:00Z');

/** @returns {any} */
function aFrame(){
  var p = D.ROAD_PARTS.find(function(x){ return x.cat === 'frame'; });
  if(!p) throw new Error('no road frame row found in data/road.js');
  return p;
}

test('the real road catalog validates clean', function(){
  var probs = S.validateRoadCatalog(D.ROAD_PARTS, TODAY);
  eq(probs.length, 0, probs.join('\n'));
});

test('a valid real road part has no problems', function(){
  var p = aFrame();
  eq(S.validateRoadPart(p, TODAY).length, 0);
});

test('an out-of-vocab bb shell value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bb: 'bb30-mtb-token' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /"bb".*not in bbShellRoad/.test(m); }), probs.join('\n'));
});

test('bb90-road / bb30a / pf86 are accepted (coordinator-authorized widen)', function(){
  var frame = aFrame();
  ['bb90-road', 'bb30a', 'pf86'].forEach(function(shell){
    var p = Object.assign({}, frame, { bb: shell });
    eq(S.validateRoadPart(p, TODAY).length, 0, shell + ' should validate clean');
  });
});

test('a missing required field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame); delete bad.rearAxle;
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /missing required field "rearAxle"/.test(m); }), probs.join('\n'));
});

test('an unknown category is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { cat: 'e-motor' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown road category/.test(m); }), probs.join('\n'));
});

test('a bad price is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { price: -5 });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /price must be a number/.test(m); }), probs.join('\n'));
});

test('verified:true without a source URL is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: undefined, lastChecked: '2026-07-01' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /valid http\(s\) source URL/.test(m); }), probs.join('\n'));
});

test('verified:true with a future lastChecked is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2099-01-01' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /lastChecked date/.test(m); }), probs.join('\n'));
});

test('verified:true with sourceType retailer is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2026-07-01', sourceType: 'retailer' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /rejects sourceType/.test(m); }), probs.join('\n'));
});

test('an unknown stray field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { rearaxel: frame.rearAxle });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown field "rearaxel"/.test(m); }), probs.join('\n'));
});

test('a duplicate id across the catalog is caught', function(){
  var frame = aFrame();
  var probs = S.validateRoadCatalog(D.ROAD_PARTS.concat([Object.assign({}, frame)]), TODAY);
  ok(probs.some(function(m){ return /duplicate id/.test(m); }), probs.join('\n'));
});

test('a wheel-side brakeSystem token (disc/rim) validates on frontwheel/rearwheel rows', function(){
  var fw = D.ROAD_PARTS.find(function(x){ return x.cat === 'frontwheel'; });
  if(!fw) throw new Error('no road frontwheel row found');
  eq(S.validateRoadPart(fw, TODAY).length, 0);
});

test('a brake-caliper hydraulic/mechanical actuation validates on brake rows', function(){
  var br = D.ROAD_PARTS.find(function(x){ return x.cat === 'brake'; });
  if(!br) throw new Error('no road brake row found');
  eq(S.validateRoadPart(br, TODAY).length, 0);
});
