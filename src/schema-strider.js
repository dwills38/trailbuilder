'use strict';
/* =============================================================================
   STRIDER (KIDS BALANCE-BIKE) SCHEMA + VALIDATOR  (OFF-LIVE)
   -----------------------------------------------------------------------------
   Mirrors the src/schema-bmx.js "bouncer at the door" pattern, scoped to a
   single category: cat:'balancebike' (data/STRIDER-MODEL.md section 4 - "a
   whole bike is the primary row"). There is no build-slot engine yet (this
   round is data entry only, per data/STRIDER-MODEL.md section 5's proposed
   `checkBalanceFit` - not implemented here); this file just keeps every row
   honest against the model's field list.

   NOT LOADED BY THE LIVE APP. Wired only into validate.js (a third "STRIDER
   OK" line, alongside "DATA OK"/"KIT OK"/"BMX OK") and this module's own
   tests, if/when added.

   seatMin/seatMax are the model's declared "load-bearing" fit fields, but per
   THE BAR (a blank beats a guessed number) they are OPTIONAL here: several
   real, currently-sold bikes only publish a rider-height range, not a seat-
   height range, and a missing number must never be filled with a guess.
   frameMaterial is likewise optional for the same reason - it is
   display-only (never feeds a fit verdict) but still must not be fabricated
   when no source states it.
   ========================================================================== */

/** @type {Object.<string, string[]>} */
var STRIDER_VOCAB = {
  wheel: ['8', '10', '12', '14', '16', '20'],
  tire: ['air', 'foam', 'rubber-foam', 'solid-rubber'],
  brake: ['none', 'rear-hand', 'dual-hand', 'coaster', 'rear-hand+coaster'],
  brakeReach: ['short', 'standard'],
  frameMaterial: ['aluminum', 'steel', 'carbon', 'wood', 'composite', 'magnesium'],
  sourceType: ['maker', 'measured'],
  /* Price provenance — mirrors src/schema.js's VOCAB.priceBasis VERBATIM
     (Douglas's 2026-07-22 ruling: "verified means the pricing was verified
     too"). Absent = a SAMPLE price; present = a disclosed claim, legal only on
     a verified row. 'msrp-confirmed' is the norm; the other five are the
     disclosed exception classes (discontinued / OE-only / non-USD conversion /
     bundled-SKU split / third-party-listed). Full per-token rationale lives in
     schema.js — same enum, not a strider variant. Never feeds any fit logic.
     'pair-split-estimate' (2026-07-22) is WHEEL-ONLY — this catalog is a
     single cat:'balancebike' category (no separate wheel category), so the
     cross-rule below rejects it unconditionally here; the token exists only
     for enum agreement with schema.js. */
  priceBasis: ['msrp-confirmed', 'discontinued-no-msrp', 'oe-only-no-msrp',
               'regional-conversion', 'bundle-split-estimate', 'third-party-listed',
               'pair-split-estimate']
};

/* >>> COORDINATOR ROLLOUT SWITCH — DO NOT FLIP. See the identical constant in
   src/schema.js for the full contract. false = a verified row missing
   priceBasis is a counted WARNING (validate.js prints the burndown); true =
   it's a hard error. Flip only when the backfill is done in EVERY catalog. */
var PRICE_BASIS_STRICT = false;

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

/** @typedef {{type: 'number'|'string'|'bool', vocab?: string, optional?: boolean}} StriderFieldRule */

/** @type {Object.<string, StriderFieldRule>} */
var BALANCEBIKE_SCHEMA = {
  wheel: {type:'string', vocab:'wheel'},
  bikeWeight: {type:'number'},
  tire: {type:'string', vocab:'tire'},
  brake: {type:'string', vocab:'brake'},
  // THE fit fields (STRIDER-MODEL.md sec 3/4) - optional per THE BAR: blank beats a guess.
  seatMin: {type:'number', optional:true},
  seatMax: {type:'number', optional:true},
  standover: {type:'number', optional:true},
  weightLimit: {type:'number', optional:true},
  tireWidth: {type:'number', optional:true},
  brakeReach: {type:'string', vocab:'brakeReach', optional:true},
  footrest: {type:'bool', optional:true},
  steeringLimiter: {type:'bool', optional:true},
  frameMaterial: {type:'string', vocab:'frameMaterial', optional:true},
  ageMin: {type:'number', optional:true},
  ageMax: {type:'number', optional:true},
  heightMin: {type:'number', optional:true},
  heightMax: {type:'number', optional:true},
  convertsToPedal: {type:'bool', optional:true},
  quickReleaseSeat: {type:'bool', optional:true}
};

