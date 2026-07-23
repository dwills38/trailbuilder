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
/** @typedef {{type: 'number'|'string'|'bool'|'id'|'idArray'|'fills'|'enumArray'|'sizes'|'sizeList'|'sizeChart'|'maxTireByWheel', vocab?: string, optional?: boolean, nullable?: boolean, measures?: string[]}} FieldRule */
/** @typedef {{has: (id: string) => boolean, catOf: (id: string) => string, byId: (id: string) => any, slotCat: Object.<string, string>, today: Date}} Ctx */

/* Canonical vocabularies - the only allowed values for each standard. */
/** @type {Object.<string, string[]>} */
var VOCAB = {
  /* '26' + '24' added 2026-07-13 (DJ/BMX architecture sign-off, data/
     DJ-BMX-COMPAT-ANALYSIS.md section 4-DJ): 26in is the dominant dirt-jump
     size, 24in the junior/park size. Purely additive - no LIVE part declares
     either, so both are inert for the shipped MTB catalog (the DJ dataset in
     data/dirt-jump.js is off-live until Douglas's go-live word). */
  wheel:        ['29', '275', '26', '24'],
  wheelConfig:  ['29', '275', 'mullet', '26', '24'],
  /* Do NOT add a '157DH' value: 12x157 is ONE fitment standard (DH hubs are
     SuperBoost157 - fact-checked, DATA-MODEL-REVIEW section 2); a split would
     create false "won't fit" verdicts. 142x12 is pre-Boost, inert until parts
     carry it. */
  /* '150x12' = the pre-Boost/classic DH rear (Commencal Supreme DH V5 per
     Vital's spec table - 12x150; distinct from SuperBoost157). */
  /* '10x135-bolt' = the classic 10mm bolt-on 135mm-spaced rear of dirt-jump /
     street frames+hubs (DMR, NS, Halo Combat) - added 2026-07-13 with the DJ
     architecture pass, inert until DJ rows go live. The 9/10mm QR variants
     stay OUT pending the mechanic review flagged in DJ-BMX-COMPAT-ANALYSIS.md
     section 4-DJ (never invent a fitment split without a source). */
  /* 'Boost141' = the budget-tier "Boost 141" rear: a legacy 5mm QR skewer
     over Boost-width (141mm) dropout spacing - a genuinely distinct fitment
     from both 148 Boost thru-axle and plain 135mm QR (confirmed real via
     multiple independent sources - trailmech.com's standards guide + mtbr.com
     forum threads on Boost-141 hub conversion; cataloged on entry Trek
     hardtails, cb-grind6-trek-giant-ht 2026-07-16). Added rather than
     conflated into '142x12' (that's a thru-axle, not QR) or 'Boost148'
     (12mm thru-axle, not 5mm QR) - a wrong axle-type conflation would be a
     false "fits" on any thru-axle wheel/hub pairing. */
  /* '135x5-qr' = the classic 5mm-skewer 135mm-spaced quick-release rear -
     the pre-thru-axle legacy standard, still OEM-spec on the cheapest
     hardtails. Confirmed real via FETCHED vitalmtb.com's Trek Marlin 7 Gen 3
     (2026) spec guide: "5mm x 135mm ThruSkew quick release" (Trek's own
     branded name for this classic QR axle). Genuinely different from
     'Boost141' (also QR, but 141mm Boost-repositioned spacing) and from
     '10x135-bolt' (a 10mm BOLT-thru axle, not a 5mm quick-release skewer,
     used on DJ/street frames) - conflating any of these would be a false
     "fits" on a hub/frame pairing. Added cb-grind6-trek-giant-ht 2026-07-16. */
  rearAxle:     ['Boost148', 'SuperBoost157', '142x12', '150x12', '10x135-bolt', 'Boost141', '135x5-qr', '9x135-bolt'],
  // '9x135-bolt' added vocab-tier1 (2026-07-22) — same diameter-x-spacing-bolt naming as
  // the existing 10x135-bolt token, one size down: a 3/8in (9mm) bolt-on solid rear axle,
  // real on the budget Mongoose Fireball SS dirt-jump hardtail (Mongoose's own product
  // page, int.mongoose.com/products/fireball-ss: "Tectonic T1... 9 mm x 135 mm dropout,
  // replaceable hanger" + "Rear Hub Xposure, aluminum, sealed-bearing, 3/8" x 135 mm,
  // 32H, 6-bolt" — corroborated identically across 3 independent listings of the same
  // SKU, closing the "Mongoose Fireball's 9x135 bolt dropout needs a vocab call" flag
  // logged at the hardtail-breadth-2 wave).
  /* 20x110 = the MODERN dual-crown standard, 20x110 BOOST (BoxXer D1, Fox 40
     2025). '20x110-nonboost' = the legacy/standard DH spacing some forks still
     use (Marzocchi Bomber 58 - maker page states "20x110 DH (non-Boost)").
     Same axle dimensions but the Boost variant repositions the rotor/flanges,
     so they are DIFFERENT fitment standards - conflating them would produce
     false "fits" on fork+wheel pairs. And 15x110 Boost110 is a third thing. */
  /* '15x100' = the non-Boost 15mm thru-axle of dirt-jump forks (RockShox Pike
     DJ - fetched sram.com FS-PIKE-DJ-A4 model page, 15x100 Maxle). Added
     2026-07-13 (DJ pass); inert until DJ rows go live. */
  /* '9x100-qr' = the classic 9mm quick-release front axle (non-thru-axle,
     non-Boost) - confirmed real via FETCHED sram.com/en/rockshox/models/
     fs-jdys-tk-a3 (Judy Silver TK), which lists "9mm Quick Release" as a
     distinct axle option alongside "15x110mm BOOST TC Compt" on the same
     model page. Entry-tier hardtails (Trek Marlin/X-Caliber) spec this
     option. Added cb-grind6-trek-giant-ht 2026-07-16 - genuinely different
     from '15x100' (that's a 15mm thru-axle, DJ-fork standard). */
  /* 'lefty-60' = Cannondale's PROPRIETARY single-leg Lefty hub interface, the
     ONE proprietary standard on the modern single-crown Lefty Ocho (schema/
     lefty-vocab-1, 2026-07-22). Sourced from Cannondale's own Lefty Ocho Owner's
     Manual Supplement (134923, cannondale.com/-/media/files/manual-uploads/
     manuals/018_lefty ocho_134923_screen_en.pdf): "Hub Compatibility: Lefty 60"
     - the fork has an INTEGRATED axle/spindle that the front hub bolts onto, so
     a standard thru-axle hub cannot mount and a Lefty hub cannot mount a standard
     fork. CRITICAL maker fact that shapes this token: the Ocho steerer is NOT
     proprietary - it is a standard tapered 1.5"-1-1/8" (same manual: "Steerer:
     Tapered 1.5"-1-1/8"/86mm"; the 2018 Ocho redesign deliberately "ditched the
     proprietary steerer of old in favour of a regular 1-1/2in to 1-1/8in tapered
     steerer", bikeradar.com/bikerumor). So the Lefty's proprietary-ness lives
     ENTIRELY here, at the hub axle - NOT at the steerer (no new steerer token),
     and a Lefty-era Cannondale XC frame (F-Si, Scalpel HT) is a normal tapered-
     headset frame that also accepts standard forks (Cannondale ships some trims
     with a standard 15x110 fork). Rule 2 (front-axle) is exact-match, so this
     token needs ZERO engine change: fork.axle 'lefty-60' vs a standard hub, or a
     standard fork.axle vs a 'lefty-60' hub, both error honestly; Lefty-on-Lefty
     is silent. 'Lefty 60' is the current hub std (60mm flange spacing; Ocho /
     Lefty 2.0 / SuperMax) - distinct from the older 'Lefty 50', which a future
     row would carry as its own token, never conflated. Inert until the Lefty
     rows below reference it. */
  frontAxle:    ['Boost110', '20x110', '20x110-nonboost', '15x100', '9x100-qr', 'lefty-60'],
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
     (never invent a mapping to force a fit). Engine tier (rule 6c,
     2026-07-12, bias-audit finding #2): an XD cassette on an XDR wheel is
     the fix-tier adapter WARNING naming the 1.85mm spacer, per SRAM's own
     driver-body explainer ("XDR driver bodies are compatible with all XD
     cassettes when the cassette is installed with a 1.85mm spacer behind
     it" - fetched sram.com/en/service/articles/sram-xd-and-xdr-driver-body-
     explained), mirroring the CL-on-6-bolt-hub adapter warning; every other
     XDR pairing (MicroSpline/HG cassettes, or an XDR-length cassette on a
     short XD driver) stays the exact-match hard error. */
  /* 'single-speed' (2026-07-13, DJ pass) = a dedicated single-speed driver /
     thread-on cog interface (Halo Combat SS rear etc.) - a wheel/hub-side
     value like 'integrated': no multi-speed cassette mounts on it (rule 6's
     exact-match error covers a picked cassette honestly), and slotRequired
     exempts the cassette slot the same way it does for 'integrated'. A
     cassette row can never carry it (cross-rule below). Inert until DJ rows
     go live. */
  freehub:      ['XD', 'MicroSpline', 'HG', 'integrated', 'XDR', 'single-speed'],   // 'HG' = MTB-length HG spline (a road expansion must SPLIT, not conflate)
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
  /* 'straight' = the classic straight 1-1/8in steerer/head-tube of budget
     single-crown hardtails (Trek Marlin/X-Caliber, confirmed via search
     corroboration across multiple sources agreeing "semi-integrated, 1-1/8in
     steerer" - distinct from 'straight-dc', which is the STOUTER straight
     1.5in steerer of dual-crown DH forks; a straight-dc fork would not fit a
     1-1/8in straight frame, so conflating them risks a false "fits". Added
     cb-grind6-trek-giant-ht 2026-07-16. The rule-20a SHIS cross-rule below
     only branches on 'tapered'/'straight-dc' - 'straight' rows simply omit
     headTubeUpper/Lower (no SHIS code sourced for these budget frames), so
     no new branch is needed; rule 11's exact-match steerer check works for
     any string value unchanged. */
  headset:      ['tapered', 'straight-dc', 'straight'],
  steerer:      ['tapered', 'straight-dc', 'straight'],
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
  frameBb:      ['BSA73', 'PF92', 'T47', 'PF107', 'BSA83', 'BSA68', 'PF865', 'PF3083'],   // BSA68 = the classic 68mm threaded shell (Meta HT V3's own page, 2026-07-08 - hardtails still ship it); PF3083 added grind-7 w1 (2026-07-16) - Cannondale Scalpel/Scalpel HT's own "PF30 83A" press-fit shell, confirmed on both fetched cannondale.com Scalpel HT Carbon 2/3 spec pages
  /* crankBb is the SPINDLE BORE-DIAMETER CLASS, not a brand (DATA-MODEL-REVIEW
     5.1-5): DUB (28.99mm), 24mm (Shimano Hollowtech II + Race Face Cinch steel
     + ...), 30mm (BB30-class: eeWings, Race Face Cinch alu, Hope, Praxis M30),
     p3 (e*thirteen). DUB-Wide is a CHAINLINE, not a new spindle value. The old
     too-narrow vocab (DUB|SH24) forced two fictitious catalog products - never
     again.
     '30mm' STAYS ONE TOKEN, ON PURPOSE (convention audit 2026-07-23,
     schema/cross-bb-spindle-convention): the 30mm spindle is a genuinely
     cross-compatible FAMILY, not one brand's part. Praxis's own M30-THRU BB is
     sold to fit Praxis Lyft, Race Face/Easton CINCH and Rotor Rex 30mm cranks
     interchangeably (praxiscycles.com M30 BB pages / BB Compatibility Guide;
     Wheels Mfg, Chris King ThreadFit30, Kogel sell 30mm BBs as universal to the
     class), so splitting it into m30/bb30/... would fabricate FALSE "won't fit"
     verdicts between parts the makers document as compatible. The two things a
     30mm spindle still depends on live OUTSIDE this token by design: (a) SHELL
     WIDTH - carried by bb.shell matched to frame.bb in rule 7 (a 30mm crank runs
     BSA/PF30/PF92/T47 via the matching-shell BB); (b) chainline - display-only,
     never a compat rule. A crank's spindle LENGTH vs the frame shell width is a
     separate, currently-unmodeled dimension that is UNIFORM across every token
     (DUB and 24mm cranks also come in per-shell lengths and are not length-
     checked either) - see the "spindle length vs shell width" candidate in
     compat.js's coverage roadmap. It is NOT a 30mm dishonesty and a token split
     would not address it. p3 / powerspline / square-taper / 19mm are genuinely
     DISTINCT bore/spline geometries (sourced below) and correctly stay separate
     tokens - rule 7 exact-matches them against 30mm as a true "won't fit". */
  /* 'powerspline' = SRAM/Truvativ's entry-tier splined spindle interface
     (12-spline chromoly spindle, distinct from DUB/24mm/30mm - genuinely
     different bore/spline geometry, not interchangeable). Confirmed real via
     FETCHED sram.com/en/sram/models/fc-sx-1-a1 ("Spindle Interface: DUB,
     Power Spline" - two separate SKUs of the same SX Eagle crank) and
     sram.com/en/truvativ/models/bb-ps-a1 (the matching BB-PS-A1 bottom
     bracket, BSA68/73). Added cb-grind6-trek-giant-ht 2026-07-16 for the
     Trek Marlin 7's OEM SX Eagle Powerspline crank - the budget-tier SX
     Eagle spindle option this catalog didn't carry yet (only the DUB
     variant was cataloged). */
  /* 'square-taper' = the classic JIS square-taper spindle interface, still
     OEM-spec on the cheapest hardtails (Giant Talon: Prowheel Charm crank on
     a Prowheel FP-B902W BB, confirmed via multiple independent retailer/
     forum sources describing FP-B902(W) as "Square Taper" / "JIS Square").
     Genuinely different bore geometry from every other crankBb value here -
     conflating it would be a false "fits". Added cb-grind6-trek-giant-ht
     2026-07-16. INDEPENDENTLY re-confirmed by the cb-grind6-w5-hardtail-r2
     wave the same day via a second real-world case (Shimano CUES
     FC-UT400-1/FC-U4000-1, bike.shimano.com: "CUES square taper chainset,
     for 9/10/11-speed") - two unrelated OEM sources agreeing on the same
     vocab value. */
  /* '19mm' added grind-7 w1 (2026-07-16): the BMX-derived spindle width used
     on DJ-tier 3-piece cranks (Scott Cr-Mo 3-piece on the Voltage YZ 0.1 -
     "Jien-Yuan BB92 / 19mm Axle" per two independent US/UK retailer spec
     sheets, damianharriscycles.co.uk + thebackcountry.com) - a real, distinct
     spindle diameter from the existing 24mm/30mm/DUB values, flagged in
     DIRT-JUMP-MODEL.md's dj-crank.spindle note as a known DJ-market gap. */
  crankBb:      ['DUB', '24mm', '30mm', 'p3', 'powerspline', 'square-taper', '19mm'],
  /* 'FM' = flat mount rear - modern XC frames (2021+ Canyon Exceed per
     BikeRadar: "Canyon has adopted the Flat Mount standard for the rear
     brake caliper"); FM and PM calipers do NOT interchange without adapters.
     'IS' = International Standard, the pre-Post-Mount disc tab: two
     THREADED holes 51mm apart with mounting bolts oriented PARALLEL to the
     axle (through the caliper, into the frame/fork), vs Post Mount's 74.2mm
     bolt spacing screwing in PERPENDICULAR to the axle. Confirmed genuinely
     non-interchangeable without an adapter - added grind-7 w5 (2026-07-17)
     after two independent sources agreed: mtbdirect.com.au ("A Post Mount
     caliper cannot bolt directly onto an IS mount... you will need an IS to
     Post Mount adaptor") and the WebSearch-aggregated bolt-spacing figures
     (51mm IS vs 74.2mm PM) from qualisports.us/mbaction.com/paulcomp.com.
     Unlocks real steel-hardtail/DH-heritage frames (Chromag Doctahawk, Cotic
     BFe/SODA) that ship with a genuine IS rear mount - dropped by four prior
     grind waves for lacking this vocab value. */
  brakeMount:   ['PM', 'FM', 'IS'],
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
                 'shimano-linkglide', 'shimano-11', 'shimano-10', 'shimano-9', 'shimano-8', 'sram-11',
                 'sram-dh-7', 'trp-evo7-dh',
                 'microshift-advent', 'microshift-advent-x', 'microshift-advent-mx', 'microshift-acolyte', 'box-prime-9'],
  /* 'trp-evo7-dh' ADDED grind-7 w2 (2026-07-16, DH trim depth): TRP's own
     narrow-range 7-speed DH group (EVO 7 shifter/derailleur/cassette,
     mfgPn M9070/ABRD000015/CS-M8070, all FETCHED trpcycling.com product
     pages directly) - the stock drivetrain on both current Intense M1 trims.
     Kept a DISTINCT token from 'sram-dh-7' rather than reused: no source
     this session confirms TRP's cable-pull ratio is interchangeable with
     SRAM's DH-7 pull (unlike the e13 LG1 DH cassette, which only reuses
     sram-dh-7 as a cassette-side compatibility bucket - a cassette carries
     no pull-ratio risk, but a shifter+derailleur pair does), so a wrong
     reuse here would risk a false-green cross-brand pairing. Standard HG
     freehub (11-24T, Hyperglide-body per the maker page).
     'shimano-9'/'microshift-acolyte' ADDED grind-7 w2 (2026-07-16, Cannondale/
     Trek/budget follow-ups): the entry-tier Specialized Rockhopper base
     Altus 9-speed group and the Giant Talon 4's microSHIFT Acolyte 8-speed
     group, respectively - see their own completebike rows for sourcing.
     'shimano-8' ADDED grind-7 w1 (2026-07-16, budget-hardtail ladder depth):
     the entry-tier Shimano 8-speed group (SL-M315 shifter / RD-TZ / ESSA
     U2000 derailleur / CS-HG300-8 cassette) that equips the Trek Marlin 4 -
     the bottom rung of the budget hardtail ladders this batch targets.
     Distinct pull ratio from 9/10/11/12-speed Shimano (INERT/equality-checked
     like the other Shimano tiers above), standard HG freehub.
     'shimano-9' ADDED grind-7 w2 (2026-07-16, Rockhopper follow-up): the
     entry Altus-tier 9-speed group (SL-M2000/SL-M370-class RapidFire shifter
     + RD-M2000/RD-M310-class derailleur) that equips the base Specialized
     Rockhopper - a standard-HG, non-LinkGlide 9-speed pull ratio distinct
     from every other cataloged Shimano tier (same INERT/equality-checked
     convention as shimano-8/10/11/12).
     'microshift-acolyte' ADDED grind-7 w2 (2026-07-16, Giant Talon 4
     follow-up): microSHIFT's entry 8-speed group (SL-M6180-R shifter,
     RD-M5185M derailleur, CS-H083 cassette) - a distinct proprietary pull
     ratio from the already-cataloged Advent/Advent X/Advent MX tiers (one
     tier below Advent's 9-speed), standard HG freehub (CS-H083's own
     microshift.com model page states "Standard HG Freehub" verbatim -
     resolves the prior wave's flagged "microSpline HG freehub" contradiction
     on Giant's own retailer-reprinted spec text: an 8-speed cassette with an
     11T-or-higher smallest cog has no mechanical need for MicroSpline's fine
     spline count, and microSHIFT's own page settles it as plain HG). */
  actuation:    ['cable', 'electronic'],       // audited 2026-07: market-complete for shifter/derailleur ('hydraulic' joins only with dropper.actuation)
  ringStd:      ['t-type', 'standard-12'],
  /* I-Spec II / I-Spec B are older, mutually-incompatible Shimano standards
     (Saint/Zee are I-Spec B; M8000-era is I-Spec II - neither mates with EV) */
  shifterClamp: ['ispec-ev', 'ispec-ii', 'ispec-b', 'matchmaker', 'band', 'pod'],
  leverClamp:   ['ispec-ev', 'ispec-ii', 'ispec-b', 'matchmaker'],
  derailMount:  ['hanger', 'udh-direct'],      // audited 2026-07: market-complete (proprietary-hanger frames are udh:false + 'hanger')
  spring:       ['air', 'coil'],               // audited 2026-07: market-complete
  material:     ['alu', 'carbon', 'steel', 'ti',    // steel/ti unblock whole brands (Cotic, Starling, Ti bars/rails)
                 'carbon-alloy'],                    // genuinely mixed carbon+alloy frame construction, not a hedge for "unknown" (Frameworks' alloy-front/carbon-rear; Devinci Wilson + GT Force/Sensor Carbon = carbon-front/alloy-rear). POLICY (Douglas 2026-07-14): reputable editorial confirmation of the mixed construction promotes to 'carbon-alloy' even when the maker's own page only says "Carbon" - same third-party-fact basis as the measured-weight exception. (Atherton's S-Series is aluminium tube+lug = 'alu', NOT carbon-alloy - that was a corrected mislabel.)
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
  headTube:     ['ZS44/28.6', 'ZS56/28.6', 'ZS56/40', 'IS41/28.6', 'IS42/28.6', 'IS52/40', 'EC34/28.6', 'EC44/40', 'ZS49/28.6', 'EC49/40', 'ZS51/28.6', 'ZS59/40', 'ZS56/30'],   // ZS49/28.6 + EC49/40 added 2026-07-11 (expand/finishing-kit): fetched Chris King InSet 5 + Cane Creek 40/110, auditor-confirmed. ZS51/28.6 + ZS59/40 added grind-7 w4 (2026-07-17): fetched polygonbikes.com/us/2026-collosus-t8-trail-mtb/ directly, which states "Headset: FSA NO.76 (ZS 51/28.6 | ZS 59/40)" verbatim on the frame's own spec page - an FSA No.76 assembly with an oversized 51mm upper / 59mm lower bore (a real, if uncommon, S.H.I.S. pair used on some OE frames beyond the common ZS44/ZS56 sizes). ZS56/30 added same session: fetched polygonbikes.com/us/collosus-dh9/ directly, "Headset: FSA NO.55/57-1, ZS 56/28.6 | ZS 56/30" verbatim - the first real straight-steerer (non-tapered, 30mm crown-race-seat) lower bore this catalog has sourced, anticipated by this vocab's own comment above; pairs with a straight-1.5in-steerer DH fork (Fox 40), distinct from the tapered ZS56/40 lower used elsewhere in this catalog.
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
                 'grid-trail', 'grid-gravity', 'grid', 'control',  // Specialized (2026-07-08; specialized.com is 403-blocked for WebFetch, sourced via bikeradar/jensonusa/retailer aggregation. 'grid'/'control' ADDED 2026-07-15 (catalog/cb200-specialized) - Specialized's own two other named casing tiers (GRID = the mid-weight trail casing above plain Control, distinct from the reinforced GRID TRAIL/GRID GRAVITY already cataloged; Control = the lightest XC casing), FETCHED bikeradar.com tyre reviews naming both tiers verbatim)
                 'trc', 'grc', 'xcc',                              // Onza (2026-07-08, fetched onza-tires.com SKU tables; TRC=Trail Ready Casing, GRC=Gravity Ready Casing, XCC=XC Casing)
                 'enduro-core', 'synthesis', 'gravity-core', 'gxe-core', 'dh-core', 'wire-bead', 'folding-tlr',  // Vee Tire Co (2026-07-08, fetched veetireco.de SKU tables - Vee's own regional storefront; wire-bead/folding-tlr are Crown Gem's bead-construction axis, the table's own "Casing" column)
                 'inner-strength', 'core-strength', 'pro-xr', 'downhill-strength',  // Bontrager (2026-07-08 inner/core-strength via bikerumor; 'pro-xr' ADDED mtb-tail-8 2026-07-21, fetched trekbikes.com/.../bontrager-brevard-pro-xr-tlr-mtb-tire/p/44576/ directly via the browser pane - the new Brevard/Gunnison/Montrose/Sainte-Anne naming wave's "Pro XR" 60TPI construction tier, printed verbatim in the page's Specs table's Casing field; 'downhill-strength' ADDED mtb-tail-9 2026-07-21, fetched trekbikes.com's G5 Team Issue page directly - the DH-tier casing name printed verbatim in the Specs table's Casing field for the 29in SKU (the 27.5in point has no named casing on the same page, left unset there))
                 'high-output', 'super-tough',                     // Panaracer (tire-breadth-3, 2026-07-08/09, fetched panaracer.com + panaracerusa.com: "HO"/"ST" are the maker's OWN tier abbreviations printed on the tire/product name itself, e.g. "Aliso HO", "Romero ST")
                 'durable', 'ultra-durable', 'light-and-supple', 'light-trail',  // Teravail (tire-breadth-3; fetched teravail.com casing-tier names - Ultra Durable adds a 1/2-ply of 120tpi + apex wedges over Durable). 'light-trail' ADDED 2026-07-15 (complete-bikes grind) for the Drawpoint/Camrock XC tires' own "Light Trail" 120TPI casing tier, fetched teravail.com/products/drawpoint-tire + /camrock-tire directly - genuinely distinct from the trail/enduro-tier 'light-and-supple' name (a different Teravail product line), not a duplicate
                 'tough',                                          // Terrene (tire-breadth-3, fetched terrenetires.com/pages/tech - Terrene's own casing-tier name; the lighter 'Light' tier exists but no row here uses it)
                 'tr', 'emc',                                       // Kenda Havok Pro (tire-breadth-3, fetched bicycle.kendatire.com spec table - the sheet's own "Protection" column values: TR = plain tubeless-ready folding, EMC = e-MTB-certified reinforced folding; a third Wire/non-tubeless config exists but isn't catalogued (no distinct casing name, just "Wire" bead))
                 'eps', 'eps-tlr', 'exo-btb',                        // CST BFT (verify-tires-tail, 2026-07-10, fetched shop.csttires.com/products/bft-1 spec table - its own "Technology" column, distinct from the Bead-type axis: EPS = Exceptional Puncture Safety, EPS/TLR = EPS + Tubeless Ready, EXO-BTB = the 2.6in SKU's own bead-to-bead reinforcement tag)
                 'flux-gr', 'flux-am', 'flux-gr-radial',           // e*thirteen (expand/tires-new-brands, 2026-07-11, fetched ethirteen.com/products/*.js Shopify variant JSON - Flux GR = the Grappler line's gravity/enduro casing, Flux AM = the all-mountain/trail casing, Flux GR Radial = the radial-construction Grappler Radial's own casing name)
                 'hardskin', 'sideskin',                            // Hutchinson (expand/tires-new-brands, 2026-07-11, fetched cycling.hutchinson.com product pages - the sheet's own "Reinforcement" column values; a third unnamed dual-66TPI DH casing and a plain unreinforced tier exist on some rows but print no brand name there, so they're left uncatalogued per the never-invent-a-name rule)
                 'gravity-pro',                                     // Schwalbe Albert Radial (enduro-trail-gap-fill, 2026-07-11, fetched schwalbetires.com SKU pages - the "Version" field on Schwalbe's new radial-carcass generation; distinct from the older bias-ply Super Trail/Super Gravity/Super Downhill tiers, which stay in production on other models)
                 'trail-pro',                                       // Schwalbe Magic Mary Radial / Albert Radial (catalog-complete-bikes-grind-2-commencal + -propain, 2026-07-15, both Commencal's Clash V3 and Propain builds name "Trail Pro" as a lighter sibling of 'gravity-pro' in Schwalbe's new radial-carcass generation, confirmed as a real distinct Schwalbe tier name via schwalbetires.com SKU listings (e.g. article 11654597, "TRAIL PRO"))
                 'ksct',                                            // Kenda Small Block Eight / Honey Badger (expand/tires-xc, 2026-07-11, fetched bicycle.kendatire.com spec tables - the sheet's own "Protection" column value for these two models, distinct from Havok Pro's TR/EMC and Nevegal2's ATC; DTC compound is shared/reused)
                 'xc-pro',                                           // Schwalbe Rick (cb7-w3-scott-ghost-cube-rose, 2026-07-16, fetched schwalbetires.com/Rick-11654568 directly - the page's own "Version" field, distinct from the older bias-ply Super Race XC casing; a newer Schwalbe XC-race tier name)
                 'bikepark'],                                        // Schwalbe Magic Mary / Big Betty DH-tier (cb7-w3-scott-ghost-cube-rose, 2026-07-16, fetched schwalbetires.com/Magic-Mary-11100977.02 + /Big-Betty-11159151 directly - the page's own "Version" field for the wire-bead DH/bike-park casing tier, distinct from the folding-bead Super Trail/Super Gravity tiers already cataloged)
  compound:     ['dual', '3c-maxxterra', '3c-maxxgrip', 'maxxspeed', 'maxxterra', '3c-maxxspeed',   // Maxxis (maxxspeed = XC race compound, Aspen page 2026-07-08; bare 'maxxterra'/'3c-maxxspeed' are genuinely distinct SKUs from their 3C/plain siblings per the fetched maxxis.com Rekon/Forekaster/Ikon tables, 2026-07-08)
                 'endurance', 'soft', 'supersoft', 'blackchili',   // Continental (blackchili = the XC line's compound, 2026-07-08)
                 'addix', 'addix-speed', 'addix-speedgrip', 'addix-soft', 'addix-ultra-soft', 'addix-performance',        // Schwalbe (addix-speed = XC race compound, fetched 2026-07-08; addix-performance = the BikePark-casing DH tier's compound, cb7-w3-scott-ghost-cube-rose 2026-07-16, fetched schwalbetires.com Magic Mary/Big Betty pages directly)
                 'smartgrip', 'smartgrip-gravity',                 // Pirelli
                 '4c-graphene', 'graphene-silica',                 // Vittoria (casing reuses trail/enduro/downhill - Vittoria's own tier names; graphene-silica = the XC Race Formulation, 2026-07-08)
                 'tritec',                                         // WTB
                 'dual-layer',                                     // Kenda
                 'grip3s', 'grip3',                                // Goodyear (Grip3S = softer FRONT/MTF compound; Grip3 = harder REAR/MTR compound - a genuine F/R split per goodyearbike.com)
                 'magix', 'magix-mh', 'magix-ms', 'magix-dh',      // Michelin (2026-07-08; Magi-X base compound name + MH/MS hardness tiers + the DH-specific "Magi-X DH Compound"; retailer/press-aggregated, michelinman.com unfetchable)
                 'gripton-t7', 'gripton-t9', 'gripton-t5',         // Specialized (2026-07-08; GRIPTON T7/T9 compound tiers, retailer-aggregated. 'gripton-t5' ADDED 2026-07-15 (catalog/cb200-specialized) - the fastest-rolling XC tier, below T7, per the fetched bikeradar.com Ground Control review + Specialized's own product-page titles surfaced in search ("Renegade Control 2Bliss Ready T5"))
                 'soft-50', 'medium-60', 'single-60a',             // Onza (2026-07-08, fetched onza-tires.com - the maker's own "Soft 50"/"Medium Compound 60"/"Single 60a" durometer-named compounds)
                 'tackee', 'top40', 'mpc', 'dcc',                  // Vee Tire Co (2026-07-08, fetched veetireco.de - Tackee dual-compound, TOP40 gravity-race compound, Crown Gem's MPC/DCC compounds)
                 'tm-speed', 'tm-grip',                            // Bontrager (2026-07-08; TM-Speed/TM-Grip proprietary compounds, bikerumor-aggregated)
                 'triple-compound', 'zsg-natural',                 // Panaracer (tire-breadth-3, fetched panaracer.com spec tables - Triple Compound is the current Aliso/Romero/DriverPro tech; ZSG Natural is DriverPro's older/narrower-size compound, also used on the legacy Rampage)
                 'grip', 'grip-plus', 'fast',                      // Teravail (tire-breadth-3, fetched teravail.com - the maker's own "Grip"/"Grip Plus" compound names; 'fast' ADDED 2026-07-15 (complete-bikes grind, catalog/complete-bikes-grind-2-kona-salsa-gt-mondraker) for the Camrock tire's own "Fast" compound, fetched teravail.com/products/camrock-tire directly ("provides low resistance for a fast-rolling tire") - a genuinely distinct, maker-named third compound tier, not a guess)
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
  discipline:   ['xc', 'trail', 'enduro', 'dh', 'dj'],   // 'dj' = dirt jump (2026-07-13, DJ pass) - annotation only, like every discipline value
  suspension:   ['full', 'hardtail'],
  /* seatpostDefault (unify-seatpost, 2026-07-14): the OPTIONAL per-frame override
     for which post the unified Seatpost rail opens on. Absent = the discipline
     heuristic (defaultSeatpostCat in compat.js): dropper for most bikes, rigid
     for DH/DJ frames. Set it only for the "few excluded" edge cases that break
     from their discipline's norm. UI + share-link tie-break ONLY — NEVER feeds
     checkBuild or completeness (slotRequired), same annotation contract as
     disciplines/material. */
  seatpostDefault: ['dropper', 'rigid'],
  /* ---- Single-speed / dirt-jump vocab (2026-07-13, Douglas's DJ/BMX
     architecture sign-off - data/DJ-BMX-COMPAT-ANALYSIS.md sections 1c + 4-DJ).
     driveMode: the MECHANICAL drivetrain discriminator (decision 2026-07-13:
     driveMode, not a marketing bikeType enum). 'single-speed' on a frame =
     the frame is a single-speed build (no derailleur drivetrain) -
     slotRequired() drops the shifter/derailleur/cassette slots (and, per the
     brakeless decision, the brake/rotor slots) exactly like the
     hardtail-shock pattern. ABSENCE = geared: zero effect on every existing
     catalog row and verdict. Never a marketing category - a single-speed
     trail hardtail is a real thing and would carry it honestly.
     chainWidth: the single-speed width class shared by ring, cog and chain -
     1/8in (BMX-derived, the DJ default) vs 3/32in (derailleur-width). Feeds
     rule ss-chain-width (a WARNING - severity confirmed by DRV-68, KMC's
     manufacturer width-class tier: it turns but runs poorly).
     dropoutType: how a single-speed tensions its chain (analysis-doc rule
     DJ-2). Only 'vertical' feeds a verdict (the ss-tension INFO: a vertical
     dropout run single-speed needs a tensioner / half-link); the
     horizontal-vs-sliding split is verdict-neutral. */
  driveMode:    ['single-speed'],
  chainWidth:   ['1/8', '3/32'],
  dropoutType:  ['horizontal', 'sliding', 'ecc-bb', 'vertical'],
  /* Provenance policy (DATA-MODEL-REVIEW 5.1-13, decided 2026-07): absent =
     manufacturer. 'measured' = a reputable third-party MEASURED figure and is
     accepted for WEIGHT ONLY (interfaces stay manufacturer-sourced; the
     measured URL goes in weightSource) - this is what makes the rotor
     category verifiable at all (SRAM publishes no rotor weights).
     'retailer' exists so below-the-bar provenance can be stated honestly -
     the validator REJECTS it on verified rows. */
  sourceType:   ['manufacturer', 'manufacturer-doc', 'measured', 'retailer'],
  /* PRICE PROVENANCE (Douglas's ruling 2026-07-22: "make it so verified means
     the pricing was verified too"). `verified:true` historically only ever
     asserted the SPEC was checked against the maker - the price could still be
     a sample figure, which is exactly the overclaim this field closes.

     ABSENT = the price is a SAMPLE figure (the honest default, and still the
     state of most verified rows until the backfill grinds run). Present = a
     positive, disclosed claim about where the number came from, so the field
     may ONLY appear on a verified row (cross-rule below).

     'msrp-confirmed'         the norm: the maker's own US MSRP, read off the
                              same fetched page the spec was verified against.
     The remaining five are the DISCLOSED EXCEPTION classes - a real price that
     honestly is not a current maker MSRP. Each exists because the alternative
     is either a silent overclaim or dropping a real part from the catalog:
     'discontinued-no-msrp'   the maker no longer publishes a price for it.
     'oe-only-no-msrp'        OE/OEM-only part, never sold at a consumer MSRP.
     'regional-conversion'    the maker publishes a non-USD price only; the USD
                              figure is a disclosed conversion, not a US MSRP.
     'bundle-split-estimate'  the ratified shift-brake exception's shape: the
                              maker prices only the combined SKU, so a
                              single-side row carries a split estimate.
     'third-party-listed'     current product; the maker publishes no price
                              anywhere; the stored figure is a disclosed
                              third-party listing/estimate - distinct from
                              discontinued-no-msrp (lifecycle-ended) and
                              regional-conversion (a maker price exists, just
                              not in USD).
     'pair-split-estimate'    WHEEL-ONLY (frontwheel/rearwheel and their road/
                              gravel/BMX equivalents - cross-rule below rejects
                              it on any other category): the maker publishes
                              only a per-PAIR MSRP for the wheelset, never a
                              per-wheel price, so each wheel-slot row carries a
                              split of that confirmed pair figure - even
                              unless the maker itemizes front vs rear
                              (Douglas's ruling 2026-07-22, "split the price").
                              Distinct from bundle-split-estimate (a combined
                              SKU split across DIFFERENT slots, e.g. a shift-
                              brake lever) - this is the SAME-category front/
                              rear pair case.
     'deprioritized-no-price-source' NOT a disclosed price like the six above -
                              the stored price is still a SAMPLE figure. Marks a
                              verified row whose only source is a maker SPEC page
                              that structurally never carries a price (Shimano/
                              SRAM/Zipp/Campagnolo component pages, etc.), so
                              re-fetching that same page on every priceBasis
                              burndown wave is pointless. `priceBasisAudit()`
                              only counts null as "missing", so this value pulls
                              the row out of the burndown counter without
                              claiming a real price basis; a future wave that
                              finds a price-bearing source (retailer/OE listing)
                              should overwrite it with a real class above
                              (Douglas's ruling 2026-07-23, "deprioritize them").
     NEVER feeds checkBuild - price provenance is display/annotation only, the
     same contract as `disciplines` (see PRICE_BASIS_STRICT below for the
     staged rollout). */
  priceBasis:   ['msrp-confirmed', 'discontinued-no-msrp', 'oe-only-no-msrp',
                 'regional-conversion', 'bundle-split-estimate', 'third-party-listed',
                 'pair-split-estimate', 'deprioritized-no-price-source'],
  status:       ['current', 'discontinued', 'recalled'],   // absent = current
  soldWithout:  ['battery', 'charger', 'spring', 'rotor', 'mounting-hardware'],

  /* ============================================================================
     RIDER KIT vocab (Kit Builder, 2026-07-14 - Douglas's decisions in
     KIT-BUILDER-SCOPE.md's "Decisions - DECIDED" section). All ADDITIVE and INERT
     for the bike catalog: no bike part references any of these, exactly the way
     the DJ vocab landed inert. Kit NEVER feeds checkBuild (decisions #3 + #4) -
     these are filter / badge / annotation values only, the same contract as
     `disciplines`. `discipline` above is reused verbatim to tag kit (a DH
     full-face, XC-weight gloves). Kit lives in its own catalog (src/kit.js's
     KIT_PARTS), never in compat.js's PARTS. */
  helmetType:   ['half-shell', 'full-face', 'convertible'],   // convertible = removable chin bar
  /* the shoe's PRIMARY differentiator (decision #3, replacing the scoped-but-
     rejected cleat<->pedal bridge): flat sole vs clipless (2-bolt SPD recess).
     Deliberately NOT wired to pedal.style - kit has ZERO connection to checkBuild. */
  soleType:     ['flat', 'clipless'],
  shoeClosure:  ['lace', 'boa', 'velcro', 'ratchet'],         // secondary shoe axis (annotation)
  eyewearType:  ['glasses', 'goggles'],                       // eyewear covers BOTH via this type (decision #1)
  sleeve:       ['short', 'long'],                            // jersey sleeve length (annotation)
  armorCoverage:['back', 'chest', 'chest-back'],              // body-armor coverage
  /* protectionCert = REAL published safety standards ONLY, enumerated like the
     tire `casing` vocab (never invented). A cross-rule (KIT_CERTS below) restricts
     which tokens each category may carry - a jersey can't be "EN 1621-2", a helmet
     can't carry a back-protector cert. Because a cert is a SAFETY claim, it follows
     the strict fetched-source tier even on otherwise-sample rows (decision #7): you
     may enter an unverified sample jersey, but never assert a cert without a real
     maker/standards source. A false safety claim is worse than a missing one. */
  protectionCert: ['cpsc', 'en1078', 'astm-f1952',            // helmet impact standards (US / EU / DH full-face)
                   'ansi-z87', 'en166',                       // eyewear impact standards (occasional)
                   'en1621-1-l1', 'en1621-1-l2',              // EN 1621-1 limb protector L1/L2 (knee / elbow / shin)
                   'en1621-2-l1', 'en1621-2-l2', 'en1621-3'], // body armor: EN 1621-2 back (L1/L2) + EN 1621-3 chest
  /* rotational = a helmet's rotational-impact-management system. A DIFFERENT axis
     from the pass/fail impact certs above (a helmet can be both CPSC-certified AND
     MIPS-equipped), so it is its OWN field, not a `certs` token. SEEDED pending an
     [EXPERT REVIEW] confirm of the genuinely-distinct systems (decision #7).
     ABSENCE = UNKNOWN, never defaulted to "none" - asserting a helmet has no
     rotational system is itself a claim. Extend as sourced. */
  rotational:   ['mips', 'wavecel', 'spin', '360-turbine', 'koroyd', 'rheon'],
  fitCut:       ['mens', 'womens', 'unisex']                  // optional fit annotation / filter (decision #8; absence = unspecified)
};

