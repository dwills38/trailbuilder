'use strict';
/* =============================================================================
   e-MTB ("BuildMyEMTB") SCHEMA + VALIDATOR  (OFF-LIVE — the ONLY e-bike surface)
   -----------------------------------------------------------------------------
   Mirrors the src/schema-strider.js / src/schema-bmx.js "bouncer at the door"
   pattern, scoped to a single category: cat:'emtb' (data/EMTB-MODEL.md section 3
   — "a whole e-MTB is the primary row"). There is no build-slot engine (this
   round is data entry only; the model recommends a browse/compare surface, not a
   part builder — see EMTB-MODEL.md section 4); this file keeps every row honest
   against the model's field list.

   CONTAINMENT (CLAUDE.md hard rule 1, amended 2026-07-18): the e-system fields
   (motorBrand/motorTorque/batteryWh/assist/...) live ONLY in this catalog. The
   MTB catalog (src/compat.js PARTS) stays e-free permanently; that direction is
   asserted by test/test-emtb-containment.js, which also asserts every row here
   actually carries the e-system.

   NOT LOADED BY THE LIVE APP. Wired only into validate.js (an "EMTB OK" gate
   line, alongside DATA/KIT/BMX/STRIDER/ROAD/GRAVEL OK) and this module's tests.
   Off-live until Douglas's explicit flip word.

   Field sets below are derived from data/EMTB-MODEL.md section 3 and the seed
   rows in data/emtb.js (a field present on 100% of rows is required; anything
   less is optional) — never invented. Data-derived vocabs (motorBrand, display,
   frameMaterial) are the literal distinct values shipped; wheelConfig, assist and
   disciplines are closed enums (they mirror fixed live-schema enums, not open
   data-derived sets). Widening a data-derived vocab needs a real new row backing
   the value — same discipline as compat-bmx.js's BMX_VOCAB.
   ========================================================================== */

/** @param {any} v */
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

/** @type {Object.<string, string[]>} */
var EMTB_VOCAB = {
  // data-derived (distinct values shipped in data/emtb.js — widen only with a new row)
  motorBrand:    ['bosch', 'shimano', 'specialized', 'fazua', 'rocky-mountain', 'tq', 'giant', 'yamaha', 'sram', 'dji', 'avinox'],
  display:       ['top-tube', 'system-controller'],
  frameMaterial: ['aluminum', 'carbon', 'steel', 'mixed'],
  // closed enums (mirror fixed live-schema conventions)
  wheelConfig:   ['29', '275', 'mullet'],
  suspension:    ['full', 'hardtail'],
  assist:        ['full-power', 'lightweight'],
  disciplines:   ['e-xc', 'e-trail', 'e-enduro', 'e-dh'],
  sourceType:    ['maker', 'measured'],
  status:        ['current', 'discontinued', 'recalled'],  // absent = current — mirrors schema.js's frame lifecycle convention
  /* Price provenance — mirrors src/schema.js's VOCAB.priceBasis VERBATIM
     (Douglas's 2026-07-22 ruling: "verified means the pricing was verified
     too"). Absent = a SAMPLE price; present = a disclosed claim, legal only on
     a verified row. 'msrp-confirmed' is the norm; the other four are the
     disclosed exception classes (discontinued / OE-only / non-USD conversion —
     common here, most e-MTB makers are European and publish EUR only — /
     bundled-SKU split). Full per-token rationale lives in schema.js — same
     enum, not an e-MTB variant. Never feeds any compat rule. */
  priceBasis:    ['msrp-confirmed', 'discontinued-no-msrp', 'oe-only-no-msrp',
                  'regional-conversion', 'bundle-split-estimate']
};

/* >>> COORDINATOR ROLLOUT SWITCH — DO NOT FLIP. See the identical constant in
   src/schema.js for the full contract. false = a verified row missing
   priceBasis is a counted WARNING (validate.js prints the burndown); true =
   it's a hard error. Flip only when the backfill is done in EVERY catalog. */
