'use strict';
/* =============================================================================
   Road/gravel golden builds — whole real bikes through checkRoadBuild
   (OFF-LIVE). A 2x AXS road build, a 1x XPLR gravel build, a 1x Ekar/N3W
   gravel build and a 2x Shimano Ultegra Di2 road build (now that
   fd-shimano-ultegra-r8150 exists — road-5 wave) must all check clean AND
   count as complete; a deliberately-wrong build must fail on every planted
   conflict. Plus dataset sanity and the off-live containment guard.
   ========================================================================== */
var fs = require('fs');
var path = require('path');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;
var ROAD = require('../src/compat-road.js');
var SR = require('../src/schema-road.js');
var SG = require('../src/schema-gravel.js');
var RD = require('../data/road.js');
var GD = require('../data/gravel.js');

/** @param {string} id @returns {any} */
function rp(id){
  var p = RD.ROAD_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown road part id: ' + id);
  return p;
}
/** @param {string} id @returns {any} */
function gp(id){
  var p = GD.GRAVEL_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown gravel part id: ' + id);
  return p;
}
/** Every roadSlotRequired slot filled? @param {Object.<string, any>} build */
function assertComplete(build){
  ROAD.ROAD_SLOTS.forEach(function(/** @type {any} */ s){
    if(ROAD.roadSlotRequired(s, build)) ok(build[s.key], 'required slot ' + s.key + ' is filled');
  });
}
/** @param {any} r @returns {string} */
function describeConflicts(r){
  return r.errors.concat(r.warnings).map(function(/** @type {any} */ v){ return v.ruleId + ': ' + v.msg; }).join(' | ');
}

/* ---- dataset sanity -------------------------------------------------------- */
test('road+gravel datasets: unique ids, engine-known categories', function(){
  /* dropbar-cleanup-1 item 3: gravel used to lump cat:'derailleur' for BOTH
     front and rear derailleurs while road split frontderailleur/
     rearderailleur (a known dataset divergence this list used to paper
     over with an extra 'derailleur' entry). gravel now matches road's split
     (its gfd-/grd- id prefixes already distinguished them, only the cat
     field was lumped), so every cat in both datasets maps to a real
     ROAD_SLOTS entry — no manual seed needed. */
  /** @type {Object.<string, boolean>} */ var knownCats = {};
  ROAD.ROAD_SLOTS.forEach(function(/** @type {any} */ s){ knownCats[s.cat] = true; });
  /** @type {Object.<string, boolean>} */ var seen = {};
  RD.ROAD_PARTS.concat(GD.GRAVEL_PARTS).forEach(function(/** @type {any} */ p){
    ok(!seen[p.id], 'duplicate id across the two datasets: ' + p.id); seen[p.id] = true;
    ok(knownCats[p.cat], p.id + ' category "' + p.cat + '" maps to no ROAD_SLOTS slot');
    ok(typeof p.price === 'number' && p.price >= 0, p.id + ' price');
    ok(typeof p.brand === 'string' && typeof p.model === 'string', p.id + ' identity');
  });
});

test('vocab discipline: wheel + freehub tokens stay inside ROAD_VOCAB (never an MTB token)', function(){
  RD.ROAD_PARTS.concat(GD.GRAVEL_PARTS).forEach(function(/** @type {any} */ p){
    var wheels = p.wheel == null ? [] : (Array.isArray(p.wheel) ? p.wheel : [p.wheel]);
    wheels.forEach(function(/** @type {string} */ w){
      ok(ROAD.ROAD_VOCAB.wheel.indexOf(w) >= 0, p.id + ' wheel "' + w + '" not a road/gravel token');
    });
    if(p.cat === 'cassette')
      ok(ROAD.ROAD_VOCAB.freehub.indexOf(p.freehub) >= 0, p.id + ' freehub "' + p.freehub + '" not a road/gravel token (MTB tokens are a false-green trap)');
  });
});

