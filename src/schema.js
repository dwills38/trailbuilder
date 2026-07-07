'use strict';
/* =============================================================================
   DATA SCHEMA + VALIDATOR  (the "bouncer at the door" for catalog data)
   -----------------------------------------------------------------------------
   Defines what a valid part looks like and rejects anything malformed BEFORE it
   can produce a wrong compatibility verdict. Used by:
     - validate.js   (CLI: node validate.js)
     - test-data.js  (the real catalog must pass)
     - test-schema.js (proves the validator actually catches bad data)

   PROVENANCE: parts may carry verified / lastChecked / source. They are optional
   and absence means "unverified" (the honest default for the current sample
   data). But a part may NOT claim verified:true without a real source URL and a
   lastChecked date that isn't in the future.
   ========================================================================== */

/** @typedef {import('./types.js').Part} Part */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').Catalog} Catalog */
/** @typedef {{type: 'number'|'string'|'bool'|'id'|'idArray'|'fills'|'enumArray'|'sizes', vocab?: string, optional?: boolean, nullable?: boolean}} FieldRule */
/** @typedef {{has: (id: string) => boolean, catOf: (id: string) => string, slotCat: Object.<string, string>, today: Date}} Ctx */

/* Canonical vocabularies - the only allowed values for each standard. */
/** @type {Object.<string, string[]>} */
var VOCAB = {
  wheel:        ['29', '275'],
  wheelConfig:  ['29', '275', 'mullet'],
  rearAxle:     ['Boost148', 'SuperBoost157'],
  frontAxle:    ['Boost110'],
  freehub:      ['XD', 'MicroSpline', 'HG'],
  rotorMount:   ['sixbolt', 'CL'],
  shockMount:   ['std', 'trunnion'],
  headset:      ['tapered'],
  steerer:      ['tapered'],
  frameBb:      ['BSA73', 'PF92', 'T47'],
  /* crankBb is the SPINDLE INTERFACE, not a brand (DATA-MODEL-REVIEW 5.1-5):
     DUB (28.99mm), 24mm (Shimano Hollowtech II + Race Face Cinch steel + ...),
     30mm (BB30-class: eeWings, Race Face Cinch alu, Hope), p3 (e*thirteen).
     DUB-Wide is a CHAINLINE, not a new spindle value. The old too-narrow
     vocab (DUB|SH24) forced two fictitious catalog products - never again. */
  crankBb:      ['DUB', '24mm', '30mm', 'p3'],
  brakeMount:   ['PM'],
  system:       ['sram-eagle', 'sram-transmission', 'shimano-12'],
  actuation:    ['cable', 'electronic'],
  ringStd:      ['t-type', 'standard-12'],
  /* I-Spec II / I-Spec B are older, mutually-incompatible Shimano standards
     (Saint/Zee are I-Spec B; M8000-era is I-Spec II - neither mates with EV) */
  shifterClamp: ['ispec-ev', 'ispec-ii', 'ispec-b', 'matchmaker', 'band', 'pod'],
  leverClamp:   ['ispec-ev', 'ispec-ii', 'ispec-b', 'matchmaker'],
  derailMount:  ['hanger', 'udh-direct'],
  spring:       ['air', 'coil'],
  material:     ['alu', 'carbon'],
  pedalStyle:   ['flat', 'clip'],
  /* Tire SKU axes (DATA-MODEL-REVIEW section 3 item 5): brand-NATIVE names, not a
     cross-brand toughness tier. Maxxis values seeded now (tires are the next
     verification batch); Schwalbe / Continental / Specialized values get
     enumerated per brand when their batch starts - never invented mid-batch. */
  casing:       ['exo', 'exo-plus', 'doubledown', 'dh'],
  compound:     ['dual', '3c-maxxterra', '3c-maxxgrip'],
  /* disciplines (DATA-MODEL-REVIEW section 4): filter/annotation ONLY - it must
     NEVER feed checkBuild (a DH tire physically fits an enduro bike; structural
     DH constraints are real fields: crown/axle/steerer). Absence = universal.
     'ebike' is deliberately NOT a value - e-enduro/e-trail/e-XC all exist, so
     e-bike is an orthogonal later flag, not a discipline. */
  discipline:   ['xc', 'trail', 'enduro', 'dh'],
  suspension:   ['full', 'hardtail']
};

/* Per-category field schema. Each field: {type, vocab?, optional?, nullable?}
   type: 'number' | 'string' | 'bool' | 'id' (must reference an existing part) | 'fills' */