/** @param {string} vocabKey @returns {string[]|undefined} */
function vocabValues(vocabKey){ return STRIDER_VOCAB[vocabKey]; }

/** @param {any} p @param {Date} today @returns {string[]} */
function validateStriderPart(p, today){
  /** @type {string[]} */ var probs = [];
  var at = '[' + (p && p.id ? p.id : '?') + ']';
  /** @param {string} m */
  function bad(m){ probs.push(at + ' ' + m); }

  if(!isStr(p.id)) { probs.push('[?] strider part with missing/blank id'); return probs; }
  if(p.cat !== 'balancebike') { bad('unknown strider category "' + p.cat + '" (only balancebike is modeled)'); return probs; }
  if(!isStr(p.brand)) bad('missing brand');
  if(!isStr(p.model)) bad('missing model');
  if(!/^[a-z0-9-]+$/.test(p.id) || p.id.split('-').length < 3) bad('id must be lowercase "sb-<brand>-<model...>" tokens separated by "-"');

  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');

  // provenance - same contract as schema.js/schema-bmx.js: verified:true
  // needs a real fetched source URL and a non-future lastChecked date.
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
    if('sourceType' in p && p.sourceType != null){
      var stv = vocabValues('sourceType');
      if(stv && stv.indexOf(p.sourceType) < 0) bad('sourceType "' + p.sourceType + '" not in [' + stv.join(', ') + ']');
      if(p.sourceType === 'measured' && !urlOk(p.weightSource)) bad('sourceType:measured requires a weightSource URL');
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
    if(p.priceBasis === 'pair-split-estimate')
      bad('priceBasis "pair-split-estimate" is wheel-only (frontwheel/rearwheel) - this catalog has no wheel category');
  } else if(PRICE_BASIS_STRICT && p.verified === true){
    bad('verified:true requires a priceBasis - "verified" must cover the price, not just the spec');
  }
  if('family' in p && p.family != null && !(isStr(p.family) && /^[a-z0-9-]+$/.test(p.family))) bad('family must be a lowercase slug');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');

  var spec = BALANCEBIKE_SCHEMA;
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
    if(rule.vocab){
      var vals = vocabValues(rule.vocab);
      if(vals && vals.indexOf(v) < 0) bad('"' + field + '" value "' + v + '" not in ' + rule.vocab + ' [' + vals.join(', ') + ']');
    }
  });

  // Fit-field sanity when both present (no guessing here - just internal consistency).
  if(isNum(p.seatMin) && isNum(p.seatMax) && p.seatMax < p.seatMin) bad('seatMax must be >= seatMin');
  if(isNum(p.heightMin) && isNum(p.heightMax) && p.heightMax < p.heightMin) bad('heightMax must be >= heightMin');
  if(isNum(p.ageMin) && isNum(p.ageMax) && p.ageMax < p.ageMin) bad('ageMax must be >= ageMin');

  // reject stray fields not in the category's schema or the common set.
  /** @type {Object.<string, number>} */
  var COMMON = { id:1, cat:1, brand:1, model:1, price:1, note:1, verified:1, lastChecked:1, source:1,
    family:1, modelYear:1, mfgPn:1, sourceType:1, weightSource:1, desc:1, priceBasis:1 };
  Object.keys(p).forEach(function(k){
    if(COMMON[k] || spec[k]) return;
    bad('unknown field "' + k + '" for category "' + p.cat + '"');
  });

  return probs;
}

/** @param {any[]} parts @param {Date} [today] @returns {string[]} */
function validateStriderCatalog(parts, today){
  var t = today || new Date();
  /** @type {string[]} */ var probs = [];
  /** @type {Object.<string, boolean>} */ var seenIds = {};
  parts.forEach(function(p){
    if(p && isStr(p.id)){
      if(seenIds[p.id]) probs.push('[' + p.id + '] duplicate id');
      seenIds[p.id] = true;
    }
    probs = probs.concat(validateStriderPart(p, t));
  });
  return probs;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STRIDER_VOCAB: STRIDER_VOCAB, BALANCEBIKE_SCHEMA: BALANCEBIKE_SCHEMA, PRICE_BASIS_STRICT: PRICE_BASIS_STRICT,
    validateStriderPart: validateStriderPart, validateStriderCatalog: validateStriderCatalog
  };
}