/* Cert tokens each kit category may carry (the cross-rule below enforces it).
   NECK BRACE maps to an EMPTY set on purpose: there is no universal neck-brace
   impact standard (§2a: "maker-specific, no single standard"), so the `certs`
   field EXISTS (Douglas lists neck braces as a cert category) but stays DORMANT
   until a real standard token is sourced and added here - never fabricate one. */
/** @type {Object.<string, string[]>} */
var KIT_CERTS = {
  helmet:    ['cpsc', 'en1078', 'astm-f1952'],
  eyewear:   ['ansi-z87', 'en166'],
  kneepad:   ['en1621-1-l1', 'en1621-1-l2'],
  elbowpad:  ['en1621-1-l1', 'en1621-1-l2'],
  shinguard: ['en1621-1-l1', 'en1621-1-l2'],
  bodyarmor: ['en1621-2-l1', 'en1621-2-l2', 'en1621-3'],
  neckbrace: []
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
    /* driveMode + dropoutType (2026-07-13 DJ pass - see the VOCAB block):
       both optional, both dormant - no live row carries either. driveMode
       absence = geared (the universal default); dropoutType only feeds the
       ss-tension info when 'vertical' AND the frame is single-speed. */
    driveMode:{type:'string',vocab:'driveMode',optional:true},
    dropoutType:{type:'string',vocab:'dropoutType',optional:true},
    /* defaultSeatpost (unify-seatpost, 2026-07-14): optional per-frame override
       for the unified Seatpost rail's default sub-chip - see the seatpostDefault
       VOCAB note. Dormant until set; the discipline heuristic covers DH/DJ. */
    defaultSeatpost:{type:'string',vocab:'seatpostDefault',optional:true},
    /* noStockDropper: REMOVED 2026-07-22 (Douglas: "every bike requires some
       post and DH bikes often have rigid posts"). The flag's only job was to
       exempt a frame's seat position from completeness; that exemption was
       retired in slotRequired() when every bike became required to carry some
       post (a rigid one satisfies the seat position via positionPeersOf). The
       field had no other reader, so it was deleted from the schema, the Part
       type, and all 21 frame rows that carried it. The frames still SHIP rigid
       posts in the real world - that fact now lives where it belongs, in each
       bike's actual cataloged seatpost fill, not a dropper-negating flag. */
    udh:{type:'bool'}, udhRetrofitKit:{type:'string',optional:true}, frameOnly:{type:'bool'}, maxTire:{type:'number',optional:true},
    /* maxTireByWheel (2026-07-23, rule-18 wheel-size fix): a frame officially
       rated for two wheel sizes with DIFFERENT tire limits (Surly Karate Monkey:
       27.5x3.0 OR 29x2.5) needs a per-wheel-size max, not one scalar - a single
       `maxTire` fires a FALSE too-wide warning on the maker-approved fat setup.
       Optional map wheelSize (wheel vocab) -> max width (in). Mirrors the GRAVEL
       engine's maxTireByWheel. When present, rule 18 consults it by the build's
       rear wheel size and falls back to the scalar `maxTire` only when a frame
       carries no map (backward-compat - every existing frame keeps working). */
    maxTireByWheel:{type:'maxTireByWheel',optional:true},
    headTubeUpper:{type:'string',vocab:'headTube',optional:true}, headTubeLower:{type:'string',vocab:'headTube',optional:true},
    /* material (Douglas 2026-07-14): the frame's construction material - a
       FILTER/ANNOTATION field ONLY, same contract as disciplines: it must
       NEVER feed checkBuild (material never changes what bolts to what; the
       structural facts are the real interface fields). Absence = unknown.
       Set only when the row's specific trim is unambiguous - many models
       sell both carbon and alloy variants, and absent beats guessed. */
    material:{type:'string',vocab:'material',optional:true},
    bundledShock:{type:'id',optional:true,nullable:true},
    /* per-size data lives in a sub-object, NOT variant rows (sizes share price/
       interfaces; review section 3 item 6). Keys are the maker's own size names
       (S-XXL, S1-S6, ...) - deliberately a free string, not a vocab. */
    sizes:{type:'sizes',optional:true}
  },
  fork: {
    wheel:{type:'string',vocab:'wheel'}, travel:{type:'number'}, axle:{type:'string',vocab:'frontAxle'},
    steerer:{type:'string',vocab:'steerer'}, brakeMount:{type:'string',vocab:'brakeMount'},
    /* optional since 2026-07-21 (fix/rotor-reclass-1, mechanic BRK-51): a fork whose only
       sourced brake-mount fact is its NATIVE post-mount size (minRotorF) may have no
       maker-published ceiling at all - encoding a guessed maxRotorF is worse than leaving
       rule 10 dormant (DATA-ENTRY-TEMPLATE.md §5a claim-class guard). */
    maxRotorF:{type:'number',optional:true},
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
  /* chain: a chain is EITHER geared (system + speeds, the original shape) OR
     single-speed (chainWidth - 1/8in or 3/32in; optional halfLink). The two
     identities are enforced by a cross-rule below, so existing geared rows
     keep exactly the old strictness (a geared chain missing system/speeds
     still fails) while a real single-speed chain (KMC Z410) no longer forces
     a fabricated `system`. (2026-07-13 DJ pass, analysis-doc section 1c.) */
  chain: { system:{type:'string',vocab:'system',optional:true}, speeds:{type:'number',optional:true},
    chainWidth:{type:'string',vocab:'chainWidth',optional:true}, halfLink:{type:'bool',optional:true} },
  /* crankset: ring/ringStd are OPTIONAL/NULLABLE because armset-only cranks
     ship without a ring (Race Face, eeWings) - a required value forces
     fabricated data and produced a live false red (DATA-MODEL-REVIEW 5.1-6).
     ringStd:null = "ring sold separately / user-fitted". chainline is a
     NUMBER in mm (Boost=52, T-Type=55), display-only for now. */
  /* crankset: same geared-or-single-speed split as chain (cross-rule below):
     a geared crank must still carry speeds + ringStd (nullable = armset-only,
     unchanged); a single-speed crank carries chainWidth (its ring's width
     class - feeds ss-chain-width) and may omit speeds/ringStd, which are
     meaningless on a 1/8in BMX-heritage crank. (2026-07-13 DJ pass.) */
  crankset: { bb:{type:'string',vocab:'crankBb'}, ring:{type:'number',optional:true}, ringStd:{type:'string',vocab:'ringStd',nullable:true,optional:true}, speeds:{type:'number',optional:true}, chainline:{type:'number',optional:true},
    chainWidth:{type:'string',vocab:'chainWidth',optional:true} },
  /* cog = the single rear cog of a single-speed drivetrain (DJ; the analysis
     doc's rule DJ-1 reads its chainWidth). No live slot exists yet - the
     category lands with the DJ schema pass so off-live DJ rows validate
     against the real schema; the `cog` build slot joins GROUPS only when
     Douglas takes DJ live. A cog-mounting field (freehub-spacer / thread-on /
     BMX-driver) is deliberately deferred to the mechanic review (analysis-doc
     rule DJ-2 models mounting as permissive, never a hard gate). */
  cog: { teeth:{type:'number'}, chainWidth:{type:'string',vocab:'chainWidth'} },
  /* seatpost = a RIGID post (DJ builds run slammed rigid posts; dropper stays
     its own category). Same no-live-slot status as cog. */
  seatpost: { diameter:{type:'number'} },
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
  cockpitset:{ fills:{type:'fills'} },
  /* completebike (Complete Bikes, 2026-07-15 — COMPLETE-BIKES-SCOPE.md decisions
     LOCKED): a whole-build preset spanning EVERY build slot, reusing the fills
     validator + the weight-derived-from-fills rule + the <=-sum price lint
     verbatim (isPresetCat below). UNLIKE groupset/wheelset/brakeset/cockpitset,
     it is deliberately NOT attached to a GROUPS entry (see compat.js GROUPS
     comment) — so bundleActive never bills a group at this price, and
     buildTotals keeps summing components even after auto-fill.
     fills = ONLY the parts that ship on the bike from the factory (decision
     #1) — never a "close enough" substitute; slots the factory omits (most
     often pedals) simply stay unfilled.
     price = the canonical stored figure and is ALWAYS the maker's list MSRP
     (decision #3 — matches the price field's pinned USD-MSRP semantics
     everywhere else in the catalog); streetPrice is an optional lower
     current/sale figure shown as the headline when present. Both are plain
     numbers, never swapped for weight, and only `price` is what the <=-sum
     lint checks (a discount makes that lint EASIER to pass, never harder). */
  /* rotorAdapterDocumented (bias-r4 rotor wave, 2026-07-19 — DATA-ENTRY-TEMPLATE.md
     §6a): opt-out for lintCatalog's rotor-fill-vs-wheel-rotorMount advisory, for
     the rare bike whose stock rotor brand/size publishes no real SKU in the
     wheel's mount (so the fill can't be repointed to a real product) — the desc
     must carry the sourced explanation; this flag just tells the lint the
     mismatch is known and documented, not a stray entry-time slip. */
  completebike: { fills:{type:'fills'}, streetPrice:{type:'number',optional:true}, rotorAdapterDocumented:{type:'bool',optional:true} },

  /* ============================================================================
     RIDER KIT categories (Kit Builder, 2026-07-14). 12 apparel/protection
     categories; EVERY kit build slot is OPTIONAL (nothing gates completeness) and
     kit has ZERO checkBuild rules (decisions #3 + #4) - it is a curated list with
     price+weight totals, cert badges, and size labels, never a fit verdict.
     Common fields (brand/model/price/weight/desc + the identity kit +
     provenance + disciplines + image/colors/retailerLinks) come from COMMON.
     SIZING (decision #2): one row per PRODUCT, never a row per size -
       `sizes`     = the offered size LABELS (a new `sizeList` type: a non-empty
                     array of FREE strings, deliberately not a vocab - brands use
                     XS-XXXL, numeric EU, and split "S/M" sizes; a vocab would
                     block real data, the tire-casing lesson).
       `sizeChart` = the brand's OWN label -> body-measurement ranges (a new
                     `sizeChart` type mirroring frame.sizes), dormant-until-sourced.
                     The allowed inner MEASURE keys are constrained PER CATEGORY
                     via `measures` (the frame.sizes -> seatTubeLen/maxInsert
                     precedent) so a jersey chart can't claim a `head` measure.
     `fitCut` (mens/womens/unisex) is an optional annotation on every kit category.
     Cert (`certs`) is fetched-source-only (a safety claim) and restricted per
     category by the KIT_CERTS cross-rule. */
  helmet:    { type:{type:'string',vocab:'helmetType'},
               certs:{type:'enumArray',vocab:'protectionCert',optional:true},
               rotational:{type:'string',vocab:'rotational',optional:true},
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['head'],optional:true} },
  shoes:     { soleType:{type:'string',vocab:'soleType'},
               closure:{type:'string',vocab:'shoeClosure',optional:true},
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['eu','us','uk','footLength'],optional:true} },
  jersey:    { sleeve:{type:'string',vocab:'sleeve',optional:true},
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['chest'],optional:true} },
  jacket:    { waterproof:{type:'bool',optional:true}, insulated:{type:'bool',optional:true},
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['chest'],optional:true} },
  shorts:    { liner:{type:'bool',optional:true},   // built-in chamois liner (annotation); shorts + pants are SEPARATE cats (decision #1)
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['waist','inseam'],optional:true} },
  pants:     { liner:{type:'bool',optional:true},
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['waist','inseam'],optional:true} },
  gloves:    { fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['hand'],optional:true} },
  kneepad:   { certs:{type:'enumArray',vocab:'protectionCert',optional:true},   // weighed PER PAIR (the pedals/grips convention)
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['knee','thigh'],optional:true} },
  elbowpad:  { certs:{type:'enumArray',vocab:'protectionCert',optional:true},   // per pair
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['elbow','forearm'],optional:true} },
  bodyarmor: { coverage:{type:'string',vocab:'armorCoverage',optional:true},
               certs:{type:'enumArray',vocab:'protectionCert',optional:true},
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['chest','torso'],optional:true} },
  neckbrace: { certs:{type:'enumArray',vocab:'protectionCert',optional:true},   // KIT_CERTS.neckbrace = [] (no universal standard yet - dormant)
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['neck'],optional:true} },
  shinguard: { certs:{type:'enumArray',vocab:'protectionCert',optional:true},   // per pair
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true}, sizeChart:{type:'sizeChart',measures:['calf','shin'],optional:true} },
  eyewear:   { type:{type:'string',vocab:'eyewearType'},   // glasses | goggles (mostly one-size display; sizeChart omitted)
               certs:{type:'enumArray',vocab:'protectionCert',optional:true},
               fitCut:{type:'string',vocab:'fitCut',optional:true},
               sizes:{type:'sizeList',optional:true} }
};

