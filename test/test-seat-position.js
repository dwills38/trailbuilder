'use strict';
/* =============================================================================
   THE SEAT POSITION — Douglas's 2026-07-22 completeness ruling.

   His exact words: "A rigid seat post can be complete any bike. Even enduro's.
   You can still build the bike and everything works. No bike should require a
   dropper, even though most will get one."

   The dropper slot and the rigid seatpost slot are ONE physical position. The
   engine now models that directly (GROUPS' `position:'seat'` tag):

     - REQUIREDNESS is untouched and still lives in slotRequired(). Exactly one
       of the pair ever carries the flag for a given frame — the dropper for the
       geared default, the rigid post for driveMode:'single-speed' — so the
       "N of M" denominator can never count the seat twice, and can never count
       it zero times except where an existing rule already exempts the position.
     - FILLEDNESS is what changed: wheelPositionFilled() counts the position as
       filled from EITHER slot (positionPeersOf()), so a rigid post completes a
       geared enduro build and a dropper completes a DJ build.

   Distinct from `altOf`, which is an AND path (frontWheel needs a hub AND a
   rim) — that contract is re-pinned here so the two never blur.

   RETIRED 2026-07-22 (Douglas: "every bike requires some post and DH bikes
   often have rigid posts") — see the slotRequired() header in compat.js: the
   DH-discipline and `noStockDropper` dropper drops. They predated the rigid
   seatpost category, and their only remaining effect was to exempt the seat
   position ENTIRELY. Now that the 24 complete-bike rows that leaned on them all
   carry a real cataloged post (catalog/cb-rigid-posts-1 + fix/marlin7-dropper)
   and the golden DH builds run their real stock rigid posts, the exemption was
   removed and `noStockDropper` deleted catalog-wide. So EVERY frame now requires
   exactly one seat slot — zero exemptions. Pinned below; this completes the
   seatpost-completeness end state its own report proposed.
   ========================================================================== */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;

/** @param {string} key @returns {any} */
function slotByKey(key){
  var s = C.SLOTS.filter(function(x){ return x.key === key; })[0];
  if(!s) throw new Error('unknown slot: ' + key);
  return s;
}
/** Every required slot this build leaves unfilled (the app's own completeness
 *  math: slotRequired for the denominator, wheelPositionFilled for the fill).
 *  @param {Object.<string, string>} map @returns {string[]} */
function missingRequired(map){
  var build = B(map);
  var eRW = C.effectiveWheel(build, 'rear');
  return C.SLOTS.filter(function(s){
    return C.slotRequired(s, build.frame, eRW) && !C.wheelPositionFilled(build, s.key);
  }).map(function(s){ return s.key; });
}
/** @param {any} frame @returns {string[]} the seat slots required for this frame */
function requiredSeatSlots(frame){
  return ['dropper','seatpost'].filter(function(k){ return C.slotRequired(slotByKey(k), frame); });
}
/* ---- 1. The requiredness contract: exactly one of the two, on EVERY frame - */

test('EVERY frame in the catalog requires exactly ONE seat slot — never both, never neither, ZERO exemptions (Douglas 2026-07-22)', function(){
  // Seat exemptions retired 2026-07-22 ("every bike requires some post"): every
  // frame requires exactly one seat slot — the dropper for a geared frame, the
  // rigid post for a single-speed one (the inverted require). No frame is exempt
  // any more; a rigid post fills the seat position wherever a dropper would.
  C.PARTS.filter(function(p){ return p.cat === 'frame'; }).forEach(function(f){
    var req = requiredSeatSlots(f);
    eq(req.length, 1, f.id + ' must require exactly one seat slot (never zero — a bike needs SOME post; never both '  + req.join('+') + ')');
  });
});

