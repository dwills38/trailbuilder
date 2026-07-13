'use strict';
/* =============================================================================
   VERDICT-AUDIT HARNESS  (node tools/verdict-audit-harness.js)
   -----------------------------------------------------------------------------
   Hunts for WRONG compatibility verdicts across the whole catalog: a false
   "fits" (checkBuild is green/clean but the real world says no) or a false
   "won't fit" (a flag that a real mechanic would wave through). Report-only -
   it never mutates the catalog or the engine.

   It runs five independent probes and prints what each found. The findings it
   surfaced on 2026-07-09 are written up in tools/VERDICT-AUDIT-2026-07-09.md;
   regression cases live in test/test-verdict-audit.js.

   Probes:
     A. NAME-vs-FIELD    product name (brand+model) vs the fields checkBuild reads
     B. PRESETS          every curated preset's own fills must be conflict-free
     C. ASSEMBLE         a realistic complete build per frame -> unexpected errors
     D. ADVERSARIAL      builds that SHOULD clash -> the engine must flag them
     E. ROTOR-MAX        would the STANDARD front rotor falsely trip rule 10?
   ========================================================================== */
var path = require('path');
var C = require(path.join(__dirname, '..', 'src', 'compat.js'));
var P = C.PARTS, WC = C.WHEEL_CONFIG;
function cat(c){ return P.filter(function(p){ return p.cat === c; }); }
function byId(id){ var p = C.byId(id); if(!p) throw new Error('no part ' + id); return p; }
function hr(t){ console.log('\n======== ' + t + ' ========'); }

/* -- A. name vs field ------------------------------------------------------ */
hr('A. NAME vs FIELD (product name disagrees with a verdict-driving field)');
(function(){
  var hits = 0;
  P.forEach(function(p){
    var t = (p.brand + ' ' + p.model).toLowerCase();
    function f(why){ hits++; console.log('  [' + p.cat + '] ' + p.id + ' -> ' + why); }
    if(p.cat === 'fork'){
      var dc = /\bboxxer\b|fox\s*40|dorado|emerald|bomber\s*58|dual[- ]?crown|\bdc\b|\bdh\b/.test(t);
      var sc = /\bzeb\b|\blyrik\b|\bpike\b|fox\s*3[468]\b|\bsid\b|mezzer|\bhelm\b|mattoc|\bz1\b|selva/.test(t);
      if(dc && p.steerer !== 'straight-dc') f('DC-name but steerer=' + p.steerer);
      if(sc && p.steerer !== 'tapered') f('SC-name but steerer=' + p.steerer);
    }
    if(p.cat === 'shifter' || p.cat === 'derailleur'){
      if(/\baxs\b|electronic|wireless/.test(t) && p.actuation !== 'electronic') f('AXS-name but actuation=' + p.actuation);
    }
    if(p.cat === 'tire'){
      var a29 = /\b29(x|er|\b)/.test(t), a27 = /27\.5|650b/.test(t);
      if(a29 && !a27 && p.wheel !== '29') f('name 29 but wheel=' + p.wheel);
      if(a27 && !a29 && p.wheel !== '275') f('name 27.5 but wheel=' + p.wheel);
    }
  });
  console.log('  => ' + hits + ' flag(s)');
})();

/* -- B. presets internally compatible -------------------------------------- */
hr('B. PRESETS (a curated bundle must be conflict-free on its own fills)');
(function(){
  var bad = 0;
  P.filter(function(p){ return p.fills; }).forEach(function(pr){
    var build = {};
    Object.keys(pr.fills).forEach(function(s){ build[s] = byId(pr.fills[s]); });
    var r = C.checkBuild(build);
    if(r.errors.length || r.warnings.length){
      bad++;
      console.log('  ' + pr.id + ' (' + pr.brand + ' ' + pr.model + ')');
      r.errors.forEach(function(e){ console.log('    ERROR [' + e.ruleId + '] ' + e.msg); });
      r.warnings.forEach(function(w){ console.log('    WARN  [' + w.ruleId + '] ' + w.msg); });
    }
  });
  console.log('  => ' + bad + ' preset(s) with internal conflicts');
})();

