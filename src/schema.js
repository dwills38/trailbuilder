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
/** @typedef {{type: 'number'|'string'|'bool'|'id'|'idArray'|'fills'|'enumArray'|'sizes', vocab?: string, optional?: boolean, nullable?: boolean}} FieldRule */
/** @typedef {{has: (id: string) => boolean, catOf: (id: string) => string, slotCat: Object.<string, string>, today: Date}} Ctx */

/* Canonical vocabularies - the only allowed values for each standard. */
/** @type {Object.<string, string[]>} */
var VOCAB = {
  wheel:        ['29', '275'],
  wheelConfig:  ['29', '275', 'mullet'],
  /* Do NOT add a '157DH' value: 12x157 is ONE fitment standard (DH hubs are
     SuperBoost157 - fact-checked, DATA-MODEL-REVIEW section 2); a split would
     create false "won't fit" verdicts. 142x12 is pre-Boost, inert until parts
     carry it. */
  /* '150x12' = the pre-Boost/classic DH rear (Commencal Supreme DH V5 per
     Vital's spec table - 12x150; distinct from SuperBoost157). */
  rearAxle:     ['Boost148', 'SuperBoost157', '142x12', '150x12'],
  /* 20x110 = the MODERN dual-crown standard, 20x110 BOOST (BoxXer D1, Fox 40
     2025). '20x110-nonboost' = the legacy/standard DH spacing some forks still
     use (Marzocchi Bomber 58 - maker page states "20x110 DH (non-Boost)").
     Same axle dimensions but the Boost variant repositions the rotor/flanges,
     so they are DIFFERENT fitment standards - conflating them would produce
     false "fits" on fork+wheel pairs. And 15x110 Boost110 is a third thing. */
  frontAxle:    ['Boost110', '20x110', '20x110-nonboost'],
  /* 'integrated' = the driver IS a built-in cassette, no freehub body exposed
     (e*thirteen LG1r DH rear - "Freehub Mount: Integrated 7 Speed Cassette",
     fetched ethirteen.eu 2026-07-10), so NO separate cassette mounts and no
     adapter tier exists (engine rule 6b hard-errors any picked cassette).
     Wheel/hub-side value ONLY - a cassette row can never carry it (cross-rule
     below). Today the token means exactly the e*thirteen 7-speed (9-24T)
     driver; a future integrated wheel with a different built-in cassette must
     SPLIT the token, not conflate (the HG road convention). */
  /* 'XDR' added 2026-07-11 (catalog-wheels-enduro-2 batch): WTB's own CZR i30
     product page (fetched wtb.com/products/czr-i30-wheel) states the driver
     body verbatim as "SRAM XDR" (not "XD") for its Frequency hub, and
     BikeRadar corroborates - XDR is the ROAD/gravel-length driver body (11spd
     road cassettes; 1.85mm longer than XD), and SRAM/WTB both note an MTB
     (XD) cassette needs a 1.85mm spacer to seat on it. That is a genuinely
     DIFFERENT physical interface from 'XD', not a typo - conflating them
     would silently green-light a cassette that doesn't seat without a $10
     spacer. Kept a distinct token rather than merged into 'XD' per THE BAR
     (never invent a mapping to force a fit). Engine consequence: rule 6
     (freehub mismatch) will hard-error an XDR wheel against every in-catalog
     cassette (all XD/MicroSpline/HG) since none carries 'XDR' - correct
     today (no adapter path modeled), but flagged for a future fix-tier
     enhancement mirroring the CL-on-6-bolt-hub adapter warning, once a real
     XD-on-XDR spacer part/adapter fact is worth encoding engine-side. */
  freehub:      ['XD', 'MicroSpline', 'HG', 'integrated', 'XDR'],   // 'HG' = MTB-length HG spline (a road expansion must SPLIT, not conflate)
  rotorMount:   ['sixbolt', 'CL'],             // audited 2026-07: market-complete for MTB
  shockMount:   ['std', 'trunnion'],           // audited 2026-07: market-complete ('bearing' eyelets may join when a bearing-eyelet row lands)
  /* 'straight-dc' = the straight 1.125in steerer of dual-crown DH forks
     (Boxxer, Fox 40, Dorado). On a FRAME, headset:'straight-dc' means "the
     stock headset accepts a dual-crown straight steerer" (same steerer-FIT
     semantics as 'tapered' - the template's SHIS note still applies). Rule 11
     compares fork.steerer vs frame.headset by equality, so the two lists must
     stay in lockstep. Consequence (documented 2026-07-08): a tapered
     single-crown fork on a DH frame reds out - true with the stock cups; a
     future adapter-tier warning can soften it if expert review wants that. */
  headset:      ['tapered', 'straight-dc'],
  steerer:      ['tapered', 'straight-dc'],
  /* PF92 covers the BB92/89.5 PressFit family. T47 SEMANTICS ARE UNDEFINED:
     85.5-internal vs 68/73-external T47 are different products - pin the
     meaning (likely split values) BEFORE the first real T47 frame enters.
     (The one previous 'T47' row was a data error - no MTB Slash uses T47.) */
  /* PF107 = the 107mm-wide DH press-fit shell (Supreme DH V5's own page:
     "Press Fit BB 107mm") - pairs with DH cranks' DUB PF 104.5/107 BBs.
     BSA83 = the 83mm threaded DH shell (Sender CFR - confirmed BSA 83;
     distinct from BSA73, needs the matching 83mm BB cups).
     PF865 = the 86.5mm-wide press-fit shell (Canyon Lux World Cup CFR AXS's
     own page: "Ceramicspeed Coated BB (SRAM)" / "PF 86,5" - a road-derived
     narrower shell used on some XC frames, genuinely distinct from the 92mm
     PF92 family per the comment above; verify-frames-2, 2026-07-09). */
  frameBb:      ['BSA73', 'PF92', 'T47', 'PF107', 'BSA83', 'BSA68', 'PF865'],   // BSA68 = the classic 68mm threaded shell (Meta HT V3's own page, 2026-07-08 - hardtails still ship it)
  /* crankBb is the SPINDLE INTERFACE, not a brand (DATA-MODEL-REVIEW 5.1-5):
     DUB (28.99mm), 24mm (Shimano Hollowtech II + Race Face Cinch steel + ...),
     30mm (BB30-class: eeWings, Race Face Cinch alu, Hope), p3 (e*thirteen).
     DUB-Wide is a CHAINLINE, not a new spindle value. The old too-narrow
     vocab (DUB|SH24) forced two fictitious catalog products - never again. */
  crankBb:      ['DUB', '24mm', '30mm', 'p3'],
  /* 'FM' = flat mount rear - modern XC frames (2021+ Canyon Exceed per
     BikeRadar: "Canyon has adopted the Flat Mount standard for the rear
     brake caliper"); FM and PM calipers do NOT interchange without adapters. */
  brakeMount:   ['PM', 'FM'],
  /* LinkGlide is deliberately its own system: Shimano documents it as HG-only
     and incompatible with Hyperglide+ 12s. The 10/11-speed values are INERT
     (equality-checked only) until parts carry them.
     sram-dh-7 (DECIDED 2026-07-08, supersedes the earlier "waits on a rule-3
     chain-width redesign" note): the 7s DH group's chain physically is an
     11-speed-width chain (SRAM specs PC-X01 for the X01 DH group), so the DH
     chain row carries system:'sram-dh-7'/speeds:7 as COMPATIBILITY TOKENS with
     the physical truth in desc. Rule 3 then passes a full 7s group and rejects
     mixing with 12s parts - no engine change. Revisit only if a second
     mixed-chain-width system appears. */
  /* Budget wide-range 1x systems, each its OWN cable-pull standard (added
     2026-07-08, sourced from the makers' own model pages):
       microshift-advent    = microSHIFT Advent 9-speed. The Advent shifter's
                              own page states "Not compatible with Shimano or
                              SRAM."
       microshift-advent-x  = microSHIFT Advent X 10-speed (the SL-M9605-R page
                              lists it as also driving the microSHIFT Sword 10s
                              group, and again "Not compatible with Shimano or
                              SRAM").
       box-prime-9          = Box Components Prime 9 (9-speed). A proprietary
                              Prime 9 pull; the Box derailleur page lists
                              compatibility only with Box Prime 9 shifters.
     All three run a STANDARD HG freehub + a standard 9/10-speed chain (only the
     shifter+derailleur pull is proprietary), so their cassettes carry
     freehub:'HG'. Distinct systems keep a cross-brand pairing (e.g. a Box
     shifter on a microSHIFT mech) an honest error instead of a false green. */
  system:       ['sram-eagle', 'sram-transmission', 'shimano-12',
                 'shimano-linkglide', 'shimano-11', 'shimano-10', 'sram-11',
                 'sram-dh-7',
                 'microshift-advent', 'microshift-advent-x', 'box-prime-9'],
  actuation:    ['cable', 'electronic'],       // audited 2026-07: market-complete for shifter/derailleur ('hydraulic' joins only with dropper.actuation)
  ringStd:      ['t-type', 'standard-12'],
  /* I-Spec II / I-Spec B are older, mutually-incompatible Shimano standards
     (Saint/Zee are I-Spec B; M8000-era is I-Spec II - neither mates with EV) */
  shifterClamp: ['ispec-ev', 'ispec-ii', 'ispec-b', 'matchmaker', 'band', 'pod'],
  leverClamp:   ['ispec-ev', 'ispec-ii', 'ispec-b', 'matchmaker'],
  derailMount:  ['hanger', 'udh-direct'],      // audited 2026-07: market-complete (proprietary-hanger frames are udh:false + 'hanger')
  spring:       ['air', 'coil'],               // audited 2026-07: market-complete
  material:     ['alu', 'carbon', 'steel', 'ti'],   // steel/ti unblock whole brands (Cotic, Starling, Ti bars/rails)
  pedalStyle:   ['flat', 'clip', 'hybrid'],    // widened 2026-07-08 (catalog-pedals-breadth-2): real dual-sided flat/clip pedals exist
                                                // (Crankbrothers Double Shot 3, HT D1/GD1) - a "market-complete" flat/clip split was
                                                // wrong. Pedals still need no compat rule (9/16"-20 universal).
  /* S.H.I.S. codes (Cane Creek's Standardized Headset Identification System,
     canecreek.com - the definitive doc for the standard). Shared by the frame
     capture pair (headTubeUpper/headTubeLower) AND the headset category's
     upper/lower assemblies. Anatomy: the token BEFORE the slash is the
     head-tube side (cup family EC/ZS/IS + bore mm - the frame fact); the
     number AFTER it is the steerer side at that assembly (28.6 = 1-1/8in
     steerer OD at the upper bearing, 40 = the 1.5in crown race seat, 30 =
     the 1-1/8in crown race seat - none sourced yet, joins with the first
     real straight-steerer headset row). Rule 20b compares BORE TOKENS only
     (the frame backfill's suffixes assume the common tapered assembly - a
     straight-dc frame like the Supreme DH still records ZS56/40, so a
     full-code match would false-red a real DH headset). ILLUSTRATIVE list,
     extend as sourced. Rule 11 keeps consuming the `headset` steerer-fit
     field, whose semantics stay pinned. */
  headTube:     ['ZS44/28.6', 'ZS56/28.6', 'ZS56/40', 'IS41/28.6', 'IS42/28.6', 'IS52/40', 'EC34/28.6', 'EC44/40', 'ZS49/28.6', 'EC49/40'],   // ZS49/28.6 + EC49/40 added 2026-07-11 (expand/finishing-kit): fetched Chris King InSet 5 + Cane Creek 40/110, auditor-confirmed
  /* Tire SKU axes (DATA-MODEL-REVIEW section 3 item 5): brand-NATIVE names, not a
     cross-brand toughness tier. Maxxis values seeded first; Schwalbe /
     Specialized etc. get enumerated per brand when their batch starts - never
     invented mid-batch.
     Continental enumerated 2026-07-07 from the maker's Tire Range 2025/26 PDF:
     casings Trail/Enduro/Downhill x compounds Endurance/Soft/SuperSoft -
     NOT strictly coupled (Downhill ships in Soft AND SuperSoft; Trail in Soft
     AND Endurance), so they stay two free axes. */
  casing:       ['exo', 'exo-plus', 'doubledown', 'dh',            // Maxxis
                 'trail', 'enduro', 'downhill',                    // Continental
                 'super-race', 'super-ground', 'super-trail', 'super-gravity', 'super-downhill',    // Schwalbe (2026-07-07/08, schwalbetires.com; super-race = XC race casing)
                 'protection',                                     // Continental XC line (2026-07-08, fetched WWC listing; RaceSport/ShieldWall exist - add when a row needs them)
                 'hardwall', 'prowall',                            // Pirelli (2026-07-07, pirelli.com)
                 'tcs-light-sg2', 'tcs-tough-sg1', 'tcs-tough',    // WTB (2026-07-07/08, wtb.com; plain 'tcs-tough' = the dual-ply E25 tier with no SG guard layer, distinct from the SG1-reinforced tier)
                 'atc', 'aec', 'agc',                              // Kenda (2026-07-07, kendatire.com; Goodyear reuses trail/enduro/downhill)
                 'xc-race',                                        // Vittoria XC-line version tier (2026-07-08, vittoria.com Mezcal XC Race; the gravity line reuses trail/enduro/downhill)
                 'gravity-shield',                                 // Michelin Racing Line (2026-07-08, retailer-aggregated SKU copy - michelinman.com truncates to nav-only; Performance Line has no named casing, left unset)
                 'grid-trail', 'grid-gravity',                     // Specialized (2026-07-08; specialized.com is 403-blocked for WebFetch, sourced via bikeradar/jensonusa/retailer aggregation)
                 'trc', 'grc', 'xcc',                              // Onza (2026-07-08, fetched onza-tires.com SKU tables; TRC=Trail Ready Casing, GRC=Gravity Ready Casing, XCC=XC Casing)
                 'enduro-core', 'synthesis', 'gravity-core', 'gxe-core', 'dh-core', 'wire-bead', 'folding-tlr',  // Vee Tire Co (2026-07-08, fetched veetireco.de SKU tables - Vee's own regional storefront; wire-bead/folding-tlr are Crown Gem's bead-construction axis, the table's own "Casing" column)
                 'inner-strength', 'core-strength',                // Bontrager (2026-07-08; trekbikes.com is JS-rendered/nav-only for WebFetch, sourced via bikerumor's fetched press-release spec table)
                 'high-output', 'super-tough',                     // Panaracer (tire-breadth-3, 2026-07-08/09, fetched panaracer.com + panaracerusa.com: "HO"/"ST" are the maker's OWN tier abbreviations printed on the tire/product name itself, e.g. "Aliso HO", "Romero ST")
                 'durable', 'ultra-durable', 'light-and-supple',  // Teravail (tire-breadth-3; fetched teravail.com casing-tier names - Ultra Durable adds a 1/2-ply of 120tpi + apex wedges over Durable)
                 'tough',                                          // Terrene (tire-breadth-3, fetched terrenetires.com/pages/tech - Terrene's own casing-tier name; the lighter 'Light' tier exists but no row here uses it)
                 'tr', 'emc',                                       // Kenda Havok Pro (tire-breadth-3, fetched bicycle.kendatire.com spec table - the sheet's own "Protection" column values: TR = plain tubeless-ready folding, EMC = e-MTB-certified reinforced folding; a third Wire/non-tubeless config exists but isn't catalogued (no distinct casing name, just "Wire" bead))
                 'eps', 'eps-tlr', 'exo-btb',                        // CST BFT (verify-tires-tail, 2026-07-10, fetched shop.csttires.com/products/bft-1 spec table - its own "Technology" column, distinct from the Bead-type axis: EPS = Exceptional Puncture Safety, EPS/TLR = EPS + Tubeless Ready, EXO-BTB = the 2.6in SKU's own bead-to-bead reinforcement tag)
                 'flux-gr', 'flux-am', 'flux-gr-radial',           // e*thirteen (expand/tires-new-brands, 2026-07-11, fetched ethirteen.com/products/*.js Shopify variant JSON - Flux GR = the Grappler line's gravity/enduro casing, Flux AM = the all-mountain/trail casing, Flux GR Radial = the radial-construction Grappler Radial's own casing name)
                 'hardskin', 'sideskin',                            // Hutchinson (expand/tires-new-brands, 2026-07-11, fetched cycling.hutchinson.com product pages - the sheet's own "Reinforcement" column values; a third unnamed dual-66TPI DH casing and a plain unreinforced tier exist on some rows but print no brand name there, so they're left uncatalogued per the never-invent-a-name rule)
                 'gravity-pro',                                     // Schwalbe Albert Radial (enduro-trail-gap-fill, 2026-07-11, fetched schwalbetires.com SKU pages - the "Version" field on Schwalbe's new radial-carcass generation; distinct from the older bias-ply Super Trail/Super Gravity/Super Downhill tiers, which stay in production on other models)
                 'ksct'],                                            // Kenda Small Block Eight / Honey Badger (expand/tires-xc, 2026-07-11, fetched bicycle.kendatire.com spec tables - the sheet's own "Protection" column value for these two models, distinct from Havok Pro's TR/EMC and Nevegal2's ATC; DTC compound is shared/reused)
  compound:     ['dual', '3c-maxxterra', '3c-maxxgrip', 'maxxspeed', 'maxxterra', '3c-maxxspeed',   // Maxxis (maxxspeed = XC race compound, Aspen page 2026-07-08; bare 'maxxterra'/'3c-maxxspeed' are genuinely distinct SKUs from their 3C/plain siblings per the fetched maxxis.com Rekon/Forekaster/Ikon tables, 2026-07-08)
                 'endurance', 'soft', 'supersoft', 'blackchili',   // Continental (blackchili = the XC line's compound, 2026-07-08)
                 'addix', 'addix-speed', 'addix-speedgrip', 'addix-soft', 'addix-ultra-soft',        // Schwalbe (addix-speed = XC race compound, fetched 2026-07-08)
                 'smartgrip', 'smartgrip-gravity',                 // Pirelli
                 '4c-graphene', 'graphene-silica',                 // Vittoria (casing reuses trail/enduro/downhill - Vittoria's own tier names; graphene-silica = the XC Race Formulation, 2026-07-08)
                 'tritec',                                         // WTB
                 'dual-layer',                                     // Kenda
                 'grip3s', 'grip3',                                // Goodyear (Grip3S = softer FRONT/MTF compound; Grip3 = harder REAR/MTR compound - a genuine F/R split per goodyearbike.com)
                 'magix', 'magix-mh', 'magix-ms', 'magix-dh',      // Michelin (2026-07-08; Magi-X base compound name + MH/MS hardness tiers + the DH-specific "Magi-X DH Compound"; retailer/press-aggregated, michelinman.com unfetchable)
                 'gripton-t7', 'gripton-t9',                       // Specialized (2026-07-08; GRIPTON T7/T9 compound tiers, retailer-aggregated)
                 'soft-50', 'medium-60', 'single-60a',             // Onza (2026-07-08, fetched onza-tires.com - the maker's own "Soft 50"/"Medium Compound 60"/"Single 60a" durometer-named compounds)
                 'tackee', 'top40', 'mpc', 'dcc',                  // Vee Tire Co (2026-07-08, fetched veetireco.de - Tackee dual-compound, TOP40 gravity-race compound, Crown Gem's MPC/DCC compounds)
                 'tm-speed', 'tm-grip',                            // Bontrager (2026-07-08; TM-Speed/TM-Grip proprietary compounds, bikerumor-aggregated)
                 'triple-compound', 'zsg-natural',                 // Panaracer (tire-breadth-3, fetched panaracer.com spec tables - Triple Compound is the current Aliso/Romero/DriverPro tech; ZSG Natural is DriverPro's older/narrower-size compound, also used on the legacy Rampage)
                 'grip', 'grip-plus',                              // Teravail (tire-breadth-3, fetched teravail.com - the maker's own "Grip"/"Grip Plus" compound names; a third "Fast" compound exists but no row here uses it)
                 '62a-51a', '56a-48a',                             // Terrene (tire-breadth-3; terrenetires.com/pages/tech states Terrene names compounds by durometer pairing, not a marketing name - 62a-51a is the standard Chunk tread, 56a-48a the softer "Tough/Grip" tread)
                 'grip-compound',                                  // Continental Magnotal (tire-breadth-3, fetched continental-tires.com product page + retailer listings; named distinctly from Teravail's 'grip' - different brand, different rubber. Magnotal's other tier reuses the existing 'soft' value shared with Kryptotal)
                 'dtc',                                            // Kenda Dual Tread Compound (tire-breadth-3, fetched Nevegal2 spec sheet + Havok Pro page - both call out a hard-center/soft-shoulder "Dual Tread Compound"; kept distinct from Maxxis/Vittoria's unrelated 'dual' per the brand-native rule)
                 'mopo', 'momentum',                                // e*thirteen (expand/tires-new-brands, 2026-07-11, fetched ethirteen.com Shopify variant JSON - MoPo/Momentum are the Grappler line's own compound-option names)
                 'race-ripost-enduro', 'race-ripost-gravity', 'race-ripost-xc', 'bi-compound'],  // Hutchinson (expand/tires-new-brands, 2026-07-11, fetched cycling.hutchinson.com product pages - the sheet's own "Compound" column values; a plain "Mono-compound" tubetype tier also exists but wasn't catalogued here (tubetype rows skipped in favor of the tubeless-ready SKUs))
  /* disciplines (DATA-MODEL-REVIEW section 4): filter/annotation ONLY - it must
     NEVER feed checkBuild (a DH tire physically fits an enduro bike; structural
     DH constraints are real fields: crown/axle/steerer). Absence = universal.
     'ebike' is deliberately NOT a value - e-enduro/e-trail/e-XC all exist, so
     e-bike is an orthogonal later flag, not a discipline. */
  discipline:   ['xc', 'trail', 'enduro', 'dh'],
  suspension:   ['full', 'hardtail'],
  /* Provenance policy (DATA-MODEL-REVIEW 5.1-13, decided 2026-07): absent =
     manufacturer. 'measured' = a reputable third-party MEASURED figure and is
     accepted for WEIGHT ONLY (interfaces stay manufacturer-sourced; the
     measured URL goes in weightSource) - this is what makes the rotor
     category verifiable at all (SRAM publishes no rotor weights).
     'retailer' exists so below-the-bar provenance can be stated honestly -
     the validator REJECTS it on verified rows. */
  sourceType:   ['manufacturer', 'manufacturer-doc', 'measured', 'retailer'],
  status:       ['current', 'discontinued', 'recalled'],   // absent = current
  soldWithout:  ['battery', 'charger', 'spring', 'rotor', 'mounting-hardware']
};