test('which of the two carries the requirement is unchanged: dropper for geared, rigid post for single-speed', function(){
  eq(requiredSeatSlots(part('fr-santacruz-megatower-cc')).join(), 'dropper', 'geared enduro frame');
  eq(requiredSeatSlots(part('fr-dmr-sect')).join(), 'seatpost', 'single-speed DJ frame (the inverted require)');
  eq(requiredSeatSlots(null).join(), 'dropper', 'the no-frame universal default');
});

test('positionPeersOf: the seat pair peers each other and nothing else does', function(){
  eq(C.positionPeersOf('dropper').join(), 'seatpost');
  eq(C.positionPeersOf('seatpost').join(), 'dropper');
  ['frame','fork','saddle','cog','frontWheel','frontHub'].forEach(function(k){
    eq(C.positionPeersOf(k).length, 0, k + ' has no position peer');
  });
  eq(C.positionPeersOf('nope-not-a-slot').length, 0, 'an unknown key is peerless, not a crash');
  // The two are also `excludes` partners, so a build can never hold both at once
  // — that is what keeps buildTotals from billing two posts.
  eq((slotByKey('dropper').excludes || []).join(), 'seatpost');
  eq((slotByKey('seatpost').excludes || []).join(), 'dropper');
});

/* ---- 2. The fill contract: dropper-only / rigid-only / neither / both ---- */

/* The golden Megatower trail build (test-golden.js's GOOD), re-cut four ways.
   Its frame seat tube is 31.6mm, so both posts below are an exact-diameter
   match and rules 13/13c stay silent — completeness is the only variable. */
var ENDURO = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5',
  frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg',
  shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };
/** @param {Object.<string,string>} extra @returns {Object.<string,string>} */
function enduroWith(extra){ return Object.assign({}, ENDURO, extra); }

test('an ENDURO build with a RIGID post reads COMPLETE (Douglas 2026-07-22: "Even enduro\'s")', function(){
  eq(missingRequired(enduroWith({ seatpost:'sp-reverse-comp-316' })).join(), '',
     'a rigid 31.6 post must complete a geared enduro build with no dropper anywhere in it');
});

test('the same build with a DROPPER still reads complete (the common case is untouched)', function(){
  eq(missingRequired(enduroWith({ dropper:'dp-oneup-v3-316-210' })).join(), '');
});

test('with NO post at all it is INCOMPLETE, and the seat is the only thing missing', function(){
  eq(missingRequired(ENDURO).join(), 'dropper',
     'a geared frame still needs SOME post — the requirement just is not dropper-specific');
});

test('a build carrying BOTH posts still reads complete (the seat position is asked once)', function(){
  // The UI's `excludes` mutex + sanitizeShare keep this shape off the screen;
  // completeness must not fall over if a crafted build reaches it anyway.
  eq(missingRequired(enduroWith({ dropper:'dp-oneup-v3-316-210', seatpost:'sp-reverse-comp-316' })).join(), '');
});

test('the enduro rigid-post build is also conflict-free through checkBuild (complete AND clean)', function(){
  var r = C.checkBuild(B(enduroWith({ seatpost:'sp-reverse-comp-316' })));
  eq(r.errors.length, 0, 'no errors');
  eq(r.warnings.length, 0, 'no warnings');
});

test('the OR is symmetric: a dropper fills the seat position on a single-speed frame too', function(){
  // slotRequired still names the rigid post as the required slot on a DJ frame
  // (the inverted-require logic is untouched) — but a rider who fits a dropper
  // has filled the same one physical position, so it must count.
  var ss = part('fr-dmr-sect');
  eq(requiredSeatSlots(ss).join(), 'seatpost', 'the DJ inverted require is unchanged');
  ok(C.wheelPositionFilled(B({ dropper:'dp-oneup-v3-316-210' }), 'seatpost'),
     'a dropper fills the seat position the DJ frame requires');
  ok(!C.wheelPositionFilled(B({ saddle:'sa-wtb-volt' }), 'seatpost'),
     'an unrelated part fills nothing');
});

