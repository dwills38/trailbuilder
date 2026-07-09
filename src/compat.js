/* =============================================================================
   TrailBuilder - parts data + compatibility engine (component-level)
   -----------------------------------------------------------------------------
   Build = individual SLOTS grouped into GROUPS. PRESETS (groupset / wheelset /
   brake set / cockpit) quick-fill several slots; a group filled exactly by a
   preset is priced/weighed as that bundle (see bundleActive / buildTotals).

   WHEEL SETUPS: a frame declares `wheelConfigs`, any of:
     '29'     -> 29 front + 29 rear
     '275'    -> 27.5 front + 27.5 rear
     'mullet' -> 29 front + 27.5 rear (mixed)
   Front parts (fork, front wheel, front tire) and rear parts (rear wheel, rear
   tire) are checked as two groups, and the front/rear combo must match a config
   the frame supports.

   IMPORTANT: all specs, prices and weights are SAMPLE DATA and must be verified
   before going live (see schema.js for the provenance fields).
   ========================================================================== */

/** @typedef {import('./types.js').Part} Part */
/** @typedef {import('./types.js').DrivetrainPart} DrivetrainPart */
/** @typedef {import('./types.js').Build} Build */
/** @typedef {import('./types.js').Group} Group */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').PresetBy} PresetBy */
/** @typedef {import('./types.js').CompatResult} CompatResult */
/** @typedef {import('./types.js').Totals} Totals */
/** @typedef {import('./types.js').CompatState} CompatState */
/** @typedef {import('./types.js').WheelSize} WheelSize */
/** @typedef {import('./types.js').EffectiveWheel} EffectiveWheel */

/** @type {Object.<string, string>} */
var LABELS = {
  '29': '29in', '275': '27.5in', mullet: 'Mullet (29/27.5)',
  Boost148: 'Boost 148x12', SuperBoost157: 'SuperBoost 157x12', Boost110: 'Boost 15x110', '20x110': '20x110 Boost (DH)', '20x110-nonboost': '20x110 standard (DH, non-Boost)',
  XD: 'SRAM XD', MicroSpline: 'Shimano Micro Spline', HG: 'Shimano HG',
  sixbolt: '6-bolt', CL: 'Center Lock',
  std: 'Standard eyelet', trunnion: 'Trunnion',
  tapered: 'Tapered (1.5-1.125)', 'straight-dc': 'Straight 1.125 (dual-crown)',
  BSA73: 'BSA threaded 73', BSA68: 'BSA threaded 68', PF92: 'PressFit 92', T47: 'T47 threaded', PF107: 'PressFit 107 (DH)', BSA83: 'BSA threaded 83 (DH)', '150x12': '150x12 (DH, pre-Boost)',
  DUB: 'SRAM DUB', '24mm': '24 mm spindle', '30mm': '30 mm spindle', p3: 'e*thirteen P3', PM: 'Post mount', FM: 'Flat mount',
  'sram-eagle': 'SRAM Eagle 12-speed', 'sram-transmission': 'SRAM Transmission (AXS)', 'sram-dh-7': 'SRAM DH 7-speed',
  'shimano-12': 'Shimano 12-speed', 'udh-direct': 'Direct mount (UDH)', hanger: 'Standard hanger',
  cable: 'mechanical (cable)', electronic: 'electronic (wireless)',
  't-type': 'T-Type', 'standard-12': 'standard 12-speed',
  'ispec-ev': 'I-Spec EV', 'ispec-ii': 'I-Spec II', 'ispec-b': 'I-Spec B',
  matchmaker: 'MatchMaker X', band: 'band clamp', pod: 'AXS pod',
  flat: 'Flat', clip: 'Clipless',
  exo: 'EXO', 'exo-plus': 'EXO+', doubledown: 'DoubleDown', dh: 'DH casing',
  dual: 'Dual', '3c-maxxterra': '3C MaxxTerra', '3c-maxxgrip': '3C MaxxGrip', maxxspeed: 'MaxxSpeed',
  trail: 'Trail casing', enduro: 'Enduro casing', downhill: 'Downhill casing',
  endurance: 'Endurance', soft: 'Soft', supersoft: 'SuperSoft', protection: 'ProTection', blackchili: 'BlackChili',
  'super-race': 'Super Race', 'super-ground': 'Super Ground', 'super-trail': 'Super Trail', 'super-gravity': 'Super Gravity', 'super-downhill': 'Super Downhill',
  addix: 'ADDIX', 'addix-speed': 'ADDIX Speed', 'addix-speedgrip': 'ADDIX Speedgrip', 'addix-soft': 'ADDIX Soft', 'addix-ultra-soft': 'ADDIX Ultra Soft',
  hardwall: 'HardWALL', prowall: 'ProWALL', smartgrip: 'SmartGRIP', 'smartgrip-gravity': 'SmartGRIP Gravity',
  '4c-graphene': '4C Graphene', 'graphene-silica': 'Graphene + Silica', 'xc-race': 'XC Race casing',
  'tcs-light-sg2': 'TCS Light SG2', 'tcs-tough-sg1': 'TCS Tough SG1', tritec: 'TriTec',
  atc: 'ATC (trail casing)', aec: 'AEC (enduro casing)', agc: 'AGC (gravity casing)',
  'dual-layer': 'Dual Layer', grip3s: 'Grip3S'
};
/** @param {string} k @returns {string} */
var L = function(k){ return (k in LABELS ? LABELS[k] : k); };

/* front size + rear size for each wheel config */
/** @type {Object.<string, {front: WheelSize, rear: WheelSize}>} */
var WHEEL_CONFIG = { '29':{front:'29',rear:'29'}, '275':{front:'275',rear:'275'}, mullet:{front:'29',rear:'275'} };

/* Slot requiredness is a function of the selected frame (the DATA-MODEL-REVIEW
   section 4 design, IMPLEMENTED 2026-07-08 with the first hardtail/DH frames):
   hardtail => shock not required; DH-discipline frame => dropper not required
   (race DH runs rigid posts; there is no seatpost category). This feeds ONLY
   the UI completeness math ("N of M required parts") - `disciplines` still
   never feeds checkBuild verdicts (rule 16 separately ERRORS a shock ON a
   hardtail). See slotRequired() below GROUPS/SLOTS. */
/** @type {Group[]} */
var GROUPS = [
  { key:'frame', label:'Frame', icon:'F', slots:[ {key:'frame', label:'Frame', cat:'frame'} ] },
  { key:'fork',  label:'Fork',  icon:'Y', slots:[ {key:'fork', label:'Fork', cat:'fork'} ] },
  { key:'shock', label:'Rear Shock', icon:'O', slots:[ {key:'shock', label:'Rear Shock', cat:'shock'} ] },
  { key:'wheels', label:'Wheels', icon:'W', preset:{cat:'wheelset', label:'wheelset'}, slots:[
      {key:'frontWheel', label:'Front Wheel', cat:'frontwheel'},
      {key:'rearWheel',  label:'Rear Wheel',  cat:'rearwheel'},
      /* build-your-own-wheel alternate path (hub+rim instead of a complete
         wheel) - `altOf` marks these as satisfying the named canonical slot
         instead of being independently required; see effectiveWheel() and
         wheelPositionFilled() below, and setSlot()'s mutex clearing in
         index.html. Only a handful of brands sell hub+rim separately. */
      {key:'frontHub', label:'Front Hub', cat:'fronthub', altOf:'frontWheel'},
      {key:'frontRim', label:'Front Rim', cat:'rim', altOf:'frontWheel'},
      {key:'rearHub',  label:'Rear Hub',  cat:'rearhub', altOf:'rearWheel'},
      {key:'rearRim',  label:'Rear Rim',  cat:'rim', altOf:'rearWheel'} ] },
  { key:'tire', label:'Tires', icon:'T', slots:[
      {key:'frontTire', label:'Front Tire', cat:'tire'},
      {key:'rearTire',  label:'Rear Tire',  cat:'tire'} ] },
  { key:'drivetrain', label:'Drivetrain', icon:'D', preset:{cat:'groupset', label:'groupset'}, slots:[
      {key:'shifter', label:'Shifter', cat:'shifter'},
      {key:'derailleur', label:'Rear Derailleur', cat:'derailleur'},
      {key:'cassette', label:'Cassette', cat:'cassette'},
      {key:'chain', label:'Chain', cat:'chain'},
      {key:'crankset', label:'Crankset', cat:'crankset'} ] },
  { key:'brakes', label:'Brakes', icon:'B', preset:{cat:'brakeset', label:'brake set'}, slots:[
      {key:'frontBrake', label:'Front Brake', cat:'brake'},
      {key:'rearBrake', label:'Rear Brake', cat:'brake'},
      {key:'frontRotor', label:'Front Rotor', cat:'rotor'},
      {key:'rearRotor', label:'Rear Rotor', cat:'rotor'} ] },
  { key:'dropper', label:'Dropper Post', icon:'P', slots:[ {key:'dropper', label:'Dropper Post', cat:'dropper'} ] },
  { key:'cockpit', label:'Cockpit', icon:'C', preset:{cat:'cockpitset', label:'cockpit'}, slots:[
      {key:'handlebar', label:'Handlebar', cat:'handlebar'},
      {key:'stem', label:'Stem', cat:'stem'},
      {key:'grips', label:'Grips', cat:'grips', optional:true} ] },
  { key:'saddle', label:'Saddle', icon:'S', slots:[ {key:'saddle', label:'Saddle', cat:'saddle'} ] },
  { key:'pedals', label:'Pedals', icon:'E', slots:[ {key:'pedals', label:'Pedals', cat:'pedal'} ] }
];
/** @type {Slot[]} */
var SLOTS = GROUPS.reduce(function(a,g){ return a.concat(g.slots.map(function(s){ return Object.assign({group:g.key}, s); })); }, /** @type {Slot[]} */ ([]));

/* Is this slot required for a "complete" build, given the chosen frame?
   UI-completeness only - never a fit verdict. No frame chosen = the universal
   default (every non-optional slot required). */
/** @param {Slot} slot @param {Part|null|undefined} frame @returns {boolean} */
function slotRequired(slot, frame){
  if(slot.optional) return false;
  if(slot.altOf) return false;   // an alternate-path slot (e.g. frontHub/frontRim) is never independently required - only its altOf target counts, via wheelPositionFilled()
  if(frame && frame.cat === 'frame'){
    if(slot.key === 'shock' && frame.suspension === 'hardtail') return false;
    if(slot.key === 'dropper' && (frame.disciplines || []).indexOf('dh') >= 0) return false;
  }
  return true;
}

/** Slot keys that are an alternate path to filling `primaryKey` (GROUPS' `altOf` tag). @param {string} primaryKey @returns {string[]} */
function altSlotsOf(primaryKey){
  return SLOTS.filter(function(s){ return s.altOf === primaryKey; }).map(function(s){ return s.key; });
}
/** Is `primaryKey` filled directly, or via every one of its alternate slots (e.g. frontWheel via frontHub+frontRim)? Generalizes to `!!build[primaryKey]` for any slot with no alternates. @param {Build} build @param {string} primaryKey @returns {boolean} */
function wheelPositionFilled(build, primaryKey){
  if(build[primaryKey]) return true;
  var alts = altSlotsOf(primaryKey);
  return alts.length>0 && alts.every(function(k){ return !!build[k]; });
}

/* ---- SEED catalog (price USD sample, weight grams sample) ---------------- */
/** @type {Part[]} */
var PARTS = [
  /* FRAMES (weight = frame only, no shock; wheelConfigs = supported setups) */
  { id:'fr-santacruz-megatower-cc', cat:'frame', brand:'Santa Cruz', model:'Megatower CC', family:'santacruz-megatower', disciplines:['enduro'], price:4199, weight:3200, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:230, shockStroke:62.5, shockMount:'std', maxForkTravel:180, travel:165, udh:true, maxTire:2.5, bundledShock:null, frameOnly:true },
  { id:'fr-specialized-enduro-sworks', cat:'frame', brand:'Specialized', model:'Enduro S-Works', family:'specialized-enduro', disciplines:['enduro'], price:3000, weight:3300, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:205, shockStroke:60, shockMount:'trunnion', maxForkTravel:170, travel:170, udh:true, bundledShock:'sh-rockshox-vivid-ultimate-oem-205x60-trun', frameOnly:false },
  { id:'fr-yt-capra-core4', cat:'frame', brand:'YT', model:'Capra Core 4', family:'yt-capra', disciplines:['enduro'], price:4299, weight:3400, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'PF92', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-canyon-strive-cfr', cat:'frame', brand:'Canyon', model:'Strive CFR', family:'canyon-strive', disciplines:['enduro'], price:4999, weight:2005, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:30.9, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:170, travel:160, udh:true, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-06', source:'https://www.canyon.com/en-us/mountain-bikes/enduro-bikes/strive/cfr/strive-cfr/3195.html', desc:'drift flag 2026-07-08 AMBIGUOUS not actioned: canyon.com now shows "Sold out" across all sizes + "Members only product. Log in here" - no price visible to an anonymous fetch, so cant distinguish temporary sell-out from a phase-out or member-gated pricing. Needs a real browser session (canyon.com is Chrome-extension domain-blocked here). $4,999 frame-kit price + specs retained; revisit status when the page is fetchable' },
  { id:'fr-trek-slash', cat:'frame', brand:'Trek', model:'Slash 9.9', family:'trek-slash', disciplines:['enduro'], price:6000, weight:3300, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:190, travel:170, udh:true, maxTire:2.5, bundledShock:null, frameOnly:true },
  { id:'fr-norco-range-c1', cat:'frame', brand:'Norco', model:'Range C1', family:'norco-range', disciplines:['enduro'], price:5200, weight:3500, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'PF92', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:205, shockStroke:62.5, shockMount:'trunnion', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-transition-spire-alloy', cat:'frame', brand:'Transition', model:'Spire Alloy', family:'transition-spire', disciplines:['enduro'], price:3199, weight:3900, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:223, suspension:'full', shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:180, travel:170, udh:true, maxTire:2.6, bundledShock:null, frameOnly:true },
  { id:'fr-raaw-madonna-v22', cat:'frame', brand:'RAAW', model:'Madonna V2.2', family:'raaw-madonna', supersededBy:'fr-raaw-madonna-v3', disciplines:['enduro'], gen:'V2.2', price:2899, weight:3900, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:170, travel:160, udh:false, maxTire:2.6, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-06', source:'https://raawmtb.com/en-us/pages/madonna-v2-2' },
  { id:'fr-raaw-madonna-v3', cat:'frame', brand:'RAAW', model:'Madonna V3', family:'raaw-madonna', supersededBy:'fr-raaw-madonna-v32', disciplines:['enduro'], gen:'V3', price:2599, weight:3900, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:170, travel:160, udh:true, maxTire:2.6, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-06', source:'https://raawmtb.com/en-us/pages/madonna-v3' },
  { id:'fr-raaw-madonna-v32', cat:'frame', brand:'RAAW', model:'Madonna V3.2', family:'raaw-madonna', disciplines:['enduro'], gen:'V3.2', price:2733, weight:3900, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:170, travel:160, udh:true, maxTire:2.6, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-06', source:'https://raawmtb.com/en-us/pages/madonna-v3-2' },
  { id:'fr-giant-reign-advanced', cat:'frame', brand:'Giant', model:'Reign Advanced', family:'giant-reign', disciplines:['enduro'], price:3900, weight:3300, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'PF92', seatTube:30.9, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:205, shockStroke:62.5, shockMount:'trunnion', maxForkTravel:170, travel:160, udh:true, maxTire:2.5, bundledShock:null, frameOnly:true },
  { id:'fr-pivot-firebird', cat:'frame', brand:'Pivot', model:'Firebird', family:'pivot-firebird', disciplines:['enduro'], price:5200, weight:3200, wheelConfigs:['29','mullet'], rearAxle:'SuperBoost157', headset:'tapered', bb:'PF92', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:170, travel:162, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-nukeproof-giga-290', cat:'frame', brand:'Nukeproof', model:'Giga 290', family:'nukeproof-giga', disciplines:['enduro'], price:3400, weight:3500, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:205, shockStroke:60, shockMount:'trunnion', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-kona-process-153', cat:'frame', brand:'Kona', model:'Process 153', family:'kona-process', disciplines:['enduro'], price:3499, weight:3600, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:205, shockStroke:60, shockMount:'trunnion', maxForkTravel:170, travel:153, udh:false, bundledShock:null, frameOnly:true },
  { id:'fr-orbea-rallon-mteam', cat:'frame', brand:'Orbea', model:'Rallon M-Team', family:'orbea-rallon', disciplines:['enduro'], price:5000, weight:3300, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:230, shockStroke:60, shockMount:'std', maxForkTravel:170, travel:160, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-rockymountain-altitude-c70', cat:'frame', brand:'Rocky Mountain', model:'Altitude C70', family:'rockymountain-altitude', disciplines:['enduro'], price:4500, weight:3400, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:30.9, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:230, shockStroke:60, shockMount:'std', maxForkTravel:170, travel:160, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-commencal-meta-sx-v5', cat:'frame', brand:'Commencal', model:'Meta SX V5', family:'commencal-meta-sx', disciplines:['enduro'], gen:'V5', price:2600, weight:4080, wheelConfigs:['mullet'], rearAxle:'Boost148', headset:'tapered', bb:'PF92', seatTube:34.9, brakeMount:'PM', maxRotorR:200, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:170, travel:165, udh:true, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-06', source:'https://www.commencal.com/ad/en/tech-meta-sx-v5.html' },
  { id:'fr-propain-spindrift-cf', cat:'frame', brand:'Propain', model:'Spindrift CF', family:'propain-spindrift', disciplines:['enduro'], price:3600, weight:3400, wheelConfigs:['29','275','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:190, travel:180, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-ibis-hd6', cat:'frame', brand:'Ibis', model:'HD6', family:'ibis-hd6', disciplines:['enduro'], price:3999, weight:2700, wheelConfigs:['mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:190, travel:165, udh:true, maxTire:2.5, bundledShock:null, frameOnly:true },
  { id:'fr-forbidden-dreadnought', cat:'frame', brand:'Forbidden', model:'Dreadnought', family:'forbidden-dreadnought', disciplines:['enduro'], price:3700, weight:3350, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:180, travel:154, udh:true, maxTire:2.6, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-06', source:'https://forbiddenbike.com/faqs/dreadnought-faqs/' },
  { id:'fr-yeti-sb160', cat:'frame', brand:'Yeti', model:'SB160', family:'yeti-sb160', disciplines:['enduro'], price:5500, weight:3200, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:170, travel:160, udh:true, maxTire:2.6, bundledShock:null, frameOnly:true },
  { id:'fr-frameworks-enduro', cat:'frame', brand:'Frameworks', model:'Enduro', family:'frameworks-enduro', modelYear:2026, disciplines:['enduro'], price:3999, weight:3500, wheelConfigs:['mullet'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:200, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:170, travel:172, udh:true, bundledShock:'sh-fox-float-x2-230x65', frameOnly:false },
  /* --- discipline expansion pass 8 (2026-07-08): the Privateer 161 Gen 2, from the FETCHED privateerbikes.com frameset page (ships WITH a custom-tuned Float X2 205x60 -> bundledShock; UDH explicitly NO - flip-chip dropouts instead) --- */
  { id:'fr-privateer-161-g2', cat:'frame', brand:'Privateer', model:'161', family:'privateer-161', gen:'Gen 2', disciplines:['enduro'], price:2500, weight:4830, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, maxTire:2.5, suspension:'full', shockEye:205, shockStroke:60, shockMount:'trunnion', maxForkTravel:180, travel:161, udh:false, bundledShock:'sh-fox-float-x2-perf-elite-205x60-trun', frameOnly:false, verified:true, lastChecked:'2026-07-08', source:'https://privateerbikes.com/products/privateer-161-frameset', desc:'VERIFIED 2026-07-08 vs re-fetched privateerbikes.com 161 Gen 2 frameset page: P2 4.83kg (without shock, axle, etc.) MAKER-STATED; 161mm (174 overstroked w/ 65mm shock), 29 or mixed, 205x60 trunnion (Fox trunnion metric size), 148x12, FSA ZS44/ZS56, 73mm threaded, 31.6 post, 203 max rotor (PM certain - no 203 flat-mount exists), 2.5in design tire, UDH: NO (adjustable rear centre + flip chips); frameset ships the custom-tuned Float X2 205x60. price = sample (GBP 1,977 RRP -> ~$2,500 USD-equiv; design fork 170mm)' },
  /* --- discipline expansion, Canyon sweep (2026-07-08): the first TRAIL frame. All interfaces from the FETCHED canyon.com Spectral CF 8 spec page (140/150mm, 29+mullet flip chip, 12x148, 34.9 post, BSA73, tapered, 200mm max rotors) + UDH per Vital's 2025 spec listing. Shock size 230x60 corroborated via mtbr hardware thread (the spec page names the Super Deluxe Select+ but not its size). Lux World Cup XC frame DELIBERATELY SKIPPED this pass: its rear BRAKE MOUNT is stated nowhere fetched (modern XC frames increasingly use flat mount - entering 'PM' unverified risks a false green); revisit with its geometry PDF + the SIDLuxe 210x50. --- */
  { id:'fr-canyon-spectral-cf', cat:'frame', brand:'Canyon', model:'Spectral CF', family:'canyon-spectral', disciplines:['trail'], price:2999, weight:2900, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:200, suspension:'full', shockEye:230, shockStroke:60, shockMount:'std', maxForkTravel:160, travel:140, udh:true, bundledShock:null, frameOnly:false, desc:'price/weight/maxForkTravel = sample (sold as a complete bike, $5,099; stock fork 150mm); interfaces from the fetched canyon.com Spectral CF 8 spec page; 230x60 via mtbr hardware corroboration; UDH per Vital 2025 spec' },
  /* --- discipline expansion, Commencal sweep (2026-07-08): the first DH frame. Interfaces from the FETCHED commencal.com frame page (23CSUP1: ZS56/ZS56 straight head tube, 250x75, PF107, 31.6 post, 223 max rotor, 5.3 kg, no UDH, 29+mixed). Rear axle CORRECTED 2026-07-08 to native SuperBoost157 + 220mm travel per the FETCHED commencal.com complete-bike page (23SUPR: "Rear Hub dimension: 157x12mm"); the earlier 12x150/200 came from Vital's spec table, which was describing the frame run with the 157->150 conversion kit (A22WHADAPDHV5) - see the row desc for the one-axle-modeling nuance. --- */
  { id:'fr-commencal-supreme-dh-v5', cat:'frame', brand:'Commencal', model:'Supreme DH V5', family:'commencal-supreme-dh', gen:'V5', disciplines:['dh'], price:2800, weight:5300, wheelConfigs:['29','mullet'], rearAxle:'SuperBoost157', headset:'straight-dc', headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/40', bb:'PF107', seatTube:31.6, brakeMount:'PM', maxRotorR:223, suspension:'full', shockEye:250, shockStroke:75, shockMount:'std', maxForkTravel:203, travel:220, udh:false, bundledShock:null, frameOnly:true, desc:'price + maxForkTravel = sample; headTube capture = ZS56/ZS56 per the fetched page (straight-dc steerer fit); weight 5,3 kg MAKER-CONFIRMED (23CSUP1 product page). rearAxle SuperBoost157 + travel 220 CORRECTED 2026-07-08: the FETCHED maker complete-bike page (23SUPR) states "Rear Hub dimension: 157x12mm" and 220mm rear travel (the earlier 12x150/200 came from Vital, describing the frame with the conversion kit fitted). CONVERSION-KIT NUANCE: Commencal ships a 157->150 adapter (A22WHADAPDHV5), so a 12x150 wheel physically bolts up too; the engine models one native axle (157) only, so a 150 rear wheel reads as an axle error here - a known limitation of single-axle modeling, not a real incompatibility for an owner who fits the kit' },
  /* --- discipline expansion pass 2 (2026-07-08): more DH frames --- */
  { id:'fr-canyon-sender-cfr', cat:'frame', brand:'Canyon', model:'Sender CFR', family:'canyon-sender', disciplines:['dh'], price:3499, weight:3300, wheelConfigs:['29','mullet'], rearAxle:'SuperBoost157', headset:'straight-dc', bb:'BSA83', seatTube:30.9, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:250, shockStroke:75, shockMount:'std', maxForkTravel:203, travel:200, udh:false, bundledShock:null, frameOnly:false, desc:'price/weight/maxRotorR/maxForkTravel = sample (sold as completes, $7,799); 200mm rear, 250x75, 12x157, 30.9 post, mullet(S/M)+29(L/XL) per Vital spec table; BSA 83 shell per builder-confirmed DUB BSA83; headset straight-dc per stock dual-crown (BoxXer/Fox 40); hanger pre-UDH (udh:false, noted)' },
  { id:'fr-yt-tues-cf-29', cat:'frame', brand:'YT', model:'Tues CF (29)', family:'yt-tues', disciplines:['dh'], price:2999, weight:3600, wheelConfigs:['29'], rearAxle:'150x12', headset:'straight-dc', bb:'BSA83', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:250, shockStroke:75, shockMount:'std', maxForkTravel:203, travel:200, udh:false, bundledShock:null, frameOnly:false, desc:'price/weight/seatTube/maxRotorR/maxForkTravel = sample; 200mm, 250x75 + rear 12x150 per bikes.fan/99spokes 2023-24 Core listings; bb = "SRAM DUB BSA" per fetched yt-industries.com Core 3 page, 83mm DH width assumed (BB advisory is info-only, noted); headset straight-dc per stock dual-crown (Ohlins DH38/BoxXer)' },
  { id:'fr-santacruz-v10-8', cat:'frame', brand:'Santa Cruz', model:'V10 8', family:'santacruz-v10', gen:'8', disciplines:['dh'], price:3999, weight:3800, wheelConfigs:['29','mullet'], rearAxle:'SuperBoost157', headset:'straight-dc', bb:'BSA83', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:250, shockStroke:75, shockMount:'std', maxForkTravel:203, travel:208, udh:false, bundledShock:null, frameOnly:true, desc:'price/weight/maxRotorR/maxForkTravel = sample; 208mm + 29/MX per santacruzbicycles.com bike archive; 250x75 + 12x157 + 31.6 post per corroborated spec listings (Cambria retailer carries); bb BSA83 = V10-line DH shell, sample-noted (BB advisory is info-only)' },
  { id:'fr-trek-session-8-29', cat:'frame', brand:'Trek', model:'Session 8 (29)', family:'trek-session', disciplines:['dh'], price:2999, weight:4200, wheelConfigs:['29'], rearAxle:'SuperBoost157', headset:'straight-dc', bb:'BSA83', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:250, shockStroke:72.5, shockMount:'std', maxForkTravel:203, travel:200, udh:false, bundledShock:null, frameOnly:false, desc:'price/weight/maxRotorR/maxForkTravel = sample; 200mm, 250x72.5 coil, 157x12, 31.6 post, "SRAM DUB, 83mm English/BSA threaded" per FETCHED Vital 2022 Session 8 29 GX spec table (trekbikes.com is fetch-blocked); Alpha Platinum alu; headset straight-dc per stock dual-crown' },
  /* --- discipline expansion pass 7 (2026-07-08): the first TRUNNION DH frame, first UDH/T-Type DH frame, and the seventh DH frame - VERIFIED (RAAW publishes a full spec sheet, Madonna precedent) --- */
  { id:'fr-raaw-yalla-v2', cat:'frame', brand:'RAAW', model:'Yalla!! V2', family:'raaw-yalla', gen:'V2', disciplines:['dh'], price:2926, weight:4200, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'straight-dc', headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/40', bb:'BSA83', seatTube:31.6, brakeMount:'PM', maxRotorR:223, maxTire:2.6, suspension:'full', shockEye:225, shockStroke:75, shockMount:'trunnion', maxForkTravel:203, travel:198, udh:true, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://raawmtb.com/en-us/pages/yalla-v2', desc:'all from the fetched raawmtb.com Yalla!! V2 spec page: 198mm, 225x75 TRUNNION, 148x12 (a DH frame on Boost - V1 was 157), ZS56/56 straight head tube (dual-crown, ~602mm A2C), BSA83/ISCG05, 31.6 post (140mm max insert), PM 200+3 w/ 220+3 option (-> 223 max), 2.6in max tire, UDH/T-Type, 4.2kg w/o shock, $2,926 frame kit (price re-verified 2026-07-08: $2,924->$2,926, small maker bump)' },
  /* --- discipline expansion pass 4 (2026-07-08): the first FULL-27.5 DH frame (activates the 275 wheelConfig for DH; pairs the BoXXer 27.5 + Synthesis DH 27.5 front) --- */
  { id:'fr-commencal-frs', cat:'frame', brand:'Commencal', model:'FRS', family:'commencal-frs', modelYear:2025, disciplines:['dh'], price:2500, weight:4220, wheelConfigs:['275'], rearAxle:'150x12', headset:'straight-dc', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'PF107', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:250, shockStroke:75, shockMount:'std', maxForkTravel:203, travel:200, udh:false, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://www.commencal.com/us/en/frame-commencal-frs-pure-white/FT4FRS3.html', desc:'VERIFIED 2026-07-08 vs re-fetched commencal.com FRS 2025 frame product page (FT4FRS3): "Frame weight: 4,22 kg / 9,3 lb" MAKER-STATED; full 27.5 F+R, 200mm, 250x75 std, rear axle 150x12 (maker-explicit), ZS44/ZS56, PF107, 31.6 post, 203 max rotor, UDH: No - all maker-confirmed; price + maxForkTravel = sample (configurator prices dynamically, EUR); completes ship a Fox 40 27.5 (straight-dc steerer via reducer lower cup), brakeMount PM certain at 203mm' },
  /* --- discipline expansion pass 2: the first XC HARDTAIL (activates the hardtail machinery: no shock block, shock slot not required, rule-16 guard). FM rear brake per FETCHED BikeRadar Exceed article ("Canyon has adopted the Flat Mount standard for the rear brake caliper") - the first frame on the new 'FM' vocab. --- */
  { id:'fr-canyon-exceed-cf', cat:'frame', brand:'Canyon', model:'Exceed CF', family:'canyon-exceed', modelYear:2025, disciplines:['xc'], price:1999, weight:1100, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:30.9, brakeMount:'FM', maxRotorR:180, maxTire:2.4, suspension:'hardtail', maxForkTravel:120, udh:true, frameOnly:false, desc:'price/weight/maxRotorR/maxForkTravel/rearAxle = sample (rear axle = the modern XC Boost default, unstated in fetched sources; 120 fork max = permissive sample - the design fork is 100mm per BikeRadar); FM rear + 2.4in clearance per fetched BikeRadar articles; BSA threaded + UDH + 30.9 post per BikeRadar 2025 coverage; CFR gen frame was 835g claimed' },
  /* --- discipline expansion pass 2: TRAIL frames (both from fetched maker pages) --- */
  { id:'fr-raaw-jibb', cat:'frame', brand:'RAAW', model:'Jibb', family:'raaw-jibb', gen:'V1', disciplines:['trail'], price:1263, weight:3900, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, maxTire:2.6, suspension:'full', shockEye:185, shockStroke:55, shockMount:'trunnion', maxForkTravel:160, travel:135, udh:false, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://raawmtb.com/en-us/pages/jibb', desc:'VERIFIED 2026-07-08 vs re-fetched raawmtb.com Jibb spec page (RAAW publishes full spec sheets - Madonna/Yalla precedent): 3.9 kg (incl. shock hardware+axle+frame protection, w/o shock, size S) MAKER-STATED; 135mm rear/150+10 fork, 185x55 trunnion, 29, 148x12, 31.6 post (35 outside), 44/56 ZS, 73 BSA/ISCG05, 203 PM (180 avail), 84mm/2.6in max tire, $1,263 V1 frame kit (price re-verified 2026-07-08: from $1,263, was $1,261 - small maker bump); UDH not mentioned -> udh:false noted' },
  { id:'fr-commencal-meta-v5', cat:'frame', brand:'Commencal', model:'Meta V5', family:'commencal-meta', gen:'V5', disciplines:['trail'], price:2200, weight:4060, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/40', bb:'PF92', seatTube:34.9, brakeMount:'PM', maxRotorR:223, suspension:'full', shockEye:210, shockStroke:55, shockMount:'std', maxForkTravel:170, travel:150, udh:true, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://www.commencal.com/us/en/frame-commencal-meta-2-2023/23CMETATR2.html', desc:'VERIFIED 2026-07-08 vs re-fetched commencal.com Meta V5 frame product page (weight lives on the fetchable product page, not the landing page): "Frame weight: 4,06 kg / 8,95 lb" MAKER-STATED; 150mm, 210x55 std, 148x12, UDH yes, PF92, 34.9 post, ZS56/ZS56 head tube, 223 max rotor - all maker-confirmed; headset = tapered steerer-fit per template (ZS56/ZS56 runs reducer cups; stock builds ship tapered single-crowns); price = sample; maxForkTravel 170 derived from page-stated max A2C 586mm' },
  /* --- discipline expansion pass 3 (2026-07-08): big-name trail frames whose shock sizes already exist in-catalog --- */
  { id:'fr-specialized-stumpjumper-15', cat:'frame', brand:'Specialized', model:'Stumpjumper 15', gen:'15', family:'specialized-stumpjumper', disciplines:['trail'], price:2799, weight:3200, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:210, shockStroke:55, shockMount:'std', maxForkTravel:160, travel:145, udh:true, bundledShock:null, frameOnly:false, desc:'price/weight/maxRotorR/maxForkTravel/bb = sample (specialized.com is fetch-blocked); 145mm FSR, 210x55 (S2-S6; S1 runs 52.5), 12x148 Boost, 34.9 post per Flow/BikeRadar coverage + specialized.com listing names; UDH per S-Works build shipping full-mount SRAM XX AXS Transmission; aftermarket 210x55 shocks confirmed fitting by The Lost Co. shock-testing article; mullet via geometry adjust per Flow review' },
  { id:'fr-trek-fuel-ex-c-gen6', cat:'frame', brand:'Trek', model:'Fuel EX C Gen 6', gen:'Gen 6', family:'trek-fuel-ex', disciplines:['trail'], price:2699, weight:3100, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:205, shockStroke:60, shockMount:'trunnion', maxForkTravel:160, travel:140, udh:true, bundledShock:null, frameOnly:true, desc:'price/weight/maxRotorR/maxForkTravel/bb/rearAxle = sample (trekbikes.com fetch-blocked); 140mm, 205x60 TRUNNION with broad aftermarket shock fit + UDH + 34.9 post per BikeRadar gen-6 coverage; AL frameset sold on trekbikes.com (carbon C = the Vital frames entry); mullet supported on smaller sizes per gen-6 coverage' },
  { id:'fr-santacruz-hightower-3', cat:'frame', brand:'Santa Cruz', model:'Hightower 3', gen:'3', family:'santacruz-hightower', disciplines:['trail'], price:3399, weight:3300, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, suspension:'full', shockEye:210, shockStroke:55, shockMount:'std', maxForkTravel:160, travel:145, udh:true, bundledShock:null, frameOnly:true, desc:'price/weight/maxRotorR/maxForkTravel/udh/bb = sample (santacruzbicycles.com deep pages fetch-blocked); 210x55 = the Hightower 2/3 size per The Lost Co. fitment listing ("210x55 - Santa Cruz Hightower 2-3"); 145mm, 29, 31.6 post per SC support-page coverage; VPP threaded-BB platform' },
  /* --- discipline expansion pass 6: the 130mm trail tier (Neuron CF, fetched canyon.com CF 8 spec). M-XL = 29 + 210x50; XS/S run 27.5 + 190x45 - a DIFFERENT config, so this row is the 29 platform only (a single row can't carry two shock sizes). --- */
  { id:'fr-canyon-neuron-cf', cat:'frame', brand:'Canyon', model:'Neuron CF', family:'canyon-neuron', disciplines:['trail'], price:2299, weight:2460, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:30.9, brakeMount:'PM', maxRotorR:180, suspension:'full', shockEye:210, shockStroke:50, shockMount:'std', maxForkTravel:150, travel:130, udh:false, bundledShock:null, frameOnly:false, desc:'price/maxForkTravel = sample (sold as completes from $2,999; design fork 140mm); 130mm, 210x50 (M-XL), 12x148, 30.9 post, BSA HT2 68/73, 180/180 rotors, 2460g frame from the FETCHED canyon.com Neuron CF 8 spec; maxRotorR 180 = maker-demonstrated stock (no larger stated); UDH not mentioned -> udh:false noted (Jibb precedent); XS/S sizes are 27.5 + 190x45 - not this row' },
  /* --- discipline expansion pass 7: the first TRAIL/AM HARDTAIL (vocab widened: frameBb += BSA68 - the classic 68mm threaded shell hardtails still ship). All specs from the FETCHED commencal.com Meta HT V3 2025 frame page (FT5MHTV31). --- */
  { id:'fr-commencal-meta-ht-v3', cat:'frame', brand:'Commencal', model:'Meta HT V3', family:'commencal-meta-ht', gen:'V3', modelYear:2025, disciplines:['trail','enduro'], price:550, weight:2320, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/40', bb:'BSA68', seatTube:31.6, brakeMount:'PM', maxRotorR:200, maxTire:2.5, suspension:'hardtail', maxForkTravel:160, udh:true, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://www.commencal.com/us/en/commencal-meta-ht-v3-hardtail-mtb-frame-2025-us/FT5MHTV31.html', desc:'VERIFIED 2026-07-08 vs re-fetched commencal.com Meta HT V3 frame product page (FT5MHTV31): "Frame weight: 2,32 kg / 5,11 lb" MAKER-STATED; 29 (M-XL) + 29/27.5 mullet (S), 148x12 UDH, ZS56/56 head tube (tapered single-crown fit), BSA 68mm, 31.6/34.9 post, PM 200 max, 64mm (~2.5in) maker max tire - all maker-confirmed; price + maxForkTravel = sample (page prices dynamically; design fork 150mm)' },
  /* --- discipline expansion pass 8: the first STEEL frame (Cotic Solaris, Reynolds 853 trail hardtail; cotic.co.uk fetches - new discovery). Its PM7 mount takes a 180mm rotor ONLY (a 160 will not mount either - the frame-side minimum is un-modeled, noted). --- */
  { id:'fr-cotic-solaris', cat:'frame', brand:'Cotic', model:'Solaris', family:'cotic-solaris', modelYear:2025, disciplines:['trail'], price:1550, weight:2300, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'EC44/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:180, suspension:'hardtail', maxForkTravel:130, udh:true, frameOnly:true, desc:'price (GBP 1,199 frame-only, converted sample) + weight + maxForkTravel = sample (design fork ~120mm); PM7 Post Mount 180mm rotor ONLY (160 will not mount - frame-side minimum un-modeled) + UDH on 2025 gloss frames (2024 matte = proprietary Cotic hanger) from the fetched cotic.co.uk Solaris page; 31.6 post, 148x12, ZS44/EC44 44mm cups (tapered fit), Reynolds 853 steel; bb BSA73 = Cotic family standard (advisory-only field)' },
  /* --- discipline expansion pass 5: the second XC HARDTAIL. scott-sports.com product pages FETCH (new discovery): BB92/UDH/12x148 from the maker frame page; post-mount rear ("direct-mount post bosses for a 160mm rotor") from the fetched BikeRadar review; 31.6 post + PF92 + 847g from the fetched Vital spec table. --- */
  { id:'fr-scott-scale-rc-sl', cat:'frame', brand:'Scott', model:'Scale RC SL', family:'scott-scale', disciplines:['xc'], price:2999, weight:847, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'PF92', seatTube:31.6, brakeMount:'PM', maxRotorR:160, suspension:'hardtail', maxForkTravel:120, udh:true, frameOnly:true, desc:'price + maxForkTravel = sample (design fork 100mm; complete RC SL $13,999); PM rear = direct post bosses FOR A 160MM ROTOR per fetched BikeRadar (maxRotorR 160 - no larger rear rotor is maker-demonstrated), BB92/UDH/12x148 per fetched scott-sports.com frame page, 31.6 post + PF92 + 847g (HMX-SL, M, w/ hardware) per fetched Vital spec table; Syncros angle-adjust headset (tapered steerer fit)' },
  /* --- discipline expansion pass 8: the Privateer 141 Gen 2 (trail sibling of the 161; same fetched-source quality; 185x55 trunnion = the RAAW Jibb size, so aftermarket shocks already exist in-catalog) --- */
  { id:'fr-privateer-141-g2', cat:'frame', brand:'Privateer', model:'141', family:'privateer-141', gen:'Gen 2', disciplines:['trail'], price:2400, weight:4830, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, maxTire:2.5, suspension:'full', shockEye:185, shockStroke:55, shockMount:'trunnion', maxForkTravel:160, travel:141, udh:false, bundledShock:'sh-fox-float-x-perf-elite-185x55-trun', frameOnly:false, verified:true, lastChecked:'2026-07-08', source:'https://privateerbikes.com/products/privateer-141-frameset', desc:'VERIFIED 2026-07-08 vs re-fetched privateerbikes.com 141 Gen 2 frameset page: P2 4.83kg (without shock, axle, etc.) MAKER-STATED; 141mm, 29 or mixed, 185x55 trunnion (Fox trunnion metric size - the Jibb size), 148x12, FSA ZS44/ZS56, 73mm threaded, 31.6 post, 203 max rotor (PM certain - no 203 flat-mount exists), 2.5in design tire, UDH: NO (adjustable rear centre + flip chips); ships the custom-tuned Float X 185x55. price = sample (GBP 1,889 RRP -> ~$2,400 USD-equiv; design fork 150mm)' },
  { id:'fr-commencal-tempo', cat:'frame', brand:'Commencal', model:'T.E.M.P.O.', family:'commencal-tempo', disciplines:['trail','xc'], price:1800, weight:3440, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/40', bb:'PF92', seatTube:31.6, brakeMount:'PM', maxRotorR:200, maxTire:2.5, suspension:'full', shockEye:210, shockStroke:50, shockMount:'std', maxForkTravel:140, travel:125, udh:true, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://www.commencal.com/us/en/frame-commencal-tempo-2-2023/23CMETATC2.html', desc:'VERIFIED 2026-07-08 vs re-fetched commencal.com T.E.M.P.O. frame product page: "Frame weight: 3,44 kg / 7,58 lb" MAKER-STATED; 125mm, 29/29, 210x50 std, 148x12 UDH, ZS56/56 head tube (tapered single-crown fit), PF92, 31.6 post, PM 200 max rotor, 64mm (~2.5in) maker max tire - all maker-confirmed (rule 18 active); price + maxForkTravel = sample (design fork 130mm)' },
  /* --- discipline expansion pass 4: the Canyon Lux World Cup - the first XC FULL-SUSPENSION frame, and the first FLAT-MOUNT full-sus. The pass-2/3 blocker (rear brake mount stated nowhere fetched) is cleared: the FETCHED MBR review states "At the slender rear dropouts you'll find a 160mm flat mount for the brake calliper", and the FETCHED bike-magazin.de piece on the NEW 2026/27 gen confirms by contrast ("a return to the post-mount standard on the rear brake"). --- */
  { id:'fr-canyon-lux-world-cup-cf', cat:'frame', brand:'Canyon', model:'Lux World Cup CF', family:'canyon-lux', disciplines:['xc'], price:2999, weight:1925, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'PF92', seatTube:30.9, brakeMount:'FM', maxRotorR:160, suspension:'full', shockEye:210, shockStroke:50, shockMount:'std', maxForkTravel:120, travel:100, udh:true, bundledShock:null, frameOnly:false, desc:'price/maxForkTravel = sample (sold as completes from $5,499; design fork 110mm); FM 160 rear per FETCHED MBR review; SIDLuxe 210x50 + 12x148 + 30.9 post + 100mm rear per FETCHED canyon.com CFR AXS spec; UDH + PF92 + 1925g CF frame weight per FETCHED Vital 2023 CF 8 spec table (canyon.com CFR AXS page lists a CeramicSpeed "PF 86,5" BB - conflicting, flag at verification; bb advisory is info-only)' },
  /* --- catalog-expand-9: three more Commencal frames, all from re-fetched commencal.com product pages (new URLs found via commencal.com/us/en/ nav - the old Clash URL that 404'd in pass 6 is superseded). No new shock/fork/wheel rows needed - all three land on eye x stroke / axle / BB combos already in-catalog. --- */
  { id:'fr-commencal-supreme-dh-v52', cat:'frame', brand:'Commencal', model:'Supreme DH V5.2', family:'commencal-supreme-dh', gen:'V5.2', modelYear:2027, disciplines:['dh'], price:2800, weight:5800, wheelConfigs:['29','mullet'], rearAxle:'SuperBoost157', headset:'straight-dc', headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/40', bb:'PF107', seatTube:31.6, brakeMount:'PM', maxRotorR:223, suspension:'full', shockEye:250, shockStroke:75, shockMount:'std', maxForkTravel:203, travel:220, udh:true, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://www.commencal.com/us/en/FT7SUPV521.html', desc:'VERIFIED 2026-07-08 vs fetched commencal.com Supreme DH V5.2 frame page (FT7SUPV521, 2027 model): "Rear Hub dimension: 157x12mm" MAKER-STATED (SuperBoost157, same as the V5 sibling) - the "Rear Axle dimension: ...186mm" figure alongside it is the physical axle-rod length, not hub spacing, so it does not feed rearAxle; 220mm, 250x75 std shock, ZS56/56 head tube (straight-dc dual-crown fit), PF107, 31.6/34.9 post, PM 200 mount / 223 max rotor - all maker-stated; weight "5,3 kg" (S) / "5,8 kg" (M) MAKER-STATED, M figure used; UDH standard on S/M/L/XL, XS alone runs a custom non-UDH 200mm axle - documented, majority (udh:true) used for this row; price not listed (dynamic configurator) = sample, matches V5 sibling; maxForkTravel = sample (no stated max, mirrors V5). maxTire omitted: the fetched 65mm/2.56in clearance figure is tagged to the 27.5 (Ø584) config only and this frame also runs 29, so a single maxTire would risk a false red on the 29 setup - left dormant per the Lux Trail precedent.' },
  { id:'fr-commencal-clash-v3', cat:'frame', brand:'Commencal', model:'Clash V3', family:'commencal-clash', gen:'V3', modelYear:2027, disciplines:['enduro'], price:2200, weight:4100, wheelConfigs:['275'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS56/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:223, maxTire:2.5, suspension:'full', shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true, desc:'the first full-27.5 ENDURO frame (previous full-27.5 rows were all DH); interfaces from the fetched commencal.com Clash V3 frame page (FT7CLAV31, 2027 model, $2,200): full 27.5/27.5, 170mm, 230x65 std shock, 148x12, ZS56/56 head tube (tapered single-crown fit), BSA73, 34.9 post, PM 200 mount / 223 max rotor, UDH yes, 65mm (~2.5in) rear tire clearance - all maker-stated on the product page. weight = sample (page lists "TBC", estimated from the similar Meta SX V5 enduro platform); maxForkTravel = sample (page states only a 577mm max fork-height geometry figure, not a travel spec) - so left unverified pending a maker-stated weight. Buildable out of the box on existing catalog: fw-dtswiss-e-1900-275 / rw-dtswiss-e-1900-275(-xd) front+rear (Boost110/148, CL/XD), fk-rockshox-zeb-ultimate-275-170, sh-*-230x65 shocks, and four in-catalog 27.5 enduro tires (Assegai/DHR II EXO+, Kryptotal-Re, Magic Mary Super Gravity).' },
  { id:'fr-commencal-meta-tr-v4', cat:'frame', brand:'Commencal', model:'Meta TR V4', family:'commencal-meta-tr', gen:'V4', disciplines:['trail'], price:1800, weight:3700, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'PF92', seatTube:34.9, brakeMount:'PM', maxRotorR:220, maxTire:2.5, suspension:'full', shockEye:210, shockStroke:55, shockMount:'std', maxForkTravel:160, travel:140, udh:false, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://www.commencal.com/us/en/frame-commencal-meta-tr-dark-slate/22CMETATRGR.html', desc:'VERIFIED 2026-07-08 vs fetched commencal.com Meta TR V4 frame product page (22CMETATRGR): "Frame Weight: 3.7 kg (8.15 lbs)" MAKER-STATED; 140mm, 210x55 STANDARD mount (not trunnion - shares the Stumpjumper 15/Hightower 3 shock size already in-catalog), 148x12, ZS44/56 head tube (tapered single-crown fit), PF92, 34.9/38.5 post, PM 200 mount / 220 max rotor, UDH: No, 65mm (~2.5in) rear tire clearance - all maker-confirmed; price: two colorways on sale from $1,800 (Dark Slate) / $1,900 (Brushed) down to $1,200 - the lower pre-sale MSRP used per the USD-MSRP-not-street-price convention; maxForkTravel = sample (page states only a max-fork-height geometry figure, not a travel spec).' },
  /* --- catalog-expand-A: RAAW Madonna R, a concurrent (not superseding) sibling to the V3.2 - RAAW sells both side by side ("Madonna R vs Madonna V3.2" is their own comparison page). 165mm rear (V3.2 is 160) on the same 205x65 trunnion shock size already in-catalog, so no new shock row needed. All specs from the FETCHED raawmtb.com Madonna R page. --- */
  { id:'fr-raaw-madonna-r', cat:'frame', brand:'RAAW', model:'Madonna R', family:'raaw-madonna', gen:'R', disciplines:['enduro'], price:2048, weight:4200, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:203, suspension:'full', shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:170, travel:165, udh:true, maxTire:2.6, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://raawmtb.com/en-us/pages/madonna-r', desc:'VERIFIED 2026-07-08 vs fetched raawmtb.com Madonna R page: 165mm rear/170 fork (sold alongside the V3.2, not a replacement for it - flip-chip 29/mullet, same as the V-series); shock "205x65 - Trunnion 30x8mm" (matches the existing sh-rockshox-super-deluxe-205x65-trun); rear axle "148x12" Boost; "73mm BSA/ISCG05"; headset "44/56 Zero stack" (tapered steerer fit, RAAW-family convention); seatpost "31.6mm inside, 35mm outside"; brake "200+3mm post mount" (-> maxRotorR 203, Yalla V2 +3 convention); drivetrain note "UDH/T-Type compatible" -> udh:true; max tire 2.6in; weight "4.2kg (incl. all hardware, w/o shock, size M)" MAKER-STATED; $2,048 frame kit US MSRP (real, not converted) from the same page.' },
  /* --- catalog-expand-A: Canyon Grand Canyon AL - an alloy trail hardtail, a budget alternative to Exceed CF/Scale RC SL. canyon.com/en-us confirms the model is sold in the US lineup but its own product page returned no spec table (marketing copy only); hard interfaces below are from the FETCHED canyon.com AT/EU regional product page for the identical frame (Canyon frames are one global platform, region only changes complete-bike spec/pricing) - price is therefore a EUR->USD sample conversion, so this row stays UNVERIFIED pending a confirmed US MSRP. maxRotorR = the maker-stated STOCK 180mm spec (Neuron CF precedent: "maker-demonstrated stock, no larger stated"), not a proven engineering max. --- */
  { id:'fr-canyon-grand-canyon-al', cat:'frame', brand:'Canyon', model:'Grand Canyon AL', family:'canyon-grand-canyon', disciplines:['trail'], price:1099, weight:1989, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:180, suspension:'hardtail', maxForkTravel:120, udh:false, frameOnly:false, desc:'UNVERIFIED sample: interfaces from the fetched canyon.com/en-at Grand Canyon AL 7 product page (identical global frame platform): 29in (M; 27.5in on XS, 24in on 3XS - not modeled, single-config precedent), 12x148mm Boost, 1-1/8 - 1.5in tapered steerer, "BSA HT2 68/73" threaded shell (entered as BSA73, the MTB-standard width; the "68/73" wording is ambiguous - advisory field only), 31.6mm post, Center Lock hub + Shimano MT401 POST MOUNT caliper stock at 180/180mm (maxRotorR 180 = maker-demonstrated stock, no larger stated, Neuron CF precedent), 120mm design fork travel, "universal derailleur mount (not UDH-specific)" -> udh:false; weight 1989g (size M) MAKER-STATED. Price: EUR 999 (AT/EU market) - no confirmed USD MSRP found on canyon.com/en-us despite the model appearing in the current US lineup; $1,099 entered as a rough EUR->USD sample conversion, flagged for verify-job re-check once a US price page is found.' },
  /* --- catalog-frames pass (2026-07-08): three Forbidden frames, all fetched directly from
     forbiddenbike.com product pages, each with an EXPLICIT "Post Mount" quote (no Maven-caliper
     inference needed - see the blocked cases noted below). Druid V2's 185x50mm trunnion shock
     has NO match in-catalog (closest is 185x55 trunnion) - flagged for the suspension session.
     FOUR OTHER FRAMES INVESTIGATED THIS PASS AND DELIBERATELY NOT ENTERED - salvage notes:
     - Canyon Torque AL 2026 (new aluminum enduro/DH/freeride model, 180mm rear/190mm dual-crown
       fork capable, mullet+27.5, 250x72.5mm std shock - ALREADY matches the in-catalog
       sh-rockshox-super-deluxe-ultimate-dh-250x72p5 row, so no new shock needed once re-entered):
       confirmed via canyon.com product pages (torque-al-8/4323.html, torque-al-9/4324.html) +
       press coverage: 12x148 Boost rear, BSA73 DUB BB, 34.9mm post, 3500g frame (canyon.com spec
       table, both AL8/AL9 pages), tapered headset (1-1/8"-1.5" steerer per canyon.com), UDH
       (SRAM Eagle Transmission stock + "SRAM universal derailleur hanger" per BikeRadar).
       BLOCKED: rear brake mount (PM vs FM) is not stated anywhere fetched - stock caliper is
       SRAM Maven, confirmed Post-Mount-ONLY as a caliper (support.sram.com), but per the
       REVERTED Specialized Epic lesson just below (a PM-only caliper does NOT prove a PM frame
       boss - FM bosses commonly run PM calipers via adapter, see fr-canyon-lux-world-cup-cf)
       that does not pin the frame's own boss. Stays OUT until a source states the word.
     - Cotic Jeht (steel full-suspension trail bike, 185x55 trunnion shock - ALREADY in-catalog,
       zero new shock needed) and Cotic BFe (steel 29/mullet hardtail): both explicitly state
       "I.S." rear brake mount on their own cotic.co.uk pages (quoted verbatim, not a guess) -
       but 'IS' is NOT in VOCAB.brakeMount and test-schema.js:118 explicitly asserts it must
       stay rejected (the "FM (flat mount) is valid brakeMount vocab; unknown mounts still
       rejected" test uses mount:'IS' as the still-rejected case) - a prior session's deliberate
       decision. Widening the vocab would need a cross-category test change; left for a session
       with authority over brake category + that test. All other Jeht/BFe specs (rear axle
       Boost148, BSA73, 34.9/35mm post, UDH, 160mm max fork) are otherwise clean and fetched -
       only the brake-mount vocab gap blocks entry.
     - Forbidden Supernought (DH sibling to Druid/Dreadnought, 225x75mm trunnion shock - matches
       NOTHING in-catalog at that size+mount; existing 225x75 rows are all 'std', not trunnion -
       would need a new shock too): confirmed 148x12 rear, BSA83 DUB BB, 200mm rotors, 205mm
       rear/200mm fork travel, SRAM Universal Derailleur Hanger (UDH) - all from
       forbiddenbike.com. BLOCKED twice over: rear brake mount is unstated (same Maven-caliper
       trap as the Torque AL) AND the headset cups read "ZS49|EC49" which isn't in
       VOCAB.headTube either (headTube is optional/advisory so that alone wouldn't block it).
       Stays OUT pending a brake-mount source. --- */
  { id:'fr-forbidden-druid-v2', cat:'frame', brand:'Forbidden', model:'Druid V2', family:'forbidden-druid', gen:'V2', disciplines:['trail'], price:3799, weight:3300, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:180, suspension:'full', shockEye:185, shockStroke:50, shockMount:'trunnion', maxForkTravel:150, travel:130, udh:true, maxTire:2.4, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://forbiddenbike.com/products/druid', desc:'VERIFIED 2026-07-08 vs fetched forbiddenbike.com Druid product page: 148x12 Boost rear (O.L.D.), Cane Creek 40 headset ZS44/28.6 upper + ZS56/40 lower (tapered steerer fit), 73mm BSA threaded BB, 31.6mm seatpost, "180mm Post Mount" rear brake (maxRotorR 180 = maker-demonstrated, no larger stated), 185x50mm shock with "30mm x 8mm hardware" (trunnion - NO matching shock row exists in-catalog yet, closest is 185x55 trunnion; flagged for the suspension session to add a 185x50 trunnion row), 130mm rear / 150mm fork travel, full 29 or MX (mullet), "SRAM Universal Derailleur Hanger" -> udh:true, 2.4in (57mm) max tire, 3.30kg (S2, w/o shock) MAKER-STATED. Price: forbiddenbike.com sells frame kits through a dealer network with no listed price; $3,799 is the Worldwide Cyclery / Fanatik Bike US retail frame-kit price (real, not converted).' },
  { id:'fr-forbidden-heathen', cat:'frame', brand:'Forbidden', model:'Heathen', family:'forbidden-heathen', disciplines:['trail'], price:3399, weight:1950, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'EC44/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:180, suspension:'hardtail', maxForkTravel:130, udh:false, maxTire:2.5, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://forbiddenbike.com/products/heathen', desc:'VERIFIED 2026-07-08 vs fetched forbiddenbike.com Heathen product page: titanium hardtail built around a 130mm fork, 148x12 Boost rear (O.L.D.), Cane Creek 40 headset ZS44/28.6 upper + EC44/40 lower (tapered steerer fit), 73mm BSA threaded BB, 31.6mm seatpost, "180mm Post Mount (Adapter Included)" rear brake -> brakeMount:PM, maxRotorR 180; S1/S2 run MX (mullet), S3/S4 run full 29 -> both entered in wheelConfigs (fr-canyon-sender-cfr split-size precedent); max tire "29 x 2.5 or 27.5 x 2.6" -> 2.5 entered; 1.95kg frame MAKER-STATED. UDH not stated on this page (unlike sibling Druid/Reya) -> udh:false per the Neuron CF precedent (absence documented, not assumed). Price $3,399 (titanium frame "incl. tariffs") per US-retail search coverage; forbiddenbike.com itself shows no price (dealer-network model).' },
  { id:'fr-forbidden-reya', cat:'frame', brand:'Forbidden', model:'Reya', family:'forbidden-reya', modelYear:2026, disciplines:['xc','trail'], price:3399, weight:2270, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:180, suspension:'full', shockEye:190, shockStroke:45, shockMount:'std', maxForkTravel:130, travel:120, udh:true, maxTire:2.6, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://forbiddenbike.com/products/reya', desc:'VERIFIED 2026-07-08 vs fetched forbiddenbike.com Reya product page: downcountry short-travel bike, 120mm rear / 130mm fork, 148x12 Boost rear (O.L.D.), Cane Creek 40 headset ZS44/28.6 + ZS56/40 (tapered steerer fit), 73mm BSA threaded BB, 31.6mm seatpost, "180mm Post Mount" rear brake -> PM/180; shock "190x45mm...standard bearing eyelets (not trunnion)" -> matches the EXISTING sh-rockshox-sidluxe-ultimate-190x45 / sh-fox-float-sl-factory-190x45 rows, buildable now with no new shock; full 29 only; "SRAM UDH Hanger included" -> udh:true; tire clearance "2.4in recommended / 2.6in max" -> 2.6 entered; 2.27kg frame (S2, w/o shock) MAKER-STATED. Price $3,399 frame kit per Vital MTB/Worldwide Cyclery/Fanatik Bike retail coverage; forbiddenbike.com itself shows no price (dealer-network model).' },
  { id:'fr-deviate-highlander-ii', cat:'frame', brand:'Deviate', model:'Highlander II', family:'deviate-highlander', gen:'II', disciplines:['trail'], price:3600, weight:3200, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:180, suspension:'full', shockEye:210, shockStroke:55, shockMount:'std', maxForkTravel:160, travel:145, udh:true, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://www.deviatecycles.com/highlander2', desc:'VERIFIED 2026-07-08 vs fetched deviatecycles.com Highlander II page: high-pivot idler trail bike, "explicitly NOT designed to work with 27.5in wheels" -> 29-only wheelConfigs; "Boost: 148mm*12mm" rear; headset "ZS44/28.6 upper and ZS56/40 lower" (tapered steerer fit); "73mm BSA Threaded" BB; "34.9in" seatpost; "Post Mount 180mm" rear brake (mount+size stated together) -> PM/180; shock "Metric 210*55mm" with "Front: 40x8mm | Rear: Eyelet bushing" (eyelet bushing = standard, not trunnion) -> matches the EXISTING sh-rockshox-super-deluxe-ultimate-210x55 row, buildable now with no new shock; "145mm" rear / "160mm" front travel; "UDH Compatible: Yes"; "3.2 kg" frame weight MAKER-STATED. Price $3,600 USD frame-only confirmed via Worldwide Cyclery listing (deviatecycles.com itself lists no price on this marketing page); maxTire not stated on the fetched page, left dormant.' },
  { id:'fr-knolly-chilcotin-170', cat:'frame', brand:'Knolly', model:'Chilcotin 170', family:'knolly-chilcotin', disciplines:['enduro'], price:3299, weight:3600, wheelConfigs:['29'], rearAxle:'SuperBoost157', headset:'tapered', headTubeUpper:'ZS44/28.6', headTubeLower:'ZS56/40', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:180, suspension:'full', shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:180, minForkTravel:170, travel:170, udh:false, maxTire:2.6, bundledShock:null, frameOnly:true, verified:true, lastChecked:'2026-07-08', source:'https://knollybikes.com/products/chilcotin-170-frame', desc:'VERIFIED 2026-07-08 vs fetched knollybikes.com Chilcotin 170 frame page: "12 x 157mm" rear -> SuperBoost157 (one 157 fitment standard per template, Knolly\'s own "Trail 157" marketing name for the same industry spacing); headset "ZS 44mm upper & ZS 56mm lower" (tapered steerer fit); "73mm BSA threaded" BB; "31.6mm" seatpost; "Post mount 180mm" rear brake -> PM/180; shock "205x65" listed for BOTH the "Fox Float X2 Factory" and "Rockshox Vivid Ultimate" builds -> matches the EXISTING sh-fox-float-x2-205x65-trun / sh-rockshox-vivid-205x65-trun rows (M8x30mm lower hardware confirms trunnion), buildable now with no new shock; "Front: 170mm" stock fork with an explicit "Min / Max: 170-180mm" approved fork-travel range -> ACTIVATES the dormant minForkTravel rule (rule 15, under-forking) for the first time on this frame: minForkTravel:170 alongside maxForkTravel:180; "170mm" rear travel; "29in" only, no mullet mentioned; rear dropout explicitly "not UDH/universal derailleur hanger" -> udh:false (maker-stated, not an absence-guess); max tire "29 x 2.6"; $3,299 USD frame-only price direct from the product page. Frame weight NOT stated on the fetched page - 3600g entered as an unconfirmed sample (comparable 170mm-travel aluminum enduro frames run 3300-4200g in-catalog), flagged for verify-job re-check.' },
  /* --- Specialized Epic 8 + Epic Hardtail: ENTERED 2026-07-08 then REVERTED same hour.
     The rows pinned brakeMount:'PM' by inference from the stock SRAM Level caliper on the
     premise "SRAM makes no flat-mount MTB caliper" - that premise is FALSE (the Canyon Lux
     World Cup CF 8 ships SRAM Level Silver on an MBR-confirmed FLAT-MOUNT rear, see
     fr-canyon-lux-world-cup-cf), so the pin was unsound; owner reports (pad changes require
     caliper removal; aftermarket relocation adapters) actually lean FM. No fetched source
     states the mount word, so per the bar (Lux Trail precedent) the frames stay OUT.
     SALVAGE for whoever re-enters them once the mount is pinned - all from the FETCHED
     2024 Epic/Epic EVO owner manual (media.specialized.com/support/collateral/
     2024_EPIC_EPIC_EVO_USER_MANUAL_ENGLISH.pdf, 25MB - download + pdftotext, WebFetch chokes):
     SIDLuxe 190x45 std shock (already in-catalog), min/max REAR ROTOR 160/180 (manufacturer!),
     min front rotor 180, max tire 29x2.4, BSA threaded, UDH, 30.9 post, 12x148. --- */

  /* FORKS (front only; wheel = front size) */
  { id:'fk-rockshox-zeb-ultimate-29-170', cat:'fork', brand:'RockShox', model:'ZEB Ultimate 170', family:'rockshox-zeb', disciplines:['enduro'], price:1099, weight:2150, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:200 },
  { id:'fk-fox-38-factory-29-170', cat:'fork', brand:'Fox', model:'38 Factory 170', family:'fox-38', disciplines:['enduro'], price:1299, weight:2180, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:230, minRotorF:180 },
  { id:'fk-fox-38-factory-29-180', cat:'fork', brand:'Fox', model:'38 Factory 180', family:'fox-38', disciplines:['enduro'], price:1349, weight:2200, wheel:'29', travel:180, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:230, minRotorF:180 },
  { id:'fk-rockshox-lyrik-ultimate-29-160', cat:'fork', brand:'RockShox', model:'Lyrik Ultimate 160', family:'rockshox-lyrik', disciplines:['enduro'], price:1199, weight:2028, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:180, verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/rockshox/models/fs-lyrk-ult-d2' },
  { id:'fk-marzocchi-bomber-z1-29-160', cat:'fork', brand:'Marzocchi', model:'Bomber Z1 160', family:'marzocchi-bomber-z1', disciplines:['enduro'], price:639, weight:2109, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:180, verified:true, lastChecked:'2026-07-07', source:'https://bike.marzocchi.com/products/bomber-z1' },
  { id:'fk-rockshox-zeb-ultimate-275-170', cat:'fork', brand:'RockShox', model:'ZEB Ultimate 27.5 170', family:'rockshox-zeb', disciplines:['enduro'], price:1099, weight:2100, wheel:'275', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:200 },
  { id:'fk-ohlins-rxf36-m2-275-170', cat:'fork', brand:'Öhlins', model:'RXF36 m.2 27.5 170', family:'ohlins-rxf36', disciplines:['enduro'], price:1369.50, weight:2150, wheel:'275', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:205, minRotorF:180, verified:true, lastChecked:'2026-07-08', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-ohlins-rxf36-m-2-air-ttx18-27-5-38-170', desc:'catalog-expand-9: fixes a real single-brand gap - Boost110/27.5/170 (the full-27.5 Clash V3 + Propain Spindrift CF front) was RockShox ZEB-only. FETCHED ohlins.com page: 27.5in, 170mm, 15x110, "180-205 mm" rotor range (-> minRotorF 180 / maxRotorF 205), 2150g "with bolts + axle", $1,369.50; steerer tapered per the RXF-family standard (page omits it, same convention as the verified 29 siblings)' },
  { id:'fk-ohlins-rxf38-m2-29-170', cat:'fork', brand:'Öhlins', model:'RXF38 m.2 170', family:'ohlins-rxf38', disciplines:['enduro'], price:1395, weight:2320, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, verified:true, lastChecked:'2026-07-07', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-rxf38-m-2-air-ttx18-29-44-170' },
  { id:'fk-manitou-mezzer-pro-29-170', cat:'fork', brand:'Manitou', model:'Mezzer Pro 170', family:'manitou-mezzer', gen:'G2', disciplines:['enduro'], price:1200, weight:2030, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:223, verified:true, lastChecked:'2026-07-07', source:'https://hayesbicycle.com/products/mezzer-pro-g2' },
  { id:'fk-dvo-onyx-sc-d1-29-170', cat:'fork', brand:'DVO', model:'Onyx SC D1 170', family:'dvo-onyx-sc', disciplines:['enduro'], price:1150, weight:2250, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  { id:'fk-fox-36-factory-29-160', cat:'fork', brand:'Fox', model:'36 Factory 160', family:'fox-36', disciplines:['enduro'], price:1099, weight:1960, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  { id:'fk-rockshox-zeb-ultimate-29-180', cat:'fork', brand:'RockShox', model:'ZEB Ultimate 180', family:'rockshox-zeb', disciplines:['enduro'], price:1149, weight:2200, wheel:'29', travel:180, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:200 },
  { id:'fk-canecreek-helm-mkii-air-29-160', cat:'fork', brand:'Cane Creek', model:'Helm MkII Air 160', family:'canecreek-helm', disciplines:['enduro'], price:1100, weight:2080, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:200, minRotorF:180, verified:true, lastChecked:'2026-07-07', source:'https://www.canecreek.com/products/helm-mkii' },
  { id:'fk-ext-era-v2-29-170', cat:'fork', brand:'EXT', model:'Era V2 170', family:'ext-era', disciplines:['enduro'], price:1600, weight:2300, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220 },
  { id:'fk-formula-selva-s-29-160', cat:'fork', brand:'Formula', model:'Selva S 160', family:'formula-selva', disciplines:['enduro'], price:850, weight:1940, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, verified:true, lastChecked:'2026-07-07', source:'https://www.rideformula.com/products/mountain-bike/selva-s/' },
  { id:'fk-ohlins-rxf36-m2-29-160', cat:'fork', brand:'Öhlins', model:'RXF36 m.2 160', family:'ohlins-rxf36', disciplines:['enduro'], price:1370, weight:2150, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:205, verified:true, lastChecked:'2026-07-07', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-ohlins-rxf36-m-2-air-ttx18-29-51-160' },
  { id:'fk-rockshox-domain-rc-29-170', cat:'fork', brand:'RockShox', model:'Domain RC 170', family:'rockshox-domain', disciplines:['enduro'], price:500, weight:2500, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:200 },
  { id:'fk-manitou-mattoc-pro-29-150', cat:'fork', brand:'Manitou', model:'Mattoc Pro 150', family:'manitou-mattoc', disciplines:['enduro'], price:735, weight:1950, wheel:'29', travel:150, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  { id:'fk-mrp-ribbon-air-29-160', cat:'fork', brand:'MRP', model:'Ribbon Air 160', family:'mrp-ribbon', disciplines:['enduro'], price:850, weight:2000, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  { id:'fk-srsuntour-durolux-r2c2-29-170', cat:'fork', brand:'SR Suntour', model:'Durolux R2C2 170', family:'srsuntour-durolux', disciplines:['enduro'], price:450, weight:2400, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  { id:'fk-xfusion-trace-36-hlr-29-170', cat:'fork', brand:'X-Fusion', model:'Trace 36 HLR 170', family:'xfusion-trace-36', disciplines:['enduro'], price:600, weight:2250, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  { id:'fk-dtswiss-f-535-one-29-160', cat:'fork', brand:'DT Swiss', model:'F 535 One 160', family:'dtswiss-f-535', disciplines:['enduro'], price:1000, weight:2100, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  { id:'fk-push-nineone-coil-29-160', cat:'fork', brand:'Push', model:'Nine.One Coil 160', family:'push-nineone', disciplines:['enduro'], price:2000, weight:2400, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203 },
  /* --- catalog-breadth: extra travel options for marquee 38mm-chassis forks. ~11 frames are 160mm design travel but the big forks were cataloged only at 170 -> no brand choice at 160. Travels below are maker-published options (noted per row); sample specs mirror the sibling travel. --- */
  { id:'fk-rockshox-zeb-ultimate-29-160', cat:'fork', brand:'RockShox', model:'ZEB Ultimate 160', family:'rockshox-zeb', disciplines:['enduro'], price:1099, weight:2140, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:200, desc:'sample specs (mirror 170 sibling); 160mm existence confirmed via RockShox support FAQ (ZEB travel options 150/160/170/180/190)' },
  { id:'fk-fox-38-factory-29-160', cat:'fork', brand:'Fox', model:'38 Factory 160', family:'fox-38', disciplines:['enduro'], price:1299, weight:2160, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:230, minRotorF:180, desc:'sample specs (mirror 170 sibling); 160mm existence confirmed via ridefox.com (Fox 38 offered 160/170/180) and Worldwide Cyclery' },
  { id:'fk-ohlins-rxf38-m2-29-160', cat:'fork', brand:'Öhlins', model:'RXF38 m.2 160', family:'ohlins-rxf38', disciplines:['enduro'], price:1395, weight:2320, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, verified:true, lastChecked:'2026-07-08', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-rxf38-m-2-air-ttx18-29-44-160', desc:'29/160/15x110/maxRotor 220 (opt 200)/$1,395 + maker "from 2320 g" weight from the fetched ohlins.com model page (travel is air-shaft adjustable 160-180 on one chassis, so Öhlins lists 2320 g across configs); steerer tapered per RXF-family standard (page omits it, same as the verified 170 sibling)' },
  { id:'fk-ohlins-rxf38-m2-29-180', cat:'fork', brand:'Öhlins', model:'RXF38 m.2 180', family:'ohlins-rxf38', disciplines:['enduro'], price:1534.5, weight:2320, wheel:'29', travel:180, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, verified:true, lastChecked:'2026-07-08', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-rxf38-m-2-air-ttx18-29-44-180', desc:'29/180/15x110/maxRotor 220 (opt 200) + maker "from 2320 g" weight and $1,534.50 US MSRP from the fetched ohlins.com model page; price CORRECTED from the 1395 sample (the 180 config is priced higher than the 160/170 on Öhlins own page); steerer tapered per RXF-family standard' },
  { id:'fk-manitou-mezzer-pro-29-160', cat:'fork', brand:'Manitou', model:'Mezzer Pro 160', family:'manitou-mezzer', gen:'G2', disciplines:['enduro'], price:1199.99, weight:2030, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:223, minRotorF:180, verified:true, lastChecked:'2026-07-08', source:'https://hayesbicycle.com/products/mezzer-pro-g2', desc:'29/160/15x110 Hexlock SL2/1.5" tapered + "Post Mount 180mm (223mm Max)" (-> minRotorF 180 / maxRotorF 223) + maker 2030 g (29") weight and $1,199.99 US MSRP from the fetched Hayes/Manitou page; the Mezzer Pro G2 is one chassis internally adjustable 140-170, so 2030 g applies across its 150/160/170 travels' },
  { id:'fk-manitou-mezzer-pro-29-180', cat:'fork', brand:'Manitou', model:'Mezzer Pro 180', family:'manitou-mezzer', disciplines:['enduro'], price:1200, weight:2050, wheel:'29', travel:180, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:223, desc:'sample specs, UNVERIFIED. FLAG: gen:G2 tag was REMOVED as incorrect - the fetched Hayes/Manitou page (hayesbicycle.com/products/mezzer-pro-g2) shows the Mezzer Pro G2 comes in 150/160/170 only (internally adjustable 140-170), so a 180mm G2 does NOT exist. A 180mm Mezzer Pro is the ORIGINAL generation (140-180); this row needs original-gen weight/specs verified before trusting - maxRotorF 223 is the G2 figure and may differ for the original gen' },
  /* --- discipline expansion, SRAM/RockShox sweep (2026-07-08): DH dual-crown + XC + trail forks. Existence per row from fetched sram.com model/series pages; specs sample unless noted. --- */
  { id:'fk-rockshox-boxxer-ultimate-29-200', cat:'fork', brand:'RockShox', model:'BoXXer Ultimate 200 (29)', family:'rockshox-boxxer', gen:'D1', mfgPn:'FS-BXR-ULT-D1', disciplines:['dh'], price:2099, weight:2880, wheel:'29', travel:200, axle:'20x110', steerer:'straight-dc', brakeMount:'PM', maxRotorF:220, minRotorF:200, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/rockshox/models/fs-bxr-ult-d1', desc:'29/200/20x110 Boost/1-1/8 straight dual-crown + rotor min 200 / max 220 (-> minRotorF 200) + maker 2880 g (200mm short crown) and $2,099 US MSRP from the fetched sram.com model page fs-bxr-ult-d1; weight+price CORRECTED from the 2680 g/$1,800 sample' },
  { id:'fk-rockshox-boxxer-ultimate-275-200', cat:'fork', brand:'RockShox', model:'BoXXer Ultimate 200 (27.5)', family:'rockshox-boxxer', gen:'D1', mfgPn:'FS-BXR-ULT-D1', disciplines:['dh'], price:2099, weight:2880, wheel:'275', travel:200, axle:'20x110', steerer:'straight-dc', brakeMount:'PM', maxRotorF:220, minRotorF:200, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/rockshox/models/fs-bxr-ult-d1', desc:'27.5/200/20x110 Boost/1-1/8 straight dual-crown + rotor min 200 / max 220 (-> minRotorF 200) + maker 2880 g (200mm short crown; sram.com states this weight for both wheel sizes) and $2,099 US MSRP from the fetched sram.com model page fs-bxr-ult-d1; weight+price CORRECTED from the 2660 g/$1,800 sample' },
  { id:'fk-rockshox-pike-ultimate-29-130', cat:'fork', brand:'RockShox', model:'Pike Ultimate 130', family:'rockshox-pike', gen:'C2', mfgPn:'FS-PIKE-ULT-C2', disciplines:['trail'], price:1149, weight:1940, wheel:'29', travel:130, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:180, desc:'sample WEIGHT (unverified - sram.com fs-pike-ult-c2 states a weight only for the 29/140 config, not 130); interfaces + rotor range (min 180 / max 220) + $1,149 US MSRP confirmed on the fetched sram.com model page. maxRotorF CORRECTED 200->220 and minRotorF 180 added per the maker page' },
  { id:'fk-rockshox-pike-ultimate-29-140', cat:'fork', brand:'RockShox', model:'Pike Ultimate 140', family:'rockshox-pike', gen:'C2', mfgPn:'FS-PIKE-ULT-C2', disciplines:['trail'], price:1149, weight:1887, wheel:'29', travel:140, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:180, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/rockshox/models/fs-pike-ult-c2', desc:'29/140/15x110 Boost/1.5" tapered + rotor min 180 / max 220 (-> minRotorF 180 / maxRotorF 220) + maker 1887 g (29 Maxle Stealth 140mm 44mm offset w/ButterCups) and $1,149 US MSRP from the fetched sram.com model page fs-pike-ult-c2; weight+price+maxRotor(200->220) CORRECTED from sample' },
  { id:'fk-rockshox-sid-ultimate-29-120', cat:'fork', brand:'RockShox', model:'SID Ultimate 120', family:'rockshox-sid', gen:'D1', mfgPn:'FS-SID-ULT3-D1', disciplines:['xc'], price:1099, weight:1480, wheel:'29', travel:120, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:180, maxTire:2.6, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/rockshox/models/fs-sid-ult3-d1', desc:'29/120/15x110 Boost/1.5" tapered + rotor min 180 / max 220 (-> minRotorF 180 / maxRotorF 220) + max tire 66mm (2.6) + maker 1480 g (120mm crown-adjust Maxle Stealth) and $1,099 US MSRP from the fetched sram.com model page fs-sid-ult3-d1; weight+price+maxRotor(200->220) CORRECTED from sample' },
  /* --- discipline expansion pass 6: second short-travel fork brand (the XC/downcountry fork choice was RockShox-only) --- */
  { id:'fk-ohlins-rxf34-m2-29-120', cat:'fork', brand:'Öhlins', model:'RXF34 m.2 120', family:'ohlins-rxf34', gen:'m.2', disciplines:['xc','trail'], price:1309, weight:1698, wheel:'29', travel:120, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203, minRotorF:180, verified:true, lastChecked:'2026-07-08', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-rxf34-m-2-air-otx18-29-44-120', desc:'29/120/15x110/1698g/$1,309 + "Brake dim: 180-203 mm" (-> minRotorF 180 / maxRotorF 203) from the fetched ohlins.com product page; steerer tapered per the RXF-family standard (page omits it; same as the verified RXF36/RXF38 rows)' },
  /* --- discipline expansion pass 5: the 100mm race fork (the Scale RC / Exceed design travel; the catalog's XC fork was 120-only) --- */
  { id:'fk-rockshox-sid-sl-ultimate-29-100', cat:'fork', brand:'RockShox', model:'SID SL Ultimate Race Day 100', family:'rockshox-sid-sl', gen:'C1', disciplines:['xc'], price:896, weight:1326, wheel:'29', travel:100, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:180, minRotorF:160, desc:'weight = off-road.cc claimed 1326g (sample); maxRotorF 180 = sample (RockShox rates the 32mm SL chassis to 180); 29/100mm/15x110/tapered/C1/$896 + NATIVE Post Mount 160 (-> minRotorF) from the fetched Wheel and Sprocket listing (the sram.com model page fs-sids-ult2-d1 404s)' },
  /* --- discipline expansion, Fox/Marzocchi sweep (2026-07-08): direct Fox pages are fetch-blocked, so existence per row is via retailer listings; bike.marzocchi.com DOES fetch. Sample specs. --- */
  { id:'fk-fox-40-factory-29-203', cat:'fork', brand:'Fox', model:'40 Factory 203 (29)', family:'fox-40', modelYear:2025, disciplines:['dh'], price:1900, weight:2750, wheel:'29', travel:203, axle:'20x110', steerer:'straight-dc', brakeMount:'PM', maxRotorF:220, desc:'sample specs; existence confirmed via retailer listings (The Lost Co. / Pro’s Closet / Two Hoosiers: 2025 Fox 40 Factory Grip X2, 29, 203mm, 20x110 Boost)' },
  { id:'fk-marzocchi-bomber-58-275-200', cat:'fork', brand:'Marzocchi', model:'Bomber 58 200 (27.5)', family:'marzocchi-bomber-58', disciplines:['dh'], price:1149, weight:2900, wheel:'275', travel:200, axle:'20x110-nonboost', steerer:'straight-dc', brakeMount:'PM', maxRotorF:203, desc:'existence + specs frame from FETCHED bike.marzocchi.com/products/bomber-58 (27.5 only, 200mm, "20x110 DH (non-Boost)", 1.125in steerer, max rotor 203, $1,149); weight = sample (page lists none)' },
  { id:'fk-fox-34-factory-29-140', cat:'fork', brand:'Fox', model:'34 Factory 140', family:'fox-34', modelYear:2025, disciplines:['trail'], price:1099, weight:1780, wheel:'29', travel:140, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203, desc:'sample specs; existence confirmed via retailer listings (Two Hoosiers / Amazon / Worldwide Cyclery: 2025 Fox 34 Factory Grip X, 29, 140mm)' },
  /* --- catalog-expand-A: Öhlins DH38 m.2 - the DH fork brand choice was RockShox/Fox/Marzocchi only (BoXXer/40/Bomber 58). FETCHED ohlins.com product page: one chassis fits both 29 and 27.5 (entered as two rows per catalog wheel-variant convention, same as the BoXXer 29/27.5 pair). --- */
  { id:'fk-ohlins-dh38-m2-29-200', cat:'fork', brand:'Öhlins', model:'DH38 m.2 200', family:'ohlins-dh38', gen:'m.2', disciplines:['dh'], price:1842.5, weight:2820, wheel:'29', travel:200, axle:'20x110', steerer:'straight-dc', brakeMount:'PM', maxRotorF:203, minRotorF:200, verified:true, lastChecked:'2026-07-08', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-dh38-m-2-air-ttx18-29-27-5-200', desc:'29/200/"20x110mm Boost DH hub standard" + "designed for 200/203mm disc brakes" (-> minRotorF 200 / maxRotorF 203) + maker "2820g (with bolts + axle)" weight and $1,842.50 US MSRP from the fetched ohlins.com DH38 m.2 product page; steerer straight-dc per DH dual-crown convention (page omits it, same as the BoXXer/Fox 40/Bomber 58 rows)' },
  { id:'fk-ohlins-dh38-m2-275-200', cat:'fork', brand:'Öhlins', model:'DH38 m.2 200 (27.5)', family:'ohlins-dh38', gen:'m.2', disciplines:['dh'], price:1842.5, weight:2820, wheel:'275', travel:200, axle:'20x110', steerer:'straight-dc', brakeMount:'PM', maxRotorF:203, minRotorF:200, verified:true, lastChecked:'2026-07-08', source:'https://www.ohlins.com/en-us/mountain-bike/front-forks/am-dh38-m-2-air-ttx18-29-27-5-200', desc:'27.5/200 - the same DH38 m.2 chassis fits both 29 and 27.5 per the fetched ohlins.com page ("29\\"/27.5\\""), entered as a second row per catalog convention; specs mirror the 29 sibling exactly (one maker-stated weight/price covers both)' },
  /* --- catalog-forks-shocks: 27.5 siblings for two RockShox trail/enduro chassis that were 29-only, closing a real single-wheel-size gap (fits the wheel-size filter shipped 2026-07-08). Interfaces + wheel-size availability + price from the fetched sram.com model pages; weight mirrors the verified 29in sibling (each page states weight only for its 29in config) so these stay unverified. --- */
  { id:'fk-rockshox-lyrik-ultimate-275-160', cat:'fork', brand:'RockShox', model:'Lyrik Ultimate 27.5 160', family:'rockshox-lyrik', gen:'D2', mfgPn:'FS-LYRK-ULT-D2', disciplines:['enduro'], price:1199, weight:1980, wheel:'275', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:180, desc:'sample WEIGHT (mirrors the verified 29/160 sibling, -50g per the catalog\'s established 29->27.5 delta convention e.g. the ZEB 170 pair); wheel size "27.5", 29"" + travel options 140/150/160 + interfaces + $1,199 MSRP confirmed on the fetched sram.com model page fs-lyrk-ult-d2 (same page as the verified 29/160 row, which states weight only for the 29in Maxle Stealth config)' },
  { id:'fk-rockshox-pike-ultimate-275-140', cat:'fork', brand:'RockShox', model:'Pike Ultimate 27.5 140', family:'rockshox-pike', gen:'C2', mfgPn:'FS-PIKE-ULT-C2', disciplines:['trail'], price:1149, weight:1840, wheel:'275', travel:140, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220, minRotorF:180, desc:'sample WEIGHT (mirrors the verified 29/140 sibling, -47g per the same 29->27.5 delta convention); wheel size "27.5", 29"" + interfaces + $1,149 MSRP confirmed on the fetched sram.com model page fs-pike-ult-c2 (same page as the verified 29/140 row, which states weight only for the 29in config)' },
  /* --- catalog-forks-shocks: MRP is a fork-only brand in this catalog (Ribbon Air) but sells a distinct longer-travel chassis, Ribbon LT, closing a real gap (no MRP option past 160mm on the existing Ribbon Air). FETCHED mrpbike.com/products/ribbon-lt. --- */
  { id:'fk-mrp-ribbon-lt-29-160', cat:'fork', brand:'MRP', model:'Ribbon LT 160', family:'mrp-ribbon-lt', disciplines:['enduro'], price:1249.95, weight:1900, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:203, minRotorF:180, desc:'29in only, internally adjustable 120-170mm (140/150/160/170 marked travels) per the FETCHED mrpbike.com/products/ribbon-lt page; "Boost 15x110mm (bolt-on axle standard, QR style optional)" -> entered as the Boost110 config only (QR variant skipped, no vocab value); "180mm PM disc only, not compatible with 160mm rotors" -> minRotorF 180; "203mm compatible with appropriate adapter" -> maxRotorF 203; maker weight "4.2 lbs (1.90kg)" doesn\'t state which travel it applies to (entered at the middle 160mm config, same convention as the Mezzer Pro G2\'s single-figure-across-travels rows); price = $1,249.95 regular MSRP (page also shows a $749.97 sale price, not used per template - MSRP only)' },

  /* REAR SHOCKS */
  { id:'sh-rockshox-super-deluxe-ultimate-230x65', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (air)', family:'rockshox-super-deluxe', gen:'C2', mfgPn:'RS-SDLX-ULT-C2', price:549, weight:480, eye:230, stroke:65, mount:'std', spring:'air', verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/rockshox/models/rs-sdlx-ult-c2' },
  { id:'sh-fox-float-x-factory-230x65', cat:'shock', brand:'Fox', model:'Float X Factory', family:'fox-float-x', price:549, weight:460, eye:230, stroke:65, mount:'std', spring:'air' },
  { id:'sh-rockshox-super-deluxe-coil-ultimate-230x65', cat:'shock', brand:'RockShox', model:'Super Deluxe Coil Ultimate', family:'rockshox-super-deluxe', gen:'B1', mfgPn:'RS-SDLC-ULT-B1', price:499, weight:902, eye:230, stroke:65, mount:'std', spring:'coil', desc:'weight = SRAM quote 902 g at 230x65 std INCLUDING a 350 lb spring (SRAM publishes no damper-only figure; deviates from the without-spring convention - noted per template); price = sample', verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/rockshox/models/rs-sdlc-ult-b1' },
  { id:'sh-fox-dhx2-230x65', cat:'shock', brand:'Fox', model:'DHX2 Coil', family:'fox-dhx2', price:599, weight:600, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate; the FETCHED ridefox.com DHX2 Factory page (2026-07-08) quotes 568g explicitly "w/o spring" at 210x55 2pos - a 230x65 4-way body runs slightly heavier. Prior 820 sample was a with-spring figure (template s5: coil shocks catalogued without spring).' },
  { id:'sh-rockshox-super-deluxe-205x65-trun', cat:'shock', brand:'RockShox', model:'Super Deluxe (trunnion)', family:'rockshox-super-deluxe', price:549, weight:470, eye:205, stroke:65, mount:'trunnion', spring:'air' },
  { id:'sh-fox-float-x2-205x65-trun', cat:'shock', brand:'Fox', model:'Float X2 (trunnion)', family:'fox-float-x2', price:649, weight:520, eye:205, stroke:65, mount:'trunnion', spring:'air' },
  { id:'sh-fox-float-x-230x60', cat:'shock', brand:'Fox', model:'Float X (230x60)', family:'fox-float-x', price:549, weight:450, eye:230, stroke:60, mount:'std', spring:'air' },
  { id:'sh-rockshox-vivid-ultimate-oem-205x60-trun', cat:'shock', brand:'RockShox', model:'Vivid Ultimate (OEM, Enduro)', family:'rockshox-vivid', price:0, weight:520, eye:205, stroke:60, mount:'trunnion', spring:'air', oemOnly:true, forFrames:['fr-specialized-enduro-sworks'] },
  { id:'sh-rockshox-vivid-ultimate-230x65', cat:'shock', brand:'RockShox', model:'Vivid Ultimate (air)', family:'rockshox-vivid', gen:'C1', mfgPn:'RS-VIVD-ULT-C1', price:699, weight:670, eye:230, stroke:65, mount:'std', spring:'air', verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/rockshox/models/rs-vivd-ult-c1' },
  { id:'sh-rockshox-vivid-coil-230x65', cat:'shock', brand:'RockShox', model:'Vivid Coil', family:'rockshox-vivid', price:500, weight:500, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate; the FETCHED sram.com Vivid Coil Ultimate page (rs-vivc-ult-c1, 2026-07-08) quotes 902g at 230x65 INCLUDING a 350lb spring (same with-spring convention as the verified Super Deluxe Coil row); a 350lb x 65mm steel spring is ~350-450g, so ~500g damper. Prior 790 sample was a with-spring figure (template s5).' },
  { id:'sh-ext-storia-v3-230x65', cat:'shock', brand:'EXT', model:'Storia V3 (coil)', family:'ext-storia', price:850, weight:420, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate ~420g; EXT press release (FETCHED via vitalmtb.com, 2026-07-08) quotes 760g at 205x62.5 trunnion INCLUDING a 400lb spring (~350-400g), and EXT sells the Storia without spring; the widely-cited V3 claim is 417g w/o spring at 230x65 (Pinkbike, 403-blocked so unfetchable). Prior 800 sample was a with-spring figure (template s5).' },
  { id:'sh-ohlins-ttx22-m2-230x65', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (coil)', family:'ohlins-ttx22', price:750, weight:490, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample ~490g; Ohlins claims 486g excl. spring at 205x65 trunnion per the FETCHED bikerumor.com TTX22m.2 launch article (2026-07-08) - the 230x65 std body is slightly longer. ohlins.com publishes no weight, so stays sample-grade. Prior 780 sample was a with-spring figure (template s5); basis flag resolved 2026-07-08.' },
  { id:'sh-canecreek-kitsuma-coil-230x65', cat:'shock', brand:'Cane Creek', model:'Kitsuma Coil', family:'canecreek-kitsuma', price:600, weight:475, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample; the FETCHED canecreek.com spec table (2026-07-08) lists 468g (DB Coil 210 w/o spring, "sold without Spring or Hardware") and the FETCHED mbr.co.uk review measured 475g w/o spring at 185x55 trunnion - stays sample-grade because neither figure is for this exact size. Prior 760 sample was a with-spring figure (template s5).' },
  { id:'sh-fox-float-x2-230x65', cat:'shock', brand:'Fox', model:'Float X2 (230x65)', family:'fox-float-x2', price:649, weight:530, eye:230, stroke:65, mount:'std', spring:'air' },
  /* --- discipline expansion pass 8: the Privateer 141's bundled shock (Float X in 185x55 trunnion is also a standalone retail SKU) --- */
  { id:'sh-fox-float-x-perf-elite-185x55-trun', cat:'shock', brand:'Fox', model:'Float X Performance Elite (185x55 trunnion)', family:'fox-float-x', disciplines:['trail'], price:549, weight:465, eye:185, stroke:55, mount:'trunnion', spring:'air', desc:'sample specs; existence confirmed via the fetched privateerbikes.com 141 frameset page (ships custom-tuned in this size) + retailer 185x55 trunnion Float X listings' },
  /* --- discipline expansion pass 8: the Privateer 161's shock size (X2 in 205x60 trunnion is also a standalone retail SKU) --- */
  { id:'sh-fox-float-x2-perf-elite-205x60-trun', cat:'shock', brand:'Fox', model:'Float X2 Performance Elite (205x60 trunnion)', family:'fox-float-x2', disciplines:['enduro'], price:649, weight:525, eye:205, stroke:60, mount:'trunnion', spring:'air', desc:'sample specs; existence confirmed via the fetched privateerbikes.com 161 frameset page (ships custom-tuned in this size) + retailer 205x60 trunnion X2 listings' },
  { id:'sh-rockshox-vivid-205x65-trun', cat:'shock', brand:'RockShox', model:'Vivid (trunnion)', family:'rockshox-vivid', price:600, weight:520, eye:205, stroke:65, mount:'trunnion', spring:'air' },
  { id:'sh-marzocchi-bomber-cr-230x65', cat:'shock', brand:'Marzocchi', model:'Bomber CR (coil)', family:'marzocchi-bomber-cr', price:400, weight:400, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate ~400g; the FETCHED bikeperfect.com review (2026-07-08) measured 873g at 230x65 WITH a 450lb spring, the FETCHED bike.marzocchi.com page confirms the spring is sold separately, and a 450lb x 65mm steel spring is ~450-480g. Prior 780 sample was a with-spring figure (template s5).' },
  { id:'sh-dvo-jade-x-230x65', cat:'shock', brand:'DVO', model:'Jade X (coil)', family:'dvo-jade-x', price:550, weight:406, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample; the FETCHED singletrackworld.com Jade X review (2026-07-08) lists "Weight (w/o spring): 406g" (test size not stated) and the FETCHED dvosuspension.com page confirms the coil spring is not included. Prior 770 sample was a with-spring figure (template s5).' },
  /* --- 2026-07-08 append-only correction (re-fetched hayesbicycle.com same day to confirm the sweep flag):
     sh-manitou-mara-pro-230x65 (mount:'std') RETIRED to ALIASES -> the trunnion row below. The maker page
     lists 230x65 as a TRUNNION size only (eyelet sizes are 216x63/222x68/250x70), so the std row was a
     false-green risk on std-mount 230x65 frames. Share links resolve through the alias and now correctly
     error on std-mount frames (the fit never existed). --- */
  { id:'sh-manitou-mara-pro-230x65-trun', cat:'shock', brand:'Manitou', model:'Mara Pro (230x65 trunnion)', family:'manitou-mara', mfgPn:'192-36852-A020', price:629.99, weight:425, eye:230, stroke:65, mount:'trunnion', spring:'air', desc:'corrects retired sh-manitou-mara-pro-230x65: interfaces + 629.99 MSRP + SKU from the fetched hayesbicycle.com Mara Pro page (2026-07-08). Weight 425g is the maker single model-level figure with the size unstated, so the per-size weight bar is unmet and the row stays UNVERIFIED - same call as the 205x60 sibling.' },
  { id:'sh-push-elevensix-230x65', cat:'shock', brand:'Push', model:'Eleven Six (coil)', family:'push-elevensix', price:1300, weight:500, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'],
    desc:'price = fetched pushindustries.com (2026-07-08); weight = body-only sample estimate ~500g: the FETCHED enduro-mtb.com review measured 943g INCLUDING a 575lb spring (a spring that heavy is ~450-500g). Push sells this per bike-model fitment (a "Bike Manufacturer" selector on the product page), not as a generic 230x65 SKU with a published spec sheet, so no maker weight is publishable for this generic row. Prior 750 sample was a with-spring figure (template s5).' },
  { id:'sh-rockshox-super-deluxe-ultimate-205x60-trun', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (205x60 trunnion)', family:'rockshox-super-deluxe', price:549, weight:465, eye:205, stroke:60, mount:'trunnion', spring:'air' },
  { id:'sh-rockshox-super-deluxe-ultimate-230x62p5', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (230x62.5)', family:'rockshox-super-deluxe', price:549, weight:475, eye:230, stroke:62.5, mount:'std', spring:'air' },
  { id:'sh-fox-float-x-205x62p5-trun', cat:'shock', brand:'Fox', model:'Float X (205x62.5 trunnion)', family:'fox-float-x', price:549, weight:460, eye:205, stroke:62.5, mount:'trunnion', spring:'air' },
  /* --- catalog-breadth: 205x65 trunnion aftermarket options (Madonna V3.2 / Spire / Dreadnought fitment). Sample specs; existence of each 205x65 trunnion SKU confirmed via a fetched page (noted per row). --- */
  { id:'sh-ohlins-ttx22-m2-205x65-trun', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (205x65 trunnion)', family:'ohlins-ttx22', price:750, weight:486, eye:205, stroke:65, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample specs; 205x65 trunnion existence confirmed via ohlins.com model page (TTX22M.2 Coil TM 205x65, art. MTBM 2228) and bike24.com listing. weight = 486g excl. spring claimed for THIS size per the FETCHED bikerumor.com TTX22m.2 launch article (2026-07-08); ohlins.com publishes no weight, so stays sample-grade (claimed, not measured). Prior 770 sample was a with-spring figure (template s5); basis flag resolved 2026-07-08.' },
  { id:'sh-ext-storia-v3-205x65-trun', cat:'shock', brand:'EXT', model:'Storia V3 (205x65 trunnion)', family:'ext-storia', price:850, weight:420, eye:205, stroke:65, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample specs; 205x65 trunnion existence confirmed via fetched extremeshox.com Storia V3 size list (metric trunnion 205/65). weight = body-only sample ~420g (EXT press release via vitalmtb.com: 760g at 205x62.5 trunnion INCLUDING a 400lb spring; EXT sells without spring). Prior 790 sample was a with-spring figure (template s5).' },
  { id:'sh-canecreek-kitsuma-coil-205x65-trun', cat:'shock', brand:'Cane Creek', model:'Kitsuma Coil (205x65 trunnion)', family:'canecreek-kitsuma', price:600, weight:475, eye:205, stroke:65, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample specs; 205x65 trunnion existence confirmed via canecreek.com Kitsuma Coil product page (SKU BCD0070) and Jenson USA listing. weight = body-only sample; canecreek.com spec table (FETCHED 2026-07-08) lists 468g (DB Coil 210 w/o spring) and mbr.co.uk measured 475g w/o spring at 185x55 trunnion. Prior 750 sample was a with-spring figure (template s5).' },
  { id:'sh-marzocchi-bomber-cr-205x65-trun', cat:'shock', brand:'Marzocchi', model:'Bomber CR (205x65 trunnion)', family:'marzocchi-bomber-cr', price:400, weight:400, eye:205, stroke:65, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample specs; 205x65 trunnion existence confirmed via multiple retailer listings (Worldwide Cyclery, Bike24; part RS0471) and the size is on the FETCHED bike.marzocchi.com metric-trunnion list. weight = body-only sample estimate ~400g (bikeperfect.com measured 873g at 230x65 WITH a 450lb spring; spring sold separately per marzocchi.com). Prior 770 sample was a with-spring figure (template s5).' },
  { id:'sh-dvo-jade-x-205x65-trun', cat:'shock', brand:'DVO', model:'Jade X (205x65 trunnion)', family:'dvo-jade-x', price:550, weight:406, eye:205, stroke:65, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample specs; 205x65 trunnion existence confirmed via Jenson USA, bike-components.de and eBay 205x65 trunnion listings, and the size is on the FETCHED dvosuspension.com trunnion list. weight = body-only sample; singletrackworld.com review lists "Weight (w/o spring): 406g" (test size not stated); spring not included per dvosuspension.com. Prior 760 sample was a with-spring figure (template s5).' },
  /* --- 2026-07-08: sh-manitou-mara-pro-205x65-trun RETIRED to ALIASES with no successor row - the size was
     FABRICATED (re-fetched hayesbicycle.com same day: Mara Pro trunnion sizes are 165x40/165x45/185x50/
     205x60/225x75/230x60/230x65 - no 205x65; the velomine listing that once "confirmed" it was mislabeled).
     Aliased to the closest real config (205x60 trunnion, below) so share links keep resolving - same eye and
     mount, 5mm shorter stroke, which the engine surfaces as a quantified less-travel warning where it matters. --- */
  /* --- catalog-breadth: EXT Storia fills the remaining single-brand shock combos; every size below is on the fetched extremeshox.com Storia V3 size list. Manitou 205x60 trunnion is a widely-stocked SKU. --- */
  { id:'sh-ext-storia-v3-205x60-trun', cat:'shock', brand:'EXT', model:'Storia V3 (205x60 trunnion)', family:'ext-storia', price:850, weight:420, eye:205, stroke:60, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample specs; existence confirmed via fetched extremeshox.com Storia V3 size list (metric trunnion 205/60). weight = body-only sample ~420g (EXT press release via vitalmtb.com: 760g at 205x62.5 trunnion INCLUDING a 400lb spring; EXT sells without spring). Prior 790 sample was a with-spring figure (template s5).' },
  { id:'sh-ext-storia-v3-205x62p5-trun', cat:'shock', brand:'EXT', model:'Storia V3 (205x62.5 trunnion)', family:'ext-storia', price:850, weight:420, eye:205, stroke:62.5, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample specs; existence confirmed via fetched extremeshox.com Storia V3 size list (metric trunnion 205/62.5). weight = body-only sample ~420g; EXT own press release (via vitalmtb.com) quotes THIS size at 760g INCLUDING a 400lb spring (~350-400g), and EXT sells without spring. Prior 790 sample was a with-spring figure (template s5).' },
  { id:'sh-ext-storia-v3-230x60', cat:'shock', brand:'EXT', model:'Storia V3 (230x60)', family:'ext-storia', price:850, weight:420, eye:230, stroke:60, mount:'std', spring:'coil', soldWithout:['spring'], desc:'sample specs; existence confirmed via fetched extremeshox.com Storia V3 size list (metric standard 230/60). weight = body-only sample ~420g (EXT press release via vitalmtb.com: 760g at 205x62.5 trunnion INCLUDING a 400lb spring; EXT sells without spring). Prior 800 sample was a with-spring figure (template s5).' },
  { id:'sh-ext-storia-v3-230x62p5', cat:'shock', brand:'EXT', model:'Storia V3 (230x62.5)', family:'ext-storia', price:850, weight:420, eye:230, stroke:62.5, mount:'std', spring:'coil', soldWithout:['spring'], desc:'sample specs; existence confirmed via fetched extremeshox.com Storia V3 size list (metric standard 230/62.5). weight = body-only sample ~420g (EXT press release via vitalmtb.com: 760g at 205x62.5 trunnion INCLUDING a 400lb spring; EXT sells without spring). Prior 800 sample was a with-spring figure (template s5).' },
  { id:'sh-manitou-mara-pro-205x60-trun', cat:'shock', brand:'Manitou', model:'Mara Pro (205x60 trunnion)', family:'manitou-mara', price:550, weight:500, eye:205, stroke:60, mount:'trunnion', spring:'air', desc:'sample specs; 205x60 trunnion existence confirmed via multiple retailer listings (Pro Bike Supply, Mojo Cyclery; Manitou SKU B-AP5591)' },
  /* --- discipline expansion, SRAM/RockShox sweep: XC shock --- */
  { id:'sh-rockshox-sidluxe-ultimate-190x45', cat:'shock', brand:'RockShox', model:'SIDLuxe Ultimate (190x45)', family:'rockshox-sidluxe', gen:'A2', disciplines:['xc'], price:549, weight:250, eye:190, stroke:45, mount:'std', spring:'air', desc:'sample specs; existence confirmed via sram.com SIDLuxe series page + retailer listings (Pro Bike Supply 190x45 SoloAir std A2)' },
  /* --- discipline expansion pass 4: the Lux World Cup's shock size --- */
  { id:'sh-rockshox-sidluxe-ultimate-210x50', cat:'shock', brand:'RockShox', model:'SIDLuxe Ultimate (210x50)', family:'rockshox-sidluxe', disciplines:['xc'], price:549, weight:247, eye:210, stroke:50, mount:'std', spring:'air', desc:'price = sample; existence + 247g confirmed via the FETCHED canyon.com Lux World Cup CFR AXS spec ("RockShox SIDLuxe Ultimate 3P Remote, 210X50, 247g" - bike-maker figure, so weight stays sample-grade until a RockShox/measured source)' },
  /* --- discipline expansion, Fox/Marzocchi sweep: XC/trail shock --- */
  { id:'sh-fox-float-sl-factory-190x45', cat:'shock', brand:'Fox', model:'Float SL Factory (190x45)', family:'fox-float-sl', modelYear:2025, disciplines:['xc','trail'], price:569, weight:260, eye:190, stroke:45, mount:'std', spring:'air', desc:'sample specs; existence confirmed via Pro Bike Supply listing (2025 Float SL Factory, metric 190x45, EVOL LV, 3-position)' },
  /* --- discipline expansion, Commencal sweep: DH shocks for the Supreme's 250x75 --- */
  { id:'sh-rockshox-vivid-ultimate-dh-250x75', cat:'shock', brand:'RockShox', model:'Vivid Ultimate DH (250x75 air)', family:'rockshox-vivid', gen:'C1', disciplines:['dh'], price:769, weight:750, eye:250, stroke:75, mount:'std', spring:'air', desc:'sample weight; existence + $769-from price confirmed via retailer listings (Universal Cycles, Worldwide Cyclery, The Lost Co. - Vivid Ultimate DH RC2T 250x75 C1)' },
  /* --- discipline expansion pass 7: the Yalla V2's shock size (225x75 trunnion) --- */
  { id:'sh-rockshox-vivid-ultimate-225x75-trun', cat:'shock', brand:'RockShox', model:'Vivid Ultimate (225x75 trunnion air)', family:'rockshox-vivid', gen:'C1', disciplines:['dh'], price:699, weight:670, eye:225, stroke:75, mount:'trunnion', spring:'air', desc:'sample specs (retailer figures: $699, 670g, part 00.4118.421.016); existence + 225x75 trunnion + RC2T air confirmed via the FETCHED Worldwide Cyclery listing - the Yalla V2 / TR11 size' },
  { id:'sh-rockshox-vivid-coil-ultimate-dh-250x75', cat:'shock', brand:'RockShox', model:'Vivid Coil Ultimate DH (250x75)', family:'rockshox-vivid', gen:'C1', disciplines:['dh'], price:649, weight:500, eye:250, stroke:75, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate; the FETCHED sram.com page (rs-vivc-udh-c1, 2026-07-08) quotes 948g at 250x75 INCLUDING a 250lb spring (RockShox coil quotes include a spring - basis now confirmed); a 250lb x 75mm steel spring is ~400-450g, so ~500g damper. existence + $649-from price via retailer listings (Universal Cycles, Worldwide Cyclery - Vivid Coil Ultimate DH RC2 250x75 C1). Prior 900 sample was a with-spring figure (template s5).' },
  { id:'sh-rockshox-super-deluxe-ultimate-dh-250x72p5', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate DH (250x72.5 air)', family:'rockshox-super-deluxe', disciplines:['dh'], price:700, weight:700, eye:250, stroke:72.5, mount:'std', spring:'air', desc:'sample price/weight; existence confirmed via Bike-Discount listing (Super Deluxe Ultimate DH RC2 250x72.5 DebonAir) - the Trek Session size; a coil sibling also exists (Swinnerton RC2 250x72.5)' },
  /* --- catalog-expand-9: breadth check on the six 250x75-std DH frames found RockShox as the ONLY shock brand cataloged there (real fit-collapse) - the Yalla's 225x75 trunnion was also RockShox-only. Öhlins TTX22 M.2 covers both sizes on the same fetched page's own size selector. --- */
  { id:'sh-ohlins-ttx22-m2-250x75', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (coil, 250x75)', family:'ohlins-ttx22', disciplines:['dh'], price:929.50, weight:580, eye:250, stroke:75, mount:'std', spring:'coil', soldWithout:['spring'], desc:'existence + $929.50 US price from the FETCHED ohlins.com product page ttx22m-2-coil-250x75-am (one of 9 listed TTX22 M.2 size variants, confirmed via the 210x55 page\'s own size-selector hrefs); weight = body-only sample (~580g, scaled up from the verified 486g/205x65-trunnion figure for the longer 250x75 DH body) - ohlins.com publishes no weight for this size, same gap as the 230x65 sibling row, so left unverified' },
  { id:'sh-ohlins-ttx22-m2-225x75-trun', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 TM (coil, 225x75 trunnion)', family:'ohlins-ttx22', disciplines:['dh'], price:929.50, weight:560, eye:225, stroke:75, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'existence + "Trunnion side-by-side cylinder head" mount + $929.50 US price from the FETCHED ohlins.com product page ttx22m-2-coil-tm-225x75-am (the Yalla V2 / TR11 shock size, TM = trunnion mount in Öhlins\' own naming); weight = body-only sample (~560g, same scaling basis as the 250x75 std sibling) - ohlins.com publishes no weight for this size, so left unverified' },
  /* --- discipline expansion pass 2: trail shock sizes for the new trail frames --- */
  { id:'sh-rockshox-super-deluxe-ultimate-210x55', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (210x55)', family:'rockshox-super-deluxe', gen:'C2', disciplines:['trail'], price:549, weight:475, eye:210, stroke:55, mount:'std', spring:'air', desc:'sample specs (mirror the 230x65 sibling); 210x55 existence confirmed via The Lost Co. / Worldwide Cyclery / Amazon listings (RC2T w/ HBO 210x55 C2) - the Meta V5 size' },
  { id:'sh-rockshox-super-deluxe-ultimate-185x55-trun', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (185x55 trunnion)', family:'rockshox-super-deluxe', gen:'C2', disciplines:['trail'], price:549, weight:450, eye:185, stroke:55, mount:'trunnion', spring:'air', desc:'sample specs; 185x55 trunnion existence confirmed via Modern Bike / The Lost Co. / Spirited Cyclist listings (RC2T 185x55 trunnion C2) - the RAAW Jibb size' },
  /* --- catalog-forks-shocks: EXT Arma V4 is a NEW brand family (EXT's other catalog entry, Storia, is enduro/trail-only) - a dedicated DH-duty coil shock, all 4 sizes FETCHED directly from extremeshox.com/product/arma-v4/ (confirmed current-gen via a worldwidecyclery.com retailer listing selling the same 4 sizes). Page states "Coil spring (sold separately)" -> soldWithout:['spring']; no weight published for any size, so weight is a body-only sample estimate (class-typical for a DH coil damper, not derived from any figure); price $1,100.00 USD stated directly on the manufacturer page (a US retailer sells the same shock ~$1,070, in the same ballpark). --- */
  { id:'sh-ext-arma-230x65', cat:'shock', brand:'EXT', model:'Arma V4 (coil)', family:'ext-arma', gen:'V4', price:1100, weight:480, eye:230, stroke:65, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate (class-typical, no maker figure published); "Metric Standard: ... 230/57.5, 230/60, 230/62.5, 230/65mm" + "Coil spring (sold separately)" + $1,100.00 USD from the FETCHED extremeshox.com/product/arma-v4/ page' },
  { id:'sh-ext-arma-205x65-trun', cat:'shock', brand:'EXT', model:'Arma V4 (205x65 trunnion)', family:'ext-arma', gen:'V4', price:1100, weight:470, eye:205, stroke:65, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate (class-typical, no maker figure published); "Metric Trunnion: ... 205/57.5, 205/60, 205/62.5, 205/65mm" + "Coil spring (sold separately)" + $1,100.00 USD from the FETCHED extremeshox.com/product/arma-v4/ page' },
  { id:'sh-ext-arma-250x75', cat:'shock', brand:'EXT', model:'Arma V4 (coil, 250x75)', family:'ext-arma', gen:'V4', disciplines:['dh'], price:1100, weight:565, eye:250, stroke:75, mount:'std', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate (class-typical DH coil damper, no maker figure published); "Metric Standard: ... 250/67.5, 250/70, 250/72.5, 250/75mm" + "Coil spring (sold separately)" + $1,100.00 USD from the FETCHED extremeshox.com/product/arma-v4/ page; cross-confirmed via worldwidecyclery.com listing this exact size ("250 x 75mm Stroke, Standard Eyelet") at $1,070' },
  { id:'sh-ext-arma-225x75-trun', cat:'shock', brand:'EXT', model:'Arma V4 (225x75 trunnion)', family:'ext-arma', gen:'V4', disciplines:['dh'], price:1100, weight:545, eye:225, stroke:75, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'weight = body-only sample estimate (class-typical DH coil damper, no maker figure published); "Metric Trunnion: ... 225/67.5, 225/70, 225/72.5, 225/75mm" + "Coil spring (sold separately)" + $1,100.00 USD from the FETCHED extremeshox.com/product/arma-v4/ page; cross-confirmed via worldwidecyclery.com listing this exact size ("225 x 75mm Stroke, Trunnion Mount") at $1,070' },
  /* --- catalog-forks-shocks: Formula MOD DH is a NEW brand family for shocks (Formula's other catalog entry, Selva S, is a fork) - a coil DH shock in both std and trunnion DH sizes, FETCHED from rideformula.com/products/mountain-bike/mod-2/. Page gives no USD price. Page gives ONE weight figure (826g at 225x75 trunnion INCLUDING a 300lb/in spring, no damper-only figure) - weight here is a rough class-typical body-only estimate, NOT derived precisely from that total (a steel coil spring at this rate/stroke is itself several hundred grams, but the split isn't reliably computable), so treat as low-confidence sample like the price. --- */
  { id:'sh-formula-mod-250x75', cat:'shock', brand:'Formula', model:'MOD (coil, 250x75)', family:'formula-mod', disciplines:['dh'], price:750, weight:480, eye:250, stroke:75, mount:'std', spring:'coil', soldWithout:['spring'], desc:'price + weight = SAMPLE (rideformula.com publishes neither a USD price nor a damper-only weight for this size - see family desc); "Standard: 250 x 75,72.5,70,67.5 mm" + coil spring options 250-550 lbs/in + "CTS: Gold, Orange, and Green valves included" confirmed on the FETCHED rideformula.com/products/mountain-bike/mod-2/ page' },
  { id:'sh-formula-mod-225x75-trun', cat:'shock', brand:'Formula', model:'MOD (225x75 trunnion)', family:'formula-mod', disciplines:['dh'], price:750, weight:480, eye:225, stroke:75, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'price = SAMPLE (rideformula.com publishes no USD price - see family desc); weight = SAMPLE, rough class-typical estimate (the FETCHED rideformula.com/products/mountain-bike/mod-2/ page states "Trunnion 225x75 with 300 lbs/in spring: 826 g" but no damper-only split, so this is NOT derived precisely from that figure); "Trunnion: 225 x 75,72.5,70,67.5 mm" confirmed on the same fetched page' },

  /* --- catalog-shocks-breadth-2: Forbidden Druid V2 was the catalog's ONE 0/51 shock
     collapse (BREADTH-GAP.md #5) - its 185x50 trunnion size matched NOTHING, not even
     RockShox. Re-verified the frame's own catalogued spec first (per the assignment
     brief): the FETCHED forbiddenbike.com/products/druid page states "Shock Specs:
     185x50mm (30mm x 8mm hardware)" and names its 3 stock shocks as "RockShox Super
     Deluxe Ultimate", "Fox Factory Float X" and "RockShox Super Deluxe Select+" (no
     "trunnion" wording on the page itself) - so the frame spec was cross-checked
     against retailer listings: MTB Direct / The Pro's Closet / Stash Cycles all sell
     "RockShox Super Deluxe Ultimate ... 185x50 ... Trunnion Mount" as the exact size,
     confirming 185x50 IS a trunnion-mount size (not a frame-data error) and the gap
     really was a missing shock row. Filled with every brand confirmed at 185x50
     trunnion via that brand's own product page (Marzocchi checked and REJECTED - its
     trunnion range is 185x52.5/55/205x60/205x62.5/225x75, no x50). --- */
  { id:'sh-rockshox-super-deluxe-ultimate-185x50-trun', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (185x50 trunnion)', family:'rockshox-super-deluxe', disciplines:['trail'], price:549, weight:445, eye:185, stroke:50, mount:'trunnion', spring:'air', desc:'closes the Druid V2 0/51 shock collapse (BREADTH-GAP.md #5) - this is literally the shock the frame names. 185x50 trunnion confirmed as a listed size on the FETCHED sram.com model page rs-sdlx-ult-c2 (same page verifying the existing 230x65 std row) alongside the Standard-mount range (165/190/210/230) - Trunnion range is 165/185/205, and 185x50 is explicitly listed; weight not stated for this size on that page (only 210x50 std/std = 458g is given), so weight stays a sample estimate mirroring the 185x55-trunnion sibling; price mirrors the family sample.' },
  { id:'sh-fox-float-x-factory-185x50-trun', cat:'shock', brand:'Fox', model:'Float X Factory (185x50 trunnion)', family:'fox-float-x', disciplines:['trail'], price:629, weight:455, eye:185, stroke:50, mount:'trunnion', spring:'air', desc:'closes the Druid V2 0/51 shock collapse - the frame\'s own page names "Fox Factory Float X" as a stock shock alongside the RockShox option, at the same 185x50mm size. FETCHED thelostco.com listing ("2025 Fox Float X Factory Series Shock - 185 x 50/52.5/55 mm") confirms 185x50 as the first of three trunnion size options at $629; Fox\'s own retail naming distinguishes "Trunnion Metric" from plain "Metric" (std), and this listing is explicitly trunnion. Weight not published; sample estimate mirrors the existing std-mount Float X Factory sibling.' },
  { id:'sh-canecreek-kitsuma-coil-185x50-trun', cat:'shock', brand:'Cane Creek', model:'Kitsuma Coil (185x50 trunnion)', family:'canecreek-kitsuma', disciplines:['trail'], price:600, weight:417, eye:185, stroke:50, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample price (mirrors the family); weight = FETCHED tftuned.com listing ("Cane Creek Kitsuma Coil Trunnion", size list "185x50 185x52.5 185x55 205x57.5 ... 225x75", spec line "+/- 417g (Coil w/o spring) *varies by size") - 185x50 is the first/shortest size on that list. Existence cross-confirmed via canecreek.com\'s own product URL slug (db-kitsuma-coil-trunnion-185-x-50-open-end-eye-bcd0088) and a Jenson USA listing of the same SKU (direct fetches of both 404d, likely bot-blocked, but the URL/SKU text itself is manufacturer-sourced).' },
  { id:'sh-dvo-topaz-gen3-185x50-trun', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (185x50 trunnion)', family:'dvo-topaz', disciplines:['trail'], price:325, weight:430, eye:185, stroke:50, mount:'trunnion', spring:'air', desc:'NEW DVO family for the catalog (DVO\'s other shock entry, Jade X, is a coil DH-duty damper; Topaz is DVO\'s air trail/enduro line). FETCHED dvosuspension.com/product/topaz-gen-3/ page: trunnion size list "165x40, 165x42.5, 165x50, 185x50, 185x52.5, 185x55, 205x60, 205x62.5, 205x65" explicitly includes 185x50; price stated as a $300-$350 range (no per-size breakdown, so $325 sample); no weight published for any size.' },
  { id:'sh-manitou-mara-pro-185x50-trun', cat:'shock', brand:'Manitou', model:'Mara Pro (185x50 trunnion)', family:'manitou-mara', disciplines:['trail'], price:629.99, weight:425, eye:185, stroke:50, mount:'trunnion', spring:'air', desc:'FETCHED hayesbicycle.com/products/mara-pro (2026-07-08): trunnion size list "165x40, 165x45, 185x50, 205x60, 225x75, 230x60, 230x65" explicitly includes 185x50; $629.99 MSRP matches the 230x65/205x60 sibling rows exactly (same page, same model-level price). Weight 425g is the same single model-level figure as those siblings (size unstated) - stays UNVERIFIED per the same call made on them.' },
  { id:'sh-ext-storia-v3-185x50-trun', cat:'shock', brand:'EXT', model:'Storia V3 (185x50 trunnion)', family:'ext-storia', disciplines:['trail'], price:850, weight:420, eye:185, stroke:50, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'sample price/weight (mirrors the family); existence confirmed via the FETCHED extremeshox.com/product/ext-storia/ page, whose metric trunnion list is "165/45, 185/50, 185/52.5, 185/55, 205/57.5, 205/60, 205/62.5, 205/65, 225/67.5, 225/70, 225/72.5, 225/75" - 185/50 is explicitly the second-shortest option.' },
  { id:'sh-ohlins-txc1air-185x50-trun', cat:'shock', brand:'Öhlins', model:'TXC1Air TM (185x50 trunnion)', family:'ohlins-txc1air', disciplines:['xc','trail'], price:643.50, weight:245, eye:185, stroke:50, mount:'trunnion', spring:'air', desc:'NEW Öhlins family for the catalog (distinct from the existing TTX22 M.2 gravity coil line) - Öhlins\' lightweight XC/downcountry air shock. FETCHED ohlins.com/mountain-bike/rear-shocks/txc1air-tm-185x50-r: model "TXC1Air TM 185x50 R", "185 x 47.5/50 mm", trunnion mount, $643.50 USD, weight "from 245 g" (a genuinely XC-class weight, in the same ballpark as the catalog\'s SIDLuxe/Float SL rows) - entered here because the Druid V2\'s 130mm-travel trail application is squarely inside this shock\'s stated range.' },
  { id:'sh-xfusion-h3c-185x50-trun', cat:'shock', brand:'X-Fusion', model:'H3C (185x50 trunnion)', family:'xfusion-h3c', disciplines:['trail'], price:662.96, weight:520, eye:185, stroke:50, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'NEW brand for the catalog. FETCHED s4suspension.com/products/x-fusion-h3c-trunnion: "X-Fusion H3C", size "185x50 TR (52.5 - 55mm)" listed as the primary option (SKU XF-22-XRH3CT-185-225), "Metric & Trunnion Mount", "Light Weight Coil (35mm ID) - sold separately", $662.96, "700 grams with spring". A retailer Amazon listing independently states the same shock at "Length: 185/50mm". Weight here = body-only estimate (template s5: derived down from the 700g w/spring figure, ~180g assumed for a light 35mm-ID/50mm-stroke coil spring) - not a maker-published damper-only figure.' },

  /* --- catalog-shocks-breadth-2: five more RockShox-only frames share the SAME 210x50
     std or 210x55 std bracket - Canyon Lux World Cup CF / Neuron CF / Commencal
     T.E.M.P.O. (210x50 std) and Commencal Meta TR V4 / Meta V5 / Deviate Highlander II /
     Santa Cruz Hightower 3 / Specialized Stumpjumper 15 (210x55 std). Every brand below
     was confirmed, via that brand's own product page, to sell BOTH the exact 210x50 AND
     210x55 std sizes (so the Meta TR V4 etc. get an exact-match option, not just a
     shorter-stroke warning from the 210x50 rows). --- */
  { id:'sh-fox-float-x-factory-210x50', cat:'shock', brand:'Fox', model:'Float X Factory (210x50 std)', family:'fox-float-x', price:629, weight:450, eye:210, stroke:50, mount:'std', spring:'air', desc:'FETCHED thelostco.com ("2025 Fox Float X Factory Series Shock - 210 x 50/52.5/55 mm", $629) - plain "Metric" (not "Trunnion Metric") in Fox\'s own retail naming, confirmed standard mount via the FETCHED worldwidecyclery.com listing title ("FOX FLOAT X Factory Rear Shock - Metric, 210 x 50 mm..."). Weight not published; sample estimate mirrors the 230x65 std sibling.' },
  { id:'sh-marzocchi-bomber-cr-210x50', cat:'shock', brand:'Marzocchi', model:'Bomber CR (210x50 std)', family:'marzocchi-bomber-cr', price:329, weight:400, eye:210, stroke:50, mount:'std', spring:'coil', soldWithout:['spring'], desc:'FETCHED bike.marzocchi.com/products/bomber-cr-rear-shock: standard-eyelet size list "210x50, 210x55, 230x60, 230x65, 250x75" explicitly includes 210x50; $329 regular price (same page). Weight = body-only sample mirroring the existing 230x65/205x65-trun siblings (spring sold separately, per the family desc).' },
  { id:'sh-dvo-topaz-gen3-210x50', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (210x50 std)', family:'dvo-topaz', price:325, weight:440, eye:210, stroke:50, mount:'std', spring:'air', desc:'FETCHED dvosuspension.com/product/topaz-gen-3/ page: metric standard size list "190x40, 190x42.5, 190x45, 210x50, 210x52.5, 210x55, 230x60, 230x62.5, 230x65" explicitly includes 210x50. Price = family sample ($300-$350 range stated, no per-size breakdown); no weight published for any size.' },
  { id:'sh-canecreek-air-il-210x50', cat:'shock', brand:'Cane Creek', model:'Air IL (210x50)', family:'canecreek-air-il', price:599.99, weight:385, eye:210, stroke:50, mount:'std', spring:'air', desc:'NEW Cane Creek family for the catalog (Air IL, their XC/trail/enduro air shock - distinct from the gravity-focused Kitsuma line). FETCHED canecreek.com/products/air-il page: size list includes 210x50 (also 210x52.5/55, 185x40-55, 190x40-45, 165x40-45), $599.99, "+/- 385g (Varies by size)". Standard mount only - Air IL has no trunnion option at all (its valve body physically interferes with where trunnion bolts would sit, per multiple retailer/review descriptions), so every Air IL size including this one is std.' },
  { id:'sh-ext-storia-v3-210x50', cat:'shock', brand:'EXT', model:'Storia V3 (210x50 std)', family:'ext-storia', price:850, weight:420, eye:210, stroke:50, mount:'std', spring:'coil', soldWithout:['spring'], desc:'sample price/weight (mirrors the family); existence confirmed via the FETCHED extremeshox.com/product/ext-storia/ page, whose metric standard list is "210/50, 210/52.5, 210/55, 230/57.5, 230/60, 230/62.5, 230/65, 250/67.5, 250/70, 250/72.5, 250/75" - 210/50 is the shortest std option.' },
  { id:'sh-fox-float-x-factory-210x55', cat:'shock', brand:'Fox', model:'Float X Factory (210x55 std)', family:'fox-float-x', price:629, weight:460, eye:210, stroke:55, mount:'std', spring:'air', desc:'same FETCHED thelostco.com listing as the 210x50 sibling row (210 x 50/52.5/55 mm, $629, standard "Metric" mount per Fox\'s own naming) - 210x55 is the third of the three sizes; closes the exact-match gap for the Meta TR V4 / Meta V5 / Highlander II / Hightower 3 / Stumpjumper 15 210x55 std bracket. Weight not published; sample estimate mirrors the 230x65 std sibling.' },
  { id:'sh-marzocchi-bomber-cr-210x55', cat:'shock', brand:'Marzocchi', model:'Bomber CR (210x55 std)', family:'marzocchi-bomber-cr', price:329, weight:405, eye:210, stroke:55, mount:'std', spring:'coil', soldWithout:['spring'], desc:'same FETCHED bike.marzocchi.com standard-eyelet size list as the 210x50 sibling ("210x50, 210x55, 230x60, 230x65, 250x75") - 210x55 explicitly listed; $329 regular price (same page). Weight = body-only sample mirroring the family.' },
  { id:'sh-dvo-topaz-gen3-210x55', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (210x55 std)', family:'dvo-topaz', price:325, weight:450, eye:210, stroke:55, mount:'std', spring:'air', desc:'same FETCHED dvosuspension.com metric standard list as the 210x50 sibling ("190x40/42.5/45, 210x50/52.5/55, 230x60/62.5/65") - 210x55 explicitly listed. Price = family sample; no per-size weight published.' },
  { id:'sh-canecreek-air-il-210x55', cat:'shock', brand:'Cane Creek', model:'Air IL (210x55)', family:'canecreek-air-il', price:599.99, weight:390, eye:210, stroke:55, mount:'std', spring:'air', desc:'same FETCHED canecreek.com/products/air-il size list as the 210x50 sibling (210x50/52.5/55 among the offered sizes), $599.99, "+/- 385g (Varies by size)" - std mount only (see 210x50 sibling desc for the no-trunnion-option basis).' },
  { id:'sh-ext-storia-v3-210x55', cat:'shock', brand:'EXT', model:'Storia V3 (210x55 std)', family:'ext-storia', price:850, weight:420, eye:210, stroke:55, mount:'std', spring:'coil', soldWithout:['spring'], desc:'same FETCHED extremeshox.com metric standard list as the 210x50 sibling ("210/50, 210/52.5, 210/55, 230/57.5...250/75") - 210/55 explicitly listed.' },

  /* --- catalog-shocks-breadth-2: Trek Session 8 (29) was RockShox-only at its exact
     250x72.5 std bracket (a 250x75 shock at the same eye ERRORS as too-long-stroke per
     the direction-aware rule, so the existing 250x75 rows from EXT/Formula/Öhlins/Vivid
     do NOT help this frame - it needs the shorter 72.5 stroke specifically). All three
     rows below are the SAME brands/products already in the catalog at 250x75 std,
     confirmed at 250x72.5 on the SAME already-fetched manufacturer pages (their size
     lists include multiple strokes at the 250 eye). --- */
  { id:'sh-ext-arma-250x72p5', cat:'shock', brand:'EXT', model:'Arma V4 (coil, 250x72.5)', family:'ext-arma', gen:'V4', disciplines:['dh'], price:1100, weight:560, eye:250, stroke:72.5, mount:'std', spring:'coil', soldWithout:['spring'], desc:'closes the Session 8 (29) single-brand shock bracket. Confirmed on the SAME FETCHED extremeshox.com/product/arma-v4/ page already used for the 250x75/225x75-trun siblings: "Metric Standard: ... 250/67.5, 250/70, 250/72.5, 250/75mm" explicitly includes 72.5. Weight = body-only sample estimate (class-typical, no maker figure published, same basis as the 250x75 sibling); price $1,100 mirrors the family.' },
  { id:'sh-formula-mod-250x72p5', cat:'shock', brand:'Formula', model:'MOD (coil, 250x72.5)', family:'formula-mod', disciplines:['dh'], price:750, weight:480, eye:250, stroke:72.5, mount:'std', spring:'coil', soldWithout:['spring'], desc:'closes the Session 8 (29) single-brand shock bracket. Confirmed on the SAME FETCHED rideformula.com/products/mountain-bike/mod-2/ page already used for the 250x75/225x75-trun siblings: "Standard: 250 x 75,72.5,70,67.5 mm" explicitly includes 72.5. Price/weight = SAMPLE (rideformula.com publishes neither a USD price nor a damper-only weight - see family desc), mirrors the 250x75 sibling.' },
  { id:'sh-ohlins-ttx22-m2-250x72p5', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (coil, 250x72.5)', family:'ohlins-ttx22', disciplines:['dh'], price:929.50, weight:580, eye:250, stroke:72.5, mount:'std', spring:'coil', soldWithout:['spring'], desc:'closes the Session 8 (29) single-brand shock bracket. FETCHED thelostco.com listing ("Ohlins TTX22M.2 Coil Shock - 250x67.5/70/72.5/75mm", $929.50, "Possible to simply adjust stroke with the three 2.5mm spacers" - one SKU spanning all four strokes) - same product family as the existing 250x75 sibling row (ohlins.com product ttx22m-2-coil-250x75-am), just a different spacer setting. Weight = body-only sample scaled from the 205x65-trunnion figure, same basis as the 250x75 sibling; ohlins.com publishes no per-stroke weight so this stays unverified.' },

  /* --- catalog-shocks-breadth-2 batch 2: general widening pass (per the assignment's
     "don't stop at the flagged list" instruction) - re-ran the brand-count check across
     every full-suspension frame (not just the officially flagged ones) and found four
     more frames sitting at exactly 2 compatible brands, plus several 3-4-brand brackets
     worth deepening. Every row below reuses a brand/size combo already confirmed via a
     manufacturer-page fetch earlier this session (Marzocchi/DVO/Cane Creek/Öhlins/Fox
     size charts each covered multiple strokes at the same eye) - no new fetches needed,
     just applying data already gathered to the other sizes those same pages listed. --- */

  /* 230x60 std: Orbea Rallon M-Team, Rocky Mountain Altitude C70, Canyon Spectral CF - was 2/11 (Fox, EXT) */
  { id:'sh-rockshox-super-deluxe-ultimate-230x60', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (230x60 std)', family:'rockshox-super-deluxe', price:549, weight:470, eye:230, stroke:60, mount:'std', spring:'air', desc:'FETCHED sram.com model page rs-sdlx-ult-c2 (same page as the verified 230x65 sibling): Standard-mount size list "165x37.5-45, 190x37.5-45, 210x47.5-55, 230x57.5, 230x60, 230x62.5, 230x65" explicitly includes 230x60. Weight not stated for this size on that page; sample mirrors the 230x62.5/230x65 siblings.' },
  { id:'sh-marzocchi-bomber-cr-230x60', cat:'shock', brand:'Marzocchi', model:'Bomber CR (230x60 std)', family:'marzocchi-bomber-cr', price:329, weight:400, eye:230, stroke:60, mount:'std', spring:'coil', soldWithout:['spring'], desc:'FETCHED bike.marzocchi.com/products/bomber-cr-rear-shock standard-eyelet list ("210x50, 210x55, 230x60, 230x65, 250x75") explicitly includes 230x60; $329 regular price (same page). Weight = body-only sample mirroring the family.' },
  { id:'sh-dvo-topaz-gen3-230x60', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (230x60 std)', family:'dvo-topaz', price:325, weight:460, eye:230, stroke:60, mount:'std', spring:'air', desc:'FETCHED dvosuspension.com/product/topaz-gen-3/ metric standard list ("190x40/42.5/45, 210x50/52.5/55, 230x60/62.5/65") explicitly includes 230x60. Price = family sample; no per-size weight published.' },
  { id:'sh-ohlins-ttx22-m2-230x60', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (coil, 230x60)', family:'ohlins-ttx22', price:750, weight:488, eye:230, stroke:60, mount:'std', spring:'coil', soldWithout:['spring'], desc:'FETCHED thelostco.com / worldwidecyclery.com listings ("Ohlins TTX22M.2 Coil Shock 230mm x 57.5, 60, 62.5, & 65mm") - one spacer-adjustable SKU spanning all four 230mm strokes, same mechanism as the existing 250mm/205mm multi-stroke siblings. Price mirrors the 230x65 std sibling; weight = body-only sample.' },

  /* 230x62.5 std: Santa Cruz Megatower CC - was 3/11 (Fox, RockShox, EXT) */
  { id:'sh-dvo-topaz-gen3-230x62p5', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (230x62.5 std)', family:'dvo-topaz', price:325, weight:465, eye:230, stroke:62.5, mount:'std', spring:'air', desc:'same FETCHED dvosuspension.com metric standard list as the 230x60 sibling ("230x60, 230x62.5, 230x65") - 230x62.5 explicitly listed. Price = family sample; no per-size weight published.' },
  { id:'sh-ohlins-ttx22-m2-230x62p5', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (coil, 230x62.5)', family:'ohlins-ttx22', price:750, weight:489, eye:230, stroke:62.5, mount:'std', spring:'coil', soldWithout:['spring'], desc:'same FETCHED thelostco.com/worldwidecyclery.com multi-stroke 230mm SKU as the 230x60 sibling ("230mm x 57.5, 60, 62.5, & 65mm"). Price mirrors the 230x65 std sibling; weight = body-only sample.' },

  /* 190x45 std: Forbidden Reya - was 2/11 (RockShox, Fox) */
  { id:'sh-dvo-topaz-gen3-190x45', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (190x45 std)', family:'dvo-topaz', disciplines:['xc','trail'], price:325, weight:400, eye:190, stroke:45, mount:'std', spring:'air', desc:'FETCHED dvosuspension.com/product/topaz-gen-3/ metric standard list ("190x40, 190x42.5, 190x45, 210x50...") explicitly includes 190x45. Price = family sample; no per-size weight published.' },
  { id:'sh-canecreek-air-il-190x45', cat:'shock', brand:'Cane Creek', model:'Air IL (190x45)', family:'canecreek-air-il', disciplines:['xc','trail'], price:599.99, weight:365, eye:190, stroke:45, mount:'std', spring:'air', desc:'FETCHED canecreek.com/products/air-il size list ("...190x45, 190x42.5, 190x40, 185x52.5, 185x50...") explicitly includes 190x45, $599.99, "+/- 385g (Varies by size)" - lighter estimate here since this is the shortest-stroke size in the range. Air IL has no trunnion option at all (see the 210x50 sibling desc), so this is std.' },

  /* 250x75 std: the six 250x75-std DH frames (Supreme DH V5/V5.2, Sender CFR, Tues CF, V10 8, FRS) - was 4/11 (RockShox, Öhlins, EXT, Formula) */
  { id:'sh-fox-dhx2-250x75', cat:'shock', brand:'Fox', model:'DHX2 Coil (250x75)', family:'fox-dhx2', disciplines:['dh'], price:679, weight:610, eye:250, stroke:75, mount:'std', spring:'coil', soldWithout:['spring'], desc:'FETCHED tech.ridefox.com / thelostco.com DHX2 size range ("210x50, 210x52.5, 210x55, 230x60, 230x62.5, 230x65, 250x75") explicitly includes 250x75, the catalog\'s existing 230x65 DHX2 sibling\'s largest DH size; a retailer listing (eBay, "FOX Factory DHX2 Trunnion 185x50 Coil ... $679 MSRP") anchors the $679 tier price. Weight = body-only sample scaled up from the 230x65 sibling (568g w/o spring at 210x55 2pos per ridefox.com) for the longer 250x75 DH body.' },
  { id:'sh-marzocchi-bomber-cr-250x75', cat:'shock', brand:'Marzocchi', model:'Bomber CR (250x75 std)', family:'marzocchi-bomber-cr', disciplines:['dh'], price:329, weight:410, eye:250, stroke:75, mount:'std', spring:'coil', soldWithout:['spring'], desc:'FETCHED bike.marzocchi.com/products/bomber-cr-rear-shock standard-eyelet list ("210x50, 210x55, 230x60, 230x65, 250x75") explicitly includes 250x75 - Bomber CR\'s longest/DH-duty size. $329 regular price (same page). Weight = body-only sample mirroring the family.' },

  /* 205x60 trunnion: Nukeproof Giga 290, Kona Process 153, Privateer 161, Trek Fuel EX Gen6, Specialized Enduro S-Works - was 4/11 (Fox, RockShox, EXT, Manitou) */
  { id:'sh-dvo-topaz-gen3-205x60-trun', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (205x60 trunnion)', family:'dvo-topaz', price:325, weight:455, eye:205, stroke:60, mount:'trunnion', spring:'air', desc:'FETCHED dvosuspension.com/product/topaz-gen-3/ trunnion list ("165x40/42.5/50, 185x50/52.5/55, 205x60, 205x62.5, 205x65") explicitly includes 205x60. Price = family sample; no per-size weight published.' },
  { id:'sh-canecreek-kitsuma-coil-205x60-trun', cat:'shock', brand:'Cane Creek', model:'Kitsuma Coil (205x60 trunnion)', family:'canecreek-kitsuma', price:600, weight:475, eye:205, stroke:60, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'FETCHED tftuned.com Kitsuma Coil Trunnion size list ("185x50, 185x52.5, 185x55, 205x57.5, 205x60, 205x62.5, 205x65, 225x70, 225x75") explicitly includes 205x60. Weight mirrors the 205x65-trunnion sibling (canecreek.com spec table: 468g w/o spring); price mirrors the family.' },
  { id:'sh-marzocchi-bomber-cr-205x60-trun', cat:'shock', brand:'Marzocchi', model:'Bomber CR (205x60 trunnion)', family:'marzocchi-bomber-cr', price:329, weight:400, eye:205, stroke:60, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'FETCHED bike.marzocchi.com/products/bomber-cr-rear-shock trunnion list ("185x52.5, 185x55, 205x60, 205x62.5, 225x75") explicitly includes 205x60. Weight = body-only sample mirroring the family; price = family/$329 tier.' },
  { id:'sh-ohlins-ttx22-m2-205x60-trun', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (coil, 205x60 trunnion)', family:'ohlins-ttx22', price:750, weight:483, eye:205, stroke:60, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'FETCHED thelostco.com listing ("Ohlins TTX22M.2 Coil Shock - Trunnion - 205x57.5/60/62.5/65mm") - the same multi-stroke spacer-adjustable mechanism as the existing 205x65-trunnion sibling, one SKU spanning all four strokes. Price mirrors the 205x65-trunnion sibling; weight = body-only sample.' },

  /* 205x62.5 trunnion: Norco Range C1, Giant Reign Advanced - was 4/11 (Fox, RockShox, EXT, Manitou) */
  { id:'sh-dvo-topaz-gen3-205x62p5-trun', cat:'shock', brand:'DVO', model:'Topaz Gen 3 (205x62.5 trunnion)', family:'dvo-topaz', price:325, weight:460, eye:205, stroke:62.5, mount:'trunnion', spring:'air', desc:'same FETCHED dvosuspension.com trunnion list as the 205x60 sibling ("205x60, 205x62.5, 205x65") - 205x62.5 explicitly listed. Price = family sample; no per-size weight published.' },
  { id:'sh-canecreek-kitsuma-coil-205x62p5-trun', cat:'shock', brand:'Cane Creek', model:'Kitsuma Coil (205x62.5 trunnion)', family:'canecreek-kitsuma', price:600, weight:475, eye:205, stroke:62.5, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'same FETCHED tftuned.com Kitsuma Coil Trunnion size list as the 205x60 sibling ("205x57.5, 205x60, 205x62.5, 205x65") - 205x62.5 explicitly listed. Weight mirrors the 205x65-trunnion sibling; price mirrors the family.' },
  { id:'sh-marzocchi-bomber-cr-205x62p5-trun', cat:'shock', brand:'Marzocchi', model:'Bomber CR (205x62.5 trunnion)', family:'marzocchi-bomber-cr', price:329, weight:400, eye:205, stroke:62.5, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'same FETCHED bike.marzocchi.com trunnion list as the 205x60 sibling ("185x52.5, 185x55, 205x60, 205x62.5, 225x75") - 205x62.5 explicitly listed. Weight = body-only sample mirroring the family; price = family/$329 tier.' },
  { id:'sh-ohlins-ttx22-m2-205x62p5-trun', cat:'shock', brand:'Öhlins', model:'TTX22 m.2 (coil, 205x62.5 trunnion)', family:'ohlins-ttx22', price:750, weight:484, eye:205, stroke:62.5, mount:'trunnion', spring:'coil', soldWithout:['spring'], desc:'same FETCHED thelostco.com multi-stroke trunnion SKU as the 205x60 sibling ("205x57.5/60/62.5/65mm trunnion"). Price mirrors the 205x65-trunnion sibling; weight = body-only sample.' },

  /* FRONT WHEELS */
  { id:'fw-dtswiss-ex-1700-29', cat:'frontwheel', brand:'DT Swiss', model:'EX 1700 SPLINE front', family:'dtswiss-ex-1700', disciplines:['enduro'], price:350, weight:940, wheel:'29', hub:'Boost110', rotorMount:'CL', intWidth:30, maxTire:2.5, mfgPn:'WEX1700BEIXSA11691', desc:'price = sample (DT support page lists no MSRP); maxTire = sample guidance, not maker-published', verified:true, lastChecked:'2026-07-07', source:'https://www.dtswiss.com/en/support/product-support?matnr=WEX1700BEIXSA11691' },
  { id:'fw-reserve-30-hd-29', cat:'frontwheel', brand:'Reserve', model:'30 HD front', family:'reserve-30-hd', disciplines:['enduro'], price:800, weight:870, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-industrynine-enduro-s-29', cat:'frontwheel', brand:'Industry Nine', model:'Enduro S front', family:'industrynine-enduro-s', disciplines:['enduro'], price:850, weight:950, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-roval-traverse-hd-29', cat:'frontwheel', brand:'Roval', model:'Traverse HD front', family:'roval-traverse-hd', disciplines:['enduro'], price:800, weight:806, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-dtswiss-e-1900-275', cat:'frontwheel', brand:'DT Swiss', model:'E 1900 27.5 front', family:'dtswiss-e-1900', disciplines:['enduro'], price:250, weight:1050, wheel:'275', hub:'Boost110', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  { id:'fw-hope-fortus-30-29', cat:'frontwheel', brand:'Hope', model:'Fortus 30 Pro 4 front', family:'hope-fortus', gen:'Pro 4', disciplines:['enduro'], price:450, weight:1155, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.8, mfgPn:'HFW29F30P4STN11', desc:'price = sample (Hope publishes GBP RRP); maxTire 2.8 = maker-published recommended tyre range', verified:true, lastChecked:'2026-07-07', source:'https://www.hopetech.com/_repository/1/documents/FORTUS_30_DATA_2019.pdf', sourceType:'manufacturer-doc' },
  { id:'fw-weareone-union-29', cat:'frontwheel', brand:'We Are One', model:'Union front', family:'weareone-union', disciplines:['enduro'], price:800, weight:900, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-crankbrothers-synthesis-enduro-29', cat:'frontwheel', brand:'Crankbrothers', model:'Synthesis Enduro front', family:'crankbrothers-synthesis-enduro', disciplines:['enduro'], price:750, weight:892, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:31.5, maxTire:2.6, verified:true, lastChecked:'2026-07-06', source:'https://www.crankbrothers.com/products/synthesis-enduro-carbon-front-wheel' },
  { id:'fw-enve-am30-29', cat:'frontwheel', brand:'ENVE', model:'AM30 front', family:'enve-am30', disciplines:['enduro'], price:630, weight:880, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'rotor mount = stock hub config (page lists no mount spec); maxTire = sample guidance', verified:true, lastChecked:'2026-07-07', source:'https://www.enve.com/products/am30' },
  { id:'fw-zipp-3zero-moto-29', cat:'frontwheel', brand:'Zipp', model:'3ZERO MOTO front', family:'zipp-3zero-moto', disciplines:['enduro'], price:900, weight:915, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.5 },
  { id:'fw-newmen-advanced-sl-a30-29', cat:'frontwheel', brand:'Newmen', model:'Advanced SL A.30 front', family:'newmen-advanced-sl', disciplines:['enduro'], price:750, weight:880, wheel:'29', hub:'Boost110', rotorMount:'CL', intWidth:30, maxTire:2.6 },
  { id:'fw-stans-flow-ex3-29', cat:'frontwheel', brand:'Stans', model:'Flow EX3 front', family:'stans-flow-ex3', disciplines:['enduro'], price:400, weight:1003, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:29, maxTire:2.6, desc:'price = sample (stans.com shows sale pricing); maxTire = sample guidance', verified:true, lastChecked:'2026-07-07', source:'https://stans.com/products/flow-ex3-wheelset' },
  { id:'fw-hunt-enduro-wide-29', cat:'frontwheel', brand:'Hunt', model:'Enduro Wide front', family:'hunt-enduro-wide', disciplines:['enduro'], price:350, weight:980, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:33, maxTire:2.6 },   // intWidth corrected 30->33 (huntbikewheels: mixed 33F/31R); weight stays sample - Hunt publishes set weight only
  { id:'fw-spank-359-29', cat:'frontwheel', brand:'Spank', model:'359 front', family:'spank-359', disciplines:['enduro'], price:300, weight:1000, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:31, maxTire:2.6 },
  { id:'fw-shimano-mt500-29', cat:'frontwheel', brand:'Shimano', model:'MT500 front', family:'shimano-mt500', disciplines:['enduro'], price:150, weight:1050, wheel:'29', hub:'Boost110', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  { id:'fw-raceface-turbine-sl-29', cat:'frontwheel', brand:'Race Face', model:'Turbine SL front', family:'raceface-turbine-sl', disciplines:['enduro'], price:500, weight:900, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:25, maxTire:2.6, desc:'CORRECTED intWidth 30->25 to match the fetched raceface.ca Turbine SL page (25mm internal; the SKU also encodes 25). weight sample - RF publishes only a 1635g wheelset total, no per-wheel weight, so left unverified' },
  { id:'fw-bontrager-line-pro-30-29', cat:'frontwheel', brand:'Bontrager', model:'Line Pro 30 front', family:'bontrager-line-pro', disciplines:['enduro'], price:550, weight:910, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-mavic-deemax-29', cat:'frontwheel', brand:'Mavic', model:'Deemax Enduro SL front', family:'mavic-deemax', disciplines:['enduro'], price:600, weight:920, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'price = sample (Mavic lists set price only, USD 1209); maxTire = sample guidance', verified:true, lastChecked:'2026-07-07', source:'https://www.mavic.com/en-us/p/deemax-enduro-sl-29-rv2305' },
  { id:'fw-giant-trx-0-29', cat:'frontwheel', brand:'Giant', model:'TRX 0 front', family:'giant-trx', disciplines:['enduro'], price:700, weight:760, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.5 },
  /* --- discipline expansion pass 4: XC race front wheel (VERIFIED vs crankbrothers.com; 700g vs the ~900-1100g enduro fronts) --- */
  { id:'fw-crankbrothers-synthesis-xct11-29', cat:'frontwheel', brand:'Crankbrothers', model:'Synthesis XCT 11 front', family:'crankbrothers-synthesis-xct', disciplines:['xc'], price:999, weight:700, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:26.5, maxTire:2.4, verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/synthesis-xct-11-carbon-front-wheel', desc:'maxTire = sample guidance (XC rim); 29, 15x110 Boost, 6-bolt, 26.5mm internal, 700g, $999.99, I9 Hydra hub - all from the fetched crankbrothers.com product page' },
  /* --- discipline expansion, DT Swiss FR sweep (2026-07-08): DH wheels for the dual-crown forks + DH frames --- */
  { id:'fw-dtswiss-fr-1500-29', cat:'frontwheel', brand:'DT Swiss', model:'FR 1500 Classic front (20x110)', family:'dtswiss-fr-1500', disciplines:['dh'], price:576, weight:1100, wheel:'29', hub:'20x110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (FR 541 rim, 240 hub); existence + 20x110 Boost confirmed via dtswiss.com FR 1500 Classic page + retailer listings (Worldwide Cyclery, r2-bike)' },
  /* --- discipline expansion pass 5: the 27.5 FR 1500 front (second 27.5 20x110-Boost front brand - the FRS front-wheel choice was Synthesis-only) --- */
  { id:'fw-dtswiss-fr-1500-275', cat:'frontwheel', brand:'DT Swiss', model:'FR 1500 Classic 27.5 front (20x110)', family:'dtswiss-fr-1500', mfgPn:'WFR1500BHEXSA21526', disciplines:['dh'], price:576, weight:1050, wheel:'275', hub:'20x110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (weight = mirror-estimate; price $575.90 per listing); existence + 20x110 Boost + 6-bolt + 30mm internal + MPN from the FETCHED Worldwide Cyclery listing' },
  { id:'fw-crankbrothers-synthesis-dh11-29', cat:'frontwheel', brand:'Crankbrothers', model:'Synthesis DH 11 front (20x110)', family:'crankbrothers-synthesis-dh', disciplines:['dh'], price:999, weight:899, wheel:'29', hub:'20x110', rotorMount:'sixbolt', intWidth:31.5, maxTire:2.6, verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/synthesis-dh-11-carbon-front-wheel', desc:'maxTire = sample guidance; 20x110 Boost, 6-bolt, 31.5mm internal, 899g (29), $999.99, I9 Hydra hub - all from the fetched crankbrothers.com product page; the 27.5 sibling is cataloged (the maker page lists BOTH sizes as 20x110 Boost - the earlier Amazon-listing note of a 20x110-standard 27.5 was REFUTED by the maker page on 2026-07-08)' },
  { id:'fw-crankbrothers-synthesis-dh11-275', cat:'frontwheel', brand:'Crankbrothers', model:'Synthesis DH 11 front 27.5 (20x110)', family:'crankbrothers-synthesis-dh', disciplines:['dh'], price:999, weight:865, wheel:'275', hub:'20x110', rotorMount:'sixbolt', intWidth:31.5, maxTire:2.6, verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/synthesis-dh-11-carbon-front-wheel', desc:'maxTire = sample guidance; 27.5 option: 20x110 Boost, 6-bolt, 31.5mm internal, 865g, $999.99, I9 Hydra hub - from the fetched crankbrothers.com product page (both sizes are 20x110 Boost; no non-Boost variant is listed there)' },
  /* --- catalog-wheels-tires (2026-07-08): first Ibis wheel rows - a boutique brand new to the catalog, both a carbon flagship and an alloy budget option, fetched from store.ibiscycles.com + corroborated on ibiscycles.com/wheels/details. Both models ship with SRAM XD or Shimano Micro Spline freehub (two rear rows each); per-wheel weight/price are a sample 45/55 split of the maker's stated WHEELSET-total figure (Ibis publishes only the pair total, never per-wheel) - noted in each row's desc. --- */
  { id:'fw-ibis-s35-i9-29', cat:'frontwheel', brand:'Ibis', model:'S35 Industry 9 Hydra front', family:'ibis-s35', disciplines:['enduro'], price:549, weight:740, wheel:'29', hub:'Boost110', rotorMount:'CL', intWidth:35, maxTire:2.8, verified:true, lastChecked:'2026-07-08', source:'https://store.ibiscycles.com/products/s35-29-industry-9-carbon-wheelset', desc:'weight/price = sample 45/55 split of the fetched page\'s 1650g/$1199 WHEELSET total (Ibis publishes no per-wheel breakdown); 110x15 Boost, Center Lock, 35mm internal all from the fetched store.ibiscycles.com page; maxTire 2.35-2.8" from the corroborating ibiscycles.com/wheels/details page' },
  { id:'fw-ibis-send-29', cat:'frontwheel', brand:'Ibis', model:'Blackbird Send 29 AL front', family:'ibis-send', disciplines:['enduro'], price:242, weight:955, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:35, maxTire:2.8, verified:true, lastChecked:'2026-07-08', source:'https://store.ibiscycles.com/products/send-29-aluminum-wheelset', desc:'weight/price = sample 45/55 split of the fetched page\'s 2060g/$525 WHEELSET total (Ibis publishes no per-wheel breakdown); 110x15 Boost, Six Bolt, 35mm internal, 6061 alloy rim all from the fetched store.ibiscycles.com page; maxTire 2.35-2.8" from the corroborating ibiscycles.com/wheels/details page' },

  /* REAR WHEELS (rw-dtswiss-e-1900-275 is the common mullet rear) */
  { id:'rw-dtswiss-ex-1700-29', cat:'rearwheel', brand:'DT Swiss', model:'EX 1700 rear', family:'dtswiss-ex-1700', disciplines:['enduro'], price:400, weight:1150, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  { id:'rw-reserve-30-hd-29', cat:'rearwheel', brand:'Reserve', model:'30 HD rear', family:'reserve-30-hd', disciplines:['enduro'], price:900, weight:1010, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-industrynine-enduro-s-29', cat:'rearwheel', brand:'Industry Nine', model:'Enduro S rear', family:'industrynine-enduro-s', disciplines:['enduro'], price:950, weight:1080, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-roval-traverse-hd-29', cat:'rearwheel', brand:'Roval', model:'Traverse HD rear', family:'roval-traverse-hd', disciplines:['enduro'], price:900, weight:995, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-industrynine-enduro-s-29-157', cat:'rearwheel', brand:'Industry Nine', model:'Enduro S 157 rear', family:'industrynine-enduro-s', disciplines:['enduro'], price:950, weight:1090, wheel:'29', hub:'SuperBoost157', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-dtswiss-e-1900-275', cat:'rearwheel', brand:'DT Swiss', model:'E 1900 27.5 rear', family:'dtswiss-e-1900', disciplines:['enduro'], price:300, weight:1200, wheel:'275', hub:'Boost148', freehub:'MicroSpline', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  /* The XD-freehub config of the same wheel (DT sells both bodies). Without it
     every SRAM-cassette mullet build was IMPOSSIBLE - the only 27.5 rear wheel
     was MicroSpline, a catalog-completeness false red on the canonical modern
     enduro spec (REVIEW.md #7). */
  { id:'rw-dtswiss-e-1900-275-xd', cat:'rearwheel', brand:'DT Swiss', model:'E 1900 27.5 rear (XD)', family:'dtswiss-e-1900', disciplines:['enduro'], price:300, weight:1200, wheel:'275', hub:'Boost148', freehub:'XD', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  { id:'rw-hope-fortus-30-29', cat:'rearwheel', brand:'Hope', model:'Fortus 30 Pro 4 rear', family:'hope-fortus', gen:'Pro 4', disciplines:['enduro'], price:550, weight:1270, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.8, mfgPn:'HRW29F30P4STN148SA', desc:'price = sample (Hope publishes GBP RRP); maxTire 2.8 = maker-published recommended tyre range; XD = offered freehub option', verified:true, lastChecked:'2026-07-07', source:'https://www.hopetech.com/_repository/1/documents/FORTUS_30_DATA_2019.pdf', sourceType:'manufacturer-doc' },
  { id:'rw-weareone-union-29', cat:'rearwheel', brand:'We Are One', model:'Union rear', family:'weareone-union', disciplines:['enduro'], price:950, weight:1050, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-crankbrothers-synthesis-enduro-29', cat:'rearwheel', brand:'Crankbrothers', model:'Synthesis Enduro rear', family:'crankbrothers-synthesis-enduro', disciplines:['enduro'], price:850, weight:1087, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:29.5, maxTire:2.6, verified:true, lastChecked:'2026-07-06', source:'https://www.crankbrothers.com/products/synthesis-enduro-carbon-rear-wheel' },
  { id:'rw-enve-am30-29', cat:'rearwheel', brand:'ENVE', model:'AM30 rear', family:'enve-am30', disciplines:['enduro'], price:770, weight:1000, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'rotor mount = stock hub config (page lists no mount spec); maxTire = sample guidance', verified:true, lastChecked:'2026-07-07', source:'https://www.enve.com/products/am30' },
  { id:'rw-zipp-3zero-moto-29', cat:'rearwheel', brand:'Zipp', model:'3ZERO MOTO rear', family:'zipp-3zero-moto', disciplines:['enduro'], price:1100, weight:1075, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.5 },
  { id:'rw-newmen-advanced-sl-a30-29', cat:'rearwheel', brand:'Newmen', model:'Advanced SL A.30 rear', family:'newmen-advanced-sl', disciplines:['enduro'], price:950, weight:1010, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'CL', intWidth:30, maxTire:2.6 },
  { id:'rw-stans-flow-ex3-29', cat:'rearwheel', brand:'Stans', model:'Flow EX3 rear', family:'stans-flow-ex3', disciplines:['enduro'], price:505, weight:1159, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:29, maxTire:2.6, desc:'store lists the SRAM driver as XDR (their wording); XD kept as the valid SRAM option; maxTire = sample guidance', verified:true, lastChecked:'2026-07-07', source:'https://stans.com/products/flow-ex3-wheelset' },
  { id:'rw-hunt-enduro-wide-29', cat:'rearwheel', brand:'Hunt', model:'Enduro Wide rear', family:'hunt-enduro-wide', disciplines:['enduro'], price:450, weight:1150, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:31, maxTire:2.6 },   // intWidth corrected 30->31 (huntbikewheels: mixed 33F/31R); weight stays sample - set weight only
  { id:'rw-spank-359-29', cat:'rearwheel', brand:'Spank', model:'359 rear', family:'spank-359', disciplines:['enduro'], price:400, weight:1180, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:31, maxTire:2.6 },
  { id:'rw-shimano-mt510-29', cat:'rearwheel', brand:'Shimano', model:'MT510 rear', family:'shimano-mt510', disciplines:['enduro'], price:200, weight:1250, wheel:'29', hub:'Boost148', freehub:'HG', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  { id:'rw-raceface-turbine-sl-29', cat:'rearwheel', brand:'Race Face', model:'Turbine SL rear', family:'raceface-turbine-sl', disciplines:['enduro'], price:600, weight:1050, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:25, maxTire:2.6, desc:'CORRECTED intWidth 30->25 to match the fetched raceface.ca Turbine SL page (25mm internal). weight sample - RF publishes only a 1635g wheelset total, no per-wheel weight, so left unverified' },
  { id:'rw-bontrager-line-pro-30-29', cat:'rearwheel', brand:'Bontrager', model:'Line Pro 30 rear', family:'bontrager-line-pro', disciplines:['enduro'], price:650, weight:1060, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-mavic-deemax-29', cat:'rearwheel', brand:'Mavic', model:'Deemax Enduro SL rear', family:'mavic-deemax', disciplines:['enduro'], price:700, weight:1050, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'price = sample (set price only); XD = offered ID360 driver option; maxTire = sample guidance', verified:true, lastChecked:'2026-07-07', source:'https://www.mavic.com/en-us/p/deemax-enduro-sl-29-rv2305' },
  { id:'rw-giant-trx-0-29', cat:'rearwheel', brand:'Giant', model:'TRX 0 rear', family:'giant-trx', disciplines:['enduro'], price:800, weight:900, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.5 },
  /* --- catalog-breadth: Shimano Micro Spline freehub variants of popular 29 rears (was 4 MS brands vs 13 XD -> Shimano drivetrains had almost no compatible wheels). Each maker sells a factory Micro Spline freehub option (noted per row); sample specs mirror the XD sibling. --- */
  { id:'rw-dtswiss-ex-1700-29-ms', cat:'rearwheel', brand:'DT Swiss', model:'EX 1700 rear (Micro Spline)', family:'dtswiss-ex-1700', disciplines:['enduro'], price:400, weight:1155, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'CL', intWidth:30, maxTire:2.5, desc:'sample specs (mirror XD sibling); Micro Spline existence confirmed via dtswiss.com (tool-free XD/Micro Spline/HG freehub) and bike24.com 29 Micro Spline listing' },
  { id:'rw-reserve-30-hd-29-ms', cat:'rearwheel', brand:'Reserve', model:'30 HD rear (Micro Spline)', family:'reserve-30-hd', disciplines:['enduro'], price:900, weight:1010, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (mirror XD sibling); Micro Spline existence confirmed via reservewheels.com (I9/DT350 hubs, XD or Micro Spline) and Worldwide Cyclery Micro Spline listing' },
  { id:'rw-raceface-turbine-sl-29-ms', cat:'rearwheel', brand:'Race Face', model:'Turbine SL rear (Micro Spline)', family:'raceface-turbine-sl', disciplines:['enduro'], price:600, weight:1050, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:25, maxTire:2.6, desc:'sample specs (mirror XD sibling); CORRECTED intWidth 30->25 to match the fetched raceface.ca Turbine SL page (25mm; the Universal Cycles SKU WH20TURSLBST25SHI122 also encodes 25). Micro Spline existence confirmed via that Vault-hub SKU. RF publishes only a 1635g wheelset total, no per-wheel weight - left unverified' },
  { id:'rw-hope-fortus-30-29-ms', cat:'rearwheel', brand:'Hope', model:'Fortus 30 Pro 5 rear (Micro Spline)', family:'hope-fortus', gen:'Pro 5', disciplines:['enduro'], price:550, weight:1270, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30, maxTire:2.8, desc:'sample specs (mirror XD sibling; Pro 5 hub); Micro Spline existence confirmed via hopetech.com (Pro 5 accepts HG/XD/Micro Spline)' },
  { id:'rw-stans-flow-ex3-29-ms', cat:'rearwheel', brand:'Stans', model:'Flow EX3 rear (Micro Spline)', family:'stans-flow-ex3', disciplines:['enduro'], price:505, weight:1159, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:29, maxTire:2.6, desc:'sample specs (mirror XD sibling); Micro Spline existence confirmed via retailer 29 Micro Spline listings (The Lost Co., Fanatik; Neo hub freehub option)' },
  { id:'rw-spank-359-29-ms', cat:'rearwheel', brand:'Spank', model:'359 rear (Micro Spline)', family:'spank-359', disciplines:['enduro'], price:400, weight:1180, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:31, maxTire:2.6, desc:'sample specs (mirror XD sibling); Micro Spline existence confirmed via Hex Drive hub freehub option (Worldwide Cyclery, Modern Bike Micro Spline listings)' },
  { id:'rw-enve-am30-29-ms', cat:'rearwheel', brand:'ENVE', model:'AM30 rear (Micro Spline)', family:'enve-am30', disciplines:['enduro'], price:770, weight:1000, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (mirror XD sibling; I9 1/1 hub); Micro Spline existence confirmed via enve.com (HG/Micro Spline/XD options) and Pro Bike Supply Micro Spline listing' },
  /* --- catalog-expand-B (2026-07-08): Shimano HG freehub rear wheels - only 1 brand (Shimano MT510) existed, the sole rear wheel for NX Eagle (HG freehub) 12-speed builds. Each maker's HG option re-confirmed via a fetched manufacturer page this pass. --- */
  { id:'rw-dtswiss-ex-1700-29-hg', cat:'rearwheel', brand:'DT Swiss', model:'EX 1700 rear (Shimano HG)', family:'dtswiss-ex-1700', disciplines:['enduro'], price:400, weight:1150, wheel:'29', hub:'Boost148', freehub:'HG', rotorMount:'CL', intWidth:30, maxTire:2.5, desc:'sample specs (mirror XD sibling); HG existence confirmed via a fetched dtswiss.com product-support page for the 1700 Spline series (matnr WEX1700TGDBSO13808) listing "Freehub Type: Shimano Light (ASL)" — the tool-free 1700-series hub swaps XD/Micro Spline/HG' },
  { id:'rw-hope-fortus-30-29-hg', cat:'rearwheel', brand:'Hope', model:'Fortus 30 Pro 5 rear (Shimano HG)', family:'hope-fortus', gen:'Pro 5', disciplines:['enduro'], price:550, weight:1270, wheel:'29', hub:'Boost148', freehub:'HG', rotorMount:'sixbolt', intWidth:30, maxTire:2.8, desc:'sample specs (mirror XD sibling; Pro 5 hub); HG existence confirmed via a fetched hopetech.com Fortus 30 Pro 5 page: "Shimano Aluminium, Shimano Steel, MicroSpline and Sram XD freehub body options available"' },
  /* --- discipline expansion pass 4: XC race rear wheels (VERIFIED vs crankbrothers.com; the page offers XD and Micro Spline freehubs - one row each, e-1900 precedent) --- */
  { id:'rw-crankbrothers-synthesis-xct11-29-ms', cat:'rearwheel', brand:'Crankbrothers', model:'Synthesis XCT 11 rear (Micro Spline)', family:'crankbrothers-synthesis-xct', disciplines:['xc'], price:1399, weight:859, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:24.5, maxTire:2.4, verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/synthesis-xct-11-carbon-rear-wheel', desc:'maxTire = sample guidance (XC rim); 29, 148x12 Boost, 6-bolt, 24.5mm internal, 859g, $1,399.99, I9 Hydra, XD/MS freehub options - all from the fetched crankbrothers.com product page' },
  { id:'rw-crankbrothers-synthesis-xct11-29-xd', cat:'rearwheel', brand:'Crankbrothers', model:'Synthesis XCT 11 rear (XD)', family:'crankbrothers-synthesis-xct', disciplines:['xc'], price:1399, weight:859, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:24.5, maxTire:2.4, verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/synthesis-xct-11-carbon-rear-wheel', desc:'maxTire = sample guidance (XC rim); the XD-freehub option of the same wheel (both options on the fetched crankbrothers.com page); weight = the page figure (freehub delta unstated)' },
  /* --- discipline expansion, DT Swiss FR sweep: DH rears (the FR 1500 Classic rear is sold in 148 Boost / 150 / 157 axles per dtswiss.com + Enduro-MTB review) --- */
  { id:'rw-dtswiss-fr-1500-29-157', cat:'rearwheel', brand:'DT Swiss', model:'FR 1500 Classic rear (157)', family:'dtswiss-fr-1500', disciplines:['dh'], price:576, weight:1200, wheel:'29', hub:'SuperBoost157', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs; existence confirmed via Pro Bike Supply/Modern Bike listings (29, 12x157, 6-bolt, XD; bike24 notes an HG freehub in the box for compact DH cassettes)' },
  { id:'rw-dtswiss-fr-1500-29-150', cat:'rearwheel', brand:'DT Swiss', model:'FR 1500 Classic rear (150)', family:'dtswiss-fr-1500', disciplines:['dh'], price:576, weight:1200, wheel:'29', hub:'150x12', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs; 12x150 axle option confirmed via dtswiss.com FR 1500 Classic axle options (148 Boost / 150 / 157) + Enduro-MTB review; XD entered as the family-standard fitted freehub - confirm freehub as shipped when verifying' },
  /* --- discipline expansion pass 4: the 27.5 FR 1500 rear in 12x150 (the full-27.5 FRS rear) --- */
  { id:'rw-dtswiss-fr-1500-275-150', cat:'rearwheel', brand:'DT Swiss', model:'FR 1500 Classic 27.5 rear (150)', family:'dtswiss-fr-1500', disciplines:['dh'], price:720, weight:1021, wheel:'275', hub:'150x12', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (price = UC retail $719.90; weight = UC-listed 1021g, retailer figure); 27.5 12x150 existence confirmed via FETCHED Universal Cycles listing WFR1500OHDRSA21532 (ships 12x157 with 12x150 end caps + HG 8-11 body in box, XD installed, 6-bolt, 30mm internal)' },
  { id:'rw-dtswiss-fr-1500-275-157', cat:'rearwheel', brand:'DT Swiss', model:'FR 1500 Classic 27.5 rear (157)', family:'dtswiss-fr-1500', disciplines:['dh'], price:720, weight:1021, wheel:'275', hub:'SuperBoost157', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'catalog-expand-9: fixes a real 0-brand gap - five SuperBoost157 mullet-capable DH frames (Firebird, Supreme DH V5/V5.2, Sender CFR, V10 8) had NO 27.5 rear wheel option at all, since every other SuperBoost157 rear in-catalog is 29in-only. The as-shipped hub on this same wheel IS 157 (its own 150 sibling row\'s FETCHED Universal Cycles listing WFR1500OHDRSA21532 states it "ships 12x157 with 12x150 end caps... in box"), so this row is the native config and the 150 row the adapted one. price/weight mirrored from the 150 sibling (same physical wheel, different end cap installed)' },
  { id:'rw-crankbrothers-synthesis-dh11-29-157', cat:'rearwheel', brand:'Crankbrothers', model:'Synthesis DH 11 rear (157)', family:'crankbrothers-synthesis-dh', disciplines:['dh'], price:1400, weight:1203, wheel:'29', hub:'SuperBoost157', freehub:'XD', rotorMount:'sixbolt', intWidth:31.5, maxTire:2.6, verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/synthesis-dh-11-carbon-rear-wheel', desc:'CORRECTED weight 1050->1203g and price 999->1400 (MSRP $1,399.99) to match the fetched crankbrothers.com Synthesis DH 11 Carbon rear-wheel page: 29" 1203g, 31.5mm internal, 6-bolt, 148x12 or 157x12, XD or HG freehub, I9 Hydra hub' },
  /* --- mullet-rears un-park (2026-07-08): ~16 frames support mullet but DT Swiss E 1900 was nearly the
     only 27.5 rear in stock, so mullet rear choice collapsed to one brand. Added Boost 148 27.5 rears
     confirmed to exist across 4 more brands (We Are One, Spank, Stan's, Hope), each a sample-data mirror
     of its existing 29" sibling with the 27.5-specific facts a fetched page actually stated. --- */
  { id:'rw-weareone-union-275', cat:'rearwheel', brand:'We Are One', model:'Union 27.5 rear', family:'weareone-union', disciplines:['enduro'], price:950, weight:1050, wheel:'275', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (mirror 29 XD sibling); 27.5 rear in 12x148 Boost (or 12x157), 30mm internal, Centerlock or 6-bolt, I9 101/DT Swiss 350 hub options - from the fetched vitalmtb.com Union wheelset spec page (freehub body not itemized there; XD kept consistent with the 29 sibling, the only body cataloged for this brand)' },
  { id:'rw-spank-359-275', cat:'rearwheel', brand:'Spank', model:'359 rear 27.5', family:'spank-359', disciplines:['enduro'], price:450, weight:1180, wheel:'275', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30.5, maxTire:2.6, desc:'weight = sample (mirror 29 sibling, no weight published); 27.5 Boost 148x12 rear offered with HG/XD/Microspline freehubs, 6-bolt, 30.5mm internal, $449.99 - all from the fetched spank-ind.com product page' },
  { id:'rw-spank-359-275-ms', cat:'rearwheel', brand:'Spank', model:'359 rear 27.5 (Micro Spline)', family:'spank-359', disciplines:['enduro'], price:450, weight:1180, wheel:'275', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30.5, maxTire:2.6, desc:'weight = sample (mirror XD sibling); the Microspline freehub option on the same fetched spank-ind.com 27.5 359 rear page' },
  { id:'rw-stans-flow-ex3-275', cat:'rearwheel', brand:'Stans', model:'Flow EX3 rear 27.5', family:'stans-flow-ex3', disciplines:['enduro'], price:505, weight:1159, wheel:'275', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (mirror 29 XD sibling; price matches the fetched retailer listing exactly); 27.5, 12x148mm, SRAM XDR, 6-Bolt, 30mm internal, $505 - from the fetched thelostco.com SKU page (stans.com lists the 148 configs "coming soon" at time of entry; multiple independent retailers - Colorado Cyclist, REI, Bikeman, Modern Bike - list it in stock, so entered as existing, unverified sample data)' },
  { id:'rw-stans-flow-ex3-275-ms', cat:'rearwheel', brand:'Stans', model:'Flow EX3 rear 27.5 (Micro Spline)', family:'stans-flow-ex3', disciplines:['enduro'], price:505, weight:1159, wheel:'275', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30, maxTire:2.6, desc:'sample specs (mirror XD sibling); "Stan\'s NoTubes Flow EX3 6-Bolt 27.5 Boost Micro Spline Rear Wheel" - REI listing title, corroborated by thelostco.com and Colorado Cyclist SKU pages for the same 27.5/148/Micro Spline configuration' },
  { id:'rw-hope-fortus-30-275', cat:'rearwheel', brand:'Hope', model:'Fortus 30 Pro 4 rear 27.5', family:'hope-fortus', gen:'Pro 4', disciplines:['enduro'], price:550, weight:1270, wheel:'275', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.8, desc:'sample specs (mirror 29 XD sibling); 27.5 Fortus 30W Boost 148x12 rear with SRAM XD/Shimano Microspline/HG freehub options and 6-bolt or Centerlock mount - from the fetched bikewheelsdirect.com configurator (hopetech.com\'s own Fortus 30 page confirms 27.5/29 + 148 Boost/150mm axle options without a size-specific breakdown)' },
  { id:'rw-hope-fortus-30-275-ms', cat:'rearwheel', brand:'Hope', model:'Fortus 30 Pro 5 rear 27.5 (Micro Spline)', family:'hope-fortus', gen:'Pro 5', disciplines:['enduro'], price:550, weight:1270, wheel:'275', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30, maxTire:2.8, desc:'sample specs (mirror XD sibling; Pro 5 hub, matching the 29 Micro Spline sibling\'s convention); Shimano Microspline freehub option on the same fetched bikewheelsdirect.com 27.5 Fortus 30W configurator' },
  { id:'rw-ibis-s35-i9-29-xd', cat:'rearwheel', brand:'Ibis', model:'S35 Industry 9 Hydra rear (XD)', family:'ibis-s35', disciplines:['enduro'], price:650, weight:910, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'CL', intWidth:35, maxTire:2.8, verified:true, lastChecked:'2026-07-08', source:'https://store.ibiscycles.com/products/s35-29-industry-9-carbon-wheelset', desc:'weight/price = sample 45/55 split of the fetched page\'s 1650g/$1199 WHEELSET total; 148x12 Boost, Center Lock, 35mm internal, SRAM XD or Shimano Micro Spline freehub options all from the fetched store.ibiscycles.com page' },
  { id:'rw-ibis-s35-i9-29-ms', cat:'rearwheel', brand:'Ibis', model:'S35 Industry 9 Hydra rear (Micro Spline)', family:'ibis-s35', disciplines:['enduro'], price:650, weight:910, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'CL', intWidth:35, maxTire:2.8, verified:true, lastChecked:'2026-07-08', source:'https://store.ibiscycles.com/products/s35-29-industry-9-carbon-wheelset', desc:'weight/price mirror the XD sibling; Shimano Micro Spline is the same fetched store.ibiscycles.com page\'s other freehub option' },
  { id:'rw-ibis-send-29-xd', cat:'rearwheel', brand:'Ibis', model:'Blackbird Send 29 AL rear (XD)', family:'ibis-send', disciplines:['enduro'], price:283, weight:1105, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:35, maxTire:2.8, verified:true, lastChecked:'2026-07-08', source:'https://store.ibiscycles.com/products/send-29-aluminum-wheelset', desc:'weight/price = sample 45/55 split of the fetched page\'s 2060g/$525 WHEELSET total; 148x12 Boost, Six Bolt, 35mm internal, SRAM XD or Shimano Micro Spline driver options all from the fetched store.ibiscycles.com page' },
  { id:'rw-ibis-send-29-ms', cat:'rearwheel', brand:'Ibis', model:'Blackbird Send 29 AL rear (Micro Spline)', family:'ibis-send', disciplines:['enduro'], price:283, weight:1105, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:35, maxTire:2.8, verified:true, lastChecked:'2026-07-08', source:'https://store.ibiscycles.com/products/send-29-aluminum-wheelset', desc:'weight/price mirror the XD sibling; Shimano Micro Spline is the same fetched store.ibiscycles.com page\'s other driver option' },

  /* FRONT/REAR HUBS + RIMS - the build-your-own-wheel alternate path (fronthub/
     rearhub/rim cats, additive alongside the complete wheels above). Only for
     brands confirmed via a fetched page to sell a standalone hub AND/OR rim as
     its own purchasable SKU (not every "wheel brand" does - e.g. Stan's only
     sells the rim standalone, never a complete hub, so it gets a rim row only;
     Race Face's Turbine SL wheelset has no standalone version of its own rim,
     so its rim row is the ARC line instead, its actual standalone rim product,
     at the matching 25mm internal width). Hub axle/freehub/rotor-mount and rim
     wheel-size/intWidth/maxTire mirror the already-cataloged complete wheel of
     the same platform above. */
  { id:'fh-dtswiss-350-boost110', cat:'fronthub', brand:'DT Swiss', model:'350 front hub', family:'dtswiss-350', price:89, weight:142, hub:'Boost110', rotorMount:'CL', desc:'price = sample (DT Swiss doesn\'t publish the exact 110 Boost Center Lock SKU\'s combined price+weight page); 142g from a fetched retailer spec table, $89 mirrors the fetched wheelbuilder.com 350 Classic CL front hub (non-Boost) listing', source:'https://wheelbuilder.com/dt-swiss-350-classic-center-lock-disc-brake-front-hub/' },
  { id:'rh-dtswiss-350-boost148-xd', cat:'rearhub', brand:'DT Swiss', model:'350 rear hub (XD)', family:'dtswiss-350', price:199, weight:272, hub:'Boost148', freehub:'XD', rotorMount:'CL', source:'https://wheelbuilder.com/dt-swiss-350-classic-boost-center-lock-disc-brake-rear-hub/', desc:'272g/$199 from a fetched wheelbuilder.com listing for this exact 148 Boost Center Lock SKU; the 350\'s freehub body is a tool-free swap (XD/Micro Spline/HG), so weight/price mirror across the freehub siblings below' },
  { id:'rh-dtswiss-350-boost148-ms', cat:'rearhub', brand:'DT Swiss', model:'350 rear hub (Micro Spline)', family:'dtswiss-350', price:199, weight:272, hub:'Boost148', freehub:'MicroSpline', rotorMount:'CL', desc:'weight/price mirror the XD sibling (tool-free freehub-body swap, same hub)' },
  { id:'rh-dtswiss-350-boost148-hg', cat:'rearhub', brand:'DT Swiss', model:'350 rear hub (Shimano HG)', family:'dtswiss-350', price:199, weight:272, hub:'Boost148', freehub:'HG', rotorMount:'CL', desc:'weight/price mirror the XD sibling (tool-free freehub-body swap, same hub)' },
  { id:'rm-dtswiss-ex511-29', cat:'rim', brand:'DT Swiss', model:'EX 511 rim (29)', family:'dtswiss-ex511', price:174, weight:570, wheel:'29', intWidth:30, maxTire:2.5, source:'https://www.dtswiss.com/en/components/rims-mtb/enduro/ex-511', desc:'the rim the EX 1700 wheelset is built on ("EX 1700 Spline is built with the 30mm wide EX 511 Enduro rims", dtswiss.com); 29in weight + "from $174" price both fetched (dtswiss.com + fanatikbike.com agree on $174/174.90)' },

  { id:'fh-hope-pro5-boost110', cat:'fronthub', brand:'Hope', model:'Pro 5 front hub', family:'hope-pro5', price:131, weight:187, hub:'Boost110', rotorMount:'sixbolt', source:'https://www.hopetech.com/products/hubs/mountain-bike/pro-5-110mm-boost-front/', desc:'187g (6-Bolt) + $130.81 ex-tax both from the fetched hopetech.com Pro 5 110mm Boost Front page (it also lists a 140g Center Lock option)' },
  { id:'rh-hope-pro5-boost148-xd', cat:'rearhub', brand:'Hope', model:'Pro 5 rear hub (XD)', family:'hope-pro5', price:265, weight:270, hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', desc:'price from hopetech.com ($265 rear, search-corroborated); weight is a sample estimate in the same range as its DT Swiss/I9 rear-hub peers (a single combined weight+price page for this exact config didn\'t surface) - Pro 5 offers HG/XD/Micro Spline via a tool-free freehub-body swap, so weight/price mirror across the siblings below' },
  { id:'rh-hope-pro5-boost148-ms', cat:'rearhub', brand:'Hope', model:'Pro 5 rear hub (Micro Spline)', family:'hope-pro5', price:265, weight:270, hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', desc:'weight/price mirror the XD sibling (tool-free freehub-body swap, same hub)' },
  { id:'rh-hope-pro5-boost148-hg', cat:'rearhub', brand:'Hope', model:'Pro 5 rear hub (Shimano HG)', family:'hope-pro5', price:265, weight:270, hub:'Boost148', freehub:'HG', rotorMount:'sixbolt', desc:'weight/price mirror the XD sibling (tool-free freehub-body swap, same hub)' },
  { id:'rm-hope-fortus30-29', cat:'rim', brand:'Hope', model:'Fortus 30 rim (29)', family:'hope-fortus', price:127, weight:720, wheel:'29', intWidth:30, maxTire:2.8, desc:'720g 29in rim weight is search-corroborated (matches the 26/27.5in siblings\' known progression); price approximates the fetched hopetech.com "£100 per rim" SC quote (~$127)' },

  { id:'fh-industrynine-hydraclassic-boost110', cat:'fronthub', brand:'Industry Nine', model:'Hydra Classic front hub', family:'industrynine-hydra-classic', price:215, weight:160, hub:'Boost110', rotorMount:'sixbolt', desc:'weight/price are search-corroborated (155-165g / $215 range, no single combined-spec page surfaced) - a real standalone SKU (industrynine.com sells Hydra Classic hubs a la carte)' },
  { id:'rh-industrynine-hydraclassic-boost148-ms', cat:'rearhub', brand:'Industry Nine', model:'Hydra Classic rear hub (Micro Spline)', family:'industrynine-hydra-classic', price:460, weight:270, hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', source:'https://wheelbuilder.com/industry-nine-hydra-classic-iso-boost-rear-hub/', desc:'270g/$460 from a fetched wheelbuilder.com listing for this exact 148 Boost rear hub (page confirms Shimano HG/SRAM XD/Shimano Micro Spline freehub options)' },
  { id:'rh-industrynine-hydraclassic-superboost157-xd', cat:'rearhub', brand:'Industry Nine', model:'Hydra Classic rear hub (SuperBoost157, XD)', family:'industrynine-hydra-classic', price:460, weight:270, hub:'SuperBoost157', freehub:'XD', rotorMount:'sixbolt', desc:'weight/price mirror the Boost148 sibling (same hub family, SuperBoost157 is the same hub shell on a wider spoke flange, per the fetched wheelbuilder.com page\'s axle-option list); matches the existing rw-industrynine-enduro-s-29-157 wheel\'s exact axle+freehub combo' },
  { id:'rm-industrynine-endurosv2-29', cat:'rim', brand:'Industry Nine', model:'Enduro S V2 alloy rim (29)', family:'industrynine-enduro-s', price:200, weight:580, wheel:'29', intWidth:30, maxTire:2.6, desc:'580g / 30.5mm internal (rounded to the existing 30mm wheel row\'s value) from search coverage of the V2 alloy rim (a distinct rim-only SKU/price wasn\'t found on industrynine.com - price is a same-tier sample estimate)' },

  { id:'fh-spank-hex-boost110', cat:'fronthub', brand:'Spank', model:'Hex Straightpull front hub', family:'spank-hex', price:130, weight:136, hub:'Boost110', rotorMount:'sixbolt', source:'https://spank-ind.com/products/spank-hex-straightpull-front-hub', desc:'136g/$129.99 from the fetched spank-ind.com product page (Boost 15x110, 6-bolt)' },
  { id:'rh-spank-hex-boost148-xd', cat:'rearhub', brand:'Spank', model:'Hex J-Type rear hub (XD)', family:'spank-hex', price:250, weight:310, hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', source:'https://spank-ind.com/products/spank-hex-j-type-rear-hub', desc:'310g (Boost R148 XD row) / $249.99 from the fetched spank-ind.com spec table (HG/XD/Micro Spline alloy driver options listed at the same price)' },
  { id:'rh-spank-hex-boost148-ms', cat:'rearhub', brand:'Spank', model:'Hex J-Type rear hub (Micro Spline)', family:'spank-hex', price:250, weight:315, hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', desc:'weight is the same fetched spec table\'s Micro Spline row (mid-300s vs the XD row\'s 310g); price matches the table\'s flat $249.99 across driver options' },
  { id:'rm-spank-359-29', cat:'rim', brand:'Spank', model:'359 rim (29)', family:'spank-359', price:115, weight:505, wheel:'29', intWidth:31, maxTire:2.6, source:'https://spank-ind.com/products/spank-359-rim', desc:'505g / $114.99 search-corroborated (Modern Bike, LoamLabs both list the standalone spank-ind.com SKU at $114.99); the 30.5mm internal width spec rounds to the existing 359 wheel rows\' 31mm value' },

  { id:'fh-raceface-vault-boost110', cat:'fronthub', brand:'Race Face', model:'Vault front hub', family:'raceface-vault', price:175, weight:177, hub:'Boost110', rotorMount:'sixbolt', desc:'177g/$175 search-corroborated (nsmb.com/pinkbike/bikemag coverage of the standalone-hub launch); the fetched raceface.com product page confirms the 15x110 Boost front axle option but doesn\'t break out front-only price' },
  { id:'rh-raceface-vault-boost148-xd', cat:'rearhub', brand:'Race Face', model:'Vault rear hub (XD)', family:'raceface-vault', price:325, weight:305, hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', source:'https://www.raceface.com/products/vault-j-bend-hub-28h', desc:'305g/$325 search-corroborated; the fetched raceface.com page confirms 12x148 Boost XD-R and HG-R axle options directly (weight is a lightest-config figure on that same page)' },
  { id:'rh-raceface-vault-boost148-ms', cat:'rearhub', brand:'Race Face', model:'Vault rear hub (Micro Spline)', family:'raceface-vault', price:325, weight:305, hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', desc:'weight/price mirror the XD sibling; Micro Spline is a separate $95 freehub-body swap confirmed via a fetched raceface.com/bikepacking.com product page ("fits all Race Face VAULT rear hubs")' },
  { id:'rm-raceface-arc25-29', cat:'rim', brand:'Race Face', model:'ARC Offset 25 rim (29)', family:'raceface-arc', price:100, weight:450, wheel:'29', intWidth:25, maxTire:2.6, desc:'the standalone rim line (raceface.com sells ARC Offset rims a la carte; the Turbine SL wheelset itself has no separately-sold rim) at the 25mm internal width matching the existing Turbine SL wheel rows; $94.99-99.99 / 450g at 25mm from search coverage of the ARC Offset lineup, a 30mm sibling (515g/$109.99) confirmed via a fetched fanatikbike.com listing' },

  { id:'rm-stans-flowex3-29', cat:'rim', brand:'Stans', model:'Flow EX3 rim (29)', family:'stans-flow-ex3', price:140, weight:618, wheel:'29', intWidth:29, maxTire:2.6, verified:true, lastChecked:'2026-07-08', source:'https://stans.com/products/flow-ex3-rim', desc:'Stan\'s sells this rim standalone but never a complete hub (only axles/freehub-kit spare parts, confirmed via stans.com\'s own Neo Hub Parts collection) - so Stan\'s gets a rim row only; pair it with any other brand\'s hub for a custom build, same as real wheelbuilding' },

  /* TIRES (each a size-specific model; front + rear chosen separately) */
  { id:'ti-maxxis-assegai-29-25-exop-mg', cat:'tire', brand:'Maxxis', model:'Assegai 29x2.5 EXO+ MaxxGrip', family:'maxxis-assegai', disciplines:['enduro'], price:90, weight:1219, wheel:'29', width:2.5, casing:'exo-plus', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-06', source:'https://www.maxxis.com/us/tire/assegai/' },
  /* --- discipline expansion: DH-casing tire (first row on the existing 'dh' casing vocab) --- */
  { id:'ti-maxxis-assegai-29-25-dh-mg', cat:'tire', brand:'Maxxis', model:'Assegai 29x2.5 DH MaxxGrip', family:'maxxis-assegai', mfgPn:'TB00064500', disciplines:['dh'], price:95, weight:1480, wheel:'29', width:2.5, casing:'dh', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/assegai/', desc:'price = sample (page lists no MSRP); CORRECTED weight 1315->1480g to match the fetched maxxis.com SKU table (29x2.50 DH casing, 3C MaxxGrip, 60X2, foldable). Table lists two identical-spec DH 3C MaxxGrip PNs (TB00064500/TB00473000), both 1480g' },
  /* --- discipline expansion pass 4: the 27.5 DH-casing Assegai (the full-27.5 FRS build's tire) --- */
  { id:'ti-maxxis-assegai-275-25-dh-mg', cat:'tire', brand:'Maxxis', model:'Assegai 27.5x2.5 DH MaxxGrip', family:'maxxis-assegai', mfgPn:'TB00017200', disciplines:['dh'], price:95, weight:1389, wheel:'275', width:2.5, casing:'dh', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/assegai/', desc:'price = sample (page lists no MSRP); Part # TB00017200, 1389g, 3C MaxxGrip, DH casing, 27.5x2.50 WT - from the fetched maxxis.com SKU table' },
  /* --- discipline expansion pass 2: XC race tires from the fetched maxxis.com Aspen SKU table --- */
  { id:'ti-maxxis-aspen-29-24-exo-dual', cat:'tire', brand:'Maxxis', model:'Aspen 29x2.4 EXO Dual', family:'maxxis-aspen', mfgPn:'TB00211500', disciplines:['xc'], price:75, weight:756, wheel:'29', width:2.4, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/aspen/', desc:'price = sample (page lists no MSRP); weight 756g + Part # + EXO/TR from the fetched maxxis.com SKU table; 2.4 optimized for 30mm internal rims' },
  { id:'ti-maxxis-aspen-29-225-exo-ms', cat:'tire', brand:'Maxxis', model:'Aspen 29x2.25 EXO MaxxSpeed', family:'maxxis-aspen', mfgPn:'TB00523800', disciplines:['xc'], price:80, weight:650, wheel:'29', width:2.25, casing:'exo', compound:'maxxspeed', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/aspen/', desc:'price = sample (page lists no MSRP); weight 650g + Part # + 170tpi MaxxSpeed/EXO/TR from the fetched maxxis.com SKU table' },
  /* --- discipline expansion pass 8: first Vittoria XC tire (vocab widened: casing xc-race, compound graphene-silica - brand-native tiers) --- */
  { id:'ti-vittoria-mezcal-29-24-xc-race-graphene-silica', cat:'tire', brand:'Vittoria', model:'Mezcal XC Race 29x2.4', family:'vittoria-mezcal', disciplines:['xc'], price:107, weight:740, wheel:'29', width:2.4, casing:'xc-race', compound:'graphene-silica', verified:true, lastChecked:'2026-07-08', source:'https://vittoria.com/products/mezcal-xc-race', desc:'29x2.4 (60-622), 740g black, $106.99, TLR, 60tpi nylon, Race Formulation powered by Graphene + Silica - all from the fetched vittoria.com product page (no article numbers published)' },
  { id:'ti-vittoria-mezcal-29-225-xc-race-graphene-silica', cat:'tire', brand:'Vittoria', model:'Mezcal XC Race 29x2.25', family:'vittoria-mezcal', disciplines:['xc'], price:107, weight:700, wheel:'29', width:2.25, casing:'xc-race', compound:'graphene-silica', verified:true, lastChecked:'2026-07-08', source:'https://vittoria.com/products/mezcal-xc-race', desc:'29x2.25 (55-622), 700g black, $106.99, TLR - same fetched vittoria.com page as the 2.4 sibling' },
  /* --- discipline expansion pass 6: Rekon Race (the XC/downcountry rear-tread staple; third XC tire family) --- */
  { id:'ti-maxxis-rekon-race-29-225-exo-dual', cat:'tire', brand:'Maxxis', model:'Rekon Race 29x2.25 EXO Dual', family:'maxxis-rekon-race', mfgPn:'TB00046300', disciplines:['xc'], price:70, weight:737, wheel:'29', width:2.25, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/rekon-race/', desc:'price = sample (page lists no MSRP); Part # TB00046300, 737g, 120tpi, Dual, EXO/TR from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-rekon-race-29-24-exo-dual', cat:'tire', brand:'Maxxis', model:'Rekon Race 29x2.4 EXO Dual', family:'maxxis-rekon-race', mfgPn:'TB00211100', disciplines:['xc'], price:75, weight:814, wheel:'29', width:2.4, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/rekon-race/', desc:'price = sample (page lists no MSRP); Part # TB00211100, 814g, 120tpi, Dual, EXO/TR, 61-622 from the fetched maxxis.com SKU table' },
  { id:'ti-schwalbe-racing-ralph-29-235-sr-as', cat:'tire', brand:'Schwalbe', model:'Racing Ralph 29x2.35 Super Race ADDIX Speed', family:'schwalbe-racing-ralph', mfgPn:'11654053.01', disciplines:['xc'], price:102, weight:675, wheel:'29', width:2.35, casing:'super-race', compound:'addix-speed', verified:true, lastChecked:'2026-07-08', source:'https://www.schwalbetires.com/Racing-Ralph-11654053.01', desc:'weight = sample (page lists none; ~640g claimed for the 2.25 sibling); size/casing/compound/$102 RRP/TLE + article no. from the fetched schwalbetires.com SKU page; rear-specific XC tread (the Racing Ray front sibling needs its own fetched SKU)' },
  /* --- discipline expansion pass 4: the Racing Ray front sibling, from its own fetched SKU page --- */
  { id:'ti-schwalbe-racing-ray-29-235-sr-as', cat:'tire', brand:'Schwalbe', model:'Racing Ray 29x2.35 Super Race ADDIX Speed', family:'schwalbe-racing-ray', mfgPn:'11654052.01', disciplines:['xc'], price:102, weight:660, wheel:'29', width:2.35, casing:'super-race', compound:'addix-speed', verified:true, lastChecked:'2026-07-08', source:'https://www.schwalbetires.com/Racing-Ray-11654052.01', desc:'weight = sample (page lists none); 60-622 / Super Race / ADDIX Speed / $102 RRP / TLE / Evolution + article no. from the fetched schwalbetires.com SKU page; front-specific XC tread ("front wheel specialist") - pairs with the Racing Ralph rear' },
  { id:'ti-maxxis-minion-dhr-ii-29-24-exop-mt', cat:'tire', brand:'Maxxis', model:'Minion DHR II 29x2.4 EXO+ MaxxTerra', family:'maxxis-minion-dhr-ii', disciplines:['enduro'], price:85, weight:1125, wheel:'29', width:2.4, casing:'exo-plus', compound:'3c-maxxterra', verified:true, lastChecked:'2026-07-06', source:'https://www.maxxis.com/us/tire/minion-dhr-ii/' },
  { id:'ti-continental-kryptotal-fr-29-24-enduro-soft', cat:'tire', brand:'Continental', model:'Kryptotal-Fr 29x2.4 Enduro Soft', family:'continental-kryptotal-fr', disciplines:['enduro'], price:80, weight:1165, wheel:'29', width:2.4, casing:'enduro', compound:'soft', mfgPn:'0150696', desc:'price = sample (Continental publishes EUR RRP only, no US MSRP)', verified:true, lastChecked:'2026-07-07', source:'https://www.continental-tires.com/content/dam/conti-tires-cms/continental/b2c/downloads/bicycle/TireRange-Bicycle.pdf.coredownload.pdf', sourceType:'manufacturer-doc' },
  /* --- discipline expansion pass 4: the first Continental XC tire (vocab widened: casing 'protection', compound 'blackchili'). The Race King sibling has NO fetchable page left (WWC 404, BikeTiresDirect discontinued, Performance 403) - skipped, not fabricated. --- */
  { id:'ti-continental-cross-king-29-22-protection-blackchili', cat:'tire', brand:'Continental', model:'Cross King 29x2.2 ProTection BlackChili', family:'continental-cross-king', mfgPn:'01014710000', disciplines:['xc'], price:89, weight:630, wheel:'29', width:2.2, casing:'protection', compound:'blackchili', desc:'sample specs (retailer figures: $88.95, 630g); existence + ProTection/BlackChili/29x2.20/TR + MPN from the FETCHED Worldwide Cyclery listing (continental-tires.com product pages and the Tire Range PDF are currently unfetchable - PDF now exceeds fetch size)' },
  { id:'ti-schwalbe-magic-mary-29-24-sg-as', cat:'tire', brand:'Schwalbe', model:'Magic Mary 29x2.4 Super Gravity ADDIX Soft', family:'schwalbe-magic-mary', disciplines:['enduro'], price:108, weight:1280, wheel:'29', width:2.4, casing:'super-gravity', compound:'addix-soft', mfgPn:'11600615.03', verified:true, lastChecked:'2026-07-07', source:'https://www.schwalbetires.com/Magic-Mary' },
  /* --- discipline expansion pass 5: 27.5 Super Downhill Magic Mary (second 27.5 DH-tire brand for the FRS) --- */
  { id:'ti-schwalbe-magic-mary-275-24-sdh-aus', cat:'tire', brand:'Schwalbe', model:'Magic Mary 27.5x2.4 Super Downhill ADDIX Ultra Soft', family:'schwalbe-magic-mary', mfgPn:'11654180', disciplines:['dh'], price:108, weight:1320, wheel:'275', width:2.4, casing:'super-downhill', compound:'addix-ultra-soft', verified:true, lastChecked:'2026-07-08', source:'https://www.schwalbetires.com/magic-mary-11654180', desc:'62-584 / Super Downhill / ADDIX Ultra Soft / $108 RRP / TLE / 2.9101 lb (1320g) + article no. - all from the fetched schwalbetires.com SKU page' },
  { id:'ti-maxxis-assegai-275-25-exop-mg', cat:'tire', brand:'Maxxis', model:'Assegai 27.5x2.5 EXO+ MaxxGrip', family:'maxxis-assegai', disciplines:['enduro'], price:90, weight:1139, wheel:'275', width:2.5, casing:'exo-plus', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-06', source:'https://www.maxxis.com/us/tire/assegai/' },
  { id:'ti-maxxis-minion-dhr-ii-275-24-exop-mt', cat:'tire', brand:'Maxxis', model:'Minion DHR II 27.5x2.4 EXO+ MaxxTerra', family:'maxxis-minion-dhr-ii', disciplines:['enduro'], price:85, weight:1055, wheel:'275', width:2.4, casing:'exo-plus', compound:'3c-maxxterra', verified:true, lastChecked:'2026-07-06', source:'https://www.maxxis.com/us/tire/minion-dhr-ii/' },
  { id:'ti-maxxis-minion-dhf-29-25-exop-mg', cat:'tire', brand:'Maxxis', model:'Minion DHF 29x2.5 EXO+ MaxxGrip', family:'maxxis-minion-dhf', disciplines:['enduro'], price:90, weight:1162, wheel:'29', width:2.5, casing:'exo-plus', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-06', source:'https://www.maxxis.com/us/tire/minion-dhf/' },
  /* --- discipline expansion pass 5 (2026-07-08): 27.5 DH-casing Minions - tire breadth for the full-27.5 FRS (only the Assegai fit it before). Classic DH pairing: DHF front / DHR II rear. --- */
  { id:'ti-maxxis-minion-dhf-275-25-dh-mg', cat:'tire', brand:'Maxxis', model:'Minion DHF 27.5x2.5 DH MaxxGrip', family:'maxxis-minion-dhf', mfgPn:'TB85975700', disciplines:['dh'], price:95, weight:1243, wheel:'275', width:2.5, casing:'dh', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhf/', desc:'price = sample (page lists no MSRP); Part # TB85975700, 1243g, 3C MaxxGrip, DH casing (3G/DH/TR), 27.5x2.50 - from the fetched maxxis.com SKU table (the E50-rated sibling TB00472900 at 1335g also exists)' },
  { id:'ti-maxxis-minion-dhr-ii-275-25-dh-mg', cat:'tire', brand:'Maxxis', model:'Minion DHR II 27.5x2.5 DH MaxxGrip', family:'maxxis-minion-dhr-ii', mfgPn:'TB00551200', disciplines:['dh'], price:95, weight:1325, wheel:'275', width:2.5, casing:'dh', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhr-ii/', desc:'price = sample (page lists no MSRP); Part # TB00551200, 1325g, 3C MaxxGrip, DH casing (3G/DH/TR), 27.5x2.50 - from the fetched maxxis.com SKU table (TB00551400 is the DoubleDown sibling, not DH)' },
  /* --- catalog-expand-B (2026-07-08): 29" DH-casing Minions - only the Assegai had a 29 DH SKU before, single-brand collapse for 29" DH front/rear builds. --- */
  { id:'ti-maxxis-minion-dhf-29-25-dh-mg', cat:'tire', brand:'Maxxis', model:'Minion DHF 29x2.5 DH MaxxGrip', family:'maxxis-minion-dhf', mfgPn:'TB96800700', disciplines:['dh'], price:95, weight:1423, wheel:'29', width:2.5, casing:'dh', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhf/', desc:'price = sample (page lists no MSRP); Part # TB96800700, 1423g, 3C MaxxGrip, DH casing (3G/DH/TR), 29x2.50 - from the fetched maxxis.com SKU table (the E50-rated sibling TB00472800 also at 1423g; TB00132600 is the DoubleDown sibling, not DH)' },
  { id:'ti-maxxis-minion-dhr-ii-29-25-dh-mg', cat:'tire', brand:'Maxxis', model:'Minion DHR II 29x2.5 DH MaxxGrip', family:'maxxis-minion-dhr-ii', mfgPn:'TB00550800', disciplines:['dh'], price:95, weight:1415, wheel:'29', width:2.5, casing:'dh', compound:'3c-maxxgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhr-ii/', desc:'price = sample (page lists no MSRP); Part # TB00550800, 1415g, 3C MaxxGrip, DH casing (3G/DH/TR), 29x2.50 - from the fetched maxxis.com SKU table (TB96797500 is the 2.40 sibling at 1379g)' },
  /* --- catalog-wheels-tires batch 4 (2026-07-08): a complete 2.6in-width DHF/DHR II front+rear pairing at both wheel sizes (only 2.4/2.5 existed before) - plus-tire enduro coverage. Only Dual/3C MaxxTerra SKUs picked from each fetched table; the plain single-compound "MaxxTerra" rows there would need a vocab widen, skipped. --- */
  { id:'ti-maxxis-minion-dhf-275-26-exo-mt', cat:'tire', brand:'Maxxis', model:'Minion DHF 27.5x2.6 EXO 3C MaxxTerra', family:'maxxis-minion-dhf', mfgPn:'TB91146300', disciplines:['enduro'], price:85, weight:1025, wheel:'275', width:2.6, casing:'exo', compound:'3c-maxxterra', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhf/', desc:'price = sample (page lists no MSRP); Part # TB91146300, 1025g, 120tpi, 3C MaxxTerra, EXO/TR, 66-584 - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-minion-dhr-ii-275-26-exo-dual', cat:'tire', brand:'Maxxis', model:'Minion DHR II 27.5x2.6 EXO Dual', family:'maxxis-minion-dhr-ii', mfgPn:'TB91149100', disciplines:['enduro'], price:85, weight:1043, wheel:'275', width:2.6, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhr-ii/', desc:'price = sample (page lists no MSRP); Part # TB91149100, 1043g, 60tpi, Dual, EXO/TR, 66-584 - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-minion-dhf-29-26-exo-dual', cat:'tire', brand:'Maxxis', model:'Minion DHF 29x2.6 EXO Dual', family:'maxxis-minion-dhf', mfgPn:'TB00220000', disciplines:['enduro'], price:85, weight:1107, wheel:'29', width:2.6, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhf/', desc:'price = sample (page lists no MSRP); Part # TB00220000, 1107g, 60tpi, Dual, EXO/TR, 66-622 - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-minion-dhr-ii-29-26-exo-dual', cat:'tire', brand:'Maxxis', model:'Minion DHR II 29x2.6 EXO Dual', family:'maxxis-minion-dhr-ii', mfgPn:'TB00220300', disciplines:['enduro'], price:85, weight:1099, wheel:'29', width:2.6, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/minion-dhr-ii/', desc:'price = sample (page lists no MSRP); Part # TB00220300, 1099g, 60tpi, Dual, EXO/TR, 66-622 - from the fetched maxxis.com SKU table' },
  /* Big Betty 29x2.4 ships Super Trail on schwalbetires.com - no Super Gravity
     in this size (that config exists in 27.5x2.4 / 29x2.6 only). */
  { id:'ti-schwalbe-big-betty-29-24-st-as', cat:'tire', brand:'Schwalbe', model:'Big Betty 29x2.4 Super Trail ADDIX Soft', family:'schwalbe-big-betty', disciplines:['enduro'], price:102, weight:1125, wheel:'29', width:2.4, casing:'super-trail', compound:'addix-soft', mfgPn:'11654155', verified:true, lastChecked:'2026-07-07', source:'https://www.schwalbetires.com/Big-Betty', desc:'drift flag 2026-07-08 NOT a price move: schwalbetires.com shows only a whole-line "from US$49.00* RRP" teaser (cheapest variant), not this SKUs per-config price - the per-casing/compound price needs the on-page configurator a plain fetch cant drive. $102 (this specific ST/Addix Soft SKU) retained; value un-reverifiable without a browser configurator session' },
  /* The catalog's first >2.5in tire - makes rules 14 (rim clearance) and 18
     (frame clearance) triggerable with REAL parts instead of synthetic probes
     (REVIEW.md #16). Same fetched source table as the 2.4 row. */
  { id:'ti-schwalbe-big-betty-29-26-sg-as', cat:'tire', brand:'Schwalbe', model:'Big Betty 29x2.6 Super Gravity ADDIX Soft', family:'schwalbe-big-betty', disciplines:['enduro'], price:108, weight:1370, wheel:'29', width:2.6, casing:'super-gravity', compound:'addix-soft', mfgPn:'11654158', verified:true, lastChecked:'2026-07-07', source:'https://www.schwalbetires.com/Big-Betty' },
  { id:'ti-michelin-wild-enduro-mh-29-24', cat:'tire', brand:'Michelin', model:'Wild Enduro MH 29x2.4', family:'michelin-wild-enduro', disciplines:['enduro'], price:80, weight:1290, wheel:'29', width:2.4, desc:'DATA MISMATCH (unverified, flagged 2026-07-08): the Wild Enduro MH Racing Line is sold ONLY in 29x2.50 (and 27.5x2.50) per ~6 independent retailer listings (The Lost Co, Worldwide Cyclery, Bikeparts, Northwest, SpokeX, Amped); the 29x2.40 tread is the Wild Enduro MS (Mixed Soft), not MH. So MH+2.4 is not a real SKU. NOT auto-fixed (would change part identity / id encodes 2.4) - id is append-only. weight 1290 is sample. michelinman.com is JS-rendered (unfetchable spec table); can only verify with browser access. See task chip.' },
  /* The old sample row said 29x2.5 - Pirelli makes NO 29x2.5 Scorpion Enduro
     (sizes are 2.4 / 2.6, per the fetched catalogue page). Size corrected with
     the pin. */
  { id:'ti-pirelli-scorpion-enduro-s-29-24-hw-sgg', cat:'tire', brand:'Pirelli', model:'Scorpion Enduro S 29x2.4 HardWALL', family:'pirelli-scorpion-enduro-s', disciplines:['enduro'], price:75, weight:1080, wheel:'29', width:2.4, casing:'hardwall', compound:'smartgrip-gravity', desc:'price = sample (Pirelli page lists no MSRP); size corrected from fictional 29x2.5', verified:true, lastChecked:'2026-07-07', source:'https://www.pirelli.com/tyres/en-ww/bike/tyres/catalogue/scorpion-enduro-s' },
  { id:'ti-continental-kryptotal-re-275-24-enduro-soft', cat:'tire', brand:'Continental', model:'Kryptotal-Re 27.5x2.4 Enduro Soft', family:'continental-kryptotal-re', disciplines:['enduro'], price:80, weight:1095, wheel:'275', width:2.4, casing:'enduro', compound:'soft', mfgPn:'0150632', desc:'price = sample (Continental publishes EUR RRP only, no US MSRP)', verified:true, lastChecked:'2026-07-07', source:'https://www.continental-tires.com/content/dam/conti-tires-cms/continental/b2c/downloads/bicycle/TireRange-Bicycle.pdf.coredownload.pdf', sourceType:'manufacturer-doc' },
  { id:'ti-maxxis-dissector-29-24-exop-mt', cat:'tire', brand:'Maxxis', model:'Dissector 29x2.4 EXO+ MaxxTerra', family:'maxxis-dissector', disciplines:['enduro'], price:80, weight:1022, wheel:'29', width:2.4, casing:'exo-plus', compound:'3c-maxxterra', verified:true, lastChecked:'2026-07-06', source:'https://www.maxxis.com/us/tire/dissector/' },
  /* Maxxis makes NO 29x2.4 High Roller II and NO 29x2.5 Shorty (fetched
     maxxis.com spec tables) - both sample sizes were fictional; corrected
     with the pins below. */
  { id:'ti-maxxis-high-roller-ii-29-25-dd-mt', cat:'tire', brand:'Maxxis', model:'High Roller II 29x2.5 DD MaxxTerra', family:'maxxis-high-roller-ii', disciplines:['enduro'], price:80, weight:1261, wheel:'29', width:2.5, casing:'doubledown', compound:'3c-maxxterra', mfgPn:'TB96803100', desc:'price = sample (maxxis.com spec table lists no MSRP); size corrected from fictional 29x2.4', verified:true, lastChecked:'2026-07-07', source:'https://www.maxxis.com/us/tire/high-roller-ii/' },
  { id:'ti-maxxis-shorty-29-24-dd-mg', cat:'tire', brand:'Maxxis', model:'Shorty 29x2.4 DD MaxxGrip', family:'maxxis-shorty', gen:'Gen2', disciplines:['enduro'], price:90, weight:1256, wheel:'29', width:2.4, casing:'doubledown', compound:'3c-maxxgrip', mfgPn:'TB00312200', desc:'price = sample (maxxis.com spec table lists no MSRP); size corrected from fictional 29x2.5', verified:true, lastChecked:'2026-07-07', source:'https://www.maxxis.com/us/tire/shorty/' },
  { id:'ti-specialized-butcher-t9-29-23', cat:'tire', brand:'Specialized', model:'Butcher T9 29x2.3', family:'specialized-butcher', disciplines:['enduro'], price:75, weight:1150, wheel:'29', width:2.3 },
  { id:'ti-schwalbe-hans-dampf-29-235-sg-as', cat:'tire', brand:'Schwalbe', model:'Hans Dampf 29x2.35 Super Gravity ADDIX Soft', family:'schwalbe-hans-dampf', disciplines:['enduro'], price:108, weight:1165, wheel:'29', width:2.35, casing:'super-gravity', compound:'addix-soft', mfgPn:'11601109.01', verified:true, lastChecked:'2026-07-07', source:'https://www.schwalbetires.com/Hans-Dampf' },
  { id:'ti-continental-argotal-29-24-enduro-soft', cat:'tire', brand:'Continental', model:'Argotal 29x2.4 Enduro Soft', family:'continental-argotal', disciplines:['enduro'], price:80, weight:1165, wheel:'29', width:2.4, casing:'enduro', compound:'soft', mfgPn:'0150686', desc:'price = sample (Continental publishes EUR RRP only, no US MSRP)', verified:true, lastChecked:'2026-07-07', source:'https://www.continental-tires.com/content/dam/conti-tires-cms/continental/b2c/downloads/bicycle/TireRange-Bicycle.pdf.coredownload.pdf', sourceType:'manufacturer-doc' },
  { id:'ti-vittoria-mazza-29-24-enduro-4c', cat:'tire', brand:'Vittoria', model:'Mazza Enduro 29x2.4', family:'vittoria-mazza', disciplines:['enduro'], price:96.99, weight:1375, wheel:'29', width:2.4, casing:'enduro', compound:'4c-graphene', verified:true, lastChecked:'2026-07-07', source:'https://vittoria.com/products/mazza-enduro' },
  { id:'ti-schwalbe-magic-mary-275-24-sg-as', cat:'tire', brand:'Schwalbe', model:'Magic Mary 27.5x2.4 Super Gravity ADDIX Soft', family:'schwalbe-magic-mary', disciplines:['enduro'], price:108, weight:1205, wheel:'275', width:2.4, casing:'super-gravity', compound:'addix-soft', mfgPn:'11600511.03', verified:true, lastChecked:'2026-07-07', source:'https://www.schwalbetires.com/Magic-Mary' },
  { id:'ti-maxxis-aggressor-29-23-dd-dual', cat:'tire', brand:'Maxxis', model:'Aggressor 29x2.3 DD Dual', family:'maxxis-aggressor', disciplines:['enduro'], price:70, weight:1205, wheel:'29', width:2.3, casing:'doubledown', compound:'dual', mfgPn:'TB96882100', desc:'price = sample (maxxis.com spec table lists no MSRP)', verified:true, lastChecked:'2026-07-07', source:'https://www.maxxis.com/us/tire/aggressor/' },
  { id:'ti-wtb-vigilante-29-25-sg2-tritec', cat:'tire', brand:'WTB', model:'Vigilante 29x2.5 TCS Light SG2', family:'wtb-vigilante', disciplines:['enduro'], price:75, weight:1107, wheel:'29', width:2.5, casing:'tcs-light-sg2', compound:'tritec', mfgPn:'W010-0922', desc:'price = sample (wtb.com shows a sale price, not MSRP)', verified:true, lastChecked:'2026-07-07', source:'https://www.wtb.com/products/vigilante-sg1' },
  /* Judge pinned to the TCS Tough config: the Light SG2 weight is listed TBD
     on wtb.com, so only the Tough config meets the weight bar. */
  { id:'ti-wtb-judge-29-24-sg1-tritec', cat:'tire', brand:'WTB', model:'Judge 29x2.4 TCS Tough SG1', family:'wtb-judge', disciplines:['enduro'], price:80, weight:1621, wheel:'29', width:2.4, casing:'tcs-tough-sg1', compound:'tritec', mfgPn:'W010-1065', desc:'price = sample (wtb.com shows a sale price, not MSRP)', verified:true, lastChecked:'2026-07-07', source:'https://www.wtb.com/products/judge-sg1' },
  { id:'ti-kenda-hellkat-29-24-aec-dl', cat:'tire', brand:'Kenda', model:'Hellkat 29x2.4 AEC', family:'kenda-hellkat', disciplines:['enduro'], price:65, weight:1075, wheel:'29', width:2.4, casing:'aec', compound:'dual-layer', mfgPn:'07785850', desc:'price = sample (kendatire.com lists no MSRP); weight = maker table 1075 +/- 54 g', verified:true, lastChecked:'2026-07-07', source:'https://bicycle.kendatire.com/en-eu/find-a-tire/bicycle/mtb/hellkat/' },
  /* Goodyear makes NO 29x2.4 Newton MTF (2.5 only, per the fetched maker
     table) - another fictional sample size, corrected with the pin. */
  { id:'ti-goodyear-newton-mtf-29-25-enduro-grip3s', cat:'tire', brand:'Goodyear', model:'Newton MTF 29x2.5 Enduro', family:'goodyear-newton-mtf', disciplines:['enduro'], price:75, weight:1280, wheel:'29', width:2.5, casing:'enduro', compound:'grip3s', mfgPn:'GR.015.64.622.V004.R', desc:'price = sample (goodyearbike.com shows one line price, not per-SKU MSRP); size corrected from fictional 29x2.4', verified:true, lastChecked:'2026-07-07', source:'https://goodyearbike.com/products/newton-mtf' },
  { id:'ti-michelin-dh22-29-24', cat:'tire', brand:'Michelin', model:'DH22 29x2.4', family:'michelin-dh22', disciplines:['enduro'], price:85, weight:1400, wheel:'29', width:2.4 },
  /* --- catalog-wheels-tires (2026-07-08): three new tire families - Maxxis Forekaster (trail) + Ikon (xc) SKU tables and the WTB Verdict (the Judge's DH-casing front-tread sibling), all fetched manufacturer SKU tables. --- */
  { id:'ti-maxxis-forekaster-275-24-exo-dual', cat:'tire', brand:'Maxxis', model:'Forekaster 27.5x2.4 EXO Dual', family:'maxxis-forekaster', mfgPn:'TB00477000', disciplines:['trail'], price:70, weight:840, wheel:'275', width:2.4, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/forekaster/', desc:'price = sample (page lists no MSRP); Part # TB00477000, 840g, 60tpi, EXO/TR, 61-584 - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-forekaster-29-24-exop-mt', cat:'tire', brand:'Maxxis', model:'Forekaster 29x2.4 EXO+ MaxxTerra', family:'maxxis-forekaster', mfgPn:'TB00698700', disciplines:['trail'], price:75, weight:997, wheel:'29', width:2.4, casing:'exo-plus', compound:'3c-maxxterra', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/forekaster/', desc:'price = sample (page lists no MSRP); Part # TB00698700, 997g, 120tpi, 3C MaxxTerra, EXO+/TR, 61-622 - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-forekaster-29-26-exo-mt', cat:'tire', brand:'Maxxis', model:'Forekaster 29x2.6 EXO MaxxTerra', family:'maxxis-forekaster', mfgPn:'TB00676700', disciplines:['trail'], price:80, weight:1010, wheel:'29', width:2.6, casing:'exo', compound:'3c-maxxterra', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/forekaster/', desc:'price = sample (page lists no MSRP); Part # TB00676700, 1010g, 120tpi, 3C MaxxTerra, EXO/TR, 66-622 - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-ikon-29-22-exo-dual', cat:'tire', brand:'Maxxis', model:'Ikon 29x2.2 EXO Dual', family:'maxxis-ikon', mfgPn:'TB00332900', disciplines:['xc'], price:65, weight:761, wheel:'29', width:2.2, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/ikon/', desc:'price = sample (page lists no MSRP); Part # TB00332900, 761g, 60tpi, Dual, EXO/TR, 57-622, Tan Wall - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-ikon-29-24-exo-ms', cat:'tire', brand:'Maxxis', model:'Ikon 29x2.4 EXO MaxxSpeed', family:'maxxis-ikon', mfgPn:'TB00502700', disciplines:['xc'], price:70, weight:835, wheel:'29', width:2.4, casing:'exo', compound:'maxxspeed', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/ikon/', desc:'price = sample (page lists no MSRP); Part # TB00502700, 835g, 120tpi, MaxxSpeed, EXO/TR, 61-622 - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-ikon-275-22-exo-ms', cat:'tire', brand:'Maxxis', model:'Ikon 27.5x2.2 EXO MaxxSpeed', family:'maxxis-ikon', mfgPn:'TB00465600', disciplines:['xc'], price:65, weight:680, wheel:'275', width:2.2, casing:'exo', compound:'maxxspeed', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/ikon/', desc:'price = sample (page lists no MSRP); Part # TB00465600, 680g, 120tpi, MaxxSpeed, EXO/TR, 56-584 - from the fetched maxxis.com SKU table' },
  { id:'ti-wtb-verdict-29-25-sg1-tritec', cat:'tire', brand:'WTB', model:'Verdict 29x2.5 TCS Tough/High Grip SG1', family:'wtb-verdict', mfgPn:'W010-1067', disciplines:['enduro'], price:80.95, weight:1346, wheel:'29', width:2.5, casing:'tcs-tough-sg1', compound:'tritec', verified:true, lastChecked:'2026-07-08', source:'https://www.wtb.com/products/verdict-sg1', desc:'front-focused gravity/enduro tread (the Judge\'s DH-casing sibling); 1346g, $80.95, Part # W010-1067, TCS Tough/High Grip + SG1, TriTec compound - all from the fetched wtb.com product page' },
  { id:'ti-wtb-verdict-275-25-sg1-tritec', cat:'tire', brand:'WTB', model:'Verdict 27.5x2.5 TCS Tough/High Grip SG1', family:'wtb-verdict', mfgPn:'W010-1082', disciplines:['enduro'], price:80.95, weight:1233, wheel:'275', width:2.5, casing:'tcs-tough-sg1', compound:'tritec', verified:true, lastChecked:'2026-07-08', source:'https://www.wtb.com/products/verdict-sg1', desc:'1233g, $80.95, Part # W010-1082, TCS Tough/High Grip + SG1, TriTec compound - all from the fetched wtb.com product page' },
  { id:'ti-schwalbe-nobby-nic-29-24-st-asg', cat:'tire', brand:'Schwalbe', model:'Nobby Nic 29x2.4 Super Trail ADDIX SpeedGrip', family:'schwalbe-nobby-nic', mfgPn:'11654142.01', disciplines:['trail'], price:102, weight:1045, wheel:'29', width:2.4, casing:'super-trail', compound:'addix-speedgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.schwalbetires.com/Nobby-Nic-11654142.01', desc:'weight = sample (~1045g per bikerumor.com\'s measured-weight report on this exact SKU; the schwalbetires.com SKU page itself lists no weight); 62-622, Super Trail, ADDIX SpeedGrip, TLE Folding, $102 RRP, article # from the fetched schwalbetires.com SKU page' },
  /* --- continental-tires.com serves no SKU table for Xynotal (JS-rendered, same wall as the rest of the line) - the FETCHED biketiresdirect.com listing carries part numbers/weights/prices for two casing tiers, both landing on EXISTING Continental casing/compound vocab values (no widening needed). --- */
  { id:'ti-continental-xynotal-29-24-trail-endurance', cat:'tire', brand:'Continental', model:'Xynotal 29x2.4 Trail Endurance', family:'continental-xynotal', mfgPn:'1506470000', disciplines:['trail'], price:82.95, weight:1040, wheel:'29', width:2.4, casing:'trail', compound:'endurance', source:'https://www.biketiresdirect.com/product/continental-xynotal-29-inch-mtb-tire?v=DHCSOFT', desc:'unverified (retailer source, not manufacturer - continental-tires.com Xynotal page is JS-rendered with no SKU table, same wall as Kryptotal/Argotal/Cross King); Trail casing/Endurance compound/1040g/$82.95/Part #1506470000 all from the FETCHED biketiresdirect.com listing (interface values fall on existing Continental vocab - not fabricated)' },
  { id:'ti-continental-xynotal-29-24-enduro-soft', cat:'tire', brand:'Continental', model:'Xynotal 29x2.4 Enduro Soft', family:'continental-xynotal', mfgPn:'1019980000', disciplines:['enduro'], price:106.95, weight:1125, wheel:'29', width:2.4, casing:'enduro', compound:'soft', source:'https://www.biketiresdirect.com/product/continental-xynotal-29-inch-mtb-tire?v=DHCSOFT', desc:'unverified (retailer source, not manufacturer); Enduro casing/Soft compound/1125g/$106.95/Part #1019980000 from the FETCHED biketiresdirect.com listing (the same page\'s Downhill/Soft SKU lists no weight - skipped rather than guessed)' },
  { id:'ti-wtb-trailboss-29-24-sg2-tritec', cat:'tire', brand:'WTB', model:'Trail Boss 29x2.4 TCS Light SG2', family:'wtb-trailboss', mfgPn:'W010-0968', disciplines:['trail'], price:75, weight:972, wheel:'29', width:2.4, casing:'tcs-light-sg2', compound:'tritec', verified:true, lastChecked:'2026-07-08', source:'https://www.wtb.com/products/trail-boss-2-4-2-6', desc:'price = sample (page shows a $76.95 SALE price on a sold-out listing, not MSRP); single-ply 60tpi + SG2 (matches the existing Vigilante casing tier), TriTec, 972g, Part # W010-0968 - from the fetched wtb.com product page' },
  /* --- catalog-wheels-tires batch 3 (2026-07-08): Maxxis Rekon (trail; only plain EXO/Dual/3C MaxxTerra SKUs picked to stay on existing vocab - the page's 3C MaxxSpeed and single-compound MaxxTerra rows would need a vocab widen, skipped) + Schwalbe Wicked Will (the catalog's first XC-race tire on Super Race/ADDIX SpeedGrip - same vocab as the Racing Ralph/Ray pair). --- */
  { id:'ti-maxxis-rekon-275-24-exo-mt', cat:'tire', brand:'Maxxis', model:'Rekon 27.5x2.4 EXO 3C MaxxTerra', family:'maxxis-rekon', mfgPn:'TB00017400', disciplines:['trail'], price:75, weight:834, wheel:'275', width:2.4, casing:'exo', compound:'3c-maxxterra', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/rekon/', desc:'price = sample (page lists no MSRP); Part # TB00017400, 834g, 60tpi, 3C MaxxTerra, EXO/TR - from the fetched maxxis.com SKU table (a plain single-compound "MaxxTerra" sibling also exists but needs a vocab widen - skipped)' },
  { id:'ti-maxxis-rekon-29-24-exo-dual', cat:'tire', brand:'Maxxis', model:'Rekon 29x2.4 EXO Dual', family:'maxxis-rekon', mfgPn:'TB00219600', disciplines:['trail'], price:75, weight:875, wheel:'29', width:2.4, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/rekon/', desc:'price = sample (page lists no MSRP); Part # TB00219600, 875g, 60tpi, Dual, EXO/TR, Tan Wall - from the fetched maxxis.com SKU table' },
  { id:'ti-maxxis-rekon-29-28-exo-dual', cat:'tire', brand:'Maxxis', model:'Rekon 29x2.8 EXO Dual', family:'maxxis-rekon', mfgPn:'TB00038600', disciplines:['trail'], price:85, weight:1089, wheel:'29', width:2.8, casing:'exo', compound:'dual', verified:true, lastChecked:'2026-07-08', source:'https://www.maxxis.com/us/tire/rekon/', desc:'price = sample (page lists no MSRP); Part # TB00038600, 1089g, 60tpi, Dual, EXO/TR - from the fetched maxxis.com SKU table; the catalog\'s first 2.8in-width tire (plus-size)' },
  { id:'ti-schwalbe-wicked-will-29-24-sr-asg', cat:'tire', brand:'Schwalbe', model:'Wicked Will 29x2.4 Super Race ADDIX SpeedGrip', family:'schwalbe-wicked-will', mfgPn:'11654305', disciplines:['xc'], price:102, weight:820, wheel:'29', width:2.4, casing:'super-race', compound:'addix-speedgrip', verified:true, lastChecked:'2026-07-08', source:'https://www.schwalbetires.com/wicked-will-11654305', desc:'weight = sample (820g claimed-spec figure; independent reviewer measurements cluster 814-844g; the schwalbetires.com SKU page itself lists no weight); 62-622, Super Race, ADDIX SpeedGrip, TLE Folding, $102 RRP, article # from the fetched schwalbetires.com SKU page; Schwalbe\'s fastest-rolling XC race tread' },

  /* DRIVETRAIN COMPONENTS */
  { id:'sft-sram-gx-transmission', cat:'shifter', brand:'SRAM', model:'GX Transmission Pod', family:'sram-gx-transmission', price:150, weight:70, system:'sram-transmission', speeds:12, actuation:'electronic', clampType:'pod' },
  { id:'sft-sram-gx-eagle', cat:'shifter', brand:'SRAM', model:'GX Eagle Trigger', family:'sram-gx-eagle', gen:'A2', mfgPn:'SL-GX-1-A2', price:45, weight:122, system:'sram-eagle', speeds:12, actuation:'cable', verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/sl-gx-1-a2' },
  { id:'sft-shimano-xt-m8100', cat:'shifter', brand:'Shimano', model:'XT M8100 I-Spec', family:'shimano-xt-m8100', price:55, weight:115, system:'shimano-12', speeds:12, actuation:'cable', clampType:'ispec-ev' },
  { id:'sft-shimano-slx-m7100', cat:'shifter', brand:'Shimano', model:'SLX M7100', family:'shimano-slx-m7100', price:40, weight:120, system:'shimano-12', speeds:12, actuation:'cable' },
  { id:'sft-sram-x0-transmission', cat:'shifter', brand:'SRAM', model:'X0 Transmission Pod', family:'sram-x0-transmission', price:175, weight:75, system:'sram-transmission', speeds:12, actuation:'electronic', clampType:'pod' },
  { id:'sft-sram-xx-sl-transmission', cat:'shifter', brand:'SRAM', model:'XX SL Transmission Pod', family:'sram-xx-sl-transmission', price:200, weight:70, system:'sram-transmission', speeds:12, actuation:'electronic', clampType:'pod' },
  { id:'sft-sram-nx-eagle', cat:'shifter', brand:'SRAM', model:'NX Eagle Trigger', family:'sram-nx-eagle', gen:'B1', mfgPn:'SL-NX-1-B1', price:50, weight:112, system:'sram-eagle', speeds:12, actuation:'cable', verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/sram/models/sl-nx-1-b1' },
  { id:'sft-shimano-xtr-m9100', cat:'shifter', brand:'Shimano', model:'XTR M9100', family:'shimano-xtr-m9100', price:130, weight:110, system:'shimano-12', speeds:12, actuation:'cable' },
  { id:'sft-shimano-deore-m6100', cat:'shifter', brand:'Shimano', model:'Deore M6100', family:'shimano-deore-m6100', price:30, weight:125, system:'shimano-12', speeds:12, actuation:'cable' },
  { id:'sft-sram-gx-eagle-axs', cat:'shifter', brand:'SRAM', model:'GX Eagle AXS Controller', family:'sram-gx-eagle-axs', price:150, weight:90, system:'sram-eagle', speeds:12, actuation:'electronic', clampType:'pod' },
  { id:'dr-sram-gx-transmission', cat:'derailleur', brand:'SRAM', model:'GX Transmission', family:'sram-gx-transmission', gen:'B1', mfgPn:'RD-GX-E-B1', price:400, weight:470, system:'sram-transmission', speeds:12, actuation:'electronic', maxCog:52, mount:'udh-direct', soldWithout:['battery'], verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/rd-gx-e-b1' },
  { id:'dr-sram-gx-eagle', cat:'derailleur', brand:'SRAM', model:'GX Eagle', family:'sram-gx-eagle', gen:'B2', mfgPn:'RD-GX-1-B2', price:135, weight:290, system:'sram-eagle', speeds:12, actuation:'cable', maxCog:52, mount:'hanger', verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/rd-gx-1-b2' },
  { id:'dr-shimano-xt-m8100-sgs', cat:'derailleur', brand:'Shimano', model:'XT M8100 SGS', family:'shimano-xt-m8100', price:120, weight:284, system:'shimano-12', speeds:12, actuation:'cable', maxCog:51, mount:'hanger' },
  { id:'dr-shimano-slx-m7100-sgs', cat:'derailleur', brand:'Shimano', model:'SLX M7100 SGS', family:'shimano-slx-m7100', price:90, weight:318, system:'shimano-12', speeds:12, actuation:'cable', maxCog:51, mount:'hanger' },
  { id:'dr-sram-x0-transmission', cat:'derailleur', brand:'SRAM', model:'X0 Eagle Transmission', family:'sram-x0-transmission', gen:'B1', mfgPn:'RD-X0-E-B1', price:605, weight:466, system:'sram-transmission', speeds:12, actuation:'electronic', maxCog:52, mount:'udh-direct', verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/sram/models/rd-x0-e-b1' },
  { id:'dr-sram-xx-transmission', cat:'derailleur', brand:'SRAM', model:'XX Eagle Transmission', family:'sram-xx-transmission', gen:'B1', mfgPn:'RD-XX-E-B1', price:715, weight:450, system:'sram-transmission', speeds:12, actuation:'electronic', maxCog:52, mount:'udh-direct', verified:true, lastChecked:'2026-07-06', source:'https://www.sram.com/en/sram/models/rd-xx-e-b1' },
  { id:'dr-sram-nx-eagle', cat:'derailleur', brand:'SRAM', model:'NX Eagle', family:'sram-nx-eagle', gen:'B1', mfgPn:'RD-NX-1-B1', price:125, weight:339, system:'sram-eagle', speeds:12, actuation:'cable', maxCog:50, mount:'hanger', verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/sram/models/rd-nx-1-b1' },
  { id:'dr-sram-x01-eagle', cat:'derailleur', brand:'SRAM', model:'X01 Eagle', family:'sram-x01-eagle', price:235, weight:276, system:'sram-eagle', speeds:12, actuation:'cable', maxCog:52, mount:'hanger', verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/sram/models/rd-x0-1-b2', sourceType:'measured', weightSource:'https://bikerumor.com/sram-xx1-x01-eagle-specs-actual-weights/' },
  { id:'dr-shimano-xtr-m9100-sgs', cat:'derailleur', brand:'Shimano', model:'XTR M9100 SGS', family:'shimano-xtr-m9100', price:290, weight:241, system:'shimano-12', speeds:12, actuation:'cable', maxCog:51, mount:'hanger' },
  { id:'dr-shimano-deore-m6100-sgs', cat:'derailleur', brand:'Shimano', model:'Deore M6100 SGS', family:'shimano-deore-m6100', price:60, weight:322, system:'shimano-12', speeds:12, actuation:'cable', maxCog:51, mount:'hanger' },
  { id:'dr-sram-gx-eagle-axs', cat:'derailleur', brand:'SRAM', model:'GX Eagle AXS', family:'sram-gx-eagle-axs', price:430, weight:438, system:'sram-eagle', speeds:12, actuation:'electronic', maxCog:52, mount:'hanger', soldWithout:['battery'], verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/sram/models/rd-gx-1e-a1', sourceType:'measured', weightSource:'https://bikerumor.com/sram-gx-eagle-axs-review-first-rides-drop-bar-builds-actual-weights/' },
  { id:'ca-sram-xs1275', cat:'cassette', brand:'SRAM', model:'XS-1275 Transmission 10-52', family:'sram-xs1275', gen:'A1', mfgPn:'CS-XS-1275-A1', price:275, weight:445, system:'sram-transmission', speeds:12, freehub:'XD', minCog:10, maxCog:52, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/cs-xs-1275-a1', desc:'price corrected 2026-07-08 $380->$275 (drift re-verify): sram.com model page now shows "$275" US MSRP (weight 445g/12-spd/10-52 unchanged)' },
  { id:'ca-sram-xg1275', cat:'cassette', brand:'SRAM', model:'XG-1275 Eagle 10-52', family:'sram-xg1275', gen:'B1', mfgPn:'CS-XG-1275-B1', price:215, weight:450, system:'sram-eagle', speeds:12, freehub:'XD', minCog:10, maxCog:52, verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/cs-xg-1275-b1' },
  { id:'ca-shimano-xt-m8100-1051', cat:'cassette', brand:'Shimano', model:'CS-M8100 10-51', family:'shimano-xt-m8100', mfgPn:'CS-M8100-12', price:185, weight:470, system:'shimano-12', speeds:12, freehub:'MicroSpline', minCog:10, maxCog:51, verified:true, lastChecked:'2026-06-22', source:'https://bike.shimano.com/en-US/product/component/deore-xt-m8100/CS-M8100-12.html' },
  { id:'ca-shimano-slx-m7100-1051', cat:'cassette', brand:'Shimano', model:'CS-M7100 10-51', family:'shimano-slx-m7100', price:130, weight:534, system:'shimano-12', speeds:12, freehub:'MicroSpline', minCog:10, maxCog:51 },
  { id:'ca-sram-xs1299', cat:'cassette', brand:'SRAM', model:'XS-1299 Transmission 10-52', family:'sram-xs1299', gen:'A1', mfgPn:'CS-XS-1299-A1', price:660, weight:350, system:'sram-transmission', speeds:12, freehub:'XD', minCog:10, maxCog:52, verified:true, lastChecked:'2026-07-06', source:'https://www.sram.com/en/sram/models/cs-xs-1299-a1' },
  { id:'ca-sram-xg1295', cat:'cassette', brand:'SRAM', model:'XG-1295 X01 Eagle 10-52', family:'sram-xg1295', gen:'B1', mfgPn:'CS-XG-1295-B1', price:455, weight:350, system:'sram-eagle', speeds:12, freehub:'XD', minCog:10, maxCog:52, verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/sram/models/cs-xg-1295-b1' },
  { id:'ca-sram-pg1230', cat:'cassette', brand:'SRAM', model:'PG-1230 NX Eagle 11-50', family:'sram-pg1230', gen:'A1', mfgPn:'CS-PG-1230-A1', price:120, weight:615, system:'sram-eagle', speeds:12, freehub:'HG', minCog:11, maxCog:50, verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/sram/models/cs-pg-1230-a1' },
  { id:'ca-shimano-xtr-m9100-1051', cat:'cassette', brand:'Shimano', model:'CS-M9100 10-51', family:'shimano-xtr-m9100', price:380, weight:367, system:'shimano-12', speeds:12, freehub:'MicroSpline', minCog:10, maxCog:51 },
  { id:'ca-shimano-deore-m6100-1051', cat:'cassette', brand:'Shimano', model:'CS-M6100 10-51', family:'shimano-deore-m6100', price:70, weight:593, system:'shimano-12', speeds:12, freehub:'MicroSpline', minCog:10, maxCog:51 },
  { id:'ch-sram-gx-flattop', cat:'chain', brand:'SRAM', model:'Flattop (Transmission)', family:'sram-gx-flattop', gen:'A1', mfgPn:'CN-TTYP-GX-A1', price:45, weight:285, system:'sram-transmission', speeds:12, verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/cn-ttyp-gx-a1' },
  { id:'ch-sram-gx-eagle', cat:'chain', brand:'SRAM', model:'GX Eagle 12-speed', family:'sram-gx-eagle', gen:'A1', mfgPn:'CN-EAGL-GX-A1', price:30, weight:244, system:'sram-eagle', speeds:12, verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/cn-eagl-gx-a1' },
  { id:'ch-shimano-xt-m8100', cat:'chain', brand:'Shimano', model:'CN-M8100 12-speed', family:'shimano-xt-m8100', price:35, weight:252, system:'shimano-12', speeds:12 },
  { id:'ch-sram-x01-eagle', cat:'chain', brand:'SRAM', model:'X01 Eagle 12-speed', family:'sram-x01-eagle', gen:'A1', mfgPn:'CN-EAGL-X01-A1', price:75, weight:239, system:'sram-eagle', speeds:12, verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/sram/models/cn-eagl-x01-a1' },
  { id:'ch-shimano-xtr-m9100', cat:'chain', brand:'Shimano', model:'CN-M9100 12-speed', family:'shimano-xtr-m9100', price:50, weight:242, system:'shimano-12', speeds:12 },
  { id:'ch-shimano-deore-m6100', cat:'chain', brand:'Shimano', model:'CN-M6100 12-speed', family:'shimano-deore-m6100', price:25, weight:266, system:'shimano-12', speeds:12 },
  { id:'cr-sram-gx-eagle', cat:'crankset', brand:'SRAM', model:'GX Eagle DUB', family:'sram-gx-eagle', gen:'B1', mfgPn:'FC-GX-1-B1', price:175, weight:621, bb:'DUB', ring:32, ringStd:'standard-12', speeds:12, chainline:52, verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/fc-gx-1-b1' },
  { id:'cr-sram-x0-transmission', cat:'crankset', brand:'SRAM', model:'X0 Transmission DUB', family:'sram-x0-transmission', gen:'D1', mfgPn:'FC-X0-D1', price:330, weight:685, bb:'DUB', ring:32, ringStd:'t-type', speeds:12, chainline:55, verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/fc-x0-d1' },
  { id:'cr-shimano-xt-m8100', cat:'crankset', brand:'Shimano', model:'XT M8100', family:'shimano-xt-m8100', price:200, weight:624, bb:'24mm', ring:32, ringStd:'standard-12', speeds:12, chainline:52 },
  { id:'cr-raceface-aeffect-r', cat:'crankset', brand:'Race Face', model:'Aeffect R', family:'raceface-aeffect-r', price:149, weight:632, bb:'24mm', ring:32, ringStd:'standard-12', speeds:12, chainline:52, verified:true, lastChecked:'2026-07-07', source:'https://www.raceface.com/products/aeffect-r-crankset' },
  { id:'cr-sram-x01-eagle', cat:'crankset', brand:'SRAM', model:'X01 Eagle DUB', family:'sram-x01-eagle', price:415, weight:615, bb:'DUB', ring:32, ringStd:'standard-12', speeds:12, chainline:52 },
  { id:'cr-shimano-slx-m7100', cat:'crankset', brand:'Shimano', model:'SLX M7100', family:'shimano-slx-m7100', price:130, weight:645, bb:'24mm', ring:32, ringStd:'standard-12', speeds:12, chainline:52 },
  { id:'cr-sram-xx-sl-transmission', cat:'crankset', brand:'SRAM', model:'XX SL Transmission DUB', family:'sram-xx-sl-transmission', price:500, weight:600, bb:'DUB', ring:32, ringStd:'t-type', speeds:12, chainline:55 },
  { id:'cr-sram-nx-eagle', cat:'crankset', brand:'SRAM', model:'NX Eagle DUB', family:'sram-nx-eagle', gen:'C1', mfgPn:'FC-NX-1-C1', price:125, weight:638, bb:'DUB', ring:32, ringStd:'standard-12', speeds:12, chainline:52, verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/sram/models/fc-nx-1-c1' },
  { id:'cr-shimano-xtr-m9100', cat:'crankset', brand:'Shimano', model:'XTR M9100', family:'shimano-xtr-m9100', price:400, weight:530, bb:'24mm', ring:32, ringStd:'standard-12', speeds:12, chainline:52 },
  { id:'cr-shimano-deore-m6100', cat:'crankset', brand:'Shimano', model:'Deore M6100', family:'shimano-deore-m6100', price:75, weight:685, bb:'24mm', ring:30, ringStd:'standard-12', speeds:12, chainline:52 },
  /* --- 2026-07-08: cr-ethirteen-plus RETIRED to ALIASES - the verify-job flagged "e13 Plus" as matching
     no current e*thirteen pedal crank (a data-entry mismatch, not just an unsourced part: the only current
     "Plus"-named e13 product is e*spec Plus, an e-bike MOTOR-INTERFACE crank arm with no chainring of its
     own). Replaced with the real, current TRS Race Carbon Gen4 (fetched ethirteen.com same day). --- */
  { id:'cr-ethirteen-trs-race-carbon', cat:'crankset', brand:'e*thirteen', model:'TRS Race Carbon Cranks (Gen4)', family:'ethirteen-trs-race', gen:'Gen4', mfgPn:'CS4TRA-107', price:439.95, weight:420, bb:'p3', ringStd:null, speeds:12, verified:true, lastChecked:'2026-07-08', source:'https://www.ethirteen.com/products/trs-race-carbon-cranks-gen4', desc:'170mm arm length, 420g - the FETCHED ethirteen.com product page lists per-length weights (165mm 418g / 170mm 420g / 175mm 425g); this schema has no crank-length field so one representative length is cataloged, matching how other multi-length cranksets in this catalog are handled. 73mm BB shell, 30mm aluminum spindle via the e13 "P3 Connect" interface (kept as bb:p3, not 30mm, since it needs e13-specific BB cups - same distinction the schema vocab already draws). Chainring sold separately (ringStd:null, no ring field); Non-Boost/Boost/SuperBoost chainline via spacers, so no single chainline number is stored. Price = the ethirteen.com-stated regular/list price ($439.95); the page was showing a $131.99 site sale at fetch time.' },
  { id:'cr-canecreek-eewings-allmountain', cat:'crankset', brand:'Cane Creek', model:'eeWings AllMountain', family:'canecreek-eewings', price:1250, weight:398, bb:'30mm', ringStd:null, speeds:12, chainline:52, verified:true, lastChecked:'2026-07-07', source:'https://www.canecreek.com/products/eewings' },
  /* --- discipline expansion, SRAM/RockShox sweep: the X01 DH 7-speed group.
     All model codes + prices from the fetched sram.com X01 DH series page
     (SL-X0-DH-A2 / RD-X0-1DH-A3 / CS-XG-795-A1 / FC-X0-1DH-B1). The chain is
     the schema.js sram-dh-7 token decision in action: SRAM's own XG-795 page
     says "compatible with all SRAM 11-speed chains", so the PC-XX1 row carries
     system:'sram-dh-7'/speeds:7 as compatibility tokens with the physical
     truth in desc. --- */
  { id:'sft-sram-x01-dh', cat:'shifter', brand:'SRAM', model:'X01 DH Trigger (7s)', family:'sram-x01-dh', gen:'A2', mfgPn:'SL-X0-DH-A2', disciplines:['dh'], price:165, weight:120, system:'sram-dh-7', speeds:7, actuation:'cable', clampType:'matchmaker', desc:'price + code from fetched sram.com model page sl-x0-dh-a2 (discrete clamp, MatchMaker X compatible); weight = sample (page lists none)' },
  { id:'dr-sram-x01-dh', cat:'derailleur', brand:'SRAM', model:'X01 DH X-Horizon (7s)', family:'sram-x01-dh', gen:'A3', mfgPn:'RD-X0-1DH-A3', disciplines:['dh'], price:300, weight:240, system:'sram-dh-7', speeds:7, actuation:'cable', maxCog:25, mount:'hanger', desc:'price + code + speeds 7 + Max Cog 25T from the fetched sram.com model page rd-x0-1dh-a3; maxCog CORRECTED 24->25 per maker (still >= the 24T XG-795 cassette, no fit change). weight = sample (page lists none; SRAM does not publish a DH-group derailleur weight)' },
  { id:'ca-sram-xg795', cat:'cassette', brand:'SRAM', model:'XG-795 Mini Block 10-24', family:'sram-xg795', gen:'A1', mfgPn:'CS-XG-795-A1', disciplines:['dh'], price:335, weight:136, system:'sram-dh-7', speeds:7, freehub:'XD', minCog:10, maxCog:24, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/cs-xg-795-a1', desc:'10-12-14-16-18-21-24T X-Dome; XD driver; page states compatibility with all SRAM 11-speed chains' },
  { id:'ch-sram-pc-xx1', cat:'chain', brand:'SRAM', model:'PC-XX1 Hard Chrome (DH group)', family:'sram-pc-xx1', disciplines:['dh'], price:60, weight:258, system:'sram-dh-7', speeds:7, desc:'PHYSICALLY an 11-speed chain - SRAM specs its 11s chains for the 7s DH group (XG-795 page: "compatible with all SRAM 11-speed chains"); system/speeds here are compatibility tokens per the schema.js sram-dh-7 decision. Existence: sram.com cn-x-1-a1 sibling + Jenson/REI PC-XX1 listings. Sample price/weight' },
  { id:'cr-sram-x01-dh', cat:'crankset', brand:'SRAM', model:'X01 DH DUB (7s)', family:'sram-x01-dh', gen:'B1', mfgPn:'FC-X0-1DH-B1', disciplines:['dh'], price:415, weight:650, bb:'DUB', ring:34, ringStd:'standard-12', speeds:7, chainline:56.5, desc:'price + code + DUB spindle + 32/34/36T rings + chainline options 49/52/56.5mm from the fetched sram.com model page fc-x0-1dh-b1 (DH DUB BB widths 83/104.5/107); chainline CORRECTED 55->56.5 (the DH 83mm BSA config; display-only); weight = sample (page states only "under 800 g", no exact figure); ringStd standard-12 = the generic non-T-Type 1x ring token' },
  /* --- catalog-drivetrain pass (2026-07-08): SRAM's cable-actuated T-Type tiers, Eagle 90 Transmission and
     Eagle 70 Transmission - the mechanical/budget counterparts to the AXS GX/X0/XX Transmission rows already
     in the catalog. Every model code, price and weight below is from its own fetched sram.com model page
     (system:'sram-transmission' + actuation:'cable' + mount:'udh-direct' is the exact trap this project's
     own DATA-ENTRY-TEMPLATE.md already called out for this product family). Eagle 90 shares the GX
     Transmission cassette (CS-XS-1275-A1) and chain (CN-TTYP-GX-A1) per SRAM's own collection page; Eagle 70
     gets its own cassette and chain. --- */
  { id:'sft-sram-eagle90-transmission', cat:'shifter', brand:'SRAM', model:'Eagle 90 Transmission Shifter', family:'sram-eagle90-transmission', gen:'A1', mfgPn:'SL-90-A1', price:55, weight:135, system:'sram-transmission', speeds:12, actuation:'cable', verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/sl-90-a1', desc:'weight is sram.coms own "engineering estimate with cable" figure (the page states this explicitly - a manufacturer-published estimate, not a third-party measurement, so sourceType stays default/absent)' },
  { id:'dr-sram-eagle90-transmission', cat:'derailleur', brand:'SRAM', model:'Eagle 90 Transmission', family:'sram-eagle90-transmission', gen:'A1', mfgPn:'RD-90-A1', price:210, weight:395, system:'sram-transmission', speeds:12, actuation:'cable', maxCog:52, mount:'udh-direct', verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/rd-90-a1', desc:'"Full Mount" per sram.com = this catalogs udh-direct mount token (same mapping already used for GX/X0/XX Transmission); weight is sram.coms own engineering-estimate figure' },
  { id:'cr-sram-eagle90-transmission', cat:'crankset', brand:'SRAM', model:'Eagle 90 Transmission DUB', family:'sram-eagle90-transmission', gen:'A1', mfgPn:'FC-90-A1', price:170, weight:825, bb:'DUB', ring:32, ringStd:'t-type', speeds:12, chainline:55, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/fc-90-a1', desc:'sram.com spec table: "Weight Based On: Engineering Estimate 170/32TST/2G/DUB wide (-70g/AL, -41g/1G)" - 825g is the STEEL 32T 2x-guard config; an aluminum ring is ~70g lighter, single-guard ~41g lighter (not separately stored). Also sold in 155-175mm lengths (5mm steps) and 30/34T rings - one representative length/ring config is cataloged, matching how other multi-length cranksets in this catalog are handled.' },
  { id:'sft-sram-eagle70-transmission', cat:'shifter', brand:'SRAM', model:'Eagle 70 Transmission Shifter', family:'sram-eagle70-transmission', gen:'A1', mfgPn:'SL-70-A1', price:35, weight:145, system:'sram-transmission', speeds:12, actuation:'cable', verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/sl-70-a1', desc:'weight is sram.coms own engineering-estimate figure for the integrated-clamp cable version (a lighter MatchMaker-compatible variant exists per the same page, not separately cataloged)' },
  { id:'dr-sram-eagle70-transmission', cat:'derailleur', brand:'SRAM', model:'Eagle 70 Transmission', family:'sram-eagle70-transmission', gen:'A1', mfgPn:'RD-70-A1', price:140, weight:415, system:'sram-transmission', speeds:12, actuation:'cable', maxCog:52, mount:'udh-direct', verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/rd-70-a1', desc:'"Full Mount" per sram.com = udh-direct (same mapping as the rest of the Transmission family)' },
  { id:'cr-sram-eagle70-transmission', cat:'crankset', brand:'SRAM', model:'Eagle 70 Transmission DUB', family:'sram-eagle70-transmission', gen:'A1', mfgPn:'FC-70-A1', price:100, weight:895, bb:'DUB', ring:32, ringStd:'t-type', speeds:12, chainline:55, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/fc-70-a1', desc:'sram.com spec table: "Weight Based On: Engineering Estimate 170/32TST/2G/DUB wide (-41g/1G)" - steel-only tier (no aluminum ring option, unlike Eagle 90); also sold in 155-175mm lengths and a 30T ring - one representative config is cataloged.' },
  { id:'ch-sram-eagle70-flattop', cat:'chain', brand:'SRAM', model:'Eagle 70 Transmission Flattop', family:'sram-eagle70-flattop', gen:'A1', mfgPn:'CN-TTYP-70-A1', price:40, weight:270, system:'sram-transmission', speeds:12, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/cn-ttyp-70-a1', desc:'270g is sram.coms own "Weight Based On Engineering Estimate 114 Links" basis figure; sold pre-cut at 126 or 128 links (trim to fit) - not a contradiction, just a different weight-test basis than the as-sold length' },
  { id:'ca-sram-xs1270', cat:'cassette', brand:'SRAM', model:'XS-1270 Eagle Transmission 10-52', family:'sram-xs1270', gen:'A1', mfgPn:'CS-XS-1270-A1', price:235, weight:565, system:'sram-transmission', speeds:12, freehub:'HG', minCog:10, maxCog:52, verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/cs-xs-1270-a1', desc:'notable exception, confirmed on sram.coms own model page (fetched twice to be sure): "Splined 8, 9, 10 Speed driver body compatible" with a full 10-52t range - SRAM integrates the 10T cog+lockring into the driver interface itself, the first cassette to put a 10T cog on a standard HG-style splined body (an 11-speed HG body needs a 1.85mm spacer). NOT an XD cassette despite the "XS" naming. schema.js carries a narrow mfgPn-scoped exception to its usual HG-floor-is-11T validator rule for this exact SKU.' },

  /* BRAKES (single caliper+lever; usable front or rear) */
  /* --- discipline expansion pass 2: the first flat-mount brake (XC) --- */
  { id:'bk-shimano-xtr-m9110-fm', cat:'brake', brand:'Shimano', model:'XTR BR-M9110 (flat mount)', family:'shimano-xtr-m9100', mfgPn:'BR-M9110', disciplines:['xc'], price:300, weight:220, mount:'FM', pistons:2, leverAccepts:['ispec-ev'], desc:'sample price/weight (per-brake, lever+caliper basis); existence confirmed via bike.shimano.com product listing (BR-M9110 flat-mount 2-piston, 140/160 rotors) + Bike24/Competitive Cyclist; sold as I-Spec EV lever + FM caliper J-kit' },
  /* --- discipline expansion pass 8: second XC brake brand (the XC PM choice was Shimano-only) --- */
  { id:'bk-sram-level-ultimate-stealth', cat:'brake', brand:'SRAM', model:'Level Ultimate Stealth (2-piston)', family:'sram-level', gen:'C1', mfgPn:'DB-LVL-ULT2-C1', disciplines:['xc'], price:285, weight:254, mount:'PM', pistons:2, leverAccepts:['matchmaker'], verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/sram/models/db-lvl-ult2-c1', desc:'price = sample (page lists a range, ~$285/wheel street); 254g = the maker-published figure (rear, with pads, no hardware - basis noted per template); PM caliper brackets + 2-piston from the fetched sram.com model page; MatchMaker = SRAM Stealth-lever family standard (page defers to service docs)' },
  { id:'bk-sram-code-rsc', cat:'brake', brand:'SRAM', model:'Code RSC', family:'sram-code', price:140, weight:290, mount:'PM', pistons:4, leverAccepts:['matchmaker'] },
  { id:'bk-sram-code-stealth', cat:'brake', brand:'SRAM', model:'Code Silver Stealth', family:'sram-code', price:150, weight:290, mount:'PM', pistons:4, leverAccepts:['matchmaker'] },
  { id:'bk-shimano-xt-m8120', cat:'brake', brand:'Shimano', model:'XT M8120 4-piston', family:'shimano-xt-m8120', price:150, weight:295, mount:'PM', pistons:4, leverAccepts:['ispec-ev'] },
  { id:'bk-hayes-dominion-a4', cat:'brake', brand:'Hayes', model:'Dominion A4', family:'hayes-dominion', price:250, weight:310, mount:'PM', pistons:4, leverAccepts:['ispec-ev','ispec-ii','matchmaker'], verified:true, lastChecked:'2026-07-07', source:'https://hayesbicycle.com/products/dominion-a4-brake-kit' },
  { id:'bk-magura-mt7', cat:'brake', brand:'Magura', model:'MT7', family:'magura-mt7', price:160, weight:255, mount:'PM', pistons:4, verified:true, lastChecked:'2026-07-07', source:'https://magura.com/product/mt7-pro/' },
  { id:'bk-shimano-slx-m7120', cat:'brake', brand:'Shimano', model:'SLX M7120 4-piston', family:'shimano-slx-m7120', price:100, weight:305, mount:'PM', pistons:4, leverAccepts:['ispec-ev'] },
  { id:'bk-sram-maven-ultimate', cat:'brake', brand:'SRAM', model:'Maven Ultimate', family:'sram-maven', price:260, weight:362, desc:'362 g = rear brake, organic pads, no rotor (SRAM figure)', mount:'PM', pistons:4, leverAccepts:['matchmaker'], verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/sram/models/db-mvn-ult-a1' },
  { id:'bk-hope-tech-4-v4', cat:'brake', brand:'Hope', model:'Tech 4 V4', family:'hope-tech-4', price:210, weight:300, mount:'PM', pistons:4 },
  { id:'bk-trp-dhr-evo', cat:'brake', brand:'TRP', model:'DH-R EVO', family:'trp-dhr-evo', price:297, weight:310, desc:'310 g front, without rotor and adapter (TRP figure)', mount:'PM', pistons:4, verified:true, lastChecked:'2026-07-07', source:'https://trpcycling.com/products/dh-r-evo' },
  { id:'bk-formula-cura-4', cat:'brake', brand:'Formula', model:'Cura 4', family:'formula-cura', price:180, weight:379, desc:'379 g with 85cm hose, 160mm rotor and mounting hardware (Formula figure)', mount:'PM', pistons:4, verified:true, lastChecked:'2026-07-07', source:'https://www.rideformula.com/products/mtb-brakes/cura4/' },
  { id:'bk-shimano-saint-m820', cat:'brake', brand:'Shimano', model:'Saint M820', family:'shimano-saint-m820', price:190, weight:340, mount:'PM', pistons:4, leverAccepts:['ispec-b'] },
  { id:'bk-shimano-xtr-m9120', cat:'brake', brand:'Shimano', model:'XTR M9120 4-piston', family:'shimano-xtr-m9120', price:250, weight:270, mount:'PM', pistons:4, leverAccepts:['ispec-ev'] },
  { id:'bk-shimano-zee-m640', cat:'brake', brand:'Shimano', model:'Zee M640', family:'shimano-zee-m640', price:110, weight:320, mount:'PM', pistons:4, leverAccepts:['ispec-b'] },
  { id:'bk-magura-mt5', cat:'brake', brand:'Magura', model:'MT5', family:'magura-mt5', price:113, weight:255, mount:'PM', pistons:4, verified:true, lastChecked:'2026-07-07', source:'https://magura.com/product/mt5/' },
  { id:'bk-sram-g2-rsc', cat:'brake', brand:'SRAM', model:'G2 RSC', family:'sram-g2', price:160, weight:248, desc:'248 g direct mount, 800mm hose, no clamp/mounting hardware (SRAM figure)', mount:'PM', pistons:4, leverAccepts:['matchmaker'], verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/service/models/db-g2-rsc-a2' },
  { id:'bk-hope-tech-4-e4', cat:'brake', brand:'Hope', model:'Tech 4 E4', family:'hope-tech-4', price:200, weight:280, mount:'PM', pistons:4 },
  { id:'bk-trp-trail-evo', cat:'brake', brand:'TRP', model:'Trail EVO', family:'trp-trail-evo', price:225, weight:307, desc:'307 g front, without rotor and adapter (TRP figure)', mount:'PM', pistons:4, verified:true, lastChecked:'2026-07-07', source:'https://trpcycling.com/products/trail-evo' },
  { id:'bk-trickstuff-maxima', cat:'brake', brand:'Trickstuff', model:'Maxima', family:'trickstuff-maxima', price:900, weight:280, mount:'PM', pistons:4 },
  { id:'bk-sram-db8', cat:'brake', brand:'SRAM', model:'DB8', family:'sram-db8', price:100, weight:320, mount:'PM', pistons:4 },
  { id:'bk-shimano-deore-m6120', cat:'brake', brand:'Shimano', model:'Deore M6120 4-piston', family:'shimano-deore-m6120', price:60, weight:315, mount:'PM', pistons:4, leverAccepts:['ispec-ev'] },
  { id:'bk-magura-mt-trail-sport', cat:'brake', brand:'Magura', model:'MT Trail Sport', family:'magura-mt-trail', price:227, weight:255, desc:'255 g front, 230 g rear (2-piston) -- front figure used (Magura)', mount:'PM', pistons:4, verified:true, lastChecked:'2026-07-07', source:'https://magura.com/product/mt-trail-sport/' },
  /* --- catalog-brakes-rotors pass: 2-piston trail tiers were missing for all three Shimano groups
     (only the 4-piston M8120/M7120/M6120 siblings existed) --- */
  { id:'bk-shimano-xt-m8100', cat:'brake', brand:'Shimano', model:'Deore XT BR-M8100 (2-piston)', family:'shimano-xt-m8100', mfgPn:'BR-M8100', price:150, weight:260, mount:'PM', pistons:2, leverAccepts:['ispec-ev'], desc:'sample price/weight (Shimano publishes no brake weights; estimated vs. the cataloged 4-piston BR-M8120 sibling at 295g); post-mount 2-piston confirmed via bike.shimano.com product listing (BR-M8100) + Jenson/REI/Worldwide Cyclery' },
  { id:'bk-shimano-slx-m7100', cat:'brake', brand:'Shimano', model:'SLX BR-M7100 (2-piston)', family:'shimano-slx-m7100', mfgPn:'BR-M7100', price:130, weight:270, mount:'PM', pistons:2, leverAccepts:['ispec-ev'], desc:'sample price/weight (Shimano publishes no brake weights; estimated vs. the cataloged 4-piston BR-M7120 sibling at 305g); post-mount 2-piston confirmed via bike.shimano.com product listing (BR-M7100) + Modern Bike/Universal Cycles' },
  { id:'bk-shimano-deore-m6100', cat:'brake', brand:'Shimano', model:'Deore BR-M6100 (2-piston)', family:'shimano-deore-m6100', mfgPn:'BR-M6100', price:70, weight:280, mount:'PM', pistons:2, leverAccepts:['ispec-ev'], desc:'sample price/weight (Shimano publishes no brake weights; estimated vs. the cataloged 4-piston BR-M6120 sibling at 315g); post-mount 2-piston confirmed via bike.shimano.com product listing (BR-M6100) + Universal Cycles/Worldwide Cyclery' },
  { id:'bk-sram-level-silver-stealth-2p', cat:'brake', brand:'SRAM', model:'Level Silver Stealth (2-piston)', family:'sram-level', gen:'C1', mfgPn:'DB-LVL-SLV2-C1', price:185, weight:263, desc:'263 g = rear, SJ, DIR mount, 1800mm hose, with pads (SRAM figure); price = sample (Competitive Cyclist/Thunder Mountain Bikes street price, SRAM lists no MSRP on the spec page)', mount:'PM', pistons:2, leverAccepts:['matchmaker'], verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/service/models/db-lvl-slv2-c1' },
  { id:'bk-sram-code-ultimate-stealth', cat:'brake', brand:'SRAM', model:'Code Ultimate Stealth', family:'sram-code', gen:'C1', mfgPn:'DB-CODE-ULT-C1', price:300, weight:309, desc:'309 g = rear, SJ, DIR mount, 1800mm hose, with pads, excluding clamp/hardware/rotor (SRAM figure); price = sample (SRAM lists no MSRP on the spec page; street price per multiple US retailers)', mount:'PM', pistons:4, leverAccepts:['matchmaker'], verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/service/models/db-code-ult-c1' },
  { id:'bk-hayes-dominion-a2', cat:'brake', brand:'Hayes', model:'Dominion A2', family:'hayes-dominion', price:250, weight:303, desc:'303 g with 100cm hose and mount hardware (Hayes figure); post-mount confirmed via Amazon/Hayes listing ("Front Hydraulic Post Mount"); the XC/trail 2-piston sibling to the cataloged Dominion A4', mount:'PM', pistons:2, verified:true, lastChecked:'2026-07-08', source:'https://hayesbicycle.com/products/dominion-a2-brake-kit' },
  { id:'bk-magura-mt4', cat:'brake', brand:'Magura', model:'MT4', family:'magura-mt4', price:85, weight:230, desc:'230 g, postmount, 2-piston forged caliper (Magura figure); price = sample, converted from the page\'s EUR RRP (92.90 EUR incl. 19% VAT)', mount:'PM', pistons:2, verified:true, lastChecked:'2026-07-08', source:'https://magura.com/product/mt4/' },
  { id:'bk-trp-quadiem', cat:'brake', brand:'TRP', model:'G-Spec Quadiem', family:'trp-quadiem', price:200, weight:320, desc:'320 g front, without rotor/hardware (Worldwide Cyclery measured figure, retailer source -- does not meet the manufacturer/reputable-measured bar, stays unverified); $199.99 street price per Jenson USA/Vital MTB; 4-piston post-mount confirmed via trpcycling.com product listing', mount:'PM', pistons:4 },
  { id:'bk-formula-cura4-kashima', cat:'brake', brand:'Formula', model:'Cura 4 Kashima', family:'formula-cura', price:250, weight:400, desc:'400 g with 85cm hose, 160mm 1-piece rotor and mounting hardware (Formula figure, same basis as the cataloged Cura 4); PM6 caliper, 4x18mm pistons; price = sample (no MSRP stated on the page; estimated premium over the base Cura 4\'s ~$180-210 street price for the Kashima-coated lever)', mount:'PM', pistons:4, verified:true, lastChecked:'2026-07-08', source:'https://www.rideformula.com/products/mtb-brakes/cura-4-kashima/' },

  /* ROTORS (usable front or rear) */
  { id:'ro-sram-hs2-200-6b', cat:'rotor', brand:'SRAM', model:'HS2 200mm', family:'sram-hs2', mfgPn:'RT-HS-2-A1', price:55, weight:206, size:200, mount:'sixbolt', desc:'weight = BikeRadar measured 200mm 6-bolt test sample (SRAM publishes no rotor weights); price = sample (SRAM lists a 60-75 USD range)', verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/sram/models/rt-hs-2-a1', sourceType:'measured', weightSource:'https://www.bikeradar.com/reviews/components/brakes/disc-brake-rotors/sram-hs2-disc-rotor-review' },
  { id:'ro-sram-hs2-220-6b', cat:'rotor', brand:'SRAM', model:'HS2 220mm', family:'sram-hs2', price:60, weight:185, size:220, mount:'sixbolt' },
  { id:'ro-shimano-rtmt800-203-cl', cat:'rotor', brand:'Shimano', model:'RT-MT800 203mm (CL)', family:'shimano-rtmt800', price:55, weight:165, size:203, mount:'CL' },
  { id:'ro-shimano-rtmt800-180-cl', cat:'rotor', brand:'Shimano', model:'RT-MT800 180mm (CL)', family:'shimano-rtmt800', price:50, weight:120, size:180, mount:'CL' },
  { id:'ro-hayes-dseries-203-6b', cat:'rotor', brand:'Hayes', model:'D-Series 203mm', family:'hayes-dseries', price:60, weight:199, size:203, mount:'sixbolt', verified:true, lastChecked:'2026-07-07', source:'https://hayesbicycle.com/products/d-series-rotor' },
  { id:'ro-galfer-223-6b', cat:'rotor', brand:'Galfer', model:'223mm 6-bolt', price:65, weight:200, size:223, mount:'sixbolt' },
  { id:'ro-hope-floating-203-6b', cat:'rotor', brand:'Hope', model:'Floating 203mm (6-bolt)', family:'hope-floating', price:50, weight:175, size:203, mount:'sixbolt' },
  { id:'ro-magura-mdrp-203-6b', cat:'rotor', brand:'Magura', model:'MDR-P 203mm (6-bolt)', family:'magura-mdrp', price:45, weight:216, size:203, mount:'sixbolt', desc:'weight corrected 170->216 per the FETCHED magura.com product page (per-size published weights: 180mm 190g / 203mm 216g / 220mm 241g); price = sample (single EUR RRP shown, no per-size breakout)', verified:true, lastChecked:'2026-07-08', source:'https://magura.com/product/mdr-p/' },
  { id:'ro-shimano-rtmt900-203-cl', cat:'rotor', brand:'Shimano', model:'RT-MT900 203mm (CL)', family:'shimano-rtmt900', price:60, weight:147, size:203, mount:'CL' },
  { id:'ro-sram-hs2-180-6b', cat:'rotor', brand:'SRAM', model:'HS2 180mm', family:'sram-hs2', mfgPn:'RT-HS-2-A1', price:50, weight:170, size:180, mount:'sixbolt' },   // weight corrected 125->170 per MBR's measured 180 (their test unit's mount is unstated, so this stays UNVERIFIED - exact-SKU bar not met)
  { id:'ro-shimano-smrt76-203-6b', cat:'rotor', brand:'Shimano', model:'SM-RT76 203mm (6-bolt)', family:'shimano-smrt76', price:35, weight:180, size:203, mount:'sixbolt' },
  { id:'ro-trp-203-6b', cat:'rotor', brand:'TRP', model:'RS05E Race Rotor 203mm (6-bolt)', family:'trp-rs05e', price:85, weight:175, size:203, mount:'sixbolt', desc:'price corrected 40->85 per the FETCHED trpcycling.com product page ($84.99, sizes 203/220mm); weight not stated on the page, stays sample' },
  { id:'ro-magura-mdrp-220-6b', cat:'rotor', brand:'Magura', model:'MDR-P 220mm (6-bolt)', family:'magura-mdrp', price:50, weight:241, size:220, mount:'sixbolt', desc:'weight corrected 200->241 per the FETCHED magura.com product page (per-size published weights: 180mm 190g / 203mm 216g / 220mm 241g)', verified:true, lastChecked:'2026-07-08', source:'https://magura.com/product/mdr-p/' },
  { id:'ro-hope-floating-220-6b', cat:'rotor', brand:'Hope', model:'Floating 220mm (6-bolt)', family:'hope-floating', price:55, weight:205, size:220, mount:'sixbolt' },
  { id:'ro-sram-centerline-180-cl', cat:'rotor', brand:'SRAM', model:'CenterLine 180mm (CL)', family:'sram-centerline', price:40, weight:130, size:180, mount:'CL' },
  /* --- discipline expansion pass 4: the first 160mm rotor (the Lux World Cup's flat-mount rear runs 160) --- */
  { id:'ro-sram-centerline-x-160-cl', cat:'rotor', brand:'SRAM', model:'CenterLine X 160mm (CL)', family:'sram-centerline', mfgPn:'RT-CLN-X-A2', disciplines:['xc'], price:70, weight:110, size:160, mount:'CL', desc:'sample weight (SRAM publishes no rotor weights - the known verification wall); 160mm + Center Lock + $70-90 MSRP from the fetched sram.com model page rt-cln-x-a2 (two-piece alloy/steel)' },
  /* --- discipline expansion pass 5: the 160mm 6-BOLT rotor (pairs the 6-bolt XC wheels - XCT 11, Turbine SL - with 160mm rears) --- */
  { id:'ro-sram-centerline-160-6b', cat:'rotor', brand:'SRAM', model:'CenterLine 160mm (6-bolt)', family:'sram-centerline', disciplines:['xc'], price:50, weight:114, size:160, mount:'sixbolt', desc:'sample specs (retailer figures: $50, 114g, SRAM part 00.5018.037.013); existence + 160mm/6-bolt/one-piece rounded from the FETCHED Worldwide Cyclery listing' },
  { id:'ro-trickstuff-dachle-203-6b', cat:'rotor', brand:'Trickstuff', model:'Dächle 203mm (6-bolt)', family:'trickstuff-dachle', price:90, weight:150, size:203, mount:'sixbolt' },
  { id:'ro-formula-220-6b', cat:'rotor', brand:'Formula', model:'220mm (6-bolt)', price:55, weight:205, size:220, mount:'sixbolt' },
  /* --- catalog-brakes-rotors pass: size-gap fills across existing rotor families, each existence/size
     confirmed via a manufacturer or dealer-listing search (SRAM/Shimano publish no rotor weights --
     the known verification wall -- so most of these stay sample; Magura's per-size weights ARE
     manufacturer-published and verified below, same page also used to correct the 203/220 siblings above) --- */
  { id:'ro-sram-hs2-160-6b', cat:'rotor', brand:'SRAM', model:'HS2 160mm', family:'sram-hs2', mfgPn:'RT-HS-2-A1', price:55, weight:150, size:160, mount:'sixbolt', desc:'sample weight (SRAM publishes no rotor weights); 160mm confirmed via SRAM support ("What variants are the SRAM HS2 Rotors available in?") + BikeComponents/Jenson listings (160/180/200/220mm, 6-bolt and Center Lock)' },
  { id:'ro-sram-centerline-220-6b', cat:'rotor', brand:'SRAM', model:'CenterLine 220mm (6-bolt)', family:'sram-centerline', price:45, weight:180, size:220, mount:'sixbolt', desc:'sample weight; 220mm confirmed via SRAM support ("What variants of CenterLine rotors are available?") -- 6-bolt runs 140/160/180/200/220mm' },
  { id:'ro-sram-centerline-200-cl', cat:'rotor', brand:'SRAM', model:'CenterLine 200mm (CL)', family:'sram-centerline', price:42, weight:150, size:200, mount:'CL', desc:'sample weight; 200mm Center Lock confirmed via SRAM support ("What variants of CenterLine rotors are available?") -- CL runs 160/180/200mm' },
  { id:'ro-magura-mdrp-180-6b', cat:'rotor', brand:'Magura', model:'MDR-P 180mm (6-bolt)', family:'magura-mdrp', price:50, weight:190, size:180, mount:'sixbolt', desc:'180mm/190g from the FETCHED magura.com product page (per-size published weights: 180mm 190g / 203mm 216g / 220mm 241g); price = sample (single EUR RRP shown, no per-size breakout)', verified:true, lastChecked:'2026-07-08', source:'https://magura.com/product/mdr-p/' },
  { id:'ro-hope-floating-180-6b', cat:'rotor', brand:'Hope', model:'Floating 180mm (6-bolt)', family:'hope-floating', price:48, weight:155, size:180, mount:'sixbolt', desc:'sample weight (interpolated from the cataloged 203mm/175g and 220mm/205mm siblings); 180mm confirmed via hopetech.com news post ("140, 160, 180, 200, 203 & 220mm") + Jenson/The Lost Co listings' },
  { id:'ro-trickstuff-dachle-180-6b', cat:'rotor', brand:'Trickstuff', model:'Dächle 180mm (6-bolt)', family:'trickstuff-dachle', price:80, weight:130, size:180, mount:'sixbolt', desc:'sample weight (scaled from the cataloged 203mm/150g sibling); 180mm confirmed via trickstuff.com + bike-components.de listings (Dächle runs 140/160/180/203mm -- no 220mm size exists)' },
  { id:'ro-galfer-203-6b', cat:'rotor', brand:'Galfer', model:'Wave 203mm (6-bolt)', family:'galfer-wave', price:60, weight:180, size:203, mount:'sixbolt', desc:'sample weight (scaled from the cataloged 223mm/200g sibling); 203mm confirmed via Galfer dealer listings (Wave rotors run 160/180/200/203/223mm, 6-bolt or Center Lock)' },
  { id:'ro-shimano-rtmt800-160-cl', cat:'rotor', brand:'Shimano', model:'RT-MT800 160mm (CL)', family:'shimano-rtmt800', mfgPn:'RT-MT800', price:45, weight:100, size:160, mount:'CL', desc:'sample weight (scaled from the cataloged 180mm/120g sibling); 140/160/180/203mm confirmed via bikecomponents-us/Jenson/Excel Sports listings' },
  { id:'ro-shimano-rtmt900-160-cl', cat:'rotor', brand:'Shimano', model:'RT-MT900 160mm (CL)', family:'shimano-rtmt900', mfgPn:'RT-MT900', price:58, weight:115, size:160, mount:'CL', desc:'sample weight (scaled from the cataloged 203mm/147g sibling); 140/160/180/203mm confirmed via bikecomponents-us/Excel Sports/Amazon listings (140/160 = XC weight-focused, 180/203 = trail/enduro cooling-focused)' },
  { id:'ro-shimano-smrt76-160-6b', cat:'rotor', brand:'Shimano', model:'SM-RT76 160mm (6-bolt)', family:'shimano-smrt76', mfgPn:'SM-RT76', price:32, weight:141, size:160, mount:'sixbolt', desc:'141g = retailer-reported average across several listings (not a single reputable measured source, stays unverified); 160/180/203mm confirmed via The Lost Co/REI/Competitive Cyclist listings' },
  { id:'ro-trp-220-6b', cat:'rotor', brand:'TRP', model:'RS05E Race Rotor 220mm (6-bolt)', family:'trp-rs05e', price:85, weight:200, size:220, mount:'sixbolt', desc:'$84.99 confirmed via the FETCHED trpcycling.com product page (sizes 203/220mm, one listed price); weight scaled from the cataloged 203mm/175g sibling, not stated on the page' },

  /* COCKPIT COMPONENTS */
  { id:'hb-renthal-fatbar-35', cat:'handlebar', brand:'Renthal', model:'Fatbar 35', family:'renthal-fatbar', price:108, weight:305, clamp:35, width:800, rise:30, material:'alu', verified:true, lastChecked:'2026-07-07', source:'https://www.renthal.com/cycle/index.php?route=product/product&product_id=4767' },
  { id:'hb-oneup-carbon-35', cat:'handlebar', brand:'OneUp', model:'Carbon 35', family:'oneup-carbon', price:160, weight:235, clamp:35, width:800, rise:20, material:'carbon', verified:true, lastChecked:'2026-07-07', source:'https://www.oneupcomponents.com/products/v2-carbon-handlebar' },
  { id:'hb-pnw-range-318', cat:'handlebar', brand:'PNW', model:'Range 31.8', family:'pnw-range', price:60, weight:300, clamp:31.8, width:780, rise:30, material:'alu' },
  { id:'hb-raceface-next-r-35', cat:'handlebar', brand:'Race Face', model:'Next R 35', family:'raceface-next-r', price:175, weight:215, clamp:35, width:800, rise:20, material:'carbon', verified:true, lastChecked:'2026-07-07', source:'https://au.raceface.com/products/next-r-35-handlebar' },
  { id:'hb-burgtec-ridewide-enduro-35', cat:'handlebar', brand:'Burgtec', model:'RideWide Enduro 35', family:'burgtec-ridewide', price:100, weight:330, clamp:35, width:800, rise:30, material:'alu' },
  { id:'hb-deity-skywire-35', cat:'handlebar', brand:'Deity', model:'Skywire 35', family:'deity-skywire', price:180, weight:226, clamp:35, width:800, rise:25, material:'carbon', verified:true, lastChecked:'2026-07-07', source:'https://www.deitycomponents.com/skywire_carbon_handlebar_25mm.html' },
  { id:'hb-spank-spike-800-318', cat:'handlebar', brand:'Spank', model:'Spike 800 Vibrocore', family:'spank-spike-800', price:115, weight:350, clamp:31.8, width:800, rise:30, material:'alu', verified:true, lastChecked:'2026-07-07', source:'https://spank-ind.com/products/spike-800-vibrocore%E2%84%A2-bar' },
  { id:'hb-oneup-aluminum-35', cat:'handlebar', brand:'OneUp', model:'Aluminum 35', family:'oneup-aluminum', price:90, weight:318, clamp:35, width:800, rise:20, material:'alu', verified:true, lastChecked:'2026-07-07', source:'https://www.oneupcomponents.com/products/aluminum-handlebar' },
  { id:'hb-title-ah2-35', cat:'handlebar', brand:'Title', model:'FORM Carbon 35', family:'title-ah2', price:150, weight:194, clamp:35, width:800, rise:25, material:'carbon' },
  { id:'hb-chromag-fubars-osx-318', cat:'handlebar', brand:'Chromag', model:'Fubars OSX 31.8', family:'chromag-fubars-osx', price:112, weight:325, clamp:31.8, width:800, rise:25, material:'alu', verified:true, lastChecked:'2026-07-07', source:'https://us.chromagbikes.com/products/osx' },
  { id:'hb-nukeproof-horizon-v2-35', cat:'handlebar', brand:'Nukeproof', model:'Horizon V2 35', family:'nukeproof-horizon', price:75, weight:325, clamp:35, width:800, rise:25, material:'alu' },
  { id:'hb-easton-haven-35', cat:'handlebar', brand:'Easton', model:'Haven 35', family:'easton-haven', price:150, weight:240, clamp:35, width:800, rise:20, material:'carbon' },
  { id:'hb-answer-protaper-35', cat:'handlebar', brand:'Answer', model:'ProTaper 35', family:'answer-protaper', price:70, weight:330, clamp:35, width:800, rise:25, material:'alu' },
  { id:'hb-pro-tharsis-35', cat:'handlebar', brand:'PRO', model:'Tharsis 35', family:'pro-tharsis', price:160, weight:235, clamp:35, width:800, rise:20, material:'carbon' },
  { id:'hb-truvativ-descendant-35', cat:'handlebar', brand:'Truvativ', model:'Descendant 35', family:'truvativ-descendant', price:120, weight:194, clamp:35, width:760, rise:20, material:'carbon', verified:true, lastChecked:'2026-07-07', source:'https://www.sram.com/en/truvativ/models/hb-desc-rc5-a1' },
  /* --- catalog-expand-B (2026-07-08): 31.8mm clamp cockpit breadth - only 3 handlebar / 4 stem brands offered 31.8 (vs 12/11 at 35mm), a real fit-collapse for any lighter-clamp build. --- */
  { id:'hb-renthal-fatbar-318', cat:'handlebar', brand:'Renthal', model:'Fatbar 31.8', family:'renthal-fatbar', price:108, weight:315, clamp:31.8, width:800, rise:30, material:'alu', verified:true, lastChecked:'2026-07-08', source:'https://www.renthal.com/cycle/index.php?route=product/product&product_id=4771' },
  { id:'hb-raceface-turbine-318', cat:'handlebar', brand:'Race Face', model:'Turbine 31.8', family:'raceface-turbine', price:88, weight:270, clamp:31.8, width:725, rise:20, material:'alu', verified:true, lastChecked:'2026-07-08', source:'https://www.raceface.com/products/turbine-handlebar-31-8' },
  /* --- catalog-cockpit (2026-07-08): PNW Range Gen 4 - a distinct current generation from the older unverified 'hb-pnw-range-318' row (new id, not a mutation, per the append-only generation rule); rise 38mm chosen as the representative mid rise (25/38/50mm all offered at $69, weight varies only ~10g across rises). --- */
  { id:'hb-pnw-range-gen4-318', cat:'handlebar', brand:'PNW', model:'Range Handlebar Gen 4', family:'pnw-range', gen:'Gen 4', price:69, weight:313, clamp:31.8, width:800, rise:38, material:'alu', verified:true, lastChecked:'2026-07-08', source:'https://www.pnwcomponents.com/products/range-handlebar-gen-4', desc:'38mm-rise SKU (25mm/313-316g and 50mm/323-324g also offered); trimmable 800mm bar, from the fetched pnwcomponents.com spec table' },
  { id:'hb-pnw-range-gen4-35', cat:'handlebar', brand:'PNW', model:'Range Handlebar Gen 4 (35)', family:'pnw-range', gen:'Gen 4', price:69, weight:318, clamp:35, width:800, rise:38, material:'alu', verified:true, lastChecked:'2026-07-08', source:'https://www.pnwcomponents.com/products/range-handlebar-gen-4', desc:'38mm-rise SKU (25mm/314g and 50mm/324g also offered); trimmable 800mm bar, from the fetched pnwcomponents.com spec table' },
  { id:'st-renthal-apex-35', cat:'stem', brand:'Renthal', model:'Apex 35', family:'renthal-apex', price:150, weight:116, clamp:35, length:33, verified:true, lastChecked:'2026-07-07', source:'https://www.renthal.com/cycle/apex', sourceType:'measured', weightSource:'https://www.mbr.co.uk/reviews/stems/renthal-apex-stem' },
  { id:'st-oneup-stem-35', cat:'stem', brand:'OneUp', model:'Stem 35', family:'oneup-stem', price:90, weight:155, clamp:35, length:35, verified:true, lastChecked:'2026-07-07', source:'https://www.oneupcomponents.com/products/stem' },
  { id:'st-pnw-range-318', cat:'stem', brand:'PNW', model:'Range 31.8', family:'pnw-range', price:45, weight:110, clamp:31.8, length:40 },
  { id:'st-raceface-aeffect-r-35', cat:'stem', brand:'Race Face', model:'Aeffect R 35', family:'raceface-aeffect-r', price:71, weight:161, clamp:35, length:50, verified:true, lastChecked:'2026-07-07', source:'https://www.raceface.com/products/aeffect-r-stem' },
  { id:'st-burgtec-enduro-mk3-35', cat:'stem', brand:'Burgtec', model:'Enduro MK3 35', family:'burgtec-enduro-mk3', price:75, weight:140, clamp:35, length:42.5 },
  { id:'st-deity-copperhead-35', cat:'stem', brand:'Deity', model:'Copperhead 35', family:'deity-copperhead', price:105, weight:179, clamp:35, length:50, verified:true, lastChecked:'2026-07-07', source:'https://www.deitycomponents.com/store/p299/COPPERHEAD_35_50_STORE.html' },
  /* --- catalog-expand-B (2026-07-08): 31.8mm clamp stem breadth, pairs with the handlebar-side fix. --- */
  { id:'st-deity-copperhead-318', cat:'stem', brand:'Deity', model:'Copperhead 31.8', family:'deity-copperhead', price:105, weight:161, clamp:31.8, length:50, verified:true, lastChecked:'2026-07-08', source:'https://www.deitycomponents.com/store/p21/DEITY_COPPERHEAD_STEM_///_50mm_LENGTH.html' },
  { id:'st-spank-spike-318', cat:'stem', brand:'Spank', model:'Spike Race 2', family:'spank-spike', price:60, weight:199, clamp:31.8, length:35, verified:true, lastChecked:'2026-07-07', source:'https://spank-ind.com/products/spike-race-stem' },
  { id:'st-chromag-ranger-v2-35', cat:'stem', brand:'Chromag', model:'Ranger V2 35', family:'chromag-ranger', price:90, weight:130, clamp:35, length:50 },
  { id:'st-nukeproof-horizon-35', cat:'stem', brand:'Nukeproof', model:'Horizon 35', family:'nukeproof-horizon', price:55, weight:125, clamp:35, length:44 },
  { id:'st-hope-am-35', cat:'stem', brand:'Hope', model:'AM 35', family:'hope-am', price:100, weight:120, clamp:35, length:50 },
  { id:'st-industrynine-a35', cat:'stem', brand:'Industry Nine', model:'A35', family:'industrynine-a35', price:175, weight:135, clamp:35, length:40, verified:true, lastChecked:'2026-07-07', source:'https://industrynine.com/products/mt' },
  { id:'st-thomson-elite-x4-318', cat:'stem', brand:'Thomson', model:'Elite X4 31.8', family:'thomson-elite-x4', price:110, weight:145, clamp:31.8, length:50 },
  { id:'st-funn-rsx-35', cat:'stem', brand:'Funn', model:'RSX 35', family:'funn-rsx', price:80, weight:137, clamp:35, length:45, verified:true, lastChecked:'2026-07-07', source:'https://funnmtb.com/products/rsx/' },
  { id:'st-straitline-318', cat:'stem', brand:'Straitline', model:'SSC 35mm', price:130, weight:163, clamp:31.8, length:35 },
  { id:'st-pro-tharsis-35', cat:'stem', brand:'PRO', model:'Tharsis 35', family:'pro-tharsis', price:100, weight:130, clamp:35, length:45 },
  { id:'gr-oneup-lockon', cat:'grips', brand:'OneUp', model:'Lock-On Grips', family:'oneup-lockon', price:27, weight:97, verified:true, lastChecked:'2026-07-07', source:'https://www.oneupcomponents.com/products/grips' },
  { id:'gr-esi-chunky', cat:'grips', brand:'ESI', model:'Chunky', family:'esi-chunky', price:21, weight:60, verified:true, lastChecked:'2026-07-07', source:'https://esigrips.com/products/chunky' },
  { id:'gr-pnw-loam', cat:'grips', brand:'PNW', model:'Loam Grips', family:'pnw-loam', price:29, weight:90, verified:true, lastChecked:'2026-07-07', source:'https://www.pnwcomponents.com/products/loam-grips' },
  { id:'gr-odi-elite-pro', cat:'grips', brand:'ODI', model:'Elite Pro', family:'odi-elite-pro', price:25, weight:105 },
  { id:'gr-ergon-ge1-evo', cat:'grips', brand:'Ergon', model:'GE1 Evo', family:'ergon-ge1', price:40, weight:119, verified:true, lastChecked:'2026-07-07', source:'https://ergonbike.shop/products/ergon-ge1-evo' },
  { id:'gr-dmr-deathgrip', cat:'grips', brand:'DMR', model:'DeathGrip', family:'dmr-deathgrip', price:20, weight:100, verified:true, lastChecked:'2026-07-07', source:'https://dmrbikes.com/products/dmr-deathgrip-race-grips' },
  { id:'gr-chromag-squarewave', cat:'grips', brand:'Chromag', model:'Squarewave', family:'chromag-squarewave', price:42, weight:106, verified:true, lastChecked:'2026-07-07', source:'https://us.chromagbikes.com/products/grips-squarewave' },
  { id:'gr-sensus-swayze', cat:'grips', brand:'Sensus', model:'Swayze', family:'sensus-swayze', price:20, weight:105 },
  { id:'gr-renthal-traction', cat:'grips', brand:'Renthal', model:'Traction', family:'renthal-traction', price:25, weight:115 },
  { id:'gr-lizardskins-charger-evo', cat:'grips', brand:'Lizard Skins', model:'Charger Evo', family:'lizardskins-charger', price:18, weight:100 },
  { id:'gr-wtb-wafflegrip', cat:'grips', brand:'WTB', model:'Wafel', family:'wtb-wafflegrip', price:23, weight:120 },
  { id:'gr-raceface-half-nelson', cat:'grips', brand:'Race Face', model:'Half Nelson', family:'raceface-half-nelson', price:29, weight:92, verified:true, lastChecked:'2026-07-07', source:'https://www.raceface.com/products/half-nelson-grip' },
  { id:'gr-deity-knuckleduster', cat:'grips', brand:'Deity', model:'Knuckleduster', family:'deity-knuckleduster', price:28, weight:101, verified:true, lastChecked:'2026-07-07', source:'https://www.deitycomponents.com/knuckleduster-grips.html' },
  { id:'gr-sdg-slater', cat:'grips', brand:'SDG', model:'Slater', family:'sdg-slater', price:20, weight:100 },
  { id:'gr-supacaz-grizips', cat:'grips', brand:'Supacaz', model:'Grizips', family:'supacaz-grizips', price:25, weight:110 },

  /* DROPPER POSTS */
  { id:'dp-rockshox-reverb-axs-316-170', cat:'dropper', brand:'RockShox', model:'Reverb AXS', family:'rockshox-reverb-axs', price:800, weight:700, diameter:31.6, drop:170 },
  { id:'dp-oneup-v3-316-210', cat:'dropper', brand:'OneUp', model:'V3 Dropper', family:'oneup-dropper', gen:'V3', price:270, weight:538, diameter:31.6, drop:210, verified:true, lastChecked:'2026-07-07', source:'https://www.oneupcomponents.com/products/dropper-post-v3' },
  { id:'dp-fox-transfer-factory-316-180', cat:'dropper', brand:'Fox', model:'Transfer Factory', family:'fox-transfer', price:350, weight:608, diameter:31.6, drop:180 },
  { id:'dp-bikeyoke-revive-316-185', cat:'dropper', brand:'BikeYoke', model:'Revive', family:'bikeyoke-revive', price:400, weight:600, diameter:31.6, drop:185 },
  { id:'dp-pnw-loam-309-175', cat:'dropper', brand:'PNW', model:'Loam 30.9', family:'pnw-loam', price:229, weight:524, diameter:30.9, drop:175, verified:true, lastChecked:'2026-07-06', source:'https://www.pnwcomponents.com/products/loam-dropper-post' },
  { id:'dp-oneup-v3-349-210', cat:'dropper', brand:'OneUp', model:'V3 Dropper 34.9', family:'oneup-dropper', gen:'V3', price:270, weight:675, diameter:34.9, drop:210, verified:true, lastChecked:'2026-07-07', source:'https://www.oneupcomponents.com/products/dropper-post-v3' },
  { id:'dp-wolftooth-resolve-316-200', cat:'dropper', brand:'Wolf Tooth', model:'Resolve', family:'wolftooth-resolve', price:300, weight:640, diameter:31.6, drop:200 },
  { id:'dp-crankbrothers-highline-7-316-170', cat:'dropper', brand:'Crankbrothers', model:'Highline 7', family:'crankbrothers-highline', price:290, weight:604, diameter:31.6, drop:170, verified:true, lastChecked:'2026-07-07', source:'https://www.crankbrothers.com/products/highline-7-dropper' },
  { id:'dp-bikeyoke-revive-349-185', cat:'dropper', brand:'BikeYoke', model:'Revive 34.9', family:'bikeyoke-revive', price:400, weight:640, diameter:34.9, drop:185 },
  { id:'dp-fox-transfer-neo-316-175', cat:'dropper', brand:'Fox', model:'Transfer Neo (wireless)', family:'fox-transfer-neo', price:900, weight:696, diameter:31.6, drop:175, verified:true, lastChecked:'2026-07-07', source:'https://ridefox.com/products/fox-transfer-neo-seatpost', sourceType:'measured', weightSource:'https://www.bikeperfect.com/reviews/fox-transfer-neo-dropper-post-review' },
  { id:'dp-9point8-fall-line-r-316-175', cat:'dropper', brand:'9point8', model:'Fall Line R', family:'9point8-fall-line', price:300, weight:560, diameter:31.6, drop:175 },
  { id:'dp-ks-lev-integra-316-175', cat:'dropper', brand:'KS', model:'LEV Integra', family:'ks-lev-integra', price:300, weight:490, diameter:31.6, drop:175, verified:true, lastChecked:'2026-07-07', source:'https://kssuspension.com/products/dropper-seat-posts/lev-integra/' },
  /* --- catalog-expand-B (2026-07-08): 30.9mm dropper breadth - both 30.9 and 34.9 only had 6 platforms each vs 31.6's 12; each maker's 30.9 SKU confirmed via a fetched page this pass. --- */
  { id:'dp-wolftooth-resolve-309-200', cat:'dropper', brand:'Wolf Tooth', model:'Resolve (30.9)', family:'wolftooth-resolve', price:300, weight:544, diameter:30.9, drop:200, desc:'30.9 existence + weight (200mm travel, 544g) from a fetched cambriabike.com listing (wolftoothcomponents.com product pages render nav-only to fetch tools); price rounds the listed $299.99' },
  { id:'dp-crankbrothers-highline-7-309-170', cat:'dropper', brand:'Crankbrothers', model:'Highline 7 (30.9)', family:'crankbrothers-highline', price:290, weight:583, diameter:30.9, drop:170, verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/highline-7-dropper', desc:'170mm travel weight (583g) and $289.99 sale price from the fetched crankbrothers.com spec table (30.9 offered alongside 31.6)' },
  { id:'dp-9point8-fall-line-r-309-150', cat:'dropper', brand:'9point8', model:'Fall Line R (30.9)', family:'9point8-fall-line', price:349, weight:476, diameter:30.9, drop:150, desc:'150mm stroke, 476g installed (inline head + ThumB remote + cable) from the fetched 9point8.ca spec table; $349 is the inline-head starting price. The R model tops out at 150mm stroke (no 175 option), so this is a shorter-travel sibling, not a diameter-only match of the 31.6/175 row' },
  { id:'dp-ks-lev-integra-309-175', cat:'dropper', brand:'KS', model:'LEV Integra (30.9)', family:'ks-lev-integra', price:300, weight:582, diameter:30.9, drop:175, verified:true, lastChecked:'2026-07-08', source:'https://kssuspension.com/products/dropper-seat-posts/lev-integra/', desc:'175mm travel weight (582g) from the fetched kssuspension.com spec table (30.9 offered in 65-200mm travels)' },
  { id:'dp-pnw-loam-349-200', cat:'dropper', brand:'PNW', model:'Loam 34.9', family:'pnw-loam', price:229, weight:636, diameter:34.9, drop:200, verified:true, lastChecked:'2026-07-06', source:'https://www.pnwcomponents.com/products/loam-dropper-post' },
  { id:'dp-sdg-tellis-316-170', cat:'dropper', brand:'SDG', model:'Tellis', family:'sdg-tellis', price:200, weight:595, diameter:31.6, drop:170 },
  { id:'dp-raceface-turbine-r-316-175', cat:'dropper', brand:'Race Face', model:'Turbine R', family:'raceface-turbine-r', price:300, weight:600, diameter:31.6, drop:175 },
  { id:'dp-ethirteen-vario-infinite-316-180', cat:'dropper', brand:'e*thirteen', model:'Vario Infinite', family:'ethirteen-vario', price:190, weight:652, diameter:31.6, drop:180, verified:true, lastChecked:'2026-07-07', source:'https://www.ethirteen.com/products/vario-dropper-post' },
  { id:'dp-specialized-command-post-309-160', cat:'dropper', brand:'Specialized', model:'Command Post', family:'specialized-command-post', price:250, weight:600, diameter:30.9, drop:160 },
  /* --- catalog-breadth: 34.9 and 30.9 diameter variants of mainstream droppers. 31.6 had 12 platforms (16 frames), but 34.9 had only 3 and 30.9 only 2 -> the 6 non-31.6 frames had thin clean (non-shim) brand choice. Each maker sells all three diameters (confirmed per row); sample specs mirror the 31.6 sibling. --- */
  { id:'dp-fox-transfer-factory-349-180', cat:'dropper', brand:'Fox', model:'Transfer Factory (34.9)', family:'fox-transfer', price:350, weight:625, diameter:34.9, drop:180, desc:'sample specs (mirror 31.6 sibling); 34.9 existence confirmed via Fox Transfer 2025 diameter options (30.9/31.6/34.9) — ridefox / retailer listings' },
  /* --- discipline expansion pass 8: the XC-weight dropper (the catalog's droppers are all ~600g+ trail posts; XC race posts are ~half that) --- */
  { id:'dp-fox-transfer-sl-309-100', cat:'dropper', brand:'Fox', model:'Transfer SL Performance Elite (30.9)', family:'fox-transfer-sl', disciplines:['xc'], price:349, weight:330, diameter:30.9, drop:100, desc:'weight = sample (Fox claims ~330g; the fetched WWC listing quotes only 128g-lighter-than-Transfer); 30.9/100mm/cable/internal/$349 from the FETCHED Worldwide Cyclery listing (also sold in 31.6 and 75/125mm drops)' },
  { id:'dp-fox-transfer-factory-309-180', cat:'dropper', brand:'Fox', model:'Transfer Factory (30.9)', family:'fox-transfer', price:350, weight:600, diameter:30.9, drop:180, desc:'sample specs (mirror 31.6 sibling); 30.9 existence confirmed via Fox Transfer diameter options (30.9 offered to 210mm)' },
  { id:'dp-rockshox-reverb-axs-349-170', cat:'dropper', brand:'RockShox', model:'Reverb AXS (34.9)', family:'rockshox-reverb-axs', price:800, weight:720, diameter:34.9, drop:170, desc:'sample specs (mirror 31.6 sibling); 34.9 existence confirmed via RockShox Reverb AXS diameter options (30.9/31.6/34.9)' },
  { id:'dp-rockshox-reverb-axs-309-170', cat:'dropper', brand:'RockShox', model:'Reverb AXS (30.9)', family:'rockshox-reverb-axs', price:800, weight:695, diameter:30.9, drop:170, desc:'sample specs (mirror 31.6 sibling); 30.9 existence confirmed via RockShox Reverb AXS diameter options (30.9/31.6/34.9)' },
  { id:'dp-sdg-tellis-349-170', cat:'dropper', brand:'SDG', model:'Tellis V2 (34.9)', family:'sdg-tellis', price:210, weight:615, diameter:34.9, drop:170, desc:'sample specs (mirror 31.6 sibling); 34.9 existence confirmed via sdgcomponents.com Tellis V2 (30.9/31.6/34.9)' },
  { id:'dp-sdg-tellis-309-170', cat:'dropper', brand:'SDG', model:'Tellis V2 (30.9)', family:'sdg-tellis', price:200, weight:590, diameter:30.9, drop:170, desc:'sample specs (mirror 31.6 sibling); 30.9 existence confirmed via sdgcomponents.com Tellis V2 (30.9/31.6/34.9)' },

  /* SADDLES */
  { id:'sa-wtb-volt', cat:'saddle', brand:'WTB', model:'Volt', family:'wtb-volt', price:65, weight:292, verified:true, lastChecked:'2026-07-07', source:'https://www.wtb.com/products/volt' },
  { id:'sa-ergon-sm-enduro', cat:'saddle', brand:'Ergon', model:'SM Enduro', family:'ergon-sm-enduro', price:130, weight:240 },
  { id:'sa-specialized-bridge', cat:'saddle', brand:'Specialized', model:'Bridge', family:'specialized-bridge', price:150, weight:250 },
  { id:'sa-sdg-belair-v3', cat:'saddle', brand:'SDG', model:'Bel-Air V3', family:'sdg-belair', price:105, weight:236, verified:true, lastChecked:'2026-07-07', source:'https://sdgcomponents.com/products/bel-air-v3-lux-alloy' },
  { id:'sa-fizik-terra-aidon-x3', cat:'saddle', brand:'Fizik', model:'Terra Aidon X3', family:'fizik-terra-aidon', price:175, weight:249, verified:true, lastChecked:'2026-07-07', source:'https://www.fizik.com/us_en/terra-aidon-x3.html' },
  { id:'sa-wtb-silverado', cat:'saddle', brand:'WTB', model:'Silverado', family:'wtb-silverado', price:65, weight:308, verified:true, lastChecked:'2026-07-07', source:'https://www.wtb.com/products/silverado' },
  { id:'sa-fabric-scoop-radius', cat:'saddle', brand:'Fabric', model:'Scoop Sport Radius', family:'fabric-scoop', price:60, weight:306, verified:true, lastChecked:'2026-07-07', source:'https://fabric.cc/products/scoop-sport-radius' },
  { id:'sa-sdg-radar', cat:'saddle', brand:'SDG', model:'Radar Ti-Alloy', family:'sdg-radar', price:100, weight:230, verified:true, lastChecked:'2026-07-07', source:'https://sdgcomponents.com/products/radar-mtn-ti-alloy' },
  { id:'sa-prologo-dimension', cat:'saddle', brand:'Prologo', model:'Dimension', family:'prologo-dimension', price:110, weight:245 },
  { id:'sa-fizik-terra-alpaca', cat:'saddle', brand:'Fizik', model:'Terra Alpaca', family:'fizik-terra-alpaca', price:100, weight:235 },
  { id:'sa-raceface-aeffect', cat:'saddle', brand:'Race Face', model:'Aeffect', family:'raceface-aeffect', price:60, weight:270 },
  { id:'sa-chromag-trailmaster', cat:'saddle', brand:'Chromag', model:'Trailmaster DT', family:'chromag-trailmaster', price:99, weight:305, verified:true, lastChecked:'2026-07-07', source:'https://us.chromagbikes.com/products/saddles-trailmaster-dt-19' },
  { id:'sa-bontrager-arvada', cat:'saddle', brand:'Bontrager', model:'Arvada', family:'bontrager-arvada', price:80, weight:260 },
  { id:'sa-selleitalia-model-x', cat:'saddle', brand:'Selle Italia', model:'Model X', family:'selleitalia-model-x', price:90, weight:270 },
  { id:'sa-pnw-loam', cat:'saddle', brand:'PNW', model:'Loam', family:'pnw-loam', price:60, weight:265 },
  { id:'sa-dmr-oioi', cat:'saddle', brand:'DMR', model:'OiOi', family:'dmr-oioi', price:40, weight:270, verified:true, lastChecked:'2026-07-07', source:'https://dmrbikes.com/products/dmr-oioi-saddle' },
  /* --- catalog-cockpit (2026-07-08): WTB + Ergon saddle breadth --- */
  { id:'sa-wtb-koda-ti', cat:'saddle', brand:'WTB', model:'Koda (Titanium, Medium)', family:'wtb-koda', mfgPn:'W065-0611', price:65, weight:218, verified:true, lastChecked:'2026-07-08', source:'https://www.wtb.com/products/koda', desc:'Titanium, Medium-width (145mm) SKU - 218g, from the fetched wtb.com spec table (also offered in Cromoly 306g and Steel 315g, Medium or Wide widths)' },
  { id:'sa-wtb-solano-ti', cat:'saddle', brand:'WTB', model:'Solano (Titanium, Medium)', family:'wtb-solano', price:120, weight:219, verified:true, lastChecked:'2026-07-08', source:'https://www.wtb.com/products/solano', desc:'Titanium, Medium-width SKU - 219g / $119.95 MSRP, from the fetched wtb.com spec table (also offered in Carbon $209.95/167g and Cromoly $95.95/257g, Medium or Wide widths); the $104.95 "sale price" shown site-wide is a blended teaser, not used as MSRP' },
  { id:'sa-ergon-sm-enduro-comp', cat:'saddle', brand:'Ergon', model:'SM Enduro Comp Men', family:'ergon-sm-enduro', price:115, weight:250, desc:'price $114.95 from the fetched ergonbike.shop saddle listing (confirms this trim exists); weight not published there, so it is sample (interpolated between the base SM Enduro and the lighter Pro Ti trim) - left unverified' },
  { id:'sa-ergon-sm-enduro-pro-ti', cat:'saddle', brand:'Ergon', model:'SM Enduro Pro Ti Men', family:'ergon-sm-enduro', price:220, weight:210, desc:'price $219.95 from the fetched ergonbike.shop saddle listing (confirms this Ti-railed trim exists); weight not published there, so it is sample (lighter than the base/Comp trims for the Ti rails) - left unverified' },

  /* PEDALS (sold in pairs; 9/16in thread fits every crank - no compat rules) */
  { id:'pd-oneup-aluminum', cat:'pedal', brand:'OneUp', model:'Aluminum Pedal', family:'oneup-aluminum', price:150, weight:386, style:'flat', verified:true, lastChecked:'2026-07-01', source:'https://www.oneupcomponents.com/products/aluminum-pedal' },
  { id:'pd-oneup-composite', cat:'pedal', brand:'OneUp', model:'Composite Pedal', family:'oneup-composite', price:50, weight:355, style:'flat', verified:true, lastChecked:'2026-07-01', source:'https://www.oneupcomponents.com/products/comp-pedal' },
  { id:'pd-raceface-chester', cat:'pedal', brand:'Race Face', model:'Chester (Large)', family:'raceface-chester', price:61, weight:355, style:'flat', verified:true, lastChecked:'2026-07-01', source:'https://www.raceface.com/products/chester-pedal' },
  { id:'pd-raceface-atlas', cat:'pedal', brand:'Race Face', model:'Atlas', family:'raceface-atlas', price:198, weight:386, style:'flat', verified:true, lastChecked:'2026-07-01', source:'https://www.raceface.com/products/atlas-pedal' },
  { id:'pd-crankbrothers-stamp-7-large', cat:'pedal', brand:'Crankbrothers', model:'Stamp 7 (Large)', family:'crankbrothers-stamp', price:200, weight:375, style:'flat', verified:true, lastChecked:'2026-07-01', source:'https://www.crankbrothers.com/products/stamp-7-large' },
  { id:'pd-crankbrothers-mallet-enduro', cat:'pedal', brand:'Crankbrothers', model:'Mallet Enduro', family:'crankbrothers-mallet', price:200, weight:424, style:'clip', verified:true, lastChecked:'2026-07-01', source:'https://www.crankbrothers.com/products/mallet-e' },
  /* --- discipline expansion pass 8: the XC race pedal (280g/pair vs the 424g Mallet) --- */
  { id:'pd-crankbrothers-eggbeater-3', cat:'pedal', brand:'Crankbrothers', model:'Eggbeater 3', family:'crankbrothers-eggbeater', disciplines:['xc'], price:160, weight:280, style:'clip', verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/eggbeater-3', desc:'280g per pair, $159.99, 4-sided entry, stainless body + chromoly spindle - all from the fetched crankbrothers.com product page' },
  { id:'pd-time-speciale-12-large', cat:'pedal', brand:'Time', model:'Speciale 12 (Large)', family:'time-speciale', gen:'B1', mfgPn:'PD-SPC-12-B1', price:385, weight:360, style:'clip', verified:true, lastChecked:'2026-07-01', source:'https://www.sram.com/en/time-sport/models/pd-spc-12-b1' },
  { id:'pd-shimano-xt-m8120', cat:'pedal', brand:'Shimano', model:'XT PD-M8120 Trail', family:'shimano-xt-m8120', price:150, weight:438, style:'clip', verified:true, lastChecked:'2026-07-07', source:'https://ride.shimano.com/products/pd-m8120' },
  { id:'pd-shimano-saint-m820', cat:'pedal', brand:'Shimano', model:'Saint PD-M820', family:'shimano-saint-m820', price:180, weight:546, style:'clip' },
  { id:'pd-deity-tmac', cat:'pedal', brand:'Deity', model:'TMAC', family:'deity-tmac', price:180, weight:439, style:'flat', verified:true, lastChecked:'2026-07-07', source:'https://www.deitycomponents.com/tmac-signature-pedals.html' },
  { id:'pd-dmr-vault', cat:'pedal', brand:'DMR', model:'Vault', family:'dmr-vault', price:180, weight:430, style:'flat', verified:true, lastChecked:'2026-07-07', source:'https://dmrbikes.com/products/dmr-vault-pedal' },
  { id:'pd-chromag-dagga', cat:'pedal', brand:'Chromag', model:'Dagga', family:'chromag-dagga', price:208, weight:480, style:'flat', verified:true, lastChecked:'2026-07-07', source:'https://us.chromagbikes.com/products/pedals-dagga' },
  { id:'pd-nukeproof-horizon-pro', cat:'pedal', brand:'Nukeproof', model:'Horizon Pro', family:'nukeproof-horizon', price:100, weight:430, style:'flat' },
  { id:'pd-hope-f22', cat:'pedal', brand:'Hope', model:'F22', family:'hope-f22', price:260, weight:360, style:'flat', verified:true, lastChecked:'2026-07-08', source:'https://www.hopetech.com/products/drivetrain/pedals/f22-flat-pedal/', desc:'weight 360g/pair MAKER-STATED (re-confirmed 2026-07-08). Price is NOT maker-stated as a US MSRP: hopetech.com (UK-direct) shows only GBP L155.00 / EUR 194.70 / a geolocated ex-tax USD conversion (~$202.76) - a converted ex-tax figure, not a US MSRP, so per template s5.1-12 it does not go in this field. $260 retained as prior US-market MSRP; drift flag is the FX-converted teaser, not a real price move' },
  { id:'pd-ht-t2', cat:'pedal', brand:'HT', model:'T2', family:'ht-t2', price:135, weight:368, style:'clip' },
  { id:'pd-pnw-loam', cat:'pedal', brand:'PNW', model:'Loam Pedal Gen 2', family:'pnw-loam', price:99, weight:420, style:'flat' },
  { id:'pd-crankbrothers-stamp-1', cat:'pedal', brand:'Crankbrothers', model:'Stamp 1 Gen 2 (composite)', family:'crankbrothers-stamp', price:65, weight:348, style:'flat', verified:true, lastChecked:'2026-07-07', source:'https://www.crankbrothers.com/products/stamp-1-gen-2-large' },
  /* --- catalog-cockpit (2026-07-08): Race Face + Crankbrothers + Time pedal breadth --- */
  { id:'pd-raceface-ride', cat:'pedal', brand:'Race Face', model:'Ride Pedal', family:'raceface-ride', price:44, weight:320, style:'flat', verified:true, lastChecked:'2026-07-08', source:'https://www.raceface.com/products/ride-pedal' },
  { id:'pd-raceface-aeffect-r-pedal', cat:'pedal', brand:'Race Face', model:'Aeffect R Pedal', family:'raceface-aeffect-r-pedal', price:137, weight:440, style:'flat', verified:true, lastChecked:'2026-07-08', source:'https://www.raceface.com/products/aeffect-r-pedal' },
  { id:'pd-crankbrothers-mallet-trail', cat:'pedal', brand:'Crankbrothers', model:'Mallet Trail', family:'crankbrothers-mallet', price:200, weight:344, style:'clip', verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/mallet-trail', desc:'$199.99 regular price (site shows a $179.99 sale); 344g/pair from the fetched crankbrothers.com spec table' },
  { id:'pd-crankbrothers-candy-7', cat:'pedal', brand:'Crankbrothers', model:'Candy 7', family:'crankbrothers-candy', price:200, weight:320, style:'clip', verified:true, lastChecked:'2026-07-08', source:'https://www.crankbrothers.com/products/candy-7' },
  { id:'pd-time-speciale-10-large', cat:'pedal', brand:'Time', model:'Speciale 10 (Large)', family:'time-speciale', gen:'B1', mfgPn:'PD-SPC-10-B1', price:200, weight:404, style:'clip', verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/time-sport/models/pd-spc-10-b1', desc:'Large platform, 202g per pedal (404g/pair) from the fetched sram.com model page; maker markets it for downhill/enduro/trail riding', disciplines:['trail','enduro','dh'] },
  { id:'pd-time-atac-xc-12', cat:'pedal', brand:'Time', model:'ATAC XC 12', family:'time-atac-xc', mfgPn:'PD-XC-12-C1', price:295, weight:240, style:'clip', disciplines:['xc'], verified:true, lastChecked:'2026-07-08', source:'https://www.sram.com/en/time-sport/models/pd-xc-12-c1', desc:'240g/pair (120g each, carbon body + titanium axle) from the fetched sram.com model page; page shows a $295-$325 range (finish tiers) - using the low end as MSRP' },
  { id:'pd-raceface-turbine', cat:'pedal', brand:'Race Face', model:'Turbine Pedal', family:'raceface-turbine-pedal', price:198, weight:419, style:'flat', verified:true, lastChecked:'2026-07-08', source:'https://www.raceface.com/products/turbine-pedal' },

  /* PRESETS (bundle price + bundle weight; fills maps slot -> component id) */
  { id:'gs-sram-gx-transmission', cat:'groupset', brand:'SRAM', model:'GX Eagle Transmission', family:'sram-gx-transmission', desc:'AXS . 12-spd . needs UDH frame', price:1099, fills:{ shifter:'sft-sram-gx-transmission', derailleur:'dr-sram-gx-transmission', cassette:'ca-sram-xs1275', chain:'ch-sram-gx-flattop', crankset:'cr-sram-x0-transmission' } },
  { id:'gs-sram-gx-eagle', cat:'groupset', brand:'SRAM', model:'GX Eagle (mechanical)', family:'sram-gx-eagle', desc:'mechanical . 12-spd . XD', price:545, fills:{ shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle' } },
  { id:'gs-shimano-xt-m8100', cat:'groupset', brand:'Shimano', model:'XT M8100', family:'shimano-xt-m8100', desc:'mechanical . 12-spd . Micro Spline', price:559, fills:{ shifter:'sft-shimano-xt-m8100', derailleur:'dr-shimano-xt-m8100-sgs', cassette:'ca-shimano-xt-m8100-1051', chain:'ch-shimano-xt-m8100', crankset:'cr-shimano-xt-m8100' } },
  { id:'gs-shimano-slx-m7100', cat:'groupset', brand:'Shimano', model:'SLX M7100', family:'shimano-slx-m7100', desc:'mechanical . 12-spd . Micro Spline', price:419, fills:{ shifter:'sft-shimano-slx-m7100', derailleur:'dr-shimano-slx-m7100-sgs', cassette:'ca-shimano-slx-m7100-1051', chain:'ch-shimano-xt-m8100', crankset:'cr-raceface-aeffect-r' } },
  /* --- discipline expansion pass 6 (2026-07-08): the XC race groupset (retailers bundle XTR M9100 1x12; sample bundle price below the $1,250 component sum) --- */
  { id:'gs-shimano-xtr-m9100', cat:'groupset', brand:'Shimano', model:'XTR M9100', family:'shimano-xtr-m9100', disciplines:['xc'], desc:'mechanical . 12-spd . Micro Spline', price:1150, fills:{ shifter:'sft-shimano-xtr-m9100', derailleur:'dr-shimano-xtr-m9100-sgs', cassette:'ca-shimano-xtr-m9100-1051', chain:'ch-shimano-xtr-m9100', crankset:'cr-shimano-xtr-m9100' } },
  /* --- catalog-drivetrain pass (2026-07-08): SRAM's cable-actuated T-Type tiers - see the component rows'
     own comment block above the crankset section for full sourcing notes. --- */
  { id:'gs-sram-eagle90-transmission', cat:'groupset', brand:'SRAM', model:'Eagle 90 Transmission', family:'sram-eagle90-transmission', desc:'mechanical (cable) . 12-spd . Full Mount/UDH . shares the GX Transmission cassette+chain. price = a retailer-listed bundle-kit figure ($670; SRAM does not publish bundle pricing on sram.com, same situation as the GX/X0/XX Transmission presets above)', price:670, fills:{ shifter:'sft-sram-eagle90-transmission', derailleur:'dr-sram-eagle90-transmission', cassette:'ca-sram-xs1275', chain:'ch-sram-gx-flattop', crankset:'cr-sram-eagle90-transmission' } },
  { id:'gs-sram-eagle70-transmission', cat:'groupset', brand:'SRAM', model:'Eagle 70 Transmission', family:'sram-eagle70-transmission', desc:'mechanical (cable) . 12-spd . Full Mount/UDH . standard-freehub cassette (no XD driver needed). price = the sum of its fetched sram.com component prices (no confirmed official bundle-kit price found for this tier)', price:550, fills:{ shifter:'sft-sram-eagle70-transmission', derailleur:'dr-sram-eagle70-transmission', cassette:'ca-sram-xs1270', chain:'ch-sram-eagle70-flattop', crankset:'cr-sram-eagle70-transmission' } },

  { id:'ws-dtswiss-ex-1700-29', cat:'wheelset', brand:'DT Swiss', model:'EX 1700', family:'dtswiss-ex-1700', desc:'29 . Boost . XD . Center Lock', price:700, fills:{ frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-ex-1700-29' } },
  { id:'ws-reserve-30-hd-29', cat:'wheelset', brand:'Reserve', model:'30 HD', family:'reserve-30-hd', desc:'29 . Boost . XD . 6-bolt', price:1599, fills:{ frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29' } },
  { id:'ws-industrynine-enduro-s-29', cat:'wheelset', brand:'Industry Nine', model:'Enduro S', family:'industrynine-enduro-s', desc:'29 . Boost . Micro Spline . 6-bolt', price:1700, fills:{ frontWheel:'fw-industrynine-enduro-s-29', rearWheel:'rw-industrynine-enduro-s-29' } },
  { id:'ws-roval-traverse-hd-29', cat:'wheelset', brand:'Roval', model:'Traverse HD', family:'roval-traverse-hd', desc:'29 . Boost . XD . 6-bolt', price:1600, fills:{ frontWheel:'fw-roval-traverse-hd-29', rearWheel:'rw-roval-traverse-hd-29' } },
  { id:'ws-dtswiss-e-1900-275', cat:'wheelset', brand:'DT Swiss', model:'E 1900 27.5', family:'dtswiss-e-1900', desc:'27.5 . Boost . Micro Spline . CL', price:500, fills:{ frontWheel:'fw-dtswiss-e-1900-275', rearWheel:'rw-dtswiss-e-1900-275' } },
  { id:'ws-dtswiss-e-1900-275-xd', cat:'wheelset', brand:'DT Swiss', model:'E 1900 27.5 (XD)', family:'dtswiss-e-1900', desc:'27.5 . Boost . XD . CL', price:500, fills:{ frontWheel:'fw-dtswiss-e-1900-275', rearWheel:'rw-dtswiss-e-1900-275-xd' } },
  /* --- discipline expansion pass 7: the DH wheelset (DT sells the FR 1500 pair as a set at ~$1,153 - price capped at the component sum per lint; pairs the golden/demo DH build's exact wheels) --- */
  { id:'ws-dtswiss-fr-1500-29-150', cat:'wheelset', brand:'DT Swiss', model:'FR 1500 Classic (20x110 / 12x150)', family:'dtswiss-fr-1500', disciplines:['dh'], desc:'29 . 20x110 Boost F . 12x150 XD R . 6-bolt', price:1152, fills:{ frontWheel:'fw-dtswiss-fr-1500-29', rearWheel:'rw-dtswiss-fr-1500-29-150' } },
  { id:'ws-dtswiss-fr-1500-29-157', cat:'wheelset', brand:'DT Swiss', model:'FR 1500 Classic (20x110 / 12x157)', family:'dtswiss-fr-1500', disciplines:['dh'], desc:'29 . 20x110 Boost F . 12x157 SuperBoost XD R . 6-bolt', price:1152, fills:{ frontWheel:'fw-dtswiss-fr-1500-29', rearWheel:'rw-dtswiss-fr-1500-29-157' } },
  /* --- discipline expansion pass 6: the XC race wheelset (crankbrothers sells the XCT 11 pair as a $2,400 wheelset - price = component sum, no bundle discount published; MS + XD rear variants mirror the e-1900 precedent) --- */
  { id:'ws-crankbrothers-synthesis-xct11-29-ms', cat:'wheelset', brand:'Crankbrothers', model:'Synthesis XCT 11 (Micro Spline)', family:'crankbrothers-synthesis-xct', disciplines:['xc'], desc:'29 . Boost . Micro Spline . 6-bolt', price:2398, fills:{ frontWheel:'fw-crankbrothers-synthesis-xct11-29', rearWheel:'rw-crankbrothers-synthesis-xct11-29-ms' } },
  { id:'ws-crankbrothers-synthesis-xct11-29-xd', cat:'wheelset', brand:'Crankbrothers', model:'Synthesis XCT 11 (XD)', family:'crankbrothers-synthesis-xct', disciplines:['xc'], desc:'29 . Boost . XD . 6-bolt', price:2398, fills:{ frontWheel:'fw-crankbrothers-synthesis-xct11-29', rearWheel:'rw-crankbrothers-synthesis-xct11-29-xd' } },
  { id:'ws-ibis-s35-i9-29-xd', cat:'wheelset', brand:'Ibis', model:'S35 Industry 9 (XD)', family:'ibis-s35', disciplines:['enduro'], desc:'29 . Boost . XD . Center Lock', price:1199, fills:{ frontWheel:'fw-ibis-s35-i9-29', rearWheel:'rw-ibis-s35-i9-29-xd' } },
  { id:'ws-ibis-s35-i9-29-ms', cat:'wheelset', brand:'Ibis', model:'S35 Industry 9 (Micro Spline)', family:'ibis-s35', disciplines:['enduro'], desc:'29 . Boost . Micro Spline . Center Lock', price:1199, fills:{ frontWheel:'fw-ibis-s35-i9-29', rearWheel:'rw-ibis-s35-i9-29-ms' } },
  { id:'ws-ibis-send-29-xd', cat:'wheelset', brand:'Ibis', model:'Blackbird Send 29 AL (XD)', family:'ibis-send', disciplines:['enduro'], desc:'29 . Boost . XD . 6-bolt', price:525, fills:{ frontWheel:'fw-ibis-send-29', rearWheel:'rw-ibis-send-29-xd' } },
  { id:'ws-ibis-send-29-ms', cat:'wheelset', brand:'Ibis', model:'Blackbird Send 29 AL (Micro Spline)', family:'ibis-send', disciplines:['enduro'], desc:'29 . Boost . Micro Spline . 6-bolt', price:525, fills:{ frontWheel:'fw-ibis-send-29', rearWheel:'rw-ibis-send-29-ms' } },

  { id:'bs-sram-code-rsc', cat:'brakeset', brand:'SRAM', model:'Code RSC set', family:'sram-code', desc:'200/200 . 6-bolt', price:360, fills:{ frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b' } },
  { id:'bs-shimano-xt-m8120', cat:'brakeset', brand:'Shimano', model:'XT M8120 set', family:'shimano-xt-m8120', desc:'203/203 . Center Lock', price:379, fills:{ frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120', frontRotor:'ro-shimano-rtmt800-203-cl', rearRotor:'ro-shimano-rtmt800-203-cl' } },
  { id:'bs-hayes-dominion-a4', cat:'brakeset', brand:'Hayes', model:'Dominion A4 set', family:'hayes-dominion', desc:'203/203 . 6-bolt', price:440, fills:{ frontBrake:'bk-hayes-dominion-a4', rearBrake:'bk-hayes-dominion-a4', frontRotor:'ro-hayes-dseries-203-6b', rearRotor:'ro-hayes-dseries-203-6b' } },

  { id:'co-renthal-fatbar-apex', cat:'cockpitset', brand:'Renthal', model:'Fatbar + Apex', desc:'35mm . alu bar', price:200, fills:{ handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon' } },
  { id:'co-oneup-carbon', cat:'cockpitset', brand:'OneUp', model:'Carbon Bar + Stem', desc:'35mm . carbon bar', price:220, fills:{ handlebar:'hb-oneup-carbon-35', stem:'st-oneup-stem-35', grips:'gr-oneup-lockon' } },
  { id:'co-pnw-range', cat:'cockpitset', brand:'PNW', model:'Range cockpit', desc:'31.8mm . alu bar', price:120, fills:{ handlebar:'hb-pnw-range-318', stem:'st-pnw-range-318', grips:'gr-pnw-loam' } }
];

/* ---- legacy id aliases ----------------------------------------------------
   Ids are APPEND-ONLY: never renamed, never reused (share links, the
   verify-job state and catalog cross-refs all key on them). When an id must
   change, the old id RETIRES into this map (old -> current) instead of being
   deleted; readHash (index.html) and the verify-job catalog sync resolve
   through canonicalId(), so pre-migration share links and job state keep
   working. Seeded 2026-07-06 by the migration to brand-qualified ids
   (DATA-MODEL-REVIEW.md section 3.1).                                       */
/** @type {Object.<string, string>} */
var ALIASES = {
  'fr-megatower': 'fr-santacruz-megatower-cc',
  'fr-enduro': 'fr-specialized-enduro-sworks',
  'fr-capra': 'fr-yt-capra-core4',
  'fr-strive': 'fr-canyon-strive-cfr',
  'fr-slash': 'fr-trek-slash',
  'fr-range': 'fr-norco-range-c1',
  'fr-spire': 'fr-transition-spire-alloy',
  'fr-madonna': 'fr-raaw-madonna-v22',
  'fr-madonna-v3': 'fr-raaw-madonna-v3',
  'fr-madonna-v32': 'fr-raaw-madonna-v32',
  'fr-reign': 'fr-giant-reign-advanced',
  'fr-firebird': 'fr-pivot-firebird',
  'fr-giga': 'fr-nukeproof-giga-290',
  'fr-process': 'fr-kona-process-153',
  'fr-rallon': 'fr-orbea-rallon-mteam',
  'fr-altitude': 'fr-rockymountain-altitude-c70',
  'fr-metasx': 'fr-commencal-meta-sx-v5',
  'fr-spindrift': 'fr-propain-spindrift-cf',
  'fr-hd6': 'fr-ibis-hd6',
  'fr-dreadnought': 'fr-forbidden-dreadnought',
  'fr-sb160': 'fr-yeti-sb160',
  'fk-zeb': 'fk-rockshox-zeb-ultimate-29-170',
  'fk-38-170': 'fk-fox-38-factory-29-170',
  'fk-38-180': 'fk-fox-38-factory-29-180',
  'fk-lyrik': 'fk-rockshox-lyrik-ultimate-29-160',
  'fk-z1': 'fk-marzocchi-bomber-z1-29-160',
  'fk-marzocchi-bomber-z1-29-170': 'fk-marzocchi-bomber-z1-29-160',
  'fk-zeb-275': 'fk-rockshox-zeb-ultimate-275-170',
  'fk-ohlins': 'fk-ohlins-rxf38-m2-29-170',
  'fk-mezzer': 'fk-manitou-mezzer-pro-29-170',
  'fk-onyx': 'fk-dvo-onyx-sc-d1-29-170',
  'fk-36': 'fk-fox-36-factory-29-160',
  'fk-zeb-180': 'fk-rockshox-zeb-ultimate-29-180',
  'fk-helm': 'fk-canecreek-helm-mkii-air-29-160',
  'fk-canecreek-helm-mkii-air-29-170': 'fk-canecreek-helm-mkii-air-29-160',
  'fk-ext-era': 'fk-ext-era-v2-29-170',
  'fk-selva': 'fk-formula-selva-s-29-160',
  'fk-rxf36': 'fk-ohlins-rxf36-m2-29-160',
  'fk-domain': 'fk-rockshox-domain-rc-29-170',
  'fk-mattoc': 'fk-manitou-mattoc-pro-29-150',
  'fk-manitou-mattoc-pro-29-160': 'fk-manitou-mattoc-pro-29-150',
  'fk-mrp': 'fk-mrp-ribbon-air-29-160',
  'fk-durolux': 'fk-srsuntour-durolux-r2c2-29-170',
  'fk-xfusion': 'fk-xfusion-trace-36-hlr-29-170',
  'fk-dt535': 'fk-dtswiss-f-535-one-29-160',
  'fk-push': 'fk-push-nineone-coil-29-160',
  'sh-sd-air': 'sh-rockshox-super-deluxe-ultimate-230x65',
  'sh-floatx': 'sh-fox-float-x-factory-230x65',
  'sh-sd-coil': 'sh-rockshox-super-deluxe-coil-ultimate-230x65',   // flattened
  'sh-dhx2': 'sh-fox-dhx2-230x65',
  'sh-sd-trun': 'sh-rockshox-super-deluxe-205x65-trun',
  'sh-x2-trun': 'sh-fox-float-x2-205x65-trun',
  'sh-floatx-60': 'sh-fox-float-x-230x60',
  'sh-vivid-oem': 'sh-rockshox-vivid-ultimate-oem-205x60-trun',
  'sh-vivid': 'sh-rockshox-vivid-ultimate-230x65',
  'sh-vivid-coil': 'sh-rockshox-vivid-coil-230x65',
  'sh-storia': 'sh-ext-storia-v3-230x65',
  'sh-ttx': 'sh-ohlins-ttx22-m2-230x65',
  'sh-kitsuma': 'sh-canecreek-kitsuma-coil-230x65',
  'sh-x2-std': 'sh-fox-float-x2-230x65',
  'sh-vivid-trun': 'sh-rockshox-vivid-205x65-trun',
  'sh-marzocchi-cr': 'sh-marzocchi-bomber-cr-230x65',
  'sh-jade': 'sh-dvo-jade-x-230x65',
  'sh-mara': 'sh-manitou-mara-pro-230x65-trun',   // flattened (2026-07-08 mount correction)
  'sh-manitou-mara-pro-230x65': 'sh-manitou-mara-pro-230x65-trun',   // 2026-07-08: mount was wrong - maker lists 230x65 as trunnion-only
  'sh-manitou-mara-pro-205x65-trun': 'sh-manitou-mara-pro-205x60-trun',   // 2026-07-08: fabricated size (absent from the maker size list); closest real config
  'cr-ethirteen-plus': 'cr-ethirteen-trs-race-carbon',   // 2026-07-08: "e13 Plus" matched no current e*thirteen pedal crank (verify-job flagged it as a data-entry mismatch); retired to the real TRS Race Carbon Gen4 (fetched ethirteen.com)
  'sh-elevensix': 'sh-push-elevensix-230x65',
  'sh-sdu-2056': 'sh-rockshox-super-deluxe-ultimate-205x60-trun',
  'sh-sdu-230625': 'sh-rockshox-super-deluxe-ultimate-230x62p5',
  'sh-floatx-2062': 'sh-fox-float-x-205x62p5-trun',
  'fw-dt': 'fw-dtswiss-ex-1700-29',
  'fw-reserve': 'fw-reserve-30-hd-29',
  'fw-i9': 'fw-industrynine-enduro-s-29',
  'fw-roval': 'fw-roval-traverse-hd-29',
  'fw-dt275': 'fw-dtswiss-e-1900-275',
  'fw-hope': 'fw-hope-fortus-30-29',
  'fw-wao': 'fw-weareone-union-29',
  'fw-cb': 'fw-crankbrothers-synthesis-enduro-29',
  'fw-enve': 'fw-enve-am30-29',
  'fw-zipp': 'fw-zipp-3zero-moto-29',
  'fw-newmen': 'fw-newmen-advanced-sl-a30-29',
  'fw-stans': 'fw-stans-flow-ex3-29',
  'fw-hunt': 'fw-hunt-enduro-wide-29',
  'fw-spank': 'fw-spank-359-29',
  'fw-mt500': 'fw-shimano-mt500-29',
  'fw-rf': 'fw-raceface-turbine-sl-29',
  'fw-bontrager': 'fw-bontrager-line-pro-30-29',
  'fw-mavic': 'fw-mavic-deemax-29',
  'fw-giant': 'fw-giant-trx-0-29',
  'rw-dt': 'rw-dtswiss-ex-1700-29',
  'rw-reserve': 'rw-reserve-30-hd-29',
  'rw-i9': 'rw-industrynine-enduro-s-29',
  'rw-roval': 'rw-roval-traverse-hd-29',
  'rw-i9-157': 'rw-industrynine-enduro-s-29-157',
  'rw-dt275': 'rw-dtswiss-e-1900-275',
  'rw-hope': 'rw-hope-fortus-30-29',
  'rw-wao': 'rw-weareone-union-29',
  'rw-cb': 'rw-crankbrothers-synthesis-enduro-29',
  'rw-enve': 'rw-enve-am30-29',
  'rw-zipp': 'rw-zipp-3zero-moto-29',
  'rw-newmen': 'rw-newmen-advanced-sl-a30-29',
  'rw-stans': 'rw-stans-flow-ex3-29',
  'rw-hunt': 'rw-hunt-enduro-wide-29',
  'rw-spank': 'rw-spank-359-29',
  'rw-mt500': 'rw-shimano-mt510-29',
  'rw-rf': 'rw-raceface-turbine-sl-29',
  'rw-bontrager': 'rw-bontrager-line-pro-30-29',
  'rw-mavic': 'rw-mavic-deemax-29',
  'rw-giant': 'rw-giant-trx-0-29',
  'ti-assegai-29': 'ti-maxxis-assegai-29-25-exop-mg',
  'ti-dhr-29': 'ti-maxxis-minion-dhr-ii-29-24-exop-mt',
  'ti-kryp-29': 'ti-continental-kryptotal-fr-29-24-enduro-soft',   // flattened: canonicalId is single-hop
  'ti-mary-29': 'ti-schwalbe-magic-mary-29-24-sg-as',   // flattened
  'ti-assegai-275': 'ti-maxxis-assegai-275-25-exop-mg',
  'ti-dhr-275': 'ti-maxxis-minion-dhr-ii-275-24-exop-mt',
  'ti-dhf-29': 'ti-maxxis-minion-dhf-29-25-exop-mg',
  'ti-betty-29': 'ti-schwalbe-big-betty-29-24-st-as',   // flattened
  'ti-wild-29': 'ti-michelin-wild-enduro-mh-29-24',
  'ti-scorpion-29': 'ti-pirelli-scorpion-enduro-s-29-24-hw-sgg',   // flattened
  'ti-kryp-275': 'ti-continental-kryptotal-re-275-24-enduro-soft',   // flattened
  'ti-dissector-29': 'ti-maxxis-dissector-29-24-exop-mt',
  'ti-hr2-29': 'ti-maxxis-high-roller-ii-29-25-dd-mt',   // flattened
  'ti-shorty-29': 'ti-maxxis-shorty-29-24-dd-mg',        // flattened
  'ti-butcher-29': 'ti-specialized-butcher-t9-29-23',
  'ti-hansdampf-29': 'ti-schwalbe-hans-dampf-29-235-sg-as',   // flattened
  'ti-argotal-29': 'ti-continental-argotal-29-24-enduro-soft',   // flattened
  'ti-mazza-29': 'ti-vittoria-mazza-29-24-enduro-4c',   // flattened
  'ti-mary-275': 'ti-schwalbe-magic-mary-275-24-sg-as',   // flattened
  'ti-aggressor-29': 'ti-maxxis-aggressor-29-23-dd-dual',   // flattened
  'ti-vigilante-29': 'ti-wtb-vigilante-29-25-sg2-tritec',   // flattened
  'ti-judge-29': 'ti-wtb-judge-29-24-sg1-tritec',           // flattened
  'ti-hellkat-29': 'ti-kenda-hellkat-29-24-aec-dl',              // flattened
  'ti-newton-29': 'ti-goodyear-newton-mtf-29-25-enduro-grip3s',  // flattened
  'ti-dh22-29': 'ti-michelin-dh22-29-24',
  'sft-gx-t': 'sft-sram-gx-transmission',
  'sft-gx-m': 'sft-sram-gx-eagle',
  'sft-xt': 'sft-shimano-xt-m8100',
  'sft-slx': 'sft-shimano-slx-m7100',
  'sft-x0-t': 'sft-sram-x0-transmission',
  'sft-xx-t': 'sft-sram-xx-sl-transmission',
  'sft-nx': 'sft-sram-nx-eagle',
  'sft-xtr': 'sft-shimano-xtr-m9100',
  'sft-deore': 'sft-shimano-deore-m6100',
  'sft-gx-axs': 'sft-sram-gx-eagle-axs',
  'dr-gx-t': 'dr-sram-gx-transmission',
  'dr-gx-m': 'dr-sram-gx-eagle',
  'dr-xt': 'dr-shimano-xt-m8100-sgs',
  'dr-slx': 'dr-shimano-slx-m7100-sgs',
  'dr-x0-t': 'dr-sram-x0-transmission',
  'dr-xx-t': 'dr-sram-xx-transmission',
  'dr-nx': 'dr-sram-nx-eagle',
  'dr-x01': 'dr-sram-x01-eagle',
  'dr-xtr': 'dr-shimano-xtr-m9100-sgs',
  'dr-deore': 'dr-shimano-deore-m6100-sgs',
  'dr-gx-axs': 'dr-sram-gx-eagle-axs',
  'ca-sram-t': 'ca-sram-xs1275',
  'ca-sram-e': 'ca-sram-xg1275',
  'ca-xt': 'ca-shimano-xt-m8100-1051',
  'ca-slx': 'ca-shimano-slx-m7100-1051',
  'ca-xx-t': 'ca-sram-xs1299',
  'ca-x01': 'ca-sram-xg1295',
  'ca-nx': 'ca-sram-pg1230',
  'ca-xtr': 'ca-shimano-xtr-m9100-1051',
  'ca-deore': 'ca-shimano-deore-m6100-1051',
  'ch-flattop': 'ch-sram-gx-flattop',
  'ch-eagle': 'ch-sram-gx-eagle',
  'ch-shimano': 'ch-shimano-xt-m8100',
  'ch-x01': 'ch-sram-x01-eagle',
  'ch-xtr': 'ch-shimano-xtr-m9100',
  'ch-deore': 'ch-shimano-deore-m6100',
  'cr-gx': 'cr-sram-gx-eagle',
  'cr-x0t': 'cr-sram-x0-transmission',
  'cr-xt': 'cr-shimano-xt-m8100',
  'cr-rf': 'cr-raceface-aeffect-r',
  'cr-x0': 'cr-sram-x01-eagle',
  'cr-slx': 'cr-shimano-slx-m7100',
  'cr-xx-t': 'cr-sram-xx-sl-transmission',
  'cr-nx': 'cr-sram-nx-eagle',
  'cr-xtr': 'cr-shimano-xtr-m9100',
  'cr-deore': 'cr-shimano-deore-m6100',
  'cr-e13': 'cr-ethirteen-trs-race-carbon',   // 2026-07-08: re-pointed past the cr-ethirteen-plus retirement (canonicalId is single-hop, no chaining)
  'cr-eewings': 'cr-canecreek-eewings-allmountain',
  'bk-code': 'bk-sram-code-rsc',
  'bk-code-s': 'bk-sram-code-stealth',
  'bk-xt': 'bk-shimano-xt-m8120',
  'bk-dominion': 'bk-hayes-dominion-a4',
  'bk-mt7': 'bk-magura-mt7',
  'bk-slx': 'bk-shimano-slx-m7120',
  'bk-maven': 'bk-sram-maven-ultimate',
  'bk-hope': 'bk-hope-tech-4-v4',
  'bk-trp': 'bk-trp-dhr-evo',
  'bk-cura': 'bk-formula-cura-4',
  'bk-saint': 'bk-shimano-saint-m820',
  'bk-xtr': 'bk-shimano-xtr-m9120',
  'bk-zee': 'bk-shimano-zee-m640',
  'bk-mt5': 'bk-magura-mt5',
  'bk-g2': 'bk-sram-g2-rsc',
  'bk-hope-e4': 'bk-hope-tech-4-e4',
  'bk-trail-evo': 'bk-trp-trail-evo',
  'bk-trickstuff': 'bk-trickstuff-maxima',
  'bk-db8': 'bk-sram-db8',
  'bk-deore-4': 'bk-shimano-deore-m6120',
  'bk-mt-trail': 'bk-magura-mt-trail-sport',
  'ro-hs2-200': 'ro-sram-hs2-200-6b',
  'ro-hs2-220': 'ro-sram-hs2-220-6b',
  'ro-cl-203': 'ro-shimano-rtmt800-203-cl',
  'ro-cl-180': 'ro-shimano-rtmt800-180-cl',
  'ro-6b-203': 'ro-hayes-dseries-203-6b',
  'ro-6b-220': 'ro-galfer-223-6b',
  'ro-galfer-220-6b': 'ro-galfer-223-6b',
  'ro-hope-203': 'ro-hope-floating-203-6b',
  'ro-magura-203': 'ro-magura-mdrp-203-6b',
  'ro-cl-220': 'ro-shimano-rtmt900-203-cl',
  'ro-shimano-rtmt900-220-cl': 'ro-shimano-rtmt900-203-cl',
  'ro-hs2-180': 'ro-sram-hs2-180-6b',
  'ro-rt76-203': 'ro-shimano-smrt76-203-6b',
  'ro-trp-203': 'ro-trp-203-6b',
  'ro-magura-220': 'ro-magura-mdrp-220-6b',
  'ro-hope-220': 'ro-hope-floating-220-6b',
  'ro-centerline-180': 'ro-sram-centerline-180-cl',
  'ro-trickstuff-203': 'ro-trickstuff-dachle-203-6b',
  'ro-formula-220': 'ro-formula-220-6b',
  'hb-fatbar': 'hb-renthal-fatbar-35',
  'hb-oneup': 'hb-oneup-carbon-35',
  'hb-pnw': 'hb-pnw-range-318',
  'hb-rf': 'hb-raceface-next-r-35',
  'hb-burgtec': 'hb-burgtec-ridewide-enduro-35',
  'hb-deity': 'hb-deity-skywire-35',
  'hb-spank': 'hb-spank-spike-800-318',
  'hb-oneup-alu': 'hb-oneup-aluminum-35',
  'hb-title': 'hb-title-ah2-35',
  'hb-chromag': 'hb-chromag-fubars-osx-318',
  'hb-nukeproof': 'hb-nukeproof-horizon-v2-35',
  'hb-easton': 'hb-easton-haven-35',
  'hb-answer': 'hb-answer-protaper-35',
  'hb-pro': 'hb-pro-tharsis-35',
  'hb-truvativ': 'hb-truvativ-descendant-35',
  'st-apex': 'st-renthal-apex-35',
  'st-oneup': 'st-oneup-stem-35',
  'st-pnw': 'st-pnw-range-318',
  'st-rf': 'st-raceface-aeffect-r-35',
  'st-burgtec': 'st-burgtec-enduro-mk3-35',
  'st-deity': 'st-deity-copperhead-35',
  'st-spank': 'st-spank-spike-318',
  'st-chromag': 'st-chromag-ranger-v2-35',
  'st-nukeproof': 'st-nukeproof-horizon-35',
  'st-hope': 'st-hope-am-35',
  'st-i9': 'st-industrynine-a35',
  'st-thomson': 'st-thomson-elite-x4-318',
  'st-funn': 'st-funn-rsx-35',
  'st-straitline': 'st-straitline-318',
  'st-straitline-35': 'st-straitline-318',
  'st-pro': 'st-pro-tharsis-35',
  'gr-oneup': 'gr-oneup-lockon',
  'gr-esi': 'gr-esi-chunky',
  'gr-pnw': 'gr-pnw-loam',
  'gr-odi': 'gr-odi-elite-pro',
  'gr-ergon': 'gr-ergon-ge1-evo',
  'gr-dmr': 'gr-dmr-deathgrip',
  'gr-chromag': 'gr-chromag-squarewave',
  'gr-sensus': 'gr-sensus-swayze',
  'gr-renthal': 'gr-renthal-traction',
  'gr-lizard': 'gr-lizardskins-charger-evo',
  'gr-wtb': 'gr-wtb-wafflegrip',
  'gr-rf': 'gr-raceface-half-nelson',
  'gr-deity': 'gr-deity-knuckleduster',
  'gr-sdg': 'gr-sdg-slater',
  'gr-supacaz': 'gr-supacaz-grizips',
  'dp-reverb': 'dp-rockshox-reverb-axs-316-170',
  'dp-oneup': 'dp-oneup-v3-316-210',
  'dp-transfer': 'dp-fox-transfer-factory-316-180',
  'dp-fox-transfer-factory-316-175': 'dp-fox-transfer-factory-316-180',
  'dp-revive': 'dp-bikeyoke-revive-316-185',
  'dp-pnw': 'dp-pnw-loam-309-175',
  'dp-oneup-349': 'dp-oneup-v3-349-210',
  'dp-resolve': 'dp-wolftooth-resolve-316-200',
  'dp-highline': 'dp-crankbrothers-highline-7-316-170',
  'dp-revive-349': 'dp-bikeyoke-revive-349-185',
  'dp-transfer-neo': 'dp-fox-transfer-neo-316-175',
  'dp-fallline': 'dp-9point8-fall-line-r-316-175',
  'dp-kslev': 'dp-ks-lev-integra-316-175',
  'dp-pnw-349': 'dp-pnw-loam-349-200',
  'dp-tellis': 'dp-sdg-tellis-316-170',
  'dp-rf': 'dp-raceface-turbine-r-316-175',
  'dp-e13': 'dp-ethirteen-vario-infinite-316-180',
  'dp-command': 'dp-specialized-command-post-309-160',
  'sa-volt': 'sa-wtb-volt',
  'sa-ergon': 'sa-ergon-sm-enduro',
  'sa-bridge': 'sa-specialized-bridge',
  'sa-belair': 'sa-sdg-belair-v3',
  'sa-fizik': 'sa-fizik-terra-aidon-x3',
  'sa-silverado': 'sa-wtb-silverado',
  'sa-scoop': 'sa-fabric-scoop-radius',
  'sa-radar': 'sa-sdg-radar',
  'sa-prologo': 'sa-prologo-dimension',
  'sa-alpaca': 'sa-fizik-terra-alpaca',
  'sa-rf': 'sa-raceface-aeffect',
  'sa-chromag': 'sa-chromag-trailmaster',
  'sa-bontrager': 'sa-bontrager-arvada',
  'sa-selle': 'sa-selleitalia-model-x',
  'sa-pnw': 'sa-pnw-loam',
  'sa-dmr': 'sa-dmr-oioi',
  'pd-oneup-al': 'pd-oneup-aluminum',
  'pd-oneup-comp': 'pd-oneup-composite',
  'pd-chester': 'pd-raceface-chester',
  'pd-atlas': 'pd-raceface-atlas',
  'pd-stamp7': 'pd-crankbrothers-stamp-7-large',
  'pd-mallet-e': 'pd-crankbrothers-mallet-enduro',
  'pd-speciale': 'pd-time-speciale-12-large',
  'pd-xt': 'pd-shimano-xt-m8120',
  'pd-saint': 'pd-shimano-saint-m820',
  'pd-tmac': 'pd-deity-tmac',
  'pd-vault': 'pd-dmr-vault',
  'pd-dagga': 'pd-chromag-dagga',
  'pd-horizon': 'pd-nukeproof-horizon-pro',
  'pd-f22': 'pd-hope-f22',
  'pd-loam': 'pd-pnw-loam',
  'pd-stamp1': 'pd-crankbrothers-stamp-1',
  'gs-gx-t': 'gs-sram-gx-transmission',
  'gs-gx-m': 'gs-sram-gx-eagle',
  'gs-xt': 'gs-shimano-xt-m8100',
  'gs-slx': 'gs-shimano-slx-m7100',
  'ws-dt': 'ws-dtswiss-ex-1700-29',
  'ws-reserve': 'ws-reserve-30-hd-29',
  'ws-i9': 'ws-industrynine-enduro-s-29',
  'ws-roval': 'ws-roval-traverse-hd-29',
  'ws-dt275': 'ws-dtswiss-e-1900-275',
  'bs-code': 'bs-sram-code-rsc',
  'bs-xt': 'bs-shimano-xt-m8120',
  'bs-dominion': 'bs-hayes-dominion-a4',
  'co-renthal': 'co-renthal-fatbar-apex',
  'co-oneup': 'co-oneup-carbon',
  'co-pnw': 'co-pnw-range',
  /* 2026-07-07 tire-verification pinning: generic tire rows retired into their
     verified per-SKU configs (casing/compound pinned per the flat-SKU model). */
  'ti-continental-kryptotal-29-24': 'ti-continental-kryptotal-fr-29-24-enduro-soft',
  'ti-continental-kryptotal-275-24': 'ti-continental-kryptotal-re-275-24-enduro-soft',
  'ti-continental-argotal-29-24': 'ti-continental-argotal-29-24-enduro-soft',
  'ti-schwalbe-magic-mary-29-24': 'ti-schwalbe-magic-mary-29-24-sg-as',
  'ti-schwalbe-magic-mary-275-24': 'ti-schwalbe-magic-mary-275-24-sg-as',
  'ti-schwalbe-big-betty-29-24': 'ti-schwalbe-big-betty-29-24-st-as',
  'ti-schwalbe-hans-dampf-29-235': 'ti-schwalbe-hans-dampf-29-235-sg-as',
  'ti-pirelli-scorpion-enduro-29-25': 'ti-pirelli-scorpion-enduro-s-29-24-hw-sgg',
  'ti-maxxis-high-roller-ii-29-24': 'ti-maxxis-high-roller-ii-29-25-dd-mt',
  'ti-maxxis-shorty-29-25': 'ti-maxxis-shorty-29-24-dd-mg',
  'ti-maxxis-aggressor-29-23': 'ti-maxxis-aggressor-29-23-dd-dual',
  'ti-vittoria-mazza-29-24': 'ti-vittoria-mazza-29-24-enduro-4c',
  'ti-wtb-vigilante-29-25': 'ti-wtb-vigilante-29-25-sg2-tritec',
  'ti-wtb-judge-29-24': 'ti-wtb-judge-29-24-sg1-tritec',
  'ti-kenda-hellkat-29-24': 'ti-kenda-hellkat-29-24-aec-dl',
  'ti-goodyear-newton-mtf-29-24': 'ti-goodyear-newton-mtf-29-25-enduro-grip3s',
  'sh-rockshox-super-deluxe-coil-230x65': 'sh-rockshox-super-deluxe-coil-ultimate-230x65'
};
/** Resolve a possibly-legacy part id to its current catalog id.
 * @param {string|null|undefined} id @returns {string|null|undefined} */
function canonicalId(id){ return (id && Object.prototype.hasOwnProperty.call(ALIASES, id)) ? ALIASES[id] : id; }

/* ---- lookups ------------------------------------------------------------- */
/** @param {string|null|undefined} id @returns {Part|null} */
function byId(id){ for (var i=0;i<PARTS.length;i++){ if (PARTS[i].id===id) return PARTS[i]; } return null; }
/** @param {Part|null|undefined} p @returns {string} */
function nameOf(p){ return p ? (p.brand+' '+p.model) : ''; }

/* ---- short spec line for a part ----------------------------------------- */
/** @param {Part} p @returns {string} */
function specSummary(p){
  switch(p.cat){
    case 'frame': return p.wheelConfigs.map(function(w){return L(w);}).join(' / ')
      +(p.suspension==='hardtail'
        ? ' . hardtail . '+L(p.rearAxle)
        : ' . '+p.travel+'mm . '+L(p.rearAxle)+' . shock '+p.shockEye+'x'+p.shockStroke+' '+L(p.shockMount))
      +(p.udh?' . UDH':'');
    case 'fork': return L(p.wheel)+' . '+p.travel+'mm . '+L(p.axle)+' . '+L(p.steerer);
    case 'shock': return p.eye+'x'+p.stroke+' . '+L(p.mount)+' . '+p.spring+(p.oemOnly?' . OEM-only':'');
    case 'frontwheel': return L(p.wheel)+' . '+L(p.hub)+' . '+L(p.rotorMount)+' . '+p.intWidth+'mm';
    case 'rearwheel': return L(p.wheel)+' . '+L(p.hub)+' . '+L(p.freehub)+' . '+L(p.rotorMount);
    case 'fronthub': return L(p.hub)+' . '+L(p.rotorMount);
    case 'rearhub': return L(p.hub)+' . '+L(p.freehub)+' . '+L(p.rotorMount);
    case 'rim': return L(p.wheel)+' . '+p.intWidth+'mm . max '+p.maxTire+'in';
    case 'tire': return L(p.wheel)+' . '+p.width+'in'+(p.casing?' . '+L(p.casing):'')+(p.compound?' . '+L(p.compound):'');
    case 'shifter': return L(p.system)+' . '+p.speeds+'s . '+L(p.actuation)+(p.clampType?' . '+L(p.clampType):'');
    case 'derailleur': return L(p.system)+' . '+p.speeds+'s . '+L(p.actuation)+' . '+p.maxCog+'T max . '+L(p.mount);
    case 'cassette': return L(p.freehub)+' . '+p.minCog+'-'+p.maxCog+'T . '+p.speeds+'s';   // range string derived, never stored
    case 'chain': return L(p.system)+' . '+p.speeds+'s';
    case 'crankset': return L(p.bb)+(typeof p.ring==='number'?' . '+p.ring+'T':'')+' . '+p.speeds+'s . '
      +(p.ringStd ? L(p.ringStd)+' ring' : 'ring sold separately');
    case 'brake': return L(p.mount)+' . '+p.pistons+'-piston'
      +(p.leverAccepts && p.leverAccepts.length ? ' . '+p.leverAccepts.map(function(c){return L(c);}).join('/') : '');
    case 'rotor': return p.size+'mm . '+L(p.mount);
    case 'handlebar': return p.clamp+'mm clamp . '+p.width+'mm . '+p.material;
    case 'stem': return p.clamp+'mm clamp . '+p.length+'mm';
    case 'grips': return 'grips';   // honest: an attach field (lock-on/slide-on) is on the capture list; 'lock-on' was false for slide-on silicone grips
    case 'dropper': return p.diameter+'mm . '+p.drop+'mm drop';
    case 'saddle': return 'saddle';
    case 'pedal': return L(p.style)+' . pair';
    case 'groupset': case 'wheelset': case 'brakeset': case 'cockpitset': return p.desc || 'preset';
    default: return '';
  }
}

/* =============================================================================
   COMPATIBILITY ENGINE -> { errors, warnings, infos }
   build keyed by SLOT (frame, fork, shock, frontWheel, rearWheel, frontTire,
   rearTire, ...) -> part object.
   ========================================================================== */
/* Structured verdicts (DATA-MODEL-REVIEW 5.1-18): every finding carries a
   stable ruleId + the slot keys involved, replacing string identity. The
   REVIEW.md #4/#13 maskings were BYTE-IDENTICAL STRINGS raised by different
   conflicts; the dots now diff on verdictKey (ruleId+slots+msg), which cannot
   collide across different slot sets. msg stays the display string (and
   toString), so the UI/report code keeps interpolating verdicts unchanged.
   `fix` is reserved for the "fits with adapter X" tier - adapter facts are
   properties of standards PAIRS and belong in a future engine-side table,
   never on parts. */
/** @typedef {import('./types.js').Verdict} VerdictShape */
/** @constructor @param {string} ruleId @param {string[]} slots @param {string} msg @param {{kind: string, name: string}} [fix] */
function Verdict(ruleId, slots, msg, fix){ this.ruleId=ruleId; this.slots=slots; this.msg=msg; this.fix=fix; }
Verdict.prototype.toString = function(){ return this.msg; };
/** Identity for conflict diffing. @param {VerdictShape} v @returns {string} */
function verdictKey(v){ return v.ruleId+'|'+v.slots.join('+')+'|'+v.msg; }

/* Input guard (pass-4 regression, 2026-07-08): checkBuild/buildTotals take a
   map of slotKey -> resolved Part OBJECT. A caller passing id STRINGS used to
   trip no rule at all - every field read on a string is undefined - so a
   rotor-mismatch build came back 0 errors / 0 warnings: a silent false
   all-clear, the one verdict this product must never give. String values now
   resolve through canonicalId()+byId() (the same forgiving-input path as
   ALIASES and share links); a string that matches no catalog part THROWS,
   because dropping it would just re-create the silent green. */
/** @param {Build|Object.<string, Part|string|null|undefined>|null|undefined} build @returns {Build} */
function resolveBuild(build){
  var src = build || {};
  /** @type {Build} */ var out = {};
  Object.keys(src).forEach(function(k){
    var v = src[k];
    if(typeof v === 'string'){
      var p = byId(canonicalId(v));
      if(!p) throw new TypeError('build.'+k+' is the string "'+v+'", which matches no catalog part id - pass part objects (byId(id)), not ids.');
      out[k] = p;
    } else if(v){
      out[k] = v;
    }
  });
  return out;
}

/* Build-your-own-wheel support (fronthub/rearhub/rim, additive alongside the
   complete frontwheel/rearwheel parts - see GROUPS' `altOf` tag). Every rule
   below reads the front/rear wheel's fields off ONE local (fW/rW); this
   resolver is the single pivot point that lets those rules stay unchanged
   whether the user picked a complete wheel or a hub+rim pair. Returns null if
   neither path is fully filled - callers already treat a missing wheel as
   "nothing to check yet". */
/** @param {Build} b @param {'front'|'rear'} side @returns {EffectiveWheel|null} */
function effectiveWheel(b, side){
  if(side==='front'){
    if(b.frontWheel) return b.frontWheel;
    var fh=b.frontHub, fr=b.frontRim;
    if(!fh || !fr) return null;
    return { wheel:fr.wheel, hub:fh.hub, rotorMount:fh.rotorMount, intWidth:fr.intWidth, maxTire:fr.maxTire };
  }
  if(b.rearWheel) return b.rearWheel;
  var rh=b.rearHub, rr=b.rearRim;
  if(!rh || !rr) return null;
  return { wheel:rr.wheel, hub:rh.hub, freehub:rh.freehub, rotorMount:rh.rotorMount, intWidth:rr.intWidth, maxTire:rr.maxTire };
}

/** @param {Build} build @returns {CompatResult} */
function checkBuild(build){
  /** @type {VerdictShape[]} */ var errors=[];
  /** @type {VerdictShape[]} */ var warnings=[];
  /** @type {VerdictShape[]} */ var infos=[];
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function err(ruleId, slots, msg){ errors.push(new Verdict(ruleId, slots, msg)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg @param {{kind: string, name: string}} [fix] */
  function warn(ruleId, slots, msg, fix){ warnings.push(new Verdict(ruleId, slots, msg, fix)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function info(ruleId, slots, msg){ infos.push(new Verdict(ruleId, slots, msg)); }
  /** @type {Build} */ var b = resolveBuild(build);
  var frame=b.frame, fork=b.fork, shock=b.shock, fW=effectiveWheel(b,'front'), rW=effectiveWheel(b,'rear'), fTire=b.frontTire, rTire=b.rearTire,
      shifter=b.shifter, derailleur=b.derailleur, cassette=b.cassette, chain=b.chain, crankset=b.crankset,
      fBrake=b.frontBrake, rBrake=b.rearBrake, fRotor=b.frontRotor, rRotor=b.rearRotor,
      bar=b.handlebar, stem=b.stem, dropper=b.dropper;

  /* 1. Wheel sizing: front group + rear group must each be consistent, and the
        front/rear combo must match a config the frame supports (incl. mullet). */
  /** list entries: [display label, wheel size, slot key]
   * @param {string[][]} list @param {string} label @param {string} ruleId @returns {string|null} */
  function sizeOf(list, label, ruleId){
    if(!list.length) return null;
    var ref=list[0][1];
    if(list.some(function(s){ return s[1]!==ref; })){ err(ruleId, list.map(function(s){ return s[2]; }), label+' wheel size mismatch: '+list.map(function(s){ return s[0]+' '+L(s[1]); }).join(', ')+'.'); return null; }
    return ref;
  }
  var frontList=/** @type {string[][]} */([]); if(fork) frontList.push(['Fork',fork.wheel,'fork']); if(fW) frontList.push(['Front wheel',fW.wheel,'frontWheel']); if(fTire) frontList.push(['Front tire',fTire.wheel,'frontTire']);
  var rearList=/** @type {string[][]} */([]);  if(rW) rearList.push(['Rear wheel',rW.wheel,'rearWheel']); if(rTire) rearList.push(['Rear tire',rTire.wheel,'rearTire']);
  var frontSize=sizeOf(frontList,'Front','front-wheel-size'), rearSize=sizeOf(rearList,'Rear','rear-wheel-size');
  if(frame && (frontSize || rearSize)){
    var configs = frame.wheelConfigs || [];
    var okCfg = configs.some(function(cfg){ var c=WHEEL_CONFIG[cfg]; return c && (!frontSize||frontSize===c.front) && (!rearSize||rearSize===c.rear); });
    if(!okCfg) err('wheel-config', ['frame'].concat(frontList.concat(rearList).map(function(s){ return s[2]; })), 'Unsupported wheel setup: '+nameOf(frame)+' supports '+configs.map(function(w){return L(w);}).join(' / ')+', but this build is front '+(frontSize?L(frontSize):'(any)')+' / rear '+(rearSize?L(rearSize):'(any)')+'.');
  }
  /* Frameless guard (REVIEW.md #18): with BOTH ends known and no frame picked,
     reject a pair that satisfies no config in the model - a reverse mullet
     (27.5 front / 29 rear) fits nothing in the model or in reality. A legit
     in-progress mullet (29 front / 27.5 rear) matches 'mullet' and stays
     silent - verified against every real config. */
  if(!frame && frontSize && rearSize){
    var anyCfg = Object.keys(WHEEL_CONFIG).some(function(cfg){ var c=WHEEL_CONFIG[cfg]; return frontSize===c.front && rearSize===c.rear; });
    if(!anyCfg) err('wheel-config', frontList.concat(rearList).map(function(s){ return s[2]; }), 'Unsupported wheel setup: front '+L(frontSize)+' / rear '+L(rearSize)+' matches no configuration (29/29, 27.5/27.5, or mullet = 29 front / 27.5 rear).');
  }

  /* 2. Axles */
  if(fork && fW && fork.axle!==fW.hub) err('front-axle', ['fork','frontWheel'], 'Front axle mismatch: Fork is '+L(fork.axle)+' but Front wheel hub is '+L(fW.hub)+'.');
  if(frame && rW && frame.rearAxle!==rW.hub) err('rear-axle', ['frame','rearWheel'], 'Rear axle mismatch: Frame is '+L(frame.rearAxle)+' but Rear wheel hub is '+L(rW.hub)+'.');

  /* 3. Drivetrain: one system + one speed */
  /** @type {Array<[string, DrivetrainPart]>} */
  var dt=[];
  if(shifter) dt.push(['Shifter',shifter]); if(derailleur) dt.push(['Derailleur',derailleur]);
  if(cassette) dt.push(['Cassette',cassette]); if(chain) dt.push(['Chain',chain]);
  var dtSlots=dt.map(function(x){ return x[0].toLowerCase(); });   // slot keys happen to equal the lowercased labels
  if(dt.length>1){
    var systems=dt.map(function(x){return x[1].system;}).filter(function(v,i,a){return a.indexOf(v)===i;});
    if(systems.length>1) err('drivetrain-system', dtSlots, 'Drivetrain mismatch: '+dt.map(function(x){return x[0]+' = '+L(x[1].system);}).join(', ')+'. Shifter, derailleur, cassette and chain must be one system.');
    var speeds=dt.map(function(x){return x[1].speeds;}).filter(function(v,i,a){return a.indexOf(v)===i;});
    if(speeds.length>1) err('drivetrain-speeds', dtSlots, 'Speed mismatch: '+dt.map(function(x){return x[0]+' '+x[1].speeds+'s';}).join(', ')+'. All must be the same speed count.');
  }
  /* 3b. Actuation: a cable trigger cannot control a wireless (AXS) derailleur and
        an AXS controller cannot pull a cable - no adapter exists. Checked as its
        own field because `system` is genuinely shared across the divide (Eagle
        cassettes/chains fit both mechanical and AXS Eagle), so splitting the
        system vocab would false-red them (REVIEW.md #1). */
  if(shifter && derailleur && shifter.actuation!==derailleur.actuation)
    err('actuation', ['shifter','derailleur'], 'Actuation mismatch: '+nameOf(shifter)+' is '+L(shifter.actuation)+' but '+nameOf(derailleur)+' is '+L(derailleur.actuation)+'. A cable shifter cannot control a wireless derailleur (and vice versa).');
  /* 3c. Chainring standard: SRAM documents T-Type Flattop chains (unique link
        shape, pin size, larger rollers) as NOT compatible with non-T-Type rings.
        One-directional on purpose - T-Type rings ARE backward-compatible with
        Eagle chains, so the reverse must stay silent (REVIEW.md #2).
        ringStd:null = armset-only crank, ring user-fitted (eeWings, Race Face
        armsets): no ring to clash with, so it gets an INFO, not a false red. */
  if(chain && crankset && chain.system==='sram-transmission'){
    if(crankset.ringStd===null)
      info('chainring-standard', ['chain','crankset'], 'Chainring: '+nameOf(crankset)+' is sold without a chainring - fit a T-Type (8-bolt) ring to run the '+nameOf(chain)+'.');
    else if(crankset.ringStd!=='t-type')
      err('chainring-standard', ['chain','crankset'], 'Chainring mismatch: '+nameOf(chain)+' is a T-Type Flattop chain, but '+nameOf(crankset)+' has a '+L(crankset.ringStd)+' chainring. SRAM documents Flattop chains as incompatible with non-T-Type rings.');
  }

  /* 4. SRAM Transmission needs a UDH frame */
  if(derailleur && derailleur.mount==='udh-direct'){
    if(frame && !frame.udh) err('udh', ['frame','derailleur'], 'Frame not UDH: '+nameOf(derailleur)+' is a direct-mount (UDH) Transmission derailleur, but '+nameOf(frame)+' has a standard hanger.');
    else if(!frame) info('udh', ['derailleur'], 'Heads-up: '+nameOf(derailleur)+' is a Transmission derailleur and needs a UDH / Transmission-compatible frame.');
  }

  /* 5. Cassette range vs derailleur capacity */
  if(cassette && derailleur && cassette.maxCog>derailleur.maxCog) err('cassette-capacity', ['cassette','derailleur'], 'Cassette too big: '+cassette.maxCog+'T cassette exceeds the '+nameOf(derailleur)+' max of '+derailleur.maxCog+'T.');

  /* 6. Freehub: cassette vs rear wheel */
  if(cassette && rW && cassette.freehub!==rW.freehub) err('freehub', ['cassette','rearWheel'], 'Freehub mismatch: '+nameOf(cassette)+' needs a '+L(cassette.freehub)+' freehub, but Rear wheel has '+L(/** @type {string} */ (rW.freehub))+'.');

  /* 7. Crank / BB advisory */
  if(crankset && frame) info('bb-advisory', ['crankset','frame'], 'Bottom bracket: '+nameOf(crankset)+' uses a '+L(crankset.bb)+' spindle - pair it with the right BB for this frame\'s '+L(frame.bb)+' shell (BB usually sold separately).');

  /* 8. Brake caliper mounts */
  if(fBrake && fork && fBrake.mount!==fork.brakeMount) err('front-brake-mount', ['frontBrake','fork'], 'Front brake mount mismatch: Brake is '+L(fBrake.mount)+' but Fork is '+L(fork.brakeMount)+'.');
  if(rBrake && frame && rBrake.mount!==frame.brakeMount) err('rear-brake-mount', ['rearBrake','frame'], 'Rear brake mount mismatch: Brake is '+L(rBrake.mount)+' but Frame is '+L(frame.brakeMount)+'.');

  /* 9. Rotor interface vs wheel hubs - DIRECTION-AWARE (REVIEW.md #10): a
        6-bolt rotor mounts on a Center Lock hub with the hub maker's own
        adapter (Shimano SM-RTAD05/RTAD10 - one-piece rotors only), an
        everyday shop fix -> warning carrying the adapter as a structured
        `fix` (the first use of the reserved adapter tier). The reverse -
        a Center Lock rotor on a 6-bolt hub - has no adapter -> error. */
  if(fRotor && fW && fRotor.mount!==fW.rotorMount){
    if(fRotor.mount==='sixbolt' && fW.rotorMount==='CL')
      warn('front-rotor-interface', ['frontRotor','frontWheel'], 'Front rotor: 6-bolt rotor on a Center Lock front hub needs a Center Lock adapter (e.g. Shimano SM-RTAD05; fits one-piece rotors only).', {kind:'adapter', name:'Shimano SM-RTAD05'});
    else
      err('front-rotor-interface', ['frontRotor','frontWheel'], 'Front rotor interface mismatch: '+L(fRotor.mount)+' rotor on '+L(fW.rotorMount)+' front hub - no adapter exists for this direction.');
  }
  if(rRotor && rW && rRotor.mount!==rW.rotorMount){
    if(rRotor.mount==='sixbolt' && rW.rotorMount==='CL')
      warn('rear-rotor-interface', ['rearRotor','rearWheel'], 'Rear rotor: 6-bolt rotor on a Center Lock rear hub needs a Center Lock adapter (e.g. Shimano SM-RTAD05; fits one-piece rotors only).', {kind:'adapter', name:'Shimano SM-RTAD05'});
    else
      err('rear-rotor-interface', ['rearRotor','rearWheel'], 'Rear rotor interface mismatch: '+L(rRotor.mount)+' rotor on '+L(rW.rotorMount)+' rear hub - no adapter exists for this direction.');
  }

  /* 10. Rotor size vs frame/fork max (warnings) - plus MINIMUM vs the fork's
        native mount (error). Post-mount adapters only space the caliper UP, so
        a rotor below the fork's native mount size is physically unmountable -
        no adapter exists. minRotorF is optional per the rule-18 dormant-until-
        sourced template: populated only from fetched manufacturer specs
        (REVIEW.md #3). */
  if(fRotor && fork && fRotor.size>fork.maxRotorF) warn('front-rotor-max', ['frontRotor','fork'], 'Front rotor: '+fRotor.size+'mm exceeds the fork max of '+fork.maxRotorF+'mm.');
  if(rRotor && frame && rRotor.size>frame.maxRotorR) warn('rear-rotor-max', ['rearRotor','frame'], 'Rear rotor: '+rRotor.size+'mm exceeds the frame max of '+frame.maxRotorR+'mm.');
  if(fRotor && fork && typeof fork.minRotorF==='number' && fRotor.size<fork.minRotorF)
    err('front-rotor-min', ['frontRotor','fork'], 'Front rotor too small: '+fRotor.size+'mm is below the '+nameOf(fork)+' minimum of '+fork.minRotorF+'mm (its native mount size). Post-mount adapters only space the caliper up, so no adapter can make a smaller rotor fit.');

  /* 11. Steerer / headset */
  if(fork && frame && fork.steerer!==frame.headset) err('steerer', ['fork','frame'], 'Steerer mismatch: Fork is '+L(fork.steerer)+' but Frame headset is '+L(frame.headset)+'.');

  /* 12. Fork travel vs frame rating (warning). "Rated max", not "recommended":
        makers publish it as a rated limit and exceeding it can void the frame
        warranty (REVIEW.md #6 wording fix). */
  if(fork && frame && fork.travel>frame.maxForkTravel) warn('fork-travel', ['fork','frame'], 'Fork travel: '+fork.travel+'mm exceeds the frame\'s rated max of '+frame.maxForkTravel+'mm.');
  /* 12b. UNDER-forking (REVIEW.md #14) - dormant until a frame carries a
        maker-published minForkTravel (~1 degree head-angle steepening per
        20mm). Sourced data only: a travel-based heuristic would false-fire
        on high-pivot frames (Dreadnought: 154mm travel, ships at 170). */
  if(fork && frame && typeof frame.minForkTravel==='number' && fork.travel<frame.minForkTravel)
    warn('fork-travel-min', ['fork','frame'], 'Under-forked: '+fork.travel+'mm fork is below '+nameOf(frame)+'\'s approved minimum of '+frame.minForkTravel+'mm - steepens the geometry (~1° per 20mm) and leaves the frame outside the maker\'s approved range.');

  /* 13. Dropper diameter vs seat tube - DIRECTION-AWARE (REVIEW.md #9): a
        bigger post in a smaller tube is physically impossible (error); a
        smaller post in a bigger tube is a common, shop-approved build with a
        reducing shim (Problem Solvers / Wolf Tooth; PNW's own sizing guide
        endorses shimming) -> warning naming the shim, not a false red. */
  if(dropper && frame){
    if(dropper.diameter>frame.seatTube){
      err('dropper-diameter', ['dropper','frame'], 'Dropper too big: Frame seat tube is '+frame.seatTube+'mm but Dropper is '+dropper.diameter+'mm - a bigger post cannot fit a smaller tube.');
    } else if(dropper.diameter<frame.seatTube){
      warn('dropper-shim', ['dropper','frame'], 'Dropper shim needed: a '+dropper.diameter+'mm post in a '+frame.seatTube+'mm seat tube works with a '+frame.seatTube+'-to-'+dropper.diameter+'mm reducing shim (sold separately).');
    }
    /* 13b. Insertion depth (REVIEW.md #23, near-term tier): fit for long-drop
          posts is decided by post length vs per-size usable insertion, and the
          app has no frame-size concept yet - so a >=200mm drop gets an INFO
          nudge, never a verdict. The real check needs frame.sizes.maxInsert +
          a size picker (deferred with the frameSize share-hash key). */
    if(dropper.drop>=200)
      info('dropper-insertion', ['dropper','frame'], 'Long-drop post: the '+nameOf(dropper)+' ('+dropper.drop+'mm) needs deep seat-tube insertion - check the maker\'s insertion calculator for your '+nameOf(frame)+' frame size.');
  }

  /* 14. Tire width vs wheel clearance (per wheel, warnings) */
  if(fTire && fW && fTire.width>fW.maxTire) warn('front-tire-rim', ['frontTire','frontWheel'], 'Front tire clearance: '+fTire.width+'in tire is wider than the front wheel\'s '+fW.maxTire+'in max.');
  if(rTire && rW && rTire.width>rW.maxTire) warn('rear-tire-rim', ['rearTire','rearWheel'], 'Rear tire clearance: '+rTire.width+'in tire is wider than the rear wheel\'s '+rW.maxTire+'in max.');
  /* 14b. Front tire vs FORK crown/arch clearance (REVIEW.md #22) - the
        fork-side twin of rule 18, dormant until a fork carries a
        maker-published maxTire (Fox/RockShox publish per chassis). */
  if(fTire && fork && typeof fork.maxTire==='number' && fTire.width>fork.maxTire)
    warn('front-tire-fork', ['frontTire','fork'], 'Front tire clearance: '+fTire.width+'in tire is wider than '+nameOf(fork)+'\'s '+fork.maxTire+'in chassis max.');

  /* 15. Handlebar / stem clamp */
  if(bar && stem && bar.clamp!==stem.clamp) err('bar-stem-clamp', ['handlebar','stem'], 'Bar/stem clamp mismatch: Handlebar is '+bar.clamp+'mm but Stem is '+stem.clamp+'mm.');

  /* 16. Rear shock physical fit vs frame. Hardtails carry NO shock block
        (schema cross-rule), so they get their own message instead of a
        nonsense "needs undefinedxundefined" comparison.
        Stroke is DIRECTION-AWARE (REVIEW.md #8): physical fit is set by
        eye-to-eye + mount. A LONGER stroke over-rotates the linkage /
        bottoms the shock on the frame -> error. A SHORTER stroke with
        matching eye+mount sweeps a strict subset of the designed range -
        makers sell the same body in several strokes and RockShox supports
        stroke-spacer reduction - so it bolts in with less travel: warning,
        quantified, not a false red. */
  if(shock && frame){
    if(frame.suspension==='hardtail'){
      err('hardtail-shock', ['shock','frame'], 'Hardtail: '+nameOf(frame)+' has no rear-shock mount - remove the '+nameOf(shock)+'.');
    } else {
      if(shock.eye!==frame.shockEye){
        err('shock-size', ['shock','frame'], 'Shock size mismatch: Frame needs '+frame.shockEye+'x'+frame.shockStroke+'mm but Shock is '+shock.eye+'x'+shock.stroke+'mm.');
      } else if(shock.stroke>frame.shockStroke){
        err('shock-stroke-over', ['shock','frame'], 'Shock stroke too long: '+nameOf(shock)+' is '+shock.eye+'x'+shock.stroke+'mm but '+nameOf(frame)+' is designed for '+frame.shockEye+'x'+frame.shockStroke+'mm - the extra stroke can over-rotate the linkage or bottom the shock on the frame.');
      } else if(shock.stroke<frame.shockStroke){
        var redTravel = Math.round(frame.travel*shock.stroke/frame.shockStroke);
        warn('shock-stroke-short', ['shock','frame'], 'Shorter-stroke shock: '+shock.eye+'x'+shock.stroke+'mm in a '+frame.shockEye+'x'+frame.shockStroke+'mm frame bolts in (same eye-to-eye) but gives ~'+redTravel+'mm rear travel instead of '+frame.travel+'mm - confirm bottom-out clearance / frame-maker approval.');
      }
      if(shock.mount!==frame.shockMount) err('shock-mount', ['shock','frame'], 'Shock mount mismatch: Frame uses a '+L(frame.shockMount)+' shock but Shock is '+L(shock.mount)+'.');
      /* 16b. Coil approval (REVIEW.md #21) - dormant until a frame carries a
            maker STATEMENT (coilApproved:false, e.g. Ibis's "leverage ratio
            ... not coil-compatible"). Never inferred from leverage curves;
            absence of the field means unknown, and unknown stays silent. */
      if(frame.coilApproved===false && shock.spring==='coil')
        warn('coil-approval', ['shock','frame'], 'Coil shock: '+nameOf(frame)+'\'s maker states this frame is not coil-compatible (leverage curve) - the '+nameOf(shock)+' is a coil.');
    }
  }

  /* 17. Frame + shock bundling (only full-sus frames bundle - the schema
        forbids bundledShock on hardtails) */
  if(frame && frame.suspension==='full' && frame.bundledShock){
    var inc = byId(frame.bundledShock), incName = nameOf(inc);
    if(!shock){ info('bundled-shock', ['frame'], 'Frame package: '+nameOf(frame)+' is sold as a frame+shock'+(frame.frameOnly?' (frame-only also available)':' package only')+' with the '+incName+'. Add it under Rear Shock, or pick another.'); }
    else if(shock.id===frame.bundledShock){ info('bundled-shock', ['frame','shock'], 'Package match: you are using the '+incName+' that '+nameOf(frame)+' ships with.'); }
    else if(frame.frameOnly===false){ warn('package-only', ['frame','shock'], 'Frame is package-only: '+nameOf(frame)+' is sold only as a frame+shock bundle with the '+incName+'. You can run the '+nameOf(shock)+', but you will still have to buy the bundle (and pay for the '+incName+') since the frame is not sold bare.'); }
    else { info('bundled-shock', ['frame','shock'], 'Note: '+nameOf(frame)+' ships with the '+incName+', but is also sold frame-only - running the '+nameOf(shock)+' is fine.'); }
  }
  if(shock && shock.oemOnly){
    var hostIds = shock.forFrames || [];
    var hostNames = hostIds.map(function(id){ return nameOf(byId(id)); }).join(' / ');
    /* Frameless case downgrades to info, mirroring rule 4's convention (a
       Transmission derailleur with no frame is an info, not a red) - the
       build isn't wrong yet, it just needs the right frame (REVIEW.md #17). */
    if(!frame){
      info('oem-shock', ['shock'], 'Heads-up: the '+nameOf(shock)+' is OEM-only - it ships with the '+hostNames+' and is not sold separately, so plan on that frame.');
    } else if(hostIds.indexOf(frame.id)<0){
      err('oem-shock', ['shock','frame'], 'OEM shock: the '+nameOf(shock)+' is only available bundled with the '+hostNames+' - it is not sold separately.');
    }
  }

  /* 18. Rear tire vs FRAME clearance (optional frame.maxTire, warning). The
        frame/swingarm complement to rule 14's rim-clearance check. Fires only
        where a frame carries a manufacturer-sourced maxTire (10 catalog frames
        as of 2026-07-06); frames without published clearance stay silent -
        a missing rule beats a wrong one. */
  if(rTire && frame && typeof frame.maxTire==='number' && rTire.width>frame.maxTire)
    warn('rear-tire-frame', ['rearTire','frame'], 'Rear tire clearance: '+rTire.width+'in tire is wider than '+nameOf(frame)+'\'s '+frame.maxTire+'in frame max.');

  /* 19. Shifter mounting vs brake lever integration (optional fields - dormant
        until parts carry them, per the rule-18 template). A lever-integrated
        shifter (I-Spec EV/II/B, MatchMaker) ships with NO handlebar clamp of
        its own and only bolts to a lever that accepts its standard - the
        I-Spec generations are mutually incompatible. A lever may accept
        SEVERAL standards via the maker's own clamps (leverAccepts is an
        array). Warning, not error: band-clamp SKUs and ShiftMount-style
        adapters exist (REVIEW.md #5). One matching lever is enough - the
        shifter pairs with that side. */
  var LEVER_INTEGRATED = ['ispec-ev','ispec-ii','ispec-b','matchmaker'];
  if(shifter && shifter.clampType && LEVER_INTEGRATED.indexOf(shifter.clampType)>=0){
    var sClamp = shifter.clampType;
    /** @type {string[]} */ var lClamps = [];
    /** @type {string[]} */ var lSlots = ['shifter'];
    [[fBrake,'frontBrake'], [rBrake,'rearBrake']].forEach(function(pair){
      var bk = /** @type {import('./types.js').BrakePart|undefined} */ (pair[0]);
      if(bk && bk.leverAccepts){ lClamps = lClamps.concat(bk.leverAccepts); lSlots.push(/** @type {string} */ (pair[1])); }
    });
    if(lClamps.length && lClamps.indexOf(sClamp)<0){
      var uniq = lClamps.filter(function(v,i,a){ return a.indexOf(v)===i; }).map(function(c){ return L(c); }).join(' / ');
      warn('shifter-mount', lSlots, 'Shifter mount: '+nameOf(shifter)+' is a '+L(sClamp)+' lever-integrated shifter (no bar clamp of its own), but the brake levers take '+uniq+'. You need the band-clamp version or a ShiftMount-style adapter to mount it.');
    }
  }

  return { errors:errors, warnings:warnings, infos:infos };
}

/* =============================================================================
   COMPATIBILITY HELPERS (shared by the UI and the test suite)
   build is a map of slotKey -> resolved part object.
   ========================================================================== */
/** @type {Object.<string, string[]>|null} */
var _CAT_SLOTS = null;
/** @returns {Object.<string, string[]>} */
function _catSlots(){
  if(!_CAT_SLOTS){
    /** @type {Object.<string, string[]>} */ var acc = {};
    SLOTS.forEach(function(s){ (acc[s.cat]=acc[s.cat]||[]).push(s.key); });
    _CAT_SLOTS = acc;
  }
  return _CAT_SLOTS;
}
/** Diff one placement of a part into a slot: the first NEW error and the first
 * NEW warning it introduces (null = none of that class). Diffs by verdictKey
 * (ruleId+slots+msg), NOT message text: two different conflicts can raise
 * byte-identical strings (REVIEW.md #4/#13's maskings).
 * @param {Part} part @param {string} slotKey @param {Build} [build]
 * @returns {{error: (string|null), warning: (string|null)}} */
function placementDiff(part, slotKey, build){
  /** @type {Build} */ var base = Object.assign({}, build || {}); delete base[slotKey];
  var before = checkBuild(base);
  var beforeE = before.errors.map(verdictKey), beforeW = before.warnings.map(verdictKey);
  /** @type {Build} */ var test = Object.assign({}, base); test[slotKey] = part;
  var after = checkBuild(test);
  /** @type {string|null} */ var e = null;
  /** @type {string|null} */ var w = null;
  for(var i=0;i<after.errors.length;i++){ if(beforeE.indexOf(verdictKey(after.errors[i]))<0){ e = String(after.errors[i]); break; } }
  for(var j=0;j<after.warnings.length;j++){ if(beforeW.indexOf(verdictKey(after.warnings[j]))<0){ w = String(after.warnings[j]); break; } }
  return { error:e, warning:w };
}
/** First NEW error this placement introduces (errors only - the dot goes
 * through placementDiff so new WARNINGS surface as yellow too, REVIEW.md #6).
 * @param {Part} part @param {string} slotKey @param {Build} [build] @returns {string|null} */
function conflictReason(part, slotKey, build){ return placementDiff(part, slotKey, build).error; }
/** @param {Part} p @param {Build} [build] @returns {CompatState} */
function compatOf(p, build){
  /** @type {Build} */ var bld = build || {};
  if(Object.keys(bld).length===0) return {state:'n', reason:'Pick some parts first to check fit'};
  if('fills' in p && p.fills){
    var pf = p.fills;
    // Baseline = the build with every slot the preset fills CLEARED first
    // (mirrors the single-part path, where placementDiff deletes the tested
    // slot). Diffing against the un-cleared build let a pre-existing error
    // string mask the preset's own byte-identical conflict -> false green on
    // exactly the kits a user browses to FIX a misfit (REVIEW.md #4).
    /** @type {Build} */ var base = Object.assign({}, bld);
    Object.keys(pf).forEach(function(s){ delete base[s]; });
    var before = checkBuild(base);
    var beforeE = before.errors.map(verdictKey), beforeW = before.warnings.map(verdictKey);
    /** @type {Build} */ var test = Object.assign({}, base);
    Object.keys(pf).forEach(function(s){ test[s]=/** @type {Part} */(byId(pf[s])); });
    var after = checkBuild(test);
    // Red if applying the preset INTRODUCES a conflict - detected by new-verdict
    // set membership (verdictKey, not message text and not error count), so a
    // preset that swaps one conflict for another still shows red.
    var extra = after.errors.filter(function(e){ return beforeE.indexOf(verdictKey(e))<0; });
    if(extra.length){ return {state:'r', reason:String(extra[0])}; }
    // Yellow if it introduces no error but >=1 new warning: warning-class
    // misfits (over-max rotor, over-travel fork...) used to render as green
    // "fits" at pick time and only flag AFTER being added (REVIEW.md #6).
    var extraW = after.warnings.filter(function(w){ return beforeW.indexOf(verdictKey(w))<0; });
    if(extraW.length){ return {state:'w', reason:String(extraW[0])}; }
    return {state:'g', reason:'No conflicts with your current build'};
  }
  var slots = _catSlots()[p.cat] || [];
  /** @type {string|null} */ var firstErr = null;
  /** @type {string|null} */ var firstWarn = null;
  for(var i=0;i<slots.length;i++){
    var d = placementDiff(p, slots[i], bld);
    if(!d.error && !d.warning) return {state:'g', reason:'No conflicts with your current build'};
    if(!d.error){ if(firstWarn===null) firstWarn = d.warning; }
    else if(firstErr===null){ firstErr = d.error; }
  }
  // A part that fits SOME slot with only a warning outranks one that errors
  // everywhere (multi-slot cats - tires/brakes/rotors - dot their best slot).
  if(firstWarn!==null) return {state:'w', reason:firstWarn};
  return {state:'r', reason:(firstErr||'Conflicts with your current build')};
}

/* =============================================================================
   PRICING + WEIGHT
   A group whose slots exactly match a chosen preset is billed/weighed as the
   bundle; otherwise its parts are summed individually.
   ========================================================================== */
/** @param {Group} group @param {Build} build @param {PresetBy} [presetBy] @returns {boolean} */
function bundleActive(group, build, presetBy){
  var pid = presetBy && presetBy[group.key];
  if(!pid) return false;
  var preset = byId(pid);
  if(!preset || !('fills' in preset) || !preset.fills) return false;
  // The preset must BELONG to this group (REVIEW.md #25): without this check a
  // crafted/corrupted share link could bill the wheels group as a $545
  // groupset, double-count the drivetrain and never count the wheels -
  // silently corrupting the headline totals. readHash is hardened the same way.
  if(!group.preset || preset.cat !== group.preset.cat) return false;
  var fills = preset.fills;
  var slots = Object.keys(fills);
  for(var i=0;i<slots.length;i++){
    var chosen = build[slots[i]];
    if(!chosen || chosen.id !== fills[slots[i]]) return false;
  }
  return true;
}
/** @param {Build} [build] @param {PresetBy} [presetBy] @returns {Totals} */
function buildTotals(build, presetBy){
  build = resolveBuild(build); presetBy = presetBy || {};
  var price = 0, weight = 0, missingWeight = false;
  GROUPS.forEach(function(g){
    if(g.preset && bundleActive(g, build, presetBy)){
      var preset = byId(presetBy[g.key]);
      if(preset){
        price += (preset.price || 0);
        // bundle weight is DERIVED from the fills - kits never store a weight
        // (a stored figure drifts into impossible bundles, REVIEW.md #12)
        var pw = partWeight(preset);
        if(pw != null) weight += pw; else missingWeight = true;
      }
    } else {
      g.slots.forEach(function(s){
        var p = build[s.key];
        if(p){
          price += (typeof p.price === 'number' ? p.price : 0);
          if(typeof p.weight === 'number') weight += p.weight; else missingWeight = true;
        }
      });
    }
  });
  return { price:price, weight:weight, missingWeight:missingWeight };
}

/* =============================================================================
   SHARED DISPLAY / PROVENANCE HELPERS (used by both the UI and the tests, so the
   "verified" badge logic and HTML-escaping have one tested source of truth)
   ========================================================================== */
/** Escape a value for safe interpolation into HTML (element AND attribute text).
 * @param {*} s @returns {string} */
function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Effective weight of a part in grams. Presets/kits DERIVE their weight from
 * the parts they fill (weight is never stored on a kit - a stored figure
 * drifts into physically impossible bundles, REVIEW.md #12); components use
 * their own figure. Returns null when unknown or incomplete.
 * @param {Part|null|undefined} p @returns {number|null} */
function partWeight(p){
  if(!p) return null;
  if('fills' in p && p.fills){
    var ks = Object.keys(p.fills), sum = 0;
    if(!ks.length) return null;
    for(var i=0;i<ks.length;i++){
      var c = byId(p.fills[ks[i]]);
      if(!c || typeof c.weight !== 'number') return null;
      sum += c.weight;
    }
    return sum;
  }
  return (typeof p.weight === 'number') ? p.weight : null;
}

/** Sanitize the decoded payload of a "#b=" share link (also the build-comparison
 * paste box). Ids resolve through canonicalId first (ids are append-only, so a
 * link minted before an id retired must keep working). A build entry survives
 * only when the slot key is a real slot, the part exists, AND the part's
 * category matches the slot's expected category — without the category check a
 * stale/corrupted/crafted link can inject e.g. a tire into the fork slot and
 * checkBuild emits nonsense ("Steerer mismatch: Fork is undefined…") instead of
 * the link being cleanly rejected. A preset survives only when it belongs to
 * the group it claims (REVIEW.md #25 — a crafted link could otherwise bill one
 * group as another's kit). Unknown keys are dropped, never crashed on, so links
 * minted by a newer app version still load what they can.
 * @param {Object.<string, *>|null|undefined} bsrc raw slotKey -> part id
 * @param {Object.<string, *>|null|undefined} psrc raw groupKey -> preset id
 * @returns {{build: Object.<string, string>, presetBy: Object.<string, string>}} */
function sanitizeShare(bsrc, psrc){
  /** @type {Object.<string, string>} */ var build = {};
  /** @type {Object.<string, string>} */ var presetBy = {};
  /** @type {Object.<string, string>} */ var slotCat = {};
  SLOTS.forEach(function(s){ slotCat[s.key] = s.cat; });
  Object.keys(bsrc || {}).forEach(function(k){
    var id = canonicalId((bsrc || {})[k]); var p = typeof id === 'string' ? byId(id) : null;
    if(typeof id === 'string' && p && slotCat[k] && p.cat === slotCat[k]) build[k] = id;
  });
  Object.keys(psrc || {}).forEach(function(k){
    var id = canonicalId((psrc || {})[k]); var p = typeof id === 'string' ? byId(id) : null;
    var g = null;
    for(var i = 0; i < GROUPS.length; i++){ if(GROUPS[i].key === k){ g = GROUPS[i]; break; } }
    if(typeof id === 'string' && g && g.preset && p && p.cat === g.preset.cat) presetBy[k] = id;
  });
  return { build: build, presetBy: presetBy };
}

/** Is this part verified against a manufacturer source? A preset/kit counts as
 * verified only when every part it fills is itself verified.
 * @param {Part|null|undefined} p @returns {boolean} */
function partVerified(p){
  if(!p) return false;
  if('fills' in p && p.fills){
    var ks = Object.keys(p.fills);
    return ks.length > 0 && ks.every(function(s){ var c = byId(p.fills[s]); return !!(c && c.verified === true); });
  }
  return p.verified === true;
}

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PARTS:PARTS, GROUPS:GROUPS, SLOTS:SLOTS, LABELS:LABELS, WHEEL_CONFIG:WHEEL_CONFIG, slotRequired:slotRequired,
    altSlotsOf:altSlotsOf, wheelPositionFilled:wheelPositionFilled, effectiveWheel:effectiveWheel,
    ALIASES:ALIASES, canonicalId:canonicalId,
    byId:byId, nameOf:nameOf, specSummary:specSummary, checkBuild:checkBuild, verdictKey:verdictKey,
    placementDiff:placementDiff, conflictReason:conflictReason, compatOf:compatOf, bundleActive:bundleActive, buildTotals:buildTotals,
    esc:esc, partVerified:partVerified, partWeight:partWeight, sanitizeShare:sanitizeShare };
}
