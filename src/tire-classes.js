/* ==========================================================================
   tire-classes.js — groups the brand-native tire `compound`/`casing` SKU
   axes (compat.js PARTS, schema.js VOCAB.compound/VOCAB.casing) into
   rider-facing classes for the Tires-tab sub-filter chips:
     compound -> soft / medium / hard  (durometer/grip positioning)
     casing   -> dh / enduro / trail / xc  (duty/protection positioning)
   Display/filter grouping ONLY, same contract as `compound`/`casing`
   themselves (CLAUDE.md: brand-native SKU axes that NEVER feed checkBuild) —
   this is one more display layer on top, not a new build-affecting field.

   MAPPING BAR (Douglas 2026-07-16): a value is mapped only when the maker's
   own naming, a fetched maker/press page, or an existing sourced schema.js
   provenance comment states the class unambiguously. A value stays
   UNMAPPED — see the trailing comment blocks below for every value + its
   one-line reason — when it's a construction/bead/protection-layer
   descriptor rather than a hardness or duty claim, when it names TWO of the
   target classes jointly with no principled way to pick one, or when no
   sourced signal exists at all. classifyTireCompound/classifyTireCasing
   return null for anything not in the table below, INCLUDING a raw value
   that exists but isn't mapped — an unmapped tire matches no class chip
   (it only shows again once the chip is reset to "All"). That's a
   deliberate departure from the rest of index.html's SUBFILTERS convention
   (there, an axis a part doesn't carry always passes every chip) — here,
   the axis value DOES exist, we just won't guess which bucket it belongs
   in, so the honest behavior is "doesn't match a claim we didn't make."

   "Gravity"-named casing tiers (a brand's own tier name containing the word
   "Gravity", not literally "Downhill"/"DH") map to enduro, not dh, applied
   identically across every brand that uses the word — "gravity riding"
   spans enduro-to-DH in modern MTB marketing without being DH-exclusive,
   and `dh` is reserved for a literal Downhill/DH name. Applied to: Schwalbe
   Super Gravity/Gravity-Pro, Onza GRC, Michelin Gravity Shield, Specialized
   GRID Gravity, Kenda AGC (LABELS in compat.js already glosses AGC as
   "gravity casing", independently confirming the fetched research below).

   Research sources are web/press pages fetched 2026-07-16 (search-engine
   summaries of manufacturer/press pages, not raw manufacturer HTML — the
   same caveat as every WebFetch-sourced note elsewhere in this codebase);
   schema.js-cited sources are that file's own VOCAB.casing/VOCAB.compound
   comments, already fetched and provenance-noted in prior sessions.
   ========================================================================== */

