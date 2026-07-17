'use strict';
/* ENGINE RULES — each compatibility rule fires (and only fires) when it should. */
/** @typedef {import('../src/types.js').FramePart} FramePart */
/** @typedef {import('../src/types.js').TirePart} TirePart */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
/** @param {Object.<string, string>} map */
var chk = function(map){ return C.checkBuild(B(map)); };

test('empty build -> no issues', function(){
  var r = C.checkBuild({}); eq(r.errors.length, 0); eq(r.warnings.length, 0);
});

test('29-only frame rejects a 27.5 front (fork) -> error', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-275-170'}).errors, 'wheel');
});
test('mullet (29 front + 27.5 rear) is allowed on a mullet-capable frame', function(){
  eq(chk({frame:'fr-yt-capra-core4', fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-dtswiss-e-1900-275', frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt'}).errors.length, 0);
});
test('mullet is rejected on a 29-only frame', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-dtswiss-e-1900-275', frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt'}).errors, 'Unsupported wheel setup');
});

/* Rule 1 frameless guard (REVIEW.md #18): a reverse mullet satisfies no
   config in the model or reality, even before a frame is picked. */
test('frameless reverse-mullet (27.5 front / 29 rear) -> error', function(){
  some(chk({fork:'fk-rockshox-zeb-ultimate-275-170', rearWheel:'rw-dtswiss-ex-1700-29'}).errors, 'matches no configuration');
});
test('frameless legit mullet-in-progress (29 front / 27.5 rear) stays silent', function(){
  eq(chk({fork:'fk-rockshox-zeb-ultimate-29-170', rearWheel:'rw-dtswiss-e-1900-275'}).errors.length, 0);
});
test('frameless matching pair (29/29) stays silent', function(){
  eq(chk({fork:'fk-rockshox-zeb-ultimate-29-170', rearWheel:'rw-dtswiss-ex-1700-29'}).errors.length, 0);
});
test('SuperBoost frame + Boost rear wheel -> rear axle error', function(){
  some(chk({frame:'fr-pivot-firebird', rearWheel:'rw-reserve-30-hd-29'}).errors, 'Rear axle');
});
test('SuperBoost frame + SuperBoost wheel -> ok', function(){
  eq(chk({frame:'fr-pivot-firebird', rearWheel:'rw-industrynine-enduro-s-29-157'}).errors.length, 0);
});
test('Shimano cassette on XD wheel -> freehub error', function(){
  some(chk({cassette:'ca-shimano-xt-m8100-1051', rearWheel:'rw-roval-traverse-hd-29'}).errors, 'Freehub');
});
test('SRAM shifter + Shimano derailleur -> system mismatch', function(){
  some(chk({shifter:'sft-sram-gx-eagle', derailleur:'dr-shimano-xt-m8100-sgs'}).errors, 'Drivetrain mismatch');
});

/* Rule 3 — budget wide-range 1x systems (microSHIFT Advent X/Advent, Box Prime 9,
   Shimano CUES LinkGlide) added 2026-07-09. Each is its OWN cable-pull standard;
   a coherent group is clean, and any cross-brand pairing must be an honest error. */
test('microSHIFT Advent X 10s group (shifter/derailleur/cassette/chain) -> clean', function(){
  eq(chk({shifter:'sft-microshift-advent-x-m9605', derailleur:'dr-microshift-advent-x-m6205', cassette:'ca-microshift-advent-x-h104-1148', chain:'ch-kmc-x10'}).errors.length, 0);
});
test('microSHIFT Advent 9s group -> clean', function(){
  eq(chk({shifter:'sft-microshift-advent-m9295', derailleur:'dr-microshift-advent-m6195l', cassette:'ca-microshift-advent-h093-1146', chain:'ch-kmc-x9'}).errors.length, 0);
});
test('Box Prime 9 group (Box One shifter + Box Three mech/cassette/chain, one system) -> clean', function(){
  eq(chk({shifter:'sft-box-one-prime-9', derailleur:'dr-box-three-prime-9', cassette:'ca-box-three-prime-9-1150', chain:'ch-box-three-prime-9-126'}).errors.length, 0);
});
test('Shimano CUES LinkGlide 11s group -> clean', function(){
  eq(chk({shifter:'sft-shimano-cues-u6000-11', derailleur:'dr-shimano-cues-u6000-11-gs', cassette:'ca-shimano-cues-lg700-1150', chain:'ch-shimano-cues-lg500'}).errors.length, 0);
});
test('microSHIFT shifter + Box Prime 9 derailleur (both 9s, different pull) -> system mismatch', function(){
  some(chk({shifter:'sft-microshift-advent-m9295', derailleur:'dr-box-three-prime-9'}).errors, 'Drivetrain mismatch');
});
test('microSHIFT Advent X shifter + Shimano 12s derailleur -> system mismatch (not a false green)', function(){
  some(chk({shifter:'sft-microshift-advent-x-m9605', derailleur:'dr-shimano-xt-m8100-sgs'}).errors, 'Drivetrain mismatch');
});
test('Box Prime 9 cassette on a Shimano MicroSpline wheel -> freehub error (HG cassette)', function(){
  some(chk({cassette:'ca-box-three-prime-9-1150', rearWheel:'rw-industrynine-enduro-s-29'}).errors, 'Freehub');
});

/* Rule 6b — integrated-cassette rear wheels (e*thirteen LG1r DH, 2026-07-10).
   The wheel's driver IS a built-in 7-speed cassette ("Freehub Mount:
   Integrated 7 Speed Cassette" per the fetched ethirteen.eu page) - no
   freehub body exists, so no separate cassette can ever mount. The
   pre-correction catalog carried freehub:XD/HG on these rows, which
   false-greened exactly the pairings below. */
test('any cassette on an integrated-cassette wheel -> its own hard error (the killed false green)', function(){
  // ca-sram-xg1275 is XD - the exact pairing the old freehub:XD data let through clean
  var r = chk({cassette:'ca-sram-xg1275', rearWheel:'rw-ethirteen-lg1r-29-150-xd'});
  some(r.errors, 'Integrated cassette');
  eq(r.errors.filter(function(e){ return e.ruleId==='freehub'; }).length, 0, 'the generic mismatch must not double-fire');
  var v = r.errors.filter(function(e){ return e.ruleId==='freehub-integrated'; })[0];
  eq(v.slots.join('+'), 'cassette+rearWheel');
});
test('an HG cassette on an ex-HG integrated wheel row -> still the hard error (nothing mounts)', function(){
  some(chk({cassette:'ca-sram-pg1230', rearWheel:'rw-ethirteen-lg1r-275-150-hg'}).errors, 'Integrated cassette');
});
test('integrated-cassette wheel with NO cassette -> info (built-in 7s), zero errors', function(){
  var r = chk({rearWheel:'rw-ethirteen-lg1r-29-150-xd'});
  eq(r.errors.length, 0);
  some(r.infos, 'Integrated cassette');
  var v = r.infos.filter(function(i){ return i.ruleId==='freehub-integrated'; })[0];
  eq(v.slots.join('+'), 'rearWheel');
});
test('a normal wheel keeps the generic mismatch wording and never the integrated verdicts', function(){
  var r = chk({cassette:'ca-shimano-xt-m8100-1051', rearWheel:'rw-roval-traverse-hd-29'});
  some(r.errors, 'Freehub mismatch');
  eq(r.errors.filter(function(e){ return e.ruleId==='freehub-integrated'; }).length, 0);
  eq(r.infos.filter(function(i){ return i.ruleId==='freehub-integrated'; }).length, 0, 'no integrated info on normal wheels');
});

/* Rule 6c — XD cassette on an XDR driver (bias-audit 2026-07-12 finding #2).
   SRAM's own driver-body explainer (fetched sram.com/en/service/articles/
   sram-xd-and-xdr-driver-body-explained): "XDR driver bodies are compatible
   with all XD cassettes when the cassette is installed with a 1.85mm spacer
   behind it." Before this tier, rule 6's exact match hard-errored the two
   verified WTB CZR i30 XDR rears against EVERY cataloged cassette, making
   their rear slot unbuildable. Only XD-on-XDR gets the spacer path; every
   other mismatch (either direction) must stay the hard error. */
