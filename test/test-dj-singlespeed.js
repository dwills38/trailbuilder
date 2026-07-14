'use strict';
/* =============================================================================
   DJ / SINGLE-SPEED tests (2026-07-13 architecture pass; UPDATED at DJ go-live
   2026-07-14 — Douglas's word. The DJ rows now live IN the catalog (PARTS in
   src/compat.js), the cog + seatpost slots are in GROUPS, and the dj discipline
   chip is in the UI, so the old off-live dormancy/concat tests here became
   activation pinning tests. data/DJ-BMX-COMPAT-ANALYSIS.md sections 1 + 4-DJ +
   6 is the design record.)

   Three jobs:
   1. PINNING — checkBuild never reads driveMode (only slotRequired does), the
      geared MTB defaults are untouched, and no ss-* rule can fire on an
      all-geared build. (The live-catalog-unchanged proof at go-live review is
      the verdict-audit-harness diff; these tests keep the invariant alive.)
   2. The single-speed surface: slotRequired drops (incl. the explicit
      brakeless decision) AND the inverted cog/seatpost requires, the
      ss-chain-width / ss-tension rules fire when tripped and stay silent
      without their fields, rule 13c (rigid seatpost diameter), and the schema
      cross-rules.
   3. Go-live: the DJ rows ARE live, the golden DMR Sect build checks clean and
      counts COMPLETE against the live catalog, and the sample-build price
      bands deliberately exclude dj frames.
   ========================================================================== */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
var S = require('../src/schema.js');

/** @param {string} key @returns {any} */
function slotByKey(key){
  var s = C.SLOTS.filter(function(x){ return x.key === key; })[0];
  if(!s) throw new Error('unknown slot: ' + key);
  return s;
}
/** @param {{errors:any[],warnings:any[],infos:any[]}} r @returns {string[]} */
function allRuleIds(r){
  return r.errors.concat(r.warnings).concat(r.infos).map(function(v){ return v.ruleId; });
}

/* ---- 1. PINNING: driveMode changes no verdict --------------------------- */