/* =============================================================================
   VOCAB-DRIFT LINT  (engine/road-vocab-lint, 2026-07-22)
   -----------------------------------------------------------------------------
   THE FAILURE MODE BEING KILLED: a vocab widening that leaves a rule SILENTLY
   INERT. src/compat-road.js's ROAD_VOCAB is documented as the UNION of what
   src/schema-road.js and src/schema-gravel.js accept, but nothing enforced
   that — it was documentation plus a partial test guard (this file used to pin
   only `wheel` + `freehub`). So when gravel-depth-3 widened
   GRAVEL_VOCAB.system with 'shimano-grx-10' and landed 4 real rows on it, the
   token reached neither ROAD_VOCAB.system nor ROAD_SYSTEM_CHAIN — and R15's
   `wantStd = ROAD_SYSTEM_CHAIN[ref.system]` quietly became `undefined`, so the
   chain-standard check did NOTHING for the whole live GRX-10 tier. Nothing
   failed. Nothing was red. Every chain, right or wrong, was green.

   The lints below are PURE FUNCTIONS OVER THEIR INPUTS precisely so the
   negative cases can hand them a doctored table and prove they actually bite —
   a lint that has never been seen to fail is not a guard, it's a comment.
   ========================================================================== */

/** The system tokens that must carry a ROAD_SYSTEM_CHAIN entry. The chain
 *  STANDARD tokens ('hg'/'flattop'/'campag') legitimately appear in the same
 *  schema vocab key, because a chain row's own `system` field carries its width
 *  class rather than a drivetrain group — so they are carved out. The carve-out
 *  is driven by ROAD_VOCAB.chainStd itself, never a hardcoded list, so a future
 *  fourth standard (e.g. an 'eagle' token) flows through automatically.
 *  @param {string[]} tokens @param {string[]} chainStds @returns {string[]} */
function drivetrainSystems(tokens, chainStds){
  return tokens.filter(function(t, i, a){
    return a.indexOf(t) === i && chainStds.indexOf(t) < 0;
  });
}

/** LINT 1 — every drivetrain-system token has a chain-standard entry, and every
 *  entry points at a real chainStd. Also checks the reverse direction (a table
 *  entry for a token no vocab declares = a dead/renamed token).
 *  @param {string[]} systemTokens @param {Object.<string, string>} chainTable
 *  @param {string[]} chainStds @returns {string[]} */
function systemChainGaps(systemTokens, chainTable, chainStds){
  /** @type {string[]} */ var gaps = [];
  drivetrainSystems(systemTokens, chainStds).forEach(function(t){
    if(!Object.prototype.hasOwnProperty.call(chainTable, t))
      gaps.push('system token "' + t + '" has NO ROAD_SYSTEM_CHAIN entry - R15 goes SILENTLY DORMANT for it');
    else if(chainStds.indexOf(chainTable[t]) < 0)
      gaps.push('system token "' + t + '" maps to "' + chainTable[t] + '", which is not a ROAD_VOCAB.chainStd token');
  });
  Object.keys(chainTable).forEach(function(t){
    if(systemTokens.indexOf(t) < 0)
      gaps.push('ROAD_SYSTEM_CHAIN entry "' + t + '" is in no system vocab (dead or renamed token)');
  });
  return gaps;
}

/** LINT 2 — every token a data row actually uses exists in the vocab it is
 *  measured against.
 *  @param {any[]} rows @param {string} field @param {string[]} allowed
 *  @param {string} label @returns {string[]} */
function dataTokenGaps(rows, field, allowed, label){
  /** @type {string[]} */ var gaps = [];
  rows.forEach(function(p){
    var v = p[field];
    if(v == null) return;
    (Array.isArray(v) ? v : [v]).forEach(function(/** @type {string} */ t){
      if(allowed.indexOf(t) < 0) gaps.push(p.id + ' ' + field + ' "' + t + '" is not in ' + label);
    });
  });
  return gaps;
}

/** Narrow a vocab array to its string tokens. The three vocab tables have three
 *  different element types — ROAD_VOCAB is strings, GRAVEL_VOCAB is
 *  Array<string|number> (speeds/minCog are numeric), schema-road's LOCAL_VOCAB
 *  is Array<string|null> (ringStdRG carries a real null) — so the parameter
 *  spans all three and the non-strings are dropped rather than coerced.
 *  @param {Array<string|number|null>} a @returns {string[]} */
function strs(a){
  return /** @type {string[]} */ (a.filter(function(v){ return typeof v === 'string'; }));
}