test('XD cassette on an XDR rear wheel -> adapter-tier warning naming the 1.85mm spacer, NOT an error', function(){
  var r = chk({cassette:'ca-sram-xg1275', rearWheel:'rw-wtb-czr-i30-29-xdr'});
  eq(r.errors.length, 0, 'SRAM documents the spacer pairing - a hard error is a false "won\'t fit"');
  var v = r.warnings.filter(function(w){ return w.ruleId==='freehub'; })[0];
  ok(v, 'the freehub warning fires');
  some([v.msg], '1.85mm spacer');
  eq(v.slots.join('+'), 'cassette+rearWheel');
  ok(v.fix && v.fix.kind==='adapter', 'carries the structured adapter fix');
  some([v.fix && v.fix.name], '1.85mm', 'the fix names the spacer');
});
test('the 27.5 XDR sibling wheel takes the same warning path', function(){
  var r = chk({cassette:'ca-sram-xg1275', rearWheel:'rw-wtb-czr-i30-275-xdr'});
  eq(r.errors.length, 0);
  some(r.warnings, '1.85mm spacer');
});
test('non-XD cassette on an XDR wheel -> still the exact-match hard error (the spacer path is XD-only)', function(){
  var r = chk({cassette:'ca-shimano-xt-m8100-1051', rearWheel:'rw-wtb-czr-i30-29-xdr'});
  some(r.errors, 'Freehub mismatch');
  eq(r.warnings.filter(function(w){ return w.ruleId==='freehub'; }).length, 0, 'no spacer warning for non-XD cassettes');
});
test('XDR renders as "SRAM XDR" in the mismatch message (LABELS entry)', function(){
  some(chk({cassette:'ca-shimano-xt-m8100-1051', rearWheel:'rw-wtb-czr-i30-29-xdr'}).errors, 'SRAM XDR');
});
test('reverse direction: a synthetic XDR-length cassette on an XD wheel -> stays a hard error (no adapter shortens a driver)', function(){
  var xdrCassette = /** @type {any} */ (Object.assign({}, part('ca-sram-xg1275'), { id:'ca-synthetic-xdr-cassette', freehub:'XDR' }));
  var b = /** @type {any} */ (B({rearWheel:'rw-roval-traverse-hd-29'}));
  b.cassette = xdrCassette;
  var r = C.checkBuild(b);
  some(r.errors, 'Freehub mismatch');
  eq(r.warnings.filter(function(w){ return w.ruleId==='freehub'; }).length, 0, 'no adapter warning in this direction');
});
test('XD cassette on an XD wheel stays silent (the 6c branch never fires on a match)', function(){
  var r = chk({cassette:'ca-sram-xg1275', rearWheel:'rw-roval-traverse-hd-29'});
  eq(r.errors.filter(function(e){ return e.ruleId==='freehub'; }).length, 0);
  eq(r.warnings.filter(function(w){ return w.ruleId==='freehub'; }).length, 0);
});

/* Rule 3b — actuation (REVIEW.md #1). Cable vs wireless share system:'sram-eagle',
   so before the actuation field this pairing passed totally clean. */