/* Per-category field schema. Each field: {type, vocab?, optional?, nullable?}
   type: 'number' | 'string' | 'bool' | 'id' (must reference an existing part) | 'fills' */
/** @type {Object.<string, Object.<string, FieldRule>>} */
var SCHEMA = {
  frame: {
    wheelConfigs:{type:'enumArray',vocab:'wheelConfig'}, rearAxle:{type:'string',vocab:'rearAxle'},
    headset:{type:'string',vocab:'headset'}, bb:{type:'string',vocab:'frameBb'},
    seatTube:{type:'number'}, brakeMount:{type:'string',vocab:'brakeMount'},
    /* minRotorR (dossier known-gaps verdict, 2026-07-10): the frame's native
       post-mount rotor FLOOR - dormant-until-sourced (rule-18 template), maker
       statements only (Cotic Solaris: "PM7 Post Mount (180mm rotor only)").
       Rule 10b errors below it - adapters only space calipers up. */
    maxRotorR:{type:'number'}, minRotorR:{type:'number',optional:true},
    /* the suspension discriminator (DATA-MODEL-REVIEW section 4): the shock
       block is required for 'full' and FORBIDDEN for 'hardtail' - enforced by
       a cross-rule below, which is why the four fields are schema-optional */
    suspension:{type:'string',vocab:'suspension'},
    shockEye:{type:'number',optional:true}, shockStroke:{type:'number',optional:true},
    shockMount:{type:'string',vocab:'shockMount',optional:true}, travel:{type:'number',optional:true},
    maxForkTravel:{type:'number'},
    /* dormant-until-sourced (rule-18 template): minForkTravel = the maker's
       published approved-fork floor (REVIEW #14 - never a heuristic, a
       travel-based guess would false-fire on high-pivot frames like the
       Dreadnought); designForkTravel = the maker-STATED design fork travel
       ("geometry is based around a 170mm fork") - design intent, NOT an
       approved floor; rule 12c warns only >20mm below it (10-20mm under is
       a real deliberate build). Both manufacturer statements only.
       coilApproved:false = the maker states the frame is NOT
       coil-compatible (REVIEW #21 - manufacturer statements only, never
       leverage-curve guesses; absence means unknown, not approved). */
    minForkTravel:{type:'number',optional:true}, designForkTravel:{type:'number',optional:true},
    /* forkTravelHard (engine-critical review C4, 2026-07-12): true = the
       row's cited source states the fork-travel range as a HARD
       compatibility limit ("compatible with 150-170mm forks", "rated for
       180-190 mm", "160mm minimum up to 180mm maximum") -> rule 12/12b
       ERROR outside the range. ABSENT = the range is maker recommendation
       language (the Santa Cruz support-page FAQ pattern: "We wouldn't
       recommend less travel than that, as the BB will get a bit low. Up to
       Xmm is fine if that's your preference") -> WARNING, because the fork
       physically bolts on and functions either way; only geometry shifts.
       Safe-by-default: a new frame can never gain a hard travel red without
       an explicit, sourced assertion (cross-rule below requires min +
       source). */
    forkTravelHard:{type:'bool',optional:true}, coilApproved:{type:'bool',optional:true},
    /* udhRetrofitKit (dossier rule 4 review, 2026-07-10): the maker-documented
       UDH conversion kit's name, only for non-UDH frames whose maker sells one
       (RAAW UDH Retrofit Kit: Jibb V1 / Madonna V2 / V2.2). Sourced only;
       presence downgrades rule 4's error to the adapter-tier warning. */
    udh:{type:'bool'}, udhRetrofitKit:{type:'string',optional:true}, frameOnly:{type:'bool'}, maxTire:{type:'number',optional:true},
    headTubeUpper:{type:'string',vocab:'headTube',optional:true}, headTubeLower:{type:'string',vocab:'headTube',optional:true},
    bundledShock:{type:'id',optional:true,nullable:true},
    /* per-size data lives in a sub-object, NOT variant rows (sizes share price/
       interfaces; review section 3 item 6). Keys are the maker's own size names
       (S-XXL, S1-S6, ...) - deliberately a free string, not a vocab. */
    sizes:{type:'sizes',optional:true}
  },
  fork: {
    wheel:{type:'string',vocab:'wheel'}, travel:{type:'number'}, axle:{type:'string',vocab:'frontAxle'},
    steerer:{type:'string',vocab:'steerer'}, brakeMount:{type:'string',vocab:'brakeMount'}, maxRotorF:{type:'number'},
    minRotorF:{type:'number',optional:true},
    /* dormant-until-sourced: crown/arch tire clearance from the maker's chassis
       spec (Fox/RockShox publish per chassis) - the fork-side twin of
       frame.maxTire (REVIEW #22). */
    maxTire:{type:'number',optional:true}
  },
  shock: {
    eye:{type:'number'}, stroke:{type:'number'}, mount:{type:'string',vocab:'shockMount'}, spring:{type:'string',vocab:'spring'},
    oemOnly:{type:'bool',optional:true}, forFrames:{type:'idArray',optional:true}
  },
  frontwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'frontAxle'},
    /* minTire (dossier rule 14 review, 2026-07-10): the maker's recommended
       tire-width FLOOR for the rim - dormant-until-sourced (rule-18 template),
       maker statements only, never ETRTO-derived. Rule 14c soft-warns below it. */
    rotorMount:{type:'string',vocab:'rotorMount'}, intWidth:{type:'number'}, maxTire:{type:'number'}, minTire:{type:'number',optional:true}
  },
  rearwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'rearAxle'}, freehub:{type:'string',vocab:'freehub'},
    rotorMount:{type:'string',vocab:'rotorMount'}, intWidth:{type:'number'}, maxTire:{type:'number'}, minTire:{type:'number',optional:true}
  },
  /* fronthub/rearhub/rim: a hub+rim build-your-own-wheel path, additive
     alongside frontwheel/rearwheel (complete pre-built wheels) - only the
     brands that actually sell hubs and rims separately (DT Swiss, Hope,
     Industry Nine, Spank, Stan's, Race Face) get these; everyone else keeps
     working as a complete wheel. rim is one category (like tire) since the
     same rim is usable front or rear; front/rear hub stay separate cats
     (like frontwheel/rearwheel) since only the rear hub carries a freehub. */
  fronthub: { hub:{type:'string',vocab:'frontAxle'}, rotorMount:{type:'string',vocab:'rotorMount'} },
  rearhub: {
    hub:{type:'string',vocab:'rearAxle'}, freehub:{type:'string',vocab:'freehub'}, rotorMount:{type:'string',vocab:'rotorMount'}
  },
  rim: { wheel:{type:'string',vocab:'wheel'}, intWidth:{type:'number'}, maxTire:{type:'number'}, minTire:{type:'number',optional:true} },
  tire: { wheel:{type:'string',vocab:'wheel'}, width:{type:'number'},
    casing:{type:'string',vocab:'casing',optional:true}, compound:{type:'string',vocab:'compound',optional:true} },
  shifter: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, actuation:{type:'string',vocab:'actuation'}, clampType:{type:'string',vocab:'shifterClamp',optional:true} },
  derailleur: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, actuation:{type:'string',vocab:'actuation'}, maxCog:{type:'number'}, mount:{type:'string',vocab:'derailMount'} },
  /* cassette: minCog is numeric because it drives a REAL freehub constraint
     (a 10T cog needs XD/MicroSpline; the HG spline floor is 11T) - the display
     string ("10-52") is derived, never stored (DATA-MODEL-REVIEW 5.1-7) */
  cassette: { system:{type:'string',vocab:'system'}, speeds:{type:'number'}, freehub:{type:'string',vocab:'freehub'}, minCog:{type:'number'}, maxCog:{type:'number'} },
  chain: { system:{type:'string',vocab:'system'}, speeds:{type:'number'} },
  /* crankset: ring/ringStd are OPTIONAL/NULLABLE because armset-only cranks
     ship without a ring (Race Face, eeWings) - a required value forces
     fabricated data and produced a live false red (DATA-MODEL-REVIEW 5.1-6).
     ringStd:null = "ring sold separately / user-fitted". chainline is a
     NUMBER in mm (Boost=52, T-Type=55), display-only for now. */
  crankset: { bb:{type:'string',vocab:'crankBb'}, ring:{type:'number',optional:true}, ringStd:{type:'string',vocab:'ringStd',nullable:true}, speeds:{type:'number'}, chainline:{type:'number',optional:true} },
  /* bb = the bottom bracket itself (dossier rule 7 review, 2026-07-10):
     shell = the frame standard it threads/presses into (frameBb vocab);
     spindle = the crank interface its bore takes (crankBb vocab). Both are
     exact-match engine checks (rule 7) once a BB is picked. */
  bb: { shell:{type:'string',vocab:'frameBb'}, spindle:{type:'string',vocab:'crankBb'} },
  /* headset = the bearing assemblies that mount the fork's steerer in the head
     tube (headset-category pass, 2026-07-10; the bb category is the template).
     upper/lower = the assemblies' S.H.I.S. codes (see the headTube vocab note
     for the code anatomy); steerer = the assembled headset's steerer
     acceptance, same vocab as fork.steerer so rule 20a's equality check stays
     in lockstep. A cross-rule below rejects a steerer value that contradicts
     the codes' steerer-side suffixes. v1 = COMPLETE headsets only (one
     purchasable upper+lower SKU - the flat-SKU model); separate top/bottom
     assemblies and angle-adjust headsets are out of scope until modeled. */
  headset: { upper:{type:'string',vocab:'headTube'}, lower:{type:'string',vocab:'headTube'}, steerer:{type:'string',vocab:'steerer'} },
  /* brake: real levers accept MULTIPLE shifter-mount standards via the maker's
     own clamps (Hayes Peacemaker = I-Spec II/EV + MatchMaker), so this is an
     array (DATA-MODEL-REVIEW 5.1-9).
     maxRotor (engine-critical review C1, 2026-07-12): the CALIPER's own rotor
     ceiling - dormant-until-sourced (rule-18 template), maker statements only.
     Real on flat-mount calipers (the FM system has no size-up bracket;
     Shimano's caliper<->rotor chart C-461 lists the BR-M9110 as "Not
     compatible with 220mm, 203 mm and 180 mm rotors"). Post-mount calipers
     are size-agnostic - the mount, not the body, sets the limit (rule 10) -
     so the field stays ABSENT on them. */
  brake: { mount:{type:'string',vocab:'brakeMount'}, pistons:{type:'number'}, maxRotor:{type:'number',optional:true}, leverAccepts:{type:'enumArray',vocab:'leverClamp',optional:true} },
  rotor: { size:{type:'number'}, mount:{type:'string',vocab:'rotorMount'} },
  handlebar: { clamp:{type:'number'}, width:{type:'number',optional:true}, rise:{type:'number',optional:true}, material:{type:'string',vocab:'material',optional:true} },
  stem: { clamp:{type:'number'}, length:{type:'number',optional:true} },
  grips: {},
  dropper: { diameter:{type:'number'}, drop:{type:'number'} },
  saddle: {},
  pedal: { style:{type:'string',vocab:'pedalStyle'} },
  /* assembled = this "groupset" is not one boxed single-SKU product; the catalog
     assembles it from multiple individually-sold components (the Shimano/Box/
     microSHIFT/DH/OE-tier kits). Absent/false = a real single-part-number
     groupset you can buy as one box. Display/filter-only - never feeds checkBuild. */
  groupset:  { fills:{type:'fills'}, assembled:{type:'bool',optional:true} },
  wheelset:  { fills:{type:'fills'} },
  brakeset:  { fills:{type:'fills'} },
  cockpitset:{ fills:{type:'fills'} }
};