/** @type {Object.<string, 'soft'|'medium'|'hard'>} */
var TIRE_COMPOUND_CLASS = {
  // Maxxis (Douglas's 2026-07-16 brief): 3C MaxxGrip = softest/grippiest; 3C MaxxTerra
  // = the all-round middle tier; Dual and Maxx Speed are Maxxis's harder/faster/OEM
  // tiers (maxxis.com's own compound explainer ranks MaxxSpeed < Dual < 3C MaxxTerra <
  // 3C MaxxGrip, hardest to softest). Bare 'maxxterra'/'3c-maxxspeed' share their 3C
  // sibling's line name (MaxxTerra/MaxxSpeed) at a different compound-count
  // construction, so they inherit the same class as that sibling.
  '3c-maxxgrip':'soft', '3c-maxxterra':'medium', 'maxxterra':'medium',
  'dual':'hard', 'maxxspeed':'hard', '3c-maxxspeed':'hard',

  // Continental: sourced comparative ranking (enduro-mtb.com / thelostco.com reviews +
  // Continental's own BlackChili tech page, fetched 2026-07-16) — Endurance is
  // explicitly the hardest/most-durable/least-grip tier, Soft is "somewhere in the
  // middle", Supersoft the grippiest. NOTE the counter-intuitive one, flagged in the
  // delivery report: Continental's tier literally NAMED "Soft" is their MIDDLE
  // compound, not the softest thing they make — that's the whole point of a
  // maker-relative class (a brand's own label doesn't compare across brands).
  'endurance':'hard', 'soft':'medium', 'supersoft':'soft',

  // Schwalbe (Douglas's 2026-07-16 brief): Addix Ultra-Soft + Soft -> soft, SpeedGrip
  // -> medium, Speed -> hard.
  'addix-ultra-soft':'soft', 'addix-soft':'soft', 'addix-speedgrip':'medium', 'addix-speed':'hard',

  // Pirelli (pirelli.com / bikerumor.com, fetched 2026-07-16): SmartGRIP Gravity is
  // explicitly the softer, motocross-derived, more-grip compound; base SmartGRIP is
  // "the harder, faster rolling" compound by direct contrast — Pirelli names only
  // these two tiers, no third.
  'smartgrip-gravity':'soft', 'smartgrip':'hard',

  // Vittoria: graphene-silica is sourced in schema.js as "the XC Race Formulation" ->
  // fast-rolling/hard.
  'graphene-silica':'hard',

  // Goodyear: schema.js's own sourced fact (goodyearbike.com) — Grip3S is explicitly
  // the softer FRONT/MTF compound, Grip3 the harder REAR/MTR compound.
  'grip3s':'soft', 'grip3':'hard',

  // Michelin (Douglas's 2026-07-16 brief: MagiX-DH -> soft). Bare 'magix' is sourced
  // (worldwidecyclery.com, fetched 2026-07-16) as Michelin's grippiest/softest rubber
  // generally — same family as the DH tier, so it inherits soft too.
  'magix-dh':'soft', 'magix':'soft',

  // Specialized: T5/T7/T9 Gripton tier positioning is well-documented cycling-press
  // knowledge (specialized.com itself 403s per this project's existing fetch notes) —
  // T5 the fastest-rolling XC tier, T7 the balanced trail tier, T9 the maximum-grip
  // gravity/DH tier.
  'gripton-t5':'hard', 'gripton-t7':'medium', 'gripton-t9':'soft',

  // Onza (Douglas's 2026-07-16 brief): Soft-50 -> soft, Medium-60 -> medium.
  'soft-50':'soft', 'medium-60':'medium',

  // Vee Tire Co (bikerumor.com / bikeradar.com, fetched 2026-07-16): TOP40 is
  // explicitly "their softest compound available" (soft, high-grip, enduro/DH use).
  // Tackee is explicitly "a more balanced option ... for trail and all-mountain use"
  // by direct contrast with TOP40 — medium.
  'top40':'soft', 'tackee':'medium',

  // Bontrager: no fetched source, but the name itself is a direct, unambiguous
  // Speed-vs-Grip contrast — the same industry-standard binary Schwalbe/Pirelli name
  // their own tiers with. TM-Speed -> hard, TM-Grip -> soft.
  'tm-grip':'soft', 'tm-speed':'hard',

  // Teravail (bikerumor.com / teravail.com, fetched 2026-07-16): Grip/Grip Plus are
  // the maker's own grip-named compounds (soft bucket — Grip Plus is the grippier of
  // the two, but there's no separate "extra-soft" class to put it in). 'fast' is
  // sourced verbatim ("provides low resistance for a fast-rolling tire") -> hard.
  'grip':'soft', 'grip-plus':'soft', 'fast':'hard',

  // Terrene: schema.js's own sourced comment (terrenetires.com/pages/tech) uses direct
  // comparative language — 62a-51a is "the standard Chunk tread", 56a-48a "the softer
  // 'Tough/Grip' tread". Standard/baseline reads as medium; explicitly-softer as soft.
  '62a-51a':'medium', '56a-48a':'soft',

  // e*thirteen (ethirteen.com product pages, fetched 2026-07-16): MoPo is "a pure 42a
  // single compound designed for maximum ... traction" (soft); Momentum is the dual
  // compound that "balances grip with rolling efficiency" via a firmer 50a center
  // (medium).
  'mopo':'soft', 'momentum':'medium',

  // Hutchinson: the compound names literally spell out the discipline (Race Ripost
  // XC / Enduro / Gravity) — XC-race compounds prioritize rolling speed (hard),
  // Gravity (their DH/gravity-race tier) prioritizes grip (soft), Enduro sits between
  // the two (medium).
  'race-ripost-xc':'hard', 'race-ripost-enduro':'medium', 'race-ripost-gravity':'soft'

  /* ---- considered and left UNMAPPED (compound), with reason ----
     '4c-graphene' (Vittoria) — a compound-COUNT descriptor (4 layered compounds),
       not a hardness claim on its own; same treatment as Maxxis's bare "3C" would get
       without a Grip/Terra/Speed suffix.
     'blackchili' (Continental) — sourced (continental-tires.com) as a base rubber
       TECHNOLOGY present in every Continental compound tier, not itself a hardness
       tier ("All Compounds include Continental BlackChili").
     'magix-mh', 'magix-ms' (Michelin) — sourced (worldwidecyclery.com) as the SAME
       Magi-X compound with only the TREAD PATTERN differing by terrain, not a
       durometer axis at all — mapping them into different hardness buckets would
       misrepresent identical rubber as different compounds.
     'single-60a' (Onza) — shares Medium-60's durometer NUMBER but is a single- (not
       dual-) compound tire and carries no soft/medium/hard word of its own; guessing
       whether "single compound at the same number" reads harder isn't sourced.
     'mpc', 'dcc' (Vee Tire Co, Crown Gem) — undecoded proprietary abbreviations, no
       sourced hardness claim.
     'triple-compound' (Panaracer) — a compound-COUNT descriptor (3-layer
       construction), not a hardness claim, same as Vittoria's 4c-graphene.
     'zsg-natural' (Panaracer) — an unexplained legacy compound name, no sourced
       hardness claim.
     'grip-compound' (Continental, Magnotal tire) — contrasted against a SEPARATE
       'soft' Magnotal tier with no sourced statement of which is actually
       softer/harder; assuming "Grip" also means soft here isn't sourced.
     'bi-compound' (Hutchinson) — a compound-COUNT descriptor (2-layer), not a
       hardness claim, same treatment as 4c-graphene/triple-compound.
     'dtc' (Kenda) — "Dual Tread Compound", sourced (schema.js) as hard-center/
       soft-shoulder: spans two durometers by design, doesn't reduce to one bucket.
     'dual-layer' (Kenda) — same reasoning as dtc: a two-durometer construction
       descriptor, not one hardness class.
     'tritec' (WTB) — WTB's singular unqualified compound tech name across most of
       their range, no positioned tier/hardness word attached.
  */
};