test('mechanical trigger + AXS (wireless) derailleur, same system -> actuation error', function(){
  some(chk({shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle-axs'}).errors, 'Actuation mismatch');
});
test('AXS controller + mechanical derailleur -> actuation error (reverse direction)', function(){
  some(chk({shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-eagle'}).errors, 'Actuation mismatch');
});
test('AXS Eagle drivetrain sharing Eagle cassette/chain stays clean (no system-vocab split)', function(){
  eq(chk({shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-eagle-axs', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle'}).errors.length, 0);
});

/* Rule 3a AXS-controller exception (dossier rule 3 review, 2026-07-10): SRAM documents
   that ALL AXS controllers work with ALL AXS derailleurs - "the new Eagle Transmission
   Pod Controllers with Eagle AXS Drivetrain, or the Eagle Drivetrain controller with
   Eagle Transmission" (support.sram.com articles 13820865674011 + 13820000105371).
   The one-system check must not red-flag either pairing; everything else stays an error. */
test('Transmission Pod controller + Eagle AXS drivetrain -> clean (SRAM: all AXS controllers work with all AXS derailleurs)', function(){
  eq(chk({shifter:'sft-sram-gx-transmission', derailleur:'dr-sram-gx-eagle-axs', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle'}).errors.length, 0);
});
test('Eagle AXS controller + Transmission drivetrain -> clean (the reverse pairing)', function(){
  eq(chk({shifter:'sft-sram-gx-eagle-axs', derailleur:'dr-sram-gx-transmission', cassette:'ca-sram-xs1275', chain:'ch-sram-gx-flattop'}).errors.length, 0);
});
test('the AXS exemption does not cross systems: Pod + Shimano cassette/chain is still a system error', function(){
  some(chk({shifter:'sft-sram-gx-transmission', cassette:'ca-shimano-xt-m8100-1051', chain:'ch-shimano-deore-m6100'}).errors, 'Drivetrain mismatch');
});
test('mechanical Eagle trigger + Transmission mech stays an error (the exemption is electronic-only)', function(){
  some(chk({shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-transmission'}).errors, 'Drivetrain mismatch');
});

/* Rule 3c — T-Type chainring (REVIEW.md #2). SRAM-documented hard incompatibility,
   one-directional: Flattop chain needs a T-Type ring; T-Type ring runs Eagle chains fine. */
test('Transmission Flattop chain + non-T-Type crank -> chainring error', function(){
  some(chk({chain:'ch-sram-gx-flattop', crankset:'cr-shimano-xt-m8100'}).errors, 'Chainring mismatch');
});
test('Transmission Flattop chain + T-Type crank -> clean', function(){
  eq(chk({chain:'ch-sram-gx-flattop', crankset:'cr-sram-x0-transmission'}).errors.length, 0);
});
test('T-Type crank + Eagle chain -> clean (backward-compatible per SRAM, no reverse error)', function(){
  eq(chk({chain:'ch-sram-gx-eagle', crankset:'cr-sram-x0-transmission'}).errors.length, 0);
});
test('armset-only crank (ringStd null) + Flattop chain -> info, not a false red', function(){
  // eeWings ship without a ring; current 8-bolt arms pair with SRAM T-Type
  // rings (canecreek.com), so erroring them was a false "won't fit" (REVIEW.md
  // / DATA-MODEL-REVIEW 5.1-6 - the fabricated ringStd made this fire).
  var r = chk({chain:'ch-sram-gx-flattop', crankset:'cr-canecreek-eewings-allmountain'});
  eq(r.errors.length, 0);
  some(r.infos, 'sold without a chainring');
});
test('Transmission derailleur needs a UDH frame', function(){
  some(chk({frame:'fr-kona-process-153', derailleur:'dr-sram-gx-transmission'}).errors, 'UDH');
});
test('Transmission derailleur is fine on a UDH frame', function(){
  eq(chk({frame:'fr-santacruz-megatower-cc', derailleur:'dr-sram-gx-transmission'}).errors.length, 0);
});

/* Rule 7 - the BB category (dossier rule 7 review, 2026-07-10): with a real BB
   picked both interfaces are exact checks; without one the sold-separately
   advisory stands (the bb slot is optional, never completeness-blocking). */
test('BB shell mismatch (PF92 BB in a BSA73 frame) -> error', function(){
  some(chk({frame:'fr-raaw-madonna-v32', bb:'bb-sram-dub-pf92'}).errors, 'BB shell mismatch');
});
test('BB spindle mismatch (DUB BB + 30mm-spindle crank) -> error', function(){
  some(chk({bb:'bb-sram-dub-bsa73', crankset:'cr-hope-evo'}).errors, 'BB spindle mismatch');
});
test('matching BB (shell + spindle both right) -> clean, and the advisory is suppressed', function(){
  var r = chk({frame:'fr-raaw-madonna-v32', bb:'bb-sram-dub-bsa73', crankset:'cr-sram-gx-eagle'});
  eq(r.errors.length, 0);
  eq(r.infos.filter(function(x){ return String(x).indexOf('sold separately')>=0; }).length, 0);
});
test('no BB picked -> the rule 7 sold-separately advisory still fires', function(){
  some(chk({frame:'fr-raaw-madonna-v32', crankset:'cr-sram-gx-eagle'}).infos, 'sold separately');
});
test('a 30mm crank in a PF92 frame is servable (Hope PF41) - the dossier rule-7 Ask, proven clean', function(){
  eq(chk({frame:'fr-commencal-meta-v5', bb:'bb-hope-pf41-92-30mm', crankset:'cr-hope-evo'}).errors.length, 0);
});

/* Rule 7 - BSA68 <-> BSA73 equivalence (engine-critical review C2, 2026-07-12).
   Same 1.37" x 24tpi English thread; threaded BBs ship as ONE 68/73 SKU (the
   catalog's bb-sram-dub-bsa68/-bsa73 rows share mfgPn BB-DUB-BSA-A1; Race Face
   sells "BSA CINCH 30mm (68/73)" by name). Exact-matching the two shell widths
   hard-errored a physically correct build. BSA83 and press-fit stay exact. */
test('a 68/73 threaded BB (encoded BSA68) on a BSA73 frame -> clean, not a false red', function(){
  var r = chk({frame:'fr-raaw-madonna-v3', bb:'bb-raceface-bsa68-30mm', crankset:'cr-raceface-turbine'});
  eq(r.errors.length, 0);
});
test('the mirror: a BSA73-encoded DUB BB on the catalog BSA68 hardtail -> clean', function(){
  eq(chk({frame:'fr-commencal-meta-ht-v3', bb:'bb-sram-dub-bsa73'}).errors.length, 0);
});
test('BSA83 stays OUTSIDE the 68/73 class: a BSA83 DH BB on a BSA73 frame -> still an error', function(){
  some(chk({frame:'fr-raaw-madonna-v3', bb:'bb-sram-dub-bsa83'}).errors, 'BB shell mismatch');
});
test('and the reverse: a 68/73 BB on a BSA83 DH frame (V10) -> still an error', function(){
  some(chk({frame:'fr-santacruz-v10-8', bb:'bb-sram-dub-bsa73'}).errors, 'BB shell mismatch');
});

/* Rule 20 - the headset category (2026-07-10; rule 7/BB is the template).
   20a (ACTIVE): steerer acceptance vs the fork, exact equality like rule 11.
   20b (dormant-until-sourced): cup vs head tube where a frame carries fetched
   headTubeUpper/headTubeLower - S.H.I.S. BORE TOKENS only (the suffix is
   steerer business; the frame backfill's suffixes assume tapered assemblies).
   20c: the pick-a-headset advisory info once frame+fork are chosen. */
test('rule 20a: tapered headset + dual-crown (straight) fork -> steerer error', function(){
  some(chk({fork:'fk-rockshox-boxxer-ultimate-29-200', headset:'hs-canecreek-40-zs44-zs56'}).errors, 'Headset steerer mismatch');
});
test('rule 20b: IS-cup headset in a ZS head tube -> upper AND lower cup errors', function(){
  var r = chk({frame:'fr-giant-reign-advanced', headset:'hs-canecreek-40-is41-is52'});
  eq(r.errors.filter(function(e){ return e.ruleId==='headset-upper'; }).length, 1);
  eq(r.errors.filter(function(e){ return e.ruleId==='headset-lower'; }).length, 1);
});
test('rule 20b: matching cups (ZS44|ZS56 headset, ZS44|ZS56 frame) -> clean', function(){
  eq(chk({frame:'fr-giant-reign-advanced', headset:'hs-canecreek-40-zs44-zs56'}).errors.length, 0);
});
test('rule 20b is DORMANT on a frame without sourced head-tube data', function(){
  // the Megatower carries no headTubeUpper/Lower - even a deliberately wrong
  // cup combo must stay silent there (a missing rule beats a wrong one)
  eq(chk({frame:'fr-santacruz-megatower-cc', headset:'hs-canecreek-40-is41-is52'}).errors.length, 0);
});
test('rule 20 clean sweep: frame + fork + matching headset -> no errors, advisory suppressed', function(){
  var r = chk({frame:'fr-giant-reign-advanced', fork:'fk-rockshox-zeb-ultimate-29-170', headset:'hs-canecreek-40-zs44-zs56'});
  eq(r.errors.length, 0);
  eq(r.infos.filter(function(x){ return x.ruleId==='headset-advisory'; }).length, 0);
});
test('rule 20b compares BORE tokens, not full codes: a straight-dc ZS56 headset fits the Supreme DH', function(){
  // The Supreme DH's backfilled SHIS pair is ZS56/28.6 | ZS56/40 - the /40
  // suffix is a tapered-assembly artifact of the shared vocab, but the BORES
  // (ZS56|ZS56) are the frame fact. A real DH headset for it would be
  // ZS56/28.6 | ZS56/30 - no fetched complete SKU exists yet (see the catalog
  // block comment), so this build synthesizes one to pin the semantics: cups
  // must NOT red on the suffix (that would be a false "won't fit"), and 20a
  // must pass it with the dual-crown BoXXer.
  var dc = /** @type {any} */ (Object.assign({}, part('hs-canecreek-40-zs56-zs56'), { id:'hs-synthetic-dc-zs56', lower:'ZS56/30', steerer:'straight-dc' }));
  var b = /** @type {any} */ (U.B({frame:'fr-commencal-supreme-dh-v5', fork:'fk-rockshox-boxxer-ultimate-29-200'}));
  b.headset = dc;
  eq(C.checkBuild(b).errors.length, 0);
});
test('rule 20a reverse direction: that synthetic straight-dc headset on a tapered fork -> steerer error', function(){
  var dc = /** @type {any} */ (Object.assign({}, part('hs-canecreek-40-zs56-zs56'), { id:'hs-synthetic-dc-zs56', lower:'ZS56/30', steerer:'straight-dc' }));
  var b = /** @type {any} */ (U.B({fork:'fk-rockshox-zeb-ultimate-29-170'}));
  b.headset = dc;
  some(C.checkBuild(b).errors, 'Headset steerer mismatch');
});
test('rule 20c: frame+fork with sourced head-tube data -> advisory names the cups', function(){
  var r = chk({frame:'fr-giant-reign-advanced', fork:'fk-rockshox-zeb-ultimate-29-170'});
  some(r.infos, 'ZS44 upper / ZS56 lower');
});
test('rule 20c: frame+fork without head-tube data -> generic advisory, never a verdict', function(){
  var r = chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170'});
  eq(r.infos.filter(function(x){ return x.ruleId==='headset-advisory'; }).length, 1);
  eq(r.errors.length, 0);
});

/* Rule 4 retrofit tier (dossier rule 4 review, 2026-07-10): a maker-documented
   UDH retrofit kit ("a UDH retrofit kit to give your existing Jibb V1, Madonna
   V2, or Madonna V2.2 compatibility" - raawmtb.com) downgrades the hard error
   to a warning carrying the kit as the structured fix. Kit-less non-UDH frames
   (the Kona Process test above) stay a hard error. */
test('Transmission mech on a kit-covered non-UDH frame -> retrofit warning with structured fix, not an error', function(){
  var r = chk({frame:'fr-raaw-madonna-v22', derailleur:'dr-sram-gx-transmission'});
  eq(r.errors.length, 0);
  some(r.warnings, 'retrofit kit');
  eq(r.warnings.filter(function(w){ return !!(w.fix && w.fix.kind==='adapter' && /UDH Retrofit/.test(w.fix.name)); }).length, 1);
});
test('Jibb V1 (kit-covered) + Transmission mech -> retrofit warning too', function(){
  var r = chk({frame:'fr-raaw-jibb', derailleur:'dr-sram-gx-transmission'});
  eq(r.errors.length, 0);
  some(r.warnings, 'retrofit kit');
});
test('cassette bigger than derailleur capacity -> error', function(){
  some(chk({cassette:'ca-sram-xg1275', derailleur:'dr-shimano-xt-m8100-sgs'}).errors, 'Cassette too big');
});
test('Center Lock rotor on a 6-bolt front hub -> interface error', function(){
  some(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-reserve-30-hd-29', frontRotor:'ro-shimano-rtmt800-203-cl'}).errors, 'rotor interface');
});

/* Rule 9 direction (REVIEW.md #10): 6-bolt-on-Center-Lock is an everyday
   adapter fix (Shimano SM-RTAD05, one-piece rotors); the reverse has no
   adapter. The adapter rides on the verdict as the first structured `fix`. */
test('6-bolt rotor on a Center Lock hub -> adapter warning with a structured fix, not a red', function(){
  var r = chk({frontWheel:'fw-dtswiss-ex-1700-29', frontRotor:'ro-sram-hs2-200-6b'});
  eq(r.errors.length, 0);
  some(r.warnings, 'Center Lock adapter');
  var w = r.warnings.filter(function(v){ return v.ruleId === 'front-rotor-interface'; })[0];
  eq(w && w.fix && w.fix.kind, 'adapter');
  eq(w && w.fix && w.fix.name, 'Shimano SM-RTAD05');
});
test('6-bolt rotor on a Center Lock REAR hub -> same adapter warning', function(){
  var r = chk({rearWheel:'rw-dtswiss-e-1900-275', rearRotor:'ro-sram-hs2-200-6b'});
  eq(r.errors.length, 0); some(r.warnings, 'Center Lock adapter');
});

/* Rule 10 minimum (REVIEW.md #3). The ZEB/Domain have a 200mm-native post mount
   (sram.com); adapters only space the caliper UP, so a 180 rotor is unmountable. */
test('180mm rotor on a ZEB (200mm minimum) -> error, not silence', function(){
  some(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontRotor:'ro-sram-hs2-180-6b'}).errors, 'rotor too small');
});
test('200mm rotor on a ZEB meets the minimum -> clean', function(){
  eq(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontRotor:'ro-sram-hs2-200-6b'}).errors.length, 0);
});
test('min-rotor rule stays dormant on forks without a sourced minRotorF', function(){
  eq(chk({fork:'fk-fox-36-factory-29-160', frontRotor:'ro-sram-hs2-180-6b'}).errors.length, 0);
});

/* Rule 10b - FRAME-side native rotor floor (dossier known-gaps verdict,
   2026-07-10: "use post-mount native size too"). The Cotic Solaris' own page
   states "PM7 Post Mount (180mm rotor only)" - a 160 rear rotor cannot mount. */
test('160mm rear rotor on the Solaris (180mm-only PM7 mount) -> error, not silence', function(){
  some(chk({frame:'fr-cotic-solaris', rearRotor:'ro-clarks-cl01-160-6b'}).errors, 'Rear rotor too small');
});
test('180mm rear rotor on the Solaris meets its native mount exactly -> clean', function(){
  eq(chk({frame:'fr-cotic-solaris', rearRotor:'ro-sram-hs2-180-6b'}).errors.length, 0);
});
test('frame rotor floor stays dormant without a sourced minRotorR', function(){
  eq(chk({frame:'fr-raaw-madonna-v32', rearRotor:'ro-clarks-cl01-160-6b'}).errors.length, 0);
});

/* Rotor-class tolerance (systemic false-verdict fix): SRAM and Shimano label
   the SAME physical rotor mount class differently - SRAM 200 === Shimano 203,
   SRAM 220 === Shimano 223 - so a strict compare against a stated max/min
   false-flags a same-class rotor labeled by the other brand's convention. A
   bounded 3mm grace treats these as one class without masking genuinely
   oversized/undersized rotors (the smallest gap between different classes is
   17mm, 203->220). */
test('203mm rotor on a 200mm-max fork -> NO front-rotor-max warning (SRAM 200 === Shimano 203)', function(){
  var r = chk({fork:'fk-canecreek-helm-mkii-air-29-160', frontRotor:'ro-hayes-dseries-203-6b'});
  eq(r.warnings.filter(function(w){ return w.ruleId==='front-rotor-max'; }).length, 0);
});
test('203mm rotor on a 200mm-max frame -> NO rear-rotor-max warning', function(){
  var r = chk({frame:'fr-commencal-meta-sx-v5', rearRotor:'ro-hayes-dseries-203-6b'});
  eq(r.warnings.filter(function(w){ return w.ruleId==='rear-rotor-max'; }).length, 0);
});
test('223mm rotor on a 220mm-max fork -> NO front-rotor-max warning (SRAM 220 === Shimano 223)', function(){
  var r = chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontRotor:'ro-galfer-223-6b'});
  eq(r.warnings.filter(function(w){ return w.ruleId==='front-rotor-max'; }).length, 0);
});
test('223mm rotor on a 220mm-max frame -> NO rear-rotor-max warning', function(){
  var r = chk({frame:'fr-yt-capra-core4', rearRotor:'ro-galfer-223-6b'});
  eq(r.warnings.filter(function(w){ return w.ruleId==='rear-rotor-max'; }).length, 0);
});
test('220mm rotor on a 203mm-max fork STILL warns - the tolerance must not over-relax (17mm over)', function(){
  some(chk({fork:'fk-marzocchi-bomber-z1-29-160', frontRotor:'ro-sram-hs2-220-6b'}).warnings, 'exceeds the fork max');
});
test('220mm rotor on a 203mm-max frame STILL warns (17mm over)', function(){
  some(chk({frame:'fr-canyon-strive-cfr', rearRotor:'ro-sram-hs2-220-6b'}).warnings, 'exceeds the frame max');
});
test('200mm rotor on a 203mm-minimum fork -> NO front-rotor-min error (SRAM 200 === Shimano 203)', function(){
  var r = chk({fork:'fk-fox-40-factory-29-203', frontRotor:'ro-sram-hs2-200-6b'});
  eq(r.errors.filter(function(e){ return e.ruleId==='front-rotor-min'; }).length, 0);
});
test('180mm rotor on a 203mm-minimum fork STILL errors - the tolerance must not over-relax (23mm under)', function(){
  some(chk({fork:'fk-fox-40-factory-29-203', frontRotor:'ro-sram-hs2-180-6b'}).errors, 'rotor too small');
});

/* Rule 8b - CALIPER rotor ceiling (engine-critical review C1, 2026-07-12).
   A flat-mount caliper body has a hard rotor max independent of the frame:
   Shimano's caliper<->rotor chart C-461 lists the BR-M9110 as "Not compatible
   with 220mm, 203 mm and 180 mm rotors" (140/160 only), and the FM system has
   no size-up bracket. The Lux World Cup's FM mount allows 180 (maxRotorR:180),
   so before this rule the build below was a false "fits". */
test('180mm rotor on the XTR FM caliper (Shimano-rated 140/160) -> error, not a false fit', function(){
  var r = chk({frame:'fr-canyon-lux-world-cup-cf', rearBrake:'bk-shimano-xtr-m9110-fm', rearRotor:'ro-hayes-dseries-180-6b'});
  eq(r.errors.filter(function(v){ return v.ruleId==='rear-brake-rotor-max'; }).length, 1);
  some(r.errors, 'too big for the caliper');
});
test('160mm rotor on the same XTR FM caliper + frame stays clean', function(){
  eq(chk({frame:'fr-canyon-lux-world-cup-cf', rearBrake:'bk-shimano-xtr-m9110-fm', rearRotor:'ro-sram-hs2-160-6b'}).errors.length, 0);
});
test('caliper ceiling fires in the front slot too (Magura MT8 SL FM, maker-stated 160 max)', function(){
  some(chk({frontBrake:'bk-magura-mt8-sl-fm', frontRotor:'ro-hayes-dseries-180-6b'}).errors, 'too big for the caliper');
});
test('Magura MT8 SL FM at exactly its 160 ceiling -> clean (its own brakeset pairing)', function(){
  eq(chk({frontBrake:'bk-magura-mt8-sl-fm', frontRotor:'ro-magura-storm-sl2-160-6b'}).errors.length, 0);
});
test('caliper ceiling stays dormant on post-mount calipers without a sourced maxRotor', function(){
  eq(chk({rearBrake:'bk-sram-code-rsc', rearRotor:'ro-sram-hs2-200-6b'}).errors.length, 0);
});

/* Rule 15 - DIRECTION-AWARE bar/stem clamp (engine-critical review C3,
   2026-07-12; mirrors the rule-13 dropper asymmetry). A 35mm bar cannot
   enter a 31.8mm stem clamp (error); a 31.8mm bar in a 35mm stem is an
   everyday build with a stocked reducer shim (Reverse Components
   Ø35.0->31.8 / Wheels Mfg / Problem Solvers) -> warning + structured fix.
   This test previously asserted the SHIM direction as a hard error - that
   was the C3 false "won't fit"; evolved to encode the corrected truth. */
test('35mm bar in a 31.8mm stem -> error (a bigger bar cannot fit a smaller clamp)', function(){
  var r = chk({handlebar:'hb-renthal-fatbar-35', stem:'st-deity-copperhead-318'});
  eq(r.errors.filter(function(v){ return v.ruleId==='bar-stem-clamp'; }).length, 1);
});
test('31.8mm bar in a 35mm stem -> reducer-shim warning with structured fix, not a red', function(){
  var r = chk({handlebar:'hb-renthal-fatbar-318', stem:'st-renthal-apex-35'});
  eq(r.errors.length, 0);
  some(r.warnings, 'reducer shim');
  var w = r.warnings.filter(function(v){ return v.ruleId==='bar-stem-shim'; })[0];
  eq(w && w.fix && w.fix.kind, 'shim');
  eq(w && w.fix && w.fix.name, '35-to-31.8mm handlebar reducer shim');
});
test('matching bar/stem clamps stay clean in both diameters', function(){
  eq(chk({handlebar:'hb-renthal-fatbar-318', stem:'st-deity-copperhead-318'}).warnings.length, 0);
  eq(chk({handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35'}).warnings.length, 0);
});

/* Rule 19 — shifter mounting vs brake lever integration (REVIEW.md #5). The
   I-Spec EV XT shifter has no bar clamp of its own; on MatchMaker (SRAM) levers
   it attaches to nothing as specced. Warning (band SKUs / adapters exist). */
test('I-Spec EV shifter + MatchMaker (SRAM) brakes -> mount warning, not silence', function(){
  var r = chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc'});
  eq(r.errors.length, 0); some(r.warnings, 'Shifter mount');
});
test('I-Spec EV shifter + I-Spec EV brakes -> silent', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-shimano-xt-m8120', rearBrake:'bk-shimano-xt-m8120'}).warnings.length, 0);
});
test('one matching lever is enough (mixed brakes) -> silent', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-sram-code-rsc', rearBrake:'bk-shimano-xt-m8120'}).warnings.length, 0);
});
test('I-Spec EV shifter + I-Spec B levers (Saint) -> mount warning (generations do not mate)', function(){
  var r = chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-shimano-saint-m820', rearBrake:'bk-shimano-saint-m820'});
  eq(r.errors.length, 0); some(r.warnings, 'Shifter mount');
});
test('I-Spec EV shifter + Hayes Dominion (multi-standard Peacemaker clamp) -> silent', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-hayes-dominion-a4', rearBrake:'bk-hayes-dominion-a4'}).warnings.length, 0);
});
test('shifter-mount rule stays dormant when the brakes are untagged', function(){
  eq(chk({shifter:'sft-shimano-xt-m8100', frontBrake:'bk-hope-tech-4-v4', rearBrake:'bk-hope-tech-4-v4'}).warnings.length, 0);
});
test('AXS pod shifter (own clamp) never triggers the mount warning', function(){
  eq(chk({shifter:'sft-sram-gx-transmission', frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc'}).warnings.length, 0);
});
/* Rule 16 hardtail guard — no catalog hardtail exists yet (the suspension
   discriminator UNBLOCKS entering them), so these drive it with a synthetic
   one, exactly like the dormant rule-18 tests below. */
/** @returns {FramePart} */
function hardtail(){
  var f = /** @type {any} */ (Object.assign({}, part('fr-raaw-madonna-v3')));
  delete f.shockEye; delete f.shockStroke; delete f.shockMount; delete f.travel; delete f.bundledShock;
  f.suspension = 'hardtail';
  return /** @type {FramePart} */ (f);
}
test('hardtail frame + a shock -> one clean hardtail error, never "undefinedxundefined"', function(){
  var bld = B({shock:'sh-rockshox-super-deluxe-ultimate-230x65'});
  bld.frame = hardtail();
  var r = C.checkBuild(bld);
  some(r.errors, 'Hardtail');
  eq(r.errors.filter(function(e){ return String(e).indexOf('undefined') >= 0; }).length, 0, 'no undefined leaked');
});
test('hardtail frame without a shock -> silent (no shock-fit noise)', function(){
  /** @type {import('../src/types.js').Build} */ var bld = {};
  bld.frame = hardtail();
  eq(C.checkBuild(bld).errors.length, 0);
});
/* Rule 13 direction (REVIEW.md #9): bigger post in a smaller tube = physically
   impossible; smaller post in a bigger tube = everyday reducing-shim build. */
test('dropper bigger than the seat tube -> error (impossible direction)', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-oneup-v3-349-210'}).errors, 'Dropper too big');
});
test('smaller dropper in a bigger seat tube -> shim warning, not a false red', function(){
  // Enduro S-Works is a real 31.6mm seat tube; a 30.9mm post is the smaller-in-bigger
  // (shimable) direction. (Was a 31.6 post in the old, wrong 34.9 tube; the frame's real
  // 31.6 diameter made that an exact match, so this now uses a genuinely-smaller post.)
  var r = chk({frame:'fr-specialized-enduro-sworks', dropper:'dp-pnw-loam-309-175'});
  eq(r.errors.length, 0); some(r.warnings, 'reducing shim');
});
test('exact-diameter dropper -> silent', function(){
  var r = chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-oneup-v3-316-210'});
  eq(r.errors.length, 0); eq(r.warnings.length, 0);
});
test('trunnion shock on a standard-mount frame -> mount error', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-super-deluxe-205x65-trun'}).errors, 'mount');
});

/* Rule 16 stroke direction (REVIEW.md #8). Fit is set by eye-to-eye + mount;
   makers sell the same 230 body in 57.5/60/62.5/65 strokes and RockShox
   supports stroke-spacer reduction, so a SHORTER stroke bolts in with less
   travel (warning), while a LONGER stroke can over-rotate the linkage (error). */
test('shorter-stroke shock, matching eye+mount -> warning naming the designed travel, not a false red', function(){
  // Megatower runs 230x62.5; the Float X 230x60 reduces travel. NO estimated
  // figure (dossier rule 16 verdict: linear ratios are wrong on progressive
  // linkages) - the warning names the frame's designed travel and defers to
  // the maker's supported strokes.
  var r = chk({frame:'fr-santacruz-megatower-cc', shock:'sh-fox-float-x-230x60'});
  eq(r.errors.length, 0); some(r.warnings, 'reduces rear travel below');
  eq(r.warnings.filter(function(w){ return /~\d+mm/.test(String(w)); }).length, 0);
});
test('longer-stroke shock, matching eye -> error (over-rotation direction)', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-vivid-ultimate-230x65'}).errors, 'stroke too long');
});
test('eye-to-eye mismatch stays an error regardless of stroke', function(){
  some(chk({frame:'fr-yt-capra-core4', shock:'sh-rockshox-super-deluxe-ultimate-205x60-trun'}).errors, 'Shock size mismatch');
});
test('OEM shock cannot go on the wrong frame -> error', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-vivid-ultimate-oem-205x60-trun'}).errors, 'OEM');
});
test('OEM shock with NO frame picked -> info, not a red (rule 4 frameless convention, REVIEW.md #17)', function(){
  var r = chk({shock:'sh-rockshox-vivid-ultimate-oem-205x60-trun', fork:'fk-rockshox-zeb-ultimate-29-170'});
  eq(r.errors.length, 0); some(r.infos, 'OEM-only');
});
test('package-only frame + a different (but fitting) shock -> warning, not error', function(){
  var r = chk({frame:'fr-specialized-enduro-sworks', shock:'sh-rockshox-super-deluxe-ultimate-205x60-trun'});
  eq(r.errors.length, 0); some(r.warnings, 'package-only');
});
test('over-travel fork (180 on a 170-rated frame) -> warning', function(){
  some(chk({frame:'fr-canyon-strive-cfr', fork:'fk-fox-38-factory-29-180'}).warnings, 'Fork travel');
});
/* Issue #2: RAAW's own Madonna V2.2 page approves a 180mm fork - "The option of
   180mm travel up front will also fit the Madonna V2.2 like a dream" (fetched
   raawmtb.com/en-us/pages/madonna-v2-2), with geometry "based around a 170mm
   travel fork" (-> designForkTravel 170, 10mm under the 180 fork, inside 12c's
   20mm grace). So a Fox 38 180 is maker-approved and must trip NO fork-travel
   verdict. Pins maxForkTravel:180 against a regression to the pre-2026-07-10
   value of 170, which produced the reporter's false "exceeds the frame's rated
   max of 170mm" warning. */
test('180mm fork on the RAAW Madonna V2.2 is maker-approved (the 180 boundary) -> no fork-travel verdict (issue #2)', function(){
  var r = chk({frame:'fr-raaw-madonna-v22', fork:'fk-fox-38-factory-29-180'});
  var forkVerdicts = r.errors.concat(r.warnings).filter(function(v){ var s = String(v);
    return s.indexOf('Fork travel')>=0 || s.indexOf('Under-forked')>=0 || s.indexOf('designed around')>=0; });
  eq(forkVerdicts.length, 0, 'a maker-approved 180 fork on the V2.2 must raise no fork-travel error or warning');
  // The boundary is live, not disabled: a fork OVER RAAW's 180 max still warns
  // (the V2.2 publishes no min -> the softer warning tier, per rule 12).
  var bld = B({frame:'fr-raaw-madonna-v22'});
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-38-factory-29-180'), {travel:190}));
  some(C.checkBuild(bld).warnings, 'Fork travel', '190mm (over RAAW\'s 180 max) must still warn');
});

/* Dormant sourced-data rules (REVIEW.md #14/#21/#22) - no catalog part carries
   the fields yet, so each is driven synthetically (the rule-18 template) and
   proven dormant on real parts. */
/* Rule 12/12b tiers by SOURCE LANGUAGE (engine-critical review C4,
   2026-07-12): forkTravelHard:true = the cited source states a hard
   compatibility limit -> ERROR outside the range; absent = the range is
   maker recommendation wording -> WARNING (the fork bolts on and works;
   only geometry shifts). The old tests asserted every sourced min as a
   hard error - evolved to the corrected per-source truth. */
test('under-forking ERRORS below a maker-stated HARD limit (forkTravelHard)', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-propain-spindrift-cf'), {minForkTravel:170, forkTravelHard:true}));
  some(C.checkBuild(bld).errors, 'Under-forked');
});
test('under-forking WARNS below a recommendation-language floor (no forkTravelHard)', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-propain-spindrift-cf'), {minForkTravel:170}));
  var r = C.checkBuild(bld);
  eq(r.errors.length, 0);
  some(r.warnings, 'the maker recommends');
});
test('over the top of a maker-stated HARD range ERRORS; inside the range is clean (Ibis Ripmo "compatible with 150-170mm forks")', function(){
  some(chk({frame:'fr-ibis-ripmo-v3', fork:'fk-fox-38-factory-29-180'}).errors, 'compatibility range');
  eq(chk({frame:'fr-ibis-ripmo-v3', fork:'fk-fox-36-factory-29-160'}).errors.length, 0);
});

/* C4 pinning - the review's real failing builds, on live catalog rows. All
   three Santa Cruz support pages (re-fetched 2026-07-12) explain their
   "Fork Compatibility" ranges in the FAQ as recommendations ("We wouldn't
   recommend less travel than that, as the BB will get a bit low. Up to
   Xmm is fine if that's your preference") - so under-forking them WARNS.
   Frames whose source states a limit (HD6 "rated for 180-190 mm") keep
   the hard error. */
test('C4: 140mm fork on the Hightower 3 (SC recommendation wording) -> warning, not a red', function(){
  var r = chk({frame:'fr-santacruz-hightower-3', fork:'fk-fox-36-factory-29-140'});
  eq(r.errors.length, 0);
  some(r.warnings, 'the maker recommends');
});
test('C4: 160mm fork on the Nomad 6 -> warning, not a red', function(){
  var r = chk({frame:'fr-santacruz-nomad-6', fork:'fk-fox-36-factory-29-160'});
  eq(r.errors.length, 0);
  some(r.warnings, 'Under-forked');
});
test('C4: 160mm fork on the Megatower CC (the formerly source-less hard red) -> warning, not a red', function(){
  var r = chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-lyrik-ultimate-29-160'});
  eq(r.errors.length, 0);
  some(r.warnings, 'Under-forked');
});
test('C4: 170mm fork on the HD6 ("rated for 180-190 mm") keeps the hard error', function(){
  some(chk({frame:'fr-ibis-hd6', fork:'fk-fox-38-factory-29-170'}).errors, 'Under-forked');
});
test('C4: over a recommendation range warns instead of erroring (Hightower 3 + 170)', function(){
  var r = chk({frame:'fr-santacruz-hightower-3', fork:'fk-fox-38-factory-29-170'});
  eq(r.errors.filter(function(e){ return String(e).indexOf('Fork travel')>=0; }).length, 0);
  some(r.warnings, 'the maker recommends');
});
test('over-max stays a WARNING on a frame without a published range (sample-value safety)', function(){
  var r = chk({frame:'fr-canyon-strive-cfr', fork:'fk-fox-38-factory-29-180'});
  eq(r.errors.filter(function(e){ return String(e).indexOf('Fork travel')>=0; }).length, 0);
  some(r.warnings, 'Fork travel');
});
test('under-forking stays dormant without minForkTravel (high-pivot frames would false-fire on a heuristic)', function(){
  // Dreadnought: 154mm travel, commonly forked at 170+ - a 160 fork must stay silent.
  eq(chk({frame:'fr-forbidden-dreadnought', fork:'fk-fox-36-factory-29-160'}).warnings.length, 0);
});
test('design-travel under-forking (12c) warns >20mm below a maker-stated designForkTravel', function(){
  var bld = B({fork:'fk-fox-36-factory-29-140'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-propain-spindrift-cf'), {designForkTravel:180}));
  some(C.checkBuild(bld).warnings, 'designed around');   // 40mm under design
});
test('design-travel under-forking stays silent at 20mm under (a real deliberate build) and with no data', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-propain-spindrift-cf'), {designForkTravel:180}));
  eq(C.checkBuild(bld).warnings.length, 0);              // exactly 20 under: silent
  eq(chk({frame:'fr-propain-spindrift-cf', fork:'fk-fox-36-factory-29-140'}).warnings.length, 0); // no field: dormant
});
test('12c is suppressed when 12b already fired for the same pair (both 12b tiers)', function(){
  // hard tier: 12b errors, 12c suppressed
  var bld = B({fork:'fk-fox-36-factory-29-140'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-propain-spindrift-cf'), {minForkTravel:170, forkTravelHard:true, designForkTravel:180}));
  var r = C.checkBuild(bld);
  some(r.errors, 'maker-stated minimum');
  eq(r.warnings.filter(function(x){ return String(x).indexOf('designed around')>=0; }).length, 0);
  // recommendation tier (C4): 12b warns, 12c still suppressed - one verdict per conflict
  var bld2 = B({fork:'fk-fox-36-factory-29-140'});
  bld2.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-propain-spindrift-cf'), {minForkTravel:170, designForkTravel:180}));
  var r2 = C.checkBuild(bld2);
  some(r2.warnings, 'Under-forked');
  eq(r2.warnings.filter(function(x){ return String(x).indexOf('designed around')>=0; }).length, 0);
});
test('coil shock warns when the frame is maker-stated NOT coil-compatible', function(){
  var bld = B({shock:'sh-ext-storia-v3-230x65'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-yt-capra-core4'), {coilApproved:false}));
  some(C.checkBuild(bld).warnings, 'not coil-compatible');
});
test('air shock stays silent on a not-coil-compatible frame; coil stays silent when approval is unknown', function(){
  var bld = B({shock:'sh-rockshox-super-deluxe-ultimate-230x65'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, part('fr-yt-capra-core4'), {coilApproved:false}));
  eq(C.checkBuild(bld).warnings.length, 0);
  eq(chk({frame:'fr-yt-capra-core4', shock:'sh-ext-storia-v3-230x65'}).warnings.length, 0);   // no field -> dormant
});
test('front tire wider than the fork chassis max -> warning (fork.maxTire set)', function(){
  var bld = B({frontTire:'ti-maxxis-assegai-29-25-exop-mg'});
  bld.fork = /** @type {import('../src/types.js').ForkPart} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {maxTire:2.4}));
  some(C.checkBuild(bld).warnings, 'chassis max');
});
test('fork tire clearance stays dormant without a sourced fork.maxTire', function(){
  eq(chk({fork:'fk-fox-36-factory-29-160', frontTire:'ti-maxxis-assegai-29-25-exop-mg'}).warnings.length, 0);
});

/* REVIEW.md #23 near-term tier: no frame-size concept yet, so a long-drop post
   gets an INFO nudge toward the maker's insertion calculator - never a verdict. */
test('long-drop dropper (>=180mm, was 200 - dossier rule 13 verdict) with a frame -> insertion info, zero errors/warnings', function(){
  var r = chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-oneup-v3-316-210'});
  eq(r.errors.length, 0); eq(r.warnings.length, 0);
  some(r.infos, 'insertion');
});
test('a 180mm drop now gets the insertion info; 175mm stays silent (the new boundary)', function(){
  some(chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-fox-transfer-factory-316-180'}).infos, 'insertion');
  eq(chk({frame:'fr-raaw-madonna-v32', dropper:'dp-pnw-loam-309-175'}).infos.filter(function(i){ return String(i).indexOf('insertion')>=0; }).length, 0);
});

/* Rule 14c - too-NARROW tire on a wide rim (dossier rule 14 review verdict,
   2026-07-10: soft warning when the tire is out of the rim's recommended
   range). Dormant until a wheel/rim carries a maker-published minTire -
   driven synthetically here (rule-18 template), proven dormant on real parts. */
test('too-narrow tire soft-warns when the wheel declares a sourced minTire', function(){
  var bld = B({frontTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt'});
  bld.frontWheel = /** @type {any} */ (Object.assign({}, part('fw-dtswiss-e-1900-275'), {minTire:2.5}));
  some(C.checkBuild(bld).warnings, 'below the wheel maker');
});
test('too-narrow check stays dormant without minTire (no ETRTO-derived guessing)', function(){
  eq(chk({frontWheel:'fw-dtswiss-e-1900-275', frontTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt'}).warnings.filter(function(w){ return String(w).indexOf('below the wheel maker')>=0; }).length, 0);
});
test('minTire flows through the hub+rim path (effectiveWheel)', function(){
  var bld = B({rearTire:'ti-maxxis-minion-dhr-ii-275-24-exop-mt'});
  bld.rearHub = /** @type {any} */ (part('rh-dtswiss-350-boost148-xd'));
  bld.rearRim = /** @type {any} */ (Object.assign({}, part('rm-dtswiss-ex511-29'), {wheel:'275', minTire:2.5}));
  some(C.checkBuild(bld).warnings, 'below the wheel maker');
});
test('short-drop dropper -> no insertion info', function(){
  eq(chk({frame:'fr-santacruz-megatower-cc', dropper:'dp-rockshox-reverb-axs-316-170'}).infos.filter(function(i){ return String(i).indexOf('insertion')>=0; }).length, 0);
});

/* Rule 18 — rear tire vs FRAME clearance. Dormant on the current catalog (no
   frame declares maxTire), so these drive it with a cloned frame that does. */
test('rear tire wider than the frame max -> clearance warning (frame.maxTire set)', function(){
  var bld = B({frame:'fr-raaw-madonna-v22'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, bld.frame, {maxTire:2.5}));
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.6}));
  some(C.checkBuild(bld).warnings, 'frame max');
});
test('rear tire within the frame max -> no clearance warning', function(){
  var bld = B({frame:'fr-raaw-madonna-v22'});
  bld.frame = /** @type {FramePart} */ (Object.assign({}, bld.frame, {maxTire:2.6}));
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.5}));
  eq(C.checkBuild(bld).warnings.filter(function(w){ return String(w).indexOf('frame max')>=0; }).length, 0);
});
test('frame clearance rule stays dormant when the frame declares no maxTire', function(){
  var bld = B({frame:'fr-yt-capra-core4'});   // no sourced maxTire on the Capra (yet)
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:3.0}));  // absurdly wide, still silent
  eq(C.checkBuild(bld).warnings.filter(function(w){ return String(w).indexOf('frame max')>=0; }).length, 0);
});
test('frame clearance rule is ACTIVE on sourced frames (Madonna 2.6in + 2.6in tire is fine)', function(){
  var bld = B({frame:'fr-raaw-madonna-v22'});
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.8}));
  some(C.checkBuild(bld).warnings, 'frame max');   // 2.8 > sourced 2.6 -> warns
  bld.rearTire = /** @type {TirePart} */ (Object.assign({}, part('ti-maxxis-assegai-29-25-exop-mg'), {width:2.5}));
  eq(C.checkBuild(bld).warnings.filter(function(w){ return String(w).indexOf('frame max')>=0; }).length, 0);
});

/* REVIEW.md #16: with the verified Big Betty 29x2.6 in the catalog, rules 14
   and 18 are finally triggerable by REAL part combinations - these pin that
   they can actually fire outside synthetic probes. */
test('REVIEW #16: rule 14 fires with real parts (2.6in tire on a 2.5in-max rim)', function(){
  some(chk({frontTire:'ti-schwalbe-big-betty-29-26-sg-as', frontWheel:'fw-dtswiss-ex-1700-29'}).warnings, 'wider than the front wheel');
});
test('REVIEW #16: rule 18 fires with real parts (2.6in rear tire vs the Slash 2.5in frame max)', function(){
  some(chk({frame:'fr-trek-slash', rearTire:'ti-schwalbe-big-betty-29-26-sg-as', rearWheel:'rw-reserve-30-hd-29'}).warnings, 'frame max');
});
test('REVIEW #16: the 2.6in tire is fine on 2.6in-clearance parts (no false warning)', function(){
  var r = chk({frame:'fr-raaw-madonna-v3', rearTire:'ti-schwalbe-big-betty-29-26-sg-as', rearWheel:'rw-reserve-30-hd-29'});
  eq(r.warnings.length, 0);
});

/* REVIEW.md #15: rules 2-front/8/11 are dead code TODAY - every catalog part
   is Boost110/PM/tapered and the validator rejects anything else, so no
   constructible build can fire them. The single-valued vocabs are deliberate
   (they widen only when a real part needs it), but the checks must stay
   correct for that day - synthetic probes pin each one. */
test('front-axle check fires on a synthetic non-Boost fork (dead rule pinned)', function(){
  var bld = B({frontWheel:'fw-reserve-30-hd-29'});
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {axle:'20x110'}));
  some(C.checkBuild(bld).errors, 'Front axle mismatch');
});
test('brake-mount checks fire on synthetic flat-mount brakes (dead rule pinned)', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160', frame:'fr-santacruz-megatower-cc'});
  bld.frontBrake = /** @type {any} */ (Object.assign({}, part('bk-sram-code-rsc'), {mount:'FM'}));
  bld.rearBrake = /** @type {any} */ (Object.assign({}, part('bk-sram-code-rsc'), {mount:'FM'}));
  var r = C.checkBuild(bld);
  some(r.errors, 'Front brake mount mismatch');
  some(r.errors, 'Rear brake mount mismatch');
});
test('steerer check fires on a synthetic straight-steerer fork (dead rule pinned)', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc'});
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {steerer:'straight'}));
  some(C.checkBuild(bld).errors, 'Steerer mismatch');
});
test('a dual-crown (straight-dc) fork on a tapered frame fires rule 11', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc'});   // headset: tapered
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {steerer:'straight-dc'}));
  some(C.checkBuild(bld).errors, 'Steerer mismatch');
});
test('a tapered fork on a straight-dc (DH) frame fires rule 11 the other way', function(){
  var bld = B({fork:'fk-fox-36-factory-29-160'});     // steerer: tapered
  bld.frame = /** @type {any} */ (Object.assign({}, part('fr-santacruz-megatower-cc'), {headset:'straight-dc'}));
  some(C.checkBuild(bld).errors, 'Steerer mismatch');
});
test('rule 3 rejects mixing a 7-speed DH shifter with a 12-speed derailleur', function(){
  var bld = B({derailleur:'dr-sram-gx-eagle'});   // sram-eagle 12s
  bld.shifter = /** @type {any} */ (Object.assign({}, part('sft-sram-gx-eagle'), {system:'sram-dh-7', speeds:7}));
  var r = C.checkBuild(bld);
  some(r.errors, 'system', 'mixing sram-dh-7 with sram-eagle must error');
});