/* -- C. realistic build per frame ------------------------------------------ */
hr('C. ASSEMBLE (a sensible complete build per frame -> unexpected ERRORS)');
(function(){
  function pickDrivetrain(frame){
    var order = ['sram-eagle', 'shimano-12', 'sram-transmission'];
    for(var s = 0; s < order.length; s++){
      var sys = order[s];
      if(sys === 'sram-transmission' && !frame.udh) continue;
      var sh = cat('shifter').filter(function(p){ return p.system === sys; });
      var dr = cat('derailleur').filter(function(p){ return p.system === sys; });
      var ca = cat('cassette').filter(function(p){ return p.system === sys; });
      var ch = cat('chain').filter(function(p){ return p.system === sys; });
      var cr = cat('crankset').filter(function(p){ return p.speeds === 12; });
      if(!(sh.length && dr.length && ca.length && ch.length && cr.length)) continue;
      var pair = null;
      sh.forEach(function(S){ dr.forEach(function(D){ if(!pair && S.actuation === D.actuation) pair = [S, D]; }); });
      if(!pair) continue;
      var crank = sys === 'sram-transmission'
        ? (cr.filter(function(p){ return p.ringStd === 't-type'; })[0] || cr[0]) : cr[0];
      return { shifter: pair[0], derailleur: pair[1], cassette: ca[0], chain: ch[0], crankset: crank };
    }
    return null;
  }
  var errored = 0, clean = 0;
  cat('frame').forEach(function(fr){
    var cfg = fr.wheelConfigs[0], fs = WC[cfg].front, rs = WC[cfg].rear, b = { frame: fr };
    var forks = cat('fork').filter(function(p){ return p.wheel === fs && p.steerer === fr.headset && p.travel <= fr.maxForkTravel; });
    forks.sort(function(a, z){ return z.travel - a.travel; });
    if(forks.length) b.fork = forks[0];
    if(fr.suspension === 'full'){
      b.shock = fr.bundledShock ? C.byId(fr.bundledShock)
        : cat('shock').filter(function(p){ return p.eye === fr.shockEye && p.stroke === fr.shockStroke && p.mount === fr.shockMount && !p.oemOnly; })[0];
    }
    var dt = pickDrivetrain(fr);
    if(dt) Object.keys(dt).forEach(function(k){ b[k] = dt[k]; });
    var faxle = b.fork ? b.fork.axle : 'Boost110';
    b.frontWheel = cat('frontwheel').filter(function(p){ return p.wheel === fs && p.hub === faxle; })[0];
    b.rearWheel = cat('rearwheel').filter(function(p){ return p.wheel === rs && p.hub === fr.rearAxle && (!dt || p.freehub === dt.cassette.freehub); })[0];
    var maxT = typeof fr.maxTire === 'number' ? fr.maxTire : 99;
    b.frontTire = cat('tire').filter(function(p){ return p.wheel === fs && p.width <= maxT; })[0];
    b.rearTire = cat('tire').filter(function(p){ return p.wheel === rs && p.width <= maxT; })[0];
    if(b.fork) b.frontBrake = cat('brake').filter(function(p){ return p.mount === b.fork.brakeMount; })[0];
    b.rearBrake = cat('brake').filter(function(p){ return p.mount === fr.brakeMount; })[0];
    // rotors: respect the fork's native-mount minimum AND the picked caliper's own
    // maxRotor ceiling (rule 8b, FM calipers) so we test fit, not our own bug
    if(b.fork && b.frontWheel) b.frontRotor = cat('rotor').filter(function(p){ return p.mount === b.frontWheel.rotorMount && p.size <= b.fork.maxRotorF && (typeof b.fork.minRotorF !== 'number' || p.size >= b.fork.minRotorF) && (!b.frontBrake || typeof b.frontBrake.maxRotor !== 'number' || p.size <= b.frontBrake.maxRotor); })[0];
    if(b.rearWheel) b.rearRotor = cat('rotor').filter(function(p){ return p.mount === b.rearWheel.rotorMount && p.size <= fr.maxRotorR && (!b.rearBrake || typeof b.rearBrake.maxRotor !== 'number' || p.size <= b.rearBrake.maxRotor); })[0];
    var bars = cat('handlebar'), stems = cat('stem'), cp = null;
    bars.forEach(function(Bh){ stems.forEach(function(St){ if(!cp && Bh.clamp === St.clamp) cp = [Bh, St]; }); });
    if(cp){ b.handlebar = cp[0]; b.stem = cp[1]; }
    var drs = cat('dropper').filter(function(p){ return p.diameter <= fr.seatTube; }).sort(function(a, z){ return z.diameter - a.diameter; });
    if(drs.length) b.dropper = drs[0];
    b.saddle = cat('saddle')[0]; b.pedals = cat('pedal')[0];
    // strip undefineds
    Object.keys(b).forEach(function(k){ if(!b[k]) delete b[k]; });
    var r = C.checkBuild(b);
    if(r.errors.length){
      errored++;
      console.log('  [' + fr.id + '] ' + fr.brand + ' ' + fr.model);
      r.errors.forEach(function(e){ console.log('    ERROR [' + e.ruleId + '] ' + e.msg); });
    } else clean++;
  });
  console.log('  => ' + clean + ' clean, ' + errored + ' with errors (inspect each - most are catalog gaps, not wrong verdicts)');
})();