var ALL_PARTS = RD.ROAD_PARTS.concat(GD.GRAVEL_PARTS);
/* Union of every system vocab the two validators enforce, plus the engine's own
   reference table — the lint's input is the whole surface, not one table. */
var ALL_SYSTEM_TOKENS = strs(ROAD.ROAD_VOCAB.system)
  .concat(strs(SR.LOCAL_VOCAB.systemRoad))
  .concat(strs(SG.GRAVEL_VOCAB.system))
  .filter(function(t, i, a){ return a.indexOf(t) === i; });

test('vocab lint: EVERY system token has a ROAD_SYSTEM_CHAIN entry (no silently-dormant R15)', function(){
  var gaps = systemChainGaps(ALL_SYSTEM_TOKENS, ROAD.ROAD_SYSTEM_CHAIN, strs(ROAD.ROAD_VOCAB.chainStd));
  eq(gaps.length, 0, 'chain-standard coverage gaps:\n  ' + gaps.join('\n  '));
  /* the regression this lint was written for */
  eq(ROAD.ROAD_SYSTEM_CHAIN['shimano-grx-10'], 'hg',
    'GRX RX400 2x10 takes an HG chain - Shimano RD-RX400 page: "Compatible chain | HG-X 10-speed"');
});

/* The negative cases are HERMETIC — a self-contained miniature vocab, not the
   real tables. Two reasons: (1) they prove the lint MECHANISM regardless of
   catalog state, so they keep meaning even while real drift exists; (2) when
   real drift does appear you get ONE clear failure (the positive lint above)
   instead of the negatives failing alongside it and burying the signal.
   Verified by construction on this branch: reverting the shimano-grx-10 entry
   fails the positive lints with "has NO ROAD_SYSTEM_CHAIN entry - R15 goes
   SILENTLY DORMANT for it" plus all 4 affected row ids, and leaves these
   negatives green. */
var MINI_CHAIN_STDS = ['hg', 'flattop'];
var MINI_TABLE = {'shimano-mini-12': 'hg', 'sram-mini-12': 'flattop'};
var MINI_SYSTEMS = ['shimano-mini-12', 'sram-mini-12', 'hg', 'flattop'];

test('vocab lint NEGATIVE: the chain lint actually bites (synthetic bad inputs must fail it)', function(){
  /* baseline: the miniature is clean, so every failure below is caused by the
     one defect injected into it and nothing else */
  eq(systemChainGaps(MINI_SYSTEMS, MINI_TABLE, MINI_CHAIN_STDS).length, 0, 'the clean miniature lints clean');

  /* (a) THE REGRESSION: a widened vocab whose new token never got a chain entry
     - byte-for-byte the shape shimano-grx-10 shipped in. */
  var missing = systemChainGaps(MINI_SYSTEMS.concat(['shimano-mini-10']), MINI_TABLE, MINI_CHAIN_STDS);
  eq(missing.length, 1, 'a system token with no chain entry must be caught');
  ok(missing[0].indexOf('shimano-mini-10') >= 0 && missing[0].indexOf('SILENTLY DORMANT') >= 0,
    'and the failure must name the token AND the dormancy: ' + missing[0]);

  /* (b) an entry that maps to something which is not a chain standard at all */
  var bad = systemChainGaps(MINI_SYSTEMS,
    Object.assign({}, MINI_TABLE, {'shimano-mini-12': 'shimano-mini-12'}), MINI_CHAIN_STDS);
  eq(bad.length, 1, 'a chain entry pointing at a non-chainStd value must be caught');
  ok(bad[0].indexOf('not a ROAD_VOCAB.chainStd token') >= 0, bad[0]);

  /* (c) a stale entry for a token no vocab declares (the rename/retire case) */
  var orphan = systemChainGaps(MINI_SYSTEMS,
    Object.assign({}, MINI_TABLE, {'sram-retired-mini': 'flattop'}), MINI_CHAIN_STDS);
  eq(orphan.length, 1, 'a chain entry for an undeclared token must be caught');
  ok(orphan[0].indexOf('dead or renamed') >= 0, orphan[0]);

  /* (d) the chainStd carve-out must be driven by the passed-in standards, not a
     hardcoded list: a token that IS a chain standard is exempt, and the same
     token stops being exempt once it is no longer declared a standard. */
  eq(systemChainGaps(['hg'], {}, MINI_CHAIN_STDS).length, 0, 'a chainStd token needs no drivetrain entry');
  eq(systemChainGaps(['hg'], {}, []).length, 1, 'with no standards declared, the same token is no longer exempt');
});

