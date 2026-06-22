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

/** @type {Object.<string, string>} */
var LABELS = {
  '29': '29in', '275': '27.5in', mullet: 'Mullet (29/27.5)',
  Boost148: 'Boost 148x12', SuperBoost157: 'SuperBoost 157x12', Boost110: 'Boost 15x110',
  XD: 'SRAM XD', MicroSpline: 'Shimano Micro Spline', HG: 'Shimano HG',
  sixbolt: '6-bolt', CL: 'Center Lock',
  std: 'Standard eyelet', trunnion: 'Trunnion',
  tapered: 'Tapered (1.5-1.125)',
  BSA73: 'BSA threaded 73', PF92: 'PressFit 92', T47: 'T47 threaded',
  DUB: 'SRAM DUB', SH24: 'Shimano 24mm', PM: 'Post mount',
  'sram-eagle': 'SRAM Eagle (mechanical)', 'sram-transmission': 'SRAM Transmission (AXS)',
  'shimano-12': 'Shimano 12-speed', 'udh-direct': 'Direct mount (UDH)', hanger: 'Standard hanger'
};
/** @param {string} k @returns {string} */
var L = function(k){ return (k in LABELS ? LABELS[k] : k); };

/* front size + rear size for each wheel config */
/** @type {Object.<string, {front: WheelSize, rear: WheelSize}>} */
var WHEEL_CONFIG = { '29':{front:'29',rear:'29'}, '275':{front:'275',rear:'275'}, mullet:{front:'29',rear:'275'} };

/** @type {Group[]} */
var GROUPS = [
  { key:'frame', label:'Frame', icon:'F', slots:[ {key:'frame', label:'Frame', cat:'frame'} ] },
  { key:'fork',  label:'Fork',  icon:'Y', slots:[ {key:'fork', label:'Fork', cat:'fork'} ] },
  { key:'shock', label:'Rear Shock', icon:'O', slots:[ {key:'shock', label:'Rear Shock', cat:'shock'} ] },
  { key:'wheels', label:'Wheels', icon:'W', preset:{cat:'wheelset', label:'wheelset'}, slots:[
      {key:'frontWheel', label:'Front Wheel', cat:'frontwheel'},
      {key:'rearWheel',  label:'Rear Wheel',  cat:'rearwheel'} ] },
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
  { key:'saddle', label:'Saddle', icon:'S', slots:[ {key:'saddle', label:'Saddle', cat:'saddle'} ] }
];
/** @type {Slot[]} */
var SLOTS = GROUPS.reduce(function(a,g){ return a.concat(g.slots.map(function(s){ return Object.assign({group:g.key}, s); })); }, /** @type {Slot[]} */ ([]));