var PRICE_BASIS_STRICT = false;

/** @typedef {{type: 'number'|'string'|'bool'|'strArray', vocab?: string, optional?: boolean}} EmtbFieldRule */

/* cat:'emtb' — the complete e-MTB (the primary and, for MVP, only entity).
   Every non-optional field is present on 100% of the current data/emtb.js seed
   rows (checked 2026-07-18). */
/** @type {Object.<string, EmtbFieldRule>} */
var EMTB_SCHEMA = {
  // e-system (the contained, e-specific block — lives nowhere else)
  motorBrand:      {type:'string', vocab:'motorBrand'},
  motorModel:      {type:'string'},
  motorTorque:     {type:'number'},
  motorPowerPeak:  {type:'number', optional:true},
  batteryWh:       {type:'number'},
  batteryRemovable:{type:'bool', optional:true},
  rangeExtender:   {type:'bool', optional:true},
  assist:          {type:'string', vocab:'assist'},
  display:         {type:'string', vocab:'display', optional:true},
  // bike side (reused MTB conventions — display/compare only, no part-compat rules)
  wheelConfig:     {type:'string', vocab:'wheelConfig'},
  suspension:      {type:'string', vocab:'suspension'},
  travelFront:     {type:'number'},
  travelRear:      {type:'number'},
  frameMaterial:   {type:'string', vocab:'frameMaterial', optional:true},
  drivetrain:      {type:'string', optional:true},
  brakes:          {type:'string', optional:true},
  disciplines:     {type:'strArray', vocab:'disciplines', optional:true}
};

/** @param {string} vocabKey @returns {string[]|undefined} */
function vocabValues(vocabKey){ return EMTB_VOCAB[vocabKey]; }