/** @type {Object.<string, 'dh'|'enduro'|'trail'|'xc'>} */
var TIRE_CASING_CLASS = {
  // Maxxis (Douglas's 2026-07-16 brief): EXO -> trail, DoubleDown -> enduro, DH -> dh.
  // EXO+ is Maxxis's own reinforced-TRAIL casing ("ideal for aggressive trail and
  // light enduro riding" per Maxxis's own copy) — a rung below DoubleDown's dedicated
  // enduro positioning, so it stays in the trail bucket rather than overstating its
  // protection level relative to DoubleDown.
  'exo':'trail', 'exo-plus':'trail', 'doubledown':'enduro', 'dh':'dh',

  // Continental / Goodyear / Vittoria: literal names (Douglas's 2026-07-16 brief).
  // Continental's XC-line 'protection' casing is sourced in schema.js as its own
  // distinct XC-oriented tier.
  'trail':'trail', 'enduro':'enduro', 'downhill':'dh', 'protection':'xc',

  // Schwalbe (Douglas's 2026-07-16 brief): Super Race -> xc, Super Ground/Trail ->
  // trail, Super Gravity -> enduro, Super Downhill -> dh. gravity-pro/trail-pro are
  // schema.js-sourced as the newer radial-carcass equivalents of Super Gravity/Super
  // Trail respectively, so they inherit the same class as their bias-ply predecessor.
  'super-race':'xc', 'super-ground':'trail', 'super-trail':'trail',
  'super-gravity':'enduro', 'super-downhill':'dh',
  'gravity-pro':'enduro', 'trail-pro':'trail',
  // 'bikepark' (Schwalbe Magic Mary/Big Betty BikePark version): schema.js's own
  // sourced comment (schwalbetires.com, fetched 2026-07-16) calls it "the wire-bead
  // DH/bike-park casing tier" in its own words — the literal DH tier, distinct from
  // the folding-bead Super Trail/Super Gravity tiers already mapped above.
  'bikepark':'dh',

  // Specialized (Douglas's 2026-07-16 brief): Control -> xc, GRID/GRID Trail ->
  // trail. GRID Gravity: Douglas asked for enduro/DH with justification — its OWN
  // name says "Gravity", not "Downhill", so it gets the same treatment as every other
  // Gravity-named casing in this table (see file header) rather than a literal-DH
  // read Specialized never claimed.
  'control':'xc', 'grid':'trail', 'grid-trail':'trail', 'grid-gravity':'enduro',

  // Onza: schema.js-sourced full names (onza-tires.com) — TRC = Trail Ready Casing,
  // GRC = Gravity Ready Casing (-> enduro, the Gravity rule), XCC = XC Casing.
  'trc':'trail', 'grc':'enduro', 'xcc':'xc',

  // Pirelli (pirelli.com / ambmag.com.au, fetched 2026-07-16): ProWALL is sourced as
  // suited to "~120-140mm downcountry or trail bikes"; HardWALL to "~150-160mm
  // Enduro bikes" — direct, unambiguous travel-bracket + discipline language.
  'prowall':'trail', 'hardwall':'enduro',

  // Michelin: 'gravity-shield' is Gravity-named (schema.js) -> enduro, the Gravity rule.
  'gravity-shield':'enduro',

  // Vittoria: 'xc-race' is schema.js-sourced as Vittoria's XC-line version tier.
  'xc-race':'xc',

  // Vee Tire Co: dh-core and enduro-core are literal discipline names.
  'dh-core':'dh', 'enduro-core':'enduro',

  // Kenda (vitalmtb.com / bicycle.kendatire.com / vital MTB "AGC and ATC Explained",
  // fetched 2026-07-16): ATC = Advanced Trail Casing, explicitly "optimized for trail
  // riding"; AEC = Advanced Enduro Casing, literal name. AGC = Advanced Gravity
  // Casing -> enduro, the Gravity rule (compat.js's own LABELS already glosses AGC as
  // "gravity casing", independently matching this research).
  'atc':'trail', 'aec':'enduro',

  // e*thirteen: schema.js-sourced (ethirteen.com Shopify variant JSON) — Flux GR =
  // "the Grappler line's gravity/enduro casing" -> enduro; Flux AM = "the all-mountain/
  // trail casing" -> trail; Flux GR Radial shares the GR/gravity family name at a
  // newer (radial) construction, so it inherits Flux GR's class.
  'flux-am':'trail', 'flux-gr':'enduro', 'flux-gr-radial':'enduro',

  // Teravail (teravail.com "What's in a tire" page, fetched 2026-07-16): Ultra
  // Durable is the one Teravail casing tier with an actual sourced duty signal —
  // "recommended when your focus is descending at high speeds ... high-gravity
  // corners" (the Gravity rule, by description rather than name this time) -> enduro.
  // Durable and Light & Supple carry no discipline word or duty description at all
  // (see unmapped list below) — only Ultra Durable clears the bar.
  'ultra-durable':'enduro',
  // 'light-trail' is a SEPARATE Teravail product line (schema.js) whose own name
  // literally contains "trail" — mapped on that name match, independent of Ultra
  // Durable/Durable/Light & Supple above (a different Teravail casing family).
  'light-trail':'trail',

  // WTB (wtb.com "Which Casing Do You Need", fetched 2026-07-16): TCS Tough SG1 is
  // sourced as preferred by "enduro, gravity ... riders" — enduro is the only actual
  // target-class word in that sentence ("gravity" is a synonym under this file's own
  // rule, "e-bike" is out of scope for this catalog) with no competing light-duty
  // word alongside it, unlike TCS Light SG2 / plain TCS Tough below.
  'tcs-tough-sg1':'enduro',

  // Terrene (bikerumor.com / themtblab.com, fetched 2026-07-16): 'tough' is sourced
  // as full bead-to-bead reinforcement "designed for more aggressive riding and
  // protection" (contrasted with a lighter, unused-in-catalog 'Light' tier) -> enduro.
  'tough':'enduro'

  /* ---- considered and left UNMAPPED (casing), with reason ----
     'tcs-light-sg2' (WTB) — sourced (wtb.com) as chosen by "XC and trail riders" —
       BOTH target classes named jointly with no principled single pick.
     'tcs-tough' (WTB, plain/no-SG-guard tier) — no discipline word sourced at all,
       only a construction fact (schema.js: "the dual-ply E25 tier with no SG guard
       layer").
     'eps', 'eps-tlr', 'exo-btb' (CST BFT) — puncture-protection/bead-construction
       descriptors (schema.js: "Exceptional Puncture Safety", "bead-to-bead
       reinforcement tag"), not duty-class names.
     'hardskin', 'sideskin' (Hutchinson) — sourced (cycling.hutchinson.com, fetched
       2026-07-16) as a REINFORCEMENT-COVERAGE axis (bead-to-bead vs sidewall-only),
       not a discipline name — schema.js already flags these as the sheet's
       "Reinforcement" column, a different axis from duty.
     'inner-strength', 'core-strength' (Bontrager) — sourced (vitalmtb.com, fetched
       2026-07-16): Inner Strength is used on "cross-country and trail" tires, Core
       Strength on "aggressive trail and enduro" tires — each names TWO target
       classes jointly, no principled single pick.
     'ksct' (Kenda) — undecoded abbreviation (schema.js: "the sheet's own 'Protection'
       column value", no expansion given); inferring a duty class from which XC
       models currently use it isn't the same as the casing's own naming being
       unambiguous.
     'tr', 'emc' (Kenda, Havok Pro) — schema.js-sourced as bead/certification
       descriptors ("plain tubeless-ready folding", "e-MTB-certified reinforced
       folding"), not duty-class names — also e-bike-adjacent, which this catalog
       excludes on principle regardless (CLAUDE.md hard rule 1).
     'durable', 'light-and-supple' (Teravail) — sourced (teravail.com) with NO
       discipline word or duty description at all, only weight/construction facts
       ("one-ply, 60 TPI... less puncture protection" / "woven nylon... for anyone
       planning an extended ride through uncharted terrain") — unlike Ultra Durable's
       explicit "high-gravity corners" line, neither names or implies a single class.
     'super-tough' (Panaracer) — sourced (bikeperfect.com / worldwidecyclery-style
       press, fetched 2026-07-16) as suited to "downhill/enduro riding" — both target
       classes named jointly, no principled single pick.
     'synthesis' (Vee Tire Co) — proprietary name, no discipline word, no source found.
     'wire-bead', 'folding-tlr' (Vee Tire Co, Crown Gem) — schema.js explicitly flags
       these as "Crown Gem's bead-construction axis", a different axis from duty.
  */
};

