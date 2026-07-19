'use strict';
/* bias-r4-upgrade.js — Upgrade Advisor brand-parity measurement (bias round 4,
   2026-07-19). Read-only. Runs the REAL upgradeCheck (src/upgrade.js) with the
   real engine over every catalog complete bike as a baseline, and measures:

   1. per-candidate-brand verdict distribution (g/w/r) for forks, rear wheels,
      cassettes and droppers — does the flipped view treat brands identically?
   2. the "clears N current issues" framing — which candidate brands earn
      "resolves" credit, and from which baseline conflicts it derives;
   3. baseline-side: which makers' pristine bikes carry current conflicts at
      all (the only source of "clears" credit);
   4. a sampled agreement check: upgradeCheck.state must equal compatOf's dot.

   Run: node tools/bias-r4-upgrade.js  (~1-2 min: several hundred thousand
   checkBuild calls) */

var C = require('../src/compat.js');
var U = require('../src/upgrade.js');
var deps = { checkBuild: C.checkBuild, verdictKey: C.verdictKey, byId: C.byId,
             SLOTS: C.SLOTS, altSlotsOf: C.altSlotsOf };

var bikes = C.PARTS.filter(function(p){ return p.cat === 'completebike'; });
function resolvedFills(p){
  var b = {};
  Object.keys(p.fills).forEach(function(k){
    var f = C.byId(p.fills[k]);
    if(f) b[k] = f;
  });
  return b;
}

/* ---- 3 first: baseline-side current conflicts per maker ---- */
console.log('=== baseline: pristine catalog bikes with current conflicts (per maker) ===');
var makerStats = {};
var baselines = bikes.map(function(p){
  var b = resolvedFills(p);
  var r = C.checkBuild(b);
  var m = makerStats[p.brand] = makerStats[p.brand] || { n: 0, withErr: 0, withWarn: 0, errs: 0, warns: 0 };
  m.n++;
  if(r.errors.length){ m.withErr++; m.errs += r.errors.length; }
  if(r.warnings.length){ m.withWarn++; m.warns += r.warnings.length; }
  return { bike: p, build: b, current: r };
});
var totErr = 0, totWarn = 0;
Object.keys(makerStats).sort(function(a, b){ return makerStats[b].n - makerStats[a].n; }).forEach(function(mk){
  var m = makerStats[mk];
  totErr += m.withErr; totWarn += m.withWarn;
  if(m.withErr || m.withWarn) console.log('  ' + mk + ': ' + m.n + ' bikes, ' + m.withErr + ' with errors (' + m.errs + ' total), ' + m.withWarn + ' with warnings (' + m.warns + ' total)');
});
console.log('  TOTAL: ' + totErr + '/' + bikes.length + ' bikes carry >=1 current error; ' + totWarn + ' carry >=1 warning');

/* ---- 1+2: candidate sweeps ---- */
var CATS = ['fork', 'rearwheel', 'cassette', 'dropper'];
CATS.forEach(function(cat){
  var cands = C.PARTS.filter(function(p){ return p.cat === cat; });
  /* brand -> {n, g, w, r, clearsAny, clearsSum} aggregated over every (bike, cand) pair */
  var agg = {};
  var mismatches = 0, checked = 0;
  baselines.forEach(function(base, bi){
    cands.forEach(function(p){
      var uc = U.upgradeCheck(p, base.build, deps);
      if(!uc) return;
      var a = agg[p.brand] = agg[p.brand] || { n: 0, g: 0, w: 0, r: 0, clearsAny: 0, clearsSum: 0 };
      a.n++;
      a[uc.state] = (a[uc.state] || 0) + 1;
      var clears = uc.resolvesErrors.length + uc.resolvesWarnings.length;
      if(clears > 0){ a.clearsAny++; a.clearsSum += clears; }
      /* sampled agreement with compatOf (every 97th pair to keep runtime sane) */
      if(((bi * 31 + checked) % 97) === 0){
        var dot = C.compatOf(p, base.build);
        if(dot.state !== uc.state) mismatches++;
      }
      checked++;
    });
  });
  console.log('\n=== candidates: ' + cat + ' (' + cands.length + ' parts x ' + baselines.length + ' bikes) ===');
  console.log('brand | pairs | green% | yellow% | red% | clearsAny% | mean clears when >0');
  Object.keys(agg).sort(function(a, b){ return agg[b].n - agg[a].n; }).forEach(function(br){
    var a = agg[br];
    console.log('  ' + br + ' | ' + a.n +
      ' | ' + (100 * a.g / a.n).toFixed(1) +
      ' | ' + (100 * a.w / a.n).toFixed(1) +
      ' | ' + (100 * a.r / a.n).toFixed(1) +
      ' | ' + (100 * a.clearsAny / a.n).toFixed(2) +
      ' | ' + (a.clearsAny ? (a.clearsSum / a.clearsAny).toFixed(2) : '—'));
  });
  console.log('  compatOf agreement mismatches (sampled): ' + mismatches);
});

/* ---- 2b: what conflicts is "clears" credit made of? (forks only) ---- */
console.log('\n=== clears-credit composition (fork candidates): ruleIds of resolved verdicts ===');
var ruleCounts = {};
var forks = C.PARTS.filter(function(p){ return p.cat === 'fork'; });
baselines.forEach(function(base){
  if(!base.current.errors.length && !base.current.warnings.length) return;
  forks.forEach(function(p){
    var uc = U.upgradeCheck(p, base.build, deps);
    if(!uc) return;
    uc.resolvesErrors.concat(uc.resolvesWarnings).forEach(function(v){
      ruleCounts[v.ruleId] = (ruleCounts[v.ruleId] || 0) + 1;
    });
  });
});
Object.keys(ruleCounts).sort(function(a, b){ return ruleCounts[b] - ruleCounts[a]; }).forEach(function(r){
  console.log('  ' + r + ': ' + ruleCounts[r]);
});
