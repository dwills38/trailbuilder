'use strict';
/* TIRE COMPOUND/CASING CLASS chips (2026-07-16) — pins a handful of
   representative mappings across brands (so a future edit to the table
   can't silently flip a class) and proves an unmapped/garbage/absent value
   always resolves to null rather than guessing. Full per-value rationale
   lives in src/tire-classes.js's own comments; this suite is a pin, not a
   re-derivation of the mapping judgment calls. */
var TC = require('../src/tire-classes.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

/* ---- compound: soft/medium/hard, a few per bucket across brands -------- */
test('compound: soft bucket (3C MaxxGrip, Onza Soft-50, Continental Supersoft)', function(){
  eq(TC.classifyTireCompound('3c-maxxgrip'), 'soft');
  eq(TC.classifyTireCompound('soft-50'), 'soft');
  eq(TC.classifyTireCompound('supersoft'), 'soft');
});
test('compound: medium bucket (3C MaxxTerra, Onza Medium-60)', function(){
  eq(TC.classifyTireCompound('3c-maxxterra'), 'medium');
  eq(TC.classifyTireCompound('medium-60'), 'medium');
});
test('compound: hard bucket (Maxxis Dual/MaxxSpeed, Schwalbe Speed)', function(){
  eq(TC.classifyTireCompound('dual'), 'hard');
  eq(TC.classifyTireCompound('maxxspeed'), 'hard');
  eq(TC.classifyTireCompound('addix-speed'), 'hard');
});
test('compound: Continental "Soft" is the MIDDLE of Continental\'s own 3-tier range, not the soft bucket', function(){
  eq(TC.classifyTireCompound('soft'), 'medium');
  eq(TC.classifyTireCompound('endurance'), 'hard');
});
test('compound: unmapped values (construction descriptors, no sourced hardness claim) return null', function(){
  eq(TC.classifyTireCompound('4c-graphene'), null);   // compound-count descriptor, not a hardness claim
  eq(TC.classifyTireCompound('blackchili'), null);    // base tech present in every Continental tier
  eq(TC.classifyTireCompound('magix-mh'), null);      // same compound as magix-ms, differs only by tread pattern
  eq(TC.classifyTireCompound('dtc'), null);            // hard-center/soft-shoulder spans two durometers
});
test('compound: unknown/garbage/absent values return null, never throw', function(){
  eq(TC.classifyTireCompound('not-a-real-compound'), null);
  eq(TC.classifyTireCompound(undefined), null);
  eq(TC.classifyTireCompound(''), null);
});

/* ---- casing: dh/enduro/trail/xc, a few per bucket across brands -------- */
test('casing: dh bucket (Maxxis DH, Schwalbe Super Downhill, literal downhill)', function(){
  eq(TC.classifyTireCasing('dh'), 'dh');
  eq(TC.classifyTireCasing('super-downhill'), 'dh');
  eq(TC.classifyTireCasing('downhill'), 'dh');
});
test('casing: enduro bucket (Maxxis DoubleDown, Schwalbe Super Gravity)', function(){
  eq(TC.classifyTireCasing('doubledown'), 'enduro');
  eq(TC.classifyTireCasing('super-gravity'), 'enduro');
});
test('casing: trail bucket (Maxxis EXO/EXO+, literal trail)', function(){
  eq(TC.classifyTireCasing('exo'), 'trail');
  eq(TC.classifyTireCasing('exo-plus'), 'trail');
  eq(TC.classifyTireCasing('trail'), 'trail');
});
test('casing: xc bucket (Specialized Control, Schwalbe Super Race)', function(){
  eq(TC.classifyTireCasing('control'), 'xc');
  eq(TC.classifyTireCasing('super-race'), 'xc');
});
test('casing: "Gravity"-named tiers map to enduro, never dh, across every brand that uses the word', function(){
  eq(TC.classifyTireCasing('grid-gravity'), 'enduro');   // Specialized
  eq(TC.classifyTireCasing('grc'), 'enduro');             // Onza (Gravity Ready Casing)
  eq(TC.classifyTireCasing('gravity-shield'), 'enduro');  // Michelin
  eq(TC.classifyTireCasing('aec'), 'enduro');             // Kenda Advanced Enduro Casing (name-literal)
});
test('casing: unmapped values (two target classes named jointly, or no discipline word at all) return null', function(){
  eq(TC.classifyTireCasing('tcs-light-sg2'), null);   // WTB: "XC and trail riders" - two classes named jointly
  eq(TC.classifyTireCasing('hardskin'), null);         // Hutchinson: reinforcement-coverage axis, not duty
  eq(TC.classifyTireCasing('durable'), null);          // Teravail: no discipline word sourced
});
test('casing: unknown/garbage/absent values return null, never throw', function(){
  eq(TC.classifyTireCasing('not-a-real-casing'), null);
  eq(TC.classifyTireCasing(undefined), null);
  eq(TC.classifyTireCasing(''), null);
});

/* ---- class metadata: order lists + labels stay in sync with each other - */
test('TIRE_COMPOUND_CLASSES lists exactly the classes TIRE_COMPOUND_CLASS_LABELS knows', function(){
  var TC_CLASSES = TC.TIRE_COMPOUND_CLASSES, TC_LABELS = TC.TIRE_COMPOUND_CLASS_LABELS;
  eq(TC_CLASSES.length, Object.keys(TC_LABELS).length);
  TC_CLASSES.forEach(function(c){ eq(typeof TC_LABELS[c], 'string'); });
});
test('TIRE_CASING_CLASSES lists exactly the classes TIRE_CASING_CLASS_LABELS knows', function(){
  var CC_CLASSES = TC.TIRE_CASING_CLASSES, CC_LABELS = TC.TIRE_CASING_CLASS_LABELS;
  eq(CC_CLASSES.length, Object.keys(CC_LABELS).length);
  CC_CLASSES.forEach(function(c){ eq(typeof CC_LABELS[c], 'string'); });
});
test('every mapped value resolves to a class that is actually in the classes list (no stray typo class)', function(){
  Object.keys(TC.TIRE_COMPOUND_CLASS).forEach(function(k){
    ok(TC.TIRE_COMPOUND_CLASSES.indexOf(TC.TIRE_COMPOUND_CLASS[k]) >= 0, k + ' -> ' + TC.TIRE_COMPOUND_CLASS[k]);
  });
  Object.keys(TC.TIRE_CASING_CLASS).forEach(function(k){
    ok(TC.TIRE_CASING_CLASSES.indexOf(TC.TIRE_CASING_CLASS[k]) >= 0, k + ' -> ' + TC.TIRE_CASING_CLASS[k]);
  });
});
