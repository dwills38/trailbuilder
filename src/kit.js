'use strict';
/* =============================================================================
   RIDER KIT — data + slots + totals  (Kit Builder, 2026-07-14)
   -----------------------------------------------------------------------------
   The Kit Builder is a SEPARATE page (/KitBuilder) for rider gear: helmets,
   shoes, apparel, and protection, with a price + weight total, cert badges, and
   size labels. Douglas's decisions live in KIT-BUILDER-SCOPE.md ("Decisions -
   DECIDED"). This module is the kit's analog of compat.js's data+helpers layer.

   ISOLATION (the load-bearing fact): kit NEVER touches the bike compatibility
   engine. There are ZERO checkBuild rules for kit (the shoe<->pedal bridge was
   dropped by Douglas), so compat.js is untouched and the verdict-audit harness is
   byte-identical. Kit parts live HERE in KIT_PARTS - never in compat.js's PARTS -
   so nothing the bike engine iterates ever sees them. Every kit slot is OPTIONAL;
   kit produces no fit verdict, only a curated, filterable, provenance-badged list
   with honest totals.

   Category SCHEMA + VOCAB live in src/schema.js (the single source of truth); the
   kit rows below validate against it via `node validate.js` like every other row.

   Dual-mode like compat.js/schema.js: top-level `var`/`function` are browser
   globals (the /KitBuilder page reads them via <script>), and the module.exports
   block at the bottom feeds Node (validate.js + the Vitest suite).
   ========================================================================== */

/** @typedef {import('./types.js').KitPart} KitPart */
/** @typedef {import('./types.js').Slot} Slot */
/** @typedef {import('./types.js').Group} Group */

/* ---- KIT_GROUPS: the rail sections on the Kit Builder page ------------------
   Anatomical sections, purely for layout (kit has no presets/bundles in v1). Every
   slot is `optional:true` - nothing in a kit gates completeness, and each of the 12
   categories has exactly ONE slot, so a kit build is a map { slotKey -> KitPart }
   where slotKey === the category. */
/** @type {Group[]} */
var KIT_GROUPS = [
  { key:'head', label:'Head', icon:'\u{1FA96}', slots:[
      {key:'helmet',    label:'Helmet',      cat:'helmet',    optional:true},
      {key:'eyewear',   label:'Eyewear',     cat:'eyewear',   optional:true} ] },
  { key:'torso', label:'Upper Body', icon:'\u{1F455}', slots:[
      {key:'jersey',    label:'Jersey',      cat:'jersey',    optional:true},
      {key:'bodyarmor', label:'Body Armor',  cat:'bodyarmor', optional:true},
      {key:'neckbrace', label:'Neck Brace',  cat:'neckbrace', optional:true} ] },
  { key:'arms', label:'Arms & Hands', icon:'\u{1F9E4}', slots:[
      {key:'elbowpad',  label:'Elbow Pads',  cat:'elbowpad',  optional:true},
      {key:'gloves',    label:'Gloves',      cat:'gloves',    optional:true} ] },
  { key:'legs', label:'Lower Body', icon:'\u{1FA73}', slots:[
      {key:'shorts',    label:'Shorts',      cat:'shorts',    optional:true},
      {key:'pants',     label:'Pants',       cat:'pants',     optional:true},
      {key:'kneepad',   label:'Knee Pads',   cat:'kneepad',   optional:true},
      {key:'shinguard', label:'Shin Guards', cat:'shinguard', optional:true} ] },
  { key:'feet', label:'Feet', icon:'\u{1F45F}', slots:[
      {key:'shoes',     label:'Shoes',       cat:'shoes',     optional:true} ] }
];

/** Flattened kit slots (slotKey carries its group, mirroring compat.js's SLOTS). @type {Slot[]} */
var KIT_SLOTS = KIT_GROUPS.reduce(function(a, g){
  return a.concat(g.slots.map(function(s){ return Object.assign({group:g.key}, s); }));
}, /** @type {Slot[]} */ ([]));

