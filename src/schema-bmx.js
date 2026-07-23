'use strict';
/* =============================================================================
   BMX SCHEMA + VALIDATOR  (OFF-LIVE — mirrors src/schema.js's approach)
   -----------------------------------------------------------------------------
   The MTB catalog has had a schema/validator (src/schema.js) since day one;
   data/bmx.js never did, so an out-of-vocab value (a fabricated axle spec, a
   typo'd standard) could sit in the catalog silently. This is the same
   "bouncer at the door" pattern, scoped to BMX_PARTS + BMX_VOCAB from
   src/compat-bmx.js.

   NOT LOADED BY THE LIVE APP — same off-live status as compat-bmx.js/bmx.js
   (CLAUDE.md hard rule 3). Wired only into validate.js (as a second "BMX OK"
   line) and this module's own tests.

   Field sets below are derived from the ACTUAL data model: every field name
   and required/optional split was read off data/BMX-MODEL.md section 14 (the
   proposed per-category schema) cross-checked against every row currently in
   data/bmx.js (never invented). Vocab checks reuse BMX_VOCAB from
   src/compat-bmx.js wherever a field's value set already lives there; a
   handful of fields BMX_VOCAB doesn't cover get a small LOCAL vocab here,
   each commented with its source (BMX-MODEL.md section or an observed real
   value already shipped in bmx.js — never a guessed value).
   ========================================================================== */

/** @type {{BMX_VOCAB: Object.<string, string[]>}} */
var _bmxEngine = (typeof module !== 'undefined' && module.exports)
  ? require('./compat-bmx.js')
  : /** @type {any} */ (globalThis);
var BMX_VOCAB = _bmxEngine.BMX_VOCAB;

/* Fields BMX_VOCAB doesn't carry a value-set for. Each sourced either from
   data/BMX-MODEL.md's proposed schema (section 14) or from a real value
   already shipped in a bmx.js row (documented inline — never a guess). */