/** @type {string[]} */
var TIRE_COMPOUND_CLASSES = ['soft', 'medium', 'hard'];
/** @type {string[]} */
var TIRE_CASING_CLASSES = ['dh', 'enduro', 'trail', 'xc'];

/** @type {Object.<string, string>} */
var TIRE_COMPOUND_CLASS_LABELS = { soft:'Soft', medium:'Medium', hard:'Hard' };
/** @type {Object.<string, string>} */
var TIRE_CASING_CLASS_LABELS = { dh:'DH', enduro:'Enduro', trail:'Trail', xc:'XC' };

/** @param {string} [compound] @returns {?string} */
function classifyTireCompound(compound){ return (compound && TIRE_COMPOUND_CLASS[compound]) || null; }
/** @param {string} [casing] @returns {?string} */
function classifyTireCasing(casing){ return (casing && TIRE_CASING_CLASS[casing]) || null; }

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TIRE_COMPOUND_CLASS:TIRE_COMPOUND_CLASS, TIRE_CASING_CLASS:TIRE_CASING_CLASS,
    TIRE_COMPOUND_CLASSES:TIRE_COMPOUND_CLASSES, TIRE_CASING_CLASSES:TIRE_CASING_CLASSES,
    TIRE_COMPOUND_CLASS_LABELS:TIRE_COMPOUND_CLASS_LABELS, TIRE_CASING_CLASS_LABELS:TIRE_CASING_CLASS_LABELS,
    classifyTireCompound:classifyTireCompound, classifyTireCasing:classifyTireCasing };
}