/** The 12 kit category keys, in slot order. @type {string[]} */
var KIT_CATS = KIT_SLOTS.map(function(s){ return s.cat; });

/* ---- STARTER SEED ----------------------------------------------------------
   A tiny set of REAL products (2-4 per category) so the page is previewable -
   these are fixtures, NOT the grind. Per-category breadth comes later from the
   Sonnet chips. All rows are UNVERIFIED sample data (no verified/source): prices
   are approximate USD MSRP, weights are approximate grams (pads + shoes quoted
   PER PAIR, noted in desc). NEVER fabricated - real products at best-credible
   specs, the catalog's relaxed-inclusion policy.

   Deliberately CERT-FREE: a cert is a safety claim (fetched-source-only), so the
   grind adds `certs` with real sources - the seed never asserts one. `rotational`
   IS entered where it is part of the SKU identity (the model is sold as a MIPS
   product), the way a tire's casing is entered from its SKU. A couple of rows
   carry a `sizeChart` (standard industry size ranges, sample data, not a safety
   claim) to exercise that field. */
/** @type {KitPart[]} */
var KIT_PARTS = [
  /* -- Helmets (type required: half-shell / full-face / convertible) -- */
  { id:'hm-fox-speedframe-pro', cat:'helmet', brand:'Fox', model:'Speedframe Pro', price:169, weight:370,
    type:'half-shell', rotational:'mips', disciplines:['trail','enduro'], sizes:['S','M','L'],
    sizeChart:{ S:{head:[51,55]}, M:{head:[55,59]}, L:{head:[59,63]} } },
  { id:'hm-met-parachute-mcr', cat:'helmet', brand:'MET', model:'Parachute MCR MIPS', price:300, weight:745,
    type:'convertible', rotational:'mips', disciplines:['trail','enduro','dh'], sizes:['S','M','L'],
    desc:'Convertible: removable chin bar (full-face descents, half-shell climbs).' },
  { id:'hm-troyleedesigns-stage', cat:'helmet', brand:'Troy Lee Designs', model:'Stage MIPS', price:330, weight:690,
    type:'full-face', rotational:'mips', disciplines:['enduro','dh'], sizes:['XS/SM','MD/LG','XL/XXL'] },
  { id:'hm-fox-proframe-rs', cat:'helmet', brand:'Fox', model:'Proframe RS', price:420, weight:750,
    type:'full-face', rotational:'mips', disciplines:['enduro','dh'], sizes:['S','M','L','XL'] },

  /* -- Shoes (soleType required: flat / clipless) -- */
  { id:'sho-fiveten-freerider-pro', cat:'shoes', brand:'Five Ten', model:'Freerider Pro', price:160, weight:840,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['40','41','42','43','44','45','46','47'],
    desc:'Stealth S1 rubber flat sole. Weight per pair (approx, size 42).' },
  { id:'sho-shimano-me702', cat:'shoes', brand:'Shimano', model:'ME7 (SH-ME702)', price:200, weight:880,
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['40','41','42','43','44','45','46','47'],
    desc:'2-bolt SPD clipless. BOA + strap. Weight per pair (approx).' },
  { id:'sho-crankbrothers-mallet-boa', cat:'shoes', brand:'Crankbrothers', model:'Mallet BOA', price:200, weight:940,
    soleType:'clipless', closure:'boa', disciplines:['enduro','dh'], sizes:['40','41','42','43','44','45','46','47'],
    desc:'2-bolt SPD clipless gravity shoe. Weight per pair (approx).' },

  /* -- Jerseys (all fields optional) -- */
  { id:'jsy-fox-flexair', cat:'jersey', brand:'Fox', model:'Flexair', price:65, weight:135,
    sleeve:'long', sizes:['S','M','L','XL','XXL'],
    sizeChart:{ S:{chest:[89,94]}, M:{chest:[94,99]}, L:{chest:[99,107]}, XL:{chest:[107,114]}, XXL:{chest:[114,122]} } },
  { id:'jsy-troyleedesigns-skyline', cat:'jersey', brand:'Troy Lee Designs', model:'Skyline SS', price:55, weight:150,
    sleeve:'short', sizes:['S','M','L','XL','XXL'] },
  { id:'jsy-raceface-indy', cat:'jersey', brand:'Race Face', model:'Indy LS', price:70, weight:180,
    sleeve:'long', sizes:['S','M','L','XL'] },

  /* -- Shorts (shorts + pants are SEPARATE cats) -- */
  { id:'sht-fox-flexair', cat:'shorts', brand:'Fox', model:'Flexair Short', price:110, weight:250,
    liner:false, sizes:['28','30','32','34','36','38'] },
  { id:'sht-troyleedesigns-sprint', cat:'shorts', brand:'Troy Lee Designs', model:'Sprint Short', price:90, weight:300,
    liner:false, sizes:['30','32','34','36','38'] },
  { id:'sht-raceface-indy', cat:'shorts', brand:'Race Face', model:'Indy Shorts', price:110, weight:320,
    liner:true, sizes:['S','M','L','XL'], desc:'Ships with a removable chamois liner.' },

  /* -- Pants -- */
  { id:'pnt-fox-defend', cat:'pants', brand:'Fox', model:'Defend Pant', price:150, weight:430,
    liner:false, sizes:['28','30','32','34','36','38'] },
  { id:'pnt-troyleedesigns-sprint', cat:'pants', brand:'Troy Lee Designs', model:'Sprint Pant', price:130, weight:470,
    liner:false, sizes:['30','32','34','36','38'] },
  { id:'pnt-raceface-ruxton', cat:'pants', brand:'Race Face', model:'Ruxton Pant', price:140, weight:410,
    liner:false, sizes:['S','M','L','XL'] },

  /* -- Gloves -- */
  { id:'glv-fox-dirtpaw', cat:'gloves', brand:'Fox', model:'Dirtpaw', price:30, weight:70, sizes:['S','M','L','XL','XXL'] },
  { id:'glv-troyleedesigns-ace', cat:'gloves', brand:'Troy Lee Designs', model:'Ace 2.0', price:40, weight:60, sizes:['S','M','L','XL'] },
  { id:'glv-raceface-indy', cat:'gloves', brand:'Race Face', model:'Indy Gloves', price:35, weight:65, sizes:['S','M','L','XL'] },

  /* -- Knee pads (per pair; certs left to the grind + a source) -- */
  { id:'knp-gform-pro-x3', cat:'kneepad', brand:'G-Form', model:'Pro-X3 Knee', price:70, weight:280,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], desc:'Weight per pair (approx).' },
  { id:'knp-fox-launch-pro', cat:'kneepad', brand:'Fox', model:'Launch Pro D3O Knee', price:90, weight:420,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], desc:'Weight per pair (approx).' },
  { id:'knp-troyleedesigns-speed', cat:'kneepad', brand:'Troy Lee Designs', model:'Speed Knee Sleeve', price:60, weight:300,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], desc:'Weight per pair (approx).' },

  /* -- Elbow pads (per pair) -- */
  { id:'elp-fox-launch-pro', cat:'elbowpad', brand:'Fox', model:'Launch Pro D3O Elbow', price:70, weight:220,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], desc:'Weight per pair (approx).' },
  { id:'elp-gform-pro-x3', cat:'elbowpad', brand:'G-Form', model:'Pro-X3 Elbow', price:50, weight:170,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], desc:'Weight per pair (approx).' },
  { id:'elp-raceface-indy', cat:'elbowpad', brand:'Race Face', model:'Indy Elbow', price:45, weight:190,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], desc:'Weight per pair (approx).' },

  /* -- Body armor (coverage optional) -- */
  { id:'arm-fox-baseframe-pro', cat:'bodyarmor', brand:'Fox', model:'Baseframe Pro D3O', price:180, weight:640,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['S','M','L','XL'] },
  { id:'arm-leatt-airflex-stealth', cat:'bodyarmor', brand:'Leatt', model:'AirFlex Stealth', price:130, weight:280,
    coverage:'back', disciplines:['enduro','dh'], sizes:['S/M','L/XL'] },

  /* -- Neck braces (niche; no universal cert standard - certs stay dormant) -- */
  { id:'nkb-leatt-gpx-55', cat:'neckbrace', brand:'Leatt', model:'GPX 5.5 Neck Brace', price:430, weight:600,
    disciplines:['dh'], sizes:['S/M','L/XL'] },
  { id:'nkb-atlas-vision', cat:'neckbrace', brand:'Atlas', model:'Vision', price:390, weight:520,
    disciplines:['dh'], sizes:['S','M','L'] },

  /* -- Shin guards (per pair) -- */
  { id:'shg-gform-pro', cat:'shinguard', brand:'G-Form', model:'Pro Shin Guard', price:50, weight:210,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], desc:'Weight per pair (approx).' },
  { id:'shg-leatt-airflex', cat:'shinguard', brand:'Leatt', model:'AirFlex Shin Guard', price:60, weight:240,
    disciplines:['enduro','dh'], sizes:['S/M','L/XL'], desc:'Weight per pair (approx).' },

  /* -- Eyewear (type required: glasses / goggles) -- */
  { id:'ewr-oakley-sutro', cat:'eyewear', brand:'Oakley', model:'Sutro', price:180, weight:32,
    type:'glasses', sizes:['OSFA'] },
  { id:'ewr-poc-devour', cat:'eyewear', brand:'POC', model:'Devour', price:220, weight:36,
    type:'glasses', sizes:['OSFA'] },
  { id:'ewr-smith-squad-mtb', cat:'eyewear', brand:'Smith', model:'Squad MTB', price:75, weight:120,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'] }
];