test('vocab lint: every system + rearAxle token a data row uses exists in ROAD_VOCAB', function(){
  /* system: a chain row's `system` carries its chain STANDARD, so both sets are
     legal values for the field (see ROAD_VOCAB.chainStd's note). */
  var systemAllowed = strs(ROAD.ROAD_VOCAB.system).concat(strs(ROAD.ROAD_VOCAB.chainStd));
  var sysGaps = dataTokenGaps(ALL_PARTS, 'system', systemAllowed, 'ROAD_VOCAB.system + .chainStd');
  eq(sysGaps.length, 0, 'system tokens missing from the engine union table:\n  ' + sysGaps.join('\n  '));

  /* rearAxle carries BOTH sides of R2/R3's exact-match compare: a frame's
     `rearAxle` and a rear wheel's `hub`. Both must live in the same table or
     the rule is comparing across an undocumented vocab. */
  var axleAllowed = strs(ROAD.ROAD_VOCAB.rearAxle);
  var frameGaps = dataTokenGaps(ALL_PARTS.filter(function(/** @type {any} */ p){ return p.cat === 'frame'; }),
    'rearAxle', axleAllowed, 'ROAD_VOCAB.rearAxle');
  eq(frameGaps.length, 0, 'frame rearAxle tokens missing from ROAD_VOCAB:\n  ' + frameGaps.join('\n  '));
  var hubGaps = dataTokenGaps(ALL_PARTS.filter(function(/** @type {any} */ p){ return p.cat === 'rearwheel'; }),
    'hub', axleAllowed, 'ROAD_VOCAB.rearAxle (the hub side of the same compare)');
  eq(hubGaps.length, 0, 'rear hub tokens missing from ROAD_VOCAB:\n  ' + hubGaps.join('\n  '));
});

test('vocab lint NEGATIVE: the data-token lint actually bites (a synthetic out-of-vocab row must fail it)', function(){
  /* hermetic, for the same reasons as the chain-lint negatives above: synthetic
     rows against a synthetic vocab, so neither real catalog is involved. */
  var mini = ['hg', 'flattop'];
  eq(dataTokenGaps([{id: 'ok-row', system: 'hg'}], 'system', mini, 'MINI').length, 0, 'an in-vocab row lints clean');

  var gaps = dataTokenGaps([{id: 'gsft-synthetic-row', system: 'shimano-mini-8'}], 'system', mini, 'MINI');
  eq(gaps.length, 1, 'an out-of-vocab system token on a row must be caught');
  ok(gaps[0].indexOf('gsft-synthetic-row') >= 0 && gaps[0].indexOf('shimano-mini-8') >= 0,
    'and must name the offending row AND token: ' + gaps[0]);

  /* absent field = silent (a row that simply does not carry the axis is not a
     violation - the same "absence means unknown" contract the engine holds) */
  eq(dataTokenGaps([{id: 'no-system-row'}], 'system', mini, 'MINI').length, 0, 'an absent field is not a gap');

  /* array-valued fields are checked element-wise (fork.wheel is an array in the
     gravel dataset - the lint must not pass a whole array off as one token) */
  var arr = dataTokenGaps([{id: 'arr-row', wheel: ['700c', '650b-mini-bogus']}], 'wheel', ['700c'], 'MINI');
  eq(arr.length, 1, 'each element of an array-valued field is checked');
  ok(arr[0].indexOf('650b-mini-bogus') >= 0, arr[0]);
});

