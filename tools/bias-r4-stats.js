'use strict';
/* bias-r4-stats.js — measurement harness for the 2026-07-19 manufacturer-bias
   audit (round 4). Read-only: requires the real src/compat.js + src/kit.js and
   prints per-brand distributions for the surfaces the audit covers. Nothing
   here mutates the catalog or the engine. Run: node tools/bias-r4-stats.js */

var C = require('../src/compat.js');
var K = require('../src/kit.js');
var PARTS = C.PARTS;

function pct(n, d){ return d ? (100 * n / d).toFixed(1) + '%' : '—'; }
function byBrand(list){
  var m = {};
  list.forEach(function(p){ (m[p.brand] = m[p.brand] || []).push(p); });
  return m;
}
function sortedEntries(m){
  return Object.keys(m).sort(function(a, b){ return m[b].length - m[a].length; })
    .map(function(k){ return [k, m[k]]; });
}

console.log('=== catalog totals ===');
console.log('PARTS: ' + PARTS.length + ', KIT_PARTS: ' + K.KIT_PARTS.length);

/* ---- 1. Affiliate isolation (r3 C1 re-check; index.html now reads p.image) */
var withImage = PARTS.filter(function(p){ return p.image; });
var withLinks = PARTS.filter(function(p){ return p.retailerLinks; });
var kitImage = K.KIT_PARTS.filter(function(p){ return p.image; });
var kitLinks = K.KIT_PARTS.filter(function(p){ return p.retailerLinks; });
console.log('\n=== 1. affiliate isolation ===');
console.log('PARTS with image: ' + withImage.length + ', retailerLinks: ' + withLinks.length);
console.log('KIT with image: ' + kitImage.length + ', retailerLinks: ' + kitLinks.length);
if(withImage.length) console.log('  image rows: ' + withImage.slice(0, 20).map(function(p){ return p.id; }).join(', '));

/* ---- 2. Complete bikes: per-maker rows / sheet-verified / streetPrice / save */
var bikes = PARTS.filter(function(p){ return p.cat === 'completebike'; });
console.log('\n=== 2. complete bikes (' + bikes.length + ') ===');
function partsTotal(p){
  var t = 0;
  Object.keys(p.fills).forEach(function(k){
    var f = C.byId(p.fills[k]);
    if(f && typeof f.price === 'number') t += f.price;
  });
  return t;
}
var mk = byBrand(bikes);
var rows = [];
sortedEntries(mk).forEach(function(e){
  var brand = e[0], list = e[1];
  var sheet = list.filter(C.completeBikeSheetVerified).length;
  var street = list.filter(function(p){ return p.streetPrice != null; }).length;
  var saves = list.map(function(p){
    var t = partsTotal(p);
    return p.price > 0 ? (t - p.price) / p.price : 0;
  });
  var meanSave = saves.reduce(function(a, b){ return a + b; }, 0) / saves.length;
  var over60 = saves.filter(function(s){ return s > 0.6; }).length;
  rows.push([brand, list.length, sheet, pct(sheet, list.length), street, (100 * meanSave).toFixed(0) + '%', over60]);
});
console.log('maker | bikes | sheetVerified | % | streetPrice rows | mean save% | save>60% count');
rows.forEach(function(r){ console.log(r.join(' | ')); });
var totSheet = bikes.filter(C.completeBikeSheetVerified).length;
console.log('TOTAL sheet-verified: ' + totSheet + '/' + bikes.length + ' (' + pct(totSheet, bikes.length) + ')');
var vanish = rows.filter(function(r){ return r[2] === 0; });
console.log('makers with 0 sheet-verified: ' + vanish.length + ' (' + vanish.reduce(function(a, r){ return a + r[1]; }, 0) + ' bikes): ' + vanish.map(function(r){ return r[0] + ' 0/' + r[1]; }).join(', '));

/* ---- 3. IS-mount r3 #1 re-verify: PM calipers on the IS frames ---- */
console.log('\n=== 3. IS-mount frames vs all calipers ===');
var brakesAll = PARTS.filter(function(p){ return p.cat === 'brake'; });
PARTS.filter(function(p){ return p.cat === 'frame' && p.brakeMount === 'IS'; }).forEach(function(fr){
  var clean = 0, warn = 0, err = 0;
  brakesAll.forEach(function(b){
    var r = C.checkBuild({ frame: fr, rearBrake: b });
    var e = r.errors.filter(function(v){ return String(v.ruleId).indexOf('brake-mount') >= 0; }).length;
    var w = r.warnings.filter(function(v){ return String(v.ruleId).indexOf('brake-mount') >= 0; }).length;
    if(e) err++; else if(w) warn++; else clean++;
  });
  console.log(fr.id + ': clean ' + clean + ' / adapterWarn ' + warn + ' / error ' + err + ' (of ' + brakesAll.length + ')');
});

