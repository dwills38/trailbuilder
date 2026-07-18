'use strict';
/* =============================================================================
   ROAD SCHEMA + VALIDATOR  (OFF-LIVE — mirrors src/schema-bmx.js's approach)
   -----------------------------------------------------------------------------
   data/road.js (built in the catalog/road-1 wave, 108 rows) had NO validator —
   it was hand-built to mirror data/ROAD-MODEL.md section 3 field-by-field with
   no automated check (flagged as the most important follow-up in
   tools/road-catalog-1-progress.md). This is the same "bouncer at the door"
   pattern as src/schema-bmx.js / src/schema-strider.js, scoped to ROAD_PARTS.

   NOT LOADED BY THE LIVE APP — road stays OFF-LIVE (CLAUDE.md hard rule 3;
   no src/compat-road.js engine exists yet either). Wired only into
   validate.js (a fifth "ROAD OK" line) and this module's own tests.

   Field sets below are derived from data/ROAD-MODEL.md section 3 (the
   proposed per-category schema) cross-checked against every row that shipped
   in data/road.js as of 2026-07-17 (never invented — a field only becomes
   "required" here if every current row of that category actually carries it;
   fields ROAD-MODEL.md proposes but no shipped row uses yet stay optional).

   Vocab (LOCAL_VOCAB below) is drafted straight from ROAD-MODEL.md section 4,
   WIDENED for this wave per the coordinator brief: bbShellRoad gains
   'bb90-road' (Trek's bearing-in-frame shell — press-fit bearings seated
   directly in the frame shell, NOT the MTB PF92/BB92 tokens, which are a
   different width/seat), 'bb30a' (Cannondale's asymmetric 30mm-spindle
   press-fit — visually similar to BB30 but NOT interchangeable; never
   conflate with a generic 'bb30' token, which does not exist in this vocab),
   and 'pf86' (Shimano-style press-fit road shell, 86.5mm wide — the road
   sibling of the MTB PF92 token; NOT the same bearing/width, never conflate).
   These three were used by the wave-1 Trek/Cannondale/Giant frame rows but
   were missing from the model doc's draft vocab (data/road.js's own trailing
   comment flagged the gap rather than widening solo) — now added here AND
   folded back into ROAD-MODEL.md section 4 by this pass.
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

/* ROAD-MODEL.md section 4 vocab draft, widened per this wave's coordinator
   brief (see header note above for the bb90-road/bb30a/pf86 do-not-conflate
   rationale — each is a DISTINCT real shell standard from any MTB token). */
/** @type {Object.<string, Array.<string|null>>} */
var LOCAL_VOCAB = {
  wheelRG:      ['700c', '650b'],
  freehubRG:    ['hg-road', 'hg-l2', 'micro-spline-road', 'xdr', 'n3w', 'campag-11'],
  brakeSystem:  ['disc-flat', 'disc-post', 'rim-caliper', 'disc-hydraulic', 'disc-mechanical', 'rim'],
  brakeMountRG: ['flat-mount', 'post-mount'],
  rearAxleRG:   ['12x142', 'qr130', 'qr135'],
  frontAxleRG:  ['12x100', 'qr100'],
  steererRG:    ['tapered', 'straight-1-1-8', '1-1-8'],
  systemRoad:   ['shimano-road-12', 'shimano-road-11', 'shimano-grx-12', 'shimano-grx-11',
                 'sram-axs-road', 'sram-xplr-12', 'sram-xplr-13', 'sram-apex-mech-12',
                 'campag-ekar-13', 'campag-12', 'campag-11', 'flattop', 'hg', 'campag'],
  actuationRG:  ['mechanical', 'di2-wired', 'axs-wireless'],
  /* bbShellRoad — WIDENED this wave: 'bb90-road' (Trek bearing-in-frame),
     'bb30a' (Cannondale asymmetric press-fit), 'pf86' (Shimano-style road
     press-fit, 86.5mm) added alongside the original ROAD-MODEL.md draft. */
  bbShellRoad:  ['bsa-road', 'bb86', 'bb386evo', 'bbright', 'pf30', 't47-road', 'italian',
                 'bb90-road', 'bb30a', 'pf86'],
  crankBbRoad:  ['dub', 'dub-wide', '24mm-road', '30mm'],
  seatpostDiaRG:['27.2', '30.9', '31.6'],
  clampRG:      ['31.8', '35'],
  frontDerailleurMount: ['braze-on', 'band', 'none'],
  side:         ['left', 'right', 'pair'],
  cage:         ['short', 'medium', 'long', 'xplr', 'mullet'],
  mountRD:      ['std-hanger', 'udh-fullmount'],
  chainringsRG: ['1x', '2x'],
  ringStdRG:    ['t-type', 'standard-12', null],
  pedalStyleRoad: ['road-clip', 'spd'],
  discipline:   ['road', 'allroad', 'aero', 'endurance', 'cx'],
  rotorMountRG: ['center-lock', '6-bolt'],
  /* Wheel-side brakeSystem is a coarser disc/rim axis than the frame/fork/
     brake-caliper `brakeSystem` set above (ROAD-MODEL.md section 3: "frontWheel
     / rearWheel: brakeSystem (`disc`/`rim`)") — kept as its own vocab rather
     than folded into the frame-side set so a future rule doesn't cross-compare
     the wrong granularity. */
  brakeSystemWheel: ['disc', 'rim'],
  /* Brake-caliper actuation is hydraulic-vs-mechanical (a lever mechanism
     fact), a DIFFERENT axis from shifter/derailleur actuationRG
     (mechanical/di2-wired/axs-wireless, an electronic-vs-cable fact) —
     ROAD-MODEL.md section 3 lists both under the same field name "actuation"
     per category but the value sets do not overlap; kept separate here to
     avoid silently accepting a shifter-side token on a brake row or vice versa. */
  actuationBrake: ['hydraulic', 'mechanical']
};