/* ---- FINDING A guard: 'sram-apex-mech-12' is XPLR/Flattop ONLY -------------
   ROAD_SYSTEM_CHAIN maps this token to 'flattop'. That is correct for all four
   rows using it today (SRAM Apex XPLR), but the token is NAMED for the whole
   mechanical Apex tier and Apex EAGLE is the other half of it — and Apex Eagle
   takes an EAGLE chain. sram.com's own Apex Eagle rear-derailleur page
   (RD-APX-152-D1) specs "Chain Technology | Eagle" and its features say "Use
   with Eagle chain"; the same page gives the tier's mechanical discriminator,
   "RD Minimum (Cassette) | 50" / "Compatible with 50T and 52T Eagle cassettes",
   against Apex XPLR's 44T ceiling. Filing an Apex Eagle row under this token
   would give a false "won't fit" against its correct Eagle chain AND a false
   "fits" for a Flattop chain. This test does NOT split the token — that is a
   coordinator/Douglas call and is queued; it pins the precondition that makes
   today's single mapping honest, and fails loudly the moment it stops holding. */
/** LINT 3 — Eagle-tier rows hiding under a Flattop-mapped token. Pure over its
 *  input, like the two lints above, so the negative case can prove it bites.
 *  @param {any[]} rows @returns {string[]} */
function apexEagleGaps(rows){
  /** @type {string[]} */ var gaps = [];
  rows.filter(function(p){ return p.system === 'sram-apex-mech-12'; }).forEach(function(p){
    /* mechanical discriminator: SRAM's Apex Eagle floor is a 50T cassette,
       against Apex XPLR's 44T ceiling. */
    if(typeof p.maxCog === 'number' && p.maxCog >= 50)
      gaps.push(p.id + ' carries maxCog ' + p.maxCog + 'T (>= SRAM\'s 50T Apex Eagle floor), so it is an Apex EAGLE part. '
        + 'Apex Eagle takes an EAGLE chain, not Flattop (sram.com RD-APX-152-D1: "Chain Technology | Eagle"). '
        + 'Give it its OWN system token + ROAD_SYSTEM_CHAIN entry + an "eagle" chainStd token before entering it.');
    /* naming discriminator: catches rows carrying no cog figure at all
       (shifters, cranks) - SRAM brands the tier "Apex Eagle" explicitly. */
    var name = [p.id, p.family, p.model].filter(function(v){ return typeof v === 'string'; }).join(' ');
    if(/eagle/i.test(name))
      gaps.push(p.id + ' is named as an Eagle-tier part but is filed under sram-apex-mech-12, which R15 maps to a '
        + 'Flattop chain. Apex Eagle needs its own system token first.');
  });
  return gaps;
}

test('FINDING A guard: every sram-apex-mech-12 row is XPLR/Flattop, never Apex Eagle', function(){
  var rows = ALL_PARTS.filter(function(/** @type {any} */ p){ return p.system === 'sram-apex-mech-12'; });
  ok(rows.length > 0, 'the token is in use - if this ever hits 0, retire the token rather than leaving it dangling');
  eq(ROAD.ROAD_SYSTEM_CHAIN['sram-apex-mech-12'], 'flattop', 'the mapping this guard protects');
  var gaps = apexEagleGaps(ALL_PARTS);
  eq(gaps.length, 0, 'Eagle-tier rows filed under a Flattop-mapped token:\n  ' + gaps.join('\n  '));
});

test('FINDING A guard NEGATIVE: the Apex-Eagle guard actually bites (synthetic Eagle rows must fail it)', function(){
  /* hermetic: synthetic rows only, both real catalogs untouched. */
  /* (a) the cassette/RD shape - caught by SRAM's own 50T Apex Eagle floor.
     Deliberately named with NO "Eagle" anywhere, so this proves the mechanical
     discriminator stands on its own: an Eagle-tier row filed under a neutral
     product name is still caught. */
  var byCog = apexEagleGaps([{id: 'gca-synthetic-apex-1052', system: 'sram-apex-mech-12',
    family: 'sram-apex-mech', model: 'SRAM PG-1231', maxCog: 52}]);
  eq(byCog.length, 1, 'a 52T cassette under this token is an Apex Eagle part and must be caught');
  ok(byCog[0].indexOf('50T Apex Eagle floor') >= 0 && byCog[0].indexOf('EAGLE chain') >= 0,
    'and must say WHY it is wrong + what to do: ' + byCog[0]);

  /* (b) the shifter/crank shape - no cog figure at all, caught by the name */
  var byName = apexEagleGaps([{id: 'grd-synthetic-apex-eagle-rd', system: 'sram-apex-mech-12',
    family: 'sram-apex-eagle', model: 'SRAM Apex Eagle RD'}]);
  ok(byName.length >= 1, 'an Eagle-named row carrying no maxCog must still be caught');
  ok(byName.some(function(/** @type {string} */ g){ return g.indexOf('own system token') >= 0; }), byName.join(' | '));

  /* (c) a genuine XPLR row of the same tier must NOT be flagged - a false
     "won't fit" on the entry path is as bad as a miss */
  eq(apexEagleGaps([{id: 'gca-synthetic-apex-xplr-1144', system: 'sram-apex-mech-12',
    family: 'sram-apex-xplr-cassette', model: 'SRAM PG-1231', maxCog: 44}]).length, 0,
    'a real Apex XPLR row (44T, no Eagle branding) stays clean');

  /* (d) rows under OTHER system tokens are out of scope entirely */
  eq(apexEagleGaps([{id: 'gca-synthetic-eagle-other', system: 'sram-xplr-12',
    model: 'Eagle something', maxCog: 52}]).length, 0, 'the guard is scoped to sram-apex-mech-12 only');
});

