'use strict';
/* =============================================================================
   GRAVEL SCHEMA + VALIDATOR  (mirrors src/schema-bmx.js's approach)
   -----------------------------------------------------------------------------
   data/gravel.js (151 rows, landed catalog/gravel-1) had no schema/validator —
   same gap schema-bmx.js closed for data/bmx.js before its pre-flip audit. This
   is the same "bouncer at the door" pattern, scoped to GRAVEL_PARTS with a
   small self-contained GRAVEL_VOCAB (checkRoadBuild in src/compat-road.js is
   the shared drop-bar engine gravel.html runs on).

   data/gravel.js WENT LIVE 2026-07-21 (gravel.html serves it in production).
   This schema file itself is still loaded only by validate.js (the "GRAVEL OK"
   line) and its own test — gravel.html does not load the validator at runtime,
   same as every other catalog's schema file.

   Field sets below are derived from the ACTUAL data: every field name and
   required/optional split was read off the live data/gravel.js rows (a field
   present on 100% of a category's rows is required; anything less is
   optional) cross-checked against data/GRAVEL-MODEL.md §3's schema deltas —
   never invented. Vocab value-sets are the literal distinct values already
   shipped in data/gravel.js rows this session, not guessed standards.
   ========================================================================== */

/** @param {string} v */
function isStr(v){ return typeof v === 'string' && v.length > 0; }
/** @param {any} v */
function isNum(v){ return typeof v === 'number' && isFinite(v); }
/** @param {any} v */
function isBool(v){ return typeof v === 'boolean'; }
/** @param {any} v */
function urlOk(v){ return isStr(v) && /^https?:\/\//.test(v); }
/** @param {any} v @param {Date} today */
function dateOk(v, today){
  if(!isStr(v) || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  var d = new Date(v + 'T00:00:00Z');
  return !isNaN(d.getTime()) && d.getTime() <= today.getTime();
}

/* Self-contained vocab — the literal distinct values shipped in
   data/gravel.js as of the gravel-2 wave (2026-07-17), grouped by field
   family. Widening this needs a real new row backing the value, same
   discipline as compat-bmx.js's BMX_VOCAB. */
/** @type {Object.<string, Array<string|number>>} */
var GRAVEL_VOCAB = {
  wheel:        ['700c', '650b'],
  rearAxle:     ['12x142', '12x148'],   // '12x148' (Boost, MTB-derived) added gravel-verify-1 (2026-07-21) — the Salsa Cutthroat's own frame-specs table states "Rear Spacing 148 x 12 mm Thru-axle" (a drop-bar-mountain-bike bikepacking platform, not a road-derived 142mm frame); a real, sourced value, not a guess.
  axle:         ['12x100', '12x142', 'lefty-proprietary', '15x100'],
  hub:          ['12x100', '12x142'],
  brakeMount:   ['flat-mount'],
  brakeSystem:  ['disc-flat', 'disc', 'disc-hydraulic'],
  bb:           ['bsa-road', 'bb86', 'bb30a', 'pf30', '24mm-road', 'dub', 'dub-wide', 'ultra-torque', 'bbright', 't47-road', 'bb386evo', 't47-86', 'pf92'],   // 'pf86' retired 2026-07-21 — merged into 'bb86' (same physical 86.5mm press-fit shell; see schema-road.js's header note). Fixes the 2 Giant Revolt frames that had NO matching BB row under the old split. 'pf92' added gravel-verify-1 (2026-07-21) — the Salsa Cutthroat's own frame-specs table states "Bottom Bracket Press Fit BB92, 41 x 92 mm", an MTB-style 92mm press-fit shell distinct from every existing gravel BB token (BB86 is 86.5mm).
  shell:        ['bsa-road', 't47-road', 'bb86', 't47-86'],
  spindle:      ['24mm-road', 'dub'],
  seatpost:     ['27.2', '31.6', '30.9', 'proprietary'],
  // dropperDiameter — split from the 'seatpost' vocab above: a dropper is
  // always a real round tube (never the rigid-seatpost 'proprietary' token,
  // which would falsely validate a dropper diameter that can't exist).
  dropperDiameter: ['27.2', '31.6', '30.9'],
  steerer:      ['tapered'],
  frontDerailleurMount: ['none', 'braze-on'],
  material:     ['alloy', 'steel', 'titanium'],
  freehub:      ['xdr', 'n3w', 'micro-spline-road', 'hg-road'],
  rotorMount:   ['center-lock'],
  casing:       ['tcs-light', 'tcs-tough', 'zsg', 'shieldwall', 'protection', 'hardwall', 'super-ground', 'exo', 'tubeless-complete', 'trail', 'standard', 'extralight', 'endurance'],
  compound:     ['fast-rolling', 'high-grip', 'std', 'blackchili', 'smartnet', 'addix-speedgrip', 'addix', 'dual', 'dynamic-rs', 'g2'],
  actuation:    ['di2-wired', 'mechanical', 'axs-wireless', 'hydraulic'],
  side:         ['pair'],
  system:       ['shimano-grx-12', 'shimano-grx-11', 'shimano-grx-10', 'sram-xplr-12', 'sram-xplr-13', 'sram-apex-mech-12',
                  'campag-ekar-13', 'sram-axs-road', 'hg', 'flattop', 'campag'],
  // 'shimano-grx-10' added gravel-depth-3 (2026-07-22) — the RX400 2x10 tier,
  // confirmed still a current Shimano product line (bike.shimano.com's own GRX
  // series page lists "GRX RX400 10-Speed Mechanical Shifting Options" among
  // its live tiers), was previously unbuildable: no 10-speed system token
  // existed. Real product line, not a force-fit.
  cage:         ['gs', 'sgs', 'xplr'],
  mount:        ['flat-mount', 'center-lock', '6-bolt'],
  mountRD:      ['std-hanger', 'udh-fullmount'],
  minCog:       [9, 10, 11],
  speeds:       [10, 11, 12, 13],
  // 10 added gravel-depth-3 (2026-07-22) alongside 'shimano-grx-10' above —
  // same RX400 tier real-product justification, not a guess.
  chainrings:   ['1x', '2x'],
  ringStd:      ['t-type'],
  clamp:        ['31.8'],
  style:        ['clip'],
  suspension:   ['rigid', 'suspension'],
  // lifecycle (ported from src/schema.js — mirrors its frame lifecycle convention;
  // absent = current). Same 3-value vocab as the live catalog's VOCAB.status.
  status:       ['current', 'discontinued', 'recalled']
};

/** @typedef {{type: 'number'|'string'|'bool'|'numArray'|'strArray'|'map'|'numOrNull'|'strOrNull'|'array', vocab?: string, optional?: boolean}} GravelFieldRule */

/* Per-category required/optional field set. Every non-optional field is
   present on 100% of the category's current data/gravel.js rows
   (checked 2026-07-17); `vocab` names a GRAVEL_VOCAB key. */
/** @type {Object.<string, Object.<string, GravelFieldRule>>} */
var GRAVEL_SCHEMA = {
  frame: {
    wheelSizes:{type:'strArray',vocab:'wheel'}, rearAxle:{type:'string',vocab:'rearAxle'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, brakeMount:{type:'string',vocab:'brakeMount'},
    bb:{type:'string',vocab:'bb'}, seatpost:{type:'string',vocab:'seatpost'}, steerer:{type:'string',vocab:'steerer'},
    maxTireByWheel:{type:'map'}, frontDerailleurMount:{type:'string',vocab:'frontDerailleurMount'},
    frameOnly:{type:'bool'}, material:{type:'string',vocab:'material',optional:true},
    gen:{type:'string',optional:true}
  },
  fork: {
    wheel:{type:'strArray',vocab:'wheel'}, axle:{type:'string',vocab:'axle'}, steerer:{type:'string',vocab:'steerer'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, brakeMount:{type:'string',vocab:'brakeMount'},
    maxRotorF:{type:'number'}, travel:{type:'number'}, suspension:{type:'string',vocab:'suspension'}
  },
  frontwheel: {
    // freehub is OPTIONAL here (unlike rearwheel): a front hub has no driver
    // body, so it carries no freehub standard at all — a value on this field
    // is fabricated, not a real spec.
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'hub'}, freehub:{type:'string',vocab:'freehub',optional:true},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, rotorMount:{type:'string',vocab:'rotorMount'},
    intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  rearwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'hub'}, freehub:{type:'string',vocab:'freehub'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, rotorMount:{type:'string',vocab:'rotorMount'},
    intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  tire: {
    wheel:{type:'string',vocab:'wheel'}, width:{type:'number'}, casing:{type:'string',vocab:'casing'},
    compound:{type:'string',vocab:'compound'}, tubeless:{type:'bool'}
  },
  shifter: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, actuation:{type:'string',vocab:'actuation'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, side:{type:'string',vocab:'side'}, frontShift:{type:'bool'}
  },
  /* dropbar-cleanup-1 item 3: split from a single shared 'derailleur' cat
     into frontderailleur/rearderailleur, matching src/schema-road.js's split
     (gfd-/grd- id prefixes already distinguished them; only the cat field
     was lumped). mount vocabs diverge too: front takes frontDerailleurMount
     ('none'/'braze-on', shared with frames), rear takes the new mountRD
     ('std-hanger'/'udh-fullmount') — those two token sets never overlap in
     meaning, so keeping them one shared 'mount' vocab risked a FD row
     validating with a hanger-mount token or vice versa. */
  frontderailleur: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, actuation:{type:'string',vocab:'actuation'},
    mount:{type:'string',vocab:'frontDerailleurMount'}, capacity:{type:'number',optional:true}
  },
  rearderailleur: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, actuation:{type:'string',vocab:'actuation'},
    maxCog:{type:'number'}, cage:{type:'string',vocab:'cage'}, mount:{type:'string',vocab:'mountRD'}
  },
  cassette: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, freehub:{type:'string',vocab:'freehub'},
    minCog:{type:'number',vocab:'minCog'}, maxCog:{type:'number'}
  },
  chain: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}
  },
  crankset: {
    bb:{type:'string',vocab:'bb'}, chainrings:{type:'string',vocab:'chainrings'}, ring:{type:'number'},
    ringStd:{type:'strOrNull',vocab:'ringStd',optional:true}, speeds:{type:'number',vocab:'speeds'}, chainline:{type:'number'}
  },
  bb: {
    shell:{type:'string',vocab:'shell'}, spindle:{type:'string',vocab:'spindle'}
  },
  headset: {
    upper:{type:'string'}, lower:{type:'string'}, steerer:{type:'string',vocab:'steerer'}
  },
  brake: {
    mount:{type:'string',vocab:'mount'}, pistons:{type:'number'}, actuation:{type:'string',vocab:'actuation'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, leverPair:{type:'string'}
  },
  rotor: {
    size:{type:'number'}, mount:{type:'string',vocab:'mount'}
  },
  handlebar: {
    clamp:{type:'string',vocab:'clamp'}, flare:{type:'number'}, dropBar:{type:'bool'}, width:{type:'number'}
  },
  stem: {
    clamp:{type:'string',vocab:'clamp'}, steerer:{type:'string',vocab:'steerer'}, length:{type:'number'}
  },
  seatpost: {
    // diameter is optional (a proprietary/D-shaped post — BMC URS LT's own
    // aero seatpost, gravel-8 finding — carries no round diameter at all,
    // mirroring src/schema-road.js's seatpost.diameter/proprietary/forFrames pattern).
    diameter:{type:'string',vocab:'seatpost',optional:true}, setback:{type:'number'},
    proprietary:{type:'bool',optional:true}, forFrames:{type:'array',optional:true}
  },
  dropper: {
    diameter:{type:'string',vocab:'dropperDiameter'}, drop:{type:'number'}, actuation:{type:'string',vocab:'actuation'}
  },
  saddle: {},
  pedal: {
    style:{type:'string',vocab:'style'}
  },
  bartape: {}
};