/* -- D. adversarial: real clashes MUST be flagged -------------------------- */
hr('D. ADVERSARIAL (builds that must clash - a MISS here is a false "fits")');
(function(){
  var cases = [
    { n: 'mullet-only frame + 29/29 tires', b: { frame: 'fr-ibis-hd6', frontTire: 'ti-maxxis-assegai-29-25-exop-mg', rearTire: 'ti-maxxis-assegai-29-25-dh-mg' }, e: 'wheel-config' },
    { n: 'XD-hub rear wheel + MicroSpline cassette', b: { frame: 'fr-raaw-jibb', rearHub: 'rh-dtswiss-350-boost148-xd', rearRim: 'rm-dtswiss-ex511-29', cassette: 'ca-shimano-xt-m8100-1051' }, e: 'freehub' },
    { n: 'Transmission derailleur + non-UDH frame (kit-less)', b: { frame: 'fr-kona-process-153', derailleur: 'dr-sram-gx-transmission' }, e: 'udh' },
    { n: '52T cassette + NX(50T) derailleur', b: { cassette: 'ca-sram-xg1275', derailleur: 'dr-sram-nx-eagle' }, e: 'cassette-capacity' },
    { n: 'AXS shifter + cable derailleur', b: { shifter: 'sft-sram-gx-eagle-axs', derailleur: 'dr-sram-gx-eagle' }, e: 'actuation' },
    { n: '34.9 dropper in 31.6 seat tube', b: { frame: 'fr-raaw-jibb', dropper: 'dp-oneup-v3-349-210' }, e: 'dropper-diameter' },
    { n: 'CL rotor on 6-bolt front hub', b: { fork: 'fk-rockshox-zeb-ultimate-29-170', frontWheel: 'fw-reserve-30-hd-29', frontRotor: 'ro-shimano-rtmt800-203-cl' }, e: 'front-rotor-interface' },
    { n: 'DH straight-dc frame + single-crown fork', b: { frame: 'fr-commencal-supreme-dh-v5', fork: 'fk-rockshox-zeb-ultimate-29-170' }, e: 'steerer' },
    { n: 'hardtail frame + rear shock', b: { frame: 'fr-commencal-meta-ht-v3', shock: 'sh-rockshox-super-deluxe-ultimate-230x65' }, e: 'hardtail-shock' },
    { n: 'IS-cup headset pressed into a ZS head tube', b: { frame: 'fr-giant-reign-advanced', headset: 'hs-canecreek-40-is41-is52' }, e: 'headset-upper' },
    { n: 'tapered headset + dual-crown (straight) fork', b: { fork: 'fk-rockshox-boxxer-ultimate-29-200', headset: 'hs-canecreek-40-zs44-zs56' }, e: 'headset-steerer' }
  ];
  var miss = 0;
  cases.forEach(function(c){
    var build = {}; Object.keys(c.b).forEach(function(k){ build[k] = byId(c.b[k]); });
    var r = C.checkBuild(build);
    var got = r.errors.map(function(v){ return v.ruleId; }).indexOf(c.e) >= 0;
    if(!got){ miss++; console.log('  MISS (false fits!): ' + c.n + ' -> expected error ' + c.e); }
  });
  console.log('  => ' + (cases.length - miss) + '/' + cases.length + ' clashes correctly flagged, ' + miss + ' missed');
})();

/* -- E. rotor-max false warning simulation --------------------------------- */
hr('E. ROTOR-MAX (would the STANDARD front rotor falsely trip rule 10?)');
(function(){
  // conservative real-world norm for the biggest rotor a rider fits by travel class
  function stdRotor(t){ return t >= 160 ? 203 : 180; }
  var fams = {};
  cat('fork').filter(function(p){ return p.maxRotorF < stdRotor(p.travel); }).forEach(function(p){
    var k = p.family || (p.brand + '-' + p.model.split(' ')[0]);
    var g = fams[k] || (fams[k] = { n: 0, v: 0, maxR: p.maxRotorF, std: stdRotor(p.travel) });
    g.n++; if(p.verified) g.v++;
  });
  var keys = Object.keys(fams).sort();
  keys.forEach(function(k){ var f = fams[k]; console.log('  ' + k + ' x' + f.n + '  maxRotorF=' + f.maxR + ' < std ' + f.std + '  (verified ' + f.v + '/' + f.n + ')'); });
  console.log('  => ' + keys.length + ' fork families would false-warn on a standard front rotor');
})();

console.log('\ndone.');