/* ---- off-live containment (CLAUDE.md hard rule 3) -------------------------- */
test('OFF-LIVE: nothing the site serves loads compat-road.js or the road/gravel data', function(){
  var root = path.join(__dirname, '..');
  ['index.html', 'bmx.html'].forEach(function(page){
    var html = fs.readFileSync(path.join(root, page), 'utf8');
    ok(html.indexOf('compat-road') < 0, page + ' must not load the road engine');
    ok(html.indexOf('data/road.js') < 0 && html.indexOf('data/gravel.js') < 0, page + ' must not load road/gravel data');
  });
});

/* ---- golden 1: 2x SRAM RED AXS road build (complete, conflict-free) -------- */
test('golden: S-Works Tarmac SL8 / RED AXS 2x12 road build is complete and conflict-free', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: rp('fr-specialized-sworks-tarmac-sl8'),
    fork: rp('fk-specialized-tarmac-sl8'),
    frontWheel: rp('fw-zipp-303-firecrest-tld'),
    rearWheel: rp('rw-zipp-303-firecrest-tld'),
    frontTire: rp('ti-continental-gp5000stre-28'),
    rearTire: rp('ti-continental-gp5000stre-28'),
    shifter: rp('sh-sram-red-axs'),
    frontDerailleur: gp('gfd-sram-force-axs-fd'),   // the only AXS-road FD row lives in the gravel dataset — one shared engine, one shared parts pool
    rearDerailleur: rp('rd-sram-red-axs'),
    cassette: rp('cs-sram-red-xg1290-1033'),
    chain: rp('ch-sram-red-flattop'),
    crankset: rp('cr-sram-red-axs-crank'),
    bb: gp('gbb-sram-dub-bsa'),
    frontBrake: rp('br-sram-red-axs'),
    rearBrake: rp('br-sram-red-axs'),
    frontRotor: rp('ro-sram-paceline-160'),
    rearRotor: rp('ro-sram-paceline-160'),
    handlebar: rp('hb-zipp-sl70-aero'),
    stem: rp('st-zipp-sl-sprint'),
    bartape: rp('bt-fizik-vento-microtex-tacky'),
    seatpost: rp('sp-specialized-tarmac-sl8'),
    saddle: rp('sd-fizik-antares-versus-r3'),
    pedals: rp('pd-look-keo-blade-carbon')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  assertComplete(build);
  var t = ROAD.roadBuildTotals(build);
  ok(t.price > 0 && t.weight > 0, 'totals accumulate');
});