/** @type {Object.<string, Object.<string, FieldRule>>} */
var SCHEMA = {
  frame: {
    wheelConfigs:{type:'enumArray',vocab:'wheelConfig'}, rearAxle:{type:'string',vocab:'rearAxle'},
    headset:{type:'string',vocab:'headset'}, bb:{type:'string',vocab:'frameBb'},
    seatTube:{type:'number'}, brakeMount:{type:'string',vocab:'brakeMount'},
    maxRotorR:{type:'number'},
    /* the suspension discriminator (DATA-MODEL-REVIEW section 4): the shock
       block is required for 'full' and FORBIDDEN for 'hardtail' - enforced by
       a cross-rule below, which is why the four fields are schema-optional */
    suspension:{type:'string',vocab:'suspension'},
    shockEye:{type:'number',optional:true}, shockStroke:{type:'number',optional:true},
    shockMount:{type:'string',vocab:'shockMount',optional:true}, travel:{type:'number',optional:true},
    maxForkTravel:{type:'number'},
    udh:{type:'bool'}, frameOnly:{type:'bool'}, maxTire:{type:'number',optional:true},
    bundledShock:{type:'id',optional:true,nullable:true},
    /* per-size data lives in a sub-object, NOT variant rows (sizes share price/
       interfaces; review section 3 item 6). Keys are the maker's own size names
       (S-XXL, S1-S6, ...) - deliberately a free string, not a vocab. */
    sizes:{type:'sizes',optional:true}
  },
  fork: {
    wheel:{type:'string',vocab:'wheel'}, travel:{type:'number'}, axle:{type:'string',vocab:'frontAxle'},
    steerer:{type:'string',vocab:'steerer'}, brakeMount:{type:'string',vocab:'brakeMount'}, maxRotorF:{type:'number'},
    minRotorF:{type:'number',optional:true}
  },
  shock: {
    eye:{type:'number'}, stroke:{type:'number'}, mount:{type:'string',vocab:'shockMount'}, spring:{type:'string',vocab:'spring'},
    oemOnly:{type:'bool',optional:true}, forFrames:{type:'idArray',optional:true}
  },
  frontwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'frontAxle'},
    rotorMount:{type:'string',vocab:'rotorMount'}, intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  rearwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'rearAxle'}, freehub:{type:'string',vocab:'freehub'},
    rotorMount:{type:'string',vocab:'rotorMount'}, intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  tire: { wheel:{type:'string',vocab:'wheel'}, width:{type:'number'},
    casing:{type:'string',vocab:'casing',optional:true}, compound:{type:'string',vocab:'compound',optional:true} },
  shifter: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, actuation:{type:'string',vocab:'actuation'}, clampType:{type:'string',vocab:'shifterClamp',optional:true} },
  derailleur: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, actuation:{type:'string',vocab:'actuation'}, maxCog:{type:'number'}, mount:{type:'string',vocab:'derailMount'} },
  /* cassette: minCog is numeric because it drives a REAL freehub constraint
     (a 10T cog needs XD/MicroSpline; the HG spline floor is 11T) - the display
     string ("10-52") is derived, never stored (DATA-MODEL-REVIEW 5.1-7) */
  cassette: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, freehub:{type:'string',vocab:'freehub'}, minCog:{type:'number'}, maxCog:{type:'number'} },
  chain: { system:{type:'string',vocab:'system'}, speeds:{type:'number'} },
  /* crankset: ring/ringStd are OPTIONAL/NULLABLE because armset-only cranks
     ship without a ring (Race Face, eeWings) - a required value forces
     fabricated data and produced a live false red (DATA-MODEL-REVIEW 5.1-6).
     ringStd:null = "ring sold separately / user-fitted". chainline is a
     NUMBER in mm (Boost=52, T-Type=55), display-only for now. */
  crankset: { bb:{type:'string',vocab:'crankBb'}, ring:{type:'number',optional:true}, ringStd:{type:'string',vocab:'ringStd',nullable:true}, speeds:{type:'number'}, chainline:{type:'number',optional:true} },
  /* brake: real levers accept MULTIPLE shifter-mount standards via the maker's
     own clamps (Hayes Peacemaker = I-Spec II/EV + MatchMaker), so this is an
     array (DATA-MODEL-REVIEW 5.1-9) */
  brake: { mount:{type:'string',vocab:'brakeMount'}, pistons:{type:'number'}, leverAccepts:{type:'enumArray',vocab:'leverClamp',optional:true} },
  rotor: { size:{type:'number'}, mount:{type:'string',vocab:'rotorMount'} },
  handlebar: { clamp:{type:'number'}, width:{type:'number',optional:true}, rise:{type:'number',optional:true}, material:{type:'string',vocab:'material',optional:true} },
  stem: { clamp:{type:'number'}, length:{type:'number',optional:true} },
  grips: {},
  dropper: { diameter:{type:'number'}, drop:{type:'number'} },
  saddle: {},
  pedal: { style:{type:'string',vocab:'pedalStyle'} },
  groupset:  { fills:{type:'fills'} },
  wheelset:  { fills:{type:'fills'} },
  brakeset:  { fills:{type:'fills'} },
  cockpitset:{ fills:{type:'fills'} }
};

