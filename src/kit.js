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
  { id:'hm-fox-speedframe-pro', cat:'helmet', brand:'Fox', model:'Speedframe Pro', price:189.95, weight:380,
    type:'half-shell', rotational:'mips', disciplines:['trail','enduro'], sizes:['S','M','L'],
    sizeChart:{ S:{head:[51,55]}, M:{head:[55,59]}, L:{head:[59,63]} },
    desc:'CORRECTED 2026-07-17: price is the fetched $189.95 list (was sample $169; page also shows a $132.99 sale, not used). Weight is size M, 380±30g maker-stated (was sample 370g, close already; S 355±30g, L 415±35g).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/speedframe-pro-helmet/25102.html' },
  { id:'hm-met-parachute-mcr', cat:'helmet', brand:'MET', model:'Parachute MCR MIPS', price:300, weight:840,
    type:'convertible', rotational:'mips', certs:['astm-f1952'], disciplines:['trail','enduro','dh'], sizes:['S','M','L'],
    desc:'Convertible: removable chin bar (full-face descents, half-shell climbs). Weight is size M full-face (840 g); MET also lists S 820/M 840/L 880 g full-face, 435/455/495 g open-face (chin bar off). Price is an approximate USD conversion of MET’s €350 EU MSRP — no US-MSRP page found.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.met-helmets.com/en/mtb/parachute-mcr-mips' },
  { id:'hm-troyleedesigns-stage', cat:'helmet', brand:'Troy Lee Designs', model:'Stage MIPS', price:325, weight:690,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['XS/SM','MD/LG','XL/XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://troyleedesigns.com/products/stage-helmet-drone-115971-black' },
  { id:'hm-fox-proframe-rs', cat:'helmet', brand:'Fox', model:'Proframe RS', price:399.95, weight:820,
    desc:'Weight is size M (820±5 g); Fox also lists S 710±5 g, L 910±5 g.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.foxracing.com/product/proframe-rs-helmet/31107.html',
    type:'full-face', rotational:'mips', disciplines:['enduro','dh'], sizes:['S','M','L','XL'] },

  /* -- Helmets (breadth grind, 2026-07-14: UNVERIFIED sample rows, best-credible
     public specs, never fabricated. `rotational` entered only where genuinely
     part of the SKU identity and sourced with confidence; several brands run
     their own non-MIPS rotational tech (100%'s Smartshock, Kali's RHEON LDL) -
     `rotational` is deliberately OMITTED for those rather than mis-tagged as
     MIPS. `certs` left dormant catalog-wide here: no cert claim in this batch
     came off a fetched maker standards page, so none is asserted (§2a). -- */
  { id:'hm-giro-manifest-spherical-mips', cat:'helmet', brand:'Giro', model:'Manifest Spherical MIPS', price:279.95, weight:340,
    type:'half-shell', rotational:'mips', certs:['en1078'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.giro.com/product/manifest-spherical-helmet/100000000500000097.html' },
  { id:'hm-giro-tyrant-spherical-mips', cat:'helmet', brand:'Giro', model:'Tyrant Spherical MIPS', price:174.95, weight:600,
    type:'full-face', rotational:'mips', certs:['cpsc'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'Lightweight full-face, weight is size M.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.giro.com/product/tyrant-spherical-helmet/100000000500000086.html' },
  { id:'hm-giro-switchblade-mips', cat:'helmet', brand:'Giro', model:'Switchblade MIPS', price:279.95, weight:975,
    type:'convertible', rotational:'mips', certs:['cpsc','astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'Convertible; weight is the full half-shell + chin-bar assembly, size M.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.giro.com/p/switchblade-mips-full-face-bike-helmet/100000001500000013.html' },
  { id:'hm-bell-4forty-air-mips', cat:'helmet', brand:'Bell', model:'4Forty Air MIPS', price:164.95, weight:360,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.bellhelmets.com/bike/bike-helmets/p/4forty-air-mips-mountain-bike-helmet/100000000500000111.html' },
  { id:'hm-bell-super-air-r-mips', cat:'helmet', brand:'Bell', model:'Super Air R MIPS', price:209.97, weight:640,
    type:'convertible', rotational:'mips', certs:['cpsc'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Convertible; weight is the full-face configuration, size M (lighter as a half-shell alone). Current SKU is Bell’s "Super Air R Spherical" (Spherical Mips), the successor to the plain-MIPS Super Air R this row was modeled on.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.bellhelmets.com/product/super-air-r-spherical/100000000500000093.html' },
  { id:'hm-bell-full9-fusion-mips', cat:'helmet', brand:'Bell', model:'Full-9 Fusion MIPS', price:349.95, weight:1080,
    type:'full-face', rotational:'mips', certs:['cpsc','astm-f1952'], disciplines:['dh'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.bellhelmets.com/bike/p/full-9-fusion-mips-full-face-bike-helmet/100000001500000016.html' },
  { id:'hm-bell-sixer-mips', cat:'helmet', brand:'Bell', model:'Sixer MIPS', price:189.95, weight:395,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.bellhelmets.com/product/sixer-mips/100000000500000069.html' },
  { id:'hm-poc-kortal-race-mips', cat:'helmet', brand:'POC', model:'Kortal Race MIPS', price:280, weight:410,
    type:'half-shell', rotational:'mips', certs:['en1078'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Weight is the M-L shell (380g XS-S, 410g M-L, 470g XL-XXL per pocsports.com). Price kept as an approximate sample — pocsports.com shows no live USD price for this colorway.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.pocsports.com/collections/mountain-biking-helmets-enduro/products/kortal-race-mips' },
  { id:'hm-poc-otocon-race-mips', cat:'helmet', brand:'POC', model:'Otocon Race MIPS', price:400, weight:750,
    type:'full-face', rotational:'mips', certs:['en1078'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'Weight is size M (680g S, 750g M, 850g L per poc.com).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://poc.com/en-us/product/otocon-race-mips-hydrogen-white-uranium-black-matt' },
  { id:'hm-smith-forefront2-mips', cat:'helmet', brand:'Smith', model:'Forefront 2 MIPS', price:240, weight:383,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['S','M','L'],
    desc:'smithoptics.com confirms Mips + KOROYD + certs but publishes no per-SKU weight; weight is a reputable measured figure (13.5 oz, size M).',
    sourceType:'measured', weightSource:'https://www.switchbacktravel.com/reviews/smith-forefront-2-mips',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.smithoptics.com/en-us/products/forefront-2-mips-r-twiceme' },
  { id:'hm-smith-session-mips', cat:'helmet', brand:'Smith', model:'Session MIPS', price:170, weight:371,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['S','M','L'],
    desc:'smithoptics.com confirms Mips + KOROYD + certs but publishes no per-SKU weight; weight is a reputable measured figure, size M.',
    sourceType:'measured', weightSource:'https://off.road.cc/content/review/helmets/smith-optics-session-mips-helmet-review-3364',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.smithoptics.com/en-us/products/session-mips-r' },
  { id:'hm-smith-mainline-mips', cat:'helmet', brand:'Smith', model:'Mainline MIPS', price:350, weight:802,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'smithoptics.com confirms Mips + KOROYD + certs but publishes no per-SKU weight; weight is a reputable measured figure (Pinkbike), size M.',
    sourceType:'measured', weightSource:'https://www.pinkbike.com/news/review-smith-mainline-helmet.html',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.smithoptics.com/en-us/products/mainline-mips-r' },
  { id:'hm-specialized-tactic4', cat:'helmet', brand:'Specialized', model:'Tactic 4', price:119.99, weight:380,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail'], sizes:['S','M','L'],
    desc:'Specialized now sells this model simply as "Tactic" (the "4" generation suffix has dropped from their site).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/tactic/p/1000208435' },
  { id:'hm-specialized-gambit', cat:'helmet', brand:'Specialized', model:'Gambit', price:299.99, weight:640,
    type:'full-face', rotational:'mips', certs:['astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/gambit/p/1000208372' },
  { id:'hm-leatt-allmtn4', cat:'helmet', brand:'Leatt', model:'MTB AllMtn 4.0', price:219, weight:439,
    type:'half-shell', rotational:'360-turbine', certs:['astm-f1952'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'leatt.com confirms the 360° Turbine + ASTM F1952 cert but publishes no per-SKU weight; weight is a reputable measured figure, size S.',
    sourceType:'measured', weightSource:'https://www.bikeradar.com/reviews/helmets/mountain-bike-helmets/leatt-mtb-allmtn-4-0-review',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://us.leatt.com/products/helmet-mtb-allmtn-4-0' },
  { id:'hm-leatt-enduro4', cat:'helmet', brand:'Leatt', model:'MTB Enduro 4.0', price:384, weight:848,
    type:'convertible', rotational:'360-turbine', certs:['astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'Convertible; weight is the full-face configuration, size M (OutdoorGearLab measured 848g full-face / 499g half-shell). leatt.com confirms the 360° Turbine + ASTM F1952 cert but publishes no per-SKU weight.',
    sourceType:'measured', weightSource:'https://www.outdoorgearlab.com/reviews/biking/downhill-helmet/leatt-mtb-4-0-enduro',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://us.leatt.com/products/helmet-mtb-enduro-4-0' },
  { id:'hm-100-altec', cat:'helmet', brand:'100%', model:'Altec', price:165, weight:350,
    type:'half-shell', status:'discontinued', disciplines:['trail'], sizes:['XS/SM','LG/XL'],
    desc:'Non-MIPS proprietary rotational system (Smartshock); not tagged `rotational` here pending a sourced confirmation. Sizes corrected to the maker\'s own labels (XS/SM, LG/XL replace a paraphrased S/M, L/XL). Kit-5 tiebreak (2026-07-20): re-fetched 100percent.com fresh -- the current MTB collection (100percent.com/collections/mtb) lists ONLY goggles/gloves/sunglasses, no helmets at all; 100% has exited the MTB helmet category entirely. The archived source page IS a genuine, fetched manufacturer product page (confirmed by re-fetching the same Wayback snapshot: weight 350g, price $165, size labels XS/SM+LG/XL all match verbatim) -- an archived maker page is an accepted fetch per VERIFY-PROTOCOL\'s Bright Data doctrine, so verified:true stands. Added status:discontinued since the whole category is gone from the brand\'s current site (re-scope-vs-discontinued rule: whole-category-gone case).',
    verified:true, priceBasis:'discontinued-no-msrp', lastChecked:'2026-07-20',
    source:'https://web.archive.org/web/20220702022724/https://www.100percent.com/products/altec-trail-helmet-charcoal' },
  { id:'hm-kaliprotectives-maya3', cat:'helmet', brand:'Kali Protectives', model:'Maya 3.0', price:110, weight:245,
    type:'half-shell', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Non-MIPS proprietary rotational system (RHEON LDL + Conehead); not tagged `rotational` here pending a sourced confirmation.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.kaliprotectives.com/products/maya-3-0' },
  { id:'hm-kaliprotectives-shiva2', cat:'helmet', brand:'Kali Protectives', model:'Shiva 2.0', price:350, weight:1190,
    type:'full-face', status:'discontinued', disciplines:['dh'], sizes:['S','M','L','XL'],
    desc:'Non-MIPS proprietary rotational system (RHEON LDL + Nano Fusion); weight is the standard (non-carbon) shell, size M. No longer on kaliprotectives.com — superseded by Shiva 3.0 Carbon ($750) and Shiva Nano ($999.99); bar can’t be met, kept as sample.' },
  { id:'hm-met-roam-mips', cat:'helmet', brand:'MET', model:'Roam MIPS', price:160, weight:360,
    type:'half-shell', rotational:'mips', disciplines:['trail','enduro'], sizes:['S','M','L'],
    status:'discontinued', desc:'No longer listed on met-helmets.com’s current MTB lineup; sample specs kept from earlier retailer/review data, not manufacturer-verified.' },
  { id:'hm-lazer-jackal-mips', cat:'helmet', brand:'Lazer', model:'Jackal MIPS', price:180, weight:340,
    type:'half-shell', rotational:'mips', disciplines:['trail'], sizes:['S','M','L','XL'],
    status:'discontinued', desc:'Superseded on lazersport.com by the Jackal KinetiCore (Lazer’s own rotational system, not MIPS); weight (340g, size M) and sizing carried over from that current page since the plain-MIPS Jackal is no longer listed. lazersport.com shows no USD price for either version.',
    lastChecked:'2026-07-19', source:'https://www.lazersport.com/global/helmets/off-road/jackal-kineticore' },
  { id:'hm-endura-mt500-mips', cat:'helmet', brand:'Endura', model:'MT500 MIPS', price:265, weight:422,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['S/M','M/L','L/XL'],
    desc:'endurasport.com confirms Mips + Koroyd + certs but publishes no per-SKU weight; weight is a reputable measured figure, size M.',
    sourceType:'measured', weightSource:'https://off.road.cc/content/review/helmets/endura-mt500-mips-helmet-review-12411',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.endurasport.com/en-us/products/mt500-mips%C2%AE-helmet-white-re1536wh' },
  { id:'hm-troyleedesigns-a3-mips', cat:'helmet', brand:'Troy Lee Designs', model:'A3 MIPS', price:330, weight:415,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['XS/SM','MD/LG','XL/2X'],
    desc:'Weight (415 g, size M) is a reputable measured figure — troyleedesigns.com confirms the Mips liner and certs but publishes no per-SKU weight.',
    sourceType:'measured', weightSource:'https://www.pinkbike.com/news/review-troy-lee-designs-new-a3-helmet.html',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://troyleedesigns.com/collections/a3-helmet' },
  { id:'hm-troyleedesigns-d4-composite-mips', cat:'helmet', brand:'Troy Lee Designs', model:'D4 Composite MIPS', price:469, weight:1050,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['XS','SM','MD','LG','XL','2X'],
    desc:'Corrected price ($399 sample -> $469 fetched regular price) and sizes to the maker\'s full incremental sizing. Weight (1050g) is maker-stated.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://troyleedesigns.com/products/sp24-d4-composite-helmet-w-mips-stealth-black' },

  /* -- Helmets, batch 2 (2026-07-14): MANUFACTURER-FETCHED rows, verified:true +
     source where the product page confirmed the row's specs. Currency notes:
     MET prices are EUR-listed (converted ~1.08 USD/EUR, noted in desc); Endura
     GBP-listed (converted ~1.27 USD/GBP, noted in desc) - conversion, not a
     spec guess, so verified stands. Lazer's KinetiCore is Lazer's own
     proprietary rotational tech (not MIPS) and its US pages carried no price -
     entered UNVERIFIED with an estimated street price, weight/type sourced. -- */
  { id:'hm-poc-cularis', cat:'helmet', brand:'POC', model:'Cularis', price:260, weight:350,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Weight is size M (S 360g, L 430g on the maker page).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://poc.com/en-us/product/cularis-uranium-black-matt' },
  { id:'hm-poc-barocon-carbon', cat:'helmet', brand:'POC', model:'Barocon Carbon', price:900, weight:1040,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh'], sizes:['S','M','L'],
    desc:'Weight is size M (S 1030g, L 1160g on the maker page).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://poc.com/en-us/product/barocon-carbon-carbon-matt' },
  { id:'hm-poc-coron-air-mips', cat:'helmet', brand:'POC', model:'Coron Air MIPS', price:370, weight:1150,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S/M','L'],
    desc:'Weight is size M (L 1220g on the maker page).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://poc.com/en-us/product/coron-air-mips-hydrogen-white' },
  { id:'hm-poc-coron-air-carbon-mips', cat:'helmet', brand:'POC', model:'Coron Air Carbon MIPS', price:550, weight:1030,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'Weight is size S/M (L 1110g on the maker page). Carbon-shell version of Coron Air.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://poc.com/en-us/product/coron-air-carbon-mips' },
  { id:'hm-poc-tectal-race-mips', cat:'helmet', brand:'POC', model:'Tectal Race MIPS', price:220, weight:380,
    type:'half-shell', rotational:'mips', certs:['en1078'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://poc.com/en-us/product/tectal-race-mips-argentite-silver-uranium-black-matt' },
  { id:'hm-smith-convoy-mips', cat:'helmet', brand:'Smith', model:'Convoy MIPS', price:85, weight:300,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['XS','S','M','L','XL'],
    desc:'Regular price (page shows a past-season sale price of $51).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.smithoptics.com/en-us/products/convoy-mips-r' },
  { id:'hm-smith-hardline-carbon-mips', cat:'helmet', brand:'Smith', model:'Hardline Carbon MIPS', price:600, weight:910,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.smithoptics.com/en-us/products/hardline-carbon-mips-r' },
  { id:'hm-smith-hardline-mips', cat:'helmet', brand:'Smith', model:'Hardline MIPS', price:450, weight:990,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh'], sizes:['S','M','L'],
    desc:'Composite-shell version of the Hardline Carbon.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.smithoptics.com/en-us/products/hardline-mips-r' },
  { id:'hm-smith-forefront3-mips', cat:'helmet', brand:'Smith', model:'Forefront 3 MIPS', price:300,
    type:'half-shell', rotational:'mips', disciplines:['trail'],
    desc:'Weight not stated on the fetched maker page (JS-rendered spec table); price/type/rotational confirmed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.smithoptics.com/en-us/products/forefront-3-mips-r' },
  { id:'hm-smith-payroll-mips', cat:'helmet', brand:'Smith', model:'Payroll MIPS', price:230,
    type:'half-shell', rotational:'mips', disciplines:['trail','enduro'],
    desc:'Weight not stated on the fetched maker page; price/type/rotational confirmed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.smithoptics.com/en-us/products/payroll-mips-r' },
  { id:'hm-smith-engage-mips', cat:'helmet', brand:'Smith', model:'Engage MIPS', price:150,
    type:'half-shell', rotational:'mips', disciplines:['trail'],
    desc:'Weight not stated on the fetched maker page; price/type/rotational confirmed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.smithoptics.com/en-us/products/engage-mips-r' },
  { id:'hm-leatt-trail3', cat:'helmet', brand:'Leatt', model:'MTB Trail 3.0', price:175, weight:350,
    type:'half-shell', rotational:'360-turbine', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-trail-3-0' },
  { id:'hm-leatt-allmtn3', cat:'helmet', brand:'Leatt', model:'MTB AllMtn 3.0', price:175, weight:350,
    type:'half-shell', rotational:'360-turbine', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-allmtn-3-0' },
  { id:'hm-leatt-allmtn2', cat:'helmet', brand:'Leatt', model:'MTB AllMtn 2.0', price:131, weight:375,
    type:'half-shell', rotational:'360-turbine', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-allmtn-2-0' },
  { id:'hm-leatt-endurance4', cat:'helmet', brand:'Leatt', model:'MTB Endurance 4.0', price:209, weight:315,
    type:'half-shell', rotational:'360-turbine', certs:['cpsc','en1078'], disciplines:['xc'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-endurance-4-0' },
  { id:'hm-leatt-enduro3', cat:'helmet', brand:'Leatt', model:'MTB Enduro 3.0', price:329, weight:690,
    type:'convertible', rotational:'360-turbine', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'Convertible; weight is the full-face configuration with chin bar (from 360g as a half-shell alone).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-enduro-3-0' },
  { id:'hm-leatt-gravity4', cat:'helmet', brand:'Leatt', model:'MTB Gravity 4.0', price:329, weight:850,
    type:'half-shell', rotational:'360-turbine', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Maker page lists this as a half-shell despite the gravity/DH-oriented "Gravity" line name.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-gravity-4-0' },
  { id:'hm-leatt-gravity1-junior', cat:'helmet', brand:'Leatt', model:'MTB Gravity 1.0 - Junior', price:110, weight:960,
    type:'full-face', rotational:'360-turbine', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['Junior-XXS','Junior-XS'],
    desc:'Genuine junior-specific full-face SKU (own product page, Jr XXS 51-52cm / Jr XS 53-54cm head sizing), not the adult Gravity line resized. 360-degree Turbine rotational technology.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/helmet-mtb-gravity-1-0-junior' },
  { id:'hm-leatt-gravity5', cat:'helmet', brand:'Leatt', model:'MTB Gravity 5.0', price:399, weight:710,
    type:'full-face', rotational:'360-turbine', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-gravity-5-0' },
  { id:'hm-leatt-gravity6-carbon', cat:'helmet', brand:'Leatt', model:'MTB Gravity 6.0 Carbon', price:439, weight:840,
    type:'full-face', rotational:'360-turbine', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-gravity-6-0-carbon' },
  { id:'hm-leatt-gravity8-carbon', cat:'helmet', brand:'Leatt', model:'MTB Gravity 8.0 Carbon', price:549, weight:1120,
    type:'full-face', rotational:'360-turbine', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/collections/mtb-helmets/products/helmet-mtb-gravity-8-0' },
  { id:'hm-kaliprotectives-of-invader', cat:'helmet', brand:'Kali Protectives', model:'OF Invader', price:250, weight:640,
    type:'half-shell', rotational:'rheon', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['XS-M','L-XXL'],
    desc:'Kali RHEON Low Density Layer rotational tech (backfilled 2026-07-16: `rheon` was added to the rotational vocab after this row was entered 2026-07-14, when it had to be omitted). Page states this open-face model is NOT ASTM-rated for downhill.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.kaliprotectives.com/products/of-invader' },
  { id:'hm-kaliprotectives-dh-invader', cat:'helmet', brand:'Kali Protectives', model:'DH Invader', price:290, weight:750,
    type:'full-face', rotational:'rheon', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh','enduro'], sizes:['XS-M','L-XXL'],
    desc:'Kali RHEON Low Density Layer rotational tech (backfilled 2026-07-16: `rheon` was added to the rotational vocab after this row was entered 2026-07-14, when it had to be omitted).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.kaliprotectives.com/products/dh-invader' },
  { id:'hm-kaliprotectives-chakra-solo', cat:'helmet', brand:'Kali Protectives', model:'Chakra Solo', price:50, weight:292,
    type:'half-shell', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['S/M','L/XL'],
    desc:'Composite Fusion shell-foam bonding (not a named rotational-impact system, not MIPS).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.kaliprotectives.com/products/chakra-solo' },
  { id:'hm-kaliprotectives-interceptor2', cat:'helmet', brand:'Kali Protectives', model:'Interceptor 2.0', weight:430,
    type:'half-shell', rotational:'rheon', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    price:200,
    desc:'Fetched kaliprotectives.com/products/interceptor-2-0 for the interface fields (Conehead Nano'
      + ' Fusion + RHEON Low Density Layer, CPSC/EN1078, S/M weight 430g, sizes S/M+L/XL). RE-CHECKED'
      + ' 2026-07-16 via the Shopify .js product-JSON endpoint (price/compare_at_price fields, not the'
      + ' rendered page which only showed an ambiguous "Save $200.00" sale banner): both price and'
      + ' compare_at_price are 20000 cents = $200.00 flat, so $200 is the real, undiscounted MSRP'
      + ' (corrects the prior $160 Bikerumor/dealer-sourced estimate). The JSON tags array also lists'
      + ' "MIPS" alongside "LDL" - kept `rotational:\'rheon\'` unchanged since that came from the actual'
      + ' product page copy (Kali\'s own RHEON LDL tech) with more confidence than a generic Shopify tag.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.kaliprotectives.com/products/interceptor-2-0' },
  { id:'hm-met-terrae', cat:'helmet', brand:'MET', model:'Terræ', price:162, weight:380,
    type:'half-shell', rotational:'mips', disciplines:['trail'], sizes:['S','M','L'],
    desc:'Maker lists €150 (converted at ~1.08 USD/EUR).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.met-helmets.com/en/shop/mtb-helmets/trail-helmets/terrae/' },
  { id:'hm-met-veleno-mips', cat:'helmet', brand:'MET', model:'Veleno MIPS', price:162, weight:300,
    type:'half-shell', rotational:'mips', disciplines:['trail','xc'], sizes:['S','M','L'],
    desc:'Maker lists €150 (converted at ~1.08 USD/EUR). Weight is size M (S 290g, L 335g on the maker page).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.met-helmets.com/en/shop/mtb-helmets/trail-helmets/veleno-mips/' },
  { id:'hm-met-shelter-mips', cat:'helmet', brand:'MET', model:'Shelter MIPS', price:108, weight:330,
    type:'half-shell', rotational:'mips', disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Maker lists €100 (converted at ~1.08 USD/EUR). Extended-coverage half-shell.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.met-helmets.com/en/shop/mtb-helmets/trail-helmets/shelter-mips/' },
  { id:'hm-met-revo', cat:'helmet', brand:'MET', model:'Revo', price:216, weight:390,
    type:'half-shell', rotational:'mips', disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Maker lists €200 (converted at ~1.08 USD/EUR).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.met-helmets.com/en/shop/mtb-helmets/enduro-helmets/revo/' },
  { id:'hm-lazer-jackal-kineticore', cat:'helmet', brand:'Lazer', model:'Jackal KinetiCore', price:159.99, weight:340,
    type:'half-shell', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'RETRY 2026-07-16: found the real US storefront lazersport.us (distinct from lazersport.com, which 404s these product paths). Weight is size M (52-56/55-59/58-61/61-64cm S-XL). KinetiCore is Lazer\'s own integrated rotational-impact design, not MIPS - `rotational` omitted (no vocab token for it).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://lazersport.us/products/jackalkineticore' },
  { id:'hm-lazer-coyote-kineticore', cat:'helmet', brand:'Lazer', model:'Coyote KinetiCore', price:150, weight:340,
    type:'half-shell', disciplines:['trail'], sizes:['S','M','L'],
    desc:'Weight/type/KinetiCore rotational-EPS design confirmed on lazersport.com; US price page 404’d, price is an unverified street estimate. KinetiCore is Lazer’s own EPS design, not MIPS.',
    verified:true, priceBasis:'discontinued-no-msrp', lastChecked:'2026-07-19', source:'https://www.lazersport.com/global/helmets/off-road/coyote-kineticore' },
  { id:'hm-lazer-impala-kineticore', cat:'helmet', brand:'Lazer', model:'Impala KinetiCore', price:130, weight:370,
    type:'half-shell', disciplines:['trail'], sizes:['S','M','L'],
    desc:'Open-face; weight/type confirmed on lazersport.com; US price page 404’d, price is an unverified street estimate. Includes RECCO Rescue Technology. KinetiCore is not MIPS.',
    verified:true, priceBasis:'discontinued-no-msrp', lastChecked:'2026-07-19', source:'https://www.lazersport.com/global/helmets/off-road/impala-kineticore' },
  { id:'hm-lazer-cage-kineticore', cat:'helmet', brand:'Lazer', model:'Cage KinetiCore', price:280, weight:820,
    type:'full-face', disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL'],
    desc:'Weight/type confirmed on lazersport.com; US price page 404’d, price is an unverified street estimate. Maker states "ASTM certified" for downhill without naming the exact designation, so no `certs` token is asserted. KinetiCore is not MIPS.',
    verified:true, priceBasis:'discontinued-no-msrp', lastChecked:'2026-07-19', source:'https://www.lazersport.com/global/helmets/off-road/cage-kineticore' },
  { id:'hm-endura-hummvee-mips', cat:'helmet', brand:'Endura', model:'Hummvee MIPS', price:76,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['S-M','M-L','L-XL'],
    desc:'Maker lists £60 (converted at ~1.27 USD/GBP). Open-face; weight not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.endurasport.com/collections/helmets-mtb-open-face/products/hummvee-mips%C2%AE-helmet-black-re1583bk' },
  { id:'hm-endura-hummvee-plus-mips', cat:'helmet', brand:'Endura', model:'Hummvee Plus MIPS', price:114,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['S-M','M-L','L-XL'],
    desc:'Maker lists £90 (converted at ~1.27 USD/GBP). Open-face; weight not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.endurasport.com/collections/helmets-mtb-open-face/products/hummvee-plus-mips%C2%AE-helmet-black-re1553bk' },
  { id:'hm-endura-singletrack-mips', cat:'helmet', brand:'Endura', model:'SingleTrack MIPS', price:152,
    type:'half-shell', rotational:'mips', certs:['en1078'], disciplines:['trail'], sizes:['S-M','M-L','L-XL'],
    desc:'Maker lists £120 (converted at ~1.27 USD/GBP). Open-face with Koroyd panels; weight not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.endurasport.com/collections/helmets-mtb-open-face/products/singletrack-helmet-mips%C2%AE-black-re1552bk' },
  { id:'hm-endura-mt500-fullface-mips', cat:'helmet', brand:'Endura', model:'MT500 Full Face MIPS', price:318,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S-M','M-L','L-XL'],
    desc:'Maker lists £250 (converted at ~1.27 USD/GBP); weight not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.endurasport.com/collections/helmets-mtb-full-face/products/mt500-full-face-mips%C2%AE-helmet-black-re1571bk' },

  /* -- Helmets, batch 3 (2026-07-14): new brands iXS, Sweet Protection, O'Neal,
     Uvex — manufacturer-fetched, verified:true + source. Prices converted from
     the maker page's list price (EUR ~1.08 USD/EUR, GBP ~1.27 USD/GBP, noted in
     desc) - conversion, not a spec guess. Abus was researched but every
     abus.com path returned 403/401 to WebFetch (site-wide block); no Abus rows
     entered rather than reporting unfetched figures - flag as a tooling gap
     (a scraping connector would unblock it, per Douglas's standing "notify
     missing tools" preference).
     UPDATE 2026-07-16 (kit-grind-2): abus.com still 403s, but its US storefront
     abususa.com fetches clean - unblocks the 3 Abus rows below. -- */
  { id:'hm-abus-airdrop-mips', cat:'helmet', brand:'Abus', model:'AirDrop MIPS', price:329.99, weight:790,
    type:'full-face', rotational:'mips', certs:['cpsc'], disciplines:['enduro','dh'], sizes:['S/M','L/XL'],
    desc:'Weight is size S/M (52-58cm, 790g; L/XL 890g on the maker page). Lightweight full-face for enduro/bike-park.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.abususa.com/products/airdrop-mips' },
  { id:'hm-abus-hidrop', cat:'helmet', brand:'Abus', model:'HiDrop', price:219.99, weight:1070,
    type:'full-face', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh'], sizes:['S','M','L','XL'],
    desc:'DH-rated full-face raced at EWS/Crankworx/DH World Cup per the maker; weight is size M (S 1060g, M 1070g, L 1080g, XL 1090g). No rotational-protection system stated on the fetched page (ABS shell + dual-density EPS/EPP only) - `rotational` deliberately omitted rather than guessed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.abususa.com/products/hidrop' },
  { id:'hm-abus-modrop-mips', cat:'helmet', brand:'Abus', model:'ModRop MIPS', price:159.99, weight:370,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Weight is size M (S 340g, M 370g, L 390g on the maker page). All-round trail/enduro half-shell with visor.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.abususa.com/products/modrop-mips' },
  { id:'hm-ixs-trigger-am-mips', cat:'helmet', brand:'iXS', model:'Trigger AM MIPS', price:204,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['SM','M','ML'],
    desc:'Maker lists €189 (converted at ~1.08 USD/EUR). Weight not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://ixs.com/en/mtb/mtb-equipment/helmets/2296/helmet-trigger-am-mips-black' },
  { id:'hm-ixs-trail-evo', cat:'helmet', brand:'iXS', model:'Trail Evo', price:118,
    type:'half-shell', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['XS','SM','ML','XLW'],
    desc:'Maker lists €109 (converted at ~1.08 USD/EUR). Base variant carries no rotational-impact system (a separate "Trail Evo MIPS" SKU exists). Weight not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://ixs.com/en/mtb/mtb-equipment/helmets/1588/helmet-trail-evo-black' },
  { id:'hm-ixs-xult-dh', cat:'helmet', brand:'iXS', model:'Xult DH', price:355,
    type:'full-face', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh','enduro'], sizes:['SM','ML','LXL'],
    desc:'Maker lists €329 (converted at ~1.08 USD/EUR). iXS’s own Xmatter/Xrail-Liner rotational tech (not MIPS - omitted from `rotational`). Weight not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.ixs.com/en-us/products/ixs-helm-xult-dh-schwarz' },
  { id:'hm-sweetprotection-bushwhacker-2vi-mips', cat:'helmet', brand:'Sweet Protection', model:'Bushwhacker 2Vi MIPS', price:275, weight:430,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['SM','ML','LXL'],
    desc:'Weight is size M/L.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.sweetprotection.com/us/en/bushwhacker-2vi-mips-helmet-maze-green/' },
  { id:'hm-sweetprotection-trailblazer-mips', cat:'helmet', brand:'Sweet Protection', model:'Trailblazer MIPS', price:220, weight:325,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail'], sizes:['SM','ML','LXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.sweetprotection.com/us/en/trailblazer-mips-helmet-maze-green/' },
  { id:'hm-sweetprotection-arbitrator-mips', cat:'helmet', brand:'Sweet Protection', model:'Arbitrator MIPS', price:377, weight:980,
    type:'convertible', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh','enduro'], sizes:['SM','ML'],
    desc:'Maker lists €349 (converted at ~1.08 USD/EUR). Weight is the full-face configuration with chin guard (550g without).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.sweetprotection.com/eu/en/arbitrator-mips-helmet-matte-blacknatural-carbon/' },
  { id:'hm-oneal-defender-solid', cat:'helmet', brand:"O'Neal", model:'Defender SOLID', price:89, weight:380,
    type:'half-shell', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['XS/S/M','L/XL'],
    desc:'Maker lists £70 (converted at ~1.27 USD/GBP). Double in-mold construction; no named rotational-impact system.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.oneal.eu/en-gb/products/oneal-defender-helmet-solid-3' },
  { id:'hm-oneal-trailfinder-evo-solid', cat:'helmet', brand:"O'Neal", model:'Trailfinder EVO SOLID', price:97,
    type:'half-shell', certs:['en1078'], disciplines:['trail'], sizes:['XS','S','S/M','M','L','L/XL','XL','2XL'],
    desc:'Maker lists €89.99 (converted at ~1.08 USD/EUR). Weight and rotational tech not stated on the fetchable collection page (variant pages 404’d).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.oneal.eu/en/collections/trailfinder-helmet' },
  { id:'hm-oneal-backflip', cat:'helmet', brand:"O'Neal", model:'Backflip', price:135,
    type:'full-face', disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Maker lists €119.99–€129.99 by color (midpoint converted at ~1.08 USD/EUR). Weight, rotational tech and cert standard not stated on the fetchable collection page (variant pages 404’d).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.oneal.eu/en/collections/backflip-helmet' },
  { id:'hm-uvex-quatro', cat:'helmet', brand:'Uvex', model:'Quatro', price:130, weight:280,
    type:'half-shell', certs:['en1078'], disciplines:['trail','xc'], sizes:['52-57cm','56-61cm'],
    desc:'Maker lists €119.95 (converted at ~1.08 USD/EUR). Base model carries no rotational-impact system.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.uvex-sports.com/en/bike/bike-helmets/s41077530-uvex-quatro-all-black-4043197336633' },
  { id:'hm-uvex-revolt-mips', cat:'helmet', brand:'Uvex', model:'Revolt MIPS', price:270,
    type:'convertible', rotational:'mips', disciplines:['dh'],
    desc:'Maker lists €249.95 (converted at ~1.08 USD/EUR). 2-in-1 one-hand detachable chin bar. Weight, sizes and cert standard not stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.uvex-sports.com/en/uvex-revolt' },

  /* -- Helmets, batch 4 (2026-07-14): new brands Urge, Bluegrass, Bontrager/Trek,
     Scott, Giant — manufacturer-fetched, verified:true + source. Prices
     converted from the maker page's EUR list price (~1.08 USD/EUR, noted in
     desc) where the brand sells EUR-only. Bontrager's WaveCel is a genuine
     `rotational` vocab token (not MIPS-only) - used where the fetched page
     confirms it. Models the researcher couldn't confirm as still-current on
     the maker's own site (Bontrager "Line MIPS", Giant "Method", Urge
     "Down-O-Matic RR") were not entered. -- */
  { id:'hm-urge-endur-o-matic-2', cat:'helmet', brand:'Urge', model:'Endur-O-Matic 2', price:81, weight:420,
    type:'half-shell', disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Maker lists €74.90 (converted at ~1.08 USD/EUR). Weight is S/M (L/XL 430g). No rotational-impact system stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://urgebike.com/en/product/endur-o-matic-2-blue/' },
  { id:'hm-urge-gringo-de-la-sierra', cat:'helmet', brand:'Urge', model:'Gringo de la Sierra', price:162, weight:830,
    type:'convertible', disciplines:['enduro','dh'], sizes:['S/M','L/XL'],
    desc:'Maker lists €149.90 (converted at ~1.08 USD/EUR). Marketed as usable full-face or open-face. Weight is S/M (L/XL 840g). No cert standard code stated on the fetched page.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://urgebike.com/en/product/gringo-de-la-sierra-black/' },
  { id:'hm-urge-treps', cat:'helmet', brand:'Urge', model:'TREPS', price:172, weight:400,
    type:'half-shell', disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Maker lists €159 (converted at ~1.08 USD/EUR). Weight is S/M (L/XL 440g). Urge’s own "ERT" rotational-energy tech (not MIPS - omitted from `rotational`).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://urgebike.com/en/product/treps-bloom-beam-ert/' },
  { id:'hm-urge-rascas', cat:'helmet', brand:'Urge', model:'RASCAS', price:215, weight:420,
    type:'half-shell', disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Maker lists €199 (converted at ~1.08 USD/EUR). Weight is S/M (L/XL 480g). Urge’s own "ERT" rotational-energy tech (not MIPS).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://urgebike.com/en/product/rascas-dark-moon-ert/' },
  { id:'hm-bluegrass-vanguard-core', cat:'helmet', brand:'Bluegrass', model:'Vanguard Core', price:356, weight:700,
    type:'full-face', rotational:'mips', certs:['astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    desc:'Maker lists €330 (converted at ~1.08 USD/EUR). Weight is size S (M 725g, L 790g). Fixed, non-removable chin bar.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-helmets/bluegrass-trail-helmets/vanguard-core/' },
  { id:'hm-bluegrass-rogue', cat:'helmet', brand:'Bluegrass', model:'Rogue', price:130, weight:310,
    type:'half-shell', disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Maker lists €120 (converted at ~1.08 USD/EUR). Weight is size S (M 320g, L 340g). Base model carries no rotational-impact system (a "Rogue Core Mips" variant is sold separately).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-helmets/bluegrass-trail-helmets/rogue/' },
  { id:'hm-bluegrass-legit-mips', cat:'helmet', brand:'Bluegrass', model:'Legit MIPS', price:313, weight:1120,
    type:'full-face', rotational:'mips', certs:['astm-f1952'], disciplines:['dh','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'Maker lists €290 (converted at ~1.08 USD/EUR). Weight is XS/S/M (L/XL 1220g).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-helmets/downhill-helmets/legit-mips/' },
  { id:'hm-bontrager-rally-wavecel', cat:'helmet', brand:'Bontrager', model:'Rally WaveCel', price:159.99, weight:360,
    type:'half-shell', rotational:'wavecel', certs:['cpsc'], disciplines:['trail'], sizes:['S','L','XL'],
    desc:'Weight is size S (L 430g, XL 435g).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.trekbikes.com/us/en_US/equipment/bike-accessories/bike-helmets/mountain-bike-helmets/bontrager-rally-wavecel-mountain-bike-helmet/p/31564/' },
  { id:'hm-bontrager-blaze-wavecel', cat:'helmet', brand:'Bontrager', model:'Blaze WaveCel', price:299.99, weight:380,
    type:'half-shell', rotational:'wavecel', disciplines:['trail'], sizes:['S','M','L'],
    desc:'Weight is size S (M 420g, L 448g).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.trekbikes.com/us/en_US/equipment/bike-accessories/bike-helmets/wavecel-helmets/bontrager-blaze-wavecel-mountain-bike-helmet/p/25359/' },
  { id:'hm-scott-stego-plus', cat:'helmet', brand:'Scott', model:'Stego Plus (CPSC)', price:189.99, weight:420,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Extended-coverage half-shell.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.scott-sports.com/us/en/product/scott-stego-plus-cpsc-helmet' },
  { id:'hm-scott-groove-plus', cat:'helmet', brand:'Scott', model:'Groove Plus (CPSC)', price:89.99, weight:270,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail'], sizes:['S/M','M/L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.scott-sports.com/us/en/product/scott-groove-plus-cpsc-helmet' },
  { id:'hm-giant-rail', cat:'helmet', brand:'Giant', model:'Rail', price:199.99, weight:360,
    type:'half-shell', rotational:'mips', disciplines:['trail'], sizes:['S','M','L'],
    desc:'Weight is size M. No CPSC/EN standard code stated on the fetched page (cites a Virginia Tech safety rating instead).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.giant-bicycles.com/us/rail-mens-helmet-2023' },
  { id:'hm-giant-roost', cat:'helmet', brand:'Giant', model:'Roost', price:119.99,
    type:'half-shell', rotational:'mips', disciplines:['trail'],
    desc:'Weight and sizes not stated on the fetchable showcase page (the dedicated product page 404s).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.giant-bicycles.com/us/showcase/roost' },

  /* -- Helmets, batch 5 (2026-07-14, final): deeper Giro/Bell/Fox/Troy Lee
     Designs lineups — manufacturer-fetched (Giro/Bell/Fox are JS-rendered
     SPAs; the researcher used a rendering browser tool to read the live DOM,
     equivalent to reading the manufacturer page), verified:true + source.
     Prices are the page's listed MSRP (not a sale price) where the page
     showed both. Fox pages consistently omit weight - left unstated rather
     than estimated. Bell XR Spherical (road/gravel/MTB crossover) and Bell
     Drifter MIPS (commuter-oriented) were excluded as not MTB-specific. -- */
  { id:'hm-giro-artex-mips', cat:'helmet', brand:'Giro', model:'Artex MIPS', price:169.95, weight:340,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.giro.com/product/artex-mips-helmet/100000000500000076.html' },
  { id:'hm-giro-montaro-mips2', cat:'helmet', brand:'Giro', model:'Montaro MIPS II', price:199.95, weight:370,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Extended-coverage, goggle-compatible.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.giro.com/product/montaro-mips-ii-helmet/100000000500000117.html' },
  { id:'hm-giro-fixture-mips2', cat:'helmet', brand:'Giro', model:'Fixture MIPS II', price:84.95, weight:330,
    type:'half-shell', rotational:'mips', certs:['en1078'], disciplines:['trail'], sizes:['UA'],
    desc:'Entry-level, universal-adult sizing.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.giro.com/product/fixture-mips-ii-helmet/100000002400000017.html' },
  { id:'hm-giro-radix-mips', cat:'helmet', brand:'Giro', model:'Radix MIPS', price:119.95, weight:300,
    type:'half-shell', rotational:'mips', certs:['en1078'], disciplines:['trail'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.giro.com/product/radix-mips-helmet/100000000500000088.html' },
  { id:'hm-giro-source-mips', cat:'helmet', brand:'Giro', model:'Source MIPS', price:149.95, weight:340,
    type:'half-shell', rotational:'mips', certs:['en1078'], disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Moto-style visor.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.giro.com/product/source-mips-helmet/100000000500000098.html' },
  { id:'hm-bell-spark2-mips', cat:'helmet', brand:'Bell', model:'Spark 2 MIPS', price:99.95, weight:330,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail'], sizes:['S/M','M/L','XL'],
    desc:'Weight is size M/L.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/spark-2-mips/100000000500000113.html' },
  { id:'hm-bell-full-air-mips', cat:'helmet', brand:'Bell', model:'Full-Air MIPS', price:299.95,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Weight not stated on the fetched page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/full-air-mips/100000001500000026.html' },
  { id:'hm-bell-3qtr-air-mips', cat:'helmet', brand:'Bell', model:'3Qtr-Air MIPS', price:279.95,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['enduro'], sizes:['S','M','L','XL'],
    desc:'Extended coverage, no chin bar (based on the Full-Air MIPS shell). Weight not stated on the fetched page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/3qtr-air-mips/100000000500000135.html' },
  { id:'hm-bell-sanction2-dlx-mips', cat:'helmet', brand:'Bell', model:'Sanction 2 DLX MIPS', price:199.95, weight:1080,
    type:'full-face', rotational:'mips', certs:['cpsc','astm-f1952'], disciplines:['dh'], sizes:['XS/S','M','L','XL'],
    desc:'Weight is size M.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/sanction-2-dlx-mips/100000001500000025.html' },
  { id:'hm-bell-sanction2', cat:'helmet', brand:'Bell', model:'Sanction 2', price:139.95, weight:1040,
    type:'full-face', certs:['cpsc','astm-f1952'], disciplines:['dh'], sizes:['XXS','XS-S','M','L','XL'],
    desc:'Weight is size M. No rotational-impact tech (non-MIPS tier of the Sanction 2 DLX).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/sanction-2/100000001500000024.html' },
  { id:'hm-bell-full10-spherical', cat:'helmet', brand:'Bell', model:'Full-10 Spherical', price:799.95, weight:1000,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078'], disciplines:['dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Carbon shell. Weight is size M.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/full-10-spherical/100000001500000020.html' },
  { id:'hm-bell-full10-mips', cat:'helmet', brand:'Bell', model:'Full-10 MIPS', price:599.95, weight:1000,
    type:'full-face', rotational:'mips', certs:['cpsc','en1078','astm-f1952'], disciplines:['dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Composite-shell version of the Full-10 Spherical. Weight is size M.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/full-10-mips/100000001500000028.html' },
  { id:'hm-bell-4forty-mips', cat:'helmet', brand:'Bell', model:'4Forty MIPS', price:124.95, weight:380,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Weight is size M. Non-vented-shell sibling of the 4Forty Air MIPS.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/4forty-mips/100000000500000068.html' },
  { id:'hm-bell-super-dh-spherical', cat:'helmet', brand:'Bell', model:'Super DH Spherical', price:384.95, weight:860,
    type:'convertible', rotational:'mips', certs:['cpsc','astm-f1952'], disciplines:['dh','enduro'], sizes:['S','M','L'],
    desc:'Tool-free removable chin bar. Weight is size M.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/super-dh-spherical/100000000500000056.html' },
  { id:'hm-bell-super-air-spherical', cat:'helmet', brand:'Bell', model:'Super Air Spherical', price:187.98, weight:410,
    type:'half-shell', rotational:'mips', certs:['cpsc'], disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Weight is size M. Compatible with an optional add-on chin bar sold separately (not a bundled convertible SKU).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.bellhelmets.com/product/super-air-spherical/100000000500000094.html' },
  { id:'hm-fox-rampage', cat:'helmet', brand:'Fox', model:'Rampage', price:259.95,
    type:'full-face', rotational:'mips', disciplines:['dh'], sizes:['XS','S','M','L','XL','2XL'],
    desc:'Weight not stated on the fetched page. The maker page lists only NTA-8776 (not a token in the protectionCert vocab), so no `certs` asserted.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.foxracing.com/product/rampage-matte-black-helmet/32212.html' },
  { id:'hm-fox-rampage-rs', cat:'helmet', brand:'Fox', model:'Rampage RS', price:699.95,
    type:'full-face', rotational:'mips', certs:['en1078','cpsc','astm-f1952'], disciplines:['dh'], sizes:['XS','S','M','L','XL','2XL'],
    desc:'Carbon shell, top tier. Weight not stated on the fetched page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.foxracing.com/product/rampage-rs-matte-black-helmet/33636.html' },
  { id:'hm-fox-crossframe-pro', cat:'helmet', brand:'Fox', model:'Crossframe Pro', price:239.95,
    type:'half-shell', rotational:'mips', disciplines:['trail'], sizes:['S','M','L'],
    desc:'Fox’s current name for the line its own category URL still labels "mainframe" (stale slug). Weight not stated on the fetched page; no cert standard stated.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.foxracing.com/product/crossframe-pro-helmet/31444.html' },
  { id:'hm-fox-dropframe-pro', cat:'helmet', brand:'Fox', model:'Dropframe Pro', price:314.95,
    type:'half-shell', rotational:'mips', disciplines:['enduro'], sizes:['S','M','L'],
    desc:'3/4 open-face, extended ear/jaw coverage, no chin bar. Weight not stated on the fetched page. The maker page lists only NTA-8776, not in the protectionCert vocab.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.foxracing.com/product/dropframe-pro-helmet/31456.html' },
  { id:'hm-fox-speedframe', cat:'helmet', brand:'Fox', model:'Speedframe', price:119.95,
    type:'half-shell', rotational:'mips', disciplines:['trail'], sizes:['S','M','L'],
    desc:'Base tier of the Speedframe line (distinct from the already-cataloged Speedframe Pro). Weight not stated on the fetched page; no cert standard stated.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.foxracing.com/product/speedframe-helmet/33349.html' },
  { id:'hm-troyleedesigns-flowline-se-mips', cat:'helmet', brand:'Troy Lee Designs', model:'Flowline SE MIPS', price:195, weight:375,
    type:'half-shell', rotational:'mips', certs:['cpsc','en1078'], disciplines:['trail','enduro'], sizes:['XS/SM','MD/LG','XL/2XL'],
    desc:'Extended coverage half-shell.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://troyleedesigns.com/products/flowline-se-helmet-phantom-110124-black' },
  { id:'hm-troyleedesigns-flowline-mips', cat:'helmet', brand:'Troy Lee Designs', model:'Flowline MIPS', price:145, weight:375,
    type:'half-shell', rotational:'mips', disciplines:['trail'], sizes:['XS/SM','MD/LG','XL/2X'],
    desc:'Page cites a Virginia Tech 5-star rating; no CPSC/EN/ASTM standard code stated, so no `certs` asserted.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://troyleedesigns.com/products/sp25-flowline-helmet-w-mips-point-black-charcoal' },

  /* -- Helmets, women's fit (kit-breadth-3, 2026-07-22): the helmet cell had ZERO fitCut:'womens'
     rows. Giro's own Women's Series copy states plainly "they do not feature a unique women's
     fit" (just style/color range) — a shrink-it-and-pink-it line, so it is deliberately excluded.
     Liv (Giant's women's-specific brand) is different: both pages below state the shell is
     "created with an all-new, rounder head form" — a genuine sourced anatomical-fit claim, not
     just colorways — so these are the real inclusion. Neither Liv page publishes a helmet weight
     or a CPSC/EN/ASTM code, so both stay weightless/cert-free rather than guessed. -- */
  { id:'hm-liv-rail-mips', cat:'helmet', brand:'Liv', model:'Rail MIPS', price:189.99,
    type:'half-shell', rotational:'mips', fitCut:'womens', disciplines:['trail','enduro'], sizes:['S','M'],
    desc:'Women\'s-specific trail/enduro helmet, "created with an all-new, rounder head form for increased fit range" (Liv\'s own copy) — a genuine fit claim, not a recolored unisex shell. No weight or CPSC/EN/ASTM code published on the page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.liv-cycling.com/us/liv-rail-womens-helmet-liv-2023' },
  { id:'hm-liv-roost-mips', cat:'helmet', brand:'Liv', model:'Roost MIPS', price:109.99,
    type:'half-shell', rotational:'mips', fitCut:'womens', disciplines:['trail'], sizes:['S','M'],
    desc:'Budget-tier women\'s-specific trail helmet, same "all-new, rounder head form" fit claim as the Rail. No weight or CPSC/EN/ASTM code published on the page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.liv-cycling.com/us/roost-helmet-liv-2023?partnumber=800002698' },

  /* -- Shoes (soleType required: flat / clipless) -- */
  { id:'sho-fiveten-freerider-pro', cat:'shoes', brand:'Five Ten', model:'Freerider Pro', price:160, weight:696,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['40','41','42','43','44','45','46','47'],
    desc:'Stealth S1 rubber flat sole. Weight per pair: 696g, MBR measured-weight review (no weightSource URL'
      + ' retained, so kept as a plain sample figure rather than sourceType:measured). VERIFIED 2026-07-17 via'
      + ' bdata-rendered adidas.com (DataDome wall bypassed): MSRP $160 confirmed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.adidas.com/us/five-ten-freerider-pro-mountain-bike-shoes/IF7425.html' },
  { id:'sho-shimano-me702', cat:'shoes', brand:'Shimano', model:'ME7 (SH-ME702)', price:200, weight:880,
    soleType:'clipless', closure:'boa', status:'discontinued', disciplines:['trail','enduro'], sizes:['40','41','42','43','44','45','46','47'],
    desc:'2-bolt SPD clipless. BOA + strap. Weight per pair (approx). The ME line has been retired and consolidated into the GE (Gravity Enduro) line on ride.shimano.com — no clean 1:1 successor SKU, so this row is kept as a discontinued sample rather than re-scoped (see sho-shimano-ge7 for the live GE700 entry).' },
  { id:'sho-crankbrothers-mallet-boa', cat:'shoes', brand:'Crankbrothers', model:'Mallet BOA', price:219.99, weight:848,
    soleType:'clipless', closure:'boa', disciplines:['enduro','dh'], sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15'],
    desc:'2-bolt SPD-compatible Match System, BOA L6 + velcro strap. Weight per pair, size US9/EU42.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.crankbrothers.com/products/mallet-boa', sourceType:'manufacturer' },
  { id:'sho-fiveten-freerider', cat:'shoes', brand:'Five Ten', model:'Freerider', price:110, weight:760,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47','48'],
    desc:'Stealth Rubber flat sole, the long-running entry-level Freerider. Weight per pair (approx, size 42).'
      + ' VERIFIED 2026-07-17 via bdata-rendered adidas.com (DataDome wall bypassed): MSRP $110 confirmed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.adidas.com/us/adidas-five-ten-freerider-mountain-bike-shoes/IH0817.html' },
  { id:'sho-rideconcepts-tallac', cat:'shoes', brand:'Ride Concepts', model:'Tallac', price:188, weight:790,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'MaxGrip rubber flat sole with D3O High Impact Zone insole. Weight per pair, size US M9.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://rideconcepts.com/products/mens-tallac', sourceType:'manufacturer' },
  { id:'sho-rideconcepts-powerline', cat:'shoes', brand:'Ride Concepts', model:'Powerline', price:160, weight:900,
    soleType:'flat', closure:'lace', disciplines:['enduro','dh'], sizes:['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'DST 4.0 MaxGrip rubber flat sole, D3O medial-collar ankle protection. Weight per pair, size US M10.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://rideconcepts.com/products/mens-powerline-2022', sourceType:'manufacturer' },
  { id:'sho-giro-latch', cat:'shoes', brand:'Giro', model:'Latch', price:159.95, weight:668,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['36','37','38','39','40','41','42','43','44','45','46','47','48'],
    desc:'Tack Rubber flat sole. giro.com publishes no per-SKU weight; weight is Giro’s own stated figure (men’s EU43, 334g/shoe) as quoted by Bikerumor.',
    sourceType:'measured', weightSource:'https://bikerumor.com/giro-latch-mtb-shoes-sizes-availibility-prices-flat-mtbshoe/',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.giro.com/product/latch-shoe/350060001200000001.html' },
  { id:'sho-giro-riddance', cat:'shoes', brand:'Giro', model:'Riddance', price:119.95, weight:860,
    soleType:'flat', closure:'lace', disciplines:['trail'], sizes:['35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'],
    desc:'Vibram flat sole. Weight is size 43 (430g/shoe per giro.com).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.giro.com/p/riddance-downhill-bike-shoes/350060001200000013.html' },
  { id:'sho-specialized-2fo-flat-2', cat:'shoes', brand:'Specialized', model:'2FO Roost Flat', price:119.99, weight:900,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47','48'],
    desc:'SlipNot rubber flat sole, dual-density EVA midsole. RE-SCOPED kit-6 (2026-07-20): confirmed'
      + ' via specialized.com/us/en/shoes/mountain-bike-shoes (browser pane) that the full current'
      + ' 16-shoe MTB lineup has no "2FO Flat 2.0" -- "2FO Roost Flat" ($119.99, currently on sale at'
      + ' $97.99) is the direct successor in the same flat-pedal tier (a running-change rename, same'
      + ' pattern as the Shimano ME->GE consolidation). Re-scoped model under the same id. No weight'
      + ' published; kept as the prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.specialized.com/us/en/shoes/mountain-bike-shoes/c/mountain-bike-shoes' },
  { id:'sho-fox-union', cat:'shoes', brand:'Fox', model:'Union', price:149.95, weight:870,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'],
    sizes:['37','38','39','40','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','47'],
    desc:'CORRECTED 2026-07-17: price is the fetched $149.95-159.95 list range, base size $149.95 (was sample $130); sizes widened to the fetched EU37-47 range. No per-shoe weight published on the maker page, so weight stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/fox-union-flat-shoes/29354.html' },
  { id:'sho-crankbrothers-stamp-speedlace', cat:'shoes', brand:'Crankbrothers', model:'Stamp Speedlace', price:160, weight:770,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14'],
    desc:'MC2 rubber compound, single-pull Speed Lace + velcro strap, tuned for Crankbrothers Stamp pedals. Weight per pair, size US9/EU42.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.crankbrothers.com/products/stamp-speedlace-grey-red', sourceType:'manufacturer' },
  { id:'sho-leatt-flat-3-0', cat:'shoes', brand:'Leatt', model:'Shoe Flat 3.0', price:153, weight:720,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'RideGrip PRO compound, WaffleGrip Pro tread, compression laces. Weight per pair, size EU43.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/shoe-flat-3-0', sourceType:'manufacturer' },
  { id:'sho-northwave-clan-2', cat:'shoes', brand:'Northwave', model:'Clan 2', price:162, weight:850,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['36','37','38','39','40','41','42','43','44','45','46','47','48','49'],
    desc:'Enduro flat-pedal shoe with reinforced heel/toe. Weight per pair (approx). Fetched northwave.com confirms non-stretch laces (closure) and sizes 36-49; lists EUR149.99 (no USD manufacturer price found - northwave.com is EU-priced). Kit-6 (2026-07-20): price set to a EUR->USD sample ($162, basis disclosed) per THE PRICE RULE, formalizing verified:true.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://www.northwave.com/en/bike/shoes/mtb/trailall-mountain/clan-2' },
  { id:'sho-shimano-gr7', cat:'shoes', brand:'Shimano', model:'GR7 (SH-GF600)', price:180, weight:800,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['38','39','40','41','42','43','44','45','46','47','48'],
    desc:'ULTREAD GF flat-pedal sole, gravity/trail shoe. The GR line (SH-GR701) was retired in favor of the GF (Gravity Flat) line on ride.shimano.com; row re-scoped to the live SH-GF600. ride.shimano.com publishes no per-SKU weight — weight kept as the prior sample figure. Kit-6 (2026-07-20): price $180 re-confirmed exactly via ride.shimano.com/collections/mountain; formalizing verified:true (weight not required for kit apparel).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://ride.shimano.com/collections/mountain' },
  { id:'sho-shimano-xc5', cat:'shoes', brand:'Shimano', model:'XC5 (SH-XC503)', price:190, weight:660,
    soleType:'clipless', closure:'boa', disciplines:['xc','trail'], sizes:['40','41','42','43','44','45','46','47','48'],
    desc:'2-bolt SPD clipless XC/trail shoe, BOA L6C dial. Kit-5 tiebreak (2026-07-20): re-fetched ride.shimano.com/collections/mountain -- the plain men\'s SH-XC502 SKU is gone from the current lineup (running-change succeeded by SH-XC503 at $190; only "SH-XC502 WOMEN\'S" at $175 remains, a different SKU than this row). Re-scoped this row from SH-XC502 to the live SH-XC503 per the running-change rule (XC502->XC503 is the documented exemplar). Confirmed via ride.shimano.com/products/sh-xc503: $190, BOA L6C dial (single dial, no velcro), sizes 40-48. No weight published; kept as sample (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://ride.shimano.com/products/sh-xc503' },
  { id:'sho-shimano-me502', cat:'shoes', brand:'Shimano', model:'ME5 (SH-ME502)', price:120, weight:820,
    soleType:'clipless', closure:'velcro', status:'discontinued', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'2-bolt SPD clipless trail/enduro shoe. Weight per pair (approx). The ME line has been retired and consolidated into the GE (Gravity Enduro) line on ride.shimano.com — no clean 1:1 successor SKU, so this row is kept as a discontinued sample rather than re-scoped (see sho-shimano-ge7 for the live GE700 entry).' },
  { id:'sho-specialized-2fo-roost-clip', cat:'shoes', brand:'Specialized', model:'2FO Roost Clip', price:119.99, weight:734,
    soleType:'clipless', closure:'lace', disciplines:['trail','enduro'],
    sizes:['36','37','38','38.5','39','39.5','40','40.5','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','46.5','47','48','49'],
    desc:'2-bolt SPD clipless, lace closure (not BOA - corrected 2026-07-16), SlipNot FG rubber sole. Weight = 367g/shoe (size 42) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.specialized.com/us/en/2fo-roost-clip-mountain-bike-shoes/p/187391' },
  { id:'sho-specialized-rime-2-0', cat:'shoes', brand:'Specialized', model:'Rime 2.0', price:160, weight:840, status:'discontinued',
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['36','37','38','38.5','39','39.5','40','40.5','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','46.5','47','48','49'],
    desc:'2-bolt SPD clipless enduro shoe, standard lace + Boa L6 dial. CHECKED 2026-07-19 via'
      + ' browser-rendered specialized.com search (WebFetch 403s this domain): "Rime 2.0" returns'
      + ' no results - the current Rime lineup is only "Rime Flat" ($139.99) and "Rime 1.0"'
      + ' ($109.99), a clipless 2-bolt SKU. Kit-6 (2026-07-20): reconfirmed via the full current'
      + ' 16-shoe MTB lineup -- still no "Rime 2.0" or "Rime 3.0"; the naming resets to "1.0" rather'
      + ' than incrementing past 2.0, so this is NOT a clean running-change successor (unlike the'
      + ' Shimano/2FO patterns). Tagged discontinued rather than force-mapping onto Rime 1.0. This'
      + ' row appears discontinued/superseded; left'
      + ' unverified, no fields changed.' },
  { id:'sho-crankbrothers-mallet-speedlace', cat:'shoes', brand:'Crankbrothers', model:'Mallet Speedlace', price:179.99, weight:850,
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'],
    sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14'],
    desc:'2-bolt SPD clipless gravity shoe, Speed Lace pull-cord closure. Weight per pair, US size 9.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.crankbrothers.com/products/mallet-speedlace-black-white' },
  { id:'sho-crankbrothers-mallet-trail-boa', cat:'shoes', brand:'Crankbrothers', model:'Mallet Trail BOA', price:239.99, weight:820,
    soleType:'clipless', closure:'boa', disciplines:['enduro','dh'],
    sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15'],
    desc:'2-bolt Match System clip-in (SPD-compatible), extended 35mm cleat track, BOA Li2 dial + hook-and-loop heel strap. Weight = 410g/shoe (US9/EU42) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.crankbrothers.com/products/mallet-trail-boa-clip-in-shoes-navy-grey' },
  { id:'sho-crankbrothers-stamp-boa', cat:'shoes', brand:'Crankbrothers', model:'Stamp BOA', price:199.99, weight:768,
    soleType:'flat', closure:'boa', disciplines:['trail','enduro'],
    sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15'],
    desc:'MC2 rubber flat sole tuned for Crankbrothers Stamp pedals (fits any flat pedal), BOA L6 dial. Weight = 384g/shoe (US9/EU42) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.crankbrothers.com/products/stamp-boa' },
  { id:'sho-crankbrothers-stamp-lace', cat:'shoes', brand:'Crankbrothers', model:'Stamp Lace', price:139.99,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'],
    sizes:['3','4','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','14'],
    desc:'kit-breadth-3 (2026-07-22): the entry lace-closure tier below the Stamp BOA/Speedlace'
      + ' (sho-crankbrothers-stamp-boa / -speedlace) — same MC2 flat-sole family, classic lace'
      + ' closure. List $139.99 confirmed across colorways. No weight published on the page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.crankbrothers.com/products/stamp-lace-black-gum' },
  { id:'sho-crankbrothers-mallet-lace', cat:'shoes', brand:'Crankbrothers', model:'Mallet Lace', price:159.99, weight:830,
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'],
    sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14'],
    desc:'2-bolt Match System clip-in (SPD-compatible), classic round-lace closure with lace pocket. Weight = 415g/shoe (US9/EU42) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.crankbrothers.com/products/mallet-lace-black-red' },
  { id:'sho-crankbrothers-candy-lace', cat:'shoes', brand:'Crankbrothers', model:'Candy Lace', price:169.99, weight:680,
    soleType:'clipless', closure:'lace', disciplines:['xc'],
    sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15'],
    desc:'XC/gravel 2-bolt Match System clip-in, MC1 rubber outsole, 35mm cleat track, lace closure with lace pocket. Weight = 340g/shoe (US9/EU42) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.crankbrothers.com/products/candy-lace-black-gum' },
  { id:'sho-giro-chamber-2', cat:'shoes', brand:'Giro', model:'Chamber II', price:149.95, weight:1020,
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'], sizes:['37','38','39','40','41','42','43','44','45','46','47','48'],
    desc:'2-bolt SPD clipless gravity/DH shoe, 10mm cleat setback. Weight is size 43 (510g/shoe per giro.com). Now clearance-priced on giro.com behind the newer Chamber III.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.giro.com/product/chamber-ii-shoe/350060001200000006.html' },
  { id:'sho-fox-union-clip', cat:'shoes', brand:'Fox', model:'Union Clip', price:179.95, weight:830,
    soleType:'clipless', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'2-bolt SPD clipless version of the Union. CORRECTED 2026-07-17: price is the fetched $179.95-189.95 list range, base size $179.95 (was sample $150). No per-shoe weight published on the maker page, so weight stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/fox-union-clipless-shoes/30127.html' },
  { id:'sho-rideconcepts-hellion-clip', cat:'shoes', brand:'Ride Concepts', model:'Hellion Clip', price:198, weight:966,
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'], sizes:['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'2-bolt SPD clipless gravity shoe, ClipGrip outsole with a 40mm cleat box, D3O High Impact Zone insole, RC PowerDrive nylon shank. Weight per pair (483g/shoe x2, size M9).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://rideconcepts.com/products/mens-hellion-clip', sourceType:'manufacturer' },
  { id:'sho-northwave-rockit-2', cat:'shoes', brand:'Northwave', model:'Rockit Plus', price:162, weight:700,
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['37','38','39','40','41','42','43','44','45','46','47','48'],
    desc:'2-bolt SPD clipless trail/enduro shoe, Single X-Dial SLW3 dial closure. RE-RESOLVED kit-7'
      + ' (2026-07-20): no "Rockit 2" has ever existed on northwave.com in a full current-lineup'
      + ' sweep of both Trail/All-Mountain pages (37 SKUs, browser-rendered) - only plain "Rockit"'
      + ' (EUR129.99, LAST ITEMS IN STOCK/closeout) and "Rockit Plus" (EUR149.99, standing current'
      + ' product) exist. Re-scoped model name Rockit 2 -> Rockit Plus (the standing, non-closeout'
      + ' SKU - the id stays append-only). Price EUR149.99 -> $162 USD sample per THE PRICE RULE'
      + ' (basis disclosed, no US price published). No per-shoe weight published, stays prior sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://www.northwave.com/en/bike/shoes/mtb/trailall-mountain/rockit-plus' },
  { id:'sho-leatt-clip-4-0', cat:'shoes', brand:'Leatt', model:'Shoe Clip 4.0', price:149, weight:750, status:'discontinued',
    soleType:'clipless', closure:'lace', disciplines:['trail','enduro'], sizes:['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'SPD clipless channel, RideGrip compound, speed laces, cleat shims included. Weight per'
      + ' pair (approx). RE-CONFIRMED 2026-07-19: us.leatt.com still lists the SKU as'
      + ' backordered/clearance at $149.00 regular MSRP ($96.85 sale), matching this row exactly.'
      + ' No weight published there, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://us.leatt.com/products/shoe-clip-4-0-sale' },

  /* -- Shoes, expanded market-coverage batch (2026-07-14): more of the core
     brands' lineups + new brands. All sample data (best-credible, unverified)
     unless a fetch confirmed it above. -- */
  { id:'sho-fiveten-freerider-contact', cat:'shoes', brand:'Five Ten', model:'Freerider Contact', price:130, weight:780, status:'discontinued',
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47','48'],
    desc:'Mid-tier Freerider with Stealth Mi rubber. MBR review lists Weight:390g (no pair/shoe label; taken as'
      + ' per-shoe -> ~780g/pair, since 390g as a pair total is physically implausible for this class). CHECKED'
      + ' 2026-07-17: bdata-rendered adidas.com/us/five_ten-freerider-shoes (full current Freerider lineup'
      + ' fetched: standard, Pro, Pro BOA, Pro Mid, DLX, Hook-and-Loop, Spider-Man collab) has no "Freerider'
      + ' Contact" SKU. Marked discontinued rather than removed (a real historical Five Ten model per multiple'
      + ' third-party reviews); specs/price left as prior sample, not marked verified.' },
  { id:'sho-fiveten-trailcross-lt', cat:'shoes', brand:'Five Ten', model:'Trailcross LT', price:150, weight:790, status:'discontinued',
    soleType:'flat', closure:'lace', disciplines:['trail'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Lightweight trail-crossover flat shoe (gravel/MTB hybrid tread), Stealth Phantom rubber. Weight per'
      + ' pair: 790g, MBR measured-weight review. CHECKED 2026-07-17: every "Trailcross LT" product-page SKU'
      + ' found (ID5008, ID5012, IH0809, EF7060, GY5124) bdata-redirects to the generic adidas.com/us/trailcross'
      + ' category page rather than rendering a product page - no longer sold as its own SKU. Marked'
      + ' discontinued rather than removed; specs/price left as prior sample, not marked verified.' },
  { id:'sho-fiveten-trailcross-clip', cat:'shoes', brand:'Five Ten', model:'Trailcross Clip-In', price:165, weight:832,
    soleType:'clipless', closure:'lace', disciplines:['trail'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'2-bolt SPD clipless trail-crossover shoe. Weight per pair: 832g, BikeRadar measured-weight review.'
      + ' VERIFIED 2026-07-17 via bdata-rendered adidas.com (DataDome wall bypassed): MSRP corrected 160 -> $165'
      + ' (page showed a discounted $75 sale price off a $165 list price).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.adidas.com/us/five-ten-trailcross-clip-in-mountain-bike-shoes/GZ9848.html' },
  { id:'sho-fiveten-kestrel-lace', cat:'shoes', brand:'Five Ten', model:'Kestrel Lace', price:150, weight:1024, status:'discontinued',
    soleType:'clipless', closure:'lace', disciplines:['trail'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'General trail/all-mountain clipless shoe (BikeRadar: not XC-race-oriented) with a carbon-infused nylon'
      + ' shank. Weight per pair: 1024g (EU44), BikeRadar measured-weight review; price $150 per the same'
      + ' review. CHECKED 2026-07-17: bdata-rendered adidas.com Kestrel collection/category pages (five_ten-'
      + ' kestrel, five_ten-kestrel-mountain_biking) list only "Kestrel BOA" SKUs (HQ6031, IH0806, IH0807) -'
      + ' no plain "Kestrel Lace" remains; the lace product page itself (GZ9252) failed to render a price.'
      + ' Marked discontinued (superseded by Kestrel BOA) rather than removed; specs/price left as prior'
      + ' sample, not marked verified.' },
  { id:'sho-fiveten-hellcat-pro', cat:'shoes', brand:'Five Ten', model:'Hellcat Pro', price:180, weight:1082,
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Gravity clipless shoe, laces + velcro strap, Stealth rubber. Weight per pair: 1082g (size 42, with'
      + ' cleats fitted), BikeRadar measured-weight review. VERIFIED 2026-07-17 via bdata-rendered adidas.com'
      + ' (DataDome wall bypassed): MSRP corrected 200 -> $180; clipless/SPD + lace closure confirmed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.adidas.com/us/five-ten-hellcat-pro-mountain-bike-shoes/IH1309.html' },
  { id:'sho-rideconcepts-livewire', cat:'shoes', brand:'Ride Concepts', model:'Livewire', price:110, weight:740,
    soleType:'flat', closure:'lace', fitCut:'womens', disciplines:['trail','enduro'], sizes:['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10'],
    desc:'Women\'s-specific Low Volume-fit trail flat shoe, MAX GRIP rubber outsole, dual-density EVA insole. Weight per pair (370g/shoe x2, size W8).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://rideconcepts.com/products/womens-livewire-2022', sourceType:'manufacturer' },
  { id:'sho-rideconcepts-wildcat', cat:'shoes', brand:'Ride Concepts', model:'Wildcat', price:140, weight:860,
    soleType:'flat', closure:'lace', disciplines:['enduro','dh'], sizes:['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'Mid-top flat-pedal gravity shoe, DST 6.0 MAX GRIP rubber outsole, D3O insole, hook-and-loop ankle strap. NOT clipless-compatible. Weight per pair (430g/shoe x2, size M10).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://rideconcepts.com/products/mens-wildcat-24', sourceType:'manufacturer' },
  { id:'sho-rideconcepts-accomplice', cat:'shoes', brand:'Ride Concepts', model:'Accomplice', price:144, weight:754,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','14','15'],
    desc:'Trail flat-pedal shoe, MaxGrip rubber outsole, dual-density EVA insole/midsole, elastic lace tuck. Weight per pair (377g/shoe x2, size M9).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://rideconcepts.com/products/mens-accomplice', sourceType:'manufacturer' },
  { id:'sho-rideconcepts-vice', cat:'shoes', brand:'Ride Concepts', model:'Vice', price:110, weight:848,
    soleType:'flat', closure:'lace', disciplines:['trail'], sizes:['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','14','15'],
    desc:'Entry-tier flat-pedal shoe, RC Fuzion outsole with HighGrip rubber, 3mm EVA cup sole. Weight per pair (424g/shoe x2, size M9).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://rideconcepts.com/products/mens-vice', sourceType:'manufacturer' },
  { id:'sho-giro-jacket-2', cat:'shoes', brand:'Giro', model:'Jacket II', price:89.95, weight:830,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'CORRECTED 2026-07-17 via bdata-rendered giro.com: the current Jacket II is a Vibram Ecostep flat-pedal'
      + ' "shred-ready, everyday mountain bike shoe" with a LACED closure - NOT the XC-race clipless/ratchet/carbon-sole'
      + ' shoe the prior search-indexed entry described (soleType clipless->flat, closure ratchet->lace,'
      + ' disciplines xc->trail/enduro; no carbon-composite-sole or ratchet-buckle claim on the fetched page).'
      + ' MSRP $89.95 confirmed. "Certifications & Weight" panel states 415 grams (size 43) per shoe, so'
      + ' 830g/pair (was sample 600g).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/jacket-ii-shoe/350060001200000012.html' },
  { id:'sho-giro-manta', cat:'shoes', brand:'Giro', model:'Manta', price:200, weight:750, status:'discontinued',
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Trail clipless shoe, dual BOA dials, SensorFit last. Weight per pair (approx). CHECKED 2026-07-17:'
      + ' bdata-rendered giro.com/cycling/shoes/mtb/ (full current MTB shoe listing fetched) shows no unisex/'
      + " men's Manta - only the Women's Manta Lace Shoe (a lace closure, not BOA). Retailer archives"
      + " (sovereigncycle.com, centraalcycle.com) confirm a men's Manta was a real historical SKU, so marked"
      + ' discontinued rather than removed; specs/price left as prior sample (no current page to verify against),'
      + ' not marked verified.' },
  { id:'sho-giro-sector', cat:'shoes', brand:'Giro', model:'Sector', price:249.95, weight:650,
    soleType:'clipless', closure:'boa', disciplines:['xc','trail'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: BOA L6 Fit System + carbon composite outsole with'
      + ' 5mm cleat-position adjustment confirmed (clipless), MSRP $249.95 confirmed (page showed a discounted'
      + ' $174.99 sale price). No weight published on the fetched page - stays the prior sample figure.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/sector-shoe/350060000200000084.html' },
  { id:'sho-specialized-2fo-cliplite', cat:'shoes', brand:'Specialized', model:'2FO Cliplite', price:200, weight:600,
    soleType:'clipless', closure:'boa', disciplines:['xc','trail'],
    sizes:['36','37','38','38.5','39','39.5','40','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','46.5','47','48','49'],
    desc:'XC/trail clipless shoe, independent BOA Li2 dials, welded upper, SlipNot FG sole.'
      + ' RE-CHECKED 2026-07-19 via browser-rendered specialized.com search (WebFetch 403s this'
      + ' domain): "2fo cliplite" now returns zero results, superseding the 2026-07-16 confirm -'
      + ' appears discontinued since. Weight not published either way (stays sample). Kit-6'
      + ' (2026-07-20): confirmed via the full current 16-shoe MTB lineup (browser pane) -- no'
      + ' clipless XC/trail tier close enough to call a 1:1 successor (2FO Roost Clip is enduro-tier,'
      + ' 2FO DH Clip is DH-tier). Tagged discontinued rather than guessing a re-scope.',
      status:'discontinued' },
  { id:'sho-specialized-sworks-recon', cat:'shoes', brand:'Specialized', model:'S-Works Recon', price:499.99, weight:530,
    soleType:'clipless', closure:'boa', disciplines:['xc'],
    sizes:['36','37','38','38.5','39','39.5','40','40.5','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','46.5','47','48','49'],
    desc:'Flagship XC race clipless shoe, dual alloy BOA S3-Snap dials, FACT carbon plate'
      + ' (Stiffness Index 13.0). Price CORRECTED 2026-07-19 from a stale $425 sample to $499.99,'
      + ' confirmed live as "S-Works Recon Shoe" (browser-rendered specialized.com/us/en -'
      + ' WebFetch 403s this domain). Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/shop/cycling-clothing/cycling-shoes/mountain-bike-shoes' },
  { id:'sho-specialized-sworks-2fo-roost', cat:'shoes', brand:'Specialized', model:'S-Works 2FO Roost', price:325, weight:700, status:'discontinued',
    soleType:'clipless', closure:'boa', disciplines:['enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Flagship enduro clipless shoe, dual BOA, carbon sole. Weight per pair (approx). NOTE 2026-07-16: no "S-Works 2FO Roost" product found on specialized.com - the current 2FO Roost tier has no S-Works trim (only Clip/Flat/Canvas). Kit-6 (2026-07-20): reconfirmed via the full current 16-shoe MTB lineup (browser pane) -- still no S-Works trim of any 2FO Roost variant. Tagged discontinued.' },
  { id:'sho-fox-union-boa', cat:'shoes', brand:'Fox', model:'Union BOA', price:249.95, weight:880,
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'CORRECTED 2026-07-17: the maker page for this model name ("Fox Union BOA") is the 2-bolt SPD CLIPLESS BOA shoe (soleType flat->clipless, was a duplicate of union-boa-flat below); list price $249.95 (was sample $170; page shows a $174.99 sale, not used). Search reviews cite conflicting per-shoe weights (443-504g/shoe across sources) so weight stays prior sample rather than picking one.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/fox-union-boa-clipless-shoes/29353.html' },
  { id:'sho-fox-union-canvas', cat:'shoes', brand:'Fox', model:'Union Canvas', price:119.95, weight:750,
    soleType:'flat', closure:'lace', disciplines:['trail'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Canvas-upper casual/trail flat shoe. CORRECTED 2026-07-17: price is the fetched $119.95-139.95 list range, base size $119.95 (was sample $110). No per-shoe weight confirmed on the fetched page (a 373g/shoe figure appears in search snippets only, not in the rendered fetch, so not used), weight stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/fox-union-canvas-shoes/29860.html' },
  { id:'sho-fox-union-boa-flat', cat:'shoes', brand:'Fox', model:'Union BOA Flat', price:249.95, weight:852,
    soleType:'flat', closure:'boa', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Twin-BOA flat pedal shoe, Ultratac rubber sole. CORRECTED 2026-07-17: foxracing.com is now reachable via a bot-unblocker; price is the fetched $249.95 list (was sample $224.95). Weight is BikePerfect\'s measured 852g/pair (size 44 EU tested), unchanged.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/fox-union-boa-flat-shoes/33343.html',
    sourceType:'measured', weightSource:'https://www.bikeperfect.com/reviews/fox-union-boa-flat-review-high-performance-flat-pedal-shoes-with-a-hefty-price-tag' },
  { id:'sho-leatt-clip-6-0', cat:'shoes', brand:'Leatt', model:'Shoe Clip 6.0', price:159.99, weight:920, status:'discontinued',
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'], sizes:['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'Top-tier enduro/gravity clipless shoe. RE-FETCHED 2026-07-19: ATOP speed-lace system'
      + ' (not BOA) confirmed. Price CORRECTED $150->$159.99 (regular MSRP, currently on $95.99'
      + ' clearance, SKU tagged unavailable in all sizes/colors). Weight CORRECTED 800->920 -'
      + ' now published on the page: 920g per pair (US 9.5).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://us.leatt.com/products/shoes-clip-6-0-sale' },
  { id:'sho-leatt-proflat-3-0', cat:'shoes', brand:'Leatt', model:'Shoe ProFlat 3.0', price:175, weight:750,
    soleType:'flat', closure:'boa', disciplines:['enduro','dh'], sizes:['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'Premium gravity flat shoe, RideGrip Pro compound + WaffleGrip Pro tread, MOZ'
      + ' micro-adjuster cable closure (dial-style, mapped to boa). RE-FETCHED 2026-07-19: NOT'
      + ' discontinued after all - 6 pairs currently in stock, dropping the prior Obsolete status.'
      + ' Price CORRECTED $180->$175.00 regular MSRP. Weight CORRECTED 780->750 - now published:'
      + ' ~375g per shoe (size EU 43).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://us.leatt.com/products/shoe-proflat-3-0' },
  { id:'sho-leatt-proclip-9-0-race-boa', cat:'shoes', brand:'Leatt', model:'ProClip 9.0 Race Boa', price:429, weight:580,
    soleType:'clipless', closure:'boa', disciplines:['xc'], sizes:['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'Flagship XC/gravel race shoe, 100% carbon sole, dual-dial BOA Li2 closure, injected RideGrip TPU studs, 2-bolt SPD. Weight = 290g/shoe (EU43) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/collections/mtb-shoes/products/shoe-9-0-proclip-race-boa' },
  { id:'sho-leatt-proclip-6-0-trail-boa', cat:'shoes', brand:'Leatt', model:'ProClip 6.0 Trail Boa', price:259, weight:940,
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'Trail clip shoe, RideGrip rubber, nylon-injected shank, single BOA Li2 dial, 2-bolt SPD via included cleat shims. Weight = 470g/shoe (EU43) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/collections/mtb-shoes/products/shoe-proclip-6-0-trail-boa' },
  { id:'sho-leatt-clip-2-0-endurance', cat:'shoes', brand:'Leatt', model:'Clip 2.0 Endurance', price:179, weight:720,
    soleType:'clipless', closure:'lace', disciplines:['trail','enduro'], sizes:['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13'],
    desc:'Entry-tier endurance clip shoe, RideGrip compound, traditional lace closure, 2-bolt SPD via included cleat shims. Weight = 360g/shoe (EU43) x2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/collections/mtb-shoes/products/shoe-clip-2-0-endurance' },
  { id:'sho-northwave-enduro-mid-2', cat:'shoes', brand:'Northwave', model:'Enduro Mid 2', price:194, weight:750,
    soleType:'clipless', closure:'boa', disciplines:['enduro'], sizes:['38','40','41','42','43','44','45','46','47','48'],
    desc:'Mid-cut enduro clipless shoe with ankle protection. Weight per pair (approx). CORRECTED 2026-07-16: fetched northwave.com - closes with a single X-Dial SLW3 (step-by-step + full-release dial), not laces (closure lace->boa). Sizes corrected to 38,40-48 (39 not offered). No USD manufacturer price found (EUR179.99 listed). Kit-6 (2026-07-20): price set to a EUR->USD sample ($194, basis disclosed) per THE PRICE RULE, formalizing verified:true.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://www.northwave.com/en/bike/shoes/mtb/trailall-mountain/enduro-mid-2' },
  { id:'sho-northwave-origin-plus-2', cat:'shoes', brand:'Northwave', model:'Origin Plus 2', price:200, weight:600, status:'discontinued',
    soleType:'clipless', closure:'boa', disciplines:['xc'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'XC race clipless shoe, carbon-reinforced triple-density sole. CORRECTED 2026-07-16: fetched northwave.com - the SLW3 system is a dial closure, not a ratchet buckle (closure ratchet->boa). RESOLVED kit-7 (2026-07-20): the /xc/origin-plus-2 URL now redirects to the generic XC category page, and a full current XC lineup sweep (37 SKUs across both category pages, browser-rendered) confirms no "Origin Plus 2" SKU exists - the category page\'s own marketing copy still name-drops "Origin Plus 2" as a description string, but no matching product card is in the grid. Marked discontinued rather than guessing a successor (no obvious 1:1 replacement in the current XC tier list). Price/weight left as prior sample, not marked verified.' },
  { id:'sho-shimano-xc7', cat:'shoes', brand:'Shimano', model:'XC7 (SH-XC703)', price:260, weight:600,
    soleType:'clipless', closure:'boa', disciplines:['xc'], sizes:['38','39','40','41','42','43','44','45','46','47','48'],
    desc:'XC race clipless shoe, carbon-reinforced sole. SH-XC702 has been superseded by SH-XC703 on ride.shimano.com; row re-scoped to the live SKU. ride.shimano.com publishes no per-SKU weight — weight kept as the prior sample figure. Kit-6 (2026-07-20): price $260 re-confirmed exactly via ride.shimano.com/collections/mountain; formalizing verified:true (weight not required for kit apparel).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://ride.shimano.com/collections/mountain' },
  { id:'sho-shimano-xc3', cat:'shoes', brand:'Shimano', model:'XC3 (SH-XC302)', price:140, weight:700,
    soleType:'clipless', closure:'boa', disciplines:['xc','trail'], sizes:['40','41','42','43','44','45','46','47','48'],
    desc:'Entry-level XC clipless shoe. SH-XC300 has been superseded by SH-XC302 (single BOA L6E dial, was velcro on the 300) on ride.shimano.com; row re-scoped to the live SKU. ride.shimano.com publishes no per-SKU weight — weight kept as the prior sample figure. Kit-6 (2026-07-20): price $140 re-confirmed exactly via ride.shimano.com/collections/mountain; formalizing verified:true (weight not required for kit apparel).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://ride.shimano.com/collections/mountain' },
  { id:'sho-shimano-am9', cat:'shoes', brand:'Shimano', model:'AM9 (SH-AM902)', price:230, weight:900,
    soleType:'clipless', closure:'boa', status:'discontinued', disciplines:['enduro','dh'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Gravity/DH clipless shoe, dual BOA dials. Weight per pair (approx). The AM line has been retired and consolidated into the GE (Gravity Enduro) line on ride.shimano.com — no clean 1:1 successor SKU, so this row is kept as a discontinued sample rather than re-scoped (see sho-shimano-ge7 for the live GE700 entry).' },
  { id:'sho-shimano-am7', cat:'shoes', brand:'Shimano', model:'AM7 (SH-AM702)', price:170, weight:850,
    soleType:'clipless', closure:'lace', status:'discontinued', disciplines:['enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Enduro/gravity clipless shoe. Weight per pair (approx). The AM line has been retired and consolidated into the GE (Gravity Enduro) line on ride.shimano.com — no clean 1:1 successor SKU, so this row is kept as a discontinued sample rather than re-scoped (see sho-shimano-ge7 for the live GE700 entry).' },
  { id:'sho-shimano-ge7', cat:'shoes', brand:'Shimano', model:'GE7 (SH-GE700)', price:190, weight:800,
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'], sizes:['38','39','40','41','42','43','44','45','46','47','48'],
    desc:'SPD-compatible lace-up gravity/enduro shoe — corrected from a flat-pedal row (GE700 is clipless). ride.shimano.com publishes no per-SKU weight; ~400g/shoe (800g/pair) is Shimano’s own reported figure per an NSMB review, size unspecified.',
    sourceType:'measured', weightSource:'https://nsmb.com/articles/shimano-ge7-gravity-spd-shoes/',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://ride.shimano.com/products/sh-ge700' },
  { id:'sho-shimano-ge900', cat:'shoes', brand:'Shimano', model:'GE9 (SH-GE900)', price:250, weight:846,
    soleType:'clipless', closure:'boa', disciplines:['enduro','dh'], sizes:['38','39','40','41','42','43','44','45','46','47','48'],
    desc:'kit-breadth-3 (2026-07-22): the flagship tier above GE7/GE5 - "Shimano\'s benchmark,'
      + ' high-end gravity shoe" per ride.shimano.com, TORBAL 2.0 midsole + ULTREAD GE outsole,'
      + ' BOA dial + bash guard + instep strap, carbon-reinforced nylon midsole. Price $250 exact'
      + ' match on ride.shimano.com. Shimano does not publish per-shoe weight; ~423g/shoe (846g/pair,'
      + ' size 42) is a third-party retailer-measured figure, kept sourceType:measured per the'
      + ' Shimano-rotor-class weight policy.',
    sourceType:'measured', weightSource:'https://www.bike-discount.de/en/shimano-sh-ge900-mtb-gravity-enduro-shoes',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://ride.shimano.com/products/sh-ge900' },
  { id:'sho-shimano-gr9', cat:'shoes', brand:'Shimano', model:'GR9 (SH-GF800)', price:200, weight:800,
    soleType:'flat', closure:'boa', disciplines:['enduro','dh'], sizes:['38','39','40','41','42','43','44','45','46','47','48'],
    desc:'Premium gravity flat shoe, BOA closure. The GR line (SH-GR901) was retired in favor of the GF (Gravity Flat) line on ride.shimano.com; row re-scoped to the live flagship SH-GF800. ride.shimano.com publishes no per-SKU weight — weight kept as the prior sample figure. Kit-6 (2026-07-20): price $200 re-confirmed exactly via ride.shimano.com/collections/mountain; formalizing verified:true (weight not required for kit apparel).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://ride.shimano.com/collections/mountain' },
  { id:'sho-shimano-ge500', cat:'shoes', brand:'Shimano', model:'GE5 (SH-GE500)', price:150, weight:798,
    soleType:'clipless', closure:'lace', disciplines:['enduro','dh'], sizes:['40','41','42','43','44','45','46','47','48'],
    desc:'Entry tier of the Gravity Enduro line, TORBAL 2.0 midsole + ULTREAD GE outsole, 2-bolt SPD, lace + instep strap closure. Price ($150, exact match) + closure/sole confirmed on ride.shimano.com; Shimano does not publish per-shoe weight, so weight is a retailer-quoted approx (399g/shoe, size 42, doubled for the pair) - kept as sample (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://ride.shimano.com/products/sh-ge500' },
  { id:'sho-shimano-xc903', cat:'shoes', brand:'Shimano', model:'S-PHYRE XC903 (SH-XC903)', price:480, weight:600,
    soleType:'clipless', closure:'boa', disciplines:['xc'], sizes:['38','39','40','41','42','43','44','45','46','47','48'],
    desc:'Flagship XC/gravel race shoe, stiff carbon sole, dual low-profile BOA Li2 dials, ULTREAD XC outsole, 2-bolt SPD. Price ($480, exact match) + closure/sole re-confirmed on ride.shimano.com (kit-fanout-2, 2026-07-17); Shimano does not publish per-shoe weight, so weight is a review-quoted approx (~600g/pair) - kept as sample (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://ride.shimano.com/products/sh-xc903' },
  /* RETIRED kit-10 (2026-07-21): sho-troyleedesigns-grind + sho-troyleedesigns-roost -
     FABRICATED (Douglas's standing flag). TLD sells no standalone-branded footwear (its
     shoe line is a Five Ten/Adidas collab - Freerider Pro TLD, Hellcat Pro TLD, etc.);
     "grind" and "roost" match zero TLD footwear across the maker site or any retailer
     searched (troyleedesigns.com search: "grind" = 3 hits, all the Grind Flannel shirt;
     "roost" = 29 hits, zero footwear). No real successor to retarget to - plain
     tombstone, no KIT_ALIASES entry (KitBuilder's restore path already drops an
     unresolvable id rather than throwing). See tools/verify-notes-kit.md "Kit Wave 10". */
  { id:'sho-oneal-pinned-flat', cat:'shoes', brand:"O'Neal", model:'Pinned Flat Pedal Shoe', price:79.99, weight:850,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'Fetched oneal.com (Gray/Red colorway): CORRECTED price $100 -> $79.99. Honey Rubber Hexagon sole, PU upper, lace closure, removable footbed, reinforced toe cap confirmed. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://oneal.com/products/pinned-flat-pedal-shoe-gray-red' },
  { id:'sho-oneal-session-spd', cat:'shoes', brand:"O'Neal", model:'Pinned SPD', price:99.99, weight:800,
    soleType:'clipless', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'RESOLVED kit-7 (2026-07-20): "Session SPD" confirmed not to exist - the oneal.com US'
      + ' Cycling Shoes collection carries exactly one clipless SKU, "Pinned SPD Shoe" (the SPD'
      + ' cousin of the already-cataloged Pinned Flat row), so this row is re-scoped to that real'
      + ' product. Lace-up closure confirmed (corrected from velcro), SPD cleat compatible,'
      + ' O\'Neal Honey Rubber sole, PU upper. Price $99.99 confirmed exactly (was sample $120).'
      + ' Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://oneal.com/collections/cycling-shoes/products/pinned-spd-shoe' },
  { id:'sho-endura-hummvee-flat', cat:'shoes', brand:'Endura', model:'Hummvee Flat', price:130, weight:850,
    soleType:'flat', closure:'lace', disciplines:['trail'], sizes:['39','40','41','42','43','44','45','46','47'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/hummvee-flat-shoes-black-re9500bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "$130.00 USD" (was sampled at $100, corrected). Weight kept as the prior sample estimate - the page/Shopify JSON exposes a flat 1041g figure identical across every EU size 38-50, a shipping-weight placeholder, not a real product weight.' },
  { id:'sho-endura-mt500-burner-flat', cat:'shoes', brand:'Endura', model:'MT500 Burner Flat', price:170, weight:880,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mt500-burner-flat-shoes-black-re9503bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "$170.00 USD" (was sampled at $130, corrected). Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure, not per-shoe.' },
  { id:'sho-endura-mt500-burner-clip', cat:'shoes', brand:'Endura', model:'MT500 Burner Clipless', price:180, weight:830,
    soleType:'clipless', closure:'lace', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mt500-burner-clipless-shoes-black-re9501bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "$180.00 USD" (was sampled at $140, corrected). 2-bolt SPD clipless. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure, not per-shoe.' },
  { id:'sho-poc-resistance-strong-mid', cat:'shoes', brand:'POC', model:'Resistance Strong Mid Flat', price:200, weight:850,
    soleType:'flat', closure:'lace', disciplines:['enduro','dh'], sizes:['39','40','41','42','43','44','45','46','47'], status:'discontinued',
    desc:'Mid-cut protective gravity flat shoe. Weight per pair (approx). Discontinued: POC has exited footwear entirely (poc.com\'s current nav and both /footwear category URLs 404 this pass, cycling or otherwise), so there is no live maker page to fetch. Stays unverified.' },
  { id:'sho-poc-resistance-ultra-clip', cat:'shoes', brand:'POC', model:'Resistance Ultra Clipless', price:250, weight:650,
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'], status:'discontinued',
    desc:'Lightweight trail/enduro clipless shoe, BOA closure. Weight per pair (approx). Discontinued: POC has exited footwear entirely (poc.com\'s current nav and both /footwear category URLs 404 this pass, cycling or otherwise), so there is no live maker page to fetch. Stays unverified.' },
  { id:'sho-bontrager-rally', cat:'shoes', brand:'Bontrager', model:'Rally', price:149.99, weight:850,
    soleType:'clipless', closure:'velcro', disciplines:['trail','enduro'], sizes:['36','37','38','38.5','39','39.5','40','40.5','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','47','48'],
    desc:'VERIFIED kit-7 (2026-07-20) via browser-rendered trekbikes.com (still sold, model 592742,'
      + ' tagged CLOSEOUT): row was mis-cataloged as a flat lace shoe (soleType flat->clipless,'
      + ' closure lace->velcro) - the page explicitly confirms 2-bolt SPD-style cleat compatibility'
      + ' and a hook-and-loop strap closure, not laces. Price $149.99 list (comp. value; not the'
      + ' active $23.93 clearance price) confirmed exactly. Sizes widened to the full 36-48 run'
      + ' shown. Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.trekbikes.com/us/en_US/bike-clothing/cycling-shoes/mountain-bike-shoes/bontrager-rally-mountain-bike-shoe/p/24883/' },
  { id:'sho-bontrager-foray', cat:'shoes', brand:'Bontrager', model:'Foray', price:164.99, weight:750,
    soleType:'clipless', closure:'boa', disciplines:['xc','trail'], sizes:['36','37','38','38.5','39','39.5','40','40.5','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','47','48'],
    desc:'VERIFIED kit-7 (2026-07-20) via browser-rendered trekbikes.com (model 5253425, tagged'
      + ' CLOSEOUT): closure corrected ratchet->boa (single BOA L6 dial, not a ratchet buckle);'
      + ' clipless/2-bolt SPD-compatible confirmed. Price $164.99 list (comp. value, not the active'
      + ' $24.93 clearance price) confirmed exactly. Sizes widened to the full 36-48 run shown.'
      + ' Trek has begun rebranding this line as "Trek Foray" ($169.99, a distinct SKU/id not added'
      + ' here) while this Bontrager-branded SKU remains sold as a closeout - not the same product,'
      + ' left unmerged. Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.trekbikes.com/us/en_US/bike-clothing/cycling-shoes/mountain-bike-shoes/bontrager-foray-mountain-bike-shoe/p/34130/' },
  { id:'sho-bontrager-flatline', cat:'shoes', brand:'Bontrager', model:'Flatline', price:139.99, weight:900,
    soleType:'flat', closure:'lace', disciplines:['enduro','dh'], sizes:['36','37','38','38.5','39','39.5','40','40.5','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','47','48'],
    desc:'VERIFIED kit-7 (2026-07-20) via browser-rendered trekbikes.com (model 5256933, tagged'
      + ' CLOSEOUT): flat pedal + lace closure confirmed as cataloged (Vibram outsole, integrated'
      + ' lace keeper). Price $139.99 list (comp. value, not the active $20.93 clearance price)'
      + ' confirmed exactly (was sample $170). Sizes widened to the full 36-48 run shown. Weight'
      + ' not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.trekbikes.com/us/en_US/bike-clothing/cycling-shoes/mountain-bike-shoes/mens-mountain-bike-shoes/bontrager-flatline-mountain-bike-shoe/p/34790/' },
  { id:'sho-giant-line', cat:'shoes', brand:'Giant', model:'Line', price:90, weight:800,
    soleType:'flat', closure:'lace', disciplines:['trail'], sizes:['39','40','41','42','43','44','45','46','47'],
    status:'discontinued',
    desc:'House-brand value trail flat shoe. Weight per pair (approx). Checked 2026-07-16: giant-bicycles.com/us/showcase/line-shoe is now marketing copy only with no purchasable SKU or price (giant-bicycles.com/us/shoes lists Shuttle Flat Lace/BOA, Charge, Surge instead; giant-bicycles.com/us/line-shoe and /us/line-shoe-2020 both 404). Flagged discontinued/superseded; price/weight left as prior sample.' },
  { id:'sho-sidi-dust', cat:'shoes', brand:'Sidi', model:'Dust', price:369.99, weight:700,
    soleType:'clipless', closure:'boa', disciplines:['xc','trail'], sizes:['38','38.5','39','39.5','40','40.5','41','41.5','42','42.5','43','43.5','44','44.5','45','45.5','46','46.5','47','48'],
    desc:'VERIFIED kit-7 (2026-07-20) via browser-rendered sidi.com (site-search resolved it -'
      + ' "MTB Dust" is real, marketed as a technical-gravel/MTB crossover shoe, not the plain XC'
      + ' race tier the row assumed). Closure corrected from "Tecno ratchet" (an older Sidi system'
      + ' this model does not use) to a SIDI Wire dial-with-cable system (mapped to boa, the closest'
      + ' vocab match, same mechanism family as Northwave\'s SLW3). Clipless MTB SR17 sole (2-bolt'
      + ' SPD-style, screw-replaceable toe) confirmed. Price $369.99 regular (comp. value, not the'
      + ' active -30% $258.99 sale) corrected from a $250 sample. Sizes widened to the full 38-48'
      + ' half-size run shown. Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://sidi.com/en-us/products/mtb-dust-grig' },
  { id:'sho-vaude-am-moab', cat:'shoes', brand:'Vaude', model:'AM Moab Gravity', price:149, weight:780,
    soleType:'flat', closure:'lace', disciplines:['trail','enduro'], sizes:['36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'],
    desc:'VERIFIED kit-7 (2026-07-20): the row matches VAUDE\'s "AM Moab Gravity" specifically (one'
      + ' of several current AM Moab variants - Mid Winter STX, Tech, Mid STX II also exist) --'
      + ' model corrected to disambiguate. Unisex canvas/hydrophobic-suede flat-pedal shoe,'
      + ' SUPtraction sole, lace closure confirmed (page text + a customer review both describe'
      + ' laces, not a dial/ratchet system). Weight 390g/shoe confirmed on the page (780g/pair).'
      + ' vaude.com prices in EUR only (EUR137.00, no US store) -- converted to a $149 USD sample'
      + ' per THE PRICE RULE, basis disclosed. Sizes widened to the full EU 36-50 run shown.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://www.vaude.com/int/en/20539-am-moab-gravity-cycling-shoes.html' },
  { id:'sho-scott-mtb-comp-boa', cat:'shoes', brand:'Scott', model:'MTB Comp BOA', price:109.99, weight:740,
    soleType:'clipless', closure:'boa', disciplines:['trail','enduro'], sizes:['40','41','42','43','44','45','46','47','48'],
    desc:'Trail/enduro clipless shoe, single BOA L6 dial, 2-bolt cleat compatible. Weight per pair (fetched scott-sports.com: 370g per shoe, US 8.5). Fetched page also corrected price $170 -> $109.99 and sizes to the maker\'s EU 40-48 range.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.scott-sports.com/us/en/product/scott-mtb-comp-boa-shoe' },
  { id:'sho-scott-sport-crus-r-flat-boa', cat:'shoes', brand:'Scott', model:'Sport Crus-r Flat BOA', price:150, weight:750, status:'discontinued',
    soleType:'flat', closure:'boa', disciplines:['trail','enduro'], sizes:['39','40','41','42','43','44','45','46','47'],
    desc:'RESOLVED kit-7 (2026-07-20): the direct product-slug 404 from 2026-07-17 is now explained --'
      + ' browsed (not searched, the site\'s own search box does not submit via URL params or a plain'
      + ' click) the full current "All Mountain Shoes" (12 SKUs) and "Mountain Bike Shoes" (16 SKUs)'
      + ' category listings on scott-sports.com/us/en. The only surviving "Sport Crus-r BOA" SKUs are'
      + ' four WOMEN\'S variants (plain/ECO/PLUS/Reflective, all -50% clearance); no men\'s "Sport'
      + ' Crus-r Flat BOA" or any plain men\'s "Sport Crus-r BOA" remains. Marked discontinued rather'
      + ' than guessing a re-scope onto a women\'s-fit SKU. Price/weight left as prior sample, not'
      + ' marked verified.' },
  { id:'sho-giro-riela-r2', cat:'shoes', brand:'Giro', model:'Riela R II', price:99.95, mfgPn:'GR-7089932',
    soleType:'clipless', fitCut:'womens', sizes:['36','37','38','39','40','41','42','43'],
    disciplines:['xc','trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.giro.com/p/riela-r-ii-mountain-bike-shoes/GR-7089932.html',
    desc:'Women\'s-specific XC/trail clipless (2-bolt) shoe - kit-breadth-2 pass (2026-07-22): the women\'s-fitCut shoe cell was almost empty (a single Ride Concepts row) before this addition. Fetched giro.com product page: style GR-7089932, list USD price $99.95 (currently $69.98 on a 29%-off sale, list price used per the MSRP pricing policy), EU sizes 36-43. No weight published on the page.' },

  /* -- Jerseys (all fields optional) -- */
  { id:'jsy-fox-flexair', cat:'jersey', brand:'Fox', model:'Flexair', price:104.95, weight:135,
    sleeve:'long', sizes:['S','M','L','XL','XXL'],
    sizeChart:{ S:{chest:[89,94]}, M:{chest:[94,99]}, L:{chest:[99,107]}, XL:{chest:[107,114]}, XXL:{chest:[114,122]} },
    desc:'CORRECTED 2026-07-17: price is the fetched $104.95 list for the current "Flexair Long Sleeve Jersey" (was sample $65; individual product-page URLs for this exact SKU 404, so sourced from the live mtb-jerseys category listing, not a search snippet). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mtb-jerseys/' },
  { id:'jsy-troyleedesigns-skyline', cat:'jersey', brand:'Troy Lee Designs', model:'Skyline SS', price:83, weight:136,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://troyleedesigns.com/products/sp25-skyline-ss-jersey-radioscape-mist', sourceType:'manufacturer',
    desc:'Re-verified 2026-07-16 via the .js Shopify product-JSON endpoint (append .js to the product URL): $83.00 USD regular/compare-at price confirmed, short sleeve, relaxed ride fit. Per-variant weight now sourced from the JSON (SM/XL/2X 181g, MD/LG 136g) - 136g (MD) used as the representative figure.' },
  { id:'jsy-raceface-indy', cat:'jersey', brand:'Race Face', model:'Indy LS', price:75,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/indy-ls-jersey',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $75.00 USD, sizes S-XXL confirmed. Corrects price 70->75 and sizes (added XXL). No weight published on the page - omitted rather than guessed (was a 180g sample estimate).' },
  { id:'jsy-fox-ranger', cat:'jersey', brand:'Fox', model:'Ranger', price:74.95, weight:150,
    sleeve:'long', sizes:['S','M','L','XL','XXL'],
    desc:'Trail-fit long-sleeve, lightweight woven fabric. CORRECTED 2026-07-17: price is the fetched $74.95 list for the current "Ranger Fox Head Long Sleeve Jersey" (was sample $50; sourced from the live mtb-jerseys category listing, individual product-page URL not resolved). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mtb-jerseys/' },
  { id:'jsy-fox-defend', cat:'jersey', brand:'Fox', model:'Defend', price:99.95, weight:160,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    desc:'CORRECTED 2026-07-17: price is the fetched $99.95 list for the current "Defend Long Sleeve Jersey" (was sample $60; page currently on sale at $79.99, list used per policy; sourced from the live mtb-jerseys category listing). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mtb-jerseys/' },
  { id:'jsy-troyleedesigns-flowline', cat:'jersey', brand:'Troy Lee Designs', model:'Flowline SS', price:65, weight:136,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp24-flowline-ss-jersey-confined-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $65.00 USD regular/compare-at price confirmed (matches the prior fetched-page correction). Per-variant weight sourced from the JSON (SM/MD 136g, LG/XL/2X 181g) - 136g (MD) used as the representative figure.' },
  { id:'jsy-troyleedesigns-sprint', cat:'jersey', brand:'Troy Lee Designs', model:'Sprint Pro LS', price:92, weight:109,
    sleeve:'long', sizes:['SM','MD','LG','XL','2X'], disciplines:['enduro','dh'],
    desc:'RESOLVED+RETARGETED grind-3 (2026-07-16): no plain "Sprint LS" SKU exists; retargeted to the real, currently-sold Sprint Pro LS Jersey via its Shopify product JSON. Weight is size MD (100g SM, 109g MD, 118g LG, 127g XL, 136g 2X).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://troyleedesigns.com/products/sprint-pro-ls-jersey-lowrider-313968-sangria' },
  { id:'jsy-100-ridecamp', cat:'jersey', brand:'100%', model:'Ridecamp SS', price:39, weight:140,
    sleeve:'short', sizes:['S','M','L','XL'],
    desc:'Weight approx, unconfirmed (the product-JSON grams field, 167g, is a shipping weight, not a garment weight - see the 100% glove rows for why it is not trusted; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $39, sizes S-XL (no XXL currently offered).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/ridecamp-short-sleeve-jersey-black' },
  { id:'jsy-100-airmatic', cat:'jersey', brand:'100%', model:'Airmatic LS', price:59, weight:160,
    sleeve:'long', sizes:['S','M','L','XL'],
    desc:'Weight approx, unconfirmed (the product-JSON grams field, 248g, is a shipping weight, not a garment weight - see the 100% glove rows; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $59, sizes S-XL (no XXL currently offered).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/airmatic-long-sleeve-jersey-cardinal' },
  { id:'jsy-endura-mt500', cat:'jersey', brand:'Endura', model:'MT500 Burner LS', price:100, weight:170,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mens-mt500-burner-l-s-jersey-black-re3212bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Men\'s MT500 Burner L/S Jersey", "$100.00 USD" (was sampled at $65, corrected), sizes S-2XL. Weight kept as the prior sample estimate - the page/Shopify JSON exposes a flat 250g figure identical across every size, a shipping-weight placeholder, not a real garment weight.' },
  { id:'jsy-endura-singletrack', cat:'jersey', brand:'Endura', model:'SingleTrack S/S Jersey', price:70, weight:150,
    sleeve:'short', sizes:['XS','S','M','L','XL'], fitCut:'womens',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.endurasport.com/en-us/collections/womens-jerseys-short-sleeve/products/womens-singletrack-s-s-jersey-rannoch-pink-re6205rnp',
    desc:'CONTRADICTION RESOLVED 2026-07-17 via bdata (plain WebFetch remains 403/429-walled on endurasport.com): the canonical product path is /en-us/collections/<collection>/products/womens-<slug>-<sku>, NOT /en-us/products/<slug> as the sitemap XML implies (which 404s) - this is why prior sessions using us.endurasport.com vs www.endurasport.com sitemaps got conflicting results; both subdomains serve the same Shopify catalog, the earlier us.endurasport.com citation was directionally correct, just an unresolvable slug format. Fetched page confirms: "Regular price $70.00 Sale price $35.00" (price=LIST=$70, corrected from the $55 sample - never the $35 sale price), Gender:Women, Discipline:Mountain Bike, Collection:SingleTrack, sizes XS-XL (no 2XL for this jersey, corrected from XXL). No weight published on the page; weight kept as the prior sample estimate.' },
  { id:'jsy-raceface-diffuse', cat:'jersey', brand:'Race Face', model:'Diffuse SS', price:45, weight:140,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'UNVERIFIED - a 2026-07-16 check of raceface.com/collections/jerseys found no current "Diffuse SS" jersey; only "Diffuse LS Jersey" (men\'s and women\'s) remains listed. Left as a sample row, not fabricated, and not marked discontinued on this weak evidence alone.' },
  { id:'jsy-specialized-enduro', cat:'jersey', brand:'Specialized', model:'Enduro Grom LS', price:40, weight:160,
    sleeve:'long', sizes:['M','L'], disciplines:['enduro'],
    desc:'Kids/youth jersey (Specialized "Grom" line). Corrected price 2026-07-16 to the fetched $40 MSRP. NOTE: specialized.com currently sells this line only as the Enduro Grom Short Sleeve Jersey and the Enduro Grom 3/4 Jersey - no true full-long-sleeve SKU was found; the catalog schema has no 3/4-sleeve vocab token, so this row is kept as the closest existing value (long) rather than fabricating a new token, and stays UNVERIFIED. Sizes reflect the 3/4 listing (M/L only); weight not published.' },
  { id:'jsy-specialized-trail-air', cat:'jersey', brand:'Specialized', model:'Trail-Series Air SS', price:65, weight:145,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'NOTE 2026-07-16: no short-sleeve Trail Air jersey found on specialized.com (site search returns no results; direct product URL 404s) - only the Trail Air LONG Sleeve Jersey is currently listed ($84.99 MSRP). This SS row may be discontinued; left unverified, no fields changed.' },
  { id:'jsy-leatt-mtb-trail', cat:'jersey', brand:'Leatt', model:'MTB Trail 2.0 SS', price:50, weight:150, status:'discontinued',
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'Checked us.leatt.com (2026-07-17): the men\'s jerseys collection page currently lists Trail 4.0/6.0 (long sleeve) and Gravity 5.0/8.0, with no men\'s "Trail 2.0" short-sleeve jersey; only a Women\'s Trail 2.0 remains listed. Superseded by later Trail generations. Flagged discontinued; price/weight left as prior sample (no live men\'s page to verify against).' },
  { id:'jsy-leatt-mtb-endurance', cat:'jersey', brand:'Leatt', model:'MTB Endurance 3.0 LS', price:87.99,
    sleeve:'long', sizes:['XS','S','M','L','XL','XXL','3XL'], disciplines:['trail','enduro'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://us.leatt.com/products/jersey-mtb-endurance-3-0-long-sleeve',
    desc:'FETCHED us.leatt.com: confirmed long sleeve, $87.99, sizes XS-3XL (3XL black only). No weight published on the page, omitted rather than guessed (was a 175g sample estimate). NB: a shorter-sleeve "Jersey MTB Endurance 3.0" (no LS) also exists as a separate SKU at $65.99 - not the same product.' },
  { id:'jsy-dakine-syncline', cat:'jersey', brand:'Dakine', model:'Syncline LS', price:50, weight:165,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], status:'discontinued',
    desc:'RESOLVED grind-3 (2026-07-16): confirmed discontinued - dakine.com/products/syncline-2-0-short-sleeve-bike-jersey-womens-black.js and the women\'s 3/4-sleeve variant are the only current Syncline jerseys; no men\'s LS SKU exists at any handle tried. The women\'s SS slot is separately covered by jsy-dakine-syncline-ss (now retargeted+verified); left this row as a discontinued marker rather than deleting a previously-cataloged id.' },
  { id:'jsy-dakine-thrillium', cat:'jersey', brand:'Dakine', model:'Thrillium SS', price:55, weight:135,
    sleeve:'short', sizes:['S','M','L','XL'], status:'discontinued',
    desc:'RESOLVED grind-3 (2026-07-16): confirmed discontinued - only a women\'s Thrillium Long Sleeve Club Jersey and Short Sleeve Club Jersey are sold now; no men\'s Thrillium SS SKU exists at any handle tried. The women\'s LS slot is separately covered by jsy-dakine-thrillium-ls (now retargeted+verified); left this row as a discontinued marker rather than deleting a previously-cataloged id.' },
  { id:'jsy-ion-scrub-amp', cat:'jersey', brand:'ION', model:'Scrub AMP LS', price:70, weight:180,
    sleeve:'long', sizes:['S','M','L','XL','XXL'],
    desc:'RE-ATTEMPTED kit-11 (2026-07-21): fetched the BAT LS variant directly (ion-products.com/en/us/products/mtb-jersey-scrub-amp-bat-long-sleeve-men-47242-5011) - it is listed "Sold out" with NO price displayed on the page at all (not just a mismatch), sizes 48/S-56/XXL, no weight published. Combined with the 2026-07-18 finding of many concurrent Scrub Amp generations (BAT/non-BAT/Mesh_ine/2022/2023, $59.95-$94.99 by variant), the blocker remains genuine SKU-proliferation + this variant\'s price being unpublished (not a price-basis issue THE PRICE RULE would excuse) - no single current listing cleanly matches this row. Left unverified.' },
  { id:'jsy-fasthouse-alloy', cat:'jersey', brand:'Fasthouse', model:'Alloy Mesa LS', price:70, weight:155,
    sleeve:'long', sizes:['S','M','L','XL','XXL','3XL'],
    desc:'Re-fetched fasthouse.com (2026-07-17): $70 regular MSRP confirmed (currently $30 on sale/sold out, sale price not used per MSRP-basis pricing policy), sizes S-3XL, 94% Polyester/6% Spandex FastDri fabric confirmed.'
      + ' Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://fasthouse.com/products/alloy-mesa-long-sleeve-jersey-heather-charcoal-black' },
  { id:'jsy-pearlizumi-summit', cat:'jersey', brand:'Pearl iZUMi', model:'Summit SS', price:70,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Re-fetched pearlizumi.com/products/mens-summit-short-sleeve-jersey-19122401 2026-07-20: price ($70), short sleeve and sizing confirmed again, matching the 2026-07-16 pass exactly; 80/20 recycled-poly blend, relaxed fit, UPF 25. Page publishes no weight; omitted rather than guessed (kit weight policy: never blocks verification).',
    source:'https://www.pearlizumi.com/products/mens-summit-short-sleeve-jersey-19122401' },
  { id:'jsy-poc-essential', cat:'jersey', brand:'POC', model:'Essential Enduro LS', price:80, weight:170,
    sleeve:'long', sizes:['S','M','L','XL'], disciplines:['enduro'],
    desc:'UNVERIFIED (2026-07-16 check): "Essential Enduro Jersey" does not appear in POC\'s current'
      + ' poc.com catalog - only retailer listings dated ~2019 reference it. The current enduro jersey'
      + ' in POC\'s lineup is "Reform Enduro Jersey" (see jsy-poc-reform-ls, fetched/verified this'
      + ' session at $110/270g) which likely superseded this SKU. Left as a sample row rather than'
      + ' fabricated or removed on this evidence alone; a coordinator call on whether to retire/alias'
      + ' it to the Reform line would resolve this cleanly.' },
  { id:'jsy-poc-motion-ss-womens', cat:'jersey', brand:'POC', model:'Women\'s Motion Short Sleeve Jersey', price:70, weight:132,
    sleeve:'short', sizes:['XS','S','M','L','XL'], fitCut:'womens', disciplines:['trail'],
    desc:'Grind-3 breadth add (2026-07-16): fetched poc.com product page directly - "relaxed silhouette" casual/trail jersey, 85% recycled polyester-cotton blend, weight 132g size M as stated on the page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/ws-motion-ss-jersey-apatite-navy' },

  /* -- Jersey grind batch 1: deeper per-brand SS/LS breadth (2026-07-14) -- */
  { id:'jsy-fox-flexair-ss', cat:'jersey', brand:'Fox', model:'Flexair Jersey', price:89.95, weight:120,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'Slim-fit short-sleeve, accommodates low-profile guards. CORRECTED 2026-07-17: price is the fetched $89.95 list (was sample $45; sourced from the live mtb-jerseys category listing, individual product-page URL not resolved). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mtb-jerseys/' },
  { id:'jsy-fox-flexair-pro-ls', cat:'jersey', brand:'Fox', model:'Flexair Pro Long Sleeve Jersey', price:75, weight:155,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    status:'discontinued',
    desc:'Polartec Delta cooling panel + Dyneema shoulder abrasion reinforcement. RESOLVED kit-10 (2026-07-21): tagged discontinued. The product was real (retailer listings persist at Cambria/BTO/Amazon; BTO shows sold-out) but foxracing.com/product/flexair-pro-long-sleeve-jersey/28865.html re-confirmed HTTP 404, and the current Flexair Pro tier is short-sleeve only ("Flexair Pro Jersey" style #32325, $79.95 list, fetched 2026-07-21) - no LS Pro successor on the maker site. Price/weight left as the prior sample (no live maker figure to correct against).' },
  { id:'jsy-fox-ranger-ss', cat:'jersey', brand:'Fox', model:'Ranger Jersey', price:54.95, weight:130,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://www.foxracing.com/product/ranger-jersey/32436.html',
    desc:'RESOLVED kit-10 (2026-07-21): a plain "Ranger Jersey" DOES exist as a live product page (style #32436) even though it was absent from the mtb-jerseys category listing the 07-17 pass swept - fetched directly: $54.95 list (corrected from the $45 sample), sizes S-2XL, TruDri 85% polyester / 15% cotton, drop-tail MTB tailoring. Black colorway shows sold-out inventory but the page and list price are current. No weight published; 130g stays a sample per the kit weight policy.' },
  /* RETIRED kit-10 (2026-07-21): jsy-fox-ranger-foxguard-ls - FABRICATED. No product
     named "Foxguard" exists on foxracing.com or any retailer/review site, current or
     historical. Retargeted (coordinator-approved, see tools/verify-notes-kit.md "Kit
     Wave 10") to KIT_ALIASES -> jsy-fox-defend, the real guard-compatible jersey in
     Fox's live line (the "Defend Long Sleeve Jersey", style #32367; jsy-fox-defend-ss
     already covers the Defend SS tier). */
  { id:'jsy-fox-defend-ss', cat:'jersey', brand:'Fox', model:'Defend Jersey', price:79.95, weight:140,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    desc:'CORRECTED 2026-07-17: price is the fetched $79.95 list for the current "Defend Jersey" (was sample $55; page currently on sale at $55.99, list used per policy; sourced from the live mtb-jerseys category listing). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mtb-jerseys/' },
  { id:'jsy-troyleedesigns-skyline-ls', cat:'jersey', brand:'Troy Lee Designs', model:'Skyline LS', price:95, weight:227,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp24-skyline-ls-jersey-iconic-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $95.00 USD regular/compare-at price confirmed. Per-variant weight sourced from the JSON (SM 181g, MD/LG/XL/2X 227g) - 227g (MD) used as the representative figure.' },
  { id:'jsy-troyleedesigns-skylineair-ss', cat:'jersey', brand:'Troy Lee Designs', model:'Skyline Air SS', price:83, weight:136,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp24-skyline-air-ss-jersey-sram-roots-cement',
    desc:'Warm-weather knit, more open mesh than the standard Skyline. Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $83.00 USD regular/compare-at price confirmed. Per-variant weight sourced from the JSON (SM/MD/LG/2X 136g, XL 181g) - 136g (MD) used as the representative figure.' },
  { id:'jsy-troyleedesigns-ruckus-ss', cat:'jersey', brand:'Troy Lee Designs', model:'Ruckus Ride 3/4 Tee', price:83, weight:135,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://troyleedesigns.com/collections/ruckus-jerseys',
    desc:'RESOLVED+RETARGETED kit-10 (2026-07-21): the flagged short-sleeve Ruckus never appeared in TLD\'s lineup (the original Semenuk-era Ruckus was itself 3/4-sleeve per period reviews); the maker\'s 35-product Ruckus Jerseys collection today is exclusively 3/4 and LS. Re-scoped per the running-change rule to the current "Ruckus Ride 3/4 Tee" ($83.00 USD list, multiple colorways: Wings/Mono, all $83). 3/4 sleeve modeled as `long` per the established no-3/4-token convention (see jsy-specialized-endurogrom-ls). Weight stays the prior sample; TLD publishes none on the collection page. Id kept append-only.' },
  { id:'jsy-troyleedesigns-ruckus-ls', cat:'jersey', brand:'Troy Lee Designs', model:'Ruckus LS', price:83, weight:165,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17',
    source:'https://troyleedesigns.com/products/ruckus-ride-ls-tee-waves-371048-dawn-blue',
    desc:'Verify pass (kit-fanout-1a, 2026-07-17): re-fetched troyleedesigns.com/products.json - the current "Ruckus Ride LS Tee" line (multiple colorways: Waves, Lockdown, Pressed) sells at $83.00 USD list price with no active discount, sizes S-2XL confirmed. Price ($50 sample -> $83) was already corrected by a prior pass; re-confirmed unchanged. No weight published (165g remains an unverified sample figure).' },
  { id:'jsy-raceface-indy-ss', cat:'jersey', brand:'Race Face', model:'Indy SS', price:70,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/indy-ss-jersey-mens',
    desc:'Verified vs fetched raceface.com Shopify product JSON (Indy SS Jersey - Men\'s): compare_at_price (regular/list price) $70.00 USD, sizes S-XXL confirmed. Corrects price 55->70 and sizes (added XXL). No weight published on the page - omitted rather than guessed (was a 140g sample estimate).' },
  { id:'jsy-raceface-indy-ss-womens', cat:'jersey', brand:'Race Face', model:'Indy SS Jersey - Women\'s', price:70,
    sleeve:'short', sizes:['XS','S','M','L','XL'], fitCut:'womens', verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17',
    source:'https://www.raceface.com/products/indy-ss-jersey-womens',
    desc:'Verify pass (kit-fanout-1a, 2026-07-17): fetched raceface.com/products/indy-ss-jersey-womens.js (all 4 colorways) - list price (compare_at_price) is $70.00 USD across every size, currently selling at a $35 sale price. CORRECTS price $35 (the sale price) -> $70 (the list price), per the always-list-never-sale rule. Sizes XS-XL confirmed. No weight published on the page.' },
  { id:'jsy-raceface-traverse-34-womens', cat:'jersey', brand:'Race Face', model:'Traverse DriRelease 3/4 Jersey - Women\'s', price:61,
    sleeve:'long', sizes:['XS','S','M','L','XL'], fitCut:'womens', verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17',
    source:'https://www.raceface.com/products/traverse-drirelease-3-4-jersey',
    desc:'Verify pass (kit-fanout-1a, 2026-07-17): fetched raceface.com/products/traverse-drirelease-3-4-jersey.js - $61.00 regular price confirmed (Navy/Sand colorways at full price; a third Dark Pink colorway sits at a $27.45 clearance price, not used here). Modeled as long-sleeve - the schema\'s sleeve vocab has no 3/4 token (same convention as the catalog\'s other 3/4-sleeve rows). No weight published on the page.' },
  { id:'jsy-raceface-diffuse-ls', cat:'jersey', brand:'Race Face', model:'Diffuse LS', price:53,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/diffuse-ls-jersey-mens',
    desc:'Verified vs fetched raceface.com Shopify product JSON (Diffuse LS Jersey - Men\'s): compare_at_price (regular/list price) $53.00 USD, sizes S-XXL confirmed. Corrects price 55->53. No weight published on the page - omitted rather than guessed (was a 170g sample estimate).' },
  { id:'jsy-raceface-trigger-ls', cat:'jersey', brand:'Race Face', model:'Trigger LS', price:60, weight:175,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'UNVERIFIED - a 2026-07-16 check of raceface.com/collections/jerseys (full current jersey list fetched) found no "Trigger LS Jersey" or any current Trigger-line jersey; only Indy LS/SS, Diffuse LS, Commit 3/4/SS, Conspiracy DWR LS, Nimby SS, Sendy (kids), Traverse remain listed. Third-party retailers (Jenson, Incycle, Blister review) still reference a Trigger Jersey, but no raceface.com page was found to verify against - left as a sample row, not fabricated, and not marked discontinued on this weak evidence alone.' },
  { id:'jsy-100-celium-ss', cat:'jersey', brand:'100%', model:'Celium SS', price:60, weight:130,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    desc:'RE-CHECKED 2026-07-19 via browser pane (WebFetch JS-walled): the current 100percent.com'
      + ' MTB Gear Collection (pages/mtb) lists only three lines - R-Core X, Airmatic, Ridecamp -'
      + ' "Celium" is absent from all three and returns zero search results. Confirmed'
      + ' discontinued/renamed. Left unverified, no fields changed.' },
  { id:'jsy-100-celium-ls', cat:'jersey', brand:'100%', model:'Celium LS', price:65, weight:160,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    desc:'See jsy-100-celium-ss - the whole Celium line is confirmed discontinued/renamed'
      + ' (RE-CHECKED 2026-07-19, zero results on 100percent.com search/collections). Left'
      + ' unverified, no fields changed.' },
  { id:'jsy-100-ridecamp-ls', cat:'jersey', brand:'100%', model:'Ridecamp LS', price:50, weight:165,
    sleeve:'long', sizes:['S','M','L','XL','XXL'],
    desc:'Polyester mesh, moisture-wicking, drop-tail coverage, internal goggle wipe. $44 EUR'
      + ' RRP (100percent.eu, current parent-brand SP25 collection) converted to $50 USD sample -'
      + ' no US-site page surfaced this session (100percent.com is Shopify JS-rendered, WebFetch'
      + ' 403s/blank). Weight not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://100percent.eu/collections/ridecamp-collection' },
  { id:'jsy-endura-mt500burnerlite-ls', cat:'jersey', brand:'Endura', model:'MT500 Burner Lite LS', price:90, weight:150,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mens-mt500-burner-lite-l-s-tee-black-re3230bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Men\'s MT500 Burner Lite L/S Tee", "$90.00 USD" (was sampled at $60, corrected), lighter/airier variant of the MT500 Burner for warm-weather riding, sizes S-2XL. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure, not per-garment.' },
  { id:'jsy-endura-hummveeray-ss', cat:'jersey', brand:'Endura', model:'Hummvee Ray SS', price:45, weight:135,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    status:'discontinued',
    desc:'RESOLVED 2026-07-17 via bdata search: multiple independent retailer listings (IBKBike, others) confirm "Endura Hummvee Ray Short Sleeve Jersey" was a real, currently-discontinued product - this settles the two prior sessions\' sitemap-only negatives (product genuinely dropped from the current lineup, not a phantom/fabricated id). A comprehensive bdata fetch of the full en-us product sitemap this session (567 distinct product URLs) again shows zero "hummvee"+"ray" jersey slugs, confirming it is not currently sold. Marked discontinued rather than removed since it existed; price/weight remain the prior sample (no live page to verify against).' },
  { id:'jsy-endura-gv500-ls', cat:'jersey', brand:'Endura', model:'GV500 LS', price:60, weight:165,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    status:'discontinued',
    desc:'RESOLVED 2026-07-17 via bdata search (bikeperfect.com review, merlincycles/alltricks/amazon/bike-components retailer listings, Endura\'s own bikeperfect-linked review) - the GV500 Long/Short Sleeve Jersey was a REAL product, confirming the earlier "no jersey in the GV500 line" sitemap findings were about the CURRENT catalog only, not history; it has since been dropped (a fresh fetch of endurasport.com/en-us/collections/mens-jerseys-long-sleeve confirms no GV500 SKU sells today - only bib-tights/baggy-shorts remain live under GV500). Marked discontinued rather than removed (existed, is not currently sold) per protocol. SCOPE FLAG for the coordinator: GV500 is Endura\'s GRAVEL line (bikeperfect.com explicitly calls it a "gravel-specific jersey"), not an MTB product - this row\'s disciplines:[\'trail\'] tag may be a mis-categorization from original entry; left as-is (not this worker\'s call to reclassify/remove a non-Endura-Endura-brand-scope item outside the explicitly assigned TLD moto-scope check).' },
  { id:'jsy-endura-singletrack-ls', cat:'jersey', brand:'Endura', model:'SingleTrack L/S Jersey', price:90, weight:175,
    sleeve:'long', sizes:['XS','S','M','L','XL','2XL'], fitCut:'womens',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.endurasport.com/en-us/collections/womens-jerseys-long-sleeve/products/womens-singletrack-l-s-jersey-machair-green-re6221mag',
    desc:'CONTRADICTION RESOLVED 2026-07-17 via bdata (same fix as jsy-endura-singletrack: canonical path is /en-us/collections/<collection>/products/womens-<slug>-<sku>, not the sitemap slug format that 404s). Fetched page confirms: "Regular price $90.00" (no active sale; corrected from the $60 sample), Gender:Women, Discipline:Mountain Bike, Collection:SingleTrack, sizes XS-2XL (corrected from XXL naming). No weight published on the page; weight kept as the prior sample estimate.' },
  { id:'jsy-specialized-enduro-ss', cat:'jersey', brand:'Specialized', model:'Enduro Grom SS', price:40, weight:140,
    sleeve:'short', sizes:['S','M','L'], disciplines:['enduro'],
    desc:'Kids/youth jersey (Specialized "Grom" line), VaporRize woven construction. RE-CHECKED'
      + ' 2026-07-19 via browser-rendered specialized.com search (WebFetch 403s this domain):'
      + ' "enduro grom" now returns zero results, superseding the 2026-07-16 confirm - the whole'
      + ' Enduro Grom apparel line appears discontinued. Weight was never published either way.'
      + ' Left unverified, no fields changed.' },
  { id:'jsy-specialized-trail-ss', cat:'jersey', brand:'Specialized', model:'Trail Jersey SS', price:59.99, weight:140,
    sleeve:'short', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'MiniR fabric, UV 50+. $59.99 MSRP confirmed live as "Men\'s Trail Short Sleeve Jersey"'
      + ' (currently on $44.99 sale, MSRP-basis kept). Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/shop/cycling-clothing/cycling-jerseys' },
  { id:'jsy-specialized-trail-ss-womens', cat:'jersey', brand:'Specialized', model:'Women\'s Trail Short Sleeve Jersey', price:59.99,
    sleeve:'short', sizes:['XS','S','M','L','XL','XXL'], fitCut:'womens', disciplines:['trail'],
    desc:'Women\'s-specific-fit SKU (MiniR fabric). Price CORRECTED 2026-07-19 from a retailer-'
      + ' sourced $60 to $59.99 - now manufacturer-confirmed live as "Women\'s Trail Short Sleeve'
      + ' Jersey" (currently on $44.99 sale, MSRP-basis kept). Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/shop/cycling-clothing/cycling-jerseys' },
  { id:'jsy-leatt-mtbgravity-ls', cat:'jersey', brand:'Leatt', model:'MTB Gravity 4.0 LS', price:76.99,
    sleeve:'long', sizes:['S','M','L','XL','XXL','3XL'], disciplines:['enduro','dh'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://us.leatt.com/products/jersey-mtb-gravity-4-0-long-sleeve',
    desc:'RE-CORRECTED 2026-07-16: the prior fetch found only the "-sale"-tagged Obsolete SKU (jersey-mtb-gravity-4-0-sale, $51.99, sleeve unconfirmed). This is a DIFFERENT, currently-active product page ("Jersey MTB Gravity 4.0 - Long Sleeve", in stock, not discontinued): confirmed long sleeve, $76.99 (exact price string on the page, .js API returns 7699 cents). No weight published on the page, omitted rather than guessed.' },
  { id:'jsy-leatt-mtballmtn-ss', cat:'jersey', brand:'Leatt', model:'MTB AllMtn 2.0 SS', price:67, weight:135,
    sleeve:'short', sizes:['XS','S','M','L','XL','XXL','3XL'], disciplines:['trail','enduro'],
    desc:'TENCEL soft-touch fabric, neck-brace-ready collar, wearable with or without body armor.'
      + ' RE-CHECKED 2026-07-19: the US site\'s clearance SKU (fetched 2026-07-16 at a stale'
      + ' $35.74) is gone from us.leatt.com\'s current jersey collection, but the same "Jersey MTB'
      + ' All Mountain 2.0" is confirmed CURRENT on Leatt\'s Swiss site at CHF59.90, converted to'
      + ' $67 USD sample (no live US MSRP page this session). Weight not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://mtb.leatt.ch/products/jersey-mtb-allmtn-2-0' },
  { id:'jsy-leatt-mtbtrail-ls', cat:'jersey', brand:'Leatt', model:'MTB Trail 3.0 LS', price:49.49,
    sleeve:'long', sizes:['XS','S','M','L','XL','XXL','3XL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://us.leatt.com/products/jersey-mtb-trail-3-0-long-sleeve',
    desc:'RE-CORRECTED 2026-07-16: the prior fetch matched the wrong SKU (jersey-mtb-trail-3-0-sale = the short-sleeve, Obsolete-tagged "Jersey MTB Trail 3.0", $45.49). There is a SEPARATE, currently-active "Jersey MTB Trail 3.0 - Long Sleeve" product page confirming the "LS" model name: in stock, long sleeve, $49.49 (.js API price 4949 cents; page text rounds to $49.99). No weight published on the page, omitted rather than guessed.' },

  /* -- Jersey grind batch 2: wider brand coverage (2026-07-14) -- */
  { id:'jsy-dakine-syncline-ss', cat:'jersey', brand:'Dakine', model:'Syncline 2.0 Short Sleeve Bike Jersey', price:55, weight:181,
    sleeve:'short', sizes:['XS','S','M','L','XL'], fitCut:'womens',
    desc:'RESOLVED+RETARGETED grind-3 (2026-07-16): the flagged men\'s Syncline SS row had no current SKU; retargeted to the real, currently-sold women\'s Syncline 2.0 Short Sleeve Bike Jersey via its Shopify .js product JSON (uniform 181g across XS-L, confirms the maker doesn\'t vary weight by size).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.dakine.com/products/syncline-2-0-short-sleeve-bike-jersey-womens-black' },
  { id:'jsy-dakine-thrillium-ls', cat:'jersey', brand:'Dakine', model:'Thrillium Long Sleeve Club Jersey', price:55, weight:227,
    sleeve:'long', sizes:['S','M','L','XL'], fitCut:'womens',
    desc:'RESOLVED+RETARGETED grind-3 (2026-07-16): the flagged men\'s Thrillium LS row had no current SKU; retargeted to the real, currently-sold women\'s Thrillium Long Sleeve Club Jersey via its Shopify .js product JSON (uniform 227g across S-XL).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.dakine.com/products/thrillium-long-sleeve-club-jersey-womens-mineral-red' },
  { id:'jsy-dakine-charger-ls', cat:'jersey', brand:'Dakine', model:'Charger LS', price:55, weight:160,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'UNVERIFIED (2026-07-16 dakine.com search-suggest check): no "Charger" jersey found in the current product catalog. Left as an unverified sample rather than fabricated or removed on this evidence alone.' },
  { id:'jsy-ion-traze-amp-ss', cat:'jersey', brand:'ION', model:'Traze AMP SS', price:60, weight:135,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-18: multiple current Traze Amp SS variants found on ion-products.com (AFT $84.99, non-AFT $79.99, half-zip tee $59.95) - no exact $60 match, same SKU-proliferation issue as the Scrub Amp cluster (see jsy-ion-scrub-amp). Left unverified.' },
  { id:'jsy-ion-scrub-amp-ss', cat:'jersey', brand:'ION', model:'Scrub AMP SS', price:65, weight:150,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-18: see jsy-ion-scrub-amp - same multi-generation SKU ambiguity on ion-products.com, no clean $65 match found. Left unverified.' },
  { id:'jsy-ion-seek-amp-ls', cat:'jersey', brand:'ION', model:'Seek AMP LS', price:75, weight:185,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    desc:'ATTEMPTED 2026-07-18: ion-products.com lists multiple Seek Amp LS SKUs across generations ("2.0", numbered variants) with prices not surfaced cleanly via search; same SKU-proliferation issue as the Scrub Amp cluster. Left unverified.' },
  /* RETIRED kit-10 (2026-07-21): jsy-fasthouse-alloycole-ss + jsy-fasthouse-alloyrufio-ls -
     FABRICATED. Alloy colorways across maker + retailers are Rally/Mesa/Ronin/Stripe/
     Sidewinder/Slade/Block - "Cole" matches none, any era. The only live "Rufio" is the
     Grindhouse Rufio Jersey, Fasthouse's MOTO/MX line (RevZilla-motorcycle,
     RockyMountainATV) - retarget explicitly NOT advised (would pull a motocross jersey
     into MTB kit). Plain tombstone, no KIT_ALIASES entry for either. See
     tools/verify-notes-kit.md "Kit Wave 10". */
  { id:'jsy-fasthouse-classic-ss', cat:'jersey', brand:'Fasthouse', model:'Classic Outland SS Jersey', price:60, weight:125,
    sleeve:'short', sizes:['S','M','L','XL','XXL','XXXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://www.fasthouse.com/products/classic-outland-ss-jersey-cream',
    desc:'RESOLVED+RETARGETED kit-10 (2026-07-21): the generic "Classic Jersey" name matched no SKU (Fasthouse sells the Classic line per-colorway: Outland/805/Cartel/Velocity/Mercury); re-scoped per the running-change rule to the live "Classic Outland SS Jersey" - fetched fasthouse.com: $60.00 list (currently on sale at $35, list used per policy), sizes S-3XL, FastDri 100% polyester, crew collar, mesh side/underarm venting. No weight published; 125g stays a sample. Id kept append-only.' },
  { id:'jsy-pearlizumi-summit-ls', cat:'jersey', brand:'Pearl iZUMi', model:'Canyon LS', price:65, weight:165,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'RESOLVED+RETARGETED kit-10 (2026-07-21): the plain men\'s Summit LS was RENAMED into the Canyon line - competitivecyclist.com\'s "pearl-izumi-summit-long-sleeve-jersey-mens" slug serves a page titled "Canyon Long-Sleeve Jersey", and pearlizumi.com\'s live "Men\'s Canyon Long Sleeve Jersey" (style #19122201, drirelease fabric, drop-tail, everyday-trail tier) is the matching product. Re-scoped per the running-change rule; price corrected $80 -> $65, the consistent USD MSRP across two independent retailers (dickssportinggoods.com and shopdownwindsports.com, both listing style 19122201). STAYS UNVERIFIED: pearlizumi.com itself returned HTTP 429 on every fetch attempt again this pass, so no maker-page price basis yet - retry candidate. 165g weight remains a sample. Id kept append-only.', lastChecked:'2026-07-21' },
  { id:'jsy-pearlizumi-summitpro-ss', cat:'jersey', brand:'Pearl iZUMi', model:'Summit PRO SS', price:80, weight:135,
    sleeve:'short', sizes:['XS','S','M','L','XL','XXL','XXXL'],
    desc:'Delta Peak knit fabric, race-weight. Price corrected 2026-07-16 toward $80, the consistent price found across retailer search aggregation (catalog previously had $90) - pearlizumi.com/products/mens-summit-pro-short-sleeve-jersey-19122208 returned HTTP 429 on every direct fetch attempt this session (the -19122403 id variant 404s, likely a retired/duplicate SKU), so this stays an unverified correction. Two independent retailers (webcyclery.com, bertsbikes.com) both confirmed the maker\'s actual size range is XS-XXXL, not S-XXL - corrected. Material per those listings: 73% recycled polyester / 27% tencel lyocell.', lastChecked:'2026-07-16' },
  { id:'jsy-poc-air-ss', cat:'jersey', brand:'POC', model:'Motion Air Jersey SS', price:80, weight:115,
    sleeve:'short', sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://poc.com/en-us/product/ms-motion-air-s-s-jersey-uranium-black',
    desc:'RE-CORRECTED 2026-07-16: the "Air Jersey" line has been renamed "Motion Air" on poc.com/en-us; the prior fetch mismatched this SS row to the LS product\'s $110 price. Confirmed via the current product page and the men\'s jersey category listing: Motion Air Short Sleeve MTB Jersey, $80.00, 115g (size M, maker-stated), sizes XS-XXL (added missing XS).' },
  { id:'jsy-poc-reform-ls', cat:'jersey', brand:'POC', model:'Reform Enduro LS', price:110, weight:270,
    sleeve:'long', sizes:['XS','S','M','L','XL','XXL'], disciplines:['enduro'],
    desc:'220g/m2 recycled-polyester fabric. Fetched poc.com: corrected price $90 -> $110, weight 175g -> 270g (maker-stated, size M), and sizes to the full XS-XXL run (was missing XS/XXL).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/ms-reform-enduro-jersey-uranium-black' },
  { id:'jsy-poc-pure-ls', cat:'jersey', brand:'POC', model:'Pure LS', price:80, weight:170,
    sleeve:'long', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'Re-fetched poc.com (2026-07-17): CORRECTED price $90 -> $80 (current MTB Pure LS Jersey listing). Weight not published on the maker page; kept as the existing sample per the kit weight policy (weight never blocks kit verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://poc.com/en-us/product/mtb-pure-ls-jersey-epidote-green-sylvanite-grey' },
  { id:'jsy-poc-essentialdh-ls', cat:'jersey', brand:'POC', model:'Essential DH LS', price:110,
    sleeve:'long', sizes:['XS','S','M','L','XL','XXL'], disciplines:['dh'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://poc.com/en-us/product/essential-dh-ls-jersey-carbon-black',
    desc:'Raglan-sleeve DH jersey designed to work with POC VPD body armor. Re-fetched poc.com/en-us (a real US listing exists after all): confirmed USD regular price $110.00 (page currently shows a 40%-off $66 sale price), item # PC528201024, sizes XS-XXL. No weight published on the page, omitted rather than guessed.' },
  { id:'jsy-7mesh-roam-ss', cat:'jersey', brand:'7mesh', model:'Roam Shirt SS', price:65, weight:115,
    sleeve:'short', sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14',
    source:'https://7mesh.com/en-EU/products/mens-roam-shirt-ls', sourceType:'measured',
    weightSource:'https://www.mbr.co.uk/reviews/jerseys/7mesh-roam-ss-shirt-review',
    desc:'Weight = 115g (size L), a reputable third-party MEASURED figure (mbr.co.uk review) per the catalog\'s measured-weight policy; price approximated from 7mesh.com EUR pricing.' },
  { id:'jsy-7mesh-roam-ls', cat:'jersey', brand:'7mesh', model:'Roam Shirt LS', price:80,
    sleeve:'long', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Re-fetched 7mesh.com (en-US) 2026-07-20: still $48-80 by colorway (top of range matches prior sample) and sizes XS-XXL, matching the 2026-07-16 pass exactly. No weight published; omitted rather than guessed.',
    source:'https://7mesh.com/en-US/products/mens-roam-shirt-ls' },
  /* RETIRED kit-10 (2026-07-21): jsy-7mesh-slab-ls - FABRICATED. "Slab" has only ever
     named a 7mesh SHORTS model (Singletracks' launch coverage pairs "7mesh Slab Shorts
     and Desperado Shirt"); no Slab-named shirt/jersey appears on 7mesh.com or any
     retailer, current or historical (7mesh shirt lines: Roam/Atlas/Compound/Desperado/
     Sight). Plain tombstone, no KIT_ALIASES entry (no real "Slab" shirt to retarget to).
     See tools/verify-notes-kit.md "Kit Wave 10". */
  { id:'jsy-sombrio-badass-ls', cat:'jersey', brand:'Sombrio', model:'Badass LS', price:55, weight:170,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    desc:'Checked 2026-07-16: Sombrio has no live maker storefront - sombrio.com refuses connection, sombriocartel.com and the us-store.sombriocartel.com subdomain both canonical-redirect to garneau.com\'s generic homepage (the us-store subdomain also serves an expired TLS certificate) with no surviving Sombrio product pages. Left unchanged as an unverified sample; the brand is retailer-distribution-only today.' },
  { id:'jsy-sombrio-highline-ss', cat:'jersey', brand:'Sombrio', model:'Highline SS', price:45, weight:140,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'Checked 2026-07-16: no live Sombrio maker storefront (see jsy-sombrio-badass-ls for detail). Left unchanged as an unverified sample.' },
  { id:'jsy-royalracing-turbulence-ss', cat:'jersey', brand:'Royal Racing', model:'Turbulence SS', price:45, weight:135,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    status:'discontinued',
    desc:'RESOLVED kit-10 (2026-07-21): tagged discontinued. The Turbulence SS was a real product - BikeRadar published a full review ("sits at the top of Royal Racing\'s all-mountain range", SS and LS variants), and Jenson USA/Backcountry/Amazon listings persist - but a fresh fetch of royalracing.com\'s jerseys collection confirms the current line is Apex/Core only (Blast & Rally LTD editions), no Turbulence. Price/weight left as prior sample (no live maker figure).' },
  { id:'jsy-royalracing-apex-ls', cat:'jersey', brand:'Royal Racing', model:'Apex LS', price:100, weight:165,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail','enduro'],
    desc:'Corrected price ($55 sample -> $100, GBP99.99 fetched regular price converted at ~1.27 USD/GBP) - royalracing.com\'s regular Apex Jersey line is short-sleeve-only; the only LS variant found is "Apex Jersey Long Sleeve - LTD Edition Splatter" at a clearance-only GBP99.99/GBP29.99 sale, so this row may be a limited/discontinued colorway rather than a standing SKU. No weight published (165g remains an unverified sample figure).' },
  { id:'jsy-alpinestars-drop-ss', cat:'jersey', brand:'Alpinestars', model:'Drop 6.0 SS', price:59.95,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.alpinestars.com/products/drop-6-0-jersey-short-sleeve',
    desc:'RE-CHECKED 2026-07-16 via the .js JSON endpoint: price $59.95 exactly matches (no active sale;'
      + ' price==compare_at_price), sizes S-2XL confirmed. No weight published on the page - the prior'
      + ' 135g sample is dropped rather than carried as an unverified claim on an otherwise-verified row.' },
  { id:'jsy-alpinestars-mesa-ls', cat:'jersey', brand:'Alpinestars', model:'Mesa LS', price:55, weight:165,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'Real product (confirmed via Jenson USA + an enduro-mtb.com first-look), but discontinued on alpinestars.com (product page 404s) - likely superseded by the newer A-Dura/A-Impact lineup. Left as an honest unverified sample; no current maker page to verify or correct against.' },
  { id:'jsy-sweetprotection-hunter-ls', cat:'jersey', brand:'Sweet Protection', model:'Hunter LS Jersey', price:60, weight:245,
    sleeve:'long', sizes:['S','M','L','XL'], disciplines:['trail','enduro'],
    desc:'Maker-stated weight (245g) and price ($60 regular) and sizes confirmed via fetched sweetprotection.com/us/en/hunter-longsleeve-jersey-mens-sky-blue/.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.sweetprotection.com/us/en/hunter-longsleeve-jersey-mens-sky-blue/' },
  { id:'jsy-giro-roust-ss', cat:'jersey', brand:'Giro', model:'Roust SS', price:59.95, weight:130,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'CORRECTED 2026-07-17 via bdata-rendered giro.com "Men\'s Roust Jersey" (short-sleeve; the separate'
      + ' "Roust LS Jersey" is the long-sleeve SKU): MSRP is $59.95 (the prior 2026-07-16 search-indexed pass'
      + ' had it wrong at $79.95 - that was a different sale/list read). No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/p/mens-roust-mountain-bike-jersey/350250000400000030.html' },
  { id:'jsy-zoic-amp-ss', cat:'jersey', brand:'Zoic', model:'Amp SS', price:40, weight:135,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-17: only an "Amp Long Sleeve Jersey" was found in web results for zoic.com/Performance Bicycle; no "Amp SS" short-sleeve SKU confirmed, and zoic.com itself rate-limited (429) every fetch attempt this session. Left as an unverified sample rather than guessing at a possibly-retired short-sleeve variant.' },
  { id:'jsy-clubrideapparel-fuze-ss', cat:'jersey', brand:'Club Ride Apparel', model:'Fuze SS', price:65, weight:145,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-18: scraped clubrideapparel.com\'s full men\'s shirt/jersey collection (New West, Go West, Motive, Go Long, Detour, Protocol, Quest, Bamboo Tee, Shaka/Daniel Flannel, X-Wind Jacket) - no "Fuze" jersey/shirt appears; "Fuze" currently names only a short (see clubrideapparel.com/products/fuze-bike-short). Left unverified rather than remove on this evidence alone (may be a retired jersey name, not a fabrication).' },
  { id:'jsy-clubrideapparel-cadence-ls', cat:'jersey', brand:'Club Ride Apparel', model:'Cadence LS', price:70, weight:170,
    sleeve:'long', sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-18: see jsy-clubrideapparel-fuze-ss - "Cadence" is also absent from the current clubrideapparel.com men\'s shirt/jersey lineup. Left unverified.' },
  { id:'jsy-dharco-partyshirt-ss', cat:'jersey', brand:'DHaRCO', model:'Party Shirt SS', price:82, weight:140,
    sleeve:'short', sizes:['S','M','L','XL','XXL','3XL'],
    desc:'DHaRCO\'s signature relaxed-fit short-sleeve jersey (the "Tech Party Shirt" line). Re-fetched us.dharco.com/collections/mens-tech-party-shirt (2026-07-17): $82.00 USD confirmed across every current colorway, sizes S-3XL. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.dharco.com/collections/mens-tech-party-shirt' },
  { id:'jsy-dharco-race-ls', cat:'jersey', brand:'DHaRCO', model:'Race Jersey LS', price:82, weight:175,
    sleeve:'long', sizes:['S','M','L','XL','XXL','3XL'], disciplines:['enduro','dh'],
    desc:'Re-fetched us.dharco.com (Race Jersey Prism, 2026-07-17): $82.00 USD confirmed, sizes S-3XL, 100% recycled polyester FTF fabric. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.dharco.com/products/mens-race-jersey-prism' },
  { id:'jsy-looseriders-cs', cat:'jersey', brand:'Loose Riders', model:'C/S Jersey', price:55, weight:145,
    sleeve:'short', sizes:['S','M','L','XL','XXL'],
    desc:'RE-ATTEMPTED kit-11 (2026-07-21): fetched loose-riders.com/en/technical/jersey-longsleeve/ and .../men/technical/jersey-shortsleeve/ in full (via Exa, WebFetch 403s on this domain) - both current jersey listings (~60+ colorway SKUs, e.g. Ess./Baseline/Shutter/Tribe/Volt/Phase lines at a flat 54,95 EUR tech-jersey tier) contain NO product named "C/S Jersey" or "C/S" anything; a site search for the term returns zero results. The EUR-only-pricing blocker from the 2026-07-18 pass is moot (THE PRICE RULE, formalized 2026-07-18, means price never blocks verification) - the real blocker is that this specific SKU does not appear to currently exist as a jersey (Loose Riders\' "C/S" sub-line is shorts/pants/pads only per sht-looseriders-cs). Left unverified sample, not removed (real product history referenced by third parties, just unconfirmed as a current jersey SKU).' },
  { id:'jsy-yeticycles-turqair-ss', cat:'jersey', brand:'Yeti Cycles', model:'Turq Air Jersey SS', price:120,
    sleeve:'short', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    desc:'RETRY 2026-07-16: fetched yeticycles.com/en-us/gear/mens (the men\'s apparel listing page, not the sold-out product-detail page) - it lists TURQ AIR S/S JERSEY at $120.00 USD, correcting the stale $75 sample. Sizes XS-XXL per the maker. No weight published on either page; omitted rather than guessed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://yeticycles.com/en-us/gear/mens' },
  { id:'jsy-shimano-explorer-ss', cat:'jersey', brand:'Shimano', model:'Explorer SS', price:60, weight:145,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['trail'],
    status:'discontinued',
    desc:'RESOLVED kit-10 (2026-07-21): tagged discontinued. An exact-name men\'s Shimano "Explorer SS Jersey" DID exist - Chain Reaction Cycles carried the "Shimano ACCU-3D MTB Explorer SS Jersey" and Backcountry the "Shimano Explorer Jersey - Short Sleeve - Men\'s", both matching this row\'s name (part of the March-2021 Explorer Collection launch, bikeperfect.com). No Explorer jersey exists on current ride.shimano.com (re-confirmed by the 07-17 sweep), so real-then-dropped, not fabricated. Price/weight left as prior sample (no live maker figure).' },

  /* -- Jersey grind batch 3: iXS / Mons Royale / Chromag / O'Neal (2026-07-14) -- */
  { id:'jsy-ixs-triggerx-ss', cat:'jersey', brand:'iXS', model:'Trigger X Jersey', price:82, weight:140,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['enduro'],
    desc:'Recycled X-Stretch fabric, mesh back, tailored race fit, neck-brace ready. EUR75.90'
      + ' RRP converted to $82 USD sample - no US MSRP page found. Weight not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-trigger-x-jersey-rot-schwarz' },
  { id:'jsy-ixs-triggerxair-ss', cat:'jersey', brand:'iXS', model:'Trigger X Air Jersey', price:82, weight:130,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], disciplines:['enduro','dh'],
    desc:'Form-fitting race cut for enduro/DH racing, mesh back. EUR75.90 RRP converted to $82'
      + ' USD sample - no US MSRP page found. Weight not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-trigger-x-air-jersey-rot-graphit' },
  { id:'jsy-ixs-triggerevo-ls', cat:'jersey', brand:'iXS', model:'Trigger EVO Long Sleeve Jersey', price:97, weight:175,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], disciplines:['enduro'],
    desc:'X-mesh rear panel, silicone rear grip strip, stretch cuffs. EUR89.90 RRP converted to'
      + ' $97 USD sample - no US MSRP page found. Weight not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19',
    source:'https://www.ixs.com/en/products/ixs-trigger-evo-long-sleeve-jersey-anthrazit-schwarz' },
  { id:'jsy-monsroyale-diversion-ss', cat:'jersey', brand:'Mons Royale', model:'Diversion Merino Bike Jersey Short Sleeve', price:129.95,
    sleeve:'short', sizes:['S','M','L','XL','XXL'], fitCut:'mens', verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14',
    source:'https://monsroyale.com/products/diversion-merino-bike-jersey-short-sleeve-black-mens', sourceType:'manufacturer',
    desc:'FETCHED monsroyale.com product page: $129.95 USD, 52% merino/35% recycled polyester/13% nylon, 140gsm FABRIC weight (not a full-garment gram weight, so `weight` is left unset rather than conflated with it).' },
  { id:'jsy-monsroyale-diversion-ls', cat:'jersey', brand:'Mons Royale', model:'Diversion Merino Bike Jersey Long Sleeve', price:139.95,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], fitCut:'mens', disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://monsroyale.com/products/diversion-merino-bike-jersey-long-sleeve-black-mens', sourceType:'manufacturer',
    desc:'FETCHED monsroyale.com product page: $139.95 USD confirmed, sizes S-XXL confirmed. Page states 140gsm FABRIC weight (not a full-garment gram weight, so `weight` is left unset rather than conflated with it, matching the Short Sleeve sibling row).' },
  { id:'jsy-chromag-mission-ls', cat:'jersey', brand:'Chromag', model:'Mission Jersey', price:65, weight:190,
    sleeve:'long', sizes:['S','M','L','XL','XXL'], desc:'3/4-sleeve trail jersey with Polygiene StayFresh antibacterial treatment (modeled here as long-sleeve; the schema\'s sleeve vocab has no 3/4 token). Checked 2026-07-16: us.chromagbikes.com and chromagbikes.com both rate-limited (HTTP 429) on every direct fetch attempt this session, so no manufacturer confirmation was possible. Third-party sources found a spread ($65-68 regular retail per skiessentials.com, a "from $75" collection-page figure per search) - the existing $65 sample sits within that range, so left unchanged rather than guess-adjusted. Retry candidate once the site stops rate-limiting.', lastChecked:'2026-07-16' },
  { id:'jsy-oneal-elementclassic', cat:'jersey', brand:"O'Neal", model:'Element Classic Jersey', price:32.99, weight:264,
    sizes:['S','M','L','XL','XXL','3XL','4XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14',
    source:'https://oneal.com/products/oneal-element-classic-jersey-black-black', sourceType:'manufacturer',
    desc:'FETCHED oneal.com product page: $32.99 USD, "Jersey weight 9.3oz (size L)" = 264g; sleeve length not stated on the page so `sleeve` is left unset rather than guessed.' },
  { id:'jsy-oneal-elementsquadron-ss', cat:'jersey', brand:"O'Neal", model:'Element Squadron Cotton Jersey', price:27.99, weight:230,
    sleeve:'short', sizes:['S','M','L','XL','XXL','3XL'], desc:'Fetched oneal.com: exact price match $27.99 (no discount active). 100% ringspun cotton, tagless neck label, screen-printed graphics confirmed. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://oneal.com/products/oneal-element-hexx-squadron-jersey-black-gray' },
  /* Rapha Trail line (kit-breadth-2, 2026-07-22): brand had ZERO rows anywhere in the
     kit catalog before this wave, despite rapha.cc running a real dedicated MTB "Trail"
     collection alongside its road/gravel lines - a genuine brand gap the brief named
     explicitly. family:'rapha-trail' groups this wave; mfgPn = the maker's own SKU code
     (rapha.cc URLs use it directly, e.g. /product/TTQ01XX). Rapha does not publish
     garment weights on any product page checked this pass - left absent per the kit
     weight policy rather than guessed. */
  { id:'jsy-rapha-trail-34-sleeve', cat:'jersey', brand:'Rapha', model:"Men's Trail 3/4 Sleeve Jersey",
    price:77, family:'rapha-trail', mfgPn:'TTQ01XX',
    sleeve:'long', fitCut:'mens', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.rapha.cc/us/en/product/TTQ01XXPGO',
    desc:'Fetched rapha.cc product page: list USD price $77.00 (site currently runs a $46 sale), sizes XS-XXL. Schema has no 3/4-sleeve token; stored as `sleeve:\'long\'` - the same closest-existing-value convention already used for the Specialized Grom 3/4 jersey row in this file (see jsy-specialized-enduro desc). Weight not published on the page.' },
  { id:'jsy-rapha-trail-tech-tee', cat:'jersey', brand:'Rapha', model:"Men's Trail Technical T-Shirt II",
    price:95, family:'rapha-trail', mfgPn:'TTT04XX',
    sleeve:'short', fitCut:'mens', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.rapha.cc/rd/en/product/TTT04XXDRG',
    desc:'Fetched rapha.cc (regional edition serves GBP; USD $95 list / $71 sale price cross-confirmed via rapha.cc/us catalog listing). New-for-this-season short-sleeve tech tee for trail/enduro riding.' },
  { id:'jsy-rapha-trail-tech-tee-womens', cat:'jersey', brand:'Rapha', model:"Women's Trail Technical T-Shirt",
    price:95, family:'rapha-trail', mfgPn:'TWS01XX',
    sleeve:'short', fitCut:'womens', sizes:['XXS','XS','S','M','L','XL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.rapha.cc/us/en/product/womens-trail-technical-t-shirt/TWS01XXAMCXSM',
    desc:'Fetched rapha.cc product page: list USD price $95.00 confirmed (site currently runs a $57 sale), sizes XXS-XL.' },

  /* -- Shorts (shorts + pants are SEPARATE cats; grind batch 2026-07-14, sht-shorts-grind) -- */
  { id:'sht-fox-flexair', cat:'shorts', brand:'Fox', model:'Flexair Short', price:129.95, weight:250,
    liner:false, sizes:['28','30','32','34','36','38'],
    desc:'CORRECTED 2026-07-17: price is the fetched $129.95 list for the current no-liner "Flexair Short" (was sample $110; an older colorway lists $124.95, sale $99.99, list value used; sourced from the live mountain-bike-shorts category listing). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mountain-bike-shorts/' },
  { id:'sht-troyleedesigns-sprint', cat:'shorts', brand:'Troy Lee Designs', model:'Sprint Short', price:90, weight:300,
    liner:false, sizes:['30','32','34','36','38'],
    desc:'UNVERIFIED - kit-fanout-1a re-check (2026-07-17): fetched troyleedesigns.com/products.json + the "Sprint Short Mono Oak" product page directly. The product is real but every current colorway/size (Oak, Super Aqua, Race Red, Navy, Cement) shows "Sold out - Email when available", and the list (compare-at) price is inconsistent across colorways ($130 for Oak vs $109.99 for the others, likely different production batches) - not a clean single current MSRP to verify against. Left as a sample row, not fabricated, and not marked discontinued (the page says sold out, not discontinued).' },
  { id:'sht-raceface-indy', cat:'shorts', brand:'Race Face', model:'Indy Shorts', price:120,
    sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/indy-shorts-mens',
    desc:'Verified vs fetched raceface.com product page + Shopify JSON: compare_at_price (regular/list price) $120.00 USD, sizes S-XXL confirmed. Corrects price 110->120 and sizes (added XXL); drops the prior liner:true claim - the fetched page describes venting/pockets/back-panel but never mentions a liner or chamois, so it is not asserted (was previously an unsourced guess). No weight published on the page - omitted rather than guessed (was a 320g sample estimate).' },
  { id:'sht-fox-ranger', cat:'shorts', brand:'Fox', model:'Ranger Short', price:99.95, weight:270,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38','40'],
    desc:'CORRECTED 2026-07-17: price is the fetched $99.95 list for the current "Ranger Shorts" (was sample $75; an older colorway lists $89.95, sale $62.99, list value used; sourced from the live mountain-bike-shorts category listing). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mountain-bike-shorts/' },
  { id:'sht-fox-defend', cat:'shorts', brand:'Fox', model:'Defend Short', price:139.95, weight:290,
    liner:false, disciplines:['enduro'], sizes:['28','30','32','34','36','38'],
    desc:'CORRECTED 2026-07-17: price is the fetched $139.95 list for the current "Defend Shorts" (was sample $130; sourced from the live mountain-bike-shorts category listing). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/mountain-bike-shorts/' },
  { id:'sht-troyleedesigns-skyline', cat:'shorts', brand:'Troy Lee Designs', model:'Skyline Trail Short Shell', price:100, weight:280,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://troyleedesigns.com/collections/skyline-shorts',
    desc:'Verified 2026-07-14 vs fetched troyleedesigns.com Skyline Shorts collection: "Skyline Trail Short Shell" $100.00 USD (no-liner shell). Weight is a sample estimate - not published on the page.' },
  { id:'sht-troyleedesigns-skyline-liner', cat:'shorts', brand:'Troy Lee Designs', model:'Skyline Trail Short W/Liner', price:135, weight:330,
    liner:true, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://troyleedesigns.com/collections/skyline-shorts',
    desc:'Verified 2026-07-14 vs fetched troyleedesigns.com Skyline Shorts collection: "Skyline Trail Short W/Liner" $135.00 USD - same shell with a sewn-relationship liner SKU (separate purchasable product from the shell, DATA-ENTRY-TEMPLATE liner-variant convention). Weight is a sample estimate - not published on the page.' },
  { id:'sht-troyleedesigns-flowline-liner', cat:'shorts', brand:'Troy Lee Designs', model:'Flowline Short W/Liner', price:100, weight:310,
    liner:true, disciplines:['trail'], sizes:['28','30','32','34','36','38'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17',
    source:'https://www.troyleedesigns.com/products/sp22-flowline-solid-short-w-liner-gray',
    desc:'Minimalist trail short; TLD sells the Flowline only as a W/Liner SKU (no shell-only variant found). Corrected price ($95 sample -> $99.99 fetched regular price, rounded to $100). Verify pass (kit-fanout-1a, 2026-07-17): re-fetched the product page directly - $99.99 USD regular price confirmed across both current colorways (Gray, Blue), consistent with the prior pass. Both colorways currently show "Sold out - Email when available" (not marked discontinued) - the interface-free apparel bar does not require in-stock status. No weight published (310g is an unverified sample figure).' },
  { id:'sht-troyleedesigns-ruckus', cat:'shorts', brand:'Troy Lee Designs', model:'Ruckus Short', price:140, weight:363,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp25-ruckus-short-shell-mono-steel-blue',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint (Ruckus Short Shell): $140.00 USD compare-at price confirmed, waist sizes 30-38 confirmed (was previously mispriced sample). Per-variant weight sourced from the JSON (363g at 30/32, 408g at 34/36/38) - 363g (waist 32) used as the representative figure.' },
  { id:'sht-100-airmatic', cat:'shorts', brand:'100%', model:'Airmatic Short', price:99, weight:240,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32'],
    desc:'Weight approx, unconfirmed (kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $99, only sizes 28/30/32 currently offered (the 34-38 range is no longer stocked).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/airmatic-shorts-black-1' },
  { id:'sht-100-ridecamp', cat:'shorts', brand:'100%', model:'Ridecamp Short', price:60, weight:230,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38'],
    desc:'RE-CHECKED 2026-07-19 via browser pane (both 100percent.com and 100percent.eu, both'
      + ' WebFetch-walled): the current Ridecamp collection on both sites lists only the SS/LS'
      + ' jersey and the Moto/MTB gloves - no Ridecamp shorts SKU. Appears discontinued. Left'
      + ' unverified, no fields changed.' },
  { id:'sht-100-rcorex', cat:'shorts', brand:'100%', model:'R-Core X Shorts', price:129, weight:280,
    liner:false, disciplines:['enduro','dh'], sizes:['28','30','36','38'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.100percent.com/products/r-core-x-shorts-black-1',
    desc:'Verified 2026-07-14 vs fetched 100percent.com product page: "$129.00" MSRP (page showed a 30%-off sale price), BOA waist closure, 4-way stretch. Sizes shown are the in-stock subset (28/30/36/38); 32/34 likely exist but were sold out on the fetched page - listed only what was confirmed. Weight is a sample estimate - not published on the page.' },
  { id:'sht-endura-mt500burner2', cat:'shorts', brand:'Endura', model:'MT500 Burner Shorts', price:145, weight:310,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','2XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.endurasport.com/en-us/products/mens-mt500-burner-shorts-black-re8124bk',
    desc:'Verified 2026-07-14 vs fetched endurasport.com product page: "$145.00 USD", Clickfast(TM)-compatible liner interface (liner sold separately, not included), 3D molded outer knee protection, sizes S-2XL. Weight is a sample estimate - not published on the page. Id kept as the originally-entered "burner2" (ids are append-only); the fetched page names the current SKU without a "II" suffix.' },
  { id:'sht-endura-singletrack2', cat:'shorts', brand:'Endura', model:'SingleTrack Short II', price:130, weight:290,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mens-singletrack-shorts-black-re8102bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "$130.00 USD" (was sampled at $90, corrected), sizes S-2XL. Id kept as the originally-entered "singletrack2" (ids are append-only, matching the sht-endura-mt500burner2 precedent); the fetched page names the current SKU "Men\'s SingleTrack Shorts" without a "II" suffix. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure, not per-garment.' },
  { id:'sht-raceface-trigger', cat:'shorts', brand:'Race Face', model:'Trigger Shorts', price:102,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/trigger-shorts',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $102.00 USD, sizes S-XXL confirmed. Corrects price 90->102. No weight published on the page - omitted rather than guessed (was a 300g sample estimate).' },
  { id:'sht-specialized-trailair', cat:'shorts', brand:'Specialized', model:'Trail Air Short', price:129.99, weight:270,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38','40','42','44'],
    desc:'VaporRize woven fabric, 13.5in inseam (size 34), does not include a liner. $129.99 MSRP'
      + ' RE-CONFIRMED live 2026-07-19 as "Men\'s Trail Air Shorts" (currently on $39.99 sale,'
      + ' MSRP-basis kept). Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/search?q=trail%20air%20short' },
  { id:'sht-specialized-enduro', cat:'shorts', brand:'Specialized', model:'Enduro Short', price:110, weight:310,
    liner:false, disciplines:['enduro'], sizes:['28','30','32','34','36','38'],
    desc:'RE-CHECKED 2026-07-19 via browser-rendered site search (specialized.com/us/en 403s'
      + ' WebFetch): "enduro grom"/"enduro" apparel searches return zero results - the whole'
      + ' Enduro apparel sub-line (jerseys, shorts) has been discontinued and replaced by the'
      + ' Trail/Gravity/Traction lines. Left unverified, no fields changed.' },
  { id:'sht-leatt-mtbenduro3', cat:'shorts', brand:'Leatt', model:'MTB Enduro 3.0 Short', price:64.99,
    liner:false, disciplines:['enduro'], sizes:['XS','S','M','L','XL','XXL'], status:'discontinued',
    desc:'CORRECTED 2026-07-16: fetched us.leatt.com prices Shorts MTB Enduro 3.0 at $64.99, sizes XS-XXL, tagged Obsolete. No weight published there, omitted rather than guessed. Re-confirmed via .js product JSON (price 6499 cents, compare_at 9999, obsolete flag set).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/shorts-mtb-enduro-3-0-sale' },
  { id:'sht-leatt-mtballmtn2', cat:'shorts', brand:'Leatt', model:'MTB AllMtn 2.0 Short', price:48.99, weight:270,
    liner:false, disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL','3XL'],
    desc:'RE-CHECKED 2026-07-19: the V21 clearance SKU fetched 2026-07-16 ($47.99, tagged'
      + ' Obsolete) has been superseded by a V23 refresh - "Shorts MTB All Mountain 2.0 V23" is'
      + ' CURRENT and live on us.leatt.com\'s MTB Shorts collection at $48.99 (was $89.99),'
      + ' matching this row within a rounding error. Status upgraded from discontinued: the'
      + ' All Mountain 2.0 line itself is not gone, just refreshed. Weight not published, stays'
      + ' sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://us.leatt.com/collections/mtb-shorts' },
  { id:'sht-dakine-syncline', cat:'shorts', brand:'Dakine', model:'Syncline 13" Bike Short', price:80, weight:260,
    liner:false, disciplines:['trail'], sizes:['XS','S','M','L','XL'], fitCut:'womens',
    desc:'RESOLVED+RETARGETED grind-3 (2026-07-16): the flagged men\'s Syncline Short row had no current SKU; retargeted to the real, currently-sold women\'s Syncline 13" Bike Short via its Shopify .js product JSON ($80 confirmed across all sizes/colorways; Dakine does not publish a per-variant weight for this SKU, so weight stays the prior sample figure). VERIFIED 2026-07-17: re-fetched dakine.com/products/syncline-13-inch-bike-short-womens.js, $80 (Black/Galactic Blue) confirmed, sizes XS-XL confirmed. Weight stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.dakine.com/products/syncline-13-inch-bike-short-womens' },
  { id:'sht-dakine-thrillium', cat:'shorts', brand:'Dakine', model:'Thrillium Bike Short', price:130, weight:280,
    liner:false, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'], fitCut:'womens',
    desc:'RESOLVED+RETARGETED grind-3 (2026-07-16): the flagged men\'s Thrillium Short row had no current SKU; retargeted to the real, currently-sold women\'s Thrillium Bike Short via its Shopify .js product JSON (current price $130; an older "S21" colorway sits at $120 but is sold out/inactive). No per-variant weight published, so weight stays the prior sample figure. VERIFIED 2026-07-17: re-fetched dakine.com/products/thrillium-bike-short-womens.js, current Black variant $130 confirmed (S21 $120 variant confirmed out of stock), sizes XS-XL confirmed. Weight stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.dakine.com/products/thrillium-bike-short-womens' },
  { id:'sht-ion-traze', cat:'shorts', brand:'ION', model:'Traze Short', price:90, weight:290,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-18: same ion-products.com multi-generation SKU proliferation as the jersey cluster (see jsy-ion-scrub-amp) makes an exact price match unreliable to pin. Left unverified.' },
  { id:'sht-ion-scrubamp', cat:'shorts', brand:'ION', model:'Scrub AMP Short', price:80, weight:270,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-18: see sht-ion-traze - same SKU-proliferation issue. Left unverified.' },
  { id:'sht-pnw-loam', cat:'shorts', brand:'PNW', model:'Shuttle Short', price:99, weight:270,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    desc:'CORRECTED 2026-07-16: PNW sells no product called "Loam Shorts" - their apparel short'
      + ' is the Shuttle Short ($99, fetched pnwcomponents.com/pages/shuttle-short); model/price'
      + ' fixed here (id kept per append-only policy). Weight not published by PNW and sizes not'
      + ' confirmed against the maker page - both stay sample/approx, row left unverified.' },
  { id:'sht-pearlizumi-summit', cat:'shorts', brand:'Pearl Izumi', model:'Summit Shell Shorts', price:115, weight:280,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38','40','42','44'],
    verified:true, priceBasis:'msrp-confirmed',
    desc:'Model name and price corrected 2026-07-16: fetched pearlizumi.com/products/mens-summit-shell-shorts-19112405 - the maker\'s current name for this no-chamois short is "Summit Shell Shorts" (this row previously said just "Summit Shorts"), and the page lists $115.00 (older third-party reviews cite $100, an out-of-date figure superseded by the fetched current listing). "Designed without a chamois pad" confirms liner:false; sizes corrected to the maker\'s full 28-44 range. RE-CONFIRMED 2026-07-17 via bdata re-fetch of the .js product JSON: price_max/compare_at_price both $115.00 (matches). Weight kept as the prior sample - the JSON exposes a flat 82g figure identical across every size/color, a shipping-weight placeholder implausible for a short (real MTB shorts run 250-350g), not a measured spec.', lastChecked:'2026-07-17', source:'https://www.pearlizumi.com/products/mens-summit-shell-shorts-19112405' },
  { id:'sht-patagonia-dirtroamer', cat:'shorts', brand:'Patagonia', model:'Dirt Roamer Shorts', price:129, weight:300,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38'],
    desc:'CORRECTED 2026-07-16: US MSRP is $129 (was sample $99) - patagonia.com/product/'
      + 'mens-dirt-roamer-mountain-bike-shorts/24723.html is consistently indexed at $129, but'
      + ' the site 404s on every WebFetch attempt (bot-blocked, matches the catalog’s prior'
      + ' Patagonia/Specialized fetch-wall notes), so this stays a search-confirmed correction,'
      + ' not a fetched verification; weight stays sample.' },
  { id:'sht-dakine-vectra', cat:'shorts', brand:'Dakine', model:'Vectra Short', price:90, weight:290,
    liner:false, disciplines:['enduro'], sizes:['28','30','32','34','36','38'], status:'discontinued',
    desc:'Gravity-oriented all-mountain short; 92% nylon/8% spandex 165g bluesign-approved fabric, 13.5" inseam (confirmed via product page). RESOLVED grind-3 (2026-07-16): a dakine.com site search for "vectra" now returns only Vectra 2.0 gloves (men\'s and women\'s) - the Vectra Short line is gone with no successor short under that name. Marked discontinued rather than removed.' },
  { id:'sht-ion-seekamp', cat:'shorts', brand:'ION', model:'Seek Amp Short', price:110, weight:300,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Surf-inspired freeride short; 4-way-stretch softshell, Boardshorts Closure 2.0 waist. ATTEMPTED 2026-07-18: same ion-products.com SKU-proliferation issue as the rest of the ION cluster (see jsy-ion-scrub-amp) - left unverified.' },

  /* -- Shorts batch 2 (grind continuation, 2026-07-14): new brands + deeper per-brand coverage -- */
  { id:'sht-poc-motion-womens', cat:'shorts', brand:'POC', model:'Women\'s Motion Shorts', price:120, weight:180,
    liner:false, sizes:['XS','S','M','L','XL'], fitCut:'womens', disciplines:['trail'],
    desc:'Fetched poc.com (2026-07-17, en-us/product/ws-motion-shorts-granite-grey): confirmed price $120 MSRP (currently on a $90 sale, not used here) and added weight 180g (size M, maker-stated).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://poc.com/en-us/product/ws-motion-shorts-granite-grey' },
  { id:'sht-poc-essentialenduro', cat:'shorts', brand:'POC', model:'Essential Enduro Shorts', price:120, weight:178,
    liner:false, disciplines:['enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'"Rider tuned fit for seamless integration with knee pads." Fetched poc.com directly this pass: corrected price $100 -> $120, weight 280g -> 178g (maker-stated, size M), and sizes to the full XS-XXL run.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/essential-enduro-shorts-uranium-black' },
  { id:'sht-poc-resistanceultra', cat:'shorts', brand:'POC', model:'Resistance Ultra MTB Shorts', price:150,
    liner:false, disciplines:['enduro'], sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://poc.com/en-us/product/resistance-ultra-shorts-uranium-black',
    desc:'Fetched poc.com: price $150 confirmed exactly, sizes corrected to the full XS-XXL run. No weight published on the maker page, omitted rather than guessed.' },
  { id:'sht-poc-infinite', cat:'shorts', brand:'POC', model:'Infinite All-mountain MTB Shorts', price:160, weight:250,
    liner:false, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Fetched poc.com: price $160 confirmed (regular MSRP; page showed a 40%-off $96 sale price), weight 300g -> 250g (maker-stated, size M), sizes to the full XS-XXL run.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/ms-infinite-all-mountain-shorts-uranium-black' },
  { id:'sht-alpinestars-drop6', cat:'shorts', brand:'Alpinestars', model:'Drop 6.0 Shorts', price:109.95, weight:290,
    liner:false, disciplines:['enduro'], sizes:['28','30','32','34','36','38','40'],
    desc:'Weight is an approx sample figure - alpinestars.com does not publish a weight or state liner'
      + ' presence. RE-CORRECTED 2026-07-16 via the .js JSON endpoint for alpinestars.com/products/drop-6-shorts:'
      + ' MSRP (compare_at_price) is $109.95, not the $99.95 a prior same-day pass entered (that page is'
      + ' currently on sale at $87.96, likely the source of the earlier mismatched figure); sizes 28-40'
      + ' confirmed unchanged. VERIFIED 2026-07-17: re-fetched the maker page, $109.95 MSRP and sizes'
      + ' 28-40 confirmed again. Weight stays a nominal sample (maker publishes no weight for apparel; kit'
      + ' verification does not block on weight).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/drop-6-shorts' },
  { id:'sht-alpinestars-dropalgorithm', cat:'shorts', brand:'Alpinestars', model:'Drop Algorithm Shorts', price:119.95, weight:310,
    liner:false, disciplines:['enduro'], sizes:['28','30','32','34','36','38','40'],
    desc:'Weight is an approx sample figure - alpinestars.com does not publish a weight or state liner presence.'
      + ' Price+sizes corrected against the fetched maker page (was $130, sizes stopped at 38). VERIFIED'
      + ' 2026-07-17: re-fetched, regular MSRP $119.95 confirmed (page currently shows a 40%-off $71.97 sale'
      + ' price - MSRP used per policy), sizes 28-40 confirmed. Weight stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/drop-algorithm-shorts' },
  { id:'sht-royalracing-impact', cat:'shorts', brand:'Royal Racing', model:'Impact Shorts', price:90, weight:280,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    status:'discontinued',
    desc:'RESOLVED kit-10 (2026-07-21): tagged discontinued. The Impact short was a real, multi-year staple of the Royal catalog (Vital MTB covered the 2017 AND 2018 model years plus a "First Ride: 2018 Royal Racing Core, Impact, and Drift" feature; BTO Sports explicitly lists it "discontinued by the manufacturer"; Jenson/Amazon listings persist). Fresh fetch of royalracing.com\'s Shorts & Pants collection confirms only Apex Pants (+ gloves/accessories) remain - no shorts of any kind in the current line. Price/weight left as prior sample.' },
  /* RETIRED kit-10 (2026-07-21): sht-royalracing-apex - FABRICATED. The Apex line has
     been PANTS-only in every source found (current royalracing.com collection, the
     off-road.cc "Apex Race Pants" review era, retailer sweeps); Royal's historical
     shorts lines are Race/Impact/Core/Drift/Matrix/Turbulence - never Apex. Plain
     tombstone, no KIT_ALIASES entry (no real "Apex Shorts" to retarget to). See
     tools/verify-notes-kit.md "Kit Wave 10". */
  { id:'sht-zoic-ether-liner', cat:'shorts', brand:'Zoic', model:'Ether Shorts + Essential Liner', price:95, weight:320,
    liner:true, disciplines:['trail'], sizes:['S','M','L','XL','XXL','XXXL'],
    desc:'Ripstop nylon outer + removable ZO-Tech chamois liner; sold as a shell+liner bundle. ATTEMPTED 2026-07-17: zoic.com rate-limited (429) every direct fetch this session; a collection-page banner cited a $38 sale price (not a reliable MSRP figure). Left unverified rather than using an unconfirmed sale price.' },
  { id:'sht-zoic-blackmarket-liner', cat:'shorts', brand:'Zoic', model:'Guide Shorts + Liner', price:116, weight:454,
    liner:true, disciplines:['trail'], sizes:['S','M','L','XL','XXL','XXXL'],
    desc:'CORRECTED 2026-07-16: Zoic renamed the Black Market line to "Guide" (search-indexed'
      + ' pages state the Guide Shorts were formerly the Black Market). RE-VERIFIED kit-13'
      + ' (2026-07-21): directly fetched zoic.com/products/guide-shorts-essential-liner via'
      + ' browser pane (WebFetch 429-rate-limited this session) - confirms $116.00 regular price,'
      + ' sizes S/M/L/XL/2X/3X, belted elastic waistband + hand & zippered pockets + fusion inseam'
      + ' gusset, available in 9"/11.5" inseams; weight 454g cross-checked against zoic.com/products.json.'
      + ' Model text updated to the current name (id kept append-only per convention). Currently'
      + ' shown "Selection Sold Out" for the fetched color/size combo but the product itself is'
      + ' live-for-sale at this MSRP, not discontinued.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://www.zoic.com/products/guide-shorts-essential-liner' },
  { id:'sht-7mesh-glidepath', cat:'shorts', brand:'7mesh', model:'Glidepath Short', price:102,
    liner:false, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Enduro/all-mountain short built for knee-pad compatibility; tapered pre-articulated leg. Re-fetched 7mesh.com (en-US) 2026-07-20: 14in Glidepath Short still $102-170 by colorway and alpha sizing XS-XXL (not numeric waist), matching the 2026-07-16 pass exactly. No weight published; omitted rather than guessed (kit weight policy: never blocks verification).',
    source:'https://7mesh.com/en-US/products/glidepath-bike-short' },
  { id:'sht-7mesh-slabenduro', cat:'shorts', brand:'7mesh', model:'Slab Enduro Short', price:70,
    liner:false, disciplines:['enduro'], sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'No "Slab Enduro Short" exists on 7mesh.com - the real, current product is the "Slab Short" ($70-84 by colorway), whose own copy calls it "an updated version of our light and agile enduro trail short" (likely the source of the catalog\'s "Enduro" naming). Price + alpha sizing (XS-XXL) corrected to match; model name left as-is (append-only id, but flagged here as effectively "Slab Short"). Re-fetched 2026-07-20: same $70-84 range, sizes, and product identity confirmed. No weight published; omitted rather than guessed.',
    source:'https://7mesh.com/en-US/products/mens-slab-bike-short' },
  { id:'sht-7mesh-farside', cat:'shorts', brand:'7mesh', model:'Farside Short', price:96,
    liner:false, disciplines:['trail','xc'], sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Surface-adaptable summer short, lighter/trimmer fit than Glidepath. Re-fetched 7mesh.com (en-US) 2026-07-20: 9in Farside Short still $96-120 by colorway and alpha sizing XS-XXL, matching the 2026-07-16 pass. No weight published; omitted rather than guessed.',
    source:'https://7mesh.com/en-US/products/mens-farside-short-9-in' },
  { id:'sht-sombrio-ridgeline', cat:'shorts', brand:'Sombrio', model:'Ridgeline Short', price:65, weight:270,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'Price is a USD estimate converted from the CAD retail price on Sombrio\'s own site; left unverified. Checked 2026-07-16: no live Sombrio maker storefront remains to re-verify against (see jsy-sombrio-badass-ls for detail).' },
  { id:'sht-sombrio-cambie2', cat:'shorts', brand:'Sombrio', model:'Cambie 2 Short', price:70, weight:280,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'Checked 2026-07-16: no live Sombrio maker storefront (see jsy-sombrio-badass-ls for detail). Left unchanged as an unverified sample.' },
  { id:'sht-giro-havoc', cat:'shorts', brand:'Giro', model:'Havoc Short', price:149.95, weight:300,
    liner:false, disciplines:['enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com "Men\'s Havoc Short": MSRP $149.95 confirmed (page'
      + ' showed a discounted $104.99 sale price). Durablend 4-way-stretch fabric, kneepad-compatible gusseted'
      + ' inseam, built for enduro. No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/men%27s-havoc-short/350250001000000031.html' },
  { id:'sht-fasthouse-crossline2', cat:'shorts', brand:'Fasthouse', model:'Crossline 2.0 Short', price:100, weight:260,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38','40','42'],
    desc:'Re-fetched fasthouse.com/products/crossline-2-short-black kit-11 (2026-07-21, via Exa - direct WebFetch 429\'d): $100 USD and sizes 28-42 reconfirmed exactly matching the 2026-07-16 pass. Shell only (no liner/chamois), 88% Polyester/7% Polyamide/5% Spandex COOLMAX fabric, 12" inseam. Weight not published - stays a sample per the kit-apparel weight-exemption policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://www.fasthouse.com/products/crossline-2-short-black' },
  { id:'sht-nukeproof-blackline-liner', cat:'shorts', brand:'Nukeproof', model:'Blackline Shorts With Liner', price:90, weight:310,
    liner:true, disciplines:['enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Price is a USD estimate converted from the GBP retail price (~GBP70) on Nukeproof\'s own site; left unverified. Cordura-reinforced 4-way-stretch fabric; a short-length version of the Nukeproof pants developed with Sam Hill.' },
  { id:'sht-nukeproof-outland', cat:'shorts', brand:'Nukeproof', model:'Outland Shorts', price:65, weight:270,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'Casual trail short (100% polyester, DriRelease); price is a USD estimate converted from GBP50.'
      + ' CHECKED kit-13 (2026-07-21): nukeproof.com/search/suggest.json?q=outland returns zero'
      + ' matching products (empty resources block), and the direct product-slug URLs'
      + ' (/products/outland-shorts, /products/outland-youth-liner-short) both 404. The entire'
      + ' Outland ridewear line appears removed from the current site. Left unverified, no fields changed.' },
  { id:'sht-nukeproof-outlandtech', cat:'shorts', brand:'Nukeproof', model:'Outland Tech Shorts', price:85, weight:290,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'Cordura-nylon step up from the base Outland short; price is a USD estimate converted from GBP65.'
      + ' CHECKED kit-13 (2026-07-21): see sht-nukeproof-outland - the whole Outland line is absent'
      + ' from nukeproof.com\'s current site-search (zero results) and product-slug guesses 404.'
      + ' Left unverified, no fields changed.' },
  { id:'sht-sweetprotection-hunter', cat:'shorts', brand:'Sweet Protection', model:'Hunter Shorts II', price:129, weight:246,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Retargeted from the discontinued "Hunter Shorts" name to the current "Hunter Shorts II" SKU. Maker-stated weight (246g) confirmed; price is EUR129 converted at ~1.08 USD/EUR (no USD price shown on the EU page).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-16', source:'https://www.sweetprotection.com/eu/en/hunter-shorts-ii-mens-black/' },
  { id:'sht-sweetprotection-hunterenduro', cat:'shorts', brand:'Sweet Protection', model:'Hunter Enduro Shorts', price:140, weight:310,
    liner:false, disciplines:['enduro','dh'],
    status:'discontinued',
    desc:'RESOLVED kit-10 (2026-07-21): tagged discontinued. The men\'s Hunter Enduro Shorts was a real product - Blister reviewed it ("Sweet Protection Hunter Enduro Shorts and Chikamin Jersey"), feedthehabit.com reviewed it, and evo still lists it in its outlet - but sweetprotection.com\'s current men\'s line is Hunter Shorts II / Hunter Light / Hunter Slashed (only the womens Hunter Enduro survives on the maker site, per the 07-16 sweep). Closest live successor is the Hunter Shorts II already covered by sht-sweetprotection-hunter2. Price/weight left as prior sample.' },
  { id:'sht-ixs-carveevo', cat:'shorts', brand:'iXS', model:'Carve Evo Shorts', price:108, weight:290,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Recycled X-stretch fabric, silicone anti-slip print at rear, kneepad-compatible,'
      + ' adjustable high waist. EUR99.90 RRP converted to $108 USD sample - no US MSRP page'
      + ' found. Weight not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-carve-evo-shorts-charcoal' },
  { id:'sht-ixs-carve1', cat:'shorts', brand:'iXS', model:'Carve 1.0 Shorts', price:161, weight:300,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Updated comfort-led cut, removable elastic belt, rear phone pocket, lift-card leg'
      + ' pocket. EUR149.00 RRP converted to $161 USD sample - no US MSRP page found. Weight'
      + ' not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/carve-1-0-shorts-schwarz' },
  { id:'sht-ixs-trigger', cat:'shorts', brand:'iXS', model:'Trigger Shorts', price:129, weight:310,
    liner:false, disciplines:['enduro','dh'],
    desc:'Stretch ventilation inserts, 2 zippered pockets, tailored race-performance fit.'
      + ' EUR119.00 RRP converted to $129 USD sample - no US MSRP page found.'
      + ' Light moisture-wicking x-stretch fabric aimed at enduro racers/downhillers. Weight not'
      + ' published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-trigger-shorts-marine-lime' },
  { id:'sht-scott-trailvertic-pad', cat:'shorts', brand:'Scott', model:'Trail Vertic Shorts w/Pad', price:90, weight:300,
    liner:true, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'"w/Pad" = a removable inner padded short bundled with the outer shell (Scott\'s liner convention). ATTEMPTED 2026-07-17: scott-sports.com is JS-rendered for US product pages (search + direct /us/en/product/ slugs both returned no content via WebFetch/Exa); left unverified.' },
  { id:'sht-scott-trailverticpro-pad', cat:'shorts', brand:'Scott', model:'Trail Vertic Pro Shorts w/Pad', price:120, weight:310,
    liner:true, disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'],
    desc:'Pro tier: adds a waist adjuster, side-seam venting and a glove pocket over the base Trail Vertic. ATTEMPTED 2026-07-17: scott-sports.com JS-walled for US product pages (see sht-scott-trailvertic-pad); left unverified.' },
  { id:'sht-handup-atplus', cat:'shorts', brand:'Handup', model:'A.T. Plus Shorts', price:49, weight:270,
    liner:false, disciplines:['trail'], sizes:['26','28','30','32','34','36','38','40'],
    desc:'Re-fetched handupco.com/products/a-t-plus-short-charcoal-grey kit-11 (2026-07-21): $49.00 USD, sizes 26-40 (waist 29"-43"), no liner/chamois - all reconfirmed exactly matching the prior 2026-07-16 fetch. 90% Nylon/10% Spandex, 9" inseam, four-way stretch. No weight published - stays a sample per the kit-apparel weight-exemption policy (weight never blocks apparel verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://www.handupco.com/products/a-t-plus-short-charcoal-grey' },
  { id:'sht-dharco-gravity', cat:'shorts', brand:'DHaRCO', model:'Gravity Shorts', price:107, weight:300,
    liner:false, disciplines:['enduro','dh'], sizes:['S','M','L','XL','2XL','3XL'],
    desc:'Fetched us.dharco.com (the US-region storefront) 2026-07-16: DIRECTLY-confirmed USD MSRP $107.00 (superseding an earlier AUD-converted estimate). Standard Fit, "relatively long" per the maker\'s own fit guide (kneepad-gap coverage), Blue Sign approved fabric, no built-in liner/chamois. RE-CONFIRMED kit-11 (2026-07-21, us.dharco.com 429\'d this session so cross-checked via dharco.com/products/mens-mtb-gravity-shorts-black - AUD-region page, same product, sizes S-3XL match exactly, no liner mentioned). Weight not published on either regional page, stays a sample per the kit-apparel weight-exemption policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.dharco.com/products/mens-mtb-gravity-shorts-black' },

  /* -- Shorts batch 3 (grind continuation, 2026-07-14): more brands -- */
  { id:'sht-monsroyale-momentum2', cat:'shorts', brand:'Mons Royale', model:'Momentum 2.0 Bike Shorts', price:130, weight:280, status:'discontinued',
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Merino-lined all-condition trail short; durable micro-grid outer. CHECKED 2026-07-18: fetched us.monsroyale.com\'s men\'s and women\'s bike-clothing collections - "Momentum" is entirely absent from the current lineup, which is now built around the "Diversion" range (Diversion Merino Trail Shorts, $179.95, is the current bike short). Flagged discontinued; price/weight left as prior sample.' },
  { id:'sht-monsroyale-virage', cat:'shorts', brand:'Mons Royale', model:'Virage Bike Shorts', price:110, weight:250, status:'discontinued',
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'Lightweight trail short; recycled-PET outer + anti-odour merino wool. CHECKED 2026-07-18: same finding as sht-monsroyale-momentum2 - "Virage" is absent from monsroyale.com\'s current bike collections, replaced by the Diversion range. Flagged discontinued; price/weight left as prior sample.' },
  { id:'sht-yeticycles-freeland', cat:'shorts', brand:'Yeti Cycles', model:'Freeland Short', price:140,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'RETRY 2026-07-16: fetched yeticycles.com/en-us/gear/mens (listing page) - FREELAND SHORT lists at $140.00 USD, correcting the stale $115 sample. No weight published; omitted rather than guessed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://yeticycles.com/en-us/gear/mens' },
  { id:'sht-yeticycles-enduro', cat:'shorts', brand:'Yeti Cycles', model:'Enduro Short', price:150,
    liner:false, disciplines:['enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Race-team short (Yeti/Fox Factory) built for lightweight, full-day durability; 13in inseam, 88% recycled nylon/12% spandex. RETRY 2026-07-16: fetched yeticycles.com/en-us/gear/mens (listing page, not the sold-out product-detail page) - ENDURO SHORT lists at $150.00 USD, correcting the stale $130 sample. No weight published; omitted rather than guessed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://yeticycles.com/en-us/gear/mens' },
  { id:'sht-looseriders-cs', cat:'shorts', brand:'Loose Riders', model:'C/S Shorts', price:100, weight:290,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'"Cult of Shred" short: three sealed-zip water-resistant pockets, embedded-vinyl waistband grip. RE-ATTEMPTED kit-11 (2026-07-21): confirmed via WebSearch that Loose Riders currently sells several C/S-line shorts under distinct names (C/S Evo, C/S Light Shorts, C/S Cargo, C/S Casual) at loose-riders.com/en/men/technical/pants-o-shorts/ - so the C/S concept is real and current, but the exact product page (tried .../cos-evo-black~6423/) returned HTTP 403 on WebFetch and the browser pane stalled on the site\'s cookie-consent overlay before rendering price/weight, so which specific C/S variant (and its exact price) matches this row\'s generic "C/S Shorts" naming/$100 sample could not be confirmed this session. EUR-only pricing itself would not block verification (THE PRICE RULE) once a page is actually read. Left unverified sample, not force-matched to a specific variant per the ION-cluster SKU-ambiguity precedent.' },
  { id:'sht-cube-cmpttrail', cat:'shorts', brand:'Cube', model:'CMPT Trail Shorts', price:54, weight:270,
    liner:false, disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL','XXXL'],
    desc:'Re-fetched cube.eu/de-de/cube-trail-short-cmpt/12598 kit-12 (2026-07-21): EUR49.95 UVP reconfirmed (no USD MSRP available, Cube sells apparel only through EU/UK sites - USD figure here is a converted ESTIMATE, basis disclosed per THE PRICE RULE, price never blocks verification). 100% polyester shell, two zip pockets, elastic waist confirmed; sizes XS-XXXL reconfirmed exactly. Page publishes no weight - stays a sample per the kit-apparel weight-exemption policy.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-21', source:'https://www.cube.eu/de-de/cube-trail-short-cmpt/12598' },
  { id:'sht-cube-cmpttmtrail', cat:'shorts', brand:'Cube', model:'CMPT TM Trail Shorts', price:54, weight:290,
    liner:false, disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL','XXXL'],
    desc:'Re-fetched cube.eu/de-de/cube-trail-short-cmpt-tm/11151 kit-12 (2026-07-21): EUR49.95 UVP reconfirmed - the SAME maker list price as the base CMPT Trail Short above (a retailer page had shown a higher EUR59.95 "regular" price for the TM, but the maker\'s own page confirms both trims share one MSRP). USD figure is a converted ESTIMATE, basis disclosed per THE PRICE RULE (price never blocks verification). 100% polyester confirmed; sizes XS-XXXL reconfirmed exactly. Page publishes no weight - stays a sample per the kit-apparel weight-exemption policy.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-21', source:'https://www.cube.eu/de-de/cube-trail-short-cmpt-tm/11151' },
  { id:'sht-rapha-trail-mens', cat:'shorts', brand:'Rapha', model:"Men's Trail Shorts",
    price:165, family:'rapha-trail', mfgPn:'TOS01XX', liner:false,
    fitCut:'mens', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.rapha.cc/us/en_US/shop/mens-trail-shorts/product/TOS01XX',
    desc:'Fetched rapha.cc product page: list USD price $165.00 confirmed (site currently runs a $99 sale), sizes XS-XXL. Fully featured trail short with a contoured, variable-width belt; no integrated liner (liner sold as a separate Trail Liner short in this same line). No weight published.' },
  { id:'sht-rapha-trail-womens', cat:'shorts', brand:'Rapha', model:"Women's Trail Shorts",
    price:160, family:'rapha-trail', mfgPn:'OSW01XX', liner:false,
    fitCut:'womens', sizes:['XXS','XS','S','M','L','XL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.rapha.cc/US/en_US/shop/womens-trail-shorts/product/OSW01XXPSUXSM',
    desc:'Fetched rapha.cc product page: USD price $160.00 (no sale active at check time), sizes XXS-XL. Low-profile stretch waist, two zippered side pockets with integrated phone sleeves. No weight published.' },

  /* -- Pants (MTB pants only; shorts are a separate cat above) -- */
  { id:'pnt-fox-defend', cat:'pants', brand:'Fox', model:'Defend Pant', price:169.95, weight:430,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    desc:'CORRECTED 2026-07-17: price is the fetched $169.95-189.95 list range, base size $169.95 (was sample $150). No weight published on the fetched page, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/defend-pants/32372.html' },
  { id:'pnt-troyleedesigns-sprint', cat:'pants', brand:'Troy Lee Designs', model:'Sprint Pant', price:165, weight:454,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','31','32','33','34','36','38','40'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp23-sprint-pant-mono-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $165.00 USD regular/compare-at price confirmed, waist sizes 28-40 confirmed. Per-variant weight sourced from the JSON (454g at 28-32/34, 499g at 33/36/38, 544g at 40) - 454g (waist 32) used as the representative figure.' },
  { id:'pnt-raceface-ruxton', cat:'pants', brand:'Race Face', model:'Ruxton Pant', price:140, weight:410,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'UNVERIFIED - a 2026-07-16 check of raceface.com/collections/bottoms (full current shorts+pants list fetched) found only "Ruxton Shorts", no "Ruxton Pant"/"Ruxton Pants" currently sold; Conspiracy Pants is the only current pants SKU on the site. Left as a sample row, not fabricated, and not marked discontinued on this weak evidence alone.' },
  { id:'pnt-100-airmatic', cat:'pants', brand:'100%', model:'Airmatic Pant', price:119, weight:400,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    desc:'Weight approx, unconfirmed (kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $119, sizes 28-38 unchanged.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/airmatic-pants-black' },
  { id:'pnt-endura-mt500-burner', cat:'pants', brand:'Endura', model:'MT500 Burner Pant', price:170, weight:460,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mens-mt500-burner-pants-black-re8113bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Men\'s MT500 Burner Pants", "$170.00 USD" (already matched the sample), sizes S-2XL. Waterproof/breathable shell with reinforced knee panels. Weight kept as the prior sample estimate - the page/Shopify JSON exposes a flat 490g figure identical across every size, a shipping-weight placeholder.' },
  { id:'pnt-endura-hummvee', cat:'pants', brand:'Endura', model:'Hummvee Pant', price:130, weight:390,
    liner:true, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mens-hummvee-trousers-black-re8127bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Men\'s Hummvee Trousers", "$130.00 USD" (was sampled at $100, corrected), ships with a removable liner short, sizes S-2XL. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'pnt-specialized-trail', cat:'pants', brand:'Specialized', model:'Trail Pant', price:134.99, weight:380,
    liner:false, disciplines:['trail'], sizes:['24','26','28','30','32','34','36','38','40','42','44'],
    desc:'VaporRize woven fabric, laser perforated venting, no liner. $134.99 MSRP RE-CONFIRMED'
      + ' live 2026-07-19 as "Trail Pants" (currently on $119.99 sale, MSRP-basis kept). Weight'
      + ' not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/search?q=trail%20pant' },
  { id:'pnt-specialized-traction-womens', cat:'pants', brand:'Specialized', model:"Women's Traction Pant", price:149.99,
    liner:false, fitCut:'womens', disciplines:['trail','enduro'], sizes:['XXS','XS','S','M','L','XL','XXL'],
    desc:'kit-breadth-3 (2026-07-22): its own women\'s-specific line, not a Trail Pant recolor -'
      + ' Specialized\'s copy: "takes everything that made our iconic Demo Pants legendary - and'
      + ' makes it better," developed with input from women riders, own fabric (88% recycled'
      + ' polyester/12% spandex) and its own size run (XXS-XXL). No weight published on the page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.specialized.com/us/en/womens-traction-pant/p/1000195134' },
  { id:'pnt-leatt-trail-2-womens', cat:'pants', brand:'Leatt', model:'MTB Trail 2.0 Pant - Women', price:129,
    liner:true, fitCut:'womens', disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'kit-breadth-3 (2026-07-22): genuinely distinct from the men\'s Trail 2.0 (pnt-leatt-trail-2)'
      + ' - Leatt\'s own copy: a removable liner with a "dual high-density BERENIS chamois'
      + ' specifically designed for women" and "design and ergonomics specific to ladies," not a'
      + ' recolored men\'s cut. List $129.00 (currently on a $83.85 sale, list used per policy). No'
      + ' weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/pant-mtb-trail-20-women-sale' },
  { id:'pnt-leatt-mtb-trail-3', cat:'pants', brand:'Leatt', model:'MTB Trail 3.0 Pant', price:131,
    liner:true, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'CORRECTED 2026-07-16: fetched us.leatt.com matches this to the current (non-Obsolete) "Pants MTB Trail 3.0 Liner" - $131-134 by colorway, sizes XS-XXL, and it ships with a removable chamois liner short (liner false->true). No trustworthy weight published (only an XS-only 360g figure that repeats identically across unrelated pant models, smelling like a Shopify placeholder, not a measured spec), so weight omitted rather than guessed. Re-confirmed via .js product JSON (price 13100 cents).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-trail-3-0-liner' },
  { id:'pnt-dakine-syncline', cat:'pants', brand:'Dakine', model:'Syncline Pant', price:110, weight:370,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'], status:'discontinued',
    desc:'RESOLVED grind-3 (2026-07-16): a dakine.com site search for "syncline pant" returns 20 results (jerseys/shorts/gloves/backpacks) and zero pants - Dakine no longer sells a full-length Syncline pant in either gender. Marked discontinued rather than removed.' },
  { id:'pnt-ion-scrub-amp', cat:'pants', brand:'ION', model:'Scrub AMP Pant', price:150, weight:410,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'ATTEMPTED 2026-07-18: same ion-products.com multi-generation SKU-proliferation issue as the rest of the ION cluster (see jsy-ion-scrub-amp) - left unverified.' },
  { id:'pnt-dharco-gravity', cat:'pants', brand:'Dharco', model:'Gravity Pant', price:156,
    liner:false, disciplines:['enduro','dh'], sizes:['S','M','L','XL','2XL','3XL'],
    desc:'RETRY 2026-07-16: found the US storefront (us.dharco.com, distinct from the AUD-only dharco.com) - fetched us.dharco.com/collections/gravity-pants, which lists the Men\'s Gravity Pant at $156.00 USD (S-3XL), correcting the earlier $150 non-USD-sourced sample. Fabric/weight not stated on the listing; weight omitted rather than guessed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.dharco.com/collections/gravity-pants' },
  { id:'pnt-fox-ranger', cat:'pants', brand:'Fox', model:'Ranger Pant', price:119.95, weight:400,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38'],
    desc:'CORRECTED 2026-07-17: price is the fetched $119.95 list (was sample $100; page currently on sale at $83.99, list used per policy). No weight published on the fetched page, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/ranger-pants/33698.html' },
  { id:'pnt-fox-ranger-womens', cat:'pants', brand:'Fox', model:"Women's Ranger Pant", price:139.95,
    liner:false, fitCut:'womens', disciplines:['trail'], sizes:['0/2','4/6','8/10','12/14','16','18'],
    desc:'kit-breadth-3 (2026-07-22): pants had only 1 fitCut:\'womens\' row before this. Genuinely'
      + ' distinct from the men\'s Ranger, not a recolor: Fox\'s own copy calls out "Women\'s specific'
      + ' stretch panels at the hip for comfort", and it ships on its own women\'s numeric size chart'
      + ' (0/2-18) rather than the men\'s waist-inch chart. No weight published on the page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.foxracing.com/product/womens-ranger-pants/33459.html' },
  { id:'pnt-troyleedesigns-ruckus', cat:'pants', brand:'Troy Lee Designs', model:'Ruckus Cargo Pant', price:210, weight:380,
    liner:false, disciplines:['trail'], sizes:['30','32','34','36','38'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17',
    source:'https://troyleedesigns.com/products/sp23-ruckus-cargo-pant-mono-sienna',
    desc:'Verify pass (kit-fanout-1a, 2026-07-17): re-fetched troyleedesigns.com/products.json - "Ruckus Cargo Pant Mono Sienna" sells at $210.00 USD list price (no discount), sizes 30-38 confirmed, currently in stock. Price match confirms the prior pass\'s fetched figure. No weight published (380g is an unverified sample figure). Scope note carried forward: TLD has split the old "Ruckus Pant" into two current SKUs, this Cargo Pant and a separate Ruckus Long Travel Pant ($124-155 depending on colorway) - a second row for Long Travel may be warranted as a future breadth add, out of this verify pass\'s scope.' },
  { id:'pnt-raceface-indy', cat:'pants', brand:'Race Face', model:'Indy Pants', price:120, weight:400,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'UNVERIFIED - a 2026-07-16 check of raceface.com/collections/bottoms (full current shorts+pants list fetched) found only "Indy Shorts", no "Indy Pants" currently sold; Conspiracy Pants is the only current pants SKU on the site. Left as a sample row, not fabricated, and not marked discontinued on this weak evidence alone.' },
  { id:'pnt-gorewear-c5-gtx-trail', cat:'pants', brand:'Gore Wear', model:'C5 GORE-TEX Trail Pant', price:250, weight:450,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'], status:'discontinued',
    desc:'GORE-TEX waterproof/breathable shell. GOREWEAR.com has closed as a direct retail channel (confirmed via gorewear.com -> gore-tex.com/products/gorewear, which states "GOREWEAR Has Closed" and directs buyers to retail partners while stock lasts); no live maker product page remains to verify against, so price/weight stay unverified sample figures.' },
  { id:'pnt-7mesh-glidepath', cat:'pants', brand:'7mesh', model:'Glidepath Pant', price:144,
    liner:false, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Re-fetched 7mesh.com (en-US) 2026-07-20: still $144-180 by colorway and sizes XS-XXL, matching the 2026-07-16 pass exactly. No weight published; omitted rather than guessed.',
    source:'https://7mesh.com/en-US/products/mens-glidepath-pant' },
  /* RETIRED kit-10 (2026-07-21): pnt-poc-resistance-enduro - FABRICATED. "Resistance
     Enduro" has only ever named POC shorts; the pants tier is "Rhythm Resistance Pants"
     and "Resistance Pro DH Pants" - no "Resistance Enduro Pants" exists anywhere. The
     report's suggested retarget (Rhythm Resistance Pants) has no existing catalog row
     to alias to, so this is a plain tombstone (no KIT_ALIASES entry) rather than a
     retarget - adding the Rhythm Resistance Pants as a new row is a data-entry task,
     out of scope here. See tools/verify-notes-kit.md "Kit Wave 10". */
  { id:'pnt-fox-flexair', cat:'pants', brand:'Fox', model:'Flexair Pant', price:174.95, weight:390,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    desc:'TruMotion 4-way stretch, tapered fit, TruDri moisture-wicking. CORRECTED 2026-07-17: price is the fetched $174.95 list (was sample $200; page currently on sale at $139.99, list used per policy). No weight published on the fetched page, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/flexair-pants/33704.html' },
  { id:'pnt-troyleedesigns-skyline', cat:'pants', brand:'Troy Lee Designs', model:'Skyline Pant', price:165, weight:454,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38','40'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp23-skyline-pant-mono-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $165.00 USD regular/compare-at price confirmed, waist sizes 28-40 confirmed. Per-variant weight sourced from the JSON (408g at 28/30, 454g at 32/34/36, 499g at 38/40) - 454g (waist 32) used as the representative figure.' },
  { id:'pnt-endura-singletrack', cat:'pants', brand:'Endura', model:'SingleTrack Trouser', price:155, weight:400,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mens-singletrack-trousers-black-re8110bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Men\'s SingleTrack Trousers", "$155.00 USD" (was sampled at $140, corrected), sizes S-2XL. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'pnt-endura-mt500-waterproof', cat:'pants', brand:'Endura', model:'MT500 Waterproof Trouser', price:200,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.endurasport.com/en-us/products/mens-mt500-spray-trousers-black-re8139bk',
    desc:'FOUND the current non-bib match (a sibling pass checked 2026-07-16 and only found the different $280 bib SKU): "Men\'s MT500 Spray Trousers" (re8139bk) - a straight-leg (non-bib) MT500 waterproof-rear-panel trouser, $200.00 exactly, sizes span S-3XL by inseam (row keeps the existing S-XXL). Endura appears to have renamed this SKU from "Waterproof Trouser" to "Spray Trousers" between catalog entry and now. No weight published on the page, omitted rather than guessed.' },
  { id:'pnt-leatt-gravity-4', cat:'pants', brand:'Leatt', model:'MTB Gravity 4.0 Pant', price:144,
    liner:false, disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'CORRECTED 2026-07-16: fetched us.leatt.com (Current, non-Obsolete) prices this at $144.00, sizes XS-XXL. No trustworthy weight published (only an XS-only 360g figure that repeats identically across unrelated pant models, smelling like a Shopify placeholder), so weight omitted rather than guessed. Re-confirmed via .js product JSON (price 14400 cents).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-gravity-4-0' },
  { id:'pnt-leatt-gravity-8', cat:'pants', brand:'Leatt', model:'MTB Gravity 8.0 Pant', price:175,
    liner:false, disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Fetched us.leatt.com (Current, non-Obsolete) confirms $175-199 by colorway (base $175 matches prior sample) and sizes XS-XXL; developed with the Pivot Factory Racing DH team. No weight published there, omitted rather than guessed. Re-confirmed via .js product JSON (price 17500 cents base).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pants-mtb-gravity-8-0' },
  { id:'pnt-leatt-hydradri-3', cat:'pants', brand:'Leatt', model:'MTB HydraDri 3.0 Pant', price:164,
    liner:false, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'2.5L waterproof/breathable shell, 20,000mm/20,000g² rating. Fetched us.leatt.com (Current, non-Obsolete) confirms the $164.00 price and sizes XS-XXL. No weight published there, omitted rather than guessed. Re-confirmed via .js product JSON (price 16400 cents).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-hydradri-3-0' },
  { id:'pnt-leatt-hydradri-5', cat:'pants', brand:'Leatt', model:'MTB HydraDri 5.0 Pant', price:263,
    liner:false, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'3-layer waterproof/breathable shell, 30,000mm/30,000g² rating. CORRECTED 2026-07-16: fetched us.leatt.com (Current, non-Obsolete) prices this at $263-264 by colorway, sizes XS-XXL. No trustworthy weight published (only an XS-only 360g figure that repeats identically across unrelated pant models, smelling like a Shopify placeholder), so weight stays prior sample. Re-confirmed via .js product JSON (price 26300 cents base).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-hydradri-5-0' },
  { id:'pnt-leatt-enduro-3', cat:'pants', brand:'Leatt', model:'MTB Enduro 3.0 Pant', price:83.85,
    liner:false, disciplines:['enduro'], sizes:['XS','S','M','L','XL','XXL'], status:'discontinued',
    desc:'CORRECTED 2026-07-16: fetched us.leatt.com prices this at $83.85, sizes XS-XXL, tagged Obsolete with every variant out of stock. No weight published there, omitted rather than guessed. Re-confirmed via .js product JSON (price 8385 cents, compare_at 12900).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-enduro-3-0-sale' },
  { id:'pnt-leatt-trail-2', cat:'pants', brand:'Leatt', model:'MTB Trail 2.0 Pant', price:87.99,
    liner:false, disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Fetched us.leatt.com (Current, non-Obsolete) confirms $87.99-89.99 by colorway (matches prior sample) and sizes XS-XXL. No weight published there, omitted rather than guessed. Re-confirmed via .js product JSON (price 8799 cents).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-trail-2-0' },
  { id:'pnt-leatt-trail-8-cargo', cat:'pants', brand:'Leatt', model:'MTB Trail 8.0 Cargo Pant', price:164,
    liner:false, disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Fetched us.leatt.com (Current, non-Obsolete) confirms $164-169 by colorway (matches prior sample) and sizes XS-XXL; integrated rear "Mission Pack" storage. No weight published there, omitted rather than guessed. Re-confirmed via .js product JSON (price 16400 cents).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-trail-8-0-cargo' },
  { id:'pnt-leatt-allmtn-4', cat:'pants', brand:'Leatt', model:'MTB AllMtn 4.0 Pant', price:116.35,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'], status:'discontinued',
    desc:'CORRECTED 2026-07-16: fetched us.leatt.com prices this at $116.35, tagged Obsolete with every variant out of stock. No weight published there, omitted rather than guessed. Re-confirmed via .js product JSON (price 11635 cents, compare_at 17900).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/pant-mtb-allmtn-4-0-sale' },
  { id:'pnt-raceface-conspiracy', cat:'pants', brand:'Race Face', model:'Conspiracy Pants', price:180,
    liner:false, disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/conspiracy-pants',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $180.00 USD (matches the existing sample price exactly), sizes S-XXL confirmed (added XXL). No weight published on the page - omitted rather than guessed (was a 450g sample estimate).' },
  { id:'pnt-100-r-core-x', cat:'pants', brand:'100%', model:'R-Core-X Pants', price:149, weight:410,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    desc:'Weight approx, unconfirmed (kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $149, sizes 28-38 unchanged.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/r-core-x-pants-black' },
  { id:'pnt-fasthouse-fastline-2', cat:'pants', brand:'Fasthouse', model:'Fastline 2.0 MTB Pant', price:140, weight:480,
    liner:true, disciplines:['enduro','dh'], sizes:['28','30','32','34','36','38'],
    desc:'Re-fetched fasthouse.com (2026-07-17): $140 MSRP confirmed, ships with a short-length inner'
      + ' liner confirmed. 400D poly body, 600D saddle, 4-way stretch panels, 54% Polyester/40% Polyamide/6% Spandex.'
      + ' Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://fasthouse.com/products/fastline-2-mtb-pant-black' },
  { id:'pnt-royalracing-apex', cat:'pants', brand:'Royal Racing', model:'Apex Pants', price:165, weight:440,
    liner:false, disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Re-fetched royalracing.com/products/apex-pants-ltd-blk kit-12 (2026-07-21, via Exa): GBP129.99 regular price reconfirmed (USD figure here is a converted ESTIMATE at ~1.27 USD/GBP, basis disclosed per THE PRICE RULE - price never blocks verification) and sizes XS-XXL reconfirmed exactly. No weight published on the page - 440g stays an unverified sample figure per the kit-apparel weight-exemption policy.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-21', source:'https://royalracing.com/products/apex-pants-ltd-blk' },
  { id:'pnt-royalracing-storm', cat:'pants', brand:'Royal Racing', model:'Storm Pants', price:160, weight:500,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    // FLAG (2026-07-16): a Storm Pants page is indexed at royalracing.com/us/product/storm-pants/ and
    // /gb/product/storm-pants/ but both currently 404 on fetch; could not confirm current price/specs.
    desc:'Thermal windproof/water-repellent outer with fleece inner face.'
      + ' CHECKED kit-13 (2026-07-21): fetched royalracing.com/products.json (browser pane) - the'
      + ' entire current catalog is 30 SKUs, all "Apex" line jerseys/pants/gloves + Core gloves +'
      + ' headwear/accessories; no "Storm" product of any kind. Confirms a full lineup refresh, not'
      + ' just a fetch issue with this one product. Left unverified, no fields changed.' },
  { id:'pnt-alpinestars-drop', cat:'pants', brand:'Alpinestars', model:'Drop Pants', price:149.95,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38','40'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.alpinestars.com/products/drop-pants',
    desc:'RE-CHECKED 2026-07-16 via the .js JSON endpoint: MSRP (compare_at_price) $149.95 confirmed exactly'
      + ' (currently on sale at $119.96), sizes 28-40 confirmed, no liner mentioned. No weight published on'
      + ' the page - the prior 400g sample is dropped rather than carried as an unverified claim.' },
  { id:'pnt-ixs-trigger', cat:'pants', brand:'iXS', model:'Trigger Pants', price:172, weight:380,
    liner:false, disciplines:['enduro','dh'], sizes:['XXS','XS','S','M','L','XL','XXL'],
    desc:'Recycled PET fiber, X-stretch fabric, tight aerodynamic race fit, stretch ventilation'
      + ' inserts. EUR159.00 RRP converted to $172 USD sample - no US MSRP page found. Weight'
      + ' not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-trigger-hose-schwarz' },
  { id:'pnt-sweetprotection-hunter-2', cat:'pants', brand:'Sweet Protection', model:'Hunter Pants II', price:139, weight:286,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Maker-stated weight (286g) and sizes (S-XL, corrected from S-XXL) confirmed via fetched sweetprotection.com/eu/en/hunter-pants-ii-mens-black/. Price is EUR129 converted at ~1.08 USD/EUR (no USD price shown on the EU page).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-16', source:'https://www.sweetprotection.com/eu/en/hunter-pants-ii-mens-black/' },
  { id:'pnt-sweetprotection-hunter-light', cat:'pants', brand:'Sweet Protection', model:'Hunter Light Pants', price:150, weight:370,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'Hybrid water-resistant softshell construction. Checked 2026-07-16: sweetprotection.com/en/hunter-light-pants-mens/828089.html 404s (an old product-id URL pattern); could not locate a live current page to verify or correct. Left as an unverified sample.' },
  { id:'pnt-oneal-element-trail', cat:'pants', brand:"O'Neal", model:'Element Trail Pant', price:119.99, weight:420,
    liner:true, disciplines:['trail'], sizes:['28','30','32','34','36','38','40','42'],
    desc:'Fetched oneal.com: CORRECTED price $90 -> $119.99 (regular MSRP; currently on sale at $71.99, sale price NOT used per MSRP-basis pricing policy) and liner false -> true (page confirms a "Half knee length internal liner"). Sizes extend to 40/42. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://oneal.com/products/oneal-element-trail-pant-black' },
  { id:'pnt-norrna-fjora-flex1', cat:'pants', brand:'Norrøna', model:'fjørå flex1 Pants', price:249, weight:400,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'145 g/m² softshell, 62% recycled nylon / 32% nylon / 6% elastane. Checked 2026-07-16: confirmed as a real current product (norrona.com/en-GB/products/fjora/fjora-flex1-pants-mens/), but the fetched page only shows GBP pricing (no USD) and no garment weight (only fabric g/m2). US retailers quote $179 for the separate "fjørå flex1 Tech Pants" SKU (a lighter double-weave variant, not this one) - not applied here to avoid conflating two different products. Left as an unverified sample, price/weight unchanged.' },
  { id:'pnt-norrna-fjora-dri1', cat:'pants', brand:'Norrøna', model:'fjørå dri1 Waterproof Pants', price:279, weight:350,
    liner:false, disciplines:['trail'], sizes:['S','M','L','XL','XXL'],
    desc:'2.5-layer waterproof shell, 20,000mm rating. Checked 2026-07-16: confirmed as a real current product (norrona.com/en-GB/products/fjora/fjora-dri1-waterproof-pants-men/), but the fetched page only shows footer/nav content (no price/weight) and a retailer page (CampSaver) hit a bot CAPTCHA wall. Left as an unverified sample, price/weight unchanged.' },
  { id:'pnt-patagonia-dirtroamer-storm', cat:'pants', brand:'Patagonia', model:'Dirt Roamer Storm Bike Pants', price:299, weight:400,
    liner:false, disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'H2No fully waterproof shell, sealed seams, MTB-specific OppoSet waistband.'
      + ' ATTEMPTED kit-13 (2026-07-21): patagonia.com/product/mens-dirt-roamer-storm-mountain-bike-pants/25030.html'
      + ' serves an interstitial bot-queue page ("Hang Tight! Routing to checkout...") on both'
      + ' WebFetch and Exa fetch - a genuine anti-bot wall per FETCH ETHICS, not JS-rendering (the'
      + ' page never resolves to content on a non-interactive fetch). WebSearch corroborates $299'
      + ' MSRP + H2No shell at both patagonia.com and eu.patagonia.com, but a search summary is a'
      + ' lead, not a source (PHANTOM-NUMBER hazard) - not fetched, left unverified.' },
  { id:'pnt-sombrio-vanquish', cat:'pants', brand:'Sombrio', model:'Vanquish Pant', price:140, weight:420,
    liner:false, disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Quattro Flex Dura water-resistant stretch fabric, relaxed fit. Checked 2026-07-16: no live Sombrio maker storefront remains to re-verify against (see jsy-sombrio-badass-ls for detail).' },
  { id:'pnt-pearlizumi-summit', cat:'pants', brand:'Pearl Izumi', model:'Summit Pant', price:160, weight:380,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38'],
    verified:true, priceBasis:'msrp-confirmed',
    desc:'Price corrected 2026-07-16: fetched pearlizumi.com/products/mens-summit-pants-19112201.js confirms the in-stock ROOT BEER/PHANTOM colorways price at $160.00 (a discontinued BLACK ORIGIN colorway shows a lower compare_at of $145, but that\'s not the current MSRP - two clusters independently fetched this page and landed on different colorways, resolved 2026-07-16 by a third direct fetch). No chamois/liner confirmed ("no chamois pad" per the page, pairs with liner shorts). Sizes corrected to the maker\'s actual numeric waist range (28-38). RE-CONFIRMED 2026-07-17 via bdata re-fetch of the .js product JSON: price_max $160.00 (matches). Weight kept as the prior sample - the JSON exposes a flat 163g figure identical across every size/color, a shipping-weight placeholder implausible for a pant (real MTB pants run 350-500g), not a measured spec.', lastChecked:'2026-07-17', source:'https://www.pearlizumi.com/products/mens-summit-pants-19112201' },
  { id:'pnt-pearlizumi-summit-3l-wxb', cat:'pants', brand:'Pearl Izumi', model:'Summit 3L WxB Pant', price:185, weight:450,
    liner:false, disciplines:['trail','enduro'], sizes:['28','30','32','34','36','38'],
    verified:true, priceBasis:'msrp-confirmed',
    desc:'3-layer WxB waterproof/breathable membrane, fully taped seams. Price corrected 2026-07-16: fetched pearlizumi.com/products/mens-summit-3l-wxb-pants-19132207 lists a regular MSRP of $185.00 (page currently shows a $92.50 final-sale markdown, not used here) - catalog previously had $200. Sizes corrected to the maker\'s numeric waist range (28-38); no chamois. RE-CONFIRMED 2026-07-17 via bdata re-fetch of the .js product JSON: compare_at_price $185.00 (matches, still on the $92.50 final-sale markdown - not used). No trustworthy weight published; stays sample.', lastChecked:'2026-07-17', source:'https://www.pearlizumi.com/products/mens-summit-3l-wxb-pants-19132207' },
  { id:'pnt-pearlizumi-summit-amfib-lite', cat:'pants', brand:'Pearl Izumi', model:'Summit AmFIB Lite Pant', price:175, weight:430,
    liner:false, disciplines:['trail'], sizes:['28','30','32','34','36','38'],
    verified:true, priceBasis:'msrp-confirmed',
    desc:'3-layer AmFIB softshell for cold-weather riding. Price corrected 2026-07-16 to the maker\'s compare_at_price/MSRP of $175.00 (a $122.50 sale price is live on the page - not used, per the price=MSRP policy; two clusters disagreed here, resolved 2026-07-16 by a direct re-fetch of pearlizumi.com/products/mens-summit-amfib-lite-pants-19112112.js). Sizes corrected to the maker\'s numeric waist range (28-38, 28/30 currently out of stock). RE-CONFIRMED 2026-07-17 via bdata re-fetch of the .js product JSON: compare_at_price $175.00 (matches). No trustworthy weight published; stays sample.', lastChecked:'2026-07-17', source:'https://www.pearlizumi.com/products/mens-summit-amfib-lite-pants-19112112' },
  { id:'pnt-handup-at-plus', cat:'pants', brand:'Handup', model:'A.T. Plus Pants', price:64, weight:380,
    liner:false, disciplines:['trail'], sizes:['26','28','30','32','34','36','38','40'],
    desc:'Re-fetched handupco.com/products/a-t-plus-pants-obsidian-1 kit-11 (2026-07-21): regular MSRP $64.00 reconfirmed (currently $39 on sale, sale price not used per MSRP-basis pricing policy), waist sizes 26-40 (also split by 30/32/34 inseam, not captured in the flat sizeList), no liner/chamois. 90% Nylon/10% Spandex, four-way stretch. No absolute weight published ("14% lighter" than prior year, no figure) - stays a sample per the kit-apparel weight-exemption policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://www.handupco.com/products/a-t-plus-pants-obsidian-1' },
  { id:'pnt-rapha-trail-mens', cat:'pants', brand:'Rapha', model:"Men's Trail Pants",
    price:205, family:'rapha-trail', mfgPn:'TPA01XX', liner:false,
    fitCut:'mens', sizes:['XS','S','M','L','XL','XXL'], disciplines:['trail'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.rapha.cc/us/en/product/mens-trail-pants/TPA01XX',
    desc:'Fetched rapha.cc product page: list USD price $205.00 confirmed (site currently runs a $143 sale), sizes XS-XXL. Durable woven nylon, reinforced knees, adjustable anatomical waistband with camlocks, gusseted 4-way stretch construction (fits over knee pads). No weight published.' },
  { id:'pnt-rapha-trail-womens', cat:'pants', brand:'Rapha', model:"Women's Trail Pants",
    price:143, family:'rapha-trail', mfgPn:'WPA01XX', liner:false,
    fitCut:'womens', sizes:['XXS','XS','S','M','L','XL'], disciplines:['trail'],
    source:'https://www.rapha.cc/us/en/product/WPA01XX',
    desc:'Fetched rapha.cc: the site\'s own MTB-collection overview page lists this SKU\'s USD range as $123.00-$143.00 across colorways; the direct product page returned $102.00 with no sale/list distinction stated, so the CATALOG-OVERVIEW top-of-range figure ($143, matching the men\'s-pants sibling\'s relative pricing) is used as the representative MSRP rather than the ambiguous single-page figure - left UNVERIFIED pending a cleaner per-colorway confirmation. Same construction as the men\'s Trail Pants (stretch waist, zip vertical pockets, gusseted 4-way stretch). No weight published.' },

  /* -- Gloves (all UNVERIFIED samples; weight is PER PAIR, approx USD MSRP) -- */
  { id:'glv-fox-dirtpaw', cat:'gloves', brand:'Fox', model:'Dirtpaw', price:39.95, weight:70, sizes:['S','M','L','XL','XXL','3XL','4XL'],
    desc:'CORRECTED 2026-07-17: price is the fetched $39.95 (was sample $30); sizes widened to the fetched S-4XL range. foxracing.com now catalogs this as a Moto (dirt-bike) product, not MTB, but it remains a real, currently-sold crossover glove commonly used for MTB - kept, not removed. No weight published on the fetched page, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/dirtpaw-gloves/31325.html' },
  { id:'glv-troyleedesigns-ace', cat:'gloves', brand:'Troy Lee Designs', model:'Ace 2.0', price:47, weight:45, sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp25-ace-2-0-glove-solid-turquoise',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $47.00 USD compare-at price confirmed, sizes SM-2X confirmed. Per-variant weight (per glove) sourced from the JSON (SM/MD/LG 45g, XL/2X 50g) - 45g (MD) used as the representative figure, correcting the prior 60g sample.' },
  { id:'glv-troyleedesigns-ace2-womens', cat:'gloves', brand:'Troy Lee Designs', model:'Womens Ace 2.0 Glove', price:54,
    fitCut:'womens', sizes:['SM','MD','LG','XL','2X'],
    desc:'Genuine current-season women\'s-specific SKU (own product page, SKU 436003102, tagged "New" on the Womens Gloves collection), not the unisex Ace 2.0 resized. TLD\'s women\'s glove line runs several models (Ace, Luxe, Gambit) whose "regular price" varies widely release-to-release/colorway-to-colorway on the storefront - only this cleanly-consistent current listing was added rather than guess a representative figure for the others. Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://troyleedesigns.com/products/2018-tld-ace-2-womens-glove-butter' },
  { id:'glv-raceface-indy', cat:'gloves', brand:'Race Face', model:'Indy Gloves', price:38,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/indy-glove',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $38.00 USD, sizes XS-XL confirmed (corrects 35->38 and the size range, which had no XS and a nonexistent XXL). Weight per pair - not published on the page, so omitted rather than guessed (was a 65g sample estimate).' },
  { id:'glv-fox-ranger', cat:'gloves', brand:'Fox', model:'Ranger Glove', price:29.95, weight:65,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). CORRECTED 2026-07-17: price is the fetched $29.95 list (was sample $25; page currently on sale at $20.99, list used per policy).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/ranger-gloves/31057.html' },
  { id:'glv-fox-flexair', cat:'gloves', brand:'Fox', model:'Flexair Glove', price:44.95, weight:50,
    sizes:['XS','S','M','L','XL','XXL'],
    desc:'Lightweight race-fit glove. Weight per pair (approx). CORRECTED 2026-07-17: price is the fetched $44.95-49.95 range, base size $44.95 (was sample $35); sizes widened to include the fetched XS.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/flexair-gloves/31496.html' },
  { id:'glv-fox-defend', cat:'gloves', brand:'Fox', model:'Defend Glove', price:44.95,
    sizes:['S','M','L','XL','2XL'],
    desc:'kit-breadth-3 (2026-07-22): durability-focused single-layer Clarino palm glove, list'
      + ' price runs $44.95-$49.95 by colorway ($44.95 used as the base). No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.foxracing.com/product/defend-gloves/33792.html' },
  { id:'glv-fox-defend-d3o', cat:'gloves', brand:'Fox', model:'Defend D3O Glove', price:59.95,
    sizes:['S','M','L','XL','2XL'],
    desc:'kit-breadth-3 (2026-07-22): the D3O-impact-palm tier above the base Defend glove'
      + ' (glv-fox-defend), same collection page. No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.foxracing.com/gloves/mountain-bike/defend/' },
  { id:'glv-fox-defend-youth', cat:'gloves', brand:'Fox', model:'Youth Defend Glove', price:39.95,
    sizes:['Youth-S','Youth-M','Youth-L'],
    desc:'kit-breadth-3 (2026-07-22): genuine youth-specific SKU (ages 6-14, its own Youth-S/M/L'
      + ' size run distinct from the adult Defend chart), not an adult small worn by a kid. No'
      + ' weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.foxracing.com/gloves/mountain-bike/defend/' },
  { id:'glv-fox-ranger-womens', cat:'gloves', brand:'Fox', model:'Womens Ranger Gloves', price:29.95,
    fitCut:'womens', sizes:['S','M','L'],
    desc:'Genuine women\'s-specific SKU (style #27383, own product page), not a men\'s Ranger resize: compression-molded cuff, absorbent micro-suede thumb, touchscreen-compatible index/thumb threads. Browser-pane fetch (WebFetch rendered the page without price data): list price $29.95, currently on a 29% sale to $20.99 - list price used per pricing policy. Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.foxracing.com/product/womens-ranger-gloves/27383.html' },
  { id:'glv-100-airmatic', cat:'gloves', brand:'100%', model:'Airmatic Glove', price:44.95, weight:70,
    sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx, unconfirmed - the manufacturer\'s own product-JSON weight field is a shipping/package weight, not a garment weight, confirmed unreliable via the eyewear batch where it read ~300g for ~30g sunglasses; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed compare-at $44.95, no XXL currently offered; a newer AIRMATIC 2 generation ($44.95) now sells alongside it.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/airmatic-gloves-silver' },
  { id:'glv-100-ridecamp', cat:'gloves', brand:'100%', model:'Ridecamp Glove', price:29.95, weight:65,
    sizes:['S','M','L','XL','2XL'],
    desc:'Weight per pair (approx, unconfirmed; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $29.95, sizes S-2XL.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/ridecamp-gloves-black-charcoal' },
  { id:'glv-100-ridecamp-womens', cat:'gloves', brand:'100%', model:'Ridecamp Glove - Women\'s', price:29.95,
    fitCut:'womens', sizes:['S','M','L','XL'],
    desc:'Genuine women\'s-specific SKU (own product page, SKU 10013-00001), not the unisex Ridecamp resized: embossed ergonomic slip-on cuff, durable knit top hand, single-layer Clarino palm. Browser-pane fetch (100percent.com is rate-limiting WebFetch this pass): $29.95 confirmed, S-XL (M shown as a sold-out variant, not a missing size). Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.100percent.com/products/ridecamp-gloves-women-aos-black-charcoal' },
  { id:'glv-100-brisker', cat:'gloves', brand:'100%', model:'Brisker Cold Weather Glove', price:39.95, weight:95,
    sizes:['S','M','L','XL','2XL'],
    desc:'Insulated cold-weather glove. Weight per pair (approx, unconfirmed; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $39.95 (no discount currently active), sizes S-2XL.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/brisker-gloves-black' },
  { id:'glv-troyleedesigns-air', cat:'gloves', brand:'Troy Lee Designs', model:'Air Glove', price:43, weight:59,
    sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp25-air-glove-mono-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $43.00 USD price confirmed. Per-variant weight (per glove) sourced from the JSON (SM/MD 59g, LG/XL/2X 64g) - 59g (MD) used as the representative figure.' },
  { id:'glv-troyleedesigns-gambit', cat:'gloves', brand:'Troy Lee Designs', model:'Gambit Glove', price:65, weight:77,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/20s-gambit-glove-solid-black',
    desc:'Padded gravity/DH-oriented glove with D3O knuckle armor. Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $65.00 USD price confirmed. Per-variant weight (per glove) sourced from the JSON (SM 73g, MD 77g, LG/XL/2X 82g) - 77g (MD) used as the representative figure.' },
  { id:'glv-troyleedesigns-flowline', cat:'gloves', brand:'Troy Lee Designs', model:'Flowline Glove', price:35, weight:50,
    sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp24-flowline-glove-mono-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $35.00 USD price confirmed. Per-variant weight (per glove) sourced from the JSON (SM/MD 50g, LG/XL/2X 54g) - 50g (MD) used as the representative figure.' },
  { id:'glv-raceface-trigger', cat:'gloves', brand:'Race Face', model:'Trigger Glove', price:30,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/trigger-glove',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $30.00 USD (matches the existing sample price exactly), sizes XS-XL confirmed (corrects the size range, which had no XS and a nonexistent XXL). Weight per pair - not published on the page, so omitted rather than guessed (was a 62g sample estimate).' },
  { id:'glv-raceface-khyber', cat:'gloves', brand:'Race Face', model:'Khyber Glove', price:35, weight:80,
    sizes:['S','M','L','XL','XXL'], desc:'Lightly insulated, touchscreen-compatible. Weight per pair (approx). UNVERIFIED - a 2026-07-16 check of raceface.com/collections/gloves (full current glove list fetched: Trigger, Indy, Ruxton, Roam, Conspiracy, Stage) found no current Khyber Glove; only retailer listings reference it. Left as a sample row, not fabricated, and not marked discontinued on this weak evidence alone.' },
  { id:'glv-giro-dnd', cat:'gloves', brand:'Giro', model:'DND Glove', price:29.95, weight:58,
    sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: MSRP $29.95 confirmed (matches the prior'
      + ' 2026-07-16 search-indexed correction). No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/dnd-glove/350020000200000009.html' },
  { id:'glv-giro-trixter', cat:'gloves', brand:'Giro', model:'Trixter Glove', price:24.95, weight:55,
    sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: MSRP $24.95 confirmed (matches the prior'
      + ' 2026-07-16 search-indexed correction). No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/trixter-glove/350020000200000034.html' },
  { id:'glv-leatt-dbx-2-0-xflow', cat:'gloves', brand:'Leatt', model:'DBX 2.0 X-Flow Glove', price:35, weight:75,
    sizes:['S','M','L','XL','XXL'], desc:'Weight per pair (approx). Checked 2026-07-16: could not find a current "DBX 2.0 X-Flow" glove in us.leatt.com\'s ~1490-product catalog - DBX now names Leatt\'s moto chin-bar/hardware parts, and the X-Flow name belongs to the ADV/moto glove line (Glove ADV X-Flow 8.5/5.5), not an MTB glove. Left unedited pending a cleaner source; may be a discontinued/renamed SKU.' },
  { id:'glv-leatt-mtb-3-0-lite', cat:'gloves', brand:'Leatt', model:'MTB 3.0 Lite Glove', price:63.79, weight:65,
    sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx, not published). RE-CORRECTED 2026-07-16 pass fetched the "-sale" URL (an older clearance-gen SKU tagged Obsolete, $29.99-40.99) - that was the WRONG SKU. The plain product URL (no -sale suffix) is the current, actively-stocked listing at $63.79, sizes S-XL (no XXL currently offered); status:discontinued removed accordingly. Confirms EN 13594:2015 knuckle impact protection (reduced-requirements off-road cert, not one of the catalog\'s protectionCert tokens).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/glove-mtb-3-0-lite' },
  { id:'glv-dakine-crossx', cat:'gloves', brand:'Dakine', model:'Cross-X Glove', price:40, weight:108,
    sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://www.dakine.com/products/cross-x-bike-glove',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $40.00 USD confirmed (standard colorways), sizes XS-XXL confirmed. Per-variant weight (per glove) sourced from the JSON - the standard colorways weigh 108g uniformly across sizes; used as the representative figure.' },
  { id:'glv-dakine-crossx-womens', cat:'gloves', brand:'Dakine', model:'Cross-X Bike Glove - Women\'s', price:40,
    fitCut:'womens', sizes:['XS','S','M','L','XL'],
    desc:'Genuine women\'s-specific SKU (own product page, own size run XS-XL vs the unisex XS-XXL), not the unisex Cross-X resized: updated TPU/neoprene knuckle protection, silicone grip reinforcements, touchscreen-compatible. Browser-pane fetch (dakine.com rate-limited WebFetch this pass): $40.00 on the fetched colorway (the women\'s collection list shows a $35 base price on other colorways - colorway-driven spread, not corrected here). Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.dakine.com/products/cross-x-bike-glove-womens' },
  { id:'glv-dakine-thrillium-womens', cat:'gloves', brand:'Dakine', model:'Thrillium Bike Glove - Women\'s', price:50,
    fitCut:'womens', sizes:['XS','S','M','L','XL'],
    desc:'Women\'s-only model with no men\'s/unisex counterpart in the Dakine lineup (Casey Brown signature glove) - closes a real Dakine gap, not a resize of an existing row. Outseamed Pittards sheep-leather palm, 4-way stretch shell, slip-on cuff. Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.dakine.com/products/thrillium-bike-glove-womens' },
  { id:'glv-specialized-trailshield', cat:'gloves', brand:'Specialized', model:'Trail Shield Glove', price:44.99, weight:85,
    sizes:['S','M','L','XL','XXL'],
    desc:'TPU knuckle guards, AX Suede palm, silicone-printed fingertips. $44.99 MSRP confirmed'
      + ' live (Men\'s Trail Shield Gloves, browser-rendered specialized.com/us/en - WebFetch'
      + ' 403s on this domain, product pages are JS-rendered). Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/shop/cycling-clothing/cycling-gloves' },
  { id:'glv-endura-mt500', cat:'gloves', brand:'Endura', model:'MT500 Glove', price:60, weight:90,
    sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mt500-d3o-gloves-black-re1346bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: current MT500-line glove is the "MT500 D3O Gloves" (D3O knuckle/finger protection), "$60.00 USD" (was sampled at $45, corrected), sizes XS-2XL. Id/model kept as the originally-entered "MT500 Glove" (ids are append-only, matching the sht-endura-mt500burner2 precedent) - no plain non-D3O "MT500 Glove" is currently sold, this is the sole current MT500-branded glove. Weight kept as the prior sample estimate - the page/Shopify JSON weight (81g, flat across sizes) is a shipping-placeholder figure.' },
  { id:'glv-endura-hummveeplus', cat:'gloves', brand:'Endura', model:'Hummvee Plus Glove', price:45, weight:78,
    sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/hummvee-plus-gloves-black-re1160bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Hummvee Plus Gloves", "$45.00 USD" (was sampled at $35, corrected), sizes XS-2XL. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'glv-fisthandwear-stocker', cat:'gloves', brand:'Fist Handwear', model:'Stocker Glove', price:33, weight:65,
    disciplines:['dj'], sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx, no weight published). Corrected price ($30 sample -> $33, fetched'
      + ' fisthandwear.com.au AUD49.95 converted at ~0.66 USD/AUD - the brand\'s primary site'
      + ' (fisthandwear.com) now redirects entirely to the .com.au domain, AUD-only pricing).'
      + ' Kit-7 (2026-07-20): re-confirmed live at AUD49.95 exactly (Black colorway), custom FIST'
      + ' closure + single-layer Clarino palm confirmed. Formalizing verified:true per THE PRICE'
      + ' RULE (basis disclosed) - weight not required for kit apparel (stays sample).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://www.fisthandwear.com.au/products/black-stocker' },
  { id:'glv-poc-resistanceenduro', cat:'gloves', brand:'POC', model:'Resistance Enduro Glove', price:60, weight:43,
    disciplines:['enduro'], sizes:['XS','S','M','L','XL'],
    desc:'Weight per pair, size M (maker-stated; independently corroborated at 43-46g by third-party reviews). Fetched poc.com: price $60 confirmed (page showed a 40%-off $36 sale price), corrected weight 90g -> 43g, sizes to XS-XL (was missing XS, had a non-existent XXL).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/resistance-enduro-glove-uranium-black-uranium-black' },
  { id:'glv-alpinestars-aspenpro', cat:'gloves', brand:'Alpinestars', model:'Alderex Pro Glove', price:39.95, weight:75,
    sizes:['XS','S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). Renamed from "Aspen Pro" to "Alderex Pro" by Alpinestars (old name survives only in the product-page URL slug/image filenames); id kept as-is per the append-only convention. Price+sizes corrected against the fetched maker page (was $35, sizes started at S). VERIFIED 2026-07-17: re-fetched alpinestars.com/products/alderex-pro-glove, $39.95 and sizes XS-2XL confirmed. No weight published; stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/alderex-pro-glove' },
  { id:'glv-sweetprotection-hunter', cat:'gloves', brand:'Sweet Protection', model:'Hunter Glove', price:38, weight:39,
    sizes:['S','M','L','XL'],
    desc:'Maker states weight "39g" without specifying single-glove-vs-pair (kept as-published rather than guessed-doubled). Price is EUR35 converted at ~1.08 USD/EUR (no USD price shown on the EU page); sizes corrected to the maker\'s S-XL run.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-16', source:'https://www.sweetprotection.com/eu/en/hunter-bike-gloves-mens-black/' },
  { id:'glv-raceface-ruxton', cat:'gloves', brand:'Race Face', model:'Ruxton Glove', price:45,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/ruxton-glove',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $45.00 USD (matches the existing sample price exactly), sizes XS-XL confirmed (corrects the size range, which had no XS and a nonexistent XXL). Weight per pair - not published on the page, so omitted rather than guessed (was a 70g sample estimate).' },
  { id:'glv-raceface-roam', cat:'gloves', brand:'Race Face', model:'Roam Glove', price:35,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/roam-gloves',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $35.00 USD (matches the existing sample price exactly), sizes XS-XL confirmed (corrects the size range, which had no XS and a nonexistent XXL). Weight per pair - not published on the page, so omitted rather than guessed (was a 62g sample estimate).' },
  { id:'glv-raceface-conspiracy', cat:'gloves', brand:'Race Face', model:'Conspiracy Glove', price:50,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/conspiracy-gloves',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $50.00 USD, sizes XS-XL confirmed (corrects 49->50 and the size range, which had no XS and a nonexistent XXL). Weight per pair - not published on the page, so omitted rather than guessed (was a 65g sample estimate).' },
  { id:'glv-raceface-stage', cat:'gloves', brand:'Race Face', model:'Stage Glove', price:39,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/stage-glove',
    desc:'Verified vs fetched raceface.com Shopify product JSON: compare_at_price (regular/list price) $39.00 USD (matches the existing sample price exactly), sizes XS-XL confirmed (corrects the size range, which had no XS and a nonexistent XXL). Weight per pair - not published on the page, so omitted rather than guessed (was a 68g sample estimate).' },
  { id:'glv-giro-dndgel', cat:'gloves', brand:'Giro', model:'DND Gel Glove', price:39.95, weight:62,
    sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: MSRP $39.95 confirmed (was sample $40). 3mm gel'
      + ' padding, AX Suede microfiber palm. No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/dnd-gel-glove/350020000200000029.html' },
  { id:'glv-giro-havoc', cat:'gloves', brand:'Giro', model:'Havoc Glove', price:44.95, weight:75,
    sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: MSRP $44.95 confirmed (was sample $45). AX Suede'
      + ' palm, Ariaprene upper, TPR knuckle coverings. No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/havoc-glove/350020000200000035.html' },
  { id:'glv-giro-rodeo', cat:'gloves', brand:'Giro', model:'Rodeo Glove', price:34.95, weight:60,
    sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: MSRP $34.95 confirmed (matches the prior'
      + ' 2026-07-16 search-indexed correction). D3O Ghost two-knuckle protection. No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/rodeo-glove/350020000200000039.html' },
  { id:'glv-giro-xnetictrail', cat:'gloves', brand:'Giro', model:'Xnetic Trail Glove', price:44.95, weight:65,
    sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: MSRP $44.95 confirmed (page showed "Price reduced'
      + ' from $44.95" to a $31.99 sale price - list price used). No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/xnetic-trail-glove/350020000200000032.html' },
  { id:'glv-giro-trailbuilder', cat:'gloves', brand:'Giro', model:'Trail Builder Glove', price:27.95, mfgPn:'GR-7127913',
    sizes:['XS','S','M','L','XL','XXL'],
    desc:'Durable work-style build for digging/shoveling as well as riding (Laredo microsuede palm, reinforced fourchettes, Super Fit Engineering). Weight not published on the maker page (kit apparel does not require it). RE-CHECKED 2026-07-20: the collection-listing 404 that led a prior wave to tag this discontinued was a stale URL - the direct product page (giro.com/p/trail-builder-mountain-bike-gloves/350020000200000026.html) is live and purchasable, MSRP $27.95 (was showing a 21%-off sale price of $21.99 at fetch time; MSRP used per THE PRICE RULE), sizes XS-XXL (was S-XXL). `status:discontinued` removed - this was a false discontinued tag, not a real one.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.giro.com/p/trail-builder-mountain-bike-gloves/350020000200000026.html' },
  { id:'glv-giro-gnar', cat:'gloves', brand:'Giro', model:'Gnar Glove', price:49.95, weight:90,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com: MSRP $49.95 confirmed (was sample $50). D3O Impact'
      + ' Additive TPR knuckles. No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/gnar-glove/350020000200000037.html' },
  { id:'glv-giro-ladnd', cat:'gloves', brand:'Giro', model:'La DND Glove', price:29.95, weight:58,
    fitCut:'womens', sizes:['XS','S','M','L','XL'],
    desc:'VERIFIED 2026-07-17 via bdata-rendered giro.com "Women\'s La DND Glove": MSRP $29.95 confirmed'
      + ' (was sample $30). No weight published; stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.giro.com/product/women%27s-la-dnd-glove/350020000200000020.html' },
  { id:'glv-leatt-mtb-1-0-gripr', cat:'gloves', brand:'Leatt', model:'MTB 1.0 GripR Glove', price:38.49, weight:58,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx, not published). RE-CORRECTED 2026-07-17: the prior pass fetched the "-sale" URL (an older clearance-gen SKU, $17.99-24.99 by colorway) - wrong SKU. The plain product URL is the current, actively-stocked listing at $38.49, sizes S-XXL; status:discontinued removed accordingly. Non-impact MicronGrip-palm glove.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/glove-mtb-1-0-gripr' },
  { id:'glv-leatt-mtb-2-0-subzero', cat:'gloves', brand:'Leatt', model:'MTB 2.0 SubZero Glove', price:54.99, weight:100,
    sizes:['S','M','L','XL','XXL'],
    desc:'Cold-weather insulated glove. Weight per pair (approx, not published). RE-CORRECTED 2026-07-17: the prior pass fetched the "-sale" URL (older clearance-gen SKU, $23.99-32.49 by colorway) - wrong SKU. The plain product URL is the current, actively-stocked listing at $54.99; status:discontinued removed accordingly.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/glove-mtb-2-0-subzero' },
  { id:'glv-leatt-mtb-3-0-endurance', cat:'gloves', brand:'Leatt', model:'MTB 3.0 Endurance Glove', price:39.99, weight:68,
    sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx, not published). RE-CORRECTED 2026-07-17: the prior pass fetched the "-sale" URL (older clearance-gen SKU, $24.69 flat) - wrong SKU. The plain product URL is the current, actively-stocked listing at $39.99, sizes S-XL (no XXL currently offered); status:discontinued removed accordingly. Padded-palm touchscreen glove, no impact protection.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/glove-mtb-3-0-endurance' },
  { id:'glv-leatt-mtb-2-0-windblock', cat:'gloves', brand:'Leatt', model:'MTB 2.0 WindBlock Glove', price:54.99, weight:85,
    sizes:['S','M','L','XL','XXL'],
    desc:'Wind-resistant shoulder-season glove. Weight per pair (approx, not published). RE-CORRECTED 2026-07-17: the prior pass fetched the "-sale" URL (older clearance-gen SKU, $23.99-34.99 by colorway) - wrong SKU. The plain product URL is the current, actively-stocked listing at $54.99; status:discontinued removed accordingly.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/glove-mtb-2-0-windblock' },
  { id:'glv-leatt-mtb-5-0-endurance', cat:'gloves', brand:'Leatt', model:'MTB 5.0 Endurance Glove', price:84.99, weight:70,
    sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx, not published). RE-CORRECTED 2026-07-17: the prior pass fetched the "-sale" URL (older clearance-gen SKU, $19.99-59.99 wide clearance spread) - wrong SKU. The plain product URL is the current, actively-stocked listing at $84.99, sizes S-XL (no XXL currently offered); status:discontinued removed accordingly. Short-cut-finger X-Flow mesh glove, Italian-made biomechanical palm design.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/glove-mtb-5-0-endurance' },
  { id:'glv-leatt-mtb-4-0-lite', cat:'gloves', brand:'Leatt', model:'MTB 4.0 Lite Glove', price:74.99, weight:55,
    sizes:['S','M','L','XL'],
    desc:'Current-lineup lightweight trail glove: ultra-thin NanoGrip palm, mesh upper, 3D-molded ReaFlex knuckle impact gel (EN 13594:2015 - not one of the catalog\'s protectionCert tokens), FormFit pre-curved fingers, touchscreen-compatible. Price and sizes confirmed on us.leatt.com; weight not stated on the fetched page, so it stays a sample estimate.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/glove-mtb-4-0-lite' },
  { id:'glv-leatt-mtb-1-0-gripr-junior', cat:'gloves', brand:'Leatt', model:'MTB 1.0 GripR Glove - Junior', price:31.89,
    sizes:['Junior-S','Junior-M','Junior-L'],
    desc:'Genuine junior-specific SKU (its own product page, junior sizing), not a size run on the adult MTB 1.0 GripR Glove: ultra-slim MicronGrip palm, 360-degree stretch upper, touchscreen-compatible, lens/sweat wiper. Weight not published on the fetched page, stays unset.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/glove-mtb-1-0-gripr-junior' },
  { id:'glv-dakine-boundary', cat:'gloves', brand:'Dakine', model:'Boundary Bike Glove', price:40, weight:70,
    sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://www.dakine.com/products/boundary-bike-glove',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: standard colorways (Sun Flare, Black) are $40.00 USD, not $35 - corrected (a couple of limited variants sit at $35, but $40 is the base price). Sizes XS-XXL confirmed. Per-variant weight (per glove) sourced from the JSON - 70g uniform across sizes for the standard colorways.' },
  { id:'glv-dakine-synclinegel', cat:'gloves', brand:'Dakine', model:'Syncline Gel Bike Glove', price:40, weight:88,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://www.dakine.com/products/syncline-gel-bike-glove',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $40.00 USD confirmed (Black colorway), sizes XS-XL confirmed (no XXL currently offered). Per-variant weight (per glove) sourced from the JSON - 88g uniform across sizes for Black/Black-Tan/Steel Grey.' },
  { id:'glv-dakine-covert', cat:'gloves', brand:'Dakine', model:'Covert Bike Glove', price:35, weight:70,
    fitCut:'womens', sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://www.dakine.com/products/covert-bike-glove-womens',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: the standard Black colorway is $35.00 USD, not $25 - corrected (a discontinued "Black - W21" variant sits at $25, but $35 is the current base price). Sizes XS-XL confirmed. Per-variant weight (per glove) sourced from the JSON - 70g uniform across sizes for Black.' },
  { id:'glv-dakine-crossx2', cat:'gloves', brand:'Dakine', model:'Cross-X 2.0 Bike Glove', price:40, weight:64,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://www.dakine.com/products/cross-x-2-0-bike-glove',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $40.00 USD confirmed (One Love/Naval Academy/Vintage Camo colorways; Black sits higher at $44), sizes XS-XL confirmed (no XXL currently offered). Per-variant weight (per glove) sourced from the JSON (One Love: XS 68g, S 61g, M 64g, L 68g, XL 57g) - 64g (M) used as the representative figure.' },
  { id:'glv-dakine-vectra2', cat:'gloves', brand:'Dakine', model:'Vectra 2.0 Bike Glove', price:35, weight:29,
    sizes:['S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://www.dakine.com/products/vectra-2-0-bike-glove',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $35.00 USD confirmed (Vintage Camo/One Love/Sun Flare Grizzly colorways; Black sits higher at $39), sizes S-XL confirmed (no XXL currently offered). Per-variant weight (per glove) sourced from the JSON (S 25g, M 29g, L 32g, XL 36g) - 29g (M) used as the representative figure, correcting the prior 75g sample which was far off.' },
  { id:'glv-dakine-syncline', cat:'gloves', brand:'Dakine', model:'Syncline Bike Glove', price:30, weight:70,
    sizes:['XS','S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://www.dakine.com/products/syncline-bike-glove',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: the standard Black/Steel Grey colorway is $30.00 USD, not $25 - corrected (Dark Olive/Vintage Camo/Deep Blue sit at $32-36). Sizes XS-XL confirmed (no XXL currently offered). Per-variant weight (per glove) sourced from the JSON - 70g uniform across sizes for Black/Steel Grey/Black-Tan.' },
  { id:'glv-100-celium', cat:'gloves', brand:'100%', model:'Celium Glove', price:29.50, weight:55,
    sizes:['S','M','L','XL'],
    desc:'Minimalist, well-ventilated glove. Weight per pair (approx, unconfirmed; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed compare-at $29.50 (currently on a 40% sale to $17.70, not used here), sizes S-XL.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/celium-gloves-grey-mtb' },
  { id:'glv-100-itrack', cat:'gloves', brand:'100%', model:'iTrack Glove', price:34.95,
    sizes:['S','M','L','XL','XXL'],
    desc:'Moto/MTB crossover glove. Price and sizes confirmed on 100percent.com; weight not stated on the fetched page (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.100percent.com/collections/itrack-mtb' },
  { id:'glv-100-cognito', cat:'gloves', brand:'100%', model:'Cognito Glove', price:44.95,
    sizes:['S','M','L','XL','XXL'],
    desc:'Moto/MTB crossover glove with SMART SHOCK knuckle protection. Price and sizes confirmed on 100percent.com; weight not stated on the fetched page (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.100percent.com/collections/cognito-bike-gloves' },
  { id:'glv-100-rcore', cat:'gloves', brand:'100%', model:'R-Core Glove', price:36.50,
    sizes:['S','M','L','XL','XXL'],
    desc:'Entry-tier MTB/BMX riding glove. Price and sizes confirmed on 100percent.com (regular price, page showed a $21.90 sale); weight not stated on the fetched page (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.100percent.com/collections/r-core-gloves' },
  { id:'glv-poc-essentialdh', cat:'gloves', brand:'POC', model:'Essential Downhill Glove', price:80, weight:45,
    disciplines:['dh'], sizes:['XS','S','M','L','XL'],
    desc:'Weight per pair, size M (maker-stated; independently corroborated at 43g by third-party specs). Fetched poc.com: price $80 confirmed, corrected weight 85g -> 45g, added missing XS size.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/essential-dh-glove-uranium-black' },
  { id:'glv-poc-resistanceenduroadj', cat:'gloves', brand:'POC', model:'Resistance Enduro Adjustable Glove', price:80, weight:46,
    disciplines:['enduro'], sizes:['XS','S','M','L','XL'],
    desc:'Weight per pair, size M (maker-stated). Fetched poc.com: price $80 confirmed, corrected weight 95g -> 46g, added missing XS size.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/resistance-enduro-adj-glove-uranium-black-uranium-black' },
  { id:'glv-poc-savant', cat:'gloves', brand:'POC', model:'Savant MTB Glove', price:55, weight:16,
    sizes:['XS','S','M','L','XL'],
    desc:'Weight per pair, size M (maker-stated - a minimalist single-layer "second-skin" glove, hence the very low figure). Fetched poc.com: price $55 confirmed, corrected weight 65g -> 16g, added missing XS size.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/savant-mtb-glove-uranium-black' },
  { id:'glv-poc-resistanceprodh', cat:'gloves', brand:'POC', model:'Resistance Pro Downhill Glove', price:110, weight:78,
    disciplines:['dh'], sizes:['XS','S','M','L','XL'],
    desc:'Weight per pair, size M (maker-stated; independently corroborated at 78g by third-party specs). Fetched poc.com: price $110 confirmed, corrected weight 100g -> 78g, added missing XS size.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/resistance-pro-dh-glove-uranium-black' },
  { id:'glv-poc-thermalcycling', cat:'gloves', brand:'POC', model:'Thermal Cycling Glove', price:120, weight:140,
    sizes:['XS','S','M','L','XL'],
    desc:'Cold-weather insulated glove (Primaloft Gold Aerogel). Weight per pair (approx) - a poc.com fetch returned a 30g figure but that contradicts an independent Amazon listing (~113g/4oz) badly enough that it looks like a misread, so the weight is deliberately NOT corrected off it and the existing 140g sample is kept (kit weight policy: never blocks verification). Fetched poc.com confirmed price $120 exactly and added the missing XS size.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://poc.com/en-us/product/thermal-glove-uranium-black' },
  { id:'glv-alpinestars-drop4', cat:'gloves', brand:'Alpinestars', model:'Drop 4.0 Glove', price:34.95,
    sizes:['S','M','L','XL','XXL','XXXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.alpinestars.com/products/drop-4-0-gloves-red',
    desc:'RE-CHECKED 2026-07-16 via the .js JSON endpoint: MSRP (compare_at_price) $34.95 confirmed exactly'
      + ' (currently on sale at $20.97), sizes S-3XL confirmed. No weight published on the page - the prior'
      + ' 65g sample is dropped rather than carried as an unverified claim on an otherwise-verified row.' },
  { id:'glv-alpinestars-stellaaduthermal', cat:'gloves', brand:'Alpinestars', model:'Stella A-Dura Thermal Glove', price:64.95, weight:110,
    fitCut:'womens', sizes:['XS','S','M','L','XL'],
    desc:'Cold-weather insulated glove, women\'s-dedicated fit confirmed on the maker page. Weight per pair (approx). Price corrected against the fetched maker page (was $65). VERIFIED 2026-07-17: re-fetched alpinestars.com/products/stella-a-dura-thermal-gloves, $64.95, sizes XS-XL, women\'s-dedicated fit all confirmed. No weight published; stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/stella-a-dura-thermal-gloves' },
  { id:'glv-alpinestars-stellaadurarain', cat:'gloves', brand:'Alpinestars', model:'Stella A-Dura Rain Glove', price:59.95, weight:95,
    fitCut:'womens', sizes:['XS','S','M','L','XL'],
    desc:'Weather-resistant glove, women\'s-specific per the maker page. Weight per pair (approx). Price corrected against the fetched maker page (was $60). VERIFIED 2026-07-17: re-fetched alpinestars.com/products/stella-a-dura-rain-gloves, $59.95, sizes XS-XL, women\'s-specific fit all confirmed. No weight published; stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/stella-a-dura-rain-gloves' },
  { id:'glv-sweetprotection-hunterlight', cat:'gloves', brand:'Sweet Protection', model:'Hunter Light Glove', price:42, weight:36,
    sizes:['S','M','L','XL'],
    desc:'Maker states weight "36g" without specifying single-glove-vs-pair (kept as-published rather than guessed-doubled). Price is EUR39 converted at ~1.08 USD/EUR (no USD price shown on the EU page); sizes corrected to the maker\'s S-XL run.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-16', source:'https://www.sweetprotection.com/eu/en/hunter-light-bike-gloves-mens-black/' },
  { id:'glv-sweetprotection-huntermid', cat:'gloves', brand:'Sweet Protection', model:'Hunter Mid Glove', price:40, weight:65, status:'discontinued',
    sizes:['S','M','L','XL','XXL'],
    desc:'RE-CHECKED kit-7 (2026-07-20): the old product-id URL (828052.html) from the 2026-07-16'
      + ' pass still 404s. Confirmed via search across sweetprotection.com\'s current catalog: the'
      + ' full glove lineup is exactly three tiers - Hunter, Hunter Light, Hunter Pro - no "Mid"'
      + ' tier at any price point. Tagged discontinued rather than guessing which of the three'
      + ' tiers it should map to.' },
  { id:'glv-sweetprotection-hunterrace', cat:'gloves', brand:'Sweet Protection', model:'Hunter Race Glove', price:45, weight:70, status:'discontinued',
    sizes:['S','M','L','XL','XXL'],
    desc:'RE-CHECKED kit-7 (2026-07-20): the old product-id URL (828051.html) from the 2026-07-16'
      + ' pass still 404s. Confirmed via search across sweetprotection.com\'s current catalog: the'
      + ' full glove lineup is exactly three tiers - Hunter, Hunter Light, Hunter Pro - no "Race"'
      + ' tier at any price point. Tagged discontinued rather than guessing which of the three'
      + ' tiers it should map to.' },
  { id:'glv-ixs-carve', cat:'gloves', brand:'iXS', model:'Carve Glove', price:33, weight:65,
    sizes:['S','M','L','XL','XXL'],
    desc:'Preformed slip-on, abrasion-resistant synthetic palm, touchscreen-compatible, 90%'
      + ' polyester/10% elastane. EUR29.90 RRP converted to $33 USD sample - no US MSRP page'
      + ' found. Weight per pair (approx, not published).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-carve-handschuhe-schwarz' },
  { id:'glv-ixs-carvedigger', cat:'gloves', brand:'iXS', model:'Carve Digger Glove', price:46, weight:80,
    sizes:['S','M','L','XL','XXL'],
    desc:'Reinforced palm/fingertips for digging durability, touchscreen-compatible. EUR42.90'
      + ' RRP converted to $46 USD sample - no US MSRP page found. Weight per pair (approx, not'
      + ' published).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-carve-digger-handschuhe-schwarz' },
  { id:'glv-ixs-carvewomens', cat:'gloves', brand:'iXS', model:'Women\'s Carve Glove', price:34, weight:60,
    fitCut:'womens', sizes:['XS','S','M','L'],
    desc:'Low-volume women\'s fit, abrasion-resistant synthetic palm, touchscreen-compatible.'
      + ' EUR29.90 RRP converted to $34 USD sample - no US MSRP page found. Weight per pair'
      + ' (approx, not published).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/damen-carve-handschuhe-sage' },
  { id:'glv-scott-ridance', cat:'gloves', brand:'Scott', model:'Ridance LF Glove', price:30, weight:60,
    sizes:['S','M','L','XL','XXL'], desc:'Weight per pair (approx). ATTEMPTED 2026-07-17: scott-sports.com JS-walled for US product pages (/us/en/product/scott-ridance-lf-glove 404s; gb/global variants exist but aren\'t the US MSRP page); left unverified.' },
  { id:'glv-scott-traction', cat:'gloves', brand:'Scott', model:'Traction LF Glove', price:28, weight:62,
    sizes:['S','M','L','XL','XXL'], desc:'Weight per pair (approx). ATTEMPTED 2026-07-17: scott-sports.com JS-walled for US product pages (see glv-scott-ridance); left unverified.' },
  { id:'glv-scott-tractiontuned', cat:'gloves', brand:'Scott', model:'Traction Tuned LF Glove', price:35, weight:65,
    sizes:['S','M','L','XL','XXL'], desc:'Weight per pair (approx). ATTEMPTED 2026-07-17: scott-sports.com JS-walled for US product pages (see glv-scott-ridance); left unverified.' },
  { id:'glv-sixsixone-comp', cat:'gloves', brand:'SixSixOne', model:'Comp Glove', price:25, weight:58,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). Checked 2026-07-16: sixsixone.com now returns 403 Forbidden on every path (root included) - press coverage (Singletracks, BikeMag, "SixSixOne Stops Responding to Customers, Scrubs Website") confirms the brand has gone dark since mid/late-2024 (parent Bravo Sports in Chapter 11), site scrubbed with no live product pages. Left unchanged as an unverified sample; likely-defunct brand.' },
  { id:'glv-sixsixone-recon', cat:'gloves', brand:'SixSixOne', model:'Recon Glove', price:35, weight:75,
    disciplines:['enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). Checked 2026-07-16: no live SixSixOne maker storefront (see glv-sixsixone-comp for detail). Left unchanged as an unverified sample.' },
  { id:'glv-sixsixone-reconadvance', cat:'gloves', brand:'SixSixOne', model:'Recon Advance Glove', price:45, weight:85,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'],
    desc:'D3O impact foam. Weight per pair (approx). Checked 2026-07-16: no live SixSixOne maker storefront (see glv-sixsixone-comp for detail).' },
  { id:'glv-oneal-amx', cat:'gloves', brand:'O\'Neal', model:'AMX Glove', price:25, weight:55,
    sizes:['S','M','L','XL','XXL'], desc:'UNVERIFIED (2026-07-17): no live AMX-branded glove found on oneal.com (US storefront) - AMX gloves list only on oneal.eu, suggesting this SKU may be moto/EU-only. Left as an unverified sample pending a scope call rather than fabricating a US source.' },
  { id:'glv-oneal-element', cat:'gloves', brand:'O\'Neal', model:'Element Glove', price:24.99, weight:60,
    sizes:['S','M','L','XL','XXL'],
    desc:'Fetched oneal.com/collections/element-glove: CORRECTED price $18 -> $24.99 (all 7 colorways list at that price). Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://oneal.com/collections/element-glove' },
  { id:'glv-oneal-matrix', cat:'gloves', brand:'O\'Neal', model:'Matrix Glove', price:24.99, weight:65,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx, not published on the maker page). Fetched oneal.com (Matrix'
      + ' Glove Stacked Black): corrected price $22 -> $24.99; sizes confirmed (8/9/10/11/12 ='
      + ' S/M/L/XL/XXL). Kit-7 (2026-07-20): formalizing verified:true - weight is not required'
      + ' for kit apparel (Douglas 2026-07-19); every other field is manufacturer-confirmed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://oneal.com/products/matrix-glove-stacked-black' },
  { id:'glv-flyracing-kinetic', cat:'gloves', brand:'Fly Racing', model:'Kinetic Glove', price:33, weight:68,
    sizes:['XS','S','M','L','XL','XXL','XXXL'],
    desc:'Corrected price ($28 sample -> $33, fetched flyracing.com/kinetic-gloves/ regular $32.95)'
      + ' and sizes to the maker\'s XS-3XL run. Fly markets Kinetic primarily for "motocross, BMX,'
      + ' and off-road performance" (not MTB-specific), though it is also listed in Fly\'s'
      + ' Bicycle > MTB > Gloves collection. Kit-7 (2026-07-20): re-confirmed live at $32.95,'
      + ' formalizing verified:true - weight not required for kit apparel (stays sample).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://flyracing.com/kinetic-gloves/' },
  { id:'glv-flyracing-media', cat:'gloves', brand:'Fly Racing', model:'Media Glove', price:25, weight:62,
    sizes:['S','M','L','XL','XXL'],
    desc:'FLAG for coordinator review (2026-07-16): the only Media Glove page found is a legacy pre-2018 URL pattern (flyracing.com/product/mtb/riderwear/gloves/media-glove/...) not reachable on the current site; likely discontinued. Left as an unverified sample.' },
  { id:'glv-royalracing-apex', cat:'gloves', brand:'Royal Racing', model:'Apex Glove - LTD Edition', price:38, weight:65,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Corrected price ($40 sample -> $38, GBP29.99 fetched regular price converted at ~1.27'
      + ' USD/GBP) and sizes to the maker\'s XS-XXL run. Kit-7 (2026-07-20): the full current'
      + ' royalracing.com/collections/gloves lineup (browser-rendered) shows Apex Glove only ever'
      + ' sold as "LTD Edition" colorways (Black/Blast/Rally, all GBP29.99 - the exact match for'
      + ' this row) - model name disambiguated to match; not a special/rotating limited run despite'
      + ' the name, it is the standing current SKU. Formalizing verified:true - weight not required'
      + ' for kit apparel (stays sample).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://royalracing.com/collections/gloves' },
  { id:'glv-royalracing-core', cat:'gloves', brand:'Royal Racing', model:'Core Glove', price:32, weight:60,
    sizes:['XS','S','M','L','XL','XXL'],
    desc:'Corrected price ($25 sample -> $32, GBP24.99 fetched regular price converted at ~1.27'
      + ' USD/GBP, royalracing.com/products/core-glove-black) and sizes to the maker\'s XS-XXL run.'
      + ' Kit-7 (2026-07-20): re-confirmed live at GBP24.99 exactly, hook-and-loop (velcro) closure'
      + ' + AX suede palm confirmed. Formalizing verified:true - weight not required for kit apparel'
      + ' (stays sample).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://royalracing.com/products/core-glove-black' },
  { id:'glv-handup-mostdays', cat:'gloves', brand:'Handup', model:'Most Days Glove', price:29, weight:60,
    sizes:['XXS','XS','S','M','L','XL','XXL','XXXL'],
    desc:'Weight per pair (approx, not published on the maker page). Fetched handupco.com: corrected'
      + ' price $27 -> $29.00 and added the maker\'s full XXS-XXXL size range (was missing'
      + ' XXS/XS/XXXL). Kit-7 (2026-07-20): re-confirmed live at $29.00 exactly (Pure Black'
      + ' colorway, one of 29 current Most Days styles), FullTouch touchscreen palm + stretch-cuff'
      + ' pull-on (no velcro strap) confirmed. Formalizing verified:true - weight not required for'
      + ' kit apparel (stays sample).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.handupco.com/products/gloves-pure-black' },
  { id:'glv-bluegrass-prizma3d', cat:'gloves', brand:'Bluegrass', model:'Prizma 3D Glove', price:49, weight:80,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL'],
    desc:'3D TPR knuckle protection. Re-fetched met-helmets.com (2026-07-17): price EUR45 (~$49 at ~1.08 USD/EUR), sizes XS-XL confirmed. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-17', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-gloves/prizma-3d/' },
  { id:'glv-bluegrass-vaporlite', cat:'gloves', brand:'Bluegrass', model:'Vapor Lite Glove', price:38, weight:31,
    disciplines:['xc','trail'], sizes:['XS','S','M','L','XL'],
    desc:'Price/sizes confirmed on met-helmets.com (maker lists EUR35, converted at ~1.08 USD/EUR; weight not stated there). Weight is BikeRadar\'s measured figure, per pair, size M.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-16', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-gloves/vapor-lite/',
    sourceType:'measured', weightSource:'https://www.bikeradar.com/reviews/clothing/gloves/bluegrass-vapour-lite-gloves-review' },
  { id:'glv-bluegrass-react', cat:'gloves', brand:'Bluegrass', model:'React Glove', price:43, weight:62,
    sizes:['XS','S','M','L','XL'],
    desc:'Re-fetched met-helmets.com (2026-07-17): price EUR40 (~$43 at ~1.08 USD/EUR), sizes XS-XL confirmed. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-17', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-gloves/react/' },
  { id:'glv-bluegrass-union', cat:'gloves', brand:'Bluegrass', model:'Union Glove', price:32, weight:68,
    sizes:['XS','S','M','L','XL'],
    desc:'Re-fetched met-helmets.com (2026-07-17): price EUR30 (~$32 at ~1.08 USD/EUR), sizes XS-XL confirmed. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-17', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-gloves/union/' },
  { id:'glv-endura-hummveeliteicon', cat:'gloves', brand:'Endura', model:'Hummvee Lite Icon Glove', price:35, weight:50,
    sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/hummvee-lite-icon-gloves-black-re1258bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Hummvee Lite Icon Gloves", "$35.00 USD" (was sampled at $22, corrected), sizes S-2XL. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'glv-endura-singletrackwindproof', cat:'gloves', brand:'Endura', model:'SingleTrack Windproof Glove', price:45, weight:95,
    sizes:['S','M','L','XL','XXL'],
    status:'discontinued',
    desc:'RESOLVED 2026-07-17 via bdata search: confirmed real (multiple retailer + review hits including an "Endura Singletrack Windproof MTB glove review" and LordGun\'s store listing) - it has since been dropped from endurasport.com (current sitemap only shows "SingleTrack Waterproof Gloves"/"SingleTrack Gloves", re-confirmed across three sessions now). Marked discontinued rather than removed; price/weight remain the prior sample (no live page to verify against).' },
  { id:'glv-endura-xtractmitt', cat:'gloves', brand:'Endura', model:'Xtract Mitt', price:35, weight:45,
    sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/xtract-mitts-bright-yellow-re1281yv',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "Xtract Mitts", "$35.00 USD" (was sampled at $20, corrected), fingerless mitts, sizes XS-2XL. Corrected fitCut - the maker tags this gender_Unisex (Men\'s and Women\'s), not a women\'s-specific cut, so the prior `fitCut:\'womens\'` was dropped and sizes extended from XS-L to the real XS-2XL run. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'glv-troyleedesigns-luxe', cat:'gloves', brand:'Troy Lee Designs', model:'Luxe Glove', price:40, weight:54, fitCut:'womens',
    sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/sp22-womens-luxe-solid-glove-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $39.99 USD compare-at price confirmed (rounded to $40); TLD sells this as a womens-specific glove. Per-variant weight (per glove) sourced from the JSON (SM/MD 54g, LG/XL 59g, 2X 64g) - 54g (MD) used as the representative figure.' },
  { id:'glv-troyleedesigns-sprint', cat:'gloves', brand:'Troy Lee Designs', model:'Sprint Glove', price:28, weight:55,
    sizes:['S','M','L','XL'],
    desc:'FLAG for coordinator review (2026-07-16): the base Sprint Gloves collection (troyleedesigns.com/collections/bike-mens-glove-sprint) shows 0 products - likely discontinued/out of production (Sprint Pro and Sprint Ultra tiers remain current). Left as an unverified sample pending a decision to retarget or remove this row.' },
  { id:'glv-troyleedesigns-ruckus', cat:'gloves', brand:'Troy Lee Designs', model:'Ruckus Glove', price:42, weight:75,
    sizes:['S','M','L','XL'],
    desc:'FLAG for coordinator review (2026-07-16): the only Ruckus Glove page found on troyleedesigns.com is a 2018-dated URL that redirects to the general bike collection - likely discontinued. Left as an unverified sample pending a decision to retarget or remove this row.' },
  { id:'glv-specialized-trailair', cat:'gloves', brand:'Specialized', model:'Trail Air Glove', price:29.99, weight:60,
    sizes:['S','M','L','XL','XXL'],
    desc:'Micro-vented palm, power-knit mesh between fingers. $29.99 confirmed live but that is'
      + ' the WOMEN\'S Trail Air Gloves price - the men\'s version is $34.99 on the same page;'
      + ' this row is not gender-specific, so the lower confirmed price is kept (browser-rendered'
      + ' specialized.com/us/en - WebFetch 403s on this domain). Weight not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/shop/cycling-clothing/cycling-gloves' },
  { id:'glv-specialized-bggrail', cat:'gloves', brand:'Specialized', model:'Body Geometry Grail Glove', price:39.99, weight:80,
    sizes:['S','M','L','XL','XXL'],
    desc:'Equalizer palm pad reduces pressure on the ulnar nerve. $39.99 confirmed live matches'
      + ' the Body Geometry Grail SHORT Finger Gloves; the Long Finger version is $44.99 on the'
      + ' same page and this row does not specify finger length, so the confirmed lower price is'
      + ' kept (browser-rendered specialized.com/us/en - WebFetch 403s on this domain). Weight'
      + ' not published, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.specialized.com/us/en/shop/cycling-clothing/cycling-gloves' },
  { id:'glv-madison-dte', cat:'gloves', brand:'Madison', model:'DTE 4 Season DWR Glove', price:32, weight:110,
    sizes:['XS','S','M','L','XL','XXL'],
    desc:'Waterproof/windproof winter glove with Thinsulate insulation. Weight per pair (approx), no'
      + ' maker weight published (kit weight policy: never blocks verification). VERIFIED kit-13'
      + ' (2026-07-21): fetched madison.cc\'s own product page (browser pane) - confirms GBP24.99'
      + ' regular price (was on a GBP19.99 sale at fetch time, MSRP used per pricing policy), sizes'
      + ' XS-XXL (added XS, missing from the prior sample), windproof/DWR/touchscreen-compatible'
      + ' features. Price is a USD estimate converted from the confirmed GBP24.99 MSRP.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-21',
    source:'https://www.madison.cc/product/madison-dte-4-season-dwr-gloves-varmcl23w63/VARMCL23W63/MCL23W6307' },
  { id:'glv-madison-flux', cat:'gloves', brand:'Madison', model:'Flux Glove', price:32, weight:55,
    sizes:['S','M','L','XL','XXL'],
    desc:'Super-light mountain bike glove, perforated palm, silicone brake-lever grip. Weight per'
      + ' pair (approx), no maker weight published. VERIFIED kit-13 (2026-07-21): fetched'
      + ' madison.cc\'s own product page (browser pane) - confirms GBP24.99 regular price (was on a'
      + ' GBP9.99 sale at fetch time, MSRP used per pricing policy) and the lightweight/perforated'
      + ' description; only size S was shown selectable for the fetched color at this stock'
      + ' snapshot, so the full S-XXL size range is carried forward unconfirmed rather than'
      + ' re-asserted as fetched. Price is a USD estimate converted from the confirmed GBP24.99 MSRP.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-21',
    source:'https://www.madison.cc/product/madison-flux-gloves-varmcl22s82/VARMCL22S82/MCL22S8212' },
  { id:'glv-clubride-ladyfinger', cat:'gloves', brand:'Club Ride', model:'Lady Finger Glove', price:30, weight:55,
    fitCut:'womens', sizes:['S','M','L'],
    desc:'Price ($30) and current S/M/L size range re-confirmed on clubrideapparel.com 2026-07-20 (page no longer lists XS/XL); weight per pair remains an unconfirmed approx sample (not stated on the product page - kit apparel does not require it).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.clubrideapparel.com/products/womens-gloves' },
  { id:'glv-dharco-race', cat:'gloves', brand:'DHaRCO', model:'Race Glove', price:44.95, weight:60,
    sizes:['S','M','L','XL'],
    desc:'Fetched us.dharco.com: CORRECTED price $35 -> $44.95, sizes S-XL (no XXL). Velcro-less easy entry, silicone palm grip, 2025 redesign. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.dharco.com/products/mens-race-glove-black-1' },
  { id:'glv-dharco-trail', cat:'gloves', brand:'DHaRCO', model:'Trail Glove', price:32, weight:58,
    sizes:['S','M','L','XL','XXL'],
    desc:'UNVERIFIED (2026-07-17): no "Trail Glove" SKU found on us.dharco.com - the current men\'s glove lineup is Race Glove and Gravity Gloves only. Left as an unverified sample rather than guessing which current SKU this maps to.' },
  { id:'glv-zoic-turnt', cat:'gloves', brand:'ZOIC', model:'Turnt Glove', price:35, weight:62,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). Price re-confirmed via retailer listings (unchanged) - zoic.com\'s product/category pages 404 or return nav-shell-only content on fetch (JS-rendered catalog, likely bot-walled) despite the homepage itself loading fine, so this stays unverified.'
      + ' CHECKED kit-13 (2026-07-21): zoic.com now loads cleanly via browser pane (JS-rendered ≠'
      + ' walled per doctrine) - fetched zoic.com/products.json (75 SKUs, the full current'
      + ' catalog): zero products with "glove" in the title. ZOIC has exited the gloves category'
      + ' entirely (only size-chart pages remain, orphaned). Confirmed discontinued. Left unverified, no fields changed.' },
  { id:'glv-zoic-ether', cat:'gloves', brand:'ZOIC', model:'Ether Glove', price:35, weight:58,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). Corrected price ($30 sample -> $35), consistent across multiple retailers (Jenson USA, Competitive Cyclist, Cambria Bike). zoic.com\'s own product pages 404/nav-shell-only on fetch, so this stays unverified (retailer-sourced, not manufacturer-fetched).'
      + ' CONFIRMED kit-13 (2026-07-21): see glv-zoic-turnt - zoic.com/products.json (75-SKU full'
      + ' current catalog, browser pane) has zero glove products. Discontinued. Left unverified, no fields changed.' },
  { id:'glv-zoic-empire', cat:'gloves', brand:'ZOIC', model:'Empire Glove', price:35, weight:60,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). Corrected price ($32 sample -> $35), consistent across multiple retailers (Cambria Bike $35, Planet Cyclery $35 regular/$19.99 sale). zoic.com\'s own product pages 404/nav-shell-only on fetch, so this stays unverified.'
      + ' CONFIRMED kit-13 (2026-07-21): see glv-zoic-turnt - zoic.com/products.json has zero'
      + ' glove products in its current 75-SKU catalog. Discontinued. Left unverified, no fields changed.' },
  { id:'glv-zoic-sarge', cat:'gloves', brand:'ZOIC', model:'Sarge Full-Finger Glove', price:35, weight:65,
    sizes:['S','M','L','XL','XXL'],
    desc:'Weight per pair (approx). Corrected price ($28 sample -> $35), consistent across multiple retailers (Valley Bike & Ski Shop lists $35 regular/$20.97 sale). zoic.com\'s own product pages 404/nav-shell-only on fetch, so this stays unverified.'
      + ' CONFIRMED kit-13 (2026-07-21): see glv-zoic-turnt - zoic.com/products.json has zero'
      + ' glove products in its current 75-SKU catalog. Discontinued. Left unverified, no fields changed.' },
  { id:'glv-pearlizumi-elitegel-ff', cat:'gloves', brand:'Pearl Izumi', model:'Elite Gel Full Finger Glove', price:50, weight:91,
    sizes:['S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed',
    desc:'3D gel padding relieves palm pressure. Price corrected 2026-07-16: fetched pearlizumi.com/products/mens-elite-gel-full-finger-gloves-14142003 lists $50.00 (catalog previously had $45); sizes S-XXL confirmed. RE-CONFIRMED 2026-07-17 via bdata re-fetch of the .js product JSON: price $50.00 flat (no sale), matches; per-glove weight is a flat 91g across all sizes S-XXL (accepted as the real figure, not a placeholder, per the glv-dakine-crossx precedent of a legitimate flat per-glove Shopify weight) - corrected from the prior 65g sample.', lastChecked:'2026-07-17', source:'https://www.pearlizumi.com/products/mens-elite-gel-full-finger-gloves-14142003' },
  { id:'glv-sombrio-vanquish', cat:'gloves', brand:'Sombrio', model:'Vanquish Glove', price:35, weight:75,
    disciplines:['dh'], sizes:['S','M','L','XL'], desc:'Recycled-polyester palm, silicone knuckle protection. Weight per pair (approx). Checked 2026-07-16: no live Sombrio maker storefront remains to re-verify against (see jsy-sombrio-badass-ls for detail).' },
  { id:'glv-sombrio-spun', cat:'gloves', brand:'Sombrio', model:'Spun Glove', price:28, weight:55,
    sizes:['S','M','L','XL'], desc:'Ultra-lightweight minimalist glove. Weight per pair (approx). Checked 2026-07-16: no live Sombrio maker storefront (see jsy-sombrio-badass-ls for detail).' },
  { id:'glv-sombrio-cartel', cat:'gloves', brand:'Sombrio', model:'Cartel Glove', price:32, weight:62,
    sizes:['S','M','L','XL'], desc:'Weight per pair (approx). Checked 2026-07-16: no live Sombrio maker storefront (see jsy-sombrio-badass-ls for detail).' },
  { id:'glv-sombrio-epik', cat:'gloves', brand:'Sombrio', model:'Epik Glove', price:30, weight:60,
    sizes:['S','M','L','XL'], desc:'Weight per pair (approx). Checked 2026-07-16: no live Sombrio maker storefront (see jsy-sombrio-badass-ls for detail).' },
  { id:'glv-kaliprotectives-laguna', cat:'gloves', brand:'Kali Protectives', model:'Laguna Glove', price:27,
    sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.kaliprotectives.com/products/laguna-glove',
    desc:'Lightweight, medium-duty trail glove with good articulation. Price confirmed via the .js JSON'
      + ' endpoint ($27.00 flat, price==compare_at_price across colorways). No weight published on the page.' },
  { id:'glv-kaliprotectives-mission', cat:'gloves', brand:'Kali Protectives', model:'Mission Glove', price:30,
    sizes:['XS','S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.kaliprotectives.com/products/mission-glove',
    desc:'Ultralight minimalist slip-on glove. Price confirmed via the .js JSON endpoint: $30.00 is the'
      + ' compare_at_price (MSRP) most colorways sell at; one colorway (Camo Gray) is on sale at $15. No'
      + ' weight published on the page.' },

  /* -- Knee pads (per pair; certs left to the grind + a source) --
     Breadth pass (grind/kit-kneepad, 2026-07-14): 20 additional real products
     across 9 brands, light-trail through DH. All UNVERIFIED sample data (no
     verified/source) - real products at best-credible specs, never fabricated,
     per the catalog's relaxed-inclusion policy. No `certs` asserted on any row
     below: a cert is a safety claim (fetched-source-only per KIT-BUILDER-SCOPE.md
     §2a) and manufacturer product pages could not be reliably fetched during this
     pass - absence is honest; a guessed EN 1621-1 level would not be. */
  { id:'knp-oneal-parkfr-carbon', cat:'kneepad', brand:'O\'Neal', model:'Park FR Knee Pads CARBON', price:75,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Entered seat-19 (2026-07-22) on Douglas\'s ruling replacing the retired retailer-bundle'
      + ' knee/shin row (shg-oneal-parkfr, see KIT_ALIASES). Identity from kit-13\'s 2026-07-21'
      + ' browser-pane fetch of oneal.eu: "O\'NEAL PARK FR Knee pads CARBON", EUR69.99 regular'
      + ' price, knee-only. Price is an undisclosed-rate EUR->USD sample estimate; no US maker'
      + ' price found and no weight published - stays UNVERIFIED sample until a fresh maker fetch'
      + ' pins price/spec.', lastChecked:'2026-07-22' },
  { id:'knp-gform-pro-x3', cat:'kneepad', brand:'G-Form', model:'Pro-X3 Knee', price:74.99, weight:280,
    disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','2XL'],
    desc:'Weight per pair (approx, not published on the fetched page - kept as prior sample). Fetched g-form.com: CORRECTED price $70 -> $74.99, sizes corrected to XS-2XL. Page states "PPE II certified" without naming an EN1621 standard number, so no certs token added per THE BAR (a vague claim doesn\'t meet the safety-claim bar).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-18', source:'https://g-form.com/products/knee-pads-mountain-bike-prox3' },
  { id:'knp-fox-launch-pro', cat:'kneepad', brand:'Fox', model:'Launch Pro D3O Knee', price:169.95, weight:420,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx). CORRECTED 2026-07-17: price is the fetched $169.95 list for the current "Launch Pro Knee Pads" (was sample $90, a large understatement). Maker page states EN1621-1 Level 1 CE certification. No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/launch-pro-knee-pads/30606.html' },
  { id:'knp-troyleedesigns-speed', cat:'kneepad', brand:'Troy Lee Designs', model:'Speed Knee Sleeve', price:69, weight:227,
    disciplines:['trail','enduro'], sizes:['XS/SM','MD/LG','XL/2XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/speed-knee-sleeve-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $69.00 USD compare-at price confirmed, sizes confirmed. Per-variant weight (per pad) sourced from the JSON gave XS/SM 227g and XL/2X 363g, consistent with a size progression; the JSON\'s MD/LG figure (644g) breaks that progression and looks like a data-entry outlier, so it is excluded rather than trusted - 227g (XS/SM) used as the representative figure. No cert standard published.' },
  { id:'knp-fox-enduro-d3o', cat:'kneepad', brand:'Fox', model:'Enduro D3O Knee Guard', family:'fox-enduro-knee', price:109.95, weight:350,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx). CORRECTED 2026-07-17: price is the fetched $109.95 list for the current "Enduro Knee Guard" (was sample $85). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/enduro-knee-guard/38041.html' },
  { id:'knp-fox-enduro-pro-d3o', cat:'kneepad', brand:'Fox', model:'Enduro Pro D3O Knee Pads', family:'fox-enduro-knee', price:129.95,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'CORRECTED 2026-07-17: foxracing.com is now reachable via a bot-unblocker (was JS-title-only to plain WebFetch). Current maker product is "Enduro Pro Knee Guards" at $129.95 list (was sample $115 from a bikeradar editorial review). No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/enduro-pro-knee-guards/32122.html' },
  { id:'knp-poc-joint-vpd', cat:'kneepad', brand:'POC', model:'Joint VPD System Knee', family:'poc-joint-vpd', price:90, weight:330,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14', source:'https://poc.com/en/product/joint-vpd-system-knee-uranium-black',
    desc:'Weight per pair, size M, per the fetched poc.com product page (EN 1621-1 Level 1); price is a USD sample (page lists EUR pricing).' },
  { id:'knp-poc-vpd-air', cat:'kneepad', brand:'POC', model:'VPD Air Knee', family:'poc-vpd-air', price:80, weight:220,
    certs:['en1621-1-l1'], disciplines:['trail'], sizes:['XS','S','M','L','XL'],
    source:'https://poc.com/en-us/product/joint-vpd-air-knee-uranium-black',
    desc:'Weight per pair, size M (approx, kept unchanged - see note). Fetched poc.com (Joint VPD Air Knee): confirmed EN 1621-1 Level 1, corrected price $70 -> $80, added missing XS size. The maker page itself listed per-size weights of 510-570g, but that flatly contradicts an independent third-party spec for POC\'s VPD Air Flow Knee (~110g/pad, ~220g/pair) and would make the "Air" lightweight line heavier than POC\'s heavier VPD 2.0/System models - almost certainly a page data error (or a different SKU\'s weight bleeding in), so it is deliberately NOT used; the existing 220g sample (which matches the third-party figure) is kept instead (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17' },
  { id:'knp-leatt-airflex-pro', cat:'kneepad', brand:'Leatt', model:'AirFlex Pro Knee Guard', family:'leatt-airflex', price:110, weight:370,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], status:'discontinued',
    desc:'Weight per pair (approx). Checked 2026-07-16: the AirFlex line no longer appears anywhere in us.leatt.com\'s current catalog (searched all ~1490 listed products) and the legacy leatt.com/us/product/ URLs now 301-redirect to the us.leatt.com homepage - Leatt\'s current knee-guard lineup is ReaFlex (premium) / 3DF (mid) / FlexMesh (entry). Flagged discontinued; price/weight left as prior sample (no live page to verify against).' },
  { id:'knp-leatt-airflex', cat:'kneepad', brand:'Leatt', model:'AirFlex Knee Guard', family:'leatt-airflex', price:80, weight:300,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], status:'discontinued',
    desc:'Weight per pair (approx). Checked 2026-07-16: same AirFlex-line-not-found finding as the AirFlex Pro sibling row - flagged discontinued, price/weight left as prior sample.' },
  { id:'knp-leatt-3df-6-0', cat:'kneepad', brand:'Leatt', model:'3DF 6.0 Knee Guard', family:'leatt-3df', price:77.35, weight:530,
    disciplines:['enduro','dh'], sizes:['S/M','L/XL','XXL'], status:'discontinued',
    desc:'Weight/price per the fetched page (530g S/M and L/XL, 540g XXL; price uniform across sizes). The SKU is tagged Obsolete with every variant out of stock, so flagged discontinued, but the manufacturer-published spec itself is solid.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/knee-guard-3df-6-0-sale' },
  { id:'knp-leatt-6-0-evo', cat:'kneepad', brand:'Leatt', model:'Knee Guard 6.0 Evo', family:'leatt-6-0-evo', price:149,
    certs:['en1621-1-l2'], disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/knee-guard-6-0-evo',
    desc:'Current Leatt knee-guard lineup member (fetched us.leatt.com/collections/mtb-protection/knee-guards 2026-07-16), a newer/higher tier than the discontinued 3DF 6.0 sibling row. CE Level 2 (3DF ventilated impact foam + hard-shell sliders). No weight published on the page, so omitted rather than guessed.' },
  { id:'knp-100-ridecamp', cat:'kneepad', brand:'100%', model:'Ridecamp Knee Guard', family:'100-ridecamp', price:60, weight:260,
    disciplines:['trail'], sizes:['S/M','L/XL'],
    desc:'Weight per pair (approx). RE-CHECKED 2026-07-19 via browser pane (both'
      + ' 100percent.com and 100percent.eu, both WebFetch-walled): the current Ridecamp'
      + ' collection lists only the SS/LS jersey and Moto/MTB gloves - no knee guard SKU.'
      + ' Appears discontinued. Left unverified, no fields changed.' },
  { id:'knp-100-teratec', cat:'kneepad', brand:'100%', model:'Teratec Knee Guard', family:'100-teratec', price:130, weight:450,
    disciplines:['enduro','dh'], sizes:['S/M','L/XL'],
    desc:'Weight per pair (approx). RE-CHECKED 2026-07-19 via browser-rendered 100percent.com'
      + ' site search (WebFetch JS-walled): "teratec" returns zero results across the whole'
      + ' site. Confirmed discontinued. Left unverified, no fields changed.' },
  { id:'knp-100-fortis', cat:'kneepad', brand:'100%', model:'Fortis Knee Guard', family:'100-fortis', price:150, weight:500,
    disciplines:['dh'], sizes:['S/M','L/XL'],
    desc:'Weight per pair (approx). RE-CHECKED 2026-07-19 via browser-rendered 100percent.com'
      + ' site search (WebFetch JS-walled): "fortis" returns no matching guard product.'
      + ' Confirmed discontinued. Left unverified, no fields changed.' },
  { id:'knp-ixs-trigger', cat:'kneepad', brand:'iXS', model:'Trigger Knee Guard', family:'ixs-trigger', price:139, weight:280,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'FLAG for coordinator review (2026-07-19): the current ixs.com knee-pad collection'
      + ' lists only "Trigger Race" knee guards, not a plain "Trigger" (non-Race) SKU. A 2019-dated'
      + ' page (ixs-trigger-knieschoner-grau) confirms an older-generation "Trigger" knee pad once'
      + ' existed at this name, but it may be discontinued/renamed to Trigger Race - left'
      + ' unverified rather than pinning current pricing/specs to a possibly superseded product.'
      + ' Weight per pair (approx, not published).' },
  { id:'knp-ixs-trigger-lower', cat:'kneepad', brand:'iXS', model:'Trigger Lower Knee Guard', family:'ixs-trigger', price:50, weight:220,
    disciplines:['trail'], sizes:['S/M','L/XL'],
    desc:'FLAG for coordinator review (2026-07-19): no matching "Trigger Lower" KNEE guard found'
      + ' on ixs.com - the only "Trigger Lower" product is "Trigger Lower Protective", a hip-'
      + ' protective liner SHORT (chamois + hip pads), not a knee guard at all. This row may be a'
      + ' mislabeled/fabricated catalog entry; left unverified pending a coordinator decision to'
      + ' retarget or remove it. Weight per pair (approx).' },
  { id:'knp-ixs-carve-race', cat:'kneepad', brand:'iXS', model:'Carve Race Knee Guard', family:'ixs-carve', price:129, weight:330,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], certs:['en1621-1-l1'],
    desc:'Xmatter padding + hard-shell skid plates on knee/shin, AeroMesh, EN1621-1:2012 L1'
      + ' certified. EUR119.00 RRP converted to $129 USD sample - no US MSRP page found. Weight'
      + ' per pair (approx, not published).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en-ch/products/ixs-carve-race-knieschoner-schwarz' },
  { id:'knp-7idp-sam-hill-lite', cat:'kneepad', brand:'7iDP', model:'Sam Hill Lite Knee', family:'7idp-sam-hill', price:84.99, weight:205,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Weight per pair, size XL (maker-stated: "205G pair (size XL)").',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://7idp.com/products/sam-hill-lite-knee' },
  { id:'knp-7idp-flex', cat:'kneepad', brand:'7iDP', model:'Flex Knee', family:'7idp-flex', price:84.99, weight:270,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Re-fetched 7idp.com (2026-07-17): regular price $84.99 confirmed (currently on sale at $39.99, sale price not used per MSRP-basis pricing policy), sizes S-XL confirmed. Weight not published; kept as the existing sample per the kit weight policy. No cert stated on the page, so none is tagged.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://7idp.com/products/flex-knee' },
  { id:'knp-7idp-project', cat:'kneepad', brand:'7iDP', model:'Project Knee', family:'7idp-project', price:129.99, weight:430,
    certs:['en1621-1-l2'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Weight per pair, size XL (maker-stated: "430g pair (size XL)").',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://7idp.com/products/project-knee' },
  { id:'knp-raceface-charge', cat:'kneepad', brand:'Race Face', model:'Charge Knee Guard', family:'raceface-charge', price:55,
    disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/charge-knee',
    desc:'Verified vs fetched raceface.com Shopify product JSON + product page: compare_at_price (regular/list price) $55.00 USD, sizes XS-XXL confirmed (corrects 50->55 and the size range, which had no XS/XXL). No `certs` token: the page explicitly states "The Charge Knee is not rated for impact protection" - minimal abrasion coverage only, not an EN 1621-1 pad. No weight published on the page, so omitted rather than guessed (was a 250g sample estimate).' },
  { id:'knp-raceface-ambush', cat:'kneepad', brand:'Race Face', model:'Ambush Knee Guard', family:'raceface-ambush', price:120,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/ambush-knee',
    desc:'Verified vs fetched raceface.com Shopify product JSON + product page: compare_at_price (regular/list price) $120.00 USD, sizes XS-XXL confirmed (corrects 80->120 and the size range, which had no XS/XXL). No `certs` token: the page states "D3O(R) T5 Evo X certified impact absorbing foam" but never cites CE/EN 1621-1 or a Level, so a specific standard is not asserted. No weight published on the page, so omitted rather than guessed (was a 320g sample estimate).' },
  { id:'knp-dainese-trail-skins-air', cat:'kneepad', brand:'Dainese', model:'Trail Skins Air Knee Guard', family:'dainese-trail-skins', price:85, weight:240,
    disciplines:['trail'], sizes:['XS','S','M','L','XL'],
    desc:'Re-fetched dainese.com (2026-07-17): $85 MSRP confirmed (currently on sale at $25.50, sale price not used per MSRP-basis pricing policy), sizes XS-XL. Cert text "CE EN 1621.1" without an explicit L1/L2 qualifier, so no cert token is stored. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.dainese.com/us/en/trail-skins-air---bike-knee-guards-203879724001.html' },
  { id:'knp-dainese-rival-pro', cat:'kneepad', brand:'Dainese', model:'Rival Pro Knee Guard', family:'dainese-rival-pro', price:135, weight:380,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL'],
    desc:'Fetched dainese.com: CORRECTED price $120 -> $135 (currently on sale at $67.50, sale price not used per MSRP-basis pricing policy), sizes extend to XS. Steel knee-cap plate + Pro-Shape 2.0 carbo-elastomer protector confirmed; the fetched page text truncated its cert line to "CE EN 1621." with no visible L1/L2 qualifier, so no cert token is added (fetched-source-only rule). Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.dainese.com/us/en/rival-pro---bike-knee-guards-203879736001.html' },
  { id:'knp-evs-hexpro', cat:'kneepad', brand:'EVS', model:'Hex Pro MTB Knee Guard', family:'evs-hexpro', price:140,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.evs-sports.com/products/hex-pro-mtb-knee-guard',
    desc:'CE EN 1621-1 Level 1 and price per the fetched evs-sports.com product page; page states no weight (Skipped, like the catalog\'s frame-weight convention). Corrects an earlier "TP150" row from this grind that could not be confirmed as a real EVS model - retired before merge, never shipped.' },

  /* -- Knee pads, batch 2 (grind/kit-kneepad continuation, 2026-07-14): market-
     coverage pass across 11 more brands, verifying against fetched manufacturer
     pages where reachable (6 rows below carry verified:true); the rest are
     honest unverified samples per the relaxed-inclusion policy - real products,
     best-credible specs, never fabricated. */
  { id:'knp-alpinestars-paragon-plus', cat:'kneepad', brand:'Alpinestars', model:'Paragon Plus Knee Protector', family:'alpinestars-paragon', price:69.95,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.alpinestars.com/products/paragon-plus-knee-protector',
    desc:'CE EN 1621-1:2012 Level 1 and price per the fetched alpinestars.com product page; page states no weight.' },
  { id:'knp-alpinestars-vector-tech', cat:'kneepad', brand:'Alpinestars', model:'Vector Tech Knee Protector', family:'alpinestars-vector', price:55, weight:210,
    disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Lighter, non-Plus sibling of the Paragon Plus. Weight per pair (approx). 2026-07-16 recheck: could not get a clean current fetch (alpinestars.com/products/vector-tech-knee-protector 404s; a regional se.alpinestars.com mirror exists per search but rate-limited this session). Its Vector Pro sibling was found renamed to A-Impact Plasma Pro, so this row may be similarly stale - left unchanged, flagged as a retry candidate.' },
  { id:'knp-endura-mt500-d3o-open', cat:'kneepad', brand:'Endura', model:'MT500 D3O Open Knee Pad', family:'endura-mt500', price:120,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.endurasport.com/en-us/products/mt500-d3o%C2%AE-open-knee-pads-black-re1282bk',
    desc:'EN 1621-1:2012 Level 1 and price per the fetched endurasport.com product page; page states no weight.' },
  { id:'knp-endura-mt500-d3o-ghost', cat:'kneepad', brand:'Endura', model:'MT500 D3O Ghost Knee Pad', family:'endura-mt500', price:130, weight:260,
    disciplines:['trail','enduro'], sizes:['S/M','M/L','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mt500-d3o%C2%AE-ghost-knee-pads-black-re1275bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "MT500 D3O Ghost Knee Pads", "$130.00 USD" (was sampled at $100, corrected), lower-profile sibling of the D3O Open; sizes corrected S/M/L/XL -> the real S/M-M/L-L/XL run. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'knp-endura-singletrack', cat:'kneepad', brand:'Endura', model:'SingleTrack Knee Protector', family:'endura-singletrack', price:45, weight:200,
    disciplines:['trail'], sizes:['S','M','L','XL'],
    status:'discontinued',
    desc:'RESOLVED 2026-07-17 via bdata search: confirmed real across multiple product generations (actionsports.de "Singletrack Knee Protector II white", Ridez.cc "Singletrack Knee Protector", a "2016" listing, a "(2024)" II listing) - a genuine multi-year Endura SKU, not a fabrication or a conflation with the "Lite" sub-variant as the 2026-07-16 session suspected. It is not in the current endurasport.com en-us catalog (comprehensive sitemap fetch this session, 567 products, confirms only "SingleTrack Lite Knee Pads" remains live). Marked discontinued rather than removed; price/weight remain the prior sample.' },
  { id:'knp-leatt-reaflex-pro', cat:'kneepad', brand:'Leatt', model:'ReaFlex Pro Knee Guard', family:'leatt-reaflex', price:114, weight:300,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/knee-guard-reaflex-pro',
    desc:'EN 1621-1 Level 1, price, and "from 300g pair" weight per the fetched us.leatt.com product page. Current-generation successor to the AirFlex Pro naming above (both real; AirFlex Pro kept as unverified/legacy, not retired).' },
  { id:'knp-leatt-1-5-mini', cat:'kneepad', brand:'Leatt', model:'Knee Guard 1.5 - Mini', price:39.99,
    disciplines:['trail','enduro'], sizes:['Mini'],
    desc:'Genuine mini-specific SKU (own product page, "fits 95-134cm" youngest-rider sizing), not a size run on an adult knee guard: hard-cap FlexMesh construction, vented foam padding. CE PPE Regulation (EU) 2016/425 tested; page does not state an EN1621-1 level, so no `certs` token is forced. Weight not published, stays unset.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/knee-guard-1-5-mini' },
  { id:'knp-leatt-3df-5-0-evo-mini', cat:'kneepad', brand:'Leatt', model:'Knee Guard 3DF 5.0 Evo - Mini', price:87.99,
    disciplines:['trail','enduro'], sizes:['Mini'],
    desc:'Genuine mini-specific SKU (own product page), a step up from the 1.5 Mini: soft 3DF Deflextion impact foam, pre-curved sleeve, silicone-printed leg straps. Page states CE-certified 4-way stretch material but no EN1621-1 level, so no `certs` token is forced. Weight not published, stays unset.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/knee-guard-3df-5-0-evo-mini' },
  { id:'knp-7idp-transition', cat:'kneepad', brand:'7iDP', model:'Transition Knee', family:'7idp-transition', price:74.99,
    certs:['en1621-1-l2'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://7idp.com/products/transition-knee',
    desc:'EN 1621-1:2012 Level 2 and regular price per the fetched 7idp.com product page. The page states weight per single pad (not pair), so weight is omitted rather than guessed at doubling it.' },
  { id:'knp-7idp-sam-hill', cat:'kneepad', brand:'7iDP', model:'Sam Hill Knee', family:'7idp-sam-hill', price:109.99, weight:340,
    certs:['en1621-1-l2'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Heavier-duty sibling of the Sam Hill Lite above. Weight per pair, size L (maker-stated: "340g (size L)").',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://7idp.com/products/sam-hill-knee' },
  { id:'knp-dakine-slayer', cat:'kneepad', brand:'Dakine', model:'Slayer Knee Pad', family:'dakine-slayer', price:108, weight:363,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.dakine.com/products/slayer-knee-pad-s20',
    desc:'Price and "0.8 lbs (0.36 kg)" per-pair weight per the fetched dakine.com product page. No `certs` token: the page states CE certification to EU 2016/425 (CRITT protocol VTT-007), a real but different standard from EN 1621-1, so it is not mapped onto the protectionCert vocab.' },
  { id:'knp-sixsixone-recon', cat:'kneepad', brand:'SixSixOne', model:'Recon Knee Pad', family:'sixsixone-recon', price:85, weight:300,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], desc:'D3O Ghost inserts, maker-stated CE EN 1621-1. Weight per pair (approx) - not asserted as `certs` (page not reliably fetchable this pass; a retailer/press mention isn\'t the fetched-source bar for a safety claim). Checked 2026-07-16: sixsixone.com now returns 403 Forbidden site-wide - the brand appears to have gone dark (see glv-sixsixone-comp for detail); no fetch possible.' },
  { id:'knp-blissprotection-arg-minimalist', cat:'kneepad', brand:'Bliss Protection', model:'ARG Minimalist+ Knee Pad', family:'blissprotection-arg-minimalist', price:84.90, weight:190,
    disciplines:['trail'], sizes:['XS','S','M','L','XL'], desc:'Minimalist lycra + perforated ARG pad, 55% Nylon/30% TPE/10% Elasthan/5% Polyester. Re-fetched blisscamp.com/us/arg-minimalist-knee-pad/123167000 kit-11 (2026-07-21): $84.90 USD and sizes XS-XL reconfirmed exactly. No weight published or cert token stated on the page - weight stays the prior approx per-pair sample per the kit-apparel weight-exemption policy; no cert asserted.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://blisscamp.com/us/arg-minimalist-knee-pad/123167000' },
  { id:'knp-bluegrass-skinny-d3o', cat:'kneepad', brand:'Bluegrass', model:'Skinny D3O Knee Pad', family:'bluegrass-skinny', price:100, weight:300,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], status:'discontinued',
    desc:'CORRECTED to discontinued (2026-07-17): fetched met-helmets.com/en/shop/gravity/bluegrass-protections/ (the current Bluegrass protection catalog) - the "Skinny" line is absent; current knee pads are Aura Core/Aura/Arto/3Straps/Big Horn. The old skinny-knee/-d3o URL slugs 404. No successor SKU confirmed by name, so left as a documented discontinuation rather than guessing a replacement mapping.' },
  { id:'knp-sweetprotection-bearsuit-light', cat:'kneepad', brand:'Sweet Protection', model:'Knee Pads', mfgPn:'835012BLACK', price:99.95, weight:180,
    certs:['en1621-1-l2'], disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'CORRECTED (kit-breadth-1, 2026-07-22): the sweetprotection.com/us/en/knee-pads-black/ product page is live under the current name "Knee Pads" (the old "Bearsuit Light Knee Pad" branding/product ID no longer exists on the maker site) - price is the listed 99.95 USD MSRP (99.95 also shown struck through an outlet 59.97 sale, not used per pricing policy), weight the maker-stated 180g, cert the maker-listed CE EN 1621-1:2012 Level 2.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.sweetprotection.com/us/en/knee-pads-black/' },
  { id:'knp-sweetprotection-kneeguardspro', cat:'kneepad', brand:'Sweet Protection', model:'Knee Guards Pro', mfgPn:'860002BLACK', price:140, weight:355,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'],
    desc:'More coverage/protection tier above the Knee Pads (removable Level 1 3S visco-elastic pad) - maker-stated for aggressive trail/enduro riding.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.sweetprotection.com/us/en/knee-guards-pro-black/' },
  { id:'knp-troyleedesigns-stage', cat:'kneepad', brand:'Troy Lee Designs', model:'Stage Knee Guard', family:'troyleedesigns-stage', price:112, weight:454,
    disciplines:['enduro','dh'], sizes:['XS/SM','M/L','XL/2XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/20s-stage-knee-guards-black',
    desc:'Heavier-duty sibling of the Speed Knee Sleeve above. Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $112.00 USD compare-at price confirmed, sizes confirmed. Per-variant weight (per pad) sourced from the JSON - uniform 454g across all three sizes. No cert standard published.' },
  { id:'knp-raceface-indy', cat:'kneepad', brand:'Race Face', model:'Indy Knee Guard', family:'raceface-indy', price:90,
    disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/indy-knee',
    desc:'Verified vs fetched raceface.com Shopify product JSON + product page: compare_at_price (regular/list price) $90.00 USD, sizes XS-XXL confirmed (corrects 45->90 and the size range, which had no XS/XXL). No `certs` token: the page names a "D3O(R) LP1 foam pad" but states no CE/EN 1621-1 Level (one customer review calls it a "Level 1 knee pad", but that is not an official Race Face claim, so it is not tagged). No weight published on the page, so omitted rather than guessed (was a 230g sample estimate).' },
  { id:'knp-ixs-flow-evo', cat:'kneepad', brand:'iXS', model:'Flow Evo+ Knee Guard', family:'ixs-flow', price:86, weight:240,
    disciplines:['trail'], sizes:['S/M','L/XL'], certs:['en1621-1-l1'],
    desc:'Soft, no-hard-shell guard, removable Xmatter padding, AeroMesh, EN1621-1:2012 L1'
      + ' certified. EUR79.90 RRP converted to $86 USD sample - no US MSRP page found. Weight'
      + ' per pair (approx, not published).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-flow-evo-knieschoner-camel' },

  /* -- Knee pads, batch 3 (grind/kit-kneepad continuation, 2026-07-14): three
     more brands (O'Neal, Demon United, Fly Racing) - the moto-crossover corner
     of the MTB market. Prices verified against fetched official pages; certs
     only where the source states an actual level (Fly Racing's Barricade Lite
     is the only one that does - O'Neal's page states no cert, and Demon's page
     says "CE 1621 certified" without a level, so neither gets a `certs` token -
     an unspecified level is not the same claim as a Level 1/2 and would
     overstate the source). */
  { id:'knp-oneal-flow', cat:'kneepad', brand:"O'Neal", model:'Flow Knee Guard', family:'oneal-flow', price:79.99,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://oneal.com/collections/knee-guards',
    desc:'Price per the fetched oneal.com knee-guards collection page; page states no cert level, no weight.' },
  { id:'knp-oneal-dirt', cat:'kneepad', brand:"O'Neal", model:'Dirt Knee Guard', family:'oneal-dirt', price:69.99,
    disciplines:['trail'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://oneal.com/collections/knee-guards',
    desc:'Lighter sibling of the Flow above. Price per the fetched oneal.com knee-guards collection page; page states no cert level, no weight.' },
  { id:'knp-demonunited-hyper-knee-x-v3', cat:'kneepad', brand:'Demon United', model:'Hyper Knee X V3 D3O', family:'demonunited-hyper-knee', price:79.99,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://demon-united.com/products/hyper-knee-x-d3o-v3',
    desc:'D3O High-Performance Foam. Price per the fetched demon-united.com product page; page states "CE 1621 certified" without a level, so no `certs` token (an unspecified level would overstate a real but incomplete claim); no weight given.' },
  { id:'knp-flyracing-barricade-lite', cat:'kneepad', brand:'Fly Racing', model:'Barricade Lite Knee Guard', family:'flyracing-barricade', price:89.95,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.flyracing.com/ce-barricade-lite-knee-guards/',
    desc:'EN 1621-1 Level 1 and price per the fetched flyracing.com product page; page states no weight.' },

  /* -- Kali Protectives breadth (2026-07-16): kneepad/glove lines the catalog had
     none of yet, despite Kali being a well-established helmet/elbow/shin brand
     here. Prices confirmed via the kaliprotectives.com Shopify .js product-JSON
     endpoint (price/compare_at_price fields, immune to sale-banner ambiguity);
     neither product page publishes a weight or a named CE/EN1621 standard, so
     both stay weight/cert-free rather than guessed. -- */
  { id:'knp-kaliprotectives-mission2', cat:'kneepad', brand:'Kali Protectives', model:'Mission 2.0 Knee Guard', family:'kaliprotectives-mission', price:77,
    disciplines:['trail'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.kaliprotectives.com/products/mission-2-0-knee-guards',
    desc:'4-way stretch spandex articulated trail knee pad with a 3D molded knee puck; super-light, medium'
      + ' protection. Price confirmed via the .js JSON endpoint ($77.00, price==compare_at_price, no'
      + ' active sale). No weight or CE/EN1621 standard published on the page.' },
  { id:'knp-kaliprotectives-toro', cat:'kneepad', brand:'Kali Protectives', model:'Toro Knee Guard', family:'kaliprotectives-toro', price:88,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.kaliprotectives.com/products/toro-knee-guard',
    desc:'Pull-on soft-covered hard-shell gravity knee pad with an internal knee cup + compression-molded'
      + ' side panels; pairs with Kali\'s Casa shin guard for extended coverage. Price confirmed via the'
      + ' .js JSON endpoint ($88.00, price==compare_at_price). No weight or CE/EN1621 standard published.' },
  /* -- kit-breadth-1 (2026-07-22): Scott had ZERO kneepad rows despite an active
     current-season MTB protection line (scott-sports.com/us's Body Protection
     category) - the first two below are its D3O LP1-plated guards (cert confirmed
     off Scott's own PROTECTORS technical PDF); Mission Evo is Scott's strapless
     EVA-pad tier, maker-stated PPE cat. I (below the EN1621-1 pass/fail bar, so no
     certs token per the fetched-source-only rule). -- */
  { id:'knp-scott-soldier', cat:'kneepad', brand:'Scott', model:'Soldier Knee Guard', mfgPn:'419976-0001', price:89.99, weight:328,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Removable D3O LP1 flexible plate, strapless minimalist sleeve. Price/model USD-confirmed on the maker\'s current US Body Protection catalog; cert (EN1621-1:2012 Level 1, "LP1 L1 KNEE") confirmed on Scott\'s own PROTECTORS technical PDF. Weight (328g, size L pair) is a reviewer-measured figure, not maker-published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.scott-sports.com/us/en/products/apparel-equipment-mw-equipment-body-protection',
    sourceType:'measured', weightSource:'https://www.bikeradar.com/reviews/clothing/armour-and-pads/knee-pads/scott-soldier-knee-guards-review' },
  { id:'knp-scott-missionevo', cat:'kneepad', brand:'Scott', model:'Mission Evo Knee Pads', mfgPn:'274525', price:69.99,
    disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Strapless stretch-mesh sleeve, EVA pad, no hard shell/plate - maker-stated PPE cat. I (below the EN1621-1 pass/fail threshold, so untagged rather than mis-certed). No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.scott-sports.com/ca/en/product/scott-mission-evo-knee-pads' },
  { id:'knp-tsg-joint-sleeve', cat:'kneepad', brand:'TSG', model:'Knee-Sleeve Joint', mfgPn:'71014', price:91.75, weight:520,
    disciplines:['trail','enduro','dh'], sizes:['XXS/XS','S/M','L/XL','XXL'],
    desc:'kit-breadth-1 (2026-07-22): TSG had zero kneepad rows despite this being the knee counterpart to its already-cataloged Joint Elbow Sleeve (elp-tsg-joint-sleeve) - slip-on softshell, articulated PU memory foam. Weight maker-stated ("520 g") on the fetched ridetsg.com product page. Price is EUR84.95 (VAT incl.) converted to a $91.75 USD sample at ~1.08 USD/EUR (no confirmed US-dollar storefront - same disclosed-basis convention as the existing TSG rows) per THE PRICE RULE. Bike protocol PPETS0002 is only "partially based on" EN1621-1:2012 with no stated Level, so no cert token is tagged.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-22', source:'https://www.ridetsg.com/shop/kneesleeve-joint/71014-25-102/' },

  /* -- Elbow pads (per pair) -- (grind/kit-elbowpad, expanded 2026-07-14: two rows
     fetch-verified against their own manufacturer product page - price, weight and
     cert all confirmed on-page; the rest are real current-lineup products at
     best-credible sample specs, several with a WebFetch-confirmed price/cert but an
     unconfirmed weight, kept unverified per the fork-weight convention (never mark
     verified on a guessed number.)) -- */
  { id:'elp-fox-launch-pro', cat:'elbowpad', brand:'Fox', model:'Launch Pro D3O Elbow', price:139.95, weight:220,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx). CORRECTED 2026-07-17: price is the fetched $139.95 list for the current "Launch Pro Elbow Pads" (was sample $70, a large understatement). Maker page states EN1621-1 Level 1 CE certification. No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/launch-pro-elbow-pads/30605.html' },
  { id:'elp-fox-launch', cat:'elbowpad', brand:'Fox', model:'Launch D3O Elbow', price:89.95, weight:190,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'D3O padding, non-Pro tier. Weight per pair (approx). CORRECTED 2026-07-17: price is the fetched $89.95 list for the current "Launch Elbow Pads" (was sample $55, a large understatement).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/launch-elbow-pads/33834.html' },
  { id:'elp-gform-pro-x3', cat:'elbowpad', brand:'G-Form', model:'Pro-X3 Elbow', price:59.99, weight:120,
    disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'Weight per pair (approx, not published on the fetched page - kept as prior sample). Fetched g-form.com directly 2026-07-18 (a prior pass only had this via a WebSearch snippet): CORRECTED price $60 -> $59.99, sizes corrected to add XS. No cert claim stated on this page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-18', source:'https://g-form.com/products/mountain-bike-elbow-pads-guards-prox3' },
  { id:'elp-gform-pro-rugged-2', cat:'elbowpad', brand:'G-Form', model:'Pro-Rugged 2 Elbow', price:124,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL'],
    desc:'G-Form\'s top-tier MTB elbow guard - all-mountain/enduro/DH/slopestyle tier, three-layer SmartFlex construction, CE EN1621-1 certified. No weight published on the fetched page. Added 2026-breadth-6 (kit-breadth-6) via g-form.com product page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://g-form.com/products/pro-rugged-2-elbow-guard-protection' },
  { id:'elp-gform-x4', cat:'elbowpad', brand:'G-Form', model:'X4 Elbow (Adult)', price:79.99,
    disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'G-Form\'s current mid-tier trail elbow guard (re-engineered SmartFlex, extended coverage, low-profile). No cert or weight published on the fetched page. Added 2026-breadth-6 (kit-breadth-6) via g-form.com product page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://g-form.com/products/x4-elbow-guards' },
  { id:'elp-raceface-indy', cat:'elbowpad', brand:'Race Face', model:'Indy Elbow', price:65,
    disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/indy-elbow',
    desc:'Verified vs fetched raceface.com Shopify product JSON + product page: compare_at_price (regular/list price) $65.00 USD (matches exactly) and sizes XS-XXL both confirmed. Removable D3O(R) T4 Trio foam pad, sold in pairs. No `certs` token: page states no CE/EN 1621-1 Level. No weight published on the page - dropped the prior 190g sample estimate rather than keep it alongside a verified row (re-fetched 2026-07-16, graduating this row from the identity-only source captured 2026-07-14 to full verified:true).' },
  { id:'elp-raceface-ambush', cat:'elbowpad', brand:'Race Face', model:'Ambush Elbow', price:80,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22',
    source:'https://www.raceface.com/products/ambush-elbow-mens',
    desc:'Race Face\'s top-tier DH/gravity elbow pad, sold above the Indy in the current lineup - D3O T5 Evo X certified impact foam, perforated neoprene sleeve, sold in pairs. Fetched raceface.com product page: MSRP $80.00 (page renders "Regular price $28.00 Sale price $80.00" - a Shopify markdown-swap rendering bug on this theme; re-confirmed via a second fetch that $80 is the standard/non-sale price). No weight published. Added kit-breadth-6.' },
  { id:'elp-raceface-charge', cat:'elbowpad', brand:'Race Face', model:'Charge Elbow', price:35,
    disciplines:['trail'], sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22',
    source:'https://www.raceface.com/products/charge-elbow',
    desc:'Race Face\'s entry-level XC/trail elbow pad - abrasion-resistant foam panels, page explicitly states "Not rated for impact protection" (a real distinct SKU, not a certified-impact pad; no `certs` token entered for that reason). MSRP $35.00 confirmed on the fetched page. No weight published. Added kit-breadth-6.' },
  { id:'elp-poc-joint-vpd-air', cat:'elbowpad', brand:'POC', model:'Joint VPD Air Elbow', price:70, weight:450,
    disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'], certs:['en1621-1-l1'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14',
    source:'https://poc.com/en-us/product/joint-vpd-air-elbow-uranium-black',
    desc:'Soft VPD pad, low-profile trail guard, sold as a pair. Fetched poc.com product page: $70.00, EN 1621-1 Level 1, sizes XS-XL, per-pair weight by size XS 340g / S 360g / M 450g / L 460g / XL 470g - the M-size figure (450g) is stored here.' },
  { id:'elp-poc-joint-vpd-air-plus', cat:'elbowpad', brand:'POC', model:'Joint VPD Air+ Elbow', price:90, weight:190,
    disciplines:['enduro','dh'], sizes:['S/M','L/XL'],
    desc:'Adds a hard-shell cap over the VPD Air pad. Weight per pair (approx). Could not confirm this exact "+"/hard-shell-cap SKU on poc.com this pass - only the base "Joint VPD Air Elbow" (no hard shell, $70) turned up; the "+" variant may be discontinued, renamed, or region-specific. Left unchanged rather than guess; retry-queue candidate.' },
  { id:'elp-troyleedesigns-speed-sleeve', cat:'elbowpad', brand:'Troy Lee Designs', model:'Speed Elbow Sleeve', price:49, weight:181,
    disciplines:['trail','enduro'], sizes:['XS/SM','MD/LG','XL/2X'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/speed-elbow-sleeve-black',
    desc:'Slip-on sleeve, foam padding. Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $49.00 USD compare-at price confirmed, sizes confirmed. Per-variant weight (per pad) sourced from the JSON (XS/SM 181g, MD/LG/XL/2X 227g) - 181g (XS/SM) used as the representative figure. No cert standard published.' },
  { id:'elp-troyleedesigns-stage', cat:'elbowpad', brand:'Troy Lee Designs', model:'Stage Elbow Guard', price:100, weight:272,
    disciplines:['enduro','dh'], sizes:['XS/SM','MD/LG','XL/2XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/20s-stage-elbow-guards-black',
    desc:'D3O pad, sleeve construction. Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $100.00 USD compare-at price confirmed, sizes confirmed. Per-variant weight (per pad) sourced from the JSON (XS/SM 272g, MD/LG/XL/2X 318g) - 272g (XS/SM) used as the representative figure. No cert standard published.' },
  { id:'elp-100-ridecamp', cat:'elbowpad', brand:'100%', model:'Ridecamp Elbow Guard', price:60, weight:190,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Weight per pair (approx). RE-CHECKED 2026-07-19 - see knp-100-ridecamp: the current'
      + ' Ridecamp collection (both .com and .eu) has no elbow guard SKU. Appears discontinued.'
      + ' Left unverified, no fields changed.' },
  { id:'elp-100-teratec', cat:'elbowpad', brand:'100%', model:'Teratec Elbow Guard', price:75, weight:230,
    disciplines:['enduro','dh'], sizes:['S/M','L/XL'],
    desc:'D3O padding, gravity-oriented. Weight per pair (approx). RE-CHECKED 2026-07-19 - see'
      + ' knp-100-teratec: "teratec" returns zero results site-wide. Confirmed discontinued.'
      + ' Left unverified, no fields changed.' },
  { id:'elp-leatt-reaflex', cat:'elbowpad', brand:'Leatt', model:'ReaFlex Elbow Guard', price:99.99, weight:240,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'], certs:['en1621-1-l1'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14',
    source:'https://us.leatt.com/collections/mtb-protection/products/elbow-guard-reaflex',
    desc:'Current mid-tier Leatt elbow guard - replaces the discontinued AirFlex in this row (AirFlex product pages now redirect to the Leatt homepage). Fetched us.leatt.com product page: $99.99, "from 240g pair", EN1621-1 Level 1, sizes S-XXL.' },
  { id:'elp-leatt-3df-60', cat:'elbowpad', brand:'Leatt', model:'3DF 6.0 Evo Elbow Guard', price:119, weight:240,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'], certs:['en1621-1-l2'],
    desc:'3DF foam padding, gravity-oriented, hard-cap surface. Weight per pair listed as "TBC" on the fetched page (not a real number) - 240g carried over from the ReaFlex sibling as a placeholder estimate (kit weight policy: never blocks verification). Confirmed $119 price / EN1621-1 Level 2 cert. Fetched us.leatt.com/collections/mtb-protection/products/elbow-guard-3df-6-0-evo.', source:'https://us.leatt.com/collections/mtb-protection/products/elbow-guard-3df-6-0-evo', lastChecked:'2026-07-14', verified:true, priceBasis:'msrp-confirmed' },
  { id:'elp-leatt-flexmesh', cat:'elbowpad', brand:'Leatt', model:'FlexMesh Elbow Guard', price:89.99, weight:150,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'], certs:['en1621-1-l1'],
    desc:'Hard-cap surface, vented plates. Weight per pair (approx - not stated on the fetched page, kit weight policy: never blocks verification). Price/cert/sizes confirmed via fetched us.leatt.com/collections/mtb-protection/products/elbow-guard-flexmesh.', source:'https://us.leatt.com/collections/mtb-protection/products/elbow-guard-flexmesh', lastChecked:'2026-07-14', verified:true, priceBasis:'msrp-confirmed' },
  { id:'elp-leatt-1-5-mini', cat:'elbowpad', brand:'Leatt', model:'Elbow Guard 1.5 - Mini', price:34.99,
    disciplines:['trail','enduro'], sizes:['Mini'],
    desc:'Genuine mini-specific SKU (own product page, youngest-rider sizing), not a size run on an adult elbow guard: hard-shell FlexMesh cap, vented foam padding, MoistureCool/AirMesh fabrics. CE PPE Regulation (EU) 2016/425 tested; page does not state an EN1621-1 level, so no `certs` token is forced. Weight not published, stays unset.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/elbow-guard-1-5-mini' },
  { id:'elp-leatt-3df-5-0-evo-mini', cat:'elbowpad', brand:'Leatt', model:'Elbow Guard 3DF 5.0 Evo - Mini', price:76.99, weight:274,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['Mini'],
    desc:'Genuine mini-specific SKU (own product page), a step up from the 1.5 Mini: soft 3DF Deflextion impact foam, EN1621-1 Level 1. Weight per pair as fetched (274g).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/elbow-guard-3df-5-0-evo-mini' },
  { id:'elp-7idp-transition', cat:'elbowpad', brand:'7iDP', model:'Transition Elbow', price:69.99, weight:245,
    certs:['en1621-1-l2'], disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Weight per pair, size L (maker-stated: "245g (size L)"); sizes corrected to the maker’s own 4 discrete sizes (S/M/L/XL replace a paraphrased S/M, L/XL).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://7idp.com/products/transition-elbow' },
  { id:'elp-7idp-samhill', cat:'elbowpad', brand:'7iDP', model:'Sam Hill Lite Elbow', price:79.99, weight:105,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Signature gravity-oriented pad. Weight per pair, size XL (maker-stated: "105G pair (size XL)").',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://7idp.com/products/sam-hill-lite-elbow' },
  { id:'elp-ixs-flow-evo-plus', cat:'elbowpad', brand:'iXS', model:'Flow Evo+ Elbow Guard', price:85, weight:180,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL','XXL'], certs:['en1621-1-l1'],
    desc:'No-hard-shell soft guard, removable Xmatter padding, AeroMesh, EN1621-1:2012 L1'
      + ' certified. EUR79.90 RRP converted to $85 USD sample - no US MSRP page found. Weight'
      + ' per pair (approx).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-flow-evo-ellbogenschoner-olive' },
  { id:'elp-ixs-carve-evo-plus', cat:'elbowpad', brand:'iXS', model:'Carve Evo+ Elbow', price:45, weight:150,
    disciplines:['trail'], sizes:['S/M','L/XL'], certs:['en1621-1-l1'],
    desc:'Xmatter high-impact padding, removable/exchangeable, AeroMesh, EN1621-1:2012 L1'
      + ' certified. Price is a same-tier USD sample (no independent US MSRP page fetched this'
      + ' session). Weight per pair (approx).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-carve-evo-ellbogenschoner' },
  { id:'elp-dainese-trailskins-air', cat:'elbowpad', brand:'Dainese', model:'Trail Skins Air Elbow Guard', price:75, weight:170,
    disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'Pro-Shape 2.0 protector, highly ventilated (55% open surface). Re-fetched dainese.com (2026-07-17): $75 MSRP confirmed (currently on sale at $22.50, sale price not used per MSRP-basis pricing policy), sizes XS-XL confirmed. Cert text reads "CE EN 1621.1" without an explicit L1/L2 qualifier, so no cert token is stored. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', source:'https://www.dainese.com/us/en/trail-skins-air---bike-elbow-guards-203879725001.html', lastChecked:'2026-07-17' },
  { id:'elp-dainese-rival-r', cat:'elbowpad', brand:'Dainese', model:'Rival R Elbow Guard', price:90,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'The current higher-protection elbow SKU alongside Trail Skins Air - Armoform overlapping sliding-plate technology, upper elbow to mid-forearm coverage. kit-breadth-6: fetched dainese.com\'s live Bike Elbows collection page (currently exactly 2 SKUs listed) to confirm this and Trail Skins Air are the whole current elbow lineup - other Dainese elbow product pages seen in search results (Armoform Elbow Guard, Trail Skins 2, Trail Skins Pro) 404/redirect to the generic homepage, i.e. discontinued/delisted. MSRP $90 confirmed (site currently runs a -70% sale, sale price not used per pricing policy). Page states "Homologation: CE EN 1621.1" with no L1/L2 qualifier, so no `certs` token is entered (matches the same no-qualifier convention already used on the Trail Skins Air row above). No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.dainese.com/us/en/rival-r---bike-elbow-guards-203879738001.html' },
  { id:'elp-evs-option', cat:'elbowpad', brand:'EVS', model:'Option Elbow Pad', price:30, weight:200,
    disciplines:['trail','enduro'], sizes:['Mini','Youth','Adult'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Hard-molded polypropylene shell, perforated bio-foam liner. Re-fetched evs-sports.com/products/option-elbow-pad 2026-07-20: price $30.00 confirmed across all three sizes; sizes CORRECTED to add "Mini" (the page lists Mini/Youth/Adult, the prior row was missing the smallest tier). No cert stated on the page. Weight per pair (approx, not published on the page) kept as the existing sample per the kit weight policy.',
    source:'https://www.evs-sports.com/products/option-elbow-pad' },
  { id:'elp-evs-flex-lite', cat:'elbowpad', brand:'EVS', model:'Flex Lite Elbow Guard', price:50,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Lighter-weight compression-sleeve tier alongside the hard-shell Option pad - Reactive Memory Foam (RMF), sold in pairs. MSRP $50.00 confirmed on the fetched evs-sports.com product page. Page states "CE 14120 Level protection" - CE EN 14120 is not in this catalog\'s protectionCert vocab (a different standard family from the EN 1621 series already used), so no `certs` token is entered rather than mis-mapping it. No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.evs-sports.com/products/flex-lite-elbow-guard' },
  { id:'elp-bliss-arg-vertical', cat:'elbowpad', brand:'Bliss', model:'ARG Vertical Elbow Pad', price:80, weight:180, status:'discontinued',
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], desc:'Flexible ARG padding with EVA side padding and Kevlar reinforcement. Weight per pair (approx, unverified - specs kept as sample). Marked discontinued: BLISS Protection GmbH\'s current fetched elbow-pad lineup (blisscamp.com) lists only ARG Minimalist+ and Team Elbow Pad - no ARG Vertical Elbow Pad.' },
  { id:'elp-bliss-arg-minimalist-plus', cat:'elbowpad', brand:'Bliss', model:'ARG Minimalist+ Elbow Pad', price:69.90,
    disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'The real successor named in the discontinued-note above (kit-breadth-6 follow-through) - minimalist perforated lycra sleeve with a 3D-molded ARG pad, three-piece asymmetric-shape elbow layout. No CE/EN1621 standard stated on the fetched page, so no `certs` token. No weight published. Price confirmed $69.90 on blisscamp.com (BLISS Protection GmbH\'s own direct-sale site).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://blisscamp.com/us/arg-minimalist-elbow-pad/123168000' },
  { id:'elp-bliss-team', cat:'elbowpad', brand:'Bliss', model:'Team Elbow Pad', price:49.90,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'The other current elbow SKU named in the discontinued-note above - ergonomic World Cup-derived pad, intensified padding at the elbow, adjustable elastic straps. Page states "CE-EN-1621-1 certified" with no explicit level qualifier (the sibling Team Knee Pad page on the same site states an explicit "EN-1621-1:2012 Level 2" for that different product, showing BLISS DOES publish levels when they apply it - so the unqualified wording here is treated as genuinely unspecified, not entered as either L1 or L2). Price confirmed $49.90 on blisscamp.com.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://blisscamp.com/us/team-elbow-pad/123146000' },
  { id:'elp-alpinestars-paragon-plus', cat:'elbowpad', brand:'Alpinestars', model:'Paragon Plus Elbow Protector', price:65,
    disciplines:['trail','enduro'], sizes:['2XS','XS','S','M','L','XL','2XL'], certs:['en1621-1-l1'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14',
    source:'https://www.alpinestars.com/products/paragon-plus-elbow-protector',
    desc:'Breathable stretch-mesh slip-on guard, sold as a pair. Fetched alpinestars.com product page: $64.95, "CE certified elbow protector to EN 1621_1 : 2012 LEVEL 1", sizes 2XS-2XL. No weight published on the page - omitted rather than guessed (weight is optional in this schema).' },
  { id:'elp-alpinestars-aimpact-plasma-elite', cat:'elbowpad', brand:'Alpinestars', model:'A-Impact Plasma Elite Elbow Protector', price:144.95,
    certs:['en1621-1-l2'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Top-tier soft-shell elbow guard above Paragon Plus - bio-based Nucleon PLASMA foam insert, double-layer construction, dual strap closure. Fetched alpinestars.com product page: $144.95 confirmed, "EN 1621-1:2012 Level 2" explicitly stated. No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.alpinestars.com/products/a-impact-plasma-elite-elbow-protector' },
  { id:'elp-alpinestars-aimpact-plasma-elite-shield', cat:'elbowpad', brand:'Alpinestars', model:'A-Impact Plasma Elite Shield Elbow Protector', price:154.95,
    certs:['en1621-1-l2'], disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Hard-shell tier above the Plasma Elite (adds an over-injected TPU shell over the same Nucleon PLASMA insert). Fetched alpinestars.com product page: $154.95 confirmed, "EN 1621-1:2012 Level 2" explicitly stated. No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.alpinestars.com/products/a-impact-plasma-elite-shield-elbow-protector' },
  { id:'elp-endura-mt500-d3o', cat:'elbowpad', brand:'Endura', model:'MT500 D3O Elbow Pad', price:110, weight:200,
    disciplines:['trail','enduro'], sizes:['S/M','M/L','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mt500-d3o%C2%AE-elbow-pads-black-re1285bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "MT500 D3O Elbow Pads", "$110.00 USD" (already matched the sample), D3O impact padding; sizes corrected S/M/L/XL -> the real S/M-M/L-L/XL run. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'elp-endura-singletrack-lite-2', cat:'elbowpad', brand:'Endura', model:'SingleTrack Lite Elbow Pads II', price:44.99,
    disciplines:['trail'], sizes:['S/M','M/L','L/XL'],
    desc:'Budget/all-day tier below the D3O-based MT500 - non-certified multi-density PU foam insert (no CE/EN1621 standard claimed on the page, so no `certs` token). Product code RE1257BK, a genuinely distinct SKU from the MT500 (RE1285BK) row above - checked to rule out a same-product rename before adding (kit-breadth-6 EVS/Endura naming-collision lesson). MSRP $44.99 confirmed on the fetched endurasport.com US product page. No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.endurasport.com/singletrack-lite-elbow-pads-ii-black/12928536.html' },
  { id:'elp-scott-grenade-evo', cat:'elbowpad', brand:'Scott', model:'Grenade Evo Elbow Guard', price:99.99, weight:190,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    source:'https://www.scott-sports.com/us/en/product/scott-grenade-evo-elbow-guards',
    desc:'D3O padding, neoprene + mesh construction. Re-fetched scott-sports.com (2026-07-17): price $99.99, sizes S/M/L, cert text "PPE cat. II according to EN 1621-1:2012; Protector E, Type A, Level 1" all confirmed. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17' },
  { id:'elp-kaliprotectives-veda', cat:'elbowpad', brand:'Kali Protectives', model:'Veda Elbow Guard', price:50, weight:130,
    disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'Minimalist slip-on soft guard. Weight per pair (approx, not published on the maker page - kit'
      + ' verification does not block on weight per VERIFY-PROTOCOL). Fetched kaliprotectives.com/products/veda-elbow-guard.js: confirmed'
      + ' MSRP $50.00 exactly (compare_at_price; the product is currently tagged "closeout" and selling at'
      + ' a $10 clearance price, remaining sizes limited to a few colorway/size combos) and no CE/EN1621'
      + ' certification is published, so no cert token applies.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.kaliprotectives.com/products/veda-elbow-guard' },
  { id:'elp-kaliprotectives-mission-2', cat:'elbowpad', brand:'Kali Protectives', model:'Mission 2.0 Elbow Guard', price:70,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Ultralight articulated trail pad above the Veda - 3D molded elbow cap, 4-way stretch. Page states "3D molded elbow cap for EN-1621-1 elbow protection" (no explicit level, entered as the base L1 tier per this catalog\'s convention for an unqualified EN1621-1 claim - matches the sibling Alpinestars Paragon Plus row\'s treatment of the same wording pattern). Fetched kaliprotectives.com product page: shown as "Sale Save $70.00 $70.00" (a rendering quirk meaning $70.00 is the regular/MSRP price, matched against a second WebSearch confirmation). No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.kaliprotectives.com/products/mission-2-0-elbow-guard' },
  { id:'elp-kaliprotectives-strike', cat:'elbowpad', brand:'Kali Protectives', model:'Strike Elbow Guards', price:82.50,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Kali\'s top gravity-tier elbow pad - Xelion high-impact padding plus EVA support padding, non-slip bands. Fetched kaliprotectives.com/collections/strike: MSRP $82.50 confirmed. No cert standard stated on the product page (only the Mission 2.0 line publishes an EN1621-1 claim). No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.kaliprotectives.com/collections/strike' },
  { id:'elp-kaliprotectives-kula', cat:'elbowpad', brand:'Kali Protectives', model:'Kula Hard Elbow Guard', price:60,
    disciplines:['trail','enduro'], sizes:['S','M','L'],
    desc:'Hybrid hard/soft-shell elbow guard, positioned between the soft Veda and the certified Mission/Strike lines. Fetched kaliprotectives.com product page: shown as "$10.00 $60.00" (a clearance sale price against the $60.00 regular/MSRP - this field stores the MSRP, not the sale price, per pricing policy). No cert standard stated on the page. No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.kaliprotectives.com/products/kula-hard-elbow-guard' },
  { id:'elp-demon-tactic', cat:'elbowpad', brand:'Demon', model:'Tactic Elbow/Forearm Guard', price:59.99,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Hard-shell alternative below the D3O-based Hyper X - articulating polypropylene shell over vented EVA padding, adjustable elastic straps, sold in pairs. No CE/EN1621 standard stated on the fetched page, so no `certs` token. MSRP $59.99 (page itself rendered in PLN on this fetch - 216.00 zl at the matching size-tier price - confirmed against a USD-denominated WebSearch snippet of the same product). No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://demon-united.com/products/demon-tactic-elbow-forearm-guard' },
  { id:'elp-demon-hyperx-d3o', cat:'elbowpad', brand:'Demon', model:'Hyper X D3O Elbow', price:69.99, weight:190,
    disciplines:['trail','enduro'], sizes:['M','L','XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Re-fetched demon-united.com/products/demon-hyper-x-d3o-elbow 2026-07-20: price CORRECTED $70 -> $69.99 exactly (Small is listed but shown unavailable, matching the existing M/L/XL sizing); page cert text reads "CE EN 1621-1 certified" without an explicit L1/L2 qualifier, so no cert token is stored (fetched-source-only rule). Weight per pair (approx, not published on the page) kept as the existing sample per the kit weight policy.',
    source:'https://demon-united.com/products/demon-hyper-x-d3o-elbow' },
  { id:'elp-bluegrass-skinny', cat:'elbowpad', brand:'Bluegrass', model:'Skinny Elbow Pads', price:60, weight:90,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'], status:'discontinued',
    desc:'Two-layer foam padding, silicone grippers. CORRECTED to discontinued (2026-07-17): the "Skinny" line is absent from the current met-helmets.com/en/shop/gravity/bluegrass-protections/ catalog (see knp-bluegrass-skinny-d3o); no successor SKU confirmed by name.' },
  { id:'elp-bluegrass-skinny-d3o', cat:'elbowpad', brand:'Bluegrass', model:'Skinny D3O Elbow Pads', price:120, weight:130,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], status:'discontinued',
    desc:'D3O-padded tier above the standard Skinny pad. CORRECTED to discontinued (2026-07-17): the "Skinny" line is absent from the current met-helmets.com/en/shop/gravity/bluegrass-protections/ catalog (see knp-bluegrass-skinny-d3o); no successor SKU confirmed by name.' },
  { id:'elp-oneal-flow', cat:'elbowpad', brand:'O\'Neal', model:'Flow Elbow Guard', price:59.99, weight:180, mfgPn:'0259-103',
    disciplines:['trail','enduro'], sizes:['M','L','XL'],
    desc:'IPX soft-gel/Lycra combination pad. Weight per pair (approx, not published on the maker page - kit apparel does not require it). Re-fetched oneal.com 2026-07-20: confirms $59.99 and sizes M/L/XL exactly; no cert standard is stated on the page itself (a retailer-only EN1621-1 claim was not used per the fetched-source-only rule).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://oneal.com/products/flow-elbow-guard' },
  { id:'elp-tsg-joint-sleeve', cat:'elbowpad', brand:'TSG', model:'Joint Elbow Sleeve', price:75.55, weight:291,
    disciplines:['trail'], sizes:['XXS/XS','S/M','L/XL','XXL'],
    desc:'Softshell slip-on sleeve, low-profile trail guard. Weight per pair, maker-stated ("291 g") on the fetched ridetsg.com product page; sizes corrected to add XXL. Price is EUR69.95 (VAT incl.) converted to a $75.55 USD sample at ~1.08 USD/EUR (no confirmed US-dollar storefront, matching the catalog\'s existing EUR-conversion precedent for this class of source) -- basis disclosed per THE PRICE RULE. Cert protocol (PPE TS0002, based on EN1621-1:2012) does not state a Level, so no cert token is tagged.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://ridetsg.com/shop/elbowsleeve-joint/72014-25-102' },
  { id:'elp-sweetprotection-elbowpads', cat:'elbowpad', brand:'Sweet Protection', model:'Elbow Pads', mfgPn:'835014BLACK', price:99.95, weight:155,
    certs:['en1621-1-l2'], disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'kit-breadth-1 (2026-07-22): low-volume multi-impact pad, 3D anatomical shape, the elbow counterpart to the Knee Pads (knp-sweetprotection-bearsuit-light).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.sweetprotection.com/us/en/elbow-pads-black/' },
  { id:'elp-sweetprotection-elbowguardspro', cat:'elbowpad', brand:'Sweet Protection', model:'Elbow Guards Pro', mfgPn:'860005BLACK', price:130, weight:285,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'kit-breadth-1 (2026-07-22): removable Level 1 3S visco-elastic pad, the elbow counterpart to the Knee Guards Pro (knp-sweetprotection-kneeguardspro).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.sweetprotection.com/us/en/elbow-guards-pro-black/' },
  { id:'elp-scott-soldier', cat:'elbowpad', brand:'Scott', model:'Soldier Elbow Guard', mfgPn:'4199780001010', price:79.99,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'kit-breadth-1 (2026-07-22): removable D3O LP1 flexible plate, the elbow counterpart to the Soldier Knee Guard (knp-scott-soldier); cert confirmed on Scott\'s own PROTECTORS technical PDF ("LP1 L1 ELBOW"). No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.scott-sports.com/us/en/products/apparel-equipment-mw-equipment-body-protection' },
  { id:'elp-scott-missionevo', cat:'elbowpad', brand:'Scott', model:'Mission Evo Elbow Pads', mfgPn:'2745260001006', price:64.99,
    disciplines:['trail'], sizes:['S','M','L','XL'],
    desc:'kit-breadth-1 (2026-07-22): strapless stretch-mesh EVA pad, the elbow counterpart to the Mission Evo Knee Pads (knp-scott-missionevo) - same maker-stated PPE cat. I, untagged rather than mis-certed. No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.scott-sports.com/us/en/products/apparel-equipment-mw-equipment-body-protection' },

  /* -- Body armor (coverage optional) -- */
  { id:'arm-fox-baseframe-pro', cat:'bodyarmor', brand:'Fox', model:'Baseframe Pro D3O', price:214.95, weight:640,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'CORRECTED 2026-07-17: price is the fetched $214.95 list for the current "Baseframe Pro Chest Guard" (was sample $180). Maker page states "EN1621-1 level 1 back and shoulder certifications" - EN1621-1 is the LIMB standard, not a valid bodyarmor cert token (en1621-2/3 back-protector family), likely templated marketing copy shared with Fox\'s limb-guard pages; not asserting a cert token on this ambiguous wording. No weight published, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/baseframe-pro-chest-guard/27426.html' },
  { id:'arm-leatt-airflex-stealth', cat:'bodyarmor', brand:'Leatt', model:'AirFlex Stealth', price:130, weight:280,
    coverage:'back', disciplines:['enduro','dh'], sizes:['S/M','L/XL'], status:'discontinued',
    desc:'Checked 2026-07-16: the AirFlex line no longer appears in us.leatt.com\'s current catalog (~1490 products searched); current back protectors are the ReaFlex Stealth / 3DF AirFit lines. Flagged discontinued; price/weight left as prior sample.' },

  /* -- Body armor grind additions (2026-07-14, grind/kit-bodyarmor) --
     Breadth across chest/back/full-vest protection. certs are FETCHED-SOURCE-ONLY:
     tagged only where a manufacturer's own product page confirmed the exact EN
     1621 level (Leatt via us.leatt.com, POC via poc.com, iXS via ixs.com). Every
     other row below is left cert-free (dormant) rather than inferred from a
     third-party retailer blurb - a missing cert beats a guessed one. */
  { id:'arm-leatt-reaflex', cat:'bodyarmor', brand:'Leatt', model:'ReaFlex', price:399, weight:1140,
    coverage:'chest-back', certs:['en1621-2-l1','en1621-3'], disciplines:['enduro','dh'],
    sizes:['S','M','L','XL'], source:'https://us.leatt.com/products/body-protector-reaflex',
    desc:'Floating chest+back plates. Weight "from" figure (smallest size); elbow/shoulder EN1621-1 padding is not a bodyarmor-cert token here.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16' },
  { id:'arm-poc-spine-vpd-air-vest', cat:'bodyarmor', brand:'POC', model:'Spine VPD Air Vest', price:170, weight:530,
    coverage:'back', certs:['en1621-2-l1'], disciplines:['trail','enduro'],
    sizes:['S','M','L','XL'], source:'https://poc.com/en-us/product/spine-vpd-air-vest-uranium-black-1',
    desc:'Low-profile back-only vest, worn under a jersey. Weight approx, size L. Re-fetched poc.com (2026-07-17): confirmed price $170 exactly; weight not itemized per-size on the page so the sample is kept.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17' },
  { id:'arm-poc-spine-vpd-2-0-vest', cat:'bodyarmor', brand:'POC', model:'Spine VPD 2.0 Vest', price:248, weight:850,
    coverage:'back', certs:['en1621-2-l1'], disciplines:['enduro','dh'], sizes:['S','M','L'],
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20',
    source:'https://poc.com/en/product/spine-vpd-20-vest-black',
    desc:'Re-fetched poc.com 2026-07-20: CORRECTED coverage from chest-back to back-only - the maker page explicitly describes "full back protection", EN 1621-2 Level 1 (both re-confirmed), and a distinct "Spine VPD 2.0 Jacket" SKU exists separately for chest+back coverage (POC does not bundle both into the "Vest" name). Sizing is actually a slim/regular x S/M/L matrix (S-SLM/S-REG/M-SLM/M-REG/L-SLM/L-REG), simplified here to S/M/L; catalog\'s XL is not offered. Price CORRECTED to $248, converted from the confirmed 230 EUR maker price at ~1.08 USD/EUR (same disclosed-basis convention as the Bluegrass/iXS/Sweet Protection EUR-sourced armor rows elsewhere in this category) - no USD storefront exists. Weight not published, kept as the existing sample per the kit weight policy.' },
  { id:'arm-fox-titan-sport-jacket', cat:'bodyarmor', brand:'Fox', model:'Titan Sport Jacket', price:199.95, weight:3175,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Hard-shell plastic chest/back/shoulder plates over vented mesh. Weight approx (~7 lb), not published on the fetched page so stays prior sample. CORRECTED 2026-07-17: price is the fetched $199.95 (was sample $200, essentially unchanged); sizes widened to the fetched XS-2XL range. foxracing.com now catalogs this under Moto rather than MTB, but it remains a real, currently-sold crossover product - kept, not removed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/titan-sport-jacket/41225.html' },
  { id:'arm-troyleedesigns-rockfight-ce', cat:'bodyarmor', brand:'Troy Lee Designs', model:'Rockfight CE', price:195, weight:1089,
    coverage:'chest', disciplines:['enduro','dh'], sizes:['XS/SM','MD/LG','XL/2X'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', sourceType:'manufacturer',
    source:'https://troyleedesigns.com/products/rockfight-ce-chest-protector-black',
    desc:'Verified 2026-07-16 via the .js Shopify product-JSON endpoint: $195.00 USD price confirmed, sizes confirmed. Maker states a CE EN14021 Stone Shield front plate and a D3O back insert exceeding "CE EN1621 Level 1" without naming the exact -2/-3 sub-standard, so no `certs` token is asserted (would be a guess). Per-variant weight sourced from the JSON (XS/SM 907g, MD/LG 1089g, XL/2X 1270g) - 1089g (MD/LG) used as the representative figure, correcting the prior 450g sample (which undercounted a full front+back chest protector).' },
  { id:'arm-100-tarka-vest', cat:'bodyarmor', brand:'100%', model:'Tarka Vest', price:149, weight:620,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Full-mesh base-layer vest, front+back protection. RE-CHECKED 2026-07-19 via'
      + ' browser-rendered 100percent.com site search (WebFetch JS-walled): "tarka" returns zero'
      + ' results site-wide. Confirmed discontinued. Left unverified, no fields changed.' },
  { id:'arm-ixs-trigger-upper', cat:'bodyarmor', brand:'iXS', model:'Trigger Upper Body Protective', price:270, weight:900,
    coverage:'chest-back', certs:['en1621-2-l1'], disciplines:['trail','enduro'],
    sizes:['S','M','L','XL'], source:'https://www.ixs.com/en/products/ixs-trigger-upper-body-protective-grau',
    desc:'Xmatter back/shoulder/elbow padding (EN1621-1:2012 L1) + NockOut chest/rib padding'
      + ' (back panel is EN1621-2:2014 L1, the certs token), FlexZip front closure. EUR249.90'
      + ' RRP converted to $270 USD sample - no US MSRP page found. Weight not published, stays'
      + ' sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19' },
  { id:'arm-dainese-trail-skins-air-vest', cat:'bodyarmor', brand:'Dainese', model:'Trail Skins Air Vest', price:139, weight:420,
    certs:['en1621-2-l1'], coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Fetched dainese.com: CORRECTED price $150 -> $139 (currently on sale at $69.50, sale price not used per MSRP-basis pricing policy), sizes extend to XXL, coverage corrected to chest-back (removable Pro-Shape shoulder + back protectors, Auxagon back protector + Auxetic chest protection, "CE EN 1621.2 Level 1" confirmed). Weight = maker-published size-L figure (420g).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.dainese.com/us/en/trail-skins-air---bike-protective-vest-203879728001.html' },
  { id:'arm-alpinestars-bionic-action', cat:'bodyarmor', brand:'Alpinestars', model:'Bionic Action Chest Protector', price:119.95, weight:650,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['M/L','XL/2XL'],
    desc:'Weight approx - the fetched maker page (alpinestars.com/products/bionic-action-chest-protector) states no weight and currently markets this item under its MX (motocross) line rather than MTB, though the same chest/back protector is standard DH-crossover armor (the same pattern as this catalog\'s existing MX-heritage neck braces). No cert is quoted on the page, so none is tagged. Price+sizes corrected against the fetched page (was $110, S/M+L/XL). VERIFIED 2026-07-17: re-fetched, $119.95 and sizes M/L + XL/2XL confirmed again. Weight stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/bionic-action-chest-protector' },
  { id:'arm-7idp-flex-suit', cat:'bodyarmor', brand:'7iDP', model:'Flex Suit', price:180, weight:900,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['S','M','L','XL'], status:'discontinued',
    desc:'Full torso protector suit: flexible padding that hardens on impact. CORRECTED to discontinued (2026-07-17): 7idp.com/products/flex-suit now redirects to the homepage; the current /collections/body catalog lists only 4 items at $19.99-$44.99, none matching a full-torso $180 suit. No successor SKU confirmed by name.' },
  { id:'arm-raceface-flank-core', cat:'bodyarmor', brand:'Race Face', model:'Flank Core', price:140, weight:600,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'D3O foam at shoulders/spine + heat-molded chest piece, worn as an undershirt. Weight approx. UNVERIFIED - a 2026-07-16 check found raceface.com/products/flank-core now serves the Protective Wear collection page rather than a product (soft-404, no redirect/error), and the current collection listing (14 items fetched) has no Flank Core entry; "Ruxton Core" appears to be the current core/torso-armor product in that lineup instead. Left as an unverified sample, not fabricated and not marked discontinued on this evidence alone (retry-queue candidate: confirm via a direct support/archive check; Ruxton Core is a separate real product worth its own future row, out of this batch\'s scope).' },
  { id:'arm-evoc-protector-vest-lite', cat:'bodyarmor', brand:'EVOC', model:'Protector Vest Lite', price:165, weight:490,
    coverage:'back', disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'CORRECTED 2026-07-16: coverage is BACK ONLY (Liteshield back protector), not chest-back'
      + ' - both a fetched EU maker page (evocsports.com/products/protector-vest-lite-men, EUR190,'
      + ' 680g, EN1621-2 level 1, back-only) and a fetched US site (evocusa.com/products/'
      + ' protector-vest-light, $165, 480-510g, CE back+coccyx) confirm back-only, no chest element.'
      + ' Left UNVERIFIED: the two region pages disagree enough on weight (680g vs ~490g) that this'
      + ' may be two different generations/SKUs under different regional names, not one confirmed'
      + ' product - price/weight here follow the clean-USD US listing pending resolution.' },
  { id:'arm-bluegrass-armour-lite', cat:'bodyarmor', brand:'Bluegrass', model:'Armour Lite', price:162, weight:520,
    coverage:'back', certs:['en1621-2-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Back-only protection vest, EN 1621-2 Level 1 certified. Maker lists EUR150 (converted at ~1.08 USD/EUR). Weight is size S (M 525g, L 570g, XL 625g).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-16', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-protections/armour-lite/' },

  /* -- Body armor grind batch 2 (2026-07-14, coordinator-requested scope extension) --
     Deeper market coverage + first VERIFIED bodyarmor rows (weight+cert confirmed
     against the maker's own product page, lastChecked 2026-07-14): Leatt 3DF AirFit
     Lite Evo, iXS Flow, Sweet Protection Back Protector Vest 2.0. Demon's V7 top
     is a real cert case worth noting: its own page states "CE EN 1621-1" pads
     (the LIMB standard) at chest/back/shoulder/elbow, not EN1621-2/3 - the
     bodyarmor cert vocab correctly has no slot for that, so it stays cert-free
     rather than mis-tagged. EUR-priced rows carry a converted-approx USD price
     (noted in desc) with the EUR figure kept in source-page terms for provenance. */
  { id:'arm-leatt-3df-airfit-lite-evo', cat:'bodyarmor', brand:'Leatt', model:'3DF AirFit Lite Evo', price:329, weight:1350,
    coverage:'chest-back', certs:['en1621-2-l1','en1621-3'], disciplines:['enduro','dh'],
    sizes:['S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14',
    source:'https://us.leatt.com/products/body-protector-3df-airfit-lite-evo',
    desc:'Floating 3DF AirFit chest+back plates; elbow/shoulder EN1621-1 padding not a bodyarmor-cert token. Weight "from" figure (smallest size).' },
  { id:'arm-leatt-chestprotector-4-5-hybrid-junior', cat:'bodyarmor', brand:'Leatt', model:'Chest Protector 4.5 Hybrid - Junior', price:169,
    coverage:'chest-back', certs:['en1621-3','en1621-2-l2'], disciplines:['enduro','dh'],
    sizes:['Junior-S/M','Junior-L/XL'],
    desc:'Genuine junior-specific SKU (own product page, junior chest sizing 134-159cm), not a resized adult chest protector: hard-shell FlexMesh Pro front (chest EN1621-3 Level 2) + soft 3DF foam back (EN1621-2 Level 2), BraceOn neck-brace-compatible strap. Weight not published on the fetched page, stays unset.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/chest-protector-4-5-hybrid-junior' },
  { id:'arm-leatt-chestprotector-2-5-hybrid-junior', cat:'bodyarmor', brand:'Leatt', model:'Chest Protector 2.5 Hybrid - Junior', price:134,
    coverage:'chest-back', certs:['en1621-2-l1'], disciplines:['trail','enduro'],
    sizes:['Junior-S/M','Junior-L/XL'],
    desc:'Genuine junior-specific SKU (own product page, junior chest sizing 134-159cm), a lighter tier below the 4.5 Hybrid Junior: hard-shell front rated for roost only (EN14021, not a catalog protectionCert token, so left out of `certs`) + soft-shell back (EN1621-2 Level 1). Weight not published on the fetched page, stays unset.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/chest-protector-2-5-hybrid-junior' },
  { id:'arm-ixs-flow-upper', cat:'bodyarmor', brand:'iXS', model:'Flow Upper Body Protective', price:185,
    coverage:'back', certs:['en1621-2-l1'], disciplines:['trail','enduro'],
    sizes:['S','M','L','XL'], verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14',
    source:'https://ixs.com/en/mtb/mtb-equipment/protection/1574/flow-upper-body-protective-grey',
    desc:'Removable Xmatter spine padding, sleeveless. Price approx, converted from EUR169 maker MSRP; maker page does not publish a weight.' },
  { id:'arm-sweetprotection-back-protector-vest-2', cat:'bodyarmor', brand:'Sweet Protection', model:'Back Protector Vest 2.0', price:195, weight:600,
    coverage:'back', certs:['en1621-2-l1'], disciplines:['trail','enduro'],
    sizes:['S','M','L','XL'], verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-14',
    source:'https://www.sweetprotection.com/eu/en/back-protector-vest-20-mens-true-black/',
    desc:'3S Visco Elastic Foam back protector. Price approx, converted from EUR179 maker MSRP.' },
  { id:'arm-sixsixone-recon-advance', cat:'bodyarmor', brand:'SixSixOne', model:'Recon Advance Upper Body Protection', price:250, weight:890,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Koroyd back plate + Astrotech elbow/shoulder; maker states EN1621-2 (back)/EN1621-1 (elbow-shoulder) without a published level, so no cert token is tagged. Weight approx, size M. Checked 2026-07-16: sixsixone.com now returns 403 Forbidden site-wide - the brand appears to have gone dark (see glv-sixsixone-comp for detail); no fetch possible.' },
  { id:'arm-bliss-arg-vertical-ld-vest', cat:'bodyarmor', brand:'Bliss', model:'ARG Vertical LD Vest', price:169.90,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Armourgel (ARG) spine insert + EVA foam chest pads. Re-fetched blisscamp.com/us/arg-vertical-ld-vest/123120000 kit-12 (2026-07-21): $169.90 USD, coverage (chest AND back, not back-only) and sizes XS-XXL all reconfirmed exactly. Page states "CE EN1621-2" certified for the back protector without a published level, so no cert token is tagged. No weight published - stays a sample per the kit-apparel weight-exemption policy (armor/protection is explicitly exempt, VERIFY-PROTOCOL.md).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://blisscamp.com/us/arg-vertical-ld-vest/123120000' },
  { id:'arm-bliss-arg-minimalist-vest', cat:'bodyarmor', brand:'Bliss', model:'ARG Minimalist Vest', price:149.90,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Superlight mesh vest, ARG spine padding, front zipper, detachable adjustment belt. Page states "CE EN-1621-2:2014 CB certified (back)" with no L1/L2 qualifier, so no `certs` token is entered (same convention as the sibling ARG Vertical LD Vest row above). No weight published. Fetched blisscamp.com\'s current product listing (BLISS Protection GmbH\'s own direct-sale site) 2026-breadth-6, confirming $149.90 MSRP.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://blisscamp.com/us/arg-minimalist-vest/123134000' },
  { id:'arm-bliss-arg-comp-ld-tank-top-2', cat:'bodyarmor', brand:'Bliss', model:'ARG Comp LD Tank Top 2.0', price:169.90,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'],
    desc:'Sleeveless lycra base-layer armor top - ARG spine + tailbone pads, side zipper, elbow-pad compatible (worn with the ARG Vertical or Minimalist+ Elbow Pad). CE EN1621-2 certified back protector, no L1/L2 qualifier stated so no `certs` token entered. Listed alongside a legacy "ARG Comp LD Tank Top" (1.0, same $169.90 price) still shown on the current site - the 2.0 is entered here as the current generation per this catalog\'s append-only-generations convention; the 1.0 was left uncataloged rather than double-counted as a near-identical row. No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://blisscamp.com/us/arg-comp-ld-tank-top-2.0/123255000.4' },
  { id:'arm-alpinestars-a4-max', cat:'bodyarmor', brand:'Alpinestars', model:'A-4 Max Chest Protector', price:190,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'STRONGER SCOPE FLAG for the coordinator (2026-07-17, via bdata past the 404 wall): alpinestars.com/products/a-4-max-roost-guard now redirects to the homepage (confirms discontinued, not just walled). The GB storefront\'s /collections/mx-chest-protection (an MX-only collection - "Roost Guard" is motocross terminology, matching the TLD 5900 case) lists the CURRENT chest-protector lineup as A-1 Pro/A-10 V2/A-4 Plasma/A-5 Plasma/A-6/Stella Plasma - no "A-4 Max" and no MTB-side equivalent found anywhere on alpinestars.com. This looks like the same out-of-scope-moto-product pattern as the two removed Troy Lee Designs rows, but is left in place (not unilaterally removed) since removal here was outside this worker\'s explicitly scoped TASK 4 (TLD-only); flagging for an explicit coordinator scope call. Price/coverage remain the prior sample.' },
  { id:'arm-alpinestars-aimpact-plasma-jacket-ss', cat:'bodyarmor', brand:'Alpinestars', model:'A-Impact Plasma Protection Jacket - Short Sleeve', price:289.95,
    coverage:'chest-back', certs:['en1621-2-l2','en1621-3'], disciplines:['enduro','dh'], sizes:['S','M','L','XL','2XL'],
    desc:'The current top-tier Alpinestars MTB chest/back jacket (found while re-checking the A-4 Max discontinuation flag above) - removable Nucleon PLASMA shoulder/back/chest protectors, full-length back protector to the coccyx, two hip side pads. Fetched alpinestars.com product page: $289.95 confirmed, "Shoulder Protectors: EN 1621-1:2012 LEVEL 2 / Back Protector: EN 1621-2:2014 LEVEL 2 / Chest Protectors: EN 1621-3:2018 LEVEL 2" - only the back (EN1621-2 L2) and chest (EN1621-3) tokens map to this schema\'s bodyarmor cert vocab (the shoulder EN1621-1 standard is the limb-protector family used on elbowpad/kneepad rows, not a bodyarmor token here). No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.alpinestars.com/products/a-impact-plasma-protection-jacket-short-sleeve' },
  { id:'arm-evoc-protector-vest-airplus', cat:'bodyarmor', brand:'EVOC', model:'Protector Vest Air+', price:220, weight:600,
    coverage:'back', disciplines:['trail','enduro'], sizes:['S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed',
    lastChecked:'2026-07-16', source:'https://www.evocusa.com/products/protector-vest-air-men',
    desc:'CORRECTED 2026-07-16: US MSRP is $220 (was a EUR199 conversion estimate). Liteshield'
      + ' Air back protector + coccyx/shoulder/collarbone/iliac-crest padding; weight is the size'
      + ' M figure (590/600/610/620g across S-XL). Cert stated as "CE certified" (back + coccyx)'
      + ' without a published EN1621-2 level, so no cert token is tagged.' },
  { id:'arm-bluegrass-armour-bs-d3o', cat:'bodyarmor', brand:'Bluegrass', model:'Seamless B&S D3O', price:270, weight:580,
    certs:['en1621-2-l1'], coverage:'chest-back', disciplines:['enduro','dh'], sizes:['S/M','L/XL'],
    desc:'Fetched met-helmets.com (2026-07-17): the old "Armour B&S D3O" name/id is now sold as "Seamless B&S D3O" (€250 -> ~$270 at ~1.08 USD/EUR; the id kept for append-only continuity). Removable D3O BP4 L1 back protector + D3O T5 EVO X L1 shoulder shells, EN 1621-2:2014 Level 1, Dryarn microfiber, seamless construction. Weight = maker-published S/M figure (580g; L/XL is 660g).',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-17', source:'https://www.met-helmets.com/en/shop/gravity/bluegrass-protections/seamless-bs-d3o/' },
  { id:'arm-oneal-stv-long-sleeve', cat:'bodyarmor', brand:"O'Neal", model:'STV Long Sleeve Protector', price:184, weight:740,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Removable IPX shoulder/elbow foam, neck-brace compatible loops. VERIFIED kit-13'
      + ' (2026-07-21): fetched oneal.eu/en/products/oneal-stv-long-sleeve-protector-shirt-1'
      + ' (browser pane; oneal.com US site does not list this SKU) - confirms SKU 0294-202,'
      + ' EUR169.99, sizes S-XXL, EN1621-2 certified elastic-Lycra protector shirt covering'
      + ' chest/back/kidneys with removable IPX soft shoulder/elbow protectors, neck-brace'
      + ' compatible. The page states the EN1621-2 standard but not which protection level (L1 vs'
      + ' L2), so no level-specific `certs` token is asserted (a real cert with no confirmed level'
      + ' shouldn\'t be forced to one). Price is a USD estimate converted from the confirmed'
      + ' EUR169.99 MSRP. Weight not published; kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-21',
    source:'https://www.oneal.eu/en/products/oneal-stv-long-sleeve-protector-shirt-1' },
  { id:'arm-demon-flexforce-x-v7', cat:'bodyarmor', brand:'Demon', model:'FlexForce X V7 D3O Impact Top', price:239.99,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    source:'https://demon-united.com/products/demon-united-x-v7-d3o-mens-impact-padded-top',
    desc:'Six D3O pads at chest/back/shoulder/elbow; maker page certifies them "CE EN 1621-1" (the limb standard), not EN1621-2/3, so no bodyarmor cert token applies. Re-fetched 2026-07-20: price $239.99 and sizes S-XXL confirmed again, matching the 2026-07-16 pass exactly; no weight published on the page, so it stays omitted per the kit weight policy (never blocks verification).' },
  { id:'arm-demon-flexforce-x-v7-womens', cat:'bodyarmor', brand:'Demon', model:'FlexForce X V7 D3O Impact Top - Women', price:199.99, fitCut:'womens',
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    desc:'The women\'s-cut counterpart to the men\'s V7 row above - same six-pad D3O chest/back/shoulder/elbow construction, own SKU and own MSRP (a real distinct row per the same reasoning already used elsewhere in this catalog for gendered variants, not a duplicate). Same "CE EN 1621-1" (limb standard) claim, no bodyarmor-tier cert token applies. MSRP $199.99 confirmed via a WebSearch snippet quoting the direct product page (the fetched page itself renders in EUR/discounted-variant pricing, so the confirmed USD figure is used per pricing policy). No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://demon-united.com/products/demon-united-x-v7-d3o%C2%AE-womens-impact-padded-top' },

  /* -- Body armor grind batch 3 (2026-07-14) -- */
  { id:'arm-poc-vpd-system-back', cat:'bodyarmor', brand:'POC', model:'VPD System Back', price:200, weight:540,
    coverage:'back', certs:['en1621-2-l1'], disciplines:['trail','enduro'],
    sizes:['S','M','L','XL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14',
    source:'https://poc.com/en-us/product/vpd-system-back-uranium-black',
    desc:'Strap-only back protector (no vest shell); malleable VPD foam stiffens on impact. Weight approx, size M; price is maker MSRP (frequently discounted).' },
  { id:'arm-endura-mt500-d3o-vest', cat:'bodyarmor', brand:'Endura', model:'MT500 D3O Protector Vest', price:200, weight:870,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S/M','M/L','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mt500-d3o%C2%AE-protector-vest-black-re1283bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "MT500 D3O Protector Vest", "$200.00 USD" (was sampled at $180, corrected); removable D3O LP-1 back+chest inserts in a perforated neoprene/mesh vest, maker states "CE EN 1621/1" (the limb standard), not EN1621-2/3, so no bodyarmor cert token applies; sizes corrected S/M/L/XL -> the real S/M-M/L-L/XL run. Weight kept as the prior sample estimate - the page/Shopify JSON weight is a flat shipping-placeholder figure.' },
  { id:'arm-endura-mt500-d3o-ghost-base-layer', cat:'bodyarmor', brand:'Endura', model:'MT500 D3O Ghost Base Layer', price:220, weight:960,
    coverage:'chest-back', certs:['en1621-3'], disciplines:['enduro','dh'], sizes:['S','M','L','XL','2XL'],
    desc:'A higher-tier armored base layer alongside the MT500 D3O Protector Vest above (NEW-SEASON listing in Endura US\'s Body Protectors collection, 14 SKUs checked) - D3O Ghost chest/back/shoulder protectors in a Polartec Power Dry three-quarter-zip base layer, D3O panels removable. Specs page: "Accreditation EN 1621-1:2012, EN 1621-2:2014 & EN 1621-3:2018" applied to shoulders/back/chest respectively, but the SHOULDER (limb, EN1621-1) standard is not a bodyarmor cert token in this schema and the BACK (EN1621-2) standard is stated with no L1/L2 level qualifier, so only the CHEST token `en1621-3` (which has no level variant in this catalog\'s vocab) is entered. USD MSRP "$220.00" confirmed via a WebSearch snippet quoting the US product page (the direct US fetch redirected to the GBP-priced UK storefront, £170.00, both re-checked as the same SKU RE1353BK); weight per the specs page (960g guidance, will vary by size). Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.endurasport.com/products/mt500-d3o%C2%AE-ghost-base-layer-black-re1353bk' },
  { id:'arm-evssports-sport-vest', cat:'bodyarmor', brand:'EVS Sports', model:'Sport Vest', price:155,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S/M','L/XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Articulating spine + breathable chest plate, low-profile. Re-fetched evs-sports.com/products/sport-vest 2026-07-20: compare-at/MSRP $155 and sizes S/M-L/XL-XXL confirmed again (site currently runs a $75 sale; this field stays US MSRP per DATA-ENTRY-TEMPLATE, not a street/sale price); page states no weight and no cert, so weight/cert stay omitted rather than guessed (kit weight policy: never blocks verification).',
    source:'https://www.evs-sports.com/products/sport-vest' },
  { id:'arm-evssports-vex-chest-protector', cat:'bodyarmor', brand:'EVS Sports', model:'Vex Roost Guard', price:105,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Low-profile polycarbonate chest+spine shell, neck-brace compatible. EVS now sells this SKU as "Vex Roost Guard" (retailers still list it as "Vex Chest Protector", same VEXBK part family) - re-fetched evs-sports.com 2026-07-20: model name, compare-at/MSRP $105 (site currently runs a $50 sale; this field stays US MSRP, not the street/sale price) and coverage (both sides, not chest-only) all confirmed again. Page states no weight and no cert, so both stay omitted rather than guessed.',
    source:'https://www.evs-sports.com/products/vex-roost-deflector-1' },
  { id:'arm-evssports-tug-impact-vest', cat:'bodyarmor', brand:'EVS Sports', model:'TUG Impact Vest', price:95,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL','XXL'],
    desc:'Lightweight short-sleeve under-jersey RMF (Reactive Memory Foam) vest, race-collar compatible, integrated back-pocket for the EVS CE back protector accessory. MSRP $95.00 confirmed on the fetched page (site currently runs a $40 sale; this field stays US MSRP per pricing policy). Page states "Meets CE 14021 Standards" - not this catalog\'s EN1621 family, so no `certs` token is entered. No weight published. Added kit-breadth-6.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.evs-sports.com/products/tug-impact-vest' },
  { id:'arm-fox-baseframe-pro-sleeveless', cat:'bodyarmor', brand:'Fox', model:'Baseframe Pro Sleeveless Chest Guard', price:209.95,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'D3O base-layer guard worn under a jersey, plus hip pads; maker states EN1621-1 level 1 back protection (the limb standard), so no bodyarmor cert token applies. CORRECTED 2026-07-17: price is the fetched $209.95 list (was sample $250, an overstatement).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/baseframe-pro-sleeveless-chest-guard/26429.html' },
  { id:'arm-gform-pro-x3-vest', cat:'bodyarmor', brand:'G-Form', model:'Pro-X3 Vest', price:93,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'SmartFlex chest/rib/back/shoulder coverage; "CE Level 1" is stated without an EN1621 standard number, so no cert token applies.'
      + ' CHECKED kit-13 (2026-07-21): fetched g-form.com/products.json (129 SKUs, the full'
      + ' current catalog) - zero "vest" products (the only Pro-X3 match is a youth short-sleeve'
      + ' shirt, a different product). Appears discontinued/dropped from the current lineup. Left unverified, no fields changed.' },
  { id:'arm-gform-x4-shortsleeve-shirt', cat:'bodyarmor', brand:'G-Form', model:'X4 Short Sleeve Shirt', price:139.99,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'The current G-Form MTB armored base layer (successor line to the now-dropped Pro-X3 Vest, kit-13 2026-07-21 finding above) - pre-curved SmartFlex pads at shoulders + ribs, slim-fit compression base layer. No CE/EN1621 standard stated on the page, so no cert token. No weight published. Added kit-breadth-6 via g-form.com product page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://g-form.com/products/x4-short-sleeve-shirt' },

  /* -- Body armor grind batch 4 (2026-07-14) -- */
  { id:'arm-poc-vpd-system-chest', cat:'bodyarmor', brand:'POC', model:'VPD System Chest', price:130,
    coverage:'chest', disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL'],
    source:'https://poc.com/en-us/product/vpd-system-chest-uranium-black',
    desc:'Strapless modular chest piece, pairs with the VPD System Back for full torso coverage without a vest shell. Maker page states "EN1621, level 1" without a standard number (-2 vs -3), so no cert token is tagged. Re-fetched (2026-07-17): confirmed price $130 exactly; no weight published for this modular piece.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17' },
  { id:'arm-fox-airframe-chest-guard', cat:'bodyarmor', brand:'Fox', model:'Airframe Chest Guard', price:194.95,
    coverage:'chest-back', disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Koroyd chest+back inserts, low-profile and highly ventilated. CORRECTED 2026-07-17: price is the fetched $194.95 (was sample $195, essentially unchanged). foxracing.com now catalogs this under Moto rather than MTB, but it remains a real, currently-sold crossover chest guard - kept, not removed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/airframe-chest-guard/36475.html' },
  { id:'arm-fox-airframe-pro-jacket', cat:'bodyarmor', brand:'Fox', model:'Airframe Pro Jacket CE Chest Guard', price:329.95,
    coverage:'chest-back', disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Fuller-coverage jacket version of the Airframe, with shoulder protection added. CORRECTED 2026-07-17: price is the fetched $329.95 list (was sample $260, an understatement; page currently on sale at $230.98, list used per policy). foxracing.com now catalogs this under Moto rather than MTB, but it remains a real, currently-sold crossover chest guard - kept, not removed.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/airframe-pro-jacket-ce-chest-guard/19909.html' },
  { id:'arm-scott-airflow', cat:'bodyarmor', brand:'Scott', model:'Back Protector Airflow', mfgPn:'4206111007010', price:140, weight:486,
    coverage:'back', certs:['en1621-2-l1'], disciplines:['trail','enduro'],
    desc:'kit-breadth-1 (2026-07-22): D3O Airflow plate back-only protector - Scott had zero bodyarmor rows. Price USD-confirmed on the maker\'s current US Body Protection catalog; cert (EN1621-2:2014, Full Back, Level 1) confirmed on Scott\'s own PROTECTORS technical PDF. Weight (486g) is a third-party retailer-measured spec sheet figure, not maker-published on the US page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.scott-sports.com/us/en/products/apparel-equipment-mw-equipment-body-protection',
    sourceType:'measured', weightSource:'https://www.alpinstore.com/en/618114-scott-sco-back-protector-airflow-blackwhite.html' },
  { id:'arm-scott-airflowpro', cat:'bodyarmor', brand:'Scott', model:'Back Protector Airflow Pro', mfgPn:'4206121007011', price:170,
    coverage:'back', certs:['en1621-2-l2'], disciplines:['trail','enduro'],
    desc:'kit-breadth-1 (2026-07-22): the higher-coverage tier above the Airflow (arm-scott-airflow) - maker copy states it is "designed for level 2" and Scott\'s own PROTECTORS PDF lists the AIRFLOW PRO B2502 plate at Level 2. No maker-published weight found.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.scott-sports.com/us/en/products/apparel-equipment-mw-equipment-body-protection' },
  { id:'arm-leatt-reaflex-womens', cat:'bodyarmor', brand:'Leatt', model:'ReaFlex Body Protector - Women', price:384, weight:1064,
    coverage:'chest-back', certs:['en1621-2-l1','en1621-3'], fitCut:'womens', disciplines:['enduro','dh'], sizes:['XXS','XS','S','M','L'],
    desc:'kit-breadth-3 (2026-07-22): bodyarmor had ZERO fitCut:\'womens\' rows. Genuinely distinct'
      + ' from Leatt\'s men\'s ReaFlex, not a recolor - "3D pre-curved designed specifically for the'
      + ' female form" with its own slimmer BraceOn neck-brace interface and its own size run'
      + ' (XXS-L, 148-178cm). CE certified front EN1621-3 Level 1, back EN1621-2 Level 1 (also'
      + ' carries EN1621-1 Level 1 on the elbow/shoulder sleeve, which has no bodyarmor cert vocab'
      + ' token so is left unstated). Weight "from 1.064kg" (US product page) — the lightest listed spec.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://us.leatt.com/products/body-protector-reaflex-women' },

  /* -- Neck braces (niche; no universal cert standard - certs stay dormant).
     Comprehensive sweep of the 4 recognized market brands (Leatt, Alpinestars,
     Atlas, EVS - dirtwheelsmag's buyer's-guide lineup + retailer catalogs agree
     no one else currently ships one; POD/SixSixOne/Fly/Klim/Moose/O'Neal/Fox
     checked and ruled out - POD+661 are knee/ankle only today, Fly's Leatt-built
     Podium MTB brace no longer lists on flyracing.com so its price can't be
     pinned, Klim/Moose/O'Neal/Fox don't currently sell one). Rows with a
     `source` were confirmed against a FETCHED manufacturer page 2026-07-14;
     the rest stay honest UNVERIFIED samples (either the only fetch available
     was blocked/inconsistent, or a manufacturer page gave price but not
     weight - a bare price-only fetch is still enough to verify what the row
     actually claims). -- */
  { id:'nkb-leatt-gpx-65', cat:'neckbrace', brand:'Leatt', model:'GPX 6.5 Neck Brace', price:609, weight:600,
    disciplines:['dh'], sizes:['S/M','L/XL'], desc:'Carbon-fiber flagship brace.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/neck-brace-6-5' },
  { id:'nkb-leatt-gpx-55', cat:'neckbrace', brand:'Leatt', model:'Neck Brace 5.5', price:474, weight:600,
    disciplines:['dh'], sizes:['S/M','L/XL','XXL'],
    desc:'RE-CORRECTED 2026-07-16: the canonical (non-sale) us.leatt.com/products/neck-brace-5-5 page is'
      + ' actively sold ("More than 10 in stock" on most variants) at $474.00 flat across all 5 colorways'
      + ' (Black/Grey, White, Grey, Orange, Red) and sizes; weight "from 600g (1.32lbs)" matches the prior'
      + ' sample. The earlier same-day pass fetched a different, stale "-sale" clearance URL for an older'
      + ' colorway run and wrongly marked this discontinued at $203.99-272.35 - that page is a separate,'
      + ' liquidated SKU listing, not the current product. GPX branding has been dropped from the current'
      + ' name (kept in the id for backward compatibility per the append-only id rule).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/neck-brace-5-5' },
  { id:'nkb-leatt-gpx-55-junior', cat:'neckbrace', brand:'Leatt', model:'GPX 5.5 Neck Brace - Junior', price:399,
    disciplines:['dh'], sizes:['Junior'], desc:'Youth-sized 5.5; same composite chassis, smaller shells.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/neck-brace-5-5-junior' },
  { id:'nkb-leatt-gpx-45', cat:'neckbrace', brand:'Leatt', model:'GPX 4.5 Neck Brace', price:364, weight:575,
    disciplines:['dh'], sizes:['S/M','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/neck-brace-4-5' },
  { id:'nkb-leatt-gpx-35', cat:'neckbrace', brand:'Leatt', model:'GPX 3.5 Neck Brace', price:254, weight:485,
    disciplines:['dh'], sizes:['S/M','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/neck-brace-3-5' },
  { id:'nkb-leatt-gpx-35-junior', cat:'neckbrace', brand:'Leatt', model:'GPX 3.5 Neck Brace - Junior', price:224, weight:485,
    disciplines:['dh'], sizes:['Junior'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/neck-brace-3-5-junior' },
  { id:'nkb-leatt-gpx-15-mini', cat:'neckbrace', brand:'Leatt', model:'GPX 1.5 Neck Brace - Mini', price:159,
    disciplines:['dh'], sizes:['Mini'], desc:'Smallest-rider brace; no weight spec published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/neck-brace-1-5' },
  { id:'nkb-alpinestars-bns-tech-carbon', cat:'neckbrace', brand:'Alpinestars', model:'BNS Tech Carbon', price:44.95, weight:726,
    disciplines:['dh'], sizes:['XS/M','L/XL'],
    desc:'Injection-molded carbon-polymer (not carbon-fiber) frame; SAS adjustable fit. 2026-07-16 recheck: re-fetched alpinestars.com/products/bns-tech-carbon-neck-support three separate times this session (including a request for the raw price text and full description) and it consistently shows $44.95 with no strikethrough/sale framing, and the description matches this row\'s existing spec text exactly (carbon-polymer, SAS, U-shaped, Lycra-laminated pads) - so this reverses the prior "implausible/glitch" call and corrects price down from $350. VERIFIED 2026-07-17: re-fetched again, $44.95 and One Size (XS/M + L/XL adjustable range) confirmed. Weight still not published; stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/bns-tech-carbon-neck-support' },
  { id:'nkb-alpinestars-bns-tech-2', cat:'neckbrace', brand:'Alpinestars', model:'BNS Tech 2', price:395,
    disciplines:['dh'], sizes:['XS/M','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.alpinestars.com/products/bns-tech-2-neck-support' },
  { id:'nkb-atlas-air', cat:'neckbrace', brand:'Atlas', model:'Air', price:330, weight:575,
    disciplines:['dh'], sizes:['S','M','L'], desc:'Split-flex frame with Mimic technology.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://atlasbrace.com/products/air' },
  { id:'nkb-atlas-air-lite', cat:'neckbrace', brand:'Atlas', model:'Air Lite', price:270, weight:550,
    disciplines:['dh'], sizes:['S','M','L'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://atlasbrace.com/products/air-lite' },
  { id:'nkb-atlas-vision', cat:'neckbrace', brand:'Atlas', model:'Vision', price:200, weight:365,
    disciplines:['dh'], sizes:['S','M','L'], desc:'Minimalist anti-compression collar.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://atlasbrace.com/products/vision' },
  { id:'nkb-atlas-prodigy', cat:'neckbrace', brand:'Atlas', model:'Prodigy', price:250, weight:550,
    disciplines:['dh'], sizes:['Youth'], desc:'In-between size for teens and smaller adults.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://atlasbrace.com/products/prodigy' },
  { id:'nkb-atlas-tyke', cat:'neckbrace', brand:'Atlas', model:'Tyke', price:200, weight:460,
    disciplines:['dh'], sizes:['Youth'], desc:'Smallest Atlas brace, for young kids.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://atlasbrace.com/products/tyke' },
  { id:'nkb-evs-r2', cat:'neckbrace', brand:'EVS', model:'R2 Race Collar', price:60,
    disciplines:['dh'], sizes:['Youth','Adult'], desc:'Entry-tier race collar; adult-tier price shown.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.evs-sports.com/products/r2-race-collar' },
  { id:'nkb-evs-r3', cat:'neckbrace', brand:'EVS', model:'R3 Race Collar', price:65,
    disciplines:['dh'], sizes:['Youth','Adult'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'PU core + ballistic nylon outer shell. Re-fetched evs-sports.com/products/r3-race-collar 2026-07-20: Adult price $65 and Youth price $25 both confirmed again (Adult stored as the representative figure), matching the 2026-07-16 pass. Page states no weight; omitted rather than guessed (matches the no-weight-published nkb-leatt-gpx-15-mini/junior rows in this same category).',
    source:'https://www.evs-sports.com/products/r3-race-collar' },

  /* -- Shin guards (per pair). Scoped to SKUs the maker names "...Shin..." -
     a distinct shin-protection product, not a knee guard whose description
     merely mentions shin coverage (e.g. iXS Trigger, 100% Fortis/Teratec are
     knee-guard-first SKUs and belong in `kneepad`, out of this grind's scope). */
  { id:'shg-gform-pro', cat:'shinguard', brand:'G-Form', model:'Pro Shin Guard', price:50, weight:210, status:'discontinued',
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'],
    desc:'Weight per pair (approx). CHECKED 2026-07-18: the plain "Pro Shin Guard" (no X/X3/X4 suffix) is absent from g-form.com\'s current shin/knee collections (g-form.com/collections/shin, g-form.com/collections/bike-knee-shin-ankle-guards) - superseded by Pro-X3 and Pro-Rugged 2. Flagged discontinued; price/weight left as prior sample.' },
  { id:'shg-leatt-airflex', cat:'shinguard', brand:'Leatt', model:'AirFlex Shin Guard', price:60, weight:240,
    disciplines:['enduro','dh'], sizes:['S/M','L/XL'], status:'discontinued',
    desc:'Weight per pair (approx). Checked 2026-07-16: the AirFlex line no longer appears in us.leatt.com\'s current catalog; current shin coverage lives on the combined Knee & Shin Guard Dual Axis products. Flagged discontinued; price/weight left as prior sample.' },
  { id:'shg-gform-prox3', cat:'shinguard', brand:'G-Form', model:'Pro-X3 Shin Guard', price:44.99,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'SmartFlex impact pads, anti-abrasion calf guard; per pair. Weight not published. Fetched g-form.com 2026-07-18: CORRECTED price $55 -> $44.99 (regular/list, matches the maker page\'s own strikethrough regular price during an active sale).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-18', source:'https://g-form.com/products/pro-x3-mtb-shin-guards-triple-matte-black' },
  { id:'shg-leatt-6-0-evo-ext', cat:'shinguard', brand:'Leatt', model:'Knee Guard 6.0 Evo EXT', family:'leatt-6-0-evo', price:159,
    certs:['en1621-1-l2'], disciplines:['enduro','dh'], sizes:['S','M','L','XL','XXL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://us.leatt.com/products/knee-guard-6-0-evo-ext',
    desc:'Full-length (knee+shin) sibling of the 6.0 Evo, same current Leatt lineup (fetched us.leatt.com/collections/mtb-protection/knee-guards 2026-07-16). CE Level 2. No weight published on the page, so omitted rather than guessed.' },
  { id:'shg-leatt-dualaxis', cat:'shinguard', brand:'Leatt', model:'Knee & Shin Guard Dual Axis', price:114, weight:850,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S/M','L/XL','XXL'],
    desc:'Hard-shell dual-pivot knee/shin guard, 3DF impact foam; weight per pair.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/knee-shin-guard-dual-axis', sourceType:'manufacturer' },
  { id:'shg-leatt-dualaxis-pro', cat:'shinguard', brand:'Leatt', model:'Knee & Shin Guard Dual Axis Pro', price:189, weight:740,
    certs:['en1621-1-l1'], disciplines:['enduro','dh'], sizes:['S/M','L/XL','XXL'],
    desc:'Geared pivoting dual-axis knee/shin guard, top-tier Leatt protection score; weight per pair.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://us.leatt.com/products/knee-shin-guard-dual-axis-pro', sourceType:'manufacturer' },
  { id:'shg-alpinestars-paragonplus', cat:'shinguard', brand:'Alpinestars', model:'Paragon Plus Knee/Shin Protector', price:84.95,
    disciplines:['trail','enduro'], sizes:['2XS','XS','S','M','L','XL','2XL'], desc:'Slip-on sleeve, rip-stop abrasion panels; per pair. Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.alpinestars.com/products/paragon-plus-knee-shin-protector', sourceType:'manufacturer' },
  { id:'shg-alpinestars-sequence', cat:'shinguard', brand:'Alpinestars', model:'Sequence Knee/Shin Protector', price:94.95,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S/M','L/XL','2XL'],
    desc:'Lightweight hybrid knee/shin construction; per pair. Weight not published. 2026-07-16 recheck: alpinestars.com/products/sequence-knee-protectors 404s on the US site now - real product, confirmed via multiple bike-specific retailers (VitalMTB\'s Knee/Shin Pads guide, Jenson USA, Competitive Cyclist, Amazon), but likely discontinued/superseded on the maker\'s own current site (a ca.alpinestars.com listing shows a shorter-named "Sequence Knee Protector," knee-only, re-tagged under Alpinestars\' MX line at CAD$95.95 - possibly a different, narrower SKU, not confirmed as the same product). Left unchanged as an honest unverified sample.' },
  { id:'shg-alpinestars-vectorpro', cat:'shinguard', brand:'Alpinestars', model:'A-Impact Plasma Pro Knee Shin Protector', price:134.95,
    certs:['en1621-1-l2'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Rip-stop laminate + PE foam, aramidic-fiber patella cover; per pair. Weight not published. Alpinestars renamed this product from "Vector Pro Knee/Shin Protector" to "A-Impact Plasma Pro Knee Shin Protector" (the old URL slug alpinestars.com/products/vector-pro-knee-shin-protector now serves the new product page - confirmed via title tag + H1); id kept per the append-only convention. Price corrected $84.95 -> $134.95 and cert corrected en1621-1-l1 -> en1621-1-l2 (the fetched page states EN 1621-1:2012 Level 2, not Level 1) and sizes corrected from paired S/M+L/XL to individual S/M/L/XL, all against the fetched maker page. VERIFIED 2026-07-17: re-fetched alpinestars.com/products/a-impact-plasma-pro-knee-shin-protector, $134.95, sizes S-XL, EN 1621-1:2012 Level 2 all confirmed. Weight stays a nominal sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.alpinestars.com/products/a-impact-plasma-pro-knee-shin-protector' },
  { id:'shg-evs-tp199', cat:'shinguard', brand:'EVS', model:'TP199 Knee/Shin Guard', price:150,
    disciplines:['dh'], sizes:['S/M','L/XL','XXL'], desc:'Reactive Memory Foam knee cup + polyflex shin guard; per pair. Weight not published. (Maker page cites a CE1621-2 cup rating, not EN1621-1 - not tagged here since it does not map to this catalog\'s shin cert vocab.)',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.evs-sports.com/products/tp199-knee-guard-2', sourceType:'manufacturer' },
  { id:'shg-evs-option', cat:'shinguard', brand:'EVS', model:'Option Knee/Shin Guard', price:30, mfgPn:'OPTK16-BK-A',
    disciplines:['dh'], sizes:['Mini','Youth','Adult'], desc:'Hard molded polypropylene shell, perforated bio-foam liner, knee-to-shin coverage, reinforced TPR hinge, asymmetric left/right fit; sold in pairs. Weight not published on the maker page (kit apparel does not require it). Price corrected $26 -> $30 (fetched evs-sports.com); sizes widened to the maker\'s full Mini/Youth/Adult range.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.evs-sports.com/products/copy-of-option-knee-pad' },
  { id:'shg-troyleedesigns-triad', cat:'shinguard', brand:'Troy Lee Designs', model:'Triad Knee/Shin Guard Hard Shell', price:145,
    disciplines:['enduro','dh'], sizes:['XS/SM','MD/LG','XL/2X'], desc:'Articulated hard-shell guard with D3O liner, full knee-to-shin coverage; per pair. Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://troyleedesigns.com/products/sp22-triad-knee-shin-guard-black', sourceType:'manufacturer' },
  { id:'shg-gform-prorugged2', cat:'shinguard', brand:'G-Form', model:'Pro-Rugged 2 Knee/Shin Guard', price:139.99, weight:281,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['XS','S','M','L','XL','2XL'],
    desc:'Fetched g-form.com: CORRECTED price $89.99 -> $139.99 (adult pair). Sizes are XS-2XL, not S/M-L/XL. CE-1621-1 certified confirmed. 3-layer DuraTx shell + SmartFlex padding; weight per pair not published, kept as the existing sample per the kit weight policy.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://g-form.com/products/pro-rugged-2-knee-shin-guard' },
  { id:'shg-gform-prox', cat:'shinguard', brand:'G-Form', model:'Pro-X Shin Guard', price:45, status:'discontinued',
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    desc:'Prior-generation SmartFlex slip-on shin guard; per pair. Weight not published. CHECKED 2026-07-18: absent from g-form.com\'s current shin/knee collections - superseded by Pro-X3 (and now X4). Flagged discontinued; price/weight left as prior sample.' },
  { id:'shg-fox-launchd3o', cat:'shinguard', brand:'Fox', model:'Launch D3O Knee/Shin Pads', price:119.95,
    certs:['en1621-1-l1'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'CE-certified D3O insert, asymmetrical anatomical shin guard, slip-on fit; per pair. Weight not published. CORRECTED 2026-07-17: price is the fetched $119.95 list for the current "Launch Knee/Shin Pads" (was sample $94.95; foxracing.com now reachable via a bot-unblocker).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/launch-kneeshin-pads/33836.html' },
  { id:'shg-sixsixone-race', cat:'shinguard', brand:'SixSixOne', model:'Race Knee/Shin Guard', price:69.95,
    disciplines:['dh'], sizes:['S','M','L','XL'], desc:'Hard-shell DH race knee/shin guard; per pair. Weight not published. Checked 2026-07-16: sixsixone.com now returns 403 Forbidden site-wide - the brand appears to have gone dark (see glv-sixsixone-comp for detail); no fetch possible.' },
  { id:'shg-flyracing-cebarricade', cat:'shinguard', brand:'Fly Racing', model:'CE Barricade Knee/Shin Guard', price:27.95,
    certs:['en1621-1-l1'], disciplines:['dh'], sizes:['S/M','L/XL'],
    desc:'Motocross-heritage CE-certified hard-shell knee/shin guard, DH/park crossover; per pair. Weight not published. Corrected price ($79.95 sample -> $27.95 fetched, flyracing.com/ce-barricade-knee-shin-guards/, cert EN1621-1 Level 1 confirmed).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.flyracing.com/ce-barricade-knee-shin-guards/' },
  { id:'shg-flyracing-5pivot', cat:'shinguard', brand:'Fly Racing', model:'5 Pivot Knee/Shin Guard', price:99.95,
    disciplines:['dh'], sizes:['S/M','L/XL','XXL'],
    desc:'5-pivot ergonomic hinge shin plate tracks front-to-back and side-to-side leg motion; per pair. Weight not published. Corrected price ($159.95 sample -> $99.95), confirmed consistently across multiple retailers (MotoSport, RevZilla, Cycle Gear) quoting the FLY Racing product copy verbatim; the flyracing.com product page itself (flyracing.com/5-pivot-knee-guards/) 404s on direct fetch. Retailers also repeat a CE EN1621-1 Level 1 claim, but per THE BAR that cert is intentionally NOT added here since it was not confirmed on a fetched maker page (retailer-mirrored text is not sufficient for a safety claim).' },
  /* RETIRED seat-19 (2026-07-22): shg-oneal-parkfr - the knee/shin combo exists only on
     retailer pages (RevZilla/Cycle Gear/BTO Sports); O'Neal's own site sells the Park FR
     as KNEE-ONLY. Douglas ruled 2026-07-22: catalog the maker's knee-only SKU ("I imagine
     the knee/shin combo is what a retailer is doing themselves"). Retargeted via
     KIT_ALIASES -> knp-oneal-parkfr-carbon (the real maker product, cat kneepad). */
  { id:'shg-answer-apex', cat:'shinguard', brand:'Answer', model:'Apex Knee/Shin Guard', price:44.99,
    disciplines:['dh'], sizes:['One Size'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20',
    desc:'Motocross-heritage injection-molded plastic knee/shin guard, DH crossover; per pair. Re-fetched answerracing.com/apex-knee-guards/ 2026-07-20: price $44.99 confirmed again (product currently shown out of stock, MSRP unaffected); page states no weight and no cert, so both stay omitted rather than guessed.',
    source:'https://answerracing.com/apex-knee-guards/' },
  { id:'shg-endura-mt500', cat:'shinguard', brand:'Endura', model:'MT500 D3O Shin Guards', price:130,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.endurasport.com/en-us/products/mt500-d3o%C2%AE-shin-guards-black-re1286bk',
    desc:'Verified 2026-07-16 vs fetched endurasport.com product page: "MT500 D3O Shin Guards", "$130.00 USD" (was sampled at $119.99, corrected), D3O Zero foam over stretch ripstop/perforated neoprene, silicone top grippers tuck under knee pads, sizes S/M-L/XL confirmed; per pair. Weight not published on the page (the Shopify JSON weight is a flat shipping-placeholder figure), stays unset.' },
  { id:'shg-evs-epic', cat:'shinguard', brand:'EVS', model:'Epic Knee/Shin Guard', price:130,
    disciplines:['dh'], sizes:['S/M','L/XL'], desc:'Floating knee cup, asymmetrical Form-Fit chassis, dual-pivot hinge, full shin/patella coverage; per pair. Weight not published. (Maker page states "meets CE EN 1621-1" without specifying a Level, so no cert token is tagged.)',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.evs-sports.com/products/epic-knee-guard', sourceType:'manufacturer' },
  { id:'shg-demonunited-tactic', cat:'shinguard', brand:'Demon United', model:'Tactic Knee-Shin Guard', price:69.99,
    disciplines:['trail','enduro'], sizes:['S/M','L/XL'], desc:'Articulating hard shell with vented EVA air-padding; per pair. Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://demon-united.com/products/demon-tactic-knee-shin-guards', sourceType:'manufacturer' },
  { id:'shg-demonunited-hyper', cat:'shinguard', brand:'Demon United', model:'Hyper Knee/Shin Pads X V4 D3O', price:119.99,
    disciplines:['enduro','dh'], sizes:['S','M','L','XL'], desc:'D3O impact foam + Kevlar front shield, perforated neoprene with mesh inner panel; per pair. Weight not published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://demon-united.com/products/hyper-knee-shin-x-d3o-v3', sourceType:'manufacturer' },
  { id:'shg-raceface-ambushleg', cat:'shinguard', brand:'Race Face', model:'Ambush Leg', price:130,
    disciplines:['enduro','dh'], sizes:['XS','S','M','L','XL','XXL'], verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16',
    source:'https://www.raceface.com/products/ambush-leg',
    desc:'Verified vs fetched raceface.com Shopify product JSON + product page: compare_at_price (regular/list price) $130.00 USD, sizes XS-XXL confirmed (corrects 114->130 and adds XS). D3O(R) T5 Evo X knee + extended EVA thigh/shin/side padding, full leg coverage; per pair. No `certs` token: page states no CE/EN 1621-1 Level. Weight not published on the fetched page/JSON - a WebSearch snippet elsewhere claimed "520 grams" but that figure could not be confirmed on the actual raceface.com page, so it is not entered (search-snippet weights are not the fetched-source bar).' },
  { id:'shg-7idp-transition', cat:'shinguard', brand:'7iDP', model:'Transition Knee/Shin Guard', price:74.99, weight:272,
    certs:['en1621-1-l2'], disciplines:['trail','enduro'], sizes:['S','M','L','XL'], desc:'Compression-fit knee/shin pad, ~5in of extra shin coverage, 4-way stretch mesh; weight is per side (size L).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://7idp.com/products/transition-knee', sourceType:'manufacturer' },
  { id:'shg-7idp-flex', cat:'shinguard', brand:'7iDP', model:'Flex Knee/Shin Guard', price:114,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Cap-and-foam knee/shin pad, on/off without removing shoes; per pair. Weight not published. ATTEMPTED 2026-07-17: no distinct "Flex Knee/Shin" product page found on 7idp.com (the site now sells "Flex Knee" as knee-only at $84.99); /collections/knee-pads lists unlabeled items at $74.99/$129.99 that could be a knee/shin combo but titles did not resolve via fetch, so left unverified rather than guessing.' },
  { id:'shg-kaliprotectives-strike', cat:'shinguard', brand:'Kali Protectives', model:'Strike Knee/Shin Guard', price:50,
    disciplines:['trail','enduro'], sizes:['S','M','L','XL'],
    desc:'Xelion cap + EVA side padding, pull-on non-slip sleeve; per pair. Weight not published. Fetched kaliprotectives.com product page: corrected price $88 -> $50 (confirmed both via the rendered page and the Shopify products.js endpoint, all 4 sizes at $50.00); no cert standard or weight is published on the page.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.kaliprotectives.com/products/strike-knee-shin-guard-1' },
  { id:'shg-poc-jointvpd20-shins', cat:'shinguard', brand:'POC', model:'Joint VPD 2.0 Shins', price:80, weight:155,
    disciplines:['trail','enduro','dh'], sizes:['XS','S','M','L'],
    desc:'Sold separately to pair with a POC knee protector; per pair. The closest current poc.com match ("VPD Shins MTB Padding", $80, 150g XS-S / 160g M-L) pairs with POC\'s VPD MAX Knee, not "Joint VPD 2.0" - a generation/naming mismatch this fetch could not resolve, so this stays unverified even though price/weight/sizes were updated to the closest real product found (was $110, no weight, S/M/L only).' },
  { id:'shg-tsg-samir', cat:'shinguard', brand:'TSG', model:'Shinguard Samir', price:89.95, weight:500,
    disciplines:['dh'], sizes:['S/M','L/XL'], desc:'Short-style removable PE hardshell + foam, designed to layer under a separate knee guard; weight per pair per mfr page. Cert protocol (PPE TS0013, based on EN1621-1:2012) does not state a Level, so no cert token is tagged.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-14', source:'https://www.ridetsg.com/shop/protection-all/shinguard-samir/76016-35-147/', sourceType:'manufacturer' },
  { id:'shg-tsg-bmx', cat:'shinguard', brand:'TSG', model:'Shinguard BMX', price:75.55, weight:461,
    disciplines:['dh'], sizes:['S/M','L/XL'], desc:'Neoprene sleeve + removable high-density PE shin splint, EVA foam; weight per pair, maker-stated ("461 g") on the fetched ridetsg.com product page. Price is EUR69.95 (VAT incl.) converted to a $75.55 USD sample at ~1.08 USD/EUR (no confirmed US-dollar storefront) -- basis disclosed per THE PRICE RULE. Cert protocol (PPE TS0013, based on EN1621-1:2012) does not state a Level, so no cert token is tagged.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://ridetsg.com/shop/shinguard-bmx/76012-35-102' },
  { id:'shg-tsg-tempera2', cat:'shinguard', brand:'TSG', model:'Temper A 2.0 Knee-Shinguard', price:145.75, weight:524,
    disciplines:['dh'], sizes:['S','M','L','XL'], desc:'Arti-Lage impact knee pad + removable hard-shell shin guard, Kevlar-stretch panel; per pair. Weight maker-stated ("524 g") on the fetched ridetsg.com product page. Price is EUR134.95 (VAT incl.) converted to a $145.75 USD sample at ~1.08 USD/EUR (no confirmed US-dollar storefront) -- basis disclosed per THE PRICE RULE. Cert protocol (PPE TS0002, based on EN1621-1:2012) does not state a Level, so no cert token is tagged.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://ridetsg.com/shop/kneeshinguard-temper-a-20/7102801-40-030' },
  { id:'shg-ixs-cleaver', cat:'shinguard', brand:'iXS', model:'Cleaver Knee-Shin Guards', price:124.90,
    disciplines:['enduro','dh'],
    desc:'ArmadilloDuo hard-shell knee/shin combo, AeroMesh moisture-wicking sleeve, race-oriented; per pair. ixs.com (fetch attempted twice, both 429 rate-limited) could not be confirmed directly -- price is Vital MTB\'s listed $124.90 (a Walmart retailer listing showed $115.95 on sale, same product). A third-party retailer figure cites 550 g per pair but that is unconfirmed against any maker page, so weight is left unset rather than carried forward on a shaky basis. Kit gap-fill: brand had zero prior shinguard rows.',
    sourceType:'retailer' },
  { id:'shg-scott-grenade-evo', cat:'shinguard', brand:'Scott', model:'Grenade Evo Shin Guards', price:63.99,
    disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'D3O padding, stretch/mesh sleeve, velcro-attaches to the Grenade Evo knee guards (also compatible with most competitors\' knee pads); one-size. Fetched scott-sports.com (model 274520): confirms one-size, "surpasses CE standards" via D3O but states no specific EN standard/level, so no cert token is tagged; the maker page lists no price. $63.99 is Bikeinn\'s listed retail price (a Ciclimattio EU listing showed EUR69.90). Weight not published anywhere found. Kit gap-fill: brand had zero prior shinguard rows.',
    source:'https://www.scott-sports.com/global/en/product/scott-grenade-evo-shin-guards' },

  /* -- Eyewear (type required: glasses / goggles) -- */
  { id:'ewr-oakley-sutro', cat:'eyewear', brand:'Oakley', model:'Sutro', price:203, weight:32,
    type:'glasses', sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.oakley.com/en-us/product/W0OO9406',
    desc:'Fetched oakley.com (browser pane, WebFetch 403): confirmed price $203 (Polished Black/Prizm Sapphire). Oakley does not publish weight; kept as sample.' },
  { id:'ewr-poc-devour', cat:'eyewear', brand:'POC', model:'Devour', price:300, weight:39,
    type:'glasses', sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/devour-uranium-black',
    desc:'Fetched poc.com: corrected price $220 -> $300 and weight 36g -> 39g (both maker-stated).' },
  { id:'ewr-smith-squad-mtb', cat:'eyewear', brand:'Smith', model:'Squad MTB', price:90, weight:107,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Price/type confirmed on the Smith product page (weight not stated there); weight is Bikerumor\'s measured figure.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.smithoptics.com/en-us/products/squad-mtb',
    sourceType:'measured', weightSource:'https://bikerumor.com/review-smith-squad-mtb-goggles-give-wide-field-of-view-with-minimal-fogging/' },
  { id:'ewr-oakley-radar-ev-path', cat:'eyewear', brand:'Oakley', model:'Radar EV Path', price:244, weight:28,
    type:'glasses', sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.oakley.com/en-us/product/W0OO9208',
    desc:'Fetched oakley.com (browser pane, WebFetch 403): confirmed price $244 (Polished Black/Prizm Black). Oakley does not publish weight; kept as sample.' },
  { id:'ewr-100-s3', cat:'eyewear', brand:'100%', model:'S3', price:149.95, weight:26,
    type:'glasses', sizes:['OSFA'],
    desc:'RE-CONFIRMED 2026-07-19 via browser-rendered 100percent.com/collections/s3 (WebFetch'
      + ' JS-walled): base-tier colorways run $149.95-$189.95, $149.95 confirmed as an in-lineup'
      + ' price (Satin Storm Metallic, Soft Tact Black). Weight not published (the product-JSON'
      + ' grams field is a shipping weight, not a garment weight - see the 100% glove rows for'
      + ' the same caveat), stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://100percent.com/collections/s3' },
  { id:'ewr-100-speedcraft', cat:'eyewear', brand:'100%', model:'Speedcraft', price:159.95, weight:34,
    type:'glasses', sizes:['OSFA'],
    desc:'RE-CONFIRMED 2026-07-19 via browser-rendered 100percent.com/collections/speedcraft'
      + ' (WebFetch JS-walled): $159.95 confirmed as the Matte Black/HiPER Blue Multilayer SKU'
      + ' price (colorways run $139.95-$189.95). Weight not published (shipping-weight caveat,'
      + ' see the S3 row), stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://100percent.com/collections/speedcraft' },
  { id:'ewr-100-speedcraft-xs', cat:'eyewear', brand:'100%', model:'Speedcraft XS', price:149.95,
    type:'glasses', fitCut:'womens', sizes:['OSFA'],
    desc:'kit-breadth-3 (2026-07-22): the eyewear cell had ZERO fitCut:\'womens\' rows. This is a genuinely'
      + ' distinct small-scale frame, not a recolored Speedcraft - 100%\'s own copy: "the small-scale frame'
      + ' Speedcraft XS is designed for smaller faces, uncompromising women and young athletes." List price'
      + ' varies $129.95-$149.95 by lens tech across colorways; $149.95 (the HiPER Silver Mirror SKU) used'
      + ' as the representative list price, matching the base Speedcraft SL\'s $149.95. No weight published.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-22', source:'https://www.100percent.com/products/speedcraft-xs-matte-white-hiper-silver-mirror-lens' },
  { id:'ewr-100-glendale', cat:'eyewear', brand:'100%', model:'Glendale', price:139.95, weight:30,
    type:'glasses', sizes:['OSFA'],
    desc:'Weight approx, unconfirmed (the product-JSON grams field is a shipping weight, not a frame weight - see the S3 row; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $139.95.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/glendale-soft-tact-black-smoke-lens-1' },
  { id:'ewr-smith-wildcat', cat:'eyewear', brand:'Smith', model:'Wildcat', price:217, weight:32,
    type:'glasses', sizes:['OSFA'],
    desc:'Price/type confirmed on the Smith product page (weight not stated there); weight is OutdoorGearLab\'s measured figure.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.smithoptics.com/en-us/products/wildcat',
    sourceType:'measured', weightSource:'https://www.outdoorgearlab.com/reviews/biking/cycling-sunglasses/smith-wildcat' },
  { id:'ewr-poc-aspire', cat:'eyewear', brand:'POC', model:'Aspire', price:190, weight:42,
    type:'glasses', sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/aspire-uranium-black-clarity-road-sunny-silver-cat-3',
    desc:'Fetched poc.com: corrected price $220 -> $190 and weight 30g -> 42g (both maker-stated).' },
  { id:'ewr-fox-main-glasses', cat:'eyewear', brand:'Fox', model:'Main Sunglasses', price:150, weight:28,
    type:'glasses', status:'discontinued', sizes:['OSFA'],
    desc:'UNVERIFIED, re-confirmed kit-5 (2026-07-20): foxracing.com/collections/sunglasses 404s and a site search for "main sunglasses" returns only the (unrelated, thriving) MTB Main GOGGLES line -- no "Main Sunglasses" SKU exists anywhere on the current site. Two independent sessions now find zero trace of this SKU; Fox has exited direct-to-consumer sunglasses entirely (whole-category-gone case). Tagged discontinued; kept as prior sample, bar cannot be met.' },
  { id:'ewr-melonoptics-alleycat', cat:'eyewear', brand:'Melon Optics', model:'Alleycat', price:145, weight:27,
    type:'glasses', sizes:['S','M','L'],
    desc:'Weight not published anywhere on the product page (unconfirmed sample). Fetched melonoptics.com/us/shop/alleycat/ fresh (2026-07-20): base build-your-own price is $145.00 (corrects the prior $114 sample -- lens/frame combos range up to ~$199, $145 is the base config); confirms interchangeable-lens TR-90 frame, S/M/L head-size options.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://melonoptics.com/us/shop/alleycat/' },
  { id:'ewr-scott-shield', cat:'eyewear', brand:'Scott', model:'Shield', price:140, weight:28,
    type:'glasses', sizes:['OSFA'],
    desc:'UNVERIFIED, re-confirmed kit-5 (2026-07-20): scott-sports.com US still sells 3 distinct Shield-tier products with their own SKU slugs (Sport Shield, Pro Shield, Shield Compact, plus light-sensitive/Metaverse variants) but no plain "Shield" product page/SKU -- direct scrape attempts hit an Incapsula bot-wall on the individual product pages this session (Bright Data unlocker blocked too). Row\'s exact tier still can\'t be confirmed without guessing which tier it maps to. Left as an unverified sample, not force-matched.' },
  { id:'ewr-dragonalliance-drac', cat:'eyewear', brand:'Dragon Alliance', model:'Drac', price:119, weight:30,
    type:'glasses', status:'discontinued', sizes:['OSFA'],
    desc:'Corrected price ($100 sample -> $119, from an earlier fetch of dragonalliance.com/sunglasses/drac-dragon.html). Kit-5 (2026-07-20): re-checked dragonalliance.com fresh -- the Drac is gone; a site search for "drac" returns zero results and it does not appear among current sunglasses (Meridien/Dale/Blaise/Count/Thorn/Gatsby/Fin are the current lineup). Retired with no clean 1:1 successor -- tagged discontinued per the re-scope-vs-discontinued rule, stays unverified sample.' },
  { id:'ewr-leatt-velocity-40', cat:'eyewear', brand:'Leatt', model:'Velocity 4.0', price:60, weight:33, status:'discontinued',
    type:'goggles', sizes:['OSFA'],
    desc:'CORRECTED 2026-07-16: this is Leatt\'s Velocity MTB goggle line (type glasses<-goggles) - us.leatt.com sells no product called "Velocity" sunglasses (their glasses lines are Sunglasses Core/TheViz/MadViz/RideViz/SpeedViz). Fetched page confirms the Velocity 4.0 MTB goggle is real but tags it Obsolete/clearance with no published weight and a price that varies by colorway ($24.99 sale seen), so price/weight stay prior sample.'
      + ' RE-CHECKED kit-13 (2026-07-21): re-fetched the same URL - the Chilli colorway SKU'
      + ' (8021002501) now shows "This product is unavailable" (sold through), listed'
      + ' $24.99/$49.99 (sale/was). A "Complete your setup" module on the same page cross-sells a'
      + ' currently-stocked "Goggle Velocity 4.0 MTB" at $76.99 - likely a different colorway/SKU'
      + ' of the same model, not confirmed as the same product. Still no clean single current MSRP'
      + ' to pin. Left unverified, no fields changed.' },
  { id:'ewr-bliz-breeze', cat:'eyewear', brand:'Bliz', model:'Breeze', price:118, weight:29,
    type:'glasses', sizes:['OSFA'],
    desc:'Kit-6 (2026-07-20): re-fetched bliz.com/en-be/sunglasses/ZB7002-7318480115194 (browser pane) and inspected the raw price element (class "pdp-js-price") directly: EUR109.00, no strikethrough/discount markup despite an active perpetual "FLASH SALE" countdown banner (Bliz runs one continuously per Settings.FlashSales in the page script) -- this IS the standing price, not a temporary markdown. bliz.com/en-us shows no price at all for any product (storefront bug, "Price: Free" placeholder). Price is a EUR->USD sample ($118, basis disclosed) per THE PRICE RULE; no weight published, kept as sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://www.bliz.com/en-be/sunglasses/ZB7002-7318480115194' },
  { id:'ewr-tifosi-sledge', cat:'eyewear', brand:'Tifosi', model:'Sledge', price:79.95, weight:37,
    type:'glasses', sizes:['OSFA'],
    desc:'CORRECTED 2026-07-16, weight confirmed kit-5 (2026-07-20): fetched tifosioptics.com/products/sledge confirms $79.95 regular price (currently on sale at $49.95 - MSRP used, not the sale price), interchangeable Grilamid TR-90 frame with vented photochromic lens. The page\'s visible DETAILS section states "Weight: 37G" in plain text (the prior session only saw an implausible 181g Shopify shipping-weight field and stayed sample) - 37g is the real per-unit maker-stated weight, correcting the prior 32g sample figure.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://tifosioptics.com/products/sledge' },
  { id:'ewr-100-armega', cat:'eyewear', brand:'100%', model:'Armega', price:109.95, weight:140,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Weight approx, unconfirmed (the product-JSON grams field is a shipping weight - see the S3 eyewear row; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed base clear-lens $109.95; HiPER-lens and LE colorways run $119.95-$259.95.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/armega-goggle-black' },
  { id:'ewr-100-strata-mini', cat:'eyewear', brand:'100%', model:'Strata Mini', price:19.95, weight:100,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Weight approx, unconfirmed (the product-JSON grams field is a shipping weight - see the S3 eyewear row; kit weight policy: never blocks verification). Re-fetched 100percent.com product JSON (2026-07-17): confirmed $19.95 (well below the original sample $55).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.100percent.com/products/strata-mini-goggle-black' },
  { id:'ewr-leatt-velocity-45', cat:'eyewear', brand:'Leatt', model:'Velocity 4.5', price:64.49, weight:120,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Price confirmed 2026-07-14 vs us.leatt.com product page ($64.49 exactly); re-confirmed 2026-07-17. Weight not published there, stays sample (kit weight policy: never blocks verification).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/goggle-velocity-4-5' },
  { id:'ewr-fox-main-goggle', cat:'eyewear', brand:'Fox', model:'Main Goggle', price:39.95, weight:110,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'CORRECTED 2026-07-17: price is the fetched $39.95 (was sample $40, essentially unchanged). No weight published on the fetched page, stays prior sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.foxracing.com/product/main-goggles/32985.html' },
  { id:'ewr-scott-fury-goggle', cat:'eyewear', brand:'Scott', model:'Fury', price:79.95, weight:130,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Kit-12 (2026-07-21): re-fetched scott-sports.com/us/en/product/scott-fury-goggle (model 272828) - price has drifted since the 2026-07-17 pass ($59.95 -> $79.95 current MSRP); weight not published, stays a sample. Page cites "PPE cat. II according to EN 1938:2010" (a moto-goggle standard not in our protectionCert vocab), so no cert token is added.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-21', source:'https://www.scott-sports.com/us/en/product/scott-fury-goggle' },
  { id:'ewr-poc-ora', cat:'eyewear', brand:'POC', model:'Ora', price:90, weight:150,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://poc.com/en-us/product/ora-uranium-black-clarity-universal-cloudy-grey',
    desc:'Fetched poc.com: price $90 confirmed exactly; weight 125g -> 150g (maker-stated).' },
  { id:'ewr-julbo-fury', cat:'eyewear', brand:'Julbo', model:'Fury', price:239.95, weight:25,
    type:'glasses', sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://julbo.us/products/fury-sunglasses',
    desc:'Fetched julbo.us: corrected price $170 -> $239.95 and weight 27g -> 25g (maker-stated).' },
  { id:'ewr-julbo-aerospeed', cat:'eyewear', brand:'Julbo', model:'Aerospeed', price:190, weight:30,
    type:'glasses', status:'discontinued', sizes:['OSFA'],
    desc:'Discontinued: no longer listed on julbo.us\'s current sunglasses lineup (55 active products checked, Aerospeed absent) - only a replacement-lens/parts page remains. Re-confirmed kit-5 (2026-07-20): julbo.us search for "aerospeed" still returns only the Aerospeed Lenses & Parts page, no frame product. No current maker page to fetch, so stays unverified.' },
  { id:'ewr-rudyproject-propulse', cat:'eyewear', brand:'Rudy Project', model:'Propulse', price:209.99, weight:25,
    type:'glasses', sizes:['OSFA'],
    desc:'Weight per Rudy Project’s own product page (25g); $209.99 USD confirmed on Rudy Project North America.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-16', source:'https://www.rudyprojectna.com/products/propulse' },
  { id:'ewr-rudyproject-cutline', cat:'eyewear', brand:'Rudy Project', model:'Cutline', price:267.74, weight:52,
    type:'glasses', sizes:['OSFA'],
    desc:'Weight (52g) per an earlier fetch of Rudy Project\'s Cutline Mirrored spec page (full 3-bumper shield config), not re-confirmed this session (not published on the base Cutline product page). Fetched rudyprojectna.com/products/cutline fresh (2026-07-20, the North America store -- rudyproject.com itself is EUR-only): base model price is $267.74 USD, correcting the stale $179 sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.rudyprojectna.com/products/cutline' },
  { id:'ewr-adidas-zonyk-aero-pro', cat:'eyewear', brand:'Adidas', model:'SP Zonyk Aero Pro', price:200, weight:27, status:'discontinued',
    type:'glasses', sizes:['OSFA'],
    desc:'Checked 2026-07-16: adidas.com returns 403 Forbidden on product pages (Akamai bot-protection, confirmed via both WebFetch and a direct curl request with a real browser User-Agent) - same wall documented on the Five Ten shoe rows (Five Ten is now sold exclusively as an adidas.com collaboration line). Re-confirmed kit-5 (2026-07-20, per the standing fetch-ethics ruling: adidas.com/adidas.co.uk is a documented CAPTCHA wall, not circumvented): adidas.co.uk/eyewear also bot-walled. Independently, every findable review of the Zonyk Aero Pro dates to 2017-2018 and no current official product listing exists anywhere -- adidas\'s licensed "Sport eyewear" performance-sunglasses line appears to have been discontinued entirely (whole-category-gone pattern, same as its former Five Ten-adjacent MTB shoe exit). Tagged discontinued; stays unverified sample.' },
  { id:'ewr-bolle-shifter', cat:'eyewear', brand:'Bolle', model:'Shifter', price:300, weight:30,
    type:'glasses', sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.bolle.com/us/sunglasses/sport-sunglasses/shifter-2298.html',
    desc:'WALL BEATEN 2026-07-17 via bdata (plain WebFetch/curl/Wayback all confirmed DataDome-blocked in the 2026-07-16 session; bdata\'s unlocker renders the real page). Fetched page: "SHIFTER $300" (corrected from the $149 sample), Reference BS010007, Fit Large, Weight "30g" (already matched the sample), TR90 Nylon frame, Phantom Brown Red Photochromic cat 2-3 lens - a road/MTB-oriented performance cycling sunglass per the site\'s Bike Sunglasses category.' },
  { id:'ewr-bolle-chronoshield', cat:'eyewear', brand:'Bolle', model:'Chronoshield', price:240, weight:34,
    type:'glasses', sizes:['OSFA'],
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://www.bolle.com/us/sunglasses/sport-sunglasses/chronoshield-29463.html',
    desc:'WALL BEATEN 2026-07-17 via bdata (same DataDome block confirmed 2026-07-16 via plain WebFetch/Wayback). Fetched page: "$240" (corrected from the $199 sample; no active sale price shown), Reference 12634, Fit Large, Nylon frame, Phantom Brown Red cat 2-3 lens - a Cycling Sunglasses product per the page title. No weight published on the page (the spec table\'s Weight row is empty for this SKU); weight kept as the prior sample estimate.' },
  { id:'ewr-nativeeyewear-roan', cat:'eyewear', brand:'Native Eyewear', model:'Roan', price:109, weight:28, status:'discontinued',
    type:'glasses', sizes:['OSFA'],
    desc:'Price corrected 2026-07-16 toward $109, the figure independently cited by two non-maker sources (a backcountryskiingcanada.com review and an OpticsPlanet listing). Kit-5 (2026-07-20): unblocked nativeyewear.com via the Bright Data unlocker (the prior 403 wall is bypassable) and scanned the full current sunglasses lineup (nativeyewear.com/en-us/sunglasses) -- 19 models listed (Craggy, Tavern XL, Kodiak, Ridge-Runner Crest, Sightcaster II, Badlands XL, Mammoth, Ashdown, Breck, Wells XL, Targhee Square, Gorge, Griz, Freerider, Badlands, Tavern, Targhee, Mesa, Tiaga) -- "Roan" is not among them and no plain-Google site search turns up a live Roan product page. Retired with no clean 1:1 successor; tagged discontinued, stays unverified sample.', lastChecked:'2026-07-16' },
  { id:'ewr-spyoptic-helm2', cat:'eyewear', brand:'Spy Optic', model:'Helm', price:150, weight:28,
    type:'glasses', sizes:['OSFA'],
    desc:'Re-scoped 2026-07-20: spyoptic.com\'s current lineup sells this model simply as "HELM" (no "2" suffix -- the numbered naming has been dropped); fetched spyoptic.com/us/sunglasses/mens-sunglasses/helm-41877.html confirms $150 base price (corrects the stale $120 sample). No weight published on the page, stays an unconfirmed sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.spyoptic.com/us/sunglasses/mens-sunglasses/helm-41877.html' },
  { id:'ewr-opticnerve-fixieblast', cat:'eyewear', brand:'Optic Nerve', model:'Fixie Blast', price:99, weight:30,
    type:'glasses', sizes:['OSFA'],
    desc:'Re-fetched opticnerve.com/products/fixieblast fresh (2026-07-20): re-confirms $99 (corrects the stale $50 sample). No weight published on the page, stays an unconfirmed sample -- fine under the apparel bar (eyewear needs no weight to verify).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.opticnerve.com/products/fixieblast' },
  { id:'ewr-ryderseyewear-roam', cat:'eyewear', brand:'Ryders Eyewear', model:'Roam', price:100, weight:29, status:'discontinued',
    type:'glasses', sizes:['OSFA'],
    desc:'Ryders Eyewear appears to have ceased producing/selling this brand as of this check - ryderseyewear.com now shows a discontinuation notice and redirects toward its sister brand Foster Grant, so there is no live maker page to fetch. Re-confirmed kit-5 (2026-07-20): the domain still fails to load/redirect cleanly (browser pane navigation denied outright this session, worse than a mere redirect). Whole-brand-gone case; tagged discontinued. Stays unverified; not corrected off retailer/review figures per the fetched-source-only rule.' },
  { id:'ewr-sweetprotection-clockwork', cat:'eyewear', brand:'Sweet Protection', model:'Clockwork', price:169, weight:26, status:'discontinued',
    type:'goggles', sizes:['OSFA'],
    desc:'CORRECTED type from glasses -> goggles (2026-07-16): sweetprotection.com markets Clockwork as an "All Mountain Goggles" / ski-snowboard goggle, not sunglasses. Kit-5 (2026-07-20): fetched sweetprotection.com/us/en/goggles-and-sunglasses/mtb-goggles/ (17 products: Deckard/Durden/Firewall families only) AND the sunglasses page (41 products) fresh -- Clockwork appears in neither. The swapped-weight/price suspicion is now moot (Ronin\'s own fresh fetch confirms 31g/$160, nothing like Clockwork\'s 26g/$169, so no evidence of a data-entry swap after all). Clockwork is simply gone from the current lineup with no clean successor; tagged discontinued, stays unverified sample.' },
  { id:'ewr-alpina-ram-hr-qlite', cat:'eyewear', brand:'Alpina', model:'Ram 2.0 Q-Lite', price:86, weight:27,
    type:'glasses', sizes:['OSFA'],
    desc:'RE-SCOPED kit-6 (2026-07-20): alpina-sports.com/en/eyewear/sports-glasses/ (browser pane) lists no "Ram HR Q-Lite" anymore -- the current product is "RAM 2.0 Q-LITE", whose own page states outright "The evolution of the popular Ram: the Ram 2.0" (a direct 1:1 successor, same re-scope rule as the Shimano running-change pattern). Re-scoped model/id-target under the same id per the append-only id convention. EUR79.95 RRP confirmed on the maker page; price is a EUR->USD sample ($86, basis disclosed) per THE PRICE RULE. No weight published, kept as sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-20', source:'https://www.alpina-sports.com/en/eyewear/sports-glasses/ram-2.0-q-lite/' },
  { id:'ewr-uvex-sportstyle-227', cat:'eyewear', brand:'Uvex', model:'Sportstyle 227', price:108, weight:26,
    type:'glasses', sizes:['OSFA'],
    desc:'Kit-6 (2026-07-20): fetched uvex-sports.com EU eyewear page (browser pane) -- confirms the model is CURRENT (article S5320662216), EUR99.95 RRP (no US price -- uvexsports.us\'s 20-product US lineup has moved on to sportstyle 235/236, not 227). Price is a same-tier EUR->USD sample ($108, basis disclosed) per THE PRICE RULE; weight not published, kept as sample.',
    verified:true, priceBasis:'regional-conversion', source:'https://www.uvex-sports.com/en/eyewear/sports-eyewear/uvex-sportstyle-227-black-mat-mirsilver-4043197345482', lastChecked:'2026-07-20' },
  { id:'ewr-salice-016rw', cat:'eyewear', brand:'Salice', model:'016 RW', price:137, weight:26,
    type:'glasses', sizes:['OSFA'],
    desc:'Kit-6 (2026-07-20): confirmed the 016 model is CURRENT on salice.co.uk (Salice\'s official UK/US-priced site, browser pane) -- standard "SALICE 016 SUNGLASSES MIRROR LENS" runs $137 across all colorways (polarised $192, light-adaptive $172 tiers also exist). The site categorizes by lens-color name rather than the "RW" designation retailers use; could not confirm "RW" maps to a specific one of those colorways, but the base 016 mirror-lens price ($137) is a solid floor for this row. Price corrected from a stale $70 sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.salice.co.uk/collections/016' },
  { id:'ewr-vonzipper-approach', cat:'eyewear', brand:'Von Zipper', model:'Approach', price:100, weight:29,
    type:'glasses', sizes:['OSFA'],
    desc:'CORRECTED 2026-07-16: fetched vonzipper.com/products/approach confirms $100.00 (was $120), Grilamid nylon frame, polycarbonate or Wildlife Polarized lens, Base 6 spherical design, stainless-steel hinges. No weight published on the page, stays prior sample. Kit-6 (2026-07-20): re-confirmed still current, formalizing verified:true (weight not required for kit apparel).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://vonzipper.com/products/approach' },
  { id:'ewr-gatorz-wraptor', cat:'eyewear', brand:'Gatorz', model:'Wraptor', price:129, weight:32,
    type:'glasses', sizes:['OSFA'], status:'discontinued',
    desc:'Kit-6 (2026-07-20): confirmed gone from gatorz.com (browser pane) -- both /collections/wraptor and /collections/wraptor-frame return "COLLECTION IS EMPTY", and the site\'s current full lineup (Revenant, Wraith, Sentix, Blastshield/B2, Warhawk, Rig, Havok, Marauder, Magnum, Delta/Delta-M4, Specter, Skyhook) has no Wraptor or obvious 1:1-named successor. Tagged discontinued rather than guessing a re-scope target. Left unverified/sample.' },
  { id:'ewr-torege-tr90', cat:'eyewear', brand:'Torege', model:'TR90 Polarized Sport', price:25, weight:24,
    type:'glasses', sizes:['OSFA'],
    desc:'Kit-6 (2026-07-20): fetched torege.com/collections/polarized-sunglasses (browser pane) -- "TR90" is Torege\'s common frame MATERIAL used across its whole current lineup (Theseus, Pure, Quietness, Unique, Fantastic, Apollo, Highway, Dreamy Lake, all $35-47), not a standalone named model called "TR90 Polarized Sport". No product by that exact name exists to verify against. Flagging for a catalog-scope decision (same pattern as the Cairn Ride flag) rather than force-matching an arbitrary named model. Left unverified, price/weight unchanged.' },
  { id:'ewr-ixs-trigger', cat:'eyewear', brand:'iXS', model:'Trigger', price:102, weight:130,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Mirrored anti-fog/anti-scratch single lens, 178x78-degree field of view, universal'
      + ' helmet-compatible outriggers, roll-off/tear-off compatible. Certified EN1938:2010 (not'
      + ' in the eyewear cert vocab - ansi-z87/en166 - so no `certs` token). EUR94.95 base-tier'
      + ' RRP converted to $102 USD sample - no US MSRP page found; lens-tier variants range'
      + ' EUR69.90-179.95. Weight not published, stays sample.',
    verified:true, priceBasis:'regional-conversion', lastChecked:'2026-07-19', source:'https://www.ixs.com/en/products/ixs-goggle-trigger-camel-gold-verspiegelt' },
  { id:'ewr-eksbrand-lucid', cat:'eyewear', brand:'EKS Brand', model:'Lucid', price:109, weight:120,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Price $109 re-confirmed kit-6 (2026-07-20) via browser pane fetch of eksbrand.com/pages/lucid-goggle (whole Lucid collection lists at $109). No weight published; kept as sample per kit-apparel no-weight-required policy.',
    verified:true, priceBasis:'msrp-confirmed', source:'https://eksbrand.com/pages/lucid-goggle', lastChecked:'2026-07-20' },
  { id:'ewr-oneal-b10', cat:'eyewear', brand:"O'Neal", model:'B-10', price:57, weight:125,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Kit-6 (2026-07-20): oneal.com (US) sells no goggles/eyewear at all currently (jerseys/pants/helmets/gearsets only); fetched oneal.eu (browser pane) instead -- same manufacturer\'s EU site -- confirming the B-10 SOLID SKU is current at EUR52.99. Price is a same-tier EUR->USD sample ($57, basis disclosed) per THE PRICE RULE; weight not published, kept as sample.',
    verified:true, priceBasis:'regional-conversion', source:'https://www.oneal.eu/en/products/oneal-b-10-glasses-solid', lastChecked:'2026-07-20' },
  { id:'ewr-oneal-bflex', cat:'eyewear', brand:"O'Neal", model:'B-Flex', price:55, weight:135,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'], status:'discontinued',
    desc:'Kit-6 (2026-07-20): confirmed gone from oneal.eu\'s current goggle lineup (browser pane) -- the live categories are B-10/B-20/B-22/B-30/B-33/B-50/B-55/B-Zero; no "B-Flex" collection or product exists anymore. No clean 1:1 successor named, so tagged discontinued rather than re-scoped. Left unverified/sample.' },
  { id:'ewr-flyracing-zone', cat:'eyewear', brand:'Fly Racing', model:'Zone', price:44.95, weight:130,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Price re-confirmed kit-6 (2026-07-20) via flyracing.com/zone-goggle-2025/: $44.95 regular price (currently on sale at $35.96, not used here). No weight published; kept as sample per kit-apparel no-weight-required policy.',
    verified:true, priceBasis:'msrp-confirmed', source:'https://flyracing.com/zone-goggle-2025/', lastChecked:'2026-07-20' },
  { id:'ewr-uvex-athletic-cv', cat:'eyewear', brand:'Uvex', model:'Athletic CV', price:108, weight:140,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Kit-6 (2026-07-20): fetched uvex-sports.com\'s "athletic CV bike" colorway page (browser pane) -- confirmed CURRENT, marketed for "downhill action" (a real bike-specific SKU of a chassis the site files under Ski Goggles nav), EUR99.95 RRP, no US price found. Price is a same-tier EUR->USD sample ($108, basis disclosed) per THE PRICE RULE; weight not published, kept as sample.',
    verified:true, priceBasis:'regional-conversion', source:'https://www.uvex-sports.com/en/wintersports/ski-goggles/uvex-athletic-cv-black-mat-sl-blue-green-4043197339085', lastChecked:'2026-07-20' },
  { id:'ewr-sweetprotection-ronin', cat:'eyewear', brand:'Sweet Protection', model:'Ronin', price:160, weight:31,
    type:'glasses', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'CORRECTED type from goggles -> glasses (2026-07-16): sweetprotection.com markets Ronin as "Sport Performance Sunglasses," not goggles. Kit-5 (2026-07-20): fetched the live Ronin RIG Reflect product page fresh -- confirms weight 31g and price $160.00, resolving the prior swapped-weight/price flag (the real weight/price were neither the old 135g/$90 sample nor a swap with Clockwork -- both were simply stale).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://www.sweetprotection.com/us/en/ronin-rig-reflect-rig-obsidianmatte-black/' },
  { id:'ewr-100-racecraft2', cat:'eyewear', brand:'100%', model:'Racecraft2', price:70, weight:130,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'], status:'discontinued',
    desc:'Kit-6 (2026-07-20): confirmed genuinely gone via 100percent.com/collections/mtb-goggles'
      + ' (browser pane) -- the current MTB goggle lineup is DUAL ARMEGA/ARMEGA/ACCURI 2/STRATA 2/'
      + 'ARmatic/Barstow; Racecraft2 is absent from both the collection grid and the "Shop by'
      + ' Model" nav. A site search for "racecraft" returns only RACECRAFT/ACCURI/STRATA-branded'
      + ' replacement-lens and tear-off accessories (RC2/AC2/ST2 shared-fit SKUs) -- no standalone'
      + ' base goggle product exists to buy. No clean 1:1 successor named (ACCURI 2 shares the'
      + ' accessory-compatibility tag but is a distinct existing catalog row), so tagged'
      + ' discontinued rather than re-scoped. Left unverified/sample.' },
  { id:'ewr-leatt-velocity-65', cat:'eyewear', brand:'Leatt', model:'Velocity 6.5', price:120, weight:130,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Fetched us.leatt.com (2026-07-17): CORRECTED price $90 -> $120 (base list; page also shows a $84 sale, not used here). Weight not published there, stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-17', source:'https://us.leatt.com/products/goggle-velocity-6-5' },
  { id:'ewr-spyoptic-foundation', cat:'eyewear', brand:'Spy Optic', model:'Foundation', price:95, weight:130,
    type:'goggles', disciplines:['enduro','dh'], sizes:['OSFA'],
    desc:'Fetched spyoptic.com search results (2026-07-20): Foundation goggle regular price is $95 (currently on sale at $50 across most colorways) -- corrects the stale $55 sample. No weight published in the searchable listing; stays an unconfirmed sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://spyoptic.com/search?q=foundation' },
  { id:'ewr-100-speedcraft-sl', cat:'eyewear', brand:'100%', model:'Speedcraft SL', price:149.95, weight:29,
    type:'glasses', sizes:['OSFA'],
    desc:'Distinct lighter/slimmer model in the 100% Speedcraft family (separate collection page'
      + ' from the base Speedcraft), not a colorway of ewr-100-speedcraft. RE-CONFIRMED 2026-07-19'
      + ' via browser-rendered 100percent.com/collections/speedcraft-sl (WebFetch JS-walled):'
      + ' $149.95 confirmed as the Tokyo Night colorway price (range $139.95-$189.95). Weight not'
      + ' published (shipping-weight caveat, see the S3 row), stays sample.',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-19', source:'https://100percent.com/collections/speedcraft-sl' },
  { id:'ewr-smith-attack-mag-mtb', cat:'eyewear', brand:'Smith', model:'Attack MAG MTB', price:259, weight:33,
    type:'glasses', disciplines:['trail','enduro'], sizes:['OSFA'],
    status:'discontinued',
    desc:'Discontinued 2026-07-17: no base Attack MAG MTB product exists on smithoptics.com\'s'
      + ' current Shopify catalog (checked its full product sitemap + the mag-sunglasses'
      + ' collection - only Shift XL MAG / Shift Split MAG remain live, plus an orphaned'
      + ' attack-mag-mtb-replacement-lens accessory SKU with no parent product). Supersedes the'
      + ' prior note (a real current model, price corroborated via search-indexed URLs at $259) -'
      + ' those same $259-starting listings are now this SKU\'s last-known price before delisting,'
      + ' kept as the sample figure; weight (33g) stays an unconfirmed sample (TR90 frame, similar'
      + ' sport-sunglass class to the Squad MTB/Wildcat rows). Stays unverified - no live maker'
      + ' page to confirm against.' },
  { id:'ewr-melonoptics-kingpin', cat:'eyewear', brand:'Melon Optics', model:'Kingpin', price:145, weight:30,
    type:'glasses', sizes:['S','M','L'],
    desc:'Weight not published anywhere on the product page (unconfirmed sample). Re-fetched melonoptics.com/us/shop/kingpin/ fresh (2026-07-20): build-your-own base price is $145.00 (corrects the prior $160 sample, which was pinned to a limited-edition colorway rather than the base build), S/M/L head-size options (not one-size).',
    verified:true, priceBasis:'msrp-confirmed', lastChecked:'2026-07-20', source:'https://melonoptics.com/us/shop/kingpin/' }
];

/* ---- legacy id aliases -----------------------------------------------------
   Same APPEND-ONLY contract as the MTB catalog and the BMX port
   (DATA-MODEL-REVIEW.md §3.1; src/compat-bmx.js's BMX_ALIASES/canonicalBmxId):
   a kit id is never renamed or reused. When a row must be retired (e.g. the
   kit-10 naming-ambiguity wave's 8 fabricated rows - never-existed products
   surfaced by the verification grind, tools/verify-notes-kit.md "Kit Wave
   10"), the old id retires into this map (old -> current) instead of being
   deleted outright, and every id-shaped input this builder reads resolves
   through canonicalKitId first - same single-hop, no-chaining contract as
   compat.js's ALIASES/canonicalId (test/test-ids.js's last 4 cases, mirrored
   for kit by test/test-kit-aliases.js).

   Only rows with a genuine like-for-like successor in the live catalog get an
   entry here (a retarget must resolve to a REAL current row - the same
   invariant test-ids.js pins for the MTB table: every alias value must
   byId()-resolve). A fabricated row with no such successor is retired with NO
   entry here (a "plain tombstone"): the id simply stops resolving, and
   KitBuilder's restore path already drops any id kitById can't find rather
   than throwing (mirrors bmx.html's load() - see KitBuilder/index.html). */
/** @type {Object.<string, string>} */
var KIT_ALIASES = {
  'jsy-fox-ranger-foxguard-ls': 'jsy-fox-defend',  // kit-10 (2026-07-21): no Fox "Foxguard" jersey ever existed; coordinator-approved retarget to the Defend LS (style #32367), the guard-compatible jersey in Fox's live line - see tools/verify-notes-kit.md "Kit Wave 10".
  'shg-oneal-parkfr': 'knp-oneal-parkfr-carbon'    // seat-19 (2026-07-22): Douglas ruled the knee/shin combo is a retailer bundle, not a maker SKU; retargeted to the maker's knee-only Park FR CARBON.
};
/** @param {string|null|undefined} id @returns {string|null|undefined} */
function canonicalKitId(id){ return (id && Object.prototype.hasOwnProperty.call(KIT_ALIASES, id)) ? KIT_ALIASES[id] : id; }

/* id -> kit part (null-prototype so a crafted id can't resolve to an inherited value). */
/** @type {Object.<string, KitPart>} */
var _KIT_BY_ID = Object.create(null);
KIT_PARTS.forEach(function(p){ _KIT_BY_ID[p.id] = p; });
/** @param {string|null|undefined} id @returns {KitPart|null} */
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
    KIT_PARTS:KIT_PARTS, kitById:kitById, kitTotals:kitTotals,
    KIT_ALIASES:KIT_ALIASES, canonicalKitId:canonicalKitId };
}