/* id -> kit part (null-prototype so a crafted id can't resolve to an inherited value). */
/** @type {Object.<string, KitPart>} */
var _KIT_BY_ID = Object.create(null);
KIT_PARTS.forEach(function(p){ _KIT_BY_ID[p.id] = p; });
/** @param {string} id @returns {KitPart|null} */
function kitById(id){ return (typeof id === 'string' && _KIT_BY_ID[id]) || null; }

/* ---- kitTotals -------------------------------------------------------------
   Sum price + weight over a kit build map ({ slotKey -> KitPart }). Mirrors the
   component-summation branch of compat.js's buildTotals (price defaults to 0, a
   missing weight sets missingWeight so "weight incomplete" stays honest) but is
   deliberately SELF-CONTAINED - kit has no presets/bundles and must not couple to
   the bike engine (the isolation contract above). Iterates KIT_SLOTS so a stray
   key in `build` is ignored. */
/** @param {Object.<string, (KitPart|null|undefined)>} build @returns {{price:number, weight:number, missingWeight:boolean, count:number}} */
function kitTotals(build){
  build = build || {};
  var price = 0, weight = 0, missingWeight = false, count = 0;
  KIT_SLOTS.forEach(function(s){
    var p = build[s.key];
    if(!p) return;
    count++;
    price += (typeof p.price === 'number' ? p.price : 0);
    if(typeof p.weight === 'number') weight += p.weight; else missingWeight = true;
  });
  return { price:price, weight:weight, missingWeight:missingWeight, count:count };
}

/* ---- Export for Node (validate.js + tests); ignored by the browser --------- */
if(typeof module !== 'undefined' && module.exports){
  module.exports = { KIT_GROUPS:KIT_GROUPS, KIT_SLOTS:KIT_SLOTS, KIT_CATS:KIT_CATS,
    KIT_PARTS:KIT_PARTS, kitById:kitById, kitTotals:kitTotals };
}