/* Rule 3 - the CHAIN is out of the SPEED set, in the SYSTEM set (engine-
   critical review M1, 2026-07-12). Chains are width-defined, not speed-
   defined: SRAM's one T-Type Flattop chain family runs both the 12s
   Transmission groups and the 7-speed XX Eagle Transmission DH group
   (CS-XS-797) - counting the chain in the speed set forced a false red on
   that genuine SRAM-sold pairing and kept the group out of the catalog.
   The chain's real constraint (width family) is what `system` encodes. */
test('M1: a 7s T-Type DH cassette + mech with the 12s-width Flattop chain -> no speed red (the SRAM XX DH group)', function(){
  var bld = B({chain:'ch-sram-gx-flattop'});   // T-Type Flattop, tagged speeds:12
  bld.cassette   = /** @type {any} */ (Object.assign({}, part('ca-sram-xs1275'), {speeds:7, minCog:9, maxCog:24}));      // CS-XS-797 shape
  bld.derailleur = /** @type {any} */ (Object.assign({}, part('dr-sram-xx-transmission'), {speeds:7, maxCog:24}));       // RD-XX-DHE shape
  var r = C.checkBuild(bld);
  eq(r.errors.filter(function(v){ return v.ruleId==='drivetrain-speeds' || v.ruleId==='drivetrain-system'; }).length, 0);
});
test('M1: a chain speed tag alone never drives a speed red within one system', function(){
  var bld = B({shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275'});
  bld.chain = /** @type {any} */ (Object.assign({}, part('ch-sram-gx-eagle'), {speeds:11}));
  eq(C.checkBuild(bld).errors.filter(function(v){ return v.ruleId==='drivetrain-speeds'; }).length, 0);
});
test('M1: a real indexed-parts speed mismatch still errors, and its slots exclude the chain', function(){
  var bld = B({shifter:'sft-sram-gx-eagle', chain:'ch-sram-gx-eagle'});
  bld.cassette = /** @type {any} */ (Object.assign({}, part('ca-sram-xg1275'), {speeds:11}));
  var r = C.checkBuild(bld);
  var v = r.errors.filter(function(x){ return x.ruleId==='drivetrain-speeds'; })[0];
  eq(!!v, true, 'shifter 12s vs cassette 11s must still red');
  eq(v.slots.indexOf('chain'), -1, 'the chain is not implicated in a speed verdict');
});
test('M1: the chain stays in the one-SYSTEM set (Shimano chain in a SRAM Eagle drivetrain reds)', function(){
  some(chk({chain:'ch-shimano-xtr-m9100', cassette:'ca-sram-xg1275'}).errors, 'Drivetrain mismatch');
});

/* expand/dh-transmission (2026-07-13): the REAL XX DH Transmission group (real
   catalog rows, not the synthetic M1 shapes above) - the cassette+derailleur
   are new; the chain (ch-sram-xx-flattop) and AXS pod (sft-sram-xx-sl-transmission)
   are reused existing rows, per that group's own catalog comment. */
test('real XX DH Transmission group (cassette+derailleur+shared Flattop chain) has no system/speed conflict', function(){
  var r = chk({cassette:'ca-sram-xs797', derailleur:'dr-sram-xx-dh-transmission', chain:'ch-sram-xx-flattop'});
  eq(r.errors.filter(function(v){ return v.ruleId==='drivetrain-speeds' || v.ruleId==='drivetrain-system'; }).length, 0);
});
test('real XX DH Transmission crankset + shared Flattop chain: T-Type ring is silent on rule 3c', function(){
  var r = chk({crankset:'cr-sram-xx-dh-transmission', chain:'ch-sram-xx-flattop'});
  eq(r.errors.filter(function(v){ return v.ruleId==='chainring-standard'; }).length, 0);
  eq(r.infos.filter(function(v){ return v.ruleId==='chainring-standard'; }).length, 0);
});
test('the 7s XX DH Transmission cassette still reds against a 12s Transmission derailleur (system alone does not false-green it)', function(){
  var r = chk({cassette:'ca-sram-xs797', derailleur:'dr-sram-xx-transmission'});
  some(r.errors, 'Speed mismatch', 'a real 7s cassette vs a real 12s derailleur must still red on speed');
});
test('the XX DH Transmission derailleur is a real udh-direct mount: needs a UDH frame like the rest of the Transmission family', function(){
  var bld = B({derailleur:'dr-sram-xx-dh-transmission'});
  bld.frame = /** @type {any} */ (Object.assign({}, part('fr-santacruz-megatower-cc'), {udh:false, udhRetrofitKit:undefined}));
  some(C.checkBuild(bld).errors, 'Frame not UDH', 'a non-UDH frame with this derailleur must error rule 4');
});
test('a matched straight-dc pair (dual-crown fork on a DH frame) is silent on rule 11', function(){
  var bld = /** @type {any} */ ({
    frame: Object.assign({}, part('fr-santacruz-megatower-cc'), {headset:'straight-dc'}),
    fork:  Object.assign({}, part('fk-fox-36-factory-29-160'), {steerer:'straight-dc'})
  });
  var msgs = C.checkBuild(bld).errors.map(String).filter(function(m){ return m.indexOf('Steerer')>=0; });
  eq(msgs.length, 0, 'no steerer error for a matched dual-crown pair');
});

/* REVIEW.md 5b/#27: the SuperBoost-frame + Boost-crank NON-rule is deliberate
   and verified correct (commonly ridden; a naive chainline rule would be a
   false red - see the coverage roadmap's documented rejection). This pin stops
   a future session from "helpfully" adding it. chainline is display-only bait. */
test('SuperBoost frame + Boost-chainline crank stays clean (deliberate non-rule, pinned)', function(){
  eq(chk({frame:'fr-pivot-firebird', crankset:'cr-sram-gx-eagle'}).errors.length, 0);
});

/* Build-your-own-wheel (fronthub/rearhub/rim): effectiveWheel() must make a
   hub+rim pair behave IDENTICALLY to the complete wheel it mirrors, for every
   rule that reads front/rear wheel fields. The DT Swiss EX 1700 platform pins
   this - fh-dtswiss-350-boost110 + rm-dtswiss-ex511-29 carry the exact same
   hub/rotorMount/wheel/intWidth/maxTire as fw-dtswiss-ex-1700-29, and likewise
   for the rear hub + rim vs rw-dtswiss-ex-1700-29. */
test('hub+rim vs complete wheel: identical verdicts on a clean build', function(){
  var combined = chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170',
    frontWheel:'fw-dtswiss-ex-1700-29', rearWheel:'rw-dtswiss-ex-1700-29',
    cassette:'ca-sram-xg1275'});
  var split = chk({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170',
    frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29',
    rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29',
    cassette:'ca-sram-xg1275'});
  eq(split.errors.length, combined.errors.length, 'same error count');
  eq(split.warnings.length, combined.warnings.length, 'same warning count');
  eq(combined.errors.length, 0, 'sanity: the combined build itself is clean');
});
test('hub+rim: wheel-size rule fires the same way as the complete wheel (29-only frame + 27.5 rim)', function(){
  var viaWheel = chk({frame:'fr-santacruz-megatower-cc', frontWheel:'fw-dtswiss-e-1900-275'});
  var bld = B({frame:'fr-santacruz-megatower-cc', frontHub:'fh-dtswiss-350-boost110'});
  bld.frontRim = /** @type {any} */ (Object.assign({}, part('rm-dtswiss-ex511-29'), {wheel:'275'}));
  var viaHubRim = C.checkBuild(bld);
  some(viaWheel.errors, 'wheel');
  some(viaHubRim.errors, 'wheel');
  eq(viaHubRim.errors.length, viaWheel.errors.length, 'hub+rim raises the same wheel-size error as the complete wheel');
});
test('hub+rim: front axle mismatch fires via the hub (fork vs fronthub.hub)', function(){
  var bld = B({frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29'});
  bld.fork = /** @type {any} */ (Object.assign({}, part('fk-fox-36-factory-29-160'), {axle:'20x110'}));
  some(C.checkBuild(bld).errors, 'Front axle');
});
test('hub+rim: rear axle mismatch fires via the hub (frame vs rearhub.hub)', function(){
  some(chk({frame:'fr-pivot-firebird', rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29'}).errors, 'Rear axle');
});
test('hub+rim: freehub mismatch fires via the rear hub (cassette vs rearhub.freehub)', function(){
  some(chk({cassette:'ca-shimano-xt-m8100-1051', rearHub:'rh-dtswiss-350-boost148-xd', rearRim:'rm-dtswiss-ex511-29'}).errors, 'Freehub');
});
test('hub+rim: rotor interface fires via the hub (Center Lock rotor vs the fronthub\'s 6-bolt rotorMount)', function(){
  some(chk({frontRotor:'ro-shimano-rtmt800-203-cl', frontHub:'fh-hope-pro5-boost110', frontRim:'rm-hope-fortus30-29'}).errors, 'rotor interface');
});
test('hub+rim: tire clearance fires via the rim (tire.width vs rim.maxTire)', function(){
  some(chk({frontTire:'ti-schwalbe-big-betty-29-26-sg-as', frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29'}).warnings, 'wider than the front wheel');
});
test('hub+rim: a hub-only side raises no wheel-size verdict (the rim carries the size)', function(){
  /* Pre-2026-07-16 this passed because effectiveWheel returned null and the
     engine checked NOTHING for the side. It now passes for the RIGHT reason:
     the size rule presence-guards `wheel`, which only the rim carries, and no
     fork is picked here so the axle rule has nothing to compare either. The
     partial-wheel block below pins that the OTHER rules do fire. */
  var r = chk({frame:'fr-santacruz-megatower-cc', frontHub:'fh-dtswiss-350-boost110'});
  eq(r.errors.length, 0, 'no wheel-size verdict should fire off a hub alone');
});

/* PARTIAL wheel ends - the 2026-07-16 code-quality audit's CRITICAL (C-1).
   effectiveWheel used to return null unless BOTH halves were picked, which
   silenced rules 1/2/6/9/14 for a half-filled end and dotted all 49 hub/rim
   rows green against any build - a false "fits", the one verdict this product
   must never give. The contract now: every check whose OWN inputs exist runs as
   soon as they exist; only the checks needing the missing half stay silent.
   Hub carries hub/freehub/rotorMount; rim carries wheel/intWidth/maxTire. */
test('C-1 regression: hub-only axle mismatch errors with NO rim picked (the audit\'s exact repro)', function(){
  var repro = {frame:'fr-santacruz-megatower-cc', fork:'fk-fox-38-factory-29-170',
    frontHub:'fh-industrynine-hydra2-20x110', frontRotor:'ro-sram-hs2-200-6b'};
  var r = chk(repro);
  some(r.errors, 'Front axle');
  eq(r.errors.length, 1, 'the axle error and ONLY it - no false verdict off the missing rim');
  eq(r.warnings.length, 0, 'and no false warning either');
});
test('C-1 regression: the dot is RED for a 20x110 DH hub on a Boost fork build, pre-rim', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc', fork:'fk-fox-38-factory-29-170'});
  eq(C.compatOf(part('fh-industrynine-hydra2-20x110'), bld).state, 'r', 'a DH hub cannot dot green on a Boost fork');
  eq(C.compatOf(part('fh-dtswiss-350-boost110'), bld).state, 'g', 'the matching Boost hub still dots green');
});
test('hub-only: freehub mismatch fires off the rear hub alone', function(){
  some(chk({cassette:'ca-shimano-xt-m8100-1051', rearHub:'rh-dtswiss-350-boost148-xd'}).errors, 'Freehub');
});
test('hub-only: rotor interface fires off the front hub alone', function(){
  some(chk({frontRotor:'ro-shimano-rtmt800-203-cl', frontHub:'fh-hope-pro5-boost110'}).errors, 'rotor interface');
});
test('rim-only: wheel-size mismatch fires off the rim alone (27.5 rim vs 29 fork)', function(){
  some(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontRim:'rm-hope-fortus30-275'}).errors, 'wheel size');
});
test('rim-only: the dot is RED for a 27.5 rim on a 29-only frame', function(){
  eq(C.compatOf(part('rm-hope-fortus30-275'), B({frame:'fr-santacruz-megatower-cc'})).state, 'r');
});
test('rim-only: tire clearance fires off the rim alone (tire.width vs rim.maxTire)', function(){
  some(chk({frontTire:'ti-schwalbe-big-betty-29-26-sg-as', frontRim:'rm-dtswiss-ex511-29'}).warnings, 'wider than the front wheel');
});
/* Negatives: the missing half must stay SILENT, never guess. A fabricated
   default would trade this false "fits" for a false "won't fit". */
test('partial ends stay silent on the checks that need the missing half', function(){
  var rimOnly = chk({fork:'fk-rockshox-zeb-ultimate-29-170', frame:'fr-santacruz-megatower-cc', frontRim:'rm-dtswiss-ex511-29'});
  eq(rimOnly.errors.length, 0, 'a rim carries no hub, so the axle rule must not fire (nor read "hub is undefined")');
  var hubOnly = chk({fork:'fk-rockshox-zeb-ultimate-29-170', frame:'fr-santacruz-megatower-cc', frontHub:'fh-dtswiss-350-boost110'});
  eq(hubOnly.errors.length, 0, 'a hub carries no size, so the wheel-size rule must not fire');
  var rearRimOnly = chk({cassette:'ca-sram-xg1275', rearRim:'rm-dtswiss-ex511-29'});
  eq(rearRimOnly.errors.length, 0, 'a rim carries no freehub, so the freehub rule must not fire');
});
test('a compatible partial end stays green and clean', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', frontHub:'fh-dtswiss-350-boost110'});
  eq(C.checkBuild(bld).errors.length, 0);
  eq(C.compatOf(part('rm-dtswiss-ex511-29'), bld).state, 'g', 'the matching 29 rim completes the pair cleanly');
});
/* placementDiff must baseline on the build state that will EXIST after the
   click: setSlot clears the mutex partner (altOf), so leaving it in the
   baseline let a complete frontWheel mask the rim under test. */
test('placementDiff clears the altOf mutex partner, so a rim is dotted against a build without the complete wheel', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc', frontWheel:'fw-dtswiss-ex-1700-29'});
  var d = C.placementDiff(part('rm-hope-fortus30-275'), 'frontRim', bld);
  ok(d.error, 'the 27.5 rim REPLACES the 29 wheel on click, so its size conflict must surface');
});
test('placementDiff clears the reverse mutex too (a complete wheel over a hub+rim pair)', function(){
  var bld = B({frame:'fr-santacruz-megatower-cc', frontHub:'fh-industrynine-hydra2-20x110', frontRim:'rm-dtswiss-ex511-29',
    fork:'fk-rockshox-zeb-ultimate-29-170'});
  var d = C.placementDiff(part('fw-dtswiss-ex-1700-29'), 'frontWheel', bld);
  eq(d.error, null, 'the complete wheel clears the mismatched hub+rim, so it introduces no error');
});
test('mutual completeness: wheelPositionFilled treats hub+rim as satisfying the frontWheel/rearWheel position', function(){
  var bld = B({frontHub:'fh-dtswiss-350-boost110', frontRim:'rm-dtswiss-ex511-29'});
  eq(C.wheelPositionFilled(bld, 'frontWheel'), true);
  eq(C.wheelPositionFilled(B({frontHub:'fh-dtswiss-350-boost110'}), 'frontWheel'), false, 'hub alone is not enough');
  eq(C.wheelPositionFilled(B({frontWheel:'fw-dtswiss-ex-1700-29'}), 'frontWheel'), true, 'the complete wheel still satisfies it directly');
  eq(C.wheelPositionFilled({}, 'shock'), false, 'a slot with no alternates just reduces to !!build[key]');
});