/** @param {string} vocabKey @returns {any[]|undefined} */
function vocabValues(vocabKey){ return LOCAL_VOCAB[vocabKey]; }

/** @typedef {{type: 'number'|'string'|'bool'|'array', vocab?: string, optional?: boolean, nullable?: boolean}} RoadFieldRule */

/* Per-category required/optional field set, derived from the LIVE data/road.js
   rows (2026-07-17) cross-checked against ROAD-MODEL.md section 3. */
/** @type {Object.<string, Object.<string, RoadFieldRule>>} */
var ROAD_SCHEMA = {
  frame: {
    wheelSizes: {type:'array', vocab:'wheelRG'},
    rearAxle: {type:'string', vocab:'rearAxleRG'},
    brakeSystem: {type:'string', vocab:'brakeSystem'},
    brakeMount: {type:'string', vocab:'brakeMountRG'},
    bb: {type:'string', vocab:'bbShellRoad'},
    seatpost: {type:'string'},   // diameter token (seatpostDiaRG) OR 'proprietary' — checked loosely as a string
    steerer: {type:'string', vocab:'steererRG'},
    maxTire: {type:'number'},
    frontDerailleurMount: {type:'string', vocab:'frontDerailleurMount'},
    frameOnly: {type:'bool'}
  },
  fork: {
    wheel: {type:'string', vocab:'wheelRG'},
    axle: {type:'string', vocab:'frontAxleRG'},
    steerer: {type:'string', vocab:'steererRG'},
    brakeSystem: {type:'string', vocab:'brakeSystem'},
    brakeMount: {type:'string', vocab:'brakeMountRG'},
    maxRotorF: {type:'number'},
    maxTire: {type:'number'},
    travel: {type:'number'}
  },
  frontwheel: {
    wheel: {type:'string', vocab:'wheelRG'},
    hub: {type:'string', vocab:'frontAxleRG'},
    brakeSystem: {type:'string', vocab:'brakeSystemWheel'},
    rotorMount: {type:'string', vocab:'rotorMountRG', optional:true},   // no rows yet exercise this vocab distinctly; kept string-checked
    intWidth: {type:'number'},
    maxTire: {type:'number'}
  },
  rearwheel: {
    wheel: {type:'string', vocab:'wheelRG'},
    hub: {type:'string', vocab:'rearAxleRG'},
    freehub: {type:'string', vocab:'freehubRG'},
    brakeSystem: {type:'string', vocab:'brakeSystemWheel'},
    rotorMount: {type:'string', optional:true},
    intWidth: {type:'number'},
    maxTire: {type:'number'}
  },
  tire: {
    wheel: {type:'string', vocab:'wheelRG'},
    width: {type:'number'},
    tubeless: {type:'bool'},
    compound: {type:'string', optional:true},
    casing: {type:'string', optional:true}
  },
  shifter: {
    system: {type:'string', vocab:'systemRoad'},
    speeds: {type:'number'},
    actuation: {type:'string', vocab:'actuationRG'},
    brakeSystem: {type:'string', vocab:'brakeSystem'},
    side: {type:'string', vocab:'side'},
    frontShift: {type:'bool'}
  },
  frontderailleur: {
    system: {type:'string', vocab:'systemRoad'},
    speeds: {type:'number'},
    actuation: {type:'string', vocab:'actuationRG'},
    mount: {type:'string', vocab:'frontDerailleurMount'},
    capacity: {type:'number', optional:true},
    maxChainringDiff: {type:'number', optional:true}
  },
  rearderailleur: {
    system: {type:'string', vocab:'systemRoad'},
    speeds: {type:'number'},
    actuation: {type:'string', vocab:'actuationRG'},
    maxCog: {type:'number'},
    cage: {type:'string', vocab:'cage'},
    mount: {type:'string', vocab:'mountRD'}
  },
  cassette: {
    system: {type:'string', vocab:'systemRoad'},
    speeds: {type:'number'},
    freehub: {type:'string', vocab:'freehubRG'},
    minCog: {type:'number'},
    maxCog: {type:'number'}
  },
  chain: {
    system: {type:'string', vocab:'systemRoad'},
    speeds: {type:'number'}
  },
  crankset: {
    bb: {type:'string', vocab:'crankBbRoad'},
    chainrings: {type:'string', vocab:'chainringsRG'},
    ring: {type:'string'},
    ringStd: {type:'string', vocab:'ringStdRG', nullable:true},
    speeds: {type:'number'},
    chainline: {type:'number', optional:true}
  },
  bb: {
    shell: {type:'string', vocab:'bbShellRoad'},
    spindle: {type:'string', vocab:'crankBbRoad'}
  },
  headset: {
    upper: {type:'string'},
    lower: {type:'string'},
    steerer: {type:'string', vocab:'steererRG'}
  },
  brake: {
    brakeSystem: {type:'string', vocab:'brakeSystem'},
    mount: {type:'string', vocab:'brakeMountRG'},
    pistons: {type:'number'},
    actuation: {type:'string', vocab:'actuationBrake'},
    leverPair: {type:'string', optional:true}
  },
  rotor: {
    size: {type:'number'},
    mount: {type:'string', vocab:'rotorMountRG', optional:true}
  },
  handlebar: {
    clamp: {type:'string', vocab:'clampRG'},
    dropBar: {type:'bool'},
    reach: {type:'number', optional:true},
    drop: {type:'number', optional:true},
    width: {type:'number', optional:true}
  },
  stem: {
    clamp: {type:'string', vocab:'clampRG'},
    steerer: {type:'string'},
    length: {type:'number', optional:true}
  },
  cockpit: {
    steerer: {type:'string'},
    width: {type:'number', optional:true},
    reach: {type:'number', optional:true},
    drop: {type:'number', optional:true},
    integrated: {type:'bool'}
  },
  seatpost: {
    diameter: {type:'string', vocab:'seatpostDiaRG', optional:true},
    proprietary: {type:'bool', optional:true},
    forFrames: {type:'array', optional:true},
    setback: {type:'number', optional:true}
  },
  saddle: {},
  bartape: {},
  pedal: {
    style: {type:'string', vocab:'pedalStyleRoad'}
  }
};