var PRESET_CATS = ['groupset','wheelset','brakeset','cockpitset'];
/* Common fields every category may carry. family/gen/modelYear/mfgPn are the
   flat-SKU supporting kit (review section 3): family = generation-agnostic
   platform slug ("rockshox-zeb"); gen = maker's generation code (free string -
   'B1', 'V3.2', 'm.2'); modelYear = number; mfgPn = the manufacturer part
   number / model code when the source spec table shows one. All optional in
   schema, template-mandatory for NEW rows (tools/DATA-ENTRY-TEMPLATE.md). */
var COMMON = ['id','cat','brand','model','price','weight','desc','verified','lastChecked','source',
  'family','gen','modelYear','mfgPn','disciplines'];

/* Id convention (DATA-MODEL-REVIEW.md section 3.1): ids are APPEND-ONLY - never
   renamed, never reused; corrections retire the old id into ALIASES (compat.js).
   Shape: <prefix>-<brand>-<model...>[-<gen>][-<variant tokens, fixed per-category
   order>], all lowercase [a-z0-9-]. The brand is ONE token: lowercased, diacritics
   folded, punctuation dropped ("Öhlins" -> ohlins, "e*thirteen" -> ethirteen). */
/** @type {Object.<string, string>} */
var ID_PREFIX = {
  frame:'fr', fork:'fk', shock:'sh', frontwheel:'fw', rearwheel:'rw', tire:'ti',
  shifter:'sft', derailleur:'dr', cassette:'ca', chain:'ch', crankset:'cr',
  brake:'bk', rotor:'ro', handlebar:'hb', stem:'st', grips:'gr', dropper:'dp',
  saddle:'sa', pedal:'pd', groupset:'gs', wheelset:'ws', brakeset:'bs', cockpitset:'co'
};
var ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/** One-token brand slug for the id's second token. @param {*} brand @returns {string} */
function brandSlug(brand){
  return String(brand == null ? '' : brand)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** @param {string} cat @returns {boolean} */
function isPreset(cat){ return PRESET_CATS.indexOf(cat) >= 0; }
/** @param {*} v @returns {boolean} */
function isNum(v){ return typeof v === 'number' && !isNaN(v); }
/** @param {*} v @returns {boolean} */
function isStr(v){ return typeof v === 'string' && v.length > 0; }
/** @param {*} v @returns {boolean} */
function isBool(v){ return typeof v === 'boolean'; }
/** @param {*} v @returns {boolean} */
function isObj(v){ return v && typeof v === 'object' && !Array.isArray(v); }
/** @param {*} v @returns {boolean} */
function urlOk(v){ return typeof v === 'string' && /^https?:\/\/.+/.test(v); }
/** @param {*} v @param {Date} today @returns {boolean} */
function dateOk(v, today){
  if(typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  var d = new Date(v + 'T00:00:00Z');
  if(isNaN(d.getTime())) return false;
  return d.getTime() <= today.getTime();
}

/* Build a validation context from a catalog ({PARTS, SLOTS}). */
/** @param {Catalog} C @param {Date} [today] @returns {Ctx} */
function _ctx(C, today){
  /** @type {Object.<string, boolean>} */ var ids = {};
  /** @type {Object.<string, string>} */ var catOf = {};
  C.PARTS.forEach(function(p){ ids[p.id] = true; catOf[p.id] = p.cat; });
  /** @type {Object.<string, string>} */ var slotCat = {};
  C.SLOTS.forEach(function(s){ slotCat[s.key] = s.cat; });
  return {
    has: function(id){ return !!ids[id]; },
    catOf: function(id){ return catOf[id]; },
    slotCat: slotCat,
    today: today || new Date()
  };
}

/* Validate ONE part. Returns an array of problem strings (empty = valid).
   `p` is untrusted input (the whole point is to reject bad data), so it's typed
   loosely on purpose. */
/** @param {*} p @param {Ctx} ctx @returns {string[]} */
function validatePart(p, ctx){
  /** @type {string[]} */ var probs = [];
  var at = '[' + (p && p.id ? p.id : '?') + ']';
  /** @param {string} m */
  function bad(m){ probs.push(at + ' ' + m); }

  if(!isStr(p.id)) { probs.push('[?] part with missing/blank id'); return probs; }
  if(!isStr(p.cat) || !SCHEMA[p.cat]) { bad('unknown category "' + p.cat + '"'); return probs; }
  if(!isStr(p.brand)) bad('missing brand');
  if(!isStr(p.model)) bad('missing model');

  // id convention (see ID_PREFIX above): charset + category prefix + enough tokens
  if(!ID_RE.test(p.id)) bad('id must be lowercase [a-z0-9] tokens separated by "-"');
  else {
    var idToks = p.id.split('-');
    if(idToks[0] !== ID_PREFIX[p.cat]) bad('id prefix "' + idToks[0] + '-" does not match category "' + p.cat + '" (expected "' + ID_PREFIX[p.cat] + '-")');
    if(idToks.length < 3) bad('id needs at least <prefix>-<brand>-<model> tokens');
  }

  // price semantics are PINNED: manufacturer US MSRP in USD - never street
  // prices, never converted currencies (DATA-MODEL-REVIEW 5.1-12). Mixed
  // meanings across thousands of rows can never be untangled later.
  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');
  if('weight' in p && !(isNum(p.weight) && p.weight >= 0)) bad('weight must be a number >= 0 (grams)');

  // provenance
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, ctx.today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
  } else {
    if('source' in p && p.source != null && typeof p.source !== 'string') bad('source must be a string');
    if('lastChecked' in p && p.lastChecked != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked)) bad('lastChecked must be YYYY-MM-DD');
  }

  // identity / grouping fields (optional on every category - see COMMON above)
  if('family' in p && p.family != null && !(isStr(p.family) && ID_RE.test(p.family)))
    bad('family must be a lowercase slug like "rockshox-zeb"');
  if('gen' in p && p.gen != null && !isStr(p.gen)) bad('gen must be a non-empty string');
  if('mfgPn' in p && p.mfgPn != null && !isStr(p.mfgPn)) bad('mfgPn must be a non-empty string');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');
  if('disciplines' in p && p.disciplines != null){
    if(!Array.isArray(p.disciplines) || p.disciplines.length === 0) bad('disciplines must be a non-empty array');
    else p.disciplines.forEach(function(/** @type {*} */ d){
      if(VOCAB.discipline.indexOf(d) < 0) bad('disciplines value "' + d + '" not in discipline [' + VOCAB.discipline.join(', ') + ']');
    });
  }

  // schema fields
  var spec = SCHEMA[p.cat];
  Object.keys(spec).forEach(function(field){
    var rule = spec[field];
    var has = (field in p) && p[field] !== undefined;
    if(!has){ if(!rule.optional) bad('missing required field "' + field + '"'); return; }
    var v = p[field];
    if(v === null){ if(!rule.nullable) bad('field "' + field + '" must not be null'); return; }
    switch(rule.type){
      case 'number': if(!isNum(v)) bad('field "' + field + '" must be a number'); break;
      case 'string':
        if(!isStr(v)) { bad('field "' + field + '" must be a non-empty string'); break; }
        if(rule.vocab && VOCAB[rule.vocab].indexOf(v) < 0) bad('field "' + field + '" value "' + v + '" not in ' + rule.vocab + ' [' + VOCAB[rule.vocab].join(', ') + ']');
        break;
      case 'bool': if(!isBool(v)) bad('field "' + field + '" must be true/false'); break;
      case 'enumArray':
        if(!Array.isArray(v) || v.length === 0){ bad('field "' + field + '" must be a non-empty array'); break; }
        var allowed = rule.vocab ? (VOCAB[rule.vocab] || []) : [];
        v.forEach(function(it){ if(allowed.indexOf(it) < 0) bad('field "' + field + '" value "' + it + '" not in ' + rule.vocab); });
        break;
      case 'id':
        if(!isStr(v)) { bad('field "' + field + '" must be a part id'); break; }
        if(!ctx.has(v)) bad('field "' + field + '" references unknown part "' + v + '"');
        break;
      case 'idArray':
        if(!Array.isArray(v) || v.length === 0){ bad('field "' + field + '" must be a non-empty array of part ids'); break; }
        v.forEach(function(/** @type {*} */ ref){
          if(!isStr(ref)) { bad('field "' + field + '" entries must be part ids'); return; }
          if(!ctx.has(ref)) bad('field "' + field + '" references unknown part "' + ref + '"');
        });
        break;
      case 'sizes':
        if(!isObj(v)) { bad('sizes must be an object of sizeName -> {seatTubeLen?, maxInsert?}'); break; }
        Object.keys(v).forEach(function(name){
          var sv = v[name];
          if(!isObj(sv)){ bad('sizes["' + name + '"] must be an object'); return; }
          Object.keys(sv).forEach(function(k){
            if(k !== 'seatTubeLen' && k !== 'maxInsert'){ bad('sizes["' + name + '"] unknown key "' + k + '"'); return; }
            if(!(isNum(sv[k]) && sv[k] > 0)) bad('sizes["' + name + '"].' + k + ' must be a positive number (mm)');
          });
        });
        break;
      case 'fills':
        if(!isObj(v)) { bad('fills must be an object'); break; }
        Object.keys(v).forEach(function(slot){
          var target = ctx.slotCat[slot];
          if(!target){ bad('fills targets unknown slot "' + slot + '"'); return; }
          if(!ctx.has(v[slot])){ bad('fills slot "' + slot + '" references unknown part "' + v[slot] + '"'); return; }
          if(ctx.catOf(v[slot]) !== target) bad('fills slot "' + slot + '" expects category "' + target + '" but got "' + ctx.catOf(v[slot]) + '"');
        });
        break;
    }
  });

  // cross-rule: an OEM-only shock must name the frame(s) it ships with
  if(p.cat === 'shock' && p.oemOnly === true && (!Array.isArray(p.forFrames) || p.forFrames.length === 0))
    bad('oemOnly shock must set forFrames');

  // cross-rule: minCog drives a real freehub constraint (10T needs XD/
  // MicroSpline; the HG spline floor is 11T - why NX tops out at 11-50)
  if(p.cat === 'cassette'){
    if(isNum(p.minCog) && isNum(p.maxCog) && p.minCog >= p.maxCog) bad('minCog must be smaller than maxCog');
    if(p.freehub === 'HG' && isNum(p.minCog) && p.minCog < 11) bad('HG freehub floor is an 11T cog (a 10T cassette needs XD or MicroSpline)');
  }

  // cross-rule: the suspension discriminator gates the frame's shock block
  if(p.cat === 'frame'){
    var shockBlock = ['shockEye', 'shockStroke', 'shockMount', 'travel'];
    if(p.suspension === 'full'){
      shockBlock.forEach(function(f){ if(!(f in p) || p[f] == null) bad('full-suspension frame is missing "' + f + '"'); });
    }
    if(p.suspension === 'hardtail'){
      shockBlock.forEach(function(f){ if(f in p && p[f] != null) bad('hardtail frame must not carry "' + f + '"'); });
      if(p.bundledShock != null) bad('hardtail frame cannot bundle a shock');
    }
  }

  // unknown / misspelled fields
  Object.keys(p).forEach(function(k){
    if(COMMON.indexOf(k) < 0 && !(k in spec)) bad('unknown field "' + k + '" (typo?)');
  });

  return probs;
}