var PRESET_CATS = ['groupset','wheelset','brakeset','cockpitset','completebike'];
/* Common fields every category may carry. family/gen/modelYear/mfgPn are the
   flat-SKU supporting kit (review section 3): family = generation-agnostic
   platform slug ("rockshox-zeb"); gen = maker's generation code (free string -
   'B1', 'V3.2', 'm.2'); modelYear = number; mfgPn = the manufacturer part
   number / model code when the source spec table shows one. All optional in
   schema, template-mandatory for NEW rows (tools/DATA-ENTRY-TEMPLATE.md). */
var COMMON = ['id','cat','brand','model','price','weight','desc','verified','lastChecked','source',
  'family','gen','modelYear','mfgPn','disciplines',
  'sourceType','weightSource','archiveUrl','status','supersededBy','soldWithout',
  'priceBasis','image','colors','retailerLinks'];

/* ===========================================================================
   >>> PRICE_BASIS_STRICT - THE COORDINATOR'S ROLLOUT SWITCH. DO NOT FLIP <<<
   ---------------------------------------------------------------------------
   Douglas's 2026-07-22 ruling ("verified means the pricing was verified too")
   lands in two stages, because ~3,300 MTB rows alone already carry
   verified:true from before price provenance was a concept.

     false (TODAY)  a verified row with NO priceBasis is a WARNING-tier lint -
                    COUNTED and printed by validate.js, never a hard problem.
                    The existing rows keep the gate green while the backfill
                    grinds run.
     true  (LATER)  the same row becomes a hard validator ERROR, so "verified"
                    can never again silently mean "spec checked, price a guess".

   FLIP THIS ONLY when the backfill is complete across EVERY catalog (this file
   plus the five sibling validators, each of which carries its own copy of this
   constant - grep PRICE_BASIS_STRICT). Flipping it early turns `node
   validate.js` red for thousands of rows and blocks all catalog work.
   =========================================================================== */