/* ---- 4. dormant-rule distribution by brand (who benefits from missing data) */
console.log('\n=== 4. dormancy by brand ===');
var forks = PARTS.filter(function(p){ return p.cat === 'fork'; });
var fb = byBrand(forks);
console.log('-- fork maxTire coverage + minRotorF coverage (brand: n, maxTire have, minRotorF have)');
sortedEntries(fb).forEach(function(e){
  var have = e[1].filter(function(p){ return p.maxTire != null; }).length;
  var mr = e[1].filter(function(p){ return p.minRotorF != null; }).length;
  console.log('  ' + e[0] + ': n=' + e[1].length + ', maxTire ' + have + ' (' + pct(have, e[1].length) + '), minRotorF ' + mr + ' (' + pct(mr, e[1].length) + ')');
});
var frames = PARTS.filter(function(p){ return p.cat === 'frame'; });
var frb = byBrand(frames);
console.log('-- frame designForkTravel / forkTravelHard / maxTire coverage');
sortedEntries(frb).forEach(function(e){
  var dft = e[1].filter(function(p){ return p.designForkTravel != null; }).length;
  var hard = e[1].filter(function(p){ return p.forkTravelHard === true; }).length;
  var mt = e[1].filter(function(p){ return p.maxTire != null; }).length;
  console.log('  ' + e[0] + ': n=' + e[1].length + ', designForkTravel ' + dft + ', forkTravelHard ' + hard + ', maxTire ' + mt);
});
var wheels = PARTS.filter(function(p){ return p.cat === 'frontwheel' || p.cat === 'rearwheel'; });
var minTireBrands = {};
wheels.forEach(function(p){ if(p.minTire != null) minTireBrands[p.brand] = (minTireBrands[p.brand] || 0) + 1; });
console.log('-- wheel minTire (rule 14c) brands: ' + JSON.stringify(minTireBrands) + ' of ' + wheels.length + ' wheels');

/* ---- 5. desc superlative scan (r3 L6 pattern) ---- */
console.log('\n=== 5. superlative scan (desc fields, all catalogs incl. kit) ===');
var SUPER = /best[- ]sell|most popular|best[- ]review|award[- ]winn|#1|number one|industry[- ]lead|world[- ]?class|legendary|iconic|favorite|favourite/i;
function scan(list, label){
  var hits = list.filter(function(p){ return p.desc && SUPER.test(p.desc); });
  console.log(label + ': ' + hits.length + ' hits');
  hits.forEach(function(p){ console.log('  ' + p.id + ' [' + p.brand + ']: ' + p.desc.match(SUPER)[0]); });
}
scan(PARTS, 'PARTS');
scan(K.KIT_PARTS, 'KIT_PARTS');

/* ---- 6. kit verification parity by brand/category ---- */
console.log('\n=== 6. kit verified rates ===');
var kitCats = {};
K.KIT_PARTS.forEach(function(p){ (kitCats[p.cat] = kitCats[p.cat] || []).push(p); });
Object.keys(kitCats).forEach(function(cat){
  var list = kitCats[cat];
  var v = list.filter(function(p){ return p.verified === true; }).length;
  console.log(cat + ': ' + v + '/' + list.length + ' (' + pct(v, list.length) + ')');
});
console.log('-- per-brand (>=5 rows), verified rate');
var kb = byBrand(K.KIT_PARTS);
sortedEntries(kb).forEach(function(e){
  if(e[1].length < 5) return;
  var v = e[1].filter(function(p){ return p.verified === true; }).length;
  console.log('  ' + e[0] + ': ' + v + '/' + e[1].length + ' (' + pct(v, e[1].length) + ')');
});

/* ---- 7. sample-generator frame concentration (r3 L5 re-check) ---- */
console.log('\n=== 7. sample generator frame share (600 rolls, all themes) ===');
var themes = (C.SAMPLE_THEMES || []).map(function(t){ return t.key; });
var counts = {}, total = 0;
themes.forEach(function(th, ti){
  for(var i = 0; i < Math.ceil(600 / themes.length); i++){
    var b = C.generateSampleBuild(th, C.mulberry32(i * 7919 + ti * 104729 + 1));
    var frPart = (b && b.ok && b.build && b.build.frame) ? b.build.frame : null;
    var fr2 = frPart ? (typeof frPart === 'string' ? C.byId(frPart) : frPart) : null;
    if(fr2){ counts[fr2.brand] = (counts[fr2.brand] || 0) + 1; total++; }
  }
});
if(!total){ console.log('  (generateSampleBuild signature differs — inspect manually)'); }
else{
  Object.keys(counts).sort(function(a, b){ return counts[b] - counts[a]; }).slice(0, 8).forEach(function(br){
    console.log('  ' + br + ': ' + pct(counts[br], total));
  });
  console.log('  total rolls: ' + total);
}