/* Validate a whole catalog ({PARTS, SLOTS}). Returns an array of problems. */
/** @param {Catalog} C @param {Date} [today] @returns {string[]} */
function validateCatalog(C, today){
  /** @type {string[]} */ var problems = [];
  var ctx = _ctx(C, today);

  // duplicate ids
  /** @type {Object.<string, boolean>} */ var seen = {};
  C.PARTS.forEach(function(p){
    if(seen[p.id]) problems.push('[' + p.id + '] duplicate id');
    seen[p.id] = true;
  });

  // per-part
  C.PARTS.forEach(function(p){ validatePart(p, ctx).forEach(function(x){ problems.push(x); }); });

  // groupset presets must be one drivetrain system
  C.PARTS.filter(function(p){ return p.cat === 'groupset' && isObj(p.fills); }).forEach(function(p){
    var sys = ['shifter','derailleur','cassette','chain']
      .map(function(s){ return p.fills[s]; })
      .map(function(id){ var part = C.PARTS.filter(function(x){ return x.id === id; })[0]; return part ? part.system : null; })
      .filter(Boolean);
    var uniq = sys.filter(function(v,i,a){ return a.indexOf(v) === i; });
    if(uniq.length > 1) problems.push('[' + p.id + '] groupset mixes drivetrain systems: ' + sys.join(', '));
  });

  // a frame's bundled shock must exist AND physically fit the frame
  C.PARTS.filter(function(p){ return p.cat === 'frame' && p.bundledShock; }).forEach(function(f){
    var s = C.PARTS.filter(function(x){ return x.id === f.bundledShock; })[0];
    if(!s){ problems.push('[' + f.id + '] bundledShock "' + f.bundledShock + '" not found'); return; }
    if(s.eye !== f.shockEye || s.stroke !== f.shockStroke || s.mount !== f.shockMount)
      problems.push('[' + f.id + '] bundledShock ' + s.id + ' does not fit the frame (frame needs ' + f.shockEye + 'x' + f.shockStroke + ' ' + f.shockMount + ')');
  });

  // an OEM-only shock must point back to frames that actually bundle it (bidirectional)
  C.PARTS.filter(function(p){ return p.cat === 'shock' && p.oemOnly; }).forEach(function(s){
    (Array.isArray(s.forFrames) ? s.forFrames : []).forEach(function(/** @type {*} */ fid){
      var f = C.PARTS.filter(function(x){ return x.id === fid; })[0];
      if(!f || f.cat !== 'frame'){ problems.push('[' + s.id + '] oemOnly forFrames entry "' + fid + '" is not a frame'); return; }
      if(f.bundledShock !== s.id) problems.push('[' + s.id + '] oemOnly shock is not referenced by ' + f.id + '.bundledShock (bidirectional link broken)');
    });
  });

  // a preset's bundle price should not exceed the sum of its components (data smell)
  C.PARTS.filter(function(p){ return isObj(p.fills) && typeof p.price === 'number'; }).forEach(function(p){
    var sum = 0, complete = true;
    Object.keys(p.fills).forEach(function(slot){
      var c = C.PARTS.filter(function(x){ return x.id === p.fills[slot]; })[0];
      if(c && typeof c.price === 'number') sum += c.price; else complete = false;
    });
    if(complete && p.price > sum) problems.push('[' + p.id + '] bundle price ' + p.price + ' exceeds the sum of its parts (' + sum + ')');
  });

  // every build slot must have at least one selectable part
  C.SLOTS.forEach(function(s){
    var n = C.PARTS.filter(function(p){ return p.cat === s.cat; }).length;
    if(n === 0) problems.push('slot "' + s.key + '" (category ' + s.cat + ') has no parts to choose from');
  });

  return problems;
}