var PRICE_BASIS_STRICT = false;

/* Id convention (DATA-MODEL-REVIEW.md section 3.1): ids are APPEND-ONLY - never
   renamed, never reused; corrections retire the old id into ALIASES (compat.js).
   Shape: <prefix>-<brand>-<model...>[-<gen>][-<variant tokens, fixed per-category
   order>], all lowercase [a-z0-9-]. The brand is ONE token: lowercased, diacritics
   folded, punctuation dropped ("Öhlins" -> ohlins, "e*thirteen" -> ethirteen). */
/** @type {Object.<string, string>} */
var ID_PREFIX = {
  frame:'fr', fork:'fk', shock:'sh', frontwheel:'fw', rearwheel:'rw', tire:'ti',
  fronthub:'fh', rearhub:'rh', rim:'rm',
  shifter:'sft', derailleur:'dr', cassette:'ca', chain:'ch', crankset:'cr', cog:'cg', seatpost:'sp',
  brake:'bk', rotor:'ro', handlebar:'hb', stem:'st', grips:'gr', dropper:'dp',
  saddle:'sa', pedal:'pd', bb:'bb', headset:'hs', groupset:'gs', wheelset:'ws', brakeset:'bs', cockpitset:'co', completebike:'cb',
  /* Rider Kit prefixes (Kit Builder, 2026-07-14) - collision-free with every bike
     prefix above (id-prefix match is on the EXACT first token, so 'sho'/'sht'/'shg'
     never collide with 'sh'). Kit ids carry NO size token (size is a per-row label
     list, not a fit-distinct SKU) and NO color token - so kit rows have few or zero
     variant tokens; the rare legit one is a genuinely fit-distinct build difference
     (a helmet sold in MIPS and non-MIPS versions = two rows, `-mips`). */
  helmet:'hm', shoes:'sho', jersey:'jsy', jacket:'jkt', shorts:'sht', pants:'pnt', gloves:'glv',
  kneepad:'knp', elbowpad:'elp', bodyarmor:'arm', neckbrace:'nkb', shinguard:'shg', eyewear:'ewr'
};
var ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/** One-token brand slug for the id's second token. @param {*} brand @returns {string} */
function brandSlug(brand){
  return String(brand == null ? '' : brand)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
}

