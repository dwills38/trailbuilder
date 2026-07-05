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
/** @typedef {{type: 'number'|'string'|'bool'|'id'|'fills'|'enumArray', vocab?: string, optional?: boolean, nullable?: boolean}} FieldRule */
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
  crankBb:      ['DUB', 'SH24'],
  brakeMount:   ['PM'],
  system:       ['sram-eagle', 'sram-transmission', 'shimano-12'],
  derailMount:  ['hanger', 'udh-direct'],
  spring:       ['air', 'coil'],
  material:     ['alu', 'carbon'],
  pedalStyle:   ['flat', 'clip']
};

/* Per-category field schema. Each field: {type, vocab?, optional?, nullable?}
   type: 'number' | 'string' | 'bool' | 'id' (must reference an existing part) | 'fills' */
/** @type {Object.<string, Object.<string, FieldRule>>} */
var SCHEMA = {
  frame: {
    wheelConfigs:{type:'enumArray',vocab:'wheelConfig'}, rearAxle:{type:'string',vocab:'rearAxle'},
    headset:{type:'string',vocab:'headset'}, bb:{type:'string',vocab:'frameBb'},
    seatTube:{type:'number'}, brakeMount:{type:'string',vocab:'brakeMount'},
    maxRotorR:{type:'number'}, shockEye:{type:'number'}, shockStroke:{type:'number'},
    shockMount:{type:'string',vocab:'shockMount'}, maxForkTravel:{type:'number'}, travel:{type:'number'},
    udh:{type:'bool'}, frameOnly:{type:'bool'}, maxTire:{type:'number',optional:true},
    bundledShock:{type:'id',optional:true,nullable:true}
  },
  fork: {
    wheel:{type:'string',vocab:'wheel'}, travel:{type:'number'}, axle:{type:'string',vocab:'frontAxle'},
    steerer:{type:'string',vocab:'steerer'}, brakeMount:{type:'string',vocab:'brakeMount'}, maxRotorF:{type:'number'}
  },
  shock: {
    eye:{type:'number'}, stroke:{type:'number'}, mount:{type:'string',vocab:'shockMount'}, spring:{type:'string',vocab:'spring'},
    oemOnly:{type:'bool',optional:true}, forFrame:{type:'id',optional:true}
  },
  frontwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'frontAxle'},
    rotorMount:{type:'string',vocab:'rotorMount'}, intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  rearwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'rearAxle'}, freehub:{type:'string',vocab:'freehub'},
    rotorMount:{type:'string',vocab:'rotorMount'}, intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  tire: { wheel:{type:'string',vocab:'wheel'}, width:{type:'number'} },
  shifter: { system:{type:'string',vocab:'system'}, speeds:{type:'number'} },
  derailleur: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, maxCog:{type:'number'}, mount:{type:'string',vocab:'derailMount'} },
  cassette: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, freehub:{type:'string',vocab:'freehub'}, range:{type:'string'}, maxCog:{type:'number'} },
  chain: { system:{type:'string',vocab:'system'}, speeds:{type:'number'} },
  crankset: { bb:{type:'string',vocab:'crankBb'}, ring:{type:'number'}, speeds:{type:'number'}, chainline:{type:'string',optional:true} },
  brake: { mount:{type:'string',vocab:'brakeMount'}, pistons:{type:'number'} },
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
var COMMON = ['id','cat','brand','model','price','weight','desc','verified','lastChecked','source'];

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

  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0');
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

  // cross-rule: an OEM-only shock must name the frame it ships with
  if(p.cat === 'shock' && p.oemOnly === true && !isStr(p.forFrame)) bad('oemOnly shock must set forFrame');

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

  // an OEM-only shock must point back to a frame that actually bundles it (bidirectional)
  C.PARTS.filter(function(p){ return p.cat === 'shock' && p.oemOnly; }).forEach(function(s){
    var f = C.PARTS.filter(function(x){ return x.id === s.forFrame; })[0];
    if(!f || f.cat !== 'frame'){ problems.push('[' + s.id + '] oemOnly forFrame "' + s.forFrame + '" is not a frame'); return; }
    if(f.bundledShock !== s.id) problems.push('[' + s.id + '] oemOnly shock is not referenced by ' + f.id + '.bundledShock (bidirectional link broken)');
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

if(typeof module !== 'undefined' && module.exports){
  module.exports = { VOCAB:VOCAB, SCHEMA:SCHEMA, PRESET_CATS:PRESET_CATS,
    validatePart:validatePart, validateCatalog:validateCatalog, _ctx:_ctx };
}