/* Non-fatal lints - consistency warnings that should never block data entry
   mid-batch. validate.js prints them without failing; the test suite keeps the
   SHIPPED catalog lint-clean (test-ids.js). */
/** @param {Catalog} C @returns {string[]} */
function lintCatalog(C){
  /** @type {string[]} */ var warnings = [];
  C.PARTS.forEach(function(p){
    if(!isStr(p.id) || !ID_RE.test(p.id)) return; // the hard validator already complains
    var toks = p.id.split('-');
    if(toks.length >= 2 && toks[1] !== brandSlug(p.brand))
      warnings.push('[' + p.id + '] id brand token "' + toks[1] + '" is not the brand slug "' + brandSlug(p.brand) + '" (brand: ' + p.brand + ')');
    if(typeof p.family === 'string' && p.family.split('-')[0] !== brandSlug(p.brand))
      warnings.push('[' + p.id + '] family "' + p.family + '" does not start with the brand slug "' + brandSlug(p.brand) + '"');
  });
  return warnings;
}

if(typeof module !== 'undefined' && module.exports){
  module.exports = { VOCAB:VOCAB, SCHEMA:SCHEMA, PRESET_CATS:PRESET_CATS, ID_PREFIX:ID_PREFIX,
    brandSlug:brandSlug, lintCatalog:lintCatalog,
    validatePart:validatePart, validateCatalog:validateCatalog, _ctx:_ctx };
}