/* Named isPresetCat (not isPreset) to distinguish it from index.html's
   isPresetPart(p): this one classifies by SCHEMA CATEGORY and must stay
   correct on malformed/incomplete data (e.g. a groupset row missing its
   required `fills`), since it gates validator checks that run on untrusted
   input. isPresetPart checks `!!p.fills` on already-valid catalog data for
   UI display. The two coincide once data is valid (only PRESET_CATS carry a
   `fills` field), but are not interchangeable on invalid input. */
/** @param {string} cat @returns {boolean} */
function isPresetCat(cat){ return PRESET_CATS.indexOf(cat) >= 0; }
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

/* id -> part index for a catalog, built once per validation call and reused
   across every lookup site (mirrors compat.js's byId/_BY_ID memo idiom).
   Null-prototype so a crafted id ('__proto__', 'constructor') can never
   resolve to an inherited value. */
/** @param {Catalog} C @returns {Object.<string, any>} */
function _byIdMap(C){
  /** @type {Object.<string, any>} */ var acc = Object.create(null);
  C.PARTS.forEach(function(p){ acc[p.id] = p; });
  return acc;
}

/* Build a validation context from a catalog ({PARTS, SLOTS}). */
/** @param {Catalog} C @param {Date} [today] @returns {Ctx} */
function _ctx(C, today){
  /** @type {Object.<string, boolean>} */ var ids = {};
  /** @type {Object.<string, string>} */ var catOf = {};
  C.PARTS.forEach(function(p){ ids[p.id] = true; catOf[p.id] = p.cat; });
  var byIdMap = _byIdMap(C);
  /** @type {Object.<string, string>} */ var slotCat = {};
  C.SLOTS.forEach(function(s){ slotCat[s.key] = s.cat; });
  return {
    has: function(id){ return !!ids[id]; },
    catOf: function(id){ return catOf[id]; },
    byId: function(id){ return byIdMap[id]; },
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
  if(isPresetCat(p.cat) && 'weight' in p) bad('preset weight is derived from fills - do not store it');
  // completebike.streetPrice (decision #3): an optional current/sale figure
  // shown as the headline instead of the canonical MSRP `price`. It must be a
  // real discount, never a markup - a streetPrice above MSRP is nonsense data.
  if(p.cat === 'completebike' && 'streetPrice' in p && p.streetPrice != null){
    if(!(isNum(p.streetPrice) && p.streetPrice >= 0)) bad('streetPrice must be a number >= 0 (USD)');
    else if(isNum(p.price) && p.streetPrice > p.price) bad('streetPrice ' + p.streetPrice + ' exceeds the list MSRP price ' + p.price + ' (streetPrice must be a discount, never a markup)');
  }

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
  /* priceBasis (2026-07-22 ruling - see VOCAB.priceBasis + PRICE_BASIS_STRICT).
     Two directions, both about never letting the field become decorative:
       - a stated basis is a CLAIM, so it may only ride on a verified row (and
         verified:true already forces a real source URL + non-future date
         above, which is what makes 'msrp-confirmed' mean "read off that page");
       - once STRICT flips, a verified row must state its basis. Until then the
         gap is counted by priceBasisAudit(), not failed. */
  if('priceBasis' in p && p.priceBasis != null){
    if(!isStr(p.priceBasis) || VOCAB.priceBasis.indexOf(p.priceBasis) < 0)
      bad('priceBasis "' + p.priceBasis + '" not in [' + VOCAB.priceBasis.join(', ') + ']');
    if(p.verified !== true)
      bad('priceBasis "' + p.priceBasis + '" requires verified:true with a real source - an unverified row states no price provenance');
    if(p.priceBasis === 'pair-split-estimate' && ['frontwheel', 'rearwheel'].indexOf(p.cat) < 0)
      bad('priceBasis "pair-split-estimate" is wheel-only (frontwheel/rearwheel) - "' + p.cat + '" is not a wheel category');
    /* TOKEN LAW (2026-07-23): priceBasis:'discontinued-no-msrp' is a claim that
       the row's price was sourced the way it was BECAUSE the product is
       discontinued and has no MSRP - so it must always travel with
       status:'discontinued' in the same row. Enforced here so this can't
       silently recur (a human-review-only convention kept getting violated). */
    if(p.priceBasis === 'discontinued-no-msrp' && p.status !== 'discontinued')
      bad('priceBasis "discontinued-no-msrp" requires status:"discontinued" on the same row (the token law - a discontinued price basis without a discontinued status is a contradiction)');
  } else if(PRICE_BASIS_STRICT && p.verified === true){
    bad('verified:true requires a priceBasis (see VOCAB.priceBasis) - "verified" must cover the price, not just the spec');
  }
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
      /* maxTireByWheel: a frame's per-wheel-size tire-clearance map,
         { <wheelSize>: <maxWidthIn> }. Keys must be wheel-vocab tokens
         ('29'/'275'/...), values positive numbers (inches). Rule-18 fix. */
      case 'maxTireByWheel':
        if(!isObj(v)){ bad('field "' + field + '" (maxTireByWheel) must be an object of wheelSize -> max width (in)'); break; }
        var mtKeys = Object.keys(v);
        if(mtKeys.length === 0){ bad('field "' + field + '" (maxTireByWheel) must declare at least one wheel size'); break; }
        mtKeys.forEach(function(wk){
          if(VOCAB.wheel.indexOf(wk) < 0) bad('maxTireByWheel key "' + wk + '" not in wheel [' + VOCAB.wheel.join(', ') + ']');
          if(!(isNum(v[wk]) && v[wk] > 0)) bad('maxTireByWheel["' + wk + '"] must be a positive number (in)');
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
      /* sizeList (Kit Builder): the offered size LABELS. Free strings on purpose
         (brands use XS-XXXL, numeric EU, split "S/M") - validated only as non-empty
         strings, never against a vocab. One row per product; NEVER a row per size. */
      case 'sizeList':
        if(!Array.isArray(v) || v.length === 0){ bad('field "' + field + '" must be a non-empty array of size labels'); break; }
        v.forEach(function(/** @type {*} */ s){ if(!isStr(s)) bad('field "' + field + '" size labels must be non-empty strings (got ' + JSON.stringify(s) + ')'); });
        break;
      /* sizeChart (Kit Builder): the brand's own size label -> body-measurement map,
         { <label>: { <measure>: [lo,hi] | number } }. The allowed inner MEASURE keys
         are constrained PER CATEGORY by rule.measures (the frame.sizes precedent), so
         a jersey chart can't claim a `head` measure. Dormant-until-sourced. */
      case 'sizeChart':
        if(!isObj(v)){ bad('field "' + field + '" (sizeChart) must be an object of sizeLabel -> {measure: [lo,hi]|number}'); break; }
        var allowMeasures = rule.measures || [];
        Object.keys(v).forEach(function(label){
          var mv = v[label];
          if(!isObj(mv)){ bad('sizeChart["' + label + '"] must be an object of measure -> [lo,hi] or number'); return; }
          if(Object.keys(mv).length === 0){ bad('sizeChart["' + label + '"] must declare at least one measurement'); return; }
          Object.keys(mv).forEach(function(mk){
            if(allowMeasures.indexOf(mk) < 0){ bad('sizeChart["' + label + '"] measure "' + mk + '" not allowed for ' + p.cat + ' (allowed: ' + (allowMeasures.join(', ') || 'none') + ')'); return; }
            var range = mv[mk];
            if(Array.isArray(range)){
              if(range.length !== 2 || !isNum(range[0]) || !isNum(range[1]) || range[0] <= 0 || range[0] > range[1])
                bad('sizeChart["' + label + '"].' + mk + ' must be [lo,hi] with 0 < lo <= hi');
            } else if(!(isNum(range) && range > 0)){
              bad('sizeChart["' + label + '"].' + mk + ' must be a positive number or an [lo,hi] range');
            }
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
    // same restriction for the single-speed driver (2026-07-13 DJ pass): it
    // takes ONE cog, never a multi-speed cassette.
    if(p.freehub === 'single-speed') bad('freehub single-speed is a wheel/hub-side value (the driver takes a single cog) - a cassette row cannot carry it');
  }

  // cross-rule (2026-07-13 DJ pass): a chain is geared (system + speeds) or
  // single-speed (chainWidth) - never neither. Geared rows keep the original
  // required-field strictness; a half-identity (system without speeds or
  // vice versa) is a typo'd row either way.
  if(p.cat === 'chain'){
    var chGeared = ('system' in p && p.system != null) || ('speeds' in p && p.speeds != null);
    var chSS = ('chainWidth' in p && p.chainWidth != null);
    if(chGeared){
      if(!(p.system != null)) bad('geared chain (has speeds) is missing required field "system"');
      if(!(p.speeds != null)) bad('geared chain (has system) is missing required field "speeds"');
    } else if(!chSS){
      bad('chain needs system+speeds (geared) or chainWidth (single-speed)');
    }
  }

  // cross-rule (2026-07-13 DJ pass): same split for cranksets - a crank
  // without chainWidth is geared and must still carry speeds + ringStd
  // (ringStd stays nullable: null = armset-only, ring sold separately).
  if(p.cat === 'crankset' && !('chainWidth' in p && p.chainWidth != null)){
    if(!('speeds' in p && p.speeds != null)) bad('geared crankset is missing required field "speeds"');
    if(!('ringStd' in p)) bad('geared crankset is missing required field "ringStd" (null = ring sold separately)');
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

  // cross-rule (Kit Builder): a cert is a SAFETY claim restricted per category.
  // The generic enumArray check above already confirmed each token is in
  // protectionCert; this narrows it to the tokens THIS category may carry, so a
  // helmet can't claim a back-protector cert and a jersey can't carry one at all.
  // (rotational-only-helmet and soleType-only-shoes need no cross-rule: those
  // fields live only on their category's SCHEMA, so the unknown-field check below
  // already rejects them elsewhere.)
  if(Object.prototype.hasOwnProperty.call(KIT_CERTS, p.cat) && Array.isArray(p.certs)){
    var allowCerts = KIT_CERTS[p.cat];
    p.certs.forEach(function(/** @type {*} */ c){
      if(allowCerts.indexOf(c) < 0)
        bad('cert "' + c + '" is not valid for a ' + p.cat + ' (allowed: ' + (allowCerts.join(', ') || 'none - no published standard for this category yet') + ')');
    });
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
      .map(function(id){ var part = ctx.byId(id); return part ? part.system : null; })
      .filter(Boolean);
    var uniq = sys.filter(function(v,i,a){ return a.indexOf(v) === i; });
    if(uniq.length > 1) problems.push('[' + p.id + '] groupset mixes drivetrain systems: ' + sys.join(', '));
  });

  // a frame's bundled shock must exist AND physically fit the frame
  C.PARTS.filter(function(p){ return p.cat === 'frame' && p.bundledShock; }).forEach(function(f){
    var s = ctx.byId(f.bundledShock);
    if(!s){ problems.push('[' + f.id + '] bundledShock "' + f.bundledShock + '" not found'); return; }
    if(s.eye !== f.shockEye || s.stroke !== f.shockStroke || s.mount !== f.shockMount)
      problems.push('[' + f.id + '] bundledShock ' + s.id + ' does not fit the frame (frame needs ' + f.shockEye + 'x' + f.shockStroke + ' ' + f.shockMount + ')');
  });

  // an OEM-only shock must point back to frames that actually bundle it (bidirectional)
  C.PARTS.filter(function(p){ return p.cat === 'shock' && p.oemOnly; }).forEach(function(s){
    (Array.isArray(s.forFrames) ? s.forFrames : []).forEach(function(/** @type {*} */ fid){
      var f = ctx.byId(fid);
      if(!f || f.cat !== 'frame'){ problems.push('[' + s.id + '] oemOnly forFrames entry "' + fid + '" is not a frame'); return; }
      if(f.bundledShock !== s.id) problems.push('[' + s.id + '] oemOnly shock is not referenced by ' + f.id + '.bundledShock (bidirectional link broken)');
    });
  });

  // a preset's bundle price should not exceed the sum of its components (data smell)
  C.PARTS.filter(function(p){ return isObj(p.fills) && typeof p.price === 'number'; }).forEach(function(p){
    var sum = 0, complete = true;
    Object.keys(p.fills).forEach(function(slot){
      var c = ctx.byId(p.fills[slot]);
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
  speeds:       [7, 8, 9, 10, 11, 12, 13]   // 7 = SRAM DH groups (XG-795 etc.), sourced 2026-07-08; 8 = Shimano entry 8-speed (system:'shimano-8'), sourced grind-7 w1 2026-07-16
};

/* Non-fatal lints - consistency warnings that should never block data entry
   mid-batch. validate.js prints them without failing; the test suite keeps the
   SHIPPED catalog lint-clean (test-ids.js). */
/** @param {Catalog} C @returns {string[]} */
function lintCatalog(C){
  /** @type {string[]} */ var warnings = [];
  var byIdMap = _byIdMap(C);
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
      return byIdMap[p.fills[slot]];
    }).filter(Boolean);
    var sizes = parts.map(function(w){ return w.wheel; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    var brands = parts.map(function(w){ return w.brand; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(sizes.length > 1) warnings.push('[' + p.id + '] wheelset fills mix wheel sizes: ' + sizes.join(', '));
    if(brands.length > 1) warnings.push('[' + p.id + '] wheelset fills mix brands: ' + brands.join(', '));
  });

  // a completebike's rotor fill should match its stock wheel's rotorMount -
  // advisory only (not a hard error): the rare bike that genuinely ships an
  // adapter earns a sourced desc note and keeps tripping this, on purpose
  // (bias-r4 rotor wave, 2026-07-19 - see DATA-ENTRY-TEMPLATE.md §6a)
  C.PARTS.filter(function(p){ return p.cat === 'completebike' && isObj(p.fills) && !p.rotorAdapterDocumented; }).forEach(function(p){
    ['frontRotor', 'rearRotor'].forEach(function(slot){
      var wheelSlot = slot === 'frontRotor' ? 'frontWheel' : 'rearWheel';
      var rotor = byIdMap[p.fills[slot]], wheel = byIdMap[p.fills[wheelSlot]];
      if(!rotor || !wheel || !rotor.mount || !wheel.rotorMount) return;
      if(rotor.mount !== wheel.rotorMount)
        warnings.push('[' + p.id + '] ' + slot + ' mount (' + rotor.mount + ') does not match ' + wheelSlot + '\'s rotorMount (' + wheel.rotorMount + ') - see DATA-ENTRY-TEMPLATE.md §6a');
    });
  });

  return warnings;
}

/* Price-provenance rollout counter (2026-07-22 ruling). Deliberately NOT part
   of lintCatalog: that returns one warning string per finding and the shipped
   catalog is held lint-CLEAN by test-ids.js, so ~3,300 not-yet-backfilled rows
   would either spam thousands of lines or force that guard to be weakened.
   A count is the honest WARNING-tier signal instead - validate.js prints it
   next to the verified counts, and it drops to 0 when the backfill completes
   (the cue to flip PRICE_BASIS_STRICT). Takes a bare parts array so every
   catalog - MTB, kit and the five siblings - can share this one counter. */
/** @param {any[]|null|undefined} parts a catalog's rows; null/undefined is
 * tolerated on purpose - this runs inside validate.js's output line, where
 * throwing on a missing catalog would be a worse failure than reporting 0.
 * @returns {{verified:number, withBasis:number, missing:number}} */
function priceBasisAudit(parts){
  var verified = 0, withBasis = 0;
  (parts || []).forEach(function(p){
    if(!p || p.verified !== true) return;
    verified++;
    if(p.priceBasis != null) withBasis++;
  });
  return { verified:verified, withBasis:withBasis, missing:verified - withBasis };
}

/* One-line WARNING-tier suffix for validate.js's per-catalog OK line. Empty
   string once every verified row states a basis, so a green run stays quiet. */
/** @param {any[]|null|undefined} parts @returns {string} */
function priceBasisNote(parts){
  var a = priceBasisAudit(parts);
  return a.missing ? ', ' + a.missing + ' verified row(s) still lack priceBasis' : '';
}

if(typeof module !== 'undefined' && module.exports){
  module.exports = { VOCAB:VOCAB, SCHEMA:SCHEMA, PRESET_CATS:PRESET_CATS, ID_PREFIX:ID_PREFIX, KIT_CERTS:KIT_CERTS,
    PRICE_BASIS_STRICT:PRICE_BASIS_STRICT,
    brandSlug:brandSlug, lintCatalog:lintCatalog,
    priceBasisAudit:priceBasisAudit, priceBasisNote:priceBasisNote,
    validatePart:validatePart, validateCatalog:validateCatalog, _ctx:_ctx };
}