/** @param {any} p @param {Date} today @returns {string[]} */
function validateEmtbPart(p, today){
  /** @type {string[]} */ var probs = [];
  var at = '[' + (p && p.id ? p.id : '?') + ']';
  /** @param {string} m */
  function bad(m){ probs.push(at + ' ' + m); }

  if(!isStr(p.id)) { probs.push('[?] emtb part with missing/blank id'); return probs; }
  if(p.cat !== 'emtb') { bad('unknown emtb category "' + p.cat + '" (only emtb is modeled)'); return probs; }
  if(!isStr(p.brand)) bad('missing brand');
  if(!isStr(p.model)) bad('missing model');
  if(!/^[a-z0-9-]+$/.test(p.id) || p.id.split('-').length < 3) bad('id must be lowercase "em-<brand>-<model...>" tokens separated by "-"');

  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');
  if('weight' in p && p.weight != null && !(isNum(p.weight) && p.weight >= 0)) bad('weight must be a number >= 0 (grams)');

  // provenance — same contract as schema.js/schema-bmx.js: verified:true needs a
  // real fetched source URL and a non-future lastChecked date.
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
    if(p.sourceType === 'retailer') bad('verified:true rejects sourceType:"retailer" (retailer "measured" weights are not accepted)');
    if('sourceType' in p && p.sourceType != null){
      var stv = vocabValues('sourceType');
      if(stv && stv.indexOf(p.sourceType) < 0) bad('sourceType "' + p.sourceType + '" not in [' + stv.join(', ') + ']');
      if(p.sourceType === 'measured' && !urlOk(p.weightSource)) bad('sourceType:"measured" requires a weightSource URL');
    }
  } else {
    if('source' in p && p.source != null && typeof p.source !== 'string') bad('source must be a string');
    if('lastChecked' in p && p.lastChecked != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked)) bad('lastChecked must be YYYY-MM-DD');
  }
  // priceBasis — same contract as schema.js: a stated basis is a CLAIM, so it
  // rides only on a verified row (which already forces a real source above);
  // once STRICT flips, a verified row must state one. Sits OUTSIDE the
  // verified/unverified split above because it must fire in BOTH directions.
  if('priceBasis' in p && p.priceBasis != null){
    var pbv = vocabValues('priceBasis');
    if(!isStr(p.priceBasis) || (pbv && pbv.indexOf(p.priceBasis) < 0))
      bad('priceBasis "' + p.priceBasis + '" not in [' + (pbv || []).join(', ') + ']');
    if(p.verified !== true)
      bad('priceBasis "' + p.priceBasis + '" requires verified:true with a real source - an unverified row states no price provenance');
  } else if(PRICE_BASIS_STRICT && p.verified === true){
    bad('verified:true requires a priceBasis - "verified" must cover the price, not just the spec');
  }
  if('family' in p && p.family != null && !(isStr(p.family) && /^[a-z0-9-]+$/.test(p.family))) bad('family must be a lowercase slug');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');
  if('status' in p && p.status != null){
    var statusVals = vocabValues('status');
    if(!isStr(p.status) || !statusVals || statusVals.indexOf(p.status) < 0)
      bad('status "' + p.status + '" not in [' + (statusVals || []).join(', ') + ']');
  }
  if('supersededBy' in p && p.supersededBy != null && !isStr(p.supersededBy)) bad('supersededBy must be a part id');

  var spec = EMTB_SCHEMA;
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
    if(rule.vocab){
      var vals = vocabValues(rule.vocab);
      /** @type {any[]} */
      var checkVals = rule.type === 'strArray' ? v : [v];
      checkVals.forEach(function(/** @type {any} */ cv){
        if(vals && vals.indexOf(cv) < 0) bad('"' + field + '" value "' + cv + '" not in ' + rule.vocab + ' [' + vals.join(', ') + ']');
      });
    }
  });

  // cross-rule: suspension <-> rear travel must agree (EMTB-MODEL.md section 3).
  // A full-suspension e-MTB has rear travel; a hardtail has none.
  if(p.suspension === 'full' && isNum(p.travelRear) && p.travelRear <= 0)
    bad('suspension:"full" requires travelRear > 0');
  if(p.suspension === 'hardtail' && isNum(p.travelRear) && p.travelRear !== 0)
    bad('suspension:"hardtail" requires travelRear === 0');

  // reject stray fields not in the category's schema or the common set —
  // catches typos (a field spelled differently than every other row).
  /** @type {Object.<string, number>} */
  var COMMON = { id:1, cat:1, brand:1, model:1, price:1, weight:1, note:1, desc:1, verified:1, lastChecked:1, source:1,
    family:1, gen:1, modelYear:1, mfgPn:1, sourceType:1, weightSource:1, archiveUrl:1, status:1, supersededBy:1,
    priceBasis:1 };
  Object.keys(p).forEach(function(k){
    if(COMMON[k] || spec[k]) return;
    bad('unknown field "' + k + '" for category "' + p.cat + '"');
  });

  return probs;
}

/** @param {any[]} parts @param {Date} [today] @returns {string[]} */
function validateEmtbCatalog(parts, today){
  var t = today || new Date();
  /** @type {string[]} */ var probs = [];
  /** @type {Object.<string, boolean>} */ var seenIds = {};
  parts.forEach(function(p){
    if(p && isStr(p.id)){
      if(seenIds[p.id]) probs.push('[' + p.id + '] duplicate id');
      seenIds[p.id] = true;
    }
    probs = probs.concat(validateEmtbPart(p, t));
  });
  parts.forEach(function(p){
    if(!p || !isStr(p.id) || p.supersededBy == null) return;
    var at = '[' + p.id + ']';
    if(!seenIds[p.supersededBy]) probs.push(at + ' supersededBy references unknown part "' + p.supersededBy + '"');
    else if(p.supersededBy === p.id) probs.push(at + ' a part cannot supersede itself');
  });
  return probs;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EMTB_VOCAB: EMTB_VOCAB, EMTB_SCHEMA: EMTB_SCHEMA, PRICE_BASIS_STRICT: PRICE_BASIS_STRICT,
    validateEmtbPart: validateEmtbPart, validateEmtbCatalog: validateEmtbCatalog
  };
}