/** @param {any} p @param {Date} today @returns {string[]} */
function validateRoadPart(p, today){
  /** @type {string[]} */ var probs = [];
  var at = '[' + (p && p.id ? p.id : '?') + ']';
  /** @param {string} m */
  function bad(m){ probs.push(at + ' ' + m); }

  if(!isStr(p.id)) { probs.push('[?] road part with missing/blank id'); return probs; }
  if(!isStr(p.cat) || !ROAD_SCHEMA[p.cat]) { bad('unknown road category "' + p.cat + '"'); return probs; }
  if(!isStr(p.brand)) bad('missing brand');
  if(!isStr(p.model)) bad('missing model');
  if(!/^[a-z0-9-]+$/.test(p.id) || p.id.split('-').length < 3) bad('id must be lowercase "<prefix>-<brand>-<model...>" tokens separated by "-"');

  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');
  if('weight' in p && p.weight != null && !(isNum(p.weight) && p.weight >= 0)) bad('weight must be a number >= 0 (grams)');

  // provenance — same contract as schema.js/schema-bmx.js: verified:true needs
  // a real fetched source URL and a non-future lastChecked date.
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
    if('sourceType' in p && p.sourceType === 'retailer') bad('verified:true rejects sourceType:"retailer" (measured/manufacturer only)');
  } else {
    if('source' in p && p.source != null && typeof p.source !== 'string') bad('source must be a string');
    if('lastChecked' in p && p.lastChecked != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked)) bad('lastChecked must be YYYY-MM-DD');
  }
  if('family' in p && p.family != null && !(isStr(p.family) && /^[a-z0-9-]+$/.test(p.family))) bad('family must be a lowercase slug');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');
  if('disciplines' in p && p.disciplines != null){
    if(!Array.isArray(p.disciplines)) bad('disciplines must be an array');
    else p.disciplines.forEach(function(/** @type {string} */ d){
      if((LOCAL_VOCAB.discipline).indexOf(d) < 0) bad('disciplines value "' + d + '" not in discipline [' + LOCAL_VOCAB.discipline.join(', ') + ']');
    });
  }

  var spec = ROAD_SCHEMA[p.cat];
  Object.keys(spec).forEach(function(field){
    var rule = spec[field];
    var has = field in p && p[field] != null;
    if(!has){
      // nullable fields (e.g. ringStd) may be explicitly null and still count as present
      if(rule.nullable && field in p && p[field] === null) return;
      if(!rule.optional) bad('missing required field "' + field + '"');
      return;
    }
    var v = p[field];
    if(rule.type === 'number' && !isNum(v)) { bad('"' + field + '" must be a number'); return; }
    if(rule.type === 'bool' && !isBool(v)) { bad('"' + field + '" must be true/false'); return; }
    if(rule.type === 'string' && !isStr(v)) { bad('"' + field + '" must be a non-empty string'); return; }
    if(rule.type === 'array' && !Array.isArray(v)) { bad('"' + field + '" must be an array'); return; }
    if(rule.vocab){
      var vals = vocabValues(rule.vocab);
      if(rule.type === 'array'){
        v.forEach(function(/** @type {any} */ item){
          if(vals && vals.indexOf(item) < 0) bad('"' + field + '" value "' + item + '" not in ' + rule.vocab + ' [' + vals.join(', ') + ']');
        });
      } else if(vals && vals.indexOf(v) < 0){
        bad('"' + field + '" value "' + v + '" not in ' + rule.vocab + ' [' + vals.join(', ') + ']');
      }
    }
  });

  // reject stray fields not in the category's schema or the common set —
  // catches typos (a field spelled differently than every other row).
  /** @type {Object.<string, number>} */
  var COMMON = { id:1, cat:1, brand:1, model:1, price:1, weight:1, note:1, verified:1, lastChecked:1, source:1,
    family:1, gen:1, modelYear:1, mfgPn:1, sourceType:1, weightSource:1, archiveUrl:1, status:1, supersededBy:1,
    disciplines:1, material:1 };
  Object.keys(p).forEach(function(k){
    if(COMMON[k] || spec[k]) return;
    bad('unknown field "' + k + '" for category "' + p.cat + '"');
  });

  return probs;
}

/** @param {any[]} parts @param {Date} [today] @returns {string[]} */
function validateRoadCatalog(parts, today){
  var t = today || new Date();
  /** @type {string[]} */ var probs = [];
  /** @type {Object.<string, boolean>} */ var seenIds = {};
  parts.forEach(function(p){
    if(p && isStr(p.id)){
      if(seenIds[p.id]) probs.push('[' + p.id + '] duplicate id');
      seenIds[p.id] = true;
    }
    probs = probs.concat(validateRoadPart(p, t));
  });
  return probs;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROAD_SCHEMA: ROAD_SCHEMA, LOCAL_VOCAB: LOCAL_VOCAB, validateRoadPart: validateRoadPart, validateRoadCatalog: validateRoadCatalog };
}