var PRESET_CATS = ['groupset','wheelset','brakeset','cockpitset'];
/* Common fields every category may carry. family/gen/modelYear/mfgPn are the
   flat-SKU supporting kit (review section 3): family = generation-agnostic
   platform slug ("rockshox-zeb"); gen = maker's generation code (free string -
   'B1', 'V3.2', 'm.2'); modelYear = number; mfgPn = the manufacturer part
   number / model code when the source spec table shows one. All optional in
   schema, template-mandatory for NEW rows (tools/DATA-ENTRY-TEMPLATE.md). */
var COMMON = ['id','cat','brand','model','price','weight','desc','verified','lastChecked','source',
  'family','gen','modelYear','mfgPn','disciplines',
  'sourceType','weightSource','archiveUrl','status','supersededBy','soldWithout',
  'image','colors','retailerLinks'];

/* Id convention (DATA-MODEL-REVIEW.md section 3.1): ids are APPEND-ONLY - never
   renamed, never reused; corrections retire the old id into ALIASES (compat.js).
   Shape: <prefix>-<brand>-<model...>[-<gen>][-<variant tokens, fixed per-category
   order>], all lowercase [a-z0-9-]. The brand is ONE token: lowercased, diacritics
   folded, punctuation dropped ("Öhlins" -> ohlins, "e*thirteen" -> ethirteen). */