/* ---- golden 2: 1x SRAM Rival XPLR gravel build (complete, conflict-free) ---- */
test('golden: Crux / Rival XPLR AXS 1x12 gravel build is complete and conflict-free', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: gp('gfr-specialized-crux-comp-carbon'),
    fork: gp('gfk-specialized-crux-carbon-rigid'),
    frontWheel: gp('gfw-dtswiss-g1800-700c'),
    rearWheel: gp('grw-dtswiss-g1800-700c'),
    frontTire: gp('gti-wtb-riddler-700x37'),
    rearTire: gp('gti-wtb-riddler-700x37'),
    shifter: gp('gsft-sram-rival-xplr-axs'),
    rearDerailleur: gp('grd-sram-rival-xplr-axs-rd'),
    cassette: gp('gca-sram-xg1251-1044'),
    chain: gp('gch-sram-xplr-flattop-12'),
    crankset: gp('gcr-sram-rival-xplr-axs-1x'),
    bb: gp('gbb-sram-dub-bsa'),
    frontBrake: gp('gbr-sram-rival-axs-brake'),
    rearBrake: gp('gbr-sram-rival-axs-brake'),
    frontRotor: gp('gro-shimano-rt-cl800-160-cl'),
    rearRotor: gp('gro-shimano-rt-cl800-160-cl'),
    handlebar: gp('ghb-salsa-cowbell-318'),
    stem: gp('gst-zipp-scsl-100'),
    bartape: gp('gtp-fizik-vento-microtex-tacky'),
    seatpost: gp('gsp-zipp-scsl-272'),
    saddle: gp('gsa-wtb-volt')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  assertComplete(build);   // no frontDerailleur: a 1x crank never requires one
});

/* ---- golden 3: 1x Campagnolo Ekar / N3W gravel build (complete, conflict-free) */
test('golden: Aspero / Ekar 13sp N3W gravel build is complete and conflict-free (BB advisory info only)', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: gp('gfr-cervelo-aspero-disc'),
    fork: gp('gfk-cervelo-aspero-carbon'),
    frontWheel: gp('gfw-campagnolo-levante-700c'),
    rearWheel: gp('grw-campagnolo-levante-700c'),
    frontTire: gp('gti-wtb-byway-700x40'),
    rearTire: gp('gti-wtb-byway-700x40'),
    shifter: gp('gsft-campagnolo-ekar'),
    rearDerailleur: gp('grd-campagnolo-ekar-rd'),
    cassette: gp('gca-campagnolo-ekar-936'),
    chain: gp('gch-campagnolo-ekar-13'),
    crankset: gp('gcr-campagnolo-ekar-1x'),
    frontBrake: gp('gbr-campagnolo-ekar-brake'),
    rearBrake: gp('gbr-campagnolo-ekar-brake'),
    frontRotor: gp('gro-shimano-rt-cl800-160-cl'),
    rearRotor: gp('gro-shimano-rt-cl800-160-cl'),
    handlebar: gp('ghb-salsa-cowchipper-318'),
    stem: gp('gst-ritchey-wcs-4axis-100'),
    seatpost: gp('gsp-cannondale-carbon-272'),
    saddle: gp('gsa-fizik-argo-tempo')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  eq(r.infos.filter(function(/** @type {any} */ v){ return v.ruleId === 'rg-bb-advisory'; }).length, 1,
    'no Ultra-Torque BB row exists yet, so the sold-separately nudge fires (an info, not a block)');
  assertComplete(build);
});

/* ---- golden: Checkpoint SL 7 / GRX RX820 1x12 gravel build — proves the
   micro-spline-road wheel gap (dropbar-cleanup-1 item 2) is closed */
test('golden: Checkpoint SL 7 / GRX RX820 1x12 gravel build is complete and conflict-free', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: gp('gfr-trek-checkpoint-sl-7'),
    fork: gp('gfk-trek-checkpoint-isospeed-carbon'),
    frontWheel: gp('gfw-shimano-grx-rx880-700c'),
    rearWheel: gp('grw-shimano-grx-rx880-700c'),
    frontTire: gp('gti-wtb-riddler-700x37'),
    rearTire: gp('gti-wtb-riddler-700x37'),
    shifter: gp('gsft-shimano-grx-rx820-1x12'),
    rearDerailleur: gp('grd-shimano-grx-rd-rx822-1x12'),
    cassette: gp('gca-shimano-grx-cs-m7100-1045'),
    chain: gp('gch-shimano-cn-m6100-12'),
    crankset: gp('gcr-shimano-grx-fc-rx820-1x'),
    bb: gp('gbb-praxis-t47-ib-shimano'),
    frontBrake: gp('gbr-shimano-grx-br-rx820'),
    rearBrake: gp('gbr-shimano-grx-br-rx820'),
    frontRotor: gp('gro-shimano-rt-cl800-160-cl'),
    rearRotor: gp('gro-shimano-rt-cl800-160-cl'),
    handlebar: gp('ghb-salsa-cowbell-318'),
    stem: gp('gst-ritchey-wcs-4axis-100'),
    seatpost: gp('gsp-thomson-elite-272'),
    saddle: gp('gsa-wtb-volt')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  assertComplete(build);   // no frontDerailleur: a 1x crank never requires one
});