test('checkBuild is driveMode-blind: identical verdicts with and without the flag', function(){
  // A full geared build around the same frame twice - one copy untouched, one
  // carrying driveMode:'single-speed'. checkBuild must return IDENTICAL
  // verdict sets: the discriminator feeds slotRequired only, never a verdict.
  var build = B({ frame:'fr-raaw-jibb', fork:'fk-rockshox-zeb-ultimate-29-170',
    shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275',
    chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle' });
  var flagged = Object.assign({}, build);
  flagged.frame = /** @type {any} */ (Object.assign({}, part('fr-raaw-jibb'), { driveMode:'single-speed' }));
  var a = C.checkBuild(build), b = C.checkBuild(flagged);
  eq(JSON.stringify(a.errors.map(C.verdictKey)), JSON.stringify(b.errors.map(C.verdictKey)), 'errors identical');
  eq(JSON.stringify(a.warnings.map(C.verdictKey)), JSON.stringify(b.warnings.map(C.verdictKey)), 'warnings identical');
  eq(JSON.stringify(a.infos.map(C.verdictKey)), JSON.stringify(b.infos.map(C.verdictKey)), 'infos identical');
});

test('driveMode/dropoutType live ONLY on dj-discipline frames; geared defaults stand', function(){
  // Activation ground truth (was a zero-rows dormancy test pre-go-live): the
  // single-speed fields exist exclusively on the DJ rows - no geared MTB frame
  // grew either field on the way live.
  C.PARTS.forEach(function(p){
    if(p.cat === 'frame' && (p.disciplines || []).indexOf('dj') < 0){
      ok(!('driveMode' in p), p.id + ' must not carry driveMode (non-DJ catalog is geared)');
      ok(!('dropoutType' in p), p.id + ' must not carry dropoutType');
    }
  });
  // The five single-speed-only DJ frames carry the flag; the four
  // geared-convertible DJ frames (Jackal, P.3, Zircus, Absolut) omit it.
  ['fr-kona-shonky','fr-dmr-sect','fr-marin-alcatraz','fr-chromag-monk','fr-octaneone-void']
    .forEach(function(id){ eq(/** @type {any} */ (part(id)).driveMode, 'single-speed', id); });
  ['fr-santacruz-jackal','fr-specialized-p3','fr-nsbikes-zircus','fr-commencal-absolut']
    .forEach(function(id){ ok(!('driveMode' in part(id)), id + ' is geared-convertible (no driveMode)'); });
  // Geared completeness defaults are untouched: every drivetrain + brake slot
  // stays required for a plain (driveMode-less) frame, and the NEW cog/seatpost
  // slots are never required for it (nor with no frame chosen at all).
  var frame = part('fr-raaw-jibb');
  ['shifter','derailleur','cassette','dropper','frontBrake','rearBrake','frontRotor','rearRotor']
    .forEach(function(k){ eq(C.slotRequired(slotByKey(k), frame), true, k + ' required for a geared frame'); });
  ['cog','seatpost'].forEach(function(k){
    eq(C.slotRequired(slotByKey(k), frame), false, k + ' never required for a geared frame');
    eq(C.slotRequired(slotByKey(k), null), false, k + ' never required in the no-frame universal default');
  });
});

test('an all-geared build can never raise an ss-* verdict', function(){
  var r = C.checkBuild(B({ frame:'fr-raaw-jibb', fork:'fk-rockshox-zeb-ultimate-29-170',
    shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275',
    chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle', frontBrake:'bk-shimano-slx-m7100',
    rearBrake:'bk-shimano-slx-m7100' }));
  allRuleIds(r).forEach(function(id){ ok(id.indexOf('ss-') !== 0, 'unexpected single-speed verdict ' + id + ' on a geared build'); });
});

/* ---- 2. slotRequired: the single-speed drops + inverted requires ---------- */

test('driveMode single-speed drops the geared-drivetrain, dropper and ALL brake slots', function(){
  var ss = /** @type {any} */ (Object.assign({}, part('fr-commencal-meta-ht-v3'), { driveMode:'single-speed' }));
  ['shifter','derailleur','cassette','dropper','frontBrake','rearBrake','frontRotor','rearRotor']
    .forEach(function(k){ eq(C.slotRequired(slotByKey(k), ss), false, k + ' must not be required (Douglas 2026-07-13: brakeless is a valid complete build)'); });
  // ...but the parts a single-speed genuinely needs stay (or become) required:
  // cog + seatpost are the INVERTED pattern - required only here.
  ['frame','fork','frontWheel','rearWheel','frontTire','rearTire','chain','crankset',
   'cog','seatpost','handlebar','stem','saddle','pedals']
    .forEach(function(k){ eq(C.slotRequired(slotByKey(k), ss), true, k + ' required on a single-speed frame'); });
});

test('a single-speed-driver rear wheel exempts the cassette slot (integrated pattern)', function(){
  var ssWheel = /** @type {any} */ ({ wheel:'26', hub:'10x135-bolt', freehub:'single-speed', rotorMount:'sixbolt', intWidth:21, maxTire:2.5 });
  eq(C.slotRequired(slotByKey('cassette'), part('fr-raaw-jibb'), ssWheel), false, 'cassette not required on a single-speed driver');
});

test('cog + seatpost are their own single-slot groups (bundle-pricing hazard guard)', function(){
  // Same buildTotals reason as bb/headset: inside a preset-bearing group their
  // price/weight would vanish whenever that group's bundle is active.
  ['cog','seatpost'].forEach(function(key){
    var g = C.GROUPS.filter(function(x){ return x.key === key; })[0];
    ok(g, key + ' group exists');
    eq(g.slots.length, 1, key + ' is a single-slot group');
    ok(!g.preset, key + ' group carries no preset');
    eq(g.slots[0].cat, key, key + ' slot draws from cat ' + key);
  });
});

/* ---- 3. Rule ss-chain-width (DJ-1) — fires when tripped, silent without --- */

test('ss-chain-width warns on a mixed 1/8 + 3/32 stack (provisional warning tier)', function(){
  // a 3/32-ring single-speed crank (the converted-MTB-drivetrain case)
  var crank332 = /** @type {any} */ (Object.assign({}, part('cr-profileracing-3piece-mtb'), { id:'cr-synthetic-ss-332', chainWidth:'3/32' }));
  var r = C.checkBuild(/** @type {any} */ ({ crankset: crank332,     // 3/32
                         cog: part('cg-generic-ss-16t'),             // 1/8
                         chain: part('ch-kmc-z410') }));             // 1/8
  eq(r.errors.length, 0, 'warning tier, never an error');
  var w = r.warnings.filter(function(v){ return v.ruleId === 'ss-chain-width'; });
  eq(w.length, 1, 'exactly one ss-chain-width warning');
  some([w[0]], '3/32', 'names the mismatched widths');
  ok(w[0].slots.indexOf('crankset') >= 0 && w[0].slots.indexOf('cog') >= 0, 'slots carry the parts involved');
});

test('ss-chain-width stays silent on a matching stack', function(){
  var r = C.checkBuild(B({ crankset:'cr-profileracing-3piece-mtb',   // 1/8
                           cog:'cg-generic-ss-16t',                  // 1/8
                           chain:'ch-kmc-z410' }));                  // 1/8
  eq(allRuleIds(r).filter(function(id){ return id === 'ss-chain-width'; }).length, 0);
});

test('ss-chain-width needs chainWidth fields (geared parts stay silent)', function(){
  var r = C.checkBuild(B({ crankset:'cr-sram-gx-eagle', chain:'ch-sram-gx-eagle' }));
  eq(allRuleIds(r).filter(function(id){ return id === 'ss-chain-width'; }).length, 0, 'no chainWidth anywhere -> silent');
});

/* ---- 4. Rule ss-tension (DJ-2) — vertical dropouts nudge, never block ---- */

test('ss-tension info fires on a vertical-dropout single-speed frame', function(){
  var f = /** @type {any} */ (Object.assign({}, part('fr-dmr-sect'), { id:'fr-synthetic-vertical', dropoutType:'vertical' }));
  var r = C.checkBuild({ frame: f });
  eq(r.errors.length, 0, 'info tier - it can always be made to work');
  eq(r.warnings.length, 0);
  var i = r.infos.filter(function(v){ return v.ruleId === 'ss-tension'; });
  eq(i.length, 1);
  some([i[0]], 'tensioner', 'names the fix options');
});

test('ss-tension stays silent on sliding dropouts and on geared frames', function(){
  eq(allRuleIds(C.checkBuild(/** @type {any} */ ({ frame: part('fr-dmr-sect') })))    // sliding
    .filter(function(id){ return id === 'ss-tension'; }).length, 0, 'sliding dropouts -> silent');
  var geared = /** @type {any} */ (Object.assign({}, part('fr-raaw-jibb'), { dropoutType:'vertical' }));
  eq(allRuleIds(C.checkBuild({ frame: geared }))                                  // vertical but geared
    .filter(function(id){ return id === 'ss-tension'; }).length, 0, 'vertical + geared -> silent (a derailleur tensions the chain)');
});

/* ---- 5. Geared-rule suppression: a single-speed chain stays out of rule 3 - */

test('a single-speed chain never joins the one-system set (no "undefined" verdicts)', function(){
  var r = C.checkBuild(B({ shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle',
    cassette:'ca-sram-xg1275', chain:'ch-kmc-z410' }));
  eq(r.errors.filter(function(v){ return v.ruleId === 'drivetrain-system'; }).length, 0,
    'the width-class chain carries no indexed-system identity');
  r.errors.concat(r.warnings).concat(r.infos).forEach(function(v){
    ok(String(v).indexOf('undefined') < 0, 'clean message: ' + v);
  });
});

test('rule 6 honestly errors a cassette on a single-speed driver', function(){
  var r = C.checkBuild(B({ cassette:'ca-sram-xg1275', rearWheel:'rw-halo-combat-26-ss' }));
  var e = r.errors.filter(function(v){ return v.ruleId === 'freehub'; });
  eq(e.length, 1, 'exact-match freehub error');
  some([e[0]], 'Single-speed');   // the LABELS display form ('single-speed' -> 'Single-speed')
});

/* ---- 6. Rule 13c: rigid seatpost diameter (the rule-13 twin, live at go-live) */

test('seatpost-diameter errors a too-big post (bigger cannot fit smaller)', function(){
  var fat = /** @type {any} */ (Object.assign({}, part('sp-thomson-elite-272'), { id:'sp-synthetic-309', diameter:30.9 }));
  var r = C.checkBuild(/** @type {any} */ ({ frame: part('fr-dmr-sect'), seatpost: fat }));   // 30.9 into 27.2
  var e = r.errors.filter(function(v){ return v.ruleId === 'seatpost-diameter'; });
  eq(e.length, 1, 'exactly one seatpost-diameter error');
  some([e[0]], '27.2', 'names the seat tube');
});

test('seatpost-shim warns on a smaller post in a bigger tube (never a false red)', function(){
  var r = C.checkBuild(B({ frame:'fr-specialized-p3', seatpost:'sp-thomson-elite-272' }));  // 27.2 into 30.9
  eq(r.errors.filter(function(v){ return v.ruleId === 'seatpost-diameter'; }).length, 0, 'not an error');
  var w = r.warnings.filter(function(v){ return v.ruleId === 'seatpost-shim'; });
  eq(w.length, 1, 'reducing-shim warning');
  some([w[0]], 'shim', 'names the shim fix');
});

test('an exact-diameter seatpost is silent', function(){
  var r = C.checkBuild(B({ frame:'fr-dmr-sect', seatpost:'sp-thomson-elite-272' }));        // 27.2 into 27.2
  eq(allRuleIds(r).filter(function(id){ return id.indexOf('seatpost-') === 0; }).length, 0);
});

/* ---- 7. Schema cross-rules ------------------------------------------------ */

/** @param {any} p @returns {string[]} */
function probs(p){
  return S.validatePart(p, S._ctx({ PARTS: C.PARTS, SLOTS: C.SLOTS }));
}

test('a chain with neither identity (no system/speeds, no chainWidth) is caught', function(){
  some(probs({ id:'ch-acme-mystery', cat:'chain', brand:'Acme', model:'Mystery', price:10 }), 'chainWidth');
});
test('a geared chain missing speeds is still caught', function(){
  some(probs({ id:'ch-acme-half', cat:'chain', brand:'Acme', model:'Half', price:10, system:'sram-eagle' }), 'speeds');
});
test('a single-speed chain (chainWidth only) is valid data', function(){
  eq(probs(part('ch-kmc-z410')).length, 0, 'the KMC Z410 shape validates');
});
test('a geared crankset missing ringStd is still caught (cross-rule)', function(){
  var p = /** @type {any} */ (Object.assign({}, part('cr-sram-gx-eagle'))); delete p.ringStd;
  some(probs(p), 'ringStd');
});
test('a single-speed crankset (chainWidth, no speeds/ringStd) is valid data', function(){
  eq(probs(part('cr-profileracing-3piece-mtb')).length, 0);
});
test('a cassette can never carry the single-speed freehub token', function(){
  some(probs(Object.assign({}, part('ca-sram-xg1275'), { freehub:'single-speed' })), 'single-speed');
});
test('driveMode outside the vocab is caught', function(){
  some(probs(Object.assign({}, part('fr-dmr-sect'), { driveMode:'fixie' })), 'driveMode');
});

/* ---- 8. Go-live: the DJ rows are LIVE ------------------------------------- */

test('the DJ dataset is live: every row resolves in PARTS and carries the dj discipline', function(){
  var djIds = ['fr-santacruz-jackal','fr-specialized-p3','fr-kona-shonky','fr-dmr-sect',
    'fr-nsbikes-zircus','fr-commencal-absolut','fr-marin-alcatraz','fr-chromag-monk',
    'fr-octaneone-void','fk-rockshox-pike-dj-26-100','fk-marzocchi-bomber-dj-26-100',
    'fk-manitou-circus-expert-26-100','fk-manitou-circus-expert-26-100-straight',
    'fk-dvo-sapphire-26-100','fk-xfusion-slant-dj-26-100','cr-profileracing-3piece-mtb',
    'cg-generic-ss-16t','ch-kmc-z410','fw-halo-combat-26-15x100','rw-halo-combat-26-ss',
    'ti-maxxis-dth-26-23','ti-kenda-krad-26-23','ti-schwalbe-tabletop-26-225',
    'hb-answer-protaper','sp-thomson-elite-272'];
  djIds.forEach(function(id){
    ok((part(id).disciplines || []).indexOf('dj') >= 0, id + ' is live and tagged dj');
  });
  // ...and the dj tag set is exactly this list (no stray dj rows entered elsewhere).
  var live = C.PARTS.filter(function(p){ return (p.disciplines || []).indexOf('dj') >= 0; })
    .map(function(p){ return p.id; }).sort();
  eq(JSON.stringify(live), JSON.stringify(djIds.slice().sort()), 'the dj-tagged set is exactly the go-live 25');
});

test('the sample-build price bands exclude dj frames (theme scope, not a fit rule)', function(){
  // The generator plan is a geared-MTB showcase: on a single-speed frame it
  // would ship no cog/seatpost (incomplete), and on a geared-convertible 26in
  // frame the only 26in rear wheel is a single-speed driver. dh/trail/xc/mullet
  // themes already exclude dj frames by their own filters.
  var dj = part('fr-dmr-sect'), geared = part('fr-raaw-jibb');
  ['budget','mid','high'].forEach(function(key){
    var theme = C.SAMPLE_THEMES.filter(function(t){ return t.key === key; })[0];
    ok(theme, key + ' theme exists');
    eq(theme.frame(/** @type {any} */ (dj)), false, key + ' band excludes a dj frame');
    eq(theme.frame(/** @type {any} */ (geared)), true, key + ' band keeps a geared frame');
  });
});

/* ---- 9. Golden DJ bike: a whole real LIVE build checks clean + complete --- */

test('golden DJ build (DMR Sect single-speed, rear-brake-only) - zero errors, zero warnings, complete', function(){
  var build = B({
    frame:'fr-dmr-sect',                       // 10x135 bolt, BSA73, tapered, single-speed
    fork:'fk-rockshox-pike-dj-26-100',         // the verified Pike DJ - 15x100, tapered
    frontWheel:'fw-halo-combat-26-15x100',
    rearWheel:'rw-halo-combat-26-ss',
    frontTire:'ti-maxxis-dth-26-23',
    rearTire:'ti-kenda-krad-26-23',
    crankset:'cr-profileracing-3piece-mtb',    // 1/8, 24mm spindle
    bb:'bb-raceface-bsa68-24mm',               // BSA68/73 one-SKU equivalence
    cog:'cg-generic-ss-16t',                   // 1/8
    chain:'ch-kmc-z410',                       // 1/8
    rearBrake:'bk-shimano-slx-m7100',          // PM, rear-only build
    rearRotor:'ro-sram-hs2-180-6b',            // sixbolt, 180 <= 203
    handlebar:'hb-answer-protaper',            // 31.8
    stem:'st-pnw-range-318',                   // 31.8
    grips:'gr-odi-longneck-v21',
    seatpost:'sp-thomson-elite-272',           // 27.2 exact
    saddle:'sa-wtb-silverado',
    pedals:'pd-oneup-composite'
  });
  var r = C.checkBuild(build);
  eq(r.errors.map(String).join('\n'), '', 'zero errors');
  eq(r.warnings.map(String).join('\n'), '', 'zero warnings');
  // Complete per slotRequired: every required slot (after the hardtail +
  // single-speed + brakeless drops, and WITH the inverted cog/seatpost
  // requires) is filled. Sanity-pin the two new slots as required here so this
  // golden test would fail if the requires regressed to never-required.
  eq(C.slotRequired(slotByKey('cog'), build.frame), true, 'cog required on the Sect');
  eq(C.slotRequired(slotByKey('seatpost'), build.frame), true, 'seatpost required on the Sect');
  var rw = C.effectiveWheel(build, 'rear');
  C.SLOTS.forEach(function(s){
    if(C.slotRequired(s, build.frame, rw)) ok(build[s.key], 'required slot ' + s.key + ' is filled');
  });
});