/* ---- SEED catalog (price USD sample, weight grams sample) ---------------- */
/** @type {Part[]} */
var PARTS = [
  /* FRAMES (weight = frame only, no shock; wheelConfigs = supported setups) */
  { id:'fr-megatower', cat:'frame', brand:'Santa Cruz', model:'Megatower CC', price:3499, weight:3200, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:170, travel:165, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-enduro', cat:'frame', brand:'Specialized', model:'Enduro S-Works', price:5500, weight:3300, wheelConfigs:['29'], rearAxle:'SuperBoost157', headset:'tapered', bb:'BSA73', seatTube:34.9, brakeMount:'PM', maxRotorR:220, shockEye:230, shockStroke:60, shockMount:'std', maxForkTravel:170, travel:170, udh:false, bundledShock:'sh-genie-oem', frameOnly:false },
  { id:'fr-capra', cat:'frame', brand:'YT', model:'Capra Core 4', price:4299, weight:3400, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-strive', cat:'frame', brand:'Canyon', model:'Strive CFR', price:4999, weight:3100, wheelConfigs:['29'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:30.9, brakeMount:'PM', maxRotorR:200, shockEye:230, shockStroke:60, shockMount:'std', maxForkTravel:170, travel:160, udh:false, bundledShock:null, frameOnly:true },
  { id:'fr-slash', cat:'frame', brand:'Trek', model:'Slash 9.9', price:6000, weight:3300, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'T47', seatTube:31.6, brakeMount:'PM', maxRotorR:220, shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-range', cat:'frame', brand:'Norco', model:'Range C1', price:5200, weight:3500, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-spire', cat:'frame', brand:'Transition', model:'Spire Alloy', price:3199, weight:3900, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, shockEye:230, shockStroke:65, shockMount:'std', maxForkTravel:180, travel:170, udh:true, bundledShock:null, frameOnly:true },
  { id:'fr-madonna', cat:'frame', brand:'RAAW', model:'Madonna V2.2', price:2899, weight:3600, wheelConfigs:['29','mullet'], rearAxle:'Boost148', headset:'tapered', bb:'BSA73', seatTube:31.6, brakeMount:'PM', maxRotorR:220, shockEye:205, shockStroke:65, shockMount:'trunnion', maxForkTravel:180, travel:160, udh:true, bundledShock:null, frameOnly:true },

  /* FORKS (front only; wheel = front size) */
  { id:'fk-zeb', cat:'fork', brand:'RockShox', model:'ZEB Ultimate 170', price:1099, weight:2150, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220 },
  { id:'fk-38-170', cat:'fork', brand:'Fox', model:'38 Factory 170', price:1299, weight:2180, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220 },
  { id:'fk-38-180', cat:'fork', brand:'Fox', model:'38 Factory 180', price:1349, weight:2200, wheel:'29', travel:180, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:230 },
  { id:'fk-lyrik', cat:'fork', brand:'RockShox', model:'Lyrik Ultimate 160', price:999, weight:1900, wheel:'29', travel:160, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:200 },
  { id:'fk-z1', cat:'fork', brand:'Marzocchi', model:'Bomber Z1 170', price:699, weight:2200, wheel:'29', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220 },
  { id:'fk-zeb-275', cat:'fork', brand:'RockShox', model:'ZEB Ultimate 27.5 170', price:1099, weight:2100, wheel:'275', travel:170, axle:'Boost110', steerer:'tapered', brakeMount:'PM', maxRotorF:220 },

  /* REAR SHOCKS */
  { id:'sh-sd-air', cat:'shock', brand:'RockShox', model:'Super Deluxe Ultimate (air)', price:549, weight:480, eye:230, stroke:65, mount:'std', spring:'air', verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/rockshox/models/rs-sdlx-ult-c2' },
  { id:'sh-floatx', cat:'shock', brand:'Fox', model:'Float X Factory', price:549, weight:460, eye:230, stroke:65, mount:'std', spring:'air' },
  { id:'sh-sd-coil', cat:'shock', brand:'RockShox', model:'Super Deluxe Coil', price:499, weight:750, eye:230, stroke:65, mount:'std', spring:'coil' },
  { id:'sh-dhx2', cat:'shock', brand:'Fox', model:'DHX2 Coil', price:599, weight:820, eye:230, stroke:65, mount:'std', spring:'coil' },
  { id:'sh-sd-trun', cat:'shock', brand:'RockShox', model:'Super Deluxe (trunnion)', price:549, weight:470, eye:205, stroke:65, mount:'trunnion', spring:'air' },
  { id:'sh-x2-trun', cat:'shock', brand:'Fox', model:'Float X2 (trunnion)', price:649, weight:520, eye:205, stroke:65, mount:'trunnion', spring:'air' },
  { id:'sh-floatx-60', cat:'shock', brand:'Fox', model:'Float X (230x60)', price:549, weight:450, eye:230, stroke:60, mount:'std', spring:'air' },
  { id:'sh-genie-oem', cat:'shock', brand:'Specialized', model:'Genie (OEM, Enduro)', price:0, weight:470, eye:230, stroke:60, mount:'std', spring:'air', oemOnly:true, forFrame:'fr-enduro' },

  /* FRONT WHEELS */
  { id:'fw-dt', cat:'frontwheel', brand:'DT Swiss', model:'EX 1700 front', price:350, weight:1000, wheel:'29', hub:'Boost110', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  { id:'fw-reserve', cat:'frontwheel', brand:'Reserve', model:'30 HD front', price:800, weight:870, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-i9', cat:'frontwheel', brand:'Industry Nine', model:'Enduro S front', price:850, weight:950, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-roval', cat:'frontwheel', brand:'Roval', model:'Traverse front', price:800, weight:880, wheel:'29', hub:'Boost110', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'fw-dt275', cat:'frontwheel', brand:'DT Swiss', model:'E 1900 27.5 front', price:250, weight:1050, wheel:'275', hub:'Boost110', rotorMount:'CL', intWidth:30, maxTire:2.5 },

  /* REAR WHEELS (rw-dt275 is the common mullet rear) */
  { id:'rw-dt', cat:'rearwheel', brand:'DT Swiss', model:'EX 1700 rear', price:400, weight:1150, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'CL', intWidth:30, maxTire:2.5 },
  { id:'rw-reserve', cat:'rearwheel', brand:'Reserve', model:'30 HD rear', price:900, weight:1010, wheel:'29', hub:'Boost148', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-i9', cat:'rearwheel', brand:'Industry Nine', model:'Enduro S rear', price:950, weight:1080, wheel:'29', hub:'Boost148', freehub:'MicroSpline', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-roval', cat:'rearwheel', brand:'Roval', model:'Traverse SuperBoost rear', price:900, weight:1050, wheel:'29', hub:'SuperBoost157', freehub:'XD', rotorMount:'sixbolt', intWidth:30, maxTire:2.6 },
  { id:'rw-dt275', cat:'rearwheel', brand:'DT Swiss', model:'E 1900 27.5 rear', price:300, weight:1200, wheel:'275', hub:'Boost148', freehub:'MicroSpline', rotorMount:'CL', intWidth:30, maxTire:2.5 },

  /* TIRES (each a size-specific model; front + rear chosen separately) */
  { id:'ti-assegai-29', cat:'tire', brand:'Maxxis', model:'Assegai 29x2.5', price:90, weight:1320, wheel:'29', width:2.5 },
  { id:'ti-dhr-29', cat:'tire', brand:'Maxxis', model:'Minion DHR II 29x2.4', price:85, weight:1250, wheel:'29', width:2.4 },
  { id:'ti-kryp-29', cat:'tire', brand:'Continental', model:'Kryptotal 29x2.4', price:80, weight:1280, wheel:'29', width:2.4 },
  { id:'ti-mary-29', cat:'tire', brand:'Schwalbe', model:'Magic Mary 29x2.4', price:85, weight:1300, wheel:'29', width:2.4 },
  { id:'ti-assegai-275', cat:'tire', brand:'Maxxis', model:'Assegai 27.5x2.5', price:90, weight:1250, wheel:'275', width:2.5 },
  { id:'ti-dhr-275', cat:'tire', brand:'Maxxis', model:'Minion DHR II 27.5x2.4', price:85, weight:1200, wheel:'275', width:2.4 },

  /* DRIVETRAIN COMPONENTS */
  { id:'sft-gx-t', cat:'shifter', brand:'SRAM', model:'GX Transmission Pod', price:150, weight:70, system:'sram-transmission', speeds:12 },
  { id:'sft-gx-m', cat:'shifter', brand:'SRAM', model:'GX Eagle Trigger', price:45, weight:120, system:'sram-eagle', speeds:12 },
  { id:'sft-xt', cat:'shifter', brand:'Shimano', model:'XT M8100 I-Spec', price:55, weight:115, system:'shimano-12', speeds:12 },
  { id:'sft-slx', cat:'shifter', brand:'Shimano', model:'SLX M7100', price:40, weight:120, system:'shimano-12', speeds:12 },
  { id:'dr-gx-t', cat:'derailleur', brand:'SRAM', model:'GX Transmission', price:400, weight:465, system:'sram-transmission', speeds:12, maxCog:52, mount:'udh-direct' },
  { id:'dr-gx-m', cat:'derailleur', brand:'SRAM', model:'GX Eagle', price:135, weight:290, system:'sram-eagle', speeds:12, maxCog:52, mount:'hanger', verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/rd-gx-1-b2' },
  { id:'dr-xt', cat:'derailleur', brand:'Shimano', model:'XT M8100 SGS', price:120, weight:284, system:'shimano-12', speeds:12, maxCog:51, mount:'hanger' },
  { id:'dr-slx', cat:'derailleur', brand:'Shimano', model:'SLX M7100 SGS', price:90, weight:318, system:'shimano-12', speeds:12, maxCog:51, mount:'hanger' },
  { id:'ca-sram-t', cat:'cassette', brand:'SRAM', model:'XS-1275 Transmission 10-52', price:380, weight:440, system:'sram-transmission', speeds:12, freehub:'XD', range:'10-52', maxCog:52 },
  { id:'ca-sram-e', cat:'cassette', brand:'SRAM', model:'XG-1275 Eagle 10-52', price:215, weight:450, system:'sram-eagle', speeds:12, freehub:'XD', range:'10-52', maxCog:52, verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/cs-xg-1275-b1' },
  { id:'ca-xt', cat:'cassette', brand:'Shimano', model:'CS-M8100 10-51', price:185, weight:470, system:'shimano-12', speeds:12, freehub:'MicroSpline', range:'10-51', maxCog:51, verified:true, lastChecked:'2026-06-22', source:'https://bike.shimano.com/en-US/product/component/deore-xt-m8100/CS-M8100-12.html' },
  { id:'ca-slx', cat:'cassette', brand:'Shimano', model:'CS-M7100 10-51', price:130, weight:534, system:'shimano-12', speeds:12, freehub:'MicroSpline', range:'10-51', maxCog:51 },
  { id:'ch-flattop', cat:'chain', brand:'SRAM', model:'Flattop (Transmission)', price:45, weight:290, system:'sram-transmission', speeds:12 },
  { id:'ch-eagle', cat:'chain', brand:'SRAM', model:'Eagle 12-speed', price:30, weight:268, system:'sram-eagle', speeds:12 },
  { id:'ch-shimano', cat:'chain', brand:'Shimano', model:'CN-M8100 12-speed', price:35, weight:252, system:'shimano-12', speeds:12 },
  { id:'cr-gx', cat:'crankset', brand:'SRAM', model:'GX Eagle DUB', price:175, weight:621, bb:'DUB', ring:32, speeds:12, chainline:'Boost', verified:true, lastChecked:'2026-06-22', source:'https://www.sram.com/en/sram/models/fc-gx-1-b1' },
  { id:'cr-x0t', cat:'crankset', brand:'SRAM', model:'X0 Transmission DUB', price:330, weight:460, bb:'DUB', ring:32, speeds:12, chainline:'Boost' },
  { id:'cr-xt', cat:'crankset', brand:'Shimano', model:'XT M8100', price:200, weight:535, bb:'SH24', ring:32, speeds:12, chainline:'Boost' },
  { id:'cr-rf', cat:'crankset', brand:'Race Face', model:'Aeffect R DUB', price:160, weight:640, bb:'DUB', ring:30, speeds:12, chainline:'Boost' },

  /* BRAKES (single caliper+lever; usable front or rear) */
  { id:'bk-code', cat:'brake', brand:'SRAM', model:'Code RSC', price:140, weight:290, mount:'PM', pistons:4 },
  { id:'bk-code-s', cat:'brake', brand:'SRAM', model:'Code Stealth', price:150, weight:290, mount:'PM', pistons:4 },
  { id:'bk-xt', cat:'brake', brand:'Shimano', model:'XT M8120 4-piston', price:150, weight:295, mount:'PM', pistons:4 },
  { id:'bk-dominion', cat:'brake', brand:'Hayes', model:'Dominion A4', price:190, weight:310, mount:'PM', pistons:4 },
  { id:'bk-mt7', cat:'brake', brand:'Magura', model:'MT7', price:160, weight:280, mount:'PM', pistons:4 },
  { id:'bk-slx', cat:'brake', brand:'Shimano', model:'SLX M7120 4-piston', price:100, weight:305, mount:'PM', pistons:4 },

  /* ROTORS (usable front or rear) */
  { id:'ro-hs2-200', cat:'rotor', brand:'SRAM', model:'HS2 200mm', price:55, weight:150, size:200, mount:'sixbolt' },
  { id:'ro-hs2-220', cat:'rotor', brand:'SRAM', model:'HS2 220mm', price:60, weight:185, size:220, mount:'sixbolt' },
  { id:'ro-cl-203', cat:'rotor', brand:'Shimano', model:'RT-MT800 203mm (CL)', price:55, weight:165, size:203, mount:'CL' },
  { id:'ro-cl-180', cat:'rotor', brand:'Shimano', model:'RT-MT800 180mm (CL)', price:50, weight:120, size:180, mount:'CL' },
  { id:'ro-6b-203', cat:'rotor', brand:'Hayes', model:'D-Series 203mm', price:45, weight:170, size:203, mount:'sixbolt' },
  { id:'ro-6b-220', cat:'rotor', brand:'Galfer', model:'220mm 6-bolt', price:65, weight:200, size:220, mount:'sixbolt' },

  /* COCKPIT COMPONENTS */
  { id:'hb-fatbar', cat:'handlebar', brand:'Renthal', model:'Fatbar 35', price:120, weight:320, clamp:35, width:800, rise:30, material:'alu' },
  { id:'hb-oneup', cat:'handlebar', brand:'OneUp', model:'Carbon 35', price:160, weight:220, clamp:35, width:800, rise:20, material:'carbon' },
  { id:'hb-pnw', cat:'handlebar', brand:'PNW', model:'Range 31.8', price:60, weight:300, clamp:31.8, width:780, rise:30, material:'alu' },
  { id:'hb-rf', cat:'handlebar', brand:'Race Face', model:'Next R 35', price:175, weight:230, clamp:35, width:800, rise:20, material:'carbon' },
  { id:'st-apex', cat:'stem', brand:'Renthal', model:'Apex 35', price:80, weight:120, clamp:35, length:40 },
  { id:'st-oneup', cat:'stem', brand:'OneUp', model:'Stem 35', price:60, weight:130, clamp:35, length:35 },
  { id:'st-pnw', cat:'stem', brand:'PNW', model:'Range 31.8', price:45, weight:110, clamp:31.8, length:40 },
  { id:'st-rf', cat:'stem', brand:'Race Face', model:'Aeffect R 35', price:50, weight:150, clamp:35, length:50 },
  { id:'gr-oneup', cat:'grips', brand:'OneUp', model:'Lock-On Grips', price:20, weight:100 },
  { id:'gr-esi', cat:'grips', brand:'ESI', model:'Chunky', price:18, weight:60 },
  { id:'gr-pnw', cat:'grips', brand:'PNW', model:'Loam Grips', price:22, weight:110 },

  /* DROPPER POSTS */
  { id:'dp-reverb', cat:'dropper', brand:'RockShox', model:'Reverb AXS', price:800, weight:700, diameter:31.6, drop:170 },
  { id:'dp-oneup', cat:'dropper', brand:'OneUp', model:'V2 Dropper', price:250, weight:615, diameter:31.6, drop:210 },
  { id:'dp-transfer', cat:'dropper', brand:'Fox', model:'Transfer Factory', price:350, weight:530, diameter:31.6, drop:175 },
  { id:'dp-revive', cat:'dropper', brand:'BikeYoke', model:'Revive', price:400, weight:600, diameter:31.6, drop:185 },
  { id:'dp-pnw', cat:'dropper', brand:'PNW', model:'Loam 30.9', price:200, weight:600, diameter:30.9, drop:170 },
  { id:'dp-oneup-349', cat:'dropper', brand:'OneUp', model:'V2 Dropper 34.9', price:250, weight:640, diameter:34.9, drop:210 },

  /* SADDLES */
  { id:'sa-volt', cat:'saddle', brand:'WTB', model:'Volt', price:90, weight:260 },
  { id:'sa-ergon', cat:'saddle', brand:'Ergon', model:'SM Enduro', price:130, weight:240 },
  { id:'sa-bridge', cat:'saddle', brand:'Specialized', model:'Bridge', price:150, weight:250 },
  { id:'sa-belair', cat:'saddle', brand:'SDG', model:'Bel-Air V3', price:100, weight:245 },

  /* PRESETS (bundle price + bundle weight; fills maps slot -> component id) */
  { id:'gs-gx-t', cat:'groupset', brand:'SRAM', model:'GX Eagle Transmission', desc:'AXS . 12-spd . needs UDH frame', price:1099, weight:1725, fills:{ shifter:'sft-gx-t', derailleur:'dr-gx-t', cassette:'ca-sram-t', chain:'ch-flattop', crankset:'cr-x0t' } },
  { id:'gs-gx-m', cat:'groupset', brand:'SRAM', model:'GX Eagle (mechanical)', desc:'mechanical . 12-spd . XD', price:545, weight:1670, fills:{ shifter:'sft-gx-m', derailleur:'dr-gx-m', cassette:'ca-sram-e', chain:'ch-eagle', crankset:'cr-gx' } },
  { id:'gs-xt', cat:'groupset', brand:'Shimano', model:'XT M8100', desc:'mechanical . 12-spd . Micro Spline', price:559, weight:1656, fills:{ shifter:'sft-xt', derailleur:'dr-xt', cassette:'ca-xt', chain:'ch-shimano', crankset:'cr-xt' } },
  { id:'gs-slx', cat:'groupset', brand:'Shimano', model:'SLX M7100', desc:'mechanical . 12-spd . Micro Spline', price:419, weight:1864, fills:{ shifter:'sft-slx', derailleur:'dr-slx', cassette:'ca-slx', chain:'ch-shimano', crankset:'cr-rf' } },

  { id:'ws-dt', cat:'wheelset', brand:'DT Swiss', model:'EX 1700', desc:'29 . Boost . XD . Center Lock', price:700, weight:2150, fills:{ frontWheel:'fw-dt', rearWheel:'rw-dt' } },
  { id:'ws-reserve', cat:'wheelset', brand:'Reserve', model:'30 HD', desc:'29 . Boost . XD . 6-bolt', price:1599, weight:1880, fills:{ frontWheel:'fw-reserve', rearWheel:'rw-reserve' } },
  { id:'ws-i9', cat:'wheelset', brand:'Industry Nine', model:'Enduro S', desc:'29 . Boost . Micro Spline . 6-bolt', price:1700, weight:2030, fills:{ frontWheel:'fw-i9', rearWheel:'rw-i9' } },
  { id:'ws-roval', cat:'wheelset', brand:'Roval', model:'Traverse SuperBoost', desc:'29 . SuperBoost 157 . XD . 6-bolt', price:1600, weight:1930, fills:{ frontWheel:'fw-roval', rearWheel:'rw-roval' } },
  { id:'ws-dt275', cat:'wheelset', brand:'DT Swiss', model:'E 1900 27.5', desc:'27.5 . Boost . Micro Spline . CL', price:500, weight:2250, fills:{ frontWheel:'fw-dt275', rearWheel:'rw-dt275' } },

  { id:'bs-code', cat:'brakeset', brand:'SRAM', model:'Code RSC set', desc:'200/200 . 6-bolt', price:360, weight:880, fills:{ frontBrake:'bk-code', rearBrake:'bk-code', frontRotor:'ro-hs2-200', rearRotor:'ro-hs2-200' } },
  { id:'bs-xt', cat:'brakeset', brand:'Shimano', model:'XT M8120 set', desc:'203/203 . Center Lock', price:379, weight:920, fills:{ frontBrake:'bk-xt', rearBrake:'bk-xt', frontRotor:'ro-cl-203', rearRotor:'ro-cl-203' } },
  { id:'bs-dominion', cat:'brakeset', brand:'Hayes', model:'Dominion A4 set', desc:'203/203 . 6-bolt', price:440, weight:960, fills:{ frontBrake:'bk-dominion', rearBrake:'bk-dominion', frontRotor:'ro-6b-203', rearRotor:'ro-6b-203' } },

  { id:'co-renthal', cat:'cockpitset', brand:'Renthal', model:'Fatbar + Apex', desc:'35mm . alu bar', price:200, weight:540, fills:{ handlebar:'hb-fatbar', stem:'st-apex', grips:'gr-oneup' } },
  { id:'co-oneup', cat:'cockpitset', brand:'OneUp', model:'Carbon Bar + Stem', desc:'35mm . carbon bar', price:220, weight:450, fills:{ handlebar:'hb-oneup', stem:'st-oneup', grips:'gr-oneup' } },
  { id:'co-pnw', cat:'cockpitset', brand:'PNW', model:'Range cockpit', desc:'31.8mm . alu bar', price:120, weight:520, fills:{ handlebar:'hb-pnw', stem:'st-pnw', grips:'gr-pnw' } }
];

/* ---- lookups ------------------------------------------------------------- */
/** @param {string|null|undefined} id @returns {Part|null} */
function byId(id){ for (var i=0;i<PARTS.length;i++){ if (PARTS[i].id===id) return PARTS[i]; } return null; }
/** @param {Part|null|undefined} p @returns {string} */
function nameOf(p){ return p ? (p.brand+' '+p.model) : ''; }

/* ---- short spec line for a part ----------------------------------------- */
/** @param {Part} p @returns {string} */
function specSummary(p){
  switch(p.cat){
    case 'frame': return p.wheelConfigs.map(function(w){return L(w);}).join(' / ')+' . '+p.travel+'mm . '+L(p.rearAxle)+' . shock '+p.shockEye+'x'+p.shockStroke+' '+L(p.shockMount)+(p.udh?' . UDH':'');
    case 'fork': return L(p.wheel)+' . '+p.travel+'mm . '+L(p.axle)+' . '+L(p.steerer);
    case 'shock': return p.eye+'x'+p.stroke+' . '+L(p.mount)+' . '+p.spring+(p.oemOnly?' . OEM-only':'');
    case 'frontwheel': return L(p.wheel)+' . '+L(p.hub)+' . '+L(p.rotorMount)+' . '+p.intWidth+'mm';
    case 'rearwheel': return L(p.wheel)+' . '+L(p.hub)+' . '+L(p.freehub)+' . '+L(p.rotorMount);
    case 'tire': return L(p.wheel)+' . '+p.width+'in';
    case 'shifter': return L(p.system)+' . '+p.speeds+'s';
    case 'derailleur': return L(p.system)+' . '+p.speeds+'s . '+p.maxCog+'T max . '+L(p.mount);
    case 'cassette': return L(p.freehub)+' . '+p.range+' . '+p.speeds+'s';
    case 'chain': return L(p.system)+' . '+p.speeds+'s';
    case 'crankset': return L(p.bb)+' . '+p.ring+'T . '+p.speeds+'s';
    case 'brake': return L(p.mount)+' . '+p.pistons+'-piston';
    case 'rotor': return p.size+'mm . '+L(p.mount);
    case 'handlebar': return p.clamp+'mm clamp . '+p.width+'mm . '+p.material;
    case 'stem': return p.clamp+'mm clamp . '+p.length+'mm';
    case 'grips': return 'lock-on';
    case 'dropper': return p.diameter+'mm . '+p.drop+'mm drop';
    case 'saddle': return 'saddle';
    case 'groupset': case 'wheelset': case 'brakeset': case 'cockpitset': return p.desc || 'preset';
    default: return '';
  }
}

/* =============================================================================
   COMPATIBILITY ENGINE -> { errors, warnings, infos }
   build keyed by SLOT (frame, fork, shock, frontWheel, rearWheel, frontTire,
   rearTire, ...) -> part object.
   ========================================================================== */
/** @param {Build} build @returns {CompatResult} */
function checkBuild(build){
  /** @type {string[]} */ var errors=[];
  /** @type {string[]} */ var warnings=[];
  /** @type {string[]} */ var infos=[];
  /** @type {Build} */ var b = build || {};
  var frame=b.frame, fork=b.fork, shock=b.shock, fW=b.frontWheel, rW=b.rearWheel, fTire=b.frontTire, rTire=b.rearTire,
      shifter=b.shifter, derailleur=b.derailleur, cassette=b.cassette, chain=b.chain, crankset=b.crankset,
      fBrake=b.frontBrake, rBrake=b.rearBrake, fRotor=b.frontRotor, rRotor=b.rearRotor,
      bar=b.handlebar, stem=b.stem, dropper=b.dropper;

  /* 1. Wheel sizing: front group + rear group must each be consistent, and the
        front/rear combo must match a config the frame supports (incl. mullet). */
  /** @param {string[][]} list @param {string} label @returns {string|null} */
  function sizeOf(list, label){
    if(!list.length) return null;
    var ref=list[0][1];
    if(list.some(function(s){ return s[1]!==ref; })){ errors.push(label+' wheel size mismatch: '+list.map(function(s){ return s[0]+' '+L(s[1]); }).join(', ')+'.'); return null; }
    return ref;
  }
  var frontList=/** @type {string[][]} */([]); if(fork) frontList.push(['Fork',fork.wheel]); if(fW) frontList.push(['Front wheel',fW.wheel]); if(fTire) frontList.push(['Front tire',fTire.wheel]);
  var rearList=/** @type {string[][]} */([]);  if(rW) rearList.push(['Rear wheel',rW.wheel]); if(rTire) rearList.push(['Rear tire',rTire.wheel]);
  var frontSize=sizeOf(frontList,'Front'), rearSize=sizeOf(rearList,'Rear');
  if(frame && (frontSize || rearSize)){
    var configs = frame.wheelConfigs || [];
    var okCfg = configs.some(function(cfg){ var c=WHEEL_CONFIG[cfg]; return c && (!frontSize||frontSize===c.front) && (!rearSize||rearSize===c.rear); });
    if(!okCfg) errors.push('Unsupported wheel setup: '+nameOf(frame)+' supports '+configs.map(function(w){return L(w);}).join(' / ')+', but this build is front '+(frontSize?L(frontSize):'(any)')+' / rear '+(rearSize?L(rearSize):'(any)')+'.');
  }

  /* 2. Axles */
  if(fork && fW && fork.axle!==fW.hub) errors.push('Front axle mismatch: Fork is '+L(fork.axle)+' but Front wheel hub is '+L(fW.hub)+'.');
  if(frame && rW && frame.rearAxle!==rW.hub) errors.push('Rear axle mismatch: Frame is '+L(frame.rearAxle)+' but Rear wheel hub is '+L(rW.hub)+'.');

  /* 3. Drivetrain: one system + one speed */
  /** @type {Array<[string, DrivetrainPart]>} */
  var dt=[];
  if(shifter) dt.push(['Shifter',shifter]); if(derailleur) dt.push(['Derailleur',derailleur]);
  if(cassette) dt.push(['Cassette',cassette]); if(chain) dt.push(['Chain',chain]);
  if(dt.length>1){
    var systems=dt.map(function(x){return x[1].system;}).filter(function(v,i,a){return a.indexOf(v)===i;});
    if(systems.length>1) errors.push('Drivetrain mismatch: '+dt.map(function(x){return x[0]+' = '+L(x[1].system);}).join(', ')+'. Shifter, derailleur, cassette and chain must be one system.');
    var speeds=dt.map(function(x){return x[1].speeds;}).filter(function(v,i,a){return a.indexOf(v)===i;});
    if(speeds.length>1) errors.push('Speed mismatch: '+dt.map(function(x){return x[0]+' '+x[1].speeds+'s';}).join(', ')+'. All must be the same speed count.');
  }

  /* 4. SRAM Transmission needs a UDH frame */
  if(derailleur && derailleur.mount==='udh-direct'){
    if(frame && !frame.udh) errors.push('Frame not UDH: '+nameOf(derailleur)+' is a direct-mount (UDH) Transmission derailleur, but '+nameOf(frame)+' has a standard hanger.');
    else if(!frame) infos.push('Heads-up: '+nameOf(derailleur)+' is a Transmission derailleur and needs a UDH / Transmission-compatible frame.');
  }

  /* 5. Cassette range vs derailleur capacity */
  if(cassette && derailleur && cassette.maxCog>derailleur.maxCog) errors.push('Cassette too big: '+cassette.maxCog+'T cassette exceeds the '+nameOf(derailleur)+' max of '+derailleur.maxCog+'T.');

  /* 6. Freehub: cassette vs rear wheel */
  if(cassette && rW && cassette.freehub!==rW.freehub) errors.push('Freehub mismatch: '+nameOf(cassette)+' needs a '+L(cassette.freehub)+' freehub, but Rear wheel has '+L(rW.freehub)+'.');

  /* 7. Crank / BB advisory */
  if(crankset && frame) infos.push('Bottom bracket: '+nameOf(crankset)+' uses a '+L(crankset.bb)+' spindle - pair it with the right BB for this frame\'s '+L(frame.bb)+' shell (BB usually sold separately).');

  /* 8. Brake caliper mounts */
  if(fBrake && fork && fBrake.mount!==fork.brakeMount) errors.push('Front brake mount mismatch: Brake is '+L(fBrake.mount)+' but Fork is '+L(fork.brakeMount)+'.');
  if(rBrake && frame && rBrake.mount!==frame.brakeMount) errors.push('Rear brake mount mismatch: Brake is '+L(rBrake.mount)+' but Frame is '+L(frame.brakeMount)+'.');

  /* 9. Rotor interface vs wheel hubs */
  if(fRotor && fW && fRotor.mount!==fW.rotorMount) errors.push('Front rotor interface mismatch: '+L(fRotor.mount)+' rotor on '+L(fW.rotorMount)+' front hub.');
  if(rRotor && rW && rRotor.mount!==rW.rotorMount) errors.push('Rear rotor interface mismatch: '+L(rRotor.mount)+' rotor on '+L(rW.rotorMount)+' rear hub.');

  /* 10. Rotor size vs frame/fork max (warnings) */
  if(fRotor && fork && fRotor.size>fork.maxRotorF) warnings.push('Front rotor: '+fRotor.size+'mm exceeds the fork max of '+fork.maxRotorF+'mm.');
  if(rRotor && frame && rRotor.size>frame.maxRotorR) warnings.push('Rear rotor: '+rRotor.size+'mm exceeds the frame max of '+frame.maxRotorR+'mm.');

  /* 11. Steerer / headset */
  if(fork && frame && fork.steerer!==frame.headset) errors.push('Steerer mismatch: Fork is '+L(fork.steerer)+' but Frame headset is '+L(frame.headset)+'.');

  /* 12. Fork travel vs frame rating (warning) */
  if(fork && frame && fork.travel>frame.maxForkTravel) warnings.push('Fork travel: '+fork.travel+'mm exceeds the frame recommended max of '+frame.maxForkTravel+'mm.');

  /* 13. Dropper diameter vs seat tube */
  if(dropper && frame && dropper.diameter!==frame.seatTube) errors.push('Dropper diameter mismatch: Frame seat tube is '+frame.seatTube+'mm but Dropper is '+dropper.diameter+'mm.');

  /* 14. Tire width vs wheel clearance (per wheel, warnings) */
  if(fTire && fW && fTire.width>fW.maxTire) warnings.push('Front tire clearance: '+fTire.width+'in tire is wider than the front wheel\'s '+fW.maxTire+'in max.');
  if(rTire && rW && rTire.width>rW.maxTire) warnings.push('Rear tire clearance: '+rTire.width+'in tire is wider than the rear wheel\'s '+rW.maxTire+'in max.');

  /* 15. Handlebar / stem clamp */
  if(bar && stem && bar.clamp!==stem.clamp) errors.push('Bar/stem clamp mismatch: Handlebar is '+bar.clamp+'mm but Stem is '+stem.clamp+'mm.');

  /* 16. Rear shock physical fit vs frame */
  if(shock && frame){
    if(shock.eye!==frame.shockEye || shock.stroke!==frame.shockStroke) errors.push('Shock size mismatch: Frame needs '+frame.shockEye+'x'+frame.shockStroke+'mm but Shock is '+shock.eye+'x'+shock.stroke+'mm.');
    if(shock.mount!==frame.shockMount) errors.push('Shock mount mismatch: Frame uses a '+L(frame.shockMount)+' shock but Shock is '+L(shock.mount)+'.');
  }

  /* 17. Frame + shock bundling */
  if(frame && frame.bundledShock){
    var inc = byId(frame.bundledShock), incName = nameOf(inc);
    if(!shock){ infos.push('Frame package: '+nameOf(frame)+' is sold as a frame+shock'+(frame.frameOnly?' (frame-only also available)':' package only')+' with the '+incName+'. Add it under Rear Shock, or pick another.'); }
    else if(shock.id===frame.bundledShock){ infos.push('Package match: you are using the '+incName+' that '+nameOf(frame)+' ships with.'); }
    else if(frame.frameOnly===false){ warnings.push('Frame is package-only: '+nameOf(frame)+' is sold only as a frame+shock bundle with the '+incName+'. You can run the '+nameOf(shock)+', but you will still have to buy the bundle (and pay for the '+incName+') since the frame is not sold bare.'); }
    else { infos.push('Note: '+nameOf(frame)+' ships with the '+incName+', but is also sold frame-only - running the '+nameOf(shock)+' is fine.'); }
  }
  if(shock && shock.oemOnly){ var host=byId(shock.forFrame); if(!frame || frame.id!==shock.forFrame) errors.push('OEM shock: the '+nameOf(shock)+' is only available bundled with the '+nameOf(host)+' - it is not sold separately.'); }

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
/** @param {Part} part @param {string} slotKey @param {Build} [build] @returns {string|null} */
function conflictReason(part, slotKey, build){
  /** @type {Build} */ var base = Object.assign({}, build || {}); delete base[slotKey];
  var before = checkBuild(base).errors;
  /** @type {Build} */ var test = Object.assign({}, base); test[slotKey] = part;
  var after = checkBuild(test).errors;
  for(var i=0;i<after.length;i++){ if(before.indexOf(after[i])<0) return after[i]; }
  return null;
}
/** @param {Part} p @param {Build} [build] @returns {CompatState} */
function compatOf(p, build){
  /** @type {Build} */ var bld = build || {};
  if(Object.keys(bld).length===0) return {state:'n', reason:'Pick some parts first to check fit'};
  if('fills' in p && p.fills){
    var pf = p.fills;
    var before = checkBuild(bld).errors;
    /** @type {Build} */ var test = Object.assign({}, bld);
    Object.keys(pf).forEach(function(s){ test[s]=/** @type {Part} */(byId(pf[s])); });
    var after = checkBuild(test).errors;
    if(after.length>before.length){ var extra = after.filter(function(e){ return before.indexOf(e)<0; }); return {state:'r', reason:(extra[0]||'Conflicts with your current build')}; }
    return {state:'g', reason:'No conflicts with your current build'};
  }
  var slots = _catSlots()[p.cat] || [];
  /** @type {string[]} */ var reasons = [];
  for(var i=0;i<slots.length;i++){ var r = conflictReason(p, slots[i], bld); if(r){ reasons.push(r); } else { return {state:'g', reason:'No conflicts with your current build'}; } }
  return {state:'r', reason:(reasons[0]||'Conflicts with your current build')};
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
  build = build || {}; presetBy = presetBy || {};
  var price = 0, weight = 0, missingWeight = false;
  GROUPS.forEach(function(g){
    if(g.preset && bundleActive(g, build, presetBy)){
      var preset = byId(presetBy[g.key]);
      if(preset){
        price += (preset.price || 0);
        if(typeof preset.weight === 'number') weight += preset.weight; else missingWeight = true;
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

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PARTS:PARTS, GROUPS:GROUPS, SLOTS:SLOTS, LABELS:LABELS, WHEEL_CONFIG:WHEEL_CONFIG,
    byId:byId, nameOf:nameOf, specSummary:specSummary, checkBuild:checkBuild,
    conflictReason:conflictReason, compatOf:compatOf, bundleActive:bundleActive, buildTotals:buildTotals };
}