/** @type {Object.<string, string[]>} */
var LOCAL_VOCAB = {
  /* BMX-MODEL.md section 14/1: discipline tag, annotation-only (mirrors MTB's
     `disciplines`) — never feeds checkBmxBuild. */
  discipline:  ['race', 'freestyle', 'universal'],
  /* BMX-MODEL.md section 4: crank ring interface, shared verbatim by
     sprocket.mount (the sprocket side of the same spline/press-on fact). */
  ringMount:   ['spline', 'press-on'],
  /* BMX-MODEL.md section 9: gyro dual-cable vs a single-cable-compatible kit. */
  cableRouting:['dual', 'upper-only'],
  /* BMX-MODEL.md section 11 (race-slick/park) plus 'kevlar-foldable', a real
     foldable-bead construction term already shipped on catalog tire rows —
     documenting reality, not inventing a new token. */
  casing:      ['race-slick', 'park', 'kevlar-foldable'],
  /* BMX-MODEL.md section 8: peg material, display-only. */
  material:    ['steel', 'alloy'],
  /* Peg axle bore — kept as its OWN subset of the axle standards, NOT BMX_VOCAB's
     full `axle` list. When race widened BMX_VOCAB.axle with 15mm/20mm (2026-07-23)
     the shared vocab could no longer gate pegs, which only ever slide onto a 10mm
     (3/8in) front or 14mm rear axle (BMX-MODEL.md section 8). Pointing pegs.axleFit
     here keeps a fabricated 15mm/20mm peg out of the catalog while frames/forks/
     wheels still accept the wider race axle set. */
  pegAxle:     ['10mm', '14mm'],
  /* BMX-MODEL.md section 14 pedal platform (plastic/alloy) plus 'clip'
     (clipless pedal, a real shipped value — pedals are the one BMX category
     that legitimately comes in flat AND clipless, same as the MTB catalog's
     pedal.style axis). */
  platform:    ['plastic', 'alloy', 'clip'],
  /* Lifecycle status — mirrors src/schema.js's VOCAB.status verbatim (added
     alongside BMX_ALIASES, src/compat-bmx.js, for the id-retirement/tombstone
     mechanism). Absent = current. */
  status:      ['current', 'discontinued', 'recalled'],
  /* Price provenance — mirrors src/schema.js's VOCAB.priceBasis VERBATIM
     (Douglas's 2026-07-22 ruling: "verified means the pricing was verified
     too"). Absent = a SAMPLE price; present = a disclosed claim, legal only on
     a verified row. 'msrp-confirmed' is the norm; the other five are the
     disclosed exception classes (discontinued / OE-only / non-USD conversion /
     bundled-SKU split / third-party-listed). The full rationale for each token
     lives in schema.js — this is the same enum, not a BMX variant. Never feeds
     checkBmxBuild.
     'pair-split-estimate' (2026-07-22) is WHEEL-ONLY — frontWheel/rearWheel
     (BMX's camelCase wheel categories) — a cross-rule below rejects it on any
     other category. */
  priceBasis:  ['msrp-confirmed', 'discontinued-no-msrp', 'oe-only-no-msrp',
                'regional-conversion', 'bundle-split-estimate', 'third-party-listed',
                'pair-split-estimate', 'deprioritized-no-price-source']
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

/** @typedef {{type: 'number'|'string'|'bool', vocab?: string, optional?: boolean}} BmxFieldRule */

/* Per-category required/optional field set. Every non-optional field here is
   present on 100% of the category's current rows (checked against the live
   data/bmx.js, 2026-07-17); `vocab` names either a BMX_VOCAB key or a
   LOCAL_VOCAB key above. */
/** @type {Object.<string, Object.<string, BmxFieldRule>>} */
var BMX_SCHEMA = {
  frame: {
    discipline:{type:'string',vocab:'discipline'}, wheelSize:{type:'string',vocab:'wheel'},
    bbShell:{type:'string',vocab:'bbShell'}, headTube:{type:'string',vocab:'headTube'},
    topTube:{type:'number'}, rearBrakeMount:{type:'string',vocab:'brakeMount'},
    rearAxle:{type:'string',vocab:'axle'}, frameOnly:{type:'bool'},
    /* dormant-until-sourced fields (BMX-MODEL.md sections 5/9/10/11 note
       these as real but no row carries one yet) — optional, no vocab guess. */
    gyroTabs:{type:'bool',optional:true}, maxTire:{type:'number',optional:true},
    seatpostDia:{type:'number',optional:true}
  },
  fork: {
    discipline:{type:'string',vocab:'discipline',optional:true}, wheelSize:{type:'string',vocab:'wheel'},
    steerer:{type:'string',vocab:'headTube'}, axle:{type:'string',vocab:'axle'},
    brakeMount:{type:'string',vocab:'brakeMount'}, maxTire:{type:'number',optional:true}
  },
  headset: { fit:{type:'string',vocab:'headTube'} },
  gyro: { steererFit:{type:'string',vocab:'headTube'}, cableRouting:{type:'string',vocab:'cableRouting'} },
  cranks: {
    spindle:{type:'string',vocab:'spindle'}, pieces:{type:'string',vocab:'crankPieces'},
    ringMount:{type:'string',vocab:'ringMount'}, length:{type:'number',optional:true}
  },
  bb: { shell:{type:'string',vocab:'bbShell'}, spindleFit:{type:'string',vocab:'spindle'} },
  sprocket: { teeth:{type:'number'}, mount:{type:'string',vocab:'ringMount'}, pitch:{type:'string',vocab:'chainPitch'} },
  chain: { pitch:{type:'string',vocab:'chainPitch'}, halfLink:{type:'bool'} },
  rearWheel: {
    driverType:{type:'string',vocab:'driverType'}, driverTeeth:{type:'number'},
    side:{type:'string',vocab:'side'}, axle:{type:'string',vocab:'axle'}
  },
  rearCog: { teeth:{type:'number'}, fitsDriver:{type:'string',vocab:'driverType'}, pitch:{type:'string',vocab:'chainPitch'} },
  frontWheel: { wheelSize:{type:'string',vocab:'wheel'}, axle:{type:'string',vocab:'axle'} },
  tire: {
    wheelSize:{type:'string',vocab:'wheel'}, width:{type:'number'},
    casing:{type:'string',vocab:'casing'}, maxPsi:{type:'number'}
  },
  pegs: { axleFit:{type:'string',vocab:'pegAxle'}, material:{type:'string',vocab:'material'}, reducerIncluded:{type:'bool'} },
  brake: { mount:{type:'string',vocab:'brakeMount'}, dualCable:{type:'bool',optional:true} },
  handlebar: { clamp:{type:'string',vocab:'clamp'}, rise:{type:'number'}, width:{type:'number'} },
  stem: { clamp:{type:'string',vocab:'clamp'} },
  seat: { system:{type:'string',vocab:'seatSystem'} },
  seatpost: { diameter:{type:'number'}, system:{type:'string',vocab:'seatSystem'} },
  grips: { length:{type:'number'}, flangeless:{type:'bool'} },
  pedals: { platform:{type:'string',vocab:'platform'}, spindle:{type:'string'} }
};

/** @param {string} vocabKey @returns {string[]|undefined} */
function vocabValues(vocabKey){
  return (BMX_VOCAB && BMX_VOCAB[vocabKey]) || LOCAL_VOCAB[vocabKey];
}

/** @param {any} p @param {Date} today @param {Object.<string, boolean>} [idSet] optional full-catalog id set, for the supersededBy cross-check (validateBmxCatalog passes it; a direct validateBmxPart(p, today) call — as the existing tests do — skips only that one cross-reference check) @returns {string[]} */
function validateBmxPart(p, today, idSet){
  /** @type {string[]} */ var probs = [];
  var at = '[' + (p && p.id ? p.id : '?') + ']';
  /** @param {string} m */
  function bad(m){ probs.push(at + ' ' + m); }

  if(!isStr(p.id)) { probs.push('[?] bmx part with missing/blank id'); return probs; }
  if(!isStr(p.cat) || !BMX_SCHEMA[p.cat]) { bad('unknown BMX category "' + p.cat + '"'); return probs; }
  if(!isStr(p.brand)) bad('missing brand');
  if(!isStr(p.model)) bad('missing model');
  if(!/^[a-z0-9-]+$/.test(p.id) || p.id.split('-').length < 3) bad('id must be lowercase "bmx-<cat>-<model...>" tokens separated by "-"');

  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');
  if('weight' in p && p.weight != null && !(isNum(p.weight) && p.weight >= 0)) bad('weight must be a number >= 0 (grams)');

  // provenance — same contract as schema.js: verified:true needs a real
  // fetched source URL and a non-future lastChecked date.
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
  } else {
    if('source' in p && p.source != null && typeof p.source !== 'string') bad('source must be a string');
    if('lastChecked' in p && p.lastChecked != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked)) bad('lastChecked must be YYYY-MM-DD');
  }
  // priceBasis — same contract as schema.js: a stated basis is a CLAIM, so it
  // rides only on a verified row (which already forces a real source above);
  // once STRICT flips, a verified row must state one.
  if('priceBasis' in p && p.priceBasis != null){
    if(!isStr(p.priceBasis) || LOCAL_VOCAB.priceBasis.indexOf(p.priceBasis) < 0)
      bad('priceBasis "' + p.priceBasis + '" not in [' + LOCAL_VOCAB.priceBasis.join(', ') + ']');
    if(p.verified !== true)
      bad('priceBasis "' + p.priceBasis + '" requires verified:true with a real source - an unverified row states no price provenance');
    if(p.priceBasis === 'pair-split-estimate' && ['frontWheel', 'rearWheel'].indexOf(p.cat) < 0)
      bad('priceBasis "pair-split-estimate" is wheel-only (frontWheel/rearWheel) - "' + p.cat + '" is not a wheel category');
    // TOKEN LAW (2026-07-23, mirrors schema.js): discontinued-no-msrp must
    // always travel with status:'discontinued' on the same row.
    if(p.priceBasis === 'discontinued-no-msrp' && p.status !== 'discontinued')
      bad('priceBasis "discontinued-no-msrp" requires status:"discontinued" on the same row (the token law - a discontinued price basis without a discontinued status is a contradiction)');
  } else if(PRICE_BASIS_STRICT && p.verified === true){
    bad('verified:true requires a priceBasis - "verified" must cover the price, not just the spec');
  }
  if('family' in p && p.family != null && !(isStr(p.family) && /^[a-z0-9-]+$/.test(p.family))) bad('family must be a lowercase slug');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');

  // lifecycle status + supersededBy — mirrors schema.js's contract verbatim.
  // supersededBy's cross-reference check only runs when the caller passed an
  // idSet (validateBmxCatalog always does; a bare validateBmxPart(p, today)
  // call, like the existing direct-call tests use, skips just that one check
  // rather than requiring every caller to thread a full-catalog id set).
  if('status' in p && p.status != null && (!isStr(p.status) || LOCAL_VOCAB.status.indexOf(p.status) < 0))
    bad('status "' + p.status + '" not in [' + LOCAL_VOCAB.status.join(', ') + ']');
  if('supersededBy' in p && p.supersededBy != null){
    if(!isStr(p.supersededBy)) bad('supersededBy must be a part id');
    else if(idSet && !idSet[p.supersededBy]) bad('supersededBy references unknown BMX part "' + p.supersededBy + '"');
    else if(p.supersededBy === p.id) bad('a part cannot supersede itself');
  }

  var spec = BMX_SCHEMA[p.cat];
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

  // reject stray fields not in the category's schema or the common set —
  // catches typos (a field spelled differently than every other row).
  /** @type {Object.<string, number>} */
  var COMMON = { id:1, cat:1, brand:1, model:1, price:1, weight:1, note:1, verified:1, lastChecked:1, source:1,
    family:1, modelYear:1, mfgPn:1, sourceType:1, weightSource:1, status:1, supersededBy:1, priceBasis:1 };
  Object.keys(p).forEach(function(k){
    if(COMMON[k] || spec[k]) return;
    bad('unknown field "' + k + '" for category "' + p.cat + '"');
  });

  return probs;
}

/** @param {any[]} parts @param {Date} [today] @returns {string[]} */
function validateBmxCatalog(parts, today){
  var t = today || new Date();
  /** @type {string[]} */ var probs = [];
  // Built in its own pass, before per-part validation, so supersededBy can
  // reference a part appearing anywhere in the array (order-independent) —
  // same idea as schema.js's ctx.has, scoped down to just the id set.
  /** @type {Object.<string, boolean>} */ var idSet = {};
  parts.forEach(function(p){ if(p && isStr(p.id)) idSet[p.id] = true; });
  /** @type {Object.<string, boolean>} */ var seenIds = {};
  parts.forEach(function(p){
    if(p && isStr(p.id)){
      if(seenIds[p.id]) probs.push('[' + p.id + '] duplicate id');
      seenIds[p.id] = true;
    }
    probs = probs.concat(validateBmxPart(p, t, idSet));
  });
  return probs;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BMX_SCHEMA: BMX_SCHEMA, LOCAL_VOCAB: LOCAL_VOCAB, PRICE_BASIS_STRICT: PRICE_BASIS_STRICT,
    validateBmxPart: validateBmxPart, validateBmxCatalog: validateBmxCatalog };
}