/** @param {string} vocabKey @returns {Array<string|number>|undefined} */
function vocabValues(vocabKey){ return GRAVEL_VOCAB[vocabKey]; }

/** @param {any} p @param {Date} today @returns {string[]} */
function validateGravelPart(p, today){
  /** @type {string[]} */ var probs = [];
  var at = '[' + (p && p.id ? p.id : '?') + ']';
  /** @param {string} m */
  function bad(m){ probs.push(at + ' ' + m); }

  if(!isStr(p.id)) { probs.push('[?] gravel part with missing/blank id'); return probs; }
  if(!isStr(p.cat) || !GRAVEL_SCHEMA[p.cat]) { bad('unknown gravel category "' + p.cat + '"'); return probs; }
  if(!isStr(p.brand)) bad('missing brand');
  if(!isStr(p.model)) bad('missing model');
  if(!/^[a-z0-9-]+$/.test(p.id) || p.id.split('-').length < 3) bad('id must be lowercase "g<cat>-<brand>-<model...>" tokens separated by "-"');

  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');
  if('weight' in p && p.weight != null && !(isNum(p.weight) && p.weight >= 0)) bad('weight must be a number >= 0 (grams)');

  // provenance — same contract as schema.js/schema-bmx.js: verified:true
  // needs a real fetched source URL and a non-future lastChecked date.
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
    if(p.sourceType === 'retailer') bad('verified:true rejects sourceType:"retailer" (retailer "measured" weights are not accepted)');
    if(p.sourceType === 'measured' && !urlOk(p.weightSource)) bad('sourceType:"measured" requires a weightSource URL');
  } else {
    if('source' in p && p.source != null && typeof p.source !== 'string') bad('source must be a string');
    if('lastChecked' in p && p.lastChecked != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked)) bad('lastChecked must be YYYY-MM-DD');
  }
  if('family' in p && p.family != null && !(isStr(p.family) && /^[a-z0-9-]+$/.test(p.family))) bad('family must be a lowercase slug');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');

  // lifecycle (ported from src/schema.js): status is a closed vocab; supersededBy
  // is type-checked here (must be a string, can't self-reference) but its
  // cross-reference against real catalog ids happens in validateGravelCatalog's
  // second pass, same as schema-emtb.js's port — a single-part check can't see
  // sibling ids, and a forward reference (superseding a part later in the array)
  // must not false-positive.
  if('status' in p && p.status != null){
    var statusVals = vocabValues('status');
    if(!isStr(p.status) || !statusVals || statusVals.indexOf(p.status) < 0)
      bad('status "' + p.status + '" not in [' + (statusVals || []).join(', ') + ']');
  }
  if('supersededBy' in p && p.supersededBy != null){
    if(!isStr(p.supersededBy)) bad('supersededBy must be a part id');
    else if(p.supersededBy === p.id) bad('a part cannot supersede itself');
  }

  var spec = GRAVEL_SCHEMA[p.cat];
  Object.keys(spec).forEach(function(field){
    var rule = spec[field];
    var has = field in p && p[field] != null;
    if(!has){
      if(!rule.optional) bad('missing required field "' + field + '"');
      return;
    }
    var v = p[field];
    if(rule.type === 'number' && !isNum(v)) { bad('"' + field + '" must be a number'); return; }
    if(rule.type === 'bool' && !isBool(v)) { bad('"' + field + '" must be true/false'); return; }
    if(rule.type === 'string' && !isStr(v)) { bad('"' + field + '" must be a non-empty string'); return; }
    if(rule.type === 'strArray'){
      if(!Array.isArray(v) || v.length === 0 || !v.every(isStr)) { bad('"' + field + '" must be a non-empty array of strings'); return; }
    }
    if(rule.type === 'map'){
      if(typeof v !== 'object' || v === null || Array.isArray(v)) { bad('"' + field + '" must be an object map'); return; }
      return; // per-wheel-size numeric values, no fixed key set to check
    }
    if(rule.type === 'numOrNull'){
      if(v !== null && !isNum(v)) { bad('"' + field + '" must be a number or null'); return; }
      if(v === null) return; // null is always valid regardless of vocab
    }
    if(rule.type === 'strOrNull'){
      if(v !== null && !isStr(v)) { bad('"' + field + '" must be a string or null'); return; }
      if(v === null) return; // null is always valid regardless of vocab
    }
    if(rule.vocab){
      var vals = vocabValues(rule.vocab);
      /** @type {Array<string|number>} */
      var checkVals = rule.type === 'strArray' ? v : [v];
      checkVals.forEach(function(/** @type {string|number} */ cv){
        if(vals && vals.indexOf(cv) < 0) bad('"' + field + '" value "' + cv + '" not in ' + rule.vocab + ' [' + vals.join(', ') + ']');
      });
    }
  });

  // reject stray fields not in the category's schema or the common set —
  // catches typos (a field spelled differently than every other row).
  /** @type {Object.<string, number>} */
  var COMMON = { id:1, cat:1, brand:1, model:1, price:1, weight:1, note:1, verified:1, lastChecked:1, source:1,
    family:1, modelYear:1, mfgPn:1, sourceType:1, weightSource:1, archiveUrl:1, gen:1, status:1, supersededBy:1 };
  Object.keys(p).forEach(function(k){
    if(COMMON[k] || spec[k]) return;
    bad('unknown field "' + k + '" for category "' + p.cat + '"');
  });

  return probs;
}

/** @param {any[]} parts @param {Date} [today] @returns {string[]} */
function validateGravelCatalog(parts, today){
  var t = today || new Date();
  /** @type {string[]} */ var probs = [];
  /** @type {Object.<string, boolean>} */ var seenIds = {};
  parts.forEach(function(p){
    if(p && isStr(p.id)){
      if(seenIds[p.id]) probs.push('[' + p.id + '] duplicate id');
      seenIds[p.id] = true;
    }
    probs = probs.concat(validateGravelPart(p, t));
  });
  parts.forEach(function(p){
    if(!p || !isStr(p.id) || p.supersededBy == null) return;
    var at = '[' + p.id + ']';
    if(!seenIds[p.supersededBy]) probs.push(at + ' supersededBy references unknown part "' + p.supersededBy + '"');
  });
  return probs;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GRAVEL_VOCAB: GRAVEL_VOCAB, GRAVEL_SCHEMA: GRAVEL_SCHEMA, validateGravelPart: validateGravelPart, validateGravelCatalog: validateGravelCatalog };
}