/* ---- golden 4: 2x Shimano Ultegra Di2 road build — clean and complete ------ */
test('golden: Ultimate CF SLX / Ultegra Di2 checks clean and complete (fd-shimano-ultegra-r8150)', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: rp('fr-canyon-ultimate-cfslx'),
    fork: rp('fk-canyon-ultimate-cfslx'),
    frontWheel: rp('fw-dtswiss-arc1100-dicut-38'),
    rearWheel: rp('rw-dtswiss-arc1100-dicut-38'),
    frontTire: rp('ti-continental-gp5000stre-28'),
    rearTire: rp('ti-continental-gp5000stre-28'),
    shifter: rp('sh-shimano-ultegra-r8100'),
    rearDerailleur: rp('rd-shimano-ultegra-r8100'),
    frontDerailleur: rp('fd-shimano-ultegra-r8150'),
    cassette: rp('cs-shimano-ultegra-r8100-1130'),
    chain: rp('ch-shimano-ultegra-r8100'),
    crankset: rp('cr-shimano-ultegra-r8100'),
    frontBrake: rp('br-shimano-ultegra-r8100'),
    rearBrake: rp('br-shimano-ultegra-r8100'),
    frontRotor: rp('ro-shimano-rtcl800-160'),
    rearRotor: rp('ro-shimano-rtcl800-160'),
    handlebar: rp('hb-pro-vibe-superlight'),
    stem: rp('st-pro-vibe'),
    seatpost: rp('sp-canyon-vcls-cp0018'),
    saddle: rp('sd-selleitalia-slr-boost')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  assertComplete(build);
});

/* ---- known-bad build ------------------------------------------------------- */
test('known-bad build fails on every planted conflict', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: rp('fr-trek-emonda-slr'),                       // 700c, maxTire 28, proprietary post
    frontWheel: gp('gfw-hunt-650b-adventurecarbon-disc'),  // 650b vs the 700c rear -> rg-wheel-size
    rearWheel: rp('rw-shimano-c50-r9270'),                 // hg-l2
    rearTire: rp('ti-continental-gp5000stre-32'),          // 32mm over the Emonda's 28mm -> rg-tire-clearance
    cassette: rp('cs-sram-red-xg1290-1033'),               // xdr on the hg-l2 wheel -> rg-freehub
    shifter: rp('sh-shimano-da-r9200'),                    // di2-wired Shimano...
    rearDerailleur: rp('rd-sram-red-axs'),                 // ...vs a wireless SRAM mech -> rg-drivetrain-system + rg-actuation
    chain: rp('ch-shimano-ultegra-r8100'),                 // hg chain on the sram-axs-road cassette -> rg-chain-std
    frontRotor: gp('gro-sram-centerline-160-6b'),          // 6-bolt on the CL 650b hub -> rg-rotor-mount adapter warning
    seatpost: rp('sp-zipp-sl-speed')                       // round post in the proprietary bore -> rg-seatpost
  };
  var r = ROAD.checkRoadBuild(build);
  /** @param {string} ruleId @param {'errors'|'warnings'} tier */
  function planted(ruleId, tier){
    ok(r[tier].some(function(/** @type {any} */ v){ return v.ruleId === ruleId; }), ruleId + ' must fire as a ' + tier.slice(0, -1));
  }
  planted('rg-wheel-size', 'errors');
  planted('rg-freehub', 'errors');
  planted('rg-drivetrain-system', 'errors');
  planted('rg-actuation', 'errors');
  planted('rg-chain-std', 'errors');
  planted('rg-seatpost', 'errors');
  planted('rg-tire-clearance', 'warnings');
  planted('rg-rotor-mount', 'warnings');
  ok(r.errors.length >= 6, 'at least the six planted errors are present');
});