/* ---- 3. What must NOT have moved ----------------------------------------- */

test('altOf keeps its AND semantics: a hub alone does not fill a wheel position', function(){
  ok(!C.wheelPositionFilled(B({ frontHub:'fh-dtswiss-350-boost110' }), 'frontWheel'),
     'hub without rim = position NOT filled (altOf is an AND path, unlike the seat OR)');
  ok(C.wheelPositionFilled(B({ frontWheel:'fw-reserve-30-hd-29' }), 'frontWheel'));
});

test('rules 13 / 13c still fire on whichever post is picked', function(){
  var tooBigDropper = C.checkBuild(B(enduroWith({ dropper:'dp-oneup-v3-349-210' })));
  some(tooBigDropper.errors, 'Dropper too big', 'rule 13 still errors a 34.9 dropper in a 31.6 tube');
  eq(tooBigDropper.errors.filter(function(v){ return v.ruleId === 'dropper-diameter'; }).length, 1);
  var tooBigPost = C.checkBuild(B(enduroWith({ seatpost:'sp-sdg-v2comp-349' })));
  some(tooBigPost.errors, 'Seatpost too big', 'rule 13c still errors a 34.9 rigid post in a 31.6 tube');
  eq(tooBigPost.errors.filter(function(v){ return v.ruleId === 'seatpost-diameter'; }).length, 1);
  // ...and the direction-aware smaller-post shim warning is still a warning.
  var shim = C.checkBuild(B(enduroWith({ seatpost:'sp-raceface-ride-309' })));
  eq(shim.errors.length, 0, 'a smaller rigid post is not an error');
  some(shim.warnings, 'shim', 'a smaller rigid post still raises the reducing-shim warning');
});

test('the DH / noStockDropper seat exemptions are RETIRED — those frames now require a post, and NO complete bike is postless (Douglas 2026-07-22)', function(){
  // This completes the seatpost-completeness end state its own report proposed.
  // The two flags that used to exempt the seat position are gone: a
  // DH-discipline frame and a frame that once carried noStockDropper now BOTH
  // require exactly one seat slot, which a real rigid post (or a dropper) fills.
  eq(requiredSeatSlots(part('fr-commencal-supreme-dh-v5')).join(), 'dropper', 'DH-discipline frame: seat position now REQUIRED (dropper slot; a rigid post fills it)');
  eq(requiredSeatSlots(part('fr-canyon-lux-world-cup-cf')).join(), 'dropper', 'formerly-noStockDropper XC frame: seat position now REQUIRED');
  // And the data gap is fully closed: with the exemptions gone, ANY postless
  // complete-bike row would read INCOMPLETE — so there must be exactly zero.
  /** @param {any} p @returns {Object.<string,string>} */
  function fillsOf(p){ return p.fills || {}; }
  var postless = C.PARTS.filter(function(p){
    if(p.cat !== 'completebike') return false;
    var f = fillsOf(p);
    return !f.dropper && !f.seatpost;
  });
  eq(postless.length, 0, 'no complete bike may be postless now (each would read incomplete): ' + postless.map(function(p){ return p.id; }).join(', '));
});

test('slotRequired itself returns exactly what it returned before this change', function(){
  // The ruling was implemented on the FILLED side only. This pins the
  // requiredness side byte-for-byte against the pre-change expectations, so a
  // future edit cannot quietly move the denominator instead.
  var geared = part('fr-santacruz-megatower-cc');
  eq(C.slotRequired(slotByKey('dropper'), geared), true);
  eq(C.slotRequired(slotByKey('seatpost'), geared), false);
  eq(C.slotRequired(slotByKey('dropper'), null), true);
  eq(C.slotRequired(slotByKey('seatpost'), null), false);
  var ss = part('fr-dmr-sect');
  eq(C.slotRequired(slotByKey('dropper'), ss), false);
  eq(C.slotRequired(slotByKey('seatpost'), ss), true);
});