/** @type {Object.<string, string>} */
var ID_PREFIX = {
  frame:'fr', fork:'fk', shock:'sh', frontwheel:'fw', rearwheel:'rw', tire:'ti',
  fronthub:'fh', rearhub:'rh', rim:'rm',
  shifter:'sft', derailleur:'dr', cassette:'ca', chain:'ch', crankset:'cr',
  brake:'bk', rotor:'ro', handlebar:'hb', stem:'st', grips:'gr', dropper:'dp',
  saddle:'sa', pedal:'pd', bb:'bb', headset:'hs', groupset:'gs', wheelset:'ws', brakeset:'bs', cockpitset:'co'
};
var ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/** One-token brand slug for the id's second token. @param {*} brand @returns {string} */
function brandSlug(brand){
  return String(brand == null ? '' : brand)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
}

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
/** @param {*} v @returns {boolean} */
function hexColorOk(v){ return typeof v === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v); }
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

  // id convention (see ID_PREFIX above): charset + category prefix + enough tokens
  if(!ID_RE.test(p.id)) bad('id must be lowercase [a-z0-9] tokens separated by "-"');
  else {
    var idToks = p.id.split('-');
    if(idToks[0] !== ID_PREFIX[p.cat]) bad('id prefix "' + idToks[0] + '-" does not match category "' + p.cat + '" (expected "' + ID_PREFIX[p.cat] + '-")');
    if(idToks.length < 3) bad('id needs at least <prefix>-<brand>-<model> tokens');
  }

  // price semantics are PINNED: manufacturer US MSRP in USD - never street
  // prices, never converted currencies (DATA-MODEL-REVIEW 5.1-12). Mixed
  // meanings across thousands of rows can never be untangled later.
  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');
  if('weight' in p && !(isNum(p.weight) && p.weight >= 0)) bad('weight must be a number >= 0 (grams)');
  // preset weight is ALWAYS derived from its fills (a stored figure drifts into
  // physically impossible bundles - REVIEW.md #12); price MAY be stored because
  // real bundle discounts exist (guarded by the <=-sum lint below)
  if(isPreset(p.cat) && 'weight' in p) bad('preset weight is derived from fills - do not store it');

  // provenance
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, ctx.today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
  } else {
    if('source' in p && p.source != null && typeof p.source !== 'string') bad('source must be a string');
    if('lastChecked' in p && p.lastChecked != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked)) bad('lastChecked must be YYYY-MM-DD');
  }

  // identity / grouping fields (optional on every category - see COMMON above)
  if('family' in p && p.family != null && !(isStr(p.family) && ID_RE.test(p.family)))
    bad('family must be a lowercase slug like "rockshox-zeb"');
  if('gen' in p && p.gen != null && !isStr(p.gen)) bad('gen must be a non-empty string');
  if('mfgPn' in p && p.mfgPn != null && !isStr(p.mfgPn)) bad('mfgPn must be a non-empty string');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');
  if('disciplines' in p && p.disciplines != null){
    if(!Array.isArray(p.disciplines) || p.disciplines.length === 0) bad('disciplines must be a non-empty array');
    else p.disciplines.forEach(function(/** @type {*} */ d){
      if(VOCAB.discipline.indexOf(d) < 0) bad('disciplines value "' + d + '" not in discipline [' + VOCAB.discipline.join(', ') + ']');
    });
  }

  // Phase 2 display-only fields (DATA-MODEL-REVIEW roadmap): never feed
  // checkBuild - a part with the wrong color or a dead retailer link still fits
  // the same as one without either.
  if('image' in p && p.image != null && !urlOk(p.image)) bad('image must be a valid http(s) URL');
  if('colors' in p && p.colors != null){
    if(!Array.isArray(p.colors) || p.colors.length === 0) bad('colors must be a non-empty array of hex codes');
    else p.colors.forEach(function(/** @type {*} */ c){
      if(!hexColorOk(c)) bad('colors value "' + c + '" must be a hex code like "#1f6f4a"');
    });
  }
  if('retailerLinks' in p && p.retailerLinks != null){
    if(!Array.isArray(p.retailerLinks) || p.retailerLinks.length === 0) bad('retailerLinks must be a non-empty array');
    else p.retailerLinks.forEach(function(/** @type {*} */ r){
      if(!isObj(r)) { bad('retailerLinks entries must be objects {label, url}'); return; }
      if(!isStr(r.label)) bad('retailerLinks entry missing a non-empty "label"');
      if(!urlOk(r.url)) bad('retailerLinks entry "' + (r.label||'?') + '" needs a valid http(s) "url"');
      Object.keys(r).forEach(function(k){ if(k!=='label' && k!=='url') bad('retailerLinks entry has unknown key "' + k + '"'); });
    });
  }

  // provenance policy + lifecycle (see the sourceType comment in VOCAB)
  if('sourceType' in p && p.sourceType != null){
    if(!isStr(p.sourceType) || VOCAB.sourceType.indexOf(p.sourceType) < 0)
      bad('sourceType "' + p.sourceType + '" not in [' + VOCAB.sourceType.join(', ') + ']');
    if(p.verified === true && p.sourceType === 'retailer') bad('verified:true cannot rest on a retailer source');
    if(p.sourceType === 'measured' && !urlOk(p.weightSource)) bad('sourceType "measured" requires a weightSource URL (the measured figure must be auditable)');
  }
  if('weightSource' in p && p.weightSource != null && !urlOk(p.weightSource)) bad('weightSource must be a valid http(s) URL');
  if('archiveUrl' in p && p.archiveUrl != null && !urlOk(p.archiveUrl)) bad('archiveUrl must be a valid http(s) URL');
  if('status' in p && p.status != null && (!isStr(p.status) || VOCAB.status.indexOf(p.status) < 0))
    bad('status "' + p.status + '" not in [' + VOCAB.status.join(', ') + ']');
  if('supersededBy' in p && p.supersededBy != null){
    if(!isStr(p.supersededBy)) bad('supersededBy must be a part id');
    else if(!ctx.has(p.supersededBy)) bad('supersededBy references unknown part "' + p.supersededBy + '"');
    else if(p.supersededBy === p.id) bad('a part cannot supersede itself');
  }
  if('soldWithout' in p && p.soldWithout != null){
    if(!Array.isArray(p.soldWithout) || p.soldWithout.length === 0) bad('soldWithout must be a non-empty array');
    else p.soldWithout.forEach(function(/** @type {*} */ s){
      if(VOCAB.soldWithout.indexOf(s) < 0) bad('soldWithout value "' + s + '" not in [' + VOCAB.soldWithout.join(', ') + ']');
    });
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
      case 'idArray':
        if(!Array.isArray(v) || v.length === 0){ bad('field "' + field + '" must be a non-empty array of part ids'); break; }
        v.forEach(function(/** @type {*} */ ref){
          if(!isStr(ref)) { bad('field "' + field + '" entries must be part ids'); return; }
          if(!ctx.has(ref)) bad('field "' + field + '" references unknown part "' + ref + '"');
        });
        break;
      case 'sizes':
        if(!isObj(v)) { bad('sizes must be an object of sizeName -> {seatTubeLen?, maxInsert?}'); break; }
        Object.keys(v).forEach(function(name){
          var sv = v[name];
          if(!isObj(sv)){ bad('sizes["' + name + '"] must be an object'); return; }
          Object.keys(sv).forEach(function(k){
            if(k !== 'seatTubeLen' && k !== 'maxInsert'){ bad('sizes["' + name + '"] unknown key "' + k + '"'); return; }
            if(!(isNum(sv[k]) && sv[k] > 0)) bad('sizes["' + name + '"].' + k + ' must be a positive number (mm)');
          });
        });
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

  // cross-rule: an OEM-only shock must name the frame(s) it ships with
  if(p.cat === 'shock' && p.oemOnly === true && (!Array.isArray(p.forFrames) || p.forFrames.length === 0))
    bad('oemOnly shock must set forFrames');

  // cross-rule: minCog drives a real freehub constraint (10T needs XD/
  // MicroSpline; the HG spline floor is 11T - why NX tops out at 11-50).
  // NARROW EXCEPTION: SRAM's XS-1270 (Eagle 70 Transmission, CS-XS-1270-A1)
  // is a confirmed real counter-example - it integrates the 10T cog+lockring
  // into the driver interface itself, fitting an 8/9/10-speed HG-style
  // splined body directly (an 11-speed HG body needs a 1.85mm spacer) -
  // sram.com model page CS-XS-1270-A1, fetched 2026-07-08. Allowlisted by
  // mfgPn rather than relaxing the floor generally: every other HG cassette
  // in the real market still needs 11T+.
  if(p.cat === 'cassette'){
    if(isNum(p.minCog) && isNum(p.maxCog) && p.minCog >= p.maxCog) bad('minCog must be smaller than maxCog');
    var hgTenTException = p.mfgPn === 'CS-XS-1270-A1';
    if(p.freehub === 'HG' && isNum(p.minCog) && p.minCog < 11 && !hgTenTException) bad('HG freehub floor is an 11T cog (a 10T cassette needs XD or MicroSpline)');
    // cross-rule: 'integrated' marks a WHEEL/HUB whose driver is a built-in
    // cassette (e*thirteen LG1r DH) - a separate cassette row carrying it is
    // nonsense data (there is no such mount to buy a cassette for).
    if(p.freehub === 'integrated') bad('freehub integrated is a wheel/hub-side value (the driver IS the cassette) - a cassette row cannot carry it');
  }

  // cross-rule (engine-critical review C4, 2026-07-12): a HARD fork-travel
  // range is an engine ERROR, so it must rest on a published statement -
  // forkTravelHard:true requires the maker floor it hardens (minForkTravel)
  // AND a source URL on the row. This encodes the review's invariant after
  // one frame was found carrying a hard-error range with no source at all.
  if(p.cat === 'frame' && p.forkTravelHard === true){
    if(!isNum(p.minForkTravel)) bad('forkTravelHard:true requires a maker-published minForkTravel');
    if(!isStr(p.source)) bad('forkTravelHard:true requires a source URL (a hard travel red must cite its statement)');
  }

  // cross-rule: the suspension discriminator gates the frame's shock block
  if(p.cat === 'frame'){
    var shockBlock = ['shockEye', 'shockStroke', 'shockMount', 'travel'];
    if(p.suspension === 'full'){
      shockBlock.forEach(function(f){ if(!(f in p) || p[f] == null) bad('full-suspension frame is missing "' + f + '"'); });
    }
    if(p.suspension === 'hardtail'){
      shockBlock.forEach(function(f){ if(f in p && p[f] != null) bad('hardtail frame must not carry "' + f + '"'); });
      if(p.bundledShock != null) bad('hardtail frame cannot bundle a shock');
    }
  }

  // cross-rule: a headset's declared steerer acceptance must agree with its
  // S.H.I.S. codes' steerer-side suffixes (the number after the slash IS the
  // steerer interface at that assembly: 28.6 = 1-1/8in steerer OD at the
  // upper bearing; 40 = the 1.5in crown race seat of a tapered fork; 30 =
  // the 1-1/8in crown race seat of a straight steerer). A contradiction is a
  // typo'd row that would ship a wrong rule-20 verdict.
  if(p.cat === 'headset' && isStr(p.upper) && isStr(p.lower)){
    if(p.steerer === 'tapered'){
      if(!/\/28\.6$/.test(p.upper)) bad('tapered headset needs a /28.6 upper assembly, got "' + p.upper + '"');
      if(!/\/40$/.test(p.lower)) bad('tapered headset needs a /40 lower assembly (1.5in crown race), got "' + p.lower + '"');
    }
    if(p.steerer === 'straight-dc'){
      if(!/\/28\.6$/.test(p.upper)) bad('straight-dc headset needs a /28.6 upper assembly, got "' + p.upper + '"');
      if(!/\/30$/.test(p.lower)) bad('straight-dc headset needs a /30 lower assembly (1-1/8in crown race), got "' + p.lower + '"');
    }
  }

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

  // an OEM-only shock must point back to frames that actually bundle it (bidirectional)
  C.PARTS.filter(function(p){ return p.cat === 'shock' && p.oemOnly; }).forEach(function(s){
    (Array.isArray(s.forFrames) ? s.forFrames : []).forEach(function(/** @type {*} */ fid){
      var f = C.PARTS.filter(function(x){ return x.id === fid; })[0];
      if(!f || f.cat !== 'frame'){ problems.push('[' + s.id + '] oemOnly forFrames entry "' + fid + '" is not a frame'); return; }
      if(f.bundledShock !== s.id) problems.push('[' + s.id + '] oemOnly shock is not referenced by ' + f.id + '.bundledShock (bidirectional link broken)');
    });
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

/* KNOWN_VALUES: free-number fields deliberately stay numbers (a brand-new real
   standard must never block entry), but a typo'd size must never ship silently
   either - so unknown values WARN instead of failing (DATA-MODEL-REVIEW
   5.1-17). Extend the list when a new real standard is sourced. */
/** @type {Object.<string, number[]>} */
var KNOWN_VALUES = {
  rotorSize:    [140, 160, 180, 183, 200, 203, 205, 220, 223],
  postDiameter: [27.2, 30.9, 31.6, 34.9],       // seat tubes + dropper diameters
  barClamp:     [25.4, 31.8, 35],
  speeds:       [7, 9, 10, 11, 12, 13]   // 7 = SRAM DH groups (XG-795 etc.), sourced 2026-07-08
};

/* Non-fatal lints - consistency warnings that should never block data entry
   mid-batch. validate.js prints them without failing; the test suite keeps the
   SHIPPED catalog lint-clean (test-ids.js). */
/** @param {Catalog} C @returns {string[]} */
function lintCatalog(C){
  /** @type {string[]} */ var warnings = [];
  /** @param {*} p @param {string} field @param {number[]} list */
  function known(p, field, list){
    var v = p[field];
    if(isNum(v) && list.indexOf(v) < 0)
      warnings.push('[' + p.id + '] ' + field + ' ' + v + ' is not a known value (typo?) - known: ' + list.join(', '));
  }
  /** @type {Object.<string, any[]>} */ var famGroups = {};
  C.PARTS.forEach(function(p){
    if(!isStr(p.id) || !ID_RE.test(p.id)) return; // the hard validator already complains
    var toks = p.id.split('-');
    if(toks.length >= 2 && toks[1] !== brandSlug(p.brand))
      warnings.push('[' + p.id + '] id brand token "' + toks[1] + '" is not the brand slug "' + brandSlug(p.brand) + '" (brand: ' + p.brand + ')');
    if(typeof p.family === 'string' && p.family.split('-')[0] !== brandSlug(p.brand))
      warnings.push('[' + p.id + '] family "' + p.family + '" does not start with the brand slug "' + brandSlug(p.brand) + '"');

    // free-number typo guards
    if(p.cat === 'rotor') known(p, 'size', KNOWN_VALUES.rotorSize);
    if(p.cat === 'dropper') known(p, 'diameter', KNOWN_VALUES.postDiameter);
    if(p.cat === 'frame') known(p, 'seatTube', KNOWN_VALUES.postDiameter);
    if(p.cat === 'handlebar' || p.cat === 'stem') known(p, 'clamp', KNOWN_VALUES.barClamp);
    if(['shifter','derailleur','cassette','chain','crankset'].indexOf(p.cat) >= 0) known(p, 'speeds', KNOWN_VALUES.speeds);

    if(typeof p.family === 'string') (famGroups[p.cat + '|' + p.family] = famGroups[p.cat + '|' + p.family] || []).push(p);
  });

  // sibling-differ: two same-category rows sharing a family must differ in at
  // least one field besides the id - otherwise one is a copy-paste duplicate
  Object.keys(famGroups).forEach(function(key){
    var group = famGroups[key];
    for(var i = 0; i < group.length; i++){
      for(var j = i + 1; j < group.length; j++){
        var a = Object.assign({}, group[i]), b = Object.assign({}, group[j]);
        delete a.id; delete b.id;
        if(JSON.stringify(a) === JSON.stringify(b))
          warnings.push('[' + group[i].id + '] and [' + group[j].id + '] are identical apart from their ids (duplicate SKU?)');
      }
    }
  });

  // wheelset fills should agree on wheel size and brand (a mixed kit is
  // almost always a fills typo; a future deliberate mullet kit can revisit)
  C.PARTS.filter(function(p){ return p.cat === 'wheelset' && isObj(p.fills); }).forEach(function(p){
    var parts = Object.keys(p.fills).map(function(slot){
      return C.PARTS.filter(function(x){ return x.id === p.fills[slot]; })[0];
    }).filter(Boolean);
    var sizes = parts.map(function(w){ return w.wheel; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    var brands = parts.map(function(w){ return w.brand; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(sizes.length > 1) warnings.push('[' + p.id + '] wheelset fills mix wheel sizes: ' + sizes.join(', '));
    if(brands.length > 1) warnings.push('[' + p.id + '] wheelset fills mix brands: ' + brands.join(', '));
  });

  return warnings;
}

if(typeof module !== 'undefined' && module.exports){
  module.exports = { VOCAB:VOCAB, SCHEMA:SCHEMA, PRESET_CATS:PRESET_CATS, ID_PREFIX:ID_PREFIX,
    brandSlug:brandSlug, lintCatalog:lintCatalog,
    validatePart:validatePart, validateCatalog:validateCatalog, _ctx:_ctx };
}
